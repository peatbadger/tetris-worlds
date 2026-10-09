/* ---- Yakitori blocks: seven charcoal-grilled skewers, each piece one continuous mass on one bamboo skewer ----
   I negima (tare-glazed thigh alternating with charred leek) · O uzura (quail eggs, tare blush) · T tebasaki (crisp
   amber wings, salt) · S shishito (blistered peppers, bonito flakes) · Z kawa (crispy skin ruffles) · J tsukune
   (lacquered meatball patties, sesame, a raw yolk) · L reba (glossy liver, scallion) */
const YakitoriFood = remakeFood('yakitori', {
  premiumOpts: { lift: { kawa: 'brightness(0.84) contrast(1.08) saturate(1.12)', uzura: 'brightness(1.1) contrast(1.04)', tebasaki: 'brightness(0.86) contrast(1.1) saturate(1.1)' } },
  FOOD: [null, 'negima', 'uzura', 'tebasaki', 'shishito', 'kawa', 'tsukune', 'reba'],
  MAIN: [null, '#b07434', '#f2e4c4', '#a85e24', '#4e8a30', '#e0a24c', '#5a2e14', '#3a1210'],
  soft: { negima: 1.0, uzura: 1.4, tebasaki: 1.0, shishito: 1.1, kawa: 1.1, tsukune: 1.1, reba: 1.3 },
  boardBg: 'rgba(22,14,12,0.92)', grid: 'rgba(255,190,140,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 151), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    const along = (fn) => { for (const [ax, ay, bx, by] of M.skel()) fn(ax, ay, bx, by, ay === by); };
    // beads: points along the skeleton every `step` cells (deduplicated at joints)
    const beads = (step) => { const o = [], seen = new Set(); along((ax, ay, bx, by, hz) => { const n = Math.round(1 / step); for (let k = 0; k <= n; k++) { const px = ax + (bx - ax) * k / n, py = ay + (by - ay) * k / n, key = Math.round(px * 10 / P) + ',' + Math.round(py * 10 / P); if (seen.has(key)) continue; seen.add(key); o.push([px, py, hz, o.length]); } }); return o; };
    const stick = () => { x.lineCap = 'round'; x.strokeStyle = 'rgba(40,20,0,0.5)'; x.lineWidth = P * 0.09; along((ax, ay, bx, by) => { x.beginPath(); x.moveTo(ax, ay + P * 0.02); x.lineTo(bx, by + P * 0.02); x.stroke(); }); x.strokeStyle = '#dcc08c'; x.lineWidth = P * 0.065; along((ax, ay, bx, by) => { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.stroke(); }); };
    const char = (u, v, rr, i, k, a = 0.55) => { if (small) return; x.strokeStyle = `rgba(30,12,0,${a})`; x.lineWidth = lw(0.04); x.lineCap = 'round'; for (let q = 0; q < 2; q++) { const o = (q - 0.5) * rr * 0.7; x.beginPath(); x.moveTo(u - rr * 0.5 + o * 0.3, v + o - rr * 0.3); x.lineTo(u + rr * 0.5 + o * 0.3, v + o + rr * 0.3); x.stroke(); } };
    switch (food) {
      case 'negima': { M.fill('#4e2c14'); M.piece(() => { stick();
        for (const [u, v, hz, i] of beads(0.5)) { const leek = (Math.round(u / (P * 0.5)) + Math.round(v / (P * 0.5))) % 2 === 1;
          if (leek) { const lw2 = P * 0.34, lh = P * 0.5; x.save(); x.translate(u, v); if (!hz) x.rotate(Math.PI / 2); x.fillStyle = 'rgba(20,10,0,0.45)'; roundRect(x, -lw2 / 2 + P * 0.03, -lh / 2 + P * 0.04, lw2, lh, P * 0.12); x.fill(); x.fillStyle = M.lin(-lw2 / 2, 0, lw2 / 2, 0, [[0, '#f4f2dc'], [0.5, '#e4e8c4'], [1, '#a8b878']]); roundRect(x, -lw2 / 2, -lh / 2, lw2, lh, P * 0.12); x.fill(); x.fillStyle = 'rgba(60,40,10,0.6)'; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc((H(i * 3 + k, 3) - 0.5) * lw2 * 0.6, (H(i * 3 + k, 4) - 0.5) * lh * 0.7, P * 0.03, 0, TAU); x.fill(); } x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-lw2 * 0.3, -lh * 0.38, lw2 * 0.12, lh * 0.76); x.restore(); }
          else { const rr = P * (0.36 + H(i, 5) * 0.05); x.fillStyle = 'rgba(20,8,0,0.5)'; M.blob(u + P * 0.03, v + P * 0.05, rr, i, 8, 0.4); x.fill(); x.fillStyle = M.rad(u - rr * 0.35, v - rr * 0.4, rr * 1.6, [[0, '#e8b064'], [0.5, '#b8742e'], [1, '#7a4216']]); M.blob(u, v, rr, i, 8, 0.4); x.fill(); char(u, v, rr, i); x.fillStyle = 'rgba(255,225,170,0.45)'; ellipse(x, u - rr * 0.35, v - rr * 0.4, rr * 0.3, rr * 0.12, -0.5); x.fill(); } } });
        M.form('rgba(255,220,160,0.2)', 'rgba(40,16,0,0.45)'); break; }
      case 'uzura': { M.fill('#d4ae74'); M.piece(() => { stick();
        for (const [u, v, hz, i] of beads(0.5)) { const rx = P * (hz ? 0.28 : 0.25), ry = P * (hz ? 0.25 : 0.28); x.fillStyle = 'rgba(60,30,0,0.4)'; ellipse(x, u + P * 0.03, v + P * 0.04, rx, ry); x.fill();
          x.fillStyle = M.rad(u - rx * 0.35, v - ry * 0.4, Math.max(rx, ry) * 1.6, [[0, '#ffffff'], [0.45, '#f8f0dc'], [1, '#dcc08a']]); ellipse(x, u, v, rx, ry); x.fill();
          x.fillStyle = 'rgba(170,100,40,0.3)'; ellipse(x, u + rx * 0.2, v + ry * 0.35, rx * 0.7, ry * 0.4); x.fill(); x.fillStyle = 'rgba(255,255,255,0.85)'; ellipse(x, u - rx * 0.38, v - ry * 0.42, rx * 0.22, ry * 0.12, -0.6); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 3, 9, 0.08)) { x.fillStyle = H(i, 10) < 0.5 ? 'rgba(40,20,0,0.5)' : 'rgba(230,200,140,0.5)'; x.fillRect(u, v, lw(0.025), lw(0.025)); } });
        M.form('rgba(255,245,220,0.22)', 'rgba(80,40,0,0.38)'); break; }
      case 'tebasaki': { M.fill('#52260c'); M.piece(() => { stick();
        for (const [u, v, i] of M.pts(A * 3, 13, 0.14)) { const rr = P * (0.3 + H(i, 15) * 0.06), a0 = H(i, 16) * TAU, dx = Math.cos(a0) * rr * 0.45, dy = Math.sin(a0) * rr * 0.45;
          x.fillStyle = 'rgba(20,6,0,0.5)'; ellipse(x, u + P * 0.03, v + P * 0.05, rr * 1.1, rr * 0.72, a0); x.fill();
          x.fillStyle = M.rad(u - rr * 0.4, v - rr * 0.45, rr * 1.7, [[0, '#f0b058'], [0.5, '#c07a2c'], [1, '#7a3c12']]); ellipse(x, u - dx * 0.4, v - dy * 0.4, rr * 0.8, rr * 0.62, a0); x.fill(); ellipse(x, u + dx, v + dy, rr * 0.55, rr * 0.5, a0); x.fill();
          if (!small) { x.fillStyle = 'rgba(255,215,150,0.5)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(u + (H(i * 6 + k, 17) - 0.5) * rr * 1.2, v + (H(i * 6 + k, 18) - 0.5) * rr * 0.8, P * 0.022, 0, TAU); x.fill(); } x.fillStyle = 'rgba(40,14,0,0.6)'; ellipse(x, u + dx * 1.6, v + dy * 1.6, rr * 0.18, rr * 0.12, a0); x.fill(); }
          x.fillStyle = 'rgba(255,240,210,0.5)'; ellipse(x, u - rr * 0.45, v - rr * 0.35, rr * 0.28, rr * 0.1, -0.5); x.fill(); }
        if (!small) { x.fillStyle = '#fbf8f2'; for (const [u, v, i] of M.pts(A * 6, 21, 0.08)) { x.save(); x.translate(u, v); x.rotate(H(i, 22) * 3); x.fillRect(-P * 0.015, -P * 0.012, P * 0.03, P * 0.024); x.restore(); } } });
        M.form('rgba(255,210,150,0.2)', 'rgba(30,10,0,0.45)'); break; }
      case 'shishito': { M.fill('#1e3412'); M.piece(() => { stick();
        for (const [u, v, hz, i] of beads(0.5)) { const ln = P * 0.42, wd = P * (0.17 + H(i, 25) * 0.04); x.save(); x.translate(u, v); x.rotate((hz ? Math.PI / 2 : 0) + (H(i, 26) - 0.5) * 0.4);
          x.fillStyle = 'rgba(0,10,0,0.5)'; ellipse(x, P * 0.03, P * 0.04, wd, ln); x.fill();
          x.fillStyle = M.lin(-wd, 0, wd, 0, [[0, '#8cc858'], [0.5, '#5a9a34'], [1, '#2e6a1c']]); x.beginPath(); for (let k = 0; k <= 16; k++) { const a = k / 16 * TAU, r = 1 + Math.sin(a * 5 + i) * 0.06; const px = Math.cos(a) * wd * r, py = Math.sin(a) * ln * r; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill();
          x.strokeStyle = 'rgba(20,50,10,0.5)'; x.lineWidth = lw(0.02); x.beginPath(); x.moveTo(-wd * 0.3, -ln * 0.8); x.quadraticCurveTo(wd * 0.1, 0, -wd * 0.2, ln * 0.8); x.stroke();
          x.fillStyle = 'rgba(40,30,10,0.6)'; for (let k = 0; k < 2; k++) { ellipse(x, (H(i * 2 + k, 27) - 0.5) * wd, (H(i * 2 + k, 28) - 0.5) * ln * 1.2, wd * 0.35, wd * 0.25); x.fill(); }
          x.fillStyle = 'rgba(220,240,190,0.55)'; ellipse(x, -wd * 0.45, -ln * 0.2, wd * 0.14, ln * 0.45); x.fill();
          x.fillStyle = '#6a8a3a'; x.fillRect(-P * 0.03, -ln - P * 0.06, P * 0.06, P * 0.08); x.restore(); }
        if (!small) for (const [u, v, i] of M.pts(A * 2, 31, 0.15)) { x.fillStyle = 'rgba(240,200,180,0.75)'; x.save(); x.translate(u, v); x.rotate(H(i, 32) * 3); K0f(x, P); x.restore(); } });
        M.form('rgba(210,255,180,0.18)', 'rgba(0,20,0,0.45)'); break; }
      case 'kawa': { M.fill('#c88a3c'); M.piece(() => { stick();
        for (const [u, v, hz, i] of beads(0.34)) { const rr = P * (0.3 + H(i, 35) * 0.05);
          x.fillStyle = 'rgba(80,36,0,0.5)'; M.blob(u + P * 0.03, v + P * 0.05, rr, i + 3, 10, 0.75); x.fill();
          x.fillStyle = M.rad(u - rr * 0.35, v - rr * 0.4, rr * 1.7, [[0, '#fbe6ac'], [0.45, '#eab460'], [1, '#b06e26']]); M.blob(u, v, rr, i + 3, 10, 0.75); x.fill();
          x.strokeStyle = 'rgba(130,64,10,0.55)'; x.lineWidth = lw(0.025); x.lineCap = 'round'; for (let k = 0; k < 3; k++) { const a0 = H(i * 3 + k, 36) * TAU, d = rr * 0.45; x.beginPath(); x.arc(u + Math.cos(a0) * d * 0.5, v + Math.sin(a0) * d * 0.5, d, a0, a0 + 1.4); x.stroke(); }
          if (!small) { x.fillStyle = 'rgba(255,248,220,0.7)'; for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(u + (H(i * 5 + k, 37) - 0.5) * rr * 1.2, v + (H(i * 5 + k, 38) - 0.5) * rr * 1.2, P * 0.018, 0, TAU); x.fill(); } } }
        if (!small) { x.fillStyle = '#fbf8f2'; for (const [u, v] of M.pts(A * 5, 39, 0.08)) x.fillRect(u, v, lw(0.022), lw(0.018)); } });
        M.form('rgba(255,235,180,0.22)', 'rgba(90,40,0,0.4)'); break; }
      case 'tsukune': { M.fill('#24100a'); M.piece(() => { stick();
        for (const [u, v, hz, i] of beads(0.5)) { const ln = P * 0.48, wd = P * 0.32; x.save(); x.translate(u, v); if (hz) x.rotate(Math.PI / 2);
          x.fillStyle = 'rgba(0,0,0,0.5)'; roundRect(x, -wd + P * 0.03, -ln / 2 + P * 0.05, wd * 2, ln, wd * 0.8); x.fill();
          x.fillStyle = M.lin(-wd, -ln / 2, wd, ln / 2, [[0, '#9a5424'], [0.5, '#64300e'], [1, '#3a1a08']]); roundRect(x, -wd, -ln / 2, wd * 2, ln, wd * 0.8); x.fill();
          x.fillStyle = 'rgba(255,200,150,0.35)'; ellipse(x, -wd * 0.45, -ln * 0.15, wd * 0.18, ln * 0.3); x.fill(); x.restore();
          if (!small) { x.fillStyle = '#f4ead0'; for (let k = 0; k < 5; k++) { ellipse(x, u + (H(i * 5 + k, 41) - 0.5) * P * 0.5, v + (H(i * 5 + k, 42) - 0.5) * P * 0.5, P * 0.025, P * 0.012, H(i * 5 + k, 43) * 3); x.fill(); } } }
        { const bs = beads(0.5), b = bs[Math.floor(H(A, 45) * bs.length)]; if (b) { const [u, v] = b, r0 = P * 0.15; x.fillStyle = 'rgba(0,0,0,0.4)'; x.beginPath(); x.arc(u + r0 * 0.15, v + r0 * 0.25, r0, 0, TAU); x.fill(); x.fillStyle = M.rad(u - r0 * 0.3, v - r0 * 0.3, r0 * 1.4, [[0, '#ffd070'], [0.6, '#f49a1a'], [1, '#d4700a']]); x.beginPath(); x.arc(u, v, r0, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; ellipse(x, u - r0 * 0.35, v - r0 * 0.4, r0 * 0.3, r0 * 0.15, -0.6); x.fill(); } } });
        M.form('rgba(255,190,140,0.16)', 'rgba(0,0,0,0.5)'); break; }
      case 'reba': { M.fill('#2a0a0a'); M.piece(() => { stick();
        for (const [u, v, i] of M.pts(A * 3, 51, 0.14)) { const rr = P * (0.3 + H(i, 53) * 0.06); x.fillStyle = 'rgba(0,0,0,0.5)'; M.blob(u + P * 0.03, v + P * 0.05, rr, i + 7, 7, 0.5); x.fill();
          x.fillStyle = M.rad(u - rr * 0.35, v - rr * 0.4, rr * 1.6, [[0, '#7a2a2a'], [0.5, '#4a1214'], [1, '#26080a']]); M.blob(u, v, rr, i + 7, 7, 0.5); x.fill();
          x.fillStyle = 'rgba(255,200,200,0.4)'; ellipse(x, u - rr * 0.35, v - rr * 0.4, rr * 0.32, rr * 0.11, -0.5); x.fill(); x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(u - rr * 0.48, v - rr * 0.44, rr * 0.05, 0, TAU); x.fill(); }
        if (!small) for (const [u, v, i] of M.pts(A * 2, 57, 0.15)) { const r0 = P * 0.06; x.strokeStyle = '#7ab04a'; x.lineWidth = lw(0.025); x.beginPath(); x.arc(u, v, r0, 0, TAU); x.stroke(); x.fillStyle = 'rgba(220,240,190,0.7)'; x.beginPath(); x.arc(u, v, r0 * 0.45, 0, TAU); x.fill(); } });
        M.form('rgba(255,170,170,0.14)', 'rgba(0,0,0,0.5)'); break; }
    }
  },
});
function K0f(x, P) { x.beginPath(); x.moveTo(-P * 0.05, -P * 0.02); x.lineTo(P * 0.04, -P * 0.04); x.lineTo(P * 0.05, P * 0.02); x.lineTo(-P * 0.03, P * 0.03); x.closePath(); x.fill(); } // a curl of bonito flake
