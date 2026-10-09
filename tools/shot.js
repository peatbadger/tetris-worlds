// node tools/shot.js <worldId|all> [lines=4] [weather] [out] [waitMs]  -> screenshot + console errors + fps
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [id = 'sushi', lines = '4', weather = '', out = '', wait = '3500'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join('|'))); pg.on('console', (c) => { if (c.type() === 'error') errs.push('console:' + c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1500);
  const ids = await pg.evaluate(() => STAGES.map((s) => s.id));
  const list = id === 'all' ? ids : [id];
  for (const w of list) {
    const i = ids.indexOf(w); if (i < 0) { console.log('MISSING world', w, ids.join(','), JSON.stringify(errs)); continue; }
    await pg.evaluate(([i, lines, weather]) => {
      window.__tw.startGame(i); if (weather) Amb.force(STAGES[i].id, weather);
      const g = window.__tw.game; g.state = 'playing'; g.spawn && g.spawn();
      g.linesInStage = +lines; const r = Math.random;
      for (let y = 22 - 7; y < 22; y++) for (let x = 0; x < 10; x++) g.board[y][x] = (x === (y * 3) % 10) ? 0 : 1 + Math.floor(r() * 7);
      window.__fps = []; let last = performance.now(); const f = (n) => { window.__fps.push(n - last); last = n; if (window.__fps.length < 400) requestAnimationFrame(f); }; requestAnimationFrame(f);
    }, [i, lines, weather]);
    await pg.waitForTimeout(+wait);
    const info = await pg.evaluate(() => { const a = window.__fps.slice(20); const avg = a.reduce((s, x) => s + x, 0) / Math.max(1, a.length); const V = window.__V; return { fps: Math.round(1000 / avg), agents: V ? V.agents.length : -1, staff: V ? V.staff.length : -1, phase: Amb.st.label, weather: Amb.st.weather, idx: window.__tw.stageIdx, name: STAGES[window.__tw.stageIdx].name }; });
    const file = out && list.length === 1 ? out : path.resolve(__dirname, '../screenshot-' + w + '.png');
    await pg.screenshot({ path: file });
    console.log(w, JSON.stringify(info), 'errs', JSON.stringify(errs.splice(0)));
  }
  await b.close();
})();
