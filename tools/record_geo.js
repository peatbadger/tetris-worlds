// node tools/record_geo.js out.webm  -> 40 s demo of the geometric Kaiten Sushi world:
//   0-22 s lunch (sim x2.5 so customers visibly turn over, line-clear reactions), 22-36 s time-lapse lunch -> dusk -> night -> morning,
//   36-40 s the game itself (board + blocks) at night.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const [out = 'sushi-geo-demo.webm', weather = 'clear'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const dir = '/tmp/rec_' + Date.now(); fs.mkdirSync(dir);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir, size: { width: 1280, height: 720 } } });
  const pg = await ctx.newPage(); const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(2000);
  await pg.evaluate((wth) => { const i = STAGES.findIndex((s) => s.id === 'sushi'); window.__tw.startGame(i); if (wth !== 'clear') Amb.force('sushi', wth); const g = window.__tw.game; for (let y = 22 - 6; y < 22; y++) for (let x = 0; x < 10; x++) g.board[y][x] = (x === (y * 3) % 10) ? 0 : 1 + Math.floor(Math.random() * 7); }, weather);
  await pg.waitForTimeout(800);
  await pg.evaluate(() => { const G = window.__sushiGeo; G.setHour(12.4); G.timeScale(14); });
  await pg.waitForTimeout(2500); // settle (sim ~35 s) under the title card
  const hide = await pg.addStyleTag({ content: 'body > *:not(#bg-wrap){visibility:hidden!important}' });
  await pg.evaluate(() => window.__sushiGeo.timeScale(2.5));
  const t0 = Date.now(), at = async (s, fn, arg) => { const w = s * 1000 - (Date.now() - t0); if (w > 0) await pg.waitForTimeout(w); return pg.evaluate(fn, arg); };
  const shots = [];
  await at(5, () => window.__tw.event('clear', { n: 2 }));
  await at(6, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f0.png' });
  await at(12, () => window.__tw.event('clear', { n: 4, big: true }));
  await at(12.6, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f1.png' });
  await at(18, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f2.png' });
  await at(22, () => { const G = window.__sushiGeo; G.lapse(1.45, 12.6); G.timeScale(3); });
  await at(27, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f3.png' });
  await at(31, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f4.png' });
  await at(36, () => { const G = window.__sushiGeo; G.lapse(0); G.setHour(22); G.timeScale(1); });
  await pg.evaluate(() => document.querySelectorAll('style').forEach((s) => { if (s.textContent.includes('bg-wrap){visibility')) s.remove(); }));
  await at(38, () => window.__tw.event('clear', { n: 1 }));
  await at(38.5, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-f5.png' });
  await at(41, () => 0);
  const info = await pg.evaluate(() => ({ simT: window.__sushiGeo.simT() }));
  const v = pg.video(); await ctx.close(); const p = await v.path(); fs.copyFileSync(p, out);
  console.log('video', out, fs.statSync(out).size, JSON.stringify(info), 'errs', JSON.stringify(errs));
  await b.close();
})();
