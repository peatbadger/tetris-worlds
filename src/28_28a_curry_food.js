/* ---- Curry House blocks: seven plate components, each piece one continuous mass ----
   I pork katsu (panko crust sliced across the piece, pale cut faces) · O rice (glossy short grains) · T curry roux (glossy,
   potato / carrot / beef chunks) · S fukujinzuke (crimson pickle: lotus-root rings, radish slivers) · Z melted cheese
   (blistered, stretchy strands) · J fried eggplant (lacquered purple skin, amber flesh) · L spinach (wilted glossy leaves) */
const CurryFood = remakeFood('curry', {
  premiumOpts: { lift: { cheese: 'brightness(0.86) contrast(1.06) saturate(1.15)', spinach: 'brightness(1.18) contrast(1.06)', nasu: 'brightness(0.72) contrast(1.1)', fukujin: 'brightness(1.16) contrast(1.04)', roux: 'brightness(0.86) contrast(1.08)', katsu: 'brightness(0.94) contrast(1.06)' } },
  FOOD: [null, 'katsu', 'rice', 'roux', 'fukujin', 'cheese', 'nasu', 'spinach'],
  MAIN: [null, '#d8963e', '#f6f2e8', '#6e3612', '#d8303a', '#f4c03a', '#3e1a3e', '#3e7a2a'],
  soft: { katsu: 0.9, rice: 1.4, roux: 1.2, fukujin: 1.1, cheese: 1.4, nasu: 1.1, spinach: 1.2 },
  boardBg: 'rgba(34,20,10,0.92)', grid: 'rgba(255,210,120,0.07)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 171), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'katsu': { M.fill('#3a1a06'); M.piece(() => {
        M.axis((len, sp) => { const n = Math.round(len / (P * 0.5)); for (let k = 0; k < n; k++) { const u0 = k * len / n + P * 0.025, w = len / n - P * 0.05, j = (H(k, 1) - 0.5) * P * 0.04;
          x.fillStyle = 'rgba(20,6,0,0.5)'; roundRect(x, u0 + P * 0.02, P * 0.06 + j + P * 0.03, w, sp - P * 0.12, P * 0.08); x.fill();
          x.fillStyle = M.lin(0, 0, 0, sp, [[0, '#f0bc68'], [0.5, '#d8963e'], [1, '#a8641e']]); roundRect(x, u0, P * 0.06 + j, w, sp - P * 0.12, P * 0.08); x.fill();
          x.fillStyle = '#f4e6d0'; x.fillRect(u0 + w - P * 0.05, P * 0.1 + j, P * 0.035, sp - P * 0.2); x.fillStyle = 'rgba(240,200,190,0.8)'; x.fillRect(u0 + w - P * 0.05, P * 0.1 + j + sp * 0.15, P * 0.035, sp * 0.5); } }); 
        for (const [u, v, i] of M.pts(A * (small ? 16 : 40), 3, 0.06)) { const rr = P * (0.03 + H(i, 5) * 0.035); x.fillStyle = H(i, 6) < 0.55 ? 'rgba(255,225,160,0.75)' : 'rgba(140,70,15,0.5)'; M.blob(u, v, rr, i, 5, 0.8); x.fill(); } });
        M.form('rgba(255,230,170,0.22)', 'rgba(90,40,0,0.42)'); break; }
      case 'rice': { M.fill('#e4dccb'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * (small ? 16 : 34), 9, 0.0)) { const a = H(i, 11) * Math.PI, rl = P * 0.11, rw = P * 0.06; x.fillStyle = 'rgba(140,128,104,0.45)'; ellipse(x, u + P * 0.016, v + P * 0.022, rl, rw, a); x.fill(); x.fillStyle = M.rad(u - rl * 0.3, v - rw * 0.4, rl * 1.3, [[0, '#ffffff'], [1, '#efe8d8']]); ellipse(x, u, v, rl, rw, a); x.fill(); } });
        M.form('rgba(255,255,255,0.22)', 'rgba(110,100,80,0.3)'); break; }
      case 'roux': { M.fill('#62300e'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(160,90,40,0.4)'], [1, 'rgba(40,16,0,0.4)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 2, 13, 0.2)) { const kind = Math.floor(H(i, 14) * 3), rr = P * (0.18 + H(i, 15) * 0.06);
          const col = kind === 0 ? ['#f0d890', '#c8a858'] : kind === 1 ? ['#f49a40', '#c86a1a'] : ['#7a4422', '#4a2410']; x.fillStyle = 'rgba(30,10,0,0.5)'; M.blob(u + P * 0.02, v + P * 0.03, rr, i, 6, 0.5); x.fill(); x.fillStyle = M.lin(u - rr, v - rr, u + rr, v + rr, [[0, col[0]], [1, col[1]]]); M.blob(u, v, rr, i, 6, 0.5); x.fill();
          x.fillStyle = 'rgba(110,50,10,0.5)'; ellipse(x, u, v + rr * 0.55, rr * 0.9, rr * 0.35); x.fill(); }
        x.strokeStyle = 'rgba(255,200,140,0.5)'; x.lineWidth = lw(0.04); x.lineCap = 'round'; for (const [u, v, i] of M.pts(A * 2, 17, 0.12)) { x.beginPath(); x.moveTo(u - P * 0.15, v); x.quadraticCurveTo(u, v - P * 0.07, u + P * 0.15, v + P * 0.02); x.stroke(); }
        if (!small) for (const [u, v, i] of M.pts(A * 4, 19, 0.06)) { x.fillStyle = 'rgba(240,140,40,0.55)'; x.beginPath(); x.arc(u, v, P * (0.02 + H(i, 20) * 0.02), 0, TAU); x.fill(); } });
        M.form('rgba(255,190,130,0.18)', 'rgba(20,6,0,0.45)'); break; }
      case 'fukujin': { M.fill('#c42c38'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 6, 23, 0.04)) { x.save(); x.translate(u, v); x.rotate(H(i, 24) * TAU); const lw2 = P * (0.22 + H(i, 25) * 0.12), lh = P * 0.07; x.fillStyle = 'rgba(60,0,6,0.5)'; x.fillRect(-lw2 / 2 + P * 0.015, -lh / 2 + P * 0.02, lw2, lh); x.fillStyle = H(i, 26) < 0.5 ? '#f46a72' : '#e84a56'; x.fillRect(-lw2 / 2, -lh / 2, lw2, lh); x.fillStyle = 'rgba(255,190,190,0.5)'; x.fillRect(-lw2 / 2, -lh / 2, lw2, lh * 0.3); x.restore(); }
        for (const [u, v, i] of M.pts(A, 29, 0.22)) { const R = P * (0.2 + H(i, 30) * 0.04); x.fillStyle = 'rgba(60,0,6,0.5)'; x.beginPath(); x.arc(u + P * 0.02, v + P * 0.03, R, 0, TAU); x.fill(); x.fillStyle = M.rad(u - R * 0.3, v - R * 0.3, R * 1.4, [[0, '#ffb0b0'], [1, '#f2647a']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          x.fillStyle = '#a01e2a'; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU + H(i, 31); x.beginPath(); x.arc(u + Math.cos(a) * R * 0.55, v + Math.sin(a) * R * 0.55, R * 0.16, 0, TAU); x.fill(); } x.beginPath(); x.arc(u, v, R * 0.14, 0, TAU); x.fill(); }
        if (!small) { x.fillStyle = '#f4ead0'; for (const [u, v, i] of M.pts(A * 4, 33, 0.06)) { ellipse(x, u, v, P * 0.025, P * 0.012, H(i, 34) * 3); x.fill(); } } });
        M.form('rgba(255,180,180,0.2)', 'rgba(50,0,6,0.45)'); break; }
      case 'cheese': { M.fill('#f0b830'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(255,240,160,0.45)'], [1, 'rgba(200,130,20,0.3)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 3, 37, 0.1)) { x.fillStyle = 'rgba(255,236,150,0.4)'; M.blob(u, v, P * 0.2, i, 8, 0.6); x.fill(); }
        x.strokeStyle = 'rgba(255,248,200,0.7)'; x.lineWidth = lw(0.03); x.lineCap = 'round'; for (const [u, v, i] of M.pts(A * 2, 39, 0.1)) { x.beginPath(); x.moveTo(u - P * 0.2, v); x.bezierCurveTo(u - P * 0.05, v - P * 0.12, u + P * 0.05, v + P * 0.12, u + P * 0.2, v - P * 0.02); x.stroke(); }
        for (const [u, v, i] of M.pts(A * 6, 41, 0.06)) { const rr = P * (0.05 + H(i, 42) * 0.07); x.fillStyle = 'rgba(196,112,18,0.62)'; M.blob(u, v, rr, i, 6, 0.6); x.fill(); x.fillStyle = 'rgba(130,60,10,0.4)'; x.beginPath(); x.arc(u + rr * 0.2, v + rr * 0.2, rr * 0.4, 0, TAU); x.fill(); }
        x.fillStyle = 'rgba(255,255,240,0.7)'; for (const [u, v, i] of M.pts(A * 2, 45, 0.15)) { ellipse(x, u, v, P * 0.06, P * 0.02, -0.5); x.fill(); } });
        M.form('rgba(255,250,210,0.24)', 'rgba(140,80,0,0.36)'); break; }
      case 'nasu': { M.fill('#1e0a1c'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 2, 49, 0.2)) { const R = P * (0.3 + H(i, 50) * 0.05);
          x.fillStyle = 'rgba(0,0,0,0.55)'; x.beginPath(); x.arc(u + P * 0.03, v + P * 0.05, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.5, [[0, '#6a2a6a'], [1, '#2a0a2c']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(u - R * 0.2, v - R * 0.2, R, [[0, '#a87440'], [1, '#6a4020']]); x.beginPath(); x.arc(u, v, R * 0.74, 0, TAU); x.fill();
          if (!small) { x.fillStyle = 'rgba(40,20,6,0.6)'; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU + H(i, 52); x.beginPath(); x.arc(u + Math.cos(a) * R * 0.38, v + Math.sin(a) * R * 0.38, P * 0.016, 0, TAU); x.fill(); } }
          x.fillStyle = 'rgba(255,220,180,0.45)'; ellipse(x, u - R * 0.25, v - R * 0.3, R * 0.3, R * 0.1, -0.5); x.fill(); x.fillStyle = 'rgba(255,200,255,0.4)'; x.beginPath(); x.arc(u - R * 0.62, v - R * 0.5, R * 0.08, 0, TAU); x.fill(); } });
        M.form('rgba(230,180,230,0.14)', 'rgba(0,0,0,0.5)'); break; }
      case 'spinach': { M.fill('#1e3a12'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 6, 55, 0.05)) { const R = P * (0.26 + H(i, 56) * 0.08), a0 = H(i, 57) * TAU; x.save(); x.translate(u, v); x.rotate(a0);
          x.fillStyle = 'rgba(0,10,0,0.5)'; x.beginPath(); x.moveTo(-R + P * 0.03, P * 0.04); x.quadraticCurveTo(0, -R * 0.7 + P * 0.04, R + P * 0.03, P * 0.04); x.quadraticCurveTo(0, R * 0.7 + P * 0.04, -R + P * 0.03, P * 0.04); x.fill();
          x.fillStyle = M.lin(-R, -R * 0.5, R, R * 0.5, [[0, '#6aa848'], [0.5, '#3e7a2a'], [1, '#24521a']]); x.beginPath(); x.moveTo(-R, 0); x.quadraticCurveTo(0, -R * 0.7, R, 0); x.quadraticCurveTo(0, R * 0.7, -R, 0); x.fill();
          x.strokeStyle = 'rgba(190,230,150,0.45)'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(-R * 0.9, 0); x.quadraticCurveTo(0, -R * 0.08, R * 0.9, 0); x.stroke(); if (!small) for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(k * R * 0.25, 0); x.lineTo(k * R * 0.25 + R * 0.15, -R * 0.25); x.moveTo(k * R * 0.25, 0); x.lineTo(k * R * 0.25 + R * 0.15, R * 0.25); x.stroke(); }
          x.fillStyle = 'rgba(230,255,210,0.4)'; ellipse(x, -R * 0.3, -R * 0.2, R * 0.3, R * 0.06, -0.15); x.fill(); x.restore(); } });
        M.form('rgba(200,255,170,0.16)', 'rgba(0,16,0,0.45)'); break; }
    }
  },
});
