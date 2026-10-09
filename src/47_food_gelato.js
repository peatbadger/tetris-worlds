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
    padK: 0.3,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, poly, N, E, S, W } = Q;
      const [c0, c1, c2] = C3[food];
      x.fillStyle = c0; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); // flat body: no per-cell gradient, so no seams
      // soft spatula swipes kept inside the cell (low contrast, different in every cell)
      for (let i = 0; i < (small ? 0 : 1); i++) {
        const cx = C(0.3 + hash(vr, i, 1) * 0.4), cy = C(0.28 + hash(vr, i, 2) * 0.44), w = P * (0.22 + hash(vr, i, 3) * 0.1), a = (hash(vr, i, 4) - 0.5) * 0.6;
        x.save(); x.translate(cx, cy); x.rotate(a);
        x.strokeStyle = rgba(c1, 0.32); x.lineWidth = Math.max(1, P * 0.07); x.lineCap = 'round'; x.beginPath(); x.moveTo(-w * 1.3, P * 0.02); x.quadraticCurveTo(0, -P * 0.04, w * 1.3, P * 0.02); x.stroke();
        x.strokeStyle = rgba(c2, 0.16); x.lineWidth = Math.max(1, P * 0.04); x.beginPath(); x.moveTo(-w * 1.1, P * 0.08); x.quadraticCurveTo(0, P * 0.02, w * 1.1, P * 0.08); x.stroke();
        x.restore();
      }
      // inclusions, sparse and real-looking
      const inner = (i, k) => [C(0.14 + hash(vr, i, k) * 0.72), C(0.14 + hash(vr, i, k + 1) * 0.72)];
      if (food === 'stracciatella') { x.fillStyle = '#3a2214'; for (let i = 0; i < (small ? 3 : 7); i++) { const [cx, cy] = inner(i, 5), q = P * (0.03 + hash(i, vr, 6) * 0.04); poly(x, [cx, cy, cx + q * 1.6, cy + q * 0.3, cx + q * 0.5, cy + q]); x.fill(); } }
      if (food === 'pistachio' && !small) { for (let i = 0; i < 4; i++) { const [cx, cy] = inner(i, 7); x.fillStyle = i % 2 ? '#7c9a3a' : '#9ab856'; poly(x, [cx, cy, cx + P * 0.05, cy + P * 0.01, cx + P * 0.03, cy + P * 0.045]); x.fill(); } }
      if (food === 'fragola' && !small) { const [cx, cy] = inner(0, 9); x.strokeStyle = 'rgba(190,36,66,0.45)'; x.lineWidth = Math.max(1, P * 0.05); x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - P * 0.15, cy + P * 0.02); x.bezierCurveTo(cx - P * 0.05, cy - P * 0.08, cx + P * 0.06, cy + P * 0.08, cx + P * 0.15, cy - P * 0.03); x.stroke(); }
      if (food === 'mirtillo' && !small) { const [cx, cy] = inner(0, 11); x.strokeStyle = 'rgba(52,30,104,0.55)'; x.lineWidth = Math.max(1, P * 0.05); x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - P * 0.16, cy); x.bezierCurveTo(cx - P * 0.05, cy - P * 0.1, cx + P * 0.05, cy + P * 0.1, cx + P * 0.16, cy - P * 0.02); x.stroke(); }
      if (food === 'mango' && !small) { const [cx, cy] = inner(0, 13); x.strokeStyle = 'rgba(255,214,140,0.5)'; x.lineWidth = Math.max(1, P * 0.04); x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - P * 0.14, cy); x.quadraticCurveTo(cx, cy - P * 0.08, cx + P * 0.14, cy); x.stroke(); }
      // scooped crest on an exposed top: the mound rises in soft scallops with a creamy highlight
      if (!(mask & N)) {
        x.fillStyle = linear(x, 0, t, 0, t + P * 0.3, [[0, c1], [1, c0]]);
        x.beginPath(); x.moveTo(l - 2, t + P * 0.3); x.lineTo(l - 2, t + P * 0.16);
        for (let k = 0; k < 2; k++) { const a = lerp(l - 2, r + 2, k / 2), bb = lerp(l - 2, r + 2, (k + 1) / 2); x.quadraticCurveTo((a + bb) / 2, t - P * 0.1 + hash(vr, k, 13) * P * 0.08, bb, t + P * 0.14 + hash(vr, k, 14) * P * 0.04); }
        x.lineTo(r + 2, t + P * 0.3); x.closePath(); x.fill();
        x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = Math.max(1, P * 0.035); x.lineCap = 'round'; x.beginPath(); x.moveTo(C(0.16), t + P * 0.12); x.quadraticCurveTo(C(0.3), t + P * 0.04, C(0.44), t + P * 0.1); x.stroke();
      }
      // soft form shading: lit left, shaded right, darker underside
      if (!(mask & W)) { x.fillStyle = linear(x, l, 0, l + P * 0.18, 0, [[0, 'rgba(255,255,255,0.22)'], [1, 'rgba(255,255,255,0)']]); x.fillRect(l - 2, t - 2, P * 0.2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = linear(x, r - P * 0.2, 0, r, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.4)]]); x.fillRect(r - P * 0.2, t - 2, P * 0.2 + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = linear(x, 0, b - P * 0.24, 0, b, [[0, rgba(c2, 0)], [1, rgba(c2, 0.5)]]); x.fillRect(l - 2, b - P * 0.24, r - l + 4, P * 0.24 + 2); }
    },
    post(x, food, Q) { // real melt drips hanging below an exposed underside: a tongue that narrows, then a heavy bulb
      const { P, mask, vr, small, l, r, b, hash, S } = Q;
      if ((mask & S) || small) return;
      const [c0, c1, c2] = C3[food], n = hash(vr, 21) < 0.5 ? 0 : 1;
      for (let i = 0; i < n; i++) {
        const cx = lerp(l + P * 0.2, r - P * 0.2, n === 1 ? 0.25 + hash(vr, i, 23) * 0.5 : (i + 0.25 + hash(vr, i, 23) * 0.5) / 2), w = P * (0.06 + hash(vr, i, 24) * 0.03), len = P * (0.14 + hash(vr, i, 25) * 0.1), y0 = b - P * 0.04;
        x.fillStyle = linear(x, cx - w, 0, cx + w, 0, [[0, c1], [0.45, c0], [1, c2]]);
        x.beginPath(); x.moveTo(cx - w * 1.6, y0); x.quadraticCurveTo(cx - w * 0.7, y0 + P * 0.01, cx - w * 0.55, y0 + len);
        x.arc(cx, y0 + len, w * 0.62, Math.PI, 0, true); x.quadraticCurveTo(cx + w * 0.7, y0 + P * 0.01, cx + w * 1.6, y0); x.closePath(); x.fill();
        x.fillStyle = 'rgba(255,255,255,0.55)'; ellipse(x, cx - w * 0.25, y0 + len + w * 0.05, w * 0.16, w * 0.24); x.fill();
      }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, small } = o;
      if (!(mask & FM_N) && !(mask & FM_W)) { // the garnish on the crown of the tin
        const bob = Math.sin(T * 2 + seed) * s * wob * 0.05; c.save(); c.translate(-s * 0.05, -s * 0.4 + bob); const k = small ? 0.8 : 1; c.scale(1.45, 1.45);
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
(() => { const st = STAGES.find((s) => s.id === 'gelato'); if (st) { st.palette = GelatoFood.MAIN.slice(1); st.boardBg = 'rgba(226,212,204,0.88)'; st.grid = 'rgba(150,110,96,0.12)'; st.desc = 'Flat geometric piazza gelateria: sculpted tins in a curved case, a waffle iron pressing cones, a Vespa outside and a dog who gets a tiny cup — light bossa with nylon guitar and vibes.'; } })();
