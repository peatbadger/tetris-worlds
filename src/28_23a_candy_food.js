/* ---- Neon Candy Arcade blocks: seven sweets, each piece one continuous mass (matte, flat facets — no glossy plastic) ----
   I liquorice twists (black ropes with spiral ridges) · O gummy bears (translucent grape bears, packed) · T candy cane (red/white
   peppermint stripes running through the whole piece) · S rock candy (faceted blue crystal, flat-shaded facets lit from top-left)
   · Z sour-apple belts (sugared strips along the piece) · J cotton candy (floss) · L marshmallows (dusted cylinders) */
const CandyFood = remakeFood('candybar', {
  premium: true, premiumOpts: { lift: { floss: 'brightness(0.9) contrast(1.08) saturate(1.25)' } },
  FOOD: [null, 'licorice', 'gummy', 'cane', 'rock', 'sourbelt', 'floss', 'mallow'],
  MAIN: [null, '#1a141a', '#6a2a9a', '#d8303c', '#3a7ad0', '#7ac030', '#f6aed0', '#f6f0ee'],
  soft: { licorice: 1.0, gummy: 1.4, cane: 0.8, rock: 0.7, sourbelt: 1.2, floss: 1.6, mallow: 1.5 },
  boardBg: 'rgba(16,12,26,0.92)', grid: 'rgba(255,120,220,0.07)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 83), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'licorice': { M.fill('#0e0a0e'); M.piece(() => { // twisted ropes: each turn a slanted lens with a lit ridge and a dark groove
        M.axis((len, sp) => { const n = Math.max(1, Math.round(sp / P * 1.5)); for (let k = 0; k < n; k++) { const v = (k + 0.5) * sp / n, wd = sp / n * 0.86, st = wd * 0.62;
          x.fillStyle = '#1c161c'; roundRect(x, -P, v - wd / 2, len + 2 * P, wd, wd / 2); x.fill();
          for (let u = -P + (k % 2) * st * 0.5; u < len + P; u += st) { x.save(); x.translate(u, v); x.transform(1, 0, -0.75, 1, 0, 0);
            x.fillStyle = M.lin(0, -wd / 2, 0, wd / 2, [[0, '#4a3e4a'], [0.35, '#2e262e'], [1, '#100c10']]); ellipse(x, 0, 0, st * 0.55, wd * 0.46); x.fill();
            x.strokeStyle = 'rgba(220,205,220,0.6)'; x.lineWidth = lw(0.025); x.beginPath(); x.ellipse(0, 0, st * 0.42, wd * 0.36, 0, Math.PI * 1.05, Math.PI * 1.6); x.stroke();
            x.restore(); } } }); });
        M.form('rgba(170,150,170,0.12)', 'rgba(0,0,0,0.45)'); break; }
      case 'gummy': { M.fill('#3a1656'); M.piece(() => { // packed translucent gummy bears
        const bear = (q, f) => { x.beginPath(); x.arc(0, -q * 0.55, q * 0.3, 0, TAU); x.moveTo(-q * 0.1, -q * 0.8); x.arc(-q * 0.22, -q * 0.8, q * 0.12, 0, TAU); x.moveTo(q * 0.34, -q * 0.8); x.arc(q * 0.22, -q * 0.8, q * 0.12, 0, TAU); x.moveTo(q * 0.38, q * 0.1); x.ellipse(0, q * 0.1, q * 0.38, q * 0.46, 0, 0, TAU); x.moveTo(-q * 0.24, -q * 0.05); x.ellipse(-q * 0.36, -q * 0.05, q * 0.13, q * 0.2, 0.5, 0, TAU); x.moveTo(q * 0.49, -q * 0.05); x.ellipse(q * 0.36, -q * 0.05, q * 0.13, q * 0.2, -0.5, 0, TAU); x.moveTo(-q * 0.06, q * 0.55); x.arc(-q * 0.22, q * 0.55, q * 0.16, 0, TAU); x.moveTo(q * 0.38, q * 0.55); x.arc(q * 0.22, q * 0.55, q * 0.16, 0, TAU); x.fillStyle = f; x.fill('nonzero'); };
        const cols = [['#7030a8', '#c690f2'], ['#8238b8', '#d4a0f8'], ['#622a98', '#b07ce6']];
        const bs = []; for (const [a, c] of M.cells) for (let k = 0; k < 2; k++) { const i = (a * 7 + c * 13 + k * 5) & 63; bs.push([(a + (k ? 0.7 : 0.3) + (H(i, 6) - 0.5) * 0.08) * P, (c + (k ? 0.62 : 0.4) + (H(i, 7) - 0.5) * 0.06) * P, i]); }
        for (const [u, v, i] of bs) { const q = P * (0.42 + H(i, 4) * 0.05), [c0, c1] = cols[Math.floor(H(i, 5) * 3)];
          x.save(); x.translate(u + P * 0.025, v + P * 0.04); x.rotate((H(i, 3) - 0.5) * 0.7); bear(q * 1.04, 'rgba(10,0,20,0.5)'); x.restore();
          x.save(); x.translate(u, v); x.rotate((H(i, 3) - 0.5) * 0.7); bear(q, c0);
          x.save(); x.clip('nonzero'); x.fillStyle = M.rad(q * 0.12, q * 0.2, q * 0.6, [[0, c1], [1, 'rgba(0,0,0,0)']]); x.fillRect(-q, -q, 2 * q, 2 * q); x.fillStyle = 'rgba(255,255,255,0.55)'; ellipse(x, -q * 0.12, -q * 0.68, q * 0.08, q * 0.05, -0.6); x.fill(); ellipse(x, -q * 0.16, -q * 0.06, q * 0.06, q * 0.12, 0.3); x.fill(); x.restore();
          x.restore(); } });
        M.form('rgba(220,190,255,0.15)', 'rgba(20,0,30,0.45)'); break; }
      case 'cane': { M.fill('#f6f0ea'); M.piece(() => { // peppermint candy cane stripes, one diagonal set through the whole piece
        const d = Math.hypot(BW, BH) + 2 * P; x.save(); x.translate(X0 + BW / 2, Y0 + BH / 2); x.rotate(-Math.PI / 4);
        for (let o = -d; o < d; o += P * 0.62) { x.fillStyle = '#cc1e2c'; x.fillRect(o, -d, P * 0.22, 2 * d); x.fillStyle = 'rgba(255,120,120,0.5)'; x.fillRect(o + P * 0.02, -d, P * 0.05, 2 * d); x.fillStyle = '#d8303c'; x.fillRect(o + P * 0.36, -d, P * 0.05, 2 * d); }
        x.restore();
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(255,255,255,0.18)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(120,40,40,0.1)']]); M.all(x.fillStyle);
        if (!small) { x.fillStyle = 'rgba(255,255,255,0.8)'; for (const [u, v] of M.pts(A * 6, 9, 0)) x.fillRect(u, v, lw(0.02), lw(0.02)); } });
        M.form('rgba(255,255,255,0.2)', 'rgba(110,20,30,0.3)'); break; }
      case 'rock': { M.fill('#2a62b8'); M.piece(() => { // faceted crystal: jittered piece-space lattice split into flat-shaded triangles
        const g = P * 0.42, i0 = Math.floor((X0 - P) / g), i1 = Math.ceil((X0 + BW + P) / g), j0 = Math.floor((Y0 - P) / g), j1 = Math.ceil((Y0 + BH + P) / g);
        const V = (i, j) => [i * g + (Q.hash(i, j, 7) - 0.5) * g * 0.7, j * g + (Q.hash(j, i, 9) - 0.5) * g * 0.7];
        const shade = (k) => { const L = 0.5 + (k - 0.5) * 1.2; return L < 0.2 ? '#163a7a' : L < 0.4 ? '#22549e' : L < 0.6 ? '#3270c4' : L < 0.78 ? '#5a98e4' : L < 0.92 ? '#8cc0f6' : '#d4ecff'; };
        for (let i = i0; i < i1; i++) for (let j = j0; j < j1; j++) { const a = V(i, j), b = V(i + 1, j), c = V(i + 1, j + 1), dd = V(i, j + 1), fl = Q.hash(i, j, 3) < 0.5;
          const tris = fl ? [[a, b, c], [a, c, dd]] : [[a, b, dd], [b, c, dd]];
          tris.forEach((tr, k) => { const nx = Q.hash(i * 2 + k, j, 11) - 0.5, ny = Q.hash(j, i * 2 + k, 13) - 0.5, lit = 0.5 - (nx * 0.7 + ny * 0.7) * 0.9; x.fillStyle = shade(Math.max(0, Math.min(1, lit)));
            x.beginPath(); x.moveTo(tr[0][0], tr[0][1]); x.lineTo(tr[1][0], tr[1][1]); x.lineTo(tr[2][0], tr[2][1]); x.closePath(); x.fill(); x.strokeStyle = 'rgba(210,235,255,0.28)'; x.lineWidth = lw(0.012); x.stroke(); }); }
        if (!small) for (const [u, v, i] of M.pts(A, 15, 0.2)) { if (H(i, 16) < 0.5) continue; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = lw(0.015); x.beginPath(); x.moveTo(u - P * 0.06, v); x.lineTo(u + P * 0.06, v); x.moveTo(u, v - P * 0.06); x.lineTo(u, v + P * 0.06); x.stroke(); } });
        M.form('rgba(200,230,255,0.18)', 'rgba(0,10,40,0.4)'); break; }
      case 'sourbelt': { M.fill('#4e8a18'); M.piece(() => {
        M.axis((len, sp) => { const n = Math.max(2, Math.round(sp / P * 2.4)); for (let k = 0; k < n; k++) { const v = (k + 0.5) * sp / n, wd = sp / n * 0.78; x.fillStyle = k % 2 ? '#8ac838' : '#a8d850'; x.beginPath(); x.moveTo(-P, v - wd / 2); for (let u = -P; u <= len + P; u += P * 0.25) x.lineTo(u, v - wd / 2 + Math.sin(u / P * 2 + k) * P * 0.03); for (let u = len + P; u >= -P; u -= P * 0.25) x.lineTo(u, v + wd / 2 + Math.sin(u / P * 2 + k) * P * 0.03); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,250,220,0.25)'; x.fillRect(-P, v - wd / 2 + lw(0.02), len + 2 * P, wd * 0.25); } });
        if (!small) { x.fillStyle = 'rgba(255,255,240,0.85)'; for (const [u, v] of M.pts(A * 36, 19, 0)) x.fillRect(u, v, lw(0.025), lw(0.025)); } });
        M.form('rgba(240,255,200,0.2)', 'rgba(10,40,0,0.4)'); break; }
      case 'floss': { M.fill('#f6aed0'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 5, 21, 0.05)) { x.fillStyle = H(i, 23) < 0.5 ? 'rgba(255,200,228,0.65)' : 'rgba(255,236,248,0.6)'; M.blob(u, v, P * (0.24 + H(i, 24) * 0.1), i, 9, 0.5); x.fill(); }
        x.strokeStyle = 'rgba(255,245,250,0.55)'; x.lineWidth = lw(0.015); for (const [u, v, i] of M.pts(A * 7, 25, 0.05)) { x.beginPath(); x.moveTo(u, v); x.bezierCurveTo(u + P * 0.15, v - P * 0.12, u + P * 0.25, v + P * 0.1, u + P * 0.4, v - P * 0.02); x.stroke(); } });
        M.form('rgba(255,240,250,0.25)', 'rgba(140,40,90,0.3)'); break; }
      case 'mallow': { M.fill('#ece4e6'); M.piece(() => { // dusted marshmallow cylinders, two per cell, standing on the bed
        const ms = []; for (const [a, c] of M.cells) for (let k = 0; k < 2; k++) { const i = (a * 7 + c * 13 + k * 3) & 63; ms.push([(a + (k ? 0.7 : 0.3) + (H(i, 41) - 0.5) * 0.1) * P, (c + (k ? 0.68 : 0.3) + (H(i, 42) - 0.5) * 0.08) * P, i]); }
        ms.sort((p, q) => p[1] - q[1]);
        for (const [u, v, i] of ms) { const r = P * (0.27 + H(i, 43) * 0.03), h = r * 0.62, pink = H(i, 44) < 0.3;
          x.fillStyle = 'rgba(90,70,80,0.35)'; ellipse(x, u + P * 0.02, v + h * 0.5 + P * 0.04, r, r * 0.42); x.fill();
          x.fillStyle = M.lin(u - r, 0, u + r, 0, pink ? [[0, '#f6dce4'], [0.4, '#fbeef2'], [1, '#d8b4c0']] : [[0, '#efe9e6'], [0.4, '#fdfbf9'], [1, '#d4ccca']]); x.fillRect(u - r, v - h * 0.5, 2 * r, h); ellipse(x, u, v + h * 0.5, r, r * 0.42); x.fill();
          x.fillStyle = pink ? '#fff4f7' : '#ffffff'; ellipse(x, u, v - h * 0.5, r, r * 0.42); x.fill(); x.strokeStyle = 'rgba(200,185,190,0.6)'; x.lineWidth = lw(0.012); x.beginPath(); x.ellipse(u, v - h * 0.5, r, r * 0.42, 0, 0, TAU); x.stroke();
          if (!small) { x.fillStyle = 'rgba(255,255,255,0.9)'; for (let k = 0; k < 5; k++) x.fillRect(u + (H(i * 5 + k, 45) - 0.5) * r * 1.4, v - h * 0.5 + (H(i * 5 + k, 46) - 0.5) * r * 0.5, lw(0.02), lw(0.02)); } } });
        M.form('rgba(255,255,255,0.18)', 'rgba(110,90,100,0.3)'); break; }
    }
  },
});
