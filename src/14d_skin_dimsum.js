/* ---- Dim sum blocks: each piece a different dim sum in a bamboo steamer; steam + squish ---- */
SKINSETS.dimsum = (() => {
  const K = SkinKit;
  const NAMES = [null, 'Har gow', 'Siu mai', 'Char siu bao', 'Xiao long bao', 'Egg tart', 'Cheung fun', 'Sesame ball'];
  const LINER = ['#e8d8a8', '#d8e8c0', '#f0e0c0', '#e0e8d8', '#f4e2b0', '#e8dcc8', '#f0d8b0'];
  function steamer(x, P, t) {
    K.tile(x, P, '#d8b070', '#7a5020', 0.2);
    // woven bamboo rim
    x.strokeStyle = 'rgba(90,55,15,0.55)'; x.lineWidth = P * 0.012;
    for (let k = 0; k < 4; k++) { roundRect(x, P * (0.03 + k * 0.022), P * (0.03 + k * 0.022), P * (0.94 - k * 0.044), P * (0.94 - k * 0.044), P * 0.18); x.stroke(); }
    x.strokeStyle = 'rgba(255,230,170,0.45)'; x.lineWidth = P * 0.008; roundRect(x, P * 0.04, P * 0.04, P * 0.92, P * 0.92, P * 0.18); x.stroke();
    // inner liner (parchment / cabbage leaf)
    roundRect(x, P * 0.12, P * 0.12, P * 0.76, P * 0.76, P * 0.12); x.fillStyle = linear(x, 0, P * 0.12, 0, P * 0.88, [[0, shade(LINER[t - 1], 0.15)], [1, shade(LINER[t - 1], -0.2)]]); x.fill();
    x.strokeStyle = 'rgba(120,90,40,0.25)'; x.lineWidth = P * 0.008; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(P * 0.14, P * (0.2 + k * 0.14)); x.lineTo(P * 0.86, P * (0.2 + k * 0.14)); x.stroke(); }
    // perforations
    x.fillStyle = 'rgba(90,60,20,0.35)'; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { ellipse(x, P * (0.28 + a * 0.22), P * (0.28 + b * 0.22), P * 0.012, P * 0.012); x.fill(); }
  }
  function pleats(x, cx, cy, r, n, col, w) { x.strokeStyle = col; x.lineWidth = w; for (let k = 0; k < n; k++) { const a = -Math.PI * 0.9 + k / (n - 1) * Math.PI * 0.8; x.beginPath(); x.moveTo(cx + Math.cos(a) * r * 0.25, cy + Math.sin(a) * r * 0.25 - r * 0.3); x.quadraticCurveTo(cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.5, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.85); x.stroke(); } }
  function base(x, t, P) {
    const rnd = mulberry32(t * 211 + 9), c = P / 2;
    steamer(x, P, t);
    const sh = (rx, ry) => { ellipse(x, c + P * 0.02, c + P * 0.07, rx, ry); x.fillStyle = 'rgba(60,30,0,0.28)'; x.fill(); };
    switch (t) {
      case 1: { // har gow: translucent pleated wrapper, pink shrimp visible
        sh(P * 0.3, P * 0.24);
        x.beginPath(); x.moveTo(c - P * 0.32, c + P * 0.14); x.bezierCurveTo(c - P * 0.34, c - P * 0.24, c + P * 0.34, c - P * 0.24, c + P * 0.32, c + P * 0.14); x.quadraticCurveTo(c, c + P * 0.26, c - P * 0.32, c + P * 0.14); x.closePath();
        x.fillStyle = 'rgba(250,246,240,0.75)'; x.fill();
        // shrimp inside (pink curl)
        x.save(); x.clip(); x.globalAlpha = 0.75; x.strokeStyle = '#f08a7a'; x.lineWidth = P * 0.12; x.lineCap = 'round'; x.beginPath(); x.arc(c, c + P * 0.02, P * 0.12, Math.PI * 0.9, Math.PI * 2.1); x.stroke(); x.strokeStyle = 'rgba(255,200,190,0.8)'; x.lineWidth = P * 0.03; for (let k = 0; k < 4; k++) { const a = Math.PI * (1 + k * 0.28); x.beginPath(); x.moveTo(c + Math.cos(a) * P * 0.07, c + P * 0.02 + Math.sin(a) * P * 0.07); x.lineTo(c + Math.cos(a) * P * 0.17, c + P * 0.02 + Math.sin(a) * P * 0.17); x.stroke(); } x.restore();
        x.fillStyle = 'rgba(255,255,255,0.25)'; x.fill();
        pleats(x, c, c - P * 0.02, P * 0.3, 7, 'rgba(255,255,255,0.75)', P * 0.022);
        x.strokeStyle = 'rgba(200,180,170,0.6)'; x.lineWidth = P * 0.012; x.beginPath(); x.moveTo(c - P * 0.3, c - P * 0.06); x.quadraticCurveTo(c, c - P * 0.2, c + P * 0.3, c - P * 0.06); x.stroke();
        break;
      }
      case 2: { // siu mai: open-top yellow wrapper, pork filling, orange roe dot
        sh(P * 0.27, P * 0.22);
        x.beginPath(); x.moveTo(c - P * 0.26, c - P * 0.1); x.lineTo(c - P * 0.22, c + P * 0.24); x.quadraticCurveTo(c, c + P * 0.3, c + P * 0.22, c + P * 0.24); x.lineTo(c + P * 0.26, c - P * 0.1); x.closePath();
        x.fillStyle = linear(x, c - P * 0.26, 0, c + P * 0.26, 0, [[0, '#d8a828'], [0.4, '#f6d850'], [1, '#c09018']]); x.fill();
        x.strokeStyle = 'rgba(160,110,10,0.5)'; x.lineWidth = P * 0.012; for (let k = -3; k <= 3; k++) { x.beginPath(); x.moveTo(c + k * P * 0.07, c - P * 0.1); x.lineTo(c + k * P * 0.06, c + P * 0.24); x.stroke(); }
        ellipse(x, c, c - P * 0.1, P * 0.26, P * 0.1); x.fillStyle = radial(x, c - P * 0.05, c - P * 0.13, P * 0.26, [[0, '#f2c8a8'], [0.6, '#c8866a'], [1, '#8a5040']]); x.fill();
        for (let k = 0; k < 16; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.4, c - P * 0.1 + (rnd() - 0.5) * P * 0.12, P * 0.02, P * 0.014); x.fillStyle = rnd() < 0.5 ? 'rgba(255,220,200,0.6)' : 'rgba(120,60,40,0.5)'; x.fill(); }
        ellipse(x, c + P * 0.12, c - P * 0.1, P * 0.026, P * 0.02); x.fillStyle = '#3a8a3a'; x.fill(); // pea
        break;
      }
      case 3: { // char siu bao: fluffy white bun splitting to reveal red pork
        sh(P * 0.32, P * 0.28);
        ellipse(x, c, c, P * 0.32, P * 0.3); x.fillStyle = radial(x, c - P * 0.08, c - P * 0.1, P * 0.4, [[0, '#ffffff'], [0.7, '#f6efe2'], [1, '#d8ccb4']]); x.fill();
        x.save(); x.translate(c, c - P * 0.04);
        x.beginPath(); for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + k * TAU / 3; x.moveTo(0, 0); x.quadraticCurveTo(Math.cos(a - 0.3) * P * 0.12, Math.sin(a - 0.3) * P * 0.12, Math.cos(a) * P * 0.2, Math.sin(a) * P * 0.2); x.quadraticCurveTo(Math.cos(a + 0.3) * P * 0.12, Math.sin(a + 0.3) * P * 0.12, 0, 0); }
        x.fillStyle = radial(x, 0, 0, P * 0.2, [[0, '#e04030'], [0.6, '#a01818'], [1, '#6a0a08']]); x.fill(); x.fillStyle = 'rgba(255,200,180,0.5)'; ellipse(x, -P * 0.02, -P * 0.04, P * 0.03, P * 0.015); x.fill();
        x.restore();
        for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(210,200,180,0.35)'; x.fillRect(c + (rnd() - 0.5) * P * 0.5, c + (rnd() - 0.3) * P * 0.4, P * 0.012, P * 0.012); }
        break;
      }
      case 4: { // xiao long bao: delicate pleats twisting to a top knot, soup inside
        sh(P * 0.32, P * 0.26);
        ellipse(x, c, c + P * 0.04, P * 0.32, P * 0.25); x.fillStyle = radial(x, c - P * 0.06, c - P * 0.02, P * 0.38, [[0, '#fffcf4'], [0.7, '#eee4d0'], [1, '#c8b898']]); x.fill();
        x.fillStyle = 'rgba(240,190,120,0.25)'; ellipse(x, c, c + P * 0.14, P * 0.24, P * 0.1); x.fill();
        x.strokeStyle = 'rgba(170,150,120,0.55)'; x.lineWidth = P * 0.014;
        for (let k = 0; k < 14; k++) { const a = k / 14 * TAU; x.beginPath(); x.moveTo(c + Math.cos(a) * P * 0.03, c - P * 0.06 + Math.sin(a) * P * 0.025); x.quadraticCurveTo(c + Math.cos(a + 0.5) * P * 0.16, c - P * 0.02 + Math.sin(a + 0.5) * P * 0.12, c + Math.cos(a + 0.9) * P * 0.28, c + P * 0.04 + Math.sin(a + 0.9) * P * 0.2); x.stroke(); }
        ellipse(x, c, c - P * 0.07, P * 0.04, P * 0.03); x.fillStyle = '#f4ecdc'; x.fill(); x.strokeStyle = 'rgba(150,130,100,0.6)'; x.stroke();
        break;
      }
      case 5: { // egg tart: flaky fluted shell with glossy custard
        sh(P * 0.32, P * 0.3);
        for (let k = 0; k < 18; k++) { const a = k / 18 * TAU; ellipse(x, c + Math.cos(a) * P * 0.29, c + Math.sin(a) * P * 0.29, P * 0.05, P * 0.05); x.fillStyle = k % 2 ? '#d89a48' : '#e8b060'; x.fill(); }
        ellipse(x, c, c, P * 0.3, P * 0.3); x.fillStyle = linear(x, 0, c - P * 0.3, 0, c + P * 0.3, [[0, '#f0c070'], [1, '#b06a20']]); x.fill();
        x.strokeStyle = 'rgba(255,230,180,0.6)'; x.lineWidth = P * 0.01; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(c, c, P * (0.27 - k * 0.012), 0, TAU); x.stroke(); }
        ellipse(x, c, c, P * 0.22, P * 0.22); x.fillStyle = radial(x, c - P * 0.05, c - P * 0.06, P * 0.26, [[0, '#fff2a0'], [0.6, '#f8d040'], [1, '#e0a018']]); x.fill();
        x.fillStyle = 'rgba(200,120,20,0.25)'; for (let k = 0; k < 5; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.25, c + (rnd() - 0.5) * P * 0.25, P * 0.03, P * 0.02); x.fill(); }
        break;
      }
      case 6: { // cheung fun: silky rice noodle rolls with sweet soy
        x.save(); x.translate(c, c); x.rotate(-0.12);
        for (let k = 0; k < 2; k++) { const yy = (k - 0.5) * P * 0.26; roundRect(x, -P * 0.34, yy - P * 0.11, P * 0.68, P * 0.22, P * 0.11); x.fillStyle = linear(x, 0, yy - P * 0.11, 0, yy + P * 0.11, [[0, '#ffffff'], [0.5, '#eeeae2'], [1, '#c8c2b4']]); x.fill(); x.strokeStyle = 'rgba(180,170,150,0.4)'; x.lineWidth = P * 0.01; for (let f = 0; f < 4; f++) { x.beginPath(); x.moveTo(-P * 0.3 + f * P * 0.18, yy - P * 0.1); x.quadraticCurveTo(-P * 0.26 + f * P * 0.18, yy, -P * 0.3 + f * P * 0.18, yy + P * 0.1); x.stroke(); } x.fillStyle = 'rgba(255,190,180,0.5)'; x.fillRect(-P * 0.34, yy - P * 0.02, P * 0.06, P * 0.04); }
        x.strokeStyle = 'rgba(110,50,10,0.85)'; x.lineWidth = P * 0.03; x.lineCap = 'round'; x.beginPath(); for (let k = 0; k <= 8; k++) { const xx = -P * 0.3 + k * P * 0.075; x.lineTo(xx, Math.sin(k * 1.4) * P * 0.12); } x.stroke();
        x.fillStyle = 'rgba(80,140,40,0.9)'; for (let k = 0; k < 6; k++) { ellipse(x, (rnd() - 0.5) * P * 0.5, (rnd() - 0.5) * P * 0.4, P * 0.02, P * 0.015); x.fill(); }
        x.restore();
        x.fillStyle = 'rgba(120,60,10,0.35)'; ellipse(x, c + P * 0.08, c + P * 0.3, P * 0.2, P * 0.04); x.fill();
        break;
      }
      default: { // jin deui sesame ball
        sh(P * 0.3, P * 0.3);
        ellipse(x, c, c, P * 0.3, P * 0.3); x.fillStyle = radial(x, c - P * 0.09, c - P * 0.1, P * 0.38, [[0, '#ffd890'], [0.5, '#e09a3a'], [1, '#8a4a10']]); x.fill();
        for (let k = 0; k < 70; k++) { const a = rnd() * TAU, d = Math.sqrt(rnd()) * P * 0.28; ellipse(x, c + Math.cos(a) * d, c + Math.sin(a) * d, P * 0.016, P * 0.009, a + 1.4); x.fillStyle = rnd() < 0.85 ? '#fbf0d8' : '#2a1a10'; x.fill(); }
      }
    }
    K.gloss(x, P, t === 5 ? 0.35 : 0.18);
  }
  const cache = {};
  function wisp(s) {
    const k = Math.round(s * 4); if (cache[k]) return cache[k];
    const c = makeCanvas(Math.ceil(s), Math.ceil(s * 2)), x = c.getContext('2d');
    for (let i = 0; i < 6; i++) { const yy = s * 2 - i * s * 0.3, xx = s / 2 + Math.sin(i * 1.4) * s * 0.12; x.fillStyle = radial(x, xx, yy - s * 0.2, s * 0.3, [[0, `rgba(255,255,255,${0.22 - i * 0.03})`], [1, 'rgba(255,255,255,0)']]); x.fillRect(0, 0, s, s * 2); }
    return (cache[k] = c);
  }
  function live(ctx, t, s, T, st) {
    if (t === 5) { // egg-tart custard wobbles and catches the light
      const w = 1 + Math.sin(T * 9 + st.ph) * 0.015 + st.k * 0.08;
      ctx.fillStyle = 'rgba(255,255,230,0.5)'; ellipse(ctx, -s * 0.06, -s * 0.07, s * 0.07 * w, s * 0.035 / w, -0.4); ctx.fill();
    }
    if (t === 4) { // soup jiggles inside the dumpling skin
      const j = Math.sin(T * 6 + st.ph) * 0.02 + st.k * 0.05;
      ctx.fillStyle = 'rgba(255,240,200,0.35)'; ellipse(ctx, j * s, s * 0.14, s * 0.2, s * 0.05 * (1 + j * 4)); ctx.fill();
    }
    if (st.top) { // steam wisps rise from the uppermost dumplings
      const w = wisp(s), ph = (T * 0.35 + st.ph * 0.17) % 1;
      ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.75;
      ctx.drawImage(w, -s * 0.5 + Math.sin(T + st.ph) * s * 0.1, -s * 1.6 - ph * s * 0.6, s, s * 2);
      ctx.globalAlpha = 1;
    }
  }
  return { base, live, NAMES };
})();
