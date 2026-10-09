// node tools/gw.js <worldId> out.png [hour=''] [weather=''] [warmSec=20] [w=1440] [h=900] [sceneOnly=0] [mobile=0] [stack=1]
// Geometric worlds (GeoKit): start the world, build a real mixed stack of all 7 pieces, set clock/weather via window.__geo,
// fast-forward the sim, screenshot, print fps / actors / errors.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [world = 'mikes', out = 'gw.png', hour = '', weather = '', warm = '20', w = '1440', h = '900', sceneOnly = '0', mobile = '0', stack = '1'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const opts = +mobile ? { viewport: { width: +w, height: +h }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: +w, height: +h } };
  const pg = await b.newPage(opts); const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 4).join('|'))); pg.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1200);
  await pg.evaluate(([world, weather]) => { const i = STAGES.findIndex((s) => s.id === world); window.__tw.startGame(i); if (weather) Amb.force(world, weather); }, [world, weather]);
  await pg.waitForTimeout(3300);
  await pg.evaluate(([hour, weather, warm, stack]) => {
    const G = window.__geo; if (G) { if (hour !== '') G.setHour(+hour); if (weather) G.weather(weather); G.timeScale(warm > 0 ? 8 : 1); }
    const g = window.__tw.game;
    if (+stack) { const plan = [['I', 0, 0], ['O', 0, 4], ['S', 0, 5], ['L', 0, 0], ['J', 0, 6], ['Z', 0, 2], ['T', 2, 0], ['O', 0, 7], ['I', 1, 4], ['S', 1, 7], ['T', 0, 3], ['Z', 1, 0], ['L', 2, 5], ['J', 1, 7], ['I', 0, 2], ['T', 3, -1]];
      for (const [type, rot, x] of plan) { g.piece = { type, rot, x, y: 0 }; if (g.collide(g.piece)) continue; g.hardDrop(); if (g.state === 'clearing') g.update(1000); if (g.state !== 'playing') break; }
      g.piece = { type: 'T', rot: 0, x: 3, y: 3 }; }
  }, [hour, weather, +warm, stack]);
  await pg.waitForTimeout((+warm / 8) * 1000);
  await pg.evaluate(() => { if (window.__geo) window.__geo.timeScale(1); window.__fps = []; let last = performance.now(); const f = (n) => { window.__fps.push(n - last); last = n; if (window.__fps.length < 150) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await pg.waitForTimeout(2600);
  if (+sceneOnly) await pg.addStyleTag({ content: 'body > *:not(#bg-wrap){visibility:hidden!important}' });
  const info = await pg.evaluate(() => { const a = window.__fps.slice(10); const fps = Math.round(1000 / (a.reduce((s, x) => s + x, 0) / Math.max(1, a.length))); const G = window.__geo; if (!G) return { fps, geo: false };
    return { fps, world: G.id, hour: +G.K.hour.toFixed(2), label: G.K.P.label, weather: G.K.weatherNow, simT: Math.round(G.K.simT), actors: G.K.actors.map((a) => (a.role || a.type || '?') + ':' + a.state + (a.act ? '/' + a.act.name : '')).join(' '), dbg: G.debug, nT: G.K.timers.length, nE: G.K.effects.length, nA: G.K.actors.length }; });
  await pg.screenshot({ path: path.resolve(out) });
  console.log(JSON.stringify(info), 'errs', JSON.stringify(errs));
  await b.close();
})();
