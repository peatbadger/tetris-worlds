/* ---- Orbit Galley blocks: seven space-station sweets, each piece one continuous mass ----
   I galaxy glaze (deep violet swirl, nebula streaks, star sprinkles) · O moon cheese (pale yellow, crater holes) · T red velvet
   (deep red crumb, cream seam) · S nebula jelly (teal, suspended bubbles) · Z neapolitan (strawberry/choc/vanilla bands along the
   piece) · J orbit orange (fizzy orange gel, rising bubbles) · L stardust meringue (white piped peaks, silver dragées) */
const GalleyFood = remakeFood('galley', {
  FOOD: [null, 'galaxy', 'mooncheese', 'velvet', 'nebula', 'neapolitan', 'orange', 'meringue'],
  MAIN: [null, '#2e1a5e', '#eed468', '#a81e30', '#1aa29a', '#e8909e', '#f88a24', '#f4f2fa'],
  soft: { galaxy: 1.2, mooncheese: 1.0, velvet: 0.9, nebula: 1.4, neapolitan: 1.0, orange: 1.4, meringue: 1.5 },
  boardBg: 'rgba(6,8,22,0.93)', grid: 'rgba(140,170,255,0.07)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 113), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'galaxy': { M.fill('#24144c'); M.piece(() => {
        const cx = X0 + BW / 2, cy = Y0 + BH / 2;
        for (let k = 0; k < 3; k++) { x.strokeStyle = ['rgba(120,70,200,0.55)', 'rgba(60,120,220,0.45)', 'rgba(220,90,180,0.35)'][k]; x.lineWidth = P * (0.22 - k * 0.05); x.lineCap = 'round'; x.beginPath(); for (let i = 0; i <= 120; i++) { const a = i * 0.11 + k * 2.1, r = P * 0.1 + a * P * 0.07; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.8; i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
        for (const [u, v, i] of M.pts(A * 14, 3, 0.03)) { x.fillStyle = H(i, 5) < 0.7 ? '#ffffff' : '#ffd86a'; const s = lw(H(i, 6) < 0.85 ? 0.025 : 0.05); x.fillRect(u - s / 2, v - s / 2, s, s); } });
        M.form('rgba(190,160,255,0.2)', 'rgba(0,0,20,0.5)'); break; }
      case 'mooncheese': { M.fill('#eed468'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(255,240,170,0.4)'], [1, 'rgba(210,170,60,0.3)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 2.4, 7, 0.14)) { const rr = P * (0.08 + H(i, 9) * 0.1); x.fillStyle = '#c8a438'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = '#dcbc4a'; x.beginPath(); x.arc(u + rr * 0.2, v + rr * 0.22, rr * 0.82, 0, TAU); x.fill(); x.strokeStyle = 'rgba(255,248,200,0.7)'; x.lineWidth = lw(0.02); x.beginPath(); x.arc(u, v, rr, 0.5, 2.4); x.stroke(); } });
        M.form('rgba(255,250,210,0.22)', 'rgba(120,90,0,0.35)'); break; }
      case 'velvet': { M.fill('#a81e30'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 4, 11, 0.1)) { x.fillStyle = H(i, 13) < 0.5 ? 'rgba(200,50,64,0.5)' : 'rgba(110,10,24,0.45)'; M.blob(u, v, P * 0.18, i, 8); x.fill(); }
        for (const [u, v, i] of M.pts(A * 5, 41, 0.06)) { x.fillStyle = H(i, 43) < 0.6 ? 'rgba(244,236,224,0.85)' : 'rgba(255,250,240,0.6)'; M.blob(u, v, P * 0.045, i, 6); x.fill(); }
        if (!small) for (const [u, v] of M.pts(A * 10, 15, 0.04)) { x.fillStyle = 'rgba(60,0,10,0.5)'; x.fillRect(u, v, lw(0.03), lw(0.03)); } });
        M.form('rgba(255,170,170,0.15)', 'rgba(40,0,6,0.5)'); break; }
      case 'nebula': { M.fill('#1aa29a'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.hypot(BW, BH) * 0.6, [[0, 'rgba(120,240,220,0.45)'], [0.6, 'rgba(20,150,150,0.1)'], [1, 'rgba(10,70,90,0.35)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 1.5, 17, 0.12)) { x.fillStyle = 'rgba(140,100,230,0.25)'; M.blob(u, v, P * 0.3, i, 9); x.fill(); }
        for (const [u, v, i] of M.pts(A * 7, 19, 0.05)) { const rr = P * (0.03 + H(i, 21) * 0.05); x.strokeStyle = 'rgba(220,255,250,0.7)'; x.lineWidth = lw(0.015); x.beginPath(); x.arc(u, v, rr, 0, TAU); x.stroke(); x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(u - rr * 0.35, v - rr * 0.35, rr * 0.28, 0, TAU); x.fill(); } });
        M.form('rgba(220,255,250,0.3)', 'rgba(0,40,50,0.4)'); break; }
      case 'neapolitan': { M.fill('#e8909e'); M.piece(() => {
        M.axis((len, sp) => { const b = sp / 3; const cols = ['#f4e8cc', '#e8909e', '#6a3a24']; for (let k = 0; k < 3; k++) { x.fillStyle = cols[k]; x.fillRect(-P, k * b - (k === 0 ? P : 0), len + 2 * P, b + (k === 0 || k === 2 ? P : 0)); }
          x.fillStyle = 'rgba(255,255,255,0.18)'; for (let k = 0; k < 3; k++) x.fillRect(-P, k * b, len + 2 * P, lw(0.03)); });
        if (!small) for (const [u, v, i] of M.pts(A * 6, 23, 0.06)) { x.fillStyle = 'rgba(80,30,20,0.25)'; x.beginPath(); x.arc(u, v, P * 0.025, 0, TAU); x.fill(); } });
        M.form('rgba(255,230,230,0.2)', 'rgba(70,20,10,0.4)'); break; }
      case 'orange': { M.fill('#f88a24'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(255,200,90,0.45)'], [1, 'rgba(220,90,10,0.3)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 12, 25, 0.04)) { const rr = P * (0.02 + H(i, 27) * 0.035); x.fillStyle = 'rgba(255,236,190,0.75)'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(u - rr * 0.4, v - rr * 0.5, rr * 0.4, rr * 0.4); } });
        M.form('rgba(255,235,190,0.3)', 'rgba(120,40,0,0.35)'); break; }
      case 'meringue': { M.fill('#eeeaf4'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 29, 0.12)) { const R = P * (0.2 + H(i, 31) * 0.05); x.fillStyle = 'rgba(200,196,215,0.6)'; x.beginPath(); x.arc(u + R * 0.12, v + R * 0.15, R, 0, TAU); x.fill(); x.fillStyle = '#faf8fe'; x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill(); x.strokeStyle = 'rgba(190,185,210,0.7)'; x.lineWidth = lw(0.02); x.beginPath(); for (let k = 0; k < 3; k++) x.arc(u, v, R * (0.75 - k * 0.22), H(i, 33) * 6 + k, H(i, 33) * 6 + k + 4); x.stroke(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(u - R * 0.1, v - R * 0.15, R * 0.12, 0, TAU); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 3, 35, 0.08)) { x.fillStyle = M.rad(u - P * 0.01, v - P * 0.01, P * 0.04, [[0, '#ffffff'], [1, '#9aa0b4']]); x.beginPath(); x.arc(u, v, P * 0.03, 0, TAU); x.fill(); } });
        M.form('rgba(255,255,255,0.25)', 'rgba(90,85,120,0.3)'); break; }
    }
  },
});
