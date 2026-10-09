// node tools/gutter.js <world> [secs=40] — per viewport: scene-x of the HUD zone edges, and any actor that is PARTLY behind a HUD edge (gutter offender)
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [world = 'mikes', secs = '40'] = process.argv.slice(2);
const VPS = [[1024, 594], [1280, 800], [1366, 768], [1440, 900], [1920, 1080]];
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const out = {};
  for (const [w, h] of VPS) {
    const pg = await b.newPage({ viewport: { width: w, height: h } }); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
    await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(900);
    await pg.evaluate((wd) => { window.__tw.startGame(STAGES.findIndex((s) => s.id === wd)); }, world); await pg.waitForTimeout(2200);
    const zone = await pg.evaluate(() => { const G = window.__geo; if (!G || !G.view) return null; const v = G.view; const r = (id) => document.getElementById(id).getBoundingClientRect(); const L = r('pl').left - 10, R = r('pr').right + 10; const cv = document.querySelector('#bg-wrap canvas') || document.querySelector('canvas'); const cr = cv.getBoundingClientRect(); const toS = (px) => (px - cr.left - v.ox) / v.k + v.cam; return { z0: Math.round(toS(L)), z1: Math.round(toS(R)), s0: Math.round(toS(cr.left)), s1: Math.round(toS(cr.right)) }; });
    await pg.evaluate(() => window.__geo.timeScale(4));
    const bad = {};
    for (let i = 0; i < +secs / 4 * 4; i++) {
      await pg.waitForTimeout(250);
      const r = await pg.evaluate((z) => window.__geo.K.actors.filter((a) => (a.alpha ?? 1) > 0.3).map((a) => { const hw = a.def.T * a.sc * 0.24; return { n: a.role || a.type, x0: a.hx - hw, x1: a.hx + hw }; }), zone);
      for (const a of r) { const part = (a.x0 < zone.z0 && a.x1 > zone.z0) || (a.x0 < zone.z1 && a.x1 > zone.z1); if (part) { const k = a.n + '@' + Math.round((a.x0 + a.x1) / 2); bad[a.n] = bad[a.n] || new Set(); bad[a.n].add(Math.round((a.x0 + a.x1) / 2 / 10) * 10); } }
    }
    out[w + 'x' + h] = { zone, gutter: Object.fromEntries(Object.entries(bad).map(([k, v]) => [k, [...v].sort((p, q) => p - q).slice(0, 8).join(',')])), errs: errs.length };
    await pg.close();
  }
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();
