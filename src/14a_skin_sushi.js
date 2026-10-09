const SKINSETS = {}; // themed skin sets: { base(ctx, type, px, col), live?(ctx, type, s, T, st), key?() -> cache variant }
/* ---- Kaiten Sushi blocks: every piece is MADE of food (see SushiFood below). Shared SkinKit helpers are used by the other worlds. ---- */
const SkinKit = (() => { // shared by every world's skin set
  function tile(x, P, c0, c1, r = 0.16) { roundRect(x, 0.5, 0.5, P - 1, P - 1, P * r); x.fillStyle = linear(x, 0, 0, P, P, [[0, c0], [1, c1]]); x.fill(); }
  function grains(x, rnd, x0, y0, w, h, n, P, col = '#fbf8f0') {
    for (let i = 0; i < n; i++) {
      const gx = x0 + rnd() * w, gy = y0 + rnd() * h, a = rnd() * Math.PI;
      ellipse(x, gx + P * 0.006, gy + P * 0.01, P * 0.034, P * 0.02, a); x.fillStyle = 'rgba(120,110,90,0.35)'; x.fill();
      ellipse(x, gx, gy, P * 0.034, P * 0.02, a); x.fillStyle = col; x.fill();
      ellipse(x, gx - P * 0.008, gy - P * 0.006, P * 0.014, P * 0.007, a); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fill();
    }
  }
  function gloss(x, P, a = 0.35) {
    x.save(); x.globalCompositeOperation = 'lighter';
    x.fillStyle = linear(x, 0, 0, 0, P * 0.45, [[0, `rgba(255,255,255,${a})`], [1, 'rgba(255,255,255,0)']]);
    roundRect(x, P * 0.16, P * 0.1, P * 0.62, P * 0.2, P * 0.1); x.fill(); x.restore();
  }
  function glintSprite(P, col = '255,255,255') {
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d');
    x.fillStyle = radial(x, P / 2, P / 2, P / 2, [[0, `rgba(${col},0.9)`], [0.25, `rgba(${col},0.35)`], [1, `rgba(${col},0)`]]);
    x.translate(P / 2, P / 2); x.scale(1, 0.4); x.translate(-P / 2, -P / 2); x.fillRect(0, 0, P, P);
    return c;
  }
  return { tile, grains, gloss, glintSprite };
})();
/* ================= SushiFood — tetrominoes made of food =================
   I ikura · O tamago · T salmon nigiri · S maguro · Z edamame · J saba · L avocado maki.
   Food fills cells edge to edge; cells of the same piece join into one continuous mass (per-cell connectivity
   masks from the game's piece-id grid), different pieces are separated by a soft dark gap. Bases are pre-rendered
   per size / mask; ikura beads and edamame pods are drawn live so they can jiggle individually. */
const SushiFood = (() => {
  const N = 1, E = 2, S = 4, W = 8;
  const hash = (a, b = 0, c = 0) => { const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return v - Math.floor(v); };
  const poly = (x, pts) => { x.beginPath(); x.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) x.lineTo(pts[i], pts[i + 1]); x.closePath(); };
  let sprites = null;
  const BEADS = [[0.26, 0.26], [0.74, 0.24], [0.5, 0.52], [0.24, 0.77], [0.76, 0.76]];
  function beadsFor(mask, key) {
    const g = 0.06, r = 0.235, lo = (b) => (mask & b ? -0.02 : g + r * 0.92), out = [];
    for (let i = 0; i < BEADS.length; i++) {
      const [bx, by] = BEADS[i], jx = (hash(key, i) - 0.5) * 0.06, jy = (hash(i, key) - 0.5) * 0.06;
      out.push([clamp(bx + jx, lo(W), 1 - lo(E)), clamp(by + jy, lo(N), 1 - lo(S)), i]);
    }
    return out;
  }
  function podsFor(mask, key) {
    const v = hash(key, 7) < 0.5, a0 = (hash(key, 3) - 0.5) * 0.5;
    if (v) return [[0.5, 0.3, 0.18 + a0], [0.5, 0.72, -0.2 - a0 * 0.5]];
    return [[0.3, 0.5, Math.PI / 2 + 0.2 + a0], [0.72, 0.5, Math.PI / 2 - 0.25 - a0 * 0.4]];
  }
  function grains(x, l, t, r, b, P, key, n) { for (let i = 0; i < n; i++) { const gx = l + hash(key, i, 1) * (r - l), gy = t + hash(key, i, 2) * (b - t); ellipse(x, gx, gy, P * 0.045, P * 0.024, hash(key, i, 3) * 3); x.fillStyle = i % 3 ? '#fffaf0' : '#ddd2bd'; x.fill(); } }
  const M = FoodMass({
    FOOD: [null, 'ikura', 'tamago', 'salmon', 'maguro', 'edamame', 'saba', 'maki'],
    MAIN: [null, '#f0561e', '#f5c842', '#f7905a', '#c8203a', '#7cc254', '#8fa8c4', '#eae4d4'],
    soft: { tamago: 1.6, ikura: 1.2, maki: 0.8 },
    glisten: { salmon: 0.55, maguro: 0.55, saba: 0.55, tamago: 0.3 },
    vkey: (food, vr) => (food === 'tamago' ? vr & 1 : vr % 4),
    vpaint: (food, vk) => (food === 'tamago' ? vk : vk * 13 + 1),
    sprites(P) { const o = {};
    { // ikura bead: translucent orange sphere with a hot core and a specular dot
      const r = Math.max(2, P * 0.25), n = Math.ceil(r * 2 + 2), [c, x] = [makeCanvas(n, n), null]; const X = c.getContext('2d'), m = n / 2;
      X.beginPath(); X.arc(m, m, r, 0, TAU); X.fillStyle = '#c8320e'; X.fill();
      X.beginPath(); X.arc(m - r * 0.08, m - r * 0.06, r * 0.82, 0, TAU); X.fillStyle = '#f0561e'; X.fill();
      X.beginPath(); X.arc(m + r * 0.12, m + r * 0.16, r * 0.42, 0, TAU); X.fillStyle = '#ff8a3a'; X.fill(); // glowing yolk
      X.beginPath(); X.arc(m + r * 0.15, m + r * 0.2, r * 0.18, 0, TAU); X.fillStyle = '#ffb060'; X.fill();
      X.beginPath(); X.arc(m - r * 0.36, m - r * 0.38, r * 0.2, 0, TAU); X.fillStyle = 'rgba(255,250,235,0.95)'; X.fill();
      X.beginPath(); X.arc(m + r * 0.42, m - r * 0.1, r * 0.08, 0, TAU); X.fillStyle = 'rgba(255,240,220,0.6)'; X.fill();
      o.bead = c; o.beadR = r; void x;
    }
    { // edamame pod (horizontal): bright green capsule with three bean bumps, highlight and salt flakes
      const L = P * 0.86, Hh = P * 0.36, w = Math.ceil(L + 4), h = Math.ceil(Hh + 4), c = makeCanvas(w, h), X = c.getContext('2d'), cy = h / 2, x0 = (w - L) / 2;
      const capsule = (ins, col) => { roundRect(X, x0 + ins, cy - Hh / 2 + ins, L - 2 * ins, Hh - 2 * ins, (Hh - 2 * ins) / 2); X.fillStyle = col; X.fill(); };
      capsule(0, '#3f8a24'); capsule(Math.max(0.6, P * 0.025), '#7cc254');
      for (let i = 0; i < 3; i++) { const bx = x0 + L * (0.22 + i * 0.28); X.beginPath(); X.arc(bx, cy + Hh * 0.04, Hh * 0.36, 0, TAU); X.fillStyle = '#93d466'; X.fill(); X.beginPath(); X.arc(bx + Hh * 0.08, cy + Hh * 0.12, Hh * 0.26, 0, TAU); X.fillStyle = 'rgba(40,100,20,0.18)'; X.fill(); }
      X.fillStyle = 'rgba(235,255,210,0.7)'; roundRect(X, x0 + L * 0.14, cy - Hh * 0.34, L * 0.6, Math.max(1, Hh * 0.12), Hh * 0.06); X.fill();
      X.fillStyle = '#2f6a1a'; poly(X, [x0 + L - Hh * 0.1, cy - Hh * 0.08, x0 + L + 1.8, cy - Hh * 0.2, x0 + L + 1.5, cy + Hh * 0.05]); X.fill();
      X.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) { const sx = x0 + L * (0.15 + hash(i, P) * 0.7), sy = cy - Hh * 0.3 + hash(P, i) * Hh * 0.55, z = Math.max(0.8, P * 0.022); X.fillRect(sx, sy, z, z); }
      o.pod = c;
    }
      return o; },
    paint(x, food, Q) {
      const { P, mask, cut, vr, small, l, t, r, b, C, band, rrect, radii } = Q;
      switch (food) {
      case 'ikura': {
        x.fillStyle = '#9a2408'; x.fillRect(l, t, r - l, b - t); // deep roe bed between beads
        if (!(mask & S)) band(b - P * 0.13, P * 0.13, '#1b2a1e'); // thin nori base
        if (small) { const o = sprites(P), d = o.beadR; for (const [bx, by] of beadsFor(mask, vr)) x.drawImage(o.bead, C(bx) - d - 1, C(by) - d - 1); }
        break;
      }
      case 'edamame': {
        x.fillStyle = '#2c5a1a'; x.fillRect(l, t, r - l, b - t);
        x.fillStyle = '#3e7a24'; for (let i = 0; i < 4; i++) { ellipse(x, C(hash(vr, i, 4)), C(hash(i, vr, 5)), P * 0.2, P * 0.1, hash(vr, i) * 3); x.fill(); }
        if (small) { const o = sprites(P); for (const [px, py, a] of podsFor(mask, vr)) { x.save(); x.translate(C(px), C(py)); x.rotate(a); x.drawImage(o.pod, -o.pod.width / 2, -o.pod.height / 2); x.restore(); } }
        break;
      }
      case 'tamago': {
        x.fillStyle = '#f5c842'; x.fillRect(l, t, r - l, b - t);
        for (let i = 1; i < 5; i++) band(C(i * 0.2) - P * 0.012, Math.max(1, P * 0.028), i % 2 ? '#e3a52c' : '#eab53a'); // folded layers
        x.fillStyle = 'rgba(255,236,150,0.55)'; for (let i = 0; i < 5; i++) x.fillRect(C(hash(vr, i) * 0.8), C(0.1 + i * 0.2), P * 0.18, Math.max(1, P * 0.02));
        if (!(mask & N)) { band(t, P * 0.07, '#c97f1e'); band(t + P * 0.07, P * 0.05, '#ffe07a'); }
        if (!(mask & S)) band(b - P * 0.1, P * 0.1, '#d9962a');
        const bx = vr ? C(0) : C(1), bw = P * 0.17; // nori belt straddles the piece's middle seam
        x.fillStyle = '#1d2a22'; x.fillRect(bx - bw, t - 2, bw * 2, b - t + 4); x.fillStyle = '#2c4632'; x.fillRect(bx - bw * 0.2, t - 2, bw * 0.5, b - t + 4);
        x.fillStyle = 'rgba(160,200,160,0.18)'; for (let i = 0; i < 4; i++) x.fillRect(bx - bw, C(0.12 + i * 0.25), bw * 2, Math.max(1, P * 0.015));
        break;
      }
      case 'salmon': {
        x.fillStyle = '#f4ede0'; x.fillRect(l, t, r - l, b - t); grains(x, l, t, r, b, P, vr, small ? 3 : 9); // rice
        const fl = mask & W ? l : l + P * 0.07, fr = mask & E ? r : r - P * 0.07, ft = t, fb = mask & S ? b : b - P * 0.22;
        const frd = radii(mask, cut, P * 0.34); frd[0] = frd[0] && P * 0.22; frd[1] = frd[1] && P * 0.22;
        if (!(mask & S)) { rrect(x, fl, ft + P * 0.04, fr, fb + P * 0.05, frd); x.fillStyle = 'rgba(120,70,40,0.28)'; x.fill(); }
        rrect(x, fl, ft, fr, fb, frd); x.save(); x.clip();
        x.fillStyle = '#f7864a'; x.fillRect(fl, ft, fr - fl, fb - ft);
        const sw = Math.max(1, P * 0.05); // white fat stripes, continuous across cells (period 1/3, shift 2/3 per row)
        for (let k = -2; k < 7; k++) { const x0 = C(k / 3 + 0.1); x.fillStyle = '#fdf0e2'; poly(x, [x0, C(-0.1), x0 + sw, C(-0.1), x0 + sw - P * 0.8, C(1.1), x0 - P * 0.8, C(1.1)]); x.fill();
          x.fillStyle = 'rgba(255,190,150,0.6)'; poly(x, [x0 + sw, C(-0.1), x0 + sw * 1.6, C(-0.1), x0 + sw * 1.6 - P * 0.8, C(1.1), x0 + sw - P * 0.8, C(1.1)]); x.fill(); }
        if (!(mask & S)) { x.fillStyle = '#e0642c'; x.fillRect(fl, fb - P * 0.09, fr - fl, P * 0.09); }
        if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.3)'; poly(x, [C(0.12), ft + P * 0.07, C(0.62), ft + P * 0.07, C(0.54), ft + P * 0.13, C(0.1), ft + P * 0.13]); x.fill(); }
        x.restore(); break;
      }
      case 'maguro': {
        x.fillStyle = '#c41d36'; x.fillRect(l, t, r - l, b - t);
        for (let k = -2; k < 4; k++) { // overlapping sashimi slices (edges continue across cells)
          const x0 = C(k * 0.5 + 0.3); x.fillStyle = '#8c1024'; poly(x, [x0, C(-0.1), x0 + P * 0.035, C(-0.1), x0 + P * 0.035 - P * 0.3, C(1.1), x0 - P * 0.3, C(1.1)]); x.fill();
          x.fillStyle = '#e0405a'; poly(x, [x0 + P * 0.035, C(-0.1), x0 + P * 0.1, C(-0.1), x0 + P * 0.1 - P * 0.3, C(1.1), x0 + P * 0.035 - P * 0.3, C(1.1)]); x.fill();
        }
        if (!small) { x.strokeStyle = 'rgba(255,170,185,0.28)'; x.lineWidth = Math.max(0.8, P * 0.018); for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(C(0.2 + i * 0.3), C(1.1), P * (0.5 + hash(vr, i) * 0.2), Math.PI * 1.15, Math.PI * 1.55); x.stroke(); } }
        if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.26)'; poly(x, [C(0.1), t + P * 0.08, C(0.6), t + P * 0.08, C(0.5), t + P * 0.15, C(0.08), t + P * 0.15]); x.fill(); }
        if (!(mask & S)) band(b - P * 0.1, P * 0.1, '#8a1426');
        break;
      }
      case 'saba': {
        x.fillStyle = '#e4eaf0'; x.fillRect(l, t, r - l, b - t); // silver belly
        x.fillStyle = '#5b7a9a'; x.fillRect(l, t, r - l, C(0.56) - t); // blue back
        x.fillStyle = '#9fb6cc'; x.fillRect(l, C(0.5), r - l, P * 0.1);
        x.fillStyle = 'rgba(230,170,200,0.35)'; x.fillRect(l, C(0.62), r - l, P * 0.05); // iridescent line
        x.fillStyle = '#1f3550'; for (let k = 0; k < 3; k++) { const x0 = C(k / 3 + 0.04); poly(x, [x0, C(0.06), x0 + P * 0.09, C(0.06), x0 + P * 0.17, C(0.26), x0 + P * 0.1, C(0.46), x0 + P * 0.04, C(0.46), x0 + P * 0.1, C(0.26)]); x.fill(); }
        if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.3)'; poly(x, [C(0.08), t + P * 0.07, C(0.55), t + P * 0.07, C(0.47), t + P * 0.13, C(0.06), t + P * 0.13]); x.fill(); }
        if (!(mask & S)) band(b - P * 0.09, P * 0.09, '#a8b8c8');
        if (!(mask & E)) { x.fillStyle = 'rgba(20,40,70,0.15)'; x.fillRect(r - P * 0.08, t, P * 0.08, b - t); }
        break;
      }
      case 'maki': {
        x.fillStyle = '#121c15'; x.fillRect(l, t, r - l, b - t);
        const cx = C(0.5), cy = C(0.5);
        x.beginPath(); x.arc(cx, cy, P * 0.45, 0, TAU); x.fillStyle = '#1e2c22'; x.fill(); // nori ring
        x.beginPath(); x.arc(cx + P * 0.03, cy - P * 0.03, P * 0.43, -2.4, -0.6); x.strokeStyle = '#3a5040'; x.lineWidth = Math.max(1, P * 0.03); x.stroke();
        x.beginPath(); x.arc(cx, cy, P * 0.36, 0, TAU); x.fillStyle = '#f4ede0'; x.fill();
        x.save(); x.beginPath(); x.arc(cx, cy, P * 0.36, 0, TAU); x.clip(); x.fillStyle = '#e2d8c4'; x.fillRect(cx - P, cy + P * 0.12, 2 * P, P); grains(x, cx - P * 0.34, cy - P * 0.34, cx + P * 0.34, cy + P * 0.34, P, vr + 5, small ? 2 : 8); x.restore();
        x.beginPath(); x.moveTo(cx - P * 0.17, cy + P * 0.11); x.quadraticCurveTo(cx - P * 0.12, cy - P * 0.2, cx + P * 0.06, cy - P * 0.17); x.quadraticCurveTo(cx + P * 0.22, cy - P * 0.02, cx + P * 0.15, cy + P * 0.13); x.closePath(); x.fillStyle = '#5c8f24'; x.fill();
        x.beginPath(); x.moveTo(cx - P * 0.11, cy + P * 0.07); x.quadraticCurveTo(cx - P * 0.07, cy - P * 0.13, cx + P * 0.05, cy - P * 0.11); x.quadraticCurveTo(cx + P * 0.14, cy - P * 0.01, cx + P * 0.1, cy + P * 0.08); x.closePath(); x.fillStyle = '#b5dc5a'; x.fill();
        if (!small) { x.fillStyle = '#e8d890'; for (let i = 0; i < 4; i++) { ellipse(x, C(0.25 + hash(vr, i) * 0.5), C(0.25 + hash(i, vr) * 0.5), P * 0.022, P * 0.012, i); x.fill(); } }
        break;
      }
      }
    },
    live(c, food, o) {
      if (o.small) return; const { s, k, mask, vr, seed, T, wob } = o;
      if (food === 'ikura') {
        const sp = o.spr, bs = sp.bead.width * k;
        for (const [bx, by, i] of beadsFor(mask, (vr % 4) * 13 + 1)) {
          const ph = seed * 1.3 + i * 2.1, j = 0.022 + wob * 0.05;
          const dx = Math.sin(T * 4.1 + ph) * j * s + Math.sin(T * 1.3 + ph * 2) * 0.012 * s, dy = Math.cos(T * 5.2 + ph * 1.4) * j * s * 0.8;
          c.drawImage(sp.bead, (bx - 0.5) * s + dx - bs / 2, (by - 0.5) * s + dy - bs / 2, bs, bs);
        }
        const tw = (T * 0.9 + seed * 0.37) % 3; if (tw < 0.4) { const a = Math.sin(tw / 0.4 * Math.PI); c.fillStyle = `rgba(255,252,240,${a * 0.9})`; c.beginPath(); c.arc(-s * 0.3, -s * 0.31, s * 0.035, 0, TAU); c.fill(); }
      } else if (food === 'edamame') {
        const sp = o.spr, pw = sp.pod.width * k, ph0 = sp.pod.height * k;
        for (const [px, py, a] of podsFor(mask, (vr % 4) * 13 + 1)) {
          const ph = seed * 0.9 + px * 5 + py * 3, sh = 0.015 + wob * 0.04;
          c.save(); c.translate((px - 0.5) * s + Math.sin(T * 1.7 + ph) * sh * s, (py - 0.5) * s + Math.cos(T * 2.1 + ph) * sh * s * 0.6); c.rotate(a + Math.sin(T * 1.3 + ph) * (0.04 + wob * 0.15));
          c.drawImage(sp.pod, -pw / 2, -ph0 / 2, pw, ph0); c.restore();
        }
      }
    },
    clear(food, q) {
      const { v, X, Y, s, dir, r, vr, push } = q;
      if (food === 'ikura') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 }); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.6; push({ k: 'spr', img: 'bead', x: X + (BEADS[i][0] - 0.5) * s, y: Y + (BEADS[i][1] - 0.5) * s, vx: Math.cos(a) * s * (2 + r(i + 9) * 4), vy: Math.sin(a) * s * (3 + r(i + 5) * 4), life: 0.8 + r(i + 3) * 0.4 }); } return true; }
      if (food === 'edamame') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.2 }); for (let i = 0; i < 2; i++) push({ k: 'spr', img: 'pod', x: X, y: Y + (i - 0.5) * s * 0.4, vx: (r(i) - 0.5) * s * 6, vy: -s * (3 + r(i + 4) * 3), rot: r(i + 2) * 3, vr: (r(i + 7) - 0.5) * 14, life: 0.9 }); for (let i = 0; i < 3; i++) push({ k: 'dot', col: '#93d466', r: 0.1, x: X, y: Y, vx: (r(i + 11) - 0.5) * s * 7, vy: -s * (2 + r(i + 13) * 4), life: 0.7 }); return true; }
      if (food === 'maki') { push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (3 + r(1) * 2), vy: -s * 1.5, rot: 0, life: 0.9, vrr: vr }); return true; }
      if (food === 'tamago') { push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45 }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: '#f5c842', x: X, y: Y, vx: (r(i) - 0.5) * s * 6, vy: -s * (2 + r(i + 3) * 3), life: 0.6 }); return true; }
      return false;
    },
  });
  sprites = M.sprites;
  return M;
})();
SKINSETS.sushi = SushiFood.skin();
