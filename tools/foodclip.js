// node tools/foodclip.js out.webm [w=1280] [h=720]  -> short clip of food landing / rotate shake / line-clear wobble in the sushi world
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'), fs = require('fs');
const [out = 'food-clip.webm', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const dir = '/tmp/fc_' + Date.now(); fs.mkdirSync(dir);
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, recordVideo: { dir, size: { width: +w, height: +h } } });
  const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1500);
  await pg.evaluate(() => { const i = STAGES.findIndex((s) => s.id === 'sushi'); window.__tw.startGame(i); });
  await pg.waitForTimeout(3300);
  const setup = await pg.evaluate(() => {
    const g = window.__tw.game; g.gravityMs = () => 1e9; // freeze gravity; we drive the pieces
    // tile rows 17..21, cols 0..8 with a varied mix of tetrominoes (backtracking), leaving column 9 open for the I
    const R0 = 17, want = (x, y) => y >= R0 && y < 22 && x < 9; const occ = new Set(); const plan = [];
    const order = ['T', 'S', 'Z', 'L', 'J', 'O', 'I'];
    function first() { for (let y = R0; y < 22; y++) for (let x = 0; x < 9; x++) if (!occ.has(x + ',' + y)) return [x, y]; return null; }
    function solve(depth) {
      const f = first(); if (!f) return true; if (depth > 20) return false;
      const types = order.slice(depth % 7).concat(order.slice(0, depth % 7));
      for (const t of types) for (let r = 0; r < 4; r++) {
        const cells = CELLS[t][r]; const top = cells.slice().sort((a, b) => a[1] - b[1] || a[0] - b[0])[0];
        const ox = f[0] - top[0], oy = f[1] - top[1]; const abs = cells.map(([cx, cy]) => [cx + ox, cy + oy]);
        if (!abs.every(([x, y]) => want(x, y) && !occ.has(x + ',' + y))) continue;
        abs.forEach(([x, y]) => occ.add(x + ',' + y)); plan.push([t, r, ox, oy]);
        if (solve(depth + 1)) return true;
        abs.forEach(([x, y]) => occ.delete(x + ',' + y)); plan.pop();
      }
      return false;
    }
    const ok = solve(0);
    for (const [type, rot, x, y] of plan) { g.piece = { type, rot, x, y }; g.lock(); }
    g.spawn('Z');
    return { ok, n: plan.length, types: plan.map((p) => p[0]).join('') };
  });
  const t0 = Date.now(), at = async (s, fn, arg) => { const ww = s * 1000 - (Date.now() - t0); if (ww > 0) await pg.waitForTimeout(ww); return pg.evaluate(fn, arg); };
  await at(0.3, () => { const g = window.__tw.game; g.piece = { type: 'Z', rot: 0, x: 1, y: 2 }; });
  await at(1.0, () => window.__tw.game.rotate(1));
  await at(1.6, () => window.__tw.game.rotate(1));
  await at(2.2, () => window.__tw.game.hardDrop()); // lands on the stack: squash & stretch
  await at(3.4, () => { const g = window.__tw.game; g.piece = { type: 'O', rot: 0, x: 5, y: 2 }; });
  await at(4.0, () => window.__tw.game.hardDrop()); // tamago bounce
  await at(5.2, () => { const g = window.__tw.game; g.piece = { type: 'I', rot: 1, x: 7, y: 0 }; });
  await at(5.8, () => window.__tw.game.hardDrop()); // column 9 -> clears 4 rows (ikura scatters, nigiri slide off, maki roll, tamago pops)
  await at(6.05, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-clear.png' });
  await at(9.5, () => 0); await pg.screenshot({ path: out.replace(/\.webm$/, '') + '-after.png' });
  await at(10.5, () => 0);
  const box = await pg.evaluate(() => { const r = document.getElementById('matrix').getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map(Math.round); });
  const v = pg.video(); await ctx.close(); fs.copyFileSync(await v.path(), out); console.log('board', JSON.stringify(box));
  console.log(JSON.stringify(setup), 'video', out, 'errs', JSON.stringify(errs));
  await b.close();
})();
