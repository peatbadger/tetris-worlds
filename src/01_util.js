'use strict';
/* ================= Utilities ================= */
const TAU = Math.PI * 2;
const rand = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
const randi = (a, b) => Math.floor(rand(a, b + 1));
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const smooth = (t) => t * t * (3 - 2 * t);
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
}
// Creates a canvas sized w*h CSS px at scale d; returns [canvas, ctx] with ctx pre-scaled
function hiCanvas(w, h, d) {
  const c = makeCanvas(w * d, h * d);
  const x = c.getContext('2d');
  x.scale(d, d);
  c.cssW = w; c.cssH = h;
  return [c, x];
}
function hexToRgb(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(h, a) { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }
function toHex(r, g, b) { return '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); }
function mix(h1, h2, t) { const a = hexToRgb(h1), b = hexToRgb(h2); return toHex(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)); }
function shade(h, amt) { return amt < 0 ? mix(h, '#000000', -amt) : mix(h, '#ffffff', amt); }
function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function ellipse(ctx, x, y, rx, ry, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rot, 0, TAU); }
// smooth 1D value noise
const _nz = (() => { const r = mulberry32(1337); const a = []; for (let i = 0; i < 512; i++) a.push(r()); return a; })();
function noise1(x) {
  const i = Math.floor(x), f = x - i;
  const a = _nz[i & 511], b = _nz[(i + 1) & 511];
  return lerp(a, b, smooth(f));
}
function radial(ctx, x, y, r, stops) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(0.01, r));
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}
function linear(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}

/* Procedural kanji-style brush glyph. x,y = top-left, s = size */
function drawGlyph(ctx, x, y, s, rnd, color, weight) {
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const w = (weight || 0.085) * s;
  const L = rnd();
  const boxes = L < 0.42 ? [[0, 0, 0.4, 1], [0.47, 0, 0.53, 1]] : L < 0.7 ? [[0, 0, 1, 0.4], [0, 0.47, 1, 0.53]] : [[0, 0, 1, 1]];
  if (s < 9) { // tiny: just a few dashes
    ctx.lineWidth = Math.max(0.6, w * 1.2);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      if (rnd() < 0.6) { const yy = y + s * (0.2 + 0.3 * i); ctx.moveTo(x + s * 0.15, yy); ctx.lineTo(x + s * 0.85, yy - s * 0.05); }
      else { const xx = x + s * (0.3 + rnd() * 0.4); ctx.moveTo(xx, y + s * 0.1); ctx.lineTo(xx, y + s * 0.9); }
      ctx.stroke();
    }
    ctx.restore(); return;
  }
  for (const b of boxes) {
    const bx = x + b[0] * s, by = y + b[1] * s, bw = b[2] * s, bh = b[3] * s;
    const n = 2 + Math.floor(rnd() * (b[2] * b[3] > 0.6 ? 4 : 3));
    for (let i = 0; i < n; i++) {
      ctx.lineWidth = w * (0.75 + rnd() * 0.55);
      const k = rnd();
      ctx.beginPath();
      if (k < 0.3) { // horizontal
        const yy = by + bh * (0.12 + rnd() * 0.76);
        const x0 = bx + bw * (0.04 + rnd() * 0.12), x1 = bx + bw * (0.88 + rnd() * 0.1);
        ctx.moveTo(x0, yy + bh * 0.02); ctx.quadraticCurveTo((x0 + x1) / 2, yy - bh * 0.03, x1, yy);
        ctx.stroke();
        // brush "press" at end
        ctx.beginPath(); ctx.arc(x1, yy, ctx.lineWidth * 0.6, 0, TAU); ctx.fill();
      } else if (k < 0.52) { // vertical with optional hook
        const xx = bx + bw * (0.2 + rnd() * 0.6);
        const y0 = by + bh * (0.02 + rnd() * 0.1), y1 = by + bh * (0.85 + rnd() * 0.13);
        ctx.moveTo(xx, y0); ctx.lineTo(xx + bw * 0.01, y1);
        if (rnd() < 0.4) ctx.lineTo(xx - bw * 0.12, y1 - bh * 0.08);
        ctx.stroke();
      } else if (k < 0.66) { // box 口
        const bw2 = bw * (0.35 + rnd() * 0.4), bh2 = bh * (0.25 + rnd() * 0.3);
        const xx = bx + rnd() * (bw - bw2), yy = by + rnd() * (bh - bh2);
        ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + bh2); ctx.moveTo(xx, yy); ctx.lineTo(xx + bw2, yy); ctx.lineTo(xx + bw2, yy + bh2);
        ctx.moveTo(xx, yy + bh2); ctx.lineTo(xx + bw2, yy + bh2);
        ctx.stroke();
      } else if (k < 0.78) { // left-falling sweep 丿
        const x0 = bx + bw * (0.5 + rnd() * 0.4), y0 = by + bh * (0.05 + rnd() * 0.3);
        ctx.moveTo(x0, y0); ctx.quadraticCurveTo(x0 - bw * 0.05, by + bh * 0.7, bx + bw * 0.05, by + bh * 0.95);
        ctx.stroke();
      } else if (k < 0.88) { // right-falling sweep 乀
        const x0 = bx + bw * (0.2 + rnd() * 0.3), y0 = by + bh * (0.15 + rnd() * 0.3);
        ctx.moveTo(x0, y0); ctx.quadraticCurveTo(bx + bw * 0.6, by + bh * 0.75, bx + bw * 0.97, by + bh * 0.92);
        ctx.stroke();
      } else { // dots 丶
        const m = 1 + Math.floor(rnd() * 3);
        for (let j = 0; j < m; j++) {
          const xx = bx + bw * (0.15 + rnd() * 0.7), yy = by + bh * (0.1 + rnd() * 0.8);
          ctx.beginPath(); ctx.ellipse(xx, yy, w * 0.75, w * 1.1, 0.6, 0, TAU); ctx.fill();
        }
      }
    }
  }
  ctx.restore();
}
