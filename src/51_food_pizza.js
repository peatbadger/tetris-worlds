/* ---- Trattoria blocks MADE OF Italian food (FoodMass) — v2: seven unmistakable dishes ----
   Every pattern is drawn once in whole-piece space (FoodMass shape/rotation info), so each piece is one continuous dish:
   I spaghetti al pomodoro (strands along the piece, a pool of sauce + basil + parmigiano in the middle)
   O pizza margherita (sauce, melted fior di latte, basil over the whole surface; blistered cornicione only on the rim)
   T risotto alla milanese (creamy saffron rice, grains, butter melting at the centre, saffron threads)
   S gnocchi burro e salvia (pillowy ridged gnocchi in brown butter, crisp sage, parmigiano)
   Z penne all'arrabbiata (ridged quills in chilli-tomato sauce, chilli flakes, parsley)
   J lasagne al forno (side view: pasta / ragù / béchamel layers, bubbling browned top)
   L focaccia genovese (golden dimpled bread, oil pooled in the dimples, rosemary, flaky salt). */
const PizzaFood = (() => {
  const C3 = { spaghetti: ['#f0c860', '#ffe090', '#b8301c'], margherita: ['#d8402a', '#f7f1e3', '#c98a3e'], risotto: ['#f0c44a', '#fae08a', '#c8901e'], gnocchi: ['#f2e0b0', '#fff2cc', '#b87a2a'], penne: ['#d8582a', '#f0a050', '#a82a14'], lasagne: ['#e8c068', '#a83a22', '#f4ead0'], focaccia: ['#d8a048', '#f0c878', '#8a5a1a'] };
  const M = FoodMass({
    FOOD: [null, 'spaghetti', 'margherita', 'risotto', 'gnocchi', 'penne', 'lasagne', 'focaccia'],
    MAIN: [null, '#e8bc50', '#c8361e', '#eebc3c', '#ead4a0', '#cc4a22', '#c8803c', '#cf9640'],
    soft: { spaghetti: 1.4, margherita: 1.2, risotto: 1.6, gnocchi: 1.4, penne: 1.2, lasagne: 1.2, focaccia: 1.0 },
    glisten: { margherita: 0.3, risotto: 0.35, gnocchi: 0.4, penne: 0.35 },
    shape: true, diag: true, R: 0.24,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
      const lx = vr & 3, ly = (vr >> 2) & 3, lw = (k) => Math.max(1, P * k);
      const cells = shape || [[lx, ly]];
      let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
      const cx = (bx0 + bx1) / 2 * P, cy = (by0 + by1) / 2 * P, wide = bx1 - bx0 >= by1 - by0, inPiece = (px, py) => cells.some(([a, c]) => px >= a * P && px < (a + 1) * P && py >= c * P && py < (c + 1) * P);
      const fill = (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); };
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const piece = (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); };
      const H = (i, k) => hash(31, i, k);
      const form = (hi, lo, w = 0.22) => { // exposed sides turn away from the light: lit top/left, shaded bottom/right
        if (!(mask & N)) { x.fillStyle = lin(0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
        if (!(mask & W)) { x.fillStyle = lin(l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & E)) { x.fillStyle = lin(r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
        if (!(mask & S)) { x.fillStyle = lin(0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
      };
      const leaf = (px, py, len, a, col = '#2f7a2a', vein = 'rgba(170,225,130,0.6)') => { x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = col; x.beginPath(); x.moveTo(-len, 0); x.quadraticCurveTo(0, -len * 0.62, len, 0); x.quadraticCurveTo(0, len * 0.62, -len, 0); x.fill(); x.strokeStyle = vein; x.lineWidth = lw(0.014); x.beginPath(); x.moveTo(-len * 0.8, 0); x.lineTo(len * 0.85, 0); x.stroke(); x.restore(); };
      const shard = (px, py, q, a) => { x.save(); x.translate(px, py); x.rotate(a); x.fillStyle = '#fbf3da'; x.beginPath(); x.moveTo(-q, -q * 0.3); x.lineTo(q * 0.8, -q * 0.45); x.lineTo(q, q * 0.3); x.lineTo(-q * 0.7, q * 0.4); x.closePath(); x.fill(); x.fillStyle = 'rgba(200,170,110,0.4)'; x.fillRect(-q * 0.6, q * 0.1, q * 1.4, q * 0.18); x.restore(); };
      switch (food) {
        case 'spaghetti': { // strands run the length of the piece; one pool of sauce in the middle
          fill('#e2b84e');
          piece(() => {
            x.lineCap = 'round';
            for (let i = 0; i < 26; i++) { const o = (wide ? by0 : bx0) * P + P * (0.05 + i * 0.16), ph = H(i, 1) * 6, len = (wide ? bx1 - bx0 : by1 - by0) * P;
              x.strokeStyle = i % 4 === 0 ? 'rgba(176,124,34,0.55)' : i % 2 ? 'rgba(255,232,150,0.75)' : 'rgba(236,196,96,0.9)'; x.lineWidth = lw(0.055); x.beginPath();
              for (let k = 0; k <= 30; k++) { const u = k / 30 * (len + P) - P * 0.5, a = o + Math.sin(u / P * 1.6 + ph) * P * 0.12; const [px, py] = wide ? [bx0 * P + u, a] : [a, by0 * P + u]; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
            // the sauce: a ladle of pomodoro pooled in the middle, running thinner toward the ends
            const ax = wide ? P * 1.25 : P * 0.42, ay = wide ? P * 0.42 : P * 1.25;
            { const pts = []; for (let k = 0; k < 10; k++) { const a = k / 10 * TAU, q = 1 + (H(k, 2) - 0.5) * 0.22; pts.push([cx + Math.cos(a) * ax * q, cy + Math.sin(a) * ay * q]); }
              x.fillStyle = '#b02a18'; x.beginPath(); for (let k = 0; k <= 10; k++) { const p0 = pts[k % 10], p1 = pts[(k + 1) % 10], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; k ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); x.fill(); }
            x.fillStyle = 'rgba(214,60,34,0.9)'; ellipse(x, cx - P * 0.06, cy - P * 0.05, ax * 0.72, ay * 0.66); x.fill();
            x.fillStyle = 'rgba(255,170,140,0.45)'; ellipse(x, cx - ax * 0.35, cy - ay * 0.4, ax * 0.3, ay * 0.14, wide ? 0 : Math.PI / 2); x.fill();
            if (!small) { x.fillStyle = 'rgba(120,20,10,0.4)'; for (let i = 0; i < 6; i++) { ellipse(x, cx + (H(i, 3) - 0.5) * ax * 1.4, cy + (H(i, 4) - 0.5) * ay * 1.3, P * 0.04, P * 0.025); x.fill(); } }
            for (let i = 0; i < 3; i++) shard(cx + (H(i, 5) - 0.5) * ax * 0.9, cy + (H(i, 6) - 0.5) * ay * 0.8, P * 0.09, H(i, 7) * 3);
            leaf(cx + P * 0.18, cy - P * 0.12, P * 0.2, -0.5); leaf(cx + P * 0.34, cy + P * 0.02, P * 0.15, 0.7, '#3a8a30');
          });
          form('rgba(255,240,200,0.25)', 'rgba(110,70,16,0.35)');
          break;
        }
        case 'margherita': { // one pizza: sauce, melted fior di latte, basil — the cornicione only where the piece meets the outside
          fill('#c8361e');
          piece(() => {
            x.fillStyle = 'rgba(230,92,52,0.5)'; ellipse(x, cx - P * 0.3, cy - P * 0.25, P * 0.8, P * 0.55, 0.4); x.fill();
            x.fillStyle = 'rgba(140,24,10,0.35)'; for (let i = 0; i < 10; i++) { ellipse(x, P * (bx0 + 0.3 + H(i, 1) * (bx1 - bx0 - 0.6)), P * (by0 + 0.3 + H(i, 2) * (by1 - by0 - 0.6)), P * 0.06, P * 0.04, H(i, 3) * 3); x.fill(); }
            const pools = [[0.62, 0.6, 0.3], [1.42, 0.55, 0.26], [0.95, 1.2, 0.34], [1.5, 1.5, 0.24], [0.45, 1.5, 0.22]];
            for (const [px0, py0, rr0] of pools) { const px = bx0 * P + px0 * P, py = by0 * P + py0 * P, rr = rr0 * P; // melted mozzarella: soft irregular pool, browned blisters
              x.fillStyle = '#f6efdc'; x.beginPath(); for (let k = 0; k <= 14; k++) { const a = k / 14 * TAU, q = rr * (0.78 + H(px0 * 10 + k, 4) * 0.36); k ? x.lineTo(px + Math.cos(a) * q, py + Math.sin(a) * q * 0.86) : x.moveTo(px + q, py); } x.closePath(); x.fill();
              x.fillStyle = 'rgba(255,255,255,0.65)'; ellipse(x, px - rr * 0.25, py - rr * 0.25, rr * 0.4, rr * 0.2, -0.3); x.fill();
              x.fillStyle = 'rgba(196,140,70,0.55)'; ellipse(x, px + rr * 0.3, py + rr * 0.2, rr * 0.16, rr * 0.11); x.fill(); }
            if (!small) { x.fillStyle = 'rgba(255,214,120,0.35)'; for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(P * (bx0 + 0.25 + H(i, 8) * 1.5), P * (by0 + 0.25 + H(i, 9) * 1.5), P * 0.025, 0, TAU); x.fill(); } } // olive-oil beads
            leaf(cx - P * 0.3, cy - P * 0.05, P * 0.2, 0.8); leaf(cx + P * 0.4, cy - P * 0.45, P * 0.17, -0.4, '#3a8a30'); leaf(cx + P * 0.15, cy + P * 0.55, P * 0.18, 2.4);
          });
          const crust = P * 0.26; // the rim: puffed, blistered, leopard-spotted, with a soft inner edge
          const band = (side) => { x.save();
            if (side === E) { x.translate(C(1), C(0)); x.rotate(Math.PI / 2); } else if (side === S) { x.translate(C(1), C(1)); x.rotate(Math.PI); } else if (side === W) { x.translate(C(0), C(1)); x.rotate(-Math.PI / 2); } else x.translate(C(0), C(0));
            x.fillStyle = lin(0, 0, 0, crust, [[0, '#b8742e'], [0.35, '#e4ac5c'], [0.8, '#d89a48'], [1, '#a86a2a']]);
            x.beginPath(); x.moveTo(-P * 0.2, -2); x.lineTo(P * 1.2, -2); x.lineTo(P * 1.2, crust); for (let k = 8; k >= 0; k--) { const u = k / 8; x.lineTo(-P * 0.2 + u * P * 1.4, crust + Math.sin(u * 9 + side) * P * 0.03); } x.closePath(); x.fill();
            x.fillStyle = 'rgba(255,230,180,0.35)'; x.fillRect(-P * 0.2, crust * 0.25, P * 1.4, crust * 0.18);
            x.fillStyle = 'rgba(48,22,8,0.8)'; for (let k = 0; k < 4; k++) { ellipse(x, P * (0.1 + hash(vr, k + side, 7) * 0.8), crust * (0.3 + hash(vr, k + side, 8) * 0.45), P * (0.03 + hash(vr, k, side) * 0.025), P * 0.022, hash(k, side) * 3); x.fill(); }
            x.restore(); };
          for (const sd of [N, E, S, W]) if (!(mask & sd)) band(sd);
          form('rgba(255,220,180,0.14)', 'rgba(80,20,8,0.28)', 0.12);
          break;
        }
        case 'risotto': { // creamy saffron rice: a fine field of grains, sheen, butter melting at the centre, saffron threads
          fill('#ecbc40');
          piece(() => {
            x.fillStyle = lin(bx0 * P, by0 * P, bx1 * P, by1 * P, [[0, 'rgba(255,228,140,0.45)'], [0.6, 'rgba(255,214,90,0)'], [1, 'rgba(180,120,20,0.25)']]); x.fillRect(bx0 * P - P, by0 * P - P, (bx1 - bx0 + 2) * P, (by1 - by0 + 2) * P);
            const n = small ? 0 : Math.round((bx1 - bx0) * (by1 - by0) * 40);
            for (let i = 0; i < n; i++) { const px = P * (bx0 + H(i, 1) * (bx1 - bx0)), py = P * (by0 + H(i, 2) * (by1 - by0)); if (!inPiece(px, py)) continue; const a = H(i, 3) * 3;
              x.fillStyle = 'rgba(176,120,20,0.35)'; ellipse(x, px + P * 0.01, py + P * 0.012, P * 0.08, P * 0.04, a); x.fill(); x.fillStyle = i % 4 ? 'rgba(255,240,186,0.8)' : 'rgba(255,250,230,0.95)'; ellipse(x, px, py, P * 0.075, P * 0.036, a); x.fill(); }
            x.fillStyle = 'rgba(255,255,240,0.35)'; ellipse(x, cx - P * 0.35, cy - P * 0.25, P * 0.6, P * 0.16, -0.25); x.fill();
            // butter melting in the middle, a pool of gloss around it
            x.fillStyle = 'rgba(255,236,150,0.6)'; ellipse(x, cx, cy, P * 0.34, P * 0.22, 0.2); x.fill();
            x.fillStyle = '#fbeeb4'; x.beginPath(); x.moveTo(cx - P * 0.14, cy - P * 0.08); x.lineTo(cx + P * 0.12, cy - P * 0.12); x.quadraticCurveTo(cx + P * 0.17, cy, cx + P * 0.1, cy + P * 0.09); x.lineTo(cx - P * 0.12, cy + P * 0.1); x.quadraticCurveTo(cx - P * 0.18, cy, cx - P * 0.14, cy - P * 0.08); x.fill();
            x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(cx - P * 0.1, cy - P * 0.08, P * 0.12, P * 0.025);
            x.strokeStyle = '#c8401a'; x.lineWidth = lw(0.018); x.lineCap = 'round'; for (let i = 0; i < 7; i++) { const px = P * (bx0 + 0.2 + H(i, 5) * (bx1 - bx0 - 0.4)), py = P * (by0 + 0.2 + H(i, 6) * (by1 - by0 - 0.4)); if (!inPiece(px, py)) continue; const a = H(i, 7) * 3; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a) * P * 0.08, py + Math.sin(a) * P * 0.02, px + Math.cos(a) * P * 0.14, py + Math.sin(a) * P * 0.08); x.stroke(); }
            for (let i = 0; i < 3; i++) shard(cx + (H(i, 8) - 0.5) * P * 1.6, cy + (H(i, 9) - 0.5) * P * 0.9, P * 0.08, H(i, 10) * 3);
          });
          form('rgba(255,248,210,0.4)', 'rgba(150,96,10,0.3)');
          break;
        }
        case 'gnocchi': { // pillowy ridged gnocchi nestled together in nut-brown butter; crisp sage leaves; parmigiano
          fill('#b8782a');
          piece(() => {
            x.fillStyle = 'rgba(232,170,70,0.5)'; x.fillRect(bx0 * P - P, by0 * P - P, (bx1 - bx0 + 2) * P, (by1 - by0 + 2) * P);
            const sp = P * 0.5;
            for (let gy = by0 * P - sp * 0.3; gy < by1 * P + sp * 0.5; gy += sp * 0.82) for (let gx = bx0 * P - sp * 0.3 + ((Math.round(gy / sp) & 1) ? sp * 0.45 : 0); gx < bx1 * P + sp * 0.5; gx += sp * 0.9) {
              const k = Math.round(gx * 3.1 + gy * 7.7), px = gx + (hash(k, 1) - 0.5) * sp * 0.2, py = gy + (hash(k, 2) - 0.5) * sp * 0.2, a = (hash(k, 3) - 0.5) * 1.2;
              x.save(); x.translate(px, py); x.rotate(a);
              x.fillStyle = 'rgba(90,50,10,0.35)'; ellipse(x, sp * 0.04, sp * 0.06, sp * 0.42, sp * 0.3); x.fill();
              x.fillStyle = lin(0, -sp * 0.3, 0, sp * 0.3, [[0, '#fff4d2'], [0.6, '#f0dca6'], [1, '#d8b06a']]); ellipse(x, 0, 0, sp * 0.4, sp * 0.28); x.fill();
              if (!small) { x.strokeStyle = 'rgba(176,130,60,0.5)'; x.lineWidth = lw(0.014); for (let j = -2; j <= 2; j++) { x.beginPath(); x.moveTo(j * sp * 0.12, -sp * 0.22); x.quadraticCurveTo(j * sp * 0.14 + sp * 0.03, 0, j * sp * 0.12, sp * 0.22); x.stroke(); } }
              x.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(x, -sp * 0.12, -sp * 0.12, sp * 0.14, sp * 0.06, -0.2); x.fill();
              x.restore();
            }
            for (let i = 0; i < 4; i++) { const px = P * (bx0 + 0.3 + H(i, 4) * (bx1 - bx0 - 0.6)), py = P * (by0 + 0.3 + H(i, 5) * (by1 - by0 - 0.6)); if (inPiece(px, py)) leaf(px, py, P * 0.17, H(i, 6) * 3, '#4a6a2e', 'rgba(170,200,120,0.55)'); } // fried sage: muted olive-green
            if (!small) { x.fillStyle = 'rgba(255,214,120,0.5)'; for (let i = 0; i < 10; i++) { x.beginPath(); x.arc(P * (bx0 + H(i, 7) * (bx1 - bx0)), P * (by0 + H(i, 8) * (by1 - by0)), P * 0.02, 0, TAU); x.fill(); } }
            for (let i = 0; i < 3; i++) shard(cx + (H(i, 9) - 0.5) * P * 1.4, cy + (H(i, 10) - 0.5) * P * 0.8, P * 0.07, H(i, 11) * 3);
          });
          form('rgba(255,240,200,0.22)', 'rgba(90,50,10,0.35)');
          break;
        }
        case 'penne': { // ridged quills tossed in chilli-tomato sauce; chilli flakes and parsley
          fill('#b8341a');
          piece(() => {
            const n = Math.round((bx1 - bx0) * (by1 - by0) * 5);
            for (let i = 0; i < n; i++) { const px = P * (bx0 - 0.1 + H(i, 1) * (bx1 - bx0 + 0.2)), py = P * (by0 - 0.1 + H(i, 2) * (by1 - by0 + 0.2)), a = H(i, 3) * Math.PI, L = P * 0.34, R0 = P * 0.09;
              x.save(); x.translate(px, py); x.rotate(a);
              x.fillStyle = 'rgba(90,16,6,0.4)'; x.beginPath(); x.moveTo(-L, -R0 + 3); x.lineTo(L + R0 * 0.6, -R0 + 3); x.lineTo(L - R0 * 0.6, R0 + 3); x.lineTo(-L - R0 * 1.2, R0 + 3); x.closePath(); x.fill();
              x.fillStyle = lin(0, -R0, 0, R0, [[0, '#f4b064'], [0.5, '#e08a3c'], [1, '#b85a22']]); x.beginPath(); x.moveTo(-L + R0 * 0.6, -R0); x.lineTo(L + R0 * 0.6, -R0); x.lineTo(L - R0 * 0.6, R0); x.lineTo(-L - R0 * 0.6, R0); x.closePath(); x.fill();
              if (!small) { x.strokeStyle = 'rgba(150,60,20,0.45)'; x.lineWidth = lw(0.012); for (let j = -1; j <= 1; j++) { x.beginPath(); x.moveTo(-L + R0 * 0.3, j * R0 * 0.55); x.lineTo(L, j * R0 * 0.55); x.stroke(); } }
              x.fillStyle = '#5a1608'; ellipse(x, L, 0, R0 * 0.36, R0 * 0.8, -0.5); x.fill(); // the hollow, cut on the bias
              x.fillStyle = 'rgba(190,40,20,0.55)'; ellipse(x, -L * 0.2 + H(i, 4) * L * 0.4, R0 * 0.2, L * 0.4, R0 * 0.55); x.fill(); // sauce clinging
              x.fillStyle = 'rgba(255,220,180,0.45)'; x.fillRect(-L * 0.6, -R0 * 0.7, L * 0.9, R0 * 0.25);
              x.restore(); }
            if (!small) { x.fillStyle = '#7a120a'; for (let i = 0; i < 12; i++) { x.fillRect(P * (bx0 + H(i, 5) * (bx1 - bx0)), P * (by0 + H(i, 6) * (by1 - by0)), lw(0.04), lw(0.025)); }
              x.fillStyle = '#3e8a2e'; for (let i = 0; i < 9; i++) { ellipse(x, P * (bx0 + H(i, 7) * (bx1 - bx0)), P * (by0 + H(i, 8) * (by1 - by0)), P * 0.035, P * 0.02, H(i, 9) * 3); x.fill(); } }
          });
          form('rgba(255,210,170,0.22)', 'rgba(80,10,4,0.38)');
          break;
        }
        case 'lasagne': { // side view of a slab: pasta / ragù / béchamel bands; the top is browned and bubbling
          fill('#a83a22');
          piece(() => { const L = [['#e8c46a', 0.09], ['#9a2e1c', 0.16], ['#f4ead0', 0.07], ['#e8c46a', 0.09], ['#b23a22', 0.14], ['#f0e2c2', 0.08]]; let y = by0 * P + P * 0.24, k = 0;
            while (y < by1 * P + P) { const [col, h] = L[k % L.length]; x.fillStyle = col; x.beginPath(); x.moveTo(bx0 * P - P, y); for (let j = 0; j <= 10; j++) x.lineTo(bx0 * P - P + j * P * 0.6, y + Math.sin(j * 1.7 + k * 2.1) * P * 0.022); x.lineTo(bx1 * P + P, y + h * P + P * 0.03); x.lineTo(bx0 * P - P, y + h * P + P * 0.03); x.closePath(); x.fill();
              if (col.startsWith('#9a') || col.startsWith('#b2')) { x.fillStyle = 'rgba(70,16,8,0.45)'; for (let i = 0; i < 6; i++) { ellipse(x, P * (bx0 + H(i + k * 7, 1) * (bx1 - bx0)), y + h * P * (0.3 + H(i + k * 7, 2) * 0.4), P * 0.05, P * 0.03); x.fill(); } } // minced meat
              y += h * P; k++; }
          });
          if (!(mask & N)) { // gratinated top: deep golden with dark blisters and bubbling cheese
            const h = P * 0.26; x.fillStyle = lin(0, t, 0, t + h, [[0, '#8a4a18'], [0.35, '#d89a40'], [0.8, '#f0c868'], [1, 'rgba(240,210,150,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, h + 2);
            x.fillStyle = 'rgba(70,30,8,0.75)'; for (let k = 0; k < 4; k++) { ellipse(x, C(0.12 + hash(vr, k, 9) * 0.76), t + P * (0.05 + hash(vr, k, 10) * 0.08), P * 0.05, P * 0.025, hash(vr, k) * 2); x.fill(); }
            x.fillStyle = 'rgba(255,236,170,0.75)'; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(C(0.2 + hash(vr, k, 11) * 0.6), t + P * (0.12 + hash(vr, k, 12) * 0.06), P * 0.035, 0, TAU); x.fill(); }
          }
          form('rgba(255,230,200,0.18)', 'rgba(40,10,4,0.4)');
          break;
        }
        case 'focaccia': { // golden, dimpled, oil pooled in the dimples; rosemary and flaky salt
          fill('#cf9640');
          piece(() => {
            x.fillStyle = lin(bx0 * P, by0 * P, bx1 * P, by1 * P, [[0, 'rgba(255,214,140,0.5)'], [1, 'rgba(150,90,20,0.3)']]); x.fillRect(bx0 * P - P, by0 * P - P, (bx1 - bx0 + 2) * P, (by1 - by0 + 2) * P);
            if (!small) for (let i = 0; i < 10; i++) { const px = P * (bx0 + H(i, 20) * (bx1 - bx0)), py = P * (by0 + H(i, 21) * (by1 - by0)); x.fillStyle = i % 2 ? 'rgba(160,96,24,0.25)' : 'rgba(255,220,150,0.3)'; ellipse(x, px, py, P * 0.3, P * 0.18, H(i, 22) * 3); x.fill(); } // bake mottling
            const sp = P * 0.5;
            for (let gy = by0 * P + sp * 0.35; gy < by1 * P; gy += sp) for (let gx = bx0 * P + sp * 0.35 + ((Math.round(gy / sp) & 1) ? sp * 0.5 : 0); gx < bx1 * P; gx += sp) {
              const k = Math.round(gx * 2.3 + gy * 5.9), px = gx + (hash(k, 1) - 0.5) * sp * 0.35, py = gy + (hash(k, 2) - 0.5) * sp * 0.35; if (!inPiece(px, py)) continue; const a = hash(k, 3) * 3, w = sp * (0.2 + hash(k, 4) * 0.08);
              x.fillStyle = radial(x, px, py, w * 1.1, [[0, 'rgba(110,60,12,0.55)'], [0.6, 'rgba(130,74,16,0.3)'], [1, 'rgba(130,74,16,0)']]); ellipse(x, px, py, w * 1.1, w * 0.85, a); x.fill(); // soft finger dimple
              x.fillStyle = 'rgba(240,186,70,0.55)'; ellipse(x, px + w * 0.1, py + w * 0.12, w * 0.5, w * 0.32, a); x.fill(); // a little pooled oil
              x.fillStyle = 'rgba(255,250,225,0.85)'; ellipse(x, px - w * 0.05, py + w * 0.02, w * 0.16, w * 0.08, a); x.fill();
            }
            const tom = (px, py, rr) => { x.fillStyle = '#b8241a'; x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill(); x.fillStyle = '#e8503a'; x.beginPath(); x.arc(px, py, rr * 0.78, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,200,140,0.8)'; for (let k = 0; k < 3; k++) { const a = k * 2.1 + 0.4; ellipse(x, px + Math.cos(a) * rr * 0.4, py + Math.sin(a) * rr * 0.4, rr * 0.16, rr * 0.1, a); x.fill(); } x.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(x, px - rr * 0.35, py - rr * 0.4, rr * 0.25, rr * 0.12, -0.5); x.fill(); };
            const olive = (px, py, rr) => { x.fillStyle = '#2a1e22'; x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill(); x.fillStyle = '#5a3a3a'; x.beginPath(); x.arc(px, py, rr * 0.42, 0, TAU); x.fill(); x.fillStyle = 'rgba(255,255,255,0.3)'; ellipse(x, px - rr * 0.4, py - rr * 0.45, rr * 0.3, rr * 0.14, -0.5); x.fill(); };
            cells.forEach(([qa, qb], i) => { const px = P * (qa + 0.25 + H(i, 12) * 0.5), py = P * (qb + 0.25 + H(i, 13) * 0.5); (i % 2 ? olive : tom)(px, py, P * (i % 2 ? 0.11 : 0.16)); }); // one topping per cell, spread over the slab
            x.lineCap = 'round';
            for (let i = 0; i < 4; i++) { const px = P * (bx0 + 0.3 + H(i, 3) * (bx1 - bx0 - 0.6)), py = P * (by0 + 0.3 + H(i, 4) * (by1 - by0 - 0.6)); if (!inPiece(px, py)) continue; const a = H(i, 5) * 3, ux = Math.cos(a), uy = Math.sin(a); // rosemary: a woody stem with needles both sides
              x.strokeStyle = '#5a4a2a'; x.lineWidth = lw(0.014); x.beginPath(); x.moveTo(px - ux * P * 0.16, py - uy * P * 0.16); x.lineTo(px + ux * P * 0.16, py + uy * P * 0.16); x.stroke();
              x.strokeStyle = '#33502a'; x.lineWidth = lw(0.02); for (let j = -3; j <= 3; j++) for (const sd of [-1, 1]) { const qx = px + ux * j * P * 0.045, qy = py + uy * j * P * 0.045; x.beginPath(); x.moveTo(qx, qy); x.lineTo(qx + (ux * 0.5 - uy * sd) * P * 0.06, qy + (uy * 0.5 + ux * sd) * P * 0.06); x.stroke(); } }
            if (!small) { x.fillStyle = 'rgba(255,255,255,0.9)'; for (let i = 0; i < 14; i++) { const px = P * (bx0 + H(i, 6) * (bx1 - bx0)), py = P * (by0 + H(i, 7) * (by1 - by0)); x.fillRect(px, py, lw(0.03), lw(0.022)); } }
          });
          form('rgba(255,236,190,0.3)', 'rgba(110,60,10,0.45)', 0.26);
          break;
        }
      }
    },
    live(c, food, o) {
      const { s, mask, seed, T, small, dr, gx } = o;
      if (small) return;
      if (food === 'lasagne' && !(mask & FM_N)) { // cheese bubbling on the gratin
        for (let i = 0; i < 2; i++) { const u = (T * 0.5 + seed * 0.37 + i * 0.5) % 1, bx = Math.sin(seed * 3.1 + i * 2.3) * s * 0.3, by = -s * 0.36; if (u < 0.6) { const rr = s * 0.05 * Math.sin(u / 0.6 * Math.PI); c.fillStyle = 'rgba(255,232,160,0.85)'; c.beginPath(); c.arc(bx, by, rr, 0, TAU); c.fill(); c.strokeStyle = 'rgba(140,80,20,0.5)'; c.lineWidth = Math.max(0.6, s * 0.012); c.stroke(); } }
      }
      if ((food === 'margherita' || food === 'risotto' || food === 'spaghetti' || food === 'lasagne') && !(mask & FM_N) && dr === 0) { // steam
        const u = (T * 0.22 + seed * 0.41) % 1; if (u < 0.7) { const x0 = Math.sin(T * 1.3 + seed) * s * 0.08, y0 = -s * 0.45 - u * s * 0.7, rr = s * (0.14 + u * 0.22); c.globalAlpha = (o.alpha ?? 1) * Math.sin((u / 0.7) * Math.PI) * 0.22; c.fillStyle = radial(c, x0, y0, rr, [[0, 'rgba(255,255,255,0.9)'], [1, 'rgba(255,255,255,0)']]); c.beginPath(); c.arc(x0, y0, rr, 0, TAU); c.fill(); c.globalAlpha = o.alpha ?? 1; }
      }
      if (food === 'gnocchi' && !(mask & FM_N) && dr === 0) { const u = (T * 0.6 + seed) % 1; c.fillStyle = `rgba(255,220,140,${0.6 * (1 - u)})`; c.beginPath(); c.arc(Math.sin(seed * 5) * s * 0.3, -s * 0.3 - u * s * 0.1, s * 0.02, 0, TAU); c.fill(); } // butter sizzle
    },
    clear(food, q) {
      const { v, X, Y, s, r, vr, push, dir } = q, [c0, c1, c2] = C3[food];
      if (food === 'gnocchi' || food === 'penne') push({ k: 'roll', v, x: X, y: Y, vx: dir * s * (2.5 + r(1) * 2), vy: -s * 1.4, rot: 0, vr: dir * 6, life: 0.9, vrr: vr });
      else if (food === 'spaghetti' || food === 'lasagne') push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.5 + r(2)), vy: -s * 1, rot: 0, vr: dir * 2.5, life: 0.85, vrr: vr });
      else push({ k: 'squish', v, x: X, y: Y, vr, life: 0.45 });
      for (let i = 0; i < 4; i++) push({ k: 'crumb', col: i % 2 ? c1 : c2, x: X, y: Y, vx: (r(i + 3) - 0.5) * s * 4, vy: -s * (1.5 + r(i + 5) * 2.5), life: 0.65 });
      if (food === 'margherita' || food === 'gnocchi') push({ k: 'dot', col: '#2e8a2a', r: 0.07, x: X, y: Y, vx: (r(9) - 0.5) * s * 3, vy: -s * 3, life: 0.7 });
      return true;
    },
  });
  return M;
})();
SKINSETS.pizza = PizzaFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'pizzeria'); if (st) { st.palette = PizzaFood.MAIN.slice(1); st.desc = 'Flat geometric Neapolitan trattoria: a wood-fired dome oven, dough tossed high, cheese that stretches, Chianti by candlelight and an accordion at night — a tarantella lilt on mandolin & accordion.'; } })();
