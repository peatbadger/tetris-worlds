/* ================= NEW WORLD · Hotpot — GEOMETRIC edition =================
   A busy Taipei hot-pot house at dinner. A-Wei shaves paper-thin beef on the spinning slicer and builds the plates; Mei walks the
   floor with the long-spouted broth kettle — "Refill?" — topping up pots in a cloud of steam. On the counter the big split
   yuānyāng pot bubbles: red mala on one side, pale sauerkraut broth on the other. Wall: red lacquer, gold lattice, a red 福 diamond
   hung upside-down, a black menu board in gold (麻辣鍋 / 酸菜白肉鍋 / 牛肉片 …), the self-serve sauce bar and the free-ice-cream
   freezer every Taiwanese hot-pot place has. Window: a Taipei arcade street — vertical neon signs, a river of scooters, a tea
   stand, a tall tower glowing in the distance. Signatures: REFILL ROUND — Mei tops up every pot, steam blooms · ICE CREAM —
   the freezer opens and the whole room cheers. Clock 11:00 lunch -> 23:30 late. Blocks: fish balls · duck-blood tofu ·
   mala broth · beef slices · napa cabbage · shiitake · corn. */
(() => {
  WORLD_DEFS.push({
    id: 'hotpot', name: 'Hotpot', sub: '火鍋 · a Taipei hot-pot house, split pot bubbling', thumbY: 0.42,
    desc: 'A Taipei hot-pot house: beef shaved on the slicer, a split mala/sauerkraut pot bubbling, broth refills in clouds of steam, a sauce bar, free ice cream and a river of scooters outside — bright Mandopop guzheng.',
    accent: '#d8402a', accent2: '#f0c060', skin: 'hotpot', particle: 'ember',
    boardBg: 'rgba(22,12,12,0.93)', grid: 'rgba(255,200,170,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 104, root: 62, scale: [0, 2, 4, 7, 9], prog: [0, 3, 4, 2], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1200, gain: 0.018, detune: 6, voices: 3 },
      comp: { inst: 'guzheng', pattern: E16('x..x..x.x..x..x.'), voices: 3, gain: 0.04, oct: 0 },
      arp: { inst: 'guzheng', pattern: [0, 2, 4, 2, 3, 4, 2, 1], every: 1, oct: 1, gain: 0.04, density: 0.6 },
      bass: { pattern: E16('x...x.x.x...x.x.'), gain: 0.16, dec: 0.22, wave: 'triangle' },
      drums: { kick: E16('x.......x.......'), snareInst: 'clap', snare: E16('....x.......x...'), hat: E16('x.x.x.x.x.x.x.x.'), extra: E16('................'), extraInst: 'wood' },
      lead: { inst: 'erhu', gain: 0.04, density: 0.14, oct: 0 }, sfx: 'guzheng', clearFx: 'bubble',
      amb: { chatter: 0.02, clink: 0.014 },
    },
  });
  const HotPal = GeoCafePal({
    day: { wall: '#9a3428', wall2: '#86281e', gold: '#d8a840', goldDk: '#a87a24', lacq: '#3a1410', board: '#1e1414', wood: '#7a4a2a', woodDk: '#4a2a18', ink: '#2a2420',
      floor: '#bab4aa', floor2: '#a8a298', cnt: '#d8d2c8', cnt2: '#5a2018', steel: '#c0c4ca', sky0: '#a8c8e4', sky1: '#dce8f0', bld: '#c8c0b4', bld2: '#a89e92', arcade: '#d8d0c4', road: '#8a8a8e', winA: 0.1, neonA: 0.35,
      lamp: '#fff0d8', glow: '#ffd8a0', glowA: 0.1, shaft: '#fff0d8', shaftA: 0.08, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#922e24', wall2: '#7e241a', gold: '#d8a440', goldDk: '#a07422', lacq: '#34120e', board: '#1e1414', wood: '#724428', woodDk: '#442616', ink: '#2a2420',
      floor: '#b2aca2', floor2: '#a09a90', cnt: '#d0cac0', cnt2: '#541c16', steel: '#b8bcc2', sky0: '#d88a6a', sky1: '#f0c090', bld: '#8a7a78', bld2: '#6e6060', arcade: '#b8a898', road: '#6a6670', winA: 0.6, neonA: 0.7,
      lamp: '#ffe8c0', glow: '#ffd090', glowA: 0.24, shaft: '#ffc890', shaftA: 0.06, amb: '#ffc8a0', ambK: 0.05, sun: '#ff9c60', cloud: '#e8b8a8' },
    night: { wall: '#7a2620', wall2: '#681e18', gold: '#d0a040', goldDk: '#987020', lacq: '#2a0e0a', board: '#1a1212', wood: '#603a22', woodDk: '#3a2014', ink: '#2a2420',
      floor: '#a09a92', floor2: '#908a82', cnt: '#c4beb4', cnt2: '#481812', steel: '#a8acb2', sky0: '#121628', sky1: '#202640', bld: '#262838', bld2: '#30323e', arcade: '#3a3640', road: '#2a2a32', winA: 1, neonA: 1,
      lamp: '#ffe0b0', glow: '#ffc890', glowA: 0.36, shaft: '#ffc890', shaftA: 0, amb: '#3a3050', ambK: 0.05, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: {},
  }, [[5, 'night'], [7, 'day'], [16.8, 'day'], [18.2, 'dusk'], [19.5, 'night'], [29, 'night'], [31, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 5 && h < 14.5 ? 'Lunch' : h >= 14.5 && h < 17.5 ? 'Afternoon lull' : h >= 17.5 && h < 21.5 ? 'Dinner rush' : 'Late night'; });
  const MENU = [{ n: 'Mala pot set', c: '#b8301e', kind: 'set' }, { n: 'Sauerkraut pork pot', c: '#e8e4c8', kind: 'set' }, { n: 'Beef slices, extra', c: '#cc6a6c', kind: 'beef' },
    { n: 'Duck blood & tofu', c: '#5e161c', kind: 'plate' }, { n: 'Fish ball plate', c: '#f2eee4', kind: 'plate' }, { n: 'Ice cream (free!)', c: '#f4e6c8', kind: 'ice' }];
  let slicer = 0, potB = 0, refill = 0, freezer = 0, cheer = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'hotpot', pal: HotPal, stationX: 100, startHour: 11, span: 12.5, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(40,10,6,0.24)', zone: 'rgba(60,20,16,0.26)',
    per: (h) => { const x = h < 5 ? h + 24 : h; return x < 14.5 ? 0 : x < 17.5 ? 1 : x < 21.5 ? 2 : 3; },
    staff: [{ T: 222, hw: 56, headR: 28, pattern: 'apron', top: '#2a2a2e', top2: '#c8342a', top3: '#d8a840', hairStyle: 'pony', hair: 'dark', pants: '#2a2a2e' },
      { T: 238, hw: 60, headR: 28, pattern: 'apron', top: 'white', top2: '#c8342a', top3: '#2a2a2e', hairStyle: 'buzz', hair: 'dark', hat: 'chef', hatCol: 'white', pants: '#2a2a2e' }],
    menu: MENU, greet: ['Huānyíng guānglín!', 'How many?', 'Mala or sauerkraut?'], ack: ['Hǎo!', 'One mala!', 'Coming'], handOff: ['Careful, hot', 'Refill anytime!', 'Màn yòng'],
    thanks: ['Xièxie!', 'icon:heart', 'So good'], done: ['Too full…', 'icon:heart', 'Zàijiàn'], cheer: ['Hǎo chī!', 'icon:star', 'Spicy!!'],
    types: {
      students: { body: { T: 214, hw: 54, pattern: 'tee', top: 'teal', backpack: 1, packCol: 'mustard', hairStyle: 'short', pants: 'navy' }, words: ['All-you-can-eat?', 'Beef x3'] },
      office: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'blue', hairStyle: 'side', pants: 'grey' }, words: ['Team dinner', 'Mala, extra spicy'] },
      couple: { body: { T: 216, hw: 52, pattern: 'cardigan', top: 'coral', top2: 'cream', hairStyle: 'long', hair: 'dark', skirt: 'navy' }, words: ['Split pot!', 'Ice cream after'] },
      family: { body: { T: 230, hw: 62, pattern: 'tee', top: 'olive', hairStyle: 'short', hair: 'dark', glasses: 1, pants: 'brown' }, words: ['Table for five', 'Corn for the kids'] },
      ama: { body: { T: 204, hw: 54, pattern: 'cardigan', top: 'plum', top2: 'cream', hairStyle: 'perm', hair: 'hairGrey', pants: 'grey' }, words: ['Sauerkraut, of course', 'Less salt'] },
      scooter: { body: { pattern: 'jacket', top: 'mustard', shirt: 'grey', hat: 'cap', hatCol: 'teal', hairStyle: 'short', pants: 'navy' }, words: ['Takeaway?', 'Rain coat on the bike'] },
    },
    parties: [{ m: ['students', 'students'], w: [1, 2, 3, 3] }, { m: ['office', 'office'], w: [2, 0, 3, 1] }, { m: ['couple'], w: [1, 1, 3, 2] }, { m: ['family', 'ama'], w: [2, 1, 3, 0] }, { m: ['ama'], w: [3, 2, 1, 0] }, { m: ['scooter'], w: [2, 2, 1, 2] }],
    sim(X, dt) { slicer = Math.max(0, slicer - dt * 1.2); potB += dt; refill = Math.max(0, refill - dt * 0.3); freezer = Math.max(0, freezer - dt * 0.4); cheer = Math.max(0, cheer - dt * 0.4); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'set' || m.kind === 'beef') ph.push(K.ph(1.6, (s, u, t) => { slicer = 1; s.f = 1; s.tgN = [152 + Math.sin(t * 8) * 10, CNT.top - 30]; s.tgF = [164, CNT.top - 22]; s.leanT = 0.14; it.o.frac = u * 0.5; s.look = { x: () => 152, until: K.simT + 0.3 }; }));
      if (m.kind === 'set') ph.push(K.ph(1.2, (s, u, t) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [62 + Math.sin(t * 3) * 10, CNT.top - 34]; s.leanT = 0.12; it.o.frac = 0.5 + u * 0.35; s.look = { x: () => 62, until: K.simT + 0.3 }; if (Math.random() < 0.05) K.fx('puff', 62, CNT.top - 40, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'plate') ph.push(K.ph(1.2, (s, u) => { s.hold.N = H.tool('tongs'); s.f = 1; s.tgN = [116 + u * 10, CNT.top - 26]; s.leanT = 0.12; it.o.frac = u * 0.85; s.look = { x: () => 116, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'ice') ph.push(K.ph(1.3, (s, u) => { freezer = 1; s.hold.N = H.tool('scoop'); s.f = 1; s.tgN = [214, CNT.top - 30 + Math.sin(u * Math.PI) * 10]; s.leanT = 0.16; it.o.frac = u * 0.85; s.look = { x: () => 214, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 22]; s.tgF = [ST.x + 42, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.5) return K.start(a, 'slice', [K.ph(rand(2, 3), (s, u, t) => { slicer = 1; s.f = 1; s.tgN = [152 + Math.sin(t * 8) * 10, CNT.top - 30]; s.tgF = [164, CNT.top - 22]; s.look = { x: () => 152, until: K.simT + 0.3 }; })]);
      return K.start(a, 'skim', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [62 + Math.cos(t * 2) * 12, CNT.top - 32]; s.look = { x: () => 62, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'kettle', [K.ph(rand(2, 2.8), (s, u, t) => { s.hold.N = H.tool('kettle'); s.tgN = [214 + Math.sin(t * 2) * 6, CNT.top - 34]; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Refill?', 'More broth?', 'Huānyíng!']), 1.1) })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'ladle') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 12 * s, y - 10 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x + 13 * s, y - 9 * s, 3.4 * s, 0, Math.PI); c.fill(); }
      else if (k === 'tongs') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3 * s, y - 15 * s); c.moveTo(x + 2 * s, y); c.lineTo(x + 6 * s, y - 14 * s); c.stroke(); }
      else if (k === 'scoop') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 * s, y - 10 * s); c.stroke(); c.fillStyle = L('#f4e6c8'); c.beginPath(); c.arc(x + 7 * s, y - 12 * s, 3 * s, 0, TAU); c.fill(); }
      else if (k === 'kettle') { c.fillStyle = L('#c0c4ca'); roundRect(c, x - 6 * s, y - 12 * s, 12 * s, 12 * s, 3 * s); c.fill(); c.strokeStyle = L('#c0c4ca'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x + 5 * s, y - 8 * s); c.quadraticCurveTo(x + 14 * s, y - 10 * s, x + 20 * s, y - 18 * s); c.stroke(); c.strokeStyle = L('#2a2a2e'); c.beginPath(); c.arc(x, y - 13 * s, 4 * s, Math.PI, TAU); c.stroke(); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'set') { c.fillStyle = L('#3a3a40'); c.fillRect(-11, -7, 22, 7); c.fillStyle = L('#2a2a2e'); c.fillRect(-13, -8, 3, 2); c.fillRect(10, -8, 3, 2); if (frac > 0.3) { c.fillStyle = L(m.c); ellipse(c, 0, -7, 10, 2.4); c.fill(); } if (frac > 0.6) { c.fillStyle = L('#cc6a6c'); c.beginPath(); c.arc(-4, -8, 2, 0, TAU); c.fill(); c.fillStyle = L('#f2eee4'); c.beginPath(); c.arc(2, -8, 1.6, 0, TAU); c.fill(); c.fillStyle = L('#6aa040'); c.fillRect(4, -9, 4, 1.4); } if (frac > 0.8) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(0, -14, 2.4, 0, TAU); c.fill(); } }
      else if (m.kind === 'beef') { c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -1, 11, 2.6); c.fill(); for (let i = 0; i < 4; i++) if (frac > i * 0.2) { c.fillStyle = L('#cc6a6c'); ellipse(c, -6 + i * 4, -3, 2.6, 2); c.fill(); c.strokeStyle = L('#f4e4dc'); c.lineWidth = 0.5; c.beginPath(); c.arc(-6 + i * 4, -3, 1.2, 0, 4); c.stroke(); } }
      else if (m.kind === 'ice') { c.fillStyle = L('#f4f0e6'); K0(c, [-4, -6, 4, -6, 3, 0, -3, 0]); c.fill(); if (frac > 0.3) { c.fillStyle = L('#f4e6c8'); c.beginPath(); c.arc(0, -7, 3.6, Math.PI, TAU); c.fill(); } if (frac > 0.7) { c.fillStyle = L('#a87a5a'); c.beginPath(); c.arc(0, -10, 2.6, Math.PI, TAU); c.fill(); } }
      else { c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -1, 10, 2.6); c.fill(); if (frac > 0.3) { c.fillStyle = L(m.c); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(-4 + i * 4, -3.6, 2.4, 0, TAU); c.fill(); } } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.hotpot = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620); c.fillStyle = P.lacq; c.fillRect(-60, 0, 1400, 46); c.fillStyle = P.gold; c.fillRect(-60, 46, 1400, 4); c.fillStyle = P.goldDk; c.fillRect(-60, 300, 1400, 4);
      // gold lattice panels along the top
      c.strokeStyle = rgba(P.gold, 0.55); c.lineWidth = 1.5; for (let i = 0; i < 14; i++) { const lx = -40 + i * 100; c.strokeRect(lx, 62, 80, 40); c.beginPath(); c.moveTo(lx + 10, 72); c.lineTo(lx + 30, 72); c.lineTo(lx + 30, 92); c.lineTo(lx + 50, 92); c.lineTo(lx + 50, 72); c.lineTo(lx + 70, 72); c.stroke(); }
      // red lanterns
      for (const lx of [300, 1010, 1270]) { c.strokeStyle = P.gold; c.lineWidth = 1.5; c.beginPath(); c.moveTo(lx, 50); c.lineTo(lx, 108); c.stroke(); c.fillStyle = P.gold; c.fillRect(lx - 10, 108, 20, 4); c.fillRect(lx - 10, 148, 20, 4); c.fillStyle = L('#d83020'); ellipse(c, lx, 130, 22, 20); c.fill(); c.strokeStyle = rgba('#8a1a10', 0.6); c.lineWidth = 1; for (let k = -2; k <= 2; k++) { c.beginPath(); c.ellipse(lx, 130, Math.abs(k) * 5 + 2, 20, 0, 0, TAU); c.stroke(); } c.strokeStyle = P.gold; c.beginPath(); c.moveTo(lx, 152); c.lineTo(lx, 168); c.stroke(); K.glow(c, lx, 130, 80, '#ff8a50', 0.14 + 0.24 * P.neonA); }
      // left strip: black menu board in gold, the upside-down 福
      { const x0 = 24, y0 = 116; c.fillStyle = P.board; roundRect(c, x0, y0, 236, 170, 6); c.fill(); c.strokeStyle = P.gold; c.lineWidth = 2; roundRect(c, x0 + 5, y0 + 5, 226, 160, 4); c.stroke();
        c.fillStyle = P.gold; c.font = `400 16px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('火 鍋 菜 單', x0 + 118, y0 + 22);
        const items = [['麻辣鍋', '380'], ['酸菜白肉鍋', '360'], ['牛肉片', '220'], ['鴨血豆腐', '120'], ['魚丸', '90'], ['冰淇淋', '免費']];
        items.forEach(([n, p], i) => { const yy = y0 + 46 + i * 20; c.fillStyle = L('#f4e8d0'); c.font = `400 13px ${JP_FONT}`; c.textAlign = 'left'; c.fillText(n, x0 + 18, yy); c.fillStyle = P.gold; c.textAlign = 'right'; c.font = /\d/.test(p) ? '800 12px "Trebuchet MS", sans-serif' : `400 12px ${JP_FONT}`; c.fillText(p, x0 + 218, yy); c.strokeStyle = rgba(P.gold, 0.25); c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(x0 + 18 + n.length * 13 + 6, yy + 2); c.lineTo(x0 + 218 - p.length * 8 - 6, yy + 2); c.stroke(); c.setLineDash([]); }); }
      { const fx = 228, fy = 92; c.save(); c.translate(fx, fy); c.rotate(Math.PI / 4); c.fillStyle = L('#d83020'); c.fillRect(-16, -16, 32, 32); c.restore(); c.save(); c.translate(fx, fy); c.rotate(Math.PI); c.fillStyle = P.gold; c.font = `400 22px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('福', 0, 1); c.restore(); }
      // the dining room behind the board: booths with their own little pots steaming
      for (let g = 0; g < 4; g++) { const bx = 310 + g * 180, by = 420; c.fillStyle = P.woodDk; c.fillRect(bx, by, 150, 14); c.fillStyle = rgba(P.lacq, 0.8); c.fillRect(bx - 10, by - 90, 20, 180); c.fillRect(bx + 140, by - 90, 20, 180); for (let k = 0; k < 2; k++) { const px = bx + 45 + k * 60; c.fillStyle = L('#3a3a40'); c.fillRect(px - 16, by - 12, 32, 12); c.fillStyle = L(k ? '#e8e4c8' : '#b8301e'); ellipse(c, px, by - 12, 15, 3.4); c.fill(); for (let q = 0; q < 2; q++) { const ph = (t * 0.4 + q * 0.5 + g * 0.2 + k * 0.3) % 1; c.fillStyle = rgba('#ffffff', 0.32 * (1 - ph)); c.beginPath(); c.arc(px + Math.sin(t + q + g) * 5, by - 20 - ph * 50, 5 + ph * 10, 0, TAU); c.fill(); } } }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.lacq; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = P.lacq; c.fillRect(x0 + (x1 - x0) / 2 - 3, y0, 6, y1 - y0); c.fillStyle = P.gold; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, 3); c.fillRect(x0 - 12, y1 + 9, x1 - x0 + 24, 3);
      c.fillStyle = 'rgba(255,255,255,0.1)'; K0(c, [x0 + 20, y0, x0 + 60, y0, x0 + 10, y1, x0 - 30, y1]); c.fill();
      c.fillStyle = L('#d83020'); roundRect(c, x0 + 10, y1 - 60, 72, 44, 5); c.fill(); c.fillStyle = L('#fbf0d8'); c.font = `400 12px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('吃到飽', x0 + 46, y1 - 46); c.font = '800 10px "Trebuchet MS", sans-serif'; c.fillText('ALL YOU CAN EAT', x0 + 46, y1 - 28);
      c.fillStyle = P.lacq; roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 5); c.fill(); c.fillStyle = P.gold; c.font = `400 17px ${JP_FONT}`; c.fillText('火鍋 · 台北', (x0 + x1) / 2, y0 - 34); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      c.fillStyle = P.sky0; c.fillRect(x0, y0, w, 120);
      // the tall tower in the distance
      { const tx = x0 + w * 0.72; c.fillStyle = rgba(P.bld2, 0.8); for (let k = 0; k < 6; k++) { K0(c, [tx - 14 + k, y0 + 120 - k * 16, tx + 14 - k, y0 + 120 - k * 16, tx + 10 - k, y0 + 104 - k * 16, tx - 10 + k, y0 + 104 - k * 16]); c.fill(); } c.fillRect(tx - 1.5, y0 + 10, 3, 16); if (n > 0.3) { c.fillStyle = rgba('#a8e0ff', 0.5 * n); for (let k = 0; k < 6; k++) c.fillRect(tx - 9 + k * 0.6, y0 + 112 - k * 16, 18 - k * 1.2, 2); } }
      // shophouses with arcades and vertical neon signs
      c.fillStyle = P.bld; c.fillRect(x0, y0 + 80, w, 170); for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) { c.fillStyle = rgba('#ffd890', 0.2 + 0.6 * P.winA * (((r + k) % 3) ? 1 : 0.3)); c.fillRect(x0 + 12 + k * 40, y0 + 96 + r * 34, 22, 20); c.fillStyle = rgba('#000000', 0.25); c.fillRect(x0 + 10 + k * 40, y0 + 118 + r * 34, 26, 3); }
      for (const [sx, col, tx] of [[0.12, '#ff4a6a', '藥局'], [0.4, '#ffd040', '小吃'], [0.66, '#4ae0c0', '麻辣'], [0.9, '#ff8a40', '茶']]) { const vx = x0 + w * sx; c.fillStyle = rgba('#141018', 0.9); c.fillRect(vx - 10, y0 + 90, 20, 18 + tx.length * 18); c.fillStyle = col; c.font = `400 14px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; [...tx].forEach((ch, k) => c.fillText(ch, vx, y0 + 108 + k * 18)); K.glow(c, vx, y0 + 110, 30, col, 0.3 * P.neonA); }
      c.fillStyle = P.arcade; c.fillRect(x0, y0 + 190, w, 14); for (let k = 0; k < 5; k++) c.fillRect(x0 + 6 + k * 52, y0 + 204, 10, 46); c.fillStyle = rgba('#ffe8b0', 0.18 + 0.4 * P.winA); c.fillRect(x0, y0 + 204, w, 46);
      c.fillStyle = P.road; c.fillRect(x0, y0 + 250, w, hh - 250); c.fillStyle = rgba('#ffffff', 0.5); for (let k = 0; k < 8; k++) c.fillRect(x0 + k * 34 + 4, y0 + 296, 18, 2);
      // the river of scooters
      for (let k = 0; k < 7; k++) { const sp = 40 + (k % 3) * 12, dir = k % 2 ? 1 : -1, sx = dir > 0 ? x0 - 30 + ((t * sp + k * 97) % (w + 60)) : x1 + 30 - ((t * sp + k * 97) % (w + 60)), sy = y0 + (dir > 0 ? 286 : 318) + (k % 3) * 4;
        c.fillStyle = L('#2a2a30'); c.beginPath(); c.arc(sx - 8, sy, 4, 0, TAU); c.arc(sx + 8, sy, 4, 0, TAU); c.fill(); c.fillStyle = L(['#e8e4dc', '#d83a2e', '#3a7ad8', '#e8b03a'][k % 4]); roundRect(c, sx - 10, sy - 9, 20, 7, 3); c.fill();
        c.fillStyle = L(['#2e4a6a', '#7a8448', '#84486e'][k % 3]); c.fillRect(sx - 3, sy - 22, 8, 13); c.fillStyle = L(['#f4f0e6', '#e8b03a', '#3a9a90', '#d83a2e'][(k + 1) % 4]); c.beginPath(); c.arc(sx + 1, sy - 26, 5, 0, TAU); c.fill();
        if (n > 0.3) { c.fillStyle = rgba('#fff4c8', 0.8); c.beginPath(); c.arc(sx + dir * 11, sy - 6, 2, 0, TAU); c.fill(); c.fillStyle = rgba('#fff4c8', 0.12 * n); K0(c, [sx + dir * 11, sy - 6, sx + dir * 50, sy - 14, sx + dir * 50, sy + 4]); c.fill(); } }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; c.fillStyle = P.floor; c.fillRect(-60, 642, 1400, 120); for (let i = 0; i < 160; i++) { c.fillStyle = rgba(i % 3 ? P.floor2 : '#ffffff', 0.5); c.fillRect(-60 + (i * 97) % 1400, 646 + (i * 37) % 100, 3, 2); } c.fillStyle = rgba('#000000', 0.08); for (let i = 0; i < 12; i++) c.fillRect(-60 + i * 120, 642, 2, 120); },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // back shelf: plates of ingredients in a chilled case
      { const sy = top - 104; c.fillStyle = 'rgba(220,235,245,0.4)'; c.fillRect(0, sy - 4, 128, 36); c.fillStyle = P.steel; c.fillRect(-4, sy + 30, 136, 5); [['#cc6a6c', 'r'], ['#d4e0b0', 'l'], ['#f2eee4', 'b'], ['#eec448', 'c'], ['#86542e', 'b'], ['#5e161c', 's']].forEach(([col, k], i) => { const px = 12 + i * 20; c.fillStyle = L('#f4f0e6'); ellipse(c, px, sy + 26, 9, 2.4); c.fill(); c.fillStyle = L(col); if (k === 's') c.fillRect(px - 5, sy + 17, 10, 8); else if (k === 'c') c.fillRect(px - 6, sy + 20, 12, 5); else { c.beginPath(); c.arc(px, sy + 23, 5, Math.PI, TAU); c.fill(); } }); }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // the split yuanyang pot on its burner: red mala | pale sauerkraut, bubbling
      { const px = 62, py = top - 6, R = 30; c.fillStyle = L('#2a2a30'); c.fillRect(px - 26, py - 8, 52, 8); c.fillStyle = L('#c0c4ca'); c.beginPath(); c.moveTo(px - R, py - 26); c.lineTo(px + R, py - 26); c.lineTo(px + R - 4, py - 8); c.lineTo(px - R + 4, py - 8); c.closePath(); c.fill();
        c.fillStyle = L('#b8301e'); c.beginPath(); c.ellipse(px, py - 26, R, 7, 0, Math.PI / 2, Math.PI * 1.5); c.fill(); c.fillStyle = L('#ece6cc'); c.beginPath(); c.ellipse(px, py - 26, R, 7, 0, -Math.PI / 2, Math.PI / 2); c.fill();
        c.strokeStyle = L('#c0c4ca'); c.lineWidth = 2.5; c.beginPath(); c.moveTo(px - 6, py - 33); c.quadraticCurveTo(px + 6, py - 26, px - 4, py - 19); c.stroke();
        for (let k = 0; k < 6; k++) { const ph = (potB * (1.4 + k * 0.2) + k * 0.37) % 1, bx = px + (k < 3 ? -18 + k * 6 : 6 + (k - 3) * 6); c.fillStyle = k < 3 ? rgba('#ff8a50', 0.7 * (1 - ph)) : rgba('#ffffff', 0.7 * (1 - ph)); c.beginPath(); c.arc(bx, py - 26 + Math.sin(k) * 2, 1 + ph * 2.4, 0, TAU); c.fill(); }
        c.fillStyle = L('#e83a20'); for (let k = 0; k < 3; k++) { ellipse(c, px - 20 + k * 6, py - 25 + (k % 2) * 2, 2.6, 1, k); c.fill(); }
        const st = 0.35 + refill * 0.6; for (let k = 0; k < 3; k++) { const ph = (t * 0.45 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', st * 0.42 * (1 - ph)); c.beginPath(); c.arc(px - 14 + k * 14 + Math.sin(t + k) * 4, py - 36 - ph * (30 + refill * 30), 5 + ph * 11, 0, TAU); c.fill(); } }
      // meat slicer (blade spins while slicing)
      { const sx = 152, sy = top - 6; c.fillStyle = L('#c8ccd2'); c.fillRect(sx - 20, sy - 12, 40, 12); c.fillStyle = L('#a8acb2'); c.beginPath(); c.arc(sx - 4, sy - 22, 14, 0, TAU); c.fill(); c.strokeStyle = L('#e8ecf0'); c.lineWidth = 1.5; const ba = t * (slicer > 0 ? 24 : 0.2); for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(sx - 4, sy - 22); c.lineTo(sx - 4 + Math.cos(ba + k * 2.1) * 12, sy - 22 + Math.sin(ba + k * 2.1) * 12); c.stroke(); } c.fillStyle = L('#cc6a6c'); c.fillRect(sx + 6, sy - 26, 12, 12); c.fillStyle = L('#f4e4dc'); c.fillRect(sx + 6, sy - 22, 12, 1.5); c.fillRect(sx + 6, sy - 17, 12, 1);
        if (slicer > 0) { c.fillStyle = L('#f4f0e6'); ellipse(c, sx - 4, sy + 2, 10, 2); c.fill(); } }
      // the free ice-cream freezer + the sauce bar's bowls
      { const fx = 214, fy = top - 6; c.fillStyle = L('#e8ecf0'); c.fillRect(fx - 22, fy - 26, 44, 26); c.fillStyle = freezer > 0 ? 'rgba(220,240,255,0.9)' : 'rgba(200,220,235,0.6)'; c.fillRect(fx - 19, fy - 24, 38, 10); for (let k = 0; k < 4; k++) { c.fillStyle = L(['#f4e6c8', '#a87a5a', '#e8a8b8', '#a8c870'][k]); c.fillRect(fx - 17 + k * 9, fy - 22, 7, 6); } c.fillStyle = L('#d83020'); c.font = `400 9px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('冰淇淋', fx, fy - 7); if (freezer > 0) K.glow(c, fx, fy - 20, 36, '#e0f4ff', 0.4 * freezer); }
      { const bx = 112, by = top - 6; [['#5a3a1a'], ['#e8e0c8'], ['#6aa040'], ['#c8301e']].forEach(([col], i) => { c.fillStyle = L('#f4f0e6'); c.beginPath(); c.moveTo(bx - 5 + i * 1, by - 5); c.quadraticCurveTo(bx + i * 1, by, bx + 5 + i * 1, by - 5); c.closePath(); c.fill(); }); }
      // counter front: red lacquer with gold trim and a 歡迎光臨 plaque
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.gold; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, 3); c.fillRect(x0 - 6, top + 50, x1 - x0 + 12, 2);
      c.fillStyle = P.gold; c.font = `400 17px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('歡 迎 光 臨', (x0 + x1) / 2, top + 27);
      for (let i = 0; i < 4; i++) { c.strokeStyle = rgba(P.gold, 0.35); c.lineWidth = 1; c.strokeRect(x0 + 12 + i * 58, top + 64, 46, 64); }
      if (cheer > 0) for (let k = 0; k < 8; k++) { c.fillStyle = rgba(['#ffd040', '#ff6a6a', '#6ad0ff'][k % 3], cheer); c.save(); c.translate(40 + k * 26, top - 80 - (1 - cheer) * 30 + Math.sin(k * 3) * 10); c.rotate(k + cheer * 4); c.fillRect(-3, -1.5, 6, 3); c.restore(); }
    },
    events: [
      { name: 'refill', dur: 9, start(X, srv, mk) { const K = X.K; refill = 1; K.say(srv, 'Refill round!', 1.3); K.fx('puff', 62, X.CNT.top - 44, { life: 1.4, col: '#ffffff' }); K.after(1.2, () => { K.say(mk, 'More beef coming!', 1.3); for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.7) K.say(c, pick(['Xièxie!', 'More mala!', 'icon:steam']), 1.2); }); } },
      { name: 'ice-cream', dur: 9, start(X, srv, mk) { const K = X.K; freezer = 1; cheer = 1; K.say(srv, 'Free ice cream!', 1.4); K.after(0.6, () => { for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 214, until: K.simT + 3 }; K.say(c, pick(['Yay!!', 'icon:heart', 'Two scoops!', 'icon:star']), 1.4); } }); } },
    ],
  };
  registerStage('hotpot', makeGeoCafe(W));
})();
