/* ---- Speakeasy blocks MADE OF DRINKS (FoodMass) ----
   Each piece is one vessel of liquid: glass walls catch light on the exposed sides, the liquid fills edge to edge,
   bubbles rise live, the surface sloshes on landing / rotation.
   I pint of fizzy beer (thick foam head) · O old fashioned (big ice cube, orange peel) · T negroni (orange wheel)
   · S red wine (swirl, legs) · Z mojito (mint, lime, crushed ice) · J martini (olive on a pick) · L champagne (bead streams). */
const CocktailFood = (() => {
  const LQ = { beer: ['#f2a62a', '#ffcf5a', '#c87810'], oldfash: ['#b0501a', '#d8783a', '#7a2c0a'], negroni: ['#e2361e', '#ff6a3a', '#a01a10'], wine: ['#6e1230', '#a02a50', '#40061a'], mojito: ['#a8e690', '#d8f8c0', '#6ab44e'], martini: ['#d6eaf0', '#f4fbfd', '#9ab8c4'], champagne: ['#f4e090', '#fff4c0', '#d0b050'] };
  const BUB = { beer: [3, 0.9, 'rgba(255,250,220,0.85)'], champagne: [5, 1.3, 'rgba(255,255,240,0.95)'], mojito: [2, 0.6, 'rgba(255,255,255,0.8)'], negroni: [1, 0.4, 'rgba(255,220,200,0.6)'], oldfash: [1, 0.3, 'rgba(255,230,200,0.5)'], wine: [0, 0, ''], martini: [1, 0.3, 'rgba(255,255,255,0.7)'] };
  const M = FoodMass({
    FOOD: [null, 'beer', 'oldfash', 'negroni', 'wine', 'mojito', 'martini', 'champagne'],
    MAIN: [null, '#f2a62a', '#b0501a', '#e2361e', '#8a1838', '#a8e690', '#cfe6ee', '#f4e090'],
    soft: { beer: 1.4, wine: 1.5, champagne: 1.4, mojito: 1.2, martini: 1.5, negroni: 1.3, oldfash: 1.1 },
    R: 0.22, cutCol: 'rgba(255,255,255,0.25)', noPlanes: true,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, band, hash, poly, N, E, S, W } = Q;
      const [c0, c1, c2] = LQ[food];
      x.fillStyle = linear(x, 0, C(0), 0, C(1), [[0, c1], [0.55, c0], [1, c2]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      if (food === 'wine') { x.strokeStyle = 'rgba(190,60,100,0.45)'; x.lineWidth = Math.max(1, P * 0.05); x.beginPath(); x.moveTo(C(-0.1), C(0.6)); x.bezierCurveTo(C(0.3), C(0.25), C(0.6), C(0.95), C(1.1), C(0.6)); x.stroke(); x.strokeStyle = 'rgba(30,0,10,0.35)'; x.beginPath(); x.moveTo(C(-0.1), C(0.85)); x.bezierCurveTo(C(0.35), C(0.6), C(0.6), C(1.05), C(1.1), C(0.85)); x.stroke(); }
      if (food === 'negroni' || food === 'oldfash') { x.fillStyle = 'rgba(255,240,220,0.2)'; for (let i = 0; i < 2; i++) { const q = P * 0.36, cx = C(0.2 + hash(vr, i) * 0.6), cy = C(0.25 + hash(i, vr) * 0.5); poly(x, [cx - q / 2, cy - q / 2, cx + q / 2, cy - q / 2, cx + q / 2, cy + q / 2, cx - q / 2, cy + q / 2]); x.fill(); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(cx - q / 2, cy - q / 2, q, Math.max(1, P * 0.04)); x.fillStyle = 'rgba(255,240,220,0.2)'; } } // ice cubes
      if (food === 'mojito') { x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < (small ? 4 : 9); i++) { const cx = C(hash(vr, i, 1)), cy = C(hash(vr, i, 2)), q = P * (0.06 + hash(i, vr) * 0.06); poly(x, [cx, cy - q, cx + q, cy, cx, cy + q * 0.8, cx - q * 0.9, cy]); x.fill(); } // crushed ice
        for (let i = 0; i < 2; i++) { const cx = C(0.25 + hash(vr, i, 4) * 0.5), cy = C(0.3 + hash(vr, i, 5) * 0.45); x.save(); x.translate(cx, cy); x.rotate(hash(i, vr, 6) * 3); ellipse(x, 0, 0, P * 0.16, P * 0.08); x.fillStyle = '#2f8a3a'; x.fill(); x.strokeStyle = '#1e6a2a'; x.lineWidth = Math.max(0.7, P * 0.015); x.beginPath(); x.moveTo(-P * 0.14, 0); x.lineTo(P * 0.14, 0); x.stroke(); x.restore(); } }
      if (food === 'champagne' || food === 'beer') { x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(C(0.62), t - 2, P * 0.12, b - t + 4); }
      // the liquid surface / foam head on the top of the vessel
      if (!(mask & N)) {
        if (food === 'beer') { band(t - 2, P * 0.36, '#fbf4e2'); x.fillStyle = '#fffdf6'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(C(i * 0.25), t + P * 0.34, P * 0.09, 0, TAU); x.fill(); } x.fillStyle = 'rgba(220,200,160,0.4)'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(C(0.1 + hash(vr, i) * 0.8), t + P * (0.08 + hash(i, vr) * 0.2), P * 0.025, 0, TAU); x.fill(); } }
        else { band(t - 2, P * 0.2 + 2, 'rgba(255,255,255,0.13)'); band(t + P * 0.2, Math.max(1, P * 0.04), shade(c1, 0.35)); }
      }
      // glass walls: bright rim lines on exposed sides, a soft inner reflection, a heavy base
      x.fillStyle = 'rgba(255,255,255,0.55)'; const gw = Math.max(1, P * 0.035);
      if (!(mask & W)) { x.fillRect(l, t, gw, b - t); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(l + gw * 2, t, P * 0.08, b - t); x.fillStyle = 'rgba(255,255,255,0.55)'; }
      if (!(mask & E)) { x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(r - gw, t, gw, b - t); x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(r - gw - P * 0.06, t, P * 0.06, b - t); }
      if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(l, t, r - l, gw); }
      if (!(mask & S)) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(l, b - P * 0.1, r - l, P * 0.1); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(l, b - P * 0.1, r - l, gw); }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, gx, gy, hash, small } = o;
      const [n, sp, col] = BUB[food];
      if (n && !small) { c.fillStyle = col; for (let i = 0; i < n; i++) { const ph = hash(seed, i, 3), u = (T * sp * (0.6 + hash(i, seed) * 0.6) + ph) % 1, bx = (hash(seed, i, 7) - 0.5) * s * 0.7 + Math.sin(T * 3 + i) * s * 0.02, by = (0.5 - u) * s; const top = !(mask & FM_N) ? -s * (food === 'beer' ? 0.12 : 0.28) : -s * 0.5; if (by < top) continue; c.beginPath(); c.arc(bx, by, s * (food === 'champagne' ? 0.022 : 0.032) * (0.7 + u * 0.6), 0, TAU); c.fill(); } }
      if (food === 'champagne' && small) { const u = (T * 0.8 + seed) % 1; c.fillStyle = col; c.fillRect(-s * 0.1, (0.5 - u) * s * 0.8, 1, 1); }
      // slosh: the surface tilts and ripples (more right after landing / rotating)
      if (!(mask & FM_N) && food !== 'beer') {
        const amp = s * (0.012 + wob * 0.07), ph = T * 3.2 + gx * 0.9 + seed * 0.1, y0 = -s * 0.3, [c0, c1] = LQ[food];
        c.beginPath(); c.moveTo(-s / 2, y0 + 4); for (let i = 0; i <= 6; i++) { const u = i / 6; c.lineTo(-s / 2 + u * s, y0 + Math.sin(ph + u * 3.2) * amp + (u - 0.5) * wob * s * 0.12); } c.lineTo(s / 2, y0 + s * 0.12); c.lineTo(-s / 2, y0 + s * 0.12); c.closePath();
        c.fillStyle = c1; c.fill(); c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = Math.max(1, s * 0.03); c.beginPath(); for (let i = 0; i <= 6; i++) { const u = i / 6; const yy = y0 + Math.sin(ph + u * 3.2) * amp + (u - 0.5) * wob * s * 0.12; i ? c.lineTo(-s / 2 + u * s, yy) : c.moveTo(-s / 2, yy); } c.stroke();
        void c0;
      }
      if (!(mask & FM_N) && food === 'beer' && !small) { c.fillStyle = 'rgba(255,255,255,0.9)'; for (let i = 0; i < 2; i++) { const u = (T * 0.5 + hash(seed, i)) % 1; c.beginPath(); c.arc((hash(i, seed) - 0.5) * s * 0.6, -s * 0.2 - u * s * 0.06, s * 0.03 * (1 - u), 0, TAU); c.fill(); } }
      // garnish riding the surface of the top-left exposed cell
      if (!(mask & FM_N) && !(mask & FM_W)) {
        const bob = Math.sin(T * 2.4 + seed) * s * (0.015 + wob * 0.05), rot = Math.sin(T * 1.7 + seed) * (0.1 + wob * 0.4);
        c.save(); c.translate(s * 0.05, -s * 0.3 + bob); c.rotate(rot);
        if (food === 'martini') { c.strokeStyle = '#8a6a3a'; c.lineWidth = Math.max(1, s * 0.03); c.beginPath(); c.moveTo(-s * 0.3, -s * 0.18); c.lineTo(s * 0.2, s * 0.12); c.stroke(); c.fillStyle = '#6a8a2a'; ellipse(c, 0, 0, s * 0.13, s * 0.1, 0.5); c.fill(); c.fillStyle = '#c8302a'; c.beginPath(); c.arc(s * 0.04, -s * 0.02, s * 0.04, 0, TAU); c.fill(); }
        else if (food === 'oldfash') { c.fillStyle = '#f08a2a'; c.beginPath(); c.moveTo(-s * 0.28, 0); c.quadraticCurveTo(0, -s * 0.16, s * 0.28, 0); c.quadraticCurveTo(0, -s * 0.06, -s * 0.28, 0); c.fill(); c.fillStyle = 'rgba(255,230,180,0.85)'; c.fillRect(-s * 0.32, s * 0.04, s * 0.42, s * 0.36); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(-s * 0.32, s * 0.04, s * 0.42, s * 0.04); } // peel + the big cube
        else if (food === 'negroni') { c.fillStyle = '#ff9a2a'; c.beginPath(); c.arc(0, 0, s * 0.2, Math.PI, TAU); c.fill(); c.fillStyle = '#ffd08a'; c.beginPath(); c.arc(0, 0, s * 0.15, Math.PI, TAU); c.fill(); c.strokeStyle = '#ff9a2a'; c.lineWidth = Math.max(1, s * 0.02); c.beginPath(); for (let i = 1; i < 4; i++) { const a = Math.PI + i * Math.PI / 4; c.moveTo(0, 0); c.lineTo(Math.cos(a) * s * 0.15, Math.sin(a) * s * 0.15); } c.stroke(); }
        else if (food === 'mojito') { c.fillStyle = '#7ac83a'; c.beginPath(); c.arc(0, 0, s * 0.17, Math.PI, TAU); c.fill(); c.fillStyle = '#d8f0a0'; c.beginPath(); c.arc(0, 0, s * 0.12, Math.PI, TAU); c.fill(); c.fillStyle = '#2f9a3a'; ellipse(c, s * 0.16, -s * 0.12, s * 0.1, s * 0.05, -0.6); c.fill(); }
        c.restore();
      }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push } = q, [c0, c1] = LQ[food];
      push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 });
      for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.2; push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.06 + r(i + 4) * 0.05, x: X, y: Y, vx: Math.cos(a) * s * (2 + r(i + 9) * 3), vy: Math.sin(a) * s * (3 + r(i + 5) * 3), life: 0.7 }); } // splash
      for (let i = 0; i < 3; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.8, y: Y, vx: 0, vy: -s * (2 + r(i + 13) * 2), g: -1, life: 0.8, r: 0.05 + r(i) * 0.05 });
      if (food === 'beer') for (let i = 0; i < 3; i++) push({ k: 'dot', col: '#fbf4e2', r: 0.1, x: X, y: Y - s * 0.3, vx: (r(i + 20) - 0.5) * s * 3, vy: -s * 2, g: 4, life: 0.7 });
      return true;
    },
  });
  return M;
})();
SKINSETS.cocktail = CocktailFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'speakeasy'); if (st) { st.palette = CocktailFood.MAIN.slice(1); st.desc = 'Flat Art Deco geometry: a password at the door, a bartender who really shakes and pours, a jazz trio to the side and a singer who steps into the spotlight — upright bass, brushes, muted horn.'; } })();
