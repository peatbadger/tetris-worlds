/* ---- Patisserie blocks: seven pastries from a Paris shop window, each piece one continuous mass ----
   I éclair (golden choux under a thick glossy chocolate glaze) · O macarons (rose shells with ruffled feet and a
   ganache line, one per cell, seen from the side) · T tarte aux fraises (glazed strawberry halves on crème
   pâtissière) · S croissants (laminated crescents, deep gold ridges, flaky shine) · Z mille-feuille (white fondant
   feathered with chocolate chevrons, flaky pastry showing on the lower edge) · J tarte au citron (glossy lemon curd
   with torched meringue peaks) · L pistache (piped pistachio cream rosettes with chopped pistachios) */
const PatisserieFood = remakeFood('patisserie', {
  premiumOpts: { R: 0.2, grain: { croissant: 0.06, millefeuille: 0.03 }, lift: { croissant: 'brightness(0.86) contrast(1.06) saturate(1.04)', citron: 'brightness(0.92) contrast(1.06) saturate(1.08)', macaron: 'brightness(1.12)', fraise: 'brightness(0.92) contrast(1.06) saturate(1.08)', millefeuille: 'brightness(1.04) contrast(1.04)' } },
  FOOD: [null, 'eclair', 'macaron', 'fraise', 'croissant', 'millefeuille', 'citron', 'pistache'],
  MAIN: [null, '#4a2414', '#e8a0aa', '#c8303a', '#c8862a', '#f2ead8', '#f0d040', '#8ab45a'],
  soft: { eclair: 1.0, macaron: 1.3, fraise: 1.1, croissant: 1.2, millefeuille: 0.9, citron: 1.0, pistache: 1.2 },
  boardBg: 'rgba(22,18,24,0.94)', grid: 'rgba(255,230,220,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 811), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'eclair': { M.fill('#2a160c'); M.piece(() => { // éclairs along the piece: golden choux sides, a thick glossy chocolate glaze on top
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / (P * 0.5)));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * sp / rows, hh = sp / rows * 0.44, sx = P * 0.05, ex = len - P * 0.05;
            const cap = (dx, dy, k) => { x.beginPath(); roundRect(x, sx + dx, cy - hh * k + dy, ex - sx, hh * 2 * k, hh * k); };
            x.fillStyle = 'rgba(20,8,0,0.45)'; cap(P * 0.02, P * 0.04, 1); x.fill();
            x.fillStyle = M.lin(0, cy - hh, 0, cy + hh, [[0, '#d8a050'], [0.5, '#c88638'], [1, '#8a5420']]); cap(0, 0, 1); x.fill(); // the choux
            if (!small) { x.fillStyle = 'rgba(120,70,20,0.35)'; for (let q = 0; q < len / P * 6; q++) { x.beginPath(); x.arc(sx + H(r * 50 + q, 1) * (ex - sx), cy + hh * (0.4 + H(r * 50 + q, 2) * 0.5), P * 0.014, 0, TAU); x.fill(); } } // baked pores
            x.save(); cap(0, -hh * 0.14, 0.78); x.clip();
            x.fillStyle = M.lin(0, cy - hh, 0, cy + hh * 0.6, [[0, '#6a3420'], [0.5, '#3e1a0c'], [1, '#2a1006']]); x.fillRect(sx, cy - hh, ex - sx, hh * 2); // glaze
            x.fillStyle = 'rgba(255,230,210,0.5)'; roundRect(x, sx + hh * 0.6, cy - hh * 0.62, (ex - sx) - hh * 1.6, hh * 0.12, hh * 0.06); x.fill(); // the long glaze highlight
            x.fillStyle = 'rgba(255,240,230,0.25)'; roundRect(x, sx + hh * 0.9, cy - hh * 0.4, (ex - sx) * 0.4, hh * 0.08, hh * 0.04); x.fill(); x.restore();
            if (!small) for (let q = 0; q < Math.round(len / P); q++) { const gx = sx + (q + 0.5) * (ex - sx) / Math.round(len / P) + (H(r, q + 9) - 0.5) * P * 0.3; x.fillStyle = '#e8c45a'; x.beginPath(); x.moveTo(gx, cy - hh * 0.4); x.lineTo(gx + P * 0.04, cy - hh * 0.52); x.lineTo(gx + P * 0.07, cy - hh * 0.3); x.lineTo(gx + P * 0.02, cy - hh * 0.22); x.closePath(); x.fill(); } } }); }); // gold-leaf flecks
        M.form('rgba(255,220,190,0.16)', 'rgba(20,6,0,0.42)'); break; }
      case 'macaron': { M.fill('#5a3a40'); M.piece(() => { // one macaron per cell, seen from the side: domed rose shells, ruffled feet, a ganache line
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#8a6068'], [1, '#5a3a40']]); M.all(x.fillStyle);
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, w = P * 0.44, sd = a * 5 + c * 3, tone = ['#eca4b0', '#e48c9c', '#f0b8c0'][(a + c * 2) % 3];
          x.fillStyle = 'rgba(40,10,20,0.4)'; roundRect(x, cx - w + P * 0.02, cy - P * 0.34 + P * 0.04, w * 2, P * 0.68, P * 0.3); x.fill();
          const shell = (y0, flip) => { x.beginPath(); x.moveTo(cx - w, y0); x.bezierCurveTo(cx - w, y0 - flip * P * 0.2, cx + w, y0 - flip * P * 0.2, cx + w, y0); x.closePath(); };
          x.fillStyle = M.lin(0, cy - P * 0.34, 0, cy - P * 0.08, [[0, '#fbe0e4'], [0.4, tone], [1, shade(tone, -0.12)]]); shell(cy - P * 0.1, 1); x.fill(); // top shell dome
          x.fillStyle = shade(tone, -0.06); x.fillRect(cx - w, cy - P * 0.11, w * 2, P * 0.04); for (let q = 0; q < 9; q++) { x.fillStyle = shade(tone, q % 2 ? -0.16 : 0.04); x.fillRect(cx - w + q * w * 2 / 9, cy - P * 0.1, w * 2 / 9 - lw(0.006), P * 0.035); } // the ruffled foot
          x.fillStyle = '#f6ecd8'; roundRect(x, cx - w * 0.92, cy - P * 0.06, w * 1.84, P * 0.12, P * 0.04); x.fill(); x.fillStyle = 'rgba(200,170,140,0.4)'; x.fillRect(cx - w * 0.9, cy + P * 0.03, w * 1.8, P * 0.02); // ganache
          x.fillStyle = shade(tone, -0.08); x.fillRect(cx - w, cy + P * 0.06, w * 2, P * 0.04); for (let q = 0; q < 9; q++) { x.fillStyle = shade(tone, q % 2 ? 0.02 : -0.18); x.fillRect(cx - w + q * w * 2 / 9, cy + P * 0.065, w * 2 / 9 - lw(0.006), P * 0.03); }
          x.fillStyle = M.lin(0, cy + P * 0.08, 0, cy + P * 0.3, [[0, tone], [1, shade(tone, -0.2)]]); shell(cy + P * 0.1, -1); x.fill(); // bottom shell
          x.fillStyle = 'rgba(255,255,255,0.55)'; ellipse(x, cx - w * 0.36, cy - P * 0.22, w * 0.34, P * 0.03, -0.12); x.fill(); } });
        M.form('rgba(255,240,240,0.2)', 'rgba(40,10,20,0.4)'); break; }
      case 'fraise': { M.fill('#d8c49a'); M.piece(() => { // glazed strawberry halves standing in rows on vanilla crème pâtissière
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#f4e2b0'], [1, '#d8c08a']]); M.all(x.fillStyle);
        if (!small) for (const [u, v] of M.pts(A * 14, 61, 0.04)) { x.fillStyle = 'rgba(60,30,10,0.4)'; x.beginPath(); x.arc(u, v, P * 0.01, 0, TAU); x.fill(); } // vanilla seeds
        for (const [u, v, i] of M.pts(A * 3.4, 62, 0.14)) { const R = P * (0.25 + H(i, 63) * 0.05), rot = (H(i, 64) - 0.5) * 1.2; x.save(); x.translate(u, v); x.rotate(rot);
          const berry = () => { x.beginPath(); x.moveTo(0, R * 1.1); x.bezierCurveTo(-R * 1.1, R * 0.4, -R * 0.9, -R * 0.9, 0, -R * 0.9); x.bezierCurveTo(R * 0.9, -R * 0.9, R * 1.1, R * 0.4, 0, R * 1.1); x.closePath(); };
          x.save(); x.translate(P * 0.02, P * 0.04); x.fillStyle = 'rgba(60,20,0,0.35)'; berry(); x.fill(); x.restore();
          x.fillStyle = M.rad(-R * 0.2, -R * 0.3, R * 1.4, [[0, '#f0606a'], [0.6, '#d0283a'], [1, '#981426']]); berry(); x.fill();
          x.fillStyle = 'rgba(255,200,200,0.75)'; x.beginPath(); x.moveTo(0, R * 0.7); x.quadraticCurveTo(-R * 0.36, 0, 0, -R * 0.5); x.quadraticCurveTo(R * 0.36, 0, 0, R * 0.7); x.fill(); // the pale heart of the cut face
          x.strokeStyle = 'rgba(255,220,220,0.45)'; x.lineWidth = lw(0.008); for (let q = -2; q <= 2; q++) { x.beginPath(); x.moveTo(q * R * 0.15, -R * 0.6); x.quadraticCurveTo(q * R * 0.4, 0, q * R * 0.12, R * 0.9); x.stroke(); }
          x.fillStyle = 'rgba(255,255,255,0.6)'; ellipse(x, -R * 0.4, -R * 0.4, R * 0.18, R * 0.08, -0.6); x.fill(); x.restore(); } // the apricot glaze shine
        if (!small) for (const [u, v, i] of M.pts(A * 2, 65, 0.1)) { x.fillStyle = H(i, 66) < 0.5 ? '#7aa83a' : '#a8c860'; x.fillRect(u, v, P * 0.03, P * 0.022); } }); // pistachio crumbs
        M.form('rgba(255,250,230,0.2)', 'rgba(80,40,10,0.36)'); break; }
      case 'croissant': { M.fill('#5a3410'); M.piece(() => { // one laminated croissant per cell, crescents nested along the piece
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#8a5420'], [1, '#5a3410']]); M.all(x.fillStyle);
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, sd = a * 7 + c * 3, rot = (H(sd, 1) - 0.5) * 0.7 + ((a + c) % 2 ? 0.3 : -0.3); x.save(); x.translate(cx, cy); x.rotate(rot);
          const segs = 5, R = P * 0.5;
          for (const q of [0, 4, 1, 3, 2]) { const tq = (q + 0.5) / segs - 0.5, sx = tq * R * 1.62, sy = tq * tq * R * 1.6 - R * 0.12, rw = R * (0.3 - Math.abs(tq) * 0.26), rh = R * (0.62 - Math.abs(tq) * 0.6), an = tq * 1.3;
            x.fillStyle = 'rgba(40,16,0,0.4)'; ellipse(x, sx + P * 0.015, sy + P * 0.03, rw, rh, an); x.fill();
            x.fillStyle = M.lin(sx - rw, sy - rh, sx + rw, sy + rh, [[0, '#f4c068'], [0.45, '#d8902e'], [1, '#9a5414']]); ellipse(x, sx, sy, rw, rh, an); x.fill(); // each rolled layer
            x.strokeStyle = 'rgba(110,50,8,0.5)'; x.lineWidth = lw(0.012); x.beginPath(); x.ellipse(sx, sy, rw * 0.7, rh * 0.8, an, -2.4, -0.7); x.stroke();
            x.fillStyle = 'rgba(255,236,190,0.55)'; ellipse(x, sx - rw * 0.3, sy - rh * 0.4, rw * 0.4, rh * 0.12, an - 0.3); x.fill(); } // butter shine
          x.restore(); }
        if (!small) for (const [u, v] of M.pts(A * 6, 71, 0.06)) { x.fillStyle = 'rgba(255,220,160,0.5)'; x.fillRect(u, v, P * 0.03, P * 0.012); } }); // loose flakes
        M.form('rgba(255,230,180,0.18)', 'rgba(40,16,0,0.42)'); break; }
      case 'millefeuille': { M.fill('#c8a060'); M.piece(() => { // white fondant feathered with chocolate chevrons; flaky pastry showing along the lower edges
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, '#fbf6ea'], [1, '#ece2cc']]); M.all(x.fillStyle);
        x.strokeStyle = 'rgba(90,46,22,0.5)'; x.lineWidth = lw(0.02); const gap = P * 0.2;
        for (let k = -1; k < BH / gap + 1; k++) { const y0 = Y0 + k * gap + gap / 2; x.beginPath(); for (let q = 0; q <= BW / P * 8; q++) { const px = X0 + q * P / 8, ph = ((q / 2) | 0) % 2 ? 1 : -1; const dy = (q % 2 ? 0 : 1) * ph * gap * 0.35; q ? x.lineTo(px, y0 + dy) : x.moveTo(px, y0 + dy); } x.stroke(); } // chevron-feathered chocolate
        for (const [a, c] of M.bots()) { const yy = (c + 1) * P - P * 0.2; x.fillStyle = '#d8b070'; x.fillRect(a * P, yy, P, P * 0.2); for (let q = 0; q < 3; q++) { x.fillStyle = q % 2 ? '#f4ecd8' : '#b8843c'; x.fillRect(a * P, yy + q * P * 0.065, P, P * 0.03); } x.fillStyle = 'rgba(255,240,200,0.4)'; x.fillRect(a * P, yy, P, P * 0.012); } // pastry & cream layers
        x.fillStyle = 'rgba(255,255,255,0.5)'; for (const [a, c] of M.tops()) x.fillRect(a * P + P * 0.1, c * P + P * 0.06, P * 0.5, P * 0.03); });
        M.form('rgba(255,255,255,0.2)', 'rgba(90,60,20,0.34)'); break; }
      case 'citron': { M.fill('#a88a14'); M.piece(() => { // glossy lemon curd with a row of torched meringue peaks
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, '#fae070'], [1, '#e0b828']]); M.all(x.fillStyle);
        x.fillStyle = 'rgba(255,250,210,0.35)'; for (const [a, c] of M.cells) ellipse(x, (a + 0.35) * P, (c + 0.3) * P, P * 0.22, P * 0.05, -0.3), x.fill(); // the curd's gloss
        if (!small) for (const [u, v] of M.pts(A * 6, 81, 0.06)) { x.fillStyle = 'rgba(150,170,30,0.55)'; x.fillRect(u, v, P * 0.03, P * 0.008); } // zest
        for (const [u, v, i] of M.pts(A * 1.2, 82, 0.2)) { const R = P * (0.2 + H(i, 83) * 0.05);
          x.fillStyle = 'rgba(120,90,0,0.35)'; ellipse(x, u + P * 0.02, v + P * 0.04, R, R * 0.8); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.3, R * 1.3, [[0, '#ffffff'], [0.6, '#f6eedc'], [1, '#d8c8a8']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.2, v - R * 0.6, R * 1.1, [[0, '#ffffff'], [1, '#e8dcc4']]); x.beginPath(); x.moveTo(u - R * 0.6, v - R * 0.1); x.quadraticCurveTo(u - R * 0.1, v - R * 0.5, u + R * 0.2, v - R * 1.15); x.quadraticCurveTo(u + R * 0.2, v - R * 0.4, u + R * 0.6, v - R * 0.1); x.closePath(); x.fill(); // the pulled meringue peak
          x.strokeStyle = 'rgba(180,150,110,0.45)'; x.lineWidth = lw(0.01); x.beginPath(); x.arc(u, v, R * 0.62, 0.3, 2.6); x.stroke();
          x.fillStyle = M.rad(u + R * 0.18, v - R * 0.9, R * 0.5, [[0, 'rgba(140,70,16,0.9)'], [1, 'rgba(180,110,40,0)']]); x.beginPath(); x.arc(u + R * 0.18, v - R * 0.8, R * 0.5, 0, TAU); x.fill(); } }); // the torched tip
        M.form('rgba(255,255,220,0.22)', 'rgba(110,80,0,0.36)'); break; }
      case 'pistache': { M.fill('#3a4a1c'); M.piece(() => { // piped pistachio cream rosettes with chopped pistachios
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#7a9a48'], [1, '#4a6224']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 2.6, 91, 0.12)) { const R = P * (0.2 + H(i, 92) * 0.06);
          x.fillStyle = 'rgba(20,30,0,0.4)'; x.beginPath(); x.arc(u + P * 0.02, v + P * 0.04, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.3, [[0, '#d8ecb0'], [0.55, '#9ac068'], [1, '#6a8a3c']]); x.beginPath(); for (let q = 0; q <= 32; q++) { const an = q / 32 * TAU, rr = R * (0.84 + 0.16 * Math.cos(an * 8 + H(i, 96) * 6)); const px = u + Math.cos(an) * rr, py = v + Math.sin(an) * rr; q ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill(); // eight-point star-tip rosette
          x.strokeStyle = 'rgba(70,100,30,0.5)'; x.lineWidth = lw(0.012); for (let q = 0; q < 8; q++) { const an = q / 8 * TAU + H(i, 96) * 0.75; x.beginPath(); x.moveTo(u + Math.cos(an) * R * 0.12, v + Math.sin(an) * R * 0.12); x.quadraticCurveTo(u + Math.cos(an + 0.4) * R * 0.5, v + Math.sin(an + 0.4) * R * 0.5, u + Math.cos(an + 0.2) * R * 0.86, v + Math.sin(an + 0.2) * R * 0.86); x.stroke(); } // the star-tip ridges spiralling out
          x.fillStyle = 'rgba(250,255,230,0.5)'; ellipse(x, u - R * 0.3, v - R * 0.4, R * 0.3, R * 0.1, -0.5); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 8, 94, 0.05)) { x.fillStyle = H(i, 95) < 0.4 ? '#c8d878' : H(i, 95) < 0.7 ? '#5a8a2a' : '#a07858'; x.beginPath(); x.moveTo(u, v); x.lineTo(u + P * 0.03, v - P * 0.01); x.lineTo(u + P * 0.035, v + P * 0.02); x.closePath(); x.fill(); } }); // chopped nuts (green kernel, purple-brown skin)
        M.form('rgba(240,255,220,0.2)', 'rgba(20,30,0,0.4)'); break; }
    }
  },
});
