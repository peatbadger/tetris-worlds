/* ---- Aurora Lodge blocks: seven Nordic fika foods, each piece one continuous mass ----
   I blueberries (dusty bloom, little crowns) · O rye (dense crumb, caraway) · T lingonberries · S cinnamon bun (one spiral
   swirled through the whole piece, pearl sugar) · Z gravlax (coral, parallel fat lines, dill) · J cloudberries (drupelet clusters)
   · L skyr (soft ridges, vanilla flecks) */
const LodgeFood = remakeFood('lodge', {
  FOOD: [null, 'blueberry', 'rye', 'lingon', 'bun', 'gravlax', 'cloudberry', 'skyr'],
  MAIN: [null, '#2a2c5a', '#5a3a24', '#ea3444', '#a86c30', '#f6a07e', '#fcd070', '#f4f2ee'],
  soft: { blueberry: 1.2, rye: 0.8, lingon: 1.2, bun: 1.0, gravlax: 1.1, cloudberry: 1.2, skyr: 1.5 },
  boardBg: 'rgba(14,20,34,0.92)', grid: 'rgba(160,255,210,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 97), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'blueberry': { M.fill('#101230'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 9, 1, 0.06)) { const rr = P * (0.11 + H(i, 3) * 0.035); x.fillStyle = '#15163a'; x.beginPath(); x.arc(u + rr * 0.15, v + rr * 0.2, rr, 0, TAU); x.fill(); x.fillStyle = M.rad(u - rr * 0.3, v - rr * 0.3, rr * 1.4, [[0, '#4a508e'], [0.5, '#282c62'], [1, '#1a1c48']]); x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = '#14142e'; x.beginPath(); x.arc(u + rr * 0.2, v - rr * 0.1, rr * 0.22, 0, TAU); x.fill(); } });
        M.form('rgba(170,180,230,0.15)', 'rgba(0,0,20,0.45)'); break; }
      case 'rye': { M.fill('#4a2e1c'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 5, 0.1)) { x.fillStyle = H(i, 7) < 0.5 ? 'rgba(110,74,44,0.5)' : 'rgba(50,30,16,0.4)'; M.blob(u, v, P * 0.22, i, 8); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 26, 9, 0.02)) { x.fillStyle = H(i, 11) < 0.5 ? '#2a180c' : '#8a6a44'; ellipse(x, u, v, P * 0.03, P * 0.012, H(i, 12) * 3); x.fill(); }
        for (const [u, v, i] of M.pts(A * 2, 13, 0.15)) { x.fillStyle = 'rgba(30,18,8,0.6)'; ellipse(x, u, v, P * 0.05, P * 0.035, H(i, 14)); x.fill(); } });
        M.form('rgba(190,150,110,0.15)', 'rgba(20,10,0,0.45)'); break; }
      case 'lingon': { M.fill('#d02232'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 14, 15, 0.04)) { const rr = P * (0.075 + H(i, 17) * 0.025); x.fillStyle = '#a01020'; x.beginPath(); x.arc(u + rr * 0.15, v + rr * 0.2, rr, 0, TAU); x.fill(); x.fillStyle = H(i, 18) < 0.5 ? '#f4404e' : '#ea3444'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,200,200,0.55)'; x.beginPath(); x.arc(u - rr * 0.35, v - rr * 0.35, rr * 0.25, 0, TAU); x.fill(); } });
        M.form('rgba(255,170,170,0.18)', 'rgba(40,0,6,0.45)'); break; }
      case 'bun': { M.fill('#a86c30'); M.piece(() => {
        const cx = X0 + BW / 2, cy = Y0 + BH / 2, R = Math.hypot(BW, BH) * 0.6; x.fillStyle = M.rad(cx, cy, R, [[0, 'rgba(220,160,80,0.35)'], [1, 'rgba(120,70,20,0.35)']]); M.all(x.fillStyle);
        x.strokeStyle = '#7a4418'; x.lineCap = 'round'; x.lineWidth = P * 0.1; x.beginPath(); for (let k = 0; k <= 160; k++) { const a = k * 0.16, r = P * 0.05 + a * P * 0.055; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.9; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
        x.strokeStyle = 'rgba(250,210,140,0.5)'; x.lineWidth = P * 0.035; x.beginPath(); for (let k = 0; k <= 160; k++) { const a = k * 0.16 + 0.5, r = P * 0.05 + a * P * 0.055; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.9; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
        x.fillStyle = '#fbf8f0'; for (const [u, v, i] of M.pts(A * 8, 19, 0.08)) { x.save(); x.translate(u, v); x.rotate(H(i, 21)); x.fillRect(-P * 0.03, -P * 0.025, P * 0.06, P * 0.05); x.restore(); } });
        M.form('rgba(255,225,170,0.22)', 'rgba(80,40,0,0.4)'); break; }
      case 'gravlax': { M.fill('#f6a07e'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(255,190,160,0.35)'], [1, 'rgba(220,110,80,0.25)']]); M.all(x.fillStyle);
        x.strokeStyle = 'rgba(255,236,220,0.7)'; x.lineWidth = lw(0.04); for (let d = -8; d < 14; d++) { const o = d * P * 0.32; x.beginPath(); x.moveTo(X0 + o, Y0 - P); x.quadraticCurveTo(X0 + o + P * 0.5, Y0 + BH / 2, X0 + o - P * 0.2, Y0 + BH + P); x.stroke(); }
        for (const [u, v, i] of M.pts(A * 2, 23, 0.15)) { x.save(); x.translate(u, v); x.rotate(H(i, 25) * 3); x.strokeStyle = '#3a7a3a'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(-P * 0.14, 0); x.lineTo(P * 0.14, 0); for (let k = -3; k <= 3; k++) { x.moveTo(k * P * 0.04, 0); x.lineTo(k * P * 0.04 + P * 0.03, -P * 0.07); x.moveTo(k * P * 0.04, 0); x.lineTo(k * P * 0.04 + P * 0.03, P * 0.07); } x.stroke(); x.restore(); }
        x.fillStyle = '#2a1a14'; for (const [u, v] of M.pts(A * 6, 27, 0.05)) x.fillRect(u, v, lw(0.025), lw(0.025)); });
        M.form('rgba(255,210,190,0.2)', 'rgba(110,30,10,0.35)'); break; }
      case 'cloudberry': { M.fill('#f4bc5a'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 29, 0.14)) { const R = P * (0.22 + H(i, 31) * 0.05); for (let k = 0; k < 9; k++) { const a = k / 9 * TAU + H(i, 33), d = k < 1 ? 0 : R * 0.6, px = u + Math.cos(a) * d, py = v + Math.sin(a) * d, rr = R * 0.38; x.fillStyle = '#e09a3a'; x.beginPath(); x.arc(px + rr * 0.15, py + rr * 0.2, rr, 0, TAU); x.fill(); x.fillStyle = H(i * 9 + k, 35) < 0.5 ? '#fcd070' : '#fdda86'; x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,245,210,0.6)'; x.beginPath(); x.arc(px - rr * 0.3, py - rr * 0.3, rr * 0.25, 0, TAU); x.fill(); } } });
        M.form('rgba(255,240,190,0.22)', 'rgba(110,60,0,0.35)'); break; }
      case 'skyr': { M.fill('#f2f0ec'); M.piece(() => {
        M.axis((len, sp) => { x.strokeStyle = 'rgba(210,205,200,0.6)'; x.lineWidth = lw(0.03); for (let k = 0; k < sp / P * 3; k++) { const v = (k + 0.5) * P / 3; x.beginPath(); for (let i = 0; i <= 20; i++) { const u = -P * 0.3 + (len + P * 0.6) * i / 20, vv = v + Math.sin(u / P * 2.4 + k * 1.3) * P * 0.06; i ? x.lineTo(u, vv) : x.moveTo(u, vv); } x.stroke(); } });
        if (!small) { x.fillStyle = '#3a2a20'; for (const [u, v] of M.pts(A * 8, 37, 0.06)) x.fillRect(u, v, lw(0.018), lw(0.018)); } });
        M.form('rgba(255,255,255,0.2)', 'rgba(100,95,90,0.3)'); break; }
    }
  },
});
