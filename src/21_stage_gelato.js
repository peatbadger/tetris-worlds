/* ================= World: Gelateria — a real customer flow ================= */
const GELATO_FLAVORS = [['Pistacchio', '#a8c878', 'nut'], ['Stracciatella', '#fbf6ea', 'choc'], ['Fragola', '#f6a0b4', 'berry'], ['Mango', '#ffb43a', 'mango'], ['Limone', '#fbec8a', 'zest'], ['Cioccolato', '#6a3a1c', 'chip'], ['Nocciola', '#c8945a', 'nut'], ['Mirtillo', '#a07ac8', 'blue'],
  ['Bubblegum', '#7ac8f0', 'sprinkle'], ['Tiramisù', '#d8b890', 'cocoa'], ['Cocco', '#f6f2ea', 'flake'], ['Caffè', '#8a5a3a', 'bean'], ['Amarena', '#f2dce0', 'cherry'], ['Fior di latte', '#fffbf2', 'mint'], ['Lampone', '#e84a7a', 'berry'], ['Menta', '#a8e8c8', 'chip'],
  ['Bacio', '#7a4a2a', 'nut'], ['Pesca', '#ffc8a0', 'mango'], ['Melone', '#f8b878', 'mint'], ['Caramello', '#d89a4a', 'drizzle'], ['Banana', '#f8e8a0', 'flake'], ['Ricotta e fichi', '#f4ece0', 'fig']];
function makeGelatoStage() {
  let W, H, D, u, sc;
  let wall, caseBack, caseFront, vignette;
  const FL = GELATO_FLAVORS;
  let tins = [];
  const counter = { cust: null, phase: 'idle', order: null };
  const register = { cust: null, done: null };
  let agents = [], staff = {}, seats = [], Q, spawnT = 0, lastEv = 0, extras = [], ev, confetti = [];
  const rnd = mulberry32(42);
  const X = (f) => f * W;
  const laneY = () => H * 0.972;

  function buildWall() {
    const [c, x] = hiCanvas(W, H, D);
    x.fillStyle = '#f6e6ec'; x.fillRect(0, 0, W, H);
    const ts = 26 * u;
    for (let ty = 0; ty < H * 0.6; ty += ts) for (let tx = 0; tx < W; tx += ts) {
      const k = (Math.floor(tx / ts) + Math.floor(ty / ts)) % 4;
      x.fillStyle = ['#f8d8e2', '#d4efe6', '#fbeed2', '#e2dcf4'][k]; x.fillRect(tx + 1, ty + 1, ts - 2, ts - 2);
      x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(tx + 2, ty + 2, ts - 6, 2 * u);
    }
    x.fillStyle = linear(x, 0, 0, 0, 18 * u, [[0, '#ffffff'], [1, '#e8d8c8']]); x.fillRect(0, 0, W, 16 * u);
    // chalkboard menu
    const bx = X(0.025), by = H * 0.06, bw = X(0.29), bh = H * 0.25;
    x.fillStyle = '#6a4a2a'; roundRect(x, bx - 8 * u, by - 8 * u, bw + 16 * u, bh + 16 * u, 4 * u); x.fill();
    x.fillStyle = linear(x, 0, by, 0, by + bh, [[0, '#2a3430'], [1, '#1a2220']]); x.fillRect(bx, by, bw, bh);
    x.fillStyle = 'rgba(255,255,255,0.05)'; for (let k = 0; k < 40; k++) x.fillRect(bx + rnd() * bw, by + rnd() * bh, 30 * u * rnd(), 1);
    x.textAlign = 'center'; x.fillStyle = '#fbf6ea'; x.font = `italic bold ${22 * u}px Georgia, serif`; x.fillText('Gelato artigianale', bx + bw / 2, by + 30 * u);
    x.font = `${12.5 * u}px Georgia, serif`; x.textAlign = 'left';
    [['Coppetta / Cono', '1 gusto  3.50'], ['', '2 gusti  4.80'], ['', '3 gusti  6.00'], ['Cono waffle', '+ 1.00'], ['Affogato', '5.50']].forEach(([a, b], i) => { x.fillStyle = '#f6c8d8'; x.fillText(a, bx + 14 * u, by + 58 * u + i * 19 * u); x.fillStyle = '#fbf6ea'; x.textAlign = 'right'; x.fillText(b, bx + bw - 60 * u, by + 58 * u + i * 19 * u); x.textAlign = 'left'; });
    x.strokeStyle = '#f6c8d8'; x.lineWidth = 2 * u; x.beginPath(); x.moveTo(bx + bw - 40 * u, by + bh - 46 * u); x.lineTo(bx + bw - 30 * u, by + bh - 14 * u); x.lineTo(bx + bw - 20 * u, by + bh - 46 * u); x.stroke(); x.beginPath(); x.arc(bx + bw - 30 * u, by + bh - 52 * u, 10 * u, Math.PI * 0.95, Math.PI * 2.05); x.stroke();
    // shop sign
    const sx = X(0.72), sy = H * 0.085;
    x.fillStyle = 'rgba(0,0,0,0.15)'; roundRect(x, sx - 150 * u + 4 * u, sy - 26 * u + 5 * u, 300 * u, 56 * u, 28 * u); x.fill();
    x.fillStyle = linear(x, 0, sy - 26 * u, 0, sy + 30 * u, [[0, '#ff9ac0'], [1, '#e8608a']]); roundRect(x, sx - 150 * u, sy - 26 * u, 300 * u, 56 * u, 28 * u); x.fill();
    x.strokeStyle = '#ffffff'; x.lineWidth = 3 * u; x.stroke();
    Decor.sign(x, sx, sy + 2 * u, 'Gelateria Dolce Vita', `italic bold ${26 * u}px Georgia, serif`, '#ffffff', 'rgba(150,30,70,0.6)');
    // shelf: cone stacks + sprinkle jars
    const shx = X(0.5), shw = X(0.46), shy = H * 0.3;
    x.fillStyle = '#ffffff'; x.fillRect(shx, shy, shw, 6 * u); x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(shx, shy + 6 * u, shw, 3 * u);
    for (let k = 0; k < 9; k++) {
      const jx = shx + 20 * u + k * shw / 9;
      if (k % 3 === 0) { x.beginPath(); x.moveTo(jx - 10 * u, shy - 48 * u); x.lineTo(jx + 10 * u, shy - 48 * u); x.lineTo(jx + 2 * u, shy); x.lineTo(jx - 2 * u, shy); x.closePath(); x.fillStyle = '#d8a050'; x.fill(); x.strokeStyle = 'rgba(120,70,20,0.5)'; x.lineWidth = 1; for (let s = 0; s < 8; s++) { x.beginPath(); x.moveTo(jx - 10 * u, shy - 48 * u + s * 5 * u); x.lineTo(jx + 10 * u, shy - 48 * u + s * 5 * u); x.stroke(); } }
      else { const jc = ['#f6a0b4', '#7ac8f0', '#f8e078', '#a8e8c8', '#c8a0e8'][k % 5]; roundRect(x, jx - 11 * u, shy - 32 * u, 22 * u, 32 * u, 4 * u); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fill(); x.strokeStyle = 'rgba(150,150,160,0.6)'; x.lineWidth = 1; x.stroke(); for (let s = 0; s < 40; s++) { x.fillStyle = Looks.pickR(rnd, ['#ff5a8a', '#5ab0ff', '#ffd040', '#6ad08a', '#ffffff', jc]); x.fillRect(jx - 9 * u + rnd() * 18 * u, shy - 20 * u + rnd() * 18 * u, 2.4 * u, 1.2 * u); } x.fillStyle = '#e8608a'; x.fillRect(jx - 12 * u, shy - 36 * u, 24 * u, 5 * u); }
    }
    // left back counter (waffle station)
    const cy = H * 0.56;
    x.fillStyle = linear(x, 0, cy, 0, H * 0.8, [[0, '#ffffff'], [0.05, '#f2f0ee'], [1, '#d8d0cc']]); x.fillRect(0, cy, X(0.44), H * 0.25);
    x.fillStyle = '#e8a0b8'; for (let k = 0; k < 16; k++) x.fillRect(k * X(0.44) / 16, cy + 30 * u, X(0.44) / 32, H * 0.2);
    x.fillStyle = linear(x, 0, cy - 8 * u, 0, cy + 4 * u, [[0, '#f8f6f4'], [0.5, '#d8d4d0'], [1, '#a8a4a0']]); x.fillRect(0, cy - 8 * u, X(0.44), 12 * u);
    x.strokeStyle = 'rgba(150,150,160,0.3)'; x.lineWidth = 1; for (let k = 0; k < 8; k++) { x.beginPath(); x.moveTo(rnd() * X(0.44), cy - 8 * u); x.bezierCurveTo(rnd() * X(0.44), cy - 4 * u, rnd() * X(0.44), cy, rnd() * X(0.44), cy + 4 * u); x.stroke(); }
    Decor.checker(x, 0, H * 0.8, W, H * 0.2, 7, '#f4ece6', '#e8b8c8', W / 2);
    x.fillStyle = 'rgba(255,255,255,0.08)'; for (let k = 0; k < 300; k++) x.fillRect(rnd() * W, H * 0.8 + rnd() * H * 0.2, 2 * u, 2 * u);
    // door frame (glass drawn live with the street view)
    x.fillStyle = '#e8608a'; x.fillRect(0, H * 0.34, X(0.065), H * 0.64);
    x.fillStyle = '#d8d8d8'; x.fillRect(X(0.054), H * 0.62, 4 * u, 30 * u);
    // shop window frame
    x.fillStyle = '#ffffff'; x.fillRect(X(0.085), H * 0.33, X(0.2), H * 0.2);
    return c;
  }
  function tinGelato(x, cx, cy, w, h, f, i) {
    const [name, col, top] = f, r2 = mulberry32(i * 31 + 7);
    x.fillStyle = linear(x, cx - w / 2, 0, cx + w / 2, 0, [[0, '#9aa4ae'], [0.5, '#e8eef2'], [1, '#8a949e']]); roundRect(x, cx - w / 2, cy - h * 0.15, w, h, 2 * u); x.fill();
    x.beginPath(); x.moveTo(cx - w / 2 + 2 * u, cy);
    for (let k = 0; k <= 8; k++) { const xx = cx - w / 2 + 2 * u + k * (w - 4 * u) / 8, yy = cy - h * (0.35 + 0.35 * Math.sin(k / 8 * Math.PI)) - (k % 2) * h * 0.12; x.quadraticCurveTo(xx - (w / 16), yy - h * 0.1, xx, yy); }
    x.lineTo(cx + w / 2 - 2 * u, cy); x.closePath();
    x.fillStyle = linear(x, 0, cy - h * 0.9, 0, cy, [[0, shade(col, 0.3)], [0.5, col], [1, shade(col, -0.2)]]); x.fill();
    x.strokeStyle = rgba(shade(col, -0.25), 0.5); x.lineWidth = 1; for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(cx - w * 0.4 + k * w * 0.2, cy - h * 0.2); x.quadraticCurveTo(cx - w * 0.3 + k * w * 0.2, cy - h * 0.7, cx - w * 0.2 + k * w * 0.2, cy - h * 0.3); x.stroke(); }
    x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 1.2 * u; x.beginPath(); x.arc(cx - w * 0.1, cy - h * 0.55, w * 0.18, Math.PI * 1.1, Math.PI * 1.6); x.stroke();
    const dots = (n, c1, sz = 2.2) => { for (let k = 0; k < n; k++) { x.fillStyle = typeof c1 === 'function' ? c1() : c1; x.fillRect(cx - w * 0.35 + r2() * w * 0.7, cy - h * (0.3 + r2() * 0.55), sz * u, sz * u * 0.8); } };
    if (top === 'nut') dots(14, () => (r2() < 0.6 ? '#5a8a2a' : '#b88a50'), 2.4);
    if (top === 'choc' || top === 'chip') dots(12, '#2a140a', 2);
    if (top === 'berry') { ellipse(x, cx, cy - h * 0.85, 5 * u, 4.4 * u); x.fillStyle = '#e02040'; x.fill(); x.fillStyle = '#3a9a3a'; ellipse(x, cx - 3 * u, cy - h * 0.98, 3 * u, 1.4 * u, 0.6); x.fill(); x.strokeStyle = 'rgba(200,20,50,0.7)'; x.lineWidth = 1.6 * u; x.beginPath(); x.moveTo(cx - w * 0.35, cy - h * 0.3); x.quadraticCurveTo(cx, cy - h * 0.7, cx + w * 0.35, cy - h * 0.35); x.stroke(); }
    if (top === 'mango') for (let k = 0; k < 3; k++) { x.fillStyle = '#ffc020'; x.fillRect(cx - 8 * u + k * 6 * u, cy - h * 0.85 + (k % 2) * 3 * u, 4 * u, 4 * u); }
    if (top === 'zest') { ellipse(x, cx + 3 * u, cy - h * 0.82, 6 * u, 6 * u); x.fillStyle = '#f6d830'; x.fill(); ellipse(x, cx + 3 * u, cy - h * 0.82, 4.6 * u, 4.6 * u); x.fillStyle = '#fff6a0'; x.fill(); }
    if (top === 'blue') for (let k = 0; k < 5; k++) { ellipse(x, cx - w * 0.3 + r2() * w * 0.6, cy - h * (0.4 + r2() * 0.4), 2.4 * u, 2.4 * u); x.fillStyle = '#3a3a8a'; x.fill(); }
    if (top === 'sprinkle') dots(22, () => Looks.pickR(r2, ['#ff5a8a', '#ffd040', '#6ad08a', '#ffffff']), 2.4);
    if (top === 'cocoa') dots(60, 'rgba(90,50,20,0.8)', 1.2);
    if (top === 'flake') dots(14, '#ffffff', 2.6);
    if (top === 'bean') for (let k = 0; k < 4; k++) { ellipse(x, cx - w * 0.25 + k * w * 0.17, cy - h * 0.6, 2.6 * u, 1.8 * u, 0.5); x.fillStyle = '#3a1a08'; x.fill(); }
    if (top === 'cherry') { x.strokeStyle = 'rgba(120,10,30,0.8)'; x.lineWidth = 2 * u; x.beginPath(); x.moveTo(cx - w * 0.35, cy - h * 0.4); x.bezierCurveTo(cx - w * 0.1, cy - h * 0.9, cx + w * 0.1, cy - h * 0.2, cx + w * 0.35, cy - h * 0.55); x.stroke(); ellipse(x, cx, cy - h * 0.82, 3.6 * u, 3.6 * u); x.fillStyle = '#8a0a1a'; x.fill(); }
    if (top === 'mint') { x.fillStyle = '#3aa04a'; ellipse(x, cx, cy - h * 0.86, 4 * u, 2 * u, 0.5); x.fill(); ellipse(x, cx + 3 * u, cy - h * 0.9, 4 * u, 2 * u, -0.6); x.fill(); }
    if (top === 'drizzle') { x.strokeStyle = '#a8601a'; x.lineWidth = 1.4 * u; x.beginPath(); for (let k = 0; k < 6; k++) x.lineTo(cx - w * 0.35 + k * w * 0.14, cy - h * (k % 2 ? 0.5 : 0.75)); x.stroke(); }
    if (top === 'fig') { ellipse(x, cx, cy - h * 0.8, 5 * u, 4 * u); x.fillStyle = '#7a2a5a'; x.fill(); ellipse(x, cx, cy - h * 0.8, 3 * u, 2.4 * u); x.fillStyle = '#e86a7a'; x.fill(); }
    const tw = Math.min(w * 0.95, 64 * u), tx = cx - tw / 2, ty = cy + h * 0.72;
    x.fillStyle = '#ffffff'; roundRect(x, tx, ty, tw, 13 * u, 3 * u); x.fill(); x.strokeStyle = col === '#fbf6ea' || col === '#fffbf2' || col === '#f6f2ea' ? '#d8c8b0' : col; x.lineWidth = 1.5 * u; x.stroke();
    x.fillStyle = '#5a2a3a'; x.font = `italic ${Math.min(9.5 * u, tw / name.length * 1.7)}px Georgia, 'Brush Script MT', cursive`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, cx, ty + 7 * u);
  }
  function buildCase() {
    const [c, x] = hiCanvas(W, H, D);
    const x0 = X(0.44), x1 = W + 10 * u, top = H * 0.555, base = H * 0.69;
    x.fillStyle = linear(x, 0, top, 0, base, [[0, '#cfd8de'], [1, '#8a98a4']]); x.fillRect(x0, top, x1 - x0, base - top);
    tins = [];
    const n = 11, tw = (x1 - x0 - 20 * u) / n;
    for (let row = 0; row < 2; row++) for (let i = 0; i < n; i++) {
      const idx = row * n + i, f = FL[idx % FL.length];
      const cx = x0 + 10 * u + tw * (i + 0.5) + (row ? tw * 0.25 : 0), cy = row ? H * 0.645 : H * 0.6;
      tins.push({ x: cx, y: cy - (row ? 18 : 12) * u, f });
      if (row === 0) tinGelato(x, cx, cy, tw * 0.9, 24 * u, f, idx);
    }
    for (let i = 0; i < n; i++) { const t = tins[n + i]; tinGelato(x, t.x, H * 0.645, tw * 0.94, 28 * u, t.f, n + i); }
    x.fillStyle = linear(x, 0, base, 0, H * 0.82, [[0, '#f8b8cc'], [1, '#d8708e']]); x.fillRect(x0, base, x1 - x0, H * 0.82 - base);
    x.fillStyle = 'rgba(255,255,255,0.25)'; for (let k = 0; k < 24; k++) x.fillRect(x0 + k * (x1 - x0) / 24, base + 8 * u, 2 * u, H * 0.1);
    x.fillStyle = linear(x, 0, H * 0.79, 0, H * 0.82, [[0, '#f0f4f8'], [1, '#8a949e']]); x.fillRect(x0, H * 0.79, x1 - x0, H * 0.03);
    x.fillStyle = linear(x, 0, base - 6 * u, 0, base + 6 * u, [[0, '#ffffff'], [1, '#aab4be']]); x.fillRect(x0, base - 4 * u, x1 - x0, 8 * u);
    return c;
  }
  function buildGlass() {
    const [c, x] = hiCanvas(W, H, D);
    const x0 = X(0.44), x1 = W + 10 * u, top = H * 0.535, base = H * 0.69;
    x.beginPath(); x.moveTo(x0, base); x.bezierCurveTo(x0, top + 6 * u, x0 + 10 * u, top, x0 + 30 * u, top); x.lineTo(x1, top); x.lineTo(x1, base); x.closePath();
    x.fillStyle = 'rgba(210,235,250,0.10)'; x.fill();
    x.fillStyle = linear(x, 0, top, 0, base, [[0, 'rgba(255,255,255,0.35)'], [0.15, 'rgba(255,255,255,0.05)'], [0.6, 'rgba(255,255,255,0.0)'], [1, 'rgba(255,255,255,0.12)']]); x.fill();
    for (let k = 0; k < 6; k++) { const sx = x0 + 60 * u + k * (x1 - x0) / 6; x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.moveTo(sx, top + 4 * u); x.lineTo(sx + 26 * u, top + 4 * u); x.lineTo(sx - 10 * u, base - 4 * u); x.lineTo(sx - 30 * u, base - 4 * u); x.closePath(); x.fill(); }
    x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 2 * u; x.beginPath(); x.moveTo(x0 + 30 * u, top); x.lineTo(x1, top); x.stroke();
    // sampling spoons cup on top of the case + napkins
    x.fillStyle = '#ffffff'; roundRect(x, X(0.47), top - 22 * u, 16 * u, 22 * u, 3 * u); x.fill(); x.strokeStyle = '#e8608a'; x.lineWidth = 1.4 * u; x.stroke();
    for (let k = 0; k < 7; k++) { x.strokeStyle = ['#f6a0b4', '#7ac8f0', '#f8e078', '#a8e8c8'][k % 4]; x.lineWidth = 1.6 * u; x.beginPath(); x.moveTo(X(0.47) + 3 * u + k * 1.6 * u, top - 20 * u); x.lineTo(X(0.47) + 1 * u + k * 2 * u, top - 34 * u); x.stroke(); }
    // register at the right end
    x.fillStyle = '#2a2a30'; roundRect(x, X(0.925), top - 10 * u, X(0.08), 12 * u, 3 * u); x.fill();
    return c;
  }
  function table(ctx, cx, cy) {
    const u0 = u; { const u = u0 * 1.5; return tableS(ctx, cx, cy, u); } }
  function tableS(ctx, cx, cy, u) {
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ellipse(ctx, cx, H * 0.985, 46 * u, 7 * u); ctx.fill();
    ctx.fillStyle = '#3a3a40'; ctx.fillRect(cx - 3 * u, cy, 6 * u, H * 0.98 - cy); ellipse(ctx, cx, H * 0.98, 22 * u, 4 * u); ctx.fill();
    ellipse(ctx, cx, cy, 52 * u, 13 * u); ctx.fillStyle = linear(ctx, cx - 52 * u, 0, cx + 52 * u, 0, [[0, '#d8d4d0'], [0.4, '#ffffff'], [1, '#c8c4c0']]); ctx.fill();
    ctx.fillStyle = '#b8b4b0'; ctx.fillRect(cx - 52 * u, cy, 104 * u, 4 * u);
    ctx.strokeStyle = 'rgba(150,150,160,0.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 30 * u, cy - 5 * u); ctx.quadraticCurveTo(cx, cy + 4 * u, cx + 34 * u, cy - 2 * u); ctx.stroke();
    ctx.fillStyle = '#e8e8ec'; ctx.fillRect(cx - 6 * u, cy - 12 * u, 12 * u, 10 * u); ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 5 * u, cy - 16 * u, 10 * u, 6 * u);
  }
  function chair(ctx, cx, cy, dir) { chairS(ctx, cx, cy, dir, u * 1.5); }
  function chairS(ctx, cx, cy, dir, u) {
    ctx.strokeStyle = '#3a2416'; ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - dir * 22 * u, cy - 10 * u); ctx.quadraticCurveTo(cx - dir * 30 * u, cy - 70 * u, cx - dir * 6 * u, cy - 74 * u); ctx.quadraticCurveTo(cx + dir * 14 * u, cy - 72 * u, cx + dir * 10 * u, cy - 30 * u); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx - dir * 6 * u, cy - 48 * u, 12 * u, 0, TAU); ctx.lineWidth = 2 * u; ctx.stroke();
  }
  /* ---------------- people & their flow ---------------- */
  function newCustomer(opt = {}) {
    const seed = Math.floor(Math.random() * 1e6);
    const P = People.make(Looks.random(mulberry32(seed), opt.look || {}), sc, D);
    const a = Crowd.agent(P, -X(0.06), laneY(), { speed: 80 + Math.random() * 25, seed });
    a.flav = [Looks.pickR(Math.random, FL), Looks.pickR(Math.random, FL), Looks.pickR(Math.random, FL)];
    Life.arrival(a);
    Crowd.run(a, (opt.life || customerLife)(a));
    agents.push(a); return a;
  }
  function* shakeOff(a) { if (a.snowT > 0) { yield ['walk', X(0.09), laneY()]; a.act = 'brush'; a.actT = 0; yield ['wait', 1.4]; a.snowT = 0; } if (a.umbrella && a.wetT > 0) { yield ['walk', X(0.09), laneY()]; a.act = 'stand'; yield ['wait', 0.5]; a.wetT = 0; } }
  function* customerLife(a) {
    a.mood = 'smile';
    yield* shakeOff(a);
    yield* Crowd.waitInQueue(Q, a);
    counter.cust = a; counter.phase = 'greet';
    a.look = staff.scoop.x + 40 * u; a.act = 'point'; a.actT = 0; yield ['wait', 1.8];
    counter.phase = 'sample'; a.act = 'stand';
    yield ['until', () => counter.phase === 'tasting'];
    a.act = 'taste'; a.actT = 0; yield ['wait', 2.4];
    a.mood = Math.random() < 0.7 ? 'big' : 'smile'; a.act = 'point'; a.actT = 0; yield ['wait', 1.3];
    const n = 1 + Math.floor(Math.random() * 3), cone = Math.random() < 0.65;
    counter.order = { n, cone, flav: a.flav }; counter.phase = 'scoop'; a.act = 'stand'; a.look = staff.scoop.x;
    yield ['until', () => counter.phase === 'handover'];
    a.scoops = n; a.cone = cone; a.drip = 0;
    const treat = (c, x, y) => (a.cone ? Items.cone(a.scoops, a.flav.map((f) => f[1]), a.drip) : Items.cup(a.scoops, a.flav.map((f) => f[1])))(c, x, y);
    a.item2 = treat; a.act = 'take'; a.actT = 0; yield ['wait', 1.1];
    counter.phase = 'idle'; counter.cust = null; Q.leave(a);
    // step out of the line to pay — the queue moves up behind
    const umb = a.item; a.item = treat; a.item2 = null; a.act = 'walk';
    yield ['walk', X(0.955), H * 0.99];
    a.act = 'pay'; a.actT = 0; a.item2 = Math.random() < 0.5 ? Items.card : Items.cash; a.look = X(0.96); register.cust = a;
    yield ['until', () => register.done === a];
    a.item2 = treat; a.item = umb; a.act = 'walk'; a.look = null; a.mood = 'big';
    const free = seats.filter((s) => !s.who && !s.reserved);
    const seat = free.length && Math.random() < 0.8 ? free[Math.floor(Math.random() * free.length)] : null;
    if (seat) { seat.who = a; yield ['walk', seat.x, H * 0.995]; a.sitting = true; a.x = seat.x; a.y = seat.y; a.face = seat.dir; a.look = seat.x + seat.dir * 60 * u; }
    else { yield ['walk', X(0.36) + Math.random() * X(0.05), H * 0.955]; a.face = -1; }
    while (a.scoops > 0) {
      a.act = 'lick'; a.actT = 0;
      for (let k = 0; k < 3; k++) { yield ['wait', 1]; if (Math.random() < 0.15) a.drip = 1; }
      a.scoops--; a.drip = 0;
      a.act = Math.random() < 0.5 ? 'talk' : 'hold'; a.actT = 0; yield ['wait', 1.2 + Math.random() * 1.5];
    }
    if (a.cone) { a.act = 'bite'; a.actT = 0; a.item2 = Items.cone(0, ['#fff'], 0); yield ['wait', 2.8]; }
    a.item2 = Items.napkin; a.act = 'hold';
    if (seat) { a.sitting = false; a.y = H * 0.995; seat.who = null; }
    a.look = null; a.mood = 'smile';
    yield ['walk', X(0.05), H * 0.978]; a.face = -1;
    a.act = 'hold'; a.actT = 0; yield ['wait', 0.5]; a.item2 = null; a.act = 'stand'; yield ['wait', 0.3];
    yield ['walk', -X(0.08), H * 0.978];
  }
  function makeStaff() {
    const scP = People.make({ skin: 'olive', hair: 'black', hairStyle: 'short', acc: { hat: 'paper', band: '#e8608a', mustache: true }, top: { type: 'apron', col: '#f8c8d8', shirt: '#ffffff', stains: 1 }, sleeves: 'short', eyes: '#3a2414' }, sc, D);
    const caP = People.make({ skin: 'light', hair: 'auburn', hairStyle: 'pony', female: true, lashes: true, lips: '#d0606a', acc: { earrings: '#e8c050', ribbon: '#e8608a' }, top: { type: 'apron', col: '#a8e8c8', shirt: '#ffffff' }, sleeves: 'short', pants: '#3a3a48', shoe: '#f2f2f2' }, sc, D);
    const waP = People.make({ skin: 'brown', hair: 'dbrown', hairStyle: 'curly', female: true, lashes: true, acc: { hat: 'hairnet', earrings: '#d8d8e0' }, top: { type: 'apron', col: '#fbe0a0', shirt: '#ffffff' }, sleeves: 'short' }, sc * 0.95, D);
    staff.scoop = Crowd.agent(scP, X(0.82), H * 0.5, { sitting: true });
    staff.cash = Crowd.agent(caP, X(0.965), H * 0.49, { sitting: true });
    staff.waffle = Crowd.agent(waP, X(0.19), H * 0.47, { sitting: true });
    Crowd.run(staff.scoop, scooperLife(staff.scoop)); Crowd.run(staff.cash, cashierLife(staff.cash)); Crowd.run(staff.waffle, waffleLife(staff.waffle));
  }
  function* scooperLife(s) {
    while (true) {
      s.act = 'wipe'; s.actT = 0;
      yield ['until', () => counter.cust && counter.phase === 'greet'];
      s.act = 'greet'; s.actT = 0; s.look = counter.cust.x; yield ['until', () => counter.phase === 'sample'];
      s.target = tins[Math.floor(Math.random() * tins.length)]; s.act = 'dip'; s.actT = 0; yield ['wait', 0.8];
      s.act = 'offer'; s.actT = 0; yield ['wait', 0.7]; counter.phase = 'tasting';
      yield ['until', () => counter.phase === 'scoop'];
      const o = counter.order; s.hold = o.cone ? 'cone' : 'cup'; s.done = 0; s.flav = o.flav;
      for (let i = 0; i < o.n; i++) { s.target = tins.find((t) => t.f === o.flav[i]) || tins[i]; s.act = 'scoop'; s.actT = 0; yield ['wait', 1.4]; s.done = i + 1; }
      s.act = 'hand'; s.actT = 0; yield ['wait', 0.7]; counter.phase = 'handover';
      yield ['until', () => counter.phase === 'idle'];
      s.hold = null; s.done = 0; s.look = null;
    }
  }
  function* cashierLife(s) {
    while (true) {
      s.act = 'idle';
      yield ['until', () => register.cust || (ev && ev.on('closing'))];
      if (!register.cust) { // closing time: she grabs the mop
        s.sitting = false; s.x = X(0.9); s.y = H * 0.99; s.act = 'mop';
        yield ['walk', X(0.42), H * 0.99]; yield ['walk', X(0.88), H * 0.99];
        yield ['walk', X(0.965), H * 0.49 + 122 * sc]; s.sitting = true; s.x = X(0.965); s.y = H * 0.49; continue;
      }
      s.look = register.cust.x; s.act = 'greet'; s.actT = 0; yield ['wait', 0.6];
      s.act = 'ring'; s.actT = 0; yield ['wait', 1.4];
      register.done = register.cust; register.cust = null; s.act = 'wave'; s.actT = 0; yield ['wait', 1.2]; s.look = null;
    }
  }
  function* waffleLife(s) {
    s.coneCount = 4;
    while (true) {
      s.act = 'pour'; s.actT = 0; s.iron = 'open'; yield ['wait', 1.6];
      s.act = 'close'; s.actT = 0; s.iron = 'closed'; yield ['wait', 0.6];
      s.act = 'waitIron'; s.actT = 0; yield ['wait', 3.2];
      s.iron = 'open'; s.act = 'roll'; s.actT = 0; yield ['wait', 2.2];
      s.act = 'stack'; s.actT = 0; s.coneCount = s.coneCount >= 9 ? 4 : s.coneCount + 1; yield ['wait', 1.2];
    }
  }
  function staffPose(s, ps, t) {
    const k = s.actT, toLocal = (px, py) => [(px - s.x) / sc, (py - s.y) / sc];
    if (s.sitting) ps.legs = null;
    if (s === staff.scoop) {
      const coneHand = (c, x, y) => { const f = (s.flav || []).map((q) => q[1]); if (s.hold === 'cone') Items.cone(s.done, f, 0)(c, x, y); else if (s.hold === 'cup') Items.cup(s.done, f)(c, x, y); };
      ps.arms = [{ side: -1, x: -14, y: 30, grip: 'fist', item: s.hold ? coneHand : null }];
      if (s.act === 'wipe') { ps.arms.push({ side: 1, x: 12 + Math.sin(t * 3) * 12, y: 50, grip: 'open', handAng: 0.2 }); ps.face.mouth = 'smile'; ps.head.nod = 1; }
      else if (s.act === 'greet') { ps.arms.push({ side: 1, x: 22, y: -8 + Math.sin(t * 9) * 2, grip: 'open', handAng: -1.3 }); ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.6; ps.head.turn = 0.4; }
      else if (s.act === 'dip' || s.act === 'scoop') {
        const [tx, ty] = toLocal(s.target.x, s.target.y), c = Math.min(1, k / 1.2);
        const ph = c < 0.35 ? smooth(c / 0.35) : c < 0.75 ? 1 : 1 - smooth((c - 0.75) / 0.25);
        const curl = c > 0.35 && c < 0.75 ? Math.sin((c - 0.35) / 0.4 * Math.PI) : 0;
        ps.lean = 0.12 * ph; ps.head.nod = ph * 1.5; ps.face.lookY = 1; ps.head.turn = clamp(tx / 40, -0.8, 0.8);
        const ball = s.act === 'scoop' && c > 0.55 ? s.target.f[1] : null;
        ps.arms.push({ side: 1, x: lerp(14, tx, ph) + curl * 6, y: lerp(26, ty, ph) - curl * 4, grip: 'fist', handAng: -0.6 - curl * 1.4, item: (cc, x, y, ang) => { cc.save(); cc.translate(x, y); cc.rotate(ang); cc.fillStyle = '#d8dce0'; cc.fillRect(-2, -0.6, 10, 1.2); ellipse(cc, 9, 0, 3, 2.2); cc.fill(); if (ball) { ellipse(cc, 9, -2, 3.6, 3); cc.fillStyle = ball; cc.fill(); cc.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(cc, 8, -3.2, 1.2, 0.7); cc.fill(); } else if (s.act === 'dip' && c > 0.5) { ellipse(cc, 9, -1, 2, 1.4); cc.fillStyle = s.target.f[1]; cc.fill(); } cc.restore(); } });
      } else if (s.act === 'offer') { ps.arms.push({ side: 1, x: 32, y: 30, grip: 'fist', item: Items.spoon }); ps.face.mouth = 'big'; ps.head.turn = 0.5; }
      else if (s.act === 'hand') { ps.arms[0] = { side: -1, x: -4 + Math.min(1, k * 2) * 30, y: 28, grip: 'fist', item: coneHand }; ps.arms.push({ side: 1, x: 16, y: 44, grip: 'fist' }); ps.face.mouth = 'big'; ps.face.eyes = 'happy'; }
      else ps.arms.push({ side: 1, x: 16, y: 44, grip: 'fist' });
    } else if (s === staff.cash) {
      ps.arms = [{ side: -1, x: -16, y: 44, grip: 'fist' }];
      if (s.act === 'mop') { ps.legs = People.walkLegs(s.phase); ps.arms = [{ side: -1, x: -6 + Math.sin(t * 4) * 8, y: 30, grip: 'fist', item: (c, x, y) => { c.strokeStyle = '#c8a070'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y - 14); c.lineTo(x + 10, y + 70); c.stroke(); c.fillStyle = '#d8d8d0'; ellipse(c, x + 11, y + 72, 9, 3); c.fill(); } }, { side: 1, x: 2 + Math.sin(t * 4) * 8, y: 16, grip: 'fist' }]; ps.face.mouth = 'flat'; ps.face.lookY = 1; }
      else if (s.act === 'ring') { ps.arms.push({ side: 1, x: 6 + Math.sin(k * 14) * 3, y: 28 + Math.abs(Math.sin(k * 14)) * 2, grip: 'point' }); ps.face.lookY = 1; ps.head.nod = 1; }
      else if (s.act === 'wave') { ps.arms.push({ side: 1, x: -20, y: -10 + Math.sin(t * 9) * 2, grip: 'open', handAng: -1.8 }); ps.face.mouth = 'big'; ps.face.eyes = 'happy'; }
      else if (s.act === 'greet') { ps.arms.push({ side: 1, x: -12, y: 26, grip: 'open' }); ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.6; }
      else ps.arms.push({ side: 1, x: 10, y: 40, grip: 'fist' });
    } else {
      const ironX = (X(0.235) - s.x) / sc, ironY = (H * 0.545 - s.y) / sc + 6;
      if (s.act === 'pour') { ps.arms = [{ side: -1, x: -8, y: 30, grip: 'fist' }, { side: 1, x: ironX - 4, y: ironY - 14 + Math.sin(k * 3) * 2, grip: 'fist', item: (c, x, y) => { c.fillStyle = '#c0c0c8'; c.fillRect(x - 0.5, y - 8, 1, 8); ellipse(c, x, y + 1, 3.4, 2.2); c.fill(); if (k < 1.4) { c.fillStyle = '#f0d090'; c.fillRect(x - 0.4, y + 2, 0.8, 6); } } }]; ps.face.lookY = 1; ps.head.nod = 1.2; }
      else if (s.act === 'close') ps.arms = [{ side: -1, x: -10, y: 36, grip: 'fist' }, { side: 1, x: ironX + 4, y: ironY - 14 + k * 20, grip: 'fist' }];
      else if (s.act === 'roll') { ps.arms = [{ side: -1, x: -6, y: 26, grip: 'fist', item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(Math.sin(k * 6) * 0.3); c.beginPath(); c.moveTo(-5, -3); c.lineTo(5, -3); c.lineTo(0, 9); c.closePath(); c.fillStyle = '#d8a050'; c.fill(); c.restore(); } }, { side: 1, x: 6, y: 26 + Math.sin(k * 6) * 2, grip: 'open' }]; ps.face.mouth = 'smile'; ps.face.lookY = 1; }
      else if (s.act === 'stack') { ps.arms = [{ side: -1, x: -20 - Math.min(1, k) * 6, y: 32, grip: 'fist' }, { side: 1, x: 10, y: 40, grip: 'fist' }]; ps.head.turn = -0.6; }
      else { ps.arms = [{ side: -1, x: -12, y: 40, grip: 'fist' }, { side: 1, x: 12, y: 40, grip: 'fist' }]; ps.head.turn = Math.sin(t * 0.5) * 0.6; ps.face.mouth = 'smile'; }
    }
  }
  function drawWaffleIron(ctx, t) {
    const s = staff.waffle, cx = X(0.235), cy = H * 0.548;
    ctx.fillStyle = '#2a2a30'; roundRect(ctx, cx - 26 * u, cy - 4 * u, 52 * u, 10 * u, 3 * u); ctx.fill();
    ellipse(ctx, cx, cy - 4 * u, 22 * u, 6 * u); ctx.fillStyle = '#3a3a44'; ctx.fill();
    if (s.iron === 'open') { ctx.save(); ctx.translate(cx, cy - 6 * u); ctx.rotate(-1.1); ellipse(ctx, 0, -18 * u, 22 * u, 7 * u); ctx.fillStyle = '#4a4a54'; ctx.fill(); ctx.restore(); if (s.act === 'pour' || s.act === 'roll') { ellipse(ctx, cx, cy - 5 * u, 17 * u, 4 * u); ctx.fillStyle = s.act === 'roll' ? '#d8a050' : '#f0d090'; ctx.fill(); } }
    else { ellipse(ctx, cx, cy - 10 * u, 22 * u, 6 * u); ctx.fillStyle = '#4a4a54'; ctx.fill(); ctx.fillStyle = '#d82a2a'; ctx.fillRect(cx + 18 * u, cy - 2 * u, 3 * u, 3 * u); Decor.steamPuff(ctx, cx, cy - 12 * u, t, 0, u, 1.4); }
    for (let i = 0; i < (s.coneCount || 4); i++) { const hx = X(0.08), hy = cy - 4 * u - i * 5 * u; ctx.beginPath(); ctx.moveTo(hx - 9 * u, hy - 26 * u); ctx.lineTo(hx + 9 * u, hy - 26 * u); ctx.lineTo(hx, hy); ctx.closePath(); ctx.fillStyle = i % 2 ? '#d09040' : '#dca050'; ctx.fill(); ctx.strokeStyle = 'rgba(110,60,20,0.5)'; ctx.lineWidth = 0.8; ctx.stroke(); }
  }
  function drawRegister(ctx) {
    const rx = X(0.95), ry = H * 0.525;
    ctx.fillStyle = '#3a3a44'; roundRect(ctx, rx - 18 * u, ry - 28 * u, 36 * u, 28 * u, 3 * u); ctx.fill();
    ctx.fillStyle = '#1a1a20'; ctx.fillRect(rx - 14 * u, ry - 24 * u, 28 * u, 12 * u); ctx.fillStyle = register.cust ? '#7aff9a' : '#3a8a5a'; ctx.font = `bold ${8 * u}px monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(register.cust ? '€ 4,80' : '0,00', rx, ry - 15 * u);
    if (staff.cash.act === 'ring' && staff.cash.actT > 0.8) { ctx.fillStyle = '#8a8a94'; ctx.fillRect(rx - 16 * u, ry, 32 * u, 8 * u); ctx.fillStyle = '#6aa06a'; ctx.fillRect(rx - 12 * u, ry + 1 * u, 10 * u, 4 * u); }
  }
  function street(ctx, x, y, w, h, lights) { // piazza across the street seen through glass
    const r2 = mulberry32(7);
    for (let i = 0; i < 4; i++) { const bx = x + i * w / 3.4 - 6 * u, bh = h * (0.45 + r2() * 0.3); ctx.fillStyle = ['#d8a080', '#e8c8a0', '#c87a5a', '#e0b890'][i]; ctx.fillRect(bx, y + h - bh, w / 3.6, bh); for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 2; c2++) { ctx.fillStyle = lights > 0.4 && (i + r + c2) % 3 ? `rgba(255,210,130,${lights})` : 'rgba(60,70,90,0.6)'; ctx.fillRect(bx + 5 * u + c2 * 14 * u, y + h - bh + 6 * u + r * 16 * u, 7 * u, 10 * u); } }
    ctx.fillStyle = '#8a8a90'; ctx.fillRect(x, y + h - 8 * u, w, 8 * u);
  }
  /* ---------------- world events ---------------- */
  let cat = null, special = 0;
  function makeEvents() {
    ev = Amb.scheduler([
      { at: 0.1, name: 'cat', dur: 26, start() { cat = { x: -X(0.05), mode: 'walk', t: 0 }; }, end() { cat = null; } },
      { at: 0.22, name: 'tourgroup', dur: 3, start() { for (let i = 0; i < 4; i++) setTimeout(() => newCustomer({ look: { noHat: true, extra: { acc: { hat: 'cap', hatCol: '#e8302a', capLogo: '#fff' } } } }), i * 700); } },
      { at: 0.38, name: 'delivery', dur: 20, start() { const P = People.make({ skin: 'tan', hair: 'black', hairStyle: 'buzz', acc: { hat: 'cap', hatCol: '#2a5ab0' }, top: { type: 'polo', col: '#2a5ab0' }, sleeves: 'short', pants: '#3a3a3a' }, sc, D); const a = Crowd.agent(P, -X(0.06), H * 0.99, { speed: 50 }); a.extraPose = (ps) => { ps.under = (c) => Life.crates(c, 26, 122, 1, 3); }; Crowd.run(a, (function* () { a.act = 'walk'; yield ['walk', X(0.27), H * 0.99]; a.face = 1; a.act = 'talk'; a.actT = 0; a.look = staff.waffle.x; yield ['wait', 5]; a.act = 'wave'; yield ['wait', 1.5]; a.act = 'walk'; yield ['walk', -X(0.08), H * 0.99]; })()); agents.push(a); } },
      { at: 0.5, name: 'birthday', dur: 22, start() { for (let i = 0; i < 3; i++) { const g = newCustomer({ look: i === 2 ? { age: 'kid' } : {}, life: (a) => (function* () { a.act = 'walk'; yield ['walk', X(0.05 + i * 0.06), H * 0.985]; a.face = i === 2 ? -1 : 1; a.look = X(0.115); a.party = true; a.act = 'stand'; yield ['until', () => !ev.on('birthday') || ev.on('birthday').t > 5]; a.act = 'sing'; a.actT = 0; yield ['until', () => !ev.on('birthday') || ev.on('birthday').t > 13]; a.act = i === 2 ? 'cheer' : 'clap'; a.cheer = i === 2 ? 3 : 0; a.actT = 0; yield ['wait', 4]; a.act = 'walk'; a.look = null; yield ['walk', -X(0.08), H * 0.985]; })() }); g.x = -X(0.06) - i * 30 * u; } } },
      { at: 0.66, name: 'special', dur: 999, start() { special = 1; } },
      { at: 0.9, name: 'closing', dur: 999 },
    ]);
  }
  function resize(w, h, d) {
    if (w === W && h === H && d === D) return;
    W = w; H = h; D = d; u = H / 800; sc = u * 1.7;
    wall = buildWall(); caseBack = buildCase(); caseFront = buildGlass();
    vignette = (() => { const [c, x] = hiCanvas(W, H, 1); x.fillStyle = radial(x, W / 2, H * 0.5, Math.max(W, H) * 0.7, [[0, 'rgba(0,0,0,0)'], [0.7, 'rgba(0,0,0,0)'], [1, 'rgba(60,20,40,0.35)']]); x.fillRect(0, 0, W, H); return c; })();
    Q = Crowd.queue([0, 1, 2, 3, 4, 5, 6].map((i) => [X(0.875) - i * 64 * u, laneY() - i * 2 * u, X(0.85)]));
    seats = [[0.055, 1], [0.175, -1], [0.235, 1], [0.355, -1]].map(([f, dir]) => ({ x: X(f), y: H * 0.69, dir, who: null }));
    agents = []; staff = {}; makeStaff(); makeEvents();
    counter.cust = null; counter.phase = 'idle'; register.cust = null; register.done = null;
    for (let i = 0; i < 6; i++) { const a = newCustomer(); a.x = X(0.1) + i * 95 * u; }
    spawnT = 3;
  }
  function draw(ctx, t, dt, env) {
    dt = Math.min(dt, 0.05);
    const A = Amb.st, p = env.p || 0;
    ev.update(p, dt); if (p < 0.02 && ev.list.every((e) => e.fired)) { ev.reset(); special = 0; }
    for (const e of env.events || []) if (e.t > lastEv) { lastEv = e.t; agents.forEach((a) => { if (e.big) { if (Math.random() < 0.7) a.cheer = 1.6; } else if (Math.random() < 0.4) a.react = 1.0; }); if (e.big) { staff.scoop.cheer = 1.2; staff.waffle.cheer = 1.2; } }
    spawnT -= dt; if (spawnT <= 0 && agents.length < 4 + 8 * A.crowd && !ev.on('closing')) { newCustomer(); spawnT = (3 + Math.random() * 5) / Math.max(0.3, A.crowd); }
    agents.forEach((a) => { Crowd.update(a, dt, u); Life.tickWeather(a, dt); }); Object.values(staff).forEach((s) => Crowd.update(s, dt, u));
    agents = agents.filter((a) => !a.done);
    ctx.drawImage(wall, 0, 0, W, H);
    // live views outside: shop window + door glass
    Amb.sky(ctx, X(0.09), H * 0.338, X(0.19), H * 0.185, t, { city: street });
    ctx.fillStyle = '#ffffff'; ctx.fillRect(X(0.183), H * 0.338, 4 * u, H * 0.185); ctx.fillRect(X(0.09), H * 0.43, X(0.19), 3 * u);
    ctx.fillStyle = '#e8608a'; ctx.font = `italic bold ${12 * u}px Georgia, serif`; ctx.textAlign = 'center'; ctx.fillText('Gelato', X(0.135), H * 0.4);
    Amb.sky(ctx, X(0.008), H * 0.36, X(0.046), H * 0.46, t, {});
    ctx.fillStyle = A.lights > 0.5 && ev.on('closing') ? '#c84a4a' : '#3aa04a'; ctx.font = `bold ${8 * u}px sans-serif`; ctx.fillText(ev.on('closing') ? 'CHIUSO' : 'APERTO', X(0.031), H * 0.45);
    // specials board update
    if (special) { const bx = X(0.04), by = H * 0.22; ctx.fillStyle = '#f6d36a'; ctx.font = `italic ${12 * u}px Georgia, serif`; ctx.textAlign = 'left'; ctx.fillText('★ Gusto del giorno: Pistacchio di Bronte', bx, by); ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.5 * Math.sin(t * 4)})`; ctx.fillRect(bx - 6 * u, by - 10 * u, 3 * u, 3 * u); }
    // pendant lights — glow stronger at dusk/night, dimmed for closing
    const lit = clamp(0.25 + A.lights * 0.9 - (ev.on('closing') ? 0.4 : 0), 0.1, 1);
    [0.12, 0.3, 0.55, 0.72, 0.9].forEach((f, i) => {
      const lx = X(f), ly = H * 0.17 + (i % 2) * 14 * u, sw = Math.sin(t * 0.8 + i) * 2 * u * (1 + A.wind);
      ctx.strokeStyle = '#4a3a3a'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + sw, ly - 18 * u); ctx.stroke();
      const col = ['#ff9ac0', '#7ae0d0', '#ffd36a', '#c8a0f0', '#ff9ac0'][i];
      ctx.beginPath(); ctx.ellipse(lx + sw, ly, 22 * u, 20 * u, 0, Math.PI, 0); ctx.fillStyle = linear(ctx, lx - 22 * u, 0, lx + 22 * u, 0, [[0, shade(col, -0.25)], [0.4, shade(col, 0.3)], [1, shade(col, -0.2)]]); ctx.fill();
      ellipse(ctx, lx + sw, ly, 22 * u, 4 * u); ctx.fillStyle = mix('#c8c0b0', '#fff8e0', lit); ctx.fill();
    });
    drawWaffleIron(ctx, t);
    Crowd.draw(ctx, staff.waffle, t, sc, { tweak: (ps) => staffPose(staff.waffle, ps, t) });
    if (staff.cash.sitting) Crowd.draw(ctx, staff.cash, t, sc, { tweak: (ps) => staffPose(staff.cash, ps, t) });
    Crowd.draw(ctx, staff.scoop, t, sc, { noArms: true, tweak: (ps) => staffPose(staff.scoop, ps, t) });
    ctx.drawImage(caseBack, 0, 0, W, H);
    Crowd.draw(ctx, staff.scoop, t, sc, { only: 'arms', tweak: (ps) => staffPose(staff.scoop, ps, t) });
    ctx.drawImage(caseFront, 0, 0, W, H);
    drawRegister(ctx);
    // wet footprints / puddles when it rains or snows
    if (A.wet || A.weather === 'snow') { ctx.fillStyle = A.weather === 'snow' ? 'rgba(255,255,255,0.35)' : 'rgba(150,180,220,0.25)'; for (let i = 0; i < 6; i++) { ellipse(ctx, X(0.07 + i * 0.05), H * (0.93 + (i % 2) * 0.03), 22 * u, 5 * u); ctx.fill(); } }
    seats.forEach((s) => chair(ctx, s.x, H * 0.86, s.dir));
    agents.filter((a) => a.sitting).forEach((a) => Crowd.draw(ctx, a, t, sc, { noLegs: true }));
    [0.115, 0.295].forEach((f) => table(ctx, X(f), H * 0.84));
    const bd = ev.on('birthday');
    if (bd && bd.t > 3) { Life.cake(ctx, X(0.115), H * 0.825, u * 2, bd.t < 13, t); if (bd.t > 13 && bd.t < 13.1) for (let k = 0; k < 40; k++) confetti.push({ x: X(0.115), y: H * 0.75, vx: rand(-120, 120) * u, vy: rand(-260, -80) * u, c: Looks.pickR(Math.random, ['#ff5a8a', '#ffd040', '#6ad08a', '#5ab0ff']), life: 2 }); }
    // bin + umbrella stand by the door
    const bx = X(0.03), by = H * 0.99;
    ctx.fillStyle = linear(ctx, bx - 16 * u, 0, bx + 16 * u, 0, [[0, '#8a949e'], [0.5, '#e8eef2'], [1, '#7a848e']]); roundRect(ctx, bx - 16 * u, by - 52 * u, 32 * u, 52 * u, 4 * u); ctx.fill(); ctx.fillStyle = '#5a646e'; roundRect(ctx, bx - 18 * u, by - 56 * u, 36 * u, 7 * u, 3 * u); ctx.fill();
    if (cat) { cat.t += dt; const cx = cat.x; if (cat.t < 8) { cat.x += 40 * u * dt; cat.mode = 'walk'; } else if (cat.t < 18) cat.mode = cat.t % 4 < 2 ? 'sit' : 'groom'; else { cat.x -= 50 * u * dt; cat.mode = 'walk'; } Life.cat(ctx, cx, H * 0.995, u * 1.6, t, cat.mode, cat.t >= 18 ? -1 : 1, '#e8a050'); }
    if (!staff.cash.sitting) { Life.wetSign(ctx, X(0.4), H * 0.99, u * 1.6); }
    agents.filter((a) => !a.sitting).sort((p1, q) => p1.y - q.y).forEach((a) => Crowd.draw(ctx, a, t, sc));
    if (!staff.cash.sitting) Crowd.draw(ctx, staff.cash, t, sc, { tweak: (ps) => staffPose(staff.cash, ps, t) });
    confetti = confetti.filter((c) => (c.life -= dt) > 0); confetti.forEach((c) => { c.vy += 400 * u * dt; c.x += c.vx * dt; c.y += c.vy * dt; ctx.fillStyle = c.c; ctx.fillRect(c.x, c.y, 4 * u, 2.4 * u); });
    // light: pools under pendants + grade
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    [0.12, 0.3, 0.55, 0.72, 0.9].forEach((f, i) => { const r = 160 * u; ctx.fillStyle = radial(ctx, X(f), H * 0.2, r, [[0, `rgba(255,230,190,${(0.08 + 0.16 * lit) + 0.02 * Math.sin(t * 2 + i)})`], [1, 'rgba(255,220,180,0)']]); ctx.fillRect(X(f) - r, H * 0.2 - r, r * 2, r * 2); });
    ctx.fillStyle = `rgba(255,200,220,${(env.flash || 0) * 0.2})`; ctx.fillRect(0, 0, W, H);
    ctx.restore();
    Amb.grade(ctx, W, H, { indoor: true });
    ctx.drawImage(vignette, 0, 0, W, H);
  }
  return { resize, draw, selfGrade: true };
}

registerStage('gelato', makeGelatoStage);
