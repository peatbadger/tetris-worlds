/* ================= World 4: Dim Sum Palace (Hong Kong yum cha banquet hall) =================
   A red-and-gold Cantonese banquet hall: dragon & phoenix wall (龍鳳呈祥), crystal chandeliers, red lanterns,
   a Hong Kong street with a double-decker tram through the window, live seafood tanks, a tea station, and
   the kitchen pass, where a dim sum chef pleats har gow and loads the steamer tower.
   Flow: a party takes a number from the hostess (LED queue board), is seated, and the tea captain asks
   "which tea?" and pours it. The guests tap two fingers on the table to say thanks (叩指禮).
   Trolley aunties push steaming carts round the tables, lift lids, call out the dishes, place steamers
   on the lazy susan and stamp the order card. A teapot lid left ajar asks for a refill.
   Events: lion dance with drum and cymbals that "plucks the green" (採青), longevity peach buns for
   grandma's birthday, songbird uncles hanging their cages (a Hong Kong tea house tradition), and
   live fish netted from the tank and shown to a table. */
(() => {
  const SFX = (k) => { try { if (AudioEngine.sfx.ev) AudioEngine.sfx.ev(k); } catch (e) {} };
  const JF = (s) => `${s}px ${JP_FONT}`;
  // trolley menu: [hanzi, kind, food colour on chopsticks, pieces per serving]
  const MENU = {
    hargow: ['蝦餃', '#f6e6e0', 4], siumai: ['燒賣', '#f0c860', 4], bao: ['叉燒包', '#f8f4ea', 3], cheung: ['腸粉', '#f4f2ec', 3],
    tart: ['蛋撻', '#f4c838', 3], claws: ['鳳爪', '#c8642a', 5], lomai: ['糯米雞', '#7a8a3a', 2], turnip: ['蘿蔔糕', '#e8c890', 3],
    roll: ['春卷', '#e0a040', 3], lau: ['流沙包', '#f4d860', 3], malai: ['馬拉糕', '#c8862a', 3], sesame: ['煎堆', '#e8b060', 3],
  };
  const KINDS = Object.keys(MENU);
  const dish = (kind) => ({ kind, left: 1, n: MENU[kind][2] });
  /* ---------- miniature dim sum on the table (world px, s = scale) ---------- */
  function bamboo(c, x, y, s, rx = 11) {
    c.fillStyle = 'rgba(40,10,0,0.25)'; ellipse(c, x, y + 1.5 * s, rx * 1.05 * s, rx * 0.34 * s); c.fill();
    c.fillStyle = linear(c, x - rx * s, 0, x + rx * s, 0, [[0, '#8a5a24'], [0.35, '#e0b468'], [0.7, '#c8964a'], [1, '#7a4a1a']]);
    c.beginPath(); c.ellipse(x, y, rx * s, rx * 0.32 * s, 0, 0, Math.PI); c.lineTo(x - rx * s, y - 6 * s); c.ellipse(x, y - 6 * s, rx * s, rx * 0.32 * s, 0, Math.PI, 0, true); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(90,50,10,0.5)'; c.lineWidth = 0.5 * s; for (let k = 1; k < 3; k++) { c.beginPath(); c.ellipse(x, y - k * 2 * s, rx * s, rx * 0.32 * s, 0, 0.1, Math.PI - 0.1); c.stroke(); }
    c.fillStyle = '#5a3412'; ellipse(c, x, y - 6 * s, rx * s, rx * 0.32 * s); c.fill();
    c.fillStyle = '#e8dcb8'; ellipse(c, x, y - 5.6 * s, rx * 0.86 * s, rx * 0.26 * s); c.fill(); // paper liner
  }
  function drawDish(c, d, x, y, s, t) {
    const n = Math.max(0, Math.ceil(d.n * d.left - 0.001)), kind = d.kind;
    const plate = ['cheung', 'tart', 'turnip', 'roll', 'sesame'].includes(kind);
    if (plate) { c.fillStyle = 'rgba(40,10,0,0.22)'; ellipse(c, x, y + 1 * s, 13 * s, 4 * s); c.fill(); c.fillStyle = '#f8f6f0'; ellipse(c, x, y, 13 * s, 4.2 * s); c.fill(); c.strokeStyle = '#3a6ab0'; c.lineWidth = 0.6 * s; ellipse(c, x, y, 11.5 * s, 3.5 * s); c.stroke(); }
    else bamboo(c, x, y, s);
    const top = plate ? y - 1 * s : y - 6.5 * s;
    for (let i = 0; i < n; i++) {
      const ox = x + (i - (d.n - 1) / 2) * (plate ? 5.5 : 4.4) * s * (d.n > 3 ? 0.9 : 1), oy = top + ((i % 2) ? -0.8 : 0.4) * s;
      switch (kind) {
        case 'hargow': c.fillStyle = 'rgba(248,240,234,0.92)'; c.beginPath(); c.moveTo(ox - 3 * s, oy); c.quadraticCurveTo(ox, oy - 6 * s, ox + 3 * s, oy); c.closePath(); c.fill(); c.fillStyle = 'rgba(240,130,110,0.55)'; ellipse(c, ox, oy - 1.6 * s, 1.8 * s, 1.1 * s); c.fill(); c.strokeStyle = 'rgba(200,180,170,0.8)'; c.lineWidth = 0.35 * s; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(ox + k * 1.1 * s, oy - 4.3 * s); c.lineTo(ox + k * 1.5 * s, oy - 2.6 * s); c.stroke(); } break;
        case 'siumai': c.fillStyle = '#f0c040'; c.fillRect(ox - 2 * s, oy - 4.4 * s, 4 * s, 4.4 * s); c.fillStyle = '#d8a088'; ellipse(c, ox, oy - 4.4 * s, 2 * s, 0.8 * s); c.fill(); c.fillStyle = '#ff7a20'; ellipse(c, ox, oy - 4.8 * s, 0.9 * s, 0.6 * s); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(ox - 1.6 * s, oy - 3.8 * s, 0.6 * s, 3 * s); break;
        case 'bao': case 'lau': c.fillStyle = '#fbf8f0'; ellipse(c, ox, oy - 2.4 * s, 2.8 * s, 2.6 * s); c.fill(); c.fillStyle = 'rgba(200,180,150,0.4)'; ellipse(c, ox + 0.8 * s, oy - 1.4 * s, 2 * s, 1.4 * s); c.fill(); if (kind === 'bao') { c.fillStyle = '#b8282a'; c.beginPath(); c.moveTo(ox - 1.4 * s, oy - 4.6 * s); c.lineTo(ox, oy - 3.2 * s); c.lineTo(ox + 1.4 * s, oy - 4.6 * s); c.closePath(); c.fill(); } else { c.fillStyle = '#f0b830'; ellipse(c, ox, oy - 4.6 * s, 0.6 * s, 0.4 * s); c.fill(); } break;
        case 'cheung': c.fillStyle = '#fbfaf6'; roundRect(c, ox - 2.4 * s, oy - 2.2 * s, 4.8 * s, 3 * s, 1.2 * s); c.fill(); c.fillStyle = 'rgba(120,60,20,0.45)'; c.fillRect(ox - 2.4 * s, oy - 0.2 * s, 4.8 * s, 0.9 * s); c.fillStyle = 'rgba(240,140,120,0.45)'; c.fillRect(ox - 1.6 * s, oy - 1.6 * s, 3.2 * s, 0.8 * s); break;
        case 'tart': c.fillStyle = '#d8962e'; c.beginPath(); c.moveTo(ox - 2.6 * s, oy - 2.2 * s); c.lineTo(ox + 2.6 * s, oy - 2.2 * s); c.lineTo(ox + 2 * s, oy); c.lineTo(ox - 2 * s, oy); c.closePath(); c.fill(); c.fillStyle = '#f8d030'; ellipse(c, ox, oy - 2.2 * s, 2.3 * s, 0.9 * s); c.fill(); c.fillStyle = 'rgba(255,255,255,0.6)'; ellipse(c, ox - 0.8 * s, oy - 2.4 * s, 0.7 * s, 0.25 * s); c.fill(); c.fillStyle = 'rgba(160,80,10,0.4)'; ellipse(c, ox + 0.6 * s, oy - 2.1 * s, 0.4 * s, 0.2 * s); c.fill(); break;
        case 'claws': c.fillStyle = '#c0582a'; for (let k = 0; k < 3; k++) { c.save(); c.translate(ox, oy - 1.4 * s); c.rotate(-0.8 + k * 0.8); roundRect(c, 0, -0.5 * s, 3.4 * s, 1.1 * s, 0.5 * s); c.fill(); c.restore(); } c.fillStyle = '#a0402a'; ellipse(c, ox, oy - 1.2 * s, 1.6 * s, 1.2 * s); c.fill(); c.fillStyle = '#2a1a10'; c.fillRect(ox - 0.3 * s, oy - 2 * s, 0.4 * s, 0.4 * s); break;
        case 'lomai': c.fillStyle = '#6a7a2a'; c.beginPath(); c.moveTo(ox - 3.4 * s, oy - 1 * s); c.lineTo(ox, oy - 4.6 * s); c.lineTo(ox + 3.4 * s, oy - 1 * s); c.lineTo(ox, oy + 0.6 * s); c.closePath(); c.fill(); c.strokeStyle = '#a8b060'; c.lineWidth = 0.4 * s; c.beginPath(); c.moveTo(ox - 2.6 * s, oy - 1.6 * s); c.lineTo(ox + 2.6 * s, oy - 1.6 * s); c.moveTo(ox, oy - 4.4 * s); c.lineTo(ox, oy + 0.4 * s); c.stroke(); break;
        case 'turnip': c.fillStyle = '#e8c88a'; c.fillRect(ox - 2.4 * s, oy - 2.6 * s, 4.8 * s, 2.6 * s); c.fillStyle = '#c88a3a'; c.fillRect(ox - 2.4 * s, oy - 2.6 * s, 4.8 * s, 0.8 * s); c.fillStyle = '#8a2a1a'; c.fillRect(ox - 1 * s, oy - 1.6 * s, 0.6 * s, 0.6 * s); c.fillRect(ox + 0.8 * s, oy - 1.2 * s, 0.6 * s, 0.6 * s); break;
        case 'roll': c.fillStyle = '#e09838'; roundRect(c, ox - 1.3 * s, oy - 4.6 * s, 2.6 * s, 5 * s, 1.2 * s); c.fill(); c.fillStyle = 'rgba(120,50,10,0.35)'; for (let k = 0; k < 3; k++) c.fillRect(ox - 1.2 * s, oy - 3.8 * s + k * 1.3 * s, 2.4 * s, 0.3 * s); break;
        case 'sesame': c.fillStyle = '#e4a850'; ellipse(c, ox, oy - 2.4 * s, 2.5 * s, 2.4 * s); c.fill(); c.fillStyle = '#fff4d8'; for (let k = 0; k < 7; k++) c.fillRect(ox + Math.cos(k * 2.3) * 1.6 * s, oy - 2.4 * s + Math.sin(k * 2.3) * 1.6 * s, 0.5 * s, 0.3 * s); break;
        case 'malai': c.fillStyle = '#c8862a'; c.fillRect(ox - 2.2 * s, oy - 4 * s, 4.4 * s, 4 * s); c.fillStyle = '#e0a848'; c.fillRect(ox - 2.2 * s, oy - 4 * s, 4.4 * s, 0.8 * s); c.fillStyle = 'rgba(90,40,10,0.4)'; for (let k = 0; k < 4; k++) c.fillRect(ox - 1.6 * s + k * s, oy - 2.6 * s + (k % 2) * s, 0.4 * s, 0.4 * s); break;
      }
    }
    if (!plate && d.left > 0.3) Decor.steamPuff(c, x, top - 4 * s, t, x * 0.01, s * 0.7, 0.5 * d.left);
  }
  /* ---------- the dragon & phoenix relief (gold leaf on red lacquer) ---------- */
  function goldGrad(c, x0, y0, x1, y1) { return linear(c, x0, y0, x1, y1, [[0, '#7a4a10'], [0.3, '#f8d878'], [0.5, '#c8902a'], [0.75, '#ffe9a0'], [1, '#8a5a18']]); }
  function dragon(c, cx, cy, s, rnd) {
    // serpentine body: sample a spline, then draw belly, scales, spine fins, legs and the head
    const N = 90, pts = [];
    for (let i = 0; i <= N; i++) { const u = i / N; pts.push([cx - 150 * s + u * 260 * s + Math.sin(u * 7.4) * 18 * s, cy + Math.sin(u * 8.2 + 0.6) * 46 * s * (0.4 + u * 0.6) - u * 40 * s]); }
    const wid = (u) => (5 + 13 * Math.sin(Math.min(1, u * 1.15) * Math.PI * 0.9 + 0.15)) * s;
    const nrm = (i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; };
    // spine fins
    c.fillStyle = goldGrad(c, cx - 150 * s, cy - 60 * s, cx + 110 * s, cy + 60 * s);
    for (let i = 4; i < N - 6; i += 3) { const [nx, ny] = nrm(i), w = wid(i / N), p = pts[i], q = pts[i + 2]; c.beginPath(); c.moveTo(p[0] - nx * w, p[1] - ny * w); c.lineTo((p[0] + q[0]) / 2 - nx * (w + 9 * s), (p[1] + q[1]) / 2 - ny * (w + 9 * s)); c.lineTo(q[0] - nx * w, q[1] - ny * w); c.closePath(); c.fill(); }
    // legs with three-toed claws
    [0.22, 0.34, 0.62, 0.74].forEach((u, k) => { const i = Math.round(u * N), [nx, ny] = nrm(i), p = pts[i], w = wid(u), dir = k % 2 ? 1 : -1;
      const kx = p[0] + nx * (w + 10 * s) + dir * 8 * s, ky = p[1] + ny * (w + 10 * s), fx = kx + dir * 12 * s, fy = ky + 8 * s;
      c.strokeStyle = goldGrad(c, p[0], p[1], fx, fy); c.lineWidth = 6 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(p[0], p[1]); c.quadraticCurveTo(kx, ky, fx, fy); c.stroke();
      c.lineWidth = 2 * s; for (let t = -1; t <= 1; t++) { c.beginPath(); c.moveTo(fx, fy); c.quadraticCurveTo(fx + dir * 5 * s, fy + t * 4 * s, fx + dir * 8 * s, fy + t * 5 * s + 3 * s); c.stroke(); } });
    // body
    c.beginPath(); for (let i = 0; i <= N; i++) { const [nx, ny] = nrm(i), w = wid(i / N); c.lineTo(pts[i][0] - nx * w, pts[i][1] - ny * w); } for (let i = N; i >= 0; i--) { const [nx, ny] = nrm(i), w = wid(i / N); c.lineTo(pts[i][0] + nx * w * 0.9, pts[i][1] + ny * w * 0.9); } c.closePath();
    c.fillStyle = goldGrad(c, cx - 150 * s, cy - 40 * s, cx + 110 * s, cy + 40 * s); c.fill(); c.strokeStyle = '#6a3a08'; c.lineWidth = 1.2 * s; c.stroke();
    // belly plates
    c.strokeStyle = 'rgba(110,60,10,0.7)'; c.lineWidth = 0.8 * s; for (let i = 3; i < N - 2; i += 2) { const [nx, ny] = nrm(i), w = wid(i / N); c.beginPath(); c.moveTo(pts[i][0] + nx * w * 0.2, pts[i][1] + ny * w * 0.2); c.lineTo(pts[i][0] + nx * w * 0.85, pts[i][1] + ny * w * 0.85); c.stroke(); }
    // scales: overlapping arcs
    c.strokeStyle = 'rgba(255,240,180,0.75)'; c.lineWidth = 0.7 * s;
    for (let i = 3; i < N - 3; i += 2) { const [nx, ny] = nrm(i), w = wid(i / N); for (let r = -0.75; r < 0.2; r += 0.32) { const px = pts[i][0] + nx * w * r, py = pts[i][1] + ny * w * r; c.beginPath(); c.arc(px, py, 2.6 * s, Math.atan2(ny, nx) + 0.6, Math.atan2(ny, nx) + Math.PI * 1.4 - 0.6, true); c.stroke(); } }
    // tail flame
    const tp = pts[0]; c.fillStyle = goldGrad(c, tp[0] - 30 * s, tp[1], tp[0], tp[1]); for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(tp[0], tp[1]); c.quadraticCurveTo(tp[0] - 20 * s, tp[1] - 20 * s + k * 10 * s, tp[0] - 34 * s, tp[1] - 26 * s + k * 14 * s); c.quadraticCurveTo(tp[0] - 14 * s, tp[1] - 6 * s + k * 6 * s, tp[0], tp[1] + 4 * s); c.fill(); }
    // head (at the end of the spline), facing right toward the pearl
    const hp = pts[N], hx = hp[0] + 8 * s, hy = hp[1];
    c.save(); c.translate(hx, hy);
    c.fillStyle = goldGrad(c, -20 * s, -20 * s, 30 * s, 20 * s);
    c.beginPath(); c.moveTo(-14 * s, -10 * s); c.quadraticCurveTo(6 * s, -20 * s, 26 * s, -8 * s); c.lineTo(34 * s, -2 * s); c.quadraticCurveTo(30 * s, 4 * s, 22 * s, 2 * s); c.lineTo(28 * s, 10 * s); c.quadraticCurveTo(14 * s, 16 * s, -6 * s, 12 * s); c.quadraticCurveTo(-18 * s, 4 * s, -14 * s, -10 * s); c.fill(); c.strokeStyle = '#6a3a08'; c.lineWidth = 1 * s; c.stroke();
    c.fillStyle = '#8a1010'; c.beginPath(); c.moveTo(22 * s, 2 * s); c.lineTo(30 * s, 4 * s); c.lineTo(26 * s, 8 * s); c.closePath(); c.fill(); // open mouth
    c.fillStyle = '#ffffff'; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(22 * s + k * 2.4 * s, 2 * s); c.lineTo(23 * s + k * 2.4 * s, 4.4 * s); c.lineTo(24 * s + k * 2.4 * s, 2.4 * s); c.fill(); }
    c.fillStyle = '#fff8d0'; ellipse(c, 8 * s, -6 * s, 4 * s, 3 * s); c.fill(); c.fillStyle = '#1a0a00'; ellipse(c, 9 * s, -6 * s, 1.8 * s, 2.2 * s); c.fill(); c.fillStyle = '#ffffff'; c.fillRect(9.4 * s, -7.4 * s, 0.8 * s, 0.8 * s);
    c.strokeStyle = goldGrad(c, -30 * s, -40 * s, 10 * s, 0); c.lineWidth = 2.4 * s; c.lineCap = 'round'; // antlers
    [[-4, -14, -18, -34, -26, -30], [2, -16, -6, -38, -16, -42]].forEach(([a, b, c1, d, e, f]) => { c.beginPath(); c.moveTo(a * s, b * s); c.quadraticCurveTo(c1 * s, (b - 8) * s, d * s, e * s); c.stroke(); c.beginPath(); c.moveTo((a + c1) / 2 * s, (b + e) / 2 * s); c.lineTo(e * s, f * s); c.stroke(); });
    c.lineWidth = 1 * s; c.strokeStyle = '#f8e098'; // whiskers
    [[30, -4, 46, -22, 64, -30], [28, 6, 44, 22, 62, 30]].forEach(([a, b, c1, d, e, f]) => { c.beginPath(); c.moveTo(a * s, b * s); c.bezierCurveTo(c1 * s, b * s, c1 * s, d * s, e * s, f * s); c.stroke(); });
    c.fillStyle = goldGrad(c, -30 * s, 0, 0, 30 * s); for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(-10 * s, -4 * s + k * 3 * s); c.quadraticCurveTo(-26 * s, 0 + k * 4 * s, -32 * s, 6 * s + k * 5 * s); c.quadraticCurveTo(-20 * s, 2 * s + k * 4 * s, -8 * s, 2 * s + k * 3 * s); c.fill(); } // mane
    c.restore();
  }
  function phoenix(c, cx, cy, s) {
    const G = goldGrad(c, cx - 90 * s, cy - 80 * s, cx + 110 * s, cy + 90 * s), ink = '#6a3a08';
    const feather = (bx, by, a, len, w, fill) => { const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len, nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
      c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo(bx + Math.cos(a) * len * 0.5 + nx, by + Math.sin(a) * len * 0.5 + ny, ex, ey); c.quadraticCurveTo(bx + Math.cos(a) * len * 0.5 - nx, by + Math.sin(a) * len * 0.5 - ny, bx, by); c.fillStyle = fill; c.fill(); c.strokeStyle = ink; c.lineWidth = 0.5 * s; c.stroke();
      c.strokeStyle = 'rgba(255,240,190,0.7)'; c.beginPath(); c.moveTo(bx, by); c.lineTo(ex, ey); c.stroke(); };
    // tail: five long plumes streaming right and down, curling at the tips, each with an eye
    for (let k = 4; k >= 0; k--) {
      const sx = cx + 16 * s, sy = cy + 8 * s, ex = cx + (58 + k * 11) * s, ey = cy + (30 + k * 15) * s;
      c.strokeStyle = G; c.lineWidth = (6 - k * 0.7) * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(sx, sy); c.bezierCurveTo(sx + 30 * s, sy + 6 * s + k * 4 * s, ex - 30 * s, ey + 26 * s, ex, ey); c.stroke();
      c.strokeStyle = 'rgba(255,233,160,0.55)'; c.lineWidth = 0.7 * s; for (let f = 0.15; f < 0.95; f += 0.07) { const bx = lerp(sx, ex, f) + Math.sin(f * Math.PI) * 6 * s, by = lerp(sy, ey, f) + Math.sin(f * Math.PI) * 14 * s; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + 5 * s, by - 5 * s); c.moveTo(bx, by); c.lineTo(bx + 6 * s, by + 3 * s); c.stroke(); }
      c.fillStyle = G; ellipse(c, ex, ey, 8 * s, 5.5 * s, -0.6); c.fill(); c.strokeStyle = ink; c.lineWidth = 0.6 * s; c.stroke(); c.fillStyle = '#8a1010'; ellipse(c, ex, ey, 3.8 * s, 2.6 * s, -0.6); c.fill(); c.fillStyle = '#ffe9a0'; ellipse(c, ex, ey, 1.4 * s, 1.1 * s); c.fill();
      c.strokeStyle = G; c.lineWidth = 2 * s; c.beginPath(); c.arc(ex + 6 * s, ey - 6 * s, 6 * s, Math.PI * 0.7, Math.PI * 1.9); c.stroke(); // curl
    }
    // far wing (darker), body, near wing: three rows of feathers sweeping up and back
    const wing = (bx, by, a0, a1, rows, shadeK) => { for (let r = 0; r < rows; r++) { const n = 9 - r * 2, len = (66 - r * 18) * s; for (let k = 0; k < n; k++) { const a = lerp(a0, a1, k / (n - 1)); feather(bx, by, a, len * (0.75 + 0.25 * Math.sin(k / (n - 1) * Math.PI)), (5 - r) * s, r === 1 ? shade('#c8902a', shadeK) : G); } } };
    wing(cx + 4 * s, cy - 4 * s, -2.5, -1.1, 3, -0.25);
    c.fillStyle = G; c.beginPath(); c.moveTo(cx - 20 * s, cy - 4 * s); c.quadraticCurveTo(cx - 6 * s, cy - 18 * s, cx + 18 * s, cy - 4 * s); c.quadraticCurveTo(cx + 28 * s, cy + 6 * s, cx + 14 * s, cy + 14 * s); c.quadraticCurveTo(cx - 10 * s, cy + 18 * s, cx - 20 * s, cy - 4 * s); c.fill(); c.strokeStyle = ink; c.lineWidth = 1 * s; c.stroke();
    c.strokeStyle = 'rgba(255,240,190,0.6)'; c.lineWidth = 0.6 * s; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(cx - 10 * s + k * 5 * s, cy + 2 * s + (k % 2) * 3 * s, 3 * s, 0.2, Math.PI - 0.2); c.stroke(); }
    wing(cx + 8 * s, cy - 2 * s, -2.1, -0.75, 3, 0.1);
    // neck and head looking back toward the pearl
    c.strokeStyle = G; c.lineWidth = 8 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 14 * s, cy - 2 * s); c.bezierCurveTo(cx - 30 * s, cy - 8 * s, cx - 22 * s, cy - 30 * s, cx - 34 * s, cy - 38 * s); c.stroke();
    c.strokeStyle = 'rgba(110,60,10,0.6)'; c.lineWidth = 0.6 * s; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(cx - 22 * s - k * 2.4 * s, cy - 8 * s - k * 6 * s, 3 * s, 0.4, 2.6); c.stroke(); }
    c.fillStyle = G; ellipse(c, cx - 36 * s, cy - 41 * s, 7.5 * s, 6.2 * s); c.fill(); c.strokeStyle = ink; c.lineWidth = 0.8 * s; c.stroke();
    c.fillStyle = '#e8b040'; c.beginPath(); c.moveTo(cx - 42 * s, cy - 43 * s); c.quadraticCurveTo(cx - 52 * s, cy - 42 * s, cx - 54 * s, cy - 37 * s); c.lineTo(cx - 42 * s, cy - 38 * s); c.closePath(); c.fill(); c.strokeStyle = ink; c.lineWidth = 0.6 * s; c.stroke();
    c.fillStyle = '#ffffff'; ellipse(c, cx - 37 * s, cy - 43 * s, 2 * s, 1.6 * s); c.fill(); c.fillStyle = '#1a0a00'; ellipse(c, cx - 37.6 * s, cy - 43 * s, 1.1 * s, 1.2 * s); c.fill();
    c.fillStyle = '#a81414'; ellipse(c, cx - 39 * s, cy - 34 * s, 2.4 * s, 3.6 * s); c.fill();
    c.strokeStyle = G; c.lineWidth = 1.4 * s; for (let k = 0; k < 3; k++) { const tx = cx - 22 * s + k * 7 * s, ty = cy - 60 * s + k * 5 * s; c.beginPath(); c.moveTo(cx - 33 * s, cy - 46 * s); c.quadraticCurveTo(cx - 30 * s + k * 3 * s, cy - 58 * s, tx, ty); c.stroke(); c.fillStyle = '#ffe9a0'; ellipse(c, tx, ty, 2.2 * s, 2.2 * s); c.fill(); c.fillStyle = '#a81414'; ellipse(c, tx, ty, 1 * s, 1 * s); c.fill(); }
    c.strokeStyle = G; c.lineWidth = 2.2 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 2 * s, cy + 14 * s); c.lineTo(cx - 8 * s, cy + 30 * s); c.lineTo(cx - 15 * s, cy + 32 * s); c.moveTo(cx - 8 * s, cy + 30 * s); c.lineTo(cx - 6 * s, cy + 35 * s); c.moveTo(cx + 6 * s, cy + 14 * s); c.lineTo(cx + 5 * s, cy + 30 * s); c.lineTo(cx - 1 * s, cy + 34 * s); c.stroke();
  }
  function pearl(c, x, y, r) {
    c.fillStyle = goldGrad(c, x - r * 2, y - r * 2, x + r * 2, y + r * 2);
    for (let k = 0; k < 9; k++) { const a = k / 9 * TAU; c.beginPath(); c.moveTo(x + Math.cos(a - 0.25) * r, y + Math.sin(a - 0.25) * r); c.quadraticCurveTo(x + Math.cos(a) * r * 1.9, y + Math.sin(a) * r * 1.9, x + Math.cos(a + 0.5) * r * 2.1, y + Math.sin(a + 0.5) * r * 2.1); c.quadraticCurveTo(x + Math.cos(a + 0.2) * r * 1.3, y + Math.sin(a + 0.2) * r * 1.3, x + Math.cos(a + 0.25) * r, y + Math.sin(a + 0.25) * r); c.fill(); }
    c.fillStyle = radial(c, x - r * 0.3, y - r * 0.3, r, [[0, '#fffbe8'], [0.6, '#f4e0a0'], [1, '#c8902a']]); ellipse(c, x, y, r, r); c.fill();
    c.strokeStyle = 'rgba(160,100,20,0.6)'; c.lineWidth = r * 0.08; c.beginPath(); for (let a = 0; a < TAU * 1.6; a += 0.2) c.lineTo(x + Math.cos(a) * a / (TAU * 1.6) * r * 0.8, y + Math.sin(a) * a / (TAU * 1.6) * r * 0.8); c.stroke();
  }
  function chandelier(c, x, y, s, rnd) {
    c.strokeStyle = '#c8a050'; c.lineWidth = 1.5 * s; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - 30 * s); c.stroke();
    // tiers of crystal drops
    [[46, 10, 16], [36, 26, 13], [24, 40, 10], [12, 52, 7]].forEach(([r, dy, n]) => {
      c.strokeStyle = '#d8b060'; c.lineWidth = 1.6 * s; ellipse(c, x, y - 30 * s + dy * s, r * s, r * 0.22 * s); c.stroke();
      for (let k = 0; k < n * 2; k++) { const a = k / (n * 2) * TAU, px = x + Math.cos(a) * r * s, py = y - 30 * s + dy * s + Math.sin(a) * r * 0.22 * s, len = (8 + (k % 3) * 4) * s; if (Math.sin(a) < -0.2) c.globalAlpha = 0.55;
        c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = 0.6 * s; c.beginPath(); c.moveTo(px, py); c.lineTo(px, py + len); c.stroke();
        c.fillStyle = linear(c, px - 2 * s, 0, px + 2 * s, 0, [[0, '#c8e0ff'], [0.5, '#ffffff'], [1, '#e8c8ff']]); c.beginPath(); c.moveTo(px, py + len - 1 * s); c.lineTo(px + 1.6 * s, py + len + 2.4 * s); c.lineTo(px, py + len + 5 * s); c.lineTo(px - 1.6 * s, py + len + 2.4 * s); c.closePath(); c.fill(); c.globalAlpha = 1; }
    });
    c.fillStyle = goldGrad(c, x - 8 * s, 0, x + 8 * s, 0); roundRect(c, x - 5 * s, y - 34 * s, 10 * s, 30 * s, 4 * s); c.fill(); ellipse(c, x, y + 26 * s, 6 * s, 9 * s); c.fill();
  }
  function lantern(c, x, y, s, t, i, wind) {
    const sw = Math.sin(t * 0.9 + i * 1.7) * (0.04 + wind * 0.12);
    c.save(); c.translate(x, 0); c.rotate(sw); c.translate(0, y);
    c.strokeStyle = '#3a1a0a'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(0, -y); c.lineTo(0, -22 * s); c.stroke();
    c.fillStyle = '#d8a040'; c.fillRect(-10 * s, -24 * s, 20 * s, 5 * s); c.fillRect(-10 * s, 19 * s, 20 * s, 5 * s);
    c.fillStyle = radial(c, -5 * s, -4 * s, 26 * s, [[0, '#ff6a4a'], [0.6, '#d8141a'], [1, '#7a0408']]); ellipse(c, 0, 0, 22 * s, 20 * s); c.fill();
    c.strokeStyle = 'rgba(80,0,0,0.45)'; c.lineWidth = 0.8 * s; for (let k = -2; k <= 2; k++) { c.beginPath(); c.ellipse(0, 0, Math.abs(k) * 5 * s + 0.5, 20 * s, 0, -Math.PI / 2, Math.PI / 2, k < 0); c.stroke(); }
    c.fillStyle = '#ffd860'; c.font = JF(14 * s); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('福', 0, 1 * s);
    c.strokeStyle = '#e8b040'; c.lineWidth = 0.8 * s; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(k * 1.4 * s, 24 * s); c.lineTo(k * 1.8 * s + Math.sin(t * 2 + k) * 1 * s, 40 * s); c.stroke(); }
    c.restore();
  }
  /* ---------- Hong Kong street through the window: tenements, neon, a ding-ding tram, red taxis ---------- */
  const streetCache = {};
  function street(c, x, y, w, h, lights, V) {
    const t = V.t, u = V.u, g = y + h * 0.78, key = `${w | 0}x${h | 0}x${V.D}:${Math.round(lights * 4)}`;
    if (!streetCache[key]) { for (const k in streetCache) delete streetCache[k]; const [cv, cx] = hiCanvas(w, h, V.D); cx.translate(-x, -y); streetStatic(cx, x, y, w, h, lights, V); streetCache[key] = cv; }
    c.drawImage(streetCache[key], x, y, w, h);
    streetLive(c, x, y, w, h, lights, V, t, u, g);
  }
  function streetStatic(c, x, y, w, h, lights, V) {
    const t = 0, u = V.u, rnd = mulberry32(852), g = y + h * 0.78;
    for (let b = 0; b < 6; b++) {
      const bx = x + b * w / 5 - w * 0.08, bw = w / 5 + 4 * u, top = y + h * (0.02 + rnd() * 0.2);
      c.fillStyle = Looks.pickR(rnd, ['#c8b8a0', '#a8b0a8', '#d8c8b0', '#b8a090', '#9aa8b0']); c.fillRect(bx, top, bw, g - top);
      for (let r = top + 6 * u; r < g - 10 * u; r += 11 * u) for (let q = bx + 3 * u; q < bx + bw - 6 * u; q += 8 * u) {
        const on = rnd() < 0.3 + lights * 0.5; c.fillStyle = on && lights > 0.2 ? 'rgba(255,220,150,0.85)' : 'rgba(60,80,90,0.7)'; c.fillRect(q, r, 5 * u, 6 * u);
        if (rnd() < 0.2) { c.fillStyle = '#e8e8e0'; c.fillRect(q - 1 * u, r + 6 * u, 6 * u, 3 * u); } // air-con box
        if (rnd() < 0.08) { c.fillStyle = Looks.pickR(rnd, ['#e85a5a', '#5a8ae8', '#f0e070', '#ffffff']); c.fillRect(q, r + 5 * u, 5 * u, 1.5 * u); } // laundry
      }
    }
    // vertical neon shop signs
    [['押', '#ff4a4a', 0.12], ['藥行', '#4af0ff', 0.42], ['茶餐廳', '#ffb040', 0.72]].forEach(([s, col, f], i) => {
      const sx = x + w * f, sy = y + h * 0.1, sh = s.length * 15 * u + 8 * u, on = 0.5 + 0.5 * lights;
      c.fillStyle = '#1a1a1a'; c.fillRect(sx - 9 * u, sy, 18 * u, sh); c.strokeStyle = rgba(col, on); c.lineWidth = 1.5 * u; c.strokeRect(sx - 8 * u, sy + 1 * u, 16 * u, sh - 2 * u);
      c.fillStyle = rgba(col, 0.6 + 0.4 * on * (0.9 + 0.1 * Math.sin(t * 17 + i * 5))); c.font = JF(13 * u); c.textAlign = 'center'; c.textBaseline = 'middle';
      [...s].forEach((ch, k) => c.fillText(ch, sx, sy + 11 * u + k * 15 * u));
      if (lights > 0.3) { c.fillStyle = rgba(col, 0.12 * lights); c.fillRect(sx - 20 * u, sy - 6 * u, 40 * u, sh + 12 * u); }
    });
    // road, tram tracks, overhead wire
    c.fillStyle = '#5a5a5e'; c.fillRect(x, g, w, h - (g - y)); c.fillStyle = '#9a9a9a'; c.fillRect(x, g + 6 * u, w, 1 * u); c.fillRect(x, g + 12 * u, w, 1 * u);
    c.strokeStyle = '#2a2a2a'; c.lineWidth = 0.8 * u; c.beginPath(); c.moveTo(x, y + h * 0.42); c.lineTo(x + w, y + h * 0.44); c.stroke();
  }
  function streetLive(c, x, y, w, h, lights, V, t, u, g) {
    // the tram: green double-decker with a cream band, every ~22 s
    const ph = (t % 22) / 22, tx = x + w * 1.2 - ph * w * 2.6, tw = 70 * u, tb = g + 10 * u;
    if (tx < x + w + 10 && tx + tw > x - 10) {
      c.fillStyle = '#1e6a3a'; roundRect(c, tx, tb - 46 * u, tw, 44 * u, 4 * u); c.fill();
      c.fillStyle = '#f2ead0'; c.fillRect(tx, tb - 26 * u, tw, 4 * u);
      c.fillStyle = 'rgba(200,230,240,0.85)'; for (let k = 0; k < 6; k++) { c.fillRect(tx + 4 * u + k * 11 * u, tb - 42 * u, 8 * u, 10 * u); c.fillRect(tx + 4 * u + k * 11 * u, tb - 20 * u, 8 * u, 10 * u); }
      c.fillStyle = '#e8402a'; c.fillRect(tx + 14 * u, tb - 31 * u, 40 * u, 4 * u); // advert strip
      c.strokeStyle = '#2a2a2a'; c.lineWidth = 1 * u; c.beginPath(); c.moveTo(tx + 30 * u, tb - 46 * u); c.lineTo(tx + 40 * u, y + h * 0.43); c.stroke();
      c.fillStyle = '#1a1a1a'; ellipse(c, tx + 12 * u, tb, 3 * u, 3 * u); c.fill(); ellipse(c, tx + tw - 12 * u, tb, 3 * u, 3 * u); c.fill();
      if (Math.abs(ph - 0.5) < 0.004 && V.on && !V.S.dingT) { V.S.dingT = 2; SFX('bell'); }
    }
    // red-and-silver taxis
    for (let k = 0; k < 2; k++) { const px = x + ((t * (40 + k * 25) + k * 200) * u) % (w + 60 * u) - 30 * u; c.fillStyle = '#c8141a'; roundRect(c, px, g + 14 * u, 26 * u, 8 * u, 2 * u); c.fill(); c.fillStyle = '#d8d8d8'; roundRect(c, px + 5 * u, g + 9 * u, 14 * u, 6 * u, 2 * u); c.fill(); c.fillStyle = '#1a1a1a'; ellipse(c, px + 6 * u, g + 22 * u, 2.4 * u, 2.4 * u); c.fill(); ellipse(c, px + 20 * u, g + 22 * u, 2.4 * u, 2.4 * u); c.fill(); }
    // pedestrians with umbrellas when wet
    for (let k = 0; k < 4; k++) { const px = x + ((t * 12 * (k % 2 ? 1 : -1) + k * 97) * u % w + w) % w, py = g + 2 * u; c.fillStyle = Looks.pickR(mulberry32(k), ['#2a2a3a', '#7a2a2a', '#3a5a7a', '#5a5a5a']); c.fillRect(px - 2 * u, py - 14 * u, 4 * u, 10 * u); ellipse(c, px, py - 17 * u, 2.4 * u, 2.6 * u); c.fillStyle = '#e8c8a8'; c.fill(); if (Amb.st.wet) { c.fillStyle = Looks.pickR(mulberry32(k + 9), ['#2a2a6a', '#c82a2a', '#1a1a1a', '#e8b020']); c.beginPath(); c.arc(px, py - 20 * u, 8 * u, Math.PI, 0); c.fill(); } }
  }
  /* ---------- trolley (person-local units, facing right; feet at y = 122) ---------- */
  function trolley(c, load, lid, t, label, flip) {
    c.save();
    c.strokeStyle = '#a8b0b8'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(22, 52); c.lineTo(22, 70); c.lineTo(30, 70); c.stroke(); // handle
    c.strokeStyle = '#e8eef4'; c.lineWidth = 3; c.beginPath(); c.moveTo(20, 52); c.lineTo(26, 52); c.stroke();
    c.fillStyle = linear(c, 28, 0, 82, 0, [[0, '#8a949e'], [0.25, '#eef2f6'], [0.5, '#b8c0c8'], [0.8, '#f4f8fc'], [1, '#7a848e']]); roundRect(c, 28, 64, 54, 34, 3); c.fill();
    c.strokeStyle = 'rgba(60,70,80,0.6)'; c.lineWidth = 0.6; c.strokeRect(31, 67, 48, 28);
    c.fillStyle = '#c8141a'; c.fillRect(44, 70, 22, 22); c.fillStyle = '#ffe9a0'; c.font = JF(8.5); c.textAlign = 'center'; c.textBaseline = 'middle'; c.save(); c.translate(55, 0); if (flip) c.scale(-1, 1); c.fillText(label[0], 0, 76); c.fillText(label[1], 0, 86); c.restore(); // hand-written dish card
    c.fillStyle = '#8a949e'; c.fillRect(30, 108, 50, 3); c.fillRect(30, 96, 3, 14); c.fillRect(77, 96, 3, 14); // lower shelf
    c.fillStyle = '#2a2a2a'; [34, 76].forEach((wx) => { ellipse(c, wx, 116, 4.5, 4.5); c.fill(); }); c.fillStyle = '#9a9a9a'; [34, 76].forEach((wx) => { ellipse(c, wx, 116, 1.6, 1.6); c.fill(); });
    // stacked bamboo steamers on the steam well
    for (let k = 0; k < Math.min(3, load); k++) { const yy = 63 - k * 9; c.fillStyle = linear(c, 34, 0, 76, 0, [[0, '#8a5a24'], [0.4, '#e8bc70'], [1, '#7a4a1a']]); c.fillRect(34, yy - 8, 42, 8); ellipse(c, 55, yy, 21, 4); c.fill(); c.strokeStyle = 'rgba(90,50,10,0.55)'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(34, yy - 4); c.lineTo(76, yy - 4); c.stroke(); }
    const topY = 63 - Math.min(3, load) * 9;
    if (load > 0 && !lid) { c.fillStyle = '#b8864a'; ellipse(c, 55, topY + 1, 21, 4.5); c.fill(); c.fillStyle = '#6a4418'; ellipse(c, 55, topY, 20, 3.6); c.fill(); c.strokeStyle = 'rgba(255,220,150,0.5)'; c.lineWidth = 0.5; for (let r = 4; r < 20; r += 4) { ellipse(c, 55, topY, r, r * 0.18); c.stroke(); } }
    for (let k = 0; k < 3; k++) { const p = (t * 0.6 + k / 3) % 1; c.fillStyle = `rgba(255,255,255,${(1 - p) * (lid ? 0.5 : 0.22)})`; ellipse(c, 50 + k * 6 + Math.sin(t * 2 + k) * 3, topY - 4 - p * 30, 5 + p * 8, 4 + p * 6); c.fill(); }
    c.restore();
  }
  function lidItem(c, x, y) { c.save(); c.translate(x + 4, y - 4); c.rotate(-0.5); c.fillStyle = '#b8864a'; ellipse(c, 0, 0, 13, 3.6); c.fill(); c.fillStyle = '#6a4418'; ellipse(c, 0, -1, 12, 2.8); c.fill(); c.restore(); }
  const steamerItem = (c, x, y) => { c.save(); c.translate(x + 6, y - 2); c.fillStyle = linear(c, -11, 0, 11, 0, [[0, '#8a5a24'], [0.4, '#e8bc70'], [1, '#7a4a1a']]); c.fillRect(-11, -6, 22, 6); ellipse(c, 0, 0, 11, 2.4); c.fill(); c.fillStyle = '#f6eee0'; ellipse(c, 0, -6, 9, 2); c.fill(); c.restore(); };
  const stampItem = (c, x, y) => { c.fillStyle = '#5a2a1a'; c.fillRect(x - 1.4, y - 7, 2.8, 6); c.fillStyle = '#c8141a'; c.fillRect(x - 2.4, y - 1.5, 4.8, 2.4); };
  const kettleItem = (c, x, y) => { c.save(); c.translate(x + 2, y + 2); c.fillStyle = linear(c, -7, 0, 7, 0, [[0, '#8a949e'], [0.4, '#f4f8fc'], [1, '#7a848e']]); ellipse(c, 0, 0, 7, 6); c.fill(); c.strokeStyle = '#a8b0b8'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(6, -1); c.lineTo(14, -7); c.stroke(); c.beginPath(); c.arc(0, -6, 4, Math.PI, 0); c.stroke(); c.restore(); };
  const cageItem = (c, x, y) => { c.save(); c.translate(x, y + 2); c.strokeStyle = '#c8a060'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(0, -8); c.lineTo(0, -2); c.stroke(); c.fillStyle = '#e8e0d0'; c.fillRect(-9, 18, 18, 2); for (let k = -4; k <= 4; k++) { c.beginPath(); c.moveTo(k * 2, 0); c.quadraticCurveTo(k * 2.4, 10, k * 2, 19); c.stroke(); } c.beginPath(); c.ellipse(0, 1, 8, 3, 0, Math.PI, 0); c.stroke(); c.fillStyle = 'rgba(20,20,40,0.45)'; c.fillRect(-9, -1, 18, 20); c.fillStyle = '#7ab040'; ellipse(c, 1, 13, 2.4, 1.8); c.fill(); c.restore(); };
  const fishItem = (flap) => (c, x, y) => { c.save(); c.translate(x + 4, y - 6); c.rotate(flap); c.fillStyle = linear(c, -10, -4, 10, 4, [[0, '#6a5a3a'], [0.5, '#a89a6a'], [1, '#5a4a2a']]); ellipse(c, 0, 0, 11, 4.4); c.fill(); c.fillStyle = 'rgba(40,30,10,0.6)'; for (let q = 0; q < 6; q++) { ellipse(c, -6 + q * 2.4, -1 + (q % 2) * 2, 0.9, 0.9); c.fill(); } c.beginPath(); c.moveTo(-10, 0); c.lineTo(-16, -5); c.lineTo(-16, 5); c.closePath(); c.fillStyle = '#5a4a2a'; c.fill(); c.fillStyle = '#ffffff'; ellipse(c, 7, -1.4, 1.4, 1.4); c.fill(); c.fillStyle = '#000000'; ellipse(c, 7.3, -1.4, 0.7, 0.7); c.fill(); c.restore(); };
  const fishCarry = (c) => fishItem(Math.sin(performance.now() / 60) * 0.3)(c, 0, 26);
  /* ---------- lion dance (南獅) drawn at world position ---------- */
  function lion(c, x, y, k, t, L) {
    const dir = L.dir, bob = Math.sin(t * 9) * 3, rear = L.rear || 0, mouth = L.mouth || 0, blink = L.blink || 0;
    c.save(); c.translate(x, y); c.scale(k * dir, k);
    const step = (ph) => Math.sin(t * 9 + ph);
    const leg = (lx, ph, col, ofs = 0) => { const s = step(ph); c.strokeStyle = col; c.lineWidth = 11; c.lineCap = 'round'; c.beginPath(); c.moveTo(lx, -54 - ofs); c.lineTo(lx + s * 6, -26 - Math.max(0, s) * 6); c.lineTo(lx + s * 9, -4 - Math.max(0, s) * 8); c.stroke(); c.fillStyle = '#1a1a1a'; roundRect(c, lx + s * 9 - 5, -6 - Math.max(0, s) * 8, 12, 6, 2); c.fill(); c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.beginPath(); c.moveTo(lx - 5, -40 - ofs); c.lineTo(lx + 6, -40 - ofs); c.stroke(); };
    leg(-58, 0, '#e8b020'); leg(-44, Math.PI, '#e8b020'); leg(4, 0.6 + Math.PI, '#e8b020', rear * 20); leg(18, 0.6, '#e8b020', rear * 20);
    // body cloth with scales and fur trim
    c.beginPath(); c.moveTo(30, -120 - rear * 40 + bob); c.quadraticCurveTo(-20, -112, -70, -86); c.quadraticCurveTo(-84, -70, -78, -46); c.lineTo(20, -46 - rear * 10); c.closePath();
    c.fillStyle = linear(c, -80, 0, 30, 0, [[0, '#a00a10'], [0.5, '#e8141a'], [1, '#c80a10']]); c.fill();
    c.save(); c.clip(); c.strokeStyle = 'rgba(255,210,80,0.7)'; c.lineWidth = 1.2; for (let r = -120; r < -40; r += 7) for (let q = -84; q < 34; q += 9) { c.beginPath(); c.arc(q + ((r / 7) % 2) * 4.5, r, 4.5, 0, Math.PI); c.stroke(); } c.restore();
    c.fillStyle = '#ffffff'; for (let q = -78; q < 22; q += 5) { ellipse(c, q, -46 + Math.sin(q + t * 6) * 1.5, 3.4, 4); c.fill(); }
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-74, -82); c.quadraticCurveTo(-96, -86 + Math.sin(t * 8) * 6, -100, -66 + Math.sin(t * 8) * 8); c.quadraticCurveTo(-86, -70, -76, -60); c.fill(); // tail
    // head
    c.save(); c.translate(36, -116 - rear * 44 + bob); c.rotate(Math.sin(t * 4.5) * 0.12 - rear * 0.25);
    c.fillStyle = '#ffffff'; ellipse(c, -2, 40, 30, 14); c.fill(); // beard
    c.fillStyle = linear(c, -40, -40, 40, 40, [[0, '#ffd040'], [0.5, '#e8141a'], [1, '#a00a10']]); ellipse(c, 0, 0, 38, 36); c.fill();
    c.strokeStyle = '#2a8a3a'; c.lineWidth = 4; ellipse(c, 0, 0, 36, 34); c.stroke();
    c.fillStyle = '#1a1a1a'; c.beginPath(); c.moveTo(-26, 16); c.quadraticCurveTo(0, 22 + mouth * 22, 28, 16); c.lineTo(28, 20); c.quadraticCurveTo(0, 30 + mouth * 26, -26, 20); c.closePath(); c.fill(); // mouth
    c.fillStyle = '#e8141a'; ellipse(c, 0, 22 + mouth * 14, 10, 3 + mouth * 4); c.fill(); // tongue
    c.fillStyle = '#ffffff'; for (let q = -20; q <= 20; q += 8) { c.beginPath(); c.moveTo(q - 3, 16); c.lineTo(q, 21); c.lineTo(q + 3, 16); c.fill(); }
    c.fillStyle = '#e8b020'; roundRect(c, -30, 22 + mouth * 22, 60, 9, 4); c.fill(); // lower jaw
    c.fillStyle = radial(c, -2, -18, 9, [[0, '#ffffff'], [0.5, '#c8d8e8'], [1, '#6a7a8a']]); ellipse(c, 0, -20, 8, 8); c.fill(); c.strokeStyle = '#e8b020'; c.lineWidth = 2; c.stroke(); // mirror
    c.fillStyle = '#2a8a3a'; c.beginPath(); c.moveTo(-4, -34); c.quadraticCurveTo(0, -56, 6, -46); c.quadraticCurveTo(4, -38, 4, -32); c.fill(); // horn
    [-1, 1].forEach((sd) => { c.fillStyle = '#ffffff'; ellipse(c, sd * 15, -2, 11, 10); c.fill(); c.fillStyle = '#1a1a1a'; ellipse(c, sd * 15 + 2, -1, 5.5, 6.5); c.fill(); c.fillStyle = '#ffffff'; ellipse(c, sd * 15 + 3.5, -3.5, 1.8, 1.8); c.fill();
      c.fillStyle = '#e8b020'; c.fillRect(sd * 15 - 11, -12, 22, 10 * blink + 1); c.strokeStyle = '#1a1a1a'; c.lineWidth = 1.2; for (let q = -3; q <= 3; q++) { c.beginPath(); c.moveTo(sd * 15 + q * 3, -12 + 10 * blink); c.lineTo(sd * 15 + q * 3.6, -8 + 10 * blink); c.stroke(); } // eyelid + lashes
      c.fillStyle = '#ffffff'; for (let q = 0; q < 5; q++) { ellipse(c, sd * (6 + q * 5), -16 - Math.sin(q) * 2, 4, 3); c.fill(); } // fur brows
      c.fillStyle = '#e8b020'; c.beginPath(); c.moveTo(sd * 30, -14); c.lineTo(sd * 46, -28 + Math.sin(t * 10) * 4); c.lineTo(sd * 36, -4); c.closePath(); c.fill(); }); // ears flap
    c.restore();
    c.restore();
  }
  function peachBuns(c, x, y, s) {
    c.fillStyle = '#f8f6f0'; ellipse(c, x, y, 18 * s, 5 * s); c.fill(); c.strokeStyle = '#c8141a'; c.lineWidth = 0.8 * s; ellipse(c, x, y, 16 * s, 4.2 * s); c.stroke();
    [[0, 0], [-7, 0], [7, 0], [-3.5, -5], [3.5, -5], [0, -10]].forEach(([dx, dy]) => { const px = x + dx * s, py = y + dy * s - 3 * s;
      c.fillStyle = radial(c, px - 1 * s, py - 1 * s, 5 * s, [[0, '#fffaf4'], [0.6, '#fbe8e0'], [1, '#f0a0a0']]); c.beginPath(); c.moveTo(px, py - 5 * s); c.quadraticCurveTo(px + 4.5 * s, py - 2 * s, px + 3 * s, py + 2.4 * s); c.quadraticCurveTo(px, py + 3.6 * s, px - 3 * s, py + 2.4 * s); c.quadraticCurveTo(px - 4.5 * s, py - 2 * s, px, py - 5 * s); c.fill();
      c.fillStyle = 'rgba(240,90,110,0.55)'; ellipse(c, px + 0.4 * s, py - 3 * s, 1.6 * s, 1.4 * s); c.fill(); c.fillStyle = '#4a9a3a'; ellipse(c, px - 2 * s, py + 2.2 * s, 2 * s, 0.9 * s, 0.4); c.fill(); });
  }
  const STEAMED = ['hargow', 'siumai', 'bao', 'claws', 'lomai', 'lau', 'malai'], FRIED = ['tart', 'turnip', 'roll', 'sesame', 'cheung'];
  const TEAS = ['普洱', '香片', '鐵觀音', '壽眉', '菊花'];
  const cfg = {
    id: 'dimsum', flow: 'table', seed: 1960, cap: 15, spawnEvery: 9, lane: 0.975, peopleScale: 1.6, cat: false, birthday: false,
    vignette: 'rgba(60,8,0,0.5)', passX: 0.9, wetSignX: 0.5, initial: 3,
    lights: [{ x: 0.255, y: 0.12, r: 280, col: '#fff0c8', a: 0.22 }, { x: 0.5, y: 0.3, r: 300, col: '#ffe0a0', a: 0.12 }, { x: 0.745, y: 0.12, r: 280, col: '#fff0c8', a: 0.22 }, { x: 0.12, y: 0.17, r: 120, col: '#ff4030', a: 0.16 }, { x: 0.88, y: 0.17, r: 120, col: '#ff4030', a: 0.16 }, { x: 0.775, y: 0.4, r: 150, col: '#60c0ff', a: 0.14 }],
    windows: [{ x: 0.025, y: 0.15, w: 0.135, h: 0.33, city: street, frame(c, V) { const u = V.u, x0 = V.X(0.025), y0 = V.Y(0.15), w = V.X(0.135), h = V.Y(0.33);
      c.strokeStyle = '#c8a050'; c.lineWidth = 5 * u; c.strokeRect(x0, y0, w, h); c.lineWidth = 2.4 * u; c.beginPath(); c.moveTo(x0 + w / 2, y0); c.lineTo(x0 + w / 2, y0 + h); c.moveTo(x0, y0 + h * 0.4); c.lineTo(x0 + w, y0 + h * 0.4); c.stroke();
      c.fillStyle = 'rgba(200,20,26,0.75)'; c.font = JF(16 * u); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('飲茶', x0 + w * 0.25, y0 + h * 0.2); c.fillText('點心', x0 + w * 0.75, y0 + h * 0.2); } }],
    look(rnd, V, opt) {
      const o = Object.assign({ noHat: true }, opt.look || {}), L = Looks.random(rnd, o);
      L.skin = Looks.pickR(rnd, ['pale', 'light', 'light', 'olive', 'light', 'tan', 'pale']);
      if (L.age !== 'old') L.hair = Looks.pickR(rnd, ['black', 'black', 'dbrown', 'black', 'brown']);
      if (L.age === 'old') { L.hairStyle = L.female ? Looks.pickR(rnd, ['perm', 'perm', 'bob', 'bun']) : Looks.pickR(rnd, ['short', 'side', 'bald']); L.top = Object.assign(L.top, { type: Looks.pickR(rnd, L.female ? ['cardigan', 'blouse', 'cardigan'] : ['cardigan', 'polo', 'shirt']), col: Looks.pickR(rnd, ['#8a7a5a', '#5a6a7a', '#c8c0a8', '#4a4a52', '#8a3a3a', '#6a7a5a']) }); }
      if (o.red) { L.top.type = 'qipao'; L.top.col = '#c8141a'; L.top.trim = '#ffd860'; L.top.pattern = 'flower'; }
      return L;
    },
    spawn(V) {
      const r = Math.random(), n = r < 0.15 ? 2 : r < 0.55 ? 3 : 4;
      const fam = [[{ age: 'adult' }, { age: 'adult' }], [{ age: 'old' }, { age: 'adult' }, { age: 'adult' }], [{ age: 'old' }, { age: 'adult' }, { age: 'adult' }, { age: 'kid' }], [{ age: 'adult' }, { age: 'adult' }, { age: 'kid' }, { age: 'kid' }], [{ age: 'old', female: false }, { age: 'old', female: false }, { age: 'old', female: true }]];
      const cand = fam.filter((f) => f.length === n), looks = cand.length ? Looks.pickR(Math.random, cand) : [];
      V.party(n, { looks });
    },
    queue(V) { return [0, 1, 2, 3, 4, 5].map((i) => [V.X(0.165) - i * 36 * V.u, V.lane() - 4 * V.u - (i % 2) * 6 * V.u, V.X(0.2)]); },
    setup(V) {
      const X = V.X;
      [0.315, 0.535, 0.755].forEach((f) => V.addTable({ x: f, y: 0.8, rx: 86, ry: 21, neck: 46, seats: [[-1, 1], [-0.36, 1], [0.36, -1], [1, -1]] }));
      V.S.num = 52; V.S.cages = [];
      // hostess in a red qipao at the podium; tea captain; two trolley aunties; the dim sum chef at the pass
      V.S.hostess = V.addStaff({ role: 'idle', floor: true, x: 0.205, feetY: 0.925, look: { female: true, lashes: true, skin: 'light', hair: 'black', hairStyle: 'bun', lips: '#c0283a', acc: { earrings: '#e8c050' }, top: { type: 'qipao', col: '#b8101a', trim: '#ffd860', pattern: 'flower', skirt: { col: '#b8101a', len: 112 } }, bareLegs: true, shoe: '#1a120c' }, idle: [['stand', 3], ['bow', 1.4], ['menuHold', 3]] });
      V.S.captain = V.addStaff({ role: 'waiter', floor: true, x: 0.255, feetY: 0.93, speed: 80, look: { skin: 'light', hair: 'black', hairStyle: 'slick', acc: { glasses: '#2a2a2a' }, top: { type: 'vest', col: '#1a1a1a', shirt: '#f6f4ee', bow: '#a0101a', badge: true }, sleeves: 'long', pants: '#1a1a1a', shoe: '#0a0a0a' }, accepts: (j) => j.kind !== 'serve', idle: [['stand', 2], ['teaPrep', 2.4], ['lookabout', 2]] });
      V.addStaff({ role: 'waiter', floor: true, x: 0.84, feetY: 0.93, speed: 84, look: { female: true, lashes: true, skin: 'light', hair: 'black', hairStyle: 'pony', top: { type: 'vest', col: '#1a1a1a', shirt: '#f6f4ee', bow: '#a0101a', badge: true, skirt: { col: '#1a1a1a', len: 100 } }, sleeves: 'long', shoe: '#0a0a0a' }, accepts: (j) => j.kind !== 'serve' && !j.buns, idle: [['stand', 2], ['lookabout', 2]] });
      const aunty = (x, kinds, look) => { const s = V.addStaff({ role: 'trolley', floor: true, x, speed: 52, look, trolley: true, life: (s2) => auntyLife(s2, V) }); s.kinds = kinds; s.load = 3; s.label = [MENU[kinds[0]][0].slice(0, 2), MENU[kinds[1]][0].slice(0, 2)]; return s; };
      aunty(0.45, STEAMED, { female: true, age: 'old', skin: 'light', hair: 'grey', hairStyle: 'perm', acc: { glasses: '#8a5a2a', round: true }, top: { type: 'uniform', col: '#c8506a', trim: '#f8e0e8', apron: '#f6f2ea' }, sleeves: 'long', pants: '#2a2a3a', shoe: '#1a1a1a' });
      aunty(0.66, FRIED, { female: true, age: 'old', skin: 'olive', hair: 'black', hairStyle: 'perm', top: { type: 'uniform', col: '#8a2a4a', trim: '#f8e0e8', apron: '#f6f2ea' }, sleeves: 'long', pants: '#2a2a3a', shoe: '#1a1a1a' });
      V.S.chef = V.addStaff({ role: 'cook', layer: 'back', armsOver: true, x: 0.915, y: 0.405, k: 0.85, look: { skin: 'light', hair: 'black', hairStyle: 'short', acc: { hat: 'paper', hatCol: '#ffffff' }, top: { type: 'uniform', col: '#f6f6f2', trim: '#d8d8d0' }, sleeves: 'long' }, idle: [['fold', 2.4], ['pleat', 2], ['steam', 2]] });
    },
    tableDish(tb) { return [dish(pick(STEAMED)), dish(pick(STEAMED))]; },
    prep(j) { return [['fold', 1.8], ['pleat', 1.6], ['load', 1.2], ['steam', 2.2]]; },
    tray(j) { return j.buns ? (c) => peachBuns(c, 0, 28, 1) : null; },
    dirtyTray() { return (c) => { for (let k = 0; k < 3; k++) steamerItem(c, -6, 30 - k * 6); }; },
    *partyEat(a, tb, V) {
      const n = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const avail = (tb.dishes || []).filter((d) => d.left > 0.05), r = Math.random();
        if (r < 0.13 && a.buddy && a.buddy.sitting && a.P.age !== 'kid') { a.act = 'pourTea'; a.actT = 0; a.item2 = Items.teapot; a.look = a.buddy.x; a.buddy.tapT = 1.8; yield ['wait', 1.9]; a.item2 = null; continue; }
        if (r < 0.2 && a.P.age === 'old' && !a.P.female) { a.act = 'read'; a.menuCol = '#e8e4d8'; a.actT = 0; yield ['wait', 3.2]; continue; }
        if (r < 0.26 && a.P.age === 'kid') { a.act = 'cheer'; a.cheer = 1; yield ['wait', 1]; continue; }
        if (!avail.length) { a.act = Math.random() < 0.6 ? 'talk' : 'laugh'; a.actT = 0; a.look = a.buddy ? a.buddy.x : tb.x; yield ['wait', 1.4 + Math.random()]; continue; }
        const d = avail[Math.floor(Math.random() * avail.length)];
        tb.S.spinTo = (tb.S.spinTo || 0) + (Math.random() < 0.5 ? -0.7 : 0.7); // turn the lazy susan toward yourself
        a.act = 'eat'; a.actT = 0; a.item2 = Items.chopsticks(MENU[d.kind][1]); a.look = tb.x; yield ['wait', 2.4 + Math.random() * 0.8];
        d.left = Math.max(0, d.left - 1 / d.n); a.item2 = null;
        a.act = Math.random() < 0.5 ? 'talk' : 'stand'; a.actT = 0; a.look = a.buddy ? a.buddy.x : null; yield ['wait', 0.8 + Math.random()];
      }
    },
    tableTick(tb, dt, V) {
      const S = tb.S;
      if (tb.state === 'seating' && S.prev !== 'seating') { V.S.num++; V.S.callT = 2.4; SFX('ding'); }
      if (tb.state === 'free' && S.prev && S.prev !== 'free') { tb.S = { spin: S.spin || 0, spinTo: S.spinTo || 0 }; }
      if (tb.state === 'order' && V.S.captain.job && V.S.captain.job.table === tb && V.S.captain.actT > 1.1 && !S.tapped) { S.tapped = true; tb.party.members.forEach((m) => { m.tapT = 1.6; }); }
      if (['waiting', 'eating', 'bill'].includes(tb.state)) S.pot = true;
      if (tb.state === 'eating' && !S.ajar && !S.refillJob && Math.random() < dt / 28) { S.ajar = true; S.refillJob = V.job({ kind: 'task', table: tb, role: 'waiter', act: 'refill', dur: 2.2, start: () => tb.party && tb.party.members.forEach((m) => { m.tapT = 1.4; }), finish: () => { S.ajar = false; S.refillJob = null; } }); }
      S.spin = (S.spin || 0) + ((S.spinTo || 0) - (S.spin || 0)) * Math.min(1, dt * 2.5);
      S.prev = tb.state;
    },
    tick(V, dt, t) {
      if (V.S.callT > 0) V.S.callT -= dt; if (V.S.dingT > 0) V.S.dingT -= dt;
      V.agents.forEach((a) => { if (a.tapT > 0) a.tapT -= dt; if (a.awe > 0) a.awe -= dt; });
      // hostess calls the next number with her microphone
      const h = V.S.hostess; if (V.S.callT > 0 && h.act !== 'call') { h.act = 'call'; h.actT = 0; } else if (!(V.S.callT > 0) && h.act === 'call') { h.act = 'stand'; }
      // live seafood: the captain nets a fish and shows it to a table
      const cap = V.S.captain;
      if (V.S.fishReq && !V.S.fishBusy && !cap.job) { V.S.fishBusy = true; const tb = V.tables.find((x) => x.state === 'eating') || V.tables[1];
        Crowd.hijack(cap, (function* () {
          cap.act = 'walk'; yield ['walk', V.X(0.775), V.lane()]; cap.act = 'net'; cap.actT = 0; SFX('pop'); yield ['wait', 1.8]; V.S.fishHeld = true; V.burst(V.X(0.775), V.Y(0.5), 10, '#a8d8ff', { kind: 'drop', up: 120, sp: 60 });
          cap.carry = fishCarry; yield ['walk', tb.x + 110 * V.u, V.lane()]; cap.carry = null; cap.face = -1; cap.look = tb.x;
          cap.act = 'show'; cap.actT = 0; if (tb.party) tb.party.members.forEach((m) => { m.awe = 3; }); yield ['wait', 3];
          cap.carry = fishCarry; yield ['walk', V.X(0.9), V.lane()]; cap.carry = null; cap.act = 'hand'; cap.actT = 0; yield ['wait', 0.8]; V.S.fishHeld = false;
          cap.act = 'walk'; yield ['walk', cap.home[0], cap.home[1]];
        })()); }
      // lion dance progression
      const L = V.S.lion;
      if (L) {
        L.t += dt; const tgt = L.tb ? L.tb.x : V.X(0.5);
        if (L.t < 8) { L.x = lerp(-V.X(0.12), tgt - 40 * V.u, L.t / 8); L.dir = 1; L.mouth = 0.3 + 0.3 * Math.sin(t * 8); }
        else if (L.t < 15) { L.dir = Math.sin(L.t * 0.9) > 0 ? 1 : -1; L.mouth = 0.5 + 0.5 * Math.sin(t * 6); L.rear = Math.max(0, Math.sin((L.t - 8) * 0.9)) * 0.6; }
        else if (L.t < 19) { L.dir = 1; L.rear = Math.min(1, (L.t - 15) / 1.2); L.mouth = L.t > 17 ? 1 : 0.3; if (L.t > 17.3 && !L.ate) { L.ate = true; SFX('pop'); } }
        else if (L.t < 21) { L.rear = Math.max(0, 1 - (L.t - 19)); L.mouth = 1; if (!L.spat) { L.spat = true; V.burst(L.x + 60 * V.u, V.lane() - 150 * V.u, 34, () => pick(['#5ab040', '#8ad050', '#3a8a2a', '#c8141a', '#ffd860']), { kind: 'confetti', up: 260, sp: 200, life: 2.2 }); SFX('cheer'); V.agents.forEach((a) => { if (Math.random() < 0.8) a.cheer = 1.8; }); } }
        else { L.x -= 70 * V.u * dt; L.dir = -1; L.mouth = 0.3 + 0.3 * Math.sin(t * 8); }
        L.blink = Math.max(0, Math.sin(t * 1.7)) > 0.97 ? 1 : (L.t > 8 && L.t < 15 ? Math.max(0, Math.sin(t * 3)) * 0.8 : 0);
        L.drumT = (L.drumT || 0) - dt; if (L.drumT <= 0 && L.t < 26) { L.drumT = 3.8; SFX('lion'); }
      }
    },
    custPose(a, ps, t, V) {
      if (a.tapT > 0) { ps.arms = ps.arms.filter((x) => x.side !== 1); const b = Math.abs(Math.sin(t * 14)); ps.arms.push({ side: 1, x: 18, y: 46 - b * 3, grip: 'point' }); ps.face.mouth = 'smile'; ps.head.nod = 0.6 + b * 0.5; }
      if (a.awe > 0) { ps.face.mouth = 'o'; ps.face.open = 0.6; ps.face.brow = 1; ps.lean = 0.06 * (a.face || 1); ps.face.eyes = null; }
      if (a.perf === 'drum') { const b = Math.sin(t * 20); ps.arms = [{ side: -1, x: -6 + b * 4, y: 34 - Math.max(0, b) * 10, grip: 'fist', item: (c, x, y) => { c.strokeStyle = '#c8a060'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 8, y + 6); c.stroke(); } }, { side: 1, x: 8 - b * 4, y: 34 - Math.max(0, -b) * 10, grip: 'fist', item: (c, x, y) => { c.strokeStyle = '#c8a060'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 8, y + 6); c.stroke(); } }]; ps.over = (c) => { c.fillStyle = '#c8141a'; c.fillRect(-16, 42, 32, 22); ellipse(c, 0, 42, 16, 4); c.fillStyle = '#f4e8c8'; c.fill(); c.fillStyle = '#ffd860'; for (let k = 0; k < 7; k++) { ellipse(c, -14 + k * 4.6, 46, 0.9, 0.9); c.fill(); } }; ps.face.mouth = 'big'; }
      if (a.perf === 'cymbal') { const o = Math.abs(Math.sin(t * 10)); ps.arms = [{ side: -1, x: -6 - o * 12, y: 26, grip: 'fist', item: (c, x, y) => { ellipse(c, x + 1, y, 3, 8); c.fillStyle = '#e8c050'; c.fill(); } }, { side: 1, x: 6 + o * 12, y: 26, grip: 'fist', item: (c, x, y) => { ellipse(c, x - 1, y, 3, 8); c.fillStyle = '#e8c050'; c.fill(); } }]; ps.face.mouth = 'big'; }
      if (a.act === 'hang') { ps.arms = [{ side: -1, x: -10, y: 40, grip: 'fist' }, { side: 1, x: 10, y: -24, grip: 'fist', item: (c, x, y) => { c.strokeStyle = '#c8a060'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y + 10); c.lineTo(x + 2, y - 70); c.stroke(); } }]; ps.head.nod = -1.5; }
    },
    pose(s, ps, t, V) {
      const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
      if (s.spec.trolley) {
        const lid = s.act === 'lid';
        ps.over = (c) => trolley(c, s.load, lid, t, s.label, s.face < 0);
        if (lid) { const up = Math.min(1, k * 2.5); ps.arms = [A(-1, 20, 54), A(1, 30 + up * 14, 40 - up * 34, { item: lidItem })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.7; ps.head.nod = -0.6; }
        else if (s.act === 'serve') { ps.arms = [A(-1, 30, 40, { grip: 'open' }), A(1, 34, 38, { grip: 'open', item: steamerItem })]; ps.lean = 0.08; ps.face.mouth = 'big'; }
        else if (s.act === 'stamp') { const b = Math.abs(Math.sin(k * 9)); ps.arms = [A(-1, 24, 50, { grip: 'open' }), A(1, 30, 40 - b * 8, { item: stampItem })]; ps.face.lookY = 1; ps.head.nod = 1.2; ps.face.mouth = 'smile'; }
        else if (s.act === 'load') { ps.arms = [A(-1, 26, 30 + Math.sin(k * 6) * 3, { grip: 'open', item: steamerItem }), A(1, 34, 28, { grip: 'open' })]; ps.face.mouth = 'flat'; }
        else { ps.arms = [A(-1, 20, 54), A(1, 22, 57)]; ps.face.mouth = s.say && s.say.t > 0 ? 'talk' : 'smile'; ps.face.open = s.say && s.say.t > 0 ? Math.abs(Math.sin(t * 8)) * 0.6 : 0; }
        return;
      }
      if (s === V.S.captain) {
        if (s.act === 'order') { if (k < 1.1) { ps.arms = [A(-1, -6, 22, { item: Items.notepad }), A(1, 10, 26, { grip: 'open' })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 9)) * 0.6; } else { const c2 = Math.min(1, (k - 1.1) / 0.6); ps.arms = [A(-1, -10, 40), A(1, 20, 22 - c2 * 4, { item: Items.teapot, handAng: -c2 * 0.7 })]; ps.lean = 0.08; ps.face.lookY = 1; ps.head.nod = 1; } return; }
        if (s.act === 'refill') { const c2 = Math.min(1, k / 0.6); ps.arms = [A(-1, 18, 30, { grip: 'open' }), A(1, 24, 20 - c2 * 4, { item: kettleItem, handAng: -c2 * 0.6 })]; ps.lean = 0.08; ps.face.lookY = 1; ps.head.nod = 1; return; }
        if (s.act === 'teaPrep') { ps.arms = [A(-1, -12, 34, { item: Items.teacup }), A(1, 8, 30 + Math.sin(k * 3) * 2, { item: Items.teapot })]; ps.face.lookY = 1; return; }
        if (s.act === 'net') { const up = Math.sin(Math.min(1, k / 1.8) * Math.PI); ps.arms = [A(-1, 6, 10 - up * 20, { item: (c, x, y) => { c.strokeStyle = '#c8a060'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6, y - 30); c.stroke(); c.strokeStyle = 'rgba(240,240,240,0.7)'; ellipse(c, x + 7, y - 34, 6, 4); c.stroke(); } }), A(1, 12, 20 - up * 10)]; ps.head.nod = -1; ps.face.mouth = 'o'; return; }
        if (s.act === 'carryFish' || s.act === 'show') { const up = s.act === 'show' ? Math.min(1, k * 2) : 0, flap = Math.sin(t * 16) * 0.3;
          ps.arms = [A(-1, -4, 30 - up * 30), A(1, 14, 26 - up * 34, { item: fishItem(flap) })]; ps.face.mouth = up ? 'big' : 'smile'; return; }
      }
      if (s === V.S.hostess) {
        if (s.act === 'call') { ps.arms = [A(-1, -14, 44), A(1, 2, 2, { item: (c, x, y) => { c.fillStyle = '#2a2a2a'; c.fillRect(x - 1, y - 2, 2.4, 9); ellipse(c, x, y - 3, 2.2, 2.6); c.fill(); } })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(t * 9)) * 0.6; return; }
        if (s.act === 'menuHold') { ps.arms = [A(-1, -6, 34, { item: (c, x, y) => { c.fillStyle = '#c8141a'; c.fillRect(x - 2, y - 10, 10, 14); c.fillStyle = '#ffd860'; c.fillRect(x, y - 8, 6, 1); } }), A(1, 8, 36)]; ps.face.mouth = 'smile'; return; }
      }
      if (s === V.S.chef) {
        if (s.act === 'fold' || s.act === 'pleat') { const p = Math.sin(k * (s.act === 'pleat' ? 14 : 5)); ps.arms = [A(-1, -6, 38 + p, { grip: 'open', item: (c, x, y) => { c.fillStyle = 'rgba(250,246,240,0.95)'; ellipse(c, x + 5, y - 1, 5, 2.4); c.fill(); c.fillStyle = 'rgba(240,140,120,0.6)'; ellipse(c, x + 5, y - 1.6, 2, 1); c.fill(); } }), A(1, 7 + p * 1.5, 36 - Math.abs(p) * 2)]; ps.face.lookY = 1; ps.head.nod = 1.6; ps.face.mouth = 'flat'; return; }
        if (s.act === 'load') { ps.arms = [A(-1, 16, 22, { grip: 'open' }), A(1, 30, 18, { grip: 'open', item: steamerItem })]; ps.head.turn = 0.6; return; }
        if (s.act === 'steam') { ps.arms = [A(-1, -10, 42), A(1, 20, 30, { grip: 'open' })]; ps.head.turn = 0.7; ps.face.mouth = 'smile'; return; }
      }
      return false;
    },
    back(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(88);
      // lacquered red walls with a gold dado and fretwork (回紋) border
      x.fillStyle = linear(x, 0, 0, 0, H * 0.62, [[0, '#5a0a0a'], [0.5, '#8a1414'], [1, '#6a0c0c']]); x.fillRect(0, 0, W, H * 0.62);
      for (let k = 0; k < 60; k++) { x.fillStyle = `rgba(255,${120 + (k % 3) * 30},90,0.025)`; x.fillRect(rnd() * W, rnd() * H * 0.6, 2 + rnd() * 60 * u, 1 + rnd() * 2); }
      const fret = (y0, s) => { x.strokeStyle = '#d8a848'; x.lineWidth = 1.4 * u; for (let fx = 0; fx < W; fx += s * 2) { x.beginPath(); x.moveTo(fx, y0 + s); x.lineTo(fx, y0); x.lineTo(fx + s * 1.5, y0); x.lineTo(fx + s * 1.5, y0 + s * 0.7); x.lineTo(fx + s * 0.5, y0 + s * 0.7); x.lineTo(fx + s * 0.5, y0 + s * 0.35); x.lineTo(fx + s, y0 + s * 0.35); x.stroke(); } };
      x.fillStyle = '#3a0606'; x.fillRect(0, H * 0.555, W, H * 0.07); fret(H * 0.565, 10 * u); x.fillStyle = '#c8902a'; x.fillRect(0, H * 0.555, W, 2 * u); x.fillRect(0, H * 0.62, W, 2 * u);
      // coffered ceiling
      x.fillStyle = '#2a0404'; x.fillRect(0, 0, W, H * 0.06); fret(H * 0.045, 7 * u); x.fillStyle = '#c8902a'; x.fillRect(0, H * 0.06, W, 3 * u);
      // the dragon & phoenix wall
      const px0 = X(0.315), px1 = X(0.685), py0 = H * 0.13, py1 = H * 0.5, pcx = (px0 + px1) / 2;
      x.fillStyle = '#c8902a'; x.fillRect(px0 - 8 * u, py0 - 8 * u, px1 - px0 + 16 * u, py1 - py0 + 16 * u);
      x.fillStyle = linear(x, 0, py0, 0, py1, [[0, '#a8101a'], [1, '#7a0810']]); x.fillRect(px0, py0, px1 - px0, py1 - py0);
      x.strokeStyle = 'rgba(255,200,120,0.15)'; x.lineWidth = 1; for (let k = 0; k < 40; k++) { const cx = px0 + rnd() * (px1 - px0), cy = py0 + rnd() * (py1 - py0); x.beginPath(); x.arc(cx, cy, 8 * u, Math.PI, 0); x.arc(cx + 10 * u, cy, 4 * u, Math.PI, 0); x.stroke(); } // cloud scrolls
      const ps = Math.min((px1 - px0) / 470, (py1 - py0) / 300);
      x.save(); x.beginPath(); x.rect(px0, py0, px1 - px0, py1 - py0); x.clip(); dragon(x, pcx - 70 * ps, py0 + (py1 - py0) * 0.6, ps, rnd); phoenix(x, pcx + 120 * ps, py0 + (py1 - py0) * 0.46, ps * 1.15); x.restore(); pearl(x, pcx + 38 * ps, py0 + (py1 - py0) * 0.3, 11 * ps);
      Ink.text(x, '龍鳳呈祥', pcx, py0 + (py1 - py0) * 0.86, 22 * u, { D: V.D, rnd, color: '#ffd860', vertical: false, align: 'center', bleed: 0.02, dry: 0.15 });
      // name board above the wall: 金龍大酒樓
      x.fillStyle = '#1a0404'; roundRect(x, pcx - 150 * u, H * 0.068, 300 * u, 50 * u, 6 * u); x.fill(); x.strokeStyle = '#d8a848'; x.lineWidth = 3 * u; x.stroke();
      Ink.text(x, '金龍大酒樓', pcx, H * 0.068 + 25 * u, 34 * u, { D: V.D, rnd, color: '#ffd860', vertical: false, align: 'center', bleed: 0.04, dry: 0.2, heavy: true });
      // couplet scrolls flanking the wall
      [[px0 - 30 * u, '生意興隆'], [px1 + 30 * u, '財源廣進']].forEach(([cx, s]) => { x.fillStyle = '#c8141a'; x.fillRect(cx - 13 * u, py0, 26 * u, 130 * u); x.strokeStyle = '#d8a848'; x.lineWidth = 1.5 * u; x.strokeRect(cx - 11 * u, py0 + 2 * u, 22 * u, 126 * u); Ink.text(x, s, cx, py0 + 6 * u, 20 * u, { D: V.D, rnd, color: '#1a0a04', bleed: 0.03, dry: 0.3 }); });
      // LED queue board over the podium
      x.fillStyle = '#1a1a1a'; roundRect(x, X(0.185), H * 0.235, X(0.1), H * 0.11, 4 * u); x.fill(); x.strokeStyle = '#8a8a8a'; x.lineWidth = 2 * u; x.stroke();
      x.fillStyle = '#ffd860'; x.font = JF(12 * u); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('現正叫號', X(0.235), H * 0.255);
      // tea station sideboard
      const tx0 = X(0.19), tw = X(0.105), ty = H * 0.49;
      x.fillStyle = '#4a1a08'; x.fillRect(tx0, ty, tw, H * 0.135); x.fillStyle = '#6a2a10'; x.fillRect(tx0 - 3 * u, ty - 4 * u, tw + 6 * u, 6 * u);
      TEAS.forEach((tn, i) => { const cx = tx0 + 10 * u + i * 15 * u; x.fillStyle = ['#2a6a3a', '#c8a040', '#3a4a8a', '#8a2a1a', '#d8c040'][i]; roundRect(x, cx - 6 * u, ty - 22 * u, 12 * u, 18 * u, 2 * u); x.fill(); x.fillStyle = '#f4ead8'; x.fillRect(cx - 4 * u, ty - 18 * u, 8 * u, 10 * u); x.fillStyle = '#1a0a04'; x.font = JF(4.4 * u); [...tn].slice(0, 2).forEach((ch, k) => x.fillText(ch, cx, ty - 15.5 * u + k * 5 * u)); });
      const ux = tx0 + tw - 16 * u; x.fillStyle = linear(x, ux - 10 * u, 0, ux + 10 * u, 0, [[0, '#7a848e'], [0.4, '#eef2f6'], [1, '#6a747e']]); roundRect(x, ux - 10 * u, ty - 40 * u, 20 * u, 36 * u, 4 * u); x.fill(); x.fillStyle = '#2a2a2a'; x.fillRect(ux - 2 * u, ty - 12 * u, 6 * u, 3 * u); // hot water urn
      for (let k = 0; k < 4; k++) { x.fillStyle = '#f8f6f0'; ellipse(x, tx0 + 18 * u + k * 13 * u, ty + 16 * u, 6 * u, 5 * u); x.fill(); x.strokeStyle = '#3a6ab0'; x.lineWidth = 0.8 * u; x.stroke(); }
      // live seafood tanks
      const fx0 = X(0.71), fw = X(0.13); x.fillStyle = '#2a2a30'; x.fillRect(fx0 - 4 * u, H * 0.235, fw + 8 * u, H * 0.33);
      // kitchen pass: stainless hood, tiles, hanging ladles; the chef stands behind the counter layer
      const kx0 = X(0.858); x.fillStyle = '#e8e4dc'; x.fillRect(kx0, H * 0.25, W - kx0, H * 0.31);
      x.strokeStyle = 'rgba(120,120,120,0.35)'; x.lineWidth = 1; for (let gy = H * 0.25; gy < H * 0.56; gy += 10 * u) { x.beginPath(); x.moveTo(kx0, gy); x.lineTo(W, gy); x.stroke(); } for (let gx = kx0; gx < W; gx += 10 * u) { x.beginPath(); x.moveTo(gx, H * 0.25); x.lineTo(gx, H * 0.56); x.stroke(); }
      x.fillStyle = linear(x, kx0, 0, W, 0, [[0, '#8a949e'], [0.5, '#e8eef4'], [1, '#7a848e']]); x.beginPath(); x.moveTo(kx0 - 6 * u, H * 0.25); x.lineTo(W, H * 0.25); x.lineTo(W, H * 0.3); x.lineTo(kx0 + 10 * u, H * 0.3); x.closePath(); x.fill();
      for (let k = 0; k < 4; k++) { const lx = kx0 + 14 * u + k * 12 * u; x.strokeStyle = '#a8b0b8'; x.lineWidth = 1.4 * u; x.beginPath(); x.moveTo(lx, H * 0.3); x.lineTo(lx, H * 0.36); x.stroke(); ellipse(x, lx, H * 0.365, 4 * u, 3 * u); x.fillStyle = '#a8b0b8'; x.fill(); }
      x.fillStyle = '#c8141a'; x.fillRect(kx0 + 6 * u, H * 0.17, 60 * u, 26 * u); x.fillStyle = '#ffd860'; x.font = JF(18 * u); x.textAlign = 'center'; x.fillText('點心部', kx0 + 36 * u, H * 0.17 + 14 * u);
      // carpet: crimson with gold medallions in perspective
      const fy = H * 0.622; x.fillStyle = linear(x, 0, fy, 0, H, [[0, '#5a0a10'], [1, '#8a1420']]); x.fillRect(0, fy, W, H - fy);
      for (let r = 0; r < 9; r++) { const k0 = r / 9, y = fy + (H - fy) * (k0 * k0 * 0.6 + k0 * 0.4) + 6 * u, sz = (8 + r * 4) * u, sp = sz * 4.2;
        for (let cx = ((r % 2) * sp) / 2; cx < W + sp; cx += sp) { x.strokeStyle = 'rgba(232,180,80,0.55)'; x.lineWidth = 1.2 * u; ellipse(x, cx, y, sz, sz * 0.32); x.stroke(); ellipse(x, cx, y, sz * 0.5, sz * 0.16); x.stroke(); for (let q = 0; q < 4; q++) { const a = q * Math.PI / 2; x.beginPath(); x.moveTo(cx + Math.cos(a) * sz * 0.5, y + Math.sin(a) * sz * 0.16); x.lineTo(cx + Math.cos(a) * sz * 1.4, y + Math.sin(a) * sz * 0.45); x.stroke(); } } }
      x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(0, fy, W, 8 * u);
      // chandeliers
      [0.255, 0.745].forEach((f) => chandelier(x, X(f), H * 0.115, u * 0.95, rnd));
    },
    counter(x, V) { // the kitchen pass counter (over the chef) and the podium-side planter
      const W = V.W, H = V.H, u = V.u, kx0 = V.X(0.858);
      x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.6, [[0, '#f4f8fc'], [0.2, '#a8b0b8'], [1, '#6a747e']]); x.fillRect(kx0 - 6 * u, H * 0.5, W - kx0 + 6 * u, H * 0.12);
      x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(kx0 - 6 * u, H * 0.5, W - kx0 + 6 * u, 2 * u);
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H, lit = V.lit || 1;
      // LED number board
      const n = V.S.num || 52, blink = V.S.callT > 0 && Math.sin(t * 12) > 0;
      ctx.fillStyle = blink ? '#ff8a6a' : '#ff3a2a'; ctx.font = `bold ${30 * u}px "Courier New", monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = '#ff2a1a'; ctx.shadowBlur = 8 * u; ctx.fillText(String(n).padStart(3, '0'), X(0.235), H * 0.305); ctx.shadowBlur = 0;
      // seafood tanks: glowing water, swimming fish, a lobster, bubbles
      const fx0 = X(0.71), fw = X(0.13);
      [[H * 0.245, H * 0.15], [H * 0.405, H * 0.15]].forEach(([ty, th], tank) => {
        ctx.fillStyle = linear(ctx, 0, ty, 0, ty + th, [[0, 'rgba(110,200,255,0.9)'], [1, 'rgba(20,80,140,0.95)']]); ctx.fillRect(fx0, ty, fw, th);
        for (let k = 0; k < 3; k++) { const ph = t * (0.12 + k * 0.05) + k * 2.1 + tank, xx = fx0 + fw * (0.5 + 0.42 * Math.sin(ph)), yy = ty + th * (0.3 + k * 0.22) + Math.sin(t * 2 + k) * 2 * u, dir = Math.cos(ph) > 0 ? 1 : -1;
          ctx.save(); ctx.translate(xx, yy); ctx.scale(dir, 1); ctx.fillStyle = tank ? ['#c86a3a', '#8a7a4a', '#d8b040'][k] : ['#6a5a3a', '#a8a090', '#4a6a8a'][k]; ellipse(ctx, 0, 0, 13 * u, 5 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(-12 * u, 0); ctx.lineTo(-19 * u, -5 * u + Math.sin(t * 8 + k) * 2 * u); ctx.lineTo(-19 * u, 5 * u + Math.sin(t * 8 + k) * 2 * u); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffffff'; ellipse(ctx, 8 * u, -1 * u, 1.4 * u, 1.4 * u); ctx.fill(); ctx.restore(); }
        if (tank === 1) { const lx = fx0 + fw * 0.25 + Math.sin(t * 0.3) * 6 * u, ly = ty + th - 8 * u; ctx.fillStyle = '#3a3a5a'; ellipse(ctx, lx, ly, 14 * u, 4 * u); ctx.fill(); ctx.strokeStyle = '#3a3a5a'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(lx + 12 * u, ly); ctx.quadraticCurveTo(lx + 26 * u, ly - 14 * u + Math.sin(t * 2) * 3 * u, lx + 34 * u, ly - 18 * u); ctx.stroke(); }
        ctx.fillStyle = 'rgba(255,255,255,0.6)'; for (let b = 0; b < 6; b++) { const bp = (t * 0.5 + b * 0.17) % 1; ellipse(ctx, fx0 + fw * (0.15 + b * 0.14), ty + th * (1 - bp), 1.4 * u, 1.4 * u); ctx.fill(); }
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(fx0, ty, fw * 0.2, th); ctx.strokeStyle = '#8a949e'; ctx.lineWidth = 3 * u; ctx.strokeRect(fx0, ty, fw, th);
        if (V.S.fishReq && tank === 0 && !V.S.fishHeld) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; for (let q = 0; q < 5; q++) { ellipse(ctx, fx0 + fw * 0.5 + rand(-20, 20) * u, ty + rand(4, 20) * u, 3 * u, 2 * u); ctx.fill(); } }
      });
      ctx.fillStyle = '#c8141a'; ctx.fillRect(fx0, H * 0.555, fw, 12 * u); ctx.fillStyle = '#ffd860'; ctx.font = JF(10 * u); ctx.textAlign = 'center'; ctx.fillText('生猛海鮮', fx0 + fw / 2, H * 0.555 + 6.5 * u);
      // red lanterns
      [0.09, 0.175, 0.825, 0.935].forEach((f, i) => lantern(ctx, X(f), H * (0.14 + (i % 2) * 0.035), u * 1.1, t, i, Amb.st.wind));
      // chandelier sparkle
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      [0.255, 0.745].forEach((f, i) => { const cx = X(f), cy = H * 0.12; ctx.fillStyle = radial(ctx, cx, cy, 70 * u, [[0, `rgba(255,240,200,${0.3 * lit})`], [1, 'rgba(255,220,160,0)']]); ctx.fillRect(cx - 70 * u, cy - 70 * u, 140 * u, 140 * u);
        for (let k = 0; k < 6; k++) { const a = Math.sin(t * 3 + k * 7 + i * 3); if (a > 0.85) { const sx = cx + Math.cos(k * 1.9) * 40 * u, sy = cy + Math.sin(k * 2.7) * 14 * u + 10 * u; ctx.fillStyle = `rgba(255,255,255,${(a - 0.85) * 6})`; ctx.fillRect(sx - 3 * u, sy - 0.5, 6 * u, 1); ctx.fillRect(sx - 0.5, sy - 3 * u, 1, 6 * u); } } });
      ctx.restore();
      // songbird cages hanging in the window (event)
      (V.S.cages || []).forEach((cg, i) => { const cx = cg.x, cy = H * 0.33, sw = Math.sin(t * 1.2 + i) * 2 * u;
        ctx.save(); ctx.translate(cx + sw, cy); ctx.scale(1.7, 1.7); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(0, -H * 0.12); ctx.lineTo(0, -16 * u); ctx.stroke();
        ctx.fillStyle = 'rgba(30,20,10,0.55)'; ellipse(ctx, 0, 6 * u, 14 * u, 19 * u); ctx.fill(); ctx.fillStyle = '#c8141a'; ctx.fillRect(-4 * u, 26 * u, 8 * u, 6 * u); ctx.strokeStyle = '#c8a060'; ctx.lineWidth = 0.8 * u; for (let k = -5; k <= 5; k++) { ctx.beginPath(); ctx.moveTo(k * 1.2 * u, -16 * u); ctx.quadraticCurveTo(k * 2.8 * u, 4 * u, k * 2.6 * u, 24 * u); ctx.stroke(); } ctx.fillStyle = '#8a5a2a'; ctx.fillRect(-15 * u, 23 * u, 30 * u, 3 * u); ellipse(ctx, 0, -16 * u, 3 * u, 3 * u); ctx.fill();
        const hop = Math.max(0, Math.sin(t * 5 + i * 2)) * 4 * u, bx = Math.sin(t * 0.7 + i) * 5 * u; ctx.fillStyle = '#8ab040'; ellipse(ctx, bx, 14 * u - hop, 4.4 * u, 3.4 * u); ctx.fill(); ctx.fillStyle = '#c8d840'; ellipse(ctx, bx + 3 * u, 11 * u - hop, 2.6 * u, 2.4 * u); ctx.fill(); ctx.fillStyle = '#ffffff'; ellipse(ctx, bx + 3.6 * u, 10.6 * u - hop, 1.2 * u, 1.2 * u); ctx.fill(); ctx.fillStyle = '#000000'; ellipse(ctx, bx + 3.8 * u, 10.6 * u - hop, 0.5 * u, 0.5 * u); ctx.fill(); ctx.fillStyle = '#5a6a2a'; ctx.beginPath(); ctx.moveTo(bx - 4 * u, 14 * u - hop); ctx.lineTo(bx - 9 * u, 17 * u - hop); ctx.lineTo(bx - 4 * u, 16 * u - hop); ctx.fill();
        ctx.restore(); });
      if ((V.S.cages || []).length && Math.random() < dt * 0.35) SFX('chirp');
      V.ctx = ctx;
    },
    counterLive(ctx, t, dt, V) { // the steamer tower at the pass
      const u = V.u, X = V.X, H = V.H, sx = X(0.968), sy = H * 0.5;
      for (let k = 0; k < 6; k++) { const yy = sy - k * 11 * u; ctx.fillStyle = linear(ctx, sx - 22 * u, 0, sx + 22 * u, 0, [[0, '#8a5a24'], [0.4, '#e8bc70'], [1, '#7a4a1a']]); ctx.fillRect(sx - 22 * u, yy - 10 * u, 44 * u, 10 * u); ctx.strokeStyle = 'rgba(90,50,10,0.5)'; ctx.lineWidth = 0.6 * u; ctx.strokeRect(sx - 22 * u, yy - 10 * u, 44 * u, 10 * u); }
      ctx.fillStyle = '#6a4418'; ellipse(ctx, sx, sy - 66 * u, 22 * u, 4 * u); ctx.fill();
      const busy = V.S.chef && (V.S.chef.act === 'load' || V.S.chef.act === 'steam') ? 1.6 : 1;
      Decor.steamPuff(ctx, sx, sy - 70 * u, t, 0, u * 2.2 * busy, 0.8); Decor.steamPuff(ctx, sx - 12 * u, sy - 68 * u, t, 0.4, u * 1.6 * busy, 0.6);
    },
    drawSeat(ctx, seat, t, V) { // red banquet chair with a gold sash bow
      const u = V.u, k = V.sc, cx = seat.x, top = seat.y + 4 * k, bot = seat.table ? seat.table.y : seat.y + 70 * k;
      ctx.fillStyle = linear(ctx, cx - 24 * k, 0, cx + 24 * k, 0, [[0, '#6a0a10'], [0.5, '#b8141e'], [1, '#6a0a10']]); roundRect(ctx, cx - 23 * k, top, 46 * k, bot - top, 10 * k); ctx.fill();
      ctx.fillStyle = '#d8a848'; ctx.fillRect(cx - 23 * k, top + 26 * k, 46 * k, 6 * k);
    },
    drawTable(ctx, tb, t, V) {
      const u = V.u, k = V.sc, S = tb.S, rx = tb.rx, ry = tb.ry, fl = tb.y + 50 * k;
      tb.seats.forEach((s) => { if (!s.who) cfg.drawSeat(ctx, s, t, V); });
      // pink skirt under a white cloth
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(ctx, tb.x, fl, rx * 1.05, ry * 0.7); ctx.fill();
      ctx.fillStyle = linear(ctx, tb.x - rx, 0, tb.x + rx, 0, [[0, '#c87a8a'], [0.4, '#f4c0c8'], [1, '#b86a7a']]); ctx.beginPath(); ctx.moveTo(tb.x - rx, tb.y); ctx.lineTo(tb.x - rx * 1.02, fl); ctx.ellipse(tb.x, fl, rx * 1.02, ry * 0.6, 0, Math.PI, 0, true); ctx.lineTo(tb.x + rx, tb.y); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(120,40,60,0.25)'; ctx.lineWidth = 2 * u; for (let q = -4; q <= 4; q++) { ctx.beginPath(); ctx.moveTo(tb.x + q * rx * 0.22, tb.y + ry); ctx.lineTo(tb.x + q * rx * 0.24, fl + ry * 0.5); ctx.stroke(); }
      ctx.fillStyle = '#fbfaf6'; ellipse(ctx, tb.x, tb.y, rx, ry); ctx.fill(); ctx.fillStyle = linear(ctx, 0, tb.y, 0, tb.y + ry + 12 * u, [[0, '#f4f0e8'], [1, '#d8d0c4']]); ctx.beginPath(); ctx.ellipse(tb.x, tb.y, rx, ry, 0, 0, Math.PI); ctx.lineTo(tb.x - rx, tb.y + 10 * u); ctx.ellipse(tb.x, tb.y + 10 * u, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fill();
      // glass lazy susan
      ctx.fillStyle = 'rgba(200,230,230,0.35)'; ellipse(ctx, tb.x, tb.y - 1 * u, rx * 0.56, ry * 0.56); ctx.fill(); ctx.strokeStyle = 'rgba(120,160,160,0.6)'; ctx.lineWidth = 1 * u; ctx.stroke();
      // place settings: cups, bowls, chopsticks on rests
      tb.seats.forEach((s) => { const px = tb.x + (s.x - tb.x) * 0.8, py = tb.y - ry * 0.5; ctx.fillStyle = '#f8f6f0'; ellipse(ctx, px, py + 2 * u, 6 * u, 2 * u); ctx.fill(); ctx.strokeStyle = '#3a6ab0'; ctx.lineWidth = 0.6 * u; ctx.stroke(); ctx.fillStyle = '#f8f6f0'; ctx.fillRect(px + 7 * u, py - 3 * u, 4 * u, 4 * u); if (S.pot) { ctx.fillStyle = 'rgba(160,90,30,0.85)'; ellipse(ctx, px + 9 * u, py - 3 * u, 2 * u, 0.6 * u); ctx.fill(); } ctx.strokeStyle = '#f0e0b0'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(px - 9 * u, py + 5 * u); ctx.lineTo(px - 2 * u, py - 6 * u); ctx.stroke(); });
      // dishes on the lazy susan, rotating with it, back ones first
      const ds = (tb.dishes || []).map((d, i, a) => { const ang = (S.spin || 0) + i / Math.max(1, a.length) * TAU + 0.4; return { d, x: tb.x + Math.cos(ang) * rx * 0.34, y: tb.y + 2 * u + Math.sin(ang) * ry * 0.3 }; }).sort((a, b) => a.y - b.y);
      ds.forEach((o) => drawDish(ctx, o.d, o.x, o.y, u * 1.5, t));
      // teapot (lid ajar = please refill)
      if (S.pot) { const px = tb.x + rx * 0.62, py = tb.y - 2 * u; ctx.fillStyle = '#f8f6f0'; ellipse(ctx, px, py - 6 * u, 9 * u, 7 * u); ctx.fill(); ctx.strokeStyle = '#3a6ab0'; ctx.lineWidth = 0.8 * u; ellipse(ctx, px, py - 6 * u, 6 * u, 4 * u); ctx.stroke(); ctx.strokeStyle = '#f8f6f0'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(px - 8 * u, py - 6 * u); ctx.lineTo(px - 14 * u, py - 12 * u); ctx.stroke(); ctx.beginPath(); ctx.arc(px + 9 * u, py - 6 * u, 4 * u, -1.2, 1.2); ctx.stroke();
        ctx.fillStyle = '#e8e4dc'; if (S.ajar) { ctx.save(); ctx.translate(px + 2 * u, py - 14 * u); ctx.rotate(0.5); ellipse(ctx, 0, 0, 5 * u, 1.6 * u); ctx.fill(); ctx.restore(); } else { ellipse(ctx, px, py - 13 * u, 5 * u, 1.6 * u); ctx.fill(); } ctx.fillStyle = '#c8141a'; ellipse(ctx, px, py - 14.5 * u, 1.4 * u, 1 * u); ctx.fill(); }
      // the order card with red stamps
      if (tb.state !== 'free') { const cx = tb.x - rx * 0.6, cy = tb.y + 2 * u; ctx.fillStyle = '#f4ecd8'; ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.15); ctx.fillRect(-9 * u, -5 * u, 18 * u, 10 * u); ctx.strokeStyle = 'rgba(120,80,40,0.5)'; ctx.lineWidth = 0.4 * u; for (let q = 0; q < 4; q++) { ctx.beginPath(); ctx.moveTo(-8 * u, -3 * u + q * 2.4 * u); ctx.lineTo(8 * u, -3 * u + q * 2.4 * u); ctx.stroke(); } ctx.fillStyle = '#d8141a'; for (let q = 0; q < Math.min(12, S.stamps || 0); q++) { ellipse(ctx, -6 * u + (q % 6) * 2.4 * u, -2.4 * u + Math.floor(q / 6) * 3 * u, 0.9 * u, 0.9 * u); ctx.fill(); } ctx.restore(); }
      if (tb.state === 'bill') { ctx.fillStyle = '#2a1a10'; ctx.fillRect(tb.x - 8 * u, tb.y + 4 * u, 16 * u, 5 * u); }
      if (V.S.bday && V.S.bday.tb === tb && V.S.bday.buns) { peachBuns(ctx, tb.x, tb.y - 4 * u, u * 1.4); if (Math.random() < 0.05) V.burst(tb.x, tb.y - 20 * u, 1, '#ffe080', { kind: 'spark', up: 40, sp: 30, g: -20, life: 1 }); }
    },
    floorProps(V, t) {
      const u = V.u, X = V.X, H = V.H, out = [];
      out.push({ y: V.Y(0.935), f: () => { const ctx = V.ctx, px = X(0.205), py = V.Y(0.935); // reception podium with a brass lamp
        ctx.fillStyle = linear(ctx, px - 30 * u, 0, px + 30 * u, 0, [[0, '#3a0a04'], [0.5, '#7a2a10'], [1, '#3a0a04']]); ctx.beginPath(); ctx.moveTo(px - 30 * u, py); ctx.lineTo(px - 24 * u, py - 62 * u); ctx.lineTo(px + 24 * u, py - 62 * u); ctx.lineTo(px + 30 * u, py); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#d8a848'; ctx.fillRect(px - 26 * u, py - 64 * u, 52 * u, 4 * u); ctx.fillRect(px - 30 * u, py - 3 * u, 60 * u, 3 * u); ctx.font = JF(13 * u); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('接待處', px, py - 34 * u);
        ctx.fillStyle = '#f4ead8'; ctx.fillRect(px - 16 * u, py - 70 * u, 14 * u, 6 * u); ctx.fillStyle = '#c8141a'; ctx.fillRect(px + 6 * u, py - 72 * u, 8 * u, 8 * u); } });
      const L = V.S.lion; if (L) out.push({ y: V.lane() + 2, f: () => lion(V.ctx, L.x, V.lane() + 2 * u, V.sc * 0.95, t, L) });
      return out;
    },
    post(ctx, t, dt, V) { // speech bubbles: aunties calling out dishes, the hostess calling numbers
      const u = V.u;
      const bubble = (x, y, txt, a) => { ctx.save(); ctx.globalAlpha = a; ctx.font = JF(17 * u); const w = ctx.measureText(txt).width + 18 * u; ctx.fillStyle = 'rgba(255,252,240,0.95)'; roundRect(ctx, x - w / 2, y - 16 * u, w, 26 * u, 10 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 5 * u, y + 10 * u); ctx.lineTo(x + 2 * u, y + 18 * u); ctx.lineTo(x + 6 * u, y + 10 * u); ctx.fill(); ctx.strokeStyle = 'rgba(160,20,26,0.6)'; ctx.lineWidth = 1.2 * u; roundRect(ctx, x - w / 2, y - 16 * u, w, 26 * u, 10 * u); ctx.stroke(); ctx.fillStyle = '#a0101a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 2 * u); ctx.restore(); };
      V.staff.forEach((s) => { if (s.say && s.say.t > 0) { s.say.t -= dt; bubble(s.x + (s.face || 1) * 20 * u, s.y - 122 * V.sc - 24 * u, s.say.txt, Math.min(1, s.say.t * 2)); } });
      if (V.S.callT > 0) { const h = V.S.hostess; bubble(h.x + 30 * u, h.y - 122 * V.sc - 20 * u, V.S.num + '號!', Math.min(1, V.S.callT * 2)); }
    },
    *arrive(a, V) { // songbird uncles hang their cages before taking a number
      if (!a.cage) return;
      V.S.cageN = (V.S.cageN || 0) + 1; const hx = V.X(0.06 + ((V.S.cageN - 1) % 3) * 0.045);
      a.act = 'walk'; yield ['walk', hx, V.lane() - 10 * V.u]; a.face = 1; a.act = 'hang'; a.actT = 0; yield ['wait', 1.6];
      V.S.cages.push({ x: hx }); a.item = null; a.act = 'stand'; SFX('chirp'); yield ['wait', 0.4];
    },
    events(V) {
      return [
        { at: 0.16, name: 'birds', dur: 70, start() { const p = V.party(2, { looks: [{ age: 'old', female: false }, { age: 'old', female: false }] }); p.members.forEach((m) => { m.cage = true; m.item = cageItem; }); }, end() { V.S.cages = []; } },
        { at: 0.36, name: 'fish', dur: 24, start() { V.S.fishReq = true; V.S.fishBusy = false; }, end() { V.S.fishReq = false; } },
        { at: 0.56, name: 'lion', dur: 32, start() { V.S.lion = { x: -V.X(0.12), t: 0, dir: 1, tb: V.tables.find((x) => x.state === 'eating') || null };
            ['drum', 'cymbal'].forEach((perf, i) => V.customer({ look: { age: 'adult', female: false }, life: (a) => (function* () { a.perf = perf; a.P = V.person({ skin: 'light', hair: 'black', hairStyle: 'short', acc: { band: '#c8141a' }, top: { type: 'tee', col: '#e8b020' }, sleeves: 'short', pants: '#c8141a', shoe: '#1a1a1a' }); while (V.S.lion) { const L = V.S.lion; a.act = 'stand'; a.face = L.dir; const tx = L.x - (110 + i * 60) * V.u * (L.t > 21 ? -1 : 1); if (Math.abs(tx - a.x) > 6) { a.walking = true; a.tx = tx; a.ty = V.lane() - 14 * V.u; } yield ['wait', 0.2]; } a.perf = null; a.done = true; })() })); },
          end() { V.S.lion = null; } },
        { at: 0.76, name: 'longevity', dur: 26, start() { const tb = V.tables.find((x) => x.state === 'eating'); if (!tb) return; V.S.bday = { tb, buns: false };
            V.job({ kind: 'task', table: tb, role: 'waiter', act: 'serve', dur: 1.6, carry: true, buns: true, finish: () => { V.S.bday.buns = true; SFX('fanfare'); tb.party && tb.party.members.forEach((m, i) => { m.cheer = 2.4; }); V.burst(tb.x, tb.y - 40 * V.u, 26, () => pick(['#ffd860', '#ff6a8a', '#c8141a', '#ffffff']), { kind: 'confetti', up: 220, sp: 120, life: 2 }); } }); },
          end() { V.S.bday = null; } },
      ];
    },
    onClear(e, V) {
      V.tables.forEach((tb) => { if ((tb.dishes || []).length) V.steam(tb.x, tb.y - 20 * V.u, e.big ? 6 : 3, 1.4); });
      V.staff.forEach((s) => { if (s.spec.trolley) { V.steam(s.x + (s.face || 1) * 55 * V.sc, s.y - 80 * V.sc, 4, 1.5); if (e.big) { s.say = { txt: '好嘢!', t: 1.8 }; } } });
      if (e.big) V.burst(V.X(0.5), V.H * 0.3, 30, () => pick(['#ffd860', '#c8141a', '#ffffff', '#f8a020']), { kind: 'confetti', up: 220, sp: 220, life: 2 });
    },
  };
  /* ---------- trolley aunty life: answer serve calls, cruise the room, restock at the pass ---------- */
  function* auntyLife(s, V) {
    const say = (txt, d = 2.2) => { s.say = { txt, t: d }; };
    const restock = function* () { s.act = 'walk'; yield ['walk', V.X(0.895), V.lane()]; s.face = 1; s.act = 'load'; s.actT = 0; yield ['wait', 1.6]; s.load = 3; const a = pick(s.kinds), b = pick(s.kinds.filter((x) => x !== a)); s.label = [MENU[a][0].slice(0, 2), MENU[b][0].slice(0, 2)]; s.offer = [a, b]; };
    s.offer = s.kinds.slice(0, 2);
    while (true) {
      const j = V.jobs.find((jj) => jj.state === 'new' && jj.kind === 'serve');
      if (j) {
        j.state = 'taken'; j.by = s; const tb = j.table; s.tgt = tb;
        if (s.load < 1) yield* restock();
        const side = tb.x < s.x ? 1 : -1;
        s.act = 'walk'; yield ['walk', clamp(tb.x + side * (tb.rx + 34 * V.u), V.X(0.2), V.X(0.86)), V.lane()]; s.face = -side; s.look = tb.x;
        s.act = 'lid'; s.actT = 0; say(s.offer.map((k) => MENU[k][0]).join('! ') + '!'); SFX('whoosh'); yield ['wait', 1.5];
        if (tb.party) tb.party.lead.tapT = 0.01;
        s.act = 'serve'; s.actT = 0; yield ['wait', 1.0];
        const dishes = [dish(s.offer[0]), dish(s.offer[1])]; if (Math.random() < 0.5) dishes.push(dish(pick(s.kinds)));
        tb.dishes = dishes; if (tb.party) tb.party.members.forEach((m, i) => { if (m.seat) m.seat.dish = dishes[i % dishes.length]; });
        s.load = Math.max(0, s.load - 1);
        s.act = 'stamp'; s.actT = 0; yield ['wait', 0.9]; tb.S.stamps = (tb.S.stamps || 0) + dishes.length; j.state = 'done';
        s.look = null;
      } else {
        if (s.load < 1) { yield* restock(); continue; }
        const other = V.staff.find((o) => o.spec.trolley && o !== s), tgt = pick(V.tables.filter((tb) => !other || other.tgt !== tb)); s.tgt = tgt;
        let side = Math.random() < 0.5 ? -1 : 1; if (other && Math.abs(other.x - (tgt.x + side * (tgt.rx + 34 * V.u))) < 90 * V.u) side = -side;
        s.act = 'walk'; yield ['walk', clamp(tgt.x + side * (tgt.rx + 34 * V.u), V.X(0.2), V.X(0.86)), V.lane()]; s.face = -side; s.look = tgt.x;
        if (V.jobs.some((jj) => jj.state === 'new' && jj.kind === 'serve')) continue;
        s.act = 'lid'; s.actT = 0; say(s.offer.map((k) => MENU[k][0]).join('! ') + '!'); yield ['wait', 1.6];
        const eating = tgt.state === 'eating' && tgt.dishes.filter((d) => d.left > 0.05).length < 3;
        if (eating && Math.random() < 0.65) {
          tgt.party.members.forEach((m) => { if (Math.random() < 0.5) m.react = 0.8; });
          s.act = 'serve'; s.actT = 0; yield ['wait', 0.9];
          tgt.dishes = tgt.dishes.filter((d) => d.left > 0.05).concat([dish(pick(s.offer))]); s.load = Math.max(0, s.load - 1);
          s.act = 'stamp'; s.actT = 0; yield ['wait', 0.8]; tgt.S.stamps = (tgt.S.stamps || 0) + 1;
        } else { s.act = 'stand'; yield ['wait', 0.6 + Math.random() * 1.4]; }
        s.look = null;
      }
    }
  }
  defineWorld({ id: 'dimsum', thumbY: 0.5 }, makeVenue(cfg));
})();
