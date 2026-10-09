// node tools/keys.js [world=sushi] — headless keyboard regression test.
// Drives REAL keyboard input (page.keyboard → focused element → window listener) across: plain play, pause/resume (P, Esc,
// HUD button, RESUME button), clicking HUD controls then typing, an on-screen touch-button press, a natural world switch,
// a restart from the pause menu, a top-out → game over → Enter, and window blur (incl. a key held down across the blur).
// After each step it checks that ←/→ move the piece, ↑ rotates, Space hard-drops and P toggles pause. Exit code 1 on any failure.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const world = process.argv[2] || 'sushi';
(async () => {
  const b = await chromium.launch({ timeout: 120000, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const res = []; let fail = 0;
  try {
    const pg = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = [];
    pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join('|')));
    await pg.goto('file://' + path.resolve(__dirname, '../index.html'), { timeout: 240000 }); pg.setDefaultTimeout(60000); await pg.waitForTimeout(1000);
    const st = () => pg.evaluate(() => { const g = window.__tw.game; return { t: Math.round(g.time || 0), type: g.piece ? g.piece.type : null, state: g.state, x: g.piece ? g.piece.x : null, rot: g.piece ? g.piece.rot : null, pieces: g.stats.pieces, stage: window.__tw.stageIdx, paused: !document.getElementById('pause').classList.contains('hidden'), over: !document.getElementById('over').classList.contains('hidden'), focus: document.activeElement ? document.activeElement.tagName + '#' + (document.activeElement.id || document.activeElement.className) : '-' }; });
    const waitPlay = async (ms = 9000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const s = await st(); if (s.state === 'playing' && s.x != null && !s.paused && !s.over) return true; await pg.waitForTimeout(100); } return false; };
    const ok = (name, cond, info) => { res.push((cond ? 'PASS ' : 'FAIL ') + name + (info ? '  ' + JSON.stringify(info) : '')); if (!cond) fail++; };
    async function keysWork(name) {
      if (!(await waitPlay())) { ok(name + ': reaches playing', false, await st()); return; }
      const a = await st(); await pg.keyboard.press('ArrowLeft'); await pg.waitForTimeout(60); const b1 = await st(); await pg.keyboard.press('ArrowRight'); await pg.keyboard.press('ArrowRight'); await pg.waitForTimeout(60); const c = await st();
      await pg.keyboard.press('ArrowUp'); await pg.waitForTimeout(60); const d = await st();
      await pg.keyboard.press('Space'); await pg.waitForTimeout(120); const e = await st();
      await pg.keyboard.press('KeyP'); await pg.waitForTimeout(80); const f = await st(); await pg.keyboard.press('KeyP'); await pg.waitForTimeout(80); const g = await st();
      await pg.keyboard.press('Escape'); await pg.waitForTimeout(80); const h = await st(); await pg.keyboard.press('Escape'); await pg.waitForTimeout(80); const i = await st();
      await pg.waitForTimeout(250); const j = await st();
      const pass = j.t > a.t && b1.x === a.x - 1 && c.x === a.x + 1 && (d.rot !== c.rot || c.type === 'O') && e.pieces === a.pieces + 1 && f.paused && !g.paused && h.paused && !i.paused;
      ok(name, pass, pass ? { focus: a.focus } : { a, b1, c, d, e, f, g, h, i, j });
    }
    await pg.evaluate((w) => window.__tw.startGame(Math.max(0, STAGES.findIndex((s) => s.id === w))), world);
    await keysWork('1 plain play');
    await pg.click('#btn-pause'); await pg.waitForTimeout(100); ok('2a HUD pause button pauses', (await st()).paused);
    await pg.click('#btn-resume'); await pg.waitForTimeout(100); await keysWork('2b after mouse RESUME');
    await pg.click('#btn-pause'); await pg.click('#btn-pause').catch(() => {}); await pg.keyboard.press('KeyP'); await keysWork('2c after HUD pause button + P');
    await pg.click('.side-btns .mute-btn'); await keysWork('3a after clicking HUD mute');
    await pg.click('.mini-keys summary'); await keysWork('3b after clicking KEYS summary'); await pg.click('.mini-keys summary');
    await pg.evaluate(() => { const t = document.querySelector('#touchpad .tb[data-act="left"]'); if (!t) return; const o = { bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch' }; t.dispatchEvent(new PointerEvent('pointerdown', o)); t.dispatchEvent(new PointerEvent('pointerup', o)); });
    await pg.waitForTimeout(80); await keysWork('4 after touch-button press');
    await pg.evaluate(() => { const g = window.__tw.game; g.linesInStage = 11; g.clearRows = [g.board.length - 1]; g.state = 'clearing'; g.clearT = 1e9; });
    await pg.waitForTimeout(300); const s5 = await st(); await keysWork('5 after natural world switch (stage ' + s5.stage + ')');
    await pg.keyboard.press('KeyP'); await pg.waitForTimeout(100); await pg.click('#btn-restart'); await keysWork('6 after RESTART from pause menu');
    for (let k = 0; k < 40 && (await st()).state !== 'over'; k++) { await waitPlay(3000); await pg.keyboard.press('Space'); await pg.waitForTimeout(60); }
    await pg.waitForTimeout(1600); const s7 = await st(); ok('7a top-out shows GAME OVER overlay', s7.state === 'over' && s7.over, s7);
    await pg.keyboard.press('Enter'); await keysWork('7b after game over → Enter');
    await pg.keyboard.down('ArrowLeft'); await pg.evaluate(() => dispatchEvent(new Event('blur'))); await pg.waitForTimeout(80); ok('8a window blur pauses', (await st()).paused);
    await pg.keyboard.up('ArrowLeft'); await pg.evaluate(() => dispatchEvent(new Event('focus'))); await pg.keyboard.press('KeyP'); await keysWork('8b after blur with a held key + P');
    await pg.evaluate(() => window.__tw.toMenu()); await pg.waitForTimeout(200); await pg.keyboard.press('Enter'); await keysWork('9 menu → Enter → journey');
    // 10: keyboard-driven stage select (card keeps focus in Safari/Firefox) → Enter on a card → play
    await pg.evaluate(() => window.__tw.toMenu()); await pg.waitForTimeout(150); await pg.click('#btn-select'); await pg.waitForTimeout(300); await pg.keyboard.press('ArrowRight'); await pg.keyboard.press('Enter'); await keysWork('10 stage select via keyboard → play');
    // 11: a scene/subsystem that throws every frame must not freeze the game loop (the frozen-board symptom)
    await pg.evaluate(() => { const o = Amb.update; Amb.update = function () { throw new Error('injected test error'); }; window.__restoreAmb = () => { Amb.update = o; }; });
    await keysWork('11 game keeps running while a scene subsystem throws'); await pg.evaluate(() => window.__restoreAmb());
    ok('no page errors', !errs.filter((e) => !/injected test error/.test(e)).length, errs.slice(0, 3));
  } finally { await b.close(); }
  console.log(res.join('\n')); console.log(fail ? `KEYS: ${fail} FAIL` : 'KEYS: ALL PASS'); process.exit(fail ? 1 : 0);
})();
