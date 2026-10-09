/* ================= World 5 · Gelateria — GEOMETRIC edition (Italian piazza, pastel planes) =================
   A curved glass case of spatula-sculpted tins (levels really go down), Giulia packing cones and cups with the spatola,
   taster spoons, coins in the tray. Marco presses waffle cones on the iron by the archway (batter -> lid -> steam ->
   roll on the cone form -> stand) and carries them over when Giulia runs low. Calm flow: customers come in from the
   street door, get served, eat at the window ledge looking onto the piazza (fountain, Vespa, passeggiata), leave through
   the arch. Signature: a dog gets a tiny cup. Surprise: a kid drops a scoop — splat — and gets a free one.
   Clock 10:00 (shutter up, APERTO) -> afternoon -> golden passeggiata -> neon night -> closing (tins lidded). */
const GelPal = GeoKit.palette({
  morning: { wall: '#f4e6d4', tile: '#bfe6dc', tile2: '#f6c8cc', trim: '#e88a8a', case: '#f2dcc8', case2: '#e0c4ac', steel: '#c8d0d4', glass: '#dff4f4', floor: '#e8d8c4', floor2: '#d4c0a8', wood: '#b07a4a', woodDk: '#7a4e2a', awn: '#e8606a', awn2: '#fbf4ea', sky0: '#a8d4f0', sky1: '#fbe8d0', city: '#f0c890', city2: '#e8a878', cobble: '#c8b49a', lamp: '#ffe6a8', glow: '#ffd890', glowA: 0.12, neon: '#ff6a9a', neonA: 0.0, shaft: '#fff4d8', shaftA: 0.22, amb: '#ffffff', ambK: 0, sun: '#fff4d8',
    skin: '#ecb88e', bubble: '#ffffff', ink: '#2a2024', navy: '#2e4a6a', coral: '#ee6a64', mustard: '#f0b43a', teal: '#3aa898', cream: '#f6ead4', olive: '#7a8a44', plum: '#8a4a70', grey: '#a8a4a0', brown: '#7a4e34', white: '#fffaf2', dark: '#2a2226', hairGrey: '#dcd6d0' },
  day: { wall: '#f8ecdc', tile: '#c4ece2', tile2: '#f8ccd2', trim: '#ee8e90', case: '#f6e2ce', case2: '#e4c8b2', steel: '#ccd4d8', glass: '#e4f8f8', floor: '#ecdcc8', floor2: '#d8c4ac', wood: '#b47e4e', woodDk: '#7e522e', awn: '#ec646e', awn2: '#fdf8f0', sky0: '#6ab4ee', sky1: '#d4ecfa', city: '#f4cc94', city2: '#eeae80', cobble: '#ccb89e', lamp: '#fff0c0', glow: '#ffe0a0', glowA: 0.06, neon: '#ff6a9a', neonA: 0.0, shaft: '#ffffff', shaftA: 0.16, amb: '#ffffff', ambK: 0, sun: '#fffbe8',
    skin: '#f0bc92', bubble: '#ffffff', ink: '#2a2024', navy: '#2e4c70', coral: '#f06e68', mustard: '#f4b83e', teal: '#3cae9e', cream: '#f8eed8', olive: '#7e8e46', plum: '#8e4e74', grey: '#aca8a4', brown: '#7e5236', white: '#fffcf6', dark: '#2a2226', hairGrey: '#e0dad4' },
  dusk: { wall: '#f0c8a8', tile: '#a8d0cc', tile2: '#f0a8b0', trim: '#e07070', case: '#ecc4a8', case2: '#d4a88c', steel: '#c0b8b8', glass: '#f4dcd0', floor: '#dcb898', floor2: '#c49c7c', wood: '#a06a3e', woodDk: '#6a4024', awn: '#d84a5a', awn2: '#f8e4d0', sky0: '#6a5aa0', sky1: '#ffa870', city: '#e8a070', city2: '#c87a5a', cobble: '#b0907a', lamp: '#ffc070', glow: '#ffaa50', glowA: 0.3, neon: '#ff5a8a', neonA: 0.5, shaft: '#ffb070', shaftA: 0.2, amb: '#ffd0a8', ambK: 0.06, sun: '#ffc890',
    skin: '#e4a47e', bubble: '#fff4e8', ink: '#2a1c20', navy: '#2a4060', coral: '#e05a58', mustard: '#e4a030', teal: '#2e948a', cream: '#f0dcc0', olive: '#6e7a3c', plum: '#7e3e64', grey: '#968e8c', brown: '#6e4430', white: '#f8eee0', dark: '#241c20', hairGrey: '#d0c4bc' },
  night: { wall: '#5a4a5a', tile: '#3e6a6a', tile2: '#7a4a5a', trim: '#a04a5a', case: '#8a6a6a', case2: '#6a5050', steel: '#7a8088', glass: '#a8d8e0', floor: '#5a4848', floor2: '#4a3a3a', wood: '#6a4430', woodDk: '#40281a', awn: '#8a2a3a', awn2: '#b8a8a0', sky0: '#0c1636', sky1: '#2a3460', city: '#4a3a4a', city2: '#3a2e40', cobble: '#4a4048', lamp: '#ffd080', glow: '#ffb860', glowA: 0.45, neon: '#ff4a8a', neonA: 1, shaft: '#ffc080', shaftA: 0.0, amb: '#3a3050', ambK: 0.14, sun: '#f4ecd8',
    skin: '#c8906e', bubble: '#f8f0ec', ink: '#1e1418', navy: '#1e2e4a', coral: '#b8484a', mustard: '#c08a2a', teal: '#226a64', cream: '#d8c4b0', olive: '#4e5630', plum: '#5e2e4c', grey: '#787074', brown: '#523424', white: '#ece2d8', dark: '#181216', hairGrey: '#b0a8a4' },
  snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', city: '#e0dcd8', city2: '#d0ccd0', cobble: '#e8eaee' },
}, [[6, 'night'], [8.5, 'morning'], [11.5, 'day'], [16.5, 'day'], [19, 'dusk'], [21, 'night'], [30, 'night'], [32.5, 'morning']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : h < 20.5 ? 'Passeggiata' : h < 22.5 ? 'Night' : 'Closing'; } });

function makeGeoGelatoStage() {
  const CASE = { x0: 72, x1: 450, top: 486, base: 650 }, SF = 606, SSC = 0.86, FL = 712, SC = 0.84;
  const FLAV = [{ k: 'pistachio', n: 'Pistacchio', c: '#b8d070', g: '#6a8a2a' }, { k: 'fragola', n: 'Fragola', c: '#f47a96', g: '#e8304a' }, { k: 'limone', n: 'Limone', c: '#f8e46a', g: '#f0d020' }, { k: 'cioccolato', n: 'Cioccolato', c: '#6a3a22', g: '#2a1408' }, { k: 'mango', n: 'Mango', c: '#ffa63a', g: '#ffb820' }, { k: 'mirtillo', n: 'Mirtillo', c: '#7a5ac8', g: '#3a2a7a' }, { k: 'stracciatella', n: 'Stracciatella', c: '#f8f2e4', g: '#3a2214' }];
  const TINS = FLAV.map((f, i) => ({ f, x: CASE.x0 + 30 + i * 54, lvl: rand(0.7, 1) }));
  const SPOTS = [{ x: 118, occ: null }, { x: 214, occ: null }], WAIT = { x: 40 };
  const LEDGE = [{ x: 984, occ: null }, { x: 1084, occ: null }], LEDGE_Y = 548;
  const IRON = { x: 1192, top: 520 }, WIN = { x0: 960, y0: 118, x1: 1116, y1: 470 }, ARCH = 1262;
  const STAND = { x: 96, n: 5 };
  let K, giulia, marco, coins = 0, splat = null, nextArrive = 2, shutter = 1, sign = 1, iron = { open: 0, batter: 0, steam: 0, cone: 0 }, rack = 2, vespa = { x: 1060, on: 1, t: 0 };
  const L = (h) => K.L(h), B = GeoKit.body;
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 12 ? 0 : h < 17 ? 1 : h < 20.5 ? 2 : h < 22.5 ? 3 : 4; };
  const custs = () => K.actors.filter((a) => a.cust && !a.isDog);
  const cool = (k) => K.weatherNow === k;
  /* ---------- props ---------- */
  function scoopShape(c, x, y, r, col, g) { c.fillStyle = L(col); c.beginPath(); c.arc(x, y, r, Math.PI * 0.95, Math.PI * 2.05); c.lineTo(x + r, y + r * 0.25); for (let i = 3; i >= 0; i--) c.lineTo(x - r + (i / 3) * 2 * r, y + r * 0.25 + (i % 2) * r * 0.18); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.arc(x - r * 0.3, y - r * 0.35, r * 0.28, 0, TAU); c.fill(); if (g) { c.fillStyle = L(g); c.fillRect(x - 1, y - r * 0.6, 2, 2); c.fillRect(x + r * 0.3, y - r * 0.2, 2, 2); } }
  function cone(c, x, y, s, sc, melt = 0, cup = false) { // y = bottom tip; sc = list of flavour objects
    c.save(); c.translate(x, y); c.scale(s, s);
    if (cup) { c.fillStyle = L('#fbf6ee'); K.poly(c, [-9, -14, 9, -14, 7, 0, -7, 0]); c.fill(); c.fillStyle = L('#e86a7a'); c.fillRect(-8.5, -10, 17, 3); }
    else { c.fillStyle = L('#d8a058'); K.poly(c, [-8, -22, 8, -22, 0, 0]); c.fill(); c.strokeStyle = L('#b07a38'); c.lineWidth = 0.8; c.beginPath(); for (let i = 0; i < 4; i++) { c.moveTo(-7 + i * 4, -22); c.lineTo(-1 + i * 1.5, -6); c.moveTo(7 - i * 4, -22); c.lineTo(1 - i * 1.5, -6); } c.stroke(); }
    const top = cup ? -14 : -22; sc.forEach((f, i) => { const r = 8.5 * (1 - melt * 0.6) * (i ? 0.92 : 1); if (r > 1) scoopShape(c, (i % 2 ? 2 : -1), top - 4 - i * 11 * (1 - melt * 0.5), r, f.c, f.g); });
    if (melt > 0.2 && sc.length) { c.fillStyle = L(sc[0].c); c.fillRect(-6, top, 2, 3 + melt * 4); }
    c.restore();
  }
  const H = {
    cone: (o) => ({ o, draw(c, x, y, s, a) { cone(c, x + a.f * 2 * s, y + 18 * s, s * 1.05, o.sc, o.melt || 0, o.cup); } }),
    spat: (f) => ({ f, draw(c, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(a.f * 0.6); c.fillStyle = L('#c8d0d4'); c.fillRect(-2 * s, -4 * s, 4 * s, 20 * s); c.fillStyle = L('#3a2a2a'); c.fillRect(-2 * s, -14 * s, 4 * s, 11 * s); if (this.f) { c.fillStyle = L(this.f.c); ellipse(c, 0, 16 * s, 6 * s, 4 * s); c.fill(); } c.restore(); } }),
    spoon: (f) => ({ draw(c, x, y, s) { c.fillStyle = L('#e8f0f0'); c.fillRect(x - 0.8 * s, y - 10 * s, 1.6 * s, 10 * s); if (f) { c.fillStyle = L(f.c); ellipse(c, x, y - 10 * s, 2.6 * s, 2 * s); c.fill(); } } }),
    coin: () => ({ draw(c, x, y, s) { c.fillStyle = L('#e8c050'); c.beginPath(); c.arc(x, y, 3 * s, 0, TAU); c.fill(); } }),
    ladle: (full) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#a8b0b4'); c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - 10 * s); c.lineTo(x + a.f * 14 * s, y + 6 * s); c.stroke(); c.fillStyle = L('#a8b0b4'); ellipse(c, x + a.f * 16 * s, y + 8 * s, 5 * s, 3 * s); c.fill(); if (full) { c.fillStyle = L('#f4dca0'); ellipse(c, x + a.f * 16 * s, y + 7 * s, 4 * s, 1.6 * s); c.fill(); } } }),
    rack: (n) => ({ draw(c, x, y, s) { c.fillStyle = L('#c8d0d4'); c.fillRect(x - 14 * s, y + 6 * s, 28 * s, 3 * s); for (let i = 0; i < n; i++) cone(c, x - 10 * s + i * 7 * s, y + 4 * s, s * 0.6, []); } }),
    lid: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c8d0d4'); c.fillRect(x - 14 * s, y - 2 * s, 28 * s, 4 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
  };
  /* ---------- staff ---------- */
  function mkStaff() {
    giulia = K.mk(B({ T: 232, hw: 58, headR: 29, pattern: 'apron', top: 'teal', top2: 'white', shirt: 'white', hairStyle: 'pony', hat: 'paper', hatCol: 'white', pants: 'dark' }), { role: 'gelataia', staff: 1, hx: 170, f: 1, floorY: SF, sc: SSC, faceDir: 0.6 });
    marco = K.mk(B({ T: 246, hw: 64, headR: 30, pattern: 'apron', top: 'coral', top2: 'white', shirt: 'white', hairStyle: 'short', pants: 'dark', hat: 'cap', hatCol: 'coral' }), { role: 'cones', staff: 1, hx: IRON.x + 40, f: -1, floorY: SF + 14, sc: SSC * 0.98, faceDir: -0.6, speed: 1.3 });
    giulia.think = giuliaThink; marco.think = marcoThink;
  }
  function giuliaThink(a) {
    if (per() === 4) { const t = TINS.find((q) => !q.lid); if (t) return K.start(a, 'lid', [K.ph(0, (s) => { s.walkTo = clamp(t.x - 10, 100, 430); }, { until: (s) => !s.walking, max: 12 }), K.ph(0.7, (s) => { s.tgN = [t.x, CASE.top + 20]; s.hold.N = H.lid(); s.leanT = 0.25; }, { exit: (s) => { t.lid = 1; s.hold.N = null; } })]); }
    const c0 = SPOTS[0].occ;
    if (c0 && c0.phase === 'front' && !c0.busy) { c0.busy = 1; return serve(a, c0); }
    if (STAND.n <= 1 && rack > 0 && K.cooled(a, 'call', 6)) { K.say(a, 'Marco! Coni!', 1.3); }
    const low = TINS.find((t) => t.lvl < 0.3);
    if (low && K.cooled(a, 'smooth', 8)) return K.start(a, 'smooth', [K.ph(0, (s) => { s.walkTo = clamp(low.x - 10, 100, 430); }, { until: (s) => !s.walking, max: 12 }), K.ph(2, (s, u, t) => { s.hold.N = H.spat(null); s.tgN = [low.x + Math.sin(t * 6) * 12, CASE.top + 24]; s.leanT = 0.25; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    const r = Math.random();
    if (r < 0.35) { const t = pick(TINS.filter((q) => q.x < 300)); return K.start(a, 'sculpt', [K.ph(0, (s) => { s.walkTo = clamp(t.x - 10, 100, 300); }, { until: (s) => !s.walking, max: 12 }), K.ph(rand(2, 3.5), (s, u, tt) => { s.hold.N = H.spat(null); s.tgN = [t.x + Math.sin(tt * 4) * 14, CASE.top + 22 - Math.abs(Math.cos(tt * 4)) * 8]; s.leanT = 0.22; s.lxT = 0.5; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); }
    if (r < 0.55) return K.start(a, 'wipe', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 30 + Math.sin(t * 6) * 20, CASE.top - 6]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.lxT = pick([0.7, 0.3, -0.3]); })]);
  }
  function serve(a, cu) {
    const o = cu.order, mk = { sc: [], cup: o.cup }, ph = [];
    ph.push(K.ph(0, (s) => { s.walkTo = 150; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.4, (s) => { s.look = { x: () => cu.hx, until: K.simT + 0.4 }; }, { enter: () => K.say(a, pick(['Buongiorno!', 'Ciao! Cosa prendi?', 'Prego!']), 1.3) }));
    ph.push(K.ph(1.2, null, { enter: () => K.after(0.3, () => K.say(cu, o.flav.map((f) => f.n).join(' + ') + (o.cup ? ', coppetta' : ''), 1.6)) }));
    if (o.taste) { const tf = o.taste; ph.push(K.ph(0, (s) => { s.walkTo = clamp(tf.x - 10, 100, 430); }, { until: (s) => !s.walking, max: 12 }), K.ph(0.6, (s) => { s.tgN = [tf.x, CASE.top + 24]; s.leanT = 0.25; }, { exit: (s) => { s.hold.N = H.spoon(tf.f); } }), K.ph(0, (s) => { s.walkTo = 150; }, { until: (s) => !s.walking, max: 12 }),
      K.ph(0.6, (s) => { s.tgN = [cu.hx + 40, CASE.top - 26]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; cu.hold.N = H.spoon(tf.f); K.abort(cu); K.start(cu, 'taste', [K.ph(0.5, (q) => { q.tgN = [q.R.cx + q.f * q.R.R * 0.8, q.R.cy + q.R.R * 0.3]; }), K.ph(0.8, (q) => { q.headDy = 1.5; }, { exit: (q) => { q.hold.N = H.spoon(null); q.headDy = 0; K.say(q, pick(['Mmm!', 'Buono!', 'icon:heart']), 1.1); } }), K.ph(0.4, null, { exit: (q) => { q.hold.N = null; } })]); } })); }
    ph.push(K.ph(0, (s) => { s.walkTo = STAND.x + 30; }, { until: (s) => !s.walking, max: 12 }));
    ph.push(K.ph(0.5, (s) => { s.tgF = [STAND.x, CASE.top - 30]; s.farFront = true; }, { exit: (s) => { if (!o.cup) STAND.n = Math.max(0, STAND.n - 1); s.hold.F = H.cone(mk); } }));
    o.flav.forEach((f) => { const t = TINS.find((q) => q.f === f) || TINS[0];
      ph.push(K.ph(0, (s) => { s.walkTo = clamp(t.x - 6, 100, 430); }, { until: (s) => !s.walking, max: 12 }),
        K.ph(0.5, (s) => { s.tgN = [t.x, CASE.top + 26]; s.tgF = [s.hx + 18, s.hy - 70]; s.leanT = 0.28; s.hold.N = H.spat(null); }),
        K.ph(0.7, (s, u, tt) => { s.tgN = [t.x + Math.sin(tt * 9) * 10, CASE.top + 28 - u * 6]; }, { exit: (s) => { t.lvl = Math.max(0.08, t.lvl - 0.07); s.hold.N = H.spat(f); } }),
        K.ph(0.6, (s) => { s.tgN = [s.hF.x + 4, s.hF.y - 20]; s.leanT = 0.08; }, { exit: (s) => { s.hold.N = H.spat(null); mk.sc.push(f); } }),
        K.ph(0.35, (s, u, tt) => { s.tgN = [s.hF.x + Math.sin(tt * 14) * 4, s.hF.y - 22 - mk.sc.length * 8]; }));
    });
    ph.push(K.ph(0, (s) => { s.hold.N = null; s.walkTo = 160; }, { until: (s) => !s.walking, max: 12 }),
      K.ph(0.7, (s) => { s.tgF = [cu.hx + 34, CASE.top - 30]; s.leanT = 0.22; }, { enter: () => K.say(a, pick(['Ecco!', 'Prego!', 'Buona giornata!']), 1.2), exit: (s) => { s.hold.F = null; s.farFront = false; cu.hold.N = H.cone(mk); cu.myCone = mk; } }),
      K.ph(0.8, (s) => { s.tgN = [cu.hx + 40, CASE.top - 8]; s.leanT = 0.18; }, { enter: () => { K.abort(cu); K.start(cu, 'pay', [K.ph(0.5, (q) => { q.tgF = [q.hx + 36, CASE.top - 10]; q.farFront = true; }, { enter: (q) => { q.hold.F = H.coin(); }, exit: (q) => { q.hold.F = null; q.farFront = false; coins++; } })]); }, exit: () => { cu.phase = 'served'; cu.busy = 0; } }));
    if (cu.dog) ph.push(K.ph(0, (s) => { s.walkTo = 120; }, { until: (s) => !s.walking, max: 8 }), K.ph(0.6, (s) => { s.tgF = [s.hx + 14, CASE.top - 20]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.cone({ sc: [FLAV[6]], cup: true }); } }), K.ph(1.0, (s) => { s.tgF = [cu.dog.hx + 10, CASE.top - 6]; s.leanT = 0.35; }, { enter: () => K.say(a, 'Per il cane!', 1.3), exit: (s) => { s.hold.F = null; s.farFront = false; cu.dog.cup = 1; K.say(cu.dog, 'icon:heart', 1.2); } }));
    K.start(a, 'serve', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; cu.busy = 0; } });
  }
  function marcoThink(a) {
    if (per() === 4) return K.start(a, 'clean', [K.ph(0, (s) => { s.walkTo = IRON.x + 34; }, { until: (s) => !s.walking, max: 30 }), K.ph(rand(3, 5), (s, u, t) => { s.f = -1; s.hold.N = H.cloth(); s.tgN = [IRON.x + Math.sin(t * 6) * 14, IRON.top - 8]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    if (STAND.n <= 2 && rack >= 2) return deliver(a);
    if (rack < 5) return pressCone(a);
    const r = Math.random();
    if (r < 0.5) return K.start(a, 'look', [K.ph(rand(2, 3), (s) => { s.look = { x: () => 1060, until: K.simT + 0.3 }; s.tgN = [s.hx - 10, s.hy - 30]; s.tgF = [s.hx - 4, s.hy - 32]; })]);
    return K.start(a, 'idle', [K.ph(rand(1.5, 3), null)]);
  }
  function pressCone(a) {
    K.start(a, 'press', [K.ph(0, (s) => { s.walkTo = IRON.x + 34; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.2, (s) => { s.f = -1; }),
      K.ph(0.5, (s) => { s.tgN = [IRON.x - 30, IRON.top - 10]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = H.ladle(true); } }),
      K.ph(0.7, (s, u) => { s.tgN = [IRON.x - 6, IRON.top - 30]; s.potTilt = u; iron.open = 1; }, { exit: (s) => { s.hold.N = H.ladle(false); iron.batter = 1; } }),
      K.ph(0.4, (s) => { s.tgN = [IRON.x - 30, IRON.top - 10]; }, { exit: (s) => { s.hold.N = null; } }),
      K.ph(0.5, (s) => { s.tgF = [IRON.x, IRON.top - 40]; }, { exit: () => { iron.open = 0; iron.steam = 1; } }),
      K.ph(3, (s) => { s.tgF = [IRON.x + 4, IRON.top - 26]; s.tgN = [s.hx - 10, s.hy - 40]; s.look = { x: () => IRON.x, until: K.simT + 0.3 }; if (Math.random() < 0.06) K.fx('puff', IRON.x, IRON.top - 30, { life: 1, col: '#ffffff' }); }),
      K.ph(0.5, (s) => { s.tgF = [IRON.x, IRON.top - 44]; }, { exit: () => { iron.open = 1; iron.steam = 0; } }),
      K.ph(0.5, (s) => { s.tgN = [IRON.x, IRON.top - 8]; }, { exit: () => { iron.batter = 0; iron.cone = 1; } }),
      K.ph(1.2, (s, u, t) => { s.tgN = [IRON.x + 26 + Math.sin(t * 9) * 4, IRON.top - 16]; s.tgF = [IRON.x + 34, IRON.top - 18]; iron.cone = 1 + u; }, { exit: () => { iron.cone = 0; iron.open = 0; rack = Math.min(5, rack + 1); } })], { onAbort: (s) => { s.hold.N = null; iron.open = 0; iron.steam = 0; s.potTilt = 0; } });
  }
  function deliver(a) {
    const n = rack;
    K.start(a, 'deliver', [K.ph(0.5, (s) => { s.tgN = [IRON.x + 40, IRON.top - 10]; }, { exit: (s) => { s.hold.N = H.rack(n); rack = 0; } }),
      K.ph(0, (s) => { s.walkTo = 470; s.floorY = SF + 14; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.7, (s) => { s.f = -1; s.tgN = [STAND.x + 40, CASE.top - 40]; s.leanT = 0.15; }, { enter: () => K.say(a, 'Coni freschi!', 1.2), exit: (s) => { s.hold.N = null; STAND.n = Math.min(8, STAND.n + n); K.say(giulia, 'Grazie!', 1); } }),
      K.ph(0, (s) => { s.walkTo = IRON.x + 40; }, { until: (s) => !s.walking, max: 30 })], { onAbort: (s) => { if (s.hold.N) STAND.n += n; s.hold.N = null; } });
  }
  /* ---------- customers ---------- */
  const TYPES = {
    nonna: { body: B({ T: 216, hw: 62, torso: 'round', pattern: 'cardigan', top: 'plum', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', skirt: 'navy' }), words: ['Che caldo!', 'Bellissimo'], with: 'kid' },
    kid: { body: B({ T: 160, hw: 50, headR: 30, pattern: 'stripe', top: 'coral', top2: 'white', hairStyle: 'pony', pants: 'navy' }), words: ['Fragola!', 'icon:heart'], small: 1 },
    couple: { body: B({ T: 234, hw: 56, headR: 28, pattern: 'dress', top: 'mustard', skirt: 'mustard', hairStyle: 'long' }), words: ['Amore, assaggia', 'icon:heart'], with: 'beau' },
    beau: { body: B({ pattern: 'polo', top: 'navy', pants: 'cream', hairStyle: 'short' }), words: ['Buonissimo', 'icon:heart'] },
    tourist: { body: B({ pattern: 'tee', top: 'teal', hat: 'bucket', hatCol: 'cream', camera: 1, pants: 'olive', backpack: 1, packCol: 'coral' }), words: ['Gelato!', 'icon:cam'] },
    cyclist: { body: B({ pattern: 'tee', top: 'coral', top2: 'white', hat: 'cap', hatCol: 'white', pants: 'dark' }), words: ['Ciao!', 'Che fame'] },
    walker: { body: B({ T: 236, hw: 58, headR: 28, pattern: 'jacket', top: 'olive', shirt: 'cream', hairStyle: 'bob', pants: 'cream' }), words: ['Seduto, Pepe', 'icon:heart'], dog: 1 },
    suit: { body: B({ pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', pants: 'grey', glasses: 1 }), words: ['Una coppetta, veloce', 'icon:clock'] },
  };
  const PARTIES = [{ m: ['nonna', 'kid'], w: [3, 3, 2, 1, 0] }, { m: ['couple', 'beau'], w: [0.5, 1, 3, 3, 0] }, { m: ['tourist'], w: [1, 3, 2, 1, 0] }, { m: ['cyclist'], w: [2, 2, 1, 0.5, 0] }, { m: ['walker'], w: [2, 1, 2, 1, 0] }, { m: ['suit'], w: [0.5, 2, 1, 0.5, 0] }];
  function arrive() {
    const p = per(); if (p === 4) return false; if (custs().length >= 4) return false;
    const list = PARTIES.filter((q) => q.w[p] > 0 && !custs().some((c) => q.m.includes(c.type)) && custs().length + q.m.length <= 4); if (!list.length) return false;
    let tot = list.reduce((t, q) => t + q.w[p], 0) * (cool('rain') || cool('snow') ? 0.5 : 1), r = Math.random() * tot, pt = list[0]; for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    const party = { members: [] };
    pt.m.forEach((type, j) => { const a = mkCust(type, -40 - j * 46); a.party = party; party.members.push(a); a.phase = 'enter'; a.walkTo = WAIT.x - j * 34 + 40; });
    if (pt.m.includes('walker')) { const w = party.members[0]; const d = K.mk(B({ T: 90, hw: 40 }), { isDog: 1, cust: 1, hx: w.hx - 30, floorY: FL - 4, sc: 1, alpha: 0, fade: 1.5, owner: w }); w.dog = d; d.pose = () => {}; d.think = null; }
    return true;
  }
  function mkCust(type, x) {
    const T0 = TYPES[type], def = Object.assign({}, T0.body);
    const a = K.mk(def, { type, T0, cust: 1, hx: x, f: 1, floorY: FL - 6, sc: T0.small ? SC * 0.86 : SC, alpha: 0, fade: 1.6, speed: rand(0.95, 1.1) });
    if (cool('snow') && Math.random() < 0.8) a.scarf = pick(['coral', 'teal', 'mustard']);
    a.think = custThink; return a;
  }
  function custThink(a) {
    const P = a.party, lead = P.members[0];
    if (a.phase === 'enter') { if (a.walking) return; if (a === lead) { const sp = SPOTS.find((s) => !s.occ); if (sp && !SPOTS.some((s) => s.occ && s.occ.party !== P && SPOTS.indexOf(s) > SPOTS.indexOf(sp))) { if (sp === SPOTS[1] && !SPOTS[0].occ) { SPOTS[0].occ = a; a.spot = SPOTS[0]; } else { sp.occ = a; a.spot = sp; } a.walkTo = a.spot.x; a.phase = 'queue'; return; } } else if (lead.spot) { a.walkTo = lead.hx - 46; a.phase = 'tag'; return; }
      return K.start(a, 'wait', [K.ph(rand(1, 2), (s) => { s.look = { x: () => 200, until: K.simT + 0.3 }; })]); }
    if (a.phase === 'tag') { if (a.walking) return; if (lead.phase === 'leave' || lead.phase === 'eat' || lead.phase === 'out') { a.phase = lead.phase === 'eat' ? 'toLedge' : 'leave'; return; }
      if (a.type === 'kid' && lead.myCone && !a.myCone) { a.myCone = { sc: [pick([FLAV[1], FLAV[3], FLAV[4]])], cup: false }; a.hold.N = H.cone(a.myCone); K.say(a, 'icon:heart', 1); }
      if (a.walkTo == null && Math.abs(a.hx - (lead.hx - 46)) > 6) a.walkTo = lead.hx - 46; return K.start(a, 'tagwait', [K.ph(rand(0.8, 1.6), (s) => { s.look = { x: () => (lead.myCone ? lead.hx : 160), until: K.simT + 0.3 }; })]); }
    if (a.phase === 'queue') { if (a.walking) return; if (a.spot === SPOTS[1] && !SPOTS[0].occ) { SPOTS[1].occ = null; SPOTS[0].occ = a; a.spot = SPOTS[0]; a.walkTo = SPOTS[0].x; return; }
      if (a.spot === SPOTS[0]) { a.phase = 'front'; a.order = { flav: [pick(FLAV), ...(Math.random() < 0.65 ? [pick(FLAV)] : [])], cup: a.type === 'suit' || Math.random() < 0.25, taste: Math.random() < 0.4 ? pick(TINS.filter((t) => t.x < 330)) : null }; a.f = 1; a.faceDir = 0.8; }
      return K.start(a, 'look', [K.ph(rand(1.5, 2.5), (s) => { s.look = { x: () => pick([120, 220, 300]), until: K.simT + 0.8 }; s.tgN = [s.hx + 30, CASE.top - 10]; })]); }
    if (a.phase === 'front') return K.start(a, 'point', [K.ph(rand(1.2, 2), (s, u) => { s.look = { x: () => 200, until: K.simT + 0.3 }; if (u < 0.5) s.tgN = [s.hx + 46, CASE.top - 6]; })]);
    if (a.phase === 'served') { if (a.act) return; if (a.spot) { a.spot.occ = null; a.spot = null; } const lg = LEDGE.find((q) => !q.occ); if (lg && Math.random() < 0.75) { lg.occ = a; a.ledge = lg; a.phase = 'toLedge'; a.walkTo = lg.x; } else { a.phase = 'walkEat'; a.walkTo = ARCH + 60; } return; }
    if (a.phase === 'toLedge') { if (!a.ledge && a !== lead) { const lg = LEDGE.find((q) => !q.occ); if (lg) { lg.occ = a; a.ledge = lg; a.walkTo = lg.x; } else { a.walkTo = clamp(lead.hx - 60, 930, 1100); a.phase = 'eat'; return; } } if (a.walking) return; a.phase = 'eat'; a.f = 1; a.faceDir = 0.3; return; }
    if (a.phase === 'eat' || a.phase === 'walkEat') {
      const cn = a.myCone; if (a.phase === 'walkEat' && !a.walking) { a.phase = 'out'; return; }
      if (!cn) { if (a.phase === 'eat' && lead.phase === 'leave') a.phase = 'leave'; return K.start(a, 'look', [K.ph(rand(1, 2), (s) => { s.look = { x: () => (Math.random() < 0.5 ? 1060 : lead.hx), until: K.simT + 0.3 }; })]); }
      if (cn.melt >= 0.98) { a.myCone = null; a.hold.N = null; K.say(a, pick(['Buonissimo!', 'icon:heart', 'Grazie!']), 1.2); a.phase = a.phase === 'eat' ? 'leave' : 'walkEat'; if (a.ledge) { a.ledge.occ = null; a.ledge = null; } return; }
      if (a.type === 'kid' && !splat && Math.random() < 0.04 && !a.dropped) return dropScoop(a);
      const r = Math.random(); const mate = P.members.find((m) => m !== a && m.phase === 'eat');
      if (mate && r < 0.18 && K.cooled(a, 'chat', 6)) { K.say(a, pick(a.T0.words), 1.3); K.after(1, () => K.say(mate, pick(mate.T0.words), 1.2)); return K.start(a, 'chat', [K.ph(2, (s) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; })]); }
      if (a.def.camera && r < 0.28 && K.cooled(a, 'photo', 10)) return K.start(a, 'photo', [K.ph(1.2, (s) => { s.tgF = [s.R.cx + 14, s.R.cy + 10]; s.look = { x: () => s.hx + 60, until: K.simT + 0.3 }; }, { exit: () => { K.fx('flash', a.R.cx + 16, a.R.cy + 10); K.say(a, 'icon:cam', 0.8); } })]);
      return K.start(a, 'lick', [K.ph(0.5, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.6, s.R.cy + s.R.R * 1.1]; }), K.ph(0.6, (s, u) => { s.headDy = Math.sin(u * Math.PI) * 3; s.tilt = -0.08; }, { exit: (s) => { cn.melt = Math.min(1, (cn.melt || 0) + rand(0.1, 0.16)); s.headDy = 0; } }), K.ph(rand(0.8, 2), (s) => { s.tgN = [s.hx + s.f * 26, s.hy - 60]; s.look = { x: () => (s.ledge ? 1060 : s.hx + 100), until: K.simT + 0.3 }; })], { onAbort: (s) => { s.headDy = 0; } });
    }
    if (a.phase === 'leave') { if (a.ledge) { a.ledge.occ = null; a.ledge = null; } if (a.spot) { a.spot.occ = null; a.spot = null; } a.phase = 'out'; a.walkTo = ARCH + 70; return; }
    if (a.phase === 'out') { if (!a.walking) { a.fade = -2; if (a.dog) a.dog.fade = -2; } else if (a.hx > ARCH) { a.fade = -1.4; if (a.dog) a.dog.fade = -1.4; } }
  }
  function dropScoop(a) {
    a.dropped = 1; const f = a.myCone.sc.pop(); if (!f) return;
    splat = { x: a.hx + 22, y: FL - 4, f, t: 0 }; K.say(a, 'icon:sad', 1.4);
    K.after(1.2, () => { K.say(giulia, pick(['Tranquillo! Un altro!', 'Non piangere!']), 1.4); a.myCone.sc.push(f); a.myCone.melt = 0; K.say(a, 'icon:heart', 1.2); });
    K.after(9, () => { splat = null; });
    return K.start(a, 'oops', [K.ph(1.5, (s) => { s.look = { x: () => s.hx + 30, until: K.simT + 0.3 }; s.headDy = 3; }, { exit: (s) => { s.headDy = 0; } })]);
  }
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    nextArrive -= dt; const p = per();
    if (nextArrive <= 0) { const target = [2.5, 3, 4, 3, 0][p] * (cool('rain') || cool('snow') ? 0.6 : 1); if (custs().length < target) arrive(); nextArrive = rand(9, 16); }
    for (const d of K.actors.filter((q) => q.isDog)) { const w = d.owner; if (!w || w.gone) { d.fade = -2; continue; } const tx = w.hx - 30; d.hx += clamp(tx - d.hx, -90 * dt, 90 * dt); d.walking = Math.abs(tx - d.hx) > 2; d.f = w.f; d.alpha = Math.min(d.alpha, w.alpha); if (d.cup) d.cupT = (d.cupT || 0) + dt; }
    const h = ((K.hour % 24) + 24) % 24; shutter = K.ease(shutter, h >= 10.2 && h < 23 ? 0 : 1, 1.5, dt); sign = h >= 10.2 && h < 22.5 ? 1 : 0;
    vespa.t += dt; if (vespa.on && vespa.t > 50 && Math.random() < dt / 20) { vespa.on = 0; vespa.t = 0; vespa.go = 1; } if (vespa.go) { vespa.x += 140 * dt; if (vespa.x > 1300) { vespa.go = 0; vespa.away = 1; } } if (vespa.away && vespa.t > 25) { vespa.away = 0; vespa.back = 1; vespa.x = 900; } if (vespa.back) { vespa.x += 90 * dt; if (vespa.x >= 1060) { vespa.x = 1060; vespa.back = 0; vespa.on = 1; vespa.t = 0; } }
    if (splat) splat.t += dt;
    if (h >= 10 && h < 10.4) for (const t of TINS) t.lid = 0;
  }
  function onClear(Kk, big, n) {
    for (const c of custs()) if (c.phase === 'eat' && (!c.act || c.act.name === 'look' || c.act.name === 'lick')) { if (big || Math.random() < 0.4) K.say(c, pick(['Bravo!', 'icon:heart', 'Che bello!', 'icon:star']), 1.2); }
    K.say(giulia, pick(big ? ['Fantastico!', 'icon:star'] : ['Brava!', 'icon:note']), 1.2); if (big) K.say(marco, 'Bravissimo!', 1.2);
  }
  function build(Kk) { K = Kk; mkStaff(); const h = ((K.hour % 24) + 24) % 24; shutter = h >= 10.2 && h < 23 ? 0 : 1; nextArrive = 1; }
  /* ---------- drawing ---------- */
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    // pastel tile band (checker) behind the shop + scalloped awning frieze
    for (let j = 0; j < 8; j++) for (let i = 0; i < 54; i++) { c.fillStyle = (i + j) % 2 ? P.tile : P.tile2; c.fillRect(-60 + i * 26, 300 + j * 26, 26, 26); }
    c.fillStyle = P.trim; c.fillRect(-60, 296, 1400, 5);
    c.fillStyle = P.awn; c.fillRect(-60, 0, 1400, 40); for (let x = -60; x < 1340; x += 40) { c.fillStyle = ((x / 40) | 0) % 2 ? P.awn : P.awn2; c.fillRect(x, 0, 40, 40); c.beginPath(); c.arc(x + 20, 40, 20, 0, Math.PI); c.fill(); }
    // centre: arched menu board (calm)
    c.fillStyle = P.woodDk; c.beginPath(); c.moveTo(500, 280); c.lineTo(500, 150); c.arc(640, 150, 140, Math.PI, TAU); c.lineTo(780, 280); c.closePath(); c.fill();
    c.fillStyle = L('#2e3a38'); c.beginPath(); c.moveTo(510, 272); c.lineTo(510, 152); c.arc(640, 152, 130, Math.PI, TAU); c.lineTo(770, 272); c.closePath(); c.fill();
    c.fillStyle = L('#f4ecd8'); c.font = 'italic 700 26px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Gelato', 640, 88); c.font = '600 11px Georgia, serif'; c.fillText('ARTIGIANALE', 640, 112);
    FLAV.forEach((f, i) => { const y = 136 + i * 19; c.fillStyle = L(f.c); c.beginPath(); c.arc(560, y, 5, 0, TAU); c.fill(); c.fillStyle = L('#f4ecd8'); c.font = '600 12px Georgia, serif'; c.textAlign = 'left'; c.fillText(f.n, 574, y + 1); c.textAlign = 'right'; c.fillText('€ ' + (2.5 + (i % 3) * 0.5).toFixed(2), 724, y + 1); });
    // ceiling fan, turning slowly
    c.fillStyle = P.woodDk; c.fillRect(858, 40, 4, 30); c.save(); c.translate(860, 72); c.scale(1, 0.18); for (let i = 0; i < 3; i++) { c.rotate(TAU / 3); c.fillStyle = P.wood; c.save(); c.rotate(t * 1.2); ellipse(c, 70, 0, 66, 14); c.fill(); c.restore(); } c.restore(); c.fillStyle = P.woodDk; ellipse(c, 860, 72, 10, 5); c.fill();
    // back shelf on the left: cone boxes, jars of toppings
    c.fillStyle = P.wood; c.fillRect(30, 230, 400, 10); for (let i = 0; i < 6; i++) { const x = 44 + i * 64; c.fillStyle = L(['#f2c84a', '#e86a7a', '#7ac0b8', '#f4ecd8', '#c8a050', '#b49ae0'][i]); roundRect(c, x, 186, 40, 44, 4); c.fill(); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(x + 6, 192, 6, 32); }
    c.fillStyle = P.wood; c.fillRect(30, 160, 400, 8);
    // window onto the piazza
    const { x0, y0, x1, y1 } = WIN; c.fillStyle = P.wood; c.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip(); K.sky(c, x0, y0, x1, y1, { sunR: 14 });
    c.fillStyle = P.city; c.fillRect(x0, y0 + 120, 90, 300); c.fillStyle = P.city2; c.fillRect(x0 + 100, y0 + 90, 110, 300); c.fillStyle = L('#4a6a5a'); for (let i = 0; i < 6; i++) c.fillRect(x0 + 14 + (i % 2) * 40 + Math.floor(i / 2) * 100 * (i % 2 ? 1 : 0), y0 + 140 + Math.floor(i / 2) * 50, 18, 28); // shutters
    if (P.night > 0.3) { c.fillStyle = rgba('#ffd890', P.night); for (let i = 0; i < 4; i++) c.fillRect(x0 + 120 + (i % 2) * 44, y0 + 120 + Math.floor(i / 2) * 60, 16, 24); }
    c.fillStyle = P.cobble; c.fillRect(x0, y1 - 80, x1 - x0, 80); c.strokeStyle = 'rgba(0,0,0,0.1)'; c.lineWidth = 1; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(x0, y1 - 70 + i * 13); c.lineTo(x1, y1 - 70 + i * 13); c.stroke(); }
    // fountain
    { const fx = x0 + 150, fy = y1 - 40; c.fillStyle = L('#d8d0c4'); c.fillRect(fx - 40, fy - 14, 80, 18); c.fillRect(fx - 6, fy - 50, 12, 40); c.fillStyle = L('#bcb2a4'); ellipse(c, fx, fy - 50, 18, 4); c.fill(); c.strokeStyle = 'rgba(200,230,250,0.75)'; c.lineWidth = 2; for (let i = -1; i <= 1; i += 2) { c.beginPath(); c.moveTo(fx, fy - 56); c.quadraticCurveTo(fx + i * 18, fy - 70 - Math.sin(t * 6) * 2, fx + i * 26, fy - 16); c.stroke(); } }
    // passeggiata: strollers crossing the piazza (busier at dusk)
    const n = [1, 1, 3, 2, 0][per()]; for (let i = 0; i < n; i++) { const sp = 18 + i * 6, xx = x0 - 40 + ((t * sp + i * 97) % (x1 - x0 + 80)), yy = y1 - 50 + i * 6; c.fillStyle = L([P.coral, P.navy, P.mustard][i]); K.poly(c, [xx - 7, yy, xx + 7, yy, xx + 4, yy - 34, xx - 4, yy - 34]); c.fill(); c.fillStyle = P.skin; c.beginPath(); c.arc(xx, yy - 40, 6, 0, TAU); c.fill(); }
    // Vespa
    if (vespa.on || vespa.go || vespa.back) { const vx = vespa.x, vy = y1 - 18; c.fillStyle = L('#7ac0b0'); c.beginPath(); c.moveTo(vx - 24, vy - 6); c.quadraticCurveTo(vx - 26, vy - 26, vx - 4, vy - 24); c.lineTo(vx + 14, vy - 8); c.lineTo(vx + 24, vy - 10); c.lineTo(vx + 26, vy - 4); c.lineTo(vx - 24, vy - 4); c.fill(); c.fillRect(vx + 14, vy - 34, 4, 26); c.fillStyle = L('#3a2a2a'); c.fillRect(vx - 18, vy - 30, 18, 5); c.beginPath(); c.arc(vx - 16, vy - 2, 6, 0, TAU); c.arc(vx + 20, vy - 2, 6, 0, TAU); c.fill(); }
    K.weather(c, x0, y0, x1, y1); if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(x0, y1 - 82, x1 - x0, 5); } c.restore();
    c.strokeStyle = P.wood; c.lineWidth = 6; c.beginPath(); c.moveTo((x0 + x1) / 2, y0); c.lineTo((x0 + x1) / 2, y1); c.moveTo(x0, y0 + 120); c.lineTo(x1, y0 + 120); c.stroke();
    // neon GELATO in the window
    c.font = 'italic 800 30px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; const na = P.neonA * sign;
    c.fillStyle = na > 0.05 ? rgba(P.neon, 0.3 + na * 0.7) : rgba(P.trim, 0.5); c.fillText('Gelato', (x0 + x1) / 2, y0 + 60); if (na > 0.05) K.glow(c, (x0 + x1) / 2, y0 + 60, 120, P.neon, 0.35 * na);
    // archway (street door on the right)
    c.fillStyle = P.woodDk; c.fillRect(ARCH - 10, 150, 90, 500); c.save(); c.beginPath(); c.rect(ARCH, 160, 70, 490); c.clip(); K.sky(c, ARCH, 160, ARCH + 70, 470, { noSun: 1 }); c.fillStyle = P.cobble; c.fillRect(ARCH, 470, 70, 200); K.weather(c, ARCH, 160, ARCH + 70, 650); c.restore();
    // waffle-cone station
    c.fillStyle = P.case2; c.fillRect(IRON.x - 60, IRON.top, 130, 140); c.fillStyle = P.steel; c.fillRect(IRON.x - 64, IRON.top - 4, 138, 6);
    c.fillStyle = L('#4a4a50'); c.fillRect(IRON.x - 22, IRON.top - 16, 44, 12); c.save(); c.translate(IRON.x - 22, IRON.top - 16); c.rotate(-iron.open * 1.1); c.fillStyle = L('#5a5a62'); c.fillRect(0, -10, 44, 10); c.fillStyle = L('#2a2a2e'); c.fillRect(40, -14, 18, 4); c.restore();
    if (iron.batter && iron.open) { c.fillStyle = L('#f4dca0'); ellipse(c, IRON.x, IRON.top - 16, 16, 3); c.fill(); }
    if (iron.cone) { const u = iron.cone - 1; c.fillStyle = L('#d8a058'); if (u <= 0) { ellipse(c, IRON.x, IRON.top - 17, 18, 3.4); c.fill(); } else { K.poly(c, [IRON.x + 26 - 8 * (1 - u), IRON.top - 26, IRON.x + 26 + 8 * (1 - u) + 8 * u, IRON.top - 26, IRON.x + 26 + 4 * u, IRON.top - 6]); c.fill(); } }
    if (iron.steam) { c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = 2.5; c.lineCap = 'round'; for (let i = 0; i < 3; i++) { const u = (t * 0.7 + i / 3) % 1; c.globalAlpha = Math.sin(u * Math.PI); c.beginPath(); c.moveTo(IRON.x - 10 + i * 10, IRON.top - 24 - u * 40); c.quadraticCurveTo(IRON.x - 4 + i * 10, IRON.top - 30 - u * 40, IRON.x - 10 + i * 10, IRON.top - 38 - u * 40); c.stroke(); } c.globalAlpha = 1; c.lineCap = 'butt'; }
    c.fillStyle = P.steel; c.fillRect(IRON.x + 30, IRON.top - 8, 30, 4); for (let i = 0; i < rack; i++) cone(c, IRON.x + 34 + i * 6, IRON.top - 6, 0.55, []); // cone rack
    c.fillStyle = L('#f4ecd8'); c.fillRect(IRON.x - 54, IRON.top - 30, 26, 26); c.fillStyle = L('#f4dca0'); c.fillRect(IRON.x - 52, IRON.top - 22, 22, 16); // batter jug
    // ledge under the window
    c.fillStyle = P.wood; c.fillRect(WIN.x0 - 14, LEDGE_Y - 8, WIN.x1 - WIN.x0 + 28, 10); c.fillStyle = P.woodDk; c.fillRect(WIN.x0 - 8, LEDGE_Y + 2, 6, 140); c.fillRect(WIN.x1 + 2, LEDGE_Y + 2, 6, 140);
    // street door on the left (customers enter)
    c.fillStyle = P.woodDk; c.fillRect(-40, 300, 70, 360); c.fillStyle = rgba(P.glass, 0.5); c.fillRect(-30, 320, 50, 200);
    // shutter (rolled down outside opening hours) over the window
    if (shutter > 0.02) { c.fillStyle = L('#a8a8a8'); c.fillRect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, (WIN.y1 - WIN.y0) * shutter); c.strokeStyle = 'rgba(0,0,0,0.15)'; for (let y = WIN.y0; y < WIN.y0 + (WIN.y1 - WIN.y0) * shutter; y += 8) { c.beginPath(); c.moveTo(WIN.x0, y); c.lineTo(WIN.x1, y); c.stroke(); } }
    // APERTO / CHIUSO sign on the archway
    c.fillStyle = L('#fbf4ea'); c.fillRect(ARCH + 8, 300, 54, 20); c.fillStyle = sign ? L('#2a8a5a') : L('#c42a2a'); c.font = '800 11px sans-serif'; c.textAlign = 'center'; c.fillText(sign ? 'APERTO' : 'CHIUSO', ARCH + 35, 311);
  }
  function drawCase(c, t) {
    const P = K.P, { x0, x1, top, base } = CASE;
    // tins (seen through the glass), sculpted mounds with garnish + a spatola
    c.fillStyle = P.steel; c.fillRect(x0 + 4, top + 34, x1 - x0 - 8, 8);
    for (const tn of TINS) { const x = tn.x, y = top + 38, f = tn.f; c.fillStyle = L('#b8c0c4'); c.fillRect(x - 24, y - 4, 48, 10); if (tn.lid) { c.fillStyle = P.steel; c.fillRect(x - 25, y - 8, 50, 6); continue; }
      const h = 6 + tn.lvl * 26; c.fillStyle = L(f.c); c.beginPath(); c.moveTo(x - 23, y - 2); c.quadraticCurveTo(x - 22, y - h, x - 6, y - h - 2); c.quadraticCurveTo(x + 4, y - h + 6, x + 10, y - h + 2); c.quadraticCurveTo(x + 22, y - h + 4, x + 23, y - 2); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,0.45)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 16, y - h * 0.55); c.quadraticCurveTo(x, y - h * 0.8, x + 14, y - h * 0.5); c.stroke(); c.strokeStyle = 'rgba(0,0,0,0.12)'; c.beginPath(); c.moveTo(x - 18, y - h * 0.3); c.quadraticCurveTo(x, y - h * 0.5, x + 18, y - h * 0.28); c.stroke();
      c.fillStyle = L(f.g); for (let i = 0; i < 4; i++) c.fillRect(x - 8 + i * 5, y - h + 2 + (i % 2) * 3, 3, 3);
      c.fillStyle = L('#3a2a2a'); c.save(); c.translate(x + 12, y - h + 2); c.rotate(0.5); c.fillRect(-1.5, -20, 3, 14); c.fillStyle = P.steel; c.fillRect(-2, -6, 4, 12); c.restore(); }
    // glass: curved front pane
    c.fillStyle = rgba(P.glass, 0.35); c.beginPath(); c.moveTo(x0, top + 44); c.quadraticCurveTo(x0 + 6, top - 40, x0 + 60, top - 44); c.lineTo(x1, top - 44); c.lineTo(x1, top + 44); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, top + 44); c.quadraticCurveTo(x0 + 6, top - 40, x0 + 60, top - 44); c.lineTo(x1, top - 44); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.25)'; K.poly(c, [x0 + 90, top - 44, x0 + 120, top - 44, x0 + 80, top + 44, x0 + 50, top + 44]); c.fill();
    // case body
    c.fillStyle = P.case; c.fillRect(x0 - 6, top + 44, x1 - x0 + 12, base - top - 44); c.fillStyle = P.case2; c.fillRect(x0 - 6, top + 44, x1 - x0 + 12, 8); c.fillStyle = P.trim; c.fillRect(x0 - 6, base - 30, x1 - x0 + 12, 5);
    c.fillStyle = P.steel; c.fillRect(x0 - 8, top - 48, x1 - x0 + 16, 5); // top ledge
    for (let i = 0; i < 4; i++) { c.fillStyle = rgba(P.trim, 0.4); c.beginPath(); c.arc(x0 + 50 + i * 100, top + 100, 18, 0, TAU); c.fill(); }
    // cone stand + coin tray on top
    c.fillStyle = P.steel; c.fillRect(STAND.x - 18, top - 52, 36, 4); for (let i = 0; i < Math.min(STAND.n, 6); i++) cone(c, STAND.x - 14 + (i % 3) * 14, top - 50 - Math.floor(i / 3) * 6, 0.62, []);
    c.fillStyle = L('#f4ecd8'); c.fillRect(214, top - 54, 30, 6); c.fillStyle = L('#e8c050'); for (let i = 0; i < Math.min(coins, 6); i++) c.fillRect(217 + (i % 3) * 8, top - 56 - Math.floor(i / 3) * 2, 6, 2);
    c.fillStyle = L('#e8f0f0'); c.fillRect(260, top - 64, 10, 16); for (let i = 0; i < 4; i++) c.fillRect(262 + i * 1.5, top - 72, 1, 8); // taster spoons
  }
  function drawDog(c, d) {
    if (d.alpha < 0.02) return; c.save(); c.globalAlpha = d.alpha; const x = d.hx, y = d.floorY, f = d.f, wag = Math.sin(K.t * 14) * 0.5, st = d.walking ? Math.sin(K.t * 14) * 4 : 0;
    c.fillStyle = L('#c08a5a'); roundRect(c, x - 18, y - 30, 36, 16, 8); c.fill(); c.fillRect(x - 14 + st, y - 16, 5, 16); c.fillRect(x + 9 - st, y - 16, 5, 16);
    c.beginPath(); c.arc(x + f * 20, y - 34, 10, 0, TAU); c.fill(); c.fillStyle = L('#8a5a3a'); ellipse(c, x + f * 16, y - 38, 4, 8, f * 0.4); c.fill(); c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(x + f * 29, y - 33, 2, 0, TAU); c.fill(); c.beginPath(); c.arc(x + f * 22, y - 36, 1.4, 0, TAU); c.fill();
    c.strokeStyle = L('#c08a5a'); c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - f * 18, y - 26); c.lineTo(x - f * 28, y - 38 + wag * 6); c.stroke(); c.lineCap = 'butt';
    if (d.owner && d.owner.alpha > 0.1) { c.strokeStyle = L('#c42a2a'); c.lineWidth = 1.2; c.beginPath(); c.moveTo(x + f * 14, y - 30); c.quadraticCurveTo((x + d.owner.hx) / 2, y - 10, d.owner.hN.x, d.owner.hN.y); c.stroke(); }
    if (d.cup && d.cupT < 12) { cone(c, x + f * 34, y, 0.8, [FLAV[6]], Math.min(1, d.cupT / 12), true); }
    c.restore();
  }
  function draw(c, t, Kk) {
    const P = K.P;
    drawRoom(c, t);
    // lamps
    for (const x of [150, 330, 1038]) { c.strokeStyle = P.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, 40); c.lineTo(x, 120); c.stroke(); c.fillStyle = P.trim; K.poly(c, [x - 16, 120, x + 16, 120, x + 24, 140, x - 24, 140]); c.fill(); c.fillStyle = P.lamp; ellipse(c, x, 141, 10, 3); c.fill(); K.glow(c, x, 150, 130, P.glow, P.glowA); }
    // floor
    c.fillStyle = P.floor; c.fillRect(-60, 640, 1400, 100 + K.extraB); for (let i = 0; i < 40; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 36, 650 + j * 26, 36, 26); }
    // staff behind the case / at the iron
    K.drawBody(c, giulia, true);
    drawCase(c, t);
    K.drawBody(c, marco, true);
    c.fillStyle = P.case; c.fillRect(IRON.x - 60, IRON.top + 60, 130, 80); // front of the cone counter hides Marco's legs
    if (splat) { const f = splat.f; c.fillStyle = L(f.c); ellipse(c, splat.x, splat.y, 14 + Math.min(4, splat.t * 4), 4); c.fill(); }
    for (const a of K.actors.filter((q) => q.cust)) { if (a.isDog) { drawDog(c, a); continue; } if (a.alpha > 0.05) { c.fillStyle = 'rgba(0,0,0,0.16)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    K.shafts(c, [[WIN.x0, WIN.x1, WIN.x0 - 140, WIN.x1 - 100, WIN.y1, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) if (!a.isDog) K.drawBubble(c, a); for (const d of K.actors.filter((q) => q.isDog)) if (d.bub) { d.R = { cx: d.hx + d.f * 20, cy: d.floorY - 40, R: 10 }; K.drawBubble(c, d); }
  }
  function icon(c, name, x, y, r) {
    if (name === 'sad') { c.fillStyle = K.P.ink; c.font = `800 ${r * 0.9}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('noo!', x, y); return true; }
    return false;
  }
  function onGone(Kk, a) { if (a.spot) a.spot.occ = null; if (a.ledge) a.ledge.occ = null; if (a.dog) a.dog.gone = true; }
  return GeoKit.stage({ id: 'gelato', pal: GelPal, startHour: 10, span: 13.5, build, sim, draw, onClear, onGone, icon, font: 'italic 700 15px Georgia, serif', vign: 'rgba(40,20,20,0.28)',
    debug: () => ({ tins: TINS.map((t) => t.f.k.slice(0, 3) + t.lvl.toFixed(1)).join(' '), stand: STAND.n, rack, coins, custs: custs().map((a) => a.type + ':' + a.phase).join(' ') }) });
}
registerStage('gelato', makeGeoGelatoStage);
