/* ---- Dim Sum blocks MADE OF dim sum (FoodMass) ----
   I har gow (translucent pleated skin, pink shrimp showing through) · O siu mai (yellow wrapper, pork, orange roe)
   · T char siu bao (fluffy white bun, split top showing red pork) · S jade chive dumpling (pan-fried golden base)
   · Z char siu (lacquered red BBQ pork, charred edges, sliced) · J taro bun (lavender, swirl top) · L sesame balls. */
const DimsumFood = FoodMass({
  FOOD: [null, 'hargow', 'siumai', 'bao', 'chive', 'charsiu', 'taro', 'sesame'],
  MAIN: [null, '#f1d6cb', '#d89c74', '#f7f0e2', '#9fd2a0', '#bd3a24', '#b8a2dc', '#d08c3e'],
  soft: { hargow: 1.5, siumai: 1.2, bao: 1.6, chive: 1.4, charsiu: 0.8, taro: 1.5, sesame: 1.0 },
  glisten: { charsiu: 0.55, hargow: 0.4, chive: 0.35, sesame: 0.25 },
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
    const inner = (i, k) => [C(0.2 + hash(vr, i, k) * 0.6), C(0.22 + hash(vr, i, k + 1) * 0.56)];
    // shared form lighting: light from the upper left, shade lower right — only on exposed sides, so no cell seams
    const form = (hi, lo, w = 0.22) => {
      if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
      if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
    };
    switch (food) {
      case 'hargow': { // translucent wheat-starch skin, pink shrimp glowing through, soft pleats on top
        fill('#f1d6cb');
        if (!small) { const [cx, cy] = inner(0, 1); x.fillStyle = radial(x, cx, cy, P * 0.32, [[0, 'rgba(236,124,100,0.5)'], [0.6, 'rgba(236,124,100,0.22)'], [1, 'rgba(236,124,100,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); }
        x.fillStyle = 'rgba(255,255,255,0.14)'; ellipse(x, C(0.4), C(0.36), P * 0.26, P * 0.1, -0.3); x.fill();
        if (!(mask & N)) { x.strokeStyle = 'rgba(255,250,246,0.75)'; x.lineWidth = Math.max(1, P * 0.035); x.lineCap = 'round'; for (let i = 0; i < 3; i++) { const xx = C(0.2 + i * 0.3); x.beginPath(); x.moveTo(xx - P * 0.1, t + P * 0.2); x.quadraticCurveTo(xx, t + P * 0.04, xx + P * 0.1, t + P * 0.2); x.stroke(); } x.strokeStyle = 'rgba(190,130,118,0.3)'; x.lineWidth = Math.max(1, P * 0.02); for (let i = 0; i < 3; i++) { const xx = C(0.2 + i * 0.3); x.beginPath(); x.moveTo(xx + P * 0.08, t + P * 0.24); x.lineTo(xx + P * 0.02, t + P * 0.36); x.stroke(); } }
        form('rgba(255,255,255,0.28)', 'rgba(150,84,74,0.32)');
        break;
      }
      case 'siumai': { // pork & prawn filling in an open yellow wrapper, roe on the crown
        fill('#d89c74');
        if (!small) { const [cx, cy] = inner(0, 3); x.fillStyle = 'rgba(244,170,150,0.55)'; ellipse(x, cx, cy, P * 0.16, P * 0.1, hash(vr, 5) * 3); x.fill(); x.fillStyle = 'rgba(150,84,52,0.25)'; const [dx, dy] = inner(1, 6); ellipse(x, dx, dy, P * 0.12, P * 0.08, 0.5); x.fill(); }
        const ww = P * 0.3, wrap = (x0, y0, dx, dy, nx, ny, len) => { // pleated wonton wrapper along one exposed side, wavy inner edge
          x.fillStyle = '#e4ac36'; x.beginPath(); x.moveTo(x0, y0); const n = 4;
          for (let k = 0; k <= n; k++) { const u = k / n, d = ww * (0.75 + 0.35 * Math.sin(k * 2.1 + vr)); x.lineTo(x0 + dx * len * u + nx * d, y0 + dy * len * u + ny * d); }
          x.lineTo(x0 + dx * len, y0 + dy * len); x.closePath(); x.fill();
          x.strokeStyle = 'rgba(170,110,20,0.4)'; x.lineWidth = Math.max(1, P * 0.02); for (let k = 1; k < n; k++) { const u = k / n; x.beginPath(); x.moveTo(x0 + dx * len * u, y0 + dy * len * u); x.lineTo(x0 + dx * len * u + nx * ww * 0.7, y0 + dy * len * u + ny * ww * 0.7); x.stroke(); } };
        if (!(mask & W)) wrap(l - 2, t - 2, 0, 1, 1, 0, b - t + 4);
        if (!(mask & E)) wrap(r + 2, t - 2, 0, 1, -1, 0, b - t + 4);
        if (!(mask & S)) wrap(l - 2, b + 2, 1, 0, 0, -1, r - l + 4);
        if (!(mask & N) && !small) { const cx = C(0.5 + (hash(vr, 7) - 0.5) * 0.2), cy = t + P * 0.22; for (let i = 0; i < 6; i++) { const a = i * 1.05 + hash(vr, i, 8), d = i ? P * 0.085 : 0; x.fillStyle = '#ef7a22'; x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7, P * 0.05, 0, TAU); x.fill(); } x.fillStyle = 'rgba(255,230,190,0.75)'; x.beginPath(); x.arc(cx - P * 0.012, cy - P * 0.014, P * 0.012, 0, TAU); x.fill(); }
        form('rgba(255,236,200,0.22)', 'rgba(110,56,24,0.3)');
        break;
      }
      case 'bao': { // fluffy steamed bun; the crown splits to show lacquered pork
        fill('#f7f0e2');
        x.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(x, C(0.38), C(0.36), P * 0.24, P * 0.12, -0.3); x.fill();
        if (!(mask & N) && !small) { const cx = C(0.5 + (hash(vr, 16) - 0.5) * 0.16), cy = t + P * 0.24; x.lineCap = 'round'; // the crown cracks open in three short splits, pork showing deep inside
          for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k - 1) * 2.1 + (hash(vr, k, 17) - 0.5) * 0.4, len = P * (0.1 + hash(vr, k, 18) * 0.05), ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len * 0.6;
            x.strokeStyle = 'rgba(214,190,150,0.6)'; x.lineWidth = Math.max(1.5, P * 0.07); x.beginPath(); x.moveTo(cx, cy); x.lineTo(ex, ey); x.stroke();
            x.strokeStyle = '#8e2a1a'; x.lineWidth = Math.max(1, P * 0.035); x.beginPath(); x.moveTo(cx, cy); x.lineTo(lerp(cx, ex, 0.8), lerp(cy, ey, 0.8)); x.stroke(); } }
        form('rgba(255,255,255,0.35)', 'rgba(160,130,90,0.28)');
        break;
      }
      case 'chive': { // jade-green translucent skin, chives inside, pan-fried golden base
        fill('#9fd2a0');
        if (!small) { x.strokeStyle = 'rgba(40,110,56,0.6)'; x.lineWidth = Math.max(1, P * 0.035); x.lineCap = 'round'; for (let i = 0; i < 3; i++) { const [cx, cy] = inner(i, 9), a = hash(vr, i, 11) * 3; x.beginPath(); x.moveTo(cx - Math.cos(a) * P * 0.09, cy - Math.sin(a) * P * 0.09); x.lineTo(cx + Math.cos(a) * P * 0.09, cy + Math.sin(a) * P * 0.09); x.stroke(); } }
        x.fillStyle = 'rgba(240,255,240,0.2)'; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.26, 0, b, [[0, 'rgba(216,160,64,0)'], [0.35, '#d9a046'], [1, '#9a5e1a']]); x.fillRect(l - 2, b - P * 0.26, r - l + 4, P * 0.28); }
        form('rgba(255,255,255,0.3)', 'rgba(40,90,50,0.3)');
        break;
      }
      case 'charsiu': { // lacquered BBQ pork: deep red body, honey-glazed rim light, charred edges
        fill('#bd3a24');
        if (!small) { const xx = C(0.25 + hash(vr, 12) * 0.5); x.strokeStyle = 'rgba(120,20,10,0.4)'; x.lineWidth = Math.max(1, P * 0.03); x.beginPath(); x.moveTo(xx + P * 0.05, C(0.12)); x.lineTo(xx - P * 0.05, C(0.88)); x.stroke(); x.fillStyle = 'rgba(244,150,120,0.25)'; x.fillRect(xx + P * 0.01, C(0.15), P * 0.12, P * 0.7); }
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * 0.3, [[0, '#ffb070'], [0.25, 'rgba(240,120,70,0.7)'], [1, 'rgba(200,60,30,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * 0.32); x.fillStyle = 'rgba(255,240,215,0.75)'; x.fillRect(C(0.12), t + P * 0.06, P * 0.5, Math.max(1, P * 0.03)); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * 0.16, 0, [[0, 'rgba(255,160,110,0.65)'], [1, 'rgba(255,160,110,0)']]); x.fillRect(l - 2, t - 2, P * 0.18, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * 0.22, 0, r, 0, [[0, 'rgba(60,8,4,0)'], [1, 'rgba(60,8,4,0.7)']]); x.fillRect(r - P * 0.22, t - 2, P * 0.24, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * 0.22, 0, b, [[0, 'rgba(60,8,4,0)'], [1, 'rgba(60,8,4,0.7)']]); x.fillRect(l - 2, b - P * 0.22, r - l + 4, P * 0.24); }
        break;
      }
      case 'taro': { // soft lavender taro bun: smooth dough with fine flecks, domed highlight
        fill('#b8a2dc');
        if (!small) { x.fillStyle = 'rgba(120,90,170,0.3)'; for (let i = 0; i < 5; i++) { const [cx, cy] = inner(i, 13); x.fillRect(cx, cy, Math.max(1, P * 0.02), Math.max(1, P * 0.02)); } }
        x.fillStyle = 'rgba(255,255,255,0.22)'; ellipse(x, C(0.38), C(0.34), P * 0.24, P * 0.12, -0.3); x.fill();
        form('rgba(255,255,255,0.3)', 'rgba(70,40,120,0.3)');
        break;
      }
      case 'sesame': { // fried sesame balls: golden crisp shell covered in seeds
        fill('#d08c3e');
        x.fillStyle = 'rgba(255,226,160,0.35)'; ellipse(x, C(0.36), C(0.32), P * 0.24, P * 0.14, -0.4); x.fill();
        x.fillStyle = '#f6ead0'; for (let i = 0; i < (small ? 6 : 16); i++) { const cx = C(0.08 + hash(vr, i, 13) * 0.84), cy = C(0.08 + hash(vr, i, 14) * 0.84); ellipse(x, cx, cy, Math.max(0.8, P * 0.034), Math.max(0.5, P * 0.018), hash(i, vr, 15) * 3); x.fill(); }
        form('rgba(255,236,190,0.3)', 'rgba(90,40,10,0.35)');
        break;
      }
    }
  },
  live(c, food, o) {
    const { s, mask, seed, T, small, hash } = o;
    if (small || (mask & FM_N) || food === 'charsiu' || food === 'sesame') return;
    // a soft puff of steam now and then (no hooks or squiggles)
    const u = (T * 0.22 + hash(seed, 1)) % 1; if (u > 0.7) return;
    const x0 = (hash(seed, 2) - 0.5) * s * 0.4 + Math.sin(T * 1.3 + seed) * s * 0.06, y0 = -s * 0.45 - u * s * 0.7, rr = s * (0.14 + u * 0.22);
    c.globalAlpha = (o.alpha ?? 1) * Math.sin((u / 0.7) * Math.PI) * 0.3;
    c.fillStyle = radial(c, x0, y0, rr, [[0, 'rgba(255,255,255,0.9)'], [1, 'rgba(255,255,255,0)']]); c.fillRect(x0 - rr, y0 - rr, rr * 2, rr * 2);
    c.globalAlpha = o.alpha ?? 1;
  },
  clear(food, q) {
    const { v, X, Y, s, r, vr, push, dir } = q, col = DimsumFood.MAIN[v];
    if (food === 'sesame') { push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2 + r(1) * 2), vy: -s * 1.2, rot: 0, vr: dir * 6, life: 0.9, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'dot', col: '#fff6e0', r: 0.035, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * (1 + r(i) * 3), life: 0.6 }); return true; }
    push({ k: food === 'charsiu' ? 'slide' : 'squish', v, x: X, y: Y, vx: dir * s * (1.2 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1 + r(3) * 2), life: 0.8, vrr: vr });
    if (food !== 'charsiu') for (let i = 0; i < 3; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.6, y: Y - s * 0.3, vx: (r(i) - 0.5) * s, vy: -s * (1.5 + r(i + 13) * 1.5), g: -1, life: 0.9, r: 0.09 + r(i) * 0.06 });
    else for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? '#7a1a12' : '#e88a6a', r: 0.05, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 3, vy: -s * (1.5 + r(i) * 2), life: 0.6 });
    void col; return true;
  },
});
SKINSETS.dimsum = DimsumFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'dimsum'); if (st) { st.palette = DimsumFood.MAIN.slice(1); st.desc = 'Flat geometric banquet hall: the dragon & phoenix wall, an auntie with a steaming trolley, tea poured and lids flipped for refills — guzheng and erhu.'; } })();
