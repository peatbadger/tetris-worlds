/* ================= World 3 · The Speakeasy — GEOMETRIC edition (1920s, Art Deco planes) =================
   A hidden door with a peephole (password!), a mahogany bar with a back bar of real bottles and a mirror, a bartender
   who really pours, shakes, strains and garnishes into glasses that fill, two stools, a street-level grate window
   (legs and wheels passing, rain / snow, dawn light), and a small stage to the side: piano / upright bass / clarinet trio.
   The singer only steps up for her spotlight moment (lights dim, a cone of light, applause). Rare surprise: a RAID —
   the red bulb flashes, the back bar flips to books, drinks vanish, the band plays a hymn… then "All clear!".
   Clock: 19:00 (setting up) -> night -> smoky late hours -> cold dawn (chairs up, band packed). */
const SpeakPal = GeoKit.palette({
  early: { wall: '#1f4a46', wall2: '#2a5c56', wallDk: '#143430', deco: '#d8a648', deco2: '#a8782a', wood: '#6a2e1a', woodDk: '#3e180c', woodHi: '#8e4426', brass: '#e0b050', mirror: '#4a6a62', mirror2: '#6a8a80', curtain: '#8a1a24', curtain2: '#6a1018', stage: '#4a2414', floor: '#2e1a12', floor2: '#3a2216', sky0: '#e88a5a', sky1: '#f6c88a', street: '#6a5a58', bulb: '#ffd890', glow: '#ffb860', glowA: 0.28, spot: '#fff2d0', amb: '#2a1a10', ambK: 0.06, shaft: '#ffcf90', shaftA: 0.12, haze: '#c89060', hazeA: 0.04,
    skin: '#e0a070', bubble: '#fbf0dc', ink: '#24161a', navy: '#22304a', coral: '#b8343a', mustard: '#d0962a', teal: '#2a6a62', cream: '#ecd8b4', olive: '#5a5a2a', plum: '#6a2a4a', grey: '#8a8078', brown: '#5a3420', white: '#f4e8d4', dark: '#1a1416', hairGrey: '#c8b8a0' },
  night: { wall: '#123a38', wall2: '#1a4a46', wallDk: '#0a2422', deco: '#e0b050', deco2: '#a8782a', wood: '#5a2414', woodDk: '#2e1008', woodHi: '#7e3a20', brass: '#f0c060', mirror: '#2e4a44', mirror2: '#4a6a60', curtain: '#7a1220', curtain2: '#560a14', stage: '#3a1a0e', floor: '#22120c', floor2: '#2e1a10', sky0: '#0a1430', sky1: '#1a2848', street: '#2a2a34', bulb: '#ffd080', glow: '#ffa850', glowA: 0.42, spot: '#fff0c8', amb: '#140c20', ambK: 0.12, shaft: '#ffc070', shaftA: 0.05, haze: '#a07050', hazeA: 0.07,
    skin: '#d49060', bubble: '#f8e8d0', ink: '#1e1014', navy: '#1a2440', coral: '#a82a32', mustard: '#c88a24', teal: '#1e5a54', cream: '#e4cca4', olive: '#4a4a22', plum: '#5a2040', grey: '#7a7068', brown: '#4a2a18', white: '#eedcc4', dark: '#140e10', hairGrey: '#b8a890' },
  late: { wall: '#2a1a34', wall2: '#3a2244', wallDk: '#180e22', deco: '#c8904a', deco2: '#8a5a2a', wood: '#4a1a1a', woodDk: '#260a0c', woodHi: '#6a2a26', brass: '#d8a050', mirror: '#3a2a44', mirror2: '#5a4060', curtain: '#6a1028', curtain2: '#4a0818', stage: '#2e1210', floor: '#1e0e10', floor2: '#2a1414', sky0: '#060a1e', sky1: '#141a34', street: '#1e1e28', bulb: '#ff9a6a', glow: '#ff7a5a', glowA: 0.4, spot: '#ffd8c0', amb: '#1e0a28', ambK: 0.18, shaft: '#ff9070', shaftA: 0.03, haze: '#c06a8a', hazeA: 0.12,
    skin: '#b87058', bubble: '#f4dcd8', ink: '#1e0c16', navy: '#1c1c3a', coral: '#962a3a', mustard: '#a8702a', teal: '#1e4a54', cream: '#d8b4a4', olive: '#3e3a26', plum: '#5a1c44', grey: '#6a5a64', brown: '#3e2018', white: '#e4ccc4', dark: '#120a10', hairGrey: '#a89090' },
  dawn: { wall: '#3a5a64', wall2: '#4a6a72', wallDk: '#2a444c', deco: '#b8a078', deco2: '#8a7858', wood: '#5a3a30', woodDk: '#3a2420', woodHi: '#7a5444', brass: '#c8b088', mirror: '#7a9aa4', mirror2: '#a8c4cc', curtain: '#6a3040', curtain2: '#4a2030', stage: '#4a3430', floor: '#3a2e2c', floor2: '#463836', sky0: '#a8c4dc', sky1: '#f0e0d0', street: '#8a8e96', bulb: '#e8d8b8', glow: '#e8d0a0', glowA: 0.1, spot: '#f0f0f0', amb: '#506880', ambK: 0.12, shaft: '#e8f0ff', shaftA: 0.22, haze: '#c0d0e0', hazeA: 0.05,
    skin: '#c89a80', bubble: '#f4f4f0', ink: '#24282e', navy: '#2a3a54', coral: '#984a4a', mustard: '#b0904a', teal: '#3a6a6a', cream: '#dcd0bc', olive: '#5a5c40', plum: '#5a3a50', grey: '#8a8c90', brown: '#5a4034', white: '#eceae4', dark: '#1e2024', hairGrey: '#c0bcb4' },
  snow: { sky0: '#8a9ab4', sky1: '#c8d0dc', street: '#d8dce4' },
}, [[18, 'early'], [20.5, 'night'], [25, 'night'], [26.5, 'late'], [28.5, 'late'], [30, 'dawn'], [34, 'dawn'], [42, 'early']], { nightKey: 'night', label: (h) => { h = ((h % 24) + 24) % 24; return h >= 18 && h < 21 ? 'Doors open' : h >= 21 || h < 1 ? 'Night' : h < 4 ? 'Small hours' : 'Dawn'; } });

function makeGeoSpeakeasyStage() {
  const BAR = { x0: 92, x1: 470, top: 488, base: 652 };
  const BT_FLOOR = 612, BT_SC = 0.86, FL = 712, SC = 0.84;
  const STOOLS = [{ x: 150, occ: null }, { x: 262, occ: null }];
  const STANDS = [{ x: 372, occ: null }];
  const STAGE = { x0: 950, top: 616 };
  const MIC_X = 972;
  const WINDOW = { x0: 104, y0: 92, x1: 300, y1: 150 };
  const SHELVES = [250, 318, 386];
  const DRINKS = { martini: ['Martini, dry', 'gin'], oldfash: ['Old Fashioned', 'rye'], champagne: ['Champagne!', 'champ'], negroni: ['Negroni', 'gin'], mojito: ['Mojito', 'rum'], wine: ['Glass of red', 'wine'], beer: ['A cold one', 'beer'] };
  const SHAKEN = { martini: 1, mojito: 1, negroni: 0, oldfash: 0 };
  const LQ = { beer: '#f2a62a', oldfash: '#b0501a', negroni: '#e2361e', wine: '#7a1434', mojito: '#a8e690', martini: '#d6eaf0', champagne: '#f4e090' };
  let K, eddie, moe, pianist, bassist, clar, singer, glasses = [], door = { open: 0, slot: 0, knock: 0 }, voice = null, spot = { on: 0, t: 0, active: false }, raid = { on: 0, t: -1 }, flip = 0, nextArrive = 2, nextSpot = 40, bottles = [], pour = null, cork = null;
  const rnd0 = mulberry32(1920);
  for (let s = 0; s < 3; s++) { let x = 118; while (x < 450) { const w = 14 + rnd0() * 10; bottles.push({ s, x, w, h: 38 + rnd0() * 22, col: pick(['#3a6a2a', '#7a3a10', '#c8a050', '#2a4a6a', '#e8e0c8', '#6a1a1a', '#a8c0a0']), lab: rnd0() < 0.7, out: false }); x += w + 6 + rnd0() * 6; } }
  const L = (h) => K.L(h), B = GeoKit.body;
  const TYPES = {
    flapper: { body: B({ T: 230, hw: 52, headR: 28, pattern: 'dress', top: 'plum', top2: 'mustard', hairStyle: 'bob', hat: 'feather', hatCol: 'dark', bandCol: 'cream', skirt: 'plum', tights: 0 }), vary: { top: ['plum', 'teal', 'coral', 'dark'], hat: ['feather', 'cloche'] }, drinks: ['champagne', 'martini', 'mojito'], words: ['The bee\'s knees!', 'Swell!', 'icon:note'] },
    gent: { body: B({ pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', pants: 'grey', hat: 'fedora', hatCol: 'dark', bandCol: 'coral' }), vary: { top: ['grey', 'navy', 'brown'], tie: ['coral', 'mustard', 'teal'] }, drinks: ['oldfash', 'martini', 'negroni'], words: ['Make it a double', 'Copacetic'] },
    reporter: { body: B({ pattern: 'vest', top: 'brown', shirt: 'cream', tie: 'navy', pants: 'brown', hat: 'fedora', hatCol: 'brown', bandCol: 'cream', shortSleeve: 0 }), drinks: ['beer', 'oldfash'], words: ['Off the record…', 'What a scoop'] },
    heiress: { body: B({ T: 232, hw: 54, headR: 28, pattern: 'dress', top: 'cream', top2: 'deco', hairStyle: 'bun', hat: 'cloche', hatCol: 'teal', bandCol: 'cream', skirt: 'cream' }), vary: { top: ['cream', 'teal', 'coral'] }, drinks: ['champagne', 'wine'], words: ['Darling!', 'Simply divine'] },
    sailor: { body: B({ T: 244, hw: 64, pattern: 'stripe', top: 'navy', top2: 'white', pants: 'navy', hat: 'band', hatCol: 'white', shortSleeve: 1 }), drinks: ['beer', 'mojito'], words: ['Shore leave!', 'Another!'] },
    cop: { body: B({ T: 246, hw: 66, torso: 'round', pattern: 'suit', top: 'navy', shirt: 'navy', tie: 'dark', pants: 'navy', hat: 'cap', hatCol: 'navy' }), drinks: ['wine', 'beer'], words: ['I saw nothing', 'Just one'] },
  };
  const PARTIES = [{ m: ['flapper'], w: [2, 3, 2, 0] }, { m: ['gent'], w: [3, 3, 2, 1] }, { m: ['reporter'], w: [1, 2, 3, 1] }, { m: ['heiress'], w: [1, 2, 1, 0] }, { m: ['sailor'], w: [1, 2, 3, 0.5] }, { m: ['cop'], w: [0, 0.6, 1, 0.5] }, { m: ['gent', 'flapper'], w: [1, 3, 2, 0] }];
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h >= 18 && h < 21 ? 0 : h >= 21 || h < 1 ? 1 : h < 4 ? 2 : 3; };
  const patrons = () => K.actors.filter((a) => a.cust);
  const cool = (k) => K.weatherNow === k;
  /* ---------- glassware ---------- */
  function drawGlass(c, x, y, s, g, tilt = 0) { // y = base on the bar
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s);
    const lv = clamp(g.level, 0, 1), lq = L(LQ[g.kind] || '#c8a050'), glass = 'rgba(230,245,250,0.45)', rim = 'rgba(255,255,255,0.8)';
    const fillPoly = (pts, topY, botY) => { if (lv <= 0.01) return; c.save(); K.poly(c, pts); c.clip(); c.fillStyle = lq; c.fillRect(-20, lerp(botY, topY, lv), 40, 60); c.restore(); };
    switch (g.kind) {
      case 'martini': { c.strokeStyle = glass; c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -14); c.stroke(); c.fillStyle = glass; ellipse(c, 0, 0, 7, 1.8); c.fill(); const cone = [-11, -27, 11, -27, 0, -14]; c.fillStyle = 'rgba(230,245,250,0.25)'; K.poly(c, cone); c.fill(); fillPoly(cone, -27, -14); c.strokeStyle = rim; c.lineWidth = 1; c.beginPath(); c.moveTo(-11, -27); c.lineTo(11, -27); c.stroke(); if (g.garnish && lv > 0.3) { c.fillStyle = L('#6a8a2a'); c.beginPath(); c.arc(2, -22, 2.8, 0, TAU); c.fill(); c.strokeStyle = L('#8a6a3a'); c.beginPath(); c.moveTo(-4, -30); c.lineTo(5, -19); c.stroke(); } break; }
      case 'champagne': { c.strokeStyle = glass; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -12); c.stroke(); c.fillStyle = glass; ellipse(c, 0, 0, 6, 1.6); c.fill(); const bowl = [-11, -20, 11, -20, 8, -13, -8, -13]; c.fillStyle = 'rgba(230,245,250,0.25)'; K.poly(c, bowl); c.fill(); fillPoly(bowl, -20, -13); c.strokeStyle = rim; c.lineWidth = 1; c.beginPath(); c.moveTo(-11, -20); c.lineTo(11, -20); c.stroke(); if (lv > 0.2) { c.fillStyle = 'rgba(255,255,240,0.9)'; for (let i = 0; i < 3; i++) c.fillRect(-4 + i * 4, -14 - ((K.t * 12 + i * 3) % 6), 1, 1); } break; }
      case 'wine': { c.strokeStyle = glass; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -12); c.stroke(); c.fillStyle = glass; ellipse(c, 0, 0, 6, 1.6); c.fill(); const bowl = [-8, -30, 8, -30, 9, -20, 5, -12, -5, -12, -9, -20]; c.fillStyle = 'rgba(230,245,250,0.25)'; K.poly(c, bowl); c.fill(); fillPoly(bowl, -24, -12); c.strokeStyle = rim; c.lineWidth = 1; c.beginPath(); c.moveTo(-8, -30); c.lineTo(8, -30); c.stroke(); break; }
      case 'beer': { const mug = [-8, -30, 8, -30, 8, 0, -8, 0]; c.fillStyle = 'rgba(230,245,250,0.3)'; K.poly(c, mug); c.fill(); fillPoly(mug, -24, 0); if (lv > 0.05) { c.fillStyle = '#fbf4e2'; c.fillRect(-8, -24 * lv - 6 + 24 - 24, 16, 0); c.fillRect(-8, lerp(0, -24, lv) - 6, 16, 6); } c.strokeStyle = 'rgba(230,245,250,0.6)'; c.lineWidth = 2.4; c.beginPath(); c.arc(10, -16, 6, -1.4, 1.4); c.stroke(); c.strokeStyle = rim; c.lineWidth = 1; c.strokeRect(-8, -30, 16, 30); break; }
      default: { const tumbler = [-8, -20, 8, -20, 7, 0, -7, 0]; c.fillStyle = 'rgba(230,245,250,0.3)'; K.poly(c, tumbler); c.fill(); fillPoly(tumbler, -17, 0); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(-7, -2, 14, 2); if (lv > 0.2 && (g.kind === 'oldfash' || g.kind === 'negroni')) { c.fillStyle = 'rgba(255,240,220,0.55)'; c.fillRect(-5, -15, 9, 9); } if (g.kind === 'mojito' && lv > 0.2) { c.fillStyle = L('#2f8a3a'); ellipse(c, -2, -16, 4, 2, -0.5); c.fill(); c.fillStyle = L('#7ac83a'); c.beginPath(); c.arc(5, -19, 3.5, Math.PI, TAU); c.fill(); } if (g.garnish && g.kind === 'oldfash' && lv > 0.2) { c.fillStyle = L('#f08a2a'); c.fillRect(-7, -22, 9, 2.4); } if (g.garnish && g.kind === 'negroni' && lv > 0.2) { c.fillStyle = L('#ff9a2a'); c.beginPath(); c.arc(6, -20, 4, Math.PI, TAU); c.fill(); } c.strokeStyle = rim; c.lineWidth = 1; c.beginPath(); c.moveTo(-8, -20); c.lineTo(8, -20); c.stroke(); }
    }
    c.restore();
  }
  const H = {
    glass: (g) => ({ g, draw(c, x, y, s, a) { drawGlass(c, x, y + 14 * s, s, g, a ? -(a.cupTilt || 0) * a.f * 0.9 : 0); } }),
    bottle: (b) => ({ draw(c, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(a.potTilt ? -a.f * a.potTilt * 1.8 : 0); c.fillStyle = L(b.col); roundRect(c, -b.w * 0.4 * s, -10 * s, b.w * 0.8 * s, 34 * s, 3 * s); c.fill(); c.fillRect(-2.4 * s, -22 * s, 4.8 * s, 13 * s); if (b.lab) { c.fillStyle = L('#ece2c8'); c.fillRect(-b.w * 0.35 * s, 2 * s, b.w * 0.7 * s, 10 * s); } c.restore(); } }),
    shaker: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#d0d6dc'); K.poly(c, [x - 6 * s, y - 20 * s, x + 6 * s, y - 20 * s, x + 7.5 * s, y + 10 * s, x - 7.5 * s, y + 10 * s]); c.fill(); c.fillStyle = L('#a0a8b0'); c.fillRect(x - 6 * s, y - 24 * s, 12 * s, 5 * s); c.fillStyle = 'rgba(255,255,255,0.5)'; c.fillRect(x - 4.5 * s, y - 18 * s, 2.5 * s, 26 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 10 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    clar: () => ({ draw(c, x, y, s, a) { } }),
  };
  /* ---------- cast ---------- */
  function mkStaff() {
    eddie = K.mk(B({ T: 240, hw: 60, headR: 30, pattern: 'vest', top: 'dark', shirt: 'white', tie: 'dark', sleeve: 'white', hairStyle: 'short', hairD: 0.02 }), { role: 'bartender', staff: 1, hx: 260, f: 1, floorY: BT_FLOOR, sc: BT_SC, faceDir: 0.6 });
    moe = K.mk(B({ T: 256, hw: 82, headR: 31, torso: 'round', pattern: 'suit', top: 'dark', shirt: 'white', tie: 'dark', pants: 'dark', hat: 'fedora', hatCol: 'dark', bandCol: 'dark' }), { role: 'doorman', staff: 1, hx: 64, f: 1, floorY: FL - 6, sc: SC, faceDir: 0.4, posture: -0.02 });
    pianist = K.mk(B({ T: 236, hw: 60, pattern: 'vest', top: 'navy', shirt: 'cream', tie: 'coral', pants: 'dark', hairStyle: 'short' }), { role: 'pianist', staff: 1, hx: 1206, f: 1, floorY: FL - 10, sc: SC * 0.96, state: 'seated', seatY: STAGE.top - 20, faceDir: 0.9 });
    bassist = K.mk(B({ T: 250, hw: 60, pattern: 'suit', top: 'brown', shirt: 'cream', tie: 'mustard', pants: 'brown', hat: 'fedora', hatCol: 'brown', bandCol: 'dark' }), { role: 'bassist', staff: 1, hx: 1136, f: -1, floorY: STAGE.top - 6, sc: SC * 0.9, faceDir: -0.5 });
    clar = K.mk(B({ T: 238, hw: 58, pattern: 'jacket', top: 'cream', shirt: 'white', pants: 'dark', hairStyle: 'short' }), { role: 'clarinet', staff: 1, hx: 1060, f: -1, floorY: STAGE.top - 8, sc: SC * 0.88, faceDir: -0.6 });
    singer = K.mk(B({ T: 236, hw: 52, headR: 28, pattern: 'dress', top: 'coral', top2: 'deco', hairStyle: 'bob', hairD: -0.02, skirt: 'coral', hat: 'feather', hatCol: 'deco', bandCol: 'cream' }), { role: 'singer', staff: 1, hx: 1120, f: -1, floorY: STAGE.top, sc: SC * 0.98, alpha: 0, offstage: 1 });
    for (const a of [pianist, bassist, clar]) { a.pose = bandPose; a.layer = 'stage'; }
    singer.layer = 'stage'; eddie.layer = 'bar'; moe.layer = 'front';
    eddie.think = eddieThink; moe.think = moeThink; K.settle(pianist);
  }
  const bandOn = () => { const p = per(); return p === 1 || p === 2 || (p === 0 && ((K.hour % 24) + 24) % 24 > 19.3); };
  function bandPose(a) {
    K.basePose(a); const t = K.t, R = a.R, T = R.T, on = bandOn(), hymn = raid.on > 0;
    const sp = hymn ? 2 : (per() === 2 ? 4.5 : 6.5);
    if (a.role === 'pianist') { const kx = 1250, ky = 552; a.leanT = 0.12; if (on) { a.tgN = [kx + 8 + Math.sin(t * sp) * 10, ky + Math.abs(Math.sin(t * sp * 2)) * -5]; a.tgF = [kx - 16 + Math.sin(t * sp * 0.5 + 1) * 8, ky + Math.abs(Math.cos(t * sp * 1.5)) * -5]; a.bob = Math.sin(t * sp) * 1.2; } else { a.tgN = [a.hx + 20, a.hy - 30]; a.tgF = [a.hx + 10, a.hy - 28]; } a.lxT = 0.9; }
    if (a.role === 'bassist') { const nx = a.hx - 22, ny = a.hy - T * 0.72; if (on) { a.tgF = [nx + 2, ny + Math.sin(t * 1.3) * 6]; a.tgN = [a.hx - 18 + Math.sin(t * sp * 1.6) * 5, a.hy - T * 0.18]; a.bob = Math.abs(Math.sin(t * sp * 0.5)) * -2; } else { a.tgF = [nx + 2, ny + 10]; a.tgN = [a.hx - 6, a.hy - 10]; } a.lxT = -0.4; }
    if (a.role === 'clarinet') { if (on) { const mx = R.cx - 6, my = R.cy + R.R * 0.6; a.tgN = [mx - 14 + Math.sin(t * sp * 2) * 1.5, my + 26]; a.tgF = [mx - 10, my + 10]; a.leanT = -0.05 + Math.sin(t * 1.8) * 0.06; a.bob = Math.sin(t * sp * 0.5) * 2; } else { a.tgN = [a.hx - 10, a.hy - 30]; a.tgF = [a.hx - 2, a.hy - 30]; } a.lxT = -0.7; }
  }
  function drawBass(c) {
    const P = K.P, s = SC * 0.96;
      const b = bassist, x = b.hx - 22, y = STAGE.top - 8; c.save(); c.translate(x, y); c.rotate(-0.12); c.scale(1.3, 1.3);
      c.fillStyle = L('#b0642a'); c.beginPath(); c.ellipse(0, -36 * s, 24 * s, 34 * s, 0, 0, TAU); c.fill(); c.beginPath(); c.ellipse(0, -84 * s, 18 * s, 22 * s, 0, 0, TAU); c.fill();
      c.fillStyle = L('#3a1a08'); c.fillRect(-4 * s, -196 * s, 8 * s, 156 * s); c.fillStyle = L('#2a1408'); c.fillRect(-6 * s, -64 * s, 12 * s, 4 * s); c.strokeStyle = 'rgba(255,240,200,0.5)'; c.lineWidth = 0.8; c.beginPath(); for (let i = -1; i <= 1; i++) { c.moveTo(i * 1.6 * s, -186 * s); c.lineTo(i * 3 * s, -40 * s); } c.stroke();
      c.fillStyle = L('#1a0a04'); c.beginPath(); c.arc(-8 * s, -50 * s, 2 * s, 0, TAU); c.fill(); c.beginPath(); c.arc(8 * s, -50 * s, 2 * s, 0, TAU); c.fill(); c.restore();
  }
  function drawInstruments(c, front) {
    const P = K.P, s = SC * 0.96;
    if (!front) { // bass behind the bassist's near arm; piano
      // upright piano against the right wall
      c.fillStyle = L('#2a1410'); c.fillRect(1228, 456, 110, 164); c.fillStyle = L('#3e2018'); c.fillRect(1228, 456, 110, 10); c.fillStyle = L('#f4ecdc'); c.fillRect(1228, 548, 110, 10); c.fillStyle = L('#1a0e0a'); for (let i = 0; i < 14; i++) if (i % 7 !== 2 && i % 7 !== 6) c.fillRect(1232 + i * 7.6, 548, 4, 6);
      c.fillStyle = 'rgba(255,255,255,0.06)'; c.fillRect(1238, 470, 30, 70); c.fillStyle = L(P.brass); c.beginPath(); c.arc(1292, 446, 6, 0, TAU); c.fill(); // candle holder
      c.fillStyle = L('#f4e8d0'); c.fillRect(1289, 432, 6, 14); K.glow(c, 1292, 428, 30, P.bulb, 0.5); c.fillStyle = '#ffd890'; ellipse(c, 1292, 428, 2.5, 4); c.fill();
    } else { // clarinet in the clarinettist's hands
      const a = clar; if (!a.R) return; const mx = a.R.cx - 6, my = a.R.cy + a.R.R * 0.5; c.strokeStyle = L('#1a1414'); c.lineWidth = 4 * s; c.beginPath(); c.moveTo(mx, my); c.lineTo(a.hN.x - 2, a.hN.y + 14); c.stroke(); c.fillStyle = L('#1a1414'); ellipse(c, a.hN.x - 2, a.hN.y + 16, 5 * s, 3 * s); c.fill(); c.fillStyle = L(P.brass); c.fillRect(lerp(mx, a.hN.x, 0.5) - 2, lerp(my, a.hN.y, 0.5), 4, 2);
    }
  }
  /* ---------- the bartender ---------- */
  const glassX = (spot) => spot.x + 44;
  function eddieThink(a) {
    if (raid.on) return K.start(a, 'hide', [K.ph(1.5, (s) => { s.tgN = [s.hx + 14, BAR.top + 20]; s.tgF = [s.hx - 4, BAR.top + 20]; s.leanT = 0.2; })]);
    const want = patrons().find((p) => p.wants && !p.wants.taken);
    if (want) { want.wants.taken = true; return makeDrink(a, want); }
    const empty = glasses.find((g) => g.level <= 0.02 && !g.held && g.done);
    if (empty) return collect(a, empty);
    const h = ((K.hour % 24) + 24) % 24;
    if (per() === 3 && K.cooled(a, 'count', 15)) return K.start(a, 'count', [K.ph(0, (s) => { s.walkTo = 420; }, { until: (s) => !s.walking }), K.ph(3, (s, u, t) => { s.tgN = [s.hx + 16, BAR.top - 10 + Math.sin(t * 9) * 2]; s.tgF = [s.hx + 4, BAR.top - 6]; s.leanT = 0.15; })]);
    const r = Math.random();
    if (r < 0.45) return K.start(a, 'polish', [K.ph(0, (s) => { s.walkTo = rand(200, 330); }, { until: (s) => !s.walking }), K.ph(rand(3, 5), (s, u, t) => { s.hold.F = s.hold.F || H.glass({ kind: pick(['martini', 'champagne', 'oldfash']), level: 0 }); s.hold.N = H.cloth(); s.tgF = [s.hx + 18, s.hy - 70]; s.tgN = [s.hx + 18 + Math.cos(t * 7) * 6, s.hy - 70 + Math.sin(t * 7) * 6]; s.lxT = 0.3; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; } })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; } });
    if (r < 0.65) { const p = pick(patrons().filter((q) => q.state === 'seated') || []); if (p) return K.start(a, 'lean', [K.ph(0, (s) => { s.walkTo = clamp(p.hx + 40, 120, 440); }, { until: (s) => !s.walking }), K.ph(rand(2.5, 4), (s) => { s.tgN = [s.hx + 10, BAR.top - 4]; s.tgF = [s.hx - 10, BAR.top - 4]; s.leanT = 0.22; s.look = { x: () => p.hx, until: K.simT + 0.3 }; }, { enter: () => { K.say(a, pick(['What\'ll it be?', 'Keep it quiet, friend', 'Another round?', 'On the house']), 1.6); K.after(1.4, () => K.say(p, pick(p.T0.words), 1.4)); } })]); }
    return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.lxT = 0.5; s.tgN = [s.hx + 14, BAR.top - 6]; s.tgF = [s.hx - 2, BAR.top - 6]; s.leanT = 0.1; })]);
  }
  function makeDrink(a, p) {
    const kind = p.wants.kind, gx = glassX(p.spot), g = { kind, level: 0, x: gx, owner: p, garnish: false }, bt = pick(bottles.filter((b) => b.s === (kind === 'wine' || kind === 'champagne' ? 2 : kind === 'beer' ? 2 : rnd0() < 0.5 ? 0 : 1)));
    const shaken = SHAKEN[kind];
    const ph = [K.ph(0.5, null, { enter: () => K.say(a, pick(['Coming up', 'One ' + DRINKS[kind][0].toLowerCase(), 'You got it']), 1.3) }),
      K.ph(0, (s) => { s.walkTo = gx - 18; }, { until: (s) => !s.walking, max: 8 }),
      K.ph(0.5, (s) => { s.tgN = [gx, BAR.top + 26]; s.leanT = 0.25; }, { exit: (s) => { s.hold.N = H.glass(g); } }), // glass from the rack under the bar
      K.ph(0.4, (s) => { s.tgN = [gx, BAR.top - 18]; s.leanT = 0.05; }, { exit: (s) => { s.hold.N = null; glasses.push(g); } }),
      K.ph(0, (s) => { s.walkTo = bt.x + bt.w / 2; s.lxT = -0.8; }, { until: (s) => !s.walking, max: 8 }),
      K.ph(0.55, (s) => { s.lxT = -0.9; s.tgN = [bt.x + bt.w / 2, SHELVES[bt.s] - 20]; s.tgF = [s.hx, s.hy - 60]; }, { exit: (s) => { bt.out = true; s.hold.N = H.bottle(bt); s.lxT = 0.6; } })];
    if (shaken) {
      ph.push(K.ph(0, (s) => { s.walkTo = gx - 30; }, { until: (s) => !s.walking, max: 8 }),
        K.ph(0.3, (s) => { s.tgF = [s.hx + 6, BAR.top - 30]; }, { exit: (s) => { s.hold.F = H.shaker(); } }),
        K.ph(0.9, (s, u) => { s.tgF = [s.hx + 6, BAR.top - 34]; s.tgN = [s.hx + 18, BAR.top - 74]; s.potTilt = Math.sin(u * Math.PI) * 0.9; pour = u > 0.15 && u < 0.85 ? { x0: s.hN.x + 16 * s.f, y0: s.hN.y - 8, x1: s.hF.x, y1: s.hF.y - 20, col: bt.col } : null; }, { exit: (s) => { s.potTilt = 0; pour = null; } }),
        K.ph(0.5, (s) => { s.tgN = [bt.x + bt.w / 2, SHELVES[bt.s] - 20]; s.lxT = -0.8; }, { exit: (s) => { s.hold.N = null; bt.out = false; s.lxT = 0.6; } }),
        K.ph(1.3, (s, u, t) => { const sh = Math.sin(t * 26) * 9; s.tgF = [s.hx + 18 + sh * 0.4, s.R.cy + 6 + sh]; s.tgN = [s.hx + 22 + sh * 0.4, s.R.cy - 14 + sh]; s.bob = Math.sin(t * 26) * 1.2; s.farFront = true; }, { enter: () => K.say(a, 'icon:shake', 1.2), exit: (s) => { s.bob = 0; } }),
        K.ph(0.9, (s, u) => { s.tgF = [gx - 10, BAR.top - 44]; s.tgN = [gx - 4, BAR.top - 54]; s.potTilt = 0; s.shakerTilt = u; g.level = clamp((u - 0.2) / 0.7, 0, 1) * 0.92; pour = u > 0.2 && u < 0.92 ? { x0: s.hF.x + 6, y0: s.hF.y - 20, x1: gx, y1: BAR.top - 20, col: LQ[kind] } : null; }, { exit: (s) => { pour = null; s.hold.F = null; s.farFront = false; } }));
    } else {
      ph.push(K.ph(0, (s) => { s.walkTo = gx - 22; }, { until: (s) => !s.walking, max: 8 }));
      if (kind === 'champagne') ph.push(K.ph(0.6, (s, u, t) => { s.tgF = [s.hx + 20, s.hy - 80]; s.tgN = [s.hx + 18, s.hy - 70]; }, { exit: (s) => { cork = { x: s.hN.x + 4, y: s.hN.y - 30, vx: rand(40, 90), vy: -220, t: 0 }; K.say(a, 'icon:pop', 0.8); K.fx('spark', s.hN.x, s.hN.y - 30, { col: '#fff2c0', life: 0.5 }); } }));
      ph.push(K.ph(1.1, (s, u) => { s.tgN = [gx - 6, BAR.top - 48]; s.tgF = [gx - 20, BAR.top - 20]; s.potTilt = Math.sin(clamp(u * 1.2, 0, 1) * Math.PI * 0.5) * 0.9; g.level = clamp((u - 0.15) / 0.75, 0, 1) * 0.9; pour = u > 0.15 && u < 0.9 ? { x0: s.hN.x + 14 * s.f, y0: s.hN.y - 10, x1: gx, y1: BAR.top - 18, col: LQ[kind] } : null; }, { exit: (s) => { s.potTilt = 0; pour = null; } }),
        K.ph(0, (s) => { s.walkTo = bt.x + bt.w / 2; }, { until: (s) => !s.walking, max: 8 }),
        K.ph(0.5, (s) => { s.lxT = -0.9; s.tgN = [bt.x + bt.w / 2, SHELVES[bt.s] - 20]; }, { exit: (s) => { s.hold.N = null; bt.out = false; s.lxT = 0.6; } }),
        K.ph(0, (s) => { s.walkTo = gx - 18; }, { until: (s) => !s.walking, max: 8 }));
    }
    ph.push(K.ph(0.6, (s) => { s.tgN = [gx + 2, BAR.top - 36]; s.leanT = 0.15; }, { exit: () => { g.garnish = true; K.fx('spark', gx, BAR.top - 30, { life: 0.4 }); } }), // garnish
      K.ph(0.5, (s) => { s.tgN = [gx + 6, BAR.top - 16]; s.leanT = 0.22; }, { enter: () => K.say(a, pick(['There you are', 'Enjoy', 'Bottoms up', 'Mum\'s the word']), 1.3), exit: () => { g.done = true; p.wants = null; p.served = true; } }));
    K.start(a, 'make', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; pour = null; s.potTilt = 0; bt.out = false; if (!g.done) { glasses = glasses.filter((q) => q !== g); if (p.wants) p.wants.taken = false; } } });
  }
  function collect(a, g) {
    K.start(a, 'collect', [K.ph(0, (s) => { s.walkTo = g.x - 16; }, { until: (s) => !s.walking, max: 8 }), K.ph(0.5, (s) => { s.tgN = [g.x, BAR.top - 16]; s.leanT = 0.2; }, { exit: (s) => { glasses = glasses.filter((q) => q !== g); s.hold.N = H.glass(g); } }), K.ph(0.5, (s) => { s.tgN = [s.hx + 10, BAR.top + 24]; s.leanT = 0.25; }, { exit: (s) => { s.hold.N = null; } })]);
  }
  /* ---------- door: knock, peephole, password ---------- */
  function moeThink(a) {
    if (raid.on) return K.start(a, 'guard', [K.ph(1, (s) => { s.lxT = -1; s.tgN = [30, 420]; })]);
    const r = Math.random();
    if (r < 0.3) return K.start(a, 'arms', [K.ph(rand(3, 6), (s) => { s.tgN = [s.hx + 10, s.hy - 70]; s.tgF = [s.hx - 2, s.hy - 64]; s.lxT = 0.6; })]);
    if (r < 0.45) return K.start(a, 'look', [K.ph(rand(1.5, 3), (s) => { s.look = { x: () => (spot.active ? MIC_X : 300), until: K.simT + 0.3 }; })]);
    return K.start(a, 'idle', [K.ph(rand(2, 4), null)]);
  }
  function arrive() {
    const p = per(), list = PARTIES.filter((q) => q.w[p] > 0); let s = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * s, pt = list[0];
    for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    const free = STOOLS.filter((q) => !q.occ).concat(STANDS.filter((q) => !q.occ)); if (free.length < pt.m.length) return false;
    if (patrons().some((c) => pt.m.includes(c.type))) return false;
    const PW = ['Swordfish', 'Bee\'s knees', 'Giggle water', 'Joe sent me', 'Cat\'s pajamas'];
    door.knock = 1; voice = { bub: null, R: { cx: 26, cy: 330, R: 22 }, alpha: 1, def: {}, f: 1 };
    K.say(voice, 'icon:knock', 1.2);
    K.abort(moe);
    K.start(moe, 'door', [K.ph(0.9, (s) => { s.lxT = -1; s.tgN = [44, 300]; }, { exit: () => { door.slot = 1; K.say(moe, 'Password?', 1.4); } }),
      K.ph(1.6, null, { enter: () => K.after(0.8, () => K.say(voice, pick(PW), 1.4)) }),
      K.ph(1.0, (s, u) => { s.tgN = [44, 420]; door.slot = 1 - u; door.open = u; }, { exit: () => { door.slot = 0; } }),
      K.ph(1.4, (s) => { s.lxT = 0.6; }, { enter: () => { pt.m.forEach((type, j) => { const a = mkPatron(type); const sp = free[j]; sp.occ = a; a.spot = sp; a.delay = j * 0.6; a.walkTo = sp.x - (sp.stool !== false && STOOLS.includes(sp) ? 0 : 0); }); K.say(moe, pick(['Come on in', 'Quick, inside', 'Welcome to the joint']), 1.3); } }),
      K.ph(1.0, (s, u) => { door.open = 1 - u; s.tgN = [44, 420]; })], { onEnd: () => { door.open = 0; door.knock = 0; } });
    return true;
  }
  function mkPatron(type) {
    const T0 = TYPES[type], def = Object.assign({}, T0.body); for (const k in T0.vary || {}) def[k] = pick(T0.vary[k]); def.hw *= 1.1;
    const a = K.mk(def, { type, T0, cust: 1, hx: 20, f: 1, floorY: FL, sc: SC, alpha: 0, fade: 1.6, layer: 'front', speed: rand(0.9, 1.1) });
    if (cool('snow') && Math.random() < 0.7) a.scarf = pick(['coral', 'cream', 'mustard']);
    a.think = patronThink; a.phase = 'enter'; return a;
  }
  function patronThink(a) {
    if (a.phase === 'enter') { if (!a.walking && a.alpha > 0.9 && a.walkTo == null) { if (STOOLS.includes(a.spot)) { K.sitDown(a, a.spot.x, 590, 1); a.tableY = BAR.top - 6; a.faceDir = 0.7; } else { a.faceDir = 0.5; a.f = 1; } a.phase = 'order'; } return; }
    if (a.state === 'sit' || a.state === 'rise') return;
    if (raid.on) { return K.start(a, 'hide', [K.ph(1, (s) => { s.tgN = [s.hx + 6, BAR.top + 30]; s.lxT = -0.5; s.cupTilt = 0; })]); }
    if (spot.active && a.phase !== 'leave') return K.start(a, 'watch', [K.ph(1.2, (s) => { s.look = { x: () => MIC_X, until: K.simT + 0.4 }; s.lxT = 1; })]);
    const g = glasses.find((q) => q.owner === a && q.done);
    if (a.phase === 'order') { a.wants = { kind: pick(a.T0.drinks), taken: false }; a.phase = 'wait'; a.drinks = (a.drinks || 0) + 1; return K.start(a, 'order', [K.ph(1.4, (s, u) => { s.tgN = [s.hx + 30, s.R.cy - 10 * Math.sin(u * Math.PI)]; }, { enter: () => K.say(a, DRINKS[a.wants.kind][0], 1.6) })]); }
    if (a.phase === 'wait') { if (g) { a.phase = 'drink'; return; } return K.start(a, 'wait', [K.ph(rand(1, 2.5), (s, u, t) => { s.look = { x: () => eddie.hx, until: K.simT + 0.3 }; if (Math.random() < 0.01) s.tgN = [s.hx + 34 + Math.sin(t * 8) * 3, BAR.top - 4]; })]); }
    if (a.phase === 'drink') {
      if (!g) { a.phase = a.drinks < randi(2, 3) && per() !== 3 ? 'order' : 'leave'; return; }
      if (g.level <= 0.02) { if (!a.doneAt) a.doneAt = K.simT; if (K.simT - a.doneAt > 3) { a.doneAt = 0; a.phase = a.drinks < 2 && per() !== 3 && Math.random() < 0.6 ? 'order' : 'leave'; } return K.start(a, 'idle', [K.ph(1.5, null)]); }
      const r = Math.random();
      if (r < 0.5) return sip(a, g);
      const mate = patrons().find((q) => q !== a && Math.abs(q.hx - a.hx) < 160 && q.phase !== 'leave');
      if (mate && r < 0.75 && K.cooled(a, 'chat', 6)) { const [l1, l2] = pick([['Swell joint', 'The berries'], ['Heard the Dodgers lost', 'Applesauce!'], ['Who\'s the canary?', 'Ain\'t she grand'], ['Keep it under your hat', 'icon:laugh'], ['icon:heart', 'icon:heart'], ['Cheers!', 'Cheers!']]); K.start(mate, 'listen', [K.ph(2.4, (s) => { s.look = { x: () => a.hx, until: K.simT + 0.3 }; }, { enter: () => K.after(1.1, () => K.say(mate, l2, 1.3)) })]); return K.start(a, 'chat', [K.ph(2.4, (s, u, t) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + 30 + Math.sin(t * 5) * 6, s.R.cy + 50]; }, { enter: () => K.say(a, l1, 1.4) })]); }
      if (r < 0.88) return K.start(a, 'sway', [K.ph(rand(2, 4), (s, u, t) => { s.leanT = Math.sin(t * 3.3) * 0.08; s.headDy = Math.sin(t * 6.6) * 1.5; s.look = { x: () => 1080, until: K.simT + 0.3 }; s.tgN = [s.hx + 30, BAR.top - 4 + Math.sin(t * 6.6) * 2]; })], { onEnd: (s) => { s.headDy = 0; } });
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), null)]);
    }
    if (a.phase === 'leave') {
      if (a.state === 'seated') { K.standUp(a); return; }
      if (a.spot) { a.spot.occ = null; a.spot = null; }
      a.phase = 'out'; a.walkTo = 30; K.say(a, pick(['Toodle-oo!', 'Swell night', 'Goodnight, Eddie']), 1.3); return;
    }
    if (a.phase === 'out') { if (!a.walking) { door.open = 1; a.fade = -1.5; K.after(1.2, () => { door.open = 0; }); } }
  }
  function sip(a, g) {
    const f = a.f;
    return K.start(a, 'sip', [K.ph(0.55, (s) => { s.tgN = [g.x, BAR.top - 16]; }, { exit: (s) => { s.hold.N = H.glass(g); g.held = 1; } }),
      K.ph(0.55, (s) => { s.tgN = [s.R.cx + f * s.R.R * 0.9, s.R.cy + s.R.R * 0.2]; }),
      K.ph(0.9, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.7; s.tilt = -0.12; }, { exit: (s) => { g.level = Math.max(0, g.level - rand(0.18, 0.3)); s.cupTilt = 0; } }),
      K.ph(0.55, (s) => { s.tgN = [g.x, BAR.top - 14]; }, { exit: (s) => { s.hold.N = null; g.held = 0; } })], { onAbort: (s) => { s.hold.N = null; g.held = 0; s.cupTilt = 0; } });
  }
  /* ---------- spotlight & raid ---------- */
  function startSpot() {
    if (spot.active || raid.on || !bandOn()) return; spot.active = true; spot.t = 0;
    const s = singer; s.offstage = 0; s.alpha = 0; s.fade = 2; s.hx = 1124; s.walkTo = null;
    K.start(s, 'sing', [K.ph(0.6, null), K.ph(0, (q) => { q.walkTo = MIC_X + 36; }, { until: (q) => !q.walking, max: 10 }),
      K.ph(0.5, (q) => { q.f = -1; q.faceDir = -0.3; q.tgN = [MIC_X + 4, 462]; }, { enter: () => K.say(s, pick(['Thank you, darlings', 'This one\'s for you']), 1.6) }),
      K.ph(14, (q, u, t) => { q.tgN = [MIC_X + 4, 462]; q.tgF = [q.hx + 30 + Math.sin(t * 1.3) * 26, q.R.cy + Math.sin(t * 0.9) * 30 - 6]; q.leanT = Math.sin(t * 1.6) * 0.07; q.lxT = -0.2 + Math.sin(t * 0.5) * 0.4; if (Math.random() < K.dt * 0.6) K.say(q, 'icon:note', 1.1); }),
      K.ph(1.2, (q, u) => { q.leanT = Math.sin(u * Math.PI) * 0.4; q.tgF = [q.hx + 18, q.hy - 40]; }, { enter: () => { for (const p of patrons()) applaud(p); K.say(moe, 'icon:star', 1); } }),
      K.ph(0, (q) => { q.walkTo = 1124; }, { until: (q) => !q.walking, max: 10 }), K.ph(0.6, (q) => { q.fade = -2; })], { onEnd: (q) => { q.offstage = 1; spot.active = false; nextSpot = rand(70, 110); }, onAbort: (q) => { q.fade = -2; spot.active = false; nextSpot = rand(40, 80); } });
  }
  function applaud(p) { K.after(rand(0, 0.4), () => { if (p.phase === 'leave' || p.phase === 'out' || p.state === 'sit' || p.state === 'rise') return; K.abort(p); K.start(p, 'clap', [K.ph(1.8, (s, u, t) => { const cl = Math.abs(Math.sin(t * 11)) * 10; s.tgN = [s.hx + 26 + cl * 0.6, s.R.cy + 40]; s.tgF = [s.hx + 26 - cl * 0.6, s.R.cy + 42]; s.farFront = true; s.look = { x: () => MIC_X, until: K.simT + 0.3 }; }, { enter: () => { if (Math.random() < 0.5) K.say(p, pick(['Bravo!', 'Encore!', 'icon:heart']), 1.2); } })], { onEnd: (s) => { s.farFront = false; } }); }); }
  function startRaid() {
    if (spot.active || raid.on) return; raid.on = 1; raid.t = 0;
    K.say(moe, 'RAID!', 1.6); K.abort(eddie); for (const p of patrons()) { K.abort(p); for (const g of glasses) if (g.owner === p) g.hidden = 1; }
    K.after(1.6, () => K.say(pianist, 'icon:hymn', 2)); K.after(7, () => { K.say(moe, 'All clear!', 1.6); }); K.after(8, () => { raid.on = 0; for (const g of glasses) g.hidden = 0; K.after(0.6, () => K.say(eddie, pick(['Phew.', 'Where were we?']), 1.4)); });
  }
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    nextArrive -= dt; const p = per(), n = patrons().length, target = [1.5, 3, 2.2, 0.6][p];
    if (nextArrive <= 0 && !door.knock && !raid.on) { if (n < target + 0.4) arrive(); nextArrive = rand(10, 18) * (n >= target ? 1.5 : 1); }
    if (bandOn()) { nextSpot -= dt; if (nextSpot <= 0) startSpot(); }
    spot.on = K.ease(spot.on, spot.active ? 1 : 0, 2, dt);
    if (raid.on) raid.t += dt; flip = K.ease(flip, raid.on ? 1 : 0, 4, dt);
    if (!raid.on && !spot.active && p === 1 && Math.random() < dt / 260) startRaid();
    if (cork) { cork.t += dt; cork.vy += 600 * dt; cork.x += cork.vx * dt; cork.y += cork.vy * dt; if (cork.t > 1.2) cork = null; }
    door.knock = Math.max(0, door.knock - dt * 0.2);
  }
  function onClear(Kk, big, n) {
    for (const p of patrons()) if (!p.act || p.act.name === 'idle' || p.act.name === 'wait') { if (big) applaud(p); else if (Math.random() < 0.6) K.say(p, pick(['Swell!', 'Ritzy!', 'icon:note']), 1.2); }
    K.say(eddie, pick(big ? ['Now that\'s the berries!', 'icon:star'] : ['Nice', 'icon:note']), 1.3);
    if (big && !spot.active) nextSpot = Math.min(nextSpot, 3);
  }
  function build(Kk) {
    K = Kk; mkStaff();
    if (per() !== 3) { const a = mkPatron('gent'); a.alpha = 1; a.fade = 0; a.hx = STOOLS[1].x; a.spot = STOOLS[1]; STOOLS[1].occ = a; a.state = 'seated'; a.seatY = 590; a.tableY = BAR.top - 6; a.faceDir = 0.7; a.phase = 'drink'; a.drinks = 1; glasses.push({ kind: 'oldfash', level: 0.7, x: glassX(STOOLS[1]), owner: a, done: true, garnish: true }); K.settle(a); }
    nextSpot = per() === 1 ? 12 : 40;
  }
  /* ---------- drawing ---------- */
  function deco(c, x, y, w, h, col, col2) { // Art Deco sunburst fan
    c.fillStyle = col; K.poly(c, [x, y + h, x + w, y + h, x + w / 2, y]); c.fill();
    c.fillStyle = col2; for (let i = 0; i < 7; i++) { const a0 = Math.PI + (i / 7) * Math.PI, a1 = a0 + Math.PI / 14; K.poly(c, [x + w / 2, y + h, x + w / 2 + Math.cos(a0) * w * 0.48, y + h + Math.sin(a0) * h * 0.95, x + w / 2 + Math.cos(a1) * w * 0.48, y + h + Math.sin(a1) * h * 0.95]); c.fill(); }
  }
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    // panelled wall with gold pinstripes + a deco frieze of fans
    for (let x = -60; x < 1340; x += 120) { c.fillStyle = P.wall2; c.fillRect(x + 10, 120, 100, 380); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 60, 120, 50, 380); c.fillStyle = rgba(P.deco, 0.5); c.fillRect(x + 8, 118, 104, 2); c.fillRect(x + 8, 500, 104, 2); }
    c.fillStyle = P.wallDk; c.fillRect(-60, 0, 1400, 84); for (let x = -60; x < 1340; x += 64) deco(c, x, 20, 64, 52, P.deco2, P.deco); c.fillStyle = P.deco; c.fillRect(-60, 82, 1400, 4);
    c.fillStyle = P.woodDk; c.fillRect(-60, 500, 1400, 160); c.fillStyle = P.wood; for (let x = -60; x < 1340; x += 80) c.fillRect(x + 6, 512, 68, 130); c.fillStyle = P.deco; c.fillRect(-60, 498, 1400, 3);
    // centre: a tall sunburst mirror, calm behind the board
    c.fillStyle = P.deco2; K.poly(c, [520, 470, 760, 470, 760, 220, 640, 120, 520, 220]); c.fill(); c.fillStyle = P.mirror; K.poly(c, [532, 460, 748, 460, 748, 226, 640, 136, 532, 226]); c.fill();
    c.fillStyle = rgba(P.mirror2, 0.6); K.poly(c, [560, 460, 600, 460, 700, 160, 670, 150]); c.fill();
    for (let i = 0; i < 9; i++) { const a = Math.PI + 0.15 + i * (Math.PI - 0.3) / 8; c.strokeStyle = rgba(P.deco, 0.35); c.lineWidth = 2; c.beginPath(); c.moveTo(640, 300); c.lineTo(640 + Math.cos(a) * 140, 300 + Math.sin(a) * 140); c.stroke(); }
    // street-level grate window (legs & wheels pass by)
    const { x0, y0, x1, y1 } = WINDOW; c.fillStyle = P.deco2; c.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip(); K.sky(c, x0, y0 - 40, x1, y1 - 18, { noSun: 1 });
    c.fillStyle = P.street; c.fillRect(x0, y1 - 18, x1 - x0, 18);
    for (let i = 0; i < 3; i++) { const sp = 30 + i * 12, x = x0 + ((t * sp + i * 160) % (x1 - x0 + 160)) - 80, ph = t * 6 + i; c.fillStyle = [P.navy, P.brown, P.dark][i]; const st = Math.sin(ph) * 6; K.poly(c, [x - 3 + st, y1 - 18, x + 3 + st, y1 - 18, x + 2, y1 - 50, x - 2, y1 - 50]); c.fill(); K.poly(c, [x - 3 - st, y1 - 18, x + 3 - st, y1 - 18, x + 2, y1 - 50, x - 2, y1 - 50]); c.fill(); c.fillStyle = '#1a1414'; c.fillRect(x - 5 + st, y1 - 20, 8, 3); c.fillRect(x - 5 - st, y1 - 20, 8, 3); }
    { const x = x0 + ((t * 70) % (x1 - x0 + 400)) - 200; c.fillStyle = '#1a1414'; c.beginPath(); c.arc(x, y1 - 10, 9, 0, TAU); c.fill(); c.beginPath(); c.arc(x + 60, y1 - 10, 9, 0, TAU); c.fill(); c.fillStyle = L('#2a2a30'); c.fillRect(x - 14, y1 - 34, 90, 16); }
    K.weather(c, x0, y0, x1, y1); if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(x0, y1 - 22, x1 - x0, 5); }
    c.restore(); c.strokeStyle = P.woodDk; c.lineWidth = 3; for (let x = x0 + 16; x < x1; x += 16) { c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); }
    // hidden door with a peephole slot
    c.fillStyle = P.woodDk; c.fillRect(-20, 200, 82, 460); c.fillStyle = P.wood; const dw = 70 * (1 - door.open * 0.75); c.fillRect(-12, 210, dw, 450); c.fillStyle = 'rgba(0,0,0,0.2)'; c.fillRect(-12 + dw * 0.5, 210, dw * 0.5, 450);
    if (door.open > 0.05) { c.fillStyle = L('#0a0a10'); c.fillRect(-12 + dw, 210, 70 - dw, 450); }
    c.fillStyle = P.brass; c.fillRect(-12 + dw - 12, 420, 5, 14); c.fillStyle = L('#140a06'); c.fillRect(10, 296, 34, 10);
    if (door.slot > 0.05) { c.fillStyle = rgba('#ffe0a0', door.slot); c.fillRect(12, 298, 30, 6); K.glow(c, 27, 301, 30, '#ffd890', 0.4 * door.slot); }
    // red raid bulb over the door
    c.fillStyle = raid.on && (t * 4) % 1 < 0.5 ? '#ff2a1a' : L('#5a1a14'); c.beginPath(); c.arc(26, 186, 7, 0, TAU); c.fill(); if (raid.on) K.glow(c, 26, 186, 90, '#ff2a1a', 0.5 * ((t * 4) % 1 < 0.5 ? 1 : 0.3));
  }
  function drawBackBar(c, t) {
    const P = K.P;
    c.fillStyle = P.woodDk; c.fillRect(BAR.x0 + 6, 196, BAR.x1 - BAR.x0 - 10, 300); c.fillStyle = P.mirror; c.fillRect(BAR.x0 + 18, 206, BAR.x1 - BAR.x0 - 34, 210);
    c.fillStyle = rgba(P.mirror2, 0.5); K.poly(c, [BAR.x0 + 60, 206, BAR.x0 + 110, 206, BAR.x0 + 40, 416, BAR.x0 - 10, 416]); c.fill();
    if (flip > 0.02) { c.save(); c.globalAlpha = flip; c.fillStyle = P.wood; c.fillRect(BAR.x0 + 18, 206, BAR.x1 - BAR.x0 - 34, 210); for (let s = 0; s < 3; s++) for (let i = 0; i < 18; i++) { c.fillStyle = [P.coral, P.navy, P.olive, P.mustard, P.plum][i % 5]; c.fillRect(BAR.x0 + 26 + i * 19, SHELVES[s] - 44 + (i % 3) * 3, 15, 42 - (i % 3) * 3); } c.restore(); }
    for (const sy of SHELVES) { c.fillStyle = P.woodHi; c.fillRect(BAR.x0 + 14, sy, BAR.x1 - BAR.x0 - 26, 6); }
    if (flip < 0.98) { c.save(); c.globalAlpha = 1 - flip; for (const b of bottles) { if (b.out) continue; const y = SHELVES[b.s]; c.fillStyle = L(b.col); roundRect(c, b.x, y - b.h, b.w, b.h, 3); c.fill(); c.fillRect(b.x + b.w * 0.35, y - b.h - 12, b.w * 0.3, 14); c.fillStyle = 'rgba(255,255,255,0.22)'; c.fillRect(b.x + 2, y - b.h + 4, 3, b.h - 8); if (b.lab) { c.fillStyle = L('#ece2c8'); c.fillRect(b.x + 2, y - b.h * 0.55, b.w - 4, b.h * 0.3); } } c.restore(); }
    // pendant shade over the bar
    for (const x of [180, 380]) { c.strokeStyle = P.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, 86); c.lineTo(x, 168); c.stroke(); c.fillStyle = P.deco; K.poly(c, [x - 8, 168, x + 8, 168, x + 22, 186, x - 22, 186]); c.fill(); c.fillStyle = P.bulb; ellipse(c, x, 188, 8, 4); c.fill(); K.glow(c, x, 200, 150, P.glow, P.glowA * (1 - 0.5 * spot.on)); }
  }
  function drawBar(c, t) {
    const P = K.P, { x0, x1, top, base } = BAR;
    c.fillStyle = P.woodHi; c.fillRect(x0 - 10, top, x1 - x0 + 20, 12); c.fillStyle = P.brass; c.fillRect(x0 - 10, top + 12, x1 - x0 + 20, 3);
    c.fillStyle = P.wood; c.fillRect(x0, top + 15, x1 - x0, base - top - 15); for (let x = x0 + 14; x < x1 - 30; x += 74) { c.fillStyle = P.woodDk; c.fillRect(x, top + 30, 56, base - top - 56); deco(c, x + 10, top + 44, 36, 26, P.deco2, P.deco); }
    c.fillStyle = P.brass; c.fillRect(x0 - 6, base - 26, x1 - x0 + 12, 4); // foot rail
    for (const g of glasses) if (!g.held && !g.hidden) drawGlass(c, g.x, top, 0.95, g);
    if (pour) { c.strokeStyle = L(pour.col); c.lineWidth = 2.2; c.beginPath(); c.moveTo(pour.x0, pour.y0); c.quadraticCurveTo(pour.x0 + (pour.x1 - pour.x0) * 0.3, pour.y0 + 6, pour.x1, pour.y1); c.stroke(); }
    if (cork) { c.fillStyle = L('#c89a5a'); c.fillRect(cork.x - 2, cork.y - 3, 5, 6); }
  }
  function drawStage(c, t) {
    const P = K.P;
    // curtain + proscenium + platform
    c.fillStyle = P.curtain2; c.fillRect(STAGE.x0, 110, 360, 510); for (let x = STAGE.x0; x < 1320; x += 26) { c.fillStyle = P.curtain; c.fillRect(x, 110, 14, 510); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 10, 110, 4, 510); }
    c.fillStyle = P.deco2; c.fillRect(STAGE.x0 - 12, 96, 380, 20); for (let x = STAGE.x0; x < 1320; x += 40) deco(c, x, 96, 40, 18, P.deco, P.deco2);
    c.fillStyle = P.stage; c.fillRect(STAGE.x0 - 10, STAGE.top, 380, 14); c.fillStyle = P.woodDk; c.fillRect(STAGE.x0 - 10, STAGE.top + 14, 380, 90); c.fillStyle = P.deco; c.fillRect(STAGE.x0 - 10, STAGE.top + 12, 380, 3);
    for (let i = 0; i < 7; i++) { const x = STAGE.x0 + 14 + i * 50; c.fillStyle = P.bulb; c.beginPath(); c.arc(x, STAGE.top + 30, 3, 0, TAU); c.fill(); K.glow(c, x, STAGE.top + 30, 16, P.bulb, 0.4); } // footlights
    // ribbon microphone on a stand
    c.strokeStyle = L('#2a2a30'); c.lineWidth = 3; c.beginPath(); c.moveTo(MIC_X, STAGE.top); c.lineTo(MIC_X, 470); c.stroke(); c.fillStyle = L('#c8ccd0'); roundRect(c, MIC_X - 7, 452, 14, 22, 5); c.fill(); c.fillStyle = L('#5a5e66'); for (let i = 0; i < 4; i++) c.fillRect(MIC_X - 5, 456 + i * 4, 10, 1.4); c.fillStyle = L('#2a2a30'); ellipse(c, MIC_X, STAGE.top, 14, 3); c.fill();
    // a small sign on an easel: tonight
    c.fillStyle = P.woodDk; c.fillRect(1250, 330, 40, 50);
  }
  function draw(c, t, Kk) {
    const P = K.P;
    drawRoom(c, t); drawBackBar(c, t);
    K.drawBody(c, eddie, false); if (!eddie.armsFront) K.drawArms(c, eddie);
    drawBar(c, t);
    drawStage(c, t); drawInstruments(c, false);
    for (const a of [pianist, clar]) K.drawBody(c, a, true); K.drawBody(c, bassist, false); drawBass(c); K.drawArms(c, bassist); c.globalAlpha = 1; drawInstruments(c, true);
    if (!singer.offstage) K.drawBody(c, singer, true);
    // floor
    c.fillStyle = P.floor; c.fillRect(-60, 652, STAGE.x0 + 50, 80 + K.extraB); c.fillStyle = P.floor; c.fillRect(STAGE.x0 - 10, 720, 400, K.extraB);
    for (let i = 0; i < 30; i++) { c.fillStyle = P.floor2; K.poly(c, [i * 70 - 60, 652, i * 70 - 30, 652, i * 70 - 60 + 50, 730, i * 70 - 60 + 10, 730]); c.fill(); }
    // stools + patrons (in front of the bar) + doorman
    for (const st of STOOLS) { c.fillStyle = P.brass; c.fillRect(st.x - 3, 604, 6, 104); c.fillStyle = P.curtain; ellipse(c, st.x, 602, 26, 7); c.fill(); c.fillStyle = P.brass; ellipse(c, st.x, 690, 18, 4); c.fill(); }
    const front = K.actors.filter((a) => a.layer === 'front');
    for (const a of front) { if (a.alpha > 0.05 && a.state !== 'seated') { c.fillStyle = 'rgba(0,0,0,0.18)'; ellipse(c, a.hx, a.floorY + 2, 28 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    // haze, light shafts from the grate, spotlight & dimming
    c.save(); c.globalAlpha = P.hazeA; c.fillStyle = P.haze; for (let i = 0; i < 3; i++) { const y = 200 + i * 120 + Math.sin(t * 0.2 + i) * 20; ellipse(c, ((t * (6 + i * 3) + i * 400) % 1600) - 160, y, 300, 26); c.fill(); } c.restore();
    K.shafts(c, [[WINDOW.x0, WINDOW.x1, WINDOW.x0 + 120, WINDOW.x1 + 260, WINDOW.y1, 700]]);
    if (spot.on > 0.01) {
      c.save(); c.fillStyle = `rgba(10,6,16,${0.42 * spot.on})`; c.beginPath(); c.rect(-60, -10, 1400, 760); c.moveTo(MIC_X - 80, 720); c.lineTo(MIC_X + 30, 0); c.lineTo(MIC_X + 100, 0); c.lineTo(MIC_X + 120, 720); c.closePath(); c.fill('evenodd'); c.restore();
      c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, rgba(P.spot, 0.0)); g.addColorStop(1, rgba(P.spot, 0.35 * spot.on)); c.fillStyle = g; K.poly(c, [MIC_X + 30, 0, MIC_X + 100, 0, MIC_X + 120, 720, MIC_X - 80, 720]); c.fill(); c.restore();
      c.fillStyle = rgba(P.spot, 0.25 * spot.on); ellipse(c, MIC_X + 20, STAGE.top + 4, 100, 12); c.fill();
    }
    if (raid.on) { c.fillStyle = `rgba(255,30,20,${0.06 + 0.05 * Math.sin(t * 25)})`; c.fillRect(-60, 0, 1400, 760); }
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a); if (voice) K.drawBubble(c, voice);
  }
  function icon(c, name, x, y, r) {
    if (name === 'knock') { c.fillStyle = K.P.ink; c.font = `800 ${r * 0.9}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('knock', x, y - r * 0.35); c.fillText('knock', x, y + r * 0.55); return true; }
    if (name === 'shake') { c.strokeStyle = K.P.ink; c.lineWidth = r * 0.16; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(x, y, r * (0.3 + i * 0.25), -0.6, 0.6); c.stroke(); c.beginPath(); c.arc(x, y, r * (0.3 + i * 0.25), Math.PI - 0.6, Math.PI + 0.6); c.stroke(); } return true; }
    if (name === 'pop') { c.fillStyle = '#e8b52c'; c.font = `900 ${r * 1.1}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('POP!', x, y); return true; }
    if (name === 'hymn') { c.fillStyle = K.P.ink; c.font = `italic 700 ${r * 0.8}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('♪ Amazing Grace…', x, y); return true; }
    return false;
  }
  function onGone(Kk, a) { if (a.spot) a.spot.occ = null; glasses = glasses.filter((g) => g.owner !== a || g.level > 0.02 ? g.owner !== a : true); }
  return GeoKit.stage({ id: 'speakeasy', pal: SpeakPal, startHour: 19, span: 10, build, sim, draw, onClear, onGone, icon, font: 'italic 700 15px Georgia, "Times New Roman", serif', vign: 'rgba(8,4,10,0.45)',
    debug: () => ({ glasses: glasses.map((g) => g.kind + ':' + g.level.toFixed(2)).join(' '), spot: spot.active, raid: raid.on, band: bandOn(), pats: patrons().map((a) => a.type + ':' + a.phase).join(' ') }) });
}
registerStage('speakeasy', makeGeoSpeakeasyStage);
