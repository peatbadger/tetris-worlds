/* ================= Flat geometric sushi (mid-century style) =================
   Shared by the geometric Kaiten Sushi scene (belt plates, hand-held pieces) and the sushi block skin.
   piece(ctx, kind, cx, baseY, w, L): side view, sitting on baseY, w = rice width. L = colour transform (lit). */
const GeoSushi = (() => {
  const ID = (c) => c;
  const KINDS = ['salmon', 'maguro', 'tamago', 'ikura', 'ebi', 'kappa', 'saba', 'inari', 'uni', 'tako', 'hamachi', 'tekka', 'negitoro', 'engawa'];
  const PLATES = { red: '#d4483a', grey: '#a19a8c', gold: '#e0a62e', teal: '#2f7f86', navy: '#24425e', orange: '#e47a32', white: '#efe7d8', black: '#2a2622' };
  const PLATE_OF = { salmon: 'red', maguro: 'grey', tamago: 'gold', ikura: 'red', ebi: 'teal', kappa: 'gold', saba: 'navy', inari: 'orange', uni: 'black', tako: 'teal', hamachi: 'grey', tekka: 'red', negitoro: 'navy', engawa: 'white' };
  function poly(c, pts) { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); }
  function rice(c, cx, by, w, h, L) {
    roundRect(c, cx - w / 2, by - h, w, h, h * 0.42); c.fillStyle = L('#f7f0e2'); c.fill();
    c.save(); c.clip(); c.fillStyle = L('#e4d8c2'); c.fillRect(cx - w / 2, by - h * 0.38, w, h); c.restore(); // flat lower shade plane
  }
  function slab(c, cx, by, w, L, top, shade, opts = {}) { // the draped topping
    const l = cx - w * 0.6, r = cx + w * 0.58, yb = by - w * 0.26, yt = by - w * 0.6;
    c.beginPath(); c.moveTo(l, yb + w * 0.04);
    c.quadraticCurveTo(l - w * 0.05, yt + w * 0.06, l + w * 0.16, yt);
    c.lineTo(r - w * 0.12, yt + w * 0.03);
    c.quadraticCurveTo(r + w * 0.07, yt + w * 0.07, r + w * 0.02, yb + w * 0.02);
    c.quadraticCurveTo(cx, yb + w * 0.1, l, yb + w * 0.04); c.closePath();
    c.fillStyle = L(top); c.fill();
    c.save(); c.clip();
    c.fillStyle = L(shade); c.fillRect(l - 4, yb - w * 0.07, w * 1.4, w * 0.3); // underside plane
    if (opts.stripes) { c.fillStyle = L(opts.stripes); for (let i = 0; i < 4; i++) { const x0 = l + w * (0.14 + i * 0.27); poly(c, [x0, yt - 2, x0 + w * 0.07, yt - 2, x0 - w * 0.08, yb + w * 0.1, x0 - w * 0.15, yb + w * 0.1]); c.fill(); } }
    if (opts.band) { c.fillStyle = L(opts.band); c.fillRect(l - 4, yt - 2, w * 1.4, w * 0.11); }
    if (opts.sheen) { c.fillStyle = 'rgba(255,255,255,0.22)'; poly(c, [l + w * 0.2, yt + w * 0.03, l + w * 0.62, yt + w * 0.05, l + w * 0.5, yt + w * 0.1, l + w * 0.16, yt + w * 0.09]); c.fill(); }
    c.restore();
    return { l, r, yt, yb };
  }
  function piece(c, kind, cx, by, w, L = ID) {
    switch (kind) {
      case 'tamago': {
        rice(c, cx, by, w * 0.92, w * 0.36, L);
        roundRect(c, cx - w * 0.58, by - w * 0.66, w * 1.16, w * 0.36, w * 0.06); c.fillStyle = L('#f6c640'); c.fill();
        c.fillStyle = L('#e3a52c'); c.fillRect(cx - w * 0.58, by - w * 0.4, w * 1.16, w * 0.1);
        c.fillStyle = L('#ffe07a'); c.fillRect(cx - w * 0.5, by - w * 0.62, w * 0.6, w * 0.06);
        c.fillStyle = L('#1d2a22'); c.fillRect(cx - w * 0.1, by - w * 0.7, w * 0.2, w * 0.7); return;
      }
      case 'ikura': case 'uni': case 'negitoro': {
        roundRect(c, cx - w * 0.5, by - w * 0.56, w, w * 0.56, w * 0.1); c.fillStyle = L('#1b2620'); c.fill();
        c.fillStyle = L('#2c3a30'); c.fillRect(cx + w * 0.12, by - w * 0.56, w * 0.38, w * 0.56); // lit facet
        c.fillStyle = L('#f4ecdc'); c.fillRect(cx - w * 0.46, by - w * 0.58, w * 0.92, w * 0.06);
        if (kind === 'ikura') {
          const pts = [[-0.32, 0], [-0.1, 0.02], [0.12, 0], [0.33, 0.02], [-0.22, -0.13], [0.01, -0.14], [0.23, -0.12], [-0.1, -0.25], [0.12, -0.24]];
          for (const [dx, dy] of pts) { const x = cx + dx * w, y = by - w * 0.64 + dy * w; c.beginPath(); c.arc(x, y, w * 0.12, 0, TAU); c.fillStyle = L('#f05a1e'); c.fill(); c.beginPath(); c.arc(x - w * 0.035, y - w * 0.04, w * 0.035, 0, TAU); c.fillStyle = 'rgba(255,240,200,0.9)'; c.fill(); }
        } else if (kind === 'uni') {
          for (let i = 0; i < 4; i++) { ellipse(c, cx + (i - 1.5) * w * 0.24, by - w * 0.68, w * 0.15, w * 0.11); c.fillStyle = L(i % 2 ? '#f3a72c' : '#e88c1e'); c.fill(); }
        } else {
          ellipse(c, cx, by - w * 0.66, w * 0.48, w * 0.17); c.fillStyle = L('#e98b98'); c.fill();
          c.fillStyle = L('#5aa83a'); for (let i = 0; i < 6; i++) c.fillRect(cx + (i - 2.5) * w * 0.14, by - w * (0.72 + (i % 2) * 0.05), w * 0.06, w * 0.05);
        }
        return;
      }
      case 'kappa': case 'tekka': {
        for (const dx of [-0.3, 0.3]) {
          const x = cx + dx * w, rw = w * 0.27;
          c.fillStyle = L('#1b2620'); c.fillRect(x - rw, by - w * 0.48, rw * 2, w * 0.48);
          c.fillStyle = L('#2c3a30'); c.fillRect(x + rw * 0.2, by - w * 0.48, rw * 0.8, w * 0.48);
          ellipse(c, x, by - w * 0.48, rw, w * 0.13); c.fillStyle = L('#1b2620'); c.fill();
          ellipse(c, x, by - w * 0.48, rw * 0.82, w * 0.1); c.fillStyle = L('#f6efe0'); c.fill();
          ellipse(c, x, by - w * 0.48, rw * 0.36, w * 0.05); c.fillStyle = L(kind === 'kappa' ? '#62b03c' : '#d22a3c'); c.fill();
        }
        return;
      }
      case 'inari': {
        c.beginPath(); c.moveTo(cx - w * 0.55, by); c.lineTo(cx - w * 0.46, by - w * 0.5); c.quadraticCurveTo(cx, by - w * 0.66, cx + w * 0.46, by - w * 0.5); c.lineTo(cx + w * 0.55, by); c.closePath();
        c.fillStyle = L('#c98a3a'); c.fill(); c.fillStyle = L('#a86a26'); c.fillRect(cx - w * 0.6, by - w * 0.16, w * 1.2, w * 0.16);
        ellipse(c, cx, by - w * 0.52, w * 0.38, w * 0.08); c.fillStyle = L('#f4ecdc'); c.fill(); return;
      }
    }
    rice(c, cx, by, w * 0.9, w * 0.36, L);
    switch (kind) {
      case 'maguro': slab(c, cx, by, w, L, '#c8283a', '#9c1a2c', { sheen: 1 }); break;
      case 'tekkadon': break;
      case 'ebi': { const s = slab(c, cx, by, w, L, '#f6efe6', '#e6c8b8', { stripes: '#ef6a3a' }); poly(c, [s.r - w * 0.04, s.yt + w * 0.06, s.r + w * 0.2, s.yt - w * 0.06, s.r + w * 0.18, s.yb + w * 0.04]); c.fillStyle = L('#e2442a'); c.fill(); break; }
      case 'saba': slab(c, cx, by, w, L, '#d8dee4', '#a8b4c0', { band: '#4a6a8a', stripes: null }); c.fillStyle = L('#2c4664'); for (let i = 0; i < 3; i++) { const x0 = cx - w * 0.36 + i * w * 0.28; poly(c, [x0, by - w * 0.6, x0 + w * 0.1, by - w * 0.6, x0 + w * 0.04, by - w * 0.47]); c.fill(); } break;
      case 'tako': { const s = slab(c, cx, by, w, L, '#f4e4de', '#dcc0b6'); c.fillStyle = L('#8c2a4a'); c.fillRect(s.l + w * 0.1, s.yt - 1, w * 1.0, w * 0.1); break; }
      case 'hamachi': slab(c, cx, by, w, L, '#f2cfb4', '#ddb090', { sheen: 1 }); break;
      case 'engawa': slab(c, cx, by, w, L, '#f4ead8', '#ddd0b8', { stripes: '#e4d6bc' }); break;
      default: slab(c, cx, by, w, L, '#f2763a', '#d65a24', { stripes: '#ffd9c0' });
    }
  }
  /* kaiten plate seen at a low angle; returns the top-surface y where food sits */
  function plate(c, x, y, W, col, L = ID) {
    const rx = W * 0.62, ry = W * 0.19;
    ellipse(c, x, y + ry * 0.38, rx * 0.86, ry * 0.86); c.fillStyle = L(shade(col, -0.35)); c.fill();
    ellipse(c, x, y, rx, ry); c.fillStyle = L(col); c.fill();
    ellipse(c, x, y + ry * 0.06, rx * 0.68, ry * 0.62); c.fillStyle = L(shade(col, -0.12)); c.fill();
    return y + ry * 0.12;
  }
  function dome(c, x, y, W) {
    const rx = W * 0.6, h = W * 0.72;
    c.beginPath(); c.ellipse(x, y, rx, h, 0, Math.PI, TAU); c.closePath(); c.fillStyle = 'rgba(235,245,255,0.16)'; c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.45)'; c.lineWidth = W * 0.04; c.beginPath(); c.ellipse(x, y, rx * 0.8, h * 0.84, 0, Math.PI * 1.15, Math.PI * 1.45); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.arc(x, y - h - W * 0.03, W * 0.07, 0, TAU); c.fill();
  }
  return { KINDS, PLATES, PLATE_OF, piece, plate, dome, poly };
})();
