/* ================= World 1 · Kaiten Sushi — GEOMETRIC (flat mid-century) edition =================
   Whole scene drawn procedurally as flat vector planes, every colour from SushiPal slots (blended through
   lunch -> dusk -> neon night -> pastel morning; Japanese palette on snow days). A never-stopping curved
   stainless belt, an itamae who slices / shapes / replenishes and sends special orders, a waitress who pours
   tea, clears plate stacks and checks bills, and a rotating pool of customer types with personalities who
   arrive, eat, talk, pass soy, clink cups, take photos, ask the chef, react to line clears, pay and leave. */
function makeSushiGeoStage() {
  const BW = 1280, BH = 720, F = SushiFig;
  let W = 1280, H = 720, D = 1, k = 1, ox = 0, oy = 0, extraB = 0, vign = null, grain = null, built = false, simT = 0, lastEv = 0;
  let P = SushiPal.at(12, 'clear');
  const S = { hourOverride: null, lapse: 0, lapseH: 12, timeScale: 1 };
  /* ---------- geometry ---------- */
  const U = (x) => (x - 640) / 640;
  const beltY = (x) => 520 + 18 * U(x) * U(x), beltS = (x) => 1 + 0.12 * U(x) * U(x);
  const farY = (x) => beltY(x) - 24 * beltS(x), nearY = (x) => beltY(x) + 24 * beltS(x), faceB = (x) => nearY(x) + 30 * beltS(x);
  const itemY = (x) => farY(x) - 5; // things standing on the wooden ledge behind the belt
  const SEAT_Y = 598, FLOOR = 708, WALL_FLOOR = 662, AISLE_FLOOR = 676, BELT_X0 = 26, VIS = 1300, LOOP = VIS + 520, SPEED = 34;
  const SEATS = [92, 200, 308, 972, 1080, 1188].map((x, i) => ({ i, x, f: i < 3 ? 1 : -1, side: i < 3 ? 0 : 1, occ: null, stack: [], cup: null, freeAt: 0 }));
  const EXIT = [-90, 975]; // left edge, right arch doorway
  const LANTERNS = [[166, 150, 64, 'lant1'], [420, 172, 54, 'lant2'], [858, 172, 54, 'lant3'], [1060, 146, 58, 'lant2']];
  const WIN = { x0: 1102, y0: 22, x1: 1292, y1: 432 };
  const ARCH = { x0: 872, x1: 1082, top: 92, d0: 918, d1: 1032, dt: 300 };
  const rnd0 = mulberry32(77);
  const CITY = (() => { const a = []; let x = WIN.x0 - 6; while (x < WIN.x1 + 10) { const w = 18 + rnd0() * 30, h = 90 + rnd0() * 190; a.push({ x, w, h, roof: rnd0() < 0.3 ? 'tri' : rnd0() < 0.3 ? 'step' : 'flat', tone: rnd0() < 0.5 ? 0 : 1, lit: Array.from({ length: 40 }, () => rnd0()) }); x += w + 2 + rnd0() * 6; } return a; })();
  const CLOUDS = [[0.15, 70, 1], [0.6, 120, 0.8], [1.05, 46, 0.65]];
  const PETALS = Array.from({ length: 18 }, () => ({ x: rnd0(), y: rnd0(), s: 0.6 + rnd0() * 0.8, ph: rnd0() * 6 }));
  const FLAKES = Array.from({ length: 46 }, () => ({ x: rnd0(), y: rnd0(), s: 0.5 + rnd0(), ph: rnd0() * 6 }));
  const DROPS = Array.from({ length: 36 }, () => ({ x: rnd0(), y: rnd0(), s: 0.6 + rnd0() * 0.6 }));
  const MENU = [['まぐろ', '#c8283a'], ['サーモン', '#f2763a'], ['たまご', '#e8b52c'], ['いくら', '#f05a1e'], ['えび', '#ef6a3a'], ['かっぱ', '#62b03c']];
  const JPF = `700 15px "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", "Noto Sans JP", "Yu Gothic", ${JP_FONT}`;
  const poly = (c, pts) => { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); };
  const L = (hex) => SushiPal.lit(hex);
  let beltPath = null, ledgePaths = null;
  function buildBelt() {
    const top = [], near = [], face = [];
    for (let x = BELT_X0 + 30; x <= 1300; x += 16) { top.push([x, farY(x)]); near.push([x, nearY(x)]); face.push([x, faceB(x)]); }
    beltPath = { top, near, face };
    ledgePaths = [[0, 404], [876, 1300]].map(([a, b]) => { const pts = []; for (let x = a; x <= b; x += 16) pts.push([x, farY(x)]); return pts; });
  }
  function weights(h) { // how much "morning" / "lunch" etc. is in the air (for window dressing)
    let hh = h; while (hh < 8) hh += 24; while (hh >= 32) hh -= 24;
    const morning = hh < 11.5 ? 1 - (hh - 8) / 3.5 : hh > 26.5 ? (hh - 26.5) / 5.5 : 0;
    const dusk = hh > 15 && hh < 21 ? (hh < 18 ? (hh - 15) / 3 : 1 - (hh - 18) / 3) : 0;
    return { morning: clamp(morning, 0, 1), dusk: clamp(dusk, 0, 1), day: clamp(1 - P.night - morning * 0.5, 0, 1) };
  }

  /* ---------- room ---------- */
  function drawRoom(c, t) {
    const wx = weights(P.hour);
    c.fillStyle = P.wall; c.fillRect(-60, -40, BW + 120, WALL_FLOOR + 40);
    // ceiling planes + big angular wall planes (ref composition, mirrored around the central itamae)
    c.fillStyle = P.ceil; poly(c, [360, -40, 1110, -40, 1110, 18, 930, 92, 640, 64, 360, 34]); c.fill();
    c.fillStyle = P.wallB; poly(c, [-60, 140, 120, 64, 120, WALL_FLOOR, -60, WALL_FLOOR]); c.fill();
    c.fillStyle = P.wallC; poly(c, [120, 64, 150, 70, 150, WALL_FLOOR, 120, WALL_FLOOR]); c.fill();
    c.fillStyle = P.wallB; poly(c, [360, 34, 640, 64, 430, 150, 360, 150]); c.fill();
    c.fillStyle = P.wallC; poly(c, [640, 64, 930, 92, 850, 130, 640, 140]); c.fill();
    // itamae panel with the kitchen noren doorway
    c.fillStyle = P.panel; poly(c, [430, 150, 850, 130, 850, 470, 430, 470]); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.12)'; poly(c, [430, 150, 520, 146, 470, 470, 430, 470]); c.fill();
    c.fillStyle = P.door; c.fillRect(742, 250, 84, 220);
    drawNoren(c, 742, 250, 84, 52, t, 'noren');
    // arch + right doorway (customers come and go here)
    c.fillStyle = P.arch; c.beginPath(); c.moveTo(ARCH.x0, WALL_FLOOR); c.lineTo(ARCH.x0, ARCH.top + 110); c.quadraticCurveTo(ARCH.x0, ARCH.top, (ARCH.x0 + ARCH.x1) / 2, ARCH.top); c.quadraticCurveTo(ARCH.x1, ARCH.top, ARCH.x1, ARCH.top + 110); c.lineTo(ARCH.x1, WALL_FLOOR); c.closePath(); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.1)'; c.fillRect(ARCH.x0, ARCH.top + 60, 26, WALL_FLOOR - ARCH.top - 60);
    c.fillStyle = P.door; c.beginPath(); c.moveTo(ARCH.d0, WALL_FLOOR); c.lineTo(ARCH.d0, ARCH.dt + 40); c.quadraticCurveTo(ARCH.d0, ARCH.dt, (ARCH.d0 + ARCH.d1) / 2, ARCH.dt); c.quadraticCurveTo(ARCH.d1, ARCH.dt, ARCH.d1, ARCH.dt + 40); c.lineTo(ARCH.d1, WALL_FLOOR); c.closePath(); c.fill();
    drawNoren(c, ARCH.d0 + 6, ARCH.dt + 18, ARCH.d1 - ARCH.d0 - 12, 58, t, 'noren', doorWave);
    c.fillStyle = P.wallC; c.fillRect(ARCH.x1, 40, WIN.x0 - ARCH.x1, WALL_FLOOR - 40);
    drawWindow(c, t, wx);
    c.fillStyle = P.wallC; c.fillRect(WIN.x0 - 10, WIN.y1 + 14, BW - WIN.x0 + 80, WALL_FLOOR - WIN.y1 - 14);
    // wainscot + floor
    c.fillStyle = shade(P.wallC, -0.08); c.fillRect(-60, 590, BW + 120, WALL_FLOOR - 590);
    c.fillStyle = P.floor; c.fillRect(-60, WALL_FLOOR, BW + 120, BH - WALL_FLOOR + extraB + 60);
    c.fillStyle = P.floorB; for (let i = 0; i < 7; i++) { const x = -40 + i * 220; poly(c, [x, WALL_FLOOR, x + 60, WALL_FLOOR, x - 40 + 60, BH + extraB + 60, x - 120, BH + extraB + 60]); c.fill(); }
    // menu tags over the left seats
    c.font = `700 13px "Hiragino Sans", "Noto Sans CJK JP", "Noto Sans JP", ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    MENU.forEach(([txt, dot], i) => {
      const x = 182 + i * 38, y = 196 + (i % 2) * 6, h = 30 + txt.length * 14;
      c.fillStyle = P.tag; c.fillRect(x - 14, y, 28, h); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 6, y, 8, h);
      c.fillStyle = L(dot); c.beginPath(); c.arc(x, y + 11, 5, 0, TAU); c.fill();
      c.fillStyle = P.ink; [...txt].forEach((ch, j) => c.fillText(ch, x - 1, y + 26 + j * 14));
    });
    c.fillStyle = P.cord; c.fillRect(160, 190, 238, 3);
    // plant on a little wall shelf
    c.fillStyle = P.woodDk; c.fillRect(0, 432, 96, 8);
    c.fillStyle = P.pot; poly(c, [24, 392, 70, 392, 64, 432, 30, 432]); c.fill(); c.fillStyle = 'rgba(0,0,0,0.18)'; poly(c, [47, 392, 70, 392, 64, 432, 47, 432]); c.fill();
    const sway = Math.sin(t * 0.7) * 0.03;
    [[-0.9, 74, 0], [-0.45, 92, 1], [0, 104, 0], [0.42, 90, 1], [0.85, 70, 0], [-0.2, 62, 1], [0.25, 58, 0]].forEach(([a, len, tone]) => {
      const ang = a + sway, bx = 47, by = 392, tx = bx + Math.sin(ang) * len, ty = by - Math.cos(ang) * len, nx = Math.cos(ang) * 11, ny = Math.sin(ang) * 11;
      c.fillStyle = tone ? P.plant2 : P.plant; c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo((bx + tx) / 2 + nx, (by + ty) / 2 + ny, tx, ty); c.quadraticCurveTo((bx + tx) / 2 - nx, (by + ty) / 2 - ny, bx, by); c.fill();
    });
  }
  let doorWave = 0;
  function drawNoren(c, x, y, w, h, t, slot, wave = 0) {
    const n = 3, gw = w / n;
    for (let i = 0; i < n; i++) { const sw = Math.sin(t * 1.3 + i) * 1.5 + wave * (i - 1) * 10; c.fillStyle = P[slot]; poly(c, [x + i * gw + 1, y, x + (i + 1) * gw - 1, y, x + (i + 1) * gw - 1 + sw, y + h, x + i * gw + 1 + sw, y + h]); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,0.75)'; c.beginPath(); c.arc(x + w / 2, y + h * 0.45, Math.min(w, h) * 0.14, 0, TAU); c.fill();
    c.fillStyle = P.cord; c.fillRect(x - 4, y - 3, w + 8, 4);
  }
  function drawWindow(c, t, wx) {
    const { x0, y0, x1, y1 } = WIN, w = x1 - x0, h = y1 - y0, wth = SushiPal.weather;
    c.save(); c.beginPath(); c.rect(x0, y0, w, h); c.clip();
    c.fillStyle = linear(c, 0, y0, 0, y1, [[0, P.sky0], [1, P.sky1]]); c.fillRect(x0, y0, w, h);
    if (P.night > 0.3 && wth !== 'rain' && wth !== 'storm') { c.fillStyle = `rgba(255,250,235,${(P.night - 0.3) * 1.2})`; for (let i = 0; i < 16; i++) c.fillRect(x0 + ((i * 53.7) % w), y0 + ((i * 31.3) % (h * 0.5)), 1.6, 1.6); c.beginPath(); c.arc(x0 + w * 0.7, y0 + 60, 14, 0, TAU); c.fill(); c.fillStyle = P.sky0; c.beginPath(); c.arc(x0 + w * 0.7 + 6, y0 + 56, 12, 0, TAU); c.fill(); }
    const cloudA = (1 - P.night) * (wth === 'clear' || wth === 'wind' ? 1 : 0.5);
    if (cloudA > 0.02) { c.fillStyle = rgba(mix(P.sky1, '#ffffff', 0.65), 0.9 * cloudA); for (const [cx0, cy, s] of CLOUDS) { const cx = x0 + ((cx0 * w + t * 4 * s) % (w + 120)) - 60; c.beginPath(); c.arc(cx, cy, 16 * s, Math.PI, TAU); c.arc(cx + 20 * s, cy - 8 * s, 20 * s, Math.PI, TAU); c.arc(cx + 42 * s, cy, 14 * s, Math.PI, TAU); c.closePath(); c.fill(); } }
    // city blocks
    for (const b of CITY) {
      const bx = b.x, by = y1 - b.h; c.fillStyle = b.tone ? P.city2 : P.city;
      c.beginPath(); c.moveTo(bx, y1); c.lineTo(bx, by); if (b.roof === 'tri') c.lineTo(bx + b.w / 2, by - b.w * 0.8); else if (b.roof === 'step') { c.lineTo(bx + b.w * 0.3, by); c.lineTo(bx + b.w * 0.3, by - 14); c.lineTo(bx + b.w * 0.7, by - 14); c.lineTo(bx + b.w * 0.7, by); } c.lineTo(bx + b.w, by); c.lineTo(bx + b.w, y1); c.closePath(); c.fill();
      if (wth === 'snow') { c.fillStyle = 'rgba(255,255,255,0.85)'; if (b.roof === 'tri') { poly(c, [bx + b.w * 0.2, by - b.w * 0.56, bx + b.w / 2, by - b.w * 0.8, bx + b.w * 0.8, by - b.w * 0.56]); c.fill(); } else c.fillRect(bx, by - 3, b.w, 4); }
      const la = 0.18 + 0.82 * P.night; c.fillStyle = rgba(P.cityLit, la);
      let n = 0; for (let yy = by + 10; yy < y1 - 6; yy += 13) for (let xx = bx + 4; xx < bx + b.w - 5; xx += 8) { const r = b.lit[n++ % 40]; if (r < 0.3 + 0.35 * P.night) c.fillRect(xx, yy, 4, 6); }
    }
    // pastel morning: blossom trees & drifting petals
    if (wx.morning > 0.05 && wth !== 'snow') {
      c.fillStyle = rgba('#f3b6c6', wx.morning); for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(x0 + 10 + i * 36, y1 - 18 - (i % 2) * 14, 28, 0, TAU); c.fill(); }
      c.fillStyle = rgba('#f7a8bc', 0.9 * wx.morning); for (const p of PETALS) { const px = x0 + ((p.x * w - t * 14 * p.s + Math.sin(t + p.ph) * 10) % w + w) % w, py = y0 + ((p.y * h + t * 22 * p.s) % h); ellipse(c, px, py, 3.2 * p.s, 1.8 * p.s, t + p.ph); c.fill(); }
    }
    // neon signs at night
    if (P.night > 0.1) {
      const a = P.night * (0.75 + 0.25 * Math.sin(t * 9) * (Math.sin(t * 0.7) > 0.9 ? 1 : 0));
      [[x0 + 36, y0 + 150, '#ff4fa8', '寿司'], [x0 + 128, y0 + 120, '#4fd2ff', '酒場'], [x0 + 88, y0 + 236, '#ff7a5a', '居酒屋']].forEach(([nx, ny, nc, txt]) => {
        const hh = txt.length * 22 + 14; c.strokeStyle = rgba(nc, a * 0.35); c.lineWidth = 7; c.strokeRect(nx - 13, ny, 26, hh); c.strokeStyle = rgba(nc, a); c.lineWidth = 2; c.strokeRect(nx - 13, ny, 26, hh);
        c.fillStyle = rgba(mix(nc, '#ffffff', 0.5), a); c.font = `700 16px "Hiragino Sans", "Noto Sans CJK JP", ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; [...txt].forEach((ch, j) => c.fillText(ch, nx, ny + 18 + j * 22));
      });
    }
    // weather
    if (wth === 'rain' || wth === 'storm') {
      c.strokeStyle = rgba(mix(P.sky1, '#ffffff', 0.6), 0.55); c.lineWidth = 1.2; c.beginPath();
      for (let i = 0; i < 44; i++) { const px = x0 + ((i * 47.3 + t * 70) % (w + 40)) - 20, py = y0 + ((i * 71.1 + t * 640) % (h + 30)) - 30; c.moveTo(px, py); c.lineTo(px - 6, py + 22); } c.stroke();
    } else if (wth === 'snow') {
      c.fillStyle = 'rgba(255,255,255,0.92)'; for (const f of FLAKES) { const px = x0 + ((f.x * w + Math.sin(t * 0.8 + f.ph) * 10 + t * 6) % w + w) % w, py = y0 + ((f.y * h + t * 26 * f.s) % h); c.beginPath(); c.arc(px, py, 1.4 + f.s * 1.6, 0, TAU); c.fill(); }
    } else if (wth === 'wind') {
      c.fillStyle = L('#c87a30'); for (let i = 0; i < 5; i++) { const px = x0 + ((t * 110 + i * 157) % (w + 40)) - 20, py = y0 + h * (0.25 + 0.12 * i) + Math.sin(t * 2 + i) * 14; ellipse(c, px, py, 4, 2, t * 4 + i); c.fill(); }
    }
    if (Amb.st.flash) { c.fillStyle = `rgba(230,235,255,${Amb.st.flash * 0.8})`; c.fillRect(x0, y0, w, h); }
    if (wth === 'rain' || wth === 'storm') { c.fillStyle = 'rgba(230,240,255,0.55)'; for (const d of DROPS) { const px = x0 + d.x * w, py = y0 + ((d.y * h + t * 9 * d.s) % h); ellipse(c, px, py, 1.6 * d.s, 2.2 * d.s); c.fill(); c.fillRect(px - 0.5, py - 9 * d.s, 1, 9 * d.s); } }
    c.restore();
    c.fillStyle = P.frame; c.fillRect(x0 - 10, y0 - 10, 10, h + 20); c.fillRect(x0 - 10, y0 - 10, w + 20, 10); c.fillRect(x0 - 16, y1, w + 30, 14);
    if (wth === 'snow') { c.fillStyle = 'rgba(255,255,255,0.9)'; c.beginPath(); c.moveTo(x0, y1); c.quadraticCurveTo(x0 + w * 0.3, y1 - 12, x0 + w * 0.6, y1 - 7); c.quadraticCurveTo(x0 + w * 0.85, y1 - 3, x1, y1 - 9); c.lineTo(x1, y1); c.closePath(); c.fill(); }
  }
  function drawLanterns(c, t, front) {
    for (const [lx0, ly, r, slot] of LANTERNS) {
      const sw = Math.sin(t * 0.6 + lx0) * 0.02 + (Amb.st.wind ? Math.sin(t * 2.1 + lx0) * 0.02 : 0);
      const lx = lx0 + Math.sin(sw) * ly;
      if (!front) { c.strokeStyle = P.cord; c.lineWidth = 2.5; c.beginPath(); c.moveTo(lx0, -40); c.lineTo(lx, ly - r - 6); c.stroke(); continue; }
      const col = P[slot];
      c.fillStyle = P.cord; c.fillRect(lx - r * 0.42, ly - r - 8, r * 0.84, 10); c.fillRect(lx - r * 0.36, ly + r - 3, r * 0.72, 9);
      ellipse(c, lx, ly, r, r * 0.92); c.fillStyle = col; c.fill();
      c.save(); c.clip();
      { const g = 0.25 + 0.55 * P.night; c.fillStyle = radial(c, lx - r * 0.1, ly + r * 0.1, r * 1.1, [[0, rgba(mix(col, '#fff6dc', 0.6), g)], [0.6, rgba(col, 0)], [1, rgba(shade(col, -0.3), 0.35)]]); c.fillRect(lx - r, ly - r, r * 2, r * 2); }
      c.fillStyle = 'rgba(0,0,0,0.13)'; c.fillRect(lx + r * 0.25, ly - r, r, r * 2);
      c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(lx - r, ly - r, r * 0.42, r * 2);
      c.strokeStyle = 'rgba(0,0,0,0.12)'; c.lineWidth = 1.5; for (let i = -3; i <= 3; i++) { c.beginPath(); c.ellipse(lx, ly + i * r * 0.24, r * Math.sqrt(1 - Math.pow(i * 0.24, 2)) * 1.0, r * 0.06, 0, 0, Math.PI); c.stroke(); }
      c.restore();
    }
  }
  function drawGlow(c, t) {
    const a = P.glowA; if (a < 0.01) return;
    c.save(); c.globalCompositeOperation = 'lighter';
    for (const [lx, ly, r] of LANTERNS) {
      const fl = 1 + Math.sin(t * 7 + lx) * 0.02 * P.night;
      c.fillStyle = radial(c, lx, ly, r * 2.6 * fl, [[0, rgba(P.glow, a)], [0.35, rgba(P.glow, a * 0.35)], [1, rgba(P.glow, 0)]]); c.fillRect(lx - r * 2.7, ly - r * 2.7, r * 5.4, r * 5.4);
      // pool of light on the counter / belt below
      const py = beltY(lx) - 6; c.fillStyle = radial(c, lx, py, r * 2.4, [[0, rgba(P.glow, a * 0.55 * (0.4 + P.night))], [1, rgba(P.glow, 0)]]); c.save(); c.translate(lx, py); c.scale(1, 0.32); c.translate(-lx, -py); c.fillRect(lx - r * 2.4, py - r * 2.4, r * 4.8, r * 4.8); c.restore();
    }
    c.restore();
  }
  function drawShafts(c, t) {
    const a = P.shaftA * (1 - P.night); if (a < 0.01) return;
    c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = rgba(P.shaft, a * 0.6);
    poly(c, [WIN.x0, 40, WIN.x0, 190, 760, 700, 600, 700]); c.fill();
    c.fillStyle = rgba(P.shaft, a * 0.4); poly(c, [WIN.x0, 230, WIN.x0, 330, 900, 700, 820, 700]); c.fill();
    c.fillStyle = rgba(P.shaft, a * 0.5); poly(c, [600, WALL_FLOOR + 4, 960, WALL_FLOOR + 4, 1020, 720 + extraB, 520, 720 + extraB]); c.fill();
    c.restore();
  }

  /* ---------- itamae bar, belt, plates, ledge props ---------- */
  function drawBar(c, t) {
    const y = 436;
    // neta case (glass) on the left of the bar, fish slabs inside
    c.fillStyle = P.barTop; c.fillRect(392, y, 496, 10); c.fillStyle = P.barFace; c.fillRect(392, y + 10, 496, 70);
    c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(392, y + 10, 496, 6);
    c.fillStyle = L('#f2763a'); c.fillRect(440, y - 12, 30, 12); c.fillStyle = L('#ffd9c0'); for (let i = 0; i < 3; i++) c.fillRect(444 + i * 9, y - 12, 3, 12);
    c.fillStyle = L('#c8283a'); c.fillRect(474, y - 11, 26, 11); c.fillStyle = L('#d8dee4'); c.fillRect(504, y - 9, 22, 9); c.fillStyle = L('#4a6a8a'); c.fillRect(504, y - 9, 22, 3);
    c.fillStyle = 'rgba(220,240,255,0.18)'; poly(c, [430, y, 534, y, 534, y - 30, 444, y - 30]); c.fill(); c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(444, y - 30); c.lineTo(534, y - 30); c.moveTo(430, y); c.lineTo(444, y - 30); c.stroke();
    // cutting board + fish block
    c.fillStyle = L('#e8cfa0'); c.fillRect(558, y - 6, 92, 6); c.fillStyle = L('#c8a878'); c.fillRect(558, y - 1, 92, 2);
    c.fillStyle = L('#f2763a'); c.fillRect(600, y - 16, 36, 10); c.fillStyle = L('#ffd9c0'); for (let i = 0; i < 4; i++) c.fillRect(603 + i * 9, y - 16, 3, 10);
    // hangiri (rice tub)
    c.fillStyle = L('#c08a4a'); poly(c, [672, y, 734, y, 728, y - 16, 678, y - 16]); c.fill(); c.fillStyle = L('#8a5a2a'); c.fillRect(676, y - 10, 56, 3);
    ellipse(c, 703, y - 16, 25, 5); c.fillStyle = L('#f6efe0'); c.fill();
    // stack of clean plates for the itamae
    for (let i = 0; i < 6; i++) { ellipse(c, 790, y - 3 - i * 3.6, 17, 4.4); c.fillStyle = L(i % 2 ? '#d4483a' : '#e0a62e'); c.fill(); }
    // tea urn
    c.fillStyle = L('#8a8a86'); roundRect(c, 840, y - 34, 26, 34, 5); c.fill(); c.fillStyle = 'rgba(0,0,0,0.2)'; c.fillRect(855, y - 34, 11, 34); c.fillStyle = L('#2a2a2a'); c.fillRect(849, y - 40, 8, 6);
  }
  function drawUnderCounter(c) {
    c.fillStyle = P.cab; c.beginPath(); c.moveTo(398, faceB(398) - 4); for (let x = 398; x <= 884; x += 24) c.lineTo(x, faceB(x) - 4); c.lineTo(884, FLOOR + 4); c.lineTo(398, FLOOR + 4); c.closePath(); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(398, FLOOR - 10, 486, 14);
    // curved plinth at the left belt end (ref)
    c.fillStyle = P.cab; c.beginPath(); c.moveTo(BELT_X0 + 10, faceB(60) - 4); c.lineTo(60, faceB(60) - 4); c.quadraticCurveTo(46, FLOOR, 90, FLOOR + 4); c.lineTo(BELT_X0 - 20, FLOOR + 4); c.closePath(); c.fill();
  }
  function drawLedges(c) {
    for (const pts of ledgePaths) {
      c.fillStyle = P.barTop; c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y - 15 * beltS(x)) : c.moveTo(x, y - 15 * beltS(x)))); for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] + 1); c.closePath(); c.fill();
      c.fillStyle = 'rgba(0,0,0,0.14)'; c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y - 4) : c.moveTo(x, y - 4))); for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] + 1); c.closePath(); c.fill();
    }
  }
  function drawBelt(c, t, off) {
    const { top, near, face } = beltPath, x0 = BELT_X0, ym = beltY(x0 + 30);
    // top surface with a rounded left end
    c.fillStyle = P.steel; c.beginPath(); c.moveTo(top[0][0], top[0][1]); for (const [x, y] of top) c.lineTo(x, y); for (let i = near.length - 1; i >= 0; i--) c.lineTo(near[i][0], near[i][1]);
    c.quadraticCurveTo(x0 - 4, near[0][1], x0, ym); c.quadraticCurveTo(x0 - 4, top[0][1], top[0][0], top[0][1]); c.closePath(); c.fill();
    // moving chain band (slats)
    c.fillStyle = P.chain; c.beginPath(); for (let i = 0; i < top.length; i++) { const x = top[i][0], s = beltS(x); c[i ? 'lineTo' : 'moveTo'](x, beltY(x) - 15 * s); } for (let i = top.length - 1; i >= 0; i--) { const x = top[i][0], s = beltS(x); c.lineTo(x, beltY(x) + 13 * s); } c.closePath(); c.fill();
    c.strokeStyle = rgba(P.steelDk, 0.55); c.lineWidth = 1.2; c.beginPath();
    for (let x = BELT_X0 + 40 + ((off % 18) + 18) % 18; x < 1300; x += 18) { const s = beltS(x), y = beltY(x); c.moveTo(x - 3 * s, y - 15 * s); c.lineTo(x + 3 * s, y + 13 * s); } c.stroke();
    // near lip highlight + face
    c.fillStyle = P.steelHi; c.beginPath(); near.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y - 5 * beltS(x))); for (let i = near.length - 1; i >= 0; i--) c.lineTo(near[i][0], near[i][1] + 1); c.lineTo(x0 + 4, ym + 6); c.closePath(); c.fill();
    c.fillStyle = P.steelDk; c.beginPath(); near.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y + 1)); for (let i = face.length - 1; i >= 0; i--) c.lineTo(face[i][0], face[i][1]); c.quadraticCurveTo(x0 - 6, face[0][1], x0, ym + 8); c.quadraticCurveTo(x0 + 2, near[0][1], near[0][0], near[0][1] + 1); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.1)'; c.beginPath(); near.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y + 4)); for (let i = near.length - 1; i >= 0; i--) c.lineTo(near[i][0], near[i][1] + 8 * beltS(near[i][0])); c.closePath(); c.fill();
    // wet neon reflections on the steel at night in the rain
    if ((SushiPal.weather === 'rain' || SushiPal.weather === 'storm') && P.night > 0.2) { c.save(); c.globalCompositeOperation = 'lighter'; [[1180, '#ff4fa8'], [1240, '#4fd2ff'], [1120, '#ff7a5a']].forEach(([x, nc], i) => { c.fillStyle = rgba(nc, 0.16 * P.night * (0.8 + 0.2 * Math.sin(t * 3 + i))); ellipse(c, x - i * 40, nearY(x) + 16, 34, 5); c.fill(); }); c.restore(); }
  }
  function plateAt(c, x, y, W, kind, colName, dome, left = 2, flag) {
    const top = GeoSushi.plate(c, x, y, W, GeoSushi.PLATES[colName] || colName, L);
    if (left > 0) { if (left >= 2) { GeoSushi.piece(c, kind, x - W * 0.19, top, W * 0.36, L); GeoSushi.piece(c, kind, x + W * 0.19, top + 1, W * 0.36, L); } else GeoSushi.piece(c, kind, x, top, W * 0.4, L); }
    if (dome) GeoSushi.dome(c, x, top + 1, W);
    if (flag) { c.strokeStyle = L('#3a2a1a'); c.lineWidth = 1.2; c.beginPath(); c.moveTo(x + W * 0.4, top); c.lineTo(x + W * 0.4, top - W * 0.62); c.stroke(); c.fillStyle = L('#d4483a'); poly(c, [x + W * 0.4, top - W * 0.62, x + W * 0.72, top - W * 0.52, x + W * 0.4, top - W * 0.42]); c.fill(); }
  }
  function drawCup(c, x, y, s, cup, t) {
    const w = 13 * s, h = 17 * s;
    c.fillStyle = L(cup.col); poly(c, [x - w / 2, y - h, x + w / 2, y - h, x + w * 0.42, y, x - w * 0.42, y]); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.18)'; poly(c, [x + w * 0.05, y - h, x + w / 2, y - h, x + w * 0.42, y, x + w * 0.05, y]); c.fill();
    c.fillStyle = L(cup.band); c.fillRect(x - w * 0.47, y - h * 0.62, w * 0.94, h * 0.16);
    if (cup.hot > 0 && cup.level > 0) { c.strokeStyle = `rgba(255,255,255,${0.2 * cup.hot})`; c.lineWidth = 1.3; for (let i = 0; i < 2; i++) { c.beginPath(); for (let k = 0; k < 4; k++) { const yy = y - h - 4 - k * 4, xx = x - 2 + i * 4 + Math.sin(t * 2 + k * 0.9 + i * 2) * 2.4; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); } }
  }
  function drawStack(c, x, y, s, stack) {
    stack.forEach((col, i) => { ellipse(c, x, y - i * 4.2 * s + 1.5 * s, 17 * s, 4.6 * s); c.fillStyle = L(shade(GeoSushi.PLATES[col], -0.35)); c.fill(); ellipse(c, x, y - i * 4.2 * s, 17 * s, 4.6 * s); c.fillStyle = L(GeoSushi.PLATES[col]); c.fill(); });
  }
  function drawSoy(c, x, y, s) {
    c.fillStyle = L('#2a1a14'); poly(c, [x - 5 * s, y, x + 5 * s, y, x + 4 * s, y - 14 * s, x + 2 * s, y - 18 * s, x - 2 * s, y - 18 * s, x - 4 * s, y - 14 * s]); c.fill();
    c.fillStyle = L('#d4483a'); c.fillRect(x - 2.5 * s, y - 22 * s, 5 * s, 4 * s); c.fillStyle = 'rgba(255,255,255,0.25)'; c.fillRect(x - 3.5 * s, y - 12 * s, 2 * s, 9 * s);
  }
  function drawStool(c, x, s, f) {
    const y = SEAT_Y + 6;
    c.strokeStyle = P.woodDk; c.lineWidth = 6 * s; c.lineCap = 'butt'; c.beginPath(); c.moveTo(x - 16 * s, y); c.lineTo(x - 22 * s, FLOOR); c.moveTo(x + 16 * s, y); c.lineTo(x + 22 * s, FLOOR); c.stroke();
    c.strokeStyle = P.wood; c.lineWidth = 7 * s; c.beginPath(); c.moveTo(x - 4 * s, y); c.lineTo(x - 2 * s, FLOOR + 2); c.stroke();
    c.fillStyle = P.wood; c.fillRect(x - 21 * s, y + 52 * s, 42 * s, 4 * s);
    ellipse(c, x, y + 4 * s, 26 * s, 6 * s); c.fillStyle = P.woodDk; c.fill(); ellipse(c, x, y, 26 * s, 6 * s); c.fillStyle = P.wood; c.fill();
  }

  /* ---------- customer types (identity: silhouette, colour, height, hair, clothing, props; personality: speed, posture, habits) ---------- */
  const B = (o) => Object.assign({ T: 240, hw: 70, headR: 31, torso: 'tri', pattern: 'split', top: 'navy', pants: 'dark', hair: 'dark', hairStyle: 'short', hairD: -0.05 }, o);
  const TYPES = {
    salaryman: { name: 'office worker (suit & tie)', body: B({ pattern: 'suit', top: 'navy', shirt: 'white', tie: 'coral', pants: 'navy' }), vary: { top: ['navy', 'grey', 'teal', 'brown', 'navy'], tie: ['coral', 'mustard', 'teal', 'plum'] }, speed: 1.35, chatty: 0.6, eat: [3, 6], tea: 1, phone: 1.1, call: 0.6, watch: 1.6, posture: 0.03, prop: 'briefcase', likes: ['maguro', 'salmon', 'saba', 'tamago'], words: ['うまい', 'よし', 'icon:clock'] },
    officeLady: { name: 'office worker (lanyard)', body: B({ T: 232, hw: 54, headR: 29, pattern: 'cardigan', top: 'teal', top2: 'cream', hairStyle: 'bob', skirt: 'navy', tights: 1, lanyard: 1 }), vary: { top: ['teal', 'plum', 'mustard', 'coral'], hairStyle: ['bob', 'long', 'pony'] }, speed: 1.2, chatty: 1.2, eat: [3, 5], tea: 1.2, phone: 1.3, call: 0.4, watch: 0.8, posture: 0, prop: 'bag', likes: ['salmon', 'ebi', 'ikura', 'engawa'], words: ['おいしい', 'icon:heart', 'かわいい'] },
    worker: { name: 'builder on lunch break', body: B({ T: 250, hw: 72, headR: 32, torso: 'round', pattern: 'hivis', top: 'olive', pants: 'brown', hat: 'band', hatCol: 'white', shortSleeve: 1 }), vary: { top: ['olive', 'mustard', 'teal'] }, speed: 1.05, chatty: 0.7, eat: [7, 12], tea: 1.6, phone: 0.3, posture: 0.06, eatStyle: 'hand', likes: ['maguro', 'saba', 'tako', 'inari', 'negitoro'], words: ['うまい!', 'もう一皿', 'icon:star'] },
    elder: { name: 'elderly regular (cane, glasses)', body: B({ T: 228, hw: 60, headR: 30, torso: 'round', pattern: 'cardigan', top: 'mustard', top2: 'cream', hair: 'hairGrey', hairD: 0.12, glasses: 1, pants: 'brown' }), vary: { top: ['mustard', 'olive', 'brown'] }, speed: 0.6, chatty: 0.9, eat: [3, 5], tea: 2.4, posture: 0.15, prop: 'cane', regular: 1, likes: ['saba', 'tako', 'engawa', 'tamago'], words: ['いつもの', 'うむ', 'icon:tea'] },
    grandma: { name: 'grandma (bun, kimono jacket)', body: B({ T: 222, hw: 58, headR: 29, torso: 'round', pattern: 'kimono', top: 'plum', top2: 'cream', top3: 'mustard', hair: 'hairGrey', hairStyle: 'bun', skirt: 'plum' }), vary: { top: ['plum', 'teal', 'navy'] }, speed: 0.65, chatty: 1.0, eat: [2, 4], tea: 2.2, posture: 0.12, prop: 'bag', likes: ['tamago', 'inari', 'ebi'], words: ['あら', 'おいしいね', 'icon:heart'] },
    mum: { name: 'mum', body: B({ T: 232, hw: 56, headR: 29, pattern: 'patch', top: 'coral', top2: 'white', top3: 'navy', hairStyle: 'bun', pants: 'navy' }), vary: { top: ['coral', 'teal', 'mustard'], top3: ['navy', 'plum'] }, speed: 1.0, chatty: 1.0, eat: [3, 5], tea: 1, phone: 0.5, prop: 'bag', likes: ['salmon', 'tamago', 'ebi'], words: ['おいしい?', 'icon:heart', 'よしよし'] },
    toddler: { name: 'toddler', body: B({ T: 150, hw: 42, headR: 27, torso: 'round', pattern: 'stripe', top: 'teal', top2: 'cream', pants: 'navy', hairD: 0.06, arm: 0.95, leg: 0.8 }), vary: { top: ['teal', 'mustard', 'coral'], hairStyle: ['short', 'pony'] }, kid: 1, speed: 1.5, chatty: 1.5, eat: [1, 3], tea: 0.3, posture: -0.02, eatStyle: 'hand', likes: ['tamago', 'inari', 'kappa', 'ebi'], words: ['わーい!', 'icon:star', 'もっと!'] },
    tourist: { name: 'tourist (bucket hat, backpack, camera)', body: B({ pattern: 'stripe', top: 'teal', top2: 'cream', hat: 'bucket', hatCol: 'mustard', backpack: 1, packCol: 'coral', camera: 1, pants: 'olive', shortSleeve: 1 }), vary: { top: ['teal', 'coral', 'mustard', 'cream'], hatCol: ['mustard', 'cream', 'olive'], hairStyle: ['short', 'pony', 'bob'] }, speed: 1.0, chatty: 1.1, eat: [4, 7], tea: 0.8, photo: 1.6, ask: 1.4, tone: [-0.3, 0.45], likes: ['salmon', 'maguro', 'ikura', 'uni', 'ebi'], words: ['Wow!', 'Yum!', 'Arigato!', 'icon:cam'] },
    student: { name: 'student (hoodie, cap)', body: B({ T: 236, hw: 56, headR: 30, pattern: 'hoodie', hood: 1, top: 'mustard', backpack: 1, packCol: 'navy', pants: 'navy', hat: 'cap', hatCol: 'coral' }), vary: { top: ['mustard', 'coral', 'teal', 'plum'], hat: ['cap', null, null, 'beanie'], hairStyle: ['short', 'pony', 'bob'], packCol: ['navy', 'olive', 'coral'] }, speed: 1.3, chatty: 1.4, eat: [5, 9], tea: 0.7, phone: 1.8, posture: 0.07, likes: ['salmon', 'negitoro', 'ebi', 'ikura'], words: ['やば!', 'うま!', 'icon:note'] },
    dateA: { name: 'couple on a date', body: B({ pattern: 'split', top: 'navy', pants: 'dark' }), vary: { top: ['navy', 'teal', 'brown'] }, speed: 0.95, chatty: 1.7, eat: [3, 6], tea: 1, date: 1, likes: ['maguro', 'uni', 'engawa', 'hamachi'], words: ['icon:heart', 'おいしいね'] },
    dateB: { name: 'couple on a date', body: B({ T: 230, hw: 54, headR: 29, pattern: 'patch', top: 'coral', top2: 'cream', top3: 'plum', hairStyle: 'long', skirt: 'plum' }), vary: { top: ['coral', 'plum', 'mustard'], hairStyle: ['long', 'bun', 'bob'] }, speed: 0.95, chatty: 1.7, eat: [3, 5], tea: 1, date: 1, photo: 0.4, likes: ['salmon', 'ikura', 'ebi', 'tamago'], words: ['icon:heart', 'かわいい'] },
    foodie: { name: 'solo foodie (photographs everything)', body: B({ hw: 56, pattern: 'split', top: 'dark', glasses: 1, pants: 'dark', hairStyle: 'bob' }), vary: { top: ['dark', 'cream', 'olive'], hairStyle: ['bob', 'short'] }, speed: 0.9, chatty: 0.4, eat: [6, 9], tea: 1, photo: 3.4, ask: 1, posture: 0.06, likes: ['uni', 'ikura', 'engawa', 'hamachi', 'negitoro'], words: ['icon:star', 'うーん…', 'icon:cam'] },
    friend: { name: 'group of friends', body: B({ pattern: 'split', top: 'coral', pants: 'navy' }), vary: { top: ['coral', 'teal', 'mustard', 'plum', 'olive'], hairStyle: ['short', 'bob', 'pony', 'long'], hat: [null, null, 'beanie', 'cap'] }, speed: 1.1, chatty: 1.9, eat: [4, 8], tea: 1.2, phone: 0.5, likes: ['salmon', 'maguro', 'ebi', 'tamago', 'ikura'], words: ['ハハ', 'icon:note', '乾杯!'] },
    nightOwl: { name: 'after-work drinker (loosened tie)', body: B({ pattern: 'suit', top: 'grey', shirt: 'white', tie: 'plum', pants: 'dark', shortSleeve: 1 }), vary: { top: ['grey', 'navy', 'dark'] }, speed: 0.85, chatty: 1.6, eat: [3, 6], tea: 1.8, sake: 1, posture: 0.1, prop: 'briefcase', likes: ['saba', 'tako', 'engawa', 'maguro'], words: ['乾杯!', 'ふう', 'icon:note'] },
  };
  const PARTIES = [ // weights by period: morning, lunch, afternoon, evening, night
    { id: 'office', m: ['salaryman'], w: [0.3, 3, 1, 1.5, 0.8] }, { id: 'officeL', m: ['officeLady'], w: [0.3, 3, 1, 1, 0.4] },
    { id: 'officePair', m: ['salaryman', 'officeLady'], w: [0, 2.5, 0.5, 1, 0.4] }, { id: 'officeTrio', m: ['salaryman', 'officeLady', 'salaryman'], w: [0, 1.2, 0, 0.5, 0.2] },
    { id: 'worker', m: ['worker'], w: [0.5, 2.2, 1, 0.4, 0] }, { id: 'elder', m: ['elder'], w: [3, 1.2, 1.5, 0.5, 0] },
    { id: 'grandma', m: ['grandma', 'toddler'], w: [2, 0.4, 2, 0.4, 0] }, { id: 'mum', m: ['mum', 'toddler'], w: [1.5, 0.5, 3, 1, 0] },
    { id: 'tourists', m: ['tourist', 'tourist'], w: [2, 1.6, 3, 2, 1] }, { id: 'touristSolo', m: ['tourist'], w: [1, 0.5, 1.5, 1, 0.5] },
    { id: 'students', m: ['student', 'student'], w: [0.5, 0.4, 3, 2, 0.5] }, { id: 'studentTrio', m: ['student', 'student', 'student'], w: [0, 0, 1.5, 1.5, 0.3] },
    { id: 'date', m: ['dateA', 'dateB'], w: [0.3, 0.4, 1, 3, 2.5] }, { id: 'foodie', m: ['foodie'], w: [1, 1.3, 1, 1.2, 1.2] },
    { id: 'friends', m: ['friend', 'friend', 'friend'], w: [0, 0.3, 1, 3, 2] }, { id: 'drinkers', m: ['nightOwl', 'nightOwl'], w: [0, 0, 0, 1, 4] }, { id: 'owl', m: ['nightOwl'], w: [0, 0, 0, 0.5, 2] },
  ];
  const period = (h) => { h = ((h % 24) + 24) % 24; return h >= 6 && h < 11 ? 0 : h >= 11 && h < 14.5 ? 1 : h >= 14.5 && h < 17 ? 2 : h >= 17 && h < 21 ? 3 : 4; };
  const ARRIVE = [[6, 12], [1.5, 4.5], [4, 9], [3, 7], [5, 11]];
  const KIND_W = { salmon: 3, maguro: 2.5, tamago: 2, ikura: 1.5, ebi: 2, kappa: 1.5, saba: 1.2, inari: 1.2, uni: 0.6, tako: 1, hamachi: 1, tekka: 1, negitoro: 1, engawa: 0.8 };
  const wpick = (obj) => { let s = 0; for (const k in obj) s += obj[k]; let r = Math.random() * s; for (const k in obj) { r -= obj[k]; if (r <= 0) return k; } return Object.keys(obj)[0]; };
  const COOL = { chat: 7, stranger: 40, point: 9, soy: 22, askChef: 40, wave: 8, photo: 3, phone: 12, call: 45, watch: 14, clink: 22, feed: 12, tend: 7, stretch: 35, chin: 12, cheer: 6, glance: 2 };
  const SOFT = new Set(['idle', 'glance', 'chin', 'phone', 'watch', 'stretch']);

  let actors = [], parties = [], plates = [], effects = [], convos = [], delivers = [], soys = [], uid = 1, nextArrive = 3, chef = null, waitress = null, beltOff = 0;
  const seatOf = (a) => SEATS[a.seat];
  const seatSc = (s) => beltS(s.x) * 0.98;
  const standHip = (a) => AISLE_FLOOR - 0.6 * a.def.T * (a.def.leg || 1) * a.sc;
  const say = (a, c, d = 1.6) => { if (a) a.bub = { c, t: 0, d: d * rand(0.9, 1.2) }; };
  const dd = (lo, hi, a) => rand(lo, hi) / (a.speed * (1 + (a.rush || 0) * 0.25));
  const ph = (d, f, o = {}) => Object.assign({ d, f }, o);
  function newHand() { return { x: 0, y: 0, vx: 0, vy: 0 }; }
  function mkActor(typeId) {
    const T0 = TYPES[typeId], def = Object.assign({}, T0.body);
    for (const kk in (T0.vary || {})) { const v = pick(T0.vary[kk]); if (v === null) delete def[kk]; else def[kk] = v; }
    def.hw *= 1.14;
    if (def.hairStyle === 'long' || def.hairStyle === 'bob') def.hairD = (def.hairD ?? -0.05) - 0.06;
    const a = { id: uid++, type: typeId, T: T0, def, f: 1, hx: 0, hy: 0, sc: 1, lean: 0, leanT: 0, lx: 1, lxT: 1, tilt: 0, tiltT: 0, bob: 0, shake: 0, headDy: 0,
      hN: newHand(), hF: newHand(), fN: { x: 0, y: 0 }, fF: { x: 0, y: 0 }, tgN: [0, 0], tgF: [0, 0], hold: { N: null, F: null }, farFront: false,
      act: null, hist: [], cool: {}, bub: null, t: rand(10), state: 'walk', alpha: 1, layer: 'aisle', walkPh: rand(6),
      speed: T0.speed * rand(0.85, 1.15), chatty: T0.chatty * rand(0.7, 1.3), want: randi(T0.eat[0], T0.eat[1]), eaten: 0, plate: null, rush: 0, nextPlateAt: 0,
      tone: T0.tone ? rand(T0.tone[0], T0.tone[1]) : rand(-0.06, 0.12), arrivedAt: simT };
    if (SushiPal.weather === 'snow' && Math.random() < 0.75) a.scarf = pick(['coral', 'mustard', 'teal', 'cream', 'plum']);
    if ((SushiPal.weather === 'rain' || SushiPal.weather === 'storm') && !T0.kid && Math.random() < 0.8) a.umbrella = pick(['navy', 'coral', 'mustard', 'teal', 'cream']);
    return a;
  }
  const sideSeats = (side) => SEATS.filter((s) => s.side === side);
  function freeRun(n) { // contiguous free seats on one side; packs people (prefers runs next to a wall or a neighbour) to keep room for groups
    let best = null, bs = -1;
    for (const side of [0, 1]) { const ss = sideSeats(side); for (let i = 0; i + n <= 3; i++) { const run = ss.slice(i, i + n); if (!run.every((s) => !s.occ && simT >= s.freeAt)) continue;
      const l = ss[i - 1], r = ss[i + n]; const sc = (!l || l.occ ? 1 : 0) + (!r || r.occ ? 1 : 0) + Math.random() * 0.8; if (sc > bs) { bs = sc; best = run; } } }
    return best;
  }
  let pending = null, pendingUntil = 0;
  const wpickParty = (list, per) => { let s = list.reduce((t, p) => t + p.w[per], 0), r = Math.random() * s; for (const p of list) { r -= p.w[per]; if (r <= 0) return p; } return list[0]; };
  function spawnParty(seed) {
    const per = period(P.hour), cand = PARTIES.filter((p) => p.w[per] > 0 && freeRun(p.m.length));
    let pt;
    if (seed) { if (!cand.length) return false; pt = wpickParty(cand, per); }
    else { // the next group in the door is chosen by time of day; a big group waits a little for seats to free up
      if (!pending || pending.w[per] <= 0) { pending = wpickParty(PARTIES.filter((p) => p.w[per] > 0), per); pendingUntil = simT + rand(45, 90); }
      if (freeRun(pending.m.length)) pt = pending; else if (simT > pendingUntil && cand.length) pt = wpickParty(cand, per); else return false;
      pending = null;
    }
    const run = freeRun(pt.m.length); if (!run) return false;
    const party = { pid: uid++, type: pt.id, members: [], state: 'arrive', seats: run.map((s) => s.i), side: run[0].side, t0: simT, maxStay: rand(110, 170) * (per === 1 ? 0.7 : 1) };
    const order = run[0].side === 0 ? [...run].reverse() : run; // the one going furthest walks first
    order.forEach((st, j) => {
      const a = mkActor(pt.m[run.indexOf(st)]); a.party = party; a.seat = st.i; st.occ = a; a.f = st.f;
      st.cup = { col: pick(['#efe6d6', '#cfd8c0', '#e8d0b0', '#c8d4dc']), band: pick(['#2a4a6a', '#6a2a2a', '#3a5a3a', '#2a2a2a']), level: 1, hot: 1, held: null };
      if (a.T.sake) st.cup = { col: '#f4efe4', band: '#2a4a8a', level: 1, hot: 0, held: null, sake: 1 };
      party.members.push(a); actors.push(a);
      if (seed) { placeSeated(a); a.eaten = randi(0, Math.max(0, a.want - 1)); for (let q = 0; q < a.eaten; q++) st.stack.push(GeoSushi.PLATE_OF[wpick(KIND_W)]); if (Math.random() < 0.5) { const kd = wpick(KIND_W); a.plate = { kind: kd, col: GeoSushi.PLATE_OF[kd], left: randi(1, 2) }; } a.arrivedAt = simT - rand(10, 80); }
      else { const sc = seatSc(st) * 0.94; a.sc = sc; a.hx = st.side === 0 ? EXIT[0] - j * 46 : EXIT[1]; a.hy = standHip(a); a.walkTo = st.x; a.state = 'walk'; a.layer = 'aisle'; a.alpha = st.side === 1 ? 0 : 1; a.delay = j * 0.6; a.lx = a.lxT = Math.sign(st.x - a.hx); a.f = a.lx; initHands(a); }
    });
    party.state = seed ? 'eat' : 'arrive'; parties.push(party);
    if (!seed) { const g = waitress && !waitress.task && Math.random() < 0.6 ? waitress : chef; say(g, pick(['いらっしゃいませ!', 'いらっしゃい!']), 1.8); if (run[0].side === 1) doorWave = 1; }
    return true;
  }
  function initHands(a) { rigPose(a); const R = F.rig(a); a.hN.x = a.tgN[0]; a.hN.y = a.tgN[1]; a.hF.x = a.tgF[0]; a.hF.y = a.tgF[1]; }
  function placeSeated(a) { const st = seatOf(a); a.sc = seatSc(st); a.f = st.f; a.hx = st.x; a.hy = SEAT_Y - (a.T.kid ? 26 : 0); a.state = 'seated'; a.layer = 'seat'; a.lx = a.lxT = a.f * 0.85; a.lean = a.T.posture || 0; F.rig(a); rigPose(a); a.hN.x = a.tgN[0]; a.hN.y = a.tgN[1]; a.hF.x = a.tgF[0]; a.hF.y = a.tgF[1]; }
  /* ledge spots (relative to the seat, in torso units) */
  const PT = {
    plate: (a) => [a.hx + a.f * a.R.T * 0.12, itemY(a.hx)], cup: (a) => [a.hx - a.f * a.R.T * 0.02, itemY(a.hx)], stack: (a) => [a.hx - a.f * a.R.T * 0.15, itemY(a.hx)],
    bell: (a) => [a.hx + a.f * a.R.T * 0.02, itemY(a.hx) - 2],
    mouth: (a) => [a.R.cx + (a.lx >= 0 ? 1 : -1) * a.R.R * 0.78, a.R.cy + a.R.R * 0.42], chest: (a) => [a.hx + a.f * a.R.T * 0.16, a.R.ay + a.R.T * 0.3],
  };
  /* base pose each frame; actions then override targets */
  function rigPose(a) {
    const R = a.R || F.rig(a), T = R.T, f = a.f;
    if (a.state === 'seated' || a.state === 'sit' || a.state === 'stand') {
      a.leanT = a.T.posture || 0; a.tiltT = 0.04; if (!a.look) a.lxT = f * 0.85;
      const ly = farY(a.hx) - 10;
      a.tgN = [a.hx + f * T * 0.2, ly]; a.tgF = [a.hx + f * T * 0.07, ly - 2];
      const kid = a.T.kid;
      if (kid) { const sw = Math.sin(a.t * 4.2 * a.speed) * T * 0.08; a.fN = { x: a.hx + f * T * 0.28 + sw, y: a.hy + T * 0.45 }; a.fF = { x: a.hx + f * T * 0.22 - sw, y: a.hy + T * 0.44 }; }
      else { a.fN = { x: a.hx + f * T * 0.33, y: SEAT_Y + T * 0.27 }; a.fF = { x: a.hx + f * T * 0.2, y: SEAT_Y + T * 0.28 }; }
    } else { // standing / walking
      const st = a.walking ? Math.sin(a.walkPh) : 0, lift = a.walking ? 1 : 0;
      a.leanT = (a.walking ? 0.05 : 0) + (a.T.posture || 0) * 0.6; a.tiltT = 0;
      a.fN = { x: a.hx + st * T * 0.13, y: AISLE_FLOOR - Math.max(0, Math.cos(a.walkPh)) * T * 0.05 * lift };
      a.fF = { x: a.hx - st * T * 0.13, y: AISLE_FLOOR - Math.max(0, -Math.cos(a.walkPh)) * T * 0.05 * lift };
      a.tgN = [a.hx + f * T * 0.04 + st * T * 0.12 * f * -1, a.hy - T * 0.08]; a.tgF = [a.hx - f * T * 0.02 + st * T * 0.12 * f, a.hy - T * 0.1];
      if (a.umbrella) a.tgN = [a.hx + f * T * 0.12, a.hy - T * 0.1];
      if (a.T.prop === 'cane') a.tgN = [a.hx + f * T * 0.2, a.hy - T * 0.05];
    }
    if (a.look) { if (simT > a.look.until) a.look = null; else a.lxT = clamp((a.look.x() - a.hx) / 60, -1, 1); }
  }
  function spring(h, tx, ty, w, dt) {
    const n = Math.ceil(dt * w / 0.4); const st = dt / n;
    for (let i = 0; i < n; i++) { const ax = w * w * (tx - h.x) - 2 * w * h.vx, ay = w * w * (ty - h.y) - 2 * w * h.vy; h.vx += ax * st; h.vy += ay * st; h.x += h.vx * st; h.y += h.vy * st; }
  }
  const ease = (v, t, r, dt) => v + (t - v) * (1 - Math.exp(-r * dt));
  function start(a, name, phases, o = {}) { if (a.act) abort(a); a.act = Object.assign({ name, phases, i: 0, t: 0 }, o); a.hist.unshift(name); if (a.hist.length > 5) a.hist.length = 5; a.cool[name] = simT; return true; }
  function runAct(a, dt) {
    const A = a.act; if (!A) return; const p = A.phases[A.i]; if (!p) { endAct(a); return; }
    if (!p._in) { p._in = true; if (p.enter) p.enter(a, A); }
    A.t += dt; const u = p.d ? Math.min(1, A.t / p.d) : 0;
    if (p.f) p.f(a, u, A.t, A);
    const done = p.until ? (p.until(a, A.t, A) || A.t > (p.max || 12)) : A.t >= p.d;
    if (done && a.act === A) { if (p.exit) p.exit(a, A); A.i++; A.t = 0; if (A.i >= A.phases.length) endAct(a); }
  }
  function endAct(a) { const A = a.act; a.act = null; a.shake = 0; a.headDy = 0; a.cupTilt = 0; a.farFront = false; if (A && A.onEnd) A.onEnd(a); }
  function abort(a) { const A = a.act; if (!A) return; a.act = null; if (A.onAbort) A.onAbort(a); a.shake = 0; a.headDy = 0; a.cupTilt = 0; a.farFront = false; a.bob = 0;
    if (a.hold.N && a.hold.N.cup) { a.hold.N.cup.held = null; } if (a.hold.N && a.hold.N.soy) { a.hold.N.soy.held = null; }
    if (a.hold.N && a.hold.N.plate && a.seat != null && a.state === 'seated') { const q = a.hold.N.plate; if (q.left > 0 && !a.plate) a.plate = { kind: q.kind, col: q.col, left: q.left, special: q.special }; else seatOf(a).stack.push(q.col); }
    if (a.kind !== 'staff') a.hold.N = null; a.hold.F = null; }
  const canJoin = (b) => b && b.state === 'seated' && (!b.act || SOFT.has(b.act.name)) && !(b.hold.N && (b.hold.N.plate || b.hold.N.cup || b.hold.N.piece));
  function neighbors(a) { const s = seatOf(a), out = []; for (const d of [-1, 1]) { const n = SEATS[s.i + d]; if (n && n.side === s.side && n.occ && n.occ.state === 'seated') out.push(n.occ); } return out; }

  /* ---------- diner actions ---------- */
  const reachX = (a) => a.hx + a.f * a.R.T * 0.06;
  function choosePlate(a) {
    let best = null, bs = 0;
    for (const p of plates) {
      if (!p.vis || (p.resv && p.resv !== a) || (p.special && p.special !== a)) continue;
      const d = reachX(a) - p.x; if (d < 20 || d > 300) continue; // upstream only (belt runs left -> right)
      if (p.special === a) return p;
      const s = (a.T.likes.includes(p.kind) ? 2.2 : 1) * (0.4 + Math.random()) * (p.dome ? 1.2 : 1);
      if (s > bs) { bs = s; best = p; }
    }
    return best && bs > 0.9 ? best : null;
  }
  function actTake(a, p) {
    if (!p || !p.on) return false; p.resv = a;
    const rival = Math.random() < 0.22 ? neighbors(a).find((b) => canJoin(b) && !b.plate && b.eaten < b.want) : null;
    start(a, 'take', [
      ph(0, (a) => { if (p.vis) { a.lxT = clamp((p.x - a.hx) / 50, -1, 1); a.tiltT = 0.16; } }, { until: (a) => !p.on || (p.vis && Math.abs(p.x - reachX(a)) < 30), max: 16 }),
      ph(0.5, (a) => { if (!p.on) return; a.tgN = [p.x, p.y - 6]; a.lxT = a.f * 0.5; a.tiltT = 0.3; a.leanT += 0.1; }, {
        enter: (a) => { if (rival && canJoin(rival)) actRival(rival, a, p); },
        until: (a, t) => !p.on || (t > 0.18 && Math.hypot(a.hN.x - p.x, a.hN.y - p.y + 6) < 12), max: 1.4,
        exit: (a) => { if (p.on && Math.abs(p.x - reachX(a)) < 70) { takeFromBelt(p); a.hold.N = { plate: p }; } } }),
      ph(0.55 / a.speed, (a) => { const [x, y] = PT.plate(a); a.tgN = [x, y - 8]; }, { exit: (a) => { const q = a.hold.N && a.hold.N.plate; if (q) { a.plate = { kind: q.kind, col: q.col, left: 2, special: q.special }; a.hold.N = null; gotPlate(a, q); } } }),
    ], { onAbort: (a) => { if (p.resv === a) p.resv = null; }, onEnd: (a) => { if (p.resv === a) p.resv = null; a.nextPlateAt = simT + dd(1, 4, a); } });
    return true;
  }
  function actRival(b, a, p) { // both go for the same plate - b yields
    start(b, 'rival', [
      ph(0.45, (b) => { if (p.on) b.tgN = [p.x - b.f * 10, p.y - 8]; b.lxT = b.f * 0.4; b.leanT += 0.08; }),
      ph(0.25, (b) => { b.lxT = Math.sign(a.hx - b.hx); }, { exit: (b) => { say(b, pick(['どうぞ', 'あ、どうぞ']), 1.4); say(a, pick(['すみません', 'ありがとう']), 1.4); a.look = { x: () => b.hx, until: simT + 1.2 }; } }),
      ph(0.9, (b) => { b.lxT = Math.sign(a.hx - b.hx); b.tiltT = 0.2; }),
    ]);
  }
  function gotPlate(a, q) {
    if (q.special) { say(a, 'icon:note', 1.4); a.awaiting = null; }
    else if (Math.random() < 0.25) say(a, pick(a.T.words.concat(['sushi:' + q.kind])), 1.4);
    if (a.T.photo && Math.random() < 0.25 * a.T.photo) a.queue = () => actPhoto(a);
  }
  function actEat(a) {
    const pl = a.plate, hand = a.T.eatStyle === 'hand', kind = pl.kind;
    const steps = [
      ph(dd(0.35, 0.6, a), (a) => { const [x, y] = PT.plate(a); a.tgN = [x + rand(-3, 3), y - 8]; a.tiltT = 0.24; a.lxT = a.f * 0.75; }, { exit: (a) => { if (a.plate) { a.hold.N = { piece: kind, chop: !hand }; a.plate.left--; } } }),
    ];
    if (!hand && Math.random() < 0.5 && kind !== 'tamago') steps.push(ph(dd(0.25, 0.4, a), (a) => { const [x, y] = PT.plate(a); a.tgN = [x - a.f * 16, y - 3]; a.tiltT = 0.28; }));
    steps.push(ph(dd(0.3, 0.5, a), (a) => { const [x, y] = PT.mouth(a); a.tgN = [x, y]; a.tiltT = -0.04; a.leanT += 0.06; }, { exit: (a) => { a.hold.N = hand ? null : { chop: true }; } }));
    steps.push(ph(dd(1.0, 2.4, a), (a, u, t) => { const [x, y] = PT.chest(a); a.tgN = [x, y + 10]; a.headDy = -Math.abs(Math.sin(t * 9)) * 1.8; a.tiltT = 0.06; }, { exit: (a) => { a.headDy = 0; a.hold.N = null; if (Math.random() < 0.3) say(a, Math.random() < 0.55 ? pick(['おいしい', 'うまい!', 'icon:heart', 'icon:star']) : pick(a.T.words), 1.3); } }));
    return start(a, 'eat', steps, { onEnd: (a) => { if (a.plate && a.plate.left <= 0) a.queue = () => actStack(a); } });
  }
  function actStack(a) {
    const pl = a.plate; if (!pl) return false;
    return start(a, 'stack', [
      ph(dd(0.3, 0.5, a), (a) => { const [x, y] = PT.plate(a); a.tgN = [x, y - 6]; }, { exit: (a) => { a.hold.N = { plate: { kind: pl.kind, col: pl.col, left: 0 } }; a.plate = null; } }),
      ph(dd(0.45, 0.7, a), (a) => { const [x, y] = PT.stack(a); a.tgN = [x, y - 8 - seatOf(a).stack.length * 4.2 * a.sc]; a.lxT = -a.f * 0.2; a.tiltT = 0.25; }, { exit: (a) => { if (a.hold.N && a.hold.N.plate) { seatOf(a).stack.push(pl.col); a.hold.N = null; a.eaten++; a.nextPlateAt = simT + dd(1.5, 6, a); } } }),
    ]);
  }
  function actSip(a) {
    const cup = seatOf(a).cup; if (!cup || cup.held) return false;
    return start(a, 'sip', [
      ph(dd(0.3, 0.5, a), (a) => { const [x, y] = PT.cup(a); a.tgN = [x, y - 9]; a.tiltT = 0.15; }, { exit: (a) => { cup.held = a; a.hold.N = { cup }; } }),
      ph(dd(0.35, 0.5, a), (a) => { const [x, y] = PT.mouth(a); a.tgN = [x, y + 4]; }),
      ph(dd(0.7, 1.6, a), (a) => { const [x, y] = PT.mouth(a); a.tgN = [x, y]; a.tiltT = -0.3; a.cupTilt = cup.sake ? 0.9 : 0.6; }, { exit: (a) => { cup.level = Math.max(0, cup.level - rand(0.2, 0.4)); a.cupTilt = 0; if (Math.random() < 0.15) say(a, cup.sake ? 'ふう' : 'icon:tea', 1.1); } }),
      ph(dd(0.35, 0.5, a), (a) => { const [x, y] = PT.cup(a); a.tgN = [x, y - 9]; }, { exit: (a) => { cup.held = null; a.hold.N = null; } }),
    ]);
  }
  /* conversations: a shared controller drives both people, bubbles alternate, gestures + nods */
  const TOPIC = {
    food: (a) => pick(['sushi:' + pick(a.T.likes), 'おいしい', 'うまい!', 'これ!', 'icon:heart', 'sushi:' + pick(GeoSushi.KINDS)]),
    fun: () => pick(['ハハ', 'ほんと?', 'へえ〜', 'すごい!', 'そうそう', 'icon:note', '!', 'icon:laugh']),
    weather: () => SushiPal.weather === 'snow' ? pick(['icon:snow', 'さむい!']) : SushiPal.weather === 'rain' || SushiPal.weather === 'storm' ? pick(['icon:rain', 'あめ…']) : pick(['icon:sun', 'いい天気']),
    work: () => pick(['icon:clock', 'icon:sweat', '疲れた', '会議…', 'icon:case']),
    love: () => pick(['icon:heart', 'icon:heart', 'かわいい', 'icon:note']),
    trip: () => pick(['icon:cam', 'Wow!', 'Yum!', 'これ何?', 'icon:q']),
  };
  function topicsFor(a, b, stranger) {
    if (stranger) return ['weather', 'food', 'trip', 'fun'];
    if (a.T.date && b.T.date) return ['love', 'food', 'fun', 'love'];
    if (a.type === 'tourist' || b.type === 'tourist') return ['trip', 'food', 'fun'];
    if (/salaryman|officeLady|nightOwl/.test(a.type)) return ['work', 'food', 'fun', 'work'];
    return ['food', 'fun', 'weather', 'fun'];
  }
  function actChat(a, b, stranger) {
    if (!canJoin(b)) return false;
    const ts = topicsFor(a, b, stranger), cv = { a, b, sp: null, n: 0, t: 0, next: 0.25, turns: randi(3, 6) - (stranger ? 1 : 0), stranger, laugh: Math.random() < 0.3 + 0.2 * (a.chatty + b.chatty) / 2, topic: pick(ts), ts, done: false };
    const talk = () => ph(0, (x, u, t) => {
      const o = x === cv.a ? cv.b : cv.a; x.lxT = Math.sign(o.hx - x.hx); x.leanT += 0.05;
      if (cv.sp === x) { const [cx, cy] = PT.chest(x); x.tgN = [cx + Math.sin(t * 5.3) * 7 * x.sc, cy - 14 * x.sc + Math.cos(t * 4.1) * 7 * x.sc]; x.headDy = Math.sin(t * 8) * 0.9; }
      else x.tiltT = 0.06 + Math.max(0, Math.sin(t * 3.2)) * 0.14;
    }, { until: () => cv.done, max: 30 });
    start(a, 'chat', [talk()], { onAbort: () => { cv.done = true; } }); start(b, 'chat', [talk()], { onAbort: () => { cv.done = true; } });
    convos.push(cv); return true;
  }
  function stepConvos(dt) {
    for (const cv of convos) {
      if (cv.done) continue; cv.t += dt;
      if (!cv.a.act || cv.a.act.name !== 'chat' || !cv.b.act || cv.b.act.name !== 'chat') { cv.done = true; continue; }
      if (cv.t >= cv.next) {
        if (cv.n >= cv.turns) { cv.done = true; if (cv.laugh) { actLaugh(cv.a); if (Math.random() < 0.8) actLaugh(cv.b, 0.15); } continue; }
        cv.sp = cv.n % 2 === 0 ? cv.a : cv.b;
        let line = TOPIC[cv.topic](cv.sp);
        if (cv.stranger && cv.n === 0) line = pick(['すみません', 'icon:q', 'あの…']); else if (cv.stranger && cv.n === 1) line = pick(['!', 'はい?', 'icon:ex']);
        if (Math.random() < 0.25) cv.topic = pick(cv.ts);
        say(cv.sp, line, 1.5); cv.n++; cv.next = cv.t + rand(1.3, 2.3);
      }
    }
    convos = convos.filter((c) => !c.done);
  }
  function actLaugh(a, delay = 0) {
    const hand = Math.random() < 0.5, d = dd(0.9, 1.9, a);
    start(a, 'laugh', [ph(delay, null), ph(d, (a, u, t) => { a.shake = Math.sin(t * 27) * 0.024 * (1 - u * 0.6); a.tiltT = -0.22; a.bob = -Math.abs(Math.sin(t * 13.5)) * 1.4; if (hand) { const [x, y] = PT.mouth(a); a.tgN = [x, y + 5]; } })], { onEnd: (a) => { a.bob = 0; } });
    if (Math.random() < 0.65) say(a, pick(['ハハ', 'ハハハ', 'icon:laugh', '笑']), 1.2);
  }
  function upcoming(a, range) { return plates.filter((p) => p.vis && p.x < reachX(a) - 40 && p.x > reachX(a) - range && !p.resv).sort((p, q) => q.x - p.x)[0]; }
  function actPoint(a, b) {
    const p = upcoming(a, 300); if (!p) return false;
    start(a, 'point', [ph(dd(1.3, 2, a), (a) => { const [sx, sy] = a.R.sN, dx = p.x - sx, dy = p.y - 10 - sy, d = Math.hypot(dx, dy) || 1, r = a.R.T * 0.62; a.tgN = [sx + dx / d * r, sy + dy / d * r]; a.lxT = clamp(dx / 40, -1, 1); a.tiltT = 0.1; })]);
    say(a, Math.random() < 0.5 ? 'あれ!' : 'sushi:' + p.kind, 1.5);
    if (b) { b.look = { x: () => p.x, until: simT + 1.8 }; if (Math.random() < 0.5 && !b.plate && b.eaten < b.want && canJoin(b)) setTimeoutSim(0.9, () => { if (canJoin(b) && p.on && !p.resv) actTake(b, p); }); }
    return true;
  }
  let timers = []; const setTimeoutSim = (d, fn) => timers.push({ t: simT + d, fn });
  function soyFor(a) { return soys.find((s) => s.side === seatOf(a).side); }
  const soyReach = (a, s) => Math.abs(s.x - a.hx) < 70;
  function actSoySelf(a, s) {
    return start(a, 'soy', [
      ph(0.45, (a) => { a.tgN = [s.x, itemY(s.x) - 16]; a.lxT = a.f * 0.5; }, { exit: (a) => { s.held = a; a.hold.N = { soy: s }; } }),
      ph(dd(0.9, 1.4, a), (a, u) => { const [x, y] = PT.plate(a); a.tgN = [x, y - 26]; a.soyTilt = Math.sin(u * Math.PI) * 1.4; a.tiltT = 0.3; }),
      ph(0.45, (a) => { a.tgN = [s.x, itemY(s.x) - 16]; a.soyTilt = 0; }, { exit: (a) => { s.held = null; a.hold.N = null; } }),
    ], { onAbort: (a) => { s.held = null; a.soyTilt = 0; } });
  }
  function actPassSoy(a, b, s) { // a asks neighbour b who can reach the soy bottle
    if (!canJoin(b)) return false;
    say(a, Math.random() < 0.5 ? 'icon:soy' : 'しょうゆ?', 1.4);
    const mid = () => [(a.hx + b.hx) / 2, farY((a.hx + b.hx) / 2) - 34];
    start(b, 'give', [
      ph(0.6, (b) => { b.lxT = Math.sign(a.hx - b.hx); }),
      ph(0.45, (b) => { b.tgN = [s.x, itemY(s.x) - 16]; }, { exit: (b) => { s.held = b; b.hold.N = { soy: s }; say(b, 'どうぞ', 1.2); } }),
      ph(0, (b) => { b.tgN = mid(); b.lxT = Math.sign(a.hx - b.hx); }, { until: () => s.held === a, max: 3 }),
      ph(0.4, (b) => { b.lxT = Math.sign(a.hx - b.hx); }),
    ], { onAbort: () => { if (s.held === b) s.held = null; } });
    start(a, 'getSoy', [
      ph(0, (a) => { a.lxT = Math.sign(b.hx - a.hx); }, { until: () => s.held === b && Math.hypot(b.hN.x - mid()[0], b.hN.y - mid()[1]) < 14, max: 4 }),
      ph(0.35, (a) => { a.tgN = mid(); }, { exit: (a) => { if (s.held === b) { b.hold.N = null; s.held = a; a.hold.N = { soy: s }; say(a, 'ありがとう', 1.3); } } }),
      ph(0.5, (a) => { a.tgN = [a.hx + a.f * 54, itemY(a.hx) - 16]; }, { exit: (a) => { if (s.held === a) { s.held = null; a.hold.N = null; s.x = a.hx + a.f * 54; } } }),
    ], { onAbort: () => { if (s.held === a) s.held = null; } });
    return true;
  }
  function actClink(a, b) {
    const ca = seatOf(a).cup, cb = seatOf(b).cup; if (!ca || !cb || ca.held || cb.held || !canJoin(b)) return false;
    const meet = () => [(a.hx + b.hx) / 2, Math.min(a.R.cy, b.R.cy) + a.R.T * 0.4];
    const mk = (x, o, cup, first) => [
      ph(0.42, (x) => { const [cx, cy] = PT.cup(x); x.tgN = [cx, cy - 9]; x.lxT = Math.sign(o.hx - x.hx); }, { exit: (x) => { cup.held = x; x.hold.N = { cup }; } }),
      ph(0.6, (x) => { const [mx, my] = meet(), s = Math.sign(o.hx - x.hx); x.tgN = [mx - s * 9, my]; x.lxT = s; }, { exit: (x) => { if (first) { say(x, pick(['乾杯!', '乾杯!', 'icon:note']), 1.6); effects.push({ k: 'spark', x: meet()[0], y: meet()[1] - 8, t: 0 }); } } }),
      ph(0.3, (x, u) => { const [mx, my] = meet(), s = Math.sign(o.hx - x.hx); x.tgN = [mx - s * (9 - 7 * Math.sin(u * Math.PI)), my - 3]; }),
      ph(dd(0.8, 1.3, x), (x) => { const [mx, my] = PT.mouth(x); x.tgN = [mx, my]; x.tiltT = -0.3; x.cupTilt = 0.7; }, { exit: (x) => { x.cupTilt = 0; cup.level = Math.max(0, cup.level - 0.3); } }),
      ph(0.45, (x) => { const [cx, cy] = PT.cup(x); x.tgN = [cx, cy - 9]; }, { exit: (x) => { cup.held = null; x.hold.N = null; } }),
    ];
    start(a, 'clink', mk(a, b, ca, true)); start(b, 'clink', mk(b, a, cb, false)); return true;
  }
  function actFeed(a, b) { // date / mum -> toddler: offer a piece
    if (!a.plate || a.plate.left <= 0 || !canJoin(b)) return false; const kind = a.plate.kind;
    start(a, 'feed', [
      ph(0.45, (a) => { const [x, y] = PT.plate(a); a.tgN = [x, y - 8]; a.tiltT = 0.25; }, { exit: (a) => { if (a.plate) { a.plate.left--; a.hold.N = { piece: kind, chop: true }; } say(a, b.T.kid ? 'あーん' : 'icon:heart', 1.4); } }),
      ph(0.7, (a) => { const [x, y] = PT.mouth(b); a.tgN = [x + Math.sign(a.hx - b.hx) * 6, y]; a.lxT = Math.sign(b.hx - a.hx); a.leanT += 0.08; }, { exit: (a) => { a.hold.N = { chop: true }; } }),
      ph(0.5, (a) => { a.lxT = Math.sign(b.hx - a.hx); }, { exit: (a) => { a.hold.N = null; if (a.plate && a.plate.left <= 0) a.queue = () => actStack(a); } }),
    ]);
    start(b, 'fed', [ph(0.5, (b) => { b.lxT = Math.sign(a.hx - b.hx); b.leanT += 0.1; }), ph(0.6, (b) => { b.lxT = Math.sign(a.hx - b.hx); b.leanT += 0.12; }),
      ph(dd(1.2, 1.8, b), (b, u, t) => { b.headDy = -Math.abs(Math.sin(t * 9)) * 1.8; }, { exit: (b) => { say(b, b.T.kid ? pick(['おいしい!', 'icon:star']) : pick(['icon:heart', 'おいしい']), 1.4); } })]);
    return true;
  }
  function actTend(m, kid) { // mum / grandma pats or wipes the toddler
    if (!canJoin(kid)) return false; const wipe = Math.random() < 0.5;
    start(m, 'tend', [ph(dd(1.2, 2, m), (m, u, t) => { const [x, y] = wipe ? PT.mouth(kid) : [kid.R.cx, kid.R.cy - kid.R.R]; m.tgN = [x + Math.sin(t * 9) * 4, y + (wipe ? 0 : -2)]; m.lxT = Math.sign(kid.hx - m.hx); m.leanT += 0.08; })]);
    start(kid, 'wiggle', [ph(1.4, (k, u, t) => { k.shake = Math.sin(t * 16) * 0.03; k.lxT = Math.sign(m.hx - k.hx); })], { onEnd: (k) => { k.shake = 0; } });
    say(m, wipe ? 'ほら' : pick(['よしよし', 'icon:heart']), 1.4); return true;
  }
  function actAskChef(a) {
    if (a.awaiting || !chef) return false; const kind = pick(a.T.likes);
    a.awaiting = { kind, t: simT };
    start(a, 'askChef', [
      ph(dd(1.1, 1.6, a), (a) => { a.tgN = [a.hx + a.f * a.R.T * 0.22, a.R.cy - a.R.R * 0.3]; a.lxT = Math.sign(640 - a.hx); }, { enter: (a) => { say(a, a.type === 'tourist' ? pick(['Excuse me!', 'すみません!']) : 'すみません!', 1.4); } }),
      ph(1.4, (a) => { a.lxT = Math.sign(640 - a.hx); }, { enter: (a) => { chef.reqs.push(() => chefRespond(a, kind)); }, exit: (a) => { say(a, 'sushi:' + kind, 1.6); } }),
      ph(1.2, (a) => { a.lxT = Math.sign(640 - a.hx); }),
    ]); return true;
  }
  function actWave(k) { // the kid waves at the chef
    start(k, 'wave', [ph(dd(1.4, 2.2, k), (k, u, t) => { k.tgN = [k.hx + k.f * k.R.T * 0.25 + Math.sin(t * 13) * 8, k.R.cy - k.R.R * 1.2]; k.lxT = Math.sign(640 - k.hx); k.bob = -Math.abs(Math.sin(t * 7)) * 1.5; })], { onEnd: (k) => { k.bob = 0; } });
    say(k, pick(['icon:wave', 'バイバイ!', 'おーい!']), 1.5);
    if (chef && Math.random() < 0.85) setTimeoutSim(0.6, () => chef.reqs.unshift(() => chefWave(k)));
    return true;
  }
  function actCheer(k) { start(k, 'cheer', [ph(dd(1, 1.5, k), (k, u, t) => { k.tgN = [k.hx + k.f * k.R.T * 0.2, k.R.cy - k.R.R * 1.5]; k.tgF = [k.hx - k.f * k.R.T * 0.05, k.R.cy - k.R.R * 1.4]; k.farFront = true; k.bob = -Math.abs(Math.sin(t * 11)) * 3; })], { onEnd: (k) => { k.bob = 0; } }); say(k, pick(['わーい!', 'icon:star', 'やった!']), 1.3); return true; }
  function actPhoto(a) {
    if (!a.plate) return false; let shots = 0;
    return start(a, 'photo', [ph(dd(1.6, 2.6, a), (a, u, t) => { const [x, y] = PT.plate(a); a.tgN = [x, y - a.R.T * 0.3]; a.tgF = [x - a.f * 10, y - a.R.T * 0.27]; a.farFront = true; a.tiltT = 0.5; a.lxT = a.f * 0.6; a.hold.N = { phone: 1 }; const s = Math.floor(u * 2.2); if (s > shots && u < 0.95) { shots = s; effects.push({ k: 'flash', x: a.hN.x, y: a.hN.y - 6, t: 0 }); } })],
      { onEnd: (a) => { a.hold.N = null; if (Math.random() < 0.5) say(a, pick(['icon:cam', 'icon:star', 'Wow!']), 1.2); }, onAbort: (a) => { a.hold.N = null; } }) && (say(a, 'icon:cam', 1.2), true);
  }
  function actPhone(a) { const d = dd(3, 8, a); return start(a, 'phone', [ph(d, (a, u, t) => { const [x, y] = PT.chest(a); a.tgN = [x, y + 4 + Math.sin(t * 11) * (Math.sin(t * 0.9) > 0 ? 1.4 : 0)]; a.tgF = [x - a.f * 8, y + 8]; a.farFront = true; a.tiltT = 0.5; a.lxT = a.f * 0.55; a.hold.N = { phone: 1 }; if (Math.random() < dt0 * 0.12) say(a, pick(['icon:note', 'icon:heart', 'ハハ', 'icon:ex']), 1); })], { onEnd: (a) => { a.hold.N = null; }, onAbort: (a) => { a.hold.N = null; } }); }
  function actCall(a) { say(a, 'もしもし', 1.3); return start(a, 'call', [ph(dd(3, 6, a), (a, u, t) => { a.tgN = [a.R.cx - (a.lx >= 0 ? 1 : -1) * a.R.R * 0.1, a.R.cy + a.R.R * 0.2]; a.lxT = a.f * 0.6; a.tiltT = 0.1 + Math.max(0, Math.sin(t * 3)) * 0.12; a.hold.N = { phone: 1 }; if (Math.random() < dt0 * 0.3) say(a, pick(['はい、はい', 'ええ', 'icon:sweat', 'はい!']), 1.2); })], { onEnd: (a) => { a.hold.N = null; }, onAbort: (a) => { a.hold.N = null; } }); }
  function actWatch(a) { a.rush = Math.min(2, a.rush + 0.35); say(a, 'icon:clock', 1.2); return start(a, 'watch', [ph(dd(1, 1.6, a), (a) => { const [x, y] = PT.chest(a); a.tgF = [x, y - 4]; a.farFront = true; a.lxT = a.f * 0.4; a.tiltT = 0.5; })]); }
  function actGlance(a) {
    const opts = [() => 640, () => 1190, () => (seatOf(a).side ? 975 : -40), () => reachX(a) - 200, () => a.hx + rand(-300, 300)];
    const tx = pick(opts)(); return start(a, 'glance', [ph(dd(0.8, 2.2, a), (a) => { a.lxT = clamp((tx - a.hx) / 80, -1, 1); a.tiltT = rand(-0.05, 0.1); })]);
  }
  function actChin(a) { return start(a, 'chin', [ph(dd(2, 4.5, a), (a) => { a.tgN = [a.R.cx + (a.lx >= 0 ? 1 : -1) * a.R.R * 0.5, a.R.cy + a.R.R * 1.05]; a.leanT += 0.1; a.tiltT = 0.08; })]); }
  function actStretch(a) { return start(a, 'stretch', [ph(dd(1.2, 1.8, a), (a, u) => { const s = Math.sin(u * Math.PI); a.tgN = [a.hx + a.f * 20, a.R.cy - a.R.R * (0.5 + 1.6 * s)]; a.tgF = [a.hx - a.f * 10, a.R.cy - a.R.R * (0.4 + 1.6 * s)]; a.farFront = true; a.leanT -= 0.12 * s; a.tiltT = -0.2 * s; })]); }
  function actIdle(a) { return start(a, 'idle', [ph(dd(0.8, 2.6, a), null)]); }
  function actBell(a) {
    return start(a, 'bell', [ph(0.5, (a) => { const [x, y] = PT.bell(a); a.tgN = [x, y - 6]; }, { exit: (a) => { effects.push({ k: 'ding', x: PT.bell(a)[0], y: PT.bell(a)[1] - 8, t: 0 }); say(a, 'icon:bell', 1.5); } }), ph(0.4, null)]);
  }
  function actReact(a, big) {
    if (a.hold.N && (a.hold.N.plate || a.hold.N.cup || a.hold.N.soy)) { a.look = { x: () => 640, until: simT + 1.4 }; if (Math.random() < 0.5) say(a, '!', 1); return; }
    const clap = Math.random() < (big ? 0.7 : 0.35);
    if (a.T.kid && Math.random() < 0.7) return actCheer(a);
    start(a, 'react', [ph(rand(0, 0.35), (a) => { a.lxT = clamp((640 - a.hx) / 100, -1, 1); }), ph(clap ? dd(1.2, 1.8, a) : dd(0.8, 1.2, a), (a, u, t) => {
      a.lxT = clamp((640 - a.hx) / 100, -1, 1); a.tiltT = -0.12;
      if (clap) { const [x, y] = PT.chest(a), o = Math.abs(Math.sin(t * 13)) * 9 * a.sc; a.tgN = [x + a.f * 8 + o, y - 6]; a.tgF = [x + a.f * 8 - o, y - 6]; a.farFront = true; }
    })]);
    if (Math.random() < (big ? 0.8 : 0.4)) say(a, pick(big ? ['すごい!', 'おお!', 'icon:star', 'わあ!'] : ['おお', '!', 'icon:star']), 1.3);
  }
  let dt0 = 0.016;

  /* ---------- the diner's brain: weighted, personality-driven, never the same thing twice in a row ---------- */
  function think(a) {
    if (a.queue) { const q = a.queue; a.queue = null; if (q() !== false && a.act) return; }
    if (a.plate && a.plate.left <= 0) return actStack(a);
    const per = period(P.hour), nb = neighbors(a), mates = nb.filter((b) => b.party === a.party), strangers = nb.filter((b) => b.party !== a.party);
    const done = a.eaten >= a.want && !a.plate, cup = seatOf(a).cup, soy = soyFor(a), Wt = [];
    const add = (name, w, fn) => { if (!(w > 0)) return; const i = a.hist.indexOf(name); if (i === 0) w *= 0.08; else if (i > 0) w *= 0.45; const cd = COOL[name]; if (cd && simT - (a.cool[name] ?? -1e9) < cd) return; Wt.push([w, fn]); };
    if (a.plate && a.plate.left > 0) add('eat', 4.2 + a.rush * 1.5, () => actEat(a));
    if (!a.plate && !done && simT > a.nextPlateAt) { const p = (a.awaiting && plates.find((q) => q.special === a && q.vis && reachX(a) - q.x > 10 && reachX(a) - q.x < 400)) || choosePlate(a); if (p) add('take', 4.5 + a.rush * 2, () => actTake(a, p)); }
    if (cup && cup.level > 0.05) add('sip', 0.8 * a.T.tea * (done ? 1.6 : 1), () => actSip(a));
    for (const b of mates) { if (canJoin(b)) { add('chat', 1.3 * a.chatty, () => actChat(a, b)); if (a.T.date || a.T.sake || a.type === 'friend' || a.type === 'student') add('clink', 0.5 * (a.T.sake ? 2 : 1), () => actClink(a, b)); if ((a.T.date && b.T.date) || (b.T.kid && !a.T.kid)) add('feed', 0.6, () => actFeed(a, b)); if (b.T.kid && !a.T.kid) add('tend', 0.9, () => actTend(a, b)); } }
    for (const b of strangers) if (canJoin(b)) add('stranger', 0.14 * a.chatty, () => actChat(a, b, true));
    if (nb.length) add('point', 0.35 * a.chatty, () => actPoint(a, pick(nb)));
    if (soy && !soy.held && a.plate && Math.random() < 0.5) { if (soyReach(a, soy)) add('soy', 0.5, () => actSoySelf(a, soy)); else { const hold = nb.find((b) => soyReach(b, soy) && canJoin(b)); if (hold) add('soy', 0.7, () => actPassSoy(a, hold, soy)); } }
    if (a.T.phone) add('phone', 0.6 * a.T.phone, () => actPhone(a));
    if (a.T.call) add('call', 0.25 * a.T.call, () => actCall(a));
    if (a.T.photo && a.plate) add('photo', 0.9 * a.T.photo, () => actPhoto(a));
    if (a.T.watch && per === 1) add('watch', 0.6 * a.T.watch, () => actWatch(a));
    if ((a.T.ask || a.T.regular || Math.random() < 0.3) && a.eaten > 0 && !done) add('askChef', 0.22 * (a.T.ask || 0.5), () => actAskChef(a));
    if (a.T.kid) { add('wave', 1.1, () => actWave(a)); add('cheer', 0.4, () => actCheer(a)); }
    add('glance', 0.9, () => actGlance(a)); add('idle', 0.5 + (done ? 0.5 : 0), () => actIdle(a));
    add('chin', 0.25 * (a.T.kid ? 0 : 1), () => actChin(a)); add('stretch', 0.08, () => actStretch(a));
    let s = Wt.reduce((t, w) => t + w[0], 0), r = Math.random() * s;
    for (const [w, fn] of Wt) { r -= w; if (r <= 0) { if (fn() !== false && a.act) return; break; } }
    actIdle(a);
  }

  /* ---------- staff ---------- */
  const CHEF_Y = 566;
  function mkStaff() {
    chef = mkActor('salaryman'); Object.assign(chef, { kind: 'staff', role: 'chef', type: 'chef', def: B({ T: 250, hw: 66, headR: 31, pattern: 'chef', top: 'white', top2: 'cream', sleeve: 'white', shortSleeve: 1, hat: 'chef', hair: 'dark', hairD: 0.05 }), T: { speed: 1, posture: 0.05, words: [] }, speed: 1.05, hx: 610, hy: CHEF_Y, sc: 1, f: 1, state: 'chef', layer: 'chef', goX: 610, reqs: [], tone: 0.02 });
    delete chef.scarf; delete chef.umbrella; chef.lx = chef.lxT = 0.4;
    waitress = mkActor('officeLady'); Object.assign(waitress, { kind: 'staff', role: 'waitress', type: 'waitress', def: B({ T: 232, hw: 54, headR: 29, pattern: 'apron', top: 'navy', top2: 'white', top3: 'coral', hairStyle: 'bun', hat: 'band', hatCol: 'coral', pants: 'dark' }), T: { speed: 1.1, posture: 0, words: [] }, speed: 1.1, hx: 840, f: -1, state: 'staff', layer: 'aisle', task: null, tone: -0.04 });
    delete waitress.scarf; delete waitress.umbrella;
    waitress.sc = beltS(840) * 0.94; waitress.hy = standHip(waitress);
    for (const s of [chef, waitress]) { F.rig(s); staffPose(s); s.hN.x = s.tgN[0]; s.hN.y = s.tgN[1]; s.hF.x = s.tgF[0]; s.hF.y = s.tgF[1]; }
  }
  function staffPose(s) {
    const R = s.R || F.rig(s), T = R.T, f = s.f;
    if (s.role === 'chef') { s.leanT = 0.06; s.tiltT = 0.18; s.tgN = [s.hx + f * T * 0.24, 430]; s.tgF = [s.hx - f * T * 0.04, 432]; if (!s.look && !s.act) s.lxT = f * 0.45; }
    else { rigPose(s); if (!s.walking) { s.tgN = [s.hx + f * T * 0.16, s.hy - T * 0.3]; s.tgF = [s.hx + f * T * 0.06, s.hy - T * 0.28]; } }
    if (s.look) { if (simT > s.look.until) s.look = null; else s.lxT = clamp((s.look.x() - s.hx) / 60, -1, 1); }
  }
  function chefGo(x) { chef.goX = clamp(x, 540, 740); }
  const chefAt = () => Math.abs(chef.hx - chef.goX) < 3;
  function chefThink(c) {
    if (c.reqs.length) { const r = c.reqs.shift(); if (r() !== false && c.act) return; }
    const n = plates.filter((p) => p.on).length, Wt = [];
    const add = (name, w, fn) => { const i = c.hist.indexOf(name); if (i === 0) w *= 0.25; else if (i > 0) w *= 0.6; Wt.push([w, fn]); };
    add('place', n < 15 ? 6 : n < 18 ? 1.2 : 0.2, () => chefPlace(wpick(KIND_W)));
    add('slice', 3, chefSlice); add('shape', 1.6, () => chefShape(null)); add('wipe', 0.6, chefWipe); add('look', 1.3, chefLook); add('idle', 0.5, () => start(c, 'idle', [ph(rand(0.6, 1.6), null)]));
    let s = Wt.reduce((t, w) => t + w[0], 0), r = Math.random() * s; for (const [w, fn] of Wt) { r -= w; if (r <= 0) { fn(); return; } }
  }
  function chefSlice() {
    const c = chef; chefGo(600);
    start(c, 'slice', [ph(0, null, { until: chefAt, max: 3 }), ph(rand(2.5, 5), (c, u, t) => { const k = (t * 1.15) % 1; c.tgN = [c.hx + c.f * (c.R.T * 0.18 - k * 40), 424 + Math.sin(k * Math.PI) * -4]; c.tgF = [c.hx - c.f * c.R.T * 0.02, 428]; c.hold.N = { knife: 1 }; c.tiltT = 0.36; c.lxT = c.f * 0.35; })], { onEnd: (c) => { c.hold.N = null; }, onAbort: (c) => { c.hold.N = null; } });
  }
  function chefShape(forA, kind) {
    const c = chef; kind = kind || wpick(KIND_W); chefGo(660);
    start(c, 'shape', [ph(0, null, { until: chefAt, max: 3 }),
      ph(0.5, (c) => { c.tgN = [703, 420]; c.tiltT = 0.3; c.lxT = c.f * 0.4; }),
      ph(rand(1.6, 2.6), (c, u, t) => { const pr = Math.abs(Math.sin(t * 6)) * 6; c.tgN = [c.hx + c.f * 6, 414 + pr]; c.tgF = [c.hx - c.f * 4, 420 - pr * 0.5]; c.farFront = true; c.tiltT = 0.34; })],
      { onEnd: () => { if (forA) chefSpecial(forA, kind); else chef.reqs.unshift(() => chefPlace(kind)); } });
  }
  function chefPlace(kind, forA) {
    const c = chef, x = rand(560, 700); chefGo(x);
    const px = () => c.hx + c.f * 18, dome = (kind === 'uni' || kind === 'ikura' || kind === 'negitoro') ? Math.random() < 0.6 : Math.random() < 0.08;
    const gap = () => !plates.some((p) => p.vis && Math.abs(p.x - px()) < 48);
    return start(c, 'place', [ph(0, null, { until: chefAt, max: 3 }),
      ph(0.55, (c) => { c.tgN = [790, 418]; c.lxT = 0.7; c.tiltT = 0.25; }, { exit: (c) => { c.hold.N = { plate: { kind, col: GeoSushi.PLATE_OF[kind], left: 2, special: forA } }; } }),
      ph(0, (c) => { c.tgN = [px(), beltY(px()) - 10]; c.lxT = c.f * 0.3; c.tiltT = 0.45; c.leanT = 0.2; }, { until: (c, t) => t > 0.6 && gap(), max: 6 }),
      ph(0.2, null, { exit: (c) => { addPlate(px() - BELT_X0, kind, dome, forA); c.hold.N = null; if (forA) say(c, 'どうぞ!', 1.4); } }),
    ], { onAbort: (c) => { c.hold.N = null; } });
  }
  function chefRespond(a, kind) {
    const c = chef; start(c, 'respond', [ph(1.2, (c, u, t) => { c.lxT = clamp((a.hx - c.hx) / 100, -1, 1); c.f = a.hx > c.hx ? 1 : -1; c.tiltT = Math.max(0, Math.sin(t * 7)) * 0.25; })], { onEnd: () => chefShape(a, kind) });
    say(c, pick(['はい!', 'はいよ!', 'まいど!']), 1.4);
  }
  function chefSpecial(a, kind) {
    if (!actors.includes(a) || a.state !== 'seated') return;
    if (seatOf(a).side === 1 || !waitress || waitress.task) return chefPlace(kind, a); // right side: down the belt with a little flag
    const c = chef; const d = { a, kind, handed: false }; delivers.push(d); chefGo(700);
    start(c, 'pass', [ph(0, null, { until: chefAt, max: 3 }), ph(0.5, (c) => { c.tgN = [790, 418]; }, { exit: (c) => { c.hold.N = { plate: { kind, col: GeoSushi.PLATE_OF[kind], left: 2, special: a } }; } }),
      ph(0, (c) => { c.tgN = [c.hx + 60, 412]; c.lxT = 0.8; c.f = 1; }, { until: () => d.handed, max: 14, exit: (c) => { if (!d.handed) { delivers.splice(delivers.indexOf(d), 1); c.hold.N = null; chef.reqs.unshift(() => chefPlace(kind, a)); } } })],
      { onAbort: (c) => { c.hold.N = null; } });
  }
  function chefWave(k) { if (!actors.includes(k)) return false; const c = chef; start(c, 'wave', [ph(1.4, (c, u, t) => { c.lxT = clamp((k.hx - c.hx) / 80, -1, 1); c.tgF = [c.hx + Math.sign(k.hx - c.hx) * 40 + Math.sin(t * 12) * 8, c.R.cy - 10]; c.farFront = true; })]); say(c, pick(['icon:note', 'はーい!', 'icon:wave']), 1.3); }
  function chefWipe() { const c = chef; chefGo(610); start(c, 'wipe', [ph(0, null, { until: chefAt, max: 3 }), ph(rand(1.5, 2.5), (c, u, t) => { c.tgN = [c.hx + c.f * 30 + Math.cos(t * 7) * 18, 430 + Math.sin(t * 7) * 3]; c.hold.N = { cloth: 1 }; c.tiltT = 0.35; })], { onEnd: (c) => { c.hold.N = null; }, onAbort: (c) => { c.hold.N = null; } }); }
  function chefLook() {
    const c = chef, seated = actors.filter((a) => a.state === 'seated'); const tgt = seated.length && Math.random() < 0.75 ? pick(seated) : null;
    start(c, 'look', [ph(rand(1, 2.4), (c, u, t) => { const x = tgt ? tgt.hx : (Math.sin(simT) > 0 ? 975 : 120); c.lxT = clamp((x - c.hx) / 90, -1, 1); c.f = x > c.hx ? 1 : -1; c.tiltT = 0.02; if (tgt && tgt.T.regular && t > 0.4 && !c._greet) { c._greet = 1; say(c, pick(['いつもの?', 'まいど!']), 1.4); setTimeoutSim(0.8, () => say(tgt, pick(['うむ', 'icon:note', 'たのむよ']), 1.3)); } })], { onEnd: (c) => { c._greet = 0; } });
  }
  /* waitress: bills, deliveries, tea refills, clearing plate stacks, greeting */
  const wStand = (st) => st.x - st.f * 64;
  function walkPh(x, extra = {}) { return ph(0, (w) => { w.walkTo = x; }, Object.assign({ until: (w) => Math.abs(w.hx - x) < 2 && !w.walking, max: 20 }, extra)); }
  function waitressThink(w) {
    const bill = parties.find((p) => p.state === 'bill' && !p.checking); if (bill) return taskCheck(w, bill);
    const d = delivers.find((q) => !q.taken); if (d) return taskDeliver(w, d);
    const cupSeat = SEATS.find((s) => s.occ && s.occ.state === 'seated' && s.cup && !s.cup.sake && s.cup.level <= 0.15 && !s.cup.held); if (cupSeat) return taskRefill(w, cupSeat);
    const st = SEATS.filter((s) => s.stack.length && (!s.occ || s.stack.length >= 6)).sort((a, b) => b.stack.length - a.stack.length)[0]; if (st) return taskClear(w, st);
    const r = Math.random();
    if (r < 0.35) return start(w, 'wIdle', [walkPh(rand(820, 860)), ph(rand(1.5, 3), (w) => { w.lxT = rand(-1, 1) > 0 ? 0.6 : -0.6; })]);
    if (r < 0.6) return start(w, 'wWipe', [walkPh(rand(800, 850)), ph(rand(1.5, 2.5), (w, u, t) => { w.tgN = [w.hx - 30 + Math.cos(t * 6) * 16, 432 + Math.sin(t * 6) * 3]; w.hold.N = { cloth: 1 }; w.f = -1; w.lxT = -0.5; w.tiltT = 0.3; })], { onEnd: (w) => { w.hold.N = null; }, onAbort: (w) => { w.hold.N = null; } });
    return start(w, 'wChat', [walkPh(rand(790, 830)), ph(rand(2, 3.5), (w) => { w.lxT = -1; w.f = -1; }, { enter: () => { say(w, pick(['icon:note', 'いそがしい!', 'icon:sushi', 'ハハ']), 1.4); setTimeoutSim(1.2, () => say(chef, pick(['ハハ', 'icon:note', 'よし!']), 1.2)); } })]);
  }
  function taskCheck(w, party) {
    party.checking = true; const lead = party.members[0], st = seatOf(lead), n = party.members.reduce((t, m) => t + seatOf(m).stack.length, 0);
    start(w, 'check', [walkPh(wStand(st)), ph(1.6, (w) => { w.f = st.f; w.armsFront = true; const [x, y] = [st.x - st.f * 30, itemY(st.x) - 30]; w.tgN = [x, y]; w.hold.N = { phone: 1 }; w.lxT = st.f * 0.6; w.tiltT = 0.4; }, { enter: () => say(w, `${n}皿`, 1.6) }),
      ph(1.0, (w) => { w.armsFront = false; w.hold.N = null; w.leanT = 0.3; }, { enter: () => { say(w, 'ありがとうございます!', 1.6); party.state = 'leave'; } })],
      { onEnd: (w) => { w.armsFront = false; }, onAbort: (w) => { w.armsFront = false; w.hold.N = null; party.state = 'leave'; } });
  }
  function taskDeliver(w, d) {
    d.taken = true; const a = d.a;
    start(w, 'deliver', [walkPh(760), ph(0, (w) => { w.f = -1; w.lxT = -0.8; w.tgN = [chef.hx + 60, 414]; }, { until: () => Math.hypot(w.hN.x - chef.hN.x, w.hN.y - chef.hN.y) < 16, max: 4, exit: (w) => { d.handed = true; chef.hold.N = null; w.hold.N = { plate: { kind: d.kind, col: GeoSushi.PLATE_OF[d.kind], left: 2, special: a } }; delivers.splice(delivers.indexOf(d), 1); } }),
      ph(0, (w) => { if (!actors.includes(a)) { w.act.i = 99; return; } w.walkTo = wStand(seatOf(a)); w.tgN = [w.hx + w.f * 30, w.hy - w.R.T * 0.42]; }, { until: (w) => !actors.includes(a) || (Math.abs(w.hx - wStand(seatOf(a))) < 2 && !w.walking), max: 20 }),
      ph(0.6, (w) => { const [x, y] = PT.plate(a); w.armsFront = true; w.f = seatOf(a).f; w.tgN = [x, y - 8]; }, { exit: (w) => { w.armsFront = false; const q = w.hold.N && w.hold.N.plate; w.hold.N = null; if (q && actors.includes(a)) { if (a.plate) seatOf(a).stack.push(a.plate.col); if (a.act && a.act.name === 'take') abort(a); a.plate = { kind: q.kind, col: q.col, left: 2, special: a }; a.awaiting = null; say(w, 'どうぞ', 1.3); setTimeoutSim(0.5, () => say(a, pick(['ありがとう', 'icon:note', 'Wow!']), 1.3)); } } }),
    ], { onAbort: (w) => { w.armsFront = false; w.hold.N = null; } });
  }
  function taskRefill(w, st) {
    start(w, 'refill', [walkPh(wStand(st)), ph(1.7, (w, u) => { const cup = st.cup; if (!cup || !st.occ) return; const [x, y] = [st.x - st.f * st.occ.R.T * 0.02, itemY(st.x)]; w.armsFront = true; w.f = st.f; w.tgN = [x - st.f * 6, y - 34]; w.hold.N = { teapot: 1 }; w.potTilt = u > 0.25 && u < 0.85 ? 0.7 : 0; w.lxT = st.f * 0.5; w.tiltT = 0.4; },
      { exit: (w) => { w.armsFront = false; w.hold.N = null; w.potTilt = 0; if (st.cup) { st.cup.level = 1; st.cup.hot = 1; } if (st.occ && Math.random() < 0.6) say(st.occ, pick(['ありがとう', 'icon:tea', 'どうも']), 1.2); } })], { onAbort: (w) => { w.armsFront = false; w.hold.N = null; w.potTilt = 0; } });
    if (Math.random() < 0.5) say(w, 'どうぞ', 1.2);
  }
  function taskClear(w, st) {
    start(w, 'clear', [walkPh(wStand(st)), ph(0.8, (w) => { w.armsFront = true; w.f = st.f; w.tgN = [st.x - st.f * 36, itemY(st.x) - 10]; w.lxT = st.f * 0.5; w.tiltT = 0.35; }, { exit: (w) => { w.carry = st.stack.splice(0); w.armsFront = false; } }),
      walkPh(784), ph(0.9, (w, u) => { w.alpha = u < 0.5 ? 1 - u * 2 : (u - 0.5) * 2; if (u > 0.5) w.carry = null; }), ph(0.1, (w) => { w.alpha = 1; })], { onAbort: (w) => { w.armsFront = false; w.carry = null; w.alpha = 1; } });
  }

  /* ---------- belt ---------- */
  function addPlate(pos, kind, dome, special) { const p = { id: uid++, pos, kind, col: GeoSushi.PLATE_OF[kind], dome: !!dome, on: true, resv: null, special: special || null, x: 0, y: 0, vis: false }; plates.push(p); return p; }
  function takeFromBelt(p) { p.on = false; const i = plates.indexOf(p); if (i >= 0) plates.splice(i, 1); }
  function stepBelt(dt) {
    beltOff += SPEED * dt;
    for (const p of plates) {
      p.pos += SPEED * dt; if (p.pos >= LOOP) p.pos -= LOOP;
      p.vis = p.pos < VIS - 20; p.x = BELT_X0 + 34 + p.pos; p.y = beltY(p.x) - 3 * beltS(p.x);
      if (!p.vis && p.special && !actors.includes(p.special)) p.special = null; // customer left: plate becomes ordinary
    }
  }

  /* ---------- simulation ---------- */
  function initSim() {
    actors = []; parties = []; plates = []; effects = []; convos = []; delivers = []; timers = [];
    SEATS.forEach((s) => { s.occ = null; s.stack = []; s.cup = null; s.freeAt = 0; });
    soys = [{ side: 0, x: 254, held: null }, { side: 1, x: 1026, held: null }];
    mkStaff();
    for (let i = 0; i < 16; i++) addPlate((i / 16) * LOOP + rand(-12, 12), wpick(KIND_W), false);
    plates.forEach((p) => { if ((p.kind === 'uni' || p.kind === 'ikura') && Math.random() < 0.6) p.dome = true; });
    for (let i = 0; i < 4; i++) spawnParty(true);
    nextArrive = rand(3, 7);
  }
  function stepActor(a, dt) {
    a.t += dt;
    if (a.delay > 0) { a.delay -= dt; return; }
    if (a.state === 'walk' || a.state === 'exit') {
      const dx = a.walkTo - a.hx, sp = 62 * a.speed * (a.T.prop === 'cane' ? 0.75 : 1);
      a.walking = Math.abs(dx) > 1.5; if (a.walking) { a.hx += Math.sign(dx) * Math.min(Math.abs(dx), sp * dt); a.walkPh += dt * sp * 0.11; a.f = Math.sign(dx); a.lxT = a.f; }
      if (a.state === 'walk') a.alpha = Math.min(1, a.alpha + dt / 0.6);
      if (a.state === 'exit' && a.exitSide === 1 && Math.abs(a.hx - EXIT[1]) < 34) a.alpha = Math.max(0, a.alpha - dt / 0.6);
      if (a.state === 'exit' && a.exitSide === 1 && !a.walking && a.alpha > 0) a.walking = true;
      a.hy = standHip(a);
      if (!a.walking && (a.state !== 'walk' || a.alpha >= 1)) {
        if (a.state === 'walk') { a.state = 'sit'; a.st = 0; a.alpha = 1; a.from = { y: a.hy, sc: a.sc }; }
        else { a.state = 'gone'; }
      }
    } else if (a.state === 'sit' || a.state === 'stand') {
      a.st += dt / 0.75; const st = seatOf(a), u = smooth(clamp(a.st, 0, 1)), uu = a.state === 'sit' ? u : 1 - u;
      const scS = seatSc(st), scA = scS * 0.94, hipS = SEAT_Y - (a.T.kid ? 26 : 0);
      a.sc = lerp(scA, scS, uu); const tmpSc = a.sc; a.sc = scA; const hipA = standHip(a); a.sc = tmpSc;
      a.hy = lerp(hipA, hipS, uu); a.hx = st.x; a.f = st.f; a.layer = uu > 0.5 ? 'seat' : 'aisle';
      if (a.st >= 1) {
        if (a.state === 'sit') { a.state = 'seated'; a.layer = 'seat'; a.lx = a.f; if (Math.random() < 0.45) say(a, a.type === 'tourist' ? pick(['Wow!', 'いただきます']) : pick(['いただきます', 'icon:note', 'ふう']), 1.4); a.nextThink = simT + rand(0.3, 1.2); a.arrivedAt = simT; }
        else { a.state = 'bow'; a.st = 0; a.layer = 'aisle'; }
      }
    } else if (a.state === 'bow') {
      a.st += dt; a.walking = false; a.hy = standHip(a);
      a.f = seatOf(a).side === 0 ? 1 : -1; a.lxT = clamp((640 - a.hx) / 100, -1, 1);
      if (a.st > 1.1) { a.state = 'exit'; a.exitSide = seatOf(a).side; a.walkTo = EXIT[a.exitSide]; seatOf(a).occ = null; seatOf(a).cup = null; seatOf(a).freeAt = simT + rand(2, 6); }
    }
    // pose: base -> action overrides -> smoothing -> rig
    if (a.kind === 'staff') staffPose(a); else rigPose(a);
    if (a.state === 'bow') { a.leanT = Math.sin(clamp(a.st / 1.1, 0, 1) * Math.PI) * 0.45; a.tiltT = 0.3; }
    if (a.state === 'seated' || a.kind === 'staff') runAct(a, dt);
    const w = 9 * Math.sqrt(a.speed) * (a.act && a.act.name === 'take' ? 1.4 : 1);
    a.lean = ease(a.lean, a.leanT, 6, dt); a.lx = ease(a.lx, a.lxT, 5 * a.speed, dt); a.tilt = ease(a.tilt, a.tiltT, 6, dt);
    a.hy += Math.sin(a.t * 1.7) * 0.012; // breathing
    F.rig(a);
    spring(a.hN, a.tgN[0], a.tgN[1], w, dt); spring(a.hF, a.tgF[0], a.tgF[1], w * 0.9, dt);
    if (a.bub) { a.bub.t += dt; if (a.bub.t > a.bub.d) a.bub = null; }
  }
  function stepParties(dt) {
    const per = period(P.hour);
    for (const pt of parties) {
      if (pt.state === 'arrive' && pt.members.every((m) => m.state === 'seated')) pt.state = 'eat';
      if (pt.state === 'eat') {
        const allDone = pt.members.every((m) => m.eaten >= m.want && !m.plate), over = simT - pt.t0 > pt.maxStay;
        if ((allDone && !pt.linger) || over) { pt.linger = pt.linger || simT + rand(2, 7) * (per === 1 ? 0.5 : 1); }
        if (pt.linger && simT > pt.linger && pt.members.every((m) => !m.act || SOFT.has(m.act.name) || m.act.name === 'chat' || m.act.name === 'sip')) {
          const lead = pt.members[0]; if (lead.act) abort(lead); actBell(lead); pt.state = 'bill'; pt.billAt = simT;
        }
      } else if (pt.state === 'bill') { if (simT - pt.billAt > 14) pt.state = 'leave'; }
      if (pt.state === 'leave') {
        pt.members.forEach((m, j) => { if (m.state === 'seated') { abort(m); m.state = 'stand'; m.st = -j * 0.25; if (j === 0) { say(m, m.type === 'tourist' ? pick(['Arigato!', 'ごちそうさま!']) : 'ごちそうさま!', 1.6); setTimeoutSim(0.6, () => say(chef, pick(['ありがとう!', 'まいど!', 'またどうぞ!']), 1.6)); } } });
        pt.state = 'going';
      }
    }
    for (const a of actors) if (a.state === 'gone') { const pt = a.party; if (pt) pt.members = pt.members.filter((m) => m !== a); }
    actors = actors.filter((a) => a.state !== 'gone');
    parties = parties.filter((p) => p.members.length);
    // arrivals
    nextArrive -= dt;
    if (nextArrive <= 0) { const ok = spawnParty(false); const [lo, hi] = ARRIVE[per]; nextArrive = ok ? rand(lo, hi) : rand(1, 2.5); }
  }
  function sim(dt) {
    simT += dt; dt0 = dt; stepBelt(dt);
    for (let i = timers.length - 1; i >= 0; i--) if (simT >= timers[i].t) { const t = timers[i]; timers.splice(i, 1); t.fn(); }
    stepConvos(dt);
    for (const a of actors) {
      if (a.state === 'seated' && !a.act && simT >= (a.nextThink || 0)) { think(a); a.nextThink = simT + rand(0.05, 0.5) / a.speed; }
      stepActor(a, dt);
    }
    // staff
    if (!chef.act) chefThink(chef);
    chef.hx = ease(chef.hx, chef.goX, 3.5, dt); if (Math.abs(chef.lx) > 0.5) chef.f = chef.lx > 0 ? 1 : -1;
    if (!waitress.act) waitressThink(waitress);
    if (waitress.walkTo != null) { const dx = waitress.walkTo - waitress.hx, sp = 78; waitress.walking = Math.abs(dx) > 1.5; if (waitress.walking) { waitress.hx += Math.sign(dx) * Math.min(Math.abs(dx), sp * dt); waitress.walkPh += dt * sp * 0.11; waitress.f = Math.sign(dx); waitress.lxT = waitress.f; } }
    waitress.sc = beltS(waitress.hx) * 0.94; waitress.hy = standHip(waitress);
    stepActor(chef, dt); stepActor(waitress, dt);
    for (const s of SEATS) if (s.cup) s.cup.hot = Math.max(0, s.cup.hot - dt / 70);
    for (const e of effects) e.t += dt; effects = effects.filter((e) => e.t < 0.8);
    doorWave = Math.max(0, doorWave - dt * 0.8);
  }
  function onClear(big, n) {
    for (const a of actors) if (a.state === 'seated' && Math.random() < (big ? 0.85 : 0.3 + n * 0.1)) { if (a.act && !SOFT.has(a.act.name) && a.act.name !== 'chat') { a.look = { x: () => 640, until: simT + 1.3 }; continue; } setTimeoutSim(rand(0, 0.4), () => { if (a.state === 'seated' && (!a.act || SOFT.has(a.act.name) || a.act.name === 'chat')) actReact(a, big); }); }
    if (Math.random() < (big ? 1 : 0.5)) say(chef, pick(big ? ['よっ!', 'おみごと!', 'icon:star'] : ['よし!', 'icon:note']), 1.4);
    if (big) say(waitress, pick(['すごい!', 'icon:star']), 1.3);
  }

  /* ---------- drawing people ---------- */
  function drawProp(c, a, R) { // bag / briefcase / umbrella / cane carried while walking or parked by the stool
    const T = R.T, s = a.sc, seated = a.layer === 'seat';
    if (a.T.prop === 'cane') { if (seated) { F.line(c, a.hx - a.f * 30 * s, SEAT_Y - 30 * s, a.hx - a.f * 44 * s, FLOOR, 3.2 * s, L('#5a3a22')); } else F.line(c, a.hN.x, a.hN.y, a.hN.x + a.f * 6 * s, AISLE_FLOOR, 3.2 * s, L('#5a3a22')); }
    if (a.umbrella) { const x0 = seated ? a.hx - a.f * 38 * s : a.hN.x, y0 = seated ? SEAT_Y - 10 : a.hN.y; c.fillStyle = F.col(P, a.umbrella); poly(c, [x0, y0 + 4 * s, x0 + 7 * s, y0 + 30 * s, x0 + 3 * s, (seated ? FLOOR : AISLE_FLOOR) - 4, x0 - 3 * s, (seated ? FLOOR : AISLE_FLOOR) - 4, x0 - 7 * s, y0 + 30 * s]); c.fill(); F.line(c, x0, y0 - 6 * s, x0, y0 + 6 * s, 2.4 * s, L('#3a2a1a')); }
    if (a.T.prop === 'briefcase' || a.T.prop === 'bag') {
      const bc = a.T.prop === 'briefcase' ? L('#3a2a20') : F.col(P, a.def.top3 || 'brown'), w = (a.T.prop === 'briefcase' ? 34 : 26) * s, h = (a.T.prop === 'briefcase' ? 24 : 26) * s;
      const x = seated ? a.hx - a.f * 40 * s : a.hF.x, y = seated ? FLOOR - h : a.hF.y + 4 * s;
      c.fillStyle = bc; roundRect(c, x - w / 2, y, w, h, 3 * s); c.fill(); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(x, y, w / 2, h);
      c.strokeStyle = bc; c.lineWidth = 2 * s; c.beginPath(); c.arc(x, y, 6 * s, Math.PI, TAU); c.stroke();
    }
  }
  function drawHeld(c, a) {
    const H = a.hold.N, s = a.sc; if (!H) return; const x = a.hN.x, y = a.hN.y, f = a.lx >= 0 ? 1 : -1;
    if (H.plate) { const q = H.plate; plateAt(c, x, y + 6 * s, 50 * s, q.kind, q.col, false, q.left ?? 2, q.special && a.kind === 'staff'); }
    if (H.piece) GeoSushi.piece(c, H.piece, x + f * 6 * s, y - 2 * s, 15 * s, L);
    if (H.chop) { F.line(c, x - f * 12 * s, y + 6 * s, x + f * 16 * s, y - 4 * s, 1.8 * s, L('#c89a5a')); F.line(c, x - f * 12 * s, y + 3 * s, x + f * 16 * s, y - 8 * s, 1.8 * s, L('#b0844a')); }
    if (H.cup) { c.save(); c.translate(x, y + 8 * s); c.rotate(-(a.cupTilt || 0) * f * 0.9); drawCup(c, 0, 0, s, Object.assign({}, H.cup, { hot: 0 }), simT); c.restore(); }
    if (H.soy) { c.save(); c.translate(x, y + 10 * s); c.rotate(-(a.soyTilt || 0) * f * 1.6); drawSoy(c, 0, 0, s); c.restore(); }
    if (H.phone) { c.fillStyle = L('#1e2228'); roundRect(c, x - 6 * s, y - 13 * s, 12 * s, 22 * s, 2.5 * s); c.fill(); c.fillStyle = rgba(mix(P.sky1, '#bfe4ff', 0.6), 0.9); c.fillRect(x - 4.5 * s, y - 11 * s, 9 * s, 16 * s); }
    if (H.knife) { F.line(c, x - f * 8 * s, y, x + f * 4 * s, y, 4 * s, L('#2a2220')); c.fillStyle = L('#d8dde2'); poly(c, [x + f * 4 * s, y - 3 * s, x + f * 42 * s, y - 1 * s, x + f * 4 * s, y + 3 * s]); c.fill(); }
    if (H.cloth) { c.fillStyle = L('#f2efe6'); roundRect(c, x - 9 * s, y - 2 * s, 18 * s, 9 * s, 2 * s); c.fill(); }
    if (H.teapot) { c.save(); c.translate(x, y + 8 * s); c.rotate((a.potTilt || 0) * -a.f * 0.8); c.fillStyle = L('#3a4a3a'); ellipse(c, 0, 0, 13 * s, 11 * s); c.fill(); c.fillStyle = 'rgba(0,0,0,0.2)'; c.fillRect(0, -11 * s, 13 * s, 22 * s); poly(c, [a.f * 10 * s, -2 * s, a.f * 24 * s, -9 * s, a.f * 22 * s, -5 * s, a.f * 11 * s, 4 * s]); c.fillStyle = L('#3a4a3a'); c.fill(); c.fillRect(-4 * s, -15 * s, 8 * s, 4 * s);
      if (a.potTilt > 0.3) { c.strokeStyle = L('#c8b060'); c.lineWidth = 2 * s; c.beginPath(); c.moveTo(a.f * 24 * s, -9 * s); c.quadraticCurveTo(a.f * 30 * s, 6 * s, a.f * 28 * s, 30 * s); c.stroke(); } c.restore(); }
  }
  function drawBody(c, a, withArms) {
    const R = a.R; if (!R) return;
    const al = a.alpha ?? 1; if (al <= 0.01) return; if (al < 1) c.globalAlpha = al;
    if (a.role !== 'chef') F.drawLegs(c, a, R, P);
    if (a.layer !== 'seat') drawProp(c, a, R);
    F.drawBackpack(c, a, R, P); F.headBack(c, a, R, P);
    if (!a.farFront) F.drawArm(c, a, R, P, 'F');
    F.drawTorso(c, a, R, P); F.drawHead(c, a, R, P);
    if (withArms) { if (a.farFront) F.drawArm(c, a, R, P, 'F'); F.drawArm(c, a, R, P, 'N'); drawHeld(c, a); if (a.carry) drawStack(c, a.hN.x, a.hN.y, a.sc, a.carry); }
    c.globalAlpha = 1;
  }
  function drawArms(c, a) { const R = a.R; if (!R || (a.alpha ?? 1) <= 0.01) return; c.globalAlpha = a.alpha ?? 1; if (a.farFront) F.drawArm(c, a, R, P, 'F'); F.drawArm(c, a, R, P, 'N'); drawHeld(c, a); if (a.carry) drawStack(c, a.hN.x, a.hN.y - 4, a.sc, a.carry); c.globalAlpha = 1; }

  /* ---------- speech bubbles (geometric, icons / sushi / short words) ---------- */
  function icon(c, name, x, y, r) {
    const ink = P.ink;
    switch (name) {
      case 'heart': c.fillStyle = L('#e04a5a'); c.beginPath(); c.moveTo(x, y + r * 0.8); c.bezierCurveTo(x - r * 1.3, y - r * 0.1, x - r * 0.6, y - r * 1.1, x, y - r * 0.35); c.bezierCurveTo(x + r * 0.6, y - r * 1.1, x + r * 1.3, y - r * 0.1, x, y + r * 0.8); c.fill(); break;
      case 'star': c.fillStyle = L('#e8b52c'); c.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.42 : r, an = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } c.closePath(); c.fill(); break;
      case 'note': c.fillStyle = ink; ellipse(c, x - r * 0.35, y + r * 0.5, r * 0.36, r * 0.27, -0.4); c.fill(); c.fillRect(x - r * 0.06, y - r * 0.8, r * 0.14, r * 1.3); poly(c, [x + r * 0.06, y - r * 0.8, x + r * 0.7, y - r * 0.45, x + r * 0.7, y - r * 0.2, x + r * 0.06, y - r * 0.5]); c.fill(); break;
      case 'tea': drawCup(c, x, y + r * 0.7, r / 11, { col: '#cfd8c0', band: '#3a5a3a', hot: 1, level: 1 }, simT); break;
      case 'soy': drawSoy(c, x, y + r * 0.8, r / 12); break;
      case 'clock': c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(x, y, r * 0.85, 0, TAU); c.fill(); c.strokeStyle = ink; c.lineWidth = r * 0.16; c.stroke(); F.line(c, x, y, x, y - r * 0.55, r * 0.14, ink); F.line(c, x, y, x + r * 0.4, y + r * 0.1, r * 0.14, ink); break;
      case 'cam': c.fillStyle = L('#2a2a30'); roundRect(c, x - r * 0.9, y - r * 0.5, r * 1.8, r * 1.15, r * 0.2); c.fill(); c.fillRect(x - r * 0.35, y - r * 0.75, r * 0.6, r * 0.3); c.fillStyle = L('#7ab0d0'); c.beginPath(); c.arc(x, y + r * 0.08, r * 0.36, 0, TAU); c.fill(); break;
      case 'q': case 'ex': c.fillStyle = name === 'q' ? L('#2f7f86') : L('#d4483a'); c.font = `800 ${r * 2}px ${JP_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name === 'q' ? '?' : '!', x, y + r * 0.08); break;
      case 'laugh': c.strokeStyle = ink; c.lineWidth = r * 0.2; c.lineCap = 'round'; for (const dx of [-0.4, 0.4]) { c.beginPath(); c.arc(x + dx * r, y - r * 0.05, r * 0.25, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); } c.fillStyle = L('#d4483a'); c.beginPath(); c.arc(x, y + r * 0.25, r * 0.45, 0, Math.PI); c.fill(); break;
      case 'sweat': c.fillStyle = L('#5ab0e0'); c.beginPath(); c.moveTo(x, y - r * 0.9); c.quadraticCurveTo(x + r * 0.7, y + r * 0.2, x, y + r * 0.7); c.quadraticCurveTo(x - r * 0.7, y + r * 0.2, x, y - r * 0.9); c.fill(); break;
      case 'wave': c.fillStyle = P.skin; c.beginPath(); c.arc(x, y + r * 0.15, r * 0.5, 0, TAU); c.fill(); for (let i = 0; i < 4; i++) { c.fillRect(x - r * 0.45 + i * r * 0.27, y - r * 0.85, r * 0.18, r * 0.8); } break;
      case 'bell': c.fillStyle = L('#e0a62e'); c.beginPath(); c.moveTo(x - r * 0.7, y + r * 0.5); c.quadraticCurveTo(x - r * 0.7, y - r * 0.8, x, y - r * 0.8); c.quadraticCurveTo(x + r * 0.7, y - r * 0.8, x + r * 0.7, y + r * 0.5); c.closePath(); c.fill(); c.beginPath(); c.arc(x, y + r * 0.62, r * 0.18, 0, TAU); c.fill(); break;
      case 'sun': c.fillStyle = L('#f0a830'); c.beginPath(); c.arc(x, y, r * 0.5, 0, TAU); c.fill(); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; F.line(c, x + Math.cos(an) * r * 0.65, y + Math.sin(an) * r * 0.65, x + Math.cos(an) * r * 0.95, y + Math.sin(an) * r * 0.95, r * 0.14, L('#f0a830')); } break;
      case 'rain': c.fillStyle = L('#5a7a9a'); ellipse(c, x, y - r * 0.2, r * 0.85, r * 0.45); c.fill(); F.line(c, x - r * 0.4, y + r * 0.3, x - r * 0.55, y + r * 0.8, r * 0.12, L('#5ab0e0')); F.line(c, x + r * 0.2, y + r * 0.3, x + r * 0.05, y + r * 0.8, r * 0.12, L('#5ab0e0')); break;
      case 'snow': c.strokeStyle = L('#7ab0d0'); c.lineWidth = r * 0.14; for (let i = 0; i < 3; i++) { const an = i * Math.PI / 3; c.beginPath(); c.moveTo(x - Math.cos(an) * r * 0.8, y - Math.sin(an) * r * 0.8); c.lineTo(x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8); c.stroke(); } break;
      case 'case': c.fillStyle = L('#3a2a20'); roundRect(c, x - r * 0.8, y - r * 0.4, r * 1.6, r * 1.0, r * 0.15); c.fill(); break;
      default: GeoSushi.piece(c, 'salmon', x, y + r * 0.6, r * 1.3, L);
    }
  }
  function drawBubble(c, a) {
    const b = a.bub, R = a.R; if (!b || !R || (a.alpha ?? 1) < 0.5) return;
    const pop = Math.min(1, b.t / 0.14), fade = clamp((b.d - b.t) / 0.25, 0, 1), sc = (0.6 + 0.4 * smooth(pop)) * Math.max(0.85, a.sc);
    let w, h = 34, kind = 'text', txt = b.c;
    if (txt.startsWith('icon:')) { kind = 'icon'; txt = txt.slice(5); w = 38; }
    else if (txt.startsWith('sushi:')) { kind = 'sushi'; txt = txt.slice(6); w = 44; }
    else { c.font = JPF; w = Math.max(34, c.measureText(txt).width + 20); }
    const side = a.role === 'chef' ? (a.f || 1) : a.f, bx = clamp(R.cx + side * R.R * 0.6, 40 + w / 2, BW - 40 - w / 2), by = R.cy - R.R * 1.25 - (a.def.hat === 'chef' ? R.R * 0.9 : 0) - 12;
    c.save(); c.globalAlpha = fade; c.translate(bx, by); c.scale(sc, sc);
    c.fillStyle = 'rgba(0,0,0,0.12)'; roundRect(c, -w / 2 + 2, -h + 3, w, h, h / 2); c.fill();
    c.fillStyle = P.bubble; roundRect(c, -w / 2, -h, w, h, h / 2); c.fill();
    const tx = clamp((R.cx - bx) / sc, -w / 2 + 10, w / 2 - 10); poly(c, [tx - 6, -2, tx + 6, -2, tx + (R.cx > bx ? 4 : -4) * 1.5, 9]); c.fill();
    if (kind === 'text') { c.fillStyle = P.ink; c.font = JPF; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, -h / 2 + 1); }
    else if (kind === 'icon') icon(c, txt, 0, -h / 2, 10);
    else { GeoSushi.plate(c, 0, -h / 2 + 8, 30, GeoSushi.PLATES[GeoSushi.PLATE_OF[txt] || 'red'], L); GeoSushi.piece(c, txt, 0, -h / 2 + 9, 16, L); }
    c.restore();
  }
  function drawEffects(c) {
    for (const e of effects) {
      const u = e.t / 0.8;
      if (e.k === 'flash') { c.save(); c.globalCompositeOperation = 'lighter'; const a = Math.max(0, 1 - e.t / 0.35); c.fillStyle = radial(c, e.x, e.y, 60, [[0, `rgba(255,255,255,${a})`], [0.25, `rgba(220,235,255,${a * 0.5})`], [1, 'rgba(200,220,255,0)']]); c.fillRect(e.x - 60, e.y - 60, 120, 120); c.restore(); }
      else if (e.k === 'ding') { c.strokeStyle = rgba(L('#e0a62e'), 1 - u); c.lineWidth = 2; for (let i = 0; i < 2; i++) { c.beginPath(); c.arc(e.x, e.y, 8 + u * 26 + i * 8, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); } icon(c, 'bell', e.x, e.y, 6); }
      else if (e.k === 'spark') { c.strokeStyle = rgba(L('#e8b52c'), 1 - u); c.lineWidth = 2; for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.45, r0 = 6 + u * 10, r1 = 12 + u * 16; c.beginPath(); c.moveTo(e.x + Math.cos(an) * r0, e.y + Math.sin(an) * r0); c.lineTo(e.x + Math.cos(an) * r1, e.y + Math.sin(an) * r1); c.stroke(); } }
    }
  }

  /* ---------- scene assembly ---------- */
  function seatItems(c, t) {
    for (const st of SEATS) {
      const a = st.occ, seated = a && a.R && (a.state === 'seated' || a.state === 'sit' || a.state === 'stand');
      const s = seatSc(st), T = (a ? a.def.T : 240) * s;
      const xs = seated ? PT.stack(a)[0] : st.x - st.f * T * 0.15, y = itemY(st.x);
      if (st.stack.length) drawStack(c, xs, y, s, st.stack);
      if (st.cup && !st.cup.held) drawCup(c, seated ? PT.cup(a)[0] : st.x - st.f * T * 0.02, y, s, st.cup, t);
      if (seated && a.plate && !(a.hold.N && a.hold.N.plate)) { const [px] = PT.plate(a); plateAt(c, px, y - 2, 50 * s, a.plate.kind, a.plate.col, false, a.plate.left, false); }
    }
    for (const sy of soys) if (!sy.held) drawSoy(c, sy.x, itemY(sy.x), beltS(sy.x));
  }
  function drawScene(c, t) {
    drawRoom(c, t); drawLanterns(c, t, false);
    // chef behind the bar
    drawBody(c, chef, false);
    drawBar(c, t);
    // aisle (people walking in/out, standing up, the waitress) — sorted back to front
    const aisle = actors.filter((a) => a.layer === 'aisle' && a.state !== 'gone');
    if (!waitress.armsFront) aisle.push(waitress);
    for (const a of aisle) drawBody(c, a, true);
    if (waitress.armsFront) drawBody(c, waitress, false);
    for (const st of SEATS) drawStool(c, st.x, seatSc(st), st.f);
    const seated = actors.filter((a) => a.layer === 'seat').sort((a, b) => (a.f === b.f ? (a.f > 0 ? b.hx - a.hx : a.hx - b.hx) : 0));
    for (const a of seated) { drawProp(c, a, a.R); drawBody(c, a, false); }
    drawLedges(c); seatItems(c, t);
    drawBelt(c, t, beltOff);
    const vis = plates.filter((p) => p.vis).sort((p, q) => p.x - q.x);
    for (const p of vis) plateAt(c, p.x, p.y, 60 * beltS(p.x), p.kind, p.col, p.dome, 2, !!p.special);
    drawUnderCounter(c);
    // arms pass (hands reach over the belt / ledge)
    drawArms(c, chef);
    for (const a of seated) drawArms(c, a);
    if (waitress.armsFront) drawArms(c, waitress);
    drawLanterns(c, t, true); drawGlow(c, t); drawShafts(c, t);
    drawEffects(c);
    for (const a of actors) drawBubble(c, a); drawBubble(c, chef); drawBubble(c, waitress);
  }

  function makeGrain() {
    const n = 192, [cv, x] = hiCanvas(n, n, 1), img = x.createImageData(n, n), r = mulberry32(5);
    for (let i = 0; i < n * n; i++) { const v = r() < 0.5 ? 0 : 255, a = (r() * 0.9) * 255; img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = a; }
    x.putImageData(img, 0, 0); return cv;
  }
  function resize(w, h, d) {
    W = w; H = h; D = d;
    if (W / H < 1.3) { k = H / BH; oy = 0; ox = W / 2 - 640 * k; }
    else { k = (W / BW) * 1.03; oy = W / H >= BW / BH ? (H - BH * k) * 0.45 : 0; ox = (W - BW * k) / 2; }
    extraB = Math.max(0, (H - (oy + BH * k)) / k);
    panR = W / H < 1.3 ? Math.max(0, (BW * k - W) / 2 / k - 30) : 0; // portrait: slow pan between the two counters
    vign = (() => { const [cv, x] = hiCanvas(W, H, 1); const g = x.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.4, W / 2, H * 0.5, Math.max(W, H) * 0.8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,10,20,0.32)'); x.fillStyle = g; x.fillRect(0, 0, W, H); return cv; })();
    if (!grain) grain = makeGrain();
  }
  let grainPat = null, grainCtx = null, panR = 0;
  function draw(ctx, t, dt, env) {
    if (!built) { buildBelt(); P = SushiPal.at(12, Amb.st.weather || 'clear'); SushiPal.hour = 12; initSim(); built = true; }
    dt = Math.min(dt, 0.1);
    // clock: game progress (12:00 lunch -> 08:00 next morning), or debug override / time-lapse
    let hour;
    if (S.hourOverride != null) hour = S.hourOverride;
    else if (S.lapse) { S.lapseH += dt * S.lapse; hour = S.lapseH; }
    else hour = SushiPal.hourFromP(env.p || 0);
    const wth = S.weather || Amb.st.weather || 'clear';
    SushiPal.weather = wth; SushiPal.hour = hour; P = SushiPal.at(hour, wth);
    let simDt = dt * S.timeScale; while (simDt > 0) { const st = Math.min(simDt, 0.05); sim(st); stepParties(st); simDt -= st; }
    for (const e of env.events || []) if (e.type === 'clear' && e.t > lastEv) { lastEv = e.t; onClear(!!e.big, e.n || 1); }
    const cam = panR ? Math.sin(t * 0.045) * panR + (env.mx || 0) * 8 : Math.sin(t * 0.05) * 4 + (env.mx || 0) * 8;
    ctx.save(); ctx.translate(ox, oy); ctx.scale(k, k); ctx.translate(-cam, 0);
    drawScene(ctx, t);
    ctx.restore();
    // paper grain + soft vignette (screen space)
    if (grainCtx !== ctx) { grainPat = ctx.createPattern(grain, 'repeat'); grainCtx = ctx; }
    ctx.save(); ctx.globalAlpha = 0.06; ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = grainPat; ctx.translate((t * 0) | 0, 0); ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.drawImage(vign, 0, 0, W, H);
    if (Amb.st.flash) { ctx.fillStyle = `rgba(220,230,255,${Amb.st.flash * 0.18})`; ctx.fillRect(0, 0, W, H); }
    if (!env.thumb) window.__sushiGeo = { actors, plates, parties, chef, waitress, S, P, SEATS,
      setHour: (h) => { S.hourOverride = h; }, lapse: (rate, from) => { S.hourOverride = null; S.lapse = rate; if (from != null) S.lapseH = from; }, timeScale: (v) => { S.timeScale = v; },
      weather: (w) => { S.weather = w; }, spawn: () => spawnParty(false), simT: () => simT, types: () => Object.keys(TYPES) };
  }
  return { resize, draw, selfGrade: true };
}
registerStage('sushi', makeSushiGeoStage);
