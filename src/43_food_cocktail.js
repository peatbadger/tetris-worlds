/* ---- Speakeasy blocks MADE OF DRINKS (FoodMass) — v3: cocktail-photo glass ----
   Each piece is ONE glass vessel filled to a single level (FoodMass depth info: row-from-top / rows): the liquid
   surface + meniscus + empty glass above it exist only on the piece's top row; lower exposed tops are the glass
   shoulder. Thick glass walls (outer rim line, refracting glass body, inner edge), a lit wall with one long specular
   streak, a darker far wall, a heavy base with a caustic. Liquid colour comes from depth: bright where light enters
   at the surface, darker and more saturated further down. Clear ice refracts the drink. Live: rising bead streams
   that run on across cells, a gentle slosh at the surface.
   I lager (foam head) · O old fashioned (big clear cube, orange twist) · T negroni (ruby, cube, orange wheel)
   · S red wine (legs) · Z mojito (crushed ice, muddled mint at the bottom, lime) · J martini (olives) · L champagne. */
const CocktailFood = (() => {
  // surface (lit), body, depth (saturated dark)
  const LQ = { beer: ['#ffdc6a', '#eaa81e', '#a86a06'], oldfash: ['#c47838', '#76300e', '#340e02'], negroni: ['#f06a4a', '#b0201c', '#5a0612'], wine: ['#b8466a', '#6a1230', '#2a0210'], mojito: ['#e2f6a8', '#a6d262', '#4a8628'], martini: ['#f4fbff', '#c6dcea', '#6a8ea6'], champagne: ['#fff6d2', '#f2e2a2', '#c8ac62'] };
  const BUB = { beer: [3, 0.5], champagne: [5, 0.6], mojito: [1, 0.3] };
  const AIR = '#2c2420', SURF = 0.22;
  const M = FoodMass({
    FOOD: [null, 'beer', 'oldfash', 'negroni', 'wine', 'mojito', 'martini', 'champagne'],
    MAIN: [null, '#eaa81e', '#76300e', '#b0201c', '#6a1230', '#a6d262', '#c6dcea', '#f2e2a2'],
    soft: { beer: 1.4, wine: 1.5, champagne: 1.4, mojito: 1.2, martini: 1.5, negroni: 1.3, oldfash: 1.1 },
    R: 0.18, cutCol: 'rgba(255,255,255,0.22)', noPlanes: true, depth: true, diag: true, padK: 0.1,
    vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    paint(x, food, Q) {
      const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, dr } = Q;
      const [c1, c0, c2] = LQ[food], lx = vr & 3, ly = (vr >> 2) & 3;
      const top = !(mask & N) && dr === 0, shoulder = !(mask & N) && dr > 0;
      const gwT = Math.max(1.5, P * 0.085), hl = Math.max(1, P * 0.028), sy = top ? t + P * SURF : t - 2;
      const lin = (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st);
      const yTop = t - dr * P; // the piece's top edge in this cell's coordinates: depth runs from here
      const pieceSpace = (fn) => { x.save(); x.translate(C(0) - lx * P, yTop); fn(); x.restore(); };
      // liquid by depth — identical gradient for every cell of the piece, so the body is one seamless mass
      x.fillStyle = lin(0, yTop + P * SURF, 0, yTop + P * 4, [[0, c1], [0.12, mix(c1, c0, 0.55)], [0.34, c0], [0.75, mix(c0, c2, 0.6)], [1, c2]]);
      x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4);
      // a soft shaft of light falling through the liquid from the upper left (piece space)
      if (!small) pieceSpace(() => { x.fillStyle = 'rgba(255,250,235,0.09)'; x.beginPath(); x.moveTo(P * 0.2, 0); x.lineTo(P * 1.25, 0); x.lineTo(P * 3.4, P * 4); x.lineTo(P * 2.1, P * 4); x.closePath(); x.fill(); });
      // contents inside the liquid
      if (food === 'mojito') {
        pieceSpace(() => { // crushed ice through the whole glass: pale, faceted, each with one lit edge
          const n = small ? 6 : 22;
          for (let i = 0; i < n; i++) {
            const cx = P * (0.15 + hash(i, 3, 1) * 3.7), cy = P * (SURF + 0.1 + hash(i, 3, 2) * 3.6), q = P * (0.07 + hash(i, 3, 3) * 0.08), a = hash(i, 3, 4) * 3;
            const pts = [0, 1, 2, 3, 4].map((k) => [cx + Math.cos(a + k * 1.26 + hash(i, k, 5) * 0.4) * q, cy + Math.sin(a + k * 1.26 + hash(i, k, 5) * 0.4) * q * 0.8]);
            x.fillStyle = 'rgba(252,255,246,0.26)'; x.beginPath(); pts.forEach(([px, py], k) => (k ? x.lineTo(px, py) : x.moveTo(px, py))); x.closePath(); x.fill();
            x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = Math.max(0.6, P * 0.014); x.beginPath(); x.moveTo(...pts[3]); x.lineTo(...pts[4]); x.lineTo(...pts[0]); x.stroke();
          }
        });
        if (!small) pieceSpace(() => { for (let i = 0; i < 7; i++) { const cx = P * (0.2 + hash(i, 6, 1) * 3.6), cy = P * (SURF + 0.3 + hash(i, 6, 2) * 3.4), q = P * (0.11 + hash(i, 6, 3) * 0.05), a = hash(i, 6, 4) * 6; x.save(); x.translate(cx, cy); x.rotate(a); x.fillStyle = 'rgba(40,110,40,0.6)'; x.beginPath(); x.moveTo(-q, 0); x.quadraticCurveTo(0, -q * 0.6, q, 0); x.quadraticCurveTo(0, q * 0.6, -q, 0); x.fill(); x.strokeStyle = 'rgba(150,210,120,0.5)'; x.lineWidth = Math.max(0.6, P * 0.012); x.beginPath(); x.moveTo(-q * 0.8, 0); x.lineTo(q * 0.8, 0); x.stroke(); x.restore(); } });
        if (!(mask & S)) { // muddled mint + lime pulp settled on the bottom: a soft dark-green layer seen through the ice
          x.fillStyle = linear(x, 0, b - P * 0.5, 0, b - P * 0.16, [[0, 'rgba(60,110,40,0)'], [1, 'rgba(60,110,40,0.45)']]); x.fillRect(l - 2, b - P * 0.5, r - l + 4, P * 0.34);
          if (!small) for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(40,86,34,0.28)'; ellipse(x, C(0.15 + hash(vr, i, 21) * 0.7), b - P * (0.22 + hash(vr, i, 22) * 0.1), P * 0.14, P * 0.05, hash(vr, i, 24) - 0.5); x.fill(); }
        }
      }
      if (food === 'martini' || food === 'wine' || food === 'negroni' || food === 'oldfash') { // faint caustic ripple lines (light through a still drink)
        if (!small) pieceSpace(() => { x.strokeStyle = 'rgba(255,255,255,0.05)'; x.lineWidth = Math.max(0.7, P * 0.02); for (let i = 0; i < 4; i++) { const y0 = P * (0.6 + i * 0.85); x.beginPath(); x.moveTo(0, y0); x.bezierCurveTo(P * 1.2, y0 - P * 0.12, P * 2.4, y0 + P * 0.12, P * 4, y0 - P * 0.04); x.stroke(); } });
      }
      // far wall: liquid darkens toward it, then the wall itself
      if (!(mask & E)) {
        x.fillStyle = lin(r - P * 0.3, 0, r - gwT, 0, [[0, rgba(c2, 0)], [1, rgba(c2, 0.4)]]); x.fillRect(r - P * 0.3, sy, P * 0.3, b - sy + 2);
        x.fillStyle = rgba(mix(c2, '#000000', 0.25), 0.6); x.fillRect(r - gwT, t - 2, gwT + 2, b - t + 4);
        x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(r - gwT - hl * 0.6, sy, hl * 0.6, b - sy + 2);
        x.fillStyle = 'rgba(255,240,220,0.32)'; x.fillRect(r - hl * 1.2, t - 2, hl * 0.8, b - t + 4); // rim light on the far edge
      }
      // the base: heavy glass with the light focused through the drink (caustic)
      if (!(mask & S)) {
        const bt = b - P * 0.16;
        x.fillStyle = lin(0, bt - P * 0.25, 0, bt, [[0, rgba(c2, 0)], [1, rgba(c2, 0.45)]]); x.fillRect(l - 2, bt - P * 0.25, r - l + 4, P * 0.25);
        x.fillStyle = mix(AIR, c0, 0.35); x.fillRect(l - 2, bt, r - l + 4, b - bt + 2);
        x.fillStyle = lin(0, bt, 0, b, [[0, rgba(c1, 0.75)], [0.35, rgba(c1, 0.2)], [1, rgba(c1, 0.05)]]); x.fillRect(l - 2, bt, r - l + 4, b - bt + 2);
        if (!small) { x.fillStyle = rgba(mix(c1, '#ffffff', 0.5), 0.55); ellipse(x, C(0.5), bt + P * 0.05, P * 0.32, P * 0.025); x.fill(); }
        x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(l - 2, bt, r - l + 4, hl * 0.7);
        x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(l - 2, b - hl * 1.6, r - l + 4, hl * 0.7);
      }
      // glass shoulder (an exposed top below the surface level): the glass ceiling, liquid pressed against it
      if (shoulder) {
        x.fillStyle = rgba(c1, 0.55); x.fillRect(l - 2, t - 2, r - l + 4, gwT + 2);
        x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(l - 2, t - 2, r - l + 4, gwT + 2);
        x.fillStyle = rgba(c2, 0.5); x.fillRect(l - 2, t + gwT, r - l + 4, hl * 0.7);
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(l - 2, t, r - l + 4, hl);
      }
      // the top: empty glass above a meniscus that climbs the walls (lager: a creamy head instead)
      if (top) {
        if (food === 'beer') {
          const fb = t + P * 0.46;
          x.fillStyle = lin(0, t, 0, fb, [[0, '#fbf6ea'], [0.65, '#f2e6cc'], [1, '#e0c890']]);
          x.beginPath(); x.moveTo(l - 2, t - 2); x.lineTo(r + 2, t - 2); x.lineTo(r + 2, fb);
          const n = 5; for (let i = n; i >= 0; i--) { const px = lerp(l - 2, r + 2, i / n), py = fb + (hash(lx, i, 11) - 0.5) * P * 0.05; x.quadraticCurveTo(px + P * 0.06, py + P * 0.04, px, py); }
          x.closePath(); x.fill();
          x.fillStyle = 'rgba(255,214,120,0.4)'; x.fillRect(l - 2, fb - P * 0.02, r - l + 4, P * 0.04);
          x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(l - 2, t + P * 0.06, r - l + 4, P * 0.035);
          x.fillStyle = 'rgba(200,170,120,0.18)'; x.fillRect(l - 2, t + P * 0.22, r - l + 4, P * 0.05);
          if (!small) for (let i = 0; i < 14; i++) { const fx = lerp(l + P * 0.04, r - P * 0.04, hash(lx, i, 41)), fy = t + P * (0.08 + hash(lx, i, 42) * 0.3), fr = P * (0.02 + hash(lx, i, 43) * 0.025); x.strokeStyle = 'rgba(214,190,140,0.55)'; x.lineWidth = Math.max(0.6, P * 0.01); x.beginPath(); x.arc(fx, fy, fr, 0, TAU); x.stroke(); }
        } else {
          x.fillStyle = AIR; x.fillRect(l - 2, t - 2, r - l + 4, sy - t + 2);
          x.fillStyle = rgba(c1, 0.16); x.fillRect(l - 2, t - 2, r - l + 4, sy - t + 2);
          x.fillStyle = 'rgba(255,255,255,0.07)'; x.fillRect(l - 2, t + P * 0.07, r - l + 4, P * 0.05);
          if (food === 'wine' && !small) { x.strokeStyle = 'rgba(160,50,80,0.35)'; x.lineWidth = Math.max(0.8, P * 0.016); for (let i = 0; i < 3; i++) { const qx = C(0.18 + hash(lx, i, 14) * 0.64), qy = t + P * (0.05 + hash(lx, i, 15) * 0.05); x.beginPath(); x.moveTo(qx, qy); x.lineTo(qx + P * 0.004, sy); x.stroke(); } }
          // light entering at the surface
          x.fillStyle = lin(0, sy, 0, sy + P * 0.18, [[0, rgba(mix(c1, '#ffffff', 0.35), 0.85)], [1, rgba(c1, 0)]]); x.fillRect(l - 2, sy, r - l + 4, P * 0.18);
          // meniscus line, curling up the walls
          x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = Math.max(1, P * 0.022); x.beginPath();
          if (!(mask & W)) { x.moveTo(l + gwT, sy - P * 0.075); x.quadraticCurveTo(l + gwT, sy, l + P * 0.16, sy); } else x.moveTo(l - 2, sy);
          if (!(mask & E)) { x.lineTo(r - P * 0.16, sy); x.quadraticCurveTo(r - gwT, sy, r - gwT, sy - P * 0.075); } else x.lineTo(r + 2, sy);
          x.stroke();
        }
        // ice: one big clear cube floating at the surface, the drink refracted (paler, shifted) through it
        if ((food === 'oldfash' || food === 'negroni') && !(mask & W) && !small) {
          const q = P * (food === 'oldfash' ? 0.7 : 0.56), cx = C(0.52) + (mask & E ? P * 0.06 : 0), cy = sy + q * 0.24, rot = (hash(lx, 16) - 0.5) * 0.35;
          x.save(); x.translate(cx, cy); x.rotate(rot);
          const k = q * 0.14, h = q / 2, cube = () => { x.beginPath(); x.moveTo(-h + k, -h); x.lineTo(h - k, -h); x.quadraticCurveTo(h, -h, h, -h + k); x.lineTo(h, h - k); x.quadraticCurveTo(h, h, h - k, h); x.lineTo(-h + k, h); x.quadraticCurveTo(-h, h, -h, h - k); x.lineTo(-h, -h + k); x.quadraticCurveTo(-h, -h, -h + k, -h); x.closePath(); };
          cube(); x.save(); x.clip();
          const sl = sy - cy; // surface line in cube space (approx.)
          x.fillStyle = rgba(mix(c1, '#ffffff', 0.45), 0.55); x.fillRect(-h, sl, q, h - sl); // under the surface: drink seen through ice, paler
          x.fillStyle = 'rgba(240,236,228,0.16)'; x.fillRect(-h, -h, q, sl + h); // above: clear ice against the dark glass
          x.fillStyle = 'rgba(255,255,255,0.22)'; x.beginPath(); x.moveTo(-h, -h); x.lineTo(h, -h); x.lineTo(h * 0.55, -h * 0.55); x.lineTo(-h * 0.55, -h * 0.55); x.closePath(); x.fill(); // top facet
          x.fillStyle = rgba(c2, 0.28); x.beginPath(); x.moveTo(h, -h); x.lineTo(h, h); x.lineTo(h * 0.55, h * 0.55); x.lineTo(h * 0.55, -h * 0.55); x.closePath(); x.fill(); // shaded side facet
          x.fillStyle = 'rgba(255,255,255,0.1)'; x.beginPath(); x.moveTo(-h * 0.55, h * 0.55); x.lineTo(h * 0.55, -h * 0.55); x.lineTo(h * 0.55, -h * 0.3); x.lineTo(-h * 0.3, h * 0.55); x.closePath(); x.fill(); // soft internal reflection
          x.restore();
          cube(); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = Math.max(1, q * 0.04); x.stroke();
          x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = Math.max(1, q * 0.05); x.beginPath(); x.moveTo(-h, h * 0.2); x.lineTo(-h, -h + k); x.quadraticCurveTo(-h, -h, -h + k, -h); x.lineTo(h * 0.2, -h); x.stroke();
          x.restore();
        }
      }
      // lit wall: thick glass refracting the drink brighter, one long specular streak running the piece's height
      if (!(mask & W)) {
        const y0 = top ? sy : t - 2;
        x.fillStyle = rgba(mix(c1, '#ffffff', 0.25), 0.5); x.fillRect(l - 2, y0, gwT + 2, b - y0 + 2);
        x.fillStyle = 'rgba(255,255,255,0.14)'; x.fillRect(l - 2, t - 2, gwT + 2, b - t + 4);
        x.fillStyle = rgba(c2, 0.45); x.fillRect(l + gwT, y0, hl * 0.6, b - y0 + 2);
        x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(l, t - 2, hl, b - t + 4);
        const s0 = top ? sy + P * 0.08 : t - 2, s1 = !(mask & S) ? b - P * 0.22 : b + 2;
        if (s1 > s0) { x.fillStyle = lin(0, s0, 0, s1, [[0, 'rgba(255,255,255,0.0)'], [top ? 0.25 : 0, 'rgba(255,255,255,0.42)'], [!(mask & S) ? 0.8 : 1, 'rgba(255,255,255,0.42)'], [1, 'rgba(255,255,255,0)']]); x.fillRect(l + gwT + P * 0.06, s0, P * 0.045, s1 - s0); }
      }
      // concave corners: the wall coming down from one neighbour meets the other neighbour's shoulder (or base).
      // Cut the little gap square out of the mass, then mitre the glass round the corner.
      const NE = 16, SE = 32, SW = 64, NW = 128, g = Math.max(1, Math.round(P * 0.055)), G = Q.pad + g, RR = Q.pad + P - g, BB = Q.pad + P - g, bh = P * 0.16;
      const cut = (x0, y0, x1, y1) => { x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000'; x.fillRect(x0, y0, x1 - x0, y1 - y0); x.restore(); };
      const litGlass = (x0, y0, w, h) => { x.fillStyle = rgba(mix(c1, '#ffffff', 0.25), 0.5); x.fillRect(x0, y0, w, h); x.fillStyle = 'rgba(255,255,255,0.14)'; x.fillRect(x0, y0, w, h); };
      const farGlass = (x0, y0, w, h) => { x.fillStyle = rgba(mix(c2, '#000000', 0.25), 0.6); x.fillRect(x0, y0, w, h); };
      const baseGlass = (x0, y0, w, h) => { x.fillStyle = mix(AIR, c0, 0.35); x.fillRect(x0, y0, w, h); x.fillStyle = rgba(c1, 0.35); x.fillRect(x0, y0, w, h); };
      if ((mask & N) && (mask & W) && !(mask & NW)) {
        cut(l - 2, t - 2, G, G);
        litGlass(G, t - 2, gwT, G + gwT - t + 2); litGlass(l - 2, G, G - l + 2, gwT);
        x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(G, t - 2, hl, G - t + 2 + hl); x.fillRect(l - 2, G, G - l + 2, hl);
        x.fillStyle = rgba(c2, 0.5); x.fillRect(G + gwT, t - 2, hl * 0.6, G + gwT - t + 2); x.fillRect(l - 2, G + gwT, G + gwT - l + 2, hl * 0.6);
      }
      if ((mask & N) && (mask & E) && !(mask & NE)) {
        cut(RR, t - 2, r + 2, G);
        farGlass(RR - gwT, t - 2, gwT, G + gwT - t + 2); litGlass(RR, G, r - RR + 2, gwT);
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(RR, G, r - RR + 2, hl); x.fillStyle = 'rgba(255,240,220,0.32)'; x.fillRect(RR - hl * 1.2, t - 2, hl * 0.8, G - t + 2);
        x.fillStyle = rgba(c2, 0.5); x.fillRect(RR - gwT - hl * 0.6, t - 2, hl * 0.6, G + gwT - t + 2); x.fillRect(RR - gwT, G + gwT, r - RR + gwT + 2, hl * 0.6);
      }
      if ((mask & S) && (mask & W) && !(mask & SW)) {
        cut(l - 2, BB, G, b + 2);
        baseGlass(l - 2, BB - bh, G - l + 2, bh); litGlass(G, BB - bh, gwT, b - BB + bh + 2);
        x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(l - 2, BB - bh, G + gwT - l + 2, hl * 0.7); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(G, BB - bh, hl, b - BB + bh + 2);
      }
      if ((mask & S) && (mask & E) && !(mask & SE)) {
        cut(RR, BB, r + 2, b + 2);
        baseGlass(RR, BB - bh, r - RR + 2, bh); farGlass(RR - gwT, BB - bh, gwT, b - BB + bh + 2);
        x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(RR - gwT, BB - bh, r - RR + gwT + 2, hl * 0.7);
      }
      if (top) { x.fillStyle = 'rgba(255,255,255,0.75)'; x.fillRect(l, t, r - l, hl); x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(l, t + hl * 1.6, r - l, hl * 0.6); } // rim with thickness
    },
    live(c, food, o) {
      const { s, mask, seed, T, wob, gx, gy, hash, small, dr } = o;
      const top = !(mask & FM_N) && dr === 0, sy = -s / 2 + s * (food === 'beer' ? 0.46 : SURF), bot = !(mask & FM_S) ? s / 2 - s * 0.18 : s / 2;
      const B = BUB[food];
      if (B && !small) { // bead streams in world space: they run on from the cell below into this one
        c.fillStyle = 'rgba(255,253,240,0.85)';
        for (let i = 0; i < B[0]; i++) {
          const bx = (hash(gx, i, 7) - 0.5) * s * 0.56, sp = s * (0.13 + hash(gx, i, 8) * 0.06), v = s * B[1] * (0.8 + hash(gx, i, 9) * 0.5), ph = hash(gx, i, 10) * sp;
          const yC = (gy + 0.5) * s, off = (((ph - T * v - yC) % sp) + sp) % sp; // first bead below the cell top
          for (let yy = -s / 2 + off; yy < bot; yy += sp) { if (top && yy < sy + s * 0.03) continue; const kk = Math.round((yC + yy + T * v - ph) / sp); if (hash(kk, i, gx) < 0.3) continue; const rr = s * (food === 'champagne' ? 0.022 : 0.016) * (1.25 - (yy + s / 2) / s * 0.4); c.globalAlpha = (o.alpha ?? 1) * (food === 'champagne' ? 0.5 : 0.25) * (1 + 1.4 * ((yy + s / 2) / s < 0.5 ? 1 : 0.6)); c.beginPath(); c.arc(bx + (hash(kk, i, 5) - 0.5) * s * 0.035 + Math.sin(T * 2.4 + kk + i) * s * 0.006, yy, rr * (0.7 + hash(kk, i, 6) * 0.6), 0, TAU); c.fill(); }
        }
        c.globalAlpha = o.alpha ?? 1;
      }
      if (top && food !== 'beer') { // slosh: the surface tilts and ripples, more right after landing / rotating
        const amp = s * (0.006 + wob * 0.05), ph = T * 2.6 + gx * 0.9, [c1] = LQ[food];
        const yAt = (u) => sy + Math.sin(ph + u * 3.2) * amp + (u - 0.5) * wob * s * 0.08, xa = -s / 2 + (mask & FM_W ? 0 : s * 0.1), xb = s / 2 - (mask & FM_E ? 0 : s * 0.1), X = (u) => lerp(xa, xb, u);
        if (amp > s * 0.012) {
          c.beginPath(); c.moveTo(xa, sy - s * 0.08); c.lineTo(xb, sy - s * 0.08); for (let i = 6; i >= 0; i--) c.lineTo(X(i / 6), yAt(i / 6)); c.closePath(); c.fillStyle = AIR; c.fill();
          c.beginPath(); c.moveTo(xa, sy + s * 0.08); c.lineTo(xb, sy + s * 0.08); for (let i = 6; i >= 0; i--) c.lineTo(X(i / 6), yAt(i / 6)); c.closePath(); c.fillStyle = c1; c.fill();
        }
        c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = Math.max(1, s * 0.018); c.beginPath(); for (let i = 0; i <= 6; i++) { const u = i / 6; i ? c.lineTo(X(u), yAt(u)) : c.moveTo(X(u), yAt(u)); } c.stroke();
      }
      if (top && !(mask & FM_W) && !small) { // one real garnish on the piece's top-left rim
        const bob = Math.sin(T * 2.2 + seed) * s * (0.008 + wob * 0.04), rot = Math.sin(T * 1.6 + seed) * (0.05 + wob * 0.3);
        c.save(); c.translate(s * 0.14, sy + bob); c.rotate(rot);
        if (food === 'martini') { // pick through two olives, pimento showing
          c.strokeStyle = '#b8a27a'; c.lineWidth = Math.max(1, s * 0.02); c.beginPath(); c.moveTo(-s * 0.32, -s * 0.26); c.lineTo(s * 0.16, s * 0.14); c.stroke();
          [[-0.12, -0.07], [0.02, 0.04]].forEach(([ox, oy]) => { c.fillStyle = '#5f6e2c'; ellipse(c, s * ox, s * oy, s * 0.09, s * 0.07, 0.6); c.fill(); c.fillStyle = 'rgba(40,50,10,0.35)'; ellipse(c, s * (ox + 0.02), s * (oy + 0.02), s * 0.07, s * 0.05, 0.6); c.fill(); c.fillStyle = 'rgba(255,255,230,0.3)'; ellipse(c, s * (ox - 0.035), s * (oy - 0.03), s * 0.028, s * 0.016, 0.6); c.fill(); c.fillStyle = '#a8402e'; c.beginPath(); c.arc(s * (ox + 0.05), s * (oy - 0.03), s * 0.022, 0, TAU); c.fill(); });
        } else if (food === 'oldfash') { // a wide strip of expressed orange peel draped over the rim: zest outside, pale pith on the cut edge
          c.beginPath(); c.moveTo(-s * 0.3, -s * 0.02); c.bezierCurveTo(-s * 0.18, -s * 0.12, -s * 0.02, -s * 0.1, s * 0.12, -s * 0.03); c.lineTo(s * 0.13, s * 0.03); c.bezierCurveTo(-s * 0.02, -s * 0.03, -s * 0.18, -s * 0.05, -s * 0.29, s * 0.04); c.closePath();
          c.fillStyle = '#d27424'; c.fill(); c.strokeStyle = 'rgba(250,226,180,0.85)'; c.lineWidth = Math.max(0.6, s * 0.012); c.beginPath(); c.moveTo(-s * 0.29, s * 0.04); c.bezierCurveTo(-s * 0.18, -s * 0.05, -s * 0.02, -s * 0.03, s * 0.13, s * 0.03); c.stroke();
          c.fillStyle = 'rgba(255,190,110,0.5)'; c.beginPath(); c.moveTo(-s * 0.24, -s * 0.04); c.bezierCurveTo(-s * 0.14, -s * 0.1, -s * 0.02, -s * 0.085, s * 0.08, -s * 0.04); c.lineTo(s * 0.06, -s * 0.025); c.bezierCurveTo(-s * 0.04, -s * 0.06, -s * 0.14, -s * 0.07, -s * 0.24, -s * 0.02); c.closePath(); c.fill();
        } else if (food === 'negroni') { // thin orange wheel standing in the drink, half submerged, translucent flesh
          c.fillStyle = '#d8701e'; c.beginPath(); c.arc(0, 0, s * 0.19, Math.PI, TAU); c.fill(); c.fillStyle = 'rgba(250,196,110,0.92)'; c.beginPath(); c.arc(0, 0, s * 0.155, Math.PI, TAU); c.fill();
          c.strokeStyle = 'rgba(232,140,50,0.65)'; c.lineWidth = Math.max(0.6, s * 0.012); c.beginPath(); for (let i = 1; i < 6; i++) { const a = Math.PI + i * Math.PI / 6; c.moveTo(0, 0); c.lineTo(Math.cos(a) * s * 0.145, Math.sin(a) * s * 0.145); } c.stroke();
          c.fillStyle = 'rgba(255,240,210,0.6)'; c.fillRect(-s * 0.19, -s * 0.01, s * 0.38, s * 0.02);
        } else if (food === 'mojito') { // lime wedge on the rim + a mint sprig standing up out of the ice
          c.fillStyle = '#4e8a2c'; c.beginPath(); c.arc(0, 0, s * 0.16, Math.PI, TAU); c.fill(); c.fillStyle = '#cfe6a0'; c.beginPath(); c.arc(0, 0, s * 0.125, Math.PI, TAU); c.fill();
          c.strokeStyle = '#3a6a2a'; c.lineWidth = Math.max(0.8, s * 0.014); c.beginPath(); c.moveTo(s * 0.2, s * 0.04); c.lineTo(s * 0.24, -s * 0.2); c.stroke();
          c.fillStyle = '#3d7432'; [[0.19, -0.12, -0.7], [0.29, -0.16, 0.6], [0.23, -0.23, -0.1]].forEach(([ox, oy, a]) => { ellipse(c, s * ox, s * oy, s * 0.06, s * 0.03, a); c.fill(); });
        }
        c.restore();
      }
    },
    clear(food, q) {
      const { X, Y, s, r, vr, push, v } = q, [c1, c0] = LQ[food];
      push({ k: 'pop', v, x: X, y: Y, vr, life: 0.22 });
      for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (r(i) - 0.5) * 2.2; push({ k: 'dot', col: i % 2 ? c0 : c1, r: 0.05 + r(i + 4) * 0.04, x: X, y: Y, vx: Math.cos(a) * s * (2 + r(i + 9) * 3), vy: Math.sin(a) * s * (3 + r(i + 5) * 3), life: 0.7 }); }
      for (let i = 0; i < 3; i++) push({ k: 'bubble', x: X + (r(i + 12) - 0.5) * s * 0.8, y: Y, vx: 0, vy: -s * (2 + r(i + 13) * 2), g: -1, life: 0.8, r: 0.04 + r(i) * 0.04 });
      if (food === 'beer') for (let i = 0; i < 3; i++) push({ k: 'dot', col: '#f6eedb', r: 0.09, x: X, y: Y - s * 0.3, vx: (r(i + 20) - 0.5) * s * 3, vy: -s * 2, g: 4, life: 0.7 });
      return true;
    },
  });
  return M;
})();
SKINSETS.cocktail = CocktailFood.skin();
(() => { const st = STAGES.find((s) => s.id === 'speakeasy'); if (st) { st.palette = CocktailFood.MAIN.slice(1); st.desc = 'Flat Art Deco geometry: a password at the door, a bartender who really shakes and pours, a jazz trio to the side and a singer who steps into the spotlight — upright bass, brushes, muted horn.'; } })();
