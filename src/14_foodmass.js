/* ================= FoodMass — blocks MADE OF the food (shared engine) =================
   Generalised from the Kaiten Sushi food blocks. A world supplies paint() for its 7 materials and
   optional live() overlays (beads, bubbles, sprinkles...), squash softness and line-clear particles.
   The engine does: edge-to-edge masses with per-cell connectivity (g.meta), rounded convex corners,
   cut faces after clears, dark gaps between pieces, per-size pre-rendered caches (small-iPhone mode
   < 18 css px), per-piece affine wobble (landing squash + idle jiggle), rotate shake, ghost outline,
   HOLD/NEXT minis and persistent line-clear particles. */
const FM_N = 1, FM_E = 2, FM_S = 4, FM_W = 8;
function FoodMass(spec) {
  const N = FM_N, E = FM_E, S = FM_S, W = FM_W;
  const FOOD = spec.FOOD, MAIN = spec.MAIN;
  const hash = (a, b = 0, c = 0) => { const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return v - Math.floor(v); };
  const gapK = spec.gap ?? 0.055, RK = spec.R ?? 0.3;
  /* PREMIUM material pass (spec.premium:true; window.__fmPremium overrides for A/B and rollback): one top-left light, soft drop
     shadow onto the board, thin dark low-contrast edges instead of bevel planes, soft AO along exposed edges, seeded micro-grain,
     slightly lower saturation. Food-specific materials read Q.premium inside spec.paint. */
  const PREM = () => !(typeof window !== 'undefined' && window.__fmPremium === false) && spec.premium !== false; // premium is the DEFAULT for every FoodMass world; window.__fmPremium=false (or spec.premium:false) = rollback
  const noiseC = new Map();
  function noiseTex(P) { // tileable with period P, anchored at the cell origin -> grain runs seamlessly across joined cells
    let c = noiseC.get(P); if (c) return c; const n = Math.max(4, Math.round(P)); c = makeCanvas(n, n); const X = c.getContext('2d'), im = X.createImageData(n, n), d = im.data; let sd = 1234567 + n;
    const rnd = () => { sd = (sd * 1103515245 + 12345) & 0x7fffffff; return sd / 0x7fffffff; };
    const g = 14, coarse = []; for (let i = 0; i < g * g; i++) coarse.push(rnd());
    const cv = (x, y) => { const fx = x / n * g, fy = y / n * g, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0, q = (a, b) => coarse[((b % g) + g) % g * g + ((a % g) + g) % g]; return (q(x0, y0) * (1 - tx) + q(x0 + 1, y0) * tx) * (1 - ty) + (q(x0, y0 + 1) * (1 - tx) + q(x0 + 1, y0 + 1) * tx) * ty; };
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = Math.round(128 + (rnd() - 0.5) * 60 + (cv(x, y) - 0.5) * 50), i = (y * n + x) * 4; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    X.putImageData(im, 0, 0); noiseC.set(P, c); return c;
  }
  function premiumFinish(x, food, P, pad, mask, cut, vr, small, l, t, r, b, rd, v) {
    const PO = spec.premiumOpts || {}, gr = (PO.grain && PO.grain[food]) ?? PO.grainAll ?? 0.16;
    if (!small && gr > 0) { const nz = noiseTex(P), pat = x.createPattern(nz, 'repeat'); x.save(); x.globalCompositeOperation = 'overlay'; x.globalAlpha = gr; x.translate(pad, pad); x.scale(P / nz.width, P / nz.width); x.fillStyle = pat; x.fillRect(-pad * 2, -pad * 2, nz.width * 2, nz.width * 2); x.restore(); }
    const ds = (PO.desat && PO.desat[food]) ?? PO.desatAll ?? 0.04; if (ds > 0) { x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = ds; x.fillStyle = '#808080'; x.fillRect(l - 1, t - 1, r - l + 2, b - t + 2); x.restore(); }
    // form light: one light from the top-left. Exposed N/W edges catch a soft lift, exposed S/E edges roll into shade (AO where masses meet)
    const strip = (x0, y0, x1, y1, c0) => { x.fillStyle = linear(x, x0, y0, x1, y1, [[0, c0], [1, c0.replace(/[\d.]+\)$/, '0)')]]); x.fillRect(Math.min(x0, x1) - (x0 === x1 ? P : 0), Math.min(y0, y1) - (y0 === y1 ? P : 0), Math.abs(x1 - x0) || P * 3, Math.abs(y1 - y0) || P * 3); };
    const hiA = PO.hi ?? 0.14, shA = PO.sh ?? 0.22, aoW = P * 0.22;
    x.save(); x.globalCompositeOperation = 'multiply';
    if (!(mask & S)) { x.fillStyle = linear(x, 0, b, 0, b - aoW, [[0, `rgba(40,20,12,${shA})`], [1, 'rgba(255,255,255,0)']]); x.fillRect(l - 1, b - aoW, r - l + 2, aoW + 1); }
    if (!(mask & E)) { x.fillStyle = linear(x, r, 0, r - aoW * 0.8, 0, [[0, `rgba(40,20,12,${shA * 0.8})`], [1, 'rgba(255,255,255,0)']]); x.fillRect(r - aoW * 0.8, t - 1, aoW * 0.8 + 1, b - t + 2); }
    if (!(mask & W)) { x.fillStyle = linear(x, l, 0, l + aoW * 0.5, 0, [[0, `rgba(40,20,12,${shA * 0.35})`], [1, 'rgba(255,255,255,0)']]); x.fillRect(l - 1, t - 1, aoW * 0.5 + 1, b - t + 2); }
    if (cut & N) { x.fillStyle = linear(x, 0, t, 0, t + aoW * 0.6, [[0, `rgba(40,20,12,${shA * 0.5})`], [1, 'rgba(255,255,255,0)']]); x.fillRect(l - 1, t, r - l + 2, aoW * 0.6); }
    x.globalCompositeOperation = 'screen';
    if (!(mask & N)) { x.fillStyle = linear(x, 0, t, 0, t + P * 0.16, [[0, `rgba(255,246,230,${hiA})`], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 1, t - 1, r - l + 2, P * 0.16 + 1); }
    if (!(mask & W)) { x.fillStyle = linear(x, l, 0, l + P * 0.12, 0, [[0, `rgba(255,246,230,${hiA * 0.7})`], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 1, t - 1, P * 0.12 + 1, b - t + 2); }
    x.restore(); void strip;
    // lift: +brightness/contrast so masses never sink into the board (applied to this cell's own pixels, inside the mass clip)
    const mc = MAIN[v] || '#808080', ml = /^#[0-9a-f]{6}$/i.test(mc) ? (parseInt(mc.slice(1, 3), 16) * 0.3 + parseInt(mc.slice(3, 5), 16) * 0.59 + parseInt(mc.slice(5, 7), 16) * 0.11) : 128;
    // pale foods get a gentler lift so creams and whites keep their texture instead of clipping
    const lf = (PO.lift && PO.lift[food]) ?? PO.liftAll ?? (ml > 205 ? 'contrast(1.05) brightness(0.99)' : ml > 170 ? 'brightness(1.03) contrast(1.08)' : 'brightness(1.08) contrast(1.12) saturate(1.04)');
    if (lf && !small) { x.save(); x.globalCompositeOperation = 'copy'; x.filter = lf; x.drawImage(x.canvas, 0, 0); x.restore(); }
    // rim light on the sides that face the light (N, W) — a thin warm line just inside the edge separates each piece from the board
    { const d = P * 0.04, ra = Math.max(0, rd[0] - d); x.beginPath();
      if (!(mask & N)) { x.moveTo(mask & W ? l - 2 : l + d + ra, t + d); x.lineTo(mask & E ? r + 2 : r - Math.max(rd[1], d), t + d); }
      if (!(mask & W)) { x.moveTo(l + d, mask & S ? b + 2 : b - Math.max(rd[3], d)); x.lineTo(l + d, mask & N ? t - 2 : t + d + ra); }
      if (!(mask & N) && !(mask & W)) { if (ra) { x.moveTo(l + d, t + d + ra); x.arcTo(l + d, t + d, l + d + ra, t + d, ra); } }
      x.strokeStyle = PO.rim || 'rgba(255,248,232,0.48)'; x.lineWidth = Math.max(1, P * 0.028); x.lineCap = 'round'; x.stroke(); }
    // thin dark low-contrast edge on exposed sides only (continuous masses keep no seams)
    x.beginPath(); const [a0, a1, a2, a3] = rd;
    if (!(mask & N)) { x.moveTo(l + a0, t); x.lineTo(r - a1, t); } if (!(mask & E)) { x.moveTo(r, t + a1); x.lineTo(r, b - a2); }
    if (!(mask & S)) { x.moveTo(r - a2, b); x.lineTo(l + a3, b); } if (!(mask & W)) { x.moveTo(l, b - a3); x.lineTo(l, t + a0); }
    if (a0) { x.moveTo(l, t + a0); x.arcTo(l, t, l + a0, t, a0); } if (a1) { x.moveTo(r - a1, t); x.arcTo(r, t, r, t + a1, a1); }
    if (a2) { x.moveTo(r, b - a2); x.arcTo(r, b, r - a2, b, a2); } if (a3) { x.moveTo(l + a3, b); x.arcTo(l, b, l, b - a3, a3); }
    x.strokeStyle = PO.edge || 'rgba(28,14,8,0.22)'; x.lineWidth = Math.max(0.75, P * 0.02); x.stroke(); // hairline, low contrast: separation comes from rim light + AO
  }
  function massBox(P, pad, mask, g) { const ov = Math.max(1, Math.round(P * 0.025)); return [mask & W ? pad - ov : pad + g, mask & N ? pad - ov : pad + g, mask & E ? pad + P + ov : pad + P - g, mask & S ? pad + P + ov : pad + P - g]; }
  function radii(mask, cut, R) { const ex = (b) => !(mask & b), rc = (a, b) => (ex(a) && ex(b) && !(cut & a) && !(cut & b) ? R : 0); return [rc(N, W), rc(N, E), rc(S, E), rc(S, W)]; }
  function rrect(x, l, t, r, b, rd) {
    const [a, bb, c, d] = rd; x.beginPath(); x.moveTo(l + a, t); x.lineTo(r - bb, t); bb ? x.arcTo(r, t, r, t + bb, bb) : x.lineTo(r, t);
    x.lineTo(r, b - c); c ? x.arcTo(r, b, r - c, b, c) : x.lineTo(r, b); x.lineTo(l + d, b); d ? x.arcTo(l, b, l, b - d, d) : x.lineTo(l, b);
    x.lineTo(l, t + a); a ? x.arcTo(l, t, l + a, t, a) : x.lineTo(l, t); x.closePath();
  }
  const poly = (x, pts) => { x.beginPath(); x.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) x.lineTo(pts[i], pts[i + 1]); x.closePath(); };
  const spr = new Map();
  function sprites(P) {
    const pm = PREM(), sk = P + (pm ? 'p' : ''); let o = spr.get(sk); if (o) return o; o = spec.sprites ? spec.sprites(P, { hash, poly, premium: pm }) : {};
    { const n = Math.ceil(P * 1.2), c = makeCanvas(n, n), X = c.getContext('2d');
      X.fillStyle = radial(X, n / 2, n / 2, n / 2, [[0, 'rgba(255,255,255,0.85)'], [0.3, 'rgba(255,255,255,0.3)'], [1, 'rgba(255,255,255,0)']]);
      X.translate(n / 2, n / 2); X.scale(1, 0.35); X.translate(-n / 2, -n / 2); X.fillRect(0, 0, n, n); o.glint = c; }
    spr.set(sk, o); return o;
  }
  function paint(x, v, P, pad, mask, cut, vr, small, dk = -1, rot = 0) {
    const pm = PREM(), food = FOOD[v], g = Math.max(1, Math.round(P * gapK)), R = P * (pm ? ((spec.premiumOpts || {}).R ?? 0.17) : spec.radius ? spec.radius(food) : RK);
    const [l, t, r, b] = massBox(P, pad, mask, g), rd = radii(mask, cut, R), C = (u) => pad + u * P;
    if (pm && !spec.noShadow) { if (!(mask & S) || !(mask & E)) { const e = P + 2 * pad; x.save(); x.beginPath(); x.rect(mask & W ? pad : 0, mask & N ? pad : 0, (mask & E ? pad + P : e) - (mask & W ? pad : 0), (mask & S ? pad + P : e) - (mask & N ? pad : 0)); x.clip();
      rrect(x, l, t, r, b, rd); x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = P * 0.13; x.shadowOffsetX = P * 0.03; x.shadowOffsetY = P * 0.075; x.fillStyle = 'rgba(10,6,4,1)'; x.fill(); x.restore(); } }
    else if (!(mask & S) && !spec.noShadow) { rrect(x, l + 1, t + P * 0.05, r - 1, b + P * 0.05, rd); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fill(); }
    rrect(x, l, t, r, b, rd); x.save(); x.clip();
    const band = (y0, h, col) => { x.fillStyle = col; x.fillRect(l - 2, y0, r - l + 4, h); };
    spec.paint(x, food, { rot, shape: CELLS[TYPES[v - 1]] ? CELLS[TYPES[v - 1]][rot] : null, dr: dk >= 0 ? dk >> 2 : 0, dn: dk >= 0 ? (dk & 3) + 1 : 1, P, pad, mask, cut, vr, small, l, t, r, b, rd, C, band, hash, poly, rrect, radii, sprites: () => sprites(P), N, E, S, W, v, premium: pm });
    if (cut) { x.fillStyle = spec.cutCol || 'rgba(255,240,225,0.35)'; const k = Math.max(1, P * 0.035); if (cut & N) x.fillRect(l, t, r - l, k); if (cut & S) x.fillRect(l, b - k, r - l, k); }
    if (pm) premiumFinish(x, food, P, pad, mask, cut, vr, small, l, t, r, b, rd, v);
    else if (!spec.noPlanes) { if (!(mask & W)) { x.fillStyle = 'rgba(255,255,255,0.1)'; x.fillRect(l, t, P * 0.06, b - t); } if (!(mask & E)) { x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(r - P * 0.06, t, P * 0.06, b - t); } }
    x.restore();
    if (spec.diag) { // concave corners: cut the gap square that the two overlapping neighbours would otherwise leave filled
      const q0 = pad + g, q1 = pad + P - g, e = P + 2 * pad, cutR = (x0, y0, x1, y1) => { x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000'; x.fillRect(x0, y0, x1 - x0, y1 - y0); x.restore(); };
      if ((mask & N) && (mask & W) && !(mask & 128)) cutR(0, 0, q0, q0);
      if ((mask & N) && (mask & E) && !(mask & 16)) cutR(q1, 0, e, q0);
      if ((mask & S) && (mask & W) && !(mask & 64)) cutR(0, q1, q0, e);
      if ((mask & S) && (mask & E) && !(mask & 32)) cutR(q1, q1, e, e);
    }
    if (spec.post) spec.post(x, food, { P, pad, mask, cut, vr, small, l, t, r, b, C, hash, N, E, S, W, v, premium: pm }); // unclipped extras (drips hanging below the mass)
  }
  const caches = new Map();
  const vkOf = spec.vkey || ((food, vr) => vr % 4);
  function pre(v, P, mask, cut, vr, small, dk = -1, rot = 0) {
    let m = caches.get(P); if (!m) { if (caches.size > 8) caches.delete(caches.keys().next().value); m = new Map(); caches.set(P, m); }
    const pm = PREM(), vk = pm && spec.premiumVkey ? spec.premiumVkey(FOOD[v], vr) : vkOf(FOOD[v], vr), key = v + ':' + mask + ':' + cut + ':' + vk + (small ? 's' : '') + (spec.depth ? ':' + dk : '') + (spec.shape ? ':r' + rot : '') + (pm ? ':p' : '');
    let c = m.get(key); if (c) return c;
    const pad = Math.max(2, Math.ceil(P * (pm ? Math.max(0.2, spec.padK || 0) : spec.padK || 0.08))); c = makeCanvas(P + 2 * pad, P + 2 * pad); c.pad = pad;
    paint(c.getContext('2d'), v, P, pad, mask, cut, pm && spec.premiumVkey ? vk * 13 + 1 : spec.vpaint ? spec.vpaint(FOOD[v], vk) : vk * 13 + 1, !!small, spec.depth ? dk : -1, spec.shape ? rot : 0); m.set(key, c); return c;
  }
  const isSmall = (s) => s < 18;
  const GL = spec.glisten || {};
  function cell(c, v, s, d, mask, cut, vr, seed, T, wob, alpha, gx = 0, gy = 0, dk = -1, rot = 0) {
    const P = Math.max(4, Math.round(s * d)), cv = pre(v, P, mask, cut, vr, isSmall(s), dk, rot), k = s / P, pad = cv.pad * k;
    c.drawImage(cv, -s / 2 - pad, -s / 2 - pad, s + 2 * pad, s + 2 * pad);
    const food = FOOD[v];
    if (spec.live) spec.live(c, food, { rot, shape: CELLS[TYPES[v - 1]] ? CELLS[TYPES[v - 1]][rot] : null, dk, dr: dk >= 0 ? dk >> 2 : 0, dn: dk >= 0 ? (dk & 3) + 1 : 1, s, P, k, mask, cut, vr, seed, T, wob, alpha: alpha ?? 1, spr: sprites(P), small: isSmall(s), hash, gx, gy, v, premium: PREM() });
    if (isSmall(s)) return;
    const gs = GL[food];
    if (gs) { const ph = (T * 0.3 + seed * 0.137) % 2.4; if (ph < 1) { const g = sprites(P).glint, a = Math.sin(ph * Math.PI); c.globalAlpha = (alpha ?? 1) * a * gs; c.globalCompositeOperation = 'lighter'; c.drawImage(g, (ph - 0.5) * s * 0.7 - s * 0.36, -s * 0.42 + ph * s * 0.15, s * 0.72, s * 0.72); c.globalCompositeOperation = 'source-over'; c.globalAlpha = alpha ?? 1; } }
  }
  function maskIn(cells, x, y) { const has = (a, b) => cells.some(([p, q]) => p === a && q === b); return (has(x, y - 1) ? N : 0) | (has(x + 1, y) ? E : 0) | (has(x, y + 1) ? S : 0) | (has(x - 1, y) ? W : 0) | (spec.diag ? (has(x + 1, y - 1) ? 16 : 0) | (has(x + 1, y + 1) ? 32 : 0) | (has(x - 1, y + 1) ? 64 : 0) | (has(x - 1, y - 1) ? 128 : 0) : 0); }
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
  const now = () => performance.now() / 1000;
  const SOFT = spec.soft || {};
  function pieceWobble(v, m, T) {
    const food = FOOD[v], soft = SOFT[food] ?? 1;
    const a = m ? now() - m.born : 9; let sq = 0;
    if (a < 1.4) sq = Math.exp(-a * (soft > 1.3 ? 4.2 : 5.5)) * Math.cos(a * (soft > 1.3 ? 15 : 20)) * 0.13 * soft;
    const idle = Math.sin(T * 2.1 + (m ? m.pid : 0) * 1.7) * 0.006 * soft;
    return { sx: 1 + sq * 0.7 - idle * 0.5, sy: 1 - sq + idle, wob: Math.abs(sq) * 4, age: a };
  }
  const ripC = new Map();
  let lastRows = null, parts = [], lastT = 0;
  function board(c, g, s, d, T, st, FXm) {
    const clearing = g.state === 'clearing', ct = clearing ? g.clearT / CLEAR_TIME : 0, over = g.state === 'over', M = g.meta;
    ripC.clear();
    if (clearing && g.clearRows !== lastRows) { lastRows = g.clearRows; spawnClear(g, s, d, T); }
    const pidAt = (x, y) => (M && M[y] && M[y][x] ? M[y][x].pid : -(y * 100 + x + 1));
    const span = new Map(); if (spec.depth && M) for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) { const q = g.board[y][x] && M[y] && M[y][x]; if (!q) continue; const o = span.get(q.pid); if (o) { o[0] = Math.min(o[0], y); o[1] = Math.max(o[1], y); } else span.set(q.pid, [y, y]); }
    const dkAt = (m, y) => { const o = m && span.get(m.pid); return o ? Math.min(3, y - o[0]) * 4 + Math.min(3, o[1] - o[0]) : -1; };
    const dkCells = (cells, qy) => { let a = 9, b = -9; for (const q of cells) { a = Math.min(a, q[1]); b = Math.max(b, q[1]); } return Math.min(3, qy - a) * 4 + Math.min(3, b - a); };
    for (let y = 0; y < ROWS; y++) {
      const isClr = clearing && g.clearRows.includes(y);
      for (let x = 0; x < COLS; x++) {
        const v = g.board[y][x]; if (!v) continue;
        const m = M && M[y] ? M[y][x] : null, pid = pidAt(x, y);
        const mask = (y > 0 && g.board[y - 1][x] && pidAt(x, y - 1) === pid ? N : 0) | (x < COLS - 1 && g.board[y][x + 1] && pidAt(x + 1, y) === pid ? E : 0) | (y < ROWS - 1 && g.board[y + 1][x] && pidAt(x, y + 1) === pid ? S : 0) | (x > 0 && g.board[y][x - 1] && pidAt(x - 1, y) === pid ? W : 0) | (spec.diag ? ((y > 0 && x < COLS - 1 && g.board[y - 1][x + 1] && pidAt(x + 1, y - 1) === pid ? 16 : 0) | (y < ROWS - 1 && x < COLS - 1 && g.board[y + 1][x + 1] && pidAt(x + 1, y + 1) === pid ? 32 : 0) | (y < ROWS - 1 && x > 0 && g.board[y + 1][x - 1] && pidAt(x - 1, y + 1) === pid ? 64 : 0) | (y > 0 && x > 0 && g.board[y - 1][x - 1] && pidAt(x - 1, y - 1) === pid ? 128 : 0)) : 0);
        let w = m ? ripC.get(m.pid) : null; if (!w) { const o = FXm.cell(m ? m.pcx - 0.5 : x, m ? m.pby - 1 : y); w = { k: o.k, dy: o.dy, sx: o.sx, sy: o.sy }; if (m) ripC.set(m.pid, w); }
        const pw = pieceWobble(v, m, T);
        let cx = x * s + s / 2, cy = y * s + s / 2 + w.dy * s; const sx = pw.sx * (1 + (w.sx - 1) * 0.6), sy = pw.sy * (1 + (w.sy - 1) * 0.6), al = over ? 0.45 : 1;
        if (m) { cx += (x + 0.5 - m.pcx) * s * (sx - 1); cy += (y + 0.5 - m.pby) * s * (sy - 1); }
        if (isClr) { const kq = clamp(ct / 0.25, 0, 1); if (kq >= 1) continue; c.save(); c.translate(cx, cy); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.6 * (1 - kq); c.fillStyle = spec.flash || '#fff4dc'; roundRect(c, -s / 2, -s / 2, s, s, s * 0.25); c.fill(); c.restore(); continue; }
        c.save(); c.translate(cx, cy); c.scale(sx, sy); c.globalAlpha = al;
        cell(c, v, s, d, mask, m ? m.cut || 0 : 0, m ? (m.lx & 3) + 4 * (m.ly & 3) : x & 1, m ? m.pid * 3.7 + x + y * 2 : x * 1.7 + y * 3.1, T, pw.wob + Math.abs(w.k) * 0.5, al, x, y, dkAt(m, y), m && m.rot ? m.rot : 0);
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
      if (PREM()) { c.shadowColor = 'rgba(0,0,0,0.35)'; c.shadowBlur = s * 0.25; c.shadowOffsetY = s * 0.08; } else { c.shadowColor = rgba(col, 0.45); c.shadowBlur = s * 0.45; }
      for (const [qx, qy] of cells) { c.save(); c.translate((p.x + qx) * s + s / 2, (p.y + qy) * s + s / 2); cell(c, v, s, d, maskIn(cells, qx, qy), 0, (qx & 3) + 4 * (qy & 3), (p.x + qx) * 1.7 + qy * 3.1 + 50, T, wob, 1, p.x + qx, p.y + qy, dkCells(cells, qy), p.rot); c.restore(); if (c.shadowBlur) { c.shadowBlur = 0; c.shadowOffsetY = 0; } }
      if (g.grounded()) { c.globalCompositeOperation = 'lighter'; c.globalAlpha = (g.lockTimer / LOCK_DELAY) * 0.35; for (const [qx, qy] of cells) { c.save(); c.translate((p.x + qx) * s + s / 2, (p.y + qy) * s + s / 2); const P = Math.round(s * d), cv = pre(v, P, maskIn(cells, qx, qy), 0, (qx & 3) + 4 * (qy & 3), isSmall(s), dkCells(cells, qy), p.rot), kk = s / P, pad = cv.pad * kk; c.drawImage(cv, -s / 2 - pad, -s / 2 - pad, s + 2 * pad, s + 2 * pad); c.restore(); } }
      c.restore();
    }
  }
  /* ---------- line clear particles ---------- */
  function spawnClear(g, s, d, T) {
    for (const y of g.clearRows) for (let x = 0; x < COLS; x++) {
      const v = g.board[y][x]; if (!v) continue; const food = FOOD[v], dir = x < 4.5 ? -1 : 1, X = x * s + s / 2, Y = y * s + s / 2, dl = Math.abs(x - 4.5) * 0.025, r = (i) => hash(x, y, i);
      const Mm = g.meta && g.meta[y] ? g.meta[y][x] : null, vr = Mm ? (Mm.lx & 3) + 4 * (Mm.ly & 3) : x & 1;
      const push = (o) => parts.push(Object.assign({ dl }, o));
      const done = spec.clear ? spec.clear(food, { v, X, Y, s, dir, r, dl, vr, push, x, y }) : false;
      if (!done) push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1.5 + r(3) * 2), life: 0.85, vrr: vr });
      for (let i = 0; i < 2; i++) parts.push({ k: 'spark', x: X + (r(i + 20) - 0.5) * s, y: Y + (r(i + 21) - 0.5) * s, life: 0.35 + r(i) * 0.2, dl: dl * 0.5 });
    }
    lastT = 0;
  }
  const HOLDS = { slide: 1, roll: 1, squish: 1, pop: 1, melt: 1 };
  function drawParts(c, s, d, T) {
    const t = now(), dt = lastT ? Math.min(0.05, t - lastT) : 0.016; lastT = t; if (!parts.length) return;
    const P = Math.max(4, Math.round(s * d)), o = sprites(P), kk = s / P;
    for (const p of parts) {
      if (p.dl > 0) { p.dl -= dt; if (HOLDS[p.k]) { c.save(); c.translate(p.x, p.y); cell(c, p.v, s, d, 0, 0, p.vr ?? p.vrr ?? 0, 3, T, 0, 1); c.restore(); } continue; }
      p.t = (p.t || 0) + dt; const u = p.t / p.life; if (u >= 1) continue;
      if (p.vx !== undefined) { p.vx *= p.k === 'slide' ? 1 + dt * 3 : 1; p.x += p.vx * dt; p.vy += s * (p.g ?? (p.k === 'slide' ? 6 : 14)) * dt; p.y += p.vy * dt; }
      const al = u < 0.6 ? 1 : 1 - (u - 0.6) / 0.4; c.save(); c.globalAlpha = al; c.translate(p.x, p.y);
      if (!(spec.partDraw && spec.partDraw(c, p, u, al, { s, d, T, o, kk, dt, cell: (vv, vr) => cell(c, vv, s, d, 0, 0, vr, 3, T, 0, al) })))
        switch (p.k) {
          case 'spr': { p.rot = (p.rot || 0) + (p.vr || 0) * dt; c.rotate(p.rot); const im = o[p.img]; if (im) c.drawImage(im, -im.width * kk / 2, -im.height * kk / 2, im.width * kk, im.height * kk); break; }
          case 'dot': c.fillStyle = p.col; c.beginPath(); c.arc(0, 0, s * (p.r || 0.08), 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(-s * 0.025, -s * 0.025, s * (p.r || 0.08) * 0.35, 0, TAU); c.fill(); break;
          case 'crumb': c.fillStyle = p.col; c.rotate(u * 6 + (p.rot || 0)); c.fillRect(-s * 0.08, -s * 0.06, s * 0.16, s * 0.12); break;
          case 'pop': { const sc = 1 + u * 0.5; c.scale(sc, sc); c.globalAlpha = al * (1 - u); cell(c, p.v, s, d, 0, 0, p.vr, 3, T, 0, 1 - u); break; }
          case 'squish': { const q = Math.sin(Math.min(1, u * 1.8) * Math.PI); c.scale(1 + q * 0.45 - u * 0.5, 1 - q * 0.35 - u * 0.55); cell(c, p.v, s, d, 0, 0, p.vr, 3, T, 0, al); break; }
          case 'melt': { c.translate(0, u * s * 0.3); c.scale(1 + u * 0.5, 1 - u * 0.75); cell(c, p.v, s, d, 0, 0, p.vr, 3, T, 0, al); break; }
          case 'roll': p.rot += (p.vx / (s * 0.45)) * dt; c.rotate(p.rot); c.scale(0.92, 0.92); cell(c, p.v, s, d, 0, 0, p.vrr, 3, T, 0, al); break;
          case 'slide': p.rot += p.vr * dt; c.rotate(p.rot); cell(c, p.v, s, d, 0, 0, p.vrr, 3, T, 0, al); break;
          case 'bubble': { c.strokeStyle = `rgba(255,255,255,${0.8 * (1 - u)})`; c.lineWidth = Math.max(1, s * 0.03); c.beginPath(); c.arc(0, 0, s * (p.r || 0.07) * (1 + u * 0.4), 0, TAU); c.stroke(); break; }
          case 'spark': { const rr = s * (0.1 + u * 0.35); c.strokeStyle = `rgba(255,244,210,${1 - u})`; c.lineWidth = Math.max(1, s * 0.05); c.beginPath(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; c.moveTo(Math.cos(a) * rr * 0.4, Math.sin(a) * rr * 0.4); c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.stroke(); break; }
        }
      c.restore();
    }
    parts = parts.filter((p) => p.dl > 0 || (p.t || 0) < p.life);
  }
  function mini(c, type, cx, cy, cs, alpha, T, d) {
    const cells = CELLS[type][0], xs = cells.map((q) => q[0]), ys = cells.map((q) => q[1]);
    const w = Math.max(...xs) - Math.min(...xs) + 1, h = Math.max(...ys) - Math.min(...ys) + 1, ox = cx - (w * cs) / 2 - Math.min(...xs) * cs, oy = cy - (h * cs) / 2 - Math.min(...ys) * cs, v = TYPES.indexOf(type) + 1;
    c.save(); c.globalAlpha = alpha;
    for (const [x, y] of cells) { c.save(); c.translate(ox + x * cs + cs / 2, oy + y * cs + cs / 2); const b = Math.sin(T * 2 + x + cx * 0.05) * 0.008; c.scale(1 - b, 1 + b); cell(c, v, cs, d, maskIn(cells, x, y), 0, (x & 3) + 4 * (y & 3), x * 1.7 + y * 3.1 + cx * 0.01 + cy * 0.02, T, 0, alpha, x, y, Math.min(3, y - Math.min(...ys)) * 4 + Math.min(3, h - 1)); c.restore(); }
    c.restore();
  }
  const api = { board, mini, cell, pre, paint, FOOD, MAIN, maskIn, sprites, hash };
  api.skin = () => ({ base(x, t, P) { paint(x, t, P, 0, 0, 0, 1, P < 20); }, live: null, mass: api, noFace: true });
  return api;
}
