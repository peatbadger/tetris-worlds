/* ================= World 7 · Trattoria — GEOMETRIC edition (Neapolitan pizzeria, flat planes) =================
   Left: a tiled wood-fired dome oven (fire breathes, flares when a pizza goes in) and Salvatore's marble bench: he takes a
   dough ball, presses it out, TOSSES it spinning overhead, ladles a sauce spiral, tears mozzarella, lays basil, slides it on
   the peel, bakes it (turns it once), pulls it out blistered, rocks the cutter through it. Centre: a calm arched window on a
   Naples alley (ochre houses, laundry line, Vesuvius; string lights at night). Right: one checkered table with a Chianti
   fiasco candle; Luca brings menus, pours, carries the pizza high, guests pull slices (cheese stretches), tiramisu, bill.
   Signature: the dough toss (and the rare flop onto his head, flour puff). Surprises: a birthday tiramisu sung by all;
   an accordionist at night; a three-wheeler Ape putters past the window. Clock 12:00 pranzo -> chiusura. */
const PizPal = GeoKit.palette({
  noon: { wall: '#f0dcb4', wall2: '#e4c898', tile: '#2a6a9a', tile2: '#f4f0e4', brick: '#b8583a', brick2: '#9a4430', wood: '#6a4228', woodDk: '#40281a', marble: '#f2f0ea', marble2: '#d8d4cc', check: '#d8342a', cloth: '#fbf8f0', floor: '#c86a44', floor2: '#b05a38',
    sky0: '#78b8ec', sky1: '#e4f0f8', out1: '#f0b860', out2: '#e88a5a', out3: '#f4d8a0', outSh: '#4a8a6a', outWin: '#3a3040', roof: '#c86a44', vesu: '#8aa0b8', lamp: '#ffe2a8', glow: '#ffd890', glowA: 0.08, fire: '#ff8a2a', candle: '#ffb860', shaft: '#ffffff', shaftA: 0.14, amb: '#ffffff', ambK: 0, sun: '#fffbe8', lit: '#ffd070',
    skin: '#e8b08a', bubble: '#ffffff', ink: '#221a16', navy: '#26344e', coral: '#d8584a', mustard: '#d8a83a', teal: '#2a7a80', cream: '#f2e8d8', olive: '#6a7240', plum: '#6a3a5a', grey: '#9a9a9a', brown: '#5e4030', white: '#fcfaf6', dark: '#1e1a18', hairGrey: '#d8d4d0', red: '#c8302a', green: '#3a8a3a' },
  after: { wall: '#f2d8aa', wall2: '#e4c08c', tile: '#2a6494', tile2: '#f4ece0', brick: '#b45436', brick2: '#94402c', wood: '#6a4228', woodDk: '#40281a', marble: '#f4efe6', marble2: '#dad2c4', check: '#d4322a', cloth: '#fbf6ec', floor: '#c4663f', floor2: '#ac5634',
    sky0: '#86bce6', sky1: '#f2e2c8', out1: '#f4b058', out2: '#ec8452', out3: '#f6d498', outSh: '#4a8468', outWin: '#3a3040', roof: '#c4643e', vesu: '#94a0b4', lamp: '#ffe0a0', glow: '#ffd080', glowA: 0.1, fire: '#ff8a2a', candle: '#ffb860', shaft: '#fff4dc', shaftA: 0.2, amb: '#fff8f0', ambK: 0, sun: '#fff0d0', lit: '#ffd070',
    skin: '#e8ac86', bubble: '#fffcf6', ink: '#221a16', navy: '#26344e', coral: '#d8584a', mustard: '#d8a83a', teal: '#2a7a80', cream: '#f2e6d4', olive: '#6a7240', plum: '#6a3a5a', grey: '#9a9a9a', brown: '#5e4030', white: '#fcf8f2', dark: '#1e1a18', hairGrey: '#d8d2cc', red: '#c8302a', green: '#3a8a3a' },
  dusk: { wall: '#e8b888', wall2: '#d49c70', tile: '#24527e', tile2: '#ecdcc8', brick: '#a2462c', brick2: '#843422', wood: '#5a3420', woodDk: '#341e10', marble: '#f0e0d0', marble2: '#d4bca8', check: '#c42c26', cloth: '#f6e8d8', floor: '#ac5434', floor2: '#944428',
    sky0: '#5a5aa0', sky1: '#ff9a62', out1: '#e48a5a', out2: '#c8604a', out3: '#e8a880', outSh: '#3a6a5a', outWin: '#ffc070', roof: '#a84a34', vesu: '#6a5a8a', lamp: '#ffc070', glow: '#ffa850', glowA: 0.32, fire: '#ff7a1a', candle: '#ffa848', shaft: '#ffb070', shaftA: 0.24, amb: '#ffd0a8', ambK: 0.06, sun: '#ffc080', lit: '#ffc860',
    skin: '#dc9e78', bubble: '#fff4e6', ink: '#24181c', navy: '#22304a', coral: '#cc4c44', mustard: '#d09830', teal: '#26707a', cream: '#ecd8c0', olive: '#5e6638', plum: '#643454', grey: '#8e8686', brown: '#563826', white: '#f6ecdc', dark: '#1a1418', hairGrey: '#ccc0b4', red: '#b82c26', green: '#347a34' },
  night: { wall: '#6a4a3a', wall2: '#5a3e30', tile: '#1a3a5a', tile2: '#b4a490', brick: '#7a3422', brick2: '#5e281a', wood: '#3e2416', woodDk: '#24140a', marble: '#c4b4a4', marble2: '#a08e7e', check: '#9a2420', cloth: '#d8c8b4', floor: '#6e3a24', floor2: '#5a2e1c',
    sky0: '#060c22', sky1: '#1c2450', out1: '#4a3a40', out2: '#3e2e36', out3: '#54444a', outSh: '#1e3430', outWin: '#2a2030', roof: '#3a2626', vesu: '#1a1e36', lamp: '#ffb860', glow: '#ff9a40', glowA: 0.5, fire: '#ff6a10', candle: '#ffa040', shaft: '#c0d8ff', shaftA: 0.0, amb: '#3a3048', ambK: 0.16, sun: '#f4ecd8', lit: '#ffb040',
    skin: '#c08868', bubble: '#f4ece4', ink: '#141418', navy: '#1a2640', coral: '#a84040', mustard: '#b08028', teal: '#1e5660', cream: '#d4c0aa', olive: '#464c2c', plum: '#4e2a44', grey: '#706c70', brown: '#463020', white: '#e4dad0', dark: '#121216', hairGrey: '#a8a0a0', red: '#9a2420', green: '#2a5a2a' },
  snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', roof: '#f4f6fa', out1: '#e8dcd0', out2: '#dcd0c8', out3: '#eee6dc', vesu: '#e8ecf4' },
}, [[6, 'night'], [9, 'noon'], [15, 'noon'], [17, 'after'], [19, 'dusk'], [21, 'night'], [30, 'night'], [33, 'noon']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Notte' : h < 15.5 ? 'Pranzo' : h < 18 ? 'Pomeriggio' : h < 20 ? 'Aperitivo' : h < 23 ? 'Cena' : 'Chiusura'; } });

function makeGeoPizzeriaStage() {
  const OVEN = { x: 104, mouthY: 452, top: 252, base: 478 }, BENCH = { x0: 150, x1: 456, top: 512 }, WORK = 318, READY = 420, TRAY = 200, SF = 606, SSC = 0.86, FL = 712, SC = 0.84;
  const TB = { x: 1128, top: 566, seats: [{ x: 1052, f: 1, occ: null }, { x: 1204, f: -1, occ: null }] };
  const WIN = { x0: 330, y0: 100, x1: 950, y1: 468 }, RACK = { x: 1000 }, LHOME = 972;
  const PIES = [{ n: 'Margherita', top: ['#fbf4e2'], basil: 1 }, { n: 'Diavola', top: ['#fbf4e2', '#a8201a'] }, { n: 'Marinara', top: [], basil: 0, garlic: 1 }, { n: 'Capricciosa', top: ['#fbf4e2', '#e8909a', '#3a2a2a'] }, { n: 'Quattro formaggi', top: ['#fbf4e2', '#f2d070', '#f8f0d8'] }];
  let K, sal, luca, pz = null, oven = { heat: 0.5, flare: 0, door: 0 }, orders = [], ready = null, flour = 0, dough = 6, table = { pie: null, glasses: [{ lv: 0 }, { lv: 0 }], candle: 0, menu: 0, dessert: null, folder: 0, stream: null, stretch: null }, ape = null, nextApe = 50, cat = null, nextCat = 30, busker = null, nextBusker = 30, nextArrive = 2, nextTake = 25, sign = 1;
  const L = (h) => K.L(h), B = GeoKit.body;
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 15.5 ? 0 : h < 18 ? 1 : h < 20 ? 2 : h < 23 ? 3 : 4; };
  const guests = () => K.actors.filter((a) => a.cust);
  const cool = (k) => K.weatherNow === k;
  const glassX = (i) => TB.x + (i ? 68 : -64);
  /* ---------- props ---------- */
  function pizza(c, x, y, s, p, flat = 1) { // p: {st, size, sauce, cheese, basil, baked, slices, eaten, kind}
    if (!p) return; c.save(); c.translate(x, y); c.scale(s, s * flat);
    const R = 30 * (p.size ?? 1);
    if (p.st === 'ball') { c.fillStyle = L('#f4e8d0'); ellipse(c, 0, -6, 12, 9); c.fill(); c.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(c, -3, -10, 5, 2.5); c.fill(); c.restore(); return; }
    const sweep = p.eaten ? (1 - p.eaten / 8) * TAU : TAU;
    const wedge = () => { c.beginPath(); if (sweep < TAU - 0.01) { c.moveTo(0, 0); c.arc(0, 0, R, -Math.PI / 2, -Math.PI / 2 + sweep); c.closePath(); } else c.arc(0, 0, R, 0, TAU); };
    if (sweep <= 0.01) { c.restore(); return; }
    c.save(); c.scale(1, 0.32); wedge(); c.fillStyle = L(p.baked ? '#e8a858' : '#f4e2c0'); c.fill(); c.save(); wedge(); c.clip();
    if (p.sauce > 0) { c.fillStyle = L(p.baked ? '#c8301c' : '#e0402a'); c.beginPath(); c.arc(0, 0, R * 0.84 * Math.min(1, p.sauce), 0, TAU); c.fill(); }
    if (p.kind) { const tp = p.kind.top; for (let i = 0; i < Math.round((p.cheese || 0) * 8); i++) { const a = i * 2.4, rr = R * (0.2 + (i * 37 % 10) / 16); c.fillStyle = L(tp[i % Math.max(1, tp.length)] || '#fbf4e2'); if (tp.length || p.kind.garlic) { c.beginPath(); c.arc(Math.cos(a) * rr, Math.sin(a) * rr, p.kind.garlic ? 2 : 5.5, 0, TAU); c.fill(); } } if (p.kind.basil && p.basil) for (let i = 0; i < 3; i++) { c.fillStyle = L('#2e8a2a'); const a = i * 2.1 + 0.5; ellipse(c, Math.cos(a) * R * 0.45, Math.sin(a) * R * 0.45, 6, 3.5, a); c.fill(); } }
    if (p.baked) { c.fillStyle = 'rgba(40,20,10,0.65)'; for (let i = 0; i < 9; i++) { const a = i * 0.7; c.beginPath(); c.arc(Math.cos(a) * R * 0.94, Math.sin(a) * R * 0.94, 2.4, 0, TAU); c.fill(); } }
    if (p.slices) { c.strokeStyle = 'rgba(80,40,20,0.55)'; c.lineWidth = 1.4; c.beginPath(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4; c.moveTo(Math.cos(a) * R, Math.sin(a) * R); c.lineTo(-Math.cos(a) * R, -Math.sin(a) * R); } c.stroke(); }
    c.restore(); c.strokeStyle = L(p.baked ? '#c88a40' : '#e8d4ac'); c.lineWidth = 4; wedge(); c.stroke(); c.restore(); c.restore();
  }
  function wineGlass(c, x, y, s, lv, tilt = 0) { c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s); c.fillStyle = 'rgba(230,245,250,0.3)'; K.poly(c, [-5, -18, 5, -18, 4, 0, -4, 0]); c.fill(); if (lv > 0.02) { const ty = lerp(-1, -16, lv); c.fillStyle = L('#8a1a2a'); c.fillRect(-4.5, ty, 9, -1 - ty); } c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-5, -18); c.lineTo(5, -18); c.stroke(); c.restore(); }
  function fiasco(c, x, y, s, lit, tilt = 0) { c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s); c.fillStyle = L('#c8a060'); ellipse(c, 0, -10, 13, 12); c.fill(); c.strokeStyle = L('#8a6a30'); c.lineWidth = 1; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 5, -21); c.lineTo(i * 5, 1); c.stroke(); } c.fillStyle = L('#2a5a2a'); ellipse(c, 0, -24, 7, 6); c.fill(); c.fillRect(-2.5, -40, 5, 16); if (lit !== null) { c.fillStyle = L('#f4ecd8'); c.fillRect(-3, -50, 6, 12); c.fillStyle = 'rgba(244,236,216,0.8)'; c.fillRect(-4, -42, 2, 8); c.fillRect(2, -44, 2, 6); if (lit) { const fl = 1 + Math.sin(K.t * 13) * 0.15; c.fillStyle = '#ffd070'; ellipse(c, 0, -54, 2.4, 4.4 * fl); c.fill(); } } c.restore(); }
  function tiramisu(c, x, y, s, frac, candle) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#fbfaf6'); ellipse(c, 0, 0, 16, 4); c.fill(); if (frac > 0.02) { const w = 11 * frac; c.fillStyle = L('#f2e2c0'); c.fillRect(-w, -12, w * 2, 10); c.fillStyle = L('#7a4a2a'); c.fillRect(-w, -8, w * 2, 2); c.fillStyle = L('#5a3420'); c.fillRect(-w, -13, w * 2, 2); } if (candle) { c.fillStyle = L('#f0a0c0'); c.fillRect(-1, -24, 2.4, 11); c.fillStyle = '#ffd070'; ellipse(c, 0.2, -27, 1.8, 3.2 + Math.sin(K.t * 14) * 0.5); c.fill(); } c.restore(); }
  const H = {
    ball: () => ({ draw(c, x, y, s) { pizza(c, x, y + 6 * s, s, { st: 'ball' }); } }),
    disc: (spin) => ({ draw(c, x, y, s) { c.save(); c.translate(x, y - 4 * s); c.fillStyle = L('#f4e2c0'); const w = 34 * s * (0.5 + 0.5 * Math.abs(Math.cos(spin ? K.t * 14 : 0))); ellipse(c, 0, 0, w, 6 * s); c.fill(); c.strokeStyle = L('#e8d4ac'); c.lineWidth = 2; c.stroke(); c.restore(); } }),
    ladle: () => ({ draw(c, x, y, s) { c.strokeStyle = L('#a8aeb4'); c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 2 * s, y + 18 * s); c.stroke(); c.fillStyle = L('#a8aeb4'); ellipse(c, x + 2 * s, y + 20 * s, 6 * s, 2.5 * s); c.fill(); c.fillStyle = L('#c8301c'); ellipse(c, x + 2 * s, y + 19 * s, 4.5 * s, 1.5 * s); c.fill(); } }),
    pinch: (col) => ({ draw(c, x, y, s) { c.fillStyle = L(col); c.beginPath(); c.arc(x, y + 2 * s, 3.6 * s, 0, TAU); c.fill(); } }),
    peel: (p) => ({ draw(c, x, y, s, a) { c.save(); c.translate(x, y); const d = a.f; c.fillStyle = L('#c89a5a'); c.fillRect(d > 0 ? 0 : -70 * s, -2 * s, 70 * s, 4 * s); c.fillStyle = L('#a8aeb4'); ellipse(c, d * 92 * s, 0, 26 * s, 6 * s); c.fill(); if (p) pizza(c, d * 92 * s, -1 * s, s * 0.82, p); c.restore(); } }),
    cutter: () => ({ draw(c, x, y, s) { c.fillStyle = L('#5a3a2a'); c.fillRect(x - 3 * s, y - 2 * s, 6 * s, 10 * s); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x, y + 12 * s, 7 * s, 0, TAU); c.fill(); } }),
    pie: (p) => ({ draw(c, x, y, s, a) { c.fillStyle = L('#a8aeb4'); ellipse(c, x + a.f * 6 * s, y - 4 * s, 34 * s, 7 * s); c.fill(); pizza(c, x + a.f * 6 * s, y - 6 * s, s * 1.05, p); } }),
    box: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f4ecd8'); c.fillRect(x - 22 * s, y - 6 * s, 44 * s, 10 * s); c.fillStyle = L('#c8302a'); c.fillRect(x - 10 * s, y - 4 * s, 20 * s, 2 * s); c.fillStyle = L('#3a8a3a'); c.fillRect(x - 10 * s, y - 1 * s, 20 * s, 2 * s); } }),
    slice: () => ({ draw(c, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(-a.f * 0.5); c.fillStyle = L('#e8a858'); K.poly(c, [0, 0, a.f * 30 * s, -8 * s, a.f * 30 * s, 8 * s]); c.fill(); c.fillStyle = L('#c8301c'); K.poly(c, [a.f * 4 * s, 0, a.f * 26 * s, -5 * s, a.f * 26 * s, 5 * s]); c.fill(); c.fillStyle = L('#fbf4e2'); c.beginPath(); c.arc(a.f * 18 * s, 0, 3.4 * s, 0, TAU); c.fill(); c.restore(); } }),
    fiasco: () => ({ draw(c, x, y, s, a) { fiasco(c, x, y + 12 * s, s * 0.9, null, a.potTilt ? -a.f * a.potTilt * 1.6 : 0); } }),
    glass: (i) => ({ draw(c, x, y, s, a) { wineGlass(c, x, y + 10 * s, s * 1.3, table.glasses[i].lv, -(a.cupTilt || 0) * a.f * 0.9); } }),
    menu: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#c8302a'); c.fillRect(x - 2 * s, y - 24 * s, a.f * 22 * s, 30 * s); c.fillStyle = L('#f4ecd8'); c.fillRect(x + a.f * 4 * s, y - 18 * s, a.f * 12 * s, 2 * s); } }),
    tira: (cd) => ({ draw(c, x, y, s) { tiramisu(c, x, y + 6 * s, s * 1.2, 1, cd); } }),
    card: () => ({ draw(c, x, y, s) { c.fillStyle = L('#2a1a14'); c.fillRect(x - 9 * s, y - 2 * s, 18 * s, 4 * s); } }),
    coin: () => ({ draw(c, x, y, s) { c.fillStyle = '#e8c050'; c.beginPath(); c.arc(x, y, 3 * s, 0, TAU); c.fill(); } }),
    lighter: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#5a3a2a'); c.fillRect(x, y - 1.5 * s, a.f * 22 * s, 2.5 * s); c.fillStyle = '#ffb040'; c.beginPath(); c.arc(x + a.f * 24 * s, y - 1 * s, 2 * s, 0, TAU); c.fill(); } }),
    rake: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#3a3a3a'); c.fillRect(a.f > 0 ? x : x - 80 * s, y - 1.5 * s, 80 * s, 3 * s); c.fillRect(x + a.f * 80 * s - 2, y - 8 * s, 4, 14 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    camera: () => ({ draw(c, x, y, s) { c.fillStyle = '#2a2a2a'; c.fillRect(x - 8 * s, y - 6 * s, 16 * s, 11 * s); c.fillStyle = '#8ab8d8'; c.beginPath(); c.arc(x, y, 3 * s, 0, TAU); c.fill(); } }),
  };
  /* ---------- Salvatore (pizzaiolo) ---------- */
  function mkStaff() {
    sal = K.mk(B({ T: 244, hw: 70, headR: 29, torso: 'round', pattern: 'chef', top: 'white', pants: 'dark', hat: 'chef', hatCol: 'white', hairStyle: 'short', hair: 'dark' }), { role: 'pizzaiolo', staff: 1, hx: 250, f: 1, floorY: SF, sc: SSC, faceDir: 0.5 });
    luca = K.mk(B({ T: 250, hw: 60, headR: 28, pattern: 'apron', top: 'dark', top2: 'white', shirt: 'white', pants: 'dark', hairStyle: 'short' }), { role: 'waiter', staff: 1, hx: LHOME, f: -1, floorY: SF + 4, sc: SSC * 0.96, faceDir: -0.5, speed: 1.15 });
    sal.think = salThink; luca.think = lucaThink;
  }
  const BT = BENCH.top;
  function salThink(a) {
    if (per() === 4 && !orders.length && !pz) {
      if (!oven.door) return K.start(a, 'close', [K.ph(0, (s) => { s.walkTo = 200; }, { until: (s) => !s.walking, max: 10 }), K.ph(2.4, (s, u, t) => { s.f = -1; s.hold.N = H.rake(); s.tgN = [s.hx - 30 + Math.sin(t * 4) * 16, OVEN.mouthY - 6]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } }), K.ph(0.8, (s) => { s.tgN = [OVEN.x + 30, OVEN.mouthY - 20]; s.tgF = [OVEN.x + 10, OVEN.mouthY - 20]; }, { exit: () => { oven.door = 1; K.fx('puff', OVEN.x, OVEN.mouthY - 30, { life: 1.2, col: '#888888' }); } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'wipe', [K.ph(0, (s) => { s.walkTo = 250; }, { until: (s) => !s.walking, max: 10 }), K.ph(rand(2, 3), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [WORK + Math.sin(t * 5) * 40, BT - 8]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; flour = Math.max(0, flour - 0.5); } })], { onAbort: (s) => { s.hold.N = null; } });
    }
    if (per() !== 4 && oven.door) oven.door = 0;
    if (orders.length && !pz && !ready) return makePizza(a, orders.shift());
    const r = Math.random();
    if (r < 0.3 && K.cooled(a, 'wood', 25)) return K.start(a, 'wood', [K.ph(0, (s) => { s.walkTo = 196; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.7, (s) => { s.f = -1; s.tgN = [OVEN.x + 30, 600]; s.tgF = [OVEN.x + 16, 602]; s.leanT = 0.35; }), K.ph(0.7, (s) => { s.tgN = [OVEN.x + 34, OVEN.mouthY - 8]; s.tgF = [OVEN.x + 24, OVEN.mouthY - 8]; s.leanT = 0.2; }, { exit: () => { oven.flare = 1; oven.heat = Math.min(1, oven.heat + 0.3); K.fx('spark', OVEN.x, OVEN.mouthY - 10, { life: 0.5, col: '#ffb040' }); } }), K.ph(0.4, (s) => { s.leanT = 0; })]);
    if (r < 0.55) return K.start(a, 'flour', [K.ph(0, (s) => { s.walkTo = 250; }, { until: (s) => !s.walking, max: 10 }), K.ph(1.6, (s, u, t) => { s.f = 1; s.tgN = [WORK + Math.sin(t * 7) * 30, BT - 8]; s.tgF = [WORK - 20 - Math.sin(t * 7) * 20, BT - 6]; s.leanT = 0.15; if (Math.random() < 0.05) K.fx('puff', WORK, BT - 10, { life: 0.8, col: '#ffffff' }); }, { exit: () => { flour = 1; } })]);
    return K.start(a, 'idle', [K.ph(0, (s) => { s.walkTo = 250; }, { until: (s) => !s.walking, max: 10 }), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 30, BT - 6]; s.tgF = [s.hx + 14, BT - 6]; s.lxT = pick([0.6, 0.2, -0.4]); })]);
  }
  function makePizza(a, ord) {
    const kind = ord.kind; pz = { st: 'ball', size: 0.4, sauce: 0, cheese: 0, basil: 0, baked: 0, kind, x: WORK, ord, hidden: 1 };
    const flop = Math.random() < 0.12;
    const ph = [K.ph(0, (s) => { s.walkTo = 250; }, { until: (s) => !s.walking, max: 10 }),
      K.ph(0.5, (s) => { s.f = 1; s.tgF = [TRAY, BT - 8]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { s.hold.F = H.ball(); dough = Math.max(0, dough - 1); } }),
      K.ph(0.5, (s) => { s.tgF = [WORK, BT - 8]; }, { exit: (s) => { s.hold.F = null; s.farFront = false; pz.hidden = 0; } }),
      K.ph(1.4, (s, u, t) => { const p = Math.abs(Math.sin(t * 9)); s.tgN = [WORK + 10, BT - 10 - p * 8]; s.tgF = [WORK - 10, BT - 10 - (1 - p) * 8]; s.leanT = 0.25; pz.st = 'disc'; pz.size = lerp(0.4, 0.75, u); }),
      K.ph(0.4, (s) => { s.tgN = [WORK - 4, BT - 14]; s.tgF = [WORK + 4, BT - 14]; }, { exit: (s) => { pz.hidden = 1; s.hold.N = H.disc(true); s.carryUp = true; } })];
    for (let i = 0; i < 2; i++) ph.push(K.ph(0.8, (s, u) => { const up = Math.sin(u * Math.PI); s.tgN = [s.hx + 34, s.R.cy - 10 - up * 22]; s.tgF = [s.hx + 18, s.R.cy - 10 - up * 22]; if (u > 0.2 && u < 0.8) { s.hold.N = null; s.flying = up; } else { s.hold.N = H.disc(true); s.flying = 0; } }, { exit: (s) => { s.flying = 0; } }));
    if (flop) ph.push(K.ph(1.0, (s) => { s.hold.N = null; s.flying = 0; s.flop = 1; s.tgN = [s.R.cx + 10, s.R.cy - 30]; s.tgF = [s.R.cx - 10, s.R.cy - 30]; }, { enter: (s) => { K.fx('puff', s.R.cx, s.R.cy - s.R.R, { life: 1.2, col: '#ffffff' }); K.say(a, 'Mamma mia!', 1.4); K.say(luca, 'icon:laugh', 1.4); for (const g of guests()) K.say(g, 'icon:laugh', 1.2); }, exit: (s) => { s.flop = 0; s.hold.N = H.disc(false); } }), K.ph(0.6, (s) => { s.tgN = [s.hx + 30, BT - 30]; s.tgF = [s.hx + 20, BT - 30]; }, { enter: () => K.say(a, 'Ancora!', 1) }));
    ph.push(K.ph(0.5, (s) => { s.carryUp = false; s.tgN = [WORK + 4, BT - 10]; s.tgF = [WORK - 4, BT - 10]; }, { exit: (s) => { s.hold.N = null; pz.hidden = 0; pz.size = 1; pz.st = 'base'; } }));
    ph.push(K.ph(1.6, (s, u, t) => { s.hold.N = H.ladle(); const rr = 22 * (1 - u); s.tgN = [WORK + Math.cos(t * 10) * rr, BT - 26 + Math.sin(t * 10) * rr * 0.3]; s.leanT = 0.2; pz.sauce = u; }, { exit: (s) => { s.hold.N = null; } }));
    ph.push(K.ph(1.6, (s, u, t) => { const k = Math.floor(t * 4) % 2; s.hold.N = k ? H.pinch(kind.top[0] || '#f4f0e0') : null; s.tgN = [k ? 412 : WORK + Math.sin(t * 13) * 18, BT - (k ? 14 : 12)]; s.tgF = [WORK - 30, BT - 6]; pz.cheese = u; }, { exit: (s) => { s.hold.N = null; } }));
    if (kind.basil) ph.push(K.ph(0.7, (s) => { s.hold.N = H.pinch('#2e8a2a'); s.tgN = [WORK + 6, BT - 16]; }, { exit: (s) => { s.hold.N = null; pz.basil = 1; } }));
    ph.push(K.ph(0.6, (s) => { s.tgN = [WORK - 10, BT - 6]; s.tgF = [WORK - 30, BT - 6]; s.leanT = 0.2; }, { exit: (s) => { pz.hidden = 1; s.f = -1; s.hold.N = H.peel(pz); } }));
    ph.push(K.ph(0, (s) => { s.walkTo = 236; }, { until: (s) => !s.walking, max: 10 }));
    ph.push(K.ph(0.8, (s, u) => { s.f = -1; s.tgN = [s.hx - 30 - u * 30, OVEN.mouthY + 2]; s.tgF = [s.hx - 10 - u * 20, OVEN.mouthY + 4]; s.leanT = 0.2 * u; }, { exit: (s) => { s.hold.N = H.peel(null); pz.st = 'oven'; oven.flare = 1; K.fx('spark', OVEN.x + 10, OVEN.mouthY - 12, { life: 0.5, col: '#ffb040' }); } }));
    ph.push(K.ph(1.6, (s) => { s.f = -1; s.tgN = [s.hx - 20, OVEN.mouthY + 4]; s.tgF = [s.hx - 4, OVEN.mouthY + 6]; s.leanT = 0.05; s.look = { x: () => OVEN.x, until: K.simT + 0.3 }; }, { exit: () => { pz.baked = 0.5; } }));
    ph.push(K.ph(0.8, (s, u, t) => { s.tgN = [s.hx - 50 + Math.sin(t * 8) * 6, OVEN.mouthY + 2]; s.leanT = 0.18; }, { enter: () => K.say(a, 'icon:clock', 0.8) }));
    ph.push(K.ph(1.4, (s) => { s.tgN = [s.hx - 20, OVEN.mouthY + 4]; s.leanT = 0.05; }, { exit: (s) => { pz.baked = 1; pz.st = 'out'; s.hold.N = H.peel(pz); } }));
    ph.push(K.ph(0, (s) => { s.walkTo = 300; }, { until: (s) => !s.walking, max: 10 }));
    ph.push(K.ph(0.6, (s) => { s.f = 1; s.hold.N = H.peel(pz); s.tgN = [READY - 92, BT - 6]; }, { exit: (s) => { s.hold.N = null; pz.st = 'ready'; pz.x = READY; pz.hidden = 0; ready = pz; } }));
    ph.push(K.ph(1.2, (s, u, t) => { s.hold.N = H.cutter(); s.tgN = [READY - 26 + Math.sin(t * 9) * 26, BT - 22]; s.leanT = 0.18; if (u > 0.5) ready.slices = 1; }, { exit: (s) => { s.hold.N = null; pz = null; ready.done = 1; K.say(a, ord.take ? 'Pronta! Da asporto!' : 'Pronta! Tavolo uno!', 1.3); } }));
    if (ord.take) ph.push(K.ph(1.0, (s) => { s.tgN = [READY - 8, BT - 10]; s.tgF = [READY - 20, BT - 10]; }, { exit: () => { if (ready) ready.boxed = 1; } }));
    ph.push(K.ph(0, (s) => { s.walkTo = 250; }, { until: (s) => !s.walking, max: 10 }));
    K.start(a, 'pizza', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.flying = 0; s.flop = 0; s.carryUp = false; s.farFront = false; const q = pz || ready; if (q) { Object.assign(q, { baked: 1, st: 'ready', hidden: 0, x: READY, size: 1, sauce: 1, cheese: 1, basil: 1, slices: 1, done: 1 }); if (ord.take) q.boxed = 1; ready = q; pz = null; } } });
  }
  /* ---------- Luca (waiter) ---------- */
  const atTable = (x = TB.x + 50) => K.ph(0, (s) => { s.walkTo = x; }, { until: (s) => !s.walking, max: 20 });
  const home = () => K.ph(0, (s) => { s.walkTo = LHOME; }, { until: (s) => !s.walking, max: 20 });
  function lucaThink(a) {
    const p = table.party, h = ((K.hour % 24) + 24) % 24;
    if (h >= 18 && h < 23 && !table.candle) return K.start(a, 'candle', [atTable(TB.x + 10), K.ph(0.5, (s) => { s.f = -1; s.hold.N = H.lighter(); s.tgN = [TB.x - 4, TB.top - 64]; s.leanT = 0.2; }), K.ph(0.6, null, { exit: () => { table.candle = 1; K.fx('spark', TB.x - 30, TB.top - 58, { life: 0.4, col: '#ffcc66' }); } }), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; s.leanT = 0; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (per() === 4 && table.candle && !p) return K.start(a, 'snuff', [atTable(TB.x + 10), K.ph(0.8, (s) => { s.f = -1; s.tgN = [TB.x - 26, TB.top - 56]; s.leanT = 0.2; }, { exit: () => { table.candle = 0; K.fx('puff', TB.x - 30, TB.top - 60, { life: 1, col: '#cccccc' }); } }), home()]);
    if (ready && ready.done && ready.ord.take) { const g = ready.ord.a; if (g && g.phase === 'waitPizza') return handBox(a, g); if (!g || !K.actors.includes(g)) ready = null; }
    if (p) {
      if (p.stage === 'seated' && !table.menu) return menus(a, p);
      if (p.stage === 'menus' && K.simT > p.t + 4) return order(a, p);
      if (p.stage === 'ordered' && ready && ready.done && !ready.ord.take) return servePie(a, p);
      if (p.stage === 'eating' && table.pie && table.pie.eaten >= 8) return clearPie(a, p);
      if (p.stage === 'dessert') return dessert(a, p);
      if (p.stage === 'bill') return bill(a, p);
      if (table.glasses.some((g) => g.lv < 0.15) && (p.stage === 'eating' || p.stage === 'ordered') && K.cooled(a, 'top', 14)) return pour(a);
    } else if (table.pie || table.glasses.some((g) => g.lv > 0) || table.dessert) return reset(a);
    const r = Math.random();
    if (r < 0.35) return K.start(a, 'polish', [home(), K.ph(rand(2, 3.5), (s, u, t) => { s.f = 1; s.hold.N = H.glass(0); s.hold.F = H.cloth(); s.carryUp = true; s.tgN = [s.hx + 18, s.hy - 70]; s.tgF = [s.hx + 18 + Math.cos(t * 7) * 6, s.hy - 70 + Math.sin(t * 7) * 6]; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; s.carryUp = false; } })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.carryUp = false; } });
    return K.start(a, 'stand', [home(), K.ph(rand(2, 3.5), (s) => { s.f = 1; s.tgN = [s.hx + 4, s.hy - 26]; s.tgF = [s.hx - 6, s.hy - 26]; s.lxT = pick([0.8, 0.3, -0.4]); })]);
  }
  function menus(a, p) { table.menu = 1; K.start(a, 'menus', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.hold.N = H.menu(); s.tgN = [TB.x, TB.top - 30]; s.leanT = 0.15; }, { enter: () => K.say(a, pick(['Buonasera!', 'Benvenuti!', 'Prego, accomodatevi']), 1.4), exit: (s) => { s.hold.N = null; for (const m of p.members) { m.hold.N = H.menu(); m.reading = 1; } p.stage = 'menus'; p.t = K.simT; } }), home()]); }
  function pourPh() { return [K.ph(0, (s) => { s.walkTo = RACK.x + 30; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.6, (s) => { s.f = -1; s.tgN = [RACK.x - 4, 452]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = H.fiasco(); table.fiOut = 1; } }), K.ph(0, (s) => { s.walkTo = TB.x - 20; }, { until: (s) => !s.walking, max: 30 }),
    ...[0, 1].map((i) => K.ph(1.1, (s, u) => { s.f = glassX(i) < s.hx ? -1 : 1; s.tgN = [glassX(i) - s.f * 6, TB.top - 48]; s.potTilt = Math.sin(clamp(u * 1.3, 0, 1) * Math.PI * 0.5) * 0.8; if (u > 0.2 && u < 0.85) { table.glasses[i].lv = Math.min(0.8, table.glasses[i].lv + 0.035); table.stream = { x0: s.hN.x + s.f * 16, y0: s.hN.y - 6, x1: glassX(i), y1: TB.top - 24 }; } else table.stream = null; }, { exit: (s) => { s.potTilt = 0; table.stream = null; } })),
    K.ph(0, (s) => { s.walkTo = RACK.x + 30; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.5, (s) => { s.f = -1; s.tgN = [RACK.x - 4, 452]; }, { exit: (s) => { s.hold.N = null; table.fiOut = 0; } }), home()]; }
  function pour(a) { K.start(a, 'pour', pourPh(), { onAbort: (s) => { s.hold.N = null; s.potTilt = 0; table.stream = null; table.fiOut = 0; } }); }
  function order(a, p) {
    p.stage = 'ordering'; const kind = pick(PIES);
    K.start(a, 'order', [atTable(TB.x + 40), K.ph(2.2, (s, u, t) => { s.f = -1; s.hold.N = H.card(); s.carryUp = true; s.tgN = [s.hx - 16, s.hy - 64]; s.tgF = [s.hx - 10 + Math.sin(t * 12) * 3, s.hy - 60]; }, { enter: () => { const m = p.members[0]; for (const q of p.members) { q.hold.N = null; q.reading = 0; } K.say(m, 'Una ' + kind.n + ', per favore', 1.6); K.after(1.4, () => K.say(a, 'Perfetto!', 1)); }, exit: (s) => { s.hold.N = null; s.carryUp = false; orders.push({ kind, party: p }); p.stage = 'ordered'; K.say(a, 'Salvatore — una ' + kind.n + '!', 1.3); K.after(1, () => K.say(sal, 'Subito!', 1)); } }),
      ...pourPh()], { onAbort: (s) => { s.hold.N = null; s.carryUp = false; s.potTilt = 0; table.stream = null; table.fiOut = 0; if (p.stage === 'ordering') { orders.push({ kind, party: p }); p.stage = 'ordered'; } } });
  }
  function servePie(a, p) {
    const pie = ready; p.stage = 'serving';
    K.start(a, 'serve', [K.ph(0, (s) => { s.walkTo = BENCH.x1 + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.6, (s) => { s.f = -1; s.tgN = [READY + 14, BT - 8]; s.tgF = [READY + 26, BT - 8]; s.leanT = 0.2; }, { exit: (s) => { ready = null; s.hold.N = H.pie(pie); s.carryUp = true; } }),
      K.ph(0, (s) => { s.carryUp = true; s.tgN = [s.hx + s.f * 10, s.hy - 120]; s.walkTo = TB.x + 6; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.7, (s) => { s.f = -1; s.carryUp = false; s.tgN = [TB.x + 10, TB.top - 30]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; table.pie = Object.assign(pie, { eaten: 0 }); p.stage = 'eating'; K.fx('puff', TB.x + 18, TB.top - 30, { life: 1, col: '#ffffff' }); K.say(a, 'Buon appetito!', 1.2); for (const m of p.members) if (Math.random() < 0.7) K.say(m, pick(['Che profumo!', 'icon:heart', 'Wow']), 1.1); } }), home()],
      { onAbort: (s) => { s.hold.N = null; s.carryUp = false; if (p.stage === 'serving') { table.pie = Object.assign(pie, { eaten: 0 }); p.stage = 'eating'; } } });
  }
  function clearPie(a, p) { p.stage = 'clearing'; K.start(a, 'clear', [atTable(TB.x + 6), K.ph(0.6, (s) => { s.f = -1; s.tgN = [TB.x + 18, TB.top - 14]; s.leanT = 0.2; }, { exit: (s) => { table.pie = null; s.hold.N = H.pie(null); } }), home(), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; p.stage = p.bday || Math.random() < 0.5 ? 'dessert' : 'bill'; } })], { onAbort: (s) => { s.hold.N = null; table.pie = null; p.stage = 'bill'; } }); }
  function dessert(a, p) {
    p.stage = 'dessertComing'; const bd = p.bday;
    K.start(a, 'dessert', [home(), K.ph(0.6, (s) => { s.f = 1; s.tgN = [s.hx + 20, 480]; }, { exit: (s) => { s.hold.N = H.tira(bd); s.carryUp = true; } }),
      K.ph(0, (s) => { s.carryUp = true; s.tgN = [s.hx - 10, s.hy - 110]; s.walkTo = TB.x + 30; }, { until: (s) => !s.walking, max: 30, enter: () => { if (bd) { K.say(a, 'Tanti auguri a te…', 2); K.say(sal, 'icon:note', 2); } } }),
      K.ph(0.7, (s) => { s.f = -1; s.carryUp = false; s.tgN = [TB.x + 10, TB.top - 14]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; table.dessert = { frac: 1, candle: bd ? 1 : 0 }; p.stage = 'sweet'; if (bd) { const w = p.bdayWho; for (const g of K.actors) if (g !== w) K.say(g, 'icon:note', 1.6); K.after(1.8, () => { if (!w || !K.actors.includes(w)) { table.dessert.candle = 0; return; } K.abort(w); K.start(w, 'blow', [K.ph(0.9, (q) => { q.leanT = 0.25; q.look = { x: () => TB.x, until: K.simT + 0.3 }; }, { exit: (q) => { q.leanT = 0; table.dessert.candle = 0; K.fx('puff', TB.x + 10, TB.top - 40, { life: 1, col: '#dddddd' }); K.fx('spark', TB.x, TB.top - 90, { life: 0.8, col: '#ffd070' }); K.say(w, 'Grazie!', 1.3); for (const g of guests()) if (g !== w) K.say(g, 'icon:heart', 1.2); } })], { onAbort: () => { table.dessert.candle = 0; } }); }); } } }), home()],
      { onAbort: (s) => { s.hold.N = null; s.carryUp = false; table.dessert = { frac: 1, candle: 0 }; p.stage = 'sweet'; } });
  }
  function bill(a, p) {
    p.stage = 'paying';
    K.start(a, 'bill', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.tgN = [TB.x + 10, TB.top - 8]; s.leanT = 0.2; }, { enter: (s) => { s.hold.N = H.card(); }, exit: (s) => { s.hold.N = null; table.folder = 1; } }), K.ph(2.3, (s) => { s.look = { x: () => TB.x, until: K.simT + 0.3 }; }, { enter: () => K.after(0.9, () => { const m = p.members[0]; if (m && K.actors.includes(m)) K.start(m, 'pay', [K.ph(0.7, (q) => { q.tgN = [TB.x, TB.top - 10]; q.hold.N = H.coin(); }, { exit: (q) => { q.hold.N = null; } })]); }) }),
      K.ph(0.5, (s) => { s.tgN = [TB.x + 10, TB.top - 8]; }, { exit: (s) => { table.folder = 0; s.hold.N = H.card(); p.stage = 'leave'; K.say(a, pick(['Grazie, arrivederci!', 'A presto!']), 1.3); } }), home(), K.ph(0.2, null, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; table.folder = 0; p.stage = 'leave'; } });
  }
  function reset(a) { K.start(a, 'reset', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.tgN = [glassX(0), TB.top - 10]; s.tgF = [glassX(1), TB.top - 10]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { table.glasses = [{ lv: 0 }, { lv: 0 }]; table.pie = null; table.dessert = null; table.menu = 0; s.farFront = false; } }), K.ph(1.4, (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [TB.x + Math.sin(t * 6) * 40, TB.top - 6]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; s.farFront = false; } }); }
  function handBox(a, g) {
    g.phase = 'gettingBox';
    K.start(a, 'box', [K.ph(0, (s) => { s.walkTo = BENCH.x1 + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.6, (s) => { s.f = -1; s.tgN = [READY + 10, BT - 8]; s.leanT = 0.2; }, { exit: (s) => { ready = null; s.hold.N = H.box(); } }),
      K.ph(0, (s) => { s.carryUp = true; s.walkTo = g.hx + 70; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.7, (s) => { s.carryUp = false; s.f = -1; s.tgN = [s.hx - 34, s.hy - 60]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; g.hold.N = H.box(); g.carryUp = true; K.say(a, 'Ecco — calda calda!', 1.2); } }),
      K.ph(0.8, (s) => { s.tgN = [s.hx - 30, s.hy - 56]; }, { enter: () => { g.hold.F = H.coin(); g.tgF = [g.hx + 30, g.hy - 56]; }, exit: () => { g.hold.F = null; g.phase = 'leave'; K.say(g, pick(['Grazie!', 'icon:heart']), 1); } }), home()], { onAbort: (s) => { s.hold.N = null; g.phase = 'leave'; } });
  }
  /* ---------- guests ---------- */
  const TYPES = {
    nonno: { body: B({ T: 236, hw: 64, torso: 'round', pattern: 'vest', top: 'brown', shirt: 'cream', pants: 'brown', hat: 'flatcap', hatCol: 'grey', hair: 'hairGrey' }), words: ['Come a Napoli!', 'Mmm'] },
    nonna: { body: B({ T: 222, hw: 58, headR: 27, pattern: 'cardigan', top: 'plum', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', skirt: 'dark' }), words: ['Mangia, mangia!', 'icon:heart'] },
    couple: { body: B({ T: 232, hw: 56, headR: 28, pattern: 'dress', top: 'red', skirt: 'red', hairStyle: 'long' }), words: ['Bellissimo', 'icon:heart'] },
    couple2: { body: B({ pattern: 'jacket', top: 'navy', shirt: 'white', pants: 'navy' }), words: ['Salute!', 'icon:heart'] },
    tourist: { body: B({ pattern: 'tee', top: 'teal', pants: 'cream', hat: 'bucket', hatCol: 'cream', camera: 1, shortSleeve: 1 }), words: ['Best pizza ever', 'icon:cam'], cam: 1 },
    tourist2: { body: B({ T: 230, hw: 56, headR: 28, pattern: 'tee', top: 'mustard', pants: 'navy', hairStyle: 'pony', backpack: 1, packCol: 'coral', shortSleeve: 1 }), words: ['So good!', 'icon:laugh'] },
    student: { body: B({ pattern: 'hoodie', top: 'olive', pants: 'navy', hood: 1, hairStyle: 'short' }), words: ['Ciao!'] },
    worker: { body: B({ pattern: 'hivis', top: 'mustard', pants: 'navy', hat: 'cap', hatCol: 'navy' }), words: ['Pranzo!'] },
  };
  const TPARTIES = [{ m: ['nonno', 'nonna'], w: [2, 2, 1, 1] }, { m: ['couple', 'couple2'], w: [0.5, 1, 3, 3] }, { m: ['tourist', 'tourist2'], w: [3, 2, 1, 0.5] }];
  function arrive() {
    const p = per(); if (p === 4) return;
    if (!table.party && !table.pie && !table.dessert && !table.glasses.some((g) => g.lv > 0)) { const list = TPARTIES.filter((q) => q.w[p] > 0 && !guests().some((g) => q.m.includes(g.type))); if (list.length) { let tot = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * tot, pt = list[0]; for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } } const party = { members: [], stage: 'arrive', t: 0, bday: Math.random() < 0.35 }; table.party = party; pt.m.forEach((type, j) => { const st = TB.seats[j]; const a = mkGuest(type, 1320 + j * 50); a.party = party; a.seat = st; st.occ = a; a.walkTo = st.x; party.members.push(a); a.phase = 'toTable'; }); if (party.bday) party.bdayWho = party.members[pt.m[0] === 'nonno' ? 1 : 0]; } }
  }
  function takeaway() { if (per() === 4 || busker || guests().some((g) => g.take)) return; const type = pick(['student', 'worker']); const a = mkGuest(type, 1330); a.take = 1; a.walkTo = 880; a.phase = 'toCounter'; }
  function mkGuest(type, x) {
    const T0 = TYPES[type]; const a = K.mk(Object.assign({}, T0.body), { type, T0, cust: 1, hx: x, f: x < 640 ? 1 : -1, floorY: FL - 6, sc: SC, alpha: 0, fade: 1.5, speed: rand(0.95, 1.08) });
    if (cool('snow') || cool('rain')) if (Math.random() < 0.6) a.scarf = pick(['coral', 'cream', 'mustard', 'teal']);
    a.think = guestThink; return a;
  }
  function guestThink(a) {
    const P = a.party, mate = P && P.members.find((m) => m !== a);
    if (a.phase === 'toTable') { if (a.walking || a.walkTo != null) return; K.sitDown(a, a.seat.x, 600, a.seat.f); a.floorY = 704; a.tableY = TB.top - 6; a.faceDir = a.seat.f * 0.85; a.phase = 'table'; if (P.members.every((m) => m.phase === 'table')) P.stage = 'seated'; return; }
    if (a.phase === 'toCounter') { if (a.walking || a.walkTo != null) return; a.f = 1; a.phase = 'waitPizza'; K.say(a, pick(['Una margherita da asporto!', 'Una diavola, da portare via']), 1.5); orders.push({ kind: PIES[Math.random() < 0.6 ? 0 : 1], take: 1, a }); return; }
    if (a.phase === 'waitPizza' || a.phase === 'gettingBox') return K.start(a, 'wait', [K.ph(rand(1, 2), (s) => { s.f = 1; s.look = { x: () => (Math.sin(K.simT * 0.7) > 0 ? 1100 : 1240), until: K.simT + 0.3 }; })]);
    if (a.state === 'sit' || a.state === 'rise') return;
    if (a.phase === 'table') {
      if (P.stage === 'leave') { a.phase = 'leave'; return; }
      if (ape && ape.t > 1 && ape.t < 10 && Math.random() < 0.4) return K.start(a, 'ape', [K.ph(1.2, (s) => { s.look = { x: () => ape.x, until: K.simT + 0.3 }; })]);
      if (busker && busker.playing && Math.random() < 0.5) return K.start(a, 'listen', [K.ph(rand(1.5, 2.5), (s, u, t) => { s.look = { x: () => busker.a.hx, until: K.simT + 0.3 }; s.headDy = Math.abs(Math.sin(t * 5)) * 1.5; }, { exit: (s) => { s.headDy = 0; } })]);
      if (a.reading) return K.start(a, 'read', [K.ph(rand(1.5, 3), (s) => { s.tgN = [s.hx + s.f * 24, s.R.cy + 52]; s.headDy = 2; s.look = { x: () => s.hx + s.f * 40, until: K.simT + 0.3 }; }, { exit: (s) => { s.headDy = 0; } })]);
      const gi = TB.seats.indexOf(a.seat), g = table.glasses[gi], r = Math.random(), pie = table.pie;
      if (a.T0.cam && pie && pie.eaten < 2 && K.cooled(a, 'photo', 30)) return K.start(a, 'photo', [K.ph(1.4, (s) => { s.hold.N = H.camera(); s.tgN = [s.R.cx + s.f * 30, s.R.cy + 10]; }, { exit: (s) => { s.hold.N = null; K.fx('flash', s.R.cx + s.f * 30, s.R.cy + 10, { life: 0.3 }); } })], { onAbort: (s) => { s.hold.N = null; } });
      if (pie && pie.eaten < 8 && r < 0.6 && !pie.busy) { pie.busy = 1; return K.start(a, 'slice', [K.ph(0.5, (s) => { s.tgN = [TB.x + 18 - s.f * 4, TB.top - 14]; s.leanT = 0.15; }, { exit: (s) => { pie.eaten++; pie.busy = 0; s.hold.N = H.slice(); table.stretch = { a: s, t: 0 }; } }), K.ph(0.9, (s, u) => { s.tgN = [lerp(TB.x + 18 - s.f * 4, s.R.cx + s.f * s.R.R * 0.7, u), lerp(TB.top - 14, s.R.cy + s.R.R * 0.4, u)]; if (table.stretch) table.stretch.t = u; }, { exit: () => { table.stretch = null; } }), K.ph(rand(1, 1.6), (s, u, t) => { s.headDy = Math.abs(Math.sin(t * 8)) * 1.4; s.tgN = [s.R.cx + s.f * s.R.R * 0.6, s.R.cy + s.R.R * 0.5]; }, { exit: (s) => { s.headDy = 0; s.hold.N = null; if (Math.random() < 0.3) K.say(a, pick(['Mmm!', 'icon:heart', 'Perfetta']), 1); } })], { onAbort: (s) => { s.hold.N = null; s.headDy = 0; pie.busy = 0; table.stretch = null; } }); }
      if (table.dessert && table.dessert.frac > 0.02 && !table.dessert.candle && r < 0.65) return K.start(a, 'spoon', [K.ph(0.5, (s) => { s.tgN = [TB.x + 10, TB.top - 12]; s.leanT = 0.15; s.hold.N = H.pinch('#f2e2c0'); }, { exit: () => { table.dessert.frac = Math.max(0, table.dessert.frac - rand(0.15, 0.25)); } }), K.ph(0.6, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.5, s.R.cy + s.R.R * 0.5]; }, { exit: (s) => { s.hold.N = null; if (table.dessert && table.dessert.frac <= 0.02 && P.stage === 'sweet') P.stage = 'bill'; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (table.dessert && table.dessert.frac <= 0.02 && P.stage === 'sweet') P.stage = 'bill';
      if (g.lv > 0.08 && r < 0.75) return K.start(a, 'sip', [K.ph(0.5, (s) => { s.tgF = [glassX(gi), TB.top - 12]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.glass(gi); g.held = 1; } }), K.ph(0.5, (s) => { s.tgF = [s.R.cx + s.f * s.R.R * 0.8, s.R.cy + s.R.R * 0.2]; }), K.ph(0.8, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.6; }, { exit: (s) => { g.lv = Math.max(0, g.lv - rand(0.1, 0.18)); s.cupTilt = 0; } }), K.ph(0.5, (s) => { s.tgF = [glassX(gi), TB.top - 12]; }, { exit: (s) => { s.hold.F = null; g.held = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; g.held = 0; s.farFront = false; s.cupTilt = 0; } });
      if (mate && g.lv > 0.1 && r < 0.82 && K.cooled(a, 'toast', 25)) { const mg = TB.seats.indexOf(mate.seat); K.abort(mate); const clink = (who, i) => K.start(who, 'toast', [K.ph(0.5, (s) => { s.tgF = [glassX(i), TB.top - 12]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.glass(i); table.glasses[i].held = 1; } }), K.ph(0.7, (s) => { s.tgF = [TB.x + s.f * -8, TB.top - 74]; }, { exit: () => { if (who === a) { K.fx('spark', TB.x, TB.top - 80, { life: 0.4, col: '#fff2c0' }); K.say(a, 'Cin cin!', 1); } } }), K.ph(0.6, (s) => { s.tgF = [glassX(i), TB.top - 12]; }, { exit: (s) => { s.hold.F = null; table.glasses[i].held = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; table.glasses[i].held = 0; s.farFront = false; } }); clink(mate, mg); return clink(a, gi); }
      if (mate && r < 0.92 && K.cooled(a, 'chat', 6)) { K.say(a, pick(a.T0.words), 1.4); K.after(1.2, () => K.say(mate, pick(mate.T0.words), 1.3)); return K.start(a, 'chat', [K.ph(2.2, (s, u, t) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + s.f * 30 + Math.sin(t * 4) * 6, TB.top - 30]; })]); }
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.look = { x: () => 640, until: K.simT + 0.3 }; })]);
    }
    if (a.phase === 'leave') { if (a.state === 'seated') { K.standUp(a); return; } if (a.seat) { a.seat.occ = null; a.seat = null; } a.floorY = FL - 6; a.phase = 'out'; a.walkTo = 1330; if (P && P.members.every((m) => m.phase === 'out')) table.party = null; return; }
    if (a.phase === 'out') { if (!a.walking) a.fade = -2; else if (a.hx > 1260) a.fade = -1.5; }
  }
  /* ---------- the accordionist (night) ---------- */
  function startBusker() {
    const a = K.mk(B({ T: 240, hw: 62, headR: 28, pattern: 'vest', top: 'dark', shirt: 'white', pants: 'dark', hat: 'fedora', hatCol: 'dark', hair: 'hairGrey' }), { role: 'busker', hx: 1330, f: -1, floorY: FL - 6, sc: SC, alpha: 0, fade: 1.5, speed: 0.9 });
    busker = { a, playing: 0 }; a.walkTo = 860;
    a.think = (s) => {
      if (s.done) { if (!s.leaving) { s.leaving = 1; s.walkTo = 1330; } else if (!s.walking || s.hx > 1260) s.fade = -1.5; return; }
      if (s.walking || s.walkTo != null) return;
      K.start(s, 'play', [K.ph(12, (q, u, t) => { busker.playing = 1; q.f = 1; const sq = Math.sin(t * 3); q.tgN = [q.hx + 40 + sq * 12, q.hy - 78]; q.tgF = [q.hx - 6 - sq * 6, q.hy - 78]; q.bel = sq; q.headDy = Math.abs(Math.sin(t * 6)) * 1.5; if (Math.random() < 0.012) K.say(q, 'icon:note', 0.8); }, { enter: () => K.say(s, 'Funiculì, funiculà!', 1.4), exit: (q) => { busker.playing = 0; q.headDy = 0; q.bel = null; } }),
        K.ph(0.6, null, { exit: () => { const g = guests().find((m) => m.state === 'seated'); if (g) { K.start(g, 'tip', [K.ph(0.8, (q) => { q.hold.N = H.coin(); q.tgN = [q.hx - q.f * 10, q.R.cy + 30]; }, { exit: (q) => { q.hold.N = null; } })]); K.say(s, 'Grazie!', 1); } } })],
        { onEnd: (q) => { q.done = 1; q.bel = null; }, onAbort: (q) => { q.done = 1; q.bel = null; busker.playing = 0; } });
    };
  }
  function drawAccordion(c, a) { if (a.bel == null || !a.hN || !a.hF) return; const x0 = Math.min(a.hF.x, a.hN.x), x1 = Math.max(a.hF.x, a.hN.x), y = (a.hN.y + a.hF.y) / 2 + 8, w = x1 - x0; c.fillStyle = L('#c8302a'); c.fillRect(x0 - 12, y - 20, 14, 38); c.fillRect(x1 - 2, y - 20, 14, 38); c.fillStyle = L('#2a2a2a'); for (let i = 0; i < 7; i++) { const xx = x0 + 3 + (w - 6) * (i / 6); c.fillRect(xx - 1.5, y - 18, 3, 34); } c.fillStyle = L('#f4ecd8'); for (let i = 0; i < 5; i++) c.fillRect(x1 + 6, y - 16 + i * 7, 4, 5); }
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    nextArrive -= dt; if (nextArrive <= 0) { arrive(); nextArrive = rand(8, 14); }
    nextTake -= dt; if (nextTake <= 0) { takeaway(); nextTake = rand(35, 60); }
    oven.flare = Math.max(0, oven.flare - dt * 0.8); oven.heat = clamp(oven.heat - dt * 0.004, 0.35, 1);
    nextApe -= dt; if (nextApe <= 0 && !ape && per() < 3) { ape = { t: 0, x: WIN.x0 - 80 }; nextApe = rand(90, 160); } if (ape) { ape.t += dt; ape.x = WIN.x0 - 80 + ape.t * 55; if (ape.x > WIN.x1 + 80) ape = null; }
    nextCat -= dt; if (nextCat <= 0 && !cat) { cat = { t: 0 }; nextCat = rand(70, 130); } if (cat) { cat.t += dt; if (cat.t > 18) cat = null; }
    nextBusker -= dt; if (nextBusker <= 0 && !busker && per() >= 2 && per() < 4 && table.party && !guests().some((g) => g.take)) { startBusker(); nextBusker = rand(110, 170); }
    if (busker && !K.actors.includes(busker.a)) busker = null;
    if (table.party && table.party.stage === 'ordering') for (const m of table.party.members) if (m.reading) { m.reading = 0; m.hold.N = null; }
    if (dough < 3 && Math.random() < dt * 0.05) dough = 6;
    const h = ((K.hour % 24) + 24) % 24; sign = h < 23 ? 1 : 0;
  }
  function onClear(Kk, big) {
    for (const g of guests()) if (g.state === 'seated' && (!g.act || g.act.name === 'idle')) { if (big || Math.random() < 0.4) K.say(g, pick(['Bravo!', 'icon:star', 'Bellissimo!', 'icon:heart']), 1.2); }
    K.say(sal, big ? pick(['Mamma mia!', 'icon:star']) : pick(['Perfetto', 'icon:note']), 1.2); oven.flare = Math.max(oven.flare, big ? 1 : 0.5); if (big) K.say(luca, 'icon:star', 1);
  }
  function build(Kk) { K = Kk; mkStaff(); const h = ((K.hour % 24) + 24) % 24; table.candle = h >= 18 && h < 23 ? 1 : 0; nextArrive = 0.5; oven.door = per() === 4 ? 1 : 0; }
  /* ---------- drawing ---------- */
  function drawWindow(c, t) {
    const P = K.P, { x0, y0, x1, y1 } = WIN, cx = (x0 + x1) / 2, sp = y0 + 70;
    const arch = (pad) => { c.beginPath(); c.moveTo(x0 - pad, y1 + pad); c.lineTo(x0 - pad, sp); c.quadraticCurveTo(cx, y0 - 70 - pad * 2, x1 + pad, sp); c.lineTo(x1 + pad, y1 + pad); c.closePath(); };
    c.fillStyle = P.woodDk; arch(14); c.fill();
    c.save(); arch(0); c.clip();
    K.sky(c, x0, y0 - 40, x1, y0 + 230, { sunR: 20 });
    c.fillStyle = P.vesu; K.poly(c, [x0 + 230, y0 + 240, x0 + 380, y0 + 120, x0 + 410, y0 + 128, x0 + 450, y0 + 116, x0 + 620, y0 + 240]); c.fill();
    if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.9)'; K.poly(c, [x0 + 356, y0 + 140, x0 + 380, y0 + 120, x0 + 410, y0 + 128, x0 + 450, y0 + 116, x0 + 476, y0 + 138]); c.fill(); }
    const hs = [[x0 - 10, 150, P.out1, 200], [x0 + 130, 110, P.out3, 250], [x1 - 250, 120, P.out2, 230], [x1 - 120, 140, P.out1, 180]];
    for (const [hx, w, col, top] of hs) { const ty = y0 + top - 90; c.fillStyle = col; c.fillRect(hx, ty, w, y1 - ty); c.fillStyle = P.roof; c.fillRect(hx - 6, ty - 8, w + 12, 10);
      for (let r = 0; r < 3; r++) for (let k = 0; k < Math.floor(w / 50); k++) { const wx = hx + 16 + k * 50, wy = ty + 22 + r * 66; if (wy > y1 - 70) continue; const lit = P.night > 0.3 && ((k * 3 + r * 5 + Math.round(hx)) % 7) < 4; c.fillStyle = lit ? P.lit : P.outWin; c.fillRect(wx, wy, 20, 34); c.fillStyle = P.outSh; c.fillRect(wx - 9, wy, 8, 34); c.fillRect(wx + 21, wy, 8, 34); c.fillStyle = rgba(P.ink, 0.25); c.fillRect(wx - 10, wy + 34, 40, 3); } }
    c.fillStyle = L('#a89a8a'); c.fillRect(x0, y1 - 46, x1 - x0, 46); c.fillStyle = rgba(P.ink, 0.12); for (let i = 0; i < 12; i++) c.fillRect(x0 + i * 56, y1 - 30, 30, 3);
    if (cool('rain')) { c.fillStyle = 'rgba(200,220,240,0.25)'; c.fillRect(x0, y1 - 46, x1 - x0, 46); }
    if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.8)'; c.fillRect(x0, y1 - 46, x1 - x0, 10); }
    const ly = y0 + 170; c.strokeStyle = rgba(P.ink, 0.5); c.lineWidth = 1; c.beginPath(); c.moveTo(x0 + 140, ly); c.quadraticCurveTo(cx - 60, ly + 30, x1 - 250, ly); c.stroke();
    const cloths = [['#f4f0e8', 26, 30], ['#d8584a', 20, 26], ['#2a6a9a', 28, 22], ['#f8d860', 18, 30], ['#f4f0e8', 30, 18]];
    cloths.forEach(([col, w, h], i) => { const u = (i + 1) / 6, xx = lerp(x0 + 140, x1 - 250, u), yy = ly + Math.sin(u * Math.PI) * 15 + 1, sw = Math.sin(t * 1.4 + i) * 0.06; c.save(); c.translate(xx, yy); c.rotate(sw); c.fillStyle = L(col); c.fillRect(-w / 2, 0, w, h); c.restore(); });
    if (P.night > 0.15) { const sy = y0 + 70; c.strokeStyle = rgba(P.ink, 0.6); c.beginPath(); c.moveTo(x0, sy); c.quadraticCurveTo(cx, sy + 50, x1, sy); c.stroke(); for (let i = 1; i < 16; i++) { const u = i / 16, xx = lerp(x0, x1, u), yy = sy + 2 * u * (1 - u) * 50 + 5; c.fillStyle = '#ffd890'; c.beginPath(); c.arc(xx, yy, 3, 0, TAU); c.fill(); K.glow(c, xx, yy, 18, '#ffc860', 0.6 * P.night); } }
    if (ape) { const bx = ape.x, by = y1 - 18 + Math.sin(t * 20) * 0.8; c.fillStyle = L('#5aa0c8'); c.fillRect(bx - 30, by - 30, 34, 26); c.fillStyle = L('#a8d8f0'); c.fillRect(bx - 26, by - 26, 16, 12); c.fillStyle = L('#c8a060'); c.fillRect(bx + 4, by - 20, 44, 16); c.fillStyle = L('#f08a2a'); for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(bx + 12 + i * 10, by - 22, 5, 0, TAU); c.fill(); } c.fillStyle = '#1a1a1a'; for (const wx of [bx - 22, bx + 34]) { c.beginPath(); c.arc(wx, by - 2, 6, 0, TAU); c.fill(); } if (P.night > 0.2) K.glow(c, bx + 6, by - 20, 26, '#ffe8a0', 0.6); }
    K.weather(c, x0, y0 - 60, x1, y1);
    c.restore();
    c.fillStyle = P.woodDk; c.fillRect(cx - 4, y0 - 34, 8, y1 - y0 + 34); c.fillRect(x0, y0 + 200, x1 - x0, 7); c.fillRect(x0 - 22, y1 + 6, x1 - x0 + 44, 12);
    for (const px of [x0 + 30, x1 - 34]) { c.fillStyle = L('#c8603a'); K.poly(c, [px - 18, y1 + 6, px + 18, y1 + 6, px + 14, y1 - 14, px - 14, y1 - 14]); c.fill(); c.fillStyle = L('#3a7a3a'); for (let i = 0; i < 5; i++) { ellipse(c, px - 16 + i * 8, y1 - 18 - (i % 2) * 5, 7, 4, i); c.fill(); } c.fillStyle = L('#e83a3a'); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(px - 10 + i * 10, y1 - 26 - (i % 2) * 4, 4.4, 0, TAU); c.fill(); } }
    if (cat) { const u = cat.t, wk = u < 3 ? u / 3 : 1, out = u > 15 ? (u - 15) / 3 : 0, cxp = lerp(x1 - 90, x1 - 250, wk) - out * 260, sit = wk >= 1 && !out, y = y1 + 6; c.fillStyle = L('#3a3030');
      if (sit) { ellipse(c, cxp, y - 12, 13, 13); c.fill(); c.beginPath(); c.arc(cxp - 7, y - 30, 8, 0, TAU); c.fill(); K.poly(c, [cxp - 14, y - 33, cxp - 12, y - 43, cxp - 7, y - 36]); c.fill(); K.poly(c, [cxp - 6, y - 36, cxp - 2, y - 43, cxp - 1, y - 33]); c.fill(); c.strokeStyle = L('#3a3030'); c.lineWidth = 3; c.beginPath(); c.moveTo(cxp + 10, y - 3); c.quadraticCurveTo(cxp + 28, y - 4 + Math.sin(t * 2) * 4, cxp + 24, y - 18); c.stroke(); c.fillStyle = '#e8d040'; c.fillRect(cxp - 11, y - 32, 2, 2); c.fillRect(cxp - 5, y - 32, 2, 2); }
      else { ellipse(c, cxp, y - 12, 18, 7); c.fill(); c.beginPath(); c.arc(cxp - 17, y - 18, 7, 0, TAU); c.fill(); for (let i = 0; i < 4; i++) c.fillRect(cxp - 13 + i * 8, y - 7, 3, 7); } }
  }
  function drawOven(c, t) {
    const P = K.P, { x, mouthY, top, base } = OVEN;
    c.fillStyle = L('#b87a4a'); c.fillRect(x - 24, 0, 48, top + 30); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 10, 0, 14, top + 30);
    c.save(); c.beginPath(); c.moveTo(x - 104, base); c.quadraticCurveTo(x - 104, top, x, top); c.quadraticCurveTo(x + 104, top, x + 104, base); c.closePath(); c.fillStyle = P.tile; c.fill(); c.clip(); c.fillStyle = P.tile2; for (let r = 0; r < 12; r++) for (let k = 0; k < 15; k++) if ((r + k) % 2 === 0) c.fillRect(x - 104 + k * 15, top + r * 19, 6, 6); c.restore();
    c.fillStyle = P.tile2; roundRect(c, x - 64, top + 48, 128, 24, 4); c.fill(); c.fillStyle = P.tile; c.font = '700 14px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DA SALVATORE', x, top + 61);
    c.fillStyle = P.brick; c.beginPath(); c.moveTo(x - 62, base); c.lineTo(x - 62, mouthY - 10); c.quadraticCurveTo(x, mouthY - 96, x + 62, mouthY - 10); c.lineTo(x + 62, base); c.fill();
    c.strokeStyle = P.brick2; c.lineWidth = 2; for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 7; c.beginPath(); c.moveTo(x + Math.cos(a) * 46, mouthY - 6 + Math.sin(a) * 50); c.lineTo(x + Math.cos(a) * 60, mouthY - 6 + Math.sin(a) * 66); c.stroke(); }
    const mouth = (pad) => { c.beginPath(); c.moveTo(x - 44 - pad, base); c.lineTo(x - 44 - pad, mouthY - 8); c.quadraticCurveTo(x, mouthY - 68 - pad, x + 44 + pad, mouthY - 8); c.lineTo(x + 44 + pad, base); c.closePath(); };
    const f = oven.door ? 0.15 : (0.55 + oven.heat * 0.3 + oven.flare * 0.4 + Math.sin(t * 7) * 0.05);
    c.fillStyle = '#1a0a04'; mouth(0); c.fill();
    if (!oven.door) {
      c.save(); mouth(0); c.clip(); const g = c.createRadialGradient(x - 14, base - 8, 4, x - 14, base - 8, 90); g.addColorStop(0, rgba('#ffd060', Math.min(1, f))); g.addColorStop(0.5, rgba(P.fire, Math.min(1, f * 0.8))); g.addColorStop(1, 'rgba(60,10,0,0)'); c.fillStyle = g; c.fillRect(x - 50, mouthY - 70, 100, 100);
      for (let i = 0; i < 5; i++) { const fx = x - 34 + i * 7, h = (22 + Math.sin(t * 9 + i * 1.7) * 8) * (0.7 + oven.flare * 0.8); c.fillStyle = i % 2 ? '#ffb030' : '#ff6a10'; K.poly(c, [fx - 6, base, fx + 6, base, fx + Math.sin(t * 6 + i) * 3, base - h]); c.fill(); }
      c.fillStyle = '#3a1a0a'; c.fillRect(x - 42, base - 6, 26, 6); c.restore();
      if (pz && pz.st === 'oven') pizza(c, x + 14, base - 4, 0.8, pz);
      K.glow(c, x, mouthY, 150, P.fire, 0.16 + f * 0.22);
    } else { c.fillStyle = L('#3a3a3a'); mouth(2); c.fill(); c.fillStyle = L('#8a8a8a'); c.fillRect(x - 10, mouthY - 22, 20, 5); K.glow(c, x, base - 4, 40, P.fire, 0.12); }
    c.fillStyle = P.brick2; c.fillRect(x - 108, base, 216, 176); c.fillStyle = P.brick; c.fillRect(x - 112, base, 224, 10);
    c.fillStyle = '#140a04'; c.fillRect(x - 74, base + 30, 148, 100); for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) { const lx = x - 60 + k * 23 + (r % 2) * 10, ly = base + 116 - r * 22; c.fillStyle = L(k % 2 ? '#8a5a34' : '#a0703e'); c.beginPath(); c.arc(lx, ly, 10, 0, TAU); c.fill(); c.fillStyle = L('#d8b080'); c.beginPath(); c.arc(lx, ly, 5, 0, TAU); c.fill(); }
  }
  function drawBench(c) {
    const P = K.P, { x0, x1, top } = BENCH;
    c.fillStyle = P.marble; c.fillRect(x0 - 6, top, x1 - x0 + 12, 12); c.fillStyle = P.marble2; c.fillRect(x0 - 6, top + 10, x1 - x0 + 12, 3); c.strokeStyle = rgba(P.marble2, 0.8); c.lineWidth = 1; c.beginPath(); c.moveTo(x0 + 20, top + 4); c.quadraticCurveTo(x0 + 80, top + 9, x0 + 140, top + 3); c.stroke();
    c.fillStyle = P.wood; c.fillRect(x0, top + 13, x1 - x0, 150); c.fillStyle = P.woodDk; for (let x = x0 + 14; x < x1 - 30; x += 74) c.fillRect(x, top + 30, 60, 112); c.fillStyle = P.check; c.fillRect(x0, top + 13, x1 - x0, 6);
    if (flour > 0) { c.fillStyle = rgba('#ffffff', 0.5 * Math.min(1, flour)); ellipse(c, WORK, top + 1, 46, 4); c.fill(); }
    c.fillStyle = L('#c8ccd0'); c.fillRect(TRAY - 40, top - 8, 80, 8); for (let i = 0; i < dough; i++) pizza(c, TRAY - 26 + (i % 3) * 26, top - 4 - Math.floor(i / 3) * 7, 0.85, { st: 'ball' });
    [['#c8301c', 0], ['#fbf4e2', 1], ['#2e8a2a', 2]].forEach(([col, i]) => { const bx = 388 + i * 26; c.fillStyle = L('#e8e4dc'); K.poly(c, [bx - 12, top - 12, bx + 12, top - 12, bx + 9, top, bx - 9, top]); c.fill(); c.fillStyle = L(col); ellipse(c, bx, top - 12, 11, 3); c.fill(); });
    if (pz && !pz.hidden && pz.st !== 'oven' && pz.st !== 'out' && pz.st !== 'ready') pizza(c, WORK, top - 2, 1.25, pz);
    if (ready) { if (ready.boxed) { c.fillStyle = L('#f4ecd8'); c.fillRect(READY - 34, top - 14, 68, 14); c.fillStyle = L('#c8302a'); c.fillRect(READY - 16, top - 10, 32, 3); c.fillStyle = L('#3a8a3a'); c.fillRect(READY - 16, top - 6, 32, 3); } else { c.fillStyle = L('#a8aeb4'); ellipse(c, READY, top - 2, 36, 7); c.fill(); pizza(c, READY, top - 4, 1.15, ready); } }
  }
  function drawTable(c, front) {
    const P = K.P, x = TB.x, y = TB.top;
    if (!front) { for (const st of TB.seats) { const cx = st.x - st.f * 10; c.fillStyle = P.woodDk; c.fillRect(cx - st.f * 24 - 3, 486, 6, 118); c.fillRect(cx - st.f * 24 - 3, 500, 6, 4); c.fillStyle = P.wood; c.fillRect(cx - 24, 596, 48, 10); c.fillStyle = P.woodDk; c.fillRect(cx - 20, 606, 4, 94); c.fillRect(cx + 16, 606, 4, 94); } return; }
    c.save(); K.poly(c, [x - 92, y, x + 92, y, x + 98, y + 92, x - 98, y + 92]); c.clip(); c.fillStyle = P.cloth; c.fillRect(x - 100, y - 4, 200, 100); c.fillStyle = P.check; for (let r = 0; r < 6; r++) for (let k = 0; k < 15; k++) if ((r + k) % 2 === 0) c.fillRect(x - 100 + k * 14, y + r * 16, 14, 16); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 50, y, 60, 100); c.restore();
    c.fillStyle = P.cloth; ellipse(c, x, y, 94, 11); c.fill();
    fiasco(c, x - 34, y - 2, 1.05, table.candle);
    if (table.candle) K.glow(c, x - 34, y - 58, 90, P.candle, 0.55);
    if (table.pie) { c.fillStyle = L('#a8aeb4'); c.fillRect(x + 6, y - 14, 3, 12); c.fillRect(x + 30, y - 14, 3, 12); c.fillStyle = L('#c8ccd0'); ellipse(c, x + 18, y - 15, 40, 8); c.fill(); pizza(c, x + 18, y - 17, 1.25, table.pie); }
    if (table.stretch && table.stretch.a.hN) { const s = table.stretch.a; c.strokeStyle = L('#fbf4e2'); c.lineWidth = Math.max(0.6, 2.6 * (1 - table.stretch.t * 0.8)); c.beginPath(); c.moveTo(x + 18, y - 18); c.quadraticCurveTo((x + 18 + s.hN.x) / 2, Math.max(y - 18, s.hN.y) + 12, s.hN.x, s.hN.y); c.stroke(); }
    if (table.dessert) tiramisu(c, x + 14, y - 2, 1.5, table.dessert.frac, table.dessert.candle);
    for (let i = 0; i < 2; i++) if (!table.glasses[i].held && (table.party || table.glasses[i].lv > 0)) wineGlass(c, glassX(i), y + 1, 1.5, table.glasses[i].lv);
    if (table.stream) { c.strokeStyle = L('#8a1a2a'); c.lineWidth = 2; c.beginPath(); c.moveTo(table.stream.x0, table.stream.y0); c.quadraticCurveTo(table.stream.x1, table.stream.y0, table.stream.x1, table.stream.y1); c.stroke(); }
    if (table.folder) { c.fillStyle = L('#2a1a14'); c.fillRect(x + 2, y - 4, 22, 4); }
  }
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    c.fillStyle = P.wall2; for (const [px, py, w, h] of [[470, 40, 90, 36], [1010, 250, 110, 46], [1180, 470, 70, 36], [-20, 40, 70, 30]]) { roundRect(c, px, py, w, h, 14); c.fill(); }
    c.fillStyle = P.wood; c.fillRect(-60, 0, 1400, 26); for (let x = -40; x < 1340; x += 120) { c.fillStyle = P.woodDk; c.fillRect(x, 26, 22, 12); }
    c.fillStyle = rgba(P.floor, 0.4); c.fillRect(-60, 490, 1400, 150); c.fillStyle = P.check; c.fillRect(-60, 486, 1400, 4);
    drawWindow(c, t);
    c.fillStyle = P.woodDk; c.fillRect(RACK.x - 34, 300, 68, 170); for (let r = 0; r < 4; r++) for (let k = 0; k < 2; k++) { c.fillStyle = L(r % 2 ? '#2a4a2a' : '#5a1a2a'); c.beginPath(); c.arc(RACK.x - 14 + k * 28, 324 + r * 38, 10, 0, TAU); c.fill(); c.fillStyle = L('#c8a060'); c.beginPath(); c.arc(RACK.x - 14 + k * 28, 324 + r * 38, 4, 0, TAU); c.fill(); }
    c.fillStyle = P.wood; c.fillRect(RACK.x - 40, 470, 80, 8); if (!table.fiOut) fiasco(c, RACK.x - 4, 470, 0.9, null);
    c.fillStyle = P.woodDk; c.fillRect(1090, 150, 120, 90); c.fillStyle = L('#7ab8e0'); c.fillRect(1098, 158, 104, 74); c.fillStyle = L('#3a7aa0'); c.fillRect(1098, 204, 104, 28); c.fillStyle = L('#8aa0b8'); K.poly(c, [1110, 204, 1150, 172, 1190, 204]); c.fill();
    const nl = sign && P.night > 0.4; if (nl) K.glow(c, 1150, 96, 110, '#ffc870', 0.35 * P.night); c.fillStyle = !sign ? L('#5a5a5a') : nl ? '#fff0c8' : P.green; c.font = '700 24px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Trattoria', 1150, 84); c.fillStyle = !sign ? L('#5a5a5a') : nl ? '#ffb0a0' : P.red; c.font = 'italic 700 14px Georgia, serif'; c.fillText('pizza · vino · amore', 1150, 110);
    const open = per() !== 4; c.fillStyle = L(open ? '#3a8a3a' : '#a83a2a'); roundRect(c, 1113, 252, 74, 26, 4); c.fill(); c.fillStyle = '#fff'; c.font = '700 12px sans-serif'; c.fillText(open ? 'APERTO' : 'CHIUSO', 1150, 265);
    for (let i = 0; i < 2; i++) { const gx = 236 + i * 30; c.strokeStyle = rgba(P.ink, 0.5); c.lineWidth = 1; c.beginPath(); c.moveTo(gx, 38); c.lineTo(gx, 150); c.stroke(); for (let k = 0; k < 6; k++) { c.fillStyle = L(i ? '#d8301c' : '#f4ecd8'); if (i) { K.poly(c, [gx - 4, 58 + k * 16, gx + 4, 58 + k * 16, gx, 72 + k * 16]); c.fill(); } else { c.beginPath(); c.arc(gx, 64 + k * 16, 6, 0, TAU); c.fill(); } } }
  }
  function draw(c, t) {
    const P = K.P;
    drawRoom(c, t);
    { const x = 1128; c.strokeStyle = P.ink; c.lineWidth = 1.3; c.beginPath(); c.moveTo(x, 26); c.lineTo(x, 300); c.stroke(); c.fillStyle = L('#2a5a3a'); c.beginPath(); c.arc(x, 316, 18, Math.PI, TAU); c.fill(); c.fillStyle = P.lamp; ellipse(c, x, 316, 13, 3); c.fill(); K.glow(c, x, 326, 170, P.glow, P.glowA); }
    c.fillStyle = P.floor; c.fillRect(-60, 640, 1400, 100 + K.extraB); c.fillStyle = P.floor2; for (let r = 0; r < 4; r++) { c.fillRect(-60, 640 + r * 30, 1400, 2); for (let i = 0; i < 26; i++) c.fillRect(-60 + i * 56 + (r % 2) * 28, 640 + r * 30, 2, 30); }
    drawOven(c, t);
    K.drawBody(c, sal, true);
    if (sal.flying) { const x = sal.hx + 28, y = sal.R.cy - 34 - sal.flying * 46; c.save(); c.translate(x, y); c.fillStyle = L('#f4e2c0'); const w = 36 * (0.35 + 0.65 * Math.abs(Math.cos(K.t * 14))); ellipse(c, 0, 0, w, 7); c.fill(); c.strokeStyle = L('#e8d4ac'); c.lineWidth = 2; c.stroke(); c.restore(); }
    if (sal.flop) { const { cx, cy, R } = sal.R; c.fillStyle = L('#f4e2c0'); c.beginPath(); c.moveTo(cx - R * 1.5, cy + 4); c.quadraticCurveTo(cx, cy - R * 2.6, cx + R * 1.5, cy + 4); c.quadraticCurveTo(cx, cy - R * 1.4, cx - R * 1.5, cy + 4); c.fill(); }
    drawBench(c);
    drawTable(c, false);
    if (luca.alpha > 0.02) { c.fillStyle = 'rgba(0,0,0,0.15)'; ellipse(c, luca.hx, SF + 6, 24, 4); c.fill(); K.drawBody(c, luca, true); }
    const gs = guests(); for (const a of gs.filter((q) => q.state === 'stand')) { if (a.alpha > 0.05) { c.fillStyle = 'rgba(0,0,0,0.16)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    if (busker && busker.a) { const a = busker.a; if (a.alpha > 0.05) { c.fillStyle = 'rgba(0,0,0,0.16)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, false); c.globalAlpha = a.alpha; drawAccordion(c, a); K.drawArms(c, a); c.globalAlpha = 1; }
    const sit = gs.filter((q) => q.state !== 'stand'); for (const a of sit) K.drawBody(c, a, false); drawTable(c, true); for (const a of sit) { K.drawArms(c, a); c.globalAlpha = 1; }
    K.shafts(c, [[WIN.x0 + 80, WIN.x0 + 260, WIN.x0 - 60, WIN.x0 + 100, WIN.y1, 720], [WIN.x1 - 240, WIN.x1 - 70, WIN.x1 - 100, WIN.x1 + 90, WIN.y1, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  function onGone(Kk, a) { if (a.seat) a.seat.occ = null; if (busker && busker.a === a) busker = null; orders = orders.filter((o) => o.a !== a); }
  return GeoKit.stage({ id: 'pizzeria', pal: PizPal, startHour: 12, span: 11.5, build, sim, draw, onClear, onGone, font: '700 15px Georgia, serif', vign: 'rgba(30,12,6,0.35)',
    debug: () => ({ table: table.party ? table.party.members.map((m) => m.type).join('+') + ':' + table.party.stage + (table.party.bday ? ' bday' : '') : '-', pie: table.pie ? table.pie.kind.n + ' ' + table.pie.eaten + '/8' : '-', pz: pz ? pz.st : '-', ready: ready ? (ready.ord.take ? 'take' : 'table') + (ready.done ? '!' : '') : '-', orders: orders.length, glasses: table.glasses.map((g) => g.lv.toFixed(2)).join(' '), candle: table.candle, oven: oven.door ? 'closed' : oven.heat.toFixed(2), busker: !!busker, ape: !!ape, cat: !!cat, dessert: table.dessert ? table.dessert.frac.toFixed(1) : '-' }) });
}
registerStage('pizzeria', makeGeoPizzeriaStage);
