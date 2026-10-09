const SKINSETS = {}; // themed skin sets: { base(ctx, type, px, col), live?(ctx, type, s, T, st), key?() -> cache variant }
/* ---- Kaiten Sushi blocks (GEOMETRIC edition): flat true-colour nigiri / maki / gunkan on palette-suited tiles,
   no faces. Tiles follow the world clock (SushiPal slots, held toward the lunch set so they stay readable at night). ---- */
const SkinKit = (() => { // shared by every world's skin set
  function tile(x, P, c0, c1, r = 0.16) { roundRect(x, 0.5, 0.5, P - 1, P - 1, P * r); x.fillStyle = linear(x, 0, 0, P, P, [[0, c0], [1, c1]]); x.fill(); }
  function grains(x, rnd, x0, y0, w, h, n, P, col = '#fbf8f0') {
    for (let i = 0; i < n; i++) {
      const gx = x0 + rnd() * w, gy = y0 + rnd() * h, a = rnd() * Math.PI;
      ellipse(x, gx + P * 0.006, gy + P * 0.01, P * 0.034, P * 0.02, a); x.fillStyle = 'rgba(120,110,90,0.35)'; x.fill();
      ellipse(x, gx, gy, P * 0.034, P * 0.02, a); x.fillStyle = col; x.fill();
      ellipse(x, gx - P * 0.008, gy - P * 0.006, P * 0.014, P * 0.007, a); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fill();
    }
  }
  function gloss(x, P, a = 0.35) {
    x.save(); x.globalCompositeOperation = 'lighter';
    x.fillStyle = linear(x, 0, 0, 0, P * 0.45, [[0, `rgba(255,255,255,${a})`], [1, 'rgba(255,255,255,0)']]);
    roundRect(x, P * 0.16, P * 0.1, P * 0.62, P * 0.2, P * 0.1); x.fill(); x.restore();
  }
  function glintSprite(P, col = '255,255,255') {
    const c = makeCanvas(Math.ceil(P), Math.ceil(P)), x = c.getContext('2d');
    x.fillStyle = radial(x, P / 2, P / 2, P / 2, [[0, `rgba(${col},0.9)`], [0.25, `rgba(${col},0.35)`], [1, `rgba(${col},0)`]]);
    x.translate(P / 2, P / 2); x.scale(1, 0.4); x.translate(-P / 2, -P / 2); x.fillRect(0, 0, P, P);
    return c;
  }
  return { tile, grains, gloss, glintSprite };
})();
SKINSETS.sushi = (() => {
  // block type -> [sushi kind, tile slot]
  const MAP = [null, ['saba', 'coral'], ['tamago', 'navy'], ['ikura', 'cream'], ['kappa', 'mustard'], ['maguro', 'teal'], ['ebi', 'plum'], ['salmon', 'olive']];
  const ID = (c) => c;
  function tileCol(slot) {
    const C = SushiPal.cur || SushiPal.P.lunch, Lp = SushiPal.P.lunch, n = C.night || 0;
    return mix(C[slot] || Lp[slot], Lp[slot], 0.35 + 0.4 * n);
  }
  function base(x, t, P) {
    const [kind, slot] = MAP[t] || MAP[7], col = tileCol(slot);
    const r = P * 0.13, b = P * 0.035;
    // flat tile with a geometric bevel: light upper-left facet, shadow lower-right facet
    roundRect(x, b, b, P - 2 * b, P - 2 * b, r); x.fillStyle = shade(col, -0.28); x.fill();
    roundRect(x, b, b, P - 2 * b, P - 2 * b - P * 0.06, r); x.fillStyle = col; x.fill();
    x.save(); roundRect(x, b, b, P - 2 * b, P - 2 * b - P * 0.06, r); x.clip();
    x.fillStyle = 'rgba(255,255,255,0.14)'; GeoSushi.poly(x, [0, 0, P, 0, P * 0.62, P * 0.3, 0, P * 0.3]); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.1)'; GeoSushi.poly(x, [P, P * 0.28, P, P, P * 0.45, P]); x.fill();
    x.restore();
    // a darker plate disc so the piece pops off any tile colour
    ellipse(x, P / 2, P * 0.77, P * 0.4, P * 0.1); x.fillStyle = 'rgba(0,0,0,0.22)'; x.fill();
    GeoSushi.piece(x, kind, P / 2, P * 0.78, P * (kind === 'kappa' || kind === 'ikura' ? 0.66 : 0.62), ID);
  }
  const glints = {};
  function live(ctx, t, s, T, st) {
    const key = Math.round(s * 4), gl = glints[key] || (glints[key] = SkinKit.glintSprite(s * 2));
    const d = typeof Mood !== 'undefined' ? Mood.danger : 0;
    if (t === 3) { // ikura pearls twinkle
      for (let i = 0; i < 4; i++) { const ph2 = (T * (1.3 + d * 3) + i * 1.7 + st.ph) % 3; if (ph2 < 0.5) { const a = Math.sin(ph2 / 0.5 * Math.PI); ctx.fillStyle = `rgba(255,245,215,${0.85 * a})`; ellipse(ctx, s * (-0.2 + i * 0.13), -s * 0.12 + (i % 2) * s * 0.07, s * 0.025, s * 0.025); ctx.fill(); } }
    } else if (t !== 4) { // topping sheen flutters (more in danger / on clears)
      const fl = Math.sin(T * (2 + d * 9) + st.ph) * (0.006 + d * 0.012) + st.k * 0.02;
      ctx.fillStyle = `rgba(255,255,255,${0.07 + Math.max(0, fl) * 4})`; ellipse(ctx, -s * 0.04, -s * 0.12 + fl * s, s * 0.26, s * 0.035); ctx.fill();
    }
    if (st.active) { const sp = (T * 1.7 + st.ph) % 1; ctx.fillStyle = `rgba(255,255,240,${0.7 * Math.sin(sp * Math.PI)})`; ctx.save(); ctx.translate(-s * 0.25 + sp * s * 0.5, -s * 0.28); ctx.rotate(T * 3); ctx.fillRect(-s * 0.03, -s * 0.003, s * 0.06, s * 0.006); ctx.fillRect(-s * 0.003, -s * 0.03, s * 0.006, s * 0.06); ctx.restore(); }
    const ph = (T * (0.32 + d * 0.4) + st.ph * 0.137) % 2.2; // travelling glisten
    if (ph < 1) { const a = Math.sin(ph * Math.PI); ctx.globalAlpha = a * 0.6; ctx.globalCompositeOperation = 'lighter'; ctx.drawImage(gl, (ph - 0.5) * s * 0.6 - s * 0.35, -s * 0.36 + ph * s * 0.2, s * 0.7, s * 0.7); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
  }
  // tiles re-render only when the palette moves noticeably (~every 2 in-game hours) or the weather changes
  function key() { const C = SushiPal.cur; return C ? Math.round((C.hour || 12) / 2) + ':' + SushiPal.weather : '0'; }
  return { base, live, key, noFace: true };
})();
