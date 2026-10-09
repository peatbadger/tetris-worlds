/* ---- Korean BBQ blocks: seven things on a Seoul grill table, each piece one continuous mass ----
   I galbi (marinated short-rib strips: glossy dark soy-sugar glaze, criss-cross scoring, a bone end, sesame and scallion)
   · O gyeran-jjim (steamed egg puffed over the bowl: soft golden domes, a browned rim, scallion and sesame) · T kimchi
   (napa leaves in red chilli paste: pale ribs showing, glossy, flecked) · S samgyeopsal (pork-belly strips: pink meat and
   white fat layers, grill bars seared across) · Z sangchu (frilly green lettuce for ssam, one leaf per cell, pale vein)
   · J japchae (a glossy tangle of glass noodles with carrot, spinach and mushroom strips) · L kongnamul (seasoned soybean
   sprouts: curved white stems, yellow heads, sesame oil sheen) */
const KbbqFood = remakeFood('kbbq', {
  premiumOpts: { R: 0.2, grain: { gyeranjjim: 0.05, kimchi: 0.06 }, lift: { galbi: 'brightness(0.86) contrast(1.08) saturate(1.06)', kimchi: 'brightness(1.24) contrast(1.08) saturate(1.16)', japchae: 'brightness(0.92) contrast(1.08)', samgyeop: 'brightness(1.1) contrast(1.04)', sangchu: 'brightness(0.88) contrast(1.06) saturate(1.06)' } },
  FOOD: [null, 'galbi', 'gyeranjjim', 'kimchi', 'samgyeop', 'sangchu', 'japchae', 'kongnamul'],
  MAIN: [null, '#5a2a14', '#f0c040', '#c83a24', '#e8b0a0', '#6aa83a', '#7a6a5a', '#f0e8c8'],
  soft: { galbi: 1.0, gyeranjjim: 1.4, kimchi: 1.1, samgyeop: 1.0, sangchu: 1.2, japchae: 1.2, kongnamul: 1.1 },
  boardBg: 'rgba(16,14,16,0.94)', grid: 'rgba(255,220,190,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 701), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'galbi': { M.fill('#1e0a04'); M.piece(() => { // glazed short-rib strips along the piece: scored, a bone end, sesame + scallion
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / (P * 0.5)));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * sp / rows, hh = sp / rows * 0.42, sx = P * 0.06 + H(r, 1) * P * 0.1, ex = len - P * 0.06;
            const strip = (dx, dy) => { x.beginPath(); x.moveTo(sx + dx, cy - hh + dy); for (let q = 1; q <= 8; q++) x.quadraticCurveTo(sx + (q - 0.5) * (ex - sx) / 8 + dx, cy - hh * (1.08 + H(r * 9 + q, 2) * 0.1) + dy, sx + q * (ex - sx) / 8 + dx, cy - hh + dy); x.lineTo(ex + dx, cy + hh + dy); for (let q = 7; q >= 0; q--) x.quadraticCurveTo(sx + (q + 0.5) * (ex - sx) / 8 + dx, cy + hh * (1.06 + H(r * 9 + q, 3) * 0.1) + dy, sx + q * (ex - sx) / 8 + dx, cy + hh + dy); x.closePath(); };
            x.fillStyle = 'rgba(10,2,0,0.5)'; strip(P * 0.02, P * 0.035); x.fill();
            x.fillStyle = M.lin(0, cy - hh, 0, cy + hh, [[0, '#a85a2a'], [0.35, '#7a3818'], [1, '#3e1608']]); strip(0, 0); x.fill();
            x.save(); strip(0, 0); x.clip();
            x.strokeStyle = 'rgba(30,8,0,0.22)'; x.lineWidth = lw(0.012); for (let q = -2; q < len / (P * 0.36) + 2; q++) { const qx = sx + q * P * 0.36; x.beginPath(); x.moveTo(qx, cy - hh); x.lineTo(qx + hh * 1.2, cy + hh); x.moveTo(qx + hh * 1.2, cy - hh); x.lineTo(qx, cy + hh); x.stroke(); } // criss-cross scoring
            for (let q = 0; q < len / P * 2; q++) { const qx = sx + (q + 0.5) * P * 0.5 + (H(r, q + 5) - 0.5) * P * 0.2, qy = cy + (H(r, q + 40) - 0.5) * hh; x.fillStyle = H(r, q + 50) < 0.5 ? 'rgba(30,6,0,0.3)' : 'rgba(200,110,50,0.25)'; M.blob(qx, qy, P * (0.08 + H(r, q + 60) * 0.06), r * 13 + q, 7, 0.5); x.fill(); } // caramelised and charred patches
            x.fillStyle = 'rgba(255,214,160,0.34)'; x.fillRect(sx, cy - hh * 0.72, ex - sx, hh * 0.18); x.fillStyle = 'rgba(255,240,210,0.5)'; x.fillRect(sx + P * 0.1, cy - hh * 0.7, (ex - sx) * 0.5, hh * 0.06); x.restore(); // the sticky glaze sheen
            const nb = Math.max(1, Math.round(len / (P * 0.9))); for (let q = 0; q < nb; q++) { const bx = sx + (q + 0.5) * (ex - sx) / nb + (H(r, q + 70) - 0.5) * P * 0.1, by = cy + hh * (0.3 - H(r, q + 71) * 0.3); x.fillStyle = 'rgba(40,10,0,0.4)'; ellipse(x, bx + P * 0.01, by + P * 0.015, P * 0.075, hh * 0.42, 0.2); x.fill(); x.fillStyle = '#eadfc8'; ellipse(x, bx, by, P * 0.07, hh * 0.4, 0.2); x.fill(); x.fillStyle = '#c8a880'; ellipse(x, bx, by, P * 0.034, hh * 0.2, 0.2); x.fill(); } // LA-galbi: little cross-cut rib bones along the strip
            if (!small) for (let q = 0; q < len / P * 7; q++) { const qx = sx + H(r * 31 + q, 7) * (ex - sx), qy = cy + (H(r * 31 + q, 8) - 0.5) * hh * 1.6; x.fillStyle = '#f4e8c8'; ellipse(x, qx, qy, P * 0.016, P * 0.008, H(q, r) * 3); x.fill(); } // sesame
            if (!small) for (let q = 0; q < len / P * 1.4; q++) { const qx = sx + H(r * 17 + q, 9) * (ex - sx), qy = cy + (H(r * 17 + q, 10) - 0.5) * hh; x.strokeStyle = '#7ab040'; x.lineWidth = lw(0.022); x.beginPath(); x.arc(qx, qy, P * 0.035, 0, TAU); x.stroke(); } } }); }); // scallion rings
        M.form('rgba(255,200,150,0.18)', 'rgba(20,4,0,0.45)'); break; }
      case 'gyeranjjim': { M.fill('#b07a18'); M.piece(() => { // steamed egg puffed up in soft golden domes, browned at the rim
        x.fillStyle = M.rad(X0 + BW * 0.45, Y0 + BH * 0.4, Math.max(BW, BH) * 0.75, [[0, '#f4cc58'], [1, '#c8901e']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 1.6, 11, 0.16)) { const R = P * (0.4 + H(i, 12) * 0.14);
          x.fillStyle = 'rgba(160,100,10,0.16)'; M.blob(u + P * 0.02, v + P * 0.04, R, i * 3 + 1, 9, 0.2); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.4, R * 1.4, [[0, '#fbe490'], [0.6, '#f4cc58'], [1, '#e8b640']]); M.blob(u, v, R, i * 3 + 1, 9, 0.2); x.fill(); } // soft custard puffs, low contrast
        if (!small) { x.strokeStyle = 'rgba(190,120,20,0.35)'; x.lineWidth = lw(0.01); for (const [u, v, i] of M.pts(A * 2, 17, 0.1)) { x.beginPath(); x.moveTo(u, v); x.lineTo(u + (H(i, 18) - 0.5) * P * 0.3, v + (H(i, 19) - 0.5) * P * 0.2); x.lineTo(u + (H(i, 20) - 0.5) * P * 0.4, v + (H(i, 21) - 0.5) * P * 0.3); x.stroke(); } } // the soft cracks where it puffed
        if (!small) for (const [u, v, i] of M.pts(A * 30, 13, 0.04)) { x.fillStyle = 'rgba(200,140,30,0.3)'; x.beginPath(); x.arc(u, v, P * 0.012, 0, TAU); x.fill(); } // steam pores
        if (!small) for (const [u, v, i] of M.pts(A * 2, 14, 0.12)) { x.fillStyle = '#5aa030'; ellipse(x, u, v, P * 0.04, P * 0.02, H(i, 15) * 3); x.fill(); x.fillStyle = '#c8e890'; ellipse(x, u - P * 0.008, v - P * 0.005, P * 0.02, P * 0.008, H(i, 15) * 3); x.fill(); } // scallion
        if (!small) for (const [u, v] of M.pts(A * 4, 16, 0.08)) { x.fillStyle = '#2a1a10'; ellipse(x, u, v, P * 0.014, P * 0.007, 0.6); x.fill(); } }); // black sesame
        M.form('rgba(255,250,220,0.24)', 'rgba(120,70,0,0.34)'); break; }
      case 'kimchi': { M.fill('#6a1408'); M.piece(() => { // napa kimchi: folded leaves in red chilli paste, pale ribs showing, glossy
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#c84226'], [1, '#86200e']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 2.2, 21, 0.12)) { const R = P * (0.38 + H(i, 22) * 0.1), rot = H(i, 23) * TAU; x.save(); x.translate(u, v); x.rotate(rot); x.scale(1.25, 0.82);
          x.fillStyle = 'rgba(50,6,0,0.4)'; M.blob(P * 0.02, P * 0.035, R, i * 5 + 2, 11, 0.5); x.fill();
          x.fillStyle = M.lin(0, -R, 0, R, [[0, '#f2dcb0'], [0.2, '#eab088'], [0.34, '#d84a2a'], [1, '#8a1a0a']]); M.blob(0, 0, R, i * 5 + 2, 11, 0.5); x.fill(); // pale rib along one edge, red leaf
          x.strokeStyle = 'rgba(110,14,4,0.45)'; x.lineWidth = lw(0.014); for (let q = 0; q < 3; q++) { x.beginPath(); x.moveTo(-R * (0.8 - q * 0.2), R * (0.1 + q * 0.2)); x.quadraticCurveTo(0, R * (0.3 + q * 0.2) * (H(i, q) - 0.3), R * (0.7 - q * 0.1), R * (0.2 + q * 0.18)); x.stroke(); } // crumple folds
          x.fillStyle = 'rgba(255,220,200,0.32)'; ellipse(x, -R * 0.2, -R * 0.4, R * 0.4, R * 0.1, -0.2); x.fill(); x.restore(); }
        if (!small) for (const [u, v, i] of M.pts(A * 44, 24, 0.03)) { x.fillStyle = H(i, 25) < 0.6 ? 'rgba(150,20,8,0.7)' : 'rgba(255,120,70,0.6)'; x.fillRect(u, v, P * 0.022, P * 0.014); } // chilli flakes
        if (!small) for (const [u, v, i] of M.pts(A * 1.5, 26, 0.12)) { x.fillStyle = '#5a9a2a'; x.fillRect(u - P * 0.08, v, P * 0.16, P * 0.022); } }); // a few chive pieces
        M.form('rgba(255,200,170,0.2)', 'rgba(50,6,0,0.42)'); break; }
      case 'samgyeop': { M.fill('#5a2a20'); M.piece(() => { // pork-belly strips: pink meat / white fat layers, seared grill bars across
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / (P * 0.5)));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * sp / rows, hh = sp / rows * 0.44, sx = P * 0.05, ex = len - P * 0.05, sd = r * 7 + 3;
            const strip = (dx, dy) => { x.beginPath(); roundRect(x, sx + dx, cy - hh + dy, ex - sx, hh * 2, hh * 0.3); };
            x.fillStyle = 'rgba(30,8,4,0.45)'; strip(P * 0.02, P * 0.035); x.fill();
            x.fillStyle = '#f2e2d2'; strip(0, 0); x.fill();
            x.save(); strip(0, 0); x.clip();
            const layers = [[-1, -0.62, '#f4e6d8'], [-0.62, -0.18, '#d88a80'], [-0.18, 0.02, '#f0ddcc'], [0.02, 0.5, '#c87268'], [0.5, 0.66, '#eedac8'], [0.66, 1, '#b8645a']];
            for (const [a0, a1, col] of layers) { x.fillStyle = col; x.beginPath(); x.moveTo(sx - P, cy + a0 * hh); for (let q = 0; q <= 10; q++) { const qx = sx + q * (ex - sx) / 10; x.lineTo(qx, cy + a1 * hh + (H(sd * 11 + q, a1 * 10 + 20) - 0.5) * hh * 0.16); } x.lineTo(ex + P, cy + a0 * hh); x.closePath(); x.fill(); } // meat and fat layers, slightly wavy
            x.fillStyle = 'rgba(120,50,20,0.28)'; x.fillRect(sx, cy - hh, ex - sx, hh * 2); // a light all-over sear
            x.fillStyle = 'rgba(70,24,8,0.42)'; for (let q = 0; q < len / (P * 0.5) + 1; q++) { const qx = sx + P * 0.18 + q * P * 0.5 + (H(sd, q) - 0.5) * P * 0.06; x.beginPath(); x.moveTo(qx, cy - hh); x.lineTo(qx + P * 0.06, cy - hh); x.lineTo(qx + P * 0.06 + hh * 0.5, cy + hh); x.lineTo(qx + hh * 0.5, cy + hh); x.closePath(); x.fill(); } // the grill bars
            x.fillStyle = 'rgba(255,246,230,0.36)'; x.fillRect(sx, cy - hh * 0.9, ex - sx, hh * 0.14); x.restore(); } }); });
        M.form('rgba(255,236,220,0.2)', 'rgba(40,10,4,0.4)'); break; }
      case 'sangchu': { M.fill('#2a4a14'); M.piece(() => { // one frilly lettuce leaf per cell, overlapping: bright green, pale centre vein
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P + (H(a * 3 + c, 1) - 0.5) * P * 0.06, cy = (c + 0.5) * P, R = P * 0.56, sd = a * 7 + c * 3 + 1, rot = (H(sd, 2) - 0.5) * 0.6;
          x.save(); x.translate(cx, cy); x.rotate(rot);
          const leaf = (dx, dy) => { x.beginPath(); for (let q = 0; q <= 40; q++) { const an = q / 40 * TAU, fr = 1 + Math.sin(an * 11 + sd) * 0.06 + (H(sd * 40 + q, 3) - 0.5) * 0.06; const rr = R * fr * (0.82 + 0.18 * Math.abs(Math.sin(an))); const px = Math.cos(an) * rr * 0.86 + dx, py = Math.sin(an) * rr + dy; q ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); };
          x.fillStyle = 'rgba(10,30,0,0.4)'; leaf(P * 0.02, P * 0.04); x.fill();
          x.fillStyle = M.rad(-R * 0.2, -R * 0.3, R * 1.3, [[0, '#b8e070'], [0.55, '#7ab842'], [1, '#3e7a22']]); leaf(0, 0); x.fill();
          x.strokeStyle = 'rgba(40,90,20,0.35)'; x.lineWidth = lw(0.012); for (let q = 0; q < 6; q++) { const an = -Math.PI / 2 + (q - 2.5) * 0.45; x.beginPath(); x.moveTo(0, R * 0.5); x.quadraticCurveTo(Math.cos(an) * R * 0.3, Math.sin(an) * R * 0.2, Math.cos(an) * R * 0.75, Math.sin(an) * R * 0.8); x.stroke(); } // ruffle folds
          x.strokeStyle = 'rgba(236,250,210,0.75)'; x.lineWidth = lw(0.04); x.beginPath(); x.moveTo(0, R * 0.8); x.quadraticCurveTo(R * 0.05, 0, -R * 0.02, -R * 0.6); x.stroke(); // the pale vein
          x.fillStyle = 'rgba(255,255,230,0.28)'; ellipse(x, -R * 0.3, -R * 0.35, R * 0.3, R * 0.1, -0.5); x.fill(); x.restore(); } });
        M.form('rgba(230,255,200,0.2)', 'rgba(10,30,0,0.4)'); break; }
      case 'japchae': { M.fill('#3a2c22'); M.piece(() => { // a glossy tangle of sweet-potato glass noodles with carrot, spinach, mushroom and egg strips
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#4a3a2e'], [1, '#2a1e16']]); M.all(x.fillStyle);
        x.lineCap = 'round'; for (let k = 0; k < A * 12; k++) { const y0 = Y0 + H(k, 31) * BH, x0 = X0 - P * 0.3 + H(k, 32) * P * 0.4, amp = P * (0.05 + H(k, 33) * 0.1), fr = 2 + H(k, 34) * 3, ph = H(k, 35) * TAU, tilt = (H(k, 36) - 0.5) * 0.6;
          const wv = () => { x.beginPath(); for (let q = 0; q <= 40; q++) { const px = x0 + q / 40 * (BW + P * 0.6); const py = y0 + Math.sin(q / 40 * TAU * fr / 2 + ph) * amp + (px - X0) * tilt * 0.3; q ? x.lineTo(px, py) : x.moveTo(px, py); } };
          x.strokeStyle = 'rgba(20,12,6,0.4)'; x.lineWidth = lw(0.05); x.save(); x.translate(P * 0.01, P * 0.02); wv(); x.stroke(); x.restore();
          x.strokeStyle = k % 3 ? '#7a6250' : '#6a5242'; x.lineWidth = lw(0.044); wv(); x.stroke();
          x.strokeStyle = 'rgba(250,236,220,0.55)'; x.lineWidth = lw(0.012); x.save(); x.translate(-P * 0.006, -P * 0.01); wv(); x.stroke(); x.restore(); } // translucent noodles, sesame-oil shine
        if (!small) for (const [u, v, i] of M.pts(A * 6, 37, 0.08)) { const col = ['#e8783a', '#2e6a20', '#5a3a24', '#f0cc50'][i % 4], an = H(i, 38) * TAU, L0 = P * (0.18 + H(i, 39) * 0.1); x.strokeStyle = col; x.lineWidth = lw(0.04); x.beginPath(); x.moveTo(u - Math.cos(an) * L0 / 2, v - Math.sin(an) * L0 / 2); x.lineTo(u + Math.cos(an) * L0 / 2, v + Math.sin(an) * L0 / 2); x.stroke(); } // carrot · spinach · shiitake · egg ribbon
        if (!small) for (const [u, v] of M.pts(A * 5, 40, 0.06)) { x.fillStyle = '#f4e8c8'; ellipse(x, u, v, P * 0.014, P * 0.007, 0.5); x.fill(); } });
        M.form('rgba(255,236,210,0.2)', 'rgba(20,10,0,0.42)'); break; }
      case 'kongnamul': { M.fill('#8a8058'); M.piece(() => { // seasoned soybean sprouts: curved white stems, yellow heads, a sesame-oil sheen
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#d8ccaa'], [1, '#a89a70']]); M.all(x.fillStyle);
        x.lineCap = 'round'; for (const [u, v, i] of M.pts(A * 30, 51, 0.04)) { const L0 = P * (0.36 + H(i, 52) * 0.18), an = H(i, 53) * TAU, bend = (H(i, 54) - 0.5) * P * 0.2, ex = u + Math.cos(an) * L0, ey = v + Math.sin(an) * L0, mx = (u + ex) / 2 + Math.sin(an) * bend, my = (v + ey) / 2 - Math.cos(an) * bend;
          x.strokeStyle = 'rgba(80,70,30,0.35)'; x.lineWidth = lw(0.05); x.beginPath(); x.moveTo(u + P * 0.01, v + P * 0.02); x.quadraticCurveTo(mx + P * 0.01, my + P * 0.02, ex + P * 0.01, ey + P * 0.02); x.stroke();
          x.strokeStyle = H(i, 55) < 0.5 ? '#f8f4e4' : '#ece4cc'; x.lineWidth = lw(0.036); x.beginPath(); x.moveTo(u, v); x.quadraticCurveTo(mx, my, ex, ey); x.stroke();
          x.fillStyle = M.rad(u - P * 0.02, v - P * 0.02, P * 0.07, [[0, '#fff0a0'], [1, '#e0b838']]); ellipse(x, u, v, P * 0.07, P * 0.05, an); x.fill(); } // the bean head
        if (!small) for (const [u, v] of M.pts(A * 5, 56, 0.06)) { x.fillStyle = '#f4e8c8'; ellipse(x, u, v, P * 0.014, P * 0.007, 0.5); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A, 57, 0.12)) { x.fillStyle = '#5a9a2a'; ellipse(x, u, v, P * 0.04, P * 0.018, H(i, 58) * 3); x.fill(); } });
        M.form('rgba(255,252,230,0.22)', 'rgba(70,60,20,0.34)'); break; }
    }
  },
});
