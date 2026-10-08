/* ================= World 8: Trattoria da Nonna Rosa (wood-fired pizza & handmade pasta) =================
   A glowing mosaic-tiled dome oven where the pizzaiolo stretches, spins and tosses dough, ladles San Marzano
   sauce, tears fior di latte and slides pies in on a long peel; you can see them blister in the fire.
   On the right, the pasta cook flips pans that flare, a pot steams, and Nonna rolls and cuts tagliatelle on a
   floured board. Chianti fiaschi line the wine rack; garlic braids, peppers and a prosciutto leg hang above.
   Through the arched window: a piazza with a bell tower, laundry lines, a fountain, and Vespas that buzz past.
   Tables have red gingham cloths, candle-in-a-fiasco with wax drips, bread baskets and olive oil.
   Events: dough-toss show, a strolling accordion serenade, pasta finished in a giant Parmigiano wheel flamed with
   grappa, a football goal on the corner TV (the room erupts "GOOOL!"), Nonna bringing tiramisù ("Mangia!"). */
(() => {
  const SFX = (k) => { try { if (AudioEngine.sfx.ev) AudioEngine.sfx.ev(k); } catch (e) {} };
  const DISHES = {
    margherita: { name: 'Margherita', pizza: true, top: '#c8281e', cheese: '#fff4dc', leaf: true },
    diavola: { name: 'Diavola', pizza: true, top: '#b8200e', cheese: '#fff0d0', salami: true },
    capricciosa: { name: 'Capricciosa', pizza: true, top: '#c03020', cheese: '#fff0d0', mush: true, olive: true },
    carbonara: { name: 'Carbonara', pasta: '#f4d880', sauce: '#f8e8a8', pepper: true, guanciale: true },
    pomodoro: { name: 'Spaghetti al pomodoro', pasta: '#f0c870', sauce: '#d8301a', leaf: true },
    vongole: { name: 'Linguine alle vongole', pasta: '#f0d890', sauce: '#f4ecd0', clams: true, parsley: true },
    lasagne: { name: 'Lasagne', lasagne: true },
  };
  const PIZZAS = ['margherita', 'diavola', 'capricciosa'], PASTAS = ['carbonara', 'pomodoro', 'vongole', 'lasagne'];
  /* ---------- food on the table (world px, s = scale) ---------- */
  function pizzaArt(c, x, y, s, d, left, t, slices = 8) {
    c.fillStyle = '#6a4a2a'; ellipse(c, x, y + 1.6 * s, 17 * s, 5 * s); c.fill(); // wooden board
    c.fillStyle = '#b88a4a'; ellipse(c, x, y, 17 * s, 4.6 * s); c.fill();
    const n = Math.round(left * slices); if (n <= 0) { c.fillStyle = 'rgba(200,120,40,0.6)'; for (let k = 0; k < 6; k++) { ellipse(c, x + Math.sin(k * 3) * 9 * s, y + Math.cos(k * 2) * 2 * s, 0.8 * s, 0.6 * s); c.fill(); } return; }
    c.save(); c.translate(x, y - 0.6 * s); c.scale(1, 0.3);
    for (let k = 0; k < n; k++) { const a0 = k / slices * TAU - Math.PI / 2, a1 = (k + 1) / slices * TAU - Math.PI / 2;
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 15 * s, a0, a1); c.closePath(); c.fillStyle = '#e0a050'; c.fill();
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 12.6 * s, a0 + 0.02, a1 - 0.02); c.closePath(); c.fillStyle = DISHES[d].top; c.fill();
      const am = (a0 + a1) / 2;
      for (let q = 0; q < 2; q++) { const r = (4 + q * 5) * s; c.fillStyle = DISHES[d].cheese; ellipse(c, Math.cos(am + q * 0.2) * r, Math.sin(am + q * 0.2) * r, 2.6 * s, 2.4 * s); c.fill(); }
      if (DISHES[d].salami) { c.fillStyle = '#9a1a12'; ellipse(c, Math.cos(am) * 8 * s, Math.sin(am) * 8 * s, 2.2 * s, 2.2 * s); c.fill(); }
      if (DISHES[d].leaf && k % 2) { c.fillStyle = '#2a8a2a'; ellipse(c, Math.cos(am) * 7 * s, Math.sin(am) * 7 * s, 2 * s, 1.2 * s, am); c.fill(); }
      if (DISHES[d].mush) { c.fillStyle = '#c8b8a0'; ellipse(c, Math.cos(am - 0.15) * 10 * s, Math.sin(am - 0.15) * 10 * s, 1.6 * s, 1.2 * s); c.fill(); }
      if (DISHES[d].olive) { c.fillStyle = '#1a1a1a'; ellipse(c, Math.cos(am + 0.2) * 6 * s, Math.sin(am + 0.2) * 6 * s, 1 * s, 1 * s); c.fill(); }
      c.fillStyle = 'rgba(40,20,0,0.55)'; for (let q = 0; q < 2; q++) { const aa = a0 + (q + 0.5) * (a1 - a0) / 2; ellipse(c, Math.cos(aa) * 14 * s, Math.sin(aa) * 14 * s, 1.1 * s, 1.1 * s); c.fill(); } // leopard spotting on the cornicione
    }
    c.restore();
    if (Math.sin(t * 2 + x) > 0.6) { c.fillStyle = 'rgba(255,255,255,0.12)'; ellipse(c, x + Math.sin(t) * 4 * s, y - 8 * s - (t * 8 % 6) * s, 3 * s, 2 * s); c.fill(); }
  }
  function pastaArt(c, x, y, s, d, left, t) {
    const D = DISHES[d];
    c.fillStyle = 'rgba(0,0,0,0.2)'; ellipse(c, x, y + 1.4 * s, 13 * s, 4 * s); c.fill();
    c.fillStyle = radial(c, x - 3 * s, y - 1 * s, 13 * s, [[0, '#ffffff'], [0.8, '#f0ece4'], [1, '#c8c0b4']]); ellipse(c, x, y, 13 * s, 4 * s); c.fill();
    c.strokeStyle = '#1a4a8a'; c.lineWidth = 0.5 * s; ellipse(c, x, y, 11.6 * s, 3.4 * s); c.stroke(); // blue-rimmed ceramic
    if (left <= 0.02) { c.strokeStyle = rgba(D.sauce || '#c83a1a', 0.6); c.lineWidth = 0.8 * s; c.beginPath(); c.arc(x, y, 4 * s, 0.4, 2.6); c.stroke(); return; }
    const r = (4 + left * 5) * s;
    if (D.lasagne) { c.fillStyle = '#d87a2a'; roundRect(c, x - r, y - 4 * s, r * 2, 4 * s, 1 * s); c.fill(); for (let q = 0; q < 3; q++) { c.fillStyle = q % 2 ? '#f4e0b0' : '#b8301a'; c.fillRect(x - r, y - 3.4 * s + q * 1.1 * s, r * 2, 0.6 * s); } c.fillStyle = '#f0b040'; ellipse(c, x, y - 4 * s, r, 1.2 * s); c.fill(); c.fillStyle = 'rgba(90,40,0,0.5)'; ellipse(c, x - r * 0.4, y - 4.2 * s, 1.4 * s, 0.6 * s); c.fill(); return; }
    c.fillStyle = D.pasta; ellipse(c, x, y - 1.6 * s, r, r * 0.42); c.fill();
    c.strokeStyle = shade(D.pasta, -0.18); c.lineWidth = 0.5 * s; for (let q = 0; q < 6; q++) { c.beginPath(); c.ellipse(x, y - 1.6 * s - q * 0.2 * s, r * (0.3 + q * 0.12), r * 0.14 * (1 + q * 0.2), q, 0, Math.PI * 1.6); c.stroke(); }
    c.fillStyle = D.sauce; ellipse(c, x, y - 2.6 * s, r * 0.5, r * 0.2); c.fill();
    if (D.guanciale) { c.fillStyle = '#c86a4a'; for (let q = 0; q < 5; q++) { c.fillRect(x - r * 0.6 + q * r * 0.28, y - 2.4 * s - (q % 2) * s, 1.4 * s, 0.9 * s); } }
    if (D.pepper) { c.fillStyle = '#2a2a2a'; for (let q = 0; q < 10; q++) c.fillRect(x + Math.sin(q * 7) * r * 0.6, y - 2 * s + Math.cos(q * 3) * r * 0.2, 0.4 * s, 0.4 * s); }
    if (D.clams) { for (let q = 0; q < 4; q++) { const cx = x + (q - 1.5) * r * 0.45; c.fillStyle = '#e8dcc8'; ellipse(c, cx, y - 2 * s - (q % 2) * s, 1.8 * s, 1.1 * s); c.fill(); c.fillStyle = '#f0c8a0'; ellipse(c, cx, y - 2.2 * s - (q % 2) * s, 0.9 * s, 0.5 * s); c.fill(); } }
    if (D.leaf) { c.fillStyle = '#2a8a2a'; ellipse(c, x + 1 * s, y - 3.2 * s, 1.8 * s, 1 * s, 0.4); c.fill(); }
    if (D.parsley) { c.fillStyle = '#3a8a2a'; for (let q = 0; q < 6; q++) c.fillRect(x + Math.sin(q * 5) * r * 0.5, y - 2.4 * s + Math.cos(q * 4) * r * 0.15, 0.6 * s, 0.6 * s); }
    c.fillStyle = 'rgba(255,255,255,0.35)'; ellipse(c, x - r * 0.3, y - 2.6 * s, r * 0.2, 0.5 * s); c.fill();
  }
  function dishArt(c, d, x, y, s, t) { if (!d) return; if (DISHES[d.kind].pizza) pizzaArt(c, x, y, s, d.kind, d.left, t); else pastaArt(c, x, y, s, d.kind, d.left, t); }
  /* ---------- props ---------- */
  const doughItem = (spin, r = 7) => (c, x, y) => { c.save(); c.translate(x, y - 2); c.scale(1, 0.32); c.fillStyle = radial(c, -2, -2, r * 1.3, [[0, '#fbf2dc'], [0.8, '#efdcb0'], [1, '#d8b880']]); ellipse(c, 0, 0, r, r); c.fill(); c.strokeStyle = 'rgba(160,120,60,0.4)'; c.lineWidth = 0.8; c.beginPath(); c.arc(0, 0, r * 0.7, spin, spin + 2); c.stroke(); c.restore(); };
  const peelItem = (pz) => (c, x, y) => { c.save(); c.translate(x, y); c.fillStyle = '#c8a070'; c.fillRect(0, -0.8, 36, 1.6); c.fillStyle = '#d8dce0'; c.beginPath(); c.moveTo(34, -1); c.lineTo(48, -4); c.lineTo(48, 4); c.lineTo(34, 1); c.fill(); if (pz) { c.fillStyle = '#e0a050'; ellipse(c, 42, -1.6, 7, 1.8); c.fill(); c.fillStyle = '#c8281e'; ellipse(c, 42, -2, 5.6, 1.3); c.fill(); c.fillStyle = '#fff4dc'; ellipse(c, 41, -2.4, 2, 0.8); c.fill(); } c.restore(); };
  const ladleItem = (c, x, y) => { c.save(); c.translate(x, y); c.strokeStyle = '#c8ccd0'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, 0); c.lineTo(8, 6); c.stroke(); c.fillStyle = '#c8ccd0'; ellipse(c, 9, 7, 3, 1.6); c.fill(); c.fillStyle = '#c8281e'; ellipse(c, 9, 6.6, 2.4, 1); c.fill(); c.restore(); };
  const panItem = (f) => (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.2 - f * 0.3); c.fillStyle = '#2a2a2a'; c.fillRect(0, -1, 10, 2); ellipse(c, 16, 0, 7, 2.2); c.fill(); c.fillStyle = '#d8301a'; ellipse(c, 16, -1 - f * 6, 3.4, 1); c.fill(); c.fillStyle = '#f0c870'; ellipse(c, 17, -1.6 - f * 7, 2, 0.6); c.fill(); c.restore(); };
  const accordionArt = (squeeze, t) => (c) => { c.save(); c.translate(0, 34); const w = 13 + squeeze * 7; c.fillStyle = '#b8141a'; roundRect(c, -w - 5, -12, 8, 26, 2); c.fill(); roundRect(c, w - 3, -12, 8, 26, 2); c.fill(); c.fillStyle = '#f4f0e6'; for (let k = 0; k < 5; k++) c.fillRect(-w - 4, -10 + k * 5, 6, 2.4); c.fillStyle = '#f4f0e6'; for (let k = 0; k < 7; k++) { ellipse(c, w + 1, -9 + k * 3.6, 1, 1); c.fill(); }
    for (let k = 0; k < 8; k++) { const xx = -w + 3 + k * (2 * w - 6) / 7; c.fillStyle = k % 2 ? '#1a1a1a' : '#e8e0d0'; c.fillRect(xx - 0.8, -12, 1.6, 26); } c.fillStyle = '#c8a050'; c.fillRect(-w + 3, -13, 2 * w - 6, 1.2); c.fillRect(-w + 3, 13.6, 2 * w - 6, 1.2); c.restore(); };
  const grappaItem = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.9); c.fillStyle = 'rgba(240,240,230,0.7)'; roundRect(c, -2, -9, 5, 12, 1.4); c.fill(); c.fillStyle = 'rgba(255,250,220,0.6)'; c.fillRect(-1.4, -4, 3.6, 6); c.fillStyle = '#2a2a2a'; c.fillRect(-0.6, -12, 2, 3); c.restore(); };
  const tiramisuTray = (c) => { c.save(); c.translate(0, 28); c.fillStyle = '#c8ccd0'; roundRect(c, -16, -1, 32, 3, 1); c.fill(); for (let k = 0; k < 3; k++) { const x = -10 + k * 10; c.fillStyle = 'rgba(240,240,240,0.6)'; c.fillRect(x - 3.4, -9, 6.8, 8); c.fillStyle = '#f4ead4'; c.fillRect(x - 3, -7, 6, 2); c.fillStyle = '#8a5a2a'; c.fillRect(x - 3, -5, 6, 1.6); c.fillStyle = '#f4ead4'; c.fillRect(x - 3, -3.4, 6, 2); c.fillStyle = '#5a3a1a'; c.fillRect(x - 3, -8, 6, 1); } c.restore(); };
  function pinch(side, x, y, bob) { return { side, x, y: y - bob, grip: 'point', handAng: -1.4 }; }
  /* ---------- piazza through the arched window ---------- */
  const piazzaCache = {};
  function piazza(c, x, y, w, h, lights, V) {
    const u = V.u, t = V.t, key = `${w | 0}x${h | 0}x${V.D}:${Math.round(lights * 4)}`, gy = y + h * 0.86;
    if (!piazzaCache[key]) { for (const k in piazzaCache) delete piazzaCache[k]; const [cv, cx] = hiCanvas(w, h, V.D); cx.translate(-x, -y); const rnd = mulberry32(41);
      // campanile
      const bx = x + w * 0.66; cx.fillStyle = '#c89a6a'; cx.fillRect(bx, y + h * 0.08, w * 0.11, gy - y - h * 0.08); cx.fillStyle = '#a87a4a'; cx.beginPath(); cx.moveTo(bx - 2 * u, y + h * 0.08); cx.lineTo(bx + w * 0.055, y + h * -0.02); cx.lineTo(bx + w * 0.11 + 2 * u, y + h * 0.08); cx.fill();
      cx.fillStyle = '#3a2a1a'; [0.12, 0.3].forEach((f) => { cx.beginPath(); cx.arc(bx + w * 0.055, y + h * (f + 0.04), w * 0.03, Math.PI, 0); cx.lineTo(bx + w * 0.085, y + h * (f + 0.1)); cx.lineTo(bx + w * 0.025, y + h * (f + 0.1)); cx.fill(); });
      cx.fillStyle = '#f4ecd8'; ellipse(cx, bx + w * 0.055, y + h * 0.52, w * 0.025, w * 0.025); cx.fill(); cx.strokeStyle = '#2a2a2a'; cx.lineWidth = 1 * u; cx.beginPath(); cx.moveTo(bx + w * 0.055, y + h * 0.52); cx.lineTo(bx + w * 0.055, y + h * 0.5); cx.moveTo(bx + w * 0.055, y + h * 0.52); cx.lineTo(bx + w * 0.068, y + h * 0.52); cx.stroke();
      // houses in ochre, terracotta and rose with green shutters
      const cols = ['#e8b060', '#d87848', '#e8a088', '#f0d090', '#c86a3a'];
      [[0, 0.3, 0.2], [0.18, 0.2, 0.22], [0.36, 0.36, 0.28], [0.8, 0.22, 0.22]].forEach(([fx, top, fw], i) => { const hx = x + w * fx, hy = y + h * top, hw = w * fw; cx.fillStyle = cols[i % 5]; cx.fillRect(hx, hy, hw, gy - hy); cx.fillStyle = '#a84a2a'; cx.fillRect(hx - 2 * u, hy - 4 * u, hw + 4 * u, 4 * u);
        for (let r = 0; r < 4; r++) for (let q = 0; q < Math.floor(hw / (24 * u)); q++) { const wx = hx + 8 * u + q * 24 * u, wy = hy + 10 * u + r * 26 * u; if (wy > gy - 30 * u) continue; const lit = lights > 0.3 && rnd() < 0.6; cx.fillStyle = lit ? '#ffd890' : '#4a3a2a'; cx.fillRect(wx, wy, 8 * u, 13 * u); cx.fillStyle = '#3a6a3a'; cx.fillRect(wx - 4 * u, wy, 3.4 * u, 13 * u); cx.fillRect(wx + 8.6 * u, wy, 3.4 * u, 13 * u); if (rnd() < 0.4) { cx.fillStyle = '#c8282a'; for (let f = 0; f < 4; f++) { ellipse(cx, wx + f * 2.6 * u, wy + 14 * u, 1.4 * u, 1.4 * u); cx.fill(); } cx.fillStyle = '#3a8a2a'; cx.fillRect(wx - 1 * u, wy + 14 * u, 10 * u, 2 * u); } } });
      // laundry line between the houses
      cx.strokeStyle = 'rgba(40,30,20,0.7)'; cx.lineWidth = 0.6 * u; cx.beginPath(); cx.moveTo(x + w * 0.18, y + h * 0.36); cx.quadraticCurveTo(x + w * 0.28, y + h * 0.42, x + w * 0.38, y + h * 0.4); cx.stroke();
      // cobbles + fountain
      cx.fillStyle = '#8a7a6a'; cx.fillRect(x, gy, w, y + h - gy); cx.strokeStyle = 'rgba(40,30,20,0.3)'; for (let r = 0; r < 4; r++) for (let q = 0; q < 30; q++) { cx.beginPath(); cx.arc(x + q * w / 30 + (r % 2) * 6 * u, gy + 3 * u + r * 5 * u, 3 * u, Math.PI, 0); cx.stroke(); }
      const fx0 = x + w * 0.45; cx.fillStyle = '#d8d0c0'; cx.fillRect(fx0 - 26 * u, gy - 8 * u, 52 * u, 10 * u); cx.fillRect(fx0 - 3 * u, gy - 26 * u, 6 * u, 18 * u); ellipse(cx, fx0, gy - 26 * u, 12 * u, 3 * u); cx.fill();
      piazzaCache[key] = cv; }
    c.drawImage(piazzaCache[key], x, y, w, h);
    // laundry swaying
    ['#f4f4f0', '#6a9ad8', '#e8c040', '#f4f4f0', '#e86a6a'].forEach((col, i) => { const lx = x + w * (0.2 + i * 0.035), ly = y + h * (0.37 + Math.sin(i / 4 * Math.PI) * 0.035), sw = Math.sin(t * 2 + i) * 1.4 * u; c.fillStyle = col; c.beginPath(); c.moveTo(lx, ly); c.lineTo(lx + 7 * u, ly); c.lineTo(lx + 7 * u + sw, ly + 10 * u); c.lineTo(lx + sw, ly + 10 * u); c.fill(); });
    // fountain water
    const fx0 = x + w * 0.45; c.strokeStyle = 'rgba(200,230,255,0.7)'; c.lineWidth = 1 * u; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(fx0, gy - 28 * u); c.quadraticCurveTo(fx0 + k * 8 * u, gy - 38 * u, fx0 + k * 12 * u, gy - 8 * u); c.stroke(); }
    // string lights across the piazza at night
    if (lights > 0.3) { for (let k = 0; k < 16; k++) { const lx = x + k * w / 15, ly = y + h * 0.18 + Math.sin(k / 15 * Math.PI) * h * 0.08; c.fillStyle = `rgba(255,220,140,${lights * (0.7 + 0.3 * Math.sin(t * 3 + k))})`; ellipse(c, lx, ly, 2 * u, 2 * u); c.fill(); } }
    // Vespas buzz by (one with a pizza box on the back) + pigeons on the cobbles
    for (let k = 0; k < 2; k++) { const per = 9 + k * 5, ph = ((t + k * 4) % per) / per, dir = k ? -1 : 1, vx = dir > 0 ? x - 40 * u + ph * (w + 80 * u) : x + w + 40 * u - ph * (w + 80 * u), vy = gy + 12 * u + k * 4 * u, col = k ? '#7ac8c0' : '#d8281e';
      c.save(); c.translate(vx, vy); c.scale(dir * u * 1.1, u * 1.1); c.fillStyle = '#1a1a1a'; ellipse(c, -10, 0, 4, 4); c.fill(); ellipse(c, 11, 0, 4, 4); c.fill(); c.fillStyle = col; c.beginPath(); c.moveTo(-15, -3); c.quadraticCurveTo(-14, -12, -4, -10); c.lineTo(2, -4); c.lineTo(8, -4); c.lineTo(10, -16); c.lineTo(13, -16); c.lineTo(14, -2); c.lineTo(-15, -1); c.fill(); c.fillStyle = '#2a2a2a'; c.fillRect(-10, -12, 9, 2);
      c.fillStyle = k ? '#f4e8d0' : '#3a3a6a'; roundRect(c, -8, -26, 8, 15, 3); c.fill(); c.fillStyle = '#e8b890'; ellipse(c, -4, -29, 3, 3.4); c.fill(); c.fillStyle = k ? '#d8281e' : '#f4f4f4'; c.beginPath(); c.arc(-4, -30, 3.6, Math.PI, 0); c.fill(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-3, -21); c.lineTo(11, -15); c.stroke();
      if (!k) { c.fillStyle = '#f4ecd8'; c.fillRect(-20, -9, 10, 4); c.fillStyle = '#c8281e'; c.fillRect(-18, -8, 6, 1); }
      c.restore(); }
    for (let k = 0; k < 3; k++) { const px = x + w * (0.3 + k * 0.08), py = gy + 14 * u, hop = Math.max(0, Math.sin(t * 3 + k * 2)) * 2 * u; c.fillStyle = '#7a7a8a'; ellipse(c, px, py - hop, 3 * u, 2 * u); c.fill(); ellipse(c, px + 2.6 * u, py - 2 * u - hop + Math.sin(t * 6 + k) * 0.6 * u, 1.4 * u, 1.4 * u); c.fill(); }
  }
  /* ---------- world ---------- */
  const dishFor = () => { const r = Math.random(); return { kind: r < 0.55 ? pick(PIZZAS) : pick(PASTAS), left: 1 }; };
  const cfg = {
    id: 'pizzeria', flow: 'table', seed: 8080, cap: 15, spawnEvery: 8, lane: 0.975, peopleScale: 1.6, cat: true, catCol: '#e8a050', catPath: [0.02, 0.2], birthday: false, initial: 3,
    vignette: 'rgba(30,10,0,0.55)', passX: 0.26, wetSignX: 0.62,
    lights: [{ x: 0.11, y: 0.36, r: 230, col: '#ff7a2a', a: 0.32, flicker: 1 }, { x: 0.36, y: 0.78, r: 110, col: '#ffb860', a: 0.22, flicker: 1 }, { x: 0.555, y: 0.78, r: 110, col: '#ffb860', a: 0.22, flicker: 1 }, { x: 0.765, y: 0.78, r: 110, col: '#ffb860', a: 0.22, flicker: 1 }, { x: 0.86, y: 0.36, r: 180, col: '#ffc070', a: 0.18 }],
    windows: [{ x: 0.36, y: 0.12, w: 0.24, h: 0.36, city: piazza, frame(c, V) { const u = V.u, x0 = V.X(0.36), y0 = V.Y(0.12), w = V.X(0.24), h = V.Y(0.36), r = w / 2;
      // arch mask: paint the wall back over the corners above the arch, then the stone surround
      c.save(); c.beginPath(); c.rect(x0 - 2, y0 - 2, w + 4, r + 2); c.moveTo(x0 + w, y0 + r); c.arc(x0 + r, y0 + r, r, 0, Math.PI, true); c.closePath(); c.fillStyle = '#d89a5a'; c.fill('evenodd'); c.restore();
      c.strokeStyle = '#e8d8b8'; c.lineWidth = 10 * u; c.beginPath(); c.moveTo(x0, y0 + h); c.lineTo(x0, y0 + r); c.arc(x0 + r, y0 + r, r, Math.PI, 0); c.lineTo(x0 + w, y0 + h); c.stroke();
      c.strokeStyle = '#3a5a3a'; c.lineWidth = 3 * u; c.beginPath(); c.moveTo(x0 + r, y0); c.lineTo(x0 + r, y0 + h); c.moveTo(x0, y0 + h * 0.55); c.lineTo(x0 + w, y0 + h * 0.55); c.stroke();
      c.fillStyle = '#e8d8b8'; c.fillRect(x0 - 10 * u, y0 + h, w + 20 * u, 8 * u); c.fillStyle = '#c8281e'; for (let k = 0; k < 7; k++) { ellipse(c, x0 + 10 * u + k * w / 7, y0 + h - 4 * u, 4 * u, 4 * u); c.fill(); } c.fillStyle = '#3a8a2a'; for (let k = 0; k < 14; k++) { ellipse(c, x0 + 4 * u + k * w / 14, y0 + h - 1 * u, 4 * u, 2.4 * u, k); c.fill(); } } }],
    look(rnd, V, opt) {
      const L = Looks.random(rnd, Object.assign({}, opt.look || {}));
      if (rnd() < 0.3) { L.top.type = Looks.pickR(rnd, ['sweater', 'cardigan', 'shirt']); L.top.col = Looks.pickR(rnd, ['#e8d8b8', '#7a2a2a', '#3a5a7a', '#5a7a3a', '#c8a050', '#e86a5a']); }
      return L;
    },
    spawn(V) { const r = Math.random(); V.party(r < 0.4 ? 2 : r < 0.7 ? 3 : 4); },
    queue(V) { return [0, 1, 2, 3, 4].map((i) => [V.X(0.2) - i * 36 * V.u, V.lane() - 4 * V.u, V.X(0.3)]); },
    setup(V) {
      [0.36, 0.555, 0.765].forEach((f) => V.addTable({ x: f, y: 0.8, rx: 78, ry: 22, neck: 46, seats: [[-1, 1], [-0.34, 1], [0.34, -1], [1, -1]] }));
      V.S.gino = V.addStaff({ role: 'waiter', floor: true, x: 0.66, feetY: 0.93, speed: 120, look: { skin: 'olive', hair: 'grey', hairStyle: 'bald', build: 1.25, acc: { mustache: true }, top: { type: 'vest', col: '#1a1a1a', shirt: '#f4f0e6', bow: '#8a1010' }, sleeves: 'rolled', pants: '#f4f0e6', shoe: '#1a1a1a' }, idle: [['stand', 2], ['towel', 2]] });
      V.S.chiara = V.addStaff({ role: 'waiter', floor: true, x: 0.47, feetY: 0.93, speed: 125, look: { female: true, lashes: true, skin: 'light', hair: 'dbrown', hairStyle: 'pony', top: { type: 'shirt', col: '#f4f0e6', skirt: { col: '#1a1a1a', len: 100 } }, sleeves: 'rolled', acc: { earrings: '#e8c050' } }, idle: [['stand', 2], ['notepad', 2]] });
      V.S.rosa = V.addStaff({ role: 'idle', floor: true, x: 0.26, feetY: 0.92, look: { female: true, skin: 'olive', hair: 'grey', hairStyle: 'bun', age: 'old', build: 1.2, top: { type: 'cardigan', col: '#7a1a2a', shirt: '#f4ecd8' }, sleeves: 'long', acc: { glasses: '#8a6a3a', earrings: '#e8c050' }, top2: true }, idle: [['stand', 2.4], ['welcome', 2], ['stand', 2]] });
      V.S.pizzaiolo = V.addStaff({ role: 'cook', layer: 'back', armsOver: true, x: 0.23, y: 0.4, k: 0.9, look: { skin: 'tan', hair: 'black', hairStyle: 'short', acc: { hat: 'paper', hatCol: '#ffffff', stubble: true }, top: { type: 'tee', col: '#f8f8f6' }, sleeves: 'short', apron: true }, idle: [['spin', 2.4], ['stretch', 2], ['flour', 1.4]] });
      V.S.pasta = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.8, y: 0.4, k: 0.88, look: { skin: 'pale', hair: 'auburn', hairStyle: 'short', acc: { hat: 'toque', hatCol: '#ffffff', beard: true }, top: { type: 'uniform', col: '#f8f8f6', trim: '#2a8a3a' }, sleeves: 'long' }, idle: [['toss', 2.4], ['toss', 2], ['drain', 1.8], ['plate', 1.6]] });
      V.S.nonna = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.93, y: 0.42, k: 0.82, look: { female: true, skin: 'light', hair: 'white', hairStyle: 'bun', age: 'old', top: { type: 'apron', col: '#3a3a5a', apron: '#f4ecd8', shirt: '#3a3a5a' }, sleeves: 'long', acc: { glasses: '#2a2a2a', round: true } }, idle: [['roll', 3], ['cut', 2.4], ['roll', 2.4], ['dust', 1.4]] });
      V.S.accordion = V.addStaff({ role: 'idle', floor: true, x: 0.665, feetY: 0.66, k: 0.86, look: { skin: 'olive', hair: 'black', hairStyle: 'curly', acc: { hat: 'newsboy', hatCol: '#4a3a2a', mustache: true }, top: { type: 'vest', col: '#4a2a1a', shirt: '#f4ecd8', bow: '#c8281e' }, sleeves: 'rolled', pants: '#2a2a2a' }, idle: [['play', 8]] });
    },
    tableDish(tb) { const a = (tb.party ? tb.party.members : [0, 1]).map(() => dishFor()); return a; },
    prep(j) { const pz = (j.dish || []).some((d) => DISHES[d.kind].pizza);
      return pz ? [['stretch', 1.4], ['spin', 1.4], ['sauce', 1.1], ['top', 1.1], Object.assign(['peelIn', 0.9], { walk: 0.155, on: (s, jj, V) => { V.S.oven = (V.S.oven || 0) + 1; V.S.ovenT = 0; } }), ['bake', 2.6], Object.assign(['peelOut', 0.9], { after: (s, jj, V) => { V.S.oven = Math.max(0, V.S.oven - 1); } }), Object.assign(['cut', 1.1], { walk: 0.23 })]
        : [['flour', 1], ['wait', 3.2], ['plate', 1]]; },
    tray(j) { const ds = (j.dish || []).slice(0, 3); return (c) => { ds.forEach((d, i) => { c.save(); c.translate((i - 1) * 9, 28 - i * 1.5); c.scale(0.5, 0.5); dishArt(c, d, 0, 0, 1, 0); c.restore(); }); }; },
    dirtyTray() { return (c) => { for (let k = 0; k < 3; k++) { c.fillStyle = '#f4f0e6'; ellipse(c, 0, 28 - k * 2, 10, 2.4); c.fill(); c.strokeStyle = '#1a4a8a'; c.lineWidth = 0.4; c.stroke(); } }; },
    *partyEat(a, tb, V) {
      const seat = a.seat, d = seat.dish; if (!d) return;
      const isPz = DISHES[d.kind].pizza, kid = a.P.age === 'kid';
      if (isPz && Math.random() < 0.4) { a.act = 'clap'; a.actT = 0; yield ['wait', 0.8]; }
      for (let b = 0; b < 5; b++) {
        a.look = tb.x;
        if (isPz) { a.act = 'bite'; a.actT = 0; a.item2 = Items.slice(1); a.pull = 1.8; yield ['wait', 2.4 + Math.random()]; }
        else { a.act = 'twirl'; a.actT = 0; a.item2 = Items.fork(DISHES[d.kind].pasta || '#d87a2a'); yield ['wait', 1.6]; a.act = 'eat'; a.actT = 0; yield ['wait', 1.2]; }
        d.left = Math.max(0, d.left - 0.2); a.item2 = null;
        const r = Math.random();
        if (r < 0.22 && !kid) { a.act = 'drink'; a.actT = 0; a.item2 = Items.wine('#7a1020', 0.6); yield ['wait', 2.4]; a.item2 = null; }
        else if (r < 0.42 && !kid) { a.act = 'gesture'; a.actT = 0; a.look = a.buddy ? a.buddy.x : null; yield ['wait', 2]; } // the pinched-fingers "ma che vuoi"
        else if (r < 0.52) { a.act = 'bread'; a.actT = 0; yield ['wait', 1.8]; }
        else if (r < 0.62) { a.act = 'chefkiss'; a.actT = 0; yield ['wait', 1.4]; }
        else if (r < 0.82) { a.act = 'talk'; a.actT = 0; a.look = a.buddy ? a.buddy.x : null; yield ['wait', 1.2 + Math.random()]; }
        else { a.act = 'laugh'; a.actT = 0; yield ['wait', 1.2]; }
      }
    },
    tableTick(tb, dt, V) {
      const S = tb.S;
      if (tb.state === 'free' && S.prev && S.prev !== 'free') tb.S = { wax: S.wax || 0 };
      if (tb.state === 'seating' && S.prev !== 'seating') { const r = V.S.rosa; if (r && !r.busy) { r.say = { txt: pick(['Benvenuti!', 'Ciao, cari!', 'Prego, prego!']), t: 2 }; r.act = 'welcome'; r.actT = 0; } }
      tb.S.wax = (tb.S.wax || 0) + dt * 0.002;
      tb.S.prev = tb.state;
    },
    tick(V, dt, t) {
      V.agents.forEach((a) => { ['awe', 'pull', 'sway', 'goalT', 'cheekT'].forEach((k) => { if (a[k] > 0) a[k] -= dt; }); });
      if (V.S.ovenT !== undefined) V.S.ovenT += dt;
      const fl = V.S.flame; if (fl) { fl.t += dt; if (fl.t > 9) V.S.flame = null; }
      if (V.S.goal) { V.S.goal.t += dt; if (V.S.goal.t > 8) V.S.goal = null; }
      const P = V.S.pizzaiolo;
      if (V.S.tossReq && P && !P.job) { V.S.tossReq = false; Crowd.hijack(P, (function* () { P.act = 'bigToss'; P.actT = 0; P.say = { txt: 'Guarda!', t: 1.4 }; V.agents.forEach((a) => { if (a.sitting && Math.random() < 0.7) a.awe = 3.4; }); yield ['wait', 3.6]; SFX('cheer'); V.agents.forEach((a) => { if (Math.random() < 0.6) { a.act = 'clap'; a.actT = 0; } }); P.act = 'bow'; P.actT = 0; yield ['wait', 1.2]; })()); }
      // serenade: the accordionist strolls to a table and plays to the couple
      const ac = V.S.accordion;
      if (V.S.serReq && !ac.busy) { const tb = V.tables.find((x) => x.state === 'eating'); if (tb) { V.S.serReq = false; ac.busy = true;
        Crowd.hijack(ac, (function* () { ac.act = 'walkPlay'; yield ['walk', tb.x + 96 * V.u, V.lane() - 10 * V.u]; ac.face = -1; ac.act = 'play'; ac.actT = 0; V.S.serTb = tb; if (tb.party) tb.party.members.forEach((m) => { m.sway = 9; }); yield ['wait', 9]; V.S.serTb = null; SFX('cheer'); if (tb.party) tb.party.members.forEach((m) => { m.act = 'clap'; m.actT = 0; }); ac.act = 'bow'; ac.actT = 0; yield ['wait', 1.2]; ac.act = 'walkPlay'; yield ['walk', ac.home[0], ac.home[1]]; ac.face = 1; ac.busy = false; })()); } }
      // Parmigiano wheel: Gino wheels the cart to a table, flames grappa inside the wheel, tosses the pasta
      const g = V.S.gino;
      if (V.S.parmReq && !g.job && !g.busy) { const tb = V.tables.find((x) => x.state === 'eating') || V.tables[1]; V.S.parmReq = false; g.busy = true;
        Crowd.hijack(g, (function* () {
          g.act = 'walk'; yield ['walk', V.X(0.88), V.lane()]; V.S.wheel = { x: V.X(0.88) - 50 * V.u, t: 0 };
          const tx = tb.x + 150 * V.u; while (Math.abs(V.S.wheel.x - tx) > 3) { V.S.wheel.x += Math.sign(tx - V.S.wheel.x) * Math.min(Math.abs(tx - V.S.wheel.x), 7 * V.u); g.x = V.S.wheel.x + 52 * V.u; g.face = -1; g.act = 'walk'; g.phase += 0.6; yield ['wait', 0.1]; }
          g.act = 'pourGrappa'; g.actT = 0; g.say = { txt: 'Attenzione…', t: 1.4 }; yield ['wait', 1.4]; V.S.wheel.lit = 0.001; SFX('whoosh'); if (tb.party) tb.party.members.forEach((m) => { m.awe = 3.6; });
          g.act = 'toss'; g.actT = 0; yield ['wait', 3.4]; V.S.wheel.lit = 0; g.act = 'serve'; g.actT = 0; yield ['wait', 1]; if (tb.party) tb.party.members.forEach((m) => { m.act = 'clap'; m.actT = 0; }); SFX('cheer');
          const back = V.X(0.88) - 50 * V.u; while (Math.abs(V.S.wheel.x - back) > 3) { V.S.wheel.x += Math.min(Math.abs(back - V.S.wheel.x), 7 * V.u); g.x = V.S.wheel.x - 52 * V.u; g.face = 1; g.act = 'walk'; g.phase += 0.6; yield ['wait', 0.1]; }
          V.S.wheel = null; g.busy = false;
        })()); }
      if (V.S.wheel) V.S.wheel.t += dt;
      // Nonna leaves her board with tiramisù for a table: "Mangia!"
      const n = V.S.nonna;
      if (V.S.nonnaReq && !n.busy) { const tb = V.tables.find((x) => x.state === 'eating'); if (tb) { V.S.nonnaReq = false; n.busy = true;
        Crowd.hijack(n, (function* () {
          const ny = n.y; n.y += 2000; yield ['wait', 1.2];
          const w = V.addStaff({ role: 'idle', floor: true, x: 0.97, feetY: 0.95, speed: 46, k: 0.82, look: n.spec.look, idle: [['stand', 99]], life: function* (s) { s.carry = tiramisuTray; s.act = 'carry'; yield ['walk', tb.x + 92 * V.u, V.lane()]; s.face = -1; s.act = 'serveT'; s.actT = 0; s.say = { txt: 'Mangia! Mangia!', t: 2.4 }; yield ['wait', 1.2]; s.carry = null; tb.S.tira = 1; if (tb.party) { tb.party.members.forEach((m) => { m.awe = 1.6; }); const kid = tb.party.members.find((m) => m.P.age === 'kid') || tb.party.members[0]; kid.cheekT = 1.6; } s.act = 'pinch'; s.actT = 0; yield ['wait', 1.8]; s.act = 'walk'; yield ['walk', V.X(0.97), V.Y(0.95)]; s.gone = true; } });
          V.S.nonnaWalker = w; yield ['until', () => w.gone]; V.staff = V.staff.filter((x) => x !== w); n.y = ny;
        })()); } }
    },
    custPose(a, ps, t, V) {
      const A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
      switch (a.act) {
        case 'bite': { const k = a.actT, up = Math.min(1, k * 2.5), back = k > 1.2 ? Math.min(1, (k - 1.2) * 2) : 0; ps.arms = [A(-1, -8, 44, { grip: 'open' }), A(1, 6 - back * 8, 20 - up * 12 + back * 10, { item: Items.slice(back) })]; if (k > 0.5 && k < 1.4) { ps.face.mouth = 'o'; ps.face.open = 0.8; } else if (k > 1.4) { ps.face.mouth = 'chew'; } ps.head.nod = 0.4;
          if (back > 0 && back < 1) ps.over = (c) => { c.strokeStyle = '#fff4d8'; c.lineWidth = 0.9; c.beginPath(); c.moveTo(4, 4); c.quadraticCurveTo(6 - back * 4, 10, 6 - back * 8, 10 + back * 4); c.stroke(); }; // the cheese pull
          return; }
        case 'twirl': { const r = a.actT * 9; ps.arms = [A(-1, -6, 42, { grip: 'open' }), A(1, 12 + Math.cos(r) * 2, 40 + Math.sin(r) * 1.4, { item: a.item2, handAng: 0.8 })]; ps.face.lookY = 1; ps.head.nod = 1.2; return; }
        case 'gesture': { const b = Math.abs(Math.sin(a.actT * 7)) * 5; ps.arms = [A(-1, -8, 44), pinch(1, 12, 18, b)]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(t * 9)) * 0.7; ps.face.brow = 1; ps.head.tilt = 0.12; return; }
        case 'chefkiss': { const k = a.actT; ps.arms = [A(-1, -8, 44), A(1, 6 + (k > 0.6 ? (k - 0.6) * 20 : 0), 2 - (k > 0.6 ? (k - 0.6) * 10 : 0), { grip: k > 0.6 ? 'open' : 'point' })]; ps.face.eyes = 'closed'; ps.face.mouth = k < 0.6 ? 'o' : 'big'; return; }
        case 'bread': ps.arms = [A(-1, -6, 40, { grip: 'open' }), A(1, 10, 28 - Math.min(1, a.actT) * 6, { item: (c, x, y) => { c.fillStyle = '#d8a050'; ellipse(c, x + 3, y - 1, 4, 2.2, 0.4); c.fill(); c.fillStyle = '#f4e0b0'; ellipse(c, x + 2, y - 1.6, 2.4, 1.2, 0.4); c.fill(); c.fillStyle = 'rgba(200,180,40,0.6)'; ellipse(c, x + 4, y - 0.6, 1.6, 0.8); c.fill(); } })]; ps.face.mouth = 'smile'; return;
      }
      if (a.awe > 0) { ps.face.mouth = 'o'; ps.face.open = 0.7; ps.face.brow = 1; ps.lean = 0.05 * (a.face || 1); }
      if (a.sway > 0) { ps.lean = Math.sin(t * 2.2) * 0.06; ps.face.eyes = 'happy'; ps.face.mouth = 'smile'; ps.head.tilt = Math.sin(t * 2.2) * 0.1; }
      if (a.goalT > 0) { const j = Math.abs(Math.sin(t * 9)); ps.arms = [A(-1, -16, -30 - j * 6, { grip: 'fist' }), A(1, 16, -30 - j * 6, { grip: 'fist' })]; ps.face.mouth = 'o'; ps.face.open = 1; ps.face.eyes = 'happy'; }
      if (a.cheekT > 0) { ps.face.eyes = 'happy'; ps.face.mouth = 'big'; ps.head.tilt = -0.12; }
    },
    pose(s, ps, t, V) {
      const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
      switch (s.act) {
        // pizzaiolo (counter at local y ≈ 60)
        case 'stretch': { const p = Math.sin(k * 6); ps.arms = [A(-1, -2 - p * 4, 58, { grip: 'open' }), A(1, 18 + p * 4, 58, { grip: 'open', item: doughItem(k, 8 + Math.min(4, k * 3)) })]; ps.face.lookY = 1; ps.head.nod = 1.4; return; }
        case 'spin': { const sp = k * 14; ps.arms = [A(-1, 2, 22, { grip: 'point' }), A(1, 10, 24, { grip: 'point', item: doughItem(sp, 10) })]; ps.face.lookY = -0.6; ps.face.mouth = 'smile'; return; }
        case 'sauce': { const r = k * 8; ps.arms = [A(-1, 0, 58, { grip: 'open' }), A(1, 14 + Math.cos(r) * 5, 52 + Math.sin(r) * 2, { item: ladleItem })]; ps.face.lookY = 1; ps.head.nod = 1.4; return; }
        case 'top': { const p = Math.abs(Math.sin(k * 8)); ps.arms = [A(-1, 2, 54 - p * 4, { grip: 'open' }), A(1, 16, 50 + p * 4, { grip: 'open', item: (c, x, y) => { c.fillStyle = '#fff4dc'; ellipse(c, x + 2, y, 2, 1.6); c.fill(); } })]; ps.face.lookY = 1; ps.face.mouth = 'smile'; ps.head.nod = 1.3; return; }
        case 'flour': { ps.arms = [A(-1, 0, 56, { grip: 'open' }), A(1, 16, 40 + Math.sin(k * 10) * 4, { grip: 'open' })]; if (Math.random() < 0.08) V.burst(s.x + 24 * V.sc * 0.9, s.y + 50 * V.sc * 0.9, 3, '#ffffff', { up: 40, sp: 30, g: 40, life: 0.9, sz: 1.6 }); return; }
        case 'peelIn': case 'peelOut': { const p = s.act === 'peelIn' ? Math.min(1, k / 0.6) : 1 - Math.min(1, k / 0.6); s.face = -1; ps.arms = [A(-1, 10 + p * 16, 40, { item: peelItem(s.act === 'peelIn' ? p < 0.9 : p < 0.2) }), A(1, -2 + p * 16, 44)]; ps.lean = 0.06 * p; ps.face.lookY = 0.6; return; }
        case 'bake': { s.face = -1; ps.arms = [A(-1, 24, 40, { item: peelItem(false) }), A(1, 10, 44)]; ps.head.nod = 0.6; ps.face.mouth = 'smile'; return; }
        case 'cut': { const p = Math.sin(k * 10); s.face = 1; ps.arms = [A(-1, 0, 58, { grip: 'open' }), A(1, 14 + p * 6, 52 - Math.abs(p) * 4, { item: (c, x, y) => { c.fillStyle = '#d8dce0'; ellipse(c, x + 4, y + 1, 4, 4); c.fill(); c.fillStyle = '#3a2a1a'; c.fillRect(x - 3, y - 0.8, 5, 1.6); } })]; ps.face.lookY = 1; ps.head.nod = 1.4; return; }
        case 'bigToss': { const h = Math.max(0, Math.sin(Math.min(1, (k % 1.2) / 1.2) * Math.PI)); ps.arms = [A(-1, -4, 10 - h * 20, { grip: 'open' }), A(1, 8, 6 - h * 26, { grip: 'open' })]; ps.face.lookY = -1; ps.head.nod = -1.5; ps.face.mouth = 'big';
          ps.over = (c) => { c.save(); c.translate(6, -20 - h * 70); c.rotate(k * 9); c.scale(1, 0.4 + 0.3 * Math.abs(Math.sin(k * 4))); c.fillStyle = radial(c, -2, -2, 16, [[0, '#fbf2dc'], [0.8, '#efdcb0'], [1, '#d8b880']]); ellipse(c, 0, 0, 13, 13); c.fill(); c.restore(); }; return; }
        // pasta cook
        case 'toss': { const f = Math.max(0, Math.sin(k * 6)); ps.arms = [A(-1, 16, 52 - f * 8, { item: panItem(f) }), A(1, 8, 56, { grip: 'open' })]; ps.face.lookY = 0.8; if (f > 0.95 && Math.random() < 0.3) V.burst(s.x + 30 * V.u, s.y + 34 * V.u, 6, '#ffa040', { kind: 'spark', up: 160, sp: 50, g: -30, life: 0.7, sz: 2.4 }); return; }
        case 'drain': ps.arms = [A(-1, 4, 50, { grip: 'fist' }), A(1, 18, 48, { grip: 'fist' })]; ps.face.lookY = 1; if (Math.random() < 0.2) V.steam(s.x + 20 * V.u, s.y + 30 * V.u, 1, 1.2); return;
        case 'plate': ps.arms = [A(-1, 4, 58, { grip: 'open' }), A(1, 18, 56, { grip: 'open', item: ladleItem })]; ps.face.lookY = 1; ps.head.nod = 1.2; return;
        // nonna
        case 'roll': { const p = Math.sin(k * 3); ps.arms = [A(-1, -6 + p * 8, 58, { grip: 'fist' }), A(1, 14 + p * 8, 58, { grip: 'fist' })]; ps.over = (c) => { c.fillStyle = '#c8a070'; roundRect(c, -12 + p * 8, 55, 34, 4, 2); c.fill(); }; ps.face.lookY = 1; ps.head.nod = 1.4; ps.face.mouth = 'smile'; ps.lean = 0.06; return; }
        case 'dust': { ps.arms = [A(-1, 0, 50, { grip: 'open' }), A(1, 14, 44 + Math.sin(k * 12) * 3, { grip: 'open' })]; if (Math.random() < 0.15) V.burst(s.x + 14 * V.u, s.y + 40 * V.u, 2, '#ffffff', { up: 20, sp: 20, g: 30, life: 1, sz: 1.4 }); return; }
        case 'serveT': ps.arms = [A(-1, -22, 26, { grip: 'open', item: tiramisuTray }), A(1, -16, 30, { grip: 'open' })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'pinch': { const p = Math.abs(Math.sin(k * 6)); ps.arms = [A(-1, -24 - p * 2, 14, { grip: 'fist' }), A(1, 10, 44)]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; ps.lean = 0.1; return; }
        // front of house
        case 'welcome': ps.arms = [A(-1, -24, 10, { grip: 'open' }), A(1, 24, 10, { grip: 'open' })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'towel': ps.arms = [A(-1, -6, 38, { item: Items.napkin }), A(1, 12, 4, { grip: 'open', item: (c, x, y) => { c.fillStyle = '#f4f0e6'; c.fillRect(x - 1, y, 3, 14); c.fillStyle = '#c8281e'; c.fillRect(x - 1, y + 4, 3, 1); } })]; return;
        case 'notepad': ps.arms = [A(-1, -6, 26, { item: Items.notepad }), A(1, 6, 28)]; ps.face.lookY = 0.6; return;
        case 'play': case 'walkPlay': { const sq = (Math.sin(t * 3.2) + 1) / 2; ps.arms = [A(-1, -16 - sq * 6, 34, { grip: 'open' }), A(1, 16 + sq * 6, 32, { grip: 'open' })]; ps.over = accordionArt(sq, t); ps.face.mouth = 'smile'; ps.face.eyes = s.act === 'play' && Math.sin(t * 0.7) > 0.3 ? 'closed' : null; ps.head.tilt = Math.sin(t * 1.6) * 0.1; return; }
        case 'pourGrappa': ps.arms = [A(-1, -24, 22, { grip: 'open' }), A(1, -20, 6, { item: grappaItem })]; ps.lean = -0.05; ps.face.lookY = 1; return;
      }
      if (s === V.S.gino && s.act === 'toss') return false;
      return false;
    },
    back(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(12);
      // warm ochre plaster with brick showing through where it has flaked off
      x.fillStyle = linear(x, 0, 0, 0, H * 0.66, [[0, '#c8844a'], [1, '#e0a868']]); x.fillRect(0, 0, W, H * 0.66);
      for (let k = 0; k < 220; k++) { x.fillStyle = `rgba(${120 + rnd() * 60 | 0},${60 + rnd() * 30 | 0},20,${0.04 + rnd() * 0.05})`; ellipse(x, rnd() * W, rnd() * H * 0.64, (10 + rnd() * 50) * u, (4 + rnd() * 20) * u, rnd()); x.fill(); }
      [[0.3, 0.32], [0.63, 0.5], [0.96, 0.08]].forEach(([fx, fy]) => { const px = X(fx), py = H * fy; x.save(); x.beginPath(); x.ellipse(px, py, 40 * u, 26 * u, 0.2, 0, TAU); x.clip(); for (let r = 0; r < 8; r++) for (let q = 0; q < 6; q++) { x.fillStyle = shade('#a84a2a', (rnd() - 0.5) * 0.3); x.fillRect(px - 44 * u + q * 16 * u + (r % 2) * 8 * u, py - 30 * u + r * 7 * u, 15 * u, 6 * u); } x.restore(); x.strokeStyle = 'rgba(90,50,20,0.4)'; x.lineWidth = 1 * u; x.beginPath(); x.ellipse(px, py, 40 * u, 26 * u, 0.2, 0, TAU); x.stroke(); });
      // dark beams
      x.fillStyle = '#3a2214'; x.fillRect(0, 0, W, H * 0.05); for (let k = 0; k < 9; k++) { x.fillStyle = '#4a2c18'; x.fillRect(k * W / 8 - 8 * u, 0, 16 * u, H * 0.06); }
      // hand-painted sign over the window
      x.fillStyle = '#1a3a22'; roundRect(x, X(0.35), H * 0.055, X(0.26), H * 0.055, 4 * u); x.fill(); x.strokeStyle = '#d8b050'; x.lineWidth = 2 * u; x.stroke();
      x.fillStyle = '#f4e8c8'; x.font = `italic bold ${20 * u}px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Trattoria da Nonna Rosa', X(0.48), H * 0.083);
      // the oven: mosaic-tiled dome on a brick base
      const ox = X(0.11), oy = H * 0.43, orx = X(0.095), ory = H * 0.27;
      x.fillStyle = '#7a3a1a'; x.fillRect(ox - orx - 6 * u, oy, orx * 2 + 12 * u, H * 0.13);
      for (let r = 0; r < 6; r++) for (let q = 0; q < 12; q++) { x.fillStyle = shade('#a84a2a', (rnd() - 0.5) * 0.3); x.fillRect(ox - orx - 4 * u + q * (orx * 2 + 8 * u) / 12 + (r % 2) * 6 * u, oy + 4 * u + r * H * 0.02, (orx * 2) / 12 - 2 * u, H * 0.016); }
      x.save(); x.beginPath(); x.ellipse(ox, oy, orx, ory, 0, Math.PI, 0); x.closePath(); x.clip();
      const tcols = ['#c8a050', '#e8c070', '#a8803a', '#2a6a9a', '#3a8aba', '#f4e8c8'];
      for (let r = 0; r < 22; r++) for (let q = 0; q < 40; q++) { const tx = ox - orx + q * orx * 2 / 40, ty = oy - ory + r * ory / 22, band = Math.floor(r / 4) % 3; x.fillStyle = shade(band === 1 ? tcols[3 + (q + r) % 2] : tcols[(q + r) % 3], (rnd() - 0.5) * 0.25); x.fillRect(tx, ty, orx * 2 / 40 - 1 * u, ory / 22 - 1 * u); }
      x.fillStyle = radial(x, ox - orx * 0.3, oy - ory * 0.6, orx * 1.4, [[0, 'rgba(255,255,255,0.25)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,0,0.4)']]); x.fillRect(ox - orx, oy - ory, orx * 2, ory); x.restore();
      x.fillStyle = '#f4e8c8'; x.font = `italic bold ${13 * u}px Georgia, serif`; x.fillText('Forno a legna', ox, oy - ory * 0.62);
      // flue up to the ceiling
      x.fillStyle = '#5a5a5a'; x.fillRect(ox - 10 * u, H * 0.05, 20 * u, oy - ory - H * 0.05 + 4 * u);
      // the mouth (filled live) + stacked logs under the oven
      x.fillStyle = '#1a0a04'; x.beginPath(); x.ellipse(ox, oy, orx * 0.42, ory * 0.36, 0, Math.PI, 0); x.closePath(); x.fill();
      x.strokeStyle = '#f4e8c8'; x.lineWidth = 4 * u; x.beginPath(); x.ellipse(ox, oy, orx * 0.46, ory * 0.4, 0, Math.PI, 0); x.stroke();
      // chalkboard specials
      const bx = X(0.205), by = H * 0.13; x.fillStyle = '#6a4a2a'; x.fillRect(bx - 4 * u, by - 4 * u, X(0.135) + 8 * u, H * 0.2 + 8 * u); x.fillStyle = '#1e2420'; x.fillRect(bx, by, X(0.135), H * 0.2);
      x.fillStyle = '#f4f0e6'; x.font = `italic ${14 * u}px Georgia, serif`; x.fillText('Oggi', bx + X(0.0675), by + 14 * u); x.font = `${9.5 * u}px Georgia, serif`;
      ['Margherita  9', 'Diavola  12', 'Capricciosa  13', 'Carbonara  15', 'Vongole  18', 'Lasagne della Nonna  16'].forEach((l, i) => x.fillText(l, bx + X(0.0675), by + 32 * u + i * 13 * u));
      // wine rack with straw-wrapped Chianti fiaschi
      const rx0 = X(0.615), ry0 = H * 0.24, rw = X(0.1), rh = H * 0.28; x.fillStyle = '#4a2a14'; x.fillRect(rx0, ry0, rw, rh);
      for (let r = 0; r < 6; r++) for (let q = 0; q < 5; q++) { const cx = rx0 + 8 * u + q * (rw - 16 * u) / 4, cy = ry0 + 10 * u + r * (rh - 20 * u) / 5; x.fillStyle = '#2a1408'; ellipse(x, cx, cy, 7 * u, 7 * u); x.fill(); x.fillStyle = rnd() < 0.7 ? '#1a3a1a' : '#5a1a14'; ellipse(x, cx, cy, 5 * u, 5 * u); x.fill(); x.fillStyle = 'rgba(255,255,255,0.3)'; ellipse(x, cx - 1.6 * u, cy - 1.6 * u, 1.4 * u, 1.4 * u); x.fill(); }
      // TV on a bracket (for the match), framed photos of the family and a signed football shirt
      x.fillStyle = '#2a2a2a'; x.fillRect(X(0.66) - 2 * u, H * 0.05, 4 * u, H * 0.05);
      [[0.735, 0.14, '#5a4a3a'], [0.735, 0.27, '#4a5a6a'], [0.29, 0.38, '#6a5a4a']].forEach(([fx, fy, col]) => { const px = X(fx), py = H * fy; x.fillStyle = '#c8a050'; x.fillRect(px - 1 * u, py - 1 * u, 32 * u, 26 * u); x.fillStyle = shade(col, 0.2); x.fillRect(px + 2 * u, py + 2 * u, 26 * u, 20 * u); x.fillStyle = 'rgba(30,20,10,0.6)'; ellipse(x, px + 10 * u, py + 12 * u, 3 * u, 4 * u); x.fill(); ellipse(x, px + 19 * u, py + 13 * u, 3 * u, 4 * u); x.fill(); });
      // pasta station: white subway tile behind
      const kx0 = X(0.73); x.fillStyle = '#f0ece4'; x.fillRect(kx0, H * 0.12, W - kx0, H * 0.42); x.strokeStyle = 'rgba(150,140,130,0.4)'; x.lineWidth = 0.8;
      for (let gy = H * 0.12; gy < H * 0.54; gy += 8 * u) for (let gx = kx0 + (Math.round(gy / (8 * u)) % 2) * 8 * u; gx < W; gx += 16 * u) x.strokeRect(gx, gy, 16 * u, 8 * u);
      x.fillStyle = '#c8282a'; x.fillRect(kx0, H * 0.33, W - kx0, 3 * u); x.fillStyle = '#2a8a3a'; x.fillRect(kx0, H * 0.33 + 3 * u, W - kx0, 3 * u);
      // garlic braids, chillies and a prosciutto leg hanging from the beam
      x.strokeStyle = '#8a6a3a'; x.lineWidth = 1 * u; x.beginPath(); x.moveTo(kx0, H * 0.13); x.lineTo(W, H * 0.13); x.stroke();
      [0.76, 0.86, 0.96].forEach((f, i) => { const hx = X(f); x.beginPath(); x.moveTo(hx, H * 0.13); x.lineTo(hx, H * 0.16); x.stroke();
        if (i === 1) { x.fillStyle = linear(x, hx - 12 * u, 0, hx + 12 * u, 0, [[0, '#6a2a1a'], [0.5, '#b85a3a'], [1, '#5a2214']]); x.beginPath(); x.moveTo(hx - 4 * u, H * 0.16); x.bezierCurveTo(hx - 16 * u, H * 0.2, hx - 14 * u, H * 0.27, hx, H * 0.28); x.bezierCurveTo(hx + 14 * u, H * 0.27, hx + 14 * u, H * 0.2, hx + 4 * u, H * 0.16); x.fill(); x.fillStyle = '#f4e8d8'; ellipse(x, hx, H * 0.275, 6 * u, 3 * u); x.fill(); }
        else if (i === 0) for (let q = 0; q < 6; q++) { x.fillStyle = '#f4ece0'; ellipse(x, hx + (q % 2 ? 4 : -4) * u, H * 0.17 + q * 7 * u, 5 * u, 4.4 * u); x.fill(); x.strokeStyle = 'rgba(160,130,110,0.6)'; x.stroke(); }
        else for (let q = 0; q < 7; q++) { x.fillStyle = '#c8180e'; x.save(); x.translate(hx + (q % 2 ? 3 : -3) * u, H * 0.17 + q * 6 * u); x.rotate(q % 2 ? 0.4 : -0.4); ellipse(x, 0, 0, 2 * u, 6 * u); x.fill(); x.restore(); } });
      // terracotta cotto floor, perspective tiles
      const fy = H * 0.66; x.fillStyle = '#8a4a2a'; x.fillRect(0, fy, W, H - fy);
      for (let r = 0; r < 10; r++) { const y0 = fy + (H - fy) * Math.pow(r / 10, 1.3), y1 = fy + (H - fy) * Math.pow((r + 1) / 10, 1.3), n = 14; for (let q = -1; q <= n; q++) { const xa = W / 2 + (q * W / n - W / 2) * (1 + r * 0.06), xb = W / 2 + ((q + 1) * W / n - W / 2) * (1 + r * 0.06), xc = W / 2 + (q * W / n - W / 2) * (1 + (r + 1) * 0.06), xd = W / 2 + ((q + 1) * W / n - W / 2) * (1 + (r + 1) * 0.06);
        x.fillStyle = shade('#b0603a', (rnd() - 0.5) * 0.18); x.beginPath(); x.moveTo(xa + 1, y0 + 1); x.lineTo(xb - 1, y0 + 1); x.lineTo(xd - 1, y1 - 1); x.lineTo(xc + 1, y1 - 1); x.closePath(); x.fill(); } }
      x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(0, fy, W, 5 * u);
    },
    counter(x, V) { // marble pizza bench (left) with dough balls and topping crocks; stainless pasta range (right)
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(3);
      const mx1 = X(0.31); x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.68, [[0, '#f4f2ee'], [0.1, '#d8d4cc'], [0.12, '#6a3a1a'], [1, '#3a1a08']]); x.fillRect(X(0.2) - 8 * u, H * 0.505, mx1 - X(0.2) + 8 * u, H * 0.17);
      x.strokeStyle = 'rgba(120,120,130,0.35)'; x.lineWidth = 0.7 * u; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(X(0.2) + rnd() * X(0.1), H * 0.505); x.bezierCurveTo(X(0.22) + rnd() * X(0.08), H * 0.51, X(0.24) + rnd() * X(0.06), H * 0.52, X(0.2) + rnd() * X(0.1), H * 0.525); x.stroke(); }
      for (let k = 0; k < 4; k++) { const cx = X(0.275) + k * 12 * u; x.fillStyle = ['#c8281e', '#fff4dc', '#2a8a2a', '#9a1a12'][k]; x.fillStyle = '#e8e0d0'; roundRect(x, cx - 5 * u, H * 0.488, 10 * u, 9 * u, 2 * u); x.fill(); x.fillStyle = ['#c8281e', '#fff4dc', '#2a8a2a', '#9a1a12'][k]; ellipse(x, cx, H * 0.49, 4 * u, 1.4 * u); x.fill(); }
      for (let k = 0; k < 4; k++) { x.fillStyle = radial(x, X(0.215) + k * 9 * u - 2 * u, H * 0.497, 6 * u, [[0, '#fbf2dc'], [1, '#e0c890']]); ellipse(x, X(0.215) + k * 9 * u, H * 0.5, 5 * u, 3.4 * u); x.fill(); }
      // log pile under the oven
      for (let r = 0; r < 3; r++) for (let q = 0; q < 6 - r; q++) { const lx = X(0.04) + q * 14 * u + r * 7 * u, ly = H * 0.62 - r * 10 * u; x.fillStyle = '#5a3a1a'; ellipse(x, lx, ly, 7 * u, 5.4 * u); x.fill(); x.fillStyle = '#c8a070'; ellipse(x, lx, ly, 5 * u, 3.8 * u); x.fill(); x.strokeStyle = 'rgba(90,60,30,0.6)'; x.lineWidth = 0.6 * u; x.beginPath(); x.arc(lx, ly, 2.4 * u, 0, TAU); x.stroke(); }
      // pasta range
      const kx0 = X(0.73); x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.66, [[0, '#e8ecf0'], [0.15, '#9aa2aa'], [1, '#3a4048']]); x.fillRect(kx0, H * 0.51, W - kx0, H * 0.16);
      x.fillStyle = '#c8a070'; roundRect(x, X(0.88), H * 0.5, X(0.11), H * 0.018, 2 * u); x.fill(); // nonna's board
      x.fillStyle = 'rgba(255,255,255,0.6)'; for (let k = 0; k < 40; k++) x.fillRect(X(0.885) + rnd() * X(0.1), H * 0.5 + rnd() * H * 0.012, 1.4 * u, 1 * u);
      x.fillStyle = '#9aa2aa'; x.fillRect(X(0.745), H * 0.44, 36 * u, 30 * u); x.fillStyle = '#c8ccd0'; ellipse(x, X(0.745) + 18 * u, H * 0.44, 18 * u, 4 * u); x.fill(); // stock pot
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H; V.ctx = ctx;
      // live fire in the oven mouth: flames lick up the left wall, embers, blistering pizzas
      const ox = X(0.11), oy = H * 0.43, orx = X(0.095) * 0.42, ory = H * 0.27 * 0.36;
      ctx.save(); ctx.beginPath(); ctx.ellipse(ox, oy, orx, ory, 0, Math.PI, 0); ctx.closePath(); ctx.clip();
      ctx.fillStyle = radial(ctx, ox - orx * 0.5, oy, orx * 1.6, [[0, '#ffd070'], [0.3, '#ff7a1a'], [0.7, '#8a2a08'], [1, '#2a0a04']]); ctx.fillRect(ox - orx, oy - ory, orx * 2, ory);
      ctx.globalCompositeOperation = 'lighter';
      for (let k = 0; k < 10; k++) { const fx = ox - orx * 0.8 + (k % 3) * 6 * u, h = (14 + Math.sin(t * 9 + k * 1.7) * 6) * u; ctx.fillStyle = `rgba(255,${120 + k * 12},40,0.35)`; ctx.beginPath(); ctx.moveTo(fx - 5 * u, oy); ctx.quadraticCurveTo(fx + Math.sin(t * 7 + k) * 5 * u, oy - h, fx + 8 * u + k * 2 * u, oy - ory * 0.9); ctx.quadraticCurveTo(fx + 4 * u, oy - h * 0.4, fx + 5 * u, oy); ctx.fill(); }
      ctx.globalCompositeOperation = 'source-over';
      const n = V.S.oven || 0; for (let k = 0; k < Math.min(2, n); k++) { const px = ox + orx * 0.15 + k * 18 * u, py = oy - 3 * u, bl = Math.min(1, (V.S.ovenT || 0) / 2.6); ctx.fillStyle = shade('#e8b060', -bl * 0.25); ellipse(ctx, px, py, 14 * u, 3.4 * u); ctx.fill(); ctx.fillStyle = '#c8281e'; ellipse(ctx, px, py - 0.6 * u, 11 * u, 2.4 * u); ctx.fill(); ctx.fillStyle = '#fff4dc'; for (let q = 0; q < 4; q++) { ellipse(ctx, px - 6 * u + q * 4 * u, py - 1 * u - Math.abs(Math.sin(t * 5 + q)) * bl * 1.2 * u, 1.8 * u, 1 * u); ctx.fill(); } ctx.fillStyle = 'rgba(30,10,0,0.6)'; for (let q = 0; q < 5 * bl; q++) { ellipse(ctx, px - 12 * u + q * 6 * u, py - 1.6 * u, 1 * u, 0.6 * u); ctx.fill(); } }
      ctx.restore();
      for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; ctx.fillStyle = `rgba(255,${150 + k * 30},60,${1 - ph})`; ctx.fillRect(ox - orx * 0.5 + k * 9 * u + Math.sin(ph * 9) * 3 * u, oy - ory - ph * 50 * u, 1.6 * u, 1.6 * u); }
      // smoke from the flue + steam from the stockpot
      if (Math.random() < 0.05) V.steam(X(0.745) + 18 * V.u, H * 0.43, 1, 1.4);
      // TV: football match, or GOL! during the event
      const tx = X(0.625), ty = H * 0.1, tw = X(0.07), th = H * 0.085; ctx.fillStyle = '#1a1a1a'; roundRect(ctx, tx - 4 * u, ty - 4 * u, tw + 8 * u, th + 8 * u, 4 * u); ctx.fill();
      ctx.fillStyle = '#2a8a3a'; ctx.fillRect(tx, ty, tw, th); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 0.7 * u; ctx.strokeRect(tx + 3 * u, ty + 3 * u, tw - 6 * u, th - 6 * u); ctx.beginPath(); ctx.moveTo(tx + tw / 2, ty + 3 * u); ctx.lineTo(tx + tw / 2, ty + th - 3 * u); ctx.stroke(); ctx.beginPath(); ctx.arc(tx + tw / 2, ty + th / 2, 6 * u, 0, TAU); ctx.stroke();
      for (let k = 0; k < 8; k++) { ctx.fillStyle = k < 4 ? '#2a5ad8' : '#f4f4f4'; ellipse(ctx, tx + tw * (0.2 + 0.6 * ((Math.sin(t * 0.7 + k * 2.1) + 1) / 2)), ty + th * (0.2 + 0.6 * ((Math.cos(t * 0.5 + k * 1.3) + 1) / 2)), 1.2 * u, 1.2 * u); ctx.fill(); }
      ctx.fillStyle = '#ffffff'; ellipse(ctx, tx + tw * (0.5 + 0.35 * Math.sin(t * 0.9)), ty + th * (0.5 + 0.3 * Math.cos(t * 1.3)), 1 * u, 1 * u); ctx.fill();
      if (V.S.goal && Math.sin(t * 10) > -0.3) { ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(tx, ty, tw, th); ctx.fillStyle = '#ffd860'; ctx.font = `bold ${14 * u}px Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GOL!', tx + tw / 2, ty + th / 2); }
      ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(tx, ty, tw * 0.3, th);
    },
    counterLive(ctx, t, dt, V) { // steam off the pass; pans flare on the range
      const ck = V.S.pasta, u = V.u, X = V.X, H = V.H; if (ck && ck.act === 'toss') { const f = Math.max(0, Math.sin(ck.actT * 6)); if (f > 0.6) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 6; k++) { ctx.fillStyle = `rgba(255,${120 + k * 20},40,${0.25 * f})`; ellipse(ctx, X(0.83) + Math.sin(t * 20 + k) * 4 * u, H * 0.48 - k * 5 * u * f, (8 - k) * u, (10 + k * 2) * u * f); ctx.fill(); } ctx.restore(); } }
      const rd = V.jobs.filter((j) => j.kind === 'prep' && j.state === 'ready'); rd.slice(0, 2).forEach((j, i) => { const d = j.dish && j.dish[0]; if (d) dishArt(ctx, d, X(0.285) - i * 30 * u, H * 0.5, u * 1.1, t); });
    },
    drawSeat(ctx, seat, t, V) { // Thonet bentwood bistro chair
      const k = V.sc, cx = seat.x, top = seat.y + 8 * k, bot = seat.table ? seat.table.y : seat.y + 70 * k;
      ctx.strokeStyle = '#3a1a0a'; ctx.lineWidth = 3.2 * k; ctx.beginPath(); ctx.moveTo(cx - 16 * k, bot); ctx.lineTo(cx - 14 * k, top + 14 * k); ctx.quadraticCurveTo(cx - 14 * k, top, cx, top); ctx.quadraticCurveTo(cx + 14 * k, top, cx + 14 * k, top + 14 * k); ctx.lineTo(cx + 16 * k, bot); ctx.stroke();
      ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.ellipse(cx, top + 22 * k, 10 * k, 12 * k, 0, 0, TAU); ctx.stroke();
    },
    drawTable(ctx, tb, t, V) {
      const u = V.u, k = V.sc, S = tb.S, rx = tb.rx, ry = tb.ry, fl = tb.y + 52 * k;
      tb.seats.forEach((s) => { if (!s.who) cfg.drawSeat(ctx, s, t, V); });
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(ctx, tb.x, fl, rx * 1.05, ry * 0.7); ctx.fill();
      // gingham skirt: red/white checks with folds
      ctx.save(); ctx.beginPath(); ctx.moveTo(tb.x - rx, tb.y); ctx.lineTo(tb.x - rx * 1.04, fl - 10 * k); ctx.lineTo(tb.x + rx * 1.04, fl - 10 * k); ctx.lineTo(tb.x + rx, tb.y); ctx.closePath(); ctx.clip();
      ctx.fillStyle = '#f8f4ee'; ctx.fillRect(tb.x - rx * 1.1, tb.y, rx * 2.2, fl - tb.y);
      const cs = 9 * u; ctx.fillStyle = 'rgba(200,30,30,0.55)'; for (let q = -12; q < 12; q++) { if (q % 2) ctx.fillRect(tb.x + q * cs, tb.y, cs, fl - tb.y); } for (let r = 0; r < 10; r++) { if (r % 2) ctx.fillRect(tb.x - rx * 1.1, tb.y + r * cs, rx * 2.2, cs); }
      ctx.fillStyle = linear(ctx, tb.x - rx, 0, tb.x + rx, 0, [[0, 'rgba(0,0,0,0.3)'], [0.4, 'rgba(0,0,0,0)'], [0.7, 'rgba(255,255,255,0.05)'], [1, 'rgba(0,0,0,0.35)']]); ctx.fillRect(tb.x - rx * 1.1, tb.y, rx * 2.2, fl - tb.y); ctx.restore();
      ctx.strokeStyle = '#3a1a0a'; ctx.lineWidth = 3 * k; ctx.beginPath(); ctx.moveTo(tb.x - rx * 0.6, fl - 10 * k); ctx.lineTo(tb.x - rx * 0.62, fl); ctx.moveTo(tb.x + rx * 0.6, fl - 10 * k); ctx.lineTo(tb.x + rx * 0.62, fl); ctx.stroke();
      // table top gingham (perspective)
      ctx.save(); ellipse(ctx, tb.x, tb.y, rx, ry); ctx.clip(); ctx.fillStyle = '#f8f4ee'; ctx.fillRect(tb.x - rx, tb.y - ry, rx * 2, ry * 2); ctx.fillStyle = 'rgba(200,30,30,0.5)';
      for (let q = -12; q < 12; q++) if (q % 2) ctx.fillRect(tb.x + q * cs, tb.y - ry, cs, ry * 2); for (let r = -4; r < 4; r++) if (r % 2) ctx.fillRect(tb.x - rx, tb.y + r * cs * 0.3, rx * 2, cs * 0.3); ctx.restore();
      // candle in a straw-wrapped fiasco with wax drips
      const bx = tb.x, by = tb.y - 2 * u; ctx.fillStyle = '#1a3a1a'; ellipse(ctx, bx, by - 8 * u, 7 * u, 8 * u); ctx.fill(); ctx.fillStyle = '#d8b060'; ctx.fillRect(bx - 7 * u, by - 7 * u, 14 * u, 8 * u); ctx.strokeStyle = 'rgba(120,80,20,0.6)'; ctx.lineWidth = 0.6 * u; for (let q = 0; q < 6; q++) { ctx.beginPath(); ctx.moveTo(bx - 7 * u + q * 2.6 * u, by - 7 * u); ctx.lineTo(bx - 6 * u + q * 2.6 * u, by + 1 * u); ctx.stroke(); }
      ctx.fillStyle = '#1a3a1a'; ctx.fillRect(bx - 1.6 * u, by - 22 * u, 3.2 * u, 8 * u); const wax = Math.min(1, S.wax || 0.3);
      ['#f4ecd8', '#e8c0a0', '#c8d8e8'].forEach((col, i) => { ctx.fillStyle = col; ctx.fillRect(bx - 2.4 * u + i * 1.6 * u, by - 22 * u, 1.4 * u, (4 + wax * 8 + i * 2) * u); });
      ctx.fillStyle = '#f4ecd8'; ctx.fillRect(bx - 1.4 * u, by - 30 * u, 2.8 * u, 8 * u);
      const fl2 = 0.85 + 0.15 * Math.sin(t * 13 + tb.x) * Math.sin(t * 7.7); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = radial(ctx, bx, by - 32 * u, 36 * u, [[0, `rgba(255,190,110,${0.4 * fl2})`], [1, 'rgba(255,160,80,0)']]); ctx.fillRect(bx - 36 * u, by - 68 * u, 72 * u, 72 * u); ctx.restore();
      ctx.fillStyle = '#ffd890'; ctx.beginPath(); ctx.ellipse(bx, by - 33 * u, 1.5 * u, 3.4 * u * fl2, Math.sin(t * 5) * 0.12, 0, TAU); ctx.fill();
      // bread basket + olive oil
      if (tb.state !== 'free') { const qx = tb.x - rx * 0.32, qy = tb.y - 2 * u; ctx.fillStyle = '#a8783a'; ctx.beginPath(); ctx.moveTo(qx - 9 * u, qy - 4 * u); ctx.lineTo(qx + 9 * u, qy - 4 * u); ctx.lineTo(qx + 6 * u, qy + 2 * u); ctx.lineTo(qx - 6 * u, qy + 2 * u); ctx.fill(); ctx.fillStyle = '#e0b060'; for (let q = 0; q < 3; q++) { ellipse(ctx, qx - 4 * u + q * 4 * u, qy - 5 * u, 3 * u, 2 * u, q); ctx.fill(); }
        ctx.fillStyle = 'rgba(200,190,60,0.7)'; ctx.fillRect(tb.x + rx * 0.3, tb.y - 12 * u, 4 * u, 10 * u); ctx.fillStyle = '#c8ccd0'; ctx.fillRect(tb.x + rx * 0.3 + 1 * u, tb.y - 15 * u, 2 * u, 3 * u); }
      // dishes + glasses at each occupied seat
      tb.seats.forEach((s) => { if (!s.who) return; const px = tb.x + (s.x - tb.x) * 0.62, py = tb.y + ry * 0.05;
        if (s.dish) dishArt(ctx, s.dish, px, py + 2 * u, u * 1.35, t);
        const gx = px + 14 * u * (s.x < tb.x ? 1 : -1); ctx.save(); ctx.translate(gx, py - 2 * u); ctx.scale(1.3 * u, 1.3 * u); Items.wine('#7a1020', tb.state === 'eating' ? 0.6 : 0)(ctx, 0, 0); ctx.restore(); });
      if (S.tira) { ctx.save(); ctx.translate(tb.x + rx * 0.12, tb.y + 4 * u); ctx.scale(1.2, 1.2); tiramisuTray(ctx); ctx.restore(); }
      if (tb.state === 'bill') { ctx.fillStyle = '#f4ecd8'; ctx.fillRect(tb.x - 7 * u, tb.y + 4 * u, 14 * u, 5 * u); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(tb.x - 5 * u, tb.y + 5.5 * u, 10 * u, 0.8 * u); }
    },
    floorProps(V, t) {
      const u = V.u, out = [];
      const w = V.S.wheel; if (w) out.push({ y: V.lane() - 1, f: () => { const ctx = V.ctx, k = V.sc * 0.95, cx = w.x, cy = V.lane() - 6 * u; // trolley with a halved Parmigiano wheel
        ctx.fillStyle = '#6a3a1a'; ctx.fillRect(cx - 26 * k, cy - 58 * k, 52 * k, 4 * k); ctx.strokeStyle = '#4a2a14'; ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.moveTo(cx - 22 * k, cy - 54 * k); ctx.lineTo(cx - 22 * k, cy); ctx.moveTo(cx + 22 * k, cy - 54 * k); ctx.lineTo(cx + 22 * k, cy); ctx.stroke(); ctx.fillStyle = '#2a2a2a'; ellipse(ctx, cx - 22 * k, cy, 3 * k, 3 * k); ctx.fill(); ellipse(ctx, cx + 22 * k, cy, 3 * k, 3 * k); ctx.fill();
        ctx.fillStyle = '#d8a050'; ctx.fillRect(cx - 22 * k, cy - 76 * k, 44 * k, 18 * k); ctx.fillStyle = '#c88a3a'; ctx.font = `bold ${4 * k}px sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#8a5a1a'; ctx.fillText('PARMIGIANO REGGIANO', cx, cy - 64 * k);
        ctx.fillStyle = '#f0d890'; ellipse(ctx, cx, cy - 76 * k, 22 * k, 5 * k); ctx.fill(); ctx.fillStyle = '#e8c870'; ellipse(ctx, cx, cy - 76 * k, 15 * k, 3.4 * k); ctx.fill();
        if (w.lit !== undefined && w.lit > 0 || (w.lit === 0.001)) {}
        const gg = V.S.gino; if (gg && gg.act === 'toss') { ctx.strokeStyle = '#f4d880'; ctx.lineWidth = 1 * k; for (let q = 0; q < 6; q++) { ctx.beginPath(); ctx.arc(cx + Math.sin(t * 8 + q) * 4 * k, cy - 80 * k - Math.abs(Math.sin(t * 6)) * 8 * k, (3 + q) * k, 0, Math.PI * 1.5); ctx.stroke(); } }
        if (w.lit) { const a = 1 - Math.min(1, (gg && gg.act === 'toss' ? gg.actT : 0) / 3.4); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let q = 0; q < 9; q++) { const h = (36 + Math.sin(t * 19 + q) * 12) * k * a; ctx.fillStyle = `rgba(${q % 3 ? 255 : 110},${120 + q * 14},${q % 3 ? 40 : 255},${0.3 * a})`; ellipse(ctx, cx + Math.sin(t * 13 + q * 2) * 8 * k, cy - 78 * k - h / 2, 8 * k, h / 2); ctx.fill(); } ctx.fillStyle = radial(ctx, cx, cy - 100 * k, 140 * k, [[0, `rgba(255,170,80,${0.3 * a})`], [1, 'rgba(255,140,60,0)']]); ctx.fillRect(cx - 140 * k, cy - 240 * k, 280 * k, 280 * k); ctx.restore(); }
      } });
      return out;
    },
    post(ctx, t, dt, V) {
      const u = V.u;
      const bubble = (x, y, txt, a) => { ctx.save(); ctx.globalAlpha = a; ctx.font = `italic bold ${15 * u}px Georgia, serif`; const w = ctx.measureText(txt).width + 18 * u; ctx.fillStyle = 'rgba(255,250,240,0.95)'; roundRect(ctx, x - w / 2, y - 14 * u, w, 24 * u, 9 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 5 * u, y + 9 * u); ctx.lineTo(x + 2 * u, y + 17 * u); ctx.lineTo(x + 6 * u, y + 9 * u); ctx.fill(); ctx.fillStyle = '#7a1a12'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 2 * u); ctx.restore(); };
      V.staff.concat(V.agents).forEach((s) => { if (s.say && s.say.t > 0) { s.say.t -= dt; const top = s.sitting ? s.y - 30 * V.sc : s.y - 122 * V.sc * (s.spec && s.spec.k || 1); bubble(s.x, top - 30 * u, s.say.txt, Math.min(1, s.say.t * 2)); } });
      // musical notes from the accordion
      const ac = V.S.accordion; if (ac && (ac.act === 'play' || ac.act === 'walkPlay')) { ctx.textAlign = 'center'; for (let q = 0; q < 3; q++) { const ph = (t * 0.45 + q / 3) % 1, k = V.sc * 0.86; ctx.fillStyle = `rgba(255,236,190,${0.8 * (1 - ph)})`; ctx.font = `${(13 + q * 2) * u}px serif`; ctx.fillText(q % 2 ? '♪' : '♫', ac.x + (q - 1) * 14 * u + Math.sin(ph * 6 + q) * 8 * u, ac.y - 90 * k - ph * 60 * u); } }
    },
    events(V) {
      return [
        { at: 0.12, name: 'toss', dur: 10, start() { V.S.tossReq = true; } },
        { at: 0.3, name: 'serenade', dur: 24, start() { V.S.serReq = true; } },
        { at: 0.47, name: 'parmigiano', dur: 30, start() { V.S.parmReq = true; } },
        { at: 0.64, name: 'goal', dur: 10, start() { V.S.goal = { t: 0 }; SFX('cheer'); SFX('fanfare'); const g = V.S.gino; if (g) g.say = { txt: 'GOOOOL!', t: 2.4 }; V.agents.forEach((a) => { if (Math.random() < 0.8) a.goalT = 2.6 + Math.random(); }); V.staff.forEach((s) => { s.cheer = 2; }); V.burst(V.W * 0.55, V.H * 0.55, 60, () => pick(['#2a9a3a', '#f4f4f4', '#d8281e']), { kind: 'confetti', up: 300, sp: 300, life: 2.6 }); } },
        { at: 0.8, name: 'nonna', dur: 30, start() { V.S.nonnaReq = true; } },
      ];
    },
    onClear(e, V) {
      V.burst(V.X(0.25), V.H * 0.48, e.big ? 14 : 6, '#ffffff', { up: 80, sp: 60, g: 40, life: 1.2, sz: 1.8 }); // flour puff
      V.tables.forEach((tb) => { if (tb.state === 'eating') V.burst(tb.x, tb.y - 20 * V.u, e.big ? 8 : 3, () => pick(['#2a8a2a', '#3aa03a']), { kind: 'confetti', up: 120, sp: 50, life: 1.2, sz: 2 }); });
      if (e.big) { V.agents.forEach((a) => { if (a.sitting && Math.random() < 0.4) { a.act = 'chefkiss'; a.actT = 0; } }); SFX('clink'); }
    },
  };
  defineWorld({ id: 'pizzeria', thumbY: 0.4 }, makeVenue(cfg));
})();
