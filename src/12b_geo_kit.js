/* ================= GeoKit — shared engine for the flat geometric worlds =================
   Extracted from the Kaiten Sushi geometric stage so every restyled world shares one art language:
   - GeoKit.palette(): named colour slots per time of day, blended by the in-game clock (+ rain / snow variants)
   - GeoKit.stage(): resize / camera / clock / fixed-step sim / paper grain / vignette / debug hooks
   - actor runtime: articulated faceless figures (SushiFig rig), hands on springs that reach real targets,
     phase-based actions, walking, sitting, held items that draw in the hand, speech bubbles, effects
   - scene helpers: light shafts, window sky (sun / moon / stars / clouds) with rain & snow, lamp glow
   Each world supplies its own palettes, room, props, cast, behaviour AI and events. */
const GeoKit = (() => {
  let active = null; // palette object of the world currently drawing (SushiFig colours go through it)
  const lit = (hex) => (active || SushiPal).lit(hex);
  function use(p) { active = p; }

  /* ---------- palette clock ---------- */
  function palette(P, KEYS, o = {}) {
    const SLOTS = Object.keys(P[KEYS[0][1]]);
    const RGB = {};
    for (const k in P) { RGB[k] = {}; for (const s of SLOTS) { const v = P[k][s] ?? P[KEYS[0][1]][s]; RGB[k][s] = typeof v === 'number' ? v : hexToRgb(v); } }
    const H0 = KEYS[0][0], H1 = KEYS[KEYS.length - 1][0];
    const cur = {}, tmp = {};
    const label = o.label || ((h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 11 ? 'Morning' : h < 14.5 ? 'Midday' : h < 17 ? 'Afternoon' : h < 20 ? 'Dusk' : 'Night'; });
    const nightKey = o.nightKey || 'night';
    const mixA = (A, B, k) => (typeof A === 'number' ? A + (B - A) * k : [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k]);
    function at(h, weather) {
      let hh = h; while (hh < H0) hh += 24; while (hh >= H1) hh -= 24;
      let i = 0; while (i < KEYS.length - 2 && hh >= KEYS[i + 1][0]) i++;
      const [h0, a] = KEYS[i], [h1, b] = KEYS[i + 1], k = smooth(clamp((hh - h0) / (h1 - h0), 0, 1));
      for (const s of SLOTS) tmp[s] = mixA(RGB[a][s], RGB[b][s], k);
      const night = (a === nightKey ? (b === nightKey ? 1 : 1 - k) : 0) + (b === nightKey && a !== nightKey ? k : 0);
      if (weather === 'snow' && RGB.snow) { for (const s of SLOTS) { if (/^(lamp|lit|glow|neon|bubble|sign)/.test(s)) continue; const w = /^(sky|city|out)/.test(s) ? 0.5 : 0.35; tmp[s] = mixA(tmp[s], RGB.snow[s], w); } }
      else if (weather === 'rain' || weather === 'storm') { for (const s of SLOTS) if (/^(sky|city|out)/.test(s) && typeof tmp[s] !== 'number') { const A = tmp[s]; tmp[s] = [A[0] * 0.74 + 22, A[1] * 0.78 + 26, A[2] * 0.84 + 36]; } if (tmp.shaftA != null) tmp.shaftA *= 0.4; }
      for (const s of SLOTS) { const v = tmp[s]; cur[s] = typeof v === 'number' ? v : toHex(v[0], v[1], v[2]); }
      cur.night = night; cur.hour = h; cur.label = label(h); cur.key = Math.round(hh * 2) + ':' + weather;
      return cur;
    }
    const litCache = new Map(); let stamp = '';
    function litF(hex) {
      const st = cur.amb + (cur.ambK || 0).toFixed(3); if (st !== stamp) { litCache.clear(); stamp = st; }
      let v = litCache.get(hex); if (!v) { v = cur.ambK > 0.001 ? mix(hex, cur.amb, cur.ambK) : hex; litCache.set(hex, v); } return v;
    }
    return { P, SLOTS, at, lit: litF, cur, label };
  }

  /* ---------- tiny drawing helpers ---------- */
  const poly = (c, pts) => { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); };
  const body = (o) => Object.assign({ T: 240, hw: 60, headR: 27, adult: 1, torso: 'tri', pattern: 'split', top: 'navy', pants: 'dark', hair: 'dark', hairStyle: 'short', hairD: -0.05 }, o);
  let grainCv = null;
  function makeGrain() {
    if (grainCv) return grainCv;
    const n = 192, [cv, x] = hiCanvas(n, n, 1), img = x.createImageData(n, n), r = mulberry32(5);
    for (let i = 0; i < n * n; i++) { const v = r() < 0.5 ? 0 : 255, a = (r() * 0.9) * 255; img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = a; }
    x.putImageData(img, 0, 0); return (grainCv = cv);
  }

  /* ---------- stage factory ---------- */
  function stage(spec) {
    const BW = 1280, BH = 720, F = SushiFig, pal = spec.pal;
    let W = 1280, H = 720, k = 1, ox = 0, oy = 0, vign = null, built = false, lastEv = 0, panR = 0, grainPat = null, grainCtx = null;
    const S = { hourOverride: null, lapse: 0, lapseH: spec.startHour ?? 9, timeScale: 1, weather: null };
    const K = { BW, BH, F, pal, P: pal.at(spec.startHour ?? 9, 'clear'), simT: 0, t: 0, dt: 0, actors: [], effects: [], timers: [], uid: 1, poly, body, extraB: 0, S };
    K.L = (hex) => pal.lit(hex);
    K.col = (v) => F.col(K.P, v);
    K.after = (d, fn) => K.timers.push({ t: K.simT + d, fn });
    K.say = (a, txt, d = 1.6) => { if (a) a.bub = { c: txt, t: 0, d: d * rand(0.9, 1.15) }; };
    K.ph = (d, f, o = {}) => Object.assign({ d, f }, o);
    K.dd = (lo, hi, a) => rand(lo, hi) / ((a && a.speed) || 1);
    K.fx = (kind, x, y, o = {}) => K.effects.push(Object.assign({ k: kind, x, y, t: 0, life: 0.8 }, o));
    /* actors */
    K.mk = (def, o = {}) => {
      const a = Object.assign({ id: K.uid++, def: Object.assign({}, def), f: 1, hx: 0, hy: 0, sc: 1, lean: 0, leanT: 0, lx: 1, lxT: 1, tilt: 0, tiltT: 0, bob: 0, shake: 0, headDy: 0,
        hN: { x: 0, y: 0, vx: 0, vy: 0 }, hF: { x: 0, y: 0, vx: 0, vy: 0 }, fN: { x: 0, y: 0 }, fF: { x: 0, y: 0 }, tgN: [0, 0], tgF: [0, 0], hold: { N: null, F: null },
        act: null, hist: [], cool: {}, bub: null, t: rand(10), state: 'stand', alpha: 1, walkPh: rand(6), speed: 1, posture: 0, floorY: 680, seatY: 600, walkSp: 64, tone: rand(-0.06, 0.12) }, o);
      if (a.def.hairStyle === 'long' || a.def.hairStyle === 'bob') a.def.hairD = (a.def.hairD ?? -0.05) - 0.06;
      a.lx = a.lxT = a.f; K.actors.push(a); K.settle(a); return a;
    };
    K.remove = (a) => { const i = K.actors.indexOf(a); if (i >= 0) K.actors.splice(i, 1); };
    K.standHip = (a) => a.floorY - (a.def.adult ? lerp(0.875, 0.865, a.wb || 0) : 0.6) * a.def.T * (a.def.leg || 1) * a.sc; // standing: legs nearly straight (no bent knees); walking: soft knees for the gait
    K.settle = (a) => { if (a.state === 'seated') a.hy = a.seatY; else a.hy = K.standHip(a); F.rig(a); K.basePose(a); a.hN.x = a.tgN[0]; a.hN.y = a.tgN[1]; a.hF.x = a.tgF[0]; a.hF.y = a.tgF[1]; F.rig(a); };
    K.start = (a, name, phases, o = {}) => { if (a.act) K.abort(a); a.act = Object.assign({ name, phases, i: 0, t: 0 }, o); a.hist.unshift(name); if (a.hist.length > 6) a.hist.length = 6; a.cool[name] = K.simT; return true; };
    K.endAct = (a) => { const A = a.act; a.act = null; a.shake = 0; a.headDy = 0; a.farFront = false; if (A && A.onEnd) A.onEnd(a); };
    K.abort = (a) => { const A = a.act; if (!A) return; a.act = null; a.shake = 0; a.headDy = 0; a.farFront = false; a.bob = 0; if (A.onAbort) A.onAbort(a); };
    K.cooled = (a, name, sec) => K.simT - (a.cool[name] ?? -1e9) > sec;
    K.walkTo = (a, x) => { a.walkTo = x; };
    K.at = (a, x) => Math.abs(a.hx - x) < 2 && !a.walking;
    K.walkPh = (x, extra = {}) => K.ph(0, (w) => { w.walkTo = x; }, Object.assign({ until: (w) => K.at(w, x), max: 25 }, extra));
    K.sitDown = (a, x, seatY, f) => { a.sitFrom = { x: a.hx, y: a.hy }; a.hx = x; a.seatY = seatY; a.f = f; a.state = 'sit'; a.st = 0; };
    K.standUp = (a) => { a.state = 'rise'; a.st = 0; };
    function runAct(a, dt) {
      const A = a.act; if (!A) return; const p = A.phases[A.i]; if (!p) { K.endAct(a); return; }
      if (!p._in) { p._in = true; if (p.enter) p.enter(a, A); }
      A.t += dt; const u = p.d ? Math.min(1, A.t / p.d) : 0;
      if (p.f) p.f(a, u, A.t, A);
      const done = p.until ? (p.until(a, A.t, A) || A.t > (p.max || 12)) : A.t >= p.d;
      if (done && a.act === A) { if (p.exit) p.exit(a, A); A.i++; A.t = 0; if (A.i >= A.phases.length) K.endAct(a); }
    }
    K.basePose = (a) => {
      const R = a.R || F.rig(a), T = R.T, f = a.f;
      if (a.state === 'seated' || a.state === 'sit' || a.state === 'rise') {
        a.leanT = a.posture; a.tiltT = 0.04;
        const ty = a.tableY ?? (a.hy - T * 0.12);
        a.tgN = [a.hx + f * T * 0.22, ty]; a.tgF = [a.hx + f * T * 0.1, ty + 2];
        if (a.def.adult) { a.fN = { x: a.hx + f * T * 0.42, y: a.floorY }; a.fF = { x: a.hx + f * T * 0.3, y: a.floorY }; }
        else { a.fN = { x: a.hx + f * T * 0.3, y: a.floorY }; a.fF = { x: a.hx + f * T * 0.18, y: a.floorY }; }
        if (a.legsCrossed) { a.fN = { x: a.hx + f * T * 0.36, y: a.floorY - T * 0.1 }; }
      } else if (a.def.adult) { // planted-foot gait: stance foot moves back at exactly body speed, swing foot arcs forward
        const A = T * 0.105, wb = a.wb || 0, p = (((a.walkPh / TAU) % 1) + 1) % 1;
        const gait = (q) => q < 0.5 ? [A * (1 - 4 * q), 0] : [-A + 2 * A * smooth((q - 0.5) * 2), Math.sin(Math.PI * (q - 0.5) * 2) * T * 0.055];
        const gN = gait(p), gF = gait((p + 0.5) % 1), sw = Math.sin(a.t * 0.55 + a.id * 1.7);
        a.leanT = wb * 0.045 + a.posture * 0.6 + (1 - wb) * sw * 0.01; a.tiltT = 0;
        const hw = R.hw || T * 0.25; // standing feet sit under the hips (no X-crossed or splayed legs)
        a.fN = { x: a.hx + f * lerp(hw * 0.3 + T * 0.014 + sw * T * 0.006, gN[0], wb), y: a.floorY - gN[1] * wb };
        a.fF = { x: a.hx + f * lerp(-hw * 0.22 + T * 0.004, gF[0], wb), y: a.floorY - gF[1] * wb };
        const st = wb * gN[0] / A; // arms counter-swing the legs
        a.tgN = [a.hx + f * T * 0.07 - st * T * 0.09 * f, a.hy + T * 0.03 - Math.abs(st) * T * 0.02]; a.tgF = [a.hx - f * T * 0.03 + st * T * 0.09 * f, a.hy + T * 0.01 - Math.abs(st) * T * 0.02];
        if (a.hold.N && (a.carryUp !== false)) a.tgN = [a.hx + f * T * 0.24, a.hy - T * 0.2];
        if (a.hold.F && (a.carryUp !== false)) a.tgF = [a.hx + f * T * 0.13, a.hy - T * 0.17];
      } else {
        const st = a.walking ? Math.sin(a.walkPh) : 0, lift = a.walking ? 1 : 0;
        a.leanT = (a.walking ? 0.05 : 0) + a.posture * 0.6; a.tiltT = 0;
        a.fN = { x: a.hx + st * T * 0.13 + (a.walking ? 0 : f * T * 0.03), y: a.floorY - Math.max(0, Math.cos(a.walkPh)) * T * 0.05 * lift };
        a.fF = { x: a.hx - st * T * 0.13 - (a.walking ? 0 : f * T * 0.02), y: a.floorY - Math.max(0, -Math.cos(a.walkPh)) * T * 0.05 * lift };
        a.tgN = [a.hx + f * T * 0.04 - st * T * 0.12 * f, a.hy - T * 0.08]; a.tgF = [a.hx - f * T * 0.02 + st * T * 0.12 * f, a.hy - T * 0.1];
        if (a.hold.N && (a.carryUp !== false)) a.tgN = [a.hx + f * T * 0.24, a.hy - T * 0.34];
        if (a.hold.F && (a.carryUp !== false)) a.tgF = [a.hx + f * T * 0.12, a.hy - T * 0.3];
      }
      if (a.look) { if (K.simT > a.look.until) a.look = null; else a.lxT = clamp((a.look.x() - a.hx) / 60, -1, 1); }
      else if (!a.walking) a.lxT = a.faceDir ?? f * 0.85;
    };
    const ease = (v, t, r, dt) => v + (t - v) * (1 - Math.exp(-r * dt));
    K.ease = ease;
    function spring(h, tx, ty, w, dt) {
      const n = Math.ceil(dt * w / 0.4), st = dt / n;
      for (let i = 0; i < n; i++) { const ax = w * w * (tx - h.x) - 2 * w * h.vx, ay = w * w * (ty - h.y) - 2 * w * h.vy; h.vx += ax * st; h.vy += ay * st; h.x += h.vx * st; h.y += h.vy * st; }
    }
    function stepActor(a, dt) {
      a.t += dt; if (a.delay > 0) { a.delay -= dt; return; }
      if (a.walkTo != null && a.state === 'stand') {
        const dx = a.walkTo - a.hx, sp = a.walkSp * a.speed;
        if (a.def.adult) { // ease in / ease out, feet advance by distance actually covered (no skating)
          const acc = sp * 2.4, dist = Math.abs(dx);
          a.walking = dist > 1.2;
          if (a.walking) { if (Math.sign(dx) !== a.f) a.vel = Math.min(a.vel || 0, sp * 0.35);
            const vt = Math.min(sp, Math.sqrt(2 * acc * dist) + 6); a.vel = Math.min(vt, (a.vel || 0) + acc * dt); if ((a.vel || 0) > vt) a.vel = vt;
            const stp = Math.min(dist, a.vel * dt); a.hx += Math.sign(dx) * stp; a.walkPh += stp / (4 * a.def.T * 0.105 * a.sc) * TAU; a.f = Math.sign(dx); a.lxT = a.f; }
          else { a.walkTo = null; a.vel = 0; }
        } else {
          a.walking = Math.abs(dx) > 1.5;
          if (a.walking) { a.hx += Math.sign(dx) * Math.min(Math.abs(dx), sp * dt); a.walkPh += dt * sp * 0.11 / Math.max(0.5, a.sc); a.f = Math.sign(dx); a.lxT = a.f; }
          else a.walkTo = null;
        }
      } else { a.walking = false; a.vel = 0; }
      if (a.def.adult) { a.wb = a.walking ? Math.min(1, (a.wb || 0) + dt * 6) : Math.max(0, (a.wb || 0) - dt * 3.5); if (!a.walking && a.wb > 0) { const p = (((a.walkPh / TAU) % 1) + 1) % 1; const tgt = p < 0.5 ? 0.25 : 0.75; a.walkPh += clamp((tgt - p) * TAU, -dt * 6, dt * 6); } }
      if (a.fade) { a.alpha = clamp(a.alpha + a.fade * dt, 0, 1); if (a.alpha <= 0 && a.fade < 0) a.gone = true; if (a.alpha >= 1 && a.fade > 0) a.fade = 0; }
      if (a.state === 'stand') { a.hy = K.standHip(a); if (a.def.adult) { const wb = a.wb || 0; a.hy += (Math.cos(a.walkPh * 2) * 0.5 + 0.5) * a.def.T * a.sc * 0.012 * wb - (1 - wb) * Math.sin(a.t * 1.5 + a.id) * 0.6 * a.sc; } }
      else if (a.state === 'sit' || a.state === 'rise') {
        a.st += dt / 0.7; const u = smooth(clamp(a.st, 0, 1)), uu = a.state === 'sit' ? u : 1 - u;
        a.hy = lerp(K.standHip(a), a.seatY, uu);
        if (a.st >= 1) { a.state = a.state === 'sit' ? 'seated' : 'stand'; if (a.onSeated && a.state === 'seated') a.onSeated(a); }
      } else if (a.state === 'seated') a.hy = a.seatY;
      (a.pose || K.basePose)(a, K);
      runAct(a, dt);
      if (a.think && !a.act && K.simT >= (a.nextThink || 0)) { a.think(a, K); a.nextThink = K.simT + rand(0.1, 0.6); }
      const w = 9 * Math.sqrt(a.speed) * (a.quick || 1);
      a.lean = ease(a.lean, a.leanT, 6, dt); a.lx = ease(a.lx, a.lxT, 5 * a.speed, dt); a.tilt = ease(a.tilt, a.tiltT, 6, dt);
      a.hy += Math.sin(a.t * 1.7) * 0.012;
      if (!a.walking && !a.noLife) { // life layer: breathing, slow weight shifts, drifting gaze, tiny hand settle — nobody is ever a statue
        const ph = a.id * 1.37, t0 = a.t - dt, t1 = a.t, d = (fn) => fn(t1) - fn(t0), seat = a.state === 'seated';
        const calm = !a.act || /idle|wait|watch|listen|chat|stand|browse|arms|look|sway|seated|lean|phone|pose/.test(a.act.name);
        a.hy += Math.sin(t1 * 1.85 + ph) * 1.1 * a.sc;
        a.lean += d((t) => Math.sin(t * 0.43 + ph) * (seat ? 0.022 : 0.016) + Math.sin(t * 0.17 + ph * 2) * 0.01);
        if (calm) { a.lx += d((t) => Math.sin(t * 0.29 + ph * 2.1) * 0.32 + Math.sin(t * 0.71 + ph) * 0.1);
          const hx = d((t) => Math.sin(t * 0.9 + ph) * 1.6), hy = d((t) => Math.sin(t * 1.85 + ph) * 1.0 + Math.sin(t * 0.53 + ph * 3) * 1.4);
          a.hN.x += hx; a.hN.y += hy; a.hF.x -= hx * 0.7; a.hF.y += hy * 0.8; }
      }
      F.rig(a);
      spring(a.hN, a.tgN[0], a.tgN[1], w, dt); spring(a.hF, a.tgF[0], a.tgF[1], w * 0.9, dt);
      if (a.bub) { a.bub.t += dt; if (a.bub.t > a.bub.d) a.bub = null; }
    }
    /* ---------- drawing people ---------- */
    K.drawHeldItem = (c, a, which) => {
      const H = a.hold[which]; if (!H || !H.draw) return; const h = which === 'N' ? a.hN : a.hF;
      H.draw(c, h.x, h.y, a.sc, a, K);
    };
    K.drawBody = (c, a, withArms = true) => {
      const R = a.R; if (!R) return; const al = a.alpha ?? 1; if (al <= 0.01) return; if (al < 1) c.globalAlpha = al;
      const P = K.P;
      if (!a.noLegs) F.drawLegs(c, a, R, P);
      if (a.drawBack) a.drawBack(c, a, K);
      F.drawBackpack(c, a, R, P); F.headBack(c, a, R, P);
      if (!a.farFront) { F.drawArm(c, a, R, P, 'F'); K.drawHeldItem(c, a, 'F'); }
      F.drawTorso(c, a, R, P); F.drawHead(c, a, R, P);
      if (withArms) K.drawArms(c, a, true);
      c.globalAlpha = 1;
    };
    K.drawArms = (c, a, inner) => {
      const R = a.R; if (!R || (a.alpha ?? 1) <= 0.01) return; if (!inner) c.globalAlpha = a.alpha ?? 1;
      if (a.farFront) { F.drawArm(c, a, R, K.P, 'F'); K.drawHeldItem(c, a, 'F'); }
      F.drawArm(c, a, R, K.P, 'N'); K.drawHeldItem(c, a, 'N');
      if (a.drawFront) a.drawFront(c, a, K);
      if (!inner) c.globalAlpha = 1;
    };
    /* ---------- bubbles & icons ---------- */
    const FONT = spec.font || `700 15px ${typeof JP_FONT !== 'undefined' ? JP_FONT : 'sans-serif'}`;
    K.icon = (c, name, x, y, r) => {
      const ink = K.P.ink, L = K.L;
      if (spec.icon && spec.icon(c, name, x, y, r, K)) return;
      switch (name) {
        case 'heart': c.fillStyle = L('#e04a5a'); c.beginPath(); c.moveTo(x, y + r * 0.8); c.bezierCurveTo(x - r * 1.3, y - r * 0.1, x - r * 0.6, y - r * 1.1, x, y - r * 0.35); c.bezierCurveTo(x + r * 0.6, y - r * 1.1, x + r * 1.3, y - r * 0.1, x, y + r * 0.8); c.fill(); break;
        case 'star': c.fillStyle = L('#e8b52c'); c.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.42 : r, an = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } c.closePath(); c.fill(); break;
        case 'note': c.fillStyle = ink; ellipse(c, x - r * 0.35, y + r * 0.5, r * 0.36, r * 0.27, -0.4); c.fill(); c.fillRect(x - r * 0.06, y - r * 0.8, r * 0.14, r * 1.3); poly(c, [x + r * 0.06, y - r * 0.8, x + r * 0.7, y - r * 0.45, x + r * 0.7, y - r * 0.2, x + r * 0.06, y - r * 0.5]); c.fill(); break;
        case 'clock': c.fillStyle = L('#f4f0e6'); c.beginPath(); c.arc(x, y, r * 0.85, 0, TAU); c.fill(); c.strokeStyle = ink; c.lineWidth = r * 0.16; c.stroke(); F.line(c, x, y, x, y - r * 0.55, r * 0.14, ink); F.line(c, x, y, x + r * 0.4, y + r * 0.1, r * 0.14, ink); break;
        case 'q': case 'ex': c.fillStyle = name === 'q' ? L('#2f7f86') : L('#d4483a'); c.font = `800 ${r * 2}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name === 'q' ? '?' : '!', x, y + r * 0.08); break;
        case 'laugh': c.strokeStyle = ink; c.lineWidth = r * 0.2; c.lineCap = 'round'; for (const dx of [-0.4, 0.4]) { c.beginPath(); c.arc(x + dx * r, y - r * 0.05, r * 0.25, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); } c.fillStyle = L('#d4483a'); c.beginPath(); c.arc(x, y + r * 0.25, r * 0.45, 0, Math.PI); c.fill(); break;
        case 'sweat': c.fillStyle = L('#5ab0e0'); c.beginPath(); c.moveTo(x, y - r * 0.9); c.quadraticCurveTo(x + r * 0.7, y + r * 0.2, x, y + r * 0.7); c.quadraticCurveTo(x - r * 0.7, y + r * 0.2, x, y - r * 0.9); c.fill(); break;
        case 'cam': c.fillStyle = L('#2a2a30'); roundRect(c, x - r * 0.9, y - r * 0.5, r * 1.8, r * 1.15, r * 0.2); c.fill(); c.fillRect(x - r * 0.35, y - r * 0.75, r * 0.6, r * 0.3); c.fillStyle = L('#7ab0d0'); c.beginPath(); c.arc(x, y + r * 0.08, r * 0.36, 0, TAU); c.fill(); break;
        case 'sun': c.fillStyle = L('#f0a830'); c.beginPath(); c.arc(x, y, r * 0.5, 0, TAU); c.fill(); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; F.line(c, x + Math.cos(an) * r * 0.65, y + Math.sin(an) * r * 0.65, x + Math.cos(an) * r * 0.95, y + Math.sin(an) * r * 0.95, r * 0.14, L('#f0a830')); } break;
        case 'zzz': c.fillStyle = ink; c.font = `800 ${r * 1.3}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('z', x - r * 0.4, y + r * 0.3); c.font = `800 ${r}px sans-serif`; c.fillText('z', x + r * 0.4, y - r * 0.3); break;
        default: K.icon(c, 'star', x, y, r);
      }
    };
    K.drawBubble = (c, a) => {
      const b = a.bub, R = a.R; if (!b || !R || (a.alpha ?? 1) < 0.5) return;
      const pop = Math.min(1, b.t / 0.14), fade = clamp((b.d - b.t) / 0.25, 0, 1), sc = (0.6 + 0.4 * smooth(pop)) * Math.max(0.85, a.sc);
      let w, h = 34, kind = 'text', txt = b.c;
      if (txt.startsWith('icon:')) { kind = 'icon'; txt = txt.slice(5); w = 38; }
      else { c.font = FONT; w = Math.max(34, c.measureText(txt).width + 20); }
      const side = a.f || 1, bx = clamp(R.cx + side * R.R * 0.6, 40 + w / 2, BW - 40 - w / 2), by = R.cy - R.R * (a.def.hat ? 2.0 : 1.3) - 12;
      c.save(); c.globalAlpha = fade; c.translate(bx, by); c.scale(sc, sc);
      c.fillStyle = 'rgba(0,0,0,0.12)'; roundRect(c, -w / 2 + 2, -h + 3, w, h, h / 2); c.fill();
      c.fillStyle = K.P.bubble; roundRect(c, -w / 2, -h, w, h, h / 2); c.fill();
      const tx = clamp((R.cx - bx) / sc, -w / 2 + 10, w / 2 - 10); poly(c, [tx - 6, -2, tx + 6, -2, tx + (R.cx > bx ? 6 : -6), 9]); c.fill();
      if (kind === 'text') { c.fillStyle = K.P.ink; c.font = FONT; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, -h / 2 + 1); }
      else K.icon(c, txt, 0, -h / 2, 10);
      c.restore();
    };
    K.drawEffects = (c) => {
      for (const e of K.effects) {
        const u = e.t / e.life;
        if (spec.effect && spec.effect(c, e, u, K)) continue;
        if (e.k === 'spark') { c.strokeStyle = rgba(K.L(e.col || '#e8b52c'), 1 - u); c.lineWidth = 2; for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + (i - 2.5) * 0.45, r0 = 6 + u * 10, r1 = 12 + u * 16; c.beginPath(); c.moveTo(e.x + Math.cos(an) * r0, e.y + Math.sin(an) * r0); c.lineTo(e.x + Math.cos(an) * r1, e.y + Math.sin(an) * r1); c.stroke(); } }
        else if (e.k === 'puff') { c.fillStyle = rgba(e.col || '#ffffff', 0.5 * (1 - u)); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(e.x + (i - 1) * 8, e.y - u * 30 - i * 4, 6 + u * 10, 0, TAU); c.fill(); } }
        else if (e.k === 'flash') { c.save(); c.globalCompositeOperation = 'lighter'; const al = Math.max(0, 1 - e.t / 0.35); c.fillStyle = radial(c, e.x, e.y, 60, [[0, `rgba(255,255,255,${al})`], [0.25, `rgba(220,235,255,${al * 0.5})`], [1, 'rgba(200,220,255,0)']]); c.fillRect(e.x - 60, e.y - 60, 120, 120); c.restore(); }
      }
    };
    /* ---------- scene helpers ---------- */
    K.shafts = (c, list, col, alpha) => { // list of [x0top, x1top, x0bot, x1bot, ytop, ybot]
      const a = alpha ?? K.P.shaftA ?? 0.15; if (a <= 0.005) return;
      c.save(); c.globalCompositeOperation = 'screen';
      for (const [a0, a1, b0, b1, y0, y1] of list) { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, rgba(col || K.P.shaft || '#fff3dc', a)); g.addColorStop(1, rgba(col || K.P.shaft || '#fff3dc', 0)); c.fillStyle = g; poly(c, [a0, y0, a1, y0, b1, y1, b0, y1]); c.fill(); }
      c.restore();
    };
    K.glow = (c, x, y, r, col, a) => { if (a <= 0.003) return; c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = radial(c, x, y, r, [[0, rgba(col, a)], [0.4, rgba(col, a * 0.4)], [1, rgba(col, 0)]]); c.fillRect(x - r, y - r, r * 2, r * 2); c.restore(); };
    const rndS = mulberry32(991);
    const STARS = Array.from({ length: 60 }, () => [rndS(), rndS(), rndS()]);
    const FLAKES = Array.from({ length: 60 }, () => ({ x: rndS(), y: rndS(), s: 0.5 + rndS(), ph: rndS() * 6 }));
    const DROPS = Array.from({ length: 50 }, () => ({ x: rndS(), y: rndS(), s: 0.6 + rndS() * 0.6 }));
    K.sky = (c, x0, y0, x1, y1, o = {}) => { // flat banded sky with sun / moon / stars / clouds; caller clips
      const P = K.P, h = P.hour, w = x1 - x0, hh = y1 - y0;
      c.fillStyle = linear(c, 0, y0, 0, y1, [[0, P.sky0], [1, P.sky1]]); c.fillRect(x0, y0, w, hh);
      const n = P.night;
      if (n > 0.2) { c.fillStyle = rgba('#fff8e8', (n - 0.2) * 0.9); for (const [sx, sy, sz] of STARS) { if (sy > 0.7) continue; const tw = 0.5 + 0.5 * Math.sin(K.t * 2 + sx * 40); c.globalAlpha = tw; c.fillRect(x0 + sx * w, y0 + sy * hh * 0.7, 1 + sz * 1.6, 1 + sz * 1.6); } c.globalAlpha = 1; }
      let hr = ((h % 24) + 24) % 24; const day = hr > 6 && hr < 19.5;
      if (!o.noSun) {
        if (day) { const u = (hr - 6) / 13.5, sx = x0 + w * (0.15 + 0.7 * u), sy = y0 + hh * (0.75 - Math.sin(u * Math.PI) * 0.6); c.fillStyle = rgba(P.sun || '#fff0c8', 0.9); c.beginPath(); c.arc(sx, sy, o.sunR || 18, 0, TAU); c.fill(); K.glow(c, sx, sy, (o.sunR || 18) * 3.5, P.sun || '#fff0c8', 0.25); }
        else { const u = ((hr + 24 - 19.5) % 24) / 10.5, sx = x0 + w * (0.2 + 0.6 * u), sy = y0 + hh * (0.6 - Math.sin(u * Math.PI) * 0.45); c.fillStyle = '#f4ecd8'; c.beginPath(); c.arc(sx, sy, (o.sunR || 18) * 0.8, 0, TAU); c.fill(); c.fillStyle = P.sky0; c.beginPath(); c.arc(sx + 6, sy - 3, (o.sunR || 18) * 0.7, 0, TAU); c.fill(); }
      }
      if (!o.noClouds) { c.fillStyle = rgba(P.cloud || '#ffffff', 0.55 * (1 - n * 0.7)); for (let i = 0; i < 3; i++) { const cx = x0 + (((K.t * (4 + i * 2) + i * 230) % (w + 200)) - 100), cy = y0 + hh * (0.15 + i * 0.12); ellipse(c, cx, cy, 34 + i * 8, 9); c.fill(); ellipse(c, cx + 16, cy - 6, 20, 9); c.fill(); } }
    };
    K.weather = (c, x0, y0, x1, y1, wind = 0) => { // rain / snow falling in a window rect (caller clips)
      const wt = K.weatherNow, w = x1 - x0, h = y1 - y0;
      if (wt === 'snow') { c.fillStyle = 'rgba(255,255,255,0.9)'; for (const f of FLAKES) { const y = y0 + ((f.y * h + K.t * 22 * f.s) % h), x = x0 + ((f.x * w + Math.sin(K.t + f.ph) * 8 + wind * K.t * 10) % w + w) % w; c.beginPath(); c.arc(x, y, 1.2 + f.s * 1.4, 0, TAU); c.fill(); } }
      else if (wt === 'rain' || wt === 'storm') { c.strokeStyle = 'rgba(210,225,245,0.55)'; c.lineWidth = 1.3; c.beginPath(); for (const d of DROPS) { const y = y0 + ((d.y * h + K.t * 380 * d.s) % h), x = x0 + d.x * w; c.moveTo(x, y); c.lineTo(x - 3 - wind * 4, y + 14 * d.s); } c.stroke(); }
    };
    /* ---------- lifecycle ---------- */
    function resize(w, h) {
      W = w; H = h;
      if (W / H < 1.3) { k = H / BH; oy = 0; ox = W / 2 - 640 * k; }
      else { k = (W / BW) * 1.03; oy = W / H >= BW / BH ? (H - BH * k) * 0.45 : 0; ox = (W - BW * k) / 2; }
      K.extraB = Math.max(0, (H - (oy + BH * k)) / k);
      panR = W / H < 1.3 ? Math.max(0, (BW * k - W) / 2 / k - 30) : 0;
      vign = (() => { const [cv, x] = hiCanvas(W, H, 1); const g = x.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.4, W / 2, H * 0.5, Math.max(W, H) * 0.8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, spec.vign || 'rgba(20,10,20,0.32)'); x.fillStyle = g; x.fillRect(0, 0, W, H); return cv; })();
      makeGrain();
    }
    function sim(dt) {
      K.simT += dt; K.dt = dt;
      for (let i = K.timers.length - 1; i >= 0; i--) if (K.simT >= K.timers[i].t) { const t = K.timers[i]; K.timers.splice(i, 1); t.fn(); }
      if (spec.sim) spec.sim(K, dt);
      for (const a of K.actors.slice()) stepActor(a, dt);
      for (let i = K.actors.length - 1; i >= 0; i--) if (K.actors[i].gone) { const a = K.actors[i]; K.actors.splice(i, 1); if (spec.onGone) spec.onGone(K, a); }
      for (const e of K.effects) e.t += dt; K.effects = K.effects.filter((e) => e.t < e.life);
    }
    K.hourFromP = spec.hourFromP || ((p) => (spec.startHour ?? 9) + clamp(p, 0, 1) * (spec.span ?? 15));
    function draw(ctx, t, dt, env) {
      use(pal);
      const wth0 = S.weather || Amb.st.weather || 'clear';
      if (!built) { K.weatherNow = wth0; K.P = pal.at(K.hourFromP(env.p || 0), wth0); spec.build(K); built = true; }
      dt = Math.min(dt, 0.1); K.t = t;
      let hour;
      if (S.hourOverride != null) hour = S.hourOverride;
      else if (S.lapse) { S.lapseH += dt * S.lapse; hour = S.lapseH; }
      else hour = K.hourFromP(env.p || 0);
      K.weatherNow = wth0; K.hour = hour; K.P = pal.at(hour, wth0);
      let simDt = dt * S.timeScale; while (simDt > 0) { const st = Math.min(simDt, 0.05); sim(st); simDt -= st; }
      for (const e of env.events || []) if (e.type === 'clear' && e.t > lastEv) { lastEv = e.t; if (spec.onClear) spec.onClear(K, !!e.big, e.n || 1); }
      const cam = panR ? Math.sin(t * 0.045) * panR + (env.mx || 0) * 8 : Math.sin(t * 0.05) * 4 + (env.mx || 0) * 8;
      K.cam = cam;
      ctx.save(); ctx.translate(ox, oy); ctx.scale(k, k); ctx.translate(-cam, 0);
      spec.draw(ctx, t, K);
      ctx.restore();
      if (grainCtx !== ctx) { grainPat = ctx.createPattern(grainCv, 'repeat'); grainCtx = ctx; }
      ctx.save(); ctx.globalAlpha = spec.grain ?? 0.06; ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = grainPat; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.drawImage(vign, 0, 0, W, H);
      if (Amb.st.flash) { ctx.fillStyle = `rgba(220,230,255,${Amb.st.flash * 0.18})`; ctx.fillRect(0, 0, W, H); }
      if (!env.thumb) window.__geo = { id: spec.id, K, S, setHour: (h) => { S.hourOverride = h; }, lapse: (rate, from) => { S.hourOverride = null; S.lapse = rate; if (from != null) S.lapseH = from; }, timeScale: (v) => { S.timeScale = v; }, weather: (w) => { S.weather = w; }, get debug() { return spec.debug ? spec.debug(K) : null; }, get view() { return { ox, oy, k, cam: K.cam || 0, W, H }; } };
    }
    return { resize, draw, selfGrade: true, K, get zone() { return spec.zone || K.P.zone; } };
  }
  return { palette, stage, use, lit, poly, body };
})();

/* ---------- ZoneMask: calm backdrop behind the well + HOLD/NEXT in EVERY world (called by BG after each stage draw) ---------- */
const ZoneMask = (() => {
    /* board-zone backdrop: everything behind the well + HOLD / NEXT panels is softly blurred and dimmed so no text,
       figures or high-contrast detail compete with the stack (applies to every GeoKit world) */
  let zoneR = null, zoneAt = -1, zc1 = null, zc2 = null, zc3 = null, avgC = null, avgAt = -1;
  function zoneRect(ctx, t) {
      if (t - zoneAt < 0.5 && zoneR !== undefined) return zoneR; zoneAt = t; zoneR = null;
      if (typeof document === 'undefined') return null; const cv = ctx.canvas; if (!cv.getBoundingClientRect) return null;
      const cr = cv.getBoundingClientRect(); if (!cr.width) return null; const sx = cv.width / cr.width, sy = cv.height / cr.height;
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const id of ['matrix', 'pl', 'pr']) { const e = document.getElementById(id); if (!e || !e.offsetParent) continue; const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); }
      const g = document.getElementById('game'); if (x1 < 0 || (g && g.offsetParent === null && getComputedStyle(g).display === 'none')) return null;
      const pad = 10; zoneR = { x: Math.max(0, (x0 - cr.left - pad) * sx), y: Math.max(0, (y0 - cr.top - pad) * sy), w: (x1 - x0 + pad * 2) * sx, h: (y1 - y0 + pad * 2) * sy, r: 16 * sx };
      zoneR.w = Math.min(zoneR.w, cv.width - zoneR.x); zoneR.h = Math.min(zoneR.h, cv.height - zoneR.y); if (zoneR.w < 20 || zoneR.h < 20) zoneR = null;
      return zoneR;
    }
  function draw(ctx, t, tint) {
      const z = zoneRect(ctx, t); if (!z) return;
      const w1 = Math.max(8, Math.round(z.w / 6)), h1 = Math.max(8, Math.round(z.h / 6)), w2 = Math.max(4, Math.round(z.w / 18)), h2 = Math.max(4, Math.round(z.h / 18));
      if (!zc1 || zc1.width !== w1 || zc1.height !== h1) { zc1 = makeCanvas(w1, h1); } if (!zc2 || zc2.width !== w2 || zc2.height !== h2) { zc2 = makeCanvas(w2, h2); }
      const a = zc1.getContext('2d'), b = zc2.getContext('2d'); a.imageSmoothingEnabled = b.imageSmoothingEnabled = true;
      a.drawImage(ctx.canvas, z.x, z.y, z.w, z.h, 0, 0, w1, h1); b.drawImage(zc1, 0, 0, w2, h2);
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(z.x, z.y, z.w, z.h, z.r); else ctx.rect(z.x, z.y, z.w, z.h); ctx.clip();
      ctx.imageSmoothingEnabled = true; ctx.drawImage(zc2, z.x - z.w * 0.03, z.y - z.h * 0.03, z.w * 1.06, z.h * 1.06);
      // flatten: lay the zone's own average colour over the blur so no silhouette (people, signs, facades) survives behind the board / HUD
      if (t - avgAt > 0.4 || !avgC) { avgAt = t; try { if (!zc3) zc3 = makeCanvas(1, 1); const q = zc3.getContext('2d'); q.drawImage(zc2, 0, 0, 1, 1); const px = q.getImageData(0, 0, 1, 1).data; avgC = `rgba(${px[0]},${px[1]},${px[2]},0.62)`; } catch (e) { avgC = 'rgba(30,26,30,0.5)'; } }
      ctx.fillStyle = avgC; ctx.fillRect(z.x, z.y, z.w, z.h);
      ctx.fillStyle = tint || 'rgba(22,20,28,0.42)'; ctx.fillRect(z.x, z.y, z.w, z.h);
      ctx.restore();
    }
  return { draw, rect: () => zoneR };
})();
