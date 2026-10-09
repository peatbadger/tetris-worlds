// node tools/foodstack.js out.png [w=1440] [h=900] [mobile=0] [hour=12.5]  -> sushi world with a real mixed stack of all 7 foods (pieces locked via the game)
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [out = 'food.png', w = '1440', h = '900', mobile = '0', hour = '12.5'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const opts = +mobile ? { viewport: { width: +w, height: +h }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: +w, height: +h } };
  const pg = await b.newPage(opts); const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join('|'))); pg.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1500);
  await pg.evaluate(() => { const i = STAGES.findIndex((s) => s.id === 'sushi'); window.__tw.startGame(i); });
  await pg.waitForTimeout(3500); // title card
  const r = await pg.evaluate((hour) => {
    const g = window.__tw.game; if (window.__sushiGeo) window.__sushiGeo.setHour(+hour);
    // [type, rot, x] — a hand-built stack that never completes a row (column 9 stays open)
    const plan = [['I', 0, 0], ['O', 0, 4], ['S', 0, 5], ['L', 0, 0], ['J', 0, 6], ['Z', 0, 2], ['T', 2, 0], ['O', 0, 7], ['I', 1, 4], ['S', 1, 7], ['T', 0, 3], ['Z', 1, 0], ['L', 2, 5], ['J', 1, 7], ['I', 0, 2], ['T', 3, -1]];
    const placed = [];
    for (const [type, rot, x] of plan) { g.piece = { type, rot, x, y: 0 }; if (g.collide(g.piece)) { placed.push(type + '!'); continue; } g.hardDrop(); placed.push(type); if (g.state === 'clearing') { g.update(1000); } if (g.state !== 'playing') break; }
    g.piece = { type: 'T', rot: 0, x: 3, y: 3 };
    return { placed: placed.join(' '), state: g.state, filled: g.board.flat().filter((v) => v).length };
  }, hour);
  await pg.waitForTimeout(1600);
  await pg.evaluate(() => { window.__fps = []; let last = performance.now(); const f = (n) => { window.__fps.push(n - last); last = n; if (window.__fps.length < 150) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await pg.waitForTimeout(2600);
  const fps = await pg.evaluate(() => { const a = window.__fps.slice(10); return Math.round(1000 / (a.reduce((s, x) => s + x, 0) / a.length)); });
  const box = await pg.evaluate(() => { const r = document.getElementById('matrix').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, cell: getComputedStyle(document.documentElement).getPropertyValue('--cell') }; });
  await pg.screenshot({ path: path.resolve(out) });
  console.log(JSON.stringify(r), 'fps', fps, JSON.stringify(box), 'errs', JSON.stringify(errs));
  await b.close();
})();
