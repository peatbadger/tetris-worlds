/* ================= World 1 · Kaiten Sushi — PAINTED edition =================
   Base: AI-painted empty restaurant (assets/sushi/bg.webp, cover-fit, gentle parallax).
   On top: painted cut-out people (pose sprites from tools/art_build.py) driven by a per-character behaviour AI
   (weighted, non-repeating choices, varied timings, moods, hunger), interactions (orders, hand-overs, photos,
   reactions to line clears), customers leaving and new parties arriving; a live conveyor belt with photo sushi
   on drawn plates (some domed), steam, swaying lanterns, motes, time-of-day + weather in the window and grade. */
function makeSushiArtStage() {
  const WID = 'sushi', BW = 1280, BH = 720;
  let W = 0, H = 0, D = 1, k = 1, ox = 0, oy = 0, extraB = 0, glowSpr = null, fallback = null, built = false, lastEv = 0, simT = 0;
  let SC, bg, occBack, occCase, occFront, lant = [], puff, vign;
  const spr = (n) => Art.img(WID, n), meta = (n) => Art.meta(WID, n);
  const ptsY = (pts, x) => { if (x <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); } return pts[pts.length - 1][1]; };
  const FOODS = ['food.salmon', 'food.tuna', 'food.ikura', 'food.tamago', 'food.kappa', 'food.ebi', 'food.saba'];
  const RIMS = [['#f4efe4', '#c8283a'], ['#f4efe4', '#2a64b8'], ['#e9e2cf', '#2f7a44'], ['#2a2420', '#d8a830'], ['#f4efe4', '#1a1a1a'], ['#d04030', '#f0d070'], ['#f4efe4', '#7a3aa0']];

  /* ---------- one-time build (needs the images) ---------- */
  function build() {
    SC = Art.scene(WID); bg = spr('bg');
    const clipCanvas = (path, extra) => { const c = makeCanvas(BW, BH), x = c.getContext('2d'); x.save(); path(x); x.clip(); x.drawImage(bg, 0, 0); x.restore(); if (extra) extra(x); return c; };
    const fl = SC.frontLine, bl = SC.backLine, cs = SC.case;
    const crop = (c, x0, y0) => { const o = makeCanvas(BW - x0, BH - y0); o.getContext('2d').drawImage(c, -x0, -y0); o.ox = x0; o.oy = y0; return o; };
    occFront = clipCanvas((x) => { x.beginPath(); fl.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.lineTo(BW, BH); x.lineTo(0, BH); x.closePath(); });
    occBack = clipCanvas((x) => { x.beginPath(); x.moveTo(bl[0][0], bl[0][1]); x.lineTo(bl[1][0], bl[1][1]); x.lineTo(BW, BH); x.lineTo(bl[0][0], BH); x.closePath(); });
    occCase = (() => { const c = makeCanvas(BW, BH), x = c.getContext('2d');
      x.save(); x.beginPath(); x.rect(cs.x0, cs.glassTo, cs.x1 - cs.x0, BH - cs.glassTo); x.clip(); x.drawImage(bg, 0, 0); x.restore();
      x.save(); x.globalAlpha = cs.glassAlpha; x.beginPath(); x.rect(cs.x0, cs.top, cs.x1 - cs.x0, cs.glassTo - cs.top); x.clip(); x.drawImage(bg, 0, 0); x.restore(); return c; })();
    occFront = crop(occFront, 0, Math.min(...fl.map((p) => p[1])) - 1); occBack = crop(occBack, bl[0][0], Math.min(bl[0][1], bl[1][1]) - 1);
    occCase = (() => { const o = makeCanvas(cs.x1 - cs.x0 + 2, BH - cs.top + 1); o.getContext('2d').drawImage(occCase, -cs.x0 + 1, -cs.top + 1); o.ox = cs.x0 - 1; o.oy = cs.top - 1; return o; })();
    glowSpr = (() => { const c = makeCanvas(128, 128), x = c.getContext('2d'); x.fillStyle = radial(x, 64, 64, 64, [[0, 'rgba(255,140,60,1)'], [0.35, 'rgba(255,110,40,0.35)'], [1, 'rgba(255,100,40,0)']]); x.fillRect(0, 0, 128, 128); return c; })();
    lant = (SC.lanterns || []).map(([x0, y0, x1, y1], i) => { // feathered cut-outs of the painted lanterns so they can sway
      const w = x1 - x0, h = y1 - y0, c = makeCanvas(w, h), x = c.getContext('2d');
      x.drawImage(bg, x0, y0, w, h, 0, 0, w, h); x.globalCompositeOperation = 'destination-in';
      x.fillStyle = radial(x, w / 2, h * 0.55, Math.max(w, h) * 0.55, [[0, 'rgba(0,0,0,1)'], [0.78, 'rgba(0,0,0,1)'], [1, 'rgba(0,0,0,0)']]); x.fillRect(0, 0, w, h);
      return { c, x0, y0, w, h, px: (x0 + x1) / 2, ph: i * 2.1, cy: y0 + h * 0.6 };
    });
    puff = (() => { const c = makeCanvas(64, 64), x = c.getContext('2d'); x.fillStyle = radial(x, 32, 32, 32, [[0, 'rgba(255,250,240,0.55)'], [0.5, 'rgba(255,245,230,0.22)'], [1, 'rgba(255,240,220,0)']]); x.fillRect(0, 0, 64, 64); return c; })();
    initSim(); built = true;
  }

  /* ---------- characters ---------- */
  const EM = { hi: 'いらっしゃいませ!', bye: 'ありがとうございました!', order: 'すみません!', yum: 'おいしい!', kanpai: 'カンパイ!', hey: 'へい!', dozo: 'どうぞ!', service: 'サービス!', wow: 'すごい!', yay: 'やったー!', snap: 'パシャ!', tsun: 'ツーン!', umai: 'うまい!', ho: 'ほっほ', oo: 'おっ!' };
  const DEF = {
    chef: { staff: true, rest: 'chef.slice' },
    taisho: { staff: true, rest: 'taisho.brush' },
    appr: { staff: true, rest: 'appr.roll' },
    sal: { rest: 'sal.sip', bites: [2, 3], hungerRate: 0.010, side: 'L' },
    sal2: { rest: 'sal2.phone', bites: [1, 2], hungerRate: 0.013, side: 'L' },
    woman: { rest: 'woman.laugh', bites: [2, 3], hungerRate: 0.012, side: 'L' },
    gpa: { rest: 'gpa.paper', bites: [1, 2], hungerRate: 0.007, side: 'R' },
    kid: { rest: 'kid.wave', bites: [2, 3], hungerRate: 0.018, side: 'R' },
    couple: { rest: 'pair.whisper', bites: [2, 3], hungerRate: 0.011, pair: true },
  };
  const PARTIES = {
    sal: { key: 'sal', seats: ['L1'], cast: [['sal', 'L1']], w: 1 },
    sal2: { key: 'sal2', seats: ['L1'], cast: [['sal2', 'L1']], w: 1.1 },
    woman: { key: 'woman', seats: ['L2'], cast: [['woman', 'L2']], w: 1 },
    gk: { key: 'gk', seats: ['R1', 'R2'], cast: [['gpa', 'R1'], ['kid', 'R2']], w: 1 },
    coupleL: { key: 'couple', seats: ['L1', 'L2'], cast: [['couple', 'LP']], w: 0.9 },
    coupleR: { key: 'couple', seats: ['R1', 'R2'], cast: [['couple', 'RP']], w: 0.9 },
  };
  let actors = [], parties = [], plates = [], orders = [], later = [], seatFree = {}, refillT = {}, spawnT = 0, flashes = [], lastLeft = null;
  const byId = (id) => actors.find((a) => a.id === id && !a.gone);
  const after = (t, fn) => later.push({ t: simT + t, fn });
  function spotOf(name) { const s = SC.spots[name]; if (s) return s; const L = name === 'LP' ? ['L1', 'L2'] : ['R1', 'R2'], a = SC.spots[L[0]], b = SC.spots[L[1]]; return { x: (a.x + b.x) / 2, head: Math.max(a.head, b.head) + (name === 'LP' ? 4 : -8), s: name === 'LP' ? 0.66 : 0.7, layer: 'front', gap: (b.x - a.x) * 0.98 }; }
  function makeActor(id, spot) {
    const def = DEF[id], sp = spotOf(spot), rm = meta(def.rest);
    const s = sp.s, fix = (SC.scaleFix || {})[def.rest] || 1;
    return { id, def, spot, sp, x: sp.x, waist: sp.head + rm.ay * s * fix, s, cur: def.rest, prev: null, fk: 1, fadeDur: 0.45, flip: false, prevFlip: false,
      actT: 0, dur: rand(1, 4), tag: 'rest', hist: [], queue: [], pres: def.staff ? 1 : 0, presV: 0, dx: 0, mood: rand(0.45, 0.8), hunger: rand(0.02, 0.38), plate: 0, stack: 0, served: 0,
      emote: null, ph: rand(100), lock: 0, gone: false, away: 0, fromChef: false };
  }
  function setPose(a, act) {
    const pose = act.pose; a.tag = act.tag || pose; a.actT = 0; a.dur = Array.isArray(act.dur) ? rand(act.dur[0], act.dur[1]) : (act.dur || rand(2, 4));
    const flip = !!act.flip;
    if (pose !== a.cur || flip !== a.flip) { a.prev = a.cur; a.prevFlip = a.flip; a.cur = pose; a.flip = flip; a.fk = 0; a.fadeDur = act.fade || rand(0.35, 0.6); }
    a.onEnd = act.onEnd || null; if (act.onStart) act.onStart(a);
    if (act.emote) emote(a, act.emote, act.emoteDelay || 0.25);
    a.hist.unshift(a.tag); a.hist.length = Math.min(a.hist.length, 4);
  }
  function emote(a, txt, delay = 0) { after(delay, () => { if (!a.gone) a.emote = { txt, t: 0, dur: txt.length > 4 ? 2.4 : 1.6 }; }); }
  function choose(a, opts) { // weighted random; recently used actions are strongly discouraged -> no fixed loops
    const ws = opts.filter((o) => o && o[0] > 0).map(([w, act]) => [w * (a.hist[0] === (act.tag || act.pose) ? 0.08 : a.hist[1] === (act.tag || act.pose) ? 0.35 : 1) * rand(0.8, 1.25), act]);
    let tot = ws.reduce((s, o) => s + o[0], 0), r = Math.random() * tot; for (const [w, act] of ws) { if ((r -= w) <= 0) return act; } return ws.length ? ws[ws.length - 1][1] : { pose: a.cur, dur: [1, 2] };
  }
  function force(a, act, delay = 0) { if (!a || a.gone) return; const go = () => { if (a.gone || a.lock > 0 || a.leaving) return; a.queue = []; setPose(a, act); }; delay ? after(delay, go) : go(); }
  const late = () => Amb.st.phase === 'late' || Amb.st.next === 'late';
  const diners = () => actors.filter((a) => !a.def.staff && !a.gone && !a.leaving && a.pres > 0.6);
  const sideOf = (a) => (a.x < 640 ? 'L' : 'R');
  const neighbour = (a) => diners().find((b) => b !== a && sideOf(b) === sideOf(a));

  /* ---------- brains: each character has its own habits, pace and moods ---------- */
  const BRAIN = {
    chef(a) {
      const o = orders.find((q) => q.to === 'chef');
      if (o) { orders.splice(orders.indexOf(o), 1); const tgt = o.who;
        a.queue.push({ pose: 'chef.present', dur: [1.1, 1.5], tag: 'present', emote: EM.dozo, onEnd: () => servePlate(tgt, 'chef') }, { pose: 'chef.nod', dur: [0.9, 1.6], tag: 'nod', emote: Math.random() < 0.5 ? EM.hey : null });
        return { pose: 'chef.shape', dur: [1.6, 2.8], tag: 'prep' }; }
      const hungryL = diners().filter((d) => sideOf(d) === 'L' && !d.plate && d.hunger > 0.35 && !plates.some((p) => p.target === d));
      return choose(a, [[0.5, { pose: 'chef.slice', dur: [3, 8] }], [0.38, { pose: 'chef.shape', dur: [2.4, 5.5] }], [0.07, { pose: 'chef.nod', dur: [1, 2] }],
        [hungryL.length ? 0.16 : 0, { pose: 'chef.shape', dur: [1.6, 2.6], tag: 'omakase', onEnd: () => { const t = pick(hungryL); if (t && !t.gone) { a.queue.push({ pose: 'chef.present', dur: [1.1, 1.5], tag: 'present', emote: EM.dozo, onEnd: () => servePlate(t, 'chef') }); } } }]]);
    },
    taisho(a) {
      const o = orders.find((q) => q.to === 'taisho');
      if (o) { orders.splice(orders.indexOf(o), 1); const tgt = o.who;
        a.queue.push({ pose: 'taisho.hand', dur: [1.4, 1.9], tag: 'hand', flip: tgt.x < a.x, emote: Math.random() < 0.4 ? EM.dozo : null, onEnd: () => handTo(tgt) });
        return Math.random() < 0.5 ? { pose: 'taisho.torch', dur: [1.8, 2.8], tag: 'torch' } : { pose: 'taisho.brush', dur: [1.6, 2.6], tag: 'brush' }; }
      const R = diners().filter((d) => sideOf(d) === 'R'), kid = byId('kid');
      return choose(a, [[R.length ? 0.28 : 0.06, { pose: 'taisho.laugh', dur: [2, 4], tag: 'laugh', onStart: () => chatWith(a) }],
        [0.15, { pose: 'taisho.knife', dur: [2, 3.2], tag: 'knife', onStart: () => { const ap = byId('appr'); if (ap && Math.random() < 0.55) force(ap, { pose: 'appr.glance', dur: [1.2, 2], tag: 'glance' }, rand(0.3, 0.9)); } }],
        [0.22, { pose: 'taisho.brush', dur: [2, 3.6] }], [0.17, { pose: 'taisho.torch', dur: [1.8, 3] }],
        [kid && kid.pres > 0.9 && !kid.plate && kid.hunger > 0.3 ? 0.1 : 0, { pose: 'taisho.torch', dur: [1.6, 2.4], tag: 'treat', onEnd: () => { a.queue.push({ pose: 'taisho.hand', dur: [1.4, 1.9], tag: 'hand', flip: kid.x < a.x, emote: EM.service, onEnd: () => handTo(kid) }); } }],
        [0.035, { pose: 'taisho.laugh', dur: [0.6, 0.8], tag: 'away', onEnd: () => goAway(a, rand(5, 10)) }]]);
    },
    appr(a) {
      return choose(a, [[0.34, { pose: 'appr.roll', dur: [4, 8] }], [0.3, { pose: 'appr.wipe', dur: [3, 6] }], [0.09, { pose: 'appr.glance', dur: [1, 2] }],
        [0.12, { pose: 'appr.carry', dur: [2.5, 4], tag: 'carry', onEnd: () => { if (Math.random() < 0.55) goAway(a, rand(4, 8)); } }], [0.04, { pose: 'appr.bow', dur: [1.2, 1.6] }]]);
    },
    sal(a) {
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.3) return choose(a, [[0.6, { pose: 'sal.sip', dur: [1.8, 3.5], tag: 'sip' }], [0.25, { pose: 'sal.tie', dur: [1.5, 2.5], tag: 'tie' }]]);
      if (a.plate > 0) return { pose: 'sal.lift', dur: [1.3, 2.1], tag: 'bite', onEnd: () => a.queue.unshift({ pose: 'sal.chew', dur: [2, 3.6], tag: 'chew', onEnd: () => bite(a) }) };
      return choose(a, [[0.5, { pose: 'sal.sip', dur: [2.5, 6] }], [0.16 + (late() ? 0.3 : 0) + (a.mood < 0.4 ? 0.25 : 0), { pose: 'sal.tie', dur: [2.5, 5], tag: 'tie' }], [0.12, { pose: 'sal.chew', dur: [1.5, 3], tag: 'ponder' }]]);
    },
    sal2(a) {
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.3) return { pose: 'sal2.phone', dur: [2, 3.5], tag: 'phone' };
      if (a.plate > 0) return { pose: 'sal2.toast', dur: [2, 3.2], tag: 'enjoy', emote: Math.random() < 0.5 ? EM.umai : '♪', onEnd: () => bite(a) };
      return choose(a, [[0.45, { pose: 'sal2.phone', dur: [3, 8], tag: 'phone' }], [a.hunger > 0.5 && !pending(a) ? 0.7 : 0.05, { pose: 'sal2.raise', dur: [1.5, 2.4], tag: 'order', emote: EM.order, onEnd: () => order(a) }],
        [0.15 + a.mood * 0.3, { pose: 'sal2.toast', dur: [2, 4], tag: 'toast', emote: Math.random() < 0.4 ? EM.kanpai : null }]]);
    },
    woman(a) {
      const nb0 = neighbour(a);
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.35) return choose(a, [[0.4, { pose: 'woman.plate', dur: [1.4, 2.4], tag: 'admire' }], [nb0 ? 0.4 : 0.1, { pose: 'woman.laugh', dur: [1.6, 2.8], tag: 'chat' }], [0.3, { pose: 'woman.photo', dur: [1.6, 2.4], tag: 'snap2', onStart: () => after(0.9, () => flashes.push({ x: a.x + 18, y: a.waist - 150 * a.s, t: 0 })) }], [nb0 ? 0.2 : 0, { pose: 'woman.show', dur: [1.8, 3], tag: 'show', onStart: () => reactTo(nb0, 'show') }]]);
      if (a.plate > 0) return { pose: 'woman.eat', dur: [1.8, 3], tag: 'bite', onEnd: () => { bite(a); if (a.plate > 0) a.queue.unshift({ pose: 'woman.plate', dur: [1.2, 2.2], tag: 'admire' }); else a.queue.unshift({ pose: 'woman.laugh', dur: [1.5, 2.5], tag: 'happy', emote: EM.yum }); } };
      const nb = neighbour(a), near = plates.find((p) => p.st === 'belt' && !p.target && p.x > a.x && p.x < a.x + 160);
      return choose(a, [[nb ? 0.28 : 0.06, { pose: 'woman.show', dur: [2.4, 4], tag: 'show', onStart: () => nb && reactTo(nb, 'show') }], [nb ? 0.26 : 0.1, { pose: 'woman.laugh', dur: [2, 3.5], tag: 'chat' }],
        [near && a.hunger > 0.35 ? 0.5 : 0.1, { pose: 'woman.point', dur: [1.4, 2.4], tag: 'point', onStart: () => { if (near) near.want = a; } }],
        [a.hunger > 0.45 && !pending(a) ? 0.55 : 0.06, { pose: 'woman.tablet', dur: [2.4, 4], tag: 'order', onEnd: () => order(a) }], [0.08, { pose: 'woman.photo', dur: [1.8, 3], tag: 'selfie' }]]);
    },
    gpa(a) {
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.25) return { pose: 'gpa.savor', dur: [2.2, 4], tag: 'savor' };
      if (a.plate > 0) return { pose: 'gpa.chop', dur: [2, 4], tag: 'bite', onEnd: () => { bite(a); a.queue.unshift({ pose: 'gpa.savor', dur: [1.8, 3], tag: 'savor', emote: Math.random() < 0.4 ? EM.umai : null }); } };
      const kid = byId('kid');
      return choose(a, [[0.6, { pose: 'gpa.paper', dur: [5, 12], tag: 'paper' }], [kid ? 0.28 : 0.12, { pose: 'gpa.savor', dur: [2, 4], tag: 'smile' }], [a.hunger > 0.55 && !pending(a) ? 0.3 : 0, { pose: 'gpa.savor', dur: [1.5, 2.2], tag: 'order', onEnd: () => order(a) }]]);
    },
    kid(a) {
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.3) return choose(a, [[0.6, { pose: 'kid.wave', dur: [1.2, 2], tag: 'wave', emote: Math.random() < 0.3 ? 'おかわり!' : null }], [0.4, { pose: 'kid.cheer', dur: [1, 1.6], tag: 'cheer', onStart: () => kidCheer(a) }]]);
      if (a.plate > 0) return { pose: 'kid.plate', dur: [1.8, 3], tag: 'bite', onEnd: () => { bite(a); if (Math.random() < 0.45) a.queue.unshift({ pose: 'kid.cheer', dur: [1.1, 1.8], tag: 'cheer', emote: EM.yay, onStart: () => kidCheer(a) }); } };
      return choose(a, [[0.42, { pose: 'kid.wave', dur: [1.4, 3.2], tag: 'wave', onEnd: () => { if (a.hunger > 0.4 && !pending(a) && Math.random() < 0.6) order(a); } }], [0.14, { pose: 'kid.cheer', dur: [1.1, 2], tag: 'cheer', onStart: () => kidCheer(a) }],
        [a.stack ? 0.35 : 0.05, { pose: 'kid.plate', dur: [2, 4], tag: 'hold' }]]);
    },
    couple(a) {
      if (a.plate > 0 && a.hist[0] !== 'got' && Math.random() < 0.3) return choose(a, [[0.6, { pose: 'pair.whisper', dur: [2, 3.5], tag: 'whisper' }], [0.4, { pose: 'man.pour|wife.wave', dur: [1.8, 2.8], tag: 'pour' }]]);
      if (a.plate > 0) return { pose: 'pair.feed', dur: [2, 3.2], tag: 'feed', emote: '♥', onEnd: () => { bite(a); a.queue.unshift({ pose: Math.random() < 0.6 ? 'man.chew|wife.wasabi' : 'man.pour|wife.wasabi', dur: [1.8, 2.8], tag: 'wasabi', emote: EM.tsun, emoteDx: 1 }); } };
      return choose(a, [[0.5, { pose: 'pair.whisper', dur: [3, 7], tag: 'whisper' }], [0.22, { pose: 'man.pour|wife.wave', dur: [2.4, 4], tag: 'pour', onEnd: () => { if (a.hunger > 0.4 && !pending(a)) order(a); } }],
        [0.12, { pose: 'man.chew|wife.wave', dur: [1.8, 3], tag: 'wave2' }]]);
    },
  };
  const pending = (a) => orders.some((o) => o.who === a) || plates.some((p) => p.target === a);
  function order(a) { if (a.gone || pending(a)) return; orders.push({ who: a, to: sideOf(a) === 'L' ? 'chef' : 'taisho', t: simT }); }
  function bite(a) { if (a.plate <= 0) return; a.plate--; a.hunger = Math.max(0, a.hunger - 0.18); a.mood = Math.min(1, a.mood + 0.06); if (a.plate === 0) { a.stack++; a.served++; } }
  function receive(a, food, from) { a.plate = randi(a.def.bites[0], a.def.bites[1]); a.food = food; a.hunger = Math.max(0, a.hunger - 0.25); a.queue = []; a.lock = 0; a.actT = a.dur; if (from === 'chef' || from === 'taisho') a.mood = Math.min(1, a.mood + 0.1);
    const first = { sal: { pose: 'sal.lift', dur: [1.4, 2], tag: 'got', emote: EM.oo }, sal2: { pose: 'sal2.toast', dur: [1.6, 2.4], tag: 'got', emote: EM.umai }, woman: { pose: 'woman.plate', dur: [1.2, 2], tag: 'got' },
      gpa: { pose: 'gpa.chop', dur: [1.8, 3], tag: 'got' }, kid: { pose: 'kid.plate', dur: [1.4, 2.4], tag: 'got', emote: EM.yay }, couple: { pose: 'pair.feed', dur: [2, 3], tag: 'got', emote: '♥' } }[a.id];
    if (first) a.queue.push(first);
  }
  function chatWith(t) { const g = byId('gpa'), kid = byId('kid'), c = byId('couple');
    if (g && Math.random() < 0.7) force(g, { pose: 'gpa.savor', dur: [2, 3.5], tag: 'smile', emote: Math.random() < 0.4 ? EM.ho : null }, rand(0.3, 0.8));
    else if (kid && Math.random() < 0.6) force(kid, { pose: 'kid.wave', dur: [1.5, 2.5], tag: 'wave' }, rand(0.3, 0.8));
    else if (c && c.x > 640) force(c, { pose: 'man.pour|wife.wave', dur: [2, 3], tag: 'pour' }, rand(0.3, 0.8)); }
  function kidCheer(k2) { const g = byId('gpa'); if (g && !g.plate) force(g, { pose: 'gpa.savor', dur: [2, 3.2], tag: 'smile', emote: Math.random() < 0.5 ? EM.ho : null }, rand(0.35, 0.9)); }
  function reactTo(b, why) { // neighbour reacting to the woman showing her phone
    const r = { sal: { pose: 'sal.chew', dur: [1.6, 2.6], tag: 'look' }, sal2: { pose: 'sal2.toast', dur: [1.6, 2.6], tag: 'laugh', emote: Math.random() < 0.5 ? 'ハハハ' : null } }[b.id];
    if (r && !b.plate) force(b, r, rand(0.5, 1.1));
  }
  function goAway(a, t) { a.away = t; a.presV = -1; }

  /* ---------- plates on the belt ---------- */
  const beltY = (x) => ptsY(SC.beltY, x);
  function newPlate(x, target, src) { const p = { x, food: pick(FOODS), rim: randi(0, RIMS.length - 1), dome: Math.random() < 0.3, target: target || null, st: 'belt', t: 0, y: beltY(x), a: 1, src: src || 'belt', want: null }; plates.push(p); return p; }
  function servePlate(tgt, src) { if (!tgt || tgt.gone) return; const p = newPlate(SC.spots.board.x - 30, tgt, src); p.st = 'drop'; p.y0 = 405; p.dome = false; tgt.fromChef = true; }
  function handTo(tgt) { if (!tgt || tgt.gone || tgt.leaving) return; receive(tgt, pick(FOODS), 'taisho'); if (Math.random() < 0.5) emote(tgt, tgt.id === 'kid' ? EM.yay : 'ありがとう', 0.5); const ap = byId('appr'); if (ap && Math.random() < 0.3) force(ap, { pose: 'appr.bow', dur: [1.2, 1.6], tag: 'bow' }, 0.4); }
  function takePlate(p, a) {
    const photo = a.id === 'woman' && (a.fromChef || Math.random() < 0.55);
    p.taker = a; p.t = 0; p.fx = p.x; p.fy = p.y; a.lock = photo ? 4 : 0.6;
    if (photo) { p.st = 'counter'; p.tx = a.x + 34; p.ty = beltY(a.x) + 18; a.queue = []; setPose(a, { pose: 'woman.photo', dur: [2.2, 2.8], tag: 'photo', onStart: () => after(1.2, () => { flashes.push({ x: a.x + 18, y: a.waist - 150 * a.s, t: 0 }); emote(a, EM.snap, 0); }) }); }
    else { p.st = 'lift'; }
    a.fromChef = false;
  }

  /* ---------- parties: arrivals / departures ---------- */
  function seatParty(pid, instant) {
    const P = PARTIES[pid]; const acts = P.cast.map(([id, spot]) => makeActor(id, spot));
    acts.forEach((a) => { a.party = pid; a.pres = instant ? 1 : 0; a.presV = 1; a.dx = instant ? 0 : (a.x < 640 ? -50 : 50); actors.push(a); });
    P.seats.forEach((s) => (seatFree[s] = false));
    parties.push({ pid, key: P.key, seats: P.seats, acts, stay: instant ? rand(25, 55) : rand(60, 150) });
    if (!instant) { const ap = byId('appr'), ch = byId('chef');
      if (ap) force(ap, { pose: 'appr.bow', dur: [1.3, 1.8], tag: 'bow', emote: EM.hi }, 0.6);
      if (ch && Math.random() < 0.6) force(ch, { pose: 'chef.nod', dur: [1, 1.6], tag: 'nod', emote: Math.random() < 0.5 ? 'らっしゃい!' : null }, 1.1); }
  }
  function leaveParty(P) {
    P.leaving = true; lastLeft = P.pid;
    P.acts.forEach((a) => { a.leaving = true; a.presV = -1; a.queue = []; });
    const ap = byId('appr'), ts = byId('taisho');
    if (ap) force(ap, { pose: 'appr.bow', dur: [1.3, 1.8], tag: 'bow', emote: EM.bye }, 0.3);
    else if (ts) force(ts, { pose: 'taisho.laugh', dur: [1.4, 2], tag: 'bye', emote: EM.bye }, 0.3);
    orders = orders.filter((o) => !P.acts.includes(o.who)); plates.forEach((p) => { if (P.acts.includes(p.target)) p.target = null; });
  }
  function refill(seat) {
    const free = (s) => seatFree[s] !== false, present = new Set(parties.map((p) => p.key));
    const cands = Object.entries(PARTIES).filter(([pid, P]) => P.seats.includes(seat) && P.seats.every(free) && !present.has(P.key));
    if (!cands.length) return false;
    const pid = (() => { let tot = 0; const ws = cands.map(([pid, P]) => { const w = P.w * (pid === lastLeft ? 0.08 : 1); tot += w; return [w, pid]; }); let r = Math.random() * tot; for (const [w, id] of ws) if ((r -= w) <= 0) return id; return ws[0][1]; })();
    seatParty(pid, false); return true;
  }

  function initSim() {
    actors = []; parties = []; plates = []; orders = []; later = []; flashes = []; seatFree = { L1: true, L2: true, R1: true, R2: true }; refillT = {}; simT = 0;
    ['chef', 'taisho', 'appr'].forEach((id) => { const a = makeActor(id, { chef: 'board', taisho: 'pass', appr: 'case' }[id]); a.pres = 1; a.presV = 1; actors.push(a); });
    seatParty('sal', true); seatParty('woman', true); seatParty('gk', true);
    actors.forEach((a) => { a.actT = rand(0, 2); });
    for (let x = 160; x < 1290; x += rand(100, 150)) newPlate(x);
    spawnT = rand(2, 4);
  }

  /* ---------- simulation step ---------- */
  function sim(dt, env) {
    simT += dt;
    for (let i = later.length - 1; i >= 0; i--) if (simT >= later[i].t) { const f = later[i].fn; later.splice(i, 1); f(); }
    // line clears -> reactions with personality
    for (const e of env.events || []) if (e.type === 'clear' && e.t > lastEv) { lastEv = e.t; onClear(e.big, e.n); }
    // parties come and go
    for (const P of parties) { P.stay -= dt * (0.7 + 0.6 * (1 - Amb.st.crowd)); if (P.stay <= 0 && !P.leaving && !P.acts.some((a) => a.plate > 0 || a.lock > 0)) leaveParty(P); }
    for (const P of parties.slice()) if (P.leaving && P.acts.every((a) => a.pres <= 0)) { P.acts.forEach((a) => (a.gone = true)); P.seats.forEach((s) => { seatFree[s] = true; refillT[s] = rand(5, 11) / Math.max(0.4, Amb.st.crowd); }); parties.splice(parties.indexOf(P), 1); }
    actors = actors.filter((a) => !a.gone);
    for (const s of Object.keys(refillT)) { if (seatFree[s] === false) { delete refillT[s]; continue; } refillT[s] -= dt; if (refillT[s] <= 0) { if (!refill(s)) refillT[s] = rand(3, 6); else delete refillT[s]; } }
    // actors
    for (const a of actors) {
      if (a.away > 0) { a.away -= dt; if (a.away <= 0) a.presV = 1; }
      a.pres = clamp(a.pres + a.presV * dt / 1.3, 0, 1); a.dx *= Math.pow(0.08, dt); if (a.presV < 0) a.dx += (a.x < 640 ? -30 : 30) * dt;
      a.fk = Math.min(1, a.fk + dt / a.fadeDur); a.lock = Math.max(0, a.lock - dt);
      if (a.emote) { a.emote.t += dt; if (a.emote.t > a.emote.dur) a.emote = null; }
      if (!a.def.staff) a.hunger = Math.min(1, a.hunger + a.def.hungerRate * dt * (a.plate ? 0 : 1));
      if (a.leaving || a.pres <= 0) continue;
      a.actT += dt;
      if (a.actT >= a.dur && a.lock <= 0) {
        const end = a.onEnd; a.onEnd = null; if (end) end();
        const next = a.queue.length ? a.queue.shift() : BRAIN[a.id](a);
        setPose(a, next);
      }
    }
    // belt
    const v = 24 * (env.speed || 1);
    spawnT -= dt; if (spawnT <= 0) { spawnT = rand(2.6, 5.2); if (!plates.some((p) => p.st === 'belt' && p.x > 1180)) newPlate(1320); }
    for (const p of plates) {
      p.t += dt;
      if (p.st === 'belt') { p.x -= v * dt; p.y = beltY(p.x);
        if (p.target) { const a = p.target; if (a.gone || a.leaving) p.target = null; else if (p.x <= a.x + 6 && p.x > a.x - 30) takePlate(p, a); }
        else for (const a of diners()) { if (a.plate || a.lock > 0 || pending(a)) continue; const ax = a.def.pair ? a.x - (a.sp.gap || 140) / 2 : a.x;
          if (Math.abs(p.x - ax) < 5 && (p.want === a || (a.hunger > 0.5 && Math.random() < (a.hunger - 0.4) * 0.8))) { p.target = a; takePlate(p, a); break; } }
        if (p.x < 112) p.a -= dt * 3; }
      else if (p.st === 'drop') { const q = Math.min(1, p.t / 0.5); p.y = lerp(p.y0, beltY(p.x), smooth(q)); if (q >= 1) { p.st = 'belt'; } }
      else if (p.st === 'counter') { const q = Math.min(1, p.t / 0.5); p.x = lerp(p.fx, p.tx, smooth(q)); p.y = lerp(p.fy, p.ty, smooth(q)) - Math.sin(q * Math.PI) * 14;
        if (p.t > 2.9) { p.st = 'lift'; p.t = 0; p.fx = p.x; p.fy = p.y; } }
      else if (p.st === 'lift') { const a = p.taker, q = Math.min(1, p.t / 0.55); const hx = a.x + (a.def.pair ? -(a.sp.gap || 140) / 2 : 0), hy = a.waist - 70 * a.s;
        p.x = lerp(p.fx, hx, smooth(q)); p.y = lerp(p.fy, hy, smooth(q)); p.a = 1 - smooth(Math.max(0, (q - 0.4) / 0.6));
        if (q >= 1) { p.dead = true; if (!a.gone) receive(a, p.food, p.src); } }
    }
    plates = plates.filter((p) => !p.dead && p.a > 0 && p.x > 60);
    flashes = flashes.filter((f) => (f.t += dt) < 0.5);
  }
  function onClear(big, n) {
    const R = { kid: [{ pose: 'kid.cheer', dur: [1.4, 2.2], tag: 'cheer', emote: EM.yay, onStart: (a) => kidCheer(a) }], woman: [{ pose: 'woman.laugh', dur: [1.6, 2.6], tag: 'chat', emote: EM.wow }, { pose: 'woman.point', dur: [1.4, 2], tag: 'point', emote: '!' }],
      sal2: [{ pose: 'sal2.toast', dur: [1.8, 2.6], tag: 'toast', emote: EM.kanpai }], sal: [{ pose: 'sal.lift', dur: [1.4, 2], tag: 'lift', emote: '!' }, { pose: 'sal.sip', dur: [1.5, 2.5], tag: 'sip', emote: '♪' }],
      gpa: [{ pose: 'gpa.savor', dur: [1.8, 3], tag: 'smile', emote: EM.ho }], couple: [{ pose: 'man.pour|wife.wave', dur: [1.6, 2.4], tag: 'wave2', emote: EM.wow }, { pose: 'pair.whisper', dur: [2, 3], tag: 'whisper', emote: '♥' }],
      taisho: [{ pose: 'taisho.laugh', dur: [1.6, 2.6], tag: 'laugh', emote: big ? 'よっしゃ!' : null }], chef: [{ pose: 'chef.nod', dur: [1, 1.6], tag: 'nod', emote: big ? 'お見事!' : null }], appr: [{ pose: big ? 'appr.bow' : 'appr.glance', dur: [1.2, 1.8], tag: 'bow' }] };
    for (const a of actors) { if (a.leaving || a.pres < 0.8 || a.lock > 0) continue; if (!big && Math.random() > 0.3 + n * 0.08) continue; const opts = R[a.id]; if (!opts) continue;
      const act = Object.assign({}, pick(opts)); if (!big && Math.random() < 0.6) act.emote = Math.random() < 0.5 ? '♪' : '!'; force(a, act, rand(0.1, 0.7)); }
  }

  /* ---------- drawing ---------- */
  function drawSprite(ctx, name, x, waist, s, alpha, flip, life) {
    const im = spr(name), m = meta(name); if (!im || !m || alpha <= 0.004) return;
    const sc = s * ((SC.scaleFix || {})[name] || 1);
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, waist + life.dy); ctx.rotate(life.rot); ctx.scale(flip ? -1 : 1, life.sy);
    ctx.drawImage(im, -m.ax * sc, -m.ay * sc, m.w * sc, m.h * sc); ctx.restore();
  }
  function parts(a, key) { if (key && key.includes('|')) { const [m1, w1] = key.split('|'), g = (a.sp.gap || 140) / 2; return [[m1, -g], [w1, g]]; } return [[key, 0]]; }
  function life(a, t, key) { // breathing, weight shifts, pose-specific motion
    const tag = a.tag, r = { rot: 0.006 * Math.sin(t * 0.37 + a.ph) + 0.0035 * Math.sin(t * 0.93 + a.ph * 1.7), sy: 1 + 0.0065 * Math.sin(t * (1.5 + (a.ph % 1) * 0.4) + a.ph), dy: 0 };
    if (key === a.cur) {
      if (/laugh|chat|wow/.test(tag) || /laugh/.test(key)) { r.rot += 0.008 * Math.sin(t * 11 + a.ph); r.dy -= Math.abs(Math.sin(t * 8)) * 1.2; }
      if (/cheer|yay/.test(tag) || /cheer/.test(key)) r.dy -= Math.abs(Math.sin(t * 7 + a.ph)) * 5;
      if (/chew|bite|enjoy|wasabi/.test(tag)) r.sy += 0.004 * Math.sin(t * 9);
      if (/bow/.test(tag)) r.dy += Math.sin(Math.min(1, a.actT / 0.6) * Math.PI * 0.5) * 3;
      if (/wave/.test(tag)) r.rot += 0.01 * Math.sin(t * 6);
      if (tag === 'tie' || tag === 'phone') r.rot += 0.004;
    }
    return r;
  }
  function drawActor(ctx, a, t) {
    if (a.pres <= 0.003) return;
    const x = a.x + a.dx, P = smooth(a.pres), kNew = Math.min(1, a.fk * 2), kOld = a.prev ? Math.min(1, (1 - a.fk) * 2) : 0;
    if (kOld > 0) for (const [n, dx] of parts(a, a.prev)) drawSprite(ctx, n, x + dx, a.waist, a.s, P * kOld, a.prevFlip, life(a, t, a.prev));
    for (const [n, dx] of parts(a, a.cur)) drawSprite(ctx, n, x + dx, a.waist, a.s, P * kNew, a.flip, life(a, t, a.cur));
    if (a.fk >= 1) a.prev = null;
  }
  function drawPlate(ctx, x, y, food, rim, dome, alpha, sc) {
    if (alpha <= 0.01) return; const [body, ring] = RIMS[rim], rx = 34 * sc, ry = 8.5 * sc;
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ellipse(ctx, x + 2, y + ry * 0.9, rx * 0.95, ry * 0.7); ctx.fill();
    ellipse(ctx, x, y + 2.4 * sc, rx * 0.86, ry * 0.86); ctx.fillStyle = shade(body, -0.35); ctx.fill();
    ellipse(ctx, x, y, rx, ry); ctx.fillStyle = linear(ctx, x - rx, y, x + rx, y, [[0, shade(body, -0.15)], [0.45, shade(body, 0.12)], [1, shade(body, -0.25)]]); ctx.fill();
    ctx.lineWidth = 2.6 * sc; ctx.strokeStyle = ring; ellipse(ctx, x, y, rx * 0.93, ry * 0.86); ctx.stroke();
    ellipse(ctx, x, y + 0.6, rx * 0.62, ry * 0.56); ctx.fillStyle = shade(body, -0.06); ctx.fill();
    const im = spr(food), m = meta(food);
    if (im) { const k2 = Math.min((52 * sc) / m.w, (36 * sc) / m.h), fw = m.w * k2, fh = m.h * k2; ctx.drawImage(im, x - fw / 2, y - fh * 0.8, fw, fh); }
    if (dome) { ctx.fillStyle = 'rgba(230,240,255,0.13)'; ctx.strokeStyle = 'rgba(240,248,255,0.55)'; ctx.lineWidth = 1.1 * sc;
      ctx.beginPath(); ctx.ellipse(x, y - 1, rx * 0.9, 30 * sc, 0, Math.PI, 0); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.45)'; ellipse(ctx, x - rx * 0.4, y - 22 * sc, 5 * sc, 9 * sc, 0.5); ctx.fill(); ellipse(ctx, x, y - 31 * sc, 4 * sc, 2.4 * sc); ctx.fillStyle = 'rgba(240,248,255,0.8)'; ctx.fill(); }
    ctx.restore();
  }
  function drawStack(ctx, x, y, n, alpha) { for (let i = 0; i < Math.min(n, 7); i++) { const yy = y - i * 3.2; ctx.globalAlpha = alpha; ellipse(ctx, x, yy, 17, 4.6); ctx.fillStyle = ['#c8283a', '#2a64b8', '#2f7a44', '#d8a830'][i % 4]; ctx.fill(); ellipse(ctx, x, yy - 1, 15.5, 3.6); ctx.fillStyle = '#efe8da'; ctx.fill(); } ctx.globalAlpha = 1; }
  function drawEmote(ctx, a, t) {
    const e = a.emote; if (!e || a.pres < 0.5) return;
    const q = e.t / e.dur, pop = q < 0.12 ? smooth(q / 0.12) : q > 0.85 ? 1 - smooth((q - 0.85) / 0.15) : 1;
    const hx = a.x + a.dx + (a.def.pair ? 0 : 0), hy = a.waist - (meta(a.def.rest).ay) * a.s * ((SC.scaleFix || {})[a.def.rest] || 1) - 10 - q * 8;
    const fs = e.txt.length > 6 ? 13 : 16; ctx.save(); ctx.translate(hx, hy); ctx.scale(pop, pop); ctx.globalAlpha = pop;
    ctx.font = `bold ${fs}px ${JP_FONT}`; const tw = ctx.measureText(e.txt).width + 14;
    roundRect(ctx, -tw / 2, -fs - 6, tw, fs + 10, 9); ctx.fillStyle = 'rgba(255,250,240,0.92)'; ctx.fill(); ctx.strokeStyle = 'rgba(90,40,20,0.5)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, 4); ctx.lineTo(4, 4); ctx.lineTo(0, 10); ctx.closePath(); ctx.fillStyle = 'rgba(255,250,240,0.92)'; ctx.fill();
    ctx.fillStyle = '#3a160c'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(e.txt, 0, -fs / 2 - 1); ctx.restore();
  }
  const motes = Array.from({ length: 60 }, () => ({ x: rand(BW), y: rand(BH * 0.75), vx: rand(-3, 3), vy: rand(-6, -1.5), r: rand(0.6, 1.8), ph: rand(10) }));
  const STEAM = [[702, 292, 0], [748, 300, 1.3], [1012, 262, 2.1], [600, 210, 3.3]];
  function drawSteam(ctx, t) { for (const [sx, sy, ph] of STEAM) for (let i = 0; i < 5; i++) { const q = ((t * 0.22 + ph + i / 5) % 1), x = sx + Math.sin(t * 0.8 + i * 1.7 + ph) * 6 * q, y = sy - q * 70, r = 10 + q * 26; ctx.globalAlpha = 0.32 * Math.sin(q * Math.PI); ctx.drawImage(puff, x - r, y - r, r * 2, r * 2); } ctx.globalAlpha = 1; }
  function drawWindow(ctx, t) {
    const [x0, y0, x1, y1] = SC.window, w = x1 - x0, h = y1 - y0, A = Amb.st;
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
    // re-colour the painted dusk sky towards the current phase; darken at night, brighten at dawn
    ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = A.phase === 'dusk' && A.k < 0.3 ? 0.12 : 0.38;
    ctx.fillStyle = linear(ctx, 0, y0, 0, y1, [[0, A.sky[0]], [0.6, A.sky[1]], [1, A.sky[2]]]); ctx.fillRect(x0, y0, w, h);
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = clamp((A.dark - 0.16) * 1.5, 0, 0.6); ctx.fillStyle = '#1a2450'; ctx.fillRect(x0, y0, w, h);
    if (A.phase === 'dawn' || A.next === 'dawn') { ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.25 * (A.next === 'dawn' ? A.k : 1); ctx.fillStyle = '#ffc890'; ctx.fillRect(x0, y0, w, h); }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    if (A.weather !== 'clear' && A.weather !== 'wind') { ctx.fillStyle = `rgba(90,100,120,${A.weather === 'storm' ? 0.35 : 0.2})`; ctx.fillRect(x0, y0, w, h); }
    if (A.flash) { ctx.fillStyle = `rgba(230,235,255,${A.flash * 0.7})`; ctx.fillRect(x0, y0, w, h); }
    Amb.precip(ctx, x0, y0, w, h, t, 0.7);
    ctx.restore(); Amb.glass(ctx, x0, y0, w, h, t);
  }
  function drawTorch(ctx, a, t) {
    if (a.cur !== 'taisho.torch' || a.fk < 0.6 || a.pres < 0.5) return; const m = meta('taisho.torch'), sc = a.s;
    const fx = a.x + a.dx + (138 - m.ax) * sc * (a.flip ? -1 : 1), fy = a.waist + (271 - m.ay) * sc, fl = 0.75 + 0.25 * noise1(t * 30);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = radial(ctx, fx, fy, 60, [[0, `rgba(120,170,255,${0.5 * fl})`], [0.3, `rgba(255,150,80,${0.18 * fl})`], [1, 'rgba(255,120,60,0)']]); ctx.fillRect(fx - 60, fy - 60, 120, 120);
    for (let i = 0; i < 4; i++) { const sx = fx + rand(-10, 10), sy = fy + rand(-4, 8); ctx.fillStyle = `rgba(255,${180 + randi(0, 60)},120,${rand(0.4, 0.9)})`; ctx.fillRect(sx, sy, 1.4, 1.4); }
    ctx.restore();
  }
  function grade(ctx, t, env) {
    const A = Amb.st;
    ctx.save();
    if (A.grade[3] > 0.005) { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(${A.grade[0] | 0},${A.grade[1] | 0},${A.grade[2] | 0},${A.grade[3] * 0.9})`; ctx.fillRect(0, 0, BW, BH); }
    ctx.globalCompositeOperation = 'source-over'; const dk = A.dark * 0.32 + (A.wet ? 0.04 : 0); if (dk > 0.01) { ctx.fillStyle = `rgba(6,8,20,${dk})`; ctx.fillRect(0, 0, BW, BH); }
    // lanterns & lamps brighten as it gets dark
    ctx.globalCompositeOperation = 'lighter'; const L = 0.12 + A.lights * 0.22 + env.pulse * 0.03;
    for (const ln of lant) { const fl = 0.85 + 0.15 * noise1(t * 5 + ln.ph * 7); const r = 230; ctx.globalAlpha = clamp(L * fl, 0, 1); ctx.drawImage(glowSpr, ln.px - r, ln.cy - r, r * 2, r * 2); } ctx.globalAlpha = 1;
    ctx.fillStyle = radial(ctx, 800, 200, 420, [[0, `rgba(255,210,150,${0.05 + A.lights * 0.05})`], [1, 'rgba(255,200,140,0)']]); ctx.fillRect(380, 0, 840, 640);
    ctx.fillStyle = '#ffd6a0'; for (const m of motes) { ctx.globalAlpha = (0.3 + 0.3 * Math.sin(t * 2 + m.ph)) * (0.5 + A.lights * 0.5); ctx.fillRect(m.x - m.r, m.y - m.r, m.r * 2, m.r * 2); } ctx.globalAlpha = 1;
    if (env.flash) { ctx.fillStyle = `rgba(255,170,90,${env.flash * 0.12})`; ctx.fillRect(0, 0, BW, BH); }
    ctx.restore();
  }

  function resize(w, h, d) {
    W = w; H = h; D = d;
    // fit the full painting width on 16:10 / 4:3 screens (diners live at the far edges); fill the bottom with the chairs row.
    if (W / H >= BW / BH) { k = (W / BW) * 1.03; oy = (H - BH * k) * 0.45; } else { k = (W / BW) * 1.03; oy = 0; }
    ox = (W - BW * k) / 2; extraB = Math.max(0, (H - (oy + BH * k)) / k);
    vign = (() => { const [c, x] = hiCanvas(W, H, 1); const g = x.createRadialGradient(W / 2, H * 0.45, H * 0.35, W / 2, H * 0.5, Math.max(W, H) * 0.78); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(8,3,0,0.55)'); x.fillStyle = g; x.fillRect(0, 0, W, H); return c; })();
    if (fallback) fallback.resize(w, h, d);
  }
  function draw(ctx, t, dt, env) {
    if (!Art.isReady(WID)) { if (!fallback) { fallback = makeSushiStage(); fallback.resize(W, H, D); } fallback.draw(ctx, t, dt, env); Amb.grade(ctx, W, H, { indoor: true, t }); return; }
    if (!built) build();
    dt = Math.min(dt, 0.05); sim(dt, env);
    for (const m of motes) { m.x += m.vx * dt + Math.sin(t * 0.5 + m.ph) * 0.05; m.y += m.vy * dt; if (m.y < -5) { m.y = BH * 0.75; m.x = rand(BW); } }
    const cam = Math.sin(t * 0.05) * 5 + (env.mx || 0) * 9, zoom = 1 + 0.004 * Math.sin(t * 0.07);
    ctx.save(); ctx.translate(ox + W * 0, oy); ctx.translate(BW * k / 2, BH * k / 2); ctx.scale(k * zoom, k * zoom); ctx.translate(-BW / 2 - cam, -BH / 2);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bg, 0, 0, BW, BH);
    if (extraB > 0) ctx.drawImage(bg, 0, BH - 150, BW, 150, 0, BH - 150, BW, 150 + extraB + 4);
    drawWindow(ctx, t);
    drawSteam(ctx, t);
    for (const ln of lant) { const ang = Math.sin(t * 0.6 + ln.ph) * 0.022 + Math.sin(t * 1.7 + ln.ph) * 0.006 + (Amb.st.wind ? Math.sin(t * 2.3 + ln.ph) * 0.02 : 0); ctx.save(); ctx.translate(ln.px, 0); ctx.rotate(ang); ctx.translate(-ln.px, 0); ctx.drawImage(ln.c, ln.x0, ln.y0); ctx.restore(); }
    const back = actors.filter((a) => a.sp.layer === 'back'), cas = actors.filter((a) => a.sp.layer === 'case'), front = actors.filter((a) => a.sp.layer === 'front' || !a.sp.layer);
    back.forEach((a) => drawActor(ctx, a, t)); ctx.drawImage(occBack, occBack.ox, occBack.oy);
    back.forEach((a) => drawTorch(ctx, a, t));
    cas.forEach((a) => drawActor(ctx, a, t)); ctx.drawImage(occCase, occCase.ox, occCase.oy);
    const order = { L2: 0, L1: 1, LP: 1, R2: 2, R1: 3, RP: 3 };
    front.sort((a, b) => (order[a.spot] ?? 0) - (order[b.spot] ?? 0)).forEach((a) => drawActor(ctx, a, t));
    ctx.drawImage(occFront, occFront.ox, occFront.oy); if (extraB > 0) ctx.drawImage(bg, 0, BH - 150, BW, 150, 0, BH - 150, BW, 150 + extraB + 4);
    for (const a of actors) if (!a.def.staff && a.stack) { const sx = (a.def.pair ? a.x : a.x) + (a.x < 640 ? 38 : -38); drawStack(ctx, sx, beltY(sx) + 30, a.stack, a.pres); }
    for (const p of plates) if (p.st !== 'lift') drawPlate(ctx, p.x, p.y, p.food, p.rim, p.dome, p.a, 0.9 + (p.x / BW) * 0.14);
    for (const p of plates) if (p.st === 'lift') drawPlate(ctx, p.x, p.y, p.food, p.rim, false, p.a, 0.95);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const f of flashes) { const a = 1 - f.t / 0.5; ctx.fillStyle = radial(ctx, f.x, f.y, 70, [[0, `rgba(255,255,255,${a})`], [0.2, `rgba(220,235,255,${a * 0.5})`], [1, 'rgba(200,220,255,0)']]); ctx.fillRect(f.x - 70, f.y - 70, 140, 140); } ctx.restore();
    grade(ctx, t, env);
    actors.forEach((a) => drawEmote(ctx, a, t));
    ctx.restore();
    ctx.drawImage(vign, 0, 0, W, H);
    if (!env.thumb) window.__sushi = { actors, plates, parties, orders, leave: (pid) => { const P = parties.find((q) => q.pid === pid || q.seats.includes(pid)); if (P) P.stay = 0; }, force: (id, pose, dur) => force(byId(id), { pose, dur: dur || [2, 3] }) };
  }
  return { resize, draw, selfGrade: true };
}
if (typeof Art !== 'undefined' && Art.has('sushi')) registerStage('sushi', makeSushiArtStage);
