/* ---- Oden Yatai blocks: seven things simmering in the stall's dashi, each piece one continuous mass ----
   I gyūsuji (glossy beef-tendon chunks threaded on skewers, broth-dark) · O daikon (thick rounds gone translucent amber in
   the dashi, a cross score on top, a darker rim) · T konnyaku (grey speckled devil's-tongue triangles, scored diamonds)
   · S chikuwa (fish-cake tubes laid flat, toasted stripes, a hollow middle) · Z tamago (broth-stained eggs, halved to soft
   golden yolks) · J kinchaku (fried-tofu pouches tied with a kanpyō ribbon, plump with mochi) · L hanpen (fluffy white
   fish-cake squares, airy pores, a soft sheen) */
const OdenFood = remakeFood('oden', {
  premiumOpts: { R: 0.2, grain: { hanpen: 0.06, konnyaku: 0.12, daikon: 0.05 }, lift: { gyusuji: 'brightness(1.1) contrast(1.06)', konnyaku: 'brightness(0.86) contrast(1.06)', tamago: 'brightness(0.92) contrast(1.08) saturate(1.08)', chikuwa: 'brightness(1.14) contrast(1.02)', kinchaku: 'brightness(1.06) contrast(1.06)', daikon: 'brightness(1.07) contrast(1.04)', hanpen: 'brightness(1.06)' } },
  FOOD: [null, 'gyusuji', 'daikon', 'konnyaku', 'chikuwa', 'tamago', 'kinchaku', 'hanpen'],
  MAIN: [null, '#5a3420', '#e0b46a', '#7a7470', '#c89a5a', '#d8a848', '#b07a34', '#f4f0e8'],
  soft: { gyusuji: 1.0, daikon: 1.2, konnyaku: 0.9, chikuwa: 1.2, tamago: 1.3, kinchaku: 1.3, hanpen: 1.5 },
  boardBg: 'rgba(12,14,22,0.94)', grid: 'rgba(255,220,170,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 419), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'gyusuji': { M.fill('#24120a'); M.piece(() => { // skewers of glossy tendon chunks
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * P, n = Math.max(1, Math.round(len / (P * 0.62))), step = len / n;
            x.strokeStyle = '#c8a46a'; x.lineWidth = lw(0.045); x.beginPath(); x.moveTo(-P, cy); x.lineTo(len + P, cy); x.stroke();
            for (let k = 0; k < n; k++) { const cx = (k + 0.5) * step, rr = Math.min(step, P) * 0.56, sd = k * 13 + r * 7 + 3;
              x.fillStyle = 'rgba(10,4,0,0.5)'; M.blob(cx + P * 0.02, cy + P * 0.04, rr, sd, 8, 0.4); x.fill();
              x.fillStyle = M.rad(cx - rr * 0.35, cy - rr * 0.4, rr * 1.6, [[0, '#a8683a'], [0.5, '#6e3c1e'], [1, '#3a1c0c']]); M.blob(cx, cy, rr, sd, 8, 0.4); x.fill();
              x.fillStyle = 'rgba(230,200,150,0.45)'; M.blob(cx + rr * 0.15, cy + rr * 0.1, rr * 0.38, sd + 1, 6, 0.6); x.fill(); // translucent gelatinous tendon
              x.fillStyle = 'rgba(255,230,190,0.55)'; ellipse(x, cx - rr * 0.32, cy - rr * 0.42, rr * 0.28, rr * 0.08, -0.5); x.fill(); } } }); });
        M.form('rgba(255,210,160,0.18)', 'rgba(10,4,0,0.45)'); break; }
      case 'daikon': { M.fill('#8a5a26'); M.piece(() => { // thick translucent rounds, cross-scored
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, R = P * 0.48;
          x.fillStyle = 'rgba(40,20,0,0.45)'; x.beginPath(); x.arc(cx + P * 0.02, cy + P * 0.035, R, 0, TAU); x.fill();
          x.fillStyle = M.rad(cx - R * 0.2, cy - R * 0.25, R * 1.15, [[0, '#fae6b8'], [0.55, '#ecc27a'], [0.9, '#c88e44'], [1, '#a46c2c']]); x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill();
          if (!small) { x.strokeStyle = 'rgba(255,240,210,0.35)'; x.lineWidth = lw(0.012); for (let q = 0; q < 14; q++) { const an = q / 14 * TAU; x.beginPath(); x.moveTo(cx + Math.cos(an) * R * 0.15, cy + Math.sin(an) * R * 0.15); x.lineTo(cx + Math.cos(an) * R * 0.85, cy + Math.sin(an) * R * 0.85); x.stroke(); } } // fibrous radial grain
          x.strokeStyle = 'rgba(200,140,60,0.35)'; x.lineWidth = lw(0.02); x.beginPath(); x.arc(cx, cy, R * 0.62, 0, TAU); x.stroke(); // the softer inner ring of a simmered round
          x.strokeStyle = 'rgba(140,84,30,0.5)'; x.lineWidth = lw(0.04); x.beginPath(); x.arc(cx, cy, R * 0.93, 0, TAU); x.stroke();
          x.fillStyle = 'rgba(255,250,235,0.55)'; ellipse(x, cx - R * 0.3, cy - R * 0.42, R * 0.3, R * 0.09, -0.4); x.fill(); } });
        M.form('rgba(255,240,200,0.2)', 'rgba(70,40,0,0.36)'); break; }
      case 'konnyaku': { M.fill('#2a2826'); M.piece(() => { // grey speckled triangles, diamond-scored so the broth clings
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) { const n = Math.max(1, Math.round(len / (P * 0.6))), step = len / n;
            for (let k = 0; k < n; k++) { const up = (k + r) % 2 === 0, cx = (k + 0.5) * step, cy = (r + 0.5) * P, hh = P * 0.82, hw = step * 0.98, ty = cy + (up ? -hh / 2 : hh / 2), by = cy + (up ? hh / 2 : -hh / 2);
              const tri = (dx, dy) => { x.beginPath(); x.moveTo(cx + dx, ty + dy); x.lineTo(cx + hw * 0.92 + dx, by + dy); x.lineTo(cx - hw * 0.92 + dx, by + dy); x.closePath(); };
              x.fillStyle = 'rgba(0,0,0,0.45)'; tri(P * 0.02, P * 0.035); x.fill();
              x.fillStyle = M.lin(cx - hw, ty, cx + hw, by, [[0, '#a8a29a'], [0.5, '#86807a'], [1, '#5e5a56']]); tri(0, 0); x.fill();
              x.save(); tri(0, 0); x.clip(); x.strokeStyle = 'rgba(60,56,52,0.28)'; x.lineWidth = lw(0.012); for (let q = -3; q < 4; q++) { x.beginPath(); x.moveTo(cx + q * P * 0.26, cy - P); x.lineTo(cx + q * P * 0.26 + P, cy + P); x.moveTo(cx + q * P * 0.26, cy - P); x.lineTo(cx + q * P * 0.26 - P, cy + P); x.stroke(); }
              if (!small) for (let g = 0; g < 26; g++) { x.fillStyle = 'rgba(30,26,24,0.7)'; x.beginPath(); x.arc(cx + (H(k * 26 + g + r * 99, 5) - 0.5) * hw * 1.6, cy + (H(k * 26 + g + r * 99, 6) - 0.5) * hh, P * 0.012, 0, TAU); x.fill(); } // hijiki specks
              x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(cx - hw, cy - hh / 2, hw * 2, hh * 0.18); x.restore(); } } }); });
        M.form('rgba(240,236,230,0.16)', 'rgba(0,0,0,0.42)'); break; }
      case 'chikuwa': { M.fill('#3a2210'); M.piece(() => { // fish-cake tubes laid flat along the piece, toasted stripes
        M.axis((len, sp) => { const rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) { const cy = (r + 0.5) * P, R = P * 0.42, e0 = P * 0.08, e1 = len - P * 0.08;
            x.fillStyle = 'rgba(20,8,0,0.45)'; roundRect(x, e0 + P * 0.02, cy - R + P * 0.04, e1 - e0, R * 2, R); x.fill();
            x.fillStyle = M.lin(0, cy - R, 0, cy + R, [[0, '#8a4818'], [0.38, '#b87436'], [0.62, '#e6c48a'], [1, '#c09868']]); roundRect(x, e0, cy - R, e1 - e0, R * 2, R); x.fill();
            x.save(); roundRect(x, e0, cy - R, e1 - e0, R * 2, R); x.clip();
            if (!small) for (let q = 0; q < len / (P * 0.12); q++) { const sx = e0 + q * P * 0.12 + H(q + r * 40, 7) * P * 0.06, sy = cy - R * (0.2 + H(q + r * 40, 8) * 0.5); x.fillStyle = H(q, 9 + r) < 0.5 ? 'rgba(110,52,14,0.45)' : 'rgba(240,200,140,0.35)'; M.blob(sx, sy, P * (0.03 + H(q, 10) * 0.03), q + r * 50, 6, 0.6); x.fill(); } // blistered patches
            x.fillStyle = 'rgba(255,230,190,0.35)'; roundRect(x, e0 + R * 0.6, cy - R * 0.8, (e1 - e0) - R * 1.2, R * 0.16, R * 0.08); x.fill(); x.restore();
            for (const ex of [e0 + R * 0.3, e1 - R * 0.3]) { x.fillStyle = '#d8b884'; ellipse(x, ex, cy, R * 0.32, R * 0.9, 0); x.fill(); x.fillStyle = '#4a2a14'; ellipse(x, ex, cy, R * 0.14, R * 0.42, 0); x.fill(); } } }); }); // the hollow ends
        M.form('rgba(255,236,200,0.2)', 'rgba(50,24,0,0.38)'); break; }
      case 'tamago': { M.fill('#5a3818'); M.piece(() => { // broth-stained eggs halved: amber white, soft golden yolk
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, rx = P * 0.44, ry = P * 0.47, rot = (H(a * 7 + c, 3) - 0.5) * 0.5;
          x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = 'rgba(30,14,0,0.45)'; ellipse(x, P * 0.02, P * 0.035, rx, ry, 0); x.fill();
          x.fillStyle = M.rad(-rx * 0.3, -ry * 0.35, ry * 1.3, [[0, '#e2b070'], [0.6, '#b07436'], [1, '#6e4016']]); ellipse(x, 0, 0, rx, ry, 0); x.fill();
          x.fillStyle = M.rad(-rx * 0.1, ry * 0.0, rx * 0.6, [[0, '#ffd460'], [0.7, '#eeac2a'], [1, '#c8861c']]); ellipse(x, 0, ry * 0.06, rx * 0.5, rx * 0.52, 0); x.fill();
          x.fillStyle = 'rgba(255,240,180,0.6)'; ellipse(x, -rx * 0.14, -ry * 0.06, rx * 0.16, rx * 0.07, -0.4); x.fill();
          x.fillStyle = 'rgba(255,248,230,0.45)'; ellipse(x, -rx * 0.4, -ry * 0.5, rx * 0.22, ry * 0.07, -0.6); x.fill(); x.restore(); } });
        M.form('rgba(255,236,190,0.2)', 'rgba(50,24,0,0.38)'); break; }
      case 'kinchaku': { M.fill('#4a2a10'); M.piece(() => { // fried-tofu pouches, tied with a kanpyō ribbon
        for (const [u, v, i] of M.pts(A, 41, 0.5)) { const R = P * 0.47, sd = i * 11 + 5;
          x.fillStyle = 'rgba(30,12,0,0.45)'; M.blob(u + P * 0.02, v + P * 0.04, R, sd, 9, 0.22); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.35, R * 1.5, [[0, '#e8b868'], [0.55, '#bc8236'], [1, '#7a4a18']]); M.blob(u, v, R, sd, 9, 0.22); x.fill();
          if (!small) for (let k = 0; k < 18; k++) { const an = H(i * 18 + k, 42) * TAU, d = R * Math.sqrt(H(i * 18 + k, 43)) * 0.8; x.fillStyle = 'rgba(110,60,18,0.45)'; x.beginPath(); x.arc(u + Math.cos(an) * d, v + Math.sin(an) * d, P * (0.014 + H(k, i) * 0.012), 0, TAU); x.fill(); } // aburaage pores
          x.strokeStyle = 'rgba(120,70,20,0.5)'; x.lineWidth = lw(0.016); for (let k = 0; k < 6; k++) { const an = k / 6 * TAU + 0.3; x.beginPath(); x.moveTo(u, v - R * 0.25); x.quadraticCurveTo(u + Math.cos(an) * R * 0.5, v - R * 0.25 + Math.sin(an) * R * 0.3, u + Math.cos(an) * R * 0.75, v + Math.sin(an) * R * 0.6); x.stroke(); } // gathered pleats
          x.strokeStyle = '#e8d8a8'; x.lineWidth = lw(0.05); x.beginPath(); x.ellipse(u, v - R * 0.28, R * 0.22, R * 0.08, 0, 0, TAU); x.stroke(); x.beginPath(); x.moveTo(u + R * 0.18, v - R * 0.3); x.quadraticCurveTo(u + R * 0.42, v - R * 0.5, u + R * 0.36, v - R * 0.62); x.stroke();
          x.fillStyle = 'rgba(255,236,190,0.5)'; ellipse(x, u - R * 0.42, v - R * 0.05, R * 0.14, R * 0.07, -0.8); x.fill(); } });
        M.form('rgba(255,220,160,0.2)', 'rgba(40,16,0,0.4)'); break; }
      case 'hanpen': { M.fill('#cfc8bc'); M.piece(() => { // fluffy white fish-cake squares
        for (const [a, c] of M.cells) { const s0 = P * 0.9, cx = (a + 0.5) * P + (H(a * 5 + c, 1) - 0.5) * P * 0.03, cy = (c + 0.5) * P + (H(a * 5 + c, 2) - 0.5) * P * 0.03, rot = (H(a + c * 3, 3) - 0.5) * 0.08;
          x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = 'rgba(60,50,40,0.35)'; roundRect(x, -s0 / 2 + P * 0.02, -s0 / 2 + P * 0.035, s0, s0, s0 * 0.16); x.fill();
          x.fillStyle = M.lin(-s0 / 2, -s0 / 2, s0 / 2, s0 / 2, [[0, '#ffffff'], [0.6, '#f6f2ea'], [1, '#dcd4c4']]); roundRect(x, -s0 / 2, -s0 / 2, s0, s0, s0 * 0.16); x.fill();
          if (!small) for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(190,180,160,0.4)'; ellipse(x, (H(a * 30 + k + c * 7, 4) - 0.5) * s0 * 0.86, (H(a * 30 + k + c * 5, 5) - 0.5) * s0 * 0.86, P * 0.016, P * 0.01, H(k, 6) * 3); x.fill(); } // airy pores
          x.fillStyle = 'rgba(232,210,160,0.35)'; roundRect(x, -s0 / 2, s0 * 0.34, s0, s0 * 0.16, s0 * 0.08); x.fill(); // a faint dashi line at the base
          x.fillStyle = 'rgba(255,255,255,0.75)'; roundRect(x, -s0 * 0.38, -s0 * 0.4, s0 * 0.5, s0 * 0.1, s0 * 0.05); x.fill(); x.restore(); } });
        M.form('rgba(255,255,255,0.22)', 'rgba(80,70,50,0.3)'); break; }
    }
  },
});
