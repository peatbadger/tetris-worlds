/* ================= NEW WORLD · Curry House — GEOMETRIC edition (homage to the big Japanese curry chains, no real logos) =================
   A bright yellow-and-brown curry counter. Mai at the till takes the order the chain way — rice size, spice level 1–10,
   toppings — and Kenji at the station really builds the plate: a scoop of rice from the big jar, a ladle of roux from the
   simmering pot, and for katsu a cutlet out of the fryer basket, sliced and laid on top. Wall: the famous spice ladder
   (1 = mild … 10 = "only if you dare") and a toppings board. Window: a covered shōtengai arcade street with bicycles,
   shop awnings and paper-lantern evenings. Signatures: LEVEL 10 CHALLENGE — someone orders 10, steam pours off their
   head ("辛っ!!"), Mai runs a water jug over and the room cheers · RICE JAR — the giant jar vents a cloud of steam.
   Clock 11:00 lunch rush -> afternoon -> dinner -> late. Blocks: katsu · rice · roux · fukujinzuke · cheese · spinach · nasu. */
(() => {
  WORLD_DEFS.push({
    id: 'curry', name: 'Curry House', sub: 'カレー · spice level 1 to 10, katsu on top', thumbY: 0.42,
    desc: 'A sunny curry counter: rice from the giant jar, roux from the simmering pot, katsu from the fryer, a spice ladder from 1 to 10 on the wall and a shopping-arcade street outside — bouncy brass-and-marimba lunch funk.',
    accent: '#f0b020', accent2: '#8a4a1e', skin: 'curry', particle: 'steam',
    boardBg: 'rgba(34,20,10,0.9)', grid: 'rgba(255,210,120,0.07)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 104, root: 55, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 3, 4, 3], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1800, gain: 0.024, detune: 6, voices: 3 },
      comp: { inst: 'rhodes', pattern: E16('x..x..x...x..x..'), voices: 3, gain: 0.032, oct: 0 },
      arp: { inst: 'marimba', pattern: [0, 2, 4, 2, 5, 4, 2, 1], every: 2, oct: 1, gain: 0.075, density: 0.8 },
      bass: { pattern: E16('x..x..x.x..x....'), gain: 0.18, dec: 0.22, wave: 'triangle' },
      drums: { kick: E16('x.....x...x.....'), snareInst: 'clap', snare: E16('....x.......x...'), hat: E16('x.x.x.x.x.x.x.x.'), extra: E16('.......x.......x'), extraInst: 'wood' },
      lead: { inst: 'horn', gain: 0.045, density: 0.16, oct: 0 }, sfx: 'marimba', clearFx: 'sizzle',
      amb: { chatter: 0.022, clink: 0.02 },
    },
  });
  const CurPal = GeoCafePal({
    day: { wall: '#f6e6c0', wall2: '#efd9a8', trim: '#e8a818', band: '#7a3e16', wood: '#b08050', woodDk: '#5a3418', floor: '#c8b8a0', floor2: '#b4a48c', cnt: '#f0c030', cnt2: '#c89a20', steel: '#c8ccd0', glass: '#e4eef4', sign: '#f0b020',
      sky0: '#e8eef2', sky1: '#f8f4ea', out1: '#e8dccc', out2: '#c8b8a4', out3: '#7a6a5a', road: '#c8c0b4', lit: '#ffe8b0', litA: 0.2, awn: '#3a7a5a', awn2: '#c83a3a', lamp: '#fff4dc', glow: '#ffe8b0', glowA: 0.1, shaft: '#fff8e8', shaftA: 0.12, amb: '#ffffff', ambK: 0, sun: '#fff4e0', cloud: '#ffffff' },
    dusk: { wall: '#e8d0a4', wall2: '#dcc090', trim: '#d89a14', band: '#6a3412', wood: '#9a6c40', woodDk: '#4a2a12', floor: '#b4a48a', floor2: '#a09076', cnt: '#e0b02a', cnt2: '#b4881a', steel: '#b8b0b4', glass: '#d8d0e0', sign: '#f8b820',
      sky0: '#d8b8a0', sky1: '#f0d8b0', out1: '#c8b4a0', out2: '#a08a78', out3: '#5a4a40', road: '#a89c90', lit: '#ffd890', litA: 0.6, awn: '#2e6a4a', awn2: '#b0322e', lamp: '#ffe0a8', glow: '#ffc870', glowA: 0.3, shaft: '#ffd0a0', shaftA: 0.08, amb: '#ffd8b8', ambK: 0.05, sun: '#ffa060', cloud: '#e0b8a8' },
    night: { wall: '#8a7458', wall2: '#806a4e', trim: '#b88412', band: '#4a2410', wood: '#6a4a2c', woodDk: '#2e1a0a', floor: '#6e6252', floor2: '#625646', cnt: '#a8841e', cnt2: '#806214', steel: '#8a8488', glass: '#8a98b0', sign: '#ffc030',
      sky0: '#2a2430', sky1: '#3a3038', out1: '#6a5a50', out2: '#4a3e38', out3: '#2a221e', road: '#4a4440', lit: '#ffd070', litA: 1, awn: '#1e4a34', awn2: '#802420', lamp: '#ffd890', glow: '#ffb050', glowA: 0.42, shaft: '#ffc080', shaftA: 0, amb: '#3a3048', ambK: 0.1, sun: '#f4ecd8', cloud: '#3a3040' },
    snow: { road: '#e0e0e4' },
  }, [[6, 'night'], [9, 'day'], [16.5, 'day'], [18, 'dusk'], [19.5, 'night'], [30, 'night'], [33, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 14 ? 'Lunch rush' : h >= 14 && h < 17.5 ? 'Afternoon' : h >= 17.5 && h < 21.5 ? 'Dinner' : 'Late plate'; });
  const MENU = [{ n: 'Pork katsu curry', c: '#d89a48', plate: 1, top: 'katsu' }, { n: 'Cheese curry', c: '#f4c848', plate: 1, top: 'cheese' }, { n: 'Spinach curry', c: '#4a8a30', plate: 1, top: 'spin' },
    { n: 'Plain curry · 5', c: '#6a3412', plate: 1, top: '' }, { n: 'Eggplant curry', c: '#4a2a4a', plate: 1, top: 'nasu' }, { n: 'Mango lassi', c: '#f8c860', cup: 1 }];
  let jar = 0, fry = 0, ladle = 0, chal = null;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'curry', pal: CurPal, stationX: 94, startHour: 11, span: 12, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(40,20,0,0.26)', zone: 'rgba(255,248,230,0.26)',
    per: (h) => { const x = h < 6 ? h + 24 : h; return x < 14 ? 0 : x < 17.5 ? 1 : x < 21.5 ? 2 : x < 24.4 ? 3 : 4; },
    staff: [{ T: 228, hw: 56, headR: 28, pattern: 'polo', top: 'mustard', top2: 'brown', hairStyle: 'bun', hair: 'dark', hat: 'visor', hatCol: 'brown', pants: 'dark' },
      { T: 242, hw: 62, headR: 29, pattern: 'apron', top: 'brown', top2: 'mustard', shirt: 'mustard', hairStyle: 'short', hat: 'cap', hatCol: 'brown', pants: 'dark' }],
    menu: MENU, greet: ['Irasshaimase!', 'Rice size? Spice level?', 'Hi! Which level?'], ack: ['One katsu, level 3!', 'Hai!', 'Coming up'], handOff: ['Omatase!', 'Careful, hot', 'Enjoy!'],
    thanks: ['Arigatō!', 'Smells amazing', 'icon:heart'], done: ['Gochisō-sama!', 'Level 4 next time', 'icon:heart'], cheer: ['Umai!', 'Yatta!', 'Nice!'],
    types: {
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'mustard', hairStyle: 'short', pants: 'navy' }, words: ['Lunch in 20 min', 'Katsu, always'] },
      student: { body: { T: 214, hw: 54, pattern: 'jacket', top: 'navy', shirt: 'white', tie: 'coral', backpack: 1, packCol: 'mustard', hairStyle: 'short', pants: 'grey' }, words: ['Large rice!', 'Level 2…'] },
      builder: { body: { pattern: 'hivis', top: 'coral', shirt: 'grey', hat: 'kerchief', hatCol: 'white', pants: 'olive' }, words: ['600g rice', 'Starving'] },
      chal: { body: { pattern: 'tee', top: 'white', print: 1, top2: 'coral', hat: 'band', hatCol: 'coral', hairStyle: 'short', pants: 'navy' }, words: ['Level 10.', 'I can do this'], chal: 1 },
      mum: { body: { T: 228, hw: 58, pattern: 'cardigan', top: 'teal', top2: 'cream', hairStyle: 'long', hair: 'brown' }, words: ['Kids curry, mild', 'icon:heart'] },
      kid: { body: { T: 150, hw: 50, headR: 30, pattern: 'tee', top: 'mustard', hat: 'cap', hatCol: 'coral', pants: 'navy' }, words: ['Curry!!', 'icon:heart'], small: 1 },
      tourist: { body: { pattern: 'tee', top: 'olive', hat: 'bucket', hatCol: 'cream', camera: 1, pants: 'brown' }, words: ['Japanese curry!', 'icon:cam'] },
    },
    parties: [{ m: ['sala'], w: [3, 1, 2, 1, 0] }, { m: ['student'], w: [2, 3, 2, 0, 0] }, { m: ['builder'], w: [3, 1, 2, 1, 0] }, { m: ['chal'], w: [1, 1, 2, 2, 0] }, { m: ['mum', 'kid'], w: [2, 2, 2, 0, 0] }, { m: ['tourist'], w: [1, 2, 2, 1, 0] }],
    sim(X, dt) { jar = Math.max(0, jar - dt * 0.18); fry = Math.max(0, fry - dt * 0.5); ladle = Math.max(0, ladle - dt * 0.6);
      if (chal && !chal.gone && chal.item && Math.random() < dt * 3) X.K.fx('puff', chal.hx + rand(-10, 10), (chal.hy || 400) - 40, { life: 1.2, col: '#ffffff' }); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.cup) return [K.ph(1.6, (s, u, t) => { s.hold.N = H.tool('shaker'); s.tgN = [ST.x + 24 + Math.sin(t * 30) * 3, CNT.top - 54 + Math.cos(t * 30) * 4]; s.f = 1; it.o.frac = u; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })];
      const ph = [K.ph(0.8, (s, u) => { s.hold.N = H.tool('paddle'); s.tgN = [26, CNT.top - 44]; s.leanT = 0.2; s.f = -1; it.o.frac = u * 0.35; jar = Math.max(jar, 0.4); }, { exit: (s) => { s.hold.N = null; } }),
        K.ph(1.0, (s, u, t) => { s.hold.N = H.tool('ladle'); ladle = 1; s.f = -1; s.tgN = [64 + Math.sin(t * 6) * 6, CNT.top - 46]; s.leanT = 0.15; it.o.frac = 0.35 + u * 0.4; if (Math.random() < 0.04) K.fx('puff', 64, CNT.top - 60, { life: 1, col: '#fff4e0' }); }, { exit: (s) => { s.hold.N = null; } })];
      if (m.top === 'katsu') ph.push(K.ph(1.0, (s, u, t) => { fry = 1; s.hold.N = H.tool('basket'); s.f = 1; s.tgN = [160, CNT.top - 26 - Math.abs(Math.sin(t * 8)) * 6]; s.leanT = 0.12; it.o.frac = 0.75 + u * 0.15; if (Math.random() < 0.08) K.fx('spark', 160, CNT.top - 24, { life: 0.4, col: '#ffe0a0' }); }, { exit: (s) => { s.hold.N = null; } }));
      ph.push(K.ph(0.6, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 24]; s.tgF = [ST.x + 44, CNT.top - 18]; it.o.frac = 0.9 + u * 0.1; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'stir', [K.ph(rand(2.4, 3.4), (s, u, t) => { s.hold.N = H.tool('ladle'); ladle = Math.max(ladle, 0.5); s.f = -1; s.tgN = [64 + Math.cos(t * 3) * 10, CNT.top - 48 + Math.sin(t * 3) * 3]; s.look = { x: () => 64, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K; return K.start(a, 'water', [K.ph(rand(1.6, 2.4), (s, u) => { s.hold.N = H.tool('jug'); s.tgN = [s.hx + 26, s.hy - 64 + Math.sin(u * 6) * 3]; s.look = { x: () => s.hx + 40, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'paddle') { c.fillStyle = L('#f4ecd8'); ellipse(c, x, y - 6 * s, 4 * s, 6 * s); c.fill(); c.fillStyle = L('#fbf8f2'); c.beginPath(); c.arc(x, y - 9 * s, 3 * s, 0, TAU); c.fill(); }
      else if (k === 'ladle') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 2 * s, y - 14 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x, y + 2 * s, 4.5 * s, 0, Math.PI); c.fill(); c.fillStyle = L('#7a3e14'); c.fillRect(x - 4 * s, y + 1 * s, 8 * s, 2 * s); }
      else if (k === 'basket') { c.strokeStyle = L('#8a8a90'); c.lineWidth = 1.4 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10 * s, y - 2 * s); c.stroke(); c.fillStyle = L('#d89a48'); roundRect(c, x - 2 * s, y - 2 * s, 14 * s, 6 * s, 2 * s); c.fill(); c.strokeStyle = L('#a8a8b0'); c.strokeRect(x - 3 * s, y - 3 * s, 16 * s, 8 * s); }
      else if (k === 'shaker' || k === 'jug') { c.fillStyle = k === 'jug' ? 'rgba(220,235,250,0.75)' : L('#c8ccd0'); K0(c, [x - 5 * s, y - 14 * s, x + 5 * s, y - 14 * s, x + 4 * s, y, x - 4 * s, y]); c.fill(); if (k === 'jug') { c.fillStyle = 'rgba(170,210,240,0.7)'; c.fillRect(x - 4 * s, y - 9 * s, 8 * s, 8 * s); } }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.plate) { c.fillStyle = L('#fbf8f2'); ellipse(c, 0, -2, 13, 3.4); c.fill(); c.strokeStyle = L('#e8b020'); c.lineWidth = 0.8; ellipse(c, 0, -2, 12, 3); c.stroke();
        if (frac > 0.04) { const k = Math.min(1, frac / 0.35); c.fillStyle = L('#fbf8f2'); ellipse(c, -4, -4, 6 * k, 3 * k); c.fill(); if (frac > 0.35) { const r = Math.min(1, (frac - 0.35) / 0.4); c.fillStyle = L('#7a3e14'); ellipse(c, 3, -3.4, 7 * r, 2.6 * r); c.fill(); c.fillStyle = L('#e89a3a'); c.fillRect(1, -4.4, 1.6 * r, 1.4); c.fillStyle = L('#f0e0a0'); c.fillRect(5, -4, 1.6 * r, 1.4); }
          if (frac > 0.75 && m.top) { const col = { katsu: '#d89a48', cheese: '#f8d040', spin: '#3a7a28', nasu: '#4a2a4a' }[m.top]; c.fillStyle = L(col); for (let i = 0; i < 3; i++) roundRect(c, -2 + i * 3.4, -6.4, 3, 3, 1), c.fill(); }
          c.fillStyle = L('#c8202a'); ellipse(c, -9, -3, 2, 1.2); c.fill(); } }
      else { c.fillStyle = 'rgba(230,240,250,0.55)'; c.fillRect(-4, -15, 8, 15); if (frac > 0.04) { c.fillStyle = L('#f8c860'); c.fillRect(-3.6, -14 + (1 - frac) * 13, 7.2, frac * 13.5); } c.strokeStyle = L('#f0e0b0'); c.lineWidth = 1.1; c.beginPath(); c.moveTo(1, -15); c.lineTo(3, -20); c.stroke(); }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.curry = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620); for (let i = 0; i < 40; i++) { c.fillStyle = P.wall2; c.fillRect(-60 + i * 40, 300, 20, 360); }
      c.fillStyle = P.band; c.fillRect(-60, 0, 1400, 44); c.fillStyle = P.trim; c.fillRect(-60, 44, 1400, 12); c.fillStyle = P.band; c.fillRect(-60, 290, 1400, 10);
      // left strip: the spice ladder 1–10 + a toppings board
      { const x0 = 34, y0 = 70; c.fillStyle = L('#fbf8f2'); roundRect(c, x0 - 6, y0 - 6, 228, 82, 6); c.fill(); c.fillStyle = L('#5a2a10'); c.font = '800 12px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SPICE LEVEL', x0 + 108, y0 + 6);
        for (let i = 0; i < 10; i++) { const bx = x0 + i * 21.6; c.fillStyle = L(mix('#f8d860', '#c8101a', i / 9)); roundRect(c, bx + 1, y0 + 18, 19, 30, 3); c.fill(); c.fillStyle = L(i < 5 ? '#5a2a10' : '#fbf8f2'); c.font = '800 13px "Trebuchet MS", sans-serif'; c.fillText(String(i + 1), bx + 10.5, y0 + 33); if (i >= 8) { c.fillStyle = L('#c8101a'); K0(c, [bx + 10, y0 + 52, bx + 5, y0 + 64, bx + 10, y0 + 60, bx + 15, y0 + 64]); c.fill(); } }
        c.fillStyle = L('#5a2a10'); c.font = '600 9px "Trebuchet MS", sans-serif'; c.textAlign = 'left'; c.fillText('mild', x0 + 2, y0 + 58); c.textAlign = 'right'; c.fillText('only if you dare', x0 + 214, y0 + 66); }
      { const x0 = 34, y0 = 166; c.fillStyle = P.band; roundRect(c, x0 - 6, y0 - 6, 228, 80, 6); c.fill(); c.fillStyle = P.sign; c.font = '800 12px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('TOPPINGS', x0 + 108, y0 + 6);
        const tops = [['katsu', '#d89a48'], ['cheese', '#f8d040'], ['spinach', '#3a7a28'], ['eggplant', '#4a2a4a'], ['egg', '#f8f0d8']];
        tops.forEach(([n, col], i) => { const cx = x0 + 22 + i * 43; c.fillStyle = L('#fbf8f2'); ellipse(c, cx, y0 + 34, 18, 12); c.fill(); c.fillStyle = L('#7a3e14'); ellipse(c, cx + 3, y0 + 35, 11, 7); c.fill(); c.fillStyle = L(col); roundRect(c, cx - 4, y0 + 28, 10, 8, 3); c.fill(); c.fillStyle = L('#fbf8f2'); c.font = '600 9px "Trebuchet MS", sans-serif'; c.fillText(n, cx, y0 + 60); }); }
      // right strip: a big friendly sign over the window
      { const x0 = 1050, y0 = 62; c.fillStyle = P.sign; roundRect(c, x0, y0, 180, 36, 8); c.fill(); c.fillStyle = P.band; c.font = '900 17px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CURRY HOUSE', x0 + 98, y0 + 19);
        c.strokeStyle = P.band; c.lineWidth = 3; c.beginPath(); c.ellipse(x0 + 18, y0 + 20, 6, 8, 0.5, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(x0 + 22, y0 + 26); c.lineTo(x0 + 30, y0 + 34); c.stroke(); }
    },
    lamps: [262, 1018],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.band; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = P.band; c.fillRect(x0, y0 + 170, x1 - x0, 6); c.fillStyle = 'rgba(255,255,255,0.75)'; c.font = '800 12px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = 'rgba(255,255,255,0.1)'; K0(c, [x0 + 30, y0, x0 + 80, y0, x0 + 30, y1, x0 - 20, y1]); c.fill(); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0;
      // a covered shōtengai: skylight roof, two rows of little shops with awnings and lanterns, bicycles, passers-by
      c.fillStyle = P.sky1; c.fillRect(x0, y0, w, hh); c.fillStyle = P.out3; for (let i = 0; i < 8; i++) { c.fillRect(x0 + i * 28, y0, 3, 60); } c.fillStyle = rgba(P.sky0, 0.9); K0(c, [x0, y0, x1, y0, x1, y0 + 40, x0, y0 + 60]); c.fill(); c.strokeStyle = P.out3; c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(x0, y0 + 10 * i); c.lineTo(x1, y0 + 8 * i); c.stroke(); }
      for (let i = 0; i < 3; i++) { const sx = x0 + i * 72; c.fillStyle = i % 2 ? P.out1 : P.out2; c.fillRect(sx, y0 + 60, 72, 230); c.fillStyle = rgba(P.lit, 0.35 + 0.65 * P.litA); c.fillRect(sx + 8, y0 + 160, 56, 90); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(sx + 8, y0 + 206, 56, 3);
        const ac = i === 1 ? P.awn2 : P.awn; for (let k = 0; k < 4; k++) { c.fillStyle = k % 2 ? ac : L('#f4ecd8'); K0(c, [sx + 4 + k * 16, y0 + 130, sx + 20 + k * 16, y0 + 130, sx + 22 + k * 16, y0 + 154, sx + 2 + k * 16, y0 + 154]); c.fill(); }
        c.fillStyle = L(['#c83a3a', '#f4ecd8', '#3a5a8a'][i]); c.fillRect(sx + 14, y0 + 90, 44, 26); c.fillStyle = L(i === 1 ? '#3a2a1a' : '#fbf8f2'); c.font = `400 14px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(['花', '本', '茶'][i], sx + 36, y0 + 103);
        c.fillStyle = L('#e8402e'); ellipse(c, sx + 66, y0 + 76, 6, 8); c.fill(); if (P.night > 0.3) K.glow(c, sx + 66, y0 + 76, 26, '#ff8040', 0.3 * P.night); }
      c.fillStyle = P.road; c.fillRect(x0, y0 + 290, w, hh - 290); c.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < 8; i++) c.fillRect(x0 + i * 28, y0 + 290, 14, hh - 290);
      for (let i = 0; i < 3; i++) { const bx = x0 + 30 + i * 60, by = y0 + 300; c.strokeStyle = L(['#3a5a8a', '#c8c8cc', '#c83a3a'][i]); c.lineWidth = 2.4; c.beginPath(); c.arc(bx - 12, by, 9, 0, TAU); c.arc(bx + 12, by, 9, 0, TAU); c.moveTo(bx - 12, by); c.lineTo(bx - 2, by - 14); c.lineTo(bx + 12, by); c.moveTo(bx - 2, by - 14); c.lineTo(bx + 8, by - 14); c.stroke(); c.fillStyle = L('#c8c8cc'); c.fillRect(bx + 6, by - 22, 10, 7); }
      { const px = x0 + ((t * 18) % (w + 80)) - 40, py = y0 + 286; c.fillStyle = L('#2a3a5a'); c.fillRect(px - 6, py - 40, 12, 26); c.fillStyle = L('#2a2a2e'); c.fillRect(px - 5, py - 14, 4, 14); c.fillRect(px + 1, py - 14, 4, 14); c.fillStyle = L('#ecb88e'); c.beginPath(); c.arc(px, py - 46, 6, 0, TAU); c.fill(); if (K.weatherNow === 'rain' || K.weatherNow === 'storm') { c.fillStyle = L('#c83a3a'); c.beginPath(); c.arc(px, py - 54, 16, Math.PI, TAU); c.fill(); } }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let r = 0; r < 4; r++) for (let i = 0; i < 40; i++) { c.fillStyle = (i + r) % 2 ? P.floor2 : P.floor; c.fillRect(-60 + i * 36, 642 + r * 24, 36, 24); } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      c.fillStyle = L('#f4f0e8'); c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // giant rice jar (left), simmering roux pot (middle), fryer (right of the pot)
      { const jx = 24, jy = top - 6; c.fillStyle = L('#f4f0e8'); roundRect(c, jx - 22, jy - 50, 44, 50, 10); c.fill(); c.fillStyle = L('#c8ccd0'); ellipse(c, jx, jy - 50, 20, 6); c.fill(); c.fillStyle = L('#c8202a'); c.fillRect(jx - 22, jy - 30, 44, 5); c.fillStyle = L('#8a8a90'); c.fillRect(jx - 4, jy - 58, 8, 4);
        const st = 0.2 + jar * 0.8; for (let k = 0; k < 4; k++) { const ph = (t * 0.4 + k * 0.25) % 1; c.fillStyle = rgba('#ffffff', st * 0.5 * (1 - ph)); c.beginPath(); c.arc(jx + Math.sin(t + k) * 6, jy - 60 - ph * (60 + jar * 60), 6 + ph * (12 + jar * 14), 0, TAU); c.fill(); } }
      { const px = 64, py = top - 6; c.fillStyle = L('#8a8a90'); K0(c, [px - 24, py - 36, px + 24, py - 36, px + 20, py, px - 20, py]); c.fill(); c.fillStyle = L('#5a3010'); ellipse(c, px, py - 36, 23, 5); c.fill(); c.fillStyle = 'rgba(255,190,120,0.4)'; ellipse(c, px - 6, py - 37, 8, 1.6); c.fill();
        for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k * 0.33) % 1; c.fillStyle = rgba('#7a3e14', 0.8 * (1 - ph)); c.beginPath(); c.arc(px - 12 + k * 12, py - 37 - ph * 3, 2 + ph * 2, 0, TAU); c.fill(); }
        c.fillStyle = L('#c8ccd0'); c.fillRect(px + 22, py - 30, 8, 4); c.fillRect(px - 30, py - 30, 8, 4); }
      { const fx = 160, fy = top - 6; c.fillStyle = L('#b8bcc0'); c.fillRect(fx - 18, fy - 24, 36, 24); c.fillStyle = L('#c89a30'); c.fillRect(fx - 15, fy - 22, 30, 5); if (fry > 0.05) for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(255,240,200,0.8)'; c.beginPath(); c.arc(fx - 12 + k * 5, fy - 23 - Math.abs(Math.sin(t * 20 + k)) * 4 * fry, 1.4, 0, TAU); c.fill(); } }
      c.fillStyle = L('#2a2a30'); c.fillRect(204, top - 26, 32, 20); c.fillStyle = L('#f0b020'); c.fillRect(208, top - 23, 24, 7);
      // counter front: brown with the yellow stripe, a row of water glasses + spice shakers
      c.fillStyle = P.band; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 24, x1 - x0 + 12, 22); c.fillStyle = P.band; c.font = '900 13px "Trebuchet MS", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CURRY · RICE · KATSU', (x0 + x1) / 2, top + 36);
      for (let i = 0; i < 5; i++) { c.fillStyle = P.cnt2; c.fillRect(x0 + 10 + i * 46, top + 60, 34, 70); c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(x0 + 10 + i * 46, top + 60, 34, 6); }
    },
    events: [
      { name: 'level-10', dur: 14, start(X, srv) { const K = X.K, eat = K.actors.filter((q) => q.cust && q.item); const who = eat.find((q) => q.def.chal) || eat[0]; if (!who) { K.say(srv, 'Level 10, anyone?', 1.5); return; } chal = who; K.say(who, '辛っ!!', 1.8); K.after(0.8, () => K.say(srv, 'Water! Water!', 1.5)); K.after(1.6, () => { for (const c of K.actors.filter((q) => q.cust && q !== who)) { c.look = { x: () => who.hx, until: K.simT + 4 }; K.say(c, pick(['Ganbare!', 'icon:laugh', 'Level 10?!']), 1.4); } }); K.after(5, () => K.say(who, pick(['…Umai!', 'Again!']), 1.6)); },
        end() { chal = null; } },
      { name: 'rice-jar', dur: 8, start(X, srv, mk) { const K = X.K; jar = 1; K.fx('puff', 24, X.CNT.top - 70, { life: 2, col: '#ffffff' }); K.say(mk, 'Fresh rice!', 1.4); for (const c of K.actors.filter((q) => q.cust)) { if (Math.random() < 0.6) K.say(c, pick(['icon:heart', 'Smells good', 'icon:star']), 1.2); } } },
    ],
  };
  registerStage('curry', makeGeoCafe(W));
})();
