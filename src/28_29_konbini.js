/* ================= NEW WORLD · Konbini — GEOMETRIC edition (a generic Japanese corner store; no real chain, logo or mark) =================
   A 24-hour Japanese convenience store under humming fluorescent bars. Aoi at the register scans, bows and bags ("Irasshaimase!",
   "Fukuro irimasu ka?"); Ren behind her works the hot-snack line for real: tongs into the warmer for a cup of karaage, a fluffy
   nikuman out of the steamer, a bento into the microwave (it really counts down and goes "chin"), a coffee from the self-serve
   machine. Wall: hot-snack menu with prices, coffee S/M/L, a gondola of onigiri, bottles and sweets behind the board. Window: the
   street outside — vending machines, a crossing, a utility pole with sagging wires, apartment balconies, bikes and a scooter;
   at night the store's light spills onto the parking lot and moths circle the sign. Signatures: DELIVERY — the truck pulls up
   and Ren restocks the onigiri shelf · FRESH KARAAGE — a new batch, "揚げたて!", and the queue leans in. Clock 07:00 morning commute
   -> lunch -> afternoon -> evening -> 02:00 late night (sleepy night-shift, a merry salaryman). Blocks: onigiri · roll cake ·
   karaage · melon pan · sakura mochi · matcha warabi · chocolate. */
(() => {
  WORLD_DEFS.push({
    id: 'konbini', name: 'Konbini', sub: 'コンビニ · a corner store, open 24 hours', thumbY: 0.42,
    desc: 'A 24-hour Japanese convenience store: karaage from the warmer, nikuman from the steamer, a bento that goes "chin", self-serve coffee and a street of vending machines outside — bright city-pop at the register.',
    accent: '#3a7ad8', accent2: '#9ac8f0', skin: 'konbini', particle: 'star',
    boardBg: 'rgba(16,24,40,0.92)', grid: 'rgba(170,200,255,0.07)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 112, root: 60, scale: [0, 2, 4, 5, 7, 9, 11], prog: [3, 4, 2, 5], barsPerChord: 1,
      pad: { wave: 'sawtooth', cutoff: 1400, gain: 0.02, detune: 8, voices: 4 },
      comp: { inst: 'rhodes', pattern: E16('..x...x...x...x.'), voices: 4, gain: 0.034, oct: 0 },
      arp: { inst: 'bell', pattern: [0, 4, 7, 11, 7, 4, 2, 4], every: 1, oct: 1, gain: 0.05, density: 0.7 },
      bass: { pattern: E16('x..x..x.x.x..x..'), gain: 0.17, dec: 0.2, wave: 'triangle' },
      drums: { kick: E16('x...x...x...x...'), snareInst: 'clap', snare: E16('....x.......x...'), hat: E16('..x...x...x...x.'), extra: E16('x.......x.......'), extraInst: 'shaker' },
      lead: { inst: 'flute', gain: 0.04, density: 0.14, oct: 1 }, sfx: 'bell', clearFx: 'chime',
      amb: { chatter: 0.012, clink: 0.012 },
    },
  });
  const KonPal = GeoCafePal({
    day: { wall: '#eef2f6', wall2: '#e2e8ee', trim: '#3a7ad8', band: '#2a5aa8', stripe: '#fcfdff', floor: '#d8dce0', floor2: '#c8ccd2', cnt: '#f6f8fa', cnt2: '#dfe5ec', steel: '#c8ccd0', glass: '#e4eef6', sign: '#2a5aa8', blue: '#2a64b4', sky: '#9ac8f0',
      sky0: '#cfe2f2', sky1: '#eef4f8', out1: '#d8d0c4', out2: '#b8b0a8', out3: '#6a6a70', road: '#8a8c90', lit: '#fff0c0', litA: 0.1, vend: '#e8eef4', lamp: '#f4f8ff', glow: '#e8f2ff', glowA: 0.08, shaft: '#ffffff', shaftA: 0.1, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#e8ecf2', wall2: '#dce2ea', trim: '#3a72cc', band: '#24529c', stripe: '#f8faff', floor: '#cfd3d8', floor2: '#bfc3ca', cnt: '#eef2f6', cnt2: '#d6dde6', steel: '#bcc0c6', glass: '#d8d4e4', sign: '#2a5aa8', blue: '#2860ac', sky: '#8abce8',
      sky0: '#e0b49c', sky1: '#f2d4b0', out1: '#b8a898', out2: '#988a80', out3: '#4a4448', road: '#6a6a70', lit: '#ffd890', litA: 0.6, vend: '#f0f4ff', lamp: '#f0f6ff', glow: '#dceaff', glowA: 0.22, shaft: '#ffd8b0', shaftA: 0.06, amb: '#ffd8c0', ambK: 0.04, sun: '#ff9c60', cloud: '#e8b8a8' },
    night: { wall: '#e4e8ee', wall2: '#d8dee6', trim: '#3a72cc', band: '#24529c', stripe: '#f4f8ff', floor: '#c6cad0', floor2: '#b6bac2', cnt: '#e8ecf2', cnt2: '#ccd4de', steel: '#b0b4ba', glass: '#4a5468', sign: '#3a7ad8', blue: '#24589e', sky: '#6a9ad0',
      sky0: '#141a2a', sky1: '#222a3e', out1: '#3a3a46', out2: '#2a2a34', out3: '#18181e', road: '#2a2c32', lit: '#ffd890', litA: 1, vend: '#f4f8ff', lamp: '#e8f0ff', glow: '#cfe0ff', glowA: 0.4, shaft: '#c0d8ff', shaftA: 0, amb: '#3a4060', ambK: 0.04, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: { road: '#d8dce2' },
  }, [[5, 'night'], [7, 'day'], [16.5, 'day'], [18, 'dusk'], [19.3, 'night'], [29, 'night'], [31, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 5 && h < 10 ? 'Morning commute' : h >= 10 && h < 14 ? 'Lunch' : h >= 14 && h < 17.5 ? 'Afternoon' : h >= 17.5 && h < 22.5 ? 'Evening' : 'Late night'; });
  const MENU = [{ n: 'Karaage, one cup', c: '#d89040', kind: 'karaage' }, { n: 'Nikuman', c: '#f4efe6', kind: 'niku' }, { n: 'Hot coffee · M', c: '#5a3a24', kind: 'coffee' },
    { n: 'Bento, warmed', c: '#2a2a2e', kind: 'bento' }, { n: 'Salmon onigiri', c: '#f4f0e6', kind: 'onigiri' }, { n: 'Roll cake', c: '#f6ecd8', kind: 'cake' }];
  let micro = 0, microOn = 0, steam = 0, warm = 0, truck = -1, fresh = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'konbini', pal: KonPal, stationX: 34, srvX: 240, spots: [150, 330], maxCust: 2, crowd: 0.6, // never crowded: two shoppers at most, one at the counter (150) between the maker by the coffee/hot case (60) and the clerk at the register (240); a second shopper waits off-counter startHour: 7, span: 19, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(10,20,40,0.2)', zone: 'rgba(240,246,255,0.24)',
    per: (h) => { const x = h < 5 ? h + 24 : h; return x < 10 ? 0 : x < 14 ? 1 : x < 17.5 ? 2 : 3; },
    staff: [{ T: 226, hw: 56, headR: 28, pattern: 'pin', top: 'white', top2: 'blue', hairStyle: 'bob', hair: 'dark', pants: 'navy' },
      { T: 240, hw: 60, headR: 28, pattern: 'pin', top: 'white', top2: 'blue', hairStyle: 'short', hair: 'dark', pants: 'navy' }],
    menu: MENU, greet: ['Irasshaimase!', 'Next customer, please', 'Point card?'], ack: ['Hai, karaage!', 'Hai!', 'Right away'], handOff: ['Fukuro irimasu ka?', 'Arigatō gozaimashita', 'Hot, careful!'],
    thanks: ['Arigatō', 'icon:heart', 'Perfect'], done: ['Konbini dinner ✓', 'icon:heart', 'Mata ne'], cheer: ['Oishii!', 'icon:star', 'Nice'],
    types: {
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'blue', hairStyle: 'short', pants: 'navy' }, words: ['Coffee, quick', 'Train in 4 min'] },
      ol: { body: { T: 220, hw: 54, pattern: 'jacket', top: 'grey', shirt: 'white', hairStyle: 'long', hair: 'brown', skirt: 'navy' }, words: ['Roll cake…', 'Treat day'] },
      student: { body: { T: 214, hw: 54, pattern: 'jacket', top: 'navy', shirt: 'white', tie: 'coral', backpack: 1, packCol: 'blue', hairStyle: 'short', pants: 'grey' }, words: ['Karaage!', 'After cram school'] },
      night: { body: { pattern: 'hivis', top: 'mustard', shirt: 'grey', hat: 'cap', hatCol: 'navy', pants: 'olive' }, words: ['Night shift fuel', 'Two nikuman'] },
      oji: { body: { T: 222, hw: 58, pattern: 'cardigan', top: 'olive', top2: 'cream', hairStyle: 'short', hair: 'hairGrey', pants: 'brown' }, words: ['Newspaper…', 'Just one onigiri'] },
      tourist: { body: { pattern: 'tee', top: 'coral', hat: 'bucket', hatCol: 'cream', camera: 1, pants: 'navy' }, words: ['Egg sando!!', 'icon:cam'] },
      merry: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', hairStyle: 'short', pants: 'grey', hat: 'headband', hatCol: 'white' }, words: ['One more beer… no, water', 'icon:laugh'] },
    },
    parties: [{ m: ['sala'], w: [4, 2, 1, 2] }, { m: ['ol'], w: [1, 3, 2, 2] }, { m: ['student'], w: [1, 1, 3, 2] }, { m: ['night'], w: [1, 0, 1, 3] }, { m: ['oji'], w: [2, 2, 2, 0] }, { m: ['tourist'], w: [1, 2, 2, 1] }, { m: ['merry'], w: [0, 0, 0, 3] }],
    sim(X, dt) { micro = Math.max(0, micro - dt); if (microOn && micro <= 0) microOn = 0; steam = Math.max(0, steam - dt * 0.4); warm = Math.max(0, warm - dt * 0.5); fresh = Math.max(0, fresh - dt * 0.12);
      if (truck >= 0) { truck += dt; if (truck > 16) truck = -1; } },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'karaage') ph.push(K.ph(1.3, (s, u, t) => { warm = 1; s.hold.N = H.tool('tongs'); s.f = -1; s.tgN = [78 + Math.sin(t * 9) * 4, CNT.top - 24]; s.leanT = 0.16; it.o.frac = u * 0.8; s.look = { x: () => 78, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'niku') ph.push(K.ph(1.2, (s, u) => { steam = 1; s.hold.N = H.tool('tongs'); s.f = 1; s.tgN = [140, CNT.top - 30 - u * 8]; s.leanT = 0.12; it.o.frac = u * 0.8; if (Math.random() < 0.06) K.fx('puff', 140, CNT.top - 52, { life: 1, col: '#ffffff' }); s.look = { x: () => 140, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'coffee') ph.push(K.ph(1.6, (s, u, t) => { s.hold.N = H.tool('cup'); s.f = -1; s.tgN = [28, CNT.top - 26]; s.leanT = 0.14; it.o.frac = u * 0.85; if (Math.random() < 0.03) K.fx('puff', 28, CNT.top - 40, { life: 0.8, col: '#f4ece4' }); s.look = { x: () => 28, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      else if (m.kind === 'bento') { ph.push(K.ph(0.7, (s) => { s.f = -1; s.tgN = [52, CNT.top - 82]; s.leanT = 0.1; s.look = { x: () => 52, until: K.simT + 0.3 }; }, { enter: () => { micro = 2.4; microOn = 1; } }));
        ph.push(K.ph(2.2, (s, u) => { s.f = -1; s.tgN = [62, CNT.top - 70]; it.o.frac = 0.2 + u * 0.6; s.look = { x: () => 52, until: K.simT + 0.3 }; }, { exit: () => { K.say(a, 'Chin!', 0.8); } })); }
      else ph.push(K.ph(0.7, (s, u) => { s.f = -1; s.tgN = [ST.x - 20, CNT.top - 70]; s.leanT = 0.1; it.o.frac = u * 0.8; }));
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 22]; s.tgF = [ST.x + 42, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.5) return K.start(a, 'face', [K.ph(rand(2.2, 3.2), (s, u, t) => { s.f = -1; s.tgN = [40 + Math.sin(t * 2) * 14, CNT.top - 96 + Math.cos(t * 3) * 3]; s.look = { x: () => 40, until: K.simT + 0.3 }; })]); // facing-up the shelf behind
      return K.start(a, 'warm', [K.ph(rand(2, 3), (s, u, t) => { warm = Math.max(warm, 0.4); s.hold.N = H.tool('tongs'); s.f = -1; s.tgN = [78 + Math.cos(t * 4) * 8, CNT.top - 26]; s.look = { x: () => 78, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'bow', [K.ph(1.4, (s, u) => { s.leanT = Math.sin(u * Math.PI) * 0.35; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['Irasshaimase!', 'Irasshaimase~']), 1.1) }), K.ph(1.2, (s, u, t) => { s.hold.N = H.tool('scanner'); s.tgN = [214 + Math.sin(t * 5) * 4, CNT.top - 30]; })], { onAbort: (s) => { s.hold.N = null; s.leanT = 0; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'tongs') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3 * s, y - 15 * s); c.moveTo(x + 2 * s, y); c.lineTo(x + 6 * s, y - 14 * s); c.stroke(); }
      else if (k === 'cup') { c.fillStyle = L('#fbfbfa'); K0(c, [x - 4 * s, y - 11 * s, x + 4 * s, y - 11 * s, x + 3 * s, y, x - 3 * s, y]); c.fill(); c.fillStyle = L('#2a64b4'); c.fillRect(x - 3.6 * s, y - 7 * s, 7.2 * s, 3 * s); }
      else if (k === 'scanner') { c.fillStyle = L('#3a3a40'); roundRect(c, x - 3 * s, y - 10 * s, 6 * s, 10 * s, 2 * s); c.fill(); c.fillStyle = 'rgba(255,60,60,0.85)'; c.fillRect(x - 2 * s, y - 11 * s, 4 * s, 1.2 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'karaage') { c.fillStyle = L('#fbf8f2'); K0(c, [-6, -11, 6, -11, 5, 0, -5, 0]); c.fill(); c.fillStyle = L('#d83a2e'); c.fillRect(-5.6, -8, 11.2, 3); if (frac > 0.2) { c.fillStyle = L('#d89040'); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(-3 + i * 3, -12, 2.4, 0, TAU); c.fill(); } } }
      else if (m.kind === 'niku') { c.fillStyle = L('#e8dcc4'); ellipse(c, 0, -1, 9, 2); c.fill(); if (frac > 0.2) { c.fillStyle = L('#fbf7ee'); c.beginPath(); c.arc(0, -6, 7, Math.PI, TAU); c.fill(); c.fillRect(-7, -6, 14, 4); c.strokeStyle = L('#ddd2c0'); c.lineWidth = 0.7; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(0, -12); c.lineTo(i * 2.6, -7); c.stroke(); } } }
      else if (m.kind === 'coffee') { c.fillStyle = L('#fbfbfa'); K0(c, [-4.5, -13, 4.5, -13, 3.5, 0, -3.5, 0]); c.fill(); c.fillStyle = L('#2a64b4'); c.fillRect(-4.2, -9, 8.4, 4); c.fillStyle = L('#3a3a40'); c.fillRect(-5, -15, 10, 2.4); if (frac > 0.6) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(1, -19, 2, 0, TAU); c.fill(); } }
      else if (m.kind === 'bento') { c.fillStyle = L('#1e1e22'); c.fillRect(-10, -6, 20, 6); c.fillStyle = L('#f4f0e6'); c.fillRect(-9, -5.4, 8, 4.6); c.fillStyle = L('#c87a3a'); c.fillRect(0, -5.4, 4, 4.6); c.fillStyle = L('#6a9a3a'); c.fillRect(5, -5.4, 4, 4.6); c.fillStyle = 'rgba(230,240,250,0.45)'; c.fillRect(-10, -8, 20, 2.4); }
      else if (m.kind === 'onigiri') { c.fillStyle = L('#fbf8f2'); K0(c, [0, -12, 7, 0, -7, 0]); c.fill(); c.fillStyle = L('#1e2a22'); c.fillRect(-4, -5, 8, 5); c.fillStyle = 'rgba(220,235,250,0.45)'; K0(c, [0, -13, 8, 0.5, -8, 0.5]); c.fill(); }
      else { c.fillStyle = L('#fbfbfa'); c.fillRect(-8, -8, 16, 8); c.fillStyle = L('#2a64b4'); c.fillRect(-8, -8, 16, 2); c.fillStyle = L('#f4ecd8'); c.beginPath(); c.arc(0, -3.6, 3, 0, TAU); c.fill(); c.strokeStyle = L('#dcaa5c'); c.lineWidth = 0.7; c.beginPath(); c.arc(0, -3.6, 1.8, 0, 5); c.stroke(); }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.konbini = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      // white tiles, the blue band with its white pinstripe, fluorescent bars
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620); c.strokeStyle = rgba(P.wall2, 0.9); c.lineWidth = 1.2; for (let i = 0; i < 46; i++) { c.beginPath(); c.moveTo(-60 + i * 32, 300); c.lineTo(-60 + i * 32, 660); c.stroke(); } for (let j = 0; j < 12; j++) { c.beginPath(); c.moveTo(-60, 300 + j * 32); c.lineTo(1340, 300 + j * 32); c.stroke(); }
      c.fillStyle = P.band; c.fillRect(-60, 0, 1400, 50); c.fillStyle = P.stripe; c.fillRect(-60, 50, 1400, 5); c.fillStyle = P.blue; c.fillRect(-60, 55, 1400, 8);
      for (let i = 0; i < 6; i++) { const lx = 40 + i * 230; c.fillStyle = L('#f8fbff'); roundRect(c, lx, 66, 150, 7, 3); c.fill(); K.glow(c, lx + 75, 72, 110, '#f0f6ff', 0.22 + 0.2 * P.night); }
      // left strip: the hot-snack menu and the coffee board
      { const x0 = 30, y0 = 92; c.fillStyle = P.band; roundRect(c, x0 - 6, y0 - 6, 232, 104, 7); c.fill(); c.fillStyle = L('#fbfdff'); c.font = '800 12px "Trebuchet MS", sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('HOT SNACKS', x0 + 6, y0 + 8);
        c.font = `400 11px ${JP_FONT}`; c.textAlign = 'right'; c.fillText('ホットスナック', x0 + 214, y0 + 8);
        const items = [['からあげ', '#d89040', 'cup'], ['肉まん', '#fbf7ee', 'bun'], ['コロッケ', '#c88a3c', 'oval'], ['チキン', '#e0a050', 'leg']];
        items.forEach(([n, col, sh], i) => { const cx = x0 + 28 + i * 54, cy = y0 + 46; c.fillStyle = L(sh === 'bun' ? '#dce8f6' : '#fbfdff'); roundRect(c, cx - 24, cy - 22, 48, 56, 5); c.fill();
          c.fillStyle = L(col); if (sh === 'cup') { c.fillStyle = L('#d83a2e'); K0(c, [cx - 9, cy - 6, cx + 9, cy - 6, cx + 7, cy + 10, cx - 7, cy + 10]); c.fill(); c.fillStyle = L(col); for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(cx - 5 + k * 5, cy - 8, 4, 0, TAU); c.fill(); } }
          else if (sh === 'bun') { c.beginPath(); c.arc(cx, cy + 4, 11, Math.PI, TAU); c.fill(); c.fillRect(cx - 11, cy + 3, 22, 5); c.strokeStyle = L('#d8ccb8'); c.lineWidth = 1; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(cx, cy - 7); c.lineTo(cx + k * 4, cy + 1); c.stroke(); } }
          else if (sh === 'oval') { ellipse(c, cx, cy + 2, 13, 8); c.fill(); c.fillStyle = 'rgba(255,230,170,0.5)'; ellipse(c, cx - 3, cy - 1, 6, 2); c.fill(); }
          else { ellipse(c, cx + 2, cy, 12, 9, -0.4); c.fill(); c.fillStyle = L('#f4ecd8'); c.fillRect(cx - 12, cy + 4, 8, 3); }
          c.fillStyle = L('#24529c'); c.font = `400 10px ${JP_FONT}`; c.textAlign = 'center'; c.fillText(n, cx, cy + 22); c.font = '800 9px "Trebuchet MS", sans-serif'; c.fillStyle = L('#d83a2e'); c.fillText('¥' + [238, 160, 120, 220][i], cx, cy + 31); }); }
      { const x0 = 30, y0 = 214; c.fillStyle = L('#fbfdff'); roundRect(c, x0 - 6, y0 - 6, 232, 66, 7); c.fill(); c.strokeStyle = P.band; c.lineWidth = 2; roundRect(c, x0 - 6, y0 - 6, 232, 66, 7); c.stroke();
        c.fillStyle = P.band; c.font = '800 12px "Trebuchet MS", sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('COFFEE', x0 + 6, y0 + 8); c.font = `400 10px ${JP_FONT}`; c.fillText('ブレンド · カフェラテ', x0 + 70, y0 + 8);
        ['S', 'M', 'L'].forEach((z, i) => { const cx = x0 + 40 + i * 70, h = 18 + i * 5, by = y0 + 50; c.fillStyle = L('#fbfbfa'); K0(c, [cx - 8, by - h, cx + 8, by - h, cx + 6, by, cx - 6, by]); c.fill(); c.strokeStyle = L('#c8ccd4'); c.lineWidth = 1; K0(c, [cx - 8, by - h, cx + 8, by - h, cx + 6, by, cx - 6, by]); c.stroke(); c.fillStyle = L('#2a64b4'); c.fillRect(cx - 7, by - h * 0.62, 14, 5); c.fillStyle = L('#3a3a40'); c.fillRect(cx - 9, by - h - 3, 18, 3);
          c.fillStyle = L('#24529c'); c.font = '800 11px "Trebuchet MS", sans-serif'; c.textAlign = 'left'; c.fillText(z + ' ¥' + [110, 150, 180][i], cx + 12, by - 8); }); }
      // the store floor behind the board: gondola shelves of onigiri, bottles and sweets (softened by the board zone)
      for (let g = 0; g < 2; g++) { const gx = 300 + g * 380, gy = 330; c.fillStyle = L('#d8dee6'); c.fillRect(gx, gy, 320, 300); for (let r = 0; r < 5; r++) { const ry = gy + 20 + r * 56; c.fillStyle = L('#f6f8fa'); c.fillRect(gx + 6, ry + 40, 308, 6); c.fillStyle = L('#2a64b4'); c.fillRect(gx + 6, ry + 46, 308, 4);
        for (let k = 0; k < 13; k++) { const px = gx + 14 + k * 23.5, col = ['#f4f0e6', '#e86a5e', '#3a9a90', '#e8b03a', '#9ac8f0', '#84486e', '#7a8448'][(k * 3 + r * 5 + g) % 7]; c.fillStyle = L(col); if ((r + g) % 2) roundRect(c, px, ry + 6, 16, 34, 3); else K0(c, [px + 8, ry + 14, px + 17, ry + 40, px - 1, ry + 40]); c.fill(); } } }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = L('#c8ccd2'); c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      c.fillStyle = L('#a8aeb6'); c.fillRect(x0 + (x1 - x0) / 2 - 3, y0, 6, y1 - y0); c.fillRect(x0, y0 + 210, x1 - x0, 5); // sliding-door frame
      // posters on the glass + the 24h sticker
      c.fillStyle = L('#fbfdff'); c.fillRect(x0 + 10, y0 + 226, 70, 90); c.fillStyle = L('#d83a2e'); c.fillRect(x0 + 10, y0 + 226, 70, 18); c.fillStyle = L('#fbfdff'); c.font = `400 11px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('新発売', x0 + 45, y0 + 235);
      c.fillStyle = L('#f4ecd8'); c.beginPath(); c.arc(x0 + 45, y0 + 278, 22, 0, TAU); c.fill(); c.strokeStyle = L('#dcaa5c'); c.lineWidth = 2; c.beginPath(); c.arc(x0 + 45, y0 + 278, 14, 0, 5.4); c.stroke();
      c.fillStyle = L('#2a5aa8'); roundRect(c, x1 - 70, y0 + 230, 56, 30, 6); c.fill(); c.fillStyle = L('#fbfdff'); c.font = '900 13px "Trebuchet MS", sans-serif'; c.fillText('24h', x1 - 42, y0 + 245);
      c.fillStyle = 'rgba(255,255,255,0.12)'; K0(c, [x0 + 20, y0, x0 + 70, y0, x0 + 20, y1, x0 - 30, y1]); c.fill();
      // store sign above the window
      c.fillStyle = P.band; roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 6); c.fill(); c.fillStyle = P.stripe; c.fillRect(x0 + 4, y0 - 24, x1 - x0 - 8, 3);
      c.fillStyle = L('#fbfdff'); c.font = '900 16px "Trebuchet MS", sans-serif'; c.fillText('KONBINI · 24', (x0 + x1) / 2, y0 - 36); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      // apartment block across the street (balconies, lit windows), the pole + wires, vending machines, the crossing
      c.fillStyle = P.out2; c.fillRect(x0, y0 + 40, w, 210); c.fillStyle = P.out1; c.fillRect(x0 + 20, y0 + 60, w - 40, 190);
      for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) { const wx = x0 + 30 + k * 36, wy = y0 + 70 + r * 44, on = ((r * 5 + k) * 7) % 10 < 6; c.fillStyle = on ? rgba(P.lit, 0.25 + 0.75 * P.litA) : rgba('#2a3040', 0.5); c.fillRect(wx, wy, 24, 22); c.fillStyle = rgba(P.out3, 0.7); c.fillRect(wx - 4, wy + 24, 32, 4); }
      c.fillStyle = P.out3; c.fillRect(x0 + w * 0.82, y0, 7, 300); c.strokeStyle = rgba(P.out3, 0.9); c.lineWidth = 1.4; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(x0, y0 + 20 + k * 9); c.quadraticCurveTo(x0 + w * 0.4, y0 + 46 + k * 9, x0 + w * 0.82, y0 + 16 + k * 8); c.stroke(); }
      c.fillStyle = P.road; c.fillRect(x0, y0 + 250, w, hh - 250); c.fillStyle = rgba('#f4f6f8', 0.75); for (let k = 0; k < 6; k++) c.fillRect(x0 + 10 + k * 34, y0 + 262, 20, 26);
      // two vending machines, glowing at night
      for (let k = 0; k < 2; k++) { const vx = x0 + 8 + k * 40, vy = y0 + 160; c.fillStyle = L(k ? '#d83a2e' : '#2a64b4'); c.fillRect(vx, vy, 34, 90); c.fillStyle = P.vend; c.fillRect(vx + 4, vy + 6, 26, 40); for (let q = 0; q < 6; q++) { c.fillStyle = L(['#e8b03a', '#3a9a90', '#e86a5e'][q % 3]); c.fillRect(vx + 6 + (q % 3) * 8, vy + 10 + Math.floor(q / 3) * 18, 5, 12); } if (n > 0.2) K.glow(c, vx + 17, vy + 30, 60, '#e8f2ff', 0.35 * n); }
      // the store's own light spilling on the parking lot at night
      if (n > 0.1) { c.fillStyle = rgba('#e8f0ff', 0.16 * n); K0(c, [x0, y1, x1, y1, x1, y0 + 300, x0, y0 + 330]); c.fill(); }
      // passers-by: a bicycle and, now and then, a scooter
      { const bx = x0 + ((t * 26) % (w + 120)) - 60, by = y0 + 300; c.strokeStyle = L('#3a3a46'); c.lineWidth = 2; c.beginPath(); c.arc(bx - 11, by, 8, 0, TAU); c.arc(bx + 11, by, 8, 0, TAU); c.moveTo(bx - 11, by); c.lineTo(bx - 2, by - 12); c.lineTo(bx + 11, by); c.stroke();
        c.fillStyle = L('#2e4a6a'); c.fillRect(bx - 6, by - 34, 10, 22); c.fillStyle = L('#ecb88e'); c.beginPath(); c.arc(bx - 1, by - 40, 5.5, 0, TAU); c.fill(); if (K.weatherNow === 'rain' || K.weatherNow === 'storm') { c.fillStyle = 'rgba(240,244,250,0.75)'; c.beginPath(); c.arc(bx - 1, by - 48, 15, Math.PI, TAU); c.fill(); } }
      if (truck >= 0) { const u = truck < 3 ? truck / 3 : truck > 13 ? 1 + (truck - 13) / 3 : 1, tx = x1 + 30 - u * (w * 0.62); c.fillStyle = L('#f4f6f8'); c.fillRect(tx, y0 + 214, 120, 60); c.fillStyle = L('#2a64b4'); c.fillRect(tx, y0 + 250, 120, 8); c.fillStyle = L('#d8dce2'); c.fillRect(tx - 34, y0 + 234, 34, 40); c.fillStyle = rgba('#9ac8f0', 0.8); c.fillRect(tx - 30, y0 + 238, 22, 14); c.fillStyle = L('#2a2a30'); for (const wx of [tx - 18, tx + 24, tx + 96]) { c.beginPath(); c.arc(wx, y0 + 276, 9, 0, TAU); c.fill(); } }
      if (n > 0.4) for (let k = 0; k < 3; k++) { const a = t * (2 + k) + k * 2; c.fillStyle = 'rgba(240,240,220,0.7)'; c.beginPath(); c.arc(x0 + w * 0.5 + Math.cos(a) * 18, y0 + 12 + Math.sin(a * 1.3) * 8, 1.6, 0, TAU); c.fill(); } // moths at the sign
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let r = 0; r < 4; r++) for (let i = 0; i < 40; i++) { c.fillStyle = (i + r) % 2 ? P.floor2 : P.floor; c.fillRect(-60 + i * 40, 642 + r * 24, 40, 24); } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // back shelf with the microwave (it really counts down and lights up)
      { const mx = 30, my = top - 104; c.fillStyle = L('#c8ccd2'); c.fillRect(-10, my + 30, 130, 6); c.fillStyle = L('#e8ecf0'); roundRect(c, mx, my, 56, 30, 3); c.fill(); c.fillStyle = microOn ? 'rgba(255,220,140,0.9)' : L('#3a3e48'); c.fillRect(mx + 4, my + 4, 36, 22); c.fillStyle = L('#2a2e36'); c.fillRect(mx + 43, my + 5, 10, 8); c.fillStyle = microOn ? '#ff6a4a' : L('#5a5e66'); c.font = '800 7px monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(microOn ? String(Math.ceil(micro * 10)).padStart(2, '0') : '--', mx + 48, my + 9);
        if (microOn) K.glow(c, mx + 22, my + 15, 40, '#ffd890', 0.4); }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // self-serve coffee machine (left), hot-snack warmer, nikuman steamer, register (right)
      { const cx = 28, cy = top - 6; c.fillStyle = L('#2a2e36'); roundRect(c, cx - 15, cy - 62, 30, 62, 4); c.fill(); c.fillStyle = L('#3a7ad8'); c.fillRect(cx - 12, cy - 56, 24, 10); c.fillStyle = L('#c8ccd2'); c.fillRect(cx - 10, cy - 30, 20, 3); c.fillStyle = L('#5a5e66'); c.fillRect(cx - 4, cy - 27, 8, 4); }
      { const hx = 78, hy = top - 6; c.fillStyle = L('#c8ccd2'); c.fillRect(hx - 26, hy - 38, 52, 38); c.fillStyle = rgba('#ffe0a0', 0.55 + warm * 0.3); c.fillRect(hx - 23, hy - 35, 46, 32); for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { const ix = hx - 17 + k * 11, iy = hy - 26 + r * 15; c.fillStyle = L('#d83a2e'); c.fillRect(ix - 4, iy, 8, 8); c.fillStyle = L(r ? '#c88a3c' : '#e0a050'); c.beginPath(); c.arc(ix, iy - 1, 3.4, 0, TAU); c.fill(); }
        c.fillStyle = 'rgba(255,255,255,0.35)'; K0(c, [hx - 23, hy - 35, hx - 10, hy - 35, hx - 20, hy - 3, hx - 23, hy - 3]); c.fill(); K.glow(c, hx, hy - 20, 50, '#ffd890', 0.18 + warm * 0.2); if (fresh > 0) K.glow(c, hx, hy - 20, 70, '#ffc060', 0.4 * fresh); }
      { const sx = 140, sy = top - 6; c.fillStyle = L('#c8ccd2'); c.fillRect(sx - 20, sy - 44, 40, 44); c.fillStyle = 'rgba(230,240,250,0.6)'; c.fillRect(sx - 17, sy - 41, 34, 38); for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) { const bx = sx - 10 + k * 10, by = sy - 28 + r * 16; c.fillStyle = L('#fbf7ee'); c.beginPath(); c.arc(bx, by + 4, 4.6, Math.PI, TAU); c.fill(); c.fillRect(bx - 4.6, by + 3, 9.2, 3); }
        const st = 0.2 + steam * 0.8; for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', st * 0.45 * (1 - ph)); c.beginPath(); c.arc(sx + Math.sin(t + k) * 5, sy - 48 - ph * (30 + steam * 30), 5 + ph * 10, 0, TAU); c.fill(); } }
      { const rx = 214, ry = top - 6; c.fillStyle = L('#3a3e48'); c.fillRect(rx - 20, ry - 14, 40, 14); c.fillStyle = L('#2a2e36'); c.fillRect(rx - 3, ry - 34, 6, 20); c.fillStyle = L('#5a8ad0'); roundRect(c, rx - 16, ry - 50, 32, 20, 3); c.fill(); c.fillStyle = 'rgba(230,240,255,0.7)'; c.fillRect(rx - 12, ry - 46, 18, 3); c.fillRect(rx - 12, ry - 40, 12, 3); }
      // counter front: white with the blue band, "いらっしゃいませ", a donation box and the lottery stand
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.band; c.fillRect(x0 - 6, top + 22, x1 - x0 + 12, 22); c.fillStyle = P.stripe; c.fillRect(x0 - 6, top + 44, x1 - x0 + 12, 3);
      c.fillStyle = L('#fbfdff'); c.font = `400 13px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('いらっしゃいませ', (x0 + x1) / 2, top + 33);
      for (let i = 0; i < 5; i++) { c.fillStyle = P.cnt2; c.fillRect(x0 + 10 + i * 46, top + 60, 34, 70); c.fillStyle = 'rgba(255,255,255,0.3)'; c.fillRect(x0 + 10 + i * 46, top + 60, 34, 5); }
      c.fillStyle = 'rgba(220,235,250,0.6)'; c.fillRect(x1 - 30, top - 26, 18, 20); c.fillStyle = L('#e8b03a'); c.beginPath(); c.arc(x1 - 21, top - 12, 3, 0, TAU); c.fill();
    },
    events: [
      { name: 'delivery', dur: 16, start(X, srv, mk) { const K = X.K; truck = 0; K.after(3.2, () => K.say(mk, 'Delivery!', 1.3)); K.after(4.5, () => { K.say(srv, 'Onigiri restock!', 1.4); for (const c of K.actors.filter((q) => q.cust)) if (Math.random() < 0.6) K.say(c, pick(['icon:star', 'New flavours?', 'Fresh ones!']), 1.2); }); } },
      { name: 'fresh-karaage', dur: 10, start(X, srv, mk) { const K = X.K; fresh = 1; warm = 1; K.say(mk, '揚げたて!', 1.6); K.fx('spark', 78, X.CNT.top - 44, { life: 0.8, col: '#ffd890' }); K.after(0.9, () => K.say(srv, 'Fresh karaage!', 1.4)); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 78, until: K.simT + 3 }; if (Math.random() < 0.7) K.say(c, pick(['icon:heart', 'One cup!', 'Smells…']), 1.3); } } },
    ],
  };
  registerStage('konbini', makeGeoCafe(W));
})();
