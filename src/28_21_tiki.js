/* ================= Remake of OCEAN DEEP · Tiki Beach Shack — GEOMETRIC edition =================
   A thatched fruit bar on the sand. Kai takes orders at the till; Lani chops fruit and runs the blender at the station
   (the blender really spins, the cup really fills) and hands drinks over the bamboo counter. Guests drink at the ledge
   in front of a wide sea window: sailboat on the horizon, waves rolling in, the sun setting into the water, then a
   moonlight path. Signature: the sunset shell — Kai blows the conch at sundown and everybody turns to the sea.
   Blocks: acai · dragon fruit · watermelon · kiwi · papaya · pineapple · coconut (one continuous mass each). */
(() => {
  const TikiPal = GeoCafePal({
    morning: { wall: '#f2e2c4', wall2: '#e4cfa8', trim: '#3aa8a8', wood: '#b07a46', woodDk: '#6e4826', floor: '#e8d2a4', floor2: '#dcc290', cnt: '#c89a5a', cnt2: '#a87a3e', thatch: '#d8b064', thatch2: '#b88a40', steel: '#c8d0d4', glass: '#dff4f4',
      sky0: '#8ad0f0', sky1: '#e8f6fa', out1: '#3ab8c8', out2: '#1a7a9a', out3: '#f2e0b0', lamp: '#fff0c0', glow: '#ffe0a0', glowA: 0.06, shaft: '#fff8e0', shaftA: 0.2, amb: '#ffffff', ambK: 0, sun: '#fff6d8', cloud: '#ffffff' },
    day: { wall: '#f6e6c8', wall2: '#e8d4ae', trim: '#2ea4a8', wood: '#b47e4a', woodDk: '#704a28', floor: '#ecd6a8', floor2: '#dfc694', cnt: '#cc9e5e', cnt2: '#ac7e42', thatch: '#dcb468', thatch2: '#bc8e44', steel: '#ccd4d8', glass: '#e4f8f8',
      sky0: '#4aa8ec', sky1: '#c8ecfa', out1: '#2ab0c8', out2: '#126c96', out3: '#f6e4b4', lamp: '#fff4d0', glow: '#ffe8b0', glowA: 0.03, shaft: '#ffffff', shaftA: 0.16, amb: '#ffffff', ambK: 0, sun: '#fffbe8', cloud: '#ffffff' },
    dusk: { wall: '#f0c8a0', wall2: '#dcae84', trim: '#2a8a90', wood: '#a06a3a', woodDk: '#603c1e', floor: '#dcb48a', floor2: '#c89c72', cnt: '#bc8a50', cnt2: '#986a34', thatch: '#c89a50', thatch2: '#a07434', steel: '#c0b8b8', glass: '#f4dcd0',
      sky0: '#6a5aa8', sky1: '#ffa060', out1: '#e88a6a', out2: '#5a4a8a', out3: '#e8b88a', lamp: '#ffc070', glow: '#ffaa50', glowA: 0.3, shaft: '#ffb070', shaftA: 0.24, amb: '#ffd0a8', ambK: 0.06, sun: '#ffb070', cloud: '#ffc8a8' },
    night: { wall: '#4a4058', wall2: '#3e3650', trim: '#1e6068', wood: '#5a3e2a', woodDk: '#38241a', floor: '#4a4250', floor2: '#3e3646', cnt: '#5e4632', cnt2: '#463222', thatch: '#6a5638', thatch2: '#4e3e26', steel: '#7a8088', glass: '#a8d8e0',
      sky0: '#0a1430', sky1: '#24305a', out1: '#1a2c50', out2: '#0c1834', out3: '#5a5466', lamp: '#ffd080', glow: '#ffb860', glowA: 0.45, shaft: '#ffc080', shaftA: 0, amb: '#3a3050', ambK: 0.14, sun: '#f4ecd8', cloud: '#5a6080' },
    snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', out3: '#e8eaee' },
  }, [[6, 'night'], [8.5, 'morning'], [11.5, 'day'], [17, 'day'], [19.3, 'dusk'], [21, 'night'], [30, 'night'], [32.5, 'morning']],
  (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 12 ? 'Morning' : h < 17.5 ? 'Beach day' : h < 20.5 ? 'Sunset' : h < 22.5 ? 'Moonlight' : 'Closing'; });
  const MENU = [{ n: 'Mango smoothie', c: '#f8a830', g: '#ff6a5a' }, { n: 'Acai bowl', c: '#5a2458', g: '#f4e0a0', bowl: 1 }, { n: 'Coconut', c: '#f6f2e8', coco: 1 }, { n: 'Watermelon juice', c: '#ee4a52', g: '#7ac040' }, { n: 'Kiwi cooler', c: '#8ac040', g: '#f4f0d0' }, { n: 'Pineapple punch', c: '#f6d040', g: '#e83a5a' }];
  let blend = 0, conch = 0, boat = 0.1;
  const W = {
    id: 'tiki', pal: TikiPal, startHour: 10, span: 13, font: '800 15px sans-serif', vign: 'rgba(20,30,40,0.25)', zone: 'rgba(250,246,236,0.28)',
    per: (h) => (h < 11.5 ? 0 : h < 17 ? 1 : h < 20.5 ? 2 : h < 22.5 ? 3 : 4),
    staff: [{ T: 236, hw: 58, headR: 28, pattern: 'tee', top: 'teal', top2: 'white', hairStyle: 'long', hat: 'kerchief', hatCol: 'coral', pants: 'cream' },
      { T: 244, hw: 62, headR: 29, pattern: 'apron', top: 'coral', top2: 'cream', shirt: 'white', hairStyle: 'short', hat: 'cap', hatCol: 'teal', pants: 'navy' }],
    menu: MENU, greet: ['Aloha!', 'Hey! What can I get you?', 'Welcome to the shack!'], ack: ['On it!', 'Coming up!', 'Shaka!'], handOff: ['Here you go!', 'Fresh!', 'Enjoy the sun!'],
    thanks: ['Mahalo!', 'Thanks!', 'icon:heart'], done: ['So good!', 'Mahalo!', 'icon:heart'], cheer: ['Nice!', 'Cowabunga!', 'Shaka!'],
    types: {
      surfer: { body: { pattern: 'tee', top: 'teal', top2: 'white', hairStyle: 'long', pants: 'navy', hair: 'mustard' }, words: ['Waves are good', 'Glassy out there'] },
      mum: { body: { T: 230, hw: 60, pattern: 'dress', top: 'coral', skirt: 'coral', hairStyle: 'bun', hat: 'bucket', hatCol: 'cream' }, words: ['Sunscreen, honey', 'icon:heart'] },
      kid: { body: { T: 160, hw: 50, headR: 30, pattern: 'stripe', top: 'mustard', top2: 'white', hairStyle: 'pony', pants: 'teal' }, words: ['Can we swim?', 'icon:heart'], small: 1 },
      tourist: { body: { pattern: 'tee', top: 'mustard', hat: 'bucket', hatCol: 'cream', camera: 1, pants: 'olive', backpack: 1, packCol: 'teal' }, words: ['Paradise!', 'icon:cam'] },
      jogger: { body: { pattern: 'tee', top: 'coral', top2: 'white', hat: 'visor', hatCol: 'white', pants: 'dark' }, words: ['Hot today', 'Hydrate!'] },
      lady: { body: { T: 234, hw: 56, pattern: 'dress', top: 'teal', skirt: 'teal', hairStyle: 'long', glasses: 1 }, words: ['Look at that blue', 'icon:heart'] },
      beau: { body: { pattern: 'polo', top: 'cream', pants: 'navy', hairStyle: 'short' }, words: ['Perfect day', 'icon:heart'] },
    },
    parties: [{ m: ['surfer'], w: [3, 2, 2, 1, 0] }, { m: ['mum', 'kid'], w: [2, 3, 1, 0, 0] }, { m: ['tourist'], w: [1, 3, 2, 1, 0] }, { m: ['jogger'], w: [3, 1, 1, 0, 0] }, { m: ['lady', 'beau'], w: [0.5, 1, 3, 3, 0] }],
    sim(X, dt) { blend = Math.max(0, blend - dt * 0.8); boat = (boat + dt * 0.006) % 1.2; conch = Math.max(0, conch - dt * 0.25);
      const h = X.hr; if (h > 19.4 && h < 19.6 && !W.blown) { W.blown = 1; conch = 1; } if (h < 19) W.blown = 0; },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      return [K.ph(1.4, (s, u, t) => { s.hold.N = H.tool('knife'); s.tgN = [ST.x - 10 + Math.sin(t * 16) * 4, CNT.top - 24 - Math.abs(Math.sin(t * 16)) * 8]; s.tgF = [ST.x + 8, CNT.top - 22]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; } }),
        K.ph(1.8, (s, u, t) => { blend = 1; s.tgF = [ST.x - 40, CNT.top - 60]; s.tgN = [s.hx - 10, s.hy - 40]; s.look = { x: () => ST.x - 40, until: K.simT + 0.3 }; if (Math.random() < 0.05) K.fx('spark', ST.x - 40, CNT.top - 70, { life: 0.5 }); }),
        K.ph(0.8, (s, u) => { s.hold.N = H.tool('jar'); s.tgN = [ST.x + 10, CNT.top - 40]; it.o.frac = u; s.tgF = [ST.x + 24, CNT.top - 30]; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST, CNT = X.CNT; return K.start(a, 'chop', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2, 3), (s, u, t) => { s.f = -1; s.hold.N = H.tool('knife'); s.tgN = [ST.x - 6 + Math.sin(t * 14) * 4, CNT.top - 24 - Math.abs(Math.sin(t * 14)) * 8]; s.leanT = 0.2; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K; if (conch > 0.5) return K.start(a, 'conch', [K.ph(2.4, (s) => { s.hold.N = H.tool('conch'); s.tgN = [s.R.cx + 10, s.R.cy + 8]; s.tgF = [s.R.cx + 16, s.R.cy + 10]; s.look = { x: () => 1140, until: K.simT + 0.3 }; }, { enter: () => K.say(a, 'Sunset!', 1.6), exit: (s) => { s.hold.N = null; for (const c of K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: K.simT + 3 }; } } })], { onAbort: (s) => { s.hold.N = null; } });
      return K.start(a, 'shake', [K.ph(rand(1.5, 2.5), (s, u, t) => { s.hold.N = H.tool('jar'); s.tgN = [s.hx + 20, s.hy - 70 + Math.sin(t * 20) * 6]; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'knife') { c.save(); c.translate(x, y); c.rotate(a.f * 0.5); c.fillStyle = L('#3a2a2a'); c.fillRect(-1.5 * s, -2 * s, 3 * s, 9 * s); c.fillStyle = L('#d8dee2'); K0(c, [-1.5 * s, 7 * s, 2 * s, 7 * s, 0, 20 * s]); c.restore(); }
      else if (k === 'jar') { c.fillStyle = 'rgba(230,245,250,0.7)'; c.fillRect(x - 5 * s, y - 16 * s, 10 * s, 16 * s); c.fillStyle = L('#f8a830'); c.fillRect(x - 4 * s, y - 10 * s, 8 * s, 9 * s); c.fillStyle = L('#3a3a40'); c.fillRect(x - 5.5 * s, y - 18 * s, 11 * s, 3 * s); }
      else if (k === 'conch') { c.fillStyle = L('#f4c8b0'); c.beginPath(); c.moveTo(x - 4 * s, y); c.quadraticCurveTo(x + 6 * s, y - 10 * s, x + 16 * s, y - 2 * s); c.quadraticCurveTo(x + 6 * s, y + 6 * s, x - 4 * s, y); c.fill(); c.fillStyle = L('#e88a7a'); ellipse(c, x + 12 * s, y - 2 * s, 3 * s, 2 * s); c.fill(); }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.coco) { c.fillStyle = L('#6a4426'); c.beginPath(); c.arc(0, -6, 7, 0, TAU); c.fill(); c.fillStyle = L('#f6f2e8'); ellipse(c, 0, -11, 5, 1.6); c.fill(); c.fillStyle = L('#ff6a9a'); c.fillRect(1, -22, 1.6, 12); }
      else if (m.bowl) { c.fillStyle = L('#8a5a32'); c.beginPath(); c.moveTo(-9, -6); c.lineTo(9, -6); c.quadraticCurveTo(8, 2, 0, 2); c.quadraticCurveTo(-8, 2, -9, -6); c.fill(); if (frac > 0.05) { c.fillStyle = L(m.c); ellipse(c, 0, -6, 8.5 * Math.sqrt(frac), 2.4); c.fill(); c.fillStyle = L(m.g); for (let i = 0; i < 3 * frac; i++) { ellipse(c, -4 + i * 4, -7, 1.6, 1); c.fill(); } } }
      else { c.fillStyle = 'rgba(235,245,255,0.55)'; K0(c, [-5, -20, 5, -20, 4, 0, -4, 0]); c.fill(); const top = -18 + (1 - frac) * 17; if (frac > 0.03) { c.fillStyle = L(m.c); K0(c, [-4.6 + (1 - frac) * 0.6, top, 4.6 - (1 - frac) * 0.6, top, 3.6, -1, -3.6, -1]); c.fill(); } c.fillStyle = L(m.g); ellipse(c, 4, -20, 3, 2); c.fill(); c.strokeStyle = L('#ffffff'); c.lineWidth = 1.2; c.beginPath(); c.moveTo(1, -12); c.lineTo(3, -28); c.stroke(); c.fillStyle = L('#ff5a8a'); K0(c, [-4, -26, 4, -30, 6, -24]); c.fill(); }
      c.restore(); },
    room(c, t, X) { const P = X.K.P, L = X.L;
      for (let i = 0; i < 70; i++) { c.fillStyle = i % 2 ? P.wall : P.wall2; c.fillRect(-60 + i * 20, 60, 20, 600); }
      // thatched roof fringe across the top
      c.fillStyle = P.thatch2; c.fillRect(-60, 0, 1400, 56); for (let x = -60; x < 1340; x += 18) { c.fillStyle = (x / 18) % 2 ? P.thatch : P.thatch2; K0(c, [x, 40, x + 18, 40, x + 13, 74 + ((x * 7) % 11), x + 4, 70 + ((x * 3) % 9)]); c.fill(); }
      // centre niche behind the board: plain bamboo screen (nothing to read through the well)
      c.fillStyle = P.wall2; c.fillRect(470, 120, 340, 180);
      // left strip: surfboard menu + fruit shelf
      c.save(); c.translate(150, 116); c.rotate(-0.06); c.fillStyle = L('#2ea4a8'); ellipse(c, 0, 0, 110, 34); c.fill(); c.fillStyle = L('#fbf4e6'); ellipse(c, 0, 0, 96, 24); c.fill(); c.fillStyle = L('#e8604a'); c.fillRect(-100, -2, 200, 4);
      c.fillStyle = L('#2a4a5a'); c.font = '900 20px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('FRUIT BAR', 0, -8); c.font = '700 11px sans-serif'; c.fillText('smoothies · bowls · coconuts', 0, 12); c.restore();
      c.fillStyle = P.wood; c.fillRect(28, 236, 400, 9); c.fillRect(28, 176, 400, 7);
      const fr = [['#6a4426', 0], ['#f6d040', 1], ['#7ab830', 0], ['#ee4a52', 0], ['#f08a3a', 0], ['#6a4426', 0]];
      fr.forEach(([col, pine], i) => { const fx = 52 + i * 62; c.fillStyle = L(col); c.beginPath(); c.arc(fx, 222, pine ? 12 : 14, 0, TAU); c.fill(); if (pine) { c.fillStyle = L('#3a8a3a'); K0(c, [fx - 8, 212, fx, 194, fx + 8, 212]); c.fill(); } });
      for (let i = 0; i < 5; i++) { const fx = 60 + i * 76; c.fillStyle = L(['#f8a830', '#5a2458', '#8ac040', '#ee4a52', '#f6d040'][i]); roundRect(c, fx, 150, 18, 26, 4); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(fx + 3, 154, 3, 18); }
      // surfboards leaning by the window
      [['#e8604a', 1270], ['#f6d040', 1290]].forEach(([col, bx], i) => { c.save(); c.translate(bx, 420); c.rotate(-0.08 + i * 0.05); c.fillStyle = L(col); ellipse(c, 0, 0, 14, 120); c.fill(); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(-1.5, -110, 3, 220); c.restore(); });
    },
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.woodDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; } c.strokeStyle = P.wood; c.lineWidth = 6; c.beginPath(); c.moveTo(x0, y0 + 110); c.lineTo(x1, y0 + 110); c.stroke(); c.fillStyle = P.thatch; for (let x = x0 - 14; x < x1 + 10; x += 14) { K0(c, [x, y0 - 14, x + 14, y0 - 14, x + 8, y0 + 12 + ((x * 5) % 7)]); c.fill(); } },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, hz = y0 + (y1 - y0) * 0.5, w = x1 - x0;
      K.sky(c, x0, y0, x1, hz + 2, { sunR: 16 });
      c.fillStyle = linear(c, 0, hz, 0, y1 - 70, [[0, P.out1], [1, P.out2]]); c.fillRect(x0, hz, w, y1 - hz);
      if (P.night > 0.3) { c.fillStyle = rgba('#f4ecd8', 0.35 * P.night); for (let i = 0; i < 8; i++) { const yy = hz + 8 + i * 12, ww = 6 + i * 5; c.fillRect(x0 + w * 0.55 - ww / 2 + Math.sin(t * 1.5 + i) * 4, yy, ww, 2); } }
      c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 2; for (let i = 0; i < 5; i++) { const yy = hz + 20 + i * 22, off = (t * (10 + i * 4)) % 40; c.beginPath(); for (let xx = x0 - 40 + off; xx < x1; xx += 40) { c.moveTo(xx, yy); c.quadraticCurveTo(xx + 10, yy - 4, xx + 20, yy); } c.stroke(); }
      // sailboat crossing slowly
      { const bx = x0 - 40 + boat * (w + 80), by = hz + 4; c.fillStyle = X.L('#fbf6ee'); K0(c, [bx, by - 4, bx, by - 40, bx + 22, by - 6]); c.fill(); c.fillStyle = X.L('#e8604a'); K0(c, [bx - 2, by - 4, bx - 2, by - 30, bx - 16, by - 6]); c.fill(); c.fillStyle = X.L('#3a3a48'); K0(c, [bx - 18, by - 4, bx + 24, by - 4, bx + 18, by + 3, bx - 12, by + 3]); c.fill(); }
      // sand + shoreline foam
      const sy = y1 - 70; c.fillStyle = P.out3; c.beginPath(); c.moveTo(x0, sy); for (let xx = x0; xx <= x1; xx += 20) c.lineTo(xx, sy + Math.sin(xx * 0.05 + t * 0.8) * 3); c.lineTo(x1, y1); c.lineTo(x0, y1); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 3; c.beginPath(); for (let xx = x0; xx <= x1; xx += 20) { const yy = sy + Math.sin(xx * 0.05 + t * 0.8) * 3; xx === x0 ? c.moveTo(xx, yy) : c.lineTo(xx, yy); } c.stroke();
      // a palm leaning in from the right
      c.strokeStyle = X.L('#7a5434'); c.lineWidth = 9; c.beginPath(); c.moveTo(x1 + 4, y1); c.quadraticCurveTo(x1 - 20, y0 + 160, x1 - 50, y0 + 60); c.stroke(); c.fillStyle = X.L('#3a8a4a'); for (let i = 0; i < 6; i++) { const an = -2.6 + i * 0.55 + Math.sin(t * 0.8 + i) * 0.05; c.save(); c.translate(x1 - 50, y0 + 60); c.rotate(an); ellipse(c, 34, 0, 36, 7); c.fill(); c.restore(); }
    },
    floor(c, X) { const P = X.K.P; for (let i = 0; i < 36; i++) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 42, 640, 3, 120); } },
    counter(c, t, X) { const P = X.K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      // blender + fruit crates on the counter top
      c.fillStyle = P.steel; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      { const bx = ST.x - 40, by = top - 6; c.fillStyle = L('#3a3a40'); c.fillRect(bx - 12, by - 14, 24, 14); c.fillStyle = 'rgba(230,245,250,0.6)'; c.fillRect(bx - 10, by - 50, 20, 36); c.fillStyle = L('#f8a830'); const lv = 10 + blend * 14; c.fillRect(bx - 9, by - 14 - lv, 18, lv); if (blend > 0.05) { c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1.5; c.beginPath(); for (let i = 0; i < 3; i++) { const yy = by - 18 - i * 6; c.moveTo(bx - 8, yy + Math.sin(t * 40 + i) * 2); c.lineTo(bx + 8, yy - Math.sin(t * 40 + i) * 2); } c.stroke(); } c.fillStyle = L('#3a3a40'); c.fillRect(bx - 11, by - 54, 22, 5); }
      c.fillStyle = L('#a87a3e'); c.fillRect(150, top - 26, 40, 20); c.fillStyle = L('#f6d040'); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(158 + i * 12, top - 28, 6, 0, TAU); c.fill(); } c.fillStyle = L('#3a8a3a'); for (let i = 0; i < 3; i++) { K0(c, [154 + i * 12, top - 32, 158 + i * 12, top - 44, 162 + i * 12, top - 32]); c.fill(); }
      c.fillStyle = L('#e8e0d0'); c.fillRect(210, top - 22, 26, 16); c.fillStyle = L('#2a2a30'); c.fillRect(213, top - 19, 20, 8); // till
      // bamboo counter front
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); for (let xx = x0; xx < x1; xx += 16) { c.fillStyle = P.cnt2; c.fillRect(xx, top + 2, 3, base - top); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(xx, top + 40, 14, 2); c.fillRect(xx, top + 100, 14, 2); }
      c.fillStyle = P.thatch2; for (let xx = x0 - 6; xx < x1 + 6; xx += 12) { K0(c, [xx, top + 2, xx + 12, top + 2, xx + 7, top + 24 + ((xx * 7) % 6)]); c.fill(); }
    },
    events: [{ name: 'dolphins', dur: 10, start(X, srv) { X.K.say(srv, 'Dolphins!', 1.6); for (const c of X.K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: X.K.simT + 3 }; if (c.def.camera) X.K.say(c, 'icon:cam', 1); } X.S.dolph = 1; }, end(X) { X.S.dolph = 0; } }],
  };
  const K0 = (c, pts) => GeoKit.poly(c, pts);
  const _view = W.view; W.view = (c, x0, y0, x1, y1, t, X) => { _view(c, x0, y0, x1, y1, t, X); if (X.S.dolph && X.S.ev) { const u = (X.S.ev.t || 0) / 10, hz = y0 + (y1 - y0) * 0.5; for (let i = 0; i < 2; i++) { const p = (u * 3 + i * 0.4) % 1, dx = x0 + 30 + u * (x1 - x0 - 60) + i * 26, dy = hz + 26 - Math.sin(p * Math.PI) * 22; if (p < 0.9) { c.fillStyle = X.L('#5a6a80'); c.save(); c.translate(dx, dy); c.rotate(-0.8 + p * 1.6); ellipse(c, 0, 0, 12, 4); c.fill(); K0(c, [-2, -3, 3, -3, 0, -9]); c.fill(); c.restore(); } } } };
  registerStage('tiki', makeGeoCafe(W));
})();
