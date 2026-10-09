/* ================= NEW WORLD · Cinema Lobby — GEOMETRIC edition =================
   An art-deco picture palace lobby. Rosa works the till and tears ticket stubs; Theo runs the concession — the popcorn
   kettle tips and kernels pop up the glass, the soda fountain fills, cheese is pumped over nachos. A lobby screen on the
   left wall loops trailers. Guests take their snacks to the ledge by the glass front: the street outside under our own
   bulb-lit marquee canopy, taxis passing, rain on the pavement. Signature: PREMIERE NIGHT — searchlights sweep the sky,
   a red carpet rolls out and flashbulbs pop; everyone turns to the glass. Clock 13:00 matinee -> evening -> late show -> close.
   Blocks: hot dog · popcorn · nachos · blue slushie · soft pretzel · malt balls · mint pastilles. */
(() => {
  WORLD_DEFS.push({
    id: 'cinema', name: 'Cinema Lobby', sub: 'Picture palace · popcorn, trailers and premiere night', thumbY: 0.42,
    desc: 'An art-deco cinema lobby: a kettle popping corn up the glass, a soda fountain, trailers looping on the lobby screen and a bulb-lit marquee over a rainy street — and on premiere night, searchlights and flashbulbs. Brushed lobby jazz with vibraphone.',
    accent: '#e8b84a', accent2: '#c83a3a', skin: 'cinema', particle: 'star',
    boardBg: 'rgba(30,12,18,0.9)', grid: 'rgba(255,210,140,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 92, root: 58, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 5, 1, 4], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1500, gain: 0.026, detune: 5, voices: 4 },
      comp: { inst: 'rhodes', pattern: E16('x.....x...x.....'), voices: 4, gain: 0.034, oct: 0, strum: 0.012 },
      arp: { inst: 'vibes', pattern: [0, 4, 7, 9, 11, 9, 7, 4], every: 2, oct: 1, gain: 0.07, density: 0.7 },
      bass: { pattern: E16('x...x...x...x...'), walk: true, inst: 'upbass', gain: 0.22, dec: 0.42, oct: -1 },
      drums: { kick: E16('x.........x.....'), snareInst: 'brush', snare: E16('....x.......x...'), hat: E16('x.xxx.xxx.xxx.xx'), extra: E16('...............x'), extraInst: 'wood' },
      lead: { inst: 'horn', gain: 0.04, density: 0.12, oct: 0 }, sfx: 'vibes', clearFx: 'pop',
      amb: { chatter: 0.02, clink: 0.01 },
    },
  });
  const CinePal = GeoCafePal({
    day: { wall: '#7a2a34', wall2: '#6c2430', trim: '#c89a3a', gold: '#d8ac4c', wood: '#5a2a24', woodDk: '#2e1416', floor: '#5a1e28', floor2: '#3e1420', cnt: '#6a2630', cnt2: '#4a1820', steel: '#c4c4c8', glass: '#e4eef4', ruby: '#b8323a',
      sky0: '#8ab8e0', sky1: '#e4eef6', out1: '#b88a6a', out2: '#8a5a48', out3: '#5a5a62', walk: '#a8a4a0', road: '#5a5a60', lit: '#f8e8b0', litA: 0.08, bulb: '#fff0c0', bulbA: 0.5,
      lamp: '#fff0d0', glow: '#ffe0a8', glowA: 0.12, shaft: '#fff4e0', shaftA: 0.1, amb: '#ffffff', ambK: 0, sun: '#fff4e0', cloud: '#ffffff', scr: '#1a1a22' },
    dusk: { wall: '#6a2230', wall2: '#5c1c2a', trim: '#c08a34', gold: '#d0a044', wood: '#4e2420', woodDk: '#281012', floor: '#4e1a24', floor2: '#36101a', cnt: '#5c2028', cnt2: '#40141c', steel: '#b0a8b0', glass: '#d8d0e0', ruby: '#a82a34',
      sky0: '#3a3a78', sky1: '#f09a72', out1: '#9a6a5a', out2: '#6a4040', out3: '#3a3a48', walk: '#8a8088', road: '#44404a', lit: '#ffd890', litA: 0.6, bulb: '#ffe8a8', bulbA: 0.85,
      lamp: '#ffd890', glow: '#ffbe70', glowA: 0.3, shaft: '#ffc8a0', shaftA: 0.08, amb: '#ffc8b0', ambK: 0.06, sun: '#ffa070', cloud: '#c8a0b8', scr: '#14141c' },
    night: { wall: '#4a1622', wall2: '#40121e', trim: '#a87a2e', gold: '#c0923a', wood: '#3a1a18', woodDk: '#1e0a0c', floor: '#3a121a', floor2: '#280a12', cnt: '#481820', cnt2: '#300e16', steel: '#8a8490', glass: '#8a98b0', ruby: '#8e2230',
      sky0: '#060a1e', sky1: '#1a2244', out1: '#4a3a44', out2: '#2e2430', out3: '#22222e', walk: '#4a4650', road: '#22222a', lit: '#ffd070', litA: 1, bulb: '#ffe0a0', bulbA: 1,
      lamp: '#ffc870', glow: '#ffaa50', glowA: 0.48, shaft: '#ffc080', shaftA: 0, amb: '#2a2448', ambK: 0.14, sun: '#f4ecd8', cloud: '#2a3050', scr: '#0e0e16' },
    snow: { sky0: '#b4c0d0', sky1: '#e8ecf2', walk: '#e4e8ee', road: '#a8acb4' },
  }, [[6, 'night'], [10, 'day'], [16.5, 'day'], [18, 'dusk'], [19.5, 'night'], [30, 'night'], [34, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 17 ? 'Matinee' : h >= 17 && h < 20.5 ? 'Evening show' : h >= 20.5 && h < 24 ? 'Late show' : 'Last reel'; });
  const MENU = [{ n: 'Popcorn', c: '#f4e2a8', pop: 1 }, { n: 'Cola', c: '#3a1a12', cup: 1 }, { n: 'Blue slushie', c: '#2a7ae0', cup: 1, slush: 1 }, { n: 'Nachos', c: '#f0a020', tray: 1 },
    { n: 'Hot dog', c: '#b8402a', dog: 1 }, { n: 'Pretzel', c: '#8a4a1e', prz: 1 }];
  let pop = 0, spill = 0, prem = 0, flashes = [], car = { x: -1, col: '#e8b83a', t: 4 };
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  function popcornHeap(c, L, cx, cy, w, h, seed) { // little heap of puffs (held items + machine)
    for (let i = 0; i < 9; i++) { const u = (Math.sin(seed * 7 + i * 12.9898) * 43758.5453) % 1, v = (Math.sin(seed * 3 + i * 78.233) * 12345.678) % 1; const px = cx + (Math.abs(u) - 0.5) * w, py = cy - Math.abs(v) * h; c.fillStyle = L(i % 3 ? '#f8eccc' : '#f0d070'); c.beginPath(); c.arc(px, py, 2.4, 0, TAU); c.fill(); }
  }
  const W = {
    id: 'cinema', pal: CinePal, startHour: 13, span: 11, font: '700 15px Georgia, serif', vign: 'rgba(20,6,10,0.34)', zone: 'rgba(255,236,220,0.2)',
    per: (h) => { const x = h < 6 ? h + 24 : h; return x < 17 ? 0 : x < 20.5 ? 1 : x < 22.5 ? 2 : x < 24.4 ? 3 : 4; },
    staff: [{ T: 230, hw: 56, headR: 28, pattern: 'vest', top: 'ruby', shirt: 'white', tie: 'dark', hairStyle: 'bun', hair: 'dark', pants: 'dark' },
      { T: 244, hw: 62, headR: 29, pattern: 'stripe', top: 'ruby', top2: 'white', shirt: 'white', hairStyle: 'short', hat: 'paper', hatCol: 'white', pants: 'dark' }],
    menu: MENU, greet: ['Next please!', 'Hi! Which screen?', 'Evening! Combo?'], ack: ['Fresh batch!', 'Coming up', 'Extra butter?'], handOff: ['Enjoy the show!', 'Screen 3, on your left', 'Hot and buttery'],
    thanks: ['Thanks!', 'Perfect', 'icon:heart'], done: ['Trailers starting!', 'Best part', 'icon:heart'], cheer: ['Bravo!', 'Encore!', 'Two thumbs up!'],
    types: {
      dateA: { body: { T: 232, hw: 54, pattern: 'dress', top: 'plum', hairStyle: 'long', hair: 'brown' }, words: ['Back row?', 'icon:heart'] },
      dateB: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', hairStyle: 'short' }, words: ['Got the tickets', 'icon:heart'] },
      buff: { body: { pattern: 'coat', top: 'olive', top2: 'mustard', hat: 'beret', hatCol: 'dark', glasses: 1, pants: 'brown' }, words: ['Shot on 35mm!', "Director's cut"] },
      teen: { body: { pattern: 'hoodie', top: 'teal', hat: 'cap', hatCol: 'coral', pants: 'navy' }, words: ['Front row!', 'No spoilers!'] },
      mum: { body: { T: 228, hw: 58, pattern: 'cardigan', top: 'mustard', top2: 'cream', hairStyle: 'long', hair: 'brown' }, words: ['Sit still, ok?', 'Share it'] },
      kid: { body: { T: 156, hw: 50, headR: 30, pattern: 'tee', top: 'coral', hat: 'cap', hatCol: 'navy', pants: 'navy' }, words: ['Popcorn!!', 'Is it 3D?'], small: 1 },
      critic: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'dark', glasses: 1, hair: 'hairGrey', hairStyle: 'short' }, words: ['Hmm. Four stars?', 'Taking notes'] },
      nana: { body: { T: 224, hw: 60, torso: 'round', pattern: 'cardigan', top: 'plum', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', glasses: 1 }, words: ['A double bill!', 'Like the old days'] },
    },
    parties: [{ m: ['dateA', 'dateB'], w: [1, 3, 3, 2, 0] }, { m: ['buff'], w: [2, 2, 2, 2, 0] }, { m: ['teen'], w: [2, 2, 2, 1, 0] }, { m: ['mum', 'kid'], w: [3, 2, 0, 0, 0] }, { m: ['critic'], w: [1, 2, 1, 1, 0] }, { m: ['nana'], w: [3, 1, 0, 0, 0] }],
    sim(X, dt) { pop = Math.max(0, pop - dt * 0.6); spill = Math.max(0, spill - dt * 0.09); prem = Math.max(0, prem - dt * 0.055);
      car.t -= dt; if (car.x < 0 && car.t <= 0) { car.x = 0.0001; car.col = pick(['#e8b83a', '#e8b83a', '#3a4a6a', '#a83a3a', '#e8e4dc']); } if (car.x > 0) { car.x += dt * 0.12; if (car.x > 1.3) { car.x = -1; car.t = rand(4, 10); } }
      if (prem > 0.05 && Math.random() < dt * 2.2) flashes.push({ u: rand(0.1, 0.9), v: rand(0.72, 0.9), a: 1 }); flashes = flashes.filter((f) => (f.a -= dt * 3.5) > 0); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.pop) return [K.ph(0.7, (s) => { s.hold.N = H.tool('scoop'); s.tgN = [ST.x - 18, CNT.top - 34]; s.leanT = 0.2; pop = 1; }, { enter: () => K.fx('puff', ST.x - 20, CNT.top - 70, { life: 0.8, col: '#fff8e0' }) }),
        K.ph(1.1, (s, u) => { pop = 1; s.tgN = [ST.x + 6, CNT.top - 40]; s.tgF = [ST.x + 22, CNT.top - 24]; it.o.frac = u; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })];
      if (m.cup) return [K.ph(0.5, (s) => { s.hold.N = H.tool(m.slush ? 'cupS' : 'cupE'); s.tgN = [136, CNT.top - 22]; s.leanT = 0.15; }),
        K.ph(1.4, (s, u) => { s.tgN = [136, CNT.top - 22]; s.tgF = [140, CNT.top - 14]; it.o.frac = u; s.look = { x: () => 136, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })];
      return [K.ph(0.8, (s) => { s.hold.N = H.tool('tongs'); s.tgN = [ST.x - 30, CNT.top + 4]; s.leanT = 0.32; }, { enter: () => K.fx('puff', ST.x - 30, CNT.top - 6, { life: 1, col: '#ffffff' }) }),
        K.ph(0.9, (s, u) => { s.tgN = [ST.x + 4, CNT.top - 28]; s.tgF = [ST.x + 16, CNT.top - 18]; s.leanT = 0.1; it.o.frac = u; if (m.tray && Math.random() < 0.05) K.fx('puff', ST.x + 16, CNT.top - 30, { life: 0.8, col: '#ffd070' }); }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST, CNT = X.CNT; return K.start(a, 'kettle', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2.4, 3.4), (s, u, t) => { s.f = -1; pop = Math.max(pop, 0.45); s.tgN = [ST.x - 14 + Math.sin(t * 5) * 6, CNT.top - 60 + Math.cos(t * 5) * 4]; s.leanT = 0.15; s.look = { x: () => ST.x - 20, until: K.simT + 0.3 }; })]); },
    srvIdle(a, X, H) { const K = X.K; return K.start(a, 'stubs', [K.ph(rand(1.6, 2.4), (s, u, t) => { s.hold.N = H.tool('stub'); s.tgN = [s.hx + 22, s.hy - 70]; s.tgF = [s.hx + 30 + (u > 0.6 ? 8 : 0), s.hy - 72]; s.look = { x: () => s.hx + 26, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'scoop') { c.fillStyle = L('#c8ccd0'); K0(c, [x - 7 * s, y - 6 * s, x + 7 * s, y - 6 * s, x + 5 * s, y + 3 * s, x - 5 * s, y + 3 * s]); c.fill(); c.fillStyle = L('#f8eccc'); c.beginPath(); c.arc(x - 3 * s, y - 7 * s, 2.4 * s, 0, TAU); c.arc(x + 2 * s, y - 8 * s, 2.4 * s, 0, TAU); c.fill(); }
      else if (k === 'cupE' || k === 'cupS') { c.fillStyle = L(k === 'cupS' ? '#e8f0f8' : '#c83a3a'); K0(c, [x - 5 * s, y - 12 * s, x + 5 * s, y - 12 * s, x + 4 * s, y, x - 4 * s, y]); c.fill(); }
      else if (k === 'tongs') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 10 * s, y - 3 * s); c.moveTo(x, y); c.lineTo(x + 10 * s, y + 2 * s); c.stroke(); }
      else if (k === 'stub') { c.fillStyle = L('#f0d890'); c.fillRect(x - 3 * s, y - 7 * s, 6 * s, 12 * s); c.fillStyle = L('#c83a3a'); c.fillRect(x - 3 * s, y - 1 * s, 6 * s, 1 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.pop) { if (frac > 0.04) popcornHeap(c, L, 0, -12, 12, 3 + 5 * frac, 3); c.fillStyle = L('#f4f0e8'); K0(c, [-7, -13, 7, -13, 5, 0, -5, 0]); c.fill(); c.fillStyle = L('#c83a3a'); for (let i = 0; i < 3; i++) K0(c, [-6 + i * 4.7, -13, -4.4 + i * 4.7, -13, -3.4 + i * 3.6, 0, -4.4 + i * 3.6, 0]), c.fill(); }
      else if (m.cup) { if (m.slush) { c.fillStyle = L('#e8f0f8'); K0(c, [-5, -13, 5, -13, 4, 0, -4, 0]); c.fill(); if (frac > 0.04) { c.fillStyle = L('#2a7ae0'); c.fillRect(-4.4, -12 + (1 - frac) * 11, 8.8, (frac) * 11.5); } c.fillStyle = 'rgba(255,255,255,0.6)'; c.beginPath(); c.arc(0, -13, 5, Math.PI, TAU); c.fill(); }
        else { c.fillStyle = L('#c83a3a'); K0(c, [-5, -13, 5, -13, 4, 0, -4, 0]); c.fill(); c.strokeStyle = L('#ffffff'); c.lineWidth = 1.2; c.beginPath(); c.moveTo(-4.6, -7); c.quadraticCurveTo(0, -10, 4.6, -6); c.stroke(); c.fillStyle = L('#f4f0e8'); c.fillRect(-5.6, -14.4, 11.2, 1.8); }
        c.strokeStyle = L(m.slush ? '#e83a7a' : '#f4f0e8'); c.lineWidth = 1.2; c.beginPath(); c.moveTo(1, -14); c.lineTo(3, -20 + (1 - frac) * 2); c.stroke(); }
      else if (m.tray) { c.fillStyle = L('#2a2a2e'); K0(c, [-9, -4, 9, -4, 7, 0, -7, 0]); c.fill(); if (frac > 0.04) { const n = Math.ceil(frac * 5); for (let i = 0; i < n; i++) { c.fillStyle = L(i % 2 ? '#e8b850' : '#f0c868'); K0(c, [-7 + i * 3, -4, -4 + i * 3, -10 - (i % 2) * 2, -1 + i * 3, -4]); c.fill(); } c.fillStyle = L('#f0a020'); ellipse(c, 0, -5, 4 * frac + 1, 1.8); c.fill(); } }
      else if (m.dog) { c.fillStyle = L('#f4f0e8'); K0(c, [-10, -4, 10, -4, 8, 0, -8, 0]); c.fill(); if (frac > 0.04) { const w = 9 * frac + 1; c.fillStyle = L('#e0a85a'); roundRect(c, -w, -8, w * 2, 5, 2.5); c.fill(); c.fillStyle = L('#b8402a'); roundRect(c, -w - 1.5, -9, w * 2 + 3, 2.6, 1.3); c.fill(); c.strokeStyle = L('#f0c020'); c.lineWidth = 0.9; c.beginPath(); for (let i = 0; i <= 6; i++) { const xx = -w + i * w / 3; i ? c.lineTo(xx, -8.6 + (i % 2) * 1.2) : c.moveTo(xx, -8.6); } c.stroke(); } }
      else if (m.prz) { c.fillStyle = L('#f4f0e8'); c.fillRect(-8, -2, 16, 2); if (frac > 0.04) { const r = 3 + 4 * Math.sqrt(frac); c.strokeStyle = L('#8a4a1e'); c.lineWidth = 2.6; c.beginPath(); c.arc(-r * 0.45, -2 - r, r * 0.55, 0, TAU); c.moveTo(r * 1, -2 - r); c.arc(r * 0.45, -2 - r, r * 0.55, 0, TAU); c.stroke(); c.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) c.fillRect(-3 + i * 2, -2 - r * 1.5, 0.8, 0.8); } }
      c.restore(); },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      // velvet wall with gold deco pilasters, a zigzag frieze and a chasing-bulb ceiling strip
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620);
      for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(0,0,0,0.09)'; c.fillRect(-60 + i * 36 + 18, 64, 18, 596); }
      for (const px of [6, 1258]) { c.fillStyle = P.gold; c.fillRect(px - 6, 60, 12, 580); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(px + 2, 60, 4, 580); }
      c.fillStyle = P.woodDk; c.fillRect(-60, 0, 1400, 44); c.fillStyle = P.gold; c.fillRect(-60, 42, 1400, 4);
      c.fillStyle = P.trim; c.beginPath(); for (let x = -60; x < 1340; x += 24) { c.moveTo(x, 46); c.lineTo(x + 12, 60); c.lineTo(x + 24, 46); } c.closePath(); c.fill();
      for (let i = 0; i < 56; i++) { const bx = -40 + i * 24, on = ((i + Math.floor(t * 5)) % 4) !== 0; c.fillStyle = on ? rgba(P.bulb, 0.55 + 0.45 * P.bulbA) : L('#7a5a3a'); c.beginPath(); c.arc(bx, 22, 4.5, 0, TAU); c.fill(); if (on && P.bulbA > 0.6 && (bx < 260 || bx > 1020)) K.glow(c, bx, 22, 14, '#ffd890', 0.18); }
      // left strip: lobby trailer screen + lightbox concession menu
      { const x0 = 50, y0 = 68, w = 196, h = 82; c.fillStyle = L('#1a1214'); roundRect(c, x0 - 6, y0 - 6, w + 12, h + 12, 6); c.fill(); c.save(); c.beginPath(); c.rect(x0, y0, w, h); c.clip(); trailer(c, x0, y0, w, h, t, X); c.restore(); c.fillStyle = 'rgba(255,255,255,0.06)'; K0(c, [x0, y0, x0 + 60, y0, x0 + 20, y0 + h, x0, y0 + h]); c.fill(); }
      { const x0 = 44, y0 = 166, w = 208, h = 72; c.fillStyle = P.gold; roundRect(c, x0 - 3, y0 - 3, w + 6, h + 6, 4); c.fill(); c.fillStyle = L('#fbf3dc'); c.fillRect(x0, y0, w, h); c.fillStyle = L('#2a1418'); c.font = '700 13px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('★ CONCESSIONS ★', x0 + w / 2, y0 + 12);
        c.font = '600 10px Georgia, serif'; c.textAlign = 'left'; [['Popcorn', '4'], ['Nachos', '5'], ['Hot dog', '5'], ['Slushie', '3']].forEach(([n, p], i) => { const xx = x0 + 10 + (i % 2) * 100, yy = y0 + 34 + Math.floor(i / 2) * 20; c.fillStyle = L(['#c83a3a', '#f0a020', '#b8402a', '#2a7ae0'][i]); c.beginPath(); c.arc(xx + 4, yy, 4, 0, TAU); c.fill(); c.fillStyle = L('#2a1418'); c.fillText(n + ' · ' + p, xx + 12, yy + 1); }); }
      // right strip: deco "SCREENS" sign over the glass front
      { const x0 = 1052, y0 = 70, w = 176, h = 30; c.fillStyle = L('#1a1214'); roundRect(c, x0, y0, w, h, 5); c.fill(); c.fillStyle = rgba(P.bulb, 0.6 + 0.4 * P.bulbA); c.font = '700 14px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SCREENS 1 – 4  →', x0 + w / 2, y0 + h / 2 + 1); if (P.bulbA > 0.6) K.glow(c, x0 + w / 2, y0 + h / 2, 80, '#ffd890', 0.12); }
    },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.cinema = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    lamps: [262, 1018],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.gold; c.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); c.fillStyle = P.woodDk; c.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12); return; }
      c.fillStyle = P.gold; c.fillRect((x0 + x1) / 2 - 3, y0 + 120, 6, y1 - y0 - 120); c.fillRect(x0, y0 + 116, x1 - x0, 6);
      for (const hx of [(x0 + x1) / 2 - 22, (x0 + x1) / 2 + 10]) { c.fillStyle = P.gold; c.fillRect(hx, y0 + 250, 12, 4); }
      c.fillStyle = 'rgba(255,255,255,0.07)'; K0(c, [x0 + 20, y0 + 122, x0 + 70, y0 + 122, x0 + 30, y1, x0 - 20, y1]); c.fill(); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0;
      K.sky(c, x0, y0, x1, y1, { sunR: 13 });
      // searchlights (premiere)
      if (prem > 0.02) { for (let k = 0; k < 2; k++) { const a0 = -Math.PI / 2 + Math.sin(t * 0.5 + k * 2.2) * 0.55, bx = x0 + w * (k ? 0.78 : 0.22), by = y0 + hh * 0.7; c.fillStyle = rgba('#fff4d0', 0.34 * Math.min(1, prem * 2)); c.beginPath(); c.moveTo(bx - 3, by); c.lineTo(bx + Math.cos(a0 - 0.07) * 600, by + Math.sin(a0 - 0.07) * 600); c.lineTo(bx + Math.cos(a0 + 0.1) * 600, by + Math.sin(a0 + 0.1) * 600); c.lineTo(bx + 3, by); c.closePath(); c.fill(); } }
      // the building across the street
      c.fillStyle = P.out2; c.fillRect(x0, y0 + 120, w, hh - 120); c.fillStyle = P.out1; c.fillRect(x0 + 20, y0 + 104, w * 0.55, hh - 104); c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(x0 + 20, y0 + 104, w * 0.55, 6);
      for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++) { const wx = x0 + 32 + q * 28, wy = y0 + 126 + r * 40; const lit = ((r * 7 + q * 3) % 5) < 3; c.fillStyle = lit ? rgba(P.lit, 0.25 + 0.75 * P.litA) : L('#3a3440'); c.fillRect(wx, wy, 16, 24); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(wx, wy + 11, 16, 2); }
      { const sx = x0 + w * 0.7; c.fillStyle = L('#2a3a5a'); c.fillRect(sx, y0 + 140, 50, 110); c.fillStyle = rgba('#ff6a8a', 0.35 + 0.65 * P.litA); c.font = '700 13px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.save(); c.translate(sx + 25, y0 + 195); c.rotate(-Math.PI / 2); c.fillText('DINER', 0, 0); c.restore(); if (P.litA > 0.5) K.glow(c, sx + 25, y0 + 195, 50, '#ff6a8a', 0.18 * P.litA); }
      // pavement + road + a taxi
      c.fillStyle = P.walk; c.fillRect(x0, y0 + 270, w, 20); c.fillStyle = P.road; c.fillRect(x0, y0 + 290, w, hh - 290); c.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) c.fillRect(x0 + i * 44 + 6, y0 + 318, 22, 3);
      if (car.x > 0) { const cx = x0 - 70 + car.x * (w + 100), cy = y0 + 306; c.fillStyle = L(car.col); roundRect(c, cx - 34, cy - 12, 68, 16, 5); c.fill(); K0(c, [cx - 20, cy - 12, cx - 12, cy - 24, cx + 14, cy - 24, cx + 22, cy - 12]); c.fill(); c.fillStyle = L('#a8c4d8'); K0(c, [cx - 15, cy - 13, cx - 10, cy - 21, cx, cy - 21, cx, cy - 13]); c.fill(); K0(c, [cx + 3, cy - 13, cx + 3, cy - 21, cx + 12, cy - 21, cx + 17, cy - 13]); c.fill(); c.fillStyle = L('#1a1a1e'); c.beginPath(); c.arc(cx - 20, cy + 4, 6, 0, TAU); c.arc(cx + 20, cy + 4, 6, 0, TAU); c.fill(); if (P.night > 0.3) K.glow(c, cx + 36, cy - 4, 40, '#fff4c0', 0.4 * P.night); }
      // red carpet + rope stanchions + flashbulbs (premiere)
      if (prem > 0.02) { c.fillStyle = rgba('#c8202e', Math.min(1, prem * 3)); c.fillRect(x0 + w * 0.3, y0 + 270, w * 0.4, 20); for (let i = 0; i < 5; i++) { const sx = x0 + w * 0.26 + i * w * 0.12; c.fillStyle = rgba('#e8c050', Math.min(1, prem * 3)); c.fillRect(sx, y0 + 252, 3, 20); } for (const f of flashes) K.glow(c, x0 + f.u * w, y0 + f.v * hh * 0.4 + 180, 26, '#ffffff', f.a * 0.9); }
      // our marquee canopy underside along the top of the glass
      c.fillStyle = L('#1a1214'); c.fillRect(x0, y0, w, 26); c.fillStyle = P.gold; c.fillRect(x0, y0 + 24, w, 4);
      for (let i = 0; i < 9; i++) { const bx = x0 + 12 + i * 23, on = ((i + Math.floor(t * 4)) % 3) !== 0; c.fillStyle = on ? rgba(P.bulb, 0.5 + 0.5 * P.bulbA) : L('#6a4a2a'); c.beginPath(); c.arc(bx, y0 + 13, 4, 0, TAU); c.fill(); }
      if (P.bulbA > 0.6) { c.fillStyle = rgba('#ffd890', 0.1 * P.bulbA); c.fillRect(x0, y0 + 28, w, 260); }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P, L = X.L; // classic cinema carpet: gold diamonds + teal dots on burgundy
      for (let r = 0; r < 3; r++) for (let i = 0; i < 34; i++) { const cx = -40 + i * 40 + (r % 2) * 20, cy = 656 + r * 26; c.fillStyle = r % 2 ? P.floor2 : rgba(P.gold, 0.5); K0(c, [cx, cy - 8, cx + 10, cy, cx, cy + 8, cx - 10, cy]); c.fill(); c.fillStyle = L('#2a6a6a'); c.fillRect(cx + 18, cy - 2, 4, 4); }
      c.fillStyle = P.gold; c.fillRect(-60, 640, 1400, 3); },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      c.fillStyle = P.cnt2; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8); c.fillStyle = P.gold; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 2);
      // popcorn machine on the maker's side
      { const mx0 = 18, mx1 = 112, my0 = top - 104, my1 = top - 6; c.fillStyle = P.ruby; K0(c, [mx0 - 4, my0, mx1 + 4, my0, mx1 - 6, my0 - 18, mx0 + 6, my0 - 18]); c.fill(); c.fillStyle = L('#fbf3dc'); c.font = '700 10px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('POPCORN', (mx0 + mx1) / 2, my0 - 8);
        c.fillStyle = P.ruby; c.fillRect(mx0, my0, 6, my1 - my0); c.fillRect(mx1 - 6, my0, 6, my1 - my0); c.fillRect(mx0, my1 - 14, mx1 - mx0, 14);
        c.fillStyle = 'rgba(255,248,230,0.16)'; c.fillRect(mx0 + 6, my0, mx1 - mx0 - 12, my1 - my0 - 14); if (P.night > 0.2) K.glow(c, (mx0 + mx1) / 2, my0 + 30, 50, '#fff0c0', 0.2);
        const heap = 18 + spill * 30; c.fillStyle = L('#f4e2a8'); c.beginPath(); c.moveTo(mx0 + 6, my1 - 14); for (let i = 0; i <= 10; i++) c.lineTo(mx0 + 6 + i * (mx1 - mx0 - 12) / 10, my1 - 14 - heap - Math.sin(i * 1.7) * 3); c.lineTo(mx1 - 6, my1 - 14); c.closePath(); c.fill();
        c.fillStyle = L('#f0d070'); for (let i = 0; i < 12; i++) { c.beginPath(); c.arc(mx0 + 12 + (i * 37) % (mx1 - mx0 - 24), my1 - 18 - (i * 13) % heap, 2.6, 0, TAU); c.fill(); }
        const tilt = pop > 0.3 ? Math.sin(t * 9) * 0.25 : 0; c.save(); c.translate((mx0 + mx1) / 2, my0 + 18); c.rotate(tilt); c.fillStyle = L('#c4c4c8'); K0(c, [-18, -6, 18, -6, 14, 12, -14, 12]); c.fill(); c.fillStyle = L('#8a8a90'); c.fillRect(-2, -12, 4, 6); c.restore();
        const nP = Math.floor(4 + pop * 14 + spill * 16); for (let i = 0; i < nP; i++) { const ph = (t * (1.3 + (i % 3) * 0.3) + i * 0.37) % 1, kx = (mx0 + mx1) / 2 + Math.sin(i * 2.3) * 34 * ph, ky = my0 + 30 + ph * 50 - Math.sin(ph * Math.PI) * (20 + pop * 12); if (pop < 0.2 && spill < 0.1 && i > 3) break; c.fillStyle = L(i % 3 ? '#fbf3dc' : '#f0d070'); c.beginPath(); c.arc(kx, ky, 2.4, 0, TAU); c.fill(); }
        if (spill > 0.05) for (let i = 0; i < 10; i++) { const ph = (t * 0.8 + i * 0.13) % 1; c.fillStyle = L('#fbf3dc'); c.beginPath(); c.arc(mx0 + 10 + i * 9, my1 - 4 + ph * 30 * spill, 2.4, 0, TAU); c.fill(); } }
      // soda fountain + till
      { const fx = 124; c.fillStyle = L('#c4c4c8'); c.fillRect(fx, top - 52, 30, 46); c.fillStyle = L('#2a2a2e'); c.fillRect(fx + 3, top - 48, 24, 16); c.fillStyle = L('#c83a3a'); c.fillRect(fx + 4, top - 46, 10, 12); c.fillStyle = L('#2a7ae0'); c.fillRect(fx + 16, top - 46, 10, 12); c.fillStyle = L('#8a8a90'); c.fillRect(fx + 7, top - 32, 4, 6); c.fillRect(fx + 19, top - 32, 4, 6); }
      c.fillStyle = L('#2a2a30'); c.fillRect(206, top - 26, 32, 20); c.fillStyle = L('#5ac8a0'); c.fillRect(210, top - 23, 24, 7); c.fillStyle = P.gold; c.fillRect(204, top - 8, 36, 3);
      // glass candy case in the counter front
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top);
      c.fillStyle = L('#1a1214'); c.fillRect(x0 + 4, top + 12, x1 - x0 - 8, 62); c.fillStyle = rgba('#fff4d8', 0.14 + P.night * 0.1); c.fillRect(x0 + 4, top + 12, x1 - x0 - 8, 62);
      const box = ['#e8b03a', '#c83a3a', '#3a8a5a', '#2e5aa8', '#f4ecd8', '#84486e', '#e86a5e', '#2a1a14'];
      for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { c.fillStyle = L(box[(i * 3 + r * 5) % 8]); c.fillRect(x0 + 10 + i * 25, top + 20 + r * 28, 20, 20); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(x0 + 13 + i * 25, top + 24 + r * 28, 14, 3); }
      c.fillStyle = P.gold; c.fillRect(x0 + 4, top + 46, x1 - x0 - 8, 2); c.fillStyle = 'rgba(255,255,255,0.12)'; K0(c, [x0 + 20, top + 12, x0 + 60, top + 12, x0 + 40, top + 74, x0, top + 74]); c.fill();
      for (let i = 0; i < 5; i++) { c.fillStyle = P.gold; c.fillRect(x0 + 18 + i * 46, top + 86, 3, base - top - 96); }
    },
    events: [
      { name: 'premiere', dur: 18, start(X, srv) { const K = X.K; if (K.P.night < 0.4) return W.events[1].start(X, srv); prem = 1; K.say(srv, 'Premiere tonight!', 1.8); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: K.simT + 6 }; K.say(c, pick(['Is that…?!', 'icon:cam', 'icon:star', 'Wow!']), 1.4); } } },
      { name: 'popcorn-overflow', dur: 12, start(X, srv, mk) { const K = X.K; spill = 1; pop = 1; K.fx('puff', 64, X.CNT.top - 110, { life: 1.4, col: '#fff8e0' }); K.say(mk, 'Whoa — too much!', 1.6); K.after(1, () => K.say(srv, 'Free refills!', 1.4)); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 64, until: K.simT + 3 }; K.say(c, pick(['Ha!', 'icon:heart', 'Popcorn rain!']), 1.2); } } },
    ],
  };
  function trailer(c, x0, y0, w, h, t, X) { // the lobby screen loops four little trailers
    const P = X.K.P, sc = Math.floor(t / 7) % 4, u = (t % 7) / 7, fade = Math.min(1, u * 8, (1 - u) * 8);
    c.fillStyle = P.scr; c.fillRect(x0, y0, w, h);
    if (sc === 0) { c.fillStyle = '#2a1a3a'; c.fillRect(x0, y0, w, h); for (let k = 0; k < 2; k++) { c.fillStyle = 'rgba(255,240,200,0.14)'; c.beginPath(); c.moveTo(x0 + w * (0.3 + k * 0.4), y0 + h); c.lineTo(x0 + w * (0.1 + k * 0.4) + Math.sin(t + k) * 20, y0); c.lineTo(x0 + w * (0.3 + k * 0.4) + Math.sin(t + k) * 20, y0); c.closePath(); c.fill(); } c.fillStyle = '#f8e0a0'; c.font = '700 18px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('COMING SOON', x0 + w / 2, y0 + h / 2); }
    else if (sc === 1) { c.fillStyle = linear(c, 0, y0, 0, y0 + h, [[0, '#f08a4a'], [1, '#f8d08a']]); c.fillRect(x0, y0, w, h); c.fillStyle = '#f8f0c0'; c.beginPath(); c.arc(x0 + w * 0.5, y0 + h * 0.62, 18, 0, TAU); c.fill(); c.fillStyle = '#7a3a2a'; c.fillRect(x0, y0 + h * 0.66, w, h); c.fillStyle = '#4a1e18'; K0(c, [x0 + w * 0.4, y0 + h, x0 + w * 0.48, y0 + h * 0.66, x0 + w * 0.52, y0 + h * 0.66, x0 + w * 0.6, y0 + h]); c.fill(); const cx = x0 - 30 + u * (w + 60); c.fillStyle = '#1a0e0e'; c.fillRect(cx - 16, y0 + h * 0.74, 32, 8); c.fillRect(cx - 8, y0 + h * 0.68, 16, 7); }
    else if (sc === 2) { c.fillStyle = '#0a0e24'; c.fillRect(x0, y0, w, h); c.fillStyle = '#fff8e8'; for (let i = 0; i < 18; i++) c.fillRect(x0 + (i * 53) % w, y0 + (i * 29) % h, 1.5, 1.5); const ry = y0 + h * 0.8 - u * h * 0.9; c.fillStyle = '#e8e4dc'; K0(c, [x0 + w / 2 - 6, ry, x0 + w / 2, ry - 18, x0 + w / 2 + 6, ry, x0 + w / 2 + 6, ry + 16, x0 + w / 2 - 6, ry + 16]); c.fill(); c.fillStyle = '#ffb040'; K0(c, [x0 + w / 2 - 5, ry + 16, x0 + w / 2, ry + 30 + Math.sin(t * 30) * 3, x0 + w / 2 + 5, ry + 16]); c.fill(); }
    else { c.fillStyle = '#1a2a4a'; c.fillRect(x0, y0, w, h); for (let i = 0; i < 9; i++) { const bh = 18 + ((i * 37) % 30); c.fillStyle = '#0e1630'; c.fillRect(x0 + i * 22, y0 + h - bh, 20, bh); c.fillStyle = 'rgba(255,220,140,0.7)'; c.fillRect(x0 + i * 22 + 5, y0 + h - bh + 6, 3, 3); } const s = 1 + 0.1 * Math.sin(t * 3); c.fillStyle = '#ff6a8a'; c.save(); c.translate(x0 + w / 2, y0 + 28); c.scale(s, s); c.beginPath(); c.moveTo(0, 8); c.bezierCurveTo(-14, -2, -6, -12, 0, -4); c.bezierCurveTo(6, -12, 14, -2, 0, 8); c.fill(); c.restore(); }
    c.fillStyle = 'rgba(0,0,0,' + (1 - fade).toFixed(3) + ')'; c.fillRect(x0, y0, w, h);
  }
  registerStage('cinema', makeGeoCafe(W));
})();
