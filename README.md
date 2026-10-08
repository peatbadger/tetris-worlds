# Tetris Worlds

A Tetris Effect–inspired browser game. Open `index.html` by double-clicking it. It is a single self-contained file that works offline, with no external assets: all art and music are generated in code.

* `index.html` is the game (built from `src/`).
* `src/` holds the readable sources: audio engine, the Kaiten Sushi scene and sushi art, the other worlds, block skins, game core and UI.
* `build.py` rebuilds `index.html` from `src/`. Run it with `python3 build.py`.

Controls: ←/→ move · ↓ soft drop · Space hard drop · ↑/X rotate CW · Z/Ctrl rotate CCW · C/Shift hold · P/Esc pause · M mute · Enter start.
