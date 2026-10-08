/* ================= Block characters: every food piece has a face, a personality and reactions =================
   Personalities by piece type (1..7 = I,O,T,S,Z,J,L): cool, jolly, cheeky, shy, sleepy, excitable, grumpy.
   Reactions: eyes follow the falling piece, wince when landed on, spin-eyed after rotation, sweat and worry
   when the stack nears the top, sparkle-eyed when the ghost hovers above them, cheer + hop on nearby clears. */
const Mood = (() => {
  const PERS = [null,
    { name: 'cool', lid: 0.45, mouth: 'smirk', blush: 0.15, brow: -0.2 },
    { name: 'jolly', lid: 0, mouth: 'grin', blush: 0.55, brow: 0.2, big: 1.15 },
    { name: 'cheeky', lid: 0.1, mouth: 'tongue', blush: 0.35, wink: 1 },
    { name: 'shy', lid: 0.15, mouth: 'tiny', blush: 0.75, side: 1, small: 0.85 },
    { name: 'sleepy', lid: 0.62, mouth: 'yawn', blush: 0.25, droop: 1 },
    { name: 'excitable', lid: 0, mouth: 'o', blush: 0.4, sparkle: 1, big: 1.1 },
    { name: 'grumpy', lid: 0.3, mouth: 'flat', blush: 0.1, brow: -0.6, frown: 1 },
  ];
  let danger = 0, lookX = 4.5, lookY = 0, rotT = 9, overT = 0, T = 0, enabled = true;
  const landed = new Map(), cheer = [], ghostCells = new Set();
  const key = (x, y) => x + y * 16;
  function frame(g, t, dt) {
    T = t;
    rotT += dt;
    // danger: highest occupied row (board rows 0..21; 2 hidden)
    let top = 22;
    if (g.board) for (let y = 0; y < g.board.length; y++) if (g.board[y].some((v) => v)) { top = y; break; }
    const d = clamp((12 - top) / 8, 0, 1); danger += (d - danger) * Math.min(1, dt * 3);
    ghostCells.clear();
    if (g.piece && g.state === 'playing') {
      const cs = g.cellsOf(g.piece); let sx = 0, sy = 0; cs.forEach(([x, y]) => { sx += x; sy += y; }); lookX = sx / 4; lookY = sy / 4;
      const gy = g.ghostY(), dy = gy - g.piece.y;
      cs.forEach(([x, y]) => ghostCells.add(key(x, y + dy + 1)));
    }
    for (const [k, v] of landed) { if (t - v > 0.7) landed.delete(k); }
    while (cheer.length && t - cheer[0].t > 2.2) cheer.shift();
    overT = g.state === 'over' ? overT + dt : 0;
  }
  function onLand(cells) { cells.forEach(([x, y]) => { landed.set(key(x, y + 1), T); landed.set(key(x - 1, y), T); landed.set(key(x + 1, y), T); }); }
  function onClear(rows, big) { cheer.push({ t: T, y0: Math.min(...rows) - 3, y1: Math.max(...rows) + 2, big }); }
  function onRotate() { rotT = 0; }
  function cheerAt(y) { for (const c of cheer) if (y >= c.y0 && y <= c.y1 + 4) return { k: 1 - (T - c.t) / 2.2, big: c.big }; return null; }
  // hop offset for celebration (in cell units)
  function hop(x, y) { const c = cheerAt(y); if (!c) return 0; return -Math.abs(Math.sin((T - 0) * 9 + x * 0.9)) * 0.12 * c.k * (c.big ? 1.6 : 1); }
  function shiver(x, y) { return danger > 0.35 ? Math.sin(T * 40 + x * 3 + y * 7) * 0.012 * danger : 0; }

  // draw a face centred at (0,0) of a cell of size s. ctx is already translated to the cell centre.
  function draw(c, v, s, info) {
    if (!enabled) return;
    const P = PERS[v] || PERS[2], fc = info.face || {}, ink = fc.ink || '#2a1408';
    const cx = (fc.x || 0) * s, cy = (fc.y ?? 0.1) * s, fs = s * (fc.s || 1) * (P.small || 1);
    const seed = info.x * 7.3 + info.y * 3.1 + v;
    const k = key(info.x, info.y);
    // expression selection
    let ex = 'idle';
    const ch = info.active ? null : cheerAt(info.y);
    if (overT > 0) ex = 'dead';
    else if (ch) ex = 'cheer';
    else if (landed.has(k) && !info.active) ex = 'wince';
    else if (info.active && rotT < 0.35) ex = 'dizzy';
    else if (!info.active && ghostCells.has(k)) ex = 'awe';
    else if (danger > 0.45) ex = 'worry';
    // gaze toward the active piece
    let gx = 0, gy = 0;
    if (!info.active) { const dx = lookX - info.x, dy = lookY - info.y, d = Math.hypot(dx, dy) || 1; gx = dx / d; gy = dy / d; }
    else { gx = clamp((info.ox || 0) * -8, -1, 1); gy = 0.6; }
    if (P.side && ex === 'idle') gx = gx * 0.4 + Math.sin(T * 0.7 + seed) * 0.6;
    const ph = (T + seed * 1.37) % (3 + (seed % 3)), blink = ph < 0.13 ? 1 : 0;
    const wink = P.wink && ex === 'idle' && ((T * 0.37 + seed) % 7) < 0.5;
    const yawn = P.droop && ex === 'idle' && ((T * 0.23 + seed * 0.1) % 9) < 1.4;
    const er = fs * 0.07 * (P.big || 1), sp = fs * 0.17;
    c.save(); c.translate(cx, cy);
    // cheeks
    const bl = ex === 'cheer' || ex === 'awe' ? 0.8 : P.blush;
    if (bl > 0.05) { c.fillStyle = `rgba(255,110,120,${bl * 0.45})`; ellipse(c, -sp * 1.45, er * 1.6, fs * 0.075, fs * 0.045); c.fill(); ellipse(c, sp * 1.45, er * 1.6, fs * 0.075, fs * 0.045); c.fill(); }
    c.fillStyle = ink; c.strokeStyle = ink; c.lineCap = 'round'; c.lineWidth = Math.max(1, fs * 0.035);
    const eye = (side) => {
      const ex0 = side * sp;
      if (ex === 'dead') { const r = er * 1.1; c.beginPath(); c.moveTo(ex0 - r, -r); c.lineTo(ex0 + r, r); c.moveTo(ex0 + r, -r); c.lineTo(ex0 - r, r); c.stroke(); return; }
      if (ex === 'cheer') { c.beginPath(); c.arc(ex0, er * 0.6, er * 1.2, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); return; }
      if (ex === 'wince') { c.beginPath(); c.moveTo(ex0 - side * er * 1.2, -er); c.lineTo(ex0 + side * er * 0.8, 0); c.lineTo(ex0 - side * er * 1.2, er); c.stroke(); return; }
      if (ex === 'dizzy') { c.beginPath(); for (let a = 0; a < 9; a++) { const r = er * (0.2 + a * 0.12), an = a * 1.1 + T * 20 * side; a ? c.lineTo(ex0 + Math.cos(an) * r, Math.sin(an) * r) : c.moveTo(ex0, 0); } c.stroke(); return; }
      if (blink || (wink && side > 0)) { c.beginPath(); c.moveTo(ex0 - er, 0); c.quadraticCurveTo(ex0, er * 0.7, ex0 + er, 0); c.stroke(); return; }
      const big = ex === 'awe' ? 1.35 : ex === 'worry' ? 1.1 : 1;
      const lid = ex === 'awe' ? 0 : ex === 'worry' ? 0.1 : yawn ? 0.85 : P.lid;
      const ly = -er * 1.3 + er * 2.6 * lid;
      c.save();
      if (lid > 0.05) { c.beginPath(); c.rect(ex0 - er * 2, ly, er * 4, er * 4); c.clip(); }
      ellipse(c, ex0 + gx * er * 0.35, gy * er * 0.3, er * big * 0.95, er * big * 1.15); c.fill();
      c.fillStyle = fc.dark ? '#2a1408' : '#ffffff'; ellipse(c, ex0 + gx * er * 0.35 - er * 0.35, gy * er * 0.3 - er * 0.3, er * 0.36 * big, er * 0.36 * big); c.fill();
      if (P.sparkle || ex === 'awe') { ellipse(c, ex0 + gx * er * 0.35 + er * 0.35, gy * er * 0.3 + er * 0.4, er * 0.18, er * 0.18); c.fill(); }
      c.restore(); c.fillStyle = ink;
      if (lid > 0.05) { c.beginPath(); c.moveTo(ex0 - er * 1.15, ly + (P.droop ? er * 0.25 : 0)); c.lineTo(ex0 + er * 1.15, ly); c.stroke(); }
    };
    eye(-1); eye(1);
    // brows
    const bw = ex === 'worry' ? 0.6 : ex === 'cheer' ? 0.4 : (P.brow || 0);
    if (Math.abs(bw) > 0.15 || ex === 'worry') {
      c.lineWidth = Math.max(0.8, fs * 0.028);
      [-1, 1].forEach((side) => { const bx = side * sp, by = -er * 1.9; c.beginPath(); c.moveTo(bx - side * er * 1.1, by + (bw > 0 ? -bw : 0) * er * 0.6 + (ex === 'worry' ? -er * 0.5 : 0)); c.lineTo(bx + side * er * 1.1, by + (bw < 0 ? bw * er * 0.9 : 0) + (ex === 'worry' ? er * 0.3 : 0)); c.stroke(); });
      c.lineWidth = Math.max(1, fs * 0.035);
    }
    // mouth
    const my = er * 2.0, mw = fs * 0.07;
    const mouth = ex === 'cheer' ? 'open' : ex === 'wince' ? 'squiggle' : ex === 'worry' ? 'wobble' : ex === 'awe' ? 'o' : ex === 'dead' ? 'flat' : ex === 'dizzy' ? 'squiggle' : yawn ? 'yawn' : P.mouth;
    c.beginPath();
    switch (mouth) {
      case 'open': c.moveTo(-mw * 1.3, my - mw * 0.2); c.quadraticCurveTo(0, my + mw * 2.2, mw * 1.3, my - mw * 0.2); c.closePath(); c.fill(); c.fillStyle = '#ff6a7a'; ellipse(c, 0, my + mw * 0.8, mw * 0.6, mw * 0.35); c.fill(); break;
      case 'grin': c.moveTo(-mw * 1.2, my); c.quadraticCurveTo(0, my + mw * 1.4, mw * 1.2, my); c.stroke(); break;
      case 'smirk': c.moveTo(-mw * 0.8, my + mw * 0.2); c.quadraticCurveTo(mw * 0.2, my + mw * 0.6, mw * 1, my - mw * 0.3); c.stroke(); break;
      case 'tongue': c.moveTo(-mw, my); c.quadraticCurveTo(0, my + mw * 1.1, mw, my); c.stroke(); c.fillStyle = '#ff6a8a'; ellipse(c, mw * 0.3, my + mw * 0.75, mw * 0.45, mw * 0.5); c.fill(); break;
      case 'tiny': c.moveTo(-mw * 0.4, my + mw * 0.1); c.quadraticCurveTo(0, my + mw * 0.5, mw * 0.4, my + mw * 0.1); c.stroke(); break;
      case 'o': ellipse(c, 0, my + mw * 0.3, mw * 0.45, mw * 0.6); c.fill(); break;
      case 'yawn': ellipse(c, 0, my + mw * 0.4, mw * 0.6, mw * 0.9); c.fill(); break;
      case 'flat': c.moveTo(-mw * 0.8, my + mw * 0.3); c.lineTo(mw * 0.8, my + mw * 0.3); c.stroke(); if (P.frown) { c.beginPath(); c.moveTo(-mw * 0.8, my + mw * 0.3); c.lineTo(-mw, my + mw * 0.6); c.stroke(); } break;
      case 'squiggle': c.moveTo(-mw, my + mw * 0.3); for (let i = 1; i <= 4; i++) c.lineTo(-mw + i * mw * 0.5, my + mw * 0.3 + (i % 2 ? -1 : 1) * mw * 0.3); c.stroke(); break;
      case 'wobble': c.moveTo(-mw, my + mw * 0.4); c.quadraticCurveTo(-mw * 0.5, my + Math.sin(T * 18 + seed) * mw * 0.4, 0, my + mw * 0.4); c.quadraticCurveTo(mw * 0.5, my + mw * 0.8, mw, my + mw * 0.4); c.stroke(); break;
      default: c.moveTo(-mw, my); c.quadraticCurveTo(0, my + mw, mw, my); c.stroke();
    }
    // sweat drop in danger / hearts when cheering / zZ when yawning
    if (ex === 'worry' && info.top) { const sy = -er * 2 + ((T * 0.8 + seed * 0.1) % 1) * er * 3; c.fillStyle = 'rgba(150,210,255,0.9)'; c.beginPath(); c.moveTo(sp * 2, sy - er * 1.2); c.quadraticCurveTo(sp * 2 + er * 0.9, sy + er * 0.3, sp * 2, sy + er * 0.6); c.quadraticCurveTo(sp * 2 - er * 0.9, sy + er * 0.3, sp * 2, sy - er * 1.2); c.fill(); }
    if (ex === 'cheer' && ch.big && info.top) { const hy = -s * 0.3 - ((T * 1.2 + seed * 0.2) % 1) * s * 0.4; c.fillStyle = 'rgba(255,90,130,0.9)'; c.beginPath(); c.moveTo(0, hy + er); c.bezierCurveTo(-er * 2, hy - er * 0.5, -er, hy - er * 2, 0, hy - er * 0.8); c.bezierCurveTo(er, hy - er * 2, er * 2, hy - er * 0.5, 0, hy + er); c.fill(); }
    if (yawn && info.top) { c.fillStyle = rgba(ink, 0.7); c.font = `bold ${Math.round(s * 0.18)}px sans-serif`; c.fillText('z', sp * 1.8, -er * 3 - ((T * 0.5) % 1) * s * 0.2); }
    if (ex === 'awe') { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,255,230,${0.35 + 0.25 * Math.sin(T * 10 + seed)})`; const sx = -s * 0.28, sy2 = -s * 0.28; c.beginPath(); c.moveTo(sx, sy2 - s * 0.09); c.lineTo(sx + s * 0.02, sy2 - s * 0.02); c.lineTo(sx + s * 0.09, sy2); c.lineTo(sx + s * 0.02, sy2 + s * 0.02); c.lineTo(sx, sy2 + s * 0.09); c.lineTo(sx - s * 0.02, sy2 + s * 0.02); c.lineTo(sx - s * 0.09, sy2); c.lineTo(sx - s * 0.02, sy2 - s * 0.02); c.closePath(); c.fill(); c.restore(); }
    c.restore();
  }
  // pick a readable ink colour from the sprite's centre luminance (cached per skin/type)
  const faceCache = {};
  function autoFace(skinId, v, cv) {
    const k = skinId + v + ':' + (cv && cv.width); if (faceCache[k]) return faceCache[k];
    let lum = 0.6;
    try { const w = cv.width, h = cv.height, d = cv.getContext('2d').getImageData(Math.floor(w * 0.3), Math.floor(h * 0.45), Math.max(1, Math.floor(w * 0.4)), Math.max(1, Math.floor(h * 0.25))).data; let sum = 0, n = 0; for (let i = 0; i < d.length; i += 16) { sum += (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) / 255; n++; } lum = sum / n; } catch (e) {}
    return (faceCache[k] = { y: 0.1, ink: lum < 0.42 ? '#fff4e4' : '#2a1408', dark: lum < 0.42 });
  }
  return { autoFace, frame, draw, onLand, onClear, onRotate, hop, shiver, PERS, get danger() { return danger; }, set enabled(v) { enabled = v; }, get enabled() { return enabled; } };
})();
