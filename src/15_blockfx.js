/* ================= Block motion: jelly springs, stack ripples, live surfaces ================= */
const BlockFX = (() => {
  // active-piece spring state (offsets in cells / radians / scale deltas)
  const p = { ox: 0, vx: 0, oy: 0, vy: 0, rot: 0, vr: 0, sq: 0, vsq: 0, tilt: 0, vtilt: 0, lastKey: '' };
  let ripples = []; // {x, y, t0, amp}
  let time = 0;
  function spring(v, vel, k, damp, dt) { const a = -k * v - damp * vel; vel += a * dt; v += vel * dt; return [v, vel]; }
  function onMove(dx) { p.ox -= dx * 0.55; p.vtilt += dx * 9; p.vsq += 1.2; }
  function onRotate(dir) { p.rot -= dir * 0.42; p.vsq -= 2.2; p.vtilt -= dir * 6; }
  function onFall(dy) { p.oy -= dy * 0.5; }
  function onLand() { p.vsq += 6; p.vtilt *= 0.5; }
  function onSpawn() { p.ox = 0; p.vx = 0; p.oy = -0.6; p.vy = 0; p.rot = 0; p.vr = 0; p.sq = 0; p.vsq = 3; p.tilt = 0; p.vtilt = 0; }
  function ripple(x, y, amp) { ripples.push({ x, y, t0: time, amp }); if (ripples.length > 8) ripples.shift(); }
  function update(dt) {
    time += dt;
    [p.ox, p.vx] = spring(p.ox, p.vx, 520, 26, dt);
    [p.oy, p.vy] = spring(p.oy, p.vy, 700, 40, dt);
    [p.rot, p.vr] = spring(p.rot, p.vr, 300, 15, dt);
    [p.sq, p.vsq] = spring(p.sq, p.vsq, 380, 9, dt);
    [p.tilt, p.vtilt] = spring(p.tilt, p.vtilt, 60, 4.2, dt); // liquid slosh: low stiffness, light damping
    p.tilt = clamp(p.tilt, -0.6, 0.6);
    ripples = ripples.filter((r) => time - r.t0 < 1.6);
  }
  // squash value for the active piece: >0 = squashed (wide/short)
  function piece() { return { ox: p.ox, oy: p.oy, rot: p.rot, sx: 1 + p.sq * 0.035, sy: 1 - p.sq * 0.045, tilt: p.tilt + p.vx * -0.02 }; }
  // per-cell jelly response to ripples; returns k (signed displacement) used for squash and liquid slosh
  const out = { k: 0, dy: 0, sx: 1, sy: 1, tilt: 0 };
  function cell(x, y) {
    let k = 0, tl = 0;
    for (const r of ripples) {
      const d = Math.hypot(x - r.x, (y - r.y) * 1.2), tau = time - r.t0 - d * 0.045;
      if (tau <= 0) continue;
      const e = r.amp * Math.exp(-tau * 4.2) / (1 + d * 0.18);
      k += e * Math.sin(tau * 24); tl += e * Math.cos(tau * 11) * Math.sign(x - r.x || 1);
    }
    out.k = k; out.sx = 1 + k * 0.07; out.sy = 1 - k * 0.1; out.dy = k * 0.05; out.tilt = tl * 0.5;
    return out;
  }
  return { onMove, onRotate, onFall, onLand, onSpawn, ripple, update, piece, cell, get time() { return time; } };
})();
