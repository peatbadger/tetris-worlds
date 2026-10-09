// node tools/soak.js [secPerWorld=4] — start every world, fast-forward its scene (GeoKit timeScale) through hours and weather,
// and list any exception caught by the guarded frame loop (window.__frameErrs) or thrown to the page. Exit 1 if any.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'); const sec = +(process.argv[2] || 4);
(async () => {
  const b = await chromium.launch({ timeout: 120000, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); let bad = 0;
  try {
    const pg = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
    await pg.goto('file://' + path.resolve(__dirname, '../index.html'), { timeout: 240000 }); pg.setDefaultTimeout(60000); await pg.waitForTimeout(800);
    const ids = await pg.evaluate(() => STAGES.map((s) => s.id));
    for (const id of ids) {
      errs.length = 0;
      await pg.evaluate((id) => { window.__frameErrs = []; window.__tw.startGame(STAGES.findIndex((s) => s.id === id)); }, id);
      for (const [h, w] of [[9, 'rain'], [18, 'snow'], [22, 'clear']]) { await pg.evaluate(([h, w, id]) => { if (window.__geo && window.__geo.id === id) { window.__geo.setHour(null); window.__geo.lapse(0.5, h); window.__geo.timeScale(12); } try { Amb.force(id, w); } catch (e) {} }, [h, w, id]); await pg.waitForTimeout(sec * 333); }
      const fe = await pg.evaluate(() => window.__frameErrs || []);
      const all = [...new Set([...fe, ...errs])]; if (all.length) bad++;
      console.log((all.length ? 'ERR  ' : 'ok   ') + id + (all.length ? '  ' + all.slice(0, 3).join(' | ') : ''));
    }
  } finally { await b.close(); }
  console.log(bad ? `SOAK: ${bad} world(s) with errors` : 'SOAK: clean'); process.exit(bad ? 1 : 0);
})();
