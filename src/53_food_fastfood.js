/* ---- Golden Arches blocks MADE OF fast food (FoodMass) — v2 ----
   One continuous food mass per piece, drawn in whole-piece space (shape/rotation info), no clip-art:
   I fries (a pile of loose sticks along the piece) · O burger (side view: bun, sesame, lettuce, cheese, charred patty)
   · T soft serve (piped ridges) · S chicken nuggets (craggy breaded crust) · Z hot apple pie (blistered fried pastry,
   crimped edges, filling showing through the slits) · J cola (depth-graded, fizz streams, foam head)
   · L breakfast pancake stack (layers, syrup running off the top). */
const FastFood = (() => {
  const C3 = { fries: ['#f1c046', '#f8d870', '#c8901e'], burger: ['#d89a4a', '#f0bc6a', '#a86a24'], softserve: ['#f6efe0', '#ffffff', '#d8ccb6'], nugget: ['#d48a2c', '#e8ac52', '#9a5a18'], pie: ['#d29a4c', '#eabc74', '#9a642c'], cola: ['#4a1e14', '#7a3a1e', '#24100a'], pancake: ['#e6b46a', '#f4d29a', '#a8682c'] };
  const M = FoodMass({
    premiumOpts: { lift: { pancake: 'brightness(1.16) contrast(1.08)', nugget: 'brightness(1.0) contrast(1.1) saturate(1.1)', burger: 'brightness(0.76) contrast(1.15) saturate(1.1)', cola: 'brightness(0.72) contrast(1.15)', pie: 'brightness(1.0) contrast(1.1) saturate(1.05)' } },
    FOOD: [null, 'fries', 'burger', 'softserve', 'nugget', 'pie', 'cola', 'pancake'],
    MAIN: [null, '#f2c22c', '#8a4a22', '#f8eccc', '#e0a040', '#c81e16', '#3a160e', '#e6b46a'],
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
        case 'fries': { // a red carton (lower part of the piece) packed with golden fries standing up out of it
          fill('#c8201a');
          piece(() => { const cy = Y0 + BH * (BH > P * 1.5 ? 0.5 : 0.52), tones = ['#f8d23e', '#f2c22c', '#fbe068', '#eab424'];
            x.fillStyle = '#7a4a08'; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, cy - Y0 + P);
            const n = Math.round(BW / P * 9); for (let i = 0; i < n; i++) { const fx = X0 - P * 0.05 + (i + H(i, 1) * 0.6) * (BW + P * 0.1) / n, top = Y0 + P * (0.02 + H(i, 2) * 0.16), th = P * 0.13, tilt = (H(i, 3) - 0.5) * 0.16;
              x.save(); x.translate(fx, cy); x.rotate(tilt); x.fillStyle = tones[i % 4]; x.fillRect(-th / 2, top - cy, th, cy - top + P * 0.1); x.fillStyle = 'rgba(160,96,8,0.4)'; x.fillRect(th * 0.22, top - cy, th * 0.28, cy - top); x.fillStyle = 'rgba(190,120,20,0.8)'; x.fillRect(-th / 2, top - cy, th, th * 0.35); x.restore(); }
            x.fillStyle = lin(0, cy, 0, Y0 + BH, [[0, '#e8342a'], [0.5, '#cc2018'], [1, '#9a140e']]); x.beginPath(); x.moveTo(X0 - P, cy + P * 0.06);
            for (let k = 0; k <= 12; k++) { const xx = X0 - P + (BW + 2 * P) * k / 12; x.lineTo(xx, cy - P * 0.04 * Math.cos(k * 0.9)); } x.lineTo(X0 + BW + P, Y0 + BH + P); x.lineTo(X0 - P, Y0 + BH + P); x.closePath(); x.fill();
            x.fillStyle = 'rgba(255,170,150,0.45)'; x.fillRect(X0 - P, cy + P * 0.02, BW + 2 * P, lw(0.04)); x.fillStyle = 'rgba(90,8,4,0.3)'; x.fillRect(X0 - P, cy + P * 0.1, BW + 2 * P, lw(0.03)); });
          form('rgba(255,240,190,0.2)', 'rgba(80,10,0,0.4)'); break; }
        case 'burger': { // side view across the whole piece height
          piece(() => { const yb = (f) => Y0 + BH * f;
            x.fillStyle = lin(0, yb(0), 0, yb(0.34), [[0, '#f2c070'], [0.6, '#dc9a46'], [1, '#c4823a']]); x.fillRect(X0 - 4, yb(0) - 4, BW + 8, yb(0.34) - yb(0) + 4);
            for (let i = 0; i < 14; i++) { const sx = X0 + P * 0.15 + H(i, 1) * (BW - P * 0.3), sy = yb(0.05 + H(i, 2) * 0.2); x.fillStyle = '#fbf0d2'; x.beginPath(); x.ellipse(sx, sy, P * 0.05, P * 0.028, (H(i, 3) - 0.5) * 1.2, 0, TAU); x.fill(); x.fillStyle = 'rgba(160,110,50,0.4)'; x.beginPath(); x.ellipse(sx + P * 0.01, sy + P * 0.018, P * 0.04, P * 0.012, (H(i, 3) - 0.5) * 1.2, 0, TAU); x.fill(); }
            x.fillStyle = '#d8281e'; x.fillRect(X0 - 4, yb(0.31), BW + 8, yb(0.39) - yb(0.31)); x.fillStyle = 'rgba(255,140,120,0.5)'; x.fillRect(X0 - 4, yb(0.31), BW + 8, lw(0.025)); x.fillStyle = '#3eae2a'; x.beginPath(); x.moveTo(X0 - 4, yb(0.37)); for (let k = 0; k <= 16; k++) { const xx = X0 - 4 + (BW + 8) * k / 16; x.lineTo(xx, yb(0.45) + Math.sin(k * 2.3) * P * 0.06); } x.lineTo(X0 + BW + 4, yb(0.33)); x.closePath(); x.fill();
            x.fillStyle = '#f2b628'; x.fillRect(X0 - 4, yb(0.4), BW + 8, yb(0.47) - yb(0.4)); for (let i = 0; i < 3; i++) { const dx = X0 + BW * (0.2 + i * 0.3 + (H(i, 4) - 0.5) * 0.1), dl = P * (0.1 + H(i, 5) * 0.12); x.beginPath(); x.moveTo(dx - P * 0.1, yb(0.46)); x.quadraticCurveTo(dx - P * 0.05, yb(0.46) + dl, dx, yb(0.46) + dl); x.quadraticCurveTo(dx + P * 0.05, yb(0.46) + dl, dx + P * 0.1, yb(0.46)); x.fill(); }
            x.fillStyle = '#5a2e18'; x.fillRect(X0 - 4, yb(0.47), BW + 8, yb(0.76) - yb(0.47)); x.save(); x.beginPath(); x.rect(X0 - 4, yb(0.47), BW + 8, yb(0.76) - yb(0.47)); x.clip();
            for (let i = 0; i < 3; i++) { const dx = X0 + BW * (0.2 + i * 0.3 + (H(i, 4) - 0.5) * 0.1), dl = P * (0.06 + H(i, 5) * 0.12); x.fillStyle = '#f2b628'; x.beginPath(); x.moveTo(dx - P * 0.08, yb(0.47)); x.quadraticCurveTo(dx, yb(0.47) + dl * 2, dx + P * 0.08, yb(0.47)); x.fill(); }
            x.fillStyle = 'rgba(30,12,4,0.5)'; for (let i = 0; i < 20; i++) x.fillRect(X0 + H(i, 8) * BW, yb(0.5 + H(i, 9) * 0.24), P * (0.08 + H(i, 10) * 0.12), lw(0.025)); x.fillStyle = 'rgba(140,80,40,0.35)'; for (let i = 0; i < 12; i++) x.fillRect(X0 + H(i, 11) * BW, yb(0.52 + H(i, 12) * 0.2), P * 0.06, lw(0.02)); x.restore();
            x.fillStyle = lin(0, yb(0.76), 0, yb(1), [[0, '#e8b064'], [1, '#c48440']]); x.fillRect(X0 - 4, yb(0.76), BW + 8, yb(1) - yb(0.76) + 4); x.fillStyle = 'rgba(255,240,200,0.3)'; x.fillRect(X0 - 4, yb(0.76), BW + 8, lw(0.03)); });
          form('rgba(255,230,180,0.2)', 'rgba(80,40,10,0.3)'); break; }
        case 'softserve': { // thick pale vanilla shake: one creamy mass with a soft swirled crown and vanilla-bean flecks
          fill('#f8eccc');
          piece(() => { x.fillStyle = lin(0, Y0, 0, Y0 + BH, [[0, '#fff8e6'], [0.5, '#f6e8c4'], [1, '#e6d2a4']]); x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
            for (let k = 0; k < Math.round(BH / P * 2) + 1; k++) { const yy = Y0 + P * (0.45 + k * 0.5); x.strokeStyle = 'rgba(214,188,140,0.35)'; x.lineWidth = lw(0.08); x.lineCap = 'round'; x.beginPath(); for (let j = 0; j <= 16; j++) { const xx = X0 - P * 0.2 + (BW + P * 0.4) * j / 16, v = yy + Math.sin(xx / P * 2 + k * 1.7) * P * 0.06; j ? x.lineTo(xx, v) : x.moveTo(xx, v); } x.stroke(); }
            x.fillStyle = 'rgba(70,46,24,0.55)'; for (let i = 0; i < cells.length * 16; i++) x.fillRect(X0 + H(i, 31) * BW, Y0 + H(i, 32) * BH, lw(0.018), lw(0.018)); });
          form('rgba(255,255,255,0.3)', 'rgba(140,110,60,0.3)'); break; }
        case 'nugget': { // a heap of separate golden nuggets (distinct rounded lumps with dark gaps), craggy crumb on each
          fill('#9a5a18');
          piece(() => { x.fillStyle = '#9a5a18'; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
            const blob = (u, v, rr, k, sq) => { x.beginPath(); for (let j = 0; j < 9; j++) { const an = j / 9 * TAU, q = rr * (0.8 + H(k, j + 20) * 0.3); j ? x.lineTo(u + Math.cos(an) * q, v + Math.sin(an) * q * sq) : x.moveTo(u + Math.cos(an) * q, v + Math.sin(an) * q * sq); } x.closePath(); };
            let i = 0; for (const [a, c] of cells) for (let k = 0; k < 2; k++, i++) { const u = (a + 0.3 + k * 0.42 + (H(i, 1) - 0.5) * 0.1) * P, v = (c + 0.32 + k * 0.36 + (H(i, 2) - 0.5) * 0.1) * P, rr = P * (0.34 + H(i, 3) * 0.06), sq = 0.75 + H(i, 4) * 0.2;
              x.fillStyle = 'rgba(30,12,0,0.5)'; blob(u + P * 0.03, v + P * 0.05, rr, i, sq); x.fill(); x.fillStyle = lin(u, v - rr, u, v + rr, [[0, '#f0b44c'], [1, '#c8761c']]); blob(u, v, rr, i, sq); x.fill();
              x.fillStyle = 'rgba(140,70,10,0.45)'; for (let j = 0; j < 9; j++) x.fillRect(u + (H(i, j + 5) - 0.5) * rr * 1.4, v + (H(i, j + 15) - 0.5) * rr * 1.1, lw(0.03), lw(0.03)); x.fillStyle = 'rgba(255,230,170,0.6)'; for (let j = 0; j < 6; j++) x.fillRect(u + (H(i, j + 25) - 0.6) * rr * 1.2, v - rr * 0.4 + H(i, j + 35) * rr * 0.5, lw(0.025), lw(0.025)); } });
          form('rgba(255,220,150,0.15)', 'rgba(40,16,0,0.4)'); break; }
        case 'pie': { // hot apple pie in its red sleeve: the sleeve covers most of the piece, a strip of blistered golden crust shows at the top
          fill('#b81c16');
          piece(() => { x.fillStyle = lin(0, Y0, 0, Y0 + BH, [[0, '#d42a20'], [1, '#8e120c']]); x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P);
            x.strokeStyle = 'rgba(70,6,2,0.35)'; x.lineWidth = lw(0.03); for (let k = 0; k < BW / P * 2; k++) { const xx = X0 + P * (0.3 + k * 0.5); x.beginPath(); x.moveTo(xx, Y0 + P * 0.35); x.lineTo(xx + P * 0.18, Y0 + BH); x.stroke(); }
            for (const [a, c] of cells) { if (cells.some(([a2, c2]) => a2 === a && c2 === c - 1)) continue; const y0 = c * P; x.fillStyle = lin(0, y0, 0, y0 + P * 0.34, [[0, '#f0c070'], [1, '#c8883c']]); x.fillRect(a * P - 1, y0 - 2, P + 2, P * 0.34);
              x.fillStyle = 'rgba(150,90,30,0.45)'; for (let j = 0; j < 7; j++) { x.beginPath(); x.ellipse(a * P + H(a + c * 5, j) * P, y0 + P * (0.06 + H(a * 3 + c, j + 9) * 0.2), P * 0.04, P * 0.03, 0, 0, TAU); x.fill(); }
              x.fillStyle = '#7a1a0a'; x.fillRect(a * P - 1, y0 + P * 0.32, P + 2, lw(0.05)); x.fillStyle = 'rgba(255,150,130,0.4)'; x.fillRect(a * P - 1, y0 + P * 0.37, P + 2, lw(0.03)); } });
          form('rgba(255,200,180,0.2)', 'rgba(60,4,0,0.4)'); break; }
        case 'cola': { // dark soda: lighter at the top, fizz streams, tan foam head
          const yTop = t - dr * P, yBot = yTop + dn * P; x.fillStyle = lin(0, yTop, 0, yBot, [[0, '#8a4424'], [0.35, '#4a1e14'], [1, '#24100a']]); x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
          piece(() => { for (let st = 0; st < Math.round(BW / P * 1.6); st++) { const sx = X0 + P * 0.2 + H(st, 1) * (BW - P * 0.4); for (let k = 0; k < 18; k++) { const yy = Y0 + BH - k * BH / 18 - H(st, k) * P * 0.1; if (!cells.some(([a, c]) => sx >= a * P && sx < (a + 1) * P && yy >= c * P && yy < (c + 1) * P)) continue; x.fillStyle = 'rgba(240,210,170,0.45)'; x.beginPath(); x.arc(sx + Math.sin(k * 1.3 + st) * P * 0.03, yy, P * (0.012 + k * 0.0016), 0, TAU); x.fill(); } } });
          piece(() => { const yb0 = Y0 + BH - Math.min(P * 0.5, BH * 0.3); x.fillStyle = lin(0, yb0, 0, Y0 + BH, [[0, '#ee2a22'], [1, '#b0140e']]); x.fillRect(X0 - P, yb0, BW + 2 * P, BH + P); x.fillStyle = '#fbf4ea'; x.fillRect(X0 - P, yb0 + P * 0.12, BW + 2 * P, lw(0.06)); x.fillStyle = 'rgba(80,6,2,0.35)'; x.fillRect(X0 - P, yb0, BW + 2 * P, lw(0.03)); });
          if (!(mask & N)) { const fb = t + P * 0.2; x.fillStyle = lin(0, t, 0, fb + P * 0.05, [[0, '#ecd6b4'], [0.75, '#c89c70'], [1, 'rgba(160,110,70,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, fb - t + P * 0.05 + 2); if (!small) for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(255,248,232,0.6)'; x.beginPath(); x.arc(C(0.05 + H(vr + i, 2) * 0.9), t + P * (0.04 + H(vr + i, 3) * 0.12), P * (0.02 + H(vr + i, 4) * 0.02), 0, TAU); x.fill(); } }
          form('rgba(255,220,180,0.12)', 'rgba(0,0,0,0.3)'); break; }
        case 'pancake': { // stack of pancakes: layers along the piece's height, syrup off the top
          fill('#e2a860');
          piece(() => { const lh = P * 0.27; for (let y = Y0 - lh; y < Y0 + BH + lh; y += lh) { const wv = (xx) => Math.sin(xx / P * 2.1 + y) * P * 0.02;
              x.fillStyle = '#e2a860'; x.fillRect(X0 - 4, y, BW + 8, lh); x.fillStyle = '#a8682c'; x.beginPath(); x.moveTo(X0 - 4, y + lh * 0.82); for (let j = 0; j <= 12; j++) { const xx = X0 - 4 + (BW + 8) * j / 12; x.lineTo(xx, y + lh * 0.82 + wv(xx)); } x.lineTo(X0 + BW + 4, y + lh + 1); x.lineTo(X0 - 4, y + lh + 1); x.closePath(); x.fill();
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
