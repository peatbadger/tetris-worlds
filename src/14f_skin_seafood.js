/* ---- The Fish House blocks: fine-dining seafood on porcelain; glisten + lemon squeeze ---- */
SKINSETS.seafood = (() => {
  const K = SkinKit;
  const N = [null, 'Oyster', 'Red crab', 'Lobster roll', 'Spanner crab spaghetti', 'Crispy-skin fish', 'Scampi', 'Scallop & caviar'];
  const BG = [null, '#2a5a7a', '#7a1a14', '#8a5a14', '#6a6a2a', '#5a3214', '#8a3a2a', '#1a1a3a'];
  function plate(x, P, t) {
    K.tile(x, P, shade(BG[t], 0.2), shade(BG[t], -0.45), 0.14);
    ellipse(x, P / 2 + P * 0.02, P / 2 + P * 0.04, P * 0.44, P * 0.44); x.fillStyle = 'rgba(0,0,0,0.3)'; x.fill();
    ellipse(x, P / 2, P / 2, P * 0.46, P * 0.46); x.fillStyle = radial(x, P * 0.42, P * 0.38, P * 0.5, [[0, '#ffffff'], [0.7, '#eef0f2'], [1, '#b8c0c8']]); x.fill();
    ellipse(x, P / 2, P / 2, P * 0.34, P * 0.34); x.strokeStyle = 'rgba(150,160,170,0.5)'; x.lineWidth = P * 0.01; x.stroke();
    ellipse(x, P / 2, P / 2, P * 0.42, P * 0.42); x.strokeStyle = 'rgba(200,170,90,0.6)'; x.lineWidth = P * 0.008; x.stroke(); // gilt rim
  }
  function lemon(x, px, py, P, rot) { x.save(); x.translate(px, py); x.rotate(rot); x.beginPath(); x.arc(0, 0, P * 0.09, 0, Math.PI); x.closePath(); x.fillStyle = '#f6d830'; x.fill(); x.beginPath(); x.arc(0, 0, P * 0.075, 0, Math.PI); x.closePath(); x.fillStyle = '#fff6a0'; x.fill(); x.strokeStyle = 'rgba(230,200,40,0.8)'; x.lineWidth = P * 0.006; for (let k = 1; k < 5; k++) { const a = k / 5 * Math.PI; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * P * 0.07, Math.sin(a) * P * 0.07); x.stroke(); } x.restore(); }
  function base(x, t, P) {
    const rnd = mulberry32(t * 71 + 3), c = P / 2;
    plate(x, P, t);
    x.save(); x.translate(c, c); x.scale(1.16, 1.16); x.translate(-c, -c);
    if (t === 1) { // oyster on the half shell over crushed ice
      for (let k = 0; k < 26; k++) { const a = rnd() * TAU, d = P * (0.28 + rnd() * 0.12); x.fillStyle = 'rgba(220,240,255,0.8)'; x.save(); x.translate(c + Math.cos(a) * d, c + Math.sin(a) * d); x.rotate(rnd() * 3); x.fillRect(-P * 0.025, -P * 0.02, P * 0.05, P * 0.04); x.restore(); }
      x.beginPath(); for (let k = 0; k <= 16; k++) { const a = k / 16 * TAU, r = P * (0.3 + Math.sin(k * 2.7) * 0.03); k ? x.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r * 0.82) : x.moveTo(c + Math.cos(a) * r, c + Math.sin(a) * r * 0.82); } x.closePath();
      x.fillStyle = linear(x, 0, c - P * 0.3, 0, c + P * 0.3, [[0, '#9aa49a'], [0.5, '#5a6458'], [1, '#3a4038']]); x.fill(); x.strokeStyle = 'rgba(230,230,220,0.6)'; x.lineWidth = P * 0.01; x.stroke();
      ellipse(x, c, c, P * 0.24, P * 0.19); x.fillStyle = radial(x, c - P * 0.05, c - P * 0.05, P * 0.28, [[0, '#fbf8f0'], [0.5, '#e0e4dc'], [1, '#a8b0a4']]); x.fill();
      ellipse(x, c, c + P * 0.01, P * 0.18, P * 0.13); x.fillStyle = radial(x, c - P * 0.03, c - P * 0.02, P * 0.2, [[0, '#f0ece0'], [0.6, '#c8c0a8'], [1, '#6a6450']]); x.fill();
      x.strokeStyle = 'rgba(60,50,40,0.6)'; x.lineWidth = P * 0.012; x.beginPath(); x.ellipse(c, c + P * 0.01, P * 0.17, P * 0.12, 0, 0, TAU); x.stroke();
      x.fillStyle = '#8a2a4a'; for (let k = 0; k < 6; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.14, c + (rnd() - 0.5) * P * 0.08, P * 0.01, P * 0.01); x.fill(); } // mignonette shallots
      lemon(x, c + P * 0.24, c - P * 0.22, P, 2.4);
    } else if (t === 2) { // red crab
      x.strokeStyle = '#c8301a'; x.lineCap = 'round';
      for (const d of [-1, 1]) { for (let k = 0; k < 3; k++) { x.lineWidth = P * 0.03; x.beginPath(); x.moveTo(c + d * P * 0.12, c + P * (0.02 + k * 0.06)); x.lineTo(c + d * P * 0.26, c + P * (0.04 + k * 0.08)); x.lineTo(c + d * P * 0.32, c + P * (0.12 + k * 0.08)); x.stroke(); }
        x.lineWidth = P * 0.045; x.beginPath(); x.moveTo(c + d * P * 0.1, c - P * 0.06); x.lineTo(c + d * P * 0.2, c - P * 0.18); x.stroke(); ellipse(x, c + d * P * 0.22, c - P * 0.24, P * 0.07, P * 0.05, d * 0.6); x.fillStyle = '#d83a1e'; x.fill(); x.fillStyle = '#2a1a10'; ellipse(x, c + d * P * 0.27, c - P * 0.28, P * 0.02, P * 0.015, d); x.fill(); }
      ellipse(x, c, c + P * 0.02, P * 0.2, P * 0.15); x.fillStyle = radial(x, c - P * 0.05, c - P * 0.04, P * 0.24, [[0, '#ff8a5a'], [0.5, '#d8341a'], [1, '#7a1408']]); x.fill();
      for (let k = 0; k < 14; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.3, c + (rnd() - 0.5) * P * 0.2, P * 0.012, P * 0.012); x.fillStyle = 'rgba(255,220,180,0.5)'; x.fill(); }
      [-1, 1].forEach((d) => { ellipse(x, c + d * P * 0.05, c - P * 0.1, P * 0.018, P * 0.018); x.fillStyle = '#111'; x.fill(); });
    } else if (t === 3) { // lobster roll: buttery split-top bun, lobster chunks, chives
      x.save(); x.translate(c, c); x.rotate(-0.25);
      roundRect(x, -P * 0.34, -P * 0.16, P * 0.68, P * 0.32, P * 0.14); x.fillStyle = linear(x, 0, -P * 0.16, 0, P * 0.16, [[0, '#f6c870'], [0.4, '#d8902a'], [1, '#9a5a14']]); x.fill();
      x.fillStyle = 'rgba(255,240,180,0.5)'; roundRect(x, -P * 0.3, -P * 0.15, P * 0.6, P * 0.05, P * 0.02); x.fill();
      for (let k = 0; k < 7; k++) { const lx = -P * 0.26 + k * P * 0.085, ly = -P * 0.04 + Math.sin(k * 2) * P * 0.02; ellipse(x, lx, ly, P * 0.06, P * 0.05, k); x.fillStyle = radial(x, lx - P * 0.02, ly - P * 0.02, P * 0.07, [[0, '#ffe8e0'], [0.4, '#f87a5a'], [1, '#c8301a']]); x.fill(); }
      x.fillStyle = '#4a9a3a'; for (let k = 0; k < 12; k++) x.fillRect(-P * 0.28 + rnd() * P * 0.56, -P * 0.1 + rnd() * P * 0.1, P * 0.025, P * 0.008);
      x.restore();
    } else if (t === 4) { // spanner crab spaghetti: twirled nest, crab meat, chili flakes, parsley
      for (let k = 0; k < 9; k++) { x.strokeStyle = k % 2 ? '#f0d890' : '#e2c470'; x.lineWidth = P * 0.03; x.beginPath(); x.ellipse(c, c, P * (0.06 + k * 0.025), P * (0.05 + k * 0.022), k * 0.7, 0, Math.PI * 1.7); x.stroke(); }
      x.strokeStyle = 'rgba(255,255,230,0.5)'; x.lineWidth = P * 0.008; for (let k = 0; k < 5; k++) { x.beginPath(); x.ellipse(c, c, P * (0.08 + k * 0.04), P * (0.07 + k * 0.035), k, 0.4, 1.6); x.stroke(); }
      for (let k = 0; k < 9; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.36, c + (rnd() - 0.5) * P * 0.3, P * 0.035, P * 0.025, rnd() * 3); x.fillStyle = rnd() < 0.5 ? '#ffb090' : '#ff8a6a'; x.fill(); }
      x.fillStyle = '#d8200a'; for (let k = 0; k < 14; k++) x.fillRect(c + (rnd() - 0.5) * P * 0.4, c + (rnd() - 0.5) * P * 0.36, P * 0.014, P * 0.01);
      x.fillStyle = '#3a8a2a'; for (let k = 0; k < 8; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.36, c + (rnd() - 0.5) * P * 0.3, P * 0.016, P * 0.012); x.fill(); }
    } else if (t === 5) { // crispy-skin fish fillet with beurre blanc
      ellipse(x, c, c + P * 0.06, P * 0.32, P * 0.12); x.fillStyle = 'rgba(250,240,200,0.8)'; x.fill();
      x.save(); x.translate(c, c); x.rotate(-0.15);
      roundRect(x, -P * 0.3, -P * 0.15, P * 0.6, P * 0.28, P * 0.1); x.fillStyle = '#f4ece0'; x.fill();
      roundRect(x, -P * 0.3, -P * 0.17, P * 0.6, P * 0.24, P * 0.1); x.fillStyle = linear(x, 0, -P * 0.17, 0, P * 0.07, [[0, '#f0b048'], [0.5, '#b86a18'], [1, '#6a3408']]); x.fill();
      x.strokeStyle = 'rgba(60,20,0,0.55)'; x.lineWidth = P * 0.01; for (let k = -4; k <= 4; k++) { x.beginPath(); x.moveTo(k * P * 0.07 - P * 0.04, -P * 0.15); x.lineTo(k * P * 0.07 + P * 0.04, P * 0.05); x.stroke(); }
      x.fillStyle = 'rgba(255,240,180,0.55)'; for (let k = 0; k < 20; k++) x.fillRect(-P * 0.28 + rnd() * P * 0.56, -P * 0.15 + rnd() * P * 0.18, P * 0.014, P * 0.01);
      x.restore();
      x.fillStyle = '#4a9a3a'; ellipse(x, c - P * 0.18, c - P * 0.14, P * 0.04, P * 0.02, -0.5); x.fill(); ellipse(x, c - P * 0.12, c - P * 0.18, P * 0.035, P * 0.018, 0.4); x.fill();
    } else if (t === 6) { // scampi / prawns, curled and glazed
      for (let i = 0; i < 2; i++) {
        x.save(); x.translate(c + (i ? P * 0.08 : -P * 0.08), c + (i ? P * 0.04 : -P * 0.04)); x.rotate(i ? 2.6 : -0.4);
        x.lineCap = 'round';
        for (let k = 0; k < 6; k++) { const a = Math.PI * (0.9 + k * 0.22), r = P * 0.13, w = P * (0.09 - k * 0.01); x.strokeStyle = k % 2 ? '#f8805a' : '#ff9a70'; x.lineWidth = w; x.beginPath(); x.arc(0, 0, r, a, a + 0.25); x.stroke(); }
        x.strokeStyle = 'rgba(255,240,220,0.6)'; x.lineWidth = P * 0.012; x.beginPath(); x.arc(0, 0, P * 0.15, Math.PI, Math.PI * 2.1); x.stroke();
        x.fillStyle = '#e8401a'; x.beginPath(); const tx = Math.cos(Math.PI * 2.2) * P * 0.13, ty = Math.sin(Math.PI * 2.2) * P * 0.13; x.moveTo(tx, ty); x.lineTo(tx + P * 0.06, ty + P * 0.06); x.lineTo(tx - P * 0.02, ty + P * 0.07); x.closePath(); x.fill();
        x.restore();
      }
      x.fillStyle = '#3a8a2a'; for (let k = 0; k < 8; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.4, c + (rnd() - 0.5) * P * 0.4, P * 0.014, P * 0.01); x.fill(); }
      x.fillStyle = 'rgba(250,220,120,0.5)'; ellipse(x, c, c + P * 0.18, P * 0.18, P * 0.05); x.fill();
    } else { // seared scallops with caviar quenelles
      [[-0.13, 0.06], [0.13, 0.06], [0, -0.12]].forEach(([dx, dy]) => {
        const px = c + dx * P, py = c + dy * P;
        ellipse(x, px, py + P * 0.03, P * 0.11, P * 0.09); x.fillStyle = '#e8dccc'; x.fill();
        ellipse(x, px, py, P * 0.11, P * 0.09); x.fillStyle = radial(x, px - P * 0.03, py - P * 0.03, P * 0.13, [[0, '#f8d898'], [0.5, '#d89a48'], [1, '#9a5a1a']]); x.fill();
        for (let k = 0; k < 9; k++) { ellipse(x, px + (rnd() - 0.5) * P * 0.06, py - P * 0.03 + (rnd() - 0.5) * P * 0.03, P * 0.012, P * 0.012); x.fillStyle = '#121218'; x.fill(); x.fillStyle = 'rgba(160,170,200,0.7)'; x.fillRect(px + (rnd() - 0.5) * P * 0.06, py - P * 0.035, P * 0.005, P * 0.005); }
      });
      x.fillStyle = '#5a9a3a'; for (let k = 0; k < 6; k++) { ellipse(x, c + (rnd() - 0.5) * P * 0.45, c + (rnd() - 0.5) * P * 0.45, P * 0.012, P * 0.012); x.fill(); }
    }
    x.restore();
    K.gloss(x, P, 0.22);
  }
  const glints = {};
  function live(ctx, t, s, T, st) {
    const key = Math.round(s * 4), gl = glints[key] || (glints[key] = K.glintSprite(s * 0.6));
    const ph = (T * 0.3 + st.ph * 0.13) % 1.8;
    if (ph < 1) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.sin(ph * Math.PI) * 0.7; ctx.drawImage(gl, -s * 0.3 + ph * s * 0.25, -s * 0.25 + ph * s * 0.1, s * 0.4, s * 0.4); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
    if (t === 1) { // lemon squeeze: a droplet falls onto the oyster now and then
      const dp = (T * 0.2 + st.ph * 0.07) % 1; if (dp < 0.25) { const k = dp / 0.25; ctx.fillStyle = 'rgba(255,250,170,0.9)'; ellipse(ctx, s * 0.17 - k * s * 0.12, -s * 0.16 + k * s * 0.18, s * 0.022, s * 0.03); ctx.fill(); }
    }
    if (t === 7) { ctx.fillStyle = 'rgba(200,210,255,0.9)'; for (let i = 0; i < 3; i++) { const a = Math.sin(T * 4 + i * 2 + st.ph); if (a > 0.7) ctx.fillRect(((i * 0.13 + st.ph * 0.01) % 0.3 - 0.15) * s, (-0.13 + i * 0.08) * s, 1.5, 1.5); } }
  }
  return { base, live, N, BG };
})();
