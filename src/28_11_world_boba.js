/* ================= World 11: Boba Milk Tea Shop (手搖飲) — the showpiece =================
   A bright pastel tea shop. A glowing menu wall of 14 flavours (each with its real colour), a pink neon sign,
   the cashier taking orders at the POS, a barista scooping pearls, pulling tea from the brass taps and
   shaking it in a cocktail tin, and the sealing machine stamping a film lid with a satisfying KA-CHUNK.
   On the right: a pearl marble run (pearls tumble down a spiral track into a giant display cup), a vat of
   fresh pearls simmering in brown sugar, and a bobbing boba mascot by the door. Customers slurp pearls up
   fat straws (you can see them shoot up), their cups visibly emptying.
   Events: fresh pearl batch poured into the marble run, the mascot's dance break (staff join in), a pearl
   jam that sprays pearls everywhere (staff sweep up), an influencer shoot with ring light, the 1000th cup. */
(() => {
  const K = Kit, SFX = K.SFX, A = K.A;
  const FL = [ // name, zh, tea colour, accent
    ['Brown Sugar Tiger', '黑糖虎紋', '#e8d8c0', '#6a3010'], ['Classic Milk Tea', '珍珠奶茶', '#c89a6a', '#7a4a2a'], ['Taro', '芋頭鮮奶', '#b89ad8', '#7a5aa8'],
    ['Matcha Latte', '抹茶拿鐵', '#9ac870', '#4a7a2a'], ['Mango Green', '芒果綠茶', '#ffbe3a', '#e08a10'], ['Strawberry', '草莓鮮奶', '#f8a8c0', '#e04a7a'],
    ['Thai Tea', '泰式奶茶', '#f09848', '#c85a18'], ['Lychee Oolong', '荔枝烏龍', '#f6e8e8', '#d8a0a8'], ['Honeydew', '哈密瓜', '#b8e8a0', '#6ab040'],
    ['Passion Fruit', '百香果', '#f8d040', '#c88a10'], ['Winter Melon', '冬瓜茶', '#d8a860', '#8a5a20'], ['Oolong Milk', '烏龍奶茶', '#d8b088', '#8a5a30'],
    ['Grass Jelly', '仙草凍', '#6a5a4a', '#2a1a10'], ['Pudding Milk', '布丁奶茶', '#f0d890', '#c89a30'],
  ];
  const PINK = '#ff7ab0', MINT = '#7ad8c0';
  const cup = (f, lvl = 1, t0 = 0) => (c, x, y) => { const F = FL[f % FL.length]; c.save(); c.translate(x + 1, y - 5);
    c.fillStyle = 'rgba(235,245,255,0.45)'; c.beginPath(); c.moveTo(-3.6, -7); c.lineTo(3.6, -7); c.lineTo(2.8, 7); c.lineTo(-2.8, 7); c.closePath(); c.fill();
    const top = -6 + (1 - lvl) * 12; c.fillStyle = F[2]; c.beginPath(); c.moveTo(-3.4 + (1 - lvl) * 0.7, top); c.lineTo(3.4 - (1 - lvl) * 0.7, top); c.lineTo(2.7, 7); c.lineTo(-2.7, 7); c.closePath(); c.fill();
    if (f === 0) { c.strokeStyle = 'rgba(110,50,16,0.8)'; c.lineWidth = 0.8; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-3, -4 + k * 3); c.quadraticCurveTo(0, -2 + k * 3, 3, -5 + k * 3); c.stroke(); } }
    c.fillStyle = '#2a120a'; for (let k = 0; k < 7; k++) { ellipse(c, -2 + (k % 3) * 2, 5.6 - Math.floor(k / 3) * 1.5, 0.8, 0.8); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(-3.8, -7.4, 7.6, 1); c.fillStyle = PINK; c.fillRect(0.6, -15, 1.6, 8);
    const sl = (t0 || 0); if (sl) { for (let k = 0; k < 2; k++) { const p = (sl * 1.6 + k * 0.5) % 1; ellipse(c, 1.4, -7 - p * 8, 0.7, 0.7); c.fillStyle = '#2a120a'; c.fill(); } }
    c.restore(); };
  /* ---------- world ---------- */
  const crew = (o) => Object.assign({ skin: 'light', hair: 'black', top: { type: 'apron', col: MINT, col2: '#ffffff' }, sleeves: 'short', pants: '#2a2a3a' }, o);
  const cfg = {
    id: 'boba', flow: 'counter', seed: 1111, cap: 14, spawnEvery: 3, lane: 0.975, peopleScale: 1.55, cat: false, initial: 5,
    door: { x: 1.07 }, bin: null, vignette: 'rgba(40,10,30,0.3)', wetSignX: 0.62,
    lights: [{ x: 0.12, y: 0.1, r: 220, col: '#fff0f6', a: 0.2 }, { x: 0.3, y: 0.1, r: 220, col: '#fff0f6', a: 0.2 }, { x: 0.82, y: 0.2, r: 240, col: '#ffe0f0', a: 0.2 }, { x: 0.5, y: 0.08, r: 300, col: PINK, a: 0.08 }],
    windows: [{ x: 0.66, y: 0.14, w: 0.13, h: 0.36, city: street, frame(c, V) { const u = V.u, x0 = V.X(0.66), y0 = V.Y(0.14), w = V.X(0.13), h = V.Y(0.36); c.strokeStyle = '#f4f0f0'; c.lineWidth = 6 * u; c.strokeRect(x0, y0, w, h); K.jp(c, '歡迎光臨', x0 + w / 2, y0 + h * 0.12, 13 * u, 'rgba(255,122,176,0.9)'); } }],
    look(rnd, V, opt) { const L = Looks.random(rnd, opt.look || {}); if (rnd() < 0.7) { L.skin = Looks.pickR(rnd, ['pale', 'light', 'light', 'tan']); if (L.age !== 'old') L.hair = Looks.pickR(rnd, ['black', 'dbrown', 'brown', 'auburn']); } if (L.age === 'old' && rnd() < 0.6) L.age = 'adult'; return L; },
    setup(V) {
      V.S.cash = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.3, y: 0.46, k: 0.92, look: crew({ female: true, lashes: true, hairStyle: 'bob', acc: { hat: 'cap', hatCol: PINK, earrings: '#ffd040' } }), idle: [['wave2', 1.4], ['ready', 2], ['tapPOS', 1.6]] });
      const b1 = V.addStaff({ role: 'cook', layer: 'back', armsOver: true, x: 0.14, y: 0.46, k: 0.92, look: crew({ hairStyle: 'side', acc: { hat: 'cap', hatCol: MINT } }), idle: [['shakeT', 2], ['wipeT', 1.6]] });
      const b2 = V.addStaff({ role: 'cook', layer: 'back', armsOver: true, x: 0.21, y: 0.46, k: 0.92, look: crew({ female: true, lashes: true, hairStyle: 'pony', skin: 'tan', acc: { hat: 'cap', hatCol: '#ffd040' } }), idle: [['scoopP', 1.8], ['shakeT', 1.8]] });
      V.S.baristas = [b1, b2];
      V.S.mascot = { x: V.X(0.93), dance: 0 };
      V.S.run = Array.from({ length: 18 }, (_, i) => ({ p: i / 18 }));
      V.S.cups = 990 + Math.floor(Math.random() * 3); V.S.seal = 0; V.S.spill = [];
      V.S.tables = [[0.72, 0.87], [0.86, 0.9]].map(([f, y]) => ({ x: V.X(f), y: V.Y(y) }));
    },
    seats(V) { const sc = V.sc; return [[-34, 1, 0], [34, -1, 0], [-34, 1, 1], [34, -1, 1]].map(([dx, dir, ti]) => ({ x: V.S.tables[ti].x + dx * V.u, y: V.S.tables[ti].y - 58 * sc, dir, tableRef: V.S.tables[ti], legs: 'stool' })); },
    queue(V) { const X = V.X, L = V.lane(); return [0, 1, 2, 3, 4, 5, 6].map((i) => [X(0.3) - i * 36 * V.u, L - (i % 2) * 5 * V.u, X(0.3)]); },
    orderDesk: { lookX: 0.3 },
    standSpots: [[0.6, 0, -1], [0.66, 4, -1]],
    dish(a, V) { const f = Math.floor(Math.random() * FL.length); a.flav = f; V.S.cups++; const d = { togo: Math.random() < 0.35, f, hand: cup(f), bites: 4, biteT: 3, eatAct: 'slurp', onTable: true };
      d.utensil = (dd) => cup(f, 0.25 + dd.left * 0.75, V.t); d.restItem = (dd) => cup(f, 0.25 + dd.left * 0.75); return d; },
    prep(j, s, V) { V.S.cash.act = 'tapPOS'; V.S.cash.actT = 0; return [Object.assign(['scoopP', 1.1], { walk: 0.06 }), Object.assign(['tap', 1.2], { walk: 0.1 }), Object.assign(['shakeT', 1.6], { walk: 0.17 }), Object.assign(['sealIt', 1.1], { walk: 0.245, on: () => { V.S.seal = 1; } }), Object.assign(['hold', 0.2], { walk: 0.28 })]; },
    pose(s, ps, t, V) {
      const k = s.actT, F = s.job ? s.job.dish : null, fc = F ? F.f : 1;
      switch (s.act) {
        case 'scoopP': ps.arms = [A(-1, -2, 52, { item: cup(fc, 0.15) }), A(1, 14, 48 + Math.sin(k * 6) * 3, { item: (c, x, y) => { c.fillStyle = '#c8ccd0'; ellipse(c, x + 4, y, 3.4, 1.6); c.fill(); c.fillStyle = '#2a120a'; for (let q = 0; q < 4; q++) { ellipse(c, x + 2.6 + q * 0.9, y - 1, 0.8, 0.8); c.fill(); } } })]; ps.face.lookY = 1; ps.head.nod = 1; return;
        case 'tap': ps.arms = [A(-1, 4, 44, { item: cup(fc, Math.min(1, k / 1.1) * 0.7) }), A(1, 12, 16, { grip: 'fist' })]; ps.head.turn = -0.4; ps.face.lookY = 0.6; return;
        case 'shakeT': { const b = Math.sin(k * 20) * 7; ps.arms = [A(-1, 2, 14 + b, { grip: 'open' }), A(1, 8, 20 + b, { item: (c, x, y) => { c.fillStyle = linear(c, x - 3, 0, x + 3, 0, [[0, '#9aa0a8'], [0.5, '#f4f6f8'], [1, '#8a9098']]); roundRect(c, x - 3, y - 14, 6, 15, 1.5); c.fill(); } })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; ps.head.tilt = b * 0.012; return; }
        case 'sealIt': { const p = Math.abs(Math.sin(k * 3)); ps.arms = [A(-1, -14, 34 - p * 8, { grip: 'open' }), A(1, 8, 50, { grip: 'open' })]; ps.face.lookY = 1; return; }
        case 'tapPOS': { const p = Math.abs(Math.sin(k * 12)); ps.arms = [A(-1, -4, 52, { grip: 'open' }), A(1, 10, 50 + p * 3, { grip: 'point' })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.5; return; }
        case 'wave2': ps.arms = [A(-1, -12, 50), A(1, 24, -10 + Math.sin(t * 9) * 3, { grip: 'open', handAng: -1.3 })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; if (k < 0.05 && Math.random() < 0.5) s.say = { txt: '歡迎光臨～', t: 1.4, jp: true }; return;
        case 'ready': ps.arms = [A(-1, -8, 54, { grip: 'open' }), A(1, 8, 54, { grip: 'open' })]; ps.face.mouth = 'smile'; return;
        case 'wipeT': ps.arms = [A(-1, -6, 56), A(1, 6 + Math.sin(k * 9) * 10, 58, { grip: 'open', item: Items.napkin })]; ps.face.lookY = 1; return;
        case 'hand': ps.arms = [A(-1, -6, 50, { grip: 'open' }), A(1, 26, 38, { item: s.job && s.job.dish && s.job.dish.hand })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; if (k < 0.05) s.say = { txt: pick(['請慢用！', 'Enjoy!', '好喝喔！']), t: 1.4, jp: true }; return;
        case 'dance': { const b = Math.sin(t * 8); ps.arms = [A(-1, -20 + b * 6, -10 - Math.abs(b) * 10, { grip: 'open' }), A(1, 20 + b * 6, -10 - Math.abs(-b) * 10, { grip: 'open' })]; ps.face.mouth = 'laugh'; ps.face.open = 0.7; ps.face.eyes = 'happy'; ps.head.tilt = b * 0.15; return; }
        case 'pose0': ps.arms = [A(-1, -4, -6, { item: Items.phone }), A(1, 18, 10, { grip: 'open', handAng: -0.6 })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; ps.head.tilt = -0.18; return;
        case 'pose1': ps.arms = [A(-1, -4, -6, { item: Items.phone }), A(1, 10, 2, { grip: 'point' })]; ps.face.mouth = 'o'; ps.face.open = 0.4; ps.head.tilt = 0.12; return;
        case 'sweep': { const b = Math.sin(k * 6); ps.arms = [A(-1, -6 + b * 8, 40, { item: (c, x, y) => { c.strokeStyle = '#c89a5a'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); c.fillStyle = '#e8c070'; c.fillRect(x - 15, y + 38, 10, 5); } }), A(1, 4 + b * 8, 34)]; ps.face.mouth = 'flat'; ps.face.lookY = 1; return; }
      }
      return false;
    },
    custPose(a, ps, t, V) {
      if (a.act === 'slurp' && a.flav !== undefined) { const c = (a.actT % 2.2) / 2.2; ps.arms = [A(-1, -4, 20 - Math.sin(c * Math.PI) * 4, { item: cup(a.flav, a.seat && a.seat.dish ? 0.25 + a.seat.dish.left * 0.75 : 0.7, c < 0.7 ? t : 0) }), A(1, 6, 22, { grip: 'open' })]; ps.face.mouth = 'o'; ps.face.open = 0.3; ps.face.eyes = c < 0.6 ? 'closed' : 'happy'; ps.head.nod = 0.6; if (c > 0.5 && c < 0.52) SFX('slurp'); }
      if (a.act === 'photo') { ps.arms = [A(-1, -4, -4, { item: Items.phone }), A(1, 6, -4, { item: cup(a.flav || 2) })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; ps.head.tilt = -0.15; }
      if (V.S.dance > 0 && !a.sitting && a.act === 'stand') { const b = Math.sin(t * 8 + a.seed); ps.arms = [A(-1, -18, 10 + b * 8, { grip: 'open' }), A(1, 18, 10 - b * 8, { grip: 'open' })]; ps.face.mouth = 'laugh'; ps.face.eyes = 'happy'; }
    },
    tick(V, dt, t) {
      K.sweep(V); if (V.S.seal > 0) { V.S.seal -= dt * 1.4; if (V.S.seal < 0.6 && V.S.seal + dt * 1.4 >= 0.6) SFX('pop'); }
      V.S.run.forEach((p) => { p.p = (p.p + dt * (V.S.batch > 0 ? 0.16 : 0.07)) % 1; });
      if (V.S.batch > 0) V.S.batch -= dt;
      if (V.S.dance > 0) { V.S.dance -= dt; V.S.baristas.concat([V.S.cash]).forEach((s) => { if (!s.job && s.act !== 'dance') { s.act = 'dance'; s.actT = 0; } }); if (V.S.dance <= 0) V.S.baristas.concat([V.S.cash]).forEach((s) => { if (s.act === 'dance') s.act = 'ready'; }); }
      V.S.spill = V.S.spill.filter((p) => { p.vy += 500 * V.u * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.y > p.floor) { p.y = p.floor; p.vy *= -0.4; p.vx *= 0.7; } return !p.swept; });
      if (V.S.jamReq) { V.S.jamReq = false; for (let i = 0; i < 70; i++) V.S.spill.push({ x: V.X(0.86), y: V.H * 0.3, vx: rand(-260, 160) * V.u, vy: rand(-300, -60) * V.u, floor: V.H * rand(0.9, 0.99) }); SFX('bubble'); V.agents.forEach((a) => { a.react = 1.2; });
        K.actor(V, { x: 1.06, look: crew({ hairStyle: 'buzz', skin: 'tan', acc: { hat: 'cap', hatCol: MINT } }) }, function* (s) { s.act = 'walk'; yield ['walk', V.X(0.95), V.lane()]; s.say = { txt: '珍珠暴走了！', t: 2, jp: true }; for (let x = 0.95; x > 0.56; x -= 0.06) { s.act = 'sweep'; s.actT = 0; yield ['wait', 1]; V.S.spill.filter((p) => p.x > V.X(x - 0.04)).forEach((p) => { p.swept = true; }); s.act = 'walk'; yield ['walk', V.X(x - 0.06), V.lane()]; } V.S.spill.forEach((p) => { p.swept = true; }); s.act = 'walk'; yield ['walk', V.X(1.08), V.lane()]; }); }
      if (V.S.shootReq) { V.S.shootReq = false; K.actor(V, { x: 1.06, look: { female: true, lashes: true, skin: 'light', hair: 'blonde', hairStyle: 'wavyLong', top: { type: 'blouse', col: '#f8c8e0' }, acc: { earrings: '#ffd040', glasses: '#2a2a2a' }, lips: '#d8506a' } }, function* (s) { s.act = 'walk'; yield ['walk', V.X(0.6), V.lane()]; s.face = 1; V.S.ring = 1; for (let i = 0; i < 4; i++) { s.act = 'pose' + (i % 2); s.actT = 0; SFX('pop'); yield ['wait', 1.6]; } s.say = { txt: 'Boba life ✨', t: 2 }; yield ['wait', 1.6]; V.S.ring = 0; s.act = 'walk'; yield ['walk', V.X(1.08), V.lane()]; }); }
    },
    back(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(111);
      // pastel walls: pink upper, mint wainscot, white subway tile behind the bar
      x.fillStyle = '#fbe8ee'; x.fillRect(0, 0, W, H * 0.72); x.fillStyle = '#fff6f8'; for (let k = 0; k < W; k += 22 * u) x.fillRect(k, 0, 1, H * 0.6);
      x.fillStyle = '#f4f4f0'; x.fillRect(0, H * 0.3, X(0.36), H * 0.32); x.strokeStyle = 'rgba(160,170,180,0.35)'; x.lineWidth = 0.8; for (let gy = H * 0.3; gy < H * 0.62; gy += 9 * u) for (let gx = (Math.round(gy / (9 * u)) % 2) * 9 * u; gx < X(0.36); gx += 18 * u) x.strokeRect(gx, gy, 18 * u, 9 * u);
      x.fillStyle = MINT; x.fillRect(X(0.36), H * 0.56, W - X(0.36), H * 0.16); x.fillStyle = '#ffffff'; x.fillRect(X(0.36), H * 0.555, W - X(0.36), 4 * u);
      // menu wall frame (content live)
      x.fillStyle = '#2a2a34'; roundRect(x, X(0.01), H * 0.03, X(0.98), H * 0.22, 8 * u); x.fill();
      // shelves of tea canisters & syrup bottles behind the bar
      [0.33, 0.4].forEach((sy) => { x.fillStyle = '#d8b890'; x.fillRect(X(0.01), H * sy, X(0.34), 4 * u); for (let q = 0; q < 12; q++) { const cx = X(0.02) + q * X(0.028), col = q % 2 ? FL[(q * 3) % 14][3] : '#e8e0d0'; x.fillStyle = col; roundRect(x, cx, H * sy - 22 * u, X(0.02), 22 * u, 3 * u); x.fill(); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(cx + 2 * u, H * sy - 16 * u, X(0.016), 6 * u); } });
      // brass tea taps
      x.fillStyle = '#c8a050'; for (let q = 0; q < 4; q++) { x.fillRect(X(0.08) + q * 14 * u, H * 0.45, 5 * u, 18 * u); x.fillRect(X(0.08) + q * 14 * u - 2 * u, H * 0.45, 9 * u, 4 * u); }
      x.fillStyle = '#e8e8ec'; roundRect(x, X(0.065), H * 0.43, 64 * u, 8 * u, 3 * u); x.fill();
      // right wall: marble run board + giant display cup frame
      x.fillStyle = '#ffffff'; roundRect(x, X(0.8), H * 0.12, X(0.19), H * 0.42, 10 * u); x.fill(); x.strokeStyle = '#f0c0d0'; x.lineWidth = 3 * u; x.stroke();
      // hanging plants
      [0.42, 0.58, 0.74].forEach((f) => { x.strokeStyle = '#8a6a4a'; x.lineWidth = 1; x.beginPath(); x.moveTo(X(f), H * 0.25); x.lineTo(X(f), H * 0.32); x.stroke(); x.fillStyle = '#f4f0e8'; ellipse(x, X(f), H * 0.335, 12 * u, 8 * u); x.fill(); for (let q = 0; q < 9; q++) { x.fillStyle = q % 2 ? '#4a9a5a' : '#6ab870'; ellipse(x, X(f) + (q - 4) * 4 * u, H * 0.33 + Math.abs(q - 4) * 5 * u, 3 * u, 7 * u, (q - 4) * 0.3); x.fill(); } });
      K.floor(x, V, H * 0.72, '#f4ece4', '#e8d8d0', 'check', 9, 16);
    },
    counter(x, V) {
      const H = V.H, u = V.u, X = V.X, top = H * 0.6;
      x.fillStyle = linear(x, 0, top, 0, H * 0.74, [[0, '#ffffff'], [0.06, '#e8e8ec'], [0.08, '#f8d0e0'], [1, '#e8a8c0']]); x.fillRect(0, top, X(0.355), H * 0.14);
      for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(k * X(0.0254) + 3 * u, top + H * 0.02, 3 * u, H * 0.12); }
      roundRect(x, X(0.07), top + H * 0.03, X(0.2), H * 0.06, 8 * u); x.fillStyle = '#ffffff'; x.fill(); K.jp(x, '珍珠奶茶', X(0.17), top + H * 0.06, 18 * u, PINK);
      // POS, sealing machine, cup tower, straw jar
      x.fillStyle = '#2a2a34'; x.fillRect(X(0.29), top - 22 * u, 26 * u, 18 * u); x.fillStyle = '#7ad8f0'; x.fillRect(X(0.292), top - 20 * u, 22 * u, 13 * u);
      x.fillStyle = linear(x, X(0.235), 0, X(0.255), 0, [[0, '#c0c4c8'], [0.5, '#f4f4f6'], [1, '#a8acb0']]); x.fillRect(X(0.233), top - 40 * u, 24 * u, 40 * u); x.fillStyle = PINK; x.fillRect(X(0.233), top - 40 * u, 24 * u, 5 * u);
      for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(230,240,250,0.7)'; x.fillRect(X(0.03), top - 8 * u - k * 5 * u, 14 * u, 4 * u); }
      x.fillStyle = 'rgba(230,240,250,0.6)'; x.fillRect(X(0.32), top - 20 * u, 10 * u, 20 * u); ['#ff7ab0', '#7ad8c0', '#ffd040', '#8ab0ff'].forEach((col, q) => { x.fillStyle = col; x.fillRect(X(0.322) + q * 2 * u, top - 30 * u, 1.6 * u, 22 * u); });
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H, lit = V.lit || 1; V.ctx = ctx;
      // menu wall: 14 flavours, each a glowing swatch + mini cup + names
      for (let i = 0; i < 14; i++) { const col = i % 7, row = Math.floor(i / 7), bx = X(0.02) + col * X(0.138), by = H * 0.045 + row * H * 0.1, bw = X(0.13), bh = H * 0.09, F = FL[i];
        ctx.fillStyle = shade(F[2], -0.05); roundRect(ctx, bx, by, bw, bh, 6 * u); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.35)'; roundRect(ctx, bx + 2 * u, by + 2 * u, bw - 4 * u, bh * 0.35, 5 * u); ctx.fill();
        ctx.save(); ctx.translate(bx + bw * 0.15, by + bh * 0.62); ctx.scale(2.6 * u, 2.6 * u); cup(i, 0.95)(ctx, 0, 0); ctx.restore();
        K.jp(ctx, F[1], bx + bw * 0.62, by + bh * 0.36, 13 * u, F[3]); K.txt(ctx, F[0], bx + bw * 0.62, by + bh * 0.7, 7.5 * u, '#3a2a2a'); K.txt(ctx, '$' + (55 + (i * 7) % 30), bx + bw * 0.92, by + bh * 0.88, 7 * u, '#c83a6a', 'right');
        if ((Math.floor(t / 2) % 14) === i) { ctx.strokeStyle = `rgba(255,255,255,${0.6 + 0.4 * Math.sin(t * 8)})`; ctx.lineWidth = 2.5 * u; roundRect(ctx, bx, by, bw, bh, 6 * u); ctx.stroke(); } }
      // pink neon sign
      K.neon(ctx, 'BOBA ♥ TEA', X(0.17), H * 0.275, 30 * u, PINK, t, { flicker: true, fam: '"Brush Script MT", "Segoe Script", cursive' });
      // marble run: zig-zag track with pearls tumbling into the giant cup
      const rx = X(0.8), ry = H * 0.12, rw = X(0.19), rh = H * 0.42; const pts = [[0.1, 0.06], [0.9, 0.2], [0.12, 0.36], [0.88, 0.52], [0.5, 0.62]];
      ctx.strokeStyle = '#f8b8d0'; ctx.lineWidth = 6 * u; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(rx + a * rw, ry + b * rh) : ctx.moveTo(rx + a * rw, ry + b * rh))); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5 * u; ctx.stroke();
      const seg = (p) => { const f = p * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), k = f - i; return [rx + lerp(pts[i][0], pts[i + 1][0], k) * rw, ry + lerp(pts[i][1], pts[i + 1][1], k) * rh - 4 * u]; };
      V.S.run.forEach((p) => { const [px, py] = seg(p.p); ctx.fillStyle = radial(ctx, px - 1 * u, py - 1 * u, 4 * u, [[0, '#8a5a3a'], [0.6, '#3a1a0a'], [1, '#1a0804']]); ellipse(ctx, px, py, 3.6 * u, 3.6 * u); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(px - 1.6 * u, py - 1.8 * u, 1.2 * u, 1.2 * u); });
      // giant display cup with tiger stripes, pearls bobbing
      const gx = rx + rw * 0.5, gy = ry + rh * 0.66; ctx.fillStyle = 'rgba(235,245,255,0.5)'; ctx.beginPath(); ctx.moveTo(gx - 34 * u, gy); ctx.lineTo(gx + 34 * u, gy); ctx.lineTo(gx + 26 * u, gy + 70 * u); ctx.lineTo(gx - 26 * u, gy + 70 * u); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#efe0c8'; ctx.beginPath(); ctx.moveTo(gx - 32 * u, gy + 8 * u); ctx.lineTo(gx + 32 * u, gy + 8 * u); ctx.lineTo(gx + 26 * u, gy + 70 * u); ctx.lineTo(gx - 26 * u, gy + 70 * u); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(110,50,16,0.75)'; ctx.lineWidth = 3 * u; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(gx - 30 * u, gy + 16 * u + k * 12 * u); ctx.bezierCurveTo(gx - 10 * u, gy + 26 * u + k * 12 * u + Math.sin(t + k) * 3 * u, gx + 10 * u, gy + 6 * u + k * 12 * u, gx + 30 * u, gy + 18 * u + k * 12 * u); ctx.stroke(); }
      for (let k = 0; k < 16; k++) { const px = gx - 20 * u + (k % 6) * 8 * u, py = gy + 64 * u - Math.floor(k / 6) * 7 * u - Math.abs(Math.sin(t * 3 + k)) * 2 * u; ctx.fillStyle = '#2a120a'; ellipse(ctx, px, py, 3.6 * u, 3.6 * u); ctx.fill(); }
      ctx.fillStyle = PINK; ctx.fillRect(gx + 6 * u, gy - 40 * u, 8 * u, 50 * u); K.txt(ctx, (V.S.cups || 0) + ' cups served', gx, gy + 84 * u, 9 * u, '#c83a6a');
      // pearl vat simmering in brown sugar
      const vx = X(0.12), vy = H * 0.565; ctx.fillStyle = '#8a8e94'; roundRect(ctx, vx - 24 * u, vy - 6 * u, 48 * u, 20 * u, 4 * u); ctx.fill(); ellipse(ctx, vx, vy - 6 * u, 24 * u, 5 * u); ctx.fillStyle = '#4a1a08'; ctx.fill();
      for (let k = 0; k < 10; k++) { ctx.fillStyle = '#1a0804'; ellipse(ctx, vx - 18 * u + (k * 4) * u, vy - 6 * u + Math.sin(t * 4 + k) * 1.2 * u, 2.2 * u, 1.6 * u); ctx.fill(); } if (Math.random() < 0.2) V.steam(vx, vy - 10 * u, 1, 0.6);
      // the sealer: film roll spins and the press drops
      const sx = X(0.245), sy = H * 0.6 - 40 * u, pr = Math.max(0, V.S.seal) > 0.5 ? 10 * u : 0; ctx.fillStyle = '#5a5e64'; ctx.fillRect(sx - 8 * u, sy + 8 * u + pr, 16 * u, 6 * u); ctx.fillStyle = '#e8e0f0'; ellipse(ctx, sx, sy + 4 * u, 7 * u, 4 * u); ctx.fill(); ctx.strokeStyle = PINK; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(sx, sy + 4 * u, 4 * u, 2 * u, t * 3, 0, TAU); ctx.stroke();
    },
    counterLive(ctx, t, dt, V) { // finished cups waiting on the pick-up shelf with numbered stickers, tip jar, lucky cat
      const u = V.u, X = V.X, top = V.H * 0.6;
      V.jobs.filter((j) => j.kind === 'prep' && j.state === 'ready').slice(0, 3).forEach((j, i) => { ctx.save(); ctx.translate(X(0.27) + i * 12 * u, top - 2 * u); ctx.scale(2 * u, 2 * u); cup(j.dish.f)(ctx, 0, 0); ctx.restore(); });
      ctx.fillStyle = 'rgba(230,240,250,0.6)'; ctx.fillRect(X(0.005), top - 16 * u, 12 * u, 16 * u); ctx.fillStyle = '#7ab070'; ctx.fillRect(X(0.007), top - 8 * u, 8 * u, 6 * u);
      const cx = X(0.205), cy = top - 2 * u, wv = Math.sin(t * 4) * 0.5; ctx.fillStyle = '#ffffff'; ellipse(ctx, cx, cy - 8 * u, 7 * u, 8 * u); ctx.fill(); ellipse(ctx, cx, cy - 18 * u, 6 * u, 5.4 * u); ctx.fill(); ctx.fillStyle = '#e83a3a'; ctx.fillRect(cx - 5 * u, cy - 13 * u, 10 * u, 1.6 * u); ctx.fillStyle = '#ffd040'; ellipse(ctx, cx, cy - 10.5 * u, 1.6 * u, 1.6 * u); ctx.fill();
      ctx.save(); ctx.translate(cx + 6 * u, cy - 16 * u); ctx.rotate(-0.4 + wv); ctx.fillStyle = '#ffffff'; ellipse(ctx, 0, -4 * u, 2.4 * u, 4 * u); ctx.fill(); ctx.restore(); ctx.fillStyle = '#2a2a2a'; [-2, 2].forEach((d) => ctx.fillRect(cx + d * u - 0.6 * u, cy - 19 * u, 1.2 * u, 0.8 * u));
    },
    drawSeat(ctx, seat, t, V) { const u = V.u, cx = seat.x, fy = seat.tableRef.y + 60 * u; ctx.fillStyle = '#f8f4f0'; ellipse(ctx, cx, fy - 34 * u, 12 * u, 4 * u); ctx.fill(); ctx.strokeStyle = '#c8a070'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(cx - 8 * u, fy - 32 * u); ctx.lineTo(cx - 10 * u, fy); ctx.moveTo(cx + 8 * u, fy - 32 * u); ctx.lineTo(cx + 10 * u, fy); ctx.stroke(); },
    floorProps(V, t) {
      const u = V.u, out = [], ctx = V.ctx;
      V.S.tables.forEach((tb) => out.push({ y: tb.y + 1, f: () => { ctx.fillStyle = '#c8a070'; ctx.fillRect(tb.x - 2 * u, tb.y - 8 * u, 4 * u, 62 * u); ctx.fillStyle = 'rgba(0,0,0,0.2)'; ellipse(ctx, tb.x, tb.y + 54 * u, 22 * u, 4 * u); ctx.fill(); ellipse(ctx, tb.x, tb.y - 12 * u, 34 * u, 8 * u); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = '#f0c0d0'; ctx.lineWidth = 2 * u; ctx.stroke();
        V.seats.filter((s) => s.tableRef === tb && s.who && s.dish).forEach((s) => { ctx.save(); ctx.translate(tb.x + (s.x - tb.x) * 0.4, tb.y - 14 * u); ctx.scale(1.8, 1.8); cup(s.dish.f, 0.25 + s.dish.left * 0.75)(ctx, 0, 0); ctx.restore(); }); } }));
      // the boba mascot: a giant pearl in a costume, bobbing and waving (dances at the event)
      out.push({ y: V.lane() + 2 * u, f: () => drawMascot(ctx, V.S.mascot.x, V.lane(), u * 1.5, t, V.S.dance > 0) });
      V.S.spill.forEach((p) => out.push({ y: p.floor, f: () => { ctx.fillStyle = '#2a120a'; ellipse(ctx, p.x, p.y - 3 * u, 3.4 * u, 3.4 * u); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(p.x - 1.4 * u, p.y - 5 * u, 1.2 * u, 1.2 * u); } }));
      if (V.S.ring) out.push({ y: V.lane() - 1, f: () => { const rx = V.X(0.66), ry = V.lane() - 150 * u; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx, V.lane()); ctx.stroke(); ctx.strokeStyle = '#fffaf0'; ctx.lineWidth = 6 * u; ellipse(ctx, rx, ry, 22 * u, 22 * u); ctx.stroke(); K.glowAt(ctx, rx, ry, 120 * u, '#fff6e8', 0.35); } });
      return out;
    },
    post(ctx, t, dt, V) { K.bubbles(ctx, V, dt, '#c83a6a'); },
    events(V) {
      return [
        { at: 0.12, name: 'fresh-pearls', dur: 16, start() { V.S.batch = 16; V.burst(V.X(0.12), V.H * 0.55, 20, '#2a120a', { up: 120, sp: 60, life: 1.2, sz: 3 }); SFX('bubble'); V.S.cash.say = { txt: '新鮮珍珠出爐！', t: 2.4, jp: true }; } },
        { at: 0.3, name: 'mascot-dance', dur: 16, start() { V.S.dance = 14; SFX('fanfare'); } },
        { at: 0.5, name: 'pearl-jam', dur: 20, start() { V.S.jamReq = true; } },
        { at: 0.66, name: 'influencer', dur: 16, start() { V.S.shootReq = true; } },
        { at: 0.82, name: 'cup-1000', dur: 10, start() { V.S.cups = Math.max(V.S.cups, 1000); SFX('fanfare'); V.burst(V.X(0.9), V.H * 0.4, 50, () => pick([PINK, MINT, '#ffd040', '#ffffff']), { kind: 'confetti', up: 260, sp: 160, life: 2.4 }); V.S.cash.say = { txt: '第1000杯！', t: 3, jp: true }; V.agents.forEach((a) => { if (Math.random() < 0.7) a.cheer = 1.6; }); } },
      ];
    },
    onClear(e, V) { for (let i = 0; i < (e.big ? 16 : 6); i++) V.S.run.push({ p: Math.random() * 0.2 }); V.S.run = V.S.run.slice(-30); if (e.big) SFX('bubble'); },
  };
  function street(c, x, y, w, h, lights, V) { const u = V.u, gy = y + h * 0.75; c.fillStyle = mix('#c8b8a8', '#4a4048', Math.min(1, lights)); c.fillRect(x, y + h * 0.2, w * 0.5, gy - y - h * 0.2); c.fillStyle = mix('#a8b8c8', '#3a4050', Math.min(1, lights)); c.fillRect(x + w * 0.55, y + h * 0.1, w * 0.45, gy - y - h * 0.1); c.fillStyle = '#5a5a60'; c.fillRect(x, gy, w, h * 0.25); const sx = x + ((V.t * 40) % (w + 80 * u)) - 40 * u; c.fillStyle = '#e8e8e8'; roundRect(c, sx, gy + 8 * u, 26 * u, 10 * u, 4 * u); c.fill(); c.fillStyle = '#2a2a2a'; ellipse(c, sx + 5 * u, gy + 18 * u, 4 * u, 4 * u); c.fill(); ellipse(c, sx + 21 * u, gy + 18 * u, 4 * u, 4 * u); c.fill(); }
  function drawMascot(ctx, x, y, s, t, dance) {
    const b = dance ? Math.abs(Math.sin(t * 7)) * 10 : Math.abs(Math.sin(t * 2.2)) * 4, sw = dance ? Math.sin(t * 3.5) : Math.sin(t * 1.1) * 0.3;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(ctx, 0, 2, 26, 5); ctx.fill();
    ctx.strokeStyle = '#2a120a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, -30 - b); ctx.lineTo(-12 - sw * 8, 0); ctx.moveTo(10, -30 - b); ctx.lineTo(12 - sw * 8, 0); ctx.stroke(); ctx.fillStyle = '#ff7ab0'; ellipse(ctx, -12 - sw * 8, -1, 8, 4); ctx.fill(); ellipse(ctx, 12 - sw * 8, -1, 8, 4); ctx.fill();
    const by = -70 - b; ctx.translate(0, by); ctx.rotate(sw * 0.15);
    ctx.fillStyle = radial(ctx, -12, -14, 50, [[0, '#7a4a2a'], [0.5, '#3a1a0a'], [1, '#140602']]); ellipse(ctx, 0, 0, 40, 40); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ellipse(ctx, -14, -18, 10, 6, -0.5); ctx.fill();
    ctx.strokeStyle = '#2a120a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-36, 6); ctx.lineTo(-54 - sw * 6, dance ? -30 - b : 24 + Math.sin(t * 4) * 6); ctx.moveTo(36, 6); ctx.lineTo(54 - sw * 6, dance ? -26 : -10 + Math.sin(t * 6) * 8); ctx.stroke();
    ctx.fillStyle = '#ffffff'; [-1, 1].forEach((d) => { ellipse(ctx, d * 13, -4, 9, 11); ctx.fill(); }); ctx.fillStyle = '#1a0a04'; [-1, 1].forEach((d) => { ellipse(ctx, d * 13 + 2, -2, 5, 7); ctx.fill(); }); ctx.fillStyle = '#ffffff'; [-1, 1].forEach((d) => { ellipse(ctx, d * 13 + 4, -5, 2, 2); ctx.fill(); });
    ctx.fillStyle = 'rgba(255,120,160,0.7)'; ellipse(ctx, -24, 12, 7, 4); ctx.fill(); ellipse(ctx, 24, 12, 7, 4); ctx.fill();
    ctx.fillStyle = '#ff5a8a'; ctx.beginPath(); ctx.arc(0, 14, 9, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#ff7ab0'; ctx.fillRect(8, -62, 10, 30); ctx.fillStyle = '#ffffff'; ctx.fillRect(10, -62, 3, 30);
    ctx.restore();
  }
  defineWorld({
    id: 'boba', name: 'Boba Milk Tea Shop', sub: '手搖飲 · fourteen flavours, one pearl marble run', thumbY: 0.4, dayOrder: ['noon', 'afternoon', 'dusk', 'night'],
    desc: 'A pastel tea bar with a glowing flavour wall, a cocktail-shaker barista, a KA-CHUNK sealer, a pearl marble run and a dancing boba mascot — bright city-pop marimba.',
    accent: '#ff7ab0', accent2: '#7ad8c0', skin: 'boba', particle: 'pearl',
    boardBg: 'rgba(40,16,34,0.72)', grid: 'rgba(255,160,210,0.09)',
    palette: ['#e8d8c0', '#ffbe3a', '#b89ad8', '#9ac870', '#f8a8c0', '#f09848', '#b8e8a0'],
    music: {
      bpm: 116, root: 62, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 5, 3, 4], barsPerChord: 1,
      pad: { wave: 'triangle', cutoff: 2200, gain: 0.03, detune: 6, voices: 4 },
      comp: { inst: 'rhodes', pattern: E16('..x...x...x..x..'), voices: 4, gain: 0.035, oct: 0 },
      arp: { inst: 'marimba', pattern: [0, 2, 4, 7, 9, 7, 4, 2], every: 2, oct: 1, gain: 0.08, density: 0.8 },
      bass: { pattern: E16('x..x...x..x.x...'), gain: 0.17, dec: 0.25, wave: 'triangle' },
      drums: { kick: E16('x...x...x...x...'), snareInst: 'clap', snare: E16('....x.......x...'), hat: E16('..x...x...x...x.'), extra: E16('.x.x.x.x.x.x.x.x'), extraInst: 'wood' },
      lead: { inst: 'synth', gain: 0.035, density: 0.14, oct: 1 }, sfx: 'marimba', clearFx: 'bubble',
      amb: { chatter: 0.018, clink: 0.02 },
    },
  }, makeVenue(cfg));
})();
