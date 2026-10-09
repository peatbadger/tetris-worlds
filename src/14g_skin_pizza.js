/* ---- Trattoria blocks: a different Italian dish per piece; bubbling cheese, steam, cheese-pull ---- */
SKINSETS.pizza = (() => {
  const K = SkinKit;
  const N = [null, 'Margherita', 'Diavola', 'Spaghetti al pomodoro', 'Gnocchi burro e salvia', 'Risotto', 'Penne arrabbiata', 'Lasagne'];
  const BG = [null, '#b8382a', '#8a1a12', '#c86a2a', '#c8a050', '#d8c890', '#a8402a', '#7a3a1a'];
  function basil(x, px, py, P, rot, sc = 1) { x.save(); x.translate(px, py); x.rotate(rot); x.scale(sc, sc); x.beginPath(); x.moveTo(0, -P * 0.07); x.quadraticCurveTo(P * 0.05, -P * 0.02, 0, P * 0.06); x.quadraticCurveTo(-P * 0.05, -P * 0.02, 0, -P * 0.07); x.fillStyle = linear(x, -P * 0.04, 0, P * 0.04, 0, [[0, '#1e6a1a'], [0.5, '#3aa030'], [1, '#1a5a16']]); x.fill(); x.strokeStyle = 'rgba(200,255,180,0.5)'; x.lineWidth = P * 0.006; x.beginPath(); x.moveTo(0, -P * 0.06); x.lineTo(0, P * 0.05); x.stroke(); x.restore(); }
  function sauce(x, P, rnd, cx, cy, r, col = '#c8281a') { for (let k = 0; k < 6; k++) { ellipse(x, cx + (rnd() - 0.5) * r, cy + (rnd() - 0.5) * r, r * (0.3 + rnd() * 0.3), r * (0.25 + rnd() * 0.25), rnd() * 3); x.fillStyle = k % 2 ? col : shade(col, -0.15); x.fill(); } }
  function base(x, t, P) {
    const rnd = mulberry32(t * 59 + 17), c = P / 2;
    // terracotta / checkered-cloth tile
    K.tile(x, P, shade(BG[t], 0.18), shade(BG[t], -0.4), 0.12);
    x.save(); roundRect(x, 0, 0, P, P, P * 0.12); x.clip(); x.fillStyle = 'rgba(255,255,255,0.07)'; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) x.fillRect(i * P / 4, j * P / 4, P / 4, P / 4); x.restore();
    const dish = (col = '#f4efe6') => { ellipse(x, c + P * 0.02, c + P * 0.04, P * 0.42, P * 0.42); x.fillStyle = 'rgba(0,0,0,0.3)'; x.fill(); ellipse(x, c, c, P * 0.42, P * 0.42); x.fillStyle = radial(x, c - P * 0.1, c - P * 0.1, P * 0.5, [[0, '#ffffff'], [1, shade(col, -0.15)]]); x.fill(); ellipse(x, c, c, P * 0.32, P * 0.32); x.strokeStyle = 'rgba(160,140,110,0.4)'; x.lineWidth = P * 0.01; x.stroke(); };
    switch (t) {
      case 1: case 2: { // pizza slice with leopard-spotted cornicione
        x.save(); x.translate(c, c + P * 0.02); x.rotate(t === 1 ? 0 : 0.2);
        const tri = () => { x.beginPath(); x.moveTo(0, P * 0.38); x.lineTo(-P * 0.32, -P * 0.26); x.quadraticCurveTo(0, -P * 0.42, P * 0.32, -P * 0.26); x.closePath(); };
        x.save(); x.translate(P * 0.02, P * 0.04); tri(); x.fillStyle = 'rgba(0,0,0,0.3)'; x.fill(); x.restore();
        tri(); x.fillStyle = '#e8b868'; x.fill();
        x.save(); tri(); x.clip();
        x.beginPath(); x.moveTo(0, P * 0.3); x.lineTo(-P * 0.26, -P * 0.2); x.quadraticCurveTo(0, -P * 0.32, P * 0.26, -P * 0.2); x.closePath(); x.fillStyle = '#c8301a'; x.fill();
        // crust char spots
        for (let k = 0; k < 14; k++) { const a = Math.PI * (1.15 + rnd() * 0.7); ellipse(x, Math.cos(a) * P * 0.36, -P * 0.0 + Math.sin(a) * P * 0.34 + P * 0.02, P * 0.02, P * 0.015); x.fillStyle = 'rgba(40,15,5,0.7)'; x.fill(); }
        if (t === 1) { for (let k = 0; k < 4; k++) { const px = (rnd() - 0.5) * P * 0.3, py = -P * 0.12 + rnd() * P * 0.28 - Math.abs(px) * 0.2; ellipse(x, px, py, P * 0.07, P * 0.06); x.fillStyle = radial(x, px - P * 0.02, py - P * 0.02, P * 0.08, [[0, '#ffffff'], [0.7, '#f8f0dc'], [1, '#e0c8a0']]); x.fill(); } basil(x, P * 0.05, -P * 0.05, P, 0.6); basil(x, -P * 0.08, P * 0.08, P, -0.9, 0.8); }
        else { x.fillStyle = 'rgba(250,230,160,0.8)'; ellipse(x, 0, -P * 0.05, P * 0.18, P * 0.16); x.fill(); for (let k = 0; k < 5; k++) { const px = (rnd() - 0.5) * P * 0.34, py = -P * 0.14 + rnd() * P * 0.3 - Math.abs(px) * 0.3; ellipse(x, px, py, P * 0.06, P * 0.06); x.fillStyle = '#a82214'; x.fill(); ellipse(x, px, py, P * 0.045, P * 0.045); x.fillStyle = radial(x, px, py, P * 0.05, [[0, '#ffb070'], [0.5, '#c83a1a'], [1, '#7a1408']]); x.fill(); x.fillStyle = 'rgba(255,200,120,0.6)'; ellipse(x, px - P * 0.015, py - P * 0.015, P * 0.012, P * 0.008); x.fill(); } x.fillStyle = '#2a0a04'; for (let k = 0; k < 8; k++) x.fillRect((rnd() - 0.5) * P * 0.4, -P * 0.2 + rnd() * P * 0.4, P * 0.012, P * 0.012); }
        x.restore(); x.restore();
        break;
      }
      case 3: dish(); { for (let k = 0; k < 10; k++) { x.strokeStyle = k % 2 ? '#f0d68a' : '#e4c472'; x.lineWidth = P * 0.028; x.beginPath(); x.ellipse(c, c, P * (0.05 + k * 0.024), P * (0.045 + k * 0.022), k * 0.6, 0, Math.PI * 1.8); x.stroke(); } sauce(x, P, rnd, c, c - P * 0.03, P * 0.16); x.fillStyle = 'rgba(255,255,255,0.3)'; ellipse(x, c - P * 0.04, c - P * 0.07, P * 0.04, P * 0.02); x.fill(); basil(x, c + P * 0.08, c - P * 0.1, P, 0.7); x.fillStyle = '#fbf2d8'; for (let k = 0; k < 12; k++) x.fillRect(c + (rnd() - 0.5) * P * 0.3, c + (rnd() - 0.5) * P * 0.3, P * 0.018, P * 0.01); } break;
      case 4: dish('#e8e0d0'); { x.fillStyle = 'rgba(220,170,60,0.6)'; ellipse(x, c, c, P * 0.3, P * 0.28); x.fill(); for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + 0.3, d = k === 6 ? 0 : P * 0.16; const px = c + Math.cos(a) * d, py = c + Math.sin(a) * d; ellipse(x, px, py, P * 0.075, P * 0.06, a); x.fillStyle = radial(x, px - P * 0.02, py - P * 0.02, P * 0.09, [[0, '#fff8e0'], [0.6, '#f0d8a0'], [1, '#c8a060']]); x.fill(); x.strokeStyle = 'rgba(160,120,60,0.6)'; x.lineWidth = P * 0.008; for (let r = -1; r <= 1; r++) { x.beginPath(); x.moveTo(px - P * 0.05, py + r * P * 0.02); x.lineTo(px + P * 0.05, py + r * P * 0.02); x.stroke(); } } [[0.12, -0.18, 0.4], [-0.16, 0.14, -1]].forEach(([dx, dy, r]) => { x.save(); x.translate(c + dx * P, c + dy * P); x.rotate(r); ellipse(x, 0, 0, P * 0.08, P * 0.035); x.fillStyle = '#5a7a4a'; x.fill(); x.restore(); }); } break;
      case 5: dish(); { ellipse(x, c, c, P * 0.3, P * 0.28); x.fillStyle = radial(x, c - P * 0.06, c - P * 0.06, P * 0.34, [[0, '#fbf2d8'], [0.7, '#ecd8a8'], [1, '#c8b078']]); x.fill(); for (let k = 0; k < 60; k++) { const a = rnd() * TAU, d = Math.sqrt(rnd()) * P * 0.27; ellipse(x, c + Math.cos(a) * d, c + Math.sin(a) * d, P * 0.018, P * 0.01, rnd() * 3); x.fillStyle = 'rgba(255,255,240,0.85)'; x.fill(); } x.fillStyle = '#f2e8c8'; for (let k = 0; k < 8; k++) { x.save(); x.translate(c + (rnd() - 0.5) * P * 0.3, c + (rnd() - 0.5) * P * 0.3); x.rotate(rnd() * 3); x.fillRect(-P * 0.03, -P * 0.008, P * 0.06, P * 0.016); x.restore(); } x.fillStyle = '#4a8a2a'; for (let k = 0; k < 6; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.3, c + (rnd() - 0.5) * P * 0.3, P * 0.012, P * 0.012); x.fill(); } } break;
      case 6: dish(); { sauce(x, P, rnd, c, c, P * 0.3, '#c0301a'); for (let k = 0; k < 9; k++) { const a = rnd() * TAU, d = rnd() * P * 0.2; x.save(); x.translate(c + Math.cos(a) * d, c + Math.sin(a) * d); x.rotate(rnd() * 3); x.beginPath(); x.moveTo(-P * 0.1, -P * 0.035); x.lineTo(P * 0.08, -P * 0.035); x.lineTo(P * 0.1, P * 0.035); x.lineTo(-P * 0.08, P * 0.035); x.closePath(); x.fillStyle = linear(x, 0, -P * 0.035, 0, P * 0.035, [[0, '#f8e0a0'], [0.5, '#e8b860'], [1, '#c08a3a']]); x.fill(); x.strokeStyle = 'rgba(150,90,30,0.5)'; x.lineWidth = P * 0.006; for (let r = -3; r <= 3; r++) { x.beginPath(); x.moveTo(r * P * 0.025 - P * 0.01, -P * 0.035); x.lineTo(r * P * 0.025 + P * 0.01, P * 0.035); x.stroke(); } x.fillStyle = 'rgba(200,40,20,0.55)'; x.fillRect(-P * 0.06, -P * 0.035, P * 0.05, P * 0.07); x.restore(); } x.fillStyle = '#e8200a'; for (let k = 0; k < 10; k++) x.fillRect(c + (rnd() - 0.5) * P * 0.4, c + (rnd() - 0.5) * P * 0.4, P * 0.014, P * 0.01); basil(x, c - P * 0.1, c - P * 0.12, P, -0.4, 0.8); } break;
      default: { // lasagne: visible layers, bubbling browned cheese top
        x.save(); x.translate(c, c);
        const w = P * 0.66, h = P * 0.58, x0 = -w / 2, y0 = -h / 2;
        x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(x0 + P * 0.02, y0 + P * 0.05, w, h);
        const L = [['#e8b048', 0.2], ['#f2dc9a', 0.1], ['#b8301a', 0.12], ['#f6ecd0', 0.08], ['#f2dc9a', 0.1], ['#a8281a', 0.12], ['#f6ecd0', 0.08], ['#f2dc9a', 0.1], ['#c03a1e', 0.1]];
        let yy = y0; L.forEach(([col, f]) => { x.fillStyle = col; x.beginPath(); x.moveTo(x0, yy); for (let xx = 0; xx <= 6; xx++) x.lineTo(x0 + xx * w / 6, yy + Math.sin(xx * 1.7 + yy) * P * 0.008); x.lineTo(x0 + w, yy + h * f + 1); x.lineTo(x0, yy + h * f + 1); x.closePath(); x.fill(); yy += h * f; });
        for (let k = 0; k < 10; k++) { ellipse(x, x0 + rnd() * w, y0 + rnd() * h * 0.18, P * 0.03, P * 0.018); x.fillStyle = 'rgba(140,60,10,0.6)'; x.fill(); }
        x.fillStyle = '#7a2a10'; for (let k = 0; k < 12; k++) x.fillRect(x0 + rnd() * w, y0 + h * 0.3 + rnd() * h * 0.6, P * 0.018, P * 0.012);
        x.restore(); basil(x, c + P * 0.18, c - P * 0.24, P, 0.5, 0.8);
      }
    }
    K.gloss(x, P, 0.2);
  }
  const cache = {};
  function sprites(s) { const k = Math.round(s * 4); return cache[k] || (cache[k] = { gl: K.glintSprite(s * 0.5) }); }
  function live(ctx, t, s, T, st) {
    const sp = sprites(s);
    if (t === 1 || t === 7) { // molten cheese bubbles swell and pop
      for (let i = 0; i < 3; i++) {
        const ph = (T * (0.5 + i * 0.13) + i * 0.33 + st.ph * 0.17) % 1, r = s * 0.05 * Math.sin(ph * Math.PI);
        const bx = (((st.ph * 11 + i * 7) % 5) / 5 - 0.5) * s * (t === 1 ? 0.3 : 0.5), by = t === 1 ? (-0.12 + i * 0.09) * s : -s * 0.24 + i * s * 0.02;
        if (r < 0.5) continue;
        ellipse(ctx, bx, by, r, r * 0.8); ctx.fillStyle = t === 1 ? 'rgba(255,250,235,0.95)' : 'rgba(250,215,130,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(160,100,30,0.55)'; ctx.lineWidth = 0.7; ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillRect(bx - r * 0.4, by - r * 0.45, r * 0.4, r * 0.25);
      }
    }
    if (t === 2 || t === 6) { const ph = (T * 0.4 + st.ph * 0.1) % 1.5; if (ph < 1) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.6; ctx.drawImage(sp.gl, -s * 0.3 + ph * s * 0.3, -s * 0.2, s * 0.35, s * 0.35); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; } }
    if (st.active && Math.abs(st.ox) > 0.04 && (t === 1 || t === 2 || t === 7)) { // stretchy mozzarella pulled behind a moving slice
      const L = -st.ox * s * 1.4; ctx.strokeStyle = 'rgba(255,248,225,0.9)'; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
      for (let i = 0; i < 3; i++) { const yy = (-0.2 + i * 0.2) * s, side = Math.sign(L) * s * 0.42; ctx.beginPath(); ctx.moveTo(side * 0.8, yy); ctx.quadraticCurveTo(side + L * 0.5, yy + s * 0.08 + i * 2, side + L, yy + s * 0.02); ctx.stroke(); }
    }
    if (st.top && (t === 3 || t === 5 || t === 6 || t === 7)) { const ph = (T * 0.33 + st.ph * 0.19) % 1; ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.35; ctx.fillStyle = '#ffffff'; for (let i = 0; i < 3; i++) { ellipse(ctx, Math.sin(T * 1.3 + i * 2 + st.ph) * s * 0.12, -s * 0.45 - ph * s * 0.7 - i * s * 0.18, s * (0.08 + i * 0.03), s * 0.06); ctx.fill(); } ctx.globalAlpha = 1; }
  }
  return { base, live, N, BG, noFace: true }; // faces removed so the food reads clearly (character from live motion)
})();
