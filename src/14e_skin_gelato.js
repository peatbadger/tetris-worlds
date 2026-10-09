/* ---- Gelato blocks: heaped, swirled flavours in steel tins; melt wobble + drips ---- */
SKINSETS.gelato = (() => {
  const K = SkinKit;
  const F = [null,
    { name: 'Pistachio', c: '#a8c878', d: '#6a8a40', bits: '#5a8a2a', bits2: '#c8a070' },
    { name: 'Stracciatella', c: '#fbf6ea', d: '#d8ccb4', shards: 1 },
    { name: 'Fragola', c: '#f6a0b4', d: '#d0607a', ripple: '#c81a3a', berry: 1 },
    { name: 'Mango', c: '#ffb43a', d: '#e07a10', cube: 1 },
    { name: 'Cioccolato', c: '#6a3a1c', d: '#3a1c0a', chips: 1, wafer: 1 },
    { name: 'Mirtillo', c: '#a07ac8', d: '#6a3a98', ripple: '#3a1a6a', blue: 1 },
    { name: 'Limone', c: '#fbec8a', d: '#d8c040', zest: 1 },
  ];
  // a hand-rounded scoop: soft ball, paddle-pressed lip at its base, cold matte sheen + flavour inclusions
  function scoop(x, P, f, cx, cy, r, rnd) {
    // ragged lip where the scoop was pressed off the spatola
    x.beginPath(); for (let k = 0; k <= 28; k++) { const a = Math.PI * (0.02 + k / 28 * 0.96), rr = r * (1.04 + (k % 2 ? 0.06 : -0.02) + rnd() * 0.05); x.lineTo(cx + Math.cos(a) * rr * 1.06, cy + Math.sin(a) * rr * 0.52 + r * 0.18); } x.closePath();
    x.fillStyle = shade(f.c, -0.12); x.fill();
    ellipse(x, cx, cy, r, r * 0.92);
    x.fillStyle = radial(x, cx - r * 0.35, cy - r * 0.4, r * 1.5, [[0, shade(f.c, 0.32)], [0.45, f.c], [0.85, f.d], [1, shade(f.d, -0.2)]]); x.fill();
    // creamy folds
    x.strokeStyle = rgba(shade(f.d, -0.15), 0.35); x.lineWidth = P * 0.012;
    for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(cx + (k - 1) * r * 0.35, cy + r * 0.25, r * (0.45 + k * 0.08), Math.PI * 1.1, Math.PI * 1.75); x.stroke(); }
    x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = P * 0.014; x.beginPath(); x.arc(cx, cy, r * 0.78, Math.PI * 1.15, Math.PI * 1.45); x.stroke();
    // frosty speckle (cold matte texture)
    for (let k = 0; k < 40; k++) { const a = rnd() * TAU, d = Math.sqrt(rnd()) * r * 0.9; x.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,0.18)' : rgba(f.d, 0.25); x.fillRect(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.9, P * 0.01, P * 0.01); }
  }
  function cone(x, P, cx, top, bot, w) {
    x.beginPath(); x.moveTo(cx - w, top); x.lineTo(cx + w, top); x.lineTo(cx + w * 0.12, bot); x.quadraticCurveTo(cx, bot + P * 0.02, cx - w * 0.12, bot); x.closePath();
    x.fillStyle = linear(x, cx - w, 0, cx + w, 0, [[0, '#a8682a'], [0.45, '#e8b468'], [1, '#9a5a20']]); x.fill();
    x.save(); x.clip(); x.strokeStyle = 'rgba(110,60,20,0.55)'; x.lineWidth = P * 0.012;
    for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(cx + k * P * 0.06, top); x.lineTo(cx + k * P * 0.06 + P * 0.3, bot); x.moveTo(cx + k * P * 0.06, top); x.lineTo(cx + k * P * 0.06 - P * 0.3, bot); x.stroke(); }
    x.fillStyle = 'rgba(255,230,180,0.25)'; for (let k = -6; k <= 6; k++) for (let j = 0; j < 4; j++) x.fillRect(cx + k * P * 0.06 + j * P * 0.02, top + j * P * 0.06 + P * 0.02, P * 0.02, P * 0.02);
    x.restore();
  }
  function cup(x, P, cx, top, bot, w, band) {
    x.beginPath(); x.moveTo(cx - w, top); x.lineTo(cx + w, top); x.lineTo(cx + w * 0.78, bot); x.lineTo(cx - w * 0.78, bot); x.closePath();
    x.fillStyle = linear(x, cx - w, 0, cx + w, 0, [[0, '#d8d4e0'], [0.4, '#ffffff'], [1, '#c8c4d0']]); x.fill();
    x.fillStyle = band; x.fillRect(cx - w * 0.92, top + (bot - top) * 0.35, w * 1.84, (bot - top) * 0.22);
    x.fillStyle = 'rgba(255,255,255,0.6)'; for (let k = 0; k < 5; k++) { ellipse(x, cx - w * 0.6 + k * w * 0.3, top + (bot - top) * 0.46, P * 0.012, P * 0.012); x.fill(); }
    ellipse(x, cx, top, w, P * 0.04); x.fillStyle = '#efeaf4'; x.fill();
  }
  function base(x, t, P) {
    const f = F[t], rnd = mulberry32(t * 53 + 1), c = P / 2;
    // pastel tile with tiny gelateria pattern
    K.tile(x, P, ['', '#e8f4dc', '#fbf3ea', '#fde2ea', '#fff0d8', '#f0e4dc', '#ece2f8', '#fdf8d8'][t], ['', '#b8d4a0', '#e0d0bc', '#f0b0c4', '#f8c890', '#c8a890', '#c8b4e8', '#f0e08a'][t], 0.14);
    x.fillStyle = 'rgba(255,255,255,0.35)'; for (let k = 0; k < 9; k++) { ellipse(x, P * (0.12 + (k % 3) * 0.38), P * (0.12 + Math.floor(k / 3) * 0.38), P * 0.025, P * 0.025); x.fill(); }
    x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = P * 0.02; roundRect(x, P * 0.05, P * 0.05, P * 0.9, P * 0.9, P * 0.12); x.stroke();
    const any = (cx, cy, r, n, fn) => { for (let i = 0; i < n; i++) { const a = rnd() * TAU, d = Math.sqrt(rnd()) * r; fn(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.85, a); } };
    let sx = c, sy = c - P * 0.08, sr = P * 0.27;
    if (t === 1 || t === 4 || t === 6) cone(x, P, c, P * 0.5, P * 0.94, P * 0.2);
    else if (t === 7) { // sorbetto al limone served in a hollowed lemon
      ellipse(x, c, P * 0.62, P * 0.36, P * 0.24); x.fillStyle = radial(x, c - P * 0.1, P * 0.55, P * 0.4, [[0, '#fff27a'], [0.7, '#f2d020'], [1, '#c8a010']]); x.fill();
      x.fillStyle = 'rgba(160,120,0,0.35)'; for (let k = 0; k < 30; k++) x.fillRect(c + (rnd() - 0.5) * P * 0.6, P * (0.5 + rnd() * 0.25), P * 0.01, P * 0.01);
      ellipse(x, c, P * 0.5, P * 0.3, P * 0.08); x.fillStyle = '#fff8d0'; x.fill(); x.strokeStyle = '#f0d040'; x.lineWidth = P * 0.02; x.stroke();
      ellipse(x, c + P * 0.34, P * 0.66, P * 0.05, P * 0.03); x.fillStyle = '#b89010'; x.fill();
      sy = P * 0.38; sr = P * 0.24;
    } else cup(x, P, c, P * 0.55, P * 0.92, P * 0.3, ['', '', '#7ac8b8', '#f06a9a', '', '#6a3a1c', '', ''][t]);
    if (t === 3) { scoop(x, P, f, c - P * 0.12, P * 0.42, P * 0.2, rnd); scoop(x, P, f, c + P * 0.13, P * 0.36, P * 0.2, rnd); sx = c; sy = P * 0.38; sr = P * 0.3; }
    else scoop(x, P, f, sx, sy, sr, rnd);
    // inclusions + garnish per flavour
    if (f.bits) { any(sx, sy, sr * 0.8, 20, (px, py, a) => { x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = rnd() < 0.7 ? f.bits : f.bits2; x.fillRect(-P * 0.018, -P * 0.012, P * 0.036, P * 0.024); x.restore(); }); ellipse(x, sx + sr * 0.2, sy - sr * 0.75, P * 0.05, P * 0.035, 0.4); x.fillStyle = '#7aa83a'; x.fill(); ellipse(x, sx + sr * 0.18, sy - sr * 0.78, P * 0.03, P * 0.018, 0.4); x.fillStyle = '#a8d060'; x.fill(); }
    if (f.shards) { any(sx, sy, sr * 0.85, 18, (px, py, a) => { x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = '#2a140a'; x.beginPath(); x.moveTo(-P * 0.03, 0); x.lineTo(P * 0.01, -P * 0.015); x.lineTo(P * 0.035, P * 0.01); x.lineTo(0, P * 0.015); x.closePath(); x.fill(); x.restore(); }); // wooden tasting spoon
      x.save(); x.translate(c + P * 0.2, P * 0.42); x.rotate(-0.5); x.fillStyle = '#e8c890'; roundRect(x, -P * 0.02, -P * 0.22, P * 0.04, P * 0.26, P * 0.02); x.fill(); ellipse(x, 0, -P * 0.22, P * 0.04, P * 0.05); x.fill(); x.restore(); }
    if (f.ripple) { x.strokeStyle = rgba(f.ripple, 0.75); x.lineWidth = P * 0.028; x.lineCap = 'round'; for (let k = 0; k < 2; k++) { x.beginPath(); for (let j = 0; j <= 6; j++) { const xx = sx - sr * 0.7 + j * sr * 0.23, yy = sy - sr * 0.2 + k * sr * 0.4 + Math.sin(j * 1.3 + k * 2) * P * 0.03; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } }
    if (f.berry) { x.save(); x.translate(c + P * 0.02, P * 0.14); ellipse(x, 0, 0, P * 0.08, P * 0.09); x.fillStyle = radial(x, -P * 0.02, -P * 0.03, P * 0.1, [[0, '#ff5a6a'], [1, '#b80a2a']]); x.fill(); x.fillStyle = '#fff0a0'; for (let k = 0; k < 7; k++) x.fillRect(-P * 0.05 + (k % 3) * P * 0.04, -P * 0.04 + Math.floor(k / 3) * P * 0.035, P * 0.01, P * 0.014); x.fillStyle = '#3a9a3a'; for (let k = 0; k < 4; k++) { ellipse(x, Math.cos(k * 1.6) * P * 0.03, -P * 0.08 + Math.sin(k * 1.6) * P * 0.01, P * 0.03, P * 0.012, k * 1.6); x.fill(); } x.restore(); }
    if (f.blue) any(sx, sy - sr * 0.3, sr * 0.6, 5, (px, py) => { ellipse(x, px, py, P * 0.035, P * 0.035); x.fillStyle = radial(x, px - P * 0.01, py - P * 0.01, P * 0.04, [[0, '#8a9ae8'], [1, '#2a2a6a']]); x.fill(); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(px - P * 0.012, py - P * 0.015, P * 0.01, P * 0.008); });
    if (f.cube) { for (let k = 0; k < 2; k++) { x.save(); x.translate(sx - P * 0.06 + k * P * 0.12, sy - sr * 0.75 + k * P * 0.03); x.rotate(0.4 + k); roundRect(x, -P * 0.045, -P * 0.045, P * 0.09, P * 0.09, P * 0.02); x.fillStyle = '#ffc020'; x.fill(); x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(-P * 0.035, -P * 0.035, P * 0.04, P * 0.015); x.restore(); } }
    if (f.zest) any(sx, sy, sr * 0.8, 16, (px, py, a) => { x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = '#e0b800'; x.fillRect(-P * 0.025, -P * 0.005, P * 0.05, P * 0.01); x.restore(); });
    if (f.chips) { // dark chocolate: curls of shaved chocolate + a rolled wafer
      any(sx, sy, sr * 0.75, 10, (px, py, a) => { x.save(); x.translate(px, py); x.rotate(a); x.strokeStyle = '#2a1206'; x.lineWidth = P * 0.02; x.beginPath(); x.arc(0, 0, P * 0.025, 0, Math.PI * 1.3); x.stroke(); x.strokeStyle = 'rgba(255,220,180,0.4)'; x.lineWidth = P * 0.006; x.beginPath(); x.arc(0, 0, P * 0.02, 0.2, 1.2); x.stroke(); x.restore(); });
      x.save(); x.translate(c + P * 0.22, P * 0.28); x.rotate(0.55); x.fillStyle = linear(x, -P * 0.04, 0, P * 0.04, 0, [[0, '#a8682a'], [0.5, '#f0c070'], [1, '#9a5a20']]); roundRect(x, -P * 0.035, -P * 0.17, P * 0.07, P * 0.25, P * 0.03); x.fill(); x.strokeStyle = 'rgba(110,60,20,0.5)'; x.lineWidth = P * 0.008; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(-P * 0.035, -P * 0.15 + k * P * 0.04); x.lineTo(P * 0.035, -P * 0.13 + k * P * 0.04); x.stroke(); } x.restore();
    }
    if (t === 7) { x.fillStyle = '#3aa04a'; ellipse(x, sx - P * 0.06, sy - sr * 0.85, P * 0.06, P * 0.025, 0.5); x.fill(); ellipse(x, sx + P * 0.03, sy - sr * 0.9, P * 0.06, P * 0.025, -0.6); x.fill(); x.strokeStyle = '#1a6a2a'; x.lineWidth = P * 0.006; x.beginPath(); x.moveTo(sx - P * 0.11, sy - sr * 0.8); x.lineTo(sx - P * 0.01, sy - sr * 0.9); x.stroke(); }
    K.gloss(x, P, 0.16);
  }
  const glints = {};
  function live(ctx, t, s, T, st) {
    const f = F[t];
    // soft melt sheen sliding over the heap
    const key = Math.round(s * 4), gl = glints[key] || (glints[key] = K.glintSprite(s * 0.8));
    const ph = (T * 0.25 + st.ph * 0.11) % 1.6;
    if (ph < 1) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.5; ctx.drawImage(gl, -s * 0.4 + ph * s * 0.3, -s * 0.3 + Math.sin(ph * 3) * s * 0.05, s * 0.5, s * 0.5); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
    // occasional drip slipping down the tin
    const dp = (T * 0.11 + st.ph * 0.0731) % 1;
    if (dp < 0.3) {
      const k = dp / 0.3, len = Math.sin(k * Math.PI) * s * 0.22, dx = ((st.ph * 37) % 5 / 5 - 0.5) * s * 0.4;
      ctx.fillStyle = f.c; ctx.beginPath(); ctx.moveTo(dx - s * 0.035, s * 0.12); ctx.lineTo(dx - s * 0.02, s * 0.12 + len); ctx.arc(dx, s * 0.12 + len, s * 0.03, Math.PI, 0, true); ctx.lineTo(dx + s * 0.035, s * 0.12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(dx - s * 0.012, s * 0.12 + len * 0.4, s * 0.01, len * 0.4);
    }
  }
  const faces = [null, { y: -0.08, s: 0.85 }, { y: -0.08, s: 0.85 }, { y: -0.1, s: 0.8 }, { y: -0.08, s: 0.85 }, { y: -0.08, s: 0.85, ink: '#fff4e4', dark: true }, { y: -0.06, s: 0.85 }, { y: -0.12, s: 0.8 }];
  return { base, live, F, faces, noFace: true }; // faces removed so the food reads clearly (character from live motion)
})();
