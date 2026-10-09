/* ---- Boba blocks MADE OF milk tea (FoodMass) — replaces the kawaii-faced cup tiles ----
   Each piece is one clear cup of drink: flat tea body (no seams), lit wall with a refraction tint, darker far wall,
   a sealed cellophane film on the exposed top, toppings that live where they really sit (pearls / taro balls / red bean
   settled at the bottom, cheese foam on top, coconut jelly suspended). No faces, no tiles, no marks.
   I brown-sugar tiger milk · O mango green tea + cheese foam · T taro milk + taro balls · S matcha latte + red bean
   · Z strawberry milk · J thai tea · L honeydew + coconut jelly. */
const BobaFood = (() => {
  const LQ = { tiger: ['#ecdcc2', '#f8eedc', '#b89a78'], mango: ['#efb43c', '#fbd476', '#b8801a'], taro: ['#c2a6da', '#dcc8ee', '#8a6aa8'], matcha: ['#8db664', '#b6d68e', '#5a8a3a'], straw: ['#f3b2c4', '#fbd2dc', '#c87890'], thai: ['#e58a3e', '#f6b276', '#a8561a'], melon: ['#bfe3a6', '#dcf2cc', '#86b26a'] };
  const M = FoodMass({
    FOOD: [null, 'tiger', 'mango', 'taro', 'matcha', 'straw', 'thai', 'melon'],
    MAIN: [null, '#ecdcc2', '#efb43c', '#c2a6da', '#8db664', '#f3b2c4', '#e58a3e', '#bfe3a6'],
    soft: { tiger: 1.4, mango: 1.4, taro: 1.4, matcha: 1.4, straw: 1.5, thai: 1.4, melon: 1.4 },
    R: 0.22, cutCol: 'rgba(255,255,255,0.22)', noPlanes: true,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
      const [c0, c1, c2] = LQ[food], lx = vr & 3, ly = (vr >> 2) & 3, gw = Math.max(1, P * 0.03);
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      x.fillStyle = c0; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      // drink-specific body detail, drawn in piece space so it flows across cells
      if (food === 'tiger') piece(() => { x.strokeStyle = 'rgba(120,58,20,0.55)'; x.lineCap = 'round'; for (let k = 0; k < 7; k++) { const x0 = P * (0.25 + k * 0.55); x.lineWidth = P * (0.06 + (k % 3) * 0.03); x.beginPath(); x.moveTo(x0, -P * 0.2); x.bezierCurveTo(x0 + P * 0.25, P * 1.0, x0 - P * 0.2, P * 2.0, x0 + P * 0.15, P * 4.2); x.stroke(); } x.lineCap = 'butt'; });
      if (food === 'straw') piece(() => { x.strokeStyle = 'rgba(200,60,90,0.4)'; x.lineCap = 'round'; for (let k = 0; k < 6; k++) { const x0 = P * (0.3 + k * 0.62); x.lineWidth = P * 0.07; x.beginPath(); x.moveTo(x0, -P * 0.2); x.bezierCurveTo(x0 - P * 0.2, P * 1.2, x0 + P * 0.25, P * 2.2, x0, P * 4.2); x.stroke(); } x.lineCap = 'butt'; });
      if (food === 'thai' || food === 'matcha') piece(() => { x.fillStyle = 'rgba(255,248,236,0.4)'; ellipse(x, P * 1.1, P * 0.55, P * 0.9, P * 0.22, -0.1); x.fill(); x.fillStyle = 'rgba(255,248,236,0.22)'; ellipse(x, P * 1.8, P * 1.1, P * 0.7, P * 0.16, 0.2); x.fill(); });
      if (food === 'melon' && !small) for (let i = 0; i < 2; i++) { const cx = C(0.25 + hash(vr, i, 1) * 0.5), cy = C(0.3 + hash(vr, i, 2) * 0.45), q = P * 0.13, a = hash(vr, i, 3) * 1.2; x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = 'rgba(255,255,250,0.5)'; x.fillRect(-q, -q, q * 2, q * 2); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = Math.max(1, P * 0.02); x.beginPath(); x.moveTo(-q, -q); x.lineTo(q, -q); x.lineTo(q, q * 0.2); x.stroke(); x.restore(); }
      // toppings settled on the bottom of the cup
      const settled = { tiger: ['#2a1a12', 0.15], taro: ['#8a62b4', 0.14], matcha: ['#7a2a22', 0.1] }[food];
      if (settled && !(mask & S)) { const [col, rr] = settled, n = Math.round(1 / (rr * 2.2)); for (let row = 0; row < 2; row++) for (let i = 0; i < n; i++) { const cx = C((i + 0.5 + (row ? 0.5 : 0)) / n) + (hash(vr, i, row + 4) - 0.5) * P * 0.04, cy = b - P * (0.15 + row * rr * 1.5) - hash(i, vr, row) * P * 0.02; if (row && cx > r - P * 0.05) continue; x.fillStyle = col; x.beginPath(); x.arc(cx, cy, P * rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.arc(cx - P * rr * 0.35, cy - P * rr * 0.35, P * rr * 0.3, 0, TAU); x.fill(); } }
      // top: thick cheese foam (mango) or the sealed cellophane film every boba cup gets
      if (!(mask & N)) {
        if (food === 'mango') { const fb = t + P * 0.34; x.fillStyle = lin(0, t, 0, fb, [[0, '#fffaf0'], [0.75, '#f6eedc'], [1, '#e8d8b4']]); x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, fb); for (let k = 4; k >= 0; k--) x.quadraticCurveTo(lerp(l, r, (k + 0.5) / 4), fb + P * 0.04, lerp(l - 2, r + 2, k / 4), fb + (hash(vr, k, 9) - 0.5) * P * 0.04); x.closePath(); x.fill(); }
        x.fillStyle = 'rgba(255,255,255,0.28)'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.1); x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(l, t + P * 0.08, r - l, gw);
      }
      // cup walls
      if (!(mask & W)) { x.fillStyle = rgba(c1, 0.45); x.fillRect(l, t - 2, P * 0.1, b - t + 4); x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(l + gw * 0.5, t - 2, gw, b - t + 4); x.fillStyle = 'rgba(255,255,255,0.13)'; x.fillRect(l + P * 0.17, t - 2, P * 0.05, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * 0.16, 0, r, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.6)]]); x.fillRect(r - P * 0.16, t - 2, P * 0.16, b - t + 4); x.fillStyle = 'rgba(255,255,255,0.26)'; x.fillRect(r - gw * 1.5, t - 2, gw, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(l, b - P * 0.06, r - l, gw); }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push } = q, [c0, c1] = LQ[food];
      push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 });
      for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.2; push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.05 + r(i + 4) * 0.04, x: X, y: Y, vx: Math.cos(a) * s * (2 + r(i + 9) * 3), vy: Math.sin(a) * s * (3 + r(i + 5) * 3), life: 0.7 }); }
      if (food === 'tiger' || food === 'taro') for (let i = 0; i < 3; i++) push({ k: 'dot', col: food === 'tiger' ? '#2a1a12' : '#8a62b4', r: 0.09, x: X, y: Y, vx: (r(i + 20) - 0.5) * s * 3, vy: -s * (2 + r(i) * 2), g: 6, life: 0.8 });
      return true;
    },
  });
  return M;
})();
SKINSETS.boba = BobaFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'boba'); if (st) st.palette = BobaFood.MAIN.slice(1); })();
