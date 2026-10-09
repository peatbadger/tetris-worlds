#!/bin/bash
# tools/prem_world.sh <stageId> <src file> : opt the world into premium, build, before/after + grey, audit
cd /workspace/tetris-worlds
id=$1; f=src/$2
grep -q 'premium: true' $f || sed -i '0,/^\( *\)FOOD:/s//\1premium: true,\n\1FOOD:/' $f
python3 build.py | tail -1
timeout 300 tools/cap.sh premium.js $id /workspace/shots/premium/$id.png 2>&1 | tail -1
timeout 300 tools/cap.sh audit.js $id | tail -1
python3 tools/audit.py $id 2>/dev/null | tail -1
