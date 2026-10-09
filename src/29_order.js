/* ================= World order: merge world-file defs, then sort into the journey order =================
   Worlds whose scene factory is missing are dropped so the game can never reach an unbuilt world. */
(() => {
  const ORDER_IDS = ['sushi', 'mikes', 'speakeasy', 'dimsum', 'gelato', 'fishhouse', 'pizzeria', 'fastfood', 'nightmarket', 'boba', // 1-10
    'ocean', 'desert', 'neon', 'aurora', 'cosmic', // 11-15: the untouched originals, always here
    'tiki', 'oasis', 'candybar', 'lodge', 'galley', // 16-20: their geometric remakes
    'cinema', 'yakitori', 'curry', 'konbini', 'teahouse', 'oden', 'hotpot', // 21+: new worlds, in build order
    'ramen', 'kbbq', 'patisserie', 'laneway', 'floating', 'bazaar', 'chocolate', 'taqueria', 'saintpeter', 'karaoke'];
  WORLD_DEFS.forEach((d) => { const i = STAGES.findIndex((s) => s.id === d.id); if (i >= 0) STAGES[i] = Object.assign(STAGES[i], d); else STAGES.push(d); });
  const rank = (id) => { const i = ORDER_IDS.indexOf(id); return i >= 0 ? i : 500; };
  const kept = STAGES.filter((s) => STAGE_FACTORIES[s.id]).sort((a, b) => rank(a.id) - rank(b.id));
  STAGES.length = 0; kept.forEach((s) => STAGES.push(s));
})();
