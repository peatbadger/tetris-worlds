#!/bin/bash
# one headless browser at a time; hard 300 s limit; always clean up
# usage: tools/cap.sh <script.js> args...
cd /workspace/tetris-worlds
exec 9>/tmp/tetris-cap.lock; flock -w 600 9 || { echo "lock busy"; exit 9; }
timeout 300 node "tools/$1" "${@:2}"; rc=$?
pkill -f 'ms-playwright|headless_shell|chrome-headless' 2>/dev/null
exit $rc
