/* ---- Mike's Pastry blocks MADE OF pastry (FoodMass) ----
   I cannoli (one long blistered shell, ricotta + chips at the open ends) · O Boston cream pie (sponge, custard, glossy
   chocolate top) · T strawberry cheesecake (pink mousse, glaze, berries, graham crust) · S pistachio cream (chopped nuts)
   · Z chocolate fudge cake (layers, ganache, shavings) · J lavender macarons (stacked shells & filling) · L napoleon
   (puff layers, vanilla cream, feathered fondant). */
const PastryFood = FoodMass({
  FOOD: [null, 'cannoli', 'boston', 'cheesecake', 'pistachio', 'fudge', 'macaron', 'napoleon'],
  MAIN: [null, '#d89a48', '#f2c84a', '#f2789a', '#9ccb5a', '#5a2c1a', '#b4a2ea', '#f6efe2'],
  soft: { boston: 1.5, cheesecake: 1.5, pistachio: 1.3, fudge: 1.1, macaron: 1.0, napoleon: 0.9, cannoli: 0.6 },
  glisten: { fudge: 0.5, cheesecake: 0.45, boston: 0.35 },
  sprites(P) {
    const o = {}; const r = Math.max(2, P * 0.16), n = Math.ceil(r * 2.6), c = makeCanvas(n, n), X = c.getContext('2d'), m = n / 2;
    X.fillStyle = '#c8202e'; X.beginPath(); X.moveTo(m, m + r); X.quadraticCurveTo(m - r * 1.1, m, m - r * 0.7, m - r * 0.6); X.quadraticCurveTo(m, m - r * 1.05, m + r * 0.7, m - r * 0.6); X.quadraticCurveTo(m + r * 1.1, m, m, m + r); X.fill();
    X.fillStyle = '#ff6a6a'; X.beginPath(); X.arc(m - r * 0.25, m - r * 0.25, r * 0.3, 0, TAU); X.fill();
    X.fillStyle = '#fff2a0'; for (let i = 0; i < 5; i++) X.fillRect(m - r * 0.5 + (i % 3) * r * 0.45, m - r * 0.1 + Math.floor(i / 3) * r * 0.4, Math.max(1, r * 0.12), Math.max(1, r * 0.16));
    X.fillStyle = '#3a8a2a'; X.beginPath(); X.moveTo(m - r * 0.5, m - r * 0.75); X.lineTo(m, m - r * 0.5); X.lineTo(m + r * 0.5, m - r * 0.75); X.lineTo(m, m - r * 1.05); X.fill();
    o.berry = c; return o;
  },
  paint(x, food, Q) {
    const { P, mask, cut, vr, small, l, t, r, b, C, band, hash, poly, N, E, S, W } = Q;
    const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
    const specks = (n, col, sz, key) => { x.fillStyle = col; for (let i = 0; i < n; i++) { const q = Math.max(1, P * sz * (0.6 + hash(key, i, 9) * 0.8)); x.fillRect(C(hash(key, i, 1)), C(hash(key, i, 2)), q, q); } };
    switch (food) {
      case 'cannoli': {
        const horiz = (mask & (E | W)) || !(mask & (N | S));
        // one long shell: highlight band on the light side, deep shade on the far side, blistered surface
        fill('#c88638');
        if (horiz) { band(C(0.06), P * 0.2, '#e4ac5c'); band(C(0.12), P * 0.06, '#f2c880'); band(C(0.72), P * 0.3, '#9a5a22'); }
        else { x.fillStyle = '#e4ac5c'; x.fillRect(C(0.06), t - 2, P * 0.2, b - t + 4); x.fillStyle = '#f2c880'; x.fillRect(C(0.12), t - 2, P * 0.06, b - t + 4); x.fillStyle = '#9a5a22'; x.fillRect(C(0.72), t - 2, P * 0.3, b - t + 4); }
        x.fillStyle = 'rgba(110,50,10,0.55)'; for (let i = 0; i < (small ? 4 : 11); i++) { ellipse(x, C(0.1 + hash(vr, i, 3) * 0.8), C(0.15 + hash(vr, i, 4) * 0.7), P * 0.035, P * 0.024, hash(i, vr) * 3); x.fill(); }
        x.fillStyle = 'rgba(255,220,160,0.5)'; for (let i = 0; i < (small ? 2 : 6); i++) { ellipse(x, C(0.1 + hash(vr, i, 5) * 0.8), C(0.1 + hash(vr, i, 6) * 0.6), P * 0.03, P * 0.018, 0.3); x.fill(); }
        // ricotta + chocolate chips spilling from the open ends of the tube
        const end = (cx, cy, rx, ry) => { ellipse(x, cx, cy, rx, ry); x.fillStyle = '#fbf6ea'; x.fill(); ellipse(x, cx + rx * 0.15, cy + ry * 0.15, rx * 0.75, ry * 0.75); x.fillStyle = '#efe6d2'; x.fill(); x.fillStyle = '#3a1e12'; for (let i = 0; i < 5; i++) x.fillRect(cx + (hash(i, vr, 7) - 0.5) * rx * 1.3, cy + (hash(vr, i, 8) - 0.5) * ry * 1.3, Math.max(1, P * 0.05), Math.max(1, P * 0.045)); };
        if (horiz) { if (!(mask & W)) end(l + P * 0.12, C(0.5), P * 0.18, P * 0.4); if (!(mask & E)) end(r - P * 0.12, C(0.5), P * 0.18, P * 0.4); }
        else { if (!(mask & N)) end(C(0.5), t + P * 0.12, P * 0.4, P * 0.18); if (!(mask & S)) end(C(0.5), b - P * 0.12, P * 0.4, P * 0.18); }
        specks(small ? 5 : 14, 'rgba(255,255,255,0.85)', 0.022, vr + 3); // powdered sugar
        break;
      }
      case 'boston': {
        fill('#f4cf62');
        for (let k = 0; k < 2; k++) { band(C(0.42 + k * 0.5) - P * 0.05, P * 0.1, '#fbe9a8'); band(C(0.42 + k * 0.5) + P * 0.05, P * 0.025, '#e2b04a'); } // custard layers
        x.fillStyle = 'rgba(200,150,40,0.35)'; for (let i = 0; i < (small ? 3 : 9); i++) { ellipse(x, C(hash(vr, i, 1)), C(hash(vr, i, 2)), P * 0.02, P * 0.014); x.fill(); } // crumb pores
        if (!(mask & N)) { band(t - 2, P * 0.24, '#4a2414'); x.fillStyle = '#4a2414'; for (let i = 0; i < 3; i++) { const dx = C(0.15 + i * 0.32 + hash(vr, i) * 0.08); x.beginPath(); x.moveTo(dx - P * 0.06, t + P * 0.2); x.quadraticCurveTo(dx, t + P * (0.36 + hash(i, vr) * 0.12), dx + P * 0.06, t + P * 0.2); x.fill(); }
          x.fillStyle = 'rgba(255,230,200,0.45)'; poly(x, [C(0.1), t + P * 0.05, C(0.6), t + P * 0.05, C(0.5), t + P * 0.1, C(0.08), t + P * 0.1]); x.fill(); }
        if (!(mask & S)) band(b - P * 0.09, P * 0.09, '#d39a3a');
        break;
      }
      case 'cheesecake': {
        fill('#f38aa6');
        x.strokeStyle = 'rgba(255,220,230,0.6)'; x.lineWidth = Math.max(1, P * 0.035); x.beginPath(); x.moveTo(C(-0.1), C(0.55)); x.bezierCurveTo(C(0.3), C(0.3), C(0.6), C(0.8), C(1.1), C(0.5)); x.stroke(); // mousse swirl, continuous at the edges
        x.strokeStyle = 'rgba(200,60,100,0.25)'; x.beginPath(); x.moveTo(C(-0.1), C(0.75)); x.bezierCurveTo(C(0.35), C(0.55), C(0.55), C(0.95), C(1.1), C(0.75)); x.stroke();
        if (!(mask & N)) { band(t - 2, P * 0.2, '#d8233a'); band(t + P * 0.16, P * 0.04, '#a8102a'); x.fillStyle = 'rgba(255,200,200,0.55)'; x.fillRect(C(0.12), t + P * 0.04, P * 0.4, Math.max(1, P * 0.04)); }
        if (!(mask & S)) { band(b - P * 0.16, P * 0.16, '#b07a46'); x.fillStyle = 'rgba(90,50,20,0.4)'; for (let i = 0; i < 6; i++) x.fillRect(C(hash(vr, i, 3)), b - P * (0.04 + hash(i, vr) * 0.1), Math.max(1, P * 0.04), Math.max(1, P * 0.03)); }
        if (small && !(mask & N)) { const sp = Q.sprites().berry; x.drawImage(sp, C(0.5) - sp.width / 2, t + P * 0.05 - sp.height / 2); }
        break;
      }
      case 'pistachio': {
        fill('#a6cf68');
        x.fillStyle = 'rgba(255,255,240,0.35)'; for (let i = 0; i < 3; i++) { ellipse(x, C(hash(vr, i, 1)), C(hash(vr, i, 2)), P * 0.2, P * 0.08, hash(i, vr) * 3); x.fill(); } // ricotta swirl
        for (let i = 0; i < (small ? 5 : 12); i++) { const px = C(hash(vr, i, 4)), py = C(hash(vr, i, 5)), q = P * (0.035 + hash(i, vr, 6) * 0.03); x.fillStyle = i % 3 === 0 ? '#7a4a6a' : i % 3 === 1 ? '#4e8a2a' : '#c8e08a'; poly(x, [px - q, py, px, py - q * 0.8, px + q, py + q * 0.2, px + q * 0.1, py + q]); x.fill(); } // chopped pistachios with purple skins
        if (!(mask & N)) { band(t - 2, P * 0.08, '#c4e290'); }
        if (!(mask & S)) band(b - P * 0.08, P * 0.08, '#7aa844');
        break;
      }
      case 'fudge': {
        fill('#5a2c1a');
        for (let k = 0; k < 3; k++) band(C(0.3 + k * 0.333), P * 0.06, '#7a4428'); // cake / frosting layers (period 1/3)
        for (let k = 0; k < 3; k++) band(C(0.3 + k * 0.333) + P * 0.06, P * 0.02, '#3a1a0e');
        if (!(mask & N)) { band(t - 2, P * 0.16, '#2e140a'); x.fillStyle = 'rgba(255,220,190,0.35)'; poly(x, [C(0.1), t + P * 0.04, C(0.62), t + P * 0.04, C(0.54), t + P * 0.09, C(0.08), t + P * 0.09]); x.fill();
          x.fillStyle = '#8a5434'; for (let i = 0; i < (small ? 2 : 5); i++) { x.save(); x.translate(C(0.15 + hash(vr, i) * 0.7), t + P * 0.07); x.rotate(hash(i, vr) * 3); x.fillRect(-P * 0.06, -P * 0.015, P * 0.12, Math.max(1, P * 0.03)); x.restore(); } }
        if (!(mask & S)) band(b - P * 0.07, P * 0.07, '#2a1208');
        break;
      }
      case 'macaron': {
        fill('#f6eefa');
        for (let k = 0; k < 2; k++) { // two macarons per cell, stacked: shell / ruffled foot / filling / foot / shell
          const y0 = C(k * 0.5);
          x.fillStyle = '#b4a2ea'; x.fillRect(l - 2, y0 + P * 0.02, r - l + 4, P * 0.16); x.fillStyle = '#c8baf2'; x.fillRect(l - 2, y0 + P * 0.04, r - l + 4, P * 0.05);
          x.fillStyle = '#9a86d8'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(C(i / 8), y0 + P * 0.2, P * 0.035, 0, TAU); x.fill(); }
          x.fillStyle = '#fbf6fc'; x.fillRect(l - 2, y0 + P * 0.23, r - l + 4, P * 0.06); x.fillStyle = '#6a3a8a'; x.fillRect(l - 2, y0 + P * 0.255, r - l + 4, Math.max(1, P * 0.015));
          x.fillStyle = '#9a86d8'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(C(i / 8 + 0.06), y0 + P * 0.32, P * 0.035, 0, TAU); x.fill(); }
          x.fillStyle = '#a894e2'; x.fillRect(l - 2, y0 + P * 0.33, r - l + 4, P * 0.15);
        }
        break;
      }
      case 'napoleon': {
        fill('#fbf0d6');
        for (let k = 0; k < 2; k++) { const y0 = C(k * 0.5 + 0.25); band(y0, P * 0.14, '#dca866'); x.strokeStyle = 'rgba(140,80,30,0.5)'; x.lineWidth = Math.max(0.8, P * 0.015); x.beginPath(); for (let i = 0; i < 3; i++) { x.moveTo(l - 2, y0 + P * (0.035 + i * 0.04)); x.lineTo(r + 2, y0 + P * (0.035 + i * 0.04)); } x.stroke(); }
        x.fillStyle = 'rgba(240,210,120,0.35)'; for (let k = 0; k < 2; k++) x.fillRect(l - 2, C(k * 0.5 + 0.06), r - l + 4, P * 0.1);
        if (!(mask & N)) { band(t - 2, P * 0.2, '#fffaf2'); x.strokeStyle = '#5a3420'; x.lineWidth = Math.max(1, P * 0.025); x.beginPath(); for (let i = -1; i < 6; i++) { x.moveTo(C(i * 0.22), t + P * 0.04); x.lineTo(C(i * 0.22 + 0.11), t + P * 0.15); x.lineTo(C(i * 0.22 + 0.22), t + P * 0.04); } x.stroke(); }
        if (!(mask & S)) band(b - P * 0.08, P * 0.08, '#b88040');
        break;
      }
    }
  },
  live(c, food, o) {
    if (o.small) return; const { s, k, mask, seed, T, wob } = o;
    if (food === 'cheesecake' && !(mask & FM_N)) { const sp = o.spr.berry, w = sp.width * k; for (let i = 0; i < 2; i++) { const bx = (i ? 0.22 : -0.2) * s, by = -0.36 * s + Math.sin(T * 3.3 + seed + i * 2) * (0.015 + wob * 0.05) * s; c.save(); c.translate(bx, by); c.rotate(Math.sin(T * 2.1 + seed * 1.7 + i) * (0.08 + wob * 0.3)); c.drawImage(sp, -w / 2, -w / 2, w, w); c.restore(); } }
    else if (food === 'cannoli') { const tw = (T * 0.8 + seed * 0.41) % 2.6; if (tw < 0.35) { const a = Math.sin(tw / 0.35 * Math.PI); c.fillStyle = `rgba(255,255,255,${a})`; const px = (o.hash(seed, 1) - 0.5) * s * 0.6, py = (o.hash(seed, 2) - 0.5) * s * 0.5; c.fillRect(px - s * 0.05, py - 0.5, s * 0.1, 1.2); c.fillRect(px - 0.5, py - s * 0.05, 1.2, s * 0.1); } }
  },
  clear(food, q) {
    const { v, X, Y, s, dir, r, vr, push } = q;
    if (food === 'cannoli') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1.2, rot: 0, vr: dir * 3, life: 0.8, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'crumb', col: i % 2 ? '#e4ac5c' : '#fbf6ea', x: X, y: Y, vx: (r(i) - 0.5) * s * 7, vy: -s * (2 + r(i + 3) * 4), life: 0.7 }); return true; }
    if (food === 'boston' || food === 'pistachio') { push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45 }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: food === 'boston' ? '#f4cf62' : '#a6cf68', x: X, y: Y, vx: (r(i) - 0.5) * s * 6, vy: -s * (2 + r(i + 3) * 3), life: 0.6 }); return true; }
    if (food === 'cheesecake') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.25 }); for (let i = 0; i < 2; i++) push({ k: 'spr', img: 'berry', x: X, y: Y - s * 0.3, vx: (r(i) - 0.5) * s * 6, vy: -s * (4 + r(i + 4) * 3), vr: (r(i + 2) - 0.5) * 10, life: 0.9 }); return true; }
    if (food === 'fudge') { push({ k: 'melt', v, x: X, y: Y, vr, life: 0.5 }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: '#3a1a0e', x: X, y: Y, vx: (r(i) - 0.5) * s * 5, vy: -s * (1.5 + r(i + 3) * 3), life: 0.6 }); return true; }
    if (food === 'macaron') { push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (3 + r(1) * 2), vy: -s * 1.5, rot: 0, life: 0.9, vrr: vr }); return true; }
    if (food === 'napoleon') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1.5 + r(3) * 2), life: 0.85, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'dot', col: '#ffffff', r: 0.04, x: X + (r(i + 5) - 0.5) * s, y: Y - s * 0.3, vx: (r(i) - 0.5) * s * 3, vy: -s * (1 + r(i + 1) * 2), g: 3, life: 0.8 }); return true; }
    return false;
  },
});
SKINSETS.pastry = PastryFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'mikes'); if (st) { st.palette = PastryFood.MAIN.slice(1); st.desc = 'Flat geometric North End: a long glass case, string spools, Sal at the register, Gina tying boxes and a marble table by the Hanover Street window — mandolin and accordion.'; } })();
