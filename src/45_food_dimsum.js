/* ---- Dim Sum blocks MADE OF dim sum (FoodMass) ----
   I har gow (translucent pleated skin, pink shrimp showing through) · O siu mai (yellow wrapper, pork, orange roe)
   · T char siu bao (fluffy white bun, split top showing red pork) · S jade chive dumpling (pan-fried golden base)
   · Z char siu (lacquered red BBQ pork, charred edges, sliced) · J taro bun (lavender, swirl top) · L sesame balls. */
const DimsumFood = FoodMass({
  FOOD: [null, 'hargow', 'siumai', 'bao', 'chive', 'charsiu', 'taro', 'sesame'],
  MAIN: [null, '#f2c8bc', '#f2c03a', '#f8f2e4', '#7cce8c', '#c4322a', '#b49ae0', '#d08a3a'],
  soft: { hargow: 1.5, siumai: 1.2, bao: 1.6, chive: 1.4, charsiu: 0.8, taro: 1.5, sesame: 1.0 },
  glisten: { charsiu: 0.55, hargow: 0.4, chive: 0.35, sesame: 0.25 },
  paint(x, food, Q) {
    const { P, mask, vr, small, l, t, r, b, C, band, hash, poly, N, E, S, W } = Q;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const grad = (a, m, z) => { x.fillStyle = linear(x, 0, t, 0, b, [[0, a], [0.5, m], [1, z]]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const specks = (n, col, sz, key, rx = 1, ry = 1) => { x.fillStyle = col; for (let i = 0; i < n; i++) { const q = Math.max(1, P * sz * (0.6 + hash(key, i, 9) * 0.8)); x.fillRect(C(hash(key, i, 1) * rx), C(hash(key, i, 2) * ry), q, q); } };
    const edgeShade = (col, w) => { x.fillStyle = col; if (!(mask & S)) x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); if (!(mask & E)) x.fillRect(r - P * w * 0.7, t - 2, P * w * 0.7 + 2, b - t + 4); };
    const edgeHi = (col, w) => { x.fillStyle = col; if (!(mask & N)) x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); if (!(mask & W)) x.fillRect(l - 2, t - 2, P * w * 0.7 + 2, b - t + 4); };
    switch (food) {
      case 'hargow': {
        grad('#fbe8e0', '#f2cfc4', '#e2b0a4');
        // pink shrimp curls glowing through the translucent skin
        for (let i = 0; i < (small ? 1 : 2); i++) { const cx = C(0.3 + hash(vr, i, 1) * 0.4), cy = C(0.38 + hash(vr, i, 2) * 0.3), rr = P * 0.2; x.strokeStyle = 'rgba(240,120,96,0.55)'; x.lineWidth = P * 0.13; x.beginPath(); x.arc(cx, cy, rr, 0.4 + i, 3.9 + i); x.stroke(); x.strokeStyle = 'rgba(255,190,170,0.6)'; x.lineWidth = P * 0.04; x.beginPath(); x.arc(cx, cy, rr, 0.6 + i, 3.4 + i); x.stroke(); }
        x.fillStyle = 'rgba(255,255,255,0.28)'; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); // the skin over it
        if (!(mask & N)) { // the pleated crest
          x.fillStyle = '#fdf2ec'; x.beginPath(); x.moveTo(l - 2, t + P * 0.3); for (let i = 0; i <= 5; i++) { const xx = lerp(C(0), C(1), i / 5); x.lineTo(xx - P * 0.1, t + P * 0.06); x.lineTo(xx, t + P * 0.3); } x.lineTo(r + 2, t + P * 0.34); x.lineTo(l - 2, t + P * 0.34); x.fill();
          x.strokeStyle = 'rgba(200,140,130,0.5)'; x.lineWidth = Math.max(1, P * 0.025); x.beginPath(); for (let i = 0; i < 5; i++) { const xx = lerp(C(0), C(1), (i + 0.5) / 5); x.moveTo(xx, t + P * 0.1); x.lineTo(xx - P * 0.06, t + P * 0.42); } x.stroke();
        }
        edgeShade('rgba(170,100,90,0.25)', 0.12);
        break;
      }
      case 'siumai': {
        fill('#e6ae84'); // minced pork + prawn
        specks(small ? 6 : 16, 'rgba(160,80,50,0.5)', 0.05, vr + 1); specks(small ? 3 : 8, 'rgba(255,220,190,0.6)', 0.04, vr + 2);
        const w = P * 0.2; x.fillStyle = '#f2c03a'; // the yellow wonton wrapper around the exposed sides
        if (!(mask & W)) x.fillRect(l - 2, t - 2, w + 2, b - t + 4); if (!(mask & E)) x.fillRect(r - w, t - 2, w + 2, b - t + 4); if (!(mask & S)) x.fillRect(l - 2, b - w * 1.3, r - l + 4, w * 1.3 + 2);
        x.fillStyle = '#d89e1e'; if (!(mask & S)) for (let i = 0; i < 4; i++) x.fillRect(C(0.12 + i * 0.25), b - w * 1.3, Math.max(1, P * 0.03), w * 1.3);
        if (!(mask & W)) x.fillRect(l + w * 0.6, t - 2, Math.max(1, P * 0.03), b - t + 4);
        if (!(mask & N)) { band(t - 2, P * 0.08 + 2, '#f6cf5a'); x.fillStyle = '#ff7a1a'; for (let i = 0; i < (small ? 3 : 7); i++) { x.beginPath(); x.arc(C(0.32 + hash(vr, i, 3) * 0.36), C(0.22 + hash(vr, i, 4) * 0.18), P * 0.05, 0, TAU); x.fill(); } if (!small) { x.fillStyle = '#ffc080'; x.fillRect(C(0.42), C(0.24), P * 0.03, P * 0.03); } }
        break;
      }
      case 'bao': {
        grad('#fffbf2', '#f8f0e2', '#e8dcc6');
        x.fillStyle = 'rgba(255,255,255,0.6)'; ellipse(x, C(0.35), C(0.35), P * 0.22, P * 0.12, -0.3); x.fill();
        specks(small ? 0 : 5, 'rgba(200,180,150,0.35)', 0.025, vr + 4);
        if (!(mask & N)) { // the split crown showing red char siu
          x.fillStyle = '#9a1e18'; x.beginPath(); x.moveTo(C(0.12), t + P * 0.12); x.lineTo(C(0.3), t + P * 0.28); x.lineTo(C(0.5), t + P * 0.1); x.lineTo(C(0.7), t + P * 0.3); x.lineTo(C(0.88), t + P * 0.12); x.lineTo(C(0.7), t + P * 0.2); x.lineTo(C(0.5), t + P * 0.02); x.lineTo(C(0.3), t + P * 0.2); x.fill();
          x.fillStyle = '#d8402e'; x.fillRect(C(0.44), t + P * 0.08, P * 0.1, P * 0.06);
        }
        edgeShade('rgba(170,140,100,0.25)', 0.14);
        break;
      }
      case 'chive': {
        grad('#b4e8b8', '#86d296', '#5cae70');
        x.fillStyle = 'rgba(30,110,50,0.75)'; for (let i = 0; i < (small ? 4 : 10); i++) { const cx = C(0.1 + hash(vr, i, 5) * 0.8), cy = C(0.1 + hash(vr, i, 6) * 0.8); x.save(); x.translate(cx, cy); x.rotate(hash(i, vr, 7) * 3); x.fillRect(-P * 0.09, -P * 0.015, P * 0.18, Math.max(1, P * 0.035)); x.restore(); }
        x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
        if (!(mask & S)) { band(b - P * 0.22, P * 0.24, '#d89a3a'); band(b - P * 0.22, Math.max(1, P * 0.05), '#f0c060'); specks(small ? 2 : 5, 'rgba(140,70,20,0.6)', 0.04, vr + 8); }
        if (!(mask & N)) { x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = Math.max(1, P * 0.04); x.beginPath(); x.moveTo(C(0.1), t + P * 0.16); x.quadraticCurveTo(C(0.5), t + P * 0.04, C(0.9), t + P * 0.16); x.stroke(); }
        break;
      }
      case 'charsiu': {
        grad('#d8442e', '#c4322a', '#9a2018');
        // slices: pink cut faces separated by lacquered seams
        for (let i = 0; i < 3; i++) { const xx = C(0.08 + i * 0.33); x.fillStyle = 'rgba(240,140,120,0.35)'; poly(x, [xx, C(0.18), xx + P * 0.2, C(0.12), xx + P * 0.22, C(0.88), xx + P * 0.02, C(0.92)]); x.fill(); }
        x.strokeStyle = 'rgba(80,10,6,0.55)'; x.lineWidth = Math.max(1, P * 0.04); x.beginPath(); for (let i = 1; i < 3; i++) { const xx = C(i * 0.33); x.moveTo(xx, t - 2); x.lineTo(xx - P * 0.05, b + 2); } x.stroke();
        x.fillStyle = 'rgba(90,14,8,0.85)'; const w = P * 0.13; if (!(mask & N)) x.fillRect(l - 2, t - 2, r - l + 4, w + 2); if (!(mask & S)) x.fillRect(l - 2, b - w, r - l + 4, w + 2); if (!(mask & E)) x.fillRect(r - w, t - 2, w + 2, b - t + 4); if (!(mask & W)) x.fillRect(l - 2, t - 2, w + 2, b - t + 4);
        x.fillStyle = 'rgba(40,6,4,0.7)'; for (let i = 0; i < (small ? 2 : 6); i++) { const cx = C(hash(vr, i, 9)), cy = C(hash(vr, i, 10)); if ((cx - l < w * 1.4) || (r - cx < w * 1.4) || (cy - t < w * 1.4) || (b - cy < w * 1.4)) { ellipse(x, cx, cy, P * 0.05, P * 0.03); x.fill(); } } // char
        x.fillStyle = 'rgba(255,200,170,0.45)'; x.fillRect(C(0.12), C(0.2), P * 0.5, Math.max(1, P * 0.04)); // honey glaze
        break;
      }
      case 'taro': {
        grad('#cbb8f0', '#b49ae0', '#9078c4');
        specks(small ? 4 : 14, 'rgba(110,80,160,0.5)', 0.025, vr + 11); specks(small ? 2 : 8, 'rgba(255,255,255,0.5)', 0.02, vr + 12);
        if (!(mask & N)) { x.strokeStyle = 'rgba(255,255,255,0.65)'; x.lineWidth = Math.max(1, P * 0.045); x.beginPath(); x.arc(C(0.5), t + P * 0.3, P * 0.16, Math.PI * 1.1, Math.PI * 2.6); x.stroke(); x.beginPath(); x.arc(C(0.5), t + P * 0.3, P * 0.06, 0, TAU); x.stroke(); }
        edgeHi('rgba(255,255,255,0.18)', 0.12); edgeShade('rgba(60,30,110,0.22)', 0.12);
        break;
      }
      case 'sesame': {
        grad('#eab05a', '#d08a3a', '#a8601e');
        x.fillStyle = 'rgba(255,230,170,0.4)'; ellipse(x, C(0.35), C(0.3), P * 0.25, P * 0.15, -0.4); x.fill();
        x.fillStyle = '#fff6e0'; for (let i = 0; i < (small ? 8 : 26); i++) { const cx = C(0.05 + hash(vr, i, 13) * 0.9), cy = C(0.05 + hash(vr, i, 14) * 0.9); ellipse(x, cx, cy, Math.max(0.8, P * 0.04), Math.max(0.5, P * 0.022), hash(i, vr, 15) * 3); x.fill(); }
        edgeShade('rgba(90,40,10,0.3)', 0.14);
        break;
      }
    }
  },
  live(c, food, o) {
    const { s, mask, seed, T, wob, small, hash } = o;
    if (small || (mask & FM_N) || food === 'charsiu' || food === 'sesame') return;
    // steam curling off the top of the steamer-fresh pieces
    c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = Math.max(1, s * 0.05); c.lineCap = 'round';
    for (let i = 0; i < 2; i++) { const u = (T * 0.45 + hash(seed, i)) % 1; if (u > 0.85) continue; const x0 = (hash(i, seed) - 0.5) * s * 0.6, y0 = -s * 0.5 - u * s * 0.55; c.globalAlpha = (o.alpha ?? 1) * Math.sin(u * Math.PI) * 0.8; c.beginPath(); c.moveTo(x0, y0 + s * 0.16); c.quadraticCurveTo(x0 + Math.sin(T * 2 + i) * s * 0.12, y0 + s * 0.08, x0 + Math.sin(T * 2.4 + i + 1) * s * 0.06, y0 - s * 0.04); c.stroke(); }
    c.globalAlpha = o.alpha ?? 1; void wob;
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
