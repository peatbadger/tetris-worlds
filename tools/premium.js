// node tools/premium.js [world=sushi] [out=/workspace/shots/premium-<world>-before-after.png]
// Same hand-built stack rendered with FoodMass premium OFF (before) and ON (after): bottom 8 rows at 4x, and the whole well at iPhone size.
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path'); const { execFileSync } = require('child_process');
const [world = 'sushi', outArg] = process.argv.slice(2); const out = outArg || `/workspace/shots/premium-${world === 'sushi' ? 'kaiten' : world}-before-after.png`;
async function grab(b, prem, file, phone) {
  const opt = phone ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 4 };
  const pg = await b.newPage(opt); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.addInitScript((p) => { window.__fmPremium = p; }, prem);
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1200);
  await pg.evaluate((id) => window.__tw.startGame(STAGES.findIndex((s) => s.id === id)), world); await pg.waitForTimeout(3000);
  await pg.evaluate(() => {
    const g = window.__tw.game; g.gravityMs = () => 1e9; if (window.__sushiGeo) window.__sushiGeo.setHour(12.5);
    const plan = [['I', 0, 0], ['O', 0, 4], ['S', 0, 5], ['L', 0, 0], ['J', 0, 6], ['Z', 0, 2], ['T', 2, 0], ['O', 0, 7], ['I', 1, 4], ['S', 1, 7], ['T', 0, 3], ['Z', 1, 0], ['L', 2, 5], ['J', 1, 7], ['I', 0, 2], ['T', 3, -1]];
    g.board = g.board.map((r) => r.map(() => 0)); if (g.meta) g.meta = g.meta.map((r) => r.map(() => null)); g.clearRows = []; g.state = 'playing';
    for (const [type, rot, x] of plan) { g.piece = { type, rot, x, y: 0 }; if (g.collide(g.piece)) continue; g.hardDrop(); if (g.state === 'clearing') g.update(1000); if (g.state !== 'playing') break; }
    g.piece = { type: 'T', rot: 0, x: 3, y: 3 };
  });
  await pg.waitForTimeout(2500);
  const r = await pg.evaluate(() => { const r = document.getElementById('matrix').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const cw = r.w / 10, rows = phone ? 20 : 8;
  await pg.screenshot({ path: file, clip: phone ? { x: r.x, y: r.y, width: r.w, height: r.h } : { x: r.x, y: r.y + r.h - cw * rows, width: r.w, height: cw * rows } });
  await pg.close(); return errs;
}
(async () => {
  const b = await chromium.launch({ timeout: 120000, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const E = [];
  try { E.push(await grab(b, false, '/workspace/tmp_prem/pr_a.png', 0)); E.push(await grab(b, true, '/workspace/tmp_prem/pr_b.png', 0)); E.push(await grab(b, false, '/workspace/tmp_prem/pr_c.png', 1)); E.push(await grab(b, true, '/workspace/tmp_prem/pr_d.png', 1)); } finally { await b.close().catch(() => {}); }
  execFileSync('python3', ['-c', `
from PIL import Image, ImageDraw
A=[Image.open('/workspace/tmp_prem/pr_%s.png'%k).convert('RGB') for k in 'abcd']
a,b,c,d=A; W=a.width+b.width+30; ph=c.height; sc=min(1.0,(a.height*1.0)/ph) if False else 1.0
im=Image.new('RGB',(max(W,c.width*2+30+400),60+a.height+80+ph),(20,20,24)); dr=ImageDraw.Draw(im)
im.paste(a,(0,60)); im.paste(b,(a.width+30,60)); dr.text((10,20),'BEFORE (4x)',fill=(255,255,255)); dr.text((a.width+40,20),'AFTER premium:true (4x)',fill=(255,255,255))
y=60+a.height+60; im.paste(c,(0,y)); im.paste(d,(c.width+30,y)); dr.text((10,y-30),'BEFORE (iPhone 390pt, 3x)',fill=(255,255,255)); dr.text((c.width+40,y-30),'AFTER (iPhone 390pt, 3x)',fill=(255,255,255))
im=im.crop((0,0,max(W,c.width*2+30),im.height)); im.save('${out}'); im.resize((im.width//3,im.height//3)).save('${out}'.replace('.png','-small.png'))
a.save('/workspace/shots/premium-kaiten-before-4x.png'); b.save('/workspace/shots/premium-kaiten-after-4x.png'); c.save('/workspace/shots/premium-kaiten-before-iphone.png'); d.save('/workspace/shots/premium-kaiten-after-iphone.png')
`]);
  console.log('ok', out, JSON.stringify(E));
})().catch((e) => { console.error(e); process.exitCode = 1; });
