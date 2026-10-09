/* ================= Stage: Kaiten Sushi (showcase scene) ================= */
const MENU = [['鮪', '一〇〇'], ['サーモン', '一〇〇'], ['鯛', '一五〇'], ['海老', '一〇〇'], ['いくら', '二〇〇'], ['玉子', '一〇〇'], ['穴子', '二〇〇'],
  ['烏賊', '一〇〇'], ['蛸', '一〇〇'], ['鰤', '一五〇'], ['雲丹', '三〇〇'], ['河童巻', '一〇〇'], ['鉄火巻', '一五〇'], ['中とろ', '二五〇'], ['鯖', '一〇〇'],
  ['帆立', '二〇〇'], ['甘海老', '一五〇'], ['稲荷', '一〇〇'], ['赤貝', '二〇〇'], ['鰻', '二五〇'], ['茶碗蒸し', '二〇〇'], ['味噌汁', '一五〇'], ['鯵', '一〇〇']];
const SPECIAL = ['本日のおすすめ', '大将のおすすめ', '回転寿司', '一皿百円より', '酒', 'お茶無料'];
const LANTERN_WORDS = ['寿司', '祭', '回転', '酒', '寿', '鮨'];
const SUSHI_FOR = { '鮪': 'maguro', 'サーモン': 'salmon', '鯛': 'tai', '海老': 'ebi', 'いくら': 'g-ikura', '玉子': 'tamago', '穴子': 'unagi', '烏賊': 'ika', '蛸': 'tako',
  '鰤': 'hamachi', '雲丹': 'g-uni', '河童巻': 'm-kappa', '鉄火巻': 'm-tekka', '中とろ': 'chutoro', '鯖': 'saba', '帆立': 'hotate', '稲荷': 'inari', '鰻': 'unagi' };
const KANJI_NUM = (k) => Number([...k].map((c) => '〇一二三四五六七八九'.indexOf(c)).join(''));
function makeSushiStage() {
  let W, H, D, u, M;
  let wall, chefCounter, nearCounter, vignette, emblem, fgLeft, fgRight;
  let manekiTxt = null, norenChars = [], lanterns = [], nearSprites = [], farSprites = [], nearItems = [], farItems = [], farDiners = [], steamSpots = [], motes = [];
  let nearOff = 0, farOff = 0;
  const X = (f) => f * W;

  /* ---------- static wall ---------- */
  function drawBottle(ctx, x, base, maxH, rnd) {
    const type = rnd();
    const glass = pick2(rnd, ['#2c4a1e', '#4a2a10', '#1d2f4a', '#141414', '#5a3a12', '#c9d3cc']);
    if (type < 0.45) { // isshobin / yonmengo
      const h = maxH * (0.78 + rnd() * 0.2), w = h * 0.28, sh = h * 0.58, nh = h * 0.22;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x - w / 2, base); ctx.lineTo(x - w / 2, base - sh);
      ctx.bezierCurveTo(x - w / 2, base - sh - h * 0.12, x - w * 0.16, base - sh - h * 0.1, x - w * 0.16, base - h + nh);
      ctx.lineTo(x - w * 0.16, base - h); ctx.lineTo(x + w * 0.16, base - h); ctx.lineTo(x + w * 0.16, base - h + nh);
      ctx.bezierCurveTo(x + w * 0.16, base - sh - h * 0.1, x + w / 2, base - sh - h * 0.12, x + w / 2, base - sh);
      ctx.lineTo(x + w / 2, base); ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetX = 3 * u;
      ctx.fillStyle = linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, shade(glass, -0.5)], [0.3, shade(glass, 0.15)], [0.55, glass], [1, shade(glass, -0.6)]]);
      ctx.fill(); ctx.shadowColor = 'transparent';
      ctx.clip();
      ctx.fillStyle = 'rgba(255,240,210,0.35)'; ctx.fillRect(x - w * 0.3, base - h, w * 0.08, h);
      ctx.fillStyle = 'rgba(255,220,180,0.15)'; ctx.fillRect(x + w * 0.25, base - sh, w * 0.05, sh);
      ctx.restore();
      // cap
      ctx.fillStyle = pick2(rnd, ['#c8a040', '#9a1c1c', '#1a1a1a', '#e9e2d0']);
      ctx.fillRect(x - w * 0.19, base - h - h * 0.02, w * 0.38, h * 0.08);
      // label
      const lw = w * 0.82, lh = sh * 0.7, ly = base - sh * 0.88;
      const lt = rnd();
      ctx.fillStyle = lt < 0.6 ? '#efe6cf' : lt < 0.8 ? '#1a1410' : '#b8242a';
      ctx.fillRect(x - lw / 2, ly, lw, lh);
      ctx.strokeStyle = lt < 0.6 ? 'rgba(120,90,50,0.6)' : '#c9a24a'; ctx.lineWidth = 0.8 * u; ctx.strokeRect(x - lw / 2 + 1.5 * u, ly + 1.5 * u, lw - 3 * u, lh - 3 * u);
      const gc = lt < 0.6 ? '#151010' : lt < 0.8 ? '#e9d08a' : '#fff4e0';
      const word = pick2(rnd, ['純米', '大吟醸', '清酒', '吟醸', '本醸造', '原酒', '辛口', '生酒']);
      const n = [...word].length, gs = Math.min(lw * 0.72, (lh - 6 * u) / n);
      Ink.text(ctx, word, x, ly + 3 * u, gs, { D, rnd, color: gc.startsWith('#') ? gc : '#151010', bleed: 0.04, dry: 0.5 });
      if (lt < 0.6) Ink.hanko(ctx, x + lw * 0.3, ly + lh - lw * 0.2, lw * 0.3, pick2(rnd, ['酒', '旨', '蔵']), { D, rnd });
    } else if (type < 0.7) { // tokkuri flask (ceramic)
      const h = maxH * (0.45 + rnd() * 0.15), w = h * 0.62;
      const col = pick2(rnd, ['#f1ece0', '#2a3e6e', '#7a4a2a', '#d9d2c0']);
      ctx.save();
      ctx.beginPath(); ctx.moveTo(x - w * 0.3, base);
      ctx.bezierCurveTo(x - w * 0.7, base - h * 0.2, x - w * 0.55, base - h * 0.7, x - w * 0.12, base - h * 0.82);
      ctx.lineTo(x - w * 0.14, base - h); ctx.lineTo(x + w * 0.14, base - h); ctx.lineTo(x + w * 0.12, base - h * 0.82);
      ctx.bezierCurveTo(x + w * 0.55, base - h * 0.7, x + w * 0.7, base - h * 0.2, x + w * 0.3, base); ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 5 * u; ctx.shadowOffsetX = 2 * u;
      ctx.fillStyle = radial(ctx, x - w * 0.15, base - h * 0.45, w * 0.8, [[0, shade(col, 0.25)], [0.6, col], [1, shade(col, -0.5)]]); ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.clip();
      ctx.strokeStyle = col === '#2a3e6e' ? 'rgba(230,235,250,0.7)' : 'rgba(30,50,110,0.7)'; ctx.lineWidth = 1.2 * u;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); const yy = base - h * (0.25 + i * 0.12); ctx.moveTo(x - w, yy); for (let j = 0; j < 8; j++) ctx.quadraticCurveTo(x - w + (j + 0.5) * w * 0.25, yy - 3 * u, x - w + (j + 1) * w * 0.25, yy); ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(ctx, x - w * 0.22, base - h * 0.5, w * 0.06, h * 0.18); ctx.fill();
      ctx.restore();
    } else if (type < 0.85) { // square shochu bottle
      const h = maxH * (0.7 + rnd() * 0.2), w = h * 0.32;
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetX = 3 * u;
      roundRect(ctx, x - w / 2, base - h * 0.8, w, h * 0.8, 2 * u);
      ctx.fillStyle = linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, shade(glass, -0.4)], [0.2, shade(glass, 0.2)], [0.5, glass], [0.52, shade(glass, -0.3)], [1, shade(glass, -0.6)]]); ctx.fill(); ctx.restore();
      ctx.fillStyle = shade(glass, -0.2); ctx.fillRect(x - w * 0.14, base - h, w * 0.28, h * 0.22);
      ctx.fillStyle = '#d4af37'; ctx.fillRect(x - w * 0.17, base - h - 2 * u, w * 0.34, 5 * u);
      ctx.fillStyle = '#0f0c0a'; ctx.fillRect(x - w * 0.42, base - h * 0.65, w * 0.84, h * 0.45);
      Ink.text(ctx, '焼酎', x, base - h * 0.63, Math.min(w * 0.6, h * 0.2), { D, rnd, color: '#f2f0ea', bleed: 0.03, dry: 0.4 });
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x - w * 0.36, base - h * 0.78, w * 0.05, h * 0.76);
    } else if (type < 0.92) { drawBottle(ctx, x, base, maxH, () => rnd() * 0.84); } else { // masu cups stack
      const s = maxH * 0.18;
      for (let r = 0; r < 3; r++) for (let c = 0; c <= 2 - r; c++) {
        const bx = x - s * 1.5 + c * s + r * s * 0.5, by = base - (r + 1) * s * 0.92;
        ctx.fillStyle = linear(ctx, bx, by, bx + s, by + s, [[0, '#ecd29a'], [1, '#bf9a58']]); ctx.fillRect(bx, by, s * 0.94, s * 0.9);
        ctx.strokeStyle = 'rgba(90,60,20,0.6)'; ctx.lineWidth = 0.8 * u; ctx.strokeRect(bx, by, s * 0.94, s * 0.9);
        Ink.text(ctx, '酒', bx + s * 0.47, by + s * 0.12, s * 0.5, { D, rnd, color: '#3c1e0a', bleed: 0.03, dry: 0.3 });
      }
    }
  }
  function pick2(rnd, a) { return a[Math.floor(rnd() * a.length)]; }
  function woodGrain(ctx, x, y, w, h, rnd, dark, light, n) {
    for (let i = 0; i < n; i++) {
      const xx = x + rnd() * w; ctx.strokeStyle = rnd() < 0.6 ? dark : light; ctx.lineWidth = (0.4 + rnd() * 1.2) * u;
      ctx.beginPath(); ctx.moveTo(xx, y);
      ctx.bezierCurveTo(xx + (rnd() - 0.5) * 8 * u, y + h * 0.33, xx + (rnd() - 0.5) * 8 * u, y + h * 0.66, xx + (rnd() - 0.5) * 6 * u, y + h); ctx.stroke();
    }
  }
  function hGrain(ctx, x, y, w, h, rnd, dark, light, n) {
    for (let i = 0; i < n; i++) {
      const yy = y + rnd() * h; ctx.strokeStyle = rnd() < 0.6 ? dark : light; ctx.lineWidth = (0.4 + rnd()) * u;
      ctx.beginPath(); ctx.moveTo(x, yy);
      ctx.bezierCurveTo(x + w * 0.33, yy + (rnd() - 0.5) * 6 * u, x + w * 0.66, yy + (rnd() - 0.5) * 6 * u, x + w, yy + (rnd() - 0.5) * 4 * u); ctx.stroke();
    }
  }
  function seigaiha(ctx, x0, y0, w, h, r, c1, c2) {
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
    ctx.fillStyle = c1; ctx.fillRect(x0, y0, w, h);
    for (let row = 0; row * r * 0.5 < h + r; row++) {
      const yy = y0 + row * r * 0.5; const off = row % 2 ? r : 0;
      for (let xx = x0 - r * 2 + off; xx < x0 + w + r * 2; xx += r * 2) {
        for (let k = 4; k >= 1; k--) {
          ctx.beginPath(); ctx.arc(xx, yy + r * 0.5, r * k / 4, Math.PI, 0); ctx.closePath();
          ctx.fillStyle = k % 2 ? c1 : c2; ctx.fill();
        }
      }
    }
    ctx.restore();
  }
  function buildWall() {
    const WW = W + 2 * M, WH = H * 0.64;
    const [c, ctx] = hiCanvas(WW, WH, D);
    const rnd = mulberry32(42);
    const Xw = (f) => M + f * W;
    // base wood panelling
    ctx.fillStyle = linear(ctx, 0, 0, 0, WH, [[0, '#2a170b'], [0.4, '#4b2c16'], [1, '#2c180b']]);
    ctx.fillRect(0, 0, WW, WH);
    const pw = 52 * u;
    for (let x = 0; x < WW; x += pw) {
      ctx.fillStyle = `rgba(${rnd() < 0.5 ? '255,200,140' : '0,0,0'},${0.03 + rnd() * 0.05})`; ctx.fillRect(x, 0, pw, WH);
      woodGrain(ctx, x, 0, pw, WH, rnd, 'rgba(20,8,0,0.22)', 'rgba(255,190,120,0.06)', 9);
      ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(x, 0, 1.5 * u, WH);
      ctx.fillStyle = 'rgba(255,200,150,0.07)'; ctx.fillRect(x + 1.5 * u, 0, 1 * u, WH);
    }
    // ceiling + beam
    ctx.fillStyle = linear(ctx, 0, 0, 0, H * 0.05, [[0, '#0d0704'], [1, '#1d1009']]); ctx.fillRect(0, 0, WW, H * 0.05);
    for (let x = 0; x < WW; x += 90 * u) { ctx.fillStyle = 'rgba(255,190,120,0.05)'; ctx.fillRect(x, 0, 30 * u, H * 0.05); }
    ctx.fillStyle = linear(ctx, 0, H * 0.045, 0, H * 0.066, [[0, '#3a1a0c'], [0.3, '#6a3418'], [1, '#1a0b05']]); ctx.fillRect(0, H * 0.045, WW, H * 0.021);
    ctx.fillStyle = 'rgba(255,210,150,0.35)'; ctx.fillRect(0, H * 0.047, WW, 1 * u);
    // menu plaques (fuda)
    const py = H * 0.07, ph = H * 0.165, pwid = 38 * u, gap = 7 * u;
    let i = 0, mi = 0, sp = 0;
    for (let x = 6 * u; x < WW - pwid; x += pwid + gap, i++) {
      const kind = rnd(); const pic = i % 4 === 1;
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 8 * u; ctx.shadowOffsetY = 4 * u;
      const lac = kind > 0.84 ? 'red' : kind > 0.74 ? 'black' : 'wood';
      ctx.fillStyle = lac === 'red' ? linear(ctx, x, 0, x + pwid, 0, [[0, '#8a1414'], [0.5, '#c0261f'], [1, '#7a1010']])
        : lac === 'black' ? linear(ctx, x, 0, x + pwid, 0, [[0, '#0e0b0a'], [0.5, '#2a2422'], [1, '#0a0807']])
          : linear(ctx, x, py, x + pwid, py + ph, [[0, '#f4e2bc'], [0.5, '#e6cc98'], [1, '#c9a86e']]);
      ctx.fillRect(x, py, pwid, ph); ctx.restore();
      if (lac === 'wood') woodGrain(ctx, x, py, pwid, ph, rnd, 'rgba(140,90,40,0.25)', 'rgba(255,255,255,0.15)', 5);
      ctx.strokeStyle = lac === 'wood' ? 'rgba(90,55,20,0.5)' : '#d4af37'; ctx.lineWidth = 1 * u; ctx.strokeRect(x + 2 * u, py + 2 * u, pwid - 4 * u, ph - 4 * u);
      // brass pins
      [x + pwid * 0.25, x + pwid * 0.75].forEach((px) => { ellipse(ctx, px, py + 4 * u, 1.8 * u, 1.8 * u); ctx.fillStyle = radial(ctx, px - 0.5 * u, py + 3.5 * u, 2 * u, [[0, '#fff2b0'], [1, '#8a6a1a']]); ctx.fill(); });
      const gc = lac === 'wood' ? '#17100c' : lac === 'red' ? '#f6d68a' : '#f1ebdf';
      const special = lac !== 'wood' || i % 7 === 3;
      if (special) {
        const word = SPECIAL[sp++ % SPECIAL.length];
        const n = [...word].length, gs = Math.min(pwid * 0.66, (ph - 16 * u) / n);
        Ink.text(ctx, word, x + pwid / 2, py + 9 * u + (ph - 16 * u - gs * n) / 2, gs, { D, rnd, color: lac === 'wood' ? '#17100c' : gc, bleed: 0.05, heavy: true });
        if (n <= 2) Ink.hanko(ctx, x + pwid / 2, py + ph - 16 * u, 13 * u, pick2(rnd, ['旨', '鮨', '寿']), { D, rnd });
      } else {
        const [name, price] = MENU[mi++ % MENU.length];
        let top = py + 9 * u;
        if (pic) { SushiArt.food(ctx, SUSHI_FOR[name] || pick2(rnd, SushiArt.KINDS), x + pwid / 2, py + ph * 0.24, pwid / 70, rnd); top = py + ph * 0.3; }
        const n = [...name].length, area = py + ph * (pic ? 0.8 : 0.7) - top;
        const gs = Math.min(pwid * (n === 1 ? 0.78 : 0.66), area / n);
        Ink.text(ctx, name, x + pwid / 2, top + (area - gs * n) / 2, gs, { D, rnd, color: gc, bleed: 0.06, heavy: n <= 2 });
        if (pic) { // red price tag with arabic numerals
          const ty = py + ph - 19 * u;
          roundRect(ctx, x + 3 * u, ty, pwid - 6 * u, 15 * u, 3 * u); ctx.fillStyle = '#b3221b'; ctx.fill();
          Ink.text(ctx, String(KANJI_NUM(price)) + '円', x + pwid / 2, ty + 7.8 * u, 9.5 * u, { D, rnd, vertical: false, align: 'center', color: '#fff6e6', bleed: 0.02, dry: 0.2 });
        } else {
          const pr = price + '円', pn = [...pr].length, ps = Math.min(pwid * 0.34, (ph * 0.3 - 8 * u) / pn);
          Ink.text(ctx, pr, x + pwid / 2, py + ph * 0.7 + 2 * u, ps, { D, rnd, color: '#7a1810', bleed: 0.04, dry: 0.4 });
          if (i % 5 === 2) Ink.hanko(ctx, x + pwid * 0.24, py + ph * 0.78, 9 * u, '旨', { D, rnd });
        }
      }
    }
    // ---- kanban over the kitchen door: 江戸前寿司 ----
    { const kx0 = Xw(0.035) - 12 * u, kx1 = Xw(0.29) + 12 * u, ky = H * 0.247, kh = H * 0.046;
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 10 * u; ctx.shadowOffsetY = 5 * u;
      ctx.fillStyle = linear(ctx, 0, ky, 0, ky + kh, [[0, '#4a2a14'], [0.5, '#2e180a'], [1, '#1a0c04']]); ctx.fillRect(kx0, ky, kx1 - kx0, kh); ctx.restore();
      hGrain(ctx, kx0, ky, kx1 - kx0, kh, rnd, 'rgba(0,0,0,0.3)', 'rgba(255,200,140,0.07)', 12);
      ctx.strokeStyle = '#a8842e'; ctx.lineWidth = 1.2 * u; ctx.strokeRect(kx0 + 3 * u, ky + 3 * u, kx1 - kx0 - 6 * u, kh - 6 * u);
      Ink.text(ctx, '江戸前寿司', (kx0 + kx1) / 2, ky + kh / 2, kh * 0.62, { D, rnd, vertical: false, align: 'center', color: '#e9c766', spacing: 1.35, bleed: 0.12, dry: 0.3, heavy: true });
      Ink.hanko(ctx, kx1 - 16 * u, ky + kh / 2, kh * 0.5, '大将', { D, rnd, rot: 0 }); }
    // ---- kitchen doorway (left) ----
    const dx0 = Xw(0.035), dx1 = Xw(0.29), dy0 = H * 0.305, dy1 = WH;
    ctx.fillStyle = linear(ctx, 0, dy0, 0, dy1, [[0, '#0b0604'], [0.6, '#1c120a'], [1, '#3a2412']]); ctx.fillRect(dx0, dy0, dx1 - dx0, dy1 - dy0);
    // kitchen interior hints
    ctx.fillStyle = radial(ctx, Xw(0.2), H * 0.5, 160 * u, [[0, 'rgba(255,170,90,0.28)'], [1, 'rgba(255,170,90,0)']]); ctx.fillRect(dx0, dy0, dx1 - dx0, dy1 - dy0);
    ctx.strokeStyle = 'rgba(160,150,140,0.25)'; ctx.lineWidth = 2 * u;
    for (let k = 0; k < 3; k++) { const yy = dy0 + 40 * u + k * 34 * u; ctx.beginPath(); ctx.moveTo(dx0 + 10 * u, yy); ctx.lineTo(dx1 - 10 * u, yy); ctx.stroke(); }
    for (let k = 0; k < 7; k++) { // pots & ladles silhouettes
      const px = dx0 + 20 * u + k * (dx1 - dx0 - 40 * u) / 6, py2 = dy0 + 40 * u + (k % 3) * 34 * u;
      ctx.fillStyle = 'rgba(120,100,85,0.35)';
      if (k % 2) { ctx.fillRect(px - 9 * u, py2 - 14 * u, 18 * u, 14 * u); ctx.fillStyle = 'rgba(255,200,140,0.15)'; ctx.fillRect(px - 9 * u, py2 - 14 * u, 3 * u, 14 * u); }
      else { ctx.beginPath(); ctx.moveTo(px, py2); ctx.lineTo(px, py2 + 22 * u); ctx.strokeStyle = 'rgba(150,130,110,0.35)'; ctx.lineWidth = 1.5 * u; ctx.stroke(); ellipse(ctx, px, py2 + 25 * u, 5 * u, 3.5 * u); ctx.fill(); }
    }
    // door frame
    const post = 12 * u;
    [[dx0 - post, dy0 - post, post, dy1 - dy0 + post], [dx1, dy0 - post, post, dy1 - dy0 + post], [dx0 - post, dy0 - post, dx1 - dx0 + post * 2, post]].forEach(([x, y, w, h]) => {
      ctx.fillStyle = linear(ctx, x, y, x + (w > h ? 0 : w), y + (w > h ? h : 0), [[0, '#2a150a'], [0.4, '#5a3018'], [1, '#1a0c05']]); ctx.fillRect(x, y, w, h);
    });
    // ---- tokonoma + hanging scroll (centre, mostly behind board) ----
    const sx = Xw(0.5), sw2 = 70 * u;
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(sx - 120 * u, H * 0.27, 240 * u, H * 0.32);
    ctx.fillStyle = '#5a4a3a'; ctx.fillRect(sx - sw2 / 2 - 6 * u, H * 0.28, sw2 + 12 * u, H * 0.28);
    ctx.fillStyle = '#efe6d0'; ctx.fillRect(sx - sw2 / 2, H * 0.3, sw2, H * 0.24);
    Ink.text(ctx, '一期一会', sx, H * 0.31, H * 0.044, { D, rnd, color: '#141010', bleed: 0.08, heavy: true });
    Ink.hanko(ctx, sx + 22 * u, H * 0.52, 11 * u, '寿', { D, rnd });
    // ---- sake shelves (right) ----
    const shx0 = Xw(0.695), shx1 = Xw(0.985), shy0 = H * 0.25, shy1 = H * 0.535;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 14 * u;
    ctx.fillStyle = linear(ctx, 0, shy0, 0, shy1, [[0, '#160c06'], [1, '#2a170b']]); ctx.fillRect(shx0, shy0, shx1 - shx0, shy1 - shy0); ctx.restore();
    ctx.fillStyle = radial(ctx, (shx0 + shx1) / 2, shy0, (shx1 - shx0) * 0.7, [[0, 'rgba(255,190,110,0.22)'], [1, 'rgba(255,190,110,0)']]); ctx.fillRect(shx0, shy0, shx1 - shx0, shy1 - shy0);
    const shelves = [H * 0.335, H * 0.43, H * 0.525];
    shelves.forEach((sy, si) => {
      const maxH = (si === 0 ? sy - shy0 : sy - shelves[si - 1]) - 8 * u;
      let x = shx0 + 16 * u;
      while (x < shx1 - 14 * u) {
        if (si === 1 && x > shx1 - 60 * u) break; // space for maneki-neko
        const bw = 24 * u + rnd() * 14 * u;
        drawBottle(ctx, x + bw / 2, sy, maxH, rnd);
        x += bw + 4 * u;
      }
      ctx.fillStyle = linear(ctx, 0, sy, 0, sy + 9 * u, [[0, '#a8743e'], [0.25, '#7a4a20'], [1, '#2e170a']]); ctx.fillRect(shx0 - 6 * u, sy, shx1 - shx0 + 12 * u, 9 * u);
      ctx.fillStyle = 'rgba(255,220,170,0.45)'; ctx.fillRect(shx0 - 6 * u, sy, shx1 - shx0 + 12 * u, 1 * u);
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(shx0, sy + 9 * u, shx1 - shx0, 6 * u);
    });
    // shelf sides
    [shx0 - 8 * u, shx1].forEach((x) => { ctx.fillStyle = linear(ctx, x, 0, x + 8 * u, 0, [[0, '#2a150a'], [0.5, '#6a3a1a'], [1, '#1a0c05']]); ctx.fillRect(x, shy0 - 6 * u, 8 * u, shy1 - shy0 + 6 * u); });
    // daruma on top shelf corner
    const dmx = shx1 - 26 * u, dmy = shelves[2];
    ellipse(ctx, dmx, dmy - 14 * u, 13 * u, 15 * u); ctx.fillStyle = radial(ctx, dmx - 4 * u, dmy - 20 * u, 18 * u, [[0, '#ff5a4a'], [1, '#8a0a0a']]); ctx.fill();
    ellipse(ctx, dmx, dmy - 18 * u, 7.5 * u, 6.5 * u); ctx.fillStyle = '#f6e8d6'; ctx.fill();
    ctx.fillStyle = '#111'; ellipse(ctx, dmx - 3 * u, dmy - 18 * u, 1.8 * u, 1.8 * u); ctx.fill();
    Ink.text(ctx, '福', dmx, dmy - 11 * u, 8 * u, { D, rnd, color: '#f2cf6a', bleed: 0.03, dry: 0.2 });
    // wainscot with seigaiha band
    ctx.fillStyle = '#1a0d06'; ctx.fillRect(0, H * 0.54, WW, WH - H * 0.54);
    seigaiha(ctx, 0, H * 0.55, WW, H * 0.06, 11 * u, '#1d2d55', '#d9d2bd');
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, H * 0.55, WW, H * 0.06);
    ctx.fillStyle = linear(ctx, 0, H * 0.535, 0, H * 0.552, [[0, '#8a5a2a'], [1, '#2a1408']]); ctx.fillRect(0, H * 0.535, WW, H * 0.017);
    return c;
  }

  /* ---------- lanterns ---------- */
  function buildLantern(s, red, seed) {
    const rnd = mulberry32(seed);
    const w = 56 * u * s, bh = 74 * u * s, cap = 7 * u * s;
    const SW = w + 10 * u, SH = bh + cap * 2 + 30 * u * s;
    const [c, ctx] = hiCanvas(SW, SH, D);
    const cx = SW / 2, top = cap, cy = top + bh / 2;
    const base = red ? ['#ff8a5a', '#d4241c', '#6a0606'] : ['#fffbea', '#f2dcae', '#a87a3e'];
    ellipse(ctx, cx, cy, w / 2, bh / 2);
    ctx.fillStyle = radial(ctx, cx - w * 0.12, cy - bh * 0.1, w * 0.62, [[0, base[0]], [0.55, base[1]], [1, base[2]]]); ctx.fill();
    ctx.save(); ellipse(ctx, cx, cy, w / 2, bh / 2); ctx.clip();
    for (let i = 1; i < 12; i++) {
      const y = top + i * bh / 12, dy = (y - cy) / (bh / 2), hw = (w / 2) * Math.sqrt(Math.max(0, 1 - dy * dy));
      ctx.beginPath(); ctx.ellipse(cx, y, hw, hw * 0.1, 0, 0, Math.PI); ctx.strokeStyle = red ? 'rgba(70,0,0,0.35)' : 'rgba(110,70,20,0.3)'; ctx.lineWidth = 1 * u * s; ctx.stroke();
    }
    for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(i) * w * 0.12 + 0.1, bh / 2, 0, -Math.PI / 2, Math.PI / 2, i < 0); ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1 * u; ctx.stroke(); }
    const word = LANTERN_WORDS[seed % LANTERN_WORDS.length], n = [...word].length;
    const gs = n === 1 ? w * 0.62 : w * 0.4;
    Ink.text(ctx, word, cx, cy - (gs * n) / 2, gs, { D, rnd, color: red ? '#140404' : '#b3161a', bleed: 0.05, heavy: true, dry: 0.6 });
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = radial(ctx, cx, cy + bh * 0.05, w * 0.45, [[0, 'rgba(255,200,120,0.45)'], [1, 'rgba(255,200,120,0)']]); ctx.fillRect(0, 0, SW, SH);
    ctx.restore();
    // caps
    [[top - cap, cap], [top + bh - 1 * u, cap]].forEach(([y, h]) => {
      roundRect(ctx, cx - w * 0.28, y, w * 0.56, h, 2 * u * s); ctx.fillStyle = linear(ctx, cx - w * 0.28, 0, cx + w * 0.28, 0, [[0, '#050505'], [0.4, '#3a3530'], [1, '#050505']]); ctx.fill();
      ctx.fillStyle = '#c9a040'; ctx.fillRect(cx - w * 0.28, y + h * 0.45, w * 0.56, 1 * u * s);
    });
    // tassel
    const ty = top + bh + cap;
    ctx.strokeStyle = red ? '#e8c04a' : '#c0282c'; ctx.lineWidth = 1.2 * u * s;
    ctx.beginPath(); ctx.moveTo(cx, ty); ctx.lineTo(cx, ty + 8 * u * s); ctx.stroke();
    for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(cx, ty + 8 * u * s); ctx.lineTo(cx + i * 1.2 * u * s, ty + 24 * u * s); ctx.stroke(); }
    return { c, w: SW, h: SH, cx, cyOff: cy, top: 0 };
  }

  /* ---------- chef counter (static) ---------- */
  function buildChefCounter() {
    const CW = X(0.34) + M, CH = H;
    const [c, ctx] = hiCanvas(CW, CH, D);
    const rnd = mulberry32(7);
    const ox = M; const top = H * 0.495, front = H * 0.512, bot = H * 0.61;
    // counter top + front
    ctx.fillStyle = linear(ctx, 0, top, 0, front, [[0, '#e7c38c'], [1, '#b58650']]); ctx.fillRect(0, top, CW, front - top);
    hGrain(ctx, 0, top, CW, front - top, rnd, 'rgba(120,70,20,0.25)', 'rgba(255,255,255,0.2)', 6);
    ctx.fillStyle = 'rgba(255,240,200,0.6)'; ctx.fillRect(0, top, CW, 1 * u);
    ctx.fillStyle = linear(ctx, 0, front, 0, bot, [[0, '#2a1208'], [1, '#120804']]); ctx.fillRect(0, front, CW, bot - front);
    for (let x = 0; x < CW; x += 16 * u) { ctx.fillStyle = 'rgba(255,180,110,0.06)'; ctx.fillRect(x, front, 7 * u, bot - front); ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(x + 15 * u, front, 1 * u, bot - front); }
    ctx.fillStyle = '#c9a040'; ctx.fillRect(0, front + 3 * u, CW, 1.2 * u);
    // neta case (glass display) on the left
    const nx0 = ox + X(0.005), nx1 = ox + X(0.115), ny1 = top + 2 * u, ny0 = ny1 - 46 * u;
    ctx.fillStyle = linear(ctx, 0, ny1 - 12 * u, 0, ny1, [[0, '#d6e6ec'], [1, '#9fb7c2']]); ctx.fillRect(nx0, ny1 - 12 * u, nx1 - nx0, 12 * u);
    for (let i = 0; i < 90; i++) { ellipse(ctx, nx0 + rnd() * (nx1 - nx0), ny1 - rnd() * 12 * u, 1.5 * u, 1 * u, rnd() * 3); ctx.fillStyle = `rgba(255,255,255,${0.4 + rnd() * 0.5})`; ctx.fill(); }
    // fish blocks
    const fishes = [['#f57a3d', 'salmon'], ['#c41d36', 'tuna'], ['#f4c6b0', 'hamachi'], ['#f6e8e2', 'tai'], ['#f0542e', 'ebi']];
    let fx = nx0 + 5 * u; const fw = (nx1 - nx0 - 10 * u) / fishes.length;
    fishes.forEach(([col, kind], i) => {
      const fy = ny1 - 10 * u, fh = 12 * u + (i % 2) * 3 * u;
      if (kind === 'ebi') {
        for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(fx + fw / 2, fy - k * 4 * u, fw * 0.35, Math.PI, 0); ctx.strokeStyle = k % 2 ? '#ffd8c8' : '#f0542e'; ctx.lineWidth = 3 * u; ctx.stroke(); }
      } else {
        roundRect(ctx, fx + 1 * u, fy - fh, fw - 2 * u, fh, 2 * u);
        ctx.fillStyle = linear(ctx, 0, fy - fh, 0, fy, [[0, shade(col, 0.2)], [1, shade(col, -0.25)]]); ctx.fill();
        if (kind === 'salmon') { ctx.strokeStyle = 'rgba(255,235,220,0.85)'; ctx.lineWidth = 1 * u; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(fx + k * fw / 5, fy - fh); ctx.lineTo(fx + k * fw / 5 - 3 * u, fy); ctx.stroke(); } }
        if (kind === 'tai') { ctx.fillStyle = '#e06a7a'; ctx.fillRect(fx + 1 * u, fy - fh, fw - 2 * u, 2 * u); }
        if (kind === 'hamachi') { ctx.fillStyle = 'rgba(170,40,50,0.6)'; ctx.fillRect(fx + 1 * u, fy - fh * 0.5, fw - 2 * u, 2 * u); }
      }
      // baran leaf divider
      if (i < fishes.length - 1) {
        ctx.beginPath(); ctx.moveTo(fx + fw, fy); for (let k = 0; k < 5; k++) { ctx.lineTo(fx + fw + (k % 2 ? 3 : -3) * u, fy - (k + 1) * 4 * u); } ctx.lineTo(fx + fw + 1 * u, fy);
        ctx.fillStyle = '#2f8a3a'; ctx.fill();
      }
      fx += fw;
    });
    // glass
    ctx.fillStyle = 'rgba(200,230,240,0.10)'; ctx.fillRect(nx0, ny0, nx1 - nx0, ny1 - ny0);
    ctx.strokeStyle = 'rgba(220,235,240,0.65)'; ctx.lineWidth = 1.5 * u; ctx.strokeRect(nx0, ny0, nx1 - nx0, ny1 - ny0);
    ctx.fillStyle = linear(ctx, 0, ny0 - 4 * u, 0, ny0, [[0, '#e0e0e0'], [1, '#7a7a7a']]); ctx.fillRect(nx0 - 2 * u, ny0 - 4 * u, nx1 - nx0 + 4 * u, 4 * u);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath(); ctx.moveTo(nx0 + 8 * u, ny0); ctx.lineTo(nx0 + 22 * u, ny0); ctx.lineTo(nx0 + 4 * u, ny1); ctx.lineTo(nx0 - 10 * u + 8 * u, ny1); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.beginPath(); ctx.moveTo(nx0 + 30 * u, ny0); ctx.lineTo(nx0 + 36 * u, ny0); ctx.lineTo(nx0 + 18 * u, ny1); ctx.lineTo(nx0 + 12 * u, ny1); ctx.closePath(); ctx.fill();
    ctx.restore();
    // cutting board (manaita) in front of chef
    const bx0 = ox + X(0.125), bx1 = ox + X(0.225), by = top + 1 * u;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 5 * u; ctx.shadowOffsetY = 2 * u;
    ctx.fillStyle = linear(ctx, 0, by - 9 * u, 0, by, [[0, '#f6e2bc'], [1, '#d7b884']]); ctx.fillRect(bx0, by - 9 * u, bx1 - bx0, 9 * u); ctx.restore();
    ctx.fillStyle = '#b08850'; ctx.fillRect(bx0, by - 1 * u, bx1 - bx0, 4 * u);
    hGrain(ctx, bx0, by - 9 * u, bx1 - bx0, 8 * u, rnd, 'rgba(140,90,40,0.3)', 'rgba(255,255,255,0.3)', 5);
    // salmon fillet + fanned slices
    const fx0 = bx0 + 8 * u, fy0 = by - 6 * u;
    ctx.beginPath(); ctx.moveTo(fx0, fy0); ctx.quadraticCurveTo(fx0 + 25 * u, fy0 - 9 * u, fx0 + 48 * u, fy0 - 3 * u); ctx.lineTo(fx0 + 48 * u, fy0 + 2 * u); ctx.lineTo(fx0, fy0 + 2 * u); ctx.closePath();
    ctx.fillStyle = linear(ctx, 0, fy0 - 8 * u, 0, fy0, [[0, '#ffa06a'], [1, '#e0602a']]); ctx.fill();
    ctx.strokeStyle = 'rgba(255,240,225,0.9)'; ctx.lineWidth = 1 * u;
    for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(fx0 + k * 7 * u, fy0 + 2 * u); ctx.lineTo(fx0 + k * 7 * u + 3 * u, fy0 - 6 * u); ctx.stroke(); }
    for (let k = 0; k < 4; k++) { ellipse(ctx, bx1 - 30 * u + k * 6 * u, by - 5 * u, 6 * u, 2.2 * u, -0.3); ctx.fillStyle = k % 2 ? '#f57a3d' : '#ff935a'; ctx.fill(); ctx.strokeStyle = 'rgba(255,240,225,0.8)'; ctx.lineWidth = 0.6 * u; ctx.stroke(); }
    // hangiri rice tub (right)
    const hx = ox + X(0.27), hy = top + 1 * u, hr = X(0.03);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 6 * u;
    ctx.beginPath(); ctx.moveTo(hx - hr, hy - 16 * u); ctx.lineTo(hx - hr * 0.95, hy); ctx.ellipse(hx, hy, hr * 0.95, 5 * u, 0, Math.PI, 0, true); ctx.lineTo(hx + hr, hy - 16 * u); ctx.closePath();
    ctx.fillStyle = linear(ctx, hx - hr, 0, hx + hr, 0, [[0, '#7a4a1e'], [0.35, '#d9a35e'], [1, '#6a3c14']]); ctx.fill(); ctx.restore();
    [hy - 13 * u, hy - 4 * u].forEach((yy) => { ctx.fillStyle = linear(ctx, hx - hr, 0, hx + hr, 0, [[0, '#6a3a12'], [0.35, '#e0a060'], [1, '#5a2e0c']]); ctx.fillRect(hx - hr, yy, hr * 2, 3 * u); });
    ellipse(ctx, hx, hy - 16 * u, hr, 6 * u); ctx.fillStyle = '#5a3612'; ctx.fill();
    ellipse(ctx, hx, hy - 17 * u, hr * 0.9, 5 * u); ctx.fillStyle = radial(ctx, hx - 5 * u, hy - 20 * u, hr, [[0, '#ffffff'], [1, '#d8d0bc']]); ctx.fill();
    for (let k = 0; k < 40; k++) { const a = rnd() * TAU, d = Math.sqrt(rnd()); ellipse(ctx, hx + Math.cos(a) * d * hr * 0.85, hy - 17 * u + Math.sin(a) * d * 4.2 * u, 1.2 * u, 0.6 * u, a); ctx.fillStyle = '#fff'; ctx.fill(); }
    ctx.save(); ctx.translate(hx + hr * 0.3, hy - 19 * u); ctx.rotate(-0.9);
    roundRect(ctx, -2 * u, -26 * u, 4 * u, 22 * u, 2 * u); ctx.fillStyle = '#e8d2a8'; ctx.fill(); ellipse(ctx, 0, 0, 5 * u, 7 * u); ctx.fill(); ctx.restore();
    // pendant light reflection on counter edge
    ctx.fillStyle = 'rgba(255,220,160,0.18)'; ctx.fillRect(0, top, CW, 2 * u);
    c.ox = M;
    return c;
  }

  /* ---------- near counter (static condiments) ---------- */
  function yunomi(ctx, x, base, rnd) {
    const w = 28 * u, h = 34 * u, r = w * 0.22;
    const style = Math.floor(rnd() * 4);
    const glaze = ['#f3efe6', '#9fc5a8', '#5a3018', '#2b3f6b'][style];
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 8 * u; ctx.shadowOffsetY = 4 * u;
    ctx.beginPath(); ctx.moveTo(x - w / 2, base - h); ctx.lineTo(x - w * 0.46, base); ctx.ellipse(x, base, w * 0.46, r * 0.9, 0, Math.PI, 0, true); ctx.lineTo(x + w / 2, base - h); ctx.closePath();
    ctx.fillStyle = linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, shade(glaze, -0.45)], [0.3, shade(glaze, 0.2)], [0.6, glaze], [1, shade(glaze, -0.55)]]); ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, base - h); ctx.lineTo(x - w * 0.46, base); ctx.ellipse(x, base, w * 0.46, r * 0.9, 0, Math.PI, 0, true); ctx.lineTo(x + w / 2, base - h); ctx.closePath(); ctx.clip();
    if (style === 0) { ['鮪鯛鰤鮭', '鯖鰻蛸鯵', '鰯鰹鱈鮃'].forEach((col, c) => Ink.text(ctx, col, x + w * 0.28 - c * w * 0.28, base - h + 3 * u, 6.2 * u, { D, rnd, color: '#1a1410', bleed: 0.02, dry: 0.2 })); }
    if (style === 2) { ctx.fillStyle = '#d9c8a8'; ctx.beginPath(); ctx.moveTo(x - w, base - h); for (let k = 0; k <= 8; k++) ctx.lineTo(x - w / 2 + k * w / 8, base - h + (6 + (k % 2) * 6 + rnd() * 4) * u); ctx.lineTo(x + w, base - h); ctx.fill(); }
    if (style === 3) { ctx.strokeStyle = 'rgba(230,235,250,0.8)'; ctx.lineWidth = 1 * u; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x - w * 0.15 + k * 6 * u, base - h * 0.45, 4 * u, Math.PI, 0); ctx.stroke(); } }
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x - w * 0.3, base - h + 3 * u, 2 * u, h - 6 * u);
    ctx.restore();
    ellipse(ctx, x, base - h, w / 2, r); ctx.fillStyle = shade(glaze, 0.3); ctx.fill();
    ellipse(ctx, x, base - h + 1.2 * u, w / 2 - 2 * u, r - 1.6 * u); ctx.fillStyle = radial(ctx, x - 3 * u, base - h, w * 0.4, [[0, '#d8c85a'], [1, '#8a7a1e']]); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,230,0.6)'; ellipse(ctx, x - 4 * u, base - h, 4 * u, 1.2 * u); ctx.fill();
    return base - h;
  }
  function teaTap(ctx, x, y) {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 5 * u; ctx.shadowOffsetY = 3 * u;
    roundRect(ctx, x - 13 * u, y, 26 * u, 18 * u, 4 * u); ctx.fillStyle = linear(ctx, x - 13 * u, 0, x + 13 * u, 0, [[0, '#6a6a6a'], [0.35, '#f2f2f2'], [0.7, '#a8a8a8'], [1, '#4a4a4a']]); ctx.fill(); ctx.restore();
    ctx.fillStyle = linear(ctx, x - 4 * u, 0, x + 4 * u, 0, [[0, '#777'], [0.5, '#eee'], [1, '#555']]); ctx.fillRect(x - 3 * u, y + 18 * u, 6 * u, 12 * u);
    ellipse(ctx, x, y + 30 * u, 4 * u, 1.6 * u); ctx.fillStyle = '#333'; ctx.fill();
    roundRect(ctx, x - 7 * u, y + 3 * u, 14 * u, 7 * u, 3 * u); ctx.fillStyle = radial(ctx, x - 2 * u, y + 5 * u, 9 * u, [[0, '#ff7a6a'], [1, '#a0100c']]); ctx.fill();
    Ink.text(ctx, 'お湯', x, y + 14.5 * u, 5.5 * u, { D, vertical: false, align: 'center', color: '#ffffff', bleed: 0.02, dry: 0 });
  }
  function soyBottle(ctx, x, base) {
    const w = 22 * u, h = 44 * u;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 7 * u; ctx.shadowOffsetY = 3 * u;
    ctx.beginPath(); ctx.moveTo(x - w * 0.5, base - h * 0.15);
    ctx.bezierCurveTo(x - w * 0.55, base - h * 0.5, x - w * 0.15, base - h * 0.62, x - w * 0.14, base - h * 0.82);
    ctx.lineTo(x + w * 0.14, base - h * 0.82);
    ctx.bezierCurveTo(x + w * 0.15, base - h * 0.62, x + w * 0.55, base - h * 0.5, x + w * 0.5, base - h * 0.15);
    ctx.quadraticCurveTo(x + w * 0.5, base, x, base); ctx.quadraticCurveTo(x - w * 0.5, base, x - w * 0.5, base - h * 0.15); ctx.closePath();
    ctx.fillStyle = linear(ctx, x - w / 2, 0, x + w / 2, 0, [[0, '#0a0402'], [0.3, '#4a1a08'], [0.55, '#200803'], [1, '#050201']]); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(x - w * 0.32, base - h * 0.15); ctx.quadraticCurveTo(x - w * 0.38, base - h * 0.45, x - w * 0.1, base - h * 0.62); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,180,120,0.3)'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(x + w * 0.35, base - h * 0.12); ctx.quadraticCurveTo(x + w * 0.42, base - h * 0.3, x + w * 0.3, base - h * 0.45); ctx.stroke();
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(x - w * 0.24, base - h * 0.8); ctx.quadraticCurveTo(x - w * 0.24, base - h * 1.02, x, base - h * 1.02); ctx.quadraticCurveTo(x + w * 0.24, base - h * 1.02, x + w * 0.24, base - h * 0.8); ctx.closePath();
    ctx.fillStyle = radial(ctx, x - 2 * u, base - h * 0.95, w * 0.35, [[0, '#ff6a5a'], [1, '#9a0c0c']]); ctx.fill();
    ctx.fillStyle = '#b81414'; ctx.fillRect(x - w * 0.06, base - h * 1.1, w * 0.12, h * 0.1); ctx.fillRect(x + w * 0.1, base - h * 1.06, w * 0.16, h * 0.05);
  }
  function gariBox(ctx, x, base, rnd) {
    const w = 42 * u, h = 16 * u, d = 12 * u;
    ctx.save(); ctx.translate(x, base);
    // open lid behind
    ctx.fillStyle = linear(ctx, 0, -h - d - 18 * u, 0, -h - d, [[0, '#3a1e10'], [1, '#1a0c06']]);
    ctx.beginPath(); ctx.moveTo(-w / 2, -h - d); ctx.lineTo(-w / 2 + 4 * u, -h - d - 18 * u); ctx.lineTo(w / 2 + 4 * u, -h - d - 18 * u); ctx.lineTo(w / 2, -h - d); ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetY = 3 * u;
    ctx.fillStyle = linear(ctx, 0, -h, 0, 0, [[0, '#4a2412'], [1, '#22100a']]); ctx.fillRect(-w / 2, -h, w, h);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#2a140a'; ctx.beginPath(); ctx.moveTo(-w / 2, -h); ctx.lineTo(-w / 2 + 3 * u, -h - d); ctx.lineTo(w / 2 + 3 * u, -h - d); ctx.lineTo(w / 2, -h); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-w / 2 + 2 * u, -h - 1 * u); ctx.lineTo(-w / 2 + 4 * u, -h - d + 1 * u); ctx.lineTo(w / 2 + 1 * u, -h - d + 1 * u); ctx.lineTo(w / 2 - 2 * u, -h - 1 * u); ctx.clip();
    for (let i = 0; i < 26; i++) { ellipse(ctx, -w / 2 + rnd() * w, -h - rnd() * d - 2 * u, 5 * u, 2.5 * u, rnd() * 3); ctx.fillStyle = `rgba(${245 + rnd() * 10},${185 + rnd() * 25},${190 + rnd() * 20},0.9)`; ctx.fill(); ctx.strokeStyle = 'rgba(220,130,140,0.6)'; ctx.lineWidth = 0.5 * u; ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = '#c9a040'; ctx.lineWidth = 1 * u; ctx.strokeRect(-w / 2 + 2 * u, -h + 2 * u, w - 4 * u, h - 4 * u);
    Ink.text(ctx, 'がり', 0, -h + h / 2, 7 * u, { D, rnd, vertical: false, align: 'center', color: '#e9d08a', bleed: 0.02, dry: 0.2 });
    ctx.restore();
  }
  function chopBox(ctx, x, base, rnd) {
    const w = 30 * u, h = 26 * u;
    ctx.save(); ctx.translate(x, base);
    for (let i = 0; i < 8; i++) {
      const sx = -w * 0.35 + i * w * 0.1, ang = -0.12 + rnd() * 0.24, len = 30 * u + rnd() * 8 * u;
      ctx.save(); ctx.translate(sx, -h + 4 * u); ctx.rotate(ang);
      if (i % 3 === 0) { ctx.fillStyle = '#f4efe4'; ctx.fillRect(-2.5 * u, -len, 5 * u, len * 0.8); ctx.fillStyle = '#c0282c'; ctx.fillRect(-2.5 * u, -len * 0.75, 5 * u, 3 * u); }
      else { ctx.fillStyle = linear(ctx, -1.5 * u, 0, 1.5 * u, 0, [[0, '#a8804a'], [0.5, '#f0d8a8'], [1, '#8a6030']]); ctx.fillRect(-1.5 * u, -len, 3 * u, len); }
      ctx.restore();
    }
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetY = 3 * u;
    roundRect(ctx, -w / 2, -h, w, h, 3 * u); ctx.fillStyle = linear(ctx, -w / 2, 0, w / 2, 0, [[0, '#050404'], [0.3, '#2e2a28'], [1, '#050404']]); ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#b81c1c'; ctx.fillRect(-w / 2, -h, w, 3 * u);
    Ink.text(ctx, '箸', 0, -h + 6 * u, 12 * u, { D, rnd, color: '#d9b25a', bleed: 0.03, dry: 0.3 });
    ctx.restore();
  }
  function soyDish(ctx, x, y, rnd) {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetY = 3 * u;
    ellipse(ctx, x, y, 22 * u, 8 * u); ctx.fillStyle = '#f2efe8'; ctx.fill(); ctx.restore();
    ctx.strokeStyle = '#2b55a6'; ctx.lineWidth = 1.2 * u; ellipse(ctx, x, y, 20 * u, 7 * u); ctx.stroke();
    ellipse(ctx, x, y + 0.5 * u, 15 * u, 5 * u); ctx.fillStyle = radial(ctx, x - 4 * u, y - 1 * u, 16 * u, [[0, '#5a2008'], [0.5, '#2a0c03'], [1, '#140501']]); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,200,0.5)'; ellipse(ctx, x - 6 * u, y - 1 * u, 4 * u, 1 * u); ctx.fill();
    ellipse(ctx, x + 9 * u, y - 1 * u, 4.5 * u, 2.5 * u); ctx.fillStyle = radial(ctx, x + 8 * u, y - 2 * u, 5 * u, [[0, '#c6e88a'], [1, '#6a9a2a']]); ctx.fill();
    // chopsticks on rest
    ctx.save(); ctx.translate(x + 30 * u, y + 10 * u); ctx.rotate(-0.2);
    ellipse(ctx, 0, 0, 7 * u, 3 * u); ctx.fillStyle = '#4a7ab8'; ctx.fill();
    ctx.fillStyle = linear(ctx, 0, -2 * u, 0, 2 * u, [[0, '#d8b880'], [1, '#8a6030']]);
    ctx.fillRect(-20 * u, -4 * u, 90 * u, 2.6 * u); ctx.fillRect(-20 * u, 0, 90 * u, 2.6 * u);
    ctx.restore();
  }
  function tablet(ctx, x, y, rnd) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.05);
    roundRect(ctx, -26 * u, -20 * u, 52 * u, 36 * u, 4 * u); ctx.fillStyle = '#111'; ctx.fill();
    ctx.fillStyle = linear(ctx, 0, -17 * u, 0, 13 * u, [[0, '#ffe7c0'], [1, '#f2b46a']]); ctx.fillRect(-23 * u, -17 * u, 46 * u, 30 * u);
    ctx.fillStyle = '#b3221b'; ctx.fillRect(-23 * u, -17 * u, 46 * u, 6 * u);
    Ink.text(ctx, 'ご注文', 0, -14 * u, 4.6 * u, { D, rnd, vertical: false, align: 'center', color: '#ffffff', bleed: 0, dry: 0 });
    for (let i = 0; i < 6; i++) { const s = SushiArt.KINDS[Math.floor(rnd() * 12)]; ctx.save(); SushiArt.food(ctx, s, -15 * u + (i % 3) * 15 * u, -3 * u + Math.floor(i / 3) * 12 * u, 0.2 * u, rnd); ctx.restore(); }
    ctx.restore();
  }
  function buildNearCounter() {
    const CW = W + 2 * M, top = H * 0.795, CH = H - top;
    const [c, ctx] = hiCanvas(CW, CH, D);
    const rnd = mulberry32(99);
    ctx.translate(0, -top);
    ctx.fillStyle = linear(ctx, 0, top, 0, H, [[0, '#d6a670'], [0.4, '#c08c55'], [1, '#8e5e30']]); ctx.fillRect(0, top, CW, CH);
    hGrain(ctx, 0, top, CW, CH, rnd, 'rgba(110,60,20,0.18)', 'rgba(255,240,210,0.12)', 50);
    ctx.fillStyle = linear(ctx, 0, top, 0, top + 14 * u, [[0, 'rgba(0,0,0,0.55)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, top, CW, 14 * u);
    let seat = 0;
    for (let sx = 40 * u; sx < CW - 60 * u; sx += 205 * u, seat++) {
      teaTap(ctx, sx, top - 2 * u);
      // matcha tin
      if (rnd() < 0.7) { const tx = sx + 26 * u, tb = top + 34 * u; ctx.fillStyle = linear(ctx, tx - 7 * u, 0, tx + 7 * u, 0, [[0, '#0a0a0a'], [0.4, '#3a3a3a'], [1, '#050505']]); ctx.fillRect(tx - 7 * u, tb - 18 * u, 14 * u, 18 * u); ctx.fillStyle = '#4a8a3a'; ctx.fillRect(tx - 7 * u, tb - 13 * u, 14 * u, 7 * u); ellipse(ctx, tx, tb - 18 * u, 7 * u, 2.5 * u); ctx.fillStyle = '#555'; ctx.fill(); }
      const ct = yunomi(ctx, sx - 4 * u, top + 80 * u, rnd);
      steamSpots.push({ x: sx - 4 * u, y: ct, ph: rnd() * 10 });
      soyBottle(ctx, sx + 52 * u, top + 70 * u);
      if (seat % 2 === 0) gariBox(ctx, sx + 104 * u, top + 62 * u, rnd); else tablet(ctx, sx + 104 * u, top + 40 * u, rnd);
      chopBox(ctx, sx + 158 * u, top + 72 * u, rnd);
      soyDish(ctx, sx + 70 * u, top + 118 * u, rnd);
    }
    return c;
  }

  /* ---------- diners ---------- */
  function buildFg(right) {
    const w = 360 * u, h = 300 * u;
    const [c, ctx] = hiCanvas(w, h, D);
    ctx.filter = `blur(${1.6 * u * D}px)`;
    const cx = w / 2, hy = h * 0.4, hr = right ? 50 * u : 55 * u, body = right ? '#1a0e10' : '#0c0d14', hair = '#0a0605';
    // shoulders seen from behind: neck -> trapezius slope -> deltoid caps -> upper arms
    ctx.beginPath(); ctx.moveTo(cx - hr * 0.36, hy + hr * 0.7);
    ctx.bezierCurveTo(cx - hr * 0.5, hy + hr * 1.05, cx - 110 * u, h * 0.6, cx - 150 * u, h * 0.66);
    ctx.bezierCurveTo(cx - 182 * u, h * 0.7, cx - 185 * u, h * 0.86, cx - 178 * u, h);
    ctx.lineTo(cx + 178 * u, h); ctx.bezierCurveTo(cx + 185 * u, h * 0.86, cx + 182 * u, h * 0.7, cx + 150 * u, h * 0.66);
    ctx.bezierCurveTo(cx + 110 * u, h * 0.6, cx + hr * 0.5, hy + hr * 1.05, cx + hr * 0.36, hy + hr * 0.7); ctx.closePath();
    ctx.fillStyle = body; ctx.fill();
    // collar / shirt seam and shoulder-blade folds
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(cx - hr * 0.5, hy + hr * 1.1); ctx.quadraticCurveTo(cx, hy + hr * 1.3, cx + hr * 0.5, hy + hr * 1.1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 90 * u, h * 0.78); ctx.quadraticCurveTo(cx - 60 * u, h * 0.86, cx - 70 * u, h); ctx.moveTo(cx + 90 * u, h * 0.78); ctx.quadraticCurveTo(cx + 60 * u, h * 0.86, cx + 70 * u, h); ctx.stroke();
    // nape of the neck (skin in shadow)
    ctx.fillStyle = '#1e120c'; ctx.beginPath(); ctx.moveTo(cx - hr * 0.38, hy + hr * 0.4); ctx.lineTo(cx - hr * 0.42, hy + hr * 1.08); ctx.quadraticCurveTo(cx, hy + hr * 1.2, cx + hr * 0.42, hy + hr * 1.08); ctx.lineTo(cx + hr * 0.38, hy + hr * 0.4); ctx.closePath(); ctx.fill();
    // ears
    [-1, 1].forEach((d) => { ellipse(ctx, cx + d * hr * 0.88, hy + hr * 0.14, hr * 0.08, hr * 0.17, d * 0.25); ctx.fillStyle = '#20140e'; ctx.fill(); });
    // skull from behind with hair mass, nape hairline and crown whorl
    ctx.beginPath(); ctx.moveTo(cx, hy - hr); ctx.bezierCurveTo(cx + hr * 0.75, hy - hr, cx + hr * 0.98, hy - hr * 0.4, cx + hr * 0.9, hy + hr * 0.25); ctx.bezierCurveTo(cx + hr * 0.82, hy + hr * 0.6, cx + hr * 0.5, hy + hr * 0.72, cx, hy + hr * 0.62);
    ctx.bezierCurveTo(cx - hr * 0.5, hy + hr * 0.72, cx - hr * 0.82, hy + hr * 0.6, cx - hr * 0.9, hy + hr * 0.25); ctx.bezierCurveTo(cx - hr * 0.98, hy - hr * 0.4, cx - hr * 0.75, hy - hr, cx, hy - hr); ctx.closePath(); ctx.fillStyle = hair; ctx.fill();
    if (right) { ctx.beginPath(); ctx.ellipse(cx + 4 * u, hy - hr * 0.9, hr * 0.4, hr * 0.33, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#c9a040'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(cx - 28 * u, hy - hr * 1.05); ctx.lineTo(cx + 46 * u, hy - hr * 0.75); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(120,90,60,0.12)'; ctx.lineWidth = 1.2 * u; for (let k = 0; k < 14; k++) { const a = -2.6 + k * 0.4; ctx.beginPath(); ctx.moveTo(cx + 6 * u, hy - hr * 0.55); ctx.quadraticCurveTo(cx + Math.cos(a) * hr * 0.6, hy - hr * 0.3 + Math.sin(a) * hr * 0.4, cx + Math.cos(a + 0.4) * hr * 0.9, hy + Math.sin(a + 0.4) * hr * 0.8); ctx.stroke(); }
    // rim light
    ctx.globalCompositeOperation = 'source-atop';
    const lx = right ? cx - hr * 0.9 : cx + hr * 0.9;
    ctx.fillStyle = radial(ctx, lx, hy - hr * 0.5, hr * 1.1, [[0, 'rgba(255,160,80,0.55)'], [0.4, 'rgba(255,130,60,0.15)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = radial(ctx, right ? cx - 140 * u : cx + 140 * u, h * 0.66, 90 * u, [[0, 'rgba(255,150,70,0.35)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(0, 0, w, h);
    return c;
  }
  function buildFarDiner(seed) {
    const rnd = mulberry32(seed);
    const w = 90 * u, h = 110 * u;
    const [c, ctx] = hiCanvas(w, h, D);
    const cx = w / 2, hy = 34 * u, hr = 15 * u + rnd() * 3 * u;
    const shirt = pick2(rnd, ['#3a2a4a', '#2a3a4a', '#4a2a22', '#2a4a3a', '#5a4a3a', '#6a2030']);
    ctx.beginPath(); ctx.moveTo(cx - 40 * u, h); ctx.bezierCurveTo(cx - 40 * u, hy + 34 * u, cx - 20 * u, hy + 24 * u, cx, hy + 24 * u); ctx.bezierCurveTo(cx + 20 * u, hy + 24 * u, cx + 40 * u, hy + 34 * u, cx + 40 * u, h); ctx.closePath();
    ctx.fillStyle = linear(ctx, 0, hy + 20 * u, 0, h, [[0, shade(shirt, 0.1)], [1, shade(shirt, -0.6)]]); ctx.fill();
    ctx.fillStyle = '#b07a52'; ctx.fillRect(cx - 5 * u, hy + 12 * u, 10 * u, 14 * u);
    ellipse(ctx, cx, hy, hr * 0.85, hr); ctx.fillStyle = radial(ctx, cx - 3 * u, hy, hr * 1.2, [[0, '#e0aa80'], [1, '#8a5a3a']]); ctx.fill();
    const hair = pick2(rnd, ['#1a1210', '#3a2418', '#0a0a0a', '#6a6a6a']);
    ctx.beginPath(); ctx.ellipse(cx, hy - hr * 0.2, hr * 0.92, hr * 0.9, 0, Math.PI * 0.95, Math.PI * 2.05); ctx.fillStyle = hair; ctx.fill();
    if (rnd() < 0.4) { ctx.fillRect(cx - hr * 0.92, hy - hr * 0.2, hr * 0.3, hr * 1.4); ctx.fillRect(cx + hr * 0.62, hy - hr * 0.2, hr * 0.3, hr * 1.4); }
    ctx.fillStyle = '#2a1a10'; [-1, 1].forEach((s) => { ellipse(ctx, cx + s * hr * 0.32, hy + 1 * u, 1.4 * u, 1 * u); ctx.fill(); });
    ctx.strokeStyle = '#7a3a2a'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.arc(cx, hy + 5 * u, 3.5 * u, 0.3, Math.PI - 0.3); ctx.stroke();
    ctx.fillStyle = 'rgba(255,140,60,0.18)'; ctx.fillRect(0, 0, w, h);
    return c;
  }

  /* ---------- per-frame elements ---------- */
  function drawNoren(ctx, x0, y0, totalW, len, t) {
    const n = 4, gap = 3 * u, pw = (totalW - gap * (n - 1)) / n;
    const disp = (yy, ph) => Math.sin(t * 1.1 + yy * 0.012 / u + ph) * 7 * u * Math.pow(yy / len, 1.4) + Math.sin(t * 2.3 + ph * 2 + yy * 0.03 / u) * 1.6 * u * (yy / len);
    for (let i = 0; i < n; i++) {
      const px = x0 + i * (pw + gap), ph = i * 1.3;
      ctx.save();
      ctx.beginPath(); ctx.moveTo(px, y0); ctx.lineTo(px + pw, y0);
      for (let s = 1; s <= 12; s++) { const yy = len * s / 12; ctx.lineTo(px + pw + disp(yy, ph) * 0.9, y0 + yy); }
      for (let s = 1; s <= 10; s++) { const xx = px + pw - pw * s / 10; ctx.lineTo(xx + disp(len, ph), y0 + len + Math.sin(t * 1.6 + s * 0.7 + ph) * 2 * u); }
      for (let s = 12; s >= 0; s--) { const yy = len * s / 12; ctx.lineTo(px + disp(yy, ph), y0 + yy); }
      ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 10 * u; ctx.shadowOffsetY = 5 * u;
      ctx.fillStyle = linear(ctx, 0, y0, 0, y0 + len, [[0, '#243a72'], [0.85, '#1a2a56'], [0.86, '#101a38'], [1, '#0c1430']]); ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.clip();
      const g = ctx.createLinearGradient(px - 6 * u, 0, px + pw + 6 * u, 0);
      for (let k = 0; k <= 6; k++) { const v = Math.sin(t * 1.2 + k * 1.7 + ph); g.addColorStop(k / 6, v > 0 ? `rgba(160,190,255,${v * 0.13})` : `rgba(0,0,10,${-v * 0.3})`); }
      ctx.fillStyle = g; ctx.fillRect(px - 10 * u, y0, pw + 20 * u, len + 10 * u);
      // brushed character for this panel (回 転 寿 司)
      const ed = disp(len * 0.5, ph), ch = norenChars[i];
      if (ch) ctx.drawImage(ch, px + pw / 2 - ch.cssW / 2 + ed, y0 + len * 0.52 - ch.cssH / 2, ch.cssW, ch.cssH);
      // small crest near the top
      ellipse(ctx, px + pw / 2 + disp(len * 0.12, ph), y0 + len * 0.13, pw * 0.09, pw * 0.09); ctx.strokeStyle = 'rgba(240,232,214,0.7)'; ctx.lineWidth = 1.2 * u; ctx.stroke();
      // weave texture lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
      for (let yy = 4 * u; yy < len; yy += 4 * u) { ctx.beginPath(); ctx.moveTo(px - 10 * u, y0 + yy); ctx.lineTo(px + pw + 10 * u, y0 + yy); ctx.stroke(); }
      ctx.restore();
    }
    // bamboo rod
    ctx.fillStyle = linear(ctx, 0, y0 - 5 * u, 0, y0 + 3 * u, [[0, '#e6d29a'], [0.5, '#a88a4a'], [1, '#5a4a20']]);
    ctx.fillRect(x0 - 14 * u, y0 - 5 * u, totalW + 28 * u, 8 * u);
    for (let x = x0 - 10 * u; x < x0 + totalW + 14 * u; x += 42 * u) { ctx.fillStyle = 'rgba(70,50,10,0.6)'; ctx.fillRect(x, y0 - 5 * u, 2 * u, 8 * u); }
  }
  function buildEmblem(len) {
    const r = len * 0.3; const [c, ctx] = hiCanvas(r * 2 + 4, r * 2 + 4, D);
    const cx = r + 2;
    ellipse(ctx, cx, cx, r, r); ctx.fillStyle = '#efe7d2'; ctx.fill();
    ellipse(ctx, cx, cx, r * 0.84, r * 0.84); ctx.strokeStyle = '#1f3266'; ctx.lineWidth = r * 0.06; ctx.stroke();
    drawGlyph(ctx, cx - r * 0.55, cx - r * 0.55, r * 1.1, mulberry32(888), '#1f3266', 0.13);
    return c;
  }
  function drawManeki(ctx, x, base, t) {
    const s = u;
    ctx.save(); ctx.translate(x, base);
    ellipse(ctx, 0, -16 * s, 15 * s, 17 * s); ctx.fillStyle = radial(ctx, -5 * s, -22 * s, 22 * s, [[0, '#ffffff'], [1, '#cfc6b8']]); ctx.fill();
    ellipse(ctx, 0, -40 * s, 13 * s, 11.5 * s); ctx.fill();
    [-1, 1].forEach((d) => { ctx.beginPath(); ctx.moveTo(d * 11 * s, -46 * s); ctx.lineTo(d * 9 * s, -56 * s); ctx.lineTo(d * 3 * s, -50 * s); ctx.fillStyle = '#f2ece2'; ctx.fill(); ctx.beginPath(); ctx.moveTo(d * 9.5 * s, -47 * s); ctx.lineTo(d * 8.6 * s, -53 * s); ctx.lineTo(d * 5 * s, -50 * s); ctx.fillStyle = '#f2a0a8'; ctx.fill(); });
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1.2 * s; [-1, 1].forEach((d) => { ctx.beginPath(); ctx.arc(d * 5 * s, -41 * s, 2.2 * s, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); });
    ctx.fillStyle = '#e88'; ellipse(ctx, 0, -37 * s, 1.5 * s, 1 * s); ctx.fill();
    ctx.fillStyle = '#c0282c'; ctx.fillRect(-11 * s, -31 * s, 22 * s, 3 * s);
    ellipse(ctx, 0, -27 * s, 3 * s, 3 * s); ctx.fillStyle = '#e8c04a'; ctx.fill();
    ctx.fillStyle = '#e8b040'; roundRect(ctx, -7 * s, -18 * s, 14 * s, 9 * s, 2 * s); ctx.fill(); if (manekiTxt) ctx.drawImage(manekiTxt, -manekiTxt.cssW / 2, -18.5 * s, manekiTxt.cssW, manekiTxt.cssH);
    ctx.save(); ctx.translate(10 * s, -30 * s); ctx.rotate(-0.4 + Math.sin(t * 3.2) * 0.45);
    roundRect(ctx, -4 * s, -16 * s, 8 * s, 18 * s, 4 * s); ctx.fillStyle = '#f6f2ea'; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 0.6 * s; ctx.stroke();
    ctx.restore();
    ctx.restore();
  }
  // itamae: a real proportioned person (kappogi, hachimaki); body drawn behind the counter, arms over it
  let chefP = null;
  const yanagiba = (slice) => (c, x, y, ang) => { c.save(); c.translate(x, y); c.rotate(Math.PI + 0.05 + slice * 0.04 - ang + 2.6 - Math.PI + Math.PI);
    c.fillStyle = '#3a2416'; roundRect(c, -8, -1.1, 9, 2.2, 1); c.fill(); c.fillStyle = '#111'; c.fillRect(0.6, -1.2, 1.4, 2.4);
    c.beginPath(); c.moveTo(2, -1.2); c.lineTo(30, -0.5); c.lineTo(32, 0.3); c.lineTo(2, 1.3); c.closePath(); c.fillStyle = linear(c, 0, -1.2, 0, 1.3, [[0, '#f8f8f8'], [0.5, '#a8b0b8'], [1, '#606870']]); c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 0.3; c.beginPath(); c.moveTo(3, 1.1); c.lineTo(31, 0.3); c.stroke(); c.restore(); };
  const fishBlock = (c, x, y) => { c.save(); c.translate(x, y); c.fillStyle = '#e8584a'; roundRect(c, -2, -2, 12, 5, 1.5); c.fill(); c.strokeStyle = 'rgba(255,230,220,0.7)'; c.lineWidth = 0.4; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(k * 3, -2); c.quadraticCurveTo(k * 3 + 1.4, 0.5, k * 3, 3); c.stroke(); } c.restore(); };
  function chefPose(t, pulse) {
    const slice = Math.sin(t * 2.4), lift = Math.max(0, Math.sin(t * 2.4 + 1.2)) * 1.6;
    return { slice, ps: { breath: Math.sin(t * 1.8), face: { blink: People.blinkAt(t, 7), mouth: Math.sin(t * 0.3) > 0.6 ? 'big' : 'smile', lookY: 1, lookX: 0.3 }, head: { nod: 1.4 + pulse, tilt: Math.sin(t * 1.1) * 0.04, turn: 0.15 },
      arms: [{ side: -1, x: -17, y: 28.5, grip: 'open', handAng: 0.25, behind: (c, x, y) => fishBlock(c, x + 4, y + 1.5) }, { side: 1, x: 13 + slice * 5, y: 27.5 - lift, grip: 'fist', item: yanagiba(slice), handAng: 2.6 }] } };
  }
  function drawChef(ctx, cx, t, pulse) { const { ps } = chefPose(t, pulse); ps.noArms = true; People.draw(ctx, chefP, cx, H * 0.415 + Math.sin(t * 2.2) * 0.8 * u, ps); }
  function drawChefArms(ctx, cx, t) { const { ps } = chefPose(t, 0); ps.only = 'arms'; People.draw(ctx, chefP, cx, H * 0.415 + Math.sin(t * 2.2) * 0.8 * u, ps); }
  // far diners: real people seated behind the far belt, chatting, sipping tea, eyeing plates as they pass
  function drawFarDiner(ctx, d, fx, t, i) {
    const lift = i === 2 ? Math.max(0, Math.sin(t * 0.6 + 1)) : 0, talk = i === 1 && Math.sin(t * 0.7) > 0.2;
    const ps = { breath: Math.sin(t * 1.6 + i), face: { blink: People.blinkAt(t, 30 + i), mouth: talk ? 'talk' : lift > 0.8 ? 'o' : 'smile', open: talk ? Math.abs(Math.sin(t * 8)) * 0.6 : 0.2, lookY: 0.4, lookX: Math.sin(t * 0.4 + d.ph) },
      head: { turn: Math.sin(t * 0.35 + d.ph) * 0.6, tilt: Math.sin(t * 0.5 + d.ph) * 0.05, nod: lift * 0.6 },
      arms: i === 2 ? [{ side: -1, x: -10, y: 44, grip: 'open' }, { side: 1, x: lerp(14, 5, lift), y: lerp(44, -2, lift), grip: 'fist', item: Items.teacup }] : i === 1 ? [{ side: -1, x: -12, y: 44, grip: 'open' }, { side: 1, x: 18 + Math.sin(t * 2) * 3, y: 26 + Math.cos(t * 3) * 3, grip: 'open' }] : [{ side: -1, x: -12, y: 44, grip: 'open' }, { side: 1, x: 12, y: 44, grip: 'fist', item: Items.chopsticks }] };
    People.draw(ctx, d.P, fx, H * 0.455 + 52 * u + Math.sin(t * 0.9 + d.ph) * 1.2 * u, ps);
  }
  function drawSteam(ctx, x, y, t, ph, sc) {
    ctx.save(); ctx.lineCap = 'round';
    for (let w = 0; w < 3; w++) {
      const N = 18, step = 3.2 * u * sc, amp = 5 * u * sc;
      let px = x + (w - 1) * 5 * u * sc, py = y;
      for (let k = 1; k <= N; k++) {
        const kk = k / N;
        const nx = x + (w - 1) * 5 * u * sc + Math.sin(k * 0.38 - t * 2.2 + ph + w * 2) * amp * kk + Math.sin(t * 0.7 + w + ph) * 4 * u * kk;
        const ny = y - k * step;
        const a = Math.sin(kk * Math.PI) * 0.16 * (0.7 + 0.3 * Math.sin(t * 1.3 + w + ph));
        ctx.strokeStyle = `rgba(255,248,240,${a})`; ctx.lineWidth = (2.5 + kk * 5) * u * sc;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx, ny); ctx.stroke();
        px = nx; py = ny;
      }
    }
    ctx.restore();
  }
  function drawBelt(ctx, yTop, yBot, faceH, s, off, ox) {
    const x0 = -M + ox - 40 * u, x1 = W + M + ox + 40 * u;
    const sw = 30 * s * u;
    ctx.fillStyle = linear(ctx, 0, yTop - 6 * s * u, 0, yTop, [[0, '#f2f2f2'], [0.4, '#9a9a9a'], [1, '#3a3a3a']]); ctx.fillRect(x0, yTop - 6 * s * u, x1 - x0, 6 * s * u);
    ctx.fillStyle = linear(ctx, 0, yTop, 0, yBot, [[0, '#a69e8c'], [1, '#d8d0bf']]); ctx.fillRect(x0, yTop, x1 - x0, yBot - yTop);
    const o = ((off % sw) + sw) % sw, mid = (yTop + yBot) / 2;
    const grad = linear(ctx, 0, yTop, 0, yBot, [[0, '#d9d2c2'], [0.5, '#f4efe4'], [1, '#c8c0ae']]);
    ctx.lineWidth = 1 * u;
    for (let xk = x0 - sw + o; xk < x1; xk += sw) {
      ctx.beginPath(); ctx.moveTo(xk, yTop); ctx.lineTo(xk + sw, yTop);
      ctx.quadraticCurveTo(xk + sw + sw * 0.3, mid, xk + sw, yBot); ctx.lineTo(xk, yBot);
      ctx.quadraticCurveTo(xk + sw * 0.3, mid, xk, yTop); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = 'rgba(70,60,45,0.55)'; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.moveTo(xk + sw + 1.2 * u, yTop + 2 * u); ctx.quadraticCurveTo(xk + sw + sw * 0.3 + 1.2 * u, mid, xk + sw + 1.2 * u, yBot - 2 * u); ctx.stroke();
    }
    ctx.fillStyle = linear(ctx, 0, yTop, 0, yTop + (yBot - yTop) * 0.4, [[0, 'rgba(0,0,0,0.35)'], [1, 'rgba(0,0,0,0)']]); ctx.fillRect(x0, yTop, x1 - x0, (yBot - yTop) * 0.4);
    // front rail face with chain
    ctx.fillStyle = linear(ctx, 0, yBot, 0, yBot + faceH, [[0, '#fafafa'], [0.12, '#c4c4c4'], [0.5, '#707070'], [0.85, '#a0a0a0'], [1, '#2a2a2a']]); ctx.fillRect(x0, yBot, x1 - x0, faceH);
    const st = yBot + faceH * 0.3, sh = faceH * 0.42;
    ctx.fillStyle = '#141414'; ctx.fillRect(x0, st, x1 - x0, sh);
    const p = sw / 2; let j = 0;
    for (let lx = x0 - sw + o; lx < x1; lx += p, j++) {
      roundRect(ctx, lx + p * 0.06, st + sh * 0.12, p * 0.88 + p * 0.25, sh * 0.76, sh * 0.35);
      ctx.fillStyle = j % 2 ? '#8a8a8a' : '#5e5e5e'; ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = 0.8 * u; ctx.stroke();
      ellipse(ctx, lx + p * 0.18, st + sh / 2, sh * 0.2, sh * 0.2); ctx.fillStyle = '#cfcfcf'; ctx.fill();
      ellipse(ctx, lx + p * 0.15, st + sh * 0.44, sh * 0.07, sh * 0.07); ctx.fillStyle = '#fff'; ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(x0, yBot, x1 - x0, 1 * u);
  }
  function drawItems(ctx, items, sprites, yS, ox) {
    for (const it of items) {
      const sp = sprites[it.si];
      const x = -M + ox + it.p;
      if (x < -sp.w || x > W + sp.w) continue;
      ctx.drawImage(sp.c, x - sp.ax, yS - sp.ay, sp.w, sp.h);
    }
  }
  function initItems(items, spacing, L, nSprites) {
    items.length = 0;
    let p = 0;
    while (p < L) { items.push({ p, si: Math.floor(Math.random() * nSprites) }); p += spacing * (0.8 + Math.random() * 0.8); }
  }
  function moveItems(items, dx, L, nSprites) {
    for (const it of items) {
      it.p += dx;
      if (it.p > L) { it.p -= L; it.si = Math.floor(Math.random() * nSprites); }
      if (it.p < 0) { it.p += L; it.si = Math.floor(Math.random() * nSprites); }
    }
  }

  /* express order lane: a little shinkansen delivers special orders */
  let expressSprite = 0;
  function drawExpress(ctx, t, ox) {
    const yR = H * 0.672, s = u;
    // rail
    ctx.fillStyle = linear(ctx, 0, yR, 0, yR + 9 * s, [[0, '#e8e8e8'], [0.4, '#8a8a8a'], [1, '#2a2a2a']]); ctx.fillRect(-10, yR, W + 20, 9 * s);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(-10, yR, W + 20, 1 * s);
    for (let x = ((ox % (40 * s)) + 40 * s) % (40 * s) - 40 * s; x < W + 40 * s; x += 40 * s) { ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x, yR + 2 * s, 2 * s, 7 * s); }
    const cyc = t % 16; if (cyc > 3.2) { if (cyc > 15.9) expressSprite = Math.floor(Math.random() * nearSprites.length); return; }
    const k = cyc / 3.2, e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const x = lerp(W + 260 * s, -320 * s, e), y = yR;
    ctx.save(); ctx.translate(x, y);
    // carriage (flat car with plate)
    ctx.fillStyle = linear(ctx, 0, -14 * s, 0, 0, [[0, '#ffffff'], [1, '#c8ccd2']]); roundRect(ctx, 60 * s, -12 * s, 110 * s, 12 * s, 3 * s); ctx.fill();
    ctx.fillStyle = '#1f4fa8'; ctx.fillRect(60 * s, -5 * s, 110 * s, 2.5 * s);
    const sp = nearSprites[expressSprite % nearSprites.length];
    if (sp) ctx.drawImage(sp.c, 115 * s - sp.ax * 0.8, -12 * s - sp.ay * 0.8, sp.w * 0.8, sp.h * 0.8);
    // locomotive with long nose
    ctx.beginPath(); ctx.moveTo(-2 * s, 0); ctx.bezierCurveTo(-4 * s, -14 * s, 18 * s, -26 * s, 48 * s, -27 * s); ctx.lineTo(58 * s, -27 * s); ctx.lineTo(58 * s, 0); ctx.closePath();
    ctx.fillStyle = linear(ctx, 0, -27 * s, 0, 0, [[0, '#ffffff'], [0.6, '#eef0f4'], [1, '#b8bec8']]); ctx.fill();
    ctx.fillStyle = '#1f4fa8'; ctx.beginPath(); ctx.moveTo(6 * s, -6 * s); ctx.lineTo(58 * s, -8 * s); ctx.lineTo(58 * s, -4.5 * s); ctx.lineTo(4 * s, -3 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = linear(ctx, 20 * s, -24 * s, 40 * s, -16 * s, [[0, '#0b1830'], [1, '#2a4a80']]);
    ctx.beginPath(); ctx.moveTo(22 * s, -17 * s); ctx.quadraticCurveTo(30 * s, -25 * s, 44 * s, -25 * s); ctx.lineTo(44 * s, -18 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(30 * s, -23 * s, 8 * s, 1 * s);
    ctx.fillStyle = '#fff6c0'; ellipse(ctx, 4 * s, -5 * s, 2.2 * s, 1.5 * s); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = linear(ctx, x + 170 * s, 0, x + 320 * s, 0, [[0, 'rgba(255,220,160,0.25)'], [1, 'rgba(255,220,160,0)']]); ctx.fillRect(x + 170 * s, y - 14 * s, 150 * s, 10 * s);
    ctx.restore();
  }

  let beltL = 0, lastW = 0, lastH = 0;
  function resize(w, h, d) {
    if (w === lastW && h === lastH && d === D) return;
    lastW = w; lastH = h;
    W = w; H = h; D = d; u = H / 800; M = 50 * u;
    steamSpots = [];
    wall = buildWall();
    chefCounter = buildChefCounter();
    nearCounter = buildNearCounter();
    emblem = buildEmblem(H * 0.2);
    manekiTxt = Ink.sprite('千万両', 3.4 * u, { D, rnd: mulberry32(9), color: '#6a1a0a', vertical: false, bleed: 0.02, dry: 0 });
    norenChars = [...'回転寿司'].map((c, k) => Ink.sprite(c, H * 0.085, { D, rnd: mulberry32(70 + k), color: '#f3ecdc', bleed: 0.05, dry: 1.2, heavy: true }));
    fgLeft = buildFg(false); fgRight = buildFg(true);
    chefP = People.make({ skin: 'light', hair: 'black', hairStyle: 'short', top: { type: 'kappogi', col: '#f6f0e4' }, sleeves: 'long', acc: { hat: 'hachimaki' }, eyes: '#2a1a10', seed: 4242 }, 2.15 * u, D);
    const dl = [{ female: true, lashes: true, skin: 'light', hair: 'dbrown', hairStyle: 'bob', top: { type: 'blouse', col: '#c8d8e8' }, lips: '#b8505a', acc: { earrings: '#e8c050' } },
      { skin: 'light', hair: 'black', hairStyle: 'side', top: { type: 'suit', col: '#2a2e3a', tie: '#7a1a22' }, sleeves: 'long', acc: { glasses: '#2a2a2a' } },
      { skin: 'pale', hair: 'grey', hairStyle: 'short', age: 'old', top: { type: 'cardigan', col: '#7a5a3a', shirt: '#e8e0d0' }, sleeves: 'long' },
      { female: true, lashes: true, skin: 'tan', hair: 'black', hairStyle: 'long', top: { type: 'sweater', col: '#a83a4a' }, sleeves: 'long', lips: '#a8404a' }];
    farDiners = [0, 1, 2, 3].map((i) => ({ P: People.make(Object.assign({ seed: 900 + i }, dl[i]), 1.62 * u, D), x: [0.715, 0.795, 0.87, 0.945][i], ph: i * 1.7 }));
    lanterns = [[0.055, 0.1, 1.0, true], [0.19, 0.06, 0.82, false], [0.33, 0.13, 1.05, true], [0.67, 0.12, 1.0, true], [0.81, 0.05, 0.85, false], [0.95, 0.1, 1.0, true]]
      .map(([x, len, s, red], i) => ({ x, len: len * H, s, sp: buildLantern(s, red, 300 + i), ph: i * 1.9, red }));
    nearSprites = []; farSprites = [];
    const K = SushiArt.KINDS;
    for (let i = 0; i < 26; i++) {
      const kind = K[i % K.length], pl = Math.floor(Math.random() * SushiArt.PLATES.length), cov = Math.random() < 0.28;
      nearSprites.push(SushiArt.sprite(kind, pl, cov, 34 * u, D, 1000 + i));
      farSprites.push(SushiArt.sprite(K[(i * 7) % K.length], (pl + 3) % SushiArt.PLATES.length, Math.random() < 0.2, 21 * u, D, 2000 + i));
    }
    beltL = W + 2 * M + 100 * u;
    initItems(nearItems, 105 * u, beltL, nearSprites.length);
    initItems(farItems, 70 * u, beltL, farSprites.length);
    vignette = (() => { const [c, x] = hiCanvas(W, H, 1); const g = x.createRadialGradient(W / 2, H * 0.48, H * 0.3, W / 2, H * 0.5, Math.max(W, H) * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,3,0,0.6)'); x.fillStyle = g; x.fillRect(0, 0, W, H); return c; })();
    motes = []; for (let i = 0; i < 90; i++) motes.push({ x: Math.random() * W, y: Math.random() * H, vx: rand(-4, 4), vy: rand(-8, -2), r: rand(0.6, 2.2), ph: rand(10) });
  }
  function draw(ctx, t, dt, env) {
    const cam = Math.sin(t * 0.06) * 14 * u + (env.mx || 0) * 22 * u;
    const P = (depth) => -cam * depth;
    // 1. wall
    const wx = -M + P(0.15);
    ctx.drawImage(wall, wx, 0, wall.cssW, wall.cssH);
    // noren in doorway
    drawNoren(ctx, wx + M + X(0.035), H * 0.302, X(0.29) - X(0.035), H * 0.178, t);
    drawManeki(ctx, wx + M + X(0.955), H * 0.43, t);
    // 2. far diners (right), behind far belt
    farDiners.forEach((d, i) => {
      const bob = Math.sin(t * 0.9 + d.ph) * 1.5 * u + (i === 1 ? Math.max(0, Math.sin(t * 0.5)) * -3 * u : 0);
      const fx = X(d.x) + P(0.5);
      drawFarDiner(ctx, d, fx, t, i);
    });
    // 3. lanterns
    lanterns.forEach((L) => {
      const lx = X(L.x) + P(0.3);
      const ang = Math.sin(t * 0.7 + L.ph) * 0.05 + Math.sin(t * 1.9 + L.ph) * 0.012;
      ctx.save(); ctx.translate(lx, 0); ctx.rotate(ang);
      ctx.strokeStyle = '#140a05'; ctx.lineWidth = 1.5 * u; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L.len); ctx.stroke();
      ctx.drawImage(L.sp.c, -L.sp.cx, L.len, L.sp.w, L.sp.h);
      ctx.restore();
      L.gx = lx + Math.sin(ang) * -(L.len + L.sp.cyOff); L.gy = Math.cos(ang) * (L.len + L.sp.cyOff);
    });
    // 4. chef + counter
    const co = P(0.45);
    const chefX = X(0.175) + co;
    drawChef(ctx, chefX, t, env.pulse);
    ctx.drawImage(chefCounter, -M + co, 0, chefCounter.cssW, chefCounter.cssH);
    drawChefArms(ctx, chefX, t);
    drawSteam(ctx, X(0.27) + co, H * 0.47, t, 3, 1.3);
    // 5. far belt
    const farSpeed = 20 * u * (env.speed || 1), nearSpeed = 32 * u * (env.speed || 1);
    farOff -= farSpeed * dt; nearOff += nearSpeed * dt;
    moveItems(farItems, -farSpeed * dt, beltL, farSprites.length);
    moveItems(nearItems, nearSpeed * dt, beltL, nearSprites.length);
    const fo = P(0.55);
    ctx.fillStyle = linear(ctx, 0, H * 0.565, 0, H * 0.585, [[0, '#c99a62'], [1, '#7a4a20']]); ctx.fillRect(X(0.34) + fo, H * 0.57, W, H * 0.015);
    drawBelt(ctx, H * 0.585, H * 0.613, H * 0.022, 0.62, farOff, fo);
    drawItems(ctx, farItems, farSprites, H * 0.601, fo);
    ctx.fillStyle = linear(ctx, 0, H * 0.635, 0, H * 0.7, [[0, '#24120a'], [1, '#3a2010']]); ctx.fillRect(-10, H * 0.635, W + 20, H * 0.067);
    drawExpress(ctx, t, P(0.7));
    // 6. near belt
    const no = P(0.85);
    drawBelt(ctx, H * 0.705, H * 0.765, H * 0.034, 1, nearOff, no);
    drawItems(ctx, nearItems, nearSprites, H * 0.738, no);
    // 7. near counter
    const nc = P(0.95);
    ctx.drawImage(nearCounter, -M + nc, H * 0.795, nearCounter.cssW, nearCounter.cssH);
    steamSpots.forEach((sp) => drawSteam(ctx, -M + nc + sp.x, sp.y, t, sp.ph, 1));
    // 8. foreground diners
    const fg = P(1.25);
    ctx.drawImage(fgLeft, X(0.06) - fgLeft.cssW / 2 + fg, H - fgLeft.cssH + 40 * u + Math.sin(t * 0.8) * 2 * u, fgLeft.cssW, fgLeft.cssH);
    ctx.drawImage(fgRight, X(0.95) - fgRight.cssW / 2 + fg, H - fgRight.cssH + 50 * u + Math.sin(t * 0.7 + 2) * 2 * u, fgRight.cssW, fgRight.cssH);
    // reaching arm (left diner grabs a plate now and then)
    const cyc = (t % 11) / 11; const reach = cyc < 0.25 ? smooth(cyc / 0.25) : cyc < 0.4 ? 1 : cyc < 0.6 ? 1 - smooth((cyc - 0.4) / 0.2) : 0;
    if (reach > 0.01) {
      const ax = X(0.06) + 70 * u + fg, ay = H * 1.0;
      const ex = ax + 40 * u + reach * 30 * u, ey = ay - 50 * u - reach * 40 * u;
      const hx = ax + 30 * u + reach * 85 * u, hy = ay - 60 * u - reach * 120 * u;
      const k = 4.4 * u; ctx.save(); ctx.translate(ax, ay); ctx.scale(k, k);
      const e = [(ex - ax) / k, (ey - ay) / k], hd = [(hx - ax) / k, (hy - ay) / k];
      ctx.globalAlpha = 0.35; People.chain(ctx, [[0, 0], e, hd], [[[0, 4.6], [1, 3.9]], [[0, 3.9], [0.8, 3.2], [1, 3.4]]], '#0c0d14', 1, { outline: false }); ctx.globalAlpha = 1;
      People.chain(ctx, [[0, 0], e, [lerp(e[0], hd[0], 0.86), lerp(e[1], hd[1], 0.86)]], [[[0, 4.1], [0.5, 3.8], [1, 3.4]], [[0, 3.4], [0.7, 3.0], [1, 3.2]]], '#12141e', 1, { line: 'rgba(255,150,70,0.35)' });
      People.hand(ctx, { skin: '#3a2418', age: 'adult' }, hd[0], hd[1], Math.atan2(hd[1] - e[1], hd[0] - e[0]), reach > 0.9 ? 'fist' : 'open');
      ctx.restore();
    }
    // 9. lighting
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    lanterns.forEach((L, i) => {
      const fl = 0.8 + 0.2 * noise1(t * 6 + i * 13) + env.pulse * 0.15;
      const r = 170 * u * L.s;
      ctx.fillStyle = radial(ctx, L.gx, L.gy, r, [[0, `rgba(255,${L.red ? 120 : 190},60,${0.26 * fl})`], [0.4, `rgba(255,110,40,${0.08 * fl})`], [1, 'rgba(255,100,40,0)']]);
      ctx.fillRect(L.gx - r, L.gy - r, r * 2, r * 2);
    });
    [[X(0.175) + co, 0.06], [X(0.83) + P(0.15), 0.05]].forEach(([lx, a]) => {
      const g = linear(ctx, 0, 0, 0, H * 0.6, [[0, `rgba(255,220,160,${a * 2})`], [1, 'rgba(255,200,140,0)']]);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lx - 20 * u, 0); ctx.lineTo(lx + 20 * u, 0); ctx.lineTo(lx + 150 * u, H * 0.6); ctx.lineTo(lx - 150 * u, H * 0.6); ctx.fill();
    });
    for (const m of motes) {
      m.x += m.vx * dt * u + Math.sin(t * 0.5 + m.ph) * 0.1; m.y += m.vy * dt * u;
      if (m.y < -5) { m.y = H + 5; m.x = Math.random() * W; } if (m.x < -5) m.x = W + 5; if (m.x > W + 5) m.x = -5;
      const a = (0.35 + 0.35 * Math.sin(t * 2 + m.ph)) * 0.6;
      ctx.fillStyle = `rgba(255,210,150,${a})`; ellipse(ctx, m.x, m.y, m.r * u, m.r * u); ctx.fill();
    }
    const fl = 0.025 + 0.02 * noise1(t * 3) + env.flash * 0.25;
    ctx.fillStyle = `rgba(255,150,70,${fl})`; ctx.fillRect(0, 0, W, H);
    ctx.restore();
    ctx.drawImage(vignette, 0, 0, W, H);
  }
  return { resize, draw };
}
