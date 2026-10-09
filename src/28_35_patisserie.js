/* ================= NEW WORLD · Parisian Patisserie — GEOMETRIC edition (an imagined shop; no real brands) =================
   A pistachio-green Paris pâtisserie with gilt mouldings and a black-and-white tiled floor. Chef Amélie pipes pistachio
   cream, glazes éclairs and pulls trays of croissants from the oven; Théo (Breton stripes) slides cakes from the glass
   case into ribboned boxes. Wall: a gilt mirror with the day's prices written on it, shelves of baguettes and boules, a
   stack of pastel boxes, crystal sconces. Counter: a croquembouche on its stand, the piping station, a brass register, a
   ribbon spool, and the glass display case in front showing rows of pastries. Window: a Haussmann street with zinc roofs and
   iron balconies, the tower in the gap, a red café awning opposite, a bicycle with a baguette, pigeons. Signatures:
   LA FOURNÉE (a fresh tray of croissants, steam, the room sighs) · LA PIÈCE MONTÉE (a wedding croquembouche is revealed
   and spun with sugar threads, applause) · POUR OFFRIR ? (a gift box tied with a flourish). Clock 07:00 -> 19:00, all
   weather. Blocks: éclair · macarons · tarte aux fraises · croissants · mille-feuille · tarte au citron · pistache. */
(() => {
  WORLD_DEFS.push({
    id: 'patisserie', name: 'Patisserie', sub: 'pâtisserie · a Paris shop window, croissants at dawn', thumbY: 0.42,
    desc: 'A Paris pâtisserie in pistachio and gold: croissants out of the oven, éclairs glazed by hand, macarons boxed with ribbon, a croquembouche on the counter and a Haussmann street outside. Accordion musette.',
    accent: '#c8a050', accent2: '#8ab45a', skin: 'patisserie', particle: 'sugar',
    boardBg: 'rgba(22,18,24,0.94)', grid: 'rgba(255,230,220,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 132, root: 62, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 3, 1, 4], barsPerChord: 1, swing: 0.1,
      pad: { wave: 'triangle', cutoff: 1400, gain: 0.012, detune: 4, voices: 3 },
      comp: { inst: 'accordion', pattern: E16('..x...x...x...x.'), voices: 3, gain: 0.05, oct: 0 },
      arp: { inst: 'mandolin', pattern: [0, 2, 4, 2, 5, 4, 2, 1], every: 1, oct: 1, gain: 0.026, density: 0.5 },
      bass: { inst: 'upbass', pattern: E16('x.......x.......'), gain: 0.18, dec: 0.3 },
      drums: { kick: E16('x.......x.......'), snareInst: 'brush', snare: E16('....x.......x...'), hat: E16('x.x.x.x.x.x.x.x.'), hatGain: 0.4 },
      lead: { inst: 'accordion', gain: 0.04, density: 0.2, oct: 1 }, sfx: 'bell', clearFx: 'sugar',
      amb: { chatter: 0.018, clink: 0.014 },
    },
  });
  const PaPal = GeoCafePal({
    day: { wall: '#a8c4a4', wall2: '#94b290', mould: '#d4b46a', mouldDk: '#a88a44', mirror: '#c8d4d0', menuInk: '#4a3622', shelf: '#8a6440', bread: '#c88a3a', breadDk: '#8a5420', wood: '#6a4a2a', woodDk: '#3e2a16', ink: '#26201c',
      floor: '#ece6da', floor2: '#2a2628', cnt: '#ece6dc', cnt2: '#e2dace', vein: '#c8c0b4', steel: '#c8ccd0', sky0: '#a8c8e8', sky1: '#e0ecf4', stone: '#e8dcc4', stone2: '#d4c6aa', zinc: '#8a96a4', road: '#8a8680', awn: '#b8302e', winA: 0.1, neonA: 0.2,
      lamp: '#fff4dc', glow: '#ffe4b0', glowA: 0.12, shaft: '#fff4e0', shaftA: 0.1, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#9ab696', wall2: '#86a482', mould: '#ccac62', mouldDk: '#a08240', mirror: '#c8c4bc', menuInk: '#4a3622', shelf: '#82603c', bread: '#c08436', breadDk: '#84501e', wood: '#64462a', woodDk: '#3a2814', ink: '#26201c',
      floor: '#e2dace', floor2: '#2a2628', cnt: '#e2dcd2', cnt2: '#d8d0c4', vein: '#beb6aa', steel: '#c0c4c8', sky0: '#d88c70', sky1: '#f4c8a0', stone: '#d8b8a0', stone2: '#c0a088', zinc: '#6e7684', road: '#6a6264', awn: '#a82a2a', winA: 0.6, neonA: 0.7,
      lamp: '#ffe8c4', glow: '#ffd498', glowA: 0.26, shaft: '#ffcc98', shaftA: 0.07, amb: '#ffc8a0', ambK: 0.05, sun: '#ffa070', cloud: '#e8b8a8' },
    night: { wall: '#7e9a7c', wall2: '#6c886a', mould: '#c0a05a', mouldDk: '#94783a', mirror: '#a8aca8', menuInk: '#4a3622', shelf: '#745632', bread: '#b07a32', breadDk: '#76481c', wood: '#5a3e24', woodDk: '#342410', ink: '#26201c',
      floor: '#d2cabe', floor2: '#262224', cnt: '#d6d0c6', cnt2: '#ccc4b8', vein: '#b0a89c', steel: '#acb0b4', sky0: '#141a30', sky1: '#24304c', stone: '#5a5466', stone2: '#4a4458', zinc: '#3a4054', road: '#2e2c34', awn: '#7a2026', winA: 1, neonA: 1,
      lamp: '#ffe2b8', glow: '#ffcc90', glowA: 0.38, shaft: '#ffc890', shaftA: 0, amb: '#3a3456', ambK: 0.05, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: { sky0: '#bcc8d4', sky1: '#e0e8ee', road: '#dee2e6', zinc: '#e8ecf0' },
  }, [[4, 'night'], [6.4, 'dusk'], [7.6, 'day'], [17.6, 'day'], [19, 'dusk'], [20.4, 'night'], [28, 'night']],
  (h) => { h = ((h % 24) + 24) % 24; return h < 10 ? 'Le matin' : h < 14 ? 'Midi' : h < 17.5 ? "L'après-midi" : 'Le soir'; });
  const MENU = [{ n: 'Croissant', c: '#d8902e', kind: 'vien' }, { n: 'Pain au chocolat', c: '#c8862a', kind: 'vien' }, { n: 'Éclair', c: '#4a2414', kind: 'gateau' },
    { n: 'Macarons ×6', c: '#e8a0aa', kind: 'macaron' }, { n: 'Tarte au citron', c: '#f0d040', kind: 'gateau' }, { n: 'Chocolat chaud', c: '#5a3020', kind: 'choco' }];
  let steam = 0, croq = 0, ribbon = 0, oven = 0, pig = 0, sugar = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'patisserie', pal: PaPal, stationX: 44, srvX: 220, spots: [146, 330], maxCust: 2, crowd: 0.65, tagDx: 180, // Amélie at the piping station (70), Théo at the case (220)
    startHour: 7, span: 12, font: '700 15px Georgia, "Times New Roman", serif', vign: 'rgba(30,24,16,0.22)', zone: 'rgba(40,30,22,0.24)',
    per: (h) => h < 10 ? 0 : h < 14 ? 1 : h < 17.5 ? 2 : 3,
    staff: [{ T: 214, hw: 56, headR: 27, pattern: 'stripe', top: '#f4f0e6', top2: '#26304a', hairStyle: 'side', hair: 'brown', pants: '#26304a' },
      { T: 210, hw: 58, headR: 27, pattern: 'chef', top: '#f4f0e6', top2: '#d8d0c0', hairStyle: 'bun', hair: 'brown', pants: '#2a2a30', hat: 'chef', hatCol: '#f8f6f0' }],
    menu: MENU, greet: ['Bonjour !', 'Madame, monsieur ?', 'Et pour vous ?'], ack: ['Très bien', "C'est parti", 'Avec plaisir'], handOff: ['Voilà !', 'Bonne dégustation', 'Encore chaud !'],
    thanks: ['Merci !', 'icon:heart', 'Merci beaucoup'], done: ['Délicieux…', 'icon:heart', 'Au revoir !'], cheer: ['Bravo !', 'icon:star', 'Magnifique !'],
    types: {
      parisienne: { body: { T: 216, hw: 52, pattern: 'coat', top: 'cream', shirt: 'white', hairStyle: 'bob', hair: 'dark', hat: 'beret', hatCol: 'dark', pants: 'dark', coat: 0.6 }, words: ['Deux croissants', 'Comme d’habitude'] },
      monsieur: { body: { T: 220, hw: 60, pattern: 'cardigan', top: 'olive', top2: 'cream', hat: 'flatcap', hatCol: 'brown', hairStyle: 'short', hair: 'hairGrey', glasses: 1, pants: 'grey' }, words: ['Une baguette bien cuite', 'Le journal et un café'] },
      maman: { body: { T: 212, hw: 54, pattern: 'dress', top: 'teal', hairStyle: 'long', hair: 'brown' }, words: ['Un goûter ?', 'Choisis, chéri'] },
      kid: { body: { T: 150, hw: 48, headR: 30, pattern: 'stripe', top: 'cream', top2: 'coral', hairStyle: 'short', hair: 'brown', pants: 'navy' }, words: ['Un macaron rose !', 'icon:heart'], small: 1 },
      tourist: { body: { pattern: 'tee', top: 'coral', hat: 'cap', hatCol: 'navy', hairStyle: 'short', camera: 1, pants: 'brown' }, words: ['Wow, so pretty', 'Un… croissant, please?'] },
      artiste: { body: { T: 218, hw: 56, pattern: 'jacket', top: 'plum', shirt: 'dark', hat: 'beret', hatCol: 'coral', hairStyle: 'long', hair: 'dark', pants: 'dark' }, words: ['Le millefeuille, toujours', 'Quelle lumière…'] },
    },
    parties: [{ m: ['parisienne'], w: [3, 2, 2, 2] }, { m: ['monsieur'], w: [3, 2, 1, 1] }, { m: ['maman', 'kid'], w: [1, 1, 3, 1] }, { m: ['tourist'], w: [1, 3, 2, 2] }, { m: ['artiste'], w: [1, 2, 2, 3] }],
    sim(X, dt) { steam = Math.max(0, steam - dt * 0.3); croq = Math.max(0, croq - dt * 0.14); ribbon = Math.max(0, ribbon - dt * 0.5); oven += dt; pig += dt; sugar = Math.max(0, sugar - dt * 0.3); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'vien') ph.push(K.ph(1.4, (s, u) => { s.hold.N = H.tool('tongs'); s.f = -1; s.tgN = [40 + Math.sin(u * Math.PI) * 10, CNT.top - 120 + u * 40]; s.leanT = 0.06; it.o.frac = u * 0.85; s.look = { x: () => 40, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })); // from the bread shelf
      else if (m.kind === 'macaron') ph.push(K.ph(1.6, (s, u, t) => { s.hold.N = H.tool('tongs'); s.f = 1; s.tgN = [118 + Math.sin(t * 4) * 12, CNT.top - 16]; s.leanT = 0.18; it.o.frac = u * 0.85; s.look = { x: () => 118, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'choco') ph.push(K.ph(1.5, (s, u, t) => { s.hold.N = H.tool('whisk'); s.f = 1; s.tgN = [96 + Math.sin(t * 14) * 4, CNT.top - 26]; it.o.frac = u * 0.85; s.look = { x: () => 96, until: K.simT + 0.3 }; if (Math.random() < 0.04) K.fx('puff', 96, CNT.top - 40, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } }));
      else { ph.push(K.ph(1.0, (s, u) => { s.f = 1; s.tgN = [110, CNT.top - 10]; s.tgF = [124, CNT.top - 6]; s.leanT = 0.22; it.o.frac = u * 0.5; s.look = { x: () => 116, until: K.simT + 0.3 }; })); // slide it from the case
        ph.push(K.ph(0.8, (s, u) => { ribbon = Math.max(ribbon, 0.6); s.f = 1; s.tgN = [136 + Math.sin(u * 12) * 5, CNT.top - 24]; it.o.frac = 0.5 + u * 0.35; })); }
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 34, CNT.top - 22]; s.tgF = [ST.x + 46, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT, r = Math.random();
      if (r < 0.45) return K.start(a, 'pipe', [K.ph(rand(2.2, 3.2), (s, u, t) => { s.hold.N = H.tool('piping'); s.f = 1; s.tgN = [92 + ((t * 18) % 30), CNT.top - 22 - Math.abs(Math.sin(t * 6)) * 3]; s.leanT = 0.16; s.look = { x: () => 100, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (r < 0.75) return K.start(a, 'dust', [K.ph(rand(1.6, 2.4), (s, u, t) => { sugar = Math.max(sugar, 0.5); s.hold.N = H.tool('sieve'); s.f = 1; s.tgN = [104 + Math.sin(t * 10) * 4, CNT.top - 40]; s.look = { x: () => 104, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'taste', [K.ph(1.6, (s, u) => { s.f = -1; s.tgN = u < 0.5 ? [40, CNT.top - 110] : [s.R.cx - 6, s.R.cy + 6]; s.look = { x: () => 40, until: K.simT + 0.3 }; }, { exit: () => K.say(a, pick(['Parfait.', 'Un peu plus de beurre…', 'icon:heart']), 1) })]); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.5) return K.start(a, 'arrange', [K.ph(rand(2, 3), (s, u, t) => { s.f = -1; s.tgN = [196 + Math.sin(t * 2) * 10, CNT.top - 10]; s.leanT = 0.2; s.look = { x: () => 196, until: K.simT + 0.3 }; })]);
      return K.start(a, 'ribbon', [K.ph(1.6, (s, u, t) => { ribbon = 1; s.f = -1; s.tgN = [160 + Math.sin(t * 9) * 8, CNT.top - 26 - Math.abs(Math.sin(t * 9)) * 6]; s.look = { x: () => 160, until: K.simT + 0.3 }; }, { exit: () => K.say(a, pick(['Et voilà, un joli nœud', 'icon:heart']), 1) })]); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'tongs') { c.strokeStyle = L('#c8ccd2'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 14 * s, y - 8 * s); c.moveTo(x, y); c.lineTo(x + 14 * s, y - 4 * s); c.stroke(); }
      else if (k === 'piping') { c.fillStyle = L('#f4f0e6'); K0(c, [x - 6 * s, y - 6 * s, x + 6 * s, y - 6 * s, x + 1 * s, y + 10 * s, x - 1 * s, y + 10 * s]); c.fill(); c.fillStyle = L('#9ac068'); c.fillRect(x - 4 * s, y - 2 * s, 8 * s, 5 * s); c.fillStyle = L('#c8ccd0'); c.fillRect(x - 1.4 * s, y + 9 * s, 2.8 * s, 3 * s); }
      else if (k === 'whisk') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 * s, y + 6 * s); c.stroke(); c.beginPath(); c.ellipse(x + 9 * s, y + 9 * s, 3.4 * s, 5 * s, -0.8, 0, TAU); c.stroke(); }
      else if (k === 'sieve') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.4 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 8 * s, y - 2 * s); c.stroke(); c.fillStyle = L('#d8dce0'); c.beginPath(); c.arc(x + 14 * s, y - 2 * s, 6 * s, 0, Math.PI); c.fill(); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'vien') { c.fillStyle = L('#f4ecd8'); K0(c, [-7, -16, 7, -16, 8, 0, -8, 0]); c.fill(); c.fillStyle = L('#c8b890'); c.fillRect(-7, -16, 14, 2); if (frac > 0.5) { c.fillStyle = L(m.c); ellipse(c, 0, -17, 7, 3.4, -0.2); c.fill(); } }
      else if (m.kind === 'macaron') { c.fillStyle = L('#a8d0c4'); roundRect(c, -11, -9, 22, 9, 2); c.fill(); for (let i = 0; i < 3; i++) if (frac > i * 0.25) { c.fillStyle = L(['#e8a0aa', '#9ac068', '#b8a0d8'][i]); ellipse(c, -6 + i * 6, -10, 2.8, 2); c.fill(); } c.fillStyle = L('#d4b46a'); c.fillRect(-1, -9, 2, 9); }
      else if (m.kind === 'choco') { c.fillStyle = L('#f4f0e6'); roundRect(c, -5, -11, 10, 11, 2); c.fill(); c.strokeStyle = L('#f4f0e6'); c.lineWidth = 1.4; c.beginPath(); c.arc(6, -6, 3, -1.2, 1.2); c.stroke(); if (frac > 0.4) { c.fillStyle = L(m.c); ellipse(c, 0, -11, 4.4, 1.4); c.fill(); } if (frac > 0.8) { c.fillStyle = 'rgba(255,255,255,0.45)'; c.beginPath(); c.arc(0, -16, 2.4, 0, TAU); c.fill(); } }
      else { c.fillStyle = L('#f4f0e6'); c.fillRect(-10, -12, 20, 12); c.fillStyle = L('#d4b46a'); c.fillRect(-1.2, -12, 2.4, 12); c.fillRect(-10, -7, 20, 2); if (frac > 0.7) { c.fillStyle = L('#d4b46a'); ellipse(c, -3, -13, 3, 1.8, 0.4); ellipse(c, 3, -13, 3, 1.8, -0.4); c.fill(); } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.patisserie = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L, top = X.CNT.top;
      c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
      for (let i = 0; i < 9; i++) { const px = -40 + i * 160; c.strokeStyle = P.mould; c.lineWidth = 3; c.strokeRect(px + 14, 60, 130, 220); c.strokeStyle = P.mouldDk; c.lineWidth = 1; c.strokeRect(px + 20, 66, 118, 208); c.strokeStyle = P.mould; c.lineWidth = 2; c.strokeRect(px + 14, 320, 130, 260); } // gilt-moulded panels
      c.fillStyle = P.mould; c.fillRect(-60, 296, 1400, 8); c.fillStyle = P.mouldDk; c.fillRect(-60, 304, 1400, 2); c.fillStyle = P.mould; c.fillRect(-60, 30, 1400, 10);
      // the gilt mirror with today's prices written on the glass
      { const x0 = 16, y0 = 50; c.fillStyle = P.mould; roundRect(c, x0, y0, 250, 150, 10); c.fill(); c.fillStyle = P.mirror; roundRect(c, x0 + 9, y0 + 9, 232, 132, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,0.22)'; K0(c, [x0 + 30, y0 + 9, x0 + 70, y0 + 9, x0 + 30, y0 + 141, x0 - 10 + 9, y0 + 141]); c.fill();
        c.fillStyle = P.menuInk; c.font = 'italic 700 17px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Pâtisserie du jour', x0 + 125, y0 + 26);
        const it = [['Croissant', '1,40'], ['Pain au chocolat', '1,60'], ['Éclair', '4,20'], ['Macaron', '2,10'], ['Tarte citron', '5,50']];
        it.forEach(([n, p], i) => { const yy = y0 + 50 + i * 18; c.font = 'italic 13px Georgia, serif'; c.textAlign = 'left'; c.fillText(n, x0 + 22, yy); c.textAlign = 'right'; c.fillText(p + ' €', x0 + 228, yy); }); }
      // bread shelves (behind the staff, above their heads) with baguettes and boules, and a stack of pastel boxes
      { const sy = top - 150; c.fillStyle = P.shelf; c.fillRect(16, sy + 34, 236, 6); c.fillStyle = shade(P.shelf, -0.2); c.fillRect(16, sy + 40, 236, 3);
        for (let k = 0; k < 7; k++) { c.save(); c.translate(26 + k * 9, sy + 34); c.rotate(-0.25 + k * 0.08); c.fillStyle = L(k % 2 ? P.bread : '#d49a48'); roundRect(c, -3.4, -48, 7, 48, 3.4); c.fill(); c.strokeStyle = P.breadDk; c.lineWidth = 1; for (let q = 0; q < 3; q++) { c.beginPath(); c.moveTo(-2, -40 + q * 13); c.lineTo(2, -44 + q * 13); c.stroke(); } c.restore(); } // baguettes standing in the basket
        c.fillStyle = L('#a8844c'); K0(c, [16, sy + 10, 100, sy + 10, 94, sy + 34, 22, sy + 34]); c.fill();
        for (let k = 0; k < 3; k++) { c.fillStyle = L('#b47a34'); c.beginPath(); c.arc(124 + k * 26, sy + 24, 12, Math.PI, TAU); c.fill(); c.fillRect(112 + k * 26, sy + 24, 24, 10); c.strokeStyle = 'rgba(255,230,190,0.6)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(118 + k * 26, sy + 18); c.lineTo(130 + k * 26, sy + 24); c.stroke(); } // boules
        for (let k = 0; k < 4; k++) { const col = ['#a8d0c4', '#f0c4cc', '#d8c8ec', '#f4e2b0'][k]; c.fillStyle = L(col); c.fillRect(204 + (k % 2) * 4, sy + 34 - (k + 1) * 14, 42 - k * 4, 14); c.fillStyle = L('#d4b46a'); c.fillRect(222 + (k % 2) * 2, sy + 34 - (k + 1) * 14, 3, 14); } }
      for (const sx of [292, 1000]) { c.fillStyle = P.mould; c.fillRect(sx - 2, 120, 4, 30); c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(sx, 116, 7, 0, TAU); c.fill(); K.glow(c, sx, 116, 70, P.glow, P.glowA + 0.1); for (let q = 0; q < 5; q++) { c.fillStyle = 'rgba(230,240,255,0.7)'; K0(c, [sx - 8 + q * 4, 150, sx - 6 + q * 4, 150, sx - 7 + q * 4, 160]); c.fill(); } } // crystal sconces
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.mouldDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = P.mould; c.fillRect(x0 + (x1 - x0) / 2 - 3, y0, 6, y1 - y0); c.fillRect(x0, y0 + (y1 - y0) * 0.3, x1 - x0, 4); c.fillStyle = 'rgba(255,255,255,0.12)'; K0(c, [x0 + 20, y0, x0 + 60, y0, x0 + 10, y1, x0 - 30, y1]); c.fill();
      c.fillStyle = L('#26304a'); roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 4); c.fill(); c.strokeStyle = P.mould; c.lineWidth = 2; c.strokeRect(x0, y0 - 48, x1 - x0, 28);
      c.fillStyle = P.mould; c.font = 'italic 700 19px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Pâtisserie · Boulangerie', (x0 + x1) / 2, y0 - 33);
      },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      c.fillStyle = P.sky0; c.fillRect(x0, y0, w, 160);
      { const tx = x0 + w * 0.5 + 18, ty = y0 + 250; c.fillStyle = rgba(P.zinc, 0.9); K0(c, [tx - 34, ty, tx - 4, ty - 170, tx + 4, ty - 170, tx + 34, ty]); c.fill(); c.fillStyle = P.sky0; c.beginPath(); c.arc(tx, ty, 18, Math.PI, TAU); c.fill(); K0(c, [tx - 10, ty - 80, tx + 10, ty - 80, tx + 3, ty - 150, tx - 3, ty - 150]); c.fill(); c.fillStyle = rgba(P.zinc, 0.9); c.fillRect(tx - 24, ty - 66, 48, 4); c.fillRect(tx - 12, ty - 128, 24, 3); c.fillRect(tx - 1, ty - 186, 2, 18);
        if (n > 0.3 && (t % 600) < 300 && ((t * 8) | 0) % 2) for (let q = 0; q < 12; q++) { c.fillStyle = rgba('#fff8d0', n * 0.8); { const hy = H2(q + 5); c.fillRect(tx + (H2(q + 3) - 0.5) * 60 * (1 - hy), ty - hy * 170, 1.8, 1.8); } } } // the tower sparkles on the hour
      for (const [bx, bw, bh] of [[0, 0.36, 150], [0.64, 0.36, 158]]) { const sx = x0 + w * bx, ww = w * bw, sy = y0 + 200 - bh + 40; // Haussmann facades
        c.fillStyle = P.stone; c.fillRect(sx, sy, ww, 300); c.fillStyle = P.zinc; K0(c, [sx - 4, sy, sx + ww + 4, sy, sx + ww - 8, sy - 26, sx + 8, sy - 26]); c.fill();
        for (let k = 0; k < 2; k++) { c.fillStyle = rgba('#e8eef4', 0.5); c.fillRect(sx + 14 + k * ww * 0.5, sy - 20, 12, 14); }
        for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const wx = sx + 10 + k * (ww - 20) / 3, wy = sy + 12 + r * 44; c.fillStyle = rgba('#ffe4b0', 0.12 + 0.62 * P.winA * ((r + k) % 3 ? 1 : 0.3)); c.fillRect(wx, wy, (ww - 20) / 3 - 10, 28); c.fillStyle = P.stone2; c.fillRect(wx - 2, wy - 4, (ww - 20) / 3 - 6, 3); c.strokeStyle = L('#2a2a30'); c.lineWidth = 1; c.beginPath(); c.moveTo(wx - 2, wy + 26); c.lineTo(wx + (ww - 20) / 3 - 8, wy + 26); c.stroke(); for (let q = 0; q < 5; q++) { c.beginPath(); c.moveTo(wx + q * ((ww - 20) / 3 - 10) / 4, wy + 20); c.lineTo(wx + q * ((ww - 20) / 3 - 10) / 4, wy + 28); c.stroke(); } } } // iron balconies
      { const ax = x0 + w * 0.6, ay = y0 + 238; c.fillStyle = P.awn; K0(c, [ax, ay, ax + w * 0.4, ay, ax + w * 0.4 + 6, ay + 20, ax - 6, ay + 20]); c.fill(); for (let q = 0; q < 6; q++) { c.fillStyle = rgba('#ffffff', 0.25); c.fillRect(ax + q * w * 0.07, ay, w * 0.035, 20); } c.fillStyle = L('#2a2a30'); for (let q = 0; q < 2; q++) { c.beginPath(); c.arc(ax + 20 + q * 40, ay + 46, 7, Math.PI, TAU); c.fill(); c.fillRect(ax + 19 + q * 40, ay + 46, 2, 14); } } // the café opposite
      c.fillStyle = P.road; c.fillRect(x0, y0 + 300, w, hh - 300); c.fillStyle = rgba('#000000', 0.1); for (let k = 0; k < 12; k++) for (let r = 0; r < 3; r++) c.fillRect(x0 + k * 24 + (r % 2) * 12, y0 + 306 + r * 12, 20, 9); // cobbles
      { const sp = 40, bx = x0 - 40 + ((t * sp) % (w + 80)), by = y0 + 330; c.strokeStyle = L('#2a2a30'); c.lineWidth = 1.6; c.beginPath(); c.arc(bx - 10, by, 7, 0, TAU); c.arc(bx + 12, by, 7, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(bx - 10, by); c.lineTo(bx, by - 10); c.lineTo(bx + 12, by); c.stroke(); c.fillStyle = L('#3a5a8a'); c.fillRect(bx - 4, by - 30, 8, 16); c.fillStyle = L('#f4d8c0'); c.beginPath(); c.arc(bx, by - 34, 5, 0, TAU); c.fill(); c.fillStyle = L('#d49a48'); c.save(); c.translate(bx + 6, by - 24); c.rotate(-0.9); roundRect(c, -2, -14, 4, 22, 2); c.fill(); c.restore(); } // a bicycle with a baguette
      for (let k = 0; k < 3; k++) { const px = x0 + 40 + k * 50 + Math.sin(pig * 0.5 + k) * 10, py = y0 + 352 - Math.abs(Math.sin(pig * 3 + k * 2)) * 2; c.fillStyle = L('#8a8e98'); ellipse(c, px, py, 6, 4); c.fill(); c.beginPath(); c.arc(px + 5, py - 4, 3, 0, TAU); c.fill(); c.fillStyle = L('#e8a040'); c.fillRect(px + 7, py - 4, 2, 1); } // pigeons
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; c.fillStyle = P.floor; c.fillRect(-60, 642, 1400, 120); for (let r = 0; r < 4; r++) for (let i = 0; i < 30; i++) if ((i + r) % 2) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 48, 642 + r * 26, 48, 26); } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // the croquembouche on its stand
      { const cx = 214, cy = top - 6, g = croq; c.fillStyle = P.mould; c.fillRect(cx - 18, cy - 4, 36, 4); c.fillRect(cx - 2, cy - 10, 4, 8); const ht = 62 + g * 30;
        for (let r = 0; r < 9; r++) { const yy = cy - 12 - r * ht / 9, ww = (1 - r / 9) * (16 + g * 6); for (let q = -ww; q <= ww; q += 7) { c.fillStyle = L(r % 2 ? '#d89a40' : '#c8862a'); c.beginPath(); c.arc(cx + q, yy, 4, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,240,200,0.6)'; c.beginPath(); c.arc(cx + q - 1, yy - 1.4, 1.4, 0, TAU); c.fill(); } }
        if (g > 0) { c.strokeStyle = rgba('#ffd888', 0.7 * g); c.lineWidth = 0.8; for (let q = 0; q < 8; q++) { c.beginPath(); c.moveTo(cx, cy - 12 - ht); c.quadraticCurveTo(cx + Math.sin(t * 2 + q) * 30, cy - ht * 0.5, cx + Math.sin(q * 1.7) * 24, cy - 10); c.stroke(); } K.glow(c, cx, cy - ht * 0.5, 60, '#ffd888', 0.25 * g); } }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8); c.strokeStyle = P.vein; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, top - 2); c.quadraticCurveTo(x0 + 80, top - 5, x0 + 200, top - 1); c.stroke();
      // piping station: a tray of éclairs being glazed
      { const tx = 100, ty = top - 6; c.fillStyle = L('#c8ccd2'); c.fillRect(tx - 24, ty - 3, 48, 3); for (let k = 0; k < 4; k++) { c.fillStyle = L('#c88638'); roundRect(c, tx - 22 + k * 12, ty - 8, 10, 5, 2.5); c.fill(); c.fillStyle = L('#3e1a0c'); roundRect(c, tx - 22 + k * 12, ty - 9, 10, 2.6, 1.3); c.fill(); }
        if (sugar > 0) for (let k = 0; k < 12; k++) { const ph = (t * 1.2 + k / 12) % 1; c.fillStyle = rgba('#ffffff', sugar * (1 - ph)); c.fillRect(tx - 10 + (k * 7) % 22, ty - 36 + ph * 26, 1.4, 1.4); } }
      // brass register and the ribbon spool
      { const rx = 160, ry = top - 6; c.fillStyle = L('#c8a050'); K0(c, [rx - 14, ry, rx + 14, ry, rx + 10, ry - 20, rx - 10, ry - 20]); c.fill(); c.fillStyle = L('#8a6a2a'); for (let q = 0; q < 3; q++) c.fillRect(rx - 8 + q * 6, ry - 26, 4, 6);
        c.fillStyle = L('#d4b46a'); c.beginPath(); c.arc(rx + 26, ry - 6, 6, 0, TAU); c.fill(); if (ribbon > 0) { c.strokeStyle = rgba('#d4b46a', ribbon); c.lineWidth = 1.4; c.beginPath(); for (let q = 0; q <= 20; q++) { const an = q / 20 * TAU * 2 + t * 6; const px = rx + 26 + Math.cos(an) * (6 + q), py = ry - 20 - q * 1.6 + Math.sin(an) * 4; q ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke(); } }
      // counter front: the glass display case with rows of pastries
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.mould; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, 4);
      { const gx = x0 + 6, gy = top + 14, gw = x1 - x0 - 12, gh = 96; c.fillStyle = 'rgba(220,236,240,0.6)'; c.fillRect(gx, gy, gw, gh); const rows = [['#c88638', '#3e1a0c'], ['#e8a0aa', '#9ac068', '#b8a0d8', '#f0d040'], ['#c8303a', '#f0d040', '#f2ead8']];
        rows.forEach((cols, r) => { const yy = gy + 24 + r * 30; c.fillStyle = L('#f4f0e6'); c.fillRect(gx + 4, yy + 4, gw - 8, 2); for (let k = 0; k < 9; k++) { const px = gx + 14 + k * (gw - 24) / 8, col = cols[k % cols.length]; c.fillStyle = L(col);
          if (r === 0) { roundRect(c, px - 9, yy - 4, 18, 7, 3.5); c.fill(); c.fillStyle = L(cols[1]); roundRect(c, px - 9, yy - 5, 18, 3, 1.5); c.fill(); } else if (r === 1) { ellipse(c, px, yy - 4, 6, 2.6); c.fill(); ellipse(c, px, yy + 1, 6, 2.6); c.fill(); c.fillStyle = L('#f6ecd8'); c.fillRect(px - 5, yy - 2, 10, 2); } else { c.fillStyle = L('#d8a050'); K0(c, [px - 9, yy + 3, px + 9, yy + 3, px + 7, yy - 3, px - 7, yy - 3]); c.fill(); c.fillStyle = L(col); ellipse(c, px, yy - 3, 7, 2); c.fill(); } } });
        c.fillStyle = 'rgba(255,255,255,0.3)'; K0(c, [gx + 20, gy, gx + 60, gy, gx + 30, gy + gh, gx - 10 + 6, gy + gh]); c.fill(); c.strokeStyle = P.mould; c.lineWidth = 2; c.strokeRect(gx, gy, gw, gh); }
      c.fillStyle = P.mouldDk; c.font = 'italic 700 13px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('fait maison chaque matin', (x0 + x1) / 2, top + 126);
      // the oven door glows on the back wall behind Amélie
      if (steam > 0) for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; c.fillStyle = rgba('#ffffff', 0.4 * steam * (1 - ph)); c.beginPath(); c.arc(60 + Math.sin(t + k) * 10, top - 30 - ph * 70, 6 + ph * 10, 0, TAU); c.fill(); }
    },
    events: [
      { name: 'fournee', dur: 9, start(X, srv, mk) { const K = X.K; steam = 1; K.say(mk, 'Attention, ça sort du four !', 1.6); K.after(1.2, () => { for (const c of K.actors.filter((q) => q.cust)) K.say(c, pick(['Ahh, ça sent bon…', 'icon:heart', 'Encore chaud !']), 1.4); K.say(srv, 'Croissants tout chauds !', 1.3); }); } },
      { name: 'piecemontee', dur: 11, start(X, srv, mk) { const K = X.K; croq = 1; K.say(srv, 'La pièce montée pour le mariage !', 1.8); K.after(1.4, () => { K.fx('flash', 214, X.CNT.top - 60); K.say(mk, 'Fil de sucre… voilà.', 1.4); for (const c of K.actors.filter((q) => q.cust)) K.say(c, pick(['Bravo !', 'Magnifique !', 'icon:star', 'icon:cam']), 1.4); }); } },
      { name: 'offrir', dur: 7, start(X, srv, mk) { const K = X.K; ribbon = 2; K.say(srv, 'C’est pour offrir ?', 1.3); K.after(1.2, () => { K.fx('spark', 186, X.CNT.top - 30, { life: 0.8, col: '#d4b46a' }); for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.7) K.say(c, pick(['Oui, merci !', 'icon:heart', 'Trop joli']), 1.2); }); } },
    ],
  };
  const H2 = (q) => { const s = Math.sin(q * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  registerStage('patisserie', makeGeoCafe(W));
})();
