/* ================= Geometric REMAKES of the five original worlds (the originals stay untouched, these come after them) =================
   Each keeps the mood (and the musical DNA) of its original, re-imagined as a calm GeoKit venue with its own food set:
   Ocean Deep -> Tiki Beach Shack · Desert Sunset -> Oasis Tea Tent · Neon City -> Neon Candy Arcade
   · Aurora Forest -> Aurora Lodge · Cosmic Nebula -> Orbit Galley. Stage factories are registered by 28_21+ files (a remake without a factory is dropped by 29_order). */
(() => {
  const src = (id) => STAGES.find((s) => s.id === id) || {};
  const tune = (id, o) => Object.assign(JSON.parse(JSON.stringify(src(id).music || {})), o || {});
  const DEFS = [
    { id: 'tiki', from: 'ocean', name: 'Tiki Beach Shack', sub: 'Ocean remake · fruit bar on the sand', particle: 'bubble', accent: '#3fd0d8', accent2: '#ff8a5a',
      desc: 'A thatched fruit bar on the beach: a blender whirring smoothies, a hammock, surfboards, a sailboat on the horizon and a sea that turns to moonlight — slow dorian steel-pan.',
      music: tune('ocean', { bpm: 84 }) },
    { id: 'oasis', from: 'desert', name: 'Oasis Tea Tent', sub: 'Desert remake · mint tea under striped canvas', particle: 'sand', accent: '#e89a4a', accent2: '#3aa0a0',
      desc: 'A striped canvas tea tent at the oasis: tea poured from a height, brass lanterns, rugs, and dunes with a camel caravan outside — oud and darbuka in Hijaz.',
      music: tune('desert', { bpm: 90 }) },
    { id: 'candybar', from: 'neon', name: 'Neon Candy Arcade', sub: 'Neon remake · sweets counter by the arcade', particle: 'spark', accent: '#ff4ab0', accent2: '#3ae0ff',
      desc: 'A late-night candy counter in an arcade: a cotton-candy spinner, glowing claw machine, rainy neon street in the window — synthwave at midnight.',
      music: tune('neon', { bpm: 100 }) },
    { id: 'lodge', from: 'aurora', name: 'Aurora Lodge', sub: 'Aurora remake · Nordic fika by the fire', particle: 'snow', accent: '#5adca8', accent2: '#c08aff',
      desc: 'A pine lodge café: a fire in the stove, cinnamon buns from the oven, snowy forest in the window and the northern lights after dark — hushed celesta and strings.',
      music: tune('aurora', { bpm: 76 }) },
    { id: 'galley', from: 'cosmic', name: 'Orbit Galley', sub: 'Cosmic remake · snack bar on a space station', particle: 'star', accent: '#9a8aff', accent2: '#5ad8ff',
      desc: 'The galley of a space station: a porthole onto a ringed planet and drifting satellite, a rehydrator that hisses, crew in jumpsuits — slow drifting pads.',
      music: tune('cosmic', { bpm: 70 }) },
  ];
  for (const d of DEFS) {
    const o = src(d.from);
    WORLD_DEFS.push({ id: d.id, name: d.name, sub: d.sub, desc: d.desc, accent: d.accent, accent2: d.accent2, skin: d.id, particle: d.particle || o.particle,
      boardBg: 'rgba(24,22,30,0.88)', grid: 'rgba(255,255,255,0.06)', palette: ['#888888', '#888888', '#888888', '#888888', '#888888', '#888888', '#888888'], music: d.music, thumbY: 0.45 });
  }
})();
