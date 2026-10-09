/* ---- Night Market blocks MADE OF street food (FoodMass) — replaces the tile-with-picture / faced cups ----
   One continuous mass per piece, patterns drawn in whole-piece space so they run on across cells.
   I Taiwanese sausage (glossy casing, diagonal grill marks, garlic slice) · O giant chicken cutlet (craggy golden crumb)
   · T stinky tofu (fried golden crust, pickled cabbage on top) · S tanghulu (candied strawberries under glass sugar)
   · Z oyster omelette (translucent egg & starch, oysters, sweet red sauce) · J pearl milk tea (clear cup, pearls settled)
   · L pepper bun (baked crust, sesame, scorched base). */
const NightFood = (() => {
  const M = FoodMass({
    FOOD: [null, 'sausage', 'cutlet', 'tofu', 'tanghulu', 'omelette', 'milktea', 'pepperbun'],
    MAIN: [null, '#b0402a', '#d29a44', '#c99a52', '#d22a2a', '#e8d6a8', '#d8c0a0', '#d8a868'],
    soft: { sausage: 0.9, cutlet: 1.0, tofu: 1.1, tanghulu: 0.8, omelette: 1.5, milktea: 1.4, pepperbun: 1.1 },
    glisten: { sausage: 0.55, tanghulu: 0.7, omelette: 0.35 },
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
      const lx = vr & 3, ly = (vr >> 2) & 3, horiz = (mask & (E | W)) || !(mask & (N | S));
      const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(23, i, k);
      const form = (hi, lo, w = 0.22) => {
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
      };
      const crumbs = (n, a, bcol) => { for (let i = 0; i < n; i++) { x.fillStyle = i % 2 ? a : bcol; const cx = C(0.05 + hash(vr, i, 31) * 0.9), cy = C(0.05 + hash(vr, i, 32) * 0.9), q = P * (0.03 + hash(i, vr, 33) * 0.035); x.beginPath(); x.moveTo(cx, cy - q); x.lineTo(cx + q, cy); x.lineTo(cx, cy + q * 0.8); x.lineTo(cx - q * 0.9, cy); x.closePath(); x.fill(); } };
      switch (food) {
        case 'sausage': { // one long sausage: glossy casing, diagonal grill marks across the whole length
          fill('#a83a26');
          x.save(); if (!horiz) { x.translate(C(0.5), C(0.5)); x.rotate(Math.PI / 2); x.translate(-C(0.5), -C(0.5)); }
          x.fillStyle = lin(0, C(0), 0, C(1), [[0, '#d8684a'], [0.3, '#b4402a'], [1, '#6a1e12']]); x.fillRect(C(-0.1), C(0), P * 1.2, P);
          x.fillStyle = 'rgba(255,220,200,0.5)'; x.fillRect(C(-0.1), C(0.2), P * 1.2, P * 0.05);
          x.strokeStyle = 'rgba(50,14,6,0.6)'; x.lineWidth = Math.max(1, P * 0.06); for (let k = 0; k < 2; k++) { const xx = C(0.25 + k * 0.5); x.beginPath(); x.moveTo(xx - P * 0.12, C(0.12)); x.lineTo(xx + P * 0.12, C(0.88)); x.stroke(); }
          x.restore();
          if (!(mask & N) && !(mask & W) && !small) { x.fillStyle = '#f2ead6'; ellipse(x, C(0.35), t + P * 0.2, P * 0.1, P * 0.07, 0.3); x.fill(); x.fillStyle = 'rgba(200,180,140,0.6)'; ellipse(x, C(0.35), t + P * 0.2, P * 0.04, P * 0.03, 0.3); x.fill(); }
          form('rgba(255,190,160,0.15)', 'rgba(40,6,2,0.3)', 0.14);
          break;
        }
        case 'cutlet': { // giant fried chicken cutlet: craggy golden crumb, darker fried edges, a dusting of pepper salt
          fill('#d19a46');
          piece(() => { x.fillStyle = 'rgba(255,220,150,0.35)'; ellipse(x, P * 0.8, P * 0.6, P * 0.8, P * 0.3, -0.3); x.fill(); x.fillStyle = 'rgba(140,80,24,0.3)'; ellipse(x, P * 1.4, P * 1.5, P * 0.8, P * 0.3, 0.4); x.fill(); });
          if (!small) crumbs(16, 'rgba(250,214,140,0.8)', 'rgba(130,72,20,0.55)');
          if (!small) { x.fillStyle = 'rgba(60,30,10,0.55)'; for (let i = 0; i < 5; i++) x.fillRect(C(0.1 + hash(vr, i, 41) * 0.8), C(0.1 + hash(vr, i, 42) * 0.8), Math.max(1, P * 0.02), Math.max(1, P * 0.02)); }
          form('rgba(255,230,170,0.25)', 'rgba(110,50,8,0.45)');
          break;
        }
        case 'tofu': { // stinky tofu: deep-fried crisp crust, pale pickled cabbage + chili on the exposed top
          fill('#c7964e');
          if (!small) crumbs(10, 'rgba(240,200,130,0.6)', 'rgba(120,66,20,0.45)');
          if (!(mask & N)) { x.fillStyle = '#ece6c8'; x.beginPath(); x.moveTo(l - 2, t + P * 0.28); for (let k = 0; k <= 6; k++) x.lineTo(lerp(l - 2, r + 2, k / 6), t + P * (0.04 + hash(vr, k, 51) * 0.14)); x.lineTo(r + 2, t + P * 0.28); x.closePath(); x.fill(); x.strokeStyle = 'rgba(160,190,90,0.7)'; x.lineWidth = Math.max(1, P * 0.025); for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(C(0.1 + k * 0.3), t + P * 0.12); x.lineTo(C(0.24 + k * 0.3), t + P * 0.2); x.stroke(); } x.fillStyle = '#c8281e'; for (let k = 0; k < 2; k++) { ellipse(x, C(0.3 + k * 0.4), t + P * 0.14, P * 0.04, P * 0.02, k); x.fill(); } }
          form('rgba(255,224,170,0.25)', 'rgba(100,50,10,0.45)');
          break;
        }
        case 'tanghulu': { // candied strawberries under a clear glass-sugar shell
          fill('#c42228');
          piece(() => { for (let i = 0; i < 9; i++) { const cx = P * (0.5 + (i % 3)), cy = P * (0.5 + Math.floor(i / 3)); x.fillStyle = radial(x, cx - P * 0.12, cy - P * 0.14, P * 0.55, [[0, '#f0484a'], [0.6, '#c42228'], [1, '#8a1218']]); ellipse(x, cx, cy, P * 0.5, P * 0.48); x.fill(); x.fillStyle = 'rgba(255,230,160,0.55)'; for (let k = 0; k < 7; k++) { const a = H(i, k) * TAU, d = P * 0.3 * Math.sqrt(H(k, i)); ellipse(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d, P * 0.018, P * 0.026, a); x.fill(); } } });
          x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
          x.fillStyle = 'rgba(255,255,255,0.7)'; ellipse(x, C(0.3), C(0.25), P * 0.12, P * 0.04, -0.6); x.fill();
          form('rgba(255,240,230,0.25)', 'rgba(60,0,6,0.4)');
          break;
        }
        case 'omelette': { // oyster omelette: translucent egg & starch, grey-green oysters, sweet red sauce on top
          fill('#e6d3a2');
          piece(() => { x.fillStyle = 'rgba(255,250,230,0.45)'; ellipse(x, P * 1.2, P * 0.7, P * 1.0, P * 0.3, 0.2); x.fill(); x.fillStyle = 'rgba(210,150,60,0.35)'; ellipse(x, P * 1.8, P * 1.4, P * 0.7, P * 0.25, -0.3); x.fill(); x.strokeStyle = 'rgba(60,130,60,0.6)'; x.lineWidth = Math.max(1, P * 0.035); for (let i = 0; i < 6; i++) { const cx = P * H(i, 1) * 3, cy = P * H(i, 2) * 2; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + P * 0.14, cy + P * 0.05); x.stroke(); } });
          if (!small) for (let i = 0; i < 2; i++) { const cx = C(0.25 + hash(vr, i, 61) * 0.5), cy = C(0.35 + hash(vr, i, 62) * 0.4); x.fillStyle = '#9a9888'; ellipse(x, cx, cy, P * 0.11, P * 0.075, hash(i, vr) * 3); x.fill(); x.fillStyle = 'rgba(230,226,210,0.6)'; ellipse(x, cx - P * 0.03, cy - P * 0.02, P * 0.05, P * 0.03, 0.3); x.fill(); }
          if (!(mask & N)) { x.fillStyle = '#c8452e'; x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, t + P * 0.14); x.quadraticCurveTo(C(0.6), t + P * 0.3, C(0.35), t + P * 0.18); x.quadraticCurveTo(C(0.15), t + P * 0.1, l - 2, t + P * 0.2); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,190,160,0.5)'; ellipse(x, C(0.4), t + P * 0.07, P * 0.14, P * 0.025); x.fill(); }
          form('rgba(255,250,230,0.25)', 'rgba(120,80,20,0.3)');
          break;
        }
        case 'milktea': { // pearl milk tea in a clear cup: pearls settled on the bottom, sealed film on top
          fill('#d6bc98');
          piece(() => { x.fillStyle = 'rgba(255,246,230,0.35)'; ellipse(x, P * 1.0, P * 0.6, P * 0.8, P * 0.2, -0.1); x.fill(); });
          if (!(mask & S)) for (let i = 0; i < 3; i++) for (let row = 0; row < 2; row++) { if (row && i === 2) continue; const cx = C((i + 0.5 + row * 0.5) / 3), cy = b - P * (0.16 + row * 0.2); x.fillStyle = '#2a1a12'; x.beginPath(); x.arc(cx, cy, P * 0.14, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.arc(cx - P * 0.05, cy - P * 0.05, P * 0.04, 0, TAU); x.fill(); }
          if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.28)'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.1); x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(l, t + P * 0.08, r - l, Math.max(1, P * 0.03)); }
          if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(l + 1, t - 2, Math.max(1, P * 0.03), b - t + 4); x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(l + P * 0.17, t - 2, P * 0.05, b - t + 4); }
          if (!(mask & E)) { x.fillStyle = lin(r - P * 0.16, 0, r, 0, [[0, 'rgba(120,80,40,0)'], [1, 'rgba(120,80,40,0.5)']]); x.fillRect(r - P * 0.16, t - 2, P * 0.16, b - t + 4); }
          break;
        }
        case 'pepperbun': { // hu jiao bing: baked golden crust, sesame on top, scorched base from the tandoor wall
          fill('#d4a462');
          piece(() => { x.fillStyle = 'rgba(255,230,180,0.35)'; ellipse(x, P * 0.9, P * 0.6, P * 0.8, P * 0.3, -0.3); x.fill(); });
          if (!(mask & N)) { x.fillStyle = '#f6ecd2'; for (let i = 0; i < (small ? 3 : 8); i++) { ellipse(x, C(0.1 + hash(vr, i, 71) * 0.8), t + P * (0.06 + hash(vr, i, 72) * 0.22), Math.max(0.8, P * 0.034), Math.max(0.5, P * 0.018), hash(i, vr) * 3); x.fill(); } }
          if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.24, 0, b, [[0, 'rgba(90,40,10,0)'], [0.5, 'rgba(90,40,10,0.55)'], [1, '#3a1a08']]); x.fillRect(l - 2, b - P * 0.24, r - l + 4, P * 0.26); }
          form('rgba(255,236,190,0.3)', 'rgba(100,50,10,0.4)');
          break;
        }
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
