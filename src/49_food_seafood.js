/* ---- Fish House blocks MADE OF seafood (FoodMass) ----
   I lobster tail (segmented red shell, white meat at the cut ends) · O oysters on ice (pearly half shells, lemon)
   · T seared scallops (golden crust rings) · S mussels (blue-black shells, orange meat) · Z salmon fillet (coral with
   white fat lines, crisp skin) · J seaweed salad (glossy green ribbons, sesame) · L octopus (mauve, sucker rows). */
const SeafoodFood = FoodMass({
  FOOD: [null, 'lobster', 'oyster', 'scallop', 'mussel', 'salmon', 'seaweed', 'octopus'],
  MAIN: [null, '#d8341e', '#bccad2', '#f4e4c4', '#2a3050', '#ff8a62', '#5aa04a', '#b0607a'],
  soft: { lobster: 0.7, oyster: 0.9, scallop: 1.3, mussel: 0.8, salmon: 1.4, seaweed: 1.5, octopus: 1.4 },
  glisten: { salmon: 0.45, oyster: 0.5, octopus: 0.4, seaweed: 0.4, mussel: 0.35 },
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, band, hash, poly, N, E, S, W } = Q;
    const grad = (a, m, z) => { x.fillStyle = linear(x, 0, t, 0, b, [[0, a], [0.5, m], [1, z]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const horiz = (mask & (E | W)) || !(mask & (N | S));
    switch (food) {
      case 'lobster': {
        grad('#f05a38', '#d8341e', '#a01e10');
        x.strokeStyle = 'rgba(110,10,0,0.55)'; x.lineWidth = Math.max(1, P * 0.05); x.beginPath();
        if (horiz) for (let i = 1; i < 3; i++) { const xx = C(i / 3); x.moveTo(xx, t - 2); x.quadraticCurveTo(xx + P * 0.1, C(0.5), xx, b + 2); } else for (let i = 1; i < 3; i++) { const yy = C(i / 3); x.moveTo(l - 2, yy); x.quadraticCurveTo(C(0.5), yy + P * 0.1, r + 2, yy); }
        x.stroke(); x.fillStyle = 'rgba(255,200,170,0.4)'; if (horiz) x.fillRect(l - 2, C(0.14), r - l + 4, P * 0.1); else x.fillRect(C(0.14), t - 2, P * 0.1, b - t + 4);
        x.fillStyle = 'rgba(90,0,0,0.4)'; for (let i = 0; i < (small ? 2 : 6); i++) { x.beginPath(); x.arc(C(0.1 + hash(vr, i, 1) * 0.8), C(0.1 + hash(vr, i, 2) * 0.8), P * 0.025, 0, TAU); x.fill(); }
        const meat = (cx, cy, rx, ry) => { ellipse(x, cx, cy, rx, ry); x.fillStyle = '#fbf2ea'; x.fill(); ellipse(x, cx, cy, rx * 0.6, ry * 0.6); x.fillStyle = '#f6c8b8'; x.fill(); };
        if (horiz) { if (!(mask & W)) meat(l + P * 0.12, C(0.5), P * 0.14, P * 0.36); if (!(mask & E)) { x.fillStyle = '#c8281a'; poly(x, [r - P * 0.2, C(0.1), r + 1, C(0.0), r + 1, C(1), r - P * 0.2, C(0.9)]); x.fill(); } }
        else { if (!(mask & N)) meat(C(0.5), t + P * 0.12, P * 0.36, P * 0.14); if (!(mask & S)) { x.fillStyle = '#c8281a'; poly(x, [C(0.1), b - P * 0.2, C(0), b + 1, C(1), b + 1, C(0.9), b - P * 0.2]); x.fill(); } }
        break;
      }
      case 'oyster': {
        grad('#e4eef2', '#bccad2', '#8ea2ae'); // crushed ice under the shells
        x.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < (small ? 4 : 10); i++) { const cx = C(hash(vr, i, 3)), cy = C(hash(vr, i, 4)), q = P * 0.05; poly(x, [cx, cy - q, cx + q, cy, cx, cy + q, cx - q, cy]); x.fill(); }
        const cx = C(0.5 + (hash(vr, 7) - 0.5) * 0.1), cy = C(0.5);
        ellipse(x, cx, cy, P * 0.38, P * 0.3, -0.3); x.fillStyle = '#7a7a70'; x.fill(); ellipse(x, cx, cy, P * 0.32, P * 0.24, -0.3); x.fillStyle = '#e8e4dc'; x.fill();
        ellipse(x, cx + P * 0.02, cy, P * 0.2, P * 0.14, -0.3); x.fillStyle = '#c8c4b0'; x.fill(); x.strokeStyle = 'rgba(120,110,90,0.6)'; x.lineWidth = Math.max(1, P * 0.025); x.beginPath(); x.ellipse(cx + P * 0.02, cy, P * 0.2, P * 0.14, -0.3, 0, TAU); x.stroke();
        x.fillStyle = 'rgba(255,255,255,0.7)'; ellipse(x, cx - P * 0.08, cy - P * 0.06, P * 0.06, P * 0.025, -0.3); x.fill();
        if (!(mask & N) && !(mask & E)) { x.fillStyle = '#f8e040'; x.beginPath(); x.arc(r - P * 0.12, t + P * 0.12, P * 0.14, Math.PI * 0.5, Math.PI * 1.5); x.fill(); x.fillStyle = '#fff6a0'; x.beginPath(); x.arc(r - P * 0.1, t + P * 0.12, P * 0.1, Math.PI * 0.5, Math.PI * 1.5); x.fill(); }
        break;
      }
      case 'scallop': {
        grad('#fbf2dc', '#f4e4c4', '#d8c4a0');
        const cx = C(0.5), cy = C(0.5); ellipse(x, cx, cy, P * 0.36, P * 0.36); x.fillStyle = '#c88a3a'; x.fill(); ellipse(x, cx, cy, P * 0.28, P * 0.28); x.fillStyle = '#e8b060'; x.fill(); ellipse(x, cx, cy, P * 0.18, P * 0.18); x.fillStyle = '#f6dca8'; x.fill();
        x.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(x, cx - P * 0.1, cy - P * 0.1, P * 0.08, P * 0.04, -0.6); x.fill();
        x.fillStyle = '#4a8a3a'; for (let i = 0; i < (small ? 1 : 3); i++) x.fillRect(C(0.1 + hash(vr, i, 5) * 0.8), C(0.05 + hash(vr, i, 6) * 0.15), Math.max(1, P * 0.05), Math.max(1, P * 0.03)); // chive
        if (!(mask & S)) { band(b - P * 0.1, P * 0.1, 'rgba(160,110,50,0.3)'); }
        break;
      }
      case 'mussel': {
        grad('#3a4268', '#2a3050', '#161a30');
        for (let i = 0; i < 2; i++) { const cx = C(0.3 + i * 0.4), cy = C(0.5 + (i ? -0.08 : 0.08)), a = (i ? -0.5 : 0.5) + (hash(vr, i) - 0.5) * 0.4; x.save(); x.translate(cx, cy); x.rotate(a); ellipse(x, 0, 0, P * 0.18, P * 0.34); x.fillStyle = '#1e2240'; x.fill(); ellipse(x, 0, 0, P * 0.12, P * 0.26); x.fillStyle = '#f08a3a'; x.fill(); x.fillStyle = 'rgba(120,180,220,0.4)'; x.fillRect(-P * 0.17, -P * 0.3, P * 0.04, P * 0.5); x.restore(); }
        x.fillStyle = 'rgba(160,200,230,0.3)'; x.fillRect(l - 2, t - 2, r - l + 4, P * 0.05);
        if (!(mask & N)) { x.fillStyle = '#4a8a3a'; for (let i = 0; i < (small ? 1 : 3); i++) x.fillRect(C(0.2 + hash(vr, i, 8) * 0.6), t + P * 0.08, Math.max(1, P * 0.06), Math.max(1, P * 0.04)); } // parsley
        break;
      }
      case 'salmon': {
        grad('#ffaa80', '#ff8a62', '#e06a44');
        x.strokeStyle = 'rgba(255,240,230,0.75)'; x.lineWidth = Math.max(1, P * 0.05); x.beginPath(); for (let i = 0; i < 4; i++) { const o = (i / 4 + hash(vr, 9) * 0.1); if (horiz) { x.moveTo(C(o - 0.1), b + 2); x.quadraticCurveTo(C(o + 0.12), C(0.5), C(o + 0.05), t - 2); } else { x.moveTo(l - 2, C(o - 0.1)); x.quadraticCurveTo(C(0.5), C(o + 0.12), r + 2, C(o + 0.05)); } } x.stroke();
        if (!(mask & S)) { band(b - P * 0.14, P * 0.16, '#8a8478'); band(b - P * 0.14, Math.max(1, P * 0.04), '#c8c0b0'); } // crispy skin
        if (!(mask & N)) { x.fillStyle = 'rgba(80,140,60,0.9)'; for (let i = 0; i < (small ? 1 : 3); i++) { ellipse(x, C(0.2 + i * 0.3), t + P * 0.12, P * 0.06, P * 0.025, 0.4); x.fill(); } } // dill
        break;
      }
      case 'seaweed': {
        grad('#7ac85a', '#5aa04a', '#3a7a30');
        x.strokeStyle = 'rgba(160,230,120,0.7)'; x.lineWidth = Math.max(1, P * 0.07); x.lineCap = 'round'; for (let i = 0; i < (small ? 2 : 4); i++) { const y0 = C(0.15 + i * 0.24); x.beginPath(); x.moveTo(l - 2, y0); for (let k = 1; k <= 4; k++) x.quadraticCurveTo(lerp(l, r, (k - 0.5) / 4), y0 + (k % 2 ? -1 : 1) * P * 0.08, lerp(l, r, k / 4), y0); x.stroke(); }
        x.strokeStyle = 'rgba(30,80,20,0.5)'; x.lineWidth = Math.max(1, P * 0.03); for (let i = 0; i < 3; i++) { const y0 = C(0.27 + i * 0.24); x.beginPath(); x.moveTo(l - 2, y0); x.lineTo(r + 2, y0 + P * 0.02); x.stroke(); } x.lineCap = 'butt';
        x.fillStyle = '#fff4dc'; for (let i = 0; i < (small ? 3 : 8); i++) { ellipse(x, C(0.1 + hash(vr, i, 10) * 0.8), C(0.1 + hash(vr, i, 11) * 0.8), Math.max(0.8, P * 0.03), Math.max(0.5, P * 0.017), hash(i, vr) * 3); x.fill(); }
        if (!(mask & N)) { x.fillStyle = '#e8402a'; x.beginPath(); x.arc(C(0.7), t + P * 0.14, P * 0.05, 0, TAU); x.fill(); } // chili
        break;
      }
      case 'octopus': {
        grad('#c8789a', '#b0607a', '#8a4058');
        const sx = horiz ? 1 : 0; x.fillStyle = '#f2d8d8';
        for (let i = 0; i < 3; i++) { const u = (i + 0.5) / 3; const cx = sx ? C(u) : C(0.72), cy = sx ? C(0.74) : C(u); ellipse(x, cx, cy, P * 0.09, P * 0.09); x.fill(); x.fillStyle = '#d8a0aa'; ellipse(x, cx, cy, P * 0.045, P * 0.045); x.fill(); x.fillStyle = '#f2d8d8'; }
        x.fillStyle = 'rgba(255,220,230,0.35)'; if (sx) x.fillRect(l - 2, C(0.15), r - l + 4, P * 0.1); else x.fillRect(C(0.15), t - 2, P * 0.1, b - t + 4);
        x.fillStyle = 'rgba(60,20,30,0.45)'; for (let i = 0; i < (small ? 2 : 4); i++) { ellipse(x, C(0.1 + hash(vr, i, 12) * 0.5), C(0.1 + hash(vr, i, 13) * 0.5), P * 0.05, P * 0.025, hash(i, vr) * 3); x.fill(); } // char marks
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
(() => { const st = STAGES.find((s) => s.id === 'fishhouse'); if (st) { st.palette = SeafoodFood.MAIN.slice(1); st.desc = 'Flat geometric harbour dining room: an oyster bar on crushed ice, a waiter lifting cloches and pouring wine, candles lit at dusk and a lighthouse sweeping the night — string quartet & piano.'; } })();
