/* ---- Golden Arches (fast-food tribute) blocks: burgers, fries, nuggets, pie, soft-serve, soda ---- */
SKINSETS.fastfood = (() => {
  const K = SkinKit;
  const N = [null, 'Double-decker burger', 'Cheeseburger', 'Fries', 'Nuggets & dip', 'Apple pie', 'Soft-serve swirl', 'Soda'];
  const BG = [null, '#b01c16', '#f0b41c', '#f4ece0', '#2a6ac0', '#8a4a1a', '#e47ab0', '#169a9a'];
  function bun(x, cx, y, w, h, top, rnd, P) {
    x.beginPath(); if (top) { x.moveTo(cx - w, y); x.bezierCurveTo(cx - w, y - h * 1.6, cx + w, y - h * 1.6, cx + w, y); x.closePath(); } else roundRect(x, cx - w, y, w * 2, h, h * 0.4);
    x.fillStyle = linear(x, 0, y - (top ? h * 1.2 : 0), 0, y + (top ? 0 : h), [[0, '#f4b860'], [0.5, '#d88a2a'], [1, '#a8601a']]); x.fill();
    if (top) { x.fillStyle = 'rgba(255,230,170,0.5)'; ellipse(x, cx - w * 0.3, y - h * 0.9, w * 0.3, h * 0.25, -0.2); x.fill(); for (let k = 0; k < 14; k++) { const sx = cx + (rnd() - 0.5) * w * 1.6, sy = y - h * (0.3 + rnd() * 0.85); ellipse(x, sx, sy, P * 0.014, P * 0.008, rnd() * 3); x.fillStyle = '#fbf2d8'; x.fill(); } }
  }
  function patty(x, cx, y, w, h, rnd, P) { roundRect(x, cx - w, y, w * 2, h, h * 0.5); x.fillStyle = linear(x, 0, y, 0, y + h, [[0, '#6a3a1a'], [0.5, '#4a2410'], [1, '#2a1206']]); x.fill(); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(140,80,40,0.6)'; x.fillRect(cx - w + rnd() * w * 2, y + rnd() * h, P * 0.016, P * 0.01); } }
  function lettuce(x, cx, y, w, P) { x.fillStyle = '#5ac83a'; x.beginPath(); x.moveTo(cx - w * 1.05, y); for (let k = 0; k <= 10; k++) x.lineTo(cx - w * 1.05 + k * w * 0.21, y + (k % 2 ? P * 0.035 : -P * 0.005)); x.lineTo(cx + w, y - P * 0.02); x.lineTo(cx - w, y - P * 0.02); x.closePath(); x.fill(); }
  function cheese(x, cx, y, w, P) { x.fillStyle = '#ffc020'; x.beginPath(); x.moveTo(cx - w * 1.02, y); x.lineTo(cx + w * 1.02, y); x.lineTo(cx + w * 0.7, y + P * 0.06); x.lineTo(cx + w * 0.6, y + P * 0.02); x.lineTo(cx - w * 0.4, y + P * 0.02); x.lineTo(cx - w * 0.5, y + P * 0.07); x.lineTo(cx - w * 0.75, y + P * 0.02); x.closePath(); x.fill(); }
  function base(x, t, P) {
    const rnd = mulberry32(t * 41 + 23), c = P / 2;
    K.tile(x, P, shade(BG[t], 0.2), shade(BG[t], -0.35), 0.14);
    x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = P * 0.015; roundRect(x, P * 0.06, P * 0.06, P * 0.88, P * 0.88, P * 0.1); x.stroke();
    ellipse(x, c + P * 0.02, c + P * 0.34, P * 0.3, P * 0.06); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fill();
    const w = P * 0.32;
    switch (t) {
      case 1: bun(x, c, c + P * 0.3, w, P * 0.09, false, rnd, P); patty(x, c, c + P * 0.2, w * 0.98, P * 0.1, rnd, P); x.fillStyle = '#f6e6b0'; x.fillRect(c - w, c + P * 0.17, w * 2, P * 0.03); lettuce(x, c, c + P * 0.17, w, P); bun(x, c, c + P * 0.06, w * 0.96, P * 0.09, false, rnd, P); patty(x, c, c - P * 0.04, w * 0.98, P * 0.1, rnd, P); cheese(x, c, c - P * 0.05, w, P); lettuce(x, c, c - P * 0.06, w, P); bun(x, c, c - P * 0.07, w, P * 0.13, true, rnd, P); break;
      case 2: bun(x, c, c + P * 0.18, w, P * 0.11, false, rnd, P); patty(x, c, c + P * 0.06, w, P * 0.12, rnd, P); cheese(x, c, c + P * 0.04, w, P); x.fillStyle = '#e8401a'; x.fillRect(c - w * 0.6, c + P * 0.02, w * 0.4, P * 0.025); x.fillStyle = '#f6e080'; ellipse(x, c + w * 0.3, c + P * 0.03, P * 0.04, P * 0.012); x.fill(); bun(x, c, c + P * 0.03, w, P * 0.17, true, rnd, P); break;
      case 3: { // red carton, golden fries (fries jiggle live)
        x.beginPath(); x.moveTo(c - P * 0.26, c - P * 0.06); x.lineTo(c + P * 0.26, c - P * 0.06); x.lineTo(c + P * 0.19, c + P * 0.38); x.lineTo(c - P * 0.19, c + P * 0.38); x.closePath();
        x.fillStyle = linear(x, c - P * 0.26, 0, c + P * 0.26, 0, [[0, '#a8100c'], [0.4, '#e8241a'], [1, '#8a0c08']]); x.fill();
        x.strokeStyle = '#ffcc1a'; x.lineWidth = P * 0.035; x.beginPath(); x.moveTo(c - P * 0.12, c + P * 0.24); x.quadraticCurveTo(c - P * 0.06, c + P * 0.04, c, c + P * 0.2); x.quadraticCurveTo(c + P * 0.06, c + P * 0.04, c + P * 0.12, c + P * 0.24); x.stroke();
        x.beginPath(); x.moveTo(c - P * 0.26, c - P * 0.06); x.quadraticCurveTo(c, c + P * 0.04, c + P * 0.26, c - P * 0.06); x.strokeStyle = 'rgba(80,0,0,0.5)'; x.lineWidth = P * 0.012; x.stroke();
        break;
      }
      case 4: { // nuggets around a dip pot
        ellipse(x, c + P * 0.16, c - P * 0.14, P * 0.13, P * 0.11); x.fillStyle = '#f4f0e8'; x.fill(); ellipse(x, c + P * 0.16, c - P * 0.15, P * 0.1, P * 0.08); x.fillStyle = radial(x, c + P * 0.13, c - P * 0.17, P * 0.1, [[0, '#e8b050'], [1, '#a8601a']]); x.fill();
        [[-0.16, -0.12], [-0.16, 0.12], [0.08, 0.16], [-0.02, -0.0]].forEach(([dx, dy], i) => { const px = c + dx * P, py = c + dy * P; x.beginPath(); for (let k = 0; k <= 9; k++) { const a = k / 9 * TAU, r = P * (0.12 + Math.sin(k * 2.3 + i) * 0.015); k ? x.lineTo(px + Math.cos(a) * r * 1.15, py + Math.sin(a) * r * 0.85) : x.moveTo(px + Math.cos(a) * r * 1.15, py + Math.sin(a) * r * 0.85); } x.closePath(); x.fillStyle = radial(x, px - P * 0.04, py - P * 0.04, P * 0.16, [[0, '#f8d080'], [0.6, '#e09a3a'], [1, '#a8601a']]); x.fill(); for (let k = 0; k < 10; k++) { x.fillStyle = rnd() < 0.5 ? 'rgba(255,230,160,0.7)' : 'rgba(150,80,20,0.5)'; x.fillRect(px + (rnd() - 0.5) * P * 0.2, py + (rnd() - 0.5) * P * 0.15, P * 0.016, P * 0.012); } });
        break;
      }
      case 5: { // turnover-style apple pie with bubbling vents
        x.save(); x.translate(c, c); x.rotate(-0.1); roundRect(x, -P * 0.34, -P * 0.18, P * 0.68, P * 0.36, P * 0.08); x.fillStyle = linear(x, 0, -P * 0.18, 0, P * 0.18, [[0, '#f4c068'], [0.5, '#d8902a'], [1, '#9a5a14']]); x.fill();
        for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(255,240,200,0.6)'; x.fillRect((rnd() - 0.5) * P * 0.62, (rnd() - 0.5) * P * 0.3, P * 0.012, P * 0.012); }
        for (let k = 0; k < 3; k++) { roundRect(x, -P * 0.22 + k * P * 0.17, -P * 0.06, P * 0.1, P * 0.05, P * 0.025); x.fillStyle = '#8a2a0a'; x.fill(); }
        x.restore(); break;
      }
      case 6: { // soft-serve swirl in a cup
        x.beginPath(); x.moveTo(c - P * 0.22, c + P * 0.02); x.lineTo(c + P * 0.22, c + P * 0.02); x.lineTo(c + P * 0.17, c + P * 0.38); x.lineTo(c - P * 0.17, c + P * 0.38); x.closePath(); x.fillStyle = linear(x, c - P * 0.22, 0, c + P * 0.22, 0, [[0, '#d8d8e0'], [0.5, '#ffffff'], [1, '#c0c0c8']]); x.fill();
        x.fillStyle = '#e8241a'; x.fillRect(c - P * 0.2, c + P * 0.12, P * 0.4, P * 0.06);
        for (let k = 0; k < 4; k++) { const ww = P * (0.24 - k * 0.05), yy = c - k * P * 0.09; ellipse(x, c + (k % 2 ? -1 : 1) * P * 0.01, yy, ww, P * 0.07); x.fillStyle = radial(x, c - ww * 0.4, yy - P * 0.03, ww * 1.4, [[0, '#ffffff'], [0.7, '#f6f0e4'], [1, '#d8ccb4']]); x.fill(); x.strokeStyle = 'rgba(180,160,130,0.4)'; x.lineWidth = P * 0.008; x.stroke(); }
        x.beginPath(); x.moveTo(c - P * 0.02, c - P * 0.3); x.quadraticCurveTo(c + P * 0.04, c - P * 0.4, c + P * 0.06, c - P * 0.36); x.lineTo(c + P * 0.02, c - P * 0.28); x.fillStyle = '#f6f0e4'; x.fill();
        x.fillStyle = '#4a2410'; for (let k = 0; k < 10; k++) x.fillRect(c + (rnd() - 0.5) * P * 0.36, c - P * 0.2 + rnd() * P * 0.2, P * 0.02, P * 0.014);
        break;
      }
      default: { // soda cup: lid + straw; liquid & ice glimpsed through a window band
        x.beginPath(); x.moveTo(c - P * 0.24, c - P * 0.24); x.lineTo(c + P * 0.24, c - P * 0.24); x.lineTo(c + P * 0.18, c + P * 0.38); x.lineTo(c - P * 0.18, c + P * 0.38); x.closePath();
        x.fillStyle = linear(x, c - P * 0.24, 0, c + P * 0.24, 0, [[0, '#d8d8d8'], [0.5, '#ffffff'], [1, '#c8c8c8']]); x.fill();
        x.fillStyle = '#e8241a'; x.beginPath(); x.moveTo(c - P * 0.22, c - P * 0.05); x.lineTo(c + P * 0.22, c - P * 0.05); x.lineTo(c + P * 0.2, c + P * 0.12); x.lineTo(c - P * 0.2, c + P * 0.12); x.closePath(); x.fill();
        x.strokeStyle = '#ffcc1a'; x.lineWidth = P * 0.03; x.beginPath(); x.moveTo(c - P * 0.08, c + P * 0.1); x.quadraticCurveTo(c - P * 0.04, c - P * 0.04, c, c + P * 0.08); x.quadraticCurveTo(c + P * 0.04, c - P * 0.04, c + P * 0.08, c + P * 0.1); x.stroke();
        roundRect(x, c - P * 0.27, c - P * 0.3, P * 0.54, P * 0.07, P * 0.03); x.fillStyle = '#f0f0f0'; x.fill(); x.strokeStyle = 'rgba(0,0,0,0.2)'; x.lineWidth = P * 0.008; x.stroke();
        x.save(); x.translate(c + P * 0.06, c - P * 0.3); x.rotate(0.25); x.fillStyle = '#ffffff'; x.fillRect(-P * 0.025, -P * 0.2, P * 0.05, P * 0.2); x.fillStyle = '#e8241a'; for (let k = 0; k < 4; k++) x.fillRect(-P * 0.025, -P * 0.2 + k * P * 0.05, P * 0.05, P * 0.02); x.restore();
      }
    }
    K.gloss(x, P, 0.2);
  }
  const fryC = {};
  function fry(s) { const k = Math.round(s * 4); if (fryC[k]) return fryC[k]; const c = makeCanvas(Math.ceil(s * 0.1) + 2, Math.ceil(s * 0.5)), x = c.getContext('2d'); x.fillStyle = linear(x, 0, 0, c.width, 0, [[0, '#d8a020'], [0.4, '#ffe060'], [1, '#c89018']]); roundRect(x, 1, 0, c.width - 2, c.height, 1); x.fill(); x.fillStyle = 'rgba(160,90,10,0.6)'; x.fillRect(1, 0, c.width - 2, 1.5); return (fryC[k] = c); }
  function live(ctx, t, s, T, st) {
    if (t === 3) { // fries jiggle in the carton
      const f = fry(s); const n = 7;
      for (let i = 0; i < n; i++) { const fx = (-0.2 + i * 0.065) * s, j = Math.sin(T * 6 + i * 1.9 + st.ph) * 0.02 + st.k * 0.06 * Math.sin(i), h = s * (0.42 + ((i * 37) % 5) * 0.03); ctx.save(); ctx.translate(fx, -0.04 * s); ctx.rotate((i - 3) * 0.06 + j); ctx.drawImage(f, -f.width / 2, -h, f.width, h); ctx.restore(); }
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 4; i++) { const a = Math.sin(T * 3 + i * 1.7 + st.ph); if (a > 0.6) ctx.fillRect((-0.15 + i * 0.1) * s, -s * 0.35, 1.2, 1.2); }
      ctx.beginPath(); ctx.moveTo(-0.26 * s, -0.06 * s); ctx.lineTo(0.26 * s, -0.06 * s); ctx.lineTo(0.235 * s, 0.1 * s); ctx.lineTo(-0.235 * s, 0.1 * s); ctx.closePath(); ctx.fillStyle = '#d81e16'; ctx.fill();
    }
    if (t === 5) { for (let i = 0; i < 3; i++) { const ph = (T * 0.8 + i * 0.33 + st.ph * 0.1) % 1, r = s * 0.035 * Math.sin(ph * Math.PI); if (r < 0.4) continue; ellipse(ctx, (-0.17 + i * 0.17) * s, -0.04 * s - ph * s * 0.03, r, r * 0.8); ctx.fillStyle = 'rgba(200,90,30,0.9)'; ctx.fill(); } }
    if (t === 7) { ctx.fillStyle = 'rgba(255,255,255,0.75)'; for (let i = 0; i < 4; i++) { const ph = (T * 0.9 + i * 0.27 + st.ph * 0.1) % 1; ctx.fillRect((-0.14 + i * 0.09) * s + Math.sin(T * 4 + i) * 1, (0.3 - ph * 0.55) * s, 1.4, 1.4); } }
    if (t === 6) { const w = Math.sin(T * 3 + st.ph) * 0.03; ctx.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(ctx, (-0.08 + w) * s, -0.18 * s, s * 0.05, s * 0.02); ctx.fill(); }
    if ((t === 1 || t === 2 || t === 5) && st.top) { const ph = (T * 0.35 + st.ph * 0.13) % 1; ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.3; ctx.fillStyle = '#fff'; ellipse(ctx, Math.sin(T + st.ph) * s * 0.1, -s * 0.5 - ph * s * 0.6, s * 0.1, s * 0.07); ctx.fill(); ctx.globalAlpha = 1; }
  }
  return { base, live, N, BG };
})();
