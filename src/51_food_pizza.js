/* ---- Trattoria blocks MADE OF Italian food (FoodMass) ----
   I spaghetti al pomodoro (golden strands, sauce + basil on top) · O margherita (tomato, torn mozzarella, basil, charred crust rim)
   · T fior di latte (smooth white mozzarella balls) · S pesto genovese (green, pine nuts) · Z prosciutto (pink ribbons, white fat)
   · J melanzane (glossy aubergine slices, cream flesh) · L arancini (golden crumbed rice balls). */
const PizzaFood = (() => {
  const C3 = { spaghetti: ['#f2cc5a', '#ffe48e', '#c89a2a'], margherita: ['#e0402a', '#f46a48', '#a82414'], mozzarella: ['#f8f4ec', '#ffffff', '#ddd6c4'], pesto: ['#5aa83a', '#86c860', '#3a7a22'], prosciutto: ['#e8909a', '#f8b8bc', '#c0606c'], melanzane: ['#4a3060', '#6e4c8a', '#2a1a3a'], arancini: ['#d88a2a', '#f0b050', '#a85e14'] };
  const M = FoodMass({
    FOOD: [null, 'spaghetti', 'margherita', 'mozzarella', 'pesto', 'prosciutto', 'melanzane', 'arancini'],
    MAIN: [null, '#f2cc5a', '#e0402a', '#f8f4ec', '#5aa83a', '#e8909a', '#4a3060', '#d88a2a'],
    soft: { spaghetti: 1.4, margherita: 1.2, mozzarella: 1.6, pesto: 1.3, prosciutto: 1.3, melanzane: 1.2, arancini: 1.1 },
    glisten: { margherita: 0.35, pesto: 0.4, melanzane: 0.55, mozzarella: 0.25 },
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, poly, N, E, S, W } = Q;
      const [c0, c1, c2] = C3[food], lw = (k) => Math.max(1, P * k);
      x.fillStyle = linear(x, 0, t, 0, b, [[0, c1], [0.5, c0], [1, c2]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      if (food === 'spaghetti') { // tangled strands
        x.lineWidth = lw(0.055); for (let i = 0; i < (small ? 4 : 9); i++) { const y0 = C(0.08 + i * (small ? 0.24 : 0.105)), ph = hash(vr, i, 1) * 6; x.strokeStyle = i % 2 ? c1 : shade(c2, 0.05); x.beginPath(); for (let k = 0; k <= 10; k++) { const xx = lerp(C(-0.05), C(1.05), k / 10), yy = y0 + Math.sin(ph + k * 1.3) * P * 0.06; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
        if (!(mask & N)) { x.fillStyle = '#c8301c'; x.beginPath(); x.moveTo(l - 2, t + P * 0.3); x.quadraticCurveTo(C(0.25), t - P * 0.02, C(0.5), t + P * 0.12); x.quadraticCurveTo(C(0.75), t + P * 0.26, r + 2, t + P * 0.1); x.lineTo(r + 2, t - 2); x.lineTo(l - 2, t - 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.35)'; ellipse(x, C(0.3), t + P * 0.1, P * 0.1, P * 0.03); x.fill(); }
      }
      if (food === 'margherita') {
        x.fillStyle = '#fbf4e2'; for (let i = 0; i < (small ? 2 : 4); i++) { const cx = C(0.15 + hash(vr, i, 2) * 0.7), cy = C(0.15 + hash(vr, i, 3) * 0.7), rr = P * (0.11 + hash(i, vr, 4) * 0.06); x.beginPath(); for (let k = 0; k < 7; k++) { const a = k / 7 * TAU, q = rr * (0.8 + hash(vr, i, k) * 0.4); k ? x.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q) : x.moveTo(cx + q, cy); } x.fill(); }
        if (!small) { x.fillStyle = '#2e7a2a'; const cx = C(0.5 + (hash(vr, 9) - 0.5) * 0.4), cy = C(0.5 + (hash(vr, 10) - 0.5) * 0.4); ellipse(x, cx, cy, P * 0.1, P * 0.05, hash(vr, 11) * 3); x.fill(); }
        if (!(mask & N)) { x.fillStyle = '#e8b868'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.16); x.fillStyle = '#3a2214'; for (let i = 0; i < 2; i++) { ellipse(x, C(0.2 + hash(vr, i, 12) * 0.6), t + P * 0.06, P * 0.06, P * 0.03); x.fill(); } }
      }
      if (food === 'mozzarella') { // balls: one per cell with a soft sheen + seam
        x.strokeStyle = shade(c2, -0.06); x.lineWidth = lw(0.04); x.beginPath(); x.arc(C(0.5), C(0.5), P * 0.42, 0.3, 2.8); x.stroke();
        x.fillStyle = 'rgba(255,255,255,0.9)'; ellipse(x, C(0.35), C(0.3), P * 0.14, P * 0.07, -0.5); x.fill();
        x.fillStyle = 'rgba(200,220,230,0.25)'; ellipse(x, C(0.62), C(0.72), P * 0.18, P * 0.06, 0.2); x.fill();
      }
      if (food === 'pesto') {
        x.fillStyle = 'rgba(30,70,20,0.45)'; for (let i = 0; i < (small ? 4 : 12); i++) x.fillRect(C(0.05 + hash(vr, i, 5) * 0.9), C(0.05 + hash(vr, i, 6) * 0.9), lw(0.05), lw(0.04));
        x.fillStyle = '#f2e2b0'; for (let i = 0; i < (small ? 1 : 3); i++) { ellipse(x, C(0.15 + hash(vr, i, 7) * 0.7), C(0.15 + hash(vr, i, 8) * 0.7), P * 0.06, P * 0.035, hash(i, vr) * 3); x.fill(); }
        x.fillStyle = 'rgba(255,240,140,0.3)'; ellipse(x, C(0.4), C(0.3), P * 0.2, P * 0.06, -0.2); x.fill();
      }
      if (food === 'prosciutto') { // folded ribbons with white fat edge
        for (let i = 0; i < 2; i++) { const y0 = C(0.25 + i * 0.48), ph = hash(vr, i, 9) * 6; x.strokeStyle = '#fff0ec'; x.lineWidth = lw(0.07); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = lerp(C(-0.05), C(1.05), k / 8), yy = y0 + Math.sin(ph + k * 1.1) * P * 0.1; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); x.strokeStyle = shade(c2, -0.05); x.lineWidth = lw(0.03); x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = lerp(C(-0.05), C(1.05), k / 8), yy = y0 + P * 0.08 + Math.sin(ph + k * 1.1) * P * 0.1; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
      }
      if (food === 'melanzane') { // one slice per cell: cream flesh, purple skin, seeds
        x.fillStyle = '#e8dcb0'; x.beginPath(); x.arc(C(0.5), C(0.5), P * 0.32, 0, TAU); x.fill(); x.fillStyle = '#c8a860'; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU + vr; x.beginPath(); x.arc(C(0.5) + Math.cos(a) * P * 0.16, C(0.5) + Math.sin(a) * P * 0.16, lw(0.025), 0, TAU); x.fill(); }
        x.fillStyle = 'rgba(160,90,40,0.35)'; ellipse(x, C(0.55), C(0.58), P * 0.18, P * 0.1, 0.5); x.fill(); x.fillStyle = 'rgba(255,255,255,0.35)'; ellipse(x, C(0.22), C(0.2), P * 0.08, P * 0.035, -0.6); x.fill();
      }
      if (food === 'arancini') { // crumb texture + round seam per cell
        x.fillStyle = 'rgba(120,60,10,0.35)'; for (let i = 0; i < (small ? 6 : 18); i++) x.fillRect(C(0.04 + hash(vr, i, 13) * 0.92), C(0.04 + hash(vr, i, 14) * 0.92), lw(0.04), lw(0.04));
        x.fillStyle = 'rgba(255,230,160,0.5)'; for (let i = 0; i < (small ? 3 : 8); i++) x.fillRect(C(0.04 + hash(vr, i, 15) * 0.92), C(0.04 + hash(vr, i, 16) * 0.92), lw(0.035), lw(0.035));
        x.strokeStyle = 'rgba(110,50,0,0.35)'; x.lineWidth = lw(0.04); x.beginPath(); x.arc(C(0.5), C(0.5), P * 0.44, 0.4, 2.7); x.stroke();
      }
      if (!(mask & S)) { x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(l - 2, b - P * 0.09, r - l + 4, P * 0.09 + 2); }
      if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(l - 2, t - 2, P * 0.07, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(r - P * 0.07, t - 2, P * 0.07 + 2, b - t + 4); }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, small } = o;
      if (!(mask & FM_N) && !(mask & FM_W)) {
        const bob = Math.sin(T * 2 + seed) * s * wob * 0.05, k = small ? 0.8 : 1; c.save(); c.translate(-s * 0.05, -s * 0.42 + bob);
        switch (food) {
          case 'spaghetti': case 'margherita': c.fillStyle = '#2e8a2a'; c.save(); c.rotate(-0.5); ellipse(c, 0, 0, s * 0.13 * k, s * 0.065 * k); c.fill(); c.strokeStyle = '#1e5a1a'; c.lineWidth = Math.max(1, s * 0.015); c.beginPath(); c.moveTo(-s * 0.1 * k, 0); c.lineTo(s * 0.1 * k, 0); c.stroke(); c.restore(); if (food === 'spaghetti') { c.fillStyle = '#fffbe8'; for (let i = 0; i < 4; i++) c.fillRect(s * (0.06 + i * 0.03), -s * 0.02 + (i % 2) * s * 0.03, s * 0.025, s * 0.02); } break;
          case 'mozzarella': c.fillStyle = '#3a8a2a'; ellipse(c, s * 0.02, 0, s * 0.08 * k, s * 0.04 * k, 0.3); c.fill(); c.fillStyle = 'rgba(220,240,180,0.9)'; c.beginPath(); c.arc(-s * 0.08, s * 0.02, s * 0.025, 0, TAU); c.fill(); break;
          case 'pesto': c.fillStyle = '#3a9a2a'; for (let i = 0; i < 2; i++) { c.save(); c.rotate(-0.8 + i * 1.2); ellipse(c, s * 0.06, 0, s * 0.09 * k, s * 0.045 * k); c.fill(); c.restore(); } break;
          case 'prosciutto': c.fillStyle = '#7ab83a'; for (let i = 0; i < 3; i++) { c.save(); c.rotate(-1 + i * 0.7); c.fillRect(0, -s * 0.012, s * 0.13 * k, s * 0.024); c.restore(); } break;
          case 'melanzane': c.fillStyle = '#fbf4e2'; c.beginPath(); c.arc(0, 0, s * 0.07 * k, 0, TAU); c.fill(); c.fillStyle = '#c8301c'; c.beginPath(); c.arc(s * 0.08, s * 0.02, s * 0.04 * k, 0, TAU); c.fill(); break;
          case 'arancini': c.fillStyle = '#f8f0dc'; for (let i = 0; i < 4; i++) c.fillRect(-s * 0.06 + i * s * 0.035, -s * 0.02 - (i % 2) * s * 0.02, s * 0.025, s * 0.025); break;
        }
        c.restore();
      }
      if (!small && !(mask & FM_N) && (food === 'margherita' || food === 'spaghetti' || food === 'arancini')) { const u = (T * 0.35 + seed * 0.41) % 1; if (u < 0.7) { c.strokeStyle = `rgba(255,255,255,${0.32 * (1 - u / 0.7)})`; c.lineWidth = Math.max(1, s * 0.03); c.beginPath(); const yy = -s * 0.55 - u * s * 0.4; c.moveTo(s * 0.15, yy + s * 0.1); c.quadraticCurveTo(s * 0.25, yy, s * 0.15, yy - s * 0.1); c.stroke(); } }
      if (!small && !(mask & FM_S) && food === 'mozzarella') { const u = (T * 0.22 + seed * 0.3) % 1; if (u < 0.5) { c.fillStyle = 'rgba(255,255,255,0.85)'; c.beginPath(); c.arc(0, s * 0.44 + u * s * 0.08, s * 0.03, 0, TAU); c.fill(); } }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, [c0, c1, c2] = C3[food];
      if (food === 'mozzarella' || food === 'arancini') push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2.5 + r(1) * 2), vy: -s * 1.4, rot: 0, vr: dir * 6, life: 0.9, vrr: vr });
      else if (food === 'prosciutto' || food === 'spaghetti') push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1, rot: 0, vr: dir * 2.5, life: 0.85, vrr: vr });
      else push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45 });
      for (let i = 0; i < 4; i++) push({ k: 'crumb', col: i % 2 ? c1 : c2, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 5) * 2.5), life: 0.65 });
      if (food === 'margherita' || food === 'pesto') push({ k: 'dot', col: '#2e8a2a', r: 0.07, x: X, y: Y, vx: (r(9) - 0.5) * s * 3, vy: -s * 3, life: 0.7 });
      return true;
    },
  });
  return M;
})();
SKINSETS.pizza = PizzaFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'pizzeria'); if (st) { st.palette = PizzaFood.MAIN.slice(1); st.desc = 'Flat geometric Neapolitan trattoria: a wood-fired dome oven, dough tossed high, cheese that stretches, Chianti by candlelight and an accordion at night — a tarantella lilt on mandolin & accordion.'; } })();
