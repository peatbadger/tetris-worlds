/* ---- Mike's Pastry blocks MADE OF pastry (FoodMass) — v3, real proportions, refined light ----
   I cannoli laid end to end: every cell-pair is ONE short, fat cannoli (blistered golden shell, sugar dust, ricotta
   bulging from both open ends pressed into mini chips) · O Boston cream (sponge / custard / sponge under glossy ganache)
   · T strawberry cheesecake (graham base, creamy body, glossy berries) · S pistachio ricotta (chopped pistachio)
   · Z tiramisu (ladyfinger / mascarpone, cocoa dust) · J chocolate ganache torte (deep gloss, soft sheen)
   · L rainbow cookie (almond sponge green / white / red, chocolate). One continuous mass per piece, no marks. */
const PastryFood = FoodMass({
  FOOD: [null, 'cannoli', 'boston', 'cheesecake', 'pistachio', 'tiramisu', 'ganache', 'rainbow'],
  MAIN: [null, '#c98a45', '#e6c46e', '#efe4cc', '#b9cc8c', '#9a6a44', '#3e2218', '#6e9a5a'],
  soft: { boston: 1.4, cheesecake: 1.5, pistachio: 1.3, tiramisu: 1.2, ganache: 1.0, rainbow: 0.8, cannoli: 0.6 },
  glisten: { ganache: 0.55, cheesecake: 0.35, boston: 0.4 },
  vkey: (food, vr) => (food === 'cannoli' ? vr : vr % 4),
  vpaint: (food, vk) => (food === 'cannoli' ? vk : vk * 13 + 1),
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, band, hash, N, E, S, W } = Q;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const lin = (x0, y0, x1, y1, st) => { const g = x.createLinearGradient(x0, y0, x1, y1); st.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
    const specks = (n, col, sz, key, y0 = 0, y1 = 1) => { x.fillStyle = col; for (let i = 0; i < n; i++) { const q = Math.max(1, P * sz * (0.6 + hash(key, i, 9) * 0.8)); x.fillRect(C(hash(key, i, 1)), C(y0 + hash(key, i, 2) * (y1 - y0)), q, q); } };
    const topLight = (a = 0.16) => { if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.3, [[0, `rgba(255,248,230,${a})`], [1, 'rgba(255,248,230,0)']]); x.fillRect(l - 2, t, r - l + 4, P * 0.3); } };
    const botShade = (a = 0.22) => { if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.3, 0, b, [[0, 'rgba(30,12,4,0)'], [1, `rgba(30,12,4,${a})`]]); x.fillRect(l - 2, b - P * 0.3, r - l + 4, P * 0.3); } };
    switch (food) {
      case 'cannoli': {
        const horiz = (mask & (E | W)) || !(mask & (N | S)), lx = vr & 3, ly = (vr >> 2) & 3, first = horiz ? lx % 2 === 0 : ly % 2 === 0;
        // work in a local frame where the tube runs along +u; the open end of THIS cell's cannoli sits at u = 0 (first) or u = 1
        x.save(); if (!horiz) { x.translate(C(0.5), C(0.5)); x.rotate(Math.PI / 2); x.translate(-C(0.5), -C(0.5)); }
        const U = (u) => C(u), y0 = t - 2, y1 = b + 2, mid = (t + b) / 2, h = b - t;
        fill('#f4ecdc'); // ricotta peeking where two cannoli meet
        const endU = first ? 0.2 : 0.8, sx0 = first ? U(endU) : l - 3, sx1 = first ? r + 3 : U(endU);
        x.fillStyle = lin(0, t, 0, b, [[0, '#e9b56c'], [0.18, '#d9a058'], [0.55, '#c08040'], [1, '#86501f']]);
        x.beginPath(); x.moveTo(sx0, t + h * 0.02); x.lineTo(sx1, t + h * 0.02); x.lineTo(sx1, b - h * 0.02); x.lineTo(sx0, b - h * 0.02); x.closePath(); x.fill();
        // lip of the shell (a slightly flared rim) and the bulging cream face, pressed into mini chips
        const ex = U(endU), dir = first ? -1 : 1;
        x.fillStyle = '#a86a32'; x.beginPath(); x.ellipse(ex, mid, P * 0.07, h * 0.5, 0, 0, TAU); x.fill();
        x.fillStyle = lin(0, t, 0, b, [[0, '#fffaf0'], [1, '#e6dcc6']]); x.beginPath(); x.ellipse(ex + dir * P * 0.07, mid, P * 0.13, h * 0.44, 0, 0, TAU); x.fill();
        x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.ellipse(ex + dir * P * 0.1, mid - h * 0.2, P * 0.04, h * 0.08, 0, 0, TAU); x.fill();
        if (!small) { x.fillStyle = '#22140c'; for (let i = 0; i < 9; i++) { const cy = mid + (hash(vr, i, 31) - 0.5) * h * 0.78, cx = ex + dir * P * (0.04 + hash(vr, i, 32) * 0.15); x.beginPath(); x.arc(cx, cy, Math.max(0.8, P * 0.024), 0, TAU); x.fill(); } }
        // wrap seam + blistered surface + powdered sugar on the light side
        x.strokeStyle = 'rgba(120,70,30,0.5)'; x.lineWidth = Math.max(0.8, P * 0.02); x.beginPath(); const sm = first ? U(0.62) : U(0.38); x.moveTo(sm - P * 0.1, t + h * 0.04); x.lineTo(sm + P * 0.06, b - h * 0.04); x.stroke();
        for (let i = 0; i < (small ? 6 : 20); i++) { const bx = lerp(sx0 + P * 0.08, sx1 - P * 0.04, hash(vr, i, 3)), by = t + h * (0.1 + hash(vr, i, 4) * 0.8), q = P * (0.018 + hash(i, vr, 5) * 0.022); x.fillStyle = hash(i, vr, 6) < 0.55 ? 'rgba(250,215,150,0.75)' : 'rgba(110,55,15,0.5)'; x.beginPath(); x.ellipse(bx, by, q * 1.3, q, 0, 0, TAU); x.fill(); }
        x.fillStyle = 'rgba(255,246,226,0.32)'; x.fillRect(sx0 + P * 0.04, t + h * 0.1, sx1 - sx0 - P * 0.06, h * 0.07);
        x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < (small ? 5 : 22); i++) { const px = lerp(sx0 + P * 0.06, sx1, hash(vr, i, 7)), py = t + h * (0.05 + Math.pow(hash(vr, i, 8), 1.6) * 0.45), q = Math.max(0.8, P * (0.012 + hash(i, vr, 9) * 0.014)); x.fillRect(px, py, q, q); }
        x.restore();
        botShade(0.18);
        return;
      }
      case 'boston': { // sponge / custard / sponge; ganache with a soft specular streak on top
        fill('#e9c878');
        x.fillStyle = '#f7e3a4'; x.fillRect(l - 2, C(0.44), r - l + 4, P * 0.14); x.fillStyle = 'rgba(160,110,40,0.35)'; x.fillRect(l - 2, C(0.44), r - l + 4, Math.max(1, P * 0.02)); x.fillRect(l - 2, C(0.58), r - l + 4, Math.max(1, P * 0.02));
        specks(small ? 4 : 18, 'rgba(176,128,56,0.55)', 0.022, vr + 11, 0.05, 0.42); specks(small ? 3 : 14, 'rgba(176,128,56,0.55)', 0.022, vr + 12, 0.62, 0.98);
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.3, [[0, '#2a150c'], [1, '#4a2616']]); x.fillRect(l - 2, t - 2, r - l + 4, P * 0.26); for (let i = 0; i < 3; i++) { const dx = C(0.18 + i * 0.32 + hash(vr, i) * 0.08); x.beginPath(); x.ellipse(dx, t + P * 0.26, P * 0.05, P * (0.05 + hash(i, vr) * 0.06), 0, 0, TAU); x.fill(); }
          x.fillStyle = 'rgba(255,236,210,0.5)'; x.beginPath(); x.ellipse(C(0.45), t + P * 0.07, P * 0.28, P * 0.022, -0.04, 0, TAU); x.fill(); }
        topLight(0.1); botShade(0.2); return;
      }
      case 'cheesecake': {
        fill(lin(0, t, 0, b, [[0, '#f6eedc'], [1, '#ece0c4']]));
        specks(small ? 2 : 8, 'rgba(200,170,120,0.25)', 0.03, vr + 21);
        if (!(mask & S)) { x.fillStyle = '#7a4c2a'; x.fillRect(l - 2, b - P * 0.2, r - l + 4, P * 0.22); specks(small ? 3 : 12, '#a06a3e', 0.03, vr + 22, 0.82, 0.98); }
        if (!(mask & N)) { x.fillStyle = '#a81e2c'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.2); for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(C(0.15 + i * 0.35), t + P * 0.2, P * 0.05, P * (0.04 + hash(vr, i) * 0.06), 0, 0, TAU); x.fill(); }
          for (let i = 0; i < 2; i++) { const bx = C(0.27 + i * 0.46), by = t + P * 0.08, br = P * 0.15; x.fillStyle = '#c42a36'; x.beginPath(); x.moveTo(bx - br, by); x.quadraticCurveTo(bx - br, by - br * 1.1, bx, by - br * 0.9); x.quadraticCurveTo(bx + br, by - br * 1.1, bx + br, by); x.quadraticCurveTo(bx, by + br * 1.1, bx - br, by); x.fill();
            x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.ellipse(bx - br * 0.35, by - br * 0.45, br * 0.22, br * 0.12, -0.5, 0, TAU); x.fill(); if (!small) { x.fillStyle = '#f0d070'; for (let k = 0; k < 5; k++) x.fillRect(bx - br * 0.5 + k * br * 0.25, by + (k % 2) * br * 0.25 - br * 0.1, Math.max(1, P * 0.012), Math.max(1, P * 0.018)); } } }
        topLight(0.08); botShade(0.15); return;
      }
      case 'pistachio': {
        fill(lin(0, t, 0, b, [[0, '#cfdcaa'], [1, '#b2c486']]));
        x.strokeStyle = 'rgba(255,255,240,0.35)'; x.lineWidth = Math.max(1, P * 0.04); for (let k = 0; k < 2; k++) { x.beginPath(); x.moveTo(l - 2, C(0.3 + k * 0.45)); x.bezierCurveTo(C(0.3), C(0.18 + k * 0.45), C(0.6), C(0.42 + k * 0.45), r + 2, C(0.26 + k * 0.45)); x.stroke(); }
        const g = ['#5e7a2a', '#86a442', '#a8bc5c', '#7a5a4a']; for (let i = 0; i < (small ? 6 : 18); i++) { x.fillStyle = g[i % 4]; const px = C(hash(vr, i, 4)), py = C(hash(vr, i, 5)), q = P * (0.03 + hash(i, vr, 6) * 0.03); x.beginPath(); x.moveTo(px - q, py); x.lineTo(px, py - q * 0.8); x.lineTo(px + q, py + q * 0.2); x.lineTo(px + q * 0.1, py + q); x.closePath(); x.fill(); }
        topLight(0.18); botShade(0.18); return;
      }
      case 'tiramisu': {
        fill('#efe2c6');
        for (const [y, hh] of [[0.24, 0.2], [0.66, 0.2]]) { x.fillStyle = '#8e5e36'; x.fillRect(l - 2, C(y), r - l + 4, P * hh); x.fillStyle = 'rgba(60,30,10,0.35)'; for (let i = 0; i < 4; i++) x.fillRect(C(i * 0.27 + 0.1), C(y), Math.max(1, P * 0.015), P * hh); x.fillStyle = 'rgba(255,230,190,0.18)'; x.fillRect(l - 2, C(y), r - l + 4, P * 0.04); }
        if (!(mask & N)) { x.fillStyle = '#5a3622'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.12); specks(small ? 6 : 26, '#3a2014', 0.02, vr + 41, 0.0, 0.16); }
        topLight(0.06); botShade(0.2); return;
      }
      case 'ganache': {
        fill(lin(0, t, 0, b, [[0, '#4a2a1c'], [1, '#2e180e']]));
        x.fillStyle = 'rgba(255,220,190,0.07)'; x.fillRect(l - 2, C(0.48), r - l + 4, P * 0.04);
        if (!(mask & N)) { x.fillStyle = 'rgba(255,232,210,0.45)'; x.beginPath(); x.ellipse(C(0.42), t + P * 0.08, P * 0.3, P * 0.03, -0.05, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.ellipse(C(0.3), t + P * 0.075, P * 0.07, P * 0.012, 0, 0, TAU); x.fill(); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * 0.2, 0, [[0, 'rgba(255,220,190,0.16)'], [1, 'rgba(255,220,190,0)']]); x.fillRect(l, t, P * 0.2, b - t); }
        botShade(0.3); return;
      }
      case 'rainbow': {
        fill('#f2e6c8');
        x.fillStyle = '#5f8f4a'; x.fillRect(l - 2, t - 2, r - l + 4, C(0.36) - t + 2); x.fillStyle = '#c43a34'; x.fillRect(l - 2, C(0.64), r - l + 4, b - C(0.64) + 2);
        x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(l - 2, C(0.08), r - l + 4, P * 0.05); x.fillRect(l - 2, C(0.68), r - l + 4, P * 0.05);
        x.fillStyle = '#d8a0a0'; x.fillRect(l - 2, C(0.36), r - l + 4, Math.max(1, P * 0.02)); x.fillRect(l - 2, C(0.62), r - l + 4, Math.max(1, P * 0.02));
        if (!(mask & N)) { x.fillStyle = '#3a2116'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.12); x.fillStyle = 'rgba(255,230,200,0.3)'; x.fillRect(C(0.1), t + P * 0.03, P * 0.5, Math.max(1, P * 0.015)); }
        if (!(mask & S)) { x.fillStyle = '#3a2116'; x.fillRect(l - 2, b - P * 0.08, r - l + 4, P * 0.1); }
        specks(small ? 3 : 10, 'rgba(0,0,0,0.08)', 0.025, vr + 51);
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
