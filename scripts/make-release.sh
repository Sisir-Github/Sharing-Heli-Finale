#!/usr/bin/env bash
# Builds an upload-ready source package for cPanel.
#
# Deliberately excludes .next and node_modules: both are platform-specific and
# must be produced on the server by `npm ci && npm run build`. Also excludes the
# SQLite database and uploads so a deployment can never overwrite live data.
set -euo pipefail

cd "$(dirname "$0")/.."
NAME="sharing-heli-release-$(date +%Y%m%d-%H%M).tar.gz"
OUT="${1:-$NAME}"

tar --exclude='./node_modules' \
    --exclude='./.next' \
    --exclude='./.git' \
    --exclude='./_to_delete' \
    --exclude='./tsconfig.tsbuildinfo' \
    --exclude='./.env' \
    --exclude='./.env.local' \
    --exclude='./.env.production' \
    --exclude='./prisma/*.db' \
    --exclude='./prisma/*.db-journal' \
    --exclude='./public/uploads' \
    --exclude='./data' \
    --exclude='./.DS_Store' \
    --exclude='./**/.DS_Store' \
    -czf "$OUT" .

echo "Created $OUT ($(du -h "$OUT" | cut -f1))"
echo
echo "On the server:"
echo "  tar -xzf $(basename "$OUT") -C ~/apps/sharingheli-new"
echo "  cd ~/apps/sharingheli-new && npm ci && npx prisma generate && npm run db:migrate && npm run build"
