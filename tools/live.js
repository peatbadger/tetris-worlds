// node tools/live.js [url] — load the live site headless, start every world briefly, report console/page errors
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const url = process.argv[2] || 'https://peatbadger.github.io/tetris-worlds/?v=' + Date.now();
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = [];
  pg.on('pageerror', (e) => errs.push('PAGE ' + e.message)); pg.on('console', (c) => { if (c.type() === 'error') errs.push('CONSOLE ' + c.text()); });
  const r = await pg.goto(url, { waitUntil: 'load' }); await pg.waitForTimeout(2000);
  const ids = await pg.evaluate(() => STAGES.map((s) => s.id));
  const res = [];
  for (let i = 0; i < ids.length; i++) { await pg.evaluate((i) => window.__tw.startGame(i), i); await pg.waitForTimeout(1500); res.push(ids[i]); }
  console.log('status', r.status(), 'worlds', ids.length, ids.join(','), '\nerrs', JSON.stringify(errs));
  await b.close();
})();
