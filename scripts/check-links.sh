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

# Run linkinator with JSON output
TEMP_JSON=$(mktemp)
./node_modules/.bin/linkinator "http://localhost:$PORT" \
  --recurse \
  --timeout 30000 \
  --concurrency 10 \
  --skip "^mailto:" \
  --skip "^tel:" \
  --skip "plausible.celestia.org" \
  --skip "discord.com/invite" \
  --skip "twitter.com" \
  --skip "x.com" \
  --skip "linkedin.com" \
  --skip "t.me" \
  --skip "github.com/.*/edit" \
  --format json > "$TEMP_JSON" 2>&1 || true

# Parse results with node script
node scripts/parse-links.js "$TEMP_JSON" "$OUTPUT_FILE"
EXIT_CODE=$?

rm -f "$TEMP_JSON"
exit $EXIT_CODE
