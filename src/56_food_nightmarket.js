/* ---- Night Market blocks MADE OF street food (FoodMass) — v2 ----
   One continuous mass per piece, everything drawn in whole-piece space (shape/rotation info), matte, no clip-art:
   I Taiwanese sausage (one long grilled sausage) · O XXL chicken cutlet (coarse starch flakes, chili dust)
   · T stinky tofu (porous fried crust, pickled cabbage piled on top) · S scallion pancake (flaky laminated spiral,
   scallion) · Z oyster omelette (translucent starch, egg, greens, oysters, sweet red sauce ribbons)
   · J mango shaved ice (snowy shavings, mango cubes, condensed milk) · L pepper bun (baked crust, sesame, scorched base).
   v2 replaces milk tea (Boba owns it) and tanghulu (glossy balls in cells). */
const NightFood = (() => {
  const M = FoodMass({
    FOOD: [null, 'sausage', 'cutlet', 'tofu', 'scallion', 'omelette', 'shaveice', 'pepperbun'],
    MAIN: [null, '#d6503e', '#d09440', '#7a4618', '#ecd08a', '#dc5a68', '#f2eee4', '#a86c30'],
    soft: { sausage: 0.9, cutlet: 1.0, tofu: 1.1, scallion: 1.1, omelette: 1.5, shaveice: 1.5, pepperbun: 1.1 },
    shape: true, diag: true, R: 0.2,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
      const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]], lw = (k) => Math.max(1, P * k);
      let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
      const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P, A = cells.length;
      const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(23, i, k);
      const topCell = (a, c) => !cells.some(([a2, c2]) => a2 === a && c2 === c - 1), botCell = (a, c) => !cells.some(([a2, c2]) => a2 === a && c2 === c + 1);
      const form = (hi, lo, w = 0.22) => {
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
      };
      const blob = (u, v, rr, k, n = 7) => { const pt = []; for (let j = 0; j < n; j++) { const an = j / n * TAU, q = rr * (0.65 + H(k, j + 20) * 0.6); pt.push([u + Math.cos(an) * q, v + Math.sin(an) * q]); } x.beginPath(); for (let j = 0; j <= n; j++) { const p0 = pt[j % n], p1 = pt[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; j ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); };
      switch (food) {
        case 'sausage': { // one long sausage along the piece: round casing shading, grill bars, fat speckle
          fill('#d45444');
          piece(() => { x.save(); if (!wide) { x.translate(X0 + BW / 2, Y0 + BH / 2); x.rotate(Math.PI / 2); x.translate(-(X0 + BW / 2), -(Y0 + BH / 2)); }
            const L0 = wide ? X0 : X0 + BW / 2 - BH / 2, L1 = wide ? X0 + BW : X0 + BW / 2 + BH / 2, T0 = wide ? Y0 : Y0 + BH / 2 - BW / 2, T1 = T0 + (wide ? BH : BW);
            x.fillStyle = lin(0, T0, 0, T1, [[0, '#f48a74'], [0.35, '#de5c4a'], [0.75, '#b43828'], [1, '#741c12']]); x.fillRect(L0 - P, T0 - 2, L1 - L0 + 2 * P, T1 - T0 + 4);
            x.fillStyle = 'rgba(240,200,170,0.45)'; for (let i = 0; i < (L1 - L0) / P * 14; i++) { x.beginPath(); x.arc(L0 + H(i, 1) * (L1 - L0), T0 + (0.2 + H(i, 2) * 0.6) * (T1 - T0), P * (0.012 + H(i, 3) * 0.014), 0, TAU); x.fill(); }
            x.strokeStyle = 'rgba(46,12,4,0.62)'; x.lineWidth = P * 0.07; x.lineCap = 'round'; for (let xx = L0 + P * 0.3; xx < L1; xx += P * 0.55) { x.beginPath(); x.moveTo(xx - P * 0.12, T0 + (T1 - T0) * 0.14); x.lineTo(xx + P * 0.12, T1 - (T1 - T0) * 0.14); x.stroke(); } x.lineCap = 'butt';
            x.fillStyle = 'rgba(255,214,190,0.18)'; x.fillRect(L0 - P, T0 + (T1 - T0) * 0.2, L1 - L0 + 2 * P, P * 0.05); x.restore(); });
          form('rgba(255,190,160,0.12)', 'rgba(40,6,2,0.3)', 0.14); break; }
        case 'cutlet': { // XXL fried chicken: coarse sweet-potato-starch flakes (pale), deep golden base, chili-pepper dust
          fill('#dca24c');
          piece(() => { x.fillStyle = 'rgba(230,170,90,0.35)'; for (let i = 0; i < 5; i++) { blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.4 + H(i, 3) * 0.4), i, 9); x.fill(); }
            const n = Math.round(A * 60); for (let i = 0; i < n; i++) { const u = X0 + H(i, 4) * BW, v = Y0 + H(i, 5) * BH, rr = P * (0.025 + H(i, 6) * 0.045); x.fillStyle = 'rgba(110,56,12,0.35)'; blob(u + rr * 0.3, v + rr * 0.35, rr, i + 9, 5); x.fill(); x.fillStyle = H(i, 7) < 0.6 ? 'rgba(246,230,196,0.85)' : 'rgba(232,196,128,0.9)'; blob(u, v, rr, i + 9, 5); x.fill(); }
            x.fillStyle = 'rgba(176,52,30,0.55)'; for (let i = 0; i < A * 22; i++) x.fillRect(X0 + H(i, 8) * BW, Y0 + H(i, 9) * BH, lw(0.022), lw(0.022)); });
          form('rgba(255,230,170,0.2)', 'rgba(90,40,6,0.45)'); break; }
        case 'tofu': { // stinky tofu: porous deep-fried crust, pickled cabbage + chili heaped on the top cells
          fill('#683a12');
          piece(() => { const n = Math.round(A * 34); for (let i = 0; i < n; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, rr = P * (0.018 + H(i, 3) * 0.04); x.fillStyle = 'rgba(150,92,36,0.5)'; ellipse(x, u - rr * 0.2, v - rr * 0.3, rr * 1.25, rr * 0.95); x.fill(); x.fillStyle = 'rgba(52,24,6,0.7)'; ellipse(x, u, v, rr, rr * 0.75); x.fill(); }
            for (const [a, c] of cells) { if (!topCell(a, c)) continue; const sx = a * P, sy = c * P; x.fillStyle = '#ece4bc'; x.beginPath(); x.moveTo(sx - 2, sy + P * 0.36); for (let k = 0; k <= 7; k++) x.lineTo(sx - 2 + (P + 4) * k / 7, sy + P * (0.02 + H(a * 9 + k, c) * 0.12)); x.lineTo(sx + P + 2, sy + P * 0.36); x.closePath(); x.fill();
              x.strokeStyle = 'rgba(170,190,110,0.75)'; x.lineWidth = lw(0.025); for (let k = 0; k < 6; k++) { const u = sx + P * H(k, a + c * 5), v = sy + P * (0.1 + H(k + 3, a) * 0.2); x.beginPath(); x.moveTo(u, v); x.lineTo(u + P * 0.16, v + P * (H(k, 9) - 0.5) * 0.1); x.stroke(); }
              x.fillStyle = '#c8321e'; for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(sx + P * H(k + 11, a), sy + P * (0.08 + H(k + 12, c) * 0.22), lw(0.03), 0, TAU); x.fill(); } } });
          form('rgba(255,210,150,0.18)', 'rgba(40,16,2,0.5)'); break; }
        case 'scallion': { // scallion pancake: laminated spiral layers, crisp brown patches, scallion bits
          fill('#ecd08a');
          piece(() => { const cx = X0 + BW / 2, cy = Y0 + BH / 2; for (let k = 22; k > 0; k--) { const rr = k * P * 0.13; x.strokeStyle = k % 2 ? 'rgba(252,236,184,0.75)' : 'rgba(196,150,70,0.4)'; x.lineWidth = P * 0.05; x.beginPath(); x.ellipse(cx, cy, rr, rr * 0.8, 0.3, k * 0.7, k * 0.7 + 4.6); x.stroke(); }
            x.fillStyle = 'rgba(170,110,40,0.3)'; for (let i = 0; i < A * 2; i++) { blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.1 + H(i, 3) * 0.12), i, 8); x.fill(); }
            for (let i = 0; i < A * 26; i++) { const u = X0 + H(i, 4) * BW, v = Y0 + H(i, 5) * BH; x.save(); x.translate(u, v); x.rotate(H(i, 6) * 3); x.fillStyle = H(i, 7) < 0.6 ? '#4e9a3a' : '#9cc85a'; roundRect(x, -P * 0.05, -P * 0.03, P * 0.1, P * 0.06, P * 0.025); x.fill(); x.restore(); } });
          form('rgba(255,236,190,0.25)', 'rgba(110,60,10,0.35)'); break; }
        case 'omelette': { // oyster omelette: translucent starch, egg patches, greens, oysters, sweet red sauce ribbons
          fill('#d89a8a');
          piece(() => { x.fillStyle = 'rgba(244,196,72,0.4)'; for (let i = 0; i < A * 1.2; i++) { blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.2 + H(i, 3) * 0.2), i, 9); x.fill(); }
            x.fillStyle = 'rgba(255,252,236,0.35)'; for (let i = 0; i < A * 2; i++) { blob(X0 + H(i, 4) * BW, Y0 + H(i, 5) * BH, P * (0.12 + H(i, 6) * 0.14), i + 30, 8); x.fill(); }
            for (let i = 0; i < A * 1.6; i++) { const u = X0 + H(i, 7) * BW, v = Y0 + H(i, 8) * BH; x.save(); x.translate(u, v); x.rotate(H(i, 9) * 6); x.fillStyle = '#3e7a34'; x.beginPath(); x.moveTo(-P * 0.14, 0); x.quadraticCurveTo(-P * 0.05, -P * 0.1, P * 0.02, -P * 0.03); x.quadraticCurveTo(P * 0.08, -P * 0.1, P * 0.14, 0); x.quadraticCurveTo(0, P * 0.08, -P * 0.14, 0); x.fill(); x.restore(); }
            for (let i = 0; i < A * 1.3; i++) { const u = X0 + H(i, 10) * BW, v = Y0 + H(i, 11) * BH, a0 = H(i, 12) * 6; x.save(); x.translate(u, v); x.rotate(a0); x.fillStyle = '#8c8a7c'; x.beginPath(); x.moveTo(-P * 0.13, 0); x.quadraticCurveTo(-P * 0.1, -P * 0.1, P * 0.04, -P * 0.08); x.quadraticCurveTo(P * 0.14, -P * 0.02, P * 0.1, P * 0.05); x.quadraticCurveTo(0, P * 0.1, -P * 0.13, 0); x.fill(); x.fillStyle = 'rgba(60,58,50,0.5)'; x.fillRect(-P * 0.08, P * 0.02, P * 0.16, lw(0.02)); x.fillStyle = 'rgba(222,216,196,0.55)'; ellipse(x, -P * 0.02, -P * 0.03, P * 0.05, P * 0.025, 0.2); x.fill(); x.restore(); }
            x.strokeStyle = 'rgba(220,70,80,0.95)'; x.lineCap = 'round'; x.lineJoin = 'round'; for (let k = 0; k < Math.max(2, Math.round(BH / P * 1.6)); k++) { x.lineWidth = P * (0.16 + H(k, 13) * 0.06); x.beginPath(); const y0 = Y0 + P * 0.25 + k * P * 0.6; for (let j = 0; j <= 40; j++) { const xx = X0 - P * 0.2 + (BW + P * 0.4) * j / 40, yy = y0 + Math.sin(j * 0.32 + k * 2) * P * 0.2 + Math.sin(j * 0.9 + k) * P * 0.04; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
            x.strokeStyle = 'rgba(255,190,160,0.35)'; x.lineWidth = lw(0.025); for (let k = 0; k < Math.max(2, Math.round(BH / P * 1.6)); k++) { x.beginPath(); const y0 = Y0 + P * 0.22 + k * P * 0.6; for (let j = 0; j <= 40; j++) { const xx = X0 - P * 0.2 + (BW + P * 0.4) * j / 40, yy = y0 + Math.sin(j * 0.32 + k * 2) * P * 0.2 + Math.sin(j * 0.9 + k) * P * 0.04; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } x.lineCap = 'butt'; });
          form('rgba(255,250,230,0.22)', 'rgba(120,80,20,0.3)'); break; }
        case 'shaveice': { // mango shaved ice: snowy shaved-ice texture, mango cubes, condensed-milk drizzle
          fill('#f2eee4');
          piece(() => { x.fillStyle = 'rgba(255,250,232,0.5)'; for (let i = 0; i < A * 3; i++) { blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.25 + H(i, 3) * 0.25), i, 8); x.fill(); }
            x.lineCap = 'round'; for (let i = 0; i < A * 60; i++) { const u = X0 + H(i, 4) * BW, v = Y0 + H(i, 5) * BH, a0 = H(i, 6) * 3; x.strokeStyle = i % 3 ? 'rgba(255,255,255,0.8)' : 'rgba(190,200,214,0.4)'; x.lineWidth = lw(0.022); x.beginPath(); x.moveTo(u, v); x.lineTo(u + Math.cos(a0) * P * 0.07, v + Math.sin(a0) * P * 0.07); x.stroke(); }
            for (let i = 0; i < A * 4; i++) { const [a, c] = cells[Math.floor(H(i, 7) * A)], top = topCell(a, c); if (!top && H(i, 8) < 0.5) continue; const u = (a + 0.15 + H(i, 9) * 0.7) * P, v = (c + (top ? 0.12 : 0.2) + H(i, 10) * 0.6) * P, q = P * (0.08 + H(i, 11) * 0.05); x.save(); x.translate(u, v); x.rotate((H(i, 12) - 0.5) * 0.9); x.fillStyle = '#d8841c'; roundRect(x, -q, -q * 0.8, q * 2, q * 1.9, q * 0.35); x.fill(); x.fillStyle = '#f4a632'; roundRect(x, -q, -q, q * 2, q * 1.6, q * 0.35); x.fill(); x.fillStyle = 'rgba(255,214,120,0.6)'; roundRect(x, -q * 0.7, -q * 0.75, q * 1.1, q * 0.5, q * 0.2); x.fill(); x.restore(); }
            x.strokeStyle = 'rgba(255,252,240,0.9)'; for (let k = 0; k < Math.max(2, Math.round(BH / P)); k++) { x.lineWidth = P * (0.035 + H(k, 13) * 0.02); x.beginPath(); const y0 = Y0 + P * 0.45 + k * P; for (let j = 0; j <= 40; j++) { const xx = X0 - P * 0.2 + (BW + P * 0.4) * j / 40, yy = y0 + Math.sin(j * 0.45 + k * 3) * P * 0.22; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } x.lineCap = 'butt'; });
          form('rgba(255,255,255,0.3)', 'rgba(150,110,40,0.3)'); break; }
        case 'pepperbun': { // hu jiao bing: baked golden crust, sesame on the top cells, scorched base on the bottom cells
          fill('#a86c30');
          piece(() => { for (let i = 0; i < A * 2; i++) { x.fillStyle = i % 2 ? 'rgba(220,160,90,0.35)' : 'rgba(120,70,24,0.3)'; blob(X0 + H(i, 1) * BW, Y0 + H(i, 2) * BH, P * (0.2 + H(i, 3) * 0.25), i, 9); x.fill(); } x.fillStyle = 'rgba(120,70,20,0.4)'; for (let i = 0; i < A * 12; i++) x.fillRect(X0 + H(i, 14) * BW, Y0 + H(i, 15) * BH, lw(0.02), lw(0.02));
            for (const [a, c] of cells) { const sx = a * P, sy = c * P;
              if (topCell(a, c)) { x.fillStyle = '#f6ecd2'; for (let i = 0; i < (small ? 3 : 9); i++) { ellipse(x, sx + P * (0.08 + H(i, a * 3 + c) * 0.84), sy + P * (0.06 + H(i + 5, a + c * 3) * 0.3), Math.max(0.8, P * 0.034), Math.max(0.5, P * 0.018), H(i, 7) * 3); x.fill(); } }
              if (botCell(a, c)) { x.fillStyle = lin(0, sy + P * 0.72, 0, sy + P, [[0, 'rgba(90,40,10,0)'], [0.5, 'rgba(90,40,10,0.5)'], [1, '#3a1a08']]); x.fillRect(sx - 2, sy + P * 0.72, P + 4, P * 0.3); } } });
          form('rgba(255,236,190,0.3)', 'rgba(100,50,10,0.4)'); break; }
      }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, col = NightFood.MAIN[v];
      push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.2 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1 + r(3) * 2), life: 0.8, vrr: vr });
      for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? col : '#f6e6c0', r: 0.05, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 3, vy: -s * (1.5 + r(i) * 2), life: 0.6 });
      return true;
    },
  });
  return M;
})();
SKINSETS.nightmarket = NightFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'nightmarket'); if (st) st.palette = NightFood.MAIN.slice(1); })();
