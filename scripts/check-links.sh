#!/usr/bin/env bash
set -eo pipefail

PORT=3000
OUTPUT_FILE="broken-links.txt"
SERVER_PID=""

cleanup() {
  echo ""
  echo "🛑 Stopping server..."
  if [ -n "$SERVER_PID" ]; then
    kill -- -$SERVER_PID 2>/dev/null || kill $SERVER_PID 2>/dev/null || true
  fi
  lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
}

trap cleanup EXIT

echo "🧹 Cleaning up port $PORT..."
lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
sleep 1

echo "🔨 Building site..."
npm run build

echo "🚀 Starting server..."
set -m
npm run start &
SERVER_PID=$!
set +m

echo "⏳ Waiting for server to start..."
sleep 2

for i in {1..30}; do
  if curl -s http://localhost:$PORT > /dev/null 2>&1; then
    echo "✅ Server is ready!"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "❌ Server failed to start"
    exit 1
  fi
  sleep 1
done

echo ""
echo "🔗 Checking links (this takes ~90 seconds)..."

# Seed the crawl with every URL in the sitemap, not just the homepage.
#
# linkinator only discovers pages by following links, so any page nothing links
# to is never checked. The /what-is-* landing pages are exactly that: they carry
# sitemap priority 0.9 but have zero inbound internal links (they are entered
# from search), so a homepage-only crawl silently skipped them and their external
# links went unverified for good — that is how a 404 wallet link on /what-is-tia
# survived. Deriving the seeds from the sitemap keeps this self-maintaining: any
# page added there is crawled, orphaned or not.
#
# Note linkinator cannot consume a sitemap itself — passing sitemap.xml as a URL
# fetches it but extracts no <loc> entries, so it fails silently. Hence we parse
# it here and pass the URLs as explicit seeds, rewriting the production origin
# emitted by getSiteUrl() to the local server.
echo "🗺️  Seeding from sitemap..."
SEED_URLS=$(curl -s --max-time 30 "http://localhost:$PORT/sitemap.xml" 2>/dev/null \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -E 's#</?loc>##g' \
  | sed -E "s#^https?://[^/]+#http://localhost:$PORT#" \
  | sort -u || true)

if [ -z "$SEED_URLS" ]; then
  echo "⚠️  Could not read sitemap.xml — falling back to homepage-only crawl."
else
  echo "   $(echo "$SEED_URLS" | wc -l | tr -d ' ') seed URLs from sitemap"
fi

# Run linkinator with JSON output.
# NODE_NO_WARNINGS + stderr to a separate file keeps the JSON clean: on Node 22
# linkinator emits a punycode DeprecationWarning to stderr, and merging it into
# the JSON (2>&1) would break JSON.parse in parse-links.js.
#
# $SEED_URLS is intentionally unquoted: it must word-split into separate args.
# URLs cannot contain spaces, so this is safe, and it avoids mapfile/readarray
# (bash 4+) which would break on the bash 3.2 shipped with macOS.
TEMP_JSON=$(mktemp)
LINK_STDERR=$(mktemp)
NODE_NO_WARNINGS=1 ./node_modules/.bin/linkinator "http://localhost:$PORT" $SEED_URLS \
  --recurse \
  --timeout 30000 \
  --concurrency 5 \
  --retry \
  --retry-errors \
  --retry-errors-count 3 \
  --user-agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  --skip "^mailto:" \
  --skip "^tel:" \
  --skip "plausible.celestia.org" \
  --skip "github.com/.*/edit" \
  --skip "datenschutzstelle.li" \
  --format json > "$TEMP_JSON" 2>"$LINK_STDERR" || true

# Parse results with node script
node scripts/parse-links.js "$TEMP_JSON" "$OUTPUT_FILE"
EXIT_CODE=$?

rm -f "$TEMP_JSON" "$LINK_STDERR"
exit $EXIT_CODE
