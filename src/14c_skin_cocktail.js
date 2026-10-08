/* ---- Speakeasy blocks: a different cocktail per piece, liquid sloshes with spring physics ---- */
SKINSETS.cocktail = (() => {
  const K = SkinKit;
  // per type: glass kind, liquid colour, fill level, garnish
  const D = [null,
    { name: 'Old Fashioned', glass: 'rocks', liq: '#c8701a', a: 0.88, lvl: -0.06, ice: 1, garn: 'peel', cherry: 1, tile: '#3a2412' },
    { name: 'Dry Martini', glass: 'martini', liq: '#e6eedc', a: 0.55, lvl: -0.22, garn: 'olive', tile: '#22262a' },
    { name: 'French 75', glass: 'flute', liq: '#f4dc84', a: 0.8, lvl: -0.28, bubbles: 6, garn: 'twist', tile: '#3a3216' },
    { name: 'Mojito', glass: 'highball', liq: '#cfe8a0', a: 0.55, lvl: -0.3, bubbles: 4, ice: 2, garn: 'mint', tile: '#14301c' },
    { name: 'Manhattan', glass: 'coupe', liq: '#8a2410', a: 0.92, lvl: -0.16, garn: 'cherry', tile: '#3a1410' },
    { name: 'Negroni', glass: 'rocks', liq: '#d8341c', a: 0.88, lvl: -0.08, ice: 1, garn: 'orange', tile: '#3a1208' },
    { name: 'Absinthe', glass: 'coupe', liq: '#8ad040', a: 0.82, lvl: -0.16, louche: 1, garn: 'none', tile: '#1a2a10' },
  ];
  const POLY = {
    rocks: [[-0.33, -0.3], [0.33, -0.3], [0.28, 0.34], [-0.28, 0.34]],
    martini: [[-0.38, -0.34], [0.38, -0.34], [0.03, 0.04], [-0.03, 0.04]],
    flute: [[-0.14, -0.42], [0.14, -0.42], [0.11, 0.08], [0.05, 0.14], [-0.05, 0.14], [-0.11, 0.08]],
    highball: [[-0.24, -0.42], [0.24, -0.42], [0.22, 0.38], [-0.22, 0.38]],
    coupe: [[-0.37, -0.22], [0.37, -0.22], [0.33, -0.1], [0.2, -0.01], [0, 0.03], [-0.2, -0.01], [-0.33, -0.1]],
  };
  function glassBase(x, kind, P) { // back wall of the glass, stem and foot (drawn in base)
    const c = P / 2, poly = POLY[kind];
    x.save(); x.translate(c, c); x.scale(P, P);
    x.beginPath(); poly.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath();
    x.fillStyle = 'rgba(200,220,230,0.10)'; x.fill();
    if (kind === 'martini' || kind === 'flute' || kind === 'coupe') {
      const top = kind === 'martini' ? 0.04 : kind === 'flute' ? 0.14 : 0.03;
      x.fillStyle = 'rgba(220,235,240,0.55)'; x.fillRect(-0.018, top, 0.036, 0.4 - top);
      ellipse(x, 0, 0.41, 0.2, 0.04); x.fillStyle = 'rgba(220,235,240,0.5)'; x.fill(); x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 0.012; x.stroke();
    } else { x.fillStyle = 'rgba(220,235,240,0.35)'; x.beginPath(); x.moveTo(poly[3][0], poly[3][1]); x.lineTo(poly[2][0], poly[2][1]); x.lineTo(poly[2][0] + 0.01, poly[2][1] + 0.07); x.lineTo(poly[3][0] - 0.01, poly[3][1] + 0.07); x.closePath(); x.fill(); }
    x.restore();
  }
  function glassFront(kind, P) { // rim, outline and reflections; drawn on top of the live liquid
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d'), poly = POLY[kind];
    x.translate(P / 2, P / 2); x.scale(P / 2, P / 2);
    x.beginPath(); poly.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath();
    x.strokeStyle = 'rgba(235,245,250,0.75)'; x.lineWidth = 0.022; x.stroke();
    ellipse(x, 0, poly[0][1], Math.abs(poly[0][0]), 0.035); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 0.016; x.stroke();
    const l = poly[0][0], b = poly[poly.length - 1];
    x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 0.035; x.lineCap = 'round'; x.beginPath(); x.moveTo(l * 0.8, poly[0][1] + 0.08); x.lineTo(lerp(l, b[0], 0.6) * 0.85, lerp(poly[0][1], b[1], 0.6)); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,0.22)'; x.lineWidth = 0.02; x.beginPath(); x.moveTo(-l * 0.72, poly[0][1] + 0.1); x.lineTo(-l * 0.55, poly[0][1] + 0.25); x.stroke();
    if (kind === 'rocks' || kind === 'highball') { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(b[0] + 0.02, b[1] + 0.01, -b[0] * 2 - 0.04, 0.05); for (let k = 0; k < 5; k++) { x.strokeStyle = 'rgba(255,255,255,0.12)'; x.lineWidth = 0.01; x.beginPath(); x.moveTo(-0.2 + k * 0.1, 0.36); x.lineTo(-0.2 + k * 0.1, 0.41); x.stroke(); } }
    // condensation beads
    const rnd = mulberry32(kind.length * 77);
    for (let k = 0; k < 10; k++) { const yy = poly[0][1] + 0.1 + rnd() * 0.5, f = (yy - poly[0][1]) / (b[1] - poly[0][1]); if (f > 1) continue; const xl = lerp(poly[0][0], b[0], f); const xx = lerp(xl, -xl, rnd()); ellipse(x, xx, yy, 0.012, 0.016); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fill(); }
    return c;
  }
  function garnish(kind, P) {
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d');
    x.translate(P / 2, P / 2); x.scale(P / 2, P / 2);
    switch (kind) {
      case 'cherry': ellipse(x, 0, 0, 0.1, 0.095); x.fillStyle = radial(x, -0.03, -0.03, 0.12, [[0, '#ff8a8a'], [0.4, '#c0101e'], [1, '#4a0008']]); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; ellipse(x, -0.035, -0.035, 0.025, 0.015, -0.6); x.fill(); x.strokeStyle = '#5a3a10'; x.lineWidth = 0.018; x.beginPath(); x.moveTo(0, -0.08); x.quadraticCurveTo(0.05, -0.25, 0.14, -0.32); x.stroke(); break;
      case 'olive': x.strokeStyle = '#d8c090'; x.lineWidth = 0.02; x.beginPath(); x.moveTo(-0.3, -0.36); x.lineTo(0.12, 0.12); x.stroke(); ellipse(x, -0.33, -0.39, 0.03, 0.03); x.fillStyle = '#c03030'; x.fill();
        ellipse(x, -0.05, -0.06, 0.1, 0.08, 0.8); x.fillStyle = radial(x, -0.08, -0.09, 0.12, [[0, '#c8d880'], [0.5, '#7a9a2a'], [1, '#3a4a10']]); x.fill(); ellipse(x, -0.1, -0.11, 0.035, 0.03); x.fillStyle = '#d8381e'; x.fill(); break;
      case 'peel': x.fillStyle = linear(x, -0.2, 0, 0.2, 0, [[0, '#f0901a'], [0.5, '#ffb84a'], [1, '#c86a10']]); x.beginPath(); x.moveTo(-0.08, -0.38); x.bezierCurveTo(0.12, -0.3, 0.16, -0.1, 0.06, 0.08); x.lineTo(0.0, 0.06); x.bezierCurveTo(0.08, -0.1, 0.05, -0.28, -0.12, -0.34); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,240,200,0.5)'; for (let k = 0; k < 6; k++) { ellipse(x, 0.02 + Math.sin(k) * 0.04, -0.3 + k * 0.06, 0.008, 0.008); x.fill(); } break;
      case 'twist': x.strokeStyle = '#f6e04a'; x.lineWidth = 0.035; x.lineCap = 'round'; x.beginPath(); for (let k = 0; k <= 30; k++) { const a = k * 0.55, yy = -0.42 + k * 0.016; x.lineTo(Math.sin(a) * 0.07, yy + Math.cos(a) * 0.02); } x.stroke(); x.strokeStyle = 'rgba(255,255,220,0.6)'; x.lineWidth = 0.012; x.stroke(); break;
      case 'mint': for (let k = 0; k < 5; k++) { x.save(); x.translate(-0.05 + k * 0.03, -0.3 - k * 0.02); x.rotate(-0.8 + k * 0.4); ellipse(x, 0, -0.06, 0.04, 0.08); x.fillStyle = k % 2 ? '#3aa04a' : '#5ac85a'; x.fill(); x.strokeStyle = 'rgba(20,60,20,0.6)'; x.lineWidth = 0.008; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -0.12); x.stroke(); x.restore(); }
        x.beginPath(); x.moveTo(0.12, -0.42); x.arc(0.12, -0.42, 0.14, 0.2, 1.4); x.closePath(); x.fillStyle = '#7ac83a'; x.fill(); x.strokeStyle = '#e8f8c0'; x.lineWidth = 0.02; x.stroke(); break;
      case 'orange': x.save(); x.translate(0.22, -0.32); ellipse(x, 0, 0, 0.16, 0.16); x.fillStyle = '#f08a1a'; x.fill(); ellipse(x, 0, 0, 0.13, 0.13); x.fillStyle = '#ffc060'; x.fill(); x.strokeStyle = 'rgba(255,240,200,0.9)'; x.lineWidth = 0.012; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 0.13, Math.sin(a) * 0.13); x.stroke(); } x.restore(); break;
      default: break;
    }
    return c;
  }
  function iceSprite(P) {
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d');
    x.translate(P / 2, P / 2); x.scale(P, P);
    roundRect(x, -0.4, -0.4, 0.8, 0.8, 0.16); x.fillStyle = 'rgba(230,245,255,0.35)'; x.fill(); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 0.05; x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.6)'; roundRect(x, -0.3, -0.3, 0.3, 0.12, 0.06); x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.4)'; x.lineWidth = 0.03; x.beginPath(); x.moveTo(-0.2, 0.25); x.lineTo(0.25, -0.15); x.stroke();
    return c;
  }
  function base(x, t, P) {
    const d = D[t];
    K.tile(x, P, shade(d.tile, 0.15), shade(d.tile, -0.5), 0.12);
    // art-deco gold fans in the corners + inner keyline
    x.strokeStyle = 'rgba(214,176,90,0.55)'; x.lineWidth = Math.max(1, P * 0.02); roundRect(x, P * 0.06, P * 0.06, P * 0.88, P * 0.88, P * 0.08); x.stroke();
    x.lineWidth = P * 0.012; x.strokeStyle = 'rgba(214,176,90,0.4)';
    [[0.06, 0.06, 0], [0.94, 0.06, 1], [0.94, 0.94, 2], [0.06, 0.94, 3]].forEach(([cx, cy, q]) => { for (let k = 1; k <= 3; k++) { x.beginPath(); x.arc(P * cx, P * cy, P * 0.05 * k, q * Math.PI / 2, q * Math.PI / 2 + Math.PI / 2); x.stroke(); } });
    x.fillStyle = radial(x, P / 2, P * 0.45, P * 0.5, [[0, 'rgba(255,190,100,0.16)'], [1, 'rgba(0,0,0,0)']]); x.fillRect(0, 0, P, P);
    glassBase(x, d.glass, P);
  }
  // Sutherland–Hodgman clip of the glass interior polygon against the liquid half-plane y >= lvl + m*x
  const tmp = [];
  function liquidPoly(poly, lvl, m) {
    tmp.length = 0;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const fa = a[1] - (lvl + m * a[0]), fb = b[1] - (lvl + m * b[0]);
      if (fa >= 0) tmp.push(a[0], a[1]);
      if ((fa >= 0) !== (fb >= 0)) { const k = fa / (fa - fb); tmp.push(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); }
    }
    return tmp;
  }
  const cache = {};
  function sprites(s) {
    const key = Math.round(s * 8); if (cache[key]) return cache[key];
    const r = { front: {}, garn: {}, ice: iceSprite(s * 0.26 * 3), glint: K.glintSprite(s * 0.5) };
    Object.keys(POLY).forEach((k) => (r.front[k] = glassFront(k, s * 4)));
    ['cherry', 'olive', 'peel', 'twist', 'mint', 'orange'].forEach((g) => (r.garn[g] = garnish(g, s * 4)));
    return (cache[key] = r);
  }
  function live(ctx, t, s, T, st) {
    const d = D[t], sp = sprites(s), poly = POLY[d.glass];
    // slosh: spring tilt from the piece (or ripple) plus a gentle idle sway
    const tilt = clamp(st.tilt + Math.sin(T * 1.4 + st.ph) * 0.05, -0.55, 0.55), m = Math.tan(tilt) * 0.9;
    const lvl = d.lvl + Math.sin(T * 2.3 + st.ph * 1.7) * 0.008 - st.k * 0.03;
    const pts = liquidPoly(poly, lvl, m);
    if (pts.length >= 6) {
      ctx.beginPath(); for (let i = 0; i < pts.length; i += 2) (i ? ctx.lineTo(pts[i] * s, pts[i + 1] * s) : ctx.moveTo(pts[i] * s, pts[i + 1] * s)); ctx.closePath();
      ctx.fillStyle = rgba(d.liq, d.a); ctx.fill();
      if (d.louche) { // milky absinthe swirl blooming through the green
        ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(240,255,220,0.35)';
        for (let i = 0; i < 3; i++) { const a = T * 0.8 + i * 2.1 + st.ph; ellipse(ctx, Math.cos(a) * s * 0.12, -0.12 * s + Math.sin(a * 1.3) * s * 0.04, s * 0.1, s * 0.035, a); ctx.fill(); }
        ctx.restore();
      }
      // darker depth toward the bottom
      ctx.fillStyle = 'rgba(40,10,0,0.18)'; ctx.beginPath(); for (let i = 0; i < pts.length; i += 2) (i ? ctx.lineTo(pts[i] * s * 0.8, pts[i + 1] * s * 0.6 + s * 0.12) : ctx.moveTo(pts[i] * s * 0.8, pts[i + 1] * s * 0.6 + s * 0.12)); ctx.closePath(); ctx.fill();
      // surface line (meniscus) across the glass
      const xl = poly[0][0] * 0.98, xr = -xl;
      const y0 = (lvl + m * xl), y1 = (lvl + m * xr);
      ctx.strokeStyle = rgba(shade(d.liq, 0.55), 0.9); ctx.lineWidth = Math.max(1, s * 0.035);
      ctx.beginPath(); let started = false;
      for (let i = 0; i <= 6; i++) { const xx = lerp(xl, xr, i / 6), yy = lerp(y0, y1, i / 6) + Math.sin(T * 6 + i * 1.3 + st.ph) * 0.006; const f = insideX(poly, yy); if (xx < f[0] || xx > f[1]) continue; started ? ctx.lineTo(xx * s, yy * s) : ctx.moveTo(xx * s, yy * s); started = true; }
      ctx.stroke();
      // ice cubes ride the surface and knock together
      if (d.ice) for (let i = 0; i < d.ice; i++) {
        const ix = (i ? 0.1 : -0.06) + Math.sin(T * 1.1 + st.ph + i * 2) * 0.03 - tilt * 0.12, iy = lvl + m * ix + 0.05 + Math.abs(Math.sin(T * 2.2 + i + st.ph)) * 0.015 + st.k * 0.04;
        ctx.save(); ctx.translate(ix * s, iy * s); ctx.rotate(Math.sin(T * 1.7 + i * 3 + st.ph) * 0.18 + tilt * 0.6); ctx.drawImage(sp.ice, -s * 0.13, -s * 0.13, s * 0.26, s * 0.26); ctx.restore();
      }
      // rising bubbles that pop at the surface
      if (d.bubbles) {
        ctx.fillStyle = 'rgba(255,255,240,0.85)'; ctx.beginPath();
        const bot = poly[poly.length - 1][1] - 0.04;
        for (let i = 0; i < d.bubbles; i++) {
          const ph = (T * (0.45 + (i % 3) * 0.12) + i * 0.37 + st.ph * 0.13) % 1;
          const bx = ((i * 0.37 + st.ph * 0.07) % 1 - 0.5) * (d.glass === 'flute' ? 0.14 : 0.3) + Math.sin(T * 5 + i) * 0.01;
          const surf = lvl + m * bx, by = lerp(bot, surf, ph), r = s * (0.012 + ph * 0.012);
          if (ph > 0.96) { ctx.moveTo(bx * s + r * 2, surf * s); ctx.arc(bx * s, surf * s, r * 2, 0, TAU); continue; }
          ctx.moveTo(bx * s + r, by * s); ctx.arc(bx * s, by * s, r, 0, TAU);
        }
        ctx.fill();
      }
      // light refraction: a caustic glint that slides with the tilt
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 + 0.2 * Math.sin(T * 2 + st.ph);
      ctx.drawImage(sp.glint, (-0.16 - tilt * 0.4) * s, (lvl + 0.04) * s, s * 0.32, s * 0.2);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
    // garnish: bobs on the surface / sways on the rim
    const gk = d.garn;
    if (gk !== 'none') {
      const g = sp.garn[gk]; let gx = 0, gy = 0, rot = 0;
      if (gk === 'olive') { gx = 0; gy = 0; rot = tilt * 0.5 + Math.sin(T * 1.6 + st.ph) * 0.05; }
      else if (gk === 'cherry') { gx = -0.04; gy = lvl + m * -0.04 + 0.02 + Math.sin(T * 3 + st.ph) * 0.02 - st.k * 0.05; rot = Math.sin(T * 2 + st.ph) * 0.3 + tilt; }
      else if (gk === 'mint' || gk === 'orange') { rot = Math.sin(T * 1.3 + st.ph) * 0.06 + tilt * 0.3; }
      else { rot = Math.sin(T * 1.8 + st.ph) * 0.12 + tilt * 0.4; gx = 0.04; }
      ctx.save(); ctx.translate(gx * s, gy * s); ctx.rotate(rot); ctx.drawImage(g, -s, -s, s * 2, s * 2); ctx.restore();
      if (d.cherry) { const cy = lvl + m * 0.12 + 0.12 + Math.sin(T * 2.6 + st.ph) * 0.025 - st.k * 0.05; ctx.save(); ctx.translate(0.12 * s, cy * s); ctx.rotate(Math.sin(T * 2 + st.ph) * 0.4); ctx.drawImage(sp.garn.cherry, -s * 0.7, -s * 0.7, s * 1.4, s * 1.4); ctx.restore(); }
    }
    ctx.drawImage(sp.front[d.glass], -s, -s, s * 2, s * 2);
  }
  function insideX(poly, y) { // horizontal extent of the convex glass at height y
    let lo = 1, hi = -1;
    for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) { const xx = a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]); lo = Math.min(lo, xx); hi = Math.max(hi, xx); } }
    return [lo + 0.01, hi - 0.01];
  }
  return { base, live, D };
})();
