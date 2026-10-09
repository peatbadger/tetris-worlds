/* ---- Oasis Tea Tent blocks: seven foods of the tea tent, each piece one continuous mass ----
   I dates (glossy, wrinkled) · O pomegranate arils · T mint leaves · S baklava (phyllo layers, diamond cuts, pistachio top)
   · Z dried apricots · J couscous (fine grains, herbs) · L labneh (olive-oil swirl along the core, za'atar) */
const OasisFood = remakeFood('oasis', {
  FOOD: [null, 'dates', 'pomegranate', 'mint', 'baklava', 'apricot', 'couscous', 'labneh'],
  MAIN: [null, '#4a240e', '#d02a40', '#58a848', '#945812', '#f8a040', '#e8cc88', '#f4f0e6'],
  soft: { dates: 1.0, pomegranate: 1.1, mint: 1.2, baklava: 0.9, apricot: 1.0, couscous: 1.3, labneh: 1.5 },
  boardBg: 'rgba(40,22,18,0.92)', grid: 'rgba(255,220,180,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 71), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'dates': { M.fill('#341808'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 1, 0.15)) { x.save(); x.translate(u, v); x.rotate(H(i, 3) * 3); const lx = P * (0.3 + H(i, 4) * 0.06), ly = P * 0.15;
          x.fillStyle = '#2a1206'; ellipse(x, P * 0.02, P * 0.03, lx, ly); x.fill(); x.fillStyle = M.lin(0, -ly, 0, ly, [[0, '#7a3e1a'], [0.5, '#5a2a10'], [1, '#3a1808']]); ellipse(x, 0, 0, lx, ly); x.fill();
          x.strokeStyle = 'rgba(30,10,2,0.55)'; x.lineWidth = lw(0.015); for (let k = 0; k < 3; k++) { const ux = (H(i, k + 40) - 0.5) * lx * 1.2, vy = (H(i, k + 44) - 0.5) * ly * 1.1; x.beginPath(); x.moveTo(ux - lx * 0.2, vy); x.quadraticCurveTo(ux, vy - ly * 0.15, ux + lx * 0.22, vy + ly * 0.05); x.stroke(); }
          x.fillStyle = 'rgba(230,170,120,0.35)'; ellipse(x, -lx * 0.3, -ly * 0.45, lx * 0.4, ly * 0.18); x.fill(); x.restore(); } });
        M.form('rgba(220,150,100,0.15)', 'rgba(10,2,0,0.45)'); break; }
      case 'pomegranate': { M.fill('#9a1a2c'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 26, 5, 0.02)) { const rr = P * (0.09 + H(i, 7) * 0.03), a = H(i, 8) * 3; x.save(); x.translate(u, v); x.rotate(a); x.fillStyle = '#8a1022'; GeoKit.poly(x, [-rr, -rr * 0.5, 0, -rr * 1.1, rr, -rr * 0.5, rr * 0.8, rr * 0.7, -rr * 0.8, rr * 0.7]); x.fill(); x.fillStyle = '#e8384e'; GeoKit.poly(x, [-rr * 0.8, -rr * 0.4, 0, -rr * 0.9, rr * 0.8, -rr * 0.4, rr * 0.6, rr * 0.5, -rr * 0.6, rr * 0.5]); x.fill(); x.fillStyle = 'rgba(255,200,210,0.6)'; x.beginPath(); x.arc(-rr * 0.3, -rr * 0.35, rr * 0.18, 0, TAU); x.fill(); x.restore(); }
        if (!small) { x.strokeStyle = 'rgba(250,220,180,0.4)'; x.lineWidth = lw(0.03); for (const [u, v, i] of M.pts(A, 9, 0.2)) { x.beginPath(); x.moveTo(u, v); x.quadraticCurveTo(u + P * 0.2, v - P * 0.1, u + P * 0.4, v + P * 0.05); x.stroke(); } } });
        M.form('rgba(255,170,180,0.18)', 'rgba(30,0,6,0.45)'); break; }
      case 'mint': { M.fill('#3a7a30'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 5, 11, 0.08)) { x.save(); x.translate(u, v); x.rotate(H(i, 13) * TAU); const lx = P * (0.26 + H(i, 14) * 0.08), ly = lx * 0.55;
          x.fillStyle = H(i, 15) < 0.5 ? '#58a848' : '#6cb854'; x.beginPath(); x.moveTo(-lx, 0); x.quadraticCurveTo(-lx * 0.2, -ly * 1.5, lx, 0); x.quadraticCurveTo(-lx * 0.2, ly * 1.5, -lx, 0); x.fill();
          x.strokeStyle = 'rgba(200,240,170,0.6)'; x.lineWidth = lw(0.018); x.beginPath(); x.moveTo(-lx * 0.9, 0); x.lineTo(lx * 0.85, 0); for (let k = -2; k <= 2; k++) { if (!k) continue; x.moveTo(k * lx * 0.25, 0); x.lineTo(k * lx * 0.25 + lx * 0.2, (k % 2 ? 1 : -1) * ly * 0.6); } x.stroke(); x.restore(); } });
        M.form('rgba(200,255,190,0.18)', 'rgba(0,30,0,0.45)'); break; }
      case 'baklava': { M.fill('#945812'); M.piece(() => {
        for (let yy = Y0 - P, k = 0; yy < Y0 + BH + P; yy += P * 0.12, k++) { x.fillStyle = k % 2 ? 'rgba(220,160,70,0.45)' : 'rgba(110,60,10,0.4)'; x.fillRect(X0 - P, yy, BW + 2 * P, P * 0.05); }
        x.strokeStyle = 'rgba(100,50,10,0.55)'; x.lineWidth = lw(0.03); x.beginPath(); for (let d = -6; d < 12; d++) { x.moveTo(X0 + d * P * 0.6, Y0 - P); x.lineTo(X0 + d * P * 0.6 + (BH + 2 * P) * 0.8, Y0 + BH + P); x.moveTo(X0 + d * P * 0.6, Y0 + BH + P); x.lineTo(X0 + d * P * 0.6 + (BH + 2 * P) * 0.8, Y0 - P); } x.stroke();
                for (const [a, c] of M.tops()) { x.fillStyle = '#6a9a2a'; for (let k = 0; k < 14; k++) { const px = a * P + H(a * 7 + c, k) * P, py = c * P + P * (0.04 + H(a + c * 5, k + 20) * 0.16); x.fillRect(px, py, lw(0.05), lw(0.035)); } x.fillStyle = '#9ac850'; for (let k = 0; k < 8; k++) x.fillRect(a * P + H(a * 3 + c, k + 40) * P, c * P + P * (0.03 + H(a + c, k + 50) * 0.14), lw(0.03), lw(0.025)); } });
        M.form('rgba(255,230,160,0.25)', 'rgba(90,40,0,0.4)'); break; }
      case 'apricot': { M.fill('#e88a2a'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 21, 0.14)) { x.save(); x.translate(u, v); x.rotate(H(i, 23) * 3); const rr = P * (0.24 + H(i, 24) * 0.05);
          x.fillStyle = '#9a4a08'; ellipse(x, P * 0.02, P * 0.03, rr, rr * 0.82); x.fill(); x.fillStyle = M.rad(-rr * 0.3, -rr * 0.3, rr * 1.3, [[0, '#ffc870'], [0.6, '#f8a040'], [1, '#d87a20']]); ellipse(x, 0, 0, rr, rr * 0.82); x.fill();
          x.strokeStyle = 'rgba(150,60,0,0.5)'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(-rr * 0.6, rr * 0.1); x.quadraticCurveTo(0, -rr * 0.25, rr * 0.6, rr * 0.15); x.stroke(); x.restore(); } });
        M.form('rgba(255,210,150,0.22)', 'rgba(90,30,0,0.4)'); break; }
      case 'couscous': { M.fill('#e2c27a'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 25, 0.1)) { x.fillStyle = H(i, 27) < 0.5 ? 'rgba(250,230,170,0.5)' : 'rgba(200,160,80,0.3)'; M.blob(u, v, P * 0.22, i, 7); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 70, 29, 0)) { x.fillStyle = H(i, 31) < 0.6 ? '#f6e2a8' : '#c8a058'; x.fillRect(u, v, lw(0.028), lw(0.028)); }
        x.fillStyle = '#4a8a3a'; for (const [u, v] of M.pts(A * 3, 33, 0.1)) x.fillRect(u, v, lw(0.05), lw(0.025)); x.fillStyle = '#e8c070'; for (const [u, v] of M.pts(A, 35, 0.2)) { x.beginPath(); x.arc(u, v, P * 0.06, 0, TAU); x.fill(); } });
        M.form('rgba(255,245,210,0.22)', 'rgba(110,80,20,0.35)'); break; }
      case 'labneh': { M.fill('#f4f0e6'); M.piece(() => {
        x.fillStyle = 'rgba(255,255,255,0.55)'; for (const [u, v, i] of M.pts(A * 2, 37, 0.2)) { M.blob(u, v, P * 0.2, i, 7); x.fill(); }
        const sk = M.skel(); x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = 'rgba(200,180,60,0.3)'; x.lineWidth = P * 0.3; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke(); x.strokeStyle = 'rgba(220,200,80,0.35)'; x.lineWidth = P * 0.1; x.stroke();
        x.fillStyle = '#6a6a2a'; for (const [u, v] of M.pts(A * 12, 39, 0.1)) x.fillRect(u, v, lw(0.025), lw(0.025)); x.fillStyle = '#b8282a'; for (const [u, v] of M.pts(A * 4, 41, 0.1)) x.fillRect(u, v, lw(0.022), lw(0.022)); });
        M.form('rgba(255,255,255,0.2)', 'rgba(110,100,70,0.3)'); break; }
    }
  },
});
