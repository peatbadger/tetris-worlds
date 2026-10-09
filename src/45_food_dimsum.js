/* ---- Dim Sum blocks MADE OF dim sum (FoodMass) ----
   I har gow (translucent pleated skin, pink shrimp showing through) · O siu mai (yellow wrapper, pork, orange roe)
   · T char siu bao (fluffy white bun, split top showing red pork) · S jade chive dumpling (pan-fried golden base)
   · Z char siu (lacquered red BBQ pork, charred edges, sliced) · J taro bun (lavender, swirl top) · L sesame balls.
   v2: whole-piece drawing (no seams), matte (no glisten), no framed siu mai tile / roe eyes, no Y-split glyph. */
const DimsumFood = FoodMass({
  FOOD: [null, 'hargow', 'siumai', 'bao', 'chive', 'charsiu', 'taro', 'sesame'],
  MAIN: [null, '#f1d6cb', '#d89c74', '#f7f0e2', '#9fd2a0', '#bd3a24', '#b8a2dc', '#d08c3e'],
  soft: { hargow: 1.5, siumai: 1.2, bao: 1.6, chive: 1.4, charsiu: 0.8, taro: 1.5, sesame: 1.0 },
  shape: true, diag: true, R: 0.22,
  vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
    const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]], lw = (k) => Math.max(1, P * k), A = cells.length;
    let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
    const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
    const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
    const H = (i, k) => hash(45, i, k);
    const topCell = (a, c) => !cells.some(([a2, c2]) => a2 === a && c2 === c - 1), botCell = (a, c) => !cells.some(([a2, c2]) => a2 === a && c2 === c + 1);
    const blob = (u, v, rr, k, n = 7) => { const pt = []; for (let j = 0; j < n; j++) { const an = j / n * TAU, q = rr * (0.7 + H(k, j + 20) * 0.5); pt.push([u + Math.cos(an) * q, v + Math.sin(an) * q]); } x.beginPath(); for (let j = 0; j <= n; j++) { const p0 = pt[j % n], p1 = pt[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; j ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); };
    // shared form lighting on exposed sides only (no cell seams)
    const form = (hi, lo, w = 0.22) => {
      if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
      if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
    };
    switch (food) {
      case 'hargow': { // translucent wheat-starch skin; curled pink shrimp seen through it; fine pleats along the top
        fill('#efe0d4');
        piece(() => { const n = Math.max(2, Math.round(A * 1.1)); for (let i = 0; i < n; i++) { const [a, c] = cells[i % A], u = (a + 0.3 + H(i, 1) * 0.4) * P, v = (c + 0.35 + H(i, 2) * 0.3) * P, rr = P * 0.3, a0 = H(i, 3) * 6;
            x.save(); x.translate(u, v); x.rotate(a0); x.fillStyle = 'rgba(238,150,130,0.28)'; x.beginPath(); x.ellipse(0, 0, rr * 1.0, rr * 0.55, 0, 0, TAU); x.fill(); x.fillStyle = 'rgba(232,130,110,0.28)'; x.beginPath(); x.ellipse(rr * 0.15, 0, rr * 0.6, rr * 0.32, 0.2, 0, TAU); x.fill(); x.restore(); }
          x.fillStyle = 'rgba(255,250,244,0.35)'; for (let i = 0; i < A * 2; i++) { blob(X0 + H(i, 4) * BW, Y0 + H(i, 5) * BH, P * (0.2 + H(i, 6) * 0.2), i, 8); x.fill(); } x.lineCap = 'butt'; });
        if (!(mask & N)) { x.strokeStyle = 'rgba(190,160,140,0.22)'; x.lineWidth = lw(0.02); for (let k = 0; k < 4; k++) { const px = l + (r - l) * (k + 0.3 + H(vr, k) * 0.4) / 4; x.beginPath(); x.moveTo(px - P * 0.04, t + P * 0.02); x.quadraticCurveTo(px + P * 0.08, t + P * 0.1, px, t + P * 0.2); x.stroke(); } }
        form('rgba(255,255,255,0.3)', 'rgba(140,100,80,0.28)'); break; }
      case 'siumai': { // open-topped crown of pork & prawn: chunky filling, prawn pieces, a little roe in the middle; wrapper frill only along the base
        fill('#d8a084');
        piece(() => { for (let i = 0; i < A * 9; i++) { x.fillStyle = i % 2 ? 'rgba(196,128,98,0.6)' : 'rgba(236,184,160,0.65)'; blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.12 + H(i, 3) * 0.1), i, 7); x.fill(); }
          for (let i = 0; i < A * 1.2; i++) { const u = X0 + H(i, 7) * BW, v = Y0 + H(i, 8) * BH; x.save(); x.translate(u, v); x.rotate(H(i, 9) * 6); x.fillStyle = 'rgba(246,170,150,0.7)'; x.beginPath(); x.ellipse(0, 0, P * 0.16, P * 0.08, 0, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,226,214,0.6)'; x.beginPath(); x.ellipse(-P * 0.02, -P * 0.02, P * 0.1, P * 0.035, 0, 0, TAU); x.fill(); x.restore(); }
          x.fillStyle = 'rgba(120,70,50,0.35)'; for (let i = 0; i < A * 10; i++) { x.beginPath(); x.arc(X0 + H(i, 12) * BW, Y0 + H(i, 13) * BH, lw(0.015), 0, TAU); x.fill(); }
          const cx = X0 + BW / 2, cy = Y0 + BH / 2; for (let i = 0; i < 26; i++) { const an = H(i, 10) * TAU, d = P * 0.16 * Math.sqrt(H(i, 11)); x.fillStyle = i % 4 ? '#e8702a' : '#f49a4a'; x.beginPath(); x.arc(cx + Math.cos(an) * d, cy + Math.sin(an) * d * 0.8, P * 0.028, 0, TAU); x.fill(); }
          for (const [a, c] of cells) if (botCell(a, c)) { const sy = c * P; x.fillStyle = '#e6c050'; x.beginPath(); x.moveTo(a * P - 2, sy + P + 2); x.lineTo(a * P - 2, sy + P * 0.82); for (let k = 0; k <= 6; k++) x.lineTo(a * P + P * k / 6, sy + P * (0.78 + (k % 2) * 0.06)); x.lineTo(a * P + P + 2, sy + P + 2); x.closePath(); x.fill(); } });
        form('rgba(255,236,210,0.2)', 'rgba(110,60,30,0.32)'); break; }
      case 'bao': { // fluffy steamed bun, one ragged split across the top cells showing the red pork filling
        fill('#f6efe2');
        piece(() => { x.fillStyle = 'rgba(230,220,200,0.35)'; for (let i = 0; i < A * 2; i++) { blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.25 + H(i, 3) * 0.2), i, 8); x.fill(); }
          x.fillStyle = 'rgba(200,188,166,0.35)'; for (let i = 0; i < A * 14; i++) { x.beginPath(); x.arc(X0 + H(i, 4) * BW, Y0 + H(i, 5) * BH, lw(0.012), 0, TAU); x.fill(); }
          const tops = cells.filter(([a, c]) => topCell(a, c)).sort((p, q) => p[0] - q[0]); if (tops.length) { const xa = tops[0][0] * P + P * 0.18, xb = (tops[tops.length - 1][0] + 1) * P - P * 0.18; x.beginPath(); const yAt = (xx) => { const tc = tops.find(([a]) => xx >= a * P && xx < (a + 1) * P) || tops[0]; return tc[1] * P + P * 0.34; };
            x.moveTo(xa, yAt(xa)); const steps = 14; for (let j = 1; j <= steps; j++) { const xx = lerp(xa, xb, j / steps); x.lineTo(xx, yAt(xx) - P * (0.05 + H(j, 6) * 0.07)); } for (let j = steps; j >= 0; j--) { const xx = lerp(xa, xb, j / steps); x.lineTo(xx, yAt(xx) + P * (0.03 + H(j, 7) * 0.06) * Math.sin(j / steps * Math.PI)); } x.closePath(); x.fillStyle = '#9a2e1c'; x.fill(); x.strokeStyle = 'rgba(214,190,160,0.8)'; x.lineWidth = lw(0.03); x.stroke(); } });
        form('rgba(255,255,255,0.35)', 'rgba(150,130,100,0.3)'); break; }
      case 'chive': { // pan-fried chive dumpling: translucent pale-green skin, chives packed inside, golden fried base
        fill('#b8d8a8');
        piece(() => { x.lineCap = 'round'; for (let i = 0; i < A * 26; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, a0 = (wide ? 0 : Math.PI / 2) + (H(i, 3) - 0.5) * 0.6, len = P * (0.2 + H(i, 4) * 0.25); x.strokeStyle = i % 3 ? 'rgba(62,128,56,0.38)' : 'rgba(110,170,80,0.35)'; x.lineWidth = lw(0.05); x.beginPath(); x.moveTo(u, v); x.lineTo(u + Math.cos(a0) * len, v + Math.sin(a0) * len); x.stroke(); }
          x.fillStyle = 'rgba(236,246,226,0.45)'; for (let i = 0; i < A * 3; i++) { blob(X0 + H(i, 5) * BW, Y0 + H(i, 6) * BH, P * (0.22 + H(i, 7) * 0.22), i, 8); x.fill(); } x.lineCap = 'butt';
          for (const [a, c] of cells) if (botCell(a, c)) { const sy = c * P; x.fillStyle = lin(0, sy + P * 0.7, 0, sy + P, [[0, 'rgba(210,150,60,0)'], [0.45, 'rgba(210,150,60,0.8)'], [1, '#a8661e']]); x.fillRect(a * P - 2, sy + P * 0.7, P + 4, P * 0.32); } });
        form('rgba(255,255,255,0.25)', 'rgba(60,90,40,0.3)'); break; }
      case 'charsiu': { // one lacquered roast-pork mass: honey glaze, irregular charred caramel at edges, no grain/stripes
        fill('#a8301c');
        piece(() => { const g = wide ? lin(0, Y0, 0, Y0 + BH, [[0, '#c4482a'], [0.45, '#b23620'], [1, '#7e1c10']]) : lin(X0, 0, X0 + BW, 0, [[0, '#c4482a'], [0.45, '#b23620'], [1, '#7e1c10']]); x.fillStyle = g; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
          for (let i = 0; i < A * 3; i++) { const u = X0 + H(i, 3) * BW, v = Y0 + H(i, 4) * BH; x.fillStyle = i % 3 ? 'rgba(150,40,20,0.45)' : 'rgba(214,96,56,0.35)'; blob(u, v, P * (0.18 + H(i, 5) * 0.2), i + 40); x.fill(); }
          for (let i = 0; i < Math.max(2, A >> 1); i++) { const c = cells[(i * 3 + 1) % A], u = (c[0] + 0.25 + H(i, 31) * 0.5) * P, v = (c[1] + 0.25 + H(i, 32) * 0.5) * P; x.fillStyle = 'rgba(80,16,6,0.3)'; blob(u, v, P * (0.3 + H(i, 33) * 0.12), i + 90, 9); x.fill(); }
          x.fillStyle = 'rgba(232,150,90,0.22)'; for (let i = 0; i < A; i++) { const u = X0 + H(i, 21) * BW, v = Y0 + H(i, 22) * BH * 0.5; x.save(); x.translate(u, v); x.rotate(wide ? 0 : Math.PI / 2); x.beginPath(); x.ellipse(0, 0, P * 0.3, P * 0.06, 0, 0, TAU); x.fill(); x.restore(); }
        });
        form('rgba(255,190,140,0.18)', 'rgba(40,6,2,0.62)', 0.24); break; }
      case 'taro': { // lavender taro bun: matte steamed dough, fine taro flecks, gentle dome shading per piece
        fill('#bca8dc');
        piece(() => { x.fillStyle = lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(230,220,246,0.45)'], [0.6, 'rgba(0,0,0,0)'], [1, 'rgba(90,60,130,0.25)']]); x.fillRect(X0 - 4, Y0 - 4, BW + 8, BH + 8);
          x.fillStyle = 'rgba(110,80,150,0.5)'; for (let i = 0; i < A * 24; i++) { ellipse(x, X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, lw(0.02), lw(0.012), H(i, 3) * 3); x.fill(); }
          x.fillStyle = 'rgba(240,234,250,0.5)'; for (let i = 0; i < A * 10; i++) { x.beginPath(); x.arc(X0 + H(i, 4) * BW, Y0 + H(i, 5) * BH, lw(0.014), 0, TAU); x.fill(); } });
        form('rgba(255,255,255,0.3)', 'rgba(80,50,120,0.3)'); break; }
      case 'sesame': { // jian dui: golden fried shell densely coated in sesame seeds
        fill('#d08c3e');
        piece(() => { x.fillStyle = lin(X0, Y0, X0 + BW, Y0 + BH, [[0, 'rgba(240,190,110,0.5)'], [1, 'rgba(120,60,10,0.3)']]); x.fillRect(X0 - 4, Y0 - 4, BW + 8, BH + 8);
          for (let i = 0; i < A * 55; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, a0 = H(i, 3) * 3; x.fillStyle = 'rgba(120,70,20,0.35)'; ellipse(x, u + lw(0.01), v + lw(0.012), P * 0.032, P * 0.017, a0); x.fill(); x.fillStyle = i % 5 ? '#f6e8c8' : '#e2c890'; ellipse(x, u, v, P * 0.03, P * 0.016, a0); x.fill(); } });
        form('rgba(255,230,180,0.25)', 'rgba(90,40,6,0.4)'); break; }
    }
  },
  live(c, food, o) {
    const { s, mask, seed, T, small, hash } = o;
    return; // v2: no steam puffs (they read as grey smudges on the board)
    // a soft puff of steam now and then (no hooks or squiggles)
    const u = (T * 0.22 + hash(seed, 1)) % 1; if (u > 0.7) return;
    const x0 = (hash(seed, 2) - 0.5) * s * 0.4 + Math.sin(T * 1.3 + seed) * s * 0.06, y0 = -s * 0.45 - u * s * 0.7, rr = s * (0.14 + u * 0.22);
    c.globalAlpha = (o.alpha ?? 1) * Math.sin((u / 0.7) * Math.PI) * 0.3;
    c.fillStyle = radial(c, x0, y0, rr, [[0, 'rgba(255,255,255,0.9)'], [1, 'rgba(255,255,255,0)']]); c.fillRect(x0 - rr, y0 - rr, rr * 2, rr * 2);
    c.globalAlpha = o.alpha ?? 1;
  },
  clear(food, q) {
    const { v, X, Y, s, r, vr, push, dir } = q, col = DimsumFood.MAIN[v];
    if (food === 'sesame') { push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2 + r(1) * 2), vy: -s * 1.2, rot: 0, vr: dir * 6, life: 0.9, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'dot', col: '#fff6e0', r: 0.035, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * (1 + r(i) * 3), life: 0.6 }); return true; }
    push({ k: food === 'charsiu' ? 'slide' : 'squish', v, x: X, y: Y, vx: dir * s * (1.2 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1 + r(3) * 2), life: 0.8, vrr: vr });
    if (food !== 'charsiu') for (let i = 0; i < 3; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.6, y: Y - s * 0.3, vx: (r(i) - 0.5) * s, vy: -s * (1.5 + r(i + 13) * 1.5), g: -1, life: 0.9, r: 0.09 + r(i) * 0.06 });
    else for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? '#7a1a12' : '#e88a6a', r: 0.05, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 3, vy: -s * (1.5 + r(i) * 2), life: 0.6 });
    void col; return true;
  },
});
SKINSETS.dimsum = DimsumFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'dimsum'); if (st) { st.palette = DimsumFood.MAIN.slice(1); st.desc = 'Flat geometric banquet hall: the dragon & phoenix wall, an auntie with a steaming trolley, tea poured and lids flipped for refills — guzheng and erhu.'; } })();
