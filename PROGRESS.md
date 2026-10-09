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
