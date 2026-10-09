/* ================= Remake of NEON CITY · Neon Candy Arcade — GEOMETRIC edition =================
   A late-night sweets counter at the front of an arcade. Jin rings up orders under the pink CANDY tube; Mo spins cotton
   candy on the machine (the floss really grows round the stick) or scoops pick'n'mix into paper bags. Guests snack at
   the ledge by the rainy neon street window (signs flicker on, taxis' tail-lights streak past). Signature: a JACKPOT
   somewhere in the arcade — the lights strobe and everyone cheers. Clock 18:00 dusk -> evening -> midnight -> 02:00 close.
   Blocks: liquorice twists · gummy bears · candy cane · rock candy · sour apple belts · cotton candy · marshmallows. */
(() => {
  const CandyPal = GeoCafePal({
    dusk: { wall: '#3a3050', wall2: '#2e2644', trim: '#ff4ab0', wood: '#4a3a5a', woodDk: '#2a2038', floor: '#2a2438', floor2: '#ece4f0', cnt: '#4a3c64', cnt2: '#352a4a', steel: '#b8b8c8', glass: '#c8d8f0', neon: '#ff4ab0', neon2: '#3ae0ff', neonA: 0.55,
      sky0: '#4a4a90', sky1: '#ff9a7a', out1: '#5a5070', out2: '#3a3450', out3: '#4a4458', lamp: '#ffe0f0', glow: '#ff9ad0', glowA: 0.18, shaft: '#ffb0d0', shaftA: 0.1, amb: '#ffd8e8', ambK: 0.04, sun: '#ffb070', cloud: '#c890b0' },
    evening: { wall: '#2e2644', wall2: '#241e38', trim: '#ff3aa8', wood: '#3e3050', woodDk: '#221a30', floor: '#221e30', floor2: '#d8d0e0', cnt: '#3e3256', cnt2: '#2c2240', steel: '#a8a8bc', glass: '#a8c0e8', neon: '#ff3aa8', neon2: '#3ae0ff', neonA: 0.85,
      sky0: '#141a44', sky1: '#5a3a7a', out1: '#3a3458', out2: '#2a2440', out3: '#34304a', lamp: '#ffd8ec', glow: '#ff8ac8', glowA: 0.28, shaft: '#ff9ad0', shaftA: 0.06, amb: '#5a3a7a', ambK: 0.08, sun: '#ffb070', cloud: '#6a4a8a' },
    night: { wall: '#241e38', wall2: '#1c1830', trim: '#ff2aa0', wood: '#30263e', woodDk: '#1a1424', floor: '#1c1828', floor2: '#c8c0d4', cnt: '#342a4a', cnt2: '#241c36', steel: '#9898ac', glass: '#90a8d8', neon: '#ff2aa0', neon2: '#2ae8ff', neonA: 1,
      sky0: '#060a22', sky1: '#24184a', out1: '#2a2444', out2: '#1c1830', out3: '#26223a', lamp: '#ffd0e8', glow: '#ff7ac0', glowA: 0.36, shaft: '#ff90c8', shaftA: 0, amb: '#3a2a5a', ambK: 0.12, sun: '#f4ecd8', cloud: '#3a2a5a' },
    snow: { sky0: '#6a6a8a', sky1: '#a8a8c0', out3: '#c8c8d8' },
  }, [[16, 'dusk'], [18.5, 'dusk'], [20, 'evening'], [22, 'night'], [28, 'night'], [30, 'dusk'], [40, 'dusk']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 19.5 ? 'Dusk' : h >= 19.5 && h < 22 ? 'Evening' : h >= 22 || h < 1.5 ? 'Midnight' : 'Closing'; });
  const MENU = [{ n: 'Cotton candy', c: '#f4a0c8', floss: 1 }, { n: 'Pick\'n\'mix', c: '#3a8ae0', bag: 1 }, { n: 'Sour belts', c: '#7ac030', bag: 1 }, { n: 'Lollipop', c: '#ff4a6a', pop: 1 }, { n: 'Grape jellies', c: '#7a3aa8', bag: 1 }];
  let floss = 0, jack = 0; const K0 = (c, pts) => GeoKit.poly(c, pts);
  const hN = (h) => (h < 12 ? h + 24 : h);
  const W = {
    id: 'candybar', pal: CandyPal, startHour: 18, span: 8, font: '800 15px sans-serif', vign: 'rgba(10,0,20,0.4)', zone: 'rgba(20,14,30,0.45)',
    per: (h) => { const x = hN(h); return x < 20 ? 0 : x < 22 ? 1 : x < 24.5 ? 2 : x < 25.6 ? 3 : 4; },
    staff: [{ T: 236, hw: 58, headR: 28, pattern: 'polo', top: 'coral', hairStyle: 'bob', hat: 'visor', hatCol: 'teal', pants: 'dark' },
      { T: 244, hw: 62, headR: 29, pattern: 'stripe', top: 'teal', top2: 'white', hairStyle: 'short', hat: 'paper', hatCol: 'white', pants: 'navy' }],
    menu: MENU, greet: ['Hey! Sweet tooth?', 'Welcome in!', 'What can I get you?'], ack: ['Spinning!', 'On it!', 'Got it!'], handOff: ['Here you go!', 'Sweet!', 'Have fun!'],
    thanks: ['Thanks!', 'Yesss', 'icon:heart'], done: ['Sugar rush!', 'So good', 'icon:heart'], cheer: ['Combo!', 'Nice!', 'High score!'],
    types: {
      gamer: { body: { pattern: 'hoodie', top: 'plum', hood: 1, hairStyle: 'short', pants: 'dark', backpack: 1, packCol: 'teal' }, words: ['One more round', 'Beat my score'] },
      skater: { body: { pattern: 'tee', top: 'mustard', top2: 'white', hat: 'cap', hatCol: 'navy', pants: 'olive' }, words: ['Sick', 'Lol'] },
      date1: { body: { T: 234, hw: 56, pattern: 'dress', top: 'teal', skirt: 'teal', hairStyle: 'long' }, words: ['Win me a bear', 'icon:heart'] },
      date2: { body: { pattern: 'jacket', top: 'dark', shirt: 'white', hairStyle: 'short', pants: 'navy' }, words: ['On it', 'icon:heart'] },
      office: { body: { pattern: 'suit', top: 'grey', shirt: 'white', tie: 'coral', pants: 'grey', glasses: 1 }, words: ['Long day', 'icon:clock'] },
      mum: { body: { T: 230, hw: 60, pattern: 'cardigan', top: 'coral', top2: 'cream', hairStyle: 'bun' }, words: ['Just one', 'icon:heart'] },
      kid: { body: { T: 160, hw: 50, headR: 30, pattern: 'tee', top: 'teal', hairStyle: 'pony', pants: 'navy' }, words: ['Cotton candy!', 'icon:heart'], small: 1 },
    },
    parties: [{ m: ['gamer'], w: [1, 2, 3, 3, 0] }, { m: ['skater'], w: [2, 2, 2, 1, 0] }, { m: ['date1', 'date2'], w: [1, 3, 3, 1, 0] }, { m: ['office'], w: [2, 2, 1, 1, 0] }, { m: ['mum', 'kid'], w: [3, 1, 0, 0, 0] }],
    sim(X, dt) { floss = Math.max(0, floss - dt * 0.05); jack = Math.max(0, jack - dt * 0.25); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.floss) return [K.ph(3.0, (s, u, t) => { floss = 0.3 + u; s.hold.N = H.item(m, it.o); it.o.frac = u; s.tgN = [ST.x - 36 + Math.cos(t * 9) * 10, CNT.top - 34 + Math.sin(t * 9) * 4]; s.tgF = [ST.x - 20, CNT.top - 24]; s.look = { x: () => ST.x - 36, until: K.simT + 0.3 }; s.leanT = 0.18; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; floss = 0; } })];
      return [K.ph(1.6, (s, u, t) => { s.hold.N = H.tool('scoop'); s.tgN = [ST.x - 10 + Math.sin(t * 7) * 10, CNT.top - 64]; s.tgF = [ST.x + 12, CNT.top - 24]; s.leanT = 0.15; it.o.frac = u; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } }), K.ph(0.5, (s, u, t) => { s.tgN = [ST.x + 10, CNT.top - 30 + Math.sin(t * 20) * 3]; })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST, CNT = X.CNT; return K.start(a, 'restock', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2, 3), (s, u, t) => { s.f = -1; s.hold.N = H.tool('scoop'); s.tgN = [ST.x - 20 + Math.sin(t * 3) * 30, 210 + Math.sin(t * 2) * 6]; s.look = { x: () => ST.x, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X) { const K = X.K; return K.start(a, 'tap', [K.ph(rand(1.5, 2.5), (s, u, t) => { s.tgN = [s.hx + 30 + Math.sin(t * 14) * 3, X.CNT.top - 20]; s.look = { x: () => 1140, until: K.simT + 0.3 }; })]); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L; if (k === 'scoop') { c.fillStyle = L('#c8ccd8'); c.save(); c.translate(x, y); c.rotate(a.f * 0.4); c.fillRect(-1.5 * s, -10 * s, 3 * s, 10 * s); c.beginPath(); c.moveTo(-6 * s, 0); c.lineTo(6 * s, 0); c.lineTo(4 * s, 8 * s); c.lineTo(-4 * s, 8 * s); c.closePath(); c.fill(); c.restore(); } },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.floss) { c.strokeStyle = L('#f4ecd8'); c.lineWidth = 1.6; c.beginPath(); c.moveTo(0, 4); c.lineTo(0, -12); c.stroke(); if (frac > 0.03) { c.fillStyle = L(m.c); const r = 4 + 7 * Math.sqrt(frac); ellipse(c, 0, -14 - r * 0.6, r, r * 1.05); c.fill(); c.fillStyle = 'rgba(255,240,250,0.6)'; ellipse(c, -r * 0.3, -14 - r * 0.9, r * 0.45, r * 0.35); c.fill(); } }
      else if (m.pop) { c.strokeStyle = L('#f4ecd8'); c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, 4); c.lineTo(0, -10); c.stroke(); if (frac > 0.03) { const r = 3 + 4 * frac; c.fillStyle = L(m.c); c.beginPath(); c.arc(0, -10 - r, r, 0, TAU); c.fill(); c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1; c.beginPath(); c.arc(0, -10 - r, r * 0.55, 0, Math.PI * 1.4); c.stroke(); } }
      else { c.fillStyle = L('#f4ecdc'); K0(c, [-6, -16, 6, -16, 5, 0, -5, 0]); c.fill(); c.fillStyle = L('#ff4ab0'); c.fillRect(-6, -10, 12, 3); if (frac > 0.03) { c.fillStyle = L(m.c); for (let i = 0; i < Math.round(5 * frac); i++) { c.beginPath(); c.arc(-3 + (i % 3) * 3, -17 - Math.floor(i / 3) * 2.5, 1.8, 0, TAU); c.fill(); } } }
      c.restore(); },
    room(c, t, X) { const P = X.K.P, L = X.L, na = P.neonA;
      c.fillStyle = P.wall2; for (let i = 0; i < 70; i++) c.fillRect(-60 + i * 20, 40, 2, 620);
      c.fillStyle = P.woodDk; c.fillRect(-60, 0, 1400, 40); c.fillStyle = rgba(P.neon2, 0.4 + na * 0.6); c.fillRect(-60, 38, 1400, 3); X.K.glow(c, 640, 40, 500, P.neon2, 0.12 * na);
      c.fillStyle = P.wall; c.fillRect(470, 120, 340, 180);
      // left strip: neon CANDY tube + glass jar wall
      c.font = 'italic 900 40px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 3; c.strokeStyle = rgba(P.neon, 0.35 + na * 0.65); c.strokeText('CANDY', 150, 96); X.K.glow(c, 150, 96, 150, P.neon, 0.4 * na); c.fillStyle = rgba('#ffffff', 0.15 + na * 0.5); c.font = '800 12px sans-serif'; c.fillText('PICK · MIX · SPIN', 150, 130);
      c.fillStyle = P.wood; c.fillRect(28, 236, 400, 8); c.fillRect(28, 186, 400, 6);
      const jc = ['#141014', '#7a3aa8', '#b06a20', '#3a8ae0', '#7ac030', '#f4a0c8', '#f6f2f0', '#ff4a6a'];
      for (let i = 0; i < 8; i++) { const jx = 44 + i * 48; c.fillStyle = 'rgba(220,230,255,0.25)'; roundRect(c, jx - 16, 194, 32, 42, 6); c.fill(); c.fillStyle = L(jc[i]); roundRect(c, jx - 13, 206, 26, 28, 4); c.fill(); c.fillStyle = L('#d8d8e8'); c.fillRect(jx - 12, 190, 24, 5); }
      for (let i = 0; i < 8; i++) { const jx = 44 + i * 48; c.fillStyle = L(jc[(i + 3) % 8]); c.beginPath(); c.arc(jx, 172, 9, 0, TAU); c.fill(); c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 1.5; c.beginPath(); c.arc(jx, 172, 5, 0, Math.PI * 1.4); c.stroke(); c.fillStyle = L('#f4ecd8'); c.fillRect(jx - 1, 180, 2, 6); }
      // jackpot strobe from the arcade
      if (jack > 0) { c.fillStyle = rgba(['#ff4ab0', '#3ae0ff', '#ffe04a'][Math.floor(t * 8) % 3], 0.12 * jack); c.fillRect(-60, 0, 1400, 660); }
    },
    lamps: [],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.woodDk; c.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); return; } c.strokeStyle = rgba(P.neon2, 0.3 + P.neonA * 0.7); c.lineWidth = 3; c.strokeRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12); X.K.glow(c, (x0 + x1) / 2, y0, 160, P.neon2, 0.15 * P.neonA); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0;
      K.sky(c, x0, y0, x1, y1, { sunR: 14, noClouds: 1 });
      const bl = [[0, 150, 70, P.out2], [64, 90, 80, P.out1], [140, 130, 80, P.out2]];
      bl.forEach(([dx, hh, ww, col], i) => { c.fillStyle = col; c.fillRect(x0 + dx, y0 + hh, ww, y1 - y0); c.fillStyle = rgba('#ffe0a0', 0.25 + P.neonA * 0.5); for (let k = 0; k < 14; k++) { if ((k * 7 + i * 3) % 4 === 0) continue; c.fillRect(x0 + dx + 8 + (k % 3) * 22, y0 + hh + 12 + Math.floor(k / 3) * 26, 10, 12); } });
      // vertical neon signs flickering on
      [[x0 + 54, '#ff4ab0', 'ラーメン'], [x0 + 176, '#3ae0ff', 'BAR']].forEach(([sx, col, txt], i) => { const on = P.neonA * (Math.sin(t * 3 + i * 5) > -0.9 ? 1 : 0.2); c.fillStyle = L('#1a1424'); c.fillRect(sx - 12, y0 + 40, 24, 110); c.fillStyle = rgba(col, 0.25 + on * 0.75); c.font = '800 15px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; [...txt].forEach((ch, k) => c.fillText(ch, sx, y0 + 58 + k * 22)); K.glow(c, sx, y0 + 95, 60, col, 0.3 * on); });
      // street + passing tail-lights
      c.fillStyle = P.out3; c.fillRect(x0, y1 - 60, w, 60); c.fillStyle = rgba(P.neon, 0.25 * P.neonA); c.fillRect(x0, y1 - 40, w, 3);
      for (let i = 0; i < 2; i++) { const cx = x0 - 60 + ((t * (70 + i * 40) + i * 150) % (w + 120)), cy = y1 - 30 + i * 12; c.fillStyle = L(i ? '#e8c040' : '#3a3a50'); roundRect(c, cx, cy - 14, 48, 14, 4); c.fill(); c.fillStyle = '#ff3a3a'; c.fillRect(cx, cy - 10, 4, 4); K.glow(c, cx, cy - 8, 30, '#ff3a3a', 0.3); }
    },
    floor(c, X) { const P = X.K.P; for (let i = 0; i < 40; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 36, 650 + j * 26, 36, 26); } },
    counter(c, t, X) { const P = X.K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      c.fillStyle = P.steel; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // cotton-candy machine: bowl with a spinning head, floss cloud when working
      { const mx = ST.x - 36; c.fillStyle = L('#ff4ab0'); c.fillRect(mx - 18, top - 22, 36, 16); c.fillStyle = 'rgba(230,240,255,0.35)'; c.beginPath(); c.ellipse(mx, top - 30, 30, 14, 0, Math.PI, TAU); c.fill(); c.fillStyle = L('#c8ccd8'); c.save(); c.translate(mx, top - 30); c.scale(1, 0.3); c.rotate(t * 20); c.fillRect(-8, -2, 16, 4); c.restore(); if (floss > 0.05) { c.fillStyle = rgba('#f8b8d8', Math.min(0.8, floss)); ellipse(c, mx, top - 36, 22 * Math.min(1, floss), 9 * Math.min(1, floss)); c.fill(); } }
      c.fillStyle = L('#e8e0f0'); c.fillRect(206, top - 24, 30, 18); c.fillStyle = rgba(P.neon2, 0.8); c.fillRect(209, top - 21, 24, 8);
      for (let i = 0; i < 3; i++) { const lx = 150 + i * 14; c.strokeStyle = L('#f4ecd8'); c.lineWidth = 1.5; c.beginPath(); c.moveTo(lx, top - 6); c.lineTo(lx, top - 26); c.stroke(); c.fillStyle = L(['#ff4a6a', '#3ae0ff', '#ffe04a'][i]); c.beginPath(); c.arc(lx, top - 30, 6, 0, TAU); c.fill(); }
      // glossy acrylic counter with a neon strip
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); c.fillStyle = rgba(P.neon, 0.4 + P.neonA * 0.6); c.fillRect(x0 - 6, top + 14, x1 - x0 + 12, 3); X.K.glow(c, (x0 + x1) / 2, top + 16, 160, P.neon, 0.2 * P.neonA);
      for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(220,230,255,0.18)'; roundRect(c, x0 + 12 + i * 58, top + 34, 46, 60, 6); c.fill(); c.fillStyle = L(['#7a3aa8', '#7ac030', '#3a8ae0', '#b06a20'][i]); roundRect(c, x0 + 16 + i * 58, top + 60, 38, 30, 4); c.fill(); }
    },
    events: [{ name: 'jackpot', dur: 8, start(X, srv, mk) { jack = 1; X.K.say(srv, 'JACKPOT!', 1.6); X.K.say(mk, 'Woo!', 1.2); for (const c of X.K.actors.filter((q) => q.cust)) X.K.say(c, pick(['Whoa!', 'icon:star', 'Lucky!']), 1.2); } }],
  };
  registerStage('candybar', makeGeoCafe(W));
})();
