/* ================= NEW WORLD · Tea House — GEOMETRIC edition =================
   A small Kyoto tea room off a garden. Master Sen, in a grey kimono with a moss obi, makes every bowl the slow way: a scoop of
   matcha with the bamboo chashaku, a ladle of water from the iron kama on its brazier, then the quick M-stroke whisk with the
   chasen until a fine foam rises — and the bowl is turned twice before it's presented. Hana serves in an indigo kimono, kneels
   with the tray and bows. Between orders Sen folds the purple fukusa cloth. Wall: a tokonoma with the hanging scroll 一期一会
   and a single camellia, wooden menu plaques, shoji screens behind the board, paper lanterns. Window: a half-open shoji onto a
   moss garden — bamboo grove, a red maple shedding leaves, a stone lantern (lit at dusk), raked gravel, a koi pond, and the
   shishi-odoshi bamboo that fills, tips and KNOCKS every so often. Signatures: SHISHI-ODOSHI — a loud knock, the whole room
   pauses · TEA CEREMONY — a guest receives the bowl, turns it, drinks, and the room bows. Clock 09:00 morning tea -> midday ->
   afternoon -> 19:00 lantern hour. Blocks: hanami dango · yōkan · matcha · dorayaki · nerikiri · warabi kinako · daifuku. */
(() => {
  WORLD_DEFS.push({
    id: 'teahouse', name: 'Tea House', sub: '茶屋 · a Kyoto tea room on a moss garden', thumbY: 0.42,
    desc: 'A quiet Kyoto tea room: matcha whisked the slow way, wagashi on lacquer, a red maple and a stone lantern in the garden, and the shishi-odoshi knocking now and then — koto and shakuhachi.',
    accent: '#7a9a4a', accent2: '#d8c8a0', skin: 'teahouse', particle: 'petal',
    boardBg: 'rgba(30,26,22,0.9)', grid: 'rgba(255,236,200,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 70, root: 62, scale: [0, 1, 5, 7, 8], prog: [0, 3, 1, 4], barsPerChord: 2,
      pad: { wave: 'sine', cutoff: 900, gain: 0.018, detune: 4, voices: 3 },
      comp: { inst: 'koto', pattern: E16('x.....x...x.....'), voices: 2, gain: 0.05, oct: 0 },
      arp: { inst: 'koto', pattern: [0, 2, 3, 4, 3, 2, 1, 2], every: 1, oct: 1, gain: 0.045, density: 0.5 },
      bass: { pattern: E16('x...............'), gain: 0.1, dec: 0.5, wave: 'sine' },
      drums: { kick: E16('x...............'), snareInst: 'wood', snare: E16('........x.......'), hat: E16('................'), extra: E16('..........x.....'), extraInst: 'wood' },
      lead: { inst: 'flute', gain: 0.045, density: 0.1, oct: 1 }, sfx: 'koto', clearFx: 'chime',
      amb: { chatter: 0.004, clink: 0.006 },
    },
  });
  const TeaPal = GeoCafePal({
    day: { wall: '#e8dcc2', wall2: '#dccfb2', post: '#5a4030', postDk: '#3e2a1e', shoji: '#f6f0e2', shojiF: '#8a6a4a', tatami: '#c8c08a', tatami2: '#b8b07a', heri: '#2e3a2a', wood: '#c8a478', woodDk: '#8a6440', ink: '#2a2420',
      cnt: '#d8b888', cnt2: '#3a2418', lacq: '#2a1410', lacqR: '#8a2a20', iron: '#3a3634', lantern: '#f4e8cc', lanA: 0.15,
      sky0: '#bcd6e4', sky1: '#e4eef0', bamboo: '#7a9a4a', bamboo2: '#5a7a34', moss: '#6a8a3a', moss2: '#4e6e2a', gravel: '#dcd6c8', gravel2: '#c4bcac', stone: '#9a968e', stone2: '#76726c', maple: '#c8442e', maple2: '#e07a3a', trunk: '#4a3428', pond: '#5a8a90', pond2: '#7aa8aa', tsuiji: '#e8dcc0', roof: '#4a4a50',
      lamp: '#fff4dc', glow: '#ffe8c0', glowA: 0.06, shaft: '#fff4dc', shaftA: 0.12, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#e2d2b4', wall2: '#d4c4a4', post: '#523a2a', postDk: '#38261a', shoji: '#f8e8cc', shojiF: '#806244', tatami: '#c0b47e', tatami2: '#b0a470', heri: '#2a3426', wood: '#c09a6c', woodDk: '#80583a', ink: '#2a2420',
      cnt: '#d0ac7c', cnt2: '#341e14', lacq: '#26120e', lacqR: '#84261c', iron: '#34302e', lantern: '#ffe0a8', lanA: 0.6,
      sky0: '#e8a888', sky1: '#f4d0a8', bamboo: '#6a8440', bamboo2: '#4e6a2e', moss: '#5e7a34', moss2: '#445e26', gravel: '#d8c8b0', gravel2: '#bcae98', stone: '#8e8680', stone2: '#6a645e', maple: '#c03a2a', maple2: '#e06a34', trunk: '#40302a', pond: '#8a7a80', pond2: '#c8a090', tsuiji: '#e4cca8', roof: '#3e3a44',
      lamp: '#ffe8c0', glow: '#ffd8a0', glowA: 0.22, shaft: '#ffc890', shaftA: 0.1, amb: '#ffc8a0', ambK: 0.06, sun: '#ff9c60', cloud: '#e8b8a8' },
    night: { wall: '#c8b494', wall2: '#baa686', post: '#3e2c20', postDk: '#2a1c14', shoji: '#f4d8a4', shojiF: '#6a4e34', tatami: '#a89c68', tatami2: '#988c5c', heri: '#20281c', wood: '#a88458', woodDk: '#6a4a30', ink: '#2a2420',
      cnt: '#b8946a', cnt2: '#2a1810', lacq: '#1e0e0a', lacqR: '#6a1e16', iron: '#2a2624', lantern: '#ffd890', lanA: 1,
      sky0: '#121828', sky1: '#1e2638', bamboo: '#2a3a26', bamboo2: '#1e2c1c', moss: '#24321e', moss2: '#1a2616', gravel: '#4a4c52', gravel2: '#3a3c42', stone: '#4a4a50', stone2: '#34343a', maple: '#6a2a24', maple2: '#7a3a2a', trunk: '#1e1814', pond: '#1e2a3a', pond2: '#3a4a5a', tsuiji: '#4a4a52', roof: '#1e1e24',
      lamp: '#ffe0b0', glow: '#ffd090', glowA: 0.4, shaft: '#ffd090', shaftA: 0, amb: '#3a3050', ambK: 0.08, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: { gravel: '#f2f4f6', gravel2: '#dfe3e8', moss: '#e8ecee', moss2: '#d4dade' },
  }, [[5, 'night'], [7.5, 'day'], [16.5, 'day'], [18, 'dusk'], [19.4, 'night'], [29, 'night'], [31.5, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 5 && h < 11 ? 'Morning tea' : h >= 11 && h < 14 ? 'Midday' : h >= 14 && h < 17.5 ? 'Afternoon' : 'Lantern hour'; });
  const MENU = [{ n: 'Matcha & wagashi', c: '#6e8e34', kind: 'matcha' }, { n: 'Sencha', c: '#b8c070', kind: 'sencha' }, { n: 'Hōjicha', c: '#8a5a34', kind: 'hoji' },
    { n: 'Hanami dango', c: '#f2bcc4', kind: 'dango' }, { n: 'Nerikiri', c: '#b89ad0', kind: 'wagashi' }, { n: 'Warabi mochi', c: '#dcb874', kind: 'warabi' }];
  let kama = 0, whisk = 0, shishi = 0, shishiT = 0, knockFx = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'teahouse', pal: TeaPal, stationX: 104, startHour: 9, span: 11, font: '700 15px Georgia, serif', vign: 'rgba(40,24,10,0.22)', zone: 'rgba(250,240,220,0.22)',
    per: (h) => { const x = h < 5 ? h + 24 : h; return x < 11 ? 0 : x < 14 ? 1 : x < 17.5 ? 2 : 3; },
    staff: [{ T: 222, hw: 54, headR: 27, pattern: 'kimono', top: '#3a4a6a', top2: '#d8c8a0', top3: '#a83a30', shirt: 'white', hairStyle: 'bun', hair: 'dark', skirt: '#3a4a6a' },
      { T: 236, hw: 58, headR: 28, pattern: 'kimono', top: '#6a6460', top2: '#5e6e3a', top3: '#e8dcc0', shirt: 'white', hairStyle: 'short', hair: 'hairGrey', skirt: '#6a6460' }],
    menu: MENU, greet: ['Irasshaimase', 'Please, sit', 'Yōkoso'], ack: ['Kashikomarimashita', 'Hai', 'One bowl'], handOff: ['Dōzo', 'Please, enjoy', 'Turn it twice'],
    thanks: ['Gochisōsama', 'icon:tea', 'Lovely'], done: ['Such calm', 'icon:heart', 'Arigatō'], cheer: ['Oishii…', 'icon:star', 'So smooth'],
    types: {
      kimono: { body: { T: 216, hw: 52, pattern: 'kimono', top: 'coral', top2: 'mustard', top3: 'teal', shirt: 'white', hairStyle: 'bun', hair: 'dark', skirt: 'coral' }, vary: { top: ['coral', 'teal', 'plum'] }, words: ['Rental kimono!', 'icon:cam'] },
      oba: { body: { T: 206, hw: 54, pattern: 'cardigan', top: 'plum', top2: 'cream', hairStyle: 'perm', hair: 'hairGrey', skirt: 'grey' }, words: ['Every Thursday', 'Usucha, please'] },
      monk: { body: { T: 232, hw: 58, pattern: 'kimono', top: '#2a2a2e', top2: '#2a2a2e', top3: '#c8a050', shirt: 'white', hairStyle: 'bald', skirt: '#2a2a2e' }, words: ['…', 'icon:tea'] },
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'olive', hairStyle: 'short', pants: 'navy' }, words: ['Ten quiet minutes', 'Hōjicha'] },
      student: { body: { T: 210, hw: 52, pattern: 'jacket', top: 'navy', shirt: 'white', tie: 'coral', hairStyle: 'twin', hair: 'dark', skirt: 'navy' }, words: ['Dango!!', 'Pink one first'] },
      tourist: { body: { pattern: 'tee', top: 'teal', hat: 'bucket', hatCol: 'cream', camera: 1, backpack: 1, packCol: 'mustard', pants: 'olive' }, words: ['So green!', 'icon:cam'] },
      artist: { body: { T: 226, hw: 54, pattern: 'cardigan', top: 'mustard', top2: 'brown', hairStyle: 'long', hair: 'brown', glasses: 1, pants: 'brown' }, words: ['Sketching the maple', 'icon:star'] },
    },
    parties: [{ m: ['kimono', 'kimono'], w: [1, 2, 3, 2] }, { m: ['oba'], w: [3, 2, 2, 0] }, { m: ['monk'], w: [2, 1, 1, 1] }, { m: ['sala'], w: [0, 3, 1, 2] }, { m: ['student'], w: [0, 1, 3, 1] }, { m: ['tourist'], w: [1, 2, 3, 1] }, { m: ['artist'], w: [2, 1, 2, 1] }],
    sim(X, dt) { kama = Math.max(0, kama - dt * 0.4); whisk = Math.max(0, whisk - dt * 1.5); knockFx = Math.max(0, knockFx - dt * 1.4);
      shishiT += dt; if (shishi > 0) { shishi += dt; if (shishi > 1.6) shishi = 0; } else if (shishiT > 14) { shishiT = 0; shishi = 0.001; knockFx = 1; } },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'matcha') {
        ph.push(K.ph(0.9, (s, u) => { s.hold.N = H.tool('scoop'); s.f = 1; s.tgN = [128 - u * 20, CNT.top - 24 - Math.sin(u * Math.PI) * 10]; s.leanT = 0.12; it.o.frac = u * 0.2; s.look = { x: () => 118, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(1.0, (s, u) => { kama = 1; s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [40 + u * 50, CNT.top - 40 - Math.sin(u * Math.PI) * 18]; s.leanT = 0.1; it.o.frac = 0.2 + u * 0.2; s.look = { x: () => 40 + u * 50, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(1.6, (s, u, t) => { whisk = 1; s.hold.N = H.tool('chasen'); s.f = 1; s.tgN = [104 + Math.sin(t * 22) * 5, CNT.top - 20 + Math.abs(Math.cos(t * 22)) * 3]; s.leanT = 0.18; it.o.frac = 0.4 + u * 0.45; s.look = { x: () => 104, until: K.simT + 0.3 }; if (Math.random() < 0.05) K.fx('puff', 104, CNT.top - 18, { life: 0.5, col: '#cfe0a0' }); }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(0.8, (s, u) => { s.f = 1; s.tgN = [110 + Math.cos(u * TAU) * 6, CNT.top - 18]; s.tgF = [116 - Math.cos(u * TAU) * 6, CNT.top - 16]; }, { enter: () => K.say(a, 'icon:tea', 0.9) })); // turning the bowl
      } else if (m.kind === 'sencha' || m.kind === 'hoji') {
        ph.push(K.ph(0.9, (s, u) => { kama = 1; s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [40 + u * 40, CNT.top - 40]; it.o.frac = u * 0.4; s.look = { x: () => 40, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(1.4, (s, u) => { s.hold.N = H.tool('kyusu'); s.f = 1; s.tgN = [120, CNT.top - 30 + u * 6]; s.leanT = 0.12; it.o.frac = 0.4 + u * 0.5; s.look = { x: () => 120, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      } else {
        ph.push(K.ph(1.2, (s, u) => { s.hold.N = H.tool('kuromoji'); s.f = 1; s.tgN = [168, CNT.top - 26 + Math.sin(u * Math.PI) * -8]; s.leanT = 0.14; it.o.frac = u * 0.85; s.look = { x: () => 168, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      }
      ph.push(K.ph(0.6, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 20]; s.tgF = [ST.x + 42, CNT.top - 14]; s.leanT = Math.sin(u * Math.PI) * 0.2; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.55) return K.start(a, 'fukusa', [K.ph(rand(2.4, 3.4), (s, u, t) => { s.hold.N = H.tool('fukusa'); s.f = 1; s.tgN = [96 + Math.sin(t * 1.6) * 8, CNT.top - 34 + Math.cos(t * 1.6) * 6]; s.tgF = [112 - Math.sin(t * 1.6) * 8, CNT.top - 34]; s.leanT = 0.06; s.look = { x: () => 104, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'kama', [K.ph(rand(2, 3), (s, u) => { kama = Math.max(kama, 0.5); s.f = -1; s.tgN = [44, CNT.top - 44]; s.look = { x: () => 40, until: K.simT + 0.3 }; })]); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'bow', [K.ph(1.6, (s, u) => { s.leanT = Math.sin(u * Math.PI) * 0.4; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Irasshaimase', 'Yōkoso']), 1.1) }), K.ph(1.4, (s, u, t) => { s.hold.N = H.tool('tray'); s.tgN = [210, CNT.top - 24]; })], { onAbort: (s) => { s.hold.N = null; s.leanT = 0; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'scoop') { c.strokeStyle = L('#d8b878'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x - 2 * s, y + 2 * s); c.lineTo(x + 12 * s, y - 6 * s); c.stroke(); c.fillStyle = L('#7a9a3a'); c.beginPath(); c.arc(x + 12 * s, y - 6 * s, 1.6 * s, 0, TAU); c.fill(); }
      else if (k === 'ladle') { c.strokeStyle = L('#e0c890'); c.lineWidth = 1.3 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 14 * s, y - 12 * s); c.stroke(); c.fillStyle = L('#e8d4a0'); c.fillRect(x + 12 * s, y - 16 * s, 6 * s, 5 * s); }
      else if (k === 'chasen') { c.fillStyle = L('#e8d4a0'); c.fillRect(x - 1.4 * s, y - 12 * s, 2.8 * s, 6 * s); c.strokeStyle = L('#ecdcb0'); c.lineWidth = 0.6 * s; for (let i = -3; i <= 3; i++) { c.beginPath(); c.moveTo(x, y - 6 * s); c.lineTo(x + i * 1.2 * s, y + 1 * s); c.stroke(); } }
      else if (k === 'kyusu') { c.fillStyle = L('#a8502e'); c.beginPath(); c.arc(x, y - 5 * s, 5 * s, 0, TAU); c.fill(); c.fillRect(x - 10 * s, y - 6 * s, 6 * s, 2 * s); c.fillStyle = L('#8a3e22'); c.fillRect(x + 4 * s, y - 7 * s, 5 * s, 2 * s); }
      else if (k === 'kuromoji') { c.strokeStyle = L('#8a6a4a'); c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3 * s, y - 13 * s); c.stroke(); }
      else if (k === 'fukusa') { c.fillStyle = L('#7a3a7a'); K0(c, [x - 6 * s, y - 8 * s, x + 6 * s, y - 9 * s, x + 7 * s, y + 1 * s, x - 5 * s, y + 2 * s]); c.fill(); c.fillStyle = 'rgba(255,255,255,0.18)'; K0(c, [x - 6 * s, y - 8 * s, x + 6 * s, y - 9 * s, x, y - 4 * s]); c.fill(); }
      else if (k === 'tray') { c.fillStyle = L('#2a1410'); c.fillRect(x - 12 * s, y - 2 * s, 24 * s, 3 * s); c.fillStyle = L('#8a2a20'); c.fillRect(x - 12 * s, y - 2 * s, 24 * s, 0.8 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'matcha') { c.fillStyle = L('#2a1e18'); c.beginPath(); c.moveTo(-9, -9); c.quadraticCurveTo(-9, 0, 0, 0); c.quadraticCurveTo(9, 0, 9, -9); c.closePath(); c.fill(); c.fillStyle = L('#5a4234'); c.fillRect(-4, -1, 8, 1.6); if (frac > 0.3) { c.fillStyle = L(frac > 0.7 ? '#a8c070' : '#6e8e34'); ellipse(c, 0, -9, 8.2, 2.2); c.fill(); } c.fillStyle = L('#f4ecdc'); ellipse(c, 13, -1, 4, 1.4); c.fill(); c.fillStyle = L('#c8a8dc'); c.beginPath(); c.arc(13, -3, 2.4, 0, TAU); c.fill(); }
      else if (m.kind === 'sencha' || m.kind === 'hoji') { c.fillStyle = L('#ece4d4'); K0(c, [-4.5, -11, 4.5, -11, 4, 0, -4, 0]); c.fill(); c.strokeStyle = L('#5a7a8a'); c.lineWidth = 0.8; c.beginPath(); c.moveTo(-4.3, -7); c.lineTo(4.3, -7); c.stroke(); if (frac > 0.5) { c.fillStyle = L(m.kind === 'hoji' ? '#8a5a34' : '#b8c070'); ellipse(c, 0, -11, 4.3, 1.2); c.fill(); } if (frac > 0.8) { c.fillStyle = 'rgba(255,255,255,0.45)'; c.beginPath(); c.arc(1, -16, 2, 0, TAU); c.fill(); } }
      else if (m.kind === 'dango') { c.fillStyle = L('#2a1410'); ellipse(c, 0, -0.5, 11, 1.8); c.fill(); c.strokeStyle = L('#c8a46a'); c.lineWidth = 0.8; c.beginPath(); c.moveTo(-10, -4); c.lineTo(10, -4); c.stroke(); ['#f2bcc4', '#f6f1e6', '#b8cc84'].forEach((col, i) => { if (frac > 0.2 + i * 0.25) { c.fillStyle = L(col); c.beginPath(); c.arc(-5 + i * 5, -4, 2.8, 0, TAU); c.fill(); } }); }
      else { c.fillStyle = L('#2a1410'); ellipse(c, 0, -0.5, 9, 1.8); c.fill(); c.fillStyle = L('#8a2a20'); ellipse(c, 0, -1.2, 9, 1); c.fill(); if (frac > 0.3) { c.fillStyle = L(m.c); c.beginPath(); c.arc(0, -4.5, 4.2, Math.PI, TAU); c.fill(); c.fillRect(-4.2, -4.6, 8.4, 2.6); } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.teahouse = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      // plaster walls, dark posts and the nageshi beam, a lattice ranma above
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620); c.fillStyle = rgba(P.wall2, 0.6); for (let i = 0; i < 90; i++) { c.fillRect(-60 + ((i * 137) % 1400), 90 + ((i * 71) % 520), 3, 2); }
      c.fillStyle = P.postDk; c.fillRect(-60, 0, 1400, 44); c.fillStyle = P.post; c.fillRect(-60, 44, 1400, 14); c.fillStyle = rgba('#000000', 0.12); c.fillRect(-60, 58, 1400, 4);
      c.strokeStyle = P.post; c.lineWidth = 2; for (let i = 0; i < 70; i++) { c.beginPath(); c.moveTo(-60 + i * 20, 4); c.lineTo(-60 + i * 20, 40); c.stroke(); } c.fillStyle = P.post; c.fillRect(-60, 20, 1400, 3);
      for (const px of [268, 1000, 1280]) { c.fillStyle = P.post; c.fillRect(px, 58, 16, 610); c.fillStyle = rgba('#000000', 0.12); c.fillRect(px + 12, 58, 4, 610); }
      // paper lanterns hanging from the beam (lit at dusk)
      for (const lx of [420, 860]) { c.strokeStyle = P.postDk; c.lineWidth = 1.5; c.beginPath(); c.moveTo(lx, 58); c.lineTo(lx, 84); c.stroke(); c.fillStyle = P.postDk; c.fillRect(lx - 12, 84, 24, 5); c.fillRect(lx - 12, 129, 24, 5); c.fillStyle = P.lantern; ellipse(c, lx, 109, 19, 22); c.fill(); c.strokeStyle = rgba('#a88a5a', 0.6); c.lineWidth = 1; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(lx - 19, 109 + k * 7); c.quadraticCurveTo(lx, 109 + k * 8.5, lx + 19, 109 + k * 7); c.stroke(); } K.glow(c, lx, 109, 90, '#ffd890', 0.12 + 0.4 * P.lanA); }
      // left strip: the tokonoma — hanging scroll 一期一会 and a single camellia — then wooden menu plaques
      { const x0 = 22, y0 = 76; c.fillStyle = rgba(P.wall2, 0.9); c.fillRect(x0, y0, 120, 238); c.fillStyle = P.postDk; c.fillRect(x0 - 6, y0 + 238, 132, 10); c.fillStyle = P.post; c.fillRect(x0 - 6, y0 - 6, 132, 6);
        c.fillStyle = L('#5e6a4a'); c.fillRect(x0 + 34, y0 + 8, 52, 196); c.fillStyle = L('#f2ead6'); c.fillRect(x0 + 40, y0 + 26, 40, 160); c.fillStyle = L('#3a2a20'); c.fillRect(x0 + 30, y0 + 4, 60, 5); c.fillRect(x0 + 30, y0 + 204, 60, 6);
        c.fillStyle = L('#2a2420'); c.font = `400 22px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['一', '期', '一', '会'].forEach((ch, i) => c.fillText(ch, x0 + 60, y0 + 46 + i * 36)); c.fillStyle = L('#b83a2e'); c.fillRect(x0 + 66, y0 + 172, 7, 7);
        c.fillStyle = L('#6a5a4a'); K0(c, [x0 + 100, y0 + 238, x0 + 116, y0 + 238, x0 + 113, y0 + 206, x0 + 103, y0 + 206]); c.fill(); c.strokeStyle = L('#3e3020'); c.lineWidth = 2; c.beginPath(); c.moveTo(x0 + 108, y0 + 206); c.quadraticCurveTo(x0 + 104, y0 + 186, x0 + 96, y0 + 170); c.stroke();
        c.fillStyle = L('#3e5a2e'); ellipse(c, x0 + 100, y0 + 182, 7, 3.5, -0.6); c.fill(); ellipse(c, x0 + 92, y0 + 172, 6, 3, 0.4); c.fill(); c.fillStyle = L('#c8303a'); c.beginPath(); c.arc(x0 + 96, y0 + 166, 6, 0, TAU); c.fill(); c.fillStyle = L('#f0d060'); c.beginPath(); c.arc(x0 + 96, y0 + 166, 2, 0, TAU); c.fill(); }
      { const x0 = 160, y0 = 80; const items = [['抹茶', '七〇〇'], ['煎茶', '五〇〇'], ['ほうじ茶', '五〇〇'], ['和菓子', '四〇〇']];
        c.fillStyle = L('#2a2420'); c.font = `400 13px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('お品書き', x0 + 46, y0 + 2);
        items.forEach(([n, p], i) => { const px = x0 + 8 + i * 24, py = y0 + 16; c.fillStyle = P.wood; c.fillRect(px, py, 20, 150); c.fillStyle = rgba('#000000', 0.1); c.fillRect(px + 16, py, 4, 150); c.fillStyle = L('#2a2420'); c.font = `400 13px ${JP_FONT}`; [...n].forEach((ch, k) => c.fillText(ch, px + 10, py + 14 + k * 16)); c.font = `400 9px ${JP_FONT}`; [...p].forEach((ch, k) => c.fillText(ch, px + 10, py + 104 + k * 11)); }); }
      // shoji screens behind the board (softened by the board zone)
      for (let g = 0; g < 3; g++) { const sx = 300 + g * 232, sy = 90; c.fillStyle = P.shoji; c.fillRect(sx, sy, 220, 540); c.strokeStyle = P.shojiF; c.lineWidth = 2; c.strokeRect(sx, sy, 220, 540); c.lineWidth = 1; for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(sx + i * 55, sy); c.lineTo(sx + i * 55, sy + 540); c.stroke(); } for (let j = 1; j < 9; j++) { c.beginPath(); c.moveTo(sx, sy + j * 60); c.lineTo(sx + 220, sy + j * 60); c.stroke(); } if (P.lanA > 0.3) { c.fillStyle = rgba('#ffd890', 0.12 * P.lanA); c.fillRect(sx, sy, 220, 540); } }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.postDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      // half-open shoji: the left panel slid across a third of the view, translucent paper in a wooden lattice
      const sw = (x1 - x0) * 0.34; c.fillStyle = rgba(P.shoji, 0.9); c.fillRect(x0, y0, sw, y1 - y0); c.strokeStyle = P.shojiF; c.lineWidth = 1.2; for (let i = 1; i < 3; i++) { c.beginPath(); c.moveTo(x0 + i * sw / 3, y0); c.lineTo(x0 + i * sw / 3, y1); c.stroke(); } for (let j = 1; j < 8; j++) { c.beginPath(); c.moveTo(x0, y0 + j * (y1 - y0) / 8); c.lineTo(x0 + sw, y0 + j * (y1 - y0) / 8); c.stroke(); }
      c.fillStyle = P.post; c.fillRect(x0 + sw - 3, y0, 6, y1 - y0); c.fillStyle = P.postDk; c.fillRect(x0 - 12, y1 - 4, x1 - x0 + 24, 14);
      // a bamboo sudare blind rolled half down at the top
      c.fillStyle = L('#c8a46a'); c.fillRect(x0, y0, x1 - x0, 34); c.strokeStyle = rgba('#8a6a3a', 0.7); c.lineWidth = 1; for (let j = 0; j < 9; j++) { c.beginPath(); c.moveTo(x0, y0 + 3 + j * 3.6); c.lineTo(x1, y0 + 3 + j * 3.6); c.stroke(); } c.fillStyle = L('#8a2a20'); c.fillRect(x0 + 30, y0 + 30, 4, 14); c.fillRect(x1 - 34, y0 + 30, 4, 14);
      // noren-style name board above
      c.fillStyle = P.postDk; roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 4); c.fill(); c.fillStyle = L('#f2e6c8'); c.font = `400 17px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('茶屋 · 庭', (x0 + x1) / 2, y0 - 34); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      // bamboo grove behind the garden wall
      for (let k = 0; k < 9; k++) { const bx = x0 + 6 + k * (w / 8.4) + Math.sin(t * 0.5 + k) * 2; c.fillStyle = k % 2 ? P.bamboo : P.bamboo2; c.fillRect(bx, y0, 8, 210); c.fillStyle = rgba('#000000', 0.18); for (let j = 0; j < 5; j++) c.fillRect(bx, y0 + 30 + j * 42, 8, 2);
        c.fillStyle = rgba(k % 2 ? P.bamboo2 : P.bamboo, 0.9); for (let j = 0; j < 3; j++) { const ly = y0 + 40 + j * 60 + k * 7 % 30; ellipse(c, bx + 14 + Math.sin(t + k + j) * 2, ly, 12, 3, 0.4); c.fill(); ellipse(c, bx - 6, ly + 10, 10, 2.6, -0.4); c.fill(); } }
      // the tsuiji wall with its tiled cap
      c.fillStyle = P.tsuiji; c.fillRect(x0, y0 + 150, w, 70); c.fillStyle = P.roof; c.fillRect(x0 - 4, y0 + 140, w + 8, 14); c.fillStyle = rgba('#000000', 0.15); for (let k = 0; k < 24; k++) c.fillRect(x0 + k * 10, y0 + 140, 2, 14); for (const lx of [0.2, 0.5, 0.8]) { c.fillStyle = rgba('#ffffff', 0.4); c.fillRect(x0 + w * lx - 12, y0 + 168, 24, 3); }
      // moss ground, raked gravel ripples, stepping stones
      c.fillStyle = P.moss; c.fillRect(x0, y0 + 220, w, hh - 220); c.fillStyle = P.gravel; c.fillRect(x0, y0 + 270, w, hh - 270); c.strokeStyle = P.gravel2; c.lineWidth = 1.4; for (let j = 0; j < 12; j++) { c.beginPath(); c.moveTo(x0, y0 + 278 + j * 7); for (let q = 0; q <= 20; q++) c.lineTo(x0 + q * w / 20, y0 + 278 + j * 7 + Math.sin(q * 0.7 + j * 0.3) * 1.5); c.stroke(); }
      c.fillStyle = P.moss2; ellipse(c, x0 + w * 0.3, y0 + 268, 50, 14); c.fill(); ellipse(c, x0 + w * 0.75, y0 + 262, 40, 12); c.fill(); for (const [sx, sy] of [[0.5, 300], [0.62, 322], [0.48, 344]]) { c.fillStyle = P.stone; ellipse(c, x0 + w * sx, y0 + sy, 16, 6); c.fill(); c.fillStyle = rgba('#ffffff', 0.2); ellipse(c, x0 + w * sx - 4, y0 + sy - 2, 7, 2); c.fill(); }
      // koi pond lower right
      { const px = x0 + w * 0.72, py = y0 + 316; c.fillStyle = P.pond; ellipse(c, px, py, 46, 16); c.fill(); c.fillStyle = rgba(P.pond2, 0.5); ellipse(c, px - 10, py - 4, 24, 5); c.fill();
        for (let k = 0; k < 2; k++) { const a = t * (0.5 + k * 0.2) + k * 3, kx = px + Math.cos(a) * 30, ky = py + Math.sin(a) * 8; c.fillStyle = L(k ? '#f4f0e6' : '#e8742e'); ellipse(c, kx, ky, 6, 2.4, a + Math.PI / 2); c.fill(); if (k) { c.fillStyle = L('#e8742e'); c.beginPath(); c.arc(kx, ky, 1.6, 0, TAU); c.fill(); } } }
      // shishi-odoshi: the bamboo tube fills, tips, knocks the stone
      { const bx = x0 + w * 0.9, by = y0 + 300, tip = shishi > 0 ? Math.min(1, shishi * 5) * (shishi < 0.6 ? 1 : Math.max(0, 1 - (shishi - 0.6))) : Math.min(0.25, shishiT / 56), ang = -0.35 + tip * 0.75;
        c.fillStyle = L('#7a5a3a'); c.fillRect(bx - 2, by - 6, 4, 22); c.fillStyle = P.stone2; ellipse(c, bx - 22, by + 16, 9, 4); c.fill();
        c.save(); c.translate(bx, by - 4); c.rotate(ang); c.fillStyle = L('#b8a860'); c.fillRect(-32, -4, 48, 8); c.fillStyle = L('#8a7a3a'); c.fillRect(-33, -4, 3, 8); c.fillStyle = rgba('#000000', 0.2); c.fillRect(-10, -3, 2, 6); c.restore();
        c.fillStyle = L('#a89850'); c.fillRect(bx + 16, by - 30, 4, 34); c.fillRect(bx + 2, by - 30, 16, 4); if (knockFx > 0) { c.strokeStyle = rgba('#ffffff', knockFx * 0.7); c.lineWidth = 1.5; for (let r = 0; r < 2; r++) { c.beginPath(); c.arc(bx - 22, by + 12, 6 + (1 - knockFx) * 18 + r * 6, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); } } }
      // stone lantern (tōrō), lit from dusk
      { const lx = x0 + w * 0.5, ly = y0 + 214; c.fillStyle = P.stone2; c.fillRect(lx - 4, ly + 40, 8, 40); c.fillStyle = P.stone; c.fillRect(lx - 14, ly + 32, 28, 8); c.fillRect(lx - 10, ly + 14, 20, 18); K0(c, [lx - 20, ly + 14, lx + 20, ly + 14, lx + 8, ly + 2, lx - 8, ly + 2]); c.fill(); c.beginPath(); c.arc(lx, ly + 1, 4, 0, TAU); c.fill(); c.fillStyle = P.stone2; c.fillRect(lx - 16, ly + 78, 32, 6);
        c.fillStyle = n > 0.2 || P.lanA > 0.3 ? rgba('#ffd890', 0.4 + 0.6 * P.lanA) : rgba('#3a3630', 0.8); c.fillRect(lx - 5, ly + 18, 10, 10); if (P.lanA > 0.3) K.glow(c, lx, ly + 23, 46, '#ffd090', 0.4 * P.lanA); }
      // the red maple leaning in from the right, leaves drifting down
      { const tx = x1 + 6; c.strokeStyle = P.trunk; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(tx, y0 + 260); c.quadraticCurveTo(tx - 20, y0 + 160, tx - 70, y0 + 100); c.stroke(); c.lineWidth = 4; c.beginPath(); c.moveTo(tx - 30, y0 + 160); c.quadraticCurveTo(tx - 60, y0 + 150, tx - 110, y0 + 130); c.stroke();
        for (let k = 0; k < 70; k++) { const a = k * 2.399, d = Math.sqrt((k + 0.5) / 70), cx = tx - 80 + Math.cos(a) * d * 78, cy = y0 + 104 + Math.sin(a) * d * 52 + Math.sin(t * 0.8 + k) * 1.2; if (cx < x0 + w * 0.36) continue; c.fillStyle = k % 3 === 0 ? P.maple2 : k % 3 === 1 ? P.maple : rgba(P.maple, 0.75); c.save(); c.translate(cx, cy); c.rotate(k); K0(c, [0, -8, 2.6, -2.4, 8, -2.4, 3.4, 1.6, 5, 7.6, 0, 4.4, -5, 7.6, -3.4, 1.6, -8, -2.4, -2.6, -2.4]); c.fill(); c.restore(); } // star-shaped maple leaves, bamboo showing between
        for (let k = 0; k < 6; k++) { const ph = (t * 0.07 + k * 0.17) % 1, lx = tx - 40 - k * 22 + Math.sin(t * 1.3 + k) * 14, ly = y0 + 120 + ph * (hh - 120); c.fillStyle = rgba(k % 2 ? P.maple : P.maple2, 1 - ph * 0.5); c.save(); c.translate(lx, ly); c.rotate(t * 2 + k); K0(c, [0, -3.5, 1.2, -1, 3.5, -1, 1.5, 1, 2.2, 3.5, 0, 2, -2.2, 3.5, -1.5, 1, -3.5, -1, -1.2, -1]); c.fill(); c.restore(); } }
      if (n > 0.5) { c.fillStyle = rgba('#f4ecd8', 0.9); c.beginPath(); c.arc(x0 + w * 0.6, y0 + 50, 11, 0, TAU); c.fill(); K.glow(c, x0 + w * 0.6, y0 + 50, 40, '#f4ecd8', 0.25); }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let i = 0; i < 9; i++) { const fx = -60 + i * 180; c.fillStyle = i % 2 ? P.tatami : P.tatami2; c.fillRect(fx, 642, 180, 100); c.fillStyle = P.heri; c.fillRect(fx, 642, 180, 4); c.fillRect(fx, 642, 4, 100); c.strokeStyle = rgba('#000000', 0.06); c.lineWidth = 1; for (let k = 1; k < 16; k++) { c.beginPath(); c.moveTo(fx + 4, 646 + k * 6); c.lineTo(fx + 180, 646 + k * 6); c.stroke(); } } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // back shelf: tea caddies and bowls
      { const sy = top - 104; c.fillStyle = P.woodDk; c.fillRect(-10, sy + 30, 140, 6); [['#2a1410', 'n'], ['#5e6e3a', 'b'], ['#c8b490', 'b'], ['#2a1410', 'n'], ['#8a5a34', 'b']].forEach(([col, k], i) => { const bx = 10 + i * 24; c.fillStyle = L(col); if (k === 'n') { roundRect(c, bx - 7, sy + 12, 14, 18, 4); c.fill(); c.fillStyle = L('#c8a050'); c.fillRect(bx - 7, sy + 18, 14, 1.5); } else { c.beginPath(); c.moveTo(bx - 9, sy + 20); c.quadraticCurveTo(bx - 9, sy + 30, bx, sy + 30); c.quadraticCurveTo(bx + 9, sy + 30, bx + 9, sy + 20); c.closePath(); c.fill(); } }); }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // brazier + iron kama (steam), water jar, the bowl and whisk stand, the wagashi case, a small hand bell
      { const kx = 40, ky = top - 6; c.fillStyle = L('#3a2a20'); roundRect(c, kx - 18, ky - 16, 36, 16, 3); c.fill(); c.fillStyle = L('#e8702e'); c.fillRect(kx - 10, ky - 8, 20, 3); c.fillStyle = P.iron; c.beginPath(); c.arc(kx, ky - 26, 15, Math.PI * 0.9, Math.PI * 2.1); c.fill(); c.fillRect(kx - 15, ky - 26, 30, 10); c.fillStyle = rgba('#ffffff', 0.12); for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(kx - 10 + (k % 4) * 6, ky - 30 + Math.floor(k / 4) * 6, 1.2, 0, TAU); c.fill(); } c.fillStyle = L('#2a2624'); c.fillRect(kx - 8, ky - 42, 16, 4); c.fillRect(kx - 2, ky - 46, 4, 4);
        const st = 0.25 + kama * 0.75; for (let k = 0; k < 3; k++) { const ph = (t * 0.4 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', st * 0.4 * (1 - ph)); c.beginPath(); c.arc(kx + Math.sin(t + k) * 5, ky - 50 - ph * (24 + kama * 26), 4 + ph * 9, 0, TAU); c.fill(); } }
      { const bx = 104, by = top - 6; c.fillStyle = L('#2a1e18'); c.beginPath(); c.moveTo(bx - 12, by - 13); c.quadraticCurveTo(bx - 12, by, bx, by); c.quadraticCurveTo(bx + 12, by, bx + 12, by - 13); c.closePath(); c.fill(); c.fillStyle = L(whisk > 0.2 ? '#a8c070' : '#6e8e34'); ellipse(c, bx, by - 13, 11, 2.6); c.fill(); if (whisk > 0) { c.fillStyle = rgba('#e8f4c8', 0.6 * whisk); for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(bx - 6 + k * 3, by - 14 + Math.sin(t * 30 + k) * 0.6, 1.2, 0, TAU); c.fill(); } }
        c.fillStyle = L('#e8d4a0'); c.fillRect(bx + 20, by - 18, 3, 18); c.beginPath(); c.arc(bx + 21.5, by - 20, 4, 0, TAU); c.fill(); }
      { const wx = 168, wy = top - 6; c.fillStyle = L('#3a2418'); c.fillRect(wx - 26, wy - 4, 52, 4); c.fillStyle = 'rgba(230,240,240,0.42)'; c.fillRect(wx - 24, wy - 34, 48, 30); c.strokeStyle = L('#5a4030'); c.lineWidth = 1.5; c.strokeRect(wx - 24, wy - 34, 48, 30);
        [['#f2bcc4', 'r'], ['#b89ad0', 'f'], ['#f2eee6', 'r'], ['#5a1c20', 's'], ['#c08040', 'r'], ['#b8cc84', 'r']].forEach(([col, k], i) => { const ix = wx - 16 + (i % 3) * 16, iy = wy - 22 + Math.floor(i / 3) * 13; c.fillStyle = L('#f4ecdc'); ellipse(c, ix, iy + 4, 6, 1.6); c.fill(); c.fillStyle = L(col); if (k === 's') c.fillRect(ix - 5, iy - 3, 10, 6); else { c.beginPath(); c.arc(ix, iy + 2, 4.6, Math.PI, TAU); c.fill(); c.fillRect(ix - 4.6, iy + 1, 9.2, 2); } });
        c.fillStyle = 'rgba(255,255,255,0.35)'; K0(c, [wx - 24, wy - 34, wx - 12, wy - 34, wx - 20, wy - 4, wx - 24, wy - 4]); c.fill(); }
      { const hx = 222, hy = top - 6; c.fillStyle = L('#c8a050'); c.beginPath(); c.arc(hx, hy - 6, 6, Math.PI, TAU); c.fill(); c.fillRect(hx - 6, hy - 6, 12, 2); c.fillStyle = L('#3a2418'); c.fillRect(hx - 1, hy - 16, 2, 5); }
      // counter front: dark lacquer panels with a thin vermilion line, a noren hanging from the end
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.lacqR; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, 3);
      for (let i = 0; i < 4; i++) { c.fillStyle = rgba('#ffffff', 0.05); c.fillRect(x0 + 10 + i * 58, top + 20, 48, 110); c.strokeStyle = rgba(P.wood, 0.4); c.lineWidth = 1; c.strokeRect(x0 + 10 + i * 58, top + 20, 48, 110); }
      c.fillStyle = L('#f2e6c8'); c.font = `400 16px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('一服', (x0 + x1) / 2, top + 75);
    },
    events: [
      { name: 'shishi-odoshi', dur: 6, start(X, srv, mk) { const K = X.K; shishi = 0.001; shishiT = 0; knockFx = 1; K.after(0.25, () => { K.say(mk, 'icon:knock', 1.2); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: K.simT + 2.5 }; if (Math.random() < 0.5) K.say(c, pick(['…', 'icon:note', 'Kon!']), 1.2); } }); K.after(2.4, () => K.say(srv, 'The garden says hello', 1.4)); } },
      { name: 'ceremony', dur: 10, start(X, srv, mk) { const K = X.K; whisk = 1; kama = 1; K.say(mk, 'Otemae chōdai…', 1.6); const g = K.actors.filter((q) => q.cust); const guest = g[0];
        K.after(1.8, () => { if (guest) K.say(guest, 'Otemae chōdai itashimasu', 1.8); }); K.after(4, () => { if (guest) K.say(guest, '↻ ↻', 1.2); }); K.after(5.6, () => { if (guest) K.say(guest, 'icon:tea', 1.2); });
        K.after(7.2, () => { K.say(srv, 'icon:heart', 1.2); for (const c of g) if (Math.random() < 0.7) K.say(c, pick(['Kekkō na otemae', 'icon:star', '…beautiful']), 1.4); }); } },
    ],
  };
  registerStage('teahouse', makeGeoCafe(W));
})();
