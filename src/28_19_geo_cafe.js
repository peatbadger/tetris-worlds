/* ================= GeoCafe — shared calm-venue engine for the geometric REMAKES of the five original worlds =================
   Same layout grammar as the other GeoKit worlds: counter + two staff on the left strip (server at the till, maker at the
   station), a world window + standing ledge on the right strip, nothing busy behind the board. Customers (2–4 at a time)
   come in from the left door, queue, order (speech bubble), pay, the maker really makes the item at the station and hands
   it over the counter, then they eat / drink it at the ledge bite by bite (the item visibly shrinks) and leave right.
   Each world supplies: palette, window view, back-wall decor, counter props, station action, menu items + held-item art,
   staff/customer looks and one signature event. */
const GeoCafePal = (base, keys, label) => {
  const BODY = { skin: '#ecb88e', bubble: '#ffffff', ink: '#2a2228', navy: '#2e4a6a', coral: '#e86a5e', mustard: '#e8b03a', teal: '#3a9a90', cream: '#f4e8d4', olive: '#7a8448', plum: '#84486e', grey: '#a8a4a0', brown: '#7a4e34', white: '#fcf8f2', dark: '#2a2226', hairGrey: '#dcd6d0' };
  const NBODY = { skin: '#c8906e', bubble: '#f6f0ea', ink: '#1a1418', navy: '#1e2e4a', coral: '#b04c46', mustard: '#bc8a2a', teal: '#246a64', cream: '#d6c4b0', olive: '#4e5630', plum: '#5c2e4c', grey: '#787074', brown: '#523424', white: '#e8e0d6', dark: '#181216', hairGrey: '#b0a8a4' };
  const P = {}; for (const k in base) P[k] = Object.assign({}, k === 'night' ? NBODY : k === 'snow' ? {} : BODY, base[k]);
  return GeoKit.palette(P, keys, label ? { label } : {});
};
function makeGeoCafe(W) {
  return function () {
    const CNT = { x0: 14, x1: 250, top: 500, base: 650 }, SF = 606, SSC = 0.86, FL = 712, SC = 0.84;
    const SPOTS = (W.spots || [118, 214]).map((x) => ({ x, occ: null })), WAIT = { x: 40 }, MAXC = W.maxCust || 4; // optional per-world queue spacing / crowd cap
    const WIN = W.win || { x0: 1036, y0: 112, x1: 1244, y1: 468 };
    const LEDGE = [{ x: 1092, occ: null }, { x: 1188, occ: null }], LEDGE_Y = 548, EXIT = 1350, ST = { x: W.stationX || 66 };
    let K, srv, mk, nextArrive = 2; const S = { orders: [], coins: 0, ev: null, evT: 0 };
    const L = (h) => K.L(h), B = GeoKit.body;
    const hr = () => ((K.hour % 24) + 24) % 24;
    const per = () => W.per(hr());
    const custs = () => K.actors.filter((a) => a.cust);
    const cool = (k) => K.weatherNow === k;
    const X = () => ({ K, L, S, CNT, WIN, ST, per: per(), hr: hr(), t: K.t, cool });
    const H = {
      item: (m, o = { frac: 1 }) => ({ m, o, draw(c, x, y, s, a) { W.drawItem(c, x + a.f * 2 * s, y + 4 * s, s, m, this.o.frac, X()); } }),
      tool: (k) => ({ k, draw(c, x, y, s, a) { W.drawTool(c, x, y, s, a, this.k, X()); } }),
      coin: () => ({ draw(c, x, y, s) { c.fillStyle = L('#e8c050'); c.beginPath(); c.arc(x, y, 3 * s, 0, TAU); c.fill(); } }),
      cloth: () => ({ draw(c, x, y, s) { c.fillStyle = L('#f2efe6'); K.poly(c, [x - 8 * s, y - 2 * s, x + 9 * s, y - 4 * s, x + 6 * s, y + 8 * s, x - 6 * s, y + 8 * s]); c.fill(); } }),
    };
    /* ---------- staff ---------- */
    function mkStaff() {
      srv = K.mk(B(W.staff[0]), { role: 'server', staff: 1, hx: W.srvX || 176, f: 1, floorY: SF, sc: SSC, faceDir: 0.6 });
      mk = K.mk(B(W.staff[1]), { role: 'maker', staff: 1, hx: ST.x + 26, f: -1, floorY: SF - 4, sc: SSC * 0.98, faceDir: -0.4, speed: 1.2 });
      srv.think = srvThink; mk.think = mkThink;
    }
    function srvThink(a) {
      if (per() === 4) return K.start(a, 'wipe', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 24 + Math.sin(t * 6) * 22, CNT.top - 6]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      const c0 = SPOTS[0].occ;
      if (c0 && c0.phase === 'front' && !c0.busy) { c0.busy = 1; return takeOrder(a, c0); }
      const r = Math.random();
      if (r < 0.3) return K.start(a, 'wipe', [K.ph(rand(2, 3), (s, u, t) => { s.hold.N = H.cloth(); s.tgN = [s.hx + 24 + Math.sin(t * 6) * 22, CNT.top - 6]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (r < 0.45 && W.srvIdle) return W.srvIdle(a, X(), H);
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.lxT = pick([0.7, 0.3, -0.3]); s.look = { x: () => pick([60, 300, 1100]), until: K.simT + 0.6 }; })]);
    }
    function takeOrder(a, cu) {
      const party = cu.party.members.length, items = cu.party.members.map(() => pick(W.menu));
      K.start(a, 'order', [K.ph(0, (s) => { s.walkTo = W.srvX ? W.srvX - 4 : 170; }, { until: (s) => !s.walking, max: 10 }),
        K.ph(0.6, (s) => { s.f = 1; s.look = { x: () => cu.hx, until: K.simT + 0.5 }; }, { enter: () => K.say(a, pick(W.greet), 1.3) }),
        K.ph(1.3, null, { enter: () => K.after(0.2, () => K.say(cu, items.map((m) => m.n).join(' + '), 1.7)) }),
        K.ph(1.0, (s, u, t) => { s.tgN = [s.hx + 30 + Math.sin(t * 14) * 3, CNT.top - 22]; s.leanT = 0.1; }, { enter: () => K.after(0.3, () => K.say(mk, pick(W.ack), 1.1)), exit: () => { items.forEach((m, i) => S.orders.push({ cu, m, i, n: party })); } }),
        K.ph(0.9, (s) => { s.tgF = [cu.hx - 36, CNT.top - 10]; s.farFront = true; }, { enter: () => { K.abort(cu); K.start(cu, 'pay', [K.ph(0.6, (q) => { q.tgF = [q.hx + 36, CNT.top - 12]; q.farFront = true; }, { enter: (q) => { q.hold.F = H.coin(); }, exit: (q) => { q.hold.F = null; q.farFront = false; S.coins++; } })]); }, exit: (s) => { s.farFront = false; cu.phase = 'wait'; cu.busy = 0; } })],
      { onAbort: (s) => { s.farFront = false; cu.busy = 0; } });
    }
    function mkThink(a) {
      const o = S.orders.find((q) => q.cu && !q.cu.gone && q.cu.phase === 'wait');
      if (o) { S.orders.splice(S.orders.indexOf(o), 1); return make(a, o); }
      S.orders = S.orders.filter((q) => q.cu && !q.cu.gone);
      if (per() === 4) return K.start(a, 'clean', [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(rand(3, 4), (s, u, t) => { s.f = -1; s.hold.N = H.cloth(); s.tgN = [ST.x + Math.sin(t * 6) * 16, CNT.top - 30]; s.leanT = 0.15; }, { exit: (s) => { s.hold.N = null; } })], { onAbort: (s) => { s.hold.N = null; } });
      if (Math.random() < 0.4 && W.mkIdle) return W.mkIdle(a, X(), H);
      return K.start(a, 'idle', [K.ph(rand(1.5, 3), (s) => { s.lxT = pick([0.4, -0.4]); s.look = { x: () => pick([ST.x, 200, 1100]), until: K.simT + 0.6 }; })]);
    }
    function make(a, o) {
      const it = H.item(o.m, { frac: 1 });
      const ph = [K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }), K.ph(0.2, (s) => { s.f = -1; })];
      ph.push(...W.make(a, o.m, X(), H, it));
      ph.push(K.ph(0, (s) => { s.hold.N = it; s.walkTo = Math.min(196, o.cu.hx - 20); s.f = 1; }, { until: (s) => !s.walking, max: 14 }),
        K.ph(0.7, (s) => { s.f = 1; s.tgN = [o.cu.hx - 30, CNT.top - 30]; s.leanT = 0.22; }, { enter: () => K.say(a, pick(W.handOff), 1.2), exit: (s) => { s.hold.N = null; give(o.cu, o.m); } }),
        K.ph(0, (s) => { s.walkTo = ST.x + 26; }, { until: (s) => !s.walking, max: 20 }));
      K.start(a, 'make', ph, { onAbort: (s) => { s.hold.N = null; s.hold.F = null; if (o.cu && !o.cu.gone && !o.cu.item) give(o.cu, o.m); } });
    }
    function give(cu, m) {
      // the lead carries the party's items; companions take theirs when the lead turns round
      const it = { m, frac: 1 }; cu.items = cu.items || []; cu.items.push(it);
      if (cu.items.length === 1) { cu.item = it; cu.hold.N = H.item(m, it); }
      if (cu.items.length >= cu.party.members.length) { cu.phase = 'served'; K.say(cu, pick(W.thanks), 1.1); }
    }
    /* ---------- customers ---------- */
    function arrive() {
      const p = per(); if (p === 4) return false; if (custs().length >= MAXC) return false;
      const list = W.parties.filter((q) => q.w[p] > 0 && !custs().some((c) => q.m.includes(c.type)) && custs().length + q.m.length <= MAXC); if (!list.length) return false;
      let tot = list.reduce((t, q) => t + q.w[p], 0), r = Math.random() * tot, pt = list[0]; for (const q of list) { r -= q.w[p]; if (r <= 0) { pt = q; break; } }
      const party = { members: [] };
      pt.m.forEach((type, j) => { const a = mkCust(type, -40 - j * 46); a.party = party; party.members.push(a); a.phase = 'enter'; a.walkTo = WAIT.x - j * 34 + 40; });
      return true;
    }
    function mkCust(type, x) {
      const T0 = W.types[type], def = Object.assign({}, T0.body);
      const a = K.mk(B(def), { type, T0, cust: 1, hx: x, f: 1, floorY: FL - 6, sc: T0.small ? SC * 0.86 : SC, alpha: 0, fade: 1.6, speed: rand(0.95, 1.1) });
      if (cool('snow') && Math.random() < 0.8) a.scarf = pick(['coral', 'teal', 'mustard']);
      a.think = custThink; return a;
    }
    function custThink(a) {
      const P = a.party, lead = P.members[0];
      if (a.phase === 'enter') { if (a.walking) return; if (a === lead) { const sp = SPOTS.find((s) => !s.occ); if (sp && !SPOTS.some((s) => s.occ && s.occ.party !== P && SPOTS.indexOf(s) > SPOTS.indexOf(sp))) { if (sp === SPOTS[1] && !SPOTS[0].occ) { SPOTS[0].occ = a; a.spot = SPOTS[0]; } else { sp.occ = a; a.spot = sp; } a.walkTo = a.spot.x; a.phase = 'queue'; return; } } else if (lead.spot) { a.walkTo = Math.max(-20, lead.hx - 46); a.phase = 'tag'; return; }
        return K.start(a, 'wait', [K.ph(rand(1, 2), (s) => { s.look = { x: () => 200, until: K.simT + 0.3 }; })]); }
      if (a.phase === 'tag') { if (a.walking) return; if (['eat', 'toLedge', 'leave', 'out'].includes(lead.phase)) { if (!a.item && lead.items && lead.items.length > 1) { const it = lead.items.find((q) => q !== lead.item && !q.taken); if (it) { it.taken = 1; a.item = it; a.hold.N = H.item(it.m, it); } } a.phase = lead.phase === 'leave' || lead.phase === 'out' ? 'leave' : 'toLedge'; return; }
        if (a.walkTo == null && Math.abs(a.hx - (lead.hx - 46)) > 6) a.walkTo = Math.max(-20, lead.hx - 46); return K.start(a, 'tagwait', [K.ph(rand(0.8, 1.6), (s) => { s.look = { x: () => (lead.item ? lead.hx : 160), until: K.simT + 0.3 }; })]); }
      if (a.phase === 'queue') { if (a.walking) return; if (a.spot === SPOTS[1] && !SPOTS[0].occ) { SPOTS[1].occ = null; SPOTS[0].occ = a; a.spot = SPOTS[0]; a.walkTo = SPOTS[0].x; return; }
        if (a.spot === SPOTS[0]) { a.phase = 'front'; a.f = 1; a.faceDir = 0.8; }
        return K.start(a, 'look', [K.ph(rand(1.5, 2.5), (s) => { s.look = { x: () => pick([60, 160, 240]), until: K.simT + 0.8 }; })]); }
      if (a.phase === 'front') return K.start(a, 'point', [K.ph(rand(1.2, 2), (s, u) => { s.look = { x: () => 150, until: K.simT + 0.3 }; if (u < 0.5) s.tgN = [s.hx + 46, CNT.top - 6]; })]);
      if (a.phase === 'wait') return K.start(a, 'waitItem', [K.ph(rand(1, 2), (s) => { s.look = { x: () => mk.hx, until: K.simT + 0.4 }; })]);
      if (a.phase === 'served') { if (a.act) return; if (a.spot) { a.spot.occ = null; a.spot = null; } a.phase = 'toLedge'; return; }
      if (a.phase === 'toLedge') { if (!a.tgtSet) { a.tgtSet = 1; const lg = LEDGE.find((q) => !q.occ); if (lg) { lg.occ = a; a.ledge = lg; a.walkTo = lg.x; } else { a.walkTo = clamp((lead.ledge ? lead.ledge.x : 1140) + (a === lead ? 0 : 46), 1070, 1230); } return; } if (a.walking || a.walkTo != null) return; a.phase = 'eat'; a.f = 1; a.faceDir = 0.3; return; }
      if (a.phase === 'eat') {
        const it = a.item;
        if (!it) { if (lead.phase === 'leave' || lead.phase === 'out' || !lead.item) a.phase = 'leave'; return K.start(a, 'look', [K.ph(rand(1, 2), (s) => { s.look = { x: () => (Math.random() < 0.5 ? 1140 : lead.hx), until: K.simT + 0.3 }; })]); }
        if (it.frac <= 0.02) { a.item = null; a.hold.N = null; K.say(a, pick(W.done), 1.2); const mates = P.members.filter((m) => m !== a && m.item); if (!mates.length) P.members.forEach((m) => { if (m.phase === 'eat') m.phase = 'leave'; }); return; }
        const r = Math.random(), mate = P.members.find((m) => m !== a && m.phase === 'eat');
        if (mate && r < 0.18 && K.cooled(a, 'chat', 6)) { K.say(a, pick(a.T0.words), 1.3); K.after(1, () => K.say(mate, pick(mate.T0.words), 1.2)); return K.start(a, 'chat', [K.ph(2, (s) => { s.look = { x: () => mate.hx, until: K.simT + 0.3 }; })]); }
        if (a.def.camera && r < 0.28 && K.cooled(a, 'photo', 10)) return K.start(a, 'photo', [K.ph(1.2, (s) => { s.tgF = [s.R.cx + 14, s.R.cy + 10]; s.look = { x: () => s.hx + 60, until: K.simT + 0.3 }; }, { exit: () => { K.fx('flash', a.R.cx + 16, a.R.cy + 10); K.say(a, 'icon:cam', 0.8); } })]);
        return K.start(a, 'bite', [K.ph(0.5, (s) => { s.tgN = [s.R.cx + s.f * s.R.R * 0.6, s.R.cy + s.R.R * 1.1]; }), K.ph(0.6, (s, u) => { s.headDy = Math.sin(u * Math.PI) * 3; }, { exit: (s) => { it.frac = Math.max(0, it.frac - rand(0.14, 0.22)); s.headDy = 0; } }), K.ph(rand(1, 2.4), (s) => { s.tgN = [s.hx + s.f * 26, s.hy - 60]; s.look = { x: () => (Math.random() < 0.7 ? 1140 : s.hx - 200), until: K.simT + 0.5 }; })], { onAbort: (s) => { s.headDy = 0; } });
      }
      if (a.phase === 'leave') { if (a.ledge) { a.ledge.occ = null; a.ledge = null; } if (a.spot) { a.spot.occ = null; a.spot = null; } a.hold.N = null; a.phase = 'out'; a.walkTo = EXIT; return; }
      if (a.phase === 'out') { if (!a.walking) a.fade = -2; else if (a.hx > 1250) a.fade = -1.4; }
    }
    /* ---------- sim ---------- */
    function sim(Kk, dt) {
      nextArrive -= dt; const p = per();
      if (nextArrive <= 0) { const target = [2.5, 3, 4, 3, 0][p] * (W.crowd || 1) * (cool('rain') || cool('snow') ? 0.7 : 1); if (custs().length < target) arrive(); nextArrive = rand(8, 14); }
      if (W.sim) W.sim(X(), dt);
      if (W.events) { S.evT += dt; if (!S.ev && S.evT > 70 && Math.random() < dt / 30) { S.ev = pick(W.events); S.evT = 0; S.ev.start(X(), srv, mk); } if (S.ev) { S.ev.t = (S.ev.t || 0) + dt; if (S.ev.t > S.ev.dur) { if (S.ev.end) S.ev.end(X()); S.ev.t = 0; S.ev = null; } } }
    }
    function onClear(Kk, big) {
      for (const c of custs()) if (c.phase === 'eat' && (!c.act || c.act.name === 'look' || c.act.name === 'bite')) { if (big || Math.random() < 0.4) K.say(c, pick(W.cheer.concat(['icon:heart', 'icon:star'])), 1.2); }
      K.say(srv, pick(big ? W.cheer : ['icon:note', 'icon:star']), 1.2); if (big) K.say(mk, pick(W.cheer), 1.2);
    }
    function build(Kk) { K = Kk; mkStaff(); nextArrive = 1; if (W.build) W.build(X()); }
    /* ---------- drawing ---------- */
    function drawWindow(c, t) {
      const P = K.P, { x0, y0, x1, y1 } = WIN;
      if (W.frame) W.frame(c, X(), true);
      c.save(); c.beginPath(); if (W.porthole) c.ellipse((x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) / 2, (y1 - y0) / 2, 0, 0, TAU); else c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
      W.view(c, x0, y0, x1, y1, t, X()); if (!W.noWeather) K.weather(c, x0, y0, x1, y1); c.restore();
      if (W.frame) W.frame(c, X(), false);
      c.fillStyle = P.wood; c.fillRect(x0 - 14, LEDGE_Y - 8, x1 - x0 + 28, 10); c.fillStyle = P.woodDk; c.fillRect(x0 - 8, LEDGE_Y + 2, 6, 140); c.fillRect(x1 + 2, LEDGE_Y + 2, 6, 140);
    }
    function draw(c, t) {
      const P = K.P;
      c.fillStyle = P.wall; c.fillRect(-60, 0, 1400, 660);
      W.room(c, t, X());
      drawWindow(c, t);
      for (const x of W.lamps || [262, 1018]) { c.strokeStyle = P.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x, 30); c.lineTo(x, 110); c.stroke(); c.fillStyle = P.trim; K.poly(c, [x - 16, 110, x + 16, 110, x + 24, 130, x - 24, 130]); c.fill(); c.fillStyle = P.lamp; ellipse(c, x, 131, 10, 3); c.fill(); K.glow(c, x, 140, 130, P.glow, P.glowA); }
      c.fillStyle = P.floor; c.fillRect(-60, 640, 1400, 100 + K.extraB); W.floor(c, X());
      K.drawBody(c, mk, true); K.drawBody(c, srv, true);
      W.counter(c, t, X());
      // door on the left (customers come in)
      c.fillStyle = P.woodDk; c.fillRect(-40, 300, 64, 360);
      for (const a of custs()) { if (a.alpha > 0.05) { c.fillStyle = 'rgba(0,0,0,0.16)'; ellipse(c, a.hx, a.floorY + 2, 26 * a.sc, 5); c.fill(); } K.drawBody(c, a, true); }
      if (W.front) W.front(c, t, X());
      K.shafts(c, [[WIN.x0, WIN.x1, WIN.x0 - 140, WIN.x1 - 100, WIN.y1, 720]]);
      K.drawEffects(c);
      for (const a of K.actors) K.drawBubble(c, a);
    }
    function onGone(Kk, a) { if (a.spot) a.spot.occ = null; if (a.ledge) a.ledge.occ = null; }
    return GeoKit.stage({ id: W.id, pal: W.pal, startHour: W.startHour, span: W.span, build, sim, draw, onClear, onGone, icon: W.icon || (() => false), font: W.font || '700 15px sans-serif', vign: W.vign, zone: W.zone,
      debug: () => ({ orders: S.orders.length, ev: S.ev ? S.ev.name : '-', custs: custs().map((a) => a.type + ':' + a.phase + (a.item ? Math.round(a.item.frac * 10) : '')).join(' '), srv: srv.act ? srv.act.name : '-', mk: mk.act ? mk.act.name : '-' }) });
  };
}
/* ---------- MassKit: piece-space painter boilerplate shared by the remake food sets (same conventions as 56_food_nightmarket) ---------- */
function MassKit(x, Q, seed) {
  const { P, mask, vr, small, l, t, r, b, C, hash, N, E, S, W, shape } = Q;
  const lx = vr & 3, ly = (vr >> 2) & 3, cells = shape || [[lx, ly]], lw = (k) => Math.max(1, P * k);
  let bx0 = 9, by0 = 9, bx1 = -9, by1 = -9; for (const [a, c] of cells) { bx0 = Math.min(bx0, a); by0 = Math.min(by0, c); bx1 = Math.max(bx1, a + 1); by1 = Math.max(by1, c + 1); }
  const wide = bx1 - bx0 >= by1 - by0, X0 = bx0 * P, Y0 = by0 * P, BW = (bx1 - bx0) * P, BH = (by1 - by0) * P, A = cells.length;
  const H = (i, k) => hash(seed, i, k);
  const has = (a, c) => cells.some(([a2, c2]) => a2 === a && c2 === c);
  const M = {
    P, cells, A, bx0, by0, bx1, by1, X0, Y0, BW, BH, wide, small, lw, H, has,
    fill: (col) => { x.fillStyle = col; x.fillRect(l - 2, t - 2, r - l + 4, b - t + 4); },
    lin: (x0, y0, x1, y1, st) => linear(x, x0, y0, x1, y1, st),
    rad: (cx, cy, rr, st) => radial(x, cx, cy, rr, st),
    piece: (fn) => { x.save(); x.translate(C(0) - lx * P, C(0) - ly * P); fn(); x.restore(); },
    all: (col) => { x.fillStyle = col; x.fillRect(X0 - P, Y0 - P, BW + 2 * P, BH + 2 * P); },
    topCell: (a, c) => !has(a, c - 1), botCell: (a, c) => !has(a, c + 1),
    tops: () => cells.filter(([a, c]) => !has(a, c - 1)), bots: () => cells.filter(([a, c]) => !has(a, c + 1)),
    // n points spread over the piece (piece space), roughly even per cell, allowed to straddle cell borders
    pts: (n, k = 0, m = 0.05) => { const o = []; for (let i = 0; i < n; i++) { const [a, c] = cells[i % A]; o.push([(a + m + H(i, k + 1) * (1 - 2 * m)) * P, (c + m + H(i, k + 2) * (1 - 2 * m)) * P, i]); } return o; },
    form: (hi, lo, w = 0.22) => {
      if (!(mask & N)) { x.fillStyle = linear(x, 0, t, 0, t + P * w, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, r - l + 4, P * w + 2); }
      if (!(mask & W)) { x.fillStyle = linear(x, l, 0, l + P * w, 0, [[0, hi], [1, 'rgba(0,0,0,0)']]); x.fillRect(l - 2, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & E)) { x.fillStyle = linear(x, r - P * w, 0, r, 0, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(r - P * w, t - 2, P * w + 2, b - t + 4); }
      if (!(mask & S)) { x.fillStyle = linear(x, 0, b - P * w, 0, b, [[0, 'rgba(0,0,0,0)'], [1, lo]]); x.fillRect(l - 2, b - P * w, r - l + 4, P * w + 2); }
    },
    blob: (u, v, rr, k, n = 7, j = 0.6) => { const pt = []; for (let i = 0; i < n; i++) { const an = i / n * TAU, q = rr * (1 - j / 2 + H(k, i + 20) * j); pt.push([u + Math.cos(an) * q, v + Math.sin(an) * q]); } x.beginPath(); for (let i = 0; i <= n; i++) { const p0 = pt[i % n], p1 = pt[(i + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; i ? x.quadraticCurveTo(p0[0], p0[1], mx, my) : x.moveTo(mx, my); } x.closePath(); },
    // skeleton: segments between the centres of every pair of edge-adjacent cells (piece space) — a continuous core line through the piece
    skel: () => { const o = []; for (const [a, c] of cells) { if (has(a + 1, c)) o.push([(a + 0.5) * P, (c + 0.5) * P, (a + 1.5) * P, (c + 0.5) * P]); if (has(a, c + 1)) o.push([(a + 0.5) * P, (c + 0.5) * P, (a + 0.5) * P, (c + 1.5) * P]); } return o; },
    // run fn with u along the piece's long axis (0..len) and v across (0..span)
    axis: (fn) => { x.save(); if (!wide) { x.translate(X0 + BW, Y0); x.rotate(Math.PI / 2); fn(BH, BW); } else { x.translate(X0, Y0); fn(BW, BH); } x.restore(); },
  };
  return M;
}
function remakeFood(id, spec) { // FoodMass + skin + palette hook-up for a remake world
  const F = FoodMass(Object.assign({ shape: true, diag: true, R: 0.2, vkey: (food, vr) => vr, vpaint: (food, vk) => vk,
    clear(food, q) { const { v, X, Y, s, r, vr, push, dir } = q, col = F.MAIN[v]; push({ k: 'slide', v, x: X, y: Y, vx: dir * s * (1.2 + r(2)), vy: -s * 0.8, rot: 0, vr: dir * (1 + r(3) * 2), life: 0.8, vrr: vr }); for (let i = 0; i < 3; i++) push({ k: 'dot', col: i % 2 ? col : '#ffffff', r: 0.05, x: X, y: Y, vx: (r(i + 5) - 0.5) * s * 3, vy: -s * (1.5 + r(i) * 2), life: 0.6 }); return true; } }, spec));
  SKINSETS[id] = F.skin();
  const d = WORLD_DEFS.find((q) => q.id === id); if (d) { d.palette = F.MAIN.slice(1); if (spec.boardBg) d.boardBg = spec.boardBg; if (spec.grid) d.grid = spec.grid; }
  return F;
}
