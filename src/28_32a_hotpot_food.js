/* ---- Hotpot blocks: seven things that go into a Taiwanese hot pot, each piece one continuous mass ----
   I fish balls (glossy white spheres, a seam line, a few floating scallion rings) · O duck-blood tofu (dark ruby cubes, satin
   sheen, tiny pores) · T mala broth (red chili oil over a dark broth: oil pools, dried chillies, Sichuan peppercorns)
   · S beef slices (thin rolled slices, marbled pink and cream fat) · Z napa cabbage (pale ribbed leaves, white stems to green
   frills) · J shiitake (brown caps with the star cut showing pale flesh) · L corn (sweet corn segments, plump packed kernels) */
const HotpotFood = remakeFood('hotpot', {
  premiumOpts: { R: 0.2, grain: { duckblood: 0.06, mala: 0.08 }, lift: { duckblood: 'brightness(1.14) contrast(1.08)', shiitake: 'brightness(1.22) contrast(1.06)', mala: 'brightness(0.94) contrast(1.06)', corn: 'brightness(1.12)', napa: 'brightness(0.86) contrast(1.06) saturate(1.1)' } },
  FOOD: [null, 'fishball', 'duckblood', 'mala', 'beef', 'napa', 'shiitake', 'corn'],
  MAIN: [null, '#f0ece2', '#5a1a1e', '#b8301e', '#d88a8a', '#d4e0b0', '#7a4e2e', '#eec448'],
  soft: { fishball: 1.4, duckblood: 0.9, mala: 1.1, beef: 1.2, napa: 1.2, shiitake: 1.2, corn: 1.1 },
  boardBg: 'rgba(22,12,12,0.93)', grid: 'rgba(255,200,170,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 523), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'fishball': { M.fill('#b8b09a'); M.piece(() => { // glossy fish balls, packed, a few scallion rings
        for (const [u, v, i] of M.pts(A, 3, 0.5)) { const R = P * (0.45 + H(i, 4) * 0.03);
          x.fillStyle = 'rgba(40,36,30,0.4)'; x.beginPath(); x.arc(u + P * 0.02, v + P * 0.04, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.35, v - R * 0.4, R * 1.5, [[0, '#ffffff'], [0.5, '#f2eee4'], [1, '#c8c0ae']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          x.strokeStyle = 'rgba(180,170,150,0.4)'; x.lineWidth = lw(0.012); x.beginPath(); x.arc(u, v + R * 0.1, R * 0.82, Math.PI * 0.15, Math.PI * 0.85); x.stroke();
          x.fillStyle = 'rgba(255,255,255,0.85)'; ellipse(x, u - R * 0.34, v - R * 0.4, R * 0.24, R * 0.1, -0.5); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(Math.max(2, A), 7, 0.15)) { x.strokeStyle = '#6aa040'; x.lineWidth = lw(0.03); x.beginPath(); x.ellipse(u, v, P * 0.06, P * 0.045, H(i, 8) * 3, 0, TAU); x.stroke(); x.fillStyle = 'rgba(220,240,190,0.7)'; x.beginPath(); x.ellipse(u, v, P * 0.035, P * 0.024, H(i, 8) * 3, 0, TAU); x.fill(); } });
        M.form('rgba(255,255,255,0.22)', 'rgba(60,50,40,0.32)'); break; }
      case 'duckblood': { M.fill('#1e0608'); M.piece(() => { // dark ruby cubes with a satin sheen
        for (const [a, c] of M.cells) for (let q = 0; q < 4; q++) { const s0 = P * 0.43, cx = (a + 0.26 + (q % 2) * 0.48) * P + (H(a * 5 + c + q, 1) - 0.5) * P * 0.04, cy = (c + 0.26 + (q >> 1) * 0.48) * P + (H(a * 5 + c + q, 2) - 0.5) * P * 0.04;
          x.fillStyle = 'rgba(0,0,0,0.5)'; roundRect(x, cx - s0 / 2 + P * 0.02, cy - s0 / 2 + P * 0.03, s0, s0, s0 * 0.16); x.fill();
          x.fillStyle = M.lin(cx - s0 / 2, cy - s0 / 2, cx + s0 / 2, cy + s0 / 2, [[0, '#8a2a30'], [0.5, '#5e161c'], [1, '#380a0e']]); roundRect(x, cx - s0 / 2, cy - s0 / 2, s0, s0, s0 * 0.16); x.fill();
          if (!small) for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(20,0,4,0.5)'; x.beginPath(); x.arc(cx + (H(q * 10 + k + a, 3) - 0.5) * s0 * 0.8, cy + (H(q * 10 + k + c, 4) - 0.5) * s0 * 0.8, P * 0.01, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,200,200,0.32)'; roundRect(x, cx - s0 * 0.38, cy - s0 * 0.4, s0 * 0.5, s0 * 0.12, s0 * 0.06); x.fill(); } });
        M.form('rgba(255,170,170,0.16)', 'rgba(0,0,0,0.45)'); break; }
      case 'mala': { M.fill('#3a0e08'); M.piece(() => { // red chili oil over dark broth: pools, chillies, peppercorns
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#a8301a'], [1, '#5a140a']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 4, 11, 0.1)) { const rr = P * (0.05 + H(i, 12) * 0.1); x.fillStyle = 'rgba(240,96,40,0.4)'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.strokeStyle = 'rgba(255,170,90,0.6)'; x.lineWidth = lw(0.014); x.beginPath(); x.arc(u, v, rr, Math.PI * 1.1, Math.PI * 1.7); x.stroke(); } // oil rounds
        for (const [u, v, i] of M.pts(Math.max(2, Math.round(A * 1.2)), 13, 0.15)) { const rot = H(i, 14) * TAU, L0 = P * (0.2 + H(i, 15) * 0.08); x.save(); x.translate(u, v); x.rotate(rot); x.fillStyle = M.lin(0, -P * 0.05, 0, P * 0.05, [[0, '#e83a20'], [1, '#8a1408']]); x.beginPath(); x.moveTo(-L0, 0); x.quadraticCurveTo(-L0 * 0.2, -P * 0.07, L0 * 0.6, -P * 0.035); x.lineTo(L0, 0); x.quadraticCurveTo(L0 * 0.6, P * 0.05, -L0 * 0.2, P * 0.06); x.closePath(); x.fill(); x.fillStyle = '#3a5a1a'; x.fillRect(-L0 - P * 0.03, -P * 0.015, P * 0.04, P * 0.03); x.fillStyle = 'rgba(255,210,180,0.5)'; x.fillRect(-L0 * 0.4, -P * 0.035, L0 * 0.7, lw(0.012)); x.restore(); } // dried chillies
        if (!small) for (const [u, v, i] of M.pts(A * 8, 17, 0.06)) { x.fillStyle = '#4a1a10'; x.beginPath(); x.arc(u, v, P * 0.026, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,80,50,0.7)'; x.beginPath(); x.arc(u - P * 0.008, v - P * 0.008, P * 0.01, 0, TAU); x.fill(); } }); // Sichuan peppercorns
        M.form('rgba(255,170,120,0.2)', 'rgba(30,0,0,0.42)'); break; }
      case 'beef': { M.fill('#5a2224'); M.piece(() => { // thin rolled slices, marbled
        for (const [u, v, i] of M.pts(A * 2, 21, 0.24)) { const R = P * 0.34, rot = H(i, 22) * TAU;
          x.save(); x.translate(u, v); x.rotate(rot); x.fillStyle = 'rgba(30,6,6,0.45)'; ellipse(x, P * 0.02, P * 0.04, R * 1.12, R * 0.86, 0); x.fill();
          x.fillStyle = M.rad(-R * 0.3, -R * 0.3, R * 1.4, [[0, '#f0a8a4'], [0.55, '#cc6a6c'], [1, '#8a3236']]); ellipse(x, 0, 0, R * 1.12, R * 0.86, 0); x.fill();
          x.strokeStyle = 'rgba(255,236,226,0.75)'; x.lineWidth = lw(0.022); for (let k = 0; k < 4; k++) { x.beginPath(); x.ellipse(0, 0, R * (0.25 + k * 0.2), R * (0.18 + k * 0.16), 0, H(i * 4 + k, 23) * 2, H(i * 4 + k, 23) * 2 + 2.6 + H(k, i) * 1.5); x.stroke(); } // the roll's spiral + fat marbling
          x.fillStyle = 'rgba(255,240,236,0.55)'; for (let k = 0; k < 4; k++) { ellipse(x, (H(i + k, 24) - 0.5) * R * 1.4, (H(i + k, 25) - 0.5) * R, R * 0.12, R * 0.04, H(k, 26) * 3); x.fill(); }
          x.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(x, -R * 0.4, -R * 0.4, R * 0.26, R * 0.08, -0.4); x.fill(); x.restore(); } });
        M.form('rgba(255,220,220,0.2)', 'rgba(40,6,6,0.4)'); break; }
      case 'napa': { M.fill('#8a9a6a'); M.piece(() => { // pale ribbed leaves: white stem to green frill
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, fl = H(a * 3 + c, 30) < 0.5 ? 1 : -1, w = P * 0.5, h = P * 0.5; // one leaf per cell: thick white rib, pale blade, ruffled green crown
          const leaf = (dx, dy) => { x.beginPath(); x.moveTo(cx - w * 0.3 + dx, cy + h + dy); x.quadraticCurveTo(cx - w * 1.05 + dx, cy + dy, cx - w * 0.9 + dx, cy - h * 0.7 + dy); for (let q = 0; q <= 6; q++) { const px = cx - w * 0.9 + q * w * 0.3, py = cy - h * (0.78 + (q % 2) * 0.16); x.quadraticCurveTo(px - w * 0.15 + dx, py - h * 0.2 + dy, px + dx, py + dy); } x.quadraticCurveTo(cx + w * 1.05 + dx, cy + dy, cx + w * 0.3 + dx, cy + h + dy); x.closePath(); };
          x.fillStyle = 'rgba(40,50,20,0.35)'; leaf(P * 0.02, P * 0.04); x.fill();
          x.fillStyle = M.lin(0, cy - h, 0, cy + h, [[0, '#8eb060'], [0.32, '#c8dc98'], [0.6, '#eef2d8'], [1, '#f8f8ec']]); leaf(0, 0); x.fill();
          x.fillStyle = M.lin(cx - w * 0.2, 0, cx + w * 0.2, 0, [[0, 'rgba(230,236,210,0.9)'], [0.5, '#ffffff'], [1, 'rgba(220,228,200,0.9)']]); x.beginPath(); x.moveTo(cx - w * 0.3, cy + h); x.quadraticCurveTo(cx - w * 0.14, cy - h * 0.1, cx - w * 0.04, cy - h * 0.6); x.lineTo(cx + w * 0.04, cy - h * 0.6); x.quadraticCurveTo(cx + w * 0.14, cy - h * 0.1, cx + w * 0.3, cy + h); x.closePath(); x.fill();
          if (!small) { x.strokeStyle = 'rgba(150,180,100,0.3)'; x.lineWidth = lw(0.012); for (let q = 0; q < 3; q++) { const yy = cy - h * (0.1 + q * 0.2); x.beginPath(); x.moveTo(cx - w * 0.1, yy + h * 0.15); x.quadraticCurveTo(cx - w * 0.4, yy, cx - w * 0.7, yy - h * 0.15); x.moveTo(cx + w * 0.1, yy + h * 0.15); x.quadraticCurveTo(cx + w * 0.4, yy, cx + w * 0.7, yy - h * 0.15); x.stroke(); } } } });
        M.form('rgba(255,255,240,0.2)', 'rgba(50,60,20,0.32)'); break; }
      case 'shiitake': { M.fill('#2a1608'); M.piece(() => { // brown caps with the star cut
        for (const [u, v, i] of M.pts(A, 41, 0.5)) { const R = P * (0.45 + H(i, 42) * 0.03);
          x.fillStyle = 'rgba(20,8,0,0.45)'; M.blob(u + P * 0.02, v + P * 0.04, R, i * 3 + 9, 9, 0.18); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.4, [[0, '#b8845a'], [0.55, '#86542e'], [1, '#4e2c14']]); M.blob(u, v, R, i * 3 + 9, 9, 0.18); x.fill();
          if (!small) for (let k = 0; k < 10; k++) { const an = H(i * 10 + k, 43) * TAU, d = R * (0.5 + H(i * 10 + k, 44) * 0.4); x.fillStyle = 'rgba(230,200,160,0.35)'; ellipse(x, u + Math.cos(an) * d, v + Math.sin(an) * d, P * 0.02, P * 0.012, an); x.fill(); } // pale flecks
          const rt = H(i, 45) * 1.5; x.fillStyle = '#e8d4b0'; for (let k = 0; k < 3; k++) { const an = rt + k * Math.PI / 3; x.save(); x.translate(u, v); x.rotate(an); x.beginPath(); x.moveTo(-R * 0.5, 0); x.lineTo(0, -R * 0.07); x.lineTo(R * 0.5, 0); x.lineTo(0, R * 0.07); x.closePath(); x.fill(); x.restore(); } // the star (hana) cut
          x.fillStyle = 'rgba(255,230,200,0.4)'; ellipse(x, u - R * 0.4, v - R * 0.45, R * 0.24, R * 0.08, -0.5); x.fill(); } });
        M.form('rgba(255,220,180,0.18)', 'rgba(30,10,0,0.42)'); break; }
      case 'corn': { M.fill('#8a6a14'); M.piece(() => { // sweet corn segments: rows of plump kernels
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * P, kw = P * 0.15, kh = P * 0.14;
            for (let j = -2; j <= 2; j++) { const yy = cy + j * kh * 1.15, sq = 1 - Math.abs(j) * 0.12; for (let k = 0; k < len / kw + 1; k++) { const xx = k * kw + (j % 2 ? kw / 2 : 0);
              x.fillStyle = M.rad(xx - kw * 0.2, yy - kh * 0.25, kw * 0.8, [[0, '#fff2a8'], [0.6, '#f0c848'], [1, '#c8961e']]); x.beginPath(); x.ellipse(xx, yy, kw * 0.48 * sq, kh * 0.52, 0, 0, TAU); x.fill();
              if (!small && H(k * 7 + j + r, 51) < 0.5) { x.fillStyle = 'rgba(255,255,240,0.7)'; x.beginPath(); x.arc(xx - kw * 0.14, yy - kh * 0.18, P * 0.014, 0, TAU); x.fill(); } } }
            x.fillStyle = M.lin(0, cy - P * 0.5, 0, cy + P * 0.5, [[0, 'rgba(120,80,0,0.35)'], [0.25, 'rgba(0,0,0,0)'], [0.75, 'rgba(0,0,0,0)'], [1, 'rgba(120,80,0,0.4)']]); x.fillRect(-P, cy - P * 0.5, len + 2 * P, P); } }); }); // the cob's roundness
        M.form('rgba(255,250,200,0.22)', 'rgba(90,60,0,0.36)'); break; }
    }
  },
});
