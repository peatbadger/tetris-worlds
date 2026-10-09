/* ================= NEW WORLD · Ramen Yokocho — GEOMETRIC edition =================
   An eight-seat ramen counter in a narrow drinking alley. You buy a ticket from the 食券機 by the door, hand it over, and Taishō
   (black tee, white tenugui, arms that never stop) builds the bowl: tare in, broth ladled from the bubbling tonkotsu pot, noodles
   lifted from the boiler and slammed dry with the tebo ("hai!"), then chāshū, egg, menma, nori fanned up the back. Kenji shouts
   every greeting at full volume and polishes the counter. Wall: blackened wood, yellowing menu strips (醤油 / 味噌 / 塩 / 豚骨 /
   つけ麺), a signed shikishi board, a maneki-neko on the shelf. Window: the yokocho alley — a string of red lanterns, the
   neighbours' noren and signs, extractor-fan steam, a stray cat, umbrellas in the rain. Signatures: KAEDAMA — "Kaedama!" and a
   fresh noodle refill is flicked into a bowl · SLURP — the whole counter slurps in unison, ズルズル. Clock 11:00 lunch rush ->
   03:00 last bowl. Blocks: menma · nori · naruto · chāshū · negi · noodles · beni shōga. */
(() => {
  WORLD_DEFS.push({
    id: 'ramen', name: 'Ramen Yokocho', sub: 'ラーメン横丁 · an eight-seat counter in a lantern alley', thumbY: 0.42,
    desc: 'An eight-seat ramen counter in a lantern alley: a ticket machine by the door, tonkotsu bubbling, noodles slammed dry in the tebo, chāshū and nori fanned on top, and a whole counter slurping — gritty shamisen-funk.',
    accent: '#e8a030', accent2: '#f4d8a0', skin: 'ramen', particle: 'ember',
    boardBg: 'rgba(16,14,14,0.94)', grid: 'rgba(255,230,190,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 96, root: 57, scale: [0, 3, 5, 7, 10], prog: [0, 3, 0, 4], barsPerChord: 1,
      pad: { wave: 'sawtooth', cutoff: 800, gain: 0.014, detune: 6, voices: 3 },
      comp: { inst: 'koto', pattern: E16('x..x...x..x.x...'), voices: 2, gain: 0.045, oct: 0 },
      arp: { inst: 'mandolin', pattern: [0, 2, 3, 2, 4, 3, 2, 0], every: 1, oct: 1, gain: 0.032, density: 0.45 },
      bass: { pattern: E16('x..x..x...x..x..'), gain: 0.18, dec: 0.18, wave: 'square' },
      drums: { kick: E16('x.....x...x.....'), snareInst: 'wood', snare: E16('....x.......x..x'), hat: E16('..x...x...x...x.'), extra: E16('...x.......x....'), extraInst: 'wood' },
      lead: { inst: 'flute', gain: 0.035, density: 0.12, oct: 1 }, sfx: 'koto', clearFx: 'sizzle',
      amb: { chatter: 0.012, clink: 0.016 },
    },
  });
  const RamPal = GeoCafePal({
    day: { wall: '#6a4a32', wall2: '#5a3c28', beam: '#2a1c14', strip: '#f0e2bc', strip2: '#e4d2a4', red: '#c8342a', wood: '#a87a4a', woodDk: '#5a3a22', ink: '#2a2420',
      floor: '#4a4440', floor2: '#3e3834', cnt: '#c89a64', cnt2: '#3a2618', steel: '#b8bcc4', sky0: '#c8d8e4', sky1: '#e8eef0', alley: '#5a5048', alley2: '#4a4038', shop: '#7a5a3e', shop2: '#5e4430', lanA: 0.15, signA: 0.3,
      lamp: '#fff0d0', glow: '#ffd8a0', glowA: 0.12, shaft: '#fff0d0', shaftA: 0.08, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    dusk: { wall: '#62442e', wall2: '#523624', beam: '#261a12', strip: '#ecdab0', strip2: '#dccaa0', red: '#c8342a', wood: '#a07246', woodDk: '#543620', ink: '#2a2420',
      floor: '#44403c', floor2: '#383430', cnt: '#c0925e', cnt2: '#362416', steel: '#b0b4bc', sky0: '#d88a6a', sky1: '#f0b890', alley: '#4a4040', alley2: '#3a3232', shop: '#6a4a34', shop2: '#523a28', lanA: 0.7, signA: 0.7,
      lamp: '#ffe8c0', glow: '#ffd090', glowA: 0.26, shaft: '#ffc890', shaftA: 0.06, amb: '#ffc0a0', ambK: 0.05, sun: '#ff9c60', cloud: '#e8b8a8' },
    night: { wall: '#523a28', wall2: '#44301e', beam: '#1e140e', strip: '#e4d0a4', strip2: '#d4c094', red: '#b82e26', wood: '#8a6440', woodDk: '#46301c', ink: '#2a2420',
      floor: '#3a3634', floor2: '#302c2a', cnt: '#b08654', cnt2: '#2e1e12', steel: '#a0a4ac', sky0: '#0e1020', sky1: '#1a1c2e', alley: '#2a2628', alley2: '#221e20', shop: '#3e2e24', shop2: '#30241c', lanA: 1, signA: 1,
      lamp: '#ffe0b0', glow: '#ffc890', glowA: 0.4, shaft: '#ffc890', shaftA: 0, amb: '#3a3050', ambK: 0.06, sun: '#f4ecd8', cloud: '#2a3040' },
    snow: { alley: '#d8dce2', alley2: '#c8ccd2' },
  }, [[5, 'night'], [7, 'day'], [16.8, 'day'], [18.2, 'dusk'], [19.5, 'night'], [29, 'night'], [31, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 5 && h < 14.5 ? 'Lunch rush' : h >= 14.5 && h < 18 ? 'Afternoon' : h >= 18 && h < 23 ? 'Evening' : 'Last bowl'; });
  const MENU = [{ n: 'Shōyu ramen', c: '#8a5a2a', kind: 'ramen' }, { n: 'Tonkotsu ramen', c: '#f0e6d0', kind: 'ramen' }, { n: 'Miso ramen', c: '#c88a4a', kind: 'ramen' },
    { n: 'Tsukemen', c: '#6a3a1a', kind: 'tsuke' }, { n: 'Gyōza x6', c: '#e8c080', kind: 'gyoza' }, { n: 'Beer', c: '#f0c040', kind: 'beer' }];
  let boil = 0, tebo = 0, gyoza = 0, slurp = 0, kaedama = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'ramen', pal: RamPal, stationX: 54, srvX: 220, spots: [150, 330], maxCust: 2, crowd: 0.7, tagDx: 180, // narrow yokocho counter: taishō at the boiler (80), Kenji at the pass (220), one diner between, never a crowd startHour: 11, span: 16, font: '800 15px "Trebuchet MS", sans-serif', vign: 'rgba(20,10,4,0.28)', zone: 'rgba(40,24,14,0.26)',
    per: (h) => { const x = h < 5 ? h + 24 : h; return x < 14.5 ? 0 : x < 18 ? 1 : x < 23 ? 2 : 3; },
    staff: [{ T: 226, hw: 56, headR: 28, pattern: 'apron', top: 'white', top2: '#2a2a2e', top3: '#c8342a', hairStyle: 'short', hair: 'dark', hat: 'hachimaki', hatCol: 'white', pants: '#2a2a2e' },
      { T: 238, hw: 62, headR: 29, pattern: 'apron', top: '#1e1e22', top2: '#3a3026', top3: '#c8a050', hairStyle: 'buzz', hair: 'dark', hat: 'kerchief', hatCol: 'white', pants: '#1e1e22' }],
    menu: MENU, greet: ['IRASSHAIMASE!!', 'Ticket, please!', 'One seat, here!'], ack: ['HAI!', 'Katame, hai!', 'Yorokonde!'], handOff: ['Omatase shimashita!', 'Hot, careful!', 'Dōzo!'],
    thanks: ['Umai!!', 'icon:heart', 'That broth…'], done: ['Gochisōsama deshita!', 'icon:heart', 'Arigatō!'], cheer: ['Zuzuzu~', 'icon:star', 'Kaedama!'],
    types: {
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', hairStyle: 'short', pants: 'navy' }, words: ['Katame, please', 'Lunch in 12 min'] },
      student: { body: { T: 214, hw: 54, pattern: 'tee', top: 'teal', backpack: 1, packCol: 'mustard', hairStyle: 'side', pants: 'navy' }, words: ['Large, extra noodles', 'Kaedama x2'] },
      worker: { body: { pattern: 'hivis', top: 'mustard', shirt: 'grey', hat: 'cap', hatCol: 'navy', pants: 'olive' }, words: ['Tonkotsu, extra fat', 'After the shift'] },
      ol: { body: { T: 216, hw: 54, pattern: 'jacket', top: 'grey', shirt: 'white', hairStyle: 'pony', hair: 'dark', skirt: 'navy' }, words: ['Hair tie: on', 'Shio, please'] },
      foodie: { body: { pattern: 'tee', top: 'coral', hat: 'bucket', hatCol: 'cream', camera: 1, glasses: 1, pants: 'navy' }, words: ['icon:cam', 'Rated 4.2!'] },
      merry: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'blue', hairStyle: 'short', pants: 'grey', hat: 'headband', hatCol: 'white' }, words: ['Shime no ramen~', 'icon:laugh'] },
      oji: { body: { T: 220, hw: 58, pattern: 'cardigan', top: 'olive', top2: 'brown', hairStyle: 'short', hair: 'hairGrey', hat: 'flatcap', hatCol: 'brown', pants: 'brown' }, words: ['Same as 1987', 'Shōyu.'] },
    },
    parties: [{ m: ['sala'], w: [4, 1, 2, 1] }, { m: ['student'], w: [2, 2, 3, 1] }, { m: ['worker'], w: [2, 1, 2, 2] }, { m: ['ol'], w: [2, 2, 2, 0] }, { m: ['foodie'], w: [1, 3, 2, 0] }, { m: ['merry', 'sala'], w: [0, 0, 1, 4] }, { m: ['oji'], w: [2, 2, 1, 1] }],
    sim(X, dt) { boil += dt; tebo = Math.max(0, tebo - dt * 1.2); gyoza = Math.max(0, gyoza - dt * 0.3); slurp = Math.max(0, slurp - dt * 0.4); kaedama = Math.max(0, kaedama - dt * 0.5); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT, ph = [];
      if (m.kind === 'ramen' || m.kind === 'tsuke') {
        ph.push(K.ph(0.9, (s, u) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [30 + u * 80, CNT.top - 44 - Math.sin(u * Math.PI) * 16]; s.leanT = 0.12; it.o.frac = u * 0.3; s.look = { x: () => 30 + u * 80, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(0.9, (s, u, t) => { tebo = 1; s.hold.N = H.tool('tebo'); s.f = -1; s.tgN = [72, CNT.top - 50 - Math.abs(Math.sin(t * 15)) * 18]; s.leanT = 0.16; it.o.frac = 0.3 + u * 0.3; if (Math.random() < 0.2) K.fx('puff', 72, CNT.top - 40, { life: 0.5, col: '#ffffff' }); }, { enter: () => K.say(a, 'HAI!', 0.6), exit: (s) => { s.hold.N = null; } }));
        ph.push(K.ph(1.0, (s, u, t) => { s.hold.N = H.tool('chopsticks'); s.f = 1; s.tgN = [116 + Math.sin(t * 5) * 6, CNT.top - 26]; s.leanT = 0.14; it.o.frac = 0.6 + u * 0.25; s.look = { x: () => 116, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })); }
      else if (m.kind === 'gyoza') ph.push(K.ph(1.6, (s, u) => { gyoza = 1; s.hold.N = H.tool('spatula'); s.f = 1; s.tgN = [170, CNT.top - 26]; s.leanT = 0.12; it.o.frac = u * 0.85; s.look = { x: () => 170, until: K.simT + 0.3 }; if (Math.random() < 0.06) K.fx('puff', 170, CNT.top - 30, { life: 0.8, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } }));
      else ph.push(K.ph(1.1, (s, u) => { s.hold.N = H.tool('mug'); s.f = 1; s.tgN = [212, CNT.top - 40 + u * 10]; it.o.frac = u * 0.85; s.look = { x: () => 212, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } }));
      ph.push(K.ph(0.5, (s, u) => { s.f = 1; s.tgN = [ST.x + 30, CNT.top - 22]; s.tgF = [ST.x + 42, CNT.top - 16]; it.o.frac = 0.85 + u * 0.15; }, { exit: () => { it.o.frac = 1; } }));
      return ph; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT;
      if (Math.random() < 0.5) return K.start(a, 'skim', [K.ph(rand(2.2, 3.2), (s, u, t) => { s.hold.N = H.tool('ladle'); s.f = -1; s.tgN = [30 + Math.cos(t * 2) * 10, CNT.top - 40]; s.leanT = 0.1; s.look = { x: () => 30, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'arms', [K.ph(rand(2, 3), (s) => { s.f = 1; s.tgN = [ST0(X) + 8, CNT.top - 60]; s.tgF = [ST0(X) - 8, CNT.top - 60]; s.look = { x: () => 900, until: K.simT + 0.3 }; })]); },
    srvIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'polish', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.tool('cloth'); s.tgN = [196 + Math.sin(t * 3) * 18, CNT.top - 10]; s.leanT = 0.1; }), K.ph(1, (s) => { s.hold.N = null; s.look = { x: () => 900, until: K.simT + 0.3 }; }, { enter: () => K.say(a, pick(['IRASSHAIMASE!!', 'Arigatō gozaimashita!!']), 1.1) })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'ladle') { c.strokeStyle = L('#c8ccd0'); c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 12 * s, y - 10 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.beginPath(); c.arc(x + 13 * s, y - 9 * s, 3.6 * s, 0, Math.PI); c.fill(); }
      else if (k === 'tebo') { c.strokeStyle = L('#8a8c90'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 * s, y + 10 * s); c.stroke(); c.fillStyle = L('#b8bcc4'); K0(c, [x + 2 * s, y + 10 * s, x + 12 * s, y + 10 * s, x + 10 * s, y + 20 * s, x + 4 * s, y + 20 * s]); c.fill(); c.fillStyle = L('#f2d470'); c.fillRect(x + 4 * s, y + 9 * s, 6 * s, 2 * s); }
      else if (k === 'chopsticks') { c.strokeStyle = L('#d8c49a'); c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 4 * s, y - 18 * s); c.moveTo(x + 2 * s, y); c.lineTo(x + 7 * s, y - 17 * s); c.stroke(); }
      else if (k === 'spatula') { c.strokeStyle = L('#8a6a4a'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 * s, y - 8 * s); c.stroke(); c.fillStyle = L('#c8ccd0'); c.fillRect(x + 5 * s, y - 13 * s, 8 * s, 5 * s); }
      else if (k === 'mug') { c.fillStyle = 'rgba(240,190,60,0.9)'; c.fillRect(x - 4 * s, y - 11 * s, 8 * s, 11 * s); c.fillStyle = L('#fbf8f0'); c.fillRect(x - 4 * s, y - 13 * s, 8 * s, 3 * s); }
      else if (k === 'cloth') { c.fillStyle = L('#eef0f4'); c.fillRect(x - 5 * s, y - 2 * s, 10 * s, 4 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.kind === 'ramen' || m.kind === 'tsuke') { c.fillStyle = L('#2a2a2e'); c.beginPath(); c.moveTo(-10, -9); c.quadraticCurveTo(-10, 0, 0, 0); c.quadraticCurveTo(10, 0, 10, -9); c.closePath(); c.fill(); c.strokeStyle = L('#c8342a'); c.lineWidth = 0.8; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 3.6 - 1, -6); c.lineTo(i * 3.6 + 1, -4); c.lineTo(i * 3.6 - 1, -2); c.stroke(); }
        if (frac > 0.2) { c.fillStyle = L(m.c); ellipse(c, 0, -9, 9.4, 2.4); c.fill(); } if (frac > 0.55) { c.fillStyle = L('#f2d470'); ellipse(c, 1, -9.4, 5, 1.2); c.fill(); } if (frac > 0.7) { c.fillStyle = L('#1e2e1c'); K0(c, [5, -9, 9, -9, 8, -16, 4, -15]); c.fill(); c.fillStyle = L('#c8806a'); c.beginPath(); c.arc(-4, -10, 2.8, 0, TAU); c.fill(); c.fillStyle = L('#f4f0e6'); ellipse(c, 0, -10, 2.2, 1.6); c.fill(); c.fillStyle = L('#eeac2a'); c.beginPath(); c.arc(0, -10, 1, 0, TAU); c.fill(); c.fillStyle = L('#7ab048'); c.fillRect(-7, -10.5, 2, 1); c.fillRect(2, -11, 2, 1); } if (frac > 0.9) { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(0, -17, 2.4, 0, TAU); c.fill(); } }
      else if (m.kind === 'gyoza') { c.fillStyle = L('#2a2a2e'); ellipse(c, 0, -1, 11, 2.4); c.fill(); for (let i = 0; i < 6; i++) if (frac > i * 0.14) { c.fillStyle = L(i % 2 ? '#e8c080' : '#d8a050'); c.beginPath(); c.ellipse(-8 + i * 3.2, -3, 2.2, 3.2, 0.3, 0, TAU); c.fill(); } }
      else { c.fillStyle = L('#f0c040'); c.fillRect(-4.5, -13, 9, 13); c.fillStyle = L('#fbf8f0'); c.fillRect(-4.5, -16, 9, 3.6); c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1; c.strokeRect(4.5, -10, 3.4, 6); }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.ramen = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L;
      c.fillStyle = P.wall; c.fillRect(-60, 40, 1400, 620); c.strokeStyle = rgba(P.wall2, 0.9); c.lineWidth = 2; for (let i = 0; i < 46; i++) { c.beginPath(); c.moveTo(-60 + i * 32, 40); c.lineTo(-60 + i * 32, 660); c.stroke(); }
      c.fillStyle = P.beam; c.fillRect(-60, 0, 1400, 46); c.fillRect(-60, 290, 1400, 12);
      // menu strips (yellowed paper, brush-ish type) along the top: left strip readable
      { const items = [['醤油', '850'], ['味噌', '900'], ['塩', '850'], ['豚骨', '950'], ['つけ麺', '1000'], ['餃子', '450'], ['替玉', '150'], ['ビール', '600']];
        items.forEach(([n, p], i) => { const sx = 14 + i * 31, sy = 56; c.fillStyle = i % 2 ? P.strip2 : P.strip; c.fillRect(sx, sy, 27, 130); c.fillStyle = rgba('#000000', 0.08); c.fillRect(sx + 23, sy, 4, 130); c.fillStyle = L('#2a2420'); c.font = `400 ${n.length > 2 ? 12 : 15}px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; [...n].forEach((ch, k) => c.fillText(ch, sx + 13.5, sy + 16 + k * (n.length > 2 ? 15 : 19))); c.fillStyle = L(P.red); c.font = '800 9px "Trebuchet MS", sans-serif'; c.fillText(p, sx + 13.5, sy + 118); }); }
      // the ticket machine by the door (left strip, under the menu), a shikishi and the maneki-neko
      { const mx = 22, my = 200; c.fillStyle = L('#d8dce2'); roundRect(c, mx, my, 92, 82, 4); c.fill(); c.fillStyle = L('#2a5aa8'); c.fillRect(mx, my, 92, 14); c.fillStyle = L('#fbfdff'); c.font = `400 10px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('食券機', mx + 46, my + 7);
        for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) { c.fillStyle = L(r === 0 && k < 2 ? '#e8b03a' : '#fbf8f0'); c.fillRect(mx + 6 + k * 21, my + 20 + r * 16, 18, 12); c.fillStyle = rgba('#2a2420', 0.5); c.fillRect(mx + 9 + k * 21, my + 25 + r * 16, 12, 2); }
        c.fillStyle = L('#2a2a30'); c.fillRect(mx + 30, my + 70, 32, 6); }
      { const sx = 130, sy = 200; c.fillStyle = L('#f4ecd8'); c.fillRect(sx, sy, 60, 72); c.strokeStyle = L('#c8a050'); c.lineWidth = 2; c.strokeRect(sx + 2, sy + 2, 56, 68); c.strokeStyle = L('#2a2420'); c.lineWidth = 1.6; c.beginPath(); c.moveTo(sx + 14, sy + 20); c.quadraticCurveTo(sx + 30, sy + 10, sx + 44, sy + 28); c.quadraticCurveTo(sx + 26, sy + 40, sx + 40, sy + 56); c.stroke(); c.fillStyle = L('#c8342a'); c.fillRect(sx + 42, sy + 56, 6, 6); }
      { const nx = 222, ny = 270; c.fillStyle = L('#fbf8f0'); ellipse(c, nx, ny - 8, 13, 12); c.fill(); c.beginPath(); c.arc(nx, ny - 26, 11, 0, TAU); c.fill(); K0(c, [nx - 10, ny - 32, nx - 6, ny - 42, nx - 2, ny - 34]); c.fill(); K0(c, [nx + 2, ny - 34, nx + 6, ny - 42, nx + 10, ny - 32]); c.fill(); c.fillStyle = L('#c8342a'); c.fillRect(nx - 9, ny - 17, 18, 3); c.fillStyle = L('#e8b03a'); c.beginPath(); c.arc(nx, ny - 12, 3, 0, TAU); c.fill(); c.fillStyle = L('#fbf8f0'); c.save(); c.translate(nx + 12, ny - 30); c.rotate(-0.3 + Math.sin(t * 2) * 0.3); c.fillRect(-3, -10, 6, 12); c.restore(); c.fillStyle = L('#2a2420'); c.fillRect(nx - 5, ny - 28, 2, 1.4); c.fillRect(nx + 3, ny - 28, 2, 1.4); }
      // hanging red lanterns + steam haze behind the board
      for (const lx of [300, 1010, 1270]) { c.fillStyle = L('#2a1c14'); c.fillRect(lx - 1, 46, 2, 22); c.fillRect(lx - 10, 68, 20, 4); c.fillRect(lx - 10, 112, 20, 4); c.fillStyle = L(P.red); ellipse(c, lx, 92, 17, 21); c.fill(); c.fillStyle = L('#2a1410'); c.font = `400 11px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['ら', 'ー', 'め', 'ん'].forEach((ch, k) => c.fillText(ch, lx, 78 + k * 9.5)); K.glow(c, lx, 92, 70, '#ff8a50', 0.14 + 0.24 * P.lanA); }
      for (let k = 0; k < 5; k++) { const ph = (t * 0.06 + k * 0.2) % 1; c.fillStyle = rgba('#ffffff', 0.06 * (1 - ph)); c.beginPath(); c.arc(360 + k * 160, 500 - ph * 300, 60 + ph * 60, 0, TAU); c.fill(); }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.beam; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      // sliding wood-lattice door, half-open, with the shop's noren hanging outside
      c.fillStyle = P.beam; c.fillRect(x0 + (x1 - x0) * 0.62, y0, 6, y1 - y0); c.strokeStyle = P.beam; c.lineWidth = 2; for (let j = 1; j < 6; j++) { c.beginPath(); c.moveTo(x0 + (x1 - x0) * 0.62, y0 + j * (y1 - y0) / 6); c.lineTo(x1, y0 + j * (y1 - y0) / 6); c.stroke(); } c.beginPath(); c.moveTo(x0 + (x1 - x0) * 0.81, y0); c.lineTo(x0 + (x1 - x0) * 0.81, y1); c.stroke();
      c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(x0 + (x1 - x0) * 0.62, y0, (x1 - x0) * 0.38, y1 - y0);
      for (let k = 0; k < 3; k++) { const nx = x0 + 4 + k * ((x1 - x0) / 3), sw = Math.sin(K.simT * 1.2 + k) * 2; c.fillStyle = L('#1e2a44'); K0(c, [nx, y0, nx + (x1 - x0) / 3 - 4, y0, nx + (x1 - x0) / 3 - 4 + sw, y0 + 86, nx + sw, y0 + 86]); c.fill(); }
      c.fillStyle = L('#f4ecd8'); c.font = `400 22px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['ら', '麺', 'ん'].forEach((ch, k) => c.fillText(['中', '華', '麺'][k], x0 + 4 + (k + 0.5) * ((x1 - x0) / 3) - 2, y0 + 44));
      c.fillStyle = P.beam; roundRect(c, x0 - 4, y0 - 52, x1 - x0 + 8, 36, 4); c.fill(); c.fillStyle = L('#f0d890'); c.font = `400 17px ${JP_FONT}`; c.fillText('らーめん 横丁', (x0 + x1) / 2, y0 - 34); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0, n = P.night;
      c.fillStyle = P.sky0; c.fillRect(x0, y0, w, 60); c.strokeStyle = rgba('#2a2420', 0.8); c.lineWidth = 1.2; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(x0, y0 + 20 + k * 10); c.quadraticCurveTo(x0 + w / 2, y0 + 40 + k * 10, x1, y0 + 14 + k * 10); c.stroke(); }
      // the neighbours across the alley: low wooden fronts, signs, noren, an extractor fan steaming
      c.fillStyle = P.shop; c.fillRect(x0, y0 + 50, w, 230); c.fillStyle = P.shop2; for (let k = 0; k < 3; k++) c.fillRect(x0 + k * (w / 3), y0 + 50, 4, 230);
      for (const [k, tx, col] of [[0, 'やきとり', '#f4ecd8'], [1, '酒場', '#ffd040'], [2, 'もつ', '#f4ecd8']]) { const sx = x0 + (k + 0.5) * (w / 3); c.fillStyle = rgba('#141010', 0.9); c.fillRect(sx - 26, y0 + 70, 52, 22); c.fillStyle = col; c.font = `400 13px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(tx, sx, y0 + 81); K.glow(c, sx, y0 + 81, 40, col, 0.12 * P.signA);
        c.fillStyle = L(['#8a2a20', '#2a3a5a', '#3a4a2a'][k]); c.fillRect(sx - 28, y0 + 150, 56, 40); c.fillStyle = rgba('#ffe0a0', 0.25 + 0.55 * P.lanA); c.fillRect(sx - 24, y0 + 194, 48, 70); }
      { const fx = x0 + w * 0.72, fy = y0 + 110; c.fillStyle = L('#8a8c90'); c.fillRect(fx - 12, fy - 12, 24, 24); c.strokeStyle = L('#5a5c60'); c.lineWidth = 1.4; const fa = t * 6; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(fx, fy); c.lineTo(fx + Math.cos(fa + k * 2.1) * 10, fy + Math.sin(fa + k * 2.1) * 10); c.stroke(); } for (let k = 0; k < 3; k++) { const ph = (t * 0.3 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', 0.3 * (1 - ph)); c.beginPath(); c.arc(fx + ph * 30, fy - 10 - ph * 40, 6 + ph * 12, 0, TAU); c.fill(); } }
      // a string of red lanterns down the alley
      c.strokeStyle = rgba('#2a2420', 0.9); c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0 + 40); c.quadraticCurveTo(x0 + w / 2, y0 + 60, x1, y0 + 40); c.stroke(); for (let k = 0; k < 6; k++) { const lx = x0 + 18 + k * (w - 36) / 5, ly = y0 + 48 + Math.sin(k / 5 * Math.PI) * 10; c.fillStyle = L(P.red); ellipse(c, lx, ly + 10, 7, 9); c.fill(); K.glow(c, lx, ly + 10, 24, '#ff7a40', 0.3 * P.lanA); }
      // the alley floor, puddles, a stray cat and passers-by
      c.fillStyle = P.alley; c.fillRect(x0, y0 + 270, w, hh - 270); c.fillStyle = P.alley2; for (let k = 0; k < 9; k++) c.fillRect(x0, y0 + 278 + k * 10, w, 1.5); c.fillStyle = rgba('#ffb070', 0.18 * P.lanA); ellipse(c, x0 + w * 0.3, y0 + 310, 30, 5); c.fill();
      { const cx = x0 + w * 0.2 + Math.sin(t * 0.2) * 20, cy = y0 + 300; c.fillStyle = L('#3a3434'); ellipse(c, cx, cy, 10, 5); c.fill(); c.beginPath(); c.arc(cx + 9, cy - 5, 4.4, 0, TAU); c.fill(); K0(c, [cx + 6, cy - 8, cx + 7, cy - 12, cx + 9, cy - 9]); c.fill(); K0(c, [cx + 10, cy - 9, cx + 12, cy - 12, cx + 13, cy - 8]); c.fill(); c.strokeStyle = L('#3a3434'); c.lineWidth = 2; c.beginPath(); c.moveTo(cx - 10, cy); c.quadraticCurveTo(cx - 18, cy - 6 + Math.sin(t * 3) * 3, cx - 14, cy - 12); c.stroke(); }
      for (let k = 0; k < 2; k++) { const px = x0 + ((t * (14 + k * 6) + k * 120) % (w + 60)) - 30, py = y0 + 330; c.fillStyle = L(['#2e4a6a', '#5a4a3a'][k]); c.fillRect(px - 5, py - 32, 10, 22); c.fillRect(px - 4, py - 10, 3, 12); c.fillRect(px + 1, py - 10, 3, 12); c.fillStyle = L('#ecb88e'); c.beginPath(); c.arc(px, py - 38, 5, 0, TAU); c.fill(); if (K.weatherNow === 'rain' || K.weatherNow === 'storm') { c.fillStyle = L(['#f4f0e6', '#c8342a'][k]); c.beginPath(); c.arc(px, py - 46, 14, Math.PI, TAU); c.fill(); c.fillStyle = L('#3a3a40'); c.fillRect(px - 0.6, py - 46, 1.2, 14); } }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let r = 0; r < 4; r++) for (let i = 0; i < 30; i++) { c.fillStyle = (i + r) % 2 ? P.floor : P.floor2; c.fillRect(-60 + i * 48, 642 + r * 26, 48, 26); } c.fillStyle = rgba('#000000', 0.12); c.fillRect(-60, 642, 1400, 4); },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT;
      // back shelf: stacked bowls, a jar of tare, the bottles
      { const sy = top - 104; c.fillStyle = P.woodDk; c.fillRect(-10, sy + 30, 140, 6); for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) { c.fillStyle = L(j % 2 ? '#2a2a2e' : '#3a3a40'); c.beginPath(); c.moveTo(12 + k * 26 - 10, sy + 30 - j * 5); c.quadraticCurveTo(12 + k * 26, sy + 34 - j * 5, 12 + k * 26 + 10, sy + 30 - j * 5); c.lineTo(12 + k * 26 + 8, sy + 26 - j * 5); c.lineTo(12 + k * 26 - 8, sy + 26 - j * 5); c.closePath(); c.fill(); } }
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // tonkotsu stockpot (rolling boil), the noodle boiler with tebo baskets, the bowl station, the gyōza pan, beer tap
      { const px = 30, py = top - 6; c.fillStyle = L('#b8bcc4'); c.fillRect(px - 20, py - 36, 40, 36); c.fillStyle = L('#f0e6d0'); ellipse(c, px, py - 36, 20, 4.4); c.fill(); for (let k = 0; k < 4; k++) { const ph = (boil * 1.6 + k * 0.27) % 1; c.fillStyle = rgba('#ffffff', 0.7 * (1 - ph)); c.beginPath(); c.arc(px - 12 + k * 8, py - 36, 1 + ph * 2.4, 0, TAU); c.fill(); } c.fillStyle = rgba('#000000', 0.12); c.fillRect(px - 20, py - 22, 40, 3);
        for (let k = 0; k < 3; k++) { const ph = (t * 0.45 + k * 0.33) % 1; c.fillStyle = rgba('#ffffff', 0.36 * (1 - ph)); c.beginPath(); c.arc(px + Math.sin(t + k) * 5, py - 44 - ph * 34, 5 + ph * 11, 0, TAU); c.fill(); } }
      { const bx = 72, by = top - 6; c.fillStyle = L('#a8acb4'); c.fillRect(bx - 16, by - 22, 32, 22); for (let k = 0; k < 3; k++) { c.strokeStyle = L('#6a6c74'); c.lineWidth = 1.4; c.beginPath(); c.moveTo(bx - 10 + k * 10, by - 22); c.lineTo(bx - 10 + k * 10 + 4, by - 34); c.stroke(); } const st = 0.3 + tebo * 0.7; for (let k = 0; k < 2; k++) { const ph = (t * 0.6 + k * 0.5) % 1; c.fillStyle = rgba('#ffffff', st * 0.4 * (1 - ph)); c.beginPath(); c.arc(bx + Math.sin(t * 2 + k) * 4, by - 30 - ph * 26, 4 + ph * 8, 0, TAU); c.fill(); } }
      { const wx = 120, wy = top - 6; for (let k = 0; k < 2; k++) { c.fillStyle = L('#2a2a2e'); c.beginPath(); c.moveTo(wx - 9 + k * 20, wy - 9); c.quadraticCurveTo(wx - 9 + k * 20, wy, wx + k * 20, wy); c.quadraticCurveTo(wx + 9 + k * 20, wy, wx + 9 + k * 20, wy - 9); c.closePath(); c.fill(); c.fillStyle = L(k ? '#f0e6d0' : '#8a5a2a'); ellipse(c, wx + k * 20, wy - 9, 8.4, 2); c.fill(); } }
      { const gx = 172, gy = top - 6; c.fillStyle = L('#2a2a30'); c.fillRect(gx - 18, gy - 6, 36, 6); c.fillStyle = L('#3a3a42'); ellipse(c, gx, gy - 7, 18, 3.4); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = L(k % 2 ? '#e8c080' : '#d8a050'); c.beginPath(); c.ellipse(gx - 12 + k * 4.8, gy - 8, 2.2, 3.4, 0.3, 0, TAU); c.fill(); } if (gyoza > 0) for (let k = 0; k < 2; k++) { const ph = (t * 0.8 + k * 0.5) % 1; c.fillStyle = rgba('#ffffff', 0.4 * gyoza * (1 - ph)); c.beginPath(); c.arc(gx + Math.sin(t + k) * 5, gy - 14 - ph * 24, 4 + ph * 8, 0, TAU); c.fill(); } }
      { const bx = 212, by = top - 6; c.fillStyle = L('#c8ccd4'); c.fillRect(bx - 9, by - 36, 18, 36); c.fillStyle = L('#c8342a'); c.fillRect(bx - 9, by - 30, 18, 7); c.fillStyle = L('#3a3a46'); c.fillRect(bx - 2, by - 44, 4, 8); c.fillRect(bx - 2, by - 44, 9, 3); }
      // counter front: dark wood with the red-and-white chirashi poster and a stack of water cups
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = rgba(P.wood, 0.5); c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, 3);
      c.fillStyle = L('#f4ecd8'); c.fillRect(x0 + 20, top + 20, 84, 54); c.fillStyle = L('#c8342a'); c.fillRect(x0 + 20, top + 20, 84, 16); c.fillStyle = L('#f4ecd8'); c.font = `400 11px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('替玉 無料', x0 + 62, top + 28); c.fillStyle = L('#2a2420'); c.font = `400 10px ${JP_FONT}`; c.fillText('固め · 普通 · 柔め', x0 + 62, top + 54);
      for (let k = 0; k < 3; k++) { c.strokeStyle = rgba(P.wood, 0.35); c.lineWidth = 1; c.strokeRect(x0 + 120 + k * 42, top + 20, 34, 104); }
      if (slurp > 0) { c.fillStyle = rgba('#fbf4e4', slurp); c.font = `400 16px ${JP_FONT}`; c.textAlign = 'center'; for (let k = 0; k < 3; k++) c.fillText('ズルズル', 60 + k * 80, top - 80 - (1 - slurp) * 20 + (k % 2) * 10); }
    },
    events: [
      { name: 'kaedama', dur: 8, start(X, srv, mk) { const K = X.K; const g = K.actors.filter((q) => q.cust); kaedama = 1; tebo = 1; if (g[0]) K.say(g[0], 'Kaedama!', 1.3); K.after(0.8, () => { K.say(mk, 'HAI, KAEDAMA!', 1.3); K.fx('puff', 72, X.CNT.top - 44, { life: 1, col: '#ffffff' }); }); K.after(2.2, () => { K.say(srv, 'Katame de!', 1.2); for (const c of g.slice(1)) if (Math.random() < 0.6) K.say(c, pick(['Me too!', 'Kaedama!', 'icon:star']), 1.2); }); } },
      { name: 'slurp', dur: 7, start(X, srv, mk) { const K = X.K; slurp = 1; for (const c of K.actors.filter((q) => q.cust)) K.say(c, pick(['Zuzuzu~', 'Zuzu…', 'icon:heart']), 1.4); K.after(1.6, () => K.say(mk, 'icon:star', 1)); } },
    ],
  };
  function ST0(X) { return X.ST ? X.ST.x : 96; }
  registerStage('ramen', makeGeoCafe(W));
})();
