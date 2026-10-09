/* ---- Neon Candy Arcade blocks: seven sweets, each piece one continuous mass (matte, flat facets — no glossy plastic) ----
   I licorice (twisted black ropes) · O grape jellies (sugar-coated) · T caramel chews · S blue-raspberry rock (flat shards)
   · Z sour-apple belts (sugared strips along the piece) · J cotton candy (floss) · L marshmallow (puffy pillows) */
const CandyFood = remakeFood('candybar', {
  FOOD: [null, 'licorice', 'grape', 'caramel', 'bluerock', 'sourbelt', 'floss', 'mallow'],
  MAIN: [null, '#1a141a', '#5e2490', '#9a5418', '#62a6f2', '#7ac030', '#f6aed0', '#f6f0ee'],
  soft: { licorice: 1.0, grape: 1.3, caramel: 1.1, bluerock: 0.8, sourbelt: 1.2, floss: 1.6, mallow: 1.5 },
  boardBg: 'rgba(16,12,26,0.92)', grid: 'rgba(255,120,220,0.07)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 83), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'licorice': { M.fill('#141014'); M.piece(() => {
        M.axis((len, sp) => { const n = Math.max(2, Math.round(sp / P * 2)); for (let k = 0; k < n; k++) { const v = (k + 0.5) * sp / n, wd = sp / n * 0.9; x.fillStyle = '#221a22'; x.fillRect(-P, v - wd / 2, len + 2 * P, wd); x.strokeStyle = 'rgba(120,100,120,0.45)'; x.lineWidth = lw(0.05); for (let u = -P + (k % 2) * P * 0.1; u < len + P; u += P * 0.2) { x.beginPath(); x.moveTo(u, v - wd / 2 + lw(0.02)); x.lineTo(u + wd * 0.5, v + wd / 2 - lw(0.02)); x.stroke(); } x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(-P, v + wd / 2 - lw(0.03), len + 2 * P, lw(0.05)); } }); });
        M.form('rgba(160,140,160,0.15)', 'rgba(0,0,0,0.5)'); break; }
      case 'grape': { M.fill('#3a1058'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 4, 1, 0.1)) { x.save(); x.translate(u, v); x.rotate(H(i, 3) * 1.5); const q = P * (0.17 + H(i, 4) * 0.04); x.fillStyle = '#3a1058'; roundRect(x, -q + P * 0.02, -q + P * 0.03, q * 2, q * 2, q * 0.5); x.fill(); x.fillStyle = H(i, 5) < 0.5 ? '#5e2490' : '#6a2c9c'; roundRect(x, -q, -q, q * 2, q * 2, q * 0.5); x.fill(); x.restore(); }
        if (!small) { x.fillStyle = 'rgba(250,240,255,0.7)'; for (const [u, v] of M.pts(A * 40, 7, 0)) x.fillRect(u, v, lw(0.022), lw(0.022)); } });
        M.form('rgba(230,200,255,0.18)', 'rgba(20,0,30,0.45)'); break; }
      case 'caramel': { M.fill('#7a3e10'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 9, 0.14)) { x.save(); x.translate(u, v); x.rotate((H(i, 11) - 0.5) * 0.6); const q = P * (0.22 + H(i, 12) * 0.04); x.fillStyle = '#5a2a08'; roundRect(x, -q + P * 0.02, -q * 0.75 + P * 0.03, q * 2, q * 1.5, q * 0.35); x.fill(); x.fillStyle = M.lin(0, -q, 0, q, [[0, '#c07a2a'], [1, '#9a5418']]); roundRect(x, -q, -q * 0.75, q * 2, q * 1.5, q * 0.35); x.fill(); x.fillStyle = 'rgba(255,220,160,0.3)'; roundRect(x, -q * 0.75, -q * 0.6, q * 1.3, q * 0.25, q * 0.12); x.fill(); x.restore(); } });
        M.form('rgba(255,210,150,0.18)', 'rgba(40,10,0,0.45)'); break; }
      case 'bluerock': { M.fill('#3a7ad0'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 6, 13, 0.05)) { const q = P * (0.18 + H(i, 15) * 0.08), a = H(i, 16) * TAU, pts = []; for (let k = 0; k < 5; k++) { const an = a + k / 5 * TAU, rr = q * (0.7 + H(i, k + 17) * 0.5); pts.push(u + Math.cos(an) * rr, v + Math.sin(an) * rr); } x.fillStyle = ['#4a90e8', '#62a6f2', '#80bcf6', '#3a7ad8'][i % 4]; GeoKit.poly(x, pts); x.fill(); x.fillStyle = 'rgba(200,230,255,0.35)'; GeoKit.poly(x, [pts[0], pts[1], pts[2], pts[3], u, v]); x.fill(); } });
        M.form('rgba(200,230,255,0.18)', 'rgba(0,10,40,0.45)'); break; }
      case 'sourbelt': { M.fill('#4e8a18'); M.piece(() => {
        M.axis((len, sp) => { const n = Math.max(2, Math.round(sp / P * 2.4)); for (let k = 0; k < n; k++) { const v = (k + 0.5) * sp / n, wd = sp / n * 0.78; x.fillStyle = k % 2 ? '#8ac838' : '#a8d850'; x.beginPath(); x.moveTo(-P, v - wd / 2); for (let u = -P; u <= len + P; u += P * 0.25) x.lineTo(u, v - wd / 2 + Math.sin(u / P * 2 + k) * P * 0.03); for (let u = len + P; u >= -P; u -= P * 0.25) x.lineTo(u, v + wd / 2 + Math.sin(u / P * 2 + k) * P * 0.03); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,250,220,0.25)'; x.fillRect(-P, v - wd / 2 + lw(0.02), len + 2 * P, wd * 0.25); } });
        if (!small) { x.fillStyle = 'rgba(255,255,240,0.85)'; for (const [u, v] of M.pts(A * 36, 19, 0)) x.fillRect(u, v, lw(0.025), lw(0.025)); } });
        M.form('rgba(240,255,200,0.2)', 'rgba(10,40,0,0.4)'); break; }
      case 'floss': { M.fill('#f6aed0'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 5, 21, 0.05)) { x.fillStyle = H(i, 23) < 0.5 ? 'rgba(255,200,228,0.65)' : 'rgba(255,236,248,0.6)'; M.blob(u, v, P * (0.24 + H(i, 24) * 0.1), i, 9, 0.5); x.fill(); }
        x.strokeStyle = 'rgba(255,245,250,0.55)'; x.lineWidth = lw(0.015); for (const [u, v, i] of M.pts(A * 7, 25, 0.05)) { x.beginPath(); x.moveTo(u, v); x.bezierCurveTo(u + P * 0.15, v - P * 0.12, u + P * 0.25, v + P * 0.1, u + P * 0.4, v - P * 0.02); x.stroke(); } });
        M.form('rgba(255,240,250,0.25)', 'rgba(140,40,90,0.3)'); break; }
      case 'mallow': { M.fill('#ece4e2'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 2, 27, 0.2)) { x.save(); x.translate(u, v); x.rotate((H(i, 29) - 0.5) * 1.2); const q = P * 0.3; x.fillStyle = 'rgba(200,180,180,0.5)'; roundRect(x, -q + P * 0.03, -q * 0.7 + P * 0.04, q * 2, q * 1.4, q * 0.6); x.fill(); x.fillStyle = M.lin(0, -q, 0, q, [[0, '#fffcfa'], [1, '#efe6e4']]); roundRect(x, -q, -q * 0.7, q * 2, q * 1.4, q * 0.6); x.fill(); x.restore(); }
        if (!small) { x.fillStyle = 'rgba(255,255,255,0.8)'; for (const [u, v] of M.pts(A * 14, 31, 0)) x.fillRect(u, v, lw(0.03), lw(0.03)); } });
        M.form('rgba(255,255,255,0.2)', 'rgba(120,100,100,0.3)'); break; }
    }
  },
});
