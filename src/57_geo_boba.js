/* ================= World 10 · Boba — GEOMETRIC edition (手搖飲 tea bar, the fun showpiece) =================
   Right: customers study the big flavour board, point and pick (taro? brown sugar? half sugar!), Ben rings it up and a ticket
   prints over on the left. Left: Yuki builds every cup by hand — ladles pearls that drop and bounce into the cup, pours tea
   into the shaker and shakes it hard, tops the cup, sets it in the sealing machine (lever down, film presses with a ka-chunk),
   flips the sealed cup to mix and rings the pickup bell. The guest collects at the pickup shelf, stabs the straw (pop!) and
   takes that first sip. Calm centre: the shop window. Clock 11:00 -> 23:00, rain outside, never snow. */
const BobaPal = GeoKit.palette({
  noon: { wall: '#e8e2d2', wall2: '#d8d0bc', sage: '#a8b89a', sage2: '#8a9a7c', wood: '#b08560', woodDk: '#7a5638', board: '#2a2622', boardLit: '#fbf4e6', steel: '#c4c6c4', steel2: '#9a9c9a', steelDk: '#5a5c5a', floor: '#cfc2ac', floor2: '#bfb19a', neon: '#ff8aa8', glass: '#cfe0e4',
    sky0: '#7ab4e0', sky1: '#dcecf4', out1: '#a8a4a0', outRoad: '#8a8a8c', lamp: '#fff2d4', glow: '#ffe8b8', glowA: 0.06, shaft: '#fff8e8', shaftA: 0.16, amb: '#ffffff', ambK: 0, sun: '#fffbe8',
    skin: '#e4ac88', bubble: '#ffffff', ink: '#221e1c', navy: '#2a3450', coral: '#e06a52', mustard: '#d8a438', teal: '#2e7a80', cream: '#f0e6d4', olive: '#66763e', plum: '#6a3e66', grey: '#9a9898', brown: '#5c3e2c', white: '#faf6f0', dark: '#1e1c1c', hairGrey: '#d4d0cc', pink: '#e898a8', blue: '#4a7ab8', khaki: '#b0a078', charcoal: '#3a3a3e', red: '#c03a30', lilac: '#a890c0', mint: '#9ac8b0' },
  afternoon: { wall: '#ebe2ce', wall2: '#dccfb6', sage: '#a8b496', sage2: '#8a9678', wood: '#b28458', woodDk: '#7a5434', board: '#2a2420', boardLit: '#fbf2e2', steel: '#c4c4c0', steel2: '#9a9a96', steelDk: '#5a5a56', floor: '#d0c0a6', floor2: '#c0ae94', neon: '#ff8aa8', glass: '#d8e2dc',
    sky0: '#8ab0d8', sky1: '#f4e4c8', out1: '#a8a098', outRoad: '#8a8684', lamp: '#fff0cc', glow: '#ffe0a8', glowA: 0.08, shaft: '#ffe8c0', shaftA: 0.2, amb: '#fff4e8', ambK: 0.02, sun: '#fff0c8',
    skin: '#e2a884', bubble: '#fffaf2', ink: '#221c1a', navy: '#2a3250', coral: '#de6650', mustard: '#d6a036', teal: '#2c7680', cream: '#efe2cc', olive: '#64723c', plum: '#683c62', grey: '#989494', brown: '#5a3c2a', white: '#f8f2e8', dark: '#1e1a1a', hairGrey: '#d2ccc6', pink: '#e694a4', blue: '#4876b4', khaki: '#ae9c74', charcoal: '#3a3838', red: '#be382e', lilac: '#a68cbc', mint: '#98c4ac' },
  dusk: { wall: '#e2cfb4', wall2: '#d2bc9e', sage: '#98a486', sage2: '#7c886a', wood: '#a8784e', woodDk: '#704a2e', board: '#241e1c', boardLit: '#fff0dc', steel: '#bcb4ae', steel2: '#928a84', steelDk: '#544c48', floor: '#c4ae90', floor2: '#b29a7c', neon: '#ff7a9a', glass: '#c8b8b8',
    sky0: '#5a5a9a', sky1: '#ffa070', out1: '#6a6670', outRoad: '#5a5660', lamp: '#ffe2a8', glow: '#ffc880', glowA: 0.22, shaft: '#ffb070', shaftA: 0.22, amb: '#ffd8b4', ambK: 0.05, sun: '#ffc080',
    skin: '#d89c78', bubble: '#fff4e6', ink: '#24181c', navy: '#26304a', coral: '#d45c46', mustard: '#cc9632', teal: '#286c76', cream: '#e8d6be', olive: '#5c6638', plum: '#62385a', grey: '#8e8686', brown: '#543624', white: '#f2e6d8', dark: '#1a1618', hairGrey: '#c8beb4', pink: '#dc8a9a', blue: '#4068a8', khaki: '#a28e68', charcoal: '#363234', red: '#b2342a', lilac: '#9c84b0', mint: '#8ab8a0' },
  night: { wall: '#d4c6b0', wall2: '#c4b49a', sage: '#8a9878', sage2: '#6e7c5e', wood: '#9a6e48', woodDk: '#64422a', board: '#1e1a18', boardLit: '#fff2dc', steel: '#aeb0b0', steel2: '#828484', steelDk: '#464848', floor: '#b8a68a', floor2: '#a69274', neon: '#ff6a90', glass: '#2a3040',
    sky0: '#0a0e24', sky1: '#1a2040', out1: '#22242e', outRoad: '#22222a', lamp: '#fff0c8', glow: '#ffd890', glowA: 0.3, shaft: '#c0d0ff', shaftA: 0.0, amb: '#ece4f0', ambK: 0.08, sun: '#f4ecd8',
    skin: '#d49c78', bubble: '#f8f0e6', ink: '#1a1616', navy: '#222a44', coral: '#c4523e', mustard: '#bc8a2c', teal: '#22626c', cream: '#e0d0b8', olive: '#525c34', plum: '#58344e', grey: '#807c7e', brown: '#4c3222', white: '#ece2d6', dark: '#161416', hairGrey: '#bab2ac', pink: '#d07c8e', blue: '#365c98', khaki: '#968462', charcoal: '#323034', red: '#a62e26', lilac: '#907aa6', mint: '#7eac94' },
  rain: { sky0: '#8a96a8', sky1: '#c8d0da', shaftA: 0.0 },
}, [[5, 'night'], [10, 'noon'], [14, 'noon'], [16.5, 'afternoon'], [18.3, 'dusk'], [20, 'night'], [29, 'night']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 11 ? 'Opening' : h < 14 ? 'Lunch' : h < 17 ? 'Afternoon tea' : h < 20 ? 'After school' : 'Night'; } });

function makeGeoBobaStage() {
  const CT = 520, SF = 640, SSC = 0.8, FL = 712, SC = 0.84;
  const SEAL = 34, POT = 84, CUPX = 128, URN = 168, PRINT = 200, PICK = 204;   // left: the build line
  const REG = 1112, ORDER = 1146, QUEUE = 1222, PICKSPOT = 214;                // right: register; pickup spot is left
  const FLAV = [
    { k: 'brown', n: 'Brown sugar', zh: '黑糖', tea: '#c8a07a', syrup: '#5a2e14', tiger: 1 },
    { k: 'taro', n: 'Taro', zh: '芋頭', tea: '#b8a0c8' },
    { k: 'matcha', n: 'Matcha', zh: '抹茶', tea: '#9ab878' },
    { k: 'mango', n: 'Mango green', zh: '芒果', tea: '#f0b048' },
    { k: 'oolong', n: 'Shaken oolong', zh: '烏龍', tea: '#d9a24e' },
    { k: 'thai', n: 'Thai tea', zh: '泰式', tea: '#e0904a' },
  ];
  const SWEET = ['no sugar', '30%', 'half sugar', '70%', 'full sugar'];
  let K, yuki, ben, orders = [], cupC = null, sealer = { cup: null, press: 0, flash: 0 }, shelf = [], drops = [], tickets = 0, ticketOut = 0, num = 20, nextArrive = 1, potStir = 0, bell = 0;
  const L = (h) => K.L(h), B = GeoKit.body;
  const H24 = () => ((K.hour % 24) + 24) % 24;
  const busy = () => { const h = H24(); return h >= 15 && h < 19 ? 1 : h >= 12 && h < 21 ? 0.7 : 0.45; };
  const custs = () => K.actors.filter((a) => a.cust);
  const wet = () => K.weatherNow === 'rain';
  /* ---------- the cup ---------- */
  function cup(c, x, y, s, o, ang = 0) { // o: {f (flavour), pearls 0..1, lv 0..1, sealed, straw, sip}
    const F = o.f; c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s);
    c.fillStyle = 'rgba(235,244,248,0.5)'; K.poly(c, [-9, -30, 9, -30, 7, 0, -7, 0]); c.fill();
    const lv = Math.max(0, (o.lv || 0) - (o.sip || 0) * 0.5);
    if (lv > 0.02) { const top = -29 * lv; c.fillStyle = L(F.tea); K.poly(c, [-7 - (-top / 30) * 2, top, 7 + (-top / 30) * 2, top, 7, 0, -7, 0]); c.fill();
      if (F.tiger) { c.fillStyle = rgba(F.syrup, 0.55); for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(-8, top + 4 + i * 7); c.quadraticCurveTo(0, top + 8 + i * 7, 8, top + 2 + i * 7); c.lineTo(8, top + 4.5 + i * 7); c.quadraticCurveTo(0, top + 10.5 + i * 7, -8, top + 6.5 + i * 7); c.fill(); } }
      c.fillStyle = 'rgba(255,255,255,0.22)'; c.fillRect(-5, top + 2, 2, -top - 4); }
    const pn = Math.round((o.pearls || 0) * 9); c.fillStyle = L('#2a1810'); for (let i = 0; i < pn; i++) { c.beginPath(); c.arc(-5 + (i % 4) * 3.4 + (Math.floor(i / 4) % 2) * 1.6, -2.4 - Math.floor(i / 4) * 2.8, 1.7, 0, TAU); c.fill(); }
    if (o.sealed) { c.fillStyle = 'rgba(255,250,240,0.9)'; c.fillRect(-9.5, -31.5, 19, 2.4); c.fillStyle = L('#ff8aa8'); c.fillRect(-3, -31.2, 6, 1.6); }
    if (o.straw) { c.fillStyle = L(o.strawCol || '#2a2a2e'); c.save(); c.translate(2, -30); c.rotate(0.12); c.fillRect(-1.6, -16 + (o.stab ? (1 - o.stab) * 10 : 0), 3.2, 30); c.restore(); }
    c.restore();
  }
  const H = {
    cup: (o, ang) => ({ draw(c, x, y, s) { cup(c, x, y + 22 * s, s, o, typeof ang === 'function' ? ang() : ang || 0); } }),
    ladle: (full) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#9a9c9a'); c.lineWidth = 2.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + a.f * 14 * s, y + 14 * s); c.stroke(); c.fillStyle = L('#c4c6c4'); c.beginPath(); c.arc(x + a.f * 16 * s, y + 16 * s, 6 * s, 0, Math.PI); c.fill(); if (full) { c.fillStyle = L('#2a1810'); for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(x + a.f * 16 * s - 4 * s + i * 2.6 * s, y + 15 * s, 1.7 * s, 0, TAU); c.fill(); } } } }),
    shaker: (shake) => ({ draw(c, x, y, s, a) { const j = shake ? Math.sin(K.t * 38) * 3 * s : 0; c.save(); c.translate(x, y + j); c.rotate(shake ? Math.sin(K.t * 38) * 0.12 : 0); c.fillStyle = 'rgba(230,240,244,0.65)'; K.poly(c, [-7 * s, -26 * s, 7 * s, -26 * s, 6 * s, 6 * s, -6 * s, 6 * s]); c.fill(); c.fillStyle = L('#c8a07a'); c.fillRect(-6 * s, -10 * s, 12 * s, 15 * s); c.fillStyle = L('#c4c6c4'); c.fillRect(-7.5 * s, -30 * s, 15 * s, 5 * s); c.restore(); } }),
    ticket: () => ({ draw(c, x, y, s) { c.fillStyle = L('#fbfaf6'); c.fillRect(x - 4 * s, y - 2 * s, 8 * s, 12 * s); c.fillStyle = 'rgba(0,0,0,0.3)'; for (let i = 0; i < 3; i++) c.fillRect(x - 2.6 * s, y + 1 * s + i * 3 * s, 5 * s, 0.8 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#ece6d8'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    cups: () => ({ draw(c, x, y, s) { for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(235,244,248,0.7)'; c.fillRect(x - 8 * s, y - 4 * s - i * 4 * s, 16 * s, 4 * s); } } }),
    straw: (col) => ({ draw(c, x, y, s) { c.fillStyle = L(col); c.fillRect(x - 1.6 * s, y - 18 * s, 3.2 * s, 26 * s); } }),
    phone: () => ({ draw(c, x, y, s) { c.fillStyle = '#141414'; c.fillRect(x - 3.5 * s, y - 7 * s, 7 * s, 12 * s); c.fillStyle = L('#f0b8c8'); c.fillRect(x - 2.6 * s, y - 6 * s, 5.2 * s, 9 * s); } }),
    umbrella: (col) => ({ draw(c, x, y, s) { c.strokeStyle = L('#3a3a3a'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y + 4 * s); c.lineTo(x, y - 34 * s); c.stroke(); c.fillStyle = L(col); c.save(); c.translate(x, y - 34 * s); c.rotate(0.12); c.beginPath(); c.moveTo(-34 * s, 4 * s); c.quadraticCurveTo(0, -38 * s, 34 * s, 4 * s); for (let i = 0; i < 4; i++) c.quadraticCurveTo(25.5 * s - i * 17 * s, -2 * s, 17 * s - i * 17 * s, 4 * s); c.closePath(); c.fill(); c.fillStyle = 'rgba(0,0,0,0.12)'; c.beginPath(); c.moveTo(0, -22 * s); c.quadraticCurveTo(10 * s, -10 * s, 17 * s, 4 * s); c.lineTo(0, 1 * s); c.closePath(); c.fill(); c.restore(); } }),
  };
  /* ---------- crew ---------- */
  function mkStaff() {
    yuki = K.mk(B({ T: 230, hw: 54, headR: 27, pattern: 'apron', top: 'cream', top2: 'sage2', pants: 'dark', hairStyle: 'bob', hair: 'dark', hat: 'cap', hatCol: 'sage2', shortSleeve: 1 }), { role: 'yuki', staff: 1, hx: 150, f: 1, floorY: SF, sc: SSC, faceDir: 0.5, speed: 1.15 });
    ben = K.mk(B({ T: 242, hw: 60, headR: 27, pattern: 'apron', top: 'charcoal', top2: 'sage2', pants: 'dark', hairStyle: 'short', hair: 'dark', glasses: 1, shortSleeve: 1 }), { role: 'ben', staff: 1, hx: 1068, f: 1, floorY: SF, sc: SSC, faceDir: 0.5 });
    yuki.think = yukiThink; ben.think = benThink;
  }
  const walk = (x) => K.ph(0, (s) => { s.walkTo = x; }, { until: (s) => !s.walking, max: 20 });
  function yukiThink(a) {
    const o = orders.find((q) => q.state === 'new');
    if (o && shelf.length < 2) return make(a, o);
    const r = Math.random();
    if (r < 0.4) return K.start(a, 'stir', [walk(POT + 16), K.ph(rand(1.6, 2.6), (s, u, t) => { s.f = -1; s.hold.N = H.ladle(); s.tgN = [POT + 10 + Math.cos(t * 4) * 8, CT - 46 + Math.sin(t * 4) * 3]; s.leanT = 0.12; potStir = 1; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.6 && K.cooled(a, 'wipe', 10)) return K.start(a, 'wipe', [walk(160), K.ph(rand(1.4, 2.2), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [180 + Math.sin(t * 5) * 14, CT - 6]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [walk(150), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 18, CT - 8]; s.tgF = [s.hx + 6, CT - 8]; s.lxT = pick([0.6, 0.2, -0.5]); })]);
  }
  function make(a, o) {
    o.state = 'making'; const C = { f: o.f, pearls: 0, lv: 0, sealed: 0, straw: 0 }; let flip = 0;
    const ph = [
      walk(176), K.ph(0.5, (s) => { s.f = 1; s.tgN = [PRINT, CT - 58]; s.leanT = 0.05; }, { exit: (s) => { s.hold.N = H.ticket(); ticketOut = 0; tickets = Math.max(0, tickets - 1); } }),
      K.ph(0.4, (s) => { s.tgN = [PRINT - 44, 400]; }, { exit: (s) => { s.hold.N = null; o.rail = 1; } }),
      walk(CUPX + 20), K.ph(0.45, (s) => { s.f = -1; s.tgN = [CUPX, CT - 30]; s.leanT = 0.15; }, { exit: () => { cupC = C; } }),
      // pearls: ladle from the pot, tip over the cup, they drop in and bounce
      walk(POT + 22), K.ph(0.5, (s) => { s.f = -1; s.hold.N = H.ladle(); s.tgN = [POT + 16, CT - 34]; s.leanT = 0.18; }, { exit: (s) => { s.hold.N = H.ladle(true); } }),
      K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [lerp(POT + 16, CUPX - 16, u), CT - 66 - Math.sin(u * Math.PI) * 10]; }),
      K.ph(0.7, (s, u) => { s.tgN = [CUPX - 16, CT - 64]; s.tgN[1] += Math.sin(u * 20) * 1.5; if (u > 0.2 && Math.random() < 0.5) drops.push({ x: CUPX + rand(-3, 3), y: CT - 52, vy: 0, t: 0 }); }, { exit: (s) => { s.hold.N = H.ladle(); C.pearls = 1; } }),
      K.ph(0.3, null, { exit: (s) => { s.hold.N = null; } }),
      // tea into the shaker, shake hard, pour
      walk(URN - 14), K.ph(0.5, (s) => { s.f = 1; s.tgN = [URN - 6, CT - 60]; s.leanT = 0.05; }, { exit: (s) => { s.hold.N = H.shaker(false); } }),
      K.ph(1.0, (s) => { s.tgN = [URN - 6, CT - 70]; s.tgF = [URN + 6, CT - 128]; o.pour = 1; }, { exit: () => { o.pour = 0; } }),
      K.ph(1.5, (s, u, t) => { s.hold.N = H.shaker(true); s.tgN = [s.hx + 18 + Math.sin(t * 38) * 4, s.hy - 68 + Math.cos(t * 38) * 5]; s.tgF = [s.hx + 14 + Math.sin(t * 38) * 4, s.hy - 98 + Math.cos(t * 38) * 5]; s.shake = Math.sin(t * 38) * 0.02; s.leanT = -0.04; if (Math.random() < 0.15) K.fx('spark', s.hx + 22, s.hy - 110, { life: 0.3, col: '#ffffff' }); }, { enter: () => { if (Math.random() < 0.5) K.say(a, pick(['Shake shake!', 'icon:note']), 0.9); }, exit: (s) => { s.shake = 0; s.hold.N = H.shaker(false); } }),
      walk(CUPX + 22), K.ph(1.0, (s, u) => { s.f = -1; s.tgN = [CUPX + 10, CT - 66]; s.tgF = [s.hx - 4, CT - 8]; C.lv = u * 0.92; }, { exit: (s) => { s.hold.N = null; } }),
      // into the sealing machine
      K.ph(0.5, (s) => { s.tgN = [CUPX, CT - 26]; }, { exit: (s) => { cupC = null; s.hold.N = H.cup(C); } }),
      walk(SEAL + 46), K.ph(0.5, (s) => { s.f = -1; s.tgN = [SEAL + 4, CT - 34]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; sealer.cup = C; } }),
      K.ph(0.9, (s, u) => { s.tgF = [SEAL + 24, lerp(CT - 112, CT - 82, u)]; sealer.press = u; }, { exit: () => { C.sealed = 1; sealer.flash = 1; K.fx('flash', SEAL, CT - 40, { life: 0.25 }); K.say(a, 'icon:ex', 0.5); } }),
      K.ph(0.4, (s, u) => { s.tgF = [SEAL + 24, lerp(CT - 82, CT - 112, u)]; sealer.press = 1 - u; }),
      K.ph(0.4, (s) => { s.tgN = [SEAL + 4, CT - 34]; }, { exit: (s) => { sealer.cup = null; s.hold.N = H.cup(C, () => flip); } }),
      // flip the sealed cup to mix the syrup
      K.ph(1.0, (s, u, t) => { s.tgN = [s.hx - 14, s.hy - 64]; s.tgF = [s.hx - 10, s.hy - 70]; flip = Math.sin(u * Math.PI * 2) * 2.6; }, { exit: () => { flip = 0; } }),
      walk(182), K.ph(0.5, (s) => { s.f = 1; s.tgN = [PICK - 4, CT - 26]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; shelf.push({ C, o }); o.state = 'ready'; bell = 1; K.say(a, '#' + o.num + '! ' + o.F.n, 1.3); } }),
    ];
    K.start(a, 'make', ph, { onAbort: (s) => { s.hold.N = null; s.shake = 0; cupC = null; sealer.cup = null; sealer.press = 0; o.pour = 0; if (o.state === 'making') { Object.assign(C, { pearls: 1, lv: 0.92, sealed: 1 }); shelf.push({ C, o }); o.state = 'ready'; } } });
  }
  function benThink(a) {
    const g = custs().find((q) => q.phase === 'picked' && !q.taken);
    if (g) return takeOrder(a, g);
    const r = Math.random();
    if (r < 0.35 && K.cooled(a, 'wipe', 10)) return K.start(a, 'wipe', [walk(1070), K.ph(rand(1.4, 2.2), (s, u, t) => { s.f = 1; s.hold.N = H.cloth(); s.tgN = [1090 + Math.sin(t * 5) * 20, CT - 6]; s.leanT = 0.1; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.55 && K.cooled(a, 'straws', 18)) return K.start(a, 'straws', [walk(1070), K.ph(0.6, (s) => { s.f = -1; s.tgN = [1044, CT - 30]; s.leanT = 0.3; }), K.ph(0.8, (s, u, t) => { s.f = 1; s.tgN = [1050 + Math.sin(t * 8) * 3, CT - 36]; s.leanT = 0.05; })]);
    return K.start(a, 'idle', [walk(1068), K.ph(rand(1.5, 3), (s) => { s.f = 1; s.tgN = [s.hx + 18, CT - 8]; s.tgF = [s.hx + 6, CT - 8]; s.lxT = pick([0.6, 0.3, -0.4]); })]);
  }
  function takeOrder(a, g) {
    g.taken = 1; const o = { f: g.flav, F: g.flav, sweet: g.sweet, state: 'hold', num: ++num, g };
    K.start(a, 'order', [walk(1068), K.ph(1.2, (s, u, t) => { s.f = 1; s.tgN = [REG - 6 + (Math.floor(t * 5) % 3) * 4, CT - 34 + (Math.floor(t * 4) % 2) * 6]; s.leanT = 0.08; s.look = { x: () => REG, until: K.simT + 0.3 }; }, { enter: () => K.say(a, g.flav.n + ', ' + g.sweet + '!', 1.3) }),
      K.ph(0.6, (s) => { s.tgN = [REG + 14, CT - 30]; }, { exit: () => { o.state = 'new'; orders.push(o); tickets++; ticketOut = 1; g.num = o.num; g.phase = 'paid'; K.say(a, '#' + o.num + ' — pick up on the left!', 1.3); } })],
      { onAbort: () => { if (o.state === 'hold') { o.state = 'new'; orders.push(o); tickets++; g.num = o.num; g.phase = 'paid'; } } });
  }
  /* ---------- guests ---------- */
  const TYPES = {
    student: { body: B({ T: 230, hw: 54, headR: 27, pattern: 'knit', top: 'sage2', pants: 'navy', hairStyle: 'long', hair: 'dark', backpack: 1, packCol: 'lilac' }), words: ['Taro is life', 'icon:heart'], selfie: 1 },
    boy: { body: B({ T: 236, hw: 56, headR: 27, pattern: 'hoodie', top: 'navy', pants: 'dark', hairStyle: 'short' }), words: ['Extra pearls!', 'icon:note'] },
    office: { body: B({ T: 238, hw: 56, headR: 27, pattern: 'coat', top: 'khaki', shirt: 'white', pants: 'charcoal', hairStyle: 'bob', hair: 'brown' }), words: ['Afternoon fix', 'icon:clock'] },
    dad: { body: B({ T: 244, hw: 62, headR: 27, pattern: 'jacket', top: 'olive', pants: 'dark', hairStyle: 'short', glasses: 1 }), words: ['Less sugar…', 'Fine, full sugar'] },
    granny: { body: B({ T: 218, hw: 56, headR: 27, pattern: 'cardigan', top: 'lilac', top2: 'cream', pants: 'grey', hairStyle: 'bob', hair: 'hairGrey', glasses: 1 }), words: ['What is "taro"?', 'Ooh, sweet'] },
    teen: { body: B({ T: 226, hw: 52, headR: 27, pattern: 'tee', top: 'pink', pants: 'blue', hairStyle: 'pony', hair: 'brown', shortSleeve: 1 }), words: ['Selfie!', 'icon:cam'], selfie: 1 },
  };
  const STRAWS = ['#2a2a2e', '#e8a0b0', '#7ab8a8', '#e8c060'];
  function mkGuest() {
    const type = pick(Object.keys(TYPES)), T0 = TYPES[type];
    const a = K.mk(Object.assign({}, T0.body), { type, T0, cust: 1, hx: 1340, f: -1, floorY: FL - 6, sc: SC, alpha: 0, fade: 1.4, speed: rand(0.85, 1.0) });
    if (wet()) { a.umb = pick(['#2a4a6a', '#6a2a3a', '#2a2a2e']); a.hold.F = H.umbrella(a.umb); }
    a.arr = ++arrN; a.flav = pick(FLAV); a.sweet = pick(SWEET); a.phase = 'queue'; a.walkTo = QUEUE; a.think = guestThink; return a;
  }
  const inFlight = () => custs().filter((g) => ['picked', 'paid', 'toPick', 'waitPick'].includes(g.phase)).length;
  function guestThink(a) {
    if (a.walking || a.walkTo != null) return;
    if (a.phase === 'queue') {
      const atOrder = custs().some((g) => g !== a && (g.phase === 'choose' || g.phase === 'picked' || (g.phase === 'paid' && Math.abs(g.hx - ORDER) < 20) || g.phase === 'toOrder'));
      if (!atOrder && !inFlight()) { a.phase = 'toOrder'; a.walkTo = ORDER; return; }
      return K.start(a, 'browse', [K.ph(rand(1.5, 2.6), (s, u) => { s.f = 1; s.lxT = 0.7; s.headDy = -3; if (u > 0.4 && u < 0.7 && Math.random() < 0.05) { s.tgN = [s.hx + 20, 300]; } }, { exit: (s) => { s.headDy = 0; s.f = -1; } })], { onAbort: (s) => { s.headDy = 0; } });
    }
    if (a.phase === 'toOrder') { a.phase = 'choose';
      const row = FLAV.indexOf(a.flav), py = 150 + row * 24;
      return K.start(a, 'choose', [K.ph(1.4, (s) => { s.f = 1; s.lxT = 0.8; s.headDy = -4; }, { enter: () => K.say(a, 'icon:q', 0.9) }),
        K.ph(0.5, (s) => { s.tgN = [s.hx + 46, py + 10]; s.leanT = -0.04; }),
        K.ph(1.0, (s, u, t) => { s.tgN = [s.hx + 46 + Math.sin(t * 6) * 2, py + 10]; }, { enter: () => K.say(a, a.flav.zh + ' ' + a.flav.n + ', ' + a.sweet + '!', 1.5) }),
        K.ph(0.4, (s) => { s.f = -1; s.headDy = 0; s.lxT = -0.4; }, { exit: () => { a.phase = 'picked'; } })], { onAbort: (s) => { s.headDy = 0; a.phase = 'picked'; } });
    }
    if (a.phase === 'picked') return K.start(a, 'pay', [K.ph(1, (s) => { s.f = -1; s.tgN = [REG + 22, CT - 20]; s.leanT = 0.05; })]);
    if (a.phase === 'paid') { // wait at the register (the build line stays visible) until the bell calls the number
      if (shelf.some((q) => q.o.g === a)) { a.phase = 'toPick'; a.walkTo = PICKSPOT; return; }
      return K.start(a, 'waitOrder', [K.ph(rand(1.2, 2), (s) => { s.f = -1; if (!a.umb) { s.hold.F = H.phone(); s.tgF = [s.R.cx - 20, s.R.cy + 44]; s.headDy = 3; } else s.lxT = pick([-0.7, -0.3]); }, { exit: (s) => { s.headDy = 0; if (!a.umb) s.hold.F = null; } })], { onAbort: (s) => { s.headDy = 0; if (!a.umb) s.hold.F = null; } }); }
    if (a.phase === 'toPick') { a.phase = 'waitPick'; a.f = -1; }
    if (a.phase === 'waitPick') {
      const it = shelf.find((q) => q.o.g === a);
      if (it) return K.start(a, 'take', [K.ph(0.6, (s) => { s.f = -1; s.tgN = [PICK + 2, CT - 26]; s.leanT = 0.1; }, { exit: (s) => { shelf = shelf.filter((q) => q !== it); s.hold.N = H.cup(it.C); s.cupC = it.C; orders = orders.filter((q) => q !== it.o); } }),
        K.ph(0.5, (s) => { s.tgN = [s.R.cx - 24, s.R.cy + 70]; s.leanT = 0; }),
        // stab the straw: lift, punch down, pop
        K.ph(0.5, (s) => { s.hold.F = H.straw(it.C.strawCol = pick(STRAWS)); s.tgF = [s.R.cx - 22, s.R.cy + 10]; }),
        K.ph(0.25, (s, u) => { s.tgF = [s.R.cx - 22, lerp(s.R.cy + 10, s.R.cy + 40, u * u)]; }, { exit: (s) => { s.hold.F = null; it.C.straw = 1; it.C.stab = 0; K.fx('spark', s.R.cx - 22, s.R.cy + 46, { life: 0.35, col: '#ffffff' }); K.say(a, pick(['*pop*', 'icon:ex']), 0.6); } }),
        K.ph(0.4, (s, u) => { it.C.stab = u; s.tgF = [s.hx - 6, s.hy - 30]; }, { exit: () => { it.C.stab = 0; } })], { onEnd: (s) => { s.phase = 'sip'; s.sips = 0; }, onAbort: (s) => { s.hold.F = null; if (!s.hold.N) { shelf = shelf.filter((q) => q !== it); s.hold.N = H.cup(it.C); s.cupC = it.C; } it.C.straw = 1; s.phase = 'sip'; s.sips = 0; } });
      return K.start(a, 'wait', [K.ph(rand(1.5, 2.5), (s) => { s.f = -1; if (!a.umb) { s.hold.F = H.phone(); s.tgF = [s.R.cx - 20, s.R.cy + 44]; s.headDy = 3; } else s.lxT = pick([-0.6, -0.2]); }, { exit: (s) => { s.headDy = 0; if (!a.umb) s.hold.F = null; } })], { onAbort: (s) => { s.headDy = 0; if (!a.umb) s.hold.F = null; } });
    }
    if (a.phase === 'sip') {
      a.sips++; const C = a.cupC;
      if (a.sips > 2) { a.phase = 'out'; K.say(a, pick(['謝謝!', 'Thanks!', 'icon:heart']), 1); a.f = -1; a.walkTo = Math.random() < 0.5 ? -80 : 430; if (a.umb) a.hold.F = H.umbrella(a.umb); return; }
      if (a.T0.selfie && a.sips === 2 && !a.umb) return K.start(a, 'selfie', [K.ph(1.6, (s) => { s.hold.F = H.phone(); s.tgF = [s.R.cx + 30, s.R.cy - 46]; s.tgN = [s.R.cx - 16, s.R.cy + 30]; s.headDy = -2; }, { exit: (s) => { K.fx('flash', s.R.cx + 30, s.R.cy - 46, { life: 0.3 }); s.hold.F = null; s.headDy = 0; K.say(s, 'icon:cam', 0.8); } })], { onAbort: (s) => { s.hold.F = null; s.headDy = 0; } });
      return K.start(a, 'sip', [K.ph(0.6, (s) => { s.f = -1; s.tgN = [s.R.cx - s.R.R * 0.35, s.R.cy + s.R.R * 1.6]; s.headDy = 1; }), K.ph(rand(0.8, 1.2), (s, u) => { if (C) C.sip = Math.min(1, (C.sip || 0) + 0.004); }, { exit: (s) => { s.headDy = 0; if (Math.random() < 0.4) K.say(a, pick(a.T0.words.concat(['Mmm!', '好喝!'])), 1); } }), K.ph(rand(1, 2), (s) => { s.tgN = [s.R.cx - 24, s.R.cy + 70]; s.lxT = pick([-0.4, 0.3]); })], { onAbort: (s) => { s.headDy = 0; } });
    }
    if (a.phase === 'out') a.fade = -2;
  }
  /* ---------- sim ---------- */
  const QSLOT = [QUEUE];
  function cap() { const b = busy(); return b >= 0.7 ? 4 : 3; }
  function sim(Kk, dt) {
    const cs = custs();
    nextArrive -= dt; if (cs.length < 2) nextArrive = Math.min(nextArrive, 1.5);
    const queued = cs.filter((g) => g.phase === 'queue');
    if (nextArrive <= 0) { if (cs.length < cap() && queued.length < QSLOT.length) mkGuest(); nextArrive = rand(7, 13) / busy(); }
    // queue slots: front of the line closest to the board
    queued.sort((p, q) => p.arr - q.arr).forEach((g, i) => { const x = QSLOT[i]; if (Math.abs(g.hx - x) > 4 && !g.walking && g.walkTo == null) { if (g.act) K.abort(g); g.walkTo = x; } });
    // a sipper standing at the pickup spot steps away when the next guest heads there
    if (cs.some((g) => g.phase === 'toPick')) for (const g of cs) if (g.phase === 'sip' && Math.abs(g.hx - PICKSPOT) < 30 && !g.walking) { if (g.act) K.abort(g); g.sips = 9; g.phase = 'sip'; guestThink(g); }
    for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.t += dt; d.vy += 900 * dt; d.y += d.vy * dt; const fl = CT - 5 - (d.n || 0) * 0.6; if (d.y > fl) { d.y = fl; d.vy *= -0.32; if (Math.abs(d.vy) < 30) d.vy = 0; } if (d.t > 0.7) drops.splice(i, 1); }
    bell = Math.max(0, bell - dt * 1.6); sealer.flash = Math.max(0, sealer.flash - dt * 3); potStir = Math.max(0, potStir - dt * 2);
    if (ticketOut > 0 && ticketOut < 1.6) ticketOut += dt * 1.2;
  }
  function onClear(Kk, big) {
    for (const g of custs()) if (!g.walking && (big || Math.random() < 0.35)) K.say(g, pick(['icon:heart', 'icon:star', '好!', 'Yay!']), 1.1);
    K.say(yuki, big ? pick(['icon:star', 'Wah!']) : pick(['icon:note', 'Nice']), 1.1); bell = Math.max(bell, big ? 1 : 0.6);
    if (big) K.say(ben, 'icon:star', 1);
  }
  let arrN = 0;
  function build(Kk) { K = Kk; mkStaff(); nextArrive = 0.3;
    // open with two guests already inside: one at the board, one walking in
    const g1 = mkGuest(); g1.hx = QUEUE; g1.alpha = 1; g1.walkTo = null;
    const g2 = mkGuest(); g2.hx = 1320; }
  function onGone(Kk, a) { shelf = shelf.filter((q) => q.o.g !== a); orders = orders.filter((o) => o.g !== a); }
  /* ---------- drawing ---------- */
  const WIN = { x0: 330, y0: 96, x1: 950, y1: 470 };
  function drawWindow(c, t) {
    const P = K.P, { x0, y0, x1, y1 } = WIN;
    c.fillStyle = P.woodDk; c.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
    K.sky(c, x0, y0, x1, y0 + 220, { sunR: 18 });
    const hs = [[x0 - 20, 170, P.out1, 120], [x0 + 170, 130, L('#9a8c84'), 160], [x0 + 320, 150, P.out1, 100], [x1 - 150, 170, L('#8c8a90'), 140]];
    for (const [hx, w, col, top] of hs) { const ty = y0 + top; c.fillStyle = col; c.fillRect(hx, ty, w, y1 - ty);
      for (let r = 0; r < 3; r++) for (let k = 0; k < Math.floor(w / 44); k++) { const wx = hx + 14 + k * 44, wy = ty + 18 + r * 52; if (wy > y1 - 110) continue; const lit = P.night > 0.3 && ((k * 3 + r * 5 + Math.round(hx)) % 7) < 4; c.fillStyle = lit ? P.lamp : rgba(P.ink, 0.25); c.fillRect(wx, wy, 18, 28); }
      c.fillStyle = rgba(P.ink, 0.18); c.fillRect(hx, y1 - 96, w, 6); }
    // shopfront awnings opposite
    for (const [ax, w, col] of [[x0 + 30, 110, P.coral], [x0 + 330, 120, P.teal]]) { c.fillStyle = L(col); K.poly(c, [ax, y1 - 92, ax + w, y1 - 92, ax + w + 10, y1 - 74, ax - 10, y1 - 74]); c.fill(); }
    c.fillStyle = P.outRoad; c.fillRect(x0, y1 - 56, x1 - x0, 56); c.fillStyle = rgba(P.ink, 0.12); for (let i = 0; i < 12; i++) c.fillRect(x0 + i * 56 + 10, y1 - 28, 30, 3);
    if (wet()) { c.fillStyle = 'rgba(200,215,235,0.22)'; c.fillRect(x0, y1 - 56, x1 - x0, 56); }
    K.weather(c, x0, y0, x1, y1);
    c.restore();
    c.fillStyle = P.wood; c.fillRect(x0 - 4, (y0 + y1) / 2 - 3, x1 - x0 + 8, 6); c.fillRect((x0 + x1) / 2 - 3, y0, 6, y1 - y0);
    c.fillStyle = P.woodDk; c.fillRect(x0 - 24, y1 + 10, x1 - x0 + 48, 12);
    if (wet()) { c.fillStyle = 'rgba(255,255,255,0.10)'; for (let i = 0; i < 26; i++) { const sx = x0 + ((i * 97) % (x1 - x0)), sy = y0 + ((i * 53 + K.t * 14 * (1 + (i % 3))) % (y1 - y0)); c.fillRect(sx, sy, 1.6, 9); } }
  }
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    c.fillStyle = P.sage; c.fillRect(-60, 0, 1400, 22); c.fillStyle = P.sage2; c.fillRect(-60, 22, 1400, 4);
    drawWindow(c, t);
    // left wall: neon cup sign, open shelves of tea tins and syrups, ticket rail
    const nOn = P.night > 0.25 ? 1 : 0.55; K.glow(c, 110, 150, 120, P.neon, 0.18 * nOn + 0.08 * P.night);
    c.strokeStyle = nOn > 0.9 ? '#ffd0dc' : L(P.neon); c.lineWidth = 4; c.lineJoin = 'round'; c.beginPath(); c.moveTo(86, 112); c.lineTo(134, 112); c.lineTo(128, 190); c.lineTo(92, 190); c.closePath(); c.stroke();
    c.beginPath(); c.moveTo(116, 112); c.lineTo(126, 82); c.stroke(); c.fillStyle = c.strokeStyle; for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(98 + (i % 3) * 12 + (i > 2 ? 6 : 0), 182 - (i > 2 ? 10 : 0), 3.6, 0, TAU); c.fill(); }
    for (const sy of [262, 330]) { c.fillStyle = P.woodDk; c.fillRect(-20, sy, 232, 7); c.fillStyle = rgba(P.ink, 0.12); c.fillRect(-20, sy + 7, 232, 4); }
    const tins = [[10, '#b85a40'], [44, '#3e6a5a'], [78, '#c8a050'], [112, '#6a4a6a'], [146, '#a8b4a0'], [180, '#8a5a3a']];
    for (const [tx, col] of tins) { c.fillStyle = L(col); c.fillRect(tx, 222, 26, 40); c.fillStyle = rgba('#000000', 0.18); c.fillRect(tx + 19, 222, 7, 40); c.fillStyle = L('#ece4d4'); c.fillRect(tx + 4, 236, 14, 12); c.fillStyle = rgba(P.ink, 0.35); c.fillRect(tx, 222, 26, 4); }
    const bots = [[12, '#5a2e14'], [40, '#f0b048'], [68, '#e898a8'], [96, '#9ab878'], [124, '#b8a0c8'], [152, '#e0904a'], [180, '#efe2cc']];
    for (const [bx, col] of bots) { c.fillStyle = rgba('#e8f0f2', 0.5); c.fillRect(bx, 286, 20, 44); c.fillStyle = L(col); c.fillRect(bx + 2, 300, 16, 30); c.fillStyle = L('#3a3a3e'); c.fillRect(bx + 6, 276, 8, 10); c.fillRect(bx + 9, 270, 2, 6); }
    c.fillStyle = L('#9a9c9a'); c.fillRect(14, 396, 168, 4);
    const rail = orders.filter((o) => o.rail && o.state !== 'ready');
    rail.forEach((o, i) => { const x = 28 + i * 24; c.fillStyle = L('#fbfaf6'); c.fillRect(x, 398, 16, 26); c.fillStyle = rgba(P.ink, 0.4); c.fillRect(x + 3, 404, 10, 2); c.fillRect(x + 3, 409, 7, 2); c.fillStyle = L(o.F.tea); c.fillRect(x + 3, 415, 10, 5); });
    // ticket printer on its wall bracket
    c.fillStyle = L('#5a5c5a'); c.fillRect(184, 474, 32, 4); c.fillStyle = L('#2e2e32'); roundRect(c, 186, 446, 28, 28, 4); c.fill(); c.fillStyle = L('#4a4a50'); c.fillRect(190, 450, 20, 4);
    c.fillStyle = P.night > 0.3 || tickets ? L('#7ad0a0') : L('#3a5a4a'); c.fillRect(208, 466, 3, 3);
    if (tickets > 0) { const len = Math.min(1, ticketOut) * 18; c.fillStyle = L('#fbfaf6'); c.fillRect(193, 474, 14, len); c.fillStyle = rgba(P.ink, 0.35); if (len > 8) c.fillRect(196, 478, 8, 1.6); if (len > 12) c.fillRect(196, 482, 6, 1.6); }
    // right wall: the flavour board
    drawBoard(c);
    // pendant lamps
    for (const lx of [150, 1180]) { c.strokeStyle = rgba(P.ink, 0.7); c.lineWidth = 1.3; c.beginPath(); c.moveTo(lx, 26); c.lineTo(lx, lx < 600 ? 60 : 64); c.stroke(); const ly = lx < 600 ? 60 : 64; c.fillStyle = P.sage2; K.poly(c, [lx - 16, ly + 18, lx - 6, ly, lx + 6, ly, lx + 16, ly + 18]); c.fill(); c.fillStyle = P.lamp; ellipse(c, lx, ly + 18, 12, 3); c.fill(); K.glow(c, lx, ly + 26, 150, P.glow, P.glowA + 0.1 * P.night); }
  }
  function drawBoard(c) {
    const P = K.P, x0 = 1092, y0 = 100, w = 176, h = 210;
    c.fillStyle = P.woodDk; roundRect(c, x0 - 6, y0 - 6, w + 12, h + 12, 6); c.fill();
    c.fillStyle = P.board; c.fillRect(x0, y0, w, h);
    c.fillStyle = P.boardLit; c.font = '700 15px ' + (typeof JP_FONT !== 'undefined' ? JP_FONT : 'sans-serif'); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('手搖 · TEA', x0 + w / 2, y0 + 22);
    c.fillStyle = rgba(P.boardLit, 0.3); c.fillRect(x0 + 14, y0 + 36, w - 28, 1.5);
    const hi = custs().find((g) => g.act && g.act.name === 'choose' && g.act.i >= 1);
    FLAV.forEach((F, row) => { const py = 150 + row * 24;
      if (hi && hi.flav === F) { c.fillStyle = rgba(P.boardLit, 0.14); c.fillRect(x0 + 6, py - 11, w - 12, 22); }
      // little cup glyph: flat trapezoid, tea colour, three pearls, straight straw inside the lid width
      const cx = x0 + 20; c.fillStyle = L(F.tea); K.poly(c, [cx - 7, py - 9, cx + 7, py - 9, cx + 5, py + 9, cx - 5, py + 9]); c.fill();
      c.fillStyle = L('#2a1810'); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(cx - 3 + i * 3, py + 6, 1.4, 0, TAU); c.fill(); }
      c.fillStyle = rgba(P.boardLit, 0.85); c.fillRect(cx + 1, py - 15, 2, 7);
      c.textAlign = 'left'; c.fillStyle = P.boardLit; c.font = '600 12px sans-serif'; c.fillText(F.n, x0 + 36, py);
      c.textAlign = 'right'; c.fillStyle = rgba(P.boardLit, 0.6); c.font = '600 11px ' + (typeof JP_FONT !== 'undefined' ? JP_FONT : 'sans-serif'); c.fillText(F.zh, x0 + w - 10, py); });
  }
  function drawLeftCounter(c, t) {
    const P = K.P;
    // pearl pot on its burner
    { const x = POT; c.fillStyle = L('#3a3a3e'); c.fillRect(x - 24, CT - 6, 48, 6); c.fillStyle = P.steel2; c.fillRect(x - 20, CT - 34, 40, 28); c.fillStyle = P.steel; c.fillRect(x - 20, CT - 34, 28, 28); c.fillStyle = P.steelDk; c.fillRect(x - 22, CT - 36, 44, 4); c.fillRect(x - 28, CT - 30, 8, 3); c.fillRect(x + 20, CT - 30, 8, 3);
      c.fillStyle = L('#2a1810'); ellipse(c, x, CT - 36, 18, 3); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1), sx = x - 8 + i * 8 + Math.sin(t * 1.5 + i) * 4 * u; ellipse(c, sx, CT - 42 - u * 44, 5 + u * 7, 3 + u * 4); c.globalAlpha = 0.6 * (1 - u) * (0.5 + potStir * 0.5); c.fill(); c.globalAlpha = 1; } }
    // tea urn with its tap on the left
    { const x = URN; c.fillStyle = P.steelDk; c.fillRect(x, CT - 8, 4, 8); c.fillRect(x + 22, CT - 8, 4, 8); c.fillStyle = P.steel2; c.fillRect(x - 2, CT - 136, 30, 128); c.fillStyle = P.steel; c.fillRect(x - 2, CT - 136, 20, 128); c.fillStyle = P.steelDk; c.fillRect(x - 4, CT - 140, 34, 6); c.fillRect(x + 8, CT - 146, 10, 6);
      c.fillStyle = L('#c8a07a'); c.fillRect(x + 20, CT - 120, 4, 90); c.fillStyle = rgba(P.ink, 0.2); c.fillRect(x + 20, CT - 120, 4, 2);
      c.fillStyle = P.steelDk; c.fillRect(x - 8, CT - 104, 10, 5); c.fillRect(x - 8, CT - 104, 3, 9); c.fillStyle = L('#2e2e32'); c.fillRect(x - 3, CT - 112, 4, 8);
      const po = orders.find((o) => o.pour); if (po) { c.fillStyle = L(po.F.tea); c.fillRect(x - 7.5, CT - 95, 2, 8 + Math.sin(t * 30) * 0.8); } }
    // the cup being built
    if (cupC) cup(c, CUPX, CT, 0.85, cupC);
    for (const d of drops) { c.fillStyle = L('#2a1810'); c.beginPath(); c.arc(d.x, d.y, 1.6, 0, TAU); c.fill(); }
    // sealing machine: base, back column, head that presses, pink film roll, lever
    { const x = SEAL, pr = sealer.press; c.fillStyle = L('#e4e0d8'); c.fillRect(x - 22, CT - 8, 44, 8); c.fillStyle = L('#cfcac0'); c.fillRect(x - 26, CT - 82, 12, 74); c.fillStyle = L('#bab4aa'); c.fillRect(x - 26, CT - 82, 4, 74);
      if (sealer.cup) cup(c, x, CT - 6, 0.85, sealer.cup);
      const hy = CT - 56 + pr * 18; c.fillStyle = L('#d8d4cc'); c.fillRect(x - 24, CT - 92, 48, 14); c.fillStyle = L('#bab4aa'); c.fillRect(x - 12, CT - 78, 4, hy - (CT - 78)); c.fillRect(x + 8, CT - 78, 4, hy - (CT - 78));
      c.fillStyle = L('#9a9c9a'); c.fillRect(x - 12, hy, 24, 6); if (sealer.flash > 0) { c.fillStyle = rgba('#ffd890', sealer.flash * 0.8); c.fillRect(x - 12, hy + 4, 24, 3); }
      c.fillStyle = L('#f4eee4'); ellipse(c, x - 6, CT - 99, 11, 7); c.fill(); c.fillStyle = L(P.neon); for (let i = 0; i < 3; i++) c.fillRect(x - 14 + i * 7, CT - 101, 3, 4);
      c.strokeStyle = L('#3a3a3e'); c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(x + 14, CT - 84); c.lineTo(x + 24, CT - 112 + pr * 30); c.stroke(); c.fillStyle = L('#c03a30'); c.beginPath(); c.arc(x + 24, CT - 112 + pr * 30, 4, 0, TAU); c.fill(); c.lineCap = 'butt';
      c.fillStyle = L('#7ad0a0'); c.fillRect(x - 20, CT - 6, 3, 3); }
    // pickup shelf with the bell
    { c.fillStyle = P.wood; c.fillRect(PICK - 20, CT - 10, 56, 4); c.fillStyle = P.woodDk; c.fillRect(PICK - 18, CT - 6, 4, 6); c.fillRect(PICK + 30, CT - 6, 4, 6);
      shelf.forEach((q, i) => cup(c, PICK - 8 + i * 16, CT - 10, 0.85, q.C));
      const bx = PICK - 30, rk = Math.sin(K.t * 40) * bell * 0.3; c.save(); c.translate(bx, CT); c.rotate(rk); c.fillStyle = L('#c8a050'); c.beginPath(); c.arc(0, -4, 8, Math.PI, TAU); c.fill(); c.fillStyle = L('#9a7a30'); c.fillRect(-9, -4, 18, 3); c.fillRect(-1.2, -16, 2.4, 4); c.restore(); }
  }
  function counter(c, xa, xb) {
    const P = K.P; c.fillStyle = P.wood; c.fillRect(xa, CT, xb - xa, 10); c.fillStyle = P.woodDk; c.fillRect(xa, CT + 10, xb - xa, 4);
    c.fillStyle = P.sage; c.fillRect(xa, CT + 14, xb - xa, 666 - CT - 14); c.fillStyle = P.sage2; for (let x = xa + 12; x < xb; x += 26) c.fillRect(x, CT + 22, 3, 666 - CT - 34);
    c.fillStyle = rgba(P.ink, 0.25); c.fillRect(xa, 662, xb - xa, 4);
  }
  function drawRightCounter(c, t) {
    const P = K.P;
    // straw jar
    { const x = 1046; c.fillStyle = rgba('#e8f0f2', 0.55); c.fillRect(x - 10, CT - 26, 20, 26); STRAWS.forEach((col, i) => { c.fillStyle = L(col); c.save(); c.translate(x - 5 + i * 3.4, CT - 2); c.rotate(-0.16 + i * 0.1); c.fillRect(-1.5, -40, 3, 38); c.restore(); }); }
    // register: base and a screen tilted to the guest
    { const x = REG; c.fillStyle = L('#3a3a3e'); c.fillRect(x - 18, CT - 18, 36, 18); c.fillStyle = L('#2e2e32'); c.fillRect(x - 2, CT - 30, 4, 12); c.save(); c.translate(x, CT - 38); c.rotate(-0.25); c.fillStyle = L('#2e2e32'); c.fillRect(-16, -11, 32, 22); c.fillStyle = L(P.night > 0.4 ? '#bfe6d4' : '#a8cfc0'); c.fillRect(-13, -8, 26, 16); c.restore(); }
    // stacked empty cups
    for (let i = 0; i < 6; i++) { c.fillStyle = rgba('#e8f0f2', 0.6); K.poly(c, [1228, CT - 30 - i * 5, 1246, CT - 30 - i * 5, 1244, CT - i * 5 - (i ? 25 : 0), 1230, CT - i * 5 - (i ? 25 : 0)]); c.fill(); c.fillStyle = rgba(P.ink, 0.12); c.fillRect(1228, CT - 30 - i * 5, 18, 1.2); }
  }
  function shadow(c, a) { if (a.alpha > 0.05) { c.fillStyle = `rgba(0,0,0,${0.16 * a.alpha})`; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } }
  function draw(c, t) {
    const P = K.P;
    drawRoom(c, t);
    c.fillStyle = P.floor; c.fillRect(-60, 600, 1400, 140 + K.extraB); c.fillStyle = P.floor2; for (let r = 0; r < 5; r++) { c.fillRect(-60, 610 + r * 30, 1400, 2); for (let i = 0; i < 26; i++) c.fillRect(-60 + i * 56 + (r % 2) * 28, 610 + r * 30, 2, 30); }
    if (wet()) { c.fillStyle = 'rgba(255,255,255,0.08)'; for (const g of custs()) if (g.umb) { ellipse(c, g.hx + 6, g.floorY + 4, 18, 3); c.fill(); } }
    K.drawBody(c, yuki, true); K.drawBody(c, ben, true);
    counter(c, -60, 238); drawLeftCounter(c, t);
    counter(c, 1036, 1340); drawRightCounter(c, t);
    for (const a of custs().sort((p, q) => p.hx - q.hx)) { shadow(c, a); K.drawBody(c, a, true); }
    K.shafts(c, [[WIN.x0 + 60, WIN.x0 + 240, WIN.x0 - 40, WIN.x0 + 120, WIN.y1, 720], [WIN.x1 - 240, WIN.x1 - 60, WIN.x1 - 120, WIN.x1 + 60, WIN.y1, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  return GeoKit.stage({ id: 'boba', pal: BobaPal, startHour: 11, span: 12, build, sim, draw, onClear, onGone, font: '700 15px sans-serif', vign: 'rgba(30,20,24,0.3)',
    debug: () => ({ orders: orders.map((o) => o.num + ':' + o.state).join(','), shelf: shelf.length, guests: custs().map((g) => g.type + ':' + g.phase + '@' + Math.round(g.hx)).join(' '), yuki: yuki.act ? yuki.act.name : '-', ben: ben.act ? ben.act.name : '-' }) });
}
registerStage('boba', makeGeoBobaStage);
