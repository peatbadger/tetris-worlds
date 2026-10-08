/* ================= Other stage backgrounds ================= */
function stripSprite(color) { // vertical gradient strip used for aurora curtains / rays
  const c = makeCanvas(1, 256), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, rgba(color, 0)); g.addColorStop(0.55, rgba(color, 0.35)); g.addColorStop(0.92, rgba(color, 0.9)); g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g; x.fillRect(0, 0, 1, 256); return c;
}
function glowDot(color, size = 64) {
  const c = makeCanvas(size, size), x = c.getContext('2d');
  x.fillStyle = radial(x, size / 2, size / 2, size / 2, [[0, rgba(color, 1)], [0.2, rgba(color, 0.6)], [1, rgba(color, 0)]]);
  x.fillRect(0, 0, size, size); return c;
}

/* ---------- Ocean Deep ---------- */
function makeOceanStage() {
  let W, H, D, u, bg, reefFar, reefNear, jellies, bubbles, plankton, schools, kelp, glow, glowPink;
  function reef(dark, seed, hgt) {
    const [c, x] = hiCanvas(W * 1.2, H, D); const rnd = mulberry32(seed);
    x.fillStyle = dark;
    x.beginPath(); x.moveTo(0, H);
    for (let i = 0; i <= 40; i++) { const xx = (i / 40) * W * 1.2; x.lineTo(xx, H - hgt * (0.4 + 0.6 * noise1(i * 0.45 + seed)) - rnd() * 10 * u); }
    x.lineTo(W * 1.2, H); x.closePath(); x.fill();
    for (let i = 0; i < 14; i++) { // branching corals
      const bx = rnd() * W * 1.2, by = H - hgt * 0.5 * rnd();
      const branch = (px, py, ang, len, w, d) => {
        if (d > 5 || len < 4 * u) return;
        const nx = px + Math.cos(ang) * len, ny = py + Math.sin(ang) * len;
        x.strokeStyle = dark; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(px, py); x.lineTo(nx, ny); x.stroke();
        branch(nx, ny, ang - 0.4 - rnd() * 0.3, len * 0.75, w * 0.7, d + 1); branch(nx, ny, ang + 0.4 + rnd() * 0.3, len * 0.75, w * 0.7, d + 1);
      };
      if (rnd() < 0.6) branch(bx, by, -Math.PI / 2 + (rnd() - 0.5) * 0.4, 30 * u + rnd() * 30 * u, 7 * u, 0);
      else { // fan coral
        for (let k = 0; k < 24; k++) { x.strokeStyle = dark; x.lineWidth = 1.5 * u; x.beginPath(); x.moveTo(bx, by); const a = -Math.PI + 0.3 + (k / 23) * (Math.PI - 0.6); x.quadraticCurveTo(bx + Math.cos(a) * 30 * u, by + Math.sin(a) * 50 * u, bx + Math.cos(a) * 60 * u, by + Math.sin(a) * 70 * u); x.stroke(); }
      }
    }
    return c;
  }
  function resize(w, h, d) {
    W = w; H = h; D = d; u = H / 800;
    [bg] = hiCanvas(W, H, 1);
    const b = bg.getContext('2d');
    b.fillStyle = linear(b, 0, 0, 0, H, [[0, '#0b5a7a'], [0.25, '#063b5c'], [0.6, '#03203a'], [1, '#010812']]); b.fillRect(0, 0, W, H);
    reefFar = reef('rgba(4,40,60,0.85)', 3, 220 * u);
    reefNear = reef('#010b14', 9, 140 * u);
    glow = glowDot('#7ff6ff'); glowPink = glowDot('#ff7ad9');
    jellies = Array.from({ length: 6 }, (_, i) => ({ x: rand(W), y: rand(H), s: rand(0.6, 1.3), ph: rand(10), c: i % 2 ? '#ff8ae0' : '#7fe8ff', v: rand(8, 16) }));
    bubbles = Array.from({ length: 50 }, () => ({ x: rand(W), y: rand(H), r: rand(1.5, 5), v: rand(20, 60), ph: rand(10) }));
    plankton = Array.from({ length: 130 }, () => ({ x: rand(W), y: rand(H), r: rand(0.5, 2), ph: rand(10), v: rand(2, 8) }));
    schools = [0, 1].map((i) => ({ y: H * (0.3 + i * 0.25), ph: i * 3, dir: i ? -1 : 1, fish: Array.from({ length: 26 }, () => ({ ox: rand(-90, 90), oy: rand(-35, 35), ph: rand(10) })) }));
    kelp = Array.from({ length: 16 }, (_, i) => ({ x: (i / 16) * W + rand(-30, 30), h: rand(0.25, 0.55) * H, ph: rand(10), w: rand(5, 10) }));
  }
  function draw(ctx, t, dt, env) {
    const cam = (env.mx || 0) * 20 * u + Math.sin(t * 0.05) * 10 * u;
    ctx.drawImage(bg, 0, 0, W, H);
    // god rays
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 7; i++) {
      const x = W * (0.08 + i * 0.14) + Math.sin(t * 0.15 + i) * 40 * u - cam * 0.2, sw = 30 * u + 20 * u * Math.sin(t * 0.3 + i * 2);
      const g = linear(ctx, 0, 0, 0, H * 0.85, [[0, `rgba(160,240,255,${0.12 + 0.05 * Math.sin(t * 0.5 + i)})`], [1, 'rgba(160,240,255,0)']]);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - sw, 0); ctx.lineTo(x + sw, 0); ctx.lineTo(x + sw * 4 + 120 * u, H * 0.85); ctx.lineTo(x - sw * 2 + 120 * u, H * 0.85); ctx.fill();
    }
    // caustic surface shimmer
    ctx.strokeStyle = 'rgba(180,250,255,0.08)'; ctx.lineWidth = 2 * u;
    for (let k = 0; k < 5; k++) { ctx.beginPath(); for (let x = 0; x <= W; x += 20) { const y = 12 * u + k * 14 * u + Math.sin(x * 0.02 / u + t * 1.2 + k) * 5 * u; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    ctx.restore();
    // whale
    const wp = ((t * 0.012) % 1.6) - 0.3;
    if (wp > -0.25 && wp < 1.25) {
      const wx = W * wp, wy = H * 0.28 + Math.sin(t * 0.2) * 20 * u, s = 1.6 * u;
      ctx.save(); ctx.translate(wx, wy); ctx.fillStyle = 'rgba(2,20,36,0.55)';
      ctx.beginPath(); ctx.moveTo(-140 * s, 0); ctx.bezierCurveTo(-110 * s, -40 * s, 60 * s, -42 * s, 120 * s, -6 * s); ctx.bezierCurveTo(130 * s, 10 * s, 60 * s, 26 * s, -60 * s, 14 * s); ctx.lineTo(-150 * s, 6 * s);
      ctx.lineTo(-190 * s, -22 * s + Math.sin(t) * 8 * s); ctx.lineTo(-175 * s, 4 * s); ctx.lineTo(-195 * s, 26 * s + Math.sin(t) * 8 * s); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(20 * s, 14 * s); ctx.lineTo(-10 * s, 50 * s + Math.sin(t * 0.8) * 6 * s); ctx.lineTo(-20 * s, 14 * s); ctx.fill();
      ctx.restore();
    }
    ctx.drawImage(reefFar, -W * 0.1 - cam * 0.3, 0, W * 1.2, H);
    // fish schools
    schools.forEach((sc) => {
      const cx = ((t * 30 * u * sc.dir + sc.ph * 500) % (W + 400)) * sc.dir + (sc.dir < 0 ? W + 200 : -200);
      const cy = sc.y + Math.sin(t * 0.4 + sc.ph) * 40 * u;
      ctx.fillStyle = 'rgba(170,220,235,0.55)';
      sc.fish.forEach((f) => {
        const x = cx + f.ox * u + Math.sin(t * 1.3 + f.ph) * 8 * u, y = cy + f.oy * u + Math.cos(t * 1.1 + f.ph) * 6 * u;
        ctx.save(); ctx.translate(x, y); ctx.scale(sc.dir, 1);
        ellipse(ctx, 0, 0, 7 * u, 2.4 * u); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-6 * u, 0); ctx.lineTo(-11 * u, -3 * u + Math.sin(t * 12 + f.ph) * u); ctx.lineTo(-11 * u, 3 * u); ctx.fill();
        ctx.restore();
      });
    });
    // kelp
    kelp.forEach((k) => {
      ctx.strokeStyle = '#0a3a2a'; ctx.lineWidth = k.w * u; ctx.lineCap = 'round';
      ctx.beginPath(); let px = k.x - cam * 0.6, py = H;
      ctx.moveTo(px, py);
      for (let s = 1; s <= 14; s++) { const yy = H - k.h * s / 14; const xx = k.x - cam * 0.6 + Math.sin(t * 0.8 + k.ph + s * 0.35) * s * 2.2 * u; ctx.lineTo(xx, yy); if (s % 3 === 0) { ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 14 * u, yy - 6 * u, xx + 22 * u * Math.sin(t + s), yy - 16 * u); ctx.moveTo(xx, yy); } }
      ctx.stroke();
    });
    // jellyfish
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    jellies.forEach((j) => {
      j.y -= j.v * u * dt * (0.6 + 0.6 * Math.max(0, Math.sin(t * 1.6 + j.ph))); if (j.y < -150 * u) { j.y = H + 100 * u; j.x = rand(W); }
      const pulse = 1 + Math.sin(t * 1.6 + j.ph) * 0.12, s = j.s * u, x = j.x + Math.sin(t * 0.3 + j.ph) * 20 * u, y = j.y;
      ctx.drawImage(j.c === '#ff8ae0' ? glowPink : glow, x - 60 * s, y - 50 * s, 120 * s, 120 * s);
      ctx.fillStyle = radial(ctx, x, y, 34 * s, [[0, rgba(j.c, 0.55)], [1, rgba(j.c, 0.05)]]);
      ctx.beginPath(); ctx.ellipse(x, y, 30 * s / pulse, 24 * s * pulse, 0, Math.PI, 0); ctx.quadraticCurveTo(x, y + 6 * s, x - 30 * s / pulse, y); ctx.fill();
      ctx.strokeStyle = rgba(j.c, 0.35); ctx.lineWidth = 1.2 * u;
      for (let k = 0; k < 7; k++) { ctx.beginPath(); const tx = x - 22 * s + k * 7.3 * s; ctx.moveTo(tx, y); for (let m = 1; m < 10; m++) ctx.lineTo(tx + Math.sin(t * 2 + k + m * 0.6) * 4 * s, y + m * 9 * s); ctx.stroke(); }
    });
    plankton.forEach((p) => { p.y -= p.v * dt * u; if (p.y < 0) p.y = H; const a = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + p.ph)); ctx.globalAlpha = a; ctx.drawImage(glow, p.x - p.r * 3 * u, p.y - p.r * 3 * u, p.r * 6 * u, p.r * 6 * u); });
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.drawImage(reefNear, -W * 0.1 - cam * 0.8, 0, W * 1.2, H);
    // bubbles
    ctx.lineWidth = 1 * u;
    bubbles.forEach((b) => {
      b.y -= b.v * dt * u; if (b.y < -10) { b.y = H + 10; b.x = rand(W); }
      const x = b.x + Math.sin(t * 2 + b.ph) * 4 * u;
      ctx.strokeStyle = 'rgba(200,250,255,0.45)'; ellipse(ctx, x, b.y, b.r * u, b.r * u); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(ctx, x - b.r * 0.35 * u, b.y - b.r * 0.35 * u, b.r * 0.3 * u, b.r * 0.3 * u); ctx.fill();
    });
    if (env.flash > 0) { ctx.fillStyle = `rgba(120,240,255,${env.flash * 0.25})`; ctx.fillRect(0, 0, W, H); }
  }
  return { resize, draw };
}

/* ---------- Neon City ---------- */
function makeNeonStage() {
  let W, H, D, u, sky, layers, signs, rain, cars, hz;
  function skyline(seed, col, minH, maxH, winA, withSigns) {
    const [c, x] = hiCanvas(W * 1.3, H, D); const rnd = mulberry32(seed);
    let px = 0; const out = [];
    while (px < W * 1.3) {
      const bw = (40 + rnd() * 70) * u, bh = (minH + rnd() * (maxH - minH)) * H;
      const top = hz - bh;
      x.fillStyle = col; x.fillRect(px, top, bw, bh + 4);
      if (rnd() < 0.3) { x.fillRect(px + bw * 0.4, top - 30 * u, 3 * u, 30 * u); }
      if (rnd() < 0.25) { x.fillRect(px + bw * 0.15, top - 14 * u, bw * 0.7, 14 * u); }
      for (let wy = top + 8 * u; wy < hz - 6 * u; wy += 9 * u) for (let wx = px + 5 * u; wx < px + bw - 6 * u; wx += 8 * u) {
        if (rnd() < winA) { x.fillStyle = pick2(rnd, ['rgba(255,220,140,0.75)', 'rgba(120,240,255,0.7)', 'rgba(255,120,220,0.6)', 'rgba(255,255,255,0.5)']); x.fillRect(wx, wy, 4 * u, 5 * u); }
      }
      if (withSigns && rnd() < 0.5) out.push({ x: px + bw * 0.2, y: top + 20 * u + rnd() * bh * 0.3, w: Math.min(bw * 0.6, 40 * u), h: (40 + rnd() * 60) * u, c: pick2(rnd, ['#00f0ff', '#ff2bd6', '#ffe14a', '#7cff6a', '#ff5a3a']), seed: Math.floor(rnd() * 1e6), ph: rnd() * 10 });
      px += bw + rnd() * 6 * u;
    }
    c.signs = out; return c;
  }
  function pick2(r, a) { return a[Math.floor(r() * a.length)]; }
  function resize(w, h, d) {
    W = w; H = h; D = d; u = H / 800; hz = H * 0.64;
    [sky] = hiCanvas(W, H, 1); const s = sky.getContext('2d');
    s.fillStyle = linear(s, 0, 0, 0, hz, [[0, '#05010f'], [0.5, '#1e0638'], [0.85, '#5a1060'], [1, '#c2337a']]); s.fillRect(0, 0, W, hz);
    for (let i = 0; i < 160; i++) { s.fillStyle = `rgba(255,255,255,${Math.random() * 0.6})`; s.fillRect(Math.random() * W, Math.random() * hz * 0.6, 1.2, 1.2); }
    // synth sun
    const sx = W * 0.5, sy = hz - 40 * u, sr = 190 * u;
    s.save(); s.shadowColor = '#ff3d8a'; s.shadowBlur = 80 * u;
    s.fillStyle = linear(s, 0, sy - sr, 0, sy + sr * 0.3, [[0, '#ffe36a'], [0.5, '#ff8a3d'], [1, '#ff2b7a']]);
    s.beginPath(); s.arc(sx, sy, sr, Math.PI, 0); s.fill(); s.restore();
    s.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 8; i++) { const yy = sy - sr * 0.55 + i * sr * 0.08; s.fillRect(sx - sr, yy, sr * 2, 2 * u + i * 1.2 * u); }
    s.globalCompositeOperation = 'source-over';
    s.fillStyle = '#05010c'; s.fillRect(0, hz, W, H - hz);
    layers = [skyline(1, '#2a0d4a', 0.12, 0.3, 0.05, false), skyline(2, '#16062a', 0.18, 0.42, 0.12, false), skyline(3, '#07020f', 0.15, 0.5, 0.18, true)];
    signs = layers[2].signs;
    rain = Array.from({ length: 160 }, () => ({ x: rand(W), y: rand(H), v: rand(500, 900), l: rand(10, 24) }));
    cars = Array.from({ length: 5 }, (_, i) => ({ x: rand(W), y: rand(0.1, 0.35) * H, v: rand(60, 160) * (i % 2 ? -1 : 1), c: pick(['#ff3a5a', '#ffffff', '#00f0ff']) }));
  }
  function draw(ctx, t, dt, env) {
    const cam = (env.mx || 0) * 24 * u + Math.sin(t * 0.07) * 12 * u;
    ctx.drawImage(sky, 0, 0, W, H);
    cars.forEach((c) => {
      c.x += c.v * dt * u; if (c.x > W + 50) c.x = -50; if (c.x < -50) c.x = W + 50;
      ctx.fillStyle = c.c; ctx.fillRect(c.x - cam * 0.2, c.y, 3 * u, 2 * u);
      ctx.fillStyle = rgba(c.c, 0.25); ctx.fillRect(c.x - cam * 0.2 - Math.sign(c.v) * 30 * u, c.y + 0.5 * u, Math.sign(c.v) * 30 * u, 1 * u);
    });
    layers.forEach((L, i) => ctx.drawImage(L, -W * 0.15 - cam * (0.2 + i * 0.3), 0, W * 1.3, H));
    // neon signs
    const ox = -W * 0.15 - cam * 0.8;
    ctx.save(); ctx.lineCap = 'round';
    signs.forEach((s, i) => {
      const fl = noise1(t * 8 + s.ph * 10) > 0.12 ? 1 : 0.25;
      ctx.shadowColor = s.c; ctx.shadowBlur = 14 * u * fl;
      ctx.strokeStyle = rgba(s.c, 0.9 * fl); ctx.lineWidth = 2 * u;
      ctx.strokeRect(s.x + ox, s.y, s.w, s.h);
      const r = mulberry32(s.seed); const gs = s.w * 0.7; const n = Math.max(1, Math.floor(s.h / (gs * 1.1)));
      for (let k = 0; k < n; k++) drawGlyph(ctx, s.x + ox + s.w * 0.15, s.y + 4 * u + k * gs * 1.1, gs, r, rgba(s.c, fl), 0.08);
    });
    ctx.restore();
    // grid floor
    ctx.save();
    ctx.fillStyle = linear(ctx, 0, hz, 0, H, [[0, '#1a0430'], [1, '#05010c']]); ctx.fillRect(0, hz, W, H - hz);
    ctx.beginPath(); ctx.rect(0, hz, W, H - hz); ctx.clip();
    const pc = `rgba(255,60,200,${0.55 + env.pulse * 0.4})`;
    const vx = W / 2 - cam, sp = (t * 0.6) % 1;
    ctx.beginPath();
    for (let i = -24; i <= 24; i++) { ctx.moveTo(vx + i * 8 * u, hz); ctx.lineTo(vx + i * 160 * u, H); }
    for (let i = 0; i < 14; i++) { const z = (i + sp) / 14; const y = hz + (H - hz) * Math.pow(z, 2.4); ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.strokeStyle = `rgba(255,60,200,${0.18 + env.pulse * 0.15})`; ctx.lineWidth = 6 * u; ctx.stroke();
    ctx.strokeStyle = pc; ctx.lineWidth = 1.5 * u; ctx.stroke();
    ctx.restore();
    ctx.fillStyle = linear(ctx, 0, hz - 30 * u, 0, hz + 30 * u, [[0, 'rgba(255,60,180,0)'], [0.5, 'rgba(255,90,200,0.35)'], [1, 'rgba(255,60,180,0)']]); ctx.fillRect(0, hz - 30 * u, W, 60 * u);
    // rain
    ctx.strokeStyle = 'rgba(170,200,255,0.25)'; ctx.lineWidth = 1 * u; ctx.beginPath();
    rain.forEach((r) => { r.y += r.v * dt * u; r.x -= r.v * 0.15 * dt * u; if (r.y > H) { r.y = -20; r.x = rand(W * 1.2); } ctx.moveTo(r.x, r.y); ctx.lineTo(r.x + r.l * 0.15 * u, r.y - r.l * u); });
    ctx.stroke();
    if (env.flash > 0) { ctx.fillStyle = `rgba(255,80,220,${env.flash * 0.25})`; ctx.fillRect(0, 0, W, H); }
  }
  return { resize, draw };
}

/* ---------- Desert Sunset ---------- */
function makeDesertStage() {
  let W, H, D, u, sky, mesas, dunes, cacti, sand, birds, hz;
  function dune(seed, c0, c1, base, amp, rip) {
    const [c, x] = hiCanvas(W * 2, H, D); const rnd = mulberry32(seed);
    const pts = [];
    for (let i = 0; i <= 60; i++) { const xx = (i / 60) * W * 2; pts.push([xx, base * H - amp * H * (0.5 + 0.5 * Math.sin(i / 60 * TAU * 2 + seed) * 0.6 + 0.4 * (noise1(i * 0.3 + seed * 7) - 0.5))]); }
    pts[60][1] = pts[0][1];
    x.beginPath(); x.moveTo(0, H); pts.forEach(([a, b]) => x.lineTo(a, b)); x.lineTo(W * 2, H); x.closePath();
    x.fillStyle = linear(x, 0, base * H - amp * H, 0, H, [[0, c0], [1, c1]]); x.fill();
    if (rip) { x.save(); x.clip(); x.strokeStyle = 'rgba(255,220,180,0.12)'; x.lineWidth = 1 * u;
      for (let i = 0; i < 70; i++) { const yy = base * H + rnd() * (H - base * H); const xx = rnd() * W * 2; x.beginPath(); x.moveTo(xx, yy); x.quadraticCurveTo(xx + 40 * u, yy - 6 * u, xx + 90 * u, yy); x.stroke(); }
      x.restore(); }
    // lit ridge
    x.strokeStyle = 'rgba(255,200,140,0.35)'; x.lineWidth = 1.5 * u; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke();
    c.pts = pts; return c;
  }
  function resize(w, h, d) {
    W = w; H = h; D = d; u = H / 800; hz = H * 0.6;
    [sky] = hiCanvas(W, H, 1); const s = sky.getContext('2d');
    s.fillStyle = linear(s, 0, 0, 0, hz, [[0, '#1a1040'], [0.35, '#5a2a68'], [0.65, '#d4505a'], [0.85, '#f59a4a'], [1, '#ffd890']]); s.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) { s.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`; s.fillRect(Math.random() * W, Math.random() * H * 0.25, 1.2, 1.2); }
    const sx = W * 0.78, sy = hz - 30 * u, sr = 120 * u;
    s.fillStyle = radial(s, sx, sy, sr * 3.5, [[0, 'rgba(255,220,140,0.6)'], [1, 'rgba(255,160,90,0)']]); s.fillRect(0, 0, W, H);
    s.fillStyle = linear(s, 0, sy - sr, 0, sy + sr, [[0, '#fff3c0'], [1, '#ff7a3a']]); s.beginPath(); s.arc(sx, sy, sr, 0, TAU); s.fill();
    s.fillStyle = 'rgba(214,80,90,0.55)'; for (let i = 0; i < 5; i++) s.fillRect(sx - sr, sy + i * 14 * u, sr * 2, (2 + i) * u);
    // wispy clouds
    for (let i = 0; i < 9; i++) { s.fillStyle = `rgba(${240},${130 + i * 8},${120},0.18)`; ellipse(s, Math.random() * W, H * (0.15 + Math.random() * 0.3), 160 * u, 8 * u); s.fill(); }
    // mesas
    [mesas] = hiCanvas(W * 1.4, H, D); const m = mesas.getContext('2d'); const r = mulberry32(5);
    m.fillStyle = 'rgba(110,40,70,0.85)';
    let x = 0; while (x < W * 1.4) { const mw = (80 + r() * 200) * u, mh = (40 + r() * 90) * u; m.beginPath(); m.moveTo(x, hz); m.lineTo(x + mw * 0.12, hz - mh); m.lineTo(x + mw * 0.88, hz - mh); m.lineTo(x + mw, hz); m.fill(); x += mw + r() * 150 * u; }
    m.fillRect(0, hz - 4 * u, W * 1.4, H);
    dunes = [dune(1, '#c2603a', '#7a2a2a', 0.66, 0.08, false), dune(2, '#d9784a', '#8a3a2a', 0.74, 0.08, true), dune(3, '#e89058', '#9a4a2a', 0.84, 0.09, true), dune(4, '#5a2418', '#2a0e08', 0.95, 0.07, false)];
    cacti = Array.from({ length: 5 }, (_, i) => ({ x: (i / 5) * W * 2 + rand(0, W * 0.2), s: rand(0.7, 1.3) }));
    sand = Array.from({ length: 110 }, () => ({ x: rand(W), y: rand(H * 0.55, H), v: rand(40, 140), l: rand(4, 18) }));
    birds = Array.from({ length: 7 }, (_, i) => ({ x: rand(W), y: rand(0.15, 0.4) * H, ph: rand(10), v: rand(18, 30) }));
  }
  function drawCactus(ctx, x, base, s) {
    ctx.fillStyle = '#1a0a08'; ctx.strokeStyle = '#1a0a08'; ctx.lineCap = 'round';
    ctx.lineWidth = 14 * s; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x, base - 110 * s); ctx.stroke();
    ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(x, base - 45 * s); ctx.lineTo(x - 26 * s, base - 45 * s); ctx.lineTo(x - 26 * s, base - 85 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, base - 60 * s); ctx.lineTo(x + 22 * s, base - 60 * s); ctx.lineTo(x + 22 * s, base - 95 * s); ctx.stroke();
  }
  function draw(ctx, t, dt, env) {
    const cam = (env.mx || 0) * 20 * u;
    ctx.drawImage(sky, 0, 0, W, H);
    birds.forEach((b) => {
      b.x += b.v * dt * u; if (b.x > W + 20) b.x = -20;
      const f = Math.sin(t * 6 + b.ph) * 5 * u;
      ctx.strokeStyle = 'rgba(40,10,30,0.8)'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(b.x - 8 * u, b.y + f); ctx.lineTo(b.x, b.y); ctx.lineTo(b.x + 8 * u, b.y + f); ctx.stroke();
    });
    ctx.drawImage(mesas, -W * 0.2 - cam * 0.2, 0, W * 1.4, H);
    dunes.forEach((d, i) => {
      const sp = [4, 9, 16, 28][i];
      const off = -((((t * sp * u + cam * (0.3 + i * 0.3) + W * 0.1) % (W * 2)) + W * 2) % (W * 2));
      ctx.drawImage(d, off, 0, W * 2, H);
      if (off + W * 2 < W) ctx.drawImage(d, off + W * 2, 0, W * 2, H);
      if (i === 1) { // caravan on ridge
        const cx = (t * 12 * u) % (W * 1.4) - W * 0.2;
        for (let k = 0; k < 4; k++) {
          const px = cx - k * 46 * u, rel = ((px - off) / (W * 2)) * 60; const pi = clamp(Math.floor(rel), 0, 59); const fr = rel - pi;
          const py = lerp(d.pts[pi][1], d.pts[pi + 1][1], fr);
          const step = Math.sin(t * 4 + k) * 2 * u;
          ctx.fillStyle = '#2a0e10';
          ellipse(ctx, px, py - 20 * u, 15 * u, 8 * u); ctx.fill(); ellipse(ctx, px - 3 * u, py - 28 * u, 6 * u, 6 * u); ctx.fill();
          ctx.fillRect(px + 10 * u, py - 34 * u, 3.5 * u, 16 * u); ellipse(ctx, px + 15 * u, py - 34 * u, 5 * u, 3 * u); ctx.fill();
          ctx.lineWidth = 2.4 * u; ctx.strokeStyle = '#2a0e10'; [-9, -5, 6, 10].forEach((lx, li) => { ctx.beginPath(); ctx.moveTo(px + lx * u, py - 16 * u); ctx.lineTo(px + lx * u + (li % 2 ? step : -step), py); ctx.stroke(); });
        }
      }
      if (i === 2) cacti.forEach((c) => { const x = ((c.x - t * sp * u - cam * 0.9) % (W * 2) + W * 2) % (W * 2) - W * 0.3; drawCactus(ctx, x, H * 0.86 + (c.s - 1) * 30 * u, c.s * u); });
    });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(255,200,140,0.18)'; ctx.lineWidth = 1 * u; ctx.beginPath();
    sand.forEach((s) => { s.x += s.v * dt * u; if (s.x > W + 20) { s.x = -20; s.y = rand(H * 0.55, H); } ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.l * u, s.y + 0.5 * u); });
    ctx.stroke(); ctx.restore();
    // heat haze band
    ctx.fillStyle = `rgba(255,190,120,${0.06 + 0.03 * Math.sin(t * 2)})`; ctx.fillRect(0, hz - 20 * u, W, 40 * u);
    if (env.flash > 0) { ctx.fillStyle = `rgba(255,200,120,${env.flash * 0.25})`; ctx.fillRect(0, 0, W, H); }
  }
  return { resize, draw };
}

/* ---------- Aurora Forest ---------- */
function makeAuroraStage() {
  let W, H, D, u, sky, mountains, forests, strips, snow, flies, flyDot;
  function forest(seed, col, base, hmin, hmax, density) {
    const [c, x] = hiCanvas(W * 1.3, H, D); const r = mulberry32(seed);
    x.fillStyle = col; x.fillRect(0, base * H, W * 1.3, H);
    for (let px = -20; px < W * 1.3 + 20; px += (6 + r() * 14) * u / density) {
      const th = (hmin + r() * (hmax - hmin)) * H, tw = th * 0.32, by = base * H + r() * 10 * u;
      x.beginPath(); x.moveTo(px, by - th);
      for (let k = 1; k <= 5; k++) { const yy = by - th + th * k / 5; const ww = tw * (k / 5) * 0.6 + tw * 0.15; x.lineTo(px + ww, yy); x.lineTo(px + ww * 0.45, yy); }
      x.lineTo(px + tw * 0.08, by); x.lineTo(px - tw * 0.08, by);
      for (let k = 5; k >= 1; k--) { const yy = by - th + th * k / 5; const ww = tw * (k / 5) * 0.6 + tw * 0.15; x.lineTo(px - ww * 0.45, yy); x.lineTo(px - ww, yy); }
      x.closePath(); x.fill();
    }
    return c;
  }
  function resize(w, h, d) {
    W = w; H = h; D = d; u = H / 800;
    [sky] = hiCanvas(W, H, 1); const s = sky.getContext('2d');
    s.fillStyle = linear(s, 0, 0, 0, H, [[0, '#01040c'], [0.45, '#06182a'], [0.7, '#0e3040'], [1, '#04121c']]); s.fillRect(0, 0, W, H);
    for (let i = 0; i < 400; i++) { const a = Math.random(); s.fillStyle = `rgba(255,255,255,${a * a})`; const r = Math.random() < 0.05 ? 2 : 1.1; s.fillRect(Math.random() * W, Math.random() * H * 0.6, r, r); }
    const mx = W * 0.83, my = H * 0.16;
    s.fillStyle = radial(s, mx, my, 120 * u, [[0, 'rgba(220,240,255,0.35)'], [1, 'rgba(220,240,255,0)']]); s.fillRect(0, 0, W, H);
    s.fillStyle = '#eef6ff'; s.beginPath(); s.arc(mx, my, 26 * u, 0, TAU); s.fill();
    s.fillStyle = 'rgba(160,180,200,0.35)'; [[-8, -5, 6], [6, 6, 4], [9, -9, 3]].forEach(([a, b, r]) => { s.beginPath(); s.arc(mx + a * u, my + b * u, r * u, 0, TAU); s.fill(); });
    [mountains] = hiCanvas(W * 1.2, H, D); const m = mountains.getContext('2d'); const r = mulberry32(11);
    const peaks = []; let x = -50; while (x < W * 1.2 + 50) { peaks.push([x, H * (0.38 + r() * 0.16)]); x += (60 + r() * 120) * u; }
    m.beginPath(); m.moveTo(0, H); peaks.forEach(([a, b], i) => { m.lineTo(a, b); if (i < peaks.length - 1) m.lineTo((a + peaks[i + 1][0]) / 2, Math.max(b, peaks[i + 1][1]) + 40 * u); }); m.lineTo(W * 1.2, H); m.closePath();
    m.fillStyle = linear(m, 0, H * 0.35, 0, H * 0.7, [[0, '#2a4a66'], [1, '#0a1a2a']]); m.fill();
    m.save(); m.clip(); m.fillStyle = 'rgba(230,245,255,0.75)';
    peaks.forEach(([a, b]) => { m.beginPath(); m.moveTo(a, b); m.lineTo(a - 26 * u, b + 34 * u); m.lineTo(a - 8 * u, b + 26 * u); m.lineTo(a + 4 * u, b + 38 * u); m.lineTo(a + 26 * u, b + 30 * u); m.closePath(); m.fill(); });
    m.restore();
    forests = [forest(21, '#0b2232', 0.66, 0.08, 0.16, 1.2), forest(22, '#061520', 0.76, 0.12, 0.22, 1), forest(23, '#020a10', 0.9, 0.18, 0.34, 0.7)];
    strips = ['#3dff9a', '#2ad6c6', '#b46aff'].map(stripSprite);
    snow = Array.from({ length: 140 }, () => ({ x: rand(W), y: rand(H), r: rand(0.6, 2.4), v: rand(12, 40), ph: rand(10) }));
    flyDot = glowDot('#d8ff7a', 32);
    flies = Array.from({ length: 26 }, () => ({ x: rand(W), y: rand(0.7, 0.95) * H, ph: rand(10) }));
  }
  function draw(ctx, t, dt, env) {
    const cam = (env.mx || 0) * 20 * u + Math.sin(t * 0.05) * 10 * u;
    ctx.drawImage(sky, 0, 0, W, H);
    // aurora curtains
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const stepX = 5 * u;
    strips.forEach((sp, ci) => {
      const base = H * (0.24 + ci * 0.07), amp = 1 + env.pulse * 0.25;
      for (let x = -stepX; x < W + stepX; x += stepX) {
        const xx = x + cam * 0.1;
        const y = base + Math.sin(xx * 0.0035 / u + t * 0.25 + ci * 2) * 50 * u + Math.sin(xx * 0.011 / u - t * 0.6 + ci) * 18 * u;
        const h = (110 + 70 * Math.sin(xx * 0.006 / u + t * 0.4 + ci * 3)) * u * amp;
        const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(xx * 0.02 / u + t * 1.3 + ci * 5)) * (0.5 + 0.5 * Math.sin(xx * 0.004 / u - t * 0.2 + ci));
        ctx.globalAlpha = a * (ci === 2 ? 0.6 : 1);
        ctx.drawImage(sp, x, y - h, stepX + 1, h * 1.15);
      }
    });
    ctx.globalAlpha = 1; ctx.restore();
    ctx.drawImage(mountains, -W * 0.1 - cam * 0.2, 0, W * 1.2, H);
    ctx.fillStyle = linear(ctx, 0, H * 0.55, 0, H * 0.75, [[0, 'rgba(120,180,200,0)'], [0.5, 'rgba(120,180,200,0.16)'], [1, 'rgba(120,180,200,0)']]); ctx.fillRect(0, H * 0.55, W, H * 0.2);
    forests.forEach((f, i) => { ctx.drawImage(f, -W * 0.15 - cam * (0.4 + i * 0.35), 0, W * 1.3, H); if (i === 0) { ctx.fillStyle = 'rgba(140,200,220,0.08)'; ctx.fillRect(0, H * 0.7, W, H * 0.1); } });
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    flies.forEach((f) => { const x = f.x + Math.sin(t * 0.5 + f.ph) * 30 * u, y = f.y + Math.sin(t * 0.8 + f.ph * 2) * 16 * u; ctx.globalAlpha = 0.4 + 0.6 * Math.max(0, Math.sin(t * 2 + f.ph)); ctx.drawImage(flyDot, x - 8 * u, y - 8 * u, 16 * u, 16 * u); });
    ctx.globalAlpha = 1; ctx.restore();
    ctx.fillStyle = 'rgba(240,250,255,0.85)';
    snow.forEach((s) => { s.y += s.v * dt * u; s.x += Math.sin(t + s.ph) * 10 * dt * u; if (s.y > H) { s.y = -5; s.x = rand(W); } ellipse(ctx, s.x, s.y, s.r * u, s.r * u); ctx.fill(); });
    if (env.flash > 0) { ctx.fillStyle = `rgba(120,255,190,${env.flash * 0.22})`; ctx.fillRect(0, 0, W, H); }
  }
  return { resize, draw };
}

/* ---------- Cosmic Nebula ---------- */
function makeCosmicStage() {
  let W, H, D, u, base, nebula, planet, galaxy, stars, comets, dotW, dotB;
  function resize(w, h, d) {
    W = w; H = h; D = d; u = H / 800;
    [base] = hiCanvas(W, H, 1); const b = base.getContext('2d');
    b.fillStyle = radial(b, W * 0.5, H * 0.5, Math.max(W, H) * 0.8, [[0, '#0c0620'], [1, '#010006']]); b.fillRect(0, 0, W, H);
    const S = Math.max(W, H) * 1.5;
    [nebula] = hiCanvas(S, S, 0.5); const n = nebula.getContext('2d'); const r = mulberry32(77);
    n.globalCompositeOperation = 'lighter';
    const cols = ['#7a2aff', '#ff3aa8', '#2ad6ff', '#ff8a3a', '#4a3aff'];
    for (let i = 0; i < 70; i++) {
      const a = r() * TAU, dd = Math.pow(r(), 0.7) * S * 0.38, x = S / 2 + Math.cos(a) * dd + Math.sin(a * 3) * S * 0.05, y = S / 2 + Math.sin(a) * dd * 0.6, rr = (0.05 + r() * 0.14) * S;
      n.fillStyle = radial(n, x, y, rr, [[0, rgba(cols[i % cols.length], 0.11)], [1, rgba(cols[i % cols.length], 0)]]); n.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
    n.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 25; i++) { const x = r() * S, y = S * 0.3 + r() * S * 0.4, rr = (0.03 + r() * 0.08) * S; n.fillStyle = radial(n, x, y, rr, [[0, 'rgba(0,0,8,0.35)'], [1, 'rgba(0,0,8,0)']]); n.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    nebula.S = S;
    // planet with rings
    const pr = 90 * u; [planet] = hiCanvas(pr * 5, pr * 3, D); const p = planet.getContext('2d'); const pcx = pr * 2.5, pcy = pr * 1.5;
    const ring = (front) => { p.save(); p.translate(pcx, pcy); p.rotate(-0.35); p.beginPath(); p.ellipse(0, 0, pr * 2.2, pr * 0.55, 0, front ? 0 : Math.PI, front ? Math.PI : TAU); p.strokeStyle = 'rgba(230,200,160,0.55)'; p.lineWidth = pr * 0.18; p.stroke(); p.strokeStyle = 'rgba(255,230,200,0.3)'; p.lineWidth = pr * 0.06; p.beginPath(); p.ellipse(0, 0, pr * 1.85, pr * 0.46, 0, front ? 0 : Math.PI, front ? Math.PI : TAU); p.stroke(); p.restore(); };
    ring(false);
    p.fillStyle = radial(p, pcx - pr * 0.4, pcy - pr * 0.4, pr * 1.4, [[0, '#ffcf9a'], [0.5, '#c06a4a'], [1, '#2a0a1a']]); p.beginPath(); p.arc(pcx, pcy, pr, 0, TAU); p.fill();
    p.save(); p.clip(); for (let i = 0; i < 9; i++) { p.fillStyle = `rgba(${i % 2 ? '255,220,180' : '120,40,40'},0.15)`; p.fillRect(pcx - pr, pcy - pr + i * pr * 0.24 + Math.sin(i) * 6, pr * 2, pr * 0.1); } p.restore();
    ring(true);
    // galaxy
    const gr = 70 * u; [galaxy] = hiCanvas(gr * 2, gr * 2, D); const g = galaxy.getContext('2d'); const rg = mulberry32(3);
    for (let i = 0; i < 900; i++) { const arm = i % 2, tt = rg() * 3.5, a = tt * 2 + arm * Math.PI + rg() * 0.5, dd = tt / 3.5 * gr; g.fillStyle = `rgba(${200 + rg() * 55},${180 + rg() * 60},255,${0.5 * (1 - tt / 3.5)})`; g.fillRect(gr + Math.cos(a) * dd, gr + Math.sin(a) * dd * 0.45, 1.2, 1.2); }
    g.fillStyle = radial(g, gr, gr, gr * 0.3, [[0, 'rgba(255,240,220,0.9)'], [1, 'rgba(255,200,255,0)']]); g.fillRect(0, 0, gr * 2, gr * 2);
    dotW = glowDot('#ffffff', 32); dotB = glowDot('#9ad8ff', 32);
    stars = Array.from({ length: 260 }, () => ({ x: rand(W), y: rand(H), z: rand(0.2, 1), ph: rand(10), b: Math.random() < 0.06 }));
    comets = [];
  }
  function draw(ctx, t, dt, env) {
    const cam = (env.mx || 0) * 30 * u;
    ctx.drawImage(base, 0, 0, W, H);
    ctx.save(); ctx.translate(W / 2 - cam * 0.1, H / 2); ctx.rotate(t * 0.006); ctx.globalAlpha = 0.9 + env.pulse * 0.1;
    ctx.drawImage(nebula, -nebula.S / 2, -nebula.S / 2, nebula.S, nebula.S); ctx.restore();
    ctx.drawImage(galaxy, W * 0.78 - cam * 0.15, H * 0.12, galaxy.cssW, galaxy.cssH);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const warp = env.flash;
    stars.forEach((s) => {
      s.x -= (6 + 30 * s.z) * dt * u * (1 + warp * 6);
      if (s.x < -10) { s.x = W + 10; s.y = rand(H); }
      const x = s.x - cam * s.z, a = (0.4 + 0.6 * Math.abs(Math.sin(t * (0.5 + s.z) + s.ph))) * s.z;
      const sz = (s.b ? 10 : 4) * s.z * u;
      ctx.globalAlpha = a;
      if (warp > 0.05) { ctx.strokeStyle = '#bfe4ff'; ctx.lineWidth = 1.2 * u * s.z; ctx.beginPath(); ctx.moveTo(x, s.y); ctx.lineTo(x + warp * 80 * s.z * u, s.y); ctx.stroke(); }
      ctx.drawImage(s.b ? dotB : dotW, x - sz, s.y - sz, sz * 2, sz * 2);
      if (s.b) { ctx.fillStyle = '#cfe8ff'; ctx.fillRect(x - sz * 2, s.y - 0.5, sz * 4, 1); ctx.fillRect(x - 0.5, s.y - sz * 2, 1, sz * 4); }
    });
    ctx.globalAlpha = 1;
    if (Math.random() < dt * 0.25) comets.push({ x: rand(W * 0.3, W * 1.1), y: rand(-20, H * 0.3), vx: -rand(300, 600), vy: rand(100, 250), life: 1 });
    comets = comets.filter((c) => (c.life -= dt * 0.8) > 0);
    comets.forEach((c) => {
      c.x += c.vx * dt * u; c.y += c.vy * dt * u;
      const g = linear(ctx, c.x, c.y, c.x - c.vx * 0.25 * u, c.y - c.vy * 0.25 * u, [[0, `rgba(255,255,255,${c.life})`], [1, 'rgba(160,200,255,0)']]);
      ctx.strokeStyle = g; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(c.x - c.vx * 0.25 * u, c.y - c.vy * 0.25 * u); ctx.stroke();
    });
    ctx.restore();
    ctx.drawImage(planet, W * 0.02 - cam * 0.6 + Math.sin(t * 0.05) * 10 * u, H * 0.62, planet.cssW, planet.cssH);
    if (env.flash > 0) { ctx.fillStyle = `rgba(190,140,255,${env.flash * 0.22})`; ctx.fillRect(0, 0, W, H); }
  }
  return { resize, draw };
}

const STAGE_FACTORIES = { ocean: makeOceanStage, sushi: makeSushiStage, desert: makeDesertStage, neon: makeNeonStage, aurora: makeAuroraStage, cosmic: makeCosmicStage };
