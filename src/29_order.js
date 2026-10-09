/* ================= World order: merge world-file defs, then sort into the journey order =================
   Worlds whose scene factory is missing are dropped so the game can never reach an unbuilt world. */
(() => {
  const ORDER_IDS = ['sushi', 'mikes', 'speakeasy', 'dimsum', 'cinema', 'gelato', 'fishhouse', 'pizzeria', 'fastfood',
    'nightmarket', 'boba', 'yakitori', 'curry', 'lawson', 'teahouse', 'oden', 'hotpot', 'ramen', 'kbbq', 'patisserie', 'laneway', 'floating', 'bazaar', 'chocolate', 'taqueria', 'saintpeter', 'karaoke'];
  const TAIL = ['ocean', 'desert', 'neon', 'aurora', 'cosmic', 'tiki', 'oasis', 'candybar', 'lodge', 'galley']; // originals untouched, then their geometric remakes
  WORLD_DEFS.forEach((d) => { const i = STAGES.findIndex((s) => s.id === d.id); if (i >= 0) STAGES[i] = Object.assign(STAGES[i], d); else STAGES.push(d); });
  const rank = (id) => { const i = ORDER_IDS.indexOf(id); if (i >= 0) return i; const j = TAIL.indexOf(id); return j >= 0 ? 1000 + j : 500; };
  const kept = STAGES.filter((s) => STAGE_FACTORIES[s.id]).sort((a, b) => rank(a.id) - rank(b.id));
  STAGES.length = 0; kept.forEach((s) => STAGES.push(s));
})();
