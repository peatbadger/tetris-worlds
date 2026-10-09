/* ---- Mike's Pastry blocks MADE OF pastry (FoodMass) — v3, real proportions, refined light ----
   I cannoli laid end to end: every cell-pair is ONE short, fat cannoli (blistered golden shell, sugar dust, ricotta
   bulging from both open ends pressed into mini chips) · O Boston cream (sponge / custard / sponge under glossy ganache)
   · T strawberry cheesecake (graham base, creamy body, glossy berries) · S pistachio ricotta (chopped pistachio)
   · Z tiramisu (ladyfinger / mascarpone, cocoa dust) · J chocolate ganache torte (deep gloss, soft sheen)
   · L rainbow cookie (almond sponge green / white / red, chocolate). One continuous mass per piece, no marks. */
const PastryFood = FoodMass({
  premium: true,
  FOOD: [null, 'cannoli', 'boston', 'cheesecake', 'pistachio', 'tiramisu', 'ganache', 'rainbow'],
  MAIN: [null, '#c98a45', '#f2d47a', '#f6eedc', '#96b65c', '#6e4224', '#3e2218', '#6e9a5a'],
  soft: { boston: 1.4, cheesecake: 1.5, pistachio: 1.3, tiramisu: 1.2, ganache: 1.0, rainbow: 0.8, cannoli: 0.6 },
  shape: true, diag: true, R: 0.22,
  vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
  // v4: every piece is drawn in PIECE space — layers span the whole piece (not one stack of layers per cell), one long
  // cannoli per I piece, ladyfinger joints / pistachio waves / berries placed along the piece, so no cell seams anywhere.
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
    const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]], lw = (k) => Math.max(1, P * k), A = cells.length;
    let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
    const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const lin = (x0, y0, x1, y1, st) => { const g = x.createLinearGradient(x0, y0, x1, y1); st.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
    const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
    const H = (i, k) => hash(41, i, k);
    const has = (a, c) => cells.some(([a2, c2]) => a2 === a && c2 === c);
    const R0 = X0 - P, RW = BW + 2 * P; // full-width rect in piece space
    const band = (y0, y1, col) => { x.fillStyle = col; x.fillRect(R0, y0, RW, y1 - y0); };
    const specksP = (n, col, sz, k, y0 = Y0, y1 = Y0 + BH) => { x.fillStyle = col; for (let i = 0; i < n; i++) { const q = Math.max(1, P * sz * (0.6 + H(i + k, 9) * 0.8)); x.fillRect(X0 + H(i + k, 1) * BW, y0 + H(i + k, 2) * (y1 - y0), q, q); } };
    const topLight = (a = 0.16) => { if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.3, [[0, `rgba(255,248,230,${a})`], [1, 'rgba(255,248,230,0)']]); x.fillRect(l - 2, t, r - l + 4, P * 0.3); } };
    const botShade = (a = 0.22) => { if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.3, 0, b, [[0, 'rgba(30,12,4,0)'], [1, `rgba(30,12,4,${a})`]]); x.fillRect(l - 2, b - P * 0.3, r - l + 4, P * 0.3); } };
    const tops = cells.filter(([a, c]) => !has(a, c - 1)), bots = cells.filter(([a, c]) => !has(a, c + 1));
    // drip edge along the real top of the piece (glaze / jam), continuous across neighbouring top cells
    const glazeTop = (col, depth, drips, k) => { for (const [a, c] of tops) { const y = c * P; x.fillStyle = col; x.fillRect(a * P - 1, y - 2, P + 2, P * depth + 2); for (let i = 0; i < drips; i++) { const dx = a * P + P * (0.15 + (i + H(a * 5 + c, i + k)) / drips * 0.7); x.beginPath(); x.ellipse(dx, y + P * depth, P * 0.05, P * (0.04 + H(a + c * 3, i + k + 7) * 0.06), 0, 0, TAU); x.fill(); } } };
    switch (food) {
      case 'cannoli': { // ONE long cannoli per piece: blistered golden shell, wrap seams, ricotta + chips bulging only from the two real ends
        fill('#c98a45');
        piece(() => { x.save(); if (!wide) { x.translate(X0 + BW, Y0); x.rotate(Math.PI / 2); } else x.translate(X0, Y0);
          const L = wide ? BW : BH, h = wide ? BH : BW, mid = h / 2;
          x.fillStyle = '#f4ecdc'; x.fillRect(-P, -P, L + 2 * P, h + 2 * P);
          x.fillStyle = lin(0, 0, 0, h, [[0, '#e9b56c'], [0.18, '#d9a058'], [0.55, '#c08040'], [1, '#86501f']]); x.fillRect(P * 0.2, h * 0.02, L - P * 0.4, h * 0.96);
          for (const [ex, dir] of [[P * 0.2, -1], [L - P * 0.2, 1]]) { x.fillStyle = '#a86a32'; x.beginPath(); x.ellipse(ex, mid, P * 0.07, h * 0.5, 0, 0, TAU); x.fill();
            x.fillStyle = lin(0, 0, 0, h, [[0, '#fffaf0'], [1, '#e6dcc6']]); x.beginPath(); x.ellipse(ex + dir * P * 0.07, mid, P * 0.13, h * 0.44, 0, 0, TAU); x.fill();
            if (!small) { x.fillStyle = '#22140c'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(ex + dir * P * (0.04 + H(i + (dir > 0 ? 20 : 0), 32) * 0.15), mid + (H(i + (dir > 0 ? 20 : 0), 31) - 0.5) * h * 0.78, Math.max(0.8, P * 0.024), 0, TAU); x.fill(); } } }
          x.strokeStyle = 'rgba(120,70,30,0.45)'; x.lineWidth = lw(0.02); for (let k = 1; k < L / P * 0.9; k++) { const sm = P * 0.2 + k * (L - P * 0.4) / Math.ceil(L / P * 0.9); x.beginPath(); x.moveTo(sm - P * 0.12, h * 0.04); x.quadraticCurveTo(sm, mid, sm + P * 0.08, h * 0.96); x.stroke(); }
          for (let i = 0; i < (small ? 10 : L / P * 22); i++) { const bx = P * 0.28 + H(i, 3) * (L - P * 0.56), by = h * (0.1 + H(i, 4) * 0.8), q = P * (0.018 + H(i, 5) * 0.022); x.fillStyle = H(i, 6) < 0.55 ? 'rgba(250,215,150,0.75)' : 'rgba(110,55,15,0.5)'; x.beginPath(); x.ellipse(bx, by, q * 1.4, q, 0, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,246,226,0.32)'; x.fillRect(P * 0.24, h * 0.1, L - P * 0.48, h * 0.07);
          x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < (small ? 8 : L / P * 22); i++) { const q = Math.max(0.8, P * (0.012 + H(i, 9) * 0.014)); x.fillRect(P * 0.26 + H(i, 7) * (L - P * 0.5), h * (0.05 + Math.pow(H(i, 8), 1.6) * 0.45), q, q); }
          x.restore(); });
        botShade(0.18); return;
      }
      case 'boston': { // sponge / custard / sponge across the whole piece, ganache glaze on the real top with drips
        fill('#f2d47a');
        piece(() => { const yc = Y0 + BH * 0.5; band(yc - P * 0.08, yc + P * 0.08, '#f7e3a4'); band(yc - P * 0.08, yc - P * 0.08 + lw(0.02), 'rgba(160,110,40,0.35)'); band(yc + P * 0.08, yc + P * 0.08 + lw(0.02), 'rgba(160,110,40,0.35)');
          specksP(small ? 6 : A * 12, 'rgba(176,128,56,0.5)', 0.022, 11);
          glazeTop('#3a1e12', 0.24, 3, 5); for (const [a, c] of tops) { x.fillStyle = 'rgba(255,236,210,0.4)'; x.beginPath(); x.ellipse(a * P + P * 0.5, c * P + P * 0.07, P * 0.3, P * 0.02, -0.04, 0, TAU); x.fill(); } });
        topLight(0.1); botShade(0.2); return;
      }
      case 'cheesecake': { // creamy body, berry jam + berries along the top, graham base along the real bottom
        fill(lin(0, t, 0, b, [[0, '#f6eedc'], [1, '#ece0c4']]));
        piece(() => { specksP(small ? 3 : A * 5, 'rgba(200,170,120,0.25)', 0.03, 21);
          for (const [a, c] of bots) { x.fillStyle = '#7a4c2a'; x.fillRect(a * P - 1, (c + 1) * P - P * 0.2, P + 2, P * 0.22); x.fillStyle = '#a06a3e'; for (let i = 0; i < 8; i++) x.fillRect(a * P + H(a + c * 7, i) * P, (c + 1) * P - P * 0.18 + H(a + c * 7, i + 9) * P * 0.14, lw(0.03), lw(0.03)); }
          glazeTop('#a81e2c', 0.18, 3, 25);
          const bs = []; for (const [a, c] of tops) bs.push([a * P + P * (0.3 + H(a + c, 30) * 0.4), c * P + P * 0.08]);
          bs.forEach(([bx, by], i) => { const br = P * 0.15; x.fillStyle = '#c42a36'; x.beginPath(); x.moveTo(bx - br, by); x.quadraticCurveTo(bx - br, by - br * 1.1, bx, by - br * 0.9); x.quadraticCurveTo(bx + br, by - br * 1.1, bx + br, by); x.quadraticCurveTo(bx, by + br * 1.1, bx - br, by); x.fill();
            x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(bx - br * 0.35, by - br * 0.45, br * 0.2, br * 0.1, -0.5, 0, TAU); x.fill(); void i; }); });
        topLight(0.08); botShade(0.15); return;
      }
      case 'pistachio': { // pistachio ricotta: soft folds running across the piece, chopped nuts scattered through it
        fill(lin(0, t, 0, b, [[0, '#a8c46c'], [1, '#86a64c']]));
        piece(() => { x.strokeStyle = 'rgba(255,255,240,0.32)'; x.lineWidth = lw(0.05); x.lineCap = 'round'; const ph = H(A + bx1, 1) * 6;
          for (let yk = Y0 + P * 0.35, k = 0; yk < Y0 + BH; yk += P * 0.5, k++) { x.beginPath(); for (let i = 0; i <= 16; i++) { const u = X0 - P * 0.2 + (BW + P * 0.4) * i / 16, v = yk + Math.sin(u / P * 1.8 + ph + k) * P * 0.07; i ? x.lineTo(u, v) : x.moveTo(u, v); } x.stroke(); }
          const g = ['#5e7a2a', '#86a442', '#a8bc5c', '#7a5a4a']; for (let i = 0; i < (small ? 8 : A * 16); i++) { x.fillStyle = g[i % 4]; const px = X0 + H(i, 4) * BW, py = Y0 + H(i, 5) * BH, q = P * (0.03 + H(i, 6) * 0.03); x.beginPath(); x.moveTo(px - q, py); x.lineTo(px, py - q * 0.8); x.lineTo(px + q, py + q * 0.2); x.lineTo(px - q * 0.2, py + q * 0.6); x.closePath(); x.fill(); } });
        topLight(0.18); botShade(0.18); return;
      }
      case 'tiramisu': { // mascarpone with two espresso-soaked ladyfinger layers spanning the piece; cocoa on the real top
        fill('#dcc49a');
        piece(() => { const nL = 3, lh = Math.min(P * 0.32, BH / 5.4);
          for (let k = 0; k < nL; k++) { const y = Y0 + BH * (k + 0.55) / (nL + 0.4) - lh / 2; band(y, y + lh, '#7a4a28'); band(y, y + lw(0.03), 'rgba(255,230,190,0.2)');
            x.fillStyle = 'rgba(60,30,10,0.3)'; for (let u = X0 + P * (0.25 + H(k, 40) * 0.4); u < X0 + BW; u += P * (0.7 + H(Math.round(u), k) * 0.3)) x.fillRect(u, y, lw(0.015), lh); }
          for (const [a, c] of tops) { x.fillStyle = '#5a3622'; x.fillRect(a * P - 1, c * P - 2, P + 2, P * 0.3); x.fillStyle = '#3a2014'; for (let i = 0; i < 22; i++) x.fillRect(a * P + H(a * 3 + c, i) * P, c * P + H(a + c * 5, i + 20) * P * 0.3, lw(0.02), lw(0.02)); } });
        topLight(0.06); botShade(0.2); return;
      }
      case 'ganache': { // chocolate torte: deep gradient over the whole piece, one soft sheen on the top, no per-cell lines
        fill('#3e2218');
        piece(() => { x.fillStyle = lin(0, Y0, 0, Y0 + BH, [[0, '#4e2c1e'], [1, '#2a160c']]); x.fillRect(R0, Y0 - P, RW, BH + 2 * P);
          for (const [a, c] of tops) { x.fillStyle = 'rgba(255,232,210,0.4)'; x.beginPath(); x.ellipse(a * P + P * 0.5, c * P + P * 0.08, P * 0.34, P * 0.028, -0.05, 0, TAU); x.fill(); } });
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * 0.2, 0, [[0, 'rgba(255,220,190,0.14)'], [1, 'rgba(255,220,190,0)']]); x.fillRect(l, t, P * 0.2, b - t); }
        botShade(0.3); return;
      }
      case 'rainbow': { // rainbow cookie: green / almond-white / red bands spanning the piece height, chocolate on the real top and bottom
        fill('#f2e6c8');
        piece(() => { const y1 = Y0 + BH * 0.36, y2 = Y0 + BH * 0.64; band(Y0 - P, y1, '#5f8f4a'); band(y2, Y0 + BH + P, '#c43a34');
          band(y1, y1 + lw(0.02), '#d8a0a0'); band(y2 - lw(0.02), y2, '#d8a0a0'); band(Y0 + BH * 0.08, Y0 + BH * 0.08 + lw(0.05), 'rgba(255,255,255,0.12)'); band(y2 + BH * 0.04, y2 + BH * 0.04 + lw(0.05), 'rgba(255,255,255,0.12)');
          for (const [a, c] of tops) { x.fillStyle = '#3a2116'; x.fillRect(a * P - 1, c * P - 2, P + 2, P * 0.12); }
          for (const [a, c] of bots) { x.fillStyle = '#3a2116'; x.fillRect(a * P - 1, (c + 1) * P - P * 0.08, P + 2, P * 0.1); }
          specksP(small ? 3 : A * 6, 'rgba(0,0,0,0.08)', 0.025, 51); });
        botShade(0.12); return;
      }
    }
  },
  live(c, food, o) {
    if (o.small) return; const { s, seed, T } = o;
    if (food === 'cannoli') { const tw = (T * 0.8 + seed * 0.41) % 2.6; if (tw < 0.35) { const a = Math.sin(tw / 0.35 * Math.PI) * 0.8; c.fillStyle = `rgba(255,255,255,${a})`; const px = (o.hash(seed, 1) - 0.5) * s * 0.6, py = -s * 0.3; c.fillRect(px - s * 0.04, py - 0.5, s * 0.08, 1.2); c.fillRect(px - 0.5, py - s * 0.04, 1.2, s * 0.08); } }
  },
  clear(food, q) {
    const { v, X, Y, s, dir, r, vr, push } = q;
    if (food === 'cannoli') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1.2, rot: 0, vr: dir * 3, life: 0.8, vrr: vr }); for (let i = 0; i < 5; i++) push({ k: 'dot', col: '#ffffff', r: 0.035, x: X, y: Y - s * 0.2, vx: (r(i) - 0.5) * s * 4, vy: -s * (1 + r(i + 3) * 2), g: 2, life: 0.8 }); return true; }
    if (food === 'boston' || food === 'pistachio' || food === 'tiramisu') { push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45 }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: food === 'boston' ? '#e9c878' : food === 'tiramisu' ? '#5a3622' : '#a6bc5c', x: X, y: Y, vx: (r(i) - 0.5) * s * 6, vy: -s * (2 + r(i + 3) * 3), life: 0.6 }); return true; }
    if (food === 'cheesecake') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.25 }); for (let i = 0; i < 2; i++) push({ k: 'dot', col: '#c42a36', r: 0.09, x: X, y: Y - s * 0.3, vx: (r(i) - 0.5) * s * 6, vy: -s * (4 + r(i + 4) * 3), life: 0.9 }); return true; }
    if (food === 'ganache') { push({ k: 'melt', v, x: X, y: Y, vr, life: 0.5 }); return true; }
    if (food === 'rainbow') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1.5 + r(3) * 2), life: 0.85, vrr: vr }); return true; }
    return false;
  },
});
SKINSETS.pastry = PastryFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'mikes'); if (st) { st.palette = PastryFood.MAIN.slice(1); st.desc = 'Hanover Street, rebuilt from the real shop: tin ceiling, white tile, blue-based glass cases, the shelf of giant cannoli, string globes and two busy queues.'; } })();
