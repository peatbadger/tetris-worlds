/* ================= Shodo (brush calligraphy) text rendering ================= */
// Uses an embedded subset of the OFL-licensed "Yuji Syuku" brush font (see README / fonts/OFL-YujiSyuku.txt).
const JP_FONT = '"TWBrush", "TWSerifHK", "Yuji Syuku", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", "Noto Serif JP", serif';
const FontLoader = (() => {
  let ok = false;
  const ready = (async () => {
    try {
      if (typeof JP_FONT_B64 === 'undefined' || !window.FontFace) return false;
      const bin = Uint8Array.from(atob(JP_FONT_B64), (c) => c.charCodeAt(0));
      const ff = new FontFace('TWBrush', bin.buffer);
      await ff.load(); document.fonts.add(ff); ok = true;
      if (typeof CJK_FALLBACK_B64 !== 'undefined') { try { const b2 = Uint8Array.from(atob(CJK_FALLBACK_B64), (c) => c.charCodeAt(0)); const f2 = new FontFace('TWSerifHK', b2.buffer); await f2.load(); document.fonts.add(f2); } catch (e) {} }
      return true;
    } catch (e) { console.info('Brush font unavailable, using fallback', e && e.message); return false; }
  })();
  return { ready, get ok() { return ok; } };
})();
const Ink = (() => {
  const SMALL = 'ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ';
  const ROT = 'ー〜…（）「」';
  // text(): vertical (tategaki) by default. Vertical: (x,y) = top-centre. Horizontal: (x,y) = left/centre-middle.
  function text(ctx, str, x, y, size, o = {}) {
    const D = o.D || 1, rnd = o.rnd || Math.random, color = o.color || '#15100c', vertical = o.vertical !== false;
    const chars = [...str], adv = size * (o.spacing || 1.0);
    const pad = size * 0.35;
    const W = vertical ? size * 1.7 : adv * chars.length + pad * 2, H = vertical ? adv * chars.length + pad * 2 : size * 1.7;
    const [c, t] = hiCanvas(W, H, D);
    t.textAlign = 'center'; t.textBaseline = 'middle';
    chars.forEach((ch, i) => {
      const cx = vertical ? W / 2 : pad + adv * (i + 0.5), cy = vertical ? pad + adv * (i + 0.5) : H / 2;
      const sc = 0.94 + rnd() * 0.12, rot = (rnd() - 0.5) * 0.09;
      t.save(); t.translate(cx + (rnd() - 0.5) * size * 0.05, cy + (rnd() - 0.5) * size * 0.03); t.rotate(rot + (vertical && ROT.includes(ch) ? Math.PI / 2 : 0));
      if (vertical && SMALL.includes(ch)) t.translate(size * 0.13, -size * 0.13);
      t.font = `${(size * sc).toFixed(2)}px ${JP_FONT}`;
      t.shadowColor = rgba(color, 0.55); t.shadowBlur = size * (o.bleed ?? 0.06) * D;
      t.globalAlpha = 0.84 + rnd() * 0.16;
      t.fillStyle = color; t.fillText(ch, 0, 0);
      if (o.heavy) { t.shadowBlur = 0; t.globalAlpha = 0.5; t.fillText(ch, size * 0.012, size * 0.01); }
      t.restore();
    });
    const dry = o.dry ?? 1;
    if (dry > 0) { // kasure: dry-brush streaks
      t.globalCompositeOperation = 'destination-out';
      const n = Math.round(chars.length * 14 * dry);
      for (let i = 0; i < n; i++) {
        t.strokeStyle = `rgba(0,0,0,${0.2 + rnd() * 0.5})`; t.lineWidth = size * (0.008 + rnd() * 0.02);
        const x0 = rnd() * W, y0 = rnd() * H, a = -0.7 + rnd() * 0.4, len = size * (0.12 + rnd() * 0.35);
        t.beginPath(); t.moveTo(x0, y0); t.lineTo(x0 + Math.cos(a) * len, y0 + Math.sin(a) * len); t.stroke();
      }
      for (let i = 0; i < chars.length * 20; i++) { t.fillStyle = `rgba(0,0,0,${rnd() * 0.5})`; t.fillRect(rnd() * W, rnd() * H, size * 0.02, size * 0.02); }
      t.globalCompositeOperation = 'source-over';
    }
    const dx = vertical ? x - W / 2 : o.align === 'center' ? x - W / 2 : o.align === 'right' ? x - W + pad : x - pad;
    const dy = vertical ? y - pad : y - H / 2;
    ctx.save(); if (o.blend) ctx.globalCompositeOperation = o.blend; if (o.alpha) ctx.globalAlpha = o.alpha;
    ctx.drawImage(c, dx, dy, W, H); ctx.restore();
    return { w: W, h: H, adv };
  }
  function hanko(ctx, x, y, s, str, o = {}) {
    const D = o.D || 1, rnd = o.rnd || Math.random;
    const [c, t] = hiCanvas(s * 1.2, s * 1.2, D); const p = s * 0.1;
    t.fillStyle = o.color || '#c3242b';
    roundRect(t, p, p, s, s, s * (o.round ?? 0.14)); t.fill();
    t.globalCompositeOperation = 'destination-out';
    t.strokeStyle = '#000'; t.lineWidth = s * 0.05; roundRect(t, p + s * 0.08, p + s * 0.08, s * 0.84, s * 0.84, s * 0.08); t.stroke();
    const chars = [...str]; t.textAlign = 'center'; t.textBaseline = 'middle'; t.fillStyle = '#000';
    if (chars.length === 1) { t.font = `${s * 0.66}px ${JP_FONT}`; t.fillText(chars[0], p + s / 2, p + s * 0.53); }
    else if (chars.length === 2) { t.font = `${s * 0.38}px ${JP_FONT}`; t.fillText(chars[0], p + s / 2, p + s * 0.3); t.fillText(chars[1], p + s / 2, p + s * 0.72); }
    else { t.font = `${s * 0.36}px ${JP_FONT}`; [[0.7, 0.3], [0.7, 0.72], [0.3, 0.3], [0.3, 0.72]].forEach(([a, b], i) => chars[i] && t.fillText(chars[i], p + s * a, p + s * b)); }
    for (let i = 0; i < 50; i++) { t.fillStyle = `rgba(0,0,0,${rnd() * 0.7})`; ellipse(t, p + rnd() * s, p + rnd() * s, s * (0.01 + rnd() * 0.03), s * (0.008 + rnd() * 0.02), rnd() * 3); t.fill(); }
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? (rnd() - 0.5) * 0.14); ctx.globalAlpha = o.alpha ?? 0.9;
    ctx.drawImage(c, -s * 0.6, -s * 0.6, s * 1.2, s * 1.2); ctx.restore();
  }
  // render to a standalone sprite (for per-frame use: noren, lanterns)
  function sprite(str, size, o = {}) {
    const vertical = o.vertical !== false, n = [...str].length, adv = size * (o.spacing || 1);
    const W = vertical ? size * 1.7 : adv * n + size * 0.7, H = vertical ? adv * n + size * 0.7 : size * 1.7;
    const [c, t] = hiCanvas(W, H, o.D || 1);
    text(t, str, vertical ? W / 2 : 0 + size * 0.35, vertical ? size * 0.35 : H / 2, size, o);
    return c;
  }
  return { text, hanko, sprite };
})();
