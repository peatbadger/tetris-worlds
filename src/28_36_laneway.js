/* ================= NEW WORLD · Melbourne Laneway Cafe — GEOMETRIC edition (an imagined hole-in-the-wall; no real brands) =================
   A specialty-coffee hole-in-the-wall in a bluestone laneway. Jono (beanie, flannel) dials in the grinder, steams milk
   and pours tulips; Priya runs brunch plates and calls names. Wall: exposed brick under geometric street-art murals, a
   chalk menu (flat white / long black / magic / smashed avo / lamington), Edison bulbs, plants in old tins, milk crates.
   Counter: a three-group chrome espresso machine, a grinder with its hopper, the pastry dome of lamingtons and sausage
   rolls, a tip jar, the knock box. Window: the lane: bluestone cobbles, a mural wall opposite, a tram crossing the end of
   the lane, a bike courier, a busker, umbrellas. Signatures: LATTE ART (a swan is poured and every phone comes out) ·
   FOUR SEASONS IN ONE DAY (a squall blows through, umbrellas up, then sun) · TRAM DING (a tram rattles past the lane
   mouth, bell ringing). Clock 06:30 -> 16:30, rain often, never snow. Blocks: vegemite toast · lamingtons · pavlova ·
   sausage rolls · smashed avo · eggs benny · flat white. */
(() => {
  WORLD_DEFS.push({
    id: 'laneway', name: 'Laneway Cafe', sub: 'Melbourne · a bluestone laneway, coffee at its best', thumbY: 0.42,
    desc: 'A Melbourne laneway coffee hole-in-the-wall: tulips poured in flat whites, smashed avo and lamingtons, street-art murals, trams dinging past and four seasons in one day. Jangly indie guitar.',
    accent: '#e0a040', accent2: '#4ab0a0', skin: 'laneway', particle: 'steam',
    boardBg: 'rgba(18,18,20,0.94)', grid: 'rgba(240,230,220,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 116, root: 59, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 4, 5, 3], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1300, gain: 0.012, detune: 5, voices: 3 },
      comp: { inst: 'nylon', pattern: E16('x.x..x.x..x.x.x.'), voices: 3, gain: 0.05, oct: 0 },
      arp: { inst: 'glass', pattern: [0, 4, 2, 5, 4, 2, 1, 2], every: 1, oct: 1, gain: 0.024, density: 0.5 },
      bass: { inst: 'upbass', pattern: E16('x.....x.x.......'), gain: 0.16, dec: 0.26 },
      drums: { kick: E16('x.......x.x.....'), snare: E16('....x.......x...'), hat: E16('x.x.x.x.x.x.x.x.'), hatGain: 0.35, extra: E16('..............x.'), extraInst: 'wood' },
      lead: { inst: 'vibes', gain: 0.032, density: 0.16, oct: 1 }, sfx: 'bell', clearFx: 'clink',
      amb: { chatter: 0.02, clink: 0.02 },
    },
  });
  const LwPal = GeoCafePal({
    day: { wall: '#9a5a44', wall2: '#82483a', mortar: '#c8b4a4', art1: '#e0a040', art2: '#4ab0a0', art3: '#e86a5a', art4: '#2a3a5a', chalk: '#2a2c2e', chalkInk: '#f4f0e6', wood: '#6a4a30', woodDk: '#3e2a18', ink: '#22201e',
      floor: '#5a5a5e', floor2: '#4a4a4e', cnt: '#d8d4cc', cnt2: '#2e2e32', steel: '#d0d4d8', sky0: '#a8c4dc', sky1: '#dce6ee', blue: '#5a5e66', blue2: '#4a4e56', mural: '#c8c0b0', tram: '#3a8a5a', road: '#626268', winA: 0.1, neonA: 0.2,
      lamp: '#fff0d0', glow: '#ffd8a0', glowA: 0.14, shaft: '#fff4e0', shaftA: 0.06, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#925440', wall2: '#7a4436', mortar: '#bca898', art1: '#d89a3a', art2: '#44a498', art3: '#dc6454', art4: '#283654', chalk: '#2a2c2e', chalkInk: '#f4f0e6', wood: '#644630', woodDk: '#3a2816', ink: '#22201e',
      floor: '#545458', floor2: '#444448', cnt: '#d0ccc4', cnt2: '#2c2c30', steel: '#c8ccd0', sky0: '#d89070', sky1: '#f0c8a0', blue: '#545058', blue2: '#44404a', mural: '#b8a898', tram: '#347e52', road: '#58545c', winA: 0.6, neonA: 0.6,
      lamp: '#ffe4bc', glow: '#ffcc90', glowA: 0.26, shaft: '#ffc898', shaftA: 0.06, amb: '#ffc8a0', ambK: 0.05, sun: '#ffa070', cloud: '#e8b8a8' },
    night: { wall: '#7a4636', wall2: '#663a2e', mortar: '#a8948a', art1: '#c08a36', art2: '#3a9086', art3: '#c45a4c', art4: '#24304c', chalk: '#262828', chalkInk: '#ece8de', wood: '#583e28', woodDk: '#342414', ink: '#22201e',
      floor: '#48484c', floor2: '#3a3a3e', cnt: '#c4c0b8', cnt2: '#28282c', steel: '#b4b8bc', sky0: '#141a2c', sky1: '#222c44', blue: '#34363e', blue2: '#2a2c34', mural: '#4a4650', tram: '#2a6a46', road: '#2c2c32', winA: 1, neonA: 1,
      lamp: '#ffdcae', glow: '#ffc488', glowA: 0.4, shaft: '#ffc890', shaftA: 0, amb: '#3a3456', ambK: 0.05, sun: '#f4ecd8', cloud: '#2a3040' },
  }, [[4, 'night'], [5.6, 'dusk'], [6.8, 'day'], [17, 'day'], [18.4, 'dusk'], [19.8, 'night'], [28, 'night']],
  (h) => { h = ((h % 24) + 24) % 24; return h < 9 ? 'Early coffee' : h < 11.5 ? 'Brunch' : h < 14 ? 'Lunch' : 'Arvo'; });
  const MENU = [{ n: 'Flat white', c: '#c89a6a', kind: 'coffee' }, { n: 'Long black', c: '#3a2010', kind: 'coffee' }, { n: 'Magic', c: '#b08050', kind: 'coffee' },
    { n: 'Smashed avo', c: '#7aa040', kind: 'plate' }, { n: 'Eggs benny', c: '#f0c848', kind: 'plate' }, { n: 'Lamington', c: '#5a3420', kind: 'pastry' }];
  let steamW = 0, grind = 0, swan = 0, squall = 0, tram = -1, tramBell = 0, knock = 0, busk = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'laneway', pal: LwPal, stationX: 46, srvX: 220, spots: [146, 330], maxCust: 2, crowd: 0.7, tagDx: 180, // Jono at the machine (72), Priya at the pass (220)
    startHour: 6.5, span: 10, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(24,18,16,0.26)', zone: 'rgba(30,26,24,0.26)',
    per: (h) => h < 9 ? 0 : h < 11.5 ? 1 : h < 14 ? 2 : 3,
    staff: [{ T: 214, hw: 54, headR: 27, pattern: 'apron', top: '#2a2a2e', top2: '#6a4a30', top3: '#f4f0e6', hairStyle: 'pony', hair: 'dark', pants: '#2a2a2e' },
      { T: 220, hw: 58, headR: 28, pattern: 'apron', top: '#8a2e2a', top2: '#4a3a2a', top3: '#e8dcc4', hairStyle: 'short', hair: 'brown', pants: '#2a3040', hat: 'beanie', hatCol: '#3a5a4a', beard: 1 }],
    menu: MENU, greet: ['Morning!', 'What can I get ya?', 'The usual?'], ack: ['Too easy', 'No worries', 'Coming right up'], handOff: ['There ya go', 'Enjoy!', 'Cheers, legend'],
    thanks: ['Cheers!', 'icon:heart', 'Ta!'], done: ['Best coffee in town', 'icon:heart', 'See ya!'], cheer: ['Legend!', 'icon:star', 'Ripper!'],
    types: {
      officeblack: { body: { T: 218, hw: 54, pattern: 'coat', top: 'dark', shirt: 'white', hairStyle: 'bob', hair: 'dark', pants: 'dark', coat: 0.6 }, words: ['Large oat flat white', 'Running late…'] },
      hipster: { body: { T: 222, hw: 58, pattern: 'jacket', top: 'olive', shirt: 'cream', hat: 'beanie', hatCol: 'mustard', hairStyle: 'short', hair: 'brown', beard: 1, glasses: 1, pants: 'navy' }, words: ['What’s the single origin?', 'Ethiopian, washed?'] },
      tradie: { body: { T: 224, hw: 64, pattern: 'hivis', top: 'navy', hairStyle: 'short', hair: 'hairGrey', pants: 'navy' }, words: ['Two large caps, mate', 'Sausage roll too'] },
      student: { body: { T: 210, hw: 52, pattern: 'hoodie', top: 'teal', hairStyle: 'long', hair: 'dark', pants: 'navy', backpack: 1, packCol: 'coral' }, words: ['Magic, please', 'Lecture in ten'] },
      tourist: { body: { pattern: 'tee', top: 'coral', hat: 'bucket', hatCol: 'cream', hairStyle: 'short', camera: 1, pants: 'brown' }, words: ['Is this the famous laneway?', 'What’s a magic?'] },
      nan: { body: { T: 200, hw: 56, pattern: 'cardigan', top: 'plum', top2: 'cream', hairStyle: 'bun', hair: 'hairGrey', glasses: 1, skirt: 'grey' }, words: ['A pot of tea, love', 'And a lamington'] },
    },
    parties: [{ m: ['officeblack'], w: [4, 2, 2, 1] }, { m: ['hipster'], w: [1, 3, 2, 3] }, { m: ['tradie', 'tradie'], w: [4, 1, 2, 1] }, { m: ['student'], w: [2, 2, 2, 3] }, { m: ['tourist'], w: [1, 2, 3, 2] }, { m: ['nan'], w: [1, 2, 1, 3] }],
    sim(X, dt) { steamW = Math.max(0, steamW - dt * 0.6); grind = Math.max(0, grind - dt * 1.2); swan = Math.max(0, swan - dt * 0.16); squall = Math.max(0, squall - dt * 0.09); tramBell = Math.max(0, tramBell - dt * 0.8); knock = Math.max(0, knock - dt * 3); busk += dt;
      if (tram >= 0) { tram += dt * 0.22; if (tram > 1) tram = -1; } else if (Math.random() < dt / 40) tram = 0; },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'coffee') { ph.push(K.ph(0.8, (s, u) => { grind = 1; s.f = -1; s.tgN = [30, CNT.top - 54]; s.leanT = 0.06; it.o.frac = u * 0.2; s.look = { x: () => 30, until: K.simT + 0.3 }; }, { exit: () => { knock = 1; } }));
        ph.push(K.ph(1.0, (s, u) => { s.f = 1; s.tgN = [84, CNT.top - 40]; s.leanT = 0.08; it.o.frac = 0.2 + u * 0.3; s.look = { x: () => 84, until: K.simT + 0.3 }; }));
        if (m.n !== 'Long black') ph.push(K.ph(1.2, (s, u, t) => { steamW = 1; s.hold.N = H.tool('jug'); s.f = 1; s.tgN = [110 + Math.sin(t * 8) * 3, CNT.top - 36 + Math.sin(u * Math.PI) * -8]; it.o.frac = 0.5 + u * 0.35; s.look = { x: () => 110, until: K.simT + 0.3 }; if (Math.random() < 0.08) K.fx('puff', 110, CNT.top - 50, { life: 0.8, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } })); }
      else if (m.kind === 'plate') ph.push(K.ph(1.6, (s, u, t) => { s.hold.N = H.tool('spatula'); s.f = 1; s.tgN = [130 + Math.sin(t * 4) * 8, CNT.top - 20]; s.leanT = 0.16; it.o.frac = u * 0.85; s.look = { x: () => 130, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else ph.push(K.ph(1.2, (s, u) => { s.hold.N = H.tool('tongs'); s.f = 1; s.tgN = [168, CNT.top - 26]; s.leanT = 0.1; it.o.frac = u * 0.85; s.look = { x: () => 168, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 34, CNT.top - 22]; s.tgF = [ST.x + 46, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT, r = Math.random();
      if (r < 0.4) return K.start(a, 'dialin', [K.ph(rand(2, 3), (s, u, t) => { grind = Math.max(grind, 0.6); s.f = -1; s.tgN = [30, CNT.top - 54]; s.look = { x: () => 30, until: K.simT + 0.3 }; }, { exit: () => K.say(a, pick(['18 grams in…', '36 out. Perfect.', 'Bit sour, tighten it']), 1.2) })]);
      if (r < 0.7) return K.start(a, 'knock', [K.ph(1.2, (s, u, t) => { knock = Math.sin(t * 16) > 0.6 ? 1 : knock; s.f = 1; s.tgN = [70, CNT.top - 10 - Math.abs(Math.sin(t * 8)) * 6]; s.look = { x: () => 70, until: K.simT + 0.3 }; })]);
      return K.start(a, 'taste', [K.ph(1.6, (s, u) => { s.f = 1; s.tgN = u < 0.5 ? [84, CNT.top - 40] : [s.R.cx - 6, s.R.cy + 6]; s.look = { x: () => 84, until: K.simT + 0.3 }; }, { exit: () => K.say(a, pick(['Mm. Stone fruit.', 'Chocolatey. Nice.', 'icon:heart']), 1.1) })]); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.5) return K.start(a, 'callname', [K.ph(1.4, (s, u) => { s.tgN = [228, CNT.top - 44]; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Large flat white for Sam?', 'Benny for Jess!', 'Oat magic?']), 1.3) })]);
      return K.start(a, 'wipe', [K.ph(rand(2, 3), (s, u, t) => { s.f = -1; s.tgN = [200 + Math.sin(t * 5) * 18, CNT.top - 8]; s.leanT = 0.2; s.look = { x: () => 200, until: K.simT + 0.3 }; })]); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'jug') { c.fillStyle = L('#d0d4d8'); K0(c, [x - 5 * s, y - 12 * s, x + 5 * s, y - 12 * s, x + 6 * s, y, x - 6 * s, y]); c.fill(); K0(c, [x + 5 * s, y - 12 * s, x + 9 * s, y - 14 * s, x + 5 * s, y - 9 * s]); c.fill(); }
      else if (k === 'spatula') { c.strokeStyle = L('#2a2a2e'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 10 * s, y - 6 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.fillRect(x + 9 * s, y - 10 * s, 7 * s, 6 * s); }
      else if (k === 'tongs') { c.strokeStyle = L('#c8ccd2'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 14 * s, y - 8 * s); c.moveTo(x, y); c.lineTo(x + 14 * s, y - 4 * s); c.stroke(); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'coffee') { const tk = m.n === 'Long black'; c.fillStyle = L(tk ? '#2a2a2e' : '#f4f0e6'); K0(c, [-5, -12, 5, -12, 4, 0, -4, 0]); c.fill(); if (frac > 0.3) { c.fillStyle = L(m.n === 'Long black' ? '#3a2010' : '#c89a6a'); ellipse(c, 0, -12, 5, 1.4); c.fill(); } if (frac > 0.75 && !tk) { c.fillStyle = L('#f4eee4'); ellipse(c, 0, -12, 2.4, 0.8); c.fill(); } c.fillStyle = L('#c8b8a0'); ellipse(c, 0, 0.5, 8, 1.6); c.fill(); }
      else if (m.kind === 'plate') { c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -1, 13, 3); c.fill(); if (frac > 0.3) { c.fillStyle = L('#d8b070'); roundRect(c, -9, -5, 12, 4, 1.5); c.fill(); } if (frac > 0.6) { c.fillStyle = L(m.c); ellipse(c, -3, -6, 5, 2.2); c.fill(); } if (frac > 0.85) { c.fillStyle = L('#c8301e'); c.fillRect(2, -7, 1.4, 1.4); c.fillStyle = L('#4a8a2a'); ellipse(c, 7, -3, 3, 1.4); c.fill(); } }
      else { c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -1, 9, 2.2); c.fill(); if (frac > 0.4) { c.fillStyle = L(m.c); c.fillRect(-5, -9, 10, 8); c.fillStyle = L('#fbf6ec'); for (let i = 0; i < 8; i++) c.fillRect(-5 + (i * 3) % 10, -9 + (i * 5) % 8, 1, 1); } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.laneway = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L, top = X.CNT.top;
      c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660); c.fillStyle = P.mortar;
      for (let r = 0; r < 34; r++) { c.globalAlpha = 0.35; c.fillRect(-60, r * 20, 1400, 2); for (let k = 0; k < 30; k++) c.fillRect(-60 + k * 48 + (r % 2) * 24, r * 20, 2, 20); } c.globalAlpha = 1;
      for (let r = 0; r < 14; r++) for (let k = 0; k < 12; k++) if ((r * 7 + k * 3) % 5 === 0) { c.fillStyle = rgba(P.wall2, 0.6); c.fillRect(-60 + k * 120 + (r % 2) * 24, r * 40 + 2, 46, 18); } // brick tone variation
      // geometric street-art mural over the bricks (behind the board and both sides)
      { c.globalAlpha = 0.9; c.fillStyle = P.art4; K0(c, [270, 40, 620, 40, 560, 300, 300, 260]); c.fill(); c.fillStyle = P.art1; c.beginPath(); c.arc(420, 150, 70, 0, TAU); c.fill(); c.fillStyle = P.art3; K0(c, [360, 220, 520, 120, 560, 260]); c.fill(); c.fillStyle = P.art2; K0(c, [640, 60, 980, 40, 1000, 200, 700, 240]); c.fill(); c.fillStyle = '#f4f0e6'; for (let q = 0; q < 6; q++) { c.fillRect(700 + q * 46, 90 + q * 14, 30, 6); } c.fillStyle = P.art1; K0(c, [780, 160, 900, 120, 940, 230, 800, 240]); c.fill(); c.globalAlpha = 1;
        c.strokeStyle = '#f4f0e6'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(1040, 120); c.quadraticCurveTo(1100, 60, 1160, 120); c.quadraticCurveTo(1200, 160, 1240, 110); c.stroke(); c.lineCap = 'butt'; }
      // the chalk menu
      { const x0 = 18, y0 = 54; c.fillStyle = P.woodDk; c.fillRect(x0 - 6, y0 - 6, 250, 172); c.fillStyle = P.chalk; c.fillRect(x0, y0, 238, 160); c.fillStyle = P.chalkInk; c.font = '800 16px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('COFFEE · BRUNCH', x0 + 119, y0 + 20);
        const it = [['Flat white', '5.0'], ['Long black', '4.5'], ['Magic', '5.2'], ['Smashed avo', '22'], ['Eggs benny', '24'], ['Lamington', '6']];
        it.forEach(([n, p], i) => { const yy = y0 + 44 + i * 19; c.font = '600 13px "Trebuchet MS", sans-serif'; c.textAlign = 'left'; c.fillText(n, x0 + 16, yy); c.textAlign = 'right'; c.fillText(p, x0 + 222, yy); }); c.fillStyle = rgba(P.chalkInk, 0.3); c.fillRect(x0 + 16, y0 + 32, 206, 1.4); c.fillStyle = rgba('#ffffff', 0.05); c.fillRect(x0 + 10, y0 + 100, 120, 40); }
      // the grinder's shelf above the staff: plants in old tins, bags of beans
      { const sy = top - 150; c.fillStyle = P.wood; c.fillRect(14, sy + 30, 240, 6); for (let k = 0; k < 3; k++) { c.fillStyle = L(['#c8ccd0', '#d8a050', '#c8ccd0'][k]); c.fillRect(24 + k * 30, sy + 10, 18, 20); c.fillStyle = L('#4a8a3a'); for (let q = 0; q < 5; q++) { c.beginPath(); c.ellipse(33 + k * 30 + (q - 2) * 4, sy + 6 - Math.abs(q - 2) * -2, 3, 9, (q - 2) * 0.4, 0, TAU); c.fill(); } }
        for (let k = 0; k < 4; k++) { c.fillStyle = L(['#c8a878', '#2a2a2e', '#b8846a', '#e8dcc4'][k]); roundRect(c, 130 + k * 28, sy + 4, 22, 26, 3); c.fill(); c.fillStyle = L(k === 1 ? '#e0a040' : '#2a2a2e'); c.fillRect(134 + k * 28, sy + 14, 14, 6); } }
      for (const bx of [292, 1004]) for (let q = 0; q < 2; q++) { const lx = bx + q * 24, ly = 120 + q * 20 + Math.sin(t * 0.8 + q) * 1.5; c.strokeStyle = P.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(lx, 0); c.lineTo(lx, ly); c.stroke(); c.fillStyle = rgba('#ffd890', 0.9); ellipse(c, lx, ly + 7, 5, 8); c.fill(); c.strokeStyle = rgba('#a86a20', 0.8); c.beginPath(); c.moveTo(lx - 2, ly + 4); c.lineTo(lx, ly + 10); c.lineTo(lx + 2, ly + 4); c.stroke(); K.glow(c, lx, ly + 8, 60, P.glow, P.glowA + 0.08); } // Edison bulbs
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.cnt2; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = P.cnt2; c.fillRect(x0 + (x1 - x0) / 2 - 3, y0, 6, y1 - y0); c.fillStyle = 'rgba(255,255,255,0.1)'; K0(c, [x0 + 20, y0, x0 + 60, y0, x0 + 10, y1, x0 - 30, y1]); c.fill();
      c.fillStyle = P.cnt2; roundRect(c, x0 - 4, y0 - 50, x1 - x0 + 8, 34, 4); c.fill(); c.fillStyle = P.art1; c.font = '900 17px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SPECIALTY COFFEE', (x0 + x1) / 2, y0 - 33);
      c.fillStyle = rgba('#f4f0e6', 0.9); c.font = '800 12px "Trebuchet MS", sans-serif'; c.fillText('OPEN 6:30 · TAKEAWAY WINDOW', (x0 + x1) / 2, y1 - 14); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night, sq = squall;
      c.fillStyle = P.sky0; c.fillRect(x0, y0, w, 120); if (sq > 0) { c.fillStyle = rgba('#5a6070', 0.6 * Math.min(1, sq * 2)); c.fillRect(x0, y0, w, 120); }
      { const tx = x0 + w * 0.5, tw = w * 0.34; c.fillStyle = rgba(P.sky1, 0.6); c.fillRect(tx - tw / 2, y0 + 120, tw, 150); // the lane mouth: a slice of the street beyond
        c.fillStyle = P.blue2; c.fillRect(tx - tw / 2, y0 + 140, tw, 130); for (let k = 0; k < 4; k++) { c.fillStyle = rgba('#ffe4b0', 0.15 + 0.6 * P.winA * (k % 2)); c.fillRect(tx - tw / 2 + 8 + k * tw / 4, y0 + 150, tw / 4 - 14, 14); }
        if (tram >= 0) { const px = tx - tw / 2 - 90 + tram * (tw + 180); c.save(); c.beginPath(); c.rect(tx - tw / 2, y0, tw, hh); c.clip(); c.fillStyle = L(P.tram); roundRect(c, px - 60, y0 + 190, 120, 54, 6); c.fill(); c.fillStyle = L('#e8c040'); c.fillRect(px - 60, y0 + 228, 120, 6); c.fillStyle = rgba('#e8f0f4', 0.85); for (let q = 0; q < 5; q++) c.fillRect(px - 54 + q * 22, y0 + 198, 16, 20); c.strokeStyle = P.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(px, y0 + 190); c.lineTo(px + 10, y0 + 150); c.stroke(); c.restore(); }
        c.strokeStyle = rgba(P.ink, 0.8); c.lineWidth = 1; c.beginPath(); c.moveTo(tx - tw / 2, y0 + 148); c.lineTo(tx + tw / 2, y0 + 148); c.stroke(); }
      for (const [sx, ww] of [[x0, w * 0.33], [x0 + w * 0.67, w * 0.33]]) { c.fillStyle = P.mural; c.fillRect(sx, y0 + 40, ww, 260); // the lane walls covered in paste-ups and pieces
        c.fillStyle = P.art3; K0(c, [sx + 6, y0 + 100, sx + ww - 10, y0 + 80, sx + ww - 20, y0 + 160, sx + 10, y0 + 180]); c.fill(); c.fillStyle = P.art2; c.beginPath(); c.arc(sx + ww * 0.5, y0 + 220, ww * 0.26, 0, TAU); c.fill(); c.fillStyle = P.art1; K0(c, [sx + 10, y0 + 260, sx + ww * 0.6, y0 + 240, sx + ww * 0.4, y0 + 290]); c.fill();
        c.fillStyle = rgba('#f4f0e6', 0.7); for (let q = 0; q < 4; q++) c.fillRect(sx + 12 + q * 18, y0 + 60 + (q % 2) * 6, 14, 18); }
      c.fillStyle = P.blue; c.fillRect(x0, y0 + 290, w, hh - 290); c.fillStyle = rgba('#000000', 0.18); for (let r = 0; r < 4; r++) for (let k = 0; k < 10; k++) c.fillRect(x0 + k * 28 + (r % 2) * 14, y0 + 294 + r * 14, 26, 2); c.fillRect(x0 + w * 0.5 - 2, y0 + 290, 4, hh - 290); // bluestone + the drain
      { const bx = x0 + w * 0.16, by = y0 + 330; c.fillStyle = L('#3a3a42'); c.fillRect(bx - 6, by - 24, 12, 22); c.fillStyle = L('#d8b890'); c.beginPath(); c.arc(bx, by - 30, 6, 0, TAU); c.fill(); c.fillStyle = L('#c8843a'); c.save(); c.translate(bx + 6, by - 14); c.rotate(-0.5 + Math.sin(busk * 8) * 0.06); roundRect(c, -4, -6, 20, 10, 4); c.fill(); c.restore(); c.fillStyle = L('#2a2a2e'); c.fillRect(bx - 18, by - 2, 14, 6); for (let q = 0; q < 2; q++) { const ph = (busk * 0.5 + q * 0.5) % 1; c.fillStyle = rgba('#f4f0e6', 0.8 * (1 - ph)); c.font = '800 12px sans-serif'; c.fillText('♪', bx + 16 + ph * 20, by - 40 - ph * 30); } } // the busker
      { const cx = x0 + ((t * 70) % (w + 80)) - 40, cy = y0 + 336; c.strokeStyle = L('#2a2a30'); c.lineWidth = 1.6; c.beginPath(); c.arc(cx - 10, cy, 7, 0, TAU); c.arc(cx + 12, cy, 7, 0, TAU); c.stroke(); c.fillStyle = L('#e86a5a'); c.fillRect(cx - 4, cy - 26, 8, 14); c.fillStyle = L('#f0c040'); c.fillRect(cx - 12, cy - 24, 10, 12); c.fillStyle = L('#2a2a30'); c.beginPath(); c.arc(cx, cy - 30, 5.4, 0, TAU); c.fill(); } // a bike courier with a bag
      if (sq > 0.05) { c.strokeStyle = rgba('#c8d4e0', 0.5 * Math.min(1, sq * 2)); c.lineWidth = 1; for (let q = 0; q < 60; q++) { const rx = x0 + ((q * 53 + t * 260) % w), ry = y0 + ((q * 37 + t * 600) % hh); c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx - 6, ry + 14); c.stroke(); } // the squall
        for (let q = 0; q < 2; q++) { const ux = x0 + w * (0.3 + q * 0.35) + Math.sin(t + q) * 8, uy = y0 + 300; c.fillStyle = L(q ? '#2a2a2e' : '#e0a040'); c.beginPath(); c.arc(ux, uy, 18, Math.PI, TAU); c.fill(); c.strokeStyle = L('#2a2a2e'); c.beginPath(); c.moveTo(ux, uy); c.lineTo(ux, uy + 20); c.stroke(); } }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; c.fillStyle = P.floor; c.fillRect(-60, 642, 1400, 120); for (let i = 0; i < 90; i++) { c.fillStyle = rgba(i % 3 ? P.floor2 : '#8a8a8e', 0.5); c.fillRect(-60 + (i * 97) % 1400, 646 + (i * 41) % 100, 4, 2); } // polished concrete
      for (const mx of [1080, 1160]) { c.fillStyle = X.L(mx > 1100 ? '#2a5a8a' : '#c8302e'); c.fillRect(mx, 690, 46, 34); c.fillStyle = 'rgba(0,0,0,0.25)'; for (let q = 0; q < 4; q++) c.fillRect(mx + 4 + q * 11, 696, 6, 22); } }, // milk crates for seats
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // grinder with its bean hopper
      { const gx = 30, gy = top - 6; c.fillStyle = L('#2a2a2e'); c.fillRect(gx - 9, gy - 34, 18, 34); c.fillStyle = rgba('#e0e8ec', 0.6); K0(c, [gx - 11, gy - 58, gx + 11, gy - 58, gx + 6, gy - 34, gx - 6, gy - 34]); c.fill(); c.fillStyle = L('#5a3416'); K0(c, [gx - 9, gy - 50, gx + 9, gy - 50, gx + 6, gy - 36, gx - 6, gy - 36]); c.fill(); if (grind > 0) { c.fillStyle = rgba('#8a5a30', grind); for (let q = 0; q < 4; q++) c.fillRect(gx - 2 + Math.sin(t * 30 + q) * 2, gy - 16 + q * 3, 2, 2); } }
      // the three-group espresso machine
      { const mx = 96, my = top - 6; c.fillStyle = L('#d0d4d8'); roundRect(c, mx - 40, my - 44, 80, 44, 4); c.fill(); c.fillStyle = L('#2a2a2e'); c.fillRect(mx - 40, my - 30, 80, 4); c.fillStyle = L('#e0a040'); c.fillRect(mx - 40, my - 44, 80, 3);
        for (let q = 0; q < 3; q++) { const hx = mx - 24 + q * 24; c.fillStyle = L('#8a8e94'); c.fillRect(hx - 5, my - 26, 10, 6); c.fillStyle = L('#2a2a2e'); c.fillRect(hx - 2, my - 20, 14, 3); }
        c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(mx - 34, my - 42, 20, 2); c.strokeStyle = L('#a8acb0'); c.lineWidth = 2; c.beginPath(); c.moveTo(mx + 40, my - 36); c.lineTo(mx + 48, my - 20); c.stroke();
        for (let q = 0; q < 4; q++) { c.fillStyle = L('#f4f0e6'); K0(c, [mx - 30 + q * 14, my - 52, mx - 22 + q * 14, my - 52, mx - 23 + q * 14, my - 44, mx - 29 + q * 14, my - 44]); c.fill(); } // cups warming on top
        if (steamW > 0) for (let q = 0; q < 4; q++) { const ph = (t * 1.4 + q * 0.25) % 1; c.fillStyle = rgba('#ffffff', 0.5 * steamW * (1 - ph)); c.beginPath(); c.arc(mx + 48 + Math.sin(t * 3 + q) * 4, my - 22 - ph * 40, 3 + ph * 7, 0, TAU); c.fill(); } }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // the pastry dome
      { const px = 172, py = top - 6; c.fillStyle = L('#c8b890'); c.fillRect(px - 20, py - 3, 40, 3); c.fillStyle = L('#5a3420'); for (let q = 0; q < 3; q++) { c.fillRect(px - 16 + q * 11, py - 11, 9, 8); } c.fillStyle = L('#fbf6ec'); for (let q = 0; q < 12; q++) c.fillRect(px - 15 + (q * 7) % 30, py - 10 + (q * 3) % 6, 1.2, 1.2); c.fillStyle = L('#d8963a'); roundRect(c, px - 14, py - 18, 26, 7, 3.5); c.fill(); c.fillStyle = rgba('#e8f0f4', 0.35); c.beginPath(); c.arc(px, py - 3, 20, Math.PI, TAU); c.fill(); c.strokeStyle = rgba('#ffffff', 0.5); c.lineWidth = 1; c.beginPath(); c.arc(px, py - 3, 20, Math.PI * 1.1, Math.PI * 1.4); c.stroke(); }
      { const jx = 214, jy = top - 6; c.fillStyle = rgba('#e8f0f4', 0.6); c.fillRect(jx - 7, jy - 16, 14, 16); c.fillStyle = L('#c8a050'); for (let q = 0; q < 4; q++) { c.beginPath(); c.arc(jx - 3 + (q % 2) * 6, jy - 3 - q * 2.4, 2.4, 0, TAU); c.fill(); } c.fillStyle = L('#2a2a2e'); c.font = '800 7px sans-serif'; c.textAlign = 'center'; c.fillText('TIPS', jx, jy - 20); } // tip jar
      // counter front: recycled timber slats + a sticker-bombed panel
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); for (let i = 0; i < 12; i++) { c.fillStyle = L(i % 3 ? '#7a5a3a' : '#6a4a2e'); c.fillRect(x0 - 6, top + 6 + i * 12, x1 - x0 + 12, 10); }
      for (let q = 0; q < 9; q++) { const sx = x0 + 18 + (q * 61) % (x1 - x0 - 40), sy = top + 20 + (q * 37) % 110; c.fillStyle = L([P.art1, P.art2, P.art3, '#f4f0e6'][q % 4]); c.save(); c.translate(sx, sy); c.rotate((q % 3 - 1) * 0.2); if (q % 2) { c.beginPath(); c.arc(0, 0, 9, 0, TAU); c.fill(); } else c.fillRect(-12, -7, 24, 14); c.restore(); } // stickers
      if (knock > 0) { c.fillStyle = rgba('#5a3416', knock * 0.6); c.beginPath(); c.arc(70, top - 8, 4, 0, TAU); c.fill(); }
      if (swan > 0) { const sx = 150, sy = top - 70; c.fillStyle = rgba('#f4eee4', Math.min(1, swan * 2)); c.beginPath(); c.arc(sx, sy, 22, 0, TAU); c.fill(); c.fillStyle = rgba('#a06a3a', Math.min(1, swan * 2)); c.beginPath(); c.arc(sx, sy, 18, 0, TAU); c.fill(); c.fillStyle = rgba('#fbf6ec', Math.min(1, swan * 2)); for (let q = 0; q < 4; q++) { ellipse(c, sx - 6 + q * 2, sy + 6 - q * 4, 7 - q, 2.2, -0.4); c.fill(); } c.strokeStyle = rgba('#fbf6ec', Math.min(1, swan * 2)); c.lineWidth = 2.4; c.beginPath(); c.moveTo(sx + 2, sy - 8); c.quadraticCurveTo(sx + 12, sy - 14, sx + 8, sy + 4); c.stroke(); K.glow(c, sx, sy, 50, '#fff4e0', 0.25 * swan); } // the swan, held up for the photos
    },
    events: [
      { name: 'latteart', dur: 9, start(X, srv, mk) { const K = X.K; swan = 1; steamW = 1; K.say(mk, 'Check this — a swan.', 1.4); K.after(1.2, () => { K.fx('flash', 150, X.CNT.top - 70); for (const c of K.actors.filter((q) => q.cust)) { K.say(c, pick(['icon:cam', 'No way!', 'Legend!', 'That’s going on the ’gram']), 1.4); } K.say(srv, 'Show-off.', 1); }); } },
      { name: 'fourseasons', dur: 12, start(X, srv, mk) { const K = X.K; squall = 1; K.say(srv, 'Here it comes…', 1.2); K.after(1.2, () => { for (const c of K.actors.filter((q) => q.cust)) K.say(c, pick(['Typical Melbourne', 'It was sunny a sec ago!', 'icon:sweat']), 1.4); }); K.after(8, () => K.say(mk, 'Aaand sun’s out.', 1.2)); } },
      { name: 'tram', dur: 7, start(X, srv, mk) { const K = X.K; tram = 0; tramBell = 1; K.say(srv, 'Ding ding!', 1.1); K.after(1.4, () => { for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.6) K.say(c, pick(['That’s my tram!', 'icon:note', 'Gotta run!']), 1.2); }); } },
    ],
  };
  registerStage('laneway', makeGeoCafe(W));
})();
