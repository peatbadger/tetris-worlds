/* ================= Remake of COSMIC NEBULA · Orbit Galley — GEOMETRIC edition =================
   The snack galley of a space station. Commander Ade logs orders at the console; Yuki runs the rehydrator (packet in,
   water hiss, knead, out) and passes meals over the counter. Crew snack at the rail by a big porthole: a ringed planet
   turns slowly, a satellite drifts by, the station's day/night lighting cycles (white shift -> amber evening -> blue sleep).
   Signature: a supply capsule docks (lights blink, everyone waves at the porthole).
   Blocks: galaxy glaze · red velvet · nebula jelly · neapolitan · orbit orange · moon cheese · meringue. */
(() => {
  const GalPal = GeoCafePal({
    shift: { wall: '#d8dce4', wall2: '#c4cad4', trim: '#4a7ae0', wood: '#8a90a0', woodDk: '#4a5060', floor: '#5a6070', floor2: '#4a5060', cnt: '#b8bec8', cnt2: '#9aa0ac', steel: '#e0e4ea', glass: '#c8e0f8',
      sky0: '#02040e', sky1: '#0a1030', out1: '#e8a868', out2: '#b86a48', out3: '#3a6ad8', led: '#5ad8ff', ledA: 0.6, lamp: '#f4f8ff', glow: '#e0ecff', glowA: 0.08, shaft: '#e0ecff', shaftA: 0.08, amb: '#ffffff', ambK: 0, sun: '#fff8e8', cloud: '#ffffff' },
    evening: { wall: '#c8b8a8', wall2: '#b4a494', trim: '#d88a3a', wood: '#7a7480', woodDk: '#3e3a48', floor: '#4a4650', floor2: '#3c3842', cnt: '#a8a0a0', cnt2: '#8a8288', steel: '#d0ccd0', glass: '#c8c0d8',
      sky0: '#02040e', sky1: '#0a1030', out1: '#e8a868', out2: '#b86a48', out3: '#3a6ad8', led: '#ffb04a', ledA: 0.8, lamp: '#ffd8a8', glow: '#ffb870', glowA: 0.25, shaft: '#ffc890', shaftA: 0.05, amb: '#ffd8b8', ambK: 0.06, sun: '#fff8e8', cloud: '#ffffff' },
    night: { wall: '#2e3448', wall2: '#262c3e', trim: '#3a5ab8', wood: '#4a5068', woodDk: '#22283a', floor: '#22283a', floor2: '#1c2232', cnt: '#4a5268', cnt2: '#3a4258', steel: '#7a8298', glass: '#8aa0c8',
      sky0: '#02040e', sky1: '#0a1030', out1: '#c8905a', out2: '#8a5038', out3: '#2a4ab0', led: '#5a8aff', ledA: 1, lamp: '#a8c0ff', glow: '#6a8aff', glowA: 0.3, shaft: '#8aa0ff', shaftA: 0, amb: '#2a3a6a', ambK: 0.14, sun: '#f4ecd8', cloud: '#3a4a7a' },
    snow: {},
  }, [[4, 'night'], [7, 'shift'], [17, 'shift'], [19, 'evening'], [21.5, 'night'], [28, 'night'], [31, 'shift']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 12 ? 'Morning shift' : h >= 12 && h < 18 ? 'Day shift' : h >= 18 && h < 21.5 ? 'Evening' : 'Sleep cycle'; });
  const MENU = [{ n: 'Moon cheese', c: '#f0d870', pack: 1 }, { n: 'Orbit orange', c: '#f8902a', pouch: 1 }, { n: 'Neapolitan bar', c: '#e8a0a8', pack: 1 }, { n: 'Nebula jelly', c: '#2ab8b0', pouch: 1 }, { n: 'Galaxy donut', c: '#3a2a6a', donut: 1 }, { n: 'Coffee bulb', c: '#4a2a18', pouch: 1 }];
  let hyd = 0, dock = 0, rot = 0; const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'galley', pal: GalPal, startHour: 8, span: 15, porthole: true, noWeather: true, font: '800 15px sans-serif', vign: 'rgba(0,4,20,0.4)', zone: 'rgba(16,20,34,0.4)',
    win: { x0: 1030, y0: 120, x1: 1250, y1: 440 },
    per: (h) => (h < 12 ? 0 : h < 18 ? 1 : h < 21 ? 2 : h < 23 ? 3 : 4),
    staff: [{ T: 240, hw: 60, headR: 28, pattern: 'patch', top: 'navy', top2: 'coral', hairStyle: 'short', pants: 'navy' },
      { T: 232, hw: 58, headR: 28, pattern: 'patch', top: 'coral', top2: 'navy', hairStyle: 'bob', pants: 'coral' }],
    menu: MENU, greet: ['Galley open!', 'Hungry, crew?', 'What\'ll it be?'], ack: ['Rehydrating', 'Copy that', 'Roger'], handOff: ['Bon appétit', 'Here, catch!', 'Enjoy, crew'],
    thanks: ['Thanks!', 'Copy', 'icon:heart'], done: ['Mission fuelled', 'Good stuff', 'icon:heart'], cheer: ['Nominal!', 'Woo!', 'Stellar!'],
    types: {
      eng: { body: { pattern: 'patch', top: 'mustard', top2: 'navy', hairStyle: 'short', pants: 'mustard', glasses: 1 }, words: ['Fixed the pump', 'Torque check'] },
      sci: { body: { T: 234, hw: 56, pattern: 'coat', top: 'white', top2: 'teal', hairStyle: 'bun', pants: 'navy' }, words: ['Samples are in', 'Fascinating'] },
      pilot: { body: { pattern: 'patch', top: 'teal', top2: 'coral', hairStyle: 'short', pants: 'teal' }, words: ['Smooth burn', 'Docking at 14'] },
      doc: { body: { T: 230, hw: 58, pattern: 'patch', top: 'plum', top2: 'white', hairStyle: 'long', pants: 'plum' }, words: ['Hydrate!', 'Vitals good'] },
      rookie: { body: { T: 236, hw: 56, pattern: 'patch', top: 'grey', top2: 'coral', hairStyle: 'pony', pants: 'grey' }, words: ['Still dizzy', 'Best view ever'] },
      visitor: { body: { pattern: 'jacket', top: 'navy', shirt: 'white', hairStyle: 'short', camera: 1, pants: 'dark' }, words: ['Unreal…', 'icon:cam'] },
    },
    parties: [{ m: ['eng'], w: [2, 2, 1, 1, 0] }, { m: ['sci'], w: [2, 2, 1, 0, 0] }, { m: ['pilot'], w: [1, 2, 2, 1, 0] }, { m: ['doc', 'rookie'], w: [2, 1, 2, 1, 0] }, { m: ['visitor'], w: [1, 2, 3, 2, 0] }],
    sim(X, dt) { hyd = Math.max(0, hyd - dt * 0.6); dock = Math.max(0, dock - dt * 0.07); rot += dt * 0.01; },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      return [K.ph(0.7, (s) => { s.hold.N = H.item(m, { frac: 0.3 }); s.tgN = [ST.x - 36, CNT.top - 40]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } }),
        K.ph(1.6, (s, u) => { hyd = 1; s.tgN = [ST.x - 30, CNT.top - 66]; s.tgF = [ST.x - 44, CNT.top - 60]; s.look = { x: () => ST.x - 36, until: K.simT + 0.3 }; it.o.frac = u; if (Math.random() < 0.08) K.fx('puff', ST.x - 36, CNT.top - 50, { life: 0.8, col: '#e0f0ff' }); }),
        K.ph(0.9, (s, u, t) => { s.hold.N = it; s.tgN = [ST.x + 4 + Math.sin(t * 16) * 4, CNT.top - 40]; s.tgF = [ST.x + 12 + Math.sin(t * 16 + 1) * 4, CNT.top - 40]; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST; return K.start(a, 'inventory', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2, 3), (s, u, t) => { s.f = -1; s.tgN = [ST.x - 20 + Math.sin(t * 2) * 40, 200 + Math.sin(t * 3) * 10]; s.look = { x: () => ST.x - 20, until: K.simT + 0.3 }; })]); },
    srvIdle(a, X) { const K = X.K; return K.start(a, 'console', [K.ph(rand(1.5, 2.5), (s, u, t) => { s.tgN = [s.hx + 32 + Math.sin(t * 12) * 3, X.CNT.top - 22]; s.tgF = [s.hx + 20 + Math.sin(t * 12 + 2) * 3, X.CNT.top - 22]; s.look = { x: () => 220, until: K.simT + 0.3 }; })]); },
    drawTool() {},
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y + Math.sin(X.t * 2 + x) * 0.8 * s); c.scale(s, s);
      if (m.pouch) { c.fillStyle = L('#d8dce4'); roundRect(c, -5, -16, 10, 16, 2); c.fill(); if (frac > 0.03) { c.fillStyle = L(m.c); c.fillRect(-4, -1 - 13 * frac, 8, 13 * frac); } c.fillStyle = L('#4a7ae0'); c.fillRect(-1, -20, 2, 4); }
      else if (m.donut) { if (frac > 0.04) { const r = 4 + 4 * Math.sqrt(frac); c.fillStyle = L('#c88a48'); c.beginPath(); c.arc(0, -6, r, 0, TAU); c.fill(); c.fillStyle = L(m.c); c.beginPath(); c.arc(0, -6.6, r * 0.9, 0, TAU); c.fill(); c.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) c.fillRect(-3 + i * 2, -8 + (i % 2) * 2, 0.9, 0.9); c.fillStyle = L('#d8dce4'); c.beginPath(); c.arc(0, -6.6, r * 0.3, 0, TAU); c.fill(); } }
      else { c.fillStyle = 'rgba(220,230,245,0.75)'; roundRect(c, -7, -12, 14, 12, 2); c.fill(); if (frac > 0.04) { c.fillStyle = L(m.c); for (let i = 0; i < Math.max(1, Math.round(4 * frac)); i++) { roundRect(c, -5.5 + (i % 2) * 6, -10.5 + Math.floor(i / 2) * 5, 4.6, 4, 1); c.fill(); } } }
      c.restore(); },
    room(c, t, X) { const P = X.K.P, L = X.L;
      for (let i = 0; i < 18; i++) { c.fillStyle = i % 2 ? P.wall : P.wall2; c.fillRect(-60 + i * 80, 40, 80, 620); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(-60 + i * 80, 40, 2, 620); c.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(-50 + i * 80, 60 + k * 160, 2, 0, TAU); c.fill(); } }
      c.fillStyle = P.woodDk; c.fillRect(-60, 0, 1400, 42); c.fillStyle = rgba(P.led, 0.3 + P.ledA * 0.6); c.fillRect(-60, 40, 1400, 3); X.K.glow(c, 640, 42, 500, P.led, 0.1 * P.ledA);
      c.fillStyle = P.wall2; c.fillRect(470, 120, 340, 180);
      // left strip: galley screen + velcro food wall
      c.fillStyle = P.woodDk; roundRect(c, 48, 60, 200, 84, 8); c.fill(); c.fillStyle = L('#0a1430'); roundRect(c, 56, 68, 184, 68, 5); c.fill(); c.fillStyle = rgba(P.led, 0.6 + P.ledA * 0.4); c.font = '800 24px monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('GALLEY', 148, 92); c.font = '700 11px monospace'; c.fillText('ORBIT ' + String(1000 + Math.floor(t / 9) % 9000).padStart(4, '0') + ' · Δv OK', 148, 120);
      c.fillStyle = L('#5a6070'); c.fillRect(30, 160, 400, 82); for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const px = 46 + i * 64, py = 170 + j * 36; c.fillStyle = L('#d8dce4'); roundRect(c, px, py, 44, 28, 3); c.fill(); c.fillStyle = L(['#f0d870', '#f8902a', '#e8a0a8', '#2ab8b0', '#3a2a6a', '#b0283a'][(i + j * 3) % 6]); c.fillRect(px + 4, py + 6, 36, 14); }
      c.strokeStyle = L('#e8b03a'); c.lineWidth = 3; c.beginPath(); c.moveTo(260, 60); c.lineTo(260, 640); c.stroke(); // handrail
    },
    lamps: [],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; if (under) { c.fillStyle = P.woodDk; c.beginPath(); c.ellipse(cx, cy, (x1 - x0) / 2 + 16, (y1 - y0) / 2 + 16, 0, 0, TAU); c.fill(); return; } c.strokeStyle = P.steel; c.lineWidth = 8; c.beginPath(); c.ellipse(cx, cy, (x1 - x0) / 2 + 4, (y1 - y0) / 2 + 4, 0, 0, TAU); c.stroke(); c.fillStyle = P.wood; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; c.beginPath(); c.arc(cx + Math.cos(a) * ((x1 - x0) / 2 + 10), cy + Math.sin(a) * ((y1 - y0) / 2 + 10), 3, 0, TAU); c.fill(); } },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0, h = y1 - y0;
      c.fillStyle = linear(c, 0, y0, 0, y1, [[0, P.sky0], [1, P.sky1]]); c.fillRect(x0, y0, w, h);
      for (let i = 0; i < 60; i++) { const sx = x0 + ((i * 73.7 + t * 2) % w), sy = y0 + (i * 41.3) % h, tw = 0.5 + 0.5 * Math.sin(t * 2 + i); c.fillStyle = rgba('#ffffff', 0.4 + tw * 0.5); c.fillRect(sx, sy, i % 7 ? 1.5 : 2.5, i % 7 ? 1.5 : 2.5); }
      c.fillStyle = rgba('#8a5ad8', 0.18); ellipse(c, x0 + w * 0.3, y0 + h * 0.3, w * 0.4, h * 0.16, -0.4); c.fill(); c.fillStyle = rgba('#3ab8d8', 0.12); ellipse(c, x0 + w * 0.6, y0 + h * 0.25, w * 0.3, h * 0.1, 0.3); c.fill();
      // ringed planet
      { const px = x0 + w * 0.62, py = y0 + h * 0.52, R = 60; c.strokeStyle = rgba('#e8d8b8', 0.6); c.lineWidth = 6; c.beginPath(); c.ellipse(px, py, R * 1.7, R * 0.4, -0.25, Math.PI, TAU); c.stroke(); c.fillStyle = L(P.out1); c.beginPath(); c.arc(px, py, R, 0, TAU); c.fill(); c.save(); c.beginPath(); c.arc(px, py, R, 0, TAU); c.clip(); for (let k = 0; k < 5; k++) { c.fillStyle = k % 2 ? rgba(P.out2, 0.6) : rgba('#f4d8a8', 0.4); c.fillRect(px - R, py - R + ((k * 26 + rot * 400) % (2 * R + 20)) - 10, 2 * R, 9); } c.fillStyle = 'rgba(0,0,20,0.45)'; c.beginPath(); c.arc(px + R * 0.4, py + R * 0.2, R, 0, TAU); c.fill(); c.restore(); c.strokeStyle = rgba('#e8d8b8', 0.75); c.lineWidth = 6; c.beginPath(); c.ellipse(px, py, R * 1.7, R * 0.4, -0.25, 0, Math.PI); c.stroke(); }
      // Earth limb at the bottom
      c.fillStyle = L(P.out3); c.beginPath(); c.ellipse(x0 + w / 2, y1 + 140, w * 0.9, 190, 0, Math.PI, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(x0 + w * 0.35, y1 - 30, 40, 8, 0.1, 0, TAU); c.fill(); c.strokeStyle = 'rgba(120,200,255,0.5)'; c.lineWidth = 4; c.beginPath(); c.ellipse(x0 + w / 2, y1 + 140, w * 0.9 + 3, 193, 0, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
      // drifting satellite / docking capsule
      { const u = (t * 0.02) % 1.4, sx = x0 - 30 + u * (w + 60), sy = y0 + h * 0.22 + Math.sin(t * 0.3) * 6; c.fillStyle = L('#c8ccd8'); c.fillRect(sx - 6, sy - 4, 12, 8); c.fillStyle = L('#3a5ab8'); c.fillRect(sx - 24, sy - 3, 16, 6); c.fillRect(sx + 8, sy - 3, 16, 6); }
      if (dock > 0) { const k = 1 - dock, sx = x0 + w * (0.1 + k * 0.5), sy = y0 + h * 0.8 - k * h * 0.3; c.fillStyle = L('#e8e8f0'); K0(c, [sx - 14, sy + 8, sx + 14, sy + 8, sx + 8, sy - 14, sx - 8, sy - 14]); c.fill(); c.fillStyle = Math.sin(t * 10) > 0 ? '#ff4a4a' : '#4aff8a'; c.fillRect(sx - 2, sy - 18, 4, 4); }
    },
    floor(c, X) { const P = X.K.P; for (let i = 0; i < 36; i++) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 42, 640, 3, 120); } c.fillStyle = rgba(P.led, 0.4 * P.ledA); c.fillRect(-60, 646, 1400, 2); },
    counter(c, t, X) { const P = X.K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      c.fillStyle = P.steel; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      { const rx = ST.x - 36; c.fillStyle = L('#9aa0ac'); roundRect(c, rx - 22, top - 56, 44, 50, 6); c.fill(); c.fillStyle = L('#0a1430'); c.fillRect(rx - 16, top - 50, 32, 14); c.fillStyle = rgba(P.led, 0.5 + hyd * 0.5); c.fillRect(rx - 14, top - 48, 28 * (hyd > 0 ? (t * 2) % 1 : 1), 4); c.fillStyle = L('#5a6070'); c.fillRect(rx - 10, top - 30, 20, 20); if (hyd > 0.1) { c.strokeStyle = 'rgba(200,230,255,0.7)'; c.lineWidth = 1.5; c.beginPath(); for (let k = 0; k < 3; k++) { c.moveTo(rx - 6 + k * 6, top - 26); c.lineTo(rx - 6 + k * 6 + Math.sin(t * 30 + k) * 2, top - 14); } c.stroke(); } }
      c.fillStyle = L('#0a1430'); c.fillRect(204, top - 30, 34, 24); c.fillStyle = rgba(P.led, 0.8); for (let k = 0; k < 3; k++) c.fillRect(208, top - 26 + k * 6, 18 + ((t * 3 + k) % 1) * 8, 2);
      for (let i = 0; i < 3; i++) { const px = 146 + i * 16, py = top - 18 + Math.sin(t * 1.5 + i * 2) * 3; c.fillStyle = L(['#f8902a', '#2ab8b0', '#4a2a18'][i]); roundRect(c, px - 5, py - 7, 10, 14, 2); c.fill(); }
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = P.cnt2; for (let i = 0; i < 3; i++) c.fillRect(x0 + 6 + i * 80, top + 20, 70, base - top - 40); c.fillStyle = rgba(P.led, 0.3 + P.ledA * 0.6); c.fillRect(x0 - 6, top + 6, x1 - x0 + 12, 2);
      c.fillStyle = L('#e8b03a'); for (let i = 0; i < 8; i++) { K0(c, [x0 + i * 30, base - 14, x0 + 15 + i * 30, base - 14, x0 + 5 + i * 30, base - 4, x0 - 10 + i * 30, base - 4]); c.fill(); }
    },
    events: [{ name: 'capsule-dock', dur: 14, start(X, srv) { dock = 1; X.K.say(srv, 'Capsule docking!', 1.6); for (const c of X.K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: X.K.simT + 4 }; X.K.say(c, c.def.camera ? 'icon:cam' : pick(['Fresh supplies!', 'icon:star']), 1.3); } } }],
  };
  registerStage('galley', makeGeoCafe(W));
})();
