# Delicious Tetris — build progress
Harness: `node tools/shot.js <id|all> [linesInStage] [weather] [outPng] [waitMs]` (build first: `python3 build.py`).
Publish: copy index.html, README.md, src/, build.py, fonts/, screenshots/ to /workspace/tetris-pages, commit, push main.
Shared helpers for new worlds: src/18_kit.js (Kit.*). Speed ramp eased in 20_game.js. Amb.force(id, weather) for tests.

| # | World | id | Status |
|---|-------|----|--------|
| 1 | Kaiten Sushi | sushi | live (previous builder) |
| 2 | Mike's Pastry | mikes | live |
| 3 | Speakeasy | speakeasy | live (no raid; singer/Charleston, flaming cocktail, champagne tower) |
| 4 | Dim Sum | dimsum | live |
| 5 | Cinema Lobby | cinema | TODO |
| 6 | Gelato | gelato | live |
| 7 | Fish House | fishhouse | live |
| 8 | Pizzeria | pizzeria | live |
| 9 | Golden Arches | fastfood | live |
| 10 | Taiwanese Night Market | nightmarket | live (screenshot-nightmarket.png) |
| 11 | Boba Milk Tea Shop | boba | live (screenshot-boba.png) |
| 12 | Yakitori | yakitori | TODO |
| 13 | Curry House | curry | TODO |
| 14 | Lawson-style Konbini | lawson | TODO |
| 15 | Japanese Tea House | teahouse | TODO |
| 16 | Fukuoka Oden Yatai | oden | TODO |
| 17 | Taiwanese Hotpot | hotpot | TODO |
| 18 | Ramen Yokocho | ramen | TODO |
| 19 | Korean BBQ | kbbq | TODO |
| 20 | Parisian Patisserie | patisserie | TODO |
| 21 | Melbourne Laneway Cafe | laneway | TODO |
| 22 | Thai Floating Market | floating | TODO |
| 23 | Turkish Bazaar | bazaar | TODO |
| 24 | Chocolate Factory | chocolate | TODO |
| 25 | Mexican Taqueria | taqueria | TODO |
| 26 | Saint Peter | saintpeter | TODO |
| 27 | Karaoke Room | karaoke | TODO |

## People v2 — realistic anatomy (user feedback: "too simple… I want them to be realistically shaped")
- GenerateImage cut-out pipeline was suggested but **no image-generation tool is available** in this environment, so the procedural renderer in `src/04_people.js` was rebuilt instead (original kept in git history).
- ~1:7 head-to-height proportions; skull + cheekbones + jaw/chin per sex/age; tapered neck with trapezius flare, SCM, Adam's apple.
- Torso traced anatomically (sloped trapezius → deltoid → ribcage → waist → hips) with per-garment hem lengths, trouser seat/fly/belt, apron skirts with folds, collar/armpit/side shading, subtle chest planes (no "muscle suit" on loose tops).
- Arms/legs are seamless profiled limbs (bicep/forearm, thigh/knee/calf) with cylindrical shading, gravity-correct elbows (fixes the old crossed-arms look), sleeves with elbow creases and cuffs, pressed trouser creases; hands with palm, articulated fingers, thumb, knuckles; shoes with toe box/sole/heel.
- Faces: eye sockets, almond eyes with iris/catchlight/lids, filled brows, modelled nose, shaped lips, smile folds; hair with volume, sheen and strand clumps; ears with helix.
- Kaiten Sushi: itamae, far diners and foreground silhouettes all rebuilt on the new rig. All makeVenue worlds pick it up automatically (walk/rest arm targets retuned in 05_scene.js).
- Lab tool: `node tools/people.js out.png [scale] [spacing] [start]`. Before/after: `screenshot-people-v2.png`.

## Block faces
- Removed faces where they hide the food: sushi, pastry, dim sum, gelato, fish house, pizzeria (`noFace: true`). Night market keeps a face only on the milk-tea cup, Golden Arches only on packaging (fry carton, sundae cup, soda cup) via `faceTypes`. Boba and speakeasy glassware keep faces.
- Blocks keep their character through motion: hop/shiver reactions, travelling glisten, topping flutter that speeds up in danger, sparkle on the falling piece.
- All 10 live worlds re-shot after the change (no console errors, 19–34 fps headless).

## Painted (illustrated) art direction — Kaiten Sushi first (user-approved)
- Scope: ONLY Kaiten Sushi converted, awaiting user review before any other world.
- Pipeline `tools/art_build.py` (PIL + numpy): chroma-keys `art/<world>/*-green.jpg` (screen colour sampled from the border, soft alpha ramp, colour un-mixing + green-spill suppression), splits sheets at the deepest column valleys (known pose counts / `rows` / optional `cuts` / `boxes`), removes neighbour fragments (pure-numpy connected components), anchors each pose on its waist cut-line so poses cross-fade aligned, writes `assets/<world>/*.webp` + `assets/manifest.js` (embeds `art/<world>/scene.json`: occlusion lines, spots, belt path, lanterns, window). `tools/art_contact.py` = contact sheet, `tools/art_preview.py` = static layout preview, `tools/record.js` = scripted webm capture.
- Runtime: index.html loads `assets/manifest.js` + images behind a loading screen (single-file requirement dropped; Pages serves the folder). Falls back to the procedural stage if art is missing.
- Stage `src/12b_stage_sushi_art.js`: bg cover/fit-width with parallax; time-of-day + weather re-colour the window (rain/snow/storm flashes), grade + lantern glow brightening at night; swaying painted lanterns, kitchen steam, motes; belt with photo sushi on drawn plates (some domed) moving right→left; plate stacks per diner.
- People: chef (board), taishō/master (pass), apprentice (behind the glass case, seen through the glass), diners sal / sal2 / woman / grandpa+kid / couple. Cross-fades + breathing, sway, pose-specific motion (laugh shake, cheer bounce, chewing, bows). Per-character behaviour AI: weighted choices that avoid recent actions, randomized durations, hunger and mood; orders (tablet, raised hand, waving) → chef plates a piece onto the belt for that diner / taishō torches or glazes then hands it across; woman photographs plates the chef served (flash); kid cheers → grandpa smiles; taishō chats → grandpa/kid respond; taishō wipes his knife → apprentice glances nervously; arrivals/departures with いらっしゃいませ / ありがとうございました bows; line clears → personality reactions. Parties leave and new ones arrive (seat empties first).
- Blocks: the 7 photo sushi (saba, tamago, ikura, kappa, maguro, ebi, salmon) on dark lacquer tiles, no faces; hop/shiver, glisten, ikura twinkle kept.
- Not done: per-character blinks (eye positions unknown in the painted sprites).
- Output: `screenshot-sushi-illustrated.png`, `sushi-demo.webm` (12 s).

## Responsive layout + touch controls (Oct 2026)
- Well now fills ~94–96% of the viewport height (was ~20.6 rows + 50px margin); JS layout picks **landscape** (HOLD/stats | well | NEXT/keys) or **portrait** (well + narrow right column with HOLD/stats/3×NEXT/mute/pause, thumb buttons underneath). Safe-area insets read from an `env()` probe; DPR-crisp canvases; relayout on resize / orientationchange / visualViewport.
- Keyboard help collapsed into a `<details>` (closed); hidden on touch devices.
- Touch gestures on the play area: drag ↔ = move (≈0.85 cell steps), tap = rotate CW, two-finger tap = rotate CCW, slow drag ↓ = soft drop, flick ↓ = hard drop, flick ↑ = hold. Uses event timestamps for velocity.
- On-screen buttons (#touchpad, toggle in Pause, saved in localStorage `dt_btns`): ◀ ▶ (DAS/ARR repeat), ▼ soft (hold), ⤓ hard, ⟳ CW, ⟲ CCW, HOLD; pause = ❚❚ in the side panel.
- iOS: viewport-fit=cover, no user zoom, touch-action none, no callouts/selection/double-tap zoom/rubber-band; `AudioEngine.unlock()` (silent buffer + resume) on first touch/click. A2HS meta + icon-180/192/512 + manifest.webmanifest.
- Sushi painted stage covers by height on portrait/squarish screens.
- Test: `node tools/devices.js [url]` (iPhone 14 portrait/landscape, iPad Pro 11 landscape, 1920×1080) → screenshot-<device>.png + JSON of gesture/button checks.

## Oct 9 2026 — Kaiten Sushi: GEOMETRIC art direction (flat mid-century, procedural Canvas 2D)
- The old painted path is gone: 12b_stage_sushi_art.js removed, assets/sushi removed, manifest emptied, art/sushi/sheets.json → sheets.json.disabled. No fallback.
- New files: 12c_sushi_geo_pal.js (named palette slots: morning / lunch / dusk / night / snow, blended by the in-game clock 12:00 → 08:00),
  10b_geo_sushi.js (flat true-colour sushi + plates), 12d_sushi_geo_fig.js (articulated faceless figures, 2-bone IK), 12e_stage_sushi_geo.js (scene + life sim).
- 14 customer types, 17 party types weighted by time of day; chef + waitress AI; belt never stops; special orders; tea refills; plate stacks; bills; line-clear reactions.
- Blocks: 14a_skin_sushi.js now draws flat nigiri/maki/gunkan on palette tiles (cache keyed by palette via SKINSETS.key()).
- Debug: window.__sushiGeo.{setHour, lapse(rate, from), timeScale, weather, spawn}. Tools: tools/geo.js (screenshots), tools/record_geo.js (demo video).

## Oct 9 2026 — Kaiten Sushi: blocks MADE OF FOOD (14a_skin_sushi.js → SushiFood)
- Mapping: I ikura · O tamago · T salmon nigiri · S maguro · Z edamame · J saba (silver-blue, tiger stripes) · L avocado maki.
- Cells fill edge-to-edge; same-piece cells form one mass via per-cell connectivity (g.meta[y][x] = {pid,lx,ly,pcx,pby,born,cut}, recorded in Game.lock, fragments re-id'd + cut faces in Game.splitFragments). Different pieces separated by an inset dark gap + contact shadow.
- Textures pre-rendered per pixel size (cache key v:mask:cut:variant); periodic patterns (salmon stripe 1/3, maguro grain 0.5) keep masses continuous. s<18px bakes beads/pods into the base (small-iPhone mode).
- Live: ikura beads jiggle individually (bead sprite), edamame pods shift, glint sweep; per-piece affine wobble (landing squash + idle jiggle, about piece base so seams never open); rotate shake on the active piece; ghost = faint food-coloured outline. HOLD/NEXT via SushiFood.mini.
- Line clear: food-specific particles (beads scatter, pods/beans pop, maki roll, tamago squish+crumbs, nigiri/sashimi slide off, sparks) outliving CLEAR_TIME.
- 30_main.js: drawBoard/drawMini delegate to SKINSETS[skin].mass when present (generic hook other worlds can adopt).
- Tools: tools/foodstack.js (mixed stack + fps), tools/foodclip.js (landing + Tetris clip). Outputs: screenshot-sushi-food-{stack,closeup,iphone,16px}.png, sushi-food-clip.webm.
- Fallback: git tag `fallback-original-art` (= fe70099) in peatbadger/tetris-worlds holds the full pre-restyle game (all original world art). Restore: `git checkout fallback-original-art`.

## Oct 9 2026 (night) — RESTYLE ALL WORLDS in the geometric language ("same art style, different worlds")
Shared engine (new):
- `src/12b_geo_kit.js` **GeoKit**: `GeoKit.palette(P, KEYS)` (named slots per time of day, clock-blended, rain/snow variants),
  `GeoKit.stage(spec)` (resize/camera/pan, clock from env.p via startHour+span, fixed-step sim, grain, vignette, debug `window.__geo`
  {setHour, lapse, weather, timeScale, K, debug}), actor runtime on the SushiFig rig (K.mk, K.start/K.ph phases, springs, walk, sitDown/standUp,
  hold.N/F items with their own draw(), bubbles/icons, effects), helpers K.sky / K.weather / K.shafts / K.glow.
  SushiFig colours now go through `GeoKit.lit` (active world palette); sushi calls `GeoKit.use(SushiPal)`.
- `src/12d_sushi_geo_fig.js`: new torso patterns vest/dress/polo/qipao/jacket/tee and hats flatcap/fedora/cloche/paper/visor/beret/kerchief/feather.
- `src/14_foodmass.js` **FoodMass(spec)**: the sushi food-block engine generalised (paint/live/sprites/soft/glisten/clear/partDraw hooks).
  Sushi now = `FoodMass(sushiSpec)` (pixel-identical). Each world: `SKINSETS.<skin> = XFood.skin()` → 30_main uses `.mass`.
- Tools: `node tools/gw.js <world> out.png [hour] [weather] [warmSec] [w] [h] [sceneOnly] [mobile]` (real mixed stack + fps + actors + errors).
- Fallback: tag `fallback-original-art` (fe70099) = whole pre-restyle game.

### World 2 · Mike's Pastry (DONE) — `src/40_geo_mikes.js` + `src/41_food_pastry.js`
- Overrides the old venue factory via registerStage('mikes'). Old 22_world_mikes.js still in the tree (unused) for the fallback.
- Scene: pressed-tin ceiling, menu board, string spools, espresso machine, glass case with 7 trays (counts go down when picked; Tony refills),
  mirror behind the board (calm), photo wall, window onto Hanover St (brick, fire escapes, awnings, festoon lights, lamp post, Freedom Trail tour passing),
  door with OPEN/CLOSED sign, marble table by the window, checker floor. Palettes morning/day/dusk/night + snow; neon OPEN at dusk/night; Sal flips sign at open/close.
- Cast: Gina boxes orders (picks from tray → box → lid → string from spool → wrap → tie → hands box over → takes cash → register drawer + ding),
  Sal (plates + espresso from the machine for eat-in, comes round the case to serve and clear the table, wipes kid fingerprints off the glass, flips the sign),
  Tony (fresh trays from the kitchen door). Customers (max 5, no duplicate types): tourist (map, photo), local, student, suit (dozen box), nurse, nonno (newspaper, espresso),
  mum+kid (kid presses hands on the glass → smudge), date couple. Eat-in: bites shrink the pastry, sips empty the cup, chat lines, leave; Sal clears.
- Blocks: I cannoli · O Boston cream pie · T strawberry cheesecake · S pistachio · Z chocolate fudge · J lavender macarons · L napoleon.
- Shots: screenshot-geo-mikes-day.png / -night.png.

### World 3 · The Speakeasy (DONE) — `src/42_geo_speakeasy.js` + `src/43_food_cocktail.js`
- Clock 19:00 → 05:00 (Doors open / Night / Last call / Dawn) + rain/snow on the street grate (legs + car passing).
- Scene: hidden door with peephole slot + raid bulb (Moe the doorman: knock → slot → "Password?" → answer → door opens),
  bar with back bar (3 shelves of bottles, mirror), sunburst mirror behind the board (calm), stage on the right with curtain and footlights.
- Band = small trio at the side (clarinet, upright bass in front of the bassist, upright piano). The singer only appears for her
  spotlight: lights dim, cone, she walks to the ribbon mic and holds it, sings ~14 s, applause, walks off.
- Eddie makes real drinks: glass from rack → bottle from shelf → pour/shake/strain (champagne cork pop) → level rises → garnish → served;
  patrons sip (level drops), Eddie collects empties, polishes glasses. Patrons (≤4, unique types): flapper, gent, reporter, heiress, sailor, cop.
- Rare raid: back bar flips to books, glasses hide, pianist plays a hymn, "All clear!".
- Blocks (liquids, live bubbles + slosh): I beer w/ foam · O old fashioned (ice cube + peel) · T negroni · S red wine · Z mojito (mint) · J martini (olive) · L champagne.
- Shots: screenshot-geo-speakeasy-day.png (19:36) / -night.png (23:30 snow, spotlight).

### World 4 · Dim Sum Palace (DONE) — `src/44_geo_dimsum.js` + `src/45_food_dimsum.js`
- Clock 07:00 → 23:00 (Yum cha / Lunch rush / Afternoon tea / Banquet / Closing) with morning/day/dusk/night palettes, rain/snow in the moon window + lattice window, OPEN/CLOSED sign, lit windows across the street at night, tram passing.
- Scene: coffered red ceiling, cream panels, red lacquer wainscot, centre = gold dragon & phoenix with pearl (calm behind the board), red lanterns + small chandelier, kitchen swing door (behind HOLD), tea station with hot-water urn + bus tub, two round tables with white cloths + banquet chairs.
- Auntie May pushes the steamer trolley (steam): calls the dish → lifts the bamboo lid (puff) → sets the basket on the table → lid back → stamps the card (stamps accumulate); restocks through the kitchen door, clears table A into the trolley.
- Mr Lau: refills teapots when a diner flips the lid (takes the pot → urn → fills → back, diner taps fingers), brings the bill after "Mai dan!" (diner pays cash), stacks empty steamers into the bus tub, wipes; sweeps at closing.
- Diners (≤4, unique types): popo+gonggong (newspaper), office worker, couple, tourist (photo flash), student, mum+kid. They pour tea for each other (cup levels, finger-tap thanks), pick dumplings with chopsticks (basket counts go down, empties get stacked), sip, chat, wave for the trolley, pay, leave.
- Surprise: lion dance passes the moon window (everyone turns to look). Big clear: big steam burst + "Hot har gow!".
- Blocks: I har gow (pink translucent, pleated crest, shrimp) · O siu mai (yellow wrapper, roe) · T char siu bao (split crown) · S jade chive dumpling (pan-fried base) · Z char siu (lacquered slices) · J taro bun (lavender swirl) · L sesame balls. Steam curls off the top cells.
- Shots: screenshot-geo-dimsum-day.png (10:30) / -night.png (21:00 rain).

### World 5 · Gelateria (DONE) — `src/46_geo_gelato.js` + `src/47_food_gelato.js`
- Clock 10:00 → 23:30 (Morning / Afternoon / Passeggiata / Night / Closing): shutter rolls up at opening, APERTO/CHIUSO sign, neon "Gelato" in the window at dusk/night, tins lidded at closing; rain/snow on the piazza.
- Scene: striped scalloped awning, pastel checker tiles, arched chalk menu with the 7 flavours + prices (calm behind the board), ceiling fan, shelf of cone boxes, curved glass case with 7 sculpted tins (levels drop as Giulia scoops), cone stand, coin tray, taster spoons; piazza window (fountain, Vespa that rides off and comes back, passeggiata strollers busier at dusk), standing ledge, archway, waffle-cone station.
- Giulia: greets, offers a taster spoon (customer tastes), takes a cone from the stand, scoops each flavour with the spatola (tin level drops), packs it on the cone, hands it over, customer pays a coin; sculpts tins, smooths low tins, wipes the glass; calls Marco when cones run low.
- Marco: ladles batter on the waffle iron, closes the lid (steam), opens, rolls the cone on the form, racks it; carries the rack across to Giulia's stand.
- Customers (≤4, unique): nonna+kid, couple, tourist (photo), cyclist, dog walker + dog (Giulia hands the dog a tiny cup), suit (coppetta). They queue, order, lick (scoops shrink and drip), chat, eat at the ledge, leave through the arch. Surprise: the kid drops a scoop (splat on the floor) and gets a free one.
- Blocks: I pistachio · O fragola · T limone · S cioccolato · Z mango · J mirtillo · L stracciatella — spatula-wave ridges, scooped mound crowns with garnish (nuts, strawberry, lemon wheel, choc curl, mango cubes, blueberries, choc stick), melt drips on exposed bottoms, melt-away clears.
- Shots: screenshot-geo-gelato-day.png (15:00) / -night.png (21:30 rain).

## Fish House (geometric restyle) — DONE
- Scene: harbour-view seafood room — big mullioned window (pier, sailboats, gulls, lighthouse whose beam sweeps at night, sun/moon reflection), raw bar with ice display on the left, white-cloth table on the right, pass + bell at the far right.
- Cycle: Lunch / Afternoon / Golden hour / Dinner / Closing (12:00→23:30), rain & snow on the glass; candle lit at dusk, snuffed and bar covered at closing.
- Cast: Ana (shucks oysters onto the platter, cracks lobster with a mallet, tends ice), Henri (menus, presents & pours wine, cloche courses from the pass, clears, bill, top-ups); one bar guest at a time (slurps oysters, shells pile up) + one table party (anniversary w/ proposal, business pair, friends, critic taking notes).
- Events: fishing boat crossing, gull landing on the sill, proposal "Yes!".
- Blocks (src/49_food_seafood.js): I lobster, O oysters on ice, T seared scallops, S mussels, Z salmon, J seaweed salad, L octopus.
- Shots: screenshot-geo-fishhouse-day.png (13:00 clear), -night.png (21:30 rain), -mobile.png.

### World 7 · Trattoria / Pizzeria (DONE) — `src/50_geo_pizzeria.js` + `src/51_food_pizza.js`
- Scene: Neapolitan trattoria. Tiled dome oven ("DA SALVATORE", breathing fire, flares on each pizza / wood / big clear, door closed at chiusura), marble bench with dough tray + sauce/mozzarella/basil bowls; calm arched window onto a Naples alley (ochre houses, shutters, laundry line, Vesuvius with snowcap in snow, string lights at night, Ape three-wheeler, cat on the street); one checkered table with a Chianti fiasco candle; wine rack.
- Cycle: Pranzo / Pomeriggio / Aperitivo / Cena / Chiusura (12:00→23:30); lit windows + string lights at dusk; sign glows at night; APERTO/CHIUSO; candle lit/snuffed.
- Cast: Salvatore makes every pizza on screen (ball → press → spinning TOSS ×2 → ladle spiral → toppings → basil → peel → oven, turn, pull → rocker cut; rare flop on his head with flour puff "Mamma mia!"); Luca: menus, order, fiasco pour (stream fills glasses), carries the pizza high, clears, tiramisu, bill; takeaway customer waits by the rack and gets a box.
- Guests: nonni / couple / tourists (photo flash); slices pulled with stretching cheese; toast "Cin cin!".
- Surprises: birthday tiramisu with candle — everyone sings, candle blown; accordionist at night (bellows animate, guest tips); dough flop.
- Blocks: I spaghetti al pomodoro · O margherita · T fior di latte · S pesto · Z prosciutto · J melanzane · L arancini (steam, basil garnish, cheese drip).
- Review fixes: waiter home moved off the diner (was clipping behind a seated guest), takeaway customer moved out of the board centre, toss height lowered so the dough stays near the hands, sign moved inside the frame.
- Shots: screenshot-geo-pizzeria-day.png (13:30 clear), -night.png (21:30 snow), -mobile.png.

## Mike's Pastry v3 (real Hanover St interior + QA step 1) — `src/40_geo_mikes.js` + `src/41_food_pastry.js`
- Real interior structure: silver tin ceiling + fluorescent panels (flicker), white subway tile w/ royal-blue band, terracotta hex floor, curved glass cases on royal-blue bases (chrome trim, gold trays), high shelf of giant cannoli over a blue flavour-label band, blue menu boards (CANNOLI FLAVORS / COOKIES BY POUND) placed in the side strips so the HUD never cuts them, cookie-tray shelving, blue/white string globes (one CASH ONLY) raised above heads, crown plaque, stainless fridge, door onto Hanover St with bell + passers-by carrying white boxes.
- Adult rig (GeoKit-wide): head ≈1/7.5 height, real shoulders, coats hang from shoulders, planted-foot eased gait (no sliding), idle weight shift/breath; muted clothing.
- Life (4–6 people, no overlaps): staff tong pastries into box, pull string from the globe, spin box twice to tie, hand over, ring register; restock/tidy/wipe/fold boxes; Tony restocks the left trays. Customers point/lean/chat, queue shuffles forward, some peek in the box and bite (sugar puff), kid nose-to-glass smudge, door opens with bell.
- Blocks v3: I = short fat blistered cannoli, one cannoli per cell pair with ricotta+chip ends meeting mid-piece; O Boston cream, T cheesecake, S pistachio, Z tiramisu, J ganache, L rainbow cookie — continuous masses, no faces/marks.
- Global: ZoneMask (shared blurred/darkened board-zone layer in every world, incl. originals) — runs in BG draw after any stage.
- Shots: screenshot-geo-mikes-day.png (15:00), -night.png (21:30 snow), -mobile.png; before/after: /workspace/shots/mikes-before-after.png (before: mikes-before-day/night.png).

## Global fixes (QA step 2)
- a) ZoneMask: shared board-zone layer for every world (geo + originals): blur (2-step downscale) + tint inside the HOLD/board/NEXT rects, so no readable text or figures ghost through. Verified in sushi, speakeasy, ocean, mikes.
- b) Web Audio: every OscillatorNode/BiquadFilterNode frequency (setValueAtTime/ramps/setTarget/curves/.value) is clamped to min(0.45·sampleRate, 20 kHz). `node tools/audiotest.js` plays all 15 worlds + fires every sfx: 0 values ≥ 20 kHz (max 19845 Hz = the clamp), 0 warnings.
- c) Speakeasy spawn: probed 64 samples at 200 ms after hard drops (/tmp/spawnprobe.js): a piece exists and is drawn in the first visible row immediately on every lock (spawn is synchronous; no ARE gap). The only piece-less windows are the intentional 2 s game-start intro and the 2.7 s world transition — most likely what the QA frame caught. No change needed.

## Speakeasy blocks v2 (QA step 3) — `src/43_food_cocktail.js`
- Real liquid in glass: flat body (no per-cell gradients → no seams), meniscus curling up at the walls with empty glass above, refraction tint + long reflection streak on the lit wall, darker far wall, thick tinted glass base with caustic line, rising bubble streams (lager, champagne beads, mojito), slosh on the surface.
- Lager: creamy irregular foam head with lacing. Old fashioned / negroni: clear ice cube poking above the surface (gradient body, lit edges, facet, crack). Old fashioned: orange-peel twist. Negroni: orange half-wheel. Martini: cool clear, two olives on a pick. Wine: legs on the glass. Mojito: crushed-ice shards, one muted mint leaf, lime wedge + sprig.
- Removed: pea-pod leaf spots, square tile insets, sprinkle dots, per-cell stripe highlight.
- Calmer backdrop: speakeasy board zone tint raised (rgba(16,10,8,0.58)) on top of the global blur.
- Shots: screenshot-geo-speakeasy-day.png (19:30 rain), -night.png (01:00 snow). Weak spot: left bar group still layers 3–4 figures closely (doorman behind seated guests).

## Gelato redo (QA step 4) — `src/46_geo_gelato.js` + `src/47_food_gelato.js`
- Board: dark pink-grey tint gone → bright warm stone well (boardBg rgba(226,212,204,0.88)), light zone tint.
- Behind the board: arched chalk menu with prices replaced by a plain tiled arch niche; the menu now sits in the left strip as a small "Gelato · Artigianale" sign; the lamp whose cord crossed the board (x 330) removed, left lamp moved to x 262.
- Blocks: flat body (no per-cell gradients → no seams), one soft spatula swipe per cell, sparse real inclusions (stracciatella shards, chopped pistachio, berry ripples), scooped crest on exposed tops, form shading; real melt drips (tongue + heavy bulb, drawn unclipped via new FoodMass `post` hook, padK 0.3) instead of pins. Garnish 1.45× larger. Strawberry "eye" ellipses removed.
- Kid's striped shirt → knit (same in Dim Sum).
- Shots: screenshot-geo-gelato-day.png (15:00), -night.png (21:30 rain).

## Dim Sum redo (QA step 5) — `src/44_geo_dimsum.js` + `src/45_food_dimsum.js`
- Blocks rebuilt seamless (flat bodies + exposed-side form lighting only). Char siu: brighter lacquer red, honey-glaze top highlight + specular line, orange rim light on the lit side, charred dark edges → reads on the dark board. Taro: purple spirals removed (smooth lavender dough, fine flecks, domed highlight). Har gow: shrimp glows through translucent skin, soft pleats. Siu mai: pleated wavy wrapper edges + roe cap. Bao: three short splits at the crown instead of the lens slit. Steam: soft occasional puffs instead of hook squiggles.
- Dragon & phoenix relief behind the board → plain lacquer panel with a quiet gold ring.
- Waiter home moved 940 → 1035 (and towel spot to the right of the urn) so nobody stands behind NEXT.
- Shots: screenshot-geo-dimsum-day.png (11:00), -night.png (21:00 rain).

## Fish House redo (QA step 6) — `src/48_geo_fishhouse.js` + `src/49_food_seafood.js`
- Blocks drawn in whole-piece coordinates (vr = lx + 4·ly) so patterns run on across cells: O = one big oyster (pearly radial meat, dark frilled mantle ring, rough layered shell rim on exposed sides); S mussels = continuous blue-black shell with growth-line arcs + nacre sheen, orange meat where they open at the top; J wakame = glossy ribbons flowing across the piece; Z salmon fat lines continuous, crisp skin below; T seared scallop flesh with caramel sear; L octopus with suckers only along the exposed underside; I lobster tail: one segment per cell, meat at one end, fanned tail at the other. Ring/tile pictures and ice diamonds removed.
- Behind the board: zone tint raised (rgba(18,22,28,0.62)) + near-opaque well (rgba(22,24,28,0.9)) so the sea/boats no longer read through.
- Bug fix: Ana's shucking "shake" was set to 1 (radians!) → she folded over sideways at the bar. Now a small ±0.025 oscillation; she also stands at x 104 so the oyster tray is within reach.
- Shots: screenshot-geo-fishhouse-day.png (13:00), -night.png (21:30 rain).

## Trattoria / Pizzeria redo (QA step 7a) — `src/50_geo_pizzeria.js` + `src/51_food_pizza.js`
- Wiring verified on the live site: stage id 'pizzeria' (display name "Trattoria") resolves to the GeoKit factory (`window.__geo.id === 'pizzeria'`). The QA run saw the old "Trattoria da Nonna Rosa" venue with 3D mannequins — a stale deploy/cache; that venue is only the fallback factory, overridden by `registerStage('pizzeria', makeGeoPizzeriaStage)`. All figures are GeoKit adult rigs.
- Blocks in whole-piece coordinates, no tiles/plates: O = one margherita across the 2×2 (torn mozzarella, basil, leopard-spotted crust on the exposed rim); I spaghetti strands running the full length + ladled sauce; T fior di latte milky mass with an olive-oil thread + cracked pepper; S glossy pesto with leaf flecks + pine nuts; Z prosciutto folded ribbons flowing across; J melanzane parmigiana layers (aubergine / tomato / mozzarella) with browned top; L arancini crumb crust. Steam hooks → soft puffs; clip-art garnishes removed.
- Nobody behind the HUD: Luca's home 972 → 1012; takeaway customer and accordionist wait at the right edge (x ≈ 1295, facing in) instead of x 860–880.
- Shots: screenshot-geo-pizzeria-day.png (13:30), -night.png (20:30 snow), -mobile.png.

## Golden Arches / Night Market / Boba blocks (QA step 7b)
- Boba (`src/55_food_boba.js`, new FoodMass skin replacing the kawaii-faced cup tiles): each piece is one clear cup — tiger-stripe brown sugar milk with pearls settled on the bottom, mango green tea under thick cheese foam, taro milk + taro balls, matcha latte + red bean, strawberry milk with purée streaks, thai tea with milk cloud, honeydew + coconut jelly cubes; sealed cellophane film on top, lit/far cup walls. No faces.
- Night Market (`src/56_food_nightmarket.js`, replaces the tile-with-picture skin + faced cups): sausage with diagonal grill marks, giant cutlet craggy crumb, stinky tofu with pickled cabbage, tanghulu candied strawberries under glass sugar, oyster omelette with red sauce, pearl milk tea, pepper bun with sesame + scorched base.
- Golden Arches already runs the FoodMass fast-food skin (`src/53_food_fastfood.js`: fries / burger layers / soft serve / lettuce / ketchup / cola / shake) — no faces or tiles.
- Text behind the board (menus, flavour wall) in all three is now blurred + dimmed by the global ZoneMask.
- Still open: these three worlds still use the older 3D-ish venue figures; GeoKit remakes are next.
- Shots: screenshot-fastfood-blocks.png, screenshot-nightmarket-blocks.png, screenshot-boba-blocks.png.

## Speakeasy bar spacing (QA follow-up) — `src/42_geo_speakeasy.js`
- At most 3 figures in the bar group: two stools only (x 100 / 246, the hidden standing spot behind HOLD removed), bartender works between them (home 176; works beside the glass via `workX`, never over a guest's head).
- Doorman moved to the door (x 30) and drawn behind the patrons; slimmer build.
- Muted outfits: sailor in a plain navy peacoat (no stripes); the rig's dress tiers are now drawn at 30% (subtle fringe, not bands).
- Shots: screenshot-geo-speakeasy-day.png (19:00), -night.png (22:00 rain).

## Standing pose fix (all GeoKit worlds; reported on Mike's v3 day) — `src/12b_geo_kit.js`
- Cause: standing feet were placed closer together than the hips (near foot +0.055T, near hip +0.3·hw) so the legs converged into an X, and the standing hip sat 1.5% below full leg length so the knees visibly bent.
- Fix: standing feet now sit under the hips (slight natural A-stance, near foot a touch forward), and the standing hip height blends from 0.875T (still) to 0.865T (walking) so legs are nearly straight at rest while the gait keeps soft knees.
- Shots: screenshot-geo-mikes-day.png (11:00, the white-shirt tourist), screenshot-geo-mikes-night.png (20:00 rain).

## Golden Arches — full GeoKit remake (`src/52_geo_fastfood.js`, assembled from wip/f1–f4 + wip/ga/*)
- Adult-rig crew in the visible left strip: Mia (drive-thru window with cars + driver's arm, soda fountain that really fills the cup, bagging, tray running) and Jay (fryer: basket down, bubbles, BEEP, shake, dump, salt; flat-top: patties, flip, cheese, bun, wrap into the heat-lamp chute; thumps the broken shake machine back to life). Menu boards flip BREAKFAST → BURGERS at 10:30; "Shake — SORRY" while the machine is down.
- Calm centre: the picture window onto the road and pole sign (blurred by the ZoneMask behind the board).
- Right strip: self-order kiosk (tap tiles, receipt, number tent) + one booth (eat / fries / sip / kid's toy & balloon that escapes to the ceiling / selfie / phone), leaving guests tip the tray into the bin.
- Rush hour busier but tidy: a takeaway guest steps up to the counter in front of Mia (orders, waits on the phone, takes the bag) at lunch/dinner; parties arrive faster; a party leaves after ~55 s of eating.
- Fixes found in review: kitchen remapped into the strip (it was behind HOLD); fry "shake" was 1 radian (fold-over bug) → ±0.025 oscillation; selfie no longer aborts a mate who is ordering; trucker in a plain knit (no stripes); lobby moved right so the kiosk isn't behind NEXT; staff floor lowered so the counter hides their legs.
- Shots: screenshot-geo-fastfood-day.png (12:30 lunch rush), -night.png (21:00 rain), -mobile.png.

## Night Market — full GeoKit remake (`src/54_geo_nightmarket.js`; replaces the 3D crowd venue)
- Left strip: Auntie Lin's charcoal stall (炭烤香腸) — turns each sausage with tongs (they flip on the grill), brushes glaze, fans the coals (sparks, coals brighten), restocks raw sausages from the cooler, torches beef cubes with a blowtorch (blue flame, cubes darken) and hands a sausage in a paper sleeve across the counter.
- Right strip: Kai (雞排) dredges a cutlet in flour (puff), lowers it into the oil (bubbles + steam), lifts it with the spider, drains, peppers and bags it; Mei pours winter-melon tea from the brass urn (stream, cup fills), lids and straws it.
- Calm centre: street of far stalls, lanterns and bulb strings under the ZoneMask. Buyers (max one per stall) order, reach for the food, eat a few bites on the spot and stroll off; 1–2 strollers drift through and browse only an empty stall (no piling up). Rain: tarps drip, wet-street reflections, strollers carry umbrellas.
- Clock 17:00 → 02:00 (dusk → night → late), crowd density follows the hour.
- Shots: screenshot-geo-nightmarket-day.png (17:36 dusk), -night.png (21:30 rain).

## Block-skin audit (2026-10-09, step 0)
Method: runtime STAGES→SKINSETS map (headless), grep of every skin/food file for cross-world painter calls,
shared helpers (SkinKit, sushiTex, FoodMass defaults), plus a concept/visual look-alike pass.

Runtime map (later assignment wins): sushi→SushiFood(14a) · mikes→PastryFood(41) · speakeasy→CocktailFood(43) ·
dimsum→DimsumFood(45) · gelato→GelatoFood(47) · fishhouse→SeafoodFood(49) · pizzeria→PizzaFood(51) ·
fastfood→FastFood(53) · nightmarket→NightFood(56) · boba→BobaFood(55) · ocean/desert/neon/aurora/cosmic → built-in
16_skins styles glass/sandstone/neon/ice/gem (originals, untouched).

Code-level findings
- No active food file calls another world's painter; FoodMass (14) is an engine only (no default/fallback painter,
  every skin sets noFace). The old tile skins 14b–14h and 28_10s/28_11s are dead (overridden by 41–56).
- SkinKit (14a) is not referenced by any active skin. 16_skins.sushiTex is dead code.
Concept / look-alike leaks (to fix in each world's turn)
- Trattoria Z "prosciutto": pink/white diagonal ribbons = visual clone of Kaiten salmon → replace.
- Fish House: salmon fillet (sushi), seaweed salad (sushi edamame/wakame family), octopus (tako) → whole new set:
  oysters on ice, lobster tail, prawns, mussels, scallops in shell, crab, whole grilled fish.
- Night Market J pearl milk tea duplicates Boba's whole set → replace (e.g. grilled squid / scallion pancake).
- Golden Arches L strawberry shake ≈ Boba Z strawberry milk; cola uses the same glass-wall recipe as Speakeasy → keep
  shake (different vessel/whip) but re-tone Boba strawberry; cola stays a paper cup look, not glass.
- Mike's Z tiramisu: Trattoria must NOT use tiramisu (use e.g. ravioli/cannelloni instead).
- Gelato pistachio/cioccolato vs Mike's pistachio-ricotta/ganache: different forms (sculpted waves vs layered
  slices) — acceptable, but keep tones distinct.

## Step 0 — global (QA round 2)
- HUD panels: --panel rgba(12,10,16,0.93) + backdrop blur 14px on .box/.stats → nothing reads through.
- ZoneMask: after the blur, the board/HUD zone is flattened toward its average colour (0.62) + stage tint, so no
  figure/facade shape shows through the board in any GeoKit world.
- Rig life layer (12b stepActor): breathing, slow weight shifts, gaze drift, hand micro-drift for calm acts (opt-out a.noLife).
- tools/gutter.js measures the HUD-hidden zone per viewport (1024x594…1920x1080): common safe strips are
  scene x < ~216 (left, for a standing adult centre) and x > ~1064 (right). Fixed stationary spots:
  Speakeasy stools 88/206 · Dim Sum table A 134 (seats 54/212), trolley home 214, waiter 1066 · Golden Arches grill
  220–262, Jay 214–216, takeaway spawns hidden at 380 · Fish House stools 84/204, shucker ≤206, table 1148 · Night
  Market Kai 1066 (flour 1046 / pot 1104 / bags 1144), SPOT_L 216 · Mike's: staff clamp (Gina ≤214, Sal ≥1068), right
  queue 1108/1220. Remaining gutter hits are walkers crossing behind the board (transient). Trattoria and Gelato
  (work stations inside the zone) are fixed in their own remake turns.
- tools/cmp.js <world>: 4x stack vs 4x Kaiten stack → /workspace/shots/cmp-<world>.png.

## Step 1 — Speakeasy blocks v3 (cocktail-photo glass)
- FoodMass engine: optional `depth` (row-from-top / rows per piece, from a per-frame pid span scan; falling piece and
  minis from their cells) and optional `diag` mask bits (NE16/SE32/SW64/NW128) — opt-in, other worlds unchanged.
- 43_food_cocktail v3: one fill level per vessel (surface/meniscus/air only on the top row, glass shoulder below),
  depth-graded liquid (bright at the surface → saturated dark at depth), light shaft, thick lit wall + one long
  specular streak, darker far wall with rim light, heavy base with caustic, mitred concave corners (gap square cut),
  refracting clear ice, world-space bead streams (irregular), slosh kept inside the walls. Removed: mint-leaf
  clip-art, champagne/honey sparkle dots, tilde twist, chevron fracture; negroni re-toned ruby; martini silver-clear.
- Compare: /workspace/shots/cmp-speakeasy.png (before: cmp-speakeasy-before.png). tools/cmp.js resets the board first.

## Step 2 — Trattoria remake
- Blocks v2 (51_food_pizza): I spaghetti al pomodoro (strands along the piece, one sauce pool + basil + parmigiano),
  O margherita (whole-surface pizza, cornicione only on exposed rim), T risotto alla milanese, S gnocchi burro e
  salvia, Z penne all'arrabbiata (replaces the salmon-like prosciutto), J lasagne (side view, bubbling gratin),
  L focaccia (dimples, oil, rosemary, cherry tomato/olive). No tiramisu (Mike's owns it).
- FoodMass: optional `shape` (piece rotation → CELLS, stored as meta.rot in the game) so patterns are centred on the
  whole piece; `diag` now also cuts the concave-corner gap square in the engine.
- Scene: kitchen remapped into the left strip (oven 44, bench 112–300, Sal 116–196, pass at 248; Luca picks up at
  212), waiter home 1072, rack 1040, table 1150 (seats 1074/1226); seated guests gain elbow-on-table/chin-in-hand
  and hands-on-cloth idles that glance at mate/street/sign instead of staring at the board. Gutter: clean.
- Compare: /workspace/shots/cmp-pizzeria.png

## Step 3 — Boba (in progress, 14:05)
- New GeoKit stage src/57_geo_boba.js (assembled from wip/bb/a–e.js): Yuki builds cups on the left (sealer 34, pearl
  pot 84, cup 128, urn 168, wall ticket printer 200, pickup shelf 204; pickup spot 214), Ben at the register (1068),
  flavour board 1092–1268, window centre with rain. Queue slots 1238/1290. Not yet pushed.
- 15:30 resource rules adopted: tools/cap.sh (flock → one headless browser at a time, `timeout 300`, pkill after);
  gw/cmp/gutter close the browser in `finally`. Iterate small (960x600, warm 8 s), final shots full size.
- Boba blocks v2 (55_food_boba): matte pearls (no specular dot), no wall/film glints, strawberry milk → lychee oolong
  (no longer echoes the Golden Arches shake), honeydew/coconut "diamonds" → winter melon + rounded grass-jelly cubes.
  Scene board updated to match (Lychee oolong 烏龍). Umbrella prop is now a real canopy.
- Boba blocks v2 final: depth-graded body (lighter at the lid, deeper at the base), exposed-edge rim, Thai tea is
  layered (milk cloud on top fading into orange — the striped version read as salmon, rejected), matcha milk
  marbling (thin), shaken oolong = darker amber with a fine foam head (lychee pieces read as eyes, rejected),
  winter melon with grass jelly settled at the bottom. Compare: /workspace/shots/cmp-boba.png (v1–v5 kept).
- Scene: guest pays, waits at the register (keeps Yuki's build line visible), walks over when the bell calls the
  number, stabs the straw, two sips, leaves. Queue 1222, order 1146. Gutter: only walkers crossing to the pickup
  (transient). Shots: shots/boba-c3.png (19:00 rain), boba-mobile.png.

## Step 4 — Golden Arches blocks v2
- 53_food_fastfood v2 (shape/diag/depth, piece-space): I fries = a loose pile of sticks along the piece (varied
  length/doneness, browned tips, salt) — replaces the unreadable yellow ribs; O burger side view (sesame bun,
  lettuce frill, cheese drips, charred patty); T soft-serve piped ridges; S chicken nuggets (craggy crumb crust);
  Z hot apple pie (blistered fried pastry, fork-crimped exposed edges, filling in the slits); J cola (depth-graded,
  fizz streams, foam head); L hotcake stack with syrup running off the top. Removed all clip-art (straws,
  cherry, lime, choc cube, cone + sprinkles, ketchup/burger flags) and the steam curls. Ketchup/lettuce blocks and
  the pink shake are gone (no Boba echo). Breakfast menu now lists Hotcakes.
- Rejected on the way: pie slits as red capsules (read as peppers), round nugget lumps (read as bubbles).
- Compare: /workspace/shots/cmp-fastfood.png (v1–v5). Shot: shots/fastfood-1280.png.

## Step 5 — Night Market blocks v2
- 56_food_nightmarket v2 (shape/diag, piece-space, smooth blobs, matte): I one long grilled sausage, O XXL cutlet with
  pale sweet-potato-starch flakes + chili dust (distinct from Golden Arches nuggets), T stinky tofu = porous fried
  crust + pickled cabbage/chili heaped on the top cells (no longer an ambiguous flat tile), S scallion pancake
  (laminated spiral), Z oyster omelette with continuous sweet-red-sauce ribbons, J mango shaved ice (replaces milk
  tea, which duplicated Boba), L pepper bun. Tanghulu's glossy balls-in-cells removed.
- Rejected on the way: grilled squid (crosshatch read as a waffle/lattice pie), zigzag sauce (read as decoration).
- Scene calmer: at most one stroller, strollers only stop to browse when neither stall is serving (fewer people
  stacked near the HUD edges). wip/nm is stale — src/54 is canonical.
- Compare: /workspace/shots/cmp-nightmarket.png (v1–v3). Shot: shots/nightmarket-1280.png.

## Step 6 — Dim Sum (round 2)
- Blocks v2 (src/45_food_dimsum.js, backup wip/45_pre_v2.js): glisten/steam removed; shape+diag continuous masses. Siu mai = chunky filling + prawn bits + roe cluster, yellow wrapper only at base (no frame/eyes). Har gow = pink prawn under translucent pleated skin. Bao = ragged red split. Char siu = single lacquered glaze mass with soft caramel patches + charred edge shading (slices/grain rejected as bacon/log).
- Scene: kitchen door moved behind the board (420–500) so the restock fade is hidden; auntie home 214→198, waiter 1066→1080 — no staff standing in the HUD gutter.
- cmp: /workspace/shots/cmp-dimsum.png (v6); screenshot-geo-dimsum-lunch.png.
- Published 52d37af; ready.txt line added. NEXT: Gelato.

## Step 7 — Gelato (round 2)
- Blocks v2 (src/47_food_gelato.js, backup wip/47_pre_v2.js): piece-space sculpted tin — soft tonal wave ridges running across the whole piece, one continuous crest wave on real top edges, inclusions folded in (pistachio nuts, fragola sauce ripple, lemon zest specks, chocolate chips, mango sorbet specks, blueberry swirl, stracciatella shards). Garnish clip-art (lemon wheel, strawberry icon, "C" curls) and hanging drips removed. Bug fixed: per-cell phase (hash of vr) caused seams — phase now per piece.
- Board: dark espresso (rgba(58,40,36,0.9)) so stracciatella/limone no longer vanish on pale pink.
- Scene (backup wip/46_pre_remap.js): case 72–450 → 14–250 (7 tins at 32px pitch, scaled tins); coin tray/taster spoons moved in; Giulia clamps 40–220; window/ledge moved to 1040–1168 with seats 1076/1140; overflow party members stand right of the lead (1086–1196) instead of 930 (gutter).
- cmp: /workspace/shots/cmp-gelato.png (v7); screenshot-geo-gelato-afternoon.png.
- Published 11800fb; ready.txt line added. NEXT: Fish House (own seafood set).

## Step 8 — Fish House (round 2)
- Blocks v2 = the house's OWN seafood set (src/49_food_seafood.js, backup wip/49_pre_v2.js): I lobster tail (curved shell plates across cells, white meat end, tail fan), O oysters on crushed ice (3 half shells, never a pair), T scallops in ribbed shells with seared scallop, S mussel heap (nacre edges, a few gaping with orange meat), Z heap of curled grilled prawns, J crab legs (knobbly tubes, joints, white cracked ends), L whole grilled branzino along the longest arm (scaled olive back, pale belly, golden char, grill bars, score cuts). Salmon/seaweed/octopus gone (sushi leak); mackerel rejected (echo of sushi saba). shape/diag, matte, no glisten.
- Scene (backup wip/48_pre_r2.js): harbour window 300–990 → 452–824 so the sea sits only behind the board (no sea blur through the left HUD); oyster bar 24–452 → 24–262 with lobster/crab/lemons compacted onto the ice; menu dishes now Oysters / Seared scallops / Lobster thermidor / Grilled branzino / Garlic prawns / Crab claws / Moules. Gutter check: no offenders at any viewport.
- cmp: /workspace/shots/cmp-fishhouse.png (v6); screenshot-geo-fishhouse-dinner.png.
- Published ef7544a; ready.txt line added. NEXT: Mike's seams.

## Step 9 — Mike's Pastry seams (round 2)
- Blocks v4 (src/41_food_pastry.js, backup wip/41_pre_v4.js): shape/diag piece-space painter. Layers now span the whole piece (no repeated layer stack per cell): Boston cream sponge/custard/sponge, tiramisu two ladyfinger bands with irregular joints, rainbow cookie green/white/red over the piece height with chocolate only on real top/bottom. ONE long cannoli per I piece (ricotta + chips only at the two real ends; no mid-piece joint). Pistachio folds and ganache sheen continuous; glisten removed. Cheesecake jam/graham only on real top/bottom edges.
- cmp: /workspace/shots/cmp-mikes.png (v1); screenshot-geo-mikes-afternoon.png.
- Published 5e17752; ready.txt line added. NEXT: Speakeasy + Trattoria QA polish.

## Round 3 — colour/value audit (16:16 message)
- New tools: tools/audit.js (one browser, many worlds: cmp stack + board json into shots/audit) + tools/audit.py (per-piece median colour + luminance, flags pairs with dL<12 and similar hue) + tools/cg.py (colour | greyscale strip, saved as shots/cmp-<world>-grey.png).
- Baseline: sushi spread L68–216, no close pairs. Clustered: Trattoria (5 pairs), Night Market, Boba, Golden Arches, Mike's (cheesecake≈tiramisu), Fish House (prawn/crab/branzino), Speakeasy (old fashioned≈negroni).
- Boba already published at 425a784 (ready.txt 01:38: scene remake, matte blocks, straw kept inside the cup glyphs, opaque panels so no crowd through the board). Re-checked live: OK. Round 3: values spread — oolong deep amber L72, matcha deep green 112, taro purple 125, tiger 149, thai orange ~150, mango yellow 196, winter melon pale 209.
