// node tools/devices.js [url]  -> emulates iPhone 14 (portrait+landscape), iPad landscape, desktop 1920x1080;
// drives synthetic touch gestures + on-screen buttons via CDP, checks keyboard on desktop, screenshots each.
const { chromium, devices } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const url = process.argv[2] || 'file://' + path.resolve(__dirname, '../index.html');
const outDir = process.argv[3] || path.resolve(__dirname, '..');
const ip = devices['iPhone 14'], ipl = devices['iPhone 14 landscape'], pad = devices['iPad Pro 11 landscape'] || devices['iPad (gen 7) landscape'];
const only = process.env.ONLY;
const configs0 = [
  { name: 'iphone-portrait', ctx: { ...ip } },
  { name: 'iphone-landscape', ctx: { ...ipl } },
  { name: 'ipad-landscape', ctx: { ...pad } },
  { name: 'desktop', ctx: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 } },
];
const configs = configs0.filter((c) => !only || c.name === only);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  let allOk = true;
  for (const c of configs) {
    const ctx = await b.newContext(c.ctx); const pg = await ctx.newPage();
    const errs = []; pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error') errs.push('console:' + m.text()); });
    await pg.goto(url); await pg.waitForFunction(() => window.__tw && document.getElementById('loading').classList.contains('hidden') || !document.getElementById('loading'), null, { timeout: 30000 }).catch(() => {});
    await sleep(800);
    const touch = !!c.ctx.hasTouch; const cdp = await ctx.newCDPSession(pg);
    let vt = Date.now() / 1000; const T = async (type, pts, dtMs = 0) => { vt = type === 'touchStart' ? Math.max(vt + 0.05, Date.now() / 1000) : vt + Math.max(dtMs, 1) / 1000; return cdp.send('Input.dispatchTouchEvent', { type, timestamp: vt, touchPoints: pts.map(([x, y], i) => ({ x, y, id: i })) }); };
    const tap = async (x, y) => { await T('touchStart', [[x, y]]); await sleep(60); await T('touchEnd', [], 60); await sleep(120); };
    const swipe = async (x0, y0, x1, y1, ms, steps = 8) => { await T('touchStart', [[x0, y0]]); for (let i = 1; i <= steps; i++) { await sleep(ms / steps); await T('touchMove', [[x0 + (x1 - x0) * i / steps, y0 + (y1 - y0) * i / steps]], ms / steps); } await sleep(20); await T('touchEnd', [], 15); await sleep(150); };
    const res = { name: c.name };
    if (c.ctx.hasTouch && c.name.startsWith('iphone')) { await pg.screenshot({ path: path.join(outDir, 'shot-menu-' + c.name + '.png') }); { const r = await pg.locator('#btn-select').boundingBox(); await tap(r.x + r.width / 2, r.y + r.height / 2); } await sleep(700); await pg.screenshot({ path: path.join(outDir, 'shot-worlds-' + c.name + '.png') }); await pg.evaluate(() => window.__tw.toMenu()); await sleep(400); }
    // start the game: tap PLAY (touch) or press Enter (desktop) -> sushi world (painted)
    const sushiIdx = await pg.evaluate(() => STAGES.findIndex((s) => s.id === 'sushi'));
    if (touch) { const r = await pg.locator('#btn-play').boundingBox(); await tap(r.x + r.width / 2, r.y + r.height / 2); }
    else await pg.keyboard.press('Enter');
    await sleep(300); res.started = await pg.evaluate(() => document.getElementById('menu').classList.contains('hidden'));
    await pg.evaluate((i) => window.__tw.startGame(i), sushiIdx);
    await pg.waitForFunction(() => window.__tw.game.state === 'playing' && window.__tw.game.piece, null, { timeout: 15000 }).catch(() => {});
    await sleep(300);
    const freeze = () => pg.evaluate(() => { const g = window.__tw.game; if (g.piece && g.piece.type === 'O') g.piece = { ...g.piece, type: 'T', x: 3 }; g.gravAcc = -1e6; g.lockTimer = 0; });
    const P = () => pg.evaluate(() => { const g = window.__tw.game; return { pz: !document.getElementById('pause').classList.contains('hidden'), x: g.piece && g.piece.x, y: g.piece && g.piece.y, rot: g.piece && g.piece.rot, type: g.piece && g.piece.type, hold: g.hold, pieces: g.stats.pieces, soft: g.softDrop, state: g.state }; });
    const L = await pg.evaluate(() => { const r = document.getElementById('matrix').getBoundingClientRect(); const cell = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell')); return { l: r.left, t: r.top, w: r.width, h: r.height, cell, vw: innerWidth, vh: innerHeight, mode: document.getElementById('play').className, dpr: devicePixelRatio, canvasW: document.getElementById('board').width, btns: document.body.classList.contains('touch-btns') }; });
    res.layout = L; res.boardHeightPct = Math.round(L.h / L.vh * 100);
    const cx = L.l + L.w / 2, cy = L.t + L.h * 0.45, cell = L.cell;
    if (touch) {
      await freeze(); let a = await P(); await swipe(cx, cy, cx + cell * 3.2, cy + 2, 300, 10); let b2 = await P(); res.dragRight = b2.x - a.x;
      await freeze(); a = await P(); await swipe(cx, cy, cx - cell * 2.2, cy, 300, 10); b2 = await P(); res.dragLeft = b2.x - a.x;
      await freeze(); a = await P(); await tap(cx, cy); b2 = await P(); res.tapRotate = `${a.rot}->${b2.rot}`;
      await freeze(); a = await P(); await T('touchStart', [[cx - 40, cy], [cx + 40, cy]]); await sleep(70); await T('touchEnd', []); await sleep(150); b2 = await P(); res.twoFingerCCW = `${a.rot}->${b2.rot}`;
      // slow drag down -> soft drop active during the drag
      await freeze(); await T('touchStart', [[cx, cy - cell * 3]]); let sd = false; for (let i = 1; i <= 12; i++) { await sleep(70); await T('touchMove', [[cx, cy - cell * 3 + i * cell * 0.25]], 70); const s = await P(); sd = sd || s.soft; } await T('touchEnd', []); await sleep(100); res.slowDragSoft = sd; res.pzAfterSoft = (await P()).pz; res.pzBefore = a.pz; res.softReleased = !(await P()).soft;
      await freeze(); a = await P(); await swipe(cx, cy, cx, cy - cell * 5, 120, 3); b2 = await P(); res.swipeUpHold = `${a.hold}->${b2.hold} ${b2.state}`; res.gUp = await pg.evaluate(() => window.__lastGesture);
      await freeze(); a = await P(); await swipe(cx, cy - cell * 4, cx, cy + cell * 4, 110, 3); await sleep(250); b2 = await P(); res.swipeDownHard = `pieces ${a.pieces}->${b2.pieces} ${b2.state}`; res.gDown = await pg.evaluate(() => window.__lastGesture);
      // on-screen buttons
      const btn = async (id, hold = 80) => { const r = await pg.locator('#' + id).boundingBox(); if (!r) return null; const x = r.x + r.width / 2, y = r.y + r.height / 2; await T('touchStart', [[x, y]]); await sleep(hold); const mid = await P(); await T('touchEnd', []); await sleep(120); return mid; };
      await pg.evaluate(() => window.__tw.game.hold = null); await sleep(50); await pg.evaluate(() => { window.__tw.game.canHold = true; });
      await freeze(); a = await P(); await btn('tb-right'); b2 = await P(); res.btnRight = b2.x - a.x; res.stB = b2.state + ' paused=' + (await pg.evaluate(() => !document.getElementById('pause').classList.contains('hidden'))) + ' hit=' + (await pg.evaluate(() => { const r = document.getElementById('tb-right').getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return e && (e.id || e.className || e.tagName); }));
      await freeze(); a = await P(); await btn('tb-left'); b2 = await P(); res.btnLeft = b2.x - a.x;
      await freeze(); a = await P(); await btn('tb-left', 420); b2 = await P(); res.btnLeftHoldDAS = b2.x - a.x;
      await freeze(); a = await P(); await btn('tb-rot'); b2 = await P(); res.btnRot = `${a.rot}->${b2.rot}`;
      await freeze(); a = await P(); await btn('tb-ccw'); b2 = await P(); res.btnCCW = `${a.rot}->${b2.rot}`;
      await freeze(); const mid = await btn('tb-soft', 200); res.btnSoft = mid && mid.soft;
      await freeze(); a = await P(); await btn('tb-hold'); b2 = await P(); res.btnHold = `${a.type}/${a.hold}->${b2.type}/${b2.hold}`;
      await freeze(); a = await P(); await btn('tb-hard'); await sleep(250); b2 = await P(); res.btnHard = `pieces ${a.pieces}->${b2.pieces}`;
      const pid = (await pg.evaluate(() => getComputedStyle(document.getElementById('tb-pause')).display)) === 'none' ? 'btn-pause' : 'tb-pause'; res.pauseVia = pid; await btn(pid); res.pauseByButton = await pg.evaluate(() => !document.getElementById('pause').classList.contains('hidden')); await sleep(400); await pg.screenshot({ path: path.join(outDir, 'shot-pause-' + c.name + '.png') });
      const rr = await pg.locator('#btn-resume').boundingBox(); await tap(rr.x + rr.width / 2, rr.y + rr.height / 2); await sleep(200);
      res.resumeByTap = await pg.evaluate(() => document.getElementById('pause').classList.contains('hidden'));
    } else {
      await freeze(); let a = await P(); await pg.keyboard.press('ArrowRight'); await pg.keyboard.press('ArrowRight'); let b2 = await P(); res.keyRight = b2.x - a.x;
      await freeze(); a = await P(); await pg.keyboard.press('ArrowUp'); b2 = await P(); res.keyRotate = `${a.rot}->${b2.rot}`;
      await freeze(); a = await P(); await pg.keyboard.press('KeyZ'); b2 = await P(); res.keyCCW = `${a.rot}->${b2.rot}`;
      await freeze(); a = await P(); await pg.keyboard.press('KeyC'); b2 = await P(); res.keyHold = `${a.hold}->${b2.hold}`;
      await freeze(); a = await P(); await pg.keyboard.press('Space'); await sleep(250); b2 = await P(); res.keyHard = `pieces ${a.pieces}->${b2.pieces}`;
      await pg.keyboard.press('KeyP'); res.keyPause = await pg.evaluate(() => !document.getElementById('pause').classList.contains('hidden')); await pg.keyboard.press('KeyP');
      res.touchpadHidden = await pg.evaluate(() => getComputedStyle(document.getElementById('touchpad')).display === 'none');
    }
    // fill a few rows so the screenshot looks like play
    await pg.evaluate(() => { const g = window.__tw.game; for (let y = 22 - 5; y < 22; y++) for (let x = 0; x < 10; x++) g.board[y][x] = (x === (y * 3) % 10) ? 0 : 1 + ((x * 7 + y * 3) % 7); });
    await sleep(1800);
    const file = path.join(outDir, 'screenshot-' + c.name + '.png'); await pg.screenshot({ path: file });
    res.errors = errs; res.shot = file; console.log(JSON.stringify(res));
    if (errs.length) allOk = false;
    await ctx.close();
  }
  await b.close(); process.exit(allOk ? 0 : 1);
})();
