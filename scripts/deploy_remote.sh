#!/usr/bin/env bash
set -Eeuo pipefail

# Remote deployment script for the cmccollege Next.js app.
# Intended to be executed on the target host via SSH from GitHub Actions.

REPO_URL="${REPO_URL:-https://github.com/kubeletinfotech/comcollege.git}"
BRANCH="${BRANCH:-main}"
DEPLOY_PATH="${DEPLOY_PATH:-/apps/web/beta-comcollege/app}"
APP_SUBDIR="${APP_SUBDIR:-web}"
APP_NAME="${APP_NAME:-beta-comcollege}"
PORT="${PORT:-3000}"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

require_cmd git

if [ ! -d "$DEPLOY_PATH/.git" ]; then
  log "Cloning repository into $DEPLOY_PATH"
  mkdir -p "$(dirname "$DEPLOY_PATH")"
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$DEPLOY_PATH"
else
  log "Updating existing repository at $DEPLOY_PATH"
  git -C "$DEPLOY_PATH" remote set-url origin "$REPO_URL"
  git -C "$DEPLOY_PATH" fetch --prune origin "$BRANCH"
  git -C "$DEPLOY_PATH" checkout -B "$BRANCH" "origin/$BRANCH"
fi

APP_PATH="$DEPLOY_PATH/$APP_SUBDIR"
if [ ! -f "$APP_PATH/package.json" ]; then
  echo "Could not find package.json in $APP_PATH" >&2
  exit 1
fi

cd "$APP_PATH"

if command -v corepack >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
fi

if command -v pnpm >/dev/null 2>&1; then
  log "Installing dependencies with pnpm"
  pnpm install --frozen-lockfile

  log "Building application"
  pnpm run build

  if command -v pm2 >/dev/null 2>&1; then
    log "Restarting app with pm2 (name: $APP_NAME, port: $PORT)"
    if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
      PORT="$PORT" NODE_ENV=production pm2 restart "$APP_NAME" --update-env
    else
      PORT="$PORT" NODE_ENV=production pm2 start "pnpm -- start -p $PORT" --name "$APP_NAME"
    fi
    pm2 save
  elif [ -n "${SYSTEMD_SERVICE:-}" ]; then
    log "Restarting systemd service: $SYSTEMD_SERVICE"
    sudo systemctl restart "$SYSTEMD_SERVICE"
  else
    log "Build completed. No process manager found (pm2/systemd). Restart the app manually."
  fi
else
  require_cmd npm
  log "pnpm not found, using npm"
  npm ci
  npm run build

  if command -v pm2 >/dev/null 2>&1; then
    log "Restarting app with pm2 (name: $APP_NAME, port: $PORT)"
    if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
      PORT="$PORT" NODE_ENV=production pm2 restart "$APP_NAME" --update-env
    else
      PORT="$PORT" NODE_ENV=production pm2 start "npm -- start -- -p $PORT" --name "$APP_NAME"
    fi
    pm2 save
  elif [ -n "${SYSTEMD_SERVICE:-}" ]; then
    log "Restarting systemd service: $SYSTEMD_SERVICE"
    sudo systemctl restart "$SYSTEMD_SERVICE"
  else
    log "Build completed. No process manager found (pm2/systemd). Restart the app manually."
  fi
fi

log "Deployment complete"
