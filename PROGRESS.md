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
