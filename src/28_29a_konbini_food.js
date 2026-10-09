/* ---- Konbini blocks: seven things from a Japanese convenience store, each piece one continuous mass ----
   I onigiri (a row of rice triangles, alternating, each with its crisp nori band and a peek of salmon / umé)
   · O roll cake (cream-heavy slices: thin golden sponge spiral, soft dome of whipped cream) · T karaage (craggy golden fried
   chicken nuggets) · S melon pan (sugar-crust dome, diamond score lines) · Z sakura mochi (pink domyōji grain, rice texture)
   · J matcha warabi (translucent jade cubes under a drift of matcha powder) · L chocolate (glossy ganache squares, cocoa dust) */
const KonbiniFood = remakeFood('konbini', {
  premiumOpts: { R: 0.18, grain: { rollcake: 0.06, onigiri: 0.06, choco: 0.08, matcha: 0.1 }, lift: { choco: 'brightness(1.12) contrast(1.08)', matcha: 'brightness(1.06) contrast(1.08)', sakura: 'brightness(0.92) contrast(1.06) saturate(1.18)', onigiri: 'brightness(0.96) contrast(1.06)', rollcake: 'brightness(1.05) contrast(1.03)', melonpan: 'brightness(1.04) contrast(1.06)' } },
  FOOD: [null, 'onigiri', 'rollcake', 'karaage', 'melonpan', 'sakura', 'matcha', 'choco'],
  MAIN: [null, '#8a908a', '#f4ecdc', '#b8742c', '#e2bc66', '#d08c9c', '#4a6a2a', '#3a2214'],
  soft: { onigiri: 1.0, rollcake: 1.4, karaage: 1.0, melonpan: 1.2, sakura: 1.4, matcha: 1.3, choco: 0.9 },
  boardBg: 'rgba(16,24,40,0.92)', grid: 'rgba(170,200,255,0.07)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 191), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    const grains = (n, k, col, r0) => { if (small) return; for (const [u, v, i] of M.pts(n, k, 0.02)) { x.save(); x.translate(u, v); x.rotate(H(i, k + 3) * 3); x.fillStyle = col(i); ellipse(x, 0, 0, P * r0, P * r0 * 0.5, 0); x.fill(); x.restore(); } };
    switch (food) {
      case 'onigiri': { M.fill('#24302a'); M.piece(() => { // a tight row of rice triangles on a sheet of nori, alternating so they tile
        x.fillStyle = 'rgba(120,150,120,0.12)'; for (let q = 0; q < (BW + BH) / (P * 0.08); q++) x.fillRect(X0 - P + q * P * 0.08, Y0 - P, lw(0.012), BH + 2 * P);
        M.axis((len, sp) => { const w = Math.min(sp, P) * 0.98, n = Math.max(1, Math.round(len / (w * 0.6))), step = len / n;
          for (let r = 0; r < Math.round(sp / P); r++) for (let k = 0; k < n; k++) { const up = (k + r) % 2 === 0, cx = (k + 0.5) * step, cy = r * P + P * 0.5, hh = P * 0.8, hw = step * 0.86, sgn = up ? 1 : -1, ty = cy - sgn * hh * 0.5, by = cy + sgn * hh * 0.5;
            const tri = (dx, dy) => { x.beginPath(); x.moveTo(cx + dx, ty + dy); x.quadraticCurveTo(cx + hw * 0.18 + dx, ty + sgn * hh * 0.06 + dy, cx + hw * 0.9 + dx, by - sgn * hh * 0.08 + dy); x.quadraticCurveTo(cx + hw + dx, by + dy, cx + hw * 0.7 + dx, by + dy); x.lineTo(cx - hw * 0.7 + dx, by + dy); x.quadraticCurveTo(cx - hw + dx, by + dy, cx - hw * 0.9 + dx, by - sgn * hh * 0.08 + dy); x.quadraticCurveTo(cx - hw * 0.18 + dx, ty + sgn * hh * 0.06 + dy, cx + dx, ty + dy); x.closePath(); };
            x.fillStyle = 'rgba(60,50,30,0.35)'; tri(P * 0.02, P * 0.035); x.fill();
            x.fillStyle = M.lin(cx - hw, ty, cx + hw, by, [[0, '#fffdf6'], [0.6, '#f2ecdd'], [1, '#d6ccb6']]); tri(0, 0); x.fill();
            if (!small) { x.save(); tri(0, 0); x.clip(); for (let g = 0; g < 14; g++) { const gx = cx + (H(k * 31 + r, g) - 0.5) * hw * 1.6, gy = cy + (H(k * 37 + r, g + 20) - 0.5) * hh * 0.9; x.fillStyle = H(k + g, 7) < 0.5 ? 'rgba(255,255,255,0.9)' : 'rgba(200,190,170,0.45)'; ellipse(x, gx, gy, P * 0.03, P * 0.016, H(g, k) * 3); x.fill(); } x.restore(); }
            // filling peek (salmon or umé) near the tip, then the nori band across the base
            const nb = hh * 0.3, ny = up ? by - nb : by; x.save(); tri(0, 0); x.clip(); x.fillStyle = '#18221c'; x.fillRect(cx - hw * 0.55, ny, hw * 1.1, nb); x.fillStyle = 'rgba(120,150,120,0.16)'; for (let q = 0; q < 4; q++) x.fillRect(cx - hw * 0.55, ny + nb * (0.2 + q * 0.2), hw * 1.1, lw(0.01)); x.fillStyle = 'rgba(210,230,210,0.22)'; x.fillRect(cx - hw * 0.55, up ? ny : ny + nb - lw(0.025), hw * 1.1, lw(0.025)); x.restore(); } }); });
        M.form('rgba(255,255,250,0.2)', 'rgba(60,50,30,0.32)'); break; }
      case 'rollcake': { M.fill('#f4ecdc'); M.piece(() => { // a cream-heavy roll: slices laid flat, thin golden sponge spiral, whipped cream with soft peaks
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, 'rgba(255,253,246,0.5)'], [1, 'rgba(200,184,150,0.3)']]); M.all(x.fillStyle);
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P + (H(a * 7 + c, 1) - 0.5) * P * 0.06, cy = (c + 0.5) * P + (H(a * 7 + c, 2) - 0.5) * P * 0.06, R = P * 0.43, r0 = H(a + c * 5, 3) * TAU;
          x.fillStyle = 'rgba(90,60,30,0.3)'; x.beginPath(); x.arc(cx + P * 0.02, cy + P * 0.035, R, 0, TAU); x.fill();
          x.fillStyle = '#b8803e'; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill(); x.fillStyle = '#e4b468'; x.beginPath(); x.arc(cx, cy, R * 0.94, 0, TAU); x.fill();
          x.fillStyle = M.rad(cx - R * 0.3, cy - R * 0.35, R * 1.2, [[0, '#ffffff'], [0.6, '#fbf6ec'], [1, '#e8dcc6']]); x.beginPath(); x.arc(cx, cy, R * 0.82, 0, TAU); x.fill();
          x.strokeStyle = '#dcaa5c'; x.lineWidth = lw(0.035); x.lineCap = 'round'; x.beginPath(); for (let q = 0; q <= 40; q++) { const an = r0 + q * 0.2, rr = R * (0.14 + q * 0.0145); q ? x.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr) : x.moveTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr); } x.stroke();
          x.fillStyle = 'rgba(255,255,255,0.7)'; ellipse(x, cx - R * 0.32, cy - R * 0.4, R * 0.2, R * 0.08, -0.5); x.fill(); } });
        M.form('rgba(255,255,250,0.22)', 'rgba(110,80,40,0.3)'); break; }
      case 'karaage': { M.fill('#5a2c0c'); M.piece(() => { // craggy fried chicken pieces packed tight
        for (const [u, v, i] of M.pts(A * 5, 11, 0.1)) { const rr = P * (0.23 + H(i, 13) * 0.07), sd = i * 7 + 3;
          x.fillStyle = 'rgba(30,10,0,0.5)'; M.blob(u + P * 0.03, v + P * 0.05, rr, sd, 10, 0.55); x.fill();
          x.fillStyle = M.rad(u - rr * 0.4, v - rr * 0.45, rr * 1.7, [[0, '#f2c070'], [0.45, '#c88032'], [1, '#7a3e12']]); M.blob(u, v, rr, sd, 10, 0.55); x.fill();
          if (!small) { for (let k = 0; k < 8; k++) { const a = H(i * 8 + k, 15) * TAU, d = rr * H(i * 8 + k, 16) * 0.8; x.fillStyle = k % 2 ? 'rgba(255,220,150,0.55)' : 'rgba(90,40,10,0.45)'; x.beginPath(); x.arc(u + Math.cos(a) * d, v + Math.sin(a) * d, P * (0.016 + H(i + k, 17) * 0.016), 0, TAU); x.fill(); }
            }
          x.fillStyle = 'rgba(255,240,210,0.5)'; ellipse(x, u - rr * 0.38, v - rr * 0.42, rr * 0.26, rr * 0.09, -0.5); x.fill(); } });
        M.form('rgba(255,215,150,0.2)', 'rgba(40,14,0,0.42)'); break; }
      case 'melonpan': { M.fill('#9a6a26'); M.piece(() => { // one sugar-crust surface scored in diamonds, golden at the edges
        x.fillStyle = M.rad(X0 + BW * 0.45, Y0 + BH * 0.4, Math.max(BW, BH) * 0.75, [[0, 'rgba(255,240,180,0.45)'], [1, 'rgba(176,120,40,0.4)']]); M.all(x.fillStyle);
        const g = P * 0.36; for (let iy = -2; iy < BH / (g * 0.5) + 3; iy++) for (let ix = -2; ix < BW / g + 3; ix++) { const cx = X0 + ix * g + (iy % 2 ? g / 2 : 0), cy = Y0 + iy * g * 0.5, hx = g * 0.47, hy = g * 0.25;
          x.fillStyle = M.rad(cx - hx * 0.25, cy - hy * 0.35, hx * 1.1, [[0, '#f6dc94'], [0.6, '#e6be6a'], [1, '#c8963e']]); x.beginPath(); x.moveTo(cx, cy - hy); x.quadraticCurveTo(cx + hx * 0.6, cy - hy * 0.6, cx + hx, cy); x.quadraticCurveTo(cx + hx * 0.6, cy + hy * 0.6, cx, cy + hy); x.quadraticCurveTo(cx - hx * 0.6, cy + hy * 0.6, cx - hx, cy); x.quadraticCurveTo(cx - hx * 0.6, cy - hy * 0.6, cx, cy - hy); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 24, 19, 0.03)) { x.fillStyle = H(i, 20) < 0.6 ? 'rgba(255,255,248,0.8)' : 'rgba(255,236,190,0.6)'; x.fillRect(u, v, lw(0.022), lw(0.018)); } });
        M.form('rgba(255,245,200,0.24)', 'rgba(110,70,10,0.36)'); break; }
      case 'sakura': { M.fill('#b87080'); M.piece(() => { // domyōji sakura mochi: soft pink grain domes nestled together
        for (const [u, v, i] of M.pts(A * 2.4, 23, 0.14)) { const R = P * (0.3 + H(i, 25) * 0.05);
          x.fillStyle = 'rgba(80,30,40,0.35)'; ellipse(x, u + P * 0.025, v + P * 0.04, R * 1.04, R * 0.92, 0); x.fill();
          x.fillStyle = M.rad(u - R * 0.35, v - R * 0.4, R * 1.5, [[0, '#f6ccd4'], [0.55, '#e0a0ae'], [1, '#b8707e']]); ellipse(x, u, v, R, R * 0.9, 0); x.fill();
          if (!small) { x.save(); ellipse(x, u, v, R, R * 0.9, 0); x.clip(); for (let k = 0; k < 22; k++) { const gx = u + (H(i * 22 + k, 26) - 0.5) * R * 1.9, gy = v + (H(i * 22 + k, 27) - 0.5) * R * 1.7; x.fillStyle = 'rgba(255,236,240,0.4)'; x.beginPath(); x.arc(gx, gy, P * 0.026, 0, TAU); x.fill(); x.fillStyle = 'rgba(150,80,95,0.25)'; x.beginPath(); x.arc(gx + P * 0.012, gy + P * 0.016, P * 0.02, 0, TAU); x.fill(); } x.restore(); }
          x.fillStyle = 'rgba(255,250,252,0.55)'; ellipse(x, u - R * 0.35, v - R * 0.42, R * 0.24, R * 0.09, -0.5); x.fill(); } });
        M.form('rgba(255,225,232,0.22)', 'rgba(80,20,36,0.38)'); break; }
      case 'matcha': { M.fill('#33481c'); M.piece(() => { // translucent jade warabi cubes under a drift of matcha powder
        for (const [a, c] of M.cells) for (let q = 0; q < 4; q++) { const s0 = P * 0.4, cx = (a + 0.27 + (q % 2) * 0.46) * P + (H(a * 9 + c * 3 + q, 1) - 0.5) * P * 0.06, cy = (c + 0.27 + (q >> 1) * 0.46) * P + (H(a * 9 + c * 3 + q, 2) - 0.5) * P * 0.06, rot = (H(a + c + q, 3) - 0.5) * 0.3;
          x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = 'rgba(10,20,0,0.45)'; roundRect(x, -s0 / 2 + P * 0.02, -s0 / 2 + P * 0.035, s0, s0, s0 * 0.22); x.fill();
          x.fillStyle = M.lin(-s0 / 2, -s0 / 2, s0 / 2, s0 / 2, [[0, '#86a456'], [0.5, '#5a7a32'], [1, '#3a5420']]); roundRect(x, -s0 / 2, -s0 / 2, s0, s0, s0 * 0.22); x.fill();
          x.fillStyle = 'rgba(200,230,150,0.3)'; roundRect(x, -s0 * 0.36, -s0 * 0.4, s0 * 0.5, s0 * 0.16, s0 * 0.08); x.fill(); x.restore(); }
        if (!small) for (const [u, v, i] of M.pts(A * 50, 31, 0.02)) { x.fillStyle = H(i, 32) < 0.6 ? 'rgba(150,180,90,0.55)' : 'rgba(110,140,60,0.5)'; x.beginPath(); x.arc(u, v, P * (0.01 + H(i, 33) * 0.014), 0, TAU); x.fill(); } });
        M.form('rgba(210,240,170,0.18)', 'rgba(10,24,0,0.42)'); break; }
      case 'choco': { M.fill('#1e0e06'); M.piece(() => { // a tray of glossy ganache squares, lightly dusted
        for (const [a, c] of M.cells) for (let q = 0; q < 4; q++) { const s0 = P * 0.42, cx = (a + 0.26 + (q % 2) * 0.48) * P, cy = (c + 0.26 + (q >> 1) * 0.48) * P;
          x.fillStyle = 'rgba(0,0,0,0.45)'; roundRect(x, cx - s0 / 2 + P * 0.02, cy - s0 / 2 + P * 0.03, s0, s0, s0 * 0.14); x.fill();
          x.fillStyle = M.lin(cx - s0 / 2, cy - s0 / 2, cx + s0 / 2, cy + s0 / 2, [[0, '#6a3e22'], [0.5, '#4a2814'], [1, '#2e180a']]); roundRect(x, cx - s0 / 2, cy - s0 / 2, s0, s0, s0 * 0.14); x.fill();
          if (H(a * 5 + c * 3 + q, 5) < 0.5) { if (!small) for (let k = 0; k < 16; k++) { x.fillStyle = 'rgba(140,96,64,0.6)'; x.beginPath(); x.arc(cx + (H(q * 16 + k + a, 6) - 0.5) * s0 * 0.9, cy + (H(q * 16 + k + c, 7) - 0.5) * s0 * 0.9, P * 0.012, 0, TAU); x.fill(); } }
          else { x.fillStyle = 'rgba(255,230,200,0.38)'; roundRect(x, cx - s0 * 0.38, cy - s0 * 0.4, s0 * 0.56, s0 * 0.12, s0 * 0.06); x.fill(); }
          if (!small && H(a + c * 7 + q, 8) < 0.12) { x.fillStyle = '#d8b050'; x.fillRect(cx - P * 0.03, cy - P * 0.02, P * 0.06, P * 0.04); } } });
        M.form('rgba(255,210,170,0.14)', 'rgba(0,0,0,0.45)'); break; }
    }
  },
});
