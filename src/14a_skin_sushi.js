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
  const FOOD = [null, 'ikura', 'tamago', 'salmon', 'maguro', 'edamame', 'saba', 'maki'];
  const MAIN = [null, '#f0561e', '#f5c842', '#f7905a', '#c8203a', '#7cc254', '#8fa8c4', '#eae4d4'];
  const LIVE = { ikura: 1, edamame: 1 };
  const hash = (a, b = 0, c = 0) => { const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return v - Math.floor(v); };
  /* ---------- geometry ---------- */
  function massBox(P, pad, mask, g) { // [l, t, r, b] of the food mass inside a padded canvas; joined sides overlap the neighbour by a hair
    const ov = Math.max(1, Math.round(P * 0.025));
    return [mask & W ? pad - ov : pad + g, mask & N ? pad - ov : pad + g, mask & E ? pad + P + ov : pad + P - g, mask & S ? pad + P + ov : pad + P - g];
  }
  function radii(mask, cut, R) { // tl, tr, br, bl: rounded only on convex corners that weren't cut
    const ex = (b) => !(mask & b), rc = (a, b) => (ex(a) && ex(b) && !(cut & a) && !(cut & b) ? R : 0);
    return [rc(N, W), rc(N, E), rc(S, E), rc(S, W)];
  }
  function rrect(x, l, t, r, b, rd) {
    const [a, bb, c, d] = rd; x.beginPath(); x.moveTo(l + a, t); x.lineTo(r - bb, t); bb ? x.arcTo(r, t, r, t + bb, bb) : x.lineTo(r, t);
    x.lineTo(r, b - c); c ? x.arcTo(r, b, r - c, b, c) : x.lineTo(r, b); x.lineTo(l + d, b); d ? x.arcTo(l, b, l, b - d, d) : x.lineTo(l, b);
    x.lineTo(l, t + a); a ? x.arcTo(l, t, l + a, t, a) : x.lineTo(l, t); x.closePath();
  }
  const poly = (x, pts) => { x.beginPath(); x.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) x.lineTo(pts[i], pts[i + 1]); x.closePath(); };
  /* ---------- sprites (per pixel size) ---------- */
  const spr = new Map();
  function sprites(P) {
    let o = spr.get(P); if (o) return o; o = {};
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
    { // travelling glisten
      const n = Math.ceil(P * 1.2), c = makeCanvas(n, n), X = c.getContext('2d');
      X.fillStyle = radial(X, n / 2, n / 2, n / 2, [[0, 'rgba(255,255,255,0.85)'], [0.3, 'rgba(255,255,255,0.3)'], [1, 'rgba(255,255,255,0)']]);
      X.translate(n / 2, n / 2); X.scale(1, 0.35); X.translate(-n / 2, -n / 2); X.fillRect(0, 0, n, n); o.glint = c;
    }
    spr.set(P, o); return o;
  }
  /* bead / pod layout for one cell (cell-local 0..1, clamped inside the mass) */
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
  /* ---------- per-food base painting (into a padded canvas, cell at [pad, pad+P]) ---------- */
  function grains(x, l, t, r, b, P, key, n) { for (let i = 0; i < n; i++) { const gx = l + hash(key, i, 1) * (r - l), gy = t + hash(key, i, 2) * (b - t); ellipse(x, gx, gy, P * 0.045, P * 0.024, hash(key, i, 3) * 3); x.fillStyle = i % 3 ? '#fffaf0' : '#ddd2bd'; x.fill(); } }
  function paint(x, v, P, pad, mask, cut, vr, small) {
    const food = FOOD[v], g = Math.max(1, Math.round(P * 0.055)), R = P * 0.3;
    const [l, t, r, b] = massBox(P, pad, mask, g), rd = radii(mask, cut, R), C = (u) => pad + u * P; // cell-local -> canvas
    // soft contact shadow below exposed bottoms (the gap between different pieces stays dark & readable)
    if (!(mask & S)) { rrect(x, l + 1, t + P * 0.05, r - 1, b + P * 0.05, rd); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fill(); }
    rrect(x, l, t, r, b, rd); x.save(); x.clip();
    const band = (y0, h, col) => { x.fillStyle = col; x.fillRect(l - 2, y0, r - l + 4, h); };
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
    // cut faces (a line clear sliced through the piece): straight edge with a paler cross-section line
    if (cut) { x.fillStyle = 'rgba(255,240,225,0.35)'; const k = Math.max(1, P * 0.035); if (cut & N) x.fillRect(l, t, r - l, k); if (cut & S) x.fillRect(l, b - k, r - l, k); }
    // flat light / shade planes (light from the upper left, like the scene)
    if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.1)'; x.fillRect(l, t, P * 0.06, b - t); }
    if (!(mask & E)) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(r - P * 0.06, t, P * 0.06, b - t); }
    x.restore();
  }
  /* ---------- caches ---------- */
  const caches = new Map(); // P -> Map(key -> canvas)
  function pre(v, P, mask, cut, vr, small) {
    let m = caches.get(P); if (!m) { if (caches.size > 8) caches.delete(caches.keys().next().value); m = new Map(); caches.set(P, m); }
    const vk = FOOD[v] === 'tamago' ? vr & 1 : (vr % 4), key = v + ':' + mask + ':' + cut + ':' + vk + (small ? 's' : '');
    let c = m.get(key); if (c) return c;
    const pad = Math.max(2, Math.ceil(P * 0.08)); c = makeCanvas(P + 2 * pad, P + 2 * pad); c.pad = pad;
    paint(c.getContext('2d'), v, P, pad, mask, cut, FOOD[v] === 'tamago' ? vk : vk * 13 + 1, !!small); m.set(key, c); return c;
  }
  const isSmall = (s) => s < 18;
  /* draw one cell: centre (0,0) in the current transform, s = css cell size */
  function cell(c, v, s, d, mask, cut, vr, seed, T, wob, alpha) {
    const P = Math.max(4, Math.round(s * d)), cv = pre(v, P, mask, cut, vr, isSmall(s)), k = s / P, pad = cv.pad * k;
    c.drawImage(cv, -s / 2 - pad, -s / 2 - pad, s + 2 * pad, s + 2 * pad);
    if (isSmall(s)) return;
    const food = FOOD[v];
    if (food === 'ikura') {
      const o = sprites(P), rr = o.beadR * k, bs = (o.bead.width) * k;
      for (const [bx, by, i] of beadsFor(mask, (vr % 4) * 13 + 1)) { // each bead jiggles & rolls on its own
        const ph = seed * 1.3 + i * 2.1, j = 0.022 + wob * 0.05;
        const dx = Math.sin(T * 4.1 + ph) * j * s + Math.sin(T * 1.3 + ph * 2) * 0.012 * s, dy = Math.cos(T * 5.2 + ph * 1.4) * j * s * 0.8;
        c.drawImage(o.bead, (bx - 0.5) * s + dx - bs / 2, (by - 0.5) * s + dy - bs / 2, bs, bs);
      }
      void rr;
      const tw = (T * 0.9 + seed * 0.37) % 3; if (tw < 0.4) { const a = Math.sin(tw / 0.4 * Math.PI); c.fillStyle = `rgba(255,252,240,${a * 0.9})`; c.beginPath(); c.arc(-s * 0.3, -s * 0.31, s * 0.035, 0, TAU); c.fill(); }
    } else if (food === 'edamame') {
      const o = sprites(P), pw = o.pod.width * k, ph0 = o.pod.height * k;
      for (const [px, py, a] of podsFor(mask, (vr % 4) * 13 + 1)) {
        const ph = seed * 0.9 + px * 5 + py * 3, sh = 0.015 + wob * 0.04;
        c.save(); c.translate((px - 0.5) * s + Math.sin(T * 1.7 + ph) * sh * s, (py - 0.5) * s + Math.cos(T * 2.1 + ph) * sh * s * 0.6); c.rotate(a + Math.sin(T * 1.3 + ph) * (0.04 + wob * 0.15));
        c.drawImage(o.pod, -pw / 2, -ph0 / 2, pw, ph0); c.restore();
      }
    } else if (food === 'salmon' || food === 'maguro' || food === 'saba' || food === 'tamago') { // glisten sweeping across the fish
      const ph = (T * 0.3 + seed * 0.137) % 2.4;
      if (ph < 1) { const g = sprites(P).glint, a = Math.sin(ph * Math.PI); c.globalAlpha = (alpha ?? 1) * a * (food === 'tamago' ? 0.3 : 0.55); c.globalCompositeOperation = 'lighter'; c.drawImage(g, (ph - 0.5) * s * 0.7 - s * 0.36, -s * 0.42 + ph * s * 0.15, s * 0.72, s * 0.72); c.globalCompositeOperation = 'source-over'; c.globalAlpha = alpha ?? 1; }
    }
  }
  /* connectivity of a set of cells [[x,y],...] */
  function maskIn(cells, x, y) { const has = (a, b) => cells.some(([p, q]) => p === a && q === b); return (has(x, y - 1) ? N : 0) | (has(x + 1, y) ? E : 0) | (has(x, y + 1) ? S : 0) | (has(x - 1, y) ? W : 0); }
  /* faint outline of the piece silhouette in the food colour */
  function ghost(c, cells, ox, oy, s, col) {
    const g = s * 0.08, R = s * 0.26; c.lineWidth = Math.max(1.5, s * 0.07); c.strokeStyle = rgba(col, 0.7); c.fillStyle = rgba(col, 0.08); c.lineCap = 'round';
    for (const [x, y] of cells) {
      const m = maskIn(cells, x, y), X = ox + x * s, Y = oy + y * s, [l, t, r, b] = [m & W ? X : X + g, m & N ? Y : Y + g, m & E ? X + s : X + s - g, m & S ? Y + s : Y + s - g], rd = radii(m, 0, R);
      rrect(c, l, t, r, b, rd); c.fill();
      c.beginPath();
      if (!(m & N)) { c.moveTo(l + rd[0], t); c.lineTo(r - rd[1], t); }
      if (!(m & E)) { c.moveTo(r, t + rd[1]); c.lineTo(r, b - rd[2]); }
      if (!(m & S)) { c.moveTo(r - rd[2], b); c.lineTo(l + rd[3], b); }
      if (!(m & W)) { c.moveTo(l, b - rd[3]); c.lineTo(l, t + rd[0]); }
      if (rd[0]) { c.moveTo(l, t + rd[0]); c.arcTo(l, t, l + rd[0], t, rd[0]); } if (rd[1]) { c.moveTo(r - rd[1], t); c.arcTo(r, t, r, t + rd[1], rd[1]); }
      if (rd[2]) { c.moveTo(r, b - rd[2]); c.arcTo(r, b, r - rd[2], b, rd[2]); } if (rd[3]) { c.moveTo(l + rd[3], b); c.arcTo(l, b, l, b - rd[3], rd[3]); }
      c.stroke();
    }
  }
  /* landing squash & idle breathing of a whole locked piece (one affine per piece keeps the mass seamless) */
  const now = () => performance.now() / 1000;
  function pieceWobble(v, m, T) {
    const food = FOOD[v], soft = food === 'tamago' ? 1.6 : food === 'ikura' ? 1.2 : food === 'maki' ? 0.8 : 1;
    const a = m ? now() - m.born : 9; let sq = 0;
    if (a < 1.4) sq = Math.exp(-a * (food === 'tamago' ? 4.2 : 5.5)) * Math.cos(a * (food === 'tamago' ? 15 : 20)) * 0.13 * soft;
    const idle = Math.sin(T * 2.1 + (m ? m.pid : 0) * 1.7) * 0.006 * soft;
    return { sx: 1 + sq * 0.7 - idle * 0.5, sy: 1 - sq + idle, wob: Math.abs(sq) * 4 };
  }
  /* ---------- whole board ---------- */
  const ripC = new Map();
  function board(c, g, s, d, T, st, FXm) {
    const clearing = g.state === 'clearing', ct = clearing ? g.clearT / CLEAR_TIME : 0, over = g.state === 'over', M = g.meta;
    ripC.clear();
    if (clearing && g.clearRows !== lastRows) { lastRows = g.clearRows; spawnClear(g, s, d, T); }
    const pidAt = (x, y) => (M && M[y] && M[y][x] ? M[y][x].pid : -(y * 100 + x + 1));
    for (let y = 0; y < ROWS; y++) {
      const isClr = clearing && g.clearRows.includes(y);
      for (let x = 0; x < COLS; x++) {
        const v = g.board[y][x]; if (!v) continue;
        const m = M && M[y] ? M[y][x] : null, pid = pidAt(x, y);
        const mask = (y > 0 && g.board[y - 1][x] && pidAt(x, y - 1) === pid ? N : 0) | (x < COLS - 1 && g.board[y][x + 1] && pidAt(x + 1, y) === pid ? E : 0) | (y < ROWS - 1 && g.board[y + 1][x] && pidAt(x, y + 1) === pid ? S : 0) | (x > 0 && g.board[y][x - 1] && pidAt(x - 1, y) === pid ? W : 0);
        let w = m ? ripC.get(m.pid) : null; if (!w) { const o = FXm.cell(m ? m.pcx - 0.5 : x, m ? m.pby - 1 : y); w = { k: o.k, dy: o.dy, sx: o.sx, sy: o.sy }; if (m) ripC.set(m.pid, w); } // one ripple sample per piece keeps it seamless
        const pw = pieceWobble(v, m, T);
        let cx = x * s + s / 2, cy = y * s + s / 2 + w.dy * s, sx = pw.sx * (1 + (w.sx - 1) * 0.6), sy = pw.sy * (1 + (w.sy - 1) * 0.6), rot = 0, al = over ? 0.45 : 1;
        if (m) { cx += (x + 0.5 - m.pcx) * s * (sx - 1); cy += (y + 0.5 - m.pby) * s * (sy - 1); } // squash about the piece's base
        if (isClr) { const k = clamp(ct / 0.25, 0, 1); if (k >= 1) continue; c.save(); c.translate(cx, cy); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.6 * (1 - k); c.fillStyle = '#fff4dc'; roundRect(c, -s / 2, -s / 2, s, s, s * 0.25); c.fill(); c.restore(); continue; } // the food itself left as particles
        c.save(); c.translate(cx, cy); if (rot) c.rotate(rot); c.scale(sx, sy); c.globalAlpha = al;
        cell(c, v, s, d, mask, m ? m.cut || 0 : 0, m ? m.lx & 3 : x & 1, m ? m.pid * 3.7 + x + y * 2 : x * 1.7 + y * 3.1, T, pw.wob + Math.abs(w.k) * 0.5, al);
        c.restore();
      }
      if (isClr) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = rgba(st.accent, 0.35 * (1 - ct)); c.fillRect(0, y * s - s * 0.3 * ct, 10 * s, s * (1 + 0.6 * ct)); c.restore(); }
    }
    drawParts(c, s, d, T);
    if (g.piece && g.state === 'playing') {
      const p = g.piece, v = TYPES.indexOf(p.type) + 1, col = MAIN[v], cells = CELLS[p.type][p.rot];
      ghost(c, cells, p.x * s, g.ghostY() * s, s, col);
      const pf = FXm.piece(); let mx = 0, my = 0; cells.forEach(([a, b]) => { mx += a; my += b; }); mx = (p.x + mx / 4 + 0.5) * s; my = (p.y + my / 4 + 0.5) * s;
      const wob = Math.min(1, Math.abs(pf.rot) * 2 + Math.abs(pf.sx - 1) * 10);
      c.save(); c.translate(mx + pf.ox * s, my + pf.oy * s + (1 - pf.sy) * s); c.rotate(pf.rot + Math.sin(T * 38) * Math.abs(pf.rot) * 0.15); c.scale(pf.sx, pf.sy); c.translate(-mx, -my);
      c.shadowColor = rgba(col, 0.45); c.shadowBlur = s * 0.45;
      for (const [cx, cy] of cells) { c.save(); c.translate((p.x + cx) * s + s / 2, (p.y + cy) * s + s / 2); cell(c, v, s, d, maskIn(cells, cx, cy), 0, cx & 3, (p.x + cx) * 1.7 + cy * 3.1 + 50, T, wob, 1); c.restore(); if (c.shadowBlur) c.shadowBlur = 0; }
      if (g.grounded()) { c.globalCompositeOperation = 'lighter'; c.globalAlpha = (g.lockTimer / LOCK_DELAY) * 0.35; for (const [cx, cy] of cells) { c.save(); c.translate((p.x + cx) * s + s / 2, (p.y + cy) * s + s / 2); const P = Math.round(s * d), cv = pre(v, P, maskIn(cells, cx, cy), 0, cx & 3, isSmall(s)), kk = s / P, pad = cv.pad * kk; c.drawImage(cv, -s / 2 - pad, -s / 2 - pad, s + 2 * pad, s + 2 * pad); c.restore(); } }
      c.restore();
    }
  }
  /* ---------- line clear: the food gets scooped — beads scatter, nigiri slides off, maki rolls away, tamago pops ---------- */
  let lastRows = null, parts = [], lastT = 0;
  function spawnClear(g, s, d, T) {
    for (const y of g.clearRows) for (let x = 0; x < COLS; x++) {
      const v = g.board[y][x]; if (!v) continue; const food = FOOD[v], dir = x < 4.5 ? -1 : 1, X = x * s + s / 2, Y = y * s + s / 2, dl = Math.abs(x - 4.5) * 0.025, r = (i) => hash(x, y, i);
      const M = g.meta && g.meta[y] ? g.meta[y][x] : null, vr = M ? M.lx & 3 : x & 1;
      if (food === 'ikura') { parts.push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22, dl }); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.6; parts.push({ k: 'bead', x: X + (BEADS[i][0] - 0.5) * s, y: Y + (BEADS[i][1] - 0.5) * s, vx: Math.cos(a) * s * (2 + r(i + 9) * 4), vy: Math.sin(a) * s * (3 + r(i + 5) * 4), rot: 0, vr: 0, life: 0.8 + r(i + 3) * 0.4, dl }); } }
      else if (food === 'edamame') { parts.push({ k: 'pop', v, x: X, y: Y, vr, life: 0.2, dl }); for (let i = 0; i < 2; i++) parts.push({ k: 'pod', x: X, y: Y + (i - 0.5) * s * 0.4, vx: (r(i) - 0.5) * s * 6, vy: -s * (3 + r(i + 4) * 3), rot: r(i + 2) * 3, vr: (r(i + 7) - 0.5) * 14, life: 0.9, dl }); for (let i = 0; i < 3; i++) parts.push({ k: 'bean', x: X, y: Y, vx: (r(i + 11) - 0.5) * s * 7, vy: -s * (2 + r(i + 13) * 4), life: 0.7, dl }); }
      else if (food === 'maki') parts.push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (3 + r(1) * 2), vy: -s * 1.5, rot: 0, vr: 0, life: 0.9, dl, vrr: vr });
      else if (food === 'tamago') { parts.push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45, dl }); for (let i = 0; i < 3; i++) parts.push({ k: 'crumb', col: '#f5c842', x: X, y: Y, vx: (r(i) - 0.5) * s * 6, vy: -s * (2 + r(i + 3) * 3), life: 0.6, dl }); }
      else parts.push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1.5 + r(3) * 2), life: 0.85, dl, vrr: vr });
      for (let i = 0; i < 2; i++) parts.push({ k: 'spark', x: X + (r(i + 20) - 0.5) * s, y: Y + (r(i + 21) - 0.5) * s, life: 0.35 + r(i) * 0.2, dl: dl * 0.5 });
    }
    lastT = 0;
  }
  function drawParts(c, s, d, T) {
    const t = now(), dt = lastT ? Math.min(0.05, t - lastT) : 0.016; lastT = t; if (!parts.length) return;
    const P = Math.max(4, Math.round(s * d)), o = sprites(P), kk = s / P;
    for (const p of parts) {
      if (p.dl > 0) { p.dl -= dt; if (p.k === 'slide' || p.k === 'roll' || p.k === 'squish' || p.k === 'pop') { c.save(); c.translate(p.x, p.y); cell(c, p.v, s, d, 0, 0, p.vr ?? p.vrr ?? 0, 3, T, 0, 1); c.restore(); } continue; }
      p.t = (p.t || 0) + dt; const u = p.t / p.life; if (u >= 1) continue;
      if (p.vx !== undefined) { p.vx *= p.k === 'slide' ? 1 + dt * 3 : 1; p.x += p.vx * dt; p.vy += s * (p.k === 'slide' ? 6 : 14) * dt; p.y += p.vy * dt; }
      const al = u < 0.6 ? 1 : 1 - (u - 0.6) / 0.4; c.save(); c.globalAlpha = al; c.translate(p.x, p.y);
      switch (p.k) {
        case 'bead': c.drawImage(o.bead, -o.bead.width * kk / 2, -o.bead.height * kk / 2, o.bead.width * kk, o.bead.height * kk); break;
        case 'pod': p.rot += p.vr * dt; c.rotate(p.rot); c.drawImage(o.pod, -o.pod.width * kk / 2, -o.pod.height * kk / 2, o.pod.width * kk, o.pod.height * kk); break;
        case 'bean': c.fillStyle = '#93d466'; c.beginPath(); c.arc(0, 0, s * 0.1, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.6)'; c.beginPath(); c.arc(-s * 0.03, -s * 0.03, s * 0.03, 0, TAU); c.fill(); break;
        case 'crumb': c.fillStyle = p.col; c.rotate(u * 6); c.fillRect(-s * 0.08, -s * 0.06, s * 0.16, s * 0.12); break;
        case 'pop': { const sc = 1 + u * 0.5; c.scale(sc, sc); c.globalAlpha = al * (1 - u); cell(c, p.v, s, d, 0, 0, p.vr, 3, T, 0, 1 - u); break; }
        case 'squish': { const q = Math.sin(Math.min(1, u * 1.8) * Math.PI); c.scale(1 + q * 0.45 - u * 0.5, 1 - q * 0.35 - u * 0.55); cell(c, p.v, s, d, 0, 0, p.vr, 3, T, 0, al); break; }
        case 'roll': p.rot += (p.vx / (s * 0.45)) * dt; c.rotate(p.rot); c.scale(0.92, 0.92); cell(c, p.v, s, d, 0, 0, p.vrr, 3, T, 0, al); break;
        case 'slide': p.rot += p.vr * dt; c.rotate(p.rot); cell(c, p.v, s, d, 0, 0, p.vrr, 3, T, 0, al); break;
        case 'spark': { const r = s * (0.1 + u * 0.35); c.strokeStyle = `rgba(255,244,210,${1 - u})`; c.lineWidth = Math.max(1, s * 0.05); c.beginPath(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; c.moveTo(Math.cos(a) * r * 0.4, Math.sin(a) * r * 0.4); c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.stroke(); break; }
      }
      c.restore();
    }
    parts = parts.filter((p) => p.dl > 0 || (p.t || 0) < p.life);
  }
  function mini(c, type, cx, cy, cs, alpha, T, d) {
    const cells = CELLS[type][0], xs = cells.map((q) => q[0]), ys = cells.map((q) => q[1]);
    const w = Math.max(...xs) - Math.min(...xs) + 1, h = Math.max(...ys) - Math.min(...ys) + 1, ox = cx - (w * cs) / 2 - Math.min(...xs) * cs, oy = cy - (h * cs) / 2 - Math.min(...ys) * cs, v = TYPES.indexOf(type) + 1;
    c.save(); c.globalAlpha = alpha;
    for (const [x, y] of cells) { c.save(); c.translate(ox + x * cs + cs / 2, oy + y * cs + cs / 2); const b = Math.sin(T * 2 + x + cx * 0.05) * 0.008; c.scale(1 - b, 1 + b); cell(c, v, cs, d, maskIn(cells, x, y), 0, x & 3, x * 1.7 + y * 3.1 + cx * 0.01 + cy * 0.02, T, 0, alpha); c.restore(); }
    c.restore();
  }
  return { board, mini, cell, pre, paint, FOOD, MAIN, maskIn };
})();
SKINSETS.sushi = (() => {
  function base(x, t, P) { const pad = 0; SushiFood.paint(x, t, P, pad, 0, 0, 1, P < 20); } // isolated cell (legacy skin canvas)
  return { base, live: null, mass: SushiFood, noFace: true };
})();
