/* ---- Hotpot blocks: seven things that go into a Taiwanese hot pot, each piece one continuous mass ----
   I fish balls (glossy white spheres, a seam line, a few floating scallion rings) · O duck-blood tofu (dark ruby cubes, satin
   sheen, tiny pores) · T mala broth (red chili oil over a dark broth: oil pools, dried chillies, Sichuan peppercorns)
   · S beef slices (thin slices fanned like shingles, a fat edge and soft marbling streaks) · Z napa cabbage (pale ribbed leaves, white stems to green
   frills) · J shiitake (matte brown caps, rolled pale rim, a subtle sunken star cut) · L corn (sweet corn segments, plump packed kernels) */
const HotpotFood = remakeFood('hotpot', {
  premiumOpts: { R: 0.2, grain: { duckblood: 0.06, mala: 0.08 }, lift: { duckblood: 'brightness(1.02) contrast(1.08)', shiitake: 'brightness(0.84) contrast(1.06)', beef: 'brightness(1.32) contrast(1.04)', mala: 'brightness(1.04) contrast(1.12) saturate(1.04)', corn: 'brightness(1.12)', napa: 'brightness(0.86) contrast(1.06) saturate(1.1)' } },
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
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, '#d8482a'], [0.6, '#b2321c'], [1, '#7c1e10']]); M.all(x.fillStyle); // bright chili-oil surface so the broth reads off the dark board
        for (const [u, v, i] of M.pts(A * 4, 11, 0.1)) { const rr = P * (0.05 + H(i, 12) * 0.1); x.fillStyle = 'rgba(240,96,40,0.4)'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.strokeStyle = 'rgba(255,170,90,0.6)'; x.lineWidth = lw(0.014); x.beginPath(); x.arc(u, v, rr, Math.PI * 1.1, Math.PI * 1.7); x.stroke(); } // oil rounds
        for (const [u, v, i] of M.pts(Math.max(2, Math.round(A * 1.2)), 13, 0.15)) { const rot = H(i, 14) * TAU, L0 = P * (0.2 + H(i, 15) * 0.08); x.save(); x.translate(u, v); x.rotate(rot); x.fillStyle = M.lin(0, -P * 0.05, 0, P * 0.05, [[0, '#e83a20'], [1, '#8a1408']]); x.beginPath(); x.moveTo(-L0, 0); x.quadraticCurveTo(-L0 * 0.2, -P * 0.07, L0 * 0.6, -P * 0.035); x.lineTo(L0, 0); x.quadraticCurveTo(L0 * 0.6, P * 0.05, -L0 * 0.2, P * 0.06); x.closePath(); x.fill(); x.fillStyle = '#3a5a1a'; x.fillRect(-L0 - P * 0.03, -P * 0.015, P * 0.04, P * 0.03); x.fillStyle = 'rgba(255,210,180,0.5)'; x.fillRect(-L0 * 0.4, -P * 0.035, L0 * 0.7, lw(0.012)); x.restore(); } // dried chillies
        if (!small) for (const [u, v, i] of M.pts(A * 8, 17, 0.06)) { x.fillStyle = '#4a1a10'; x.beginPath(); x.arc(u, v, P * 0.026, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,80,50,0.7)'; x.beginPath(); x.arc(u - P * 0.008, v - P * 0.008, P * 0.01, 0, TAU); x.fill(); } }); // Sichuan peppercorns
        M.form('rgba(255,170,120,0.2)', 'rgba(30,0,0,0.42)'); break; }
      case 'beef': { M.fill('#4a1a1c'); M.piece(() => { // thin slices fanned like shingles: each a long wavy-edged strip, marbled with soft fat streaks, a fat edge on one side
        const rows = Math.round(BH / (P * 0.5)) + 2;
        for (let r = 0; r < rows; r++) for (let cI = -1; cI <= Math.round(BW / P); cI++) { const i = r * 17 + cI * 5 + 40, cx = X0 + (cI + 0.5 + (r % 2) * 0.5) * P + (H(i, 21) - 0.5) * P * 0.12, cy = Y0 + r * P * 0.5 - P * 0.04, len = P * (0.64 + H(i, 22) * 0.08), th = P * 0.5, rot = -0.16 + (H(i, 23) - 0.5) * 0.12;
          x.save(); x.translate(cx, cy); x.rotate(rot);
          const slab = (dx, dy) => { x.beginPath(); x.moveTo(-len + dx, -th * 0.5 + dy); for (let q = 1; q <= 6; q++) x.quadraticCurveTo(-len + (q - 0.5) * len / 3 + dx, -th * (0.54 + H(i + q, 24) * 0.06) + dy, -len + q * len / 3 + dx, -th * 0.5 + dy); x.quadraticCurveTo(len * 1.08 + dx, dy, len + dx, th * 0.5 + dy); for (let q = 5; q >= 0; q--) x.quadraticCurveTo(-len + (q + 0.5) * len / 3 + dx, th * (0.58 + H(i + q, 25) * 0.1) + dy, -len + q * len / 3 + dx, th * 0.5 + dy); x.quadraticCurveTo(-len * 1.08 + dx, dy, -len + dx, -th * 0.5 + dy); x.closePath(); };
          x.fillStyle = 'rgba(30,4,6,0.45)'; slab(P * 0.01, P * 0.05); x.fill();
          x.fillStyle = M.lin(0, -th * 0.6, 0, th * 0.6, [[0, '#c45458'], [0.5, '#a43440'], [1, '#76202a']]); slab(0, 0); x.fill();
          x.save(); slab(0, 0); x.clip();
          x.fillStyle = 'rgba(246,222,208,0.8)'; x.beginPath(); x.moveTo(-len * 1.1, -th * 0.62); x.lineTo(len * 1.1, -th * 0.62); for (let q = 8; q >= 0; q--) x.lineTo(-len * 1.1 + q * len * 0.275, -th * (0.46 + H(i + q, 26) * 0.07)); x.closePath(); x.fill(); // thin fat edge
          x.strokeStyle = 'rgba(248,222,210,0.42)'; for (let k = 0; k < (small ? 1 : 3); k++) { const yy = -th * 0.18 + k * th * 0.24 + (H(i + k, 27) - 0.5) * th * 0.08, a0 = -len * (0.9 - H(i + k, 28) * 0.3), a1 = len * (0.5 + H(i + k, 29) * 0.45); x.lineWidth = lw(0.008 + H(i, k + 30) * 0.012); x.beginPath(); x.moveTo(a0, yy); x.bezierCurveTo(a0 + (a1 - a0) * 0.33, yy - th * 0.12, a0 + (a1 - a0) * 0.66, yy + th * 0.12, a1, yy + (H(k, i) - 0.5) * th * 0.1); x.stroke(); } // marbling streaks
          x.fillStyle = 'rgba(255,236,228,0.16)'; x.fillRect(-len, -th * 0.36, len * 2, th * 0.1); x.restore(); // soft wet sheen along the slice
          x.strokeStyle = 'rgba(90,20,26,0.5)'; x.lineWidth = lw(0.012); slab(0, 0); x.stroke(); x.restore(); } });
        M.form('rgba(255,220,220,0.2)', 'rgba(40,6,6,0.4)'); break; }
      case 'napa': { M.fill('#8a9a6a'); M.piece(() => { // pale ribbed leaves: white stem to green frill
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, fl = H(a * 3 + c, 30) < 0.5 ? 1 : -1, w = P * 0.5, h = P * 0.5; // one leaf per cell: thick white rib, pale blade, ruffled green crown
          const leaf = (dx, dy) => { x.beginPath(); x.moveTo(cx - w * 0.3 + dx, cy + h + dy); x.quadraticCurveTo(cx - w * 1.05 + dx, cy + dy, cx - w * 0.9 + dx, cy - h * 0.7 + dy); for (let q = 0; q <= 6; q++) { const px = cx - w * 0.9 + q * w * 0.3, py = cy - h * (0.78 + (q % 2) * 0.16); x.quadraticCurveTo(px - w * 0.15 + dx, py - h * 0.2 + dy, px + dx, py + dy); } x.quadraticCurveTo(cx + w * 1.05 + dx, cy + dy, cx + w * 0.3 + dx, cy + h + dy); x.closePath(); };
          x.fillStyle = 'rgba(40,50,20,0.35)'; leaf(P * 0.02, P * 0.04); x.fill();
          x.fillStyle = M.lin(0, cy - h, 0, cy + h, [[0, '#8eb060'], [0.32, '#c8dc98'], [0.6, '#eef2d8'], [1, '#f8f8ec']]); leaf(0, 0); x.fill();
          x.fillStyle = M.lin(cx - w * 0.2, 0, cx + w * 0.2, 0, [[0, 'rgba(230,236,210,0.9)'], [0.5, '#ffffff'], [1, 'rgba(220,228,200,0.9)']]); x.beginPath(); x.moveTo(cx - w * 0.3, cy + h); x.quadraticCurveTo(cx - w * 0.14, cy - h * 0.1, cx - w * 0.04, cy - h * 0.6); x.lineTo(cx + w * 0.04, cy - h * 0.6); x.quadraticCurveTo(cx + w * 0.14, cy - h * 0.1, cx + w * 0.3, cy + h); x.closePath(); x.fill();
          if (!small) { x.strokeStyle = 'rgba(150,180,100,0.3)'; x.lineWidth = lw(0.012); for (let q = 0; q < 3; q++) { const yy = cy - h * (0.1 + q * 0.2); x.beginPath(); x.moveTo(cx - w * 0.1, yy + h * 0.15); x.quadraticCurveTo(cx - w * 0.4, yy, cx - w * 0.7, yy - h * 0.15); x.moveTo(cx + w * 0.1, yy + h * 0.15); x.quadraticCurveTo(cx + w * 0.4, yy, cx + w * 0.7, yy - h * 0.15); x.stroke(); } } } });
        M.form('rgba(255,255,240,0.2)', 'rgba(50,60,20,0.32)'); break; }
      case 'shiitake': { M.fill('#2a1608'); M.piece(() => { // matte brown caps: fine radial fibre, a rolled pale rim, a subtle sunken star cut
        for (const [u, v, i] of M.pts(A, 41, 0.5)) { const R = P * (0.45 + H(i, 42) * 0.03);
          x.fillStyle = 'rgba(20,8,0,0.45)'; M.blob(u + P * 0.02, v + P * 0.04, R, i * 3 + 9, 9, 0.18); x.fill();
          x.fillStyle = '#9a7650'; M.blob(u, v, R, i * 3 + 9, 9, 0.18); x.fill(); // the rolled, slightly paler cap edge
          x.fillStyle = M.rad(u - R * 0.25, v - R * 0.3, R * 1.25, [[0, '#8a5c36'], [0.6, '#6a4022'], [1, '#4a2a12']]); M.blob(u, v, R * 0.94, i * 3 + 9, 9, 0.18); x.fill();
          if (!small) for (let k = 0; k < 9; k++) { const an = H(i * 9 + k, 43) * TAU, d = R * (0.2 + H(i * 9 + k, 44) * 0.6); x.fillStyle = k % 3 ? 'rgba(196,156,110,0.16)' : 'rgba(30,14,4,0.2)'; M.blob(u + Math.cos(an) * d, v + Math.sin(an) * d, R * (0.1 + H(i + k, 46) * 0.1), i * 9 + k, 6, 0.4); x.fill(); } // matte mottling, no gloss
          const rt = H(i, 45) * 1.5; for (let k = 0; k < 3; k++) { const an = rt + k * Math.PI / 3; x.save(); x.translate(u, v); x.rotate(an); x.fillStyle = 'rgba(40,18,4,0.4)'; x.fillRect(-R * 0.4, -R * 0.03, R * 0.8, R * 0.06); x.fillStyle = 'rgba(214,186,146,0.55)'; x.fillRect(-R * 0.36, 0, R * 0.72, R * 0.025); x.restore(); } // the hana cut: a narrow groove, pale flesh barely showing
          x.fillStyle = 'rgba(255,230,200,0.12)'; ellipse(x, u - R * 0.32, v - R * 0.36, R * 0.36, R * 0.2, -0.5); x.fill(); } });
        M.form('rgba(255,220,180,0.14)', 'rgba(30,10,0,0.42)'); break; }
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
