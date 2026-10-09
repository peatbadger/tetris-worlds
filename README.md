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
7. **Trattoria da Nonna Rosa.** A wood-fired oven with a mosaic-tiled dome and live fire. The pizzaiolo stretches, spins and sauces the dough, tears the cheese and slides pies in on a long peel, and you can watch them blister and bubble inside. On the right, the pasta cook flips pans that flare, the stockpot steams and Nonna rolls pasta on a floured board. The room has Chianti fiaschi in the wine rack, garlic braids, chillies and a prosciutto leg hanging from the beam, a chalkboard of the day's dishes and a corner TV showing the match. Through the arched window is a piazza with a campanile, laundry lines, a fountain, pigeons, string lights at night and passing Vespas (one carrying a pizza box).
   Tables have red gingham cloths, bentwood chairs, candles in straw fiaschi whose wax drips grow over the evening, and bread baskets with olive oil. Guests eat with a cheese pull and twirl their pasta. They talk with the pinched-fingers gesture and do the chef's kiss. Mamma Rosa greets parties with "Benvenuti!"
   *Events:* a dough-toss show, a strolling accordion serenade, pasta finished tableside in a Parmigiano wheel flamed with grappa, a goal on the TV (the whole room jumps up shouting "GOOOL!" under tricolore confetti), and Nonna bringing tiramisù ("Mangia! Mangia!").
8. **Golden Arches** (fan tribute). A bright fast-food restaurant with two registers staffed by crew in red polos and caps. Behind them, patties are flipped on the flat-top and cheese goes on, fry baskets bubble, beep, are shaken and salted, and the heated holding cabinet and drink tower are stocked. The cashiers punch in the order, walk the line to grab the burger, scoop the fries and pour the drink, then bag it or put it on a tray and call "Order 123!". A PREPARING / READY board tracks every order number, and the digital menu boards animate (a combo, fries and drinks promos). There are also self-order kiosks, red booths, a manager with a clipboard, and a drive-thru where cars roll up and the headset crew hands out bags. Out the window is the parking lot with a pole sign that glows after dusk.
   *Events:* a kids' birthday party (paper crowns, balloons, the crew singing, blowing out the candles, confetti), the soft-serve machine is "SORRY! out of order" until a technician fixes it to cheers, delivery couriers with insulated backpacks collecting bags, and the lunch rush.
10. **Taiwanese Night Market (夜市).** A lantern-lit alley of Taipei shophouses under glowing vertical lightbox signs (鹽酥雞, 豆花, 滷味, 刈包, 芒果冰…), with a temple gate (饒河街觀光夜市) at the end of the street and Taipei 101 on the horizon. At the 大雞排 stall, the vendor fries cutlets bigger than your face, snips them with scissors and shakes them with pepper salt in a paper bag. The 臭豆腐 auntie fries stinky tofu and calls out to passers-by (the stink drifts up in green wisps). Oyster omelettes (蚵仔煎) bubble on the griddle and get their pink sweet sauce, and bubble tea is shaken and heat-sealed next to a 射氣球 balloon-dart wall. Red paper menu strips hang over each stall under bare bulbs. Customers queue, eat as they stroll, photograph the food, or sit on red plastic stools.
   *Events:* the giant cutlet held up for photos, fireworks over the rooftops (the crowd looks up and gasps), a scooter beeping its way through the crowd, a kid winning a huge plush bear at the balloon game, and the 電音三太子 (Electric Third Prince) temple dancers in sunglasses parading through to techno drums.
9. **Ocean, Desert, Neon, Aurora, Cosmic.** The original five non-food worlds always come last.

All food worlds share a day-to-night cycle tied to your progress. Weather can be clear, rain, snow, storm (with thunder and lightning) or wind. Lights come on at dusk, and the time and weather tint the blocks. Closing time brings out a wet floor sign and stops new guests from arriving.

## Fan tributes
* **Mike's Pastry** (Boston) is an unofficial fan tribute. It is not affiliated with or endorsed by Mike's Pastry. The signage is hand-drawn in code and no logos are reproduced.

* **Golden Arches** is an affectionate, unofficial tribute to the classic fast-food restaurant. It is not affiliated with or endorsed by any fast-food company. No real logos, mascots, product names or trademarks are used: the sign is a generic single arch over "GA", and every menu name is generic.

## Screenshots
`screenshots/` holds a gameplay capture of every world (`screenshot-<world>.png`) plus `screenshot-menu.png` and `screenshot-stage-select.png`.

## Fonts and licenses
* **Yuji Syuku** by Kinuta Font Factory, under the SIL Open Font License 1.1. A subset containing only the glyphs used is embedded as base64 WOFF2 for the Japanese and Chinese brush signage.
* **Noto Serif CJK HK** (Bold) by Google and Adobe, under the SIL Open Font License 1.1. A few Cantonese and Traditional-only glyphs that the brush font lacks (嘢 洱 糕 雞) are embedded as a tiny subset, so text never falls back to tofu boxes.
* Everything else (art, music, code) is original and generated procedurally.
