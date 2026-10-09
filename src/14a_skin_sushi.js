const SKINSETS = {}; // themed, richly textured skin sets: { base(ctx, type, px, col), live?(ctx, type, s, T, st) }
/* ---- Kaiten Sushi blocks: rice + topping, fish grain, glints; ikura jiggle live ---- */
const SkinKit = (() => {
  function tile(x, P, c0, c1, r = 0.16) { roundRect(x, 0.5, 0.5, P - 1, P - 1, P * r); x.fillStyle = linear(x, 0, 0, P, P, [[0, c0], [1, c1]]); x.fill(); }
  function grains(x, rnd, x0, y0, w, h, n, P, col = '#fbf8f0') {
    for (let i = 0; i < n; i++) {
      const gx = x0 + rnd() * w, gy = y0 + rnd() * h, a = rnd() * Math.PI;
      ellipse(x, gx + P * 0.006, gy + P * 0.01, P * 0.034, P * 0.02, a); x.fillStyle = 'rgba(120,110,90,0.35)'; x.fill();
      ellipse(x, gx, gy, P * 0.034, P * 0.02, a); x.fillStyle = col; x.fill();
      ellipse(x, gx - P * 0.008, gy - P * 0.006, P * 0.014, P * 0.007, a); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fill();
    }
  }
  function gloss(x, P, a = 0.35) {
    x.save(); x.globalCompositeOperation = 'lighter';
    x.fillStyle = linear(x, 0, 0, 0, P * 0.45, [[0, `rgba(255,255,255,${a})`], [1, 'rgba(255,255,255,0)']]);
    roundRect(x, P * 0.16, P * 0.1, P * 0.62, P * 0.2, P * 0.1); x.fill(); x.restore();
  }
  function glintSprite(P, col = '255,255,255') {
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d');
    x.fillStyle = radial(x, P / 2, P / 2, P / 2, [[0, `rgba(${col},0.9)`], [0.25, `rgba(${col},0.35)`], [1, `rgba(${col},0)`]]);
    x.translate(P / 2, P / 2); x.scale(1, 0.4); x.translate(-P / 2, -P / 2); x.fillRect(0, 0, P, P);
    return c;
  }
  return { tile, grains, gloss, glintSprite };
})();
SKINSETS.sushi = (() => {
  const K = SkinKit;
  function topping(x, P, i0, path) { x.save(); path(); x.clip(); }
  function nigiriShape(x, P) { // topping draped over rice, rounded with a soft drooping lower edge
    const l = P * 0.1, r = P * 0.9, tp = P * 0.1, b = P * 0.74;
    x.beginPath(); x.moveTo(l + P * 0.08, tp); x.lineTo(r - P * 0.08, tp); x.quadraticCurveTo(r, tp, r, tp + P * 0.08);
    x.lineTo(r, b - P * 0.04); x.quadraticCurveTo(r - P * 0.02, b + P * 0.06, P * 0.5, b + P * 0.04); x.quadraticCurveTo(l + P * 0.02, b + P * 0.06, l, b - P * 0.04);
    x.lineTo(l, tp + P * 0.08); x.quadraticCurveTo(l, tp, l + P * 0.08, tp); x.closePath();
  }
  function base(x, t, P) {
    const rnd = mulberry32(t * 97 + 11);
    K.tile(x, P, '#2a130a', '#090302');
    // lacquer rim
    x.lineWidth = P * 0.03; x.strokeStyle = 'rgba(212,175,55,0.5)'; roundRect(x, P * 0.05, P * 0.05, P * 0.9, P * 0.9, P * 0.14); x.stroke();
    if (t === 3 || t === 4) { // gunkan (ikura) and kappa maki: nori-wrapped rounds seen from above
      ellipse(x, P / 2, P / 2 + P * 0.03, P * 0.41, P * 0.41); x.fillStyle = '#05090a'; x.fill();
      ellipse(x, P / 2, P / 2, P * 0.41, P * 0.41); x.fillStyle = radial(x, P * 0.4, P * 0.4, P * 0.5, [[0, '#2c4030'], [0.7, '#132016'], [1, '#070d08']]); x.fill();
      x.strokeStyle = 'rgba(120,160,120,0.25)'; x.lineWidth = P * 0.012; for (let k = 0; k < 9; k++) { x.beginPath(); x.arc(P / 2, P / 2, P * (0.37 + (k % 3) * 0.012), k * 0.7, k * 0.7 + 0.5); x.stroke(); }
      ellipse(x, P / 2, P / 2, P * 0.33, P * 0.33); x.fillStyle = '#f2ede2'; x.fill();
      K.grains(x, rnd, P * 0.2, P * 0.2, P * 0.6, P * 0.6, 34, P);
      if (t === 4) { // cucumber core
        ellipse(x, P / 2, P / 2, P * 0.15, P * 0.15); x.fillStyle = radial(x, P / 2, P / 2, P * 0.16, [[0, '#f0ffd8'], [0.55, '#b8e488'], [0.8, '#5aa83a'], [1, '#1e5a1a']]); x.fill();
        x.fillStyle = 'rgba(250,255,230,0.95)'; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; ellipse(x, P / 2 + Math.cos(a) * P * 0.07, P / 2 + Math.sin(a) * P * 0.07, P * 0.018, P * 0.03, a); x.fill(); }
        x.fillStyle = 'rgba(255,255,255,0.45)'; ellipse(x, P * 0.46, P * 0.45, P * 0.05, P * 0.025, -0.6); x.fill();
        x.fillStyle = '#e8d080'; for (let k = 0; k < 8; k++) { ellipse(x, P * (0.28 + rnd() * 0.44), P * (0.28 + rnd() * 0.44), P * 0.012, P * 0.008, rnd() * 3); x.fill(); } // sesame
      } else { ellipse(x, P / 2, P / 2, P * 0.3, P * 0.3); x.fillStyle = '#5a1606'; x.fill(); }
      return;
    }
    // rice bed peeking under the topping
    roundRect(x, P * 0.12, P * 0.5, P * 0.76, P * 0.36, P * 0.12); x.fillStyle = '#ece6d8'; x.fill();
    K.grains(x, rnd, P * 0.13, P * 0.68, P * 0.74, P * 0.17, 26, P);
    // drop shadow of the topping onto rice
    x.save(); x.translate(0, P * 0.04); nigiriShape(x, P); x.fillStyle = 'rgba(40,20,10,0.35)'; x.fill(); x.restore();
    nigiriShape(x, P); x.save(); x.clip();
    const box = (stops) => { x.fillStyle = linear(x, 0, P * 0.1, P * 0.2, P * 0.8, stops); x.fillRect(0, 0, P, P); };
    switch (t) {
      case 1: { // saba: silver-blue skin with dark wavy tiger stripes, silver belly sheen
        box([[0, '#5d7a96'], [0.45, '#8fa8bf'], [0.62, '#e8eef4'], [1, '#c8d2dc']]);
        x.strokeStyle = 'rgba(14,26,44,0.85)'; x.lineWidth = P * 0.028; x.lineCap = 'round';
        for (let r = 0; r < 5; r++) { x.beginPath(); for (let k = 0; k <= 10; k++) { const xx = P * (0.08 + k * 0.085), yy = P * (0.14 + r * 0.075) + Math.sin(k * 1.9 + r * 2) * P * 0.03; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
        const g = x.createLinearGradient(0, P * 0.5, P, P * 0.6); [[0, 'rgba(255,190,220,0.0)'], [0.3, 'rgba(255,200,230,0.35)'], [0.5, 'rgba(190,255,240,0.35)'], [0.7, 'rgba(210,220,255,0.35)'], [1, 'rgba(255,255,255,0)']].forEach(([o, c]) => g.addColorStop(o, c));
        x.fillStyle = g; x.fillRect(0, P * 0.48, P, P * 0.14);
        x.fillStyle = 'rgba(80,30,40,0.35)'; x.fillRect(0, P * 0.7, P, P * 0.08);
        x.fillStyle = '#e8f0c8'; ellipse(x, P * 0.62, P * 0.3, P * 0.06, P * 0.04); x.fill(); x.fillStyle = '#7ab040'; ellipse(x, P * 0.62, P * 0.28, P * 0.03, P * 0.02); x.fill(); // ginger + scallion
        break;
      }
      case 2: { // tamago: layered omelette with caramelised top and nori belt
        box([[0, '#c8801c'], [0.12, '#f4c446'], [1, '#ffe68a']]);
        for (let k = 1; k < 7; k++) { x.strokeStyle = `rgba(190,120,20,${0.22 + (k % 2) * 0.12})`; x.lineWidth = P * 0.012; x.beginPath(); x.moveTo(0, P * (0.12 + k * 0.085)); for (let xx = 0; xx <= P; xx += P / 8) x.lineTo(xx, P * (0.12 + k * 0.085) + Math.sin(xx * 0.4 + k) * P * 0.006); x.stroke(); }
        for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(255,250,210,0.5)'; ellipse(x, rnd() * P, P * 0.2 + rnd() * P * 0.5, P * 0.012, P * 0.008); x.fill(); }
        x.fillStyle = linear(x, P * 0.38, 0, P * 0.62, 0, [[0, '#050a06'], [0.2, '#1c3020'], [0.5, '#2c4632'], [0.8, '#16261a'], [1, '#040805']]); x.fillRect(P * 0.38, 0, P * 0.24, P);
        x.strokeStyle = 'rgba(140,180,140,0.18)'; x.lineWidth = P * 0.008; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(P * 0.38, P * (0.1 + k * 0.13)); x.lineTo(P * 0.62, P * (0.14 + k * 0.13)); x.stroke(); }
        break;
      }
      case 5: { // maguro akami: deep red, fine white sinew arcs, iridescent sheen
        box([[0, '#7a0c1c'], [0.4, '#c41d36'], [1, '#e8455a']]);
        x.strokeStyle = 'rgba(255,190,200,0.35)'; x.lineWidth = P * 0.014;
        for (let k = -2; k < 6; k++) { x.beginPath(); x.moveTo(P * (k * 0.18), P * 0.08); x.bezierCurveTo(P * (k * 0.18 + 0.25), P * 0.3, P * (k * 0.18 - 0.05), P * 0.55, P * (k * 0.18 + 0.2), P * 0.8); x.stroke(); }
        for (let k = 0; k < 30; k++) { x.fillStyle = `rgba(${rnd() < 0.5 ? '255,120,140' : '90,0,10'},0.25)`; x.fillRect(rnd() * P, rnd() * P, P * 0.03, P * 0.015); }
        const g = x.createLinearGradient(P * 0.1, P * 0.6, P * 0.9, P * 0.2); [[0, 'rgba(120,255,200,0)'], [0.45, 'rgba(120,255,220,0.16)'], [0.6, 'rgba(200,140,255,0.16)'], [1, 'rgba(255,255,255,0)']].forEach(([o, c]) => g.addColorStop(o, c));
        x.fillStyle = g; x.fillRect(0, 0, P, P);
        break;
      }
      case 6: { // tako: pale flesh, maroon skin edge with suckers
        box([[0, '#f6e6e0'], [1, '#e2c4ba']]);
        x.fillStyle = linear(x, 0, 0, 0, P * 0.4, [[0, '#4a0820'], [0.7, '#9a2a5a'], [1, '#c8507a']]);
        x.beginPath(); x.moveTo(0, 0); x.lineTo(P, 0); x.lineTo(P, P * 0.3); for (let xx = P; xx >= 0; xx -= P / 10) x.lineTo(xx, P * 0.3 + Math.sin(xx * 0.5) * P * 0.03); x.closePath(); x.fill();
        for (let k = 0; k < 3; k++) { const sx = P * (0.24 + k * 0.26), sy = P * 0.48; ellipse(x, sx, sy, P * 0.08, P * 0.07); x.fillStyle = radial(x, sx, sy, P * 0.08, [[0, '#a8406a'], [0.5, '#f6cdd8'], [1, '#e8b0c0']]); x.fill(); x.strokeStyle = '#8c2a4a'; x.lineWidth = P * 0.015; x.stroke(); ellipse(x, sx, sy, P * 0.025, P * 0.022); x.fillStyle = '#6a1030'; x.fill(); }
        break;
      }
      default: { // salmon: orange flesh with bright white fat chevrons
        box([[0, '#e8642a'], [0.5, '#f8884a'], [1, '#ffa870']]);
        for (let k = -1; k < 6; k++) {
          x.strokeStyle = 'rgba(255,240,226,0.95)'; x.lineWidth = P * 0.035;
          x.beginPath(); x.moveTo(P * (k * 0.2 - 0.05), P * 0.1); x.quadraticCurveTo(P * (k * 0.2 + 0.2), P * 0.42, P * (k * 0.2 + 0.05), P * 0.82); x.stroke();
          x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = P * 0.012; x.stroke();
        }
        x.fillStyle = 'rgba(255,200,170,0.25)'; for (let k = 0; k < 20; k++) x.fillRect(rnd() * P, rnd() * P, P * 0.02, P * 0.01);
      }
    }
    // edge shading for thickness
    x.fillStyle = linear(x, 0, P * 0.55, 0, P * 0.82, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(60,10,0,0.35)']]); x.fillRect(0, 0, P, P);
    x.restore();
    nigiriShape(x, P); x.strokeStyle = 'rgba(40,10,0,0.35)'; x.lineWidth = P * 0.015; x.stroke();
    K.gloss(x, P, 0.3);
  }
  const glints = {}; const orbs = {};
  function live(ctx, t, s, T, st) {
    const key = Math.round(s * 4);
    const gl = glints[key] || (glints[key] = K.glintSprite(s * 2));
    if (t === 3) { // ikura orbs jiggle individually
      const ob = orbs[key] || (orbs[key] = (() => { const c = makeCanvas(Math.ceil(s * 0.5 * 2), Math.ceil(s * 0.5 * 2)), x = c.getContext('2d'); const r = s * 0.5; SushiArt.sphere(x, r, r, r * 0.92, '#ffd08a', '#f2611a', '#8a2006'); x.fillStyle = 'rgba(255,170,60,0.35)'; ellipse(x, r * 1.1, r * 1.2, r * 0.25, r * 0.25); x.fill(); return c; })());
      const pts = [[-0.14, -0.13], [0.14, -0.13], [0, 0.02], [-0.15, 0.15], [0.15, 0.15], [0.0, -0.22], [0, 0.22]];
      for (let i = 0; i < pts.length; i++) {
        const j = Math.sin(T * 7 + i * 2.1 + st.ph) * 0.012 + st.k * 0.04 * Math.sin(i * 1.7);
        const r = s * (i > 4 ? 0.1 : 0.125) * (1 + Math.sin(T * 5 + i + st.ph) * 0.04);
        ctx.drawImage(ob, pts[i][0] * s - r + j * s, pts[i][1] * s - r - Math.abs(j) * s, r * 2, r * 2);
      }
    }
    // character without faces: the topping breathes and flutters (more when the stack is in danger), soy-glaze sparkle while falling
    const d = typeof Mood !== 'undefined' ? Mood.danger : 0;
    if (t !== 3 && t !== 4) { const fl = Math.sin(T * (2 + d * 9) + st.ph) * (0.006 + d * 0.012) + st.k * 0.02; ctx.fillStyle = `rgba(255,255,255,${0.06 + Math.max(0, fl) * 4})`; ellipse(ctx, 0, -s * 0.12 + fl * s, s * 0.34, s * 0.05); ctx.fill(); }
    if (st.active) { const sp = (T * 1.7 + st.ph) % 1; ctx.fillStyle = `rgba(255,255,240,${0.7 * Math.sin(sp * Math.PI)})`; ctx.save(); ctx.translate(-s * 0.25 + sp * s * 0.5, -s * 0.28); ctx.rotate(T * 3); ctx.fillRect(-s * 0.03, -s * 0.003, s * 0.06, s * 0.006); ctx.fillRect(-s * 0.003, -s * 0.03, s * 0.006, s * 0.06); ctx.restore(); }
    // travelling glisten
    const ph = (T * (0.32 + d * 0.4) + st.ph * 0.137) % 2.2;
    if (ph < 1) { const a = Math.sin(ph * Math.PI); ctx.globalAlpha = a * 0.75; ctx.globalCompositeOperation = 'lighter'; ctx.drawImage(gl, (ph - 0.5) * s * 0.6 - s * 0.35, -s * 0.38 + ph * s * 0.2, s * 0.7, s * 0.7); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
  }
  return { base, live, noFace: true }; // shapes read as real nigiri / maki / gunkan; character comes from motion & glisten
})();
