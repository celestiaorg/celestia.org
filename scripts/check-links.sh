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

# Run linkinator with JSON output.
# NODE_NO_WARNINGS + stderr to a separate file keeps the JSON clean: on Node 22
# linkinator emits a punycode DeprecationWarning to stderr, and merging it into
# the JSON (2>&1) would break JSON.parse in parse-links.js.
TEMP_JSON=$(mktemp)
LINK_STDERR=$(mktemp)
NODE_NO_WARNINGS=1 ./node_modules/.bin/linkinator "http://localhost:$PORT" \
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
