/* ---- Melbourne laneway blocks: brunch and coffee, each piece one continuous mass ----
   I vegemite toast (sourdough slices: crusted edges, open crumb, glossy black yeast spread over melting butter)
   · O lamingtons (chocolate-dipped sponge cubes rolled in coconut, one per cell) · T pavlova (crisp white meringue with
   cream, berries and passionfruit pulp) · S sausage rolls (flaky golden pastry with a pork core showing at the cut)
   · Z smashed avo (crushed green avocado on toast with feta crumbs, chilli flakes and seeds) · J eggs benny (poached
   eggs under glossy hollandaise, a sprinkle of paprika and chives) · L flat white (velvety microfoam with tulip latte
   art, one cup-top per cell) */
const LanewayFood = remakeFood('laneway', {
  premiumOpts: { R: 0.2, grain: { lamington: 0.06, vegemite: 0.05 }, lift: { lamington: 'brightness(1.14) contrast(1.04)', vegemite: 'brightness(0.86) contrast(1.08)' } },
  FOOD: [null, 'vegemite', 'lamington', 'pavlova', 'sausageroll', 'avo', 'benny', 'flatwhite'],
  MAIN: [null, '#2a1a10', '#5a3420', '#f4eee6', '#d8a050', '#7aa040', '#f0c848', '#c89a6a'],
  soft: { vegemite: 1.0, lamington: 1.1, pavlova: 1.3, sausageroll: 1.1, avo: 1.3, benny: 1.3, flatwhite: 1.2 },
  boardBg: 'rgba(18,18,20,0.94)', grid: 'rgba(240,230,220,0.06)',
  paint(x, food, Q) {
    const M = MassKit(x, Q, 911), { P, X0, Y0, BW, BH, A, H, lw, small } = M;
    switch (food) {
      case 'vegemite': { M.fill('#5a3416'); M.piece(() => { // sourdough slices along the piece, black yeast spread over melting butter
        M.axis((len, sp) => { const n = Math.max(1, Math.round(len / P)), rows = Math.max(1, Math.round(sp / P));
          for (let r = 0; r < rows; r++) for (let q = 0; q < n; q++) { const cx = (q + 0.5) * len / n, cy = (r + 0.5) * sp / rows, w = len / n * 0.48, h = sp / rows * 0.46, sd = q * 7 + r * 3;
            const slice = (dx, dy, k) => { x.beginPath(); x.moveTo(cx - w * k + dx, cy + h * k + dy); x.lineTo(cx - w * k + dx, cy - h * 0.3 * k + dy); x.bezierCurveTo(cx - w * k + dx, cy - h * 1.1 * k + dy, cx + w * k + dx, cy - h * 1.1 * k + dy, cx + w * k + dx, cy - h * 0.3 * k + dy); x.lineTo(cx + w * k + dx, cy + h * k + dy); x.closePath(); };
            x.fillStyle = 'rgba(20,8,0,0.45)'; slice(P * 0.02, P * 0.04, 1); x.fill();
            x.fillStyle = M.lin(cx, cy - h, cx, cy + h, [[0, '#9a5a22'], [1, '#6a3a14']]); slice(0, 0, 1); x.fill(); // the crust
            x.fillStyle = M.rad(cx - w * 0.2, cy - h * 0.2, w * 1.2, [[0, '#f0d8a0'], [1, '#d8b070']]); slice(0, 0, 0.84); x.fill(); // the toasted crumb
            if (!small) for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(150,100,40,0.45)'; ellipse(x, cx + (H(sd, k) - 0.5) * w * 1.4, cy + (H(sd, k + 20) - 0.5) * h * 1.3, P * 0.02, P * 0.012, H(sd, k + 40)); x.fill(); } // open crumb
            x.fillStyle = 'rgba(250,220,120,0.6)'; M.blob(cx + w * 0.1, cy + h * 0.1, w * 0.6, sd, 9, 0.4); x.fill(); // butter melting in
            x.fillStyle = 'rgba(34,16,6,0.88)'; slice(0, h * 0.02, 0.76); x.fill(); // the thin dark spread over the whole slice
            x.strokeStyle = 'rgba(230,180,80,0.55)'; x.lineWidth = lw(0.016); for (let k = 0; k < 4; k++) { const yy = cy - h * 0.5 + k * h * 0.32 + (H(sd, k + 60) - 0.5) * h * 0.1; x.beginPath(); x.moveTo(cx - w * 0.6, yy); x.quadraticCurveTo(cx, yy + h * 0.12, cx + w * 0.55, yy - h * 0.04); x.stroke(); } // knife scrapes: butter showing through
            x.fillStyle = 'rgba(255,240,220,0.55)'; ellipse(x, cx - w * 0.25, cy - h * 0.25, w * 0.24, h * 0.06, -0.3); x.fill(); x.fillStyle = 'rgba(255,240,220,0.3)'; ellipse(x, cx + w * 0.15, cy + h * 0.15, w * 0.14, h * 0.04, -0.3); x.fill(); } }); });
        M.form('rgba(255,230,190,0.16)', 'rgba(20,8,0,0.42)'); break; }
      case 'lamington': { M.fill('#2a1408'); M.piece(() => { // a chocolate-dipped, coconut-rolled sponge cube in each cell
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, w = P * 0.42, sd = a * 5 + c * 3;
          x.fillStyle = 'rgba(10,4,0,0.5)'; roundRect(x, cx - w + P * 0.03, cy - w + P * 0.05, w * 2, w * 2, P * 0.12); x.fill();
          x.fillStyle = M.lin(cx - w, cy - w, cx + w, cy + w, [[0, '#7a4a2a'], [0.6, '#5a321a'], [1, '#3a1e0c']]); roundRect(x, cx - w, cy - w, w * 2, w * 2, P * 0.12); x.fill();
          for (let k = 0; k < (small ? 16 : 90); k++) { const u = cx + (H(sd, k) - 0.5) * w * 1.9, v = cy + (H(sd, k + 99) - 0.5) * w * 1.9; x.fillStyle = H(sd, k + 50) < 0.7 ? 'rgba(250,246,236,0.85)' : 'rgba(220,210,190,0.7)'; x.save(); x.translate(u, v); x.rotate(H(sd, k + 30) * 3); x.fillRect(-P * 0.022, -P * 0.007, P * 0.044, P * 0.014); x.restore(); } // desiccated coconut
          x.fillStyle = 'rgba(255,240,220,0.18)'; roundRect(x, cx - w * 0.9, cy - w * 0.9, w * 1.2, w * 0.3, P * 0.06); x.fill(); } });
        M.form('rgba(255,230,210,0.16)', 'rgba(10,4,0,0.42)'); break; }
      case 'pavlova': { M.fill('#d8ccc0'); M.piece(() => { // crisp white meringue, whipped cream, berries and passionfruit
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, '#fbf8f2'], [1, '#e4d8cc']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 3, 101, 0.1)) { x.fillStyle = 'rgba(180,160,140,0.3)'; M.blob(u + P * 0.02, v + P * 0.03, P * 0.2, i, 8, 0.4); x.fill(); x.fillStyle = '#fdfbf6'; M.blob(u, v, P * 0.2, i, 8, 0.4); x.fill(); } // cream swirls
        if (!small) { x.strokeStyle = 'rgba(200,180,150,0.45)'; x.lineWidth = lw(0.01); for (const [u, v, i] of M.pts(A * 3, 102, 0.06)) { x.beginPath(); x.moveTo(u, v); x.lineTo(u + P * 0.1, v + (H(i, 103) - 0.5) * P * 0.06); x.stroke(); } } // crisp cracks in the shell
        for (const [u, v, i] of M.pts(A * 2.6, 104, 0.12)) { const kind = i % 3;
          if (kind === 0) { x.fillStyle = 'rgba(60,0,10,0.35)'; ellipse(x, u + P * 0.02, v + P * 0.03, P * 0.11, P * 0.12); x.fill(); x.fillStyle = M.rad(u - P * 0.03, v - P * 0.04, P * 0.14, [[0, '#f0606a'], [1, '#b0202e']]); x.beginPath(); x.moveTo(u, v + P * 0.13); x.bezierCurveTo(u - P * 0.13, v + P * 0.03, u - P * 0.1, v - P * 0.1, u, v - P * 0.1); x.bezierCurveTo(u + P * 0.1, v - P * 0.1, u + P * 0.13, v + P * 0.03, u, v + P * 0.13); x.fill(); x.fillStyle = '#5a9a2a'; ellipse(x, u, v - P * 0.11, P * 0.05, P * 0.02); x.fill(); } // strawberry
          else if (kind === 1) { for (let q = 0; q < 3; q++) { const bx = u + (q - 1) * P * 0.07, by = v + (q % 2) * P * 0.05; x.fillStyle = M.rad(bx - P * 0.02, by - P * 0.02, P * 0.06, [[0, '#6a6aa8'], [1, '#2a2a5a']]); x.beginPath(); x.arc(bx, by, P * 0.05, 0, TAU); x.fill(); x.fillStyle = 'rgba(220,220,255,0.6)'; x.beginPath(); x.arc(bx - P * 0.015, by - P * 0.015, P * 0.012, 0, TAU); x.fill(); } } // blueberries
          else { x.fillStyle = 'rgba(230,170,20,0.85)'; M.blob(u, v, P * 0.12, i + 7, 7, 0.5); x.fill(); x.fillStyle = '#2a1a0a'; for (let q = 0; q < 5; q++) { x.beginPath(); x.arc(u + (H(i, q) - 0.5) * P * 0.14, v + (H(i, q + 9) - 0.5) * P * 0.14, P * 0.016, 0, TAU); x.fill(); } } } }); // passionfruit pulp and seeds
        M.form('rgba(255,255,255,0.22)', 'rgba(150,120,100,0.32)'); break; }
      case 'sausageroll': { M.fill('#6a3a14'); M.piece(() => { // flaky golden pastry rolls, one per cell, the pork core showing at the cut end
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, sd = a * 7 + c * 3, w = P * 0.46, h = P * 0.3, rot = ((a + c) % 2 ? 0.25 : -0.25) + (H(sd, 1) - 0.5) * 0.2; x.save(); x.translate(cx, cy); x.rotate(rot);
          x.fillStyle = 'rgba(30,10,0,0.45)'; roundRect(x, -w + P * 0.02, -h + P * 0.04, w * 2, h * 2, h * 0.7); x.fill();
          x.fillStyle = M.lin(0, -h, 0, h, [[0, '#f0c068'], [0.5, '#d8963a'], [1, '#9a5a1a']]); roundRect(x, -w, -h, w * 2, h * 2, h * 0.7); x.fill();
          x.strokeStyle = 'rgba(120,60,10,0.5)'; x.lineWidth = lw(0.014); for (let q = 0; q < 3; q++) { const qx = -w * 0.5 + q * w * 0.5; x.beginPath(); x.moveTo(qx - P * 0.04, -h * 0.9); x.lineTo(qx + P * 0.04, -h * 0.2); x.stroke(); } // the scored top
          x.fillStyle = 'rgba(255,240,200,0.5)'; for (let q = 0; q < 4; q++) x.fillRect(-w * 0.8 + q * w * 0.4, -h * 0.6, w * 0.24, h * 0.1); // flaky layers catching light
          if (!small) for (let q = 0; q < 6; q++) { x.fillStyle = '#f4e8c8'; ellipse(x, -w * 0.6 + H(sd, q) * w * 1.2, -h * 0.5 + H(sd, q + 9) * h * 0.5, P * 0.012, P * 0.007, 0.4); x.fill(); } // sesame
          const ex = H(sd, 3) < 0.5 ? -w * 0.86 : w * 0.86; x.fillStyle = '#e8c890'; ellipse(x, ex, 0, h * 0.42, h * 0.86); x.fill(); x.fillStyle = M.rad(ex, 0, h * 0.6, [[0, '#b88a70'], [1, '#8a5a44']]); ellipse(x, ex, 0, h * 0.3, h * 0.58); x.fill(); // the cut end: pastry ring, pork filling
          x.restore(); } });
        M.form('rgba(255,230,180,0.18)', 'rgba(30,10,0,0.42)'); break; }
      case 'avo': { M.fill('#2a3a14'); M.piece(() => { // smashed avocado: chunky crushed green, feta crumbs, chilli flakes, seeds, a lemon squeeze shine
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#a8c460'], [1, '#6a8a30']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 5, 111, 0.06)) { const R = P * (0.12 + H(i, 112) * 0.1); x.fillStyle = 'rgba(40,60,10,0.3)'; M.blob(u + P * 0.015, v + P * 0.025, R, i, 7, 0.6); x.fill(); x.fillStyle = H(i, 113) < 0.5 ? '#b8d070' : '#94b44c'; M.blob(u, v, R, i, 7, 0.6); x.fill(); x.fillStyle = 'rgba(240,255,200,0.4)'; ellipse(x, u - R * 0.3, v - R * 0.3, R * 0.4, R * 0.15, -0.5); x.fill(); } // crushed chunks
        if (!small) for (const [u, v, i] of M.pts(A * 2, 114, 0.1)) { x.fillStyle = '#fbf8ee'; M.blob(u, v, P * 0.06, i + 3, 6, 0.6); x.fill(); x.fillStyle = 'rgba(200,190,170,0.5)'; x.beginPath(); x.arc(u + P * 0.015, v + P * 0.015, P * 0.02, 0, TAU); x.fill(); } // feta
        if (!small) for (const [u, v, i] of M.pts(A * 7, 115, 0.04)) { x.fillStyle = H(i, 116) < 0.5 ? '#c8301e' : '#2a2a20'; x.fillRect(u, v, P * 0.02, P * 0.012); } }); // chilli flakes and seeds
        M.form('rgba(240,255,210,0.18)', 'rgba(30,40,0,0.42)'); break; }
      case 'benny': { M.fill('#9a7a2a'); M.piece(() => { // poached eggs under glossy hollandaise, paprika and chives
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.35, Math.max(BW, BH) * 0.8, [[0, '#f6dc78'], [1, '#d8b040']]); M.all(x.fillStyle);
        for (const [u, v, i] of M.pts(A * 1.2, 121, 0.2)) { const R = P * (0.26 + H(i, 122) * 0.05);
          x.fillStyle = 'rgba(110,60,0,0.45)'; M.blob(u + P * 0.03, v + P * 0.05, R, i, 9, 0.3); x.fill();
          x.fillStyle = M.rad(u - R * 0.3, v - R * 0.4, R * 1.3, [[0, '#fff6c8'], [0.45, '#f8d870'], [1, '#d8a030']]); M.blob(u, v, R, i, 9, 0.3); x.fill(); // the domed egg under its coat of sauce
          x.fillStyle = 'rgba(255,252,230,0.6)'; ellipse(x, u - R * 0.35, v - R * 0.45, R * 0.36, R * 0.12, -0.4); x.fill(); }
        x.strokeStyle = 'rgba(255,240,180,0.5)'; x.lineWidth = lw(0.02); for (const [u, v, i] of M.pts(A, 123, 0.1)) { x.beginPath(); x.moveTo(u - P * 0.2, v); x.quadraticCurveTo(u, v + P * 0.1, u + P * 0.2, v - P * 0.02); x.stroke(); } // sauce ripples
        if (!small) for (const [u, v] of M.pts(A * 10, 124, 0.04)) { x.fillStyle = 'rgba(190,60,20,0.75)'; x.beginPath(); x.arc(u, v, P * 0.012, 0, TAU); x.fill(); } // paprika
        if (!small) for (const [u, v, i] of M.pts(A * 2, 125, 0.08)) { x.fillStyle = '#4a8a2a'; x.save(); x.translate(u, v); x.rotate(H(i, 126) * 3); x.fillRect(-P * 0.05, -P * 0.008, P * 0.1, P * 0.016); x.restore(); } }); // chives
        M.form('rgba(255,250,220,0.2)', 'rgba(110,70,0,0.36)'); break; }
      case 'flatwhite': { M.fill('#5a3a20'); M.piece(() => { // a cup-top of velvety microfoam per cell, tulip latte art poured into each
        x.fillStyle = M.rad(X0 + BW * 0.4, Y0 + BH * 0.4, Math.max(BW, BH) * 0.8, [[0, '#a87a50'], [1, '#7a5030']]); M.all(x.fillStyle);
        for (const [a, c] of M.cells) { const cx = (a + 0.5) * P, cy = (c + 0.5) * P, R = P * 0.44, sd = a * 3 + c * 5, rot = (H(sd, 1) - 0.5) * 0.8;
          x.fillStyle = 'rgba(30,14,4,0.45)'; x.beginPath(); x.arc(cx + P * 0.02, cy + P * 0.04, R, 0, TAU); x.fill();
          x.fillStyle = '#f4eee4'; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill(); x.fillStyle = 'rgba(200,190,180,0.5)'; x.beginPath(); x.arc(cx + R * 0.05, cy + R * 0.06, R, 0, TAU); x.arc(cx, cy, R * 0.9, 0, TAU, true); x.fill(); // the ceramic rim
          x.fillStyle = M.rad(cx - R * 0.2, cy - R * 0.2, R, [[0, '#c8905a'], [0.8, '#a06a3a'], [1, '#7a4a24']]); x.beginPath(); x.arc(cx, cy, R * 0.86, 0, TAU); x.fill(); // crema
          x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = 'rgba(250,240,224,0.95)';
          for (let q = 0; q < 3; q++) { const yy = R * (0.36 - q * 0.26), rr = R * (0.3 - q * 0.04); x.beginPath(); x.moveTo(-rr, yy); x.quadraticCurveTo(0, yy - rr * 1.5, rr, yy); x.quadraticCurveTo(0, yy - rr * 0.5, -rr, yy); x.fill(); } // the stacked tulip hearts
          x.fillRect(-R * 0.015, -R * 0.6, R * 0.03, R * 1.0); x.restore(); // the pull-through line
          x.fillStyle = 'rgba(255,255,255,0.35)'; ellipse(x, cx - R * 0.45, cy - R * 0.55, R * 0.24, R * 0.06, -0.6); x.fill(); } });
        M.form('rgba(255,240,220,0.18)', 'rgba(30,14,4,0.42)'); break; }
    }
  },
});
