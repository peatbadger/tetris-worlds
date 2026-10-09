/* ================= World 8 · Golden Arches — GEOMETRIC edition (roadside burger joint, fan tribute, no real marks) =================
   Left: the line. Mia works the drive-thru window (cars pull up outside, an arm reaches out), the soda fountain (cup fills, lid,
   straw) and the bag station; Jay runs the fryer (scoop, basket down, oil boils, BEEP, lift, shake, dump, salt) and the flat-top
   grill (patties down, smoke, flip, cheese, bun, wrap, slide into the heat-lamp chute). Menu boards above flip from BREAKFAST
   to LUNCH at 10:30. Centre: a calm picture window onto the road and the pole sign. Right: a self-order kiosk (tap, receipt,
   number tent) and one booth; Mia runs the tray over and takes the tent; leaving guests tip trays into the bin.
   Surprises: a kid's balloon slips away and stays on the ceiling; the shake machine goes down and Jay thumps it back to life;
   late at night the lobby closes ("DRIVE-THRU ONLY") and only headlights come. Clock 7:00 -> 23:00. */
const FFPal = GeoKit.palette({
  morning: { wall: '#f4e8d0', wall2: '#e8d4b0', tile: '#e8dcc4', tile2: '#d8c8a8', red: '#d8281e', redDk: '#a81a12', yel: '#ffc72c', steel: '#c8ccd0', steel2: '#9aa0a6', steelDk: '#6a7076', board: '#2a2422', boardLit: '#fff4d8', floor: '#d8c8b0', floor2: '#c4b294', booth: '#c8281e',
    sky0: '#f8c8a0', sky1: '#fff0d8', out1: '#9ab0a0', outRoad: '#7a7c80', outLot: '#a8a49c', outLine: '#f4f0e0', outGrass: '#8ab868', lamp: '#fff2c8', glow: '#ffe8a0', glowA: 0.06, signLit: '#ffe070', oil: '#e8b030', shaft: '#fff0d0', shaftA: 0.18, amb: '#fff8f0', ambK: 0, sun: '#fff0c0',
    skin: '#e8b08a', bubble: '#ffffff', ink: '#22201e', navy: '#26344e', coral: '#e8604a', mustard: '#e0a830', teal: '#2a8a90', cream: '#f2e8d8', olive: '#6a7a40', plum: '#6a3a6a', grey: '#9a9a9a', brown: '#5e4030', white: '#fcfaf6', dark: '#1e1c1a', hairGrey: '#d8d4d0', pink: '#f08aa8', blue: '#3a7ac8' },
  day: { wall: '#f6ecd8', wall2: '#ead8b8', tile: '#ece0ca', tile2: '#dccaa8', red: '#da2a1e', redDk: '#aa1a12', yel: '#ffc72c', steel: '#ccd0d4', steel2: '#9ea4aa', steelDk: '#6a7076', board: '#2a2422', boardLit: '#fff8e4', floor: '#dccab2', floor2: '#c8b496', booth: '#cc2a1e',
    sky0: '#6ab0ec', sky1: '#d8ecf8', out1: '#8aa898', outRoad: '#76787c', outLot: '#a8a49e', outLine: '#f8f4e8', outGrass: '#7ab858', lamp: '#fff4d0', glow: '#ffe8a0', glowA: 0.05, signLit: '#ffd84a', oil: '#e8b030', shaft: '#ffffff', shaftA: 0.14, amb: '#ffffff', ambK: 0, sun: '#fffbe8',
    skin: '#e8b08a', bubble: '#ffffff', ink: '#22201e', navy: '#26344e', coral: '#e8604a', mustard: '#e0a830', teal: '#2a8a90', cream: '#f2e8d8', olive: '#6a7a40', plum: '#6a3a6a', grey: '#9a9a9a', brown: '#5e4030', white: '#fcfaf6', dark: '#1e1c1a', hairGrey: '#d8d4d0', pink: '#f08aa8', blue: '#3a7ac8' },
  dusk: { wall: '#ecd0b0', wall2: '#dcb894', tile: '#e0c8aa', tile2: '#ccae8c', red: '#c8261c', redDk: '#981810', yel: '#f8b828', steel: '#c4bcb8', steel2: '#948c88', steelDk: '#5e5652', board: '#241c1a', boardLit: '#fff0d0', floor: '#ccb090', floor2: '#b49878', booth: '#b8261c',
    sky0: '#5a5aa0', sky1: '#ffa064', out1: '#6a6a7a', outRoad: '#5a5660', outLot: '#88807e', outLine: '#e8dcc8', outGrass: '#5a7a4a', lamp: '#ffe0a0', glow: '#ffc870', glowA: 0.22, signLit: '#ffd040', oil: '#e8a828', shaft: '#ffb070', shaftA: 0.22, amb: '#ffd8b0', ambK: 0.05, sun: '#ffc080',
    skin: '#dc9e78', bubble: '#fff4e6', ink: '#24181c', navy: '#22304a', coral: '#d85a44', mustard: '#d09830', teal: '#26707a', cream: '#ecd8c0', olive: '#5e6638', plum: '#643454', grey: '#8e8686', brown: '#563826', white: '#f6ecdc', dark: '#1a1418', hairGrey: '#ccc0b4', pink: '#e08098', blue: '#3a6ab0' },
  night: { wall: '#d8ccb8', wall2: '#c8b8a0', tile: '#c8bca8', tile2: '#b4a68e', red: '#c0261c', redDk: '#901810', yel: '#f0b828', steel: '#b0b4b8', steel2: '#80868c', steelDk: '#50565c', board: '#1e1a18', boardLit: '#fff4dc', floor: '#b8a890', floor2: '#a49478', booth: '#a8241a',
    sky0: '#060a1e', sky1: '#141c40', out1: '#1a1e2a', outRoad: '#1e2028', outLot: '#2a2a30', outLine: '#8a8a80', outGrass: '#1a2418', lamp: '#fff0c8', glow: '#ffe0a0', glowA: 0.3, signLit: '#ffd030', oil: '#e0a020', shaft: '#c0d8ff', shaftA: 0.0, amb: '#e8e4f0', ambK: 0.08, sun: '#f4ecd8',
    skin: '#d8a07c', bubble: '#f8f0e8', ink: '#1a1818', navy: '#1e2a44', coral: '#c85040', mustard: '#c09028', teal: '#20606a', cream: '#e0cdb4', olive: '#525a34', plum: '#58304e', grey: '#807c80', brown: '#4e3424', white: '#ece4da', dark: '#161416', hairGrey: '#b8b0ac', pink: '#d07890', blue: '#30609a' },
  snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', outLot: '#eef0f4', outGrass: '#f0f2f6', out1: '#c8d0dc' },
}, [[5, 'night'], [7, 'morning'], [10, 'day'], [16, 'day'], [18.5, 'dusk'], [20.5, 'night'], [29, 'night'], [31, 'morning']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 5 ? 'Late night' : h < 10.5 ? 'Breakfast' : h < 14.5 ? 'Lunch rush' : h < 17.5 ? 'Afternoon' : h < 21 ? 'Dinner' : h < 22 ? 'Late night' : 'Drive-thru only'; } });

function makeGeoFastfoodStage() {
  const DT = { x0: 22, x1: 102, y0: 300, y1: 470 }, CTR = { x0: -20, x1: 292, top: 520 }, SF = 640, SSC = 0.8, FL = 712, SC = 0.84;
  const FOUNT = 123, FRYST = 157, CHUTE = 157, FRYER = 191, GRILL = { x0: 216, x1: 280 }, BAG = 71, SHAKE = 123;
  const WIN = { x0: 520, y0: 110, x1: 930, y1: 470 }, KIOSK = 1026, BIN = 1250, TAKE = { x: 156 };
  const TB = { x: 1158, top: 566, seats: [{ x: 1100, f: 1, occ: null }, { x: 1216, f: -1, occ: null }] };
  let K, jay, mia, orders = [], chute = 0, fries = 0, fryer = { basket: 'up', t: 0, load: 0, bub: 0 }, grill = { p: [], smoke: 0 }, cup = null, bag = null, car = null, nextCar = 6, nextArrive = 2, num = 40, balloon = null, ceilBalloon = null, shakeDown = 0, nextShake = 60, cars = [], nextPass = 3, table = { tent: 0, tray: null, folder: 0 }, kioskT = 0, receipt = 0, beep = 0, sign = 1;
  const L = (h) => K.L(h), B = GeoKit.body;
  const H24 = () => ((K.hour % 24) + 24) % 24;
  const per = () => { const h = H24(); return h < 5 ? 4 : h < 10.5 ? 0 : h < 14.5 ? 1 : h < 17.5 ? 2 : h < 21 ? 3 : 4; };
  const lobbyOpen = () => { const h = H24(); return h >= 6.5 && h < 22; };
  const breakfast = () => { const h = H24(); return h >= 5 && h < 10.5; };
  const guests = () => K.actors.filter((a) => a.cust);
  const cool = (k) => K.weatherNow === k;
  /* ---------- props ---------- */
  function burgerW(c, x, y, s, open = 0, frac = 1) { // wrapped (open 0) or unwrapped burger, y = base line
    c.save(); c.translate(x, y); c.scale(s, s);
    if (!open) { c.fillStyle = L('#f4ecd8'); K.poly(c, [-11, 0, 11, 0, 9, -11, -9, -11]); c.fill(); c.fillStyle = L('#ffc72c'); c.fillRect(-9, -7, 18, 3); c.restore(); return; }
    c.fillStyle = L('#f4ecd8'); K.poly(c, [-14, 1, 14, 1, 10, -3, -10, -3]); c.fill();
    if (frac > 0.02) { const w = 10 * Math.sqrt(frac); c.fillStyle = L('#d89a4a'); c.fillRect(-w, -4, w * 2, 3); c.fillStyle = L('#5a2e18'); c.fillRect(-w - 1, -7, w * 2 + 2, 3.5); c.fillStyle = L('#f8c830'); c.fillRect(-w, -8, w * 2, 1.5); c.fillStyle = L('#6ab84a'); c.fillRect(-w - 1, -9.5, w * 2 + 2, 1.5); c.fillStyle = L('#f0bc6a'); c.beginPath(); c.moveTo(-w, -9.5); c.quadraticCurveTo(0, -17, w, -9.5); c.fill(); c.fillStyle = '#fbf2d8'; c.fillRect(-3, -14, 1.4, 0.8); c.fillRect(2, -13, 1.4, 0.8); }
    c.restore();
  }
  function friesBox(c, x, y, s, lv = 1) { c.save(); c.translate(x, y); c.scale(s, s); if (lv > 0.05) { c.fillStyle = L('#f4c430'); for (let i = 0; i < 6; i++) c.fillRect(-7 + i * 2.6, -14 - (i % 3) * 2.5 * lv - 4 * lv, 2, 10 + 4 * lv); } c.fillStyle = L('#d8281e'); K.poly(c, [-8, -10, 8, -10, 6, 0, -6, 0]); c.fill(); c.fillStyle = L('#ffc72c'); c.beginPath(); c.arc(0, -5, 2.4, Math.PI, TAU); c.fill(); c.restore(); }
  function drinkCup(c, x, y, s, lid = 1, straw = 1, lv = 1, col = '#d8281e') { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#fbfaf6'); K.poly(c, [-7, -22, 7, -22, 5, 0, -5, 0]); c.fill(); c.fillStyle = L(col); c.fillRect(-6, -15, 12, 5); if (!lid && lv > 0) { c.fillStyle = 'rgba(60,20,10,0.8)'; c.fillRect(-6.5, -22 + 20 * (1 - lv), 13, 1.5); } if (lid) { c.fillStyle = L('#f0ece4'); c.fillRect(-8, -24, 16, 3); } if (straw) { c.fillStyle = L('#ffc72c'); c.fillRect(1, -34, 2, 11); } c.restore(); }
  function coffee(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#f4ecd8'); K.poly(c, [-6, -16, 6, -16, 4.5, 0, -4.5, 0]); c.fill(); c.fillStyle = L('#7a4a2a'); c.fillRect(-5.5, -10, 11, 4); c.fillStyle = L('#2a2422'); c.fillRect(-7, -18, 14, 3); c.restore(); }
  function tray(c, x, y, s, T) { // T: {b, f, d, kid, bfast}
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#c8281e'); K.poly(c, [-34, 0, 34, 0, 30, -4, -30, -4]); c.fill(); c.fillStyle = L('#f4ecd8'); c.fillRect(-24, -5, 48, 1.5); c.restore();
    if (!T) return; const k = s;
    if (T.kid) { c.fillStyle = L('#d8281e'); c.fillRect(x - 28 * k, y - 22 * k, 16 * k, 18 * k); c.fillStyle = L('#ffc72c'); c.beginPath(); c.arc(x - 20 * k, y - 22 * k, 5 * k, Math.PI, TAU); c.lineWidth = 2; c.strokeStyle = L('#ffc72c'); c.stroke(); c.beginPath(); c.arc(x - 20 * k, y - 13 * k, 3 * k, 0, TAU); c.fill(); }
    if (T.bfast) { coffee(c, x + 18 * k, y - 4 * k, k); c.fillStyle = L('#d8a050'); c.fillRect(x - 8 * k, y - 10 * k, 18 * k, 6 * k); return; }
    if (T.f > 0) friesBox(c, x - 4 * k, y - 4 * k, k, T.fl ?? 1);
    if (T.d > 0) drinkCup(c, x + 20 * k, y - 4 * k, k * 0.9, 1, 1, T.dl ?? 1);
  }
  const H = {
    patty: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c87a6a'); ellipse(c, x, y + 2 * s, 8 * s, 2.6 * s); c.fill(); } }),
    spatula: (p) => ({ draw(c, x, y, s, a) { c.fillStyle = L('#3a3a3a'); c.save(); c.translate(x, y); c.rotate(a.f > 0 ? 0.5 : -0.5); c.fillRect(-1.5 * s, -2 * s, 3 * s, 10 * s); c.fillStyle = L('#c8ccd0'); c.fillRect(-7 * s, 8 * s, 14 * s, 2 * s); if (p) { c.fillStyle = L('#5a2e18'); ellipse(c, 0, 6 * s, 7 * s, 2.4 * s); c.fill(); } c.restore(); } }),
    cheese: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f8c830'); c.fillRect(x - 6 * s, y, 12 * s, 2 * s); } }),
    bun: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f0bc6a'); c.beginPath(); c.arc(x, y + 4 * s, 8 * s, Math.PI, TAU); c.fill(); } }),
    wrapped: () => ({ draw(c, x, y, s) { burgerW(c, x, y + 8 * s, s * 1.1, 0); } }),
    basket: (load) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#6a7076'); c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x - a.f * 16 * s, y + 6 * s); c.stroke(); c.fillStyle = L('#9aa0a6'); c.fillRect(x - a.f * 16 * s - 12 * s, y + 4 * s, 24 * s, 14 * s); if (load) { c.fillStyle = L(load > 1 ? '#f4c430' : '#f8e8b0'); for (let i = 0; i < 6; i++) c.fillRect(x - a.f * 16 * s - 10 * s + i * 3.6 * s, y + 2 * s - (i % 2) * 2 * s, 2.4 * s, 8 * s); } } }),
    scoop: (n) => ({ draw(c, x, y, s) { c.fillStyle = L('#c8ccd0'); K.poly(c, [x - 8 * s, y, x + 8 * s, y, x + 6 * s, y + 10 * s, x - 6 * s, y + 10 * s]); c.fill(); if (n) { c.fillStyle = L('#f4c430'); for (let i = 0; i < 4; i++) c.fillRect(x - 6 * s + i * 3.4 * s, y - 5 * s, 2.2 * s, 7 * s); } } }),
    salt: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f4f0e8'); c.fillRect(x - 3 * s, y - 4 * s, 6 * s, 10 * s); c.fillStyle = L('#a8aeb4'); c.fillRect(x - 3 * s, y - 6 * s, 6 * s, 2.4 * s); } }),
    fries: () => ({ draw(c, x, y, s) { friesBox(c, x, y + 10 * s, s * 1.1); } }),
    cup: (lid, straw) => ({ draw(c, x, y, s) { drinkCup(c, x, y + 14 * s, s, lid, straw, cup ? cup.lv : 1); } }),
    bag: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c8a070'); K.poly(c, [x - 10 * s, y - 2 * s, x + 10 * s, y - 2 * s, x + 11 * s, y + 22 * s, x - 11 * s, y + 22 * s]); c.fill(); c.fillStyle = L('#ffc72c'); c.beginPath(); c.arc(x, y + 10 * s, 4 * s, Math.PI, TAU); c.lineWidth = 2; c.strokeStyle = L('#ffc72c'); c.stroke(); c.fillStyle = L('#a88050'); c.fillRect(x - 10 * s, y - 2 * s, 20 * s, 3 * s); } }),
    tray: (T) => ({ draw(c, x, y, s, a) { tray(c, x + a.f * 14 * s, y + 2 * s, s * 0.95, T); } }),
    tent: () => ({ draw(c, x, y, s) { c.fillStyle = L('#ffc72c'); K.poly(c, [x - 6 * s, y + 4 * s, x + 6 * s, y + 4 * s, x, y - 8 * s]); c.fill(); c.fillStyle = L('#2a2422'); c.fillRect(x - 2 * s, y - 1 * s, 4 * s, 2 * s); } }),
    receipt: () => ({ draw(c, x, y, s) { c.fillStyle = L('#fbfaf6'); c.fillRect(x - 3 * s, y - 2 * s, 6 * s, 12 * s); } }),
    burger: (T) => ({ draw(c, x, y, s) { burgerW(c, x, y + 6 * s, s * 1.15, 1, T ? T.bf : 1); } }),
    fry: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#f4c430'); c.save(); c.translate(x, y); c.rotate(-a.f * 0.6); c.fillRect(-1.2 * s, -8 * s, 2.4 * s, 12 * s); c.fillStyle = L('#d8241a'); c.fillRect(-1.3 * s, -9 * s, 2.6 * s, 2.4 * s); c.restore(); } }),
    drink: (T) => ({ draw(c, x, y, s, a) { drinkCup(c, x, y + 14 * s, s, 1, 1, T ? T.dl : 1); } }),
    coffee: () => ({ draw(c, x, y, s) { coffee(c, x, y + 10 * s, s * 1.1); } }),
    phone: () => ({ draw(c, x, y, s) { c.fillStyle = '#1a1a1a'; c.fillRect(x - 3.5 * s, y - 7 * s, 7 * s, 12 * s); c.fillStyle = L('#8ab8f0'); c.fillRect(x - 2.6 * s, y - 6 * s, 5.2 * s, 9 * s); } }),
    toy: () => ({ draw(c, x, y, s) { c.fillStyle = L('#3a7ac8'); c.fillRect(x - 6 * s, y - 3 * s, 12 * s, 5 * s); c.fillStyle = L('#ffc72c'); c.fillRect(x - 3 * s, y - 6 * s, 6 * s, 3 * s); c.fillStyle = '#111'; c.beginPath(); c.arc(x - 3.5 * s, y + 2.5 * s, 1.8 * s, 0, TAU); c.arc(x + 3.5 * s, y + 2.5 * s, 1.8 * s, 0, TAU); c.fill(); } }),
    wrench: () => ({ draw(c, x, y, s) { c.fillStyle = L('#8a9098'); c.fillRect(x - 1.5 * s, y - 12 * s, 3 * s, 16 * s); c.beginPath(); c.arc(x, y - 13 * s, 4 * s, 0, TAU); c.fill(); } }),
    mop: () => ({ draw(c, x, y, s) { c.fillStyle = L('#a8805a'); c.fillRect(x - 1.2 * s, y - 10 * s, 2.4 * s, 60 * s); c.fillStyle = L('#e8e4dc'); c.fillRect(x - 10 * s, y + 48 * s, 20 * s, 6 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    card: () => ({ draw(c, x, y, s) { c.fillStyle = L('#3a7ac8'); c.fillRect(x - 6 * s, y - 4 * s, 12 * s, 8 * s); } }),
  };
  /* ---------- crew ---------- */
  function mkStaff() {
    jay = K.mk(B({ T: 240, hw: 62, headR: 28, pattern: 'polo', top: 'red', pants: 'dark', hat: 'visor', hatCol: 'red', hairStyle: 'short', hair: 'dark' }), { role: 'grill', staff: 1, hx: 233, f: 1, floorY: SF, sc: SSC, faceDir: 0.4 });
    mia = K.mk(B({ T: 232, hw: 58, headR: 28, pattern: 'polo', top: 'red', pants: 'dark', hat: 'cap', hatCol: 'red', hairStyle: 'pony', hair: 'brown' }), { role: 'drive', staff: 1, hx: 86, f: -1, floorY: SF, sc: SSC * 0.97, faceDir: -0.4, speed: 1.2 });
    jay.think = jayThink; mia.think = miaThink;
  }
  const CT = CTR.top, walk = (x) => K.ph(0, (s) => { s.walkTo = x; }, { until: (s) => !s.walking, max: 25 });
  const pend = () => orders.filter((o) => o.state === 'new');
  function jayThink(a) {
    if (shakeDown === 1) return fixShake(a);
    const p = pend(), needB = p.reduce((t, o) => t + o.b, 0) - chute - grill.p.length, needF = p.reduce((t, o) => t + o.f, 0) - fries;
    if (needF > 0 && fryer.basket === 'up') return fry(a);
    if (needB > 0 && !grill.p.length) return cook(a, Math.min(2, needB));
    const r = Math.random();
    if (r < 0.4) return K.start(a, 'scrape', [walk(243), K.ph(rand(2, 3), (s, u, t) => { s.f = 1; s.hold.N = H.spatula(); s.tgN = [GRILL.x0 + 34 + Math.sin(t * 6) * 22, 494]; s.leanT = 0.15; if (Math.random() < 0.04) K.fx('puff', s.tgN[0], 486, { life: 0.8, col: '#dddddd' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.6) return K.start(a, 'wipe', [walk(232), K.ph(rand(1.5, 2.5), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [243 + Math.sin(t * 5) * 18, CT - 6]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [walk(238), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 20, CT - 8]; s.tgF = [s.hx + 6, CT - 8]; s.lxT = pick([0.6, 0.2, -0.6]); })]);
  }
  function cook(a, n) {
    const egg = breakfast(), ph = [walk(239)];
    for (let i = 0; i < n; i++) ph.push(K.ph(0.45, (s) => { s.f = 1; s.tgN = [GRILL.x0 + 10, 556]; s.leanT = 0.25; }, { exit: (s) => { s.hold.N = H.patty(); } }), K.ph(0.45, (s) => { s.tgN = [GRILL.x0 + 17 + i * 30, 488]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; grill.p.push({ x: GRILL.x0 + 17 + i * 30, cook: 0, flip: 0, ft: 0, cheese: 0, egg }); K.fx('puff', GRILL.x0 + 17 + i * 30, 484, { life: 0.9, col: '#ffffff' }); } }));
    ph.push(K.ph(1.6, (s, u, t) => { s.hold.N = H.spatula(); const q = grill.p[Math.floor(t * 1.5) % grill.p.length]; if (q) s.tgN = [q.x - 4, 478 + Math.abs(Math.sin(t * 6)) * 6]; s.leanT = 0.12; for (const q of grill.p) q.cook = Math.min(1, q.cook + 0.01); }));
    for (let i = 0; i < n; i++) ph.push(K.ph(0.6, (s, u) => { const q = grill.p[i]; if (!q) return; s.tgN = [q.x - 10 + u * 8, 484 - Math.sin(u * Math.PI) * 18]; q.ft = u; }, { exit: () => { const q = grill.p[i]; if (q) { q.flip = 1; q.ft = 0; K.fx('puff', q.x, 482, { life: 0.8, col: '#ffffff' }); } } }));
    if (!egg) for (let i = 0; i < n; i++) ph.push(K.ph(0.4, (s) => { s.hold.N = H.cheese(); s.tgN = [GRILL.x1 - 6, 470]; }), K.ph(0.4, (s) => { const q = grill.p[i]; if (q) s.tgN = [q.x, 480]; }, { exit: (s) => { s.hold.N = null; const q = grill.p[i]; if (q) q.cheese = 1; } }));
    ph.push(K.ph(1.0, (s, u, t) => { s.hold.N = H.spatula(); s.tgN = [GRILL.x0 + 34 + Math.sin(t * 4) * 18, 486]; for (const q of grill.p) q.cook = Math.min(1, q.cook + 0.02); }));
    // build on the board in front (bun heel -> patty -> crown -> wrap), one by one
    for (let i = 0; i < n; i++) ph.push(
      K.ph(0.4, (s) => { s.hold.N = null; s.tgF = [GRILL.x1 - 10, 440]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.bun(); } }),
      K.ph(0.4, (s) => { s.tgF = [249, CT - 6]; }, { exit: (s) => { s.hold.F = null; s.farFront = false; grill.board = 1; } }),
      K.ph(0.5, (s) => { s.hold.N = H.spatula(true); const q = grill.p[0]; s.tgN = [q ? q.x : 233, 484]; }, { exit: () => { grill.p.shift(); } }),
      K.ph(0.5, (s) => { s.hold.N = H.spatula(true); s.tgN = [245, CT - 18]; }, { exit: (s) => { s.hold.N = null; grill.board = 2; } }),
      K.ph(0.8, (s, u, t) => { s.tgN = [250 + Math.sin(t * 12) * 6, CT - 8]; s.tgF = [244 - Math.sin(t * 12) * 6, CT - 8]; s.leanT = 0.15; }, { exit: () => { grill.board = 0; grill.wrapped = (grill.wrapped || 0) + 1; } }));
    ph.push(K.ph(0.4, (s) => { s.tgN = [248, CT - 10]; }, { exit: (s) => { s.hold.N = H.wrapped(); grill.wrapped = 0; s.nW = n; } }), walk(174), K.ph(0.5, (s) => { s.f = -1; s.tgN = [CHUTE + 10, 462]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; chute += s.nW; } }), walk(239));
    K.start(a, 'cook', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; chute += grill.p.length + (grill.wrapped || 0) + (grill.board ? 1 : 0); grill.p = []; grill.board = 0; grill.wrapped = 0; } });
  }
  function fry(a) {
    K.start(a, 'fry', [walk(187), K.ph(0.5, (s) => { s.f = -1; s.tgN = [FRYER - 6, 470]; s.leanT = 0.1; }, { exit: (s) => { fryer.basket = 'held'; s.hold.N = H.basket(0); } }),
      K.ph(0.6, (s) => { s.tgN = [FRYER + 4, 556]; s.leanT = 0.3; }, { exit: (s) => { s.hold.N = H.basket(1); } }),
      K.ph(0.5, (s) => { s.tgN = [FRYER + 4, 470]; s.leanT = 0.05; }),
      K.ph(0.4, (s) => { s.tgN = [FRYER + 12, 492]; }, { exit: (s) => { s.hold.N = null; fryer.basket = 'down'; fryer.t = 0; fryer.load = 1; K.fx('puff', FRYER, 480, { life: 1, col: '#ffffff' }); } }),
      K.ph(2.8, (s, u, t) => { s.tgN = [s.hx - 18, CT - 10]; s.tgF = [s.hx - 4, CT - 10]; s.look = { x: () => FRYER, until: K.simT + 0.3 }; }, { exit: () => { beep = 1; K.say(a, 'icon:beep', 0.8); } }),
      K.ph(0.4, (s) => { s.tgN = [FRYER + 12, 486]; }, { exit: (s) => { fryer.basket = 'held'; s.hold.N = H.basket(2); } }),
      K.ph(1.0, (s, u, t) => { s.tgN = [FRYER + 6, 462 + (Math.sin(t * 22) > 0 ? -5 : 0)]; s.shake = u < 0.6 ? Math.sin(t * 22) * 0.025 : 0; if (Math.random() < 0.15) K.fx('spark', FRYER - 10, 480, { life: 0.3, col: '#ffd060' }); }, { exit: (s) => { s.shake = 0; } }),
      K.ph(0.6, (s, u) => { s.tgN = [lerp(FRYER + 6, FRYST + 18, u), 470 - Math.sin(u * Math.PI) * 10]; }, { exit: (s) => { s.hold.N = H.basket(0); fries += 3; fryer.load = 0; } }),
      K.ph(0.3, (s) => { s.tgN = [FRYER - 6, 470]; }, { exit: (s) => { s.hold.N = null; fryer.basket = 'up'; } }),
      K.ph(0.9, (s, u, t) => { s.hold.N = H.salt(); s.tgN = [FRYST + 8 + Math.sin(t * 20) * 3, 470]; if (Math.random() < 0.3) K.fx('spark', FRYST + 6, 486, { life: 0.25, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } })],
      { onAbort: (s) => { s.hold.N = null; s.shake = 0; if (fryer.load) { fries += 3; fryer.load = 0; } fryer.basket = 'up'; } });
  }
  function fixShake(a) {
    shakeDown = 2;
    K.start(a, 'fix', [walk(149), K.ph(0.6, (s) => { s.f = -1; s.hold.N = H.wrench(); s.tgN = [SHAKE + 14, 380]; }, { enter: () => K.say(a, pick(['Not again…', 'Hold on…']), 1.2) }), K.ph(1.4, (s, u, t) => { s.tgN = [SHAKE + 14, 372 + Math.abs(Math.sin(t * 10)) * 14]; if (Math.abs(Math.sin(t * 10)) > 0.97) K.fx('spark', SHAKE + 8, 372, { life: 0.2, col: '#ffffff' }); }), K.ph(0.6, (s) => { s.hold.N = null; s.tgN = [SHAKE + 4, 360]; s.tgF = [SHAKE - 8, 364]; }, { exit: () => { shakeDown = 0; K.fx('spark', SHAKE, 350, { life: 0.8, col: '#7aff8a' }); K.say(a, 'Fixed it!', 1.2); K.say(mia, 'icon:laugh', 1.2); } }), walk(239)], { onAbort: (s) => { s.hold.N = null; shakeDown = 0; } });
  }
  /* ---------- Mia: drive-thru, fountain, bagging, table runner ---------- */
  function miaThink(a) {
    if (car && car.state === 'wait') return takeCarOrder(a);
    const tg = guests().find((g) => g.take && g.phase === 'tkReady'); if (tg) return takeCounterOrder(a, tg);
    const o = orders.find((q) => q.state === 'new' && chute >= q.b && fries >= q.f);
    if (o) return assemble(a, o);
    const r = Math.random();
    if (r < 0.3 && K.cooled(a, 'wipe', 10)) return K.start(a, 'wipe', [walk(92), K.ph(rand(1.5, 2.5), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [92 + Math.sin(t * 5) * 20, CT - 6]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.5 && K.cooled(a, 'cups', 25)) return K.start(a, 'cups', [walk(103), K.ph(0.5, (s) => { s.f = 1; s.tgN = [113, 556]; s.leanT = 0.3; }), K.ph(0.6, (s) => { s.tgN = [FOUNT - 30, 420]; s.leanT = 0; }, { exit: () => { cupStack = 6; } })]);
    return K.start(a, 'idle', [walk(85), K.ph(rand(1.5, 3), (s) => { s.f = -1; s.tgN = [s.hx - 16, CT - 8]; s.tgF = [s.hx - 2, CT - 8]; s.lxT = pick([-0.6, 0.3, 0.7]); })]);
  }
  let cupStack = 6;
  function takeCarOrder(a) {
    car.state = 'ordering';
    const bf = breakfast(), o = { kind: 'car', b: bf ? 1 : randi(1, 3), f: bf ? 0 : randi(1, 2), d: 1, bfast: bf, state: 'hold', num: ++num, car };
    K.start(a, 'carOrder', [walk(80), K.ph(2.4, (s, u, t) => { s.f = -1; s.tgN = [s.R.cx - 10, s.R.cy + 16]; s.tgF = [s.hx - 30, CT - 8]; s.look = { x: () => DT.x0, until: K.simT + 0.3 }; }, { enter: () => { K.say(a, pick(['Welcome! What can I get you?', 'Hi there — ready to order?']), 1.4); K.after(1.4, () => { car.say = { t: K.simT, txt: bf ? pick(['Coffee and a muffin', 'Two hash browns, coffee']) : pick(['Cheeseburger meal, please', 'Two burgers, large fries', 'Just a burger and a cola']) }; }); }, exit: () => { o.state = 'new'; orders.push(o); car.state = 'paid'; K.say(a, 'Coming right up!', 1); } })], { onAbort: () => { if (o.state === 'hold') { o.state = 'new'; orders.push(o); } car.state = 'paid'; } });
  }
  function takeCounterOrder(a, g) {
    g.phase = 'tkOrdering'; const bf = breakfast(), o = { kind: 'take', take: 1, b: bf ? 1 : randi(1, 2), f: bf ? 0 : 1, d: 1, bfast: bf, state: 'hold', num: ++num, guest: g };
    K.start(a, 'counterOrder', [walk(TAKE.x - 64), K.ph(2.2, (s) => { s.f = 1; s.tgN = [s.hx + 22, CT - 10]; s.tgF = [s.hx + 10, CT - 8]; s.look = { x: () => g.hx, until: K.simT + 0.3 }; }, { enter: () => { K.say(a, pick(['Hi! What can I get you?', 'Next, please!']), 1.2); K.after(1.2, () => K.say(g, bf ? pick(['Coffee and a muffin', 'Hash brown, please']) : pick(['Burger and fries to go', 'Two cheeseburgers to go']), 1.3)); }, exit: () => { o.state = 'new'; orders.push(o); g.phase = 'tkWait'; } })],
      { onAbort: () => { if (o.state === 'hold') { o.state = 'new'; orders.push(o); } g.phase = 'tkWait'; } });
  }
  function assemble(a, o) {
    o.state = 'packing'; const ph = [];
    const tab = o.kind === 'table';
    ph.push(walk(BAG + 18), K.ph(0.4, (s) => { s.f = -1; s.tgN = [BAG, CT - 8]; s.leanT = 0.1; }, { exit: () => { bag = { o, tray: tab, items: { b: 0, f: 0, d: 0 } }; } }));
    // drink (coffee in the morning)
    ph.push(walk(FOUNT - 14), K.ph(0.4, (s) => { s.f = 1; s.tgN = [FOUNT - 30, 420]; s.leanT = 0.05; }, { exit: () => { cupStack = Math.max(0, cupStack - 1); cup = { lv: 0, at: 'fount', bf: o.bfast }; } }),
      K.ph(1.4, (s, u) => { s.tgN = [FOUNT - 6, 452]; s.tgF = [FOUNT + 4, 488]; cup.lv = u; }, { exit: () => {} }),
      K.ph(0.5, (s) => { s.tgN = [FOUNT + 2, 464]; }, { exit: (s) => { cup.at = 'hand'; s.hold.N = o.bfast ? H.coffee() : H.cup(1, 1); } }),
      walk(BAG + 18), K.ph(0.4, (s) => { s.f = -1; s.tgN = [BAG + (tab ? 20 : 12), CT - 10]; }, { exit: (s) => { s.hold.N = null; cup = null; bag.items.d = 1; } }));
    if (o.f) ph.push(walk(FRYST - 14), K.ph(0.5, (s) => { s.f = 1; s.hold.N = H.scoop(0); s.tgN = [FRYST - 2, 494]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = H.scoop(1); fries = Math.max(0, fries - o.f); } }), K.ph(0.4, (s) => { s.tgN = [FRYST - 18, 470]; }, { exit: (s) => { s.hold.N = H.fries(); } }));
    ph.push(walk(FRYST - 14), K.ph(0.5, (s) => { s.f = 1; s.tgF = [CHUTE + 4, 462]; s.farFront = true; }, { exit: (s) => { chute = Math.max(0, chute - o.b); s.hold.F = H.wrapped(); } }),
      walk(BAG + 18), K.ph(0.6, (s) => { s.f = -1; s.tgN = [BAG + 4, CT - 10]; s.tgF = [BAG - 6, CT - 10]; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; bag.items.f = o.f; bag.items.b = o.b; } }));
    if (!tab) {
      ph.push(K.ph(0.7, (s, u, t) => { s.tgN = [BAG + Math.sin(t * 14) * 4, CT - 22]; s.tgF = [BAG - 8, CT - 20]; }, { exit: (s) => { bag.closed = 1; } }),
        K.ph(0.4, (s) => { s.tgN = [BAG, CT - 14]; }, { exit: (s) => { s.hold.N = H.bag(); s.hold.F = o.bfast ? H.coffee() : H.cup(1, 1); cup = { lv: 1 }; bag = null; } }),
        ...(o.take ? [walk(TAKE.x - 64), K.ph(0.8, (s) => { s.f = 1; s.carryUp = false; s.tgN = [TAKE.x - 30, CT - 12]; s.tgF = [TAKE.x - 36, CT - 8]; s.leanT = 0.12; }, { enter: () => { K.say(a, 'Order ' + o.num + '!', 1.1); if (o.guest) o.guest.reach = 1; }, exit: (s) => { s.hold.N = null; s.hold.F = null; cup = null; if (o.guest) { o.guest.got = 1; o.guest.hold.N = H.bag(); } K.say(a, pick(['Enjoy!', 'Have a good one!']), 1.1); } }),
          K.ph(0.3, null, { exit: () => { o.state = 'done'; orders = orders.filter((q) => q !== o); } }), walk(92)] : [
        walk(73), K.ph(0.9, (s) => { s.f = -1; s.tgN = [DT.x0 + 30, 440]; s.tgF = [DT.x0 + 44, 444]; s.leanT = 0.15; }, { enter: () => { if (o.car) o.car.arm = 1; }, exit: (s) => { s.hold.N = null; s.hold.F = null; cup = null; if (o.car) { o.car.arm = 2; o.car.got = 1; } K.say(a, pick(['Have a great day!', 'Enjoy!', 'Drive safe!']), 1.2); } }),
        K.ph(0.6, (s) => { s.tgN = [s.hx - 10, CT - 10]; }, { exit: () => { o.state = 'done'; if (o.car) { o.car.arm = 0; o.car.state = 'leave'; } orders = orders.filter((q) => q !== o); } })]));
    } else {
      ph.push(K.ph(0.4, (s) => { s.tgN = [BAG + 10, CT - 8]; s.tgF = [BAG - 14, CT - 8]; }, { exit: (s) => { s.hold.N = H.tray(o.T); bag = null; s.carryUp = true; } }),
        K.ph(0, (s) => { s.carryUp = true; s.tgN = [s.hx + s.f * 14, s.hy - 104]; s.walkTo = TB.x + 10; }, { until: (s) => !s.walking, max: 40, enter: () => K.say(a, 'Order ' + o.num + '!', 1.2) }),
        K.ph(0.7, (s) => { s.f = -1; s.carryUp = false; s.tgN = [TB.x + 10, TB.top - 18]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; table.tray = o.T; o.state = 'done'; orders = orders.filter((q) => q !== o); if (o.party) o.party.stage = 'eating'; K.say(a, 'Enjoy your meal!', 1.2); } }),
        K.ph(0.5, (s) => { s.tgN = [TB.x - 20, TB.top - 10]; }, { exit: (s) => { table.tent = 0; s.hold.N = H.tent(); } }), walk(85), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; } }));
    }
    K.start(a, 'pack', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; s.carryUp = false; cup = null; bag = null; if (o.state === 'packing') { if (tab) { table.tray = o.T; if (o.party) o.party.stage = 'eating'; table.tent = 0; } else if (o.car) { o.car.state = 'leave'; o.car.arm = 0; } else if (o.guest) { o.guest.got = 1; o.guest.hold.N = H.bag(); } o.state = 'done'; orders = orders.filter((q) => q !== o); } } });
  }
  /* ---------- guests (kiosk -> booth) ---------- */
  const TYPES = {
    mom: { body: B({ T: 234, hw: 58, headR: 28, pattern: 'cardigan', top: 'teal', top2: 'cream', pants: 'navy', hairStyle: 'bob', hair: 'brown' }), words: ['Eat your fries', 'Napkin, please'] },
    kid: { body: B({ T: 170, hw: 46, headR: 26, pattern: 'tee', top: 'yel', pants: 'blue', hairStyle: 'short', shortSleeve: 1 }), words: ['Vroom!', 'Can I have a toy?', 'icon:laugh'], kid: 1, sc: 0.8 },
    teen: { body: B({ pattern: 'hoodie', top: 'plum', pants: 'dark', hood: 1, hairStyle: 'short' }), words: ['No way', 'lol', 'icon:laugh'], phone: 1 },
    teen2: { body: B({ T: 228, hw: 54, headR: 27, pattern: 'tee', top: 'pink', pants: 'navy', hairStyle: 'long', hair: 'dark', shortSleeve: 1 }), words: ['Selfie!', 'icon:cam'], phone: 1, selfie: 1 },
    trucker: { body: B({ T: 246, hw: 70, torso: 'round', pattern: 'knit', top: 'olive', top2: 'dark', pants: 'navy', hat: 'cap', hatCol: 'navy', hair: 'hairGrey' }), words: ['Long haul today', 'Good coffee'] },
    worker: { body: B({ pattern: 'hivis', top: 'mustard', pants: 'navy', hat: 'beanie', hatCol: 'coral' }), words: ['Lunch break!'] },
    suit: { body: B({ pattern: 'suit', top: 'grey', shirt: 'white', tie: 'red', pants: 'grey', glasses: 1 }), words: ['Quick bite', 'icon:clock'], phone: 1 },
    gf: { body: B({ T: 230, hw: 56, headR: 28, pattern: 'jacket', top: 'coral', pants: 'dark', hairStyle: 'pony' }), words: ['Late-night fries!', 'icon:heart'] },
    bf: { body: B({ pattern: 'hoodie', top: 'navy', pants: 'dark', hairStyle: 'short' }), words: ['Best idea ever', 'icon:heart'] },
  };
  const PARTIES = [{ m: ['trucker'], w: [3, 0.5, 0.5, 0.5, 0] }, { m: ['mom', 'kid'], w: [0.5, 3, 2, 2, 0] }, { m: ['teen', 'teen2'], w: [0, 1.5, 3, 1.5, 0] }, { m: ['worker'], w: [1, 2, 0.5, 0, 0] }, { m: ['suit'], w: [1, 2, 1, 0.5, 0] }, { m: ['gf', 'bf'], w: [0, 0, 0.5, 3, 0] }];
  function arrive() {
    const p = per(); if (!lobbyOpen() || table.party || table.tray || kioskBusy) return;
    const list = PARTIES.filter((q) => q.w[p] > 0); if (!list.length) return; let tot = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * tot, pt = list[0]; for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    const party = { members: [], stage: 'arrive', bf: breakfast() }; table.party = party;
    pt.m.forEach((type, j) => { const a = mkGuest(type, 1320 + j * 60); a.party = party; party.members.push(a); a.seat = TB.seats[pt.m.length === 1 ? 0 : j]; a.seat.occ = a; if (j === 0) { a.lead = 1; a.walkTo = KIOSK + 44; a.phase = 'toKiosk'; kioskBusy = a; } else { a.walkTo = a.seat.x; a.phase = 'toSeat'; } if (type === 'kid' && Math.random() < 0.7) a.balloon = { col: pick(['#e8241a', '#3a7ac8', '#ffc72c']) }; });
  }
  function arriveTake() { // takeaway guest: steps up to the counter end, orders with Mia, waits, takes the bag (busier at lunch / dinner, never more than one)
    if (!lobbyOpen() || guests().some((g) => g.take)) return;
    const a = mkGuest(pick(['worker', 'suit', 'teen', 'gf', 'trucker', 'mom']), TAKE.x + 110); a.take = 1; a.phase = 'tkIn'; a.walkTo = TAKE.x;
  }
  function mkGuest(type, x) {
    const T0 = TYPES[type]; const a = K.mk(Object.assign({}, T0.body), { type, T0, cust: 1, hx: x, f: -1, floorY: FL - 6, sc: SC * (T0.sc || 1), alpha: 0, fade: 1.5, speed: rand(0.95, 1.08) * (T0.kid ? 1.1 : 1), bfrac: 1 });
    if (cool('snow') || cool('rain')) if (Math.random() < 0.6) a.scarf = pick(['coral', 'cream', 'mustard', 'teal']);
    a.think = guestThink; return a;
  }
  function sitAt(a) { K.sitDown(a, a.seat.x, a.T0.kid ? 618 : 600, a.seat.f); a.floorY = 704; a.tableY = TB.top - 6; a.faceDir = a.seat.f * 0.85; a.phase = 'table'; }
  function guestThink(a) {
    const P = a.party, mate = P && P.members.find((m) => m !== a);
    if (a.take) return takeThink(a);
    if (a.phase === 'toSeat') { if (a.walking || a.walkTo != null) return; sitAt(a); return; }
    if (a.phase === 'toKiosk') { if (a.walking || a.walkTo != null) return; a.phase = 'ordering';
      const kid = P.members.some((m) => m.T0.kid), n = P.members.length, o = { kind: 'table', b: P.bf ? 0 : n, f: P.bf ? 0 : Math.max(1, n - (kid ? 1 : 0)), d: 1, bfast: P.bf, state: 'hold', num: ++num, party: P, T: { b: n, f: P.bf ? 0 : 1, d: 1, fl: 1, dl: 1, kid, bfast: P.bf } };
      if (P.bf) o.b = n; // breakfast muffins come off the grill too
      return K.start(a, 'kiosk', [K.ph(2.6, (s, u, t) => { s.f = -1; s.tgN = [KIOSK + 6 + (Math.floor(t * 3) % 3) * 6, 432 + (Math.floor(t * 2) % 2) * 14]; kioskT = 1 + Math.floor(u * 3); s.look = { x: () => KIOSK, until: K.simT + 0.3 }; s.leanT = 0.05; }, { enter: () => K.say(a, 'icon:q', 0.8) }),
        K.ph(0.8, (s) => { s.tgN = [KIOSK + 10, 470]; }, { enter: () => { receipt = 1; }, exit: (s) => { receipt = 0; kioskT = 0; s.hold.N = H.receipt(); s.hold.F = H.tent(); o.state = 'new'; orders.push(o); P.stage = 'ordered'; P.num = o.num; } }),
        K.ph(0, (s) => { s.walkTo = s.seat.x; }, { until: (s) => !s.walking, max: 20 })], { onEnd: (s) => { kioskBusy = null; s.phase = 'placeTent'; sitAt(s); }, onAbort: (s) => { kioskBusy = null; s.hold.N = null; s.hold.F = null; if (o.state === 'hold') { o.state = 'new'; orders.push(o); P.stage = 'ordered'; } s.phase = 'placeTent'; kioskT = 0; receipt = 0; } });
    }
    if (a.state === 'sit' || a.state === 'rise') return;
    if (a.phase === 'placeTent') { a.phase = 'table'; return K.start(a, 'tent', [K.ph(0.6, (s) => { s.tgF = [TB.x - 30, TB.top - 10]; s.farFront = true; s.leanT = 0.1; }, { exit: (s) => { s.hold.F = null; s.hold.N = null; s.farFront = false; table.tent = P.num || 1; } })], { onAbort: (s) => { s.hold.F = null; s.hold.N = null; table.tent = P.num || 1; } }); }
    if (a.phase === 'table') {
      if (P.stage === 'leave') { a.phase = 'leave'; return; }
      const T = table.tray, r = Math.random();
      if (P.stage === 'eating' && T) {
        if (a.balloon && !ceilBalloon && r < 0.06 && K.cooled(a, 'bal', 6)) { const b = a.balloon; a.balloon = null; balloon = { x: a.hN ? a.hN.x : a.hx, y: a.hN ? a.hN.y - 60 : 400, col: b.col, t: 0 }; K.say(a, 'My balloon!', 1.6); if (mate) K.after(0.6, () => K.say(mate, 'Oh no!', 1.2)); K.after(1.2, () => K.say(mia, 'icon:ex', 1)); return K.start(a, 'look', [K.ph(3, (s) => { s.look = { x: () => (balloon || ceilBalloon || { x: s.hx }).x, until: K.simT + 0.3 }; s.headDy = -3; s.tgN = [s.hx + s.f * 10, s.R.cy - 40]; }, { exit: (s) => { s.headDy = 0; } })]); }
        if (a.T0.kid && T.kid && !T.toyOut && r < 0.3) return K.start(a, 'toy', [K.ph(0.6, (s) => { s.tgN = [TB.x - 26, TB.top - 18]; s.tgF = [TB.x - 14, TB.top - 18]; s.farFront = true; s.leanT = 0.15; }, { exit: () => { T.toyOut = 1; table.toy = { x: TB.x - 40, t: 0 }; K.fx('spark', TB.x - 20, TB.top - 30, { life: 0.5, col: '#ffe070' }); K.say(a, pick(['A car!', 'Yay!']), 1.2); } }), K.ph(0.3, (s) => { s.farFront = false; })]);
        if (a.T0.kid && T.toyOut && r < 0.35) return K.start(a, 'play', [K.ph(2.2, (s, u, t) => { const tx = TB.x - 40 + Math.sin(t * 3) * 24; table.toy = { x: tx, t }; s.tgN = [tx, TB.top - 10]; s.leanT = 0.15; if (Math.random() < 0.02) K.say(s, 'Vroom!', 0.8); })]);
        if (a.bfrac > 0.02 && r < 0.45) { const first = a.bfrac >= 1 && !a.unwrapped; return K.start(a, 'eat', [K.ph(0.5, (s) => { s.tgN = [TB.x + (a.seat.f > 0 ? -6 : 22), TB.top - 12]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = T.bfast ? { draw(c, x, y, sc) { c.fillStyle = L('#d8a050'); ellipse(c, x, y + 4 * sc, 8 * sc, 4 * sc); c.fill(); } } : H.burger({ bf: s.bfrac }); } }),
          ...(first ? [K.ph(0.7, (s, u, t) => { s.tgN = [s.R.cx + s.f * 34, s.R.cy + 46]; s.tgF = [s.R.cx + s.f * 26 + Math.sin(t * 14) * 4, s.R.cy + 44]; }, { exit: (s) => { s.unwrapped = 1; } })] : []),
          K.ph(0.5, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.5, s.R.cy + s.R.R * 0.55]; }, { exit: (s) => { s.bfrac = Math.max(0, s.bfrac - rand(0.2, 0.3)); s.hold.N = T.bfast ? null : H.burger({ bf: s.bfrac }); } }),
          K.ph(rand(0.8, 1.3), (s, u, t) => { s.headDy = Math.abs(Math.sin(t * 9)) * 1.4; s.tgN = [s.R.cx + s.f * 34, s.R.cy + 50]; }, { exit: (s) => { s.headDy = 0; s.hold.N = null; if (Math.random() < 0.25) K.say(a, pick(['Mmm', 'icon:heart', 'So good']), 0.9); } })], { onAbort: (s) => { s.hold.N = null; s.headDy = 0; } }); }
        if (T.f && T.fl > 0.05 && r < 0.65) return K.start(a, 'fries', [K.ph(0.45, (s) => { s.tgN = [TB.x + 6, TB.top - 16]; s.leanT = 0.12; }, { exit: (s) => { T.fl = Math.max(0, T.fl - 0.12); s.hold.N = H.fry(); } }), K.ph(0.4, (s) => { s.tgN = [TB.x - 8, TB.top - 6]; }), K.ph(0.5, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.5, s.R.cy + s.R.R * 0.5]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
        if (T.dl > 0.05 && r < 0.8) return K.start(a, 'sip', [K.ph(0.5, (s) => { s.tgF = [TB.x + 30, TB.top - 14]; s.farFront = true; }, { exit: (s) => { s.hold.F = T.bfast ? H.coffee() : H.drink(T); T.held = 1; } }), K.ph(0.5, (s) => { s.tgF = [s.R.cx + s.f * s.R.R * 0.6, s.R.cy + s.R.R * 0.9]; }), K.ph(0.9, (s, u) => { s.headDy = 1; }, { exit: (s) => { T.dl = Math.max(0, T.dl - 0.14); s.headDy = 0; } }), K.ph(0.5, (s) => { s.tgF = [TB.x + 30, TB.top - 12]; }, { exit: (s) => { s.hold.F = null; T.held = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; T.held = 0; s.farFront = false; s.headDy = 0; } });
        if (P.members.every((m) => m.bfrac <= 0.02) && (!T.f || T.fl <= 0.05 || r < 0.1)) { P.stage = 'leave'; return; }
      }
      if (a.T0.selfie && mate && mate.state === 'seated' && mate.phase === 'table' && (!mate.act || mate.act.name === 'idle' || mate.act.name === 'chat') && K.cooled(a, 'selfie', 40) && r < 0.3) { K.abort(mate); K.start(mate, 'pose', [K.ph(1.6, (s) => { s.look = { x: () => a.hx, until: K.simT + 0.3 }; s.headDy = -2; s.tgN = [s.R.cx + s.f * 20, s.R.cy - 6]; }, { exit: (s) => { s.headDy = 0; } })]); return K.start(a, 'selfie', [K.ph(1.6, (s) => { s.hold.N = H.phone(); s.tgN = [s.R.cx - s.f * 30, s.R.cy - 50]; }, { exit: (s) => { K.fx('flash', s.R.cx - s.f * 30, s.R.cy - 50, { life: 0.3 }); s.hold.N = null; K.say(s, 'icon:cam', 0.9); } })], { onAbort: (s) => { s.hold.N = null; } }); }
      if (a.T0.phone && r < 0.5) return K.start(a, 'phone', [K.ph(rand(2, 3.5), (s, u, t) => { s.hold.N = H.phone(); s.tgN = [s.R.cx + s.f * 26, s.R.cy + 44]; s.headDy = 3; if (Math.random() < 0.03) s.tgN[1] -= 3; }, { exit: (s) => { s.hold.N = null; s.headDy = 0; } })], { onAbort: (s) => { s.hold.N = null; s.headDy = 0; } });
      if (mate && r < 0.85 && K.cooled(a, 'chat', 6)) { K.say(a, pick(a.T0.words), 1.3); K.after(1.2, () => K.say(mate, pick(mate.T0.words), 1.2)); return K.start(a, 'chat', [K.ph(2.2, (s, u, t) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + s.f * 30 + Math.sin(t * 4) * 6, TB.top - 30]; })]); }
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.look = { x: () => (Math.random() < 0.5 ? 720 : 400), until: K.simT + 0.3 }; })]);
    }
    if (a.phase === 'leave') { if (a.state === 'seated') { K.standUp(a); return; } a.floorY = FL - 6; if (a.seat) { a.seat.occ = null; a.seat = null; }
      if (a.lead && table.tray) { const T = table.tray; a.phase = 'bin'; return K.start(a, 'bin', [K.ph(0.5, (s) => { s.tgN = [TB.x + 10, TB.top - 10]; s.leanT = 0.2; }, { exit: (s) => { table.tray = null; table.toy = null; s.hold.N = H.tray(Object.assign({}, T, { fl: 0, dl: 0.1 })); s.carryUp = true; } }), K.ph(0, (s) => { s.walkTo = BIN - 40; }, { until: (s) => !s.walking, max: 20 }), K.ph(0.8, (s, u) => { s.f = 1; s.carryUp = false; s.tgN = [BIN - 6, 520 + u * 10]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = H.tray(null); binFlap = 1; K.fx('puff', BIN, 520, { life: 0.6, col: '#d8d0c0' }); } }), K.ph(0.5, (s) => { s.tgN = [BIN - 4, 500]; }, { exit: (s) => { s.hold.N = null; trays = Math.min(6, trays + 1); K.say(s, pick(['Thanks!', 'Bye!']), 0.9); } })], { onEnd: (s) => { s.phase = 'out'; s.walkTo = 1330; }, onAbort: (s) => { s.hold.N = null; s.carryUp = false; table.tray = null; s.phase = 'out'; s.walkTo = 1330; } }); }
      a.phase = 'out'; a.walkTo = 1330; return; }
    if (a.phase === 'out') { if (P && P.members.every((m) => m.phase === 'out')) { table.party = null; table.tent = 0; } if (!a.walking) a.fade = -2; else if (a.hx > 1260) a.fade = -1.5; }
  }
  function takeThink(a) {
    if (a.walking || a.walkTo != null) return;
    if (a.phase === 'tkIn') { a.phase = 'tkReady'; a.f = -1; return; }
    if (a.phase === 'tkWait' && a.got) { a.phase = 'tkOut'; K.say(a, pick(['Thanks!', 'Cheers!']), 1); a.walkTo = TAKE.x + 250; return; }
    if (a.phase === 'tkWait' && a.reach && !a.got) return K.start(a, 'take', [K.ph(0.6, (s) => { s.f = -1; s.hold.F = null; s.tgN = [TAKE.x - 26, CT - 10]; s.leanT = 0.08; })]);
    if (a.phase === 'tkReady' || a.phase === 'tkOrdering' || a.phase === 'tkWait') return K.start(a, 'wait', [K.ph(rand(1.5, 3), (s) => { s.f = -1; if (a.phase === 'tkWait' && a.T0.phone) { s.hold.F = H.phone(); s.tgF = [s.R.cx - 20, s.R.cy + 44]; s.headDy = 3; } else { s.tgN = [s.hx - 24, CT - 6]; s.lxT = pick([-0.6, -0.2]); } }, { exit: (s) => { s.headDy = 0; s.hold.F = null; } })], { onAbort: (s) => { s.hold.F = null; s.headDy = 0; } });
    if (a.phase === 'tkOut') a.fade = -2;
  }
  let kioskBusy = null, nextTake = 8;
  let binFlap = 0, trays = 2, doorSign = 0;
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    nextArrive -= dt; if (nextArrive <= 0) { arrive(); nextArrive = rand(3, 7); }
    nextTake -= dt; if (nextTake <= 0) { arriveTake(); const p = per(); nextTake = p === 1 || p === 3 ? rand(10, 18) : rand(30, 50); }
    nextCar -= dt; if (nextCar <= 0 && !car) { car = { x: -260, state: 'arrive', col: pick(['#3a6ac8', '#e8e4dc', '#c8302a', '#2a2a2a', '#4a8a5a', '#e8a838']), arm: 0, t: 0, driver: pick(['skin', 'skin2']) }; nextCar = per() === 4 ? rand(14, 26) : rand(22, 40); }
    if (car) { car.t += dt; if (car.state === 'arrive') { car.x = Math.min(0, car.x + dt * 120); if (car.x >= 0) car.state = 'wait'; } else if (car.state === 'leave') { car.x += dt * (60 + car.t * 4); if (car.x > 260) car = null; } }
    nextPass -= dt; if (nextPass <= 0) { cars.push({ x: Math.random() < 0.5 ? WIN.x0 - 120 : WIN.x1 + 120, d: 0, col: pick(['#3a6ac8', '#e8e4dc', '#c8302a', '#4a4a4a', '#e8a838', '#5a8ab8']), truck: Math.random() < 0.15 }); const c0 = cars[cars.length - 1]; c0.d = c0.x < WIN.x0 ? 1 : -1; nextPass = rand(5, 12) * (per() === 4 ? 2 : 1); }
    for (const c0 of cars) c0.x += c0.d * dt * (c0.truck ? 60 : 85); cars = cars.filter((c0) => c0.x > WIN.x0 - 160 && c0.x < WIN.x1 + 160);
    fryer.t += dt; fryer.bub = fryer.basket === 'down' ? 1 : Math.max(0.15, fryer.bub - dt);
    for (const q of grill.p) q.cook = Math.min(1, q.cook + dt * 0.05);
    grill.smoke = grill.p.length ? 1 : Math.max(0, grill.smoke - dt);
    beep = Math.max(0, beep - dt * 1.2); binFlap = Math.max(0, binFlap - dt * 2);
    if (balloon) { balloon.t += dt; balloon.y -= dt * 70; balloon.x += Math.sin(balloon.t * 2) * dt * 10; if (balloon.y <= 52) { ceilBalloon = { x: balloon.x, col: balloon.col }; balloon = null; } }
    nextShake -= dt; if (nextShake <= 0 && !shakeDown && per() !== 4) { shakeDown = 1; nextShake = rand(90, 150); K.say(mia, pick(['Shake machine’s down!', 'Uh-oh, the shake machine…']), 1.4); }
    if (table.party && table.party.stage === 'eating' && !table.tray) table.party.stage = 'ordered';
    if (table.party && table.party.stage === 'eating') { table.party.eatT = (table.party.eatT || 0) + dt; if (table.party.eatT > 55) table.party.stage = 'leave'; }
    if (trays > 4 && Math.random() < dt * 0.02) trays = 2;
    sign = 1; doorSign = lobbyOpen() ? 0 : 1;
    if (!lobbyOpen() && ceilBalloon && H24() > 22.5) ceilBalloon = null;
  }
  function onClear(Kk, big) {
    for (const g of guests()) if (g.state === 'seated' && (!g.act || g.act.name === 'idle' || g.act.name === 'phone')) { if (big || Math.random() < 0.4) K.say(g, pick(['Nice!', 'icon:star', 'Woo!', 'icon:laugh']), 1.1); }
    K.say(jay, big ? pick(['Order up!', 'icon:star']) : pick(['Ding!', 'icon:note']), 1.1); if (big) { beep = 1; K.say(mia, 'icon:star', 1); }
  }
  function build(Kk) { K = Kk; mkStaff(); chute = 1; fries = 2; nextArrive = 0.5; nextCar = 3; for (let i = 0; i < 2; i++) cars.push({ x: WIN.x0 + 80 + i * 240, d: i ? -1 : 1, col: i ? '#3a6ac8' : '#e8e4dc', truck: false }); }
  /* ---------- drawing ---------- */
  function car3(c, x, y, s, col, d = 1, lights = 0) { // small side-view car for the road
    c.save(); c.translate(x, y); c.scale(s * d, s); c.fillStyle = L(col); roundRect(c, -34, -16, 68, 14, 5); c.fill(); K.poly(c, [-20, -16, -12, -28, 14, -28, 22, -16]); c.fill(); c.fillStyle = 'rgba(200,225,245,0.85)'; K.poly(c, [-16, -16, -10, -25, 0, -25, 0, -16]); c.fill(); K.poly(c, [3, -16, 3, -25, 12, -25, 18, -16]); c.fill(); c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(-20, -2, 6, 0, TAU); c.arc(20, -2, 6, 0, TAU); c.fill(); c.restore(); if (lights) { K.glow(c, x + d * 34 * s, y - 9 * s, 30 * s, '#fff2c0', 0.7); c.fillStyle = 'rgba(255,240,190,0.18)'; K.poly(c, [x + d * 34 * s, y - 10 * s, x + d * 140 * s, y - 20 * s, x + d * 140 * s, y + 4 * s]); c.fill(); K.glow(c, x - d * 34 * s, y - 9 * s, 14 * s, '#ff3020', 0.6); } }
  function drawWindow(c, t) {
    const P = K.P, { x0, y0, x1, y1 } = WIN;
    c.fillStyle = P.red; c.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
    K.sky(c, x0, y0, x1, y0 + 200, { sunR: 20 });
    const hz = y0 + 200; c.fillStyle = P.out1; for (let i = 0; i < 7; i++) { const bx = x0 + i * 64 - 10, bh = 30 + ((i * 37) % 50); c.fillRect(bx, hz - bh, 54, bh); if (P.night > 0.3) { c.fillStyle = P.lamp; for (let k = 0; k < 3; k++) if ((i + k) % 2) c.fillRect(bx + 8 + k * 14, hz - bh + 10, 6, 6); c.fillStyle = P.out1; } }
    c.fillStyle = P.outGrass; c.fillRect(x0, hz, x1 - x0, 16);
    c.fillStyle = P.outRoad; c.fillRect(x0, hz + 16, x1 - x0, 50); c.fillStyle = P.outLine; for (let i = 0; i < 12; i++) c.fillRect(x0 + ((i * 60 - t * 0) % 720), hz + 40, 30, 3);
    if (cool('rain')) { c.fillStyle = 'rgba(200,220,255,0.12)'; c.fillRect(x0, hz + 16, x1 - x0, 50); }
    const lights = P.night > 0.3 || cool('rain');
    for (const c0 of cars) if (c0.d < 0) car3(c, c0.x, hz + 34, c0.truck ? 1.3 : 1, c0.col, -1, lights);
    for (const c0 of cars) if (c0.d > 0) car3(c, c0.x, hz + 60, c0.truck ? 1.3 : 1, c0.col, 1, lights);
    c.fillStyle = P.outLot; c.fillRect(x0, hz + 66, x1 - x0, y1 - hz - 66); c.fillStyle = P.outLine; for (let i = 0; i < 6; i++) c.fillRect(x0 + 30 + i * 70, hz + 76, 3, 60);
    car3(c, x0 + 66, hz + 126, 1.1, '#5a8ab8', 1, 0); car3(c, x0 + 276, hz + 126, 1.1, '#e8e4dc', -1, 0);
    if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.9)'; for (const px of [x0 + 66, x0 + 276]) { ellipse(c, px, hz + 126 - 31, 18, 3); c.fill(); } }
    // pole sign (generic burger emblem) + lot lamp
    const px = x1 - 80; c.fillStyle = L('#8a9098'); c.fillRect(px - 4, y0 + 40, 8, y1 - y0); const lit = P.night > 0.2; if (lit) K.glow(c, px, y0 + 70, 90, P.signLit, 0.4 * P.night + 0.15);
    c.fillStyle = P.red; roundRect(c, px - 46, y0 + 30, 92, 70, 10); c.fill(); c.fillStyle = lit ? '#ffe680' : P.yel; c.beginPath(); c.arc(px, y0 + 62, 20, Math.PI, TAU); c.fill(); c.fillRect(px - 20, y0 + 64, 40, 5); c.fillStyle = lit ? '#ffb070' : '#7a3a1a'; c.fillRect(px - 21, y0 + 70, 42, 6); c.fillStyle = lit ? '#ffe680' : P.yel; roundRect(c, px - 20, y0 + 78, 40, 8, 4); c.fill(); c.fillStyle = '#fff'; c.font = '900 10px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(lobbyOpen() ? 'OPEN' : '24H DRIVE', px, y0 + 94);
    const lx = x0 + 160; c.fillStyle = L('#6a7076'); c.fillRect(lx - 2, hz + 20, 4, 130); c.fillRect(lx - 2, hz + 20, 22, 3); if (P.night > 0.2) { K.glow(c, lx + 20, hz + 24, 60, '#fff0c0', 0.5 * P.night); c.fillStyle = 'rgba(255,240,200,0.12)'; K.poly(c, [lx + 14, hz + 24, lx + 26, hz + 24, lx + 60, y1, lx - 20, y1]); c.fill(); }
    K.weather(c, x0, y0, x1, y1);
    c.restore();
    c.fillStyle = 'rgba(255,255,255,0.18)'; K.poly(c, [x0 + 40, y0, x0 + 110, y0, x0 + 20, y1, x0 - 50 + 40, y1]); c.fill();
    c.fillStyle = P.redDk; c.fillRect((x0 + x1) / 2 - 4, y0, 8, y1 - y0); c.fillStyle = P.steel; c.fillRect(x0 - 18, y1 + 8, x1 - x0 + 36, 8);
  }
  function drawMenu(c, x, y, w, h, title, rows) {
    const P = K.P; c.fillStyle = P.ink; roundRect(c, x - 3, y - 3, w + 6, h + 6, 5); c.fill(); c.fillStyle = P.board; c.fillRect(x, y, w, h);
    c.fillStyle = rgba(P.boardLit, 0.06 + P.night * 0.05); c.fillRect(x, y, w, h);
    c.fillStyle = P.yel; c.font = '800 13px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(title, x + 9, y + 15);
    c.fillStyle = rgba(P.yel, 0.5); c.fillRect(x + 9, y + 25, w - 18, 1.5);
    c.font = '600 11px "Helvetica Neue", Arial, sans-serif';
    rows.forEach(([n, p, off], i) => { const yy = y + 42 + i * 21; c.fillStyle = off ? 'rgba(255,240,220,0.3)' : P.boardLit; c.textAlign = 'left'; c.fillText(n, x + 9, yy); c.textAlign = 'right'; c.fillText(off ? 'SORRY' : p, x + w - 9, yy); if (off) { c.fillStyle = 'rgba(255,90,70,0.75)'; c.fillRect(x + 8, yy, w - 16, 1.4); } });
  }
  function drawKitchen(c, t) {
    const P = K.P, bf = breakfast();
    // backsplash: brushed steel panels + tile band
    c.fillStyle = P.steel2; c.fillRect(-60, 222, 352, 300); c.fillStyle = P.steel; for (let i = 0; i < 6; i++) c.fillRect(-60 + i * 59, 226, 55, 292);
    c.fillStyle = 'rgba(255,255,255,0.12)'; for (let i = 0; i < 6; i++) c.fillRect(-56 + i * 59, 226, 6, 292);
    c.fillStyle = P.steelDk; c.fillRect(-60, 218, 352, 6);
    drawMenu(c, 28, 64, 126, 140, bf ? 'BREAKFAST' : 'BURGERS', bf ? [['Egg muffin', '3.29'], ['Hash brown', '1.49'], ['Hotcakes', '3.99'], ['Coffee', '1.19']] : [['Cheeseburger', '2.49'], ['Double', '3.99'], ['Chicken', '3.59'], ['Fish', '3.79']]);
    drawMenu(c, 162, 64, 126, 140, bf ? 'MORNING' : 'SIDES & SIPS', bf ? [['Muffin meal', '5.49'], ['Big tray', '6.29'], ['Orange juice', '1.79'], ['Milk', '0.99']] : [['Fries', '1.89'], ['Cola', '1.29'], ['Shake', '2.79', shakeDown > 0], ['Kids meal', '3.49']]);
    if (P.night > 0.2) K.glow(c, 157, 134, 160, P.boardLit, 0.08 * P.night);
    // drive-thru window (car outside, slider pane)
    const { x0, x1, y0, y1 } = DT;
    c.fillStyle = P.redDk; c.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
    K.sky(c, x0, y0, x1, y0 + 90, { sunR: 0 }); c.fillStyle = P.out1; c.fillRect(x0, y0 + 70, x1 - x0, 24); c.fillStyle = P.outLot; c.fillRect(x0, y0 + 94, x1 - x0, y1 - y0);
    if (car) { const cx = x0 + 40 + car.x * 0.75, cy = y1 + 14, s = 1.9, lights = P.night > 0.3 || cool('rain');
      c.save(); c.translate(cx, cy); c.scale(-s, s); c.fillStyle = L(car.col); roundRect(c, -40, -26, 80, 24, 6); c.fill(); K.poly(c, [-24, -26, -14, -44, 18, -44, 28, -26]); c.fill();
      c.fillStyle = 'rgba(40,50,60,0.85)'; K.poly(c, [-18, -27, -11, -41, 2, -41, 2, -27]); c.fill(); c.fillStyle = L(car.driver === 'skin2' ? '#a8704a' : '#e0aa86'); c.beginPath(); c.arc(-6, -34, 5.5, 0, TAU); c.fill();
      if (car.arm) { c.strokeStyle = L(car.driver === 'skin2' ? '#a8704a' : '#e0aa86'); c.lineWidth = 3.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(-6, -28); c.lineTo(-24 - (car.arm === 1 ? 8 : 4), -30); c.stroke(); }
      c.restore(); if (lights) K.glow(c, cx + 76 * (car.state === 'leave' ? 1 : 1), cy - 26, 30, '#fff2c0', 0.6); }
    K.weather(c, x0, y0, x1, y1); c.restore();
    c.fillStyle = 'rgba(255,255,255,0.16)'; K.poly(c, [x0 + 10, y0, x0 + 34, y0, x0 + 4, y1, x0 - 20 + 10, y1]); c.fill();
    const open = car && car.arm ? 1 : 0; c.fillStyle = rgba('#dfe8f0', 0.25); c.fillRect(x0 + (open ? 60 : 4), y0 + 4, 40, y1 - y0 - 8); c.fillStyle = P.steelDk; c.fillRect(x0 - 10, y1 + 6, x1 - x0 + 20, 6);
    // hood over grill + fryer
    c.fillStyle = P.steelDk; K.poly(c, [FRYER - 22, 300, GRILL.x1 + 8, 300, GRILL.x1 + 16, 340, FRYER - 30, 340]); c.fill(); c.fillStyle = P.steel; c.fillRect(FRYER - 30, 336, GRILL.x1 - FRYER + 46, 6); c.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 5; i++) c.fillRect(FRYER - 14 + i * 20, 308, 12, 3);
    // shake machine over the fountain
    { const x = SHAKE; c.fillStyle = P.steel; roundRect(c, x - 20, 334, 40, 62, 4); c.fill(); c.fillStyle = P.steelDk; c.fillRect(x - 14, 344, 28, 14); c.fillStyle = shakeDown ? (Math.sin(t * 8) > 0 ? '#ff4a3a' : '#5a1a14') : '#5ad06a'; c.beginPath(); c.arc(x + 12, 386, 2.6, 0, TAU); c.fill(); c.fillStyle = P.steel2; c.fillRect(x - 3, 396, 6, 6); }
    // cup tube + fountain
    c.fillStyle = 'rgba(220,230,240,0.5)'; c.fillRect(FOUNT - 37, 396, 14, 34); for (let i = 0; i < Math.min(6, cupStack); i++) { c.fillStyle = i % 2 ? '#f4f0e8' : '#e8e2d6'; c.fillRect(FOUNT - 36, 426 - i * 5, 12, 4); }
    { const x = FOUNT; c.fillStyle = P.steel2; roundRect(c, x - 18, 408, 40, 46, 3); c.fill(); c.fillStyle = P.red; c.fillRect(x - 14, 414, 32, 12); c.fillStyle = P.steelDk; for (let i = 0; i < 3; i++) c.fillRect(x - 12 + i * 11, 454, 6, 6); c.fillStyle = P.steelDk; c.fillRect(x - 20, 500, 44, 6); c.fillStyle = P.steel; c.fillRect(x - 20, 498, 44, 3);
      if (cup && cup.at === 'fount') { if (cup.lv < 0.98) { c.fillStyle = cup.bf ? 'rgba(90,50,30,0.8)' : 'rgba(70,25,15,0.8)'; c.fillRect(x - 7, 460, 2, 18); } drinkCup(c, x - 6, 480, 1.1, 0, 0, cup.lv); } }
    // heat-lamp chute with wrapped burgers, fries station below
    { const x = CHUTE; c.fillStyle = P.steelDk; c.fillRect(x - 18, 420, 40, 6); K.glow(c, x + 2, 444, 34, '#ffb060', 0.35); c.fillStyle = P.steel; K.poly(c, [x - 18, 462, x + 22, 466, x + 22, 470, x - 18, 466]); c.fill();
      for (let i = 0; i < Math.min(4, chute); i++) burgerW(c, x - 10 + i * 9, 463 + i * 0.6, 0.8, 0); }
    { const x = FRYST; c.fillStyle = P.steelDk; c.fillRect(x - 18, 494, 36, 26); c.fillStyle = P.steel; c.fillRect(x - 20, 492, 40, 4); c.fillStyle = L('#f2c040'); const n = Math.min(9, fries * 2); for (let i = 0; i < n; i++) { c.save(); c.translate(x - 12 + (i * 7) % 24, 494); c.rotate((i % 3 - 1) * 0.5); c.fillRect(-1.2, -9 - (i % 4), 2.4, 10 + (i % 4)); c.restore(); } }
    // fryer vat
    { const x = FRYER; c.fillStyle = P.steel2; c.fillRect(x - 18, 488, 38, 32); c.fillStyle = L(P.oil); c.fillRect(x - 14, 490, 30, 6);
      if (fryer.bub > 0.2) { c.fillStyle = 'rgba(255,240,190,0.85)'; for (let i = 0; i < 5; i++) { const bx = x - 12 + ((i * 7 + t * 40) % 26); c.beginPath(); c.arc(bx, 490 + Math.sin(t * 9 + i) * 1.2, 1.2 + fryer.bub * 0.8, 0, TAU); c.fill(); } }
      const beepOn = beep > 0 && Math.sin(t * 20) > 0; c.fillStyle = beepOn ? '#ff4a3a' : '#5a2a22'; c.fillRect(x - 8, 506, 6, 4);
      if (fryer.basket === 'up') { c.strokeStyle = P.steelDk; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 6, 446); c.lineTo(x - 6, 458); c.stroke(); c.fillStyle = P.steel2; c.fillRect(x - 16, 458, 22, 14); c.fillStyle = 'rgba(0,0,0,0.2)'; for (let i = 0; i < 4; i++) c.fillRect(x - 14 + i * 5, 460, 1.4, 10); }
      else if (fryer.basket === 'down') { c.strokeStyle = P.steelDk; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 2, 490); c.lineTo(x + 12, 478); c.stroke(); } }
    // flat-top grill + patties
    { const g0 = GRILL.x0, g1 = GRILL.x1; c.fillStyle = P.steelDk; c.fillRect(g0 - 4, 490, g1 - g0 + 8, 30); c.fillStyle = L('#3a3634'); c.fillRect(g0 - 2, 486, g1 - g0 + 4, 5);
      for (const q of grill.p) { const lift = Math.sin(q.ft * Math.PI) * 16, side = q.flip ? 1 : 0; const raw = '#b86a5a', done = '#5a2e18'; const col = side ? done : (q.cook > 0.5 ? '#7a3e26' : raw);
        if (q.egg) { c.fillStyle = L('#fbf6ec'); ellipse(c, q.x, 485 - lift, 10, 3); c.fill(); c.fillStyle = L('#f4b828'); ellipse(c, q.x, 484 - lift, 3.6, 2); c.fill(); }
        else { c.fillStyle = L(col); ellipse(c, q.x, 485 - lift, 10, 3.2); c.fill(); if (q.cheese) { c.fillStyle = L('#f8c830'); K.poly(c, [q.x - 8, 482, q.x + 8, 482, q.x + 6, 486, q.x - 6, 486]); c.fill(); } } }
      if (grill.smoke > 0.05) { c.fillStyle = rgba('#ffffff', 0.12 * grill.smoke); for (let i = 0; i < 3; i++) { const u = (t * 0.4 + i / 3) % 1; c.beginPath(); c.arc(g0 + 20 + i * 18 + Math.sin(t + i) * 4, 478 - u * 120, 8 + u * 14, 0, TAU); c.fill(); } } }
  }
  function drawCounter(c) {
    const P = K.P, x0 = CTR.x0 - 40, x1 = CTR.x1, top = CTR.top;
    c.fillStyle = P.steel; c.fillRect(x0, top, x1 - x0, 8); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(x0, top, x1 - x0, 1.5);
    c.fillStyle = P.redDk; c.fillRect(x0, top + 8, x1 - x0, 6);
    c.fillStyle = P.red; c.fillRect(x0, top + 14, x1 - x0, 642 - top - 14); c.fillStyle = 'rgba(0,0,0,0.12)'; for (let i = 0; i < 6; i++) c.fillRect(x0 + 8 + i * 58, top + 26, 2, 642 - top - 40);
    c.fillStyle = linear(c, 0, top + 14, 0, top + 60, [[0, 'rgba(0,0,0,0.28)'], [1, 'rgba(0,0,0,0)']]); c.fillRect(x0, top + 14, x1 - x0, 46);
    c.fillStyle = P.steelDk; c.fillRect(x0, 636, x1 - x0, 10); c.fillStyle = P.steel2; c.fillRect(x1 - 4, top, 6, 646 - top);
    // the assembly board + bag/tray on the counter
    c.fillStyle = L('#e8e0d0'); c.fillRect(232, top - 3, 36, 3);
    if (grill.board >= 1) { c.fillStyle = L('#d89a4a'); c.fillRect(241, top - 6, 18, 3); }
    if (grill.board >= 2) { c.fillStyle = L('#5a2e18'); c.fillRect(240, top - 9.5, 20, 3.5); }
    for (let i = 0; i < (grill.wrapped || 0); i++) burgerW(c, 252 + i * 12, top - 3, 0.8, 0);
    if (bag) { if (bag.tray) tray(c, BAG + 10, top, 0.9, { b: bag.items.b, f: bag.items.f ? 1 : 0, d: bag.items.d, fl: 1, dl: 1, kid: bag.o.T && bag.o.T.kid, bfast: bag.o.bfast });
      else { const s = 1.05; c.fillStyle = L('#c8a070'); K.poly(c, [BAG - 11 * s, top, BAG + 11 * s, top, BAG + 10 * s, top - 26 * s, BAG - 10 * s, top - 26 * s]); c.fill(); c.fillStyle = L('#a88050'); if (bag.closed) K.poly(c, [BAG - 10 * s, top - 26 * s, BAG + 10 * s, top - 26 * s, BAG + 8 * s, top - 31 * s, BAG - 8 * s, top - 31 * s]); else c.fillRect(BAG - 10 * s, top - 27 * s, 20 * s, 2); c.fill();
        if (!bag.closed && bag.items.f) friesBox(c, BAG + 2, top - 18, 0.8); if (bag.items.d && !bag.tray) drinkCup(c, BAG + 18, top, 0.9, 1, 1, 1); } }
    // napkins + straws by the drive-thru
    c.fillStyle = L('#f4f0e8'); c.fillRect(28, top - 10, 16, 10); c.fillStyle = P.steel2; c.fillRect(48, top - 22, 8, 22);
  }
  function drawLobbyWall(c, t) {
    const P = K.P;
    c.fillStyle = P.tile; c.fillRect(940, 470, 400, 180); c.fillStyle = P.tile2; for (let r = 0; r < 6; r++) c.fillRect(940, 470 + r * 30, 400, 1.5); for (let i = 0; i < 14; i++) c.fillRect(940 + i * 30, 470, 1.5, 180);
    c.fillStyle = P.redDk; c.fillRect(940, 462, 400, 8);
    // framed photo of a burger (flat) above the booth, poster-like, not readable text
    { const x = 1150, y = 190; c.fillStyle = P.ink; c.fillRect(x - 64, y - 54, 128, 108); c.fillStyle = L('#f6e2b8'); c.fillRect(x - 58, y - 48, 116, 96); c.fillStyle = L('#ffc72c'); c.beginPath(); c.arc(x, y + 6, 60, 0, TAU); c.save(); c.clip(); c.restore();
      c.fillStyle = L('#e8a040'); c.beginPath(); c.arc(x, y + 6, 34, Math.PI, TAU); c.fill(); c.fillStyle = L('#6ab84a'); c.fillRect(x - 36, y + 6, 72, 4); c.fillStyle = L('#f8c830'); c.fillRect(x - 33, y + 10, 66, 4); c.fillStyle = L('#5a2e18'); roundRect(c, x - 35, y + 14, 70, 10, 4); c.fill(); c.fillStyle = L('#d89a4a'); roundRect(c, x - 33, y + 25, 66, 10, 4); c.fill(); c.fillStyle = 'rgba(255,255,255,0.7)'; for (let i = 0; i < 5; i++) { c.beginPath(); ellipse(c, x - 20 + i * 10, y - 12 - (i % 2) * 6, 1.8, 1); c.fill(); } }
    // pendant lamps
    for (const x of [1040, 1158]) { c.strokeStyle = P.ink; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, 40); c.lineTo(x, 318); c.stroke(); c.fillStyle = P.red; K.poly(c, [x - 16, 334, x + 16, 334, x + 8, 316, x - 8, 316]); c.fill(); c.fillStyle = P.lamp; ellipse(c, x, 334, 14, 3); c.fill(); K.glow(c, x, 360, 120, P.glow, P.glowA + 0.05); }
  }
  function drawKiosk(c, t) {
    const P = K.P, x = KIOSK; c.fillStyle = P.steelDk; c.fillRect(x - 6, 520, 12, 184); c.fillStyle = P.steel2; ellipse(c, x, 704, 22, 4); c.fill();
    c.fillStyle = P.dark; roundRect(c, x - 24, 396, 48, 120, 6); c.fill(); const lit = lobbyOpen();
    c.fillStyle = lit ? L('#f6f2ea') : '#20242a'; c.fillRect(x - 19, 402, 38, 62);
    if (lit) { c.fillStyle = P.red; c.fillRect(x - 19, 402, 38, 9); const sel = kioskT;
      for (let i = 0; i < 6; i++) { const cx = x - 17 + (i % 2) * 18, cy = 414 + Math.floor(i / 2) * 16; c.fillStyle = sel && (i === sel || i === sel + 2) ? L('#ffc72c') : L('#e4dccc'); c.fillRect(cx, cy, 16, 14); c.fillStyle = L(['#d89a4a', '#f2c040', '#d8281e', '#8a5a3a', '#f4ecd8', '#6ab84a'][i]); c.beginPath(); c.arc(cx + 8, cy + 8, 3.6, 0, TAU); c.fill(); }
      K.glow(c, x, 432, 50, '#eaf2ff', 0.12); }
    else { c.fillStyle = '#c8d0d8'; c.font = '700 8px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DRIVE-THRU', x, 426); c.fillText('ONLY', x, 438); }
    c.fillStyle = '#111'; c.fillRect(x - 10, 472, 20, 3); if (receipt) { c.fillStyle = L('#fbfaf6'); c.fillRect(x - 6, 475, 12, 10 + Math.sin(t * 6) * 2); }
  }
  function drawBooth(c, back) {
    const P = K.P;
    if (back) { for (const st of TB.seats) { const bx = st.x - st.f * 32; c.fillStyle = P.redDk; roundRect(c, bx - 10, 520, 20, 186, 6); c.fill(); c.fillStyle = P.booth; roundRect(c, bx - 8, 524, 16, 80, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,0.14)'; c.fillRect(bx - st.f * 4 - 1, 530, 2, 66);
      c.fillStyle = P.booth; roundRect(c, st.x - 30, 600, 60, 14, 5); c.fill(); c.fillStyle = P.redDk; c.fillRect(st.x - 28, 614, 56, 90); } return; }
    const x = TB.x, y = TB.top; c.fillStyle = P.steelDk; c.fillRect(x - 4, y + 6, 8, 698 - y); ellipse(c, x, 700, 20, 4); c.fill();
    c.fillStyle = L('#ece4d4'); roundRect(c, x - 52, y - 2, 104, 9, 3); c.fill(); c.fillStyle = 'rgba(0,0,0,0.16)'; c.fillRect(x - 50, y + 7, 100, 2);
    if (table.tent) { c.fillStyle = L('#ffc72c'); K.poly(c, [TB.x - 38, y - 1, TB.x - 22, y - 1, TB.x - 30, y - 18]); c.fill(); c.fillStyle = P.ink; c.font = '800 7px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(table.tent % 100), TB.x - 30, y - 6); }
    if (table.tray) tray(c, x + 10, y - 1, 0.95, Object.assign({}, table.tray, { d: table.tray.held ? 0 : table.tray.d }));
    if (table.toy) H.toy().draw(c, table.toy.x, y - 4, 0.9);
  }
  function drawBin(c) {
    const P = K.P, x = BIN; c.fillStyle = L('#8a5a3a'); c.fillRect(x - 28, 506, 56, 198); c.fillStyle = L('#6e4630'); c.fillRect(x - 28, 506, 56, 6);
    c.save(); c.translate(x - 18, 520); c.fillStyle = P.dark; c.fillRect(0, 0, 36, 14); c.fillStyle = L('#a8704a'); c.rotate(-binFlap * 0.6); c.fillRect(0, 0, 36, 14); c.restore();
    c.fillStyle = P.yel; c.font = '700 8px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('THANK YOU', x, 552);
    for (let i = 0; i < trays; i++) { c.fillStyle = L(i % 2 ? '#b8241a' : '#c8281e'); c.fillRect(x - 26, 503 - i * 3, 52, 3); }
  }
  function drawBalloon(c, x, y, col, sx, sy) {
    if (sx != null) { c.strokeStyle = 'rgba(40,40,40,0.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(x + 6, (y + sy) / 2, x, y + 16); c.stroke(); }
    c.fillStyle = L(col); c.beginPath(); c.ellipse(x, y, 12, 15, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(x - 4, y - 5, 3, 5, -0.4, 0, TAU); c.fill(); c.fillStyle = L(col); K.poly(c, [x - 2, y + 16, x + 2, y + 16, x, y + 13]); c.fill();
  }
  function draw(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660); c.fillStyle = P.wall2; c.fillRect(-60, 0, 1400, 44); c.fillStyle = P.lamp; for (let i = 0; i < 9; i++) c.fillRect(-20 + i * 160, 18, 70, 8);
    drawKitchen(c, t); drawWindow(c, t); drawLobbyWall(c, t);
    if (P.shaftA > 0.01 && K.weatherNow === 'clear') { c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = rgba(P.shaft, P.shaftA * 0.5); K.poly(c, [WIN.x0, WIN.y1, WIN.x1, WIN.y1, WIN.x1 + 160, 700, WIN.x0 + 160, 700]); c.fill(); c.restore(); }
    // lobby floor (checker) + counter
    c.fillStyle = P.floor; c.fillRect(-60, 642, 1400, 120 + K.extraB); c.fillStyle = P.floor2; for (let r = 0; r < 4; r++) for (let i = 0; i < 30; i++) if ((r + i) % 2) c.fillRect(-60 + i * 48, 642 + r * 26, 48, 26);
    c.fillStyle = 'rgba(30,15,10,0.18)'; c.fillRect(-60, 642, 1400, 6);
    for (const a of [mia, jay]) { c.fillStyle = 'rgba(30,30,40,0.06)'; ellipse(c, a.hx - 18, a.hy - 50, 30, 80); c.fill(); }
    for (const a of [mia, jay]) { K.drawBody(c, a, false); if (!a.farFront) K.drawArms(c, a); }
    drawCounter(c);
    for (const a of [mia, jay]) if (a.farFront) K.drawArms(c, a);
    drawKiosk(c, t); drawBooth(c, true); drawBin(c);
    if (ceilBalloon) drawBalloon(c, ceilBalloon.x, 62, ceilBalloon.col);
    const gs = guests(), sit = gs.filter((q) => q.state !== 'stand');
    for (const a of sit) K.drawBody(c, a, false); drawBooth(c, false); for (const a of sit) { K.drawArms(c, a); c.globalAlpha = 1; }
    for (const a of gs.filter((q) => q.state === 'stand').sort((p, q) => p.floorY - q.floorY)) { if ((a.alpha ?? 1) > 0.05) { c.fillStyle = `rgba(40,20,10,${0.16 * (a.alpha ?? 1)})`; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    for (const a of gs) if (a.balloon && (a.alpha ?? 1) > 0.3) { const hx = a.hN ? a.hN.x : a.hx, hy = a.hN ? a.hN.y : a.hy - 60; drawBalloon(c, hx + 8, Math.max(80, hy - 110), a.balloon.col, hx, hy); }
    if (balloon) drawBalloon(c, balloon.x, balloon.y, balloon.col);
    if (P.night > 0.3) for (const x of [157, 1150]) K.glow(c, x, 560, 240, P.glow, 0.06 * P.night);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
    if (car && car.say && K.simT - car.say.t < 2.4) { const txt = car.say.txt; c.font = '600 12px "Helvetica Neue", Arial, sans-serif'; const w = c.measureText(txt).width + 16, bx = 26, by = 254; c.fillStyle = P.bubble; roundRect(c, bx, by, w, 24, 10); c.fill(); K.poly(c, [bx + 26, by + 24, bx + 38, by + 24, bx + 24, by + 34]); c.fill(); c.fillStyle = P.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(txt, bx + 8, by + 12); }
  }
  function onGone(Kk, a) { if (a.seat) { a.seat.occ = null; a.seat = null; } if (a.party && a.party.members.every((m) => m === a || !K.actors.includes(m))) { if (table.party === a.party) { table.party = null; table.tent = 0; } } }
  return GeoKit.stage({ id: 'fastfood', pal: FFPal, startHour: 7, span: 16, build, sim, draw, onClear, onGone, grain: 0.09, font: '700 14px "Helvetica Neue", Arial, sans-serif', vign: 'rgba(30,14,8,0.28)', zone: 'rgba(250,240,224,0.34)',
    debug: () => ({ orders: orders.map((o) => o.kind + o.num + ':' + o.state).join(' '), chute, fries, fryer: fryer.basket, car: car ? car.state + '@' + Math.round(car.x) : '-', table: table.party ? table.party.members.map((m) => m.type + ':' + m.phase).join('+') + '/' + table.party.stage : '-', shake: shakeDown }) });
}
registerStage('fastfood', makeGeoFastfoodStage);
