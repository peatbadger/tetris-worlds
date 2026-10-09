/* ---- Tea House blocks: seven things from a Kyoto tea room, each piece one continuous mass ----
   I hanami dango (pink · white · green mochi balls threaded on a bamboo skewer, a dusting of rice flour)
   · O yōkan (a slab of deep red-bean jelly, translucent ruby depth, whole chestnuts suspended inside, a long wet highlight)
   · T matcha (the whisked surface of a bowl of koicha/usucha: fine micro-foam, the whisk's M-strokes, darker rim)
   · S dorayaki (glossy pancake rounds, mahogany centre fading to a golden rim) · Z nerikiri (wisteria-violet bellflower
   wagashi, carved petals, a dot of yellow kinton) · J warabi mochi (wobbly translucent pieces buried in toasted kinako,
   a thread of kuromitsu) · L daifuku (soft white mochi domes dusted in starch, a whole strawberry blushing pink through the thin mochi) */
const TeaFood = remakeFood('teahouse', {
  premiumOpts: { R: 0.2, grain: { daifuku: 0.05, kinako: 0.12, matcha: 0.1, yokan: 0.05 }, lift: { yokan: 'brightness(1.12) contrast(1.08)', matcha: 'brightness(0.86) contrast(1.06)', dorayaki: 'brightness(0.86) contrast(1.08)', nerikiri: 'brightness(0.97) contrast(1.06) saturate(1.08)', kinako: 'brightness(1.05) contrast(1.04)', dango: 'brightness(1.02)' } },
  FOOD: [null, 'dango', 'yokan', 'matcha', 'dorayaki', 'nerikiri', 'kinako', 'daifuku'],
  MAIN: [null, '#e8b4bc', '#5a1c20', '#5e7e2e', '#c08040', '#9a7cb8', '#d0a868', '#f2eee6'],
  soft: { dango: 1.3, yokan: 0.8, matcha: 1.2, dorayaki: 1.3, nerikiri: 1.4, kinako: 1.4, daifuku: 1.5 },
  boardBg: 'rgba(18,17,16,0.94)', grid: 'rgba(255,236,200,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 307), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'dango': { M.fill('#6a4a30'); M.piece(() => { // skewers of three-colour dango along the piece
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * P, n = Math.max(1, Math.round(len / (P * 0.92))), step = len / n;
            x.strokeStyle = '#c8a46a'; x.lineWidth = lw(0.05); x.beginPath(); x.moveTo(-P, cy); x.lineTo(len + P, cy); x.stroke(); // bamboo skewer
            for (let k = 0; k < n; k++) { const cx = (k + 0.5) * step, R = Math.min(step, P) * 0.47, tone = (k + r) % 3;
              const st = [[[0, '#fff2f2'], [0.55, '#f2bcc4'], [1, '#c8848e']], [[0, '#ffffff'], [0.55, '#f6f1e6'], [1, '#cfc6b2']], [[0, '#eef6d4'], [0.55, '#b8cc84'], [1, '#7e9650']]][tone];
              x.fillStyle = 'rgba(40,20,10,0.4)'; x.beginPath(); x.arc(cx + P * 0.025, cy + P * 0.04, R, 0, TAU); x.fill();
              x.fillStyle = M.rad(cx - R * 0.35, cy - R * 0.4, R * 1.5, st); x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill();
              if (!small) { for (let g = 0; g < 9; g++) { const a = H(k * 9 + g + r * 50, 3) * TAU, d = R * Math.sqrt(H(k * 9 + g + r * 50, 4)) * 0.85; x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, P * 0.012, 0, TAU); x.fill(); } }
              x.fillStyle = 'rgba(255,255,255,0.6)'; ellipse(x, cx - R * 0.34, cy - R * 0.42, R * 0.26, R * 0.1, -0.5); x.fill(); } } }); });
        M.form('rgba(255,250,245,0.2)', 'rgba(60,30,20,0.32)'); break; }
      case 'yokan': { M.fill('#3a0e12'); M.piece(() => { // one translucent slab: depth gradient, chestnuts suspended, long wet highlight
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, '#7a2a2c'], [0.45, '#561a1e'], [1, '#2e0a0e']]); M.all(x.fillStyle);
        x.fillStyle = M.rad(X0 + BW * 0.35, Y0 + BH * 0.3, Math.max(BW, BH) * 0.7, [[0, 'rgba(170,60,60,0.35)'], [1, 'rgba(0,0,0,0)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(Math.max(1, Math.round(A * 0.75)), 5, 0.22)) { const R = P * (0.2 + H(i, 7) * 0.06), rot = H(i, 8) * TAU; x.save(); x.translate(u, v); x.rotate(rot);
          x.fillStyle = 'rgba(120,70,20,0.55)'; ellipse(x, 0, 0, R * 1.12, R * 0.86, 0); x.fill(); x.fillStyle = M.rad(-R * 0.3, -R * 0.3, R * 1.3, [[0, '#f0cc70'], [0.7, '#cc9a3c'], [1, '#9a6a24']]); ellipse(x, 0, 0, R, R * 0.76, 0); x.fill();
          x.strokeStyle = 'rgba(150,100,30,0.6)'; x.lineWidth = lw(0.015); x.beginPath(); x.ellipse(0, 0, R * 0.5, R * 0.36, 0, 0, Math.PI); x.stroke(); x.restore();
          x.fillStyle = 'rgba(80,14,20,0.45)'; ellipse(x, u, v, R * 1.2, R * 0.95, rot); x.fill(); } // seen through the jelly
        if (!small) for (const [u, v, i] of M.pts(A * 10, 11, 0.04)) { x.fillStyle = 'rgba(30,0,4,0.35)'; ellipse(x, u, v, P * 0.03, P * 0.018, H(i, 12) * 3); x.fill(); } // whole azuki ghosts
        x.strokeStyle = 'rgba(255,220,220,0.32)'; x.lineWidth = lw(0.05); x.lineCap = 'round'; x.beginPath(); x.moveTo(X0 + P * 0.25, Y0 + P * 0.2); x.lineTo(X0 + Math.min(BW, P * 2.4), Y0 + P * 0.2); x.stroke();
        x.strokeStyle = 'rgba(255,240,240,0.55)'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(X0 + P * 0.3, Y0 + P * 0.17); x.lineTo(X0 + P * 0.9, Y0 + P * 0.17); x.stroke(); });
        M.form('rgba(255,190,190,0.2)', 'rgba(20,0,0,0.45)'); break; }
      case 'matcha': { M.fill('#4e6e22'); M.piece(() => { // the whisked surface: micro-foam, whisk strokes, darker edge
        x.fillStyle = M.rad(X0 + BW * 0.45, Y0 + BH * 0.4, Math.max(BW, BH) * 0.75, [[0, '#8eac4e'], [0.6, '#6e8e34'], [1, '#48661e']]); M.all(x.fillStyle);
        if (!small) for (const [u, v, i] of M.pts(A * 70, 21, 0.01)) { const r0 = P * (0.012 + H(i, 22) * 0.02); x.fillStyle = H(i, 23) < 0.5 ? 'rgba(210,230,150,0.42)' : 'rgba(60,90,20,0.35)'; x.beginPath(); x.arc(u, v, r0, 0, TAU); x.fill(); }
        for (const [u, v, i] of M.pts(A * 3, 24, 0.1)) { x.fillStyle = 'rgba(190,214,120,0.22)'; M.blob(u, v, P * (0.22 + H(i, 25) * 0.12), i * 3 + 7, 9, 0.5); x.fill(); } // paler whisked-foam drifts
        if (!small) for (const [u, v, i] of M.pts(A * 30, 26, 0.02)) { x.fillStyle = 'rgba(230,244,190,0.5)'; x.beginPath(); x.arc(u, v, P * 0.008, 0, TAU); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 3, 27, 0.15)) { x.fillStyle = 'rgba(240,250,210,0.55)'; x.beginPath(); x.arc(u, v, P * 0.035, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(u - P * 0.01, v - P * 0.012, P * 0.012, 0, TAU); x.fill(); } }); // a few larger bubbles
        M.form('rgba(220,240,170,0.18)', 'rgba(20,36,0,0.42)'); break; }
      case 'dorayaki': { M.fill('#3e1a0e'); M.piece(() => { // glossy pancake rounds: mahogany centre to golden rim, anko peeking between
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P + (H(a * 5 + c, 1) - 0.5) * P * 0.05, cy = (c + 0.5) * P + (H(a * 5 + c, 2) - 0.5) * P * 0.05, R = P * 0.5;
          x.fillStyle = 'rgba(20,6,0,0.45)'; x.beginPath(); x.arc(cx + P * 0.02, cy + P * 0.035, R, 0, TAU); x.fill();
          x.fillStyle = '#e6b468'; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(cx, cy, R * 0.92, [[0, '#5a2a10'], [0.45, '#84441a'], [0.78, '#c08038'], [1, 'rgba(230,180,104,0)']]); x.beginPath(); x.arc(cx, cy, R * 0.92, 0, TAU); x.fill();
          if (!small) for (let k = 0; k < 10; k++) { const an = H(a * 10 + k + c * 3, 4) * TAU, d = R * (0.2 + H(a + k, 5) * 0.5); x.fillStyle = 'rgba(70,30,8,0.35)'; x.beginPath(); x.arc(cx + Math.cos(an) * d, cy + Math.sin(an) * d, P * 0.014, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,230,190,0.42)'; ellipse(x, cx - R * 0.3, cy - R * 0.38, R * 0.32, R * 0.1, -0.5); x.fill(); } });
        M.form('rgba(255,220,160,0.2)', 'rgba(40,14,0,0.4)'); break; }
      case 'nerikiri': { M.fill('#6a4c84'); M.piece(() => { // bellflower wagashi: five carved petals, pale heart, yellow kinton
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, R = P * 0.47, r0 = H(a * 7 + c, 3) * TAU;
          const flower = (dx, dy) => { x.beginPath(); for (let q = 0; q <= 60; q++) { const an = r0 + q / 60 * TAU, rr = R * (0.82 + 0.18 * Math.abs(Math.cos(an * 2.5 - r0 * 2.5))); q ? x.lineTo(cx + dx + Math.cos(an) * rr, cy + dy + Math.sin(an) * rr) : x.moveTo(cx + dx + Math.cos(an) * rr, cy + dy + Math.sin(an) * rr); } x.closePath(); };
          x.fillStyle = 'rgba(30,10,40,0.4)'; flower(P * 0.02, P * 0.035); x.fill();
          x.fillStyle = M.rad(cx - R * 0.2, cy - R * 0.25, R * 1.1, [[0, '#f4ecf6'], [0.35, '#c8b0dc'], [1, '#8a68a8']]); flower(0, 0); x.fill();
          x.strokeStyle = 'rgba(90,60,120,0.55)'; x.lineWidth = lw(0.02); for (let q = 0; q < 5; q++) { const an = r0 + (q + 0.2) / 5 * TAU; x.beginPath(); x.moveTo(cx + Math.cos(an) * R * 0.2, cy + Math.sin(an) * R * 0.2); x.lineTo(cx + Math.cos(an) * R * 0.78, cy + Math.sin(an) * R * 0.78); x.stroke(); }
          x.fillStyle = '#e8c850'; for (let q = 0; q < (small ? 1 : 6); q++) { const an = q / 6 * TAU; x.beginPath(); x.arc(cx + Math.cos(an) * R * 0.08, cy + Math.sin(an) * R * 0.08, P * 0.03, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,255,255,0.45)'; ellipse(x, cx - R * 0.35, cy - R * 0.45, R * 0.2, R * 0.07, -0.5); x.fill(); } });
        M.form('rgba(250,235,255,0.2)', 'rgba(40,16,60,0.38)'); break; }
      case 'kinako': { M.fill('#b88a4a'); M.piece(() => { // warabi mochi buried in toasted kinako
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, '#e8c888'], [1, '#b88a4a']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 2, 31, 0.18)) { const s0 = P * (0.42 + H(i, 32) * 0.1), rot = (H(i, 33) - 0.5) * 0.8; x.save(); x.translate(u, v); x.rotate(rot);
          x.fillStyle = 'rgba(90,60,20,0.4)'; roundRect(x, -s0 / 2 + P * 0.02, -s0 / 2 + P * 0.04, s0, s0 * 0.86, s0 * 0.3); x.fill();
          x.fillStyle = M.lin(-s0 / 2, -s0 / 2, s0 / 2, s0 / 2, [[0, '#f2dca4'], [0.5, '#dcb874'], [1, '#b48a48']]); roundRect(x, -s0 / 2, -s0 / 2, s0, s0 * 0.86, s0 * 0.3); x.fill();
          x.fillStyle = 'rgba(200,190,170,0.35)'; roundRect(x, -s0 * 0.2, s0 * 0.12, s0 * 0.5, s0 * 0.22, s0 * 0.1); x.fill(); x.restore(); } // translucent mochi peeking through the dust
        if (!small) for (const [u, v, i] of M.pts(A * 70, 35, 0.01)) { x.fillStyle = H(i, 36) < 0.55 ? 'rgba(250,228,170,0.6)' : 'rgba(150,104,50,0.4)'; x.fillRect(u, v, lw(0.02), lw(0.02)); }
        for (const [u, v, i] of M.pts(A * 2, 39, 0.2)) { x.fillStyle = 'rgba(255,240,200,0.25)'; M.blob(u, v, P * 0.2, i + 40, 8, 0.5); x.fill(); } }); // soft drifts of fresh kinako
        M.form('rgba(255,240,200,0.22)', 'rgba(90,50,10,0.32)'); break; }
      case 'daifuku': { M.fill('#cdc4b4'); M.piece(() => { // soft white mochi domes, starch-dusted; one cut open on a strawberry in anko
        let first = true;
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P + (H(a * 3 + c, 1) - 0.5) * P * 0.06, cy = (c + 0.5) * P + (H(a * 3 + c, 2) - 0.5) * P * 0.05, R = P * 0.47, cut = first && A > 2 && H(a + c, 3) < 2; first = false;
          x.fillStyle = 'rgba(70,56,40,0.35)'; ellipse(x, cx + P * 0.02, cy + P * 0.04, R, R * 0.94, 0); x.fill();
          x.fillStyle = M.rad(cx - R * 0.35, cy - R * 0.4, R * 1.5, [[0, '#ffffff'], [0.55, '#f6f2ea'], [1, '#d8d0c0']]); ellipse(x, cx, cy, R, R * 0.94, 0); x.fill();
          x.fillStyle = M.rad(cx + R * 0.05, cy - R * 0.2, R * 0.72, [[0, 'rgba(234,120,128,0.34)'], [0.5, 'rgba(240,170,172,0.16)'], [1, 'rgba(250,210,210,0)']]); x.beginPath(); x.arc(cx + R * 0.05, cy - R * 0.2, R * 0.72, 0, TAU); x.fill(); // strawberry blushing through
          if (!small) for (let k = 0; k < 16; k++) { const an = H(a * 16 + k + c, 4) * TAU, d = R * Math.sqrt(H(a * 16 + k, 5)) * 0.85; x.fillStyle = 'rgba(255,255,255,0.75)'; x.beginPath(); x.arc(cx + Math.cos(an) * d, cy + Math.sin(an) * d, P * 0.014, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,255,255,0.75)'; ellipse(x, cx - R * 0.34, cy - R * 0.42, R * 0.26, R * 0.09, -0.5); x.fill(); } });
        M.form('rgba(255,255,255,0.22)', 'rgba(80,64,40,0.3)'); break; }
    }
  },
});
