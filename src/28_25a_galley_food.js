/* ---- Orbit Galley blocks: seven space-station sweets, each piece one continuous mass ----
   I galaxy glaze (deep violet swirl, nebula streaks, star sprinkles) · O moon cheese (pale yellow, crater holes) · T red velvet
   (deep red crumb, cream seam) · S nebula jelly (teal, suspended bubbles) · Z neapolitan (strawberry/choc/vanilla bands along the
   piece) · J orbit orange (fizzy orange gel, rising bubbles) · L stardust meringue (white piped peaks, silver dragées) */
const GalleyFood = remakeFood('galley', {
  FOOD: [null, 'galaxy', 'mooncheese', 'velvet', 'nebula', 'neapolitan', 'orange', 'meringue'],
  MAIN: [null, '#2e1a5e', '#d6ae4a', '#a81e30', '#1aa29a', '#b06470', '#f88a24', '#f4f2fa'],
  premiumOpts: { lift: { meringue: 'contrast(1.1) brightness(1.02)', neapolitan: 'contrast(1.08)' } },
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
      case 'mooncheese': { M.fill('#d6ae4a'); M.piece(() => { // aged moon cheese: warm ochre paste, irregular natural eyes (lit lower lip, shaded upper wall), amber rind
        x.fillStyle = M.lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(250,226,150,0.35)'], [1, 'rgba(170,120,30,0.3)']]); M.all(x.fillStyle);
        if (!small) for (const [u, v, i] of M.pts(A * 30, 5, 0.03)) { x.fillStyle = H(i, 6) < 0.5 ? 'rgba(255,240,190,0.35)' : 'rgba(150,104,24,0.25)'; x.beginPath(); x.arc(u, v, P * (0.008 + H(i, 7) * 0.01), 0, TAU); x.fill(); }
        for (const [u, v, i] of M.pts(A * 2.2, 7, 0.16)) { const rx = P * (0.07 + H(i, 9) * 0.11), ry = rx * (0.62 + H(i, 10) * 0.3), ro = (H(i, 11) - 0.5) * 0.8;
          x.fillStyle = '#8a6418'; ellipse(x, u, v, rx, ry, ro); x.fill(); // shaded hollow
          x.fillStyle = 'rgba(200,150,50,0.9)'; ellipse(x, u, v + ry * 0.28, rx * 0.86, ry * 0.7, ro); x.fill(); // lit lower wall
          x.strokeStyle = 'rgba(255,236,170,0.65)'; x.lineWidth = lw(0.016); x.beginPath(); x.ellipse(u, v, rx, ry, ro, 0.3, 2.8); x.stroke(); }
        const cw = P * 0.075; for (const [a, c] of M.cells) { const L0 = a * P, T0 = c * P; x.fillStyle = '#9a6a1e';
          if (!M.has(a, c - 1)) x.fillRect(L0 - 1, T0 - 1, P + 2, cw + 1); if (!M.has(a, c + 1)) x.fillRect(L0 - 1, T0 + P - cw, P + 2, cw + 1);
          if (!M.has(a - 1, c)) x.fillRect(L0 - 1, T0 - 1, cw + 1, P + 2); if (!M.has(a + 1, c)) x.fillRect(L0 + P - cw, T0 - 1, cw + 1, P + 2); } });
        M.form('rgba(255,240,190,0.18)', 'rgba(110,70,0,0.35)'); break; }
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
        M.axis((len, sp) => { const bw = [0.28, 0.34, 0.38].map((f) => f * sp), cols = ['#eadcb8', '#cc6a7c', '#4e2818']; let yy = 0; for (let k = 0; k < 3; k++) { x.fillStyle = cols[k]; x.fillRect(-P, yy - (k === 0 ? P : 0), len + 2 * P, bw[k] + (k === 0 || k === 2 ? P : 0)); yy += bw[k]; } const b = sp / 3; // bolder strawberry + chocolate, narrower vanilla (QA r3: too pale)
          x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(-P, bw[0], len + 2 * P, lw(0.025)); x.fillRect(-P, bw[0] + bw[1], len + 2 * P, lw(0.025)); void b; });
        if (!small) for (const [u, v, i] of M.pts(A * 6, 23, 0.06)) { x.fillStyle = 'rgba(80,30,20,0.25)'; x.beginPath(); x.arc(u, v, P * 0.025, 0, TAU); x.fill(); } });
        M.form('rgba(255,230,230,0.2)', 'rgba(70,20,10,0.4)'); break; }
      case 'orange': { M.fill('#f88a24'); M.piece(() => {
        x.fillStyle = M.lin(X0, Y0, X0, Y0 + BH, [[0, 'rgba(255,200,90,0.45)'], [1, 'rgba(220,90,10,0.3)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 12, 25, 0.04)) { const rr = P * (0.02 + H(i, 27) * 0.035); x.fillStyle = 'rgba(255,236,190,0.75)'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(u - rr * 0.4, v - rr * 0.5, rr * 0.4, rr * 0.4); } });
        M.form('rgba(255,235,190,0.3)', 'rgba(120,40,0,0.35)'); break; }
      case 'meringue': { M.fill('#eeeaf4'); M.piece(() => {
        for (const [u, v, i] of M.pts(A * 3, 29, 0.12)) { const R = P * (0.2 + H(i, 31) * 0.05); x.fillStyle = 'rgba(160,154,190,0.7)'; x.beginPath(); x.arc(u + R * 0.12, v + R * 0.15, R, 0, TAU); x.fill(); x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.3, [[0, '#ffffff'], [0.6, '#f2eff8'], [1, '#c8c2dc']]); x.beginPath(); x.arc(u, v, R, 0, TAU); x.fill(); const r0 = H(i, 33) * 6; x.strokeStyle = 'rgba(150,142,185,0.55)'; x.lineWidth = lw(0.022); x.lineCap = 'round'; x.beginPath(); for (let k = 0; k < 8; k++) { const an = r0 + k * TAU / 8; x.moveTo(u + Math.cos(an) * R * 0.18, v + Math.sin(an) * R * 0.18); x.quadraticCurveTo(u + Math.cos(an + 0.35) * R * 0.6, v + Math.sin(an + 0.35) * R * 0.6, u + Math.cos(an + 0.5) * R * 0.92, v + Math.sin(an + 0.5) * R * 0.92); } x.stroke(); /* star-tip piped kiss */ x.fillStyle = '#ffffff'; x.beginPath(); x.arc(u - R * 0.1, v - R * 0.15, R * 0.12, 0, TAU); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 3, 35, 0.08)) { x.fillStyle = M.rad(u - P * 0.01, v - P * 0.01, P * 0.04, [[0, '#ffffff'], [1, '#9aa0b4']]); x.beginPath(); x.arc(u, v, P * 0.03, 0, TAU); x.fill(); } });
        M.form('rgba(255,255,255,0.25)', 'rgba(90,85,120,0.3)'); break; }
    }
  },
});
