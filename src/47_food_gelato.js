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
    glisten: { cioccolato: 0.45, fragola: 0.3, mango: 0.3, mirtillo: 0.35 },
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, band, hash, poly, N, E, S, W } = Q;
      const [c0, c1, c2] = C3[food];
      x.fillStyle = linear(x, 0, t, 0, b, [[0, c1], [0.45, c0], [1, c2]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      // spatula waves: two curved ridges per cell, highlight above and shadow below
      for (let i = 0; i < 2; i++) { const y0 = C(0.3 + i * 0.42) + (hash(vr, i) - 0.5) * P * 0.08, ph = hash(i, vr, 3) * 6;
        x.strokeStyle = 'rgba(255,255,255,0.38)'; x.lineWidth = Math.max(1, P * 0.06); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = lerp(C(-0.05), C(1.05), k / 8), yy = y0 + Math.sin(ph + k * 0.9) * P * 0.07; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke();
        x.strokeStyle = shade(c2, food === 'cioccolato' ? -0.2 : -0.05) + '88'; x.lineWidth = Math.max(1, P * 0.05); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = lerp(C(-0.05), C(1.05), k / 8), yy = y0 + P * 0.07 + Math.sin(ph + k * 0.9) * P * 0.07; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
      // inclusions
      if (food === 'stracciatella') { x.fillStyle = '#3a2214'; for (let i = 0; i < (small ? 5 : 14); i++) { const cx = C(0.05 + hash(vr, i, 5) * 0.9), cy = C(0.05 + hash(vr, i, 6) * 0.9); poly(x, [cx, cy, cx + P * 0.07, cy + P * 0.02, cx + P * 0.03, cy + P * 0.06]); x.fill(); } }
      if (food === 'pistachio') { x.fillStyle = '#6a8a2a'; for (let i = 0; i < (small ? 3 : 8); i++) x.fillRect(C(0.05 + hash(vr, i, 7) * 0.9), C(0.05 + hash(vr, i, 8) * 0.9), Math.max(1, P * 0.05), Math.max(1, P * 0.04)); }
      if (food === 'fragola') { x.fillStyle = 'rgba(200,30,60,0.5)'; for (let i = 0; i < (small ? 3 : 9); i++) { ellipse(x, C(0.05 + hash(vr, i, 9) * 0.9), C(0.05 + hash(vr, i, 10) * 0.9), P * 0.04, P * 0.025, 0.4); x.fill(); } }
      if (food === 'mirtillo') { x.fillStyle = 'rgba(40,20,80,0.55)'; for (let i = 0; i < (small ? 3 : 8); i++) { x.beginPath(); x.arc(C(0.05 + hash(vr, i, 11) * 0.9), C(0.05 + hash(vr, i, 12) * 0.9), P * 0.035, 0, TAU); x.fill(); } }
      if (food === 'cioccolato') { x.fillStyle = 'rgba(255,220,190,0.18)'; ellipse(x, C(0.35), C(0.25), P * 0.25, P * 0.08, -0.2); x.fill(); }
      // scooped mound top: scallops rising above the line, bright crest
      if (!(mask & N)) {
        x.fillStyle = c1; x.beginPath(); x.moveTo(l - 2, t + P * 0.24); for (let k = 0; k < 3; k++) { const a = lerp(C(0), C(1), k / 3), bb = lerp(C(0), C(1), (k + 1) / 3); x.quadraticCurveTo((a + bb) / 2, t - P * 0.06 + hash(vr, k, 13) * P * 0.06, bb, t + P * 0.2); } x.lineTo(r + 2, t + P * 0.3); x.lineTo(l - 2, t + P * 0.3); x.fill();
        x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = Math.max(1, P * 0.04); x.beginPath(); x.moveTo(C(0.12), t + P * 0.12); x.quadraticCurveTo(C(0.3), t + P * 0.02, C(0.48), t + P * 0.1); x.stroke();
      }
      if (!(mask & S)) { x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(l - 2, b - P * 0.1, r - l + 4, P * 0.1 + 2); x.fillStyle = c1; for (let i = 0; i < 2; i++) { const dx = C(0.25 + hash(vr, i, 14) * 0.5), h = P * (0.08 + hash(i, vr, 15) * 0.1); x.beginPath(); x.moveTo(dx - P * 0.05, b - P * 0.12); x.lineTo(dx + P * 0.05, b - P * 0.12); x.lineTo(dx + P * 0.03, b - P * 0.12 + h); x.arc(dx, b - P * 0.12 + h, P * 0.03, 0, Math.PI); x.fill(); } }
      if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(l - 2, t - 2, P * 0.08, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(r - P * 0.08, t - 2, P * 0.08 + 2, b - t + 4); }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, small } = o;
      if (!(mask & FM_N) && !(mask & FM_W)) { // the garnish on the crown of the tin
        const bob = Math.sin(T * 2 + seed) * s * wob * 0.05; c.save(); c.translate(-s * 0.05, -s * 0.42 + bob); const k = small ? 0.8 : 1;
        switch (food) {
          case 'pistachio': c.fillStyle = '#7a9a32'; for (let i = 0; i < 5; i++) { c.save(); c.rotate(i * 1.3); c.fillRect(s * 0.04 * k, -s * 0.03, s * 0.09 * k, s * 0.06 * k); c.restore(); } c.fillStyle = '#c8a070'; c.fillRect(-s * 0.02, -s * 0.02, s * 0.05, s * 0.04); break;
          case 'fragola': c.fillStyle = '#e8304a'; c.beginPath(); c.moveTo(0, s * 0.12 * k); c.quadraticCurveTo(-s * 0.16 * k, -s * 0.02, 0, -s * 0.1 * k); c.quadraticCurveTo(s * 0.16 * k, -s * 0.02, 0, s * 0.12 * k); c.fill(); c.fillStyle = '#ffd0d8'; c.fillRect(-s * 0.02, -s * 0.04, s * 0.04, s * 0.1); c.fillStyle = '#3a8a2a'; c.fillRect(-s * 0.06, -s * 0.12 * k, s * 0.12, s * 0.03); break;
          case 'limone': c.fillStyle = '#f0d020'; c.beginPath(); c.arc(0, 0, s * 0.14 * k, Math.PI, TAU); c.fill(); c.fillStyle = '#fff6b0'; c.beginPath(); c.arc(0, 0, s * 0.1 * k, Math.PI, TAU); c.fill(); c.strokeStyle = '#f0d020'; c.lineWidth = Math.max(1, s * 0.015); c.beginPath(); for (let i = 1; i < 4; i++) { const a = Math.PI + i * Math.PI / 4; c.moveTo(0, 0); c.lineTo(Math.cos(a) * s * 0.1 * k, Math.sin(a) * s * 0.1 * k); } c.stroke(); break;
          case 'cioccolato': c.strokeStyle = '#2a1408'; c.lineWidth = Math.max(1, s * 0.045); c.beginPath(); c.arc(0, 0, s * 0.08 * k, 0.5, 5.2); c.stroke(); c.strokeStyle = '#f2e6d0'; c.lineWidth = Math.max(1, s * 0.02); c.beginPath(); c.arc(s * 0.1, s * 0.02, s * 0.05 * k, 1, 5); c.stroke(); break;
          case 'mango': c.fillStyle = '#ffb820'; for (let i = 0; i < 3; i++) { c.fillRect(-s * 0.12 + i * s * 0.09, -s * 0.05 - (i % 2) * s * 0.04, s * 0.07 * k, s * 0.07 * k); } break;
          case 'mirtillo': c.fillStyle = '#3a2a7a'; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(-s * 0.08 + i * s * 0.08, -(i % 2) * s * 0.05, s * 0.05 * k, 0, TAU); c.fill(); } c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(-s * 0.09, -s * 0.02, 1.2, 1.2); break;
          case 'stracciatella': c.fillStyle = '#3a2214'; c.save(); c.rotate(-0.4); c.fillRect(-s * 0.02, -s * 0.12, s * 0.05, s * 0.22 * k); c.restore(); c.fillStyle = '#e8c890'; c.beginPath(); c.arc(s * 0.08, 0, s * 0.05 * k, 0, TAU); c.fill(); break;
        }
        c.restore();
      }
      // a slow melt drop on an exposed bottom
      if (!small && !(mask & FM_S)) { const u = (T * 0.25 + seed * 0.37) % 1; if (u < 0.6) { const [, c1] = C3[food]; c.fillStyle = c1; c.beginPath(); c.arc((((seed * 13) % 7) / 7 - 0.5) * s * 0.6, s * 0.42 + u * s * 0.1, s * 0.035 * (1 - u * 0.5), 0, TAU); c.fill(); } }
    },
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
(() => { const st = STAGES.find((s) => s.id === 'gelato'); if (st) { st.palette = GelatoFood.MAIN.slice(1); st.desc = 'Flat geometric piazza gelateria: sculpted tins in a curved case, a waffle iron pressing cones, a Vespa outside and a dog who gets a tiny cup — light bossa with nylon guitar and vibes.'; } })();
