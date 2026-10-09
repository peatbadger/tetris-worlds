/* ================= World 2 · Mike's Pastry — GEOMETRIC edition v3 (fan tribute, no real logos) =================
   Hanover Street, North End, Boston — rebuilt from photos of the real shop: silver pressed-tin ceiling with recessed
   fluorescent panels, glossy white subway tile with a royal-blue band, terracotta hexagon floor, long curved glass
   cases on royal-blue bases with chrome trim and gold trays, the high white shelf of giant cannoli over a blue band
   of flavour labels, blue menu boards, white shelving of cookie trays and box stacks, blue & white string globes
   (one says CASH ONLY), a stainless fridge door, a crown plaque and the glass door onto Hanover St.
   Lighting, paper grain and mood follow the target painting (soft daylight shafts, restrained palette).
   Cast: Gina & Sal in royal-blue shirts serving two queues (pick, box, pull string, spin & tie, hand over, cash),
   Tony restocking trays from the fridge, and 2–4 customers in constant purposeful motion. */
const GeoPastry = (() => { // real-proportion pastries (units ~ px at s = 1); cannoli are SHORT & FAT (~2.2 : 1)
  const R = (seed) => { let x = seed * 9301 + 49297; return () => ((x = (x * 9301 + 49297) % 233280) / 233280); };
  const DIP = { chocdip: 1 };
  const CAN = { cannoli: ['#f6efe0', 'chip'], pista: ['#cfe0a8', 'pist'], chocdip: ['#f6efe0', 'chip'], bcream: ['#f2cc4a', 'none'], mixed: ['#f6efe0', 'pist'] };
  function sugar(c, x0, x1, y0, y1, n, a = 0.8, seed = 3) { const r = R(seed); c.fillStyle = `rgba(255,255,255,${a})`; for (let i = 0; i < n; i++) { c.beginPath(); c.arc(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), 0.35 + r() * 0.65, 0, TAU); c.fill(); } }
  function end(c, L, x, dir, cream, top) { // bulging cream at an open end, pressed into chips / chopped pistachio
    c.fillStyle = L(cream); c.beginPath(); c.ellipse(x + dir * 1.2, 0, 4.2, 6.4, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.07)'; c.beginPath(); c.ellipse(x - dir * 0.6, 1.4, 2.6, 4.2, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(x + dir * 2, -2.6, 1.2, 1.8, 0, 0, TAU); c.fill();
    if (top === 'chip') { c.fillStyle = L('#24150e'); for (const [dx, dy] of [[1.6, -4.4], [3.2, -2], [3.6, 1], [2.6, 3.8], [0.4, 5], [1, -1.4], [2.2, 0.4], [0.8, 2.6], [3.4, -4]]) { c.beginPath(); c.arc(x + dir * dx, dy, 0.85, 0, TAU); c.fill(); } }
    else if (top === 'pist') { const g = ['#6e9032', '#a6bc5a', '#58742a', '#c8d488']; for (let i = 0; i < 12; i++) { c.fillStyle = L(g[i % 4]); c.fillRect(x + dir * (0.4 + (i * 1.7) % 4.2) - 0.7, -5.2 + (i * 3.3) % 10.4, 1.6, 1.3); } }
  }
  function cannoli(c, L, kind, frac) { // body 24 long x 11 thick; wrapped dough seam; blistered
    const [cream, top] = CAN[kind] || CAN.cannoli, len = 18 * frac, x0 = -9, x1 = x0 + len;
    const g = c.createLinearGradient(0, -5.5, 0, 5.5); g.addColorStop(0, L('#e8b46a')); g.addColorStop(0.5, L('#c98a45')); g.addColorStop(1, L('#8a5226'));
    c.fillStyle = g; c.beginPath(); c.moveTo(x0, -5.4); c.lineTo(x1, -5.6); c.quadraticCurveTo(x1 + 1.6, 0, x1, 5.6); c.lineTo(x0, 5.4); c.quadraticCurveTo(x0 - 1.4, 0, x0, -5.4); c.fill();
    if (DIP[kind]) { c.fillStyle = L('#3a2116'); c.beginPath(); c.moveTo(x0, -5.4); c.lineTo(x0 + 5, -5.5); c.lineTo(x0 + 6.5, 5.5); c.lineTo(x0, 5.4); c.quadraticCurveTo(x0 - 1.4, 0, x0, -5.4); c.fill(); if (frac > 0.9) { c.beginPath(); c.moveTo(x1, -5.6); c.lineTo(x1 - 6, -5.5); c.lineTo(x1 - 4.5, 5.5); c.lineTo(x1, 5.6); c.fill(); } }
    c.strokeStyle = L('#9a6230'); c.lineWidth = 0.9; c.beginPath(); c.moveTo(x0 + 6, -5.4); c.lineTo(x0 + 2, 5.4); c.stroke();
    const r = R(11); for (let i = 0; i < 18; i++) { const bx = x0 + 1 + r() * (len - 2), by = -4.2 + r() * 8.4, lt = r() < 0.55; c.fillStyle = lt ? L('#f0c88a') : L('#8e5426'); c.beginPath(); c.arc(bx, by, 0.5 + r() * 0.8, 0, TAU); c.fill(); }
    c.fillStyle = 'rgba(255,246,226,0.4)'; c.fillRect(x0 + 2, -4.4, Math.max(1, len - 4), 1.3);
    sugar(c, x0 + 1, x1 - 1, -5.6, -1.2, 16, 0.85, 4);
    end(c, L, x1, 1, cream, top); if (frac > 0.95) end(c, L, x0, -1, cream, top);
  }
  function item(c, kind, x, y, s, L, frac = 1, ang = 0) {
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s);
    switch (kind) {
      case 'cannoli': case 'pista': case 'chocdip': case 'bcream': cannoli(c, L, kind, frac); break;
      default: if (CAN[kind]) cannoli(c, L, kind, frac);
      case 'lobster': { // fat flaky cone: crisp spiral ridges, sugar, cream at the wide end
        const g = c.createLinearGradient(0, -8, 0, 9); g.addColorStop(0, L('#e6b46c')); g.addColorStop(1, L('#8e5426'));
        const tip = -13 * frac; c.fillStyle = g; c.beginPath(); c.moveTo(tip, -1); c.quadraticCurveTo(-4, -10, 12, -8.5); c.lineTo(12, 8.5); c.quadraticCurveTo(-4, 10, tip, 1.5); c.closePath(); c.fill();
        for (let i = 0; i < 7; i++) { const xx = -9 + i * 3.4; if (xx < tip + 2) continue; const h = 4 + i * 0.75; c.strokeStyle = L('#7a4418'); c.lineWidth = 1.1; c.beginPath(); c.moveTo(xx + 1.6, -h); c.quadraticCurveTo(xx - 2.2, 0, xx + 1.6, h); c.stroke(); c.strokeStyle = L('#f2cb8c'); c.lineWidth = 0.7; c.beginPath(); c.moveTo(xx + 2.6, -h + 0.6); c.quadraticCurveTo(xx - 1, 0, xx + 2.6, h - 0.6); c.stroke(); }
        c.fillStyle = L('#f8f2e4'); c.beginPath(); c.ellipse(12.5, 0.5, 3.8, 7.4, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(0,0,0,0.06)'; c.beginPath(); c.ellipse(12, 2.5, 2.2, 4, 0, 0, TAU); c.fill();
        sugar(c, tip + 2, 10, -9, -3, 26, 0.9, 6); break; }
      case 'sfog': { // clam shell
        const g = c.createLinearGradient(0, -9, 0, 7); g.addColorStop(0, L('#e6b46c')); g.addColorStop(1, L('#9a5e2a'));
        c.fillStyle = g; c.beginPath(); c.moveTo(-10, 6); c.quadraticCurveTo(-12, -8, 2, -9); c.quadraticCurveTo(12, -6, 10, 6); c.quadraticCurveTo(0, 8, -10, 6); c.fill();
        for (let i = 0; i < 7; i++) { const u = i / 6; c.strokeStyle = L(i % 2 ? '#f0c786' : '#86501f'); c.lineWidth = i % 2 ? 1.4 : 0.9; c.beginPath(); c.moveTo(-1.5 + u * 3, 6.3); c.quadraticCurveTo(lerp(-8, 8, u), -2, lerp(-10, 10, u), -8 + Math.abs(u - 0.45) * 7); c.stroke(); }
        sugar(c, -8, 8, -9, -3, 18, 0.85, 8); break; }
      case 'flor': { // florentine: thin lacy almond disc, chocolate half
        c.fillStyle = L('#c8873a'); c.beginPath(); c.ellipse(0, 0, 9, 3.4, 0, 0, TAU); c.fill(); c.fillStyle = L('#e6b05e'); const r = R(13); for (let i = 0; i < 12; i++) { c.beginPath(); c.arc((r() - 0.5) * 15, (r() - 0.6) * 4, 0.9, 0, TAU); c.fill(); }
        c.fillStyle = L('#3a2116'); c.beginPath(); c.ellipse(0, 1.4, 9, 2.2, 0, 0, Math.PI); c.fill(); break; }
      case 'rainbow': { // rainbow cookie: green / white / red almond sponge, chocolate top & bottom (real 2:1 bar)
        const w = 16 * frac; c.fillStyle = L('#3a2116'); c.fillRect(-8, -6.2, w, 1.4); c.fillStyle = L('#5f8f4a'); c.fillRect(-8, -4.8, w, 3.2); c.fillStyle = L('#f2e6c8'); c.fillRect(-8, -1.6, w, 3.2); c.fillStyle = L('#c43a34'); c.fillRect(-8, 1.6, w, 3.2); c.fillStyle = L('#3a2116'); c.fillRect(-8, 4.8, w, 1.2); break; }
      case 'macaroon': { c.fillStyle = L('#d9a35a'); c.beginPath(); c.ellipse(0, 0, 7.5, 4.6, 0, 0, TAU); c.fill(); c.fillStyle = L('#f2d29a'); c.beginPath(); c.ellipse(-1, -1.6, 5, 2.2, 0, 0, TAU); c.fill(); c.fillStyle = L('#f6ead2'); for (const [dx, dy] of [[-3, -2], [2, -2.6], [3.6, 0.4]]) { c.beginPath(); c.ellipse(dx, dy, 1.8, 0.9, 0.4, 0, TAU); c.fill(); } break; }
      case 'tira': { const w = 16 * frac; for (const [cc, yy, hh] of [['#efe2c6', -6, 2.6], ['#9a6a40', -3.4, 2.4], ['#f2e6cc', -1, 2.6], ['#8e5e36', 1.6, 2.4], ['#efe2c6', 4, 2.6]]) { c.fillStyle = L(cc); c.fillRect(-8, yy, w, hh); } c.fillStyle = L('#5a3622'); c.fillRect(-8, -7.4, w, 1.6); break; }
      case 'cheese': { const w = 16 * frac; c.fillStyle = L('#7a4c2a'); c.fillRect(-8, 3, w, 3); c.fillStyle = L('#f4ead2'); c.fillRect(-8, -4, w, 7); c.fillStyle = L('#b02634'); c.fillRect(-8, -6, w, 2.2); c.fillStyle = L('#c42a34'); c.beginPath(); c.arc(-3, -7, 2.6, 0, TAU); c.arc(3, -7.2, 2.8, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.5)'; c.fillRect(-4, -8.6, 1.4, 0.9); c.fillRect(2, -8.8, 1.4, 0.9); break; }
    }
    c.restore();
  }
  function flavor(key, cream, top, dip) { CAN[key] = [cream, top]; if (dip) DIP[key] = 1; return key; }
  const NAMES = { cannoli: 'Ricotta cannoli', pista: 'Pistachio cannoli', chocdip: 'Chocolate dipped', bcream: 'Boston cream cannoli', lobster: 'Lobster tail', sfog: 'Sfogliatella', flor: 'Florentine', rainbow: 'Rainbow cookie', macaroon: 'Almond macaroon', tira: 'Tiramisu', cheese: 'Cheesecake' };
  return { item, NAMES, flavor };
})();

const MikesPal = GeoKit.palette({
  morning: { tile: '#f0ece2', tileLine: '#d8d6d0', blue: '#2a4a9c', blueDk: '#1f3a80', tin: '#b8bcc0', tin2: '#8e9398', tinHi: '#e2e4e6', chrome: '#c8ccd0', gold: '#c8a050', goldDk: '#9a7634', floor: '#bc5c40', floor2: '#9c4632', grout: '#7a3a2a', fluo: '#f4f8ff', fluoA: 1, steel: '#b4b8bc', box: '#ffffff', str: '#ffffff', wood: '#6a4a32', sky0: '#bcd0de', sky1: '#f2e2c8', brick: '#a65844', brick2: '#8a4636', brick3: '#c8b08a', winOut: '#71858f', winLit: '#ffe2a8', street: '#9c968e', lamp: '#ffe6b0', lampOn: 0, sun: '#fffbe8', cloud: '#ffffff', shaft: '#fff0d2', shaftA: 0.32, glow: '#ffe0b0', glowA: 0.05, amb: '#000000', ambK: 0, neon: '#ffcc66', neonA: 0.3, skin: '#e2ad86', bubble: '#ffffff', ink: '#22242a', royal: '#2c4ea0', camel: '#b2875a', bottle: '#3a5342', charcoal: '#363638', brick4: '#8a463a', sage: '#869880', oat: '#cdb994', navy: '#34405a', plum: '#5a424e', olive: '#666646', brown: '#664632', grey: '#8c8a84', white: '#f6f4ee', dark: '#24221e', cream: '#e8dcc4', hairGrey: '#cfc8bc', coral: '#a04a3c', mustard: '#b8924a', teal: '#3a5a5a', denim: '#4a5e7a', khaki: '#a89a74', rose: '#b07870' },
  day: { tile: '#f2f0ea', tileLine: '#d8d6d0', blue: '#2a4a9c', blueDk: '#1f3a80', tin: '#b8bcc0', tin2: '#8e9398', tinHi: '#e2e4e6', chrome: '#c8ccd0', gold: '#c8a050', goldDk: '#9a7634', floor: '#b8583e', floor2: '#9c4632', grout: '#7a3a2a', fluo: '#f4f8ff', fluoA: 1, steel: '#b4b8bc', box: '#ffffff', str: '#ffffff', wood: '#6a4a32', sky0: '#a8c8e0', sky1: '#e8eef0', brick: '#a65844', brick2: '#8a4636', brick3: '#c8b08a', winOut: '#71858f', winLit: '#ffe2a8', street: '#9c968e', lamp: '#ffe6b0', lampOn: 0, sun: '#fffbe8', cloud: '#ffffff', shaft: '#fff6e2', shaftA: 0.26, glow: '#fff0d0', glowA: 0.05, amb: '#000000', ambK: 0, neon: '#ffcc66', neonA: 0.3, skin: '#dea47c', bubble: '#ffffff', ink: '#22242a', royal: '#2c4ea0', camel: '#b2875a', bottle: '#3a5342', charcoal: '#363638', brick4: '#8a463a', sage: '#869880', oat: '#cdb994', navy: '#34405a', plum: '#5a424e', olive: '#666646', brown: '#664632', grey: '#8c8a84', white: '#f6f4ee', dark: '#24221e', cream: '#e8dcc4', hairGrey: '#cfc8bc', coral: '#a04a3c', mustard: '#b8924a', teal: '#3a5a5a', denim: '#4a5e7a', khaki: '#a89a74', rose: '#b07870' },
  dusk: { tile: '#ecdcc4', tileLine: '#cfc0a8', blue: '#26448e', blueDk: '#1f3a80', tin: '#a8a49c', tin2: '#82807a', tinHi: '#d0c8b8', chrome: '#c8ccd0', gold: '#c8a050', goldDk: '#9a7634', floor: '#a84e36', floor2: '#8c3e2c', grout: '#7a3a2a', fluo: '#f4f8ff', fluoA: 1, steel: '#b4b8bc', box: '#ffffff', str: '#ffffff', wood: '#6a4a32', sky0: '#d47e56', sky1: '#f2c27a', brick: '#8e4636', brick2: '#70342a', brick3: '#c8b08a', winOut: '#5a4a54', winLit: '#ffe2a8', street: '#8a7266', lamp: '#ffe6b0', lampOn: 0.65, sun: '#fffbe8', cloud: '#ffffff', shaft: '#ffbe7a', shaftA: 0.3, glow: '#ffc070', glowA: 0.14, amb: '#4a2010', ambK: 0.06, neon: '#ffcc66', neonA: 0.7, skin: '#d6966a', bubble: '#ffffff', ink: '#22242a', royal: '#2c4ea0', camel: '#b2875a', bottle: '#3a5342', charcoal: '#363638', brick4: '#8a463a', sage: '#869880', oat: '#cdb994', navy: '#34405a', plum: '#5a424e', olive: '#666646', brown: '#664632', grey: '#8c8a84', white: '#f6f4ee', dark: '#24221e', cream: '#e8dcc4', hairGrey: '#cfc8bc', coral: '#a04a3c', mustard: '#b8924a', teal: '#3a5a5a', denim: '#4a5e7a', khaki: '#a89a74', rose: '#b07870' },
  night: { tile: '#e6e6e2', tileLine: '#c4c4c0', blue: '#22408a', blueDk: '#1f3a80', tin: '#9ca0a6', tin2: '#74787e', tinHi: '#c8ccd2', chrome: '#c8ccd0', gold: '#c8a050', goldDk: '#9a7634', floor: '#9c4a34', floor2: '#82392a', grout: '#5a2a20', fluo: '#f4f8ff', fluoA: 1, steel: '#b4b8bc', box: '#ffffff', str: '#ffffff', wood: '#6a4a32', sky0: '#0f1630', sky1: '#232c4e', brick: '#4a2a2c', brick2: '#341c20', brick3: '#6a5a4a', winOut: '#1a2034', winLit: '#ffe2a8', street: '#34303a', lamp: '#ffe6b0', lampOn: 1, sun: '#fff0c0', cloud: '#4a5070', shaft: '#fff6e2', shaftA: 0, glow: '#e8f0ff', glowA: 0.22, amb: '#141838', ambK: 0.12, neon: '#ffcc66', neonA: 1, skin: '#cf9168', bubble: '#ffffff', ink: '#22242a', royal: '#2c4ea0', camel: '#b2875a', bottle: '#3a5342', charcoal: '#363638', brick4: '#8a463a', sage: '#869880', oat: '#cdb994', navy: '#34405a', plum: '#5a424e', olive: '#666646', brown: '#664632', grey: '#8c8a84', white: '#f6f4ee', dark: '#24221e', cream: '#e8dcc4', hairGrey: '#cfc8bc', coral: '#a04a3c', mustard: '#b8924a', teal: '#3a5a5a', denim: '#4a5e7a', khaki: '#a89a74', rose: '#b07870' },
  snow: { sky0: '#b8c4d4', sky1: '#e8ecf2', brick: '#9a7068', brick2: '#7e5a54', winOut: '#9aa8b8', street: '#e8ecf0', cloud: '#f4f6fa', shaft: '#eef2ff', shaftA: 0.12 },
}, [[7, 'morning'], [10, 'day'], [15.5, 'day'], [18.5, 'dusk'], [20.5, 'night'], [26, 'night'], [31, 'morning']]);

function makeGeoMikesStage() {
  const P0 = GeoPastry, it = P0.item;
  const STAFF_FLOOR = 606, FRONT_FLOOR = 706, LANE_FLOOR = 716, STAFF_SC = 0.86, FRONT_SC = 0.84;
  const CL = { x0: -14, x1: 252, top: 474, g1: 600, base: 652, end: 1 }, CR = { x0: 992, x1: 1182, top: 474, g1: 600, base: 652, end: -1 };
  const SHELF_Y = [534, 582];
  const DOOR = { x0: 1192, x1: 1296, y0: 270, y1: 652, cx: 1240 };
  const FRIDGE = { x0: 560, x1: 676, y0: 232, y1: 606, cx: 618 };
  const GLOBES = [[58, 0], [196, 1], [1024, 1, 1], [1150, 0]].map(([x, blue, cash]) => ({ x, y: 304, blue, cash, sw: 0, sv: 0 }));
  const TRAYS = [ // kind, x0, x1, shelf, case
    ['cannoli', 4, 84, 0], ['pista', 88, 168, 0], ['chocdip', 172, 248, 0], ['bcream', 4, 84, 1], ['lobster', 88, 168, 1], ['sfog', 172, 248, 1],
    ['rainbow', 998, 1088, 0], ['flor', 1092, 1178, 0], ['macaroon', 998, 1088, 1], ['tira', 1092, 1134, 1], ['cheese', 1138, 1178, 1]]
    .map(([kind, x0, x1, sh]) => ({ kind, x0, x1, sh, side: x0 > 800 ? 'R' : 'L', n: 0, per: Math.max(2, Math.floor((x1 - x0 - 8) / (kind === 'lobster' || kind === 'sfog' ? 30 : 24))) })).map((t) => Object.assign(t, { max: t.per * 2 }));
  const ORDW = { L: { cannoli: 6, pista: 3, chocdip: 2.5, bcream: 2, lobster: 3, sfog: 1.2 }, R: { rainbow: 2, flor: 2, macaroon: 2, tira: 1, cheese: 1 } };
  let K, gina, sal, tony, QL, QR, doorT = 0, doorOpenT = 0, bellT = 0, fridgeT = 0, flick = 0, flickT = 20, nextArrive = 2, smudge = 0, signOpen = 1, outside = [], nextOut = 3;
  const B = GeoKit.body;
  const TYPES = {
    camera: { body: B({ T: 236, hw: 54, headR: 26, pattern: 'coat', coat: 0.62, belt: 1, top: 'camel', shirt: 'cream', hairStyle: 'bun', camera: 1, pants: 'dark' }), words: ['Two ricotta, please', 'Are those lobster tails?'], kinds: ['cannoli', 'lobster'], side: 'L' },
    green: { body: B({ T: 246, hw: 60, headR: 27, pattern: 'coat', coat: 0.72, top: 'bottle', shirt: 'cream', tie: 'brick4', hairStyle: 'short', pants: 'charcoal' }), words: ['Half dozen, mixed', 'Box of six, please'], big: 1, side: 'R' },
    student: { body: B({ T: 238, hw: 56, headR: 27, pattern: 'knit', top: 'brick4', shirt: 'cream', backpack: 1, packCol: 'olive', pants: 'denim', hairStyle: 'short', hair: 'brown' }), words: ['One pistachio!', 'Study fuel'], kinds: ['pista'], side: 'L' },
    local: { body: B({ T: 232, hw: 52, headR: 26, pattern: 'cardigan', top: 'grey', top2: 'cream', hairStyle: 'long', skirt: 'navy', tights: 1 }), words: ['The usual, Gina', 'Rainbow cookies, a pound'], side: 'R' },
    nonno: { body: B({ T: 226, hw: 58, headR: 27, pattern: 'cardigan', top: 'brown', top2: 'oat', hair: 'hairGrey', hat: 'flatcap', hatCol: 'grey', glasses: 1, pants: 'charcoal' }), words: ['Buongiorno!', 'Sfogliatella, Sal'], kinds: ['sfog', 'macaroon'], slow: 1, side: 'R' },
    mum: { body: B({ T: 232, hw: 52, headR: 26, pattern: 'coat', coat: 0.5, top: 'rose', shirt: 'cream', hairStyle: 'bob', pants: 'navy' }), words: ['Pick one, honey', 'Two chocolate dipped'], kinds: ['chocdip', 'bcream'], side: 'L' },
    kid: { body: B({ T: 152, hw: 40, headR: 25, pattern: 'knit', top: 'mustard', pants: 'navy', hat: 'beanie', hatCol: 'royal', arm: 0.95 }), kid: 1 },
    tourist: { body: B({ T: 240, hw: 56, headR: 27, pattern: 'tee', top: 'white', pants: 'khaki', hairStyle: 'short', hat: 'cap', hatCol: 'navy', shortSleeve: 1 }), words: ['Which one is famous?', 'Lobster tail!'], kinds: ['lobster', 'cannoli'], side: 'L' },
    suit: { body: B({ T: 244, hw: 60, headR: 27, pattern: 'coat', coat: 0.68, top: 'charcoal', shirt: 'white', tie: 'royal', pants: 'charcoal' }), words: ['A pound of cookies', 'Mixed box, please'], big: 1, side: 'R' },
  };
  const PARTIES = [{ m: ['camera'], w: [1, 4, 3, 1] }, { m: ['green'], w: [3, 2, 2, 1] }, { m: ['student'], w: [1, 2, 2, 3] }, { m: ['local'], w: [3, 2, 2, 1] }, { m: ['nonno'], w: [5, 1, 0.3, 0] },
    { m: ['mum', 'kid'], w: [1, 3, 2, 0] }, { m: ['tourist'], w: [1, 4, 3, 1] }, { m: ['suit'], w: [3, 2, 0.5, 0] }];
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 6 ? 3 : h < 11 ? 0 : h < 17 ? 1 : h < 21 ? 2 : 3; };
  const customers = () => K.actors.filter((a) => a.cust);
  const people = () => K.actors.filter((a) => a.cust && !a.gone);
  const L = (h) => K.L(h);
  const trayOf = (kind) => TRAYS.find((t) => t.kind === kind);
  const slotX = (t, i) => t.x0 + 14 + (i % t.per) * ((t.x1 - t.x0 - 24) / Math.max(1, t.per - 1));
  const wpick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = Math.random() * s; for (const k in o) { r -= o[k]; if (r <= 0) return k; } return Object.keys(o)[0]; };
  /* ---------- held items ---------- */
  const H = {
    pastry: (kind, frac = 1) => ({ kind, frac, draw(c, x, y, s) { it(c, kind, x, y, s * 1.1, L, this.frac); } }),
    box: (b) => ({ box: b, draw(c, x, y, s, a) { drawBox(c, x, y + 12 * s, s * 0.95, b); } }),
    cash: () => ({ draw(c, x, y, s) { c.save(); c.translate(x, y); c.rotate(-0.3); c.fillStyle = L('#8aa882'); c.fillRect(-9 * s, -4 * s, 18 * s, 8 * s); c.fillStyle = L('#6a8a62'); c.fillRect(-3 * s, -2.5 * s, 6 * s, 5 * s); c.restore(); } }),
    tongs: () => ({ draw(c, x, y, s, a) { K.F.line(c, x, y, x + (a ? a.f : 1) * 12 * s, y + 9 * s, 1.6 * s, L('#d0d4d8')); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2f2ee'); roundRect(c, x - 9 * s, y - 2 * s, 18 * s, 9 * s, 2 * s); c.fill(); c.fillStyle = L('#2a4a9c'); c.fillRect(x - 9 * s, y + 3 * s, 18 * s, 1.5 * s); } }),
    tray: (kind) => ({ draw(c, x, y, s, a) { const f = a ? a.f : 1; c.fillStyle = L('#c8a050'); c.fillRect(x - 46 * s, y - 2 * s, 70 * s, 4 * s); c.fillStyle = L('#9a7634'); c.fillRect(x - 46 * s, y + 1 * s, 70 * s, 1.5 * s); for (let i = 0; i < 4; i++) it(c, kind, x - 36 * s + i * 17 * s, y - 6 * s, s * 0.62, L); } }),
    phone: () => ({ draw(c, x, y, s) { c.fillStyle = '#1e1e22'; roundRect(c, x - 4 * s, y - 13 * s, 8 * s, 14 * s, 1.5 * s); c.fill(); c.fillStyle = L('#9ab8d8'); c.fillRect(x - 3 * s, y - 12 * s, 6 * s, 11 * s); } }),
  };
  function drawBox(c, x, y, s, b) { // white pastry box (y = bottom); spin = rotation about the vertical axis while tying
    const sp = b.spin || 0, cw = Math.abs(Math.cos(sp)), sw = Math.abs(Math.sin(sp)), W = 44 * s, D = 30 * s, h = 20 * s;
    const fw = W * cw + D * sw, frontW = (Math.cos(sp) * Math.cos(sp) > 0.5 ? W : D) * Math.max(cw, sw);
    c.fillStyle = 'rgba(0,0,0,0.12)'; ellipse(c, x + 2, y + 1, fw / 2 + 2, 3 * s); c.fill();
    c.fillStyle = K.P.box; c.fillRect(x - fw / 2, y - h, fw, h); c.fillStyle = 'rgba(40,50,80,0.10)'; c.fillRect(x - fw / 2 + frontW, y - h, fw - frontW, h);
    if (b.lid < 1) { // open: rows of pastries + lid flap tilted back
      for (let i = 0; i < b.items.length; i++) it(c, b.items[i], x - fw / 2 + 10 * s + (i % 3) * 12 * s, y - h + 1 * s - Math.floor(i / 3) * 4 * s, s * 0.45, L, b.bit && i === b.items.length - 1 ? b.bit : 1);
      c.fillStyle = shade(K.P.box, -0.06); K.poly(c, [x - fw / 2, y - h, x + fw / 2, y - h, x + fw / 2 - 3 * s, y - h - 16 * s * (1 - b.lid), x - fw / 2 + 3 * s, y - h - 16 * s * (1 - b.lid)]); c.fill();
    } else { c.fillStyle = shade(K.P.box, -0.03); c.fillRect(x - fw / 2 - 1, y - h - 3 * s, fw + 2, 4 * s); c.fillStyle = L('#2a4a9c'); c.font = `700 ${Math.round(5 * s + 1)}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; if (cw > 0.6) c.fillText('♛', x - fw * 0.18, y - h * 0.45); }
    if (b.wrap > 0) { c.strokeStyle = 'rgba(70,80,110,0.55)'; c.lineWidth = 1.2 * s; const n = Math.ceil(b.wrap * 4); for (let i = 0; i < n; i++) { const u = ((i * 0.37 + sp * 0.16) % 1); const xx = x - fw / 2 + fw * (0.2 + u * 0.6); c.beginPath(); c.moveTo(xx, y); c.lineTo(xx, y - h - 3 * s); c.stroke(); } if (b.wrap > 0.5) { c.beginPath(); c.moveTo(x - fw / 2, y - h * 0.5); c.lineTo(x + fw / 2, y - h * 0.5); c.stroke(); } }
    if (b.tied) { c.strokeStyle = 'rgba(70,80,110,0.7)'; c.lineWidth = 1.4 * s; c.beginPath(); ellipse(c, x - 4 * s, y - h - 6 * s, 4 * s, 2.4 * s, -0.4); c.stroke(); c.beginPath(); ellipse(c, x + 4 * s, y - h - 6 * s, 4 * s, 2.4 * s, 0.4); c.stroke(); }
  }
  /* ---------- people ---------- */
  function mkCust(type, x, o = {}) {
    const T0 = TYPES[type], def = Object.assign({}, T0.body);
    const a = K.mk(def, Object.assign({ type, T0, cust: 1, hx: x, f: -1, floorY: LANE_FLOOR, sc: FRONT_SC, speed: (T0.slow ? 0.72 : 1) * rand(0.92, 1.08), alpha: 0, fade: 1.8, layer: 'front', posture: T0.slow ? 0.08 : 0, walkSp: 74 }, o));
    if (K.weatherNow === 'snow' && !T0.kid && Math.random() < 0.7) a.scarf = pick(['brick4', 'oat', 'royal', 'bottle', 'cream']);
    if (K.weatherNow === 'snow' && T0.body.pattern === 'tee') { a.def.pattern = 'coat'; a.def.coat = 0.4; a.def.top = 'navy'; a.def.shortSleeve = 0; }
    return a;
  }
  function spawnParty() {
    const p = per(), list = PARTIES.filter((q) => q.w[p] > 0); let s = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * s, pt = list[0];
    for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    if (customers().some((c) => pt.m.includes(c.type))) return false;
    const side = TYPES[pt.m[0]].side, Q = side === 'R' ? QR : QL;
    if (Q.q.length + pt.m.length > Q.spots.length || people().length + pt.m.length > 4) return false;
    const ex = side === 'R' ? DOOR.cx + 10 : -70, lead = mkCust(pt.m[0], ex, { f: side === 'R' ? -1 : 1 }); Q.q.push(lead); lead.Q = Q; lead.phase = 'enter';
    if (pt.m[1]) { const kid = mkCust(pt.m[1], ex + (side === 'R' ? 50 : -50), { delay: 0.6, sc: FRONT_SC }); kid.tagOf = lead; kid.phase = 'tag'; lead.kid = kid; kid.Qslot = Q; Q.q.push(kid); }
    if (side === 'R') openDoor();
    K.after(0.8, () => K.say(Q.staff, pick(['Hi there!', 'Be right with you!', 'Ciao!', 'Hey, welcome in!']), 1.5));
    return true;
  }
  function openDoor() { if (doorT < 0.3) { bellT = 1; K.fx('bell', DOOR.x0 + 12, DOOR.y0 - 14, { life: 0.9 }); } doorOpenT = 1.6; }
  function mkStaff() {
    gina = K.mk(B({ T: 232, hw: 52, headR: 26, pattern: 'polo', top: 'royal', top2: 'royal', hairStyle: 'pony', hair: 'brown', pants: 'dark', shortSleeve: 1 }), { role: 'gina', staff: 1, hx: 120, f: 1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', faceDir: 0.4 });
    sal = K.mk(B({ T: 240, hw: 60, headR: 27, pattern: 'polo', top: 'royal', top2: 'royal', hair: 'hairGrey', glasses: 1, pants: 'dark', shortSleeve: 1 }), { role: 'sal', staff: 1, hx: 1070, f: -1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', faceDir: -0.4, speed: 0.9 });
    tony = K.mk(B({ T: 244, hw: 62, headR: 27, pattern: 'bib', top: 'royal', top2: 'white', coat: 0.3, hat: 'chef', pants: 'dark', shortSleeve: 1 }), { role: 'tony', staff: 1, hx: -50, f: 1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', alpha: 0, away: 1 });
    QL = { side: 'L', spots: [196, 66], q: [], staff: gina, box: null, boxX: 112, reg: 226, regOpen: 0, ding: 0, c: CL, globe: GLOBES[1], orders: [], string: null };
    QR = { side: 'R', spots: [1122, 990], q: [], staff: sal, box: null, boxX: 1062, reg: 1152, regOpen: 0, ding: 0, c: CR, globe: GLOBES[3], orders: [], string: null };
    gina.Q = QL; sal.Q = QR; gina.think = staffThink; sal.think = staffThink;
  }
  /* ---------- staff jobs ---------- */
  const reach = (a, x, sh) => { a.tgN = [x, SHELF_Y[sh] - 10]; a.leanT = 0.3; a.lxT = 0.15 * a.f; };
  const walkP = (fx, max = 10) => K.ph(0, null, { enter: (s) => { s.walkTo = typeof fx === 'function' ? fx(s) : fx; }, until: (s) => !s.walking && s.walkTo == null, max });
  function pickPh(a, kind, onLift) {
    const t = trayOf(kind); let tx = 0;
    return [walkP((s) => (tx = clamp(slotX(t, Math.max(0, t.n - 1)), 30, 1160)) - s.f * 0 + (s.hx > tx ? 22 : -22), 9),
      K.ph(0.45, (s, u) => { s.f = Math.sign(tx - s.hx) || s.f; s.hold.F = H.tongs(); reach(s, tx, t.sh); s.tgF = [s.hx + s.f * 14, s.Q.c.top - 34]; }),
      K.ph(0.35, (s) => { reach(s, tx, t.sh); s.tgN[1] += 4; }, { exit: (s) => { if (t.n > 0) t.n--; s.hold.N = H.pastry(kind); s.hold.F = null; if (onLift) onLift(s); } }),
      K.ph(0.4, (s) => { s.tgN = [s.hx + s.f * 18, s.Q.c.top - 40]; s.leanT = 0.06; })];
  }
  function serve(a, o) {
    const Q = a.Q, cust = o.cust, bx = Q.boxX, g = Q.globe;
    const ph = [K.ph(0.5, (s) => { s.look = { x: () => cust.hx, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['You got it!', 'Coming right up!', 'Sure thing, hon', 'Okay!']), 1.3) }),
      walkP(bx + 24, 9),
      K.ph(0.6, (s, u) => { s.f = -1; s.tgN = [bx + 8, Q.c.top - 18 - u * 6]; s.tgF = [bx - 12, Q.c.top - 18]; s.leanT = 0.14; if (!Q.box) Q.box = { items: [], lid: 0, wrap: 0, spin: 0, tied: false, x: bx }; })];
    o.items.forEach((kind) => {
      ph.push(...pickPh(a, kind, null));
      ph.push(walkP(bx + 24, 9));
      ph.push(K.ph(0.35, (s) => { s.f = -1; s.tgN = [bx - 8 + Q.box.items.length * 3, Q.c.top - 14]; s.leanT = 0.18; }, { exit: (s) => { Q.box.items.push(kind); s.hold.N = null; } }));
    });
    ph.push(K.ph(0.5, (s, u) => { s.tgN = [bx - 12, Q.c.top - 34 + u * 12]; s.tgF = [bx + 12, Q.c.top - 34 + u * 12]; Q.box.lid = smooth(u); s.armsFront = true; }));
    // turn to the hanging globe, pull string down, spin the box to wrap it, snap and tie
    ph.push(K.ph(0.55, (s, u) => { s.f = Math.sign(g.x - s.hx) || 1; s.lxT = s.f; s.tgN = [lerp(bx, g.x, smooth(Math.min(1, u * 1.6))), lerp(Q.c.top - 30, g.y + 20, smooth(Math.min(1, u * 1.6)))]; s.leanT = -0.02; }, { exit: (s) => { Q.string = { g, hand: s.hN }; g.sv += (s.hx < g.x ? -1 : 1) * 0.6; } }));
    ph.push(K.ph(0.55, (s, u) => { const e = smooth(u); s.tgN = [lerp(g.x, bx + 6, e), lerp(g.y + 20, Q.c.top - 24, e)]; s.f = Math.sign(bx - s.hx) || -1; s.lxT = s.f * 0.4; }));
    ph.push(K.ph(1.3, (s, u, t) => { const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; Q.box.spin = e * TAU * 2; Q.box.wrap = u; s.tgN = [bx + 20, Q.c.top - 16]; s.tgF = [bx - 20, Q.c.top - 16]; s.leanT = 0.16; Q.string = { g, box: Q.box }; g.sv += Math.sin(t * 12) * 0.02; }));
    ph.push(K.ph(0.45, (s, u, t) => { s.tgN = [bx + 4 + Math.sin(t * 28) * 5, Q.c.top - 30 - u * 8]; s.tgF = [bx - 4 - Math.sin(t * 28) * 5, Q.c.top - 28]; }, { exit: (s) => { Q.box.tied = true; Q.box.spin = 0; Q.string = null; g.sv += 0.5; K.fx('snap', bx, Q.c.top - 34, { life: 0.35 }); } }));
    ph.push(K.ph(0.35, (s) => { s.tgN = [bx, Q.c.top - 22]; s.tgF = [bx - 10, Q.c.top - 22]; }, { exit: (s) => { s.hold.N = H.box(Q.box); Q.box = null; s.armsFront = false; } }));
    ph.push(walkP(() => clamp(cust.hx + 18 * (Q.side === 'L' ? 1 : -1), Q.c.x0 + 30, Q.c.x1 - 20), 10));
    ph.push(K.ph(0.8, (s, u) => { s.tgN = [s.hx + s.f * 14, Q.c.top - 46]; s.leanT = 0.2; cust.reachTo = [s.hN.x + 8 * Math.sign(cust.hx - s.hx || 1), s.hN.y + 4]; }, { enter: (s) => { s.f = Math.sign(cust.hx - s.hx) || 1; K.say(a, pick(['Here you go!', 'Enjoy!', 'There ya go, hon', 'Grazie!']), 1.3); }, exit: (s) => { cust.hold.N = s.hold.N; s.hold.N = null; cust.reachTo = null; cust.gotIt = true; } }));
    ph.push(K.ph(0.9, (s) => { s.tgN = [s.hx + s.f * 18, Q.c.top - 44]; cust.payTo = [s.hN.x + 4 * Math.sign(cust.hx - s.hx || 1), s.hN.y + 2]; }, { exit: (s) => { cust.payTo = null; cust.hold.F = null; s.hold.N = H.cash(); cust.paid = true; } }));
    ph.push(walkP(Q.reg + (Q.side === 'L' ? -30 : -30), 9));
    ph.push(K.ph(0.7, (s, u) => { s.f = 1; s.tgN = [Q.reg - 4, Q.c.top - 26]; Q.regOpen = Math.sin(u * Math.PI); }, { exit: (s) => { s.hold.N = null; Q.regOpen = 0; Q.ding = 1; } }));
    K.start(a, 'serve', ph, { onEnd: (s) => { s.armsFront = false; Q.orders.splice(Q.orders.indexOf(o), 1); }, onAbort: (s) => { s.armsFront = false; s.hold.N = null; s.hold.F = null; Q.string = null; } });
  }
  function staffThink(a) {
    const Q = a.Q;
    const o = Q.orders.find((q) => !q.taken); if (o) { o.taken = a; return serve(a, o); }
    const low = TRAYS.find((t) => t.side === Q.side && t.n <= 2);
    if (low && Q.side === 'R' && K.cooled(a, 'call', 6)) { a.cool.call = K.simT; return callTony(low); }
    if (low && tony.away && K.cooled(a, 'call', 6)) { K.say(a, 'Tony! ' + P0.NAMES[low.kind] + '!', 1.5); callTony(low); return K.start(a, 'call', [K.ph(1.1, (s) => { s.lxT = Q.side === 'L' ? 1 : -1; s.tgN = [s.hx + s.lxT * 24, s.hy - 100]; })]); }
    const head = Q.q[0]; if (head && head.phase === 'wait' && !head.ordered && K.cooled(a, 'next', 5)) return K.start(a, 'next', [walkP(clamp(head.hx, Q.c.x0 + 50, Q.c.x1 - 50), 8), K.ph(1.2, (s) => { s.f = 1; s.look = { x: () => head.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + 18, Q.c.top - 20]; s.leanT = 0.12; }, { enter: () => K.say(a, pick(['Who\'s next?', 'What can I get ya?', 'Next!']), 1.4) })]);
    const r = Math.random();
    if (r < 0.3) { const t = pick(TRAYS.filter((q) => q.side === Q.side)); return K.start(a, 'tidy', [walkP((t.x0 + t.x1) / 2, 7), K.ph(1.6, (s, u, tt) => { s.hold.F = H.tongs(); reach(s, (t.x0 + t.x1) / 2 + Math.sin(tt * 3) * 26, t.sh); }, { exit: (s) => { s.hold.F = null; } })], { onAbort: (s) => { s.hold.F = null; } }); }
    if (r < 0.55) return K.start(a, 'wipe', [walkP(Q.side === 'L' ? rand(60, 400) : rand(920, 1130), 7), K.ph(1.8, (s, u, tt) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 14 + Math.sin(tt * 6) * 16, Q.c.top - 6]; s.tgF = [s.hx - 10, Q.c.top - 6]; s.leanT = 0.16; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (r < 0.75 && !Q.box) return K.start(a, 'fold', [walkP(Q.boxX + 24, 7), K.ph(1.4, (s, u) => { s.f = -1; s.armsFront = true; if (!Q.flat) Q.flat = { items: [], lid: 0, wrap: 0, spin: 0, tied: false, fold: 0 }; Q.flat.fold = smooth(u); s.tgN = [Q.boxX + 14, Q.c.top - 10 - u * 10]; s.tgF = [Q.boxX - 14, Q.c.top - 10 - u * 10]; }, { exit: (s) => { s.armsFront = false; Q.flat = null; Q.stack = Math.min(4, (Q.stack || 1) + 1); } })], { onAbort: (s) => { s.armsFront = false; Q.flat = null; } });
    if (a === sal && r < 0.88) return K.start(a, 'count', [walkP(Q.reg - 30, 8), K.ph(rand(1.5, 2.4), (s, u, t) => { s.f = 1; s.tgN = [Q.reg - 4, Q.c.top - 26 + Math.sin(t * 10) * 2]; Q.regOpen = 0.6; }, { exit: () => { Q.regOpen = 0; } })], { onAbort: () => { Q.regOpen = 0; } });
    return K.start(a, 'idle', [K.ph(rand(1.4, 2.6), (s) => { s.lxT = (Q.side === 'L' ? 0.5 : -0.5); s.tgN = [s.hx + s.f * 16, Q.c.top - 8]; s.tgF = [s.hx - s.f * 2, Q.c.top - 8]; s.leanT = 0.1; })]);
  }
  function callTony(t) {
    const tx = (t.x0 + t.x1) / 2, kind = t.kind;
    if (t.side === 'R') { const a = sal; if (a.act) return; K.start(a, 'restock', [walkP(tx + 24, 8), K.ph(0.7, (s, u) => { s.f = -1; s.tgN = [tx, lerp(CR.top - 10, 640, Math.sin(u * Math.PI))]; s.tgF = [tx - 14, lerp(CR.top - 10, 640, Math.sin(u * Math.PI))]; s.leanT = 0.4 * Math.sin(u * Math.PI); s.headDy = 30 * Math.sin(u * Math.PI); }, { exit: (s) => { s.hold.N = H.tray(kind); s.headDy = 0; } }), K.ph(1.0, (s, u) => { s.carryUp = false; s.tgN = [tx + 10 - u * 20, SHELF_Y[t.sh] - 10]; s.tgF = [tx - 16 - u * 20, SHELF_Y[t.sh] - 10]; s.leanT = 0.3; t.n = Math.max(t.n, Math.round(t.max * u)); }, { exit: (s) => { s.hold.N = null; s.carryUp = undefined; t.n = t.max; } })], { onAbort: (s) => { s.hold.N = null; s.carryUp = undefined; s.headDy = 0; } }); return; }
    tony.away = 0; tony.alpha = 0; tony.fade = 2.2; tony.hx = -50;
    K.start(tony, 'tray', [K.ph(0.5, (s) => { s.hold.N = H.tray(kind); s.carryUp = true; }, { enter: () => K.say(tony, pick(['Fresh ones!', 'Hot outta the oven!', 'Comin\' through!']), 1.5) }),
      walkP(tx - 40, 14),
      K.ph(1.0, (s, u) => { s.f = 1; s.carryUp = false; s.tgN = [tx + s.f * -6 + u * s.f * 20, SHELF_Y[t.sh] - 10]; s.tgF = [tx - s.f * 26 + u * s.f * 20, SHELF_Y[t.sh] - 10]; s.leanT = 0.32; t.n = Math.max(t.n, Math.round(t.max * u)); }, { exit: (s) => { s.hold.N = null; t.n = t.max; K.fx('puff', tx, SHELF_Y[t.sh] - 20, { col: '#fff4e0', life: 0.6 }); } }),
      walkP(-50, 14), K.ph(0.3, (s) => { s.fade = -2.4; })], { onEnd: (s) => { s.away = 1; s.alpha = 0; s.carryUp = undefined; } });
  }
  /* ---------- customer behaviour ---------- */
  function custPose(a) {
    K.basePose(a);
    if (a.reachTo) { a.tgN = a.reachTo.slice(); a.leanT = 0.1; }
    if (a.payTo) { a.hold.F = a.hold.F || H.cash(); a.tgF = a.payTo.slice(); }
    if (a.state === 'stand' && !a.walking && a.Q && a.phase !== 'out' && !a.look) a.lxT = a.Q.side === 'L' ? -0.5 : 0.5;
  }
  const idx = (a) => (a.Q ? a.Q.q.indexOf(a) : -1);
  function neighbour(a) { const i = idx(a); if (i < 0) return null; return a.Q.q[i - 1] || a.Q.q[i + 1] || null; }
  function idleAct(a) { // lively but calm: point at the glass, lean in to look, chat, glance at the giant cannoli, phone
    const r = Math.random(), Q = a.Q, f = Q.side === 'L' ? -1 : 1;
    const t = pick(TRAYS.filter((q) => q.side === Q.side && Math.abs((q.x0 + q.x1) / 2 - a.hx) < 200)) || pick(TRAYS);
    if (r < 0.3) return K.start(a, 'point', [K.ph(1.4, (s, u) => { const e = Math.sin(u * Math.PI); s.tgN = [lerp(s.hx, clamp((t.x0 + t.x1) / 2, s.hx - 70, s.hx + 70), e), lerp(s.hy, SHELF_Y[t.sh] - 6, e)]; s.leanT = 0.1 * e; s.look = { x: () => (t.x0 + t.x1) / 2, until: K.simT + 0.2 }; }, { enter: () => { if (Math.random() < 0.5) K.say(a, pick([P0.NAMES[t.kind] + '?', 'Look at those!', 'That one!', 'icon:heart']), 1.3); } })]);
    if (r < 0.5) return K.start(a, 'lean', [K.ph(1.8, (s, u) => { const e = Math.sin(u * Math.PI); s.leanT = 0.3 * e; s.headDy = 6 * e; s.tgF = [s.hx + f * 8, s.hy - 6]; s.lxT = f * 0.3; })]);
    const nb = neighbour(a);
    if (r < 0.7 && nb && !nb.act && K.cooled(a, 'chat', 8)) { const [l1, l2] = pick([['First time here?', 'Every Sunday!'], ['Ricotta or pistachio?', 'Both!'], ['Worth the line', 'Always'], ['Cash only, right?', 'Yep'], ['Lobster tail is huge', 'icon:laugh']]); K.start(nb, 'listen', [K.ph(2.6, (s) => { s.look = { x: () => a.hx, until: K.simT + 0.2 }; }, { enter: () => K.after(1.2, () => K.say(nb, l2, 1.3)) })]); return K.start(a, 'chat', [K.ph(2.6, (s, u, tt) => { s.look = { x: () => nb.hx, until: K.simT + 0.2 }; s.tgN = [s.hx + Math.sign(nb.hx - s.hx) * 26 + Math.sin(tt * 4) * 6, s.hy - 30]; }, { enter: () => K.say(a, l1, 1.4) })]); }
    if (r < 0.82) return K.start(a, 'glance', [K.ph(1.6, (s) => { s.headDy = -4; s.lxT = f * 0.2; })]);
    if (r < 0.9 && !a.hold.N && !a.T0.kid) return K.start(a, 'phone', [K.ph(rand(1.8, 2.8), (s, u) => { s.hold.F = H.phone(); s.tgF = [s.R.cx + s.f * 10, s.R.cy + s.R.R * 2.2]; s.headDy = 4; s.carryUp = false; }, { exit: (s) => { s.hold.F = null; s.carryUp = undefined; s.headDy = 0; } })], { onAbort: (s) => { s.hold.F = null; s.carryUp = undefined; } });
    return K.start(a, 'idle', [K.ph(rand(1, 2), null)]);
  }
  function custThink(a) {
    if (a.phase === 'tag') { // kid sticks next to the parent; presses nose and hands to the glass
      const m = a.tagOf; if (!m || m.gone || m.phase === 'out') { if (a.Qslot) { const j = a.Qslot.q.indexOf(a); if (j >= 0) a.Qslot.q.splice(j, 1); a.Qslot = null; } a.phase = 'out'; a.exitL = m ? m.exitL : a.hx < 640; a.walkTo = a.exitL ? -90 : DOOR.cx + 30; return; }
      const tx = m.hx + (m.Q && m.Q.side === 'L' ? -64 : 64); if (Math.abs(a.hx - tx) > 6 && !a.act) { a.walkTo = tx; return; }
      if (!a.walking && m.phase !== 'enter' && K.cooled(a, 'nose', 9) && Math.random() < 0.5) return K.start(a, 'nose', [K.ph(0.5, (s, u) => { s.leanT = 0.18 * u; s.headDy = 8 * u; s.tgN = [s.hx - 8, 548]; s.tgF = [s.hx + 10, 552]; }), K.ph(2.2, (s) => { smudge = Math.min(1, smudge + K.dt * 0.3); s.smX = s.hx; }, { enter: () => K.say(a, pick(['Ooh!', 'That one!', 'icon:heart']), 1.2) }), K.ph(0.5, (s, u) => { s.leanT = 0.18 * (1 - u); s.headDy = 8 * (1 - u); })], { onEnd: (s) => { s.headDy = 0; } });
      if (!a.walking && Math.random() < 0.3) return K.start(a, 'idle', [K.ph(rand(1, 2), (s) => { s.look = { x: () => s.tagOf.hx, until: K.simT + 0.3 }; })]);
      return;
    }
    const Q = a.Q, i = idx(a);
    if (a.phase === 'enter' || a.phase === 'wait') { // queue shuffles forward as spots free up
      const tx = Q.spots[i]; if (Math.abs(a.hx - tx) > 3) { if (a.act) K.abort(a); a.walkTo = tx; return; }
      if (a.walking) return; a.phase = 'wait';
      if (i === 0 && !a.ordered && a.alpha >= 1) {
        const n = a.T0.big ? randi(5, 8) : randi(1, 3), kinds = [];
        for (let k = 0; k < n; k++) { let kd = a.T0.kinds && Math.random() < 0.7 ? pick(a.T0.kinds) : wpick(ORDW[Q.side]); if (trayOf(kd).side !== Q.side || trayOf(kd).n <= 0) kd = TRAYS.filter((t) => t.side === Q.side && t.n > 0).map((t) => t.kind)[0] || kd; kinds.push(kd); }
        const t = trayOf(kinds[0]); a.ordered = true;
        return K.start(a, 'order', [K.ph(1.4, (s, u) => { const e = Math.sin(Math.min(1, u * 1.4) * Math.PI * 0.5); s.tgN = [lerp(s.hx, clamp((t.x0 + t.x1) / 2, s.hx - 90, s.hx + 90), e), lerp(s.hy, SHELF_Y[t.sh] - 8, e)]; s.leanT = 0.12 * e; }, { enter: () => K.say(a, pick(a.T0.words.concat([kinds.length > 2 ? 'Box of ' + kinds.length + ', mixed' : P0.NAMES[kinds[0]] + (kinds.length > 1 ? ' x' + kinds.length : '') + ', please'])), 1.8) }),
          K.ph(0.4, null)], { onEnd: (s) => { Q.orders.push({ cust: s, items: kinds.slice(0, 8) }); } });
      }
      if (a.paid) { a.phase = Math.random() < 0.55 ? 'peek' : 'leave'; return; }
      if (a.ordered) return K.start(a, 'watch', [K.ph(rand(0.8, 1.6), (s) => { s.look = { x: () => Q.staff.hx, until: K.simT + 0.3 }; })]);
      if (!a.payTo && !a.reachTo && Math.random() < 0.6) return idleAct(a);
      return;
    }
    if (a.phase === 'peek') { // open the box, take one out, bite — powdered sugar puffs
      const b = a.hold.N && a.hold.N.box; if (!b) { a.phase = 'leave'; return; }
      const kind = b.items[b.items.length - 1] || 'cannoli';
      a.phase = 'peeking';
      return K.start(a, 'peek', [K.ph(0.5, (s, u) => { s.carryUp = true; s.tgF = [s.hx + s.f * 20, s.hy - s.def.T * 0.2]; }),
        K.ph(0.6, (s, u) => { b.lid = 1 - smooth(u) * 0.9; s.tgF = [s.hx + s.f * 16, s.hy - s.def.T * 0.24 - u * 6]; }, { exit: () => { b.tied = false; } }),
        K.ph(0.5, (s) => { s.tgF = [s.hx + s.f * 22, s.hy - s.def.T * 0.22]; s.headDy = 4; }, { exit: (s) => { s.hold.F = H.pastry(kind); b.items.pop(); } }),
        K.ph(0.5, (s) => { s.tgF = [s.R.cx + s.f * s.R.R * 0.9, s.R.cy + s.R.R * 0.6]; s.headDy = 0; s.farFront = true; }),
        K.ph(0.5, (s, u, t) => { s.headDy = Math.sin(t * 18) * 1.4; }, { exit: (s) => { s.hold.F.frac = 0.55; K.fx('sugar', s.hF.x, s.hF.y, { life: 0.9 }); } }),
        K.ph(1.0, (s, u, t) => { s.headDy = Math.sin(t * 14) * 1.2; s.tgF = [s.R.cx + s.f * s.R.R * 1.5, s.R.cy + s.R.R * 1.8]; }, { enter: () => K.say(a, pick(['Mmm!', 'Wicked good', 'Oh wow', 'icon:heart', 'Perfetto']), 1.3) }),
        K.ph(0.5, (s, u) => { b.lid = 0.1 + smooth(u) * 0.9; }, { exit: (s) => { s.farFront = false; } })],
        { onEnd: (s) => { s.phase = 'leave'; s.carryUp = undefined; }, onAbort: (s) => { s.phase = 'leave'; s.farFront = false; s.carryUp = undefined; b.lid = 1; } });
    }
    if (a.phase === 'leave') {
      if (Q) { const j = Q.q.indexOf(a); if (j >= 0) Q.q.splice(j, 1); a.Q = null; }
      if (a.hold.N && a.hold.N.box && !a.saidBye) { a.saidBye = 1; K.say(a, pick(['Thanks!', 'Grazie!', 'See ya!', 'Thank you!']), 1.2); }
      a.exitL = a.hx < 640; a.walkTo = a.exitL ? -90 : DOOR.cx + 30; if (a.kid) a.kid.exitL = a.exitL; a.phase = 'out'; return;
    }
    if (a.phase === 'out') { if (a.exitL) { if (a.hx < -30 && !a.fade) a.fade = -2.2; return; } if (a.hx > DOOR.cx - 50) { openDoor(); } if (a.hx > DOOR.cx - 10 && !a.fade) a.fade = -2.2; return; }
  }
  function sim(Kk, dt) {
    for (const a of K.actors) if (a.cust) {
      a.pose = custPose;
      const lane = a.phase === 'out' || a.phase === 'enter' && Math.abs(a.hx - (a.Q ? a.Q.spots[idx(a)] : a.hx)) > 60;
      a.floorY = K.ease(a.floorY, lane ? LANE_FLOOR : FRONT_FLOOR, 2.5, dt);
      if (!a.act && K.simT >= (a.nextThink2 || 0)) { custThink(a); a.nextThink2 = K.simT + rand(0.25, 0.7); }
    }
    nextArrive -= dt;
    const target = [2, 3.2, 2.8, 1.4][per()], n = people().length;
    if (nextArrive <= 0) { if (signOpen && n < target + 0.5) spawnParty(); nextArrive = rand(4, 9) * (n >= target ? 1.6 : 1); }
    // door, bell, fridge, globes, fluorescent flicker, street outside
    doorOpenT -= dt; doorT = K.ease(doorT, doorOpenT > 0 ? 1 : 0, 5, dt); bellT = Math.max(0, bellT - dt * 0.9); fridgeT = Math.max(0, fridgeT - dt);
    for (const g of GLOBES) { g.sv += (-g.sw * 9 - g.sv * 1.2) * dt; g.sw += g.sv * dt; }
    for (const Q of [QL, QR]) { Q.ding = Math.max(0, Q.ding - dt * 2); }
    flickT -= dt; if (flickT <= 0) { flick = 0.8; flickT = rand(18, 40); } flick = Math.max(0, flick - dt);
    const h = ((K.hour % 24) + 24) % 24;
    signOpen = h > 7 && h < 23 ? 1 : 0;
    nextOut -= dt; if (nextOut <= 0) { const dir = Math.random() < 0.5 ? 1 : -1; outside.push({ x: dir > 0 ? -20 : 120, dir, sp: rand(14, 22), box: Math.random() < 0.45, umb: (K.weatherNow === 'rain' || K.weatherNow === 'storm') && Math.random() < 0.8, col: pick(['#3a4658', '#8a463a', '#b2875a', '#3a5342', '#5a424e', '#8c8a84']), h: rand(0.9, 1.1), ph: rand(6) }); nextOut = rand(4, 10) * (h > 21 || h < 7 ? 2.5 : 1); }
    for (const o of outside) o.x += o.dir * o.sp * dt; outside = outside.filter((o) => o.x > -40 && o.x < 140);
    for (const a of K.actors) if (a.cust && a.phase === 'out' && a.alpha <= 0) a.gone = true;
    smudge = Math.max(0, smudge - dt * 0.004);
  }
  function onGone(Kk, a) { for (const Q of [a.Q, a.Qslot]) if (Q) { const j = Q.q.indexOf(a); if (j >= 0) Q.q.splice(j, 1); } }
  function onClear(Kk, big, n) {
    for (const a of customers()) if (!a.act || ['idle', 'glance', 'lean'].includes(a.act.name)) { K.after(rand(0, 0.4), () => { if (a.act) K.abort(a); K.start(a, 'cheer', [K.ph(1.1, (s, u) => { const q = Math.sin(u * Math.PI); s.tgN = [s.hx + s.f * 10, s.R.cy - s.R.R * 1.3 * q]; if (big) s.tgF = [s.hx - s.f * 6, s.R.cy - s.R.R * 1.2 * q]; s.bob = -q * 4; })], { onEnd: (s) => { s.bob = 0; } }); }); if (big || Math.random() < 0.5) K.after(0.2, () => K.say(a, pick(big ? ['Wicked!', 'Whoa!', 'icon:star'] : ['Nice!', 'icon:note']), 1.2)); }
    K.say(Math.random() < 0.5 ? gina : sal, pick(big ? ['Bravo!', 'Fantastico!', 'icon:star'] : ['Brava!', 'Nice one!']), 1.3);
  }
  function build(Kk) {
    K = Kk; mkStaff();
    TRAYS.forEach((t) => { t.n = Math.max(3, t.max - randi(0, 3)); });
    const h = ((K.hour % 24) + 24) % 24; signOpen = h > 7 && h < 23 ? 1 : 0;
    if (signOpen) { // seed: one waiting at each case, already inside
      for (const [type, Q] of [['camera', QL], ['nonno', QR]]) { const a = mkCust(type, Q.spots[0]); a.alpha = 1; a.fade = 0; a.floorY = FRONT_FLOOR; a.Q = Q; Q.q.push(a); a.phase = 'wait'; K.settle(a); }
    }
  }
  /* ---------- drawing ---------- */
  const FLAV = [['MOUSSE', '#7a4a30', 'chip', 1], ['CHOCOLATE', '#f6efe0', 'chip', 1], ['PISTACHIO', '#cfe0a8', 'pist'], ['FLORENTINE', '#f6efe0', 'chip'], ['ESPRESSO', '#b08a68', 'chip'], ['AMARETTO', '#ead9b4', 'none'],
    ['HAZELNUT', '#c8a878', 'pist'], ['RICOTTA', '#f6efe0', 'chip'], ['BOSTON CREAM', '#f2cc4a', 'none'], ['OREO', '#e8e4dc', 'chip'], ['LIMONCELLO', '#f2e08a', 'none'], ['TIRAMISU', '#e8d4b0', 'chip'],
    ['STRAWBERRY', '#e8a8a8', 'none'], ['NUTELLA', '#7a4a2e', 'none', 1], ['CARAMEL', '#d8a860', 'none'], ['PEANUT BUTTER', '#d8b07a', 'chip'], ['MINT CHIP', '#c4e2c4', 'chip'], ['CHOC CHIP', '#f6efe0', 'chip', 1]]
    .map(([n, cr, tp, dip], i) => ({ n, k: P0.flavor('fl' + i, cr, tp, dip) }));
  const rndF = mulberry32(77);
  const SHELFC = Array.from({ length: 40 }, () => rndF());
  function hexFloor(c, y0, y1, x0, x1, base, rh0, grow) {
    const P = K.P; c.fillStyle = base; c.fillRect(x0, y0, x1 - x0, y1 - y0);
    let y = y0, r = 0;
    while (y < y1) { const rh = rh0 + (y - y0) * grow, w = rh * 1.9, off = (r % 2) * w * 0.5 - (((x1 - x0) * 0.5 - 640) * 0);
      const persp = 1 + (y - y0) * 0.004;
      for (let q = -1; q * w < (x1 - x0) / persp + w; q++) { const cx = x0 + (q * w + off - (x1 - x0) / 2) * persp + (x1 - x0) / 2, hw = w * 0.48 * persp, hh = rh * 0.62;
        c.beginPath(); c.moveTo(cx - hw, y + rh * 0.5); c.lineTo(cx - hw * 0.5, y + rh * 0.5 - hh); c.lineTo(cx + hw * 0.5, y + rh * 0.5 - hh); c.lineTo(cx + hw, y + rh * 0.5); c.lineTo(cx + hw * 0.5, y + rh * 0.5 + hh); c.lineTo(cx - hw * 0.5, y + rh * 0.5 + hh); c.closePath();
        const v = SHELFC[(q + r * 7 + 400) % 40]; c.fillStyle = v < 0.14 ? mix(P.floor, P.floor2, 0.6) : v > 0.88 ? shade(P.floor, 0.04) : P.floor; c.fill(); c.strokeStyle = rgba(P.grout, 0.38); c.lineWidth = 1; c.stroke(); }
      y += rh * 0.62 * 2 * 0.5 + rh * 0.12 + 0.1; y = Math.max(y, y0 + (r + 1) * rh0 * 0.7); r++; }
  }
  function drawCeiling(c, t) {
    const P = K.P;
    c.fillStyle = linear(c, 0, 0, 0, 100, [[0, shade(P.tin, -0.32)], [1, P.tin]]); c.fillRect(-60, 0, 1400, 100);
    for (let x = -40; x < 1320; x += 58) for (let y = 2; y < 88; y += 44) {
      c.fillStyle = rgba(P.tinHi, 0.5); K.poly(c, [x + 3, y + 3, x + 55, y + 3, x + 51, y + 7, x + 7, y + 7]); c.fill();
      c.fillStyle = rgba(P.tin2, 0.6); K.poly(c, [x + 3, y + 41, x + 55, y + 41, x + 51, y + 37, x + 7, y + 37]); c.fill();
      const cx = x + 29, cy = y + 22; c.fillStyle = rgba(P.tin2, 0.55); K.poly(c, [cx, cy - 14, cx + 14, cy, cx, cy + 14, cx - 14, cy]); c.fill(); c.fillStyle = rgba(P.tinHi, 0.65); c.beginPath(); c.arc(cx - 1, cy - 1, 6, 0, TAU); c.fill(); c.fillStyle = rgba(P.tin2, 0.7); c.beginPath(); c.arc(cx + 0.5, cy + 0.5, 3, 0, TAU); c.fill();
      for (const [dx, dy] of [[-17, -12], [17, -12], [-17, 12], [17, 12]]) { c.fillStyle = rgba(P.tinHi, 0.4); c.beginPath(); c.arc(cx + dx, cy + dy, 2.6, 0, TAU); c.fill(); }
    }
    // white bulkhead (soffit) with a soft shadow line
    c.fillStyle = P.tile; c.fillRect(-60, 88, 1400, 12); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(-60, 100, 1400, 4);
  }
  function drawPanels(c, t) {
    const P = K.P;
    // recessed fluorescent panels (the middle one flickers now and then)
    for (const [i, x] of [[0, 120], [1, 560], [2, 980]]) { const fl = i === 1 && flick > 0 ? (Math.sin(t * 60) > 0.2 ? 0.25 : 1) : i === 2 && flick > 0.5 ? 0.6 : 1;
      c.fillStyle = shade(P.tin, -0.4); K.poly(c, [x - 4, 26, x + 184, 26, x + 192, 64, x - 12, 64]); c.fill();
      c.fillStyle = rgba(P.fluo, 0.35 + 0.65 * fl); K.poly(c, [x, 30, x + 180, 30, x + 186, 60, x - 6, 60]); c.fill();
      c.fillStyle = rgba('#ffffff', 0.4 * fl); c.fillRect(x + 10, 36, 160, 4);
      K.glow(c, x + 90, 70, 220, P.fluo, 0.1 * fl * (0.6 + P.night)); }
  }
  function drawWall(c, t) {
    const P = K.P;
    c.fillStyle = P.tile; c.fillRect(-60, 100, 1400, 506);
    c.strokeStyle = rgba(P.tileLine, 0.75); c.lineWidth = 1; c.beginPath();
    for (let y = 104, r = 0; y < 606; y += 13, r++) { c.moveTo(-60, y); c.lineTo(1340, y); for (let x = -60 + (r % 2) * 13; x < 1340; x += 26) { c.moveTo(x, y); c.lineTo(x, y + 13); } } c.stroke();
    c.fillStyle = linear(c, 0, 100, 0, 240, [[0, 'rgba(50,50,60,0.16)'], [1, 'rgba(50,50,60,0)']]); c.fillRect(-60, 100, 1400, 140);
    c.fillStyle = 'rgba(255,255,255,0.18)'; for (const gx of [160, 700, 1060]) { K.poly(c, [gx, 160, gx + 30, 160, gx + 10, 600, gx - 20, 600]); c.fill(); }
    // royal-blue band at the bottom of the tile
    c.fillStyle = P.blue; c.fillRect(-60, 556, 1400, 50); c.fillStyle = shade(P.blue, 0.2); c.fillRect(-60, 554, 1400, 3);
    // the high white shelf of giant cannoli over a blue band of flavour labels
    const w = 1280 / FLAV.length;
    c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(-60, 142, 1400, 30);
    FLAV.forEach((F, i) => { const x = w * i + w / 2; c.fillStyle = 'rgba(0,0,0,0.14)'; ellipse(c, x, 129, 26, 3); c.fill(); it(c, F.k, x, 117, 2.1, L, 1, i % 2 ? 0.05 : -0.04); });
    c.fillStyle = shade(P.tile, 0.04); c.fillRect(-60, 128, 1400, 6); c.fillStyle = shade(P.tile, -0.08); c.fillRect(-60, 134, 1400, 6);
    c.fillStyle = P.blue; c.fillRect(-60, 140, 1400, 18); c.fillStyle = '#ffffff'; c.font = '800 7.5px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    FLAV.forEach((F, i) => c.fillText(F.n, w * i + w / 2, 149.5));
    // menu boards (blue, white type)
    const menu = (x0, x1, title, body, big) => { c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x0 + 3, 180, x1 - x0, 88); c.fillStyle = '#f8f8f6'; c.fillRect(x0, 176, x1 - x0, 15); c.fillStyle = P.blue; c.fillRect(x0, 191, x1 - x0, 74);
      c.fillStyle = P.blue; c.font = '800 9px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'center'; c.fillText(title, (x0 + x1) / 2, 184);
      c.fillStyle = '#ffffff'; if (big) { c.font = '600 11px Georgia, serif'; body.forEach((l, i) => c.fillText(l, (x0 + x1) / 2, 204 + i * 16)); }
      else { c.font = '600 6.5px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'left'; c.font = '600 7.5px "Helvetica Neue", Arial, sans-serif'; body.forEach((l, i) => { const xx = x0 + 12 + Math.floor(i / 7) * ((x1 - x0) / 2); c.fillText(l, xx, 201 + (i % 7) * 9.2); c.fillText(i === 3 ? '$9' : '$8', xx + (x1 - x0) / 2 - 34, 201 + (i % 7) * 9.2); }); } };
    menu(10, 276, '♛ CANNOLI FLAVORS', ['PLAIN RICOTTA', 'PISTACHIO', 'CHOC CHIP', 'CHOC DIPPED', 'ESPRESSO', 'AMARETTO', 'HAZELNUT', 'BOSTON CREAM', 'LIMONCELLO', 'OREO', 'NUTELLA', 'STRAWBERRY', 'PEANUT BUTTER', 'MINT CHIP']);
    menu(980, 1182, '♛ COOKIES BY POUND', ['BUTTER COOKIES', 'ITALIAN MACAROONS', 'BISCOTTI', 'RAINBOW COOKIE'], 1);
    // white shelving behind the counters: cookie trays + blue label strips + box stacks
    for (const [x0, x1, kinds] of [[10, 278, ['macaroon', 'rainbow', 'flor']], [980, 1182, ['rainbow', 'flor', 'macaroon']], [300, 520, ['macaroon', 'flor']], [720, 950, ['rainbow', 'macaroon']]]) {
      for (const [si, y] of [[0, 304], [1, 354], [2, 404]]) {
        c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(x0, y + 10, x1 - x0, 6);
        if (si < 2) { const n = kinds.length, tw = (x1 - x0 - 10) / n; kinds.forEach((k, j) => { const tx = x0 + 6 + j * tw; c.fillStyle = P.gold; K.poly(c, [tx, y, tx + tw - 8, y, tx + tw - 12, y - 5, tx + 4, y - 5]); c.fill(); for (let q = 0; q < Math.floor((tw - 16) / 13); q++) it(c, (si + j) % 2 ? k : kinds[(j + 1) % n], tx + 10 + q * 13, y - 6, 0.62, L); }); }
        else { for (let b = 0; b < Math.floor((x1 - x0) / 60); b++) { const bx = x0 + 8 + b * 60, hh = 22 + (b % 3) * 8; c.fillStyle = P.box; c.fillRect(bx, y - hh, 50, hh); c.fillStyle = 'rgba(40,50,80,0.08)'; for (let q = 0; q < hh; q += 4) c.fillRect(bx, y - hh + q, 50, 1); } }
        c.fillStyle = '#fbfbf9'; c.fillRect(x0, y, x1 - x0, 5); c.fillStyle = P.blue; c.fillRect(x0, y + 5, x1 - x0, 6);
        c.fillStyle = 'rgba(255,255,255,0.8)'; for (let q = x0 + 14; q < x1 - 20; q += 46) c.fillRect(q, y + 7, 26, 2);
      }
      c.fillStyle = '#f4f4f2'; c.fillRect(x0 - 4, 292, 5, 124); c.fillRect(x1 - 1, 292, 5, 124);
    }
    // box stacks on a dolly by the fridge
    for (let i = 0; i < 9; i++) { c.fillStyle = i % 2 ? P.box : shade(P.box, -0.05); c.fillRect(700, 598 - i * 7, 90, 7); } c.fillStyle = shade(P.steel, -0.3); c.fillRect(696, 598, 98, 6);
    // crown plaque over the door
    c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(1199, 197, 84, 58); c.fillStyle = P.blue; c.fillRect(1196, 194, 84, 58); c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.strokeRect(1200, 198, 76, 50);
    c.fillStyle = '#ffffff'; K.poly(c, [1214, 236, 1262, 236, 1268, 210, 1252, 222, 1238, 204, 1224, 222, 1208, 210]); c.fill(); c.fillStyle = P.blue; c.beginPath(); c.arc(1238, 228, 3, 0, TAU); c.fill();
    hexFloor(c, 606, 652, -60, 1340, P.floor, 7, 0.08); c.fillStyle = 'rgba(30,20,20,0.16)'; c.fillRect(-60, 606, 1400, 46);
  }
  function drawFridge(c, t) {
    const P = K.P;
    // stainless fridge door (Tony comes and goes through it)
    const fo = smooth(clamp(fridgeT * 2.5, 0, 1)), F = FRIDGE;
    c.fillStyle = shade(P.steel, -0.35); c.fillRect(F.x0 - 6, F.y0 - 6, F.x1 - F.x0 + 12, F.y1 - F.y0 + 6);
    if (fo > 0.02) { c.fillStyle = L('#eef2f2'); c.fillRect(F.x0, F.y0, F.x1 - F.x0, F.y1 - F.y0); for (let i = 0; i < 4; i++) { c.fillStyle = L('#c8cccc'); c.fillRect(F.x0 + 4, F.y0 + 60 + i * 70, F.x1 - F.x0 - 8, 3); c.fillStyle = P.gold; c.fillRect(F.x0 + 10, F.y0 + 52 + i * 70, F.x1 - F.x0 - 20, 6); } K.glow(c, F.cx, F.y0 + 160, 160, '#f4fbff', 0.3 * fo); }
    const dw = (F.x1 - F.x0) * (1 - fo * 0.82);
    c.fillStyle = linear(c, F.x0, 0, F.x0 + dw, 0, [[0, shade(P.steel, 0.12)], [0.5, P.steel], [1, shade(P.steel, -0.14)]]); c.fillRect(F.x0, F.y0, dw, F.y1 - F.y0);
    c.fillStyle = 'rgba(255,255,255,0.22)'; K.poly(c, [F.x0 + dw * 0.2, F.y0, F.x0 + dw * 0.35, F.y0, F.x0 + dw * 0.15, F.y1, F.x0, F.y1]); c.fill();
    c.fillStyle = shade(P.steel, -0.4); c.fillRect(F.x0 + dw - 14, F.y0 + 140, 5, 90);
  }
  function drawDoor(c, t) {
    const P = K.P, D = DOOR, gx0 = D.x0 + 10, gx1 = D.x1 - 6, gy0 = D.y0 + 12, gy1 = D.y1 - 14;
    c.fillStyle = L('#3a3028'); c.fillRect(D.x0, D.y0, D.x1 - D.x0, D.y1 - D.y0);
    c.save(); c.beginPath(); c.rect(gx0, gy0, gx1 - gx0, gy1 - gy0); c.clip();
    K.sky(c, gx0, gy0, gx1, gy0 + 140, { noSun: 1 });
    c.fillStyle = P.brick3; c.fillRect(gx0 - 10, gy0 + 40, 70, 320); c.fillStyle = P.brick; c.fillRect(gx0 + 56, gy0 + 20, 60, 340);
    for (let r = 0; r < 4; r++) for (const [wx, ww] of [[gx0 + 4, 18], [gx0 + 32, 18], [gx0 + 66, 14]]) { const wy = gy0 + 60 + r * 52; const on = P.night > 0.3 && (r + wx) % 3 === 0; c.fillStyle = on ? P.winLit : P.winOut; c.fillRect(wx, wy, ww, 30); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(wx - 2, wy - 3, ww + 4, 3); }
    c.fillStyle = P.street; c.fillRect(gx0, gy1 - 70, gx1 - gx0, 70); c.fillStyle = shade(P.street, -0.15); c.fillRect(gx0, gy1 - 70, gx1 - gx0, 4);
    if (P.lampOn > 0.1) K.glow(c, gx0 + 40, gy0 + 120, 60, P.lamp, 0.45 * P.lampOn);
    for (const o of outside) { // passers-by on Hanover St (some carrying a white box with string)
      const x = gx0 + o.x * 0.75, y = gy1 - 40, s = o.h, bob = Math.abs(Math.sin(K.t * 6 + o.ph)) * 1.5, st = Math.sin(K.t * 6 + o.ph) * 4;
      c.strokeStyle = shade(o.col, -0.4); c.lineWidth = 3; c.beginPath(); c.moveTo(x, y - 22 * s); c.lineTo(x + st, y); c.moveTo(x, y - 22 * s); c.lineTo(x - st, y); c.stroke();
      c.fillStyle = o.col; K.poly(c, [x - 6 * s, y - 22 * s - bob, x + 6 * s, y - 22 * s - bob, x + 5 * s, y - 50 * s - bob, x - 5 * s, y - 50 * s - bob]); c.fill();
      c.fillStyle = P.skin; c.beginPath(); c.arc(x, y - 56 * s - bob, 5 * s, 0, TAU); c.fill();
      if (o.box) { c.fillStyle = P.box; c.fillRect(x + o.dir * 5, y - 32 * s - bob, 12 * o.dir, 8); c.strokeStyle = 'rgba(70,80,110,0.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x + o.dir * 11, y - 32 * s - bob); c.lineTo(x + o.dir * 11, y - 24 * s - bob); c.stroke(); }
      if (o.umb) { c.fillStyle = shade(o.col, -0.2); c.beginPath(); c.arc(x, y - 62 * s, 14, Math.PI, TAU); c.fill(); }
    }
    K.weather(c, gx0, gy0, gx1, gy1);
    if (K.weatherNow === 'snow') { c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(gx0, gy1 - 70, gx1 - gx0, 6); }
    c.restore();
    // the glass door leaf swings open (hinge on the right) — the bell above rings
    const o = doorT, lw = (gx1 - gx0 + 10) * (1 - o * 0.78), lx = gx1 + 5 - lw;
    c.fillStyle = L('#2e2620'); c.fillRect(lx - 4, D.y0 + 4, lw + 8, D.y1 - D.y0 - 6);
    c.fillStyle = rgba(P.glass || '#dfe8ee', 0.18 + o * 0.1); c.fillRect(lx + 4, gy0, lw - 8, gy1 - gy0);
    if (o < 0.95) { c.fillStyle = 'rgba(255,255,255,0.14)'; K.poly(c, [lx + lw * 0.2, gy0, lx + lw * 0.45, gy0, lx + lw * 0.2, gy1, lx, gy1]); c.fill(); }
    c.fillStyle = L('#c8a050'); c.fillRect(lx + 8, 450, 5, 40);
    if (lw > 40) { c.fillStyle = '#ffffff'; c.fillRect(lx + lw / 2 - 20, 340, 40, 16); c.fillStyle = P.blue; c.font = '800 8px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(signOpen ? 'OPEN' : 'CLOSED', lx + lw / 2, 348.5); }
    const bs = Math.sin(K.t * 18) * bellT * 0.6; c.save(); c.translate(D.x0 + 12, D.y0 - 6); c.rotate(bs); c.fillStyle = L('#c8a050'); K.poly(c, [-5, 0, 5, 0, 7, 10, -7, 10]); c.fill(); c.beginPath(); c.arc(0, 11, 2, 0, TAU); c.fill(); c.restore();
  }
  function drawCaseBack(c, C) { // lit interior + gold trays packed with rows of pastries
    const P = K.P, { x0, x1, top, g1 } = C;
    c.fillStyle = linear(c, 0, top, 0, g1, [[0, L('#f4ecd4')], [1, L('#cdbf98')]]); c.fillRect(x0, top, x1 - x0, g1 - top);
    for (const sy of SHELF_Y) { c.fillStyle = rgba(P.chrome, 0.7); c.fillRect(x0, sy + 8, x1 - x0, 2); }
    for (const t of TRAYS) { if ((t.side === 'L') !== (C === CL)) continue; const y = SHELF_Y[t.sh];
      c.fillStyle = linear(c, 0, y - 4, 0, y + 7, [[0, P.gold], [1, P.goldDk]]); K.poly(c, [t.x0, y + 7, t.x1, y + 7, t.x1 - 6, y - 4, t.x0 + 6, y - 4]); c.fill();
      const big = t.kind === 'lobster' || t.kind === 'sfog';
      for (let i = 0; i < t.n; i++) { const back = i >= t.per, x = slotX(t, i) + (back ? 5 : 0); it(c, t.kind, x, y - (back ? 8 : 2), (big ? 1.05 : 1.0) * (back ? 0.9 : 1), L); }
      c.fillStyle = P.blue; c.fillRect(t.x0 + 6, y + 7, 40, 7); c.fillStyle = '#ffffff'; c.font = '700 5.5px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(P0.NAMES[t.kind].toUpperCase().slice(0, 12), t.x0 + 26, y + 10.8);
    }
  }
  function casePath(c, C, y0, y1, r) { const { x0, x1, end } = C; c.beginPath(); if (end > 0) { c.moveTo(x0, y0); c.lineTo(x1, y0); c.quadraticCurveTo(x1 + r, y0, x1 + r, y0 + r); c.lineTo(x1 + r, y1); c.lineTo(x0, y1); } else { c.moveTo(x1, y0); c.lineTo(x0, y0); c.quadraticCurveTo(x0 - r, y0, x0 - r, y0 + r); c.lineTo(x0 - r, y1); c.lineTo(x1, y1); } c.closePath(); }
  function drawCaseFront(c, C) {
    const P = K.P, { x0, x1, top, g1, base, end } = C;
    casePath(c, C, top, g1, 30); c.fillStyle = rgba(P.glass || '#dfe8ee', 0.16); c.fill();
    c.save(); casePath(c, C, top, g1, 30); c.clip(); c.fillStyle = 'rgba(255,255,255,0.22)'; for (let gx = x0 + 40; gx < x1 + 40; gx += 150) { K.poly(c, [gx, top, gx + 36, top, gx - 4, g1, gx - 40, g1]); c.fill(); }
    c.fillStyle = linear(c, 0, top, 0, top + 26, [[0, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']]); c.fillRect(x0 - 40, top, x1 - x0 + 80, 26);
    c.restore();
    c.fillStyle = linear(c, 0, top - 6, 0, top + 2, [[0, '#f4f6f8'], [1, P.chrome]]); casePath(c, C, top - 6, top + 1, 30); c.fill();
    casePath(c, C, g1, base, 30); c.fillStyle = linear(c, 0, g1, 0, base, [[0, shade(P.blue, 0.12)], [1, shade(P.blue, -0.18)]]); c.fill();
    c.fillStyle = P.chrome; casePath(c, C, g1, g1 + 4, 30); c.fill(); casePath(c, C, base - 5, base, 30); c.fill();
    const ex = end > 0 ? x1 : x0; c.fillStyle = 'rgba(0,0,0,0.14)'; c.fillRect(end > 0 ? ex : ex - 30, g1 + 4, 30, base - g1 - 9);
    c.strokeStyle = rgba(P.chrome, 0.9); c.lineWidth = 2.5; c.beginPath(); c.moveTo(ex + end * 30, top + 30); c.lineTo(ex + end * 30, g1); c.stroke();
  }
  function drawSmudge(c, C) { const { x0, x1 } = C;
    if (smudge > 0.02) for (const a of K.actors) if (a.smX && Math.abs(a.smX - (x0 + x1) / 2) < (x1 - x0) / 2 + 30) { c.fillStyle = rgba('#ffffff', 0.3 * smudge); for (let i = 0; i < 7; i++) { ellipse(c, a.smX - 14 + i * 5, 552 + (i % 3) * 4, 3, 4.5); c.fill(); } }
  }
  function drawCounterTop(c, Q) {
    const P = K.P, top = Q.c.top, rx = Q.reg;
    c.fillStyle = L('#3a3c42'); c.fillRect(rx - 20, top - 30, 42, 30); c.fillStyle = L('#55585f'); K.poly(c, [rx - 16, top - 30, rx + 20, top - 30, rx + 14, top - 42, rx - 10, top - 42]); c.fill(); c.fillStyle = L('#9ad0b0'); c.fillRect(rx - 6, top - 40, 16, 6);
    if (Q.regOpen > 0.02) { c.fillStyle = L('#2a2a30'); c.fillRect(rx - 22, top - 6 + Q.regOpen * 6, 46, 7); c.fillStyle = L('#8aa882'); c.fillRect(rx - 16, top - 6 + Q.regOpen * 6, 12, 4); }
    if (Q.ding > 0) { c.strokeStyle = rgba('#e8c050', Q.ding); c.lineWidth = 2; c.beginPath(); c.arc(rx + 2, top - 50, 10 + (1 - Q.ding) * 16, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
    const st = Q.stack || 2; for (let i = 0; i < st; i++) { c.fillStyle = shade(P.box, -0.03 * (i % 2)); c.fillRect(Q.boxX - 70, top - 3 - i * 3, 40, 3); }
    if (Q.flat) { const f = Q.flat.fold, h = 20 * f; c.fillStyle = P.box; c.fillRect(Q.boxX - 22 - (1 - f) * 10, top - 2 - h, 44 + (1 - f) * 20, Math.max(2, h)); c.fillStyle = shade(P.box, -0.08); K.poly(c, [Q.boxX - 22, top - 2 - h, Q.boxX + 22, top - 2 - h, Q.boxX + 18, top - 2 - h - 14 * f, Q.boxX - 18, top - 2 - h - 14 * f]); c.fill(); }
    if (Q.box) drawBox(c, Q.box.x, top + 1, 1, Q.box);
  }
  function globePos(g) { const len = g.y - 100; return [g.x + Math.sin(g.sw) * len * 0.08, g.y]; }
  function drawGlobes(c, t) {
    const P = K.P;
    for (const g of GLOBES) { const [x, y] = globePos(g); c.strokeStyle = 'rgba(60,60,70,0.7)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(g.x, 100); c.lineTo(x, y - 17); c.stroke();
      const col = g.blue ? P.blue : '#f4f4f2'; c.fillStyle = col; c.beginPath(); c.arc(x, y, 17, 0, TAU); c.fill();
      c.fillStyle = 'rgba(0,0,0,0.16)'; c.beginPath(); c.arc(x + 3, y + 3, 15, -0.2, Math.PI * 0.9); c.fill(); c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.ellipse(x - 6, y - 7, 4, 2.6, -0.6, 0, TAU); c.fill();
      c.fillStyle = shade(col, -0.25); c.fillRect(x - 3, y - 19, 6, 4);
      if (g.cash) { c.fillStyle = '#ffffff'; c.font = '800 6px "Helvetica Neue", Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CASH', x, y - 2); c.fillText('ONLY', x, y + 5); }
      c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y + 17); c.quadraticCurveTo(x + 2, y + 30, x + 1, y + 40); c.stroke(); }
    for (const Q of [QL, QR]) if (Q.string) { const [x, y] = globePos(Q.string.g); const hx = Q.string.hand ? Q.string.hand.x : Q.boxX, hy = Q.string.hand ? Q.string.hand.y : Q.c.top - 14; c.strokeStyle = 'rgba(255,255,255,0.95)'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(x, y + 17); c.lineTo(hx, hy); c.stroke(); }
  }
  const cache = {};
  function cached(c, name, h, fn) { // static layers re-rendered only when the light changes (big fps win)
    const s = Math.min(2, Math.max(1, Math.abs(c.getTransform().a) || 1)), key = Math.round(K.P.hour * 6) + '|' + K.weatherNow + '|' + K.extraB + '|' + s;
    let e = cache[name]; if (!e || e.key !== key) { const [cv, x] = hiCanvas(1400, h, s); x.translate(60, 0); fn(x); e = cache[name] = { key, cv }; }
    c.drawImage(e.cv, -60, 0, 1400, h);
  }
  function cachedCase(c, C) { // case interior + glass + base, re-rendered only when a tray count or the light changes
    const s = Math.min(2, Math.max(1, Math.abs(c.getTransform().a) || 1)), name = C === CL ? 'cL' : 'cR';
    const key = TRAYS.map((t) => t.n).join(',') + '|' + Math.round(K.P.hour * 6) + '|' + K.weatherNow + '|' + s;
    const x0 = C.x0 - 40, w = C.x1 - C.x0 + 80, y0 = C.top - 10, h = C.base - y0 + 2;
    let e = cache[name]; if (!e || e.key !== key) { const [cv, x] = hiCanvas(w, h, s); x.translate(-x0, -y0); drawCaseBack(x, C); drawCaseFront(x, C); e = cache[name] = { key, cv }; }
    c.drawImage(e.cv, x0, y0, w, h);
  }
  function draw(c, t, Kk) {
    const P = K.P;
    cached(c, 'wall', 652, (x) => { drawCeiling(x, 0); drawWall(x, 0); });
    drawPanels(c, t); drawFridge(c, t); drawDoor(c, t);
    // daylight from the door/transom: long soft bands across the tile (target lighting)
    const sa = (P.shaftA || 0) * (K.weatherNow === 'clear' ? 1 : 0.45);
    if (sa > 0.01) { c.save(); c.globalCompositeOperation = 'screen'; for (const [a0, w] of [[1180, 60], [1090, 44], [1010, 30]]) { c.fillStyle = linear(c, 0, 110, 0, 606, [[0, rgba(P.shaft, sa * 0.5)], [1, rgba(P.shaft, 0)]]); K.poly(c, [a0, 110, a0 + w, 110, a0 + w - 470, 606, a0 - 470, 606]); c.fill(); } c.restore(); }
    const staff = K.actors.filter((a) => a.layer === 'staff');
    for (const a of staff) { if ((a.alpha ?? 1) < 0.02) continue; c.fillStyle = 'rgba(30,30,40,0.06)'; ellipse(c, a.hx - 22, a.hy - 60, 34, 90); c.fill(); }
    for (const a of staff) { K.drawBody(c, a, false); if (!a.armsFront) K.drawArms(c, a); }
    for (const C of [CL, CR]) { cachedCase(c, C); drawSmudge(c, C); }
    drawCounterTop(c, QL); drawCounterTop(c, QR);
    for (const a of staff) if (a.armsFront) K.drawArms(c, a);
    drawGlobes(c, t);
    // front floor: terracotta hex, shadow under the case bases, light spill from the door
    cached(c, 'floor', 730 + K.extraB, (x) => hexFloor(x, 652, 730 + K.extraB, -60, 1340, P.floor, 11, 0.1));
    c.fillStyle = linear(c, 0, 652, 0, 676, [[0, 'rgba(30,15,10,0.32)'], [1, 'rgba(30,15,10,0)']]); c.fillRect(-60, 652, 1400, 24);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = rgba(P.shaft, (0.12 + doorT * 0.18) * (1 - P.night * 0.8)); K.poly(c, [DOOR.x0 + 6, 652, DOOR.x1, 652, 1170, 724 + K.extraB, 930, 724 + K.extraB]); c.fill(); c.restore();
    const front = K.actors.filter((a) => a.layer === 'front').sort((a, b) => a.floorY - b.floorY);
    for (const a of front) { if ((a.alpha ?? 1) < 0.02) continue; const sx = P.night > 0.5 ? 0 : -16; c.fillStyle = `rgba(40,15,10,${0.16 * (a.alpha ?? 1)})`; K.poly(c, [a.hx - 26 * a.sc, a.floorY + 2, a.hx + 22 * a.sc, a.floorY + 2, a.hx + 22 * a.sc + sx * 2, a.floorY + 7, a.hx - 30 * a.sc + sx * 2, a.floorY + 7]); c.fill(); K.drawBody(c, a, true); }
    if (P.night > 0.3) for (const x of [210, 650, 1070]) K.glow(c, x, 560, 260, P.fluo, 0.07 * P.night);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  function effect(c, e, u) {
    if (e.k === 'sugar') { c.fillStyle = rgba('#ffffff', 0.85 * (1 - u)); for (let i = 0; i < 14; i++) { const an = i * 2.4, r = 4 + u * (12 + (i % 4) * 4); c.beginPath(); c.arc(e.x + Math.cos(an) * r, e.y + Math.sin(an) * r * 0.6 + u * 10, 1.4 + (i % 3) * 0.6, 0, TAU); c.fill(); } return true; }
    if (e.k === 'snap') { c.strokeStyle = rgba('#ffffff', 1 - u); c.lineWidth = 1.5; for (let i = 0; i < 4; i++) { const an = -Math.PI / 2 + (i - 1.5) * 0.6; c.beginPath(); c.moveTo(e.x + Math.cos(an) * 6, e.y + Math.sin(an) * 6); c.lineTo(e.x + Math.cos(an) * (10 + u * 8), e.y + Math.sin(an) * (10 + u * 8)); c.stroke(); } return true; }
    if (e.k === 'bell') { c.strokeStyle = rgba('#e8c050', 1 - u); c.lineWidth = 1.6; for (const d of [-1, 1]) { c.beginPath(); c.arc(e.x, e.y + 14, 10 + u * 12, d > 0 ? -0.6 : Math.PI - 0.2, d > 0 ? 0.2 : Math.PI + 0.6); c.stroke(); } return true; }
    return false;
  }
  return GeoKit.stage({ id: 'mikes', pal: MikesPal, startHour: 8, span: 15.5, build, sim, draw, onClear, onGone, effect, grain: 0.11, font: '700 15px "Helvetica Neue", Arial, sans-serif',
    debug: () => ({ trays: TRAYS.map((t) => t.n).join(','), qL: QL.q.map((a) => a.type + ':' + a.phase + '@' + Math.round(a.hx)).join(' '), qR: QR.q.map((a) => a.type + ':' + a.phase).join(' '), door: +doorT.toFixed(2) }) });
}
registerStage('mikes', makeGeoMikesStage);
