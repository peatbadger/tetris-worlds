/* ================= Scene kit: purposeful agents (generator scripts), poses, props, decor ================= */
const Crowd = (() => {
  // An agent runs a generator "life" script. Yield commands:
  //   ['walk', x, y]        walk (in scene px) at agent speed
  //   ['wait', secs]        hold current act
  //   ['until', fn]         wait until fn() is truthy
  // Agents expose: act (pose name), item (hand prop fn), look (head target x), mood, bubble etc.
  function agent(P, x, y, opt = {}) {
    return Object.assign({ P, x, y, tx: x, ty: y, speed: 60, walking: false, phase: Math.random() * 6, face: 1, act: 'stand', actT: 0, wait: 0, until: null, co: null, done: false,
      item: null, item2: null, mood: 'smile', look: null, seed: Math.floor(Math.random() * 1000), cheer: 0, react: 0, scale: 1, z: 0, sitting: false }, opt);
  }
  function run(a, gen) { a.co = gen; a.wait = 0; a.until = null; a.walking = false; }
  function update(a, dt, u) {
    a.actT += dt; a.cheer = Math.max(0, a.cheer - dt); a.react = Math.max(0, a.react - dt);
    if (a.walking) {
      const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy), step = a.speed * u * dt;
      if (Math.abs(dx) > 0.5) a.face = dx > 0 ? 1 : -1;
      if (d <= step) { a.x = a.tx; a.y = a.ty; a.walking = false; } else { a.x += dx / d * step; a.y += dy / d * step; a.phase += dt * a.speed * 0.11; }
      if (a.walking) return;
    }
    if (a.wait > 0) { a.wait -= dt; if (a.wait > 0) return; }
    if (a.until) { if (!a.until()) return; a.until = null; }
    if (!a.co) return;
    for (let guard = 0; guard < 8; guard++) {
      const r = a.co.next();
      if (r.done) { a.co = null; a.done = true; return; }
      const c = r.value; if (!c) continue;
      if (c[0] === 'walk') { a.tx = c[1]; a.ty = c[2]; a.walking = Math.hypot(a.tx - a.x, a.ty - a.y) > 0.5; if (a.walking) { a.act = a.carry ? 'carry' : 'walk'; return; } }
      else if (c[0] === 'wait') { a.wait = c[1]; return; }
      else if (c[0] === 'until') { a.until = c[1]; if (!a.until()) return; a.until = null; }
    }
  }
  // queue helper: spots[0] is the front; agents hold a ticket index
  function queue(spots) {
    const q = { spots, list: [] };
    q.join = (a) => { q.list.push(a); };
    q.pos = (a) => q.list.indexOf(a);
    q.spot = (a) => q.spots[Math.min(q.pos(a), q.spots.length - 1)];
    q.leave = (a) => { const i = q.list.indexOf(a); if (i >= 0) q.list.splice(i, 1); };
    return q;
  }
  // a generator that walks along the queue until the agent is at the front
  function* waitInQueue(q, a) {
    q.join(a);
    while (true) {
      const sp = q.spot(a);
      if (Math.hypot(sp[0] - a.x, sp[1] - a.y) > 1) { a.act = 'walk'; yield ['walk', sp[0], sp[1]]; }
      a.act = 'stand'; a.look = sp[2] ?? null;
      if (q.pos(a) === 0) return;
      yield ['wait', 0.25];
    }
  }
  // build a pose for People.draw from agent state
  function pose(a, t, opt = {}) {
    const P = a.P, s = P.shape, bl = People.blinkAt(t, a.seed);
    const breath = Math.sin(t * 1.8 + a.seed) * 1;
    const ps = { breath, flip: a.face < 0, face: { blink: bl, mouth: a.mood, open: 0 }, head: { turn: 0, tilt: Math.sin(t * 0.4 + a.seed) * 0.03 }, arms: [] };
    const ha = (side, x, y, extra = {}) => ps.arms.push(Object.assign({ side, x, y }, extra));
    const rest = (side) => ha(side, side * (s.sw + 0.5), 48.5, { grip: 'fist', item: side < 0 ? a.item : null });
    const act = a.cheer > 0 ? 'cheer' : a.act;
    if (!a.sitting && !opt.noLegs) ps.legs = (a.walking || act === 'walk' || act === 'carry') ? People.walkLegs(a.phase) : (a.seed % 2 ? People.STAND2 : People.STAND);
    else if (a.sitting && a.seat && a.seat.legs) { const sw = Math.sin(t * 1.3 + a.seed) * 2, st = a.seat.legs === 'stool'; ps.legs = st ? { k1: [-9, 72], f1: [-10 + sw, 104], k2: [9, 72], f2: [11 - sw * 0.6, 102] } : { k1: [-9, 76], f1: [-11 + sw * 0.5, 116], k2: [9, 76], f2: [11, 116] }; }
    if (a.walking) ps.lean = 0.03 * a.face * (ps.flip ? -1 : 1);
    const lk = a.look; if (lk !== null && lk !== undefined) ps.head.turn = clamp((lk - a.x) / 120, -1, 1) * (a.face < 0 ? -1 : 1);
    const k = a.actT;
    switch (act) {
      case 'walk': { const sw = Math.sin(a.phase); ha(-1, -s.sw - 0.5 + sw * 2.2, 47.5 - Math.abs(sw) * 1.2, { grip: 'fist', item: a.item }); if (a.item2) ha(1, 14, 28, { grip: 'fist', item: a.item2 }); else ha(1, s.sw + 0.5 + sw * 2.2, 47.5 - Math.abs(sw) * 1.2, { grip: 'fist' }); ps.face.mouth = a.mood; break; }
      case 'carry': ha(-1, -9, 30, { grip: 'fist' }); ha(1, 9, 30, { grip: 'fist' }); ps.over = a.carry; break;
      case 'point': { const p = 0.5 + 0.5 * Math.sin(k * 3); rest(-1); ha(1, 30, 14 + p * 4, { grip: 'point' }); ps.head.turn = 0.6; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 9)) * 0.6; ps.face.lookX = 1; break; }
      case 'talk': rest(-1); ha(1, 18 + Math.sin(k * 2) * 4, 28 + Math.cos(k * 3) * 5, { grip: 'open', item: a.item2 }); ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 8)) * 0.7; ps.head.nod = Math.sin(k * 4) * 0.4; break;
      case 'pay': rest(-1); ha(1, 26, 22, { grip: 'fist', item: a.item2 || Items.card }); ps.face.mouth = 'smile'; break;
      case 'take': rest(-1); ha(1, 24 - Math.min(1, k) * 10, 22 + Math.min(1, k) * 8, { grip: 'fist', item: a.item2 }); ps.face.mouth = 'big'; ps.face.eyes = k < 1.2 ? 'happy' : null; break;
      case 'hold': rest(-1); ha(1, 12, 26, { grip: 'fist', item: a.item2 }); break;
      case 'holdBoth': ha(-1, -6, 32, { grip: 'fist', item: a.item }); ha(1, 6, 32, { grip: 'fist' }); break;
      case 'taste': { const c = (k % 2.4) / 2.4, up = c < 0.4 ? smooth(c / 0.4) : c < 0.6 ? 1 : 1 - smooth((c - 0.6) / 0.4); rest(-1); ha(1, lerp(16, 3, up), lerp(30, -10, up), { grip: 'fist', item: Items.spoon }); ps.face.mouth = up > 0.8 ? 'o' : c > 0.6 ? 'big' : 'smile'; ps.face.eyes = c > 0.65 ? 'happy' : null; ps.face.brow = c > 0.65 ? 1 : 0; break; }
      case 'lick': case 'eat': case 'drink': case 'bite': {
        const per = act === 'drink' ? 4 : 3, c = (k % per) / per, up = c < 0.3 ? smooth(c / 0.3) : c < 0.55 ? 1 : 1 - smooth((c - 0.55) / 0.45);
        rest(-1); ha(1, lerp(14, 4, up), lerp(32, -6, up), { grip: 'fist', item: a.item2 });
        ps.face.mouth = up > 0.85 ? (act === 'lick' ? 'lick' : act === 'drink' ? 'o' : 'chew') : c > 0.55 && c < 0.85 && act !== 'drink' ? 'chew' : a.mood;
        ps.face.open = up > 0.85 ? 0.6 : Math.abs(Math.sin(k * 10)) * 0.5; ps.face.eyes = up > 0.9 && act !== 'drink' ? 'closed' : null; ps.head.nod = up * 0.8; break;
      }
      case 'cheer': ha(-1, -22, -26 + Math.sin(t * 12) * 3, { grip: 'open' }); ha(1, 22, -26 + Math.cos(t * 12) * 3, { grip: 'open' }); ps.face.mouth = 'laugh'; ps.face.open = 0.8; ps.face.eyes = 'happy'; ps.face.brow = 1; break;
      case 'wave': rest(-1); ha(1, 24, -14 + Math.sin(t * 9) * 2, { grip: 'open', handAng: -1.3 + Math.sin(t * 9) * 0.4 }); ps.face.mouth = 'big'; break;
      case 'brush': { const b = Math.sin(k * 10); ha(-1, 10 + b * 3, 4, { grip: 'open' }); ha(1, -10 - b * 3, 6, { grip: 'open' }); ps.head.nod = 1; ps.face.mouth = 'flat'; ps.face.eyes = 'closed'; break; }
      case 'sing': rest(-1); rest(1); ps.face.mouth = 'open'; ps.face.open = 0.5 + 0.4 * Math.sin(k * 5); ps.face.eyes = 'happy'; ps.head.tilt = Math.sin(k * 3) * 0.12; break;
      case 'clap': { const c = Math.abs(Math.sin(k * 9)); ha(-1, -3 - c * 5, 22, { grip: 'open', handAng: 0 }); ha(1, 3 + c * 5, 22, { grip: 'open', handAng: Math.PI }); ps.face.mouth = 'big'; ps.face.eyes = 'happy'; break; }
      case 'laugh': { const b = Math.sin(k * 14); rest(-1); ha(1, 10, 34 + b, { grip: 'open' }); ps.face.mouth = 'laugh'; ps.face.open = 0.6 + 0.3 * Math.abs(b); ps.face.eyes = 'happy'; ps.head.tilt = -0.12 + b * 0.04; ps.lean = -0.04; break; }
      case 'read': ha(-1, -8, 24, { grip: 'fist', item: (c, x, y) => { c.save(); c.translate(x + 7, y - 6); c.fillStyle = a.menuCol || '#7a1a1a'; c.fillRect(-9, -7, 18, 13); c.fillStyle = '#f4ead8'; c.fillRect(-8, -6, 16, 11); c.fillStyle = 'rgba(80,50,30,0.6)'; for (let r = 0; r < 4; r++) c.fillRect(-6, -4 + r * 2.6, 9 - (r % 2) * 3, 0.8); c.restore(); } }); ha(1, 8, 24, { grip: 'fist' }); ps.face.lookY = 1; ps.head.nod = 1.5; ps.face.mouth = 'flat'; break;
      case 'toast': { const up = smooth(Math.min(1, k / 0.6)); rest(-1); ha(1, 18 - up * 4, 26 - up * 34, { grip: 'fist', item: a.item2 }); ps.face.mouth = 'laugh'; ps.face.open = 0.6; ps.face.eyes = 'happy'; ps.head.tilt = -0.06; break; }
      case 'blow': { rest(-1); ha(1, 8, 4, { grip: 'fist', item: a.item2 }); ps.face.mouth = 'o'; ps.face.open = 0.3 + 0.2 * Math.sin(k * 6); ps.head.nod = 0.8; ps.face.lookY = 1; break; }
      case 'slurp': { const c = (k % 2.2) / 2.2; ha(-1, -6, 22, { grip: 'fist', item: a.item }); ha(1, 6, 2 + Math.sin(c * TAU) * 3, { grip: 'fist', item: a.item2 }); ps.face.mouth = 'o'; ps.face.open = 0.5; ps.face.eyes = c < 0.6 ? 'closed' : 'happy'; ps.head.nod = 2; ps.head.tilt = Math.sin(k * 8) * 0.04; break; }
      case 'pourTea': { const c = Math.min(1, k / 1.2); ha(-1, -2, 30, { grip: 'fist', item: Items.teacup }); ha(1, 18, 18 - c * 4, { grip: 'fist', item: a.item2 || Items.teapot, handAng: -c * 0.6 }); ps.face.lookY = 1; ps.head.nod = 1; break; }
      case 'tap': { const b = Math.abs(Math.sin(k * 10)); rest(-1); ha(1, 16, 40 - b * 3, { grip: 'point' }); ps.face.mouth = 'smile'; ps.head.nod = b * 0.6; break; }
      case 'squeeze': { const c = Math.abs(Math.sin(k * 5)); ha(-1, -4, 34, { grip: 'fist', item: a.item }); ha(1, 4 + c * 2, 26 - c * 2, { grip: 'fist', item: (cc, x, y) => { ellipse(cc, x + 2, y - 1, 2.6, 2); cc.fillStyle = '#9ad040'; cc.fill(); } }); ps.face.lookY = 1; ps.head.nod = 1.2; ps.face.mouth = 'flat'; break; }
      case 'phone': ha(-1, -2, 20, { grip: 'fist', item: Items.phone }); rest(1); ps.head.nod = 2; ps.face.lookY = 1; ps.face.mouth = 'flat'; break;
      case 'arms': ha(-1, 8, 30, { grip: 'fist' }); ha(1, -8, 32, { grip: 'fist' }); break;
      default: rest(-1); rest(1);
    }
    if (a.react > 0 && act !== 'cheer') { ps.head.turn = clamp(ps.head.turn + 0.8 * (opt.boardDir || 1), -1, 1); ps.face.brow = 1; ps.face.mouth = 'o'; ps.face.open = 0.5; }
    if (opt.tweak) opt.tweak(ps);
    return ps;
  }
  function draw(ctx, a, t, sc, opt) { const ps = pose(a, t, opt); if (a.extraPose) a.extraPose(ps, t); if (opt && opt.only) ps.only = opt.only; if (opt && opt.noArms) ps.noArms = true; return People.draw(ctx, a.P, a.x, a.y - (a.sitting ? 0 : 122 * sc * a.P.scale * (a.scale || 1)), Object.assign(ps, { scale: a.scale })); }
  // run a temporary script on an agent, then resume exactly where its own life left off (waits, untils, walks)
  function hijack(a, gen) {
    const sv = { co: a.co, until: a.until, wait: a.wait, act: a.act, walking: a.walking, tx: a.tx, ty: a.ty };
    a.until = null; a.wait = 0; a.walking = false;
    a.co = (function* () { yield* gen; a.co = sv.co; a.until = sv.until; a.act = sv.act; if (sv.walking) { a.tx = sv.tx; a.ty = sv.ty; a.walking = true; } yield ['wait', sv.wait || 0]; })();
  }
  return { agent, run, update, queue, waitInQueue, pose, draw, hijack };
})();

/* ---------- hand props (drawn in person-local units, at the hand) ---------- */
const Items = (() => {
  const I = {};
  I.card = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.3); c.fillStyle = '#2a5ab0'; roundRect(c, -1, -3, 9, 6, 1); c.fill(); c.fillStyle = '#e8c050'; c.fillRect(1, -1.5, 2, 1.6); c.restore(); };
  I.cash = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.4); c.fillStyle = '#7ab070'; c.fillRect(-1, -3, 10, 5); c.strokeStyle = '#3a6a3a'; c.lineWidth = 0.4; c.strokeRect(0, -2.4, 8, 3.8); c.restore(); };
  I.phone = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.2); c.fillStyle = '#1a1a22'; roundRect(c, -3, -6, 6, 11, 1.2); c.fill(); c.fillStyle = '#6ab0ff'; c.fillRect(-2.3, -5, 4.6, 8.5); c.restore(); };
  I.spoon = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.6); c.fillStyle = '#f0e8a0'; c.fillRect(0, -0.5, 8, 1); ellipse(c, 9, 0, 1.8, 1.2); c.fillStyle = '#f6a0b4'; c.fill(); c.restore(); };
  I.napkin = (c, x, y) => { c.fillStyle = '#f6f2ea'; c.beginPath(); c.moveTo(x, y - 3); c.lineTo(x + 6, y - 1); c.lineTo(x + 3, y + 4); c.closePath(); c.fill(); };
  I.cone = (scoops, flavors, drip) => (c, x, y) => {
    c.save(); c.translate(x + 1, y - 2);
    c.beginPath(); c.moveTo(-4, 0); c.lineTo(4, 0); c.lineTo(0, 12); c.closePath(); c.fillStyle = '#d8a050'; c.fill();
    c.strokeStyle = 'rgba(120,70,20,0.6)'; c.lineWidth = 0.4; for (let k = -3; k <= 3; k += 2) { c.beginPath(); c.moveTo(k, 0); c.lineTo(k * 0.2 + 1.5, 9); c.moveTo(-k, 0); c.lineTo(-k * 0.2 - 1.5, 9); c.stroke(); }
    for (let i = 0; i < scoops; i++) { const f = flavors[i % flavors.length]; ellipse(c, (i % 2 ? 0.6 : -0.4), -2.2 - i * 3.6, 4.4 - i * 0.3, 3.4); c.fillStyle = f; c.fill(); c.fillStyle = 'rgba(255,255,255,0.4)'; ellipse(c, -1.4, -3.2 - i * 3.6, 1.4, 0.8); c.fill(); }
    if (drip && scoops) { c.fillStyle = flavors[0]; c.fillRect(2.6, -1, 1, 2.5 + drip * 2); ellipse(c, 3.1, 1.5 + drip * 2, 0.8, 0.9); c.fill(); }
    c.restore();
  };
  I.cup = (scoops, flavors) => (c, x, y) => { c.save(); c.translate(x + 1, y - 3); for (let i = 0; i < scoops; i++) { ellipse(c, 0, -2 - i * 2.6, 4, 2.8); c.fillStyle = flavors[i % flavors.length]; c.fill(); } c.beginPath(); c.moveTo(-5, -1); c.lineTo(5, -1); c.lineTo(3.6, 6); c.lineTo(-3.6, 6); c.closePath(); c.fillStyle = '#f4f0ff'; c.fill(); c.fillStyle = '#f06a9a'; c.fillRect(-4.6, 1, 9.2, 1.6); c.fillStyle = '#f0e8a0'; c.fillRect(1, -9, 0.8, 7); c.restore(); };
  I.box = (c, x, y) => { // white pastry box tied with blue-and-white string
    c.save(); c.translate(x, y + 2);
    c.fillStyle = linear(c, -9, 0, 9, 0, [[0, '#d8d8d8'], [0.4, '#ffffff'], [1, '#c8c8c8']]); c.fillRect(-9, -4, 18, 10); c.fillStyle = '#eeeeee'; c.fillRect(-9.5, -5.2, 19, 1.6);
    c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.8; c.setLineDash([1.2, 1.2]); c.beginPath(); c.moveTo(0, -5); c.lineTo(0, 6); c.moveTo(-9, 1); c.lineTo(9, 1); c.stroke(); c.setLineDash([]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 0.4; c.beginPath(); c.moveTo(0.3, -5); c.lineTo(0.3, 6); c.stroke();
    c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.7; c.beginPath(); c.ellipse(-1.6, -6, 1.8, 1, -0.4, 0, TAU); c.ellipse(1.6, -6, 1.8, 1, 0.4, 0, TAU); c.stroke();
    c.fillStyle = '#2a4a8a'; c.font = 'italic bold 3px Georgia, serif'; c.textAlign = 'center'; c.fillText("Mike's", -4.4, -1);
    c.restore();
  };
  I.cannoli = (c, x, y) => { c.save(); c.translate(x + 2, y - 1); c.rotate(-0.5); roundRect(c, -6, -1.8, 12, 3.6, 1.8); c.fillStyle = '#d08a3a'; c.fill(); [-6, 6].forEach((d) => { ellipse(c, d, 0, 1.6, 1.9); c.fillStyle = '#fbf6ea'; c.fill(); }); c.fillStyle = '#2a140a'; c.fillRect(5.6, -0.6, 0.7, 0.7); c.fillRect(-6.3, 0.2, 0.7, 0.7); c.restore(); };
  I.chopsticks = (food) => (c, x, y, ang) => { c.save(); c.translate(x, y); c.rotate(ang - 0.3); c.strokeStyle = '#c8a070'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(-2, -1); c.lineTo(14, -1.5); c.moveTo(-2, 1); c.lineTo(14, 0.4); c.stroke(); if (food) { ellipse(c, 14.5, -0.5, 2.6, 2.2); c.fillStyle = food; c.fill(); c.fillStyle = 'rgba(255,255,255,0.5)'; ellipse(c, 13.8, -1.4, 1, 0.6); c.fill(); } c.restore(); };
  I.teacup = (c, x, y) => { c.save(); c.translate(x + 1, y - 1); c.fillStyle = '#f6f2ea'; c.beginPath(); c.moveTo(-3, -3); c.lineTo(3, -3); c.lineTo(2.2, 2); c.lineTo(-2.2, 2); c.closePath(); c.fill(); c.strokeStyle = '#2a5ab0'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(-2.6, -1); c.lineTo(2.6, -1); c.stroke(); c.restore(); };
  I.teapot = (c, x, y) => { c.save(); c.translate(x + 2, y + 4); ellipse(c, 0, 0, 7, 5.5); c.fillStyle = linear(c, -7, 0, 7, 0, [[0, '#8a6a4a'], [0.4, '#c8a070'], [1, '#6a4a2a']]); c.fill(); c.strokeStyle = '#6a4a2a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(6, -1); c.quadraticCurveTo(11, -3, 12, -6); c.stroke(); c.beginPath(); c.arc(-1, -5, 4, Math.PI, 0); c.stroke(); ellipse(c, 0, -5.5, 2, 1); c.fillStyle = '#6a4a2a'; c.fill(); c.restore(); };
  I.wine = (col = '#7a1020', lvl = 1) => (c, x, y) => { c.save(); c.translate(x + 1, y - 1); c.strokeStyle = 'rgba(230,240,245,0.85)'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(-3, -10); c.quadraticCurveTo(-3.6, -3, 0, -2); c.quadraticCurveTo(3.6, -3, 3, -10); c.stroke(); c.beginPath(); c.moveTo(0, -2); c.lineTo(0, 4); c.moveTo(-2.4, 4); c.lineTo(2.4, 4); c.stroke(); if (lvl > 0) { c.fillStyle = rgba(col, 0.85); c.beginPath(); c.moveTo(-3.1, -6 + (1 - lvl) * 3); c.lineTo(3.1, -6 + (1 - lvl) * 3); c.quadraticCurveTo(3.2, -2.5, 0, -2.3); c.quadraticCurveTo(-3.2, -2.5, -3.1, -6 + (1 - lvl) * 3); c.fill(); } c.restore(); };
  I.flute = (c, x, y) => { c.save(); c.translate(x + 1, y - 1); c.fillStyle = 'rgba(244,220,132,0.85)'; c.fillRect(-1.4, -12, 2.8, 8); c.strokeStyle = 'rgba(240,245,250,0.9)'; c.lineWidth = 0.5; c.strokeRect(-1.6, -13, 3.2, 10); c.beginPath(); c.moveTo(0, -3); c.lineTo(0, 3); c.moveTo(-2, 3); c.lineTo(2, 3); c.stroke(); c.fillStyle = '#fff'; c.fillRect(-0.4, -9, 0.6, 0.6); c.fillRect(0.4, -7, 0.5, 0.5); c.restore(); };
  I.coupe = (col) => (c, x, y) => { c.save(); c.translate(x + 1, y - 2); c.fillStyle = rgba(col, 0.85); c.beginPath(); c.moveTo(-4.4, -5); c.lineTo(4.4, -5); c.quadraticCurveTo(4, -1, 0, -0.8); c.quadraticCurveTo(-4, -1, -4.4, -5); c.fill(); c.strokeStyle = 'rgba(240,245,250,0.9)'; c.lineWidth = 0.5; c.stroke(); c.beginPath(); c.moveTo(0, -0.8); c.lineTo(0, 4); c.moveTo(-2.2, 4); c.lineTo(2.2, 4); c.stroke(); c.restore(); };
  I.rocks = (col) => (c, x, y) => { c.save(); c.translate(x + 1, y - 3); c.fillStyle = rgba(col, 0.85); c.fillRect(-3, -2, 6, 5); c.strokeStyle = 'rgba(240,245,250,0.9)'; c.lineWidth = 0.5; c.strokeRect(-3.2, -5, 6.4, 8); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(-1.6, -2.6, 2.4, 2.4); c.restore(); };
  I.cigar = (c, x, y, ang, t) => { c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = '#6a3a1a'; c.fillRect(2, -0.9, 9, 1.8); c.fillStyle = '#d8b050'; c.fillRect(4, -1, 1.2, 2); c.fillStyle = '#ff7a2a'; c.fillRect(11, -0.9, 0.8, 1.8); c.restore(); };
  I.slice = (pull) => (c, x, y) => { c.save(); c.translate(x + 2, y - 2); c.rotate(-0.5); c.beginPath(); c.moveTo(-2, -3); c.lineTo(12, 0); c.lineTo(-2, 3); c.closePath(); c.fillStyle = '#f0c060'; c.fill(); c.beginPath(); c.moveTo(0, -2); c.lineTo(10, 0); c.lineTo(0, 2); c.closePath(); c.fillStyle = '#d83a1a'; c.fill(); c.fillStyle = '#fbf2d8'; ellipse(c, 4, 0, 2, 1.2); c.fill(); if (pull > 0) { c.strokeStyle = 'rgba(255,248,225,0.95)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(10, 0); c.quadraticCurveTo(10 + pull * 6, 4 + pull * 3, 10 + pull * 10, 8 + pull * 6); c.stroke(); } c.restore(); };
  I.fork = (food) => (c, x, y, ang) => { c.save(); c.translate(x, y); c.rotate(ang - 0.4); c.fillStyle = '#d8dce0'; c.fillRect(0, -0.4, 10, 0.8); c.fillRect(10, -1.2, 3, 2.4); if (food) { ellipse(c, 13.5, 0, 2.6, 2.2); c.fillStyle = food; c.fill(); c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 0.4; c.beginPath(); c.arc(13.5, 0, 1.6, 0, 4); c.stroke(); } c.restore(); };
  I.burger = (c, x, y) => { c.save(); c.translate(x + 2, y - 2); c.fillStyle = '#d88a2a'; c.beginPath(); c.ellipse(0, -1, 5, 3, 0, Math.PI, 0); c.fill(); c.fillStyle = '#5ac83a'; c.fillRect(-5, -1, 10, 1); c.fillStyle = '#4a2410'; c.fillRect(-5, 0, 10, 1.8); c.fillStyle = '#d88a2a'; roundRect(c, -5, 1.8, 10, 2, 1); c.fill(); c.fillStyle = '#fbf2d8'; c.fillRect(-2, -3, 0.6, 0.4); c.fillRect(1, -2.6, 0.6, 0.4); c.restore(); };
  I.nugget = (c, x, y) => { c.save(); c.translate(x + 2, y - 1); ellipse(c, 0, 0, 2.6, 2); c.fillStyle = '#e0a040'; c.fill(); c.fillStyle = '#c8701a'; ellipse(c, 1.5, -0.3, 1, 0.9); c.fill(); c.restore(); };
  I.shake = (c, x, y) => { c.save(); c.translate(x + 1, y - 3); c.beginPath(); c.moveTo(-3, -5); c.lineTo(3, -5); c.lineTo(2.2, 5); c.lineTo(-2.2, 5); c.closePath(); c.fillStyle = '#ffffff'; c.fill(); c.fillStyle = '#e8241a'; c.fillRect(-2.8, -1, 5.6, 2); c.fillStyle = '#f0f0f0'; c.fillRect(-3.4, -6, 6.8, 1.4); c.fillStyle = '#e8241a'; c.fillRect(0.6, -11, 0.9, 6); c.restore(); };
  I.fries = (c, x, y) => { c.save(); c.translate(x + 1, y - 3); c.fillStyle = '#ffd040'; for (let k = 0; k < 5; k++) c.fillRect(-2.6 + k * 1.2, -6 - (k % 2), 0.9, 5); c.fillStyle = '#d81e16'; c.beginPath(); c.moveTo(-3.4, -2); c.lineTo(3.4, -2); c.lineTo(2.6, 4); c.lineTo(-2.6, 4); c.closePath(); c.fill(); c.restore(); };
  I.oyster = (c, x, y) => { c.save(); c.translate(x + 2, y - 1); ellipse(c, 0, 0, 4.4, 3.2, -0.3); c.fillStyle = '#7a8478'; c.fill(); ellipse(c, 0, -0.4, 3, 2, -0.3); c.fillStyle = '#e8e4dc'; c.fill(); c.restore(); };
  I.notepad = (c, x, y) => { c.save(); c.translate(x, y - 2); c.rotate(-0.2); c.fillStyle = '#fbf8f0'; c.fillRect(-1, -5, 7, 9); c.strokeStyle = 'rgba(80,80,120,0.6)'; c.lineWidth = 0.35; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(0, -3 + k * 2); c.lineTo(5, -3 + k * 2); c.stroke(); } c.restore(); };
  I.pepper = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-0.2); c.fillStyle = linear(c, -1.8, 0, 1.8, 0, [[0, '#4a2a14'], [0.5, '#a86a3a'], [1, '#3a1a08']]); roundRect(c, -1.8, -26, 3.6, 30, 1.6); c.fill(); ellipse(c, 0, -27, 2.4, 1.6); c.fillStyle = '#c8c8d0'; c.fill(); c.restore(); };
  I.cloche = (lift) => (c, x, y) => { c.save(); c.translate(x + 4, y + 1); ellipse(c, 0, 2, 11, 2.2); c.fillStyle = '#f6f6f6'; c.fill(); c.translate(0, -lift * 10); c.rotate(-lift * 0.5); c.beginPath(); c.ellipse(0, 1.6, 9.5, 8, 0, Math.PI, 0); c.fillStyle = linear(c, -9, 0, 9, 0, [[0, '#8a9098'], [0.35, '#f4f6f8'], [1, '#6a7078']]); c.fill(); ellipse(c, 0, -6.8, 1.6, 1.2); c.fillStyle = '#c8ccd0'; c.fill(); c.restore(); };
  I.tray = (contents) => (c) => { c.save(); c.translate(0, 30); c.fillStyle = '#c8281e'; roundRect(c, -15, -1, 30, 3.4, 1); c.fill(); c.fillStyle = '#f4ece0'; c.fillRect(-13, -1.6, 26, 1); contents && contents(c); c.restore(); };
  return I;
})();

/* ---------- shared decor helpers ---------- */
const Decor = (() => {
  const D = {};
  D.tin = (x, x0, y0, w, h, s, base = '#c8b890') => { // pressed-tin ceiling tiles
    x.fillStyle = base; x.fillRect(x0, y0, w, h);
    for (let ty = y0; ty < y0 + h; ty += s) for (let tx = x0; tx < x0 + w; tx += s) {
      x.fillStyle = 'rgba(255,255,240,0.18)'; x.fillRect(tx, ty, s, 1); x.fillRect(tx, ty, 1, s); x.fillStyle = 'rgba(60,40,10,0.22)'; x.fillRect(tx, ty + s - 1, s, 1); x.fillRect(tx + s - 1, ty, 1, s);
      ellipse(x, tx + s / 2, ty + s / 2, s * 0.28, s * 0.28); x.strokeStyle = 'rgba(80,60,20,0.25)'; x.lineWidth = 1; x.stroke(); x.strokeStyle = 'rgba(255,255,240,0.25)'; x.beginPath(); x.arc(tx + s / 2, ty + s / 2, s * 0.28, Math.PI, Math.PI * 1.5); x.stroke();
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; ellipse(x, tx + s / 2 + Math.cos(a) * s * 0.36, ty + s / 2 + Math.sin(a) * s * 0.36, s * 0.06, s * 0.06); x.fillStyle = 'rgba(255,255,240,0.2)'; x.fill(); }
    }
  };
  D.checker = (x, x0, y0, w, h, rows, c1, c2, horizonX) => { // perspective checker floor
    const cols = 14;
    for (let r = 0; r < rows; r++) {
      const ya = y0 + h * Math.pow(r / rows, 1.6), yb = y0 + h * Math.pow((r + 1) / rows, 1.6), sa = 0.6 + 0.4 * (r / rows), sb = 0.6 + 0.4 * ((r + 1) / rows);
      for (let cI = -cols; cI < cols; cI++) {
        const xa0 = horizonX + (cI / cols) * w * sa, xa1 = horizonX + ((cI + 1) / cols) * w * sa, xb0 = horizonX + (cI / cols) * w * sb, xb1 = horizonX + ((cI + 1) / cols) * w * sb;
        x.beginPath(); x.moveTo(xa0, ya); x.lineTo(xa1, ya); x.lineTo(xb1, yb); x.lineTo(xb0, yb); x.closePath(); x.fillStyle = (r + cI) % 2 ? c1 : c2; x.fill();
      }
    }
  };
  D.brick = (x, x0, y0, w, h, bw, bh, rnd, base = '#9a4a30') => {
    x.fillStyle = '#5a3a2a'; x.fillRect(x0, y0, w, h);
    for (let r = 0, yy = y0; yy < y0 + h; r++, yy += bh) for (let xx = x0 - (r % 2 ? bw / 2 : 0); xx < x0 + w; xx += bw) {
      x.fillStyle = shade(base, (rnd() - 0.5) * 0.35); x.fillRect(xx + 1, yy + 1, bw - 2, bh - 2);
      x.fillStyle = 'rgba(255,220,180,0.12)'; x.fillRect(xx + 1, yy + 1, bw - 2, 1.2); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(xx + 1, yy + bh - 2.2, bw - 2, 1.2);
    }
  };
  D.wood = (x, x0, y0, w, h, rnd, c1, c2, vertical = true, n = 30) => {
    x.fillStyle = linear(x, x0, y0, vertical ? x0 + w : x0, vertical ? y0 : y0 + h, [[0, c1], [0.5, c2], [1, c1]]); x.fillRect(x0, y0, w, h);
    for (let i = 0; i < n; i++) { x.strokeStyle = rnd() < 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,220,180,0.06)'; x.lineWidth = 0.6 + rnd() * 1.2; x.beginPath(); if (vertical) { const xx = x0 + rnd() * w; x.moveTo(xx, y0); x.bezierCurveTo(xx + (rnd() - 0.5) * 8, y0 + h * 0.3, xx + (rnd() - 0.5) * 8, y0 + h * 0.7, xx + (rnd() - 0.5) * 6, y0 + h); } else { const yy = y0 + rnd() * h; x.moveTo(x0, yy); x.bezierCurveTo(x0 + w * 0.3, yy + (rnd() - 0.5) * 6, x0 + w * 0.7, yy + (rnd() - 0.5) * 6, x0 + w, yy); } x.stroke(); }
  };
  D.bulbGlow = (ctx, x, y, r, col, a) => { ctx.fillStyle = radial(ctx, x, y, r, [[0, rgba(col, a)], [0.3, rgba(col, a * 0.35)], [1, rgba(col, 0)]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  D.edison = (ctx, x, y, s, on = 1) => { ctx.strokeStyle = '#1a1208'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y - 6 * s); ctx.stroke(); ctx.fillStyle = '#3a2a14'; ctx.fillRect(x - 2.4 * s, y - 7 * s, 4.8 * s, 4 * s); ellipse(ctx, x, y + 2 * s, 4 * s, 5.4 * s); ctx.fillStyle = `rgba(255,200,120,${0.35 + on * 0.45})`; ctx.fill(); ctx.strokeStyle = `rgba(255,240,180,${0.6 + on * 0.4})`; ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 1.5 * s, y - 1 * s); ctx.lineTo(x - 1 * s, y + 3 * s); ctx.lineTo(x, y + 1 * s); ctx.lineTo(x + 1 * s, y + 3 * s); ctx.lineTo(x + 1.5 * s, y - 1 * s); ctx.stroke(); };
  D.roundTable = (ctx, cx, cy, rx, ry, cloth = '#f6f2ea', skirt = 0.5) => {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(ctx, cx, cy + ry * 2.2, rx * 1.05, ry * 0.6); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - rx, cy); ctx.lineTo(cx - rx * 1.02, cy + ry * skirt * 4); ctx.quadraticCurveTo(cx, cy + ry * skirt * 4 + ry * 0.9, cx + rx * 1.02, cy + ry * skirt * 4); ctx.lineTo(cx + rx, cy); ctx.closePath();
    ctx.fillStyle = linear(ctx, cx - rx, 0, cx + rx, 0, [[0, shade(cloth, -0.25)], [0.4, cloth], [1, shade(cloth, -0.3)]]); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(cx + k * rx * 0.22, cy + ry * 0.6); ctx.quadraticCurveTo(cx + k * rx * 0.24, cy + ry * 2, cx + k * rx * 0.23, cy + ry * skirt * 4 + ry * 0.6 * (1 - Math.abs(k) / 5)); ctx.stroke(); }
    ellipse(ctx, cx, cy, rx, ry); ctx.fillStyle = radial(ctx, cx - rx * 0.2, cy - ry * 0.3, rx * 1.2, [[0, shade(cloth, 0.1)], [1, shade(cloth, -0.12)]]); ctx.fill();
  };
  D.steamPuff = (ctx, x, y, t, ph, s, a = 1) => { for (let k = 0; k < 4; k++) { const p = ((t * 0.5 + ph + k * 0.25) % 1); ctx.fillStyle = `rgba(255,255,255,${(1 - p) * 0.18 * a})`; ellipse(ctx, x + Math.sin(t * 1.4 + k + ph) * 5 * s, y - p * 40 * s, (5 + p * 12) * s, (4 + p * 9) * s); ctx.fill(); } };
  D.sign = (x, cx, cy, text, font, fill, stroke) => { x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle'; if (stroke) { x.strokeStyle = stroke; x.lineWidth = 3; x.strokeText(text, cx, cy); } x.fillStyle = fill; x.fillText(text, cx, cy); };
  return D;
})();

/* ---------- varied customer looks ---------- */
const Looks = (() => {
  const SK = ['pale', 'light', 'light', 'olive', 'tan', 'brown', 'dark', 'deep'];
  const HAIRC = ['black', 'dbrown', 'brown', 'auburn', 'blonde', 'ginger', 'grey', 'black', 'dbrown'];
  const COLS = ['#c8384a', '#2a6ab0', '#3a8a5a', '#e8a030', '#7a4ab0', '#f2f2f2', '#2a2a38', '#d86a8a', '#4ab0c8', '#8a5a3a', '#f4d04a', '#5a6a2a'];
  function pickR(rnd, a) { return a[Math.floor(rnd() * a.length)]; }
  function random(rnd, opt = {}) {
    const fem = opt.female ?? rnd() < 0.5, age = opt.age || (rnd() < 0.12 ? 'kid' : rnd() < 0.15 ? 'old' : 'adult');
    const col = pickR(rnd, COLS), col2 = pickR(rnd, COLS);
    const hair = age === 'old' ? pickR(rnd, ['grey', 'white', 'grey']) : pickR(rnd, HAIRC);
    const style = fem ? pickR(rnd, age === 'old' ? ['bun', 'perm', 'bob'] : ['long', 'pony', 'bob', 'curly', 'bun', 'wavyLong', 'twin']) : pickR(rnd, age === 'old' ? ['bald', 'short', 'side'] : ['short', 'side', 'curly', 'buzz', 'slick', 'short']);
    const types = opt.formal ? ['suit', 'blouse', 'shirt', 'cardigan'] : ['tee', 'hoodie', 'shirt', 'sweater', 'polo', 'coat', 'tee', 'blouse'];
    const type = pickR(rnd, types);
    const top = { type, col, col2, stripes: type === 'tee' && rnd() < 0.3 ? pickR(rnd, COLS) : null, check: type === 'shirt' && rnd() < 0.35 ? '#ffffff' : null, scarf: type === 'coat' && rnd() < 0.6 ? col2 : null, tie: type === 'suit' ? col2 : undefined };
    if (fem && rnd() < 0.45 && age !== 'kid') top.skirt = { col: col2, len: 92 + rnd() * 10, pleats: rnd() < 0.4 };
    const acc = {};
    if (rnd() < 0.2) acc.glasses = pickR(rnd, ['#2a2a2a', '#8a5a2a', '#c8a050']), acc.round = rnd() < 0.5;
    if (fem && rnd() < 0.5) acc.earrings = pickR(rnd, ['#e8c050', '#d8d8e0', '#e04a6a']);
    if (!fem && age === 'adult' && rnd() < 0.25) acc[pickR(rnd, ['beard', 'mustache', 'stubble'])] = true;
    if (rnd() < 0.15 && !opt.noHat) { acc.hat = pickR(rnd, fem ? ['sunhat', 'beret', 'cap'] : ['cap', 'newsboy', 'beret']); acc.hatCol = pickR(rnd, COLS); }
    return Object.assign({ skin: pickR(rnd, SK), hair, hairStyle: style, female: fem, age, lashes: fem, lips: fem && rnd() < 0.6 ? pickR(rnd, ['#c0404a', '#d8707a', '#a02a3a']) : null, acc, top, sleeves: type === 'tee' ? 'short' : 'long', pants: pickR(rnd, ['#2a3a5a', '#3a3a40', '#5a4a3a', '#20283a', '#6a6a70', '#8a7a5a']), shoe: pickR(rnd, ['#1a120c', '#f2f2f2', '#6a3a1a', '#2a2a2a', '#c83a3a']), eyes: pickR(rnd, ['#3a2414', '#2a4a6a', '#3a5a2a', '#5a3a1a']), bareLegs: !!top.skirt && rnd() < 0.6, build: 0.92 + rnd() * 0.2, watch: rnd() < 0.3 }, opt.extra || {});
  }
  return { random, pickR };
})();

/* ---------- shared "life" props for events: cat, birthday cake, mop bucket, delivery cart, umbrellas ---------- */
const Life = (() => {
  const L = {};
  L.cat = (ctx, x, y, s, t, mode, dir = 1, col = '#e8a050') => { // mode: walk | sit | groom
    ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
    const walk = mode === 'walk', ph = t * 8;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ellipse(ctx, 0, 0, 22, 4); ctx.fill();
    const dark = shade(col, -0.35);
    if (mode === 'sit' || mode === 'groom') {
      ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, -4); ctx.quadraticCurveTo(-26, -2, -22 + Math.sin(t * 2) * 3, -18); ctx.stroke();
      ellipse(ctx, -2, -14, 12, 14); ctx.fillStyle = linear(ctx, -14, 0, 10, 0, [[0, dark], [0.6, col], [1, shade(col, 0.2)]]); ctx.fill();
      ellipse(ctx, 4, -32, 9, 8); ctx.fill();
      [-1, 1].forEach((d) => { ctx.beginPath(); ctx.moveTo(4 + d * 6, -37); ctx.lineTo(4 + d * 8, -45); ctx.lineTo(4 + d * 2, -39); ctx.fill(); });
      ctx.fillStyle = '#fff6e0'; ellipse(ctx, 6, -28, 4, 3); ctx.fill();
      if (mode === 'groom') { ctx.fillStyle = col; ellipse(ctx, 8 + Math.sin(t * 10) * 1.5, -24 - Math.abs(Math.sin(t * 5)) * 4, 3, 5); ctx.fill(); }
      ctx.fillStyle = '#2a2a10'; [-1, 1].forEach((d) => { ctx.beginPath(); ctx.arc(4 + d * 3.4, -33, 1.2, 0, TAU); ctx.fill(); });
      ctx.strokeStyle = dark; ctx.lineWidth = 0.6; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-8 + k * 4, -24); ctx.lineTo(-6 + k * 4, -16); ctx.stroke(); }
    } else {
      ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-18, -16); ctx.quadraticCurveTo(-30, -24, -28 + Math.sin(t * 3) * 3, -36); ctx.stroke();
      [[-12, 0], [12, Math.PI]].forEach(([lx, o]) => [0, 1].forEach((k) => { const sw = walk ? Math.sin(ph + o + k * Math.PI) * 5 : 0; ctx.strokeStyle = k ? dark : col; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(lx + k * 3, -12); ctx.lineTo(lx + k * 3 + sw, 0); ctx.stroke(); }));
      ellipse(ctx, 0, -16, 20, 8); ctx.fillStyle = linear(ctx, 0, -24, 0, -8, [[0, shade(col, 0.15)], [1, dark]]); ctx.fill();
      ctx.strokeStyle = dark; ctx.lineWidth = 0.8; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-10 + k * 6, -23); ctx.lineTo(-8 + k * 6, -15); ctx.stroke(); }
      ellipse(ctx, 20, -24 + (walk ? Math.sin(ph * 2) * 0.6 : 0), 8, 7); ctx.fillStyle = col; ctx.fill();
      [-1, 1].forEach((d) => { ctx.beginPath(); ctx.moveTo(20 + d * 5, -29); ctx.lineTo(21 + d * 6, -37); ctx.lineTo(20 + d * 1, -31); ctx.fill(); });
      ctx.fillStyle = '#2a2a10'; ctx.beginPath(); ctx.arc(24, -25, 1.1, 0, TAU); ctx.fill(); ctx.fillStyle = '#e88a8a'; ctx.fillRect(27, -23, 1.4, 1.2);
    }
    ctx.restore();
  };
  L.cake = (ctx, x, y, s, lit, t, col = '#f6a0b4') => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ellipse(ctx, 0, 2, 20, 5); ctx.fillStyle = '#e8e8ec'; ctx.fill();
    ctx.fillStyle = linear(ctx, -16, 0, 16, 0, [[0, shade(col, -0.2)], [0.5, col], [1, shade(col, -0.25)]]); ctx.fillRect(-16, -14, 32, 15); ellipse(ctx, 0, -14, 16, 4); ctx.fillStyle = shade(col, 0.25); ctx.fill();
    ctx.fillStyle = '#ffffff'; for (let k = 0; k < 8; k++) { ellipse(ctx, -14 + k * 4, -13, 2, 1.6); ctx.fill(); }
    for (let k = 0; k < 5; k++) { const cx = -8 + k * 4; ctx.fillStyle = ['#7ab8ff', '#ffd36a', '#7ae0a0', '#ff8ab8', '#c8a0f0'][k]; ctx.fillRect(cx - 0.8, -22, 1.6, 8); if (lit) { const f = 1 + Math.sin(t * 20 + k) * 0.15; ctx.fillStyle = radial(ctx, cx, -24, 6, [[0, 'rgba(255,220,120,0.6)'], [1, 'rgba(255,200,80,0)']]); ctx.fillRect(cx - 6, -30, 12, 12); ellipse(ctx, cx, -24.5, 1.3 * f, 2.6 * f); ctx.fillStyle = '#ffd040'; ctx.fill(); ellipse(ctx, cx, -24, 0.6, 1.2); ctx.fillStyle = '#fff8e0'; ctx.fill(); } else { ctx.strokeStyle = 'rgba(200,200,200,0.5)'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(cx, -23); ctx.quadraticCurveTo(cx + 2, -28 - (t % 1) * 4, cx, -33); ctx.stroke(); } }
    ctx.restore();
  };
  L.mop = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f0c020'; roundRect(ctx, -10, -16, 20, 16, 2); ctx.fill(); ctx.fillStyle = '#3a6ab0'; ctx.fillRect(-11, -18, 22, 3); ctx.fillStyle = 'rgba(160,200,230,0.6)'; ellipse(ctx, 0, -16, 8, 2); ctx.fill(); ctx.restore(); };
  L.wetSign = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#ffd020'; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-3, -30); ctx.lineTo(3, -30); ctx.lineTo(8, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1a1a1a'; ctx.font = 'bold 4px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('WET', 0, -16); ctx.fillText('FLOOR', 0, -11); ctx.restore(); };
  L.crates = (ctx, x, y, s, n = 3) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-14, -60); ctx.lineTo(-10, -66); ctx.stroke(); ellipse(ctx, -10, 0, 4, 4); ctx.fillStyle = '#222'; ctx.fill(); for (let i = 0; i < n; i++) { ctx.fillStyle = ['#c83a2a', '#2a6ab0', '#e8b030'][i % 3]; ctx.fillRect(-12, -14 - i * 15, 28, 14); ctx.fillStyle = 'rgba(255,255,255,0.25)'; for (let k = 0; k < 4; k++) ctx.fillRect(-10 + k * 7, -12 - i * 15, 4, 10); } ctx.restore(); };
  L.umbrella = (open, col = '#2a3a6a') => (c, x, y) => { c.save(); c.translate(x, y); if (open) { c.strokeStyle = '#2a2a2a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -38); c.stroke(); c.beginPath(); c.moveTo(-24, -34); c.quadraticCurveTo(0, -60, 24, -34); for (let k = 3; k >= -3; k--) c.quadraticCurveTo(k * 8 + 4, -38, k * 8, -34); c.closePath(); c.fillStyle = col; c.fill(); c.fillStyle = 'rgba(255,255,255,0.2)'; c.beginPath(); c.moveTo(-6, -46); c.quadraticCurveTo(0, -55, 8, -50); c.lineTo(0, -40); c.fill(); } else { c.rotate(0.3); c.fillStyle = col; c.beginPath(); c.moveTo(-1.5, -24); c.lineTo(1.5, -24); c.lineTo(2.5, 4); c.lineTo(-2.5, 4); c.closePath(); c.fill(); c.strokeStyle = '#3a2a1a'; c.lineWidth = 1.2; c.beginPath(); c.arc(-2, 6, 2.5, 0, Math.PI); c.stroke(); } c.restore(); };
  L.snowOn = (ps) => { const prev = ps.mid; ps.mid = (c) => { if (prev) prev(c); c.fillStyle = 'rgba(255,255,255,0.85)'; for (let k = 0; k < 10; k++) { ellipse(c, -14 + k * 3, 4 + (k % 3), 1.4, 1); c.fill(); } }; const ph = ps.onHead; ps.onHead = (c) => { if (ph) ph(c); c.fillStyle = 'rgba(255,255,255,0.9)'; for (let k = 0; k < 6; k++) { ellipse(c, -7 + k * 2.8, -11 - (k % 2), 1.3, 1); c.fill(); } }; };
  L.rainOn = (ps) => { const prev = ps.mid; ps.mid = (c) => { if (prev) prev(c); c.fillStyle = 'rgba(200,220,255,0.6)'; for (let k = 0; k < 6; k++) { ellipse(c, -12 + k * 5, 10 + (k % 3) * 8, 0.8, 1.2); c.fill(); } }; };
  // arrival attire by weather: returns {item, extraPose}
  L.arrival = (a) => {
    const w = Amb.st.weather;
    if (w === 'rain' || w === 'storm') { a.wetT = 6; a.umbrella = Life.umbrella(false, Looks.pickR(Math.random, ['#2a3a6a', '#c83a3a', '#2a6a3a', '#1a1a1a', '#e8b030'])); a.item = a.umbrella; }
    if (w === 'snow') { a.snowT = 8; }
    a.extraPose = (ps, t) => { if (a.snowT > 0) { Life.snowOn(ps); } else if (a.wetT > 0) Life.rainOn(ps); };
  };
  L.tickWeather = (a, dt) => { if (a.snowT > 0) a.snowT -= dt; if (a.wetT > 0) a.wetT -= dt; };
  return L;
})();
