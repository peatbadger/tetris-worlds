/* ================= Remake of AURORA FOREST · Aurora Lodge — GEOMETRIC edition =================
   A pine lodge café in the snow. Sigrid pours coffee and takes orders; Olle bakes — the oven door opens with a warm glow
   and a tray of cinnamon buns comes out — and plates fika over the counter. Guests warm up at the ledge by the big window:
   snowy pines, a red cabin, and after dark the northern lights ripple green and violet. Signature: an aurora burst — the
   sky blazes, everyone turns to the window and the photographer finally gets the shot. Clock 14:00 -> dusk -> aurora -> close.
   Blocks: blueberries · rye · lingonberries · cinnamon bun · gravlax · cloudberries · skyr. */
(() => {
  const LodgePal = GeoCafePal({
    day: { wall: '#e8d4b4', wall2: '#dcc4a0', trim: '#b83a32', wood: '#a8784a', woodDk: '#6a4628', floor: '#9a6a42', floor2: '#86583a', cnt: '#b88858', cnt2: '#966a40', steel: '#c0c4c8', glass: '#e4f0f8',
      sky0: '#9ac4e8', sky1: '#e8f0f8', out1: '#f4f6fa', out2: '#dce4ee', out3: '#2e5a4a', aur: '#5adca8', aur2: '#b08aff', aurA: 0, lamp: '#fff0d0', glow: '#ffe0a8', glowA: 0.08, shaft: '#f4f8ff', shaftA: 0.16, amb: '#ffffff', ambK: 0, sun: '#fff4e0', cloud: '#ffffff' },
    dusk: { wall: '#d8b894', wall2: '#c8a47e', trim: '#a8322c', wood: '#946640', woodDk: '#5a3a20', floor: '#86583a', floor2: '#704830', cnt: '#a47648', cnt2: '#845a36', steel: '#b0aab0', glass: '#d8d0e0',
      sky0: '#3a3a78', sky1: '#e88a7a', out1: '#d8d0e4', out2: '#b8b0cc', out3: '#243a40', aur: '#5adca8', aur2: '#b08aff', aurA: 0.15, lamp: '#ffd080', glow: '#ffb860', glowA: 0.32, shaft: '#ffc8a0', shaftA: 0.1, amb: '#ffd8c0', ambK: 0.06, sun: '#ffa070', cloud: '#c8a0b8' },
    night: { wall: '#5a4436', wall2: '#4e3a2e', trim: '#7a2622', wood: '#5a3e28', woodDk: '#38241a', floor: '#4a3222', floor2: '#3e2a1c', cnt: '#644630', cnt2: '#4c3422', steel: '#7a7880', glass: '#8aa0b8',
      sky0: '#040c22', sky1: '#122a44', out1: '#7a8aa8', out2: '#5a6a88', out3: '#0e1a22', aur: '#5af0b0', aur2: '#b88aff', aurA: 1, lamp: '#ffc870', glow: '#ffa850', glowA: 0.5, shaft: '#ffc080', shaftA: 0, amb: '#2e3a5a', ambK: 0.14, sun: '#f4ecd8', cloud: '#2a3450' },
    snow: { sky0: '#b4c0d0', sky1: '#e8ecf2' },
  }, [[6, 'night'], [9, 'day'], [15, 'day'], [16.5, 'dusk'], [18, 'night'], [30, 'night'], [33, 'day']],
  (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 15.8 ? 'Afternoon fika' : h >= 15.8 && h < 18 ? 'Blue hour' : h >= 18 && h < 23.5 ? 'Aurora night' : 'Closing'; });
  const MENU = [{ n: 'Kanelbulle', c: '#c88a48', bun: 1 }, { n: 'Coffee', c: '#3a2416', cup: 1 }, { n: 'Blueberry soup', c: '#2a2a6a', cup: 1 }, { n: 'Cloudberry cream', c: '#f0b050', bowl: 1 }, { n: 'Gravlax rye', c: '#f08a6a', bun: 1 }, { n: 'Hot lingon', c: '#c8202e', cup: 1 }];
  let oven = 0, burst = 0; const K0 = (c, pts) => GeoKit.poly(c, pts);
  const W = {
    id: 'lodge', pal: LodgePal, startHour: 14, span: 11, font: '700 15px Georgia, serif', vign: 'rgba(10,16,30,0.32)', zone: 'rgba(250,244,236,0.26)',
    per: (h) => { const x = h < 6 ? h + 24 : h; return x < 15.8 ? 0 : x < 18 ? 1 : x < 22 ? 2 : x < 24.4 ? 3 : 4; },
    staff: [{ T: 232, hw: 58, headR: 28, pattern: 'knit', top: 'coral', top2: 'cream', hairStyle: 'long', hair: 'mustard', pants: 'navy' },
      { T: 246, hw: 64, headR: 29, pattern: 'apron', top: 'navy', top2: 'cream', shirt: 'cream', hairStyle: 'short', hat: 'beanie', hatCol: 'coral', pants: 'brown' }],
    menu: MENU, greet: ['Hej hej!', 'Välkommen! Cold out?', 'Hej! Fika?'], ack: ['Ja!', 'Fresh from the oven', 'Coming'], handOff: ['Varsågod!', 'Still warm', 'Enjoy'],
    thanks: ['Tack!', 'Tack så mycket', 'icon:heart'], done: ['Mmm, tack', 'Perfect', 'icon:heart'], cheer: ['Bra!', 'Oj oj!', 'Snyggt!'],
    types: {
      skier: { body: { pattern: 'jacket', top: 'teal', shirt: 'white', hat: 'beanie', hatCol: 'mustard', pants: 'dark' }, words: ['Fresh powder', 'Frozen fingers'] },
      hiker: { body: { pattern: 'coat', top: 'olive', top2: 'mustard', hat: 'beanie', hatCol: 'coral', backpack: 1, packCol: 'coral', pants: 'brown' }, words: ['−20 out there', 'Worth it'] },
      photog: { body: { pattern: 'coat', top: 'navy', top2: 'grey', hat: 'beanie', hatCol: 'grey', camera: 1, pants: 'dark' }, words: ['Kp index is up', 'icon:cam'] },
      elder: { body: { T: 226, hw: 62, torso: 'round', pattern: 'cardigan', top: 'plum', top2: 'cream', hair: 'hairGrey', hairStyle: 'bun', glasses: 1 }, words: ['Like in 1979', 'icon:heart'] },
      kid: { body: { T: 158, hw: 52, headR: 30, pattern: 'coat', top: 'coral', top2: 'white', hat: 'beanie', hatCol: 'teal', pants: 'navy' }, words: ['Snowman!', 'icon:heart'], small: 1 },
      a: { body: { T: 234, hw: 56, pattern: 'knit', top: 'cream', top2: 'teal', hairStyle: 'long', hat: 'beanie', hatCol: 'cream' }, words: ['So cosy', 'icon:heart'] },
      b: { body: { pattern: 'knit', top: 'navy', top2: 'white', hairStyle: 'short' }, words: ['Look up!', 'icon:heart'] },
    },
    parties: [{ m: ['skier'], w: [3, 2, 1, 0, 0] }, { m: ['hiker'], w: [2, 2, 1, 1, 0] }, { m: ['photog'], w: [0, 1, 3, 3, 0] }, { m: ['elder', 'kid'], w: [3, 2, 1, 0, 0] }, { m: ['a', 'b'], w: [1, 2, 3, 3, 0] }],
    sim(X, dt) { oven = Math.max(0, oven - dt * 0.5); burst = Math.max(0, burst - dt * 0.08); },
    make(a, m, X, H, it) { const K = X.K, ST = X.ST, CNT = X.CNT;
      if (m.cup) return [K.ph(0.6, (s) => { s.hold.N = H.tool('pot'); s.tgN = [ST.x - 30, CNT.top - 40]; }), K.ph(1.4, (s, u) => { s.tgN = [ST.x + 4, CNT.top - 46]; s.tgF = [ST.x + 14, CNT.top - 22]; it.o.frac = u; s.look = { x: () => ST.x + 14, until: K.simT + 0.3 }; if (Math.random() < 0.04) K.fx('puff', ST.x + 14, CNT.top - 40, { life: 1, col: '#ffffff' }); }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })];
      return [K.ph(0.8, (s) => { oven = 1; s.tgN = [ST.x - 40, CNT.top + 20]; s.leanT = 0.3; }), K.ph(0.9, (s) => { oven = 1; s.hold.N = H.tool('tray'); s.tgN = [ST.x - 10, CNT.top - 30]; s.tgF = [ST.x, CNT.top - 30]; s.leanT = 0.1; }, { enter: () => K.fx('puff', ST.x - 30, CNT.top, { life: 1.2, col: '#ffffff' }) }),
        K.ph(0.8, (s, u) => { s.tgN = [ST.x + 10, CNT.top - 24]; it.o.frac = u; }, { exit: (s) => { s.hold.N = null; it.o.frac = 1; } })]; },
    mkIdle(a, X, H) { const K = X.K, ST = X.ST, CNT = X.CNT; return K.start(a, 'knead', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(2.5, 3.5), (s, u, t) => { s.f = -1; s.tgN = [ST.x - 4 + Math.sin(t * 6) * 8, CNT.top - 14 - Math.abs(Math.sin(t * 6)) * 6]; s.tgF = [ST.x + 10 + Math.sin(t * 6 + 1) * 8, CNT.top - 14]; s.leanT = 0.25; })]); },
    srvIdle(a, X, H) { const K = X.K; return K.start(a, 'sip', [K.ph(rand(1.8, 2.6), (s, u) => { s.hold.N = H.item(MENU[1], { frac: 0.6 }); s.tgN = u < 0.4 ? [s.R.cx + s.f * s.R.R * 0.6, s.R.cy + s.R.R * 1.1] : [s.hx + 24, s.hy - 60]; s.look = { x: () => 1140, until: K.simT + 0.3 }; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } }); },
    drawTool(c, x, y, s, a, k, X) { const L = X.L;
      if (k === 'pot') { c.fillStyle = L('#c8ccd0'); K0(c, [x - 5 * s, y - 14 * s, x + 5 * s, y - 14 * s, x + 7 * s, y, x - 7 * s, y]); c.fill(); c.fillStyle = L('#2a2a2e'); c.fillRect(x - 6 * s, y - 16 * s, 12 * s, 3 * s); }
      else if (k === 'tray') { c.fillStyle = L('#4a4a50'); c.fillRect(x - 16 * s, y, 32 * s, 3 * s); c.fillStyle = L('#c88a48'); for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(x - 11 * s + i * 7.4 * s, y - 2 * s, 3.4 * s, Math.PI, TAU); c.fill(); } }
    },
    drawItem(c, x, y, s, m, frac, X) { const L = X.L; c.save(); c.translate(x, y); c.scale(s, s);
      if (m.bun) { c.fillStyle = L('#e8e0d4'); ellipse(c, 0, -2, 10, 2.6); c.fill(); if (frac > 0.04) { const r = 3 + 4 * Math.sqrt(frac); c.fillStyle = L(m.c); ellipse(c, 0, -4 - r * 0.4, r, r * 0.7); c.fill(); c.strokeStyle = L(m.n === 'Gravlax rye' ? '#5a8a3a' : '#7a4a20'); c.lineWidth = 0.9; c.beginPath(); c.arc(0, -4 - r * 0.4, r * 0.45, 0, Math.PI * 1.6); c.stroke(); c.fillStyle = '#fff'; for (let i = 0; i < 3; i++) c.fillRect(-2 + i * 2, -5 - r * 0.7, 0.8, 0.8); } }
      else if (m.bowl) { c.fillStyle = L('#f4f0e8'); c.beginPath(); c.moveTo(-8, -6); c.lineTo(8, -6); c.quadraticCurveTo(7, 1, 0, 1); c.quadraticCurveTo(-7, 1, -8, -6); c.fill(); if (frac > 0.05) { c.fillStyle = L(m.c); ellipse(c, 0, -6.5, 7 * Math.sqrt(frac), 2.2); c.fill(); } }
      else { c.fillStyle = L('#f4f0e8'); K0(c, [-5, -12, 5, -12, 4, 0, -4, 0]); c.fill(); c.strokeStyle = L('#f4f0e8'); c.lineWidth = 1.4; c.beginPath(); c.arc(5.5, -6, 2.6, -1.4, 1.4); c.stroke(); if (frac > 0.04) { c.fillStyle = L(m.c); c.fillRect(-4.2, -11 + (1 - frac) * 9, 8.4, 1.6); } c.fillStyle = L('#b83a32'); c.fillRect(-4.6, -7, 9.2, 1.4); }
      c.restore(); },
    room(c, t, X) { const P = X.K.P, L = X.L;
      for (let i = 0; i < 40; i++) { c.fillStyle = i % 2 ? P.wall : P.wall2; c.fillRect(-60 + i * 36, 40, 36, 620); c.fillStyle = 'rgba(80,40,10,0.18)'; c.fillRect(-60 + i * 36, 40, 2, 620); }
      c.fillStyle = P.woodDk; c.fillRect(-60, 0, 1400, 44); for (let x = -40; x < 1340; x += 120) { c.fillStyle = P.wood; c.fillRect(x, 0, 18, 44); }
      c.fillStyle = P.wall2; c.fillRect(470, 120, 340, 180);
      // left strip: FIKA board + mug shelf + a woven Sámi-style band
      c.fillStyle = P.woodDk; roundRect(c, 50, 64, 196, 76, 8); c.fill(); c.fillStyle = L('#2a3430'); roundRect(c, 56, 70, 184, 64, 6); c.fill(); c.fillStyle = L('#f4ecd8'); c.font = '700 26px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('FIKA', 148, 94); c.font = '600 11px Georgia, serif'; c.fillText('kanelbulle · kaffe · bär', 148, 120);
      for (let i = 0; i < 20; i++) { c.fillStyle = L(['#b83a32', '#2e5aa8', '#e8b03a', '#3a8a5a'][i % 4]); c.fillRect(30 + i * 20, 150, 20, 8); }
      c.fillStyle = P.wood; c.fillRect(28, 236, 400, 8); c.fillRect(28, 186, 400, 6);
      for (let i = 0; i < 7; i++) { const mx = 50 + i * 54; c.fillStyle = L(['#b83a32', '#f4f0e8', '#2e5aa8', '#e8b03a', '#f4f0e8', '#3a8a5a', '#b83a32'][i]); c.fillRect(mx - 9, 214, 18, 22); c.strokeStyle = c.fillStyle; c.lineWidth = 3; c.beginPath(); c.arc(mx + 10, 225, 5, -1.3, 1.3); c.stroke(); }
      for (let i = 0; i < 4; i++) { const jx = 70 + i * 90; c.fillStyle = 'rgba(230,240,250,0.35)'; c.fillRect(jx - 12, 160, 24, 26); c.fillStyle = L(['#2a2a6a', '#c8202e', '#f0b050', '#c88a48'][i]); c.fillRect(jx - 10, 168, 20, 16); }
    },
    lamps: [262, 1018],
    frame(c, X, under) { const P = X.K.P, { x0, y0, x1, y1 } = X.WIN; if (under) { c.fillStyle = P.woodDk; c.fillRect(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 24); return; } c.strokeStyle = P.woodDk; c.lineWidth = 7; c.beginPath(); c.moveTo((x0 + x1) / 2, y0); c.lineTo((x0 + x1) / 2, y1); c.moveTo(x0, y0 + 150); c.lineTo(x1, y0 + 150); c.stroke(); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(x0, y1 - 8, x1 - x0, 8); },
    view(c, x0, y0, x1, y1, t, X) { const K = X.K, P = K.P, L = X.L, w = x1 - x0;
      K.sky(c, x0, y0, x1, y1, { sunR: 14 });
      const aA = Math.min(1, P.aurA + burst); if (aA > 0.02) { for (let k = 0; k < 3; k++) { c.fillStyle = rgba(k === 1 ? P.aur2 : P.aur, (0.22 + burst * 0.2) * aA); c.beginPath(); for (let i = 0; i <= 24; i++) { const xx = x0 + w * i / 24, yy = y0 + 50 + k * 26 + Math.sin(i * 0.5 + t * 0.4 + k) * 14 + Math.sin(i * 1.3 - t * 0.3) * 6; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } for (let i = 24; i >= 0; i--) { const xx = x0 + w * i / 24, yy = y0 + 50 + k * 26 + Math.sin(i * 0.5 + t * 0.4 + k) * 14 + Math.sin(i * 1.3 - t * 0.3) * 6 + 40 + Math.sin(i * 0.9 + t + k) * 14; c.lineTo(xx, yy); } c.closePath(); c.fill(); } }
      // snowy hills, red cabin, pines
      c.fillStyle = P.out2; c.beginPath(); c.moveTo(x0, y1); c.lineTo(x0, y0 + 230); c.quadraticCurveTo(x0 + w * 0.4, y0 + 180, x1, y0 + 240); c.lineTo(x1, y1); c.closePath(); c.fill();
      { const cx = x0 + w * 0.62, cy = y0 + 236; c.fillStyle = L('#a8302a'); c.fillRect(cx - 22, cy - 18, 44, 22); c.fillStyle = P.out1; K0(c, [cx - 28, cy - 18, cx, cy - 36, cx + 28, cy - 18]); c.fill(); c.fillStyle = rgba('#ffd890', 0.4 + P.night * 0.6); c.fillRect(cx - 12, cy - 12, 8, 8); c.fillRect(cx + 4, cy - 12, 8, 8); if (P.night > 0.3) K.glow(c, cx, cy - 8, 40, '#ffc870', 0.3 * P.night); }
      c.fillStyle = P.out1; c.beginPath(); c.moveTo(x0, y1); c.lineTo(x0, y0 + 280); c.quadraticCurveTo(x0 + w * 0.5, y0 + 250, x1, y0 + 290); c.lineTo(x1, y1); c.closePath(); c.fill();
      for (const [px, hh] of [[x0 + 24, 120], [x0 + 64, 90], [x0 + w - 40, 130], [x0 + w - 86, 84], [x0 + w * 0.42, 70]]) { const by = y0 + 300; for (let k = 0; k < 3; k++) { c.fillStyle = P.out3; K0(c, [px - 22 + k * 5, by - k * hh * 0.28, px, by - hh - k * 4, px + 22 - k * 5, by - k * hh * 0.28]); c.fill(); c.fillStyle = 'rgba(255,255,255,0.7)'; K0(c, [px - 8 + k * 2, by - hh * 0.62 - k * hh * 0.2, px, by - hh - k * 4, px + 8 - k * 2, by - hh * 0.62 - k * hh * 0.2]); c.fill(); } }
      c.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 18; i++) { const fx = x0 + ((i * 53 + t * 8) % w), fy = y0 + ((i * 37 + t * 18) % (y1 - y0)); c.fillRect(fx, fy, 2, 2); }
    },
    noWeather: false,
    floor(c, X) { const P = X.K.P; for (let i = 0; i < 36; i++) { c.fillStyle = P.floor2; c.fillRect(-60 + i * 42, 640, 3, 120); } c.fillStyle = X.L('#b83a32'); c.fillRect(1040, 676, 220, 30); c.fillStyle = X.L('#f4ecd8'); for (let i = 0; i < 10; i++) c.fillRect(1048 + i * 21, 688, 12, 6); },
    counter(c, t, X) { const P = X.K.P, L = X.L, { x0, x1, top, base } = X.CNT, ST = X.ST;
      c.fillStyle = P.cnt2; c.fillRect(x0 - 8, top - 6, x1 - x0 + 16, 8);
      // coffee pot + bun cloche + till on the counter
      c.fillStyle = L('#3a3a40'); c.fillRect(ST.x + 6, top - 30, 18, 24); c.fillStyle = L('#c8ccd0'); K0(c, [ST.x + 9, top - 30, ST.x + 21, top - 30, ST.x + 24, top - 46, ST.x + 6, top - 46]); c.fill();
      c.fillStyle = L('#e8e0d4'); ellipse(c, 166, top - 6, 24, 4); c.fill(); c.fillStyle = L('#c88a48'); for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(152 + i * 9, top - 9, 5, Math.PI, TAU); c.fill(); } c.fillStyle = 'rgba(230,240,250,0.35)'; c.beginPath(); c.arc(166, top - 8, 24, Math.PI, TAU); c.fill();
      c.fillStyle = L('#e8e0d0'); c.fillRect(210, top - 22, 26, 16); c.fillStyle = L('#2a2a30'); c.fillRect(213, top - 19, 20, 8);
      // panelled counter with the oven built in on the maker's side
      c.fillStyle = P.cnt; c.fillRect(x0 - 6, top + 2, x1 - x0 + 12, base - top); for (let i = 0; i < 4; i++) { c.strokeStyle = P.cnt2; c.lineWidth = 3; c.strokeRect(x0 + 92 + i * 38, top + 26, 30, 90); }
      { const ox = x0 + 8, oy = top + 20; c.fillStyle = L('#2a2a2e'); c.fillRect(ox, oy, 74, 70); c.fillStyle = rgba('#ff9a40', 0.25 + oven * 0.6); c.fillRect(ox + 8, oy + 10, 58, 40); if (oven > 0.1) X.K.glow(c, ox + 37, oy + 30, 80, '#ff9a40', 0.35 * oven); c.fillStyle = L('#c8ccd0'); c.fillRect(ox + 8, oy + 56, 58, 4); }
    },
    events: [{ name: 'aurora-burst', dur: 16, start(X, srv) { if (X.K.P.night < 0.5) { X.K.say(srv, 'Fika time!', 1.2); return; } burst = 1; X.K.say(srv, 'Norrsken! Look!', 1.8); for (const c of X.K.actors.filter((q) => q.cust)) { c.look = { x: () => 1140, until: X.K.simT + 5 }; X.K.say(c, c.def.camera ? 'icon:cam' : pick(['Wow…', 'icon:star', 'icon:heart']), 1.4); } } }],
  };
  registerStage('lodge', makeGeoCafe(W));
})();
