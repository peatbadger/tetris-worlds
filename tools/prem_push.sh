#!/bin/bash
# tools/prem_push.sh <stageId> "<notes>" : publish, log ready.txt + PROGRESS.md
cd /workspace/tetris-worlds
timeout 300 tools/publish.sh "Premium material: $1 — $2" >/dev/null 2>&1
c=$(cd /workspace/tetris-pages && git log --oneline -1 | cut -d' ' -f1); st=$(cd /workspace/tetris-pages && git status -sb | head -1)
echo "$(date -u +%H:%M) $1 $c premium material ($2) shots/premium/$1.png (+-grey, -before/after-4x/-iphone)" >> /workspace/qa-tetris/ready.txt
echo "- $c premium $1: $2 — shots/premium/$1.png" >> PROGRESS.md
echo "$c $st"
