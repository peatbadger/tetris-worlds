/* ================= World 7: The Fish House (candlelit, Michelin-starred, harbour at dusk) =================
   Floor-to-ceiling windows over a harbour (yachts, a bridge strung with lights, a lighthouse beam after dark),
   a raw bar where the shucker opens oysters onto crushed ice under a three-tier plateau de fruits de mer,
   a live lobster tank, and an open kitchen: the head chef plates with tweezers under heat lamps while the
   line cook flips sauté pans that flare. A string trio and a grand piano play by the windows.
   Flow: guests are seated, the sommelier presents and pours (the host swirls, sniffs and nods), the first
   course of oysters comes from the raw bar, then each tasting-menu course arrives under silver cloches lifted
   with a flourish (crudo, then crispy-skin fish, then a chocolate dome). Candles flicker on white linen.
   Events: an incognito Michelin inspector taking notes, a live lobster shown to a table, crêpes Suzette
   flambéed tableside, a marriage proposal (she says yes, the room applauds), fireworks over the harbour. */
(() => {
  const SFX = (k) => { try { if (AudioEngine.sfx.ev) AudioEngine.sfx.ev(k); } catch (e) {} };
  const COURSES = ['crudo', 'fish', 'dessert'];
  /* ---------- plated courses on the table (world px) ---------- */
  function plateArt(c, kind, x, y, s, left, t) {
    c.fillStyle = 'rgba(0,0,0,0.18)'; ellipse(c, x, y + 1.2 * s, 12 * s, 3.6 * s); c.fill();
    c.fillStyle = radial(c, x - 3 * s, y - 1 * s, 12 * s, [[0, '#ffffff'], [0.8, '#eef0f2'], [1, '#c0c6cc']]); ellipse(c, x, y, 12 * s, 3.6 * s); c.fill();
    c.strokeStyle = 'rgba(200,170,90,0.7)'; c.lineWidth = 0.5 * s; ellipse(c, x, y, 10.8 * s, 3.1 * s); c.stroke();
    const n = Math.ceil(left * 3 - 0.001); if (n <= 0) { c.strokeStyle = 'rgba(120,120,120,0.6)'; c.lineWidth = 0.6 * s; c.beginPath(); c.moveTo(x - 4 * s, y + 1 * s); c.lineTo(x + 5 * s, y - 1.4 * s); c.stroke(); return; }
    switch (kind) {
      case 'oyster': for (let i = 0; i < n; i++) { const ox = x + (i - 1) * 6 * s; c.fillStyle = '#e8eef2'; ellipse(c, ox, y - 0.6 * s, 3.6 * s, 1.6 * s); c.fill(); c.fillStyle = '#6a7470'; ellipse(c, ox, y - 0.8 * s, 3.2 * s, 1.3 * s); c.fill(); c.fillStyle = '#e8e2d0'; ellipse(c, ox, y - 1 * s, 2.2 * s, 0.9 * s); c.fill(); c.fillStyle = 'rgba(255,255,255,0.8)'; c.fillRect(ox - 1 * s, y - 1.4 * s, 0.8 * s, 0.4 * s); } c.fillStyle = '#f6d830'; c.beginPath(); c.arc(x + 9 * s, y - 0.4 * s, 1.8 * s, Math.PI, 0); c.fill(); break;
      case 'crudo': for (let i = 0; i < n + 1; i++) { c.fillStyle = i % 2 ? '#f4c8b8' : '#f0b8a8'; ellipse(c, x - 5 * s + i * 3.4 * s, y - 0.8 * s, 2.6 * s, 1.2 * s, 0.3); c.fill(); } c.fillStyle = '#3a8a2a'; for (let i = 0; i < 6; i++) { ellipse(c, x - 6 * s + i * 2.4 * s, y + 0.6 * s, 0.5 * s, 0.3 * s); c.fill(); } c.fillStyle = '#e83a2a'; ellipse(c, x + 1 * s, y - 1.6 * s, 0.6 * s, 0.6 * s); c.fill(); break;
      case 'fish': c.fillStyle = 'rgba(250,240,200,0.9)'; ellipse(c, x, y - 0.2 * s, 7 * s, 2 * s); c.fill(); if (n > 0) { const w = 3 + n * 1.6; c.fillStyle = '#f4ece0'; roundRect(c, x - w * s, y - 3.4 * s, w * 2 * s, 2.6 * s, 1.2 * s); c.fill(); c.fillStyle = linear(c, 0, y - 3.4 * s, 0, y - 2 * s, [[0, '#e0a040'], [1, '#a8601a']]); roundRect(c, x - w * s, y - 3.6 * s, w * 2 * s, 1.4 * s, 0.7 * s); c.fill(); c.strokeStyle = 'rgba(90,40,10,0.5)'; c.lineWidth = 0.3 * s; for (let q = -2; q <= 2; q++) { c.beginPath(); c.moveTo(x + q * 2 * s, y - 3.6 * s); c.lineTo(x + q * 2 * s + 1 * s, y - 2.2 * s); c.stroke(); } } c.fillStyle = '#4a8a3a'; ellipse(c, x + 6 * s, y - 1.2 * s, 1.6 * s, 0.8 * s); c.fill(); break;
      case 'lobster': c.fillStyle = '#d8401a'; roundRect(c, x - 6 * s, y - 2.6 * s, 12 * s, 2.4 * s, 1.2 * s); c.fill(); c.fillStyle = '#f8e8d8'; roundRect(c, x - 5 * s, y - 3.4 * s, 10 * s * left, 1.4 * s, 0.7 * s); c.fill(); break;
      case 'dessert': c.fillStyle = radial(c, x - 1 * s, y - 4 * s, 5 * s, [[0, '#7a4a2a'], [1, '#2a1208']]); c.beginPath(); c.ellipse(x, y - 0.8 * s, 4 * s * (0.5 + left * 0.5), 4 * s * (0.5 + left * 0.5), 0, Math.PI, 0); c.fill(); c.fillStyle = '#d8b050'; c.fillRect(x - 0.4 * s, y - 5.6 * s, 0.8 * s, 1.2 * s); c.fillStyle = '#c81a3a'; ellipse(c, x + 6 * s, y - 0.6 * s, 1 * s, 1 * s); c.fill(); c.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(c, x - 1.4 * s, y - 3 * s, 1 * s, 0.6 * s); c.fill(); break;
    }
  }
  /* ---------- the harbour through the windows ---------- */
  const harbourCache = {};
  function harbour(c, x, y, w, h, lights, V) {
    const t = V.t, u = V.u, wl = y + h * 0.62, key = `${w | 0}x${h | 0}x${V.D}:${Math.round(lights * 4)}`;
    if (!harbourCache[key]) { for (const k in harbourCache) delete harbourCache[k]; const [cv, cx] = hiCanvas(w, h, V.D); cx.translate(-x, -y);
      const rnd = mulberry32(31);
      // far headland and city
      cx.fillStyle = 'rgba(30,40,60,0.8)'; cx.beginPath(); cx.moveTo(x, wl); for (let k = 0; k <= 30; k++) cx.lineTo(x + w * k / 30, wl - h * (0.06 + 0.05 * Math.sin(k * 0.7) + (k > 14 && k < 24 ? 0.06 + rnd() * 0.08 : 0))); cx.lineTo(x + w, wl); cx.fill();
      for (let k = 0; k < 90; k++) { const px = x + w * (0.45 + rnd() * 0.35), py = wl - rnd() * h * 0.16; if (lights > 0.2 && rnd() < 0.6) { cx.fillStyle = `rgba(255,${200 + rnd() * 50 | 0},140,${0.5 + rnd() * 0.5})`; cx.fillRect(px, py, 1.4 * u, 1.4 * u); } }
      // the bridge: arch with deck lights
      const bx0 = x + w * 0.05, bx1 = x + w * 0.42, by = wl - h * 0.1;
      cx.strokeStyle = 'rgba(40,50,70,0.9)'; cx.lineWidth = 2.4 * u; cx.beginPath(); cx.moveTo(bx0, by); cx.lineTo(bx1, by); cx.stroke(); cx.beginPath(); cx.moveTo(bx0 + w * 0.05, by); cx.quadraticCurveTo((bx0 + bx1) / 2, by - h * 0.22, bx1 - w * 0.05, by); cx.stroke();
      cx.lineWidth = 0.6 * u; for (let k = 1; k < 12; k++) { const px = lerp(bx0 + w * 0.05, bx1 - w * 0.05, k / 12), py = by - Math.sin(k / 12 * Math.PI) * h * 0.11 * 2 * (1 - Math.abs(k / 12 - 0.5)); cx.beginPath(); cx.moveTo(px, by); cx.lineTo(px, Math.min(by, py)); cx.stroke(); }
      if (lights > 0.2) { for (let k = 0; k < 24; k++) { cx.fillStyle = `rgba(255,230,160,${lights})`; cx.fillRect(lerp(bx0, bx1, k / 24), by - 1.5 * u, 1.6 * u, 1.6 * u); } }
      // lighthouse on the point
      const lx = x + w * 0.9, ly = wl - h * 0.12; cx.fillStyle = '#e8e4dc'; cx.beginPath(); cx.moveTo(lx - 4 * u, ly); cx.lineTo(lx - 2.6 * u, ly - 22 * u); cx.lineTo(lx + 2.6 * u, ly - 22 * u); cx.lineTo(lx + 4 * u, ly); cx.fill(); cx.fillStyle = '#c8281e'; cx.fillRect(lx - 3.4 * u, ly - 12 * u, 6.8 * u, 3 * u); cx.fillStyle = '#2a2a2a'; cx.fillRect(lx - 3 * u, ly - 27 * u, 6 * u, 5 * u);
      // water with reflected bands
      cx.fillStyle = linear(cx, 0, wl, 0, y + h, [[0, 'rgba(30,60,90,0.85)'], [1, 'rgba(10,25,45,0.95)']]); cx.fillRect(x, wl, w, y + h - wl);
      harbourCache[key] = cv; }
    c.drawImage(harbourCache[key], x, y, w, h);
    // shimmering reflections of the sky and the city lights
    c.strokeStyle = `rgba(255,${190 + lights * 40 | 0},140,${0.15 + lights * 0.3})`; c.lineWidth = 1 * u;
    for (let k = 0; k < 26; k++) { const py = wl + (k * 7.3 % 1) * 0 + (k / 26) * (y + h - wl), px = x + ((k * 97.1 + Math.sin(t * 0.8 + k) * 14) % w + w) % w, len = (6 + (k % 4) * 6) * u; c.beginPath(); c.moveTo(px, py); c.lineTo(px + len, py); c.stroke(); }
    // yachts drifting, one with a lit cabin
    for (let k = 0; k < 2; k++) { const px = x + (((t * (5 + k * 3) + k * 300) * u) % (w + 120 * u)) - 60 * u, py = wl + (8 + k * 14) * u, s2 = (1 - k * 0.3) * u;
      c.fillStyle = '#f2f2ee'; c.beginPath(); c.moveTo(px - 22 * s2, py); c.lineTo(px + 26 * s2, py); c.lineTo(px + 18 * s2, py + 6 * s2); c.lineTo(px - 18 * s2, py + 6 * s2); c.closePath(); c.fill(); c.fillRect(px - 8 * s2, py - 6 * s2, 16 * s2, 6 * s2);
      c.strokeStyle = '#d8d8d8'; c.lineWidth = 1 * s2; c.beginPath(); c.moveTo(px, py - 6 * s2); c.lineTo(px, py - 46 * s2); c.stroke(); c.fillStyle = 'rgba(240,240,236,0.85)'; c.beginPath(); c.moveTo(px + 1, py - 44 * s2); c.lineTo(px + 22 * s2, py - 8 * s2); c.lineTo(px + 1, py - 8 * s2); c.fill();
      if (lights > 0.3) { c.fillStyle = `rgba(255,220,140,${lights})`; c.fillRect(px - 6 * s2, py - 4.6 * s2, 12 * s2, 2.4 * s2); c.fillStyle = 'rgba(255,60,40,0.9)'; c.fillRect(px - 22 * s2, py - 2, 2, 2); c.fillStyle = 'rgba(60,255,90,0.9)'; c.fillRect(px + 25 * s2, py - 2, 2, 2); } }
    // lighthouse beam after dark
    if (lights > 0.4) { const lx = x + w * 0.9, ly = y + h * 0.62 - h * 0.12 - 25 * u, a = t * 0.9; c.save(); c.globalCompositeOperation = 'lighter'; const dir = Math.cos(a), len = w * 0.85 * Math.abs(dir); if (dir > 0.05) { const g = c.createLinearGradient(lx, ly, lx - len, ly); g.addColorStop(0, `rgba(255,250,200,${0.32 * lights * dir})`); g.addColorStop(1, 'rgba(255,250,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(lx, ly - 1.5 * u); c.lineTo(lx - len, ly - 12 * u); c.lineTo(lx - len, ly + 9 * u); c.lineTo(lx, ly + 1.5 * u); c.closePath(); c.fill(); } c.fillStyle = `rgba(255,250,220,${lights})`; ellipse(c, lx, ly, 3 * u, 3 * u); c.fill(); c.restore(); }
    // gulls by day
    if (lights < 0.5) { c.strokeStyle = 'rgba(40,40,50,0.7)'; c.lineWidth = 1 * u; for (let k = 0; k < 3; k++) { const gx = x + ((t * (14 + k * 5) + k * 140) * u) % w, gy = y + h * (0.15 + k * 0.08) + Math.sin(t * 2 + k) * 4 * u, f = Math.sin(t * 7 + k) * 3 * u; c.beginPath(); c.moveTo(gx - 6 * u, gy - f); c.quadraticCurveTo(gx - 3 * u, gy - 3 * u, gx, gy); c.quadraticCurveTo(gx + 3 * u, gy - 3 * u, gx + 6 * u, gy - f); c.stroke(); } }
  }
  function fireworks(c, V, t) { // shells rise from a barge, burst into peony/willow/ring stars, and reflect in the water
    const fw = V.on && V.on('fireworks'); if (!fw) return;
    const u = V.u, x = V.X(0.27), y = V.Y(0.08), w = V.X(0.45), h = V.Y(0.47), wl = y + h * 0.62, T = fw.t;
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.globalCompositeOperation = 'lighter';
    const COLS = ['#ff4a5a', '#ffd860', '#6ad0ff', '#c890ff', '#7aff9a', '#ffffff', '#ff9a40'];
    let flash = 0;
    for (let k = 0; k < 6; k++) {
      const per = 3.2, ph = T - k * 0.55; if (ph < 0) continue; const n = Math.floor(ph / per), cyc = (ph % per) / per;
      const r1 = mulberry32(k * 97 + n * 13), bx = x + w * (0.15 + r1() * 0.7), by = y + h * (0.1 + r1() * 0.22), col = COLS[(k + n) % COLS.length], col2 = COLS[(k + n + 3) % COLS.length], type = (k + n) % 3;
      if (cyc < 0.22) { const q = cyc / 0.22, sy = lerp(wl, by, 1 - (1 - q) * (1 - q)); c.fillStyle = rgba('#ffe8b0', 0.9); ellipse(c, bx, sy, 1.4 * u, 1.4 * u); c.fill(); c.strokeStyle = rgba('#ffb060', 0.4); c.lineWidth = 1 * u; c.beginPath(); c.moveTo(bx, sy); c.lineTo(bx + Math.sin(sy) * 1.5 * u, sy + 18 * u); c.stroke(); continue; }
      const q = (cyc - 0.22) / 0.78, R = (type === 2 ? 46 : 62) * u * (1 - Math.pow(1 - q, 3)), a = Math.pow(1 - q, 1.4), drop = q * q * 26 * u * (type === 1 ? 2 : 1);
      if (q < 0.08) { flash = Math.max(flash, 1 - q / 0.08); c.fillStyle = radial(c, bx, by, 60 * u, [[0, rgba('#ffffff', 0.6 * (1 - q / 0.08))], [1, 'rgba(255,255,255,0)']]); c.fillRect(bx - 60 * u, by - 60 * u, 120 * u, 120 * u); if (!fw['b' + k + n]) { fw['b' + k + n] = 1; if (Math.random() < 0.6) SFX('pop'); } }
      const N = type === 2 ? 24 : 34;
      for (let i = 0; i < N; i++) { const ang = i / N * TAU + r1() * 0.1, rr = R * (type === 2 ? 1 : 0.75 + r1() * 0.25), sx = bx + Math.cos(ang) * rr, sy = by + Math.sin(ang) * rr * 0.92 + drop, cc = i % 2 ? col : col2;
        if (type === 1) { c.strokeStyle = rgba('#ffd890', a * 0.6); c.lineWidth = 0.8 * u; c.beginPath(); c.moveTo(bx + Math.cos(ang) * rr * 0.5, by + Math.sin(ang) * rr * 0.46 + drop * 0.3); c.quadraticCurveTo(sx, sy - 4 * u, sx, sy + 6 * u); c.stroke(); }
        else { c.strokeStyle = rgba(cc, a * 0.5); c.lineWidth = 1 * u; c.beginPath(); c.moveTo(bx + Math.cos(ang) * rr * 0.8, by + Math.sin(ang) * rr * 0.74 + drop * 0.8); c.lineTo(sx, sy); c.stroke(); }
        if (Math.sin(t * 30 + i * 7) > -0.6 || q < 0.6) { c.fillStyle = rgba(cc, a); ellipse(c, sx, sy, 1.6 * u, 1.6 * u); c.fill(); }
        // reflection streaks in the harbour
        if (i % 4 === 0) { c.fillStyle = rgba(cc, a * 0.25); c.fillRect(sx - 1 * u, wl + (wl - sy) * 0.3, 2 * u, 8 * u + Math.sin(t * 6 + i) * 3 * u); } }
    }
    c.restore(); V.S.fwFlash = flash;
  }
  /* ---------- props ---------- */
  const bottle = (tilt) => (c, x, y) => { c.save(); c.translate(x, y); c.rotate(tilt); c.fillStyle = '#1a3a1a'; roundRect(c, -2.6, -4, 15, 5.2, 2); c.fill(); c.fillRect(-9, -2.6, 7, 2.4); c.fillStyle = '#f2ead8'; c.fillRect(2, -3.4, 6, 4); c.fillStyle = '#7a1a1a'; c.fillRect(3, -2.2, 4, 0.8); c.fillStyle = '#c8a050'; c.fillRect(-10, -2.8, 2, 2.8); c.restore(); };
  const ringBox = (c, x, y) => { c.save(); c.translate(x + 2, y - 3); c.fillStyle = '#8a1020'; roundRect(c, -3, -1, 6, 4, 1); c.fill(); c.fillStyle = '#6a0c18'; c.beginPath(); c.moveTo(-3, -1); c.lineTo(3, -1); c.lineTo(3.4, -5); c.lineTo(-2.6, -5); c.fill(); c.strokeStyle = '#e8c050'; c.lineWidth = 0.6; ellipse(c, 0, -0.6, 1.4, 1); c.stroke(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(0, -3.4); c.lineTo(1, -2.2); c.lineTo(0, -1.4); c.lineTo(-1, -2.2); c.fill(); c.restore(); };
  const notebook = (c, x, y) => { c.save(); c.translate(x + 2, y - 2); c.rotate(-0.2); c.fillStyle = '#1a1a1a'; c.fillRect(-1, -5, 8, 10); c.fillStyle = '#f4f0e6'; c.fillRect(0, -4, 6.5, 8.4); c.strokeStyle = 'rgba(40,40,80,0.6)'; c.lineWidth = 0.3; for (let q = 0; q < 4; q++) { c.beginPath(); c.moveTo(0.6, -3 + q * 2); c.lineTo(6, -3 + q * 2); c.stroke(); } c.restore(); };
  const tweezers = (c, x, y) => { c.strokeStyle = '#d8dce0'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 9, y + 5); c.moveTo(x, y + 0.8); c.lineTo(x + 9, y + 5.4); c.stroke(); };
  const pan = (flip) => (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.2 - flip * 0.3); c.fillStyle = '#2a2a2a'; c.fillRect(0, -1, 10, 2); ellipse(c, 16, 0, 7, 2.2); c.fill(); c.fillStyle = '#e8a040'; ellipse(c, 16, -1 - flip * 6, 3, 1); c.fill(); c.restore(); };
  const lobsterItem = (wig) => (c, x, y) => { c.save(); c.translate(x + 3, y - 2); c.rotate(0.3 + wig * 0.2); c.fillStyle = '#1a3040'; for (let q = 0; q < 5; q++) { ellipse(c, -q * 3, 0, 2.6 - q * 0.2, 2.2); c.fill(); } ellipse(c, 6, 0, 4, 2.6); c.fill(); c.beginPath(); c.moveTo(-15, 0); c.lineTo(-19, -3); c.lineTo(-19, 3); c.fill();
    [-1, 1].forEach((sd) => { ellipse(c, 12, sd * 4, 4.4, 2, sd * 0.4 + wig * 0.3); c.fill(); c.strokeStyle = '#e8c050'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(12, sd * 4 - 1); c.lineTo(12, sd * 4 + 1); c.stroke(); c.strokeStyle = '#3a5060'; c.lineWidth = 0.4; c.beginPath(); c.moveTo(9, sd * 1); c.quadraticCurveTo(20, sd * 8 + wig * 3, 26, sd * 3); c.stroke(); }); c.restore(); };
  function pendants(c, V, t, lit) { // hand-blown amber glass pendants over the tables; a whale-bone-white fish-skeleton sculpture above the room
    const u = V.u, X = V.X, H = V.H;
    [0.36, 0.565, 0.77].forEach((f, i) => { const sw = Math.sin(t * 0.6 + i) * 1.2 * u, px = X(f) + sw, py = H * 0.17;
      c.strokeStyle = '#1a1008'; c.lineWidth = 1 * u; c.beginPath(); c.moveTo(X(f), H * 0.06); c.lineTo(px, py); c.stroke(); c.fillStyle = '#c8a050'; c.fillRect(px - 3 * u, py - 2 * u, 6 * u, 4 * u);
      c.fillStyle = radial(c, px - 4 * u, py + 8 * u, 20 * u, [[0, lit > 0.6 ? '#fff0c0' : '#f0c890'], [0.45, '#e89a3a'], [1, '#7a3a0c']]); c.beginPath(); c.moveTo(px - 4 * u, py + 2 * u); c.bezierCurveTo(px - 18 * u, py + 6 * u, px - 16 * u, py + 22 * u, px, py + 24 * u); c.bezierCurveTo(px + 16 * u, py + 22 * u, px + 18 * u, py + 6 * u, px + 4 * u, py + 2 * u); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,220,160,0.35)'; c.lineWidth = 0.7 * u; for (let q = -2; q <= 2; q++) { c.beginPath(); c.moveTo(px + q * 1.5 * u, py + 3 * u); c.quadraticCurveTo(px + q * 6 * u, py + 14 * u, px + q * 3 * u, py + 23 * u); c.stroke(); }
      c.fillStyle = 'rgba(255,255,255,0.45)'; ellipse(c, px - 7 * u, py + 9 * u, 2 * u, 5 * u, 0.4); c.fill();
      c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = radial(c, px, py + 14 * u, 70 * u, [[0, `rgba(255,190,110,${0.28 * lit})`], [1, 'rgba(255,160,80,0)']]); c.fillRect(px - 70 * u, py - 56 * u, 140 * u, 140 * u); c.restore(); });
    // fish skeleton sculpture (spine, ribs, skull, tail) suspended on fine wires
    const fx = X(0.5), fy = H * 0.085, L = 150 * u, bob = Math.sin(t * 0.5) * 1.5 * u;
    c.strokeStyle = 'rgba(30,20,10,0.6)'; c.lineWidth = 0.5 * u; [-0.35, 0.35].forEach((q) => { c.beginPath(); c.moveTo(fx + q * L, H * 0.06); c.lineTo(fx + q * L, fy + bob); c.stroke(); });
    c.strokeStyle = '#efe6d0'; c.fillStyle = '#efe6d0'; c.lineWidth = 2.4 * u; c.beginPath(); c.moveTo(fx - L / 2, fy + bob); c.quadraticCurveTo(fx, fy - 4 * u + bob, fx + L / 2 - 16 * u, fy + bob); c.stroke();
    c.lineWidth = 1.2 * u; for (let q = 0; q < 16; q++) { const rx = fx - L / 2 + 14 * u + q * (L - 34 * u) / 16, h = Math.sin((q + 1) / 17 * Math.PI) * 14 * u + 3 * u, by = fy - 2 * u + bob; c.beginPath(); c.moveTo(rx, by); c.quadraticCurveTo(rx + 3 * u, by - h * 0.6, rx + 5 * u, by - h); c.moveTo(rx, by + 2 * u); c.quadraticCurveTo(rx + 3 * u, by + h * 0.6, rx + 5 * u, by + h); c.stroke(); }
    c.beginPath(); c.moveTo(fx + L / 2 - 18 * u, fy - 12 * u + bob); c.quadraticCurveTo(fx + L / 2 + 8 * u, fy - 6 * u + bob, fx + L / 2 + 6 * u, fy + 2 * u + bob); c.quadraticCurveTo(fx + L / 2 - 2 * u, fy + 12 * u + bob, fx + L / 2 - 18 * u, fy + 10 * u + bob); c.closePath(); c.fill(); c.fillStyle = '#1a1208'; ellipse(c, fx + L / 2 - 6 * u, fy - 3 * u + bob, 2.4 * u, 2.4 * u); c.fill(); c.fillStyle = '#efe6d0';
    c.beginPath(); c.moveTo(fx - L / 2, fy + bob); c.lineTo(fx - L / 2 - 16 * u, fy - 14 * u + bob); c.lineTo(fx - L / 2 - 10 * u, fy + bob); c.lineTo(fx - L / 2 - 16 * u, fy + 14 * u + bob); c.closePath(); c.fill();
  }
  function musicChair(c, s, V) { const k = V.sc * (s.spec.k || 1), x = s.x, y = s.y; c.fillStyle = '#1a1a1a'; c.fillRect(x - 16 * k, y + 70 * k, 32 * k, 6 * k); c.fillRect(x + s.face * -14 * k - 2 * k, y + 20 * k, 4 * k, 56 * k); c.strokeStyle = '#1a1a1a'; c.lineWidth = 2.4 * k; c.beginPath(); c.moveTo(x - 14 * k, y + 76 * k); c.lineTo(x - 16 * k, y + 120 * k); c.moveTo(x + 14 * k, y + 76 * k); c.lineTo(x + 16 * k, y + 120 * k); c.stroke(); }
  function grandPiano(c, s, V, t) { // side view, keyboard end at the pianist; lid raised on its prop stick
    const k = V.sc * (s.spec.k || 1), u = V.u, x0 = s.x + 26 * k, ky = s.y + 44 * k, fl = s.y + 122 * k, L = 150 * k;
    c.fillStyle = '#121214'; c.fillRect(s.x - 18 * k, s.y + 66 * k, 40 * k, 8 * k); c.fillRect(s.x - 16 * k, s.y + 74 * k, 3 * k, 48 * k); c.fillRect(s.x + 16 * k, s.y + 74 * k, 3 * k, 48 * k); // bench
    c.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(c, x0 + L / 2, fl, L * 0.6, 6 * k); c.fill();
    [x0 + 10 * k, x0 + L - 14 * k].forEach((lx) => { c.fillStyle = '#0c0c0e'; c.beginPath(); c.moveTo(lx - 4 * k, ky + 18 * k); c.lineTo(lx + 4 * k, ky + 18 * k); c.lineTo(lx + 2.4 * k, fl - 3 * k); c.lineTo(lx - 2.4 * k, fl - 3 * k); c.fill(); c.fillStyle = '#c8a050'; c.fillRect(lx - 2.6 * k, fl - 4 * k, 5.2 * k, 4 * k); });
    c.fillStyle = '#0c0c0e'; c.fillRect(x0 + L * 0.42, ky + 18 * k, 4 * k, fl - ky - 30 * k); c.fillStyle = '#c8a050'; c.fillRect(x0 + L * 0.38, fl - 14 * k, 14 * k, 2 * k); // lyre + pedals
    c.fillStyle = linear(c, 0, ky - 6 * k, 0, ky + 20 * k, [[0, '#3a3a40'], [0.2, '#0c0c0e'], [1, '#050506']]); c.beginPath(); c.moveTo(x0, ky - 2 * k); c.lineTo(x0 + L * 0.7, ky - 2 * k); c.bezierCurveTo(x0 + L * 0.9, ky - 2 * k, x0 + L, ky + 2 * k, x0 + L, ky + 8 * k); c.lineTo(x0 + L, ky + 18 * k); c.lineTo(x0, ky + 18 * k); c.closePath(); c.fill();
    c.fillStyle = '#f4f2ea'; c.fillRect(x0 - 8 * k, ky - 1 * k, 14 * k, 3 * k); c.fillStyle = '#121214'; c.fillRect(x0 - 8 * k, ky - 2 * k, 14 * k, 1 * k);
    c.fillStyle = '#0c0c0e'; c.beginPath(); c.moveTo(x0 + 4 * k, ky - 2 * k); c.lineTo(x0 + L * 0.95, ky - 2 * k); c.lineTo(x0 + L * 0.62, ky - 62 * k); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.18)'; c.lineWidth = 1 * k; c.beginPath(); c.moveTo(x0 + 8 * k, ky - 3 * k); c.lineTo(x0 + L * 0.62, ky - 61 * k); c.stroke();
    c.strokeStyle = '#2a2a2e'; c.beginPath(); c.moveTo(x0 + L * 0.7, ky - 2 * k); c.lineTo(x0 + L * 0.63, ky - 56 * k); c.stroke();
    c.save(); c.translate(x0 + 2 * k, ky - 4 * k); c.rotate(-0.25); c.fillStyle = '#f4ecd8'; c.fillRect(0, -12 * k, 9 * k, 12 * k); c.restore();
    c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(x0 + 6 * k, ky + 1 * k, L * 0.8, 1.5 * k);
    c.textAlign = 'center'; for (let q = 0; q < 3; q++) { const ph = (t * 0.35 + q / 3) % 1; c.fillStyle = `rgba(255,236,190,${0.6 * (1 - ph)})`; c.font = `${(11 + q * 2) * u}px serif`; c.fillText(q % 2 ? '♪' : '♫', x0 + L * (0.3 + q * 0.2) + Math.sin(ph * 6 + q) * 6 * u, ky - 20 * k - ph * 70 * u); }
  }
  /* ---------- world ---------- */
  const cfg = {
    id: 'fishhouse', flow: 'table', seed: 7070, cap: 14, spawnEvery: 10, lane: 0.975, peopleScale: 1.6, cat: false, initial: 3,
    vignette: 'rgba(0,6,14,0.62)', passX: 0.86, wetSignX: 0.6,
    lights: [{ x: 0.36, y: 0.78, r: 120, col: '#ffb860', a: 0.2, flicker: 1 }, { x: 0.565, y: 0.78, r: 120, col: '#ffb860', a: 0.2, flicker: 1 }, { x: 0.77, y: 0.78, r: 120, col: '#ffb860', a: 0.2, flicker: 1 }, { x: 0.12, y: 0.35, r: 200, col: '#d8f0ff', a: 0.14 }, { x: 0.9, y: 0.32, r: 200, col: '#ffb060', a: 0.2 }, { x: 0.77, y: 0.45, r: 120, col: '#60c0ff', a: 0.12 }],
    windows: [{ x: 0.27, y: 0.08, w: 0.45, h: 0.47, city: harbour, frame(c, V) { const u = V.u, x0 = V.X(0.27), y0 = V.Y(0.08), w = V.X(0.45), h = V.Y(0.47);
      c.strokeStyle = '#1a1a1a'; c.lineWidth = 6 * u; c.strokeRect(x0, y0, w, h); c.lineWidth = 3.4 * u; [1, 2].forEach((k) => { c.beginPath(); c.moveTo(x0 + w * k / 3, y0); c.lineTo(x0 + w * k / 3, y0 + h); c.stroke(); });
      c.fillStyle = 'rgba(255,200,140,0.05)'; c.fillRect(x0, y0, w, h); c.strokeStyle = 'rgba(255,255,255,0.06)'; c.lineWidth = 10 * u; c.beginPath(); c.moveTo(x0 + w * 0.08, y0 + h); c.lineTo(x0 + w * 0.2, y0); c.stroke(); } }],
    look(rnd, V, opt) {
      const o = Object.assign({ formal: true, noHat: true }, opt.look || {}), L = Looks.random(rnd, o);
      L.top.col = Looks.pickR(rnd, L.female ? ['#1a1a22', '#7a1020', '#1a3a5a', '#e8e0d0', '#2a5a4a', '#c8a050', '#5a2a5a'] : ['#1a1a22', '#2a2a34', '#3a3a44', '#1a2a3a', '#4a3a2a']);
      if (L.female && rnd() < 0.6) { L.top.type = 'blouse'; L.top.skirt = { col: L.top.col, len: 110, flare: 2 }; L.acc.earrings = Looks.pickR(rnd, ['#e8c050', '#f2f2f2']); L.bareLegs = rnd() < 0.5; }
      if (!L.female) { L.top.type = rnd() < 0.8 ? 'suit' : 'shirt'; L.top.tie = Looks.pickR(rnd, ['#7a1020', '#1a2a4a', '#2a2a2a', '#c8a050', null]); L.pants = L.top.col; L.shoe = '#1a120c'; }
      return L;
    },
    spawn(V) { const r = Math.random(); V.party(r < 0.55 ? 2 : r < 0.8 ? 3 : 4); },
    queue(V) { return [0, 1, 2, 3, 4].map((i) => [V.X(0.2) - i * 38 * V.u, V.lane() - 4 * V.u, V.X(0.26)]); },
    setup(V) {
      [0.36, 0.565, 0.77].forEach((f) => V.addTable({ x: f, y: 0.8, rx: 78, ry: 22, neck: 46, seats: [[-1, 1], [-0.34, 1], [0.34, -1], [1, -1]] }));
      const tux = (extra) => Object.assign({ skin: 'light', hair: 'dbrown', hairStyle: 'slick', top: { type: 'tux', col: '#141418', bow: '#141418' }, sleeves: 'long', pants: '#141418', shoe: '#0a0a0a' }, extra);
      V.S.maitre = V.addStaff({ role: 'idle', floor: true, x: 0.255, feetY: 0.92, look: tux({ skin: 'olive', hair: 'grey', acc: { mustache: true } }), idle: [['stand', 3], ['present', 2], ['bow', 1.2]] });
      V.S.w1 = V.addStaff({ role: 'waiter', floor: true, x: 0.66, feetY: 0.93, speed: 125, look: tux({ top: { type: 'tux', col: '#f4f2ec', bow: '#141418' } }), accepts: (j) => !j.somm, idle: [['stand', 2], ['napkin', 2]] });
      V.S.w2 = V.addStaff({ role: 'waiter', floor: true, x: 0.47, feetY: 0.93, speed: 125, look: tux({ female: true, lashes: true, skin: 'tan', hair: 'black', hairStyle: 'bun', top: { type: 'tux', col: '#f4f2ec', bow: '#141418' } }), accepts: (j) => !j.somm, idle: [['stand', 2], ['napkin', 2]] });
      V.S.somm = V.addStaff({ role: 'waiter', floor: true, x: 0.3, feetY: 0.93, speed: 115, look: { skin: 'pale', hair: 'auburn', hairStyle: 'side', acc: { beard: true, glasses: '#2a2a2a', round: true }, top: { type: 'vest', col: '#2a1a14', shirt: '#f4f0e6', tie: '#7a1020', chain: true }, sleeves: 'long', pants: '#1a1a1a', shoe: '#0a0a0a' }, accepts: (j) => j.somm, idle: [['stand', 2], ['polishGlass', 2.4]] });
      // raw bar shucker; head chef at the pass with tweezers; line cook at the sauté station
      V.S.shuck = V.addStaff({ role: 'cook', layer: 'back', armsOver: true, x: 0.12, y: 0.4, k: 0.9, look: { skin: 'tan', hair: 'black', hairStyle: 'buzz', acc: { beard: true }, top: { type: 'apron', col: '#f4f4f0', apron: '#1a3a5a', stripes: '#f4f4f0' }, sleeves: 'long' }, idle: [['shuck', 2.4], ['ice', 2], ['shuck', 2]] });
      V.S.chef = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.875, y: 0.39, k: 0.85, look: { skin: 'pale', hair: 'grey', hairStyle: 'short', acc: { hat: 'toque', hatCol: '#ffffff' }, top: { type: 'uniform', col: '#f8f8f6', trim: '#d8d8d0' }, sleeves: 'long' }, idle: [['tweezer', 3], ['tweezer', 2.4], ['wipeRim', 1.6], ['service', 1.6]] });
      V.S.cook = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.955, y: 0.39, k: 0.85, look: { skin: 'brown', hair: 'black', hairStyle: 'short', acc: { band: '#1a1a1a' }, top: { type: 'uniform', col: '#2a2a2a', trim: '#5a5a5a' }, sleeves: 'long' }, idle: [['saute', 2.6], ['saute', 2], ['plateUp', 1.8]] });
      // string trio + piano in front of the windows
      const mus = (x, act, look, k = 0.84, sit = false) => { const s = V.addStaff(sit ? { role: 'idle', x, y: 0.655 - (116 * 1.6 * k) / 800, k, look, idle: [[act, 6]] } : { role: 'idle', floor: true, feetY: 0.655, x, k, look, idle: [[act, 6]] }); if (sit) s.seat = { legs: 'chair' }; s.face = 1; return s; };
      V.S.pianist = mus(0.3, 'piano', { skin: 'olive', hair: 'black', hairStyle: 'slick', top: { type: 'tux', col: '#141418', bow: '#141418' }, sleeves: 'long', pants: '#141418' }, 0.84, true);
      mus(0.43, 'violin', { female: true, lashes: true, skin: 'pale', hair: 'blonde', hairStyle: 'bun', top: { type: 'blouse', col: '#141418', skirt: { col: '#141418', len: 116 } }, sleeves: 'long' });
      mus(0.49, 'viola', { skin: 'brown', hair: 'black', hairStyle: 'short', top: { type: 'suit', col: '#141418', tie: '#141418' }, sleeves: 'long', pants: '#141418' });
      const cel = mus(0.555, 'cello', { female: true, lashes: true, skin: 'light', hair: 'dbrown', hairStyle: 'long', top: { type: 'blouse', col: '#141418' }, sleeves: 'long', pants: '#141418' }, 0.84, true); cel.face = -1;
      V.S.trio = [0.43, 0.49].map((x) => x);
    },
    tableDish(tb) { const a = (tb.party ? tb.party.members : [0, 1]).map(() => ({ kind: 'oyster', left: 1 })); a.passX = 0.13; return a; },
    prep() { return [['shuck', 1.6], ['shuck', 1.4], ['ice', 1.2], ['lemon', 1]]; },
    tray(j) { return (c) => { [-7, 7].forEach((dx) => Items.cloche(0)(c, dx - 4, 24)); }; },
    dirtyTray() { return (c) => { for (let k = 0; k < 3; k++) { c.fillStyle = '#f4f4f2'; ellipse(c, 0, 28 - k * 2, 10, 2.4); c.fill(); c.strokeStyle = 'rgba(150,150,150,0.6)'; c.lineWidth = 0.4; c.stroke(); } }; },
    *partyEat(a, tb, V) {
      const party = tb.party, lead = party.lead === a, seat = a.seat;
      for (let c = 0; c <= COURSES.length; c++) {
        if (c > 0) yield ['until', () => (tb.S.course || 0) >= c];
        const d = seat.dish || { kind: 'oyster', left: 1 };
        if (c > 0 && tb.S.revealT !== undefined) { a.act = 'clap'; a.actT = 0; a.awe = 1.6; yield ['wait', 1.2]; if (Math.random() < 0.35 && a.P.age !== 'old') { a.act = 'phone'; a.actT = 0; yield ['wait', 1.6]; } }
        for (let b = 0; b < 3; b++) {
          a.act = d.kind === 'oyster' ? 'slurp' : 'eat'; a.actT = 0; a.item2 = d.kind === 'oyster' ? Items.oyster : Items.fork(d.kind === 'dessert' ? '#4a2a14' : d.kind === 'crudo' ? '#f0b8a8' : '#f4ece0'); a.item = null; a.look = tb.x; yield ['wait', 2.2 + Math.random()];
          d.left = Math.max(0, d.left - 1 / 3); a.item2 = null;
          const r = Math.random();
          if (r < 0.3) { a.act = 'drink'; a.actT = 0; a.item2 = Items.wine(tb.S.red ? '#7a1020' : '#e8d890', 0.7); yield ['wait', 2.6]; a.item2 = null; }
          else if (r < 0.65) { a.act = 'talk'; a.actT = 0; a.look = a.buddy ? a.buddy.x : null; yield ['wait', 1.2 + Math.random() * 1.4]; }
          else if (r < 0.75) { a.act = 'laugh'; a.actT = 0; yield ['wait', 1.2]; }
          else { a.act = 'stand'; a.actT = 0; a.savor = 1.4; yield ['wait', 1.4]; }
        }
        a.doneC = c;
        if (lead && c < COURSES.length) {
          yield ['until', () => party.members.every((m) => (m.doneC ?? -1) >= c)];
          if (c === 1 && Math.random() < 0.7) { party.members.forEach((m) => { m.toastT = 2.2; }); SFX('clink'); yield ['wait', 2.2]; }
          const kind = COURSES[c];
          const jb = V.job({ kind: 'task', table: tb, role: 'waiter', act: 'cloche', dur: 2.2, carry: true, passX: 0.86, finish: () => { party.members.forEach((m) => { if (m.seat) m.seat.dish = { kind, left: 1 }; }); tb.S.course = c + 1; tb.S.revealT = 0; V.steam(tb.x, tb.y - 14 * V.u, 6, 1.2); } });
          yield ['until', () => jb.state === 'done'];
        }
      }
    },
    tableTick(tb, dt, V) {
      const S = tb.S;
      if (tb.state === 'free' && S.prev && S.prev !== 'free') tb.S = {};
      if ((tb.state === 'waiting' || tb.state === 'eating') && !S.sommJob) { S.red = Math.random() < 0.5; S.sommJob = V.job({ kind: 'task', table: tb, role: 'waiter', somm: true, act: 'pour', dur: 3.4, start: () => { if (tb.party) tb.party.lead.tasteT = 3.4; }, finish: () => { S.wine = 1; } }); }
      if (S.revealT !== undefined) S.revealT += dt;
      tb.S.prev = tb.state;
    },
    tick(V, dt, t) {
      V.agents.forEach((a) => { ['tasteT', 'awe', 'toastT', 'savor', 'gaspT'].forEach((k) => { if (a[k] > 0) a[k] -= dt; }); });
      // chef calls "Service!" when a cloche course is picked up
      const ch = V.S.chef; if (V.jobs.some((j) => j.act === 'cloche' && j.state === 'taken' && j.by && Math.abs(j.by.x - V.X(0.86)) < 20 * V.u) && !(ch.say && ch.say.t > 0)) { ch.act = 'service'; ch.actT = 0; ch.say = { txt: 'Service!', t: 1.4 }; SFX('bell'); }
      const fx = V.S.flambe;
      if (fx) { fx.t += dt; if (fx.lit && fx.t - fx.lit < 3.5 && Math.random() < 0.6) V.burst(fx.x, fx.y - 6 * V.u, 1, '#ffb040', { kind: 'spark', up: 140, sp: 40, g: -60, life: 0.9, sz: 2 }); }
      // fireworks: everyone turns to the window and gasps
      if (V.on('fireworks')) V.agents.forEach((a) => { if (a.sitting && Math.random() < dt * 0.4) a.awe = 1.4; });
    },
    custPose(a, ps, t, V) {
      if (a.tasteT > 0) { const k = 3.4 - a.tasteT; ps.arms = ps.arms.filter((x) => x.side !== 1); const sw = k < 1.6 ? Math.sin(k * 9) * 3 : 0; ps.arms.push({ side: 1, x: 10 + sw, y: k < 1.6 ? 26 : k < 2.6 ? 4 : 26, grip: 'fist', item: Items.wine(a.party && a.party.table && a.party.table.S.red ? '#7a1020' : '#e8d890', 0.4) }); if (k > 1.6 && k < 2.6) { ps.face.eyes = 'closed'; ps.head.nod = -0.6; } if (k > 2.6) { ps.head.nod = Math.sin(k * 8) * 1.4; ps.face.mouth = 'smile'; } }
      if (a.toastT > 0) { ps.arms = ps.arms.filter((x) => x.side !== 1); const up = Math.min(1, (2.2 - a.toastT) * 3); ps.arms.push({ side: 1, x: 16 + (a.face > 0 ? 1 : -1) * 4, y: 26 - up * 30, grip: 'fist', item: Items.wine(a.party && a.party.table && a.party.table.S.red ? '#7a1020' : '#e8d890', 0.6) }); ps.face.mouth = 'laugh'; ps.face.eyes = 'happy'; }
      if (a.awe > 0) { ps.face.mouth = 'o'; ps.face.open = 0.6; ps.face.brow = 1; ps.lean = 0.05 * (a.face || 1); if (V.on('fireworks')) ps.head.turn = -0.4; }
      if (a.savor > 0) { ps.face.eyes = 'closed'; ps.face.mouth = 'smile'; ps.head.tilt = 0.08; }
      if (a.gaspT > 0) { ps.arms = [{ side: -1, x: -4, y: 4, grip: 'open' }, { side: 1, x: 4, y: 4, grip: 'open' }]; ps.face.mouth = 'o'; ps.face.open = 0.9; ps.face.brow = 1; }
      if (a.kneel) { ps.legs = { k1: [14, 70], f1: [16, 92], k2: [-4, 90], f2: [-24, 92] }; ps.arms = [{ side: -1, x: -10, y: 40, grip: 'fist' }, { side: 1, x: 22, y: 18, grip: 'fist', item: ringBox }]; ps.face.mouth = 'smile'; ps.head.nod = -0.8; ps.lean = -0.04; }
      if (a.critic) { if (a.act === 'stand' || a.act === 'talk') { ps.arms = [{ side: -1, x: -8, y: 30, grip: 'fist', item: notebook }, { side: 1, x: 4 + Math.sin(t * 9) * 1.5, y: 28, grip: 'fist', item: (c, x, y) => { c.strokeStyle = '#2a2a2a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3, y - 7); c.stroke(); } }]; ps.face.lookY = 1; ps.face.mouth = 'flat'; ps.head.nod = 1; } }
    },
    pose(s, ps, t, V) {
      const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
      switch (s.act) {
        case 'cloche': { const lift = clamp((k - 0.6) / 0.8, 0, 1); ps.arms = [A(-1, -16, 30, { grip: 'open' }), A(1, 24 - lift * 4, 30 - lift * 20, { item: Items.cloche(lift) })]; ps.lean = 0.06; ps.face.mouth = lift > 0.5 ? 'big' : 'smile'; ps.head.nod = 0.6; return; }
        case 'pour': { if (k < 1.2) { ps.arms = [A(-1, 4, 30, { grip: 'open' }), A(1, 18, 26, { item: bottle(0) })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 9)) * 0.6; } else { const p = Math.min(1, (k - 1.2) / 0.5); ps.arms = [A(-1, -12, 40, { item: (c, x, y) => { c.fillStyle = '#f4f2ec'; c.fillRect(x - 3, y - 2, 6, 10); } }), A(1, 22, 22 - p * 4, { item: bottle(0.2 + p * 0.5) })]; ps.lean = 0.07; ps.face.lookY = 1; } return; }
        case 'present': ps.arms = [A(-1, -14, 42), A(1, 30, 26, { grip: 'open', handAng: -0.4 })]; ps.face.mouth = 'smile'; ps.head.turn = 0.5; return;
        case 'stand': if (s.spec.role !== 'waiter') return false; ps.arms = [A(-1, -6, 50, { grip: 'fist' }), A(1, 10, 34, { grip: 'fist', item: (c, x, y) => { c.fillStyle = '#fbfaf6'; c.beginPath(); c.moveTo(x - 6, y - 2); c.lineTo(x + 6, y - 2); c.lineTo(x + 4, y + 12); c.lineTo(x - 3, y + 10); c.closePath(); c.fill(); } })]; ps.face.mouth = 'smile'; return;
        case 'napkin': ps.arms = [A(-1, -6, 34, { item: Items.napkin }), A(1, 10, 42)]; return;
        case 'polishGlass': { const r = Math.sin(k * 8); ps.arms = [A(-1, -2, 26, { item: Items.wine('#e8d890', 0) }), A(1, 4 + r * 2, 24 + r, { grip: 'open', item: Items.napkin })]; ps.face.lookY = 0.6; return; }
        case 'shuck': { const tw = Math.sin(k * 7); ps.arms = [A(-1, 2, 58, { item: Items.oyster }), A(1, 12 + tw * 2, 56, { item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(tw * 0.5); c.fillStyle = '#6a3a1a'; c.fillRect(-1, -1.4, 5, 2.8); c.fillStyle = '#d8dce0'; c.fillRect(4, -0.6, 5, 1.2); c.restore(); } })]; ps.face.lookY = 1; ps.head.nod = 1.6; ps.face.mouth = 'flat'; return; }
        case 'ice': ps.arms = [A(-1, -14, 58, { grip: 'open' }), A(1, 18 + Math.sin(k * 5) * 6, 60, { grip: 'open' })]; ps.face.lookY = 1; ps.head.nod = 1.2; return;
        case 'lemon': ps.arms = [A(-1, 2, 58, { grip: 'open' }), A(1, 14, 52, { item: (c, x, y) => { c.fillStyle = '#f6d830'; c.beginPath(); c.arc(x + 2, y, 2.4, Math.PI, 0); c.fill(); } })]; ps.face.mouth = 'smile'; return;
        case 'tweezer': { const p = Math.sin(k * 3); ps.arms = [A(-1, 0, 60, { grip: 'open' }), A(1, 12 + p * 4, 56 + Math.abs(p) * 2, { item: tweezers })]; ps.face.lookY = 1; ps.head.nod = 1.8; ps.face.mouth = 'flat'; ps.face.brow = 0.4; return; }
        case 'wipeRim': ps.arms = [A(-1, 0, 60, { grip: 'open' }), A(1, 12 + Math.sin(k * 10) * 6, 60, { grip: 'open', item: Items.napkin })]; ps.face.lookY = 1; ps.head.nod = 1.4; return;
        case 'service': ps.arms = [A(-1, -10, 40), A(1, 20, -6, { grip: 'open' })]; ps.face.mouth = 'talk'; ps.face.open = 0.8; ps.head.nod = -0.6; return;
        case 'saute': { const f = Math.max(0, Math.sin(k * 6)); ps.arms = [A(-1, 16, 52 - f * 8, { item: pan(f) }), A(1, 10, 56, { grip: 'open' })]; ps.face.lookY = 0.8; if (f > 0.95 && Math.random() < 0.3) V.burst(s.x + 30 * V.u, s.y + 30 * V.u, 6, '#ffa040', { kind: 'spark', up: 160, sp: 50, g: -30, life: 0.7, sz: 2.4 }); return; }
        case 'plateUp': ps.arms = [A(-1, 4, 58, { grip: 'open' }), A(1, 18, 56, { grip: 'open' })]; ps.face.lookY = 1; return;
        case 'piano': { const a1 = Math.sin(t * 7), a2 = Math.sin(t * 6.3 + 1); ps.arms = [A(-1, 14 + a1 * 5, 40 + Math.abs(a1) * 2, { grip: 'open' }), A(1, 26 + a2 * 5, 40 + Math.abs(a2) * 2, { grip: 'open' })]; ps.head.nod = 0.6 + Math.sin(t * 1.4) * 0.4; ps.face.eyes = Math.sin(t * 0.5) > 0.5 ? 'closed' : null; return; }
        case 'violin': case 'viola': { const b = Math.sin(t * (s.act === 'violin' ? 2.6 : 2.1)); ps.arms = [A(-1, -16, 6, { grip: 'open' }), A(1, 10 + b * 12, 18 - b * 6, { item: (c, x, y) => { c.strokeStyle = '#c8a070'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(x - 4, y + 3); c.lineTo(x + 24, y - 8); c.stroke(); } })]; ps.head.tilt = -0.2; ps.face.eyes = 'closed'; ps.over = (c) => { c.save(); c.translate(-8, 8); c.rotate(-0.5); const sz = s.act === 'viola' ? 1.15 : 1; c.fillStyle = '#8a3a14'; ellipse(c, 0, 0, 6 * sz, 3.4 * sz); c.fill(); ellipse(c, 5 * sz, 0, 5 * sz, 3 * sz); c.fill(); c.fillStyle = '#1a0a04'; c.fillRect(-10 * sz, -0.8, 14 * sz, 1.6); c.restore(); }; return; }
        case 'cello': { const b = Math.sin(t * 1.6); ps.arms = [A(-1, -10, 24, { grip: 'open' }), A(1, 4 + b * 14, 62, { item: (c, x, y) => { c.strokeStyle = '#c8a070'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x - 14, y + 2); c.lineTo(x + 18, y - 2); c.stroke(); } })]; ps.head.tilt = 0.12; ps.face.eyes = 'closed'; ps.over = (c) => { c.fillStyle = linear(c, -14, 0, 14, 0, [[0, '#5a2008'], [0.5, '#a8501a'], [1, '#5a2008']]); ellipse(c, 0, 74, 13, 15); c.fill(); ellipse(c, 0, 52, 10, 11); c.fill(); c.fillStyle = '#1a0a04'; c.fillRect(-1, 14, 2, 64); c.fillRect(-0.6, 88, 1.2, 34); c.strokeStyle = '#1a0a04'; c.lineWidth = 0.8; [-4, 4].forEach((dx) => { c.beginPath(); c.moveTo(dx, 66); c.quadraticCurveTo(dx * 1.4, 70, dx, 76); c.stroke(); }); }; return; }
        case 'kneel': return false;
      }
      if (s === V.S.w1 || s === V.S.w2) { if (s.carry && s.carryLob) {} }
      return false;
    },
    back(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(5);
      // deep navy panelled walls, brass reveals, a coffered dark-oak ceiling with pin lights
      x.fillStyle = linear(x, 0, 0, 0, H * 0.66, [[0, '#0c1a26'], [1, '#14283a']]); x.fillRect(0, 0, W, H * 0.66);
      for (let k = 0; k < 14; k++) { const px = k * W / 13; x.fillStyle = 'rgba(255,255,255,0.025)'; x.fillRect(px + 4 * u, H * 0.08, W / 13 - 8 * u, H * 0.56); x.fillStyle = '#b8904a'; x.fillRect(px, H * 0.07, 1.4 * u, H * 0.59); }
      x.fillStyle = '#2a1a0e'; x.fillRect(0, 0, W, H * 0.06); x.fillStyle = '#b8904a'; x.fillRect(0, H * 0.06, W, 2 * u);
      for (let k = 0; k < 16; k++) { const px = (k + 0.5) * W / 16; x.fillStyle = 'rgba(255,230,180,0.9)'; ellipse(x, px, H * 0.035, 3 * u, 1.4 * u); x.fill(); }
      // raw bar back: mirrored tiles and a chalk "OYSTERS" board
      x.fillStyle = '#e8eef0'; x.fillRect(0, H * 0.12, X(0.25), H * 0.43);
      x.strokeStyle = 'rgba(120,150,160,0.35)'; x.lineWidth = 1; for (let gy = H * 0.12; gy < H * 0.55; gy += 8 * u) for (let gx = (Math.round(gy / (8 * u)) % 2) * 8 * u; gx < X(0.25); gx += 16 * u) x.strokeRect(gx, gy, 16 * u, 8 * u);
      x.fillStyle = '#1a2420'; roundRect(x, X(0.02), H * 0.14, X(0.21), H * 0.12, 4 * u); x.fill(); x.strokeStyle = '#b8904a'; x.lineWidth = 2 * u; x.stroke();
      x.fillStyle = '#f2f0e6'; x.font = `italic ${15 * u}px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Oysters today', X(0.125), H * 0.165);
      x.font = `${9.5 * u}px Georgia, serif`; ['Sydney Rock · Merimbula   6', 'Pacific · Coffin Bay   5.5', 'Angasi · Tasmania   9'].forEach((l, i) => x.fillText(l, X(0.125), H * 0.195 + i * 13 * u));
      // lobster tank housing and the open kitchen
      x.fillStyle = '#1a1a20'; x.fillRect(X(0.732), H * 0.3, X(0.075), H * 0.3);
      const kx0 = X(0.815); x.fillStyle = '#2a2a2e'; x.fillRect(kx0, H * 0.08, W - kx0, H * 0.5);
      x.fillStyle = linear(x, kx0, 0, W, 0, [[0, '#6a747e'], [0.5, '#d8e0e8'], [1, '#6a747e']]); x.beginPath(); x.moveTo(kx0, H * 0.12); x.lineTo(W, H * 0.12); x.lineTo(W, H * 0.2); x.lineTo(kx0 + 12 * u, H * 0.2); x.closePath(); x.fill(); // hood
      x.fillStyle = '#c8ccd0'; x.fillRect(kx0, H * 0.2, W - kx0, H * 0.38); x.strokeStyle = 'rgba(80,80,90,0.3)'; for (let gy = H * 0.2; gy < H * 0.58; gy += 9 * u) { x.beginPath(); x.moveTo(kx0, gy); x.lineTo(W, gy); x.stroke(); }
      for (let k = 0; k < 6; k++) { const px = kx0 + 10 * u + k * 13 * u; x.fillStyle = '#f4f0e0'; x.fillRect(px, H * 0.205, 9 * u, 14 * u); x.fillStyle = 'rgba(40,40,40,0.5)'; for (let q = 0; q < 4; q++) x.fillRect(px + 1.5 * u, H * 0.205 + 3 * u + q * 2.6 * u, 6 * u, 0.7 * u); } // ticket rail
      // floor: dark walnut boards with a deep-blue runner
      const fy = H * 0.66; x.fillStyle = '#20140c'; x.fillRect(0, fy, W, H - fy);
      for (let r = 0; r < 16; r++) { const y0 = fy + (H - fy) * Math.pow(r / 16, 1.25), y1 = fy + (H - fy) * Math.pow((r + 1) / 16, 1.25), off = rnd() * 200 * u;
        for (let px = -off; px < W; ) { const len = (140 + rnd() * 160) * u * (0.7 + r / 16), base = shade('#3a2214', (rnd() - 0.5) * 0.22);
          x.fillStyle = linear(x, 0, y0, 0, y1, [[0, shade(base, 0.08)], [1, shade(base, -0.1)]]); x.fillRect(px, y0, len - 1.2 * u, y1 - y0 - 0.8 * u);
          x.strokeStyle = 'rgba(20,10,4,0.35)'; x.lineWidth = 0.6 * u; for (let g = 0; g < 3; g++) { const gy = y0 + (y1 - y0) * (0.25 + g * 0.25 + (rnd() - 0.5) * 0.1); x.beginPath(); x.moveTo(px, gy); x.bezierCurveTo(px + len * 0.3, gy + (rnd() - 0.5) * 2 * u, px + len * 0.7, gy + (rnd() - 0.5) * 2 * u, px + len, gy); x.stroke(); }
          px += len; } }
      x.fillStyle = linear(x, X(0.27), fy, X(0.72), fy, [[0, 'rgba(120,150,190,0)'], [0.5, 'rgba(120,150,190,0.12)'], [1, 'rgba(120,150,190,0)']]); x.beginPath(); x.moveTo(X(0.27), fy); x.lineTo(X(0.72), fy); x.lineTo(X(0.8), H); x.lineTo(X(0.2), H); x.closePath(); x.fill(); // window glow on the polish
      x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, fy, W, 6 * u);
    },
    counter(x, V) { // raw bar counter with crushed ice; the kitchen pass ledge with heat lamps
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(9);
      x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.68, [[0, '#d8dde0'], [0.12, '#8a949e'], [1, '#2a3038']]); x.fillRect(0, H * 0.53, X(0.25), H * 0.15);
      x.fillStyle = '#f4f8fa'; x.fillRect(0, H * 0.515, X(0.25), H * 0.025); for (let k = 0; k < 220; k++) { x.fillStyle = rnd() < 0.5 ? '#ffffff' : '#d8eef6'; x.fillRect(rnd() * X(0.25), H * 0.512 + rnd() * H * 0.02, 2.4 * u, 1.6 * u); }
      for (let k = 0; k < 14; k++) { const ox = X(0.012) + k * X(0.016), oy = H * 0.52; x.fillStyle = '#6a7470'; ellipse(x, ox, oy, 6 * u, 2.6 * u); x.fill(); x.fillStyle = '#e8e2d0'; ellipse(x, ox, oy - 0.8 * u, 4 * u, 1.6 * u); x.fill(); }
      // three-tier plateau de fruits de mer
      const px = X(0.2), py = H * 0.515;
      [[46, 0], [35, 48], [24, 88]].forEach(([r, dy], tier) => { const ty = py - dy * u; x.strokeStyle = '#c8ccd0'; x.lineWidth = 2 * u; x.beginPath(); x.moveTo(px, ty); x.lineTo(px, ty - 44 * u); x.stroke();
        x.fillStyle = linear(x, px - r * u, 0, px + r * u, 0, [[0, '#8a949e'], [0.5, '#f4f8fc'], [1, '#7a848e']]); ellipse(x, px, ty - 2 * u, r * u, 5 * u); x.fill(); x.fillStyle = '#f4fafc'; ellipse(x, px, ty - 4 * u, r * 0.92 * u, 4 * u); x.fill();
        for (let k = 0; k < 7; k++) { const a = k / 7 * TAU, ox = px + Math.cos(a) * r * 0.7 * u, oy = ty - 5 * u + Math.sin(a) * 2.6 * u; if (tier === 0) { x.fillStyle = '#e8401a'; ellipse(x, ox, oy - 2 * u, 4 * u, 2.6 * u); x.fill(); } else if (tier === 1) { x.fillStyle = '#6a7470'; ellipse(x, ox, oy, 4.6 * u, 2 * u); x.fill(); x.fillStyle = '#e8e2d0'; ellipse(x, ox, oy - 0.8 * u, 3 * u, 1.2 * u); x.fill(); } else { x.strokeStyle = '#f08a5a'; x.lineWidth = 2.4 * u; x.beginPath(); x.arc(ox, oy - 2 * u, 3 * u, Math.PI * 0.2, Math.PI * 1.4); x.stroke(); } }
        x.fillStyle = '#f6d830'; x.beginPath(); x.arc(px + r * 0.3 * u, ty - 6 * u, 3 * u, Math.PI, 0); x.fill(); });
      // the pass
      const kx0 = X(0.815); x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.62, [[0, '#f4f8fc'], [0.2, '#a8b0b8'], [1, '#4a525a']]); x.fillRect(kx0 - 6 * u, H * 0.5, W - kx0 + 6 * u, H * 0.13);
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H, lit = V.lit || 1; V.ctx = ctx;
      fireworks(ctx, V, t);
      pendants(ctx, V, t, lit);
      // lobster tank
      const tx = X(0.737), tw = X(0.065), ty = H * 0.31, th = H * 0.27;
      ctx.fillStyle = linear(ctx, 0, ty, 0, ty + th, [[0, 'rgba(90,170,210,0.9)'], [1, 'rgba(20,60,90,0.95)']]); ctx.fillRect(tx, ty, tw, th);
      ctx.fillStyle = '#c8b890'; ctx.fillRect(tx, ty + th - 8 * u, tw, 8 * u);
      for (let k = 0; k < 2; k++) { const lx = tx + tw * (0.32 + k * 0.36) + Math.sin(t * 0.3 + k * 3) * 4 * u, ly = ty + th - 16 * u - k * 46 * u; ctx.save(); ctx.translate(lx, ly); ctx.scale(2.3 * u * (k ? -1 : 1), 2.3 * u); lobsterItem(Math.sin(t * 2 + k))(ctx, -6, 2); ctx.restore(); }
      if (!V.S.lobsterOut) {} 
      ctx.fillStyle = 'rgba(255,255,255,0.55)'; for (let b = 0; b < 5; b++) { const bp = (t * 0.4 + b * 0.21) % 1; ellipse(ctx, tx + tw * (0.2 + b * 0.15), ty + th * (1 - bp), 1.2 * u, 1.2 * u); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(tx, ty, tw * 0.2, th); ctx.strokeStyle = '#5a646e'; ctx.lineWidth = 3 * u; ctx.strokeRect(tx, ty, tw, th);
      // heat lamps over the pass
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      [0.84, 0.9, 0.96].forEach((f) => { const lx = X(f), ly = H * 0.36; ctx.fillStyle = '#3a3a3a'; ctx.fillRect(lx - 1, H * 0.2, 2, ly - H * 0.2); ctx.fillStyle = radial(ctx, lx, ly + 30 * u, 60 * u, [[0, 'rgba(255,150,60,0.35)'], [1, 'rgba(255,120,40,0)']]); ctx.fillRect(lx - 60 * u, ly - 30 * u, 120 * u, 120 * u); ctx.fillStyle = '#ffb060'; ellipse(ctx, lx, ly, 8 * u, 3 * u); ctx.fill(); });
      ctx.restore();
    },
    counterLive(ctx, t, dt, V) { // plates waiting on the pass under the lamps; flare from the sauté station
      const u = V.u, X = V.X, H = V.H;
      [0.835, 0.865, 0.895].forEach((f, i) => { if ((V.jobs.filter((j) => j.act === 'cloche' && j.state === 'new').length) > i) plateArt(ctx, COURSES[i % 3], X(f), H * 0.505, u * 1.4, 1, t); });
      const ck = V.S.cook; if (ck && ck.act === 'saute') { const f = Math.max(0, Math.sin(ck.actT * 6)); if (f > 0.6) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 6; k++) { ctx.fillStyle = `rgba(255,${120 + k * 20},40,${0.25 * f})`; ellipse(ctx, X(0.975) + Math.sin(t * 20 + k) * 4 * u, H * 0.46 - k * 5 * u * f, (8 - k) * u, (10 + k * 2) * u * f); ctx.fill(); } ctx.restore(); } }
    },
    drawSeat(ctx, seat, t, V) { // upholstered dining chair, deep teal velvet with a brass nailhead edge
      const k = V.sc, cx = seat.x, top = seat.y + 6 * k, bot = seat.table ? seat.table.y : seat.y + 70 * k;
      ctx.fillStyle = linear(ctx, cx - 22 * k, 0, cx + 22 * k, 0, [[0, '#0a2a2a'], [0.5, '#1a5050'], [1, '#0a2a2a']]); roundRect(ctx, cx - 21 * k, top, 42 * k, bot - top, 12 * k); ctx.fill();
      ctx.fillStyle = '#c8a050'; for (let q = 0; q < 9; q++) { ellipse(ctx, cx - 18 * k + q * 4.5 * k, top + 3 * k, 0.8 * k, 0.8 * k); ctx.fill(); }
    },
    drawTable(ctx, tb, t, V) {
      const u = V.u, k = V.sc, S = tb.S, rx = tb.rx, ry = tb.ry, fl = tb.y + 52 * k;
      tb.seats.forEach((s) => { if (!s.who) cfg.drawSeat(ctx, s, t, V); });
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(ctx, tb.x, fl, rx * 1.05, ry * 0.7); ctx.fill();
      ctx.fillStyle = linear(ctx, tb.x - rx, 0, tb.x + rx, 0, [[0, '#a8a49a'], [0.35, '#f8f6f0'], [0.6, '#fbfaf6'], [1, '#9a968c']]); ctx.beginPath(); ctx.moveTo(tb.x - rx, tb.y); ctx.lineTo(tb.x - rx * 1.03, fl); ctx.ellipse(tb.x, fl, rx * 1.03, ry * 0.6, 0, Math.PI, 0, true); ctx.lineTo(tb.x + rx, tb.y); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(80,70,60,0.18)'; ctx.lineWidth = 2 * u; for (let q = -3; q <= 3; q++) { ctx.beginPath(); ctx.moveTo(tb.x + q * rx * 0.26, tb.y + ry); ctx.lineTo(tb.x + q * rx * 0.28, fl + ry * 0.5); ctx.stroke(); }
      ctx.fillStyle = '#fdfcf8'; ellipse(ctx, tb.x, tb.y, rx, ry); ctx.fill();
      // candle with a flickering flame and warm pool
      const fl2 = 0.85 + 0.15 * Math.sin(t * 13 + tb.x) * Math.sin(t * 7.7); ctx.fillStyle = 'rgba(220,230,240,0.5)'; ctx.fillRect(tb.x - 4 * u, tb.y - 16 * u, 8 * u, 14 * u); ctx.fillStyle = '#f4ecd8'; ctx.fillRect(tb.x - 2 * u, tb.y - 13 * u, 4 * u, 10 * u);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = radial(ctx, tb.x, tb.y - 16 * u, 40 * u, [[0, `rgba(255,190,110,${0.4 * fl2})`], [1, 'rgba(255,160,80,0)']]); ctx.fillRect(tb.x - 40 * u, tb.y - 56 * u, 80 * u, 80 * u); ctx.restore();
      ctx.fillStyle = '#ffd890'; ctx.beginPath(); ctx.ellipse(tb.x, tb.y - 17 * u, 1.6 * u, 3.4 * u * fl2, Math.sin(t * 5) * 0.1, 0, TAU); ctx.fill();
      // place settings: plate with the current course, glasses, silver
      tb.seats.forEach((s) => { const px = tb.x + (s.x - tb.x) * 0.62, py = tb.y + ry * 0.05; if (s.who) {
        if (s.dish) plateArt(ctx, s.dish.kind, px, py + 2 * u, u * 1.7, s.dish.left, t); else { ctx.fillStyle = '#c8a050'; ellipse(ctx, px, py + 2.6 * u, 22 * u, 6.4 * u); ctx.fill(); ctx.fillStyle = '#f8f8f6'; ellipse(ctx, px, py + 2 * u, 20 * u, 5.8 * u); ctx.fill(); ctx.strokeStyle = 'rgba(200,170,90,0.7)'; ctx.lineWidth = 0.6 * u; ctx.stroke(); }
        const gx = px + 12 * u * (s.x < tb.x ? 1 : -1); ctx.save(); ctx.translate(gx, py - 2 * u); ctx.scale(1.3 * u, 1.3 * u); Items.wine(S.red ? '#7a1020' : '#e8d890', S.wine ? 0.6 : 0)(ctx, 0, 0); ctx.restore();
        ctx.fillStyle = '#d8dce0'; ctx.fillRect(px - 15 * u, py, 1 * u, 7 * u); ctx.fillRect(px + 14 * u, py, 1 * u, 7 * u); } });
      if (S.sommJob && S.wine) { ctx.save(); ctx.translate(tb.x + rx * 0.55, tb.y - 2 * u); ctx.fillStyle = linear(ctx, -7 * u, 0, 7 * u, 0, [[0, '#8a949e'], [0.5, '#f4f8fc'], [1, '#7a848e']]); ctx.beginPath(); ctx.moveTo(-6 * u, -14 * u); ctx.lineTo(6 * u, -14 * u); ctx.lineTo(5 * u, 0); ctx.lineTo(-5 * u, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = S.red ? '#1a1a1a' : '#1a3a1a'; ctx.fillRect(-1.6 * u, -26 * u, 3.2 * u, 14 * u); ctx.restore(); } // ice bucket
      if (tb.state === 'bill') { ctx.fillStyle = '#1a1208'; ctx.fillRect(tb.x - 9 * u, tb.y + 4 * u, 18 * u, 5 * u); ctx.fillStyle = '#c8a050'; ctx.fillRect(tb.x - 2 * u, tb.y + 5.5 * u, 4 * u, 2 * u); }
      if (S.revealT !== undefined && S.revealT < 1.4) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,240,200,${0.3 * (1 - S.revealT / 1.4)})`; ellipse(ctx, tb.x, tb.y - 10 * u, rx, ry * 2); ctx.fill(); ctx.restore(); }
    },
    floorProps(V, t) {
      const u = V.u, X = V.X, out = [];
      out.push({ y: V.Y(0.925), f: () => { const ctx = V.ctx, px = X(0.255), py = V.Y(0.925); ctx.fillStyle = linear(ctx, px - 22 * u, 0, px + 22 * u, 0, [[0, '#1a1008'], [0.5, '#4a3018'], [1, '#1a1008']]); ctx.fillRect(px - 22 * u, py - 64 * u, 44 * u, 64 * u); ctx.fillStyle = '#c8a050'; ctx.fillRect(px - 24 * u, py - 66 * u, 48 * u, 3 * u); ctx.fillStyle = '#f4ecd8'; ctx.fillRect(px - 12 * u, py - 72 * u, 18 * u, 6 * u); ctx.fillStyle = '#ffd890'; ellipse(ctx, px + 14 * u, py - 72 * u, 3 * u, 3 * u); ctx.fill(); ctx.fillStyle = '#c8a050'; ctx.font = `italic ${9 * u}px Georgia, serif`; ctx.textAlign = 'center'; ctx.fillText('The Fish House', px, py - 36 * u); } });
      const pn = V.S.pianist; if (pn) out.push({ y: pn.y - 2, f: () => grandPiano(V.ctx, pn, V, t) });
      V.staff.filter((s) => s.seat && s.seat.legs === 'chair' && s !== pn).forEach((s) => out.push({ y: s.y - 2, f: () => musicChair(V.ctx, s, V) }));
      const fx = V.S.flambe; if (fx) out.push({ y: V.lane() - 1, f: () => { const u = V.sc * 0.95, ctx = V.ctx, cx = fx.x, cy = V.lane() - 6 * u; // guéridon with a copper crêpe pan
        ctx.fillStyle = '#d8d4cc'; ctx.fillRect(cx - 26 * u, cy - 70 * u, 52 * u, 4 * u); ctx.fillStyle = '#f8f6f0'; ctx.fillRect(cx - 26 * u, cy - 66 * u, 52 * u, 20 * u); ctx.strokeStyle = '#8a949e'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(cx - 22 * u, cy - 46 * u); ctx.lineTo(cx - 22 * u, cy); ctx.moveTo(cx + 22 * u, cy - 46 * u); ctx.lineTo(cx + 22 * u, cy); ctx.stroke(); ctx.fillStyle = '#2a2a2a'; ellipse(ctx, cx - 22 * u, cy, 3 * u, 3 * u); ctx.fill(); ellipse(ctx, cx + 22 * u, cy, 3 * u, 3 * u); ctx.fill();
        ctx.fillStyle = '#b8642a'; ellipse(ctx, cx, cy - 74 * u, 16 * u, 4 * u); ctx.fill(); ctx.fillStyle = '#e8a040'; ellipse(ctx, cx, cy - 75 * u, 12 * u, 2.6 * u); ctx.fill(); ctx.fillStyle = '#3a3a3a'; ctx.fillRect(cx + 15 * u, cy - 75 * u, 18 * u, 2 * u); ctx.fillStyle = '#2a4aa0'; ellipse(ctx, cx - 18 * u, cy - 70 * u, 6 * u, 2 * u); ctx.fill(); // spirit-lamp flame
        if (fx.lit && t - 0 > 0 && fx.t - fx.lit < 3.5) { const a = 1 - (fx.t - fx.lit) / 3.5; ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let q = 0; q < 9; q++) { const h = (40 + Math.sin(t * 19 + q) * 14) * u * a; ctx.fillStyle = `rgba(${q % 3 ? 255 : 110},${120 + q * 14},${q % 3 ? 40 : 255},${0.3 * a})`; ellipse(ctx, cx + Math.sin(t * 13 + q * 2) * 8 * u, cy - 76 * u - h / 2, 8 * u, h / 2); ctx.fill(); } ctx.fillStyle = radial(ctx, cx, cy - 100 * u, 140 * u, [[0, `rgba(255,170,80,${0.35 * a})`], [1, 'rgba(255,140,60,0)']]); ctx.fillRect(cx - 140 * u, cy - 240 * u, 280 * u, 280 * u); ctx.restore(); } } });
      return out;
    },
    post(ctx, t, dt, V) {
      const u = V.u;
      if (V.S.fwFlash > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(200,180,255,${V.S.fwFlash * 0.08})`; ctx.fillRect(0, 0, V.W, V.H); ctx.restore(); V.S.fwFlash = 0; }
      const bubble = (x, y, txt, a) => { ctx.save(); ctx.globalAlpha = a; ctx.font = `italic ${15 * u}px Georgia, serif`; const w = ctx.measureText(txt).width + 18 * u; ctx.fillStyle = 'rgba(255,252,244,0.95)'; roundRect(ctx, x - w / 2, y - 14 * u, w, 24 * u, 9 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 5 * u, y + 9 * u); ctx.lineTo(x + 2 * u, y + 17 * u); ctx.lineTo(x + 6 * u, y + 9 * u); ctx.fill(); ctx.fillStyle = '#1a2a3a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 2 * u); ctx.restore(); };
      V.staff.concat(V.agents).forEach((s) => { if (s.say && s.say.t > 0) { s.say.t -= dt; const top = s.sitting ? s.y - 30 * V.sc : s.y - 122 * V.sc * (s.spec && s.spec.k || 1); bubble(s.x, top - 30 * u, s.say.txt, Math.min(1, s.say.t * 2)); } });
      (V.S.hearts || []).forEach((h) => { h.t += dt; h.y -= 30 * u * dt; const a = Math.max(0, 1 - h.t / 3); ctx.fillStyle = `rgba(230,40,80,${a})`; ctx.beginPath(); const s = 5 * u; ctx.moveTo(h.x, h.y + s); ctx.bezierCurveTo(h.x - s * 2, h.y - s * 0.5, h.x - s * 0.6, h.y - s * 1.8, h.x, h.y - s * 0.6); ctx.bezierCurveTo(h.x + s * 0.6, h.y - s * 1.8, h.x + s * 2, h.y - s * 0.5, h.x, h.y + s); ctx.fill(); });
      if (V.S.hearts) V.S.hearts = V.S.hearts.filter((h) => h.t < 3);
    },
    events(V) {
      const freeWaiter = () => [V.S.w1, V.S.w2].find((w) => !w.job && !w.busy);
      return [
        { at: 0.14, name: 'inspector', dur: 90, start() { const p = V.party(1, { looks: [{ age: 'adult', female: Math.random() < 0.5 }] }); const a = p.members[0]; a.critic = true; V.S.critic = a; V.S.maitre.say = { txt: 'The inspector is here…', t: 3 }; }, end() { V.S.critic = null; } },
        { at: 0.32, name: 'lobster', dur: 24, start() { V.S.lobReq = true; } },
        { at: 0.5, name: 'flambe', dur: 24, start() { V.S.flambeReq = true; } },
        { at: 0.66, name: 'proposal', dur: 26, start() { V.S.propReq = true; } },
        { at: 0.84, name: 'fireworks', dur: 22, start() { for (const k in this) if (/^b\d/.test(k)) delete this[k]; SFX('pop'); } },
      ];
    },
    afterSetup(V) { V.S.hearts = []; },
    onClear(e, V) {
      V.tables.forEach((tb) => { if (tb.state === 'eating') V.burst(tb.x, tb.y - 30 * V.u, e.big ? 10 : 4, () => pick(['#ffffff', '#e8f4ff', '#f4e8d0']), { kind: 'dot', up: 120, sp: 60, life: 1.4, sz: 1.6 }); });
      if (e.big) { V.agents.forEach((a) => { if (a.sitting && Math.random() < 0.5) a.toastT = 2.2; }); SFX('clink'); }
    },
  };
  // scripted scenes that borrow an idle waiter (lobster, flambé) or a diner (proposal)
  const baseTick = cfg.tick;
  cfg.tick = function (V, dt, t) {
    baseTick(V, dt, t);
    const md = V.S.maitre, idle = md && !md.busy ? md : null;
    if (V.S.lobReq && idle) { V.S.lobReq = false; const w = idle; w.busy = true; const tb = V.tables.find((x) => x.state === 'eating' || x.state === 'waiting') || V.tables[1];
      Crowd.hijack(w, (function* () {
        w.act = 'walk'; yield ['walk', V.X(0.77), V.lane()]; w.act = 'reach'; w.actT = 0; yield ['wait', 1.4]; SFX('pop'); V.burst(V.X(0.77), V.Y(0.33), 8, '#a8d8ff', { kind: 'drop', up: 100, sp: 50 });
        w.carry = (c) => lobsterItem(Math.sin(V.t * 6))(c, 0, 24); yield ['walk', tb.x + 100 * V.u, V.lane()]; w.face = -1; w.look = tb.x;
        w.carry = null; w.act = 'showLob'; w.actT = 0; if (tb.party) tb.party.members.forEach((m) => { m.awe = 3; }); yield ['wait', 3];
        w.carry = (c) => lobsterItem(Math.sin(V.t * 6))(c, 0, 24); yield ['walk', V.X(0.86), V.lane()]; w.carry = null; w.act = 'hand'; w.actT = 0; yield ['wait', 0.8]; w.act = 'walk'; yield ['walk', w.home[0], w.home[1]]; w.face = 1; w.busy = false;
      })()); }
    if (V.S.flambeReq && idle) { V.S.flambeReq = false; const w = idle; w.busy = true; const tb = V.tables.find((x) => x.state === 'eating') || V.tables[0];
      V.S.flambe = { x: V.X(0.86), t: 0, lit: 0 };
      Crowd.hijack(w, (function* () {
        w.act = 'walk'; yield ['walk', V.X(0.86) + 52 * V.u, V.lane()];
        const tx = tb.x + 150 * V.u; while (Math.abs(V.S.flambe.x - tx) > 3) { V.S.flambe.x += Math.sign(tx - V.S.flambe.x) * Math.min(Math.abs(tx - V.S.flambe.x), 60 * V.u * 0.1); w.x = V.S.flambe.x + 52 * V.u; w.face = -1; w.act = 'walk'; w.phase += 0.6; yield ['wait', 0.1]; }
        w.act = 'pourCognac'; w.actT = 0; yield ['wait', 1.4]; V.S.flambe.lit = V.S.flambe.t; SFX('whoosh'); if (tb.party) tb.party.members.forEach((m) => { m.awe = 3.4; }); V.agents.forEach((a) => { if (a.sitting && Math.random() < 0.5) a.awe = 2; });
        w.act = 'flambe'; w.actT = 0; yield ['wait', 3.6]; if (tb.party) tb.party.members.forEach((m) => { m.cheer = 1.4; }); SFX('cheer');
        w.act = 'serve'; w.actT = 0; yield ['wait', 1.2];
        while (Math.abs(V.S.flambe.x - V.X(0.9)) > 3) { V.S.flambe.x += Math.min(Math.abs(V.X(0.9) - V.S.flambe.x), 70 * V.u * 0.1); w.x = V.S.flambe.x - 52 * V.u; w.face = 1; w.act = 'walk'; w.phase += 0.6; yield ['wait', 0.1]; }
        V.S.flambe = null; w.act = 'walk'; yield ['walk', w.home[0], w.home[1]]; w.face = 1; w.busy = false;
      })()); }
    if (V.S.propReq) { const tb = V.tables.find((x) => x.state === 'eating' && x.party && x.party.size >= 2);
      if (tb) { V.S.propReq = false; const [a, b] = tb.party.members; const seat = a.seat;
        Crowd.hijack(a, (function* () {
          a.sitting = false; a.y = V.lane() - 20 * V.u; a.act = 'walk'; yield ['walk', b.x + (b.x < tb.x ? -1 : 1) * 30 * V.u, V.lane() - 20 * V.u]; a.face = b.x < a.x ? -1 : 1;
          a.kneel = true; a.act = 'stand'; a.y += 26 * V.sc; SFX('gong'); yield ['wait', 1.2]; b.gaspT = 2.6; a.say = { txt: 'Will you marry me?', t: 2.6 }; yield ['wait', 2.8];
          b.say = { txt: 'Yes!', t: 2.4 }; b.cheer = 2; SFX('cheer'); for (let i = 0; i < 14; i++) V.S.hearts.push({ x: b.x + rand(-40, 40) * V.u, y: b.y - rand(0, 40) * V.u, t: -i * 0.12 });
          V.agents.forEach((m) => { if (m !== a && m !== b && Math.random() < 0.8) { m.act = 'clap'; m.actT = 0; } }); V.staff.forEach((s) => { if (s.floor !== false && Math.random() < 0.5) s.cheer = 1.6; });
          yield ['wait', 2.4]; a.kneel = false; a.y -= 26 * V.sc; a.act = 'walk'; yield ['walk', seat.x, V.lane() - 20 * V.u]; a.sitting = true; a.x = seat.x; a.y = seat.y; a.act = 'stand';
          tb.S.red = false; tb.S.wine = 1; party_toast(tb); SFX('pop');
        })()); } }
  };
  function party_toast(tb) { if (tb.party) tb.party.members.forEach((m) => { m.toastT = 2.4; }); }
  const basePose = cfg.pose;
  cfg.pose = function (s, ps, t, V) {
    const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
    if (s.act === 'reach') { const up = Math.sin(Math.min(1, k / 1.4) * Math.PI); ps.arms = [A(-1, 6, 10 - up * 20, { grip: 'open' }), A(1, 12, 4 - up * 16, { grip: 'open' })]; ps.head.nod = -1; ps.face.mouth = 'o'; return; }
    if (s.act === 'showLob') { const up = Math.min(1, k * 2); ps.arms = [A(-1, -4, 30 - up * 26), A(1, 16, 24 - up * 30, { item: lobsterItem(Math.sin(t * 6)) })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return; }
    if (s.act === 'pourCognac') { const p = Math.min(1, k / 0.6); ps.arms = [A(-1, -24, 22, { grip: 'open' }), A(1, -20, 6 - p * 4, { item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.6 - p * 0.6); c.fillStyle = '#8a4a14'; roundRect(c, -2, -6, 6, 10, 2); c.fill(); c.fillStyle = '#e8c070'; c.fillRect(-1, -9, 3, 3); c.restore(); } })]; ps.lean = -0.05; ps.face.lookY = 1; return; }
    if (s.act === 'flambe') { const sw = Math.sin(k * 5); ps.arms = [A(-1, -26 + sw * 4, 14, { grip: 'fist', item: (c, x, y) => { c.fillStyle = '#d8d8d0'; c.fillRect(x - 1, y - 1, 10, 1.6); ellipse(c, x + 10, y, 2.4, 1.4); c.fill(); } }), A(1, -14, 22, { grip: 'open' })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return; }
    return basePose(s, ps, t, V);
  };
  defineWorld({ id: 'fishhouse', thumbY: 0.45 }, makeVenue(cfg));
})();
