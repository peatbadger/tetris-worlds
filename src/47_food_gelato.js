/* ---- Gelateria blocks MADE OF sculpted gelato (FoodMass) ----
   Each piece is one tin of gelato, spatula-sculpted into continuous waves; exposed tops rise into scooped mounds with the
   flavour's garnish; a slight melt sheen and drips on exposed bottoms.
   I pistachio (chopped nuts) · O fragola (strawberry slices) · T limone (lemon wheel) · S cioccolato (curls)
   · Z mango (mango cubes) · J mirtillo (blueberries) · L stracciatella (chocolate flecks). */
const GelatoFood = (() => {
  const C3 = { pistachio: ['#b8d070', '#d4e698', '#8aa848'], fragola: ['#f47a96', '#ffb0c0', '#c84a6a'], limone: ['#f8e46a', '#fff4a8', '#d8bc3a'], cioccolato: ['#6a3a22', '#8e5636', '#40200e'], mango: ['#ffa63a', '#ffc870', '#d87a1a'], mirtillo: ['#7a5ac8', '#a68ae8', '#523a96'], stracciatella: ['#f8f2e4', '#ffffff', '#ddd2bc'] };
  const M = FoodMass({
    FOOD: [null, 'pistachio', 'fragola', 'limone', 'cioccolato', 'mango', 'mirtillo', 'stracciatella'],
    MAIN: [null, '#b8d070', '#f47a96', '#f8e46a', '#6a3a22', '#ffa63a', '#7a5ac8', '#f8f2e4'],
    soft: { pistachio: 1.5, fragola: 1.6, limone: 1.5, cioccolato: 1.4, mango: 1.6, mirtillo: 1.5, stracciatella: 1.5 },
    shape: true, diag: true, R: 0.26, padK: 0.3,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    // v2: one sculpted tin per piece, drawn in piece space (no per-cell scallops/seams), inclusions folded INTO the gelato, no garnish clip-art
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
      const [c0, c1, c2] = C3[food];
      const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]], lw = (k) => Math.max(1, P * k), A = cells.length;
      let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
      const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P;
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(47, i, k);
      const has = (a, c) => cells.some(([a2, c2]) => a2 === a && c2 === c);
      const blob = (u, v, rr, k, n = 7, sq = 1) => { const pt = []; for (let j = 0; j < n; j++) { const an = j / n * TAU, q = rr * (0.7 + H(k, j + 20) * 0.5); pt.push([u + Math.cos(an) * q, v + Math.sin(an) * q * sq]); } x.beginPath(); for (let j = 0; j <= n; j++) { const p0 = pt[j % n], p1 = pt[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; j ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); };
      const ph = H(A * 7 + bx1 * 3 + by1, 1) * TAU, waveY = (u) => Math.sin(u / P * 2.2 + ph) * P * 0.07;
      // body: soft vertical gradient across the whole piece (lighter crown, cooler base)
      x.fillStyle = c0; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      piece(() => {
        x.fillStyle = lin(0, Y0, 0, Y0 + BH, [[0, rgba(c1, 0.55)], [0.5, rgba(c0, 0)], [1, rgba(c2, 0.35)]]); x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
        // spatula swipes: long shallow arcs that run across cells, a lit ridge with a shadow under it
        // sculpted surface: soft wave ridges that run continuously across the piece (tonal, low contrast, never line-art)
        for (let yk = Y0 + P * 0.62, k = 0; yk < Y0 + BH + P * 0.3; yk += P * 0.72, k++) { const amp = P * (0.07 + H(k, 2) * 0.05), fr = 1.3 + H(k, 3) * 0.6, yy = (u) => yk + Math.sin(u / P * fr + ph + k * 1.7) * amp;
          const band = (o0, o1) => { x.beginPath(); for (let i = 0; i <= 20; i++) { const u = X0 - P * 0.2 + (BW + P * 0.4) * i / 20; i ? x.lineTo(u, yy(u) + o0) : x.moveTo(u, yy(u) + o0); } for (let i = 20; i >= 0; i--) { const u = X0 - P * 0.2 + (BW + P * 0.4) * i / 20; x.lineTo(u, yy(u) + o1); } x.closePath(); };
          x.fillStyle = rgba(c2, food === 'stracciatella' ? 0.1 : 0.16); band(-P * 0.1, 0); x.fill();
          x.fillStyle = rgba(c1, food === 'cioccolato' ? 0.28 : 0.4); band(0, P * 0.12); x.fill();
          x.fillStyle = rgba(c1, 0.18); band(P * 0.12, P * 0.26); x.fill(); }
        // crest along the real top edge of the piece: one continuous wave (phase from piece-x, so neighbours join)
        for (const [a, c] of cells) { if (has(a, c - 1)) continue; const u0 = a * P - (has(a - 1, c) ? 1 : -P * 0.08), u1 = (a + 1) * P + (has(a + 1, c) ? 1 : -P * 0.08), y0 = c * P;
          x.fillStyle = lin(0, y0, 0, y0 + P * 0.32, [[0, c1], [1, rgba(c1, 0)]]); x.beginPath(); x.moveTo(u0, y0 + P * 0.34);
          for (let k = 0; k <= 8; k++) { const u = u0 + (u1 - u0) * k / 8; x.lineTo(u, y0 + P * 0.1 + waveY(u)); } x.lineTo(u1, y0 + P * 0.34); x.closePath(); x.fill(); x.strokeStyle = rgba(c2, 0.28); x.lineWidth = lw(0.05); x.beginPath(); for (let k = 0; k <= 8; k++) { const u = u0 + (u1 - u0) * k / 8; k ? x.lineTo(u, y0 + P * 0.3 + waveY(u + P * 0.3) * 1.4) : x.moveTo(u, y0 + P * 0.3 + waveY(u + P * 0.3) * 1.4); } x.stroke();
          x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = lw(0.03); x.beginPath(); for (let k = 1; k <= 6; k++) { const u = u0 + (u1 - u0) * k / 8; k === 1 ? x.moveTo(u, y0 + P * 0.15 + waveY(u)) : x.lineTo(u, y0 + P * 0.15 + waveY(u)); } x.stroke(); }
        const inner = (i, k, m = 0.12) => { const [a, c] = cells[(i * 5 + k) % A]; return [(a + m + H(i, k) * (1 - 2 * m)) * P, (c + 0.22 + H(i, k + 1) * (0.78 - m)) * P]; };
        switch (food) {
          case 'pistachio': for (let i = 0; i < A * 5; i++) { const [u, v] = inner(i, 7); x.fillStyle = i % 3 ? 'rgba(110,140,48,0.7)' : 'rgba(214,196,140,0.75)'; blob(u, v, P * (0.04 + H(i, 9) * 0.03), i + 50, 5, 0.7); x.fill(); x.fillStyle = 'rgba(70,90,30,0.25)'; blob(u + lw(0.02), v + lw(0.025), P * 0.03, i + 70, 5, 0.6); x.fill(); } break;
          case 'fragola': { x.lineCap = 'round'; x.lineJoin = 'round'; const L0 = wide ? X0 : Y0, L1 = wide ? X0 + BW : Y0 + BH, M0 = wide ? Y0 + BH * 0.55 : X0 + BW * 0.5, amp = P * 0.22;
            const path = (o) => { x.beginPath(); for (let k = 0; k <= 16; k++) { const u = L0 - P * 0.2 + (L1 - L0 + P * 0.4) * k / 16, m = M0 + Math.sin(u / P * 1.7 + ph) * amp + o; wide ? (k ? x.lineTo(u, m) : x.moveTo(u, m)) : (k ? x.lineTo(m, u) : x.moveTo(m, u)); } };
            x.strokeStyle = 'rgba(150,16,44,0.45)'; x.lineWidth = lw(0.16); path(lw(0.02)); x.stroke(); x.strokeStyle = 'rgba(206,40,70,0.85)'; x.lineWidth = lw(0.11); path(0); x.stroke(); x.strokeStyle = 'rgba(255,150,170,0.45)'; x.lineWidth = lw(0.03); path(-lw(0.025)); x.stroke();
            for (let i = 0; i < A; i++) { const [u, v] = inner(i, 13); x.fillStyle = 'rgba(214,52,80,0.5)'; blob(u, v, P * (0.06 + H(i, 15) * 0.03), i + 80, 6, 0.6); x.fill(); } break; }
          case 'limone': for (let i = 0; i < A * 14; i++) { const [u, v] = inner(i, 17, 0.08); x.fillStyle = i % 4 ? 'rgba(255,255,236,0.55)' : 'rgba(206,170,40,0.5)'; x.beginPath(); x.arc(u, v, lw(i % 4 ? 0.022 : 0.016), 0, TAU); x.fill(); } break;
          case 'cioccolato': for (let i = 0; i < A * 2.5; i++) { const [u, v] = inner(i, 23); x.fillStyle = 'rgba(34,14,4,0.8)'; blob(u, v, P * (0.04 + H(i, 25) * 0.025), i + 140, 5, 0.8); x.fill(); x.fillStyle = 'rgba(150,96,60,0.4)'; blob(u - lw(0.012), v - lw(0.015), P * 0.016, i + 150, 5); x.fill(); } break;
          case 'mango': for (let i = 0; i < A * 12; i++) { const [u, v] = inner(i, 31, 0.08); x.fillStyle = i % 3 ? 'rgba(255,236,190,0.45)' : 'rgba(214,110,20,0.35)'; x.beginPath(); x.arc(u, v, lw(0.02), 0, TAU); x.fill(); } break;
          case 'mirtillo': { x.lineCap = 'round'; const L0 = wide ? X0 : Y0, L1 = wide ? X0 + BW : Y0 + BH, M0 = wide ? Y0 + BH * 0.5 : X0 + BW * 0.5;
            const path = (o, f) => { x.beginPath(); for (let k = 0; k <= 16; k++) { const u = L0 - P * 0.2 + (L1 - L0 + P * 0.4) * k / 16, m = M0 + Math.sin(u / P * 1.3 * f + ph) * P * 0.26 + o; wide ? (k ? x.lineTo(u, m) : x.moveTo(u, m)) : (k ? x.lineTo(m, u) : x.moveTo(m, u)); } };
            x.strokeStyle = 'rgba(44,20,86,0.6)'; x.lineWidth = lw(0.12); path(0, 1); x.stroke(); x.strokeStyle = 'rgba(160,130,220,0.35)'; x.lineWidth = lw(0.03); path(-lw(0.05), 1); x.stroke();
            for (let i = 0; i < A * 1.2; i++) { const [u, v] = inner(i, 35); x.fillStyle = 'rgba(48,26,96,0.75)'; blob(u, v, P * 0.05, i + 120, 6, 0.8); x.fill(); } break; }
          case 'stracciatella': for (let i = 0; i < A * 9; i++) { const [u, v] = inner(i, 37, 0.06); x.save(); x.translate(u, v); x.rotate(H(i, 39) * 6); const q = P * (0.03 + H(i, 40) * 0.05); x.fillStyle = '#3a2214'; x.beginPath(); x.moveTo(-q, -q * 0.2); x.lineTo(q * 0.8, -q * 0.35); x.lineTo(q, q * 0.15); x.lineTo(-q * 0.6, q * 0.3); x.closePath(); x.fill(); x.restore(); } break;
        }
      });
      // form shading on exposed sides only
      const w = 0.22;
      if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, 'rgba(255,255,255,0.22)'], [1, 'rgba(255,255,255,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.45)]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.26, 0, b, [[0, rgba(c2, 0)], [1, rgba(c2, 0.55)]]); x.fillRect(l - 2, b - P * 0.26, r - l + 4, P * 0.26 + 2); }
      void small; void E;
    },
    // v2: no hanging drips (they read as tabs on the silhouette)
    live() { /* v2: no garnish clip-art on the crown */ },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, [c0, c1] = C3[food];
      push({ k: 'melt', v, x: X, y: Y, vx: dir * s * (0.6 + r(1)), vy: -s * 0.4, rot: 0, vr: dir * (0.6 + r(2)), life: 0.85, vrr: vr });
      for (let i = 0; i < 4; i++) push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.07 + r(i + 3) * 0.05, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 7) * 2.5), life: 0.7 });
      if (food === 'stracciatella' || food === 'cioccolato') for (let i = 0; i < 2; i++) push({ k: 'crumb', col: '#3a2214', x: X, y: Y, vx: (r(i + 9) - 0.5) * s * 3, vy: -s * 2, life: 0.6 });
      return true;
    },
  });
  return M;
})();
SKINSETS.gelato = GelatoFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'gelato'); if (st) { st.palette = GelatoFood.MAIN.slice(1); st.boardBg = 'rgba(58,40,36,0.9)'; st.grid = 'rgba(255,220,200,0.06)'; st.desc = 'Flat geometric piazza gelateria: sculpted tins in a curved case, a waffle iron pressing cones, a Vespa outside and a dog who gets a tiny cup — light bossa with nylon guitar and vibes.'; } })();
