/* ---- Trattoria blocks MADE OF Italian food (FoodMass) ----
   I spaghetti al pomodoro (golden strands, sauce + basil on top) · O margherita (tomato, torn mozzarella, basil, charred crust rim)
   · T fior di latte (smooth white mozzarella balls) · S pesto genovese (green, pine nuts) · Z prosciutto (pink ribbons, white fat)
   · J melanzane (glossy aubergine slices, cream flesh) · L arancini (golden crumbed rice balls). */
const PizzaFood = (() => {
  const C3 = { spaghetti: ['#f2cc5a', '#ffe48e', '#c89a2a'], margherita: ['#e0402a', '#f46a48', '#a82414'], mozzarella: ['#f8f4ec', '#ffffff', '#ddd6c4'], pesto: ['#5aa83a', '#86c860', '#3a7a22'], prosciutto: ['#e8909a', '#f8b8bc', '#c0606c'], melanzane: ['#4a3060', '#6e4c8a', '#2a1a3a'], arancini: ['#d88a2a', '#f0b050', '#a85e14'] };
  const M = FoodMass({
    FOOD: [null, 'spaghetti', 'margherita', 'mozzarella', 'pesto', 'prosciutto', 'melanzane', 'arancini'],
    MAIN: [null, '#e2b84e', '#c8361e', '#f4efe4', '#4c8e30', '#df8a90', '#5a3248', '#cf8a30'],
    soft: { spaghetti: 1.4, margherita: 1.2, mozzarella: 1.6, pesto: 1.3, prosciutto: 1.3, melanzane: 1.2, arancini: 1.1 },
    glisten: { margherita: 0.35, pesto: 0.4, melanzane: 0.55, mozzarella: 0.25 },
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
      const lx = vr & 3, ly = (vr >> 2) & 3, lw = (k) => Math.max(1, P * k);
      const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(17, i, k); // piece-space randomness (same for every cell of the piece)
      const form = (hi, lo, w = 0.22) => {
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
      };
      switch (food) {
        case 'spaghetti': { // long strands running the whole length of the piece, tomato sauce ladled on the exposed top
          fill('#e2b84e');
          piece(() => { x.lineCap = 'round'; for (let i = 0; i < 16; i++) { const o = P * (0.12 + i * 0.25), ph = H(i, 1) * 6; x.strokeStyle = i % 3 === 0 ? 'rgba(170,120,30,0.55)' : 'rgba(255,230,150,0.7)'; x.lineWidth = lw(0.05); x.beginPath(); for (let k = 0; k <= 24; k++) { const u = k / 24 * P * 4; const a = o + Math.sin(u / P * 1.7 + ph) * P * 0.16; k ? x.lineTo(u, a) : x.moveTo(u, a); } x.stroke(); x.beginPath(); for (let k = 0; k <= 24; k++) { const u = k / 24 * P * 4; const a = o + Math.sin(u / P * 1.7 + ph) * P * 0.16; k ? x.lineTo(a, u) : x.moveTo(a, u); } x.globalAlpha = 0.5; x.stroke(); x.globalAlpha = 1; } x.lineCap = 'butt'; });
          if (!(mask & N)) { x.fillStyle = '#b8301c'; x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, t + P * (0.16 + hash(vr, 1) * 0.08)); x.quadraticCurveTo(C(0.7), t + P * 0.34, C(0.5), t + P * 0.22); x.quadraticCurveTo(C(0.25), t + P * 0.12, l - 2, t + P * (0.2 + hash(vr, 2) * 0.1)); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,170,140,0.5)'; ellipse(x, C(0.35), t + P * 0.08, P * 0.16, P * 0.03, -0.1); x.fill(); }
          form('rgba(255,240,200,0.25)', 'rgba(120,80,20,0.3)');
          break;
        }
        case 'margherita': { // one pizza across the piece: tomato, torn mozzarella, basil, leopard-spotted crust on the exposed edges
          fill('#c8361e');
          piece(() => { x.fillStyle = 'rgba(232,90,50,0.45)'; ellipse(x, P * 0.8, P * 0.8, P * 0.7, P * 0.5, 0.4); x.fill();
            for (let i = 0; i < 4; i++) { const cx = P * (0.45 + (i % 2) * 1.1 + H(i, 2) * 0.2), cy = P * (0.45 + Math.floor(i / 2) * 1.1 + H(i, 3) * 0.2), rr = P * 0.26; x.fillStyle = '#f7f1e3'; x.beginPath(); for (let k = 0; k <= 10; k++) { const a = k / 10 * TAU, q = rr * (0.75 + H(i, k + 4) * 0.4); k ? x.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q * 0.85) : x.moveTo(cx + q, cy); } x.closePath(); x.fill(); x.fillStyle = 'rgba(220,200,160,0.45)'; ellipse(x, cx + rr * 0.15, cy + rr * 0.2, rr * 0.5, rr * 0.25, 0.3); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; ellipse(x, cx - rr * 0.25, cy - rr * 0.25, rr * 0.22, rr * 0.1, -0.5); x.fill(); }
            for (let i = 0; i < 2; i++) { const cx = P * (1.0 + (i ? 0.5 : -0.4)), cy = P * (i ? 0.7 : 1.35), a = i ? -0.6 : 0.8; x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = '#2f7a2a'; ellipse(x, 0, 0, P * 0.16, P * 0.08); x.fill(); x.strokeStyle = 'rgba(160,220,120,0.6)'; x.lineWidth = lw(0.015); x.beginPath(); x.moveTo(-P * 0.13, 0); x.lineTo(P * 0.13, 0); x.stroke(); x.restore(); } });
          const crust = P * 0.2;
          const band = (side) => { x.save(); if (side === E) { x.translate(C(1), C(0)); x.rotate(Math.PI / 2); } else if (side === S) { x.translate(C(1), C(1)); x.rotate(Math.PI); } else if (side === W) { x.translate(C(0), C(1)); x.rotate(-Math.PI / 2); } else x.translate(C(0), C(0));
            x.fillStyle = lin(0, 0, 0, crust, [[0, '#c9883e'], [0.6, '#e2a858'], [1, '#b06a28']]); x.fillRect(-P * 0.1, -2, P * 1.2, crust + 2);
            x.fillStyle = 'rgba(50,24,10,0.75)'; for (let k = 0; k < 3; k++) { ellipse(x, P * (0.15 + hash(vr, k + side, 7) * 0.7), crust * (0.3 + hash(vr, k + side, 8) * 0.4), P * 0.035, P * 0.025, hash(k, side) * 3); x.fill(); } x.restore(); };
          for (const sd of [N, E, S, W]) if (!(mask & sd)) band(sd);
          form('rgba(255,220,180,0.18)', 'rgba(80,20,8,0.3)', 0.14);
          break;
        }
        case 'mozzarella': { // fior di latte: one milky, wet-looking mass with a thread of olive oil and cracked pepper
          fill('#f4efe4');
          piece(() => { x.fillStyle = 'rgba(255,255,255,0.7)'; ellipse(x, P * 1.0, P * 0.55, P * 0.9, P * 0.18, -0.08); x.fill(); x.fillStyle = 'rgba(214,204,182,0.4)'; ellipse(x, P * 1.6, P * 1.6, P * 1.0, P * 0.3, -0.1); x.fill();
            x.strokeStyle = 'rgba(176,170,60,0.55)'; x.lineWidth = lw(0.035); x.lineCap = 'round'; x.beginPath(); x.moveTo(P * 0.2, P * 0.95); x.bezierCurveTo(P * 0.9, P * 0.7, P * 1.4, P * 1.25, P * 2.8, P * 0.85); x.stroke(); x.lineCap = 'butt';
            x.fillStyle = 'rgba(40,36,30,0.6)'; for (let i = 0; i < 9; i++) { x.fillRect(P * (0.2 + H(i, 5) * 2.6), P * (0.2 + H(i, 6) * 1.6), lw(0.025), lw(0.025)); } });
          form('rgba(255,255,255,0.4)', 'rgba(150,136,110,0.3)');
          break;
        }
        case 'pesto': { // glossy basil pesto: oil sheen, darker leaf flecks, a few pine nuts
          fill('#4c8e30');
          piece(() => { x.fillStyle = 'rgba(160,210,90,0.35)'; ellipse(x, P * 0.9, P * 0.5, P * 0.8, P * 0.18, -0.2); x.fill(); x.fillStyle = 'rgba(28,70,18,0.45)'; for (let i = 0; i < 14; i++) { ellipse(x, P * H(i, 7) * 3, P * H(i, 8) * 3, P * 0.05, P * 0.025, H(i, 9) * 3); x.fill(); } x.fillStyle = '#efe2b6'; for (let i = 0; i < 4; i++) { ellipse(x, P * (0.3 + H(i, 10) * 2.4), P * (0.3 + H(i, 11) * 1.4), P * 0.055, P * 0.032, H(i, 12) * 3); x.fill(); } });
          form('rgba(220,255,180,0.25)', 'rgba(10,40,6,0.35)');
          break;
        }
        case 'prosciutto': { // folded ribbons of ham: pink and fat-white bands flowing across the piece, soft fold shadows
          fill('#df8a90');
          piece(() => { for (let i = -4; i < 12; i++) { const o = i * P * 0.42; x.fillStyle = i % 2 ? 'rgba(248,226,220,0.85)' : 'rgba(196,92,104,0.35)'; x.beginPath(); x.moveTo(o, P * 4); x.bezierCurveTo(o + P * 0.8, P * 2.6, o + P * 0.4, P * 1.4, o + P * 1.6, 0); x.lineTo(o + P * 1.6 + P * (i % 2 ? 0.1 : 0.22), 0); x.bezierCurveTo(o + P * 0.4 + P * 0.16, P * 1.4, o + P * 0.8 + P * 0.16, P * 2.6, o + P * (i % 2 ? 0.1 : 0.22), P * 4); x.closePath(); x.fill(); } });
          form('rgba(255,236,236,0.3)', 'rgba(110,30,40,0.3)');
          break;
        }
        case 'melanzane': { // parmigiana: layers of aubergine, tomato and mozzarella running across the piece, browned cheese on top
          fill('#5a3248');
          piece(() => { const L = [['#3e2238', 0.22], ['#c23a22', 0.1], ['#f2e6c8', 0.1]]; let y = 0; for (let k = 0; k < 14; k++) { const [col, h] = L[k % 3]; x.fillStyle = col; x.beginPath(); x.moveTo(-P, y); for (let j = 0; j <= 8; j++) x.lineTo(-P + j * P * 0.75, y + Math.sin(j * 1.3 + k) * P * 0.025); x.lineTo(P * 5, y + h * P + P * 0.03); x.lineTo(-P, y + h * P + P * 0.03); x.closePath(); x.fill(); y += h * P; } });
          if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.24, [[0, '#a8662a'], [0.5, '#e0b060'], [1, 'rgba(240,220,170,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * 0.26); x.fillStyle = 'rgba(120,60,20,0.6)'; for (let k = 0; k < 3; k++) { ellipse(x, C(0.15 + hash(vr, k, 9) * 0.7), t + P * 0.07, P * 0.04, P * 0.02); x.fill(); } }
          form('rgba(255,230,210,0.2)', 'rgba(30,10,20,0.4)');
          break;
        }
        case 'arancini': { // golden crumb crust with a fine texture and soft sheen
          fill('#cf8a30');
          piece(() => { x.fillStyle = 'rgba(255,214,140,0.35)'; ellipse(x, P * 0.9, P * 0.6, P * 0.8, P * 0.3, -0.3); x.fill(); });
          if (!small) { for (let i = 0; i < 18; i++) { x.fillStyle = i % 2 ? 'rgba(120,60,16,0.35)' : 'rgba(255,220,150,0.45)'; x.fillRect(C(0.06 + hash(vr, i, 13) * 0.88), C(0.06 + hash(vr, i, 14) * 0.88), lw(0.03), lw(0.025)); } }
          form('rgba(255,230,170,0.3)', 'rgba(90,40,8,0.38)');
          break;
        }
      }
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
          case 'melanzane': break; case 'zz_unused': c.fillStyle = '#fbf4e2'; c.beginPath(); c.arc(0, 0, s * 0.07 * k, 0, TAU); c.fill(); c.fillStyle = '#c8301c'; c.beginPath(); c.arc(s * 0.08, s * 0.02, s * 0.04 * k, 0, TAU); c.fill(); break;
          case 'arancini': break; case 'zz_unused2': c.fillStyle = '#f8f0dc'; for (let i = 0; i < 4; i++) c.fillRect(-s * 0.06 + i * s * 0.035, -s * 0.02 - (i % 2) * s * 0.02, s * 0.025, s * 0.025); break;
        }
        c.restore();
      }
      if (!small && !(mask & FM_N) && (food === 'margherita' || food === 'spaghetti' || food === 'arancini')) { const u = (o.T * 0.22 + o.seed * 0.41) % 1; if (u < 0.7) { const x0 = Math.sin(o.T * 1.3 + o.seed) * s * 0.08, y0 = -s * 0.45 - u * s * 0.7, rr = s * (0.14 + u * 0.22); c.globalAlpha = (o.alpha ?? 1) * Math.sin((u / 0.7) * Math.PI) * 0.25; c.fillStyle = radial(c, x0, y0, rr, [[0, 'rgba(255,255,255,0.9)'], [1, 'rgba(255,255,255,0)']]); c.fillRect(x0 - rr, y0 - rr, rr * 2, rr * 2); c.globalAlpha = o.alpha ?? 1; } }
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
