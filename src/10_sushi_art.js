/* ================= Hand-drawn (procedural) sushi art ================= */
const SushiArt = (() => {
  const gloss = (ctx, x0, y0, cx, cy, x1, y1, w, a = 0.5) => {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(cx, cy, x1, y1); ctx.stroke(); ctx.restore();
  };
  function rice(ctx, x, y, w, h, rnd) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y - h * 0.2);
    ctx.bezierCurveTo(x - w / 2, y - h * 1.05, x + w / 2, y - h * 1.05, x + w / 2, y - h * 0.2);
    ctx.quadraticCurveTo(x + w / 2, y + h * 0.15, x, y + h * 0.15);
    ctx.quadraticCurveTo(x - w / 2, y + h * 0.15, x - w / 2, y - h * 0.2);
    ctx.closePath();
    ctx.shadowColor = 'rgba(40,20,0,0.35)'; ctx.shadowBlur = h * 0.4; ctx.shadowOffsetY = h * 0.15;
    ctx.fillStyle = linear(ctx, x, y - h, x, y + h * 0.15, [[0, '#ffffff'], [0.6, '#f3eee2'], [1, '#cbc1ab']]);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.clip();
    const n = Math.round((w * h) / 6);
    for (let i = 0; i < n; i++) {
      const gx = x + (rnd() - 0.5) * w, gy = y + h * 0.15 - rnd() * h * 1.2;
      ellipse(ctx, gx, gy, w * 0.05, w * 0.026, rnd() * TAU);
      ctx.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,0.95)' : 'rgba(250,246,236,0.95)'; ctx.fill();
      ctx.strokeStyle = 'rgba(140,128,105,0.35)'; ctx.lineWidth = Math.max(0.3, w * 0.006); ctx.stroke();
    }
    ctx.fillStyle = linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, 'rgba(60,40,10,0.18)'], [0.3, 'rgba(0,0,0,0)'], [0.75, 'rgba(0,0,0,0)'], [1, 'rgba(60,40,10,0.25)']]);
    ctx.fillRect(x - w / 2, y - h * 1.2, w, h * 1.5);
    ctx.restore();
  }
  function slicePath(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x - w * 0.6, y - h * 0.02);
    ctx.bezierCurveTo(x - w * 0.56, y - h * 1.55, x + w * 0.48, y - h * 1.6, x + w * 0.63, y - h * 0.12);
    ctx.bezierCurveTo(x + w * 0.64, y + h * 0.1, x + w * 0.52, y + h * 0.12, x + w * 0.46, y - h * 0.05);
    ctx.bezierCurveTo(x + w * 0.25, y - h * 0.42, x - w * 0.25, y - h * 0.42, x - w * 0.48, y - h * 0.02);
    ctx.quadraticCurveTo(x - w * 0.57, y + h * 0.14, x - w * 0.6, y - h * 0.02);
    ctx.closePath();
  }
  const TOPS = {
    salmon: { g: ['#ffb07e', '#f57a3d', '#d9581f'], tex(ctx, x, y, w, h) {
      for (let i = 0; i < 6; i++) {
        const xx = x - w * 0.7 + i * w * 0.25;
        ctx.strokeStyle = 'rgba(255,238,224,0.9)'; ctx.lineWidth = w * 0.04;
        ctx.beginPath(); ctx.moveTo(xx, y - h * 1.7); ctx.quadraticCurveTo(xx + w * 0.2, y - h * 0.8, xx + w * 0.06, y + h * 0.1); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,225,205,0.5)'; ctx.lineWidth = w * 0.012;
        ctx.beginPath(); ctx.moveTo(xx + w * 0.06, y - h * 1.7); ctx.quadraticCurveTo(xx + w * 0.27, y - h * 0.8, xx + w * 0.13, y + h * 0.1); ctx.stroke();
      } } },
    maguro: { g: ['#e8455a', '#c41d36', '#8a0e22'], tex(ctx, x, y, w, h, rnd) {
      ctx.strokeStyle = 'rgba(255,160,170,0.22)'; ctx.lineWidth = w * 0.015;
      for (let i = 0; i < 7; i++) { const xx = x - w * 0.6 + i * w * 0.2; ctx.beginPath(); ctx.moveTo(xx, y - h * 1.6); ctx.quadraticCurveTo(xx + w * 0.15, y - h * 0.6, xx + w * 0.02, y); ctx.stroke(); }
    } },
    chutoro: { g: ['#f7b0b9', '#e8738a', '#c94d66'], tex(ctx, x, y, w, h, rnd) {
      ctx.strokeStyle = 'rgba(255,240,240,0.75)';
      for (let i = 0; i < 14; i++) { ctx.lineWidth = w * (0.008 + rnd() * 0.02); const xx = x - w * 0.7 + rnd() * w * 1.3; ctx.beginPath(); ctx.moveTo(xx, y - h * 1.7); ctx.bezierCurveTo(xx + w * 0.1, y - h * 1.2, xx - w * 0.05, y - h * 0.6, xx + w * 0.12, y + h * 0.1); ctx.stroke(); }
    } },
    hamachi: { g: ['#fde8dc', '#f4c6b0', '#e2a68c'], tex(ctx, x, y, w, h) {
      ctx.save(); ctx.shadowColor = 'rgba(160,30,40,0.9)'; ctx.shadowBlur = w * 0.08;
      ctx.strokeStyle = 'rgba(176,48,60,0.65)'; ctx.lineWidth = w * 0.1;
      ctx.beginPath(); ctx.moveTo(x - w * 0.62, y - h * 0.3); ctx.bezierCurveTo(x - w * 0.3, y - h * 0.65, x + w * 0.2, y - h * 0.7, x + w * 0.62, y - h * 0.35); ctx.stroke(); ctx.restore();
    } },
    tai: { g: ['#fffaf7', '#f5e7e1', '#e3cfc6'], tex(ctx, x, y, w, h) {
      ctx.strokeStyle = 'rgba(232,110,130,0.85)'; ctx.lineWidth = w * 0.12;
      ctx.beginPath(); ctx.moveTo(x - w * 0.62, y - h * 0.3); ctx.bezierCurveTo(x - w * 0.52, y - h * 1.55, x + w * 0.45, y - h * 1.6, x + w * 0.64, y - h * 0.4); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = w * 0.025; ctx.stroke();
      ctx.strokeStyle = 'rgba(200,170,160,0.35)'; ctx.lineWidth = w * 0.01;
      for (let i = 0; i < 6; i++) { const xx = x - w * 0.5 + i * w * 0.2; ctx.beginPath(); ctx.moveTo(xx, y - h * 1.2); ctx.lineTo(xx + w * 0.1, y); ctx.stroke(); }
    } },
    saba: { g: ['#f1f5f9', '#b5c6d6', '#7f97ae'], tex(ctx, x, y, w, h, rnd) {
      ctx.strokeStyle = 'rgba(25,40,62,0.85)'; ctx.lineWidth = w * 0.025;
      for (let r = 0; r < 4; r++) {
        ctx.beginPath(); const yy = y - h * (1.45 - r * 0.18);
        for (let i = 0; i <= 12; i++) { const xx = x - w * 0.55 + (i / 12) * w * 1.1; const yv = yy + Math.sin(i * 1.7 + r) * h * 0.08 + (Math.abs(i - 6) / 6) * h * 0.4; i ? ctx.lineTo(xx, yv) : ctx.moveTo(xx, yv); }
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(210,225,240,0.35)'; ctx.fillRect(x - w * 0.6, y - h * 0.75, w * 1.2, h * 0.2);
    } },
    ika: { g: ['#fdfcf9', '#f1eee8', '#d9d3c8'], tex(ctx, x, y, w, h) {
      ctx.strokeStyle = 'rgba(150,150,150,0.28)'; ctx.lineWidth = w * 0.008;
      for (let i = -6; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x + i * w * 0.1, y - h * 1.7); ctx.lineTo(x + i * w * 0.1 + w * 0.3, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + i * w * 0.1, y - h * 1.7); ctx.lineTo(x + i * w * 0.1 - w * 0.3, y); ctx.stroke(); }
    } },
    tako: { g: ['#fbf3ef', '#f0e0d9', '#d8c0b6'], tex(ctx, x, y, w, h) {
      ctx.strokeStyle = '#7a1838'; ctx.lineWidth = w * 0.16;
      ctx.beginPath(); ctx.moveTo(x - w * 0.62, y - h * 0.4); ctx.bezierCurveTo(x - w * 0.52, y - h * 1.6, x + w * 0.45, y - h * 1.65, x + w * 0.66, y - h * 0.45); ctx.stroke();
      ctx.strokeStyle = 'rgba(170,50,90,0.7)'; ctx.lineWidth = w * 0.06; ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const t = 0.12 + i * 0.15, xx = x - w * 0.55 + t * w * 1.1, yy = y - h * (0.6 + Math.sin(t * Math.PI) * 0.75);
        ellipse(ctx, xx, yy, w * 0.04, w * 0.03); ctx.fillStyle = '#f2c3cf'; ctx.fill(); ctx.strokeStyle = '#8c2a4a'; ctx.lineWidth = w * 0.008; ctx.stroke();
      }
    } },
  };
  function nigiri(ctx, x, y, k, kind, rnd) {
    const w = 24 * k, h = 10 * k;
    rice(ctx, x, y, w, h, rnd);
    if (kind === 'tamago') return tamago(ctx, x, y, w, h);
    if (kind === 'hotate') return hotate(ctx, x, y, w, h);
    if (kind === 'ebi') return ebi(ctx, x, y, w, h);
    if (kind === 'unagi') return unagi(ctx, x, y, w, h, rnd);
    const T = TOPS[kind];
    ctx.save();
    slicePath(ctx, x, y, w, h);
    ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = h * 0.3; ctx.shadowOffsetY = h * 0.1;
    ctx.fillStyle = linear(ctx, x, y - h * 1.5, x, y, [[0, T.g[0]], [0.55, T.g[1]], [1, T.g[2]]]);
    ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.clip();
    T.tex(ctx, x, y, w, h, rnd);
    ctx.fillStyle = linear(ctx, x - w * 0.6, 0, x + w * 0.6, 0, [[0, 'rgba(0,0,0,0.2)'], [0.3, 'rgba(0,0,0,0)'], [0.7, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.25)']]);
    ctx.fillRect(x - w, y - h * 2, w * 2, h * 2.5);
    ctx.restore();
    gloss(ctx, x - w * 0.4, y - h * 0.9, x - w * 0.05, y - h * 1.45, x + w * 0.3, y - h * 1.1, w * 0.05, 0.55);
    gloss(ctx, x + w * 0.38, y - h * 0.75, x + w * 0.45, y - h * 0.6, x + w * 0.48, y - h * 0.45, w * 0.03, 0.35);
  }
  function noriBelt(ctx, x, y, w, h, top) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - w * 0.09, y - top); ctx.lineTo(x + w * 0.09, y - top - h * 0.02);
    ctx.lineTo(x + w * 0.1, y + h * 0.14); ctx.lineTo(x - w * 0.08, y + h * 0.16); ctx.closePath();
    ctx.fillStyle = linear(ctx, x - w * 0.1, 0, x + w * 0.1, 0, [[0, '#0b160d'], [0.5, '#22382a'], [1, '#08100a']]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,160,120,0.15)'; ctx.lineWidth = w * 0.006;
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x - w * 0.08 + i * w * 0.04, y - top); ctx.lineTo(x - w * 0.07 + i * w * 0.04, y + h * 0.1); ctx.stroke(); }
    ctx.restore();
  }
  function tamago(ctx, x, y, w, h) {
    const x0 = x - w * 0.56, x1 = x + w * 0.56, yt = y - h * 1.55, yb = y - h * 0.45, d = h * 0.35;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = h * 0.3;
    roundRect(ctx, x0, yt, x1 - x0, yb - yt, h * 0.12);
    ctx.fillStyle = linear(ctx, 0, yt, 0, yb, [[0, '#ffe07a'], [0.5, '#f5c53c'], [1, '#e2a82a']]); ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(190,120,20,0.35)'; ctx.lineWidth = h * 0.05;
    for (let i = 1; i < 5; i++) { const yy = yt + (yb - yt) * i / 5 + d * 0.3; ctx.beginPath(); ctx.moveTo(x0 + 2, yy); ctx.lineTo(x1 - 2, yy); ctx.stroke(); }
    ctx.fillStyle = linear(ctx, 0, yt, 0, yt + d, [[0, 'rgba(160,90,20,0.5)'], [1, 'rgba(160,90,20,0)']]); ctx.fillRect(x0, yt, x1 - x0, d);
    ctx.restore();
    noriBelt(ctx, x, y, w, h, h * 1.62);
    gloss(ctx, x0 + w * 0.1, yt + h * 0.15, x, yt + h * 0.05, x1 - w * 0.2, yt + h * 0.15, w * 0.03, 0.4);
  }
  function hotate(ctx, x, y, w, h) {
    ctx.save();
    ellipse(ctx, x, y - h * 1.0, w * 0.42, h * 0.62);
    ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = h * 0.3; ctx.shadowOffsetY = h * 0.1;
    ctx.fillStyle = radial(ctx, x - w * 0.1, y - h * 1.25, w * 0.5, [[0, '#fffaf0'], [0.6, '#f4e6cf'], [1, '#d9c3a0']]); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.clip();
    ctx.strokeStyle = 'rgba(190,160,120,0.35)'; ctx.lineWidth = w * 0.008;
    for (let i = 0; i < 18; i++) { const a = (i / 18) * TAU; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + Math.cos(a) * w * 0.5, y - h + Math.sin(a) * h * 0.7); ctx.stroke(); }
    ctx.restore();
    gloss(ctx, x - w * 0.25, y - h * 1.2, x - w * 0.1, y - h * 1.5, x + w * 0.15, y - h * 1.45, w * 0.05, 0.6);
  }
  function ebi(ctx, x, y, w, h) {
    ctx.save();
    slicePath(ctx, x - w * 0.05, y, w * 0.95, h);
    ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = h * 0.3;
    ctx.fillStyle = '#fff2e8'; ctx.fill(); ctx.shadowColor = 'transparent'; ctx.clip();
    for (let i = 0; i < 6; i++) {
      const xx = x - w * 0.6 + i * w * 0.21;
      ctx.fillStyle = linear(ctx, xx, 0, xx + w * 0.12, 0, [[0, '#ff7448'], [0.6, '#f0542e'], [1, 'rgba(240,84,46,0)']]);
      ctx.beginPath(); ctx.moveTo(xx, y - h * 1.8); ctx.quadraticCurveTo(xx + w * 0.12, y - h * 0.9, xx + w * 0.02, y + h * 0.2); ctx.lineTo(xx + w * 0.12, y + h * 0.2); ctx.quadraticCurveTo(xx + w * 0.22, y - h * 0.9, xx + w * 0.11, y - h * 1.8); ctx.fill();
    }
    ctx.restore();
    // tail
    const tx = x + w * 0.56, ty = y - h * 0.55;
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(-0.35);
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(w * 0.15, i * h * 0.5 - h * 0.1, w * 0.26, i * h * 0.6); ctx.quadraticCurveTo(w * 0.18, i * h * 0.2 + h * 0.2, 0, h * 0.15); ctx.closePath();
      ctx.fillStyle = linear(ctx, 0, 0, w * 0.26, 0, [[0, '#ff6a3a'], [0.7, '#e2341c'], [1, '#7a1408']]); ctx.fill();
      ctx.strokeStyle = 'rgba(90,10,0,0.5)'; ctx.lineWidth = w * 0.008; ctx.stroke();
    }
    ctx.restore();
    gloss(ctx, x - w * 0.4, y - h * 0.9, x - w * 0.1, y - h * 1.45, x + w * 0.25, y - h * 1.15, w * 0.04, 0.5);
  }
  function unagi(ctx, x, y, w, h, rnd) {
    ctx.save();
    slicePath(ctx, x, y, w * 1.02, h * 1.05);
    ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = h * 0.3;
    ctx.fillStyle = linear(ctx, x, y - h * 1.6, x, y, [[0, '#b8702f'], [0.5, '#7d3c12'], [1, '#4a1f06']]); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.clip();
    ctx.strokeStyle = 'rgba(30,10,0,0.55)'; ctx.lineWidth = w * 0.03;
    for (let i = 0; i < 5; i++) { const xx = x - w * 0.5 + i * w * 0.25; ctx.beginPath(); ctx.moveTo(xx, y - h * 1.6); ctx.lineTo(xx - w * 0.12, y); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,240,200,0.9)';
    for (let i = 0; i < 9; i++) { ellipse(ctx, x + (rnd() - 0.5) * w, y - h * (0.6 + rnd() * 0.8), w * 0.018, w * 0.01, rnd() * 3); ctx.fill(); }
    ctx.restore();
    noriBelt(ctx, x, y, w, h, h * 1.22);
    gloss(ctx, x - w * 0.42, y - h * 0.8, x - w * 0.1, y - h * 1.5, x + w * 0.35, y - h * 1.1, w * 0.06, 0.6);
  }
  function cylinder(ctx, x, y, w, h, ry, fill) {
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y - h);
    ctx.lineTo(x - w / 2, y);
    ctx.ellipse(x, y, w / 2, ry, 0, Math.PI, 0, true);
    ctx.lineTo(x + w / 2, y - h);
    ctx.ellipse(x, y - h, w / 2, ry, 0, 0, Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
  }
  const noriFill = (ctx, x, w) => linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, '#030604'], [0.25, '#16281a'], [0.45, '#2c4630'], [0.6, '#1a2d1d'], [1, '#020403']]);
  function sphere(ctx, x, y, r, c0, c1, c2) {
    ellipse(ctx, x, y, r, r);
    ctx.fillStyle = radial(ctx, x - r * 0.3, y - r * 0.35, r * 1.3, [[0, c0], [0.45, c1], [1, c2]]); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ellipse(ctx, x - r * 0.35, y - r * 0.4, r * 0.22, r * 0.16, -0.5); ctx.fill();
    ctx.fillStyle = 'rgba(255,220,120,0.35)'; ellipse(ctx, x + r * 0.25, y + r * 0.3, r * 0.3, r * 0.25); ctx.fill();
  }
  function gunkan(ctx, x, y, k, kind, rnd) {
    const w = 22 * k, h = 13 * k, ry = w * 0.28;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = h * 0.35; ctx.shadowOffsetY = h * 0.12;
    cylinder(ctx, x, y, w, h, ry, noriFill(ctx, x, w)); ctx.restore();
    ctx.save(); cylinder(ctx, x, y, w, h, ry, 'rgba(0,0,0,0)'); ctx.clip();
    ctx.strokeStyle = 'rgba(130,170,130,0.12)'; ctx.lineWidth = Math.max(0.4, w * 0.01);
    for (let i = 0; i < 14; i++) { const xx = x - w / 2 + rnd() * w; ctx.beginPath(); ctx.moveTo(xx, y - h - ry); ctx.lineTo(xx + rnd() * 2 - 1, y + ry); ctx.stroke(); }
    ctx.restore();
    // opening rim
    ellipse(ctx, x, y - h, w / 2, ry); ctx.fillStyle = '#0c170e'; ctx.fill();
    ellipse(ctx, x, y - h + ry * 0.05, w / 2 * 0.9, ry * 0.8); ctx.fillStyle = '#efe9dc'; ctx.fill();
    const top = y - h;
    if (kind === 'ikura' || kind === 'tobiko') {
      const big = kind === 'ikura'; const r = (big ? 3.3 : 1.4) * k; const pts = [];
      const N = big ? 18 : 70;
      for (let i = 0; i < N; i++) {
        const a = rnd() * TAU, d = Math.sqrt(rnd());
        const px = x + Math.cos(a) * d * w * 0.42, py = top + Math.sin(a) * d * ry * 0.75;
        const hgt = (1 - d) * (big ? 6 : 6) * k;
        pts.push([px, py - hgt]);
      }
      pts.sort((a, b) => a[1] - b[1]);
      pts.forEach(([px, py]) => big ? sphere(ctx, px, py, r, '#ffcf8a', '#f2611a', '#9a2508') : (ellipse(ctx, px, py, r, r), ctx.fillStyle = rnd() < 0.5 ? '#ff7a1e' : '#f05a0e', ctx.fill()));
      if (!big) sphere(ctx, x, top - 6 * k, 3.6 * k, '#fff3b0', '#ffc21f', '#d97a06');
    } else if (kind === 'uni') {
      for (let i = 0; i < 5; i++) {
        const px = x - w * 0.32 + i * w * 0.16, py = top - 2.5 * k - Math.sin(i / 4 * Math.PI) * 2.5 * k;
        ctx.save(); ctx.translate(px, py); ctx.rotate(-0.5 + i * 0.25);
        ellipse(ctx, 0, 0, 3.4 * k, 7 * k * 0.7);
        ctx.fillStyle = radial(ctx, -k, -2 * k, 6 * k, [[0, '#ffd77a'], [0.6, '#f2a12c'], [1, '#c86d10']]); ctx.fill();
        ctx.fillStyle = 'rgba(160,80,0,0.35)';
        for (let j = 0; j < 6; j++) { ellipse(ctx, (rnd() - 0.5) * 4 * k, (rnd() - 0.5) * 7 * k, 0.6 * k, 0.6 * k); ctx.fill(); }
        ctx.restore();
      }
      gloss(ctx, x - w * 0.25, top - 5 * k, x, top - 8 * k, x + w * 0.2, top - 5 * k, k * 0.9, 0.5);
    } else { // negitoro
      ctx.beginPath(); ctx.moveTo(x - w * 0.45, top);
      ctx.bezierCurveTo(x - w * 0.4, top - 10 * k, x + w * 0.35, top - 11 * k, x + w * 0.45, top);
      ctx.ellipse(x, top, w * 0.45, ry * 0.7, 0, 0, Math.PI); ctx.closePath();
      ctx.fillStyle = radial(ctx, x - 2 * k, top - 6 * k, w * 0.5, [[0, '#ffc4cc'], [0.6, '#ee8c9c'], [1, '#c45a70']]); ctx.fill();
      for (let i = 0; i < 9; i++) {
        const px = x + (rnd() - 0.5) * w * 0.7, py = top - rnd() * 7 * k;
        ellipse(ctx, px, py, 1.6 * k, 1.1 * k); ctx.strokeStyle = '#3f8f2e'; ctx.lineWidth = 0.8 * k; ctx.stroke(); ctx.fillStyle = '#c6e89a'; ctx.fill();
      }
    }
  }
  function makiPiece(ctx, x, y, k, kind, rnd) {
    const w = 15 * k, h = 8 * k, ry = w * 0.32;
    const outerRice = kind === 'california';
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = h * 0.4; ctx.shadowOffsetY = h * 0.15;
    cylinder(ctx, x, y, w, h, ry, outerRice ? linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, '#d8cfbd'], [0.4, '#fffdf7'], [1, '#c9bea8']]) : noriFill(ctx, x, w));
    ctx.restore();
    if (outerRice) { // tobiko coat
      ctx.save(); cylinder(ctx, x, y, w, h, ry, 'rgba(0,0,0,0)'); ctx.clip();
      for (let i = 0; i < 40; i++) { ellipse(ctx, x + (rnd() - 0.5) * w, y - h + rnd() * (h + ry), 0.8 * k, 0.8 * k); ctx.fillStyle = rnd() < 0.5 ? '#ff7a22' : '#ffa24a'; ctx.fill(); }
      ctx.restore();
    }
    const cy = y - h;
    ellipse(ctx, x, cy, w / 2, ry); ctx.fillStyle = outerRice ? '#f6f1e6' : '#0e1a10'; ctx.fill();
    ellipse(ctx, x, cy, w / 2 * (outerRice ? 0.98 : 0.88), ry * (outerRice ? 0.96 : 0.86)); ctx.fillStyle = '#fbf8f1'; ctx.fill();
    // rice grains on face
    for (let i = 0; i < 16; i++) { const a = rnd() * TAU, d = 0.55 + rnd() * 0.4; ellipse(ctx, x + Math.cos(a) * d * w * 0.42, cy + Math.sin(a) * d * ry * 0.8, 1.1 * k, 0.6 * k, a); ctx.fillStyle = 'rgba(255,255,255,1)'; ctx.fill(); ctx.strokeStyle = 'rgba(150,140,120,0.4)'; ctx.lineWidth = 0.3 * k; ctx.stroke(); }
    if (outerRice) {
      ctx.fillStyle = '#e8dcb5'; for (let i = 0; i < 8; i++) { ellipse(ctx, x + (rnd() - 0.5) * w * 0.8, cy + (rnd() - 0.5) * ry * 1.2, 0.7 * k, 0.4 * k, rnd() * 3); ctx.fill(); }
      ellipse(ctx, x, cy, w * 0.28, ry * 0.55); ctx.fillStyle = '#0e1a10'; ctx.fill();
      ellipse(ctx, x - 1.2 * k, cy, w * 0.13, ry * 0.32); ctx.fillStyle = '#9cc75a'; ctx.fill();
      ellipse(ctx, x + 1.6 * k, cy - 0.3 * k, w * 0.1, ry * 0.3); ctx.fillStyle = '#ffffff'; ctx.fill();
      ctx.fillStyle = '#e83a2a'; ctx.fillRect(x + 0.8 * k, cy - ry * 0.3, w * 0.12, ry * 0.12);
      ellipse(ctx, x + 0.2 * k, cy + ry * 0.25, w * 0.08, ry * 0.12); ctx.fillStyle = '#f7e9a8'; ctx.fill();
    } else {
      const fc = kind === 'tekka' ? ['#e8455a', '#a8142b'] : kind === 'kappa' ? ['#c9ec9a', '#2e7a2a'] : ['#b8834a', '#6e4214'];
      ellipse(ctx, x, cy, w * 0.17, ry * 0.36);
      ctx.fillStyle = radial(ctx, x - k, cy - k * 0.5, w * 0.2, [[0, fc[0]], [1, fc[1]]]); ctx.fill();
      if (kind === 'kappa') { ctx.fillStyle = '#f2ffd9'; for (let i = 0; i < 3; i++) { ellipse(ctx, x - 1.2 * k + i * 1.2 * k, cy, 0.4 * k, 0.6 * k); ctx.fill(); } }
    }
    gloss(ctx, x - w * 0.42, cy - ry * 0.1, x - w * 0.3, cy - ry * 0.9, x, cy - ry * 1.0, k * 0.5, 0.4);
  }
  function inari(ctx, x, y, k, rnd) {
    const w = 22 * k, h = 13 * k;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(x - w / 2, y - h * 0.2);
    ctx.bezierCurveTo(x - w / 2, y - h * 1.1, x - w * 0.1, y - h * 1.25, x + w * 0.15, y - h * 1.15);
    ctx.bezierCurveTo(x + w * 0.5, y - h * 1.05, x + w * 0.55, y - h * 0.5, x + w / 2, y - h * 0.15);
    ctx.quadraticCurveTo(x, y + h * 0.25, x - w / 2, y - h * 0.2); ctx.closePath();
    ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = h * 0.35; ctx.shadowOffsetY = h * 0.12;
    ctx.fillStyle = radial(ctx, x - w * 0.15, y - h * 0.8, w * 0.7, [[0, '#e9b56a'], [0.6, '#c78338'], [1, '#8a5218']]); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.clip();
    ctx.strokeStyle = 'rgba(110,60,15,0.45)'; ctx.lineWidth = k * 0.7;
    for (let i = 0; i < 7; i++) { const xx = x - w / 2 + rnd() * w, yy = y - rnd() * h; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 3 * k, yy - 2 * k, xx + 6 * k, yy + rnd() * 2 * k); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,230,170,0.25)'; for (let i = 0; i < 14; i++) { ellipse(ctx, x + (rnd() - 0.5) * w, y - rnd() * h, 0.8 * k, 0.5 * k); ctx.fill(); }
    ctx.restore();
    gloss(ctx, x - w * 0.35, y - h * 0.8, x - w * 0.1, y - h * 1.15, x + w * 0.15, y - h * 1.05, k * 1.2, 0.45);
  }
  function dango(ctx, x, y, k) {
    ctx.save(); ctx.translate(x, y - 6 * k); ctx.rotate(-0.25);
    ctx.strokeStyle = '#d9b77c'; ctx.lineWidth = 1.6 * k; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26 * k, 0); ctx.lineTo(26 * k, 0); ctx.stroke();
    [['#ffd3e0', '#f39ab7', '#c95f84'], ['#ffffff', '#f6efe2', '#cfc4ad'], ['#d8f0b0', '#9cc76b', '#5a8a2e']].forEach((c, i) => {
      const px = -14 * k + i * 13 * k;
      ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 3 * k; ctx.shadowOffsetY = 2 * k;
      ellipse(ctx, px, 0, 7 * k, 6.6 * k); ctx.fillStyle = radial(ctx, px - 2.5 * k, -2.5 * k, 9 * k, [[0, c[0]], [0.6, c[1]], [1, c[2]]]); ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ellipse(ctx, px - 2.4 * k, -2.8 * k, 1.8 * k, 1.1 * k, -0.5); ctx.fill();
    });
    ctx.restore();
  }
  function purin(ctx, x, y, k) {
    const w0 = 22 * k, w1 = 16 * k, h = 14 * k;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 4 * k; ctx.shadowOffsetY = 2 * k;
    ctx.beginPath(); ctx.moveTo(x - w0 / 2, y); ctx.lineTo(x - w1 / 2, y - h); ctx.lineTo(x + w1 / 2, y - h); ctx.lineTo(x + w0 / 2, y); ctx.ellipse(x, y, w0 / 2, 3 * k, 0, 0, Math.PI); ctx.closePath();
    ctx.fillStyle = linear(ctx, x - w0 / 2, 0, x + w0 / 2, 0, [[0, '#e0a83a'], [0.4, '#ffe08a'], [1, '#d09a30']]); ctx.fill(); ctx.restore();
    ellipse(ctx, x, y - h, w1 / 2, 2.6 * k); ctx.fillStyle = '#6e2e08'; ctx.fill();
    ctx.fillStyle = '#7d3a0c';
    [[-5, 4], [0, 6], [5, 3]].forEach(([dx, l]) => { roundRect(ctx, x + dx * k - 1.2 * k, y - h, 2.4 * k, l * k, 1.2 * k); ctx.fill(); });
    for (let i = 0; i < 3; i++) { ellipse(ctx, x, y - h - 2 * k - i * 2.2 * k, (6 - i * 1.8) * k, 2.2 * k); ctx.fillStyle = i % 2 ? '#fffdf8' : '#f2ece0'; ctx.fill(); }
    sphere(ctx, x + 0.5 * k, y - h - 9.5 * k, 2.8 * k, '#ff8a8a', '#d8102a', '#6a0010');
    ctx.strokeStyle = '#4a7a2a'; ctx.lineWidth = 0.7 * k; ctx.beginPath(); ctx.moveTo(x + 0.5 * k, y - h - 12 * k); ctx.quadraticCurveTo(x + 2 * k, y - h - 16 * k, x + 4 * k, y - h - 16.5 * k); ctx.stroke();
    gloss(ctx, x - w0 * 0.35, y - h * 0.2, x - w0 * 0.33, y - h * 0.6, x - w1 * 0.3, y - h * 0.9, k * 1, 0.5);
  }

  const PLATES = [
    { body: '#f6f3ec', rim: '#d5cdbd' },
    { body: '#f3f5fa', rim: '#2b55a6', pattern: 'dots' },
    { body: '#b71c24', rim: '#f0cf6e', pattern: 'gold' },
    { body: '#1e1918', rim: '#d8b23e', pattern: 'gold' },
    { body: '#eef5e8', rim: '#3e8f4c' },
    { body: '#e9c75e', rim: '#9a7420' },
    { body: '#fcf0f2', rim: '#e8799b', pattern: 'sakura' },
    { body: '#27396b', rim: '#a9badf', pattern: 'wave' },
    { body: '#f7f2e6', rim: '#e07a24' },
  ];
  function plate(ctx, x, y, R, st) {
    const ry = R * 0.36;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = R * 0.22; ctx.shadowOffsetY = R * 0.1;
    ellipse(ctx, x, y + R * 0.07, R * 0.98, ry); ctx.fillStyle = shade(st.body, -0.4); ctx.fill();
    ctx.restore();
    ellipse(ctx, x, y + R * 0.06, R * 0.99, ry); ctx.fillStyle = linear(ctx, x - R, 0, x + R, 0, [[0, shade(st.body, -0.45)], [0.5, shade(st.body, -0.15)], [1, shade(st.body, -0.5)]]); ctx.fill();
    ellipse(ctx, x, y, R, ry); ctx.fillStyle = linear(ctx, 0, y - ry, 0, y + ry, [[0, shade(st.body, 0.18)], [1, shade(st.body, -0.12)]]); ctx.fill();
    ellipse(ctx, x, y, R * 0.92, ry * 0.9); ctx.strokeStyle = st.rim; ctx.lineWidth = R * 0.075; ctx.stroke();
    if (st.pattern === 'dots' || st.pattern === 'gold' || st.pattern === 'sakura') {
      const n = 22; ctx.fillStyle = st.pattern === 'gold' ? '#ffe9a0' : st.pattern === 'sakura' ? '#f7a9c0' : '#ffffff';
      for (let i = 0; i < n; i++) { const a = i / n * TAU; ellipse(ctx, x + Math.cos(a) * R * 0.92, y + Math.sin(a) * ry * 0.9, R * 0.022, R * 0.014); ctx.fill(); }
    } else if (st.pattern === 'wave') {
      ctx.strokeStyle = 'rgba(220,230,255,0.5)'; ctx.lineWidth = R * 0.015;
      for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * R * 0.8, y + Math.sin(a) * ry * 0.78, R * 0.06, R * 0.03, 0, Math.PI, 0); ctx.stroke(); }
    }
    ellipse(ctx, x, y + ry * 0.05, R * 0.7, ry * 0.66); ctx.fillStyle = 'rgba(0,0,0,0.06)'; ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = R * 0.02; ctx.stroke();
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = R * 0.03;
    ctx.beginPath(); ctx.ellipse(x, y, R * 0.97, ry * 0.95, 0, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke();
    ctx.restore();
  }
  function dome(ctx, x, y, R) {
    const ry = R * 0.36, H = R * 1.0;
    ctx.save();
    ctx.beginPath(); ctx.ellipse(x, y, R * 1.03, H, 0, Math.PI, 0); ctx.ellipse(x, y, R * 1.03, ry * 1.06, 0, 0, Math.PI); ctx.closePath();
    ctx.fillStyle = radial(ctx, x - R * 0.3, y - H * 0.6, R * 1.4, [[0, 'rgba(230,245,255,0.16)'], [0.6, 'rgba(200,225,255,0.06)'], [1, 'rgba(200,225,255,0.14)']]); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = R * 0.025; ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = R * 0.06; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.ellipse(x, y, R * 0.85, H * 0.82, 0, Math.PI * 1.15, Math.PI * 1.38); ctx.stroke();
    ctx.lineWidth = R * 0.025; ctx.beginPath(); ctx.ellipse(x, y, R * 0.85, H * 0.82, 0, Math.PI * 1.45, Math.PI * 1.52); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = R * 0.03; ctx.beginPath(); ctx.ellipse(x, y, R * 0.9, H * 0.85, 0, Math.PI * 1.75, Math.PI * 1.9); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = R * 0.02; ellipse(ctx, x, y, R * 1.02, ry * 1.04); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    // knob
    ellipse(ctx, x, y - H - R * 0.02, R * 0.16, R * 0.07); ctx.fillStyle = 'rgba(220,240,255,0.35)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = R * 0.015; ctx.stroke();
    ctx.restore();
  }
  const KINDS = ['salmon', 'maguro', 'chutoro', 'hamachi', 'tai', 'saba', 'ebi', 'tako', 'unagi', 'tamago', 'ika', 'hotate',
    'g-ikura', 'g-uni', 'g-negitoro', 'g-tobiko', 'm-tekka', 'm-kappa', 'm-kanpyo', 'm-california', 'inari', 'dango', 'purin'];
  function food(ctx, kind, x, y, k, rnd) {
    if (kind.startsWith('g-')) { gunkan(ctx, x - 11 * k, y - 1 * k, k, kind.slice(2), rnd); gunkan(ctx, x + 11 * k, y + 2 * k, k, kind.slice(2), rnd); return; }
    if (kind.startsWith('m-')) {
      const kd = kind.slice(2);
      if (kd === 'california') { makiPiece(ctx, x - 10 * k, y - 1 * k, k * 1.15, kd, rnd); makiPiece(ctx, x + 10 * k, y + 2 * k, k * 1.15, kd, rnd); return; }
      makiPiece(ctx, x - 14 * k, y - 1 * k, k, kd, rnd); makiPiece(ctx, x + 14 * k, y - 1 * k, k, kd, rnd); makiPiece(ctx, x, y + 3 * k, k, kd, rnd); return;
    }
    if (kind === 'inari') { inari(ctx, x - 11 * k, y, k, rnd); inari(ctx, x + 11 * k, y + 3 * k, k, rnd); return; }
    if (kind === 'dango') return dango(ctx, x, y + 2 * k, k);
    if (kind === 'purin') return purin(ctx, x, y + 3 * k, k);
    ctx.save(); ctx.translate(x - 11 * k, y - 1 * k); ctx.rotate(-0.06); nigiri(ctx, 0, 0, k, kind, rnd); ctx.restore();
    ctx.save(); ctx.translate(x + 11 * k, y + 3 * k); ctx.rotate(0.05); nigiri(ctx, 0, 0, k, kind, rnd); ctx.restore();
  }
  function sprite(kind, plateIdx, cover, R, d, seed) {
    const rnd = mulberry32(seed);
    const W = R * 2.4, H = R * 2.5;
    const [c, ctx] = hiCanvas(W, H, d);
    const cx = W / 2, cy = H - R * 0.55;
    plate(ctx, cx, cy, R, PLATES[plateIdx % PLATES.length]);
    food(ctx, kind, cx, cy + R * 0.04, R / 34, rnd);
    if (cover) dome(ctx, cx, cy, R);
    return { c, w: W, h: H, ax: cx, ay: cy };
  }
  return { sprite, food, plate, dome, nigiri, gunkan, rice, sphere, KINDS, PLATES, gloss };
})();
