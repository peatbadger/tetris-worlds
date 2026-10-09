/* ================= NEW WORLD · Korean BBQ — GEOMETRIC edition (a Seoul galbi house; no real brands) =================
   A Mapo-style barbecue joint on a Seoul side street. Imo (the auntie who owns the place) snips meat with her scissors,
   ladles doenjang stew from the bubbling pot and pulls green bottles from the soju fridge; Min-jun hauls buckets of glowing
   charcoal and drops them into the tables' grills. Wall: wood panels, a hand-lettered Hangul menu (삼겹살 / 갈비 / 목살 /
   된장찌개 / 냉면 / 소주 / 맥주), silver extractor ducts dropping over every table in the dining room, smoke curling up.
   Counter: charcoal brazier, banchan station of little dishes, meat board and scissors, stew burner, register. Window: a Seoul
   alley — stacked neon signs (노래방 / 치킨 / 호프 / 편의점), a red neon cross on the hill, a tower on the skyline,
   delivery scooters. Signatures: GEONBAE (somaek tower: the shot drops into the beer, the whole room toasts) · FRESH
   CHARCOAL (the bucket glows, sparks fly) · IMO'S SCISSORS (she comes round snipping and lectures you to eat it with
   lettuce). Clock 16:00 -> 02:00, all weather. Blocks: galbi · gyeran-jjim · kimchi · samgyeopsal · lettuce · japchae ·
   kongnamul. */
(() => {
  WORLD_DEFS.push({
    id: 'kbbq', name: 'Korean BBQ', sub: '고깃집 · a Seoul galbi house, charcoal glowing', thumbY: 0.42,
    desc: 'A Seoul barbecue house: charcoal hauled in glowing buckets, pork belly and galbi snipped with scissors, banchan in little dishes, green soju bottles, somaek toasts and a neon alley outside. Bright city-pop synth.',
    accent: '#e05a2a', accent2: '#5ac87a', skin: 'kbbq', particle: 'ember',
    boardBg: 'rgba(16,14,16,0.94)', grid: 'rgba(255,220,190,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 112, root: 57, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 5, 3, 4], barsPerChord: 1,
      pad: { wave: 'sawtooth', cutoff: 1100, gain: 0.016, detune: 8, voices: 3 },
      comp: { inst: 'rhodes', pattern: E16('..x...x...x...x.'), voices: 3, gain: 0.05, oct: 0 },
      arp: { inst: 'bell', pattern: [0, 2, 4, 6, 4, 2, 3, 1], every: 1, oct: 1, gain: 0.03, density: 0.55 },
      bass: { pattern: E16('x..x..x.x..x..x.'), gain: 0.17, dec: 0.2, wave: 'square' },
      drums: { kick: E16('x...x...x...x...'), snareInst: 'clap', snare: E16('....x.......x...'), hat: E16('..x...x...x...x.'), extra: E16('...............x'), extraInst: 'wood' },
      lead: { inst: 'synth', gain: 0.035, density: 0.16, oct: 0 }, sfx: 'bell', clearFx: 'sizzle',
      amb: { chatter: 0.024, clink: 0.018 },
    },
  });
  const KbPal = GeoCafePal({
    day: { wall: '#b08a62', wall2: '#9a7650', panel: '#7a5434', panelDk: '#5a3a22', duct: '#c4c8cc', ductDk: '#8a9096', menu: '#f4ecd8', menuInk: '#2a1e18', red: '#c83a24', wood: '#6a4426', woodDk: '#3e2614', ink: '#241c18',
      floor: '#8a8478', floor2: '#7a7468', cnt: '#d0c8b8', cnt2: '#4a3020', steel: '#c4c8ce', sky0: '#9cc4e4', sky1: '#d8e8f0', bld: '#c8bca8', bld2: '#a89a88', road: '#7a7a80', hill: '#7a8a6a', winA: 0.1, neonA: 0.3,
      lamp: '#fff0d0', glow: '#ffd8a0', glowA: 0.12, shaft: '#fff0d8', shaftA: 0.08, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#a8805a', wall2: '#926e48', panel: '#724e30', panelDk: '#52341e', duct: '#bcc0c4', ductDk: '#82888e', menu: '#ece2cc', menuInk: '#2a1e18', red: '#c03822', wood: '#644024', woodDk: '#3a2412', ink: '#241c18',
      floor: '#827c70', floor2: '#726c60', cnt: '#c8c0b0', cnt2: '#462c1c', steel: '#bcc0c6', sky0: '#d88464', sky1: '#f2c08e', bld: '#8a7a74', bld2: '#6a5c5a', road: '#5e5a62', hill: '#5a5a4e', winA: 0.6, neonA: 0.75,
      lamp: '#ffe4b8', glow: '#ffcc88', glowA: 0.26, shaft: '#ffc890', shaftA: 0.06, amb: '#ffc8a0', ambK: 0.05, sun: '#ff9c60', cloud: '#e8b8a8' },
    night: { wall: '#94704e', wall2: '#7e5e40', panel: '#62422a', panelDk: '#442c18', duct: '#a8acb2', ductDk: '#70767c', menu: '#e4d8c0', menuInk: '#2a1e18', red: '#b83420', wood: '#5a3a20', woodDk: '#342010', ink: '#241c18',
      floor: '#76706a', floor2: '#68625c', cnt: '#bcb4a6', cnt2: '#3e2818', steel: '#a8acb2', sky0: '#101428', sky1: '#1e2440', bld: '#22243a', bld2: '#2c2e42', road: '#26262e', hill: '#14182a', winA: 1, neonA: 1,
      lamp: '#ffdcae', glow: '#ffc488', glowA: 0.4, shaft: '#ffc890', shaftA: 0, amb: '#3a3050', ambK: 0.05, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: { sky0: '#b8c4d0', sky1: '#dce4ec', road: '#d8dce2', hill: '#c8ccd4' },
  }, [[5, 'night'], [7, 'day'], [17.4, 'day'], [18.8, 'dusk'], [20, 'night'], [29, 'night'], [31, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 5 && h < 18 ? 'Afternoon' : h >= 18 && h < 20.5 ? 'After work' : h >= 20.5 || h < 0.5 ? 'Hoesik hour' : '2nd round'; });
  const MENU = [{ n: 'Samgyeopsal', c: '#e8b0a0', kind: 'meat' }, { n: 'Galbi', c: '#7a3818', kind: 'meat' }, { n: 'Doenjang-jjigae', c: '#a86a2a', kind: 'stew' },
    { n: 'Soju', c: '#5ab070', kind: 'soju' }, { n: 'Mul-naengmyeon', c: '#c8c0b0', kind: 'noodle' }, { n: 'Somaek set', c: '#f0c040', kind: 'soju' }];
  let coal = 0, scis = 0, stewB = 0, fridge = 0, toast = 0, sparks = 0, smoke = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'kbbq', pal: KbPal, stationX: 40, srvX: 214, spots: [140, 330], maxCust: 2, crowd: 0.7, tagDx: 180, // Imo at the brazier (66), Min-jun at the register (214), one guest between
    startHour: 16, span: 10, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(30,16,8,0.26)', zone: 'rgba(40,26,18,0.26)',
    per: (h) => { const x = h < 5 ? h + 24 : h; return x < 18 ? 0 : x < 20.5 ? 1 : x < 24.5 ? 2 : 3; },
    staff: [{ T: 218, hw: 56, headR: 27, pattern: 'apron', top: '#2a2a2e', top2: '#c83a24', top3: '#f4ecd8', hairStyle: 'short', hair: 'dark', pants: '#2a2a2e', hat: 'cap', hatCol: '#2a2a2e' },
      { T: 210, hw: 60, headR: 28, pattern: 'apron', top: '#d8687a', top2: '#2a2a2e', top3: '#f4ecd8', hairStyle: 'perm', hair: 'dark', pants: '#3a3440' }],
    menu: MENU, greet: ['Eoseo oseyo!', 'How many?', 'Samgyeopsal?'], ack: ['Ne~!', 'Galbi, coming!', 'Algesseumnida'], handOff: ['Eat it with lettuce!', 'Masitge deuseyo', 'Careful, hot!'],
    thanks: ['Gamsahamnida!', 'icon:heart', 'Jal meokgesseumnida'], done: ['Baebulleo…', 'icon:heart', 'Annyeong!'], cheer: ['Geonbae!', 'icon:star', 'Daebak!'],
    types: {
      boss: { body: { T: 226, hw: 64, pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', hairStyle: 'side', hair: 'hairGrey', glasses: 1, pants: 'grey' }, words: ['One shot!', 'Hoesik on me!', 'In my day…'] },
      junior: { body: { T: 214, hw: 54, pattern: 'suit', top: 'navy', shirt: 'white', tie: 'blue', hairStyle: 'side', pants: 'navy' }, words: ['Ne, boss!', 'Another bottle?', 'Turning my glass away…'] },
      student: { body: { T: 210, hw: 52, pattern: 'hoodie', top: 'mustard', hairStyle: 'short', hair: 'dark', pants: 'navy', backpack: 1, packCol: 'teal' }, words: ['After exams!', 'Unlimited pork?'] },
      couple: { body: { T: 212, hw: 52, pattern: 'cardigan', top: 'cream', top2: 'coral', hairStyle: 'long', hair: 'dark', skirt: 'navy' }, words: ['Wrap one for me', 'Ssam time'] },
      hiker: { body: { T: 220, hw: 62, pattern: 'jacket', top: 'coral', shirt: 'teal', hat: 'visor', hatCol: 'mustard', hairStyle: 'short', hair: 'hairGrey', pants: 'grey' }, words: ['Bukhansan this morning!', 'Makgeolli?'] },
      tourist: { body: { pattern: 'tee', top: 'teal', hat: 'bucket', hatCol: 'cream', hairStyle: 'short', camera: 1, pants: 'brown' }, words: ['Is this the K-drama place?', 'How do I wrap it?'] },
    },
    parties: [{ m: ['boss', 'junior'], w: [0, 3, 4, 2] }, { m: ['student', 'student'], w: [1, 2, 3, 3] }, { m: ['couple'], w: [2, 2, 2, 1] }, { m: ['hiker'], w: [3, 2, 1, 0] }, { m: ['tourist'], w: [2, 2, 2, 1] }, { m: ['junior'], w: [1, 2, 1, 2] }],
    sim(X, dt) { coal = Math.max(0, coal - dt * 0.25); scis = Math.max(0, scis - dt * 1.4); stewB += dt; fridge = Math.max(0, fridge - dt * 0.6); toast = Math.max(0, toast - dt * 0.35); sparks = Math.max(0, sparks - dt * 0.5); smoke += dt; },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'meat') { ph.push(K.ph(0.9, (s, u) => { s.f = 1; s.tgN = [92, CNT.top - 28]; s.tgF = [104, CNT.top - 20]; s.leanT = 0.14; it.o.frac = u * 0.3; s.look = { x: () => 98, until: K.simT + 0.3 }; }));
        ph.push(K.ph(1.3, (s, u, t) => { scis = 1; s.hold.N = H.tool('scissors'); s.f = 1; s.tgN = [100 + Math.sin(t * 6) * 6, CNT.top - 26 + Math.abs(Math.sin(t * 12)) * 3]; s.leanT = 0.16; it.o.frac = 0.3 + u * 0.55; s.look = { x: () => 100, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })); }
      else if (m.kind === 'stew') ph.push(K.ph(1.5, (s, u, t) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [28 + Math.sin(t * 3) * 6, CNT.top - 34]; s.leanT = 0.12; it.o.frac = u * 0.85; s.look = { x: () => 28, until: K.simT + 0.3 }; if (Math.random() < 0.05) K.fx('puff', 28, CNT.top - 44, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'soju') ph.push(K.ph(1.2, (s, u) => { fridge = 1; s.f = -1; s.tgN = [112, CNT.top - 92 + Math.sin(u * Math.PI) * -6]; s.leanT = 0.08; it.o.frac = u * 0.85; s.look = { x: () => 120, until: K.simT + 0.3 }; }));
      else ph.push(K.ph(1.4, (s, u, t) => { scis = 1; s.hold.N = H.tool('scissors'); s.f = 1; s.tgN = [124 + Math.sin(t * 5) * 4, CNT.top - 24]; s.leanT = 0.14; it.o.frac = u * 0.85; s.look = { x: () => 124, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })); // snip the noodles
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 34, CNT.top - 22]; s.tgF = [ST.x + 46, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT, r = Math.random();
      if (r < 0.4) return K.start(a, 'fan', [K.ph(rand(2, 3), (s, u, t) => { coal = Math.max(coal, 0.5); s.hold.N = H.tool('fan'); s.f = -1; s.tgN = [52 + Math.sin(t * 9) * 8, CNT.top - 30]; s.look = { x: () => 50, until: K.simT + 0.3 }; if (Math.random() < 0.04) K.fx('spark', 50, CNT.top - 24, { life: 0.6, col: '#ffb040' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (r < 0.75) return K.start(a, 'banchan', [K.ph(rand(2, 3), (s, u, t) => { s.f = 1; s.tgN = [128 + Math.sin(t * 2) * 14, CNT.top - 18]; s.tgF = [140 + Math.cos(t * 2) * 10, CNT.top - 14]; s.look = { x: () => 132, until: K.simT + 0.3 }; })]);
      return K.start(a, 'taste', [K.ph(1.6, (s, u) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = u < 0.5 ? [28, CNT.top - 34] : [s.R.cx - 6, s.R.cy + 6]; s.look = { x: () => 28, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; K.say(a, pick(['Hmm, more garlic', 'Perfect.', 'icon:heart']), 1); } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.55) return K.start(a, 'coal', [K.ph(rand(2, 2.8), (s, u, t) => { coal = Math.max(coal, 0.6); s.hold.N = H.tool('bucket'); s.tgN = [222 + Math.sin(t * 2) * 4, CNT.top - 40]; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Bul deurilgeyo!', 'Fresh charcoal!', 'Coming through!']), 1.1), exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'bow', [K.ph(1.4, (s, u) => { s.leanT = Math.sin(u * Math.PI) * 0.3; s.look = { x: () => 40, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Eoseo oseyo!', 'Annyeonghaseyo!']), 1.1) })], { onAbort: (s) => { s.leanT = 0; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'scissors') { const o = scis > 0 ? Math.abs(Math.sin(X.t * 14)) * 0.5 : 0.2; c.strokeStyle = L('#c8ccd2'); c.lineWidth = 1.6 * s; for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(-1.2 + sg * o) * 16 * s, y + Math.sin(-1.2 + sg * o) * 16 * s); c.stroke(); } c.strokeStyle = L('#d8402a'); c.lineWidth = 1.4 * s; c.beginPath(); c.arc(x - 2 * s, y + 3 * s, 2.6 * s, 0, TAU); c.arc(x + 3 * s, y + 3 * s, 2.6 * s, 0, TAU); c.stroke(); }
      else if (k === 'ladle') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 12 * s, y - 10 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x + 13 * s, y - 9 * s, 3.4 * s, 0, Math.PI); c.fill(); }
      else if (k === 'fan') { c.fillStyle = L('#e8d8a8'); c.beginPath(); c.moveTo(x, y); c.arc(x, y, 12 * s, -2.2, -0.9); c.closePath(); c.fill(); c.strokeStyle = L('#8a6a3a'); c.lineWidth = 0.8 * s; for (let q = 0; q < 5; q++) { const an = -2.2 + q * 0.33; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(an) * 12 * s, y + Math.sin(an) * 12 * s); c.stroke(); } }
      else if (k === 'bucket') { c.fillStyle = L('#5a5a62'); K0(c, [x - 8 * s, y - 12 * s, x + 8 * s, y - 12 * s, x + 6 * s, y, x - 6 * s, y]); c.fill(); c.strokeStyle = L('#8a8a92'); c.lineWidth = 1.2 * s; c.beginPath(); c.arc(x, y - 12 * s, 8 * s, Math.PI, TAU); c.stroke(); for (let q = 0; q < 4; q++) { c.fillStyle = q % 2 ? '#ff8a30' : '#ffcc60'; c.beginPath(); c.arc(x - 5 * s + q * 3.4 * s, y - 12.5 * s, 2 * s, 0, TAU); c.fill(); } X.K.glow(c, x, y - 14 * s, 18 * s, '#ff8a30', 0.35); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'meat') { c.fillStyle = L('#3a3a40'); ellipse(c, 0, -1, 12, 2.6); c.fill(); for (let i = 0; i < 4; i++) if (frac > i * 0.2) { c.fillStyle = L(m.c); roundRect(c, -10 + i * 5, -6, 4.4, 5, 1); c.fill(); if (m.n === 'Samgyeopsal') { c.fillStyle = L('#f4e6d8'); c.fillRect(-10 + i * 5, -4.4, 4.4, 1); } } if (frac > 0.6) { c.fillStyle = L('#6aa83a'); ellipse(c, 8, -3, 4, 2.4, 0.3); c.fill(); } }
      else if (m.kind === 'stew') { c.fillStyle = L('#2a2220'); K0(c, [-8, -8, 8, -8, 6, 0, -6, 0]); c.fill(); if (frac > 0.3) { c.fillStyle = L(m.c); ellipse(c, 0, -8, 8, 2); c.fill(); } if (frac > 0.6) { c.fillStyle = L('#f4f0e6'); c.fillRect(-4, -9, 2.6, 2); c.fillStyle = L('#6aa83a'); c.fillRect(1, -9, 3, 1.4); } if (frac > 0.8) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(0, -14, 2.4, 0, TAU); c.fill(); } }
      else if (m.kind === 'soju') { c.fillStyle = L('#3a9a5a'); roundRect(c, -3, -18, 6, 18, 2); c.fill(); c.fillRect(-1.4, -22, 2.8, 5); c.fillStyle = L('#f4f0e6'); c.fillRect(-3, -11, 6, 4); if (frac > 0.4) { c.fillStyle = 'rgba(230,240,240,0.9)'; K0(c, [5, -6, 10, -6, 9.4, 0, 5.6, 0]); c.fill(); } if (m.n === 'Somaek set' && frac > 0.7) { c.fillStyle = L('#f0c040'); c.fillRect(-12, -10, 6, 10); c.fillStyle = L('#fbf6e8'); c.fillRect(-12, -12, 6, 2.4); } }
      else { c.fillStyle = L('#c8ccd2'); K0(c, [-10, -7, 10, -7, 7, 0, -7, 0]); c.fill(); if (frac > 0.3) { c.fillStyle = L('#b8a890'); ellipse(c, 0, -7, 9, 2); c.fill(); } if (frac > 0.6) { c.fillStyle = 'rgba(230,246,255,0.9)'; c.fillRect(-5, -9, 2.4, 2.4); c.fillRect(2, -9.4, 2.4, 2.4); c.fillStyle = L('#f4e8a0'); c.beginPath(); c.arc(-1, -9, 2, 0, TAU); c.fill(); } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.kbbq = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660); c.fillStyle = P.panelDk; c.fillRect(-60, 0, 1400, 40); c.fillStyle = P.panel; c.fillRect(-60, 300, 1400, 360); c.fillStyle = P.panelDk; c.fillRect(-60, 296, 1400, 6);
      for (let i = 0; i < 28; i++) { c.fillStyle = rgba('#000000', 0.08); c.fillRect(-60 + i * 52, 302, 2, 360); } // vertical wainscot boards
      // hand-lettered Hangul menu
      { const x0 = 18, y0 = 70; c.fillStyle = P.menu; roundRect(c, x0, y0, 246, 196, 4); c.fill(); c.strokeStyle = P.red; c.lineWidth = 3; c.strokeRect(x0 + 6, y0 + 6, 234, 184);
        c.fillStyle = P.red; c.font = `400 19px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('차 림 표', x0 + 123, y0 + 26);
        const items = [['삼겹살', '15,000'], ['갈비', '22,000'], ['목살', '16,000'], ['된장찌개', '8,000'], ['냉면', '9,000'], ['소주 · 맥주', '5,000']];
        items.forEach(([n, p], i) => { const yy = y0 + 54 + i * 22; c.fillStyle = P.menuInk; c.font = `400 15px ${JP_FONT}`; c.textAlign = 'left'; c.fillText(n, x0 + 20, yy); c.textAlign = 'right'; c.font = '800 12px "Trebuchet MS", sans-serif'; c.fillText(p, x0 + 226, yy); }); }
      // the dining room behind the board: steel tables with charcoal grills, silver ducts dropping from the ceiling, smoke curling
      for (let g = 0; g < 5; g++) { const bx = 300 + g * 150, by = 440; c.fillStyle = P.ductDk; c.fillRect(bx + 50, 0, 16, by - 120); c.fillStyle = P.duct; c.fillRect(bx + 52, 0, 8, by - 120); for (let k = 0; k < 6; k++) { c.fillStyle = rgba('#000000', 0.12); c.fillRect(bx + 50, 30 + k * 50, 16, 2); } // telescoping duct
        c.fillStyle = P.duct; K0(c, [bx + 34, by - 120, bx + 82, by - 120, bx + 92, by - 96, bx + 24, by - 96]); c.fill(); c.fillStyle = P.ductDk; c.fillRect(bx + 24, by - 98, 68, 4);
        c.fillStyle = P.steel; c.fillRect(bx, by, 116, 10); c.fillStyle = P.ductDk; c.fillRect(bx + 10, by + 10, 6, 70); c.fillRect(bx + 100, by + 10, 6, 70);
        c.fillStyle = L('#2a2a2e'); ellipse(c, bx + 58, by, 22, 5); c.fill(); c.fillStyle = rgba('#ff7a30', 0.5 + 0.3 * Math.sin(t * 3 + g)); ellipse(c, bx + 58, by - 1, 16, 3); c.fill(); K.glow(c, bx + 58, by - 4, 40, '#ff8a40', 0.12 + 0.12 * P.neonA);
        for (let q = 0; q < 3; q++) { const ph = (t * 0.35 + q * 0.33 + g * 0.21) % 1; c.fillStyle = rgba('#e8e4e0', 0.28 * (1 - ph) * (0.6 + 0.4 * Math.sin(smoke + g))); c.beginPath(); c.arc(bx + 58 + Math.sin(t * 0.8 + q + g) * 6, by - 8 - ph * 86, 5 + ph * 9, 0, TAU); c.fill(); } // smoke rising into the hood
        for (let k = 0; k < 2; k++) { c.fillStyle = L('#3a9a5a'); roundRect(c, bx + 10 + k * 86, by - 18, 6, 18, 2); c.fill(); } } // green bottles on every table
      { const top = X.CNT.top; // back shelf (behind the staff): the soju fridge (glass door, rows of green bottles) and stacked steel bowls
      { const fx = 104, fy = top - 128; c.fillStyle = L('#d8dce0'); c.fillRect(fx, fy, 64, 92); c.fillStyle = fridge > 0 ? 'rgba(220,246,255,0.75)' : 'rgba(190,220,235,0.5)'; c.fillRect(fx + 4, fy + 4, 56, 84); for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { c.fillStyle = L(r === 2 ? '#c89a3a' : '#3a9a5a'); roundRect(c, fx + 7 + k * 9, fy + 10 + r * 26, 6, 20, 2); c.fill(); c.fillStyle = L('#f4f0e6'); c.fillRect(fx + 7 + k * 9, fy + 18 + r * 26, 6, 4); } if (fridge > 0) K.glow(c, fx + 32, fy + 40, 50, '#e0f4ff', 0.35 * fridge); c.fillStyle = L('#8a9096'); c.fillRect(fx + 58, fy + 30, 3, 26); }
      { const sx = 196, sy = top - 60; for (let k = 0; k < 5; k++) { c.fillStyle = L(k % 2 ? '#c4c8ce' : '#b0b4ba'); K0(c, [sx - 14, sy - k * 5, sx + 14, sy - k * 5, sx + 11, sy + 4 - k * 5, sx - 11, sy + 4 - k * 5]); c.fill(); } }
      }
      // string lights
      c.strokeStyle = rgba('#000000', 0.4); c.lineWidth = 1; c.beginPath(); for (let i = 0; i <= 30; i++) { const lx = -40 + i * 46; const ly = 52 + Math.sin(i * 0.9) * 6; i ? c.lineTo(lx, ly) : c.moveTo(lx, ly); } c.stroke();
      for (let i = 0; i <= 30; i++) { const lx = -40 + i * 46, ly = 56 + Math.sin(i * 0.9) * 6; c.fillStyle = rgba(['#ffd070', '#ff8a6a', '#8ae0a0'][i % 3], 0.6 + 0.4 * P.neonA); c.beginPath(); c.arc(lx, ly, 3, 0, TAU); c.fill(); }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.panelDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = P.panelDk; c.fillRect(x0 + (x1 - x0) / 2 - 3, y0, 6, y1 - y0); c.fillStyle = 'rgba(255,255,255,0.1)'; K0(c, [x0 + 20, y0, x0 + 60, y0, x0 + 10, y1, x0 - 30, y1]); c.fill();
      c.fillStyle = P.red; roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 5); c.fill(); c.fillStyle = L('#fbf0d8'); c.font = `400 18px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('숯불 고깃집', (x0 + x1) / 2, y0 - 34);
    },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      c.fillStyle = P.sky0; c.fillRect(x0, y0, w, 140);
      c.fillStyle = P.hill; c.beginPath(); c.moveTo(x0, y0 + 120); c.quadraticCurveTo(x0 + w * 0.5, y0 + 40, x1, y0 + 110); c.lineTo(x1, y0 + 140); c.lineTo(x0, y0 + 140); c.closePath(); c.fill();
      { const tx = x0 + w * 0.5, ty = y0 + 66; c.fillStyle = rgba(P.bld2, 1); c.fillRect(tx - 2, ty - 40, 4, 40); c.fillRect(tx - 7, ty - 52, 14, 12); c.fillRect(tx - 1, ty - 68, 2, 16); if (n > 0.3) { c.fillStyle = rgba('#a8d8ff', 0.7 * n); c.fillRect(tx - 7, ty - 48, 14, 3); K.glow(c, tx, ty - 46, 20, '#a8d8ff', 0.3 * n); } } // the tower on the hill
      { const cx = x0 + w * 0.18, cy = y0 + 72; c.fillStyle = n > 0.3 ? '#ff3a3a' : rgba(P.bld2, 1); c.fillRect(cx - 1.5, cy - 12, 3, 22); c.fillRect(cx - 7, cy - 6, 14, 3); if (n > 0.3) K.glow(c, cx, cy, 16, '#ff3a3a', 0.4 * n); } // a red neon cross
      c.fillStyle = P.bld; c.fillRect(x0, y0 + 120, w, 140); for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { c.fillStyle = rgba('#ffe0a0', 0.15 + 0.6 * P.winA * (((r * 2 + k) % 3) ? 1 : 0.2)); c.fillRect(x0 + 8 + k * 34, y0 + 132 + r * 30, 18, 16); }
      for (const [sx, sy, col, tx] of [[0.06, 0, '#ff4a8a', '노래방'], [0.06, 1, '#ffd040', '치킨'], [0.6, 0, '#4ad8ff', '호프'], [0.6, 1, '#7aff8a', '편의점']]) { const vx = x0 + w * sx, vy = y0 + 134 + sy * 44; c.fillStyle = rgba('#141018', 0.92); roundRect(c, vx, vy, 74, 30, 4); c.fill(); c.fillStyle = col; c.font = `400 16px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(tx, vx + 37, vy + 16); K.glow(c, vx + 37, vy + 15, 34, col, 0.32 * P.neonA * (0.85 + 0.15 * Math.sin(t * 7 + sx * 20))); }
      c.fillStyle = P.road; c.fillRect(x0, y0 + 260, w, hh - 260); c.fillStyle = rgba('#ffffff', 0.4); for (let k = 0; k < 8; k++) c.fillRect(x0 + k * 34 + 4, y0 + 300, 18, 2);
      for (let k = 0; k < 3; k++) { const sp = 46 + k * 14, dir = k % 2 ? 1 : -1, sx = dir > 0 ? x0 - 30 + ((t * sp + k * 131) % (w + 60)) : x1 + 30 - ((t * sp + k * 131) % (w + 60)), sy = y0 + 296 + k * 12; // delivery scooters with their boxes
        c.fillStyle = L('#2a2a30'); c.beginPath(); c.arc(sx - 8, sy, 4, 0, TAU); c.arc(sx + 8, sy, 4, 0, TAU); c.fill(); c.fillStyle = L(['#e8e4dc', '#d83a2e', '#3a7ad8'][k]); roundRect(c, sx - 10, sy - 9, 20, 7, 3); c.fill(); c.fillStyle = L(['#d83a2e', '#f0c040', '#e8e4dc'][k]); c.fillRect(sx - dir * 14 - 6, sy - 22, 12, 11);
        c.fillStyle = L('#2e4a6a'); c.fillRect(sx - 3, sy - 22, 8, 13); c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(sx + 1, sy - 26, 5, 0, TAU); c.fill();
        if (n > 0.3) { c.fillStyle = rgba('#fff4c8', 0.8); c.beginPath(); c.arc(sx + dir * 11, sy - 6, 2, 0, TAU); c.fill(); c.fillStyle = rgba('#fff4c8', 0.12 * n); K0(c, [sx + dir * 11, sy - 6, sx + dir * 50, sy - 14, sx + dir * 50, sy + 4]); c.fill(); } }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; c.fillStyle = P.floor; c.fillRect(-60, 642, 1400, 120); for (let i = 0; i < 14; i++) { c.fillStyle = rgba('#000000', 0.08); c.fillRect(-60 + i * 100, 642, 2, 120); } for (let i = 0; i < 120; i++) { c.fillStyle = rgba(i % 3 ? P.floor2 : '#ffffff', 0.4); c.fillRect(-60 + (i * 97) % 1400, 646 + (i * 37) % 100, 3, 2); } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // stew burner: a bubbling ttukbaegi
      { const px = 28, py = top - 6; c.fillStyle = L('#3a3a40'); c.fillRect(px - 16, py - 6, 32, 6); c.fillStyle = L('#2a2220'); K0(c, [px - 14, py - 22, px + 14, py - 22, px + 11, py - 6, px - 11, py - 6]); c.fill(); c.fillStyle = L('#a86a2a'); ellipse(c, px, py - 22, 13, 3.4); c.fill(); for (let k = 0; k < 4; k++) { const ph = (stewB * (1.6 + k * 0.2) + k * 0.31) % 1; c.fillStyle = rgba('#e8b070', 0.7 * (1 - ph)); c.beginPath(); c.arc(px - 8 + k * 5, py - 22, 1 + ph * 2.2, 0, TAU); c.fill(); } for (let k = 0; k < 2; k++) { const ph = (t * 0.5 + k * 0.5) % 1; c.fillStyle = rgba('#ffffff', 0.35 * (1 - ph)); c.beginPath(); c.arc(px + Math.sin(t + k) * 4, py - 30 - ph * 30, 4 + ph * 8, 0, TAU); c.fill(); } }
      // charcoal brazier: glowing coals, brighter when fanned / restocked
      { const bx = 62, by = top - 6, g = 0.5 + coal * 0.5 + 0.1 * Math.sin(t * 5); c.fillStyle = L('#4a4a52'); K0(c, [bx - 18, by - 18, bx + 18, by - 18, bx + 14, by, bx - 14, by]); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = rgba(k % 2 ? '#ff6a20' : '#ffb040', 0.5 + 0.5 * g); c.beginPath(); c.arc(bx - 12 + k * 4.8, by - 19 - (k % 2) * 2, 3.4, 0, TAU); c.fill(); } K.glow(c, bx, by - 22, 34 + coal * 20, '#ff8a30', 0.3 * g);
        if (sparks > 0 || coal > 0.5) for (let k = 0; k < 5; k++) { const ph = (t * 1.3 + k * 0.2) % 1; c.fillStyle = rgba('#ffcc60', (1 - ph) * Math.max(sparks, coal - 0.4)); c.fillRect(bx - 8 + k * 4 + Math.sin(t * 3 + k) * 4, by - 24 - ph * 40, 1.6, 1.6); } }
      // meat board with a slab of pork belly, scissors hanging, and the banchan station
      { const mx = 100, my = top - 6; c.fillStyle = L('#c8a070'); c.fillRect(mx - 16, my - 4, 32, 4); c.fillStyle = L('#d88a80'); c.fillRect(mx - 12, my - 10, 24, 6); c.fillStyle = L('#f4e6d8'); c.fillRect(mx - 12, my - 8, 24, 1.4); c.fillRect(mx - 12, my - 5.6, 24, 1); if (scis > 0) for (let k = 0; k < 3; k++) { c.fillStyle = L('#d88a80'); c.fillRect(mx + 14 + k * 5, my - 6, 4, 4); } }
      { const bx = 132, by = top - 6; [['#c83a24', 'k'], ['#f0e8c8', 's'], ['#3a7a2a', 'p'], ['#e8b030', 'e'], ['#8a5a2a', 'f']].forEach(([col, k], i) => { const px = bx - 18 + i * 10; c.fillStyle = L('#f4f0e6'); ellipse(c, px, by - 1, 4.6, 1.6); c.fill(); c.fillStyle = L(col); c.beginPath(); c.arc(px, by - 2, 3.2, Math.PI, TAU); c.fill(); }); }
      // register
      { const rx = 214, ry = top - 6; c.fillStyle = L('#2a2a30'); c.fillRect(rx - 14, ry - 18, 28, 18); c.fillStyle = L('#7ad89a'); c.fillRect(rx - 10, ry - 15, 20, 6); }
      // counter front: dark wood with a red band and the house slogan
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.red; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, 36);
      c.fillStyle = L('#fbf0d8'); c.font = `400 16px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('어서 오세요', (x0 + x1) / 2, top + 21);
      for (let i = 0; i < 4; i++) { c.strokeStyle = rgba('#000000', 0.2); c.lineWidth = 1; c.strokeRect(x0 + 12 + i * 58, top + 52, 46, 76); }
      { const gx = x0 + 128, gy = top + 54; c.fillStyle = 'rgba(200,230,240,0.55)'; c.fillRect(gx, gy, 104, 72); for (let r = 0; r < 2; r++) for (let k = 0; k < 9; k++) { c.fillStyle = L(r ? '#c89a3a' : '#3a9a5a'); roundRect(c, gx + 5 + k * 11, gy + 8 + r * 32, 7, 26, 2); c.fill(); c.fillStyle = L('#f4f0e6'); c.fillRect(gx + 5 + k * 11, gy + 18 + r * 32, 7, 5); } c.fillStyle = 'rgba(255,255,255,0.22)'; K0(c, [gx + 10, gy, gx + 30, gy, gx + 12, gy + 72, gx - 8 + 10, gy + 72]); c.fill(); c.strokeStyle = L('#c4c8ce'); c.lineWidth = 3; c.strokeRect(gx, gy, 104, 72); } // under-counter soju & beer fridge
      if (toast > 0) for (let k = 0; k < 10; k++) { c.fillStyle = rgba(['#ffd040', '#7ae0a0', '#ff8a6a'][k % 3], toast); c.save(); c.translate(30 + k * 22, top - 90 - (1 - toast) * 34 + Math.sin(k * 3) * 10); c.rotate(k + toast * 5); c.fillRect(-3, -1.5, 6, 3); c.restore(); }
    },
    events: [
      { name: 'geonbae', dur: 9, start(X, srv, mk) { const K = X.K; toast = 1; fridge = 1; K.say(srv, 'Somaek tower!', 1.3); K.after(0.9, () => { K.fx('flash', 140, X.CNT.top - 60); for (const c of K.actors.filter((q) => q.cust)) { c.tgN = [c.R.cx + 10, c.R.cy - 30]; K.say(c, pick(['Geonbae!!', 'One shot!', 'icon:star', 'Jjan!']), 1.4); } K.say(mk, 'Geonbae!', 1.2); }); } },
      { name: 'charcoal', dur: 8, start(X, srv, mk) { const K = X.K; coal = 1; sparks = 1; K.say(srv, 'Fresh charcoal!', 1.3); for (let k = 0; k < 5; k++) K.after(k * 0.3, () => K.fx('spark', 50 + k * 6, X.CNT.top - 30, { life: 0.8, col: '#ffb040' })); K.after(1, () => { for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.7) K.say(c, pick(['Ooh, hot!', 'Hot hot!', 'Smells amazing']), 1.2); }); } },
      { name: 'scissors', dur: 8, start(X, srv, mk) { const K = X.K; scis = 3; K.say(mk, 'Give me that, I\'ll cut it!', 1.6); K.after(1.4, () => { K.say(mk, 'Wrap it in lettuce. With garlic!', 1.8); for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.7) K.say(c, pick(['Ne, Imo!', 'icon:heart', 'Haha, okay!']), 1.2); }); } },
    ],
  };
  registerStage('kbbq', makeGeoCafe(W));
})();
