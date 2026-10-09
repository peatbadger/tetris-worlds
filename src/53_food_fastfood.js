/* ---- Golden Arches blocks MADE OF fast food (FoodMass) ----
   I fries (packed golden sticks, salt) · O burger (sesame bun / cheese / patty / lettuce bands) · T soft serve (piped swirl)
   · S lettuce & pickles · Z ketchup (glossy swirl) · J cola (fizzing, ice cubes) · L strawberry shake (thick, whipped top). */
const FastFood = (() => {
  const C3 = { fries: ['#f4c430', '#ffe070', '#c89418'], burger: ['#d89a4a', '#f0bc6a', '#a86a24'], softserve: ['#f8f4ec', '#ffffff', '#dcd4c4'], lettuce: ['#6ab84a', '#9ad86a', '#3e8a2a'], ketchup: ['#d8241a', '#f45a40', '#a01410'], cola: ['#4a1e14', '#6e3424', '#2a0e08'], shake: ['#f49ac0', '#ffc4dc', '#d06a96'] };
  const M = FoodMass({
    FOOD: [null, 'fries', 'burger', 'softserve', 'lettuce', 'ketchup', 'cola', 'shake'],
    MAIN: [null, '#f4c430', '#d89a4a', '#f8f4ec', '#6ab84a', '#d8241a', '#4a1e14', '#f49ac0'],
    soft: { fries: 1.1, burger: 1.3, softserve: 1.6, lettuce: 1.3, ketchup: 1.5, cola: 1.4, shake: 1.6 },
    glisten: { ketchup: 0.6, cola: 0.5, shake: 0.3, lettuce: 0.25 },
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
      const [c0, c1, c2] = C3[food], lw = (k) => Math.max(1, P * k);
      x.fillStyle = linear(x, 0, t, 0, b, [[0, c1], [0.5, c0], [1, c2]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      if (food === 'fries') { const n = small ? 3 : 5; for (let i = 0; i < n; i++) { const fx = C((i + 0.5) / n) + (hash(vr, i) - 0.5) * P * 0.06, w = P * 0.14; x.fillStyle = i % 2 ? c1 : c0; x.fillRect(fx - w / 2, l === l ? t - 2 : t, w, b - t + 4); x.fillStyle = 'rgba(160,100,10,0.35)'; x.fillRect(fx + w / 2 - lw(0.03), t - 2, lw(0.03), b - t + 4); }
        if (!(mask & N)) { x.fillStyle = c1; for (let i = 0; i < n; i++) { const fx = C((i + 0.5) / n), h = P * (0.05 + hash(vr, i, 2) * 0.12); x.fillRect(fx - P * 0.07, t - h, P * 0.14, h + 2); x.fillStyle = '#b07810'; x.fillRect(fx - P * 0.07, t - h, P * 0.14, lw(0.03)); x.fillStyle = c1; } }
        x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < (small ? 2 : 6); i++) x.fillRect(C(hash(vr, i, 3)), C(hash(vr, i, 4)), lw(0.03), lw(0.03)); }
      if (food === 'burger') { const bands = [[0, 0.22, '#f0bc6a'], [0.22, 0.34, '#6ab84a'], [0.34, 0.46, '#f8c830'], [0.46, 0.72, '#5a2e18'], [0.72, 1, '#d89a4a']]; for (const [a, z, col] of bands) { x.fillStyle = col; x.fillRect(l - 2, C(a), r - l + 4, C(z) - C(a) + 1); }
        x.fillStyle = '#3e1e0e'; for (let i = 0; i < (small ? 2 : 5); i++) x.fillRect(C(0.05 + hash(vr, i, 5) * 0.9), C(0.5 + hash(vr, i, 6) * 0.18), lw(0.06), lw(0.03));
        x.fillStyle = '#f8c830'; for (let i = 0; i < 2; i++) { const dx = C(0.2 + hash(vr, i, 7) * 0.6); x.beginPath(); x.moveTo(dx - P * 0.06, C(0.46)); x.lineTo(dx + P * 0.06, C(0.46)); x.lineTo(dx, C(0.56)); x.fill(); }
        x.fillStyle = '#4a9a3a'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(C(i / 3), C(0.34), P * 0.06, 0, Math.PI); x.fill(); }
        if (!(mask & N)) { x.fillStyle = '#f0bc6a'; x.beginPath(); x.moveTo(l - 2, t + P * 0.22); x.quadraticCurveTo(C(0.5), t - P * 0.12, r + 2, t + P * 0.22); x.fill(); x.fillStyle = 'rgba(255,255,255,0.3)'; x.beginPath(); x.ellipse(C(0.35), t + P * 0.05, P * 0.2, P * 0.05, -0.1, 0, TAU); x.fill(); }
        x.fillStyle = '#fbf2d8'; for (let i = 0; i < (small ? 2 : 5); i++) { x.beginPath(); x.ellipse(C(0.1 + hash(vr, i, 8) * 0.8), C(0.04 + hash(vr, i, 9) * 0.14), P * 0.035, P * 0.02, hash(i, vr) * 3, 0, TAU); x.fill(); } }
      if (food === 'softserve') { x.lineWidth = lw(0.05); for (let i = 0; i < 3; i++) { const y0 = C(0.18 + i * 0.32); x.strokeStyle = 'rgba(200,190,170,0.6)'; x.beginPath(); x.moveTo(l - 2, y0 + P * 0.06); x.quadraticCurveTo(C(0.5), y0 - P * 0.08, r + 2, y0 + P * 0.06); x.stroke(); x.strokeStyle = 'rgba(255,255,255,0.9)'; x.beginPath(); x.moveTo(l - 2, y0); x.quadraticCurveTo(C(0.5), y0 - P * 0.12, r + 2, y0); x.stroke(); }
        if (!(mask & N)) { x.fillStyle = '#fffdf8'; x.beginPath(); x.moveTo(C(0.2), t + P * 0.2); x.quadraticCurveTo(C(0.5), t - P * 0.3, C(0.62), t - P * 0.08); x.quadraticCurveTo(C(0.8), t + P * 0.1, C(0.85), t + P * 0.2); x.fill(); } }
      if (food === 'lettuce') { x.strokeStyle = '#3e8a2a'; x.lineWidth = lw(0.035); for (let i = 0; i < 3; i++) { x.beginPath(); const y0 = C(0.2 + i * 0.3); for (let k = 0; k <= 8; k++) { const xx = lerp(C(-0.05), C(1.05), k / 8), yy = y0 + Math.sin(k * 1.7 + vr + i) * P * 0.06; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
        if (!small) { const px = C(0.3 + hash(vr, 10) * 0.4), py = C(0.3 + hash(vr, 11) * 0.4); x.fillStyle = '#5a8a2a'; x.beginPath(); x.arc(px, py, P * 0.17, 0, TAU); x.fill(); x.fillStyle = '#a8c860'; x.beginPath(); x.arc(px, py, P * 0.13, 0, TAU); x.fill(); x.fillStyle = '#e8f0b0'; for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; x.beginPath(); x.arc(px + Math.cos(a) * P * 0.07, py + Math.sin(a) * P * 0.07, lw(0.025), 0, TAU); x.fill(); } }
        if (!(mask & N)) { x.fillStyle = c1; for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(C(k / 3), t + P * 0.04, P * 0.12, Math.PI, TAU); x.fill(); } } }
      if (food === 'ketchup') { x.strokeStyle = 'rgba(255,140,120,0.5)'; x.lineWidth = lw(0.06); x.beginPath(); x.arc(C(0.5 + (hash(vr, 1) - 0.5) * 0.3), C(0.5), P * 0.26, 0.4 + vr, 4.2 + vr); x.stroke(); x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.ellipse(C(0.3), C(0.25), P * 0.12, P * 0.05, -0.5, 0, TAU); x.fill();
        if (!(mask & N)) { x.fillStyle = c0; x.beginPath(); x.moveTo(C(0.3), t + 2); x.quadraticCurveTo(C(0.45), t - P * 0.3, C(0.55), t - P * 0.2); x.quadraticCurveTo(C(0.65), t, C(0.75), t + 2); x.fill(); } }
      if (food === 'cola') { x.fillStyle = 'rgba(255,255,255,0.75)'; for (let i = 0; i < (small ? 3 : 8); i++) { x.beginPath(); x.arc(C(0.08 + hash(vr, i, 12) * 0.84), C(0.08 + hash(vr, i, 13) * 0.84), P * (0.02 + hash(i, vr, 14) * 0.025), 0, TAU); x.fill(); }
        if (!small && hash(vr, 15) < 0.6) { x.fillStyle = 'rgba(220,240,255,0.35)'; x.save(); x.translate(C(0.55), C(0.5)); x.rotate(hash(vr, 16)); x.fillRect(-P * 0.17, -P * 0.17, P * 0.34, P * 0.34); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-P * 0.15, -P * 0.15, P * 0.12, P * 0.04); x.restore(); }
        if (!(mask & N)) { x.fillStyle = '#e8d8c0'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.16); x.fillStyle = '#fff8ec'; for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(C(k / 3), t + P * 0.12, P * 0.07, 0, TAU); x.fill(); } } }
      if (food === 'shake') { x.fillStyle = 'rgba(200,60,110,0.35)'; for (let i = 0; i < (small ? 3 : 8); i++) { x.beginPath(); x.ellipse(C(0.08 + hash(vr, i, 17) * 0.84), C(0.08 + hash(vr, i, 18) * 0.84), P * 0.04, P * 0.025, 0.5, 0, TAU); x.fill(); } x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(C(0.12), t, P * 0.08, b - t);
        if (!(mask & N)) { x.fillStyle = '#fffaf4'; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(C(0.17 + k * 0.33), t + P * 0.08, P * 0.19, Math.PI * 0.9, Math.PI * 2.1); x.fill(); } x.fillStyle = 'rgba(220,200,190,0.6)'; x.fillRect(l - 2, t + P * 0.16, r - l + 4, lw(0.03)); } }
      if (!(mask & S)) { x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(l - 2, b - P * 0.09, r - l + 4, P * 0.09 + 2); }
      if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(l - 2, t - 2, P * 0.07, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(r - P * 0.07, t - 2, P * 0.07 + 2, b - t + 4); }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, small } = o;
      if (!(mask & FM_N) && !(mask & FM_W)) {
        const bob = Math.sin(T * 2 + seed) * s * wob * 0.05, k = small ? 0.8 : 1; c.save(); c.translate(-s * 0.05, -s * 0.46 + bob);
        if (food === 'cola' || food === 'shake') { c.fillStyle = food === 'cola' ? '#e8241a' : '#f8f4ec'; c.save(); c.rotate(0.25); c.fillRect(-s * 0.03, -s * 0.3 * k, s * 0.06, s * 0.32 * k); c.fillStyle = food === 'cola' ? '#ffffff' : '#e8241a'; for (let i = 0; i < 3; i++) c.fillRect(-s * 0.03, -s * 0.28 * k + i * s * 0.1, s * 0.06, s * 0.03); c.restore(); if (food === 'shake') { c.fillStyle = '#c8102a'; c.beginPath(); c.arc(s * 0.12, s * 0.02, s * 0.06 * k, 0, TAU); c.fill(); } }
        if (food === 'softserve') { c.fillStyle = '#7a4a2a'; c.fillRect(-s * 0.02, -s * 0.12 * k, s * 0.04, s * 0.14); c.fillStyle = '#ff5a8a'; for (let i = 0; i < 4; i++) c.fillRect(s * (0.04 + i * 0.03), -s * 0.02 + (i % 2) * s * 0.02, s * 0.025, s * 0.012); }
        if (food === 'ketchup') { c.fillStyle = '#f4ece0'; c.beginPath(); c.moveTo(0, 0); c.lineTo(s * 0.2 * k, -s * 0.06); c.lineTo(s * 0.2 * k, s * 0.04); c.closePath(); c.fill(); }
        if (food === 'burger') { c.fillStyle = '#f4ece0'; c.fillRect(-s * 0.01, -s * 0.18 * k, s * 0.02, s * 0.18); c.fillStyle = '#e8241a'; c.beginPath(); c.moveTo(0, -s * 0.18 * k); c.lineTo(s * 0.1, -s * 0.15 * k); c.lineTo(0, -s * 0.12 * k); c.fill(); }
        c.restore();
      }
      if (!small && !(mask & FM_N) && (food === 'fries' || food === 'burger')) { const u = (T * 0.35 + seed * 0.41) % 1; if (u < 0.7) { c.strokeStyle = `rgba(255,255,255,${0.3 * (1 - u / 0.7)})`; c.lineWidth = Math.max(1, s * 0.03); c.beginPath(); const yy = -s * 0.55 - u * s * 0.4; c.moveTo(s * 0.15, yy + s * 0.1); c.quadraticCurveTo(s * 0.25, yy, s * 0.15, yy - s * 0.1); c.stroke(); } }
      if (!small && food === 'cola') { const u = (T * 0.6 + seed * 0.37) % 1; c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.arc(((seed * 7) % 5 / 5 - 0.5) * s * 0.6, s * 0.35 - u * s * 0.7, s * 0.03, 0, TAU); c.fill(); }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, [c0, c1, c2] = C3[food];
      if (food === 'cola') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 }); for (let i = 0; i < 4; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.8, y: Y, vx: 0, vy: -s * (2 + r(i + 13) * 2), g: -1, life: 0.8, r: 0.05 + r(i) * 0.05 }); return true; }
      if (food === 'fries') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1.2, rot: 0, vr: dir * 3, life: 0.8, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'crumb', col: c1, x: X, y: Y, vx: (r(i) - 0.5) * s * 4, vy: -s * (2 + r(i + 3) * 2), life: 0.7 }); return true; }
      if (food === 'softserve' || food === 'shake' || food === 'ketchup') { push({ k: food === 'ketchup' ? 'squish' : 'melt', v, x: X, y: Y, vx: dir * s * 0.6, vy: -s * 0.4, rot: 0, vr: dir * 0.6, life: 0.7, vrr: vr }); for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.07, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 7) * 2.5), life: 0.7 }); return true; }
      push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2.5 + r(1) * 2), vy: -s * 1.4, rot: 0, vr: dir * 6, life: 0.9, vrr: vr }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: i % 2 ? c1 : c2, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * 2, life: 0.6 });
      return true;
    },
  });
  return M;
})();
SKINSETS.fastfood = FastFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'fastfood'); if (st) { st.palette = FastFood.MAIN.slice(1); st.desc = 'Flat geometric roadside burger joint (fan tribute): a sizzling grill line, a beeping fryer, a drive-thru window and menu boards that flip from breakfast to lunch — a bouncy original pop groove.'; } })();
