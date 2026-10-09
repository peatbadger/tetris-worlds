/* ================= Kaiten Sushi · GEOMETRIC edition — palettes & day clock =================
   Every colour in the geometric sushi world is a named slot. Five reference palettes (pastel morning,
   warm lunch, retro dusk, neon night, Japanese snow) are blended smoothly as the in-game clock runs:
   lunch -> dusk -> night -> (late) -> pastel morning. Snow days lean on the indigo/vermilion/matcha set. */
const SushiPal = (() => {
  const P = {
    lunch: {
      wall: '#cf904d', wallB: '#e3c093', wallC: '#ab713a', ceil: '#ead0a8', panel: '#83613c', arch: '#d29a5a', door: '#6e4424', noren: '#2a4553',
      floor: '#dba467', floorB: '#c08648', steel: '#bba98e', steelHi: '#ecdfc8', steelDk: '#8c7659', chain: '#a08a6a', barTop: '#d2a46a', barFace: '#a87c4c', cab: '#8c6239',
      wood: '#9e6535', woodDk: '#5a3820', lant1: '#fbeccb', lant2: '#fbf2d6', lant3: '#fae6c0', cord: '#3a2a1a', sky0: '#a9d0e4', sky1: '#e6eee8', city: '#a7aeb3', city2: '#c9c6bb',
      cityLit: '#efe4c4', frame: '#5b4c38', plant: '#5f6c30', plant2: '#7c8a3c', pot: '#453b2a', shaft: '#fff3dc', shaftA: 0.2, glow: '#ffe6b0', glowA: 0.22, amb: '#000000', ambK: 0,
      skin: '#f3ad66', bubble: '#fff7ea', ink: '#3a2a1c', tag: '#e9cfa2',
      navy: '#2a4553', coral: '#d4593a', mustard: '#c8862a', teal: '#3a7472', cream: '#f0dcba', olive: '#6b6a2e', plum: '#8a4a5a', grey: '#bfa88e', brown: '#7a4a28', white: '#fbe8c8', dark: '#30281d', hairGrey: '#c9b8a2',
    },
    morning: {
      wall: '#edc59c', wallB: '#f6dcc2', wallC: '#ddb08e', ceil: '#f3c0b4', panel: '#c9b2c8', arch: '#f8d8b4', door: '#d4a4a6', noren: '#a9bfb0',
      floor: '#f8d6b2', floorB: '#ebbc9a', steel: '#ebc8b6', steelHi: '#fdeee6', steelDk: '#d6aa9c', chain: '#ddb8a8', barTop: '#f2cca6', barFace: '#e2b496', cab: '#d6aa90',
      wood: '#ecb88a', woodDk: '#b88a6a', lant1: '#f9cfd2', lant2: '#fbefca', lant3: '#f6c6d0', cord: '#a07a6a', sky0: '#f4dde2', sky1: '#fdeedc', city: '#e7c3cf', city2: '#d3b6cf',
      cityLit: '#fff2dc', frame: '#e2b896', plant: '#9eaa86', plant2: '#b8c4a0', pot: '#94aa98', shaft: '#fff8f0', shaftA: 0.26, glow: '#ffe2e2', glowA: 0.16, amb: '#c890a0', ambK: 0.03,
      skin: '#fcca9a', bubble: '#fffaf4', ink: '#8a6656', tag: '#f6dcc4',
      navy: '#a9bfb0', coral: '#ebbcc4', mustard: '#f8cc8c', teal: '#b4cdbf', cream: '#f8e2cf', olive: '#b5bc94', plum: '#d4b6d0', grey: '#e6d6c8', brown: '#c49a80', white: '#fff0e2', dark: '#8e705c', hairGrey: '#efe4da',
    },
    dusk: {
      wall: '#d2891c', wallB: '#ecbf62', wallC: '#8c5a26', ceil: '#215b5c', panel: '#1c5254', arch: '#c46c1e', door: '#3a2410', noren: '#c4451e',
      floor: '#c47424', floorB: '#94501a', steel: '#9c8c6a', steelHi: '#dcc79c', steelDk: '#6a5c3c', chain: '#7e6c4a', barTop: '#a46e30', barFace: '#6b5c3b', cab: '#2c2e26',
      wood: '#6a401c', woodDk: '#3a2210', lant1: '#df5c2a', lant2: '#f4b748', lant3: '#3f7a70', cord: '#1a1a14', sky0: '#1d585c', sky1: '#2f6c66', city: '#4f5638', city2: '#36463a',
      cityLit: '#f2c25e', frame: '#1e302b', plant: '#415432', plant2: '#5a6c3a', pot: '#2c2f28', shaft: '#ffd690', shaftA: 0.12, glow: '#ffb050', glowA: 0.28, amb: '#3a2010', ambK: 0.1,
      skin: '#ea9e3e', bubble: '#fbefd6', ink: '#22221a', tag: '#e8b870',
      navy: '#1e5556', coral: '#c4451e', mustard: '#d08918', teal: '#2a6464', cream: '#e8b870', olive: '#4e5a30', plum: '#7a3a3a', grey: '#cfa060', brown: '#6a401c', white: '#efc47e', dark: '#22221a', hairGrey: '#d8b886',
    },
    night: {
      wall: '#2b1338', wallB: '#3d1c44', wallC: '#170b28', ceil: '#060b2c', panel: '#0b0f36', arch: '#27143c', door: '#0a0618', noren: '#5a1838',
      floor: '#2c1034', floorB: '#1a0a22', steel: '#2e1d40', steelHi: '#8e4e70', steelDk: '#160d26', chain: '#211633', barTop: '#58243a', barFace: '#24132e', cab: '#0e0b1e',
      wood: '#211024', woodDk: '#0a071a', lant1: '#f25439', lant2: '#f8a45a', lant3: '#ef4c40', cord: '#0a0614', sky0: '#050f3c', sky1: '#1c2672', city: '#2b1f52', city2: '#0c144c',
      cityLit: '#ff9c4c', frame: '#060a28', plant: '#0c1224', plant2: '#141c34', pot: '#05081c', shaft: '#ff6a8a', shaftA: 0.04, glow: '#ff7444', glowA: 0.4, amb: '#1a0a40', ambK: 0.46,
      skin: '#a24238', bubble: '#f6e2e8', ink: '#24102c', tag: '#6a2a48',
      navy: '#0b1438', coral: '#5c1a3a', mustard: '#4c2432', teal: '#0d1c4a', cream: '#6c2c4a', olive: '#1c1c32', plum: '#3c1648', grey: '#3c2a52', brown: '#2c1626', white: '#a04c6a', dark: '#05071c', hairGrey: '#4e3a62',
    },
    snow: {
      wall: '#ecd3ae', wallB: '#f5e3c6', wallC: '#cfb088', ceil: '#d6b68c', panel: '#172a3d', arch: '#f0d7b2', door: '#262624', noren: '#9e3a1e',
      floor: '#b29270', floorB: '#8c7050', steel: '#706048', steelHi: '#ab9a7a', steelDk: '#3a3630', chain: '#554d40', barTop: '#64533c', barFace: '#2d2d28', cab: '#1b1d1d',
      wood: '#352b21', woodDk: '#1a1410', lant1: '#e86834', lant2: '#93a05a', lant3: '#e86834', cord: '#1a1a18', sky0: '#172c42', sky1: '#24405a', city: '#7e6440', city2: '#4a4030',
      cityLit: '#f2ba62', frame: '#1b1d1c', plant: '#344029', plant2: '#4a5a36', pot: '#16191a', shaft: '#fff6e6', shaftA: 0.1, glow: '#ffb070', glowA: 0.26, amb: '#102030', ambK: 0.08,
      skin: '#d8964f', bubble: '#fbf3e4', ink: '#121413', tag: '#e8d2ae',
      navy: '#172a3b', coral: '#a03a1e', mustard: '#c4923e', teal: '#1e3a48', cream: '#e8d2ae', olive: '#3e4a30', plum: '#5a2a30', grey: '#857868', brown: '#4a3420', white: '#f0d0a4', dark: '#121413', hairGrey: '#9a9286',
    },
  };
  const SLOTS = Object.keys(P.lunch);
  const RGB = {}; // pre-parsed
  for (const k in P) { RGB[k] = {}; for (const s of SLOTS) { const v = P[k][s]; RGB[k][s] = typeof v === 'number' ? v : hexToRgb(v); } }
  // clock keyframes (hours; >24 = after midnight). The sushi world starts at 12:00 lunch.
  const KEYS = [[8, 'morning'], [11.5, 'lunch'], [15, 'lunch'], [18, 'dusk'], [21, 'night'], [26.5, 'night'], [32, 'morning']];
  const LABEL = (h) => { h = ((h % 24) + 24) % 24; return h < 6 ? 'Late night' : h < 11 ? 'Morning' : h < 14.5 ? 'Lunch rush' : h < 17 ? 'Afternoon' : h < 20 ? 'Dusk' : 'Night'; };
  const cur = {}; let lastKey = '';
  function blendInto(out, a, b, k) { for (const s of SLOTS) { const A = RGB[a][s], B = RGB[b][s]; if (typeof A === 'number') out[s] = A + (B - A) * k; else out[s] = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k]; } }
  const tmp = {}, tmpS = {};
  /* compute palette for hour h and weather; returns slot -> css hex (and numbers) */
  function at(h, weather) {
    let hh = h; while (hh < 8) hh += 24; while (hh >= 32) hh -= 24;
    let i = 0; while (i < KEYS.length - 2 && hh >= KEYS[i + 1][0]) i++;
    const [h0, a] = KEYS[i], [h1, b] = KEYS[i + 1], k = smooth(clamp((hh - h0) / (h1 - h0), 0, 1));
    blendInto(tmp, a, b, k);
    const night = (a === 'night' ? 1 - (b === 'night' ? 0 : k) : 0) + (b === 'night' && a !== 'night' ? k : 0); // 0..1 darkness
    if (weather === 'snow') { // indigo / vermilion / matcha interior; sky keeps the time of day but cooler
      for (const s of SLOTS) { const A = tmp[s], B = RGB.snow[s]; const w = /^(sky|city)/.test(s) ? 0.45 : 0.82; if (typeof A === 'number') tmp[s] = A + (B - A) * w; else tmp[s] = [A[0] + (B[0] - A[0]) * w, A[1] + (B[1] - A[1]) * w, A[2] + (B[2] - A[2]) * w]; }
      const dk = 0.55 * night; if (dk > 0) for (const s of SLOTS) { if (typeof tmp[s] === 'number' || /^(lant|cityLit|glow|bubble)/.test(s)) continue; const A = tmp[s], N = RGB.night[s]; tmp[s] = [A[0] + (N[0] - A[0]) * dk * 0.6, A[1] + (N[1] - A[1]) * dk * 0.6, A[2] + (N[2] - A[2]) * dk * 0.6]; }
      tmp.ambK = Math.max(tmp.ambK, 0.08 + 0.3 * night);
    } else if (weather === 'rain' || weather === 'storm') { // a touch cooler & dimmer
      for (const s of ['sky0', 'sky1', 'city', 'city2']) { const A = tmp[s]; tmp[s] = [A[0] * 0.78 + 20, A[1] * 0.8 + 24, A[2] * 0.86 + 34]; }
      tmp.shaftA *= 0.45;
    }
    for (const s of SLOTS) { const v = tmp[s]; cur[s] = typeof v === 'number' ? v : toHex(v[0], v[1], v[2]); }
    cur.night = night; cur.hour = h; cur.label = LABEL(h);
    cur.key = Math.round(hh * 2) + ':' + weather; // coarse key (every 30 game-minutes) for cached tiles
    return cur;
  }
  /* lit(): true-colour things (food, plates, skin accents) pulled toward the ambient colour at night */
  const litCache = new Map(); let litStamp = '';
  function lit(hex) {
    const st = cur.amb + cur.ambK.toFixed(3); if (st !== litStamp) { litCache.clear(); litStamp = st; }
    let v = litCache.get(hex); if (!v) { v = cur.ambK > 0.001 ? mix(hex, cur.amb, cur.ambK) : hex; litCache.set(hex, v); } return v;
  }
  let hourNow = 12, weatherNow = 'clear';
  function hourFromP(p) { return 12 + clamp(p, 0, 1) * 20; } // 12:00 lunch -> 08:00 next morning
  return { P, SLOTS, at, lit, cur, hourFromP, LABEL, get hour() { return hourNow; }, set hour(v) { hourNow = v; }, get weather() { return weatherNow; }, set weather(v) { weatherNow = v; } };
})();
