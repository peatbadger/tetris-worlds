// Preloaded by tools/cap.sh (node -r). Tags every browser this script launches with a run-unique marker switch
// (--cap-tag=<CAP_TAG>, ignored by Chrome) so cap.sh can clean up ONLY its own browser, never another agent's.
const tag = process.env.CAP_TAG;
if (tag) {
  const pw = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core');
  for (const bt of [pw.chromium, pw.firefox, pw.webkit]) {
    if (!bt) continue;
    for (const fn of ['launch', 'launchPersistentContext']) {
      const orig = bt[fn]; if (typeof orig !== 'function') continue;
      bt[fn] = function (...a) { const i = fn === 'launch' ? 0 : 1; a[i] = Object.assign({}, a[i] || {}); a[i].args = [...(a[i].args || []), '--cap-tag=' + tag]; return orig.apply(this, a); };
    }
  }
}
