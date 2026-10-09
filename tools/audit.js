// node tools/audit.js <world...> — cmp stack per world + board json into /workspace/shots/audit (for value/colour audit)
// node tools/cmp.js <world> [out=/workspace/shots/cmp-<world>.png] [hour=12.5]
// Same hand-built 16-piece stack in <world> and in Kaiten Sushi; crops the bottom 7 rows x 10 cols at 4x and puts them side by side.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'); const { execFileSync } = require('child_process');
const worlds = process.argv.slice(2); const hour = '12.5';
async function grab(b, id, file) {
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 4 }); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1200);
  await pg.evaluate((id) => window.__tw.startGame(STAGES.findIndex((s) => s.id === id)), id); await pg.waitForTimeout(3500);
  await pg.evaluate((hour) => {
    const g = window.__tw.game; if (window.__sushiGeo) window.__sushiGeo.setHour(+hour); if (window.__geo && window.__geo.setHour) window.__geo.setHour(+hour);
    const plan = [['I', 0, 0], ['O', 0, 4], ['S', 0, 5], ['L', 0, 0], ['J', 0, 6], ['Z', 0, 2], ['T', 2, 0], ['O', 0, 7], ['I', 1, 4], ['S', 1, 7], ['T', 0, 3], ['Z', 1, 0], ['L', 2, 5], ['J', 1, 7], ['I', 0, 2], ['T', 3, -1]];
    g.board = g.board.map((r) => r.map(() => 0)); if (g.meta) g.meta = g.meta.map((r) => r.map(() => null)); g.clearRows = []; g.linesInStage = 0; g.state = 'playing'; const log = []; for (const [type, rot, x] of plan) { g.piece = { type, rot, x, y: 0 }; if (g.collide(g.piece)) { log.push(type + '!'); continue; } g.hardDrop(); log.push(type + g.state[0]); if (g.state === 'clearing') g.update(1000); if (g.state !== 'playing') break; } window.__cmplog = log.join(' ');
    g.piece = { type: 'T', rot: 0, x: 3, y: 3 }; return g.board.flat().filter((v) => v).length + ' ' + window.__cmplog + ' ' + g.state;
  }, hour).then((n) => errs.push('filled ' + n));
  await pg.waitForTimeout(2500);
  errs.push('after ' + await pg.evaluate(() => window.__tw.game.state + ' ' + window.__tw.game.board.flat().filter((v) => v).length + ' stage ' + window.__tw.stageIdx));
  const r = await pg.evaluate(() => { const r = document.getElementById('matrix').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const cw = r.w / 10, rows = 8; // bottom 8 rows, full width
  await pg.screenshot({ path: file, clip: { x: r.x, y: r.y + r.h - cw * rows, width: r.w, height: cw * rows } });
  const bd = await pg.evaluate(() => window.__tw.game.board.slice(-8)); require('fs').writeFileSync(file.replace('.png', '.json'), JSON.stringify(bd));
  await pg.close(); return errs;
}
(async () => {
  const b = await chromium.launch({ timeout: 120000, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  try { for (const w of worlds) { await grab(b, w, `/workspace/shots/audit/${w}.png`); console.log('grabbed', w); } } finally { await b.close().catch(() => {}); }
})().catch((e) => { console.error(e); process.exitCode = 1; });
