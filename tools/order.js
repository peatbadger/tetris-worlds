// node tools/order.js — print the world journey order (index:id:name) and fail if the originals are not at 11–15.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
(async () => { const b = await chromium.launch({ timeout: 120000, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  try { const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(1500);
    const ids = await p.evaluate(() => STAGES.map((s) => [s.id, s.name]));
    ids.forEach(([id, n], i) => console.log(`${i + 1}: ${id} — ${n}`));
    const ok = ['ocean', 'desert', 'neon', 'aurora', 'cosmic'].every((id, k) => ids[10 + k] && ids[10 + k][0] === id);
    console.log(ok ? 'ORDER OK: originals at 11–15' : 'ORDER FAIL'); console.log('errs', errs); process.exitCode = ok && !errs.length ? 0 : 1;
  } finally { await b.close(); } })();
