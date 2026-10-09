/* ================= People toolkit: illustrated, animated characters =================
   Units: 1 unit ≈ 1px at scale 1. Origin = base of the neck. Head centre (0,-17).
   Static parts (torso/clothes, head/hair) are cached sprites per person; eyes, brows,
   mouth, arms, hands and legs are drawn live each frame so they can animate cheaply. */
const People = (() => {
  const SKIN = { pale: '#f7dcc6', light: '#efc6a2', olive: '#d9a679', tan: '#c98f60', brown: '#9c6640', dark: '#6e4227', deep: '#4b2b1a' };
  const HAIR = { black: '#15110f', dbrown: '#3a2416', brown: '#6a4226', auburn: '#8a3a1c', blonde: '#d8b26a', ginger: '#c0622a', grey: '#9a968f', white: '#e6e2da', blue: '#1b1f2e' };
  const sk = (s) => SKIN[s] || s, hc = (h) => HAIR[h] || h;

  function rim(x, w, h, ox, oy, side, col, a) {
    x.save(); x.globalCompositeOperation = 'source-atop';
    const g = x.createLinearGradient(ox + side * w * 0.5, 0, ox - side * w * 0.1, 0);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.35, rgba(col, a * 0.25)); g.addColorStop(1, rgba(col, 0));
    x.fillStyle = g; x.fillRect(-1000, -1000, 3000, 3000);
    // ambient occlusion on the far side
    const g2 = x.createLinearGradient(ox - side * w * 0.5, 0, ox, 0);
    g2.addColorStop(0, 'rgba(10,5,0,0.32)'); g2.addColorStop(1, 'rgba(10,5,0,0)');
    x.fillStyle = g2; x.fillRect(-1000, -1000, 3000, 3000);
    x.restore();
  }

  /* ---------------- body (torso + clothing) ---------------- */
  // anatomical torso silhouette: neck base -> sloped trapezius -> rounded deltoid -> ribcage -> waist -> hips -> hem
  function torsoPath(x, s, P, hem) {
    const sw = s.sw, ww = s.ww, hw = s.hw, fem = P && P.female, kid = P && P.age === 'kid', bot = hem || s.bot;
    const nk = kid ? 3.6 : fem ? 4.0 : 4.8;
    x.beginPath();
    x.moveTo(-nk, -3.5);
    x.bezierCurveTo(-nk - 2.6, -1.4, -sw + 5.5, 0.2, -sw + 1.6, 3);                 // trapezius slope
    x.bezierCurveTo(-sw - 0.5, 4.6, -sw - 0.7, 11, -sw + 0.6, 16.5);                 // deltoid cap
    x.bezierCurveTo(-ww - (fem ? 2.2 : 3), 22, -ww - 0.8, 31, -ww, 38);              // lats / ribcage taper
    if (bot > 42) x.bezierCurveTo(-ww + 0.3, 43, -hw - (fem ? 1.6 : 0.6), 47, -hw - (fem ? 1.2 : 0.2) - Math.max(0, bot - 60) * 0.12, bot);
    else x.lineTo(-ww, bot);
    x.quadraticCurveTo(0, bot + 1.2, hw + (fem ? 1.2 : 0.2) + Math.max(0, bot - 60) * 0.12, bot > 42 ? bot : bot);
    if (bot > 42) x.bezierCurveTo(hw + (fem ? 1.6 : 0.6), 47, ww - 0.3, 43, ww, 38);
    else x.lineTo(ww, 38);
    x.bezierCurveTo(ww + 0.8, 31, ww + (fem ? 2.2 : 3), 22, sw - 0.3, 16.5);
    x.bezierCurveTo(sw + 0.7, 11, sw + 0.5, 4.6, sw - 1.6, 3);
    x.bezierCurveTo(sw - 5.5, 0.2, nk + 2.6, -1.4, nk, -3.5);
    x.closePath();
  }
  const HEM = { suit: 63, tux: 63, vest: 54, shirt: 53, polo: 54, blouse: 53, tee: 57, hoodie: 59, sweater: 57, cardigan: 61, kappogi: 64, apron: 53, uniform: 58, qipao: 62, dress: 60, sailor: 52, coat: 74 };
  // pelvis + trousers seat (visible below tucked shirts / short tops)
  function pelvis(x, P) {
    const s = P.shape, pc = P.pants || '#2a2a34', fem = P.female;
    x.beginPath(); x.moveTo(-s.ww - 0.5, 40); x.bezierCurveTo(-s.hw - (fem ? 1.6 : 0.8), 47, -s.hw - 0.6, 56, -s.hw + 0.8, 67);
    x.lineTo(-1.5, 69); x.quadraticCurveTo(0, 63.5, 1.5, 69); x.lineTo(s.hw - 0.8, 67);
    x.bezierCurveTo(s.hw + 0.6, 56, s.hw + (fem ? 1.6 : 0.8), 47, s.ww + 0.5, 40); x.closePath();
    x.fillStyle = linear(x, -s.hw, 0, s.hw, 0, [[0, shade(pc, -0.35)], [0.4, shade(pc, 0.06)], [1, shade(pc, -0.3)]]); x.fill();
    x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 0.5; x.beginPath(); x.moveTo(0.6, 53); x.quadraticCurveTo(1.2, 60, 0, 65); x.stroke();
    x.strokeStyle = rgba(shade(pc, 0.3), 0.35); x.beginPath(); x.moveTo(-s.hw + 2, 55); x.quadraticCurveTo(-6, 58, -3, 64); x.moveTo(s.hw - 2, 55); x.quadraticCurveTo(6, 58, 3, 64); x.stroke();
    // belt
    if (!P.noBelt && (P.top.hem || HEM[P.top.type] || 57) < 56) { x.fillStyle = P.belt || '#2a1a10'; x.beginPath(); x.moveTo(-s.ww + 0.2, 49.5); x.quadraticCurveTo(0, 51.5, s.ww - 0.2, 49.5); x.lineTo(s.ww, 52.4); x.quadraticCurveTo(0, 54.4, -s.ww, 52.4); x.closePath(); x.fill();
      x.strokeStyle = '#c8b070'; x.lineWidth = 0.7; x.strokeRect(-1.8, 50.2, 3.6, 2.8); }
  }
  function fold(x, x0, y0, x1, y1, bend, col, w) { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2 + bend, (y0 + y1) / 2, x1, y1); x.stroke(); }
  function buttons(x, bx, y0, n, gap, col) { for (let i = 0; i < n; i++) { ellipse(x, bx, y0 + i * gap, 0.9, 0.9); x.fillStyle = col; x.fill(); x.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(x, bx - 0.3, y0 + i * gap - 0.3, 0.35, 0.35); x.fill(); } }
  function drawBody(x, P) {
    const s = P.shape, top = P.top, c = top.col, c2 = top.col2 || shade(c, -0.3), L = P.light;
    const skin = sk(P.skin);
    // neck: tapered column flaring into the trapezius, chin shadow, sternocleidomastoid hints
    const nk = P.age === 'kid' ? 3.2 : P.female ? 3.3 : 4.1;
    x.beginPath(); x.moveTo(-nk, -11); x.bezierCurveTo(-nk + 0.2, -6, -nk - 0.4, -3, -nk - 3, -0.5); x.lineTo(nk + 3, -0.5); x.bezierCurveTo(nk + 0.4, -3, nk - 0.2, -6, nk, -11); x.closePath();
    x.fillStyle = linear(x, -nk - 2, 0, nk + 2, 0, [[0, shade(skin, -0.3)], [0.45, shade(skin, 0.04)], [1, shade(skin, -0.18)]]); x.fill();
    x.fillStyle = linear(x, 0, -11, 0, -4, [[0, 'rgba(70,30,12,0.5)'], [1, 'rgba(70,30,12,0)']]); x.fill();
    x.strokeStyle = rgba(shade(skin, -0.4), 0.35); x.lineWidth = 0.5; x.beginPath(); x.moveTo(-nk + 0.6, -9); x.quadraticCurveTo(-1.5, -4, -0.8, -1); x.moveTo(nk - 0.6, -9); x.quadraticCurveTo(1.5, -4, 0.8, -1); x.stroke();
    if (!P.female && P.age !== 'kid') { x.fillStyle = rgba(shade(skin, 0.12), 0.7); ellipse(x, 0, -5.5, 0.9, 1.3); x.fill(); }
    const hem = top.hem || HEM[top.type] || 58;
    if (!top.skirt && top.type !== 'dress' && top.type !== 'qipao' && hem < 66) pelvis(x, P);
    // skirt / dress lower part drawn first (behind torso hem)
    if (top.skirt) {
      const sl = top.skirt;
      x.beginPath(); x.moveTo(-s.hw, 52); x.bezierCurveTo(-s.hw - 4, 70, -s.hw - 7, 86, -s.hw - 6 - (sl.flare || 0), sl.len);
      x.lineTo(s.hw + 6 + (sl.flare || 0), sl.len); x.bezierCurveTo(s.hw + 7, 86, s.hw + 4, 70, s.hw, 52); x.closePath();
      x.fillStyle = linear(x, -s.hw - 8, 0, s.hw + 8, 0, [[0, shade(sl.col, -0.35)], [0.45, sl.col], [1, shade(sl.col, -0.25)]]); x.fill();
      for (let k = -2; k <= 2; k++) fold(x, k * 5, 58, k * 7.5, sl.len - 1, k, 'rgba(0,0,0,0.18)', 0.9);
      if (sl.pleats) for (let k = -4; k <= 4; k++) fold(x, k * 3.6, 55, k * 5.2, sl.len, 0, 'rgba(0,0,0,0.22)', 0.6);
      if (sl.fringe) { x.strokeStyle = shade(sl.col, 0.35); x.lineWidth = 0.6; for (let fx = -s.hw - 8; fx < s.hw + 8; fx += 1.4) { x.beginPath(); x.moveTo(fx, sl.len - 8); x.lineTo(fx + 0.4, sl.len + 3); x.stroke(); } }
    }
    x.save();
    torsoPath(x, s, P, hem);
    x.fillStyle = linear(x, -s.sw - 2, 0, s.sw + 2, 0, [[0, shade(c, -0.42)], [0.18, shade(c, -0.12)], [0.42, shade(c, 0.1)], [0.62, c], [0.86, shade(c, -0.2)], [1, shade(c, -0.4)]]); x.fill();
    x.clip();
    const fc = 'rgba(0,0,0,0.16)', hl = 'rgba(255,255,255,0.12)';
    switch (top.type) {
      case 'suit': case 'tux': {
        const sh = top.shirt || '#f2efe8';
        x.beginPath(); x.moveTo(-6, -2); x.lineTo(0, 30); x.lineTo(6, -2); x.closePath(); x.fillStyle = sh; x.fill();
        if (top.tie !== false) { x.beginPath(); x.moveTo(-1.6, 1); x.lineTo(1.6, 1); x.lineTo(2.4, 22); x.lineTo(0, 26); x.lineTo(-2.4, 22); x.closePath(); x.fillStyle = top.tie || '#7a1a22'; x.fill(); x.fillStyle = 'rgba(255,255,255,0.15)'; for (let k = 0; k < 5; k++) x.fillRect(-2, 5 + k * 4, 4, 0.8); }
        if (top.bow) { x.fillStyle = top.bow; x.beginPath(); x.moveTo(0, 1.5); x.lineTo(-5, -1); x.lineTo(-5, 4); x.closePath(); x.moveTo(0, 1.5); x.lineTo(5, -1); x.lineTo(5, 4); x.closePath(); x.fill(); ellipse(x, 0, 1.5, 1.2, 1.2); x.fill(); }
        // lapels
        x.fillStyle = shade(c, -0.15);
        [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 6, -2); x.lineTo(d * 1, 30); x.lineTo(d * 8, 14); x.lineTo(d * 12, 12); x.lineTo(d * 9, 1); x.closePath(); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.12)'; x.lineWidth = 0.6; x.stroke(); });
        if (top.type === 'tux') { x.fillStyle = 'rgba(255,255,255,0.08)'; [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 6, -2); x.lineTo(d * 1, 30); x.lineTo(d * 8, 14); x.closePath(); x.fill(); }); }
        if (top.pocket) { x.fillStyle = top.pocket; x.beginPath(); x.moveTo(-14, 18); x.lineTo(-11, 15); x.lineTo(-9, 18); x.closePath(); x.fill(); }
        buttons(x, 1.5, 34, 2, 6, shade(c, -0.5));
        if (top.stripes) { x.strokeStyle = 'rgba(255,255,255,0.07)'; x.lineWidth = 0.5; for (let k = -30; k < 30; k += 2.2) { x.beginPath(); x.moveTo(k, -5); x.lineTo(k, 70); x.stroke(); } }
        fold(x, -12, 30, -10, 46, -2, fc, 1); fold(x, 12, 32, 9, 46, 2, fc, 1);
        break;
      }
      case 'vest': {
        const sh = top.shirt || '#f4f0e6';
        x.fillStyle = linear(x, -s.sw, 0, s.sw, 0, [[0, shade(sh, -0.3)], [0.5, sh], [1, shade(sh, -0.2)]]); x.fillRect(-40, -5, 80, 80);
        fold(x, -15, 8, -13, 24, 2, 'rgba(0,0,0,0.12)', 0.8); fold(x, 15, 8, 13, 24, -2, 'rgba(0,0,0,0.12)', 0.8);
        x.beginPath(); x.moveTo(-s.sw + 4, 4); x.lineTo(-4, 2); x.lineTo(0, 24); x.lineTo(4, 2); x.lineTo(s.sw - 4, 4); x.lineTo(s.ww + 1, 60); x.lineTo(-s.ww - 1, 60); x.closePath();
        x.fillStyle = linear(x, -s.sw, 0, s.sw, 0, [[0, shade(c, -0.4)], [0.5, c], [1, shade(c, -0.3)]]); x.fill();
        if (top.pattern) { x.strokeStyle = 'rgba(255,220,160,0.08)'; x.lineWidth = 0.5; for (let k = -40; k < 40; k += 2) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k + 20, 60); x.stroke(); } }
        buttons(x, 0.8, 28, 4, 5, '#c9a040');
        if (top.chain) { x.strokeStyle = '#d8b050'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(1, 38); x.quadraticCurveTo(7, 44, 11, 39); x.stroke(); }
        x.fillStyle = top.bow || '#1a1a1a'; x.beginPath(); x.moveTo(0, 1.5); x.lineTo(-4.5, -0.8); x.lineTo(-4.5, 3.8); x.closePath(); x.moveTo(0, 1.5); x.lineTo(4.5, -0.8); x.lineTo(4.5, 3.8); x.closePath(); x.fill();
        break;
      }
      case 'shirt': case 'polo': case 'blouse': {
        x.fillStyle = shade(c, 0.15);
        [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 5, -2.5); x.lineTo(d * 1, 6); x.lineTo(d * 10, 3); x.closePath(); x.fill(); x.strokeStyle = 'rgba(0,0,0,0.2)'; x.lineWidth = 0.5; x.stroke(); });
        x.strokeStyle = 'rgba(0,0,0,0.15)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(0, 5); x.lineTo(0, 60); x.stroke();
        buttons(x, 1.4, 9, top.type === 'polo' ? 2 : 6, 7, shade(c, 0.4));
        if (top.check) { x.strokeStyle = rgba(top.check, 0.35); x.lineWidth = 1.1; for (let k = -30; k < 30; k += 5) { x.beginPath(); x.moveTo(k, -5); x.lineTo(k, 70); x.moveTo(-30, k + 25); x.lineTo(30, k + 25); x.stroke(); } }
        if (top.pocketPen) { x.fillStyle = shade(c, -0.08); x.fillRect(-13, 14, 7, 7); x.fillStyle = '#2a4aa0'; x.fillRect(-11, 11, 1.2, 6); }
        fold(x, -14, 20, -8, 40, 3, fc, 1); fold(x, 12, 16, 8, 36, -2, fc, 1); fold(x, -4, 44, 4, 46, 0, fc, 0.8);
        break;
      }
      case 'tee': case 'hoodie': case 'sweater': {
        x.strokeStyle = shade(c, -0.25); x.lineWidth = 1.5; x.beginPath(); x.ellipse(0, -2, 6.5, 4, 0, 0.1, Math.PI - 0.1); x.stroke();
        if (top.print) top.print(x);
        if (top.stripes) { x.fillStyle = rgba(top.stripes, 0.85); for (let k = 8; k < 60; k += 8) x.fillRect(-40, k, 80, 3); }
        if (top.type === 'hoodie') { x.fillStyle = shade(c, -0.2); x.beginPath(); x.ellipse(0, 0, 11, 5, 0, 0, Math.PI); x.fill(); x.strokeStyle = '#eee'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(-3, 4); x.lineTo(-3, 14); x.moveTo(3, 4); x.lineTo(3, 14); x.stroke(); x.fillStyle = shade(c, -0.12); roundRect(x, -10, 36, 20, 10, 3); x.fill(); }
        if (top.type === 'sweater') { x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 0.5; for (let k = -30; k < 30; k += 2) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k, 70); x.stroke(); } x.fillStyle = shade(c, -0.15); x.fillRect(-40, 50, 80, 12); }
        fold(x, -13, 18, -7, 38, 3, fc, 1); fold(x, 13, 22, 7, 40, -3, fc, 1);
        break;
      }
      case 'cardigan': {
        const sh = top.shirt || '#f0e6d8';
        x.fillStyle = sh; x.beginPath(); x.moveTo(-7, -2); x.lineTo(0, 40); x.lineTo(7, -2); x.closePath(); x.fill();
        if (top.brooch) { ellipse(x, -9, 12, 1.8, 1.8); x.fillStyle = top.brooch; x.fill(); }
        x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 0.5; for (let k = -30; k < 30; k += 1.8) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k, 70); x.stroke(); }
        x.strokeStyle = shade(c, -0.3); x.lineWidth = 2; [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 7, -2); x.lineTo(d * 1.5, 40); x.lineTo(d * 1.5, 70); x.stroke(); });
        buttons(x, -3, 22, 4, 7, '#e8dcc8');
        if (top.pearls) { for (let k = -5; k <= 5; k++) { ellipse(x, k * 1.2, 2.5 + Math.abs(k) * -0.2 + 3 - Math.abs(k) * 0.05 + (25 - k * k) * 0.12, 0.8, 0.8); x.fillStyle = '#f6f0e6'; x.fill(); } }
        break;
      }
      case 'kappogi': {
        fold(x, -6, -2, 6, 36, 0, '#1d2d55', 4.2); fold(x, 6, -2, 2, 22, 0, '#1d2d55', 4.2);
        fold(x, -14, 18, -10, 52, 2, fc, 1); fold(x, 14, 22, 10, 52, -2, fc, 1); fold(x, -3, 40, 6, 52, 1, fc, 0.8);
        if (top.apron) { x.fillStyle = top.apron; x.fillRect(-40, 44, 80, 30); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-40, 44, 80, 1.5); }
        break;
      }
      case 'apron': { // shirt + bib apron (bakery counter staff)
        const sh = top.shirt || '#ffffff';
        x.fillStyle = linear(x, -s.sw, 0, s.sw, 0, [[0, shade(sh, -0.3)], [0.5, sh], [1, shade(sh, -0.2)]]); x.fillRect(-40, -5, 80, 80);
        x.fillStyle = shade(sh, -0.08); [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 5, -2.5); x.lineTo(d * 1, 5); x.lineTo(d * 9, 3); x.closePath(); x.fill(); });
        if (top.tshirt) { x.fillStyle = top.tshirt; x.fillRect(-40, -5, 80, 80); x.strokeStyle = shade(top.tshirt, -0.25); x.lineWidth = 1.4; x.beginPath(); x.ellipse(0, -2, 6.5, 4, 0, 0.1, Math.PI - 0.1); x.stroke(); }
        x.beginPath(); x.moveTo(-9, 10); x.lineTo(9, 10); x.lineTo(11, 30); x.lineTo(s.hw + 2, 46); x.lineTo(s.hw + 2, 80); x.lineTo(-s.hw - 2, 80); x.lineTo(-s.hw - 2, 46); x.lineTo(-11, 30); x.closePath();
        x.fillStyle = linear(x, -12, 0, 12, 0, [[0, shade(c, -0.2)], [0.5, c], [1, shade(c, -0.15)]]); x.fill();
        x.strokeStyle = shade(c, -0.3); x.lineWidth = 0.6; x.stroke();
        x.strokeStyle = shade(c, -0.15); x.lineWidth = 1.6; x.beginPath(); x.moveTo(-8, 10); x.lineTo(-4, -2); x.moveTo(8, 10); x.lineTo(4, -2); x.stroke();
        if (top.logo) top.logo(x);
        if (top.stains) { x.fillStyle = 'rgba(160,110,60,0.18)'; ellipse(x, 5, 38, 2, 1.4); x.fill(); ellipse(x, -6, 44, 1.4, 1); x.fill(); }
        fold(x, -6, 30, -8, 58, -2, 'rgba(0,0,0,0.12)', 1); fold(x, 6, 34, 8, 58, 2, 'rgba(0,0,0,0.12)', 1);
        break;
      }
      case 'uniform': case 'qipao': { // mandarin collar jacket / qipao
        x.fillStyle = shade(c, 0.1); roundRect(x, -6, -4, 12, 5, 2); x.fill();
        x.strokeStyle = top.trim || '#e8c04a'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(-6, -1); x.lineTo(6, -1); x.stroke();
        x.strokeStyle = top.trim || '#e8c04a'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 1); x.quadraticCurveTo(6, 6, 11, 4); x.lineTo(10, 30); x.stroke();
        for (let k = 0; k < 3; k++) { x.strokeStyle = top.trim || '#e8c04a'; x.lineWidth = 1.1; x.beginPath(); x.moveTo(7, 9 + k * 7); x.lineTo(13, 9 + k * 7); x.stroke(); ellipse(x, 13.5, 9 + k * 7, 1, 1); x.fillStyle = top.trim || '#e8c04a'; x.fill(); }
        if (top.pattern === 'flower') { for (let k = 0; k < 7; k++) { const fx = -14 + (k * 37) % 28, fy = 8 + (k * 23) % 44; x.fillStyle = 'rgba(255,220,200,0.18)'; for (let p = 0; p < 5; p++) { ellipse(x, fx + Math.cos(p * 1.26) * 1.6, fy + Math.sin(p * 1.26) * 1.6, 1.2, 1.2); x.fill(); } } }
        if (top.badge) { x.fillStyle = '#f2ece0'; roundRect(x, -15, 12, 8, 3, 0.8); x.fill(); x.fillStyle = '#a02020'; x.fillRect(-14, 13, 2, 1); }
        if (top.apron) { x.fillStyle = top.apron; x.fillRect(-40, 46, 80, 40); x.strokeStyle = 'rgba(0,0,0,0.15)'; x.lineWidth = 1; x.beginPath(); x.moveTo(-40, 46); x.lineTo(40, 46); x.stroke(); }
        fold(x, -12, 24, -10, 44, 2, fc, 1); fold(x, 13, 34, 9, 50, -2, fc, 1);
        break;
      }
      case 'dress': { // 1920s flapper drop-waist dress with beading
        if (top.straps) { x.fillStyle = sk(P.skin); x.beginPath(); x.moveTo(-s.sw - 3, -3); x.lineTo(s.sw + 3, -3); x.lineTo(s.sw, 10); x.quadraticCurveTo(0, 18, -s.sw, 10); x.closePath(); x.fill(); x.fillStyle = 'rgba(80,40,20,0.15)'; x.fillRect(-1, 12, 2, 4); }
        x.fillStyle = 'rgba(255,240,200,0.35)';
        for (let yy = 16; yy < 64; yy += 2.2) for (let xx = -20 + (yy % 4.4 ? 1.1 : 0); xx < 20; xx += 2.2) { x.fillRect(xx, yy, 0.7, 0.7); }
        x.strokeStyle = top.bead || '#f0d080'; x.lineWidth = 1.2; [44, 50].forEach((yy) => { x.beginPath(); x.moveTo(-30, yy); x.lineTo(30, yy); x.stroke(); });
        if (top.straps) { x.strokeStyle = top.bead || '#f0d080'; x.lineWidth = 1; x.beginPath(); x.moveTo(-9, 12); x.lineTo(-12, 3); x.moveTo(9, 12); x.lineTo(12, 3); x.stroke(); }
        break;
      }
      case 'sailor': { // Japanese school uniform
        x.fillStyle = top.collar || '#1b2440'; x.beginPath(); x.moveTo(-s.sw + 2, 4); x.lineTo(-6, -2); x.lineTo(0, 16); x.lineTo(6, -2); x.lineTo(s.sw - 2, 4); x.lineTo(s.sw - 4, 14); x.lineTo(0, 22); x.lineTo(-s.sw + 4, 14); x.closePath(); x.fill();
        x.strokeStyle = '#f4f4f4'; x.lineWidth = 0.7; x.stroke();
        x.fillStyle = top.scarf || '#c0282c'; x.beginPath(); x.moveTo(-5, 14); x.lineTo(5, 14); x.lineTo(2, 30); x.lineTo(0, 27); x.lineTo(-2, 30); x.closePath(); x.fill();
        fold(x, -14, 26, -9, 48, 2, fc, 1); fold(x, 13, 26, 9, 48, -2, fc, 1);
        break;
      }
      case 'coat': {
        x.fillStyle = shade(c, -0.12); [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 5, -3); x.lineTo(d * 13, 4); x.lineTo(d * 9, 20); x.lineTo(d * 2, 34); x.closePath(); x.fill(); });
        if (top.scarf) { x.fillStyle = top.scarf; roundRect(x, -9, -4, 18, 7, 3); x.fill(); x.fillRect(3, 2, 5, 20); x.fillStyle = 'rgba(255,255,255,0.2)'; for (let k = 0; k < 3; k++) x.fillRect(3, 6 + k * 5, 5, 1); }
        buttons(x, 4, 24, 3, 8, shade(c, -0.5)); buttons(x, -4, 24, 3, 8, shade(c, -0.5));
        fold(x, -13, 28, -11, 52, 2, fc, 1); fold(x, 13, 28, 11, 52, -2, fc, 1);
        break;
      }
      default: break;
    }
    if (top.necklace) { x.strokeStyle = top.necklace; x.lineWidth = 0.9; x.beginPath(); x.ellipse(0, 0, 6.5, 8, 0, 0.2, Math.PI - 0.2); x.stroke(); ellipse(x, 0, 8, 1.3, 1.3); x.fillStyle = top.necklace; x.fill(); }
    if (top.pearls && top.type !== 'cardigan') { for (let a = 0.25; a < Math.PI - 0.2; a += 0.22) { ellipse(x, Math.cos(a) * 7, Math.sin(a) * (top.longPearls ? 26 : 9), 0.85, 0.85); x.fillStyle = '#f6f0e4'; x.fill(); } }
    // anatomy under cloth: chest planes, under-chest shadow, ribcage side shadow, armpit creases, waist drape
    const fem = P.female && P.age !== 'kid';
    x.fillStyle = linear(x, 0, -4, 0, 10, [[0, 'rgba(0,0,0,0.22)'], [1, 'rgba(0,0,0,0)']]); x.fillRect(-40, -4, 80, 14); // collar shadow
    if (fem && top.type !== 'apron' && top.type !== 'kappogi') { [-1, 1].forEach((d) => { x.fillStyle = radial(x, d * 5.5 - L * 1.2, 15, 8, [[0, 'rgba(255,255,255,0.1)'], [1, 'rgba(255,255,255,0)']]); ellipse(x, d * 5.5, 16, 7, 6.5); x.fill(); x.strokeStyle = 'rgba(0,0,0,0.07)'; x.lineWidth = 1.4; x.beginPath(); x.arc(d * 5.6, 15.5, 6, 0.6, 2.5); x.stroke(); }); }
    else if (P.age !== 'kid') { x.fillStyle = radial(x, -L * 5, 12, 12, [[0, 'rgba(255,255,255,0.08)'], [1, 'rgba(255,255,255,0)']]); x.fillRect(-20, 0, 40, 26); x.strokeStyle = /^(tee|polo|shirt|uniform)$/.test(top.type) ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(-13, 21); x.quadraticCurveTo(-6, 24, -1, 21.5); x.moveTo(13, 21); x.quadraticCurveTo(6, 24, 1, 21.5); x.stroke(); }
    [-1, 1].forEach((d) => { x.strokeStyle = 'rgba(0,0,0,0.13)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(d * (s.sw - 2), 14); x.quadraticCurveTo(d * (s.sw - 6), 19, d * (s.sw - 9), 21); x.stroke(); });
    x.fillStyle = linear(x, 0, 26, 0, hem + 2, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.26)']]); x.fillRect(-40, 26, 80, hem - 24);
    x.fillStyle = linear(x, -s.sw, 0, -s.ww + 3, 0, [[0, 'rgba(0,0,0,0.18)'], [1, 'rgba(0,0,0,0)']]); x.fillRect(-40, 18, 40 - s.ww + 3, hem);
    x.fillStyle = linear(x, s.ww - 3, 0, s.sw, 0, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.22)']]); x.fillRect(s.ww - 3, 18, 40, hem);
    if (hem > 50) { x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(-s.ww + 2, hem - 6); x.quadraticCurveTo(-4, hem - 3, 0, hem - 5); x.stroke(); }
    x.fillStyle = hl; ellipse(x, -L * 7, 10, 6, 7); x.fill();
    x.restore();
    torsoPath(x, s, P, hem); x.strokeStyle = 'rgba(20,10,5,0.45)'; x.lineWidth = 0.6; x.stroke();
    // hems: aprons, chef/kappogi aprons, jacket skirts drawn over the hips
    const apronCol = top.type === 'apron' ? c : top.apron;
    if (apronCol) { const y0 = top.type === 'apron' ? 44 : 47, y1 = top.apronLen || 88;
      x.beginPath(); x.moveTo(-s.hw - 1.5, y0); x.quadraticCurveTo(0, y0 + 1.5, s.hw + 1.5, y0); x.bezierCurveTo(s.hw + 2.5, y0 + 14, s.hw + 3.5, y1 - 14, s.hw + 4, y1); x.quadraticCurveTo(0, y1 + 1.5, -s.hw - 4, y1); x.bezierCurveTo(-s.hw - 3.5, y1 - 14, -s.hw - 2.5, y0 + 14, -s.hw - 1.5, y0); x.closePath();
      x.fillStyle = linear(x, -s.hw - 4, 0, s.hw + 4, 0, [[0, shade(apronCol, -0.3)], [0.4, shade(apronCol, 0.06)], [1, shade(apronCol, -0.26)]]); x.fill();
      x.strokeStyle = rgba(shade(apronCol, -0.45), 0.6); x.lineWidth = 0.5; x.stroke();
      for (let k = -2; k <= 2; k++) fold(x, k * 5, y0 + 6, k * 6.4, y1 - 2, k * 0.6, 'rgba(0,0,0,0.13)', 0.9);
      x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(-s.hw - 1.5, y0, s.hw * 2 + 3, 1.6);
      if (top.type === 'apron') { x.fillStyle = shade(apronCol, -0.1); x.fillRect(-s.hw - 2, y0 - 2.2, 3.2, 2.2); }
      if (top.apronTxt) top.apronTxt(x, y0, y1); }
  }

  /* ---------------- head ---------------- */
  function headShape(x, r) { // skull: broad cranium, temples, cheekbones, defined jaw angle, chin
    const j = r.jaw || 0.8, cw = r.chin || 0.3;
    x.beginPath();
    x.moveTo(0, -r.ry);
    x.bezierCurveTo(r.rx * 0.62, -r.ry, r.rx * 1.0, -r.ry * 0.62, r.rx * 0.99, -r.ry * 0.12);  // cranium to temple
    x.bezierCurveTo(r.rx * 1.0, r.ry * 0.12, r.rx * 0.98, r.ry * 0.3, r.rx * j * 1.08, r.ry * 0.5); // cheekbone
    x.bezierCurveTo(r.rx * j, r.ry * 0.72, r.rx * (cw + 0.2), r.ry * 0.96, r.rx * cw * 0.6, r.ry * 1.0); // jaw angle -> chin
    x.quadraticCurveTo(0, r.ry * 1.03, -r.rx * cw * 0.6, r.ry * 1.0);
    x.bezierCurveTo(-r.rx * (cw + 0.2), r.ry * 0.96, -r.rx * j, r.ry * 0.72, -r.rx * j * 1.08, r.ry * 0.5);
    x.bezierCurveTo(-r.rx * 0.98, r.ry * 0.3, -r.rx * 1.0, r.ry * 0.12, -r.rx * 0.99, -r.ry * 0.12);
    x.bezierCurveTo(-r.rx * 1.0, -r.ry * 0.62, -r.rx * 0.62, -r.ry, 0, -r.ry);
    x.closePath();
  }
  // hair volume: crown sheen band, darker roots/underside, clumped strands (applied inside the last filled hair path)
  function hairVolume(x, r, hair, rnd, y0 = -r.ry - 3, y1 = 4) {
    x.save(); x.clip();
    x.fillStyle = linear(x, 0, y0, 0, y1, [[0, 'rgba(255,255,255,0.05)'], [0.6, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.3)']]); x.fillRect(-r.rx * 2, y0 - 4, r.rx * 4, y1 - y0 + 40);
    x.strokeStyle = rgba(shade(hair, 0.55), 0.32); x.lineWidth = 2.2; x.beginPath(); x.ellipse(-1, -r.ry * 0.25, r.rx * 0.82, r.ry * 0.72, 0, Math.PI * 1.12, Math.PI * 1.62); x.stroke();
    x.strokeStyle = rgba(shade(hair, 0.7), 0.25); x.lineWidth = 0.9; x.stroke();
    x.strokeStyle = rgba(shade(hair, -0.5), 0.35); x.lineWidth = 0.45;
    for (let i = 0; i < 16; i++) { const xx = -r.rx + rnd() * r.rx * 2; x.beginPath(); x.moveTo(xx * 0.5, y0 + 1); x.quadraticCurveTo(xx * 0.9 + (rnd() - 0.5) * 3, (y0 + y1) / 2, xx + (rnd() - 0.5) * 2, y1 + rnd() * 6); x.stroke(); }
    x.restore();
  }
  function hairStrands(x, rnd, n, x0, x1, y0, y1, col, w, curve) {
    x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round';
    for (let i = 0; i < n; i++) { const xx = x0 + (x1 - x0) * rnd(); x.beginPath(); x.moveTo(xx, y0 + rnd() * 2); x.quadraticCurveTo(xx + curve * (rnd() - 0.3), (y0 + y1) / 2, xx + curve * 0.6 * (rnd() - 0.5), y1 - rnd() * 3); x.stroke(); }
  }
  function drawHead(x, P) {
    const r = P.head, skin = sk(P.skin), hair = hc(P.hair), rnd = mulberry32(P.seed * 7 + 3), st = P.hairStyle, L = P.light;
    const hg = (y0, y1) => linear(x, -r.rx, y0, r.rx, y1, [[0, shade(hair, 0.18)], [0.5, hair], [1, shade(hair, -0.35)]]);
    // back hair (behind head)
    x.fillStyle = hg(-r.ry, r.ry);
    if (st === 'long' || st === 'wavyLong') { x.beginPath(); x.moveTo(-r.rx - 1, -4); x.bezierCurveTo(-r.rx - 4.5, 10, -r.rx - 4, 24, -r.rx - 1 + (st === 'wavyLong' ? -1.5 : 0), 31); x.quadraticCurveTo(-r.rx * 0.5, 33, 0, 30); x.quadraticCurveTo(r.rx * 0.5, 33, r.rx + 1, 31); x.bezierCurveTo(r.rx + 4, 24, r.rx + 4.5, 10, r.rx + 1, -4); x.closePath(); x.fill(); x.save(); x.clip(); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-r.rx * 0.9, 0, r.rx * 1.8, 34); x.strokeStyle = rgba(shade(hair, 0.4), 0.16); x.lineWidth = 0.4; for (let i = 0; i < 24; i++) { const xx = -r.rx - 3 + rnd() * (r.rx * 2 + 6); x.beginPath(); x.moveTo(xx, -2); x.bezierCurveTo(xx + (st === 'wavyLong' ? 3 : 0.5), 10, xx - (st === 'wavyLong' ? 3 : 0.5), 20, xx + rnd() - 0.5, 32); x.stroke(); } x.restore(); }
    if (st === 'bob' || st === 'finger') { x.beginPath(); x.moveTo(-r.rx - 2, -4); x.bezierCurveTo(-r.rx - 3, 6, -r.rx - 2, 10, -r.rx + 2, 11); x.lineTo(r.rx - 2, 11); x.bezierCurveTo(r.rx + 2, 10, r.rx + 3, 6, r.rx + 2, -4); x.closePath(); x.fill(); }
    if (st === 'pony') { x.beginPath(); x.moveTo(r.rx * 0.4, -r.ry * 0.6); x.bezierCurveTo(r.rx + 9, -r.ry * 0.4, r.rx + 6, 12, r.rx + 2, 20); x.bezierCurveTo(r.rx - 1, 10, r.rx, 0, r.rx * 0.2, -r.ry * 0.3); x.fill(); }
    if (st === 'twin') [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * r.rx * 0.8, -2); x.bezierCurveTo(d * (r.rx + 7), 2, d * (r.rx + 6), 16, d * (r.rx + 2), 22); x.bezierCurveTo(d * (r.rx - 1), 12, d * r.rx, 4, d * r.rx * 0.6, 0); x.fill(); });
    if (st === 'bun') { ellipse(x, 0, -r.ry - 3, 6, 5); x.fill(); hairStrands(x, rnd, 10, -5, 5, -r.ry - 7, -r.ry + 1, rgba(shade(hair, 0.3), 0.5), 0.4, 4); }
    if (st === 'topknot') { ellipse(x, 0, -r.ry - 2, 4, 3.5); x.fill(); }
    // ears
    x.fillStyle = shade(skin, -0.08);
    [-1, 1].forEach((d) => { const ex = d * r.rx * 0.96; x.beginPath(); x.moveTo(ex - d * 0.4, -1.8); x.bezierCurveTo(ex + d * 2.6, -3.2, ex + d * 2.8, 2.2, ex + d * 1.2, 4.6); x.quadraticCurveTo(ex + d * 0.2, 5.6, ex - d * 0.3, 4); x.closePath(); x.fillStyle = linear(x, ex, 0, ex + d * 2.6, 0, [[0, shade(skin, -0.25)], [1, shade(skin, -0.02)]]); x.fill();
      x.strokeStyle = rgba(shade(skin, -0.45), 0.7); x.lineWidth = 0.4; x.beginPath(); x.moveTo(ex + d * 0.4, -1); x.bezierCurveTo(ex + d * 2, -1.8, ex + d * 2, 2, ex + d * 0.9, 3.4); x.stroke(); x.fillStyle = rgba(shade(skin, -0.5), 0.4); ellipse(x, ex + d * 0.8, 1, 0.5, 0.9); x.fill(); });
    if (P.acc.earrings) [-1, 1].forEach((d) => { ellipse(x, d * r.rx * 0.98, 5.2, 0.9, 0.9); x.fillStyle = P.acc.earrings; x.fill(); if (P.acc.dangle) { x.fillRect(d * r.rx * 0.98 - 0.3, 5.5, 0.6, 3); ellipse(x, d * r.rx * 0.98, 9, 1, 1.4); x.fill(); } });
    // face
    headShape(x, r);
    x.fillStyle = radial(x, -L * 3, -3, r.ry * 1.25, [[0, shade(skin, 0.12)], [0.55, skin], [1, shade(skin, -0.28)]]); x.fill();
    x.save(); headShape(x, r); x.clip();
    x.fillStyle = linear(x, L * r.rx * 0.3, 0, L * r.rx * 1.05, 0, [[0, 'rgba(80,30,10,0)'], [1, 'rgba(80,30,10,0.28)']]); x.fillRect(-r.rx * 1.2, -r.ry * 1.2, r.rx * 2.4, r.ry * 2.4); // far side plane
    x.fillStyle = linear(x, 0, r.ry * 0.3, 0, r.ry * 1.05, [[0, 'rgba(80,30,10,0)'], [1, 'rgba(80,30,10,0.16)']]); x.fillRect(-r.rx * 1.2, 0, r.rx * 2.4, r.ry * 1.2); // jaw underside
    [-1, 1].forEach((d) => { x.fillStyle = rgba(shade(sk(P.skin), -0.4), d === L ? 0.2 : 0.1); x.beginPath(); x.moveTo(d * r.rx * 0.95, r.ry * 0.05); x.quadraticCurveTo(d * r.rx * 0.55, r.ry * 0.38, d * r.rx * 0.7, r.ry * 0.7); x.lineTo(d * r.rx * 0.98, r.ry * 0.4); x.closePath(); x.fill(); }); // under-cheekbone hollows
    x.fillStyle = 'rgba(255,255,255,0.14)'; ellipse(x, -L * 2, -r.ry * 0.55, 4.2, 2.6); x.fill(); // forehead sheen
    x.fillStyle = 'rgba(255,255,255,0.1)'; [-1, 1].forEach((d) => { ellipse(x, d * r.rx * 0.55, r.ry * 0.12, 1.8, 1.1, d * 0.4); x.fill(); }); // cheekbone light
    x.fillStyle = 'rgba(255,255,255,0.1)'; ellipse(x, 0, r.ry * 0.86, 1.6, 0.9); x.fill(); // chin light
    if (P.blush !== false) { [-1, 1].forEach((d) => { x.fillStyle = radial(x, d * 5, 3.6, 3, [[0, rgba('#e8706a', P.age === 'kid' ? 0.26 : P.female ? 0.16 : 0.08)], [1, rgba('#e8706a', 0)]]); ellipse(x, d * 5, 3.6, 3, 2.2); x.fill(); }); }
    if (P.age === 'old') { x.strokeStyle = 'rgba(90,50,30,0.3)'; x.lineWidth = 0.45; [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * 2.4, 3.5); x.quadraticCurveTo(d * 4.6, 6.5, d * 3.8, 9); x.stroke(); x.beginPath(); x.moveTo(d * 6.5, -2); x.lineTo(d * 8, -1.2); x.stroke(); x.beginPath(); x.moveTo(d * 6.6, -0.4); x.lineTo(d * 8.2, 0); x.stroke(); }); x.beginPath(); x.moveTo(-3, -8); x.lineTo(3, -8); x.moveTo(-2.5, -9.5); x.lineTo(2.5, -9.5); x.stroke(); }
    if (P.acc.stubble) { x.fillStyle = rgba(hair, 0.18); x.beginPath(); x.moveTo(-r.rx * 0.9, 2); x.bezierCurveTo(-r.rx * 0.8, 10, -4, r.ry, 0, r.ry); x.bezierCurveTo(4, r.ry, r.rx * 0.8, 10, r.rx * 0.9, 2); x.lineTo(r.rx * 0.6, 6); x.quadraticCurveTo(0, 3, -r.rx * 0.6, 6); x.closePath(); x.fill(); }
    if (P.acc.beard) { x.fillStyle = hg(0, r.ry); x.beginPath(); x.moveTo(-r.rx * 0.95, 1); x.bezierCurveTo(-r.rx, 12, -5, r.ry + 4, 0, r.ry + 4); x.bezierCurveTo(5, r.ry + 4, r.rx, 12, r.rx * 0.95, 1); x.lineTo(r.rx * 0.6, 4); x.quadraticCurveTo(3, 8.5, 0, 8.5); x.quadraticCurveTo(-3, 8.5, -r.rx * 0.6, 4); x.closePath(); x.fill(); hairStrands(x, rnd, 20, -8, 8, 6, r.ry + 3, rgba(shade(hair, 0.3), 0.4), 0.35, 2); }
    x.restore();
    // hair front
    const cap = (front) => {
      x.beginPath();
      x.moveTo(-r.rx - 1.2, 3);
      x.bezierCurveTo(-r.rx - 2.5, -r.ry * 0.9, -r.rx * 0.6, -r.ry - 3, 0, -r.ry - 2.5);
      x.bezierCurveTo(r.rx * 0.6, -r.ry - 3, r.rx + 2.5, -r.ry * 0.9, r.rx + 1.2, 3);
      front();
      x.closePath();
    };
    x.fillStyle = hg(-r.ry - 3, 0);
    switch (st) {
      case 'bald': [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * (r.rx + 0.8), -6); x.quadraticCurveTo(d * (r.rx + 2), 0, d * (r.rx - 0.5), 4); x.lineTo(d * (r.rx - 2), -4); x.closePath(); x.fill(); }); x.fillStyle = 'rgba(255,255,255,0.25)'; ellipse(x, -L * 3, -r.ry * 0.7, 3.5, 1.6, -0.3); x.fill(); break;
      case 'buzz': cap(() => { x.lineTo(r.rx - 1, -4); x.quadraticCurveTo(0, -r.ry * 0.95, -r.rx + 1, -4); }); x.fill(); x.fillStyle = rgba(hair, 0.3); x.fill(); break;
      case 'slick': cap(() => { x.lineTo(r.rx - 0.5, -3); x.bezierCurveTo(r.rx * 0.6, -r.ry * 0.7, -r.rx * 0.2, -r.ry * 0.85, -r.rx + 0.5, -3); }); x.fill(); hairVolume(x, r, hair, rnd); hairStrands(x, rnd, 18, -r.rx, r.rx, -r.ry - 2, -4, 'rgba(255,255,255,0.18)', 0.35, 10); x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(-3, -r.ry - 2); x.quadraticCurveTo(-4, -r.ry + 2, -5, -r.ry + 4); x.stroke(); break;
      case 'side': case 'short': cap(() => { x.lineTo(r.rx - 0.8, -2); x.bezierCurveTo(r.rx * 0.7, -r.ry * 0.55, r.rx * 0.2, -r.ry * 0.62, -r.rx * 0.2, -r.ry * 0.5); x.bezierCurveTo(-r.rx * 0.6, -r.ry * 0.35, -r.rx * 0.8, -r.ry * 0.3, -r.rx + 0.5, -1); }); x.fill(); hairVolume(x, r, hair, rnd); hairStrands(x, rnd, 16, -r.rx, r.rx, -r.ry - 2, -r.ry * 0.4, 'rgba(255,255,255,0.14)', 0.4, 6); break;
      case 'curly': for (let i = 0; i < 26; i++) { const a = Math.PI + (i / 25) * Math.PI, rr = r.rx + 1.5 + rnd() * 1.5; ellipse(x, Math.cos(a) * rr * 1.05, Math.sin(a) * (r.ry + 2) + 2 - (i % 2) * 1.2, 3.2, 3); x.fill(); } ellipse(x, 0, -r.ry * 0.55, r.rx + 0.5, r.ry * 0.45); x.fill(); x.fillStyle = 'rgba(255,255,255,0.12)'; for (let i = 0; i < 14; i++) { x.beginPath(); x.arc(-r.rx + rnd() * r.rx * 2, -r.ry + rnd() * 6, 1.4, 3.6, 5.6); x.fill(); } break;
      case 'perm': for (let i = 0; i < 30; i++) { const a = Math.PI * 0.92 + (i / 29) * Math.PI * 1.16, rr = r.rx + 2 + rnd(); ellipse(x, Math.cos(a) * rr, Math.sin(a) * (r.ry + 1.5) - 0.5, 2.6, 2.4); x.fill(); } ellipse(x, 0, -r.ry * 0.5, r.rx + 1, r.ry * 0.5); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 0.5; for (let i = 0; i < 16; i++) { x.beginPath(); x.arc(-r.rx + rnd() * r.rx * 2, -r.ry - 1 + rnd() * 7, 1.3, 3.4, 5.8); x.stroke(); } break;
      case 'bob': case 'finger': cap(() => { x.lineTo(r.rx + 0.5, 6); x.lineTo(r.rx - 1.5, -3); x.bezierCurveTo(r.rx * 0.5, -r.ry * 0.5, -r.rx * 0.3, -r.ry * 0.6, -r.rx * 0.8, -5); x.lineTo(-r.rx - 0.5, 6); }); x.fill(); hairVolume(x, r, hair, rnd);
        if (st === 'finger') { x.strokeStyle = 'rgba(255,255,255,0.22)'; x.lineWidth = 0.7; for (let k = 0; k < 4; k++) { x.beginPath(); for (let xx = -r.rx; xx <= r.rx; xx += 1) { const yy = -r.ry + 1 + k * 3 + Math.sin(xx * 0.8) * 1.1; xx === -r.rx ? x.moveTo(xx, yy) : x.lineTo(xx, yy); } x.stroke(); } x.fillStyle = hg(-3, 8); ellipse(x, -r.rx + 1, 0, 3, 5, 0.3); x.fill(); }
        else hairStrands(x, rnd, 20, -r.rx, r.rx, -r.ry - 1, 6, 'rgba(255,255,255,0.12)', 0.4, 4);
        x.fillStyle = hg(-3, 8); x.beginPath(); x.moveTo(-r.rx * 0.95, -6); x.quadraticCurveTo(-r.rx * 0.2, -r.ry * 0.85, r.rx * 0.6, -5); x.quadraticCurveTo(0, -r.ry * 0.5, -r.rx * 0.95, -2); x.fill(); break;
      case 'long': case 'wavyLong': case 'pony': case 'twin': case 'bun': case 'topknot':
        cap(() => { x.lineTo(r.rx - 0.2, 4); x.lineTo(r.rx - 1.5, -3); x.bezierCurveTo(r.rx * 0.6, -r.ry * 0.45, r.rx * 0.1, -r.ry * 0.55, -r.rx * 0.1, -r.ry * 0.7); x.bezierCurveTo(-r.rx * 0.4, -r.ry * 0.4, -r.rx * 0.8, -r.ry * 0.3, -r.rx + 0.8, -2); x.lineTo(-r.rx - 0.2, 4); }); x.fill(); hairVolume(x, r, hair, rnd);
        hairStrands(x, rnd, 22, -r.rx, r.rx, -r.ry - 1.5, -2, 'rgba(255,255,255,0.07)', 0.3, 5);
        if (st === 'twin' || st === 'pony') { x.fillStyle = P.acc.ribbon || '#e04a6a'; [-1, 1].forEach((d) => { if (st === 'pony' && d < 0) return; ellipse(x, d * (r.rx + 0.5), -r.ry * 0.25, 1.8, 1.5); x.fill(); }); }
        break;
      default: break;
    }
    // hats
    const hat = P.acc.hat;
    if (hat) {
      const hcol = P.acc.hatCol || '#2a2a2e';
      const hgr = linear(x, -r.rx - 6, 0, r.rx + 6, 0, [[0, shade(hcol, -0.35)], [0.4, shade(hcol, 0.12)], [1, shade(hcol, -0.3)]]);
      if (hat === 'fedora' || hat === 'trilby') {
        x.fillStyle = hgr; ellipse(x, 0, -r.ry * 0.62, r.rx + 7, 2.6); x.fill();
        x.beginPath(); x.moveTo(-r.rx + 0.5, -r.ry * 0.62); x.bezierCurveTo(-r.rx, -r.ry - 7, -3, -r.ry - 6, 0, -r.ry - 4); x.bezierCurveTo(3, -r.ry - 6, r.rx, -r.ry - 7, r.rx - 0.5, -r.ry * 0.62); x.closePath(); x.fill();
        x.fillStyle = P.acc.band || '#141414'; x.fillRect(-r.rx + 0.6, -r.ry * 0.62 - 3.2, r.rx * 2 - 1.2, 2.6);
        x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(0, -r.ry - 4); x.lineTo(0, -r.ry * 0.62 - 3.5); x.stroke();
      } else if (hat === 'bowler') {
        x.fillStyle = hgr; ellipse(x, 0, -r.ry * 0.6, r.rx + 4, 2.2); x.fill(); ellipse(x, 0, -r.ry * 0.68, r.rx * 0.95, r.ry * 0.62); x.fill(); x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(-r.rx * 0.95, -r.ry * 0.66 - 2, r.rx * 1.9, 1.6);
      } else if (hat === 'cloche') {
        x.fillStyle = hgr; x.beginPath(); x.moveTo(-r.rx - 3, 0); x.bezierCurveTo(-r.rx - 3, -r.ry - 5, r.rx + 3, -r.ry - 5, r.rx + 3, 0); x.quadraticCurveTo(r.rx, -2.5, 0, -3.5); x.quadraticCurveTo(-r.rx, -2.5, -r.rx - 3, 0); x.fill();
        x.fillStyle = P.acc.band || '#c0283a'; x.fillRect(-r.rx - 1.5, -6.5, r.rx * 2 + 3, 2); ellipse(x, r.rx - 1, -5.5, 2.4, 2.4); x.fill();
      } else if (hat === 'headband') {
        x.fillStyle = P.acc.band || '#1a1a1a'; x.save(); x.beginPath(); x.ellipse(0, -r.ry * 0.38, r.rx + 1.6, 3, 0, Math.PI, 0); x.lineTo(r.rx + 1.6, -r.ry * 0.38 + 1.5); x.ellipse(0, -r.ry * 0.38 + 1.5, r.rx + 1.6, 3, 0, 0, Math.PI, true); x.fill(); x.restore();
        x.fillStyle = '#f0d080'; ellipse(x, -r.rx * 0.55, -r.ry * 0.62, 1.6, 1.6); x.fill();
        x.strokeStyle = P.acc.feather || '#f4f0e8'; x.lineWidth = 0.5; for (let k = 0; k < 14; k++) { x.beginPath(); x.moveTo(-r.rx * 0.55, -r.ry * 0.62); x.quadraticCurveTo(-r.rx * 0.9 - k * 0.3, -r.ry - 6 - k * 0.4, -r.rx * 1.1 - k * 0.2, -r.ry - 10 + k * 0.6); x.stroke(); }
      } else if (hat === 'toque') {
        x.fillStyle = linear(x, -r.rx, 0, r.rx, 0, [[0, '#cfc8bc'], [0.45, '#ffffff'], [1, '#bdb5a8']]);
        x.fillRect(-r.rx + 0.5, -r.ry - 4, r.rx * 2 - 1, 8);
        x.beginPath(); x.moveTo(-r.rx + 0.5, -r.ry - 3); x.bezierCurveTo(-r.rx - 6, -r.ry - 12, -4, -r.ry - 20, 0, -r.ry - 15); x.bezierCurveTo(4, -r.ry - 21, r.rx + 6, -r.ry - 12, r.rx - 0.5, -r.ry - 3); x.fill();
        x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 0.5; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(k * 3.5, -r.ry - 4); x.quadraticCurveTo(k * 4.5, -r.ry - 10, k * 3, -r.ry - 15); x.stroke(); }
      } else if (hat === 'paper') { // bakery paper cap
        x.fillStyle = linear(x, -r.rx, 0, r.rx, 0, [[0, '#d8d4cc'], [0.5, '#ffffff'], [1, '#c8c4bc']]);
        x.beginPath(); x.moveTo(-r.rx - 0.5, -r.ry * 0.45); x.lineTo(-r.rx + 1, -r.ry - 4); x.lineTo(r.rx - 1, -r.ry - 4); x.lineTo(r.rx + 0.5, -r.ry * 0.45); x.closePath(); x.fill();
        x.strokeStyle = 'rgba(0,0,0,0.15)'; x.lineWidth = 0.5; x.stroke(); x.fillStyle = P.acc.band || '#2a5aa8'; x.fillRect(-r.rx, -r.ry * 0.62, r.rx * 2, 1.4);
      } else if (hat === 'cap') {
        x.fillStyle = hgr; x.beginPath(); x.ellipse(0, -r.ry * 0.45, r.rx + 1.2, r.ry * 0.62, 0, Math.PI, 0); x.fill();
        x.fillStyle = shade(hcol, -0.2); x.beginPath(); x.ellipse(-P.capDir * (r.rx * 0.6), -r.ry * 0.45, r.rx * 0.95, 2.4, 0, 0, Math.PI * 2); x.fill();
        if (P.acc.capLogo) { x.fillStyle = P.acc.capLogo; x.font = 'bold 6px Georgia, serif'; x.textAlign = 'center'; x.fillText('B', 0, -r.ry * 0.62); }
        ellipse(x, 0, -r.ry - 1, 1, 0.8); x.fillStyle = shade(hcol, -0.3); x.fill();
      } else if (hat === 'hachimaki') {
        x.fillStyle = linear(x, 0, -r.ry * 0.62, 0, -r.ry * 0.3, [[0, '#ffffff'], [1, '#d8d0c4']]); roundRect(x, -r.rx - 1.2, -r.ry * 0.66, r.rx * 2 + 2.4, 4.8, 2); x.fill();
        x.strokeStyle = '#c0282c'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(-r.rx, -r.ry * 0.66 + 2.4); x.lineTo(r.rx, -r.ry * 0.66 + 2.4); x.stroke();
        x.fillStyle = '#f2ece2'; ellipse(x, r.rx + 0.5, -r.ry * 0.5, 2.6, 2.2); x.fill(); x.beginPath(); x.moveTo(r.rx + 1.5, -r.ry * 0.45); x.lineTo(r.rx + 6, -r.ry * 0.1); x.lineTo(r.rx + 4.4, r.ry * 0.05); x.closePath(); x.fill();
      } else if (hat === 'newsboy') {
        x.fillStyle = hgr; x.beginPath(); x.ellipse(0.8, -r.ry * 0.62, r.rx + 2.8, r.ry * 0.5, 0, Math.PI, 0); x.fill(); x.fillStyle = shade(hcol, -0.3); ellipse(x, -2, -r.ry * 0.6, r.rx * 0.8, 1.8); x.fill(); ellipse(x, 0, -r.ry - 0.5, 1.2, 0.8); x.fill();
        x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 0.4; for (let k = -10; k < 10; k += 1.5) { x.beginPath(); x.moveTo(k, -r.ry - 1); x.lineTo(k * 1.2, -r.ry * 0.6); x.stroke(); }
      } else if (hat === 'hairnet') {
        x.strokeStyle = 'rgba(240,240,250,0.35)'; x.lineWidth = 0.3; for (let k = -r.rx; k < r.rx; k += 1.6) { x.beginPath(); x.moveTo(k, -r.ry - 2); x.lineTo(k + 3, -2); x.moveTo(k + 3, -r.ry - 2); x.lineTo(k, -2); x.stroke(); }
      } else if (hat === 'beret') {
        x.fillStyle = hgr; ellipse(x, 2, -r.ry * 0.82, r.rx + 2.5, r.ry * 0.38, 0.12); x.fill(); ellipse(x, 3, -r.ry * 1.05, 0.9, 1.2); x.fill();
      } else if (hat === 'sunhat') {
        x.fillStyle = hgr; ellipse(x, 0, -r.ry * 0.55, r.rx + 9, 3); x.fill(); x.beginPath(); x.ellipse(0, -r.ry * 0.6, r.rx * 0.95, r.ry * 0.62, 0, Math.PI, 0); x.fill(); x.fillStyle = P.acc.band || '#d04a6a'; x.fillRect(-r.rx * 0.95, -r.ry * 0.6 - 2.5, r.rx * 1.9, 2);
      }
    }
    // rim light on head (warm key light from the lamp side)
    rim(x, r.rx * 2.4, 0, 0, 0, -L, P.rimCol, 0.35);
  }

  /* ---------------- live features ---------------- */
  function drawFace(ctx, P, f) {
    const r = P.head, tx = f.turn * 2.4, ty = f.nod || 0, fem = P.female, kid = P.age === 'kid', old = P.age === 'old';
    const ex = fem ? 3.35 : 3.5, ey = -0.6 + ty, eyeCol = P.eyes || '#3a2414', skin = sk(P.skin), dk = shade(skin, -0.42);
    const blink = f.blink || 0, happy = f.eyes === 'happy', closed = f.eyes === 'closed' || blink > 0.85, wide = f.eyes === 'wide';
    // soft eye sockets
    ctx.fillStyle = rgba(shade(skin, -0.35), 0.16); for (const d of [-1, 1]) { ellipse(ctx, d * ex + tx, ey - 0.7, 2.6, 1.9); ctx.fill(); }
    // eyes: almond shape, iris + pupil + catchlight, upper lid line, crease, lower lid
    const ew = kid ? 1.75 : 1.65;
    for (const d of [-1, 1]) {
      const cx = d * ex + tx * (d === Math.sign(f.turn || 1) ? 1.1 : 0.85), cy = ey;
      if (happy) { ctx.strokeStyle = '#2a140a'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(cx - ew, cy + 0.3); ctx.quadraticCurveTo(cx, cy - 1.1, cx + ew, cy + 0.3); ctx.stroke(); ctx.strokeStyle = rgba(dk, 0.4); ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(cx - ew * 0.8, cy + 1.3); ctx.quadraticCurveTo(cx, cy + 0.6, cx + ew * 0.8, cy + 1.3); ctx.stroke(); continue; }
      if (closed) { ctx.strokeStyle = '#2a140a'; ctx.lineWidth = 0.65; ctx.beginPath(); ctx.moveTo(cx - ew, cy - 0.1); ctx.quadraticCurveTo(cx, cy + 0.8, cx + ew, cy - 0.1); ctx.stroke(); continue; }
      const oh = (old ? 0.7 : fem ? 0.98 : 0.88) * (1 - blink) * (wide ? 1.35 : 1);
      const eye = () => { ctx.beginPath(); ctx.moveTo(cx - ew * d, cy + 0.15); ctx.bezierCurveTo(cx - ew * 0.55 * d, cy - oh * 1.15, cx + ew * 0.45 * d, cy - oh * 1.2, cx + ew * d, cy - 0.05); ctx.bezierCurveTo(cx + ew * 0.4 * d, cy + oh * 0.95, cx - ew * 0.5 * d, cy + oh * 0.9, cx - ew * d, cy + 0.15); ctx.closePath(); };
      eye(); ctx.fillStyle = '#f4efe8'; ctx.fill();
      ctx.save(); eye(); ctx.clip();
      const lx = cx + (f.lookX || 0) * 0.6 + tx * 0.12, ly = cy - 0.05 + (f.lookY || 0) * 0.35;
      ctx.fillStyle = radial(ctx, lx, ly, 0.95, [[0, shade(eyeCol, 0.35)], [0.7, eyeCol], [1, shade(eyeCol, -0.5)]]); ellipse(ctx, lx, ly, 0.92, 0.92); ctx.fill();
      ellipse(ctx, lx, ly, 0.42, 0.42); ctx.fillStyle = '#060303'; ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ellipse(ctx, lx - 0.32, ly - 0.32, 0.22, 0.22); ctx.fill();
      ctx.fillStyle = 'rgba(60,30,15,0.35)'; ctx.fillRect(cx - 2.5, cy - oh * 1.3, 5, 0.55); // lid shadow on the eyeball
      ctx.restore();
      ctx.strokeStyle = '#1e0e06'; ctx.lineWidth = P.lashes ? 0.75 : 0.55; ctx.beginPath(); ctx.moveTo(cx - ew * d, cy + 0.15); ctx.bezierCurveTo(cx - ew * 0.55 * d, cy - oh * 1.15, cx + ew * 0.45 * d, cy - oh * 1.2, cx + ew * d, cy - 0.05); ctx.stroke();
      if (P.lashes) { ctx.lineWidth = 0.45; ctx.beginPath(); ctx.moveTo(cx + ew * d, cy - 0.05); ctx.lineTo(cx + (ew + 0.7) * d, cy - 0.6); ctx.stroke(); }
      ctx.strokeStyle = rgba(dk, 0.5); ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(cx - ew * 0.8 * d, cy - oh * 0.9); ctx.quadraticCurveTo(cx, cy - oh * 1.9 - 0.2, cx + ew * 0.95 * d, cy - oh * 0.8); ctx.stroke(); // crease
      ctx.strokeStyle = rgba(dk, 0.3); ctx.beginPath(); ctx.moveTo(cx - ew * 0.7 * d, cy + oh * 0.95); ctx.quadraticCurveTo(cx, cy + oh * 1.25, cx + ew * 0.8 * d, cy + oh * 0.7); ctx.stroke(); // lower lid
      if (old) { ctx.strokeStyle = 'rgba(90,50,30,0.35)'; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.arc(cx, cy + 1.6, 1.4, 0.4, Math.PI - 0.4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + (ew + 0.4) * d, cy); ctx.lineTo(cx + (ew + 1.4) * d, cy + 0.6); ctx.moveTo(cx + (ew + 0.4) * d, cy + 0.5); ctx.lineTo(cx + (ew + 1.3) * d, cy + 1.3); ctx.stroke(); }
    }
    // brows: tapered filled strokes following the brow ridge
    const br = f.brow || 0, bc = P.browCol || shade(hc(P.hair), -0.1), bt = fem ? 0.55 : old ? 0.95 : 0.8;
    ctx.fillStyle = bc;
    for (const d of [-1, 1]) { const cx = d * ex + tx, by = ey - 2.5 - br * 1.1, tilt = (f.browTilt || 0) * d;
      ctx.beginPath(); ctx.moveTo(cx - d * 1.9, by + 0.5 + tilt); ctx.quadraticCurveTo(cx - d * 0.2, by - bt - 0.3, cx + d * 2.3, by + 0.25 - tilt * 0.4); ctx.quadraticCurveTo(cx - d * 0.2, by - 0.1, cx - d * 1.9, by + 0.5 + bt + tilt); ctx.closePath(); ctx.fill(); }
    // nose: bridge light, side-plane shadow, ball, alae (nostril wings), cast shadow below
    const nx = tx * 1.25, sideL = -(P.light || 1);
    ctx.fillStyle = rgba(shade(skin, -0.4), 0.22); ctx.beginPath(); ctx.moveTo(nx - sideL * 0.4, -1.8 + ty); ctx.quadraticCurveTo(nx - sideL * 1.4, 1.5 + ty, nx - sideL * 1.6, 3.6 + ty); ctx.lineTo(nx - sideL * 0.4, 3.6 + ty); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = rgba(shade(skin, 0.3), 0.5); ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(nx + sideL * 0.2, -1.5 + ty); ctx.lineTo(nx + sideL * 0.35, 2.8 + ty); ctx.stroke();
    ctx.fillStyle = rgba(shade(skin, 0.18), 0.6); ellipse(ctx, nx + 0.1, 3.3 + ty, 1.05, 0.8); ctx.fill();
    ctx.strokeStyle = rgba(dk, 0.75); ctx.lineWidth = 0.45; ctx.beginPath(); ctx.moveTo(nx - 1.7, 3.3 + ty); ctx.quadraticCurveTo(nx - 1.9, 4.3 + ty, nx - 0.8, 4.3 + ty); ctx.moveTo(nx + 1.7, 3.3 + ty); ctx.quadraticCurveTo(nx + 1.9, 4.3 + ty, nx + 0.8, 4.3 + ty); ctx.stroke();
    ctx.fillStyle = rgba(shade(skin, -0.55), 0.6); ellipse(ctx, nx - 0.75, 4.15 + ty, 0.42, 0.24); ctx.fill(); ellipse(ctx, nx + 0.75, 4.15 + ty, 0.42, 0.24); ctx.fill();
    ctx.fillStyle = rgba(shade(skin, -0.35), 0.18); ellipse(ctx, nx, 4.9 + ty, 1.6, 0.5); ctx.fill();
    // philtrum
    ctx.strokeStyle = rgba(dk, 0.18); ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(nx - 0.4, 4.7 + ty); ctx.lineTo(nx - 0.5, 5.9 + ty); ctx.moveTo(nx + 0.4, 4.7 + ty); ctx.lineTo(nx + 0.5, 5.9 + ty); ctx.stroke();
    // mustache
    if (P.acc.mustache) { ctx.fillStyle = shade(hc(P.hair), -0.05); ctx.beginPath(); ctx.moveTo(tx - 3.6, 6.8 + ty); ctx.quadraticCurveTo(tx - 2, 4.8 + ty, tx, 5.4 + ty); ctx.quadraticCurveTo(tx + 2, 4.8 + ty, tx + 3.6, 6.8 + ty); ctx.quadraticCurveTo(tx + 2, 6.0 + ty, tx, 6.3 + ty); ctx.quadraticCurveTo(tx - 2, 6.0 + ty, tx - 3.6, 6.8 + ty); ctx.fill(); }
    // mouth: shaped lips (upper lip bow, fuller lower lip with highlight), expressions keep the same names
    const mx = tx * 1.05, my = 6.6 + ty + (P.acc.mustache ? 0.4 : 0), lipC = P.lips || shade(mix(skin, '#c05a5a', fem ? 0.35 : 0.22), -0.12);
    const m = f.mouth || 'smile', o = clamp(f.open ?? 0, 0, 1);
    ctx.lineCap = 'round';
    if (m === 'open' || m === 'talk' || m === 'chew' || m === 'o' || m === 'grin' || m === 'lick' || m === 'laugh') {
      const w = m === 'o' ? 1.15 : m === 'grin' || m === 'laugh' ? 2.5 : 1.85, h = m === 'grin' ? 1.0 + o * 0.6 : 0.35 + o * 1.6;
      const lipPath = () => { ctx.beginPath(); if (m === 'grin' || m === 'laugh') { ctx.moveTo(mx - w, my - 0.5); ctx.quadraticCurveTo(mx, my - 0.1, mx + w, my - 0.5); ctx.quadraticCurveTo(mx + w * 0.6, my + h * 1.5, mx, my + h * 1.6); ctx.quadraticCurveTo(mx - w * 0.6, my + h * 1.5, mx - w, my - 0.5); } else ctx.ellipse(mx, my + h * 0.3, w, h, 0, 0, TAU); };
      lipPath(); ctx.strokeStyle = lipC; ctx.lineWidth = 1.1; ctx.stroke(); ctx.fillStyle = '#3a0e0e'; ctx.fill();
      ctx.save(); lipPath(); ctx.clip();
      if (m === 'grin' || m === 'laugh' || (m === 'talk' && o > 0.3)) { ctx.fillStyle = '#f4efe6'; ctx.fillRect(mx - w, my - 0.9, w * 2, m === 'talk' ? 0.7 : 1.0); }
      ellipse(ctx, mx, my + h * 1.0, w * 0.65, h * 0.55); ctx.fillStyle = '#b8505a'; ctx.fill();
      ctx.restore();
      if (m === 'lick') { ctx.beginPath(); ctx.ellipse(mx + 0.3, my + h * 0.6 + 1.2, 1.2, 1.5 + o, 0, 0, TAU); ctx.fillStyle = '#e07a80'; ctx.fill(); ctx.strokeStyle = '#a04050'; ctx.lineWidth = 0.3; ctx.stroke(); }
      if (m === 'laugh' || m === 'grin') { ctx.strokeStyle = rgba(dk, 0.3); ctx.lineWidth = 0.4; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(mx + d * 2.2, 3.8 + ty); ctx.quadraticCurveTo(mx + d * 3.4, 5.8 + ty, mx + d * 3.0, 7.6 + ty); ctx.stroke(); } }
    } else {
      const curve = m === 'smile' ? 0.9 : m === 'big' ? 1.5 : m === 'frown' ? -0.8 : m === 'smirk' ? 0.5 : 0.1;
      const w = m === 'big' ? 2.3 : 1.9, lw = fem ? 1 : 0.8;
      // upper lip (cupid's bow) and lower lip
      ctx.fillStyle = shade(lipC, -0.12); ctx.beginPath(); ctx.moveTo(mx - w, my - curve * 0.35); ctx.quadraticCurveTo(mx - w * 0.5, my - 0.75 * lw, mx - 0.2, my - 0.55 * lw); ctx.lineTo(mx, my - 0.35 * lw); ctx.lineTo(mx + 0.2, my - 0.55 * lw); ctx.quadraticCurveTo(mx + w * 0.5, my - 0.75 * lw, mx + w, my - curve * 0.35); ctx.quadraticCurveTo(mx, my + curve * 0.5, mx - w, my - curve * 0.35); ctx.fill();
      ctx.fillStyle = lipC; ctx.beginPath(); ctx.moveTo(mx - w * 0.85, my - curve * 0.25); ctx.quadraticCurveTo(mx, my + curve * 0.55, mx + w * 0.85, my - curve * 0.25); ctx.quadraticCurveTo(mx, my + 1.25 * lw + curve * 0.4, mx - w * 0.85, my - curve * 0.25); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.25)'; ellipse(ctx, mx - 0.3, my + 0.55 * lw + curve * 0.3, 0.7, 0.22); ctx.fill();
      ctx.strokeStyle = '#4a1a12'; ctx.lineWidth = 0.45; ctx.beginPath(); ctx.moveTo(mx - w, my - curve * 0.35); ctx.quadraticCurveTo(mx, my + curve * 0.5, mx + w, my - curve * 0.35 - (m === 'smirk' ? 0.4 : 0)); ctx.stroke();
      if (m === 'big' || m === 'smile') { ctx.strokeStyle = rgba(dk, 0.22); ctx.lineWidth = 0.35; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(mx + d * (w + 0.1), my - curve * 0.3); ctx.quadraticCurveTo(mx + d * (w + 0.6), my - curve * 0.1, mx + d * (w + 0.4), my + 0.5); ctx.stroke(); } }
    }
    ctx.fillStyle = rgba(shade(skin, -0.35), 0.16); ellipse(ctx, mx, my + 2.4, 1.6, 0.5); ctx.fill(); // under-lip shadow
    // glasses
    if (P.acc.glasses) {
      ctx.strokeStyle = P.acc.glasses; ctx.lineWidth = 0.6;
      for (const d of [-1, 1]) { const cx = d * ex + tx; if (P.acc.round) { ellipse(ctx, cx, ey, 2.9, 2.6); } else roundRect(ctx, cx - 3, ey - 2.1, 6, 4.2, 1.2); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,0.12)'; ctx.fill(); }
      ctx.beginPath(); ctx.moveTo(-ex + tx + 2.9, ey - 0.6); ctx.quadraticCurveTo(tx, ey - 1.6, ex + tx - 2.9, ey - 0.6); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(-ex + tx - 1.5, ey - 1.2); ctx.lineTo(-ex + tx - 0.3, ey - 1.6); ctx.stroke();
    }
  }

  // two-bone IK: returns elbow position; bend = +1/-1 chooses the elbow side
  function ik(ax, ay, bx, by, l1, l2, bend) {
    let dx = bx - ax, dy = by - ay; let d = Math.hypot(dx, dy); const maxd = l1 + l2 - 0.01;
    if (d > maxd) { bx = ax + dx / d * maxd; by = ay + dy / d * maxd; dx = bx - ax; dy = by - ay; d = maxd; }
    const a = Math.atan2(dy, dx), cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
    const ang = a - bend * Math.acos(cosA);
    return [ax + Math.cos(ang) * l1, ay + Math.sin(ang) * l1, bx, by];
  }
  function limb(ctx, x0, y0, x1, y1, w0, w1, col, light) { return plimb(ctx, x0, y0, x1, y1, [[0, w0], [1, w1]], col, light); }
  // profiled limb: prof = [[t, halfWidthA, halfWidthB?], ...] along the bone; smooth contour, cylindrical shading, core shadow
  function plimb(ctx, x0, y0, x1, y1, prof, col, light, o = {}) {
    const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, nx = -uy, ny = ux;
    const A = [], B = [];
    for (const [t, a, b] of prof) { const px = x0 + dx * t, py = y0 + dy * t; A.push([px + nx * a, py + ny * a]); B.push([px - nx * (b ?? a), py - ny * (b ?? a)]); }
    const e = prof[prof.length - 1], s0 = prof[0], we = ((e[1] + (e[2] ?? e[1])) / 2), ws = ((s0[1] + (s0[2] ?? s0[1])) / 2);
    ctx.beginPath(); ctx.moveTo(A[0][0], A[0][1]);
    for (let i = 1; i < A.length - 1; i++) ctx.quadraticCurveTo(A[i][0], A[i][1], (A[i][0] + A[i + 1][0]) / 2, (A[i][1] + A[i + 1][1]) / 2);
    ctx.lineTo(A[A.length - 1][0], A[A.length - 1][1]);
    ctx.bezierCurveTo(A[A.length - 1][0] + ux * we * 1.3, A[A.length - 1][1] + uy * we * 1.3, B[B.length - 1][0] + ux * we * 1.3, B[B.length - 1][1] + uy * we * 1.3, B[B.length - 1][0], B[B.length - 1][1]);
    for (let i = B.length - 2; i > 0; i--) ctx.quadraticCurveTo(B[i][0], B[i][1], (B[i][0] + B[i - 1][0]) / 2, (B[i][1] + B[i - 1][1]) / 2);
    ctx.lineTo(B[0][0], B[0][1]);
    ctx.bezierCurveTo(B[0][0] - ux * ws * 1.2, B[0][1] - uy * ws * 1.2, A[0][0] - ux * ws * 1.2, A[0][1] - uy * ws * 1.2, A[0][0], A[0][1]);
    ctx.closePath();
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, w = Math.max(...prof.map((p) => Math.max(p[1], p[2] ?? p[1]))), sg = light >= 0 ? 1 : -1;
    const g = ctx.createLinearGradient(mx - nx * w * sg, my - ny * w * sg, mx + nx * w * sg, my + ny * w * sg);
    g.addColorStop(0, shade(col, 0.2)); g.addColorStop(0.28, shade(col, 0.06)); g.addColorStop(0.62, col); g.addColorStop(0.82, shade(col, -0.26)); g.addColorStop(1, shade(col, -0.42));
    ctx.fillStyle = g; ctx.fill();
    if (o.outline !== false) { ctx.strokeStyle = o.line || 'rgba(25,12,6,0.42)'; ctx.lineWidth = 0.45; ctx.stroke(); }
    return { nx, ny, ux, uy, l };
  }
  // seamless multi-joint limb (hip-knee-ankle / shoulder-elbow-wrist): one contour, mitred normals at joints
  function chain(ctx, pts, profs, col, light, o = {}) {
    const A = [], B = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
      let pnx = nx, pny = ny; if (i > 0) { const [xa, ya] = pts[i - 1], l0 = Math.hypot(x0 - xa, y0 - ya) || 1, mx = -(y0 - ya) / l0 + nx, my = (x0 - xa) / l0 + ny, ml = Math.hypot(mx, my) || 1; pnx = mx / ml; pny = my / ml; }
      for (const [t, a, b] of profs[i]) { if (i > 0 && t === 0) continue; const n0 = t === 0 ? [pnx, pny] : [nx, ny], px = x0 + dx * t, py = y0 + dy * t; A.push([px + n0[0] * a, py + n0[1] * a]); B.push([px - n0[0] * (b ?? a), py - n0[1] * (b ?? a)]); }
    }
    const [xs, ys] = pts[0], [xe, ye] = pts[pts.length - 1], [xp, yp] = pts[pts.length - 2], el = Math.hypot(xe - xp, ye - yp) || 1, ux = (xe - xp) / el, uy = (ye - yp) / el;
    const [xq, yq] = pts[1], sl = Math.hypot(xq - xs, yq - ys) || 1, sx = (xq - xs) / sl, sy = (yq - ys) / sl;
    const lp = profs[profs.length - 1], e = lp[lp.length - 1], we = (e[1] + (e[2] ?? e[1])) / 2 * (o.endCap ?? 1), ws = (profs[0][0][1] + (profs[0][0][2] ?? profs[0][0][1])) / 2;
    ctx.beginPath(); ctx.moveTo(A[0][0], A[0][1]);
    for (let i = 1; i < A.length - 1; i++) ctx.quadraticCurveTo(A[i][0], A[i][1], (A[i][0] + A[i + 1][0]) / 2, (A[i][1] + A[i + 1][1]) / 2);
    ctx.lineTo(A[A.length - 1][0], A[A.length - 1][1]);
    ctx.bezierCurveTo(A[A.length - 1][0] + ux * we * 1.2, A[A.length - 1][1] + uy * we * 1.2, B[B.length - 1][0] + ux * we * 1.2, B[B.length - 1][1] + uy * we * 1.2, B[B.length - 1][0], B[B.length - 1][1]);
    for (let i = B.length - 2; i > 0; i--) ctx.quadraticCurveTo(B[i][0], B[i][1], (B[i][0] + B[i - 1][0]) / 2, (B[i][1] + B[i - 1][1]) / 2);
    ctx.lineTo(B[0][0], B[0][1]);
    ctx.bezierCurveTo(B[0][0] - sx * ws * 1.1, B[0][1] - sy * ws * 1.1, A[0][0] - sx * ws * 1.1, A[0][1] - sy * ws * 1.1, A[0][0], A[0][1]);
    ctx.closePath();
    const mx = (xs + xe) / 2, my = (ys + ye) / 2, dx = xe - xs, dy = ye - ys, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, w = 6, sg = light >= 0 ? 1 : -1;
    const g = ctx.createLinearGradient(mx - nx * w * sg, my - ny * w * sg, mx + nx * w * sg, my + ny * w * sg);
    g.addColorStop(0, shade(col, 0.1)); g.addColorStop(0.3, shade(col, 0.04)); g.addColorStop(0.62, col); g.addColorStop(0.84, shade(col, -0.24)); g.addColorStop(1, shade(col, -0.4));
    ctx.fillStyle = g; ctx.fill();
    if (o.outline !== false) { ctx.strokeStyle = o.line || 'rgba(25,12,6,0.42)'; ctx.lineWidth = 0.45; ctx.stroke(); }
  }
  // anatomical profiles (half widths). a = outer side, b = inner side; mirrored per arm side.
  const PROF = {
    upper: (k) => [[0, 5.4 * k, 4.6 * k], [0.22, 5.1 * k, 4.3 * k], [0.55, 4.3 * k, 4.4 * k], [0.85, 3.6 * k, 3.6 * k], [1, 3.3 * k]],
    fore: (k) => [[0, 3.4 * k], [0.22, 3.9 * k, 3.5 * k], [0.55, 3.3 * k, 3.0 * k], [0.88, 2.4 * k], [1, 2.3 * k]],
    sleeveU: (k) => [[0, 4.7 * k], [0.4, 4.6 * k, 4.3 * k], [1, 4.0 * k]],
    sleeveF: (k) => [[0, 4.0 * k], [0.35, 3.8 * k], [0.8, 3.4 * k], [1, 3.6 * k]],
    thigh: (k) => [[0, 7.4 * k], [0.3, 7.0 * k, 6.6 * k], [0.75, 5.4 * k, 5.0 * k], [1, 4.4 * k]],
    shin: (k) => [[0, 4.4 * k], [0.12, 4.3 * k, 4.6 * k], [0.32, 4.4 * k, 4.9 * k], [0.75, 3.1 * k], [1, 2.6 * k]],
    trouserT: (k) => [[0, 7.8 * k], [0.4, 7.0 * k], [1, 5.4 * k]],
    trouserS: (k) => [[0, 5.4 * k], [0.6, 4.7 * k], [0.92, 4.6 * k], [1, 4.9 * k]],
  };
  const swapSide = (prof, side) => (side > 0 ? prof.map(([t, a, b]) => [t, b ?? a, a]) : prof);
  function fingers(ctx, skin, defs) { defs.forEach(([x0, y0, a, len, w]) => { const x1 = x0 + Math.cos(a) * len, y1 = y0 + Math.sin(a) * len; plimb(ctx, x0, y0, x1, y1, [[0, w], [0.55, w * 0.92], [1, w * 0.72]], skin, 1, { line: rgba(shade(skin, -0.5), 0.55) }); ctx.fillStyle = rgba(shade(skin, 0.35), 0.6); ellipse(ctx, x1 - Math.cos(a) * w * 0.6, y1 - Math.sin(a) * w * 0.6, w * 0.45, w * 0.32, a); ctx.fill(); }); }
  // hands at ~0.75 face length: palm block, articulated fingers, thumb; grips: fist, open/wave, point, tap, hidden
  function hand(ctx, P, x, y, ang, g) {
    const skin = sk(P.skin), s = P.age === 'kid' ? 0.78 : P.female ? 0.9 : 1, dk = shade(skin, -0.45);
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
    // palm: wrist -> knuckles, slightly wider at the knuckles
    ctx.beginPath(); ctx.moveTo(-0.6, -2.2); ctx.bezierCurveTo(2, -2.9, 4.5, -3.3, 6.2, -2.9); ctx.quadraticCurveTo(7.2, 0, 6.2, 3.1); ctx.bezierCurveTo(4.5, 3.4, 2, 3.0, -0.6, 2.2); ctx.closePath();
    ctx.fillStyle = linear(ctx, 0, -3.2, 0, 3.2, [[0, shade(skin, 0.1)], [0.6, skin], [1, shade(skin, -0.22)]]); ctx.fill(); ctx.strokeStyle = rgba(dk, 0.6); ctx.lineWidth = 0.4; ctx.stroke();
    if (g === 'point') { fingers(ctx, skin, [[6, -1.9, -0.05, 6.2, 0.95]]); ctx.fillStyle = shade(skin, -0.06); roundRect(ctx, 5, -1, 3.4, 4.2, 1.6); ctx.fill(); ctx.strokeStyle = rgba(dk, 0.5); ctx.stroke(); }
    else if (g === 'open' || g === 'wave') fingers(ctx, skin, [[6, -2.2, -0.2, 5.0, 0.85], [6.4, -0.7, -0.05, 5.6, 0.88], [6.4, 0.8, 0.08, 5.3, 0.85], [6, 2.2, 0.24, 4.3, 0.75]]);
    else if (g === 'tap') fingers(ctx, skin, [[6, -1.6, 0.1, 5.4, 0.9], [6.2, 0.2, 0.35, 5, 0.88]]);
    else if (g !== 'hidden') { // curled fingers: knuckle ridge + finger segments folded under
      ctx.beginPath(); ctx.moveTo(5.4, -3.1); ctx.bezierCurveTo(8.6, -3.2, 9.4, -1, 9.2, 0.6); ctx.bezierCurveTo(9.1, 2.6, 8, 3.6, 5.6, 3.3); ctx.closePath();
      ctx.fillStyle = linear(ctx, 5, 0, 9.4, 0, [[0, shade(skin, -0.05)], [0.6, shade(skin, 0.08)], [1, shade(skin, -0.2)]]); ctx.fill(); ctx.strokeStyle = rgba(dk, 0.55); ctx.lineWidth = 0.4; ctx.stroke();
      ctx.strokeStyle = rgba(dk, 0.45); ctx.lineWidth = 0.35; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(6.2, -1.5 + k * 1.6); ctx.lineTo(9, -1.3 + k * 1.6); ctx.stroke(); }
      ctx.fillStyle = rgba(shade(skin, 0.25), 0.5); for (let k = 0; k < 4; k++) { ellipse(ctx, 6.4, -2.3 + k * 1.55, 0.7, 0.5); ctx.fill(); }
    }
    // thumb: two segments from the base of the palm
    if (g !== 'hidden') { const open = g === 'open' || g === 'wave'; plimb(ctx, 1.4, -2, open ? 4.2 : 4.6, open ? -5.2 : -3.8, [[0, 1.5], [1, 1.1]], shade(skin, 0.03), 1, { line: rgba(dk, 0.55) }); plimb(ctx, open ? 4.2 : 4.6, open ? -5.2 : -3.8, open ? 6.6 : 7.4, open ? -6.4 : -3.6, [[0, 1.1], [1, 0.85]], shade(skin, 0.06), 1, { line: rgba(dk, 0.55) }); }
    ctx.restore();
  }
  function arm(ctx, P, side, hx, hy, opt = {}) {
    const s = P.shape, sx = side * (s.sw - 4.2), sy = 7.2, kid = P.age === 'kid';
    const l1 = kid ? 16 : 21.5, l2 = kid ? 15 : 20;
    // natural elbow: of the two IK solutions pick the one that hangs lower and sits outward (gravity), never across the chest
    let sol;
    if (opt.bend !== undefined) sol = ik(sx, sy, hx, hy, l1, l2, opt.bend);
    else { const a = ik(sx, sy, hx, hy, l1, l2, 1), b = ik(sx, sy, hx, hy, l1, l2, -1), sc = (e) => e[1] + 0.6 * side * (e[0] - sx); sol = sc(a) >= sc(b) ? a : b; }
    const [ex, ey, wx, wy] = sol;
    const sleeveCol = P.sleeve || P.top.col, skin = sk(P.skin);
    const long = P.sleeves !== 'short' && P.sleeves !== 'none';
    const k = (kid ? 0.78 : P.female ? 0.84 : 1) * (P.build || 1) ** 0.5, lt = side * -P.light || 1;
    // bare / short-sleeved arms are one seamless skin chain (deltoid->bicep->elbow->forearm->wrist); long sleeves are a cloth chain
    ctx.fillStyle = 'rgba(0,0,0,0.12)'; ellipse(ctx, sx + side * 1.5, sy + 9, 3.5, 7); ctx.fill(); // occlusion where the arm meets the torso
    if (!long) {
      chain(ctx, [[sx, sy], [ex, ey], [wx, wy]], [swapSide(PROF.upper(k), side), swapSide(PROF.fore(k), side)], skin, lt);
      if (P.sleeves === 'short') { const mx = lerp(sx, ex, 0.55), my = lerp(sy, ey, 0.55); plimb(ctx, sx, sy, mx, my, [[0, 6.4 * k], [1, 6.0 * k]], sleeveCol, lt); const a = Math.atan2(ey - sy, ex - sx) + Math.PI / 2; ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(mx + Math.cos(a) * 6 * k, my + Math.sin(a) * 6 * k); ctx.lineTo(mx - Math.cos(a) * 6 * k, my - Math.sin(a) * 6 * k); ctx.stroke(); ctx.strokeStyle = rgba(shade(sleeveCol, -0.5), 0.35); ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(lerp(sx, mx, 0.4) + Math.cos(a) * 3, lerp(sy, my, 0.4) + Math.sin(a) * 3); ctx.quadraticCurveTo(lerp(sx, mx, 0.7), lerp(sy, my, 0.7), lerp(sx, mx, 0.9) - Math.cos(a) * 2, lerp(sy, my, 0.9) - Math.sin(a) * 2); ctx.stroke(); }
    } else {
      const cuffT = 0.86, cx2 = lerp(ex, wx, cuffT), cy2 = lerp(ey, wy, cuffT);
      plimb(ctx, cx2, cy2, wx, wy, [[0, 2.5 * k], [1, 2.3 * k]], skin, 1);
      chain(ctx, [[sx, sy], [ex, ey], [cx2, cy2]], [swapSide(PROF.sleeveU(k), side), PROF.sleeveF(k)], sleeveCol, lt, { endCap: 0.25 });
      const dx = cx2 - ex, dy = cy2 - ey, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, ux = dx / l, uy = dy / l;
      ctx.strokeStyle = rgba(shade(sleeveCol, -0.55), 0.45); ctx.lineWidth = 0.6;
      for (let q = 0; q < 2; q++) { const px = lerp(ex, cx2, 0.06 + q * 0.14), py = lerp(ey, cy2, 0.06 + q * 0.14), sd = side > 0 ? -1 : 1; ctx.beginPath(); ctx.moveTo(px + nx * 3.8 * k * sd, py + ny * 3.8 * k * sd); ctx.quadraticCurveTo(px + ux * 1.6, py + uy * 1.6, px - nx * 1.2 * k * sd, py - ny * 1.2 * k * sd); ctx.stroke(); }
      ctx.strokeStyle = rgba(shade(sleeveCol, -0.5), 0.5); ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(cx2 + nx * 4 * k, cy2 + ny * 4 * k); ctx.lineTo(cx2 - nx * 4 * k, cy2 - ny * 4 * k); ctx.stroke();
      if (P.cuff) { ctx.strokeStyle = P.cuff; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(cx2 + nx * 4 * k, cy2 + ny * 4 * k); ctx.lineTo(cx2 - nx * 4 * k, cy2 - ny * 4 * k); ctx.stroke(); }
    }
    if (P.watch && side === -1) { const a = Math.atan2(wy - ey, wx - ex); ctx.save(); ctx.translate(lerp(ex, wx, 0.88), lerp(ey, wy, 0.88)); ctx.rotate(a); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-0.9, -2.8 * k, 1.8, 5.6 * k); ctx.fillStyle = '#e8d8a0'; ellipse(ctx, 0, -2.4 * k, 1.3, 1.3); ctx.fill(); ctx.restore(); }
    const ang = opt.handAng ?? Math.atan2(wy - ey, wx - ex);
    if (opt.behind) opt.behind(ctx, wx, wy, ang);
    hand(ctx, P, wx, wy, ang, opt.grip || 'fist');
    if (opt.item) opt.item(ctx, wx + Math.cos(ang) * 4, wy + Math.sin(ang) * 4, ang);
    return [wx, wy, ang];
  }
  function leg(ctx, P, side, kx, ky, fx, fy, hipY) {
    const hx = side * 6.6, pc = P.pants || '#2a2a34', shoe = P.shoe || '#1a120c', bare = P.bareLegs, skin = sk(P.skin);
    const k = (P.age === 'kid' ? 0.75 : P.female ? 0.88 : 1) * (P.build || 1) ** 0.5;
    if (bare) {
      chain(ctx, [[hx, hipY], [kx, ky], [fx, fy - 4]], [swapSide(PROF.thigh(k), side), swapSide(PROF.shin(k), side)], skin, side);
      ctx.fillStyle = rgba(shade(skin, 0.3), 0.35); ellipse(ctx, kx - side * 0.8, ky - 1, 2.4 * k, 1.8 * k); ctx.fill(); // kneecap light
    } else {
      chain(ctx, [[hx, hipY], [kx, ky], [fx, fy - 4]], [swapSide(PROF.trouserT(k), side), PROF.trouserS(k)], pc, side, { endCap: 0.3 });
      ctx.strokeStyle = rgba(shade(pc, 0.35), 0.3); ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(lerp(hx, kx, 0.2), lerp(hipY, ky, 0.2)); ctx.lineTo(kx, ky); ctx.lineTo(fx, fy - 5); ctx.stroke(); // pressed crease
      ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(kx - 3.2 * k, ky - 1); ctx.quadraticCurveTo(kx, ky + 1.5, kx + 3.2 * k, ky - 1.5); ctx.stroke(); // knee drape
      ctx.beginPath(); ctx.moveTo(fx - 4.2 * k, fy - 8); ctx.quadraticCurveTo(fx, fy - 6.6, fx + 4.2 * k, fy - 8.4); ctx.stroke(); // break above the shoe
    }
    if (P.socks && bare) plimb(ctx, lerp(kx, fx, 0.68), lerp(ky, fy, 0.68), fx, fy - 2, [[0, 3.3 * k], [1, 2.8 * k]], P.socks, side);
    // shoe: sole, heel, toe box, vamp highlight; heels for bare-legged dress looks
    const dir = P.facing || 1, heel = bare && P.female;
    ctx.save(); ctx.translate(fx, fy); ctx.scale(dir, 1);
    if (heel) {
      ctx.beginPath(); ctx.moveTo(-3.4, -4.6); ctx.quadraticCurveTo(1, -3.4, 5.6, -0.9); ctx.quadraticCurveTo(7.4, 0.2, 6, 1); ctx.lineTo(-1.5, 0.4); ctx.lineTo(-2.6, 1.2); ctx.lineTo(-3.6, 1.2); ctx.closePath();
      ctx.fillStyle = linear(ctx, 0, -5, 0, 1, [[0, shade(shoe, 0.25)], [1, shade(shoe, -0.25)]]); ctx.fill(); ctx.fillStyle = shade(shoe, -0.35); ctx.fillRect(-3.6, -1.6, 1.4, 2.8);
    } else {
      ctx.beginPath(); ctx.moveTo(-4.4, -4.4); ctx.bezierCurveTo(-1, -5.2, 2.6, -4.6, 5.4, -2.6); ctx.bezierCurveTo(7.6, -1.6, 8, 0, 7, 0.6); ctx.lineTo(-4.8, 0.6); ctx.quadraticCurveTo(-5.4, -2, -4.4, -4.4); ctx.closePath();
      ctx.fillStyle = linear(ctx, 0, -5, 0, 1, [[0, shade(shoe, 0.28)], [0.6, shoe], [1, shade(shoe, -0.3)]]); ctx.fill();
      ctx.fillStyle = P.sole || shade(shoe, -0.45); ctx.fillRect(-4.8, -0.2, 12, 1.4);
      ctx.fillStyle = 'rgba(255,255,255,0.28)'; ellipse(ctx, 3.2, -3.3, 2.2, 0.7, 0.3); ctx.fill();
    }
    ctx.restore();
    if (P.spats) { ctx.fillStyle = P.spats; ctx.fillRect(fx - 3.6, fy - 4.5, 6, 2.5); }
  }

  /* ---------------- factory ---------------- */
  let seedCounter = 1;
  function make(spec, sc, D) {
    const P = Object.assign({ skin: 'light', hair: 'dbrown', hairStyle: 'short', age: 'adult', light: 1, rimCol: '#ffcc88', acc: {}, top: { type: 'tee', col: '#5a7aa0' }, seed: seedCounter++ }, spec);
    P.acc = Object.assign({}, P.acc);
    const bw = P.build || 1, fem = !!P.female;
    P.shape = P.age === 'kid' ? { sw: 12 * bw, ww: 10 * bw, hw: 11 * bw, bot: 56 } : { sw: (fem ? 15.8 : 19.2) * bw, ww: (fem ? 11.2 : 14.8) * bw, hw: (fem ? 15.2 : 14.8) * bw, bot: 62 };
    P.head = P.age === 'kid' ? { rx: 9.2, ry: 10.6, jaw: 0.86, chin: 0.36 } : fem ? { rx: 8.2, ry: 10.6, jaw: 0.78, chin: 0.26 } : { rx: 8.8, ry: 11.1, jaw: 0.88, chin: 0.36 };
    P.capDir = P.capDir || 1;
    if (P.scale === undefined) P.scale = P.age === 'kid' ? 0.8 : 1;
    const k = sc, pad = 40;
    // body sprite
    const bwPx = 84, bTop = -14, bBot = Math.max(98, P.top.skirt ? P.top.skirt.len + 8 : 0);
    {
      const [c, x] = hiCanvas(bwPx * k, (bBot - bTop) * k, D);
      x.scale(k, k); x.translate(bwPx / 2, -bTop);
      drawBody(x, P);
      rim(x, P.shape.sw * 2.2, 0, 0, 0, -P.light, P.rimCol, 0.22);
      P.bodyC = c; P.bodyOx = bwPx / 2; P.bodyOy = -bTop;
    }
    {
      const hw = 64, hTop = -46, hBot = 34;
      const [c, x] = hiCanvas(hw * k, (hBot - hTop) * k, D);
      x.scale(k, k); x.translate(hw / 2, -hTop);
      drawHead(x, P);
      P.headC = c; P.headOx = hw / 2; P.headOy = -hTop;
    }
    P.sc = sc;
    return P;
  }
  // pose: {lean, bob, head:{turn,tilt,nod}, face:{...}, arms:[{side,x,y,grip,item,bend,behind}], legs:{...}|null, scale}
  function draw(ctx, P, x, y, pose = {}) {
    const k = P.sc * P.scale * (pose.scale || 1);
    ctx.save();
    ctx.translate(x, y); ctx.scale(k * (pose.flip ? -1 : 1), k);
    if (pose.lean) ctx.rotate(pose.lean);
    const br = pose.breath || 0;
    if (pose.only === 'arms') { (pose.arms || []).forEach((a) => arm(ctx, P, a.side, a.x, a.y, a)); ctx.restore(); return; }
    if (pose.legs) {
      const L = pose.legs; const hipY = P.shape.bot - 6;
      leg(ctx, P, -1, L.k1[0], L.k1[1], L.f1[0], L.f1[1], hipY);
      leg(ctx, P, 1, L.k2[0], L.k2[1], L.f2[0], L.f2[1], hipY);
    }
    if (pose.under) pose.under(ctx);
    const backArms = (pose.arms || []).filter((a) => a.back);
    backArms.forEach((a) => arm(ctx, P, a.side, a.x, a.y, a));
    ctx.save(); ctx.translate(0, -br * 0.4); ctx.scale(1 + br * 0.006, 1 + br * 0.012);
    ctx.drawImage(P.bodyC, -P.bodyOx, -P.bodyOy, P.bodyC.cssW / P.sc, P.bodyC.cssH / P.sc);
    ctx.restore();
    if (pose.mid) pose.mid(ctx);
    // head
    const h = pose.head || {};
    ctx.save(); ctx.translate((h.turn || 0) * 0.8, -16.2 - br * 0.6 + (h.nod || 0) * 0.6); ctx.rotate(h.tilt || 0); const HS = P.age === 'kid' ? 0.95 : 0.87; ctx.scale(HS, HS);
    ctx.drawImage(P.headC, -P.headOx, -P.headOy, P.headC.cssW / P.sc, P.headC.cssH / P.sc);
    drawFace(ctx, P, Object.assign({ turn: h.turn || 0, nod: h.nod || 0 }, pose.face || {}));
    if (pose.onHead) pose.onHead(ctx);
    ctx.restore();
    const out = {};
    if (!pose.noArms) (pose.arms || []).filter((a) => !a.back).forEach((a) => { out[a.side] = arm(ctx, P, a.side, a.x, a.y, a); });
    if (pose.over) pose.over(ctx);
    ctx.restore();
    return out;
  }
  // helpers for natural idle motion
  function blinkAt(t, seed) { const per = 3.2 + (seed % 5) * 0.6, ph = (t + seed * 1.37) % per; return ph < 0.14 ? Math.sin(ph / 0.14 * Math.PI) : 0; }
  function walkLegs(phase, stride = 1, lift = 1) {
    const s1 = Math.sin(phase), s2 = Math.sin(phase + Math.PI), hipY = 56;
    const f1 = [s1 * 11 * stride, 122 - Math.max(0, Math.cos(phase)) * 4 * lift], f2 = [s2 * 11 * stride, 122 - Math.max(0, Math.cos(phase + Math.PI)) * 4 * lift];
    return { k1: [f1[0] * 0.5 + 3, 90 - (f1[1] < 121 ? 2 : 0)], f1, k2: [f2[0] * 0.5 + 3, 90 - (f2[1] < 121 ? 2 : 0)], f2, hipY };
  }
  const STAND = { k1: [-7.2, 89.5], f1: [-9, 122], k2: [5.2, 89], f2: [5.4, 122] };   // weight on one leg (contrapposto)
  const STAND2 = { k1: [-5.2, 89], f1: [-5.4, 122], k2: [7.2, 89.5], f2: [9, 122] };
  return { make, draw, blinkAt, walkLegs, STAND, STAND2, SKIN, HAIR, hand, limb, plimb, chain };
})();
