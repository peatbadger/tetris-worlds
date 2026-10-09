/* ================= Painted art assets (assets/manifest.js -> window.ART_MANIFEST) =================
   Sprites are cut from AI-painted pose sheets by tools/art_build.py. Loaded at runtime (folder served by GitHub Pages). */
const Art = (() => {
  const M = (typeof window !== 'undefined' && window.ART_MANIFEST) || {};
  const imgs = {}, state = {};
  function load(world, onProgress) {
    const m = M[world]; if (!m) return Promise.resolve(false);
    if (state[world]) return state[world];
    const list = [['bg', m.bg.src]].concat(Object.entries(m.sprites).map(([k, s]) => [k, s.src]));
    let done = 0; imgs[world] = {};
    state[world] = Promise.all(list.map(([k, src]) => new Promise((res) => {
      const im = new Image(); im.decoding = 'async';
      im.onload = () => { imgs[world][k] = im; done++; onProgress && onProgress(done, list.length); res(true); };
      im.onerror = () => { console.warn('art missing', src); done++; onProgress && onProgress(done, list.length); res(false); };
      im.src = src;
    }))).then((r) => { ready[world] = r.every(Boolean) || !!imgs[world].bg; return ready[world]; });
    return state[world];
  }
  const ready = {};
  const has = (world) => !!M[world];
  const isReady = (world) => !!ready[world];
  const img = (world, k) => imgs[world] && imgs[world][k];
  const meta = (world, k) => M[world] && M[world].sprites[k];
  const scene = (world) => (M[world] && M[world].scene) || {};
  function loadAll(onProgress) {
    const ws = Object.keys(M); if (!ws.length) return Promise.resolve();
    const tot = {}, dn = {};
    return Promise.all(ws.map((w) => load(w, (d, t) => { dn[w] = d; tot[w] = t; const D = Object.values(dn).reduce((a, b) => a + b, 0), T = Object.values(tot).reduce((a, b) => a + b, 0); onProgress && onProgress(D, T); })));
  }
  return { load, loadAll, has, isReady, img, meta, scene, M };
})();
