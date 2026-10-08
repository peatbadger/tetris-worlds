/* ---- Mike's Pastry blocks: 7 real menu items on pastel box-liner tiles ---- */
SKINSETS.pastry = (() => {
  const K = SkinKit;
  const BG = ['#f6c9d3', '#a9cdec', '#cdb8ec', '#acdfb6', '#f6e0a4', '#f8bc96', '#e2b07e'];
  function sugar(x, rnd, P, n, a = 0.9) { for (let i = 0; i < n; i++) { x.fillStyle = `rgba(255,255,255,${a * (0.4 + rnd() * 0.6)})`; const r = P * (0.006 + rnd() * 0.01); x.fillRect(P * (0.12 + rnd() * 0.76), P * (0.1 + rnd() * 0.6), r, r); } }
  function chips(x, rnd, cx, cy, rr, n, P, col = '#2a160c') { for (let i = 0; i < n; i++) { const a = rnd() * TAU, d = rnd() * rr; x.save(); x.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d); x.rotate(rnd() * 3); x.beginPath(); x.moveTo(0, -P * 0.025); x.lineTo(P * 0.022, P * 0.015); x.lineTo(-P * 0.022, P * 0.015); x.closePath(); x.fillStyle = col; x.fill(); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-P * 0.006, -P * 0.012, P * 0.008, P * 0.006); x.restore(); } }
  function blister(x, rnd, n, P, path) { x.save(); path(); x.clip(); for (let i = 0; i < n; i++) { const bx = rnd() * P, by = rnd() * P, r = P * (0.015 + rnd() * 0.03); ellipse(x, bx, by, r, r * 0.7); x.fillStyle = rnd() < 0.5 ? 'rgba(120,60,10,0.35)' : 'rgba(255,230,170,0.35)'; x.fill(); } x.restore(); }
  function base(x, t, P) {
    const rnd = mulberry32(t * 131 + 5), bg = BG[t - 1];
    K.tile(x, P, shade(bg, 0.25), shade(bg, -0.18), 0.18);
    // doily lace edge
    x.strokeStyle = 'rgba(255,255,255,0.65)'; x.lineWidth = P * 0.012;
    for (let k = 0; k < 16; k++) { const a = k / 16 * TAU; x.beginPath(); x.arc(P / 2 + Math.cos(a) * P * 0.4, P / 2 + Math.sin(a) * P * 0.4, P * 0.05, 0, TAU); x.stroke(); }
    x.fillStyle = 'rgba(255,255,255,0.28)'; ellipse(x, P / 2, P / 2, P * 0.38, P * 0.38); x.fill();
    const shadow = (fn) => { x.save(); x.translate(P * 0.02, P * 0.05); x.globalAlpha = 0.3; x.fillStyle = '#3a1a08'; fn(); x.fill(); x.restore(); };
    switch (t) {
      case 1: { // cannoli: blistered golden shell, ricotta ends with chocolate chips, pistachio dust
        const shell = () => { x.save(); x.translate(P / 2, P / 2); x.rotate(-0.6); roundRect(x, -P * 0.38, -P * 0.14, P * 0.76, P * 0.28, P * 0.12); x.restore(); };
        shadow(shell); shell(); x.fillStyle = linear(x, P * 0.3, P * 0.2, P * 0.6, P * 0.8, [[0, '#f6c878'], [0.4, '#d48a34'], [1, '#8a4a14']]); x.fill();
        blister(x, rnd, 40, P, shell);
        [[0.2, 0.75], [0.8, 0.25]].forEach(([fx, fy], i) => { ellipse(x, P * fx, P * fy, P * 0.13, P * 0.12, -0.6); x.fillStyle = radial(x, P * fx - P * 0.03, P * fy - P * 0.03, P * 0.14, [[0, '#ffffff'], [0.7, '#f6efe0'], [1, '#d8ccb4']]); x.fill(); chips(x, rnd, P * fx, P * fy, P * 0.08, 6, P); if (i) { x.fillStyle = 'rgba(120,180,80,0.8)'; for (let k = 0; k < 10; k++) x.fillRect(P * (fx - 0.1 + rnd() * 0.2), P * (fy - 0.1 + rnd() * 0.2), P * 0.02, P * 0.02); } });
        sugar(x, rnd, P, 30);
        break;
      }
      case 2: { // lobster tail: layered flaky cone with cream bursting out
        const tail = () => { x.beginPath(); x.moveTo(P * 0.14, P * 0.5); x.quadraticCurveTo(P * 0.3, P * 0.16, P * 0.66, P * 0.22); x.quadraticCurveTo(P * 0.9, P * 0.36, P * 0.86, P * 0.5); x.quadraticCurveTo(P * 0.9, P * 0.66, P * 0.66, P * 0.78); x.quadraticCurveTo(P * 0.3, P * 0.84, P * 0.14, P * 0.5); x.closePath(); };
        shadow(tail); tail(); x.fillStyle = linear(x, 0, P * 0.2, 0, P * 0.8, [[0, '#f8d08a'], [0.5, '#d08a3a'], [1, '#7a4012']]); x.fill();
        x.save(); tail(); x.clip();
        for (let k = 0; k < 9; k++) { x.strokeStyle = k % 2 ? 'rgba(255,236,190,0.75)' : 'rgba(110,50,10,0.55)'; x.lineWidth = P * 0.02; x.beginPath(); x.moveTo(P * (0.18 + k * 0.075), P * 0.2); x.quadraticCurveTo(P * (0.1 + k * 0.08), P * 0.5, P * (0.18 + k * 0.075), P * 0.82); x.stroke(); }
        x.restore();
        ellipse(x, P * 0.84, P * 0.5, P * 0.1, P * 0.15); x.fillStyle = radial(x, P * 0.82, P * 0.46, P * 0.15, [[0, '#fffdf4'], [1, '#e8d8b8']]); x.fill();
        sugar(x, rnd, P, 50);
        break;
      }
      case 3: { // sfogliatella: shell of fanned crisp leaves
        const shell = () => { x.beginPath(); x.moveTo(P * 0.5, P * 0.86); x.bezierCurveTo(P * 0.06, P * 0.62, P * 0.12, P * 0.16, P * 0.5, P * 0.14); x.bezierCurveTo(P * 0.88, P * 0.16, P * 0.94, P * 0.62, P * 0.5, P * 0.86); x.closePath(); };
        shadow(shell); shell(); x.fillStyle = radial(x, P * 0.45, P * 0.35, P * 0.6, [[0, '#ffe2a8'], [0.5, '#e09a46'], [1, '#8a4a16']]); x.fill();
        x.save(); shell(); x.clip();
        for (let k = 0; k < 14; k++) { const a = -Math.PI * 0.95 + k / 13 * Math.PI * 0.9; x.strokeStyle = 'rgba(100,45,8,0.6)'; x.lineWidth = P * 0.014; x.beginPath(); x.moveTo(P * 0.5, P * 0.86); x.quadraticCurveTo(P * 0.5 + Math.cos(a) * P * 0.2, P * 0.6 + Math.sin(a) * P * 0.2, P * 0.5 + Math.cos(a) * P * 0.5, P * 0.86 + Math.sin(a) * P * 0.85); x.stroke(); x.strokeStyle = 'rgba(255,240,200,0.5)'; x.lineWidth = P * 0.007; x.stroke(); }
        x.restore();
        sugar(x, rnd, P, 60);
        break;
      }
      case 4: { // rainbow cookie: green / yellow / red almond layers, chocolate top & bottom
        x.save(); x.translate(P / 2, P / 2); x.rotate(-0.12);
        const w = P * 0.66, h = P * 0.62, x0 = -w / 2, y0 = -h / 2;
        x.fillStyle = 'rgba(40,20,5,0.3)'; x.fillRect(x0 + P * 0.02, y0 + P * 0.05, w, h);
        const layers = [['#2a140a', 0.1], ['#3a9a4a', 0.27], ['#c8a018', 0.03], ['#f6de6a', 0.24], ['#c8a018', 0.03], ['#d8283a', 0.23], ['#2a140a', 0.1]];
        let yy = y0; layers.forEach(([c, f]) => { x.fillStyle = c; x.fillRect(x0, yy, w, h * f + 0.5); yy += h * f; });
        for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(x0 + rnd() * w, y0 + h * 0.12 + rnd() * h * 0.76, P * 0.012, P * 0.012); }
        x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(x0, y0, w, P * 0.02);
        x.restore();
        break;
      }
      case 5: { // Florentine: lacy caramel almond disc, chocolate zig-zag
        ellipse(x, P / 2 + P * 0.02, P / 2 + P * 0.05, P * 0.36, P * 0.34); x.fillStyle = 'rgba(60,30,5,0.3)'; x.fill();
        ellipse(x, P / 2, P / 2, P * 0.36, P * 0.34); x.fillStyle = radial(x, P * 0.45, P * 0.45, P * 0.4, [[0, '#f0b04a'], [0.7, '#c47a1c'], [1, '#7a4008']]); x.fill();
        for (let k = 0; k < 40; k++) { const a = rnd() * TAU, d = rnd() * P * 0.32; ellipse(x, P / 2 + Math.cos(a) * d, P / 2 + Math.sin(a) * d, P * 0.02, P * 0.014); x.fillStyle = rnd() < 0.6 ? 'rgba(90,40,0,0.6)' : 'rgba(255,220,140,0.6)'; x.fill(); }
        for (let k = 0; k < 9; k++) { const a = rnd() * TAU, d = rnd() * P * 0.26; x.save(); x.translate(P / 2 + Math.cos(a) * d, P / 2 + Math.sin(a) * d); x.rotate(rnd() * 3); ellipse(x, 0, 0, P * 0.05, P * 0.018); x.fillStyle = '#f6e4c0'; x.fill(); x.restore(); }
        x.strokeStyle = '#2a1206'; x.lineWidth = P * 0.03; x.lineCap = 'round'; x.beginPath(); for (let k = 0; k < 7; k++) { const xx = P * (0.22 + k * 0.095), yy = P * (k % 2 ? 0.36 : 0.62); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke();
        x.strokeStyle = 'rgba(255,255,255,0.3)'; x.lineWidth = P * 0.008; x.stroke();
        break;
      }
      case 6: { // eclair: choux finger with glossy chocolate glaze
        const ec = () => { x.save(); x.translate(P / 2, P / 2); x.rotate(0.55); roundRect(x, -P * 0.4, -P * 0.15, P * 0.8, P * 0.3, P * 0.15); x.restore(); };
        shadow(ec); ec(); x.fillStyle = '#c88a40'; x.fill(); blister(x, rnd, 25, P, ec);
        x.save(); x.translate(P / 2, P / 2); x.rotate(0.55);
        roundRect(x, -P * 0.38, -P * 0.15, P * 0.76, P * 0.2, P * 0.1); x.fillStyle = linear(x, 0, -P * 0.15, 0, P * 0.05, [[0, '#6a3a1a'], [0.5, '#3a1a08'], [1, '#2a1004']]); x.fill();
        x.fillStyle = 'rgba(255,240,220,0.55)'; roundRect(x, -P * 0.3, -P * 0.12, P * 0.5, P * 0.035, P * 0.02); x.fill();
        x.fillStyle = '#fff6e0'; x.fillRect(-P * 0.38, P * 0.045, P * 0.76, P * 0.035);
        x.restore();
        break;
      }
      default: { // tiramisu square: cocoa-dusted mascarpone over espresso ladyfingers
        x.save(); x.translate(P / 2, P / 2);
        const w = P * 0.64, h = P * 0.6, x0 = -w / 2, y0 = -h / 2;
        x.fillStyle = 'rgba(40,20,5,0.3)'; x.fillRect(x0 + P * 0.02, y0 + P * 0.05, w, h);
        [['#5a3218', 0.2], ['#f4ead4', 0.2], ['#7a4a22', 0.2], ['#f4ead4', 0.2], ['#8a5a2a', 0.2]].forEach(([c, f], i) => { x.fillStyle = c; x.fillRect(x0, y0 + h * i * 0.2, w, h * f + 0.5); });
        for (let k = 0; k < 120; k++) { x.fillStyle = `rgba(${rnd() < 0.5 ? '60,30,10' : '110,60,25'},0.85)`; x.fillRect(x0 + rnd() * w, y0 + rnd() * h * 0.2, P * 0.012, P * 0.012); }
        x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(x0, y0 + h * 0.2, w, P * 0.01);
        x.restore();
      }
    }
    K.gloss(x, P, 0.2);
  }
  const glints = {};
  function live(ctx, t, s, T, st) {
    // twinkling powdered sugar / glaze sparkles
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 3; i++) {
      const ph = (T * 0.9 + i * 0.37 + st.ph * 0.21) % 1, a = Math.sin(ph * Math.PI);
      if (a < 0.4) continue;
      const px = (((st.ph * 13 + i * 29) % 7) / 7 - 0.5) * s * 0.6, py = (((st.ph * 7 + i * 17) % 5) / 5 - 0.5) * s * 0.6, r = s * 0.05 * a;
      ctx.globalAlpha = a * 0.9; ctx.fillRect(px - r, py - 0.5, r * 2, 1); ctx.fillRect(px - 0.5, py - r, 1, r * 2);
    }
    ctx.globalAlpha = 1;
    if (t === 6) { const key = Math.round(s * 4), gl = glints[key] || (glints[key] = K.glintSprite(s)); const ph = (T * 0.4 + st.ph * 0.1) % 2; if (ph < 1) { ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.8; ctx.globalCompositeOperation = 'lighter'; ctx.drawImage(gl, -s * 0.5 + ph * s * 0.5, -s * 0.5 + ph * s * 0.35, s * 0.5, s * 0.5); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; } }
  }
  return { base, live, BG };
})();
