/* ================= World 6 · The Fish House — GEOMETRIC edition (harbour fine dining, flat planes) =================
   An oyster bar on crushed ice (Ana shucks: knife twist, top shell off, onto the platter; the guest slurps, shells pile up),
   a huge harbour window behind the board (calm water, moored boats, a lighthouse that sweeps at night), and one candlelit
   table for two by the kitchen pass. Henri seats the guests, presents and pours the wine (glasses fill), carries plates
   under cloches from the pass (chef's bell), lifts them tableside (steam), clears, lights the candles at dusk.
   Signature: a proposal (ring box, "Yes!"). Surprise: a fishing boat chugs in with its lights; a gull lands on the sill.
   Clock 12:00 lunch -> afternoon -> golden hour -> candlelit night -> closing. */
const FishPal = GeoKit.palette({
  lunch: { wall: '#e8e4dc', wall2: '#d8d2c6', wood: '#5a3e2e', woodDk: '#3a2618', trim: '#2e4a5a', brass: '#c8a050', ice: '#e8f4f8', ice2: '#bcd8e2', cloth: '#fbfaf6', clothSh: '#e0ded6', floor: '#6a5040', floor2: '#5a4234', sky0: '#7ab8e8', sky1: '#dcecf6', sea: '#3a7aa0', sea2: '#5a9ac0', hill: '#7a9a8a', hill2: '#9ab4a4', lamp: '#ffe2a8', glow: '#ffd890', glowA: 0.08, candle: '#ffb860', shaft: '#ffffff', shaftA: 0.14, amb: '#ffffff', ambK: 0, sun: '#fffbe8',
    skin: '#ecb890', bubble: '#ffffff', ink: '#1e2228', navy: '#22344e', coral: '#d8584a', mustard: '#d8a83a', teal: '#2a7a80', cream: '#f2e8d8', olive: '#6a7240', plum: '#6a3a5a', grey: '#9a9c9e', brown: '#5e4030', white: '#fcfaf6', dark: '#1a1c20', hairGrey: '#d8d4d0' },
  after: { wall: '#ece4d6', wall2: '#dcd0bc', wood: '#5e402e', woodDk: '#3c2818', trim: '#2e4a5a', brass: '#d0a850', ice: '#ecf4f6', ice2: '#c0d8e0', cloth: '#fbf8f0', clothSh: '#e2dcd0', floor: '#6e5242', floor2: '#5c4436', sky0: '#8abce4', sky1: '#f0e4d0', sea: '#3e7a9a', sea2: '#6a9ab8', hill: '#7a9684', hill2: '#a4b49c', lamp: '#ffe0a0', glow: '#ffd080', glowA: 0.1, candle: '#ffb860', shaft: '#fff4dc', shaftA: 0.18, amb: '#fff8f0', ambK: 0, sun: '#fff0d0',
    skin: '#ecb48c', bubble: '#fffcf6', ink: '#1e2228', navy: '#22344e', coral: '#d8584a', mustard: '#d8a83a', teal: '#2a7a80', cream: '#f2e6d4', olive: '#6a7240', plum: '#6a3a5a', grey: '#9a9a9a', brown: '#5e4030', white: '#fcf8f2', dark: '#1a1c20', hairGrey: '#d8d2cc' },
  golden: { wall: '#e8c8a4', wall2: '#d4aa84', wood: '#4e301e', woodDk: '#30180c', trim: '#2a3a4e', brass: '#e0a848', ice: '#f4e4dc', ice2: '#d8bcb4', cloth: '#f8eadc', clothSh: '#dcc4ac', floor: '#5e3e2c', floor2: '#4e3222', sky0: '#5a5a9a', sky1: '#ffa86a', sea: '#6a5a8a', sea2: '#e8906a', hill: '#5a4a6a', hill2: '#8a6a7a', lamp: '#ffc070', glow: '#ffa850', glowA: 0.3, candle: '#ffa848', shaft: '#ffb070', shaftA: 0.24, amb: '#ffd0a8', ambK: 0.06, sun: '#ffc080',
    skin: '#e0a07a', bubble: '#fff4e6', ink: '#24181c', navy: '#22304a', coral: '#cc4c44', mustard: '#d09830', teal: '#26707a', cream: '#ecd8c0', olive: '#5e6638', plum: '#643454', grey: '#8e8686', brown: '#563826', white: '#f6ecdc', dark: '#1a1418', hairGrey: '#ccc0b4' },
  night: { wall: '#3a3a48', wall2: '#30303e', wood: '#3a2418', woodDk: '#22120a', trim: '#1a2434', brass: '#c08a3a', ice: '#a8c4d4', ice2: '#7a98ac', cloth: '#d8ccc0', clothSh: '#a89a8c', floor: '#3a2820', floor2: '#2e1e18', sky0: '#060c22', sky1: '#18244a', sea: '#0e1a34', sea2: '#1e3054', hill: '#10162a', hill2: '#1a2238', lamp: '#ffb860', glow: '#ff9a40', glowA: 0.45, candle: '#ffa040', shaft: '#c0d8ff', shaftA: 0.0, amb: '#283048', ambK: 0.18, sun: '#f4ecd8',
    skin: '#c08868', bubble: '#f4ece4', ink: '#141418', navy: '#1a2640', coral: '#a84040', mustard: '#b08028', teal: '#1e5660', cream: '#d4c0aa', olive: '#464c2c', plum: '#4e2a44', grey: '#706c70', brown: '#463020', white: '#e4dad0', dark: '#121216', hairGrey: '#a8a0a0' },
  snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', hill: '#d8dee6', hill2: '#eef0f4' },
}, [[6, 'night'], [9, 'lunch'], [14, 'lunch'], [16.5, 'after'], [18.5, 'golden'], [20.5, 'night'], [30, 'night'], [33, 'lunch']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 15 ? 'Lunch' : h < 17.5 ? 'Afternoon' : h < 20 ? 'Golden hour' : h < 22.5 ? 'Dinner' : 'Closing'; } });

function makeGeoFishhouseStage() {
  const BAR = { x0: 24, x1: 452, top: 500 }, SF = 606, SSC = 0.86, FL = 712, SC = 0.84;
  const STOOLS = [{ x: 84, occ: null }, { x: 204, occ: null }];
  const TB = { x: 1148, top: 566, seats: [{ x: 1074, f: 1, occ: null }, { x: 1222, f: -1, occ: null }] };
  const WIN = { x0: 300, y0: 96, x1: 990, y1: 470 }, PASS = { x: 1262 }, BUCKET = { x: 1036 };
  const DISHES = [{ n: 'Oysters', k: 'oyster', c: '#bccad2' }, { n: 'Seared scallops', k: 'scallop', c: '#e8b060' }, { n: 'Lobster thermidor', k: 'lobster', c: '#d8341e' }, { n: 'Salmon, dill', k: 'salmon', c: '#ff8a62' }, { n: 'Grilled octopus', k: 'octopus', c: '#b0607a' }, { n: 'Moules marinières', k: 'mussel', c: '#2a3050' }];
  let K, ana, henri, platter = { n: 0, x: 0, on: false, owner: null, shells: 0 }, tray = 0, shellBucket = 0, table = { plates: [], glasses: [{ lv: 0 }, { lv: 0 }], bottle: 0, candle: 0, cloche: null, party: null, menu: 0, ring: 0 }, boat = null, gull = null, nextArrive = 2, nextBoat = 60, nextGull = 40, bell = 0, sign = 1;
  const L = (h) => K.L(h), B = GeoKit.body;
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 15 ? 0 : h < 17.5 ? 1 : h < 20 ? 2 : h < 22.5 ? 3 : 4; };
  const guests = () => K.actors.filter((a) => a.cust);
  const cool = (k) => K.weatherNow === k;
  const plateX = (i) => TB.x + (i ? 34 : -34), glassX = (i) => TB.x + (i ? 70 : -66);
  /* ---------- props ---------- */
  function dish(c, x, y, s, d, frac = 1) { // plate with food; y = table line
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#fbfaf6'); ellipse(c, 0, -1, 18, 4.5); c.fill(); c.strokeStyle = L('#d8d4cc'); c.lineWidth = 0.8; c.beginPath(); c.ellipse(0, -1, 13, 3, 0, 0, TAU); c.stroke();
    if (d && frac > 0.02) { const w = 11 * Math.sqrt(frac); c.fillStyle = L(d.c); if (d.k === 'oyster' || d.k === 'scallop' || d.k === 'mussel') { const n = Math.max(1, Math.round(3 * frac)); for (let i = 0; i < n; i++) { ellipse(c, -6 + i * 6, -3, 3.4, 2.4); c.fill(); } } else { c.beginPath(); c.moveTo(-w, -2); c.quadraticCurveTo(0, -9 * frac - 2, w, -2); c.fill(); } c.fillStyle = L('#5a9a3a'); c.fillRect(-2, -5, 3, 1.5); }
    c.restore();
  }
  function wineGlass(c, x, y, s, lv, tilt = 0) { c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s); c.strokeStyle = 'rgba(230,245,250,0.7)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -10); c.stroke(); c.fillStyle = 'rgba(230,245,250,0.6)'; ellipse(c, 0, 0, 5, 1.2); c.fill(); const bowl = [-6, -24, 6, -24, 7, -16, 4, -10, -4, -10, -7, -16]; c.fillStyle = 'rgba(230,245,250,0.25)'; K.poly(c, bowl); c.fill(); if (lv > 0.02) { c.save(); K.poly(c, bowl); c.clip(); c.fillStyle = L('#f2e08a'); c.fillRect(-8, lerp(-10, -20, lv), 16, 14); c.restore(); } c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-6, -24); c.lineTo(6, -24); c.stroke(); c.restore(); }
  function oyster(c, x, y, s, open = true) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#7a7a70'); ellipse(c, 0, 0, 7, 4, -0.2); c.fill(); if (open) { c.fillStyle = L('#e8e4dc'); ellipse(c, 0, -0.5, 5.5, 3, -0.2); c.fill(); c.fillStyle = L('#c8c4b0'); ellipse(c, 0.5, -0.5, 3, 1.8, -0.2); c.fill(); } else { c.fillStyle = L('#8a8a80'); ellipse(c, 0, -1.5, 6.5, 3.4, -0.2); c.fill(); } c.restore(); }
  const H = {
    plate: (d, cl) => ({ d, draw(c, x, y, s) { dish(c, x, y + 6 * s, s, this.d, 1); if (cl) { c.fillStyle = L('#d8dce0'); c.beginPath(); c.arc(x, y + 4 * s, 15 * s, Math.PI, TAU); c.fill(); c.fillStyle = L('#f0f2f4'); c.fillRect(x - 2 * s, y - 13 * s, 4 * s, 3 * s); } } }),
    bottle: () => ({ draw(c, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(a.potTilt ? -a.f * a.potTilt * 1.7 : 0); c.fillStyle = L('#2a4a2a'); roundRect(c, -4 * s, -8 * s, 8 * s, 30 * s, 3 * s); c.fill(); c.fillRect(-1.6 * s, -18 * s, 3.2 * s, 11 * s); c.fillStyle = L('#f2ead8'); c.fillRect(-3.4 * s, 2 * s, 6.8 * s, 8 * s); c.fillStyle = L('#c8a050'); c.fillRect(-1.8 * s, -19 * s, 3.6 * s, 3 * s); c.restore(); } }),
    glass: (i) => ({ draw(c, x, y, s, a) { wineGlass(c, x, y + 12 * s, s * 1.1, table.glasses[i].lv, -(a.cupTilt || 0) * a.f * 0.9); } }),
    fork: (bite) => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - a.f * 4 * s, y + 2 * s); c.lineTo(x + a.f * 14 * s, y - 4 * s); c.stroke(); if (bite) { c.fillStyle = L(bite); c.beginPath(); c.arc(x + a.f * 15 * s, y - 5 * s, 2.6 * s, 0, TAU); c.fill(); } } }),
    menu: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#2e4a5a'); c.fillRect(x - 2 * s, y - 24 * s, a.f * 22 * s, 30 * s); c.fillStyle = L('#c8a050'); c.fillRect(x + a.f * 4 * s, y - 18 * s, a.f * 12 * s, 2 * s); } }),
    knife: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#c8ccd0'); c.fillRect(x - 1 * s, y - 10 * s, 2 * s, 8 * s); c.fillStyle = L('#5a3a2a'); c.fillRect(x - 2 * s, y - 2 * s, 4 * s, 8 * s); } }),
    oyster: (open) => ({ draw(c, x, y, s) { oyster(c, x, y, s * 1.2, open); } }),
    shell: () => ({ draw(c, x, y, s) { c.fillStyle = L('#8a8a80'); ellipse(c, x, y, 6 * s, 3 * s, -0.3); c.fill(); } }),
    platter: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c8ccd0'); ellipse(c, x, y + 4 * s, 22 * s, 5 * s); c.fill(); c.fillStyle = L('#e8f4f8'); ellipse(c, x, y + 2 * s, 19 * s, 3.5 * s); c.fill(); for (let i = 0; i < platter.n; i++) oyster(c, x - 14 * s + (i % 3) * 14 * s, y + 1 * s - Math.floor(i / 3) * 3 * s, s * 0.8, true); } }),
    lighter: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#2a2a2a'); c.fillRect(x, y - 2 * s, a.f * 24 * s, 3 * s); c.fillStyle = '#ffb040'; c.beginPath(); c.arc(x + a.f * 26 * s, y - 1 * s, 2 * s, 0, TAU); c.fill(); } }),
    ring: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c42a3a'); c.fillRect(x - 5 * s, y - 4 * s, 10 * s, 8 * s); c.fillStyle = '#ffe080'; c.beginPath(); c.arc(x, y - 6 * s, 2.6 * s, 0, TAU); c.fill(); c.fillStyle = '#ffffff'; c.fillRect(x - 0.8 * s, y - 9.5 * s, 1.6 * s, 1.6 * s); } }),
    card: () => ({ draw(c, x, y, s) { c.fillStyle = L('#1a1c20'); c.fillRect(x - 9 * s, y - 2 * s, 18 * s, 4 * s); } }),
    mallet: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#8a6a3a'); c.fillRect(x - 1.5 * s, y - 14 * s, 3 * s, 16 * s); c.fillStyle = L('#5a4028'); c.fillRect(x - 6 * s, y - 20 * s, 12 * s, 7 * s); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
  };
  /* ---------- staff ---------- */
  function mkStaff() {
    ana = K.mk(B({ T: 232, hw: 60, headR: 29, pattern: 'apron', top: 'navy', top2: 'white', shirt: 'white', hairStyle: 'bun', pants: 'dark' }), { role: 'shucker', staff: 1, hx: 180, f: 1, floorY: SF, sc: SSC, faceDir: 0.5 });
    henri = K.mk(B({ T: 250, hw: 62, headR: 29, pattern: 'suit', top: 'dark', shirt: 'white', tie: 'dark', pants: 'dark', hairStyle: 'short', hairD: 0.03 }), { role: 'waiter', staff: 1, hx: 1250, f: -1, floorY: SF + 4, sc: SSC * 0.96, faceDir: -0.5, speed: 1.1, posture: -0.03 });
    ana.think = anaThink; henri.think = henriThink;
  }
  function anaThink(a) {
    if (per() === 4) return K.start(a, 'cover', [K.ph(rand(3, 5), (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 20 + Math.sin(t * 3) * 30, BAR.top - 12]; s.leanT = 0.18; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    const g = STOOLS.map((st) => st.occ).find((q) => q && q.phase === 'wantOysters' && !platter.on);
    if (g) return shuck(a, g);
    const r = Math.random();
    if (r < 0.3) return K.start(a, 'ice', [K.ph(0, (s) => { s.walkTo = rand(100, 200); }, { until: (s) => !s.walking, max: 10 }), K.ph(rand(2, 3), (s, u, t) => { s.tgN = [s.hx + 26 + Math.sin(t * 5) * 10, BAR.top - 14 + Math.abs(Math.sin(t * 5)) * -6]; s.tgF = [s.hx + 10, BAR.top - 10]; s.leanT = 0.2; })]);
    if (r < 0.5 && K.cooled(a, 'crack', 20)) return K.start(a, 'crack', [K.ph(0, (s) => { s.walkTo = 206; }, { until: (s) => !s.walking, max: 10 }), K.ph(2, (s, u, t) => { s.hold.N = H.mallet(); const hit = Math.sin(t * 8); s.tgN = [s.hx + 30, BAR.top - 30 + hit * 14]; s.leanT = 0.15; if (hit > 0.98 && Math.random() < 0.3) K.fx('spark', s.hx + 30, BAR.top - 18, { life: 0.25, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.tgN = [s.hx + 18, BAR.top - 8]; s.tgF = [s.hx + 4, BAR.top - 8]; s.lxT = pick([0.6, 0.2, -0.4]); })]);
  }
  function shuck(a, g) {
    g.phase = 'waitOysters'; platter.n = 0; platter.on = true; platter.x = g.hx + 40; platter.owner = g; platter.home = 1;
    const ph = [K.ph(0, (s) => { s.walkTo = 104; }, { until: (s) => !s.walking, max: 10 }), K.ph(0.3, null, { enter: () => K.say(a, pick(['Six oysters, coming up', 'Fresh this morning']), 1.3) })];
    for (let i = 0; i < 6; i++) ph.push(
      K.ph(0.4, (s) => { s.f = 1; s.tgF = [80 + (i % 3) * 18, BAR.top - 18]; s.leanT = 0.1; s.farFront = true; }, { exit: (s) => { s.hold.F = H.oyster(false); s.hold.N = H.knife(); } }),
      K.ph(0.7, (s, u, t) => { s.tgF = [s.hx + 28, BAR.top - 46]; s.tgN = [s.hx + 34 + Math.sin(t * 18) * 3, BAR.top - 50]; s.shake = u > 0.6 ? Math.sin(t * 22) * 0.025 : 0; }, { exit: (s) => { s.shake = 0; s.hold.F = H.oyster(true); shellBucket = Math.min(8, shellBucket + 1); } }),
      K.ph(0.4, (s) => { s.tgF = [platter.home ? 150 : platter.x, BAR.top - 14]; }, { exit: (s) => { s.hold.F = null; platter.n++; } }));
    ph.push(K.ph(0.6, (s) => { s.hold.N = null; s.farFront = false; s.tgN = [g.hx + 40, BAR.top - 14]; s.leanT = 0.25; }, { enter: () => K.say(a, pick(['Voilà', 'Enjoy — lemon on the side']), 1.2), exit: () => { platter.home = 0; platter.x = g.hx + 34; g.phase = 'oysters'; } }));
    K.start(a, 'shuck', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; s.shake = 0; platter.home = 0; platter.x = g.hx + 34; g.phase = 'oysters'; } });
  }
  function henriThink(a) {
    const p = table.party, h = ((K.hour % 24) + 24) % 24;
    if (h >= 17.5 && h < 23 && !table.candle) return lightCandle(a);
    if (per() === 4 && table.candle && !p) return K.start(a, 'snuff', [K.ph(0, (s) => { s.walkTo = TB.x + 40; }, { until: (s) => !s.walking, max: 20 }), K.ph(0.8, (s) => { s.f = -1; s.tgN = [TB.x, TB.top - 30]; s.leanT = 0.2; }, { exit: () => { table.candle = 0; K.fx('puff', TB.x, TB.top - 34, { life: 1, col: '#cccccc' }); } }), K.ph(0, (s) => { s.walkTo = 1250; }, { until: (s) => !s.walking, max: 20 })]);
    if (p) {
      if (p.stage === 'seated' && !table.menu) return menus(a, p);
      if (p.stage === 'menus' && K.simT > p.t + 5) return wine(a, p);
      if (p.stage === 'wined' && !table.plates.length) return course(a, p);
      if (p.stage === 'eating' && table.plates.every((q) => q.frac <= 0.02)) return clear(a, p);
      if (p.stage === 'bill') return bill(a, p);
      if (table.glasses.some((g) => g.lv < 0.15) && table.bottle > 0 && p.stage === 'eating' && K.cooled(a, 'top', 12)) return topUp(a);
    } else if (table.plates.length || table.glasses.some((g) => g.lv > 0)) return reset(a);
    const r = Math.random();
    if (r < 0.4) return K.start(a, 'polish', [K.ph(0, (s) => { s.walkTo = 1250; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2, 3.5), (s, u, t) => { s.f = -1; s.hold.N = H.glass(0); s.hold.F = H.cloth(); s.carryUp = true; s.tgN = [s.hx - 18, s.hy - 70]; s.tgF = [s.hx - 18 + Math.cos(t * 7) * 6, s.hy - 70 + Math.sin(t * 7) * 6]; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; } })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; } });
    return K.start(a, 'stand', [K.ph(rand(2, 3.5), (s) => { s.tgN = [s.hx - 4, s.hy - 26]; s.tgF = [s.hx + 6, s.hy - 26]; s.lxT = pick([-0.8, -0.3]); })]);
  }
  const atTable = (x = TB.x + 50) => K.ph(0, (s) => { s.walkTo = x; }, { until: (s) => !s.walking, max: 20 });
  function lightCandle(a) { K.start(a, 'candle', [atTable(), K.ph(0.5, (s) => { s.f = -1; s.hold.N = H.lighter(); s.tgN = [TB.x + 24, TB.top - 24]; s.leanT = 0.2; }), K.ph(0.6, null, { exit: () => { table.candle = 1; K.fx('spark', TB.x, TB.top - 30, { life: 0.4, col: '#ffcc66' }); } }), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; s.leanT = 0; } })], { onAbort: (s) => { s.hold.N = null; } }); }
  function menus(a, p) { table.menu = 1; K.start(a, 'menus', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.hold.N = H.menu(); s.tgN = [TB.x, TB.top - 30]; s.leanT = 0.15; }, { enter: () => K.say(a, pick(['Bonsoir, welcome', 'Good afternoon', 'Tonight the oysters are superb']), 1.5), exit: (s) => { s.hold.N = null; for (const m of p.members) { m.hold.N = H.menu(); m.reading = 1; } p.stage = 'menus'; p.t = K.simT; } }), K.ph(0, (s) => { s.walkTo = 1250; }, { until: (s) => !s.walking, max: 20 })]); }
  function wine(a, p) {
    p.stage = 'wine';
    K.start(a, 'wine', [K.ph(0, (s) => { s.walkTo = BUCKET.x + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.6, (s) => { s.f = -1; s.tgN = [BUCKET.x, 520]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = H.bottle(); table.bottle = 0.5; } }),
      K.ph(0, (s) => { s.walkTo = TB.x - 24; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(1.2, (s) => { s.f = -1; s.tgN = [s.hx - 24, s.hy - 60]; }, { enter: () => { for (const m of p.members) { m.hold.N = null; m.reading = 0; } K.say(a, pick(['A Chablis, Premier Cru', 'Sancerre, 2019', 'Muscadet from the coast']), 1.6); K.after(1, () => K.say(p.members[0], 'Perfect', 1.1)); } }),
      ...[0, 1].map((i) => K.ph(1.1, (s, u) => { s.f = glassX(i) < s.hx ? -1 : 1; s.tgN = [glassX(i) - s.f * 4, TB.top - 46]; s.potTilt = Math.sin(clamp(u * 1.3, 0, 1) * Math.PI * 0.5) * 0.8; if (u > 0.2 && u < 0.85) { table.glasses[i].lv = Math.min(0.75, table.glasses[i].lv + 0.03); table.stream = { x0: s.hN.x + s.f * 18, y0: s.hN.y - 12, x1: glassX(i), y1: TB.top - 22 }; } else table.stream = null; }, { exit: (s) => { s.potTilt = 0; table.stream = null; } })),
      K.ph(0, (s) => { s.walkTo = BUCKET.x + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.5, (s) => { s.f = -1; s.tgN = [BUCKET.x, 520]; }, { exit: (s) => { s.hold.N = null; table.bottle = 1; p.stage = 'wined'; } })], { onAbort: (s) => { s.hold.N = null; s.potTilt = 0; table.stream = null; table.bottle = 1; if (p.stage === 'wine') p.stage = 'wined'; } });
  }
  function topUp(a) { K.start(a, 'top', [K.ph(0, (s) => { s.walkTo = BUCKET.x + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.5, (s) => { s.f = -1; s.tgN = [BUCKET.x, 520]; }, { exit: (s) => { s.hold.N = H.bottle(); } }), K.ph(0, (s) => { s.walkTo = TB.x - 24; }, { until: (s) => !s.walking, max: 30 }),
    ...[0, 1].map((i) => K.ph(0.9, (s, u) => { s.f = glassX(i) < s.hx ? -1 : 1; s.tgN = [glassX(i) - s.f * 4, TB.top - 46]; s.potTilt = Math.sin(clamp(u * 1.3, 0, 1) * Math.PI * 0.5) * 0.8; if (u > 0.2 && u < 0.85) table.glasses[i].lv = Math.min(0.75, table.glasses[i].lv + 0.04); }, { exit: (s) => { s.potTilt = 0; } })),
    K.ph(0, (s) => { s.walkTo = BUCKET.x + 40; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.4, (s) => { s.tgN = [BUCKET.x, 520]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; s.potTilt = 0; } }); }
  function course(a, p) {
    p.stage = 'serving'; const ds = p.members.map(() => pick(DISHES)); if (p.members.length === 1) ds.push(null);
    K.start(a, 'course', [K.ph(0, (s) => { s.walkTo = PASS.x - 30; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.8, (s) => { s.f = 1; s.tgN = [PASS.x - 4, 480]; s.tgF = [PASS.x - 8, 484]; }, { enter: () => { bell = 1; K.say(a, 'icon:bell', 0.9); }, exit: (s) => { s.hold.N = H.plate(ds[0], true); if (ds[1]) s.hold.F = H.plate(ds[1], true); } }),
      K.ph(0, (s) => { s.walkTo = TB.x + 6; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.7, (s) => { s.f = -1; s.tgN = [plateX(1), TB.top - 18]; s.tgF = [plateX(0), TB.top - 18]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; ds.forEach((d, i) => { if (d) table.plates.push({ d, frac: 1, i: p.members.length === 1 ? (p.members[0].seat === TB.seats[0] ? 0 : 1) : i, cl: 1 }); }); } }),
      K.ph(0.8, (s) => { s.tgN = [TB.x, TB.top - 40]; s.tgF = [TB.x - 20, TB.top - 40]; s.leanT = 0.1; }, { enter: () => K.say(a, 'Bon appétit', 1.2), exit: () => { for (const q of table.plates) q.cl = 0; K.fx('puff', plateX(0), TB.top - 20, { life: 1, col: '#ffffff' }); K.fx('puff', plateX(1), TB.top - 20, { life: 1, col: '#ffffff' }); p.stage = 'eating'; p.courses = (p.courses || 0) + 1; for (const m of p.members) if (Math.random() < 0.6) K.say(m, pick(['Oh, wow', 'icon:heart', 'Magnifique']), 1.1); } }),
      K.ph(0, (s) => { s.walkTo = 1250; }, { until: (s) => !s.walking, max: 30 })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; if (p.stage === 'serving') p.stage = 'wined'; } });
  }
  function clear(a, p) {
    p.stage = 'clearing';
    K.start(a, 'clear', [atTable(TB.x + 6), K.ph(0.7, (s) => { s.f = -1; s.tgN = [plateX(1), TB.top - 10]; s.tgF = [plateX(0), TB.top - 10]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { table.plates = []; s.hold.N = H.plate(null, false); s.hold.F = H.plate(null, false); s.farFront = false; } }),
      K.ph(0, (s) => { s.walkTo = PASS.x - 30; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.5, (s) => { s.f = 1; s.tgN = [PASS.x, 484]; }, { exit: (s) => { s.hold.N = null; s.hold.F = null; p.stage = p.courses >= 2 ? 'bill' : 'wined'; } })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; table.plates = []; p.stage = 'wined'; } });
  }
  function bill(a, p) {
    p.stage = 'paying';
    K.start(a, 'bill', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.tgN = [TB.x + 10, TB.top - 8]; s.leanT = 0.2; }, { enter: (s) => { s.hold.N = H.card(); }, exit: (s) => { s.hold.N = null; table.folder = 1; } }), K.ph(2.5, (s) => { s.look = { x: () => TB.x, until: K.simT + 0.3 }; }, { enter: () => K.after(1, () => { const m = p.members[0]; if (m) K.start(m, 'pay', [K.ph(0.7, (q) => { q.tgN = [TB.x, TB.top - 10]; q.hold.N = H.card(); }, { exit: (q) => { q.hold.N = null; } })]); }) }),
      K.ph(0.5, (s) => { s.tgN = [TB.x + 10, TB.top - 8]; }, { exit: (s) => { table.folder = 0; s.hold.N = H.card(); p.stage = 'leave'; K.say(a, pick(['Merci, à bientôt', 'Thank you, good night']), 1.3); } }), K.ph(0, (s) => { s.walkTo = 1250; }, { until: (s) => !s.walking, max: 20 }), K.ph(0.2, null, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; table.folder = 0; p.stage = 'leave'; } });
  }
  function reset(a) { K.start(a, 'reset', [atTable(), K.ph(0.6, (s) => { s.f = -1; s.tgN = [glassX(0), TB.top - 10]; s.tgF = [glassX(1), TB.top - 10]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { table.glasses = [{ lv: 0 }, { lv: 0 }]; table.plates = []; table.menu = 0; s.farFront = false; } }), K.ph(1.4, (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [TB.x + Math.sin(t * 6) * 40, TB.top - 6]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; s.farFront = false; } }); }
  /* ---------- guests ---------- */
  const TYPES = {
    anniv: { body: B({ T: 234, hw: 56, headR: 28, pattern: 'dress', top: 'coral', skirt: 'coral', hairStyle: 'long' }), words: ['Ten years…', 'icon:heart'] },
    anniv2: { body: B({ pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', pants: 'navy' }), words: ['To us', 'icon:heart'], ring: 1 },
    biz: { body: B({ pattern: 'suit', top: 'grey', shirt: 'white', tie: 'teal', pants: 'grey', glasses: 1 }), words: ['Let\'s talk numbers', 'icon:clock'] },
    biz2: { body: B({ T: 236, hw: 58, headR: 28, pattern: 'jacket', top: 'dark', shirt: 'cream', hairStyle: 'bob', pants: 'dark' }), words: ['Deal', 'Agreed'] },
    friend: { body: B({ T: 230, hw: 58, headR: 28, pattern: 'cardigan', top: 'mustard', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', skirt: 'navy' }), words: ['Remember Lisbon?', 'icon:laugh'] },
    friend2: { body: B({ T: 228, hw: 58, headR: 28, pattern: 'dress', top: 'teal', skirt: 'teal', hair: 'hairGrey', hairStyle: 'bob' }), words: ['Ha! Yes!', 'icon:laugh'] },
    critic: { body: B({ pattern: 'vest', top: 'plum', shirt: 'cream', tie: 'dark', pants: 'dark', glasses: 1, hair: 'hairGrey' }), words: ['Hmm.', 'Interesting'], notes: 1 },
    captain: { body: B({ T: 248, hw: 70, torso: 'round', pattern: 'jacket', top: 'navy', shirt: 'white', pants: 'navy', hat: 'cap', hatCol: 'white', hair: 'hairGrey' }), words: ['Best oysters on the coast', 'Aye'] },
    local: { body: B({ pattern: 'polo', top: 'teal', pants: 'cream', hat: 'flatcap', hatCol: 'grey' }), words: ['The usual', 'Lovely'] },
  };
  const TPARTIES = [{ m: ['anniv', 'anniv2'], w: [0.5, 0.5, 3, 3] }, { m: ['biz', 'biz2'], w: [3, 1, 0.5, 0.5] }, { m: ['friend', 'friend2'], w: [2, 2, 1, 1] }, { m: ['critic'], w: [1, 1, 1, 1] }];
  function arrive() {
    const p = per(); if (p === 4) return;
    if (!table.party && !table.plates.length && !table.glasses.some((g) => g.lv > 0)) { const list = TPARTIES.filter((q) => q.w[p] > 0 && !guests().some((g) => q.m.includes(g.type))); if (list.length) { let tot = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * tot, pt = list[0]; for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } } const party = { members: [], stage: 'arrive', t: 0 }; table.party = party; pt.m.forEach((type, j) => { const st = pt.m.length === 1 ? TB.seats[0] : TB.seats[j]; const a = mkGuest(type, 1320 + j * 50); a.party = party; a.seat = st; st.occ = a; a.walkTo = st.x; party.members.push(a); a.phase = 'toTable'; }); return; } }
    const st = STOOLS[0]; if (!st.occ && !guests().some((g) => !g.party && g.phase !== 'out')) { const type = pick(['captain', 'local'].filter((t) => !guests().some((g) => g.type === t))); if (!type) return; const a = mkGuest(type, -50); a.seat = st; st.occ = a; a.walkTo = st.x; a.phase = 'toBar'; }
  }
  function mkGuest(type, x) {
    const T0 = TYPES[type]; const a = K.mk(Object.assign({}, T0.body), { type, T0, cust: 1, hx: x, f: x < 640 ? 1 : -1, floorY: FL - 6, sc: SC, alpha: 0, fade: 1.5, speed: rand(0.95, 1.08) });
    if (cool('snow') || cool('rain')) if (Math.random() < 0.6) a.scarf = pick(['coral', 'cream', 'mustard', 'teal']);
    a.think = guestThink; return a;
  }
  function guestThink(a) {
    const P = a.party, mate = P && P.members.find((m) => m !== a);
    if (a.phase === 'toTable') { if (a.walking || a.walkTo != null) return; K.sitDown(a, a.seat.x, 600, a.seat.f); a.floorY = 704; a.tableY = TB.top - 6; a.faceDir = a.seat.f * 0.85; a.phase = 'table'; if (P.members.every((m) => m.phase === 'table')) P.stage = 'seated'; return; }
    if (a.phase === 'toBar') { if (a.walking || a.walkTo != null) return; K.sitDown(a, a.seat.x, 590, 1); a.tableY = BAR.top - 6; a.faceDir = 0.7; a.phase = 'wantOysters'; K.say(a, pick(['Half a dozen, please', 'Oysters, Ana!', 'The usual']), 1.4); return; }
    if (a.state === 'sit' || a.state === 'rise') return;
    if (boat && boat.t > 2 && boat.t < 12 && a.phase !== 'out' && Math.random() < 0.5) return K.start(a, 'boat', [K.ph(1.2, (s) => { s.look = { x: () => boat.x, until: K.simT + 0.3 }; })]);
    if (a.phase === 'waitOysters' || a.phase === 'wantOysters') return K.start(a, 'watch', [K.ph(rand(1, 2), (s) => { s.look = { x: () => ana.hx, until: K.simT + 0.3 }; })]);
    if (a.phase === 'oysters') {
      if (platter.n > 0 && platter.owner === a) return K.start(a, 'slurp', [K.ph(0.5, (s) => { s.tgN = [platter.x, BAR.top - 10]; s.leanT = 0.1; }, { exit: (s) => { platter.n--; s.hold.N = H.oyster(true); } }), K.ph(0.5, (s) => { s.tgN = [s.R.cx + s.R.R * 0.7, s.R.cy + s.R.R * 0.3]; }), K.ph(0.6, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.8; s.tilt = -0.15; }, { exit: (s) => { s.hold.N = H.shell(); if (Math.random() < 0.4) K.say(a, pick(['Mmm, briny', 'icon:heart', 'Perfect']), 1.1); } }), K.ph(0.5, (s) => { s.tgN = [platter.x + 20, BAR.top - 6]; s.tilt = 0; }, { exit: (s) => { s.hold.N = null; platter.shells++; } }), K.ph(rand(1.5, 3), (s) => { s.look = { x: () => 640, until: K.simT + 0.3 }; s.tgN = [s.hx + 30, BAR.top - 4]; })], { onAbort: (s) => { s.hold.N = null; s.tilt = 0; } });
      a.phase = 'leave'; platter.on = false; platter.owner = null; K.after(6, () => { platter.shells = 0; }); return;
    }
    if (a.phase === 'table') {
      if (P.stage === 'leave') { a.phase = 'leave'; return; }
      if (a.reading) return K.start(a, 'read', [K.ph(rand(1.5, 3), (s) => { s.tgN = [s.hx + s.f * 24, s.R.cy + 52]; s.carryUp = false; s.headDy = 2; s.look = { x: () => s.hx + s.f * 40, until: K.simT + 0.3 }; }, { exit: (s) => { s.headDy = 0; } })]);
      const pl = table.plates.find((q) => q.i === TB.seats.indexOf(a.seat) && q.frac > 0.02 && !q.cl), gi = TB.seats.indexOf(a.seat), g = table.glasses[gi], r = Math.random();
      if (a.type === 'anniv2' && P.stage === 'eating' && !table.ring && P.courses >= 1 && r < 0.2 && per() >= 2) return propose(a, mate);
      if (pl && r < 0.5) return K.start(a, 'eat', [K.ph(0.5, (s) => { s.hold.N = H.fork(null); s.tgN = [plateX(gi) - s.f * 12, TB.top - 14]; s.leanT = 0.12; }, { exit: (s) => { pl.frac = Math.max(0, pl.frac - rand(0.14, 0.22)); s.hold.N = H.fork(pl.d.c); } }), K.ph(0.55, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.4, s.R.cy + s.R.R * 0.5]; s.leanT = 0.04; }, { exit: (s) => { s.hold.N = H.fork(null); } }), K.ph(rand(0.8, 1.4), (s, u, t) => { s.headDy = Math.abs(Math.sin(t * 8)) * 1.4; s.tgN = [s.hx + s.f * 30, TB.top - 14]; }, { exit: (s) => { s.headDy = 0; s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; s.headDy = 0; } });
      if (g.lv > 0.08 && r < 0.65) return K.start(a, 'sip', [K.ph(0.5, (s) => { s.tgF = [glassX(gi), TB.top - 14]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.glass(gi); g.held = 1; } }), K.ph(0.5, (s) => { s.tgF = [s.R.cx + s.f * s.R.R * 0.8, s.R.cy + s.R.R * 0.2]; }), K.ph(0.8, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.6; }, { exit: (s) => { g.lv = Math.max(0, g.lv - rand(0.1, 0.18)); s.cupTilt = 0; } }), K.ph(0.5, (s) => { s.tgF = [glassX(gi), TB.top - 12]; }, { exit: (s) => { s.hold.F = null; g.held = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; g.held = 0; s.farFront = false; s.cupTilt = 0; } });
      if (mate && g.lv > 0.1 && r < 0.72 && K.cooled(a, 'toast', 25) && P.stage === 'wined') { const mg = TB.seats.indexOf(mate.seat); K.abort(mate); const clink = (who, i) => K.start(who, 'toast', [K.ph(0.5, (s) => { s.tgF = [glassX(i), TB.top - 14]; s.farFront = true; }, { exit: (s) => { s.hold.F = H.glass(i); table.glasses[i].held = 1; } }), K.ph(0.7, (s) => { s.tgF = [TB.x + s.f * -8, TB.top - 70]; }, { exit: () => { if (who === a) { K.fx('spark', TB.x, TB.top - 76, { life: 0.4, col: '#fff2c0' }); K.say(a, 'Cheers!', 1); } } }), K.ph(0.6, (s) => { s.tgF = [glassX(i), TB.top - 12]; }, { exit: (s) => { s.hold.F = null; table.glasses[i].held = 0; s.farFront = false; } })], { onAbort: (s) => { s.hold.F = null; table.glasses[i].held = 0; s.farFront = false; } }); clink(mate, mg); return clink(a, gi); }
      if (a.T0.notes && r < 0.8 && K.cooled(a, 'notes', 8)) return K.start(a, 'notes', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.menu(); s.carryUp = false; s.tgN = [s.hx + s.f * 24, s.R.cy + 54]; s.tgF = [s.hx + s.f * 30 + Math.sin(t * 9) * 3, s.R.cy + 52]; s.headDy = 2; }, { exit: (s) => { s.hold.N = null; s.headDy = 0; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (mate && r < 0.9 && K.cooled(a, 'chat', 6)) { K.say(a, pick(a.T0.words), 1.4); K.after(1.2, () => K.say(mate, pick(mate.T0.words), 1.3)); return K.start(a, 'chat', [K.ph(2.2, (s, u, t) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + s.f * 30 + Math.sin(t * 4) * 6, TB.top - 30]; })]); }
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.look = { x: () => 640, until: K.simT + 0.3 }; })]);
    }
    if (a.phase === 'leave') { if (a.state === 'seated') { K.standUp(a); return; } if (a.seat) { a.seat.occ = null; a.seat = null; } a.floorY = FL - 6; a.phase = 'out'; a.walkTo = P ? 1330 : -60; if (P && P.members.every((m) => m.phase === 'out')) table.party = null; return; }
    if (a.phase === 'out') { if (!a.walking) a.fade = -2; else if (a.hx > 1260 || a.hx < 10) a.fade = -1.5; }
  }
  function propose(a, mate) {
    table.ring = 1; K.abort(mate);
    K.start(mate, 'surprised', [K.ph(5.5, (s, u) => { s.look = { x: () => a.hx, until: K.simT + 0.3 }; if (u > 0.55) { s.tgN = [s.R.cx + s.f * 6, s.R.cy + 30]; s.tgF = [s.R.cx + s.f * 12, s.R.cy + 34]; } }, { enter: () => { K.after(2.4, () => K.say(mate, 'Oh!', 1)); K.after(3.6, () => { K.say(mate, 'Yes!', 1.6); K.fx('spark', TB.x, TB.top - 90, { life: 0.8, col: '#ff8aa8' }); K.say(henri, 'icon:heart', 1.4); K.say(ana, 'icon:heart', 1.4); for (const g of guests()) if (g !== a && g !== mate) K.say(g, pick(['Bravo!', 'icon:heart']), 1.4); }); } })]);
    K.start(a, 'propose', [K.ph(0.8, (s) => { s.hold.N = H.ring(); s.tgN = [s.R.cx + s.f * 30, s.R.cy + 44]; }, { enter: () => K.say(a, 'Will you…?', 1.6) }), K.ph(4, (s) => { s.tgN = [s.hx + s.f * 40, s.R.cy + 30]; s.leanT = 0.18; }), K.ph(0.5, null, { exit: (s) => { s.hold.N = null; s.leanT = 0; } })], { onAbort: (s) => { s.hold.N = null; } });
  }
  /* ---------- sim ---------- */
  function sim(Kk, dt) {
    nextArrive -= dt; if (nextArrive <= 0) { arrive(); nextArrive = rand(8, 15); }
    bell = Math.max(0, bell - dt * 2);
    nextBoat -= dt * (per() >= 2 ? 1.5 : 0.8); if (nextBoat <= 0 && !boat) { boat = { t: 0, x: WIN.x0 - 120 }; nextBoat = rand(120, 200); }
    if (boat) { boat.t += dt; boat.x = WIN.x0 - 120 + boat.t * 30; if (boat.x > WIN.x1 + 140) boat = null; }
    nextGull -= dt; if (nextGull <= 0 && !gull && per() < 3) { gull = { t: 0 }; nextGull = rand(80, 140); } if (gull) { gull.t += dt; if (gull.t > 14) gull = null; }
    if (table.party && table.party.members.some((m) => m.reading) && table.party.stage === 'wine') for (const m of table.party.members) { m.reading = 0; m.hold.N = null; }
    const h = ((K.hour % 24) + 24) % 24; sign = h < 23 ? 1 : 0;
  }
  function onClear(Kk, big, n) {
    for (const g of guests()) if (g.state === 'seated' && (!g.act || g.act.name === 'idle' || g.act.name === 'watch')) { if (big || Math.random() < 0.4) K.say(g, pick(['Bravo!', 'icon:star', 'Superb', 'icon:heart']), 1.2); }
    K.say(henri, big ? pick(['Magnifique!', 'icon:star']) : pick(['Très bien', 'icon:note']), 1.2); if (big) { bell = 1; K.say(ana, 'icon:star', 1); }
  }
  function build(Kk) { K = Kk; mkStaff(); const h = ((K.hour % 24) + 24) % 24; table.candle = h >= 17.5 && h < 23 ? 1 : 0; nextArrive = 1;
    if (per() !== 4) { const a = mkGuest('local', STOOLS[0].x); a.alpha = 1; a.fade = 0; a.seat = STOOLS[0]; STOOLS[0].occ = a; a.state = 'seated'; a.seatY = 590; a.tableY = BAR.top - 6; a.f = 1; a.faceDir = 0.7; a.phase = 'oysters'; K.settle(a); platter.on = true; platter.n = 3; platter.x = a.hx + 34; platter.owner = a; platter.shells = 3; } }
  /* ---------- drawing ---------- */
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
    c.fillStyle = P.trim; c.fillRect(-60, 0, 1400, 56); for (let x = -60; x < 1340; x += 90) { c.fillStyle = 'rgba(255,255,255,0.05)'; c.fillRect(x, 0, 45, 56); } c.fillStyle = P.brass; c.fillRect(-60, 56, 1400, 3);
    for (let x = -60; x < 1340; x += 40) { c.fillStyle = P.wall2; c.fillRect(x, 470, 20, 190); } c.fillStyle = P.wood; c.fillRect(-60, 466, 1400, 6);
    // the harbour window
    const { x0, y0, x1, y1 } = WIN; c.fillStyle = P.wood; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24);
    c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip(); K.sky(c, x0, y0, x1, y0 + 230, { sunR: 22 });
    const hz = y0 + 230; c.fillStyle = P.hill; K.poly(c, [x0, hz, x0 + 120, hz - 50, x0 + 260, hz - 20, x0 + 400, hz - 60, x0 + 560, hz - 16, x1, hz - 40, x1, hz, x0, hz]); c.fill(); c.fillStyle = P.hill2; K.poly(c, [x0, hz, x0 + 80, hz - 18, x0 + 200, hz - 6, x0 + 330, hz - 26, x0 + 480, hz - 4, x1, hz - 14, x1, hz]); c.fill();
    // lighthouse on the point (right), beam at night
    const lx = x1 - 70; c.fillStyle = L('#f4f0e8'); K.poly(c, [lx - 9, hz - 18, lx + 9, hz - 18, lx + 6, hz - 74, lx - 6, hz - 74]); c.fill(); c.fillStyle = L('#c8302a'); c.fillRect(lx - 8, hz - 48, 16, 10); c.fillRect(lx - 7, hz - 80, 14, 8); c.fillStyle = P.night > 0.3 ? '#fff2b0' : L('#3a3a3a'); c.fillRect(lx - 5, hz - 88, 10, 8);
    if (P.night > 0.3) { const a = t * 0.9, dx = Math.cos(a); c.fillStyle = rgba('#fff4c0', 0.22 * P.night * Math.abs(dx)); K.poly(c, [lx, hz - 84, lx + dx * 700, hz - 84 - 30, lx + dx * 700, hz - 84 + 30]); c.fill(); K.glow(c, lx, hz - 84, 40, '#fff2b0', 0.6 * P.night); }
    // water: banded with slow shimmer + reflection of the sun / moon
    c.fillStyle = P.sea; c.fillRect(x0, hz, x1 - x0, y1 - hz); for (let i = 0; i < 9; i++) { const y = hz + 8 + i * 26, off = Math.sin(t * 0.4 + i) * 20; c.fillStyle = rgba(P.sea2, 0.5); c.fillRect(x0 + 40 + off + (i % 3) * 90, y, 120 + (i % 2) * 80, 3); c.fillRect(x0 + 360 - off + (i % 2) * 70, y + 10, 90, 3); }
    { const hr = ((P.hour % 24) + 24) % 24, day = hr > 6 && hr < 19.5, u = day ? (hr - 6) / 13.5 : ((hr + 24 - 19.5) % 24) / 10.5, sx = x0 + (x1 - x0) * (day ? 0.15 + 0.7 * u : 0.2 + 0.6 * u); c.fillStyle = rgba(day ? (P.sun || '#fff') : '#f4ecd8', 0.35); for (let i = 0; i < 6; i++) c.fillRect(sx - 30 + Math.sin(t + i) * 8 + i * 3, hz + 6 + i * 14, 60 - i * 6, 3); }
    // pier + moored boats
    c.fillStyle = P.woodDk; c.fillRect(x0, hz + 70, 300, 10); for (let i = 0; i < 6; i++) c.fillRect(x0 + 20 + i * 50, hz + 78, 6, 40);
    for (let i = 0; i < 2; i++) { const bx = x0 + 120 + i * 210, by = hz + 66 + Math.sin(t * 1.1 + i) * 2, rk = Math.sin(t * 0.9 + i) * 0.04; c.save(); c.translate(bx, by); c.rotate(rk); c.fillStyle = L(i ? '#2a6a8a' : '#e8e4dc'); K.poly(c, [-50, -14, 50, -14, 38, 6, -42, 6]); c.fill(); c.fillStyle = L('#c8302a'); c.fillRect(-46, -14, 92, 4); c.fillStyle = L('#5a3e2e'); c.fillRect(-2, -84, 3, 70); c.fillStyle = L('#f4f0e8'); K.poly(c, [2, -80, 34, -20, 2, -20]); c.fill(); c.restore(); }
    if (boat) { const bx = boat.x, by = hz + 34 + Math.sin(t * 2) * 1.5; c.fillStyle = L('#3a5a7a'); K.poly(c, [bx - 46, by - 10, bx + 50, by - 10, bx + 40, by + 8, bx - 40, by + 8]); c.fill(); c.fillStyle = L('#f4f0e8'); c.fillRect(bx - 16, by - 34, 34, 24); c.fillStyle = L('#2a2a2a'); c.fillRect(bx + 6, by - 46, 4, 14); if (P.night > 0.2) { K.glow(c, bx + 40, by - 10, 24, '#80ff80', 0.6); K.glow(c, bx - 30, by - 30, 30, '#ffd890', 0.7); } c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = 2; c.beginPath(); c.moveTo(bx - 50, by + 8); c.lineTo(bx - 110, by + 12); c.stroke(); }
    for (let i = 0; i < 3; i++) { const gx = x0 + ((t * (14 + i * 5) + i * 230) % (x1 - x0)), gy = y0 + 60 + i * 30 + Math.sin(t + i) * 6, fl = Math.sin(t * 6 + i) * 4; c.strokeStyle = rgba(P.ink, 0.5 * (1 - P.night)); c.lineWidth = 1.6; c.beginPath(); c.moveTo(gx - 8, gy - fl); c.quadraticCurveTo(gx - 3, gy - 4, gx, gy); c.quadraticCurveTo(gx + 3, gy - 4, gx + 8, gy - fl); c.stroke(); }
    K.weather(c, x0, y0, x1, y1); if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(x0, hz + 68, 300, 4); }
    c.restore();
    c.fillStyle = P.wood; for (const fx of [x0 + (x1 - x0) / 3, x0 + (2 * (x1 - x0)) / 3]) c.fillRect(fx - 4, y0, 8, y1 - y0); c.fillRect(x0, y0 + 150, x1 - x0, 6);
    c.fillStyle = P.woodDk; c.fillRect(x0 - 16, y1 + 8, x1 - x0 + 32, 10); // sill
    if (gull) { const u = gull.t, gx = x0 + 560, gy = y1 + 8, land = clamp(u / 2, 0, 1), leave = clamp((u - 12) / 2, 0, 1), px = gx - 100 * (1 - land) + 160 * leave, py = gy - 80 * (1 - land) - 90 * leave; c.fillStyle = L('#f4f4f0'); ellipse(c, px, py - 10, 12, 8); c.fill(); c.beginPath(); c.arc(px + 9, py - 18, 6, 0, TAU); c.fill(); c.fillStyle = L('#9aa0a8'); K.poly(c, [px - 12, py - 14, px + 4, py - 14, px - 4, py - 6]); c.fill(); c.fillStyle = '#f0b020'; K.poly(c, [px + 14, py - 19, px + 21, py - 17, px + 14, py - 16]); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(px + 10, py - 19, 1.2, 0, TAU); c.fill(); c.strokeStyle = '#f0b020'; c.lineWidth = 1.4; if (land >= 1 && leave <= 0) { c.beginPath(); c.moveTo(px - 2, py - 3); c.lineTo(px - 2, py); c.moveTo(px + 3, py - 3); c.lineTo(px + 3, py); c.stroke(); } }
    // kitchen pass on the right (porthole door + bell)
    c.fillStyle = P.woodDk; c.fillRect(PASS.x - 30, 300, 90, 360); c.fillStyle = L('#c8ccd0'); c.fillRect(PASS.x - 34, 470, 96, 8); c.fillStyle = rgba('#fff2c8', 0.6); c.beginPath(); c.arc(PASS.x + 8, 380, 16, 0, TAU); c.fill(); c.strokeStyle = P.brass; c.lineWidth = 3; c.stroke();
    c.fillStyle = P.brass; c.beginPath(); c.arc(PASS.x - 18, 466, 6, Math.PI, TAU); c.fill(); c.fillRect(PASS.x - 20, 460 - bell * 3, 4, 3);
    // wine bucket on its stand
    c.strokeStyle = P.brass; c.lineWidth = 2; c.beginPath(); c.moveTo(BUCKET.x - 10, 600); c.lineTo(BUCKET.x, 540); c.lineTo(BUCKET.x + 10, 600); c.stroke(); c.fillStyle = L('#c8ccd0'); K.poly(c, [BUCKET.x - 14, 518, BUCKET.x + 14, 518, BUCKET.x + 11, 546, BUCKET.x - 11, 546]); c.fill(); if (table.bottle >= 1 || table.bottle === 0) { c.fillStyle = L('#2a4a2a'); c.fillRect(BUCKET.x - 3, 500, 6, 22); } c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(BUCKET.x - 10, 516, 20, 3);
    // framed fish prints (left wall above the bar)
    for (let i = 0; i < 2; i++) { const fx = 60 + i * 130, fy = 120; c.fillStyle = P.wood; c.fillRect(fx, fy, 100, 70); c.fillStyle = L('#f4ecd8'); c.fillRect(fx + 6, fy + 6, 88, 58); c.fillStyle = L(i ? '#2a6a8a' : '#c8702a'); c.beginPath(); c.ellipse(fx + 46, fy + 35, 26, 11, 0, 0, TAU); c.fill(); K.poly(c, [fx + 70, fy + 35, fx + 86, fy + 24, fx + 86, fy + 46]); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(fx + 30, fy + 33, 2, 0, TAU); c.fill(); }
    c.fillStyle = sign ? P.trim : L('#5a5a5a'); c.font = 'italic 700 18px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('The Fish House', 1128, 160); c.fillStyle = P.brass; c.fillRect(1060, 176, 136, 2);
  }
  function drawBar(c, t) {
    const P = K.P, { x0, x1, top } = BAR;
    // crushed ice mound with oysters, lobster, crab, lemons
    c.fillStyle = P.ice2; c.beginPath(); c.moveTo(x0 + 10, top); c.quadraticCurveTo(x0 + 120, top - 60, x0 + 220, top - 40); c.quadraticCurveTo(x0 + 330, top - 64, x1 - 10, top); c.fill();
    c.fillStyle = P.ice; for (let i = 0; i < 40; i++) { const xx = x0 + 20 + (i * 37) % (x1 - x0 - 40), yy = top - 6 - ((i * 13) % 34); c.fillRect(xx, yy, 4, 3); }
    for (let i = 0; i < 9; i++) oyster(c, x0 + 40 + (i % 5) * 22 + Math.floor(i / 5) * 10, top - 22 - Math.floor(i / 5) * 12, 1.3, i % 3 === 0);
    c.fillStyle = L('#d8341e'); c.save(); c.translate(x0 + 300, top - 40); c.rotate(-0.2); ellipse(c, 0, 0, 34, 10); c.fill(); c.fillRect(30, -12, 22, 6); c.fillRect(30, 6, 22, 6); c.strokeStyle = L('#a01e10'); c.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 10, -9); c.lineTo(i * 10, 9); c.stroke(); } c.restore();
    c.fillStyle = L('#e8803a'); ellipse(c, x0 + 220, top - 30, 18, 12); c.fill(); c.strokeStyle = L('#e8803a'); c.lineWidth = 3; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(x0 + 206 + i * 12, top - 24); c.lineTo(x0 + 196 + i * 16, top - 8); c.stroke(); }
    for (let i = 0; i < 3; i++) { c.fillStyle = L('#f8e040'); c.beginPath(); c.arc(x0 + 170 + i * 16, top - 14, 6, Math.PI, TAU); c.fill(); }
    // counter
    c.fillStyle = L('#c8ccd0'); c.fillRect(x0 - 8, top, x1 - x0 + 16, 8); c.fillStyle = P.wood; c.fillRect(x0, top + 8, x1 - x0, 152); c.fillStyle = P.woodDk; for (let x = x0 + 12; x < x1 - 20; x += 70) c.fillRect(x, top + 22, 56, 120); c.fillStyle = P.brass; c.fillRect(x0 - 4, top + 130, x1 - x0 + 8, 4);
    if (platter.on && !platter.home) H.platter().draw(c, platter.x, top - 6, 1); else if (platter.on) H.platter().draw(c, 150, top - 6, 1);
    for (let i = 0; i < Math.min(platter.shells, 6); i++) { c.fillStyle = L('#8a8a80'); ellipse(c, (platter.x || 150) + 26 + (i % 2) * 6, top - 3 - i * 2.5, 6, 2.6, -0.3); c.fill(); }
    c.fillStyle = L('#a8aeb4'); c.fillRect(x1 - 70, top - 18, 24, 18); for (let i = 0; i < Math.min(shellBucket, 4); i++) { c.fillStyle = L('#7a7a70'); ellipse(c, x1 - 62 + (i % 2) * 8, top - 18 - Math.floor(i / 2) * 3, 5, 2.4); c.fill(); }
  }
  function drawTable(c, front) {
    const P = K.P, x = TB.x, y = TB.top;
    if (!front) { for (const st of TB.seats) { const cx = st.x - st.f * 10; c.fillStyle = P.woodDk; c.fillRect(cx - st.f * 24 - 3, 480, 6, 124); c.fillStyle = L('#2e4a5a'); c.fillRect(cx - 24, 596, 48, 10); c.fillStyle = P.woodDk; c.fillRect(cx - 20, 606, 4, 94); c.fillRect(cx + 16, 606, 4, 94); } return; }
    c.fillStyle = P.clothSh; K.poly(c, [x - 90, y + 2, x + 90, y + 2, x + 96, y + 90, x - 96, y + 90]); c.fill(); c.fillStyle = P.cloth; K.poly(c, [x - 90, y + 2, x + 60, y + 2, x + 52, y + 90, x - 96, y + 90]); c.fill(); c.fillStyle = P.cloth; ellipse(c, x, y, 92, 12); c.fill();
    // candle in a glass
    c.fillStyle = 'rgba(230,240,245,0.5)'; c.fillRect(x - 6, y - 18, 12, 16); c.fillStyle = L('#f4ecd8'); c.fillRect(x - 3, y - 14, 6, 12); if (table.candle) { const fl = 1 + Math.sin(K.t * 13) * 0.15; c.fillStyle = '#ffd070'; ellipse(c, x, y - 18, 2.4, 4.4 * fl); c.fill(); K.glow(c, x, y - 18, 80, P.candle, 0.55); }
    if (table.ring) { c.fillStyle = L('#ff8aa8'); c.beginPath(); c.arc(x + 12, y - 5, 2.4, 0, TAU); c.fill(); }
    for (const pl of table.plates) { dish(c, plateX(pl.i), y + 2, 1.55, pl.d, pl.frac); if (pl.cl) { c.fillStyle = L('#d8dce0'); c.beginPath(); c.arc(plateX(pl.i), y - 1, 24, Math.PI, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(plateX(pl.i) - 12, y - 16, 4, 10); } }
    for (let i = 0; i < 2; i++) if (!table.glasses[i].held && (table.party || table.glasses[i].lv > 0)) wineGlass(c, glassX(i), y + 1, 1.4, table.glasses[i].lv);
    if (table.stream) { c.strokeStyle = L('#f2e08a'); c.lineWidth = 2; c.beginPath(); c.moveTo(table.stream.x0, table.stream.y0); c.quadraticCurveTo(table.stream.x1, table.stream.y0, table.stream.x1, table.stream.y1); c.stroke(); }
    if (table.folder) { c.fillStyle = L('#1a1c20'); c.fillRect(x + 2, y - 4, 22, 4); }
    c.fillStyle = L('#c8ccd0'); for (const st of TB.seats) { c.fillRect(st.x + st.f * 22 - 1, y - 2, 2, 8); }
  }
  function draw(c, t, Kk) {
    const P = K.P;
    drawRoom(c, t);
    for (const x of [130, 330, 1148]) { c.strokeStyle = P.ink; c.lineWidth = 1.3; c.beginPath(); c.moveTo(x, 59); c.lineTo(x, 200); c.stroke(); c.fillStyle = P.brass; c.beginPath(); c.arc(x, 214, 16, Math.PI, TAU); c.fill(); c.fillStyle = P.lamp; ellipse(c, x, 214, 12, 3); c.fill(); K.glow(c, x, 224, 150, P.glow, P.glowA); }
    c.fillStyle = P.floor; c.fillRect(-60, 640, 1400, 100 + K.extraB); for (let i = 0; i < 34; i++) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 42, 640, 3, 100 + K.extraB); }
    K.drawBody(c, ana, true); drawBar(c, t);
    drawTable(c, false);
    if (henri.alpha > 0.02) { c.fillStyle = 'rgba(0,0,0,0.15)'; ellipse(c, henri.hx, SF + 6, 24, 4); c.fill(); K.drawBody(c, henri, true); }
    for (const st of STOOLS) { c.fillStyle = P.brass; c.fillRect(st.x - 3, 604, 6, 104); c.fillStyle = L('#2e4a5a'); ellipse(c, st.x, 602, 24, 7); c.fill(); c.fillStyle = P.brass; ellipse(c, st.x, 690, 16, 4); c.fill(); }
    const gs = guests(); for (const a of gs.filter((q) => q.state === 'stand' || q.seat && STOOLS.includes(q.seat))) { if (a.state === 'stand' && a.alpha > 0.05) { c.fillStyle = 'rgba(0,0,0,0.16)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
    const sit = gs.filter((q) => q.state !== 'stand' && !(q.seat && STOOLS.includes(q.seat))); for (const a of sit) K.drawBody(c, a, false); drawTable(c, true); for (const a of sit) { K.drawArms(c, a); c.globalAlpha = 1; }
    K.shafts(c, [[WIN.x0 + 100, WIN.x0 + 300, WIN.x0 - 40, WIN.x0 + 120, WIN.y1, 720], [WIN.x1 - 260, WIN.x1 - 80, WIN.x1 - 120, WIN.x1 + 80, WIN.y1, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  function icon(c, name, x, y, r) {
    if (name === 'bell') { c.fillStyle = '#c8a050'; c.font = `900 ${r * 0.8}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ding!', x, y); return true; }
    return false;
  }
  function onGone(Kk, a) { if (a.seat) a.seat.occ = null; if (platter.owner === a) { platter.on = false; platter.owner = null; } }
  return GeoKit.stage({ id: 'fishhouse', pal: FishPal, startHour: 12, span: 11.5, build, sim, draw, onClear, onGone, icon, font: 'italic 700 15px Georgia, serif', vign: 'rgba(10,16,30,0.35)', zone: 'rgba(18,22,28,0.62)',
    debug: () => ({ table: table.party ? table.party.members.map((m) => m.type).join('+') + ':' + table.party.stage + ' c' + (table.party.courses || 0) : '-', plates: table.plates.map((p) => p.d.k + p.frac.toFixed(1)).join(' '), glasses: table.glasses.map((g) => g.lv.toFixed(2)).join(' '), candle: table.candle, platter: platter.on ? platter.n + '/' + platter.shells : '-', boat: !!boat, gull: !!gull }) });
}
registerStage('fishhouse', makeGeoFishhouseStage);
