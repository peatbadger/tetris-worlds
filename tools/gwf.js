// node tools/gwf.js <world> <outPrefix> [hour] [weather] [warmSec=20] [n=6] [gapMs=700] — scene-only frames mid-animation (1280x720 css) for overlap/float review
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [world, out, hour = '', weather = '', warm = '20', n = '6', gap = '700'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const pg = await b.newPage({ viewport: { width: 1280, height: 720 } }); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1200);
  await pg.evaluate(([world, weather]) => { const i = STAGES.findIndex((s) => s.id === world); window.__tw.startGame(i); if (weather) Amb.force(world, weather); }, [world, weather]);
  await pg.waitForTimeout(2500);
  await pg.evaluate(([hour, weather, warm]) => { const G = window.__geo; if (G) { if (hour !== '') G.setHour(+hour); if (weather) G.weather(weather); G.timeScale(warm > 0 ? 8 : 1); } const g = window.__tw.game; if (g.togglePause && g.state === 'playing') g.togglePause(); else if (g.state === 'playing') g.state = 'paused'; }, [hour, weather, +warm]);
  await pg.waitForTimeout((+warm / 8) * 1000);
  await pg.evaluate(() => { if (window.__geo) window.__geo.timeScale(1); });
  await pg.addStyleTag({ content: 'body > *:not(#bg-wrap){visibility:hidden!important}' });
  const acts = [];
  for (let i = 0; i < +n; i++) { await pg.waitForTimeout(+gap); await pg.screenshot({ path: path.resolve(`${out}${i}.png`) }); acts.push(await pg.evaluate(() => window.__geo ? window.__geo.K.actors.map((a) => (a.role || a.type) + ':' + (a.act ? a.act.name : a.state)).join(' ') : '')); }
  console.log(acts.join('\n'), '\nerrs', JSON.stringify(errs)); await b.close();
})();
