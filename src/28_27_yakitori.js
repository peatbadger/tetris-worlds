/* ================= NEW WORLD · Yakitori — GEOMETRIC edition =================
   A tachinomi yakitori counter under the railway arches (gādo-shita homage). Taishō-san in a hachimaki works the charcoal
   konro: every skewer he lays down really grills — raw pink -> opaque -> golden -> lacquered in tare — while he fans the
   coals with an uchiwa and the embers flare. Okami-san pulls draft beer and highballs. Guests stand at the plank by the
   open shopfront under a split noren: steel girders overhead, trains rumbling across, red lanterns along the arches.
   Signatures: the TRAIN — the whole bar rattles, lanterns swing, everyone raises a glass ("Kanpai!") · the FLARE-UP —
   fat drips, flames leap, a cloud of smoke. Clock 16:00 opening -> dusk -> salaryman night -> last train.
   Blocks: negima · yaki onigiri · tebasaki · shishito · kawa · tsukune · reba. */
(() => {
  WORLD_DEFS.push({
    id: 'yakitori', name: 'Yakitori', sub: '焼鳥 · charcoal skewers under the railway arches', thumbY: 0.42,
    desc: 'A standing yakitori bar under the train tracks: skewers that change colour as they grill over white-hot charcoal, a fanning master, draft beer, red lanterns and trains rumbling overhead — shamisen-tinged Showa-era pop.',
    accent: '#e8503a', accent2: '#f0b048', skin: 'yakitori', particle: 'steam',
    boardBg: 'rgba(22,14,12,0.9)', grid: 'rgba(255,190,140,0.06)',
    palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'],
    music: {
      bpm: 86, root: 57, scale: [0, 2, 5, 7, 9], prog: [0, 3, 4, 0], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1300, gain: 0.024, detune: 5, voices: 3 },
      comp: { inst: 'piano', pattern: E16('..x...x...x...x.'), voices: 3, gain: 0.03, oct: 0 },
      arp: { inst: 'koto', pattern: [0, 2, 4, 2, 3, 1, 2, 0], every: 2, oct: 1, gain: 0.08, density: 0.75 },
      bass: { pattern: E16('x.....x.x.......'), inst: 'upbass', gain: 0.2, dec: 0.4, oct: -1 },
      drums: { kick: E16('x.......x.......'), snareInst: 'wood', snare: E16('....x.......x...'), hat: E16('..x...x...x...x.'), extra: E16('x..............x'), extraInst: 'bell' },
      lead: { inst: 'flute', gain: 0.045, density: 0.14, oct: 1 }, sfx: 'koto', clearFx: 'sizzle',
      amb: { chatter: 0.024, clink: 0.022 },
    },
  });
  const YakPal = GeoCafePal({
    day: { wall: '#6a4a34', wall2: '#5e402c', trim: '#c83a2a', wood: '#a87a4e', woodDk: '#3a2618', floor: '#4a4440', floor2: '#3c3632', cnt: '#c4985e', cnt2: '#9a7244', steel: '#b8b8bc', glass: '#e4eef4', noren: '#2a3a5a', lan: '#e0402e', brick: '#8a4a34', brick2: '#6e3a28',
      sky0: '#8ab8e0', sky1: '#f0e8d8', out1: '#7a8478', out2: '#5a6258', out3: '#3a3e3a', road: '#7a7470', lit: '#ffe0a0', litA: 0.15, lamp: '#ffe8c8', glow: '#ffb070', glowA: 0.16, shaft: '#fff0d8', shaftA: 0.12, amb: '#ffffff', ambK: 0, sun: '#fff0d8', cloud: '#ffffff' },
    dusk: { wall: '#5a3c2a', wall2: '#4e3424', trim: '#b8321e', wood: '#946a42', woodDk: '#2e1e12', floor: '#3e3834', floor2: '#322c28', cnt: '#b08654', cnt2: '#86603a', steel: '#a8a0a4', glass: '#d8d0e0', noren: '#24324e', lan: '#e8482e', brick: '#7a3e2c', brick2: '#5e3022',
      sky0: '#4a3a78', sky1: '#f49868', out1: '#5a5a5a', out2: '#3e3e44', out3: '#2a2a30', road: '#5a5458', lit: '#ffd890', litA: 0.65, lamp: '#ffd8a0', glow: '#ff9a50', glowA: 0.34, shaft: '#ffc8a0', shaftA: 0.08, amb: '#ffc8b0', ambK: 0.06, sun: '#ff9a60', cloud: '#c8a0b8' },
    night: { wall: '#3a2a20', wall2: '#32241a', trim: '#982a1a', wood: '#5e4430', woodDk: '#1e140c', floor: '#2a2624', floor2: '#201c1a', cnt: '#7e6040', cnt2: '#5a422a', steel: '#80787c', glass: '#8a98b0', noren: '#1a2440', lan: '#f0502e', brick: '#4e2a20', brick2: '#3a1e16',
      sky0: '#080a1c', sky1: '#1c1e3a', out1: '#3a3a40', out2: '#26262c', out3: '#18181c', road: '#2a2628', lit: '#ffd070', litA: 1, lamp: '#ffc070', glow: '#ff8a3a', glowA: 0.5, shaft: '#ffc080', shaftA: 0, amb: '#2a2a4a', ambK: 0.12, sun: '#f4ecd8', cloud: '#2a2e48' },
    snow: { sky0: '#b4c0d0', sky1: '#e8ecf2', road: '#d8dce2' },
  }, [[6, 'night'], [10, 'day'], [16.8, 'day'], [18.2, 'dusk'], [19.6, 'night'], [30, 'night'], [34, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 17.5 ? 'Noren up' : h >= 17.5 && h < 19.5 ? 'After work' : h >= 19.5 && h < 24 ? 'Salaryman night' : 'Last train'; });
  // raw -> cooked colour ramp for everything on the grill (and the held skewers)
  const RAMP = { meat: ['#eaa6a0', '#f0dcc8', '#e0a85a', '#9a5422', '#5a2a12'], skin: ['#f4d8c8', '#f4e4c8', '#f0c060', '#c8802a', '#6a3814'], green: ['#6ab048', '#5aa040', '#4a8a30', '#3e6a24', '#2a3a14'] };
  const ramp = (k, u) => { const r = RAMP[k] || RAMP.meat, f = Math.max(0, Math.min(0.999, u)) * (r.length - 1), i = Math.floor(f); return mix(r[i], r[i + 1], f - i); };
  const MENU = [{ n: 'Negima', c: '#9a5422', sk: 'negi' }, { n: 'Tsukune', c: '#5a2a12', sk: 'tsuk' }, { n: 'Kawa', c: '#c8802a', sk: 'kawa' }, { n: 'Tebasaki', c: '#b86a2a', sk: 'teba' },
    { n: 'Nama beer', c: '#f0b030', beer: 1 }, { n: 'Highball', c: '#f4e8b8', hb: 1 }, { n: 'Yaki onigiri', c: '#8a5a2a', oni: 1 }];
  const SLOTS = [0, 1, 2, 3, 4].map((i) => ({ x: 18 + i * 16, kind: MENU[i % 4].sk, cook: 0.2 + i * 0.17, ord: 0 }));
  let heat = 0.4, flare = 0, train = { x: -1, t: 6, dir: 1 }, rattle = 0, toastT = 0;
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  function skewer(c, L, x, y, s, kind, u, n = 3, horiz = 0) { // a small skewer seen from the side, colour = cooking progress u
    c.strokeStyle = L('#d8c4a0'); c.lineWidth = 1.1 * s; c.beginPath(); if (horiz) { c.moveTo(x - 12 * s, y); c.lineTo(x + 12 * s, y); } else { c.moveTo(x, y + 6 * s); c.lineTo(x, y - 16 * s); } c.stroke();
    for (let i = 0; i < n; i++) { const px = horiz ? x - 7 * s + i * 6 * s : x, py = horiz ? y : y - 3 * s - i * 5 * s;
      if (kind === 'negi' && i === 1) { c.fillStyle = L(ramp('green', u * 0.7)); c.fillRect(px - 2.6 * s, py - 2 * s, 5.2 * s, 4 * s); c.fillStyle = L('#f0f0e0'); c.fillRect(px - 2.6 * s, py - 0.6 * s, 5.2 * s, 1.2 * s); continue; }
      c.fillStyle = L(ramp(kind === 'kawa' ? 'skin' : 'meat', kind === 'tsuk' ? Math.min(1, u * 1.15) : u));
      if (kind === 'tsuk') { roundRect(c, px - 3.4 * s, py - 2.4 * s, 6.8 * s, 4.8 * s, 2 * s); c.fill(); }
      else { c.beginPath(); c.arc(px, py, (kind === 'teba' ? 3.4 : 2.8) * s, 0, TAU); c.fill(); }
      if (u > 0.55) { c.fillStyle = 'rgba(30,10,0,0.45)'; c.fillRect(px - 2 * s, py - 0.4 * s, 4 * s, 0.8 * s); }
      if (u > 0.7) { c.fillStyle = 'rgba(255,230,190,0.5)'; c.beginPath(); c.arc(px - 1 * s, py - 1 * s, 0.8 * s, 0, TAU); c.fill(); } }
  }
  const W = {
    id: 'yakitori', pal: YakPal, stationX: 96, startHour: 16, span: 10, font: `700 15px ${JP_FONT}`, vign: 'rgba(16,8,4,0.36)', zone: 'rgba(255,236,220,0.18)',
    per: (h) => { const x = h < 6 ? h + 24 : h; return x < 17.5 ? 0 : x < 19.5 ? 1 : x < 22.5 ? 2 : x < 24.6 ? 3 : 4; },
    staff: [{ T: 226, hw: 58, headR: 28, pattern: 'apron', top: 'navy', top2: 'cream', shirt: 'cream', hairStyle: 'bun', hair: 'dark', pants: 'dark' },
      { T: 240, hw: 64, headR: 29, pattern: 'chef', top: 'white', top2: 'white', hairStyle: 'short', hair: 'hairGrey', hat: 'band', hatCol: 'white', pants: 'dark' }],
    menu: MENU, greet: ['Irasshai!', 'Irasshaimase!', 'Otsukare-sama!'], ack: ['Hai yorokonde!', 'Hai!', 'Coming up'], handOff: ['Omachi!', 'Hot — careful', 'Dōzo!'],
    thanks: ['Arigatō!', 'Kore kore!', 'icon:heart'], done: ['Umai!', 'Gochisō-sama', 'icon:heart'], cheer: ['Kanpai!', 'Sugoi!', 'Ii ne!'],
    types: {
      sala: { body: { pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', hairStyle: 'short', pants: 'navy' }, words: ['Long day…', 'One more beer'] },
      sala2: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'navy', glasses: 1, hairStyle: 'short', pants: 'dark' }, words: ['Kachō is paying', 'Kanpai!'] },
      ol: { body: { T: 230, hw: 54, pattern: 'jacket', top: 'cream', shirt: 'white', hairStyle: 'long', hair: 'dark', skirt: 'navy' }, words: ['Kawa, shio please', 'icon:heart'] },
      worker: { body: { pattern: 'hivis', top: 'mustard', shirt: 'grey', hat: 'kerchief', hatCol: 'navy', pants: 'olive' }, words: ['Big shift', 'Nama, quick!'] },
      regular: { body: { T: 226, hw: 62, torso: 'round', pattern: 'cardigan', top: 'brown', top2: 'cream', hat: 'flatcap', hatCol: 'grey', hair: 'hairGrey', glasses: 1 }, words: ['The usual', '30 years here'] },
      tourA: { body: { pattern: 'tee', top: 'teal', hat: 'bucket', hatCol: 'cream', camera: 1, backpack: 1, packCol: 'coral', pants: 'brown' }, words: ['So smoky!', 'icon:cam'] },
      tourB: { body: { T: 232, hw: 54, pattern: 'jacket', top: 'coral', shirt: 'white', hairStyle: 'long', hair: 'mustard' }, words: ['Under the tracks!', 'icon:heart'] },
    },
    parties: [{ m: ['sala', 'sala2'], w: [0, 3, 3, 3, 0] }, { m: ['ol'], w: [1, 3, 2, 1, 0] }, { m: ['worker'], w: [3, 2, 1, 0, 0] }, { m: ['regular'], w: [3, 1, 1, 1, 0] }, { m: ['tourA', 'tourB'], w: [2, 2, 2, 0, 0] }],
    sim(X, dt) { heat = Math.max(0.35, heat - dt * 0.25); flare = Math.max(0, flare - dt * 0.35); rattle = Math.max(0, rattle - dt * 0.4); toastT = Math.max(0, toastT - dt);
      for (const s of SLOTS) { if (!s.ord) { s.cook += dt * 0.012 * (0.6 + heat); if (s.cook > 1) { s.cook = 0; s.kind = pick(['negi', 'tsuk', 'kawa', 'teba']); } } }
      train.t -= dt; if (train.x < 0 && train.t <= 0) { train.x = 0.0001; train.dir = Math.random() < 0.5 ? 1 : -1; } if (train.x > 0) { train.x += dt * 0.2; rattle = Math.max(rattle, Math.sin(Math.min(1, train.x / 1.6) * Math.PI)); if (train.x > 1.6) { train.x = -1; train.t = rand(18, 34); } } },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.beer || m.hb) return [K.ph(0.5, (s) => { s.hold.N = H.tool(m.beer ? 'mug' : 'glass'); s.tgN = [228, CNT.top - 34]; s.leanT = 0.15; s.walkTo = 196; }, { until: (s) => !s.walking, max: 6 }),
        K.ph(1.4, (s, u) => { s.f = 1; s.tgN = [226, CNT.top - 30]; s.tgF = [232, CNT.top - 50]; it.o.frac = u; s.look = { x: () => 230, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; s.walkTo = ST.x + 26; } })];
      const sl = SLOTS.reduce((b, q) => (!q.ord && (!b || q.cook > b.cook) ? q : b), null) || SLOTS[0]; sl.ord = 1; sl.cook = 0; sl.kind = m.sk || 'negi'; const sx = sl.x;
      const lay = K.ph(0.7, (s) => { s.f = -1; s.tgN = [sx, CNT.top - 30]; s.leanT = 0.22; s.look = { x: () => sx, until: K.simT + 0.3 }; });
      const fan = K.ph(2.6, (s, u, t) => { s.hold.N = H.tool('uchiwa'); heat = 1; sl.cook = u * 0.85; s.tgN = [sx + 14 + Math.sin(t * 16) * 6, CNT.top - 44 + Math.cos(t * 16) * 4]; s.tgF = [sx - 8, CNT.top - 26]; s.look = { x: () => sx, until: K.simT + 0.3 }; if (Math.random() < 0.06) K.fx('spark', sx, CNT.top - 30, { life: 0.6, col: '#ffb040' }); if (Math.random() < 0.05) K.fx('puff', sx, CNT.top - 50, { life: 1.6, col: '#d8d0c8' }); }, { exit: (s) => { s.hold.N = null; } });
      const tare = K.ph(0.8, (s, u) => { s.tgN = [110, CNT.top - 30]; sl.cook = 0.85 + u * 0.1; s.leanT = 0.18; });
      const plate = K.ph(0.8, (s, u) => { s.tgN = [ST.x + 10, CNT.top - 26]; s.tgF = [ST.x + 24, CNT.top - 20]; it.o.frac = u; }, { exit: (s) => { it.o.frac = 1; sl.ord = 0; sl.cook = 0; } });
      if (m.oni) return [lay, fan, plate]; return [lay, fan, tare, plate]; },
    mkIdle(a, X, H) { const K = X.K, CNT = X.CNT; return K.start(a, 'fan', [K.ph(rand(2.2, 3.2), (s, u, t) => { s.f = -1; s.hold.N = H.tool('uchiwa'); heat = Math.max(heat, 0.75); s.tgN = [52 + Math.sin(t * 9) * 10, CNT.top - 52 + Math.cos(t * 9) * 4]; s.look = { x: () => 50, until: K.simT + 0.3 }; if (Math.random() < 0.03) K.fx('spark', 50 + rand(-30, 30), CNT.top - 28, { life: 0.5, col: '#ffb040' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K; return K.start(a, 'oshibori', [K.ph(rand(1.6, 2.4), (s, u, t) => { s.hold.N = H.tool('towel'); s.tgN = [s.hx + 24 + Math.sin(t * 5) * 6, s.hy - 64]; s.tgF = [s.hx + 34, s.hy - 60]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'uchiwa') { c.strokeStyle = L('#c8a870'); c.lineWidth = 1.4 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 8 * s); c.stroke(); c.fillStyle = L('#f4ecd8'); c.beginPath(); c.arc(x, y - 15 * s, 8 * s, 0, TAU); c.fill(); c.fillStyle = L('#c83a2a'); c.beginPath(); c.arc(x, y - 15 * s, 3.4 * s, 0, TAU); c.fill(); }
      else if (k === 'mug') { c.fillStyle = 'rgba(230,240,250,0.6)'; c.fillRect(x - 5 * s, y - 12 * s, 10 * s, 12 * s); c.strokeStyle = 'rgba(230,240,250,0.8)'; c.lineWidth = 1.4 * s; c.beginPath(); c.arc(x + 6 * s, y - 6 * s, 3 * s, -1.4, 1.4); c.stroke(); }
      else if (k === 'glass') { c.fillStyle = 'rgba(230,240,250,0.6)'; c.fillRect(x - 4 * s, y - 16 * s, 8 * s, 16 * s); }
      else if (k === 'towel') { c.fillStyle = L('#fbf8f2'); roundRect(c, x - 5 * s, y - 3 * s, 10 * s, 6 * s, 2 * s); c.fill(); c.fillStyle = L('#c8d8e0'); c.fillRect(x - 5 * s, y - 0.5 * s, 10 * s, 1 * s); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.sk) { c.fillStyle = L('#f4f0e8'); ellipse(c, 0, -1, 11, 2.6); c.fill(); if (frac > 0.04) skewer(c, L, 0, -4, 1, m.sk, 0.92, Math.max(1, Math.ceil(frac * 4)), 1); }
      else if (m.beer) { c.fillStyle = 'rgba(230,240,250,0.55)'; c.fillRect(-5, -13, 10, 13); c.strokeStyle = 'rgba(230,240,250,0.8)'; c.lineWidth = 1.4; c.beginPath(); c.arc(6, -7, 3, -1.4, 1.4); c.stroke(); if (frac > 0.04) { c.fillStyle = L('#f0b030'); c.fillRect(-4.4, -12 + (1 - frac) * 11, 8.8, frac * 11.5); c.fillStyle = L('#fbf8ee'); c.fillRect(-4.6, -13.4 + (1 - frac) * 11, 9.2, 2.6); } }
      else if (m.hb) { c.fillStyle = 'rgba(230,240,250,0.5)'; c.fillRect(-4, -17, 8, 17); if (frac > 0.04) { c.fillStyle = 'rgba(244,232,184,0.9)'; c.fillRect(-3.6, -16 + (1 - frac) * 15, 7.2, frac * 15.5); c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(-2.6, -12, 3, 3); c.fillRect(0, -7, 3, 3); c.fillStyle = L('#f0d040'); c.beginPath(); c.arc(2, -15, 2.6, 0, TAU); c.fill(); } }
      else if (m.oni) { c.fillStyle = L('#2a2a2e'); ellipse(c, 0, -1, 10, 2.4); c.fill(); if (frac > 0.04) { const r = 3 + 5 * Math.sqrt(frac); c.fillStyle = L('#8a5a2a'); K0(c, [-r, -2, 0, -2 - r * 1.5, r, -2]); c.fill(); c.fillStyle = L('#5a3416'); c.fillRect(-r * 0.4, -2 - r * 0.7, r * 0.8, r * 0.3); c.fillStyle = L('#16241a'); c.fillRect(-r * 0.5, -2 - r * 0.4, r, r * 0.4); } }
      c.restore(); },
    build(X) { if (!window.__geoEv) window.__geoEv = {}; window.__geoEv.yakitori = (n) => { const K = X.K; W.events[n].start(Object.assign({}, X, { K }), K.actors.find((a) => a.role === 'server'), K.actors.find((a) => a.role === 'maker')); }; },
    room(c, t, X) { const K = X.K, P = K.P, L = X.L, sw = Math.sin(t * 14) * rattle;
      // smoked plank wall, soot beams, a strip of wooden menu tags (ofuda-style), sake bottles, a beckoning cat
      for (let i = 0; i < 40; i++) { c.fillStyle = i % 2 ? P.wall : P.wall2; c.fillRect(-60 + i * 34, 40, 34, 620); c.fillStyle = 'rgba(20,10,0,0.2)'; c.fillRect(-60 + i * 34, 40, 2, 620); }
      c.fillStyle = P.woodDk; c.fillRect(-60, 0, 1400, 46); for (let x = -40; x < 1340; x += 140) { c.fillStyle = 'rgba(0,0,0,0.3)'; c.fillRect(x, 0, 24, 46); }
      c.fillStyle = 'rgba(30,20,10,0.25)'; c.fillRect(-60, 46, 1400, 30);
      const TAGS = [['ねぎま', '180'], ['つくね', '200'], ['皮', '160'], ['手羽先', '220'], ['レバー', '180'], ['ししとう', '150'], ['焼おにぎり', '250']];
      c.fillStyle = P.woodDk; c.fillRect(22, 58, 232, 6);
      TAGS.forEach(([n, p], i) => { const tx = 30 + i * 32; c.save(); c.translate(tx + 13, 64); c.rotate(sw * 0.02 * ((i % 2) ? 1 : -1)); c.fillStyle = L(i === 3 ? '#f0e0b0' : '#e8d4a8'); c.fillRect(-13, 0, 26, 96); c.fillStyle = 'rgba(120,80,30,0.25)'; c.fillRect(-13, 0, 3, 96);
        c.fillStyle = L('#1e140c'); c.font = `400 ${n.length > 4 ? 11 : 14}px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; const ch = [...n], step = Math.min(15, 70 / ch.length); ch.forEach((q, k) => c.fillText(q, 0, 10 + k * step)); c.fillStyle = L('#b8321e'); c.font = '700 9px Georgia, serif'; c.fillText(p, 0, 88); c.restore(); });
      c.fillStyle = P.wood; c.fillRect(24, 224, 228, 7);
      for (let i = 0; i < 6; i++) { const bx = 40 + i * 30; c.fillStyle = L(['#2a4a2a', '#6a3a1a', '#1a2a3a', '#2a4a2a', '#e8e0d0', '#6a3a1a'][i]); c.fillRect(bx - 6, 182, 12, 42); K0(c, [bx - 6, 182, bx - 2, 170, bx + 2, 170, bx + 6, 182]); c.fill(); c.fillRect(bx - 2, 162, 4, 9); c.fillStyle = L('#f4ecd8'); c.fillRect(bx - 5, 196, 10, 16); c.fillStyle = L('#1e140c'); c.fillRect(bx - 1, 199, 2, 10); }
      { const cx = 226, cy = 212; c.fillStyle = L('#fbf8f2'); ellipse(c, cx, cy, 11, 12); c.fill(); c.beginPath(); c.arc(cx, cy - 15, 9, 0, TAU); c.fill(); K0(c, [cx - 9, cy - 19, cx - 7, cy - 27, cx - 2, cy - 22]); c.fill(); K0(c, [cx + 9, cy - 19, cx + 7, cy - 27, cx + 2, cy - 22]); c.fill(); c.fillStyle = L('#c83a2a'); c.fillRect(cx - 8, cy - 8, 16, 3); c.fillStyle = L('#e8b03a'); c.beginPath(); c.arc(cx, cy - 4, 2.4, 0, TAU); c.fill(); const wv = Math.sin(t * 3) * 0.4; c.save(); c.translate(cx + 9, cy - 10); c.rotate(-0.8 + wv); c.fillStyle = L('#fbf8f2'); c.fillRect(-2.5, -10, 5, 10); c.restore(); c.fillStyle = L('#1e140c'); c.fillRect(cx - 4, cy - 16, 2, 1.4); c.fillRect(cx + 2, cy - 16, 2, 1.4); }
      // red paper lanterns (akachōchin) at the two lamp spots, swinging when a train passes
      for (const lx of [262, 1018]) { const ang = sw * 0.12; c.save(); c.translate(lx, 46); c.rotate(ang); c.strokeStyle = P.woodDk; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 60); c.stroke(); c.fillStyle = P.woodDk; c.fillRect(-14, 58, 28, 6); c.fillStyle = P.lan; ellipse(c, 0, 92, 24, 30); c.fill(); c.strokeStyle = 'rgba(0,0,0,0.2)'; c.lineWidth = 1; for (let k = -2; k <= 2; k++) { c.beginPath(); c.ellipse(0, 92 + k * 10, 24 * Math.sqrt(1 - (k * 10 / 30) ** 2), 2, 0, 0, TAU); c.stroke(); } c.fillStyle = P.woodDk; c.fillRect(-14, 120, 28, 6); c.fillStyle = L('#1e140c'); c.font = `400 17px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('焼', 0, 84); c.fillText('鳥', 0, 102); c.restore(); K.glow(c, lx, 138, 120, P.glow, P.glowA); K.glow(c, lx, 92, 40, '#ff8040', 0.25 + 0.35 * P.night); }
    },
    lamps: [],
    frame(c, X, under) { const K = X.K, P = K.P, L = X.L, { x0, y0, x1, y1 } = X.WIN, t = K.t; if (under) { c.fillStyle = P.woodDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; }
      // split noren hanging across the top of the open shopfront
      const w = x1 - x0; for (let i = 0; i < 4; i++) { const nx = x0 + i * w / 4 + 2, nw = w / 4 - 4, sway = Math.sin(t * 1.3 + i) * 2 + Math.sin(t * 14) * rattle * 2; c.fillStyle = P.noren; K0(c, [nx, y0, nx + nw, y0, nx + nw + sway, y0 + 92, nx + sway, y0 + 92]); c.fill(); c.fillStyle = 'rgba(255,255,255,0.06)'; c.fillRect(nx, y0, 4, 92); }
      c.fillStyle = L('#f4ecd8'); c.font = `400 34px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('焼', x0 + w * 0.375, y0 + 48); c.fillText('鳥', x0 + w * 0.625, y0 + 48);
      c.fillStyle = P.woodDk; c.fillRect(x0 - 6, y0 - 4, w + 12, 8); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, hh = y1 - y0;
      K.sky(c, x0, y0, x1, y1, { sunR: 12 });
      // far city + the railway viaduct: brick arches below, steel girder deck above
      c.fillStyle = P.out2; for (let i = 0; i < 6; i++) c.fillRect(x0 + i * 38 - 6, y0 + 60 + ((i * 29) % 40), 34, 120);
      const dy = y0 + 120; c.fillStyle = P.brick; c.fillRect(x0, dy + 40, w, hh); c.fillStyle = P.brick2; for (let r = 0; r < 14; r++) for (let q = 0; q < 12; q++) if ((r + q) % 3 === 0) c.fillRect(x0 + q * 20 + (r % 2) * 10, dy + 44 + r * 10, 16, 3);
      for (let i = 0; i < 2; i++) { const ax = x0 + 20 + i * 108, aw = 84; c.fillStyle = P.out3; c.beginPath(); c.moveTo(ax, y1); c.lineTo(ax, dy + 110); c.arc(ax + aw / 2, dy + 110, aw / 2, Math.PI, TAU); c.lineTo(ax + aw, y1); c.closePath(); c.fill();
        c.fillStyle = rgba(P.lit, 0.3 + 0.7 * P.litA); c.fillRect(ax + 10, dy + 120, aw - 20, 70); c.fillStyle = L(i ? '#2a3a5a' : '#8a2a1e'); for (let k = 0; k < 3; k++) c.fillRect(ax + 12 + k * (aw - 24) / 3, dy + 120, (aw - 24) / 3 - 2, 26);
        c.fillStyle = P.lan; for (let k = 0; k < 2; k++) { ellipse(c, ax + 18 + k * (aw - 36), dy + 104, 7, 9); c.fill(); } if (P.night > 0.3) K.glow(c, ax + aw / 2, dy + 150, 60, '#ffb060', 0.3 * P.night); }
      c.fillStyle = P.road; c.fillRect(x0, y0 + 330, w, hh - 330);
      // train on the viaduct deck
      c.fillStyle = L('#3a4a48'); c.fillRect(x0, dy, w, 40); c.fillStyle = L('#2a3634'); for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(x0 + i * 20, dy + 40); c.lineTo(x0 + i * 20 + 10, dy + 4); c.lineTo(x0 + i * 20 + 20, dy + 40); c.lineWidth = 2; c.strokeStyle = L('#24302e'); c.stroke(); } c.fillStyle = L('#24302e'); c.fillRect(x0, dy, w, 5); c.fillRect(x0, dy + 36, w, 5);
      if (train.x > 0) { const len = 520, tx = train.dir > 0 ? x0 - len + train.x / 1.6 * (w + len) : x1 - train.x / 1.6 * (w + len); c.fillStyle = L('#c8ccd0'); c.fillRect(tx, dy - 44, len, 42); c.fillStyle = L('#5aa83a'); c.fillRect(tx, dy - 16, len, 5); for (let k = 0; k < 26; k++) { c.fillStyle = rgba(P.lit, 0.25 + 0.75 * P.litA); c.fillRect(tx + 8 + k * 20, dy - 38, 12, 14); } c.fillStyle = L('#2a2a2e'); for (let k = 0; k < 4; k++) c.fillRect(tx + 60 + k * 130, dy - 4, 30, 4); }
      if (P.night > 0.2) { c.fillStyle = rgba('#ffb060', 0.06 * P.night); c.fillRect(x0, y0 + 200, w, hh - 200); }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P, L = X.L; for (let r = 0; r < 4; r++) for (let i = 0; i < 40; i++) { c.fillStyle = (i + r) % 2 ? P.floor2 : P.floor; c.fillRect(-60 + i * 36 + (r % 2) * 18, 644 + r * 24, 34, 22); }
      for (const bx of [1060, 1140, 1220]) { c.fillStyle = L('#6a4a2a'); c.fillRect(bx - 14, 690, 28, 30); c.fillStyle = L('#f0c040'); c.fillRect(bx - 14, 690, 28, 4); for (let k = 0; k < 3; k++) { c.fillStyle = L('#3a2a1a'); c.fillRect(bx - 10 + k * 8, 696, 5, 22); } } },
    counter(c, t, X) { const K = X.K, P = K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      // thick plank counter
      c.fillStyle = P.cnt; c.fillRect(x0 - 8, top - 8, x1 - x0 + 16, 10); c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillRect(x0 - 8, top - 8, x1 - x0 + 16, 2);
      // the konro: a long charcoal box with white-hot coals, skewers lying across the grate
      { const gx0 = 8, gx1 = 92, gy = top - 30; c.fillStyle = L('#8a8680'); c.fillRect(gx0, gy, gx1 - gx0, 22); c.fillStyle = L('#5a5650'); c.fillRect(gx0, gy + 16, gx1 - gx0, 6);
        const emb = 0.45 + heat * 0.45 + flare * 0.4 + Math.sin(t * 7) * 0.04; c.fillStyle = L('#1a1210'); c.fillRect(gx0 + 4, gy + 3, gx1 - gx0 - 8, 10);
        for (let i = 0; i < 11; i++) { const ex = gx0 + 6 + i * 7.2; c.fillStyle = rgba(i % 3 ? '#ff7a2a' : '#ffd080', Math.min(1, emb * (0.6 + 0.4 * Math.sin(t * 5 + i * 1.7)))); c.fillRect(ex, gy + 6, 5, 5); }
        K.glow(c, (gx0 + gx1) / 2, gy, 70, '#ff7030', 0.18 + emb * 0.25);
        c.strokeStyle = L('#3a3a3e'); c.lineWidth = 1; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(gx0 + 2, gy - 1 - i * 0.6); c.lineTo(gx1 - 2, gy - 1 - i * 0.6); c.stroke(); }
        for (const s of SLOTS) skewer(c, L, s.x, gy - 2, 0.95, s.kind, s.cook, 3);
        if (flare > 0.05) { for (let k = 0; k < 6; k++) { const fx = gx0 + 10 + k * 13, fh = (14 + Math.sin(t * 20 + k * 2) * 6) * flare; c.fillStyle = rgba(k % 2 ? '#ffb040' : '#ff6a20', 0.85); K0(c, [fx - 5, gy, fx, gy - fh * 1.6, fx + 5, gy]); c.fill(); } }
        const smk = 0.25 + heat * 0.25 + flare * 0.5; for (let k = 0; k < 5; k++) { const ph = (t * 0.25 + k * 0.2) % 1; c.fillStyle = rgba('#d8d0c8', smk * 0.35 * (1 - ph)); c.beginPath(); c.arc(gx0 + 14 + k * 16 + Math.sin(t + k) * 8, gy - 20 - ph * 140, 10 + ph * 22, 0, TAU); c.fill(); } }
      // tare pot + beer tap + a stack of oshibori
      c.fillStyle = L('#3a2a20'); c.beginPath(); c.moveTo(100, top - 8); c.lineTo(98, top - 30); c.quadraticCurveTo(110, top - 36, 122, top - 30); c.lineTo(120, top - 8); c.closePath(); c.fill(); c.fillStyle = L('#1a100a'); ellipse(c, 110, top - 31, 11, 3); c.fill();
      c.fillStyle = L('#c4c4c8'); c.fillRect(228, top - 58, 8, 50); c.fillStyle = L('#2a2a2e'); c.fillRect(222, top - 66, 20, 10); c.fillStyle = L('#e8b03a'); c.fillRect(225, top - 64, 14, 6);
      for (let i = 0; i < 3; i++) { c.fillStyle = L('#fbf8f2'); roundRect(c, 190, top - 14 - i * 6, 26, 6, 3); c.fill(); }
      // counter front: vertical slats + a bamboo skewer cup + a hanging chalk slate
      c.fillStyle = P.cnt2; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top);
      for (let i = 0; i < 12; i++) { c.fillStyle = i % 2 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.05)'; c.fillRect(x0 + i * 20, top + 2, 20, base - top); }
      c.fillStyle = L('#2a2e2a'); c.fillRect(150, top + 30, 80, 54); c.strokeStyle = P.wood; c.lineWidth = 3; c.strokeRect(150, top + 30, 80, 54); c.fillStyle = L('#f4f0e8'); c.font = `400 14px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('本日', 190, top + 46); c.fillText('ハツ・砂肝', 190, top + 68);
    },
    events: [
      { name: 'train', dur: 10, start(X, srv, mk) { const K = X.K; train.x = 0.0001; train.dir = pick([1, -1]); rattle = 1; K.say(srv, pick(['Here it comes!', 'Kanpai!']), 1.4); K.after(0.6, () => { for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: K.simT + 3 }; K.say(c, pick(['Kanpai!', 'Kanpai!', 'icon:heart', 'Gatan-goton…']), 1.4); } }); } },
      { name: 'flare-up', dur: 8, start(X, srv, mk) { const K = X.K; flare = 1; heat = 1; K.fx('puff', 50, X.CNT.top - 70, { life: 2, col: '#cfc6bc' }); K.say(mk, pick(['Oops — fat!', 'Hot hot!']), 1.4); K.after(0.8, () => K.say(srv, 'Taishō!', 1.2)); for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 50, until: K.simT + 2.5 }; K.say(c, pick(['Ōh!', 'icon:star', 'Sugoi!']), 1.2); } } },
    ],
  };
  registerStage('yakitori', makeGeoCafe(W));
})();
