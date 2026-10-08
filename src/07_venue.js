/* ================= Venue engine: reusable, purposeful restaurant life =================
   A world supplies static art (back/counter layers), live signature animation, staff with
   station-specific poses, and a customer flow. The engine runs believable service loops:
     flow 'counter' : queue -> order -> staff prepares -> pay -> take -> sit/stand & eat -> bin -> leave
     flow 'seat'    : wait for a free stool -> sit -> order -> cook serves at the seat -> eat -> pay -> leave
     flow 'table'   : party arrives -> waits for a table -> sits -> waiter takes order -> kitchen cooks ->
                      waiter carries tray -> party eats (dishes visibly shrink) -> bill -> leave -> busser clears
   Worlds can add per-table logic (refills, grilling) by pushing waiter jobs from cfg.tableTick. */
const PARTS = {};       // custom line-clear particle styles: PARTS[name] = { g, drag, draw(ctx, p, a) }
const WORLD_DEFS = [];  // stage definitions contributed by world files (ordered in 29_order.js)
function defineWorld(def, factory) { WORLD_DEFS.push(def); registerStage(def.id, factory); if (def.dayOrder) Amb.ORDER[def.id] = def.dayOrder; }

function makeVenue(cfg) {
  return function venueFactory() {
    const V = { cfg, agents: [], staff: [], seats: [], tables: [], jobs: [], fx: [], S: {}, t: 0, lit: 1 };
    let layers = {}, spawnT = 0, lastEv = 0, vignette;
    V.X = (f) => f * V.W; V.Y = (f) => f * V.H;
    V.rnd = mulberry32(cfg.seed || 7);
    V.person = (look, k = 1) => People.make(look, V.sc * k, V.D);
    V.lane = () => V.H * (cfg.lane || 0.975);
    V.near = (a, x, y) => Math.hypot(a.x - x, a.y - y) < 2;
    V.job = (j) => { j.state = j.state || 'new'; j.t0 = V.t; V.jobs.push(j); return j; };
    V.burst = (x, y, n, col, opt = {}) => { for (let i = 0; i < n; i++) V.fx.push({ x, y, vx: rand(-1, 1) * (opt.sp || 80) * V.u, vy: -rand(0.3, 1) * (opt.up || 160) * V.u, g: (opt.g ?? 300) * V.u, life: opt.life || 1.4, max: opt.life || 1.4, col: typeof col === 'function' ? col() : col, sz: (opt.sz || 3) * V.u, kind: opt.kind || 'dot', rot: rand(TAU) }); };
    V.steam = (x, y, n = 1, s = 1) => { for (let i = 0; i < n; i++) V.fx.push({ x: x + rand(-6, 6) * V.u * s, y, vx: rand(-8, 8) * V.u, vy: -rand(18, 34) * V.u * s, g: -4 * V.u, life: 2.4, max: 2.4, sz: rand(6, 10) * V.u * s, kind: 'steam', rot: 0 }); };

    /* ---------------- customers ---------------- */
    V.customer = (opt = {}) => {
      const seed = Math.floor(Math.random() * 1e6);
      const look = cfg.look ? cfg.look(mulberry32(seed), V, opt) : Looks.random(mulberry32(seed), opt.look || {});
      const P = V.person(look);
      const door = cfg.door || { x: -0.07 };
      const a = Crowd.agent(P, V.X(door.x) + (opt.dx || 0), (door.y ? V.Y(door.y) : V.lane()) + (opt.dy || 0), { speed: 78 + Math.random() * 26, seed, kind: 'cust' });
      a.pref = cfg.order ? cfg.order(a, V) : null;
      Life.arrival(a);
      Crowd.run(a, (opt.life || flows[cfg.flow || 'counter'])(a, opt));
      V.agents.push(a); return a;
    };
    function* shakeOff(a) {
      const dx = V.X((cfg.door || { x: -0.07 }).x + 0.08);
      if (a.snowT > 0) { yield ['walk', dx, V.lane()]; a.act = 'brush'; a.actT = 0; yield ['wait', 1.4]; a.snowT = 0; }
      if (a.umbrella && a.wetT > 0) { yield ['walk', dx, V.lane()]; a.act = 'stand'; yield ['wait', 0.5]; a.wetT = 0; a.item = null; }
    }
    function* leave(a) {
      a.look = null; a.mood = 'smile'; a.act = 'walk'; if (!a.keepItem) a.item2 = null;
      if (a.umbrella && Amb.st.wet && !a.keepItem) a.item = a.umbrella;
      const dr = cfg.door || { x: -0.07 };
      if (dr.y) { yield ['walk', V.X(dr.x), V.lane()]; if (cfg.depart) yield* cfg.depart(a, V); yield ['walk', V.X(dr.x), V.Y(dr.y)]; a.done = true; return; }
      yield ['walk', V.X(dr.x) - 30 * V.u, V.lane()];
    }
    function* bin(a) {
      if (!cfg.bin) return;
      yield ['walk', V.X(cfg.bin.x), V.lane()]; a.face = cfg.bin.face || -1; a.act = 'hold'; a.actT = 0; yield ['wait', 0.6]; a.item2 = null; a.act = 'stand'; yield ['wait', 0.3];
    }
    // eat until the dish is gone; dish.left goes 1 -> 0 (worlds draw it shrinking)
    function* eat(a, dish, bites = 4) {
      const per = 1 / bites;
      while (dish.left > 0.02) {
        a.act = dish.eatAct || 'eat'; a.actT = 0; a.item2 = dish.utensil ? dish.utensil(dish) : dish.hand || null;
        yield ['wait', dish.biteT || 3];
        dish.left = Math.max(0, dish.left - per);
        if (dish.onBite) dish.onBite(a, dish, V);
        const r = Math.random();
        a.item2 = dish.restItem ? dish.restItem(dish) : a.item2;
        if (r < 0.25 && dish.sip) { a.act = 'drink'; a.actT = 0; a.item2 = dish.sip; yield ['wait', 3.4]; }
        else if (r < 0.55) { a.act = 'talk'; a.actT = 0; a.look = a.buddy ? a.buddy.x : null; yield ['wait', 1.2 + Math.random() * 1.8]; }
        else if (r < 0.65) { a.act = 'laugh'; a.cheer = 0; a.actT = 0; yield ['wait', 1.4]; }
        else { a.act = 'stand'; yield ['wait', 0.5 + Math.random()]; }
      }
      a.item2 = null;
    }
    const flows = {
      *counter(a) {
        a.mood = 'smile';
        if (cfg.arrive) yield* cfg.arrive(a, V);
        yield* shakeOff(a);
        const Q = V.Qs ? V.Qs.reduce((m, q) => (q.list.length < m.list.length ? q : m)) : V.Q; a.Q = Q;
        yield* Crowd.waitInQueue(Q, a);
        const desk = cfg.orderDesk || {};
        a.look = V.X(desk.lookX ?? 0.8); a.act = 'point'; a.actT = 0; yield ['wait', 1.5];
        a.act = 'talk'; a.actT = 0; yield ['wait', 1.1];
        const j = V.job({ kind: 'prep', cust: a, dish: cfg.dish(a, V), role: 'cook', lane: V.Qs ? V.Qs.indexOf(Q) : 0 });
        a.act = Math.random() < 0.3 ? 'phone' : 'stand'; a.actT = 0;
        yield ['until', () => j.state === 'ready'];
        a.act = 'pay'; a.actT = 0; a.item2 = Math.random() < 0.6 ? Items.card : Items.cash; yield ['wait', 1.2];
        a.item2 = j.dish.hand; a.act = 'take'; a.actT = 0; j.state = 'done'; yield ['wait', 1.0];
        Q.leave(a);
        const dish = Object.assign({ left: 1 }, j.dish);
        if (dish.togo) { a.item = dish.hand; a.item2 = null; a.keepItem = true; a.mood = 'big'; if (dish.togoWalk) yield* dish.togoWalk(a, V); yield* leave(a); return; }
        const free = V.seats.filter((s) => !s.who && !s.res);
        const seat = free.length && Math.random() < 0.85 ? free[Math.floor(Math.random() * free.length)] : null;
        a.act = 'walk';
        if (seat) {
          seat.who = a; yield ['walk', seat.x, V.lane()]; a.sitting = true; a.x = seat.x; a.y = seat.y; a.face = seat.dir; a.look = seat.x + seat.dir * 80 * V.u; a.seat = seat;
          if (dish.onTable) { seat.dish = dish; }
          yield* eat(a, dish, dish.bites || 4);
          seat.dish = null; a.sitting = false; a.y = V.lane(); seat.who = null;
          if (dish.trash) a.item2 = dish.trash;
        } else {
          const sp = cfg.standSpots ? Looks.pickR(Math.random, cfg.standSpots) : [0.3, 0];
          yield ['walk', V.X(sp[0]) + rand(-20, 20) * V.u, V.lane() - (sp[1] || 0) * V.u]; a.face = sp[2] || -1;
          yield* eat(a, dish, dish.bites || 3);
          if (dish.trash) a.item2 = dish.trash;
        }
        yield* bin(a);
        yield* leave(a);
      },
      *seat(a) {
        a.mood = 'smile';
        if (cfg.arrive) yield* cfg.arrive(a, V);
        yield* shakeOff(a);
        V.Q.join(a);
        while (true) {
          const sp = V.Q.spot(a);
          if (Math.hypot(sp[0] - a.x, sp[1] - a.y) > 1) { a.act = 'walk'; yield ['walk', sp[0], sp[1]]; }
          a.act = Math.random() < 0.004 ? 'phone' : a.act === 'phone' ? 'phone' : 'stand'; a.look = sp[2] ?? null;
          if (V.Q.pos(a) === 0 && V.seats.some((s) => !s.who)) break;
          yield ['wait', 0.3];
        }
        const free = V.seats.filter((s) => !s.who); const seat = free[Math.floor(Math.random() * free.length)];
        seat.who = a; V.Q.leave(a); a.seat = seat;
        a.act = 'walk'; yield ['walk', seat.x, V.lane()];
        a.sitting = true; a.x = seat.x; a.y = seat.y; a.face = seat.dir || 1; a.look = V.X(cfg.chefLookX ?? 0.5);
        a.act = 'stand'; yield ['wait', 0.6];
        a.act = 'point'; a.actT = 0; yield ['wait', 1.6]; a.act = 'talk'; a.actT = 0; yield ['wait', 1];
        const j = V.job({ kind: 'prep', cust: a, seat, dish: cfg.dish(a, V), role: 'cook' });
        a.act = 'stand';
        if (cfg.waitAct) { a.act = cfg.waitAct(a); a.actT = 0; }
        yield ['until', () => j.state === 'ready'];
        const dish = Object.assign({ left: 1 }, j.dish); seat.dish = dish; j.state = 'done';
        a.act = 'clap'; a.actT = 0; a.mood = 'big'; yield ['wait', 0.8];
        if (dish.prelude) yield* dish.prelude(a, dish, V);
        yield* eat(a, dish, dish.bites || 5);
        a.act = 'pay'; a.actT = 0; a.item2 = Math.random() < 0.5 ? Items.cash : Items.card; yield ['wait', 1.3];
        if (cfg.onPaid) cfg.onPaid(a, seat, V);
        a.act = 'wave'; a.actT = 0; yield ['wait', 0.8];
        seat.dish = null; a.sitting = false; a.y = V.lane(); seat.who = null; a.seat = null;
        yield* leave(a);
      },
      *table(a, opt) {
        // party leader drives the party; members follow their leader's table
        const party = opt.party; a.party = party; a.mood = 'smile';
        if (cfg.arrive) yield* cfg.arrive(a, V);
        yield* shakeOff(a);
        if (party.lead === a) {
          V.Q.join(a);
          while (true) {
            const sp = V.Q.spot(a);
            if (Math.hypot(sp[0] - a.x, sp[1] - a.y) > 1) { a.act = 'walk'; yield ['walk', sp[0], sp[1]]; }
            a.act = 'stand'; a.look = sp[2] ?? null;
            if (V.Q.pos(a) === 0) { const tb = V.tables.find((t) => t.state === 'free' && t.seats.length >= party.size); if (tb) { tb.state = 'seating'; tb.party = party; party.table = tb; break; } }
            yield ['wait', 0.3];
          }
          V.Q.leave(a);
        } else {
          // members hang near the door behind their leader
          a.act = 'walk'; yield ['walk', V.X((cfg.door || { x: -0.07 }).x + 0.04) + party.members.indexOf(a) * 26 * V.u, V.lane()];
          a.act = 'talk'; a.actT = 0; a.look = party.lead.x; yield ['until', () => party.table];
        }
        const tb = party.table, seat = tb.seats[party.members.indexOf(a)];
        seat.who = a; a.seat = seat; a.buddy = party.members[(party.members.indexOf(a) + 1) % party.size];
        a.act = 'walk'; yield ['walk', seat.x, V.lane()];
        a.sitting = true; a.x = seat.x; a.y = seat.y; a.face = seat.dir; a.look = tb.x; a.act = 'stand';
        if (party.lead === a) {
          yield ['until', () => party.members.every((m) => m.sitting)];
          tb.state = 'menu'; a.act = 'read'; a.actT = 0; yield ['wait', 2.5];
          tb.state = 'order'; const jo = V.job({ kind: 'order', table: tb, role: 'waiter' });
          yield ['until', () => jo.state === 'done'];
          tb.state = 'waiting';
          const jc = V.job({ kind: 'prep', table: tb, dish: cfg.tableDish ? cfg.tableDish(tb, V) : null, role: 'cook' });
          yield ['until', () => jc.state === 'ready'];
          const js = V.job({ kind: 'serve', table: tb, dish: jc.dish, role: 'waiter' });
          yield ['until', () => js.state === 'done'];
          tb.state = 'eating'; tb.eatT = 0;
        }
        // everyone waits for food, chats
        while (!(tb.state === 'eating')) { a.act = Math.random() < 0.6 ? 'talk' : 'stand'; a.actT = 0; a.look = a.buddy.x; yield ['wait', 1 + Math.random() * 1.5]; }
        if (cfg.partyEat) yield* cfg.partyEat(a, tb, V, eat);
        else yield* eat(a, seat.dish || tb.dishes[party.members.indexOf(a) % tb.dishes.length], 5);
        a.done_eating = true;
        if (party.lead === a) {
          yield ['until', () => party.members.every((m) => m.done_eating)];
          tb.state = 'bill'; const jb = V.job({ kind: 'bill', table: tb, role: 'waiter' });
          a.act = 'wave'; a.actT = 0; a.look = V.X(cfg.passX ?? 0.5); yield ['wait', 1.2]; a.act = 'stand';
          yield ['until', () => jb.state === 'paying'];
          a.act = 'pay'; a.actT = 0; a.item2 = Items.card; yield ['wait', 1.4]; jb.state = 'paid'; a.item2 = null;
          party.leaving = true;
        }
        yield ['until', () => party.leaving];
        yield ['wait', party.members.indexOf(a) * 0.4];
        a.sitting = false; a.y = V.lane(); seat.who = null; seat.dish = null; a.seat = null;
        if (party.members.every((m) => !m.sitting)) { tb.state = 'dirty'; V.job({ kind: 'clear', table: tb, role: 'waiter' }); }
        yield* leave(a);
      },
    };
    V.flows = flows; V.eat = eat; V.leave = leave;
    V.party = (n, opt = {}) => {
      const party = { size: n, members: [], table: null };
      for (let i = 0; i < n; i++) { const a = V.customer(Object.assign({ party, dx: -i * 34 * V.u, look: (opt.looks || [])[i] }, opt, { party })); party.members.push(a); }
      party.lead = party.members[0];
      return party;
    };

    /* ---------------- staff ---------------- */
    // staff spec: { look, x, y (neck, fraction), role: 'cook'|'waiter'|'idle', layer: 'back'|'floor', home, idle: [[act, secs], ...], accepts(job) }
    V.addStaff = (spec) => {
      const P = V.person(spec.look, spec.k || 1);
      const s = Crowd.agent(P, V.X(spec.x), spec.floor ? (spec.feetY ? V.Y(spec.feetY) : V.lane()) : V.Y(spec.y), Object.assign({ sitting: !spec.floor, kind: 'staff', speed: spec.speed || 70 }, spec.opt || {}));
      s.spec = spec; s.home = [s.x, s.y]; s.role = spec.role || 'idle';
      Crowd.run(s, (spec.life || staffLives[s.role] || staffLives.idle)(s));
      V.staff.push(s); return s;
    };
    function* idleLoop(s, n = 1) {
      const list = s.spec.idle || [['idle', 2]];
      for (let i = 0; i < n; i++) { const [act, d] = list[Math.floor(Math.random() * list.length)]; s.act = act; s.actT = 0; yield ['wait', d * (0.8 + Math.random() * 0.4)]; }
    }
    const takeJob = (s, kinds) => V.jobs.find((j) => j.state === 'new' && kinds.includes(j.kind) && (!j.role || j.role === s.role) && (s.spec.lane === undefined || j.lane === undefined || j.lane === s.spec.lane) && (!s.spec.accepts || s.spec.accepts(j, V)));
    const staffLives = {
      *idle(s) { while (true) yield* idleLoop(s); },
      *cook(s) {
        while (true) {
          const j = takeJob(s, ['prep']);
          if (!j) { yield* idleLoop(s); continue; }
          j.state = 'cooking'; j.by = s; s.job = j;
          const steps = cfg.prep ? cfg.prep(j, s, V) : [['work', 2.5]];
          for (const st of steps) {
            if (st.walk !== undefined) { s.act = s.sitting ? 'shuffle' : s.carry ? 'carry' : 'walk'; yield ['walk', V.X(st.walk), s.home[1]]; }
            s.act = st[0]; s.actT = 0; s.step = st; if (st.face) s.face = st.face; if (st.on) st.on(s, j, V);
            yield ['wait', st[1]];
            if (st.after) st.after(s, j, V);
          }
          if (j.cust && cfg.flow !== 'table') { s.act = 'hand'; s.actT = 0; s.look = j.cust.x; j.state = 'ready'; yield ['wait', 0.9]; s.look = null; }
          else j.state = 'ready';
          s.job = null;
          if (Math.abs(s.x - s.home[0]) > 2) { s.act = s.sitting ? 'shuffle' : 'walk'; s.carry = null; yield ['walk', s.home[0], s.home[1]]; }
        }
      },
      *waiter(s) {
        while (true) {
          const j = takeJob(s, ['order', 'serve', 'bill', 'clear', 'task']);
          if (!j) {
            if (Math.hypot(s.x - s.home[0], s.y - s.home[1]) > 3) { s.act = 'walk'; yield ['walk', s.home[0], s.home[1]]; }
            yield* idleLoop(s); continue;
          }
          j.state = 'taken'; j.by = s; s.job = j;
          const tb = j.table, side = tb ? (tb.x > V.W / 2 ? -1 : 1) : 1;
          if (j.kind === 'serve' || j.carry) { s.act = 'walk'; yield ['walk', V.X(j.passX ?? (j.dish && j.dish.passX) ?? cfg.passX ?? 0.5), V.lane()]; s.act = 'pickup'; s.actT = 0; s.face = 1; yield ['wait', 0.7]; s.carry = cfg.tray ? cfg.tray(j, V) : null; }
          if (tb) { s.act = s.carry ? 'carry' : 'walk'; yield ['walk', tb.x + side * (tb.rx || 60 * V.u) * 1.05, V.lane()]; s.face = -side; s.look = tb.x; }
          else if (j.x !== undefined) { s.act = 'walk'; yield ['walk', V.X(j.x), V.lane()]; }
          if (j.kind === 'order') { s.act = 'order'; s.actT = 0; yield ['wait', 2.6]; j.state = 'done'; }
          else if (j.kind === 'serve') { s.act = 'serve'; s.actT = 0; yield ['wait', 1.1]; s.carry = null; tb.dishes = j.dish ? (Array.isArray(j.dish) ? j.dish : [j.dish]) : []; tb.dishes.forEach((d) => { if (d.left === undefined) d.left = 1; }); tb.party.members.forEach((m, i) => { if (m.seat) m.seat.dish = tb.dishes[i % tb.dishes.length]; }); if (cfg.onServe) cfg.onServe(tb, V); yield ['wait', 0.6]; j.state = 'done'; }
          else if (j.kind === 'bill') { s.act = 'bill'; s.actT = 0; j.state = 'paying'; yield ['until', () => j.state === 'paid']; s.act = 'bow'; s.actT = 0; yield ['wait', 0.9]; j.state = 'done'; }
          else if (j.kind === 'clear') { s.act = 'wipe'; s.actT = 0; yield ['wait', 2.2]; tb.dishes = []; tb.state = 'free'; tb.party = null; j.state = 'done'; s.carry = cfg.dirtyTray ? cfg.dirtyTray(V) : null; if (s.carry) { s.act = 'carry'; yield ['walk', V.X(cfg.passX ?? 0.5), V.lane()]; s.carry = null; } }
          else if (j.kind === 'task') { s.act = j.act || 'serve'; s.actT = 0; if (j.start) j.start(s, V); yield ['wait', j.dur || 2]; if (j.finish) j.finish(s, V); s.carry = null; j.state = 'done'; }
          s.look = null; s.job = null;
        }
      },
    };
    V.staffLives = staffLives;

    /* ---------------- generic staff poses (worlds override per act via cfg.pose) ---------------- */
    function staffPose(s, ps, t) {
      const k = s.actT;
      if (s.sitting) ps.legs = null;
      if (s.act === 'shuffle' && s.sitting) { ps.legs = null; }
      if (cfg.pose && cfg.pose(s, ps, t, V) !== false) return;
      const A = (x, y, o = {}) => Object.assign({ x, y, grip: 'fist' }, o);
      switch (s.act) {
        case 'order': ps.arms = [A(-6, 22, { side: -1, item: Items.notepad }), A(4 + Math.sin(k * 9) * 1.5, 18, { side: 1, item: (c, x, y) => { c.strokeStyle = '#2a2a2a'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3, y - 7); c.stroke(); } })]; ps.face.lookY = 0.6; ps.head.nod = 1; ps.face.mouth = 'smile'; break;
        case 'serve': case 'pickup': ps.arms = [A(-22 + Math.min(1, k) * 10, 26 - Math.min(1, k) * 6, { side: -1, grip: 'open' }), A(-18, 30, { side: 1, grip: 'open' })]; ps.lean = 0.08; ps.face.mouth = 'big'; ps.head.nod = 0.6; break;
        case 'bill': ps.arms = [A(-24, 28, { side: -1, grip: 'open', item: (c, x, y) => { c.fillStyle = '#2a1a10'; c.fillRect(x - 6, y - 1, 12, 3); c.fillStyle = '#f4ece0'; c.fillRect(x - 4, y - 3, 8, 2); } }), A(12, 42, { side: 1 })]; ps.face.mouth = 'smile'; break;
        case 'bow': ps.arms = [A(-6, 44, { side: -1 }), A(6, 44, { side: 1 })]; ps.lean = 0.18; ps.head.nod = 2; ps.face.eyes = 'happy'; ps.face.mouth = 'smile'; break;
        case 'wipe': ps.arms = [A(-22 + Math.sin(t * 7) * 8, 38, { side: -1, grip: 'open', handAng: 0.3 }), A(10, 38, { side: 1 })]; ps.lean = 0.12; ps.head.nod = 1.5; ps.face.lookY = 1; break;
        case 'hand': ps.arms = [A(-30 * Math.min(1, k * 2), 24, { side: -1, item: s.job && s.job.dish && s.job.dish.hand }), A(10, 40, { side: 1 })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; break;
        case 'carry': case 'walk': break;
        default: if (!ps.arms.length) ps.arms = [A(-14, 42, { side: -1 }), A(14, 42, { side: 1 })];
      }
    }
    V.staffPose = staffPose;

    /* ---------------- default tables ---------------- */
    // table spec: { x, y (table-top centre, fraction), rx, seats: [[dx (px@u), dir]] }
    V.addTable = (spec) => {
      const tb = Object.assign({ state: 'free', dishes: [], party: null, eatT: 0, S: {} }, spec);
      tb.x = V.X(spec.x); tb.y = V.Y(spec.y); tb.rx = (spec.rx || 60) * V.u; tb.ry = (spec.ry || spec.rx * 0.24 || 15) * V.u;
      tb.seats = (spec.seats || [[-1, 1], [1, -1]]).map(([dx, dir], i) => ({ x: tb.x + dx * tb.rx * 0.95, y: tb.y - (spec.neck || 64) * V.sc, dir, table: tb, i, who: null, back: true }));
      V.tables.push(tb); return tb;
    };

    /* ---------------- events ---------------- */
    function makeEvents() {
      const common = [];
      if (cfg.cat !== false) common.push({ at: cfg.catAt || 0.12, name: 'cat', dur: 26, start() { V.S.cat = { x: -V.X(0.05), t: 0, mode: 'walk', col: cfg.catCol || '#e8a050' }; }, end() { V.S.cat = null; } });
      if (cfg.flow === 'table' && cfg.birthday !== false) common.push({ at: 0.55, name: 'birthday', dur: 24, start() { const tb = V.tables.find((t) => t.state === 'eating' || t.state === 'waiting'); if (tb) { V.S.bday = { tb, t: 0 }; } }, end() { V.S.bday = null; } });
      common.push({ at: 0.93, name: 'closing', dur: 999, start() { V.S.closing = true; }, end() { V.S.closing = false; } });
      V.ev = Amb.scheduler(common.concat(cfg.events ? cfg.events(V) : []).sort((a, b) => a.at - b.at));
    }

    /* ---------------- resize: rebuild layers + people ---------------- */
    function resize(w, h, d) {
      if (w === V.W && h === V.H && d === V.D) return;
      V.W = w; V.H = h; V.D = d; V.u = h / 800; V.sc = V.u * (cfg.peopleScale || 1.7);
      V.rnd = mulberry32(cfg.seed || 7);
      const L = (fn) => { const [c, x] = hiCanvas(w, h, d); fn(x, V); return c; };
      layers = {};
      if (cfg.back) layers.back = L(cfg.back);
      if (cfg.counter) layers.counter = L(cfg.counter);
      if (cfg.foreStatic) layers.fore = L(cfg.foreStatic);
      vignette = (() => { const [c, x] = hiCanvas(w, h, 1); x.fillStyle = radial(x, w / 2, h * 0.5, Math.max(w, h) * 0.72, [[0, 'rgba(0,0,0,0)'], [0.68, 'rgba(0,0,0,0)'], [1, cfg.vignette || 'rgba(20,8,4,0.45)']]); x.fillRect(0, 0, w, h); return c; })();
      V.agents = []; V.staff = []; V.tables = []; V.seats = []; V.jobs = []; V.fx = []; V.S = {};
      const qs = cfg.queue ? cfg.queue(V) : [0, 1, 2, 3, 4, 5].map((i) => [V.X(0.12) + i * 60 * V.u, V.lane(), V.X(0.5)]);
      V.Q = Crowd.queue(qs); V.Qs = cfg.queues ? cfg.queues(V).map((q) => Crowd.queue(q)) : null;
      if (cfg.setup) cfg.setup(V);
      V.tables.forEach((tb) => V.seats.push(...tb.seats));
      if (cfg.seats) V.seats.push(...cfg.seats(V));
      makeEvents();
      // populate: a few customers already mid-flow so the room is alive from the first frame
      const n0 = cfg.initial ?? 4;
      for (let i = 0; i < n0; i++) { spawn(true); V.agents.slice(-3).forEach((a) => { a.x = V.X(0.04 + Math.random() * 0.3); }); }
      if (cfg.afterSetup) cfg.afterSetup(V);
      spawnT = 2;
    }
    function spawn(initial) {
      if (cfg.spawn) return cfg.spawn(V, initial);
      if (cfg.flow === 'table') { const r = Math.random(); V.party(r < 0.25 ? 1 : r < 0.6 ? 2 : r < 0.85 ? 3 : 4); }
      else V.customer();
    }
    V.spawn = spawn;

    /* ---------------- draw ---------------- */
    function drawFx(ctx, dt) {
      V.fx = V.fx.filter((p) => (p.life -= dt) > 0);
      for (const p of V.fx) {
        p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 3;
        const a = p.life / p.max;
        if (p.kind === 'steam') { const k = 1 - a; ctx.fillStyle = `rgba(255,255,255,${a * 0.16})`; ellipse(ctx, p.x + Math.sin(V.t * 2 + p.rot) * 6 * V.u, p.y, p.sz * (1 + k * 2), p.sz * (0.8 + k * 1.6)); ctx.fill(); }
        else if (p.kind === 'spark') { ctx.fillStyle = `rgba(255,${180 + (p.rot * 20 % 60) | 0},80,${a})`; ctx.fillRect(p.x, p.y, p.sz * 0.6, p.sz * 0.6); }
        else if (p.kind === 'drop') { ctx.fillStyle = rgba(p.col, a); ellipse(ctx, p.x, p.y, p.sz * 0.5, p.sz * 0.8); ctx.fill(); }
        else if (p.kind === 'confetti') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = rgba(p.col, a); ctx.fillRect(-p.sz, -p.sz * 0.4, p.sz * 2, p.sz * 0.8); ctx.restore(); }
        else { ctx.fillStyle = rgba(p.col, a); ellipse(ctx, p.x, p.y, p.sz, p.sz); ctx.fill(); }
      }
    }
    function drawCat(ctx, dt, t) {
      const c = V.S.cat; if (!c) return; c.t += dt;
      const path = cfg.catPath || [0.02, 0.2];
      if (c.t < 8) { c.x = lerp(-V.X(0.05), V.X(path[1]), c.t / 8); c.mode = 'walk'; c.dir = 1; }
      else if (c.t < 18) c.mode = c.t % 4 < 2 ? 'sit' : 'groom';
      else { c.x -= 50 * V.u * dt; c.mode = 'walk'; c.dir = -1; }
      Life.cat(ctx, c.x, V.H * (cfg.catY || 0.995), V.u * 1.6, t, c.mode, c.dir, c.col);
    }
    function draw(ctx, t, dt, env) {
      dt = Math.min(dt, 0.05); V.t = t; V.dt = dt; V.env = env; if (!env.thumb) window.__V = V;
      const A = Amb.st, p = env.p || 0; V.A = A;
      V.ev.update(p, dt); if (p < 0.02 && V.ev.list.every((e) => e.fired)) V.ev.reset();
      V.on = (n) => V.ev.on(n);
      for (const e of env.events || []) if (e.t > lastEv) {
        lastEv = e.t;
        V.agents.forEach((a) => { if (e.big) { if (Math.random() < 0.7) a.cheer = 1.6; } else if (Math.random() < 0.4) a.react = 1.0; });
        if (e.big) V.staff.forEach((s) => { if (Math.random() < 0.6) s.cheer = 1.2; });
        if (cfg.onClear) cfg.onClear(e, V);
      }
      spawnT -= dt;
      const cap = (cfg.cap || 10) * (0.45 + 0.55 * A.crowd);
      if (spawnT <= 0 && V.agents.length < cap && !V.S.closing) { spawn(false); spawnT = (cfg.spawnEvery || 5) * (0.6 + Math.random() * 0.8) / Math.max(0.35, A.crowd); }
      V.agents.forEach((a) => { Crowd.update(a, dt, V.u); Life.tickWeather(a, dt); });
      V.staff.forEach((s) => Crowd.update(s, dt, V.u));
      V.agents = V.agents.filter((a) => !a.done);
      V.jobs = V.jobs.filter((j) => j.state !== 'done' || V.t - j.t0 < 1);
      if (cfg.tick) cfg.tick(V, dt, t);
      if (cfg.tableTick) V.tables.forEach((tb) => cfg.tableTick(tb, dt, V));
      // ---- layers ----
      if (layers.back) ctx.drawImage(layers.back, 0, 0, V.W, V.H);
      (cfg.windows || []).forEach((w) => { Amb.sky(ctx, V.X(w.x), V.Y(w.y), V.X(w.w), V.Y(w.h), t, { city: w.city ? (c, x, y, ww, hh, l) => w.city(c, x, y, ww, hh, l, V) : null }); if (w.frame) w.frame(ctx, V, t); });
      if (cfg.backLive) cfg.backLive(ctx, t, dt, V);
      const pose = (s) => ({ tweak: (ps) => staffPose(s, ps, t) });
      V.staff.filter((s) => s.spec.layer === 'back').forEach((s) => Crowd.draw(ctx, s, t, V.sc * (s.spec.k || 1), Object.assign(pose(s), { noArms: !!s.spec.armsOver })));
      if (cfg.midLive) cfg.midLive(ctx, t, dt, V);
      if (layers.counter) ctx.drawImage(layers.counter, 0, 0, V.W, V.H);
      V.staff.filter((s) => s.spec.layer === 'back' && s.spec.armsOver).forEach((s) => Crowd.draw(ctx, s, t, V.sc * (s.spec.k || 1), Object.assign(pose(s), { only: 'arms' })));
      if (cfg.counterLive) cfg.counterLive(ctx, t, dt, V);
      // floor: sort tables, seated people, walkers and floor staff by depth
      const items = [];
      V.tables.forEach((tb) => items.push({ y: tb.y + 0.5, f: () => (cfg.drawTable ? cfg.drawTable(ctx, tb, t, V) : Decor.roundTable(ctx, tb.x, tb.y, tb.rx, tb.ry)) }));
      V.agents.filter((a) => !a.hidden).forEach((a) => items.push({ y: a.sitting ? (a.seat && a.seat.table ? a.seat.table.y - 1 : a.y + 200 * V.u * (a.seat && a.seat.front ? 1 : 0)) : a.y, f: () => { if (a.sitting && cfg.drawSeat && a.seat) cfg.drawSeat(ctx, a.seat, t, V, 'under'); Crowd.draw(ctx, a, t, V.sc, { noLegs: a.sitting && !(a.seat && a.seat.legs), tweak: cfg.custPose ? (ps) => cfg.custPose(a, ps, t, V) : null }); } }));
      V.staff.filter((s) => s.spec.layer !== 'back').forEach((s) => items.push({ y: s.y, f: () => Crowd.draw(ctx, s, t, V.sc * (s.spec.k || 1), pose(s)) }));
      if (cfg.floorProps) cfg.floorProps(V, t).forEach((it) => items.push(it));
      if (V.S.cat) items.push({ y: V.H * (cfg.catY || 0.995), f: () => drawCat(ctx, dt, t) });
      if (cfg.seats && cfg.drawSeat) V.seats.filter((s) => !s.table && !s.who).forEach((s) => items.push({ y: s.y + 1, f: () => cfg.drawSeat(ctx, s, t, V, 'empty') }));
      items.sort((a, b) => a.y - b.y).forEach((it) => it.f());
      if (A.wet || A.weather === 'snow') { ctx.fillStyle = A.weather === 'snow' ? 'rgba(255,255,255,0.3)' : 'rgba(150,180,220,0.2)'; for (let i = 0; i < 5; i++) { ellipse(ctx, V.X((cfg.door ? Math.max(0.02, cfg.door.x + 0.1) : 0.06) + i * 0.045), V.H * (0.955 + (i % 2) * 0.03), 20 * V.u, 4 * V.u); ctx.fill(); } }
      if (V.S.closing && cfg.closingProps !== false) Life.wetSign(ctx, V.X(cfg.wetSignX || 0.33), V.H * 0.99, V.u * 1.6);
      drawFx(ctx, dt);
      if (cfg.front) cfg.front(ctx, t, dt, V);
      if (layers.fore) ctx.drawImage(layers.fore, 0, 0, V.W, V.H);
      // light pools
      const lit = clamp(0.3 + A.lights * 0.8 - (V.S.closing ? 0.35 : 0), 0.1, 1.1);
      V.lit = lit;
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      (cfg.lights || []).forEach((l, i) => { const r = (l.r || 160) * V.u, x = V.X(l.x), y = V.Y(l.y), fl = l.flicker ? 0.85 + 0.15 * Math.sin(t * 13 + i * 3) * Math.sin(t * 7.3 + i) : 1; ctx.fillStyle = radial(ctx, x, y, r, [[0, rgba(l.col || '#ffd8a0', (l.a || 0.22) * lit * fl)], [1, rgba(l.col || '#ffd8a0', 0)]]); ctx.fillRect(x - r, y - r, r * 2, r * 2); });
      ctx.fillStyle = `rgba(255,220,180,${(env.flash || 0) * 0.15})`; ctx.fillRect(0, 0, V.W, V.H);
      ctx.restore();
      if (cfg.post) cfg.post(ctx, t, dt, V);
      Amb.grade(ctx, V.W, V.H, { indoor: cfg.outdoor ? false : true });
      ctx.drawImage(vignette, 0, 0, V.W, V.H);
    }
    return { resize, draw, selfGrade: true, V };
  };
}
