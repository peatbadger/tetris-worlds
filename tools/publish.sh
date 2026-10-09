#!/bin/bash
# usage: tools/publish.sh "commit message"
set -e
cd /workspace/tetris-worlds && python3 build.py >/dev/null
P=/workspace/tetris-pages
cp index.html README.md build.py $P/ && rm -rf $P/src && cp -r src $P/src && mkdir -p $P/screenshots && cp screenshot-*.png $P/screenshots/ && mkdir -p $P/tools && cp tools/*.js tools/*.sh $P/tools/ 2>/dev/null || true
cp fonts/*.woff2 fonts/*.txt $P/fonts/ 2>/dev/null || true
cd $P && git add -A && git commit -qm "$1" && git push -q origin main && git log --oneline | head -1
