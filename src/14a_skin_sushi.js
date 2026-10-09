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
  /* ---------- PREMIUM materials (FoodMass premium:true) ----------
     High-end menu photo translated into geometry: lower saturation, rich darks, one top-left light. Everything that crosses a
     cell edge uses functions periodic in the cell size (period P in x and y) so masses stay continuous without piece space. */
  const packC = new Map();
  function packFor(mask, key) { // ikura: dart-thrown spheres of varied size; overhang into joined neighbours keeps the mass continuous
    const ck = mask + ':' + key; let out = packC.get(ck); if (out) return out; out = [];
    for (let i = 0; i < 700 && out.length < 14; i++) {
      const sc = 0.48 + Math.pow(hash(key, i, 9), 0.7) * 0.5, rr = 0.25 * sc, lo = (b) => (mask & b ? -rr * 0.15 : 0.055 + rr * 0.92);
      const bx = lo(W) + hash(key, i, 1) * (1 - lo(E) - lo(W)), by = lo(N) + hash(key, i, 2) * (1 - lo(S) - lo(N));
      if (out.every((q) => Math.hypot(q[0] - bx, q[1] - by) > (0.25 * q[3] + rr) * 0.86)) out.push([bx, by, out.length, sc]);
    }
    out.sort((a, b) => a[1] - b[1]); packC.set(ck, out); return out;
  }
  function podsPrem(mask, key) { const v = hash(key, 7) < 0.5, a0 = (hash(key, 3) - 0.5) * 0.6, s0 = 0.86 + hash(key, 5) * 0.14, s1 = 0.8 + hash(key, 6) * 0.18;
    if (v) return [[0.48 + (hash(key, 8) - 0.5) * 0.08, 0.3, 0.14 + a0, s0], [0.52, 0.72, -0.22 - a0 * 0.5, s1]];
    return [[0.3, 0.5 + (hash(key, 8) - 0.5) * 0.08, Math.PI / 2 + 0.2 + a0, s0], [0.72, 0.48, Math.PI / 2 - 0.28 - a0 * 0.4, s1]]; }
  function riceGrains(x, l, t, r, b, P, key, n, edgeY) { // individual grains with their own shade; denser and bumpier along the exposed bottom edge
    for (let i = 0; i < n; i++) { const gx = l + hash(key, i, 1) * (r - l), gy = edgeY !== undefined && i % 3 === 0 ? edgeY - hash(key, i, 4) * P * 0.06 : t + hash(key, i, 2) * (b - t), a = hash(key, i, 3) * 3, w = P * (0.04 + hash(i, key, 5) * 0.012), h = w * 0.5;
      ellipse(x, gx + P * 0.008, gy + P * 0.012, w, h, a); x.fillStyle = 'rgba(110,92,66,0.3)'; x.fill();
      ellipse(x, gx, gy, w, h, a); x.fillStyle = i % 4 ? '#f1ebdf' : '#e2d9c6'; x.fill();
      ellipse(x, gx - w * 0.25, gy - h * 0.35, w * 0.45, h * 0.3, a); x.fillStyle = 'rgba(255,255,255,0.75)'; x.fill(); }
  }
  // a line family x = x0 + k*sp - slope*y (+ periodic wobble); slope*P must be a multiple of sp so rows meet
  // displacement field periodic in P on both axes: every line bends differently yet rows and columns still meet
  const dField = (P, u, v, A) => (Math.sin(TAU * (u / P + 2 * v / P) + 0.7) * 0.6 + Math.sin(TAU * (2 * u / P - v / P) + 2.1) * 0.4) * A;
  function family(x, P, C, sp, slope, draw, A = 0.06) { for (let k = -Math.ceil(2 / sp) - 2; k < Math.ceil(2 / sp) + 2; k++) draw(k, (yy) => { const u = C(k * sp) - slope * (yy - C(0)) - C(0), v = yy - C(0); return C(0) + u + dField(P, u, v, P * A); }); }
  function vein(x, P, C, X, w0, col, wk) { // variable-width vein, width periodic in both axes (P)
    const pts = [], n = 18; for (let i = 0; i <= n; i++) { const yy = C(-0.1 + i * 1.2 / n), xx = X(yy), w = w0 * (0.5 + 0.6 * Math.sin((yy - C(0)) / P * TAU * 2 + (xx - C(0)) / P * TAU) * Math.sin((xx - C(0)) / P * TAU * 2 + 1.1) + 0.3 * Math.sin((xx - C(0)) / P * TAU * 3 - (yy - C(0)) / P * TAU)); pts.push([xx, yy, Math.max(w0 * 0.05, w)]); }
    x.beginPath(); pts.forEach(([a, b, w], i) => (i ? x.lineTo(a - w, b) : x.moveTo(a - w, b))); for (let i = pts.length - 1; i >= 0; i--) x.lineTo(pts[i][0] + pts[i][2], pts[i][1]); x.closePath(); x.fillStyle = col; x.fill();
  }
  function sheen(x, cx, cy, rx, ry, a, rot = -0.35) { x.save(); x.globalCompositeOperation = 'screen'; x.translate(cx, cy); x.rotate(rot); x.scale(1, ry / rx); x.fillStyle = radial(x, 0, 0, rx, [[0, `rgba(255,250,240,${a})`], [0.45, `rgba(255,245,230,${a * 0.35})`], [1, 'rgba(255,240,220,0)']]); x.fillRect(-rx, -rx, rx * 2, rx * 2); x.restore(); }
  function premiumSprites(P) { const o = {};
    { // ikura: translucent sphere — dark rim, light transmitted to the lower right, darker core, thin rim light, specular dot
      const r = Math.max(2, P * 0.25), n = Math.ceil(r * 2 + 2), c = makeCanvas(n, n), X = c.getContext('2d'), m = n / 2;
      X.beginPath(); X.arc(m, m, r, 0, TAU); X.fillStyle = radial(X, m + r * 0.2, m + r * 0.25, r * 1.15, [[0, '#ffa050'], [0.35, '#ee6a24'], [0.75, '#c03e12'], [1, '#7a1e08']]); X.fill();
      X.beginPath(); X.arc(m + r * 0.2, m + r * 0.24, r * 0.5, 0, TAU); X.fillStyle = radial(X, m + r * 0.2, m + r * 0.24, r * 0.5, [[0, 'rgba(255,170,90,0.75)'], [1, 'rgba(255,140,60,0)']]); X.fill();
      X.beginPath(); X.arc(m + r * 0.12, m + r * 0.1, r * 0.2, 0, TAU); X.fillStyle = radial(X, m + r * 0.12, m + r * 0.1, r * 0.2, [[0, 'rgba(110,26,6,0.85)'], [1, 'rgba(150,40,10,0)']]); X.fill();
      X.beginPath(); X.arc(m, m, r * 0.9, Math.PI * 0.95, Math.PI * 1.55); X.strokeStyle = 'rgba(255,214,180,0.45)'; X.lineWidth = Math.max(0.6, r * 0.07); X.stroke();
      X.save(); X.translate(m - r * 0.4, m - r * 0.42); X.rotate(-0.6); X.beginPath(); X.ellipse(0, 0, r * 0.2, r * 0.11, 0, 0, TAU); X.fillStyle = 'rgba(255,252,244,0.95)'; X.fill(); X.restore();
      X.beginPath(); X.arc(m + r * 0.48, m + r * 0.46, r * 0.06, 0, TAU); X.fillStyle = 'rgba(255,220,180,0.5)'; X.fill();
      o.bead = c; o.beadR = r;
      const n2 = Math.ceil(r * 3), c2 = makeCanvas(n2, n2), Y = c2.getContext('2d'); Y.fillStyle = radial(Y, n2 / 2, n2 / 2, n2 / 2, [[0, 'rgba(20,0,0,0.6)'], [0.6, 'rgba(20,0,0,0.3)'], [1, 'rgba(20,0,0,0)']]); Y.fillRect(0, 0, n2, n2); o.beadSh = c2;
    }
    { // edamame pod: bumpy silhouette from three beans, matte skin with fine fuzz, seam line, stem; lit from the top-left
      const L = P * 0.84, Hh = P * 0.34, w = Math.ceil(L + 6), h = Math.ceil(Hh + 6), cy = h / 2, x0 = (w - L) / 2;
      const shape = (X, grow) => { X.beginPath(); for (let i = 0; i < 3; i++) { const bx = x0 + L * (0.2 + i * 0.3), rr = Hh * (0.5 - (i === 1 ? 0 : 0.04)) + grow; X.moveTo(bx + rr, cy); X.arc(bx, cy, rr, 0, TAU); } X.moveTo(x0 + L * 0.2, cy - Hh * 0.46 - grow); X.lineTo(x0 + L * 0.8, cy - Hh * 0.46 - grow); X.lineTo(x0 + L * 0.8, cy + Hh * 0.47 + grow); X.lineTo(x0 + L * 0.2, cy + Hh * 0.47 + grow); X.closePath(); X.moveTo(x0 + L * 0.06, cy); X.ellipse(x0 + L * 0.08, cy, L * 0.08 + grow, Hh * 0.34 + grow, 0, 0, TAU); X.moveTo(x0 + L * 0.98, cy); X.ellipse(x0 + L * 0.92, cy - Hh * 0.04, L * 0.08 + grow, Hh * 0.3 + grow, 0, 0, TAU); };
      const c = makeCanvas(w, h), X = c.getContext('2d');
      shape(X, Math.max(0.7, P * 0.014)); X.fillStyle = 'rgba(20,40,10,0.6)'; X.fill('nonzero');
      shape(X, 0); X.fillStyle = linear(X, 0, cy - Hh / 2, 0, cy + Hh / 2, [[0, '#a0bc6c'], [0.45, '#78a04a'], [1, '#4a722e']]); X.fill('nonzero');
      X.save(); shape(X, 0); X.clip('nonzero');
      for (let i = 0; i < 3; i++) { const bx = x0 + L * (0.2 + i * 0.3); X.fillStyle = radial(X, bx - Hh * 0.15, cy - Hh * 0.18, Hh * 0.55, [[0, 'rgba(200,225,150,0.4)'], [1, 'rgba(200,225,150,0)']]); X.fillRect(bx - Hh, cy - Hh, Hh * 2, Hh * 2); X.fillStyle = 'rgba(30,60,16,0.25)'; X.fillRect(bx + L * 0.14, cy - Hh, Math.max(0.6, P * 0.012), Hh * 2); }
      X.fillStyle = 'rgba(235,245,215,0.28)'; for (let i = 0; i < 70; i++) { const z = Math.max(0.5, P * 0.008); X.fillRect(x0 + hash(i, P, 1) * L, cy - Hh / 2 + hash(P, i, 2) * Hh, z, z); }
      X.strokeStyle = 'rgba(40,70,20,0.45)'; X.lineWidth = Math.max(0.6, P * 0.01); X.beginPath(); X.moveTo(x0 + L * 0.04, cy + Hh * 0.05); X.quadraticCurveTo(x0 + L * 0.5, cy + Hh * 0.18, x0 + L * 0.96, cy); X.stroke();
      X.restore();
      X.fillStyle = '#4a5a2a'; X.fillRect(x0 + L * 0.99, cy - Hh * 0.08, Math.max(1, P * 0.035), Math.max(1, P * 0.025));
      o.pod = c;
      const c2 = makeCanvas(w, h), Y = c2.getContext('2d'); Y.filter = `blur(${Math.max(0.5, P * 0.03)}px)`; shape(Y, 0); Y.fillStyle = 'rgba(0,0,0,0.5)'; Y.fill('nonzero'); o.podSh = c2;
    }
    return o; }
  function premiumPaint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, band, rrect, radii, cut } = Q, H = (i, j = 0) => hash(vr, i, j);
    switch (food) {
      case 'ikura': {
        x.fillStyle = '#a8380e'; x.fillRect(l, t, r - l, b - t);
        if (!(mask & S)) { band(b - P * 0.12, P * 0.12, '#141c16'); x.fillStyle = 'rgba(120,150,120,0.12)'; for (let i = 0; i < 6; i++) x.fillRect(C(i / 6), b - P * 0.12, Math.max(1, P * 0.01), P * 0.12); }
        // packed background roe, darker and smaller, so the bed reads as depth rather than a flat colour
        for (let i = 0; i < 14; i++) { const u = C(H(i, 1)), v = C(H(i, 2) * 0.9), rr = P * (0.06 + H(i, 3) * 0.05); x.fillStyle = radial(x, u - rr * 0.3, v - rr * 0.3, rr * 1.2, [[0, '#e2601e'], [1, '#a8360e']]); x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); }
        if (small) { const o = sprites(P), d = o.beadR; for (const [bx, by, , sc] of packFor(mask, vr)) x.drawImage(o.bead, C(bx) - d * sc, C(by) - d * sc, d * 2 * sc, d * 2 * sc); }
        break;
      }
      case 'edamame': {
        x.fillStyle = '#2c4a1e'; x.fillRect(l, t, r - l, b - t);
        for (let i = 0; i < 5; i++) { x.fillStyle = H(i, 9) < 0.5 ? 'rgba(70,104,44,0.55)' : 'rgba(40,66,26,0.6)'; ellipse(x, C(H(vr, i)), C(H(i, 4)), P * 0.2, P * 0.09, H(i, 5) * 3); x.fill(); }
        x.fillStyle = 'rgba(240,240,225,0.5)'; for (let i = 0; i < 10; i++) { const z = Math.max(0.8, P * 0.012); x.fillRect(C(H(i, 11)), C(H(i, 12)), z, z); }
        if (small) { const o = sprites(P); for (const [px, py, a, sc] of podsPrem(mask, vr)) { x.save(); x.translate(C(px), C(py)); x.rotate(a); x.scale(sc, sc); x.drawImage(o.pod, -o.pod.width / 2, -o.pod.height / 2); x.restore(); } }
        break;
      }
      case 'tamago': {
        x.fillStyle = '#e6b84a'; x.fillRect(l, t, r - l, b - t);
        for (let i = 1; i < 5; i++) { const y = C(i / 5 + (i % 2 ? 0.02 : -0.015)); x.fillStyle = linear(x, 0, y - P * 0.05, 0, y + P * 0.03, [[0, 'rgba(255,230,150,0)'], [0.7, 'rgba(196,132,40,0.26)'], [1, 'rgba(255,226,140,0.22)']]); x.fillRect(l, y - P * 0.05, r - l, P * 0.08); }
        if (!small) for (let i = 0; i < 16; i++) { const rr = P * (0.008 + H(i, 3) * 0.012); x.fillStyle = H(i, 4) < 0.6 ? 'rgba(255,240,190,0.6)' : 'rgba(170,110,30,0.35)'; x.beginPath(); x.arc(C(H(i, 1)), C(H(i, 2)), rr, 0, TAU); x.fill(); }
        if (!(mask & N)) { x.fillStyle = linear(x, 0, t, 0, t + P * 0.14, [[0, '#a8681e'], [0.45, '#d29a38'], [1, 'rgba(230,184,74,0)']]); x.fillRect(l, t, r - l, P * 0.14); sheen(x, C(0.4 + H(5) * 0.2), t + P * 0.2, P * 0.32, P * 0.07, 0.22, 0); }
        if (!(mask & S)) band(b - P * 0.08, P * 0.08, '#b88028');
        const bx = ((vr - 1) / 13) & 1 ? C(0) : C(1), bw = P * 0.17;
        x.fillStyle = '#121a14'; x.fillRect(bx - bw, t - 2, bw * 2, b - t + 4);
        x.strokeStyle = 'rgba(110,140,110,0.14)'; x.lineWidth = Math.max(0.6, P * 0.008); x.beginPath(); for (let i = 0; i < 14; i++) { const y = C(i / 14 + H(i, 7) * 0.03); x.moveTo(bx - bw, y); x.lineTo(bx + bw, y + P * 0.04); } x.stroke();
        x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(bx + bw, t, P * 0.025, b - t); x.fillStyle = 'rgba(140,170,140,0.16)'; x.fillRect(bx - bw * 0.9, t, P * 0.02, b - t);
        break;
      }
      case 'salmon': {
        x.fillStyle = '#e8e0d0'; x.fillRect(l, t, r - l, b - t);
        const fb = mask & S ? b : b - P * 0.25;
        if (!(mask & S)) riceGrains(x, l, fb, r, b, P, vr, small ? 4 : 22, b - P * 0.02);
        const frd = radii(mask, cut, P * 0.2); frd[2] = frd[3] = 0;
        if (!(mask & S)) { x.fillStyle = linear(x, 0, fb, 0, fb + P * 0.1, [[0, 'rgba(80,40,20,0.45)'], [1, 'rgba(80,40,20,0)']]); x.fillRect(l, fb, r - l, P * 0.1); }
        rrect(x, l, t, r, fb, frd); x.save(); x.clip();
        x.fillStyle = '#f27a44'; x.fillRect(l, t, r - l, fb - t);
        for (let i = 0; i < 4; i++) { x.fillStyle = H(i, 21) < 0.5 ? 'rgba(226,96,50,0.3)' : 'rgba(255,150,100,0.28)'; ellipse(x, C(H(i, 22)), C(H(i, 23)), P * 0.3, P * 0.12, -0.6); x.fill(); }
        // marbled fat: main veins (period 1/3, row shift 2/3) + fine branching veins (period 1/2, row shift 1/2)
        family(x, P, C, 1 / 3, 2 / 3, (k, X) => { vein(x, P, C, X, P * 0.05, 'rgba(255,226,206,0.3)', 0); vein(x, P, C, X, P * 0.018, 'rgba(255,246,238,0.95)', 0); }, 0.045);
        if (!small) family(x, P, C, 1 / 2, 1 / 2, (k, X) => vein(x, P, C, (yy) => X(yy) + P * 0.12, P * 0.008, 'rgba(255,236,222,0.4)', 2), 0.06);
        x.fillStyle = 'rgba(150,50,20,0.18)'; for (let i = 0; i < 18; i++) { const z = Math.max(0.7, P * 0.01); x.fillRect(C(H(i, 31)), C(H(i, 32)), z, z * 2); }
        if (!(mask & N)) sheen(x, C(0.32 + H(41) * 0.3), t + P * 0.16, P * 0.42, P * 0.1, 0.5);
        else if (H(42) < 0.6) sheen(x, C(0.2 + H(43) * 0.6), C(0.2 + H(44) * 0.5), P * 0.22, P * 0.06, 0.28);
        if (!(mask & S)) { x.fillStyle = linear(x, 0, fb - P * 0.1, 0, fb, [[0, 'rgba(160,60,30,0)'], [1, 'rgba(150,56,28,0.55)']]); x.fillRect(l, fb - P * 0.1, r - l, P * 0.1); }
        x.restore(); break;
      }
      case 'maguro': {
        x.fillStyle = '#ae2238'; x.fillRect(l, t, r - l, b - t);
        for (let i = 0; i < 5; i++) { x.fillStyle = H(i, 51) < 0.5 ? 'rgba(70,6,22,0.12)' : 'rgba(190,60,80,0.1)'; ellipse(x, C(H(i, 52)), C(H(i, 53)), P * 0.36, P * 0.22, H(i, 54) * 3); x.fill(); }
        if (!small) family(x, P, C, 1 / 8, 1 / 4, (k, X) => { x.strokeStyle = k % 2 ? 'rgba(255,170,180,0.07)' : 'rgba(60,0,14,0.12)'; x.lineWidth = Math.max(0.6, P * 0.012); x.beginPath(); for (let i = 0; i <= 12; i++) { const yy = C(-0.1 + i * 0.1); i ? x.lineTo(X(yy), yy) : x.moveTo(X(yy), yy); } x.stroke(); });
        family(x, P, C, 1 / 2, 1 / 2, (k, X) => { // soft slice edges: a dark cut line and a lit bevel fading away from it
          for (let j = 0; j < 4; j++) { x.strokeStyle = j === 0 ? 'rgba(52,0,14,0.55)' : `rgba(230,110,130,${0.16 - j * 0.04})`; x.lineWidth = j === 0 ? Math.max(1, P * 0.022) : P * 0.04; x.beginPath(); for (let i = 0; i <= 12; i++) { const yy = C(-0.1 + i * 0.1), xx = X(yy) + (j === 0 ? 0 : P * (0.01 + j * 0.035)); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } }, 0.08);
        if (!(mask & N)) sheen(x, C(0.35 + H(61) * 0.3), t + P * 0.15, P * 0.44, P * 0.1, 0.45);
        sheen(x, C(0.25 + H(63) * 0.5), C(0.3 + H(64) * 0.45), P * 0.26, P * 0.055, 0.26);
        if (!(mask & S)) band(b - P * 0.07, P * 0.07, '#5e0e1e');
        break;
      }
      case 'saba': {
        x.fillStyle = linear(x, 0, C(0.5), 0, C(1), [[0, '#c4ccd4'], [0.4, '#d8dce0'], [0.7, '#cdd2d8'], [1, '#b4bcc6']]); x.fillRect(l, t, r - l, b - t);
        x.fillStyle = linear(x, 0, C(0), 0, C(0.56), [[0, '#3c536c'], [1, '#5e7890']]); x.fillRect(l, t, r - l, C(0.56) - t);
        x.fillStyle = linear(x, 0, C(0.5), 0, C(0.64), [[0, 'rgba(150,175,195,0.9)'], [0.5, 'rgba(210,180,200,0.35)'], [1, 'rgba(200,220,210,0)']]); x.fillRect(l, C(0.5), r - l, P * 0.14);
        for (let k = 0; k < 3; k++) { const x0 = C(k / 3 + 0.03 + (H(k, 71) - 0.5) * 0.04), wv = P * (0.07 + H(k, 72) * 0.03); x.fillStyle = 'rgba(18,32,50,0.62)'; x.beginPath(); x.moveTo(x0, C(0.04)); x.quadraticCurveTo(x0 + wv * 2.2, C(0.2), x0 + wv * 0.9, C(0.48)); x.lineTo(x0 + wv * 0.3, C(0.48)); x.quadraticCurveTo(x0 + wv * 1.4, C(0.22), x0 - wv * 0.4, C(0.04)); x.closePath(); x.fill(); }
        x.save(); x.globalCompositeOperation = 'multiply'; for (let i = 0; i < 3; i++) { x.fillStyle = ['rgba(225,205,225,0.5)', 'rgba(205,225,220,0.5)', 'rgba(230,222,200,0.5)'][i]; x.fillRect(l, C(0.66 + i * 0.1 + (H(i, 77) - 0.5) * 0.03), r - l, P * 0.05); } x.restore();
        if (!small) { x.fillStyle = 'rgba(255,255,255,0.4)'; for (let i = 0; i < 14; i++) { const z = Math.max(0.6, P * 0.01); x.fillRect(C(H(i, 73)), C(0.6 + H(i, 74) * 0.35), z * 4, z); } }
        if (!(mask & N)) sheen(x, C(0.35 + H(75) * 0.25), t + P * 0.12, P * 0.42, P * 0.07, 0.4, -0.15);
        sheen(x, C(0.3 + H(76) * 0.4), C(0.74), P * 0.3, P * 0.05, 0.3, 0);
        if (!(mask & S)) band(b - P * 0.07, P * 0.07, '#8a96a4');
        break;
      }
      case 'maki': {
        x.fillStyle = '#0b110d'; x.fillRect(l, t, r - l, b - t);
        const cx = C(0.5) + (H(81) - 0.5) * P * 0.03, cy = C(0.5) + (H(82) - 0.5) * P * 0.03;
        x.beginPath(); x.arc(cx, cy, P * 0.45, 0, TAU); x.fillStyle = '#121b15'; x.fill();
        if (!small) { x.strokeStyle = 'rgba(120,150,120,0.12)'; x.lineWidth = Math.max(0.5, P * 0.006); for (let i = 0; i < 10; i++) { const a = H(i, 83) * TAU; x.beginPath(); x.arc(cx, cy, P * (0.38 + H(i, 84) * 0.06), a, a + 0.6); x.stroke(); } }
        x.beginPath(); x.arc(cx, cy, P * 0.45, -2.5, -0.9); x.strokeStyle = 'rgba(150,180,150,0.22)'; x.lineWidth = Math.max(1, P * 0.02); x.stroke();
        x.beginPath(); x.arc(cx, cy, P * 0.37, 0, TAU); x.fillStyle = '#f4efe4'; x.fill();
        x.save(); x.beginPath(); x.arc(cx, cy, P * 0.37, 0, TAU); x.clip();
        x.fillStyle = 'rgba(150,130,100,0.14)'; x.beginPath(); x.arc(cx + P * 0.05, cy + P * 0.07, P * 0.37, 0, TAU); x.arc(cx, cy, P * 0.37, 0, TAU, true); x.fill();
        riceGrains(x, cx - P * 0.36, cy - P * 0.36, cx + P * 0.36, cy + P * 0.36, P, vr + 5, small ? 0 : 12);
        x.restore();
        if (!small) for (let i = 0; i < 16; i++) { const a = i / 16 * TAU + H(i, 85) * 0.3, rr = P * 0.37; ellipse(x, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, P * 0.04, P * 0.021, a + Math.PI / 2); x.fillStyle = i % 3 ? '#efe8dc' : '#ddd3c0'; x.fill(); }
        // filling: cucumber cut face (skin, pale flesh, seed bed) beside a slice of avocado
        const fa = H(86) * 0.8 - 0.4; x.save(); x.translate(cx, cy); x.rotate(fa);
        x.beginPath(); x.arc(-P * 0.07, 0, P * 0.16, 0, TAU); x.fillStyle = '#1e4a16'; x.fill();
        x.beginPath(); x.arc(-P * 0.07, 0, P * 0.12, 0, TAU); x.fillStyle = '#9ccc5a'; x.fill();
        x.beginPath(); x.arc(-P * 0.07, 0, P * 0.072, 0, TAU); x.fillStyle = '#d8eaa4'; x.fill();
        if (!small) { x.fillStyle = 'rgba(244,240,214,0.9)'; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.3; ellipse(x, -P * 0.07 + Math.cos(a) * P * 0.04, Math.sin(a) * P * 0.04, P * 0.016, P * 0.008, a); x.fill(); } }
        x.beginPath(); x.moveTo(P * 0.04, P * 0.15); x.quadraticCurveTo(P * 0.02, -P * 0.14, P * 0.13, -P * 0.17); x.quadraticCurveTo(P * 0.24, -P * 0.02, P * 0.15, P * 0.16); x.closePath(); x.fillStyle = linear(x, P * 0.04, 0, P * 0.2, 0, [[0, '#e0e894'], [0.6, '#a8c44c'], [1, '#4e7a22']]); x.fill();
        x.restore();
        break;
      }
    }
  }
  const M = FoodMass({
    FOOD: [null, 'ikura', 'tamago', 'salmon', 'maguro', 'edamame', 'saba', 'maki'],
    MAIN: [null, '#f0561e', '#f5c842', '#f7905a', '#c8203a', '#7cc254', '#8fa8c4', '#eae4d4'],
    soft: { tamago: 1.6, ikura: 1.2, maki: 0.8 },
    premiumVkey: (food, vr) => (food === 'tamago' ? vr & 1 : vr),
    premiumOpts: { R: 0.16, grain: { maki: 0.04, ikura: 0.08, edamame: 0.12, tamago: 0.1, salmon: 0.1, maguro: 0.14, saba: 0.1 }, desatAll: 0.03, desat: { salmon: 0, maguro: 0 }, sh: 0.2, edge: 'rgba(24,12,8,0.5)', lift: { maki: 'brightness(1.1) contrast(1.22)', edamame: 'brightness(1.16) contrast(1.14) saturate(1.06)', maguro: 'brightness(1.12) contrast(1.12) saturate(1.08)' } },
    glisten: { salmon: 0.55, maguro: 0.55, saba: 0.55, tamago: 0.3 },
    vkey: (food, vr) => (food === 'tamago' ? vr & 1 : vr % 4),
    vpaint: (food, vk) => (food === 'tamago' ? vk : vk * 13 + 1),
    sprites(P, opt) { const o = {}; if (opt && opt.premium) return premiumSprites(P);
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
      if (Q.premium) return premiumPaint(x, food, Q);
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
      if (o.premium) {
        const sp = o.spr;
        if (food === 'ikura') { const bs = sp.bead.width * k, sh = sp.beadSh.width * k, list = packFor(mask, vr * 13 + 1);
          for (const [bx, by, i, sc] of list) { c.drawImage(sp.beadSh, (bx - 0.5) * s + s * 0.03 - sh * sc / 2, (by - 0.5) * s + s * 0.05 - sh * sc / 2, sh * sc, sh * sc); }
          for (const [bx, by, i, sc] of list) { const ph = seed * 1.3 + i * 2.1, j = 0.012 + wob * 0.045, dx = Math.sin(T * 3.1 + ph) * j * s, dy = Math.cos(T * 3.7 + ph * 1.4) * j * s * 0.8; c.drawImage(sp.bead, (bx - 0.5) * s + dx - bs * sc / 2, (by - 0.5) * s + dy - bs * sc / 2, bs * sc, bs * sc); }
        } else if (food === 'edamame') { const pw = sp.pod.width * k, ph0 = sp.pod.height * k;
          for (const [px, py, a, sc] of podsPrem(mask, vr * 13 + 1)) { const ph = seed * 0.9 + px * 5 + py * 3, shk = 0.01 + wob * 0.035; c.save(); c.translate((px - 0.5) * s + Math.sin(T * 1.7 + ph) * shk * s, (py - 0.5) * s + Math.cos(T * 2.1 + ph) * shk * s * 0.6); c.rotate(a + Math.sin(T * 1.3 + ph) * (0.03 + wob * 0.12)); c.scale(sc, sc);
            c.drawImage(sp.podSh, -pw / 2 + s * 0.02, -ph0 / 2 + s * 0.05, pw, ph0); c.drawImage(sp.pod, -pw / 2, -ph0 / 2, pw, ph0); c.restore(); } }
        return;
      }
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
