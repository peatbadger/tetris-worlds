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
  function torsoPath(x, s) {
    const sw = s.sw, ww = s.ww, hw = s.hw, bot = s.bot;
    x.beginPath();
    x.moveTo(-5, -2);
    x.bezierCurveTo(-10, 0, -sw + 3, 1, -sw, 6);
    x.bezierCurveTo(-sw - 2, 12, -sw + 1, 20, -sw + 2.5, 26);
    x.bezierCurveTo(-ww - 1, 34, -ww, 42, -ww, 46);
    x.bezierCurveTo(-hw, 52, -hw, 56, -hw, bot);
    x.lineTo(hw, bot);
    x.bezierCurveTo(hw, 56, hw, 52, ww, 46);
    x.bezierCurveTo(ww, 42, ww + 1, 34, sw - 2.5, 26);
    x.bezierCurveTo(sw - 1, 20, sw + 2, 12, sw, 6);
    x.bezierCurveTo(sw - 3, 1, 10, 0, 5, -2);
    x.closePath();
  }
  function fold(x, x0, y0, x1, y1, bend, col, w) { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2 + bend, (y0 + y1) / 2, x1, y1); x.stroke(); }
  function buttons(x, bx, y0, n, gap, col) { for (let i = 0; i < n; i++) { ellipse(x, bx, y0 + i * gap, 0.9, 0.9); x.fillStyle = col; x.fill(); x.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(x, bx - 0.3, y0 + i * gap - 0.3, 0.35, 0.35); x.fill(); } }
  function drawBody(x, P) {
    const s = P.shape, top = P.top, c = top.col, c2 = top.col2 || shade(c, -0.3), L = P.light;
    const skin = sk(P.skin);
    // neck
    x.fillStyle = linear(x, -4, 0, 4, 0, [[0, shade(skin, -0.25)], [0.6, skin], [1, shade(skin, -0.1)]]);
    x.fillRect(-3.8, -9, 7.6, 12);
    x.fillStyle = 'rgba(60,25,10,0.28)'; ellipse(x, 0, -6, 4, 2.2); x.fill();
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
    torsoPath(x, s);
    x.fillStyle = linear(x, -s.sw, 0, s.sw, 0, [[0, shade(c, -0.35)], [0.42, c], [0.7, shade(c, 0.08)], [1, shade(c, -0.22)]]); x.fill();
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
    // overall shading: bottom darker, chest highlight
    x.fillStyle = linear(x, 0, 30, 0, 64, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.25)']]); x.fillRect(-40, 30, 80, 40);
    x.fillStyle = hl; ellipse(x, -L * 6, 14, 8, 10); x.fill();
    x.restore();
    torsoPath(x, s); x.strokeStyle = 'rgba(20,10,5,0.35)'; x.lineWidth = 0.7; x.stroke();
  }

  /* ---------------- head ---------------- */
  function headShape(x, r) { // egg-shaped face: wider cranium, narrower jaw
    x.beginPath();
    x.moveTo(0, -r.ry);
    x.bezierCurveTo(r.rx * 0.95, -r.ry, r.rx * 1.05, -r.ry * 0.25, r.rx * 0.98, r.ry * 0.12);
    x.bezierCurveTo(r.rx * 0.92, r.ry * 0.6, r.rx * 0.45, r.ry * 0.98, 0, r.ry);
    x.bezierCurveTo(-r.rx * 0.45, r.ry * 0.98, -r.rx * 0.92, r.ry * 0.6, -r.rx * 0.98, r.ry * 0.12);
    x.bezierCurveTo(-r.rx * 1.05, -r.ry * 0.25, -r.rx * 0.95, -r.ry, 0, -r.ry);
    x.closePath();
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
    if (st === 'long' || st === 'wavyLong') { x.beginPath(); x.moveTo(-r.rx - 1, -2); x.bezierCurveTo(-r.rx - 4, 14, -r.rx - 3, 26, -r.rx + 1, 30); x.lineTo(r.rx - 1, 30); x.bezierCurveTo(r.rx + 3, 26, r.rx + 4, 14, r.rx + 1, -2); x.closePath(); x.fill(); }
    if (st === 'bob' || st === 'finger') { x.beginPath(); x.moveTo(-r.rx - 2, -4); x.bezierCurveTo(-r.rx - 3, 6, -r.rx - 2, 10, -r.rx + 2, 11); x.lineTo(r.rx - 2, 11); x.bezierCurveTo(r.rx + 2, 10, r.rx + 3, 6, r.rx + 2, -4); x.closePath(); x.fill(); }
    if (st === 'pony') { x.beginPath(); x.moveTo(r.rx * 0.4, -r.ry * 0.6); x.bezierCurveTo(r.rx + 9, -r.ry * 0.4, r.rx + 6, 12, r.rx + 2, 20); x.bezierCurveTo(r.rx - 1, 10, r.rx, 0, r.rx * 0.2, -r.ry * 0.3); x.fill(); }
    if (st === 'twin') [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * r.rx * 0.8, -2); x.bezierCurveTo(d * (r.rx + 7), 2, d * (r.rx + 6), 16, d * (r.rx + 2), 22); x.bezierCurveTo(d * (r.rx - 1), 12, d * r.rx, 4, d * r.rx * 0.6, 0); x.fill(); });
    if (st === 'bun') { ellipse(x, 0, -r.ry - 3, 6, 5); x.fill(); hairStrands(x, rnd, 10, -5, 5, -r.ry - 7, -r.ry + 1, rgba(shade(hair, 0.3), 0.5), 0.4, 4); }
    if (st === 'topknot') { ellipse(x, 0, -r.ry - 2, 4, 3.5); x.fill(); }
    // ears
    x.fillStyle = shade(skin, -0.08);
    [-1, 1].forEach((d) => { ellipse(x, d * r.rx * 0.97, 1, 2.3, 3.6, d * 0.1); x.fill(); x.strokeStyle = shade(skin, -0.35); x.lineWidth = 0.5; x.beginPath(); x.arc(d * r.rx * 0.97, 1, 1.3, d > 0 ? -1.2 : 1.9, d > 0 ? 1.2 : 4.3); x.stroke(); });
    if (P.acc.earrings) [-1, 1].forEach((d) => { ellipse(x, d * r.rx * 0.98, 5.2, 0.9, 0.9); x.fillStyle = P.acc.earrings; x.fill(); if (P.acc.dangle) { x.fillRect(d * r.rx * 0.98 - 0.3, 5.5, 0.6, 3); ellipse(x, d * r.rx * 0.98, 9, 1, 1.4); x.fill(); } });
    // face
    headShape(x, r);
    x.fillStyle = radial(x, -L * 3, -3, r.ry * 1.25, [[0, shade(skin, 0.12)], [0.55, skin], [1, shade(skin, -0.28)]]); x.fill();
    x.save(); headShape(x, r); x.clip();
    x.fillStyle = 'rgba(80,30,10,0.12)'; ellipse(x, L * r.rx * 0.9, 2, r.rx * 0.5, r.ry); x.fill(); // side shade
    x.fillStyle = 'rgba(255,255,255,0.10)'; ellipse(x, -L * 2, -6, 4, 3); x.fill(); // forehead sheen
    if (P.blush !== false) { x.fillStyle = rgba('#e8706a', P.age === 'kid' ? 0.3 : 0.16); [-1, 1].forEach((d) => { ellipse(x, d * 5.4, 4.4, 2.6, 1.6); x.fill(); }); }
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
      case 'bald': x.beginPath(); x.ellipse(0, -1, r.rx + 0.6, r.ry * 0.55, 0, Math.PI * 0.85, Math.PI * 1.15, true); x.fill(); [-1, 1].forEach((d) => { x.beginPath(); x.moveTo(d * (r.rx + 0.8), -6); x.quadraticCurveTo(d * (r.rx + 2), 0, d * (r.rx - 0.5), 4); x.lineTo(d * (r.rx - 2), -4); x.closePath(); x.fill(); }); x.fillStyle = 'rgba(255,255,255,0.25)'; ellipse(x, -L * 3, -r.ry * 0.7, 3.5, 1.6, -0.3); x.fill(); break;
      case 'buzz': cap(() => { x.lineTo(r.rx - 1, -4); x.quadraticCurveTo(0, -r.ry * 0.95, -r.rx + 1, -4); }); x.fill(); x.fillStyle = rgba(hair, 0.3); x.fill(); break;
      case 'slick': cap(() => { x.lineTo(r.rx - 0.5, -3); x.bezierCurveTo(r.rx * 0.6, -r.ry * 0.7, -r.rx * 0.2, -r.ry * 0.85, -r.rx + 0.5, -3); }); x.fill(); hairStrands(x, rnd, 18, -r.rx, r.rx, -r.ry - 2, -4, 'rgba(255,255,255,0.18)', 0.35, 10); x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(-3, -r.ry - 2); x.quadraticCurveTo(-4, -r.ry + 2, -5, -r.ry + 4); x.stroke(); break;
      case 'side': case 'short': cap(() => { x.lineTo(r.rx - 0.8, -2); x.bezierCurveTo(r.rx * 0.7, -r.ry * 0.55, r.rx * 0.2, -r.ry * 0.62, -r.rx * 0.2, -r.ry * 0.5); x.bezierCurveTo(-r.rx * 0.6, -r.ry * 0.35, -r.rx * 0.8, -r.ry * 0.3, -r.rx + 0.5, -1); }); x.fill(); hairStrands(x, rnd, 16, -r.rx, r.rx, -r.ry - 2, -r.ry * 0.4, 'rgba(255,255,255,0.14)', 0.4, 6); break;
      case 'curly': for (let i = 0; i < 26; i++) { const a = Math.PI + (i / 25) * Math.PI, rr = r.rx + 1.5 + rnd() * 1.5; ellipse(x, Math.cos(a) * rr * 1.05, Math.sin(a) * (r.ry + 2) + 2 - (i % 2) * 1.2, 3.2, 3); x.fill(); } ellipse(x, 0, -r.ry * 0.55, r.rx + 0.5, r.ry * 0.45); x.fill(); x.fillStyle = 'rgba(255,255,255,0.12)'; for (let i = 0; i < 14; i++) { x.beginPath(); x.arc(-r.rx + rnd() * r.rx * 2, -r.ry + rnd() * 6, 1.4, 3.6, 5.6); x.fill(); } break;
      case 'perm': for (let i = 0; i < 30; i++) { const a = Math.PI * 0.92 + (i / 29) * Math.PI * 1.16, rr = r.rx + 2 + rnd(); ellipse(x, Math.cos(a) * rr, Math.sin(a) * (r.ry + 1.5) - 0.5, 2.6, 2.4); x.fill(); } ellipse(x, 0, -r.ry * 0.5, r.rx + 1, r.ry * 0.5); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 0.5; for (let i = 0; i < 16; i++) { x.beginPath(); x.arc(-r.rx + rnd() * r.rx * 2, -r.ry - 1 + rnd() * 7, 1.3, 3.4, 5.8); x.stroke(); } break;
      case 'bob': case 'finger': cap(() => { x.lineTo(r.rx + 0.5, 6); x.lineTo(r.rx - 1.5, -3); x.bezierCurveTo(r.rx * 0.5, -r.ry * 0.5, -r.rx * 0.3, -r.ry * 0.6, -r.rx * 0.8, -5); x.lineTo(-r.rx - 0.5, 6); }); x.fill();
        if (st === 'finger') { x.strokeStyle = 'rgba(255,255,255,0.22)'; x.lineWidth = 0.7; for (let k = 0; k < 4; k++) { x.beginPath(); for (let xx = -r.rx; xx <= r.rx; xx += 1) { const yy = -r.ry + 1 + k * 3 + Math.sin(xx * 0.8) * 1.1; xx === -r.rx ? x.moveTo(xx, yy) : x.lineTo(xx, yy); } x.stroke(); } x.fillStyle = hg(-3, 8); ellipse(x, -r.rx + 1, 0, 3, 5, 0.3); x.fill(); }
        else hairStrands(x, rnd, 20, -r.rx, r.rx, -r.ry - 1, 6, 'rgba(255,255,255,0.12)', 0.4, 4);
        x.fillStyle = hg(-3, 8); x.beginPath(); x.moveTo(-r.rx * 0.95, -6); x.quadraticCurveTo(-r.rx * 0.2, -r.ry * 0.85, r.rx * 0.6, -5); x.quadraticCurveTo(0, -r.ry * 0.5, -r.rx * 0.95, -2); x.fill(); break;
      case 'long': case 'wavyLong': case 'pony': case 'twin': case 'bun': case 'topknot':
        cap(() => { x.lineTo(r.rx - 0.2, 4); x.lineTo(r.rx - 1.5, -3); x.bezierCurveTo(r.rx * 0.6, -r.ry * 0.45, r.rx * 0.1, -r.ry * 0.55, -r.rx * 0.1, -r.ry * 0.7); x.bezierCurveTo(-r.rx * 0.4, -r.ry * 0.4, -r.rx * 0.8, -r.ry * 0.3, -r.rx + 0.8, -2); x.lineTo(-r.rx - 0.2, 4); }); x.fill();
        hairStrands(x, rnd, 22, -r.rx, r.rx, -r.ry - 1.5, -2, 'rgba(255,255,255,0.13)', 0.4, 5);
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
    const r = P.head, tx = f.turn * 2.6, ty = f.nod || 0;
    const ex = 3.8, ey = -0.8 + ty, eyeCol = P.eyes || '#3a2414', skin = sk(P.skin);
    const blink = f.blink || 0, happy = f.eyes === 'happy', closed = f.eyes === 'closed' || blink > 0.85, wide = f.eyes === 'wide';
    // eyes
    for (const d of [-1, 1]) {
      const cx = d * ex + tx * (d === Math.sign(f.turn || 1) ? 1.1 : 0.85), cy = ey;
      if (happy) { ctx.strokeStyle = '#241208'; ctx.lineWidth = 0.75; ctx.beginPath(); ctx.arc(cx, cy + 0.8, 1.7, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); continue; }
      if (closed) { ctx.strokeStyle = '#241208'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.arc(cx, cy - 0.6, 1.8, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke(); continue; }
      const oh = (P.age === 'old' ? 1.0 : 1.45) * (1 - blink) * (wide ? 1.3 : 1);
      ellipse(ctx, cx, cy, 2.05, oh); ctx.fillStyle = '#fbf7f0'; ctx.fill();
      ctx.save(); ellipse(ctx, cx, cy, 2.05, oh); ctx.clip();
      const lx = cx + (f.lookX || 0) * 0.8 + tx * 0.15, ly = cy + (f.lookY || 0) * 0.5;
      ellipse(ctx, lx, ly, 1.25, 1.25); ctx.fillStyle = eyeCol; ctx.fill();
      ellipse(ctx, lx, ly, 0.6, 0.6); ctx.fillStyle = '#080404'; ctx.fill();
      ellipse(ctx, lx - 0.45, ly - 0.45, 0.35, 0.35); ctx.fillStyle = '#ffffff'; ctx.fill();
      ctx.fillStyle = 'rgba(80,40,20,0.25)'; ctx.fillRect(cx - 3, cy - oh, 6, 0.6);
      ctx.restore();
      // upper lid + lashes
      ctx.strokeStyle = '#1e0e06'; ctx.lineWidth = P.lashes ? 0.85 : 0.6; ctx.beginPath(); ctx.ellipse(cx, cy, 2.15, oh + 0.05, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      if (P.lashes) { ctx.beginPath(); ctx.moveTo(cx + d * 2, cy - oh * 0.5); ctx.lineTo(cx + d * 2.9, cy - oh * 0.9); ctx.stroke(); }
      ctx.strokeStyle = rgba(shade(skin, -0.4), 0.6); ctx.lineWidth = 0.35; ctx.beginPath(); ctx.ellipse(cx, cy - 0.5, 2.2, oh + 0.6, 0, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
      if (P.age === 'old') { ctx.strokeStyle = 'rgba(90,50,30,0.35)'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.arc(cx, cy + 1.2, 1.6, 0.3, Math.PI - 0.3); ctx.stroke(); }
    }
    // brows
    const br = f.brow || 0, bc = P.browCol || shade(hc(P.hair), -0.1);
    ctx.strokeStyle = bc; ctx.lineWidth = P.age === 'old' ? 1.1 : 0.9; ctx.lineCap = 'round';
    for (const d of [-1, 1]) { const cx = d * ex + tx, by = ey - 3.2 - br * 1.2 - (P.age === 'kid' ? 0.3 : 0), tilt = (f.browTilt || 0) * d; ctx.beginPath(); ctx.moveTo(cx - d * 1.9, by + 0.5 + tilt); ctx.quadraticCurveTo(cx, by - 0.6, cx + d * 2.1, by + 0.2 - tilt * 0.4); ctx.stroke(); }
    // nose
    ctx.strokeStyle = rgba(shade(skin, -0.45), 0.8); ctx.lineWidth = 0.55;
    ctx.beginPath(); ctx.moveTo(tx * 1.2 - 0.3 * P.light, 0.5 + ty); ctx.quadraticCurveTo(tx * 1.35 + 1.1, 3.4 + ty, tx * 1.2 - 0.6, 3.9 + ty); ctx.stroke();
    ctx.fillStyle = rgba(shade(skin, -0.4), 0.5); ellipse(ctx, tx * 1.2 - 1, 3.9 + ty, 0.5, 0.35); ctx.fill(); ellipse(ctx, tx * 1.2 + 0.9, 3.9 + ty, 0.5, 0.35); ctx.fill();
    // mustache
    if (P.acc.mustache) { ctx.fillStyle = shade(hc(P.hair), -0.05); ctx.beginPath(); ctx.moveTo(tx - 4, 6.3 + ty); ctx.quadraticCurveTo(tx - 2, 4.4 + ty, tx, 5.1 + ty); ctx.quadraticCurveTo(tx + 2, 4.4 + ty, tx + 4, 6.3 + ty); ctx.quadraticCurveTo(tx + 2, 5.6 + ty, tx, 5.9 + ty); ctx.quadraticCurveTo(tx - 2, 5.6 + ty, tx - 4, 6.3 + ty); ctx.fill(); }
    // mouth
    const mx = tx * 1.05, my = 6.6 + ty + (P.acc.mustache ? 0.4 : 0), lip = P.lips || shade(skin, -0.3);
    const m = f.mouth || 'smile', o = clamp(f.open ?? 0, 0, 1);
    ctx.lineCap = 'round';
    if (m === 'open' || m === 'talk' || m === 'chew' || m === 'o' || m === 'grin' || m === 'lick' || m === 'laugh') {
      const w = m === 'o' ? 1.3 : m === 'grin' || m === 'laugh' ? 2.8 : 2.1, h = m === 'grin' ? 1.3 + o : 0.4 + o * 1.8;
      ctx.beginPath();
      if (m === 'grin' || m === 'laugh') { ctx.moveTo(mx - w, my - 0.4); ctx.quadraticCurveTo(mx, my + 0.2, mx + w, my - 0.4); ctx.quadraticCurveTo(mx, my + h * 1.6, mx - w, my - 0.4); }
      else ctx.ellipse(mx, my + h * 0.3, w, h, 0, 0, TAU);
      ctx.fillStyle = '#4a1414'; ctx.fill();
      ctx.save(); ctx.clip();
      if (m === 'grin' || m === 'laugh') { ctx.fillStyle = '#fbf6ee'; ctx.fillRect(mx - w, my - 0.8, w * 2, 0.9); }
      ellipse(ctx, mx, my + h * 0.9, w * 0.7, h * 0.55); ctx.fillStyle = '#c45a5a'; ctx.fill();
      ctx.restore();
      ctx.strokeStyle = rgba(lip, 0.9); ctx.lineWidth = 0.45; ctx.stroke();
      if (m === 'lick') { ctx.beginPath(); ctx.ellipse(mx + 0.3, my + h * 0.6 + 1.2, 1.3, 1.6 + o, 0, 0, TAU); ctx.fillStyle = '#e07a80'; ctx.fill(); ctx.strokeStyle = '#a04050'; ctx.lineWidth = 0.3; ctx.stroke(); }
    } else {
      const curve = m === 'smile' ? 1.3 : m === 'big' ? 2 : m === 'frown' ? -0.9 : m === 'smirk' ? 0.6 : 0.15;
      const w = m === 'big' ? 2.8 : 2.2;
      ctx.strokeStyle = '#5a2418'; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(mx - w, my - curve * 0.3 + (m === 'smirk' ? 0.4 : 0)); ctx.quadraticCurveTo(mx, my + curve, mx + w, my - curve * 0.45 - (m === 'smirk' ? 0.4 : 0)); ctx.stroke();
      if (P.lips) { ctx.strokeStyle = rgba(P.lips, 0.85); ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(mx - w * 0.7, my + curve * 0.55 + 0.4); ctx.quadraticCurveTo(mx, my + curve * 0.9 + 1.2, mx + w * 0.7, my + curve * 0.5 + 0.4); ctx.stroke(); }
      else { ctx.strokeStyle = rgba(shade(skin, -0.25), 0.6); ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(mx - 1, my + curve * 0.7 + 1.3); ctx.lineTo(mx + 1, my + curve * 0.7 + 1.3); ctx.stroke(); }
    }
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
  function limb(ctx, x0, y0, x1, y1, w0, w1, col, light) {
    const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
    ctx.beginPath(); ctx.moveTo(x0 + nx * w0, y0 + ny * w0); ctx.lineTo(x1 + nx * w1, y1 + ny * w1); ctx.arc(x1, y1, w1, Math.atan2(ny, nx), Math.atan2(-ny, -nx), true); ctx.lineTo(x0 - nx * w0, y0 - ny * w0); ctx.arc(x0, y0, w0, Math.atan2(-ny, -nx), Math.atan2(ny, nx), true); ctx.closePath();
    // cylindrical shading: gradient across the limb (lit edge -> body -> shadow edge)
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, w = (w0 + w1) / 2, sg = light >= 0 ? 1 : -1;
    const g = ctx.createLinearGradient(mx - nx * w * sg, my - ny * w * sg, mx + nx * w * sg, my + ny * w * sg);
    g.addColorStop(0, shade(col, 0.16)); g.addColorStop(0.35, col); g.addColorStop(0.8, shade(col, -0.22)); g.addColorStop(1, shade(col, -0.38));
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(25,12,6,0.45)'; ctx.lineWidth = 0.45; ctx.stroke();
  }
  function hand(ctx, P, x, y, ang, g) {
    const skin = sk(P.skin), s = P.age === 'kid' ? 0.8 : 1;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
    // palm
    ellipse(ctx, 2.6, 0, 3.6, 3); ctx.fillStyle = skin; ctx.fill();
    ctx.strokeStyle = rgba(shade(skin, -0.45), 0.7); ctx.lineWidth = 0.4; ctx.stroke();
    if (g === 'point') { limb(ctx, 5, -0.8, 9.6, -1.4, 0.95, 0.8, skin, 1); ellipse(ctx, 5.5, 1.2, 1.6, 1.3); ctx.fillStyle = shade(skin, -0.06); ctx.fill(); }
    else if (g === 'open' || g === 'wave') { for (let k = 0; k < 4; k++) { const a = -0.45 + k * 0.3; limb(ctx, 5, (k - 1.5) * 1.3, 5 + Math.cos(a) * 4.2, (k - 1.5) * 1.3 + Math.sin(a) * 4.2, 0.75, 0.62, skin, 1); } }
    else if (g === 'tap') { limb(ctx, 5, -0.6, 8.2, 1.2, 0.85, 0.7, skin, 1); limb(ctx, 5, 0.8, 8, 2.6, 0.85, 0.7, skin, 1); }
    else { // fist / grip: knuckles
      ctx.strokeStyle = rgba(shade(skin, -0.4), 0.6); ctx.lineWidth = 0.35;
      for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(5.4, -1.5 + k * 1.4, 0.8, -1.4, 1.4); ctx.stroke(); }
    }
    // thumb
    if (g !== 'hidden') { limb(ctx, 2.2, -2.1, 4.8, -3.4, 1, 0.8, shade(skin, 0.04), 1); }
    ctx.fillStyle = 'rgba(255,255,255,0.12)'; ellipse(ctx, 2, -1, 1.8, 1); ctx.fill();
    ctx.restore();
  }
  function arm(ctx, P, side, hx, hy, opt = {}) {
    const s = P.shape, sx = side * (s.sw - 3.5), sy = 7;
    const l1 = P.age === 'kid' ? 15 : 19, l2 = P.age === 'kid' ? 14 : 18;
    const bend = opt.bend ?? (side > 0 ? -1 : 1);
    const [ex, ey, wx, wy] = ik(sx, sy, hx, hy, l1, l2, bend);
    const sleeveCol = P.sleeve || P.top.col, skin = sk(P.skin);
    const long = P.sleeves !== 'short' && P.sleeves !== 'none';
    const fw = P.age === 'kid' ? 2.4 : 2.9;
    const upCol = P.sleeves === 'none' ? skin : sleeveCol;
    limb(ctx, sx, sy, ex, ey, fw + 1.6, fw + 0.9, upCol, side * -P.light || 1);
    if (P.sleeves === 'short') { ctx.fillStyle = shade(sleeveCol, -0.1); const mxp = lerp(sx, ex, 0.55), myp = lerp(sy, ey, 0.55); ellipse(ctx, mxp, myp, fw + 2, fw + 1.5); ctx.fill(); }
    const cuffT = 0.86;
    const cx2 = lerp(ex, wx, cuffT), cy2 = lerp(ey, wy, cuffT);
    if (long) { limb(ctx, ex, ey, cx2, cy2, fw + 0.9, fw + 0.4, shade(sleeveCol, -0.04), 1); if (P.cuff) { ctx.strokeStyle = P.cuff; ctx.lineWidth = 1.6; ctx.beginPath(); const a = Math.atan2(wy - ey, wx - ex) + Math.PI / 2; ctx.moveTo(cx2 + Math.cos(a) * (fw + 0.4), cy2 + Math.sin(a) * (fw + 0.4)); ctx.lineTo(cx2 - Math.cos(a) * (fw + 0.4), cy2 - Math.sin(a) * (fw + 0.4)); ctx.stroke(); } limb(ctx, cx2, cy2, wx, wy, fw - 0.3, fw - 0.6, skin, 1); }
    else limb(ctx, ex, ey, wx, wy, fw, fw - 0.6, skin, 1);
    if (P.watch && side === -1) { const a = Math.atan2(wy - ey, wx - ex); ctx.save(); ctx.translate(lerp(ex, wx, 0.85), lerp(ey, wy, 0.85)); ctx.rotate(a); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-0.8, -fw, 1.6, fw * 2); ctx.fillStyle = '#e8d8a0'; ellipse(ctx, 0, -fw + 0.2, 1.2, 1.2); ctx.fill(); ctx.restore(); }
    const ang = opt.handAng ?? Math.atan2(wy - ey, wx - ex);
    if (opt.behind) opt.behind(ctx, wx, wy, ang);
    hand(ctx, P, wx, wy, ang, opt.grip || 'fist');
    if (opt.item) opt.item(ctx, wx + Math.cos(ang) * 3, wy + Math.sin(ang) * 3, ang);
    return [wx, wy, ang];
  }
  function leg(ctx, P, side, kx, ky, fx, fy, hipY) {
    const hx = side * 7, pc = P.pants || '#2a2a34', shoe = P.shoe || '#1a120c';
    const bare = P.bareLegs;
    limb(ctx, hx, hipY, kx, ky, 6, 4.8, bare ? sk(P.skin) : pc, side);
    limb(ctx, kx, ky, fx, fy - 2, 4.8, 3.6, bare ? sk(P.skin) : shade(pc, -0.06), side);
    if (P.socks) { limb(ctx, lerp(kx, fx, 0.7), lerp(ky, fy, 0.7), fx, fy - 2, 3.9, 3.6, P.socks, side); }
    // shoe
    const dir = P.facing || 1;
    ctx.beginPath(); ctx.moveTo(fx - 4 * dir, fy - 3.5); ctx.quadraticCurveTo(fx + 2 * dir, fy - 4.5, fx + 6.5 * dir, fy - 1.5); ctx.quadraticCurveTo(fx + 7.5 * dir, fy + 0.8, fx + 5 * dir, fy + 1); ctx.lineTo(fx - 4 * dir, fy + 1); ctx.closePath();
    ctx.fillStyle = shoe; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ellipse(ctx, fx + 2.5 * dir, fy - 2.8, 2, 0.7); ctx.fill();
    if (P.spats) { ctx.fillStyle = P.spats; ctx.fillRect(fx - 3.6, fy - 4.5, 6, 2.5); }
  }

  /* ---------------- factory ---------------- */
  let seedCounter = 1;
  function make(spec, sc, D) {
    const P = Object.assign({ skin: 'light', hair: 'dbrown', hairStyle: 'short', age: 'adult', light: 1, rimCol: '#ffcc88', acc: {}, top: { type: 'tee', col: '#5a7aa0' }, seed: seedCounter++ }, spec);
    P.acc = Object.assign({}, P.acc);
    const bw = P.build || 1, fem = !!P.female;
    P.shape = P.age === 'kid' ? { sw: 12 * bw, ww: 10 * bw, hw: 11 * bw, bot: 56 } : { sw: (fem ? 15 : 18) * bw, ww: (fem ? 11 : 14.5) * bw, hw: (fem ? 15.5 : 15) * bw, bot: 62 };
    P.head = P.age === 'kid' ? { rx: 9.4, ry: 10.8 } : { rx: fem ? 8.6 : 9.3, ry: fem ? 10.6 : 11.2 };
    P.capDir = P.capDir || 1;
    if (P.scale === undefined) P.scale = P.age === 'kid' ? 0.8 : 1;
    const k = sc, pad = 40;
    // body sprite
    const bwPx = 80, bTop = -12, bBot = Math.max(P.shape.bot + 6, P.top.skirt ? P.top.skirt.len + 6 : 0);
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
    ctx.save(); ctx.translate((h.turn || 0) * 0.8, -17 - br * 0.6 + (h.nod || 0) * 0.6); ctx.rotate(h.tilt || 0);
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
  const STAND = { k1: [-6, 90], f1: [-7, 122], k2: [6, 90], f2: [7, 122] };
  return { make, draw, blinkAt, walkLegs, STAND, SKIN, HAIR, hand, limb };
})();
