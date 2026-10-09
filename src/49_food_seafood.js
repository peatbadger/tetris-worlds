/* ---- Fish House blocks MADE OF seafood (FoodMass) — v2, the house's OWN set (nothing shared with Kaiten Sushi) ----
   I lobster tail (crimson shell plates, white meat at the cut end, fanned tail) · O oysters on crushed ice
   · T scallops in the shell (ribbed coral shells, seared scallop + roe) · S mussels (blue-black heap, a few open)
   · Z grilled prawns (laid side by side, pale coral, grill char) · J crab (orange knobbly shell cracked to white meat)
   · L whole grilled branzino (olive-grey scaled skin, pale belly, golden char, grill bars, score cuts).
   Whole-piece drawing in piece space (no seams), matte, no faces/eyes, no garnish clip-art. */
const SeafoodFood = FoodMass({
  FOOD: [null, 'lobster', 'oyster', 'scallop', 'mussel', 'prawn', 'crab', 'grillfish'],
  MAIN: [null, '#b8281a', '#dfe6ea', '#e8cc94', '#262c44', '#ee8e6a', '#b8441a', '#727462'],
  soft: { lobster: 0.7, oyster: 0.8, scallop: 0.9, mussel: 0.8, prawn: 1.2, crab: 0.8, grillfish: 1.1 },
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
    const H = (i, k) => hash(49, i, k);
    const blob = (u, v, rr, k, n = 7, sq = 1) => { const pt = []; for (let j = 0; j < n; j++) { const an = j / n * TAU, q = rr * (0.7 + H(k, j + 20) * 0.5); pt.push([u + Math.cos(an) * q, v + Math.sin(an) * q * sq]); } x.beginPath(); for (let j = 0; j <= n; j++) { const p0 = pt[j % n], p1 = pt[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; j ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); };
    // work along the piece's long axis: u runs along, v across (rotate for tall pieces)
    const axis = (fn) => piece(() => { x.save(); if (wide) fn(X0, Y0, BW, BH); else { x.translate(X0 + BW, Y0); x.rotate(Math.PI / 2); fn(0, 0, BH, BW); } x.restore(); });
    const form = (hi, lo, w = 0.22) => {
      if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
      if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
    };
    switch (food) {
      case 'lobster': { // one tail along the piece: curved shell plates (not per cell), meat at one end, tail fan at the other
        fill('#b8281a');
        axis((u0, v0, L, Wd) => {
          x.fillStyle = lin(0, v0, 0, v0 + Wd, [[0, '#e8583a'], [0.4, '#c23220'], [1, '#7a1408']]); x.fillRect(u0 - P, v0 - P, L + 2 * P, Wd + 2 * P);
          const seg = L / (Math.round(L / P * 1.35));
          for (let uu = u0 + P * 0.45; uu < u0 + L - P * 0.5; uu += seg) { x.fillStyle = 'rgba(80,8,2,0.38)'; x.beginPath(); x.moveTo(uu, v0 - 2); x.quadraticCurveTo(uu + seg * 0.45, v0 + Wd / 2, uu, v0 + Wd + 2); x.lineTo(uu + lw(0.06), v0 + Wd + 2); x.quadraticCurveTo(uu + seg * 0.45 + lw(0.06), v0 + Wd / 2, uu + lw(0.06), v0 - 2); x.fill();
            x.fillStyle = 'rgba(255,170,130,0.22)'; x.beginPath(); x.moveTo(uu + lw(0.06), v0 - 2); x.quadraticCurveTo(uu + seg * 0.45 + lw(0.06), v0 + Wd / 2, uu + lw(0.06), v0 + Wd + 2); x.lineTo(uu + lw(0.2), v0 + Wd + 2); x.quadraticCurveTo(uu + seg * 0.45 + lw(0.2), v0 + Wd / 2, uu + lw(0.2), v0 - 2); x.fill(); }
          x.fillStyle = 'rgba(255,200,170,0.25)'; x.fillRect(u0, v0 + Wd * 0.18, L, Wd * 0.07);
          x.fillStyle = 'rgba(70,6,2,0.3)'; for (let i = 0; i < A * 14; i++) { x.beginPath(); x.arc(u0 + H(i, 50) * L, v0 + H(i, 51) * Wd, lw(0.02 + H(i, 52) * 0.02), 0, TAU); x.fill(); }
          // white meat showing at the cut end
          x.fillStyle = '#f4e8de'; blob(u0 + P * 0.12, v0 + Wd / 2, Wd * 0.36, 7, 9, 1.05); x.fill(); x.fillStyle = 'rgba(230,120,100,0.45)'; blob(u0 + P * 0.14, v0 + Wd * 0.42, Wd * 0.2, 8, 7, 0.8); x.fill();
          // tail fan: three soft lobes, darker
          for (let k = -1; k <= 1; k++) { x.fillStyle = k ? '#8e1a0c' : '#a22414'; x.save(); x.translate(u0 + L - P * 0.28, v0 + Wd / 2); x.rotate(k * 0.55); x.beginPath(); x.ellipse(P * 0.12, 0, P * 0.24, Wd * 0.2, 0, 0, TAU); x.fill(); x.restore(); }
        });
        form('rgba(255,190,160,0.2)', 'rgba(60,4,0,0.4)', 0.16); break; }
      case 'oyster': { // crushed ice bed with three half-shell oysters of different size/turn (never a pair)
        fill('#dfe6ea');
        piece(() => {
          x.fillStyle = lin(X0, Y0, X0 + BW, Y0 + BH, [[0, '#f2f7fa'], [1, '#b8c6d0']]); x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
          for (let i = 0; i < A * 26; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, q = P * (0.04 + H(i, 3) * 0.05), a0 = H(i, 4) * 6; x.fillStyle = i % 3 ? 'rgba(255,255,255,0.7)' : 'rgba(150,176,196,0.45)'; x.beginPath(); x.moveTo(u + Math.cos(a0) * q, v + Math.sin(a0) * q); x.lineTo(u + Math.cos(a0 + 2.2) * q, v + Math.sin(a0 + 2.2) * q); x.lineTo(u + Math.cos(a0 + 4.1) * q * 0.7, v + Math.sin(a0 + 4.1) * q * 0.7); x.fill(); }
          const n = Math.max(2, Math.round(A * 0.75));
          for (let i = 0; i < n; i++) { const [a, c] = cells[(i * 3 + 1) % A], u = (a + 0.3 + H(i, 5) * 0.4) * P + (i === 2 ? P * 0.3 : 0), v = (c + 0.3 + H(i, 6) * 0.4) * P, s = P * (0.4 + H(i, 7) * 0.12), rot = H(i, 8) * TAU;
            x.save(); x.translate(u, v); x.rotate(rot);
            x.fillStyle = 'rgba(40,50,60,0.3)'; x.beginPath(); x.ellipse(lw(0.03), lw(0.05), s * 1.05, s * 0.78, 0, 0, TAU); x.fill();
            x.fillStyle = '#8a8070'; blob(0, 0, s, i + 30, 11, 0.74); x.fill(); x.strokeStyle = 'rgba(210,200,184,0.6)'; x.lineWidth = lw(0.025); blob(0, 0, s * 0.92, i + 31, 11, 0.72); x.stroke();
            x.fillStyle = '#e9e2d6'; x.beginPath(); x.ellipse(-s * 0.05, 0, s * 0.74, s * 0.52, 0, 0, TAU); x.fill();
            x.fillStyle = lin(-s * 0.6, 0, s * 0.6, 0, [[0, '#d8ccb8'], [0.5, '#cfc2ac'], [1, '#a89c88']]); blob(-s * 0.05, 0, s * 0.56, i + 40, 9, 0.66); x.fill();
            x.strokeStyle = 'rgba(96,86,74,0.55)'; x.lineWidth = lw(0.03); blob(-s * 0.05, 0, s * 0.5, i + 41, 13, 0.62); x.stroke();
            x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(-s * 0.25, -s * 0.16, s * 0.22, s * 0.07, -0.3, 0, TAU); x.fill();
            x.restore(); }
        });
        form('rgba(255,255,255,0.3)', 'rgba(60,80,100,0.35)', 0.16); break; }
      case 'scallop': { // big overlapping ribbed shells, each cradling one seared scallop (no small dots)
        fill('#e8cc94');
        piece(() => {
          x.fillStyle = '#c4a066'; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
          const pos = cells.filter((_, i) => i % 2 === 0 || A < 3).map(([a, c], i) => [(a + 0.5 + (H(i, 9) - 0.5) * 0.3) * P, (c + 0.7) * P]); if (A >= 4) { const [a, c] = cells[A - 1]; pos.push([(a + 0.5) * P, (c + 0.75) * P]); }
          pos.forEach(([u, v], i) => { const s = P * (0.95 + H(i, 10) * 0.12), rot = (H(i, 11) - 0.5) * 0.8;
            x.save(); x.translate(u, v); x.rotate(rot);
            x.fillStyle = 'rgba(60,16,8,0.35)'; x.beginPath(); x.moveTo(0, s * 0.42); x.arc(0, s * 0.42, s * 1.02, -Math.PI * 0.9, -Math.PI * 0.1); x.closePath(); x.fill();
            x.fillStyle = lin(0, -s * 0.6, 0, s * 0.4, [[0, '#fbeecc'], [1, '#d6b278']]); x.beginPath(); x.moveTo(0, s * 0.36); x.arc(0, s * 0.36, s, -Math.PI * 0.9, -Math.PI * 0.1); x.closePath(); x.fill();
            for (let k = 1; k < 9; k++) { const an = -Math.PI * 0.9 + k / 9 * Math.PI * 0.8; x.strokeStyle = 'rgba(150,110,50,0.3)'; x.lineWidth = lw(0.05); x.beginPath(); x.moveTo(Math.cos(an) * s * 0.25, s * 0.36 + Math.sin(an) * s * 0.25); x.lineTo(Math.cos(an) * s * 0.98, s * 0.36 + Math.sin(an) * s * 0.98); x.stroke(); }
            x.fillStyle = 'rgba(80,30,20,0.3)'; x.beginPath(); x.ellipse(lw(0.02), -s * 0.12 + lw(0.04), s * 0.36, s * 0.27, 0, 0, TAU); x.fill();
            x.fillStyle = '#f2e6d0'; x.beginPath(); x.ellipse(0, -s * 0.12, s * 0.36, s * 0.27, 0, 0, TAU); x.fill();
            x.fillStyle = radial(x, 0, -s * 0.16, s * 0.34, [[0, '#9a5420'], [0.6, '#c0803c'], [1, 'rgba(230,190,130,0.2)']]); x.beginPath(); x.ellipse(0, -s * 0.15, s * 0.32, s * 0.22, 0, 0, TAU); x.fill();
            x.restore(); });
        });
        form('rgba(255,230,210,0.22)', 'rgba(90,30,20,0.4)', 0.16); break; }
      case 'mussel': { // a heap of blue-black shells, random turns, lit nacre edges; a few gape to show orange meat between the halves
        fill('#262c44');
        piece(() => {
          x.fillStyle = '#161a2a'; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
          const n = A * 7; for (let i = 0; i < n; i++) { const u = X0 - P * 0.1 + H(i, 12) * (BW + P * 0.2), v = Y0 - P * 0.1 + H(i, 13) * (BH + P * 0.2), s = P * (0.36 + H(i, 14) * 0.1), rot = H(i, 15) * TAU, open = H(i, 16) < 0.2;
            x.save(); x.translate(u, v); x.rotate(rot);
            const shell = () => { x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(-s * 0.2, -s * 0.6, s * 0.9, -s * 0.14); x.quadraticCurveTo(s * 1.02, s * 0.1, s * 0.7, s * 0.24); x.quadraticCurveTo(-s * 0.2, s * 0.34, -s, 0); x.closePath(); };
            if (open) { x.fillStyle = '#e8803a'; x.beginPath(); x.moveTo(-s * 0.9, 0); x.quadraticCurveTo(0, -s * 0.5, s * 0.85, -s * 0.05); x.quadraticCurveTo(0, s * 0.2, -s * 0.9, 0); x.fill(); x.fillStyle = 'rgba(255,190,120,0.5)'; x.beginPath(); x.ellipse(0, -s * 0.12, s * 0.4, s * 0.06, -0.15, 0, TAU); x.fill(); x.translate(0, s * 0.18); x.scale(1, 0.7); }
            x.fillStyle = lin(0, -s * 0.5, 0, s * 0.3, [[0, '#56648e'], [0.55, '#2c3352'], [1, '#141828']]); shell(); x.fill();
            x.strokeStyle = 'rgba(170,196,240,0.7)'; x.lineWidth = lw(0.04); x.beginPath(); x.moveTo(-s * 0.85, -s * 0.06); x.quadraticCurveTo(-s * 0.15, -s * 0.48, s * 0.82, -s * 0.12); x.stroke();
            x.strokeStyle = 'rgba(120,140,190,0.22)'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(-s * 0.6, s * 0.02); x.quadraticCurveTo(0, -s * 0.22, s * 0.6, -s * 0.02); x.stroke();
            x.restore(); }
        });
        form('rgba(170,190,240,0.22)', 'rgba(4,6,14,0.5)', 0.18); break; }
      case 'prawn': { // a heap of plump grilled prawns, thick curled bodies with segment bands and a darker tail fan
        fill('#ee8e6a');
        piece(() => {
          x.fillStyle = '#e07a56'; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
          const n = Math.round(A * 2.6); for (let i = 0; i < n; i++) { const [a, c] = cells[i % A], u = (a + 0.15 + H(i, 30) * 0.7) * P, v = (c + 0.15 + H(i, 31) * 0.7) * P, s = P * (0.4 + H(i, 32) * 0.08), rot = H(i, 33) * TAU;
            x.save(); x.translate(u, v); x.rotate(rot); const th = s * 0.42;
            x.strokeStyle = 'rgba(70,20,10,0.35)'; x.lineWidth = th + lw(0.03); x.lineCap = 'round'; x.beginPath(); x.arc(lw(0.02), lw(0.03), s * 0.6, -0.2, Math.PI * 1.15); x.stroke();
            x.strokeStyle = '#f8a07a'; x.lineWidth = th; x.beginPath(); x.arc(0, 0, s * 0.6, -0.2, Math.PI * 1.15); x.stroke();
            x.strokeStyle = 'rgba(255,214,196,0.6)'; x.lineWidth = th * 0.3; x.beginPath(); x.arc(0, 0, s * 0.6 + th * 0.22, 0.1, Math.PI * 1.0); x.stroke();
            x.strokeStyle = 'rgba(176,70,46,0.55)'; x.lineWidth = lw(0.025); for (let k = 0; k < 5; k++) { const an = k / 5 * Math.PI * 1.1, ci = Math.cos(an), si = Math.sin(an); x.beginPath(); x.moveTo(ci * (s * 0.6 - th / 2), si * (s * 0.6 - th / 2)); x.lineTo(ci * (s * 0.6 + th / 2), si * (s * 0.6 + th / 2)); x.stroke(); }
            x.fillStyle = '#b8381e'; x.save(); x.rotate(-0.2); x.translate(s * 0.6, 0); x.beginPath(); x.moveTo(0, 0); x.lineTo(th * 0.5, -th * 0.9); x.lineTo(-th * 0.5, -th * 0.9); x.closePath(); x.fill(); x.restore();
            x.restore(); }
          x.fillStyle = 'rgba(50,16,8,0.22)'; for (let k = 0; k < 2; k++) { x.save(); x.translate(X0 + BW / 2, Y0 + BH * (0.33 + k * 0.34)); x.rotate(-0.5); x.fillRect(-BW, -lw(0.05), BW * 2, lw(0.1)); x.restore(); }
        });
        form('rgba(255,220,200,0.2)', 'rgba(110,40,20,0.35)', 0.16); break; }
      case 'crab': { // cluster of cooked crab legs: knobbly orange-red tubes with cream undersides, cracked ends showing white meat
        fill('#b8441a');
        axis((u0, v0, L, Wd) => {
          x.fillStyle = '#5a1a08'; x.fillRect(u0 - P, v0 - P, L + 2 * P, Wd + 2 * P);
          const rows = Math.max(2, Math.round(Wd / P * 2.2)), rh = Wd / rows;
          for (let j = 0; j < rows; j++) { let uu = u0 - P * 0.3 + H(j, 40) * P * 0.5; while (uu < u0 + L + P * 0.2) { const len = P * (1.0 + H(j * 9 + uu, 41) * 0.8), vv = v0 + (j + 0.5) * rh + (H(j, 42) - 0.5) * rh * 0.25, th = rh * 0.92, tilt = (H(j * 7 + uu, 43) - 0.5) * 0.12;
              x.save(); x.translate(uu, vv); x.rotate(tilt);
              x.fillStyle = lin(0, -th / 2, 0, th / 2, [[0, '#e8743e'], [0.45, '#c8461c'], [0.8, '#9a3010'], [1, '#e8c8a8']]); roundRect(x, 0, -th / 2, len, th, th * 0.45); x.fill();
              x.fillStyle = 'rgba(255,200,150,0.45)'; for (let k = 0; k < len / P * 5; k++) { x.beginPath(); x.arc(P * 0.1 + k * P * 0.2 + H(k, j + 44) * P * 0.08, -th * 0.2 + H(k, j + 45) * th * 0.15, lw(0.025), 0, TAU); x.fill(); }
              x.fillStyle = 'rgba(120,30,8,0.45)'; for (let k = 1; k < len / P * 1.4; k++) { const jx = k * P * 0.7 + H(k, j + 46) * P * 0.1; if (jx > len - th * 0.6) break; x.fillRect(jx, -th / 2, lw(0.05), th); }
              x.fillStyle = '#f6eee2'; x.beginPath(); x.ellipse(len - th * 0.2, 0, th * 0.22, th * 0.4, 0, 0, TAU); x.fill(); x.fillStyle = 'rgba(230,130,100,0.45)'; x.beginPath(); x.ellipse(len - th * 0.2, -th * 0.08, th * 0.12, th * 0.18, 0, 0, TAU); x.fill();
              x.restore(); uu += len + P * 0.04; } }
        });
        form('rgba(255,210,160,0.22)', 'rgba(70,20,4,0.42)', 0.16); break; }
      case 'grillfish': { // one whole grilled branzino along the piece's longest arm: olive-grey scaled back, pale belly, golden char patches, grill bars, two score cuts
        fill('#727462');
        const cnt = {}; for (const [a, c] of cells) { const k = wide ? c : a; cnt[k] = (cnt[k] || 0) + 1; } const arm = +Object.keys(cnt).sort((p1, p2) => cnt[p2] - cnt[p1] || p1 - p2)[0];
        axis((u0, v0, L, Wd) => {
          const va = wide ? arm * P : (bx1 - 1 - arm) * P, vb = va + P; // band of the arm in axis coords
          x.fillStyle = lin(0, va, 0, vb, [[0, '#464a3c'], [0.42, '#727462'], [0.6, '#bab4a0'], [1, '#d2cab6']]); x.fillRect(u0 - P, v0 - P, L + 2 * P, Wd + 2 * P);
          x.fillStyle = '#464a3c'; x.fillRect(u0 - P, v0 - P, L + 2 * P, va - v0 + P); x.fillStyle = '#d2cab6'; x.fillRect(u0 - P, vb, L + 2 * P, v0 + Wd + P - vb);
          x.strokeStyle = 'rgba(230,226,206,0.28)'; x.lineWidth = lw(0.02); for (let i = 0; i < L / P * 7; i++) for (let j = 0; j < 5; j++) { const uu = u0 + i * P * 0.15 + (j % 2) * P * 0.075, vv = va - P * 0.3 + j * P * 0.14; x.beginPath(); x.arc(uu, vv, P * 0.07, 0.3, Math.PI - 0.3); x.stroke(); }
          x.fillStyle = 'rgba(28,18,8,0.4)'; for (let i = 0; i < Math.round(L / P * 0.8) + 1; i++) { x.save(); x.translate(u0 + (i + 0.4) * P * 1.2, va + P * 0.5); x.rotate(0.7); x.fillRect(-lw(0.06), -P * 1.5, lw(0.12), P * 3); x.restore(); }
          x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(u0 - P, va + P * 0.5, L + 2 * P, lw(0.035));
          for (let i = 0; i < A; i++) { const cu = u0 + H(i, 61) * L, cv = va + P * (0.4 + H(i, 62) * 0.5); x.fillStyle = 'rgba(190,124,40,0.38)'; blob(cu, cv, P * (0.24 + H(i, 63) * 0.12), i + 200, 9, 0.45); x.fill(); }
          for (let i = 0; i < 2; i++) { const uu = u0 + L * (0.33 + i * 0.34); x.fillStyle = '#f2ead8'; x.beginPath(); x.moveTo(uu - P * 0.08, va + P * 0.2); x.quadraticCurveTo(uu + P * 0.06, va + P * 0.45, uu - P * 0.03, va + P * 0.72); x.quadraticCurveTo(uu + P * 0.12, va + P * 0.45, uu - P * 0.08, va + P * 0.2); x.fill(); }
        });
        form('rgba(220,235,250,0.2)', 'rgba(20,24,30,0.42)', 0.16); break; }
    }
    void small;
  },
  clear(food, q) {
    const { v, X, Y, s, r, vr, push, dir } = q, col = SeafoodFood.MAIN[v];
    push({ k: food === 'scallop' || food === 'mussel' || food === 'oyster' ? 'roll' : 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.9, rot: 0, vr: dir * (1.5 + r(3)), life: 0.85, vrr: vr });
    for (let i = 0; i < 3; i++) push({ k: 'dot', col: food === 'oyster' ? '#ffffff' : i % 2 ? col : '#d8eef6', r: 0.05 + r(i) * 0.04, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 3, vy: -s * (1.5 + r(i) * 2), life: 0.6 });
    return true;
  },
});
SKINSETS.seafood = SeafoodFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'fishhouse'); if (st) { st.palette = SeafoodFood.MAIN.slice(1); st.boardBg = 'rgba(20,30,38,0.9)'; st.desc = 'Flat geometric harbour dining room: an oyster bar on crushed ice, a waiter lifting cloches and pouring wine, candles lit at dusk and a lighthouse sweeping the night — string quartet & piano.'; } })();
