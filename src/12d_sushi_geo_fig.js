/* ================= Kaiten Sushi · GEOMETRIC edition — articulated flat figures =================
   Faceless mid-century people built from planes: split-tone heads (hair half-plane), triangle / rounded
   torsos with a light & shadow half, two-bone IK arms and legs (code-posed), hands that hold props. */
const SushiFig = (() => {
  const colCache = new Map(); let colStamp = '';
  function col(P, v) { if (!v) return '#000'; return v[0] === '#' ? GeoKit.lit(v) : P[v] || v; }
  function skinOf(P, a) {
    if (!a.tone) return P.skin;
    const key = P.skin + a.tone; if (colStamp !== P.skin) { colCache.clear(); colStamp = P.skin; }
    let v = colCache.get(key); if (!v) { v = a.tone > 0 ? mix(P.skin, '#5a2c18', a.tone) : mix(P.skin, '#fff1e0', -a.tone); colCache.set(key, v); } return v;
  }
  /* two-bone IK: returns [ex, ey, hx, hy]; pick = +1 prefers the lower elbow (arms), or a function */
  function ik(sx, sy, tx, ty, l1, l2, prefer) {
    let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || 0.001;
    const dmax = (l1 + l2) * 0.999, dmin = Math.abs(l1 - l2) + 0.5;
    if (d > dmax) { dx *= dmax / d; dy *= dmax / d; d = dmax; } else if (d < dmin) { dx *= dmin / d; dy *= dmin / d; d = dmin; }
    const base = Math.atan2(dy, dx), cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1), A = Math.acos(cosA);
    const e1x = sx + Math.cos(base + A) * l1, e1y = sy + Math.sin(base + A) * l1, e2x = sx + Math.cos(base - A) * l1, e2y = sy + Math.sin(base - A) * l1;
    const one = prefer(e1x, e1y, e2x, e2y);
    return one ? [e1x, e1y, sx + dx, sy + dy] : [e2x, e2y, sx + dx, sy + dy];
  }
  /* rig: compute joints from the actor's current pose state */
  function rig(a) {
    const s = a.sc, d = a.def, T = d.T * s, f = a.f;
    const lean = a.lean + (a.shake || 0), dx = Math.sin(lean) * f, dy = -Math.cos(lean);
    const px = -dy, py = dx; // perpendicular (screen right when upright)
    const hx = a.hx, hy = a.hy + (a.bob || 0);
    const AD = !!d.adult, TT = AD ? T * 0.64 : T;
    const ax = hx + dx * TT, ay = hy + dy * TT;
    const R = d.headR * s;
    const R0 = a.R || (a.R = {});
    const nk = AD ? 1.02 : 0.72;
    Object.assign(R0, { def: d, T, TT, ad: AD, f, dx, dy, px, py, hx, hy, ax, ay, R, hw: d.hw * s, cx: ax + dx * R * nk + f * R * 0.06 + (a.headDx || 0) * s, cy: ay + dy * R * nk + (a.headDy || 0) * s });
    if (AD) { // shoulders sit wide, just under the neck; the far shoulder is partly turned away
      const sjx = lerp(ax, hx, 0.1), sjy = lerp(ay, hy, 0.1);
      R0.sN = [sjx + px * f * d.hw * s * 0.6, sjy + py * f * d.hw * s * 0.6];
      R0.sF = [sjx - px * f * d.hw * s * 0.42, sjy - py * f * d.hw * s * 0.42];
    } else {
      const sjx = lerp(ax, hx, 0.2), sjy = lerp(ay, hy, 0.2);
      R0.sN = [sjx + px * f * d.hw * s * 0.16, sjy + py * f * d.hw * s * 0.16];
      R0.sF = [sjx - px * f * d.hw * s * 0.12, sjy - py * f * d.hw * s * 0.12];
    }
    const l1 = T * (AD ? 0.3 : 0.36) * (d.arm || 1), l2 = T * (AD ? 0.29 : 0.33) * (d.arm || 1);
    const low = (x1, y1, x2, y2) => y1 > y2 + (a.elbowOut ? -1e9 : 0) ? true : false;
    R0.armN = ik(R0.sN[0], R0.sN[1], a.hN.x, a.hN.y, l1, l2, low);
    R0.armF = ik(R0.sF[0], R0.sF[1], a.hF.x, a.hF.y, l1, l2, low);
    const t1 = T * (AD ? 0.445 : 0.3) * (d.leg || 1), t2 = T * (AD ? 0.435 : 0.32) * (d.leg || 1);
    const fwd = (x1, y1, x2, y2) => (x1 - x2) * f > 0;
    const hn = AD ? 0.3 : 0.15, hf = AD ? 0.22 : 0.1;
    R0.legN = ik(hx + f * R0.hw * hn, hy, a.fN.x, a.fN.y, t1, t2, fwd);
    R0.legF = ik(hx - f * R0.hw * hf, hy, a.fF.x, a.fF.y, t1, t2, fwd);
    R0.hipN = [hx + f * R0.hw * hn, hy]; R0.hipF = [hx - f * R0.hw * hf, hy];
    return R0;
  }
  const line = (c, x0, y0, x1, y1, w, color) => { c.strokeStyle = color; c.lineWidth = w; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); };
  function torsoPath(c, a, R) {
    const d = a.def, { ax, ay, hx, hy, px, py, dx, dy, hw } = R, ext = 14 * a.sc;
    const bLx = hx - px * hw - dx * ext, bLy = hy - py * hw - dy * ext, bRx = hx + px * hw - dx * ext, bRy = hy + py * hw - dy * ext;
    c.beginPath();
    if (R.ad) { // adult: rounded shoulders, gentle waist, garment hangs from the shoulders (coat -> to the knee)
      const W = (v) => R.hw * adW(v, d), pt = (u, v) => [lerp(ax, hx, v) + px * u * W(v), lerp(ay, hy, v) + py * u * W(v)];
      const vEnd = 1 + (d.coat || 0.1), vs = [0.13, 0.3, 0.5, 0.7, 0.9, 1, vEnd];
      let q = pt(-0.34, -0.02); c.moveTo(q[0], q[1]);
      q = pt(-1, 0.13); const k0 = pt(-0.95, -0.01); c.quadraticCurveTo(k0[0], k0[1], q[0], q[1]);
      for (const v of vs.slice(1)) { q = pt(-1, v); c.lineTo(q[0], q[1]); }
      const hm = pt(0, vEnd + 0.02); q = pt(1, vEnd); c.quadraticCurveTo(hm[0], hm[1], q[0], q[1]);
      for (const v of vs.slice(0, -1).reverse()) { q = pt(1, v); c.lineTo(q[0], q[1]); }
      const k1 = pt(0.95, -0.01); q = pt(0.34, -0.02); c.quadraticCurveTo(k1[0], k1[1], q[0], q[1]);
      c.closePath(); const e = pt(-1, vEnd), g = pt(1, vEnd); return [e[0], e[1], g[0], g[1]];
    }
    if (d.torso === 'round') {
      const sw = hw * 0.82, k = R.T * 0.2, sLx = ax - px * sw - dx * k, sLy = ay - py * sw - dy * k, sRx = ax + px * sw - dx * k, sRy = ay + py * sw - dy * k;
      c.moveTo(bLx, bLy); c.lineTo(sLx, sLy); c.bezierCurveTo(sLx + dx * k * 1.25, sLy + dy * k * 1.25, sRx + dx * k * 1.25, sRy + dy * k * 1.25, sRx, sRy); c.lineTo(bRx, bRy);
    } else if (d.torso === 'block') {
      const sw = hw * 0.62; c.moveTo(bLx, bLy); c.lineTo(ax - px * sw, ay - py * sw); c.quadraticCurveTo(ax + dx * sw * 0.2, ay + dy * sw * 0.2, ax + px * sw, ay + py * sw); c.lineTo(bRx, bRy);
    } else { // tri: apex with a tiny flat, slightly bowed sides (ref)
      const tw = hw * 0.08; c.moveTo(bLx, bLy); c.quadraticCurveTo(lerp(ax, hx, 0.45) - px * hw * 0.62, lerp(ay, hy, 0.45) - py * hw * 0.62, ax - px * tw, ay - py * tw); c.lineTo(ax + px * tw, ay + py * tw); c.quadraticCurveTo(lerp(ax, hx, 0.45) + px * hw * 0.62, lerp(ay, hy, 0.45) + py * hw * 0.62, bRx, bRy);
    }
    c.closePath();
    return [bLx, bLy, bRx, bRy];
  }
  // adult torso half-width profile (fraction of hw) along v: shoulders -> waist -> hip -> coat hem flare
  function adW(v, d) { const sh = d.shoulder || 0.92, wa = d.waist || 0.74, hp = d.hip || 0.8; if (v < 0.13) return lerp(0.34, sh, smooth(clamp(v / 0.13, 0, 1))); if (v < 0.6) return lerp(sh, wa, (v - 0.13) / 0.47); if (v <= 1) return lerp(wa, hp, (v - 0.6) / 0.4); return hp + (v - 1) * (d.flare ?? 0.22); }
  // local torso coordinate -> world (u: -1..1 across, v: 0 apex .. 1 hip)
  const TL = (R, u, v) => { const w = R.ad ? adW(v, R.def || {}) : Math.max(0.15, v); return [lerp(R.ax, R.hx, v) + R.px * u * R.hw * w, lerp(R.ay, R.hy, v) + R.py * u * R.hw * w]; };
  function polyL(c, R, pts) { c.beginPath(); pts.forEach(([u, v], i) => { const [x, y] = TL(R, u, v); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }
  function drawTorso(c, a, R, P) {
    const d = a.def, f = a.f, main = col(P, d.top);
    torsoPath(c, a, R); c.fillStyle = main; c.fill();
    c.save(); c.clip();
    const c2 = col(P, d.top2 || 'cream'), c3 = col(P, d.top3 || 'navy');
    switch (d.pattern) {
      case 'suit': { polyL(c, R, [[f * 0.05, -0.02], [f * 0.55, -0.02], [f * 0.3, 0.42]]); c.fillStyle = col(P, d.shirt || 'white'); c.fill();
        polyL(c, R, [[f * 0.26, 0.02], [f * 0.36, 0.02], [f * 0.33, 0.4], [f * 0.27, 0.44]]); c.fillStyle = col(P, d.tie || 'coral'); c.fill(); break; }
      case 'patch': { polyL(c, R, [[-0.2, -0.1], [-1.4, 0.5], [0.05, 0.55]]); c.fillStyle = c2; c.fill(); polyL(c, R, [[0.05, 0.55], [1.4, 0.48], [1.4, 1.2], [0.1, 1.2]]); c.fillStyle = c3; c.fill(); break; }
      case 'apron': { polyL(c, R, [[-0.55, 0.42], [0.65, 0.42], [0.8, 1.2], [-0.7, 1.2]]); c.fillStyle = c2; c.fill(); c.fillStyle = col(P, d.top3 || 'coral'); polyL(c, R, [[-0.6, 0.4], [0.7, 0.4], [0.72, 0.47], [-0.62, 0.47]]); c.fill(); break; }
      case 'cardigan': { polyL(c, R, [[f * 0.0, 0], [f * 0.42, 0], [f * 0.22, 1.2], [f * 0.12, 1.2]]); c.fillStyle = c2; c.fill(); break; }
      case 'stripe': { c.fillStyle = c2; for (let i = 0; i < 3; i++) { polyL(c, R, [[-1.5, 0.35 + i * 0.2], [1.5, 0.35 + i * 0.2], [1.5, 0.43 + i * 0.2], [-1.5, 0.43 + i * 0.2]]); c.fill(); } break; }
      case 'hivis': { c.fillStyle = col(P, '#e8e070'); for (const v of [0.55, 0.75]) { polyL(c, R, [[-1.5, v], [1.5, v], [1.5, v + 0.05], [-1.5, v + 0.05]]); c.fill(); } break; }
      case 'chef': { polyL(c, R, [[f * -0.05, 0.02], [f * 0.5, 0.25], [f * 0.45, 0.32], [f * -0.1, 0.1]]); c.fillStyle = col(P, d.top2 || 'cream'); c.fill(); break; }
      case 'kimono': { polyL(c, R, [[f * -0.25, 0], [f * 0.1, 0], [f * 0.9, 0.7], [f * 0.6, 0.75]]); c.fillStyle = c2; c.fill(); polyL(c, R, [[-1.5, 0.62], [1.5, 0.62], [1.5, 0.74], [-1.5, 0.74]]); c.fillStyle = c3; c.fill(); break; }
      case 'vest': { polyL(c, R, [[f * -0.2, -0.02], [f * 0.6, -0.02], [f * 0.25, 0.5]]); c.fillStyle = col(P, d.shirt || 'white'); c.fill();
        polyL(c, R, [[f * 0.12, 0.0], [f * 0.38, 0.0], [f * 0.25, 0.08]]); c.fillStyle = col(P, d.tie || 'dark'); c.fill();
        polyL(c, R, [[f * 0.22, 0.08], [f * 0.3, 0.08], [f * 0.3, 1.2], [f * 0.22, 1.2]]); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fill(); break; }
      case 'dress': { c.fillStyle = c2; for (let i = 0; i < 4; i++) { polyL(c, R, [[-1.6, 0.62 + i * 0.12], [1.6, 0.62 + i * 0.12], [1.6, 0.66 + i * 0.12], [-1.6, 0.66 + i * 0.12]]); c.fill(); }
        polyL(c, R, [[f * -0.05, -0.05], [f * 0.45, -0.05], [f * 0.2, 0.22]]); c.fillStyle = skinOf(P, a); c.fill(); break; }
      case 'polo': { polyL(c, R, [[f * -0.1, -0.03], [f * 0.5, -0.03], [f * 0.35, 0.1], [f * 0.2, 0.06], [f * 0.05, 0.1]]); c.fillStyle = c2; c.fill(); polyL(c, R, [[f * 0.18, 0.05], [f * 0.24, 0.05], [f * 0.24, 0.3], [f * 0.18, 0.3]]); c.fillStyle = 'rgba(0,0,0,0.15)'; c.fill(); break; }
      case 'qipao': { polyL(c, R, [[f * -0.15, -0.03], [f * 0.5, -0.03], [f * 0.75, 0.28], [f * 0.66, 0.32], [f * 0.35, 0.08]]); c.fillStyle = c2; c.fill(); polyL(c, R, [[-1.5, 0.0], [1.5, 0.0], [1.5, 0.06], [-1.5, 0.06]]); c.fill(); break; }
      case 'jacket': { polyL(c, R, [[f * 0.0, -0.02], [f * 0.5, -0.02], [f * 0.4, 1.2], [f * 0.12, 1.2]]); c.fillStyle = col(P, d.shirt || 'white'); c.fill(); polyL(c, R, [[f * 0.0, -0.02], [f * 0.12, -0.02], [f * 0.3, 0.38], [f * 0.18, 0.42]]); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fill(); break; }
      case 'tee': { if (d.print) { polyL(c, R, [[-0.3, 0.3], [0.3, 0.3], [0.3, 0.55], [-0.3, 0.55]]); c.fillStyle = c2; c.fill(); } break; }
      case 'coat': { // overcoat / trench: shirt V, wide lapels, front edge, optional belt, pocket flaps
        const ve = 1 + (d.coat || 0.5); polyL(c, R, [[f * -0.06, -0.04], [f * 0.3, -0.04], [f * 0.1, 0.3]]); c.fillStyle = col(P, d.shirt || 'cream'); c.fill();
        if (d.tie) { polyL(c, R, [[f * 0.06, -0.02], [f * 0.13, -0.02], [f * 0.12, 0.24], [f * 0.08, 0.27]]); c.fillStyle = col(P, d.tie); c.fill(); }
        c.fillStyle = shade(main, -0.14); polyL(c, R, [[f * 0.28, -0.05], [f * 0.5, -0.05], [f * 0.44, 0.1], [f * 0.24, 0.42], [f * 0.12, 0.42], [f * 0.18, 0.2]]); c.fill();
        polyL(c, R, [[f * -0.08, -0.05], [f * -0.3, -0.05], [f * -0.26, 0.12], [f * -0.02, 0.3]]); c.fill();
        polyL(c, R, [[f * 0.11, 0.4], [f * 0.15, 0.4], [f * 0.17, ve + 0.1], [f * 0.13, ve + 0.1]]); c.fillStyle = shade(main, -0.24); c.fill();
        c.fillStyle = shade(main, -0.3); for (const v of [0.5, 0.72]) { const [bx, by] = TL(R, f * 0.24, v); c.beginPath(); c.arc(bx, by, R.T * 0.009, 0, TAU); c.fill(); }
        if (d.belt) { polyL(c, R, [[-1.5, 0.6], [1.5, 0.6], [1.5, 0.67], [-1.5, 0.67]]); c.fillStyle = shade(main, -0.12); c.fill(); const [kx, ky] = TL(R, f * 0.2, 0.635); c.strokeStyle = shade(main, -0.35); c.lineWidth = R.T * 0.006; c.strokeRect(kx - R.T * 0.012, ky - R.T * 0.012, R.T * 0.024, R.T * 0.024); }
        c.fillStyle = shade(main, -0.18); for (const u of [0.5, -0.45]) polyL(c, R, [[f * (u - 0.17), 0.92], [f * (u + 0.17), 0.92], [f * (u + 0.17), 0.95], [f * (u - 0.17), 0.95]]), c.fill();
        break; }
      case 'bib': { // shirt with collar + bib apron with neck strap and waist tie
        polyL(c, R, [[f * -0.12, -0.04], [f * 0.02, 0.1], [f * 0.18, -0.04]]); c.fillStyle = shade(main, -0.1); c.fill();
        polyL(c, R, [[f * 0.02, 0.1], [f * 0.18, -0.04], [f * 0.36, -0.03], [f * 0.16, 0.14]]); c.fillStyle = shade(main, 0.06); c.fill();
        const ve = 1 + (d.coat || 0.35); polyL(c, R, [[-0.42, 0.26], [0.42, 0.26], [0.5, 0.6], [0.92, 0.66], [1.0, ve], [-1.0, ve], [-0.92, 0.66], [-0.5, 0.6]]); c.fillStyle = c2; c.fill();
        polyL(c, R, [[-0.42, 0.26], [0.42, 0.26], [0.43, 0.3], [-0.43, 0.3]]); c.fillStyle = shade(c2, -0.12); c.fill();
        c.strokeStyle = shade(c2, -0.1); c.lineWidth = R.T * 0.012; const [n0x, n0y] = TL(R, -0.38, 0.27), [n1x, n1y] = TL(R, -0.22, 0.0), [n2x, n2y] = TL(R, 0.22, 0.0), [n3x, n3y] = TL(R, 0.38, 0.27); c.beginPath(); c.moveTo(n0x, n0y); c.lineTo(n1x, n1y); c.moveTo(n2x, n2y); c.lineTo(n3x, n3y); c.stroke();
        polyL(c, R, [[-1.5, 0.62], [1.5, 0.62], [1.5, 0.67], [-1.5, 0.67]]); c.fillStyle = shade(c2, -0.16); c.fill();
        polyL(c, R, [[f * 0.15, 0.4], [f * 0.45, 0.4], [f * 0.45, 0.5], [f * 0.15, 0.5]]); c.fillStyle = shade(c2, -0.07); c.fill();
        break; }
      case 'knit': { polyL(c, R, [[-0.4, -0.06], [0.4, -0.06], [0.36, 0.05], [-0.36, 0.05]]); c.fillStyle = shade(main, -0.15); c.fill(); polyL(c, R, [[-1.5, 0.94], [1.5, 0.94], [1.5, 1.2], [-1.5, 1.2]]); c.fillStyle = shade(main, -0.1); c.fill(); if (d.shirt) { polyL(c, R, [[f * -0.12, -0.06], [f * 0.18, -0.06], [f * 0.03, 0.06]]); c.fillStyle = col(P, d.shirt); c.fill(); } break; }
      case 'hoodie': { polyL(c, R, [[-0.6, 0.7], [0.6, 0.7], [0.5, 0.88], [-0.5, 0.88]]); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fill(); break; }
    }
    if (a.scarf) { polyL(c, R, [[-1, -0.05], [1, -0.05], [1, 0.13], [-1, 0.13]]); c.fillStyle = col(P, a.scarf); c.fill(); }
    // shadow half (light from the window side, upper right)
    if (R.ad) { const ve = 1 + (d.coat || 0.1); polyL(c, R, [[-0.18, -0.2], [-2, -0.2], [-2, ve + 0.2], [-0.32, ve + 0.2]]); c.fillStyle = 'rgba(20,10,30,0.2)'; c.fill();
      const [gx0, gy0] = TL(R, 0, 0), [gx1, gy1] = TL(R, 0, ve); const g = c.createLinearGradient(gx0, gy0, gx1, gy1); g.addColorStop(0, 'rgba(255,250,240,0.10)'); g.addColorStop(0.55, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,10,20,0.16)'); c.fillStyle = g; c.fillRect(Math.min(gx0, gx1) - R.hw * 2, Math.min(gy0, gy1) - R.hw, R.hw * 4, Math.abs(gy1 - gy0) + R.hw * 2);
      if (d.coat > 0.3) { polyL(c, R, [[f * 0.02, 0.05], [f * 0.1, 0.05], [f * 0.12, ve + 0.1], [f * 0.04, ve + 0.1]]); c.fillStyle = 'rgba(0,0,0,0.14)'; c.fill(); polyL(c, R, [[-1.5, 0.98], [1.5, 0.98], [1.5, 1.03], [-1.5, 1.03]]); c.fillStyle = 'rgba(0,0,0,0.1)'; c.fill(); } }
    else { polyL(c, R, [[-0.05, -0.2], [-2, -0.2], [-2, 1.3], [-0.25, 1.3]]); c.fillStyle = 'rgba(20,10,30,0.2)'; c.fill(); }
    c.restore();
    if (d.lanyard) { const [x0, y0] = TL(R, f * -0.1, 0.02), [x1, y1] = TL(R, f * 0.2, 0.36), [x2, y2] = TL(R, f * 0.45, 0.02); c.strokeStyle = col(P, 'teal'); c.lineWidth = 1.6 * a.sc; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.fillStyle = col(P, 'white'); c.fillRect(x1 - 5 * a.sc, y1, 10 * a.sc, 12 * a.sc); }
    if (d.camera && R.ad) { const [s0x, s0y] = TL(R, -f * 0.55, 0.02), [x1, y1] = TL(R, f * 0.5, 0.62); c.strokeStyle = '#26221e'; c.lineWidth = 1.8 * a.sc; c.beginPath(); c.moveTo(s0x, s0y); c.lineTo(x1, y1 - 6 * a.sc); c.stroke(); if (!a.camUp) { c.fillStyle = '#23211f'; roundRect(c, x1 - 10 * a.sc, y1 - 7 * a.sc, 20 * a.sc, 14 * a.sc, 2 * a.sc); c.fill(); c.fillStyle = '#c8c4b8'; c.fillRect(x1 - 10 * a.sc, y1 - 7 * a.sc, 20 * a.sc, 3 * a.sc); c.fillStyle = '#4a5560'; c.beginPath(); c.arc(x1 + f * 2 * a.sc, y1 + 1 * a.sc, 4.2 * a.sc, 0, TAU); c.fill(); } }
    else if (d.camera) { const [x1, y1] = TL(R, f * 0.35, 0.34); c.fillStyle = '#1e1e22'; roundRect(c, x1 - 9 * a.sc, y1 - 6 * a.sc, 18 * a.sc, 13 * a.sc, 2 * a.sc); c.fill(); c.fillStyle = '#5a6a7a'; c.beginPath(); c.arc(x1 + f * 2 * a.sc, y1, 4 * a.sc, 0, TAU); c.fill(); }
  }
  function hairPlane(c, cx, cy, r, nx, ny, d) {
    const ox = cx + nx * d * r, oy = cy + ny * d * r, tx = -ny, ty = nx;
    c.beginPath(); c.moveTo(ox + tx * 3 * r, oy + ty * 3 * r); c.lineTo(ox - tx * 3 * r, oy - ty * 3 * r); c.lineTo(ox - tx * 3 * r + nx * 3 * r, oy - ty * 3 * r + ny * 3 * r); c.lineTo(ox + tx * 3 * r + nx * 3 * r, oy + ty * 3 * r + ny * 3 * r); c.closePath();
  }
  function headBack(c, a, R, P) { // hair parts behind the head
    const d = a.def, r = R.R, lx = a.lx, back = lx === 0 ? -a.f : -Math.sign(lx), hc = col(P, d.hair || 'dark'), cx = R.cx, cy = R.cy;
    if (d.hood) { ellipse(c, cx + back * r * 0.55, cy + r * 0.55, r * 1.0, r * 0.75); c.fillStyle = col(P, d.top); c.fill(); }
    if (d.hairStyle === 'bun') { c.beginPath(); c.arc(cx + back * r * 0.82, cy - r * 0.55, r * 0.42, 0, TAU); c.fillStyle = hc; c.fill(); }
    else if (d.hairStyle === 'bob') { ellipse(c, cx + back * r * 0.28, cy + r * 0.12, r * 1.06, r * 1.08); c.fillStyle = hc; c.fill(); }
    else if (d.hairStyle === 'pony') { c.beginPath(); c.moveTo(cx + back * r * 0.7, cy - r * 0.5); c.quadraticCurveTo(cx + back * r * 1.75, cy - r * 0.1 + Math.sin(a.t * 3) * 2, cx + back * r * 1.2, cy + r * 1.05); c.lineTo(cx + back * r * 0.75, cy + r * 0.1); c.closePath(); c.fillStyle = hc; c.fill(); }
    else if (d.hairStyle === 'long') { c.beginPath(); c.moveTo(cx + back * r * 0.2, cy - r * 0.9); c.quadraticCurveTo(cx + back * r * 1.3, cy - r * 0.5, cx + back * r * 1.05, cy + r * 1.5); c.lineTo(cx + back * r * 0.1, cy + r * 1.3); c.closePath(); c.fillStyle = hc; c.fill(); }
  }
  function drawHead(c, a, R, P) {
    const d = a.def, r = R.R, lx = clamp(a.lx, -1, 1), cx = R.cx, cy = R.cy, sk = skinOf(P, a), hc = col(P, d.hair || 'dark');
    if (R.ad) { c.strokeStyle = shade(sk, -0.12); c.lineWidth = r * 0.62; c.lineCap = 'butt'; c.beginPath(); c.moveTo(R.ax + R.dx * -4 * a.sc, R.ay - R.dy * 4 * a.sc); c.lineTo(cx - R.dx * r * 0.5, cy - R.dy * r * 0.5); c.stroke(); }
    c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.fillStyle = sk; c.fill();
    // face-side light / back-side shade plane
    c.save(); c.clip();
    const tilt = (a.tilt || 0) * Math.sign(lx || a.f);
    let nx = -lx * 0.74, ny = -0.68; const ca = Math.cos(tilt), sa = Math.sin(tilt); [nx, ny] = [nx * ca - ny * sa, nx * sa + ny * ca]; const nl = Math.hypot(nx, ny); nx /= nl; ny /= nl;
    c.fillStyle = 'rgba(30,10,20,0.13)'; c.fillRect(lx >= 0 ? cx - r : cx, cy - r, r, r * 2);
    if (d.hairStyle !== 'bald') { hairPlane(c, cx, cy, r, nx, ny, (d.hairD ?? -0.06) + (1 - Math.abs(lx)) * 0.32); c.fillStyle = hc; c.fill(); }
    if (d.hat === 'cap') { hairPlane(c, cx, cy, r, 0, -1, 0.2); c.fillStyle = col(P, d.hatCol || 'coral'); c.fill(); }
    if (d.glasses) { c.strokeStyle = '#1a1414'; c.lineWidth = Math.max(1, r * 0.075); const gy = cy + r * 0.02;
      if (Math.abs(lx) > 0.3) { const gx = cx + lx * r * 0.66; c.strokeRect(gx - r * 0.2, gy - r * 0.12, r * 0.4, r * 0.24); c.beginPath(); c.moveTo(gx - Math.sign(lx) * r * 0.2, gy - r * 0.06); c.lineTo(cx - lx * r * 0.2, gy - r * 0.1); c.stroke(); }
      else { for (const sx of [-1, 1]) c.strokeRect(cx + sx * r * 0.36 - r * 0.2, gy - r * 0.12, r * 0.4, r * 0.24); } }
    c.restore();
    if (d.hat === 'cap') { const back = -Math.sign(lx || a.f); c.fillStyle = col(P, d.hatCol || 'coral'); c.fillRect(Math.min(cx + back * r * 0.6, cx + back * r * 1.35), cy - r * 0.38, r * 0.75, r * 0.14); }
    else if (d.hat === 'bucket') { c.fillStyle = col(P, d.hatCol || 'mustard'); c.beginPath(); c.moveTo(cx - r * 0.78, cy - r * 0.42); c.lineTo(cx - r * 0.6, cy - r * 1.18); c.lineTo(cx + r * 0.6, cy - r * 1.18); c.lineTo(cx + r * 0.78, cy - r * 0.42); c.closePath(); c.fill(); ellipse(c, cx, cy - r * 0.42, r * 1.32, r * 0.2); c.fill(); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(cx - r * 0.72, cy - r * 0.62, r * 1.44, r * 0.14); }
    else if (d.hat === 'chef') { c.fillStyle = col(P, 'white'); c.beginPath(); c.moveTo(cx - r * 0.86, cy - r * 0.5); c.lineTo(cx - r * 0.95, cy - r * 1.72); c.lineTo(cx + r * 0.95, cy - r * 1.72); c.lineTo(cx + r * 0.86, cy - r * 0.5); c.closePath(); c.fill(); c.fillStyle = 'rgba(40,20,10,0.12)'; c.fillRect(cx - (lx < 0 ? -r * 0.1 : r * 0.95), cy - r * 1.72, r * 0.85, r * 1.22); }
    else if (d.hat === 'band') { c.fillStyle = col(P, d.hatCol || 'white'); c.save(); c.beginPath(); c.arc(cx, cy, r * 1.02, 0, TAU); c.clip(); c.fillRect(cx - r, cy - r * 0.62, r * 2, r * 0.2); c.restore(); }
    else if (d.hat === 'flatcap') { c.fillStyle = col(P, d.hatCol || 'grey'); c.beginPath(); c.arc(cx, cy - r * 0.25, r * 1.04, Math.PI * 1.02, Math.PI * 1.98); c.closePath(); c.fill(); const fw = Math.sign(lx || a.f); c.beginPath(); c.moveTo(cx + fw * r * 0.2, cy - r * 0.32); c.lineTo(cx + fw * r * 1.35, cy - r * 0.2); c.lineTo(cx + fw * r * 0.9, cy - r * 0.45); c.closePath(); c.fill(); }
    else if (d.hat === 'fedora') { c.fillStyle = col(P, d.hatCol || 'dark'); c.fillRect(cx - r * 1.45, cy - r * 0.62, r * 2.9, r * 0.2); c.beginPath(); c.moveTo(cx - r * 0.85, cy - r * 0.55); c.lineTo(cx - r * 0.75, cy - r * 1.35); c.quadraticCurveTo(cx, cy - r * 1.15, cx + r * 0.75, cy - r * 1.35); c.lineTo(cx + r * 0.85, cy - r * 0.55); c.closePath(); c.fill(); c.fillStyle = col(P, d.bandCol || 'coral'); c.fillRect(cx - r * 0.86, cy - r * 0.8, r * 1.72, r * 0.16); }
    else if (d.hat === 'cloche') { c.fillStyle = col(P, d.hatCol || 'plum'); c.beginPath(); c.arc(cx, cy - r * 0.2, r * 1.1, Math.PI * 0.95, Math.PI * 2.05); c.closePath(); c.fill(); c.fillStyle = col(P, d.bandCol || 'cream'); c.fillRect(cx - r * 1.05, cy - r * 0.42, r * 2.1, r * 0.16); }
    else if (d.hat === 'paper') { c.fillStyle = col(P, d.hatCol || 'white'); c.beginPath(); c.moveTo(cx - r * 0.95, cy - r * 0.5); c.lineTo(cx - r * 0.7, cy - r * 1.25); c.lineTo(cx + r * 0.7, cy - r * 1.25); c.lineTo(cx + r * 0.95, cy - r * 0.5); c.closePath(); c.fill(); c.fillStyle = col(P, d.bandCol || 'coral'); c.fillRect(cx - r * 0.92, cy - r * 0.72, r * 1.84, r * 0.14); }
    else if (d.hat === 'visor') { c.fillStyle = col(P, d.hatCol || 'coral'); c.save(); c.beginPath(); c.arc(cx, cy, r * 1.04, 0, TAU); c.clip(); c.fillRect(cx - r * 1.1, cy - r * 0.78, r * 2.2, r * 0.24); c.restore(); const fw = Math.sign(lx || a.f); c.beginPath(); c.moveTo(cx + fw * r * 0.3, cy - r * 0.56); c.lineTo(cx + fw * r * 1.4, cy - r * 0.48); c.lineTo(cx + fw * r * 0.6, cy - r * 0.72); c.closePath(); c.fill(); }
    else if (d.hat === 'beret') { c.fillStyle = col(P, d.hatCol || 'coral'); ellipse(c, cx - Math.sign(lx || a.f) * r * 0.25, cy - r * 0.78, r * 1.05, r * 0.42, -0.15 * Math.sign(lx || a.f)); c.fill(); }
    else if (d.hat === 'kerchief') { c.fillStyle = col(P, d.hatCol || 'coral'); c.beginPath(); c.arc(cx, cy - r * 0.1, r * 1.06, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); }
    else if (d.hat === 'feather') { c.fillStyle = col(P, d.hatCol || 'dark'); c.save(); c.beginPath(); c.arc(cx, cy, r * 1.05, 0, TAU); c.clip(); c.fillRect(cx - r * 1.1, cy - r * 0.7, r * 2.2, r * 0.18); c.restore(); c.fillStyle = col(P, d.bandCol || 'cream'); ellipse(c, cx + r * 0.6, cy - r * 1.1, r * 0.16, r * 0.55, 0.5); c.fill(); }
    else if (d.hat === 'beanie') { c.fillStyle = col(P, d.hatCol || 'teal'); c.beginPath(); c.arc(cx, cy - r * 0.18, r * 1.03, Math.PI, TAU); c.closePath(); c.fill(); c.fillRect(cx - r * 1.05, cy - r * 0.3, r * 2.1, r * 0.2); }
  }
  function drawLegs(c, a, R, P) {
    const d = a.def, pants = col(P, d.pants || 'dark'), T = R.T, shoe = col(P, d.shoe || '#2a2220');
    c.lineCap = 'round';
    for (const [hip, L, far] of [[R.hipF, R.legF, 1], [R.hipN, R.legN, 0]]) {
      const pc = far ? shade(pants, -0.18) : pants;
      if (d.skirt) {
        line(c, L[0], L[1], L[2], L[3], T * 0.05, d.tights ? col(P, 'dark') : skinOf(P, a));
        c.fillStyle = far ? shade(col(P, d.skirt), -0.15) : col(P, d.skirt);
        const kx = L[0], ky = L[1]; c.beginPath(); c.moveTo(hip[0] - a.f * T * 0.12, hip[1] - T * 0.05); c.lineTo(hip[0] + a.f * T * 0.05, hip[1] - T * 0.06); c.lineTo(kx + a.f * T * 0.05, ky + T * 0.05); c.lineTo(kx - a.f * T * 0.02, ky + T * 0.09); c.closePath(); c.fill();
      } else {
        if (R.ad) { line(c, hip[0], hip[1], L[0], L[1], T * 0.098, pc); line(c, L[0], L[1], L[2], L[3], T * 0.074, pc); }
        else { line(c, hip[0], hip[1], L[0], L[1], T * 0.085, pc); line(c, L[0], L[1], L[2], L[3], T * 0.07, pc); }
      }
      if (R.ad) { c.fillStyle = shoe; c.beginPath(); c.moveTo(L[2] - a.f * T * 0.035, L[3] - T * 0.022); c.lineTo(L[2] + a.f * T * 0.04, L[3] - T * 0.012); c.quadraticCurveTo(L[2] + a.f * T * 0.085, L[3] - T * 0.004, L[2] + a.f * T * 0.08, L[3] + T * 0.012); c.lineTo(L[2] - a.f * T * 0.04, L[3] + T * 0.012); c.closePath(); c.fill(); }
      else { ellipse(c, L[2] + a.f * T * 0.03, L[3] + T * 0.008, T * 0.055, T * 0.024); c.fillStyle = shoe; c.fill(); }
    }
  }
  function drawArm(c, a, R, P, which) {
    const d = a.def, A = which === 'N' ? R.armN : R.armF, S = which === 'N' ? R.sN : R.sF, T = R.T;
    const sleeve = col(P, d.sleeve || d.top), far = which === 'F';
    const sc = far ? shade(sleeve, -0.16) : sleeve;
    c.lineCap = 'round';
    const aw = R.ad ? 0.085 : 0.092; line(c, S[0], S[1], A[0], A[1], T * aw, sc);
    const fore = d.shortSleeve ? skinOf(P, a) : sc;
    if (d.shortSleeve && !d.bareArm) { const mx = lerp(A[0], A[2], 0.35), my = lerp(A[1], A[3], 0.35); line(c, A[0], A[1], mx, my, T * 0.08, sc); line(c, mx, my, A[2], A[3], T * 0.066, far ? shade(fore, -0.1) : fore); }
    else line(c, A[0], A[1], A[2], A[3], T * (R.ad ? 0.07 : 0.078), sc);
    c.beginPath(); c.arc(A[2], A[3], T * (R.ad ? 0.036 : 0.042), 0, TAU); c.fillStyle = far ? shade(skinOf(P, a), -0.1) : skinOf(P, a); c.fill();
  }
  function drawBackpack(c, a, R, P) {
    if (!a.def.backpack) return; const [x, y] = TL(R, -a.f * 1.0, 0.42), w = R.T * 0.2, h = R.T * 0.34;
    c.fillStyle = col(P, a.def.packCol || 'coral'); roundRect(c, x - w / 2, y - h / 2, w, h, w * 0.3); c.fill(); c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(x - w / 2, y + h * 0.1, w, h * 0.12);
  }
  return { rig, ik, col, skinOf, drawTorso, drawHead, headBack, drawLegs, drawArm, drawBackpack, TL, line };
})();
