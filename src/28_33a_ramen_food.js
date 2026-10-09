/* ---- Ramen Yokocho blocks: seven things from a bowl of ramen, each piece one continuous mass ----
   I menma (a loose criss-cross pile of soy-braised bamboo-shoot strips, tapered, fibrous) · O nori (dark green sheets, seaweed
   fibre texture, a crisp sheen) · T naruto (white fish-cake rounds with the pink spiral and crimped edge) · S chāshū (rolled
   pork-belly slices: seared rim, a crescent of fat, rosy meat with broken fat seams) · Z negi (green-onion rings, bright and fresh, white cores)
   · J noodles (a wavy nest of yellow alkaline noodles, glossy with broth) · L beni shōga (shreds of red pickled ginger) */
const RamenFood = remakeFood('ramen', {
  premiumOpts: { R: 0.2, grain: { nori: 0.1, naruto: 0.05 }, lift: {} },
  FOOD: [null, 'menma', 'nori', 'naruto', 'chashu', 'negi', 'noodles', 'shoga'],
  MAIN: [null, '#c89a4a', '#1e2e1c', '#f4f0e8', '#a8604a', '#7ab048', '#eccf6a', '#c42a3a'],
  soft: { menma: 1.0, nori: 0.8, naruto: 1.3, chashu: 1.3, negi: 1.1, noodles: 1.3, shoga: 1.1 },
  boardBg: 'rgba(16,14,14,0.94)', grid: 'rgba(255,230,190,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 631), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'menma': { M.fill('#6a4418'); M.piece(() => { // a loose pile of amber bamboo-shoot strips: soy-braised, tapered, fibrous, criss-crossed like they sit in the bowl
        for (const [u, v, i] of M.pts(A * 9, 3, 0.08)) { const sl = P * (0.3 + H(i, 4) * 0.14), hh = P * (0.11 + H(i, 10) * 0.04), tp = 0.7 + H(i, 11) * 0.2, tone = H(i, 12), rot = (H(i, 13) - 0.5) * 1.2;
          x.save(); x.translate(u, v); x.rotate(rot); const hl = sl;
          const strip = (dx, dy) => { x.beginPath(); x.moveTo(-hl + dx, -hh + dy); x.lineTo(hl + dx, -hh * tp + dy); x.quadraticCurveTo(hl + hh * 0.5 + dx, dy, hl + dx, hh * tp + dy); x.lineTo(-hl + dx, hh + dy); x.quadraticCurveTo(-hl - hh * 0.4 + dx, dy, -hl + dx, -hh + dy); x.closePath(); };
          x.fillStyle = 'rgba(20,8,0,0.5)'; strip(P * 0.015, P * 0.03); x.fill();
          const c0 = tone < 0.35 ? ['#b07a34', '#8a5420', '#5e3410'] : tone < 0.8 ? ['#cc9a4c', '#a8722e', '#74481a'] : ['#deb064', '#bc8a40', '#8a5e26'];
          x.fillStyle = M.lin(0, -hh, 0, hh, [[0, c0[0]], [0.5, c0[1]], [1, c0[2]]]); strip(0, 0); x.fill();
          if (!small) { x.strokeStyle = 'rgba(70,40,10,0.4)'; x.lineWidth = lw(0.007); for (let q = 0; q < 3; q++) { const yy = -hh * 0.55 + q * hh * 0.55; x.beginPath(); x.moveTo(-hl + P * 0.03, yy); x.lineTo(hl - P * 0.03, yy * (0.85 + H(q, i) * 0.1)); x.stroke(); } }
          x.fillStyle = 'rgba(255,230,180,0.3)'; x.fillRect(-hl + P * 0.04, -hh * 0.7, sl * 1.2, hh * 0.28); x.restore(); } });
        M.form('rgba(255,230,180,0.2)', 'rgba(50,24,0,0.38)'); break; }
      case 'nori': { M.fill('#0e160c'); M.piece(() => { // sheets of nori, one per cell, slightly overlapping
        for (const [a, c] of M.cells) { const s0 = P * 0.94, cx = (a + 0.5) * P + (H(a * 3 + c, 1) - 0.5) * P * 0.04, cy = (c + 0.5) * P + (H(a * 3 + c, 2) - 0.5) * P * 0.04, rot = (H(a + c * 5, 3) - 0.5) * 0.1;
          x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(-s0 / 2 + P * 0.02, -s0 / 2 + P * 0.035, s0, s0);
          x.fillStyle = M.lin(-s0 / 2, -s0 / 2, s0 / 2, s0 / 2, [[0, '#2e402c'], [0.5, '#1c2a1c'], [1, '#101a10']]); x.fillRect(-s0 / 2, -s0 / 2, s0, s0);
          if (!small) for (let k = 0; k < 40; k++) { x.fillStyle = H(k + a * 40, 4) < 0.5 ? 'rgba(120,150,90,0.3)' : 'rgba(0,10,0,0.35)'; ellipse(x, (H(a * 40 + k + c, 5) - 0.5) * s0 * 0.94, (H(a * 40 + k + c * 3, 6) - 0.5) * s0 * 0.94, P * 0.04, P * 0.01, H(k, 7) * 3); x.fill(); } // seaweed fibre
          x.fillStyle = M.lin(-s0 / 2, -s0 / 2, s0 / 2, s0 / 2, [[0, 'rgba(170,200,190,0)'], [0.45, 'rgba(170,200,190,0.16)'], [0.6, 'rgba(170,200,190,0)']]); x.fillRect(-s0 / 2, -s0 / 2, s0, s0); /* a cool, crisp diagonal sheen */ x.strokeStyle = 'rgba(150,180,120,0.3)'; x.lineWidth = lw(0.012); x.strokeRect(-s0 / 2, -s0 / 2, s0, s0); x.restore(); } });
        M.form('rgba(200,230,180,0.16)', 'rgba(0,0,0,0.45)'); break; }
      case 'naruto': { M.fill('#c8c0b4'); M.piece(() => { // white fish-cake rounds with the pink spiral and crimped edge
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, R = P * 0.47, r0 = H(a * 7 + c, 3) * TAU;
          const crimp = (dx, dy) => { x.beginPath(); for (let q = 0; q <= 48; q++) { const an = q / 48 * TAU, rr = R * (0.93 + (q % 2) * 0.07); q ? x.lineTo(cx + dx + Math.cos(an) * rr, cy + dy + Math.sin(an) * rr) : x.moveTo(cx + dx + Math.cos(an) * rr, cy + dy + Math.sin(an) * rr); } x.closePath(); };
          x.fillStyle = 'rgba(60,50,40,0.35)'; crimp(P * 0.02, P * 0.035); x.fill();
          x.fillStyle = M.rad(cx - R * 0.3, cy - R * 0.35, R * 1.4, [[0, '#ffffff'], [0.6, '#f6f2ea'], [1, '#d8d0c2']]); crimp(0, 0); x.fill();
          x.strokeStyle = '#e0607a'; x.lineWidth = lw(0.07); x.lineCap = 'round'; x.beginPath(); for (let q = 0; q <= 50; q++) { const an = r0 + q * 0.2, rr = R * (0.06 + q * 0.0138); q ? x.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr) : x.moveTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr); } x.stroke();
          x.fillStyle = 'rgba(255,255,255,0.65)'; ellipse(x, cx - R * 0.34, cy - R * 0.42, R * 0.24, R * 0.08, -0.5); x.fill(); } });
        M.form('rgba(255,255,255,0.22)', 'rgba(70,60,50,0.3)'); break; }
      case 'chashu': { M.fill('#2a1008'); M.piece(() => { // rolled pork-belly slices: dark seared rim, a crescent of soft fat, rosy-beige meat with broken, wavering fat seams (no candy spiral)
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P + (H(a * 5 + c, 1) - 0.5) * P * 0.05, cy = (c + 0.5) * P + (H(a * 5 + c, 2) - 0.5) * P * 0.05, R = P * 0.49, r0 = H(a + c * 7, 3) * TAU, sd = a * 11 + c * 3;
          x.fillStyle = 'rgba(20,6,0,0.45)'; M.blob(cx + P * 0.02, cy + P * 0.035, R, sd, 10, 0.12); x.fill();
          x.fillStyle = M.rad(cx - R * 0.3, cy - R * 0.3, R * 1.3, [[0, '#8a4420'], [1, '#4a1e0c']]); M.blob(cx, cy, R, sd, 10, 0.12); x.fill(); // tare-seared rim
          x.fillStyle = '#e2c8a6'; M.blob(cx, cy, R * 0.88, sd, 10, 0.12); x.fill(); // the fat layer just under the rim
          x.fillStyle = M.rad(cx - R * 0.2, cy - R * 0.2, R * 0.8, [[0, '#d8a090'], [0.65, '#b87462'], [1, '#94503e']]); M.blob(cx + Math.cos(r0) * R * 0.06, cy + Math.sin(r0) * R * 0.06, R * 0.79, sd + 5, 9, 0.2); x.fill(); // meat, off-centre so the fat is a crescent
          x.strokeStyle = 'rgba(244,226,206,0.62)'; x.lineCap = 'round'; for (let q = 0; q < 3; q++) { const rr = R * (0.22 + q * 0.16), a0 = r0 + q * 2.1 + H(sd, q) * 1.2, sw = 1.4 + H(sd, q + 4) * 1.6; x.lineWidth = lw(0.016 + H(sd, q + 8) * 0.016); x.beginPath(); for (let s = 0; s <= 12; s++) { const an = a0 + s / 12 * sw, wob = 1 + (H(sd * 13 + s, q) - 0.5) * 0.18; s ? x.lineTo(cx + Math.cos(an) * rr * wob, cy + Math.sin(an) * rr * wob) : x.moveTo(cx + Math.cos(an) * rr * wob, cy + Math.sin(an) * rr * wob); } x.stroke(); } // broken fat seams
          if (!small) { x.fillStyle = 'rgba(110,50,30,0.25)'; for (let q = 0; q < 8; q++) { const an = H(sd, q + 20) * TAU, d = R * H(sd, q + 30) * 0.6; ellipse(x, cx + Math.cos(an) * d, cy + Math.sin(an) * d, P * 0.03, P * 0.012, an); x.fill(); } } // meat fibre
          x.fillStyle = 'rgba(255,230,210,0.3)'; ellipse(x, cx - R * 0.32, cy - R * 0.42, R * 0.28, R * 0.09, -0.5); x.fill(); } });
        M.form('rgba(255,210,190,0.2)', 'rgba(30,8,0,0.42)'); break; }
      case 'negi': { M.fill('#6a9a3a'); M.piece(() => { // a heap of fresh green-onion rings
        for (const [u, v, i] of M.pts(A * 11, 21, 0.06)) { const R = P * (0.09 + H(i, 22) * 0.05), sq = 0.6 + H(i, 23) * 0.4, rot = H(i, 24) * TAU, white = H(i, 25) < 0.4;
          x.save(); x.translate(u, v); x.rotate(rot); x.fillStyle = 'rgba(10,20,0,0.4)'; x.beginPath(); x.ellipse(P * 0.012, P * 0.02, R, R * sq, 0, 0, TAU); x.fill();
          x.fillStyle = white ? '#e8f0d0' : M.lin(-R, -R, R, R, [[0, '#b8e070'], [1, '#5a9a2a']]); x.beginPath(); x.ellipse(0, 0, R, R * sq, 0, 0, TAU); x.fill();
          x.fillStyle = white ? 'rgba(200,220,170,0.9)' : 'rgba(230,248,200,0.9)'; x.beginPath(); x.ellipse(0, 0, R * 0.62, R * sq * 0.62, 0, 0, TAU); x.fill();
          x.fillStyle = 'rgba(60,110,30,0.5)'; x.beginPath(); x.ellipse(0, 0, R * 0.36, R * sq * 0.36, 0, 0, TAU); x.fill(); x.restore(); } });
        M.form('rgba(220,250,190,0.18)', 'rgba(10,26,0,0.4)'); break; }
      case 'noodles': { M.fill('#8a6a1a'); M.piece(() => { // a wavy nest of yellow noodles glossed with broth
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#d8b048'], [1, '#9a7420']]); M.all(x.fillStyle);
        x.lineCap = 'round'; const n = Math.round(A * 9); for (let k = 0; k < n; k++) { const [a, c] = M.cells[k % A], y0 = (c + H(k, 31)) * P, x0 = (a - 0.3) * P, dir = H(k, 32) < 0.5 ? 1 : -1, amp = P * (0.05 + H(k, 33) * 0.04), fr = 9 + H(k, 34) * 6;
          const wv = () => { x.beginPath(); for (let q = 0; q <= 24; q++) { const px = x0 + q / 24 * P * 1.6, py = y0 + Math.sin(q / 24 * fr + k) * amp + dir * q / 24 * P * 0.25; q ? x.lineTo(px, py) : x.moveTo(px, py); } };
          x.strokeStyle = 'rgba(90,60,0,0.45)'; x.lineWidth = lw(0.075); x.save(); x.translate(P * 0.01, P * 0.02); wv(); x.stroke(); x.restore();
          x.strokeStyle = k % 3 ? '#f2d470' : '#e8c458'; x.lineWidth = lw(0.06); wv(); x.stroke();
          x.strokeStyle = 'rgba(255,250,210,0.6)'; x.lineWidth = lw(0.016); x.save(); x.translate(-P * 0.008, -P * 0.014); wv(); x.stroke(); x.restore(); } });
        M.form('rgba(255,245,200,0.2)', 'rgba(80,50,0,0.36)'); break; }
      case 'shoga': { M.fill('#5a0e16'); M.piece(() => { // shreds of red pickled ginger
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#a82030'], [1, '#6a101a']]); M.all(x.fillStyle);
        x.lineCap = 'round'; for (const [u, v, i] of M.pts(A * 22, 41, 0.04)) { const L0 = P * (0.14 + H(i, 42) * 0.16), an = H(i, 43) * TAU, bend = (H(i, 44) - 0.5) * P * 0.1;
          const sh = (dx, dy) => { x.beginPath(); x.moveTo(u - Math.cos(an) * L0 / 2 + dx, v - Math.sin(an) * L0 / 2 + dy); x.quadraticCurveTo(u + Math.sin(an) * bend + dx, v - Math.cos(an) * bend + dy, u + Math.cos(an) * L0 / 2 + dx, v + Math.sin(an) * L0 / 2 + dy); };
          x.strokeStyle = 'rgba(40,0,6,0.45)'; x.lineWidth = lw(0.05); sh(P * 0.01, P * 0.02); x.stroke();
          x.strokeStyle = H(i, 45) < 0.5 ? '#e0404e' : '#c42a3a'; x.lineWidth = lw(0.04); sh(0, 0); x.stroke();
          x.strokeStyle = 'rgba(255,190,190,0.5)'; x.lineWidth = lw(0.012); sh(-P * 0.006, -P * 0.01); x.stroke(); } });
        M.form('rgba(255,180,180,0.18)', 'rgba(40,0,6,0.42)'); break; }
    }
  },
});
