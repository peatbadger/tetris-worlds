#!/bin/bash
# usage: tools/qa4.sh <world> [hour=19] [warm=22] — QA round-4 shots: 4x close-up next to the Kaiten benchmark + iPhone 13 portrait (1170x2532)
w=$1; h=${2:-19}; s=${3:-22}; cd /workspace/tetris-worlds
tools/cap.sh cmp.js $w /workspace/shots/qa4-$w-4x.png | tail -1
tools/cap.sh gw.js $w /workspace/shots/qa4-$w-iphone.png $h clear $s 390 844 0 1 | tail -1 | cut -c1-200
