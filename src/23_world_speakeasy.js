/* ================= World 3: The Speakeasy (1920s Prohibition) =================
   Hidden bookcase door with a peephole, amber Edison bulbs, a mahogany back bar with backlit bottles and
   brass rails, oxblood leather booths, art-deco gold fans, a jazz quartet (upright bass, piano, sax, singer),
   a bartender shaking, stirring, straining and garnishing to order, a cocktail waitress running booths.
   Events: singer's spotlight solo + Charleston, flaming cocktail show, champagne tower, card magician. */
(() => {
  const DRINKS = [['Old Fashioned', '#c8701a', 'rocks'], ['Martini', '#e8ecd8', 'coupe'], ['French 75', '#f4dc84', 'flute'], ['Gin Rickey', '#d8f0c0', 'rocks'], ['Manhattan', '#8a2410', 'coupe'], ['Negroni', '#d8341c', 'rocks'], ['Bee\u2019s Knees', '#f0c858', 'coupe']];
  const glassItem = (d) => (d[2] === 'flute' ? Items.flute : d[2] === 'coupe' ? Items.coupe(d[1]) : Items.rocks(d[1]));
  const deco = (x, cx, cy, r, col, n = 9) => { // art-deco sunburst fan
    x.strokeStyle = col; x.lineWidth = 1.2; for (let k = 0; k <= n; k++) { const a = Math.PI + k / n * Math.PI; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke(); }
    for (let k = 1; k <= 3; k++) { x.beginPath(); x.arc(cx, cy, r * k / 3, Math.PI, 0); x.stroke(); }
  };
  function bottle(x, bx, by, s, col, rnd, kind) {
    const h = (kind === 'tall' ? 46 : kind === 'squat' ? 30 : 38) * s, w = (kind === 'squat' ? 14 : 10) * s;
    x.fillStyle = rgba(col, 0.85); roundRect(x, bx - w / 2, by - h, w, h, 2 * s); x.fill();
    x.beginPath(); x.moveTo(bx - w / 2, by - h + 3 * s); x.quadraticCurveTo(bx - 2 * s, by - h - 6 * s, bx - 2 * s, by - h - 12 * s); x.lineTo(bx + 2 * s, by - h - 12 * s); x.quadraticCurveTo(bx + 2 * s, by - h - 6 * s, bx + w / 2, by - h + 3 * s); x.fill();
    x.fillStyle = '#c8a050'; x.fillRect(bx - 2.2 * s, by - h - 15 * s, 4.4 * s, 4 * s);
    x.fillStyle = Looks.pickR(rnd, ['#f4ead0', '#e8d8a0', '#1a1a1a', '#c8a050', '#f2f2f2']); x.fillRect(bx - w / 2 + 1.5 * s, by - h * 0.62, w - 3 * s, h * 0.32);
    x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(bx - w / 2 + 3 * s, by - h * 0.55, w - 6 * s, 1 * s); x.fillRect(bx - w / 2 + 3 * s, by - h * 0.45, w - 8 * s, 1 * s);
    x.fillStyle = 'rgba(255,240,200,0.45)'; x.fillRect(bx - w / 2 + 1.2 * s, by - h + 2 * s, 1.6 * s, h - 4 * s);
  }
  const cfg = {
    id: 'speakeasy', flow: 'seat', seed: 1920, cap: 14, spawnEvery: 7.5, lane: 0.975, peopleScale: 1.65, catCol: '#2a2a2a', catPath: [0, 0.3],
    door: { x: 0.315, y: 0.83 }, vignette: 'rgba(8,3,0,0.7)', chefLookX: 0.8, wetSignX: 0.45,
    lights: [{ x: 0.12, y: 0.42, r: 200, col: '#ffc070', a: 0.18, flicker: 1 }, { x: 0.47, y: 0.25, r: 220, col: '#ffb860', a: 0.2, flicker: 1 }, { x: 0.78, y: 0.3, r: 260, col: '#ffb860', a: 0.22, flicker: 1 }, { x: 0.95, y: 0.3, r: 200, col: '#ffb860', a: 0.2, flicker: 1 }],
    look(rnd, V, opt) { // period dress: suits, fedoras, bowlers, flapper dresses, cloche hats, pearls, feathers
      const fem = rnd() < 0.5, col = Looks.pickR(rnd, ['#2a2a34', '#3a2a20', '#4a4a52', '#1a1a22', '#5a3a2a', '#2a3a4a']);
      if (fem) return { female: true, lashes: true, skin: Looks.pickR(rnd, ['pale', 'light', 'olive', 'tan', 'brown', 'dark']), hair: Looks.pickR(rnd, ['black', 'dbrown', 'auburn', 'blonde']), hairStyle: Looks.pickR(rnd, ['finger', 'bob', 'bob']), lips: Looks.pickR(rnd, ['#a01a2a', '#c0283a', '#8a1a2a']), acc: Object.assign({ earrings: Looks.pickR(rnd, ['#e8c050', '#f2f2f2']) }, rnd() < 0.5 ? { hat: 'cloche', hatCol: Looks.pickR(rnd, ['#2a2a34', '#7a1a2a', '#c8b890', '#2a4a4a']) } : { band: '#1a1a1a', feather: Looks.pickR(rnd, ['#f2f2f2', '#c8384a', '#1a1a1a']) }), top: { type: 'dress', col: Looks.pickR(rnd, ['#c8a050', '#1a1a1a', '#7a1a2a', '#2a5a5a', '#d8c8a8', '#4a2a5a']), bead: Looks.pickR(rnd, ['#f0d080', '#e8e8f0']), straps: rnd() < 0.6, longPearls: rnd() < 0.5, skirt: { col: '#1a1a1a', len: 96, fringe: true, flare: 2 } }, bareLegs: true, shoe: '#1a120c', eyes: '#3a2414' };
      return { skin: Looks.pickR(rnd, ['pale', 'light', 'olive', 'tan', 'brown', 'dark', 'deep']), hair: Looks.pickR(rnd, ['black', 'dbrown', 'brown', 'auburn', 'grey']), hairStyle: 'slick', acc: Object.assign(rnd() < 0.3 ? { mustache: true } : {}, rnd() < 0.55 ? { hat: Looks.pickR(rnd, ['fedora', 'bowler', 'trilby', 'newsboy']), hatCol: Looks.pickR(rnd, ['#2a2a2a', '#4a3a2a', '#5a5a60', '#3a2a1a']), band: '#1a1a1a' } : {}), top: { type: rnd() < 0.2 ? 'vest' : 'suit', col, tie: Looks.pickR(rnd, ['#7a1a2a', '#c8a050', '#2a4a7a', '#1a1a1a']), stripes: rnd() < 0.3 ? 'rgba(255,255,255,0.12)' : null, pocket: '#f2f2f2', chain: rnd() < 0.3 }, pants: col, shoe: rnd() < 0.3 ? '#f2f2f2' : '#1a120c', spats: rnd() < 0.2 ? '#f2f2f2' : null, sleeves: 'long', eyes: '#3a2414' };
    },
    *arrive(a, V) { // knock, peephole slides, password whispered, the bookcase swings open
      a.hidden = true; V.S.knock = { t: 0 }; yield ['wait', 2.2]; V.S.door = { t: 0 }; yield ['wait', 0.6]; a.hidden = false;
    },
    *depart(a, V) { V.S.door = { t: 0 }; },
    back(x, V) {
      const { W, H, u, rnd } = V, X = V.X;
      // mahogany panelled walls with gold deco inlays
      Decor.wood(x, 0, 0, W, H, rnd, '#2a140a', '#3a1c0e', true, 60);
      for (let px = 0; px < W; px += 120 * u) { x.strokeStyle = 'rgba(200,150,70,0.35)'; x.lineWidth = 1.5 * u; x.strokeRect(px + 10 * u, H * 0.16, 100 * u, H * 0.26); x.strokeRect(px + 16 * u, H * 0.17, 88 * u, H * 0.24); deco(x, px + 60 * u, H * 0.42, 40 * u, 'rgba(210,170,90,0.35)', 11); }
      x.fillStyle = linear(x, 0, H * 0.44, 0, H * 0.8, [[0, '#3a1c0e'], [1, '#1a0a04']]); x.fillRect(0, H * 0.44, W, H * 0.36); // wainscot
      for (let px = 0; px < W; px += 60 * u) { x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(px, H * 0.46, 2 * u, H * 0.34); x.fillStyle = 'rgba(255,200,120,0.06)'; x.fillRect(px + 2 * u, H * 0.46, 1 * u, H * 0.34); }
      x.fillStyle = '#c8a050'; x.fillRect(0, H * 0.44, W, 3 * u);
      // dark copper tin ceiling
      Decor.tin(x, 0, 0, W, H * 0.12, 30 * u, '#4a2a18');
      x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 0, W, H * 0.12);
      x.fillStyle = '#c8a050'; x.fillRect(0, H * 0.12, W, 3 * u);
      // the hidden bookcase door (centre-left) — static shelves; the swinging panel is live
      const dx = X(0.27), dw = X(0.09), dt = H * 0.4, db = H * 0.8;
      x.fillStyle = '#1a0a04'; x.fillRect(dx - 6 * u, dt - 10 * u, dw + 12 * u, db - dt + 10 * u);
      // the stage (left): raised platform, velvet curtain, deco proscenium
      x.fillStyle = linear(x, 0, 0, X(0.26), 0, [[0, '#5a0a14'], [0.5, '#8a1a24'], [1, '#4a0810']]); x.fillRect(0, H * 0.15, X(0.25), H * 0.6);
      for (let k = 0; k < 14; k++) { x.fillStyle = k % 2 ? 'rgba(0,0,0,0.22)' : 'rgba(255,120,120,0.08)'; x.fillRect(k * X(0.25) / 14, H * 0.15, X(0.25) / 28, H * 0.6); }
      x.fillStyle = '#c8a050'; x.fillRect(0, H * 0.14, X(0.26), 6 * u); deco(x, X(0.125), H * 0.2, 46 * u, 'rgba(240,200,110,0.8)', 13);
      x.fillStyle = '#1a0a04'; x.fillRect(0, H * 0.75, X(0.26), H * 0.07); x.fillStyle = '#c8a050'; x.fillRect(0, H * 0.75, X(0.26), 2 * u);
      // parquet floor
      const fy = H * 0.8; x.fillStyle = '#2a1408'; x.fillRect(0, fy, W, H - fy);
      { x.save(); x.beginPath(); x.rect(0, fy, W, H - fy); x.clip(); const cw = 30 * u, sl = cw * 0.62, ph = cw * 0.4;
        for (let j = 0; j * cw < W + cw; j++) { const d = j % 2 ? 1 : -1, x0 = j * cw; for (let y = fy - cw - (j % 2) * ph * 0.5; y < H + cw; y += ph) {
          x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 + cw, y + d * sl); x.lineTo(x0 + cw, y + d * sl + ph); x.lineTo(x0, y + ph); x.closePath();
          x.fillStyle = shade(Looks.pickR(rnd, ['#4a2410', '#55290f', '#3e1e0c', '#5c3014']), (rnd() - 0.5) * 0.18); x.fill();
          x.strokeStyle = 'rgba(15,6,2,0.75)'; x.lineWidth = 1; x.stroke();
          x.strokeStyle = 'rgba(255,190,120,0.06)'; x.beginPath(); x.moveTo(x0 + 3, y + ph * 0.35 + d * 2); x.lineTo(x0 + cw - 3, y + d * sl + ph * 0.35); x.stroke(); } }
        x.restore(); }
      x.fillStyle = linear(x, 0, fy, 0, H, [[0, 'rgba(255,170,80,0.08)'], [1, 'rgba(0,0,0,0.3)']]); x.fillRect(0, fy, W, H - fy);
      // back bar (right): mirrored shelves of backlit bottles, brass rails, cash register
      const bx0 = X(0.6);
      x.fillStyle = '#1a0a04'; x.fillRect(bx0, H * 0.13, W - bx0, H * 0.5);
      x.fillStyle = linear(x, 0, H * 0.15, 0, H * 0.5, [[0, 'rgba(255,190,110,0.35)'], [1, 'rgba(120,70,30,0.25)']]); x.fillRect(bx0 + 10 * u, H * 0.15, W - bx0 - 10 * u, H * 0.34); // amber-lit mirror
      for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(bx0 + rnd() * (W - bx0), H * 0.15 + rnd() * H * 0.34, 30 * u, 1); }
      [0.24, 0.36, 0.49].forEach((f) => { const sy = H * f; x.fillStyle = '#3a1c0e'; x.fillRect(bx0, sy, W - bx0, 5 * u); x.fillStyle = '#c8a050'; x.fillRect(bx0, sy - 1.5 * u, W - bx0, 1.5 * u);
        for (let bxx = bx0 + 16 * u; bxx < W - 8 * u; bxx += 17 * u * (0.9 + rnd() * 0.4)) bottle(x, bxx, sy, u * (0.85 + rnd() * 0.2), Looks.pickR(rnd, ['#6a3a10', '#a8601a', '#2a5a2a', '#e8e8d8', '#7a1a1a', '#3a2a1a', '#c89a3a', '#1a3a2a']), rnd, Looks.pickR(rnd, ['tall', 'std', 'squat', 'std'])); });
      x.fillStyle = '#c8a050'; x.font = `italic bold ${18 * u}px Georgia, serif`; x.textAlign = 'center'; x.fillText('The Blind Tiger', X(0.8), H * 0.2);
      deco(x, X(0.8), H * 0.15, 60 * u, 'rgba(240,200,110,0.5)', 15);
      // back counter top
      x.fillStyle = linear(x, 0, H * 0.5, 0, H * 0.62, [[0, '#3a1c0e'], [1, '#1a0a04']]); x.fillRect(bx0, H * 0.5, W - bx0, H * 0.12);
      // leather booths along the centre wall (backs)
      [0.4, 0.52].forEach((f) => { const cx = X(f); x.fillStyle = linear(x, cx - 50 * u, 0, cx + 50 * u, 0, [[0, '#3a0a0a'], [0.5, '#6a1a18'], [1, '#3a0a0a']]); roundRect(x, cx - 55 * u, H * 0.56, 110 * u, H * 0.22, 10 * u); x.fill(); for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(cx - 50 * u + k * 22 * u, H * 0.58, 2 * u, H * 0.18); for (let j = 0; j < 4; j++) { ellipse(x, cx - 39 * u + k * 22 * u, H * 0.6 + j * 26 * u, 1.6 * u, 1.6 * u); x.fillStyle = '#c8a050'; x.fill(); } } });
    },
    counter(x, V) { // the bar front: mahogany, brass foot rail, deco panels
      const { W, H, u } = V, X = V.X, bx0 = X(0.6), top = H * 0.62, bot = H * 0.82;
      x.fillStyle = linear(x, 0, top - 8 * u, 0, top + 8 * u, [[0, '#6a3a1a'], [0.5, '#3a1a08'], [1, '#1a0a04']]); x.fillRect(bx0 - 14 * u, top - 8 * u, W - bx0 + 20 * u, 16 * u);
      x.fillStyle = 'rgba(255,220,160,0.25)'; x.fillRect(bx0 - 14 * u, top - 7 * u, W - bx0 + 20 * u, 2 * u);
      x.fillStyle = linear(x, bx0, 0, W, 0, [[0, '#2a1208'], [0.5, '#4a200c'], [1, '#2a1208']]); x.fillRect(bx0 - 8 * u, top + 8 * u, W - bx0 + 10 * u, bot - top - 8 * u);
      for (let px = bx0; px < W; px += 70 * u) { x.strokeStyle = 'rgba(200,150,70,0.5)'; x.lineWidth = 1.4 * u; x.strokeRect(px + 6 * u, top + 18 * u, 58 * u, bot - top - 34 * u); deco(x, px + 35 * u, bot - 18 * u, 22 * u, 'rgba(210,170,90,0.45)', 7); }
      x.strokeStyle = linear(x, 0, bot - 14 * u, 0, bot - 6 * u, [[0, '#fff0b0'], [1, '#8a6a20']]); x.lineWidth = 5 * u; x.beginPath(); x.moveTo(bx0 - 8 * u, bot - 10 * u); x.lineTo(W, bot - 10 * u); x.stroke();
      for (let px = bx0 + 20 * u; px < W; px += 90 * u) { x.fillStyle = '#c8a050'; x.fillRect(px, bot - 10 * u, 3 * u, 12 * u); }
    },
    setup(V) {
      const X = V.X;
      V.addStaff({ role: 'cook', layer: 'back', armsOver: false, x: 0.79, y: 0.49, look: { skin: 'light', hair: 'black', hairStyle: 'slick', acc: { mustache: true }, top: { type: 'vest', col: '#2a2a2a', shirt: '#f4f0e6', bow: '#1a1a1a', garters: true, chain: true }, sleeves: 'long', eyes: '#3a2414' }, accepts: (j) => !j.seat || !j.seat.booth, idle: [['polish', 2.4], ['wipe', 2], ['lean', 2]] });
      V.addStaff({ role: 'cook', floor: true, x: 0.6, speed: 85, look: { female: true, lashes: true, skin: 'olive', hair: 'black', hairStyle: 'finger', lips: '#a01a2a', acc: { band: '#1a1a1a', feather: '#f2f2f2', earrings: '#e8c050' }, top: { type: 'dress', col: '#1a1a1a', bead: '#f0d080', straps: true, longPearls: true, skirt: { col: '#1a1a1a', len: 92, fringe: true } }, bareLegs: true, shoe: '#1a120c' }, accepts: (j) => j.seat && j.seat.booth, idle: [['tray', 2], ['lookabout', 2]] });
      // jazz quartet on the stage
      const band = (look, x, act, k = 1) => V.addStaff({ role: 'idle', floor: true, feetY: 0.79, x, k, look, idle: [[act, 4]] });
      V.S.bass = band({ skin: 'dark', hair: 'black', hairStyle: 'buzz', acc: { mustache: true, hat: 'fedora', hatCol: '#2a2a2a' }, top: { type: 'suit', col: '#2a2a34', tie: '#c8a050', pocket: '#f2f2f2' }, sleeves: 'long', pants: '#2a2a34', eyes: '#2a1408' }, 0.05, 'bass');
      V.S.sax = band({ skin: 'brown', hair: 'black', hairStyle: 'slick', top: { type: 'vest', col: '#5a1a1a', shirt: '#f4f0e6', bow: '#c8a050' }, sleeves: 'long', pants: '#1a1a1a' }, 0.2, 'sax');
      V.S.singer = band({ female: true, lashes: true, skin: 'deep', hair: 'black', hairStyle: 'finger', lips: '#c0283a', acc: { earrings: '#f2f2f2', band: '#c8a050', feather: '#f2f2f2' }, top: { type: 'dress', col: '#c8a050', bead: '#fff0b0', straps: true, pearls: true, skirt: { col: '#c8a050', len: 112, fringe: true, flare: 4 } }, bareLegs: false, pants: '#c8a050', shoe: '#c8a050' }, 0.125, 'sing');
      V.S.piano = V.addStaff({ role: 'idle', layer: 'back', x: 0.235, y: 0.6, k: 0.9, look: { skin: 'pale', hair: 'auburn', hairStyle: 'side', acc: { glasses: '#2a2a2a', round: true }, top: { type: 'shirt', col: '#f4f0e6', bow: '#1a1a1a', garters: true }, sleeves: 'long' }, idle: [['piano', 4]] });
      V.S.booths = [0.4, 0.52].map((f) => ({ x: X(f), y: V.Y(0.83) }));
    },
    seats(V) {
      const sc = V.sc, X = V.X, out = [];
      [0.625, 0.68, 0.735, 0.865, 0.915, 0.965].forEach((f) => out.push({ x: X(f), y: V.Y(0.79) - 60 * sc, dir: f > 0.8 ? -1 : 1, stool: true, legs: 'stool' }));
      V.S.booths.forEach((b) => [-1, 1].forEach((d) => out.push({ x: b.x + d * 34 * V.u, y: b.y - 64 * sc, dir: -d, booth: b })));
      return out;
    },
    queue(V) { return [0, 1, 2, 3, 4].map((i) => [V.X(0.31) - i * 46 * V.u, V.lane() - 6 * V.u - (i % 2) * 8 * V.u, V.X(0.12)]); }, // waiting guests drift by the bandstand, watching the show
    dish(a, V) { const d = Looks.pickR(Math.random, DRINKS); const g = glassItem(d); return { drink: d, hand: g, utensil: () => g, eatAct: 'drink', biteT: 4, bites: 3, sip: null }; },
    waitAct: () => 'talk',
    prep(j, s, V) {
      if (j.seat && j.seat.booth) return [Object.assign(['order', 1.2], { walk: (j.seat.x / V.W) }), Object.assign(['pickup', 1.4], { walk: 0.62, on: (s2) => { s2.carry = null; }, after: (s2) => { s2.carry = (c) => { c.save(); c.translate(-12, 26); c.fillStyle = '#c8a050'; ellipse(c, 0, 0, 12, 2.6); c.fill(); glassItem(j.dish.drink)(c, 0, -1); c.restore(); }; } }), Object.assign(['serve', 1.1], { walk: j.seat.x / V.W + 0.03, after: (s2) => { s2.carry = null; } })];
      const d = j.dish.drink;
      const steps = [['pour', 1.6]];
      if (d[2] === 'coupe') steps.push(['shake', 2.2], ['strain', 1.2]); else if (d[2] === 'flute') steps.push(['shake', 1.6], ['pop', 1.2]); else steps.push(['stir', 2]);
      steps.push(['garnish', 1.1]);
      return steps;
    },
    pose(s, ps, t, V) {
      const k = s.actT, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o), act = s.act;
      if (s === V.S.bass) { ps.mid = (c) => { c.save(); c.translate(-6, 30); c.rotate(-0.12); c.fillStyle = linear(c, -14, 0, 14, 0, [[0, '#4a1a08'], [0.5, '#a8501a'], [1, '#3a1208']]); c.beginPath(); c.moveTo(-6, -20); c.bezierCurveTo(-16, -14, -8, 0, -15, 12); c.bezierCurveTo(-20, 34, -10, 50, 0, 50); c.bezierCurveTo(10, 50, 20, 34, 15, 12); c.bezierCurveTo(8, 0, 16, -14, 6, -20); c.closePath(); c.fill(); c.fillStyle = '#1a0a04'; c.fillRect(-1.6, -70, 3.2, 72); c.fillRect(-4, -76, 8, 8); c.strokeStyle = 'rgba(240,230,200,0.7)'; c.lineWidth = 0.4; for (let q = -1.5; q <= 1.5; q += 1) { c.beginPath(); c.moveTo(q, -70); c.lineTo(q * 1.6, 36); c.stroke(); } c.fillStyle = '#1a0a04'; c.beginPath(); c.moveTo(-6, 10); c.quadraticCurveTo(-3, 14, -6, 18); c.moveTo(6, 10); c.quadraticCurveTo(3, 14, 6, 18); c.lineWidth = 1; c.stroke(); c.fillStyle = '#2a1a0a'; c.fillRect(-5, 34, 10, 3); c.restore(); }; const pl = Math.sin(t * 8.5); ps.arms = [A(-1, -8, -16 + Math.sin(t * 2.1) * 6, { grip: 'fist' }), A(1, -2 + pl * 3, 38, { grip: 'point' })]; ps.head.tilt = Math.sin(t * 4.3) * 0.08; ps.face.eyes = 'closed'; ps.face.mouth = 'smile'; ps.lean = Math.sin(t * 4.3) * 0.03; return; }
      if (s === V.S.sax) { const solo = V.on && V.on('solo'); ps.over = (c) => { c.save(); c.translate(3, 6); c.rotate(-0.18); c.strokeStyle = linear(c, -8, 0, 8, 0, [[0, '#8a6a10'], [0.5, '#ffe080'], [1, '#8a6a10']]); c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -18); c.lineTo(2, 30); c.quadraticCurveTo(4, 44, 12, 40); c.stroke(); ellipse(c, 13, 36, 6, 4, -0.5); c.fillStyle = '#ffd860'; c.fill(); c.fillStyle = '#3a2a10'; ellipse(c, 13, 36, 3.6, 2.2, -0.5); c.fill(); c.fillStyle = '#c8a040'; for (let q = 0; q < 6; q++) { ellipse(c, -2, -4 + q * 6, 1.4, 1.4); c.fill(); } c.restore(); }; ps.arms = [A(-1, -1, 2 + Math.sin(t * 9) * 1, { grip: 'fist' }), A(1, 4, 26 + Math.sin(t * 9 + 1) * 1, { grip: 'fist' })]; ps.face.mouth = 'o'; ps.face.open = 0.3; ps.face.eyes = 'closed'; ps.head.tilt = -0.1 + Math.sin(t * 2) * 0.06; ps.lean = -0.05 + (solo ? Math.sin(t * 2) * 0.08 : 0); return; }
      if (s === V.S.singer) { const solo = V.on && V.on('solo'); ps.under = (c) => { c.strokeStyle = '#8a8a90'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(16, -4); c.lineTo(16, 122); c.moveTo(8, 122); c.lineTo(24, 122); c.stroke(); }; ps.over = (c) => { c.save(); c.translate(16, -8); c.fillStyle = '#c8c8d0'; roundRect(c, -4, -6, 8, 11, 3); c.fill(); c.strokeStyle = '#6a6a70'; c.lineWidth = 0.5; for (let q = -3; q <= 3; q += 1.5) { c.beginPath(); c.moveTo(q, -5); c.lineTo(q, 4); c.stroke(); } c.restore(); }; ps.arms = solo ? [A(-1, -24, -10 + Math.sin(t * 2) * 6, { grip: 'open', handAng: -1.2 }), A(1, 14, -6, { grip: 'open' })] : [A(-1, -12, 34, { grip: 'open' }), A(1, 13, -2, { grip: 'fist' })]; ps.face.mouth = 'open'; ps.face.open = 0.35 + 0.35 * Math.abs(Math.sin(t * 3.2)); ps.face.eyes = 'happy'; ps.head.tilt = Math.sin(t * 1.6) * 0.1; ps.lean = Math.sin(t * 1.6) * 0.04; return; }
      if (s === V.S.piano) { ps.arms = [A(-1, -8 + Math.sin(t * 11) * 4, 40 + Math.abs(Math.sin(t * 11)) * 2, { grip: 'open', handAng: 0.4 }), A(1, 10 + Math.sin(t * 13 + 1) * 5, 40 + Math.abs(Math.sin(t * 13)) * 2, { grip: 'open', handAng: 0.4 })]; ps.head.tilt = Math.sin(t * 4.3) * 0.07; ps.face.lookY = 1; ps.face.mouth = 'smile'; ps.head.turn = -0.4; return; }
      if (s.sitting) { // bartender
        const shaker = (c, x, y) => { c.save(); c.translate(x, y); c.fillStyle = linear(c, -3, 0, 3, 0, [[0, '#8a8e96'], [0.5, '#f4f6f8'], [1, '#6a6e76']]); c.beginPath(); c.moveTo(-3, -12); c.lineTo(3, -12); c.lineTo(3.6, 4); c.lineTo(-3.6, 4); c.closePath(); c.fill(); ellipse(c, 0, -12, 2.4, 1); c.fill(); c.restore(); };
        switch (act) {
          case 'shake': { const b = Math.sin(k * 22); ps.arms = [A(-1, -14 + b * 3, -4 + b * 6, { item: shaker }), A(1, -6 + b * 3, 4 + b * 6, { grip: 'open' })]; ps.face.mouth = 'big'; ps.head.tilt = b * 0.04; ps.lean = -0.05; if (V.on && V.on('flame') ) ps.face.eyes = 'happy'; return; }
          case 'stir': ps.arms = [A(-1, -6, 40, { item: Items.rocks('#c8701a') }), A(1, 4 + Math.cos(k * 10) * 3, 30 + Math.sin(k * 10) * 1.5, { grip: 'point' })]; ps.face.lookY = 1; ps.head.nod = 1; return;
          case 'pour': { const c2 = Math.min(1, k); ps.arms = [A(-1, -10, 42, { item: Items.coupe('#e8ecd8') }), A(1, 12, 18 - c2 * 4, { item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-1.6 * c2); c.fillStyle = '#6a3a10'; roundRect(c, -3, -14, 6, 16, 1.4); c.fill(); c.fillRect(-1, -19, 2, 6); c.restore(); if (c2 > 0.6) { c.fillStyle = 'rgba(200,120,40,0.8)'; c.fillRect(x - 12, y + 2, 1, 14); } } })]; ps.face.lookY = 1; ps.head.nod = 1; return; }
          case 'strain': case 'pop': ps.arms = [A(-1, -6, 36, { item: act === 'pop' ? Items.flute : Items.coupe(s.job ? s.job.dish.drink[1] : '#e8ecd8') }), A(1, 2, 26, { item: act === 'pop' ? (c, x, y) => { c.fillStyle = '#1a3a1a'; roundRect(c, x - 3, y - 18, 6, 20, 2); c.fill(); c.fillStyle = '#c8a050'; c.fillRect(x - 2, y - 22, 4, 5); } : shaker, handAng: -1.2 })]; ps.face.lookY = 1; ps.head.nod = 1.2; return;
          case 'garnish': ps.arms = [A(-1, -4, 40, { item: s.job ? glassItem(s.job.dish.drink) : null }), A(1, 4 + Math.sin(k * 6) * 2, 30, { grip: 'point', item: (c, x, y) => { c.strokeStyle = '#e8801a'; c.lineWidth = 1.4; c.beginPath(); c.arc(x + 2, y - 2, 2.4, 0, Math.PI * 1.4); c.stroke(); } })]; ps.face.lookY = 1; ps.head.nod = 1; ps.face.mouth = 'smile'; return;
          case 'hand': ps.arms = [A(-1, -12, 42), A(1, 22 + Math.min(1, k * 2) * 12, 34, { item: s.job ? glassItem(s.job.dish.drink) : null })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return;
          case 'polish': ps.arms = [A(-1, -2, 30, { item: Items.rocks('#ffffff') }), A(1, 6 + Math.cos(k * 8) * 3, 28 + Math.sin(k * 8) * 2, { grip: 'open' })]; ps.face.mouth = 'smile'; ps.head.turn = Math.sin(t * 0.5) * 0.5; return;
          case 'lean': ps.arms = [A(-1, -22, 44, { grip: 'open' }), A(1, 22, 44, { grip: 'open' })]; ps.lean = 0.06; ps.face.mouth = 'talk'; ps.face.open = Math.abs(Math.sin(k * 6)) * 0.5; return;
          case 'flamework': { ps.arms = [A(-1, -10, 30, { item: Items.rocks('#c8701a') }), A(1, 20, 8 - Math.sin(k * 3) * 10, { item: (c, x, y) => { c.fillStyle = '#6a3a10'; roundRect(c, x - 2, y - 12, 4, 13, 1); c.fill(); } })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; return; }
          case 'tower': { const c2 = Math.min(1, k / 2); ps.arms = [A(-1, -10, 20, { grip: 'open' }), A(1, 24, -6 - c2 * 6, { item: (c, x, y) => { c.save(); c.translate(x, y); c.rotate(-1.9); c.fillStyle = '#1a3a1a'; roundRect(c, -3, -18, 6, 20, 2); c.fill(); c.restore(); } })]; ps.face.mouth = 'big'; ps.face.eyes = 'happy'; ps.head.turn = 0.4; return; }
        }
      } else { // cocktail waitress
        if (act === 'pickup') { ps.arms = [A(-1, -14, 30, { grip: 'open' }), A(1, 14, 40)]; ps.face.mouth = 'talk'; ps.face.open = 0.4; ps.head.turn = 0.7; return; }
        if (act === 'serve') { ps.arms = [A(-1, -26, 24, { item: s.job ? glassItem(s.job.dish.drink) : null }), A(1, 12, 40)]; ps.face.mouth = 'big'; ps.lean = 0.08; return; }
        if (act === 'order') { ps.arms = [A(-1, -6, 22, { item: Items.notepad }), A(1, 4, 18, { grip: 'fist' })]; ps.face.mouth = 'smile'; return; }
        if (act === 'tray') { ps.arms = [A(-1, -16, 18, { grip: 'open', item: (c, x, y) => { c.fillStyle = '#c8a050'; ellipse(c, x, y - 1, 11, 2.4); c.fill(); } }), A(1, 14, 44)]; ps.head.turn = Math.sin(t * 0.7) * 0.6; ps.face.mouth = 'smile'; return; }
        if (act === 'charleston') { const b = Math.sin(t * 9); ps.legs = { k1: [-8 + b * 6, 88], f1: [-10 + b * 14, 120 - Math.max(0, b) * 10], k2: [8 - b * 6, 88], f2: [10 - b * 14, 120 - Math.max(0, -b) * 10] }; ps.arms = [A(-1, -24 + b * 8, 30 - b * 10, { grip: 'open' }), A(1, 24 + b * 8, 30 + b * 10, { grip: 'open' })]; ps.face.mouth = 'laugh'; ps.face.eyes = 'happy'; return; }
      }
      return false;
    },
    custPose(a, ps, t, V) {
      if (a.dance) { const b = Math.sin(t * 9 + a.seed); ps.legs = { k1: [-8 + b * 6, 88], f1: [-10 + b * 14, 120 - Math.max(0, b) * 10], k2: [8 - b * 6, 88], f2: [10 - b * 14, 120 - Math.max(0, -b) * 10] }; ps.arms = [{ side: -1, x: -24 + b * 8, y: 30 - b * 10, grip: 'open' }, { side: 1, x: 24 + b * 8, y: 30 + b * 10, grip: 'open' }]; ps.face.mouth = 'laugh'; ps.face.eyes = 'happy'; ps.lean = b * 0.05; }
      else if (V.on && V.on('solo') && a.sitting && !a.walking) { ps.head.turn = -0.7; ps.face.mouth = 'o'; ps.face.open = 0.2; }
      if (a.sitting && a.act === 'stand' && a.seat && a.seat.stool) ps.arms = [{ side: -1, x: -24, y: 38, grip: 'open' }, { side: 1, x: 24, y: 38, grip: 'open' }];
    },
    drawSeat(ctx, seat, t, V, mode) {
      if (!seat.stool) return;
      const u = V.u, k = V.sc, cx = seat.x, top = seat.y + 58 * k, ring = seat.y + 100 * k, fy = seat.y + 128 * k;
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ellipse(ctx, cx, fy, 20 * u, 4 * u); ctx.fill();
      ctx.strokeStyle = '#8a6a2a'; ctx.lineWidth = 3.4 * u; ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, fy - 2 * u); ctx.stroke();
      ctx.strokeStyle = '#e0bc68'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(cx - 0.8 * u, top); ctx.lineTo(cx - 0.8 * u, fy - 2 * u); ctx.stroke();
      ctx.fillStyle = linear(ctx, cx - 16 * u, 0, cx + 16 * u, 0, [[0, '#6a4a1a'], [0.4, '#f0d080'], [1, '#6a4a1a']]); ellipse(ctx, cx, fy - 2 * u, 16 * u, 3.5 * u); ctx.fill();
      ctx.strokeStyle = '#c8a050'; ctx.lineWidth = 2.2 * u; ellipse(ctx, cx, ring, 15 * u, 3.4 * u); ctx.stroke();
      ctx.fillStyle = '#3a0a0c'; roundRect(ctx, cx - 22 * u, top - 3 * u, 44 * u, 9 * u, 4 * u); ctx.fill();
      ctx.fillStyle = linear(ctx, 0, top - 8 * u, 0, top + 2 * u, [[0, '#a02a26'], [1, '#5a1210']]); ellipse(ctx, cx, top - 3 * u, 22 * u, 6 * u); ctx.fill();
      ctx.fillStyle = 'rgba(255,210,190,0.28)'; ellipse(ctx, cx - 7 * u, top - 5 * u, 8 * u, 1.8 * u); ctx.fill();
      ctx.fillStyle = '#e0bc68'; for (let q = -3; q <= 3; q++) { ctx.fillRect(cx + q * 6 * u - 0.6 * u, top + 2.4 * u, 1.2 * u, 1.2 * u); }
    },
    floorProps(V, t) {
      const u = V.u, out = [];
      // upright piano on the stage, side-on, in front of the pianist
      out.push({ y: V.Y(0.79), f: () => { const ctx = V.ctx, px = V.X(0.225), py = V.Y(0.79); ctx.fillStyle = linear(ctx, px - 30 * u, 0, px + 30 * u, 0, [[0, '#1a0804'], [0.5, '#3a1608'], [1, '#120602']]); ctx.fillRect(px - 34 * u, py - 112 * u, 68 * u, 112 * u); ctx.fillStyle = '#f4f0e6'; ctx.fillRect(px - 34 * u, py - 64 * u, 68 * u, 6 * u); ctx.fillStyle = '#1a1a1a'; for (let k = 0; k < 10; k++) ctx.fillRect(px - 32 * u + k * 7 * u, py - 64 * u, 3 * u, 3.6 * u); ctx.fillStyle = '#c8a050'; ctx.fillRect(px - 34 * u, py - 114 * u, 68 * u, 3 * u); ctx.fillStyle = 'rgba(255,220,150,0.6)'; ellipse(ctx, px - 20 * u, py - 116 * u, 6 * u, 3 * u); ctx.fill(); } });
      // booth tables with brass lamps (front of the seated)
      V.S.booths.forEach((b) => out.push({ y: b.y + 0.5, f: () => { const ctx = V.ctx, k = V.sc, ty = b.y - 16 * k, hw = 64 * u, fl = V.Y(0.95);
        // ivory linen tablecloth draped to the floor, with folds and a brass lamp
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(ctx, b.x, fl, hw * 1.1, 6 * u); ctx.fill();
        ctx.beginPath(); ctx.moveTo(b.x - hw, ty); ctx.lineTo(b.x + hw, ty); ctx.lineTo(b.x + hw + 6 * u, fl); for (let q = 8; q >= 0; q--) ctx.quadraticCurveTo(b.x - hw - 6 * u + (q + 0.5) * (2 * hw + 12 * u) / 9, fl + 4 * u, b.x - hw - 6 * u + q * (2 * hw + 12 * u) / 9, fl); ctx.closePath();
        ctx.fillStyle = linear(ctx, b.x - hw, 0, b.x + hw, 0, [[0, '#8a8070'], [0.3, '#e8e0cc'], [0.55, '#f4eedc'], [1, '#7a7060']]); ctx.fill();
        for (let q = 1; q < 9; q++) { const fx = b.x - hw - 6 * u + q * (2 * hw + 12 * u) / 9; ctx.strokeStyle = 'rgba(80,60,40,0.25)'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.moveTo(fx - (fx - b.x) * 0.06, ty + 8 * u); ctx.lineTo(fx, fl); ctx.stroke(); }
        ctx.fillStyle = linear(ctx, 0, ty - 7 * u, 0, ty + 7 * u, [[0, '#fffaf0'], [1, '#d8d0bc']]); ellipse(ctx, b.x, ty, hw, 8 * u); ctx.fill();
        ctx.fillStyle = 'rgba(255,190,110,' + (0.25 * (V.lit || 1)).toFixed(3) + ')'; ellipse(ctx, b.x, ty, hw * 0.6, 5 * u); ctx.fill();
        ctx.fillStyle = '#c8a050'; ctx.fillRect(b.x - 1.5 * u, ty - 28 * u, 3 * u, 26 * u); ellipse(ctx, b.x, ty - 2 * u, 7 * u, 2 * u); ctx.fill();
        ctx.beginPath(); ctx.moveTo(b.x - 12 * u, ty - 28 * u); ctx.lineTo(b.x + 12 * u, ty - 28 * u); ctx.lineTo(b.x + 6 * u, ty - 40 * u); ctx.lineTo(b.x - 6 * u, ty - 40 * u); ctx.closePath(); ctx.fillStyle = '#e8b060'; ctx.fill(); ctx.strokeStyle = '#8a5a20'; ctx.lineWidth = 0.8 * u; ctx.stroke(); D.bulb(ctx, b.x, ty - 30 * u, 60 * u, V.lit || 1);
        V.seats.filter((s) => s.booth === b && s.dish).forEach((s) => { const d = s.dish.drink; ctx.save(); ctx.translate(b.x + (s.x - b.x) * 0.9, ty - 1 * u); ctx.scale(2 * u, 2 * u); glassItem(d)(ctx, 0, 0); ctx.restore(); }); } }));
      return out;
    },
    midLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H; V.ctx = ctx;
      // Edison bulbs on long cords, swaying a little
      [0.06, 0.18, 0.36, 0.47, 0.58, 0.7, 0.82, 0.95].forEach((f, i) => { const x = X(f) + Math.sin(t * 0.6 + i) * 2 * u * (1 + Amb.st.wind), y = H * (0.2 + (i % 3) * 0.035); Decor.edison(ctx, x, y, u * 1.6, (V.lit || 1) * (0.85 + 0.15 * Math.sin(t * 9 + i * 2))); D.bulb(ctx, x, y, 90 * u, V.lit || 1); });
      // bookcase door: shelves of books; the panel swings open when guests come and go
      const dx = X(0.27), dw = X(0.09), dt0 = H * 0.4, db = H * 0.8, op = V.S.door ? Math.sin(Math.min(1, V.S.door.t / 2.4) * Math.PI) : 0;
      if (V.S.door) { V.S.door.t += dt; if (V.S.door.t > 2.4) V.S.door = null; }
      if (op > 0) { ctx.fillStyle = linear(ctx, 0, dt0, 0, db, [[0, '#ffcc80'], [1, '#c87a30']]); ctx.fillRect(dx, dt0, dw, db - dt0); ctx.fillStyle = 'rgba(40,20,10,0.6)'; ctx.fillRect(dx + dw * 0.3, dt0 + 10 * u, dw * 0.4, db - dt0 - 10 * u); }
      ctx.save(); ctx.translate(dx, 0); ctx.scale(1 - op * 0.82, 1);
      ctx.fillStyle = '#3a1c0e'; ctx.fillRect(0, dt0, dw, db - dt0);
      const r2 = mulberry32(5);
      for (let sh = 0; sh < 5; sh++) { const sy = dt0 + 8 * u + sh * (db - dt0) / 5; ctx.fillStyle = '#1a0a04'; ctx.fillRect(4 * u, sy, dw - 8 * u, (db - dt0) / 5 - 8 * u); let bx = 6 * u; while (bx < dw - 10 * u) { const bw = (4 + r2() * 4) * u, bh = ((db - dt0) / 5 - 12 * u) * (0.7 + r2() * 0.3); ctx.fillStyle = Looks.pickR(r2, ['#5a1a1a', '#1a3a2a', '#3a2a1a', '#2a2a4a', '#6a4a1a', '#4a1a2a']); ctx.fillRect(bx, sy + (db - dt0) / 5 - 8 * u - bh, bw, bh); ctx.fillStyle = 'rgba(220,180,90,0.5)'; ctx.fillRect(bx, sy + (db - dt0) / 5 - 8 * u - bh * 0.8, bw, 1 * u); bx += bw + 0.6 * u; } ctx.fillStyle = '#4a2410'; ctx.fillRect(0, sy + (db - dt0) / 5 - 8 * u, dw, 4 * u); }
      ctx.restore();
      // peephole slot
      if (V.S.knock) { V.S.knock.t += dt; const k2 = V.S.knock.t; if (k2 > 2.4) V.S.knock = null; else { const o = k2 > 0.5 && k2 < 2 ? 1 : 0; ctx.fillStyle = o ? '#ffcc80' : '#1a0a04'; ctx.fillRect(dx + dw * 0.3, H * 0.52, dw * 0.4, 8 * u); if (o) { ctx.fillStyle = '#2a1408'; ellipse(ctx, dx + dw * 0.42, H * 0.524, 3 * u, 2 * u); ellipse(ctx, dx + dw * 0.58, H * 0.524, 3 * u, 2 * u); ctx.fill(); ctx.fillStyle = 'rgba(255,240,200,0.8)'; ctx.font = `italic ${10 * u}px Georgia`; ctx.textAlign = 'center'; ctx.fillText('"Swordfish."', dx + dw / 2, H * 0.5); } } }
      // champagne tower (event) on the back counter
      const tw = V.on && V.on('tower');
      if (tw) { const cx = X(0.71), by = H * 0.5, lvl = Math.min(1, tw.t / 6); for (let r = 0; r < 4; r++) for (let c = 0; c <= r; c++) { const gx = cx + (c - r / 2) * 18 * u, gy = by - (3 - r) * 13 * u; const filled = lvl > (r + 1) / 4 - 0.25; Items.coupe(filled ? '#f4dc84' : 'rgba(255,255,255,0.1)')(ctx, gx / (1), gy); } if (lvl < 1) { ctx.fillStyle = 'rgba(244,220,132,0.8)'; ctx.fillRect(cx - 1 * u, by - 60 * u, 2 * u, 20 * u); } }
    },
    counterLive(ctx, t, dt, V) {
      const u = V.u, X = V.X, H = V.H;
      // drinks on the bar for seated stool customers, with condensation beads
      V.seats.filter((s) => s.stool && s.dish).forEach((s) => { const gx = s.x + s.dir * -10 * u, gy = H * 0.615; ctx.save(); ctx.translate(gx, gy); ctx.scale(2.2 * u, 2.2 * u); glassItem(s.dish.drink)(ctx, 0, 0); ctx.restore(); ctx.fillStyle = 'rgba(255,255,255,0.5)'; for (let k = 0; k < 3; k++) { ellipse(ctx, gx + (k - 1) * 3 * u, gy - 4 * u - k * 3 * u, 0.8 * u, 1 * u); ctx.fill(); } });
      // flaming cocktail show
      const fl = V.on && V.on('flame');
      if (fl) { const fx = X(0.8), fy = H * 0.6; ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 8; k++) { const h = (30 + Math.sin(t * 17 + k) * 10) * u * Math.min(1, fl.t / 1.5); ctx.fillStyle = `rgba(${k % 2 ? 255 : 120},${120 + k * 12},${k % 2 ? 40 : 255},0.25)`; ellipse(ctx, fx + Math.sin(t * 11 + k) * 4 * u, fy - h / 2, 6 * u, h / 2); ctx.fill(); } D.bulb(ctx, fx, fy - 20 * u, 160 * u, 1); ctx.restore(); if (Math.random() < 0.5) V.burst(fx, fy - 30 * u, 1, '#ffb040', { kind: 'spark', up: 120, sp: 40, g: -40, life: 0.8, sz: 2 }); }
    },
    front(ctx, t, dt, V) {
      const u = V.u, W = V.W, H = V.H;
      // drifting cigar smoke layers under the lights
      ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 7; i++) { const x = ((t * (6 + i) * u + i * 230 * u) % (W + 300 * u)) - 150 * u, y = H * (0.18 + (i % 4) * 0.09) + Math.sin(t * 0.3 + i) * 10 * u; ctx.fillStyle = radial(ctx, x, y, 160 * u, [[0, 'rgba(200,170,140,0.07)'], [1, 'rgba(200,170,140,0)']]); ctx.fillRect(x - 160 * u, y - 70 * u, 320 * u, 140 * u); }
      ctx.restore();
      // spotlight cone during the solo
      const so = V.on && V.on('solo'); if (so) { const k = Math.min(1, so.t / 2) * Math.min(1, (so.dur - so.t) / 2); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = linear(ctx, 0, 0, 0, H, [[0, `rgba(255,240,200,${0.04 * k})`], [1, `rgba(255,230,180,${0.16 * k})`]]); ctx.beginPath(); ctx.moveTo(V.X(0.1), 0); ctx.lineTo(V.X(0.15), 0); ctx.lineTo(V.X(0.2), H * 0.8); ctx.lineTo(V.X(0.05), H * 0.8); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.fillStyle = `rgba(0,0,0,${0.25 * k})`; ctx.fillRect(V.X(0.26), 0, W, H); }
    },
    events(V) {
      const X = V.X;
      return [
        { at: 0.18, name: 'magic', dur: 18, start() { V.customer({ look: { extra: { top: { type: 'tux', col: '#1a1a1a', bow: '#c8a050' }, acc: { hat: 'bowler', hatCol: '#1a1a1a', mustache: true } } }, life: (a) => (function* () { a.act = 'walk'; yield ['walk', X(0.46), V.lane()]; a.face = -1; a.look = X(0.4); for (let i = 0; i < 4; i++) { a.act = 'talk'; a.actT = 0; a.item2 = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(Math.sin(V.t * 3) * 0.3); for (let q = 0; q < 3; q++) { c.fillStyle = '#ffffff'; c.fillRect(-3 + q * 3, -8 + q, 6, 9); c.strokeStyle = '#c8384a'; c.lineWidth = 0.4; c.strokeRect(-3 + q * 3, -8 + q, 6, 9); } c.restore(); }; yield ['wait', 3]; } V.agents.forEach((m) => { if (m.sitting && m.seat && m.seat.booth) m.cheer = 1.5; }); a.act = 'cheer'; a.cheer = 1.5; yield ['wait', 1.5]; a.act = 'walk'; yield ['walk', X(0.315), V.lane()]; yield ['walk', X(0.315), V.Y(0.83)]; a.done = true; })() }); } },
        { at: 0.32, name: 'solo', dur: 24, start() { // the room hushes; couples get up for a Charleston
          const couples = V.agents.filter((a) => a.sitting && a.seat && a.seat.booth).slice(0, 2);
          couples.forEach((a, i) => { const seat = a.seat; a.sitting = false; a.y = V.lane(); Crowd.hijack(a, (function* () { a.act = 'walk'; yield ['walk', X(0.36 + i * 0.07), V.lane()]; a.dance = true; yield ['until', () => !V.on('solo')]; a.dance = false; a.act = 'walk'; yield ['walk', seat.x, V.lane()]; a.sitting = true; a.x = seat.x; a.y = seat.y; })()); });
        } },
        { at: 0.5, name: 'flame', dur: 9, start() { const b = V.staff[0]; b.act = 'flamework'; b.actT = 0; V.agents.forEach((a) => { if (Math.random() < 0.7) a.react = 2; }); }, end() { V.agents.forEach((a) => { if (a.sitting && Math.random() < 0.6) a.cheer = 1.2; }); } },
        { at: 0.68, name: 'tower', dur: 12, start() { const b = V.staff[0]; b.act = 'tower'; b.actT = 0; }, end() { V.agents.forEach((a) => { if (a.sitting) a.cheer = 1.4; }); V.burst(X(0.71), V.H * 0.45, 30, () => Looks.pickR(Math.random, ['#f4dc84', '#ffffff', '#e8c050']), { kind: 'confetti', up: 260, sp: 160, life: 2 }); } },
      ];
    },
    onClear(e, V) { if (e.big) V.burst(V.X(0.8), V.H * 0.5, 20, () => Looks.pickR(Math.random, ['#f4dc84', '#e8c050', '#ffffff']), { kind: 'confetti', up: 220, sp: 140, life: 1.8 }); },
  };
  const D = { bulb: (ctx, x, y, r, lit) => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = radial(ctx, x, y, r, [[0, `rgba(255,190,100,${0.32 * lit})`], [0.35, `rgba(255,160,70,${0.1 * lit})`], [1, 'rgba(255,150,60,0)']]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); } };
  defineWorld({ id: 'speakeasy', thumbY: 0.45 }, makeVenue(cfg));
})();
