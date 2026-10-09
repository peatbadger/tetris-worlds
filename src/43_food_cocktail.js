/* ---- Speakeasy blocks MADE OF DRINKS (FoodMass) — v2: real liquid in glass ----
   Each piece is one glass vessel filled with liquid: flat clear body (no cell seams), a meniscus that curls up at the
   walls with empty glass above it, refraction tint along the lit wall, a darker far wall, a thick tinted glass base,
   clear ice that pokes above the surface, live rising bubbles / bead streams and a gentle slosh.
   I pint of lager (creamy foam head, lacing) · O old fashioned (big clear cube, orange-peel twist) · T negroni (clear
   cube, orange half-wheel) · S red wine (legs on the glass) · Z mojito (crushed ice, muddled mint, lime)
   · J martini (olive on a pick) · L champagne (bead streams). No dots, insets or clip-art marks. */
const CocktailFood = (() => {
  // body, surface/light tint, deep tint
  const LQ = { beer: ['#d38a1c', '#f3bd52', '#8e520a'], oldfash: ['#a2501c', '#d68a48', '#5a2608'], negroni: ['#b02a1c', '#e2603a', '#6a120c'], wine: ['#5c0f28', '#9a2c4c', '#30040f'], mojito: ['#bcd59a', '#e2efc8', '#7c9e5a'], martini: ['#c9d6d0', '#eef4ee', '#8fa29c'], champagne: ['#e6c874', '#f8e6a8', '#b8963e'] };
  const BUB = { beer: [4, 0.8, 'rgba(255,244,210,0.8)'], champagne: [6, 1.2, 'rgba(255,252,236,0.9)'], mojito: [2, 0.5, 'rgba(255,255,255,0.7)'], negroni: [0, 0, ''], oldfash: [0, 0, ''], wine: [0, 0, ''], martini: [0, 0, ''] };
  const GLASS = '#3a3029', SURF = 0.2;
  const M = FoodMass({
    FOOD: [null, 'beer', 'oldfash', 'negroni', 'wine', 'mojito', 'martini', 'champagne'],
    MAIN: [null, '#d38a1c', '#a2501c', '#b02a1c', '#5c0f28', '#bcd59a', '#c9d6d0', '#e6c874'],
    soft: { beer: 1.4, wine: 1.5, champagne: 1.4, mojito: 1.2, martini: 1.5, negroni: 1.3, oldfash: 1.1 },
    R: 0.2, cutCol: 'rgba(255,255,255,0.22)', noPlanes: true,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W } = Q;
      const [c0, c1, c2] = LQ[food], gw = Math.max(1, P * 0.03), sy = t + P * SURF;
      const grad = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      x.fillStyle = c0; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      // contents that sit inside the liquid
      if (food === 'mojito') {
        for (let i = 0; i < (small ? 2 : 5); i++) { // crushed ice: irregular clear shards with one lit edge
          const cx = C(0.12 + hash(vr, i, 1) * 0.76), cy = C(0.15 + hash(vr, i, 2) * 0.75), q = P * (0.08 + hash(i, vr, 3) * 0.07), a = hash(vr, i, 4) * 3;
          const pts = [0, 1, 2, 3].map((k) => [cx + Math.cos(a + k * 1.6 + hash(i, k, 5) * 0.5) * q, cy + Math.sin(a + k * 1.6 + hash(i, k, 5) * 0.5) * q * 0.85]);
          x.fillStyle = 'rgba(250,255,245,0.22)'; x.beginPath(); pts.forEach(([px, py], k) => (k ? x.lineTo(px, py) : x.moveTo(px, py))); x.closePath(); x.fill();
          x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = Math.max(0.7, P * 0.016); x.beginPath(); x.moveTo(...pts[0]); x.lineTo(...pts[1]); x.stroke();
        }
        if (!small && hash(vr, 7) < 0.7) { // one muddled mint leaf, muted and partly behind the ice
          const cx = C(0.3 + hash(vr, 8) * 0.4), cy = C(0.45 + hash(vr, 9) * 0.35), rot = hash(vr, 10) * 3;
          x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = 0.85;
          x.fillStyle = '#4a7a3c'; x.beginPath(); x.moveTo(-P * 0.14, 0); x.quadraticCurveTo(-P * 0.02, -P * 0.1, P * 0.14, 0); x.quadraticCurveTo(-P * 0.02, P * 0.07, -P * 0.14, 0); x.fill();
          x.strokeStyle = 'rgba(190,225,160,0.55)'; x.lineWidth = Math.max(0.6, P * 0.01); x.beginPath(); x.moveTo(-P * 0.12, 0); x.lineTo(P * 0.12, -P * 0.005); x.stroke();
          x.restore();
        }
      }
      // bottom of the vessel: liquid deepens, then a thick tinted glass base with a caustic glow
      if (!(mask & S)) {
        x.fillStyle = grad(0, b - P * 0.34, 0, b - P * 0.13, [[0, rgba(c2, 0)], [1, rgba(c2, 0.55)]]); x.fillRect(l - 2, b - P * 0.34, r - l + 4, P * 0.22);
        x.fillStyle = GLASS; x.fillRect(l - 2, b - P * 0.13, r - l + 4, P * 0.15);
        x.fillStyle = rgba(c1, 0.42); x.fillRect(l - 2, b - P * 0.13, r - l + 4, P * 0.15);
        x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(l - 2, b - P * 0.13, r - l + 4, gw);
        x.fillStyle = 'rgba(255,250,235,0.18)'; x.fillRect(l - 2, b - P * 0.07, r - l + 4, P * 0.025);
      }
      // top of the vessel: empty glass above a meniscus that curls up at the walls (beer: a creamy foam head instead)
      if (!(mask & N)) {
        if (food === 'beer') {
          const fb = t + P * 0.36;
          x.fillStyle = grad(0, t, 0, fb, [[0, '#fbf5e6'], [0.7, '#f1e4c6'], [1, '#e2cc9a']]);
          x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, fb);
          const n = 5; for (let i = n; i >= 0; i--) { const px = lerp(l - 2, r + 2, i / n), py = fb + (hash(vr, i, 11) - 0.5) * P * 0.06; x.quadraticCurveTo(px + P * 0.05, py + P * 0.05, px, py); }
          x.closePath(); x.fill();
          x.fillStyle = 'rgba(255,215,130,0.35)'; x.fillRect(l - 2, fb - P * 0.03, r - l + 4, P * 0.05);
          if (!small) { x.fillStyle = 'rgba(190,160,110,0.28)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(C(0.15 + hash(vr, i, 12) * 0.7), t + P * (0.12 + hash(vr, i, 13) * 0.16), P * 0.018, 0, TAU); x.fill(); } }
          x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(l - 2, t + P * 0.05, r - l + 4, P * 0.04);
        } else {
          x.fillStyle = GLASS; x.fillRect(l - 2, t - 2, r - l + 4, sy - t + 2);
          x.fillStyle = 'rgba(255,255,255,0.1)'; x.fillRect(l - 2, t + P * 0.05, r - l + 4, P * 0.05); x.fillStyle = rgba(c1, 0.12); x.fillRect(l - 2, sy - P * 0.05, r - l + 4, P * 0.05);
          if (food === 'wine' && !small) { x.strokeStyle = 'rgba(150,40,70,0.4)'; x.lineWidth = Math.max(0.8, P * 0.018); for (let i = 0; i < 3; i++) { const lx = C(0.15 + hash(vr, i, 14) * 0.7), ly = t + P * (0.03 + hash(vr, i, 15) * 0.06); x.beginPath(); x.moveTo(lx, ly); x.lineTo(lx + P * 0.005, sy); x.stroke(); x.fillStyle = 'rgba(150,40,70,0.45)'; x.beginPath(); x.arc(lx, ly, P * 0.016, 0, TAU); x.fill(); } }
          x.fillStyle = grad(0, sy, 0, sy + P * 0.16, [[0, c1], [1, rgba(c1, 0)]]); x.fillRect(l - 2, sy, r - l + 4, P * 0.16);
          x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = Math.max(1, P * 0.025); x.beginPath();
          x.moveTo(l - 2, sy); if (!(mask & W)) { x.moveTo(l + gw, sy - P * 0.07); x.quadraticCurveTo(l + gw, sy, l + P * 0.14, sy); }
          if (!(mask & E)) { x.lineTo(r - P * 0.14, sy); x.quadraticCurveTo(r - gw, sy, r - gw, sy - P * 0.07); } else x.lineTo(r + 2, sy);
          x.stroke();
        }
        // clear ice cube floating at the surface, poking out above it
        if ((food === 'oldfash' || food === 'negroni') && !(mask & W) && !small) {
          const q = P * (food === 'oldfash' ? 0.66 : 0.54), cx = C(0.5) + (mask & E ? P * 0.08 : 0), cy = sy + q * 0.28, rot = (hash(vr, 16) - 0.5) * 0.5;
          x.save(); x.translate(cx, cy); x.rotate(rot);
          const rr = (ins) => { const h = q / 2 - ins, k = q * 0.16; x.beginPath(); x.moveTo(-h + k, -h); x.lineTo(h - k, -h); x.quadraticCurveTo(h, -h, h, -h + k); x.lineTo(h, h - k); x.quadraticCurveTo(h, h, h - k, h); x.lineTo(-h + k, h); x.quadraticCurveTo(-h, h, -h, h - k); x.lineTo(-h, -h + k); x.quadraticCurveTo(-h, -h, -h + k, -h); x.closePath(); };
          rr(0); x.fillStyle = linear(x, -q / 2, -q / 2, q / 2, q / 2, [[0, 'rgba(255,250,240,0.42)'], [0.5, 'rgba(255,246,232,0.16)'], [1, 'rgba(255,246,232,0.26)']]); x.fill();
          rr(q * 0.08); x.strokeStyle = rgba(c2, 0.45); x.lineWidth = Math.max(1, q * 0.07); x.stroke();
          rr(0); x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = Math.max(1, q * 0.045); x.stroke();
          x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.moveTo(-q * 0.36, -q * 0.36); x.lineTo(-q * 0.04, -q * 0.36); x.lineTo(-q * 0.36, -q * 0.06); x.closePath(); x.fill();
          x.strokeStyle = 'rgba(255,255,255,0.28)'; x.lineWidth = Math.max(0.6, q * 0.02); x.beginPath(); x.moveTo(q * 0.05, -q * 0.2); x.lineTo(q * 0.22, q * 0.12); x.stroke();
          x.restore();
        }
      }
      // glass walls: lit wall carries a refraction tint + a long reflection streak, the far wall is darker
      const wy = (mask & N) || food === 'beer' ? t - 2 : sy;
      if (!(mask & W)) {
        x.fillStyle = rgba(c1, 0.38); x.fillRect(l, wy, P * 0.1, b - wy + 2);
        x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(l + gw * 0.5, t - 2, gw, b - t + 4);
        x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(l + P * 0.17, (mask & N) ? t - 2 : sy + P * 0.04, P * 0.05, (mask & S) ? b - t + 4 : b - P * 0.16 - ((mask & N) ? t - 2 : sy + P * 0.04));
      }
      if (!(mask & E)) {
        x.fillStyle = grad(r - P * 0.16, 0, r, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.6)]]); x.fillRect(r - P * 0.16, wy, P * 0.16, b - wy + 2);
        x.fillStyle = 'rgba(255,255,255,0.26)'; x.fillRect(r - gw * 1.5, t - 2, gw, b - t + 4);
      }
      if (!(mask & N)) { x.fillStyle = 'rgba(255,255,255,0.62)'; x.fillRect(l, t, r - l, gw); }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, gx, hash, small } = o;
      const [n, sp, col] = BUB[food], top = !(mask & FM_N), sy = -s / 2 + s * (food === 'beer' ? 0.36 : SURF);
      if (n && !small) { // fine streams rising from fixed nucleation points
        c.fillStyle = col;
        for (let i = 0; i < n; i++) {
          const ph = hash(seed, i, 3), u = (T * sp * (0.7 + hash(i, seed) * 0.5) + ph) % 1, bx = (hash(seed, i, 7) - 0.5) * s * 0.66 + Math.sin(T * 3 + i) * s * 0.012, by = (0.5 - u) * s;
          if (top && by < sy + s * 0.03) continue;
          c.globalAlpha = Math.min(1, u * 4) * 0.9; c.beginPath(); c.arc(bx, by, s * (food === 'champagne' ? 0.014 : 0.018) * (0.7 + u * 0.6), 0, TAU); c.fill();
        }
        c.globalAlpha = 1;
      }
      if (top && food !== 'beer') { // slosh: the meniscus line tilts and ripples (more right after landing / rotating)
        const amp = s * (0.008 + wob * 0.06), ph = T * 3 + gx * 0.9 + seed * 0.1, [, c1] = LQ[food];
        const yAt = (u) => sy + Math.sin(ph + u * 3.2) * amp + (u - 0.5) * wob * s * 0.1;
        if (amp > s * 0.012) {
          c.beginPath(); c.moveTo(-s / 2, sy - s * 0.09); c.lineTo(s / 2, sy - s * 0.09); for (let i = 6; i >= 0; i--) c.lineTo(-s / 2 + (i / 6) * s, yAt(i / 6)); c.closePath(); c.fillStyle = GLASS; c.fill();
          c.beginPath(); c.moveTo(-s / 2, sy + s * 0.09); c.lineTo(s / 2, sy + s * 0.09); for (let i = 6; i >= 0; i--) c.lineTo(-s / 2 + (i / 6) * s, yAt(i / 6)); c.closePath(); c.fillStyle = c1; c.fill();
        }
        c.strokeStyle = 'rgba(255,255,255,0.5)'; c.lineWidth = Math.max(1, s * 0.022); c.beginPath(); for (let i = 0; i <= 6; i++) { const u = i / 6; i ? c.lineTo(-s / 2 + u * s, yAt(u)) : c.moveTo(-s / 2, yAt(u)); } c.stroke();
      }
      // garnish riding the surface of the top-left exposed cell
      if (top && !(mask & FM_W) && !small) {
        const bob = Math.sin(T * 2.2 + seed) * s * (0.01 + wob * 0.04), rot = Math.sin(T * 1.6 + seed) * (0.06 + wob * 0.3);
        c.save(); c.translate(s * 0.12, sy + bob); c.rotate(rot);
        if (food === 'martini') { // cocktail pick through two olives, pimento showing
          c.strokeStyle = '#c9b48a'; c.lineWidth = Math.max(1, s * 0.022); c.beginPath(); c.moveTo(-s * 0.34, -s * 0.24); c.lineTo(s * 0.16, s * 0.14); c.stroke();
          [[-0.12, -0.06], [0.02, 0.05]].forEach(([ox, oy]) => { c.fillStyle = '#6f7d34'; ellipse(c, s * ox, s * oy, s * 0.1, s * 0.078, 0.6); c.fill(); c.fillStyle = 'rgba(255,255,240,0.35)'; ellipse(c, s * (ox - 0.035), s * (oy - 0.03), s * 0.03, s * 0.018, 0.6); c.fill(); c.fillStyle = '#b8402e'; c.beginPath(); c.arc(s * (ox + 0.05), s * (oy - 0.035), s * 0.024, 0, TAU); c.fill(); });
        } else if (food === 'oldfash') { // orange-peel twist resting on the rim
          c.lineCap = 'round'; c.strokeStyle = '#d9772a'; c.lineWidth = Math.max(1.5, s * 0.06); c.beginPath(); c.moveTo(-s * 0.3, -s * 0.06); c.bezierCurveTo(-s * 0.15, -s * 0.2, -s * 0.02, s * 0.06, s * 0.12, -s * 0.08); c.bezierCurveTo(s * 0.2, -s * 0.16, s * 0.26, -s * 0.04, s * 0.2, 0); c.stroke();
          c.strokeStyle = 'rgba(255,214,150,0.7)'; c.lineWidth = Math.max(0.6, s * 0.018); c.beginPath(); c.moveTo(-s * 0.28, -s * 0.08); c.bezierCurveTo(-s * 0.15, -s * 0.2, -s * 0.02, s * 0.04, s * 0.12, -s * 0.1); c.stroke(); c.lineCap = 'butt';
        } else if (food === 'negroni') { // orange half-wheel standing in the glass
          c.fillStyle = '#e2802a'; c.beginPath(); c.arc(0, 0, s * 0.2, Math.PI, TAU); c.fill(); c.fillStyle = '#f6c57c'; c.beginPath(); c.arc(0, 0, s * 0.16, Math.PI, TAU); c.fill();
          c.strokeStyle = 'rgba(226,128,42,0.7)'; c.lineWidth = Math.max(0.7, s * 0.014); c.beginPath(); for (let i = 1; i < 5; i++) { const a = Math.PI + i * Math.PI / 5; c.moveTo(0, 0); c.lineTo(Math.cos(a) * s * 0.15, Math.sin(a) * s * 0.15); } c.stroke();
        } else if (food === 'mojito') { // lime wedge + a fresh mint sprig
          c.fillStyle = '#5e9a34'; c.beginPath(); c.arc(0, 0, s * 0.17, Math.PI, TAU); c.fill(); c.fillStyle = '#d6eaa4'; c.beginPath(); c.arc(0, 0, s * 0.13, Math.PI, TAU); c.fill();
          c.fillStyle = '#3f7a34'; ellipse(c, s * 0.18, -s * 0.13, s * 0.09, s * 0.045, -0.6); c.fill(); ellipse(c, s * 0.24, -s * 0.05, s * 0.08, s * 0.04, 0.3); c.fill();
        }
        c.restore();
      }
    },
    clear(food, q) {
      const { X, Y, s, r, vr, push, v } = q, [c0, c1] = LQ[food];
      push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 });
      for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.2; push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.05 + r(i + 4) * 0.04, x: X, y: Y, vx: Math.cos(a) * s * (2 + r(i + 9) * 3), vy: Math.sin(a) * s * (3 + r(i + 5) * 3), life: 0.7 }); }
      for (let i = 0; i < 3; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.8, y: Y, vx: 0, vy: -s * (2 + r(i + 13) * 2), g: -1, life: 0.8, r: 0.04 + r(i) * 0.04 });
      if (food === 'beer') for (let i = 0; i < 3; i++) push({ k: 'dot', col: '#f6eedb', r: 0.09, x: X, y: Y - s * 0.3, vx: (r(i + 20) - 0.5) * s * 3, vy: -s * 2, g: 4, life: 0.7 });
      return true;
    },
  });
  return M;
})();
SKINSETS.cocktail = CocktailFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'speakeasy'); if (st) { st.palette = CocktailFood.MAIN.slice(1); st.desc = 'Flat Art Deco geometry: a password at the door, a bartender who really shakes and pours, a jazz trio to the side and a singer who steps into the spotlight — upright bass, brushes, muted horn.'; } })();
