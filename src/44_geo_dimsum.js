/* ================= World 4 · Dim Sum Palace — GEOMETRIC edition (Hong Kong banquet hall, flat planes) =================
   Red lacquer and gold, a dragon & phoenix wall behind the board (calm), a round moon-gate window onto the street,
   two round tables with white cloths and banquet chairs. Auntie May pushes a steaming trolley: calls the dish, lifts a
   bamboo lid (steam!), sets the basket on the table and stamps the card. Mr Lau runs the tea: diners pour for each other
   (finger-tap thanks), flip the teapot lid when it is empty, he refills it at the hot-water urn, brings the bill ("mai dan!")
   and stacks the empty steamers. Surprise: a lion dance passes the moon window (drum, cymbal, everyone looks).
   Clock 07:00 (yum cha rush) -> lunch -> quiet afternoon -> dinner lanterns -> closing (sweep, chairs, lanterns glow). */
const DimPal = GeoKit.palette({
  morning: { wall: '#f2dcb4', wall2: '#e8cc9a', red: '#c42a22', red2: '#9a1a16', gold: '#e8b440', gold2: '#b8862a', wood: '#7a2a1a', woodDk: '#4a1610', floor: '#8a2a20', floor2: '#a8382a', cloth: '#fbf6ec', clothSh: '#e2d8c4', lamp: '#ffd27a', glow: '#ffc060', glowA: 0.2, sky0: '#9ccbe8', sky1: '#f4e2c4', city: '#b8a898', city2: '#d8c8b4', shaft: '#fff0c8', shaftA: 0.2, amb: '#fff0d8', ambK: 0.0, sun: '#fff4d0',
    skin: '#e8b48a', bubble: '#fffaf0', ink: '#2a1a16', navy: '#2a3a5a', coral: '#d8504a', mustard: '#e0a830', teal: '#2a8a80', cream: '#f2e2c4', olive: '#6a7a3a', plum: '#7a3a5a', grey: '#9a9490', brown: '#6a4030', white: '#fbf6ee', dark: '#22181a', hairGrey: '#d8d0c8', jade: '#3aa078' },
  day: { wall: '#f6e2bc', wall2: '#ecd2a2', red: '#cc2e24', red2: '#a01c18', gold: '#f0bc48', gold2: '#c08e2e', wood: '#7e2c1c', woodDk: '#4e1812', floor: '#902c22', floor2: '#ae3a2c', cloth: '#fdf9f0', clothSh: '#e6dcc8', lamp: '#ffe0a0', glow: '#ffd080', glowA: 0.12, sky0: '#7ab8e8', sky1: '#d8ecf8', city: '#a8a8a8', city2: '#d0ccc4', shaft: '#ffffff', shaftA: 0.14, amb: '#ffffff', ambK: 0.0, sun: '#fffbe8',
    skin: '#ecb890', bubble: '#ffffff', ink: '#2a1a16', navy: '#2a3c60', coral: '#e05450', mustard: '#e8b034', teal: '#2a9086', cream: '#f4e6ca', olive: '#6e7e3c', plum: '#803e60', grey: '#a09a96', brown: '#6e4432', white: '#fdf9f2', dark: '#24191b', hairGrey: '#dcd4cc', jade: '#3caa80' },
  dusk: { wall: '#e8b890', wall2: '#d8a07a', red: '#b82422', red2: '#8a1418', gold: '#f0a840', gold2: '#b0782a', wood: '#6a2018', woodDk: '#3e100c', floor: '#7a2018', floor2: '#962c22', cloth: '#f8ead8', clothSh: '#dcc4aa', lamp: '#ffb860', glow: '#ff9a40', glowA: 0.34, sky0: '#5a4a8a', sky1: '#f49a6a', city: '#6a5068', city2: '#8a6a78', shaft: '#ffb070', shaftA: 0.16, amb: '#ffd0a0', ambK: 0.08, sun: '#ffc890',
    skin: '#e0a07a', bubble: '#fff4e4', ink: '#2a1414', navy: '#283456', coral: '#d04844', mustard: '#d8982c', teal: '#26786e', cream: '#ecd2b0', olive: '#5e6a34', plum: '#743456', grey: '#8e8480', brown: '#603828', white: '#f6ecdc', dark: '#20141a', hairGrey: '#ccc0b4', jade: '#348a6c' },
  night: { wall: '#7a4a3a', wall2: '#6a3a2e', red: '#8a1a1a', red2: '#600e12', gold: '#d8962e', gold2: '#9a6820', wood: '#4a1610', woodDk: '#2a0a08', floor: '#4e1410', floor2: '#601c16', cloth: '#e8d4c0', clothSh: '#c4ac94', lamp: '#ffa850', glow: '#ff8a3a', glowA: 0.5, sky0: '#0c1430', sky1: '#24304e', city: '#2a2a3c', city2: '#3a3a50', shaft: '#ff9a50', shaftA: 0.0, amb: '#3a2030', ambK: 0.16, sun: '#f4ecd8',
    skin: '#c88a6a', bubble: '#f8ece0', ink: '#1e0e10', navy: '#1e2846', coral: '#b03a3a', mustard: '#c08428', teal: '#1e5e58', cream: '#dcc0a0', olive: '#4a5228', plum: '#5e2a46', grey: '#766c6c', brown: '#4e2c20', white: '#ecdccc', dark: '#180e12', hairGrey: '#b4a89c', jade: '#2a6e58' },
  snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', city: '#c8ccd4', city2: '#e8eaee' },
}, [[4, 'night'], [6.5, 'morning'], [9.5, 'day'], [16, 'day'], [18.5, 'dusk'], [20.5, 'night'], [28, 'night'], [30.5, 'morning']], { label: (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 11 ? 'Yum cha' : h < 14.5 ? 'Lunch rush' : h < 17.5 ? 'Afternoon tea' : h < 21.5 ? 'Banquet' : 'Closing'; } });

function makeGeoDimsumStage() {
  const SF = 604, SSC = 0.8, FL = 712, SC = 0.84;
  const TA = { id: 'A', x: 134, top: 566, seats: [{ x: 54, f: 1, occ: null }, { x: 212, f: -1, occ: null }], baskets: [], pot: { level: 1, lid: 0, held: 0 }, cups: [0.7, 0.5], stamps: 0, party: null, call: false, from: -50 };
  const TB = { id: 'B', x: 1150, top: 566, seats: [{ x: 1074, f: 1, occ: null }, { x: 1230, f: -1, occ: null }], baskets: [], pot: { level: 1, lid: 0, held: 0 }, cups: [0.6, 0.4], stamps: 0, party: null, call: false, from: 1330 };
  const TABLES = [TA, TB];
  const URN = { x: 1010, top: 470 }, KDOOR = { x0: 312, x1: 392 }, MOON = { x: 1150, y: 282, r: 112 }, LWIN = { x0: 18, y0: 150, x1: 128, y1: 380 };
  const DISH = { hargow: 'Har gow!', siumai: 'Siu mai!', bao: 'Char siu bao!', chive: 'Chive dumplings!', charsiu: 'Char siu!', taro: 'Taro buns!', sesame: 'Sesame balls!', tart: 'Egg tarts!' };
  const DCOL = { hargow: '#f6d8ce', siumai: '#f2c03a', bao: '#fbf4e6', chive: '#8cd49a', charsiu: '#c4322a', taro: '#b49ae0', sesame: '#d08a3a', tart: '#f6cc3a' };
  let K, may, lau, trolley = { x: 312, stack: [], dirty: 0, steam: 0 }, tub = 0, lion = null, nextLion = 70, nextArrive = 1, sign = 1, swept = 0;
  const L = (h) => K.L(h), B = GeoKit.body;
  const per = () => { const h = ((K.hour % 24) + 24) % 24; return h < 11 ? 0 : h < 14.5 ? 1 : h < 17.5 ? 2 : h < 21.5 ? 3 : 4; };
  const diners = () => K.actors.filter((a) => a.cust);
  const cool = (k) => K.weatherNow === k;
  const fillTrolley = () => { trolley.stack = []; for (let i = 0; i < 6; i++) trolley.stack.push(pick(Object.keys(DISH))); };
  /* ---------- little flat props ---------- */
  function piece(c, kind, x, y, s) { // one dumpling at (x,y) bottom-centre, s ~ 1 at table scale
    c.save(); c.translate(x, y); c.scale(s, s); const col = L(DCOL[kind] || '#f0e0c0');
    switch (kind) {
      case 'hargow': c.fillStyle = col; c.beginPath(); c.moveTo(-6, 0); c.quadraticCurveTo(-7, -9, 0, -10); c.quadraticCurveTo(7, -9, 6, 0); c.fill(); c.fillStyle = L('#f0907a'); ellipse(c, 0, -4, 3, 2); c.fill(); c.strokeStyle = L('#d8b0a4'); c.lineWidth = 0.8; c.beginPath(); for (let i = -2; i <= 2; i++) { c.moveTo(i * 2, -9.5); c.lineTo(i * 2.4, -6); } c.stroke(); break;
      case 'siumai': c.fillStyle = col; c.fillRect(-5, -9, 10, 9); c.fillStyle = L('#e2a47a'); ellipse(c, 0, -9, 5, 2); c.fill(); c.fillStyle = L('#ff7a1a'); c.beginPath(); c.arc(0, -10, 1.6, 0, TAU); c.fill(); break;
      case 'bao': c.fillStyle = col; c.beginPath(); c.arc(0, -5, 7, Math.PI, TAU); c.lineTo(7, 0); c.lineTo(-7, 0); c.fill(); c.fillStyle = L('#a82a20'); K.poly(c, [-3, -10, 0, -8, 3, -10, 1, -11.5, -1, -11.5]); c.fill(); break;
      case 'chive': c.fillStyle = col; ellipse(c, 0, -4, 7, 4.5); c.fill(); c.fillStyle = L('#d89a3a'); c.fillRect(-6, -1.6, 12, 1.6); c.fillStyle = L('#2a7a3a'); c.fillRect(-3, -6, 4, 1); c.fillRect(1, -4, 3, 1); break;
      case 'charsiu': c.fillStyle = col; c.save(); c.rotate(-0.15); c.fillRect(-8, -5, 16, 5); c.fillStyle = L('#6a1410'); c.fillRect(-8, -5, 16, 1.4); c.restore(); break;
      case 'taro': c.fillStyle = col; c.beginPath(); c.arc(0, -5, 6.5, Math.PI, TAU); c.lineTo(6.5, 0); c.lineTo(-6.5, 0); c.fill(); c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 0.8; c.beginPath(); c.arc(0, -7, 2.4, 0, 5); c.stroke(); break;
      case 'sesame': c.fillStyle = col; c.beginPath(); c.arc(0, -5.5, 5.5, 0, TAU); c.fill(); c.fillStyle = L('#fff4dc'); for (let i = 0; i < 5; i++) c.fillRect(-3 + (i % 3) * 2.5, -8 + Math.floor(i / 3) * 3.5, 1, 0.8); break;
      case 'tart': c.fillStyle = L('#c8843a'); K.poly(c, [-7, -5, 7, -5, 5, 0, -5, 0]); c.fill(); c.fillStyle = col; ellipse(c, 0, -5, 6, 1.8); c.fill(); c.fillStyle = L('#a86a2a'); c.beginPath(); c.arc(1.5, -5, 1, 0, TAU); c.fill(); break;
    }
    c.restore();
  }
  function basket(c, x, y, s, b, lid) { // bamboo steamer, y = bottom
    c.save(); c.translate(x, y); c.scale(s, s);
    if (b && b.kind === 'charsiu') { c.fillStyle = L('#fbf8f2'); ellipse(c, 0, -2, 17, 4); c.fill(); c.fillStyle = L('#2a5aa0'); ellipse(c, 0, -2, 17, 4); c.lineWidth = 0.8; c.strokeStyle = L('#2a5aa0'); c.stroke(); for (let i = 0; i < b.n; i++) piece(c, 'charsiu', -8 + i * 6, -2 - i * 0.8, 0.8); c.restore(); return; }
    c.fillStyle = L('#d4a86a'); c.fillRect(-15, -12, 30, 12); c.fillStyle = L('#b08444'); c.fillRect(-15, -12, 30, 2); c.fillRect(-15, -5, 30, 1.4); c.fillStyle = L('#e6c48a'); ellipse(c, 0, -12, 15, 3); c.fill();
    if (b && !lid) { c.fillStyle = L('#f4ecd2'); ellipse(c, 0, -12, 13, 2.4); c.fill(); const n = b.n; for (let i = 0; i < n; i++) piece(c, b.kind, (i - (n - 1) / 2) * 8.5, -10.5, 0.62); }
    if (lid) { c.fillStyle = L('#c89a5a'); c.beginPath(); c.moveTo(-15, -12); c.quadraticCurveTo(0, -24, 15, -12); c.fill(); c.strokeStyle = L('#9a7038'); c.lineWidth = 0.8; c.beginPath(); for (let i = -2; i <= 2; i++) { c.moveTo(i * 5, -12.5); c.lineTo(i * 3, -19); } c.stroke(); }
    c.restore();
  }
  function teapot(c, x, y, s, pot, tilt = 0) {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s);
    c.fillStyle = L('#f4f0e8'); ellipse(c, 0, -8, 10, 8); c.fill(); c.fillRect(-7, -2, 14, 2);
    c.strokeStyle = L('#2a5aa0'); c.lineWidth = 1; c.beginPath(); c.arc(0, -8, 5, 0, TAU); c.stroke();
    c.fillStyle = L('#f4f0e8'); K.poly(c, [8, -9, 17, -15, 18, -13, 9, -5]); c.fill(); c.strokeStyle = L('#c8c0b4'); c.lineWidth = 2; c.beginPath(); c.arc(-11, -8, 4, Math.PI * 0.5, Math.PI * 1.5); c.stroke();
    const lx = pot && pot.lid ? 7 : 0, ly = pot && pot.lid ? -15 : -16, la = pot && pot.lid ? 0.5 : 0; c.save(); c.translate(lx, ly); c.rotate(la); c.fillStyle = L('#f4f0e8'); ellipse(c, 0, 0, 6, 2.5); c.fill(); c.fillStyle = L('#2a5aa0'); c.beginPath(); c.arc(0, -2, 1.6, 0, TAU); c.fill(); c.restore();
    c.restore();
  }
  function cup(c, x, y, s, lvl) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#f8f4ec'); K.poly(c, [-4.5, -7, 4.5, -7, 3.5, 0, -3.5, 0]); c.fill(); if (lvl > 0.05) { c.fillStyle = L('#b8762a'); ellipse(c, 0, -7 + (1 - lvl) * 3, 4, 1.2); c.fill(); } c.strokeStyle = L('#2a5aa0'); c.lineWidth = 0.6; c.beginPath(); c.moveTo(-4, -5); c.lineTo(4, -5); c.stroke(); c.restore(); }
  const H = {
    chop: (kind) => ({ kind, draw(c, x, y, s, a) { const f = a.f; c.strokeStyle = L('#3a2214'); c.lineWidth = 1.6; c.beginPath(); c.moveTo(x - f * 4 * s, y - 4 * s); c.lineTo(x + f * 22 * s, y + 4 * s); c.moveTo(x - f * 4 * s, y - 1 * s); c.lineTo(x + f * 22 * s, y + 6 * s); c.stroke(); if (this.kind) piece(c, this.kind, x + f * 22 * s, y + 9 * s, 0.85 * s); } }),
    basket: (b, lid) => ({ draw(c, x, y, s) { basket(c, x, y + 12 * s, s * 1.2, b, lid); } }),
    lid: () => ({ draw(c, x, y, s) { c.save(); c.translate(x, y); c.rotate(-0.3); c.fillStyle = L('#c89a5a'); c.beginPath(); c.moveTo(-14 * s, 4 * s); c.quadraticCurveTo(0, -8 * s, 14 * s, 4 * s); c.fill(); c.restore(); } }),
    pot: (pot) => ({ draw(c, x, y, s, a) { teapot(c, x, y + 10 * s, s * 1.15, pot, a.potTilt ? -a.f * a.potTilt : 0); } }),
    cup: (tb, i) => ({ draw(c, x, y, s, a) { c.save(); c.translate(x, y + 4 * s); c.rotate(-(a.cupTilt || 0) * a.f); cup(c, 0, 0, s * 1.25, tb.cups[i]); c.restore(); } }),
    stamp: () => ({ draw(c, x, y, s) { c.fillStyle = L('#5a2a14'); c.fillRect(x - 2 * s, y - 10 * s, 4 * s, 10 * s); c.fillStyle = L('#c42a22'); c.fillRect(x - 4 * s, y, 8 * s, 3 * s); } }),
    folder: () => ({ draw(c, x, y, s) { c.fillStyle = L('#3a1a14'); c.fillRect(x - 10 * s, y - 2 * s, 20 * s, 4 * s); c.fillStyle = L('#e8b440'); c.fillRect(x - 6 * s, y - 2 * s, 12 * s, 1.2 * s); } }),
    paper: () => ({ draw(c, x, y, s, a) { c.fillStyle = L('#ece6d8'); c.fillRect(x - 4 * s, y - 26 * s, a.f * 34 * s, 30 * s); c.fillStyle = L('#8a8478'); for (let i = 0; i < 6; i++) c.fillRect(x + a.f * 2 * s, y - 22 * s + i * 4 * s, a.f * 26 * s, 1.2 * s); c.fillStyle = L('#c42a22'); c.fillRect(x + a.f * 2 * s, y - 24 * s, a.f * 14 * s, 3 * s); } }),
    stack: (n) => ({ draw(c, x, y, s) { for (let i = 0; i < n; i++) basket(c, x, y + 12 * s - i * 11 * s, s * 0.9, null, false); } }),
    broom: () => ({ draw(c, x, y, s, a) { c.strokeStyle = L('#8a6a3a'); c.lineWidth = 2.4; c.beginPath(); c.moveTo(x, y - 30 * s); c.lineTo(x + a.f * 18 * s, y + 70 * s); c.stroke(); c.fillStyle = L('#c8a050'); K.poly(c, [x + a.f * 10 * s, y + 66 * s, x + a.f * 28 * s, y + 66 * s, x + a.f * 34 * s, y + 84 * s, x + a.f * 4 * s, y + 84 * s]); c.fill(); } }),
    cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    cash: () => ({ draw(c, x, y, s) { c.fillStyle = L('#c8302a'); c.fillRect(x - 7 * s, y - 3 * s, 14 * s, 6 * s); c.fillStyle = L('#6aa060'); c.fillRect(x - 6 * s, y - 5 * s, 13 * s, 6 * s); } }),
  };
  const potX = (tb) => tb.x + 64, cupX = (tb, i) => tb.x + (i ? 86 : -76), slotX = (tb, i) => tb.x - 40 + i * 36, cardX = (tb) => tb.x - 62;
  /* ---------- staff ---------- */
  function mkStaff() {
    may = K.mk(B({ T: 222, hw: 62, headR: 30, torso: 'round', pattern: 'apron', top: 'cream', top2: 'red', shirt: 'cream', pants: 'dark', hairStyle: 'bun', hair: 'dark' }), { role: 'auntie', staff: 1, hx: 214, f: -1, floorY: SF, sc: SSC, faceDir: -0.6 });
    lau = K.mk(B({ T: 244, hw: 60, headR: 29, pattern: 'vest', top: 'dark', shirt: 'white', tie: 'red', sleeve: 'white', pants: 'dark', hairStyle: 'short', hairD: 0.02 }), { role: 'waiter', staff: 1, hx: 1066, f: 1, floorY: SF, sc: SSC, faceDir: 0.5, speed: 1.35 });
    may.think = mayThink; lau.think = lauThink; fillTrolley();
  }
  const trolleyAt = (a) => { trolley.x = a.hx + a.f * 50; };
  function pushTo(x) { return K.ph(0, (s) => { s.walkTo = x; s.pushing = true; trolleyAt(s); s.tgN = [s.hx + s.f * 30, SF - 120]; s.tgF = [s.hx + s.f * 24, SF - 118]; }, { until: (s) => !s.walking, max: 30, exit: (s) => { s.pushing = false; trolleyAt(s); } }); }
  function mayThink(a) {
    const night = per() === 4;
    const call = TABLES.find((tb) => tb.call && tb.party);
    if (call && trolley.stack.length && call.baskets.length < 3) return serve(a, call); if (call && call.baskets.length >= 3) call.call = false;
    const dirty = TABLES.find((tb) => !tb.party && (tb.baskets.length || tb.empties) && tb === TA);
    if (dirty && K.cooled(a, 'clear', 4)) return clearA(a, dirty);
    if (trolley.stack.length < 3 && !night) return restock(a);
    if (!night && Math.random() < 0.35 && K.cooled(a, 'tour', 18)) { const tb = TABLES.find((q) => q.party && q.want > 0 && !q.baskets.some((b) => b.n > 0)); if (tb) { tb.call = true; return; } }
    if (night && K.cooled(a, 'fold', 6)) return K.start(a, 'fold', [pushTo(214), K.ph(rand(3, 5), (s, u, t) => { s.f = -1; s.tgN = [s.hx - 22 + Math.sin(t * 5) * 6, SF - 92]; s.tgF = [s.hx - 10, SF - 90 + Math.cos(t * 5) * 4]; s.leanT = 0.12; s.lxT = -0.4; })]);
    const r = Math.random();
    if (r < 0.4) return K.start(a, 'check', [K.ph(rand(2, 3), (s, u, t) => { s.tgN = [trolley.x - 4, SF - 96]; s.tgF = [trolley.x + 10, SF - 96]; s.leanT = 0.1; s.look = { x: () => trolley.x, until: K.simT + 0.3 }; if (u > 0.4 && u < 0.45) trolley.steam = 1; })]);
    return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.lxT = pick([-0.6, 0.6, 0.2]); })]);
  }
  function serve(a, tb) {
    tb.call = false; const kind = trolley.stack[trolley.stack.length - 1], sx = tb === TA ? tb.x + 46 : tb.x - 46, f = tb === TA ? -1 : 1;
    const used = tb.baskets.map((q) => q.slot), slot = [1, 0, 2].find((k) => !used.includes(k)) ?? 1; const b = { kind, n: kind === 'charsiu' ? 3 : kind === 'bao' || kind === 'tart' || kind === 'sesame' ? 3 : 4, slot };
    K.start(a, 'serve', [pushTo(sx + (tb === TA ? 4 : -4) * 0 - f * 0), K.ph(0.35, (s) => { s.f = f; trolleyAt(s); trolley.x = s.hx - f * 52; s.look = { x: () => tb.x, until: K.simT + 0.3 }; }, { enter: () => { K.say(a, DISH[kind], 1.6); const d = tb.party && tb.party.members[0]; if (d) K.after(0.9, () => K.say(d, pick(['Yes please!', 'icon:heart', 'Two!'])), 1.2); } }),
      K.ph(0.5, (s) => { s.tgN = [trolley.x, SF - 104]; s.leanT = 0.05; s.lxT = -f; }, { exit: (s) => { s.hold.N = H.lid(); trolley.steam = 1.4; K.fx('puff', trolley.x, SF - 120, { life: 1.2, col: '#ffffff' }); } }),
      K.ph(0.5, (s) => { s.tgF = [trolley.x + 4, SF - 100]; }, { exit: (s) => { trolley.stack.pop(); s.hold.F = H.basket(b, false); } }),
      K.ph(0.7, (s) => { s.lxT = f; s.tgF = [slotX(tb, b.slot), tb.top - 12]; s.leanT = 0.2; s.farFront = true; }, { exit: (s) => { s.hold.F = null; tb.baskets.push(b); s.farFront = false; } }),
      K.ph(0.45, (s) => { s.lxT = -f; s.tgN = [trolley.x, SF - 104]; s.leanT = 0.05; }, { exit: (s) => { s.hold.N = null; } }),
      K.ph(0.4, (s) => { s.lxT = f; s.tgN = [cardX(tb), tb.top - 26]; s.hold.N = H.stamp(); s.leanT = 0.18; }),
      K.ph(0.25, (s) => { s.tgN = [cardX(tb), tb.top - 6]; }, { exit: (s) => { tb.stamps++; K.fx('spark', cardX(tb), tb.top - 4, { life: 0.35, col: '#ff4a3a' }); K.say(a, 'icon:stamp', 0.8); } }),
      K.ph(0.3, (s) => { s.tgN = [cardX(tb), tb.top - 24]; }, { exit: (s) => { s.hold.N = null; s.leanT = 0; } }),
      pushTo(tb === TB ? 206 : 214)], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.pushing = false; s.farFront = false; } });
  }
  function restock(a) {
    K.start(a, 'restock', [pushTo(KDOOR.x0 + 6), K.ph(0.7, (s, u) => { s.alpha = Math.max(0.03, 1 - u); trolley.hide = u > 0.5 ? 1 : 0; }), K.ph(2.5, (s) => { s.alpha = 0.03; }, { exit: () => { fillTrolley(); trolley.dirty = 0; tub = 0; } }), K.ph(0.7, (s, u) => { s.alpha = Math.max(0.03, u); trolley.hide = u < 0.5 ? 1 : 0; }, { enter: () => { trolley.steam = 1.6; }, exit: (s) => { s.alpha = 1; } }), pushTo(214), K.ph(0.4, null, { enter: () => K.say(a, pick(['Fresh from the kitchen!', 'Hot hot hot!', 'icon:steam']), 1.3) })], { onAbort: (s) => { s.alpha = 1; trolley.hide = 0; s.pushing = false; } });
  }
  function clearA(a, tb) {
    const n = tb.baskets.length;
    K.start(a, 'clear', [pushTo(tb.x + 46), K.ph(0.3, (s) => { s.f = -1; trolley.x = s.hx + 52; }),
      K.ph(0.6, (s) => { s.tgF = [tb.x - 20, tb.top - 10]; s.leanT = 0.2; s.farFront = true; }, { exit: () => { trolley.dirty += tb.baskets.length + (tb.empties || 0); tb.baskets = []; tb.empties = 0; } }),
      K.ph(1.4, (s, u, t) => { s.farFront = false; s.hold.N = H.cloth(); s.tgN = [tb.x + Math.sin(t * 7) * 34, tb.top - 6]; s.leanT = 0.22; }, { exit: (s) => { s.hold.N = null; tb.stamps = 0; tb.cups = [0, 0]; tb.pot.level = 1; tb.pot.lid = 0; } })], { onAbort: (s) => { s.hold.N = null; s.farFront = false; s.pushing = false; } });
    void n;
  }
  function lauThink(a) {
    const night = per() === 4;
    const bill = TABLES.find((tb) => tb.party && tb.party.bill === 1);
    if (bill) return bringBill(a, bill);
    const lid = TABLES.find((tb) => tb.pot.lid && !tb.pot.held);
    if (lid) return refill(a, lid);
    if (!TB.party && (TB.baskets.length || TB.empties)) return clearB(a);
    if (night && K.cooled(a, 'sweep', 10)) return K.start(a, 'sweep', [K.ph(0, (s) => { s.walkTo = rand(1062, 1086); }, { until: (s) => !s.walking, max: 12 }), K.ph(rand(4, 6), (s, u, t) => { s.hold.N = H.broom(); s.carryUp = false; s.tgN = [s.hx + s.f * 10 + Math.sin(t * 4) * 16, s.hy - 30]; s.tgF = [s.hx + s.f * 4 + Math.sin(t * 4) * 12, s.hy - 60]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; s.carryUp = true; swept++; } })], { onAbort: (s) => { s.hold.N = null; s.carryUp = true; } });
    const r = Math.random();
    if (r < 0.3) return K.start(a, 'towel', [K.ph(0, (s) => { s.walkTo = URN.x + 40; }, { until: (s) => !s.walking, max: 12 }), K.ph(rand(2.5, 4), (s, u, t) => { s.f = -1; s.hold.N = H.cloth(); s.tgN = [URN.x + 8 + Math.sin(t * 6) * 14, URN.top - 4]; s.leanT = 0.15; s.lxT = 0.8; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
    return K.start(a, 'idle', [K.ph(rand(2, 3.5), (s) => { s.tgN = [s.hx + s.f * 6, s.hy - 20]; s.tgF = [s.hx - s.f * 4, s.hy - 22]; s.lxT = pick([-0.7, 0.5]); })]);
  }
  function refill(a, tb) {
    const p = tb.pot, bx = tb === TA ? tb.x + 60 : tb.x + 40, back = 1066;
    p.held = 1;
    K.start(a, 'refill', [K.ph(0, (s) => { s.walkTo = bx; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.5, (s) => { s.f = potX(tb) < s.hx ? -1 : 1; s.tgN = [potX(tb), tb.top - 10]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = H.pot(p); p.away = 1; } }),
      K.ph(0, (s) => { s.walkTo = URN.x + 34; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(1.6, (s, u) => { s.f = -1; s.tgN = [URN.x + 4, URN.top - 30]; s.leanT = 0.08; p.level = u; if (Math.random() < 0.1) K.fx('puff', URN.x, URN.top - 60, { life: 1, col: '#ffffff' }); }, { exit: () => { p.lid = 0; } }),
      K.ph(0, (s) => { s.walkTo = bx; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.5, (s) => { s.f = potX(tb) < s.hx ? -1 : 1; s.tgN = [potX(tb), tb.top - 12]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; p.away = 0; p.held = 0; K.say(a, pick(['Fresh pot', 'icon:tea']), 1.1); const d = tb.party && tb.party.members[0]; if (d) K.after(0.5, () => tap(d, tb)); } }),
      K.ph(0, (s) => { s.walkTo = back; }, { until: (s) => !s.walking, max: 30 })], { onAbort: (s) => { if (s.hold.N) { s.hold.N = null; } p.away = 0; p.held = 0; p.level = Math.max(p.level, 0.6); p.lid = 0; } });
  }
  function bringBill(a, tb) {
    tb.party.bill = 2; const bx = tb === TA ? tb.x + 30 : tb.x - 40;
    K.start(a, 'bill', [K.ph(0, (s) => { s.walkTo = URN.x + 40; s.hold.N = H.folder(); }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0, (s) => { s.walkTo = bx; }, { until: (s) => !s.walking, max: 30 }),
      K.ph(0.6, (s) => { s.f = tb === TA ? -1 : 1; s.tgN = [cardX(tb) + 10, tb.top - 6]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; tb.folder = 1; K.say(a, pick(['Thank you!', 'Mm goi!']), 1.1); if (tb.party) tb.party.bill = 3; } }),
      K.ph(rand(2.5, 3.5), (s) => { s.leanT = 0; s.look = { x: () => tb.x, until: K.simT + 0.3 }; }, { until: () => !tb.party || tb.party.bill >= 4, max: 8 }),
      K.ph(0.5, (s) => { s.tgN = [cardX(tb) + 10, tb.top - 6]; s.leanT = 0.2; }, { exit: (s) => { tb.folder = 0; s.hold.N = H.folder(); K.say(a, 'icon:heart', 0.8); } }),
      K.ph(0, (s) => { s.walkTo = 1066; }, { until: (s) => !s.walking, max: 30 }), K.ph(0.3, null, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; tb.folder = 0; if (tb.party && tb.party.bill < 4) tb.party.bill = 4; } });
  }
  function clearB(a) {
    const tb = TB, n = tb.baskets.length + (tb.empties || 0);
    K.start(a, 'clear', [K.ph(0, (s) => { s.walkTo = tb.x - 46; }, { until: (s) => !s.walking, max: 20 }), K.ph(0.2, (s) => { s.f = 1; }),
      K.ph(0.6, (s) => { s.tgN = [tb.x - 20, tb.top - 10]; s.leanT = 0.2; }, { exit: (s) => { tb.baskets = []; tb.empties = 0; s.hold.N = H.stack(Math.min(4, n)); } }),
      K.ph(1.2, (s, u, t) => { s.hold.F = H.cloth(); s.farFront = true; s.tgF = [tb.x + Math.sin(t * 7) * 34, tb.top - 6]; s.leanT = 0.2; }, { exit: (s) => { s.hold.F = null; s.farFront = false; tb.stamps = 0; tb.cups = [0, 0]; tb.pot.level = 1; tb.pot.lid = 0; } }),
      K.ph(0, (s) => { s.walkTo = URN.x + 30; s.leanT = 0; }, { until: (s) => !s.walking, max: 20 }),
      K.ph(0.5, (s) => { s.f = -1; s.tgN = [URN.x - 6, URN.top + 40]; }, { exit: (s) => { s.hold.N = null; tub = Math.min(6, tub + n); } })], { onAbort: (s) => { s.hold.N = null; s.hold.F = null; s.farFront = false; } });
  }
  /* ---------- diners ---------- */
  const TYPES = {
    popo: { body: B({ T: 218, hw: 60, headR: 29, torso: 'round', pattern: 'cardigan', top: 'plum', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', pants: 'navy' }), vary: { top: ['plum', 'teal', 'coral'] }, words: ['Ho sik!', 'More tea?', 'Eat, eat!'] },
    gonggong: { body: B({ T: 232, hw: 62, pattern: 'polo', top: 'grey', hair: 'hairGrey', glasses: 1, pants: 'brown' }), vary: { top: ['grey', 'olive', 'cream'] }, words: ['Hmm.', 'Good har gow', 'Racing results…'], paper: 1 },
    office: { body: B({ pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', pants: 'navy', lanyard: 1 }), vary: { top: ['navy', 'grey'], tie: ['coral', 'mustard', 'teal'] }, words: ['Quick lunch', 'Back at two', 'icon:clock'] },
    lover: { body: B({ T: 232, hw: 56, headR: 28, pattern: 'tee', top: 'teal', hairStyle: 'long', pants: 'cream' }), vary: { top: ['teal', 'mustard', 'coral'] }, words: ['Try this', 'icon:heart'] },
    lover2: { body: B({ pattern: 'jacket', top: 'olive', shirt: 'cream', pants: 'dark' }), vary: { top: ['olive', 'brown', 'navy'] }, words: ['So good', 'icon:heart'] },
    tourist: { body: B({ pattern: 'tee', top: 'mustard', hat: 'bucket', hatCol: 'cream', camera: 1, pants: 'olive' }), vary: { top: ['mustard', 'coral', 'teal'] }, words: ['What is this one?', 'Amazing!', 'icon:cam'] },
    student: { body: B({ pattern: 'hoodie', top: 'olive', hood: 1, pants: 'navy' }), vary: { top: ['olive', 'plum', 'grey'] }, words: ['Cheap and good', 'icon:laugh'] },
    mum: { body: B({ T: 230, hw: 56, headR: 28, pattern: 'dress', top: 'coral', skirt: 'coral', hairStyle: 'pony' }), vary: { top: ['coral', 'teal'] }, words: ['Blow on it first', 'Careful, hot!'] },
    kid: { body: B({ T: 168, hw: 52, headR: 30, pattern: 'knit', top: 'mustard', top2: 'mustard', hairStyle: 'short', pants: 'navy' }), words: ['Sesame ball!', 'icon:heart', 'Again!'] },
  };
  const PARTIES = [{ m: ['popo', 'gonggong'], w: [4, 2, 2, 1, 0] }, { m: ['gonggong'], w: [3, 1, 2, 0, 0] }, { m: ['office'], w: [0.5, 4, 0.5, 1, 0] }, { m: ['lover', 'lover2'], w: [1, 1, 2, 3, 0] }, { m: ['tourist'], w: [1, 2, 2, 1, 0] }, { m: ['student'], w: [0.5, 1, 2, 1, 0] }, { m: ['mum', 'kid'], w: [2, 1, 1, 1, 0] }];
  function arrive(tb) {
    const p = per(); if (p === 4) return false;
    const list = PARTIES.filter((q) => q.w[p] > 0 && !diners().some((d) => q.m.includes(d.type)));
    if (!list.length) return false; let tot = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * tot, pt = list[0];
    for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
    const party = { members: [], tb, bill: 0 }; tb.party = party; tb.want = randi(2, 4); tb.stamps = 0; tb.cups = [0, 0]; tb.pot = { level: 1, lid: 0, held: 0 };
    pt.m.forEach((type, j) => { const st = pt.m.length === 1 ? (tb === TA ? tb.seats[0] : tb.seats[1]) : tb.seats[j]; const a = mkDiner(type, tb.from + (tb === TA ? -j * 50 : j * 50)); a.party = party; a.tb = tb; a.seat = st; st.occ = a; a.walkTo = st.x + (st.f > 0 ? -2 : 2); a.cupI = tb.seats.indexOf(st); party.members.push(a); });
    return true;
  }
  function mkDiner(type, x) {
    const T0 = TYPES[type], def = Object.assign({}, T0.body); for (const k in T0.vary || {}) def[k] = pick(T0.vary[k]);
    const a = K.mk(def, { type, T0, cust: 1, hx: x, f: x < 640 ? 1 : -1, floorY: FL - 8, sc: type === 'kid' ? SC * 0.86 : SC, alpha: 0, fade: 1.5, speed: rand(0.95, 1.1) });
    if (cool('snow') && Math.random() < 0.7) a.scarf = pick(['coral', 'cream', 'mustard', 'teal']);
    if (cool('rain') && Math.random() < 0.5) a.brolly = 1;
    a.think = dinerThink; a.phase = 'enter'; return a;
  }
  function sitAt(a) { const st = a.seat; K.sitDown(a, st.x, 600, st.f); a.floorY = 704; a.tableY = a.tb.top - 6; a.faceDir = st.f * 0.85; a.phase = 'settle'; }
  function dinerThink(a) {
    const tb = a.tb, party = a.party, mate = party.members.find((m) => m !== a);
    if (a.phase === 'enter') { if (!a.walking && a.walkTo == null && a.alpha > 0.5) sitAt(a); return; }
    if (a.state === 'sit' || a.state === 'rise') return;
    if (lion && lion.t > 1 && lion.t < 11 && a.phase !== 'out') return K.start(a, 'lion', [K.ph(1, (s) => { s.look = { x: () => MOON.x, until: K.simT + 0.3 }; s.lxT = clamp((MOON.x - s.hx) / 60, -1, 1); })]);
    if (a.phase === 'settle') {
      a.phase = 'eat'; if (a === party.members[0]) { tb.call = true; return pour(a, tb, mate ? mate.cupI : a.cupI, mate); }
      return K.start(a, 'look', [K.ph(rand(1, 2), (s) => { s.look = { x: () => may.hx, until: K.simT + 0.3 }; })]);
    }
    if (a.phase === 'eat') {
      if (party.bill) { a.phase = 'billing'; return; }
      const b = tb.baskets.find((q) => q.n > 0 && !q.busy);
      const r = Math.random();
      if (b && r < 0.55) return bite(a, tb, b);
      if (tb.cups[a.cupI] > 0.1 && r < 0.72) return sip(a, tb);
      if (tb.cups[mate ? mate.cupI : a.cupI] < 0.2 && tb.pot.level > 0.05 && !tb.pot.lid && !tb.pot.away && !tb.pot.inUse && r < 0.85) return pour(a, tb, mate ? mate.cupI : a.cupI, mate);
      if (tb.pot.level <= 0.05 && !tb.pot.lid && !tb.pot.inUse) return flipLid(a, tb);
      if (!tb.baskets.some((q) => q.n > 0)) {
        if (tb.want > 0 && !tb.call && K.cooled(a, 'wave', 8) && per() !== 4) { tb.call = true; return K.start(a, 'wave', [K.ph(1.2, (s, u, t) => { s.tgN = [s.hx + s.f * 20 + Math.sin(t * 12) * 6, s.R.cy - 50]; s.look = { x: () => may.hx, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Auntie!', 'Over here!', 'icon:wave']), 1.2) })]); }
        if (tb.want <= 0 && a === party.members[0] && !party.bill && K.cooled(a, 'full', 3)) { party.bill = 1; return K.start(a, 'mai', [K.ph(1.6, (s, u, t) => { s.tgN = [s.hx + s.f * 22 + Math.sin(t * 10) * 7, s.R.cy - 30 + Math.cos(t * 10) * 4]; s.lxT = s.f > 0 ? 1 : -1; }, { enter: () => K.say(a, 'Mai dan!', 1.4) })]); }
      }
      if (a.T0.paper && r < 0.92 && K.cooled(a, 'paper', 10)) return K.start(a, 'paper', [K.ph(rand(4, 6), (s) => { s.hold.N = H.paper(); s.tgN = [s.hx + s.f * 20, s.R.cy + 50]; s.tgF = [s.hx + s.f * 40, s.R.cy + 52]; s.carryUp = false; s.headDy = 2; }, { exit: (s) => { s.hold.N = null; s.headDy = 0; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (a.def.camera && r < 0.94 && b && K.cooled(a, 'photo', 12)) return K.start(a, 'photo', [K.ph(1.4, (s) => { s.tgN = [s.R.cx + s.f * 10, s.R.cy + 8]; s.tgF = [s.R.cx + s.f * 14, s.R.cy + 10]; s.look = { x: () => slotX(tb, b.slot), until: K.simT + 0.3 }; }, { exit: () => { K.fx('flash', a.R.cx + a.f * 14, a.R.cy + 8); K.say(a, 'icon:cam', 0.9); } })]);
      if (mate && r < 0.97 && K.cooled(a, 'chat', 7)) { const [l1, l2] = pick([[a.T0.words[0], mate.T0.words[0]], ['Try the siu mai', 'Mm!'], ['Busy today', 'Always'], [pick(a.T0.words), 'icon:laugh']]); K.start(mate, 'listen', [K.ph(2.2, (s) => { s.look = { x: () => a.hx, until: K.simT + 0.3 }; }, { enter: () => K.after(1.1, () => K.say(mate, l2, 1.3)) })]); return K.start(a, 'chat', [K.ph(2.2, (s, u, t) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; s.tgN = [s.hx + s.f * 26 + Math.sin(t * 5) * 6, tb.top - 30]; }, { enter: () => K.say(a, l1, 1.4) })]); }
      return K.start(a, 'idle', [K.ph(rand(1.2, 2.5), null)]);
    }
    if (a.phase === 'billing') {
      if (party.bill === 3 && a === party.members[0]) { return K.start(a, 'pay', [K.ph(0.6, (s) => { s.tgN = [s.R.cx, s.R.cy + 60]; }, { exit: (s) => { s.hold.N = H.cash(); } }), K.ph(0.6, (s) => { s.tgN = [cardX(tb) + 10, tb.top - 10]; }, { exit: (s) => { s.hold.N = null; party.bill = 4; } })]); }
      if (party.bill >= 4) { a.phase = 'leave'; K.after(rand(0.5, 1.5), () => K.standUp(a)); return; }
      return K.start(a, 'wait', [K.ph(rand(1, 2), (s) => { s.look = { x: () => lau.hx, until: K.simT + 0.3 }; })]);
    }
    if (a.phase === 'leave') {
      if (a.state !== 'stand') return;
      if (a.seat) { a.seat.occ = null; a.seat = null; }
      a.floorY = FL - 8; a.phase = 'out'; a.walkTo = tb.from; K.say(a, pick(['Mm goi!', 'Thank you!', 'Bye bye!']), 1.2);
      if (party.members.every((m) => m.phase === 'out')) { tb.party = null; tb.call = false; tb.folder = 0; }
      return;
    }
    if (a.phase === 'out') { if (!a.walking) a.fade = -2; else if (Math.abs(a.hx - tb.from) < 80) a.fade = -1.5; }
  }
  const mouth = (s) => [s.R.cx + s.f * s.R.R * 0.75, s.R.cy + s.R.R * 0.35];
  function bite(a, tb, b) {
    b.busy = 1;
    return K.start(a, 'bite', [K.ph(0.25, (s) => { s.hold.N = H.chop(null); }), K.ph(0.55, (s) => { s.tgN = [slotX(tb, b.slot) - s.f * 18, tb.top - 22]; s.leanT = 0.14; }, { exit: (s) => { if (b.n > 0) { b.n--; s.hold.N = H.chop(b.kind); } } }),
      K.ph(0.6, (s) => { const m = mouth(s); s.tgN = [m[0] - s.f * 18, m[1] - 4]; s.leanT = 0.05; }, { exit: (s) => { s.hold.N = H.chop(null); } }),
      K.ph(rand(1, 1.6), (s, u, t) => { s.headDy = Math.abs(Math.sin(t * 9)) * 1.6; s.tgN = [s.hx + s.f * 30, tb.top - 16]; }, { exit: (s) => { s.headDy = 0; b.busy = 0; if (b.n <= 0) { tb.want--; if (Math.random() < 0.5) K.say(a, pick(['Ho sik!', 'icon:heart', 'Mmm']), 1.1); K.after(0.4, () => { const i = tb.baskets.indexOf(b); if (i >= 0) { tb.baskets.splice(i, 1); tb.empties = (tb.empties || 0) + 1; } }); } } }),
      K.ph(0.2, null, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; b.busy = 0; s.headDy = 0; } });
  }
  function sip(a, tb) {
    const i = a.cupI, cx = cupX(tb, i);
    return K.start(a, 'sip', [K.ph(0.5, (s) => { s.tgN = [cx, tb.top - 10]; }, { exit: (s) => { s.hold.N = H.cup(tb, i); tb.lift = tb.lift || {}; tb.lift[i] = 1; } }),
      K.ph(0.5, (s) => { const m = mouth(s); s.tgN = [m[0], m[1] + 4]; }),
      K.ph(0.8, (s, u) => { s.cupTilt = Math.sin(u * Math.PI) * 0.8; }, { exit: (s) => { tb.cups[i] = Math.max(0, tb.cups[i] - rand(0.25, 0.4)); s.cupTilt = 0; } }),
      K.ph(0.45, (s) => { s.tgN = [cx, tb.top - 8]; }, { exit: (s) => { s.hold.N = null; tb.lift[i] = 0; } })], { onAbort: (s) => { s.hold.N = null; if (tb.lift) tb.lift[i] = 0; s.cupTilt = 0; } });
  }
  function pour(a, tb, i, mate) {
    const p = tb.pot, cx = cupX(tb, i); p.inUse = 1;
    return K.start(a, 'pour', [K.ph(0.55, (s) => { s.tgF = [potX(tb), tb.top - 10]; s.farFront = true; s.leanT = 0.12; }, { exit: (s) => { s.hold.F = H.pot(p); p.away = 1; } }),
      K.ph(0.5, (s) => { s.tgF = [cx - s.f * 6, tb.top - 34]; }, { exit: () => { if (mate) tap(mate, tb); } }),
      K.ph(1.0, (s, u) => { s.potTilt = Math.sin(clamp(u * 1.3, 0, 1) * Math.PI * 0.5) * 0.7; const d = Math.min(p.level, 0.012); if (u > 0.2 && u < 0.85 && tb.cups[i] < 0.95 && p.level > 0) { tb.cups[i] = Math.min(1, tb.cups[i] + 0.035); p.level = Math.max(0, p.level - d * 1.6); tb.stream = { x0: s.hF.x + s.f * 14, y0: s.hF.y - 4, x1: cx, y1: tb.top - 14 }; } else tb.stream = null; }, { exit: (s) => { s.potTilt = 0; tb.stream = null; } }),
      K.ph(0.5, (s) => { s.tgF = [potX(tb), tb.top - 10]; }, { exit: (s) => { s.hold.F = null; p.away = 0; p.inUse = 0; s.farFront = false; s.leanT = 0; } })], { onAbort: (s) => { s.hold.F = null; p.away = 0; p.inUse = 0; s.potTilt = 0; tb.stream = null; s.farFront = false; } });
  }
  function tap(m, tb) { if (!m || m.state !== 'seated' || (m.act && m.act.name !== 'idle' && m.act.name !== 'look' && m.act.name !== 'listen')) return; K.abort(m); K.start(m, 'tap', [K.ph(1.0, (s, u, t) => { s.tgN = [s.hx + s.f * 34, tb.top - 4 - Math.abs(Math.sin(t * 14)) * 7]; s.leanT = 0.1; }, { enter: () => K.say(m, 'icon:tap', 0.9) })]); }
  function flipLid(a, tb) { return K.start(a, 'lid', [K.ph(0.5, (s) => { s.tgN = [potX(tb), tb.top - 26]; }, { exit: () => { tb.pot.lid = 1; } }), K.ph(0.6, (s) => { s.tgN = [s.hx + s.f * 24, tb.top - 12]; s.look = { x: () => lau.hx, until: K.simT + 0.5 }; })]); }
  /* ---------- events ---------- */
  function startLion() { if (lion) return; lion = { t: 0 }; K.say(may, pick(['Lion dance!', 'Good luck!']), 1.4); K.say(lau, 'icon:drum', 1.4); }
  function onClear(Kk, big, n) {
    trolley.steam = big ? 2.2 : 1.2; if (big) { K.fx('puff', trolley.x, SF - 124, { life: 1.4, col: '#ffffff' }); K.say(may, pick(['Hot har gow!', 'Fresh siu mai!', 'Ho sik!']), 1.4); }
    for (const d of diners()) if (d.state === 'seated' && (!d.act || d.act.name === 'idle')) { if (big || Math.random() < 0.4) K.say(d, pick(['Ho sik!', 'icon:heart', 'Wah!', 'icon:star']), 1.2); }
    if (big && !lion && Math.random() < 0.3) nextLion = Math.min(nextLion, 2);
  }
  function sim(Kk, dt) {
    nextArrive -= dt; const p = per();
    if (nextArrive <= 0) { const target = [2, 2, 1, 2, 0][p], busy = TABLES.filter((tb) => tb.party).length; const free = TABLES.filter((tb) => !tb.party && !tb.baskets.length && !tb.empties); if (busy < target && free.length) arrive(pick(free)); nextArrive = rand(8, 16); }
    trolley.steam = Math.max(0, trolley.steam - dt * 0.5);
    nextLion -= dt * (p === 0 ? 1.4 : p === 4 ? 0.2 : 0.7); if (nextLion <= 0 && !lion) { startLion(); nextLion = rand(150, 260); }
    if (lion) { lion.t += dt; if (lion.t > 14) { lion = null; for (const d of diners()) if (d.state === 'seated' && Math.random() < 0.7) K.say(d, pick(['icon:star', 'Kung hei!', 'icon:heart']), 1.2); } }
    const h = ((K.hour % 24) + 24) % 24; sign = h >= 6.8 && h < 22 ? 1 : 0;
    for (const tb of TABLES) { if (tb.pot.away || tb.pot.inUse) continue; }
  }
  function build(Kk) {
    K = Kk; mkStaff();
    if (per() !== 4) { // a regular already at table A with tea and a half-finished basket
      const party = { members: [], tb: TA, bill: 0 }; TA.party = party; TA.want = 2; const a = mkDiner('gonggong', TA.seats[0].x); a.alpha = 1; a.fade = 0; a.party = party; a.tb = TA; a.seat = TA.seats[0]; TA.seats[0].occ = a; a.cupI = 0; party.members.push(a);
      a.state = 'seated'; a.seatY = 600; a.floorY = 704; a.tableY = TA.top - 6; a.f = 1; a.faceDir = 0.85; a.phase = 'eat'; K.settle(a);
      TA.baskets.push({ kind: 'hargow', n: 2, slot: 0 }); TA.stamps = 2; TA.cups = [0.6, 0];
    }
    nextArrive = 2;
  }
  /* ---------- drawing ---------- */
  function cloud(c, x, y, s, col) { c.fillStyle = col; for (const [dx, dy, r] of [[0, 0, 10], [12, -4, 8], [-12, -3, 8], [6, 6, 6], [-6, 6, 6]]) { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, TAU); c.fill(); } }
  function lantern(c, x, y, r, lit) {
    const P = K.P; c.strokeStyle = L(P.gold2); c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - r * 0.9); c.stroke();
    c.fillStyle = P.red; ellipse(c, x, y, r, r * 0.86); c.fill(); c.fillStyle = 'rgba(0,0,0,0.12)'; ellipse(c, x + r * 0.35, y, r * 0.5, r * 0.84); c.fill(); c.strokeStyle = rgba(P.gold, 0.5); c.lineWidth = 1; for (const k of [-0.5, 0, 0.5]) { c.beginPath(); c.ellipse(x, y, r * Math.abs(k) + 0.1, r * 0.86, 0, 0, TAU); c.stroke(); }
    c.fillStyle = P.gold; c.fillRect(x - r * 0.4, y - r * 0.98, r * 0.8, r * 0.18); c.fillRect(x - r * 0.4, y + r * 0.8, r * 0.8, r * 0.18); c.strokeStyle = P.gold; c.lineWidth = 1.2; c.beginPath(); for (let i = -2; i <= 2; i++) { c.moveTo(x + i * 2.5, y + r); c.lineTo(x + i * 2.5, y + r * 1.5); } c.stroke();
    K.glow(c, x, y, r * 4, P.lamp, P.glowA * lit);
  }
  function drawRoom(c, t) {
    const P = K.P;
    c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 640);
    // ceiling coffers + gold beam
    c.fillStyle = P.red2; c.fillRect(-60, 0, 1400, 70); for (let x = -60; x < 1340; x += 80) { c.fillStyle = P.red; c.fillRect(x + 8, 8, 64, 50); c.fillStyle = rgba(P.gold, 0.6); c.fillRect(x + 30, 26, 20, 14); }
    c.fillStyle = P.gold; c.fillRect(-60, 70, 1400, 6); c.fillStyle = P.gold2; c.fillRect(-60, 76, 1400, 3);
    // wall panels with lattice friezes
    for (let x = -60; x < 1340; x += 160) { c.fillStyle = P.wall2; c.fillRect(x + 12, 100, 136, 330); c.strokeStyle = rgba(P.gold2, 0.5); c.lineWidth = 2; c.strokeRect(x + 18, 106, 124, 318); }
    // red lacquer wainscot with gold rail
    c.fillStyle = P.red; c.fillRect(-60, 430, 1400, 210); c.fillStyle = P.red2; for (let x = -60; x < 1340; x += 90) c.fillRect(x + 8, 446, 74, 150); c.fillStyle = P.gold; c.fillRect(-60, 428, 1400, 5); c.fillRect(-60, 600, 1400, 3);
    // centre wall behind the board: one plain lacquer panel with a thin gold frame and a quiet ring — nothing busy to read through the well
    c.fillStyle = P.gold2; c.fillRect(470, 104, 340, 330); c.fillStyle = P.red; c.fillRect(480, 114, 320, 310);
    c.strokeStyle = rgba(P.gold, 0.35); c.lineWidth = 2; c.strokeRect(492, 126, 296, 286);
    c.strokeStyle = rgba(P.gold, 0.4); c.lineWidth = 3; c.beginPath(); c.arc(640, 268, 54, 0, TAU); c.stroke();
    // left tall lattice window
    { const { x0, y0, x1, y1 } = LWIN; c.fillStyle = P.wood; c.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16); c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip(); K.sky(c, x0, y0, x1, y1, { noSun: 1, sunR: 10 }); c.fillStyle = P.city; c.fillRect(x0, y0 + 120, 40, 200); c.fillRect(x0 + 60, y0 + 90, 50, 200); c.fillStyle = P.city2; c.fillRect(x0 + 34, y0 + 150, 34, 200);
      if (P.night > 0.3) { c.fillStyle = rgba('#ffd890', P.night); for (let i = 0; i < 8; i++) c.fillRect(x0 + 8 + (i % 3) * 32, y0 + 130 + Math.floor(i / 3) * 28, 8, 10); }
      K.weather(c, x0, y0, x1, y1); c.restore();
      c.strokeStyle = P.wood; c.lineWidth = 4; c.beginPath(); for (let y = y0 + 38; y < y1; y += 38) { c.moveTo(x0, y); c.lineTo(x1, y); } c.moveTo((x0 + x1) / 2, y0); c.lineTo((x0 + x1) / 2, y1); c.stroke();
      c.strokeStyle = rgba(P.gold2, 0.8); c.lineWidth = 2; for (let y = y0 + 19; y < y1; y += 38) { c.strokeRect(x0 + 14, y - 8, 24, 16); c.strokeRect(x1 - 38, y - 8, 24, 16); } }
    // kitchen swing door with porthole (behind the HOLD panel)
    c.fillStyle = P.woodDk; c.fillRect(KDOOR.x0 - 6, 330, KDOOR.x1 - KDOOR.x0 + 12, 276); c.fillStyle = P.wood; c.fillRect(KDOOR.x0, 336, KDOOR.x1 - KDOOR.x0, 268); c.fillStyle = rgba('#fff2c8', 0.7); c.beginPath(); c.arc((KDOOR.x0 + KDOOR.x1) / 2, 390, 14, 0, TAU); c.fill(); c.strokeStyle = P.gold; c.lineWidth = 3; c.stroke();
    // moon-gate window onto the street (right)
    const { x, y, r } = MOON; c.fillStyle = P.wood; c.beginPath(); c.arc(x, y, r + 12, 0, TAU); c.fill();
    c.save(); c.beginPath(); c.arc(x, y, r, 0, TAU); c.clip(); K.sky(c, x - r, y - r, x + r, y + r, { sunR: 14 });
    c.fillStyle = P.city; c.fillRect(x - r, y + 6, 70, 120); c.fillRect(x + 30, y - 30, 90, 160); c.fillStyle = P.city2; c.fillRect(x - 46, y - 10, 80, 140);
    for (let i = 0; i < 4; i++) { c.fillStyle = [P.red, P.teal, P.mustard, P.coral][i]; c.fillRect(x - r + 10 + i * 56, y + 40 + (i % 2) * 14, 34, 12); } // shop signs
    if (P.night > 0.3) { c.fillStyle = rgba('#ffd890', P.night); for (let i = 0; i < 12; i++) c.fillRect(x - 40 + (i % 4) * 18, y + 4 + Math.floor(i / 4) * 22, 7, 9); c.fillStyle = rgba('#ff5a8a', P.night * 0.8); c.fillRect(x + 44, y - 16, 8, 50); }
    c.fillStyle = L('#5a5560'); c.fillRect(x - r, y + 70, 2 * r, 50); c.fillStyle = L('#7a7480'); c.fillRect(x - r, y + 70, 2 * r, 4);
    if (cool('snow')) { c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(x - r, y + 68, 2 * r, 6); }
    // tram passes
    { const tx = x - r - 160 + ((t * 28) % (2 * r + 320)); c.fillStyle = L('#3a7a4a'); c.fillRect(tx, y + 20, 120, 50); c.fillStyle = L('#f2e6c8'); c.fillRect(tx, y + 20, 120, 8); c.fillStyle = rgba(P.sky1, 0.8); for (let i = 0; i < 4; i++) c.fillRect(tx + 8 + i * 28, y + 32, 20, 16); c.fillStyle = L('#2a2a2a'); c.beginPath(); c.arc(tx + 24, y + 72, 5, 0, TAU); c.arc(tx + 96, y + 72, 5, 0, TAU); c.fill(); }
    if (lion) drawLion(c, t);
    K.weather(c, x - r, y - r, x + r, y + r); c.restore();
    c.strokeStyle = P.wood; c.lineWidth = 4; c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r, y); c.moveTo(x, y - r); c.lineTo(x, y + r); c.stroke(); c.strokeStyle = P.gold; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r + 4, 0, TAU); c.stroke();
    // OPEN sign hanging in the moon window
    c.fillStyle = sign ? P.red : L('#4a3a3a'); c.fillRect(x - 30, y + r - 54, 60, 22); c.fillStyle = sign ? P.gold : L('#9a8a7a'); c.font = '700 13px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(sign ? 'OPEN' : 'CLOSED', x, y + r - 43);
    if (sign && P.night > 0.2) K.glow(c, x, y + r - 43, 50, '#ff5a3a', 0.25 * P.night);
    // tea station: cabinet + hot water urn + bus tub
    c.fillStyle = P.woodDk; c.fillRect(URN.x - 30, URN.top, 64, 134); c.fillStyle = P.wood; c.fillRect(URN.x - 26, URN.top + 8, 56, 120); c.fillStyle = P.gold; c.fillRect(URN.x - 30, URN.top, 64, 4);
    c.fillStyle = L('#c8ccd0'); roundRect(c, URN.x - 14, URN.top - 58, 28, 58, 6); c.fill(); c.fillStyle = L('#a0a6ac'); c.fillRect(URN.x - 14, URN.top - 60, 28, 6); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(URN.x - 10, URN.top - 52, 4, 46); c.fillStyle = L('#3a3a3a'); c.fillRect(URN.x - 3, URN.top - 20, 6, 8);
    for (let i = 0; i < Math.min(tub, 5); i++) basket(c, URN.x + 2, URN.top + 50 - i * 9, 0.8, null, false);
  }
  function drawLion(c, t) {
    const u = lion.t / 14, { x, y, r } = MOON, lx = x - r - 120 + u * (2 * r + 240), by = y + 66, bob = Math.sin(lion.t * 7) * 6, P = K.P;
    c.fillStyle = L('#f0b02a'); for (let i = 0; i < 3; i++) { ellipse(c, lx - 30 - i * 26, by - 30 + Math.sin(lion.t * 7 - i) * 4, 22, 18); c.fill(); }
    c.fillStyle = L('#e8302a'); for (let i = 0; i < 6; i++) c.fillRect(lx - 90 + i * 14, by - 20 + Math.sin(lion.t * 7 - i * 0.5) * 3, 8, 14);
    c.save(); c.translate(lx, by - 40 + bob); c.rotate(Math.sin(lion.t * 3.5) * 0.25);
    c.fillStyle = L('#e8302a'); roundRect(c, -26, -24, 52, 44, 14); c.fill(); c.fillStyle = L('#f0b02a'); c.fillRect(-26, -4, 52, 8); c.fillStyle = '#fff'; c.beginPath(); c.arc(-10, -10, 7, 0, TAU); c.arc(12, -10, 7, 0, TAU); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(-9, -10, 3, 0, TAU); c.arc(13, -10, 3, 0, TAU); c.fill();
    c.fillStyle = '#fff'; c.fillRect(-18, 12, 36, 6); c.fillStyle = L('#3aa078'); c.beginPath(); c.arc(0, -26, 6, 0, TAU); c.fill(); c.restore();
    c.fillStyle = L('#2a2a2a'); for (let i = 0; i < 2; i++) { const st = Math.sin(lion.t * 9 + i * 3) * 6; c.fillRect(lx - 8 + i * 16 + st, by - 4, 6, 18); c.fillRect(lx - 70 + i * 16 - st, by - 4, 6, 18); }
    void P; void t;
  }
  function drawTrolley(c) {
    if (trolley.hide) return; const P = K.P, x = trolley.x, top = SF - 92;
    c.strokeStyle = L('#a8aeb4'); c.lineWidth = 3; c.beginPath(); c.moveTo(x - 34, SF - 6); c.lineTo(x - 34, top); c.moveTo(x + 34, SF - 6); c.lineTo(x + 34, top); c.stroke();
    c.fillStyle = L('#c8ced4'); c.fillRect(x - 38, top, 76, 6); c.fillRect(x - 38, SF - 36, 76, 5);
    c.fillStyle = L('#2a2a2a'); c.beginPath(); c.arc(x - 30, SF - 4, 5, 0, TAU); c.arc(x + 30, SF - 4, 5, 0, TAU); c.fill();
    for (let i = 0; i < Math.min(trolley.dirty, 4); i++) basket(c, x - 12 + (i % 2) * 26, SF - 36 - Math.floor(i / 2) * 10, 0.8, null, false);
    const st = trolley.stack; for (let i = 0; i < st.length; i++) { const col = i % 2, row = Math.floor(i / 2); basket(c, x - 17 + col * 34, top - row * 12, 0.95, { kind: st[i], n: 3 }, true); }
    if (st.length) { const n = 2 + Math.round(trolley.steam * 2); c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = 3; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const u = (K.t * 0.6 + i / n) % 1, sx = x - 20 + i * 14 + Math.sin(K.t * 2 + i) * 6, sy = top - Math.ceil(st.length / 2) * 12 - 10 - u * 50; c.globalAlpha = Math.sin(u * Math.PI) * (0.4 + trolley.steam * 0.3); c.beginPath(); c.moveTo(sx, sy + 12); c.quadraticCurveTo(sx + 8, sy + 6, sx, sy); c.stroke(); } c.globalAlpha = 1; c.lineCap = 'butt'; }
    void P;
  }
  function drawTable(c, tb, front) {
    const P = K.P, x = tb.x, y = tb.top;
    if (!front) { // banquet chairs behind the sitters
      for (const st of tb.seats) { const cx = st.x - st.f * 12; c.fillStyle = P.red2; K.poly(c, [cx - st.f * 30, 470, cx - st.f * 16, 470, cx - st.f * 10, 604, cx - st.f * 24, 604]); c.fill(); c.fillStyle = P.gold; c.fillRect(cx - st.f * 30 - 2, 466, 18, 6); c.fillStyle = P.red; c.fillRect(cx - 24, 598, 48, 10); c.fillStyle = P.gold2; c.fillRect(cx - 20, 608, 4, 92); c.fillRect(cx + 16, 608, 4, 92); }
      return;
    }
    c.fillStyle = P.clothSh; K.poly(c, [x - 98, y + 2, x + 98, y + 2, x + 104, y + 92, x - 104, y + 92]); c.fill(); c.fillStyle = P.cloth; K.poly(c, [x - 98, y + 2, x + 70, y + 2, x + 60, y + 92, x - 104, y + 92]); c.fill();
    c.strokeStyle = rgba(P.clothSh, 0.9); c.lineWidth = 2; for (let i = 0; i < 6; i++) { const xx = x - 86 + i * 34; c.beginPath(); c.moveTo(xx, y + 10); c.lineTo(xx - 4, y + 90); c.stroke(); }
    c.fillStyle = P.cloth; ellipse(c, x, y, 100, 14); c.fill(); c.fillStyle = 'rgba(160,200,220,0.25)'; ellipse(c, x, y - 1, 46, 6); c.fill(); // lazy susan
    // stamp card
    c.fillStyle = L('#fbf4dc'); c.fillRect(cardX(tb) - 9, y - 4, 18, 6); c.fillStyle = L('#c42a22'); for (let i = 0; i < Math.min(tb.stamps, 6); i++) c.fillRect(cardX(tb) - 7 + (i % 3) * 5, y - 3 + Math.floor(i / 3) * 2.5, 3, 2);
    if (tb.folder) { c.fillStyle = L('#3a1a14'); c.fillRect(cardX(tb) + 2, y - 7, 22, 4); c.fillStyle = L('#e8b440'); c.fillRect(cardX(tb) + 6, y - 7, 12, 1.4); }
    for (let i = 0; i < Math.min(tb.empties || 0, 4); i++) basket(c, tb.x + 30, y - 6 - i * 13, 1.1, null, false);
    for (const b of tb.baskets) if (!b.hide) basket(c, slotX(tb, b.slot), y - 2 - (b.slot === 1 ? 4 : 0), 1.2, b, false);
    if (!tb.pot.away) teapot(c, potX(tb), y - 3, 1.15, tb.pot);
    for (let i = 0; i < 2; i++) if (!(tb.lift && tb.lift[i]) && (tb.party || tb.cups[i] > 0)) cup(c, cupX(tb, i), y + 1, 1.25, tb.cups[i]);
    if (tb.stream) { c.strokeStyle = L('#c08030'); c.lineWidth = 2; c.beginPath(); c.moveTo(tb.stream.x0, tb.stream.y0); c.quadraticCurveTo(tb.stream.x1, tb.stream.y0, tb.stream.x1, tb.stream.y1); c.stroke(); }
    // chopsticks rests
    c.strokeStyle = L('#3a2214'); c.lineWidth = 1.4; for (const st of tb.seats) { const cx = st.x + st.f * 34; c.beginPath(); c.moveTo(cx - 8, y + 4); c.lineTo(cx + 10, y + 1); c.stroke(); }
  }
  function draw(c, t, Kk) {
    const P = K.P;
    drawRoom(c, t);
    // hanging lanterns + chandelier glow
    const lit = 0.4 + P.night * 0.9; lantern(c, 200, 150, 22, lit); lantern(c, 440, 120, 18, lit); lantern(c, 840, 120, 18, lit); lantern(c, 1270, 140, 22, lit);
    c.strokeStyle = P.gold2; c.lineWidth = 1.5; c.beginPath(); c.moveTo(640, 79); c.lineTo(640, 96); c.stroke(); c.fillStyle = P.gold; K.poly(c, [604, 96, 676, 96, 664, 104, 616, 104]); c.fill(); for (let i = 0; i < 5; i++) { c.fillStyle = P.lamp; c.beginPath(); c.arc(612 + i * 14, 108, 3, 0, TAU); c.fill(); } K.glow(c, 640, 110, 120, P.lamp, P.glowA * 0.8);
    // floor
    c.fillStyle = P.floor; c.fillRect(-60, 604, 1400, 130 + K.extraB); c.fillStyle = P.floor2; for (let i = 0; i < 22; i++) { const x = i * 70 - 60; c.fillStyle = rgba(P.gold, 0.18); c.beginPath(); c.arc(x + 35, 660, 8, 0, TAU); c.fill(); } c.fillStyle = rgba(P.gold, 0.35); c.fillRect(-60, 616, 1400, 2); c.fillRect(-60, 704, 1400, 2);
    // back layer: chairs, staff behind the tables, trolley
    for (const tb of TABLES) drawTable(c, tb, false);
    drawTrolley(c);
    for (const a of [may, lau]) { if (a.alpha <= 0.02) continue; c.fillStyle = 'rgba(0,0,0,0.15)'; ellipse(c, a.hx, SF + 2, 24, 4); c.fill(); K.drawBody(c, a, true); }
    if (may.pushing) { c.strokeStyle = L('#a8aeb4'); c.lineWidth = 3; c.beginPath(); c.moveTo(trolley.x - may.f * 34, SF - 92); c.lineTo(trolley.x - may.f * 46, SF - 110); c.stroke(); }
    // diners walking (behind tables) then tables then seated diners' arms
    const walkers = diners().filter((a) => a.state === 'stand'); for (const a of walkers) { c.fillStyle = 'rgba(0,0,0,0.18)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); K.drawBody(c, a, true); if (a.brolly && a.phase === 'enter' && a.alpha < 0.95) { c.fillStyle = L('#2a3a5a'); c.beginPath(); c.arc(a.hx, a.R.cy - 50, 40, Math.PI, TAU); c.fill(); } }
    const sitters = diners().filter((a) => a.state !== 'stand');
    for (const a of sitters) K.drawBody(c, a, false);
    for (const tb of TABLES) drawTable(c, tb, true);
    for (const a of sitters) { K.drawArms(c, a); c.globalAlpha = 1; }
    K.shafts(c, [[LWIN.x0, LWIN.x1, LWIN.x0 + 80, LWIN.x1 + 160, LWIN.y1, 700], [MOON.x - 60, MOON.x + 60, MOON.x - 160, MOON.x - 20, MOON.y + 40, 720]]);
    K.drawEffects(c);
    for (const a of K.actors) K.drawBubble(c, a);
  }
  function icon(c, name, x, y, r) {
    const ink = K.P.ink;
    if (name === 'stamp') { c.fillStyle = '#c42a22'; c.font = `900 ${r * 0.9}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('✓', x, y); return true; }
    if (name === 'tap') { c.fillStyle = ink; c.font = `800 ${r * 0.7}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('tap tap', x, y); return true; }
    if (name === 'tea' || name === 'steam') { c.strokeStyle = ink; c.lineWidth = r * 0.14; c.lineCap = 'round'; for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(x + i * r * 0.35, y + r * 0.45); c.quadraticCurveTo(x + i * r * 0.35 + r * 0.2, y, x + i * r * 0.35, y - r * 0.45); c.stroke(); } c.lineCap = 'butt'; return true; }
    if (name === 'wave') { c.fillStyle = ink; c.font = `${r * 1.2}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('✋', x, y); return true; }
    if (name === 'drum') { c.fillStyle = '#c42a22'; c.font = `900 ${r * 0.75}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DONG!', x, y); return true; }
    return false;
  }
  function onGone(Kk, a) { if (a.seat) a.seat.occ = null; }
  return GeoKit.stage({ id: 'dimsum', pal: DimPal, startHour: 7, span: 16, build, sim, draw, onClear, onGone, icon, font: '700 15px "Trebuchet MS", sans-serif', vign: 'rgba(30,6,4,0.35)',
    debug: () => ({ tables: TABLES.map((tb) => tb.id + ':' + (tb.party ? tb.party.members.map((m) => m.type + '/' + m.phase).join('+') : '-') + ' b' + tb.baskets.map((b) => b.kind[0] + b.n).join('') + ' pot' + tb.pot.level.toFixed(1) + (tb.pot.lid ? 'L' : '') + ' w' + (tb.want ?? 0) + (tb.call ? ' CALL' : '')).join(' | '), trolley: trolley.stack.length + '/' + trolley.dirty, lion: !!lion, tub }) });
}
registerStage('dimsum', makeGeoDimsumStage);
