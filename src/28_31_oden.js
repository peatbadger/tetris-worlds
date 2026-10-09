/* ================= NEW WORLD · Oden Yatai — GEOMETRIC edition =================
   A Fukuoka street stall on the Naka river at night. Under a blue-and-white tarp and a string of red おでん lanterns, Taishō
   (hachimaki, indigo happi) ladles oden out of the partitioned pot — daikon gone amber, eggs, tendon skewers, kinchaku — with a
   dab of karashi; shakes a tebo basket of Hakata noodles in the tonkotsu pot (the quick "yuchiri" flick); warms atsukan in the
   copper kandoki. Mitsuko serves, pours beer, laughs with regulars. The "window" is the clear vinyl curtain every yatai rolls
   down: through it, the river with neon reflections wobbling, the bridge with taxis, Nakasu's signs. Wall: the cart's back panel
   with wooden menu tags, isshōbin sake bottles, the noren. Signatures: KANPAI — the whole counter raises glasses · FRESH POT —
   Taishō drops in new daikon, steam blooms, "shimitemasu yo!". Clock 18:00 dusk -> 02:00 (always evening — a yatai sleeps by day).
   Blocks: gyūsuji · daikon · konnyaku · chikuwa · tamago · kinchaku · hanpen. */
(() => {
  WORLD_DEFS.push({
    id: 'oden', name: 'Oden Yatai', sub: '屋台 · a Fukuoka street stall on the river at night', thumbY: 0.42,
    desc: 'A Fukuoka yatai on the Naka river: oden from the partitioned pot with karashi, Hakata ramen flicked in a tebo basket, warm sake, neon wobbling in the water through the vinyl curtain — slow enka-blues guitar.',
    accent: '#d84a32', accent2: '#f4c87a', skin: 'oden', particle: 'ember',
    boardBg: 'rgba(12,14,22,0.94)', grid: 'rgba(255,220,170,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 78, root: 57, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 3, 4], barsPerChord: 2,
      pad: { wave: 'sawtooth', cutoff: 700, gain: 0.016, detune: 6, voices: 3 },
      comp: { inst: 'nylon', pattern: E16('x..x..x...x..x..'), voices: 3, gain: 0.04, oct: 0 },
      arp: { inst: 'koto', pattern: [0, 2, 4, 2, 0, 4, 3, 2], every: 2, oct: 1, gain: 0.03, density: 0.35 },
      bass: { pattern: E16('x.....x...x.....'), gain: 0.16, dec: 0.3, wave: 'triangle' },
      drums: { kick: E16('x.......x.......'), snareInst: 'brush', snare: E16('....x.......x...'), hat: E16('..x...x...x...x.'), extra: E16('................'), extraInst: 'shaker' },
      lead: { inst: 'horn', gain: 0.03, density: 0.12, oct: 0 }, sfx: 'pluck', clearFx: 'clink',
      amb: { chatter: 0.016, clink: 0.014 },
    },
  });
  const NIGHT = { wall: '#2a2a3a', wall2: '#22222e', tarp: '#2a5aa8', tarp2: '#eef0f4', plank: '#7a5434', plank2: '#5e3e24', paper: '#f2e6c8', red: '#c8342a', redLit: '#ff6a44', lanA: 1,
    floor: '#3a3a42', floor2: '#30303a', wet: '#6a6a80', cnt: '#a87a4a', cnt2: '#5e3e24', steel: '#b8bcc4', wood: '#a87a4a', woodDk: '#5e3e24', ink: '#2a2420',
    sky0: '#0e1222', sky1: '#1c2236', river: '#141a2c', river2: '#1e2840', bld: '#20222e', bld2: '#2a2c3a', bridge: '#3a3c48', winA: 1,
    lamp: '#ffd8a0', glow: '#ffc890', glowA: 0.4, shaft: '#ffd090', shaftA: 0, amb: '#3a3050', ambK: 0.06, sun: '#f4ecd8', cloud: '#2a3040' };
  const DUSK = Object.assign({}, NIGHT, { wall: '#4a3a4a', wall2: '#3e3040', sky0: '#d88a6a', sky1: '#f0b890', river: '#5a4a5a', river2: '#8a6a6a', bld: '#4a3e4a', bld2: '#5a4a56', bridge: '#5a4e56', winA: 0.6, lanA: 0.7, glowA: 0.25, amb: '#ffb890', ambK: 0.05 });
  const OdenPal = GeoCafePal({ day: DUSK, dusk: DUSK, night: NIGHT, snow: { floor: '#d8dce2', floor2: '#c8ccd2', wet: '#e8ecf0' } },
    [[0, 'night'], [5, 'night'], [6, 'dusk'], [17.5, 'dusk'], [19.2, 'night'], [24, 'night']],
    (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 19 ? 'Opening up' : h >= 19 && h < 22 ? 'Evening' : h >= 22 || h < 0.5 ? 'Late' : 'Last orders'; });
  const MENU = [{ n: 'Oden, mixed plate', c: '#e0b46a', kind: 'oden' }, { n: 'Daikon & egg', c: '#ecc27a', kind: 'oden' }, { n: 'Hakata ramen', c: '#f4ecdc', kind: 'ramen' },
    { n: 'Atsukan (warm sake)', c: '#f4f0e6', kind: 'sake' }, { n: 'Draft beer', c: '#f0c040', kind: 'beer' }, { n: 'Gyūsuji skewers', c: '#6e3c1e', kind: 'oden' }];
  let potSteam = 0, tebo = 0, kanpai = 0, fresh = 0, sakeW = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'oden', pal: OdenPal, stationX: 96, startHour: 18, span: 8, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(8,8,20,0.3)', zone: 'rgba(30,30,46,0.3)',
    per: (h) => { const x = h < 6 ? h + 24 : h; return x < 19.5 ? 0 : x < 22 ? 1 : x < 24.5 ? 2 : 3; },
    staff: [{ T: 220, hw: 56, headR: 28, pattern: 'apron', top: 'plum', top2: 'cream', top3: 'coral', hairStyle: 'bun', hair: 'dark', hat: 'kerchief', hatCol: 'coral', pants: 'navy' },
      { T: 236, hw: 62, headR: 29, pattern: 'cardigan', top: 'navy', top2: 'white', hairStyle: 'buzz', hair: 'hairGrey', hat: 'hachimaki', hatCol: 'white', pants: 'navy' }],
    menu: MENU, greet: ['Irasshai!', 'Squeeze in, there\'s room', 'Cold out, ne'], ack: ['Hai yo!', 'Daikon, coming', 'Hai!'], handOff: ['Karashi\'s on the side', 'Hot, careful', 'Dōzo!'],
    thanks: ['Umaa…', 'icon:heart', 'Warms you up'], done: ['Gochisō-san!', 'icon:heart', 'Mata kuru yo'], cheer: ['Kanpai!', 'icon:star', 'Shimiteru~'],
    types: {
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', hairStyle: 'short', pants: 'navy' }, words: ['Atsukan, please', 'One more stop'] },
      sala2: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'blue', hairStyle: 'slick', glasses: 1, pants: 'grey' }, words: ['Boss is paying!', 'Daikon x2'] },
      ol: { body: { T: 216, hw: 54, pattern: 'jacket', top: 'cream', shirt: 'white', hairStyle: 'long', hair: 'brown', skirt: 'navy' }, words: ['Egg and kinchaku', 'Girls\' night'] },
      tour: { body: { pattern: 'tee', top: 'mustard', hat: 'beanie', hatCol: 'teal', camera: 1, backpack: 1, packCol: 'coral', pants: 'navy' }, words: ['First yatai!!', 'icon:cam'] },
      local: { body: { T: 214, hw: 58, pattern: 'cardigan', top: 'olive', top2: 'brown', hairStyle: 'short', hair: 'hairGrey', hat: 'flatcap', hatCol: 'brown', pants: 'brown' }, words: ['The usual', '40 years here'] },
      merry: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', hairStyle: 'short', pants: 'grey', hat: 'headband', hatCol: 'white' }, words: ['Kanpaaai!', 'icon:laugh'] },
      date: { body: { T: 218, hw: 54, pattern: 'cardigan', top: 'coral', top2: 'cream', hairStyle: 'bob', hair: 'dark', skirt: 'grey' }, words: ['So cosy', 'Share a ramen?'] },
    },
    parties: [{ m: ['sala', 'sala2'], w: [2, 3, 2, 1] }, { m: ['ol', 'ol'], w: [1, 3, 2, 0] }, { m: ['tour'], w: [2, 2, 1, 0] }, { m: ['local'], w: [3, 1, 1, 2] }, { m: ['merry'], w: [0, 1, 3, 3] }, { m: ['date', 'sala'], w: [1, 2, 2, 1] }],
    sim(X, dt) { potSteam = Math.max(0, potSteam - dt * 0.35); tebo = Math.max(0, tebo - dt * 1.2); kanpai = Math.max(0, kanpai - dt * 0.4); fresh = Math.max(0, fresh - dt * 0.15); sakeW = Math.max(0, sakeW - dt * 0.5); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'oden') { ph.push(K.ph(1.6, (s, u, t) => { potSteam = 1; s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [66 + Math.sin(t * 3) * 14, CNT.top - 30 + Math.abs(Math.sin(t * 6)) * 6]; s.leanT = 0.16; it.o.frac = u * 0.75; s.look = { x: () => 66, until: K.simT + 0.3 }; if (Math.random() < 0.04) K.fx('puff', 66, CNT.top - 40, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(0.6, (s, u) => { s.hold.N = H.tool('karashi'); s.f = 1; s.tgN = [126, CNT.top - 22]; it.o.frac = 0.75 + u * 0.1; }, { exit: (s) => { s.hold.N = null; } })); }
      else if (m.kind === 'ramen') { ph.push(K.ph(1.0, (s, u) => { s.hold.N = H.tool('tebo'); s.f = -1; s.tgN = [26, CNT.top - 34]; s.leanT = 0.1; it.o.frac = u * 0.3; s.look = { x: () => 26, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(0.9, (s, u, t) => { tebo = 1; s.hold.N = H.tool('tebo'); s.f = -1; s.tgN = [30, CNT.top - 44 - Math.abs(Math.sin(t * 16)) * 16]; s.leanT = 0.18; it.o.frac = 0.3 + u * 0.4; if (Math.random() < 0.2) K.fx('puff', 30, CNT.top - 40, { life: 0.5, col: '#ffffff' }); }, { enter: () => K.say(a, 'Yuchiri!', 0.8), exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(0.7, (s, u) => { s.f = 1; s.tgN = [110, CNT.top - 24]; it.o.frac = 0.7 + u * 0.15; })); }
      else if (m.kind === 'sake') ph.push(K.ph(1.5, (s, u) => { sakeW = 1; s.hold.N = H.tool('tokkuri'); s.f = 1; s.tgN = [150, CNT.top - 34 + Math.sin(u * Math.PI) * -10]; s.leanT = 0.1; it.o.frac = u * 0.85; s.look = { x: () => 150, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else ph.push(K.ph(1.2, (s, u) => { s.hold.N = H.tool('mug'); s.f = 1; s.tgN = [196, CNT.top - 40 + u * 10]; s.leanT = 0.08; it.o.frac = u * 0.85; s.look = { x: () => 196, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 22]; s.tgF = [ST.x + 42, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.55) return K.start(a, 'tend', [K.ph(rand(2.2, 3.2), (s, u, t) => { potSteam = Math.max(potSteam, 0.5); s.hold.N = H.tool('chopsticks'); s.f = -1; s.tgN = [66 + Math.cos(t * 1.5) * 18, CNT.top - 28]; s.leanT = 0.12; s.look = { x: () => 66, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'chat', [K.ph(rand(2, 3), (s, u) => { s.f = 1; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Where you from?', 'Rain later, ne', 'Daikon\'s perfect tonight']), 1.4) })]); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'wipe', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.tool('cloth'); s.tgN = [190 + Math.sin(t * 3) * 18, CNT.top - 10]; s.leanT = 0.1; }), K.ph(1, (s) => { s.hold.N = null; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Irasshai!', 'Two seats here!']), 1.1) })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'ladle') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 12 * s, y - 10 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x + 13 * s, y - 9 * s, 3.4 * s, 0, Math.PI); c.fill(); }
      else if (k === 'karashi') { c.fillStyle = L('#e8c030'); c.beginPath(); c.arc(x, y - 3 * s, 2.4 * s, 0, TAU); c.fill(); c.strokeStyle = L('#c8a46a'); c.lineWidth = 1 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2 * s, y + 8 * s); c.stroke(); }
      else if (k === 'tebo') { c.strokeStyle = L('#8a8c90'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 * s, y + 10 * s); c.stroke(); c.fillStyle = L('#b8bcc4'); K0(c, [x + 2 * s, y + 10 * s, x + 12 * s, y + 10 * s, x + 10 * s, y + 20 * s, x + 4 * s, y + 20 * s]); c.fill(); c.fillStyle = L('#f4ecd4'); c.fillRect(x + 4 * s, y + 9 * s, 6 * s, 2 * s); }
      else if (k === 'tokkuri') { c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(x, y - 4 * s, 4 * s, 0, TAU); c.fill(); c.fillRect(x - 1.5 * s, y - 11 * s, 3 * s, 6 * s); c.fillStyle = L('#3a5a8a'); c.fillRect(x - 4 * s, y - 4 * s, 8 * s, 1.2 * s); }
      else if (k === 'mug') { c.fillStyle = 'rgba(240,190,60,0.9)'; c.fillRect(x - 4 * s, y - 11 * s, 8 * s, 11 * s); c.fillStyle = L('#fbf8f0'); c.fillRect(x - 4 * s, y - 13 * s, 8 * s, 3 * s); c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1 * s; c.strokeRect(x + 4 * s, y - 9 * s, 3 * s, 6 * s); }
      else if (k === 'chopsticks') { c.strokeStyle = L('#c8a46a'); c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 4 * s, y - 16 * s); c.moveTo(x + 2 * s, y); c.lineTo(x + 7 * s, y - 15 * s); c.stroke(); }
      else if (k === 'cloth') { c.fillStyle = L('#eef0f4'); c.fillRect(x - 5 * s, y - 2 * s, 10 * s, 4 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'oden') { c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -1, 11, 3); c.fill(); c.fillStyle = L('#3a5a8a'); ellipse(c, 0, -1, 11, 3); c.lineWidth = 0.8; c.strokeStyle = L('#3a5a8a'); c.stroke(); if (frac > 0.2) { c.fillStyle = L('#ecc27a'); c.beginPath(); c.arc(-4, -4, 4, 0, TAU); c.fill(); } if (frac > 0.4) { c.fillStyle = L('#d0a464'); ellipse(c, 3, -4, 3, 3.6); c.fill(); } if (frac > 0.6) { c.fillStyle = L('#7a7470'); K0(c, [6, -2, 10, -2, 8, -7]); c.fill(); } if (frac > 0.8) { c.fillStyle = L('#e8c030'); c.beginPath(); c.arc(9, -1, 1.4, 0, TAU); c.fill(); } }
      else if (m.kind === 'ramen') { c.fillStyle = L('#2a2a2e'); c.beginPath(); c.moveTo(-9, -8); c.quadraticCurveTo(-9, 0, 0, 0); c.quadraticCurveTo(9, 0, 9, -8); c.closePath(); c.fill(); c.fillStyle = L('#c8342a'); c.fillRect(-9, -8, 18, 1.2); if (frac > 0.3) { c.fillStyle = L('#f4ecdc'); ellipse(c, 0, -8, 8.4, 2.2); c.fill(); } if (frac > 0.7) { c.fillStyle = L('#c87a5a'); c.beginPath(); c.arc(-3, -9, 2.4, 0, TAU); c.fill(); c.fillStyle = L('#6a9a3a'); c.fillRect(1, -10, 5, 1.4); c.fillStyle = L('#d84a6a'); c.fillRect(4, -9.5, 3, 1); } }
      else if (m.kind === 'sake') { c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(-3, -5, 4.4, 0, TAU); c.fill(); c.fillRect(-4.4, -13, 3, 6); c.fillStyle = L('#3a5a8a'); c.fillRect(-7.4, -5, 8.8, 1.2); c.fillStyle = L('#f4f0e6'); K0(c, [4, -5, 9, -5, 8, 0, 5, 0]); c.fill(); if (frac > 0.8) { c.fillStyle = 'rgba(255,255,255,0.45)'; c.beginPath(); c.arc(-3, -16, 2, 0, TAU); c.fill(); } }
      else { c.fillStyle = L('#f0c040'); c.fillRect(-4.5, -13, 9, 13); c.fillStyle = L('#fbf8f0'); c.fillRect(-4.5, -16, 9, 3.6); c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1; c.strokeRect(4.5, -10, 3.4, 6); }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.oden = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      // the night behind the stall: sky, Nakasu's buildings and signs, the river (seen past the cart panel at the edges)
      c.fillStyle = M_lin(c, 0, 40, 0, 400, [[0, P.sky0], [1, P.sky1]]); c.fillRect(-60, 40, 1400, 380);
      for (let i = 0; i < 18; i++) { const bx = -60 + i * 82, bh = 120 + (i * 53) % 150; c.fillStyle = i % 2 ? P.bld : P.bld2; c.fillRect(bx, 400 - bh, 76, bh);
        for (let r = 0; r < bh / 22 - 1; r++) for (let k = 0; k < 4; k++) if (((i * 7 + r * 3 + k) % 5) < 2) { c.fillStyle = rgba(['#ffd890', '#f0f4ff', '#ffb0c8'][(i + k) % 3], 0.35 + 0.5 * P.winA); c.fillRect(bx + 8 + k * 17, 410 - bh + r * 22, 10, 9); } }
      const signs = [['スナック', '#ff4a8a'], ['BAR', '#4ae0ff'], ['カラオケ', '#ffd040'], ['居酒屋', '#ff6a44'], ['ラーメン', '#ffffff']];
      signs.forEach(([tx, col], i) => { const sx = 20 + i * 290, sy = 230 + (i % 2) * 50; c.fillStyle = rgba('#0a0a14', 0.85); roundRect(c, sx - 34, sy - 13, 68, 26, 4); c.fill(); c.fillStyle = col; c.font = `400 14px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(tx, sx, sy + 1); K.glow(c, sx, sy, 60, col, 0.16 * P.winA); });
      c.fillStyle = P.river; c.fillRect(-60, 400, 1400, 270); for (let j = 0; j < 14; j++) { const ry = 410 + j * 18; for (let i = 0; i < 18; i++) { const rx = -60 + i * 82 + Math.sin(t * 1.4 + j + i) * 6, col = ['#ffd890', '#ff4a8a', '#4ae0ff', '#ffd040'][(i + j) % 4]; c.fillStyle = rgba(col, (0.1 + 0.22 * P.winA) * (1 - j / 14)); c.fillRect(rx + 20, ry, 30 - j, 3); } }
      // the cart's back panel (left strip): planks, sake shelf, wooden menu tags, the noren
      c.fillStyle = P.plank; c.fillRect(-60, 70, 340, 600); c.strokeStyle = rgba(P.plank2, 0.8); c.lineWidth = 2; for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(-60, 70 + i * 66); c.lineTo(280, 70 + i * 66); c.stroke(); } c.fillStyle = P.plank2; c.fillRect(270, 70, 12, 600);
      { const y0 = 150; c.fillStyle = P.plank2; c.fillRect(10, y0 + 44, 250, 6); [['#2a5a3a', 1], ['#f4f0e6', 0], ['#3a2a5a', 1], ['#8a2a20', 1], ['#f4f0e6', 0], ['#2a4a6a', 1], ['#5a3a1a', 1], ['#f4f0e6', 0]].forEach(([col, big], i) => { const bx = 24 + i * 30; if (big) { c.fillStyle = L(col); roundRect(c, bx - 7, y0 + 2, 14, 42, 4); c.fill(); c.fillRect(bx - 2.5, y0 - 10, 5, 14); c.fillStyle = L('#f4ecd8'); c.fillRect(bx - 5, y0 + 16, 10, 14); c.fillStyle = L('#2a2420'); c.fillRect(bx - 1, y0 + 19, 2, 8); } else { c.fillStyle = 'rgba(230,240,250,0.6)'; K0(c, [bx - 6, y0 + 26, bx + 6, y0 + 26, bx + 5, y0 + 44, bx - 5, y0 + 44]); c.fill(); } }); }
      { const items = [['大根', '200'], ['玉子', '150'], ['牛すじ', '300'], ['ちくわ', '150'], ['巾着', '250'], ['熱燗', '500'], ['ラーメン', '700']];
        items.forEach(([n, p], i) => { const tx = 22 + i * 35, ty = 218; c.fillStyle = L('#f2e6c8'); c.fillRect(tx, ty, 28, 96); c.fillStyle = rgba('#000000', 0.12); c.fillRect(tx + 24, ty, 4, 96); c.strokeStyle = P.plank2; c.lineWidth = 1; c.beginPath(); c.moveTo(tx + 14, ty); c.lineTo(tx + 14, ty - 8); c.stroke();
          c.fillStyle = L('#2a2420'); c.font = `400 ${n.length > 3 ? 10 : 12}px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; [...n].forEach((ch, k) => c.fillText(ch, tx + 14, ty + 12 + k * (n.length > 3 ? 12 : 15))); c.fillStyle = L('#c8342a'); c.font = '800 9px "Trebuchet MS", sans-serif'; c.fillText(p, tx + 14, ty + 86); }); }
      // tarp roof: blue-and-white stripes with a scalloped edge, the red lanterns
      for (let i = 0; i < 70; i++) { c.fillStyle = i % 2 ? P.tarp : P.tarp2; c.fillRect(-60 + i * 20, 0, 20, 62); c.beginPath(); c.arc(-50 + i * 20, 62, 10, 0, Math.PI); c.fill(); }
      c.fillStyle = rgba('#000000', 0.18); c.fillRect(-60, 0, 1400, 8);
      { const nx = 0, ny = 74; for (let k = 0; k < 4; k++) { c.fillStyle = L('#2a3a5a'); c.fillRect(nx + 10 + k * 64, ny, 60, 70); } c.fillStyle = L('#f2e6c8'); c.font = `400 26px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['お', 'で', 'ん', '酒'].forEach((ch, k) => c.fillText(ch, nx + 40 + k * 64, ny + 38)); }
      for (const lx of [300, 1000, 1270]) { c.strokeStyle = L('#2a2420'); c.lineWidth = 1.5; c.beginPath(); c.moveTo(lx, 62); c.lineTo(lx, 74); c.stroke(); c.fillStyle = L('#2a2420'); c.fillRect(lx - 11, 74, 22, 5); c.fillRect(lx - 11, 124, 22, 5); c.fillStyle = P.lanA > 0.5 ? L(P.red) : P.red; ellipse(c, lx, 101, 18, 23); c.fill(); c.fillStyle = rgba('#ffe0a0', 0.18 * P.lanA); ellipse(c, lx - 4, 96, 8, 16); c.fill(); c.fillStyle = L('#2a1410'); c.font = `400 11px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['お', 'で', 'ん'].forEach((ch, k) => c.fillText(ch, lx, 88 + k * 13)); K.glow(c, lx, 101, 80, '#ff8a50', 0.3 * P.lanA); }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.plank2; c.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); return; }
      // the clear vinyl curtain: creases, a rolled top, raindrops when wet, a reflection of the lanterns
      c.fillStyle = 'rgba(220,230,255,0.08)'; c.fillRect(x0, y0, x1 - x0, y1 - y0); c.strokeStyle = 'rgba(255,255,255,0.14)'; c.lineWidth = 2; for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(x0 + k * (x1 - x0) / 5, y0); c.quadraticCurveTo(x0 + k * (x1 - x0) / 5 + 6, (y0 + y1) / 2, x0 + k * (x1 - x0) / 5 - 3, y1); c.stroke(); }
      c.fillStyle = 'rgba(255,255,255,0.12)'; K0(c, [x0 + 20, y0, x0 + 60, y0, x0 + 10, y1, x0 - 20, y1]); c.fill();
      if (K.weatherNow === 'rain' || K.weatherNow === 'storm') for (let k = 0; k < 30; k++) { c.fillStyle = 'rgba(230,240,255,0.5)'; ellipse(c, x0 + (k * 67) % (x1 - x0), y0 + (k * 113 + Math.floor(K.simT * 3) * 7 * (k % 3)) % (y1 - y0), 1.4, 2.4); c.fill(); }
      c.fillStyle = rgba('#ff6a44', 0.12 * P.lanA); ellipse(c, x0 + 40, y0 + 60, 14, 18); c.fill();
      c.fillStyle = L('#d8dce8'); roundRect(c, x0 - 6, y0 - 16, x1 - x0 + 12, 18, 9); c.fill(); c.strokeStyle = 'rgba(160,170,190,0.7)'; c.lineWidth = 1; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(x0 - 4, y0 - 12 + k * 4); c.lineTo(x1 + 4, y0 - 12 + k * 4); c.stroke(); }
      c.fillStyle = P.plank2; c.fillRect(x0 - 10, y1, x1 - x0 + 20, 10); c.fillStyle = P.plank; c.fillRect(x0 - 10, y0 - 22, 8, y1 - y0 + 32); c.fillRect(x1 + 2, y0 - 22, 8, y1 - y0 + 32); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0;
      c.fillStyle = M_lin(c, 0, y0, 0, y0 + 160, [[0, P.sky0], [1, P.sky1]]); c.fillRect(x0, y0, w, 160);
      // the far bank: buildings with signs
      for (let i = 0; i < 6; i++) { const bx = x0 + i * 36, bh = 70 + (i * 37) % 70; c.fillStyle = i % 2 ? P.bld : P.bld2; c.fillRect(bx, y0 + 160 - bh, 34, bh); for (let r = 0; r < bh / 14 - 1; r++) for (let k = 0; k < 2; k++) if ((i + r + k) % 3) { c.fillStyle = rgba('#ffd890', 0.3 + 0.6 * P.winA); c.fillRect(bx + 6 + k * 14, y0 + 166 - bh + r * 14, 7, 6); } }
      for (const [sx, sy, col, tx] of [[0.25, 70, '#ff4a8a', 'BAR'], [0.7, 50, '#4ae0ff', '中洲'], [0.5, 100, '#ffd040', '酒']]) { c.fillStyle = rgba('#0a0a14', 0.9); c.fillRect(x0 + w * sx - 18, y0 + sy - 10, 36, 20); c.fillStyle = col; c.font = `400 12px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(tx, x0 + w * sx, y0 + sy + 1); K.glow(c, x0 + w * sx, y0 + sy, 40, col, 0.25 * P.winA); }
      // the bridge with its lamp posts and a taxi crossing
      c.fillStyle = P.bridge; c.fillRect(x0, y0 + 160, w, 14); for (let k = 0; k < 6; k++) { c.fillRect(x0 + 10 + k * 40, y0 + 174, 6, 30); c.fillStyle = rgba('#fff0c8', 0.9); c.beginPath(); c.arc(x0 + 13 + k * 40, y0 + 150, 3, 0, TAU); c.fill(); c.fillStyle = P.bridge; c.fillRect(x0 + 12 + k * 40, y0 + 152, 2, 8); }
      { const tx = x0 + ((t * 40) % (w + 80)) - 40; c.fillStyle = L('#3a3a46'); roundRect(c, tx - 16, y0 + 148, 32, 12, 3); c.fill(); c.fillStyle = L('#f0c040'); c.fillRect(tx - 4, y0 + 144, 8, 4); c.fillStyle = rgba('#ffe8a0', 0.9); c.fillRect(tx + 13, y0 + 152, 3, 3); }
      // the river: neon reflections wobbling
      c.fillStyle = P.river; c.fillRect(x0, y0 + 174, w, hh - 174); for (let j = 0; j < 16; j++) for (const [sx, col] of [[0.25, '#ff4a8a'], [0.7, '#4ae0ff'], [0.5, '#ffd040'], [0.1, '#ffd890'], [0.88, '#ffd890']]) { const ry = y0 + 182 + j * 10, wob = Math.sin(t * 2 + j * 0.9 + sx * 9) * (3 + j * 0.4); c.fillStyle = rgba(col, (0.15 + 0.4 * P.winA) * (1 - j / 16)); c.fillRect(x0 + w * sx - 10 + wob, ry, 20 - j * 0.6, 3); }
      c.fillStyle = rgba(P.river2, 0.6); for (let j = 0; j < 6; j++) c.fillRect(x0, y0 + 200 + j * 26 + Math.sin(t + j) * 2, w, 1.5);
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let r = 0; r < 4; r++) for (let i = 0; i < 30; i++) { c.fillStyle = (i * 3 + r) % 4 ? P.floor : P.floor2; c.fillRect(-60 + i * 56 + (r % 2) * 28, 642 + r * 26, 54, 24); } c.fillStyle = rgba(P.wet, 0.25); for (let i = 0; i < 12; i++) c.fillRect(-40 + i * 120, 660 + (i % 3) * 20, 50, 3); c.fillStyle = rgba('#ff6a44', 0.08); c.fillRect(-60, 642, 1400, 30); },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      c.fillStyle = P.cnt; c.fillRect(x0 - 10, top - 6, x1 - x0 + 20, 8);
      // tonkotsu stockpot with the tebo hanging, the partitioned oden pot, the copper sake warmer, beer server
      { const px = 26, py = top - 6; c.fillStyle = L('#b8bcc4'); c.fillRect(px - 18, py - 30, 36, 30); c.fillStyle = L('#f4ecdc'); ellipse(c, px, py - 30, 18, 4); c.fill(); c.fillStyle = rgba('#000000', 0.12); c.fillRect(px - 18, py - 18, 36, 3);
        const st = 0.3 + tebo * 0.7; for (let k = 0; k < 2; k++) { const ph = (t * 0.5 + k * 0.5) % 1; c.fillStyle = rgba('#ffffff', st * 0.4 * (1 - ph)); c.beginPath(); c.arc(px + Math.sin(t + k) * 4, py - 38 - ph * 30, 4 + ph * 8, 0, TAU); c.fill(); } }
      { const ox = 74, oy = top - 6, w = 56; c.fillStyle = L('#8a8c94'); c.fillRect(ox - w / 2 - 3, oy - 14, w + 6, 14); c.fillStyle = L('#c8a060'); c.fillRect(ox - w / 2, oy - 14, w, 4);
        const items = [['#ecc27a', 'r'], ['#d0a464', 'e'], ['#7a7470', 't'], ['#e8c890', 'c'], ['#bc8236', 'k'], ['#f6f2ea', 's'], ['#6e3c1e', 'g'], ['#ecc27a', 'r']];
        items.forEach(([col, k], i) => { const ix = ox - w / 2 + 4 + (i % 4) * 13.5, iy = oy - 16 - Math.floor(i / 4) * 5 + Math.sin(t * 2 + i) * 0.6; c.fillStyle = L(col); if (k === 't') K0(c, [ix, iy - 4, ix + 5, iy + 3, ix - 5, iy + 3]); else if (k === 's') c.fillRect(ix - 4, iy - 3, 8, 6); else if (k === 'g') { c.fillRect(ix - 1, iy - 8, 1.4, 10); c.beginPath(); c.arc(ix, iy - 2, 3, 0, TAU); } else ellipse(c, ix, iy, 4.6, 3.6); c.fill(); });
        c.strokeStyle = L('#6a6c74'); c.lineWidth = 1; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(ox - w / 2 + k * 14, oy - 14); c.lineTo(ox - w / 2 + k * 14, oy - 10); c.stroke(); }
        const st = 0.3 + potSteam * 0.5 + fresh * 0.4; for (let k = 0; k < 3; k++) { const ph = (t * 0.4 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', st * 0.42 * (1 - ph)); c.beginPath(); c.arc(ox - 16 + k * 16 + Math.sin(t + k) * 4, oy - 22 - ph * (26 + fresh * 30), 5 + ph * 10, 0, TAU); c.fill(); } K.glow(c, ox, oy - 12, 50, '#ffd090', 0.12 + potSteam * 0.1); }
      { const sx = 150, sy = top - 6; c.fillStyle = L('#b8743a'); roundRect(c, sx - 14, sy - 26, 28, 26, 4); c.fill(); c.fillStyle = L('#d8945a'); c.fillRect(sx - 14, sy - 26, 28, 4); for (let k = 0; k < 2; k++) { c.fillStyle = L('#f4f0e6'); c.fillRect(sx - 8 + k * 10, sy - 36, 6, 12); c.beginPath(); c.arc(sx - 5 + k * 10, sy - 37, 2.4, 0, TAU); c.fill(); } if (sakeW > 0) K.glow(c, sx, sy - 20, 30, '#ffb070', 0.3 * sakeW); }
      { const bx = 196, by = top - 6; c.fillStyle = L('#c8ccd4'); c.fillRect(bx - 10, by - 40, 20, 40); c.fillStyle = L('#2a5aa8'); c.fillRect(bx - 10, by - 34, 20, 8); c.fillStyle = L('#3a3a46'); c.fillRect(bx - 2, by - 48, 4, 8); c.fillRect(bx - 2, by - 48, 10, 3); }
      { const gx = 228, gy = top - 6; c.fillStyle = 'rgba(230,240,250,0.55)'; for (let k = 0; k < 2; k++) { K0(c, [gx - 4 + k * 10, gy - 12, gx + 4 + k * 10, gy - 12, gx + 3 + k * 10, gy, gx - 3 + k * 10, gy]); c.fill(); } }
      // cart front: wooden planks, the yatai's wheels peeking, a short noren skirt
      c.fillStyle = P.cnt2; c.fillRect(x0 - 8, top + 2, x1 - x0 + 16, base - top); c.strokeStyle = rgba('#000000', 0.18); c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(x0 - 8, top + 22 + i * 22); c.lineTo(x1 + 8, top + 22 + i * 22); c.stroke(); }
      c.fillStyle = L('#2a2a30'); for (const wx of [x0 + 30, x1 - 30]) { c.beginPath(); c.arc(wx, base - 4, 18, Math.PI, TAU); c.fill(); c.fillStyle = L('#5a5a62'); c.beginPath(); c.arc(wx, base - 4, 6, Math.PI, TAU); c.fill(); c.fillStyle = L('#2a2a30'); }
      for (let k = 0; k < 5; k++) { c.fillStyle = L('#c8342a'); c.fillRect(x0 + 6 + k * 48, top + 4, 44, 32); } c.fillStyle = L('#fbf4e4'); c.font = `400 18px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['屋', '台', 'お', 'で', 'ん'].forEach((ch, k) => c.fillText(ch, x0 + 28 + k * 48, top + 21));
      if (kanpai > 0) for (let k = 0; k < 6; k++) { c.fillStyle = rgba('#ffe8a0', kanpai * 0.8); c.beginPath(); c.arc(60 + k * 34, top - 70 - Math.sin(k + kanpai * 6) * 10, 2, 0, TAU); c.fill(); }
    },
    events: [
      { name: 'kanpai', dur: 8, start(X, srv, mk) { const K = X.K; kanpai = 1; K.say(mk, 'Kanpai!', 1.4); K.after(0.4, () => { K.say(srv, 'Kanpai~!', 1.3); for (const c of K.actors.filter((q) => q.cust)) K.say(c, pick(['Kanpai!!', 'icon:star', 'Kanpaaai!']), 1.5); }); } },
      { name: 'fresh-pot', dur: 10, start(X, srv, mk) { const K = X.K; fresh = 1; potSteam = 1; K.say(mk, 'New daikon in!', 1.4); K.fx('puff', 74, X.CNT.top - 40, { life: 1.4, col: '#ffffff' }); K.after(1.6, () => K.say(mk, 'Shimitemasu yo~', 1.5)); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 74, until: K.simT + 3 }; if (Math.random() < 0.7) K.say(c, pick(['One daikon!', 'icon:heart', 'Smells so good']), 1.3); } } },
    ],
  };
  function M_lin(c, x0, y0, x1, y1, st) { const g = c.createLinearGradient(x0, y0, x1, y1); for (const [o, col] of st) g.addColorStop(o, col); return g; }
  registerStage('oden', makeGeoCafe(W));
})();
