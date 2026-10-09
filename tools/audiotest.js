// node tools/audiotest.js : plays every world briefly with audio on, counts frequency values set >= 20 kHz / Nyquist
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const pg = await b.newPage({ viewport: { width: 1024, height: 594 } }); const warns = []; const errs = [];
  pg.on('console', (c) => { const t = c.text(); if (/frequency|nominal range|Nyquist/i.test(t)) warns.push(t); if (c.type() === 'error') errs.push(t); });
  pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack||'').split('\n').slice(1,7).join('|')));
  await pg.addInitScript(() => { window.__hi = []; ['setValueAtTime', 'linearRampToValueAtTime', 'exponentialRampToValueAtTime', 'setTargetAtTime'].forEach((m) => { const f = AudioParam.prototype[m]; AudioParam.prototype[m] = function (v, ...a) { if (this.maxValue > 20000) { window.__mx = Math.max(window.__mx || 0, v); if (v > 20000) window.__hi.push(m + ':' + Math.round(v)); } return f.call(this, v, ...a); }; });
    const d = Object.getOwnPropertyDescriptor(AudioParam.prototype, 'value'); Object.defineProperty(AudioParam.prototype, 'value', { get() { return d.get.call(this); }, set(v) { if (v > 20000 && this.maxValue > 20000) window.__hi.push('value:' + Math.round(v)); d.set.call(this, v); }, configurable: true }); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1000);
  await pg.mouse.click(10, 10);
  const n = await pg.evaluate(() => STAGES.length);
  for (let i = 0; i < n; i++) {
    await pg.evaluate((i) => { window.__tw.startGame(i); }, i);
    await pg.waitForTimeout(1500);
    for (let k = 0; k < 6; k++) { await pg.keyboard.press(['ArrowLeft', 'ArrowUp', 'Space', 'ArrowRight', 'c', 'Space'][k]); await pg.waitForTimeout(150); }
    await pg.evaluate(() => { const g = window.__tw.game; for (let x = 0; x < 9; x++) g.board[g.board.length - 1][x] = 1; g.piece = { type: 'I', rot: 1, x: 7, y: 0 }; if (!g.collide(g.piece)) g.hardDrop(); });
    await pg.waitForTimeout(1800);
    await pg.evaluate(async () => { const S = AudioEngine.sfx; for (const k of Object.keys(S)) { if (typeof S[k] !== 'function') continue; for (const a of [[4, true, 12], [1, false, 0], [-1], [20]]) { try { S[k](...a); } catch (e) {} } } });
    await pg.waitForTimeout(600);
  }
  const hi = await pg.evaluate(() => window.__hi); console.log('maxFreq', await pg.evaluate(() => window.__mx), 'ctx', await pg.evaluate(() => AudioEngine.ready));
  console.log('worlds', n, 'hiFreqSets', hi.length, JSON.stringify(hi.slice(0, 10)), 'warns', warns.length, JSON.stringify(warns.slice(0, 3)), 'errs', JSON.stringify(errs.slice(0, 5)));
  await b.close();
})();
