/* ================= World 9 · Night Market — GEOMETRIC edition (Raohe-style street after dark) =================
   Left: Auntie Lin's charcoal stall — she turns sausages with tongs, brushes on glaze, fans the coals, torches beef cubes
   with a blowtorch and hands a sausage in a paper sleeve across the counter. Right: Kai fries giant chicken cutlets (dredge,
   lower into the oil, bubbles, lift with the spider, drain, pepper, bag) and Mei pours winter-melon tea from the big kettle
   (cup fills, lid, straw). Calm centre: the street with lanterns and strings of bulbs. A few strollers drift through,
   some stop to buy and eat on the spot. Clock 17:00 -> 02:00, rain makes the tarps drip and brings out umbrellas. */
const NMPal = GeoKit.palette({
  dusk: { sky0: '#3a3a78', sky1: '#f08a5a', sun: '#ffc080', amb: '#ffd8c0', ambK: 0.04, shaft: '#ffb070', shaftA: 0.0, lamp: '#ffe2a0', glow: '#ffb860', glowA: 0.22,
    bld: '#4a3a52', bld2: '#3a2c44', win: '#ffd890', road: '#4a4248', road2: '#3e373e', tile: '#5a5058', tarpL: '#8a2a22', tarpR: '#2a5a5a', tarpEdge: '#f2e2c8', wood: '#8a5a3a', woodDk: '#5e3a24', steel: '#b8b8b4', steel2: '#8a8a86', steelDk: '#4a4a48', board: '#241a16', boardLit: '#ffe8c0', coal: '#ff7a2a', oil: '#d8a030', neon1: '#ff5a6a', neon2: '#5ae0d0', neon3: '#ffd040', lantern: '#e83a2a',
    skin: '#dca07c', bubble: '#fff6ea', ink: '#22181c', navy: '#26304a', coral: '#d85a44', mustard: '#d09a30', teal: '#2a7078', cream: '#ecdcc4', olive: '#5e6a3a', plum: '#5e3454', grey: '#8e8a8a', brown: '#5a3a28', white: '#f4ece0', dark: '#1c1618', hairGrey: '#ccc4bc', pink: '#e08a9a', blue: '#3a62a0', khaki: '#a89470', charcoal: '#3a3a3e', red: '#b8302a' },
  night: { sky0: '#0a0c22', sky1: '#1e1a3a', sun: '#f4ecd8', amb: '#e8dcf0', ambK: 0.1, shaft: '#c0d0ff', shaftA: 0.0, lamp: '#ffe6b0', glow: '#ffc070', glowA: 0.34,
    bld: '#1e1a2a', bld2: '#16121e', win: '#ffd080', road: '#2a2630', road2: '#232029', tile: '#36303a', tarpL: '#7a221c', tarpR: '#1e4a4a', tarpEdge: '#e8d6ba', wood: '#7a4e32', woodDk: '#4e301e', steel: '#a8a8a6', steel2: '#7a7a78', steelDk: '#3e3e3e', board: '#1c1412', boardLit: '#ffecc8', coal: '#ff6a1a', oil: '#d09828', neon1: '#ff4a5a', neon2: '#4ae8d8', neon3: '#ffd040', lantern: '#e8341f',
    skin: '#d49a76', bubble: '#fbf2e6', ink: '#1a1418', navy: '#222a42', coral: '#c8503e', mustard: '#c08c2c', teal: '#24646c', cream: '#e0d0b8', olive: '#525c34', plum: '#54304c', grey: '#7e7a7c', brown: '#4e3222', white: '#ece2d6', dark: '#161214', hairGrey: '#bcb4ae', pink: '#d07c8e', blue: '#345a94', khaki: '#9a8666', charcoal: '#343438', red: '#a82a24' },
  late: { sky0: '#06060e', sky1: '#12101e', sun: '#e8e0d0', amb: '#d8d4e8', ambK: 0.14, shaft: '#c0d0ff', shaftA: 0.0, lamp: '#ffe0a8', glow: '#ffb860', glowA: 0.3,
    bld: '#16141e', bld2: '#100e16', win: '#e8b870', road: '#221e26', road2: '#1c1a20', tile: '#2c2830', tarpL: '#6a1e1a', tarpR: '#1a4040', tarpEdge: '#dccaae', wood: '#6e462e', woodDk: '#462a1a', steel: '#9c9c9a', steel2: '#70706e', steelDk: '#383838', board: '#181210', boardLit: '#ffe4c0', coal: '#e85a18', oil: '#c08c24', neon1: '#e8404e', neon2: '#40d0c0', neon3: '#e8c03a', lantern: '#d0301c',
    skin: '#cc9470', bubble: '#f6ece0', ink: '#181216', navy: '#1e263c', coral: '#b8483a', mustard: '#b08028', teal: '#205a62', cream: '#d6c6ae', olive: '#4a5230', plum: '#4c2c44', grey: '#747072', brown: '#462e20', white: '#e2d8cc', dark: '#141012', hairGrey: '#b0a8a2', pink: '#c07284', blue: '#30528a', khaki: '#8e7c5e', charcoal: '#303034', red: '#9a2620' },
  rain: { road: '#26242e', road2: '#1e1c26' },
}, [[0, 'late'], [3, 'late'], [16, 'dusk'], [18.4, 'dusk'], [19.8, 'night'], [23.2, 'night'], [24.8, 'late'], [30, 'late']], { label: (h) => { h = ((h % 24) + 24) % 24; return h >= 16 && h < 19 ? 'Stalls opening' : h >= 19 && h < 23 ? 'Night market' : h >= 23 ? 'Late snack' : 'Closing up'; } });

function makeGeoNightMarketStage() {
  const CT = 520, SF = 640, SSC = 0.8, FL = 712, SC = 0.84;
  const GR = { x0: 108, x1: 214, y: 500 }, BEEF = { x: 58 }, SLEEVE = 244, COOL = 34;      // left stall
  const POT = { x: 1078 }, FLOUR = 1018, BAGS = 1122, CUPS = 1178, KETTLE = 1248;          // right stall
  const SPOT_L = 268, SPOT_R = 1146;
  let K, lin, kai, mei, sausages = [], beef = { sear: 0, n: 6 }, coals = 1, pot = { cut: null, bub: 0.2 }, board = null, cupFill = null, steamT = 0, nextStroll = 2, nextBuyer = 1.5, buyL = null, buyR = null, glaze = 0, fanT = 0, torchOn = 0, flourPuff = 0;
  const L = (h) => K.L(h), B = GeoKit.body;
  const H24 = () => ((K.hour % 24) + 24) % 24;
  const busy = () => { const h = H24(); return h >= 19 && h < 23 ? 1 : h >= 17.5 && h < 24 ? 0.6 : 0.3; };
  const custs = () => K.actors.filter((a) => a.cust);
  const wet = () => K.weatherNow === 'rain';
  /* ---------- props held in hands ---------- */
  function sausage(c, x, y, s, ang = 0, cook = 1, gl = 0) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); const col = cook > 0.6 ? '#9a3a22' : cook > 0.3 ? '#c45a3a' : '#e0907a'; c.fillStyle = L(col); roundRect(c, -15, -4, 30, 8, 4); c.fill(); c.fillStyle = 'rgba(40,10,0,0.45)'; if (cook > 0.4) for (let i = 0; i < 4; i++) c.fillRect(-10 + i * 6, -4, 1.6, 8); if (gl > 0.2 || cook > 0.6) { c.fillStyle = `rgba(255,220,180,${0.35 + gl * 0.3})`; c.fillRect(-12, -3, 22, 1.4); } c.restore(); }
  function sleeve(c, x, y, s, withS = 1) { c.save(); c.translate(x, y); c.scale(s, s); if (withS) sausage(c, 0, -14, 1, -Math.PI / 2, 1, 1); c.fillStyle = L('#f2e6cc'); K.poly(c, [-6, -10, 6, -10, 5, 8, -5, 8]); c.fill(); c.fillStyle = L('#b8302a'); c.fillRect(-6, -6, 12, 2); c.restore(); }
  function cutlet(c, x, y, s, cook = 1, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); c.fillStyle = L(cook > 0.6 ? '#c07a2a' : cook > 0.2 ? '#d8a050' : '#ecd8b4'); c.beginPath(); c.moveTo(-18, -2); c.quadraticCurveTo(-16, -9, -2, -8); c.quadraticCurveTo(14, -10, 19, -3); c.quadraticCurveTo(20, 4, 8, 5); c.quadraticCurveTo(-10, 7, -18, -2); c.fill(); if (cook > 0.3) { c.fillStyle = 'rgba(255,230,170,0.45)'; for (let i = 0; i < 7; i++) c.fillRect(-14 + i * 4.4, -6 + (i % 3) * 3, 2, 1.6); } c.restore(); }
  function paperBag(c, x, y, s, full = 1) { c.save(); c.translate(x, y); c.scale(s, s); if (full) cutlet(c, 0, -14, 0.7, 1, -Math.PI / 2.4); c.fillStyle = L('#f4ead6'); K.poly(c, [-9, -12, 9, -12, 8, 12, -8, 12]); c.fill(); c.fillStyle = 'rgba(200,120,40,0.25)'; c.beginPath(); c.arc(-2, 2, 4, 0, TAU); c.fill(); c.restore(); }
  function teaCup(c, x, y, s, lv = 1, lid = 1, straw = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(240,244,248,0.55)'; K.poly(c, [-7, -22, 7, -22, 5.5, 0, -5.5, 0]); c.fill(); if (lv > 0.02) { const top = -22 + 21 * (1 - lv); c.fillStyle = L('#b8782e'); K.poly(c, [-7 + (top + 22) * 0.07, top, 7 - (top + 22) * 0.07, top, 5.5, 0, -5.5, 0]); c.fill(); c.fillStyle = 'rgba(255,240,210,0.35)'; c.fillRect(-4, top + 2, 2, -top - 4); } if (lid) { c.fillStyle = 'rgba(250,250,250,0.85)'; c.fillRect(-7.5, -23.5, 15, 2); } if (straw) { c.fillStyle = L('#e8e0d0'); c.fillRect(1, -36, 2.2, 14); } c.restore(); }
  const H = {
    tongs: (item) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#a8a8a6'); c.lineWidth = 2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + a.f * 18 * s, y + 10 * s); c.moveTo(x, y + 2 * s); c.lineTo(x + a.f * 19 * s, y + 13 * s); c.stroke(); if (item) sausage(c, x + a.f * 20 * s, y + 13 * s, s * 0.95, 0, 1, 1); } }),
    brush: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#8a5a3a'); c.save(); c.translate(x, y); c.rotate(a.f * 0.9); c.fillRect(-1.2 * s, -2 * s, 2.4 * s, 16 * s); c.fillStyle = L('#7a2e14'); c.fillRect(-3 * s, 13 * s, 6 * s, 6 * s); c.restore(); } }),
    fan: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#e8d8a8'); c.save(); c.translate(x, y); c.rotate(Math.sin(K.t * 18) * 0.5); c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 16 * s, -2.4, -0.7); c.closePath(); c.fill(); c.fillStyle = L('#8a5a3a'); c.fillRect(-1, 0, 2, 7 * s); c.restore(); } }),
    torch: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#c8302a'); roundRect(c, x - 4 * s, y - 6 * s, 8 * s, 16 * s, 3 * s); c.fill(); c.fillStyle = L('#3a3a3a'); c.fillRect(x - 1.5 * s, y + 8 * s, 3 * s, 8 * s); if (torchOn > 0.2) { const fx = x, fy = y + 18 * s; c.fillStyle = 'rgba(120,170,255,0.85)'; K.poly(c, [fx - 3 * s, fy, fx + 3 * s, fy, fx, fy + 16 * s]); c.fill(); c.fillStyle = 'rgba(255,190,90,0.7)'; K.poly(c, [fx - 2 * s, fy + 8 * s, fx + 2 * s, fy + 8 * s, fx, fy + 22 * s]); c.fill(); K.glow(c, fx, fy + 18 * s, 30, '#ffb060', 0.5); } } }),
    raw: () => ({ draw(c, x, y, s) { sausage(c, x, y + 4 * s, s * 0.95, 0, 0, 0); } }),
    sleeve: () => ({ draw(c, x, y, s) { sleeve(c, x, y + 6 * s, s); } }),
    beefCup: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2e6cc'); K.poly(c, [x - 8 * s, y - 2 * s, x + 8 * s, y - 2 * s, x + 6 * s, y + 12 * s, x - 6 * s, y + 12 * s]); c.fill(); c.fillStyle = L('#6a2e18'); for (let i = 0; i < 4; i++) c.fillRect(x - 7 * s + i * 3.6 * s, y - 6 * s - (i % 2) * 2 * s, 3.4 * s, 4 * s); } }),
    rawCut: () => ({ draw(c, x, y, s) { cutlet(c, x + 4 * s, y + 6 * s, s * 0.9, 0); } }),
    spider: (item) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#8a5a3a'); c.lineWidth = 2.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + a.f * 20 * s, y + 8 * s); c.stroke(); c.strokeStyle = L('#c8c4b8'); c.lineWidth = 1; c.beginPath(); c.ellipse(x + a.f * 30 * s, y + 10 * s, 11 * s, 3 * s, 0, 0, TAU); c.stroke(); if (item) cutlet(c, x + a.f * 30 * s, y + 7 * s, s * 0.85, 1); } }),
    pepper: () => ({ draw(c, x, y, s) { c.fillStyle = L('#d8ccb0'); c.fillRect(x - 3 * s, y - 2 * s, 6 * s, 10 * s); c.fillStyle = L('#c8302a'); c.fillRect(x - 3 * s, y - 4 * s, 6 * s, 2.4 * s); } }),
    bag: () => ({ draw(c, x, y, s) { paperBag(c, x, y + 8 * s, s); } }),
    cup: (lid, straw) => ({ draw(c, x, y, s) { teaCup(c, x, y + 14 * s, s, cupFill ? cupFill.lv : 1, lid, straw); } }),
    tea: () => ({ draw(c, x, y, s) { teaCup(c, x, y + 14 * s, s, 0.9, 1, 1); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#e8e2d4'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    scoop: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c8ccd0'); K.poly(c, [x - 6 * s, y, x + 6 * s, y, x + 5 * s, y + 9 * s, x - 5 * s, y + 9 * s]); c.fill(); c.fillStyle = 'rgba(230,245,255,0.9)'; c.fillRect(x - 4 * s, y - 3 * s, 8 * s, 4 * s); } }),
    phone: () => ({ draw(c, x, y, s) { c.fillStyle = '#141414'; c.fillRect(x - 3.5 * s, y - 7 * s, 7 * s, 12 * s); c.fillStyle = L('#8ab8f0'); c.fillRect(x - 2.6 * s, y - 6 * s, 5.2 * s, 9 * s); } }),
    umbrella: (col) => ({ draw(c, x, y, s) { c.strokeStyle = L('#3a3a3a'); c.lineWidth = 1.6; c.beginPath(); c.moveTo(x, y + 6 * s); c.lineTo(x, y - 96 * s); c.stroke(); c.fillStyle = L(col); c.beginPath(); c.moveTo(x - 46 * s, y - 84 * s); c.quadraticCurveTo(x, y - 128 * s, x + 46 * s, y - 84 * s); for (let i = 0; i < 4; i++) c.quadraticCurveTo(x + 46 * s - (i + 0.5) * 23 * s, y - 90 * s, x + 46 * s - (i + 1) * 23 * s, y - 84 * s); c.fill(); } }),
  };
  /* ---------- vendors ---------- */
  function mkStaff() {
    lin = K.mk(B({ T: 232, hw: 60, headR: 28, pattern: 'apron', top: 'teal', top2: 'cream', pants: 'dark', hairStyle: 'bob', hair: 'hairGrey', sleeve: 'teal' }), { role: 'lin', staff: 1, hx: 160, f: 1, floorY: SF, sc: SSC, faceDir: 0.5 });
    kai = K.mk(B({ T: 244, hw: 64, headR: 28, pattern: 'apron', top: 'charcoal', top2: 'khaki', pants: 'dark', hairStyle: 'short', hair: 'dark', hat: 'beanie', hatCol: 'charcoal', shortSleeve: 1 }), { role: 'kai', staff: 1, hx: 1036, f: 1, floorY: SF, sc: SSC, faceDir: 0.5 });
    mei = K.mk(B({ T: 228, hw: 54, headR: 27, pattern: 'tee', top: 'mustard', pants: 'navy', hairStyle: 'pony', hair: 'dark', shortSleeve: 1 }), { role: 'mei', staff: 1, hx: 1214, f: -1, floorY: SF, sc: SSC * 0.97, faceDir: -0.5 });
    lin.think = linThink; kai.think = kaiThink; mei.think = meiThink;
  }
  const walk = (x) => K.ph(0, (s) => { s.walkTo = x; }, { until: (s) => !s.walking, max: 20 });
  const ready = () => sausages.filter((q) => q.cook > 0.75 && !q.flip);
  const waiting = (b, k) => b && b.phase === 'wait' && b.want === k && !b.served && K.actors.includes(b);
  function linThink(a) {
    if (waiting(buyL, 'sausage') && ready().length) return serveSausage(a, buyL);
    if (waiting(buyL, 'beef')) return torchBeef(a, buyL);
    if (sausages.length < 5) return restock(a);
    const r = Math.random();
    if (r < 0.35) return turn(a);
    if (r < 0.55) return K.start(a, 'brush', [walk(158), K.ph(rand(1.6, 2.4), (s, u, t) => { s.f = 1; s.hold.N = H.brush(); s.tgN = [GR.x0 + 14 + (Math.sin(t * 3) * 0.5 + 0.5) * (GR.x1 - GR.x0 - 28), GR.y - 14]; s.leanT = 0.14; glaze = Math.min(1, glaze + 0.01); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.72) return K.start(a, 'fan', [walk(150), K.ph(rand(1.6, 2.6), (s, u, t) => { s.f = 1; s.hold.N = H.fan(); s.tgN = [GR.x0 + 30 + Math.sin(t * 2) * 20, GR.y + 6]; s.leanT = 0.2; fanT = 1; if (Math.random() < 0.15) K.fx('spark', GR.x0 + 20 + Math.random() * 80, GR.y - 4, { life: 0.5, col: '#ffb040' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.82 && K.cooled(a, 'wipe', 12)) return K.start(a, 'wipe', [walk(200), K.ph(rand(1.4, 2.2), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [232 + Math.sin(t * 5) * 14, CT - 6]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [walk(160), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 18, CT - 8]; s.tgF = [s.hx + 6, CT - 8]; s.lxT = pick([0.6, 0.2, -0.4]); })]);
  }
  function turn(a) {
    const list = sausages.slice(0, 5), ph = [walk(158)];
    list.forEach((q) => ph.push(K.ph(0.42, (s, u) => { s.f = 1; s.hold.N = H.tongs(); s.tgN = [q.x - 18, GR.y - 10 - Math.sin(u * Math.PI) * 8]; s.leanT = 0.15; q.flip = u; }, { exit: () => { q.flip = 0; q.side = 1 - (q.side || 0); if (Math.random() < 0.5) K.fx('puff', q.x, GR.y - 8, { life: 0.8, col: '#d8d0c8' }); } })));
    K.start(a, 'turn', ph.concat([K.ph(0.2, null, { exit: (s) => { s.hold.N = null; } })]), { onAbort: (s) => { s.hold.N = null; for (const q of sausages) q.flip = 0; } });
  }
  function restock(a) {
    const slot = [0, 1, 2, 3, 4].map((i) => GR.x0 + 14 + i * 20).find((x) => !sausages.some((q) => Math.abs(q.x - x) < 4));
    if (slot == null) return turn(a);
    K.start(a, 'restock', [walk(96), K.ph(0.6, (s) => { s.f = -1; s.tgN = [COOL + 6, 560]; s.leanT = 0.3; }, { exit: (s) => { s.hold.N = H.raw(); } }), K.ph(0.4, (s) => { s.tgN = [COOL + 30, CT - 20]; s.leanT = 0.05; }), walk(140),
      K.ph(0.5, (s) => { s.f = 1; s.tgN = [slot - 2, GR.y - 8]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; sausages.push({ x: slot, cook: 0, flip: 0, side: 0 }); K.fx('puff', slot, GR.y - 6, { life: 0.9, col: '#ffffff' }); } })], { onAbort: (s) => { s.hold.N = null; } });
  }
  function serveSausage(a, b) {
    const q = ready()[0]; b.served = 1;
    K.start(a, 'serve', [walk(170), K.ph(0.5, (s) => { s.f = 1; s.hold.N = H.tongs(); s.tgN = [q.x - 18, GR.y - 12]; s.leanT = 0.15; }, { exit: (s) => { sausages = sausages.filter((z) => z !== q); s.hold.N = H.tongs(true); } }),
      K.ph(0.5, (s) => { s.tgN = [SLEEVE - 20, CT - 26]; }, { exit: (s) => { s.hold.N = H.sleeve(); } }),
      K.ph(0.7, (s) => { s.tgN = [SPOT_L - 34, CT - 14]; s.leanT = 0.18; }, { enter: () => { K.say(a, pick(['Here you go!', 'Hot, careful!', '來, 小心燙']), 1.2); b.reach = 1; }, exit: (s) => { s.hold.N = null; give(b, H.sleeve(), 'sausage'); } })],
      { onAbort: (s) => { s.hold.N = null; if (!b.got) give(b, H.sleeve(), 'sausage'); } });
  }
  function torchBeef(a, b) {
    b.served = 1;
    K.start(a, 'torch', [walk(84), K.ph(0.4, (s) => { s.f = -1; s.hold.N = H.torch(); s.tgN = [BEEF.x + 6, CT - 46]; s.leanT = 0.1; }, { exit: () => { torchOn = 1; } }),
      K.ph(2.2, (s, u, t) => { s.tgN = [BEEF.x + Math.sin(t * 5) * 12, CT - 44 + Math.sin(t * 9) * 2]; beef.sear = Math.min(1, beef.sear + 0.012); if (Math.random() < 0.25) K.fx('spark', BEEF.x + rand(-10, 10), CT - 14, { life: 0.35, col: '#ffc060' }); }, { exit: () => { torchOn = 0; } }),
      K.ph(0.5, (s) => { s.hold.N = null; s.tgN = [BEEF.x, CT - 12]; }, { exit: (s) => { s.hold.N = H.beefCup(); beef.sear = 0.1; } }),
      walk(200), K.ph(0.7, (s) => { s.f = 1; s.tgN = [SPOT_L - 34, CT - 14]; s.leanT = 0.18; }, { enter: () => { K.say(a, pick(['Torched beef!', 'Enjoy!']), 1.1); b.reach = 1; }, exit: (s) => { s.hold.N = null; give(b, H.beefCup(), 'beef'); } })],
      { onAbort: (s) => { s.hold.N = null; torchOn = 0; if (!b.got) give(b, H.beefCup(), 'beef'); } });
  }
  function kaiThink(a) {
    if (waiting(buyR, 'cutlet')) return fryCutlet(a, buyR);
    const r = Math.random();
    if (r < 0.4) return K.start(a, 'skim', [walk(1040), K.ph(rand(1.6, 2.6), (s, u, t) => { s.f = 1; s.hold.N = H.spider(); s.tgN = [POT.x - 30 + Math.sin(t * 3) * 8, CT - 30]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.65) return K.start(a, 'prep', [walk(1036), K.ph(rand(1.5, 2.4), (s, u, t) => { s.f = 1; s.tgN = [FLOUR + 4 + Math.sin(t * 7) * 3, CT - 10 + Math.abs(Math.sin(t * 7)) * 4]; s.tgF = [FLOUR - 6, CT - 8]; s.leanT = 0.2; if (Math.random() < 0.05) flourPuff = 1; })]);
    return K.start(a, 'idle', [walk(1036), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 20, CT - 8]; s.tgF = [s.hx + 8, CT - 8]; s.lxT = pick([0.6, -0.3, 0.3]); })]);
  }
  function fryCutlet(a, b) {
    b.served = 1;
    K.start(a, 'fry', [walk(1036), K.ph(0.5, (s) => { s.f = 1; s.tgN = [FLOUR, CT - 8]; s.leanT = 0.22; }, { exit: (s) => { s.hold.N = H.rawCut(); flourPuff = 1; } }),
      K.ph(0.8, (s, u, t) => { s.tgN = [FLOUR + 2, CT - 10 + Math.abs(Math.sin(t * 10)) * 4]; s.tgF = [FLOUR - 8, CT - 8]; }, { exit: () => { flourPuff = 1; } }),
      K.ph(0.5, (s) => { s.tgN = [POT.x - 22, CT - 34]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; pot.cut = { cook: 0 }; pot.bub = 1; K.fx('puff', POT.x, CT - 30, { life: 1, col: '#ffffff' }); } }),
      K.ph(2.6, (s, u, t) => { s.hold.N = H.spider(); s.tgN = [POT.x - 32 + Math.sin(t * 2.4) * 5, CT - 30]; pot.cut.cook = u; s.look = { x: () => POT.x, until: K.simT + 0.3 }; }),
      K.ph(0.5, (s) => { s.tgN = [POT.x - 30, CT - 32]; }, { exit: (s) => { s.hold.N = H.spider(true); pot.cut = null; pot.bub = 0.4; } }),
      K.ph(0.8, (s, u, t) => { s.tgN = [POT.x - 30, CT - 50 + (Math.sin(t * 24) > 0 ? -3 : 0)]; if (Math.random() < 0.2) K.fx('spark', POT.x, CT - 24, { life: 0.3, col: '#ffd060' }); }),
      K.ph(0.5, (s) => { s.tgN = [BAGS - 18, CT - 24]; }, { exit: (s) => { s.hold.N = H.pepper(); board = 1; } }),
      K.ph(0.8, (s, u, t) => { s.tgN = [BAGS - 14 + Math.sin(t * 20) * 3, CT - 40]; if (Math.random() < 0.3) K.fx('spark', BAGS - 4, CT - 18, { life: 0.25, col: '#d8c8a0' }); }, { exit: (s) => { s.hold.N = H.bag(); board = null; } }),
      K.ph(0.7, (s) => { s.tgN = [SPOT_R - 34, CT - 14]; s.leanT = 0.18; }, { enter: () => { K.say(a, pick(['Cutlet, hot!', 'Here, big one!', '雞排好了!']), 1.2); b.reach = 1; b.face = -1; }, exit: (s) => { s.hold.N = null; give(b, H.bag(), 'cutlet'); } })],
      { onAbort: (s) => { s.hold.N = null; pot.cut = null; board = null; if (!b.got) give(b, H.bag(), 'cutlet'); } });
  }
  function meiThink(a) {
    if (waiting(buyR, 'tea')) return pourTea(a, buyR);
    const r = Math.random();
    if (r < 0.35) return K.start(a, 'ice', [walk(1214), K.ph(rand(1.4, 2.2), (s, u, t) => { s.f = 1; s.hold.N = H.scoop(); s.tgN = [KETTLE - 20, CT - 12 - Math.abs(Math.sin(t * 4)) * 14]; s.leanT = 0.15; })], { onEnd: (s) => { s.hold.N = null; }, onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.55 && K.cooled(a, 'wipe', 10)) return K.start(a, 'wipe', [walk(1206), K.ph(rand(1.4, 2.2), (s, u, t) => { s.f = -1; s.hold.N = H.cloth(); s.tgN = [CUPS - 6 + Math.sin(t * 5) * 14, CT - 6]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [walk(1214), K.ph(rand(1.5, 3), (s) => { s.f = -1; s.tgN = [s.hx - 18, CT - 8]; s.tgF = [s.hx - 6, CT - 8]; s.lxT = pick([-0.6, -0.2, 0.4]); })]);
  }
  function pourTea(a, b) {
    b.served = 1;
    K.start(a, 'pour', [walk(1206), K.ph(0.5, (s) => { s.f = -1; s.tgN = [CUPS, CT - 18]; s.leanT = 0.1; }, { exit: (s) => { cupFill = { lv: 0 }; s.hold.N = H.cup(0, 0); } }),
      K.ph(0.5, (s) => { s.f = 1; s.tgN = [KETTLE - 16, CT - 36]; }),
      K.ph(1.6, (s, u) => { s.tgN = [KETTLE - 16, CT - 36]; s.tgF = [KETTLE - 12, CT - 62]; cupFill.lv = u; cupFill.pour = 1; }, { exit: () => { cupFill.pour = 0; } }),
      K.ph(0.5, (s, u, t) => { s.tgF = [KETTLE - 16, CT - 58 + Math.abs(Math.sin(t * 12)) * 4]; }, { exit: (s) => { s.hold.N = H.cup(1, 1); } }),
      K.ph(0.7, (s) => { s.f = -1; s.tgF = [s.hx - 6, CT - 8]; s.tgN = [SPOT_R + 34, CT - 14]; s.leanT = 0.18; }, { enter: () => { K.say(a, pick(['Winter melon tea!', 'Here, enjoy!']), 1.1); b.reach = 1; b.face = 1; }, exit: (s) => { s.hold.N = null; cupFill = null; give(b, H.tea(), 'tea'); } })],
      { onAbort: (s) => { s.hold.N = null; cupFill = null; if (!b.got) give(b, H.tea(), 'tea'); } });
  }
  function give(b, holder, k) { if (!K.actors.includes(b)) return; b.got = (b.got || 0) + 1; b.items = (b.items || []).concat(k); if (!b.hold.N) b.hold.N = holder; else b.hold.F = holder; b.reach = 0; b.served = 0; b.want = b.wants.shift() || null; if (!b.want) b.phase = 'eat'; }
  /* ---------- strollers & buyers ---------- */
  const TYPES = {
    student: { body: B({ T: 236, hw: 56, headR: 27, pattern: 'hoodie', top: 'olive', pants: 'dark', hairStyle: 'short', backpack: 1, packCol: 'charcoal' }), words: ['So good!', 'icon:heart'], phone: 1 },
    office: { body: B({ T: 244, hw: 60, headR: 27, pattern: 'suit', top: 'charcoal', shirt: 'white', tie: 'navy', pants: 'charcoal' }), words: ['Long day…', 'Finally food'] },
    auntie: { body: B({ T: 222, hw: 58, headR: 27, pattern: 'cardigan', top: 'plum', top2: 'cream', pants: 'dark', hairStyle: 'bob', hair: 'hairGrey' }), words: ['Smells good', 'Not too spicy'] },
    tourist: { body: B({ T: 240, hw: 58, headR: 27, pattern: 'jacket', top: 'khaki', pants: 'navy', hairStyle: 'short', hair: 'brown', camera: 1 }), words: ['Wow!', 'icon:cam'], photo: 1 },
    girl: { body: B({ T: 228, hw: 52, headR: 27, pattern: 'knit', top: 'cream', pants: 'blue', hairStyle: 'long', hair: 'dark' }), words: ['Yum!', 'icon:heart'], phone: 1 },
    grandpa: { body: B({ T: 230, hw: 58, headR: 27, pattern: 'vest', top: 'brown', shirt: 'cream', pants: 'grey', hat: 'cap', hatCol: 'charcoal', hair: 'hairGrey', glasses: 1 }), words: ['Like the old days', 'icon:note'] },
    couple: { body: B({ T: 232, hw: 54, headR: 27, pattern: 'coat', top: 'teal', pants: 'dark', hairStyle: 'bob', hair: 'brown' }), words: ['Share?', 'icon:heart'] },
  };
  const UMB = ['#2a4a6a', '#6a2a3a', '#3a5a3a', '#e8e0d0', '#2a2a2e'];
  function mkCust(type, x, f) {
    const T0 = TYPES[type]; const a = K.mk(Object.assign({}, T0.body), { type, T0, cust: 1, hx: x, f, floorY: FL - 6, sc: SC, alpha: 0, fade: 1.4, speed: rand(0.75, 0.95) });
    if (wet() && Math.random() < 0.8) { a.umb = pick(UMB); a.hold.F = H.umbrella(a.umb); }
    a.think = custThink; return a;
  }
  function spawnStroller() {
    const n = custs().length; if (n >= 4 || custs().filter((q) => !q.buyer).length >= 2) return;
    const fromL = Math.random() < 0.5, a = mkCust(pick(Object.keys(TYPES)), fromL ? -70 : 1340, fromL ? 1 : -1);
    a.phase = 'stroll'; a.walkTo = fromL ? 1350 : -80; const side = fromL ? 'L' : 'R'; a.stopAt = Math.random() < 0.5 && !(side === 'L' ? buyL : buyR) ? (side === 'L' ? SPOT_L - 8 : SPOT_R + 8) : null; // only browse a stall nobody is buying at
    if (a.stopAt != null) a.walkTo = a.stopAt;
  }
  function spawnBuyer() {
    if (custs().length >= 4) return;
    const side = !buyL && (buyR || Math.random() < 0.5) ? 'L' : !buyR ? 'R' : null; if (!side) return;
    const type = pick(Object.keys(TYPES)), fromCentre = Math.random() < 0.6;
    const x0 = side === 'L' ? (fromCentre ? 420 : -70) : (fromCentre ? 880 : 1340), f = side === 'L' ? (fromCentre ? -1 : 1) : (fromCentre ? 1 : -1);
    const a = mkCust(type, x0, f); a.umb = null; a.hold.F = null; a.buyer = side; a.phase = 'toStall';
    if (side === 'L') { buyL = a; a.wants = [Math.random() < 0.7 ? 'sausage' : 'beef']; a.walkTo = SPOT_L; }
    else { buyR = a; const r = Math.random(); a.wants = r < 0.45 ? ['cutlet', 'tea'] : r < 0.75 ? ['cutlet'] : ['tea']; a.walkTo = SPOT_R; }
    a.want = null;
  }
  function custThink(a) {
    if (a.walking || a.walkTo != null) return;
    if (a.phase === 'stroll') {
      if (a.stopAt != null) { const sx = a.stopAt; a.stopAt = null; const goal = a.f > 0 ? 1350 : -80;
        if (a.T0.photo && !a.umb) return K.start(a, 'photo', [K.ph(1.6, (s) => { s.f = sx < 640 ? -1 : 1; s.hold.N = H.phone(); s.tgN = [s.R.cx + s.f * 26, s.R.cy + 6]; s.lxT = s.f * 0.6; }, { exit: (s) => { K.fx('flash', s.R.cx + s.f * 26, s.R.cy + 6, { life: 0.3 }); s.hold.N = null; } })], { onEnd: (s) => { s.walkTo = goal; }, onAbort: (s) => { s.hold.N = null; s.walkTo = goal; } });
        return K.start(a, 'look', [K.ph(rand(1.6, 2.8), (s) => { s.lxT = sx < 640 ? -0.7 : 0.7; s.headDy = -1; }, { exit: (s) => { s.headDy = 0; } })], { onEnd: (s) => { s.walkTo = goal; }, onAbort: (s) => { s.walkTo = goal; } }); }
      a.fade = -2; return;
    }
    if (a.phase === 'toStall') { a.phase = 'wait'; a.want = a.wants.shift(); K.say(a, sayOrder(a.want), 1.3); return; }
    if (a.phase === 'wait') {
      const vend = a.buyer === 'L' ? lin : a.want === 'tea' ? mei : kai; a.f = vend.hx < a.hx ? -1 : 1;
      if (a.reach) return K.start(a, 'reach', [K.ph(0.5, (s) => { s.f = vend.hx < s.hx ? -1 : 1; if (s.hold.N) s.tgF = [s.hx + s.f * 30, CT - 12]; else s.tgN = [s.hx + s.f * 30, CT - 12]; s.leanT = 0.08; })]);
      return K.start(a, 'wait', [K.ph(rand(1, 2), (s) => { s.lxT = s.f * 0.6; s.tgN = [s.hx + s.f * 12, s.hy - 2]; })]);
    }
    if (a.phase === 'eat') {
      a.bites = (a.bites || 0) + 1;
      if (a.bites > 3) { a.phase = 'leave'; if (a.buyer === 'L') buyL = null; else buyR = null; const goL = a.hx < 640 ? Math.random() < 0.5 : Math.random() < 0.3; a.f = goL ? -1 : 1; a.walkTo = a.hx < 640 ? (goL ? -80 : 430) : (goL ? 860 : 1350); K.say(a, pick(['謝謝!', 'Thanks!', 'icon:heart']), 1); return; }
      const near = a.hold.N, cupF = a.hold.F && a.items && a.items.includes('tea');
      if (cupF && Math.random() < 0.5) return K.start(a, 'sip', [K.ph(0.6, (s) => { s.tgF = [s.R.cx + s.f * s.R.R * 0.55, s.R.cy + s.R.R * 0.9]; s.headDy = 1; }), K.ph(0.8, null, { exit: (s) => { s.headDy = 0; } }), K.ph(0.5, (s) => { s.tgF = [s.hx + s.f * 14, s.hy - 30]; })]);
      return K.start(a, 'bite', [K.ph(0.5, (s) => { s.f = s.hx < 640 ? 1 : -1; s.tgN = [s.R.cx + s.f * s.R.R * 0.5, s.R.cy + s.R.R * 0.6]; s.leanT = 0.04; }),
        K.ph(rand(0.8, 1.2), (s, u, t) => { s.headDy = Math.abs(Math.sin(t * 9)) * 1.4; }, { exit: (s) => { s.headDy = 0; if (Math.random() < 0.4) K.say(a, pick(a.T0.words.concat(['好吃!'])), 1); } }),
        K.ph(rand(1, 2), (s) => { s.tgN = [s.hx + s.f * 18, s.hy - 26]; s.lxT = pick([-0.4, 0.4]); })], { onAbort: (s) => { s.headDy = 0; } });
    }
    if (a.phase === 'leave') a.fade = -2;
  }
  const sayOrder = (k) => ({ sausage: pick(['One sausage, please', '一支香腸']), beef: pick(['Torched beef, please', '炙燒牛肉']), cutlet: pick(['One cutlet!', '雞排一份']), tea: pick(['Winter melon tea', '冬瓜茶']) })[k];
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    const b = busy();
    nextStroll -= dt; if (nextStroll <= 0) { spawnStroller(); nextStroll = rand(5, 10) / b; }
    nextBuyer -= dt; if (nextBuyer <= 0) { spawnBuyer(); nextBuyer = rand(5, 9) / b; }
    for (const q of sausages) q.cook = Math.min(1, q.cook + dt * 0.035 * (1 + fanT * 0.5));
    fanT = Math.max(0, fanT - dt * 0.6); glaze = Math.max(0, glaze - dt * 0.01); flourPuff = Math.max(0, flourPuff - dt * 1.5);
    pot.bub = pot.cut ? 1 : Math.max(0.2, pot.bub - dt * 0.3); steamT += dt;
    for (const a of custs()) if (a.phase === 'wait' && a.want && !a.served && !a.reach) { a.waitT = (a.waitT || 0) + dt; }
  }
  function onClear(Kk, big) {
    const near = custs().filter((a) => a.alpha > 0.8); if (near.length) K.say(pick(near), big ? pick(['哇!', 'Woo!', 'icon:star']) : pick(['Nice!', 'icon:heart']), 1.1);
    K.say(pick([lin, kai, mei]), big ? pick(['好!', 'icon:star']) : 'icon:note', 1); if (big) { coals = 1.4; K.fx('spark', GR.x0 + 50, GR.y - 10, { life: 0.8, col: '#ffc040' }); }
  }
  function build(Kk) { K = Kk; mkStaff(); for (let i = 0; i < 5; i++) sausages.push({ x: GR.x0 + 14 + i * 20, cook: 0.3 + i * 0.15, flip: 0, side: i % 2 }); nextBuyer = 0.6; nextStroll = 1.5; }
  function onGone(Kk, a) { if (a === buyL) buyL = null; if (a === buyR) buyR = null; }
  /* ---------- drawing ---------- */
  function drawBackdrop(c, t) {
    const P = K.P;
    K.sky(c, -60, 0, 1340, 420, { sunR: 14 });
    // far buildings with lit windows + vertical neon signs
    const blds = [[-40, 120, 150], [104, 70, 120], [220, 150, 140], [356, 96, 170], [520, 130, 150], [668, 84, 160], [826, 140, 140], [962, 64, 150], [1110, 120, 170], [1278, 90, 120]];
    for (const [x, top, w] of blds) { c.fillStyle = P.bld; c.fillRect(x, top, w, 420 - top); c.fillStyle = P.bld2; c.fillRect(x + w - 10, top, 10, 420 - top);
      for (let r = 0; r < 8; r++) for (let k = 0; k < 4; k++) if (((x + r * 7 + k * 13) % 5) < 2) { c.fillStyle = rgba(P.win, 0.55 + ((r + k) % 3) * 0.12); c.fillRect(x + 12 + k * (w - 30) / 4, top + 16 + r * 30, 12, 12); } }
    neonSign(c, 64, 160, ['夜', '市'], P.neon1, t, 0); neonSign(c, 1184, 150, ['小', '吃'], P.neon2, t, 1.7); neonSign(c, 460, 190, ['飲', '料'], P.neon3, t, 0.6); neonSign(c, 820, 170, ['燒', '烤'], P.neon1, t, 2.4);
    // street canopy of bulbs, swagged between poles
    for (const [x0, x1, y] of [[-60, 400, 52], [400, 880, 58], [880, 1340, 52]]) { c.strokeStyle = rgba(P.ink, 0.6); c.lineWidth = 1.2; c.beginPath(); c.moveTo(x0, y); c.quadraticCurveTo((x0 + x1) / 2, y + 46, x1, y); c.stroke();
      for (let i = 1; i < 12; i++) { const u = i / 12, bx = lerp(x0, x1, u), by = y + 46 * 2 * u * (1 - u) * 1.0 + 3; c.fillStyle = P.lamp; c.beginPath(); c.arc(bx, by, 3, 0, TAU); c.fill(); K.glow(c, bx, by, 18, P.glow, P.glowA * 0.8); } }
    // street: tiles + puddle reflections when wet
    c.fillStyle = P.road; c.fillRect(-60, 640, 1400, 140 + K.extraB); c.fillStyle = P.road2; for (let r = 0; r < 5; r++) c.fillRect(-60, 646 + r * 24, 1400, 1.5); for (let i = 0; i < 30; i++) c.fillRect(-60 + i * 52 + 18, 646, 1.5, 120);
    if (wet()) { c.save(); c.globalCompositeOperation = 'screen'; for (const [x, col] of [[150, P.coal], [64, P.neon1], [1184, P.neon2], [1100, P.lamp], [240, P.lamp]]) { c.fillStyle = rgba(col, 0.12); K.poly(c, [x - 16, 650, x + 16, 650, x + 26, 760, x - 26, 760]); c.fill(); } c.restore(); }
  }
  function neonSign(c, x, y, chars, col, t, ph) {
    const P = K.P, flick = 0.85 + 0.15 * Math.sin(t * 3 + ph) * (Math.sin(t * 17 + ph) > 0.97 ? -3 : 1);
    c.fillStyle = P.board; roundRect(c, x - 22, y - 8, 44, 30 + chars.length * 40, 6); c.fill(); c.strokeStyle = rgba(col, 0.9 * flick); c.lineWidth = 2; roundRect(c, x - 18, y - 4, 36, 22 + chars.length * 40, 5); c.stroke();
    c.fillStyle = rgba(col, flick); c.font = '900 30px "Noto Sans JP", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; chars.forEach((ch, i) => c.fillText(ch, x, y + 26 + i * 40));
    K.glow(c, x, y + 20 + chars.length * 20, 70, col, 0.22 * flick);
  }
  function canopy(c, x0, x1, col, label, sub) {
    const P = K.P; c.fillStyle = P.woodDk; c.fillRect(x0 + 4, 196, 7, 460); c.fillRect(x1 - 11, 196, 7, 460);
    c.fillStyle = L(col); K.poly(c, [x0 - 10, 214, x0 + 10, 186, x1 - 10, 186, x1 + 10, 214]); c.fill();
    c.fillStyle = shade(col, -0.18); for (let i = 0; i < Math.ceil((x1 - x0 + 20) / 26); i++) { const sx = x0 - 10 + i * 26; c.beginPath(); c.moveTo(sx, 214); c.quadraticCurveTo(sx + 13, 228, sx + 26, 214); c.fill(); }
    c.fillStyle = rgba(P.tarpEdge, 0.85); c.fillRect(x0 - 10, 212, x1 - x0 + 20, 3);
    if (wet()) { c.fillStyle = 'rgba(200,220,255,0.55)'; for (let i = 0; i < 9; i++) { const dx = x0 + 10 + i * (x1 - x0 - 20) / 8, dy = 232 + ((K.t * 160 + i * 47) % 120); c.fillRect(dx, dy, 1.4, 7); } }
    // signboard
    c.fillStyle = P.board; roundRect(c, x0 + 22, 228, x1 - x0 - 44, 42, 5); c.fill(); c.fillStyle = P.boardLit; c.font = '900 22px "Noto Sans JP", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, (x0 + x1) / 2, 245); c.font = '700 9px "Helvetica Neue", Arial, sans-serif'; c.fillStyle = rgba(P.boardLit, 0.75); c.fillText(sub, (x0 + x1) / 2, 263);
    // bare bulbs
    for (const bx of [x0 + 40, x1 - 40]) { c.strokeStyle = P.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(bx, 270); c.lineTo(bx, 292); c.stroke(); c.fillStyle = P.lamp; c.beginPath(); c.arc(bx, 297, 6, 0, TAU); c.fill(); K.glow(c, bx, 300, 120, P.glow, P.glowA + 0.12); }
  }
  function lantern(c, x, y, s, t) { const P = K.P, sw = Math.sin(t * 1.2 + x) * 0.05; c.save(); c.translate(x, y); c.rotate(sw); c.strokeStyle = P.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(0, -14 * s); c.lineTo(0, -4 * s); c.stroke(); c.fillStyle = P.lantern; c.beginPath(); c.ellipse(0, 12 * s, 13 * s, 16 * s, 0, 0, TAU); c.fill(); c.fillStyle = shade(P.lantern, -0.25); c.fillRect(-7 * s, -4 * s, 14 * s, 3 * s); c.fillRect(-7 * s, 27 * s, 14 * s, 3 * s); c.restore(); K.glow(c, x, y + 12 * s, 40 * s, '#ff7040', 0.35); }
  function stallL(c, t, front) {
    const P = K.P;
    if (!front) {
    canopy(c, 14, 292, P.tarpL, '炭烤香腸', 'CHARCOAL SAUSAGE · TORCHED BEEF');
    c.fillStyle = shade(P.woodDk, -0.1); c.fillRect(24, 300, 258, 220); // back shelf
    c.fillStyle = P.wood; c.fillRect(24, 360, 258, 5); c.fillRect(24, 430, 258, 5);
    for (let i = 0; i < 6; i++) { c.fillStyle = L(['#8a2a1a', '#d8a030', '#3a2a1a', '#c8c0a8', '#7a3a1a', '#2a4a2a'][i]); c.fillRect(40 + i * 38, 334, 14, 26); c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(42 + i * 38, 336, 3, 20); }
    c.fillStyle = L('#d8c8a0'); for (let i = 0; i < 14; i++) c.fillRect(60 + i * 3, 396, 1.4, 34); c.fillStyle = L('#c8302a'); c.fillRect(56, 412, 48, 6);
    lantern(c, 230, 394, 0.9, t);
    return; }
    // counter
    c.fillStyle = P.wood; c.fillRect(10, CT, 286, 8); c.fillStyle = P.woodDk; c.fillRect(10, CT + 8, 286, 132); c.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 6; i++) c.fillRect(22 + i * 48, CT + 18, 2, 112);
    c.fillStyle = L('#c8302a'); c.fillRect(30, CT + 40, 246, 34); c.fillStyle = L('#ffe8c0'); c.font = '900 18px "Noto Sans JP", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('香腸 $50 · 牛肉 $100', 153, CT + 57);
    // charcoal grill with glowing coals
    const glow = 0.55 + 0.25 * Math.sin(t * 2.3) + fanT * 0.4;
    c.fillStyle = P.steelDk; c.fillRect(GR.x0 - 6, GR.y, GR.x1 - GR.x0 + 12, CT - GR.y); c.fillStyle = rgba(P.coal, Math.min(1, glow)); c.fillRect(GR.x0 - 2, GR.y + 3, GR.x1 - GR.x0 + 4, 7); K.glow(c, (GR.x0 + GR.x1) / 2, GR.y, 90, P.coal, 0.25 * glow * coals);
    c.strokeStyle = P.steel2; c.lineWidth = 1; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(GR.x0 + i * 9, GR.y - 1); c.lineTo(GR.x0 + i * 9, GR.y + 2); c.stroke(); } c.fillStyle = P.steel; c.fillRect(GR.x0 - 4, GR.y - 2, GR.x1 - GR.x0 + 8, 2);
    for (const q of sausages) { const lift = Math.sin(q.flip * Math.PI) * 8; sausage(c, q.x, GR.y - 6 - lift, 0.62, Math.PI / 2 + q.flip * Math.PI, q.cook, glaze); }
    if (sausages.length) { c.fillStyle = 'rgba(220,215,210,0.10)'; for (let i = 0; i < 3; i++) { const u = (t * 0.35 + i / 3) % 1; c.beginPath(); c.arc(GR.x0 + 30 + i * 26 + Math.sin(t + i) * 6, GR.y - 20 - u * 110, 8 + u * 16, 0, TAU); c.fill(); } }
    // beef cubes + cooler + sleeves
    c.fillStyle = P.steel2; c.fillRect(BEEF.x - 22, CT - 6, 44, 6); for (let i = 0; i < beef.n; i++) { c.fillStyle = L(beef.sear > 0.5 ? '#6a2e18' : beef.sear > 0.2 ? '#9a4a2a' : '#c4504a'); c.fillRect(BEEF.x - 18 + (i % 3) * 13, CT - 13 - Math.floor(i / 3) * 6, 10, 7); }
    if (torchOn) K.glow(c, BEEF.x, CT - 14, 50, '#ffb060', 0.4);
    c.fillStyle = L('#d8e0e8'); c.fillRect(COOL - 18, CT - 26, 30, 26); c.fillStyle = L('#3a6ac8'); c.fillRect(COOL - 18, CT - 26, 30, 6);
    c.fillStyle = L('#f2e6cc'); for (let i = 0; i < 4; i++) c.fillRect(SLEEVE - 8 + i, CT - 16 + i * 0.5, 12, 16 - i * 0.5);
  }
  function stallR(c, t, front) {
    const P = K.P;
    if (!front) {
    canopy(c, 992, 1272, P.tarpR, '雞排 · 冬瓜茶', 'FRIED CUTLET · WINTER MELON TEA');
    c.fillStyle = shade(P.woodDk, -0.1); c.fillRect(1000, 300, 266, 220); c.fillStyle = P.wood; c.fillRect(1000, 380, 266, 5);
    lantern(c, 1150, 330, 0.9, t);
    c.fillStyle = L('#f4ead6'); for (let i = 0; i < 5; i++) c.fillRect(1020 + i * 18, 352, 14, 28); c.fillStyle = L('#c8a070'); for (let i = 0; i < 3; i++) c.fillRect(1196 + i * 20, 348, 16, 32);
    return; }
    c.fillStyle = P.wood; c.fillRect(992, CT, 280, 8); c.fillStyle = P.woodDk; c.fillRect(992, CT + 8, 280, 132); c.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 6; i++) c.fillRect(1004 + i * 48, CT + 18, 2, 112);
    c.fillStyle = L('#f2e6cc'); c.fillRect(1010, CT + 40, 250, 34); c.fillStyle = L('#2a2018'); c.font = '900 18px "Noto Sans JP", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('雞排 $90 · 冬瓜茶 $30', 1135, CT + 57);
    // flour tray
    c.fillStyle = P.steel2; c.fillRect(FLOUR - 20, CT - 6, 40, 6); c.fillStyle = L('#f2ead8'); ellipse(c, FLOUR, CT - 6, 18, 3); c.fill(); if (flourPuff > 0.05) { c.fillStyle = `rgba(250,246,236,${0.5 * flourPuff})`; c.beginPath(); c.arc(FLOUR, CT - 14 - (1 - flourPuff) * 16, 8 + (1 - flourPuff) * 10, 0, TAU); c.fill(); }
    // oil pot on a burner
    c.fillStyle = P.steelDk; c.fillRect(POT.x - 26, CT - 10, 52, 10); c.fillStyle = rgba('#60a0ff', 0.6); c.fillRect(POT.x - 18, CT - 4, 36, 2);
    c.fillStyle = P.steel; K.poly(c, [POT.x - 28, CT - 40, POT.x + 28, CT - 40, POT.x + 24, CT - 10, POT.x - 24, CT - 10]); c.fill(); c.fillStyle = L(P.oil); ellipse(c, POT.x, CT - 40, 27, 4); c.fill();
    if (pot.cut) cutlet(c, POT.x, CT - 41, 0.9, pot.cut.cook);
    c.fillStyle = 'rgba(255,240,190,0.9)'; for (let i = 0; i < 4 + pot.bub * 8; i++) { const bx = POT.x - 22 + ((i * 11 + t * 30) % 44); c.beginPath(); c.arc(bx, CT - 40 + Math.sin(t * 9 + i) * 1.4, 1 + pot.bub * 1.2, 0, TAU); c.fill(); }
    if (pot.bub > 0.5) { c.fillStyle = 'rgba(230,230,230,0.12)'; for (let i = 0; i < 3; i++) { const u = (t * 0.6 + i / 3) % 1; c.beginPath(); c.arc(POT.x - 10 + i * 10, CT - 50 - u * 90, 6 + u * 14, 0, TAU); c.fill(); } }
    // bags + board
    c.fillStyle = L('#f4ead6'); for (let i = 0; i < 3; i++) c.fillRect(BAGS - 6 + i, CT - 14, 14, 14); if (board) cutlet(c, BAGS - 14, CT - 4, 0.8, 1);
    // cups + the big tea urn
    for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(240,244,248,0.6)'; c.fillRect(CUPS - 6, CT - 6 - i * 5, 12, 5); }
    const kx = KETTLE; c.fillStyle = L('#c8a050'); roundRect(c, kx - 22, CT - 112, 44, 112, 8); c.fill(); c.fillStyle = 'rgba(255,255,255,0.2)'; c.fillRect(kx - 16, CT - 104, 5, 96); c.fillStyle = L('#a88038'); c.fillRect(kx - 24, CT - 116, 48, 8);
    c.fillStyle = P.board; c.fillRect(kx - 14, CT - 90, 28, 20); c.fillStyle = P.boardLit; c.font = '900 11px "Noto Sans JP", sans-serif'; c.textAlign = 'center'; c.fillText('冬瓜', kx, CT - 80);
    c.fillStyle = L('#6a6a6a'); c.fillRect(kx - 24, CT - 58, 8, 5); c.fillRect(kx - 22, CT - 53, 3, 5);
    if (cupFill && cupFill.pour) { c.fillStyle = L('#b8782e'); c.fillRect(kx - 22, CT - 48, 2, 12); }
  }
  function draw(c, t) {
    const P = K.P;
    drawBackdrop(c, t);
    // distant stalls in the centre (calm, under the ZoneMask)
    for (const [x, col] of [[360, P.tarpR], [560, P.tarpL], [760, P.tarpR]]) { c.fillStyle = L(col); K.poly(c, [x, 300, x + 170, 300, x + 180, 322, x - 10, 322]); c.fill(); c.fillStyle = shade(P.woodDk, -0.1); c.fillRect(x + 6, 322, 158, 200); c.fillStyle = P.wood; c.fillRect(x, 520, 170, 120); K.glow(c, x + 85, 360, 120, P.glow, P.glowA); }
    for (const x of [330, 520, 700, 880]) lantern(c, x, 250, 0.8, t);
    stallL(c, t, 0); stallR(c, t, 0);
    for (const a of [lin, kai, mei]) { c.fillStyle = 'rgba(0,0,0,0.08)'; ellipse(c, a.hx - 16, a.hy - 50, 30, 80); c.fill(); K.drawBody(c, a, false); K.drawArms(c, a); }
    stallL(c, t, 1); stallR(c, t, 1);
    const cs = custs().sort((p, q) => p.floorY - q.floorY);
    for (const a of cs) { if ((a.alpha ?? 1) > 0.05) { c.fillStyle = `rgba(0,0,0,${0.22 * (a.alpha ?? 1)})`; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    K.weather(c, -60, 0, 1340, 760);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  return GeoKit.stage({ id: 'nightmarket', pal: NMPal, startHour: 17, span: 9, build, sim, draw, onClear, onGone, grain: 0.1, font: '700 15px "Noto Sans JP", "Helvetica Neue", sans-serif', vign: 'rgba(8,4,14,0.42)', zone: 'rgba(14,10,18,0.6)',
    debug: () => ({ L: buyL ? buyL.type + ':' + buyL.phase + '/' + buyL.want : '-', R: buyR ? buyR.type + ':' + buyR.phase + '/' + buyR.want : '-', saus: sausages.map((q) => q.cook.toFixed(1)).join(','), n: custs().length }) });
}
registerStage('nightmarket', makeGeoNightMarketStage);
