/* ---- Cinema Lobby blocks: seven concession-stand foods, each piece one continuous mass ----
   I hot dog (one sausage running the whole piece in a toasted bun, mustard zigzag) · O popcorn (butter-tinted puffs, hulls)
   · T nachos (overlapping chips, molten cheese ribbon, jalapeño rings) · S blue-raspberry slushie (crushed ice facets)
   · Z soft pretzel (lacquered rope twisted through the piece, coarse salt) · J malt balls (glossy chocolate spheres, a few
   cracked open) · L mint pastilles (chalky embossed discs on mint) */
const CinemaFood = remakeFood('cinema', {
  FOOD: [null, 'hotdog', 'popcorn', 'nachos', 'slushie', 'pretzel', 'malt', 'mint'],
  MAIN: [null, '#c8743a', '#f2e4bc', '#e8a83a', '#2a6ad0', '#7a3c18', '#3a2214', '#9cd8bc'],
  soft: { hotdog: 1.0, popcorn: 1.5, nachos: 0.9, slushie: 1.2, pretzel: 1.0, malt: 1.3, mint: 1.4 },
  boardBg: 'rgba(30,12,18,0.92)', grid: 'rgba(255,210,140,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 131), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    const segs = () => M.skel();
    const along = (fn) => { for (const [ax, ay, bx, by] of segs()) fn(ax, ay, bx, by); };
    const strokeSkel = (col, w, dx = 0, dy = 0) => { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; along((ax, ay, bx, by) => { x.beginPath(); x.moveTo(ax + dx, ay + dy); x.lineTo(bx + dx, by + dy); x.stroke(); }); };
    switch (food) {
      case 'hotdog': { M.fill('#d0924c'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(250,200,130,0.45)'], [0.5, 'rgba(230,160,90,0)'], [1, 'rgba(150,80,30,0.4)']]); M.all(x.fillStyle);
        if (!small) for (const [u, v, i] of M.pts(A * 30, 3, 0.02)) { x.fillStyle = H(i, 5) < 0.5 ? 'rgba(255,230,180,0.35)' : 'rgba(140,80,30,0.25)'; x.fillRect(u, v, lw(0.02), lw(0.02)); }
        strokeSkel('rgba(120,60,20,0.55)', P * 0.56, 0, P * 0.03);           // bun split shadow
        strokeSkel('#5a1a10', P * 0.44, 0, P * 0.035);                         // sausage underside
        strokeSkel('#b4442a', P * 0.4);
        strokeSkel('rgba(220,110,70,0.55)', P * 0.22, 0, -P * 0.04);
        strokeSkel('rgba(255,210,180,0.55)', P * 0.06, 0, -P * 0.11);         // wet highlight
        if (!small) { x.strokeStyle = 'rgba(70,20,10,0.35)'; x.lineWidth = lw(0.025); along((ax, ay, bx, by) => { const hz = ay === by; for (let k = 0.25; k < 1; k += 0.5) { const px = ax + (bx - ax) * k, py = ay + (by - ay) * k; x.beginPath(); if (hz) { x.moveTo(px - P * 0.05, py - P * 0.13); x.lineTo(px + P * 0.05, py + P * 0.13); } else { x.moveTo(px - P * 0.13, py - P * 0.05); x.lineTo(px + P * 0.13, py + P * 0.05); } x.stroke(); } }); }
        x.strokeStyle = '#f2c41c'; x.lineWidth = lw(0.07); x.lineCap = 'round'; along((ax, ay, bx, by) => { const hz = ay === by; x.beginPath(); for (let i = 0; i <= 24; i++) { const k = i / 24, px = ax + (bx - ax) * k, py = ay + (by - ay) * k, ph = Math.sin(((hz ? px : py) / P - 0.5) * TAU * 1.5) * P * 0.09; const qx = hz ? px : px + ph, qy = hz ? py + ph - P * 0.02 : py; i ? x.lineTo(qx, qy) : x.moveTo(qx, qy); } x.stroke(); });
        x.strokeStyle = 'rgba(255,250,200,0.6)'; x.lineWidth = lw(0.02); along((ax, ay, bx, by) => { const hz = ay === by; x.beginPath(); for (let i = 0; i <= 24; i++) { const k = i / 24, px = ax + (bx - ax) * k, py = ay + (by - ay) * k, ph = Math.sin(((hz ? px : py) / P - 0.5) * TAU * 1.5) * P * 0.09; const qx = hz ? px : px + ph - P * 0.015, qy = hz ? py + ph - P * 0.035 : py; i ? x.lineTo(qx, qy) : x.moveTo(qx, qy); } x.stroke(); }); });
        M.form('rgba(255,225,170,0.22)', 'rgba(90,40,10,0.4)'); break; }
      case 'popcorn': { M.fill('#cfae6a'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 13, 7, 0.04)) { const R = P * (0.13 + H(i, 9) * 0.06), but = H(i, 10) < 0.35;
          for (let k = 0; k < 4; k++) { const a = k / 4 * TAU + H(i, 11 + k) * 1.2, d = k ? R * 0.62 : 0, px = u + Math.cos(a) * d, py = v + Math.sin(a) * d, rr = R * (k ? 0.62 : 0.72);
            x.fillStyle = 'rgba(150,110,50,0.55)'; x.beginPath(); x.arc(px + rr * 0.18, py + rr * 0.24, rr, 0, TAU); x.fill();
            x.fillStyle = M.rad(px - rr * 0.35, py - rr * 0.4, rr * 1.5, [[0, '#fffdf6'], [0.55, but ? '#f8e6a8' : '#f8f0dc'], [1, but ? '#e8c46a' : '#e4d2a8']]); x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill(); }
          if (!small && H(i, 17) < 0.3) { x.fillStyle = '#9a6a30'; ellipse(x, u + R * 0.1, v + R * 0.15, P * 0.035, P * 0.02, H(i, 18) * 3); x.fill(); } } });
        M.form('rgba(255,255,240,0.22)', 'rgba(110,80,30,0.32)'); break; }
      case 'nachos': { M.fill('#7a4612'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 6, 19, 0.06)) { const R = P * (0.36 + H(i, 21) * 0.12), a0 = H(i, 22) * TAU, pt = [0, 1, 2].map((k) => [u + Math.cos(a0 + k * TAU / 3) * R, v + Math.sin(a0 + k * TAU / 3) * R]);
          const tri = (dx, dy) => { x.beginPath(); pt.forEach(([px, py], k) => k ? x.lineTo(px + dx, py + dy) : x.moveTo(px + dx, py + dy)); x.closePath(); };
          x.fillStyle = 'rgba(50,24,0,0.55)'; tri(P * 0.035, P * 0.05); x.fill();
          x.fillStyle = M.lin(u - R, v - R, u + R, v + R, [[0, '#f8dc98'], [0.6, '#eabc62'], [1, '#c8902e']]); tri(0, 0); x.fill();
          x.strokeStyle = 'rgba(170,100,20,0.7)'; x.lineWidth = lw(0.025); x.lineJoin = 'round'; tri(0, 0); x.stroke();
          if (!small) { x.fillStyle = 'rgba(170,110,40,0.5)'; for (let k = 0; k < 5; k++) x.fillRect(u + (H(i * 5 + k, 23) - 0.5) * R * 0.7, v + (H(i * 5 + k, 24) - 0.5) * R * 0.7, lw(0.022), lw(0.022)); } }
        // molten cheese: an irregular drizzle of pools following the piece, with drips
        along((ax, ay, bx, by) => { for (let k = 0; k <= 4; k++) { const f = k / 4, px = ax + (bx - ax) * f + (H(ax + k, 25) - 0.5) * P * 0.12, py = ay + (by - ay) * f + (H(ay + k, 26) - 0.5) * P * 0.12, rr = P * (0.15 + H(ax * 3 + ay + k, 27) * 0.08), sd = Math.floor(ax + ay * 7 + k * 13);
          x.fillStyle = 'rgba(140,60,0,0.45)'; M.blob(px + P * 0.02, py + P * 0.035, rr, sd, 8, 0.5); x.fill(); x.fillStyle = '#f2a414'; M.blob(px, py, rr, sd, 8, 0.5); x.fill(); } });
        along((ax, ay, bx, by) => { for (let k = 0; k <= 4; k++) { const f = k / 4, px = ax + (bx - ax) * f, py = ay + (by - ay) * f; x.fillStyle = 'rgba(255,225,150,0.55)'; ellipse(x, px - P * 0.05, py - P * 0.06, P * 0.06, P * 0.025, -0.5); x.fill(); } });
        for (const [u, v, i] of M.pts(A, 31, 0.2)) { if (H(i, 32) < 0.7) continue; const r0 = P * 0.1; x.fillStyle = '#3e6a1e'; x.beginPath(); x.arc(u, v, r0, 0, TAU); x.fill(); x.fillStyle = '#9ac458'; x.beginPath(); x.arc(u, v, r0 * 0.72, 0, TAU); x.fill(); x.fillStyle = '#e8eec0'; for (let k = 0; k < 4; k++) { const a = k / 4 * TAU + H(i, 33); x.beginPath(); x.arc(u + Math.cos(a) * r0 * 0.36, v + Math.sin(a) * r0 * 0.36, r0 * 0.12, 0, TAU); x.fill(); } } });
        M.form('rgba(255,235,180,0.2)', 'rgba(100,50,0,0.4)'); break; }
      case 'slushie': { M.fill('#1c5cc4'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(120,190,255,0.45)'], [1, 'rgba(10,30,110,0.45)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * (small ? 10 : 22), 35, 0.02)) { const R = P * (0.06 + H(i, 37) * 0.07), a0 = H(i, 38) * TAU, n = 5; x.fillStyle = ['#4a96f0', '#2a72dc', '#1448a8', '#6ab0f8'][Math.floor(H(i, 39) * 4)]; x.beginPath(); for (let k = 0; k < n; k++) { const a = a0 + k / n * TAU, q = R * (0.7 + H(i, 40 + k) * 0.5); k ? x.lineTo(u + Math.cos(a) * q, v + Math.sin(a) * q) : x.moveTo(u + Math.cos(a) * q, v + Math.sin(a) * q); } x.closePath(); x.fill();
          x.fillStyle = 'rgba(230,245,255,0.55)'; x.beginPath(); x.moveTo(u + Math.cos(a0) * R * 0.8, v + Math.sin(a0) * R * 0.8); x.lineTo(u, v); x.lineTo(u + Math.cos(a0 + 1.26) * R * 0.8, v + Math.sin(a0 + 1.26) * R * 0.8); x.closePath(); x.fill(); }
        if (!small) { x.fillStyle = '#ffffff'; for (const [u, v] of M.pts(A * 6, 47, 0.06)) x.fillRect(u, v, lw(0.03), lw(0.03)); } });
        M.form('rgba(200,230,255,0.28)', 'rgba(0,10,60,0.45)'); break; }
      case 'pretzel': { M.fill('#4a200c'); M.piece(() => {
        strokeSkel('rgba(30,10,0,0.6)', P * 0.72, 0, P * 0.05); strokeSkel('#7e3e16', P * 0.66); strokeSkel('#9a5222', P * 0.4, 0, -P * 0.05); strokeSkel('rgba(255,200,150,0.35)', P * 0.08, 0, -P * 0.18);
        x.strokeStyle = 'rgba(40,14,0,0.55)'; x.lineWidth = lw(0.04); along((ax, ay, bx, by) => { const hz = ay === by; for (let k = 0; k < 4; k++) { const f = (k + 0.5) / 4, px = ax + (bx - ax) * f, py = ay + (by - ay) * f; x.beginPath(); if (hz) { x.moveTo(px - P * 0.12, py - P * 0.3); x.quadraticCurveTo(px + P * 0.06, py, px - P * 0.08, py + P * 0.3); } else { x.moveTo(px - P * 0.3, py - P * 0.12); x.quadraticCurveTo(px, py + P * 0.06, px + P * 0.3, py - P * 0.08); } x.stroke(); } });
        if (!small) for (const [u, v, i] of M.pts(A * 3, 51, 0.2)) { x.fillStyle = 'rgba(232,190,130,0.75)'; ellipse(x, u, v, P * 0.09, P * 0.025, H(i, 52) * 3); x.fill(); }
        for (const [u, v, i] of M.pts(A * (small ? 4 : 9), 55, 0.1)) { x.save(); x.translate(u, v); x.rotate(H(i, 57) * 3); const s = P * (0.018 + H(i, 58) * 0.016); x.fillStyle = 'rgba(80,60,50,0.4)'; x.fillRect(-s + s * 0.3, -s + s * 0.4, s * 2, s * 1.6); x.fillStyle = '#fbf8f2'; x.fillRect(-s, -s, s * 2, s * 1.6); x.fillStyle = 'rgba(200,210,220,0.8)'; x.fillRect(-s, s * 0.2, s * 2, s * 0.4); x.restore(); } });
        M.form('rgba(255,190,140,0.2)', 'rgba(20,6,0,0.5)'); break; }
      case 'malt': { M.fill('#1a0e08'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 5, 61, 0.14)) { const R = P * (0.19 + H(i, 63) * 0.05);
          x.fillStyle = 'rgba(0,0,0,0.5)'; x.beginPath(); x.arc(u + R * 0.12, v + R * 0.18, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.35, v - R * 0.4, R * 1.6, [[0, '#7a4e30'], [0.45, '#4a2a18'], [1, '#22120a']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          if (H(i, 64) < 0.18 && !small) { x.save(); x.beginPath(); x.arc(u, v, R, 0, TAU); x.clip(); x.fillStyle = '#e8d0a0'; x.beginPath(); x.moveTo(u - R, v - R * 0.1); x.lineTo(u - R * 0.2, v + R * 0.2); x.lineTo(u + R * 0.3, v - R * 0.25); x.lineTo(u + R, v + R * 0.05); x.lineTo(u + R, v + R); x.lineTo(u - R, v + R); x.closePath(); x.fill(); x.fillStyle = 'rgba(160,110,60,0.6)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(u + (H(i * 6 + k, 65) - 0.5) * R * 1.4, v + R * 0.3 + H(i * 6 + k, 66) * R * 0.5, R * 0.1, 0, TAU); x.fill(); } x.restore(); }
          x.fillStyle = 'rgba(255,235,210,0.55)'; ellipse(x, u - R * 0.38, v - R * 0.42, R * 0.26, R * 0.13, -0.6); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(u - R * 0.42, v - R * 0.46, R * 0.06, 0, TAU); x.fill(); } });
        M.form('rgba(220,170,130,0.16)', 'rgba(0,0,0,0.5)'); break; }
      case 'mint': { M.fill('#86c8a8'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(190,240,215,0.4)'], [1, 'rgba(60,140,110,0.3)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 3, 69, 0.18)) { const R = P * (0.22 + H(i, 71) * 0.04);
          x.fillStyle = 'rgba(40,100,80,0.45)'; x.beginPath(); x.arc(u + R * 0.1, v + R * 0.16, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.5, [[0, '#ffffff'], [0.6, '#f2f6f2'], [1, '#d4e4dc']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          x.strokeStyle = 'rgba(150,180,170,0.55)'; x.lineWidth = lw(0.025); x.beginPath(); x.arc(u, v, R * 0.68, 0, TAU); x.stroke(); x.strokeStyle = 'rgba(255,255,255,0.9)'; x.beginPath(); x.arc(u - lw(0.02), v - lw(0.02), R * 0.68, Math.PI * 0.9, Math.PI * 1.6); x.stroke();
          if (!small) { x.fillStyle = 'rgba(60,150,110,0.6)'; x.beginPath(); x.arc(u + R * 0.15, v + R * 0.05, R * 0.08, 0, TAU); x.fill(); x.fillStyle = 'rgba(200,215,210,0.5)'; for (let k = 0; k < 6; k++) x.fillRect(u + (H(i * 6 + k, 73) - 0.5) * R * 1.3, v + (H(i * 6 + k, 74) - 0.5) * R * 1.3, lw(0.015), lw(0.015)); } } });
        M.form('rgba(255,255,255,0.2)', 'rgba(30,90,70,0.35)'); break; }
    }
  },
});
