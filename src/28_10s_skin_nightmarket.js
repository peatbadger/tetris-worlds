/* ---- Night market blocks: bubble tea, giant chicken cutlet, stinky tofu, tanghulu, oyster omelette, sausage, pepper bun ---- */
SKINSETS.nightmarket = (() => {
  const K = Kit;
  const N = [null, 'Pearl milk tea 珍珠奶茶', 'Giant chicken cutlet 大雞排', 'Stinky tofu 臭豆腐', 'Tanghulu 糖葫蘆', 'Oyster omelette 蚵仔煎', 'Taiwanese sausage 香腸', 'Pepper bun 胡椒餅'];
  const BG = [null, '#6a3a8a', '#b8281e', '#2a5a32', '#7a1a2a', '#c86a1a', '#5a2a1a', '#2a4a7a'];
  function base(x, t, P) {
    const rnd = mulberry32(t * 97 + 11), c = P / 2;
    K.bg(x, P, BG[t]);
    switch (t) {
      case 1: { // pearl milk tea: clear cup, sealed film, fat straw; pearls drawn live (slosh)
        x.beginPath(); x.moveTo(c - P * 0.25, c - P * 0.3); x.lineTo(c + P * 0.25, c - P * 0.3); x.lineTo(c + P * 0.19, c + P * 0.4); x.lineTo(c - P * 0.19, c + P * 0.4); x.closePath();
        x.fillStyle = linear(x, c - P * 0.25, 0, c + P * 0.25, 0, [[0, '#a87a50'], [0.45, '#e8c8a0'], [1, '#9a6a40']]); x.fill();
        x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(c - P * 0.2, c - P * 0.28, P * 0.06, P * 0.64);
        x.fillStyle = '#f4f0f8'; roundRect(x, c - P * 0.27, c - P * 0.34, P * 0.54, P * 0.06, P * 0.02); x.fill(); x.fillStyle = '#e83a6a'; x.font = `bold ${P * 0.06}px sans-serif`; x.textAlign = 'center'; x.fillText('♥ 珍奶 ♥', c, c - P * 0.295);
        x.save(); x.translate(c + P * 0.06, c - P * 0.32); x.rotate(0.12); x.fillStyle = linear(x, -P * 0.045, 0, P * 0.045, 0, [[0, '#2a7ad8'], [0.5, '#8ac8ff'], [1, '#1a5ab0']]); x.fillRect(-P * 0.045, -P * 0.16, P * 0.09, P * 0.3); x.restore();
        break; }
      case 2: { // giant cutlet: craggy golden crust, pepper-salt and chili flakes, peeking from a paper bag
        x.fillStyle = '#efe4c8'; x.beginPath(); x.moveTo(c - P * 0.34, c + P * 0.04); x.lineTo(c + P * 0.34, c + P * 0.04); x.lineTo(c + P * 0.3, c + P * 0.42); x.lineTo(c - P * 0.3, c + P * 0.42); x.closePath(); x.fill();
        x.fillStyle = '#c8241a'; x.fillRect(c - P * 0.32, c + P * 0.22, P * 0.64, P * 0.05); K.jp(x, '雞排', c, c + P * 0.34, P * 0.09, '#c8241a');
        K.blob(x, c, c - P * 0.08, P * 0.36, 22, 0.18, 21); x.fillStyle = radial(x, c - P * 0.1, c - P * 0.18, P * 0.42, [[0, '#f8c870'], [0.55, '#d8902a'], [1, '#9a5414']]); x.fill();
        for (let k = 0; k < 70; k++) { const a = rnd() * TAU, r = rnd() * P * 0.32; x.fillStyle = rnd() < 0.5 ? 'rgba(255,236,170,0.75)' : 'rgba(130,60,10,0.5)'; ellipse(x, c + Math.cos(a) * r, c - P * 0.08 + Math.sin(a) * r * 0.8, P * 0.018, P * 0.012, rnd() * 3); x.fill(); }
        K.speck(x, rnd, c - P * 0.28, c - P * 0.34, P * 0.56, P * 0.4, 26, '#3a2a1a', P * 0.012); K.speck(x, rnd, c - P * 0.28, c - P * 0.34, P * 0.56, P * 0.4, 14, '#d8341a', P * 0.016);
        K.sheen(x, c - P * 0.12, c - P * 0.24, P * 0.12, P * 0.05, 0.5); break; }
      case 3: { // stinky tofu: four fried cubes, pickled cabbage, chili sauce, in a paper tray
        x.fillStyle = '#f4efe0'; x.beginPath(); x.moveTo(c - P * 0.38, c + P * 0.06); x.lineTo(c + P * 0.38, c + P * 0.06); x.lineTo(c + P * 0.32, c + P * 0.38); x.lineTo(c - P * 0.32, c + P * 0.38); x.closePath(); x.fill();
        [[-0.17, -0.08], [0.11, -0.1], [-0.12, 0.12], [0.16, 0.1]].forEach(([dx, dy], i) => { const px = c + dx * P, py = c + dy * P, s = P * 0.15; roundRect(x, px - s, py - s, s * 2, s * 2, s * 0.35); x.fillStyle = linear(x, px - s, py - s, px + s, py + s, [[0, '#e8a050'], [0.5, '#c87a28'], [1, '#8a4a14']]); x.fill(); for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(90,40,10,0.45)'; ellipse(x, px + (rnd() - 0.5) * s * 1.7, py + (rnd() - 0.5) * s * 1.7, P * 0.012, P * 0.012); x.fill(); } x.fillStyle = 'rgba(255,240,200,0.5)'; x.fillRect(px - s * 0.8, py - s * 0.85, s * 1.2, s * 0.2); });
        for (let k = 0; k < 18; k++) { x.strokeStyle = rnd() < 0.5 ? '#e8e8b0' : '#c8d880'; x.lineWidth = P * 0.02; x.beginPath(); const sx = c + (rnd() - 0.5) * P * 0.5, sy = c - P * 0.3 + rnd() * P * 0.12; x.moveTo(sx, sy); x.quadraticCurveTo(sx + P * 0.04, sy - P * 0.04, sx + P * 0.08, sy + P * 0.01); x.stroke(); }
        x.fillStyle = '#d8301a'; for (let k = 0; k < 5; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.4, c + (rnd() - 0.4) * P * 0.3, P * 0.03, P * 0.02); x.fill(); }
        break; }
      case 4: { // tanghulu: candied strawberries & tomatoes on a skewer, glassy sugar shell
        K.skewer(x, P, 0.12, 0.92, 0.5);
        [[0.26, '#e8202a'], [0.46, '#d81a3a'], [0.66, '#e8202a'], [0.84, '#f03a2a']].forEach(([f, col], i) => { const px = P * f, py = c, r = P * (i === 3 ? 0.1 : 0.12);
          x.beginPath(); x.moveTo(px - r, py - r * 0.4); x.quadraticCurveTo(px - r, py + r * 1.2, px + r * 0.1, py + r * 1.1); x.quadraticCurveTo(px + r * 1.1, py + r * 0.8, px + r, py - r * 0.4); x.quadraticCurveTo(px, py - r * 1.1, px - r, py - r * 0.4); x.fillStyle = radial(x, px - r * 0.3, py - r * 0.3, r * 1.4, [[0, shade(col, 0.35)], [0.6, col], [1, shade(col, -0.45)]]); x.fill();
          x.fillStyle = '#f8e070'; for (let k = 0; k < 6; k++) { ellipse(x, px + (rnd() - 0.5) * r * 1.4, py + (rnd() - 0.3) * r * 1.2, P * 0.008, P * 0.012); x.fill(); }
          x.fillStyle = '#3a8a2a'; x.beginPath(); x.moveTo(px - r * 0.6, py - r * 0.7); x.lineTo(px, py - r * 1.3); x.lineTo(px + r * 0.6, py - r * 0.7); x.fill();
          x.fillStyle = 'rgba(255,255,255,0.75)'; ellipse(x, px - r * 0.4, py - r * 0.2, r * 0.22, r * 0.4, -0.4); x.fill(); x.strokeStyle = 'rgba(255,240,220,0.5)'; x.lineWidth = P * 0.01; x.beginPath(); x.arc(px, py + r * 0.1, r * 1.05, 0.3, 2.6); x.stroke(); });
        break; }
      case 5: { // oyster omelette: gooey sweet-potato-starch omelette, plump oysters, greens, pink sweet sauce
        K.plate(x, P, '#f6f6f2', '#d8d8d0', 0.6, 0.44, 0.2);
        K.blob(x, c, c + P * 0.02, P * 0.32, 18, 0.15, 5); x.fillStyle = radial(x, c - P * 0.08, c - P * 0.05, P * 0.4, [[0, '#f8e8c0'], [0.6, '#e8c080'], [1, '#c89040']]); x.fill();
        for (let k = 0; k < 7; k++) { const px = c + (rnd() - 0.5) * P * 0.44, py = c + (rnd() - 0.5) * P * 0.26; ellipse(x, px, py, P * 0.05, P * 0.035, rnd()); x.fillStyle = '#9aa0a0'; x.fill(); ellipse(x, px - P * 0.01, py - P * 0.008, P * 0.03, P * 0.02, 0); x.fillStyle = '#e8e8e0'; x.fill(); }
        for (let k = 0; k < 10; k++) { x.fillStyle = rnd() < 0.5 ? '#4aa83a' : '#2a8a2a'; ellipse(x, c + (rnd() - 0.5) * P * 0.5, c + (rnd() - 0.5) * P * 0.3, P * 0.04, P * 0.018, rnd() * 3); x.fill(); }
        x.strokeStyle = '#e8506a'; x.lineWidth = P * 0.05; x.lineCap = 'round'; x.beginPath(); x.moveTo(c - P * 0.24, c - P * 0.04); x.bezierCurveTo(c - P * 0.1, c - P * 0.16, c + P * 0.04, c + P * 0.12, c + P * 0.24, c - P * 0.04); x.stroke();
        K.sheen(x, c - P * 0.1, c - P * 0.1, P * 0.1, P * 0.04, 0.4); break; }
      case 6: { // Taiwanese sausage on a stick with a raw garlic clove
        K.skewer(x, P, 0.08, 0.5, 0.56);
        x.save(); x.translate(c + P * 0.04, c + P * 0.02); x.rotate(-0.2); roundRect(x, -P * 0.36, -P * 0.14, P * 0.72, P * 0.28, P * 0.14); x.fillStyle = linear(x, 0, -P * 0.14, 0, P * 0.14, [[0, '#e05a40'], [0.4, '#b8302a'], [1, '#6a1410']]); x.fill();
        x.strokeStyle = 'rgba(40,5,0,0.6)'; x.lineWidth = P * 0.03; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(-P * 0.26 + k * P * 0.13, -P * 0.12); x.lineTo(-P * 0.3 + k * P * 0.13, P * 0.12); x.stroke(); }
        x.fillStyle = 'rgba(255,200,180,0.5)'; x.fillRect(-P * 0.3, -P * 0.1, P * 0.6, P * 0.03); x.restore();
        x.fillStyle = '#f8f4e8'; ellipse(x, c + P * 0.26, c + P * 0.26, P * 0.07, P * 0.05, 0.3); x.fill(); x.strokeStyle = '#d8c8a0'; x.lineWidth = P * 0.008; x.stroke();
        break; }
      default: { // pepper bun: tandoor-baked crust, sesame, blistered spots
        ellipse(x, c, c + P * 0.06, P * 0.38, P * 0.3); x.fillStyle = radial(x, c - P * 0.1, c - P * 0.06, P * 0.44, [[0, '#f8d898'], [0.55, '#d89a4a'], [1, '#8a5018']]); x.fill();
        for (let k = 0; k < 60; k++) { const a = rnd() * TAU, r = Math.sqrt(rnd()) * P * 0.32; ellipse(x, c + Math.cos(a) * r, c + P * 0.04 + Math.sin(a) * r * 0.75, P * 0.014, P * 0.008, rnd() * 3); x.fillStyle = '#fbf2d8'; x.fill(); }
        for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(90,40,10,0.5)'; ellipse(x, c + (rnd() - 0.5) * P * 0.5, c + (rnd() - 0.5) * P * 0.36, P * 0.04, P * 0.025); x.fill(); }
        x.fillStyle = '#3a6a2a'; ellipse(x, c + P * 0.2, c - P * 0.16, P * 0.035, P * 0.02); x.fill();
        K.sheen(x, c - P * 0.12, c - P * 0.1, P * 0.12, P * 0.05, 0.35);
      }
    }
    K.gloss = null; SkinKit.gloss(x, P, 0.16);
  }
  function live(ctx, t, s, T, st) {
    const d = K.danger();
    if (t === 1) { // pearls roll with the liquid slosh (tilt) and settle; bubbles rise when danger
      ctx.save(); ctx.beginPath(); ctx.moveTo(-0.24 * s, -0.27 * s); ctx.lineTo(0.24 * s, -0.27 * s); ctx.lineTo(0.18 * s, 0.39 * s); ctx.lineTo(-0.18 * s, 0.39 * s); ctx.closePath(); ctx.clip();
      const tl = (st.tilt || 0) + (st.k || 0) * 0.3;
      for (let i = 0; i < 11; i++) { const row = Math.floor(i / 4), col = i % 4, bx = (-0.13 + col * 0.087 + row * 0.04 + tl * 0.25) * s, by = (0.33 - row * 0.075 - Math.abs(Math.sin(T * 2 + i + st.ph)) * 0.015 - Math.max(0, tl * (col - 1.5)) * 0.04) * s;
        ctx.fillStyle = radial(ctx, bx - s * 0.01, by - s * 0.012, s * 0.05, [[0, '#7a4a2a'], [0.5, '#3a1a0a'], [1, '#1a0804']]); ellipse(ctx, bx, by, s * 0.04, s * 0.04); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(bx - s * 0.015, by - s * 0.02, s * 0.012, s * 0.012); }
      ctx.restore(); }
    if (t === 2 && st.top) { const ph = (T * 0.5 + st.ph * 0.1) % 1; ctx.fillStyle = `rgba(255,255,230,${Math.sin(ph * Math.PI) * 0.8})`; ctx.fillRect((-0.15 + ph * 0.3) * s, -0.3 * s, s * 0.02, s * 0.02); K.steamLive(ctx, s, T, st, 0, -0.4, 0.25); }
    if (t === 3 && st.top) { ctx.save(); ctx.strokeStyle = 'rgba(170,220,120,0.55)'; ctx.lineWidth = Math.max(1, s * 0.03); for (let k = 0; k < 2; k++) { const p = (T * 0.5 + k * 0.5 + st.ph * 0.07) % 1; ctx.globalAlpha = Math.sin(p * Math.PI); const sx = (-0.12 + k * 0.24) * s, sy = (-0.35 - p * 0.4) * s; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.bezierCurveTo(sx + s * 0.08, sy - s * 0.05, sx - s * 0.08, sy - s * 0.1, sx, sy - s * 0.16); ctx.stroke(); } ctx.restore(); }
    if (t === 4) { const ph = (T * 0.7 + st.ph * 0.2) % 2.2; if (ph < 0.4) { const k = Math.sin(ph / 0.4 * Math.PI), sx = (-0.22 + (Math.floor(st.ph) % 4) * 0.18) * s; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,255,255,${k})`; ctx.beginPath(); ctx.moveTo(sx, -0.13 * s); ctx.lineTo(sx + s * 0.02, -0.05 * s); ctx.lineTo(sx + s * 0.08, -0.03 * s); ctx.lineTo(sx + s * 0.02, -0.01 * s); ctx.lineTo(sx, 0.06 * s); ctx.lineTo(sx - s * 0.02, -0.01 * s); ctx.lineTo(sx - s * 0.08, -0.03 * s); ctx.lineTo(sx - s * 0.02, -0.05 * s); ctx.fill(); ctx.restore(); } }
    if (t === 5) { const w = Math.sin(T * 2 + st.ph) * 0.03; ctx.fillStyle = 'rgba(255,255,255,0.22)'; ellipse(ctx, (-0.05 + w) * s, -0.08 * s, s * 0.12, s * 0.03); ctx.fill(); K.steamLive(ctx, s, T, st, 0, -0.2, 0.2); }
    if (t === 6) { for (let i = 0; i < 2; i++) { const ph = (T * 0.9 + i * 0.5 + st.ph * 0.1) % 1; ctx.fillStyle = `rgba(255,220,120,${(1 - ph) * 0.9})`; ellipse(ctx, (-0.18 + i * 0.3) * s, (0.14 + ph * 0.18) * s, s * 0.018, s * 0.026); ctx.fill(); } if (st.top) K.steamLive(ctx, s, T, st, 0.05, -0.2, 0.22 + d * 0.2); }
    if (t === 7 && st.top) K.steamLive(ctx, s, T, st, 0, -0.25, 0.32);
  }
  const faces = [null, { y: 0.08, s: 0.85 }, { y: -0.1, s: 0.9 }, { y: 0.04, s: 0.85 }, { y: 0.12, s: 0.75, x: 0.02 }, { y: 0.02, s: 0.85 }, { y: 0.02, s: 0.85, ink: '#fff4e4', dark: true }, { y: 0.06, s: 0.9 }];
  return { base, live, N, BG, faces };
})();
