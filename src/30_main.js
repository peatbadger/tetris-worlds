/* ================= App: rendering, FX, UI, input, loop ================= */
(() => {
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
  const env = { pulse: 0, flash: 0, mx: 0, speed: 1, events: [], time: 0 };
  let targetMx = 0, T = 0;

  /* ---------- background manager (cross-fading stage canvases) ---------- */
  const BG = (() => {
    const canv = [$('bgA'), $('bgB')], ctxs = canv.map((c) => c.getContext('2d'));
    const inst = {}; let W = 0, H = 0, D = 1, front = 0, cur = null, prev = null, prevUntil = 0, fadeTimer = null;
    function size() {
      W = innerWidth; H = innerHeight; D = Math.min(window.devicePixelRatio || 1, 1.5); if (W * H * D * D > 3.2e6) D = 1;
      canv.forEach((c) => { c.width = Math.round(W * D); c.height = Math.round(H * D); });
      Object.values(inst).forEach((s) => (s.dirty = true));
    }
    function get(id) {
      let s = inst[id]; if (!s) s = inst[id] = { obj: STAGE_FACTORIES[id](), dirty: true };
      if (s.dirty) { s.obj.resize(W, H, D); s.dirty = false; }
      return s.obj;
    }
    function set(id, instant) {
      if (cur === id) return;
      get(id);
      if (cur === null || instant) { cur = id; prev = null; canv[front].style.transition = 'none'; canv[front].style.opacity = 1; canv[1 - front].style.opacity = 0; return; }
      prev = cur; cur = id;
      const nb = 1 - front, old = front;
      canv[nb].style.transition = 'none'; canv[nb].style.opacity = 0; canv[nb].style.zIndex = 2; canv[old].style.zIndex = 1;
      void canv[nb].offsetWidth;
      canv[nb].style.transition = 'opacity 1.8s ease'; canv[nb].style.opacity = 1;
      front = nb; prevUntil = performance.now() + 1900;
      clearTimeout(fadeTimer); fadeTimer = setTimeout(() => { canv[old].style.transition = 'none'; canv[old].style.opacity = 0; }, 1900);
    }
    function draw(t, dt, e) {
      const d1 = (i, id) => { const c = ctxs[i]; c.setTransform(D, 0, 0, D, 0, 0); const o = get(id); o.draw(c, t, dt, e); if (!o.selfGrade) Amb.grade(c, W, H, { indoor: false, t }); };
      if (cur) d1(front, cur);
      if (prev && performance.now() < prevUntil) d1(1 - front, prev); else prev = null;
    }
    return { size, set, draw, get current() { return cur; } };
  })();

  /* ---------- particles ---------- */
  const FX = (() => {
    const c = $('fx'), ctx = c.getContext('2d'); let W, H, D; let parts = [], rings = [];
    function size() { W = innerWidth; H = innerHeight; D = Math.min(window.devicePixelRatio || 1, 1.5); c.width = W * D; c.height = H * D; }
    const G = { shard: 520, spark: 260, glow: 0, petal: 45, bubble: -90, sand: 700, snow: 40, star: 0 };
    const DRAG = { shard: 0.6, spark: 0.25, glow: 0.2, petal: 0.08, bubble: 0.3, sand: 0.7, snow: 0.1, star: 0.12 };
    function add(p) { parts.push(p); if (parts.length > 1800) parts.splice(0, parts.length - 1800); }
    function burst(x, y, col, style, n, power = 1) {
      for (let i = 0; i < n; i++) {
        const a = rand(TAU), sp = rand(60, 420) * power;
        add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - rand(30, 180) * power, life: 0, max: rand(0.6, 1.4) * (style === 'petal' || style === 'snow' ? 2 : 1),
          col, style, r: rand(2, 5.5), rot: rand(TAU), vr: rand(-7, 7), ph: rand(10) });
      }
    }
    function ring(x, y, col, maxR, w = 6) { rings.push({ x, y, col, maxR, life: 0, max: 0.8, w }); }
    function star(ctx, r) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.35 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); }
    function draw(dt) {
      ctx.setTransform(D, 0, 0, D, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      rings = rings.filter((r) => (r.life += dt) < r.max);
      rings.forEach((r) => { const k = r.life / r.max; ctx.strokeStyle = rgba(r.col, (1 - k) * 0.8); ctx.lineWidth = r.w * (1 - k) + 1; ellipse(ctx, r.x, r.y, r.maxR * smooth(Math.min(1, k * 1.3)), r.maxR * smooth(Math.min(1, k * 1.3))); ctx.stroke(); });
      parts = parts.filter((p) => (p.life += dt) < p.max);
      for (const p of parts) {
        const PP = PARTS[p.style], g = PP ? (PP.g ?? 300) : (G[p.style] ?? 300), dr = Math.pow(PP ? (PP.drag ?? 0.5) : (DRAG[p.style] ?? 0.5), dt);
        p.vx *= dr; p.vy = p.vy * dr + g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        const a = 1 - p.life / p.max;
        ctx.globalCompositeOperation = (p.style === 'shard' || p.style === 'sand' || p.style === 'petal') ? 'source-over' : 'lighter';
        if (PP) { ctx.globalCompositeOperation = PP.add ? 'lighter' : 'source-over'; PP.draw(ctx, p, a); continue; }
        switch (p.style) {
          case 'spark': ctx.strokeStyle = rgba(p.col, a); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04); ctx.stroke(); break;
          case 'glow': ctx.fillStyle = rgba(p.col, a * 0.8); ellipse(ctx, p.x, p.y, p.r * 1.4, p.r * 1.4); ctx.fill(); break;
          case 'petal': ctx.save(); ctx.translate(p.x + Math.sin(p.life * 3 + p.ph) * 12, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.ph > 5 ? `rgba(255,190,214,${a})` : `rgba(255,226,236,${a})`; ellipse(ctx, 0, 0, p.r * 1.3, p.r * 0.7); ctx.fill(); ctx.restore(); break;
          case 'bubble': ctx.strokeStyle = `rgba(210,250,255,${a * 0.8})`; ctx.lineWidth = 1.2; ellipse(ctx, p.x + Math.sin(p.life * 6 + p.ph) * 3, p.y, p.r, p.r); ctx.stroke(); break;
          case 'sand': ctx.fillStyle = rgba(p.col, a); ctx.fillRect(p.x, p.y, 2.5, 2.5); break;
          case 'snow': ctx.fillStyle = `rgba(240,250,255,${a})`; ctx.save(); ctx.translate(p.x + Math.sin(p.life * 2 + p.ph) * 10, p.y); ctx.rotate(p.rot); star(ctx, p.r); ctx.restore(); break;
          case 'star': ctx.fillStyle = rgba(p.col, a); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); star(ctx, p.r * 1.3); ctx.restore(); break;
          default: ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = rgba(p.col, a); ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2); ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`; ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 0.6); ctx.restore();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    return { size, burst, ring, draw, add };
  })();

  /* ---------- game + board rendering ---------- */
  let stageIdx = 0, cell = 32, paused = false, softTick = 0, shakeX = 0, shakeY = 0, kick = 0, bump = 0;
  const board = $('board'), bctx = board.getContext('2d');
  const holdC = $('hold'), hctx = holdC.getContext('2d');
  const nextC = $('next'), nctx = nextC.getContext('2d');
  const matrix = $('matrix'), play = $('play');
  let mRect = null;

  function layout() {
    const vw = innerWidth, vh = innerHeight;
    cell = Math.floor(Math.min((vh - 50) / 20.6, (vw - 60) / (10 + 5.4 * 2 + 1.6)));
    cell = clamp(cell, 14, 52);
    root.style.setProperty('--cell', cell + 'px');
    const d = DPR();
    board.width = Math.round(10 * cell * d); board.height = Math.round(22 * cell * d);
    const pw = Math.round(cell * 5.4 - 26);
    holdC.style.width = pw + 'px'; holdC.style.height = Math.round(cell * 2.6) + 'px';
    holdC.width = Math.round(pw * d); holdC.height = Math.round(cell * 2.6 * d);
    nextC.style.width = pw + 'px'; nextC.style.height = Math.round(cell * 10.6) + 'px';
    nextC.width = Math.round(pw * d); nextC.height = Math.round(cell * 10.6 * d);
    mRect = null;
  }
  function matrixRect() { if (!mRect) mRect = matrix.getBoundingClientRect(); return mRect; }
  function cellScreen(x, y) { const r = matrixRect(); return [r.left + (x + 0.5) * cell, r.top + (y - HIDDEN + 0.5) * cell]; }
  const stage = () => STAGES[stageIdx];
  const colOf = (type) => stage().palette[TYPES.indexOf(type)];

  function drawBoard() {
    const c = bctx, s = cell, d = DPR(), g = game, st = stage();
    c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, 10 * s, 22 * s);
    const skin = Skins.get(st, s, d);
    c.fillStyle = st.boardBg; c.fillRect(0, 2 * s, 10 * s, 20 * s);
    c.strokeStyle = st.grid; c.lineWidth = 1; c.beginPath();
    for (let x = 1; x < 10; x++) { c.moveTo(x * s + 0.5, 2 * s); c.lineTo(x * s + 0.5, 22 * s); }
    for (let y = 3; y < 22; y++) { c.moveTo(0, y * s + 0.5); c.lineTo(10 * s, y * s + 0.5); }
    c.stroke();
    if (!g.board) return;
    const clearing = g.state === 'clearing', ct = clearing ? g.clearT / CLEAR_TIME : 0;
    const over = g.state === 'over';
    const live = Skins.live(st), st0 = cellState, ssk = SKINSETS[st.skin], faces = !!ssk && Mood.enabled, drawFace = faces && !ssk.noFace, faceOK = (v) => drawFace && (!ssk.faceTypes || ssk.faceTypes.includes(v)), faceOf = (v) => (ssk && ssk.faces && ssk.faces[v]) || Mood.autoFace(st.skin, v, skin[v]);
    for (let y = 0; y < ROWS; y++) {
      const isClr = clearing && g.clearRows.includes(y);
      for (let x = 0; x < COLS; x++) {
        const v = g.board[y][x]; if (!v) continue;
        let sc = 1, flash = 0;
        if (isClr) {
          const delay = (Math.abs(x - 4.5) / 4.5) * 0.3, k = clamp((ct - delay) / 0.6, 0, 1);
          sc = 1 - smooth(k); if (sc * s < 0.5) continue; flash = 0.85 * (1 - k);
        }
        const w = BlockFX.cell(x, y);
        st0.ph = x * 1.7 + y * 3.1; st0.k = w.k; st0.tilt = w.tilt; st0.top = y > 0 && !g.board[y - 1][x]; st0.active = false; st0.ox = 0;
        c.save();
        c.translate(x * s + s / 2 + (faces ? Mood.shiver(x, y) * s : 0), y * s + s / 2 + w.dy * s + (1 - w.sy) * s * 0.5 + (faces && !clearing ? Mood.hop(x, y) * s : 0));
        c.scale(w.sx * sc, w.sy * sc);
        if (over) c.globalAlpha = 0.45;
        c.drawImage(skin[v], -s / 2, -s / 2, s, s);
        if (live && !over) live(c, v, s, T, st0);
        if (faceOK(v) && sc > 0.6) Mood.draw(c, v, s, { x, y, active: false, top: st0.top, face: faceOf(v) });
        if (flash) { c.fillStyle = `rgba(255,255,255,${flash})`; c.fillRect(-s / 2, -s / 2, s, s); }
        c.restore();
      }
      if (isClr) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = rgba(st.accent, 0.5 * (1 - ct)); c.fillRect(0, y * s - s * 0.3 * ct, 10 * s, s * (1 + 0.6 * ct)); c.restore(); }
    }
    if (g.piece && g.state === 'playing') {
      const p = g.piece, col = colOf(p.type), v = TYPES.indexOf(p.type) + 1;
      const gy = g.ghostY();
      c.lineWidth = Math.max(1.5, s * 0.06);
      for (const [cx, cy] of CELLS[p.type][p.rot]) {
        const x = (p.x + cx) * s, y = (gy + cy) * s;
        c.fillStyle = rgba(col, 0.14); c.fillRect(x + 1, y + 1, s - 2, s - 2);
        c.strokeStyle = rgba(col, 0.75); c.strokeRect(x + s * 0.08, y + s * 0.08, s * 0.84, s * 0.84);
      }
      // jelly transform of the whole piece around its centre
      const cells = CELLS[p.type][p.rot], pf = BlockFX.piece();
      let mx = 0, my = 0; cells.forEach(([a, b2]) => { mx += a; my += b2; }); mx = (p.x + mx / 4 + 0.5) * s; my = (p.y + my / 4 + 0.5) * s;
      c.save();
      c.translate(mx + pf.ox * s, my + pf.oy * s + (1 - pf.sy) * s); c.rotate(pf.rot); c.scale(pf.sx, pf.sy); c.translate(-mx, -my);
      c.save(); c.shadowColor = col; c.shadowBlur = s * 0.6;
      for (const [cx, cy] of cells) c.drawImage(skin[v], (p.x + cx) * s, (p.y + cy) * s, s, s);
      c.restore();
      if (live) {
        st0.k = (pf.sx - 1) * 6; st0.tilt = pf.tilt; st0.active = true; st0.ox = pf.ox;
        for (const [cx, cy] of cells) { st0.ph = (p.x + cx) * 1.7 + (p.y + cy) * 3.1; st0.top = !cells.some(([a, b2]) => a === cx && b2 === cy - 1); c.save(); c.translate((p.x + cx) * s + s / 2, (p.y + cy) * s + s / 2); live(c, v, s, T, st0); if (faceOK(v)) Mood.draw(c, v, s, { x: p.x + cx, y: p.y + cy, active: true, ox: pf.ox, top: st0.top, face: faceOf(v) }); c.restore(); }
      }
      if (g.grounded()) {
        c.fillStyle = `rgba(255,255,255,${(g.lockTimer / LOCK_DELAY) * 0.4})`;
        for (const [cx, cy] of cells) c.fillRect((p.x + cx) * s, (p.y + cy) * s, s, s);
      }
      c.restore();
    }
    if (g.state === 'transition') {
      const k = g.transT / TRANSITION_TIME, a = Math.sin(k * Math.PI);
      c.fillStyle = `rgba(0,0,0,${0.35 * a})`; c.fillRect(0, 2 * s, 10 * s, 20 * s);
      c.save(); c.globalCompositeOperation = 'lighter';
      const sy = 2 * s + 20 * s * (1 - k);
      c.fillStyle = linear(c, 0, sy - s * 2, 0, sy + s * 2, [[0, rgba(st.accent, 0)], [0.5, rgba(st.accent, 0.45 * a)], [1, rgba(st.accent, 0)]]);
      c.fillRect(0, sy - s * 2, 10 * s, s * 4); c.restore();
    }
    // time-of-day / weather tint on the blocks
    const tint = Amb.boardTint(); if (tint) { c.save(); c.globalCompositeOperation = 'source-atop'; c.fillStyle = tint; c.fillRect(0, 0, 10 * s, 22 * s); c.restore(); }
    // fade the spawn zone above the matrix
    c.save(); c.globalCompositeOperation = 'destination-out';
    c.fillStyle = linear(c, 0, 0, 0, 2 * s, [[0, 'rgba(0,0,0,0.85)'], [1, 'rgba(0,0,0,0)']]); c.fillRect(0, 0, 10 * s, 2 * s); c.restore();
  }
  const cellState = { ph: 0, k: 0, tilt: 0, top: false, active: false, ox: 0 };
  function drawMini(ctx, type, cx, cy, cs, alpha) {
    const cells = CELLS[type][0]; const xs = cells.map((c) => c[0]), ys = cells.map((c) => c[1]);
    const w = Math.max(...xs) - Math.min(...xs) + 1, h = Math.max(...ys) - Math.min(...ys) + 1;
    const ox = cx - (w * cs) / 2 - Math.min(...xs) * cs, oy = cy - (h * cs) / 2 - Math.min(...ys) * cs;
    const skin = Skins.get(stage(), cs, DPR()); const v = TYPES.indexOf(type) + 1;
    ctx.globalAlpha = alpha;
    const live = Skins.live(stage());
    cells.forEach(([x, y]) => {
      ctx.drawImage(skin[v], ox + x * cs, oy + y * cs, cs, cs);
      if (live) { cellState.ph = x * 1.7 + y * 3.1 + cx * 0.01; cellState.k = 0; cellState.tilt = 0; cellState.top = !cells.some(([a, b]) => a === x && b === y - 1); cellState.active = false; cellState.ox = 0; ctx.save(); ctx.translate(ox + x * cs + cs / 2, oy + y * cs + cs / 2); live(ctx, v, cs, T, cellState); ctx.restore(); }
    });
    ctx.globalAlpha = 1;
  }
  function drawSide() {
    const d = DPR();
    const hw = holdC.width / d, hh = holdC.height / d;
    hctx.setTransform(d, 0, 0, d, 0, 0); hctx.clearRect(0, 0, hw, hh);
    if (game.hold) drawMini(hctx, game.hold, hw / 2, hh / 2, Math.round(cell * 0.78), game.canHold ? 1 : 0.35);
    const nw = nextC.width / d, nh = nextC.height / d;
    nctx.setTransform(d, 0, 0, d, 0, 0); nctx.clearRect(0, 0, nw, nh);
    if (!game.queue) return;
    let y = cell * 1.25;
    for (let i = 0; i < 5; i++) {
      const cs = Math.round(cell * (i === 0 ? 0.85 : 0.62));
      drawMini(nctx, game.queue[i], nw / 2, y, cs, i === 0 ? 1 : 0.85);
      y += i === 0 ? cell * 2.55 : cell * 1.85;
    }
  }
  const hudCache = {};
  function setText(id, v) { if (hudCache[id] !== v) { hudCache[id] = v; $(id).textContent = v; } }
  function updateHUD() {
    setText('score', game.score.toLocaleString());
    setText('level', String(game.level));
    setText('lines', String(game.lines));
    setText('stagenum', String(stageIdx + 1));
    setText('stagename', stage().name + (game.lap ? `  ·  lap ${game.lap + 1}` : ''));
    const left = LINES_PER_STAGE - game.linesInStage;
    setText('stageleft', `${left} line${left === 1 ? '' : 's'} to the next world`);
    const w = (game.linesInStage / LINES_PER_STAGE) * 100 + '%';
    if (hudCache.bar !== w) { hudCache.bar = w; $('stagebar').style.width = w; }
    setText('combo', game.combo > 0 ? `COMBO ×${game.combo}` : game.b2b ? 'BACK-TO-BACK READY' : '');
  }

  /* ---------- popups & title card ---------- */
  function popup(text, cls, top) {
    const el = document.createElement('div'); el.className = 'popup ' + cls; el.textContent = text;
    el.style.top = clamp(top, 5, 88) + '%';
    $('popups').appendChild(el); setTimeout(() => el.remove(), 1500);
  }
  function titleCard(i, lap, first) {
    const st = STAGES[i];
    $('tc-n').textContent = (first ? 'WORLD ' : 'ENTERING WORLD ') + (i + 1) + (lap ? ` · LAP ${lap + 1}` : '');
    $('tc-t').textContent = st.name.toUpperCase(); $('tc-s').textContent = st.sub.toUpperCase();
    const tc = $('titlecard'); tc.classList.remove('show'); void tc.offsetWidth; tc.classList.add('show');
  }
  let worldT = 0;
  function applyStage(i, instant) {
    stageIdx = i; const st = STAGES[i]; worldT = 0;
    root.style.setProperty('--accent', st.accent); root.style.setProperty('--accent2', st.accent2);
    BG.set(st.id, instant);
    AudioEngine.setStage(st.music);
  }

  /* ---------- game hooks ---------- */
  const game = new Game({
    onMove(dx) { AudioEngine.sfx.move(dx); BlockFX.onMove(dx); },
    onRotate(ok, dir) { AudioEngine.sfx.rotate(ok); if (ok) { BlockFX.onRotate(dir || 1); Mood.onRotate(); } },
    onSpawn() { BlockFX.onSpawn(); lastPY = null; },
    onSoft() { if (++softTick % 2 === 0) AudioEngine.sfx.soft(); },
    onHold() { AudioEngine.sfx.hold(); },
    onHardDrop(cells, dist, type) {
      AudioEngine.sfx.hard(dist);
      { let sx = 0, sy = 0; cells.forEach(([x, y]) => { sx += x; sy = Math.max(sy, y); }); BlockFX.ripple(sx / 4, sy, Math.min(1.6, 0.6 + dist * 0.06)); }
      kick = Math.min(14, 4 + dist * 0.5);
      const col = colOf(type); const st = stage();
      const tops = {}; cells.forEach(([x, y]) => { if (tops[x] === undefined || y < tops[x]) tops[x] = y; });
      Object.entries(tops).forEach(([x, y]) => {
        const [sx, sy] = cellScreen(+x, y);
        for (let k = 0; k < Math.min(dist, 14); k++) FX.add({ x: sx + rand(-cell * 0.4, cell * 0.4), y: sy - k * cell * rand(0.6, 1.2), vx: 0, vy: -rand(20, 80), life: 0, max: rand(0.25, 0.5), col, style: 'glow', r: rand(1.5, 3.5), rot: 0, vr: 0, ph: 0 });
      });
      const bottoms = {}; cells.forEach(([x, y]) => { if (bottoms[x] === undefined || y > bottoms[x]) bottoms[x] = y; });
      Object.entries(bottoms).forEach(([x, y]) => { const [sx, sy] = cellScreen(+x, y); FX.burst(sx, sy + cell / 2, col, st.particle === 'sand' ? 'sand' : 'spark', 4, 0.35); });
    },
    onLock(info) {
      AudioEngine.sfx.lock(); Mood.onLand(info.cells);
      if (!info.hard) { let sx = 0, sy = 0; info.cells.forEach(([x, y]) => { sx += x; sy = Math.max(sy, y); }); BlockFX.ripple(sx / 4, sy, 0.45); }
      sceneEvent('lock', info);
      if (info.tspin) { const [, sy] = cellScreen(4, info.cells[0][1]); popup(info.label, 'mid', ((sy - matrixRect().top) / matrixRect().height) * 100); }
    },
    onClear(info) {
      AudioEngine.sfx.lock();
      info.rows.forEach((y) => BlockFX.ripple(4.5, y, info.n >= 4 ? 2.2 : 1.3)); Mood.onClear(info.rows, info.n >= 4 || !!info.tspin);
      sceneEvent('clear', info);
      AudioEngine.sfx.clear(info.n, !!info.tspin, Math.max(0, info.combo));
      const st = stage(); const big = info.n >= 4 || info.tspin || info.pc;
      info.rows.forEach((y) => {
        for (let x = 0; x < COLS; x++) {
          const v = game.board[y][x]; const col = st.palette[(v || 1) - 1]; const [sx, sy] = cellScreen(x, y);
          FX.burst(sx, sy, col, 'shard', big ? 3 : 2, big ? 1.2 : 0.9);
          FX.burst(sx, sy, col, 'spark', big ? 3 : 2, big ? 1.4 : 1);
          FX.burst(sx, sy, st.palette[x % 7], st.particle, big ? 3 : 2, 0.8);
        }
      });
      const r = matrixRect();
      const midY = info.rows.reduce((a, b) => a + b, 0) / info.rows.length;
      const [cx, cy] = cellScreen(4.5, midY);
      if (big) { FX.ring(cx, cy, st.accent, cell * 9, 10); FX.ring(cx, cy, st.accent2, cell * 14, 6); shakeAmp = 10; env.flash = 1; }
      else { env.flash = Math.max(env.flash, 0.35 + info.n * 0.12); shakeAmp = 2 + info.n * 1.5; }
      bump = 0.5 + info.n * 0.25 + (big ? 0.6 : 0);
      let top = Math.min(68, ((cy - r.top) / r.height) * 100 - 6);
      popup(info.label, big ? 'big' : 'mid', top);
      const step = big ? 13 : 10;
      if (info.b2b) popup('BACK-TO-BACK', 'sm', top + step);
      if (info.combo > 0) popup(`COMBO ×${info.combo}`, 'sm', top + step + (info.b2b ? 6 : 0));
      if (info.pc) popup('PERFECT CLEAR', 'big', top - 16);
      popup('+' + info.pts.toLocaleString(), 'sm', top - (big ? 9 : 7));
    },
    onLevel(l) { if (game.state !== 'transition') { AudioEngine.sfx.levelUp(); popup('LEVEL ' + l, 'sm', 20); } },
    onStage(i, lap) {
      applyStage(i, false);
      AudioEngine.setIntensity(1);
      AudioEngine.sfx.stage();
      titleCard(i, lap, false);
      const r = matrixRect(); FX.ring(r.left + r.width / 2, r.top + r.height / 2, STAGES[i].accent, Math.max(innerWidth, innerHeight) * 0.6, 14);
      for (let k = 0; k < 120; k++) FX.burst(r.left + rand(r.width), r.top + rand(r.height), pick(STAGES[i].palette), STAGES[i].particle, 1, 1.2);
      env.flash = 1.2; bump = 1.5;
    },
    onGameOver() {
      AudioEngine.sfx.gameOver(); AudioEngine.duck(true);
      const r = matrixRect();
      for (let y = HIDDEN; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (game.board[y][x] && Math.random() < 0.5) { const [sx, sy] = cellScreen(x, y); FX.burst(sx, sy, stage().palette[game.board[y][x] - 1], 'shard', 1, 0.5); }
      let best = 0; try { best = +localStorage.getItem('dt_best') || 0; if (game.score > best) { localStorage.setItem('dt_best', game.score); } } catch (e) {}
      const newBest = game.score > best;
      setTimeout(() => {
        $('over-world').textContent = `Reached ${stage().name}${game.lap ? ' (lap ' + (game.lap + 1) + ')' : ''}` + (newBest ? ' — NEW BEST!' : '');
        $('over-stats').innerHTML = [['Score', game.score.toLocaleString()], ['Lines', game.lines], ['Level', game.level], ['Tetrises', game.stats.tetris], ['T-Spins', game.stats.tspin], ['Max combo', Math.max(0, game.stats.maxCombo)], ['Pieces', game.stats.pieces], ['Time', fmtTime(game.time)]]
          .map(([k, v]) => `<div>${k}</div><div><b>${v}</b></div>`).join('');
        show('over');
        refreshBest();
      }, 1100);
    },
  });
  const fmtTime = (ms) => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  let shakeAmp = 0, lastPY = null, wasGrounded = false;
  // scene reactions (people cheer on big clears etc.)
  function sceneEvent(type, info) { env.events.push({ type, n: info.n || 0, big: info.n >= 4 || !!info.tspin, t: T }); if (env.events.length > 8) env.events.shift(); }

  /* ---------- screens ---------- */
  let screen = 'menu', menuCycleT = 0, menuHover = false;
  function show(id) { ['pause', 'over'].forEach((o) => $(o).classList.toggle('hidden', o !== id)); }
  function startGame(i) {
    Amb.reroll();
    AudioEngine.init(); AudioEngine.duck(false);
    screen = 'game'; paused = false;
    $('menu').classList.add('hidden'); $('game').classList.remove('hidden'); show(null);
    layout();
    applyStage(i, false);
    game.start(i);
    game.state = 'transition'; game.transT = TRANSITION_TIME - 2000; game.piece = null; game.stats.pieces = 0;
    AudioEngine.setIntensity(1);
    titleCard(i, 0, true);
    das.dir = 0; game.softDrop = false;
  }
  function toMenu() {
    screen = 'menu'; paused = false; game.state = 'idle';
    show(null); $('game').classList.add('hidden'); $('menu').classList.remove('hidden');
    $('stage-select').classList.add('hidden'); $('menu-main').classList.remove('hidden');
    AudioEngine.duck(false); AudioEngine.setIntensity(1);
    refreshBest();
  }
  function setPause(on) {
    if (screen !== 'game' || game.state === 'over') return;
    paused = on; show(on ? 'pause' : null);
    $('pause-info').textContent = on ? `${stage().name} · ${game.score.toLocaleString()} pts` : '';
    AudioEngine.duck(on);
    if (!on) { das.dir = 0; game.softDrop = false; }
  }
  function refreshBest() { let b = 0; try { b = +localStorage.getItem('dt_best') || 0; } catch (e) {} $('best').textContent = 'BEST SCORE ' + b.toLocaleString(); }

  /* ---------- menu wiring ---------- */
  $('worldlist').innerHTML = STAGES.map((s, i) => `<div title="${s.sub}"><i>${i + 1}</i> &nbsp;${s.name}</div>`).join('');
  $('sel-count').textContent = STAGES.length + ' WORLDS'; $('stagetot').textContent = STAGES.length;
  const grid = $('stage-grid');
  STAGES.forEach((s, i) => {
    const b = document.createElement('button'); b.className = 'stage-card'; b.style.setProperty('--c', s.accent);
    b.innerHTML = `<div class="sw" style="background:linear-gradient(120deg, ${s.palette.slice(0, 4).map((c, k) => c + ' ' + k * 33 + '%').join(',')})"><span>WORLD ${i + 1}</span></div><div class="tx"><div class="nm">${s.name}</div><div class="ds">${s.desc}</div></div>`;
    b.addEventListener('mouseenter', () => { menuHover = true; previewStage(i); });
    b.addEventListener('focus', () => { menuHover = true; previewStage(i); });
    b.addEventListener('mouseleave', () => { menuHover = false; menuCycleT = 0; });
    b.addEventListener('click', () => startGame(i));
    grid.appendChild(b);
  });
  function previewStage(i) { if (stageIdx !== i) { applyStage(i, false); AudioEngine.sfx.ui(i); } }
  $('btn-play').onclick = () => startGame(0);
  // paged tabs (10 worlds per page) + lazily rendered live thumbnails as cards scroll into view
  const PAGE = 10, tabs = $('sel-tabs');
  const pages = [['ALL', 0, STAGES.length]]; for (let i = 0; i < STAGES.length; i += PAGE) pages.push([`${i + 1}–${Math.min(STAGES.length, i + PAGE)}`, i, Math.min(STAGES.length, i + PAGE)]);
  pages.forEach(([lab, a, b], k) => { const t = document.createElement('button'); t.textContent = lab; t.onclick = () => { [...tabs.children].forEach((x) => x.classList.remove('on')); t.classList.add('on'); [...grid.children].forEach((c, i) => { c.style.display = i >= a && i < b ? '' : 'none'; }); grid.scrollTop = 0; }; tabs.appendChild(t); if (!k) t.classList.add('on'); });
  if (STAGES.length <= PAGE) tabs.style.display = 'none';
  const thumbDone = new Set();
  function thumb(i) {
    if (thumbDone.has(i)) return; thumbDone.add(i);
    const card = grid.children[i], st = STAGES[i], tw = 560, th = 350;
    try {
      const tmp = makeCanvas(tw, th), tctx = tmp.getContext('2d');
      const inst = STAGE_FACTORIES[st.id](); inst.resize(tw, th, 1);
      for (let k = 0; k < 4; k++) inst.draw(tctx, 7 + k * 0.05, 0.05, { pulse: 0, flash: 0, mx: 0, speed: 1, p: 0.3, events: [], thumb: true });
      const sw = card.querySelector('.sw'); const c = document.createElement('canvas');
      const d = DPR(), cw = sw.clientWidth || 212, ch = sw.clientHeight || 112; c.width = cw * d; c.height = ch * d; c.className = 'thumb';
      const sy = st.thumbY ?? (st.id === 'sushi' ? 0.42 : st.id === 'cosmic' ? 0.3 : 0.38), srcH = tw * ch / cw;
      c.getContext('2d').drawImage(tmp, 0, clamp(th * sy - srcH / 2, 0, th - srcH), tw, srcH, 0, 0, c.width, c.height);
      sw.insertBefore(c, sw.firstChild);
    } catch (e) { console.warn('thumb', st.id, e); }
  }
  let thumbQ = [], thumbBusy = false;
  const pumpThumbs = () => { if (thumbBusy) return; const i = thumbQ.shift(); if (i === undefined) return; thumbBusy = true; setTimeout(() => { thumb(i); thumbBusy = false; pumpThumbs(); }, 16); };
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const i = [...grid.children].indexOf(e.target); if (!thumbDone.has(i) && !thumbQ.includes(i)) { thumbQ.push(i); pumpThumbs(); } } }), { root: grid, rootMargin: '120px' }) : null;
  function buildThumbs() { if (io) [...grid.children].forEach((c) => io.observe(c)); else STAGES.forEach((_, i) => { thumbQ.push(i); }); pumpThumbs(); }
  // arrow-key navigation through the grid
  grid.addEventListener('keydown', (e) => {
    const cards = [...grid.children].filter((c) => c.style.display !== 'none'), i = cards.indexOf(document.activeElement); if (i < 0) return;
    const cols = Math.max(1, Math.round(grid.clientWidth / (cards[0].offsetWidth + 14)));
    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    if (d) { e.preventDefault(); e.stopPropagation(); const n = cards[clamp(i + d, 0, cards.length - 1)]; n.focus(); n.scrollIntoView({ block: 'nearest' }); }
  });
  $('btn-select').onclick = () => { AudioEngine.init(); $('menu-main').classList.add('hidden'); $('stage-select').classList.remove('hidden'); buildThumbs(); grid.firstChild.focus(); };
  $('btn-back').onclick = () => { $('stage-select').classList.add('hidden'); $('menu-main').classList.remove('hidden'); menuHover = false; };
  $('btn-resume').onclick = () => setPause(false);
  $('btn-restart').onclick = () => { show(null); startGame(game.startStage); };
  $('btn-quit').onclick = toMenu;
  $('btn-retry').onclick = () => startGame(game.startStage);
  $('btn-menu').onclick = toMenu;
  const SPK = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>';
  const MUTE = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm18.3 7.9L19.4 15l-1.9 1.9-1.4-1.4L18 13.6l-1.9-1.9 1.4-1.4 1.9 1.9 1.9-1.9 1.4 1.4-1.9 1.9 1.9 1.9z"/></svg>';
  function refreshMute() { document.querySelectorAll('.mute-btn').forEach((b) => (b.innerHTML = (AudioEngine.muted ? MUTE : SPK) + (b.closest('#menu') ? '' : '<span>' + (AudioEngine.muted ? 'Muted' : 'Sound on') + '</span>'))); }
  document.querySelectorAll('.mute-btn').forEach((b) => (b.onclick = (e) => { AudioEngine.init(); AudioEngine.toggleMute(); refreshMute(); e.currentTarget.blur(); }));
  const vol = $('vol'); vol.value = Math.round(AudioEngine.volume * 100);
  vol.oninput = () => { AudioEngine.init(); AudioEngine.setVolume(vol.value / 100); if (AudioEngine.muted && vol.value > 0) { AudioEngine.toggleMute(); refreshMute(); } };
  refreshMute(); refreshBest();

  /* ---------- input ---------- */
  const DAS = 150, ARR = 33;
  const das = { dir: 0, t: 0, arr: 0 };
  const held = {};
  const GAME_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Space', 'KeyZ', 'KeyX', 'KeyC', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'KeyP', 'Escape']);
  function firstInteraction() { if (!AudioEngine.ready) { AudioEngine.init(); $('hint').innerHTML = 'Press <b>Enter</b> to begin your journey'; } }
  addEventListener('pointerdown', firstInteraction);
  addEventListener('keydown', (e) => {
    firstInteraction();
    const k = e.code;
    if (screen === 'game' && GAME_KEYS.has(k)) e.preventDefault();
    if (k === 'KeyM') { AudioEngine.toggleMute(); refreshMute(); return; }
    if (k === 'Minus' || k === 'Equal' || k === 'NumpadSubtract' || k === 'NumpadAdd') { const v = clamp(+vol.value + (k === 'Minus' || k === 'NumpadSubtract' ? -10 : 10), 0, 100); vol.value = v; vol.oninput(); return; }
    if (screen === 'menu') {
      if (k === 'Enter' && !$('menu-main').classList.contains('hidden') && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); startGame(0); }
      if (k === 'Escape' && !$('stage-select').classList.contains('hidden')) $('btn-back').click();
      return;
    }
    if (e.repeat) return;
    if (k === 'KeyP' || k === 'Escape') { if (game.state !== 'over') setPause(!paused); return; }
    if (paused) { if (k === 'Enter') setPause(false); return; }
    if (game.state === 'over') { if (k === 'Enter') startGame(game.startStage); return; }
    held[k] = true;
    switch (k) {
      case 'ArrowLeft': das.dir = -1; das.t = 0; das.arr = 0; game.move(-1); break;
      case 'ArrowRight': das.dir = 1; das.t = 0; das.arr = 0; game.move(1); break;
      case 'ArrowDown': game.softDrop = true; break;
      case 'Space': game.hardDrop(); break;
      case 'ArrowUp': case 'KeyX': game.rotate(1); break;
      case 'KeyZ': case 'ControlLeft': case 'ControlRight': game.rotate(-1); break;
      case 'KeyC': case 'ShiftLeft': case 'ShiftRight': game.holdPiece(); break;
    }
  });
  addEventListener('keyup', (e) => {
    const k = e.code; held[k] = false;
    if (k === 'ArrowDown') game.softDrop = false;
    if (k === 'ArrowLeft' && das.dir === -1) { das.dir = held.ArrowRight ? 1 : 0; das.t = 0; das.arr = 0; }
    if (k === 'ArrowRight' && das.dir === 1) { das.dir = held.ArrowLeft ? -1 : 0; das.t = 0; das.arr = 0; }
  });
  function inputUpdate(dt) {
    if (!das.dir) return;
    das.t += dt;
    if (das.t < DAS || game.state !== 'playing') return;
    das.arr += dt;
    while (das.arr >= ARR) { das.arr -= ARR; if (!game.move(das.dir)) { das.arr = 0; break; } }
  }
  addEventListener('blur', () => { if (screen === 'game' && !paused && game.state !== 'over') setPause(true); for (const k in held) held[k] = false; das.dir = 0; game.softDrop = false; });
  addEventListener('mousemove', (e) => { targetMx = (e.clientX / innerWidth - 0.5) * 2; });
  let rT = null;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { BG.size(); FX.size(); layout(); }, 150); });

  AudioEngine.onBeat((b) => { env.pulse = b % 4 === 0 ? 1 : 0.6; });

  /* ---------- main loop ---------- */
  let last = performance.now();
  // wait (briefly) for the embedded brush font so cached scene layers use it; fall back after 2.5s
  Promise.race([FontLoader.ready, new Promise((r) => setTimeout(r, 2500))]).then(() => {
    BG.size(); FX.size(); layout();
    applyStage(0, true); // the menu opens in World 1, Kaiten Sushi
    AudioEngine.setIntensity(1);
    last = performance.now();
    requestAnimationFrame(frame);
  });
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
    env.mx += (targetMx - env.mx) * Math.min(1, dt * 3);
    if (screen === 'menu' && !menuHover && !window.__noCycle && $('stage-select').classList.contains('hidden')) {
      menuCycleT += dt;
      if (menuCycleT > 16) { menuCycleT = 0; applyStage((stageIdx + 1) % STAGES.length, false); }
    }
    if (screen === 'game' && !paused) {
      inputUpdate(dt * 1000);
      game.update(dt * 1000);
      if (game.piece) { if (lastPY !== null && game.piece.y > lastPY && !game.softDrop) BlockFX.onFall(game.piece.y - lastPY); const gr = game.state === 'playing' && game.grounded(); if (gr && !wasGrounded) BlockFX.onLand(); wasGrounded = gr; lastPY = game.piece.y; }
      if (game.state === 'playing') AudioEngine.setIntensity(1 + Math.min(3, Math.floor(game.linesInStage / 3)));
      env.speed = 1 + (game.level - 1) * 0.08;
    } else env.speed = 1;
    BlockFX.update(dt); if (game) Mood.frame(game, T, dt);
    worldT += dt;
    env.p = screen === 'game' ? clamp(0.7 * game.linesInStage / LINES_PER_STAGE + 0.3 * Math.min(1, worldT / 200), 0, 1) : (T * 0.012) % 1;
    Amb.update(stage().id, env.p, dt);
    BG.draw(T, dt, env);
    if (screen === 'game') {
      drawBoard(); drawSide(); updateHUD();
      shakeAmp *= Math.pow(0.002, dt); kick *= Math.pow(0.0005, dt); bump *= Math.pow(0.01, dt);
      shakeX = (Math.random() - 0.5) * shakeAmp; shakeY = (Math.random() - 0.5) * shakeAmp + kick;
      play.style.transform = `translate(${shakeX.toFixed(1)}px, ${shakeY.toFixed(1)}px) scale(${(1 + bump * 0.012).toFixed(4)})`;
      root.style.setProperty('--pulse', env.pulse.toFixed(2));
    }
    FX.draw(dt);
    $('flash').style.opacity = (env.flash * 0.35).toFixed(3);
    env.pulse *= Math.pow(0.02, dt); env.flash *= Math.pow(0.03, dt);
    requestAnimationFrame(frame);
  }
  window.__tw = { game, startGame, toMenu, setPause, applyStage, get stageIdx() { return stageIdx; } };
})();
