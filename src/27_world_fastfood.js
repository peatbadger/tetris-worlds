/* ================= World 9: Golden Arches (an affectionate, unofficial fast-food tribute) =================
   No real logos, mascots or trademarked names: the sign is a generic golden arch over "GA".
   Two registers with crew in red polos and visors; behind them the grill line (patties hiss and get flipped,
   cheese melts), the fry station (baskets drop into bubbling oil, beep, are shaken and salted), the drink tower
   and a soft-serve machine. Animated digital menu boards, a PREPARING / READY order-number screen, self-order
   kiosks, and a drive-thru window where cars roll up and a headset crew member hands out bags.
   Out the window: the parking lot with the tall pole sign, glowing after dusk.
   Events: a kids' birthday party (paper crowns, balloons, a cake with candles), the ice-cream machine is down
   (a technician fixes it to cheers), delivery couriers collecting bags, and a lunch rush. */
(() => {
  const SFX = (k) => { try { if (AudioEngine.sfx.ev) AudioEngine.sfx.ev(k); } catch (e) {} };
  const RED = '#c8201a', GOLD = '#ffc72c';
  const archLogo = (c, x, y, s, glow) => { // generic single golden arch with "GA" — not a real trademark
    c.save(); c.translate(x, y); if (glow) { c.shadowColor = GOLD; c.shadowBlur = 14 * s; } c.strokeStyle = GOLD; c.lineWidth = 5 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(-14 * s, 10 * s); c.bezierCurveTo(-14 * s, -18 * s, 14 * s, -18 * s, 14 * s, 10 * s); c.stroke(); c.shadowBlur = 0;
    c.fillStyle = '#ffffff'; c.font = `bold ${9 * s}px Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('GA', 0, 4 * s); c.restore(); };
  /* ---------- food art ---------- */
  function burgerArt(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#b8701a'; ellipse(c, 0, 4, 9, 2.4); c.fill(); c.fillStyle = '#5a2a10'; roundRect(c, -9, -1, 18, 4, 2); c.fill(); c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillRect(-7, -0.6, 14, 0.6);
    c.fillStyle = '#ffc830'; c.beginPath(); c.moveTo(-9.5, -1.4); c.lineTo(9.5, -1.4); c.lineTo(7, 1.6); c.lineTo(4, -0.4); c.lineTo(0, 2); c.lineTo(-5, -0.2); c.lineTo(-8, 1.4); c.closePath(); c.fill();
    c.fillStyle = '#5ab030'; for (let k = -4; k <= 4; k++) { ellipse(c, k * 2.2, -2.4, 1.6, 1); c.fill(); } c.fillStyle = '#e83a2a'; c.fillRect(-7, -3.6, 14, 1.2);
    c.fillStyle = radial(c, -3, -8, 12, [[0, '#f8b860'], [0.6, '#d88a2a'], [1, '#a8601a']]); c.beginPath(); c.moveTo(-9.6, -3.4); c.bezierCurveTo(-9.6, -12, 9.6, -12, 9.6, -3.4); c.closePath(); c.fill();
    c.fillStyle = '#fff4dc'; for (let k = 0; k < 9; k++) { ellipse(c, -6 + (k * 37 % 12), -9 + (k * 13 % 5), 0.6, 0.35, k); c.fill(); } c.restore(); }
  function friesArt(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#ffd040'; for (let k = 0; k < 9; k++) { c.save(); c.translate(-4 + k, -6); c.rotate((k - 4) * 0.06); c.fillRect(-0.6, -5 - (k % 3) * 1.4, 1.3, 9); c.restore(); }
    c.fillStyle = RED; c.beginPath(); c.moveTo(-5.4, -5); c.lineTo(5.4, -5); c.lineTo(4.4, 5); c.lineTo(-4.4, 5); c.closePath(); c.fill(); c.fillStyle = GOLD; c.beginPath(); c.arc(0, 0, 2, Math.PI, 0); c.lineWidth = 0.9; c.strokeStyle = GOLD; c.stroke(); c.restore(); }
  function cupArt(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-4.4, -8); c.lineTo(4.4, -8); c.lineTo(3.4, 6); c.lineTo(-3.4, 6); c.closePath(); c.fill(); c.fillStyle = RED; c.fillRect(-4, -3, 8, 3); c.fillStyle = '#e8e8e8'; ellipse(c, 0, -8, 4.6, 1.2); c.fill(); c.strokeStyle = '#c8201a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(1, -8); c.lineTo(2.4, -14); c.stroke(); c.restore(); }
  function bagArt(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#c89a5a'; c.fillRect(-6, -10, 12, 16); c.fillStyle = '#b08040'; c.beginPath(); c.moveTo(-6, -10); c.lineTo(-4, -12); c.lineTo(4, -12); c.lineTo(6, -10); c.fill(); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(-6, -12 + k * 1, 12, 0.4); } archLogo(c, 0, -1, 0.3, false); c.restore(); }
  const trayHand = (c, x, y) => { c.save(); c.translate(x - 6, y + 3); c.fillStyle = RED; roundRect(c, -14, -1, 28, 3, 1); c.fill(); c.fillStyle = '#f4ece0'; c.fillRect(-12, -1.5, 24, 0.8); burgerArt(c, -6, -4, 0.4); friesArt(c, 2, -4, 0.45); cupArt(c, 9, -4, 0.45); c.restore(); };
  const bagHand = (c, x, y) => bagArt(c, x + 3, y + 3, 0.7);
  const cakeItem = (lit) => (c, x, y) => { c.save(); c.translate(x - 6, y + 2); c.fillStyle = '#f4f0e6'; roundRect(c, -10, -1, 20, 2, 1); c.fill(); c.fillStyle = '#f8c8d8'; c.fillRect(-8, -8, 16, 7); c.fillStyle = '#ffffff'; c.fillRect(-8, -9, 16, 1.6); for (let k = 0; k < 5; k++) { c.fillStyle = ['#ff5a8a', '#5ab0ff', '#ffd040', '#6ad08a', '#c890ff'][k]; c.fillRect(-6 + k * 3, -13, 1, 4); if (lit) { c.fillStyle = '#ffd860'; ellipse(c, -5.5 + k * 3, -14.4, 0.8, 1.4); c.fill(); } } c.restore(); };
  const crown = (col) => (c) => { c.save(); c.translate(0, -12); c.fillStyle = col; c.beginPath(); c.moveTo(-9, 2); c.lineTo(-9, -5); c.lineTo(-5, -1); c.lineTo(-2, -7); c.lineTo(1, -1); c.lineTo(5, -7); c.lineTo(9, -2); c.lineTo(9, 2); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(-9, -0.4, 18, 1); c.restore(); };
  const toolbox = (c, x, y) => { c.fillStyle = '#c8201a'; c.fillRect(x - 6, y, 12, 7); c.fillStyle = '#8a1410'; c.fillRect(x - 6, y + 2, 12, 0.8); c.strokeStyle = '#3a3a3a'; c.lineWidth = 1; c.beginPath(); c.moveTo(x - 3, y); c.lineTo(x - 3, y - 2); c.lineTo(x + 3, y - 2); c.lineTo(x + 3, y); c.stroke(); };
  const wrench = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.6); c.fillStyle = '#b8bcc0'; c.fillRect(0, -0.8, 10, 1.6); c.beginPath(); c.arc(11, 0, 2, 0.6, TAU - 0.6); c.fill(); c.restore(); };
  /* ---------- outside: parking lot + pole sign ---------- */
  function lot(c, x, y, w, h, lights, V) {
    const u = V.u, t = V.t, gy = y + h * 0.7;
    c.fillStyle = '#4a4a50'; c.fillRect(x, gy, w, y + h - gy); c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1.4 * u; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(x + k * w / 5, gy + 6 * u); c.lineTo(x + k * w / 5 - 10 * u, y + h); c.stroke(); }
    c.fillStyle = 'rgba(40,60,40,0.8)'; for (let k = 0; k < 8; k++) { ellipse(c, x + k * w / 7, gy - 6 * u, 16 * u, 10 * u); c.fill(); }
    // pole sign
    const px = x + w * 0.72; c.fillStyle = '#8a8a90'; c.fillRect(px - 2.4 * u, y + h * 0.18, 4.8 * u, gy - y - h * 0.18); c.fillStyle = RED; roundRect(c, px - 26 * u, y + h * 0.06, 52 * u, 44 * u, 6 * u); c.fill(); archLogo(c, px, y + h * 0.06 + 24 * u, 1.1 * u, lights > 0.3);
    // parked cars + one pulling in
    [['#2a5aa0', 0.12], ['#e8e8e8', 0.32], ['#3a3a3a', 0.52]].forEach(([col, f], i) => { const cx = x + w * f + (i === 1 ? Math.max(0, 30 - ((t * 6) % 60)) * u : 0), cy = gy + 16 * u + i * 2 * u; c.fillStyle = col; roundRect(c, cx - 18 * u, cy - 8 * u, 36 * u, 9 * u, 3 * u); c.fill(); roundRect(c, cx - 10 * u, cy - 15 * u, 20 * u, 8 * u, 3 * u); c.fill(); c.fillStyle = 'rgba(160,200,230,0.8)'; c.fillRect(cx - 8 * u, cy - 13.6 * u, 16 * u, 5 * u); c.fillStyle = '#1a1a1a'; ellipse(c, cx - 11 * u, cy + 1 * u, 3.4 * u, 3.4 * u); c.fill(); ellipse(c, cx + 11 * u, cy + 1 * u, 3.4 * u, 3.4 * u); c.fill(); if (lights > 0.4) { c.fillStyle = 'rgba(255,40,40,0.8)'; c.fillRect(cx + 16 * u, cy - 6 * u, 2 * u, 2 * u); } });
    if (lights > 0.3) { [0.2, 0.9].forEach((f) => { const lx = x + w * f; c.fillStyle = '#6a6a70'; c.fillRect(lx - 1 * u, y + h * 0.3, 2 * u, gy - y - h * 0.3); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,220,150,${0.25 * lights})`; c.beginPath(); c.moveTo(lx - 4 * u, y + h * 0.3); c.lineTo(lx + 4 * u, y + h * 0.3); c.lineTo(lx + 30 * u, y + h); c.lineTo(lx - 30 * u, y + h); c.fill(); c.restore(); }); }
  }
  /* ---------- world ---------- */
  const crew = (rnd, extra) => Object.assign({ top: { type: 'polo', col: RED }, sleeves: 'short', pants: '#1a1a22', shoe: '#1a1a1a', acc: { hat: 'cap', hatCol: '#1a1a22' } }, extra);
  const cfg = {
    id: 'fastfood', flow: 'counter', seed: 909, cap: 15, spawnEvery: 3.2, lane: 0.975, peopleScale: 1.6, cat: false, initial: 4,
    door: { x: -0.07 }, bin: { x: 0.3, face: -1 }, vignette: 'rgba(20,6,0,0.35)', wetSignX: 0.34,
    lights: [{ x: 0.42, y: 0.04, r: 260, col: '#fff4e0', a: 0.2 }, { x: 0.62, y: 0.04, r: 260, col: '#fff4e0', a: 0.2 }, { x: 0.15, y: 0.6, r: 220, col: '#ffe8c0', a: 0.14 }, { x: 0.88, y: 0.35, r: 200, col: '#ffd890', a: 0.14 }],
    windows: [{ x: 0.01, y: 0.14, w: 0.26, h: 0.4, city: lot, frame(c, V) { const u = V.u, x0 = V.X(0.01), y0 = V.Y(0.14), w = V.X(0.26), h = V.Y(0.4); c.strokeStyle = '#2a2a2a'; c.lineWidth = 5 * u; c.strokeRect(x0, y0, w, h); c.lineWidth = 3 * u; c.beginPath(); c.moveTo(x0 + w / 2, y0); c.lineTo(x0 + w / 2, y0 + h); c.stroke(); c.fillStyle = 'rgba(255,255,255,0.07)'; c.beginPath(); c.moveTo(x0 + w * 0.1, y0); c.lineTo(x0 + w * 0.22, y0); c.lineTo(x0 + w * 0.06, y0 + h); c.lineTo(x0 - w * 0.06, y0 + h); c.fill(); } }],
    look(rnd, V, opt) { const L = Looks.random(rnd, opt.look || {}); return L; },
    setup(V) {
      V.S.num = 100 + Math.floor(Math.random() * 50);
      // kitchen crew behind the registers (drawn first so they sit behind the cashiers)
      V.S.grill = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.5, y: 0.37, k: 0.8, look: crew(0, { skin: 'brown', hair: 'black', hairStyle: 'short', top: { type: 'polo', col: '#2a2a2a' }, acc: { hat: 'cap', hatCol: '#2a2a2a' } }), idle: [['flip', 2.2], ['press', 1.4], ['flip', 2], ['cheese', 1.4]] });
      V.S.fry = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.695, y: 0.37, k: 0.8, look: crew(0, { female: true, lashes: true, skin: 'light', hair: 'blonde', hairStyle: 'pony' }), idle: [['shake', 2], ['salt', 1.6], ['scoopF', 1.6], ['shake', 1.6]] });
      const c0 = V.addStaff({ role: 'cook', lane: 0, layer: 'back', armsOver: true, x: 0.42, y: 0.44, k: 0.95, look: crew(0, { female: true, lashes: true, skin: 'tan', hair: 'black', hairStyle: 'bun' }), idle: [['ready', 1.6], ['wipe2', 1.6]] });
      const c1 = V.addStaff({ role: 'cook', lane: 1, layer: 'back', armsOver: true, x: 0.6, y: 0.44, k: 0.95, look: crew(0, { skin: 'pale', hair: 'auburn', hairStyle: 'curly', acc: { hat: 'cap', hatCol: '#1a1a22', glasses: '#2a2a2a' } }), idle: [['ready', 1.6], ['wipe2', 1.6]] });
      V.S.cashiers = [c0, c1];
      V.S.drive = V.addStaff({ role: 'idle', layer: 'back', armsOver: true, x: 0.875, y: 0.42, k: 0.9, look: crew(0, { skin: 'olive', hair: 'dbrown', hairStyle: 'side', headset: true }), idle: [['headset', 3], ['bagUp', 1.6]] });
      V.S.mgr = V.addStaff({ role: 'idle', floor: true, x: 0.8, feetY: 0.93, look: { skin: 'brown', hair: 'black', hairStyle: 'buzz', top: { type: 'shirt', col: '#f4f4f4', tie: '#2a2a2a' }, sleeves: 'short', pants: '#2a2a2a', acc: { glasses: '#2a2a2a' } }, idle: [['stand', 2.4], ['clip', 2.4], ['stand', 2]] });
      V.S.tables = [[0.075, 0.87], [0.205, 0.89]].map(([f, y]) => ({ x: V.X(f), y: V.Y(y) }));
      V.S.car = { t: 0 };
    },
    seats(V) { const sc = V.sc; return [[0.03, 1, 0], [0.12, -1, 0], [0.16, 1, 1], [0.25, -1, 1]].map(([f, dir, ti]) => ({ x: V.X(f), y: V.S.tables[ti].y - 60 * sc, dir, tableRef: V.S.tables[ti] })); },
    queues(V) { const X = V.X, L = V.lane(); return [0, 1].map((lane) => [0, 1, 2, 3, 4, 5].map((i) => [X(lane ? 0.6 : 0.42) - i * 30 * V.u * (lane ? -1 : 1) + (i % 2 ? 6 : -6) * V.u, L - (i % 2) * 4 * V.u, X(lane ? 0.6 : 0.42)])); },
    orderDesk: { lookX: 0.5 },
    standSpots: [[0.29, 0, -1], [0.33, 4, -1]],
    dish(a, V) {
      const togo = Math.random() < 0.45; a.num = ++V.S.num; if (V.S.num > 999) V.S.num = 100;
      const r = Math.random(), kind = r < 0.5 ? 'burger' : r < 0.75 ? 'nuggets' : 'fries';
      const util = kind === 'burger' ? () => Items.burger : kind === 'nuggets' ? () => Items.nugget : () => Items.fries;
      return { togo, kind, num: a.num, hand: togo ? bagHand : trayHand, utensil: util, sip: Items.shake, bites: 4, biteT: 2.2, eatAct: 'eat', trash: Items.napkin };
    },
    prep(j, s, V) {
      const home = s.spec.x;
      const steps = [['punch', 1.2], Object.assign(['grabB', 1], { walk: 0.505 }), Object.assign(['scoopF', 1.2], { walk: 0.66 }), Object.assign(['pour', 1.2], { walk: 0.36 }), Object.assign([j.dish.togo ? 'bag' : 'trayUp', 1.2], { walk: home })];
      return steps;
    },
    pose(s, ps, t, V) {
      const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
      if (s.spec.look.headset || s === V.S.drive) ps.onHead = (c) => { c.strokeStyle = '#1a1a1a'; c.lineWidth = 1.2; c.beginPath(); c.arc(0, -2, 11, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.fillStyle = '#1a1a1a'; ellipse(c, 10, -1, 2, 3); c.fill(); c.beginPath(); c.moveTo(10, 1); c.quadraticCurveTo(8, 8, 3, 8); c.stroke(); };
      switch (s.act) {
        case 'punch': { const p = Math.abs(Math.sin(k * 12)); ps.arms = [A(-1, -6, 56, { grip: 'open' }), A(1, 10, 52 + p * 4, { grip: 'point' })]; ps.face.lookY = 1; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.5; return; }
        case 'grabB': ps.arms = [A(-1, -4, 40, { grip: 'open' }), A(1, 14, 26 - Math.min(1, k * 2) * 6, { item: (c, x, y) => burgerArt(c, x + 2, y, 0.4) })]; ps.head.turn = 0.7; return;
        case 'scoopF': { const p = Math.min(1, k / 0.6); ps.arms = [A(-1, 10, 50 - p * 10, { item: (c, x, y) => friesArt(c, x + 2, y, 0.5) }), A(1, 18, 48 - p * 8, { grip: 'open' })]; ps.head.turn = 0.7; ps.face.lookY = 1; return; }
        case 'pour': ps.arms = [A(-1, -6, 50), A(1, 14, 30, { item: (c, x, y) => cupArt(c, x + 2, y, 0.5) })]; ps.head.turn = 0.7; ps.face.lookY = 0; if (Math.random() < 0.1) SFX('pop'); return;
        case 'bag': ps.arms = [A(-1, -4, 50, { grip: 'open' }), A(1, 12, 38 - Math.abs(Math.sin(k * 6)) * 4, { item: bagHand })]; ps.face.mouth = 'smile'; return;
        case 'trayUp': ps.arms = [A(-1, -10, 52, { grip: 'open' }), A(1, 12, 52, { grip: 'open' })]; ps.over = (c) => { c.save(); c.translate(0, 58); trayHand(c, 6, -6); c.restore(); }; ps.face.mouth = 'smile'; return;
        case 'ready': ps.arms = [A(-1, -8, 56, { grip: 'open' }), A(1, 10, 56, { grip: 'open' })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'wipe2': ps.arms = [A(-1, -6, 56), A(1, 6 + Math.sin(k * 9) * 10, 58, { grip: 'open', item: Items.napkin })]; ps.face.lookY = 1; return;
        case 'hand': ps.arms = [A(-1, -6, 50, { grip: 'open' }), A(1, 24, 44, { item: s.job && s.job.dish && s.job.dish.hand })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'flip': { const p = (k % 1.1) / 1.1, f = Math.sin(p * Math.PI); ps.arms = [A(-1, 2, 58, { grip: 'open' }), A(1, 16, 58 - f * 12, { item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.3); c.fillStyle = '#b8bcc0'; c.fillRect(0, -0.6, 8, 1.2); c.fillRect(8, -2, 6, 4); c.fillStyle = '#5a2a10'; if (f > 0.2) { c.save(); c.translate(11, -2 - f * 6); c.rotate(p * TAU); ellipse(c, 0, 0, 3.4, 1.2); c.fill(); c.restore(); } c.restore(); } })]; ps.face.lookY = 1; ps.head.nod = 1.2; return; }
        case 'press': ps.arms = [A(-1, 6, 56), A(1, 14, 60, { grip: 'open' })]; ps.lean = 0.1; ps.face.lookY = 1; return;
        case 'cheese': ps.arms = [A(-1, 4, 56, { grip: 'open', item: (c, x, y) => { c.fillStyle = '#ffc830'; c.fillRect(x, y - 1, 5, 4); } }), A(1, 14, 58, { grip: 'open' })]; ps.face.lookY = 1; return;
        case 'shake': { const p = Math.sin(k * 14) * 2; ps.arms = [A(-1, 10, 50 + p, { item: (c, x, y) => { c.strokeStyle = '#8a8a8a'; c.lineWidth = 1; c.strokeRect(x, y - 3, 14, 6); c.fillStyle = '#ffd040'; c.fillRect(x + 1, y - 2, 12, 4); } }), A(1, 4, 52 + p)]; ps.face.lookY = 1; return; }
        case 'salt': ps.arms = [A(-1, 4, 56, { grip: 'open' }), A(1, 14 + Math.sin(k * 16) * 2, 40, { item: (c, x, y) => { c.fillStyle = '#d8dce0'; c.fillRect(x - 2, y - 3, 4, 6); } })]; if (Math.random() < 0.3) V.burst(s.x + 14 * V.sc * 0.8, s.y + 44 * V.sc * 0.8, 1, '#ffffff', { up: 10, sp: 6, g: 120, life: 0.5, sz: 0.8 }); return;
        case 'headset': ps.arms = [A(-1, -6, 50), A(1, 12, -2, { grip: 'open' })]; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(t * 9)) * 0.6; ps.head.turn = 0.5; return;
        case 'bagUp': ps.arms = [A(-1, 4, 50, { grip: 'open' }), A(1, 26, 24, { item: bagHand })]; ps.face.mouth = 'big'; s.face = 1; return;
        case 'clip': ps.arms = [A(-1, -6, 28, { item: (c, x, y) => { c.fillStyle = '#8a5a2a'; c.fillRect(x - 1, y - 6, 8, 11); c.fillStyle = '#f4f4f4'; c.fillRect(x, y - 4, 6, 8); } }), A(1, 6 + Math.sin(k * 9), 28)]; ps.face.lookY = 0.8; return;
        case 'fix': { const p = Math.sin(k * 10); ps.arms = [A(-1, 20, 30, { grip: 'open' }), A(1, 24 + p * 3, 22, { item: wrench })]; ps.lean = 0.08; ps.face.mouth = 'flat'; ps.face.brow = 0.6; return; }
        case 'thumbs': ps.arms = [A(-1, -10, 44, { item: toolbox }), A(1, 18, 4, { grip: 'point', handAng: -1.6 })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'carryTool': ps.arms = [A(-1, -10, 48, { item: toolbox }), A(1, 10, 46)]; return;
        case 'cake': ps.arms = [A(-1, -22, 26, { grip: 'open', item: cakeItem(s.lit) }), A(1, -16, 30, { grip: 'open' })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
        case 'sing': ps.arms = [A(-1, -14, 30, { grip: 'open' }), A(1, 14, 30, { grip: 'open' })]; ps.face.mouth = 'o'; ps.face.open = 0.5 + Math.abs(Math.sin(t * 6)) * 0.4; ps.head.tilt = Math.sin(t * 3) * 0.1; return;
        case 'rush': ps.arms = [A(-1, -24, 0, { grip: 'open' }), A(1, 24, 0, { grip: 'open' })]; ps.face.mouth = 'o'; ps.face.open = 1; return;
      }
      return false;
    },
    custPose(a, ps, t, V) {
      if (a.crown) { const ph = ps.onHead; ps.onHead = (c) => { if (ph) ph(c); crown(a.crown)(c); }; }
      if (a.courier) { const pv = ps.over; ps.over = (c) => { if (pv) pv(c); c.save(); c.translate(-14, 4); c.fillStyle = a.courier; roundRect(c, -10, 0, 20, 26, 3); c.fill(); c.fillStyle = 'rgba(255,255,255,0.25)'; c.fillRect(-10, 6, 20, 2); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(-10, 22, 20, 4); c.restore(); }; if (a.act === 'stand') { ps.arms = [{ side: -1, x: -6, y: 30, grip: 'fist', item: Items.phone }, { side: 1, x: 6, y: 32, grip: 'fist' }]; ps.face.lookY = 1; ps.head.nod = 1; } }
      if (a.act === 'blowCandles') { ps.face.mouth = 'o'; ps.face.open = 0.6; ps.lean = 0.1; ps.face.eyes = 'closed'; }
      if (a.awe > 0) { ps.face.mouth = 'o'; ps.face.open = 0.6; ps.face.brow = 1; }
    },
    tick(V, dt, t) {
      V.agents.forEach((a) => { if (a.awe > 0) a.awe -= dt; });
      // drive-thru car cycle: roll up, pause at the window, hand-out, drive off
      const car = V.S.car; car.t += dt; if (car.t > 16) { car.t = 0; car.col = pick(['#2a5aa0', '#c8281e', '#e8e8e8', '#3a3a3a', '#5a8a3a', '#e8c040']); }
      const d = V.S.drive; if (car.t > 7 && car.t < 9.4 && d.act !== 'bagUp') { d.act = 'bagUp'; d.actT = 0; if (car.t < 7.1) SFX('ding'); }
      // order board numbers
      V.S.prep = V.jobs.filter((j) => j.kind === 'prep' && j.state !== 'ready' && j.state !== 'done' && j.dish).map((j) => j.dish.num);
      V.S.ready = V.jobs.filter((j) => j.kind === 'prep' && j.state === 'ready' && j.dish).map((j) => j.dish.num);
      // fryer beep
      V.S.beepT = (V.S.beepT || 0) - dt; if (V.S.beepT <= 0) { V.S.beepT = 9 + Math.random() * 6; V.S.beep = 1.2; SFX('ding'); }
      if (V.S.beep > 0) V.S.beep -= dt;
      // ice-cream machine technician
      if (V.S.techReq) { V.S.techReq = false; V.S.icDown = true; const tech = V.addStaff({ role: 'idle', floor: true, x: -0.05, feetY: 0.975, speed: 70, look: { skin: 'light', hair: 'grey', hairStyle: 'short', build: 1.2, acc: { hat: 'cap', hatCol: '#2a4a8a', mustache: true }, top: { type: 'polo', col: '#2a4a8a' }, sleeves: 'short', pants: '#2a2a3a' }, idle: [['stand', 99]], life: function* (s) {
        s.act = 'carryTool'; yield ['walk', V.X(0.31), V.lane() - 30 * V.u]; s.face = 1; s.act = 'fix'; s.actT = 0; for (let i = 0; i < 8; i++) { yield ['wait', 1]; if (i % 2) { V.burst(V.X(0.355), V.H * 0.47, 6, '#ffd860', { kind: 'spark', up: 120, sp: 60, life: 0.6, sz: 2 }); SFX('snip'); } }
        V.S.icDown = false; s.act = 'thumbs'; s.actT = 0; s.say = { txt: 'Fixed it!', t: 2.2 }; SFX('cheer'); V.S.cashiers.forEach((c) => { c.cheer = 1.6; }); V.agents.forEach((a) => { if (Math.random() < 0.6) a.cheer = 1.6; }); yield ['wait', 2.4];
        s.act = 'carryTool'; yield ['walk', -V.X(0.08), V.lane()]; s.gone = true; } }); V.S.tech = tech; }
      if (V.S.tech && V.S.tech.gone) { V.staff = V.staff.filter((x) => x !== V.S.tech); V.S.tech = null; }
      // delivery couriers
      if (V.S.courReq) { V.S.courReq = false; ['#2aa04a', '#f07a1a', '#1aa0b0'].forEach((col, i) => { const a = V.customer({ dx: -i * 60 * V.u, life: function* (a) { a.courier = col; a.act = 'walk'; yield ['walk', V.X(0.68) + i * 34 * V.u, V.lane() - 10 * V.u]; a.face = -1; a.act = 'stand'; yield ['wait', 3 + i * 1.6]; a.look = V.X(0.6); a.act = 'take'; a.actT = 0; a.item2 = bagHand; yield ['wait', 1]; a.item = bagHand; a.item2 = null; a.keepItem = true; a.act = 'walk'; yield ['walk', -V.X(0.08), V.lane()]; a.done = true; } }); }); }
      // birthday party
      const B = V.S.bday;
      if (B) { B.t += dt;
        if (!B.kids) { const tb = V.S.tables[1]; B.kids = []; for (let i = 0; i < 4; i++) { const kid = V.customer({ dx: -i * 30 * V.u, look: { age: i === 3 ? 'adult' : 'kid' }, life: function* (a) { a.crown = i === 3 ? null : ['#ffd040', '#ff7ab0', '#5ab0ff'][i]; a.act = 'walk'; yield ['walk', tb.x - 60 * V.u + i * 40 * V.u, V.lane() - 40 * V.u]; a.face = i < 2 ? 1 : -1; a.look = tb.x; while (!B.done) { a.act = B.blow && i === 1 ? 'blowCandles' : B.sing ? 'cheer' : Math.random() < 0.5 ? 'laugh' : 'talk'; a.cheer = B.sing ? 1 : 0; a.actT = 0; yield ['wait', 1]; } a.act = 'wave'; a.actT = 0; yield ['wait', 1]; a.act = 'walk'; yield ['walk', -V.X(0.08), V.lane()]; a.done = true; } }); B.kids.push(kid); } }
        if (B.t > 7 && !B.cake) { B.cake = V.addStaff({ role: 'idle', floor: true, x: 0.36, feetY: 0.975, speed: 60, look: crew(0, { female: true, lashes: true, skin: 'brown', hair: 'black', hairStyle: 'pony' }), idle: [['stand', 99]], life: function* (s) { s.lit = true; s.act = 'cake'; yield ['walk', V.S.tables[1].x + 70 * V.u, V.lane() - 20 * V.u]; s.face = -1; B.sing = true; s.act = 'sing'; s.actT = 0; s.say = { txt: '♪ Happy birthday! ♪', t: 4 }; SFX('fanfare'); yield ['wait', 4]; B.blow = true; yield ['wait', 1.4]; s.lit = false; B.blown = true; SFX('cheer'); V.burst(V.S.tables[1].x, V.S.tables[1].y - 60 * V.u, 40, () => pick(['#ff5a8a', '#5ab0ff', '#ffd040', '#6ad08a', '#c890ff']), { kind: 'confetti', up: 260, sp: 180, life: 2.4 }); s.act = 'cake'; yield ['wait', 2]; B.cakeOn = true; s.act = 'walk'; yield ['walk', V.X(0.36), V.lane()]; s.gone = true; } }); }
        if (B.cake && B.cake.gone) { V.staff = V.staff.filter((x) => x !== B.cake); B.cake = { gone: true, done: true }; }
        if (B.t > 26) B.done = true; }
      // lunch rush
      if (V.S.rushReq) { V.S.rushReq = false; const m = V.S.mgr; Crowd.hijack(m, (function* () { m.act = 'rush'; m.actT = 0; m.say = { txt: 'Here comes the rush!', t: 2.2 }; yield ['wait', 2.2]; })()); for (let i = 0; i < 5; i++) V.customer({ dx: -i * 40 * V.u }); }
    },
    back(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X, rnd = mulberry32(19);
      // warm modern interior: wood-slat upper wall, red feature band, cream lower
      x.fillStyle = '#f2e8d8'; x.fillRect(0, 0, W, H * 0.7);
      x.fillStyle = '#2a2a2e'; x.fillRect(0, 0, W, H * 0.05);
      for (let k = 0; k < W; k += 10 * u) { x.fillStyle = shade('#b88a5a', (rnd() - 0.5) * 0.15); x.fillRect(k, H * 0.05, 8 * u, H * 0.05); }
      x.fillStyle = RED; x.fillRect(0, H * 0.1, W, H * 0.012); x.fillStyle = GOLD; x.fillRect(0, H * 0.112, W, H * 0.006);
      // kitchen wall behind the counter: stainless + tile
      const kx0 = X(0.33), kx1 = X(0.79); x.fillStyle = '#d8dce0'; x.fillRect(kx0, H * 0.24, kx1 - kx0, H * 0.33); x.strokeStyle = 'rgba(120,130,140,0.35)'; x.lineWidth = 0.8;
      for (let gy = H * 0.24; gy < H * 0.57; gy += 9 * u) for (let gx = kx0 + (Math.round(gy / (9 * u)) % 2) * 9 * u; gx < kx1; gx += 18 * u) x.strokeRect(gx, gy, 18 * u, 9 * u);
      // grill (flat-top) + fry station + heated holding cabinet + drink tower
      x.fillStyle = '#3a3a3e'; x.fillRect(X(0.45), H * 0.47, X(0.11), H * 0.03); x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.57, [[0, '#b8bcc0'], [1, '#6a6e72']]); x.fillRect(X(0.45), H * 0.5, X(0.11), H * 0.07);
      x.fillStyle = '#b8bcc0'; x.fillRect(X(0.64), H * 0.45, X(0.1), H * 0.12); x.fillStyle = '#2a2a2a'; x.fillRect(X(0.645), H * 0.455, X(0.04), H * 0.025); x.fillRect(X(0.69), H * 0.455, X(0.04), H * 0.025);
      x.fillStyle = '#c8ccd0'; x.fillRect(X(0.56), H * 0.3, X(0.075), H * 0.12); for (let r = 0; r < 3; r++) { x.fillStyle = 'rgba(255,160,60,0.35)'; x.fillRect(X(0.565), H * 0.31 + r * H * 0.037, X(0.065), H * 0.03); for (let q = 0; q < 4; q++) { x.fillStyle = q % 2 ? '#f4e8c8' : '#e8c890'; x.fillRect(X(0.568) + q * X(0.015), H * 0.318 + r * H * 0.037, X(0.012), H * 0.018); } }
      x.fillStyle = '#2a2a2e'; x.fillRect(X(0.34), H * 0.36, X(0.06), H * 0.12); for (let q = 0; q < 6; q++) { x.fillStyle = ['#2a1a10', '#e8a020', '#c8201a', '#2a6a2a', '#d8d8d8', '#5a2a6a'][q]; x.fillRect(X(0.343) + q * X(0.009), H * 0.38, X(0.007), H * 0.025); }
      // menu boards (frames; content is live)
      [0.37, 0.5, 0.63].forEach((f) => { x.fillStyle = '#1a1a1a'; x.fillRect(X(f) - X(0.062), H * 0.12, X(0.124), H * 0.11); });
      // drive-thru bay wall (right)
      x.fillStyle = '#e8dcc8'; x.fillRect(X(0.79), H * 0.12, W - X(0.79), H * 0.45); x.fillStyle = '#2a2a2a'; x.fillRect(X(0.8), H * 0.19, X(0.19), H * 0.25);
      x.fillStyle = RED; x.fillRect(X(0.8), H * 0.13, X(0.19), H * 0.05); x.fillStyle = '#ffffff'; x.font = `bold ${13 * u}px Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRIVE-THRU', X(0.895), H * 0.155);
      // self-order kiosks on the left wall below the window
      [0.05, 0.12, 0.19].forEach((f) => { x.fillStyle = '#2a2a2e'; roundRect(x, X(f) - 14 * u, H * 0.56, 28 * u, 46 * u, 3 * u); x.fill(); x.fillStyle = '#e8eef4'; x.fillRect(X(f) - 11 * u, H * 0.565, 22 * u, 32 * u); x.fillStyle = RED; x.fillRect(X(f) - 11 * u, H * 0.565, 22 * u, 6 * u); x.fillStyle = '#ffd040'; for (let q = 0; q < 4; q++) x.fillRect(X(f) - 9 * u + (q % 2) * 10 * u, H * 0.575 + 4 * u + Math.floor(q / 2) * 11 * u, 8 * u, 8 * u); });
      // floor: polished quarry tiles
      const fy = H * 0.7; x.fillStyle = '#8a6a5a'; x.fillRect(0, fy, W, H - fy);
      for (let r = 0; r < 9; r++) { const y0 = fy + (H - fy) * Math.pow(r / 9, 1.3), y1 = fy + (H - fy) * Math.pow((r + 1) / 9, 1.3); for (let q = -2; q < 20; q++) { const sp = 1 + r * 0.05, xa = W / 2 + (q * W / 18 - W / 2) * sp, xb = W / 2 + ((q + 1) * W / 18 - W / 2) * sp; x.fillStyle = (q + r) % 2 ? shade('#c84a3a', (rnd() - 0.5) * 0.1) : shade('#e8dcc8', (rnd() - 0.5) * 0.06); x.fillRect(xa + 1, y0 + 1, xb - xa - 2, y1 - y0 - 1.5); } }
      x.fillStyle = linear(x, 0, fy, 0, H, [[0, 'rgba(255,255,255,0.1)'], [1, 'rgba(0,0,0,0.1)']]); x.fillRect(0, fy, W, H - fy);
    },
    counter(x, V) {
      const W = V.W, H = V.H, u = V.u, X = V.X;
      const x0 = X(0.33), x1 = X(0.79), top = H * 0.56;
      x.fillStyle = linear(x, 0, top, 0, H * 0.7, [[0, '#f4f4f4'], [0.06, '#b8bcc0'], [0.08, RED], [1, '#8a1410']]); x.fillRect(x0, top, x1 - x0, H * 0.14);
      for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(x0 + k * (x1 - x0) / 12, top + H * 0.02, 2 * u, H * 0.12); }
      archLogo(x, X(0.51), top + H * 0.075, 1.2 * u, false);
      // registers (screens face the crew), tray stack, napkin and straw dispensers
      [0.42, 0.6].forEach((f) => { x.fillStyle = '#2a2a2e'; x.fillRect(X(f) - 14 * u, top - 22 * u, 28 * u, 18 * u); x.fillStyle = '#3a3a40'; x.fillRect(X(f) - 3 * u, top - 4 * u, 6 * u, 4 * u); x.fillStyle = '#6ab0ff'; x.fillRect(X(f) - 12 * u, top - 20 * u, 24 * u, 14 * u); });
      for (let k = 0; k < 6; k++) { x.fillStyle = RED; x.fillRect(X(0.505) - 16 * u, top - 3 * u - k * 2.4 * u, 32 * u, 2 * u); }
      x.fillStyle = '#c8ccd0'; x.fillRect(X(0.74), top - 18 * u, 16 * u, 18 * u); x.fillStyle = '#f4f4f4'; x.fillRect(X(0.743), top - 16 * u, 10 * u, 10 * u);
      // soft-serve machine at the counter's end
      const sx = X(0.355); x.fillStyle = linear(x, sx - 16 * u, 0, sx + 16 * u, 0, [[0, '#a8acb0'], [0.5, '#f0f2f4'], [1, '#9a9ea2']]); x.fillRect(sx - 16 * u, top - 54 * u, 32 * u, 54 * u); x.fillStyle = '#2a2a2e'; x.fillRect(sx - 10 * u, top - 46 * u, 20 * u, 8 * u); x.fillStyle = '#c8ccd0'; x.fillRect(sx - 3 * u, top - 30 * u, 6 * u, 8 * u);
    },
    backLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H, W = V.W; V.ctx = ctx;
      // menu boards: left = burgers, middle = rotating promo, right = drinks & desserts
      const scr = (f, draw) => { const bx = X(f) - X(0.058), by = H * 0.125, bw = X(0.116), bh = H * 0.1; ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.clip(); draw(bx, by, bw, bh); ctx.restore(); };
      const txt = (s2, x, y, sz, col = '#ffffff', al = 'left') => { ctx.fillStyle = col; ctx.font = `bold ${sz * u}px Arial, sans-serif`; ctx.textAlign = al; ctx.textBaseline = 'middle'; ctx.fillText(s2, x, y); };
      scr(0.37, (bx, by, bw, bh) => { ctx.fillStyle = '#1e1e22'; ctx.fillRect(bx, by, bw, bh); txt('BURGERS', bx + 6 * u, by + 9 * u, 9, GOLD); [['Classic Stack', '5.29'], ['Double Cheese', '4.49'], ['Crispy Chicken', '5.99'], ['Fish Fillet', '4.89']].forEach(([n, p], i) => { txt(n, bx + 6 * u, by + 22 * u + i * 12 * u, 7.4); txt(p, bx + bw - 6 * u, by + 22 * u + i * 12 * u, 7.4, GOLD, 'right'); }); });
      scr(0.5, (bx, by, bw, bh) => { const ph = Math.floor(t / 4) % 3, sl = Math.min(1, (t % 4) * 3); ctx.fillStyle = [RED, '#2a2a2e', '#f4a020'][ph]; ctx.fillRect(bx, by, bw, bh); ctx.save(); ctx.translate((1 - sl) * bw, 0);
        if (ph === 0) { burgerArt(ctx, bx + bw * 0.3, by + bh * 0.62, 2.6 * u); txt('COMBO', bx + bw * 0.58, by + bh * 0.35, 12, GOLD); txt('$8.49', bx + bw * 0.58, by + bh * 0.66, 14); }
        else if (ph === 1) { friesArt(ctx, bx + bw * 0.28, by + bh * 0.66, 2.6 * u); txt('HOT', bx + bw * 0.55, by + bh * 0.3, 11, GOLD); txt('& CRISPY', bx + bw * 0.55, by + bh * 0.55, 10); txt('FRIES', bx + bw * 0.55, by + bh * 0.8, 11, GOLD); }
        else { cupArt(ctx, bx + bw * 0.25, by + bh * 0.7, 2.6 * u); txt('ANY SIZE', bx + bw * 0.5, by + bh * 0.35, 11, '#ffffff'); txt('$1', bx + bw * 0.5, by + bh * 0.7, 18, RED); }
        ctx.restore(); });
      scr(0.63, (bx, by, bw, bh) => { ctx.fillStyle = '#1e1e22'; ctx.fillRect(bx, by, bw, bh); txt('SWEETS & SIPS', bx + 6 * u, by + 9 * u, 9, GOLD); [['Soft-serve cone', V.S.icDown ? 'N/A' : '1.49'], ['Shake', '3.29'], ['Apple pie', '1.79'], ['Iced coffee', '2.39']].forEach(([n, p], i) => { txt(n, bx + 6 * u, by + 22 * u + i * 12 * u, 7.4, V.S.icDown && !i ? '#888' : '#ffffff'); txt(p, bx + bw - 6 * u, by + 22 * u + i * 12 * u, 7.4, V.S.icDown && !i ? '#ff6a5a' : GOLD, 'right'); }); });
      // order-number board above the drive-thru bay
      const ox = X(0.8), oy = H * 0.455, ow = X(0.19), oh = H * 0.09; ctx.fillStyle = '#121214'; ctx.fillRect(ox, oy, ow, oh); txt('PREPARING', ox + ow * 0.25, oy + 8 * u, 7.6, '#c8c8c8', 'center'); txt('READY', ox + ow * 0.75, oy + 8 * u, 7.6, GOLD, 'center'); ctx.fillStyle = '#3a3a3e'; ctx.fillRect(ox + ow / 2 - 0.5 * u, oy + 3 * u, 1 * u, oh - 6 * u);
      (V.S.prep || []).slice(0, 6).forEach((n, i) => txt(String(n), ox + ow * (0.1 + (i % 3) * 0.14), oy + 22 * u + Math.floor(i / 3) * 14 * u, 9, '#ffffff', 'center'));
      (V.S.ready || []).slice(0, 6).forEach((n, i) => txt(String(n), ox + ow * (0.6 + (i % 3) * 0.14), oy + 22 * u + Math.floor(i / 3) * 14 * u, 10, Math.sin(t * 6) > 0 ? GOLD : '#ffffff', 'center'));
      // drive-thru window: car rolls up
      const wx = X(0.8), wy = H * 0.19, ww = X(0.19), wh = H * 0.25, car = V.S.car, lit = V.lit || 1;
      ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip(); ctx.fillStyle = Amb.st && Amb.st.lights > 0.5 ? '#1a2030' : '#8ab0d0'; ctx.fillRect(wx, wy, ww, wh); ctx.fillStyle = '#4a4a50'; ctx.fillRect(wx, wy + wh * 0.75, ww, wh * 0.25);
      const ct = car.t, cxp = ct < 6 ? lerp(wx + ww + 120 * u, wx + ww * 0.5, Math.min(1, ct / 6)) : ct < 10 ? wx + ww * 0.5 : wx + ww * 0.5 - (ct - 10) * 70 * u, cy = wy + wh * 0.82, col = car.col || '#2a5aa0';
      ctx.fillStyle = col; roundRect(ctx, cxp - 60 * u, cy - 26 * u, 120 * u, 30 * u, 8 * u); ctx.fill(); roundRect(ctx, cxp - 34 * u, cy - 50 * u, 70 * u, 28 * u, 8 * u); ctx.fill(); ctx.fillStyle = 'rgba(160,200,230,0.8)'; ctx.fillRect(cxp - 28 * u, cy - 46 * u, 58 * u, 20 * u);
      ctx.fillStyle = '#e8b890'; ellipse(ctx, cxp - 6 * u, cy - 36 * u, 6 * u, 7 * u); ctx.fill(); ctx.fillStyle = '#3a2a1a'; ctx.beginPath(); ctx.arc(cxp - 6 * u, cy - 38 * u, 6.4 * u, Math.PI, 0); ctx.fill();
      if (ct > 7.6 && ct < 10) { ctx.fillStyle = '#e8b890'; ctx.fillRect(cxp - 4 * u, cy - 30 * u, 16 * u, 4 * u); bagArt(ctx, cxp + 14 * u, cy - 28 * u, 1.6 * u); }
      ctx.fillStyle = '#1a1a1a'; ellipse(ctx, cxp - 38 * u, cy + 4 * u, 10 * u, 10 * u); ctx.fill(); ellipse(ctx, cxp + 38 * u, cy + 4 * u, 10 * u, 10 * u); ctx.fill();
      ctx.restore(); ctx.strokeStyle = '#8a8a90'; ctx.lineWidth = 4 * u; ctx.strokeRect(wx, wy, ww, wh); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(wx + ww * 0.1, wy, ww * 0.1, wh);
      // sizzling patties on the flat-top and bubbling fryer oil
      for (let k = 0; k < 6; k++) { const px = X(0.46) + k * X(0.016), py = H * 0.483, flip = Math.sin(t * 0.8 + k * 1.7) > 0.96; ctx.fillStyle = '#5a2a10'; ellipse(ctx, px, py - (flip ? 3 * u : 0), 6 * u, 1.8 * u); ctx.fill(); if (k % 2) { ctx.fillStyle = '#ffc830'; ctx.fillRect(px - 4 * u, py - 2.4 * u, 8 * u, 1.2 * u); } }
      if (Math.random() < 0.15) V.steam(X(0.5), H * 0.47, 1, 0.8);
      ctx.fillStyle = '#d8a040'; [0.665, 0.71].forEach((f) => { ctx.fillRect(X(f) - X(0.018), H * 0.457, X(0.036), H * 0.02); for (let b = 0; b < 4; b++) { ctx.fillStyle = 'rgba(255,240,180,0.7)'; ellipse(ctx, X(f) - X(0.014) + ((b * 13 + t * 40) % 30) * u * 0.9, H * 0.462, 1.4 * u, 1 * u); ctx.fill(); ctx.fillStyle = '#d8a040'; } });
      if (V.S.beep > 0 && Math.sin(t * 20) > 0) { ctx.fillStyle = '#ff3a2a'; ellipse(ctx, X(0.69), H * 0.448, 2.4 * u, 2.4 * u); ctx.fill(); }
      // soft-serve machine status
      const sx = X(0.355), top = H * 0.56; if (V.S.icDown) { ctx.save(); ctx.translate(sx, top - 34 * u); ctx.rotate(-0.06); ctx.scale(1.7, 1.7); ctx.fillStyle = '#ffffff'; ctx.fillRect(-20 * u, -9 * u, 40 * u, 20 * u); ctx.strokeStyle = RED; ctx.lineWidth = 1.4 * u; ctx.strokeRect(-20 * u, -9 * u, 40 * u, 20 * u); txt('SORRY!', 0, -3 * u, 6.6, RED, 'center'); txt('out of order', 0, 5 * u, 5, '#2a2a2a', 'center'); ctx.restore(); }
      else { ctx.fillStyle = '#6ad08a'; ellipse(ctx, sx + 8 * u, top - 42 * u, 1.6 * u, 1.6 * u); ctx.fill(); }
    },
    counterLive(ctx, t, dt, V) { // ready orders waiting on the counter
      const u = V.u, X = V.X, top = V.H * 0.56;
      (V.S.ready || []).slice(0, 3).forEach((n, i) => { const x = X(0.49) + i * 22 * u; bagArt(ctx, x, top - 4 * u, 1.5 * u); });
    },
    drawSeat(ctx, seat, t, V) { // red booth bench end (fixed seating)
      const k = V.sc, u = V.u, cx = seat.x, fy = seat.tableRef.y + 64 * u, back = cx - seat.dir * 20 * u;
      ctx.fillStyle = linear(ctx, back - 10 * u, 0, back + 10 * u, 0, [[0, '#7a1410'], [0.5, '#c8201a'], [1, '#7a1410']]); roundRect(ctx, back - 9 * u, fy - 118 * u, 18 * u, 118 * u, 6 * u); ctx.fill();
      ctx.fillStyle = '#a81a14'; roundRect(ctx, cx - 22 * u, fy - 50 * u, 44 * u, 12 * u, 4 * u); ctx.fill(); ctx.fillStyle = '#5a5a5e'; ctx.fillRect(cx - 18 * u, fy - 38 * u, 36 * u, 38 * u);
    },
    floorProps(V, t) {
      const u = V.u, out = [];
      V.S.tables.forEach((tb, i) => out.push({ y: tb.y + 1, f: () => { const ctx = V.ctx; ctx.fillStyle = '#4a4a4e'; ctx.fillRect(tb.x - 3 * u, tb.y - 10 * u, 6 * u, 64 * u); ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(ctx, tb.x, tb.y + 56 * u, 30 * u, 5 * u); ctx.fill();
        ctx.fillStyle = linear(ctx, tb.x - 40 * u, 0, tb.x + 40 * u, 0, [[0, '#d8c8a8'], [0.5, '#f4e8d0'], [1, '#c8b898']]); roundRect(ctx, tb.x - 40 * u, tb.y - 16 * u, 80 * u, 8 * u, 3 * u); ctx.fill();
        V.seats.filter((s) => s.tableRef === tb && s.who).forEach((s) => { trayHand(ctx, tb.x + (s.x - tb.x) * 0.45 + 6 * u, tb.y - 20 * u); });
        const B = V.S.bday; if (B && i === 1 && !B.done) { ['#ff5a8a', '#5ab0ff', '#ffd040'].forEach((col, q) => { const bx = tb.x - 30 * u + q * 30 * u + Math.sin(t * 1.4 + q) * 4 * u, by = tb.y - 170 * u - q * 12 * u; ctx.strokeStyle = 'rgba(80,80,80,0.6)'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); ctx.moveTo(tb.x - 20 * u + q * 20 * u, tb.y - 16 * u); ctx.quadraticCurveTo(bx + 6 * u, by + 60 * u, bx, by + 18 * u); ctx.stroke(); ctx.fillStyle = col; ellipse(ctx, bx, by, 14 * u, 17 * u); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(ctx, bx - 5 * u, by - 6 * u, 3 * u, 5 * u, 0.4); ctx.fill(); });
          if (B.cakeOn) { ctx.save(); ctx.translate(tb.x, tb.y - 20 * u); ctx.scale(2 * u, 2 * u); cakeItem(false)(ctx, 6, 0); ctx.restore(); } }
      } }));
      return out;
    },
    post(ctx, t, dt, V) {
      const u = V.u;
      const bubble = (x, y, txt, a) => { ctx.save(); ctx.globalAlpha = a; ctx.font = `bold ${14 * u}px Arial, sans-serif`; const w = ctx.measureText(txt).width + 18 * u; ctx.fillStyle = 'rgba(255,255,255,0.96)'; roundRect(ctx, x - w / 2, y - 14 * u, w, 24 * u, 9 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 5 * u, y + 9 * u); ctx.lineTo(x + 2 * u, y + 17 * u); ctx.lineTo(x + 6 * u, y + 9 * u); ctx.fill(); ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 2 * u); ctx.restore(); };
      V.staff.concat(V.agents).forEach((s) => { if (s.say && s.say.t > 0) { s.say.t -= dt; const top = s.sitting ? s.y - 30 * V.sc : s.y - 122 * V.sc * (s.spec && s.spec.k || 1); bubble(s.x, top - 30 * u, s.say.txt, Math.min(1, s.say.t * 2)); } });
      // the cashier calls the number when an order is ready
      (V.S.cashiers || []).forEach((c) => { if (c.act === 'hand' && c.job && c.actT < 0.1 && !(c.say && c.say.t > 0)) c.say = { txt: `Order ${c.job.dish.num}!`, t: 1.6 }; });
    },
    events(V) {
      return [
        { at: 0.15, name: 'birthday-party', dur: 30, start() { V.S.bday = { t: 0 }; }, end() { V.S.bday = null; } },
        { at: 0.36, name: 'icecream', dur: 20, start() { V.S.techReq = true; } },
        { at: 0.56, name: 'couriers', dur: 20, start() { V.S.courReq = true; } },
        { at: 0.74, name: 'rush', dur: 20, start() { V.S.rushReq = true; } },
      ];
    },
    onClear(e, V) {
      V.burst(V.X(0.68), V.H * 0.45, e.big ? 14 : 6, '#ffd040', { kind: 'confetti', up: 140, sp: 90, life: 1.4, sz: 2.4 });
      if (e.big) SFX('ding');
    },
  };
  defineWorld({ id: 'fastfood', thumbY: 0.4 }, makeVenue(cfg));
})();
