/* ---- Fish House blocks MADE OF seafood (FoodMass) ----
   I lobster tail (segmented red shell, white meat at the cut ends) · O oysters on ice (pearly half shells, lemon)
   · T seared scallops (golden crust rings) · S mussels (blue-black shells, orange meat) · Z salmon fillet (coral with
   white fat lines, crisp skin) · J seaweed salad (glossy green ribbons, sesame) · L octopus (mauve, sucker rows). */
const SeafoodFood = FoodMass({
  FOOD: [null, 'lobster', 'oyster', 'scallop', 'mussel', 'salmon', 'seaweed', 'octopus'],
  MAIN: [null, '#c8341e', '#d8d0c0', '#f0e2c4', '#252b42', '#f2845c', '#3f7f34', '#a65a72'],
  soft: { lobster: 0.7, oyster: 0.9, scallop: 1.3, mussel: 0.8, salmon: 1.4, seaweed: 1.5, octopus: 1.4 },
  glisten: { salmon: 0.45, oyster: 0.5, octopus: 0.4, seaweed: 0.4, mussel: 0.35 },
  vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
    const lx = vr & 3, ly = (vr >> 2) & 3, horiz = (mask & (E | W)) || !(mask & (N | S));
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
    // piece space: draw patterns in whole-piece coordinates so they run on across cells without seams
    const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
    const form = (hi, lo, w = 0.22) => {
      if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
      if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
    };
    switch (food) {
      case 'lobster': { // one tail: overlapping shell segments (one per cell), white meat at one end, fanned tail at the other
        fill('#c8341e');
        x.save(); if (!horiz) { x.translate(C(0.5), C(0.5)); x.rotate(Math.PI / 2); x.translate(-C(0.5), -C(0.5)); }
        const a0 = horiz ? W : N, a1 = horiz ? E : S;
        x.fillStyle = lin(0, C(0), 0, C(1), [[0, '#f0704a'], [0.35, '#d44228'], [1, '#8e1e10']]); x.fillRect(C(-0.1), C(0), P * 1.2, P);
        x.fillStyle = 'rgba(120,16,6,0.55)'; x.beginPath(); x.moveTo(C(0.86), C(-0.05)); x.quadraticCurveTo(C(1.0), C(0.5), C(0.86), C(1.05)); x.lineTo(C(0.8), C(1.05)); x.quadraticCurveTo(C(0.94), C(0.5), C(0.8), C(-0.05)); x.fill();
        x.fillStyle = 'rgba(255,214,190,0.5)'; x.fillRect(C(-0.1), C(0.16), P * 1.2, P * 0.06);
        if (!(mask & a0)) { x.fillStyle = '#f6ece2'; ellipse(x, C(0.12), C(0.5), P * 0.13, P * 0.4); x.fill(); x.fillStyle = 'rgba(236,150,130,0.6)'; ellipse(x, C(0.12), C(0.5), P * 0.08, P * 0.28); x.fill(); }
        if (!(mask & a1)) { x.fillStyle = '#a82614'; x.beginPath(); x.moveTo(C(0.55), C(0.12)); x.quadraticCurveTo(C(1.0), C(-0.02), C(1.05), C(0.5)); x.quadraticCurveTo(C(1.0), C(1.02), C(0.55), C(0.88)); x.closePath(); x.fill(); x.strokeStyle = 'rgba(255,190,160,0.4)'; x.lineWidth = Math.max(1, P * 0.02); for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(C(0.6), C(0.5)); x.lineTo(C(0.98), C(0.5 + k * 0.3)); x.stroke(); } }
        x.restore();
        form('rgba(255,200,170,0.2)', 'rgba(70,6,0,0.35)', 0.16);
        break;
      }
      case 'oyster': { // one big oyster: pearly meat in the middle, dark frilled mantle and a rough layered shell rim on the exposed sides
        fill('#d8d0c0');
        piece(() => { x.fillStyle = radial(x, P * 0.95, P * 0.95, P * 1.15, [[0, '#f2ede2'], [0.55, '#d2c9b6'], [1, '#9e9482']]); x.fillRect(-P, -P, P * 4, P * 4);
          x.strokeStyle = 'rgba(78,70,60,0.7)'; x.lineWidth = Math.max(1, P * 0.06); x.beginPath(); for (let k = 0; k <= 48; k++) { const a = k / 48 * TAU, rr = P * (0.72 + Math.sin(a * 9) * 0.035); k ? x.lineTo(P + Math.cos(a) * rr, P + Math.sin(a) * rr * 0.92) : x.moveTo(P + rr, P); } x.stroke();
          x.strokeStyle = 'rgba(150,140,124,0.5)'; x.lineWidth = Math.max(1, P * 0.025); x.beginPath(); for (let k = 0; k <= 48; k++) { const a = k / 48 * TAU, rr = P * (0.6 + Math.sin(a * 7 + 1) * 0.03); k ? x.lineTo(P + Math.cos(a) * rr, P + Math.sin(a) * rr * 0.9) : x.moveTo(P + rr, P); } x.stroke();
          x.fillStyle = 'rgba(255,255,255,0.55)'; ellipse(x, P * 0.72, P * 0.62, P * 0.28, P * 0.08, -0.5); x.fill(); x.fillStyle = 'rgba(255,255,255,0.3)'; ellipse(x, P * 1.15, P * 1.1, P * 0.12, P * 0.05, -0.5); x.fill(); });
        const rim = (side) => { const w = P * 0.2; x.save(); if (side === E) { x.translate(C(1), C(0)); x.rotate(Math.PI / 2); } else if (side === S) { x.translate(C(1), C(1)); x.rotate(Math.PI); } else if (side === W) { x.translate(C(0), C(1)); x.rotate(-Math.PI / 2); } else x.translate(C(0), C(0));
          x.fillStyle = '#6f675c'; x.beginPath(); x.moveTo(-P * 0.1, -2); x.lineTo(P * 1.1, -2); for (let k = 6; k >= 0; k--) x.lineTo(P * k / 6, w * (0.75 + 0.35 * hash(vr, k + side, 3))); x.closePath(); x.fill();
          x.strokeStyle = 'rgba(200,190,175,0.5)'; x.lineWidth = Math.max(1, P * 0.02); x.beginPath(); x.moveTo(0, w * 0.4); for (let k = 0; k <= 6; k++) x.lineTo(P * k / 6, w * (0.35 + 0.15 * hash(vr, k + side, 4))); x.stroke();
          x.strokeStyle = 'rgba(60,54,48,0.6)'; x.lineWidth = Math.max(1, P * 0.035); x.beginPath(); for (let k = 0; k <= 8; k++) { const yy = w * 1.25 + Math.sin(k * 2.2 + side) * P * 0.025; k ? x.lineTo(P * k / 8, yy) : x.moveTo(0, yy); } x.stroke(); x.restore(); };
        for (const sd of [N, E, S, W]) if (!(mask & sd)) rim(sd);
        form('rgba(255,255,255,0.25)', 'rgba(40,36,30,0.3)', 0.14);
        break;
      }
      case 'scallop': { // seared scallop flesh: ivory with a fine grain, deep caramel sear on top
        fill('#f0e2c4');
        piece(() => { x.strokeStyle = 'rgba(200,176,130,0.28)'; x.lineWidth = Math.max(1, P * 0.02); for (let k = 0; k < 12; k++) { const xx = P * (0.15 + k * 0.28); x.beginPath(); x.moveTo(xx, 0); x.quadraticCurveTo(xx + P * 0.06, P * 1.5, xx - P * 0.02, P * 3); x.stroke(); } });
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.36, [[0, '#8a4a1a'], [0.35, '#c07a34'], [1, 'rgba(230,180,110,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * 0.38); x.fillStyle = 'rgba(255,230,180,0.5)'; x.fillRect(C(0.1), t + P * 0.05, P * 0.45, Math.max(1, P * 0.025)); }
        form('rgba(255,250,235,0.3)', 'rgba(120,90,50,0.3)');
        break;
      }
      case 'mussel': { // blue-black shells with nacre sheen and growth lines; orange meat where the shells open at the top
        fill('#252b42');
        piece(() => { x.strokeStyle = 'rgba(120,140,190,0.25)'; x.lineWidth = Math.max(1, P * 0.025); for (let k = 1; k < 8; k++) { x.beginPath(); x.arc(P * 0.3, P * 2.6, P * k * 0.42, -1.4, -0.1); x.stroke(); } x.fillStyle = 'rgba(150,170,220,0.18)'; ellipse(x, P * 0.9, P * 0.7, P * 0.6, P * 0.2, -0.5); x.fill(); });
        if (!(mask & N)) { x.fillStyle = '#e8873a'; x.beginPath(); x.moveTo(l - 2, t + P * 0.2); for (let k = 0; k <= 4; k++) x.lineTo(lerp(l - 2, r + 2, k / 4), t + P * (0.08 + 0.08 * hash(vr, k, 5))); x.lineTo(r + 2, t + P * 0.24); x.lineTo(l - 2, t + P * 0.24); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,220,170,0.5)'; x.fillRect(C(0.15), t + P * 0.12, P * 0.3, Math.max(1, P * 0.025)); x.fillStyle = '#1a1e30'; x.fillRect(l - 2, t + P * 0.22, r - l + 4, Math.max(1, P * 0.035)); }
        form('rgba(170,190,240,0.22)', 'rgba(5,6,14,0.45)');
        break;
      }
      case 'salmon': { // fillet: coral flesh with white fat lines that run on across the piece, crisp skin underneath
        fill('#f2845c');
        piece(() => { x.strokeStyle = 'rgba(255,236,224,0.7)'; x.lineWidth = Math.max(1, P * 0.045); for (let k = -4; k < 10; k++) { const o = k * P * 0.5; x.beginPath(); x.moveTo(o, P * 4); x.quadraticCurveTo(o + P * 0.9, P * 2, o + P * 2.2, 0); x.stroke(); } x.strokeStyle = 'rgba(200,90,60,0.25)'; x.lineWidth = Math.max(1, P * 0.03); for (let k = -4; k < 10; k++) { const o = k * P * 0.5 + P * 0.2; x.beginPath(); x.moveTo(o, P * 4); x.quadraticCurveTo(o + P * 0.9, P * 2, o + P * 2.2, 0); x.stroke(); } });
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.18, 0, b, [[0, '#9a9286'], [1, '#5e584e']]); x.fillRect(l - 2, b - P * 0.16, r - l + 4, P * 0.18); x.fillStyle = 'rgba(230,224,214,0.7)'; x.fillRect(l - 2, b - P * 0.16, r - l + 4, Math.max(1, P * 0.025)); }
        form('rgba(255,220,200,0.25)', 'rgba(120,40,20,0.3)');
        break;
      }
      case 'seaweed': { // wakame salad: glossy ribbons flowing across the whole piece, a few sesame seeds
        fill('#3f7f34');
        piece(() => { x.lineCap = 'round'; for (let k = 0; k < 9; k++) { const y0 = P * (0.2 + k * 0.42); x.strokeStyle = k % 2 ? 'rgba(120,190,90,0.75)' : 'rgba(90,160,70,0.8)'; x.lineWidth = P * 0.16; x.beginPath(); x.moveTo(-P * 0.2, y0); for (let j = 1; j <= 12; j++) x.lineTo(j * P * 0.35 - P * 0.2, y0 + Math.sin(j * 0.9 + k * 1.3) * P * 0.12); x.stroke(); x.strokeStyle = 'rgba(210,250,180,0.45)'; x.lineWidth = Math.max(1, P * 0.03); x.beginPath(); x.moveTo(-P * 0.2, y0 - P * 0.05); for (let j = 1; j <= 12; j++) x.lineTo(j * P * 0.35 - P * 0.2, y0 - P * 0.05 + Math.sin(j * 0.9 + k * 1.3) * P * 0.12); x.stroke(); } x.lineCap = 'butt'; });
        if (!small) { x.fillStyle = '#f4ead0'; for (let i = 0; i < 3; i++) { ellipse(x, C(0.15 + hash(vr, i, 10) * 0.7), C(0.15 + hash(vr, i, 11) * 0.7), Math.max(0.8, P * 0.03), Math.max(0.5, P * 0.016), hash(i, vr) * 3); x.fill(); } }
        form('rgba(220,255,200,0.2)', 'rgba(10,40,10,0.35)');
        break;
      }
      case 'octopus': { // grilled octopus: mauve skin, pale suckers only along the exposed underside, charred tips
        fill('#a65a72');
        piece(() => { x.fillStyle = 'rgba(255,214,226,0.18)'; ellipse(x, P * 1.2, P * 0.6, P * 1.2, P * 0.25, -0.2); x.fill(); });
        if (!(mask & S)) for (let i = 0; i < 3; i++) { const cx = C((i + 0.5) / 3), cy = b - P * 0.16; x.fillStyle = '#efd6d6'; ellipse(x, cx, cy, P * 0.1, P * 0.08); x.fill(); x.fillStyle = 'rgba(190,120,135,0.8)'; ellipse(x, cx, cy + P * 0.01, P * 0.05, P * 0.035); x.fill(); }
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.2, [[0, 'rgba(50,18,24,0.55)'], [1, 'rgba(50,18,24,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * 0.22); }
        form('rgba(255,220,230,0.22)', 'rgba(50,14,26,0.35)');
        break;
      }
    }
  },
  live(c, food, o) {
    const { s, mask, seed, T, small, hash } = o;
    if (small) return;
    if (food === 'oyster' || food === 'seaweed' || food === 'salmon') { const u = (T * 0.35 + hash(seed, 1)) % 1; if (u < 0.3) { c.globalAlpha = (o.alpha ?? 1) * Math.sin(u / 0.3 * Math.PI) * 0.8; c.fillStyle = '#ffffff'; const x = (hash(seed, 2) - 0.5) * s * 0.6, y = (hash(seed, 3) - 0.5) * s * 0.6; c.beginPath(); c.moveTo(x, y - s * 0.08); c.lineTo(x + s * 0.02, y); c.lineTo(x, y + s * 0.08); c.lineTo(x - s * 0.02, y); c.fill(); c.beginPath(); c.moveTo(x - s * 0.08, y); c.lineTo(x, y + s * 0.02); c.lineTo(x + s * 0.08, y); c.lineTo(x, y - s * 0.02); c.fill(); c.globalAlpha = o.alpha ?? 1; } }
    if (food === 'scallop' && !(mask & FM_N)) { c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = Math.max(1, s * 0.04); const u = (T * 0.5 + seed * 0.1) % 1; c.globalAlpha = (o.alpha ?? 1) * Math.sin(u * Math.PI) * 0.7; c.beginPath(); c.moveTo(0, -s * 0.5 - u * s * 0.3); c.quadraticCurveTo(s * 0.08, -s * 0.6 - u * s * 0.3, 0, -s * 0.7 - u * s * 0.3); c.stroke(); c.globalAlpha = o.alpha ?? 1; }
  },
  clear(food, q) {
    const { v, X, Y, s, r, vr, push, dir } = q, col = SeafoodFood.MAIN[v];
    push({ k: food === 'scallop' || food === 'mussel' ? 'roll' : 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.9, rot: 0, vr: dir * (1.5 + r(3) * 2), life: 0.85, vrr: vr });
    for (let i = 0; i < 3; i++) push({ k: 'dot', col: food === 'oyster' ? '#ffffff' : i % 2 ? col : '#d8eef6', r: 0.05 + r(i) * 0.04, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 7) * 2), life: 0.6 });
    push({ k: 'bubble', x: X, y: Y, vx: 0, vy: -s * 2, g: -1, life: 0.7, r: 0.07 });
    return true;
  },
});
SKINSETS.seafood = SeafoodFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'fishhouse'); if (st) { st.palette = SeafoodFood.MAIN.slice(1); st.boardBg = 'rgba(22,24,28,0.9)'; st.desc = 'Flat geometric harbour dining room: an oyster bar on crushed ice, a waiter lifting cloches and pouring wine, candles lit at dusk and a lighthouse sweeping the night — string quartet & piano.'; } })();
