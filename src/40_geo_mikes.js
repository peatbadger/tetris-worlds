/* ================= World 2 · Mike's Pastry — GEOMETRIC edition (fan tribute, no real logos) =================
   Hanover Street, North End, Boston. Flat planes in the Kaiten Sushi language: pressed-tin ceiling, cream walls
   with a blue wainscot, a long glass case of cannoli / lobster tails / sfogliatelle / eclairs / florentines /
   rainbow cookies, white boxes tied with string pulled from spools over the counter, an espresso machine,
   a marble table by the window onto Hanover Street (brick, fire escapes, festoon lights, snow).
   Cast: Gina (boxes & ties), Sal (register, espresso, clears tables), Tony the baker (fresh trays), and a
   small calm flow of customers who queue, point, pay, take boxes home or sit, bite and sip. */
const GeoPastry = (() => { // flat pastries shared by case, hands, boxes and plates (units ~ px at s = 1)
  function item(c, kind, x, y, s, L, frac = 1, ang = 0) {
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s);
    switch (kind) {
      case 'cannoli': { const w = 26 * frac; c.fillStyle = L('#c47a32'); roundRect(c, -13, -4.5, w, 9, 4.5); c.fill(); c.fillStyle = L('#e3a458'); c.fillRect(-11, -4.5, w - 4, 3);
        c.fillStyle = L('#8a4a1a'); for (let i = 0; i < 5; i++) if (-10 + i * 5 < -13 + w - 3) c.fillRect(-10 + i * 5, -1 + (i % 2), 2, 1.4);
        c.fillStyle = L('#fbf4e4'); ellipse(c, -13 + w, 0, 3.4, 4.8); c.fill(); if (frac > 0.95) { ellipse(c, -13, 0, 3.4, 4.8); c.fill(); }
        c.fillStyle = L('#3a2214'); c.fillRect(-14 + w, -2, 1.6, 1.6); c.fillRect(-12 + w, 1, 1.6, 1.6); break; }
      case 'lobster': { c.fillStyle = L('#c8823a'); c.beginPath(); c.moveTo(-14 * frac, 0); c.quadraticCurveTo(-4, -11, 12, -6); c.lineTo(12, 6); c.quadraticCurveTo(-4, 11, -14 * frac, 0); c.fill();
        c.strokeStyle = L('#8a5220'); c.lineWidth = 1.2; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-8 + i * 5, -6 + i * 0.5); c.quadraticCurveTo(-10 + i * 5, 0, -8 + i * 5, 6 - i * 0.5); c.stroke(); }
        c.fillStyle = L('#fbf0d8'); ellipse(c, 12, 0, 3.5, 6); c.fill(); break; }
      case 'sfog': { c.fillStyle = L('#d9a050'); c.beginPath(); c.moveTo(-11, 5); c.quadraticCurveTo(-12, -10, 4, -9); c.quadraticCurveTo(13, -4, 11, 5); c.closePath(); c.fill();
        c.strokeStyle = L('#a06a2a'); c.lineWidth = 1; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-9 + i * 4.5, 5); c.lineTo(-6 + i * 3.5, -8 + Math.abs(i - 2)); c.stroke(); }
        c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(-4, -7, 6, 1.4); break; }
      case 'eclair': { const w = 26 * frac; c.fillStyle = L('#d49a52'); roundRect(c, -13, -4, w, 8, 4); c.fill(); c.fillStyle = L('#3a1e12'); roundRect(c, -12, -5, w - 2, 4.5, 2.2); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(-8, -4.4, w * 0.4, 1); break; }
      case 'flor': { c.fillStyle = L('#c98a3a'); c.beginPath(); c.arc(0, 0, 9, 0, TAU); c.fill(); c.fillStyle = L('#e6b262'); for (let i = 0; i < 7; i++) { c.beginPath(); c.arc(Math.cos(i) * 5, Math.sin(i * 2.3) * 5, 1.6, 0, TAU); c.fill(); }
        c.fillStyle = L('#3a2014'); c.beginPath(); c.arc(0, 0, 9, 0.2, Math.PI - 0.2); c.fill(); break; }
      case 'cookie': { c.fillStyle = L('#3a7a3e'); c.fillRect(-10, -6, 20, 4); c.fillStyle = L('#f4ecd6'); c.fillRect(-10, -2, 20, 4); c.fillStyle = L('#c8303a'); c.fillRect(-10, 2, 20, 4); c.fillStyle = L('#2a1810'); c.fillRect(-10, -7.5, 20, 1.5); c.fillRect(-10, 6, 20, 1.5); break; }
      case 'napoleon': { c.fillStyle = L('#e0b070'); c.fillRect(-11, -5, 22, 10); c.fillStyle = L('#fbf3e2'); c.fillRect(-11, -1.5, 22, 3); c.fillStyle = L('#fdf8ee'); c.fillRect(-11, -7, 22, 2.5); c.strokeStyle = L('#5a3420'); c.lineWidth = 0.9; c.beginPath(); for (let i = 0; i < 5; i++) { c.moveTo(-9 + i * 4.5, -7); c.lineTo(-7 + i * 4.5, -4.5); } c.stroke(); break; }
    }
    c.restore();
  }
  const NAMES = { cannoli: 'Cannoli', lobster: 'Lobster tail', sfog: 'Sfogliatella', eclair: 'Eclair', flor: 'Florentine', cookie: 'Rainbow cookie', napoleon: 'Napoleon' };
  return { item, NAMES };
})();

const MikesPal = GeoKit.palette({
  morning: { wall: '#f1e2cf', wall2: '#9db8d2', wall3: '#e2cdb2', tin: '#eadcc6', tin2: '#d8c6aa', trim: '#c9b08c', floor: '#e2c4a8', floor2: '#f2e6d4', case: '#e8d9c2', caseDk: '#b8a488', caseTop: '#f4ece0', glass: '#dcebf0', shelf: '#cfb898', box: '#fbf8f2', str: '#6a9ad0', mirror: '#d8e2e2', mirror2: '#eef2ee', frame: '#c8a060', menu: '#3a4048', menuInk: '#f4ecd8', door: '#7a8a7a', sky0: '#cfe0ec', sky1: '#f6e6d6', brick: '#c88a74', brick2: '#a87060', brick3: '#e0b29a', winOut: '#9ab0bc', winLit: '#ffe8b0', awn1: '#5a8a5a', awn2: '#c85a4a', street: '#b8aca0', lamp: '#fff2cc', lampOn: 0, sun: '#fff4d8', cloud: '#ffffff', shaft: '#fff6e8', shaftA: 0.22, glow: '#ffe8c0', glowA: 0.12, amb: '#a090b0', ambK: 0.03, neon: '#ff6a5a', neonA: 0,
    skin: '#f1b98a', bubble: '#fffaf2', ink: '#3a3038', navy: '#3d5a80', coral: '#d8665a', mustard: '#e0a848', teal: '#4a8a8a', cream: '#f4e6cc', olive: '#7a8a50', plum: '#8a5a7a', grey: '#a8a4a0', brown: '#8a5a3a', white: '#fbf6ec', dark: '#2e2a30', hairGrey: '#d8d0c6' },
  day: { wall: '#f6ecdc', wall2: '#5d86b6', wall3: '#e8d6ba', tin: '#f0e6d2', tin2: '#dccbab', trim: '#b8955e', floor: '#c47a58', floor2: '#efe2cc', case: '#e9dcc4', caseDk: '#a8906c', caseTop: '#f8f2e6', glass: '#cfe6ee', shelf: '#c8a878', box: '#ffffff', str: '#3a78c8', mirror: '#c8dcdc', mirror2: '#eef4f0', frame: '#c89848', menu: '#2e3640', menuInk: '#f6eed8', door: '#4a6a5a', sky0: '#8cc4e8', sky1: '#d8ecf2', brick: '#b8604a', brick2: '#94483a', brick3: '#d88a6a', winOut: '#7aa0b8', winLit: '#ffe8b0', awn1: '#3a7a4a', awn2: '#c8403a', street: '#a8a098', lamp: '#fff2cc', lampOn: 0, sun: '#fffbe8', cloud: '#ffffff', shaft: '#fff8e6', shaftA: 0.2, glow: '#ffe8c0', glowA: 0.1, amb: '#000000', ambK: 0, neon: '#ff6a5a', neonA: 0.25,
    skin: '#eeaa76', bubble: '#ffffff', ink: '#2a2630', navy: '#2e4a72', coral: '#d4483a', mustard: '#e0a030', teal: '#2f7a7a', cream: '#f2e2c4', olive: '#6a7a3a', plum: '#7a3a5a', grey: '#9a9894', brown: '#7a4a2a', white: '#fbf8f0', dark: '#24222a', hairGrey: '#cfc8be' },
  dusk: { wall: '#eec9a0', wall2: '#3e5f8a', wall3: '#d8a878', tin: '#e2bf94', tin2: '#c09a6c', trim: '#a8743a', floor: '#a85a3c', floor2: '#dcb894', case: '#d8b890', caseDk: '#8a6a44', caseTop: '#f0dcc0', glass: '#e8c8b0', shelf: '#a87a4a', box: '#fbefe0', str: '#3a68b0', mirror: '#e0b898', mirror2: '#f4d8b8', frame: '#c88a38', menu: '#2a2a34', menuInk: '#f8e2c0', door: '#3a4a40', sky0: '#e8784a', sky1: '#f8c46a', brick: '#a04a3a', brick2: '#7a3428', brick3: '#c86a4a', winOut: '#6a5060', winLit: '#ffd078', awn1: '#2a5a3a', awn2: '#a8302a', street: '#8a6a60', lamp: '#ffd890', lampOn: 0.7, sun: '#fff0c0', cloud: '#ffd0a8', shaft: '#ffc890', shaftA: 0.2, glow: '#ffc070', glowA: 0.25, amb: '#4a2010', ambK: 0.08, neon: '#ff5a4a', neonA: 0.7,
    skin: '#e09460', bubble: '#fff4e4', ink: '#2a2028', navy: '#2a3e66', coral: '#c8402e', mustard: '#d8902a', teal: '#2a6a6a', cream: '#ecd0a8', olive: '#5a6230', plum: '#6a3048', grey: '#a08470', brown: '#6a3e22', white: '#f6e4cc', dark: '#221c22', hairGrey: '#d0b8a0' },
  night: { wall: '#d8a878', wall2: '#2a3e60', wall3: '#b88858', tin: '#c89a6a', tin2: '#a07448', trim: '#8a5a2a', floor: '#7a3e2c', floor2: '#b08a6a', case: '#c8a070', caseDk: '#6a4a2c', caseTop: '#ecd4b0', glass: '#f0d8a8', shelf: '#8a5a32', box: '#fbecd4', str: '#3060a8', mirror: '#a88868', mirror2: '#d8b088', frame: '#b07830', menu: '#20202a', menuInk: '#f8dcb0', door: '#2a3430', sky0: '#0e1636', sky1: '#24305a', brick: '#4a2a34', brick2: '#341c26', brick3: '#5a3440', winOut: '#1a2034', winLit: '#ffc860', awn1: '#1a3424', awn2: '#5a1c20', street: '#3a3440', lamp: '#ffd88a', lampOn: 1, sun: '#fff0c0', cloud: '#5a6080', shaft: '#ffb070', shaftA: 0.05, glow: '#ffb060', glowA: 0.4, amb: '#1a1438', ambK: 0.16, neon: '#ff4a4a', neonA: 1,
    skin: '#d08a58', bubble: '#fff0dc', ink: '#24181e', navy: '#22305a', coral: '#b03a2e', mustard: '#c8822a', teal: '#1e5a5e', cream: '#e2c49a', olive: '#4a5228', plum: '#5a2840', grey: '#8a7464', brown: '#5a321c', white: '#f0dcc0', dark: '#1a1418', hairGrey: '#c0a890' },
  snow: { sky0: '#b8c4d4', sky1: '#e8ecf2', brick: '#a87a74', brick2: '#8a6460', brick3: '#c8a8a0', winOut: '#9aa8b8', street: '#e8ecf0', wall: '#eee6e0', wall2: '#5a7aa8', cloud: '#f4f6fa', shaft: '#f4f6ff', floor: '#b8806a', glass: '#dce8f4', case: '#e4dcd0' },
}, [[7, 'morning'], [10, 'day'], [15.5, 'day'], [18.5, 'dusk'], [20.5, 'night'], [26, 'night'], [31, 'morning']]);

function makeGeoMikesStage() {
  const P0 = GeoPastry, it = P0.item;
  const CASE = { x0: 18, x1: 456, top: 470, glass0: 482, glass1: 598, base: 650 };
  const STAFF_FLOOR = 606, FRONT_FLOOR = 712, STAFF_SC = 0.86, FRONT_SC = 0.84;
  const BOX_X = 300, REG_X = 418, ESP_X = 176, PLATE_X = 360, DOOR_X = 1300;
  const WIN = { x0: 900, y0: 104, x1: 1204, y1: 468 };
  const TABLE = { x: 1104, top: 566, seats: [{ x: 1036, f: 1 }, { x: 1172, f: -1 }] };
  const SPOOLS = [150, 232, 300];
  const SHELF_Y = [528, 572]; // two shelves inside the case
  const TRAYS = [ // kind, x0, x1, shelf
    ['cannoli', 34, 150, 0], ['lobster', 160, 286, 0], ['sfog', 296, 444, 0],
    ['eclair', 34, 150, 1], ['flor', 160, 286, 1], ['cookie', 296, 370, 1], ['napoleon', 378, 444, 1]].map(([kind, x0, x1, sh]) => ({ kind, x0, x1, sh, n: 0, max: Math.floor((x1 - x0) / 24) }));
  const ORDERW = { cannoli: 6, lobster: 3, sfog: 1.5, eclair: 1.4, flor: 1, cookie: 1.2, napoleon: 1 };
  let K, gina, sal, tony, box = null, reg = { open: 0, ding: 0 }, smudge = 0, signOpen = 1, orders = [], tableItems = [], tourT = -1, nextArrive = 2, spawnN = 0, steamT = 0, cupUnder = null, stringLine = null;
  const rnd0 = mulberry32(31);
  const FACADE = (() => { const a = []; let x = WIN.x0 - 20; let i = 0; while (x < WIN.x1 + 20) { const w = 70 + rnd0() * 50; a.push({ x, w, h: 200 + rnd0() * 120, tone: i % 3, lit: Array.from({ length: 24 }, () => rnd0()), esc: rnd0() < 0.5, awn: i % 2 }); x += w + 4; i++; } return a; })();
  const B = GeoKit.body;
  const TYPES = {
    tourist: { body: B({ pattern: 'stripe', top: 'teal', top2: 'cream', hat: 'bucket', hatCol: 'mustard', backpack: 1, packCol: 'coral', camera: 1, pants: 'olive', shortSleeve: 1 }), vary: { top: ['teal', 'coral', 'mustard'], hatCol: ['mustard', 'cream', 'olive'] }, words: ['Two cannoli!', 'Wow, look!', 'icon:cam'], eatIn: 0.3, kinds: ['cannoli', 'lobster'] },
    local: { body: B({ T: 232, hw: 56, headR: 29, pattern: 'patch', top: 'coral', top2: 'white', top3: 'navy', hairStyle: 'pony', pants: 'navy' }), vary: { top: ['coral', 'teal', 'plum'] }, words: ['The usual!', 'Half dozen, mixed', 'Wicked good'], eatIn: 0.2 },
    student: { body: B({ T: 236, hw: 56, headR: 30, pattern: 'hoodie', hood: 1, top: 'mustard', backpack: 1, packCol: 'navy', pants: 'navy', hat: 'beanie', hatCol: 'coral' }), vary: { top: ['mustard', 'coral', 'teal'], hat: ['beanie', null, 'cap'] }, words: ['One cannoli, please', 'Study fuel'], eatIn: 0.5 },
    suit: { body: B({ pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', pants: 'navy', hairStyle: 'short' }), vary: { top: ['navy', 'grey', 'dark'], tie: ['coral', 'mustard', 'teal'] }, words: ['A box for the office', 'Dozen, mixed'], eatIn: 0.1, big: 1 },
    nurse: { body: B({ T: 230, hw: 54, headR: 29, pattern: 'polo', top: 'teal', top2: 'teal', pants: 'teal', hairStyle: 'bun', shortSleeve: 1 }), words: ['Long shift…', 'Lobster tail, please'], eatIn: 0.4, kinds: ['lobster', 'eclair'] },
    nonno: { body: B({ T: 226, hw: 62, headR: 30, torso: 'round', pattern: 'cardigan', top: 'brown', top2: 'cream', hair: 'hairGrey', hat: 'flatcap', hatCol: 'grey', glasses: 1, pants: 'dark' }), words: ['Buongiorno!', 'Espresso, Sal'], eatIn: 1, kinds: ['sfog'], slow: 1 },
    mum: { body: B({ T: 232, hw: 56, headR: 29, pattern: 'cardigan', top: 'plum', top2: 'cream', hairStyle: 'long', skirt: 'navy', tights: 1 }), words: ['Pick one, honey', 'Two please'], eatIn: 0.6 },
    kid: { body: B({ T: 150, hw: 42, headR: 27, torso: 'round', pattern: 'stripe', top: 'coral', top2: 'cream', pants: 'navy', hairD: 0.06, arm: 0.95, leg: 0.8, hat: 'beanie', hatCol: 'teal' }), vary: { top: ['coral', 'teal', 'mustard'] }, words: ['That one!', 'icon:heart'], kid: 1 },
    dateA: { body: B({ pattern: 'jacket', top: 'olive', shirt: 'cream', pants: 'dark' }), vary: { top: ['olive', 'navy', 'brown'] }, words: ['Cannoli and espresso?', 'icon:heart'], eatIn: 1 },
    dateB: { body: B({ T: 230, hw: 54, headR: 29, pattern: 'patch', top: 'coral', top2: 'cream', top3: 'plum', hairStyle: 'bob', skirt: 'plum' }), vary: { top: ['coral', 'plum', 'mustard'] }, words: ['So good', 'icon:heart'], eatIn: 1 },
  };
  const PARTIES = [ // weights: morning, day, evening, night
    { m: ['nonno'], w: [5, 0.6, 0.2, 0] }, { m: ['tourist'], w: [1, 4, 3, 1] }, { m: ['local'], w: [3, 3, 2, 1] }, { m: ['student'], w: [1, 2, 2, 3] },
    { m: ['suit'], w: [3, 2, 0.5, 0] }, { m: ['nurse'], w: [2, 1, 1, 2] }, { m: ['mum', 'kid'], w: [1, 3, 2, 0] }, { m: ['dateA', 'dateB'], w: [0.3, 1, 3, 3] }, { m: ['tourist', 'tourist'], w: [0.5, 2, 2, 0.5] }];
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 6 ? 3 : h < 11 ? 0 : h < 17 ? 1 : h < 21 ? 2 : 3; };
  const SPOTS = [{ x: 96, occ: null }, { x: 206, occ: null }, { x: 330, occ: null }];
  const customers = () => K.actors.filter((a) => a.cust);
  const wpick2 = (o) => { let s = 0; for (const k in o) s += o[k]; let r = Math.random() * s; for (const k in o) { r -= o[k]; if (r <= 0) return k; } return 'cannoli'; };
  const trayOf = (kind) => TRAYS.find((t) => t.kind === kind);
  const trayX = (t) => t.x0 + 12 + Math.max(0, t.n - 1) * 24;
  const L = (h) => K.L(h);
  /* ---------- held items ---------- */
  const H = {
    pastry: (kind, frac = 1) => ({ kind, frac, draw(c, x, y, s) { it(c, kind, x, y, s * 1.05, L, this.frac); } }),
    box: (b) => ({ box: b, draw(c, x, y, s) { drawBox(c, x, y + 10 * s, s, b); } }),
    cash: () => ({ draw(c, x, y, s) { c.fillStyle = L('#7aa86a'); c.save(); c.translate(x, y); c.rotate(-0.3); c.fillRect(-9 * s, -4 * s, 18 * s, 8 * s); c.fillStyle = L('#5a8a4a'); c.fillRect(-3 * s, -2.5 * s, 6 * s, 5 * s); c.restore(); } }),
    plate: (kind, frac = 1) => ({ plate: 1, kind, frac, draw(c, x, y, s) { drawPlate(c, x, y + 4 * s, s, this.kind, this.frac); } }),
    cup: (lvl = 1) => ({ cup: 1, lvl, draw(c, x, y, s, a) { drawCup(c, x, y + 6 * s, s, this.lvl, a ? (a.cupTilt || 0) * (a.f || 1) : 0); } }),
    paper: () => ({ draw(c, x, y, s, a) { const f = a.f; c.fillStyle = L('#ece6d8'); K.poly(c, [x - f * 4 * s, y - 26 * s, x + f * 30 * s, y - 30 * s, x + f * 32 * s, y + 8 * s, x - f * 2 * s, y + 10 * s]); c.fill(); c.fillStyle = L('#b8b0a0'); for (let i = 0; i < 5; i++) c.fillRect(Math.min(x + f * 4 * s, x + f * 24 * s), y - 20 * s + i * 6 * s, 20 * s, 1.6 * s); c.fillStyle = L('#3a3430'); c.fillRect(Math.min(x + f * 4 * s, x + f * 24 * s), y - 26 * s, 20 * s, 3 * s); } }),
    tongs: () => ({ draw(c, x, y, s, a) { K.F.line(c, x, y, x + a.f * 14 * s, y + 10 * s, 1.6 * s, L('#c8ccd0')); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); roundRect(c, x - 9 * s, y - 2 * s, 18 * s, 9 * s, 2 * s); c.fill(); } }),
    tray: (kind) => ({ draw(c, x, y, s, a) { c.fillStyle = L('#c8ccd0'); c.fillRect(x - 40 * s, y - 2 * s, 64 * s, 4 * s); for (let i = 0; i < 4; i++) it(c, kind, x - 30 * s + i * 15 * s, y - 6 * s, s * 0.55, L); } }),
    map: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f0e4b8'); c.fillRect(x - 10 * s, y - 14 * s, 20 * s, 16 * s); c.strokeStyle = L('#c8403a'); c.lineWidth = 1.4 * s; c.beginPath(); c.moveTo(x - 7 * s, y - 2 * s); c.lineTo(x - 2 * s, y - 9 * s); c.lineTo(x + 6 * s, y - 6 * s); c.stroke(); } }),
  };
  function drawBox(c, x, y, s, b) { // y = bottom
    const w = 46 * s, h = 22 * s;
    c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x - w / 2 + 2, y - 2, w, 3);
    c.fillStyle = K.P.box; c.fillRect(x - w / 2, y - h, w, h); c.fillStyle = 'rgba(40,40,60,0.08)'; c.fillRect(x, y - h, w / 2, h);
    if (b.lid < 1) { // open: items peek out, lid flap tilted back
      for (let i = 0; i < b.items.length; i++) it(c, b.items[i], x - w / 2 + 10 * s + (i % 4) * 9 * s, y - h + 2 * s - Math.floor(i / 4) * 4 * s, s * 0.5, L);
      c.fillStyle = shade(K.P.box, -0.06); K.poly(c, [x - w / 2, y - h, x + w / 2, y - h, x + w / 2 - 4 * s, y - h - 14 * s * (1 - b.lid), x - w / 2 + 4 * s, y - h - 14 * s * (1 - b.lid)]); c.fill();
    } else { c.fillStyle = shade(K.P.box, -0.04); c.fillRect(x - w / 2 - 1, y - h - 3 * s, w + 2, 4 * s); }
    if (b.wrap > 0) { c.strokeStyle = K.P.str; c.lineWidth = 1.4 * s; c.setLineDash([3 * s, 2 * s]); c.beginPath(); const wx = Math.min(1, b.wrap * 2), wy = clamp(b.wrap * 2 - 1, 0, 1); c.moveTo(x, y); c.lineTo(x, y - (h + 3 * s) * wx); if (wy > 0) { c.moveTo(x - w / 2 * wy, y - h * 0.5); c.lineTo(x + w / 2 * wy, y - h * 0.5); } c.stroke(); c.setLineDash([]); }
    if (b.tied) { c.strokeStyle = K.P.str; c.lineWidth = 1.6 * s; c.beginPath(); ellipse(c, x - 4 * s, y - h - 5 * s, 4 * s, 2.5 * s, -0.4); c.stroke(); c.beginPath(); ellipse(c, x + 4 * s, y - h - 5 * s, 4 * s, 2.5 * s, 0.4); c.stroke(); }
  }
  function drawPlate(c, x, y, s, kind, frac) { c.fillStyle = L('#f6f2ea'); ellipse(c, x, y, 20 * s, 5 * s); c.fill(); c.fillStyle = 'rgba(0,0,0,0.08)'; ellipse(c, x, y + 1 * s, 14 * s, 3 * s); c.fill(); if (kind && frac > 0.02) it(c, kind, x, y - 5 * s, s * 0.95, L, frac); else { c.fillStyle = L('#f4f0e6'); for (let i = 0; i < 4; i++) c.fillRect(x - 8 * s + i * 4 * s, y - 2 * s, 1.5 * s, 1.5 * s); } }
  function drawCup(c, x, y, s, lvl, tilt = 0) {
    c.save(); c.translate(x, y); c.rotate(-tilt * 0.9);
    c.fillStyle = L('#f8f4ec'); ellipse(c, 0, 1 * s, 10 * s, 2.6 * s); c.fill(); // saucer
    c.fillStyle = L('#fbf8f2'); K.poly(c, [-6 * s, -10 * s, 6 * s, -10 * s, 4.5 * s, 0, -4.5 * s, 0]); c.fill();
    c.strokeStyle = L('#fbf8f2'); c.lineWidth = 1.6 * s; c.beginPath(); c.arc(7 * s, -6 * s, 2.6 * s, -1.4, 1.4); c.stroke();
    if (lvl > 0.02) { c.fillStyle = L('#5a3420'); ellipse(c, 0, -10 * s + (1 - lvl) * 4 * s, 5.4 * s, 1.4 * s); c.fill(); c.fillStyle = L('#c08a5a'); ellipse(c, 0, -10 * s + (1 - lvl) * 4 * s, 3 * s, 0.8 * s); c.fill(); }
    c.restore();
  }
  /* ---------- people ---------- */
  function mkCust(type, x) {
    const T0 = TYPES[type], def = Object.assign({}, T0.body); for (const k in T0.vary || {}) { const v = pick(T0.vary[k]); if (v === null) delete def[k]; else def[k] = v; }
    def.hw *= 1.12;
    const a = K.mk(def, { type, T0, cust: 1, hx: x, f: -1, floorY: FRONT_FLOOR, sc: FRONT_SC * (T0.kid ? 1 : 1), speed: (T0.slow ? 0.7 : 1) * rand(0.9, 1.1), alpha: 0, fade: 1.6, layer: 'front', posture: T0.slow ? 0.1 : 0 });
    if (K.weatherNow === 'snow' && Math.random() < 0.8) a.scarf = pick(['coral', 'mustard', 'teal', 'cream', 'plum']);
    if (type === 'nonno') a.hold.F = null;
    if (type === 'tourist' && Math.random() < 0.6) a.hold.F = H.map();
    return a;
  }
  function spawnParty(seed) {
    const p = per(), list = PARTIES.filter((q) => q.w[p] > 0); let s = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * s, pt = list[0];
    for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    if (customers().some((c) => pt.m.includes(c.type))) return false;
    if (customers().length + pt.m.length > 5) return false;
    const free = SPOTS.filter((sp) => !sp.occ); if (!free.length) return false;
    const party = { members: [], eatIn: Math.random() < (TYPES[pt.m[0]].eatIn || 0) && tableFree() };
    if (pt.m.length === 2 && pt.m[1] === 'kid') party.eatIn = party.eatIn && Math.random() < 0.5;
    if (party.eatIn) TABLE.res = party;
    pt.m.forEach((type, j) => {
      const a = mkCust(type, DOOR_X + 30 + j * 50); a.party = party; party.members.push(a);
      a.delay = j * 0.5;
      if (j === 0) { const sp = free.sort((u, v) => v.x - u.x)[0]; sp.occ = a; a.spot = sp; a.phase = 'enter'; a.walkTo = sp.x; }
      else { a.phase = 'tag'; a.walkTo = party.members[0].walkTo + 86; a.tagOf = party.members[0]; }
    });
    if (K.weatherNow === 'snow') K.after(1, () => K.fx('puff', DOOR_X - 60, FRONT_FLOOR - 10, { col: '#ffffff', life: 0.9 }));
    K.after(0.4, () => K.say(Math.random() < 0.5 ? gina : sal, pick(['Hi there!', 'Hey, welcome!', 'Be right with you!', 'Ciao!']), 1.6));
    spawnN++;
    return true;
  }
  const tableFree = () => !TABLE.seats.some((s) => s.occ) && !tableItems.length && !(TABLE.res && customers().some((c) => c.party === TABLE.res));
  function mkStaff() {
    gina = K.mk(B({ T: 232, hw: 56, headR: 29, pattern: 'apron', top: 'dark', top2: 'white', top3: 'white', hairStyle: 'bun', pants: 'dark', shortSleeve: 1 }), { role: 'gina', staff: 1, hx: BOX_X, f: 1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', faceDir: 0.5 });
    sal = K.mk(B({ T: 238, hw: 66, headR: 30, torso: 'round', pattern: 'apron', top: 'white', top2: 'white', top3: 'navy', hair: 'hairGrey', glasses: 1, pants: 'dark' }), { role: 'sal', staff: 1, hx: REG_X, f: 1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', faceDir: 0.4, speed: 0.85 });
    tony = K.mk(B({ T: 244, hw: 68, headR: 31, torso: 'round', pattern: 'chef', top: 'white', top2: 'cream', sleeve: 'white', hat: 'chef', hair: 'dark', shortSleeve: 1 }), { role: 'tony', staff: 1, hx: -60, f: 1, floorY: STAFF_FLOOR, sc: STAFF_SC, layer: 'staff', alpha: 0, away: 1 });
    gina.think = ginaThink; sal.think = salThink;
  }
  /* ---------- staff jobs ---------- */
  const reachCase = (a, x, sh) => { a.tgN = [x, SHELF_Y[sh] - 8]; a.leanT = 0.28; a.lxT = 0.2; };
  function pickPh(a, kind, then) { // walk to the tray, reach in, lift a pastry out (the tray loses one)
    const t = trayOf(kind); let tx = 0;
    return [K.ph(0, (s) => { tx = trayX(t); s.walkTo = clamp(tx - s.f * 0, 30, 450); }, { until: (s) => !s.walking && Math.abs(s.hx - tx) < 3, max: 8 }),
      K.ph(0.5, (s, u) => { reachCase(s, tx + 6, t.sh); s.tgF = [s.hx - 10, CASE.top - 30]; }),
      K.ph(0.35, (s) => { reachCase(s, tx + 6, t.sh); }, { exit: (s) => { if (t.n > 0) t.n--; s.hold.N = H.pastry(kind); } }),
      K.ph(0.45, (s) => { s.tgN = [s.hx + 18, CASE.top - 36]; s.leanT = 0.08; }, { exit: then })];
  }
  function ginaThink(a) {
    const o = orders.find((q) => !q.taken && (q.mode === 'box' || !sal.free)); if (o) { o.taken = a; return boxOrder(a, o); }
    if (!K.cooled(a, 'tidy', 6)) return K.start(a, 'idle', [K.ph(rand(1, 2.5), (s) => { s.lxT = 0.4; })]);
    const low = TRAYS.find((t) => t.n < 2); if (low && tony.away) { K.say(a, 'Tony! ' + P0.NAMES[low.kind] + 's!', 1.6); callTony(low); return K.start(a, 'tidy', [K.ph(1.2, (s) => { s.lxT = -1; s.tgN = [s.hx - 30, s.hy - 120]; })]); }
    const r = Math.random();
    if (r < 0.4) { const t = pick(TRAYS); return K.start(a, 'tidy', [K.ph(0, (s) => { s.walkTo = (t.x0 + t.x1) / 2; }, { until: (s) => !s.walking, max: 6 }), K.ph(1.5, (s, u, tt) => { reachCase(s, (t.x0 + t.x1) / 2 + Math.sin(tt * 4) * 20, t.sh); })]); } // straighten a tray
    if (r < 0.7) return K.start(a, 'tidy', [K.ph(0, (s) => { s.walkTo = SPOOLS[1]; }, { until: (s) => !s.walking, max: 6 }), K.ph(1.4, (s, u, tt) => { s.tgN = [s.hx + 14 + Math.sin(tt * 6) * 8, CASE.top - 4]; s.tgF = [s.hx - 6, CASE.top - 4]; s.hold.N = H.cloth(); s.leanT = 0.12; }, { exit: (s) => { s.hold.N = null; } })]); // wipe the counter top
    return K.start(a, 'tidy', [K.ph(0, (s) => { s.walkTo = BOX_X; }, { until: (s) => !s.walking, max: 6 }), K.ph(rand(2, 4), (s) => { s.lxT = 0.7; })]);
  }
  function boxOrder(a, o) {
    box = { items: [], lid: 0, wrap: 0, tied: false, x: BOX_X };
    const ph = [K.ph(0.6, (s) => { s.walkTo = BOX_X; s.lxT = 0.6; }, { enter: () => K.say(a, pick(['Coming right up!', 'You got it!', 'Sure thing!']), 1.3) })];
    o.items.forEach((kind) => {
      ph.push(...pickPh(a, kind, null));
      ph.push(K.ph(0, (s) => { s.walkTo = BOX_X + 22; s.tgN = [s.hx + 14, CASE.top - 40]; }, { until: (s) => !s.walking && Math.abs(s.hx - BOX_X - 22) < 3, max: 8 }));
      ph.push(K.ph(0.35, (s) => { s.tgN = [BOX_X - 6 + box.items.length * 4, CASE.top - 16]; s.leanT = 0.18; }, { exit: (s) => { box.items.push(kind); s.hold.N = null; } }));
    });
    ph.push(K.ph(0.5, (s, u) => { s.tgN = [BOX_X + 14, CASE.top - 30 + u * 10]; s.tgF = [BOX_X - 14, CASE.top - 30 + u * 10]; box.lid = u; s.armsFront = true; }));
    ph.push(K.ph(0.55, (s, u) => { s.tgN = [SPOOLS[2] + 2, lerp(CASE.top - 30, 150, Math.sin(u * Math.PI / 2))]; s.tgF = [BOX_X - 10, CASE.top - 20]; stringLine = { x: SPOOLS[2], y: 132, hand: s.hN }; s.lxT = 0.3; }));
    ph.push(K.ph(1.0, (s, u, t) => { const an = t * 13; s.tgN = [BOX_X + Math.cos(an) * 26, CASE.top - 14 + Math.sin(an) * 10]; s.tgF = [BOX_X - 18, CASE.top - 26]; box.wrap = u; }));
    ph.push(K.ph(0.5, (s, u, t) => { s.tgN = [BOX_X + 6 + Math.sin(t * 30) * 4, CASE.top - 30]; s.tgF = [BOX_X - 6 - Math.sin(t * 30) * 4, CASE.top - 30]; }, { exit: () => { box.tied = true; stringLine = null; K.fx('spark', BOX_X, CASE.top - 30, { col: '#7ab0e8', life: 0.4 }); } }));
    const cust = o.cust;
    ph.push(K.ph(0.4, (s) => { s.tgN = [BOX_X, CASE.top - 20]; }, { exit: (s) => { s.hold.N = H.box(box); box = null; } }));
    ph.push(K.ph(0, (s) => { s.walkTo = clamp(cust.hx, 40, 440); s.tgN = [s.hx + 20, CASE.top - 50]; }, { until: (s) => !s.walking, max: 8 }));
    ph.push(K.ph(0.8, (s, u) => { s.tgN = [s.hx + 22, CASE.top - 60]; s.leanT = 0.2; cust.reachTo = [s.hN.x + 6, s.hN.y + 4]; }, { enter: () => K.say(a, pick(['Here you go!', 'Enjoy!', 'There ya go, hon']), 1.4), exit: (s) => { cust.hold.N = s.hold.N; s.hold.N = null; cust.reachTo = null; cust.gotIt = true; } }));
    ph.push(K.ph(0.9, (s) => { s.tgN = [s.hx + 20, CASE.top - 50]; cust.payTo = [s.hN.x - 4, s.hN.y + 2]; }, { exit: (s) => { cust.payTo = null; cust.hold.F = null; s.hold.N = H.cash(); } }));
    ph.push(K.ph(0, (s) => { s.walkTo = REG_X - 26; }, { until: (s) => !s.walking, max: 8 }));
    ph.push(K.ph(0.7, (s, u) => { s.tgN = [REG_X - 6, CASE.top - 28]; reg.open = Math.sin(u * Math.PI); }, { exit: (s) => { s.hold.N = null; reg.open = 0; reg.ding = 1; K.fx('spark', REG_X, CASE.top - 50, { life: 0.5 }); } }));
    K.start(a, 'box', ph, { onEnd: (s) => { s.armsFront = false; orders.splice(orders.indexOf(o), 1); o.cust.phase = o.cust.party.eatIn ? 'leave' : 'leave'; }, onAbort: (s) => { s.armsFront = false; } });
  }
  function plateOrder(a, o) { // Sal: pastries on plates + espressos for the table
    const cust = o.cust, mates = cust.party.members;
    const ph = [K.ph(0.4, null, { enter: () => K.say(a, pick(['Sit, sit, I\'ll bring it', 'Two espressos, coming']), 1.6) })];
    ph.push(K.ph(0, (s) => { s.walkTo = ESP_X + 30; }, { until: (s) => !s.walking, max: 10 }));
    ph.push(K.ph(1.6, (s, u) => { s.lxT = -0.6; s.tgN = [ESP_X + 6, 330]; s.tgF = [ESP_X - 14, 312]; if (u > 0.2) steamT = 1; cupUnder = u < 0.95; }, { exit: (s) => { cupUnder = false; s.hold.F = H.cup(1); } }));
    o.items.forEach((kind) => { ph.push(...pickPh(a, kind, (s) => { s.carry = (s.carry || []).concat([kind]); s.hold.N = null; })); });
    ph.push(K.ph(0, (s) => { s.walkTo = 470; s.hold.N = H.plate(o.items[0]); }, { until: (s) => !s.walking, max: 12 }));
    ph.push(K.ph(1.0, (s, u) => { s.floorY = lerp(STAFF_FLOOR, FRONT_FLOOR - 14, u); s.sc = lerp(STAFF_SC, FRONT_SC * 0.97, u); s.hx = 470 + u * 40; if (u > 0.5) s.layer = 'front'; }));
    ph.push(K.ph(0, (s) => { s.walkTo = TABLE.x - 70; }, { until: (s) => !s.walking, max: 14 }));
    ph.push(K.ph(0.7, (s) => { s.tgN = [TABLE.x - 18, TABLE.top - 8]; s.tgF = [TABLE.x + 4, TABLE.top - 8]; s.leanT = 0.2; }, { exit: (s) => { o.items.forEach((k2, i) => tableItems.push({ k: 'plate', kind: k2, frac: 1, x: TABLE.x + (i ? 26 : -26), owner: mates[i] || cust })); mates.forEach((m, i) => tableItems.push({ k: 'cup', lvl: 1, x: TABLE.x + (i ? 8 : -8), owner: m })); s.hold.N = null; s.hold.F = null; s.carry = null; } }));
    ph.push(K.ph(0.4, null, { enter: () => K.say(a, pick(['Mangia!', 'Enjoy, enjoy']), 1.3) }));
    ph.push(...backBehind());
    K.start(a, 'plate', ph, { onEnd: () => { orders.splice(orders.indexOf(o), 1); }, onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.carry = null; } });
  }
  function backBehind() {
    return [K.ph(0, (s) => { s.walkTo = 510; }, { until: (s) => !s.walking, max: 16 }),
      K.ph(1.0, (s, u) => { s.floorY = lerp(FRONT_FLOOR - 14, STAFF_FLOOR, u); s.sc = lerp(FRONT_SC * 0.97, STAFF_SC, u); s.hx = 510 - u * 40; if (u > 0.5) s.layer = 'staff'; }),
      K.ph(0, (s) => { s.walkTo = REG_X; }, { until: (s) => !s.walking, max: 8 })];
  }
  function clearTable(a) {
    const ph = [K.ph(0, (s) => { s.walkTo = 470; }, { until: (s) => !s.walking, max: 10 }),
      K.ph(1.0, (s, u) => { s.floorY = lerp(STAFF_FLOOR, FRONT_FLOOR - 14, u); s.sc = lerp(STAFF_SC, FRONT_SC * 0.97, u); s.hx = 470 + u * 40; if (u > 0.5) s.layer = 'front'; }),
      K.ph(0, (s) => { s.walkTo = TABLE.x - 64; }, { until: (s) => !s.walking, max: 14 }),
      K.ph(0.8, (s) => { s.tgN = [TABLE.x - 10, TABLE.top - 6]; s.tgF = [TABLE.x + 20, TABLE.top - 6]; s.leanT = 0.22; }, { exit: (s) => { const pl = tableItems.find((q) => q.k === 'plate'); s.hold.N = H.plate(null, 0); s.hold.F = H.cup(0); tableItems = []; void pl; } }),
      K.ph(1.2, (s, u, t) => { s.hold.N = null; s.hold.F = H.cloth(); s.tgF = [TABLE.x + Math.sin(t * 7) * 30, TABLE.top - 4]; s.tgN = [s.hx + 20, s.hy - 60]; s.hold.N = H.plate(null, 0); }, { exit: (s) => { s.hold.F = null; } }),
      ...backBehind(), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; } })];
    K.start(a, 'clear', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; } });
  }
  function salThink(a) {
    a.free = false;
    const o = orders.find((q) => !q.taken && q.mode === 'plate'); if (o) { o.taken = a; return plateOrder(a, o); }
    const ob = orders.find((q) => !q.taken && gina.act && gina.act.name === 'box' && q.mode === 'box'); if (ob) { ob.taken = a; return boxOrderSal(a, ob); }
    if (tableItems.length && !TABLE.seats.some((s) => s.occ)) return clearTable(a);
    const low = TRAYS.find((t) => t.n < 2); if (low && tony.away) { K.say(a, 'Tony! More ' + P0.NAMES[low.kind].toLowerCase() + 's!', 1.6); callTony(low); return K.start(a, 'call', [K.ph(1.2, (s) => { s.lxT = -1; s.tgN = [s.hx - 30, s.hy - 110]; })]); }
    if (smudge > 0.3 && K.cooled(a, 'wipe', 20)) return K.start(a, 'wipe', [K.ph(0, (s) => { s.walkTo = 120; }, { until: (s) => !s.walking, max: 10 }), K.ph(2.2, (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 30 + Math.sin(t * 6) * 26, 500 + Math.cos(t * 6) * 10]; s.leanT = 0.3; smudge = Math.max(0, smudge - K.dt * 0.6); }, { exit: (s) => { s.hold.N = null; } }), K.ph(0, (s) => { s.walkTo = REG_X; }, { until: (s) => !s.walking, max: 10 })]);
    if (signOpen && ((K.hour % 24) > 22.7 || (K.hour % 24) < 6.5) && !customers().length) return K.start(a, 'sign', [K.ph(0, (s) => { s.walkTo = 470; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.8, (s) => { s.lxT = 1; s.tgN = [s.hx + 30, 300]; }, { exit: () => { signOpen = 0; K.say(a, 'Buonanotte!', 1.6); } }), K.ph(0, (s) => { s.walkTo = REG_X; }, { until: (s) => !s.walking, max: 10 })]);
    if (!signOpen && (K.hour % 24) > 6.5 && (K.hour % 24) < 22.5) return K.start(a, 'sign', [K.ph(0, (s) => { s.walkTo = 470; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.8, (s) => { s.lxT = 1; s.tgN = [s.hx + 30, 300]; }, { exit: () => { signOpen = 1; K.say(a, 'We\'re open!', 1.6); } }), K.ph(0, (s) => { s.walkTo = REG_X; }, { until: (s) => !s.walking, max: 10 })]);
    a.free = true;
    const r = Math.random();
    if (r < 0.3) return K.start(a, 'count', [K.ph(0, (s) => { s.walkTo = REG_X - 10; }, { until: (s) => !s.walking, max: 8 }), K.ph(rand(1.5, 2.5), (s, u, t) => { s.tgN = [REG_X - 4, CASE.top - 26 + Math.sin(t * 10) * 2]; reg.open = 0.6; }, { exit: () => { reg.open = 0; } })]);
    if (r < 0.5 && customers().some((c) => c.phase === 'sitting')) { const c = customers().find((q) => q.phase === 'sitting'); return K.start(a, 'look', [K.ph(rand(1.5, 2.5), (s) => { s.look = { x: () => c.hx, until: K.simT + 0.2 }; }, { enter: () => K.say(a, pick(['Good, eh?', 'More espresso?', 'icon:note']), 1.4) })]); }
    return K.start(a, 'idle', [K.ph(rand(1.5, 3.5), (s) => { s.lxT = 0.5; s.tgN = [s.hx + 18, CASE.top - 8]; s.tgF = [s.hx - 4, CASE.top - 8]; s.leanT = 0.1; })]);
  }
  function boxOrderSal(a, o) { const g = gina; gina = a; boxOrder(a, o); gina = g; }
  function callTony(t) {
    tony.away = 0; tony.alpha = 0; tony.fade = 2; tony.hx = 12;
    const kind = t.kind;
    K.start(tony, 'tray', [K.ph(0.5, (s) => { s.hold.N = H.tray(kind); s.tgN = [s.hx + 30, s.hy - 70]; s.tgF = [s.hx + 6, s.hy - 64]; }, { enter: () => K.say(tony, pick(['Fresh ones!', 'Hot outta the oven!', 'Comin\' through!']), 1.6) }),
      K.ph(0, (s) => { s.walkTo = (t.x0 + t.x1) / 2 - 20; s.tgN = [s.hx + 30, s.hy - 70]; s.tgF = [s.hx + 6, s.hy - 64]; }, { until: (s) => !s.walking, max: 10 }),
      K.ph(1.1, (s, u) => { s.tgN = [(t.x0 + t.x1) / 2 + 10, SHELF_Y[t.sh] - 10]; s.tgF = [(t.x0 + t.x1) / 2 - 16, SHELF_Y[t.sh] - 10]; s.leanT = 0.3; t.n = Math.max(t.n, Math.round(t.max * u)); }, { exit: (s) => { s.hold.N = null; t.n = t.max; } }),
      K.ph(0, (s) => { s.walkTo = 12; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.5, (s) => { s.fade = -2; })], { onEnd: (s) => { s.away = 1; s.alpha = 0; } });
  }
  /* ---------- customer behaviour ---------- */
  function custPose(a) {
    K.basePose(a);
    if (a.reachTo) { a.tgN = a.reachTo.slice(); a.leanT = 0.1; }
    if (a.payTo) { a.hold.F = a.hold.F || H.cash(); a.tgF = a.payTo.slice(); }
    if (a.state === 'stand' && !a.walking && a.phase !== 'leave' && a.spot) a.lxT = -0.35 * Math.sign(a.f || -1) * -1 * -1; // turned to the case
  }
  function custThink(a) {
    if (a.phase === 'tag') { if (a.tagOf.phase === 'leave' || a.tagOf.gone) { a.phase = 'leave'; return; } if (a.type === 'kid' && !a.walking && K.cooled(a, 'glass', 14) && Math.random() < 0.4) return K.start(a, 'glass', [K.ph(1.8, (s, u, t) => { s.tgN = [s.hx - 18, 540]; s.tgF = [s.hx - 6, 548]; s.leanT = 0.25; smudge = Math.min(1, smudge + K.dt * 0.4); }, { enter: () => K.say(a, pick(['That one!', 'Ooh!']), 1.2) })]); if (!a.walking && Math.random() < 0.3) return K.start(a, 'idle', [K.ph(rand(1, 2), (s) => { s.look = { x: () => s.tagOf.hx, until: K.simT + 0.3 }; })]); return; }
    if (a.phase === 'enter') { if (!a.walking && a.alpha >= 1) a.phase = 'browse'; return; }
    if (a.phase === 'browse') {
      const T0 = a.T0, n = T0.big ? randi(6, 12) : randi(1, 3), kinds = []; const pref = T0.kinds;
      const party = a.party, eat = party.eatIn;
      for (let i = 0; i < (eat ? party.members.filter((m) => !TYPES[m.type].kid).length || 1 : n); i++) { let kd = pref && Math.random() < 0.7 ? pick(pref) : wpick2(ORDERW); if (trayOf(kd).n <= 0) kd = TRAYS.filter((t) => t.n > 0).map((t) => t.kind)[0] || 'cannoli'; kinds.push(kd); }
      if (eat) { kinds.length = Math.min(kinds.length, 2); }
      const t = trayOf(kinds[0]);
      return K.start(a, 'order', [K.ph(1.2, (s, u, tt) => { s.tgN = [clamp((t.x0 + t.x1) / 2, 40, 440), 520]; s.leanT = 0.12; }, { enter: () => K.say(a, pick(T0.words.filter((w) => !w.startsWith('icon')).concat([kinds.length > 2 ? kinds.length + ' mixed, please' : P0.NAMES[kinds[0]] + (kinds.length > 1 ? ' x' + kinds.length : '') + ', please'])), 1.8) }),
        K.ph(0.6, null)], { onEnd: (s) => { s.phase = 'wait'; orders.push({ cust: s, items: kinds.slice(0, 8), mode: eat ? 'plate' : 'box' }); if (eat) { s.phase = 'toTable'; } } });
    }
    if (a.phase === 'wait') { if (a.gotIt) { a.gotIt = false; a.phase = 'leave'; return; } if (Math.random() < 0.25 && !a.payTo && !a.reachTo) return K.start(a, 'look', [K.ph(rand(1, 2.5), (s) => { s.look = { x: () => (gina.act && gina.act.name === 'box' ? gina.hx : 300), until: K.simT + 0.3 }; })]); if (a.type === 'tourist' && K.cooled(a, 'photo', 30) && Math.random() < 0.2) return actPhoto(a); return; }
    if (a.phase === 'toTable') { // walk to the table, sit and wait for Sal
      for (const m of a.party.members) { const i = a.party.members.indexOf(m); const st = TABLE.seats[i] || TABLE.seats[1]; st.occ = m; m.seatSlot = st; m.phase = 'goSit'; m.walkTo = st.x + (st.f > 0 ? -10 : 10); if (m.spot) { m.spot.occ = null; m.spot = null; } }
      return;
    }
    if (a.phase === 'goSit') { if (!a.walking && a.state === 'stand') { const st = a.seatSlot; K.sitDown(a, st.x, 600, st.f); a.floorY = 704; a.tableY = TABLE.top - 6; a.phase = 'sitting'; a.layer = 'table'; a.faceDir = st.f * 0.85; } return; }
    if (a.phase === 'sitting' && a.state === 'seated') return tableAct(a);
    if (a.phase === 'leave') {
      if (a.spot) { a.spot.occ = null; a.spot = null; }
      if (a.seatSlot && a.state === 'seated') { K.standUp(a); return; }
      if (a.seatSlot && a.state === 'stand') { a.seatSlot.occ = null; a.seatSlot = null; a.floorY = FRONT_FLOOR; }
      if (a.state !== 'stand') return;
      if (a.hold.N && a.hold.N.box && !a.saidBye) { a.saidBye = 1; K.say(a, pick(['Thanks!', 'Grazie!', 'Thank you!', 'See ya!']), 1.3); K.after(0.6, () => K.say(sal, pick(['Ciao!', 'Come back soon!', 'Take care!']), 1.4)); }
      a.walkTo = DOOR_X + 40; a.phase = 'out'; return;
    }
    if (a.phase === 'out') { if (a.hx > DOOR_X - 30) a.fade = -1.8; return; }
  }
  function actPhoto(a) { return K.start(a, 'photo', [K.ph(0.5, (s) => { s.tgN = [s.hx - 10, s.R.cy + 6]; s.tgF = [s.hx - 4, s.R.cy + 10]; }), K.ph(0.2, null, { exit: (s) => K.fx('flash', s.hx - 14, s.R.cy, { life: 0.4 }) }), K.ph(0.6, null, { enter: () => K.say(a, 'icon:cam', 1) })]); }
  const myItem = (a, k) => tableItems.find((q) => q.k === k && q.owner === a);
  function tableAct(a) {
    const pl = myItem(a, 'plate'), cup = myItem(a, 'cup'), other = a.party.members.find((m) => m !== a && m.phase === 'sitting');
    const done = (!pl || pl.frac <= 0.02) && (!cup || cup.lvl <= 0.02);
    if (!pl && !cup && !a.party.served) { if (Math.random() < 0.4 && other) return actChat(a, other); return K.start(a, 'idle', [K.ph(rand(1, 2), null)]); }
    a.party.served = true;
    if (done) { if (!a.doneAt) a.doneAt = K.simT; if (K.simT - a.doneAt > rand(4, 9) && a.party.members.every((m) => m.doneAt || m.type === 'kid')) { a.party.members.forEach((m, j) => { K.after(j * 0.4, () => { if (m.act) K.abort(m); m.phase = 'leave'; }); }); return; } }
    const r = Math.random();
    if (a.type === 'nonno' && !a.paper && Math.random() < 0.5) { a.paper = 1; return K.start(a, 'read', [K.ph(rand(5, 9), (s, u, t) => { s.hold.N = s.hold.N || H.paper(); s.tgN = [s.hx + s.f * 34, s.R.cy + 30]; s.tgF = [s.hx + s.f * 22, s.R.cy + 34]; s.lxT = s.f * 0.9; s.headDy = 3; if ((t % 3.2) < 0.3) s.tgN[0] += s.f * 12; }, { exit: (s) => { s.hold.N = null; s.paper = 0; } })], { onAbort: (s) => { s.hold.N = null; s.paper = 0; } }); }
    if (pl && pl.frac > 0.02 && r < 0.45) return actBite(a, pl);
    if (cup && cup.lvl > 0.02 && r < 0.75) return actSip(a, cup);
    if (other && r < 0.9 && K.cooled(a, 'chat', 6)) return actChat(a, other);
    return K.start(a, 'idle', [K.ph(rand(1, 2.5), (s) => { s.lxT = Math.random() < 0.5 ? s.f : s.f * 0.4; })]);
  }
  function actBite(a, pl) {
    const f = a.f; let px;
    return K.start(a, 'bite', [K.ph(0.55, (s) => { px = pl.x; s.tgN = [px, TABLE.top - 14]; s.leanT = 0.12; }, { exit: (s) => { s.hold.N = H.pastry(pl.kind, pl.frac); pl.lifted = 1; } }),
      K.ph(0.5, (s) => { s.tgN = [s.R.cx + f * s.R.R * 0.9, s.R.cy + s.R.R * 0.5]; s.leanT = 0.06; }),
      K.ph(0.5, (s, u, t) => { s.headDy = Math.sin(t * 18) * 1.5; }, { exit: (s) => { pl.frac = Math.max(0, pl.frac - rand(0.22, 0.34)); s.hold.N.frac = pl.frac; K.fx('crumbs', s.hN.x, s.hN.y, { life: 0.6 }); } }),
      K.ph(0.9, (s, u, t) => { s.headDy = Math.sin(t * 14) * 1.2; s.tgN = [s.R.cx + f * s.R.R * 1.6, s.R.cy + s.R.R * 1.6]; }, { enter: () => { if (Math.random() < 0.35) K.say(a, pick(['Mmm!', 'Wicked good', 'So fresh!', 'icon:heart', 'Perfetto']), 1.3); } }),
      K.ph(0.5, (s) => { s.tgN = [pl.x, TABLE.top - 12]; }, { exit: (s) => { s.hold.N = null; pl.lifted = 0; } })], { onAbort: (s) => { s.hold.N = null; pl.lifted = 0; } });
  }
  function actSip(a, cup) {
    const f = a.f;
    return K.start(a, 'sip', [K.ph(0.5, (s) => { s.tgF = [cup.x, TABLE.top - 12]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.cup(cup.lvl); cup.lifted = 1; } }),
      K.ph(0.5, (s) => { s.tgF = [s.R.cx + f * s.R.R * 0.9, s.R.cy + s.R.R * 0.7]; }),
      K.ph(0.8, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.8; s.tilt = -0.1; }, { exit: (s) => { cup.lvl = Math.max(0, cup.lvl - rand(0.25, 0.4)); s.hold.F.lvl = cup.lvl; s.cupTilt = 0; } }),
      K.ph(0.5, (s) => { s.tgF = [cup.x, TABLE.top - 10]; }, { exit: (s) => { s.hold.F = null; cup.lifted = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; cup.lifted = 0; s.cupTilt = 0; } });
  }
  const TOPICS = [['Best in Boston', 'No contest'], ['Ricotta or cream?', 'Ricotta!'], ['Freedom Trail next?', 'After this'], ['Wicked good', 'Told ya'], ['icon:heart', 'icon:heart'], ['Paul Revere\'s house?', 'Two blocks'], ['Another one?', 'icon:laugh']];
  function actChat(a, b) {
    const [l1, l2] = pick(TOPICS);
    K.start(b, 'listen', [K.ph(2.6, (s) => { s.look = { x: () => a.hx, until: K.simT + 0.2 }; }, { enter: () => K.after(1.1, () => K.say(b, l2, 1.4)) })]);
    return K.start(a, 'chat', [K.ph(2.6, (s, u, t) => { s.look = { x: () => b.hx, until: K.simT + 0.2 }; s.tgN = [s.hx + s.f * 40 + Math.sin(t * 5) * 8, s.R.cy + 50]; }, { enter: () => K.say(a, l1, 1.5) })]);
  }
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    for (const a of K.actors) if (a.cust) { a.pose = custPose; if (!a.act && K.simT >= (a.nextThink2 || 0)) { custThink(a); a.nextThink2 = K.simT + rand(0.2, 0.6); } }
    nextArrive -= dt;
    const target = [1.6, 3.2, 2.6, 1.4][per()];
    const open = signOpen;
    if (nextArrive <= 0) { const n = customers().length; if (open && n < target + 0.5 && n < 5) spawnParty(false); nextArrive = rand(5, 11) * (n >= target ? 1.6 : 1); }
    reg.ding = Math.max(0, reg.ding - dt * 2); steamT = Math.max(0, steamT - dt * 0.8);
    // Freedom Trail tour passing the window (daytime signature moment)
    const h = ((K.hour % 24) + 24) % 24;
    if (tourT < 0 && h > 10 && h < 17.5 && Math.random() < dt / 70) tourT = 0;
    if (tourT >= 0) { tourT += dt; if (tourT > 22) tourT = -1; }
    for (const a of K.actors) if (a.state === 'stand' && a.cust && a.phase === 'out' && a.hx > DOOR_X) a.gone = true;
  }
  function onGone(Kk, a) { if (a.spot) a.spot.occ = null; if (a.seatSlot) a.seatSlot.occ = null; }
  function onClear(Kk, big, n) {
    for (const a of customers()) if (!a.act || a.act.name === 'idle' || a.act.name === 'look') { K.after(rand(0, 0.4), () => { if (!a.act) K.start(a, 'cheer', [K.ph(1.1, (s, u) => { const q = Math.sin(u * Math.PI); s.tgN = [s.hx + s.f * 10, s.R.cy - s.R.R * 1.4 * q]; if (big) s.tgF = [s.hx - s.f * 6, s.R.cy - s.R.R * 1.3 * q]; s.bob = -q * 5; })], { onEnd: (s) => { s.bob = 0; } }); }); if (big || Math.random() < 0.5) K.after(0.2, () => K.say(a, pick(big ? ['Wicked!', 'Whoa!', 'icon:star'] : ['Nice!', 'icon:note']), 1.2)); }
    K.say(Math.random() < 0.5 ? gina : sal, pick(big ? ['Bravo!', 'Fantastico!', 'icon:star'] : ['Brava!', 'Nice one!']), 1.3);
  }
  function build(Kk) {
    K = Kk; mkStaff();
    TRAYS.forEach((t) => { t.n = Math.max(2, t.max - randi(0, 2)); });
    const h = ((K.hour % 24) + 24) % 24; signOpen = h > 6.5 && h < 22.8 ? 1 : 0;
    // seed: a regular at the table in the morning, someone at the case otherwise
    if (h < 11 && signOpen) { const a = mkCust('nonno', TABLE.seats[0].x); a.alpha = 1; a.fade = 0; a.party = { members: [a], eatIn: true, served: true }; TABLE.seats[0].occ = a; a.seatSlot = TABLE.seats[0]; a.state = 'seated'; a.seatY = 600; a.floorY = 704; a.f = 1; a.tableY = TABLE.top - 6; a.phase = 'sitting'; a.layer = 'table'; a.faceDir = 0.85; tableItems.push({ k: 'plate', kind: 'sfog', frac: 0.7, x: TABLE.x - 26, owner: a }, { k: 'cup', lvl: 0.8, x: TABLE.x - 8, owner: a }); K.settle(a); }
    if (signOpen) spawnParty(false);
  }
  /* ---------- drawing: room ---------- */
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    // pressed-tin ceiling band: a grid of flat squares with light / shade facets
    c.fillStyle = P.tin; c.fillRect(-60, 0, 1400, 74); c.fillStyle = P.trim; c.fillRect(-60, 70, 1400, 8);
    for (let x = -60; x < 1340; x += 34) for (let y = 4; y < 66; y += 32) { c.fillStyle = P.tin2; K.poly(c, [x + 4, y + 4, x + 30, y + 4, x + 17, y + 17]); c.fill(); c.fillStyle = 'rgba(255,255,255,0.18)'; K.poly(c, [x + 4, y + 4, x + 17, y + 17, x + 4, y + 28]); c.fill(); }
    // crown moulding + angular wall planes (ref composition)
    c.fillStyle = P.wall3; K.poly(c, [-60, 78, 470, 78, 470, 660, -60, 660]); c.fill();
    c.fillStyle = shade(P.wall, 0.04); K.poly(c, [860, 78, 1340, 78, 1340, 660, 860, 660]); c.fill();
    // wainscot (blue) along the bottom
    c.fillStyle = P.wall2; c.fillRect(-60, 500, 1400, 160); c.fillStyle = shade(P.wall2, 0.15); c.fillRect(-60, 496, 1400, 6);
    for (let x = 476; x < 1340; x += 64) { c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(x + 6, 516, 52, 120); c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(x + 6, 516, 52, 4); }
    // a wall of framed photos of regulars (between mirror and window)
    for (const [fx, fy, fw, fh, tn] of [[790, 150, 44, 56, 0], [842, 140, 34, 44, 1], [796, 220, 36, 46, 2], [842, 200, 40, 52, 0], [794, 284, 46, 36, 1], [846, 270, 30, 40, 2]]) { c.fillStyle = P.frame; c.fillRect(fx - 3, fy - 3, fw + 6, fh + 6); c.fillStyle = [P.cream, P.mirror, P.wall3][tn]; c.fillRect(fx, fy, fw, fh); c.fillStyle = rgba(P.ink, 0.35); c.beginPath(); c.arc(fx + fw / 2, fy + fh * 0.42, fw * 0.17, 0, TAU); c.fill(); K.poly(c, [fx + fw * 0.22, fy + fh, fx + fw * 0.78, fy + fh, fx + fw * 0.62, fy + fh * 0.6, fx + fw * 0.38, fy + fh * 0.6]); c.fill(); }
    // centre: a big gilt mirror (calm, low detail behind the board)
    c.fillStyle = P.frame; c.fillRect(520, 118, 240, 330); c.fillStyle = P.mirror; c.fillRect(532, 130, 216, 306);
    c.fillStyle = P.mirror2; K.poly(c, [560, 130, 640, 130, 556, 436, 532, 436, 532, 230]); c.globalAlpha = 0.5; c.fill(); c.globalAlpha = 1;
    // back wall (left): menu board + shelves of folded white boxes + kitchen door + espresso machine
    c.fillStyle = P.menu; c.fillRect(30, 96, 420, 92); c.fillStyle = P.trim; c.fillRect(30, 92, 420, 5); c.fillRect(30, 187, 420, 4);
    c.fillStyle = P.menuInk; c.font = '700 13px Georgia, serif'; c.textAlign = 'left'; c.textBaseline = 'middle';
    const M = [['Cannoli', '4.50'], ['Lobster Tail', '5.75'], ['Sfogliatella', '4.75'], ['Florentine', '3.50'], ['Eclair', '4.25'], ['Napoleon', '4.75']];
    M.forEach(([n, p], i) => { const x = 46 + (i % 2) * 206, y = 116 + Math.floor(i / 2) * 26; c.fillText(n, x, y); c.textAlign = 'right'; c.fillText(p, x + 180, y); c.textAlign = 'left'; c.fillStyle = rgba(P.menuInk, 0.35); c.fillRect(x + c.measureText(n).width + 6, y + 4, 180 - c.measureText(n).width - 46, 1); c.fillStyle = P.menuInk; });
    c.fillStyle = P.door; c.fillRect(-10, 210, 62, 300); c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(30, 210, 22, 300); // kitchen door
    c.fillStyle = P.shelf; c.fillRect(250, 262, 200, 7); c.fillRect(250, 352, 200, 7);
    for (let i = 0; i < 6; i++) { c.fillStyle = P.box; c.fillRect(258 + i * 31, 238 - (i % 2) * 6, 27, 24 + (i % 2) * 6); c.fillStyle = 'rgba(0,0,0,0.07)'; c.fillRect(272 + i * 31, 238 - (i % 2) * 6, 13, 24 + (i % 2) * 6); }
    for (let i = 0; i < 4; i++) { c.fillStyle = P.box; c.fillRect(262 + i * 46, 322, 40, 30); c.fillStyle = P.str; c.fillRect(280 + i * 46, 322, 2, 30); }
    // espresso machine on the back counter
    c.fillStyle = P.shelf; c.fillRect(110, 352, 130, 8);
    // espresso machine: chrome body, red top rail, two group heads with portafilters, gauge, steam wand, cups warming on top
    c.fillStyle = L('#c4c8ce'); c.fillRect(122, 280, 112, 72); c.fillStyle = L('#9a9ea6'); c.fillRect(178, 280, 56, 72);
    c.fillStyle = L('#c8382e'); c.fillRect(118, 272, 120, 10); c.fillStyle = L('#a02a22'); c.fillRect(178, 272, 60, 10);
    for (let i = 0; i < 3; i++) { c.fillStyle = L('#f4f0e6'); K.poly(c, [130 + i * 14, 272, 140 + i * 14, 272, 138 + i * 14, 262, 132 + i * 14, 262]); c.fill(); }
    c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(150, 298, 9, 0, TAU); c.fill(); c.strokeStyle = L('#2a2a30'); c.lineWidth = 1.5; c.beginPath(); c.moveTo(150, 298); c.lineTo(150 + Math.cos(t * 0.3) * 6, 298 - 5); c.stroke();
    for (const gx of [150, 206]) { c.fillStyle = L('#5a5e66'); c.fillRect(gx - 9, 316, 18, 8); c.fillStyle = L('#2a2a30'); c.fillRect(gx - 7, 324, 14, 5); c.fillRect(gx + 6, 325, 22, 3); }
    c.fillStyle = L('#6a6e76'); c.fillRect(126, 342, 104, 6); c.strokeStyle = L('#8a8e96'); c.lineWidth = 2.5; c.beginPath(); c.moveTo(232, 300); c.lineTo(240, 300); c.lineTo(242, 336); c.stroke();
    c.fillStyle = L('#e8c25a'); c.fillRect(180, 286, 26, 3);
    if (cupUnder) drawCup(c, ESP_X, 346, 0.9, 0.5);
    if (steamT > 0) { c.fillStyle = rgba('#ffffff', 0.4 * steamT); for (let i = 0; i < 3; i++) { const y = 300 - ((t * 30 + i * 14) % 40); c.beginPath(); c.arc(214 + Math.sin(t * 3 + i) * 4, y, 5 + i * 2, 0, TAU); c.fill(); } }
    // string spools hanging over the counter (blue-and-white string)
    c.strokeStyle = P.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(130, 96); c.lineTo(330, 96); c.stroke();
    for (const x of SPOOLS) { c.strokeStyle = shade(P.ink, 0.3); c.beginPath(); c.moveTo(x, 78); c.lineTo(x, 108); c.stroke(); c.fillStyle = P.box; K.poly(c, [x - 9, 108, x + 9, 108, x + 6, 132, x - 6, 132]); c.fill(); c.fillStyle = P.str; for (let i = 0; i < 4; i++) c.fillRect(x - 8 + i * 0.8, 112 + i * 5, 16 - i * 1.6, 2); }
    for (const x of SPOOLS.slice(0, 2)) { c.strokeStyle = P.str; c.lineWidth = 1; c.beginPath(); c.moveTo(x, 132); c.quadraticCurveTo(x + 3 + Math.sin(t * 1.3 + x) * 2, 170, x + 1, 205); c.stroke(); }
  }
  function drawWindow(c, t) {
    const P = K.P, { x0, y0, x1, y1 } = WIN;
    c.fillStyle = P.trim; c.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 34);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
    K.sky(c, x0, y0, x1, y1 - 120, { sunR: 14 });
    // Hanover Street: brick facades across the road, fire escapes, awnings, festoon lights, a lamp post
    for (const f of FACADE) {
      const top = y1 - 40 - f.h; c.fillStyle = [P.brick, P.brick2, P.brick3][f.tone]; c.fillRect(f.x, top, f.w, f.h + 60);
      c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(f.x, top, f.w, 8);
      for (let r = 0; r < 4; r++) for (let q = 0; q < 2; q++) { const wx = f.x + 12 + q * (f.w / 2), wy = top + 22 + r * 46; if (wy > y1 - 90) continue; const on = P.night > 0.3 && f.lit[r * 2 + q] < 0.55; c.fillStyle = on ? P.winLit : P.winOut; c.fillRect(wx, wy, f.w / 2 - 22, 26); if (on) K.glow(c, wx + 10, wy + 12, 22, P.winLit, 0.25 * P.night); }
      if (f.esc) { c.strokeStyle = shade(P.brick2, -0.4); c.lineWidth = 2; for (let r = 1; r < 3; r++) { const yy = top + 18 + r * 46; c.strokeRect(f.x + 6, yy, f.w - 12, 2); for (let q = 0; q < 6; q++) c.fillRect(f.x + 8 + q * (f.w - 16) / 5, yy - 12, 1.5, 12); } }
      if (f.awn) { c.fillStyle = P.awn1; K.poly(c, [f.x + 4, y1 - 92, f.x + f.w - 4, y1 - 92, f.x + f.w + 6, y1 - 72, f.x - 6, y1 - 72]); c.fill(); c.fillStyle = P.awn2; for (let q = 0; q < 5; q++) c.fillRect(f.x - 4 + q * (f.w + 8) / 5, y1 - 76, (f.w + 8) / 10, 4); }
    }
    c.fillStyle = P.street; c.fillRect(x0, y1 - 40, x1 - x0, 40); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x0, y1 - 40, x1 - x0, 4);
    // festoon lights strung across the street (lit from dusk)
    c.strokeStyle = 'rgba(30,20,20,0.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0 + 50); c.quadraticCurveTo((x0 + x1) / 2, y0 + 90, x1, y0 + 46); c.stroke();
    for (let i = 0; i <= 12; i++) { const u = i / 12, x = lerp(x0, x1, u), y = (1 - u) * (1 - u) * (y0 + 50) + 2 * u * (1 - u) * (y0 + 90) + u * u * (y0 + 46) + 4; c.fillStyle = P.lampOn > 0.2 ? P.lamp : shade(P.winOut, 0.2); c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); if (P.lampOn > 0.2) K.glow(c, x, y, 12, P.lamp, 0.4 * P.lampOn); }
    // lamp post
    c.fillStyle = shade(P.street, -0.6); c.fillRect(x1 - 70, y1 - 200, 5, 160); c.fillRect(x1 - 80, y1 - 206, 25, 8); if (P.lampOn > 0.1) K.glow(c, x1 - 67, y1 - 196, 50, P.lamp, 0.5 * P.lampOn);
    // Freedom Trail tour: a guide with a little flag and a few tourists strolling past (daytime)
    if (tourT >= 0) { const u = tourT / 22; for (let i = 0; i < 5; i++) { const x = lerp(x1 + 30, x0 - 120, u) + i * 26, y = y1 - 30; const bob = Math.abs(Math.sin(K.t * 5 + i)) * 2; c.fillStyle = i === 0 ? shade(P.coral, -0.2) : [P.teal, P.mustard, P.plum, P.navy][i % 4]; K.poly(c, [x - 7, y - bob, x + 7, y - bob, x + 4, y - 30 - bob, x - 4, y - 30 - bob]); c.fill(); c.fillStyle = P.skin; c.beginPath(); c.arc(x, y - 36 - bob, 6, 0, TAU); c.fill(); if (i === 0) { c.fillStyle = shade(P.street, -0.6); c.fillRect(x + 8, y - 66, 1.5, 34); c.fillStyle = '#c8302a'; c.fillRect(x + 9, y - 66, 12, 8); } } }
    K.weather(c, x0, y0, x1, y1);
    if (K.weatherNow === 'snow') { c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(x0, y1 - 8, x1 - x0, 8); }
    // glass reflection planes
    c.fillStyle = 'rgba(255,255,255,0.08)'; K.poly(c, [x0 + 40, y0, x0 + 110, y0, x0 + 20, y1, x0 - 50, y1]); c.fill();
    c.restore();
    // mullions + sill + gold leaf lettering
    c.fillStyle = P.trim; c.fillRect((x0 + x1) / 2 - 4, y0, 8, y1 - y0); c.fillRect(x0, y0 + 120, x1 - x0, 6);
    c.fillStyle = shade(P.trim, 0.2); c.fillRect(x0 - 20, y1 + 12, x1 - x0 + 40, 10);
    c.save(); c.font = 'italic 700 24px Georgia, serif'; c.textAlign = 'center'; c.fillStyle = rgba('#e8c060', 0.85); c.fillText('Pasticceria', (x0 + x1) / 2, y0 + 158); c.restore();
    // neon OPEN sign hanging in the window
    const on = signOpen ? P.neonA : 0; c.strokeStyle = on > 0.1 ? P.neon : rgba('#806060', 0.6); c.lineWidth = 3; roundRect(c, x0 + 30, y0 + 196, 76, 30, 8); c.stroke();
    c.font = '800 16px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = on > 0.1 ? P.neon : rgba('#806060', 0.6); c.fillText('OPEN', x0 + 68, y0 + 212);
    if (on > 0.1) K.glow(c, x0 + 68, y0 + 211, 70, P.neon, 0.35 * on);
  }
  function drawDoor(c) {
    const P = K.P; c.fillStyle = P.trim; c.fillRect(1226, 120, 100, 560); c.fillStyle = P.door; c.fillRect(1236, 130, 90, 550);
    c.save(); c.beginPath(); c.rect(1246, 150, 70, 300); c.clip(); K.sky(c, 1246, 150, 1316, 400, { noSun: 1, noClouds: 1 }); c.fillStyle = P.brick; c.fillRect(1246, 260, 70, 200); K.weather(c, 1246, 150, 1316, 450); c.restore();
    c.fillStyle = P.box; c.fillRect(1252, 300, 50, 22); c.fillStyle = P.ink; c.font = '800 11px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(signOpen ? 'OPEN' : 'CLOSED', 1277, 311);
    c.fillStyle = L('#c8a040'); c.fillRect(1242, 470, 8, 30);
  }
  function drawCase(c, t) {
    const P = K.P, { x0, x1, top, glass0, glass1, base } = CASE;
    // back of the case (dark interior) + two shelves of pastries, seen through the glass
    c.fillStyle = shade(P.caseDk, -0.15); c.fillRect(x0, top, x1 - x0, glass1 - top);
    for (const t2 of TRAYS) { const y = SHELF_Y[t2.sh]; c.fillStyle = L('#d8dcdf'); c.fillRect(t2.x0, y + 6, t2.x1 - t2.x0, 4); c.fillStyle = L('#f6f2ea'); c.fillRect(t2.x0 + 2, y + 2, t2.x1 - t2.x0 - 4, 4); for (let i = 0; i < t2.n; i++) it(c, t2.kind, t2.x0 + 12 + i * 24, y - 2, 0.82, L); }
    c.fillStyle = shade(P.caseDk, 0.1); c.fillRect(x0, SHELF_Y[0] + 10, x1 - x0, 3);
    // little price flags
    c.font = '700 8px sans-serif'; c.textAlign = 'center'; for (const t2 of TRAYS) { c.fillStyle = P.box; c.fillRect(t2.x0 + 4, SHELF_Y[t2.sh] + 10, 28, 9); c.fillStyle = P.ink; c.fillText(P0.NAMES[t2.kind].split(' ')[0].slice(0, 7), t2.x0 + 18, SHELF_Y[t2.sh] + 15); }
  }
  function drawCaseFront(c, t) {
    const P = K.P, { x0, x1, top, glass0, glass1, base } = CASE;
    // glass front: pale tint + diagonal reflection planes (+ kid's fingerprints)
    c.fillStyle = rgba(P.glass, 0.22); c.fillRect(x0, glass0, x1 - x0, glass1 - glass0);
    c.fillStyle = 'rgba(255,255,255,0.18)'; for (const gx of [60, 230, 380]) { K.poly(c, [gx, glass0, gx + 40, glass0, gx - 10, glass1, gx - 50, glass1]); c.fill(); }
    if (smudge > 0.02) { c.fillStyle = rgba('#ffffff', 0.25 * smudge); for (let i = 0; i < 6; i++) { ellipse(c, 90 + i * 9 + (i % 2) * 3, 545 + (i % 3) * 6, 4, 6); c.fill(); } }
    c.fillStyle = P.caseTop; c.fillRect(x0 - 4, top, x1 - x0 + 8, 12); c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(x0 - 4, top + 10, x1 - x0 + 8, 3);
    c.fillStyle = P.case; c.fillRect(x0 - 4, glass1, x1 - x0 + 8, base - glass1); c.fillStyle = P.caseDk; c.fillRect(x0 - 4, base - 12, x1 - x0 + 8, 12);
    c.fillStyle = 'rgba(0,0,0,0.08)'; for (let x = x0 + 30; x < x1; x += 70) c.fillRect(x, glass1 + 10, 40, base - glass1 - 26);
    c.fillStyle = shade(P.caseDk, -0.2); c.fillRect(x1 + 4, top, 10, base - top);
  }
  function drawCounterTop(c, t) { // register, plate stack, the box being packed, string from the spool
    const P = K.P, top = CASE.top;
    c.fillStyle = L('#3a3a42'); c.fillRect(REG_X - 22, top - 34, 48, 34); c.fillStyle = L('#5a5a64'); K.poly(c, [REG_X - 18, top - 34, REG_X + 22, top - 34, REG_X + 16, top - 48, REG_X - 12, top - 48]); c.fill();
    c.fillStyle = L('#8ad0a0'); c.fillRect(REG_X - 8, top - 46, 18, 7);
    if (reg.open > 0.02) { c.fillStyle = L('#2a2a30'); c.fillRect(REG_X - 24, top - 8 + reg.open * 6, 52, 8); c.fillStyle = L('#7aa86a'); c.fillRect(REG_X - 18, top - 8 + reg.open * 6, 12, 4); }
    if (reg.ding > 0) { c.strokeStyle = rgba('#e8c050', reg.ding); c.lineWidth = 2; c.beginPath(); c.arc(REG_X + 2, top - 56, 10 + (1 - reg.ding) * 16, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
    for (let i = 0; i < 4; i++) { c.fillStyle = L('#f6f2ea'); ellipse(c, PLATE_X, top - 2 - i * 3, 15, 3.5); c.fill(); }
    c.fillStyle = P.box; for (let i = 0; i < 3; i++) { c.fillRect(40, top - 6 - i * 5, 50, 4); } // flat-packed boxes
    if (box) drawBox(c, box.x, top + 1, 1, box);
    if (stringLine) { c.strokeStyle = P.str; c.lineWidth = 1.2; c.beginPath(); c.moveTo(stringLine.x, stringLine.y); c.lineTo(stringLine.hand.x, stringLine.hand.y); c.stroke(); }
  }
  function drawTable(c, t, front) {
    const P = K.P, x = TABLE.x, y = TABLE.top;
    if (!front) { // chairs (bentwood) behind the sitters
      for (const st of TABLE.seats) { const cx = st.x - st.f * 8; c.strokeStyle = L('#3a2418'); c.lineWidth = 4; c.beginPath(); c.moveTo(cx - st.f * 18, 700); c.lineTo(cx - st.f * 14, 604); c.quadraticCurveTo(cx - st.f * 22, 520, cx - st.f * 10, 520); c.stroke(); c.beginPath(); c.moveTo(cx + st.f * 16, 700); c.lineTo(cx + st.f * 12, 606); c.stroke(); c.fillStyle = L('#4a2e1e'); ellipse(c, cx, 604, 24, 5); c.fill(); }
      return;
    }
    c.fillStyle = L('#2a2a2e'); c.fillRect(x - 4, y + 6, 8, 128); ellipse(c, x, 700, 30, 6); c.fill();
    c.fillStyle = L('#f2eee6'); ellipse(c, x, y, 66, 13); c.fill(); c.fillStyle = L('#d8d2c8'); c.fillRect(x - 66, y, 132, 6); ellipse(c, x, y + 6, 66, 13); c.fill(); c.fillStyle = L('#f6f4ee'); ellipse(c, x, y, 66, 13); c.fill();
    c.strokeStyle = 'rgba(160,150,140,0.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x - 40, y - 6); c.quadraticCurveTo(x - 10, y + 2, x + 30, y - 4); c.stroke(); // marble vein
    for (const q of tableItems) { if (q.lifted) { if (q.k === 'plate') drawPlate(c, q.x, y - 2, 0.95, null, 0); continue; } if (q.k === 'plate') drawPlate(c, q.x, y - 2, 0.95, q.kind, q.frac); else drawCup(c, q.x, y - 1, 0.95, q.lvl); }
  }
  function drawLamps(c, t) {
    const P = K.P;
    for (const [x, y] of [[180, 214], [400, 226], [1104, 214], [640, 92]]) { const sw = Math.sin(t * 0.7 + x) * 1.5; c.strokeStyle = P.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, 74); c.lineTo(x + sw, y - 16); c.stroke();
      if (y < 120) continue;
      c.fillStyle = shade(P.trim, -0.2); K.poly(c, [x + sw - 6, y - 18, x + sw + 6, y - 18, x + sw + 16, y - 4, x + sw - 16, y - 4]); c.fill();
      c.fillStyle = mix(P.lamp, '#ffffff', 0.4); ellipse(c, x + sw, y + 2, 14, 10); c.fill(); K.glow(c, x + sw, y + 4, 110, P.glow, P.glowA); }
  }
  function draw(c, t, Kk) {
    const P = K.P;
    drawRoom(c, t); drawWindow(c, t); drawDoor(c);
    drawCase(c, t);
    const staff = K.actors.filter((a) => a.layer === 'staff');
    for (const a of staff) { K.drawBody(c, a, false); if (!a.armsFront) K.drawArms(c, a); }
    drawCaseFront(c, t); drawCounterTop(c, t);
    for (const a of staff) if (a.armsFront) K.drawArms(c, a);
    drawTable(c, t, false);
    const sitters = K.actors.filter((a) => a.layer === 'table');
    for (const a of sitters) K.drawBody(c, a, false);
    drawTable(c, t, true);
    for (const a of sitters) K.drawArms(c, a);
    // floor (checker in perspective)
    c.fillStyle = P.floor; c.fillRect(-60, 650, 1400, 80 + K.extraB);
    for (let r = 0; r < 4; r++) for (let q = -2; q < 34; q++) if ((q + r) % 2) { const y0 = 650 + r * 18, y1 = y0 + 18; const xa = q * 44 + (q * 44 - 640) * r * 0.06, xb = (q + 1) * 44 + ((q + 1) * 44 - 640) * r * 0.06; const xc = (q + 1) * 44 + ((q + 1) * 44 - 640) * (r + 1) * 0.06, xd = q * 44 + (q * 44 - 640) * (r + 1) * 0.06; c.fillStyle = P.floor2; K.poly(c, [xa, y0, xb, y0, xc, y1, xd, y1]); c.fill(); }
    c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(-60, 650, 1400, 5);
    const front = K.actors.filter((a) => a.layer === 'front').sort((a, b) => a.floorY - b.floorY);
    for (const a of front) { c.fillStyle = 'rgba(0,0,0,0.12)'; ellipse(c, a.hx, a.floorY + 2, 30 * a.sc, 5); c.fill(); K.drawBody(c, a, true); }
    drawLamps(c, t);
    K.shafts(c, [[WIN.x0 + 20, WIN.x1 - 40, WIN.x0 - 260, WIN.x1 - 300, WIN.y0, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  function effect(c, e, u) { if (e.k === 'crumbs') { c.fillStyle = rgba(L('#d8a050'), 1 - u); for (let i = 0; i < 5; i++) c.fillRect(e.x + (i - 2) * 4, e.y + u * 30 + (i % 2) * 4, 2.4, 2.4); return true; } return false; }
  return GeoKit.stage({ id: 'mikes', pal: MikesPal, startHour: 8, span: 15.5, build, sim, draw, onClear, onGone, effect, font: '700 15px "Helvetica Neue", Arial, sans-serif',
    debug: () => ({ orders: orders.length, trays: TRAYS.map((t) => t.n).join(','), table: tableItems.length, sign: signOpen, cust: customers().map((a) => a.type + ':' + a.phase).join(' ') }) });
}
registerStage('mikes', makeGeoMikesStage);
