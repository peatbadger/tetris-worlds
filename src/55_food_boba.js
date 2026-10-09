/* ---- Boba blocks MADE OF milk tea (FoodMass) — replaces the kawaii-faced cup tiles ----
   Each piece is one clear cup of drink: flat tea body (no seams), lit wall with a refraction tint, darker far wall,
   a sealed cellophane film on the exposed top, toppings that live where they really sit (pearls / taro balls / red bean
   settled at the bottom, cheese foam on top, coconut jelly suspended). No faces, no tiles, no marks.
   I brown-sugar tiger milk · O mango green tea + cheese foam · T taro milk + taro balls · S matcha latte + red bean
   · Z shaken oolong (fine foam head) · J thai tea · L winter melon + grass jelly (v2: matte, no glints). */
const BobaFood = (() => {
  const LQ = { tiger: ['#ecdcc2', '#f8eedc', '#b89a78'], mango: ['#f6cc2a', '#ffe27a', '#c89a10'], taro: ['#9a78c8', '#bca0e2', '#6a4a98'], matcha: ['#4e8a32', '#78ae56', '#2e5e1e'], oolong: ['#7e4414', '#a86828', '#4a2408'], thai: ['#ea7a22', '#f8aa64', '#b45210'], wmelon: ['#f0e4c2', '#faf2dc', '#c8b48a'] };
  const M = FoodMass({
    premium: true, premiumOpts: { lift: { thai: 'brightness(1.3) contrast(1.04) saturate(1.05)', mango: 'brightness(0.95) contrast(1.08) saturate(1.2)' } },
    FOOD: [null, 'tiger', 'mango', 'taro', 'matcha', 'oolong', 'thai', 'wmelon'],
    MAIN: [null, '#ecdcc2', '#f6cc2a', '#9a78c8', '#4e8a32', '#7e4414', '#f49a4a', '#f0e4c2'],
    soft: { tiger: 1.4, mango: 1.4, taro: 1.4, matcha: 1.4, oolong: 1.4, thai: 1.4, wmelon: 1.4 },
    R: 0.22, depth: true, cutCol: 'rgba(255,255,255,0.12)', noPlanes: true,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q, dr = Q.dr || 0, dn = Q.dn || 1;
      const [c0, c1, c2] = LQ[food], lx = vr & 3, ly = (vr >> 2) & 3, gw = Math.max(1, P * 0.03);
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const yTop = t - dr * P, yBot = yTop + dn * P, clear = food === 'oolong';
            x.fillStyle = lin(0, yTop, 0, yBot, food === 'thai' ? [[0, '#f6e4cc'], [0.22, '#f2cfa2'], [0.5, c0], [1, mix(c0, c2, 0.45)]] : [[0, mix(c0, c1, 0.6)], [0.3, c0], [1, mix(c0, c2, clear ? 0.55 : 0.4)]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      // drink-specific body detail, drawn in piece space so it flows across cells
      if (food === 'tiger') piece(() => { x.strokeStyle = 'rgba(120,58,20,0.55)'; x.lineCap = 'round'; for (let k = 0; k < 7; k++) { const x0 = P * (0.25 + k * 0.55); x.lineWidth = P * (0.06 + (k % 3) * 0.03); x.beginPath(); x.moveTo(x0, -P * 0.2); x.bezierCurveTo(x0 + P * 0.25, P * 1.0, x0 - P * 0.2, P * 2.0, x0 + P * 0.15, P * 4.2); x.stroke(); } x.lineCap = 'butt'; });
      if (food === 'oolong' && !(mask & N)) { const fb = t + P * 0.24; x.fillStyle = lin(0, t, 0, fb, [[0, '#f4dcae'], [0.7, '#eac48a'], [1, rgba('#eac48a', 0)]]); x.fillRect(l - 2, t - 2, r - l + 4, fb - t + 2); if (!small) for (let i = 0; i < 9; i++) { x.fillStyle = 'rgba(255,246,226,0.55)'; x.beginPath(); x.arc(C(0.06 + hash(vr, i, 1) * 0.88), t + P * (0.05 + hash(vr, i, 2) * 0.13), P * (0.018 + hash(vr, i, 3) * 0.02), 0, TAU); x.fill(); } }
      if (food === 'matcha') piece(() => { x.strokeStyle = 'rgba(250,250,236,0.16)'; x.lineCap = 'round'; for (let k = 0; k < 6; k++) { const x0 = P * (0.2 + k * 0.7), w0 = P * (0.05 + (k % 3) * 0.03); x.lineWidth = w0; x.beginPath(); x.moveTo(x0, -P * 0.3); x.bezierCurveTo(x0 + P * 0.5, P * 0.6, x0 - P * 0.45, P * 1.3, x0 + P * 0.2, P * 2.2); x.bezierCurveTo(x0 + P * 0.6, P * 2.9, x0 - P * 0.2, P * 3.5, x0 + P * 0.1, P * 4.3); x.stroke(); } x.lineCap = 'butt'; });
      if (food === 'wmelon' && !(mask & S)) for (let row = 0; row < 2; row++) for (let i = 0; i < 3; i++) { const q = P * 0.13, cx = C((i + 0.5 + (row ? 0.35 : 0)) / 3) + (hash(vr, i, row + 3) - 0.5) * P * 0.05, cy = b - P * (0.17 + row * 0.24); if (row && cx > r - P * 0.12) continue; x.save(); x.translate(cx, cy); x.rotate((hash(vr, i, row + 7) - 0.5) * 0.4); x.fillStyle = row ? 'rgba(52,40,32,0.8)' : '#342820'; roundRect(x, -q, -q, q * 2, q * 2, q * 0.4); x.fill(); x.fillStyle = 'rgba(120,96,76,0.35)'; x.fillRect(-q * 0.7, -q * 0.85, q * 1.4, q * 0.22); x.restore(); }
      // toppings settled on the bottom of the cup
      const settled = { tiger: ['#2a1a12', 0.15], taro: ['#8a62b4', 0.14], matcha: ['#7a2a22', 0.1] }[food];
      if (settled && !(mask & S)) { const [col, rr] = settled, n = Math.round(1 / (rr * 2.2)); for (let row = 0; row < 2; row++) for (let i = 0; i < n; i++) { const cx = C((i + 0.5 + (row ? 0.5 : 0)) / n) + (hash(vr, i, row + 4) - 0.5) * P * 0.04, cy = b - P * (0.15 + row * rr * 1.5) - hash(i, vr, row) * P * 0.02; if (row && cx > r - P * 0.05) continue; x.fillStyle = col; x.beginPath(); x.arc(cx, cy, P * rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,240,220,0.13)'; x.beginPath(); x.arc(cx - P * rr * 0.2, cy - P * rr * 0.25, P * rr * 0.62, 0, TAU); x.fill(); } }
      // top: thick cheese foam (mango) or the sealed cellophane film every boba cup gets
      if (!(mask & N)) {
        if (food === 'mango') { const fb = t + P * 0.34; x.fillStyle = lin(0, t, 0, fb, [[0, '#fffaf0'], [0.75, '#f6eedc'], [1, '#e8d8b4']]); x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, fb); for (let k = 4; k >= 0; k--) x.quadraticCurveTo(lerp(l, r, (k + 0.5) / 4), fb + P * 0.04, lerp(l - 2, r + 2, k / 4), fb + (hash(vr, k, 9) - 0.5) * P * 0.04); x.closePath(); x.fill(); }
        x.fillStyle = 'rgba(255,252,246,0.3)'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.1); x.fillStyle = 'rgba(120,90,70,0.18)'; x.fillRect(l - 2, t + P * 0.1, r - l + 4, gw);
      }
      // cup walls
      if (!(mask & W)) { x.fillStyle = rgba(c1, 0.5); x.fillRect(l, t - 2, P * 0.12, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * 0.16, 0, r, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.6)]]); x.fillRect(r - P * 0.16, t - 2, P * 0.16, b - t + 4); }
      { const rw = P * 0.045; x.fillStyle = rgba(c2, 0.55); if (!(mask & W)) x.fillRect(l, t - 2, rw, b - t + 4); if (!(mask & E)) x.fillRect(r - rw, t - 2, rw, b - t + 4); if (!(mask & S)) x.fillRect(l - 2, b - rw, r - l + 4, rw); }
      if (!(mask & S)) { x.fillStyle = rgba(c2, 0.35); x.fillRect(l - 2, b - P * 0.08, r - l + 4, P * 0.08); }
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
