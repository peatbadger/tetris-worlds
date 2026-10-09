#!/bin/bash
# one headless browser at a time; hard 300 s limit; always clean up — but ONLY the browser this run launched.
# usage: tools/cap.sh <script.js> args...
# Every launch is tagged (tools/_captag.js preload) with --cap-tag=<unique>; cleanup kills that tagged browser and its
# descendants by PID. It never matches other agents' Chrome processes on this shared box.
cd /workspace/tetris-worlds
exec 9>/tmp/tetris-cap.lock; flock -w 600 9 || { echo "lock busy"; exit 9; }
export CAP_TAG="tetriscap-$$-$(date +%s%N)"
timeout 300 node -r ./tools/_captag.js "tools/$1" "${@:2}"; rc=$?
desc() { for c in $(pgrep -P "$1"); do desc "$c"; echo "$c"; done; }
for p in $(pgrep -f -- "--cap-tag=$CAP_TAG"); do kill $(desc "$p") "$p" 2>/dev/null; done
exit $rc
