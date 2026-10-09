// node tools/geo.js out.png [hour] [weather] [warmSec=20] [w=1440] [h=900] [sceneOnly=0] [mobile=0]
// Kaiten Sushi geometric edition: set clock / weather via window.__sushiGeo, fast-forward the sim, screenshot, report.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [out = 'geo.png', hour = '', weather = '', warm = '20', w = '1440', h = '900', sceneOnly = '0', mobile = '0'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const opts = +mobile ? { viewport: { width: +w, height: +h }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' } : { viewport: { width: +w, height: +h } };
  const pg = await b.newPage(opts);
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 4).join('|'))); pg.on('console', (c) => { if (c.type() === 'error') errs.push('console:' + c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1500);
  await pg.evaluate(([weather]) => {
    const i = STAGES.findIndex((s) => s.id === 'sushi'); window.__tw.startGame(i); if (weather) Amb.force('sushi', weather);
    const g = window.__tw.game; g.state = 'playing'; g.spawn && g.spawn(); g.linesInStage = 1;
    for (let y = 22 - 5; y < 22; y++) for (let x = 0; x < 10; x++) g.board[y][x] = (x === (y * 3) % 10) ? 0 : 1 + ((x + y * 2) % 7);
  }, [weather]);
  await pg.waitForTimeout(600);
  await pg.evaluate(([hour, weather, warm]) => { const G = window.__sushiGeo; if (hour !== '') G.setHour(+hour); if (weather) G.weather(weather); G.timeScale(warm > 0 ? 8 : 1); }, [hour, weather, +warm]);
  await pg.waitForTimeout((+warm / 8) * 1000);
  await pg.evaluate(() => { window.__sushiGeo.timeScale(1); window.__fps = []; let last = performance.now(); const f = (n) => { window.__fps.push(n - last); last = n; if (window.__fps.length < 200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await pg.waitForTimeout(2500);
  if (+sceneOnly) await pg.addStyleTag({ content: 'body > *:not(#bg-wrap){visibility:hidden!important}' });
  const info = await pg.evaluate(() => { const a = window.__fps.slice(10); const avg = a.reduce((s, x) => s + x, 0) / Math.max(1, a.length); const G = window.__sushiGeo; return { fps: Math.round(1000 / avg), simT: Math.round(G.simT()), hour: G.P.hour, label: G.P.label, weather: SushiPal.weather, actors: G.actors.map((a) => a.type + ':' + a.state + (a.act ? '/' + a.act.name : '')).join(' '), plates: G.plates.length, chef: G.chef.act && G.chef.act.name, wait: G.waitress.act && G.waitress.act.name }; });
  await pg.screenshot({ path: path.resolve(out) });
  console.log(JSON.stringify(info), 'errs', JSON.stringify(errs));
  await b.close();
})();
