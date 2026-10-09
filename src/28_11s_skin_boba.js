/* ---- Boba blocks: seven drinks, each with its own toppings that bounce, slosh and react ---- */
SKINSETS.boba = (() => {
  const K = Kit;
  const N = [null, 'Brown sugar tiger milk', 'Mango green tea + cheese foam', 'Taro milk + taro balls', 'Matcha latte + red bean', 'Strawberry milk', 'Thai tea', 'Honeydew + coconut jelly'];
  const BG = [null, '#5a2a14', '#e08a10', '#6a4a9a', '#3a7a3a', '#d8487a', '#c85a18', '#4a9a4a'];
  const TEA = [null, '#efe0c8', '#ffbe3a', '#c0a0e0', '#9ac870', '#f8b0c8', '#f09848', '#c0eca8'];
  const STRAW = [null, '#2a2a2a', '#ffd040', '#ffffff', '#7a3a1a', '#ff5a8a', '#ffffff', '#2ab0a0'];
  const cupPath = (x, P, c) => { x.beginPath(); x.moveTo(c - P * 0.27, c - P * 0.26); x.lineTo(c + P * 0.27, c - P * 0.26); x.lineTo(c + P * 0.2, c + P * 0.42); x.lineTo(c - P * 0.2, c + P * 0.42); x.closePath(); };
  function base(x, t, P) {
    const rnd = mulberry32(t * 53 + 5), c = P / 2;
    K.bg(x, P, BG[t]);
    // cup body with drink
    x.save(); cupPath(x, P, c); x.clip();
    x.fillStyle = linear(x, c - P * 0.27, 0, c + P * 0.27, 0, [[0, shade(TEA[t], -0.25)], [0.45, shade(TEA[t], 0.15)], [1, shade(TEA[t], -0.3)]]); x.fillRect(0, 0, P, P);
    if (t === 1) { x.strokeStyle = 'rgba(100,44,12,0.85)'; x.lineWidth = P * 0.05; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(c - P * 0.3, c - P * 0.18 + k * P * 0.12); x.bezierCurveTo(c - P * 0.1, c - P * 0.06 + k * P * 0.12, c + P * 0.06, c - P * 0.26 + k * P * 0.12, c + P * 0.3, c - P * 0.12 + k * P * 0.12); x.stroke(); } }
    if (t === 2) { x.fillStyle = '#fffaf0'; x.fillRect(0, c - P * 0.3, P, P * 0.14); x.fillStyle = 'rgba(255,230,190,0.8)'; for (let k = 0; k < 8; k++) { ellipse(x, c - P * 0.2 + k * P * 0.06, c - P * 0.16, P * 0.03, P * 0.012); x.fill(); } }
    if (t === 3) { x.strokeStyle = 'rgba(120,80,170,0.6)'; x.lineWidth = P * 0.04; x.beginPath(); x.moveTo(c - P * 0.2, c - P * 0.2); x.bezierCurveTo(c + P * 0.3, c - P * 0.1, c - P * 0.3, c + P * 0.1, c + P * 0.2, c + P * 0.25); x.stroke(); }
    if (t === 4) { x.fillStyle = '#f6f4e8'; x.fillRect(0, c + P * 0.02, P, P * 0.5); x.fillStyle = 'rgba(154,200,112,0.5)'; for (let k = 0; k < 6; k++) { ellipse(x, c - P * 0.2 + k * P * 0.08, c + P * 0.02, P * 0.05, P * 0.03); x.fill(); } }
    if (t === 5) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(0, c - P * 0.3, P, P * 0.26); }
    if (t === 6) { x.fillStyle = 'rgba(255,250,240,0.85)'; x.fillRect(0, c - P * 0.3, P, P * 0.12); x.fillStyle = 'rgba(255,250,240,0.5)'; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(c - P * 0.25 + k * P * 0.12, c - P * 0.18); x.quadraticCurveTo(c - P * 0.22 + k * P * 0.12, c - P * 0.05, c - P * 0.2 + k * P * 0.12, c + P * 0.02); x.lineTo(c - P * 0.18 + k * P * 0.12, c - P * 0.18); x.fill(); } }
    // ice cubes
    for (let k = 0; k < 3; k++) { const ix = c - P * 0.14 + k * P * 0.13, iy = c - P * 0.12 + (k % 2) * P * 0.1; x.fillStyle = 'rgba(255,255,255,0.28)'; x.save(); x.translate(ix, iy); x.rotate(k * 0.5); x.fillRect(-P * 0.05, -P * 0.05, P * 0.1, P * 0.1); x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = P * 0.008; x.strokeRect(-P * 0.05, -P * 0.05, P * 0.1, P * 0.1); x.restore(); }
    x.restore();
    // clear cup wall highlight + rim
    x.fillStyle = 'rgba(255,255,255,0.25)'; x.beginPath(); x.moveTo(c - P * 0.24, c - P * 0.25); x.lineTo(c - P * 0.18, c - P * 0.25); x.lineTo(c - P * 0.14, c + P * 0.4); x.lineTo(c - P * 0.18, c + P * 0.4); x.fill();
    cupPath(x, P, c); x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = P * 0.012; x.stroke();
    // lid: sealed printed film (dome for the cheese foam)
    if (t === 2) { x.beginPath(); x.moveTo(c - P * 0.28, c - P * 0.26); x.bezierCurveTo(c - P * 0.28, c - P * 0.46, c + P * 0.28, c - P * 0.46, c + P * 0.28, c - P * 0.26); x.fillStyle = 'rgba(240,248,255,0.45)'; x.fill(); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.stroke(); }
    else { roundRect(x, c - P * 0.29, c - P * 0.3, P * 0.58, P * 0.06, P * 0.02); x.fillStyle = '#fbf6fa'; x.fill(); x.fillStyle = BG[t]; for (let k = 0; k < 5; k++) { ellipse(x, c - P * 0.22 + k * P * 0.11, c - P * 0.27, P * 0.02, P * 0.014); x.fill(); } }
    // fat straw
    x.save(); x.translate(c + P * 0.08, c - P * 0.3); x.rotate(0.14); x.fillStyle = linear(x, -P * 0.045, 0, P * 0.045, 0, [[0, shade(STRAW[t], -0.3)], [0.5, shade(STRAW[t], 0.3)], [1, shade(STRAW[t], -0.35)]]); x.fillRect(-P * 0.045, -P * 0.17, P * 0.09, P * 0.3); if (t === 3 || t === 6) { x.fillStyle = BG[t]; for (let k = 0; k < 3; k++) x.fillRect(-P * 0.045, -P * 0.15 + k * P * 0.06, P * 0.09, P * 0.02); } x.restore();
    SkinKit.gloss(x, P, 0.14);
  }
  // toppings drawn live so they bob, roll with the slosh, and hop on clears
  const TOP = [null, ['pearl', 11], ['mango', 6], ['taro', 7], ['bean', 12], ['berry', 6], ['pearl', 9], ['jelly', 7]];
  function live(ctx, t, s, T, st) {
    const [kind, n] = TOP[t], tl = clamp((st.tilt || 0) + (st.k || 0) * 0.3, -0.8, 0.8), d = K.danger();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-0.26 * s, -0.25 * s); ctx.lineTo(0.26 * s, -0.25 * s); ctx.lineTo(0.195 * s, 0.415 * s); ctx.lineTo(-0.195 * s, 0.415 * s); ctx.closePath(); ctx.clip();
    for (let i = 0; i < n; i++) { const row = Math.floor(i / 4), col = i % 4, bob = Math.abs(Math.sin(T * (2 + d * 6) + i * 1.3 + st.ph)) * (0.012 + d * 0.02);
      const bx = (-0.13 + col * 0.087 + (row % 2) * 0.04 + tl * 0.22) * s, by = (0.36 - row * 0.075 - bob - Math.max(0, tl * (col - 1.5)) * 0.035) * s;
      if (kind === 'pearl') { ctx.fillStyle = radial(ctx, bx - s * 0.012, by - s * 0.014, s * 0.05, [[0, '#8a5a3a'], [0.5, '#3a1a0a'], [1, '#140602']]); ellipse(ctx, bx, by, s * 0.042, s * 0.042); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.fillRect(bx - s * 0.018, by - s * 0.022, s * 0.014, s * 0.014); }
      else if (kind === 'mango') { ctx.fillStyle = i % 3 ? '#ffb020' : '#ff8a10'; roundRect(ctx, bx - s * 0.04, by - s * 0.04, s * 0.08, s * 0.08, s * 0.015); ctx.fill(); ctx.fillStyle = 'rgba(255,255,220,0.6)'; ctx.fillRect(bx - s * 0.03, by - s * 0.035, s * 0.03, s * 0.012); }
      else if (kind === 'taro') { ctx.fillStyle = i % 2 ? '#a080c8' : '#f0d8a0'; ellipse(ctx, bx, by, s * 0.045, s * 0.04); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(bx - s * 0.02, by - s * 0.02, s * 0.015, s * 0.01); }
      else if (kind === 'bean') { ctx.fillStyle = '#6a1a1a'; ellipse(ctx, bx, by, s * 0.032, s * 0.024, i); ctx.fill(); ctx.fillStyle = 'rgba(255,220,220,0.5)'; ctx.fillRect(bx - s * 0.01, by - s * 0.012, s * 0.01, s * 0.006); }
      else if (kind === 'berry') { ctx.fillStyle = '#e8203a'; ctx.beginPath(); ctx.moveTo(bx - s * 0.04, by - s * 0.02); ctx.quadraticCurveTo(bx, by + s * 0.06, bx + s * 0.04, by - s * 0.02); ctx.quadraticCurveTo(bx, by - s * 0.05, bx - s * 0.04, by - s * 0.02); ctx.fill(); ctx.fillStyle = '#ffe080'; ctx.fillRect(bx - s * 0.01, by, s * 0.008, s * 0.008); }
      else { ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.save(); ctx.translate(bx, by); ctx.rotate(i * 0.7 + T * 0.3); ctx.fillRect(-s * 0.035, -s * 0.035, s * 0.07, s * 0.07); ctx.restore(); } }
    // fizz/bubbles rising (more when the stack is in danger)
    for (let i = 0; i < 2 + Math.round(d * 4); i++) { const ph = (T * (0.6 + d) + i * 0.37 + st.ph * 0.11) % 1; ctx.strokeStyle = `rgba(255,255,255,${0.5 * (1 - ph)})`; ctx.lineWidth = 1; ellipse(ctx, (-0.1 + i * 0.07) * s, (0.3 - ph * 0.5) * s, s * 0.012, s * 0.012); ctx.stroke(); }
    ctx.restore();
    // pearls shoot up the straw while the piece is active (someone's slurping!)
    if (st.active) { for (let i = 0; i < 2; i++) { const ph = (T * 1.4 + i * 0.5) % 1; ctx.fillStyle = '#2a120a'; ellipse(ctx, (0.085 + ph * 0.02) * s, (-0.3 - ph * 0.14) * s, s * 0.03, s * 0.03); ctx.fill(); } }
  }
  const faces = [null, { y: 0.1, s: 0.8 }, { y: 0.12, s: 0.8 }, { y: 0.08, s: 0.8 }, { y: -0.06, s: 0.8 }, { y: 0.08, s: 0.8 }, { y: 0.1, s: 0.8 }, { y: 0.08, s: 0.8 }];
  return { base, live, N, BG, faces };
})();
