/* ---- Golden Arches blocks MADE OF fast food (FoodMass) — v2 ----
   One continuous food mass per piece, drawn in whole-piece space (shape/rotation info), no clip-art:
   I fries (a pile of loose sticks along the piece) · O burger (side view: bun, sesame, lettuce, cheese, charred patty)
   · T soft serve (piped ridges) · S chicken nuggets (craggy breaded crust) · Z hot apple pie (blistered fried pastry,
   crimped edges, filling showing through the slits) · J cola (depth-graded, fizz streams, foam head)
   · L breakfast pancake stack (layers, syrup running off the top). */
const FastFood = (() => {
  const C3 = { fries: ['#f1c046', '#f8d870', '#c8901e'], burger: ['#d89a4a', '#f0bc6a', '#a86a24'], softserve: ['#f6efe0', '#ffffff', '#d8ccb6'], nugget: ['#d48a2c', '#e8ac52', '#9a5a18'], pie: ['#d29a4c', '#eabc74', '#9a642c'], cola: ['#4a1e14', '#7a3a1e', '#24100a'], pancake: ['#e6b46a', '#f4d29a', '#a8682c'] };
  const M = FoodMass({
    FOOD: [null, 'fries', 'burger', 'softserve', 'nugget', 'pie', 'cola', 'pancake'],
    MAIN: [null, '#f1c046', '#d89a4a', '#f6efe0', '#d48a2c', '#dcae62', '#4a1e14', '#e6b46a'],
    soft: { fries: 1.1, burger: 1.3, softserve: 1.6, nugget: 1.2, pie: 1.3, cola: 1.4, pancake: 1.4 },
    shape: true, diag: true, depth: true, R: 0.2,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q, dr = Q.dr || 0, dn = Q.dn || 1;
      const [c0, c1, c2] = C3[food], lw = (k) => Math.max(1, P * k);
      const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]];
      let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
      const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P;
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(53, i, k);
      const form = (hi, lo, w = 0.2) => {
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
      };
      switch (food) {
        case 'fries': { // loose pile of sticks running along the piece, different lengths and doneness
          fill('#b88420');
          piece(() => { const n = Math.round((BW * BH) / (P * P) * 9), tones = ['#f6cf55', '#f1c046', '#eab43c', '#f8da74', '#e4a832'];
            for (let i = 0; i < n; i++) { const len = P * (1.0 + H(i, 1) * 1.6), th = P * (0.15 + H(i, 2) * 0.05), a = (H(i, 3) - 0.5) * 0.22;
              const u = X0 + H(i, 4) * BW, v = Y0 + H(i, 5) * BH; x.save(); x.translate(u, v); x.rotate(wide ? a : Math.PI / 2 + a);
              x.fillStyle = tones[i % 5]; x.fillRect(-len / 2, -th / 2, len, th);
              x.fillStyle = 'rgba(150,90,10,0.38)'; x.fillRect(-len / 2, th / 2 - th * 0.28, len, th * 0.28);
              x.fillStyle = 'rgba(255,240,180,0.45)'; x.fillRect(-len / 2, -th / 2, len, th * 0.18);
              x.fillStyle = 'rgba(176,110,24,0.75)'; x.fillRect(-len / 2, -th / 2, th * 0.35, th); x.fillRect(len / 2 - th * 0.35, -th / 2, th * 0.35, th); x.restore(); }
            x.fillStyle = 'rgba(255,255,255,0.7)'; for (let i = 0; i < n * 0.6; i++) x.fillRect(X0 + H(i, 6) * BW, Y0 + H(i, 7) * BH, lw(0.022), lw(0.022)); });
          form('rgba(255,240,190,0.25)', 'rgba(110,60,0,0.35)'); break; }
        case 'burger': { // side view across the whole piece height
          piece(() => { const yb = (f) => Y0 + BH * f;
            x.fillStyle = lin(0, yb(0), 0, yb(0.34), [[0, '#f2c070'], [0.6, '#dc9a46'], [1, '#c4823a']]); x.fillRect(X0 - 4, yb(0) - 4, BW + 8, yb(0.34) - yb(0) + 4);
            for (let i = 0; i < 14; i++) { const sx = X0 + P * 0.15 + H(i, 1) * (BW - P * 0.3), sy = yb(0.05 + H(i, 2) * 0.2); x.fillStyle = '#fbf0d2'; x.beginPath(); x.ellipse(sx, sy, P * 0.05, P * 0.028, (H(i, 3) - 0.5) * 1.2, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,110,50,0.4)'; x.beginPath(); x.ellipse(sx + P * 0.01, sy + P * 0.018, P * 0.04, P * 0.012, (H(i, 3) - 0.5) * 1.2, 0, TAU); x.fill(); }
            x.fillStyle = '#4e9a34'; x.beginPath(); x.moveTo(X0 - 4, yb(0.33)); for (let k = 0; k <= 16; k++) { const xx = X0 - 4 + (BW + 8) * k / 16; x.lineTo(xx, yb(0.42) + Math.sin(k * 2.3) * P * 0.05); } x.lineTo(X0 + BW + 4, yb(0.33)); x.closePath(); x.fill();
            x.fillStyle = '#f2b628'; x.fillRect(X0 - 4, yb(0.4), BW + 8, yb(0.47) - yb(0.4)); for (let i = 0; i < 3; i++) { const dx = X0 + BW * (0.2 + i * 0.3 + (H(i, 4) - 0.5) * 0.1), dl = P * (0.1 + H(i, 5) * 0.12); x.beginPath(); x.moveTo(dx - P * 0.1, yb(0.46)); x.quadraticCurveTo(dx - P * 0.05, yb(0.46) + dl, dx, yb(0.46) + dl); x.quadraticCurveTo(dx + P * 0.05, yb(0.46) + dl, dx + P * 0.1, yb(0.46)); x.fill(); }
            x.fillStyle = '#5a2e18'; x.fillRect(X0 - 4, yb(0.47), BW + 8, yb(0.76) - yb(0.47)); x.save(); x.beginPath(); x.rect(X0 - 4, yb(0.47), BW + 8, yb(0.76) - yb(0.47)); x.clip();
            for (let i = 0; i < 3; i++) { const dx = X0 + BW * (0.2 + i * 0.3 + (H(i, 4) - 0.5) * 0.1), dl = P * (0.06 + H(i, 5) * 0.12); x.fillStyle = '#f2b628'; x.beginPath(); x.moveTo(dx - P * 0.08, yb(0.47)); x.quadraticCurveTo(dx, yb(0.47) + dl * 2, dx + P * 0.08, yb(0.47)); x.fill(); }
            x.fillStyle = 'rgba(30,12,4,0.5)'; for (let i = 0; i < 20; i++) x.fillRect(X0 + H(i, 8) * BW, yb(0.5 + H(i, 9) * 0.24), P * (0.08 + H(i, 10) * 0.12), lw(0.025)); x.fillStyle = 'rgba(140,80,40,0.35)'; for (let i = 0; i < 12; i++) x.fillRect(X0 + H(i, 11) * BW, yb(0.52 + H(i, 12) * 0.2), P * 0.06, lw(0.02)); x.restore();
            x.fillStyle = lin(0, yb(0.76), 0, yb(1), [[0, '#e8b064'], [1, '#c48440']]); x.fillRect(X0 - 4, yb(0.76), BW + 8, yb(1) - yb(0.76) + 4); x.fillStyle = 'rgba(255,240,200,0.3)'; x.fillRect(X0 - 4, yb(0.76), BW + 8, lw(0.03)); });
          form('rgba(255,230,180,0.2)', 'rgba(80,40,10,0.3)'); break; }
        case 'softserve': { // piped ridges that wind diagonally through the piece
          fill(c0);
          piece(() => { for (let k = -10; k <= 14; k++) { const y0 = Y0 + k * P * 0.36; x.lineCap = 'round';
            x.strokeStyle = 'rgba(196,178,146,0.55)'; x.lineWidth = P * 0.07; x.beginPath(); for (let j = 0; j <= 20; j++) { const xx = X0 - P + (BW + 2 * P) * j / 20, yy = y0 + (xx - X0) * 0.32 + Math.sin(j * 0.9 + k) * P * 0.04 + P * 0.06; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke();
            x.strokeStyle = 'rgba(255,255,252,0.85)'; x.lineWidth = P * 0.05; x.beginPath(); for (let j = 0; j <= 20; j++) { const xx = X0 - P + (BW + 2 * P) * j / 20, yy = y0 + (xx - X0) * 0.32 + Math.sin(j * 0.9 + k) * P * 0.04; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } x.lineCap = 'butt'; });
          form('rgba(255,255,255,0.3)', 'rgba(120,100,70,0.3)'); break; }
        case 'nugget': { // craggy breaded crust: overlapping lumps and crumbs
          fill(c0);
          piece(() => { const n = Math.round((BW * BH) / (P * P) * 30), tones = ['#dc9c42', '#d08c30', '#e2a84e', '#c8822a', '#d89838'];
            const blob = (u, v, rr, k) => { x.beginPath(); for (let j = 0; j < 7; j++) { const an = j / 7 * TAU, q = rr * (0.7 + H(k, j + 20) * 0.5); j ? x.lineTo(u + Math.cos(an) * q, v + Math.sin(an) * q) : x.moveTo(u + Math.cos(an) * q, v + Math.sin(an) * q); } x.closePath(); };
            for (let i = 0; i < n; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, rr = P * (0.06 + H(i, 3) * 0.07); x.fillStyle = 'rgba(110,52,8,0.28)'; blob(u + rr * 0.18, v + rr * 0.22, rr, i); x.fill(); x.fillStyle = tones[i % 5]; blob(u, v, rr, i); x.fill(); if (H(i, 9) < 0.35) { x.fillStyle = 'rgba(245,205,130,0.3)'; blob(u - rr * 0.2, v - rr * 0.25, rr * 0.4, i + 50); x.fill(); } }
            for (let i = 0; i < n * 1.5; i++) { x.fillStyle = i % 3 ? 'rgba(110,56,10,0.45)' : 'rgba(255,230,170,0.6)'; x.fillRect(X0 + H(i, 4) * BW, Y0 + H(i, 5) * BH, lw(0.03), lw(0.03)); } });
          form('rgba(255,220,150,0.2)', 'rgba(90,40,0,0.4)'); break; }
        case 'pie': { // fried pastry: blisters, crimped exposed edges, filling through diagonal slits
          fill(c0);
          piece(() => { const n = Math.round((BW * BH) / (P * P) * 22);
            for (let i = 0; i < n; i++) { const u = X0 + H(i, 1) * BW, v = Y0 + H(i, 2) * BH, rr = P * (0.025 + H(i, 3) * 0.045); x.fillStyle = 'rgba(150,96,40,0.35)'; x.beginPath(); x.ellipse(u + rr * 0.25, v + rr * 0.3, rr, rr * 0.75, 0, 0, TAU); x.fill(); x.fillStyle = 'rgba(240,200,130,0.75)'; x.beginPath(); x.ellipse(u, v, rr, rr * 0.75, 0, 0, TAU); x.fill(); }
            const ns = Math.max(2, Math.round(cells.length * 0.75)); for (let i = 0; i < ns; i++) { const [a, c] = cells[Math.floor(H(i, 6) * cells.length)], u = (a + 0.5) * P + (H(i, 7) - 0.5) * P * 0.3, v = (c + 0.5) * P + (H(i, 8) - 0.5) * P * 0.3; x.save(); x.translate(u, v); x.rotate(-0.5); x.fillStyle = 'rgba(250,214,150,0.55)'; x.beginPath(); x.ellipse(0, -P * 0.035, P * 0.3, P * 0.035, 0, 0, TAU); x.fill(); x.fillStyle = '#6e2410'; x.beginPath(); x.moveTo(-P * 0.3, 0); x.quadraticCurveTo(0, -P * 0.07, P * 0.3, 0); x.quadraticCurveTo(0, P * 0.06, -P * 0.3, 0); x.fill(); x.fillStyle = 'rgba(110,60,20,0.35)'; x.beginPath(); x.ellipse(0, P * 0.035, P * 0.28, P * 0.025, 0, 0, TAU); x.fill(); x.restore(); } });
          x.fillStyle = 'rgba(130,76,26,0.32)'; const fk = (x0, y0, dx, dy, ox, oy) => { for (let k = 0; k < 6; k++) { x.fillRect(x0 + dx * k, y0 + dy * k, ox, oy); x.fillRect(x0 + dx * k + (dx ? lw(0.05) : 0), y0 + dy * k + (dy ? lw(0.05) : 0), ox, oy); } };
          if (!(mask & N)) fk(l + P * 0.04, t + P * 0.05, P * 0.17, 0, lw(0.022), P * 0.09); if (!(mask & S)) fk(l + P * 0.04, b - P * 0.14, P * 0.17, 0, lw(0.022), P * 0.09);
          if (!(mask & W)) fk(l + P * 0.05, t + P * 0.04, 0, P * 0.17, P * 0.09, lw(0.022)); if (!(mask & E)) fk(r - P * 0.14, t + P * 0.04, 0, P * 0.17, P * 0.09, lw(0.022));
          form('rgba(255,240,200,0.25)', 'rgba(100,60,20,0.35)'); break; }
        case 'cola': { // dark soda: lighter at the top, fizz streams, tan foam head
          const yTop = t - dr * P, yBot = yTop + dn * P; x.fillStyle = lin(0, yTop, 0, yBot, [[0, '#8a4424'], [0.35, '#4a1e14'], [1, '#24100a']]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
          piece(() => { for (let st = 0; st < Math.round(BW / P * 1.6); st++) { const sx = X0 + P * 0.2 + H(st, 1) * (BW - P * 0.4); for (let k = 0; k < 18; k++) { const yy = Y0 + BH - k * BH / 18 - H(st, k) * P * 0.1; if (!cells.some(([a, c]) => sx >= a * P && sx < (a + 1) * P && yy >= c * P && yy < (c + 1) * P)) continue; x.fillStyle = 'rgba(240,210,170,0.45)'; x.beginPath(); x.arc(sx + Math.sin(k * 1.3 + st) * P * 0.03, yy, P * (0.012 + k * 0.0016), 0, TAU); x.fill(); } } });
          if (!(mask & N)) { const fb = t + P * 0.2; x.fillStyle = lin(0, t, 0, fb + P * 0.05, [[0, '#ecd6b4'], [0.75, '#c89c70'], [1, 'rgba(160,110,70,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, fb - t + P * 0.05 + 2); if (!small) for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(255,248,232,0.6)'; x.beginPath(); x.arc(C(0.05 + H(vr + i, 2) * 0.9), t + P * (0.04 + H(vr + i, 3) * 0.12), P * (0.02 + H(vr + i, 4) * 0.02), 0, TAU); x.fill(); } }
          form('rgba(255,220,180,0.12)', 'rgba(0,0,0,0.3)'); break; }
        case 'pancake': { // stack of pancakes: layers along the piece's height, syrup off the top
          fill('#f2cc90');
          piece(() => { const lh = P * 0.27; for (let y = Y0 - lh; y < Y0 + BH + lh; y += lh) { const wv = (xx) => Math.sin(xx / P * 2.1 + y) * P * 0.02;
              x.fillStyle = '#f4d49e'; x.fillRect(X0 - 4, y, BW + 8, lh); x.fillStyle = '#a8682c'; x.beginPath(); x.moveTo(X0 - 4, y + lh * 0.82); for (let j = 0; j <= 12; j++) { const xx = X0 - 4 + (BW + 8) * j / 12; x.lineTo(xx, y + lh * 0.82 + wv(xx)); } x.lineTo(X0 + BW + 4, y + lh + 1); x.lineTo(X0 - 4, y + lh + 1); x.closePath(); x.fill();
              x.fillStyle = '#d0904a'; x.fillRect(X0 - 4, y, BW + 8, lh * 0.14); x.fillStyle = 'rgba(200,150,90,0.35)'; for (let i = 0; i < 6; i++) x.fillRect(X0 + H(i, Math.round(y)) * BW, y + lh * (0.35 + H(i, 9) * 0.3), lw(0.03), lw(0.03)); }
            // syrup over the topmost cells and running down the sides
            const top = Math.min(...cells.map(([, c]) => c)); for (const [a, c] of cells) { if (cells.some(([a2, c2]) => a2 === a && c2 === c - 1)) continue; const sx = a * P, sy = c * P; x.fillStyle = '#9a5214'; x.beginPath(); x.moveTo(sx - 2, sy - 2); x.lineTo(sx + P + 2, sy - 2); x.lineTo(sx + P + 2, sy + P * 0.16); for (let k = 3; k >= 0; k--) { const dx = sx + P * (k + 0.5) / 4, dl = P * (0.16 + H(a * 7 + k, c) * (c === top ? 0.45 : 0.2)); x.quadraticCurveTo(dx + P * 0.1, sy + dl, dx, sy + dl); x.quadraticCurveTo(dx - P * 0.1, sy + dl, dx - P * 0.12, sy + P * 0.16); } x.lineTo(sx - 2, sy + P * 0.16); x.closePath(); x.fill(); x.fillStyle = 'rgba(210,140,60,0.4)'; x.fillRect(sx, sy + P * 0.04, P, lw(0.025)); } });
          form('rgba(255,240,200,0.2)', 'rgba(100,50,10,0.3)'); break; }
      }
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, small } = o;
      // (no steam wisps: they read as grey smudges on the dark board)
      if (!small && food === 'cola') { const u = (T * 0.6 + seed * 0.37) % 1; c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.arc(((seed * 7) % 5 / 5 - 0.5) * s * 0.6, s * 0.35 - u * s * 0.7, s * 0.03, 0, TAU); c.fill(); }
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, [c0, c1, c2] = C3[food];
      if (food === 'cola') { push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 }); for (let i = 0; i < 4; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.8, y: Y, vx: 0, vy: -s * (2 + r(i + 13) * 2), g: -1, life: 0.8, r: 0.05 + r(i) * 0.05 }); return true; }
      if (food === 'fries') { push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1.2, rot: 0, vr: dir * 3, life: 0.8, vrr: vr }); for (let i = 0; i < 4; i++) push({ k: 'crumb', col: c1, x: X, y: Y, vx: (r(i) - 0.5) * s * 4, vy: -s * (2 + r(i + 3) * 2), life: 0.7 }); return true; }
      if (food === 'softserve' || food === 'pancake') { push({ k: 'melt', v, x: X, y: Y, vx: dir * s * 0.6, vy: -s * 0.4, rot: 0, vr: dir * 0.6, life: 0.7, vrr: vr }); for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.07, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 7) * 2.5), life: 0.7 }); return true; }
      push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2.5 + r(1) * 2), vy: -s * 1.4, rot: 0, vr: dir * 6, life: 0.9, vrr: vr }); for (let i = 0; i < 3; i++) push({ k: 'crumb', col: i % 2 ? c1 : c2, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * 2, life: 0.6 });
      return true;
    },
  });
  return M;
})();
SKINSETS.fastfood = FastFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'fastfood'); if (st) { st.palette = FastFood.MAIN.slice(1); st.desc = 'Flat geometric roadside burger joint (fan tribute): a sizzling grill line, a beeping fryer, a drive-thru window and menu boards that flip from breakfast to lunch — a bouncy original pop groove.'; } })();
