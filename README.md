# Delicious Tetris

A world tour of food, one line at a time. **Delicious Tetris** is a Tetris Effect–inspired browser game in which every stage is a lively, hand-coded restaurant world. Each world has its own procedural music and sound effects, people with personalities going about believable routines, a day/night and weather cycle, surprise events, and a unique set of food blocks with faces that react to play.

**Play it:** open `index.html` (double-click it). It is a single self-contained file that works offline, with no external assets. All art, animation and music are generated in code.

* `index.html` is the game (built from `src/`).
* `src/` holds the readable sources. `build.py` rebuilds `index.html` from them (`python3 build.py`).

## Controls
←/→ move · ↓ soft drop · Space hard drop · ↑/X rotate clockwise · Z/Ctrl rotate counter-clockwise · C/Shift hold · P/Esc pause · M mute · −/+ volume · Enter start.
The stage select is a paged, scrollable grid with live thumbnails. Use the arrow keys or the mouse.

## Game
* SRS rotation with wall kicks, a 7-bag randomizer, hold, a 5-piece next queue, a ghost piece and lock delay (15 move resets).
* Guideline scoring: singles to Tetrises, T-spins (mini and full), combos, back-to-back bonuses, soft and hard drop points.
* 10 lines per stage. Clearing them moves you to the next world with a title card. Pause, restart and stage select are all available.
* **Living blocks.** Every food block has a personality: cool, jolly, cheeky, shy, sleepy, excitable or grumpy. Blocks follow the falling piece with their eyes and blink. They wince and squish when something lands on them and get dizzy after spins. They glisten in awe under the ghost piece, sweat and shiver when the stack nears the top, and hop and cheer (with hearts on Tetrises) when lines clear.
* Blocks are tinted by the world's time of day and weather.

## Worlds (in order)
1. **Kaiten Sushi.** A conveyor-belt sushi bar with real kanji signage, itamae working the counter and plates circling.
2. **Mike's Pastry** (fan tribute). A North End Boston pastry shop. It has a Hanover Street window, glass cases of cannoli, lobster tails and sfogliatelle, two counter queues, and staff boxing and tying orders with string from overhead spools.
   *Events:* tour group with a flag guide, a fresh tray of lobster tails, a kid pressing their face to the glass (and leaving a smudge), nonna's tower of boxes, snow sweeping.
3. **The Blind Tiger speakeasy (1920s).** Guests knock and whisper the password ("Swordfish") at a peephole before a bookcase door swings open. Inside are a jazz quartet, a bartender shaking, stirring and garnishing to order, a cocktail waitress running the booths, bar stools and Edison bulbs.
   *Events:* card magician, singer spotlight solo with couples dancing the Charleston, flaming cocktail show, champagne tower.
4. **Dim Sum Palace (金龍大酒樓, Hong Kong yum cha).** A red-and-gold banquet hall with a gold dragon-and-phoenix wall (龍鳳呈祥), crystal chandeliers and 福 lanterns. Through the window are a Hong Kong street, a green double-decker "ding ding" tram and red taxis. There are also live seafood tanks and a kitchen pass where the dim sum chef pleats har gow and loads the steamer tower.
   Guests take a number from the hostess (LED queue board) and are seated. The tea captain pours their choice of tea (普洱, 香片, 鐵觀音, 壽眉, 菊花), and guests tap two fingers on the table to say thanks. Trolley aunties push steaming carts, lift lids, call out "蝦餃! 燒賣!", serve onto the lazy susan and stamp the order card. A teapot lid left ajar asks for a refill.
   *Events:* songbird uncles hanging their bird cages (a Hong Kong tea-house tradition), live fish netted from the tank and shown to a table, a lion dance with drum and cymbals that "plucks the green" (採青), longevity peach buns (壽包) for a birthday.
5. **Gelateria.** Gelato cones and cups. *Events:* tour group, delivery, flavour special.
6. **The Fish House.** A candlelit fine-dining room with floor-to-ceiling windows over a harbour: yachts with running lights, a lit arch bridge, a lighthouse beam after dark and gulls by day. A raw bar has crushed ice, a chalkboard of oysters (Sydney Rock, Pacific, Angasi) and a three-tier plateau de fruits de mer. There is also a live lobster tank, a fish-skeleton sculpture and amber glass pendants, and an open kitchen where the head chef plates with tweezers under heat lamps and calls "Service!" while the line cook's sauté pan flares. A piano and string trio play by the windows.
   *Service:* the sommelier presents and pours, and the host swirls, sniffs and nods. The shucker opens oysters for the first course. The tasting menu (crudo, crispy-skin fish, chocolate dome) then arrives under silver cloches that are lifted with a flourish, and guests toast between courses.
   *Events:* an incognito Michelin inspector taking notes ("The inspector is here…"), the maître d' showing a live lobster to a table, crêpes Suzette flambéed tableside on a guéridon, a marriage proposal (she says "Yes!", hearts float up and the room applauds), and fireworks over the harbour (peony, willow and ring shells reflected in the water).
7. **Ocean, Desert, Neon, Aurora, Cosmic.** The original five non-food worlds always come last.

All food worlds share a day-to-night cycle tied to your progress. Weather can be clear, rain, snow, storm (with thunder and lightning) or wind. Lights come on at dusk, and the time and weather tint the blocks. Closing time brings out a wet floor sign and stops new guests from arriving.

## Fan tributes
* **Mike's Pastry** (Boston) is an unofficial fan tribute. It is not affiliated with or endorsed by Mike's Pastry. The signage is hand-drawn in code and no logos are reproduced.

## Screenshots
`screenshots/` holds a gameplay capture of every world (`screenshot-<world>.png`) plus `screenshot-menu.png` and `screenshot-stage-select.png`.

## Fonts and licenses
* **Yuji Syuku** by Kinuta Font Factory, under the SIL Open Font License 1.1. A subset containing only the glyphs used is embedded as base64 WOFF2 for the Japanese and Chinese brush signage.
* **Noto Serif CJK HK** (Bold) by Google and Adobe, under the SIL Open Font License 1.1. A few Cantonese and Traditional-only glyphs that the brush font lacks (嘢 洱 糕 雞) are embedded as a tiny subset, so text never falls back to tofu boxes.
* Everything else (art, music, code) is original and generated procedurally.
