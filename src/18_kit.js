/* ================= World kit: shared helpers for the food-tour worlds (10+) =================
   Brush signage, paper lanterns, noren, string lights, neon, perspective floors, wood grain, speech bubbles,
   temporary event actors, and skin helpers (plates, bowls, skewers, cups, glaze, sheen). */
const Kit = (() => {
  const K = {};
  K.JF = (s) => `${s}px ${JP_FONT}`;
  // brush text: horizontal (default) or vertical (o.v). Optional stroke/glow.
  K.jp = (c, txt, x, y, size, col, o = {}) => {
    c.save(); c.font = K.JF(size); c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
    if (o.glow) { c.shadowColor = o.glow; c.shadowBlur = size * (o.blur || 0.5); }
    const chars = [...txt];
    if (o.v) { chars.forEach((ch, i) => { if (o.stroke) { c.strokeStyle = o.stroke; c.lineWidth = size * 0.12; c.strokeText(ch, x, y + i * size * (o.sp || 1.02)); } c.fillStyle = col; c.fillText(ch, x, y + i * size * (o.sp || 1.02)); }); }
    else { if (o.stroke) { c.strokeStyle = o.stroke; c.lineWidth = size * 0.12; c.strokeText(txt, x, y); } c.fillStyle = col; c.fillText(txt, x, y); }
    c.restore();
  };
  K.txt = (c, s, x, y, sz, col, al = 'center', font = 'bold', fam = 'Arial, sans-serif') => { c.font = `${font} ${sz}px ${fam}`; c.textAlign = al; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(s, x, y); };
  // red paper lantern (chōchin) with ribs and a brush character; lit glows from inside
  K.lantern = (c, x, y, r, col, txt, t, lit, o = {}) => {
    const sw = Math.sin(t * 1.3 + x * 0.01) * 0.04 * (o.sway ?? 1);
    c.save(); c.translate(x, y); c.rotate(sw);
    c.strokeStyle = '#2a1a10'; c.lineWidth = Math.max(1, r * 0.04); c.beginPath(); c.moveTo(0, -r * 1.7); c.lineTo(0, -r * 1.25); c.stroke();
    c.fillStyle = '#1a1210'; c.fillRect(-r * 0.5, -r * 1.3, r, r * 0.16); c.fillRect(-r * 0.5, r * 1.14, r, r * 0.16);
    const g = c.createRadialGradient(-r * 0.2, -r * 0.2, r * 0.1, 0, 0, r * 1.2);
    g.addColorStop(0, lit > 0.3 ? shade(col, 0.55) : shade(col, 0.2)); g.addColorStop(0.6, col); g.addColorStop(1, shade(col, -0.45));
    ellipse(c, 0, 0, r * 0.95, r * 1.18); c.fillStyle = g; c.fill();
    c.strokeStyle = rgba(shade(col, -0.5), 0.5); c.lineWidth = Math.max(0.5, r * 0.025);
    for (let k = -4; k <= 4; k++) { c.beginPath(); c.ellipse(0, k * r * 0.25, r * 0.95 * Math.sqrt(1 - (k / 4.8) ** 2), r * 0.06, 0, 0, Math.PI); c.stroke(); }
    if (txt) K.jp(c, txt, 0, 0, r * (txt.length > 1 ? 0.62 : 0.95), o.ink || '#1a0a06', { v: txt.length > 1, sp: 1 });
    if (lit > 0.05) { c.globalCompositeOperation = 'lighter'; c.fillStyle = radial(c, 0, 0, r * 2.6, [[0, `rgba(255,170,90,${0.35 * lit})`], [1, 'rgba(255,120,60,0)']]); c.fillRect(-r * 2.6, -r * 2.6, r * 5.2, r * 5.2); }
    c.restore();
  };
  // noren curtain panels with brush text
  K.noren = (c, x0, y0, w, h, col, txt, t, o = {}) => {
    const n = o.n || Math.max(2, [...(txt || '')].length || 3), pw = w / n, chars = [...(txt || '')];
    for (let i = 0; i < n; i++) { const sw = Math.sin(t * 1.6 + i * 0.9) * (o.wind ? 5 : 1.4) * (h / 80);
      c.save(); c.beginPath(); c.moveTo(x0 + i * pw + 1, y0); c.lineTo(x0 + (i + 1) * pw - 1, y0); c.lineTo(x0 + (i + 1) * pw - 1 + sw, y0 + h); c.lineTo(x0 + i * pw + 1 + sw, y0 + h); c.closePath();
      c.fillStyle = linear(c, x0 + i * pw, 0, x0 + (i + 1) * pw, 0, [[0, shade(col, -0.25)], [0.5, col], [1, shade(col, -0.3)]]); c.fill();
      if (chars[i]) K.jp(c, chars[i], x0 + (i + 0.5) * pw + sw * 0.5, y0 + h * 0.42, Math.min(pw * 0.72, h * 0.5), o.ink || '#f6f0e4');
      c.restore(); }
    c.fillStyle = o.rod || '#3a2414'; c.fillRect(x0 - 4, y0 - 3, w + 8, 4);
  };
  // string of bulbs between two points, with sag
  K.lights = (c, x0, y0, x1, y1, n, sag, t, lit, cols = ['#ffd890']) => {
    c.strokeStyle = 'rgba(30,24,20,0.8)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sag * 2, x1, y1); c.stroke();
    for (let i = 0; i <= n; i++) { const k = i / n, x = (1 - k) ** 2 * x0 + 2 * k * (1 - k) * (x0 + x1) / 2 + k * k * x1, y = (1 - k) ** 2 * y0 + 2 * k * (1 - k) * ((y0 + y1) / 2 + sag * 2) + k * k * y1;
      const col = cols[i % cols.length], f = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7);
      ellipse(c, x, y + 3, 2.2, 3); c.fillStyle = lit > 0.2 ? col : shade(col, -0.4); c.fill();
      if (lit > 0.2) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = radial(c, x, y + 3, 16, [[0, rgba(col, 0.5 * lit * f)], [1, rgba(col, 0)]]); c.fillRect(x - 16, y - 13, 32, 32); c.restore(); } }
  };
  // neon tube text with flicker
  K.neon = (c, txt, x, y, size, col, t, o = {}) => {
    const fl = o.flicker && Math.sin(t * 23 + x) > 0.97 ? 0.3 : 1, on = (o.on ?? 1) * fl;
    c.save(); c.font = o.jp ? K.JF(size) : `${o.weight || 'bold'} ${size}px ${o.fam || '"Brush Script MT", "Segoe Script", cursive'}`; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
    if (on > 0.2) { c.shadowColor = col; c.shadowBlur = size * 0.6 * on; c.strokeStyle = rgba(col, 0.6 * on); c.lineWidth = size * 0.12; c.strokeText(txt, x, y); }
    c.fillStyle = on > 0.2 ? shade(col, 0.6) : shade(col, -0.5); c.fillText(txt, x, y); c.restore();
  };
  // perspective floor: kind 'tile' | 'wood' | 'check' | 'stone' | 'tatami'
  K.floor = (x, V, fy, c1, c2, kind = 'tile', rows = 9, cols = 18) => {
    const W = V.W, H = V.H, rnd = mulberry32(77);
    x.fillStyle = c1; x.fillRect(0, fy, W, H - fy);
    for (let r = 0; r < rows; r++) { const y0 = fy + (H - fy) * Math.pow(r / rows, 1.3), y1 = fy + (H - fy) * Math.pow((r + 1) / rows, 1.3), sp0 = 1 + r * 0.05;
      if (kind === 'wood') { x.fillStyle = shade(c1, (rnd() - 0.5) * 0.12); x.fillRect(0, y0, W, y1 - y0); x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(0, y1 - 1, W, 1); for (let q = 0; q < 6; q++) { const sx = rnd() * W; x.fillRect(sx, y0, 1, y1 - y0); } x.strokeStyle = 'rgba(60,30,10,0.08)'; for (let q = 0; q < 4; q++) { x.beginPath(); const yy = y0 + (y1 - y0) * rnd(); x.moveTo(0, yy); x.bezierCurveTo(W * 0.3, yy + 2, W * 0.6, yy - 2, W, yy); x.stroke(); } continue; }
      for (let q = -2; q < cols + 2; q++) { const xa = W / 2 + (q * W / cols - W / 2) * sp0, xb = W / 2 + ((q + 1) * W / cols - W / 2) * sp0;
        if (kind === 'stone') { x.fillStyle = shade(c1, (rnd() - 0.5) * 0.18); roundRect(x, xa + 2, y0 + 1.5, xb - xa - 4, y1 - y0 - 3, 4); x.fill(); continue; }
        if (kind === 'tatami') { x.fillStyle = shade((q + r) % 2 ? c1 : c2, (rnd() - 0.5) * 0.05); x.fillRect(xa, y0, xb - xa, y1 - y0); x.fillStyle = '#2a3a2a'; x.fillRect(xa, y0, 2, y1 - y0); continue; }
        x.fillStyle = (kind === 'check' ? (q + r) % 2 : (q + r) % 2 && rnd() < 2) ? shade(c2, (rnd() - 0.5) * 0.08) : shade(c1, (rnd() - 0.5) * 0.06); x.fillRect(xa + 1, y0 + 1, xb - xa - 2, y1 - y0 - 1.5); } }
    x.fillStyle = linear(x, 0, fy, 0, H, [[0, 'rgba(255,255,255,0.08)'], [1, 'rgba(0,0,0,0.18)']]); x.fillRect(0, fy, W, H - fy);
  };
  K.wood = (x, x0, y0, w, h, base, o = {}) => { const rnd = mulberry32(o.seed || 5); x.fillStyle = base; x.fillRect(x0, y0, w, h);
    if (o.planks) for (let k = 0; k < w; k += o.planks) { x.fillStyle = shade(base, (rnd() - 0.5) * 0.14); x.fillRect(x0 + k, y0, o.planks - 1, h); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(x0 + k + o.planks - 1, y0, 1, h); }
    x.strokeStyle = 'rgba(40,20,5,0.12)'; x.lineWidth = 1; for (let k = 0; k < h / 3; k++) { const yy = y0 + rnd() * h; x.beginPath(); x.moveTo(x0, yy); x.bezierCurveTo(x0 + w * 0.3, yy + rnd() * 4 - 2, x0 + w * 0.7, yy + rnd() * 4 - 2, x0 + w, yy); x.stroke(); } };
  // speech bubbles for everyone with a.say = { txt, t, jp? }
  K.bubbles = (ctx, V, dt, col = '#2a1a10', bg = 'rgba(255,255,255,0.96)') => {
    const u = V.u;
    V.staff.concat(V.agents).forEach((s) => { const sy = s.say; if (!sy || sy.t <= 0) return; sy.t -= dt;
      const a = Math.min(1, sy.t * 2), top = s.sitting ? s.y - 34 * V.sc : s.y - 126 * V.sc * (s.spec && s.spec.k || 1), x = s.x, y = top - 26 * u;
      ctx.save(); ctx.globalAlpha = a; const sz = (sy.sz || 14) * u; ctx.font = sy.jp ? K.JF(sz * 1.1) : `bold ${sz}px Arial, sans-serif`;
      const w = ctx.measureText(sy.txt).width + 18 * u; ctx.fillStyle = sy.bg || bg; roundRect(ctx, x - w / 2, y - 14 * u, w, 25 * u, 10 * u); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - 5 * u, y + 10 * u); ctx.lineTo(x + 1 * u, y + 18 * u); ctx.lineTo(x + 6 * u, y + 10 * u); ctx.fill();
      ctx.fillStyle = sy.col || col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sy.txt, x, y - 1.5 * u); ctx.restore(); });
  };
  // temporary event actor: a staff-like agent running a one-off script; removed when it sets s.gone
  K.actor = (V, spec, life) => { const s = V.addStaff(Object.assign({ role: 'idle', floor: true, idle: [['stand', 99]] }, spec, { life: function* (s) { yield* life(s); s.gone = true; } })); return s; };
  K.sweep = (V) => { V.staff = V.staff.filter((s) => !s.gone); };
  // cached static canvas built at current size (for outdoor worlds that need art between sky and staff)
  K.layer = (V, key, fn) => { const k = key + V.W + 'x' + V.H; if (!V.S['_L' + key] || V.S['_L' + key].k !== k) { const [c, x] = hiCanvas(V.W, V.H, V.D); fn(x, V); V.S['_L' + key] = { k, c }; } return V.S['_L' + key].c; };
  K.A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
  K.glowAt = (ctx, x, y, r, col, a) => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = radial(ctx, x, y, r, [[0, rgba(col, a)], [1, rgba(col, 0)]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); };
  K.SFX = (k) => { try { if (AudioEngine.sfx.ev) AudioEngine.sfx.ev(k); } catch (e) {} };
  K.fireworks = (ctx, V, F, dt, x0, y0, w, h) => { // F: state array; spawns & draws shells inside a clip rect
    F.t = (F.t || 0) - dt; if (F.t <= 0) { F.t = 0.5 + Math.random() * 0.8; const col = pick(['#ff5a6a', '#ffd040', '#6ae0ff', '#c890ff', '#7aff9a', '#ffffff']); const cx = x0 + w * rand(0.15, 0.85), cy = y0 + h * rand(0.15, 0.5), n = 36; for (let i = 0; i < n; i++) { const a = i / n * TAU; F.push({ x: cx, y: cy, vx: Math.cos(a) * rand(40, 60) * V.u, vy: Math.sin(a) * rand(40, 60) * V.u, l: 1.6, col }); } K.SFX('pop'); }
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); ctx.globalCompositeOperation = 'lighter';
    for (let i = F.length - 1; i >= 0; i--) { const p = F[i]; p.l -= dt; if (p.l <= 0) { F.splice(i, 1); continue; } p.vy += 30 * V.u * dt; p.x += p.vx * dt; p.y += p.vy * dt; ctx.fillStyle = rgba(p.col, Math.min(1, p.l)); ctx.fillRect(p.x, p.y, 2 * V.u, 2 * V.u); }
    ctx.restore(); };
  /* ---- skin helpers (block sprites, P = cell px) ---- */
  K.plate = (x, P, col = '#f6f4ee', rim = '#d8d4cc', cy = 0.62, rx = 0.42, ry = 0.17) => { ellipse(x, P * 0.5, P * (cy + 0.02), P * rx, P * ry); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fill(); ellipse(x, P * 0.5, P * cy, P * rx, P * ry); x.fillStyle = linear(x, 0, P * (cy - ry), 0, P * (cy + ry), [[0, col], [1, rim]]); x.fill(); ellipse(x, P * 0.5, P * cy, P * rx * 0.72, P * ry * 0.68); x.strokeStyle = 'rgba(0,0,0,0.08)'; x.lineWidth = P * 0.01; x.stroke(); };
  K.bowl = (x, P, col, inner, cy = 0.5, w = 0.4, d = 0.34) => { // bowl rim at cy, body below
    x.beginPath(); x.moveTo(P * (0.5 - w), P * cy); x.bezierCurveTo(P * (0.5 - w), P * (cy + d), P * (0.5 + w), P * (cy + d), P * (0.5 + w), P * cy); x.closePath();
    x.fillStyle = linear(x, P * (0.5 - w), 0, P * (0.5 + w), 0, [[0, shade(col, -0.35)], [0.35, shade(col, 0.15)], [1, shade(col, -0.45)]]); x.fill();
    ellipse(x, P * 0.5, P * cy, P * w, P * w * 0.28); x.fillStyle = inner || shade(col, 0.3); x.fill(); };
  K.sheen = (x, cx, cy, rx, ry, a = 0.6, rot = -0.4) => { x.save(); x.globalCompositeOperation = 'lighter'; ellipse(x, cx, cy, rx, ry, rot); x.fillStyle = radial(x, cx, cy, Math.max(rx, ry), [[0, `rgba(255,255,255,${a})`], [1, 'rgba(255,255,255,0)']]); x.fill(); x.restore(); };
  K.blob = (x, cx, cy, r, n, wob, seed) => { const rnd = mulberry32(seed || 3); x.beginPath(); for (let i = 0; i <= n; i++) { const a = i / n * TAU, rr = r * (1 + (rnd() - 0.5) * wob); const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr; i ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); };
  K.speck = (x, rnd, x0, y0, w, h, n, col, s) => { x.fillStyle = col; for (let i = 0; i < n; i++) x.fillRect(x0 + rnd() * w, y0 + rnd() * h, s, s * (0.6 + rnd() * 0.6)); };
  K.skewer = (x, P, x0, x1, y) => { x.strokeStyle = '#d8b880'; x.lineWidth = P * 0.03; x.lineCap = 'round'; x.beginPath(); x.moveTo(P * x0, P * y); x.lineTo(P * x1, P * y); x.stroke(); x.strokeStyle = 'rgba(120,80,30,0.5)'; x.lineWidth = P * 0.01; x.stroke(); };
  K.bg = (x, P, col, o = {}) => { SkinKit.tile(x, P, shade(col, o.l ?? 0.22), shade(col, o.d ?? -0.35), 0.14); x.strokeStyle = o.rim || 'rgba(255,255,255,0.25)'; x.lineWidth = P * 0.015; roundRect(x, P * 0.06, P * 0.06, P * 0.88, P * 0.88, P * 0.1); x.stroke(); };
  K.steamLive = (ctx, s, T, st, x = 0, y = -0.3, a = 0.3) => { if (!st.top) return; const ph = (T * 0.4 + st.ph * 0.13) % 1; ctx.globalAlpha = Math.sin(ph * Math.PI) * a; ctx.fillStyle = '#fff'; ellipse(ctx, (x + Math.sin(T + st.ph) * 0.08) * s, (y - ph * 0.6) * s, s * 0.1 * (1 + ph), s * 0.07 * (1 + ph)); ctx.fill(); ctx.globalAlpha = 1; };
  K.danger = () => (typeof Mood !== 'undefined' ? Mood.danger : 0);
  return K;
})();
