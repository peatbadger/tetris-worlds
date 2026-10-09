/* ================= Themed block skins (pre-rendered per stage & cell size) ================= */

const Skins = (() => {
  const cache = {};
  function sushiTex(x, s, t, col) {
    const rnd = mulberry32(t * 31 + 7);
    const i0 = s * 0.08, w = s - i0 * 2;
    x.save(); roundRect(x, i0, i0, w, w, s * 0.12); x.clip();
    const fill = (stops) => { x.fillStyle = linear(x, 0, i0, 0, i0 + w, stops); x.fillRect(0, 0, s, s); };
    switch (t) {
      case 1: // saba
        fill([[0, '#eef3f8'], [0.5, '#a9bccf'], [1, '#6f879e']]);
        x.strokeStyle = 'rgba(25,40,62,0.85)'; x.lineWidth = s * 0.05;
        for (let r = 0; r < 3; r++) { x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = i0 + k * w / 8, yy = i0 + w * (0.15 + r * 0.14) + Math.sin(k * 1.6 + r) * s * 0.04; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
        x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(0, i0 + w * 0.6, s, s * 0.06);
        break;
      case 2: // tamago
        fill([[0, '#ffe58a'], [0.6, '#f5c842'], [1, '#d99e22']]);
        x.strokeStyle = 'rgba(180,110,20,0.35)'; x.lineWidth = s * 0.025;
        for (let k = 1; k < 5; k++) { x.beginPath(); x.moveTo(0, i0 + k * w / 5); x.lineTo(s, i0 + k * w / 5); x.stroke(); }
        x.fillStyle = 'rgba(150,80,10,0.35)'; x.fillRect(0, i0, s, w * 0.12);
        x.fillStyle = linear(x, s * 0.42, 0, s * 0.58, 0, [[0, '#0b160d'], [0.5, '#24402a'], [1, '#08100a']]); x.fillRect(s * 0.42, 0, s * 0.16, s);
        break;
      case 3: // ikura
        fill([[0, '#ff7a3a'], [1, '#b8300a']]);
        for (let k = 0; k < 5; k++) { const px = i0 + w * [0.28, 0.72, 0.5, 0.25, 0.75][k], py = i0 + w * [0.28, 0.28, 0.52, 0.76, 0.76][k]; SushiArt.sphere(x, px, py, w * 0.21, '#ffd08a', '#f2611a', '#8a2006'); }
        break;
      case 4: // kappa (cucumber)
        fill([[0, '#2e7a2a'], [1, '#1a4a18']]);
        x.fillStyle = radial(x, s / 2, s / 2, w * 0.45, [[0, '#e6ffc8'], [0.7, '#a8dc78'], [1, '#5aa83a']]); x.fillRect(i0 + w * 0.1, i0 + w * 0.1, w * 0.8, w * 0.8);
        x.fillStyle = 'rgba(250,255,230,0.9)';
        for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; ellipse(x, s / 2 + Math.cos(a) * w * 0.17, s / 2 + Math.sin(a) * w * 0.17, s * 0.03, s * 0.05, a); x.fill(); }
        break;
      case 5: // maguro
        fill([[0, '#e8455a'], [0.6, '#c41d36'], [1, '#86101f']]);
        x.strokeStyle = 'rgba(255,160,170,0.3)'; x.lineWidth = s * 0.03;
        for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(i0 + k * w * 0.3 - w * 0.1, i0); x.quadraticCurveTo(i0 + k * w * 0.3 + w * 0.2, s / 2, i0 + k * w * 0.3, s); x.stroke(); }
        break;
      case 6: // tako
        fill([[0, '#fbf0ec'], [1, '#e2c8be']]);
        x.fillStyle = linear(x, 0, i0, 0, i0 + w * 0.35, [[0, '#6a1030'], [1, '#b0447a']]); x.fillRect(0, 0, s, i0 + w * 0.32);
        for (let k = 0; k < 3; k++) { ellipse(x, i0 + w * (0.2 + k * 0.3), i0 + w * 0.5, s * 0.07, s * 0.06); x.fillStyle = '#f6cdd8'; x.fill(); x.strokeStyle = '#8c2a4a'; x.lineWidth = s * 0.02; x.stroke(); }
        break;
      default: // salmon
        fill([[0, '#ffa76e'], [0.6, '#f57a3d'], [1, '#d4561c']]);
        x.strokeStyle = 'rgba(255,238,224,0.9)'; x.lineWidth = s * 0.06;
        for (let k = -1; k < 4; k++) { x.beginPath(); x.moveTo(i0 + k * w * 0.33, i0); x.quadraticCurveTo(i0 + k * w * 0.33 + w * 0.25, s / 2, i0 + k * w * 0.33 + w * 0.1, s); x.stroke(); }
    }
    x.restore();
    // lacquer rim and gloss
    x.lineWidth = s * 0.03; x.strokeStyle = 'rgba(212,175,55,0.55)'; roundRect(x, i0 * 0.6, i0 * 0.6, s - i0 * 1.2, s - i0 * 1.2, s * 0.14); x.stroke();
    x.save(); x.globalCompositeOperation = 'lighter';
    x.fillStyle = linear(x, 0, 0, 0, s * 0.5, [[0, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']]);
    roundRect(x, s * 0.14, s * 0.12, s * 0.72, s * 0.22, s * 0.1); x.fill(); x.restore();
  }
  function draw(style, col, t, s) {
    const c = makeCanvas(s, s), x = c.getContext('2d');
    const P = s; // pixel size
    if (SKINSETS[style]) {
      SKINSETS[style].base(x, t, P, col);
    } else if (style === 'glass') {
      roundRect(x, 1, 1, P - 2, P - 2, P * 0.2);
      x.fillStyle = linear(x, 0, 0, P, P, [[0, rgba(shade(col, 0.45), 0.92)], [0.5, rgba(col, 0.7)], [1, rgba(shade(col, -0.45), 0.85)]]); x.fill();
      x.fillStyle = radial(x, P / 2, P / 2, P * 0.55, [[0, rgba('#ffffff', 0.35)], [1, rgba('#ffffff', 0)]]); x.fill();
      x.strokeStyle = rgba(shade(col, 0.6), 0.95); x.lineWidth = Math.max(1, P * 0.05); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = P * 0.03; x.beginPath(); x.moveTo(P * 0.2, P * 0.65); x.bezierCurveTo(P * 0.35, P * 0.5, P * 0.5, P * 0.8, P * 0.8, P * 0.55); x.stroke();
      x.fillStyle = 'rgba(255,255,255,0.55)'; ellipse(x, P * 0.32, P * 0.24, P * 0.16, P * 0.07, -0.4); x.fill();
    } else if (style === 'sandstone') {
      x.fillStyle = linear(x, 0, 0, 0, P, [[0, shade(col, 0.15)], [1, shade(col, -0.25)]]); x.fillRect(0, 0, P, P);
      const r = mulberry32(t * 13);
      for (let k = 0; k < 5; k++) { x.fillStyle = k % 2 ? 'rgba(255,230,190,0.12)' : 'rgba(80,30,10,0.12)'; x.fillRect(0, P * (0.1 + k * 0.18) + r() * 3, P, P * 0.07); }
      for (let k = 0; k < P * 1.5; k++) { x.fillStyle = r() < 0.5 ? 'rgba(255,240,210,0.25)' : 'rgba(60,20,0,0.25)'; x.fillRect(r() * P, r() * P, 1, 1); }
      x.fillStyle = 'rgba(255,240,210,0.45)'; x.fillRect(0, 0, P, P * 0.08); x.fillRect(0, 0, P * 0.08, P);
      x.fillStyle = 'rgba(40,10,0,0.45)'; x.fillRect(0, P * 0.92, P, P * 0.08); x.fillRect(P * 0.92, 0, P * 0.08, P);
    } else if (style === 'neon') {
      x.fillStyle = rgba(shade(col, -0.8), 0.9); x.fillRect(0, 0, P, P);
      for (let k = 4; k >= 1; k--) { x.strokeStyle = rgba(col, 0.12 * (5 - k)); x.lineWidth = k * P * 0.06; x.strokeRect(P * 0.12, P * 0.12, P * 0.76, P * 0.76); }
      x.strokeStyle = shade(col, 0.5); x.lineWidth = Math.max(1, P * 0.06); x.strokeRect(P * 0.12, P * 0.12, P * 0.76, P * 0.76);
      x.fillStyle = 'rgba(255,255,255,0.06)'; for (let y = 0; y < P; y += 3) x.fillRect(0, y, P, 1);
      x.fillStyle = rgba(col, 0.25); x.fillRect(P * 0.3, P * 0.3, P * 0.4, P * 0.4);
    } else if (style === 'ice') {
      const c0 = shade(col, 0.55), c1 = shade(col, 0.2), c2 = col, c3 = shade(col, -0.3);
      [[0, 0, P, 0, c0], [P, 0, P, P, c2], [P, P, 0, P, c3], [0, P, 0, 0, c1]].forEach(([a, b, cc, d, f]) => { x.beginPath(); x.moveTo(a, b); x.lineTo(cc, d); x.lineTo(P / 2, P / 2); x.closePath(); x.fillStyle = rgba(f, 0.85); x.fill(); });
      x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = Math.max(1, P * 0.04); x.strokeRect(P * 0.04, P * 0.04, P * 0.92, P * 0.92);
      x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 0); x.lineTo(P, P); x.moveTo(P, 0); x.lineTo(0, P); x.stroke();
      x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(P * 0.22, P * 0.2, P * 0.06, P * 0.06); x.fillRect(P * 0.66, P * 0.62, P * 0.04, P * 0.04);
    } else { // gem
      const b = P * 0.18;
      x.fillStyle = shade(col, -0.5); x.fillRect(0, 0, P, P);
      const tri = (pts, f) => { x.beginPath(); pts.forEach(([a, c], i) => (i ? x.lineTo(a, c) : x.moveTo(a, c))); x.closePath(); x.fillStyle = f; x.fill(); };
      tri([[0, 0], [P, 0], [P - b, b], [b, b]], shade(col, 0.5));
      tri([[0, 0], [b, b], [b, P - b], [0, P]], shade(col, 0.2));
      tri([[P, 0], [P, P], [P - b, P - b], [P - b, b]], shade(col, -0.25));
      tri([[0, P], [b, P - b], [P - b, P - b], [P, P]], shade(col, -0.45));
      x.fillStyle = radial(x, P * 0.4, P * 0.4, P * 0.5, [[0, shade(col, 0.35)], [1, col]]); x.fillRect(b, b, P - 2 * b, P - 2 * b);
      x.fillStyle = 'rgba(255,255,255,0.85)'; const r = mulberry32(t);
      for (let k = 0; k < 3; k++) { const px = b + r() * (P - 2 * b), py = b + r() * (P - 2 * b); x.fillRect(px, py, 1.2, 1.2); }
      x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(b, b, P - 2 * b, P * 0.06);
    }
    return c;
  }
  function get(stage, cell, dpr) {
    const px = Math.max(4, Math.round(cell * dpr));
    const ss = SKINSETS[stage.skin], vk = ss && ss.key ? ss.key() : '', key = stage.id + ':' + px + (vk ? '@' + vk : '');
    if (!cache[key] && vk) for (const k in cache) if (k.startsWith(stage.id + ':' + px + '@')) delete cache[k]; // drop stale palette variants
    if (!cache[key]) cache[key] = [null].concat(stage.palette.map((col, i) => draw(stage.skin, col, i + 1, px)));
    return cache[key];
  }
  function live(stage) { const ss = SKINSETS[stage.skin]; return ss && ss.live ? ss.live : null; }
  function clear() { for (const k in cache) delete cache[k]; }
  return { get, live, clear };
})();
