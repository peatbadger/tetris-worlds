// node tools/people.js out.png [scale]  -> lineup of people at large scale for renderer QA
const { chromium } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
const path = require('path');
const [out = '/tmp/people.png', S = '3.2', SP = '225', ONLY = '-1'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const pg = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join('|')));
  await pg.goto('file://' + path.resolve(__dirname, '../index.html')); await pg.waitForTimeout(1200);
  await pg.evaluate(([S, SP, ONLY]) => {
    const cv = document.createElement('canvas'); cv.width = 1600; cv.height = 1000; cv.style.cssText = 'position:fixed;left:0;top:0;z-index:99999'; document.body.appendChild(cv);
    const ctx = cv.getContext('2d'); ctx.fillStyle = '#d8d0c4'; ctx.fillRect(0, 0, 1600, 1000); ctx.fillStyle = '#b8ac9c'; ctx.fillRect(0, 940, 1600, 400);
    const looks = [
      { skin: 'light', hair: 'black', hairStyle: 'side', top: { type: 'suit', col: '#2a2e3a', tie: '#7a1a22' }, sleeves: 'long', pants: '#2a2e3a', shoe: '#1a120c' },
      { female: true, lashes: true, skin: 'pale', hair: 'dbrown', hairStyle: 'wavyLong', lips: '#c0505a', top: { type: 'blouse', col: '#e8c8d0' }, pants: '#3a3a4a', acc: { earrings: '#e8c050' } },
      { skin: 'brown', hair: 'black', hairStyle: 'curly', top: { type: 'hoodie', col: '#4a7a5a' }, pants: '#3a4a6a', acc: { beard: true } },
      { female: true, lashes: true, skin: 'tan', hair: 'black', hairStyle: 'pony', top: { type: 'apron', col: '#7ad8c0', col2: '#ffffff' }, sleeves: 'short', pants: '#2a2a3a', acc: { hat: 'cap', hatCol: '#ff7ab0' } },
      { skin: 'light', hair: 'grey', hairStyle: 'bald', age: 'old', top: { type: 'kappogi', col: '#f4f0e6' }, acc: { hat: 'hachimaki', mustache: true }, pants: '#2a2a2a' },
      { female: true, lashes: true, skin: 'dark', hair: 'black', hairStyle: 'bun', top: { type: 'dress', col: '#c83a4a', skirt: { col: '#c83a4a', len: 100 } }, bareLegs: true, lips: '#a02030' },
      { skin: 'olive', hair: 'brown', hairStyle: 'short', top: { type: 'tee', col: '#e8e0d0' }, sleeves: 'short', pants: '#4a5a7a', acc: { glasses: '#2a2a2a' } },
    ];
    const FLOOR = 940; const s = +S, A = (side, x, y, o = {}) => Object.assign({ side, x, y, grip: 'fist' }, o);
    looks.forEach((L, i) => { if (ONLY >= 0 && i < ONLY) return; if (ONLY >= 0) i -= ONLY;
      L.seed = 100 + i; const P = People.make(L, s, 1); const FL = FLOOR; const x = SP * i + 110, y = s >= 8 ? 330 : FL - 122 * s * P.scale;
      const sw = P.shape.sw; const arms = i % 3 === 0 ? [A(-1, -sw - 0.5, 48.5), A(1, sw + 0.5, 48.5)] : i % 3 === 1 ? [A(-1, -6, 22, { item: Items.cup }), A(1, 16, 44, { grip: 'open' })] : [A(-1, -14, 44), A(1, 26, -10, { grip: 'open', handAng: -1.3 })];
      People.draw(ctx, P, x, y, { legs: i === 2 ? People.walkLegs(0.8) : People.STAND, arms, face: { mouth: i % 2 ? 'smile' : 'talk', open: 0.3, blink: 0 }, head: { turn: i === 3 ? 0.4 : 0 } });
    });
  }, [S, +SP, +ONLY]);
  await pg.screenshot({ path: out }); console.log('errs', JSON.stringify(errs)); await b.close();
})();
