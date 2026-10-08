/* ================= World 2: Mike's Pastry, 300 Hanover St, North End, Boston (fan tribute) =================
   Pressed-tin ceiling, blue-and-white walls, warm terracotta floor, long glass cases packed with cannoli,
   lobster tails, sfogliatelle, eclairs, florentines and cookies; boxes tied with blue-and-white string
   pulled from spools hanging over the counter; a jostling crowd, a few round tables by the window. */
const Pastry = (() => { // small procedural pastries shared by the case, hands and boxes (local units ~ px)
  const P = {};
  P.cannoli = (c, x, y, s, end = '#fbf6ea', bits = 'choc', ang = 0) => {
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s);
    c.fillStyle = 'rgba(60,30,10,0.25)'; ellipse(c, 1, 5, 15, 3); c.fill();
    const g = c.createLinearGradient(0, -5, 0, 5); g.addColorStop(0, '#e8a860'); g.addColorStop(0.4, '#c8782e'); g.addColorStop(1, '#7a3c12');
    c.fillStyle = g; roundRect(c, -12, -4.6, 24, 9.2, 4.4); c.fill();
    c.fillStyle = 'rgba(90,40,10,0.55)'; for (let k = 0; k < 14; k++) { ellipse(c, -10 + k * 1.6, -1 + (k % 3) - 1, 0.7, 0.5); c.fill(); } // blistered shell
    c.fillStyle = 'rgba(255,220,170,0.4)'; c.fillRect(-10, -3.6, 20, 1);
    [-1, 1].forEach((d) => { ellipse(c, d * 12.4, 0, 3.2, 4.6); c.fillStyle = end; c.fill(); c.fillStyle = 'rgba(0,0,0,0.08)'; ellipse(c, d * 12.8, 1, 2, 3); c.fill();
      if (bits === 'choc') { c.fillStyle = '#2a140a'; for (let k = 0; k < 5; k++) c.fillRect(d * 12.4 - 1.5 + (k % 3) * 1.2, -3 + k * 1.3, 1, 0.8); }
      if (bits === 'pist') { c.fillStyle = '#6a9a3a'; for (let k = 0; k < 7; k++) c.fillRect(d * 12.4 - 2 + (k % 3) * 1.4, -3.5 + k * 1.1, 1.1, 0.9); }
      if (bits === 'cherry') { ellipse(c, d * 12.6, -0.5, 1.3, 1.3); c.fillStyle = '#c81a2a'; c.fill(); } });
    if (bits === 'dip') { c.fillStyle = '#3a1a0a'; roundRect(c, -12, -4.6, 6, 9.2, 4); c.fill(); roundRect(c, 6, -4.6, 6, 9.2, 4); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,0.75)'; for (let k = 0; k < 10; k++) c.fillRect(-9 + k * 2, -4.8 + (k % 2), 1, 0.6); // powdered sugar
    c.restore();
  };
  P.lobster = (c, x, y, s) => { // lobster tail: tall fanned sfogliatella shell filled with cream
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(60,30,10,0.25)'; ellipse(c, 0, 6, 15, 3); c.fill();
    c.beginPath(); c.moveTo(-14, 4); c.quadraticCurveTo(-12, -9, 2, -10); c.quadraticCurveTo(14, -9, 14, 4); c.closePath();
    c.fillStyle = linear(c, 0, -10, 0, 4, [[0, '#f0c070'], [1, '#b8702a']]); c.fill();
    c.strokeStyle = 'rgba(120,60,20,0.7)'; c.lineWidth = 0.6; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(-12 + k * 3, 4); c.quadraticCurveTo(-10 + k * 2.6, -4, 2, -9.5); c.stroke(); }
    ellipse(c, 13, -1, 3, 5); c.fillStyle = '#fbf2dc'; c.fill();
    c.fillStyle = 'rgba(255,255,255,0.8)'; for (let k = 0; k < 14; k++) c.fillRect(-10 + k * 1.6, -8 + (k % 3) * 2, 0.9, 0.6);
    c.restore();
  };
  P.sfoglia = (c, x, y, s) => { // sfogliatella: shell of many crisp leaves
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(60,30,10,0.25)'; ellipse(c, 0, 5, 11, 2.6); c.fill();
    c.beginPath(); c.moveTo(-10, 4); c.quadraticCurveTo(-10, -8, 0, -9); c.quadraticCurveTo(10, -8, 10, 4); c.quadraticCurveTo(0, 7, -10, 4); c.fillStyle = linear(c, 0, -9, 0, 6, [[0, '#f4c878'], [1, '#c07a30']]); c.fill();
    c.strokeStyle = 'rgba(130,70,20,0.75)'; c.lineWidth = 0.5; for (let k = 1; k < 10; k++) { c.beginPath(); c.moveTo(-9 + k * 0.5, 4 + Math.sin(k) * 0.4); c.quadraticCurveTo(-8 + k * 1.6, -6 + k * 0.2, -6 + k * 1.8, -8.6 + k * 0.1); c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,0.85)'; for (let k = 0; k < 10; k++) c.fillRect(-6 + k * 1.3, -7 + (k % 3) * 1.4, 0.8, 0.5);
    c.restore();
  };
  P.eclair = (c, x, y, s, glaze = '#3a1a0a') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(60,30,10,0.25)'; ellipse(c, 0, 4, 14, 2.4); c.fill(); roundRect(c, -13, -3, 26, 7, 3.5); c.fillStyle = '#d8964a'; c.fill(); roundRect(c, -12.5, -4, 25, 4.4, 2.4); c.fillStyle = glaze; c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(-9, -3.4, 15, 0.8); c.restore(); };
  P.cupcake = (c, x, y, s, fr = '#f6c0d0') => { c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.moveTo(-6, -1); c.lineTo(6, -1); c.lineTo(4.6, 6); c.lineTo(-4.6, 6); c.closePath(); c.fillStyle = '#e8e0f0'; c.fill(); c.strokeStyle = 'rgba(120,100,140,0.5)'; c.lineWidth = 0.4; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 2.2, -1); c.lineTo(k * 1.8, 6); c.stroke(); } for (let k = 0; k < 3; k++) { ellipse(c, 0, -2 - k * 2.4, 6.4 - k * 1.8, 2.4); c.fillStyle = shade(fr, k * 0.06); c.fill(); } c.fillStyle = '#ff5a8a'; c.fillRect(-1, -9.5, 1.2, 0.6); c.fillStyle = '#5ab0ff'; c.fillRect(1, -8, 1.2, 0.6); c.restore(); };
  P.florentine = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); ellipse(c, 0, 0, 7, 3.4); c.fillStyle = '#d89a3a'; c.fill(); c.fillStyle = 'rgba(120,60,10,0.6)'; for (let k = 0; k < 16; k++) { ellipse(c, Math.cos(k) * 5 * ((k % 3) / 3 + 0.3), Math.sin(k) * 2.4 * ((k % 3) / 3 + 0.3), 0.8, 0.5); c.fill(); } c.strokeStyle = '#2a140a'; c.lineWidth = 0.7; c.beginPath(); for (let k = 0; k < 6; k++) c.lineTo(-5 + k * 2, (k % 2 ? -1.6 : 1)); c.stroke(); c.restore(); };
  P.rainbow = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); [['#3a1a0a', 0.8], ['#e83a3a', 2.4], ['#f6ecd0', 0.4], ['#f2d04a', 2.4], ['#f6ecd0', 0.4], ['#3a9a4a', 2.4], ['#3a1a0a', 0.8]].reduce((yy, [col, h]) => { c.fillStyle = col; c.fillRect(-5, yy, 10, h); return yy + h; }, -5); c.restore(); };
  P.rumcake = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f6eedc'; ellipse(c, 0, -6, 16, 4); c.fill(); c.fillRect(-16, -6, 32, 10); ellipse(c, 0, 4, 16, 4); c.fill(); c.fillStyle = '#f8f2e4'; ellipse(c, 0, -6, 16, 4); c.fill(); c.strokeStyle = '#e8c890'; c.lineWidth = 1; for (let k = 0; k < 10; k++) { c.beginPath(); c.arc(-14 + k * 3.1, -6.5, 1.6, Math.PI, 0); c.stroke(); } c.fillStyle = '#c81a2a'; for (let k = 0; k < 5; k++) { ellipse(c, -10 + k * 5, -7, 1.2, 1.2); c.fill(); } c.restore(); };
  P.whoopie = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); ellipse(c, 0, 2, 7, 2.6); c.fillStyle = '#3a1a0a'; c.fill(); c.fillStyle = '#fbf6ea'; c.fillRect(-6.5, -1, 13, 2); ellipse(c, 0, -1.6, 7, 2.6); c.fillStyle = '#4a2410'; c.fill(); c.restore(); };
  P.box = (c, x, y, s, open = 0, tied = 1) => { // flat white bakery box with blue script, blue-and-white string
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,0.2)'; ellipse(c, 0, 8, 22, 3); c.fill();
    c.fillStyle = linear(c, -20, 0, 20, 0, [[0, '#dedede'], [0.4, '#ffffff'], [1, '#d0d0d0']]); c.fillRect(-20, -6, 40, 14);
    if (open > 0) { c.save(); c.translate(0, -6); c.scale(1, -open); c.fillStyle = '#f2f2f2'; c.fillRect(-20, 0, 40, 10); c.restore(); }
    else { c.fillStyle = '#f6f6f6'; c.fillRect(-21, -8, 42, 3); }
    c.fillStyle = '#1e4a9a'; c.font = 'italic bold 6px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText("Mike's Pastry", -2, 2);
    if (tied) { c.globalAlpha = Math.min(1, tied); c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.9; c.setLineDash([1.4, 1.2]); c.beginPath(); c.moveTo(-6, -8); c.lineTo(-6, 8); c.moveTo(6, -8); c.lineTo(6, 8); c.moveTo(-20, 1); c.lineTo(20, 1); c.stroke(); c.setLineDash([]); c.strokeStyle = '#ffffff'; c.lineWidth = 0.4; c.beginPath(); c.moveTo(-5.6, -8); c.lineTo(-5.6, 8); c.stroke(); c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.8; c.beginPath(); c.ellipse(-2, -9, 2.6, 1.3, -0.4, 0, TAU); c.ellipse(2, -9, 2.6, 1.3, 0.4, 0, TAU); c.stroke(); c.globalAlpha = 1; }
    c.restore();
  };
  return P;
})();

const D_glow = (ctx, x, y, r, lit) => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = radial(ctx, x, y, r, [[0, `rgba(255,236,190,${0.35 * lit})`], [1, 'rgba(255,230,180,0)']]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); };
defineWorld({ id: 'mikes', thumbY: 0.45 }, makeVenue({
  id: 'mikes', flow: 'counter', seed: 300, cap: 13, spawnEvery: 3.4, lane: 0.975, peopleScale: 1.7, cat: false,
  door: { x: -0.07 }, bin: null, vignette: 'rgba(30,20,10,0.4)', wetSignX: 0.36,
  lights: [{ x: 0.12, y: 0.06, r: 230, col: '#ffe0b0', a: 0.2 }, { x: 0.62, y: 0.06, r: 260, col: '#ffe8c0', a: 0.22 }, { x: 0.86, y: 0.06, r: 260, col: '#ffe8c0', a: 0.22 }, { x: 0.8, y: 0.66, r: 240, col: '#fff0d0', a: 0.16 }],
  windows: [{ x: 0.012, y: 0.2, w: 0.2, h: 0.43, city: (c, x, y, w, h, lights, V) => {
    // Hanover Street: red-brick walk-ups with fire escapes, green awnings, passers-by
    const u = V.u, r = mulberry32(11);
    for (let i = 0; i < 4; i++) { const bx = x + i * w * 0.27 - 8 * u, bw = w * 0.27, bh = h * (0.62 + r() * 0.3); c.fillStyle = ['#8a3a2a', '#9a4a32', '#7a3424', '#a85a3a'][i]; c.fillRect(bx, y + h - bh, bw, bh);
      c.fillStyle = 'rgba(0,0,0,0.12)'; for (let yy = y + h - bh; yy < y + h; yy += 4 * u) c.fillRect(bx, yy, bw, 0.8);
      for (let rr = 0; rr < 4; rr++) for (let cc = 0; cc < 2; cc++) { const wx = bx + 6 * u + cc * bw * 0.48, wy = y + h - bh + 10 * u + rr * 26 * u; if (wy > y + h - 40 * u) continue; c.fillStyle = '#e8dcc8'; c.fillRect(wx - 1.5 * u, wy - 1.5 * u, bw * 0.3 + 3 * u, 17 * u); c.fillStyle = lights > 0.4 && (i + rr + cc) % 3 ? `rgba(255,200,120,${0.4 + lights * 0.5})` : '#3a4a5a'; c.fillRect(wx, wy, bw * 0.3, 14 * u); }
      c.strokeStyle = '#1a1a1a'; c.lineWidth = 1; for (let rr = 0; rr < 3; rr++) { const fy = y + h - bh + 28 * u + rr * 26 * u; if (fy > y + h - 40 * u) continue; c.strokeRect(bx + 3 * u, fy, bw * 0.6, 4 * u); for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(bx + 3 * u + k * bw * 0.1, fy); c.lineTo(bx + 3 * u + k * bw * 0.1, fy + 4 * u); c.stroke(); } }
      c.fillStyle = ['#2a6a3a', '#7a1a1a', '#2a4a7a', '#2a6a3a'][i]; c.beginPath(); c.moveTo(bx, y + h - 34 * u); c.lineTo(bx + bw, y + h - 34 * u); c.lineTo(bx + bw + 3 * u, y + h - 24 * u); c.lineTo(bx - 3 * u, y + h - 24 * u); c.closePath(); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.35)'; for (let k = 0; k < 6; k++) c.fillRect(bx + k * bw / 6, y + h - 34 * u, bw / 12, 10 * u);
    }
    c.fillStyle = '#6a6a6a'; c.fillRect(x, y + h - 10 * u, w, 10 * u); c.fillStyle = '#4a4a4a'; c.fillRect(x, y + h - 10 * u, w, 2 * u);
    // passers-by on the sidewalk (silhouettes with boxes)
    const T = V.t; for (let k = 0; k < 3; k++) { const px = x + ((T * (14 + k * 6) * u + k * 140 * u) % (w + 40 * u)) - 20 * u, py = y + h - 10 * u; c.fillStyle = ['#2a2a3a', '#5a2a2a', '#2a4a3a'][k]; roundRect(c, px - 5 * u, py - 34 * u, 10 * u, 22 * u, 4 * u); c.fill(); ellipse(c, px, py - 39 * u, 4 * u, 4.4 * u); c.fill(); c.fillRect(px - 4 * u, py - 13 * u, 3 * u, 13 * u); c.fillRect(px + 1 * u, py - 13 * u, 3 * u, 13 * u); if (k !== 1) { c.fillStyle = '#f2f2f2'; c.fillRect(px + 4 * u, py - 18 * u, 10 * u, 5 * u); c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(px + 9 * u, py - 18 * u); c.lineTo(px + 9 * u, py - 13 * u); c.stroke(); } }
    if (lights > 0.4) { c.fillStyle = `rgba(255,230,160,${lights * 0.9})`; for (let k = 0; k < 14; k++) { ellipse(c, x + k * w / 13, y + h * 0.3 + Math.sin(k * 0.9) * 6 * u + 8 * u, 1.6 * u, 1.6 * u); c.fill(); } }
  }, frame: (c, V) => { const u = V.u, x = V.X(0.012), y = V.Y(0.2), w = V.X(0.2), h = V.Y(0.43);
    c.fillStyle = 'rgba(255,255,255,0.08)'; c.beginPath(); c.moveTo(x + w * 0.1, y); c.lineTo(x + w * 0.3, y); c.lineTo(x + w * 0.05, y + h); c.lineTo(x - w * 0.15, y + h); c.closePath(); c.fill();
    c.save(); c.translate(x + w / 2, y + h * 0.18); c.scale(-1, 1); c.font = `italic bold ${26 * u}px Georgia, serif`; c.textAlign = 'center'; c.fillStyle = 'rgba(30,70,160,0.75)'; c.fillText("Mike's Pastry", 0, 0); c.font = `${10 * u}px Georgia, serif`; c.fillText('ITALIAN PASTRY · EST. 1946', 0, 16 * u); c.restore();
  } }],
  back(x, V) {
    const { W, H, u, rnd } = V, X = V.X;
    // blue-and-white walls with a silver-lined lower wainscot
    x.fillStyle = '#f4f6fa'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#2a5ab0'; x.fillRect(0, H * 0.135, W, 5 * u); x.fillRect(0, H * 0.31, W, 3 * u);
    for (let k = 0; k < W; k += 22 * u) { x.fillStyle = 'rgba(42,90,176,0.08)'; x.fillRect(k, H * 0.14, 11 * u, H * 0.17); }
    // pressed-tin ceiling (silver) + crown moulding
    Decor.tin(x, 0, 0, W, H * 0.13, 30 * u, '#c8ccd0');
    x.fillStyle = linear(x, 0, H * 0.12, 0, H * 0.14, [[0, '#e8eaee'], [1, '#9a9ea8']]); x.fillRect(0, H * 0.12, W, H * 0.018);
    for (let k = 0; k < W; k += 14 * u) { x.fillStyle = 'rgba(80,90,110,0.35)'; x.fillRect(k, H * 0.13, 6 * u, 3 * u); }
    // ceiling fans
    [0.3, 0.7].forEach((f) => { const cx = X(f), cy = H * 0.07; x.fillStyle = '#5a4a3a'; x.fillRect(cx - 1.5 * u, 0, 3 * u, cy); ellipse(x, cx, cy, 10 * u, 6 * u); x.fill(); });
    // menu boards over the counter: black boards, gold rules, real Mike's pastries
    const boards = [[0.44, 'CANNOLI', ['Ricotta', 'Chocolate Chip', 'Pistachio', 'Espresso', 'Amaretto', 'Florentine', 'Limoncello', 'Hazelnut']], [0.64, 'PASTRIES', ['Lobster Tail', 'Sfogliatelle', 'Éclair', 'Cream Puff', 'Napoleon', 'Rum Cake', 'Tiramisù', 'Cannoli Cake']], [0.84, 'COOKIES · BY THE LB', ['Rainbow', 'Florentine', 'Pignoli', 'Biscotti', 'Amaretti', 'Butter Cookies', 'Macaroons', 'Whoopie Pie']]];
    boards.forEach(([f, title, items]) => {
      const bx = X(f) - X(0.093), by = H * 0.155, bw = X(0.186), bh = H * 0.145;
      x.fillStyle = '#1a1612'; x.fillRect(bx - 4 * u, by - 4 * u, bw + 8 * u, bh + 8 * u); x.fillStyle = linear(x, 0, by, 0, by + bh, [[0, '#121010'], [1, '#221c18']]); x.fillRect(bx, by, bw, bh);
      x.strokeStyle = '#c8a050'; x.lineWidth = 1; x.strokeRect(bx + 3 * u, by + 3 * u, bw - 6 * u, bh - 6 * u);
      x.fillStyle = '#f0d070'; x.font = `bold ${10.5 * u}px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillText(title, bx + bw / 2, by + 16 * u);
      x.font = `${8.4 * u}px Georgia, serif`; x.fillStyle = '#f4ece0';
      items.forEach((it, i) => { const col = i % 2, row = i >> 1; x.textAlign = 'left'; x.fillText(it, bx + 9 * u + col * bw / 2, by + 32 * u + row * 21 * u); x.fillStyle = 'rgba(244,236,224,0.25)'; x.fillRect(bx + 9 * u + col * bw / 2, by + 35 * u + row * 21 * u, bw / 2 - 18 * u, 0.7); x.fillStyle = '#f4ece0'; });
    });
    // antique wooden hutch with glassware (left wall, beside the window)
    const hx = X(0.225), hy = H * 0.2, hw = X(0.11), hh = H * 0.46;
    Decor.wood(x, hx, hy, hw, hh, rnd, '#5a3218', '#7a4a28');
    x.fillStyle = '#3a1e0c'; x.fillRect(hx - 4 * u, hy - 8 * u, hw + 8 * u, 10 * u);
    for (let r = 0; r < 3; r++) { const sy = hy + 16 * u + r * hh * 0.24; x.fillStyle = 'rgba(200,220,230,0.25)'; x.fillRect(hx + 6 * u, sy - hh * 0.2, hw - 12 * u, hh * 0.2); x.fillStyle = '#4a2a14'; x.fillRect(hx + 4 * u, sy, hw - 8 * u, 3 * u);
      for (let k = 0; k < 5; k++) { const gx = hx + 12 * u + k * (hw - 24 * u) / 4; x.strokeStyle = 'rgba(240,250,255,0.75)'; x.lineWidth = 1; x.beginPath(); x.moveTo(gx - 4 * u, sy - 14 * u); x.lineTo(gx - 3 * u, sy); x.lineTo(gx + 3 * u, sy); x.lineTo(gx + 4 * u, sy - 14 * u); x.stroke(); } }
    // round marble café tables by the window go on the floor layer (live); here: the terracotta floor
    const fy = H * 0.8;
    x.fillStyle = '#b8643a'; x.fillRect(0, fy, W, H - fy);
    for (let r = 0; r < 9; r++) { const y0 = fy + (H - fy) * Math.pow(r / 9, 1.5), y1 = fy + (H - fy) * Math.pow((r + 1) / 9, 1.5), n = 16; for (let k = -n; k < n; k++) { const sa = 0.62 + 0.38 * r / 9, sb = 0.62 + 0.38 * (r + 1) / 9; x.beginPath(); x.moveTo(W / 2 + k / n * W * sa, y0); x.lineTo(W / 2 + (k + 1) / n * W * sa, y0); x.lineTo(W / 2 + (k + 1) / n * W * sb, y1); x.lineTo(W / 2 + k / n * W * sb, y1); x.closePath(); x.fillStyle = shade('#c0683c', (rnd() - 0.5) * 0.18); x.fill(); x.strokeStyle = 'rgba(70,40,20,0.5)'; x.lineWidth = 1.2; x.stroke(); } }
    x.fillStyle = linear(x, 0, fy, 0, H, [[0, 'rgba(255,230,200,0.12)'], [1, 'rgba(0,0,0,0.1)']]); x.fillRect(0, fy, W, H - fy);
    // back counter behind staff: stacks of flat white boxes, register, cake stands
    const bcy = H * 0.47;
    x.fillStyle = linear(x, 0, bcy, 0, H * 0.6, [[0, '#dcdcdc'], [1, '#9a9a9a']]); x.fillRect(X(0.38), bcy, W - X(0.38), H * 0.13);
    for (let k = 0; k < 6; k++) { const sx = X(0.42 + k * 0.1); for (let j = 0; j < 7; j++) { x.fillStyle = j % 2 ? '#f4f4f4' : '#e2e2e2'; x.fillRect(sx - 22 * u, bcy - 4 * u - j * 4 * u, 44 * u, 4 * u); } x.fillStyle = '#2a5ab0'; x.font = `italic ${5 * u}px Georgia`; x.textAlign = 'center'; x.fillText("Mike's", sx, bcy - 14 * u); }
    // cake stands with rum cakes / cheesecakes on the back shelf
    [0.47, 0.67, 0.9].forEach((f, i) => { const cx = X(f), cy = H * 0.39; x.fillStyle = '#d8d8e0'; x.fillRect(cx - 2 * u, cy, 4 * u, 12 * u); ellipse(x, cx, cy + 12 * u, 14 * u, 3 * u); x.fill(); Pastry.rumcake(x, cx, cy - 4 * u, u * (1.1 + (i % 2) * 0.2)); });
    x.fillStyle = '#d0d4dc'; x.fillRect(X(0.38), H * 0.42, W - X(0.38), 3 * u);
    // framed black-and-white photos of the old North End between the cake stands
    [0.57, 0.78].forEach((f, i) => { const fx = X(f), fy = H * 0.335, fw = 62 * u, fh = 44 * u; x.fillStyle = '#2a1a10'; x.fillRect(fx - fw / 2 - 4 * u, fy - 4 * u, fw + 8 * u, fh + 8 * u); x.fillStyle = '#f4f0e8'; x.fillRect(fx - fw / 2, fy, fw, fh);
      x.fillStyle = linear(x, 0, fy + 4 * u, 0, fy + fh - 4 * u, [[0, '#d8d4cc'], [1, '#6a6660']]); x.fillRect(fx - fw / 2 + 4 * u, fy + 4 * u, fw - 8 * u, fh - 8 * u);
      x.fillStyle = 'rgba(40,36,32,0.75)'; for (let k = 0; k < 5; k++) { const bx = fx - fw / 2 + 6 * u + k * 11 * u, bh = (14 + (k * 7 + i * 5) % 12) * u; x.fillRect(bx, fy + fh - 4 * u - bh, 9 * u, bh); }
      for (let k = 0; k < 3; k++) { ellipse(x, fx - 14 * u + k * 13 * u, fy + fh - 15 * u, 2.4 * u, 2.6 * u); x.fill(); x.fillRect(fx - 16 * u + k * 13 * u, fy + fh - 13 * u, 4.6 * u, 9 * u); } });
    // big blue script on the white wall
    x.save(); x.font = `italic bold ${34 * u}px Georgia, 'Brush Script MT', cursive`; x.textAlign = 'center'; x.fillStyle = 'rgba(30,74,154,0.9)'; x.fillText("Mike's Pastry", X(0.68), H * 0.355 - 6 * u); x.restore();
  },
  counter(x, V) { // the long glass case, packed
    const { W, H, u, rnd } = V, X = V.X, x0 = X(0.39), top = H * 0.555, base = H * 0.8;
    x.fillStyle = linear(x, 0, top, 0, base, [[0, '#f0f2f4'], [1, '#c8ccd2']]); x.fillRect(x0, top, W - x0, base - top);
    // three tiers inside, mirrored back panel
    x.fillStyle = 'rgba(200,210,225,0.35)'; x.fillRect(x0 + 6 * u, top + 4 * u, W - x0, base - top - 30 * u);
    const tiers = [top + 22 * u, top + 56 * u, top + 92 * u];
    tiers.forEach((ty) => { x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(x0 + 4 * u, ty + 4 * u, W - x0, 2 * u); });
    const kinds = ['cannoli', 'cannoli', 'lobster', 'sfoglia', 'eclair', 'cupcake', 'florentine', 'rainbow', 'whoopie', 'cannoli'];
    let tx = x0 + 14 * u;
    while (tx < W) {
      const k = kinds[Math.floor(rnd() * kinds.length)], tw = 104 * u;
      tiers.forEach((ty, ti) => {
        x.fillStyle = 'rgba(210,200,190,0.9)'; x.fillRect(tx, ty - 1 * u, tw - 6 * u, 5 * u); // doily-lined tray
        x.fillStyle = 'rgba(255,255,255,0.8)'; for (let d = 0; d < 8; d++) { ellipse(x, tx + 4 * u + d * (tw - 12 * u) / 7, ty + 3 * u, 3 * u, 1.4 * u); x.fill(); }
        const kk = ti === 0 ? k : kinds[Math.floor(rnd() * kinds.length)];
        for (let n = 0; n < 3; n++) {
          const px = tx + 18 * u + n * (tw - 36 * u) / 2, py = ty - 5 * u - (n % 2) * 2 * u, sc = u * 1.35;
          if (kk === 'cannoli') Pastry.cannoli(x, px, py, sc * 0.75, n % 3 === 2 ? '#c89a6a' : '#fbf6ea', ['choc', 'pist', 'dip', 'cherry'][(n + ti) % 4], -0.15 + n * 0.1);
          else if (kk === 'lobster') Pastry.lobster(x, px, py, sc * 0.72); else if (kk === 'sfoglia') Pastry.sfoglia(x, px, py, sc * 0.85); else if (kk === 'eclair') Pastry.eclair(x, px, py, sc * 0.6, n % 2 ? '#3a1a0a' : '#f4ead8');
          else if (kk === 'cupcake') Pastry.cupcake(x, px, py, sc * 0.9, ['#f6c0d0', '#c8e0f8', '#fbf2dc', '#6a3a1c'][n]); else if (kk === 'florentine') Pastry.florentine(x, px, py + 2 * u, sc * 1.1); else if (kk === 'rainbow') Pastry.rainbow(x, px, py, sc * 0.9); else Pastry.whoopie(x, px, py, sc);
        }
        // little price pick
        x.fillStyle = '#ffffff'; x.fillRect(tx + tw * 0.4, ty - 18 * u, 18 * u, 8 * u); x.strokeStyle = '#2a5ab0'; x.lineWidth = 0.6; x.strokeRect(tx + tw * 0.4, ty - 18 * u, 18 * u, 8 * u);
      });
      tx += tw;
    }
    // glass: front pane reflections, steel frame, base panel with blue band
    x.fillStyle = 'rgba(220,235,250,0.10)'; x.fillRect(x0, top - 18 * u, W - x0, base - top);
    for (let k = 0; k < 7; k++) { const sx = x0 + 50 * u + k * (W - x0) / 7; x.fillStyle = 'rgba(255,255,255,0.10)'; x.beginPath(); x.moveTo(sx, top - 16 * u); x.lineTo(sx + 22 * u, top - 16 * u); x.lineTo(sx - 12 * u, base - 30 * u); x.lineTo(sx - 34 * u, base - 30 * u); x.closePath(); x.fill(); }
    x.fillStyle = linear(x, 0, top - 22 * u, 0, top - 14 * u, [[0, '#ffffff'], [1, '#9aa4ae']]); x.fillRect(x0, top - 22 * u, W - x0, 6 * u);
    x.fillStyle = linear(x, 0, base - 28 * u, 0, base, [[0, '#f4f4f6'], [1, '#c8cad0']]); x.fillRect(x0, base - 28 * u, W - x0, 28 * u);
    x.fillStyle = '#2a5ab0'; x.fillRect(x0, base - 18 * u, W - x0, 5 * u);
    x.fillStyle = '#8a8e96'; x.fillRect(x0, base - 2 * u, W - x0, 3 * u);
    for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(90,100,110,0.5)'; x.fillRect(x0 + k * (W - x0) / 5, top - 16 * u, 2 * u, base - top - 12 * u); }
  },
  staffLooks: null,
  setup(V) {
    const X = V.X;
    const tee = (col) => ({ type: 'tee', col, logo: '#2a5ab0' });
    V.addStaff({ role: 'cook', lane: 0, layer: 'back', armsOver: true, x: 0.62, y: 0.49, look: { skin: 'light', hair: 'dbrown', hairStyle: 'bun', female: true, lashes: true, lips: '#c0505a', acc: { earrings: '#e8c050' }, top: tee('#ffffff'), sleeves: 'short' }, idle: [['scan', 1.6], ['straighten', 1.8]] });
    V.addStaff({ role: 'cook', lane: 1, layer: 'back', armsOver: true, x: 0.84, y: 0.49, look: { skin: 'olive', hair: 'black', hairStyle: 'pony', female: true, lashes: true, lips: '#a02a3a', acc: { glasses: '#2a2a2a' }, top: tee('#1a1a22'), sleeves: 'short', build: 1.05 }, idle: [['scan', 1.6], ['straighten', 1.8], ['call', 1.4]] });
    V.addStaff({ role: 'idle', layer: 'back', x: 0.95, y: 0.495, k: 0.96, look: { skin: 'tan', hair: 'grey', hairStyle: 'short', age: 'old', acc: { mustache: true, glasses: '#8a5a2a', round: true }, top: { type: 'shirt', col: '#ffffff', apron: '#f2f2f2' }, sleeves: 'long' }, idle: [['register', 2.2], ['count', 2.4], ['watch', 2]] });
    V.S.spools = [0.58, 0.72, 0.86].map((f) => ({ x: X(f), y: V.Y(0.3) }));
    V.S.tables = [[0.07, 0.86], [0.2, 0.88]].map(([f, y]) => ({ x: X(f), y: V.Y(y) }));
  },
  seats(V) { const sc = V.sc; return [[0.025, 1, 0], [0.115, -1, 0], [0.155, 1, 1], [0.245, -1, 1]].map(([f, dir, ti]) => ({ x: V.X(f), y: V.S.tables[ti].y - 60 * sc, dir, tableRef: V.S.tables[ti] })); },
  queues(V) { // two jostling clumps at the case: a loose mob rather than an orderly line
    const X = V.X, L = V.lane();
    return [0, 1].map((lane) => [0, 1, 2, 3, 4, 5].map((i) => [X(lane ? 0.85 : 0.63) - i * 42 * V.u * (lane ? 1 : -0.2) + ((i * 37) % 23 - 11) * V.u - (lane ? 0 : i * 24 * V.u), L - (i % 2) * 6 * V.u - Math.floor(i / 2) * 4 * V.u, X(lane ? 0.84 : 0.62)]));
  },
  orderDesk: { lookX: 0.7 },
  dish(a) {
    const togo = Math.random() < 0.6;
    const kind = Looks.pickR(Math.random, ['cannoli', 'cannoli', 'cannoli', 'lobster', 'sfoglia', 'eclair']);
    const n = togo ? 1 + Math.floor(Math.random() * 3) : 1;
    const boxed = (c, x, y) => { for (let i = 0; i < n; i++) Pastry.box(c, x + 2, y + 4 - i * 7, 0.42); };
    const pastry = (c, x, y) => { if (kind === 'cannoli') Pastry.cannoli(c, x + 2, y - 2, 0.45, '#fbf6ea', Looks.pickR(Math.random, ['choc', 'pist']), -0.6); else if (kind === 'lobster') Pastry.lobster(c, x + 2, y - 2, 0.45); else if (kind === 'sfoglia') Pastry.sfoglia(c, x + 2, y - 2, 0.5); else Pastry.eclair(c, x + 2, y - 2, 0.45); };
    return { togo, kind, n, hand: boxed, utensil: () => pastry, sip: Items.teacup, bites: 3, biteT: 3, eatAct: 'eat', trash: Items.napkin };
  },
  prep(j, s, V) {
    const steps = [['grab', 1.5], ['place', 0.8], ['tie', 2.4]];
    if (j.dish.n > 1) steps.splice(2, 0, ['grab', 1.2], ['place', 0.6]);
    return steps;
  },
  pose(s, ps, t, V) {
    const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
    if (s.spec.role === 'cook') {
      const sp = V.S.spools[s.spec.lane ? 2 : 0];
      switch (s.act) {
        case 'grab': { const c = Math.min(1, k / 1.2), d = c < 0.5 ? smooth(c * 2) : 1 - smooth((c - 0.5) * 2); ps.lean = 0.16 * d; ps.head.nod = 1.6 * d; ps.face.lookY = 1; ps.arms = [A(-1, -14, 40), A(1, 20 + d * 10, 40 + d * 34, { grip: 'open', handAng: 0.8, item: c > 0.5 ? (cc, x, y) => { cc.fillStyle = '#ffffff'; cc.fillRect(x - 4, y - 3, 8, 5); Pastry.cannoli(cc, x + 1, y - 2, 0.35); } : (cc, x, y) => { cc.fillStyle = 'rgba(255,255,255,0.9)'; cc.fillRect(x - 4, y - 3, 8, 6); } })]; return; }
        case 'place': ps.arms = [A(-1, -10, 36), A(1, 4, 40 - Math.min(1, k * 2) * 6, { grip: 'open' })]; ps.face.lookY = 1; ps.head.nod = 1.2; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.5; return;
        case 'tie': { // pull string from the overhead spool, wrap both ways, snap
          const c = (k * 1.4) % 1, up = k < 0.5; ps.face.lookY = 1; ps.head.nod = 1;
          ps.arms = [A(-1, up ? -6 : -16 + Math.cos(c * TAU) * 12, up ? -30 + k * 40 : 44 + Math.sin(c * TAU) * 6, { grip: up ? 'fist' : 'open' }), A(1, 16 + Math.sin(c * TAU + 1) * 10, 44 + Math.cos(c * TAU) * 5, { grip: 'open' })];
          if (k > 2.1) { ps.arms[1] = A(1, 22, 30, { grip: 'fist' }); ps.face.mouth = 'big'; }
          return;
        }
        case 'hand': ps.arms = [A(-1, -14, 40), A(1, 20 + Math.min(1, k * 2) * 18, 24, { grip: 'fist', item: (cc, x, y) => Pastry.box(cc, x, y + 4, 0.42) })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'scan': ps.arms = [A(-1, -12, 42), A(1, 12, 42)]; ps.head.turn = Math.sin(t * 1.2 + s.seed) * 0.8; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 6)) * 0.4; return;
        case 'call': ps.arms = [A(-1, -12, 42), A(1, 26, -6, { grip: 'point' })]; ps.face.mouth = 'open'; ps.face.open = 0.7; ps.head.turn = 0.6; return; // "Who's next?"
        case 'straighten': ps.arms = [A(-1, -10 + Math.sin(k * 4) * 4, 50), A(1, 10 + Math.sin(k * 4) * 4, 50, { grip: 'open' })]; ps.lean = 0.1; ps.face.lookY = 1; return;
        case 'shuffle': return;
      }
    } else {
      switch (s.act) {
        case 'register': ps.arms = [A(-1, -10, 38), A(1, 10 + Math.sin(k * 12) * 3, 34 + Math.abs(Math.sin(k * 12)) * 2, { grip: 'point' })]; ps.face.lookY = 1; ps.head.nod = 1; return;
        case 'count': ps.arms = [A(-1, -4, 30, { item: Items.cash }), A(1, 6 + Math.sin(k * 6) * 3, 30, { grip: 'open' })]; ps.face.lookY = 1; ps.head.nod = 1.4; ps.face.mouth = 'flat'; return;
        default: ps.arms = [A(-1, 8, 30), A(1, -8, 32)]; ps.head.turn = Math.sin(t * 0.6) * 0.7; ps.face.mouth = 'smile'; return;
      }
    }
    return false;
  },
  midLive(ctx, t, dt, V) {
    const u = V.u;
    [0.12, 0.29, 0.54, 0.74, 0.96].forEach((f, i) => { const gx = V.X(f), gy = V.H * 0.19 + Math.sin(t * 0.7 + i) * 0.6 * u; ctx.strokeStyle = '#3a3a40'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(gx, V.H * 0.13); ctx.lineTo(gx, gy - 14 * u); ctx.stroke(); ctx.fillStyle = '#b89a50'; ctx.fillRect(gx - 6 * u, gy - 16 * u, 12 * u, 5 * u); ellipse(ctx, gx, gy, 13 * u, 12 * u); ctx.fillStyle = radial(ctx, gx - 3 * u, gy - 3 * u, 14 * u, [[0, '#fffef4'], [0.6, mix('#e8e4d8', '#fff4d0', V.lit || 1)], [1, '#c8c0a8']]); ctx.fill(); D_glow(ctx, gx, gy, 70 * u, V.lit || 1); });
    // string spools hanging from the ceiling; the string runs down to whoever is tying
    V.S.spools.forEach((sp, i) => {
      ctx.strokeStyle = '#6a6e76'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(sp.x, V.H * 0.13); ctx.lineTo(sp.x, sp.y - 16 * u); ctx.stroke();
      ctx.fillStyle = linear(ctx, sp.x - 10 * u, 0, sp.x + 10 * u, 0, [[0, '#7a8088'], [0.5, '#d8dce2'], [1, '#6a7078']]); ctx.beginPath(); ctx.moveTo(sp.x - 11 * u, sp.y - 16 * u); ctx.lineTo(sp.x + 11 * u, sp.y - 16 * u); ctx.lineTo(sp.x + 6 * u, sp.y); ctx.lineTo(sp.x - 6 * u, sp.y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#ffffff'; ellipse(ctx, sp.x, sp.y - 8 * u, 7 * u, 6 * u); ctx.fill(); ctx.strokeStyle = '#2a5ab0'; ctx.lineWidth = 1 * u; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(sp.x, sp.y - 8 * u, (2 + k) * u, 0.3 + t * (i + 1) * 0.1, 2.4 + t * (i + 1) * 0.1); ctx.stroke(); }
    });
    // boxes on the counter being packed / tied
    V.staff.filter((s) => s.spec.role === 'cook').forEach((s) => {
      const bx = s.x + 6 * u, by = V.H * 0.535;
      if (['place', 'tie', 'grab'].includes(s.act) && s.job) {
        const open = s.act === 'tie' ? 0 : 1, tied = s.act === 'tie' ? Math.min(1, s.actT / 2.1) : 0;
        Pastry.box(ctx, bx, by, u * 1.3, open, tied);
        if (s.act === 'tie' && s.actT < 2.2) { const sp = V.S.spools[s.spec.lane ? 2 : 0]; ctx.strokeStyle = 'rgba(42,90,176,0.9)'; ctx.lineWidth = 1 * u; ctx.setLineDash([2 * u, 2 * u]); ctx.beginPath(); ctx.moveTo(sp.x, sp.y); ctx.quadraticCurveTo((sp.x + bx) / 2, (sp.y + by) / 2 + 10 * u, bx, by - 8 * u); ctx.stroke(); ctx.setLineDash([]); }
      }
    });
  },
  counterLive(ctx, t, dt, V) {
    const u = V.u;
    // register
    const rx = V.X(0.955), ry = V.H * 0.535;
    ctx.fillStyle = '#3a3a44'; roundRect(ctx, rx - 20 * u, ry - 26 * u, 40 * u, 26 * u, 3 * u); ctx.fill(); ctx.fillStyle = '#1a1a20'; ctx.fillRect(rx - 15 * u, ry - 22 * u, 30 * u, 10 * u);
    ctx.fillStyle = '#7aff9a'; ctx.font = `bold ${7 * u}px monospace`; ctx.textAlign = 'center'; ctx.fillText(V.staff[2] && V.staff[2].act === 'register' ? '$ 18.75' : '0.00', rx, ry - 14 * u);
    // tissue + fresh tray event
    if (V.S.freshTray) { const f = V.S.freshTray; f.t += dt; const k = clamp(f.t / 3, 0, 1); const x = lerp(V.X(1.05), V.X(0.75), k); ctx.fillStyle = '#8a8a90'; ctx.fillRect(x - 40 * u, V.H * 0.47, 80 * u, 5 * u); for (let i = 0; i < 6; i++) Pastry.lobster(ctx, x - 32 * u + i * 13 * u, V.H * 0.465, u * 0.6); if (f.t > 1 && f.t < 4) V.steam(x, V.H * 0.45, 1, 0.8); }
  },
  drawSeat(ctx, seat, t, V, mode) {
    const u = V.u, cx = seat.x, fy = seat.tableRef.y + 70 * u; // bentwood chair
    ctx.strokeStyle = '#2a1408'; ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - seat.dir * 18 * u, fy); ctx.lineTo(cx - seat.dir * 20 * u, fy - 50 * u); ctx.quadraticCurveTo(cx - seat.dir * 26 * u, fy - 110 * u, cx - seat.dir * 4 * u, fy - 112 * u); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx - seat.dir * 14 * u, fy - 82 * u, 11 * u, 0, TAU); ctx.lineWidth = 2 * u; ctx.stroke();
    ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(cx + seat.dir * 16 * u, fy); ctx.lineTo(cx + seat.dir * 12 * u, fy - 48 * u); ctx.stroke();
  },
  floorProps(V, t) {
    const u = V.u, out = [];
    V.S.tables.forEach((tb) => out.push({ y: tb.y + 1, f: (ctx = V.ctx) => {} }));
    return out;
  },
  front(ctx, t, dt, V) {
    const u = V.u;
    // round marble café tables (drawn after seated diners so the top covers laps)
    V.S.tables.forEach((tb, i) => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ellipse(ctx, tb.x, V.H * 0.99, 40 * u, 6 * u); ctx.fill();
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(tb.x - 3 * u, tb.y, 6 * u, V.H * 0.985 - tb.y); ctx.beginPath(); ctx.moveTo(tb.x - 26 * u, V.H * 0.99); ctx.lineTo(tb.x, V.H * 0.95); ctx.lineTo(tb.x + 26 * u, V.H * 0.99); ctx.lineWidth = 3 * u; ctx.strokeStyle = '#1a1a1a'; ctx.stroke();
      ellipse(ctx, tb.x, tb.y, 52 * u, 13 * u); ctx.fillStyle = radial(ctx, tb.x - 14 * u, tb.y - 4 * u, 60 * u, [[0, '#ffffff'], [0.7, '#e6e2dc'], [1, '#c8c2b8']]); ctx.fill();
      ctx.strokeStyle = 'rgba(120,120,130,0.35)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(tb.x - 34 * u, tb.y - 3 * u); ctx.bezierCurveTo(tb.x - 10 * u, tb.y + 6 * u, tb.x + 10 * u, tb.y - 8 * u, tb.x + 36 * u, tb.y + 2 * u); ctx.stroke();
      ctx.fillStyle = '#9a9a9a'; ctx.fillRect(tb.x - 52 * u, tb.y, 104 * u, 3 * u);
      // what's on it: opened boxes, espresso cups, napkins
      V.seats.filter((s) => s.tableRef === tb && s.who).forEach((s) => { const px = tb.x + (s.x - tb.x) * 0.4, left = s.who.seatDish ? s.who.seatDish.left : 1; Pastry.box(ctx, px, tb.y - 4 * u, u * 0.9, 1, 0); ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 10 * u, tb.y - 8 * u, 20 * u, 2 * u); ellipse(ctx, px + 16 * u * Math.sign(s.x - tb.x), tb.y - 2 * u, 5 * u, 2 * u); ctx.fill(); ctx.fillStyle = '#3a1a0a'; ellipse(ctx, px + 16 * u * Math.sign(s.x - tb.x), tb.y - 2.4 * u, 3.6 * u, 1.2 * u); ctx.fill(); });
    });
    // kid with face pressed to the glass (event)
    if (V.S.smudge) { ctx.fillStyle = `rgba(255,255,255,${0.18 * V.S.smudge})`; ellipse(ctx, V.X(0.71), V.H * 0.67, 14 * u, 10 * u); ctx.fill(); ellipse(ctx, V.X(0.695), V.H * 0.7, 6 * u, 8 * u); ctx.fill(); ellipse(ctx, V.X(0.725), V.H * 0.7, 6 * u, 8 * u); ctx.fill(); }
    // powdered sugar in the air under the lights
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 26; i++) { const px = (i * 97.3 + t * 6 * (1 + (i % 3))) % V.W, py = (i * 53.1 + t * 9) % (V.H * 0.8); ctx.fillRect(px, py, 1.4 * u, 1.4 * u); }
  },
  custPose(a, ps, t, V) { if (a.kidGlass) { ps.arms = [{ side: -1, x: -16, y: -6, grip: 'open', handAng: -1.6 }, { side: 1, x: 16, y: -6, grip: 'open', handAng: -1.6 }]; ps.face.mouth = 'o'; ps.face.open = 0.6; ps.face.eyes = 'wide'; ps.head.nod = -1; } },
  events(V) {
    const X = V.X, u = () => V.u;
    return [
      { at: 0.16, name: 'tour', dur: 30, start() { // a Freedom Trail tour group led by a guide in a tricorn-ish hat with a flag
        const guide = V.customer({ look: { extra: { acc: { hat: 'newsboy', hatCol: '#2a3a6a' }, top: { type: 'coat', col: '#2a3a6a', scarf: '#c83a3a' } } }, life: (a) => (function* () { a.act = 'walk'; yield ['walk', X(0.3), V.lane()]; a.face = -1; a.item2 = (c, x, y) => { c.strokeStyle = '#3a2a1a'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 40); c.stroke(); c.fillStyle = '#c83a3a'; c.beginPath(); c.moveTo(x, y - 40); c.lineTo(x + 14 + Math.sin(V.t * 6) * 2, y - 35); c.lineTo(x, y - 30); c.fill(); }; a.act = 'talk'; a.actT = 0; yield ['wait', 14]; a.act = 'walk'; yield ['walk', -X(0.1), V.lane()]; })() });
        for (let i = 0; i < 4; i++) setTimeout(() => V.customer({ look: { extra: { acc: { hat: 'cap', hatCol: '#c83a3a' } } } }), 600 + i * 700);
      } },
      { at: 0.34, name: 'fresh', dur: 7, start() { V.S.freshTray = { t: 0 }; V.agents.forEach((a) => { if (!a.sitting && Math.random() < 0.6) a.react = 2; }); }, end() { V.S.freshTray = null; } },
      { at: 0.48, name: 'kid', dur: 20, start() { const k = V.customer({ look: { age: 'kid' }, life: (a) => (function* () { a.act = 'walk'; yield ['walk', X(0.71), V.lane() - 4 * V.u]; a.kidGlass = true; a.act = 'stand'; yield ['wait', 7]; V.S.smudge = 1; a.kidGlass = false; a.act = 'cheer'; a.cheer = 1.4; yield ['wait', 1.5]; a.act = 'walk'; yield ['walk', -X(0.1), V.lane()]; })() }); k.x = -X(0.05); } },
      { at: 0.62, name: 'nonna', dur: 28, start() { // a local nonna orders a tower of boxes for a christening
        V.customer({ look: { female: true, age: 'old', extra: { hairStyle: 'perm', hair: 'white', top: { type: 'cardigan', col: '#3a2a4a' }, acc: { glasses: '#8a5a2a', round: true, earrings: '#e8c050' } } }, life: (a) => (function* () {
          a.act = 'walk'; yield ['walk', X(0.88), V.lane()]; a.look = X(0.86); a.act = 'point'; a.actT = 0; yield ['wait', 2.5]; a.act = 'talk'; a.actT = 0; yield ['wait', 2.5];
          V.staff.forEach((s) => { if (s.spec.role !== 'cook') { s.act = 'call'; s.actT = 0; } });
          a.act = 'stand'; yield ['wait', 5];
          a.item = (c, x, y) => { for (let i = 0; i < 4; i++) Pastry.box(c, x + 4, y + 6 - i * 8, 0.5); }; a.act = 'hold'; a.mood = 'big'; yield ['wait', 1.5]; a.act = 'wave'; a.actT = 0; yield ['wait', 1.4]; a.keepItem = true; a.act = 'walk'; yield ['walk', -X(0.1), V.lane()];
        })() });
      } },
      { at: 0.78, name: 'snowsweep', dur: 16, start() { V.S.smudge = 0; } },
    ];
  },
  tick(V, dt) { if (V.S.smudge > 0 && V.on && V.on('snowsweep')) V.S.smudge = Math.max(0, V.S.smudge - dt * 0.2); },
}));
