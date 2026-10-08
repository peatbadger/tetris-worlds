/* ================= Time-of-day + weather + life-events system (shared by all worlds) =================
   Progress p (0..1) within a world comes from lines cleared + time spent. Each world maps p onto its own
   sequence of day phases; weather is rolled per run & world. Scenes query Amb.* to light/tint themselves. */
const Amb = (() => {
  const PH = {
    dawn: { sky: ['#3a3a6a', '#e8a0a0', '#ffd8a0'], grade: [255, 190, 170, 0.10], dark: 0.15, sun: 0.1, lights: 0.4, stars: 0.2, label: 'Dawn' },
    morning: { sky: ['#6aa8e8', '#a8d0f0', '#e8f0f8'], grade: [255, 250, 235, 0.0], dark: 0.0, sun: 0.45, lights: 0.0, stars: 0, label: 'Morning' },
    noon: { sky: ['#4a90e0', '#8ac0f0', '#d8ecf8'], grade: [255, 255, 245, 0.0], dark: 0.0, sun: 0.85, lights: 0.0, stars: 0, label: 'Lunchtime' },
    afternoon: { sky: ['#5a98d8', '#a8c8e0', '#f0e0c0'], grade: [255, 230, 190, 0.05], dark: 0.0, sun: 0.6, lights: 0.1, stars: 0, label: 'Afternoon' },
    dusk: { sky: ['#2a2a5a', '#c8607a', '#ffb060'], grade: [255, 150, 90, 0.12], dark: 0.18, sun: 0.08, lights: 0.8, stars: 0.3, label: 'Dusk' },
    night: { sky: ['#05060f', '#0e1430', '#1a2448'], grade: [70, 90, 170, 0.18], dark: 0.4, sun: -1, lights: 1, stars: 1, label: 'Night' },
    late: { sky: ['#020208', '#080a1c', '#101630'], grade: [50, 60, 140, 0.24], dark: 0.5, sun: -1, lights: 0.75, stars: 1, label: 'Last orders' },
  };
  const ORDER = {
    sushi: ['dusk', 'night', 'late', 'dawn'], mikes: ['morning', 'noon', 'afternoon', 'dusk'], speakeasy: ['dusk', 'night', 'late', 'dawn'],
    dimsum: ['morning', 'noon', 'afternoon'], gelato: ['noon', 'afternoon', 'dusk', 'night'], fishhouse: ['dusk', 'night', 'late'],
    pizzeria: ['afternoon', 'dusk', 'night', 'late'], fastfood: ['morning', 'noon', 'afternoon', 'dusk', 'night'], oden: ['night', 'late', 'dawn'],
    ocean: ['noon', 'dusk', 'night', 'dawn'], desert: ['afternoon', 'dusk', 'night', 'dawn'], neon: ['dusk', 'night', 'late'], aurora: ['dusk', 'night', 'late', 'dawn'], cosmic: ['night', 'late', 'night'],
  };
  const WEATHERS = ['clear', 'clear', 'rain', 'snow', 'storm', 'wind'];
  const rollW = {};
  let cur = { id: '', p: 0, time: 0 }, flashT = 0, nextThunder = 6;
  const st = { phase: 'dusk', next: 'night', k: 0, sky: ['#000000', '#000000', '#000000'], grade: [0, 0, 0, 0], dark: 0, sun: 0, lights: 1, stars: 0, weather: 'clear', wet: 0, wind: 0, flash: 0, crowd: 1, label: '' };
  function roll(id) { if (!rollW[id]) rollW[id] = id === 'cosmic' ? 'clear' : WEATHERS[Math.floor(Math.random() * WEATHERS.length)]; return rollW[id]; }
  function reroll() { for (const k in rollW) delete rollW[k]; }
  function update(id, p, dt) {
    if (cur.id !== id) cur = { id, p, time: 0 };
    cur.p = p; cur.time += dt;
    const ord = ORDER[id] || ['dusk', 'night'];
    const f = clamp(p, 0, 0.9999) * (ord.length - 1), i = Math.floor(f), k = smooth(f - i);
    const A = PH[ord[i]], B = PH[ord[Math.min(i + 1, ord.length - 1)]];
    st.phase = ord[i]; st.next = ord[Math.min(i + 1, ord.length - 1)]; st.k = k; st.label = (k > 0.5 ? B : A).label;
    st.sky = A.sky.map((c, j) => mix(c, B.sky[j], k));
    st.grade = A.grade.map((v, j) => lerp(v, B.grade[j], k));
    st.dark = lerp(A.dark, B.dark, k); st.sun = lerp(A.sun, B.sun, k); st.lights = lerp(A.lights, B.lights, k); st.stars = lerp(A.stars, B.stars, k);
    st.weather = roll(id); st.wet = st.weather === 'rain' || st.weather === 'storm' ? 1 : 0; st.wind = st.weather === 'wind' || st.weather === 'storm' ? 1 : 0;
    st.crowd = { dawn: 0.35, morning: 0.6, noon: 1, afternoon: 0.7, dusk: 0.85, night: 1, late: 0.45 }[k > 0.5 ? st.next : st.phase];
    if (st.weather === 'storm') { nextThunder -= dt; if (nextThunder <= 0) { flashT = 0.6; nextThunder = 7 + Math.random() * 10; if (typeof AudioEngine !== 'undefined' && AudioEngine.sfx.thunder) AudioEngine.sfx.thunder(); } }
    flashT = Math.max(0, flashT - dt); st.flash = flashT > 0 ? (Math.sin(flashT * 40) > 0 ? flashT : flashT * 0.3) : 0;
  }
  const flakes = []; for (let i = 0; i < 70; i++) flakes.push({ x: Math.random(), y: Math.random(), s: 0.4 + Math.random(), ph: Math.random() * 6 });
  function sky(ctx, x, y, w, h, t, o = {}) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.fillStyle = linear(ctx, 0, y, 0, y + h, [[0, st.sky[0]], [0.6, st.sky[1]], [1, st.sky[2]]]); ctx.fillRect(x, y, w, h);
    if (st.weather !== 'clear' && st.weather !== 'wind') { ctx.fillStyle = `rgba(110,115,130,${st.weather === 'storm' ? 0.5 : 0.3})`; ctx.fillRect(x, y, w, h); }
    if (st.stars > 0.05 && (st.weather === 'clear' || st.weather === 'wind')) { ctx.fillStyle = '#ffffff'; for (let i = 0; i < 30; i++) { const sx = x + ((i * 97.3) % 1000) / 1000 * w, sy = y + ((i * 61.7) % 1000) / 1000 * h * 0.6; ctx.globalAlpha = st.stars * (0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i))); ctx.fillRect(sx, sy, 1.5, 1.5); } ctx.globalAlpha = 1; }
    if (st.sun > 0) { const sx = x + w * (0.2 + 0.6 * st.sun), sy = y + h * (0.9 - st.sun * 0.6); ctx.fillStyle = radial(ctx, sx, sy, w * 0.25, [[0, 'rgba(255,250,220,0.9)'], [0.15, 'rgba(255,230,170,0.5)'], [1, 'rgba(255,200,120,0)']]); ctx.fillRect(x, y, w, h); }
    else if (st.weather === 'clear' || st.weather === 'wind') { const mx = x + w * 0.7, my = y + h * 0.25, r = Math.min(w, h) * 0.06 + 3; ellipse(ctx, mx, my, r, r); ctx.fillStyle = '#f4f0dc'; ctx.fill(); ellipse(ctx, mx + r * 0.4, my - r * 0.2, r * 0.85, r * 0.85); ctx.fillStyle = st.sky[0]; ctx.fill(); }
    if (o.city) o.city(ctx, x, y, w, h, st.lights);
    if (st.flash) { ctx.fillStyle = `rgba(230,235,255,${st.flash * 0.8})`; ctx.fillRect(x, y, w, h); }
    precip(ctx, x, y, w, h, t, 1);
    ctx.restore();
    glass(ctx, x, y, w, h, t);
  }
  function precip(ctx, x, y, w, h, t, scale) {
    if (st.weather === 'rain' || st.weather === 'storm') {
      ctx.strokeStyle = 'rgba(200,215,235,0.45)'; ctx.lineWidth = 1; ctx.beginPath();
      const sl = st.wind ? 0.35 : 0.12;
      for (let i = 0; i < 40; i++) { const px = x + ((i * 53.1 + t * 400 * sl) % w + w) % w, py = y + ((i * 37.7 + t * 520) % h); ctx.moveTo(px, py); ctx.lineTo(px - 12 * sl * scale, py + 14 * scale); }
      ctx.stroke();
    } else if (st.weather === 'snow') {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (const f of flakes) { const px = x + ((f.x * w + Math.sin(t * 0.8 + f.ph) * 12 + t * 8) % w + w) % w, py = y + ((f.y * h + t * 30 * f.s) % h); ctx.beginPath(); ctx.arc(px, py, 1.2 + f.s * 1.6 * scale, 0, TAU); ctx.fill(); }
    } else if (st.weather === 'wind') {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { const py = y + ((i * 0.17 + t * 0.05) % 1) * h, px = x + ((t * 300 + i * 133) % (w * 1.5)) - w * 0.25; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 30, py - 6, px + 60, py); ctx.stroke(); }
      ctx.fillStyle = 'rgba(200,120,40,0.8)'; for (let i = 0; i < 5; i++) { const px = x + ((t * 120 + i * 177) % (w + 40)) - 20, py = y + h * (0.2 + ((i * 0.23 + Math.sin(t + i) * 0.1 + 1) % 0.7)); ellipse(ctx, px, py, 3, 1.6, t * 4 + i); ctx.fill(); }
    }
  }
  function glass(ctx, x, y, w, h, t) {
    if (st.weather === 'snow' || st.dark > 0.3) { ctx.fillStyle = `rgba(230,240,250,${st.weather === 'snow' ? 0.18 : 0.06})`; ctx.fillRect(x, y, w, h); if (st.weather === 'snow') { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(x, y + h - 5, w, 5); } }
    if (st.wet) { ctx.fillStyle = 'rgba(220,235,255,0.55)'; for (let i = 0; i < 14; i++) { const px = x + ((i * 71.3) % 100) / 100 * w, py = y + (((i * 43.1) % 100) / 100 * h + t * (8 + (i % 4) * 9)) % h; ellipse(ctx, px, py, 1.4, 2); ctx.fill(); ctx.fillRect(px - 0.4, py - 8, 0.8, 8); } }
  }
  function grade(ctx, W, H, o = {}) {
    const g = st.grade, indoor = o.indoor !== false;
    if (g[3] > 0.005) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(${g[0] | 0},${g[1] | 0},${g[2] | 0},${g[3] * (indoor ? 1.4 : 2)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    const dk = st.dark * (indoor ? 0.5 : 1) + (st.weather === 'storm' ? 0.08 : st.weather === 'rain' ? 0.04 : 0);
    if (dk > 0.01) { ctx.fillStyle = `rgba(5,8,20,${dk * 0.55})`; ctx.fillRect(0, 0, W, H); }
    if (st.flash) { ctx.fillStyle = `rgba(220,230,255,${st.flash * 0.25})`; ctx.fillRect(0, 0, W, H); }
    if (!indoor) precip(ctx, 0, 0, W, H, o.t || 0, 2.2);
  }
  function boardTint() { const g = st.grade; return g[3] > 0.01 || st.dark > 0.05 ? `rgba(${g[0] | 0},${g[1] | 0},${g[2] | 0},${Math.min(0.22, g[3] + st.dark * 0.12)})` : null; }
  function scheduler(list) {
    const s = { list: list.map((e) => Object.assign({ fired: false, t: 0, active: false }, e)) };
    s.update = (p, dt) => { for (const e of s.list) { if (!e.fired && p >= e.at) { e.fired = true; e.active = true; e.t = 0; if (e.start) e.start(); } if (e.active) { e.t += dt; if (e.t >= e.dur) { e.active = false; if (e.end) e.end(); } } } };
    s.on = (name) => s.list.find((e) => e.name === name && e.active);
    s.reset = () => s.list.forEach((e) => { e.fired = false; e.active = false; e.t = 0; });
    return s;
  }
  return { st, update, sky, precip, glass, grade, boardTint, scheduler, roll, reroll, PH, ORDER };
})();
