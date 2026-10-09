/* ================= World 10: Taiwanese Night Market (夜市) =================
   A lantern-lit alley of Taipei shophouses with glowing vertical signs and the temple gate at the end.
   Stalls: 大雞排 giant fried chicken cutlet (dropped in the wok, snipped with scissors, shaken with pepper
   salt in a paper bag), 臭豆腐 stinky tofu with pickled cabbage, 蚵仔煎 oyster omelette on the griddle,
   珍珠奶茶 bubble tea shaken and sealed, and a 射氣球 balloon-dart game. Two queues; customers take their food
   and eat while they stroll, others just browse, photograph and graze. Red stools and folding tables.
   Events: the giant cutlet held up for photos, fireworks over the rooftops, a scooter beeping through the
   crowd, a kid winning a huge plush, and the 電音三太子 (Electric Third Prince) temple dancers parading. */
(() => {
  const K = Kit, SFX = K.SFX, A = K.A;
  const RED = '#d8242a', GOLD = '#f4c040';
  /* ---------- food props ---------- */
  const cutletBag = (c, x, y) => { c.save(); c.translate(x + 2, y - 2); c.fillStyle = '#f2ead6'; c.beginPath(); c.moveTo(-5, -2); c.lineTo(5, -2); c.lineTo(4, 8); c.lineTo(-4, 8); c.closePath(); c.fill(); c.fillStyle = RED; c.fillRect(-4.6, 2, 9.2, 1.4); c.fillStyle = '#d8902a'; K.blob(c, 0, -6, 6, 10, 0.3, 4); c.fill(); c.fillStyle = 'rgba(255,220,140,0.7)'; for (let k = 0; k < 5; k++) c.fillRect(-4 + k * 2, -9 + (k % 2) * 3, 1, 1); c.fillStyle = '#c83a1a'; c.fillRect(-2, -7, 0.8, 0.8); c.restore(); };
  const teaCup = (flav) => (c, x, y) => { c.save(); c.translate(x + 1, y - 4); c.fillStyle = 'rgba(240,248,255,0.5)'; c.beginPath(); c.moveTo(-3.2, -6); c.lineTo(3.2, -6); c.lineTo(2.5, 6); c.lineTo(-2.5, 6); c.closePath(); c.fill(); c.fillStyle = flav || '#c89a6a'; c.beginPath(); c.moveTo(-3, -4); c.lineTo(3, -4); c.lineTo(2.5, 6); c.lineTo(-2.5, 6); c.closePath(); c.fill(); c.fillStyle = '#2a140a'; for (let k = 0; k < 6; k++) { ellipse(c, -1.8 + (k % 3) * 1.8, 4.6 - Math.floor(k / 3) * 1.4, 0.75, 0.75); c.fill(); } c.fillStyle = '#e8e0f0'; c.fillRect(-3.4, -6.4, 6.8, 0.9); c.fillStyle = '#e83a6a'; c.fillRect(0.4, -13, 1.4, 7.4); c.restore(); };
  const tofuBox = (c, x, y) => { c.save(); c.translate(x + 2, y - 1); c.fillStyle = '#f4f0e6'; c.fillRect(-5, -2, 10, 5); c.fillStyle = '#c87a2a'; for (let k = 0; k < 3; k++) { c.fillRect(-4.4 + k * 3, -4.4, 2.6, 2.6); } c.fillStyle = '#e8e0a0'; c.fillRect(-4, -5, 8, 1); c.fillStyle = '#c8281a'; c.fillRect(-3, -4.6, 1, 1); c.restore(); };
  const omeletPlate = (c, x, y) => { c.save(); c.translate(x + 2, y); ellipse(c, 0, 0, 6, 2); c.fillStyle = '#f4f4f0'; c.fill(); ellipse(c, 0, -1, 4.6, 1.6); c.fillStyle = '#e8c890'; c.fill(); c.fillStyle = '#e8506a'; ellipse(c, 0, -1.4, 3, 0.9); c.fill(); c.restore(); };
  const sausage = (c, x, y, ang) => { c.save(); c.translate(x, y); c.rotate((ang || 0) - 0.5); c.strokeStyle = '#d8b880'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(-4, 0); c.lineTo(6, 0); c.stroke(); c.fillStyle = '#b8342a'; roundRect(c, 4, -1.6, 9, 3.2, 1.6); c.fill(); c.fillStyle = 'rgba(60,10,0,0.5)'; for (let k = 0; k < 3; k++) c.fillRect(6 + k * 2.4, -1.6, 0.6, 3.2); c.restore(); };
  const tanghulu = (c, x, y, ang) => { c.save(); c.translate(x, y); c.rotate((ang || 0) - 0.9); c.strokeStyle = '#d8b880'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(-3, 0); c.lineTo(14, 0); c.stroke(); for (let k = 0; k < 4; k++) { ellipse(c, 4 + k * 3, 0, 1.7, 1.5); c.fillStyle = k === 1 ? '#3a8a2a' : '#e8202a'; c.fill(); c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(3.4 + k * 3, -1, 0.7, 0.6); } c.restore(); };
  const plush = (c, x, y) => { c.save(); c.translate(x - 4, y - 14); c.fillStyle = '#c89060'; ellipse(c, 0, 10, 9, 11); c.fill(); ellipse(c, 0, -4, 8, 7); c.fill(); [-1, 1].forEach((d) => { ellipse(c, d * 6, -10, 3, 3); c.fill(); }); c.fillStyle = '#f4e0c0'; ellipse(c, 0, -1, 3.4, 2.4); c.fill(); ellipse(c, 0, 11, 5, 6); c.fill(); c.fillStyle = '#2a1a10'; [-1, 1].forEach((d) => { ellipse(c, d * 3, -5, 0.9, 0.9); c.fill(); }); c.fillStyle = '#e83a5a'; c.fillRect(-3, 3, 6, 1.4); c.restore(); };
  const FLAV = ['#c89a6a', '#b88ac8', '#a8c878', '#f0b878', '#f6c0c8'];
  /* ---------- outside: rooftops, Taipei 101 on the horizon ---------- */
  function skyline(c, x, y, w, h, lights, V) {
    const u = V.u, gy = y + h;
    c.fillStyle = mix('#2a2a3a', '#7a8aa0', 1 - Math.min(1, lights)); 
    for (let k = 0; k < 14; k++) { const bw = w / 14, bh = h * (0.25 + ((k * 37) % 7) / 18); c.fillRect(x + k * bw, gy - bh, bw + 1, bh); }
    // Taipei 101: stacked pagoda segments
    const tx = x + w * 0.58, base = gy - h * 0.3; c.fillStyle = mix('#3a4458', '#8a9ab0', 1 - lights);
    c.fillRect(tx - 7 * u, base - 30 * u, 14 * u, 30 * u);
    for (let s = 0; s < 8; s++) { const sy = base - 30 * u - (s + 1) * 13 * u; c.beginPath(); c.moveTo(tx - 6 * u, sy + 13 * u); c.lineTo(tx - 8 * u, sy); c.lineTo(tx + 8 * u, sy); c.lineTo(tx + 6 * u, sy + 13 * u); c.closePath(); c.fill(); if (lights > 0.4) { c.fillStyle = `rgba(150,230,200,${0.5 * lights})`; c.fillRect(tx - 7 * u, sy + 1 * u, 14 * u, 1.2 * u); c.fillStyle = mix('#3a4458', '#8a9ab0', 1 - lights); } }
    const top = base - 30 * u - 8 * 13 * u; c.fillRect(tx - 3 * u, top - 12 * u, 6 * u, 12 * u); c.fillRect(tx - 0.8 * u, top - 34 * u, 1.6 * u, 22 * u);
    if (lights > 0.4 && Math.sin(V.t * 3) > 0) { c.fillStyle = '#ff4a4a'; c.fillRect(tx - 1 * u, top - 35 * u, 2 * u, 2 * u); }
  }
  /* ---------- static art: shophouses with arcades + vertical lightbox signs (drawn over the sky) ---------- */
  const SIGNS = [['鹽酥雞', '#e8302a', '#fff8e0'], ['豆花', '#2a7ad8', '#ffffff'], ['滷味', '#f0c020', '#5a1a0a'], ['刈包', '#2a9a5a', '#ffffff'], ['芒果冰', '#f08a20', '#ffffff'], ['小籠包', '#d8242a', '#ffe060'], ['牛排', '#7a3ab0', '#ffffff'], ['甜不辣', '#e8406a', '#ffffff']];
  function houses(x, V) {
    const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(31);
    const cols = ['#c8b8a0', '#a8b0b0', '#d8c8b0', '#b8a898', '#c0c8c0', '#d0b8a8'];
    for (let k = 0; k < 9; k++) { const x0 = X(k / 9) - 2, w = X(1 / 9) + 4, top = H * (0.08 + (k % 3) * 0.03);
      x.fillStyle = shade(cols[k % cols.length], -0.15); x.fillRect(x0, top, w, H * 0.6 - top);
      for (let q = 0; q < 30; q++) { x.fillStyle = 'rgba(0,0,0,0.05)'; x.fillRect(x0 + rnd() * w, top + rnd() * (H * 0.5 - top), 6 * u, 1 * u); }
      for (let fl = 0; fl < 3; fl++) { const wy = top + 14 * u + fl * 46 * u; if (wy > H * 0.4) break; [0.18, 0.58].forEach((f) => { const wx = x0 + w * f; x.fillStyle = '#2a3038'; x.fillRect(wx, wy, w * 0.26, 28 * u); x.strokeStyle = '#5a5a5a'; x.lineWidth = 1; for (let b = 1; b < 5; b++) { x.beginPath(); x.moveTo(wx + b * w * 0.052, wy); x.lineTo(wx + b * w * 0.052, wy + 28 * u); x.stroke(); } }); if (rnd() < 0.6) { x.fillStyle = '#d8d8d0'; x.fillRect(x0 + w * 0.62, top + 46 * u + fl * 46 * u, 18 * u, 11 * u); x.fillStyle = '#9a9a92'; for (let g = 0; g < 4; g++) x.fillRect(x0 + w * 0.63, top + 48 * u + fl * 46 * u + g * 2.5 * u, 16 * u, 0.8 * u); } }
      // arcade (騎樓) columns
      x.fillStyle = shade(cols[k % cols.length], -0.35); x.fillRect(x0, H * 0.4, w, H * 0.2); x.fillStyle = shade(cols[k % cols.length], -0.05); x.fillRect(x0 + 2, H * 0.4, 8 * u, H * 0.2); x.fillRect(x0, H * 0.395, w, 6 * u); }
    // temple gate (牌樓) at the end of the alley
    const gx = X(0.5), gy = H * 0.12; x.fillStyle = '#b81a1a'; x.fillRect(gx - X(0.13), gy + 40 * u, 12 * u, H * 0.3); x.fillRect(gx + X(0.13) - 12 * u, gy + 40 * u, 12 * u, H * 0.3);
    x.fillStyle = '#2a8a6a'; x.beginPath(); x.moveTo(gx - X(0.16), gy + 26 * u); x.quadraticCurveTo(gx - X(0.15), gy + 14 * u, gx - X(0.17), gy + 4 * u); x.lineTo(gx + X(0.17), gy + 4 * u); x.quadraticCurveTo(gx + X(0.15), gy + 14 * u, gx + X(0.16), gy + 26 * u); x.closePath(); x.fill();
    x.fillStyle = '#c82020'; x.fillRect(gx - X(0.14), gy + 26 * u, X(0.28), 20 * u); x.fillStyle = GOLD; x.fillRect(gx - X(0.14), gy + 26 * u, X(0.28), 2 * u); x.fillRect(gx - X(0.14), gy + 44 * u, X(0.28), 2 * u);
    K.jp(x, '饒河街觀光夜市', gx, gy + 36 * u, 15 * u, GOLD);
    // swallow-tail ridge
    x.strokeStyle = '#2a6a5a'; x.lineWidth = 3 * u; x.beginPath(); x.moveTo(gx - X(0.17), gy + 4 * u); x.quadraticCurveTo(gx - X(0.19), gy - 4 * u, gx - X(0.2), gy - 12 * u); x.moveTo(gx + X(0.17), gy + 4 * u); x.quadraticCurveTo(gx + X(0.19), gy - 4 * u, gx + X(0.2), gy - 12 * u); x.stroke();
    x.fillStyle = GOLD; ellipse(x, gx, gy - 2 * u, 6 * u, 6 * u); x.fill();
  }
  // stall frames: counter fronts drawn in the counter layer; back walls/menus here
  const STALLS = [
    { x0: 0.0, x1: 0.19, name: '大雞排', sub: '比臉還大', col: '#e8302a', price: '$90' },
    { x0: 0.19, x1: 0.345, name: '臭豆腐', sub: '酥炸 · 泡菜', col: '#2a6a3a', price: '$60' },
    { x0: 0.655, x1: 0.81, name: '蚵仔煎', sub: '新鮮蚵仔', col: '#f08a20', price: '$70' },
    { x0: 0.81, x1: 1.0, name: '珍珠奶茶', sub: '手搖飲', col: '#7a3ab0', price: '$55' },
  ];
  function stallBacks(x, V) {
    const H = V.H, u = V.u, X = V.X;
    STALLS.forEach((s, i) => { const x0 = X(s.x0) + 4 * u, x1 = X(s.x1) - 4 * u, w = x1 - x0;
      // striped awning
      for (let k = 0; k < 10; k++) { x.fillStyle = k % 2 ? '#f4f0e8' : s.col; x.beginPath(); x.moveTo(x0 + k * w / 10, H * 0.34); x.lineTo(x0 + (k + 1) * w / 10, H * 0.34); x.lineTo(x0 + (k + 1) * w / 10 + 3 * u, H * 0.4); x.lineTo(x0 + k * w / 10 + 3 * u, H * 0.4); x.fill(); }
      for (let k = 0; k < 10; k++) { x.fillStyle = k % 2 ? '#f4f0e8' : s.col; x.beginPath(); x.arc(x0 + (k + 0.5) * w / 10 + 3 * u, H * 0.4, w / 20, 0, Math.PI); x.fill(); }
      // sign board
      x.fillStyle = s.col; roundRect(x, x0 + w * 0.08, H * 0.262, w * 0.84, H * 0.07, 5 * u); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 2 * u; x.stroke();
      K.jp(x, s.name, x0 + w / 2, H * 0.29, Math.min(26 * u, w * 0.2), '#fff8e0', { stroke: shade(s.col, -0.5) });
      K.jp(x, s.sub, x0 + w / 2, H * 0.318, 10 * u, '#ffe8a0');
      // back wall (stainless + tiles), menu strip with price
      x.fillStyle = linear(x, x0, 0, x1, 0, [[0, '#6a6e74'], [0.3, '#a8acb2'], [0.6, '#8a8e94'], [1, '#5a5e64']]); x.fillRect(x0, H * 0.42, w, H * 0.18);
      for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(40,30,20,0.12)'; x.fillRect(x0 + Math.random() * w, H * 0.42 + Math.random() * H * 0.18, 4 * u, 1 * u); }
      // hanging red paper menu strips (品項 + 價錢)
      const MENU = [['原味', '辣味', '梅粉', '起司'], ['麻辣', '清蒸', '泡菜', '加辣'], ['蚵仔', '蝦仁', '加蛋', '綜合'], ['波霸', '布丁', '仙草', '烏龍']][i];
      MENU.forEach((m, q) => { const mx = x0 + w * (0.5 + q * 0.12), my = H * 0.425; x.fillStyle = q % 2 ? '#e8302a' : '#f4c040'; x.fillRect(mx, my, w * 0.1, H * 0.085); K.jp(x, m, mx + w * 0.05, my + H * 0.026, Math.min(10 * u, w * 0.07), q % 2 ? '#fff8e0' : '#5a1a0a', { v: true }); K.txt(x, '$' + (50 + q * 10), mx + w * 0.05, my + H * 0.075, 7 * u, q % 2 ? '#ffe060' : '#a81a10'); });
      // condiment shelf with bottles & a little fan
      x.fillStyle = '#4a3a2a'; x.fillRect(x0 + w * 0.05, H * 0.535, w * 0.4, 3 * u); for (let q = 0; q < 6; q++) { x.fillStyle = ['#c8281e', '#e8c040', '#2a6a2a', '#5a2a10', '#f4f0e0', '#e86a1a'][q]; roundRect(x, x0 + w * 0.07 + q * w * 0.06, H * 0.535 - 14 * u, 6 * u, 14 * u, 2 * u); x.fill(); }
      x.fillStyle = '#2a2a2a'; x.fillRect(x1 - 18 * u, H * 0.56, 14 * u, 22 * u); x.fillStyle = '#c8c8c8'; x.fillRect(x1 - 16 * u, H * 0.565, 10 * u, 6 * u);
      x.fillStyle = '#fff8e8'; x.fillRect(x0 + w * 0.06, H * 0.43, w * 0.36, H * 0.06); K.jp(x, s.name, x0 + w * 0.24, H * 0.448, 9 * u, '#2a1a10'); K.txt(x, s.price, x0 + w * 0.24, H * 0.474, 10 * u, RED);
      // poles
      x.fillStyle = '#8a8a8a'; x.fillRect(x0, H * 0.34, 3 * u, H * 0.3); x.fillRect(x1 - 3 * u, H * 0.34, 3 * u, H * 0.3); });
    // balloon-dart game board behind the bubble-tea stand's right side is drawn live (balloons pop)
  }
  function counters(x, V) {
    const H = V.H, u = V.u, X = V.X, top = H * 0.6;
    STALLS.forEach((s, i) => { const x0 = X(s.x0) + 2 * u, x1 = X(s.x1) - 2 * u, w = x1 - x0;
      x.fillStyle = linear(x, 0, top, 0, H * 0.74, [[0, '#e8ecf0'], [0.08, '#a8b0b8'], [0.1, shade(s.col, -0.1)], [1, shade(s.col, -0.5)]]); x.fillRect(x0, top, w, H * 0.14);
      x.fillStyle = 'rgba(255,255,255,0.85)'; roundRect(x, x0 + w * 0.15, top + H * 0.035, w * 0.7, H * 0.06, 4 * u); x.fill();
      K.jp(x, s.name, x0 + w / 2, top + H * 0.065, Math.min(20 * u, w * 0.15), shade(s.col, -0.2));
      x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(x0, top + H * 0.135, w, 4 * u); });
    // equipment on the counters
    const fx = X(0.095); x.fillStyle = '#2a2a2a'; ellipse(x, fx, top - 2 * u, 34 * u, 7 * u); x.fill(); // wok rim (oil drawn live)
    x.fillStyle = '#3a3a3a'; x.fillRect(X(0.67), top - 6 * u, X(0.12), 6 * u); // griddle
    x.fillStyle = '#d8d8d8'; x.fillRect(X(0.84), top - 34 * u, 22 * u, 34 * u); x.fillStyle = '#4a4a4a'; x.fillRect(X(0.843), top - 30 * u, 16 * u, 10 * u); // sealer machine
    [0.2, 0.33].forEach((f) => { x.fillStyle = '#e8e4d8'; x.fillRect(X(f), top - 10 * u, 20 * u, 10 * u); }); // tofu trays
  }
  /* ---------- world ---------- */
  const vendor = (o) => Object.assign({ skin: 'light', hair: 'black', hairStyle: 'short', top: { type: 'apron', col: '#f4f0e8', col2: '#3a5a8a' }, sleeves: 'short', pants: '#2a2a3a' }, o);
  const cfg = {
    id: 'nightmarket', flow: 'counter', seed: 1010, cap: 16, spawnEvery: 2.4, lane: 0.975, peopleScale: 1.55, cat: false, initial: 6, outdoor: true,
    door: { x: -0.07 }, vignette: 'rgba(10,4,10,0.5)', wetSignX: 2,
    lights: [{ x: 0.1, y: 0.42, r: 200, col: '#ffcf8a', a: 0.22 }, { x: 0.27, y: 0.42, r: 160, col: '#ffcf8a', a: 0.18 }, { x: 0.73, y: 0.42, r: 160, col: '#ffcf8a', a: 0.18 }, { x: 0.9, y: 0.42, r: 200, col: '#ffcf8a', a: 0.22 }, { x: 0.5, y: 0.2, r: 260, col: '#ff7a4a', a: 0.12 }],
    windows: [{ x: 0, y: 0, w: 1, h: 0.36, city: skyline }],
    look(rnd, V, opt) { const L = Looks.random(rnd, opt.look || {}); if (rnd() < 0.8) { L.skin = Looks.pickR(rnd, ['pale', 'light', 'light', 'tan']); if (L.age !== 'old') L.hair = Looks.pickR(rnd, ['black', 'black', 'dbrown', 'brown']); } if (rnd() < 0.3) L.top.type = 'tee'; return L; },
    setup(V) {
      V.S.cut = V.addStaff({ role: 'cook', lane: 0, layer: 'back', armsOver: true, x: 0.095, y: 0.46, k: 0.92, look: vendor({ skin: 'tan', hairStyle: 'buzz', acc: { hat: 'headband', hatCol: '#f4f4f4', stubble: true }, build: 1.15, top: { type: 'apron', col: '#c8281e', col2: '#2a2a2a' } }), idle: [['fry', 2.4], ['snip', 1.6], ['fry', 2], ['shakeBag', 1.4]] });
      V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.27, y: 0.47, k: 0.88, look: vendor({ female: true, lashes: true, age: 'old', hair: 'grey', hairStyle: 'perm', acc: { hat: 'sunhat', hatCol: '#e8e0c8' }, top: { type: 'apron', col: '#3a7a4a', col2: '#c83a3a' } }), idle: [['fryT', 2.2], ['scoop', 1.6], ['fryT', 1.8], ['callOut', 1.6]] });
      V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.73, y: 0.47, k: 0.88, look: vendor({ hairStyle: 'side', acc: { glasses: '#2a2a2a' }, top: { type: 'apron', col: '#e08a20', col2: '#2a4a8a' } }), idle: [['griddle', 2.4], ['crack', 1.4], ['flipO', 1.8], ['sauce', 1.4]] });
      V.S.tea = V.addStaff({ role: 'cook', lane: 1, layer: 'back', armsOver: true, x: 0.9, y: 0.46, k: 0.9, look: vendor({ female: true, lashes: true, hairStyle: 'pony', acc: { hat: 'cap', hatCol: '#7a3ab0', earrings: '#d8d8e0' }, top: { type: 'polo', col: '#7a3ab0' } }), idle: [['shakeT', 2], ['seal', 1.4], ['scoopP', 1.6]] });
      V.S.balloons = Array.from({ length: 24 }, (_, i) => ({ i, pop: 0, col: pick(['#ff4a5a', '#ffd040', '#4ab0ff', '#6ad08a', '#ff8ad0', '#ffffff']) }));
      V.S.fw = []; V.S.tables = [[0.6, 0.86], [0.42, 0.9]].map(([f, y]) => ({ x: V.X(f), y: V.Y(y) }));
    },
    seats(V) { const sc = V.sc; return [[-30, 1, 0], [30, -1, 0], [-30, 1, 1], [30, -1, 1]].map(([dx, dir, ti]) => ({ x: V.S.tables[ti].x + dx * V.u, y: V.S.tables[ti].y - 56 * sc, dir, tableRef: V.S.tables[ti], legs: 'stool' })); },
    queues(V) { const X = V.X, L = V.lane(); return [[0.095, 1], [0.9, -1]].map(([f, d]) => [0, 1, 2, 3, 4].map((i) => [X(f) + i * 34 * V.u * d, L - (i % 2) * 5 * V.u, X(f)])); },
    orderDesk: { lookX: 0.5 },
    standSpots: [[0.22, 0, 1], [0.78, 2, -1], [0.3, 4, 1]],
    dish(a, V) {
      const lane = V.Qs.indexOf(a.Q);
      const hand = lane === 0 ? cutletBag : teaCup(pick(FLAV));
      return { togo: Math.random() < 0.75, hand, utensil: () => hand, bites: 3, biteT: 2.2, eatAct: lane === 0 ? 'eat' : 'drink', sip: lane === 0 ? teaCup(pick(FLAV)) : null,
        togoWalk: function* (a, V) { a.item2 = hand; a.item = null; const tx = V.X(rand(0.2, 0.8)); a.act = 'walk'; yield ['walk', tx, V.lane() - rand(0, 12) * V.u]; for (let i = 0; i < 2; i++) { a.act = lane === 0 ? 'eat' : 'drink'; a.actT = 0; yield ['wait', 2.4]; a.act = 'talk'; a.actT = 0; yield ['wait', 1]; } if (Math.random() < 0.5) { a.act = 'walk'; yield ['walk', V.W + 50 * V.u, V.lane()]; a.done = true; } } };
    },
    prep(j, s, V) { return s === V.S.cut ? [['fry', 1.6], ['snip', 1.2], ['shakeBag', 1.2]] : [['scoopP', 1], ['shakeT', 1.6], ['seal', 1]]; },
    spawn(V, initial) {
      if (Math.random() < 0.55) return V.customer();
      // browsers/grazers: stroll through, stop at a stall to watch, snack, photograph, move on
      const dir = Math.random() < 0.5 ? 1 : -1;
      V.customer({ dx: dir > 0 ? 0 : V.W + 120 * V.u, life: function* (a) {
        a.item2 = Math.random() < 0.6 ? pick([sausage, tanghulu, tofuBox, omeletPlate, teaCup(pick(FLAV))]) : null;
        const stops = [rand(0.15, 0.4), rand(0.6, 0.88)]; if (dir < 0) stops.reverse();
        for (const f of stops) { a.act = 'walk'; yield ['walk', V.X(f), V.lane() - rand(4, 16) * V.u]; a.look = V.X(f); a.act = a.item2 ? (Math.random() < 0.5 ? 'eat' : 'talk') : Math.random() < 0.4 ? 'photo' : 'point'; a.actT = 0; yield ['wait', 2 + Math.random() * 2]; }
        a.act = 'walk'; yield ['walk', dir > 0 ? V.W + 50 * V.u : -60 * V.u, V.lane()]; a.done = true; } });
    },
    pose(s, ps, t, V) {
      const k = s.actT;
      switch (s.act) {
        case 'fry': { const b = Math.sin(k * 3) * 3; ps.arms = [A(-1, -4, 56, { grip: 'open' }), A(1, 16, 50 + b, { item: (c, x, y) => { c.strokeStyle = '#8a8a8a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6, y + 8); c.stroke(); } })]; ps.face.lookY = 1; ps.head.nod = 1; if (Math.random() < 0.08) SFX('sizzle'); return; }
        case 'snip': { const o = Math.abs(Math.sin(k * 12)); ps.arms = [A(-1, -6, 34, { grip: 'fist', item: (c, x, y) => { c.fillStyle = '#d8902a'; K.blob(c, x + 6, y - 6, 9, 10, 0.3, 2); c.fill(); } }), A(1, 14, 32, { item: (c, x, y) => { c.strokeStyle = '#c8ccd0'; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 6, y - 6 - o * 2); c.moveTo(x, y); c.lineTo(x - 6, y - 6 + o * 2); c.stroke(); } })]; ps.face.lookY = 0.8; if (o > 0.95 && Math.random() < 0.3) SFX('snip'); return; }
        case 'shakeBag': { const b = Math.sin(k * 16) * 3; ps.arms = [A(-1, -2, 36 + b, { item: cutletBag }), A(1, 10, 34 - b, { grip: 'open' })]; ps.face.mouth = 'smile'; if (Math.random() < 0.3) V.burst(s.x - 4 * V.sc, s.y + 30 * V.sc, 1, '#c83a1a', { up: 30, sp: 20, g: 200, life: 0.6, sz: 0.8 }); return; }
        case 'fryT': case 'griddle': { const b = Math.sin(k * 5) * 4; ps.arms = [A(-1, -6, 56, { grip: 'open' }), A(1, 14 + b, 54, { item: (c, x, y) => { c.fillStyle = '#c8ccd0'; c.fillRect(x, y - 1, 9, 2); c.fillRect(x + 8, y - 3, 4, 6); } })]; ps.face.lookY = 1; ps.head.nod = 1; return; }
        case 'scoop': ps.arms = [A(-1, 8, 46, { item: tofuBox }), A(1, 18, 50, { grip: 'open' })]; ps.face.mouth = 'smile'; return;
        case 'callOut': ps.arms = [A(-1, -14, 52), A(1, 22, 6, { grip: 'open', handAng: -1.4 })]; ps.face.mouth = 'talk'; ps.face.open = 0.8; if (k < 0.05) s.say = { txt: pick(['臭豆腐～香喔！', '來喔！現炸的！']), t: 1.8, jp: true }; return;
        case 'crack': ps.arms = [A(-1, 6, 48, { item: (c, x, y) => { ellipse(c, x + 2, y, 2, 2.4); c.fillStyle = '#f4f0e0'; c.fill(); } }), A(1, 12, 48, { grip: 'open' })]; ps.face.lookY = 1; return;
        case 'flipO': { const f = Math.sin((k % 1) * Math.PI); ps.arms = [A(-1, -4, 56, { grip: 'open' }), A(1, 14, 52 - f * 10, { item: (c, x, y) => { c.fillStyle = '#c8ccd0'; c.fillRect(x, y - 1, 9, 2); c.fillStyle = '#e8c890'; ellipse(c, x + 10, y - 2 - f * 3, 4, 1.2); c.fill(); } })]; ps.face.lookY = 1; return; }
        case 'sauce': ps.arms = [A(-1, -4, 56, { grip: 'open' }), A(1, 12 + Math.sin(k * 8) * 6, 44, { item: (c, x, y) => { c.fillStyle = '#e8506a'; roundRect(c, x - 2, y - 7, 4, 8, 1); c.fill(); } })]; ps.face.lookY = 1; return;
        case 'shakeT': { const b = Math.sin(k * 18) * 6; ps.arms = [A(-1, 4, 20 + b, { grip: 'open' }), A(1, 8, 26 + b, { item: (c, x, y) => { c.fillStyle = '#d8d8e0'; roundRect(c, x - 3, y - 12, 6, 13, 1.5); c.fill(); } })]; ps.face.mouth = 'big'; ps.head.tilt = b * 0.01; return; }
        case 'seal': { const p = Math.abs(Math.sin(k * 4)); ps.arms = [A(-1, -12, 40 - p * 6, { grip: 'open' }), A(1, 10, 48, { item: teaCup('#c89a6a') })]; ps.face.lookY = 1; if (p > 0.97 && Math.random() < 0.3) SFX('pop'); return; }
        case 'scoopP': ps.arms = [A(-1, -2, 50, { item: teaCup('#b88ac8') }), A(1, 14, 46 + Math.sin(k * 6) * 3, { item: (c, x, y) => { c.fillStyle = '#c8ccd0'; ellipse(c, x + 4, y, 3, 1.6); c.fill(); c.fillStyle = '#2a140a'; ellipse(c, x + 4, y - 1, 2, 1); c.fill(); } })]; ps.face.lookY = 1; return;
        case 'hand': ps.arms = [A(-1, -6, 50, { grip: 'open' }), A(1, 26, 40, { item: s.job && s.job.dish && s.job.dish.hand })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; if (s.actT < 0.05) s.say = { txt: s === V.S.cut ? '雞排好了！' : '謝謝光臨！', t: 1.4, jp: true }; return;
        case 'hoist': ps.arms = [A(-1, -16, -34, { grip: 'open' }), A(1, 16, -34, { grip: 'open' })]; ps.over = (c) => { c.save(); c.translate(0, -36); c.fillStyle = radial(c, -6, -8, 30, [[0, '#f8c870'], [0.6, '#d8902a'], [1, '#9a5414']]); K.blob(c, 0, -14, 24, 18, 0.22, 9); c.fill(); for (let q = 0; q < 40; q++) { c.fillStyle = q % 3 ? 'rgba(255,236,170,0.8)' : 'rgba(120,50,10,0.6)'; c.fillRect(-18 + (q * 37 % 36), -30 + (q * 13 % 30), 1.6, 1.2); } c.fillStyle = '#c83a1a'; for (let q = 0; q < 8; q++) c.fillRect(-14 + q * 4, -20 + (q % 3) * 6, 1, 1); c.restore(); }; ps.face.mouth = 'laugh'; ps.face.open = 0.7; ps.face.eyes = 'happy'; return;
      }
      return false;
    },
    custPose(a, ps, t, V) { if (a.act === 'photo') { ps.arms = [A(-1, -4, -4, { item: Items.phone }), A(1, 6, -2, { grip: 'open' })]; ps.face.lookY = 0; ps.face.mouth = 'o'; ps.face.open = 0.3; if (Math.sin(t * 5 + a.seed) > 0.97) K.glowAt(V.ctx, a.x + 4 * V.sc * a.face, a.y - 128 * V.sc, 26 * V.u, '#ffffff', 0.9); } if (a.plush) ps.arms = [A(-1, -6, 26, { item: plush }), A(1, 8, 26)]; if (a.lookUp > 0) { ps.face.mouth = 'o'; ps.face.open = 0.6; ps.head.nod = -1.2; ps.face.lookY = -1; } if (a.sanT) { /* Third Prince dancer drawn via floorProps */ } },
    tick(V, dt, t) {
      K.sweep(V);
      V.agents.forEach((a) => { if (a.lookUp > 0) a.lookUp -= dt; });
      // fireworks: crowd looks up
      if (V.S.fwOn && Math.random() < dt * 0.6) { const a = pick(V.agents); if (a && !a.sitting) { a.lookUp = 3; if (Math.random() < 0.4) a.say = { txt: pick(['哇！', '好漂亮！', 'Wow!']), t: 1.6, jp: true }; } }
      // balloon game: someone throws darts now and then
      V.S.dartT = (V.S.dartT || 4) - dt; if (V.S.dartT <= 0) { V.S.dartT = 2 + Math.random() * 3; const b = pick(V.S.balloons.filter((q) => !q.pop)); if (b) { b.pop = 1; SFX('pop'); } }
      V.S.balloons.forEach((b) => { if (b.pop) { b.pop += dt; if (b.pop > 6) b.pop = 0; } });
      // events
      if (V.S.hoistReq) { V.S.hoistReq = false; const s = V.S.cut; Crowd.hijack(s, (function* () { s.act = 'hoist'; s.actT = 0; s.say = { txt: '比臉還大！', t: 3, jp: true }; SFX('cheer'); yield ['wait', 4]; })()); V.agents.slice(0, 5).forEach((a) => { if (!a.sitting) { a.photo = 3; Crowd.hijack(a, (function* () { a.look = V.S.cut.x; a.act = 'photo'; a.actT = 0; yield ['wait', 3]; a.act = 'clap'; a.actT = 0; yield ['wait', 1]; })()); } }); }
      if (V.S.plushReq) { V.S.plushReq = false; K.actor(V, { x: 1.05, look: { age: 'kid', female: true, hairStyle: 'twin', skin: 'light', hair: 'black', top: { type: 'tee', col: '#ff8ab0' } } }, function* (s) { s.act = 'walk'; yield ['walk', V.X(0.95), V.lane() - 14 * V.u]; s.face = 1; for (let i = 0; i < 3; i++) { s.act = 'point'; s.actT = 0; yield ['wait', 0.8]; V.S.balloons.filter((q) => !q.pop).slice(0, 3).forEach((q) => { q.pop = 0.01; }); SFX('pop'); } s.plush = true; s.say = { txt: '我贏了！', t: 2.4, jp: true }; s.cheer = 2; SFX('fanfare'); V.agents.forEach((a) => { if (Math.random() < 0.5) a.cheer = 1.4; }); yield ['wait', 2.4]; s.act = 'walk'; yield ['walk', -V.X(0.08), V.lane()]; }); }
      if (V.S.scootReq) { V.S.scootReq = false; V.S.scoot = { x: V.W + 80 * V.u, beep: 0 }; }
      const sc = V.S.scoot; if (sc) { sc.x -= 110 * V.u * dt; sc.beep -= dt; if (sc.beep <= 0) { sc.beep = 1.4; SFX('bell'); } V.agents.forEach((a) => { if (!a.sitting && Math.abs(a.x - sc.x) < 60 * V.u && a.react <= 0) a.react = 0.8; }); if (sc.x < -100 * V.u) V.S.scoot = null; }
      if (V.S.santReq) { V.S.santReq = false; V.S.sant = { x: -120 * V.u, t: 0 }; SFX('drum'); }
      const sn = V.S.sant; if (sn) { sn.t += dt; sn.x += 40 * V.u * dt; if (Math.floor(sn.t * 2) !== Math.floor((sn.t - dt) * 2) && Math.floor(sn.t * 2) % 4 === 0) SFX('drum'); if (Math.random() < dt * 2) { const a = pick(V.agents); if (a && !a.sitting) a.cheer = 1; } if (sn.x > V.W + 200 * V.u) V.S.sant = null; }
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H, lit = Amb.st.lights; V.ctx = ctx;
      if (V.S.fwOn) K.fireworks(ctx, V, V.S.fw, dt, 0, 0, V.W, H * 0.34);
      ctx.drawImage(K.layer(V, 'houses', houses), 0, 0, V.W, V.H);
      // vertical lightbox signs on the shophouses (glow after dusk)
      SIGNS.forEach(([txt, col, ink], i) => { const sx = X(0.04 + i * 0.124 + (i > 3 ? 0.02 : 0)), sy = H * (0.07 + (i % 3) * 0.03), n = [...txt].length, hh = n * 22 * u + 10 * u;
        ctx.fillStyle = shade(col, lit > 0.3 ? 0.1 : -0.15); roundRect(ctx, sx - 13 * u, sy, 26 * u, hh, 3 * u); ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.4 * u; ctx.stroke();
        K.jp(ctx, txt, sx, sy + 16 * u, 18 * u, ink, { v: true, sp: 1.2, glow: lit > 0.3 ? ink : null });
        if (lit > 0.3) K.glowAt(ctx, sx, sy + hh / 2, 50 * u, col, 0.25 * lit); });
      // strings of red lanterns criss-crossing the alley
      for (let r = 0; r < 2; r++) { const y0 = H * (0.2 + r * 0.06); for (let k = 0; k < 11; k++) { const f = (k + 0.5 + r * 0.5) / 11, x = X(f), y = y0 + Math.sin(f * Math.PI) * 26 * u; K.lantern(ctx, x, y, (r ? 11 : 14) * u, k % 3 === 1 ? '#f4c040' : RED, r ? '' : '夜', t, lit); } ctx.strokeStyle = 'rgba(30,20,20,0.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, y0 - 15 * u); ctx.quadraticCurveTo(V.W / 2, y0 + 52 * u - 22 * u, V.W, y0 - 22 * u); ctx.stroke(); }
      ctx.drawImage(K.layer(V, 'stalls', stallBacks), 0, 0, V.W, V.H);
      // bare incandescent bulbs dangling from the awnings
      STALLS.forEach((st, i) => [0.25, 0.75].forEach((f, q) => { const bx = X(st.x0 + (st.x1 - st.x0) * f), sw = Math.sin(t * 1.5 + i + q) * 2 * u, by = H * 0.405 + (q ? 5 : 0) * u; ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, H * 0.395); ctx.lineTo(bx + sw, by); ctx.stroke(); ctx.fillStyle = '#3a3a3a'; ctx.fillRect(bx + sw - 2 * u, by - 1 * u, 4 * u, 3 * u); ellipse(ctx, bx + sw, by + 5 * u, 4 * u, 5 * u); ctx.fillStyle = lit > 0.2 ? '#fff8d8' : '#d8d0b0'; ctx.fill(); ctx.fillStyle = '#ff9a3a'; ctx.fillRect(bx + sw - 1.4 * u, by + 4 * u, 2.8 * u, 1 * u); K.glowAt(ctx, bx + sw, by + 4 * u, 60 * u, '#ffc870', 0.18 + 0.3 * lit); }));
      // balloon wall (right of tea stand top)
      V.S.balloons.forEach((b) => { const bx = X(0.835) + (b.i % 8) * 13 * u, by = H * 0.495 + Math.floor(b.i / 8) * 13 * u; if (b.pop && b.pop < 0.3) { V.burst(bx, by, 4, b.col, { kind: 'confetti', up: 60, sp: 60, life: 0.6, sz: 1.4 }); return; } if (b.pop) return; ellipse(ctx, bx, by, 5 * u, 6 * u); ctx.fillStyle = b.col; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(ctx, bx - 1.6 * u, by - 2 * u, 1.2 * u, 2 * u); ctx.fill(); });
      ctx.fillStyle = '#2a1a10'; ctx.fillRect(X(0.83), H * 0.48, X(0.16), 3 * u); K.jp(ctx, '射氣球', X(0.91), H * 0.473, 9 * u, '#ffe060');
      // the cutlet wok: bubbling oil + cutlets; stinky-tofu stink; oyster omelettes on the griddle; tea shaker cups
      const top = H * 0.6, wx = X(0.095);
      ellipse(ctx, wx, top - 3 * u, 30 * u, 5.5 * u); ctx.fillStyle = '#c89030'; ctx.fill();
      for (let b = 0; b < 8; b++) { const p = (t * 1.6 + b * 0.37) % 1; ctx.fillStyle = `rgba(255,240,180,${1 - p})`; ellipse(ctx, wx - 24 * u + ((b * 53) % 48) * u, top - 3 * u, 1.6 * u * (1 + p), 1 * u); ctx.fill(); }
      ctx.fillStyle = '#b8701a'; K.blob(ctx, wx - 6 * u, top - 4 * u, 12 * u, 10, 0.25, 7); ctx.fill();
      if (Math.random() < 0.08) V.steam(wx + rand(-24, 24) * u, top - 8 * u, 1, 0.6);
      ctx.save(); ctx.strokeStyle = 'rgba(160,200,120,0.25)'; ctx.lineWidth = 1.4 * u; for (let k = 0; k < 3; k++) { const p = (t * 0.4 + k * 0.33) % 1, sx = X(0.215 + k * 0.05); ctx.globalAlpha = Math.sin(p * Math.PI); ctx.beginPath(); ctx.moveTo(sx, top - 12 * u - p * 50 * u); ctx.bezierCurveTo(sx + 8 * u, top - 20 * u - p * 50 * u, sx - 8 * u, top - 28 * u - p * 50 * u, sx + 2 * u, top - 36 * u - p * 50 * u); ctx.stroke(); } ctx.restore();
      [0.2, 0.33].forEach((f) => { for (let q = 0; q < 4; q++) { ctx.fillStyle = '#c87a2a'; ctx.fillRect(X(f) + 2 * u + q * 4.5 * u, top - 14 * u, 4 * u, 4 * u); } });
      for (let q = 0; q < 3; q++) { const ox = X(0.685) + q * 30 * u, ph = (t * 0.2 + q * 0.3) % 1; ellipse(ctx, ox, top - 7 * u, 12 * u, 3 * u); ctx.fillStyle = mix('#f4f0e0', '#e8c070', ph); ctx.fill(); ctx.fillStyle = '#7a8a7a'; for (let o = 0; o < 4; o++) { ellipse(ctx, ox - 7 * u + o * 4.5 * u, top - 7.5 * u, 1.6 * u, 1.1 * u); ctx.fill(); } ctx.fillStyle = '#4a9a3a'; ctx.fillRect(ox - 4 * u, top - 9 * u, 6 * u, 1.2 * u); if (ph > 0.6) { ctx.fillStyle = '#e8506a'; ellipse(ctx, ox, top - 8 * u, 7 * u, 1.4 * u); ctx.fill(); } }
      if (Math.random() < 0.15) V.steam(X(0.72), top - 10 * u, 1, 0.7);
      for (let q = 0; q < 5; q++) { const cx = X(0.87) + q * 9 * u; ctx.fillStyle = 'rgba(240,248,255,0.5)'; ctx.fillRect(cx, top - 16 * u, 6 * u, 16 * u); ctx.fillStyle = FLAV[q]; ctx.fillRect(cx + 0.5 * u, top - 12 * u, 5 * u, 12 * u); ctx.fillStyle = '#2a140a'; ctx.fillRect(cx + 0.5 * u, top - 3 * u, 5 * u, 3 * u); }
    },
    counter: counters,
    back(x, V) { // the alley floor: worn asphalt, drain covers, painted kerb, scattered napkins and skewers
      const W = V.W, H = V.H, u = V.u, rnd = mulberry32(88), fy = H * 0.72;
      x.fillStyle = linear(x, 0, fy, 0, H, [[0, '#3a3a40'], [1, '#2a2a30']]); x.fillRect(0, fy, W, H - fy);
      for (let k = 0; k < 900; k++) { x.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.12)'; x.fillRect(rnd() * W, fy + rnd() * (H - fy), 2 * u, 1.4 * u); }
      for (let k = 0; k < 7; k++) { x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 1; x.beginPath(); let px = rnd() * W, py = fy + rnd() * (H - fy); x.moveTo(px, py); for (let q = 0; q < 5; q++) { px += (rnd() - 0.5) * 40 * u; py += (rnd() - 0.3) * 10 * u; x.lineTo(px, py); } x.stroke(); }
      [0.095, 0.27, 0.73, 0.9].forEach((f) => { x.fillStyle = radial(x, V.X(f), fy + 30 * u, 140 * u, [[0, 'rgba(255,190,110,0.22)'], [1, 'rgba(255,170,90,0)']]); x.fillRect(V.X(f) - 140 * u, fy, 280 * u, 200 * u); });
      x.fillStyle = '#d8c040'; x.fillRect(0, fy, W, 3 * u); x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(0, fy + 3 * u, W, 4 * u);
      [0.3, 0.7].forEach((f) => { x.fillStyle = '#2a2a2a'; ellipse(x, V.X(f), H * 0.93, 26 * u, 7 * u); x.fill(); x.strokeStyle = '#4a4a4a'; x.lineWidth = 1; for (let q = -3; q <= 3; q++) { x.beginPath(); x.moveTo(V.X(f) + q * 6 * u, H * 0.93 - 6 * u); x.lineTo(V.X(f) + q * 6 * u, H * 0.93 + 6 * u); x.stroke(); } });
      for (let k = 0; k < 14; k++) { const px = rnd() * W, py = fy + 20 * u + rnd() * (H - fy - 30 * u); if (rnd() < 0.5) { x.fillStyle = 'rgba(240,236,224,0.6)'; x.fillRect(px, py, 5 * u, 3 * u); } else { x.strokeStyle = 'rgba(216,184,128,0.7)'; x.lineWidth = 1; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 12 * u, py + 2 * u); x.stroke(); } }
    },
    counterLive(ctx, t, dt, V) {},
    drawSeat(ctx, seat, t, V) { const u = V.u, cx = seat.x, fy = seat.tableRef.y + 58 * u; ctx.fillStyle = '#d8242a'; ellipse(ctx, cx, fy - 34 * u, 13 * u, 4 * u); ctx.fill(); ctx.fillStyle = '#b81a1a'; ctx.beginPath(); ctx.moveTo(cx - 12 * u, fy - 34 * u); ctx.lineTo(cx - 14 * u, fy); ctx.lineTo(cx + 14 * u, fy); ctx.lineTo(cx + 12 * u, fy - 34 * u); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(ctx, cx, fy - 14 * u, 6 * u, 8 * u); ctx.fill(); },
    floorProps(V, t) {
      const u = V.u, out = [], ctx = V.ctx;
      V.S.tables.forEach((tb) => out.push({ y: tb.y + 1, f: () => { ctx.fillStyle = '#a8a8a8'; ctx.fillRect(tb.x - 30 * u, tb.y - 8 * u, 2 * u, 62 * u); ctx.fillRect(tb.x + 28 * u, tb.y - 8 * u, 2 * u, 62 * u); ctx.fillStyle = '#e8e4dc'; roundRect(ctx, tb.x - 40 * u, tb.y - 14 * u, 80 * u, 8 * u, 2 * u); ctx.fill(); ctx.fillStyle = '#d8242a'; ctx.fillRect(tb.x - 40 * u, tb.y - 7 * u, 80 * u, 2 * u);
        V.seats.filter((s) => s.tableRef === tb && s.who).forEach((s, i) => { const fx = tb.x + (s.x - tb.x) * 0.5; (i % 2 ? cutletBag : tofuBox)(ctx, fx, tb.y - 16 * u); }); } }));
      const sc = V.S.scoot; if (sc) out.push({ y: V.lane() + 8 * u, f: () => drawScooter(ctx, sc.x, V.lane() + 6 * u, u * 1.5, t) });
      const sn = V.S.sant; if (sn) out.push({ y: V.lane() + 9 * u, f: () => { [0, 1].forEach((i) => drawSanTaiZi(ctx, sn.x - i * 90 * u, V.lane(), u * 1.6, t + i * 0.5, i)); } });
      return out;
    },
    post(ctx, t, dt, V) { K.bubbles(ctx, V, dt, '#8a1a10'); },
    events(V) {
      return [
        { at: 0.14, name: 'giant-cutlet', dur: 8, start() { V.S.hoistReq = true; } },
        { at: 0.3, name: 'fireworks', dur: 24, start() { V.S.fwOn = true; }, end() { V.S.fwOn = false; } },
        { at: 0.46, name: 'scooter', dur: 14, start() { V.S.scootReq = true; } },
        { at: 0.6, name: 'plush', dur: 14, start() { V.S.plushReq = true; } },
        { at: 0.76, name: 'third-prince', dur: 40, start() { V.S.santReq = true; } },
      ];
    },
    onClear(e, V) { V.burst(V.X(0.095), V.H * 0.56, e.big ? 14 : 6, () => pick(['#ffd040', '#ff6a3a', '#ffffff']), { kind: 'spark', up: 140, sp: 70, life: 1, sz: 2 }); if (e.big) SFX('firework'); },
  };
  function drawScooter(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(ctx, 0, 2, 30, 4); ctx.fill();
    ctx.fillStyle = '#1a1a1a'; ellipse(ctx, -20, -6, 7, 7); ctx.fill(); ellipse(ctx, 20, -6, 7, 7); ctx.fill(); ctx.fillStyle = '#8a8a8a'; ellipse(ctx, -20, -6, 3, 3); ctx.fill(); ellipse(ctx, 20, -6, 3, 3); ctx.fill();
    ctx.fillStyle = '#e8e4d8'; ctx.beginPath(); ctx.moveTo(-28, -10); ctx.quadraticCurveTo(-30, -26, -10, -26); ctx.lineTo(4, -26); ctx.lineTo(10, -12); ctx.lineTo(18, -14); ctx.lineTo(22, -34); ctx.lineTo(26, -34); ctx.lineTo(28, -10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3a6ab0'; ctx.fillRect(-26, -24, 26, 4); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(20, -40, 3, 8); ctx.fillRect(14, -42, 12, 2);
    ctx.fillStyle = '#fff6c0'; ellipse(ctx, 28, -24, 2.4, 2); ctx.fill();
    // rider with helmet
    ctx.fillStyle = '#4a6a8a'; roundRect(ctx, -14, -58, 18, 32, 6); ctx.fill(); ctx.fillStyle = '#2a2a3a'; ctx.fillRect(-12, -30, 22, 8); ctx.fillStyle = '#e8b890'; ellipse(ctx, -4, -66, 7, 8); ctx.fill(); ctx.fillStyle = '#e8c020'; ctx.beginPath(); ctx.arc(-4, -67, 8.6, Math.PI * 0.95, Math.PI * 2.05); ctx.fill(); ctx.fillStyle = '#4a6a8a'; ctx.fillRect(2, -50, 18, 4);
    ctx.restore();
  }
  function drawSanTaiZi(ctx, x, y, s, t, i) { // 電音三太子: giant-headed deity costume dancing to techno, sunglasses on
    const b = Math.abs(Math.sin(t * 6)), sw = Math.sin(t * 3);
    ctx.save(); ctx.translate(x, y - b * 6 * s); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(ctx, 0, b * 6 + 2, 22, 4); ctx.fill();
    ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -30); ctx.lineTo(-10 - sw * 6, 0); ctx.moveTo(6, -30); ctx.lineTo(10 - sw * 6, 0); ctx.stroke();
    ctx.fillStyle = i ? '#2a8a4a' : '#d8242a'; ctx.beginPath(); ctx.moveTo(-20, -84); ctx.lineTo(20, -84); ctx.lineTo(24, -28); ctx.lineTo(-24, -28); ctx.closePath(); ctx.fill();
    ctx.fillStyle = GOLD; ctx.fillRect(-20, -60, 40, 4); for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-18 + k * 7, -32, 3, 0, Math.PI); ctx.fill(); }
    ctx.strokeStyle = i ? '#2a8a4a' : '#d8242a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-18, -78); ctx.lineTo(-34 + sw * 10, -96 - b * 10); ctx.moveTo(18, -78); ctx.lineTo(34 + sw * 10, -96 + b * 6); ctx.stroke();
    ctx.fillStyle = '#f4d0a8'; ellipse(ctx, 0, -118, 30, 32); ctx.fill(); // huge head
    ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(0, -124, 31, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); [-1, 1].forEach((d) => { ellipse(ctx, d * 18, -146, 9, 9); ctx.fill(); });
    ctx.fillStyle = '#e8242a'; ellipse(ctx, 0, -132, 3, 4); ctx.fill();
    ctx.fillStyle = '#111'; roundRect(ctx, -22, -122, 19, 9, 3); ctx.fill(); roundRect(ctx, 3, -122, 19, 9, 3); ctx.fill(); ctx.fillRect(-4, -120, 8, 2); ctx.fillStyle = 'rgba(120,200,255,0.5)'; ctx.fillRect(-19, -121, 6, 2);
    ctx.fillStyle = '#ff8a9a'; ellipse(ctx, -16, -104, 5, 3); ctx.fill(); ellipse(ctx, 16, -104, 5, 3); ctx.fill(); ctx.strokeStyle = '#8a2a1a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -102, 7, 0.2, Math.PI - 0.2); ctx.stroke();
    if (Math.sin(t * 2) > 0.3) { ctx.fillStyle = '#ffd860'; for (let k = 0; k < 3; k++) { ctx.font = 'bold 14px sans-serif'; ctx.fillText('♪', 30 + k * 8, -150 - ((t * 30 + k * 10) % 30)); } }
    ctx.restore();
  }
  defineWorld({
    id: 'nightmarket', name: 'Taiwanese Night Market', sub: '夜市 · Raohe Street after dark', thumbY: 0.4, dayOrder: ['dusk', 'night', 'night', 'late'],
    desc: 'Lantern-lit alleys, giant chicken cutlets, stinky tofu, oyster omelettes and bubble tea — guzheng and erhu over a bouncy street-pop beat.',
    accent: '#ff5a3a', accent2: '#ffd040', skin: 'nightmarket', particle: 'lantern',
    boardBg: 'rgba(30,6,8,0.78)', grid: 'rgba(255,170,110,0.08)',
    palette: ['#c89a6a', '#d8902a', '#c87a2a', '#e8202a', '#e8c890', '#b8342a', '#e8c88a'],
    music: {
      bpm: 112, root: 60, scale: [0, 2, 4, 7, 9], prog: [0, 3, 4, 2], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 1600, gain: 0.04, detune: 6, voices: 3 },
      arp: { inst: 'guzheng', pattern: [0, 2, 4, 5, 4, 2, 7, 4], every: 2, oct: 1, gain: 0.07, density: 0.75 },
      bass: { pattern: E16('x..x..x.x..x....'), gain: 0.16, dec: 0.3, wave: 'triangle' },
      drums: { kick: E16('x...x...x...x...'), snareInst: 'clap', snare: E16('....x.......x...'), hatInst: 'shaker', hat: E16('..x...x...x...xx'), extra: E16('x.x.x.x.x.x.x.x.'), extraInst: 'wood' },
      lead: { inst: 'erhu', gain: 0.05, density: 0.14, oct: 1 }, sfx: 'guzheng', clearFx: 'sizzle',
      amb: { chatter: 0.03, sizzle: 0.05, clink: 0.02 },
    },
  }, makeVenue(cfg));
})();
