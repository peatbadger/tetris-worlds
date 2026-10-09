/* ---- Tiki Beach Shack blocks: seven tropical fruits, each piece one continuous mass of flesh ----
   I acai (deep purple, blueberries) · O dragon fruit (magenta, black seeds) · T watermelon (red, seeds, rind on the real bottom)
   · S kiwi (green, seed rays along a pale core) · Z papaya (orange, seed channel) · J pineapple (golden chunks) · L coconut (white flesh, shell on exposed edges) */
const TikiFood = remakeFood('tiki', {
  premiumOpts: { desatAll: 0.07, desat: { watermelon: 0.04, papaya: 0.03, dragon: 0.14 }, lift: { papaya: 'brightness(0.88) contrast(1.08) saturate(1.05)', dragon: 'contrast(1.08) brightness(0.97)', watermelon: 'brightness(1.02) contrast(1.08) saturate(1.06)' } }, // muted, adult palette (QA r3)
  FOOD: [null, 'acai', 'dragon', 'watermelon', 'kiwi', 'papaya', 'pineapple', 'coconut'],
  MAIN: [null, '#4a1e4a', '#c85088', '#c8364a', '#5a9620', '#e8843a', '#e8cc5a', '#f4f0e6'],
  soft: { acai: 1.4, dragon: 1.1, watermelon: 1.1, kiwi: 1.1, papaya: 1.1, pineapple: 1.0, coconut: 0.9 },
  boardBg: 'rgba(14,30,40,0.93)', grid: 'rgba(200,250,255,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 61), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'acai': { M.fill('#4a1e4a'); M.piece(() => {
        M.axis((len, sp) => { x.strokeStyle = 'rgba(130,70,140,0.45)'; x.lineWidth = P * 0.08; x.lineCap = 'round'; for (let k = 0; k < sp / P * 2.2; k++) { const v = (k + 0.5) * P / 2.2; x.beginPath(); for (let i = 0; i <= 20; i++) { const u = -P * 0.3 + (len + P * 0.6) * i / 20; const vv = v + Math.sin(u / P * 2 + k * 1.7) * P * 0.08; i ? x.lineTo(u, vv) : x.moveTo(u, vv); } x.stroke(); } });
        for (const [u, v, i] of M.pts(A * 3, 3, 0.12)) { const rr = P * (0.07 + H(i, 9) * 0.03); x.fillStyle = '#26204a'; x.beginPath(); x.arc(u, v, rr, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,170,230,0.55)'; x.beginPath(); x.arc(u - rr * 0.35, v - rr * 0.35, rr * 0.28, 0, TAU); x.fill(); }
        if (!small) { x.fillStyle = 'rgba(240,220,170,0.8)'; for (const [u, v] of M.pts(A * 4, 11)) x.fillRect(u, v, lw(0.025), lw(0.02)); } });
        M.form('rgba(200,150,210,0.18)', 'rgba(10,0,14,0.4)'); break; }
      case 'dragon': { M.fill('#e4d6da'); M.piece(() => { // white dragon-fruit flesh, black seeds with a soft grey halo
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, 'rgba(250,244,246,0.35)'], [1, 'rgba(205,180,195,0.4)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 50, 5, 0.02)) { const a = H(i, 7) * 3; x.fillStyle = 'rgba(120,100,115,0.2)'; ellipse(x, u, v, P * 0.04, P * 0.03, a); x.fill(); x.fillStyle = '#16100e'; ellipse(x, u, v, P * 0.021, P * 0.014, a); x.fill(); } });
        // magenta skin on the exposed edges, flesh blushing pink just inside it, little green-tipped scales
        { const { mask, l, t, r, b, N, E, S, W } = Q, sk = P * 0.12, bl = P * 0.12;
          const side = (ex, f) => { if (!ex) f(); };
          x.save();
          side(mask & N, () => { x.fillStyle = M.lin(0, t + sk, 0, t + sk + bl, [[0, 'rgba(200,80,140,0.4)'], [1, 'rgba(200,80,140,0)']]); x.fillRect(l - 2, t + sk, r - l + 4, bl); });
          side(mask & S, () => { x.fillStyle = M.lin(0, b - sk, 0, b - sk - bl, [[0, 'rgba(200,80,140,0.4)'], [1, 'rgba(200,80,140,0)']]); x.fillRect(l - 2, b - sk - bl, r - l + 4, bl); });
          side(mask & W, () => { x.fillStyle = M.lin(l + sk, 0, l + sk + bl, 0, [[0, 'rgba(200,80,140,0.4)'], [1, 'rgba(200,80,140,0)']]); x.fillRect(l + sk, t - 2, bl, b - t + 4); });
          side(mask & E, () => { x.fillStyle = M.lin(r - sk, 0, r - sk - bl, 0, [[0, 'rgba(200,80,140,0.4)'], [1, 'rgba(200,80,140,0)']]); x.fillRect(r - sk - bl, t - 2, bl, b - t + 4); });
          x.fillStyle = '#a83466'; if (!(mask & N)) x.fillRect(l - 2, t - 2, r - l + 4, sk + 2); if (!(mask & S)) x.fillRect(l - 2, b - sk, r - l + 4, sk + 2); if (!(mask & W)) x.fillRect(l - 2, t - 2, sk + 2, b - t + 4); if (!(mask & E)) x.fillRect(r - sk, t - 2, sk + 2, b - t + 4);
          if (!small) { const sc = (cx, cy, ang) => { x.save(); x.translate(cx, cy); x.rotate(ang); x.fillStyle = '#c8588c'; GeoKit.poly(x, [-P * 0.07, P * 0.03, P * 0.07, P * 0.03, P * 0.02, -P * 0.06]); x.fill(); x.fillStyle = '#7aa83a'; GeoKit.poly(x, [-P * 0.012, -P * 0.035, P * 0.03, -P * 0.035, P * 0.02, -P * 0.06]); x.fill(); x.restore(); };
            for (let k = 0; k < 3; k++) { const f = (k + 0.5 + (M.H(k, 41) - 0.5) * 0.3) / 3; if (!(mask & N)) sc(l + (r - l) * f, t + sk * 0.55, 0); if (!(mask & S)) sc(l + (r - l) * f, b - sk * 0.55, Math.PI); if (!(mask & W)) sc(l + sk * 0.55, t + (b - t) * f, -Math.PI / 2); if (!(mask & E)) sc(r - sk * 0.55, t + (b - t) * f, Math.PI / 2); } }
          x.restore(); }
        M.form('rgba(255,255,255,0.18)', 'rgba(90,20,50,0.3)'); break; }
      case 'watermelon': { M.fill('#c8364a'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.3, Math.max(BW, BH) * 0.8, [[0, 'rgba(255,130,150,0.24)'], [1, 'rgba(110,0,24,0.26)']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 6, 13, 0.05)) { x.fillStyle = 'rgba(255,150,165,0.16)'; M.blob(u, v, P * 0.18, i, 7); x.fill(); }
        for (const [u, v, i] of M.pts(A * 3, 17, 0.18)) { x.save(); x.translate(u, v); x.rotate((H(i, 19) - 0.5) * 0.8); x.fillStyle = '#2a1410'; x.beginPath(); x.moveTo(0, -P * 0.06); x.quadraticCurveTo(P * 0.04, 0, 0, P * 0.05); x.quadraticCurveTo(-P * 0.04, 0, 0, -P * 0.06); x.fill(); x.restore(); }
        if (!small) for (const [u, v, i] of M.pts(A * 2, 41, 0.15)) { x.fillStyle = 'rgba(255,235,240,0.32)'; ellipse(x, u, v, P * (0.14 + H(i, 42) * 0.08), P * 0.035, -0.45); x.fill(); x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.arc(u + P * 0.12, v - P * 0.04, P * 0.022, 0, TAU); x.fill(); } // juicy wet sheen
        for (const [a, c] of M.bots()) { const sy = (c + 1) * P; x.fillStyle = '#e4e2c4'; x.fillRect(a * P - 1, sy - P * 0.26, P + 2, P * 0.1); x.fillStyle = '#4a8a3c'; x.fillRect(a * P - 1, sy - P * 0.17, P + 2, P * 0.17); x.fillStyle = '#2a6a2a'; for (let k = 0; k < 4; k++) x.fillRect(a * P + k * P * 0.25 + P * 0.05, sy - P * 0.17, P * 0.08, P * 0.17); } });
        M.form('rgba(255,200,200,0.2)', 'rgba(80,0,10,0.35)'); break; }
      case 'kiwi': { M.fill('#5a9620'); M.piece(() => {
        x.fillStyle = M.rad(X0 + BW / 2, Y0 + BH / 2, Math.max(BW, BH) * 0.7, [[0, 'rgba(150,200,80,0.25)'], [1, 'rgba(30,70,0,0.35)']]); M.all(x.fillStyle);
        const sk = M.skel(); x.lineCap = 'round';
        x.strokeStyle = 'rgba(170,210,100,0.4)'; x.lineWidth = P * 0.42; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        x.strokeStyle = '#eef4c8'; x.lineWidth = P * 0.15; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        sk.forEach(([a, b, c2, d], k) => { const dx = Math.sign(c2 - a), dy = Math.sign(d - b); for (let i = 0; i < 7; i++) { const u = (i + 0.5) / 7, px = a + (c2 - a) * u, py = b + (d - b) * u; for (const sd of [-1, 1]) { const o = P * (0.17 + H(k * 9 + i, sd + 3) * 0.05); x.fillStyle = '#1a1a10'; ellipse(x, px - dy * sd * o, py + dx * sd * o, P * (dy ? 0.034 : 0.016), P * (dy ? 0.016 : 0.034), 0); x.fill(); } } }); });
        M.form('rgba(230,255,190,0.2)', 'rgba(20,50,0,0.4)'); break; }
      case 'papaya': { M.fill('#e8843a'); M.piece(() => { // warm orange papaya flesh (deeper than the lemon pineapple)
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.3, Math.max(BW, BH) * 0.8, [[0, 'rgba(255,190,120,0.34)'], [1, 'rgba(180,70,20,0.3)']]); M.all(x.fillStyle);
        const sk = M.skel(); x.lineCap = 'round';
        x.strokeStyle = '#f4ae72'; x.lineWidth = P * 0.36; x.beginPath(); for (const [a, b, c2, d] of sk) { x.moveTo(a, b); x.lineTo(c2, d); } x.stroke();
        sk.forEach(([a, b, c2, d], k) => { for (let i = 0; i < 9; i++) { const u = (i + 0.5) / 9, px = a + (c2 - a) * u + (H(k * 11 + i, 5) - 0.5) * P * 0.12, py = b + (d - b) * u + (H(k * 11 + i, 6) - 0.5) * P * 0.12; x.fillStyle = '#2a1a14'; x.beginPath(); x.arc(px, py, P * 0.05, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(px - P * 0.015, py - P * 0.015, P * 0.014, 0, TAU); x.fill(); } }); });
        M.form('rgba(255,220,170,0.22)', 'rgba(110,40,0,0.35)'); break; }
      case 'pineapple': { M.fill('#c8a434'); M.piece(() => { // pale lemon pineapple chunks with fibrous grain
        x.strokeStyle = 'rgba(250,236,170,0.22)'; x.lineWidth = lw(0.012); for (let k = 0; k < (BW + BH) / (P * 0.07); k++) { const o = k * P * 0.07; x.beginPath(); x.moveTo(X0 + o, Y0); x.lineTo(X0 + o - BH * 0.4, Y0 + BH); x.stroke(); }
        for (const [u, v, i] of M.pts(A * 5, 21, 0.1)) { x.save(); x.translate(u, v); x.rotate(H(i, 23) * 3); const q = P * (0.16 + H(i, 24) * 0.06); x.fillStyle = '#a08424'; roundRect(x, -q + P * 0.02, -q * 0.7 + P * 0.03, q * 2, q * 1.4, q * 0.3); x.fill(); x.fillStyle = H(i, 25) < 0.5 ? '#eed870' : '#e6cc5c'; roundRect(x, -q, -q * 0.7, q * 2, q * 1.4, q * 0.3); x.fill();
          x.strokeStyle = 'rgba(190,150,50,0.5)'; x.lineWidth = lw(0.015); for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(-q * 0.8, k * q * 0.22); x.lineTo(q * 0.8, k * q * 0.22); x.stroke(); } x.fillStyle = 'rgba(255,250,200,0.5)'; roundRect(x, -q * 0.7, -q * 0.6, q * 1.2, q * 0.3, q * 0.15); x.fill(); x.restore(); } });
        M.form('rgba(255,250,200,0.22)', 'rgba(100,60,0,0.35)'); break; }
      case 'coconut': { M.fill('#f6f3ec'); M.piece(() => { // coconut meat: fine radial fibres, a cool wet sheen
        if (!small) { x.strokeStyle = 'rgba(190,180,160,0.32)'; x.lineWidth = lw(0.012); for (const [u, v, i] of M.pts(A * 10, 27)) { const a = H(i, 28) * 0.6 - 0.3; x.beginPath(); x.moveTo(u, v); x.lineTo(u + Math.cos(a) * P * 0.14, v + Math.sin(a) * P * 0.14); x.stroke(); } }
        x.fillStyle = 'rgba(235,245,255,0.55)'; for (const [u, v, i] of M.pts(A * 2, 31, 0.2)) { M.blob(u, v, P * 0.15, i, 7); x.fill(); } });
        // thick hairy brown shell on the exposed edges with a tan seed-coat line between shell and meat
        { const { mask, l, t, r, b, N, E, S, W } = Q, sh = P * 0.17, tc = P * 0.035;
          x.fillStyle = '#c8a678'; if (!(mask & S)) x.fillRect(l - 2, b - sh - tc, r - l + 4, tc + 1); if (!(mask & W)) x.fillRect(l + sh, t - 2, tc, b - t + 4); if (!(mask & E)) x.fillRect(r - sh - tc, t - 2, tc, b - t + 4); if (!(mask & N)) x.fillRect(l - 2, t + sh * 0.7, r - l + 4, tc);
          x.fillStyle = '#5a3418'; if (!(mask & S)) x.fillRect(l - 2, b - sh, r - l + 4, sh + 2); if (!(mask & W)) x.fillRect(l - 2, t - 2, sh + 2, b - t + 4); if (!(mask & E)) x.fillRect(r - sh, t - 2, sh + 2, b - t + 4); if (!(mask & N)) x.fillRect(l - 2, t - 2, r - l + 4, sh * 0.7 + 2);
          if (!small) { x.strokeStyle = 'rgba(150,100,60,0.55)'; x.lineWidth = lw(0.012); x.beginPath(); for (let k = 0; k < 26; k++) { const f = M.H(k, 51), g = M.H(k, 52), ln = P * (0.05 + M.H(k, 53) * 0.06), a = (M.H(k, 54) - 0.5) * 1.2;
              const hair = (px, py, ang) => { x.moveTo(px, py); x.lineTo(px + Math.cos(ang) * ln, py + Math.sin(ang) * ln); };
              if (!(mask & S)) hair(l + (r - l) * f, b - sh * g, 0.3 + a); if (!(mask & W)) hair(l + sh * g, t + (b - t) * f, 1.3 + a); if (!(mask & E)) hair(r - sh * g, t + (b - t) * f, 1.8 + a); if (!(mask & N)) hair(l + (r - l) * f, t + sh * 0.7 * g, 0.2 + a); } x.stroke(); } }
        M.form('rgba(255,255,255,0.18)', 'rgba(90,70,40,0.3)'); break; }
    }
  },
});
