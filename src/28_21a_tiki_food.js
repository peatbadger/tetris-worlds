/* ---- Tiki Beach Shack blocks: seven tropical fruits, each piece one continuous mass of flesh ----
   I acai (deep purple, blueberries) · O dragon fruit (magenta, black seeds) · T watermelon (red, seeds, rind on the real bottom)
   · S kiwi (green, seed rays along a pale core) · Z papaya (orange, seed channel) · J pineapple (golden chunks) · L coconut (white flesh, shell on exposed edges) */
const TikiFood = remakeFood('tiki', {
  FOOD: [null, 'acai', 'dragon', 'watermelon', 'kiwi', 'papaya', 'pineapple', 'coconut'],
  MAIN: [null, '#4a1e4a', '#d02a7c', '#e8424a', '#5a9620', '#f08a3a', '#f2c838', '#f4f0e6'],
  soft: { acai: 1.4, dragon: 1.1, watermelon: 1.1, kiwi: 1.1, papaya: 1.1, pineapple: 1.0, coconut: 0.9 },
  boardBg: 'rgba(14,30,40,0.93)', grid: 'rgba(200,250,255,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 61), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'acai': { M.fill('#4a1e4a'); M.piece(() => {
        M.axis((len, sp) => { x.strokeStyle = 'rgba(130,70,140,0.45)'; x.lineWidth = P * 0.08; x.lineCap = 'round'; for (let k = 0; k < sp / P * 2.2; k++) { const v = (k + 0.5) * P / 2.2; x.beginPath(); for (let i = 0; i <= 20; i++) { const u = -P * 0.3 + (len + P * 0.6) * i / 20; const vv = v + Math.sin(u / P * 2 + k * 1.7) * P * 0.08; i ? x.lineTo(u, vv) : x.moveTo(u, vv); } x.stroke(); } });
        for (const [u, v, i] of M.pts(A * 3, 3, 0.12)) { const rr = P * (0.07 + H(i, 9) * 0.03); x.fillStyle = '#26204a'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,170,230,0.55)'; x.beginPath(); x.arc(u - rr * 0.35, v - rr * 0.35, rr * 0.28, 0, TAU); x.fill(); }
        if (!small) { x.fillStyle = 'rgba(240,220,170,0.8)'; for (const [u, v] of M.pts(A * 4, 11)) x.fillRect(u, v, lw(0.025), lw(0.02)); } });
        M.form('rgba(200,150,210,0.18)', 'rgba(10,0,14,0.4)'); break; }
      case 'dragon': { M.fill('#d02a7c'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, 'rgba(255,120,190,0.35)'], [1, 'rgba(120,0,60,0.2)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 30, 5, 0.02)) { const a = H(i, 7) * 3; x.fillStyle = 'rgba(255,170,215,0.35)'; ellipse(x, u, v, P * 0.035, P * 0.025, a); x.fill(); x.fillStyle = '#1a0a12'; ellipse(x, u, v, P * 0.018, P * 0.012, a); x.fill(); } });
        M.form('rgba(255,190,225,0.22)', 'rgba(70,0,30,0.4)'); break; }
      case 'watermelon': { M.fill('#e8424a'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 6, 13, 0.05)) { x.fillStyle = 'rgba(255,140,140,0.3)'; M.blob(u, v, P * 0.18, i, 7); x.fill(); }
        for (const [u, v, i] of M.pts(A * 3, 17, 0.18)) { x.save(); x.translate(u, v); x.rotate((H(i, 19) - 0.5) * 0.8); x.fillStyle = '#2a1410'; x.beginPath(); x.moveTo(0, -P * 0.06); x.quadraticCurveTo(P * 0.04, 0, 0, P * 0.05); x.quadraticCurveTo(-P * 0.04, 0, 0, -P * 0.06); x.fill(); x.restore(); }
        for (const [a, c] of M.bots()) { const sy = (c + 1) * P; x.fillStyle = '#f0f2d0'; x.fillRect(a * P - 1, sy - P * 0.26, P + 2, P * 0.1); x.fillStyle = '#4a9a3a'; x.fillRect(a * P - 1, sy - P * 0.17, P + 2, P * 0.17); x.fillStyle = '#2a6a2a'; for (let k = 0; k < 4; k++) x.fillRect(a * P + k * P * 0.25 + P * 0.05, sy - P * 0.17, P * 0.08, P * 0.17); } });
        M.form('rgba(255,200,200,0.2)', 'rgba(80,0,10,0.35)'); break; }
      case 'kiwi': { M.fill('#5a9620'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW / 2, Y0 + BH / 2, Math.max(BW, BH) * 0.7, [[0, 'rgba(150,200,80,0.25)'], [1, 'rgba(30,70,0,0.35)']]); M.all(x.fillStyle);
        const sk = M.skel(); x.lineCap = 'round';
        x.strokeStyle = 'rgba(170,210,100,0.4)'; x.lineWidth = P * 0.42; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        x.strokeStyle = '#eef4c8'; x.lineWidth = P * 0.15; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        sk.forEach(([a, b, c2, d], k) => { const dx = Math.sign(c2 - a), dy = Math.sign(d - b); for (let i = 0; i < 7; i++) { const u = (i + 0.5) / 7, px = a + (c2 - a) * u, py = b + (d - b) * u; for (const sd of [-1, 1]) { const o = P * (0.17 + H(k * 9 + i, sd + 3) * 0.05); x.fillStyle = '#1a1a10'; ellipse(x, px - dy * sd * o, py + dx * sd * o, P * (dy ? 0.034 : 0.016), P * (dy ? 0.016 : 0.034), 0); x.fill(); } } }); });
        M.form('rgba(230,255,190,0.2)', 'rgba(20,50,0,0.4)'); break; }
      case 'papaya': { M.fill('#f08a3a'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.3, Math.max(BW, BH) * 0.8, [[0, 'rgba(255,190,110,0.35)'], [1, 'rgba(200,80,20,0.3)']]); M.all(x.fillStyle);
        const sk = M.skel(); x.lineCap = 'round';
        x.strokeStyle = '#f8b070'; x.lineWidth = P * 0.36; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        sk.forEach(([a, b, c2, d], k) => { for (let i = 0; i < 9; i++) { const u = (i + 0.5) / 9, px = a + (c2 - a) * u + (H(k * 11 + i, 5) - 0.5) * P * 0.12, py = b + (d - b) * u + (H(k * 11 + i, 6) - 0.5) * P * 0.12; x.fillStyle = '#2a1a14'; x.beginPath(); x.arc(px, py, P * 0.05, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(px - P * 0.015, py - P * 0.015, P * 0.014, 0, TAU); x.fill(); } }); });
        M.form('rgba(255,220,170,0.22)', 'rgba(110,40,0,0.35)'); break; }
      case 'pineapple': { M.fill('#d8a420'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 5, 21, 0.1)) { x.save(); x.translate(u, v); x.rotate(H(i, 23) * 3); const q = P * (0.16 + H(i, 24) * 0.06); x.fillStyle = '#b07e10'; roundRect(x, -q + P * 0.02, -q * 0.7 + P * 0.03, q * 2, q * 1.4, q * 0.3); x.fill(); x.fillStyle = H(i, 25) < 0.5 ? '#f6d448' : '#f0c838'; roundRect(x, -q, -q * 0.7, q * 2, q * 1.4, q * 0.3); x.fill();
          x.strokeStyle = 'rgba(200,150,20,0.5)'; x.lineWidth = lw(0.015); for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(-q * 0.8, k * q * 0.22); x.lineTo(q * 0.8, k * q * 0.22); x.stroke(); } x.fillStyle = 'rgba(255,250,200,0.5)'; roundRect(x, -q * 0.7, -q * 0.6, q * 1.2, q * 0.3, q * 0.15); x.fill(); x.restore(); } });
        M.form('rgba(255,250,200,0.22)', 'rgba(100,60,0,0.35)'); break; }
      case 'coconut': { M.fill('#f4f0e6'); M.piece(() => {
        if (!small) { x.strokeStyle = 'rgba(200,190,170,0.35)'; x.lineWidth = lw(0.015); for (const [u, v, i] of M.pts(A * 8, 27)) { x.beginPath(); x.moveTo(u, v); x.lineTo(u + P * 0.12, v + (H(i, 29) - 0.5) * P * 0.06); x.stroke(); } }
        x.fillStyle = 'rgba(255,255,255,0.6)'; for (const [u, v, i] of M.pts(A * 2, 31, 0.2)) { M.blob(u, v, P * 0.16, i, 7); x.fill(); } });
        // brown shell along the exposed outer edges, a thin white lip inside it
        { const { mask, l, t, r, b, N, E, S, W } = Q, sh = P * 0.13; x.fillStyle = '#6a4426'; if (!(mask & S)) x.fillRect(l - 2, b - sh, r - l + 4, sh + 2); if (!(mask & W)) x.fillRect(l - 2, t - 2, sh + 2, b - t + 4); if (!(mask & E)) x.fillRect(r - sh, t - 2, sh + 2, b - t + 4); if (!(mask & N)) x.fillRect(l - 2, t - 2, r - l + 4, sh * 0.6);
          x.strokeStyle = 'rgba(40,24,10,0.6)'; x.lineWidth = lw(0.012); if (!(mask & S)) for (let k = 0; k < 8; k++) { const xx = l + (k + 0.5) * (r - l) / 8; x.beginPath(); x.moveTo(xx, b - sh * 0.8); x.lineTo(xx + P * 0.04, b - sh * 0.2); x.stroke(); } }
        M.form('rgba(255,255,255,0.2)', 'rgba(90,70,40,0.3)'); break; }
    }
  },
});
