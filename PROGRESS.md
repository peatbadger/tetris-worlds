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
| 5 | Cinema Lobby | cinema | live (geo; premiere searchlights, popcorn overflow; screenshot-cinema.png) |
| 6 | Gelato | gelato | live |
| 7 | Fish House | fishhouse | live |
| 8 | Pizzeria | pizzeria | live |
| 9 | Golden Arches | fastfood | live |
| 10 | Taiwanese Night Market | nightmarket | live (screenshot-nightmarket.png) |
| 11 | Boba Milk Tea Shop | boba | live (screenshot-boba.png) |
| 12 | Yakitori | yakitori | live (geo; skewers grill raw→lacquered, trains overhead, flare-ups; screenshot-yakitori.png) |
| 13 | Curry House | curry | live (geo; spice ladder, level-10 challenge, rice jar; screenshot-curry.png) |
| 14 | Konbini | konbini | live (geo; fluorescent 24h store, hot-snack warmer, nikuman steamer, microwave countdown "chin", delivery truck, fresh-karaage event) |
| 15 | Japanese Tea House | teahouse | live (geo; Kyoto tea room, matcha whisked the slow way, shishi-odoshi, ceremony) |
| 16 | Fukuoka Oden Yatai | oden | live (geo; riverside night stall, partitioned oden pot, tebo yuchiri, vinyl curtain onto Nakasu neon) |
| 17 | Taiwanese Hotpot | hotpot | live (geo; split yuanyang pot, meat slicer, broth refills, free ice cream, scooter street) |
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
- Golden Arches readability (backup wip/53_pre_values.js): fries now stand in a red carton; burger gets a red tomato band + brighter, thicker lettuce; T is a pale vanilla shake (swirl + bean flecks); nuggets are a heap of separate golden lumps; apple pie sits in its red sleeve with only a strip of blistered crust; cola has a bright red cup band with a white stripe; hotcakes deeper golden. Seven different hues; greyscale spread shake (light) → hotcakes → nuggets/burger → pie → cola (dark). cmp-fastfood.png / cmp-fastfood-grey.png.
- Speakeasy QA polish (backup wip/43_pre_qa2.js): amber pair split — lager is deep gold with a tall white foam head (textured bubbles), old fashioned is dark mahogany with the big cube + peel; green pair split — mojito saturated lime green with muddled mint leaves suspended + crushed ice, martini crystal-clear cool blue with olives; champagne pale straw with 5 larger, brighter bead streams; negroni brighter red so it separates from the old fashioned in greyscale; wine darkest. cmp-speakeasy.png / -grey.png.
- Trattoria (a4397f1): spaghetti sauce continuous through the strands (central pool removed); penne arrabbiata → penne al pesto so only margherita stays red; focaccia tomatoes/olives pressed into dimples with dough ring; lasagne ragù-dark, gnocchi pale cream, glisten removed. Audit L: lasagne 85 / pesto 111 / focaccia 134 / margherita 144 / spaghetti 157 / risotto 196 / gnocchi 212.
- Night Market (158e443): values pass — tofu 79 / sausage 110 / pepper bun 123 / oyster omelette 152 / cutlet 169 / scallion pancake 193 / shaved ice 216; 0 close pairs.
- Mike's (7a4c381 ): tiramisu now espresso/cocoa-forward (was ≈ cheesecake), pistachio clearly green (was ≈ Boston), Boston brighter custard. L: 33/97/122/145/168/212/230; 0 close pairs.
- Fish House (ef8dc9b ): scallop shells sand-ivory (were salmon, ≈ prawn), prawns coral, crab legs deeper red-orange, branzino mid olive. L: 51/88/106/119/146/183/201; 0 close pairs. Dim Sum re-audited: 0 close pairs (hargow 218 vs bao 231 differ by hue/translucency).

## Round 4 — geometric remakes of the originals (after TAIL, originals untouched)
- Shared engine src/28_19_geo_cafe.js (GeoCafe stage + MassKit/remakeFood helpers); defs in 28_20_remakes.js; TAIL extended in 29_order.js. Tools now freeze gravity (late worlds topped out during captures).
- Tiki Beach Shack (741400d , Ocean remake): thatched fruit bar, blender that spins/fills, sea window with sailboat, sunset conch, dolphins event. Blocks acai 60 / dragon 98 / watermelon 121 / kiwi 140 / papaya 156 / pineapple 173 / coconut 230.
- Oasis Tea Tent (7776a8a , Desert remake): striped canvas tent, samovar, tea poured from a height, tent-flap window onto dunes/oasis/camel caravan, lanterns at night. Blocks dates 52 / pomegranate 75 / baklava 112 / mint 126 / apricot 153 / couscous 189 / labneh 219.
- Neon Candy Arcade (9fe55bb , Neon remake): 18:00–02:00 clock, neon CANDY tube, jar wall, cotton-candy machine (floss grows on the stick), neon street window with flickering signs and tail-lights, JACKPOT strobe event. Blocks licorice 50 / grape 71 / caramel 109 / blue rock 129 / sour belt 175 / cotton candy 201 / marshmallow 222.
- Aurora Lodge (469ffde , Aurora remake): pine planks, FIKA board, woven band, oven that glows when buns come out, coffee pouring, window with snowy pines/red cabin and rippling aurora after dark, aurora-burst event. Blocks blueberries 47 / rye 68 / lingonberries 86 / cinnamon bun 122 / gravlax 171 / cloudberries 190 / skyr 225.
- Orbit Galley (galley, Cosmic remake) de42aa6: porthole w/ ringed planet+Earth limb, rehydrator, jumpsuit crew, capsule-dock event; blocks galaxy 51/velvet 76/nebula 139/orange 151/neapolitan 163/moon cheese 197/meringue 222, 0 close pairs.

## Round 5 — PREMIUM material pass (QA 16:51) — Kaiten only, awaiting approval
- 87fc607 FoodMass `premium:true` (override `window.__fmPremium`): top-left light, soft drop shadow onto board, thin dark edges on exposed sides (no cream rims/bevel planes), AO on S/E edges + cut faces, seeded overlay micro-grain, -10% saturation, radius 0.16, 16 cell variants, dark falling-piece shadow instead of coloured glow.
- Kaiten materials: marbled salmon (displacement-field veins periodic in P, wet sheen, rice grains at edge), tuna grain + soft slice edges, ikura packed varied translucent spheres (core, rim light, specular, contact shadows), matte edamame pods w/ fuzz, cucumber cut face + avocado in maki, tamago pores/browned top/textured nori, saba iridescent belly. Audit 0 close pairs (ikura 72 / maguro 51).
- Backups: wip/14_pre_premium.js, wip/14a_pre_premium.js. Tool: tools/premium.js.
- 894ecb4 Kaiten premium v2: engine lift filter (brightness 1.08/contrast 1.12) + N/W rim light, desat 0.04, AO 0.22; salmon #f27a44 w/ thin soft marbling; tuna #ae2238 + wet sheen; maki crisper; ikura L87 vs tuna L63. Audit 0 close. Images shots/premium-kaiten-v2(.png/-grey/-small).
- 8cdd5fd premium mikes: generic premium pass; pale-food gentle lift; L 23/100/130/160/187/212/231, 0 close — shots/premium/mikes.png
- 36d7c6b premium speakeasy: generic premium pass (glass masses keep own highlights); L 58/92/125/149/196/207/220, 0 close — shots/premium/speakeasy.png
- ee857e0 premium dimsum: generic premium pass; chive lift toned so it separates from har gow; 0 close — shots/premium/dimsum.png
- cfc0ab6 premium gelato: generic premium pass, keeps soft scoop radius 0.26; 0 close — shots/premium/gelato.png
- bc26959 premium fishhouse: generic premium pass; L 43/88/108/124/157/182/200, 0 close — shots/premium/fishhouse.png
- 3219dfd premium pizzeria: generic premium pass; focaccia/risotto lifts re-tuned to keep separation; 0 close — shots/premium/pizzeria.png
- 1aea0cb premium fastfood: generic premium pass + per-food value lifts; fixed 4 pre-existing close pairs (burger/nugget/hotcake, pie/cola): L 28/53/78/106/149/183/225, 0 close — shots/premium/fastfood.png
- 2901d2d premium nightmarket: generic premium pass; cutlet value re-tuned; L 77/114/128/149/165/193/216, 0 close — shots/premium/nightmarket.png
- d2894d7 premium boba: generic premium pass; thai/mango values re-tuned (fixed 2 close pairs); L 70/118/135/144/163/189/212, 0 close — shots/premium/boba.png
- d982fa2 premium tiki: premium pass + dragon fruit redone (white flesh, black seeds, magenta skin with green-tipped scales) + coconut redone (hairy brown shell, tan seed coat, fibrous meat); L 54/127/144/150/179/192/233, 0 close — shots/premium/tiki.png
- 4c3106c premium oasis: generic premium pass; L 47/72/105/133/157/197/220, 0 close — shots/premium/oasis.png
- 9c5e43e premium candybar: premium pass + new sweet identities: liquorice twists, gummy bears, candy cane stripes, faceted rock candy, dusted marshmallows (caramel/grape jellies replaced); L 40/72/115/186/191/201/222, 0 close — shots/premium/candybar.png
- ef09e69 premium lodge: premium pass; blueberries/rye lifted so they don't sink into the board on iPhone; L 46/65/85/128/177/190/227, 0 close — shots/premium/lodge.png
- ca03d4b premium galley: generic premium pass; L 42/73/148/161/169/197/223, 0 close — shots/premium/galley.png

## Round 6 — PREMIUM is the default for every FoodMass world
- All 15 FoodMass worlds (sushi, mikes, speakeasy, dimsum, gelato, fishhouse, pizzeria, fastfood, nightmarket, boba, tiki, oasis, candybar, lodge, galley) now render premium by default; the per-world `premium: true` flags are gone. Per-world tuning lives in `premiumOpts` (R, lift per food, grain, desat, edge, rim).
- Engine extras added during rollout: pale foods (MAIN luminance >205/170) get a gentler lift so whites keep texture; grain is a P-periodic tile anchored at the cell origin (seamless across joined cells).
- ROLLBACK: set `window.__fmPremium = false` before load (A/B, whole game), or `premium: false` in one world's FoodMass spec; full file rollback = wip/14_pre_premium.js + wip/14a_pre_premium.js (and git revert of the round-5/6 commits). Original Ocean/Desert/Neon/Aurora/Cosmic don't use FoodMass and are untouched.
- Before/after per world: shots/premium/<world>.png (+ -grey, -small, -before-4x, -after-4x, -before-iphone, -after-iphone). Tool: tools/premium.js / tools/prem_world.sh. Audit of all 15 worlds with premium default: 0 close pairs.

## Cinema Lobby (new world 5)
- Files: src/28_26_cinema.js (GeoCafe scene + WORLD_DEFS music), src/28_26a_cinema_food.js (FoodMass, premium by default).
- Scene: art-deco lobby, chasing marquee bulbs, lobby trailer screen (4 looping mini trailers), lightbox concessions menu, popcorn kettle machine + soda fountain + glass candy case, cinema carpet; glass front onto a street with our marquee canopy, diner sign, passing taxis, day cycle + weather.
- Staff: Rosa (vest, tears ticket stubs) and Theo (paper hat, shakes the kettle). Guests: date couple, film buff, teen, mum+kid, critic, nana — weighted by matinee/evening/late.
- Events: premiere (night: searchlights, red carpet, flashbulbs, everyone looks) · popcorn overflow (any time).
- Blocks: I hot dog · O popcorn · T nachos · S blue slushie · Z pretzel · J malt balls · L mint pastilles. Values L125/199/175/114/94/48/227, 0 close pairs.
- Debug: window.__geoEv.cinema(n) triggers event n; tools/gw.js accepts GW_EVAL / GW_WAIT env.
- d1cb3da new world cinema (Cinema Lobby)

## Yakitori (new world 12)
- Files: src/28_27_yakitori.js (scene + def + music), src/28_27a_yakitori_food.js (FoodMass, premium default).
- Scene: tachinomi bar under the railway arches. Konro grill on the counter (moved left of the master so it stays visible, stationX 96): five skewers that really cook — colour ramps raw pink → opaque → golden → lacquered (RAMP/ramp()) — and an order lays a fresh raw skewer, fans it (embers flare, sparks, smoke), dips it in the tare pot, then plates it. Okami pours draft beer/highball at the tap.
- Wall of wooden menu tags (ねぎま つくね 皮 手羽先 レバー ししとう 焼おにぎり), isshōbin shelf, a beckoning cat, akachōchin lanterns that swing when trains pass. Window: split noren 焼鳥, steel viaduct with trains (lit windows at night), brick arches with other stalls, weather.
- Events: train (rattle, everyone "Kanpai!") · flare-up (flames + smoke). Debug: window.__geoEv.yakitori(n).
- Blocks: I negima · O uzura · T tebasaki · S shishito · Z kawa · J tsukune · L reba — each on one bamboo skewer through the piece. Values 123/205/100/91/149/60/42, 0 close pairs.
- Fixed on the way: customer body `skirt` must be a colour name (skirt:1 crashed the stage when the OL spawned). HUD "WORLD n / N" no longer wraps on iPhone (nowrap).
- 092d492 new world yakitori

## Curry House (new world 13, homage to the big Japanese curry chains — no real logos/names)
- Files: src/28_28_curry.js, src/28_28a_curry_food.js.
- Scene: yellow/brown counter; spice ladder 1–10 board and toppings board; giant rice jar (steam), simmering roux pot (bubbles), katsu fryer (oil spits) — an order is really built: rice scoop → ladle of roux → fried cutlet for katsu → plate (held plate fills in stages). Window: covered shōtengai arcade with awnings, shop signs, bicycles, a passer-by (umbrella in rain).
- Guests: salaryman, student, builder, the level-10 challenger (headband), mum+kid, tourist. Events: level-10 challenge (steam off the eater's head, "辛っ!!", water jug, cheers) · rice jar steam. Debug: window.__geoEv.curry(n).
- Blocks: I pork katsu (sliced) · O rice · T roux · S fukujinzuke (lotus rings) · Z melted cheese · J fried eggplant · L spinach. Values 148/213/64/102/163/40/82, 0 close pairs.
- 5cbab2f new world curry

## QA round 3 — keyboard regression (fixed)
- Cause: `frame()` in 30_main.js had no guard and scheduled the next requestAnimationFrame at the END. Any exception in one frame (a scene actor, Amb, a particle) killed the loop for good: game time stopped, the board stopped redrawing, so ←/→/Space looked dead, while DOM handlers (M, HUD buttons) still worked. Known trigger: the Yakitori customer with `skirt:1` (fixed in 092d492); the same class of bug can come from any scene.
- Fix: RAF is scheduled first and every subsystem runs through `safe(tag, fn)` (first error per tag logged once, counts in `window.__frameErrs`). Plus focus hygiene: game keys blur a focused HUD control (KEYS summary / buttons / slider), keyup of game keys is preventDefault-ed (Space no longer clicks a focused control), `startGame` blurs any focused menu card/overlay button (Safari/Firefox keep focus on hidden elements), and the delayed GAME OVER overlay is dropped if the player already restarted.
- Test: `tools/cap.sh keys.js [world]` — real keyboard input across play, HUD pause/RESUME, clicking mute and KEYS then typing, a touch-button press, a natural world switch, RESTART, top-out → Enter, window blur with a held key, menu → Enter, keyboard stage select, and an injected per-frame exception. The old build fails step 11 (game time frozen); the new one passes all 17.
- `tools/cap.sh soak.js [sec]` — every world fast-forwarded through hours/weather, reports any caught frame error: clean.
- 52a4bfa keyboard fix + tools/keys.js, tools/soak.js
- outline: FoodMass premium edge is now a hairline (rgba(28,14,8,0.22), max(0.75px, P*0.02); Kaiten 0.24), rim light 0.42→0.48 carries the separation with AO. Before/after: shots/premium/outline-before-after.png
- 48dca83 outline hairline
- Kaiten board: measured the empty-well colour on the pre-/post-premium captures — identical (26,15,9), so neither premium nor the ZoneMask flatten dims it (the flatten sits under an 82%-opaque board). The board was simply very dark: boardBg rgba(16,7,4,.82) → rgba(34,21,14,.8), grid .06→.07. shots/premium/kaiten-board-before-after.png
- 76f300c kaiten board
- Tiki (QA r3): palette muted (desatAll .12, watermelon #e8424a→#b23e46 with soft flesh gradient, dragon magenta → dusty rose), papaya moved to salmon-coral #de7250 (pink seed channel) and pineapple to pale lemon #e8cc5a with fibrous grain, so the two no longer read as mango/papaya twins. Luma 54/193/111/150/140/181/233, 0 close. shots/cmp-tiki.png
- dc71c60 tiki
- Aurora Lodge (QA r3): rye rebuilt as a real dense rye slice (fine even crumb, rye kernels, caraway, dark crust on exposed sides) instead of muddy blotches; gravlax dill clip-art removed (soft curved fat lines + sparse pepper); lingon desat .16; gravlax/cloudberry spread. Luma 45/83/87/128/160/197/227, 0 close. shots/cmp-lodge.png
- 9543d8c lodge
- Orbit Galley (QA r3): moon cheese no longer a toy Swiss square — warm ochre paste, fine crystalline flecks, irregular eyes with shaded upper wall + lit lip, amber rind; neapolitan bands bolder (deeper strawberry, wide chocolate, narrow vanilla) → luma 169→127; meringue = star-tip piped kisses with lavender shading. Pale trio now 177 / 127 / 225. 0 close. shots/cmp-galley.png
- 940c774 galley
- Oasis (QA r3): figure/ground — board was effectively mid-brown (80,48,37) because the warm Amb boardTint (source-atop, up to .22) lifts a warm board; board now deep cool indigo rgba(10,10,20,.95) → on-screen (54,36,36), and the pieces are lifted (dates brightness 1.36 → glossy mahogany L58, baklava 1.1). 0 close. shots/premium/oasis-board-before-after.png, shots/iphone-oasis.png
- 885cce5 oasis
- Re-check vs Kaiten (QA r3): Cinema nachos — cheese is now one flat glossy irregular pool (was a chain of saturated orange dots), bigger jalapeño rings with seeds; slushie = fine translucent crushed ice + syrup gradient (was blue confetti). Yakitori uzura — eggs fill the hollow centre of the O, thin tare glaze; tebasaki denser. Curry fukujinzuke — deep crimson chopped pickle, fewer/smaller lotus slices (was toy pink); spinach — wilted folds instead of clip-art veins. All 0 close. shots/cmp-{cinema,yakitori,curry}.png
- e591f8c recheck new worlds
- Tiki correction (QA): r3 mute went too far (watermelon + papaya both dusty coral). Watermelon → deeper pink-red #c8364a with a wet sheen (soft gloss streaks + catch-lights), papaya → warm orange #e8843a with a light-apricot seed channel; global desat .12→.07. Luma 53/193/111/150/137/182/233, 0 close. shots/cmp-tiki.png
- 39bd4c6 tiki correction

## Konbini (konbini) — new world
- Scene src/28_29_konbini.js: white tiles + blue band, fluorescent bars, hot-snack menu (からあげ/肉まん/コロッケ/チキン with prices), coffee S/M/L board, gondola shelves behind the board; counter = self-serve coffee machine, lit hot-snack warmer, steaming nikuman case, register; back shelf microwave that really counts down and lights up. Staff in a new fine vertical pinstripe uniform ('pin' pattern in 12d). Window: apartment block, utility pole + wires, two vending machines that glow at night, crosswalk, bicycle, light spill + moths at night. Day labels Morning commute → Lunch → Afternoon → Evening → Late night (07:00 → 02:00), late-night merry salaryman. Events: delivery (truck pulls up, restock), fresh-karaage (揚げたて!).
- Blocks src/28_29a_konbini_food.js: onigiri (alternating rice triangles on nori, nori band each), roll cake (cream-heavy slices, golden sponge spiral), karaage (craggy golden nuggets), melon pan (domed crust diamonds + sugar), sakura mochi (pink domyōji grain), matcha warabi (jade cubes + powder), chocolate (glossy ganache squares, cocoa dust, a gold fleck). Luma 187/225/132/172/149/115/56, 0 close.
- Review notes: onigiri v1 read as dominoes/dice → dark nori base + gapped triangles; melon pan v1 read as waffle cone → domed crust tiles; karaage crease strokes made smiley faces → removed. Weak spot: like every GeoCafe world, the queue stands in front of the counter at 1440 and hides part of the hot-snack line.
- Images: shots/cmp-konbini.png, screenshot-konbini.png (09:00), konbini-night.png (23:30 rain), konbini-event-{delivery,karaage}.png, iphone-konbini.png.
- ec14381 konbini

## Tea House (teahouse) — new world
- Scene src/28_30_teahouse.js: plaster walls, dark posts + nageshi beam, lattice ranma; tokonoma with the scroll 一期一会 and a camellia; vertical wooden menu plaques (お品書き 抹茶/煎茶/ほうじ茶/和菓子 in kanji numerals); shoji screens behind the board; tatami floor. Counter: brazier + iron kama with steam, matcha bowl that foams while whisked, chasen stand, wagashi glass case, hand bell; lacquer front with 一服. Master Sen (grey kimono, moss obi) does scoop → ladle → M-stroke whisk → turn bowl; idle = folding the purple fukusa. Hana (indigo kimono) bows. New 'kimono' figure pattern in 12d (crossed collar, obi, obijime). Window: half-open shoji + sudare blind onto a moss garden — bamboo grove, tsuiji wall, star-leaf red maple shedding leaves, stone lantern lit from dusk, raked gravel, koi pond, a shishi-odoshi that fills and knocks every ~14 s. Events: shishi-odoshi (knock, room looks out), ceremony ("Otemae chōdai itashimasu", bowl turned, room bows). Koto/flute in miyako-bushi scale, 70 bpm.
- Blocks src/28_30a_teahouse_food.js: hanami dango, yōkan (translucent ruby slab + chestnuts), matcha (micro-foam), dorayaki, nerikiri (violet bellflowers), warabi kinako, ichigo daifuku (strawberry blush through mochi). Luma 202/57/132/97/155/189/225, 0 close.
- Review notes: matcha whisk strokes read as ECG lines → foam drifts; kuromitsu pools read as olives, then as a twig → removed; cut daifuku read as an eyeball → whole ichigo daifuku with soft blush; dorayaki read as amber jelly → darker mahogany centre; garden v1: lantern hidden behind the shoji, maple a red cloud → moved + star leaves.
- Images: shots/cmp-teahouse.png, screenshot-teahouse.png, teahouse-night.png, teahouse-event-{shishi,ceremony}.png, iphone-teahouse.png.
- aa8838c teahouse

## Oden Yatai (oden) — new world
- Scene src/28_31_oden.js: outdoors at night — blue/white scalloped tarp, red おでん chōchin lanterns, the cart's plank back panel with isshōbin sake bottles, wooden menu tags (大根 200, 玉子 150, 牛すじ 300 …), indigo noren おでん酒; behind, Nakasu buildings with generic neon (スナック/BAR/カラオケ/居酒屋/ラーメン) and the river with wobbling reflections; wet paving. The "window" is the yatai's clear vinyl curtain (creases, rolled top, raindrops when it rains) onto the bridge, a taxi and the neon river. Counter: tonkotsu stockpot, partitioned oden pot with bobbing items + steam, copper sake warmer with tokkuri, beer server; red cart skirt 屋台おでん, wheels. Taishō (hachimaki) ladles oden + karashi, flicks the tebo ("Yuchiri!"), warms atsukan; Mitsuko wipes and calls in customers. Always evening (18:00 → 02:00). Events: kanpai, fresh-pot ("Shimitemasu yo~").
- Blocks src/28_31a_oden_food.js: gyūsuji skewers, daikon (translucent amber rounds), konnyaku (speckled triangles), chikuwa (toasted tubes, hollow ends), tamago (broth-stained halves), kinchaku (tied tofu pouches), hanpen. Luma 73/184/99/153/122/136/217, 0 close.
- Review notes: daikon cross-score read as hot-cross buns → removed; konnyaku scoring read as chain-link → lighter, wider; chikuwa stripes read as a comb → toasted gradient + blisters; tamago went grey when darkened by filter → re-coloured amber. Weak spot: oden is honestly a brown palette — separation is by value and shape (triangles, tubes, skewers, squares) more than hue; chikuwa's toasted side is subtle on vertical pieces.
- Images: shots/cmp-oden.png, screenshot-oden.png, oden-dusk-rain.png, oden-event-{kanpai,freshpot}.png, iphone-oden.png.
- 7bdca78 oden

## Hotpot (hotpot) — new world
- Scene src/28_32_hotpot.js: red lacquer + gold lattice, red lanterns, upside-down 福 diamond, black menu board in gold (麻辣鍋 380 / 酸菜白肉鍋 360 / 牛肉片 / 鴨血豆腐 / 魚丸 / 冰淇淋 免費), booths with their own steaming pots behind the board. Counter: chilled case of ingredient plates, the split yuānyāng pot (red mala | pale sauerkraut) with bubbles + chillies, a meat slicer whose blade spins while A-Wei shaves beef, sauce bowls, the free-ice-cream freezer; red front 歡迎光臨. Mei carries the long-spouted broth kettle ("Refill?"). Window: Taipei arcade shophouses with vertical neon (藥局/小吃/麻辣/茶), a tall tower lit at night, a two-way river of scooters with headlight cones, 吃到飽 sticker. Events: refill round (steam bloom), ice cream (freezer glow + confetti, everyone cheers). Taipei added to the NOSNOW list (rain instead). Guzheng + erhu, 104 bpm.
- Blocks src/28_32a_hotpot_food.js: fish balls, duck-blood tofu cubes, mala broth (oil droplets, dried chillies, Sichuan peppercorns), rolled marbled beef, napa cabbage (one leaf per cell: white rib, ruffled green crown), shiitake (star cut), corn kernels. Luma 224/51/68/146/189/125/168, 0 close.
- Review notes: napa v1 read as a zipper/fish-bone chevron → leaf-per-cell; fish balls sparse on a grey bed → one big ball per cell; mala oil read as orange slices → smaller droplets. Weak spot: duck blood (51) and mala (68) are both dark reds — separated by shape (grid of cubes vs speckled broth) more than value.
- Images: shots/cmp-hotpot.png, screenshot-hotpot.png, hotpot-night.png, hotpot-event-{refill,icecream}.png, iphone-hotpot.png.
- 5a785c5 hotpot

## QA4 — order + naming fix (freeze on new worlds)
- World order restored (src/29_order.js, check with `tools/cap.sh order.js`): 1 sushi · 2 mikes · 3 speakeasy · 4 dimsum · 5 gelato · 6 fishhouse · 7 pizzeria · 8 fastfood · 9 nightmarket · 10 boba · **11 ocean · 12 desert · 13 neon · 14 aurora · 15 cosmic (originals, untouched)** · 16 tiki · 17 oasis · 18 candybar · 19 lodge · 20 galley · 21 cinema · 22 yakitori · 23 curry · 24 konbini · 25 teahouse · 26 oden · 27 hotpot. Cinema had been slotted at 5 and the new worlds before the originals; the TAIL list is gone, everything is one explicit list.
- The convenience-store world is now generic: id `konbini`, files src/28_29_konbini.js / 28_29a_konbini_food.js, no chain name, no tribute wording, no logo or milk-can mark (there never was one). Blue/white scheme kept as requested. Older commit messages still contain the old name (history not rewritten).
- Ramen Yokocho WIP parked in wip/28_33_ramen.js + wip/28_33a_ramen_food.js (not built, not published).
- Konbini QA4: onigiri redrawn as one soft rounded rice triangle per cell (grain hints, crisp nori band) on a pale blue-grey tray (L178); karaage is four craggy nuggets per cell kept inside the cell, so the outline is clean; counter decluttered via new optional GeoCafe knobs `spots`, `srvX`, `maxCust`, `crowd` (defaults unchanged for every other world): max 2 shoppers, maker at x60 by coffee/hot case, clerk at the register x240, the shopper between them, the 2nd one waits off-counter. Audit 178/225/146/172/149/115/56, 0 close pairs. Shots: shots/qa4-konbini-{4x,iphone,scene}.png.
- Hotpot QA4: beef redrawn as thin slices fanned like shingles (wavy edges, a thin fat edge, 1–3 soft marbling streaks, faint wet sheen) instead of concentric swirls; shiitake is a matte cap (soft mottling, no gloss, slightly paler rolled rim) with a narrow sunken hana cut; mala broth surface lifted to bright chili oil (#d8482a→#7c1e10, lift contrast 1.12) so the T reads off the dark board. Audit 225/47/94/127/189/73/168, 0 close pairs. Shots: shots/qa4-hotpot-{4x,iphone}.png.
- Tea House QA4 (honest re-check vs Kaiten): dorayaki read as glossy caramel pudding → matte pancake (warm brown centre to golden rim, soft sheen only); yokan was brick red with orange "sticker" chestnuts that read as dice pips on iPhone → deeper azuki slab with fewer, larger, irregular broken-chestnut halves deeply embedded; matcha speckle noise halved and softened (smooth jade foam); counter had 4 overlapping figures → max 2 guests, tea master at x70, server x240, one guest between, companions wait off-counter (new GeoCafe `tagDx`). Audit 202/47/132/106/154/189/224, 0 close pairs. Shots: shots/qa4-teahouse-{4x,iphone,scene}.png.
- Oden QA4 (honest re-check vs Kaiten): the taishō and his wife overlapped at the cart → taishō at the pot (x66), wife by the sake warmer (x214), one guest between, max 2 guests, companions wait off-counter; tamago yolks were flat saturated discs (fried-egg look) → halved egg with the white paling toward a muted, soft yolk; gyusuji sticker highlights softened; konnyaku seams thinned. Fixed the tamago~kinchaku close pair (tamago lift 0.8): audit 72/184/99/153/115/136/217, 0 close pairs. Shots: shots/qa4-oden-{4x,iphone,scene}.png.
- Checks after QA4: tools/soak.js clean on all 27 worlds; tools/keys.js konbini 17/17 PASS, sushi 17/17 PASS. One konbini run at load avg 14 dropped some ArrowRight presses. Replaying the same keystrokes with a key log showed every press arriving and moving the piece, and a rerun passed clean, so this looks like flakiness under load, not a regression.

## World 28 · Ramen Yokocho (new; freeze lifted)
- Scene: narrow yokocho counter of blackened wood, yellowing menu strips (醤油/味噌/塩/豚骨/つけ麺/餃子/替玉/ビール), ticket machine (食券機), signed shikishi, maneki-neko, stockpot + noodle boiler + bowl station + gyōza pan + beer tap; wood-lattice door onto the alley with lanterns, neighbours' noren, extractor steam, a stray cat, umbrellas in rain. Events: kaedama (noodle refill), slurp. Counter discipline from QA4: taishō x80, Kenji x220, one diner between, max 2.
- Food (quality pass vs Kaiten): menma rebuilt from "wooden planks" into a loose criss-cross pile of soy-braised tapered strips; chāshū rebuilt from a candy spiral into rolled pork belly (seared rim, fat crescent, rosy meat, broken fat seams); nori darkened to true near-black green with a cool diagonal sheen; negi bed lifted to fresh green with denser rings (was a nori-coloured clash, dL6). Audit 110/69/204/149/153/175/65, 0 close pairs.
- Shots: shots/cmp-ramen.png, screenshot-ramen.png, iphone-ramen.png, ramen-rain.png, ramen-event.png. Soak clean.
- Tooling safety: tools/cap.sh no longer runs a broad `pkill` on headless Chrome, which could kill the other agent's browser on this shared box. Every browser a capture script launches is now tagged with a run-unique `--cap-tag=<id>` switch (tools/_captag.js is preloaded with `node -r`; Chrome ignores the switch). Cleanup kills only that tagged browser and its descendant PIDs. Tested: an orphaned browser from a script that exits without closing is cleaned up, and nothing untagged is touched.
- NEW WORLD 29 · Korean BBQ (kbbq): a Seoul galbi house. Imo snips meat with scissors, ladles doenjang stew from a bubbling ttukbaegi and pulls soju from the fridge. Min-jun hauls glowing charcoal buckets. Scene: Hangul menu, extractor ducts and smoking grills in the dining room, string lights, an under-counter soju fridge, and a neon alley window (노래방/치킨/호프/편의점, a red neon cross, a hill tower, delivery scooters). Events: GEONBAE somaek toast · FRESH CHARCOAL sparks · IMO'S SCISSORS. Blocks: LA-galbi with little cross-cut bones · gyeran-jjim custard puffs · napa kimchi leaves · samgyeopsal fat/meat layers with grill bars · frilly lettuce · glossy japchae · kongnamul. Audit: 0 close pairs at iPhone size (L72/205/93/140/150/87/185, kimchi~japchae separated by hue). build.py now subsets Hangul into the CJK fallback font. Weak spots: the back soju fridge is mostly hidden behind standing guests (the under-counter fridge carries it), and the toast confetti is subtle.
