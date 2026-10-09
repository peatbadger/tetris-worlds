/* ================= Remake of DESERT SUNSET · Oasis Tea Tent — GEOMETRIC edition =================
   A striped canvas tea tent at an oasis. Yusuf greets and takes orders at the low cedar counter; Amira pours mint tea from
   a height (the amber stream arcs into the glass and froths), plates dates, baklava and couscous, and hands them over.
   Guests sit-stand at the ledge by the open tent flap: dunes, palms, the oasis pool and a camel caravan crossing the ridge;
   at night brass lanterns glow and the stars come out. Signature: the caravan arrives (camels pass close, bells).
   Blocks: dates · pomegranate · mint · baklava · apricots · couscous · labneh (one continuous mass each). */
(() => {
  const OasisPal = GeoCafePal({
    morning: { wall: '#f2e2c8', wall2: '#c8503a', trim: '#2a8a8a', wood: '#8a5a32', woodDk: '#5a3820', floor: '#c84a3a', floor2: '#e8b858', cnt: '#9a6a3a', cnt2: '#7a4e28', brass: '#d8a848', steel: '#c8c0b0', glass: '#f4ecd8',
      sky0: '#8ac4e8', sky1: '#f8e8c8', out1: '#f0c888', out2: '#e0a868', out3: '#c88a50', palm: '#4a7a3a', pool: '#4ab0b8', lamp: '#ffe8b0', glow: '#ffd890', glowA: 0.05, shaft: '#fff4d8', shaftA: 0.22, amb: '#ffffff', ambK: 0, sun: '#fff4d0', cloud: '#ffffff' },
    day: { wall: '#f6e6cc', wall2: '#cc543c', trim: '#268a8a', wood: '#8e5e34', woodDk: '#5e3a22', floor: '#cc4e3c', floor2: '#ecbc5c', cnt: '#9e6e3c', cnt2: '#7e522a', brass: '#e0b050', steel: '#ccc4b4', glass: '#f8f0dc',
      sky0: '#5aa8e8', sky1: '#f4e4c4', out1: '#f4cc8c', out2: '#e4ac6c', out3: '#cc8e54', palm: '#4a7e3a', pool: '#3ab0c0', lamp: '#fff0c8', glow: '#ffe0a0', glowA: 0.03, shaft: '#ffffff', shaftA: 0.18, amb: '#ffffff', ambK: 0, sun: '#fffbe8', cloud: '#ffffff' },
    dusk: { wall: '#f0c8a0', wall2: '#b8402e', trim: '#20707a', wood: '#7a4a28', woodDk: '#4e2e18', floor: '#b0402e', floor2: '#d89c4c', cnt: '#8a5a30', cnt2: '#6a4222', brass: '#e8a840', steel: '#c0b0a0', glass: '#f4dcc0',
      sky0: '#5a4a90', sky1: '#ff9a50', out1: '#e8945a', out2: '#c8704a', out3: '#9a5a3a', palm: '#3a4a2a', pool: '#c87a6a', lamp: '#ffc070', glow: '#ffaa50', glowA: 0.32, shaft: '#ffb070', shaftA: 0.24, amb: '#ffc8a0', ambK: 0.06, sun: '#ffb060', cloud: '#ffb890' },
    night: { wall: '#5a4448', wall2: '#5a2a28', trim: '#164a50', wood: '#4a3020', woodDk: '#2e1c12', floor: '#5a2a26', floor2: '#6a5030', cnt: '#4e3422', cnt2: '#3a2618', brass: '#c89038', steel: '#7a7070', glass: '#c8b8a0',
      sky0: '#0a1030', sky1: '#2a2a50', out1: '#4a4058', out2: '#3a3048', out3: '#2e2638', palm: '#1a1a24', pool: '#2a3a5a', lamp: '#ffc870', glow: '#ffa850', glowA: 0.5, shaft: '#ffc080', shaftA: 0, amb: '#3a2e48', ambK: 0.14, sun: '#f4ecd8', cloud: '#4a4a68' },
    snow: { sky0: '#a8b4c8', sky1: '#e4e8f0', out1: '#e8e8ec', out2: '#d8d8e0', out3: '#c8c8d0' },
  }, [[6, 'night'], [8, 'morning'], [11, 'day'], [17, 'day'], [19, 'dusk'], [20.8, 'night'], [30, 'night'], [32, 'morning']],
  (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 11.5 ? 'Morning' : h < 17.5 ? 'Midday heat' : h < 20.3 ? 'Sunset' : h < 22.5 ? 'Lantern night' : 'Closing'; });
  const MENU = [{ n: 'Mint tea', c: '#c08a2a', tea: 1 }, { n: 'Dates', c: '#5a2e14', plate: 1 }, { n: 'Baklava', c: '#d8a040', plate: 1 }, { n: 'Couscous', c: '#ecd290', bowl: 1 }, { n: 'Pomegranate juice', c: '#b81e34' }, { n: 'Apricot plate', c: '#f09030', plate: 1 }];
  let pour = 0, cv = 0.0; const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'oasis', pal: OasisPal, startHour: 9, span: 14, font: 'italic 700 15px Georgia, serif', vign: 'rgba(40,20,10,0.3)', zone: 'rgba(250,240,226,0.26)',
    per: (h) => (h < 11.5 ? 0 : h < 17.5 ? 1 : h < 20.3 ? 2 : h < 22.5 ? 3 : 4),
    staff: [{ T: 244, hw: 62, headR: 29, pattern: 'vest', top: 'navy', top2: 'cream', shirt: 'cream', hairStyle: 'short', hat: 'band', hatCol: 'coral', pants: 'cream' },
      { T: 232, hw: 58, headR: 28, pattern: 'apron', top: 'teal', top2: 'mustard', shirt: 'cream', hairStyle: 'bun', hat: 'kerchief', hatCol: 'mustard', pants: 'brown' }],
    menu: MENU, greet: ['Marhaba!', 'Welcome, sit, sit!', 'Ahlan! Tea?'], ack: ['Right away', 'Tea is coming', 'Yes!'], handOff: ['Bil hana!', 'Careful, hot', 'Enjoy'],
    thanks: ['Shukran!', 'Thank you', 'icon:heart'], done: ['Delicious', 'Shukran!', 'icon:heart'], cheer: ['Mashallah!', 'Bravo!', 'Yalla!'],
    types: {
      traveller: { body: { pattern: 'jacket', top: 'olive', shirt: 'cream', hat: 'bucket', hatCol: 'cream', backpack: 1, packCol: 'coral', pants: 'cream' }, words: ['What a view', 'Long road'] },
      elder: { body: { T: 230, hw: 64, torso: 'round', pattern: 'coat', top: 'cream', top2: 'brown', hair: 'hairGrey', hairStyle: 'short', glasses: 1, pants: 'brown' }, words: ['Hot tea cools you', 'In my day…'] },
      kid: { body: { T: 160, hw: 50, headR: 30, pattern: 'tee', top: 'mustard', hairStyle: 'short', pants: 'navy' }, words: ['Camels!', 'icon:heart'], small: 1 },
      photog: { body: { pattern: 'tee', top: 'teal', hat: 'cap', hatCol: 'coral', camera: 1, pants: 'olive' }, words: ['Golden light!', 'icon:cam'] },
      bride: { body: { T: 234, hw: 56, pattern: 'dress', top: 'plum', skirt: 'plum', hairStyle: 'long' }, words: ['So romantic', 'icon:heart'] },
      groom: { body: { pattern: 'polo', top: 'cream', pants: 'navy', hairStyle: 'short' }, words: ['Sunset soon', 'icon:heart'] },
      rider: { body: { pattern: 'coat', top: 'navy', top2: 'mustard', hat: 'kerchief', hatCol: 'cream', pants: 'cream' }, words: ['The camels are tired', 'Water first'] },
    },
    parties: [{ m: ['traveller'], w: [3, 2, 1, 1, 0] }, { m: ['elder', 'kid'], w: [2, 2, 2, 0, 0] }, { m: ['photog'], w: [1, 1, 3, 1, 0] }, { m: ['bride', 'groom'], w: [0, 1, 3, 3, 0] }, { m: ['rider'], w: [2, 2, 1, 1, 0] }],
    sim(X, dt) { pour = Math.max(0, pour - dt); cv = (cv + dt * 0.012) % 1.4; },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.tea || !m.plate && !m.bowl) return [K.ph(0.6, (s) => { s.hold.N = H.tool('pot'); s.tgN = [ST.x + 4, CNT.top - 40]; s.tgF = [ST.x + 10, CNT.top - 20]; }),
        K.ph(2.0, (s, u) => { pour = 0.2; s.tgN = [ST.x + 2, CNT.top - 80 - Math.sin(u * Math.PI) * 30]; s.tgF = [ST.x + 12, CNT.top - 16]; s.look = { x: () => ST.x + 12, until: K.simT + 0.3 }; it.o.frac = u; }),
        K.ph(0.4, (s) => { s.tgN = [ST.x + 4, CNT.top - 40]; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })];
      return [K.ph(1.2, (s, u, t) => { s.hold.N = H.tool('spoon'); s.tgN = [ST.x - 20 + Math.sin(t * 8) * 6, CNT.top - 26]; s.tgF = [ST.x + 10, CNT.top - 20]; s.leanT = 0.2; it.o.frac = u; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } }),
        K.ph(0.6, (s, u, t) => { s.tgN = [ST.x + 4 + Math.sin(t * 12) * 3, CNT.top - 30]; })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST, CNT = X.CNT; return K.start(a, 'brew', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2.5, 3.5), (s, u, t) => { s.f = -1; s.hold.N = H.tool('mint'); s.tgN = [ST.x - 30 + Math.sin(t * 3) * 4, CNT.top - 30]; s.leanT = 0.18; if (Math.random() < 0.03) K.fx('puff', ST.x - 40, CNT.top - 40, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    srvIdle(a, X, H) { const K = X.K; return K.start(a, 'tray', [K.ph(rand(1.5, 2.5), (s, u, t) => { s.hold.N = H.tool('glasses'); s.tgN = [s.hx + 30, s.hy - 64]; s.look = { x: () => 1140, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'pot') { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = L('#d8a848'); c.beginPath(); c.moveTo(-7, 0); c.quadraticCurveTo(-9, 12, 0, 13); c.quadraticCurveTo(9, 12, 7, 0); c.closePath(); c.fill(); K0(c, [-3, 0, 3, 0, 1, -6, -1, -6]); c.fill(); c.strokeStyle = L('#d8a848'); c.lineWidth = 2; c.beginPath(); c.moveTo(6, 6); c.lineTo(16, 0); c.stroke(); c.restore(); }
      else if (k === 'spoon') { c.strokeStyle = L('#c8b8a0'); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(x, y); c.lineTo(x + a.f * 10 * s, y + 10 * s); c.stroke(); c.fillStyle = L('#c8b8a0'); ellipse(c, x + a.f * 11 * s, y + 11 * s, 3 * s, 2 * s); c.fill(); }
      else if (k === 'mint') { c.fillStyle = L('#3a8a3a'); for (let i = 0; i < 4; i++) { ellipse(c, x + (i - 1.5) * 3 * s, y - 4 * s - (i % 2) * 2 * s, 3 * s, 1.6 * s, i); c.fill(); } }
      else if (k === 'glasses') { c.fillStyle = L('#d8a848'); ellipse(c, x, y, 14 * s, 2.6 * s); c.fill(); for (let i = 0; i < 3; i++) { c.fillStyle = 'rgba(240,230,210,0.7)'; c.fillRect(x - 9 * s + i * 7 * s, y - 9 * s, 5 * s, 8 * s); c.fillStyle = L('#c08a2a'); c.fillRect(x - 9 * s + i * 7 * s, y - 6 * s, 5 * s, 5 * s); } }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.plate || m.bowl) { c.fillStyle = L(m.bowl ? '#2a7a8a' : '#e8dcc4'); if (m.bowl) { c.beginPath(); c.moveTo(-9, -6); c.lineTo(9, -6); c.quadraticCurveTo(8, 2, 0, 2); c.quadraticCurveTo(-8, 2, -9, -6); c.fill(); } else { ellipse(c, 0, -3, 11, 3); c.fill(); }
        if (frac > 0.05) { c.fillStyle = L(m.c); const n = Math.max(1, Math.round(4 * frac)); if (m.bowl) { c.beginPath(); c.ellipse(0, -6, 8 * Math.sqrt(frac), 3 + 2 * frac, 0, Math.PI, TAU); c.fill(); } else for (let i = 0; i < n; i++) { ellipse(c, -6 + i * 4, -5, 2.6, 1.8, 0.3); c.fill(); } } }
      else { c.fillStyle = 'rgba(240,235,220,0.6)'; K0(c, [-4, -14, 4, -14, 3, 0, -3, 0]); c.fill(); const top = -12 + (1 - frac) * 11; if (frac > 0.03) { c.fillStyle = L(m.c); K0(c, [-3.8, top, 3.8, top, 2.8, -1, -2.8, -1]); c.fill(); if (m.tea) { c.fillStyle = 'rgba(255,240,200,0.8)'; c.fillRect(-3.6, top, 7.2, 1.4); c.fillStyle = L('#3a8a3a'); ellipse(c, 2, -15, 2.4, 1.4, 0.4); c.fill(); } } c.fillStyle = L('#d8a848'); c.fillRect(-4.4, -15, 8.8, 1.2); }
      c.restore(); },
    room(c, t, X) { const P = X.K.P, L = X.L;
      for (let i = 0; i < 40; i++) { c.fillStyle = i % 2 ? P.wall : P.wall2; c.fillRect(-60 + i * 36, 40, 36, 620); }
      c.fillStyle = P.wall2; c.fillRect(-60, 0, 1400, 44); for (let x = -60; x < 1340; x += 36) { c.fillStyle = ((x + 60) / 36) % 2 ? P.trim : P.brass; c.beginPath(); c.arc(x + 18, 44, 18, 0, Math.PI); c.fill(); }
      c.fillStyle = P.wall; c.fillRect(470, 120, 340, 180); // plain canvas behind the board
      // left strip: hanging carpet + menu + lanterns
      c.fillStyle = L('#8a2a3a'); c.fillRect(40, 150, 210, 96); c.fillStyle = L('#d8a848'); c.fillRect(48, 158, 194, 80); c.fillStyle = L('#2a5a7a'); c.fillRect(56, 166, 178, 64);
      for (let i = 0; i < 5; i++) { c.fillStyle = L(i % 2 ? '#c8503a' : '#f2e2c8'); K0(c, [72 + i * 36, 198, 90 + i * 36, 176, 108 + i * 36, 198, 90 + i * 36, 220]); c.fill(); }
      for (let i = 0; i < 12; i++) { c.fillStyle = L('#f2e2c8'); c.fillRect(44 + i * 17, 246, 3, 10); }
      c.fillStyle = L('#3a2418'); roundRect(c, 60, 66, 180, 64, 8); c.fill(); c.fillStyle = L('#f4e4c4'); c.font = 'italic 700 24px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Shai · Tea', 150, 90); c.font = '600 11px Georgia, serif'; c.fillText('mint tea · dates · sweets', 150, 114);
      for (const lx of [300, 980]) { c.strokeStyle = P.ink; c.lineWidth = 1.2; c.beginPath(); c.moveTo(lx, 40); c.lineTo(lx, 150); c.stroke(); c.fillStyle = P.brass; K0(c, [lx - 10, 150, lx + 10, 150, lx + 14, 176, lx, 192, lx - 14, 176]); c.fill(); c.fillStyle = P.lamp; for (let i = 0; i < 3; i++) c.fillRect(lx - 7 + i * 5, 158, 2, 16); X.K.glow(c, lx, 172, 110, P.glow, P.glowA + 0.05); }
    },
    lamps: [],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.woodDk; c.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); return; }
      // tent flaps tied back
      c.fillStyle = P.wall2; K0(c, [x0 - 12, y0 - 12, x0 + 50, y0 - 12, x0 + 6, y0 + 200, x0 - 12, y0 + 220]); c.fill(); K0(c, [x1 + 12, y0 - 12, x1 - 50, y0 - 12, x1 - 6, y0 + 200, x1 + 12, y0 + 220]); c.fill();
      c.fillStyle = P.brass; c.fillRect(x0 - 4, y0 + 196, 14, 6); c.fillRect(x1 - 10, y0 + 196, 14, 6); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0;
      K.sky(c, x0, y0, x1, y1, { sunR: 18 });
      const dune = (yb, amp, ph, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x0, y1); for (let xx = x0; xx <= x1; xx += 8) c.lineTo(xx, yb - Math.sin((xx - x0) / w * 3 + ph) * amp - Math.sin((xx - x0) / w * 7 + ph * 2) * amp * 0.3); c.lineTo(x1, y1); c.closePath(); c.fill(); };
      dune(y0 + 210, 18, 0.5, P.out1);
      // camel caravan on the far ridge
      for (let i = 0; i < 4; i++) { const cx = x0 - 60 + ((cv * (w + 160)) - i * 34), cy = y0 + 196 - Math.sin((cx - x0) / w * 3 + 0.5) * 18; if (cx < x0 - 30 || cx > x1 + 30) continue; const st = Math.sin(t * 4 + i) * 2; c.fillStyle = L(P.night > 0.5 ? '#1a1a24' : '#7a5034'); ellipse(c, cx, cy - 12, 11, 6); c.fill(); c.beginPath(); c.arc(cx - 2, cy - 18, 5, Math.PI, TAU); c.fill(); c.fillRect(cx + 8, cy - 24, 3, 12); c.fillRect(cx + 8, cy - 26, 7, 4); c.fillRect(cx - 8 + st, cy - 8, 2, 9); c.fillRect(cx + 6 - st, cy - 8, 2, 9); if (i === 0) { c.fillRect(cx - 18, cy - 20, 3, 13); c.beginPath(); c.arc(cx - 16, cy - 22, 3, 0, TAU); c.fill(); } }
      dune(y0 + 260, 24, 2.2, P.out2);
      // oasis pool + palms
      c.fillStyle = P.pool; ellipse(c, x0 + w * 0.42, y1 - 60, w * 0.3, 12); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(x0 + w * 0.3 + Math.sin(t) * 6, y1 - 62, 30, 2);
      for (const [px, hh] of [[x0 + 30, 150], [x0 + w * 0.72, 120]]) { c.strokeStyle = L('#7a5434'); c.lineWidth = 6; c.beginPath(); c.moveTo(px, y1 - 50); c.quadraticCurveTo(px + 10, y1 - 50 - hh * 0.6, px + 4, y1 - 50 - hh); c.stroke(); c.fillStyle = P.palm; for (let i = 0; i < 6; i++) { c.save(); c.translate(px + 4, y1 - 50 - hh); c.rotate(-3 + i * 0.6 + Math.sin(t * 0.7 + i) * 0.04); ellipse(c, 24, 0, 26, 5); c.fill(); c.restore(); } }
      dune(y1 - 30, 8, 4, P.out3);
    },
    floor(c, X) { const P = X.K.P; c.fillStyle = X.L('#d8c0a0'); c.fillRect(-60, 640, 1400, 120); c.fillStyle = P.floor2; c.fillRect(1030, 668, 240, 50); c.fillStyle = P.floor; c.fillRect(1040, 674, 220, 38); for (let i = 0; i < 5; i++) { c.fillStyle = P.floor2; K0(c, [1060 + i * 44, 693, 1072 + i * 44, 682, 1084 + i * 44, 693, 1072 + i * 44, 704]); c.fill(); } },
    counter(c, t, X) { const P = X.K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      c.fillStyle = P.cnt2; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // brass samovar + tea glasses + sweets tray
      { const sx = ST.x - 34; c.fillStyle = P.brass; c.fillRect(sx - 14, top - 20, 28, 14); c.beginPath(); c.ellipse(sx, top - 40, 16, 22, 0, 0, TAU); c.fill(); c.fillRect(sx - 4, top - 68, 8, 8); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(sx - 9, top - 54, 4, 24); if (Math.random() < 0.015) X.K.fx('puff', sx, top - 70, { life: 1.2, col: '#ffffff' }); }
      if (pour > 0) { c.strokeStyle = L('#c08a2a'); c.lineWidth = 2; c.beginPath(); c.moveTo(ST.x + 16, top - 92); c.quadraticCurveTo(ST.x + 20, top - 60, ST.x + 14, top - 18); c.stroke(); }
      for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(240,235,220,0.7)'; c.fillRect(140 + i * 10, top - 16, 7, 11); c.fillStyle = L('#c08a2a'); c.fillRect(140 + i * 10, top - 12, 7, 7); }
      c.fillStyle = P.brass; ellipse(c, 210, top - 6, 22, 4); c.fill(); c.fillStyle = L('#d8a040'); for (let i = 0; i < 5; i++) { K0(c, [196 + i * 7, top - 8, 199 + i * 7, top - 14, 202 + i * 7, top - 8]); c.fill(); }
      // carved cedar counter with a tile band
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); for (let i = 0; i < 9; i++) { c.fillStyle = i % 2 ? L('#2a7a8a') : L('#f2e2c8'); K0(c, [x0 + 8 + i * 26, top + 40, x0 + 21 + i * 26, top + 27, x0 + 34 + i * 26, top + 40, x0 + 21 + i * 26, top + 53]); c.fill(); }
      c.fillStyle = P.cnt2; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(x0 + 20 + i * 60, base - 10); c.lineTo(x0 + 20 + i * 60, top + 80); c.arc(x0 + 40 + i * 60, top + 80, 20, Math.PI, TAU); c.lineTo(x0 + 60 + i * 60, base - 10); c.closePath(); c.fill(); }
    },
    events: [{ name: 'caravan', dur: 12, start(X, srv) { X.K.say(srv, 'The caravan!', 1.6); cv = 0.15; for (const c of X.K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: X.K.simT + 3 }; if (c.def.camera) X.K.say(c, 'icon:cam', 1); } } }],
  };
  registerStage('oasis', makeGeoCafe(W));
})();
