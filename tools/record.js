// node tools/record.js <world> <out.webm> [seconds=12]  -> records the live scene (with scripted moments) as webm + a few PNG frames
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const [id = 'sushi', out = 'demo.webm', secs = '12'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const dir = '/tmp/rec_' + Date.now(); fs.mkdirSync(dir);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir, size: { width: 1280, height: 720 } } });
  const pg = await ctx.newPage(); const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(2500);
  await pg.evaluate((w) => { const i = STAGES.findIndex((s) => s.id === w); window.__tw.startGame(i); const g = window.__tw.game; for (let y = 22 - 6; y < 22; y++) for (let x = 0; x < 10; x++) g.board[y][x] = (x === (y * 3) % 10) ? 0 : 1 + Math.floor(Math.random() * 7); }, id);
  await pg.waitForTimeout(3200); // title card
  const t0 = Date.now(), at = async (s, fn, arg) => { const w = s * 1000 - (Date.now() - t0); if (w > 0) await pg.waitForTimeout(w); await pg.evaluate(fn, arg); };
  await at(0.2, () => { const S = window.__sushi; if (S) { S.leave('L1'); } });
  await at(2.0, () => window.__tw.event('clear', { n: 4 }));
  await at(4.5, () => { const S = window.__sushi; if (S) S.force('taisho', 'taisho.torch', [2.5, 3]); });
  await at(7.0, () => window.__tw.event('clear', { n: 1 }));
  let k = 0; for (const s of [1, 3, 5.5, 8, 10.5]) { await at(s, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + `-f${k++}.png` }); }
  await pg.waitForTimeout(Math.max(0, +secs * 1000 - (Date.now() - t0)));
  const v = pg.video(); await ctx.close(); const p = await v.path(); fs.copyFileSync(p, out);
  console.log('video', out, fs.statSync(out).size, 'errs', JSON.stringify(errs));
  await b.close();
})();
