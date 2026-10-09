#!/usr/bin/env python3
"""Art pipeline: art/<world>/*-green.jpg pose / food sheets  ->  assets/<world>/*.webp sprites + assets/manifest.js
 - chroma key with soft edges (distance from the sampled screen green), colour un-mixing + green-spill suppression
 - auto split: XY-cut on empty rows/columns; optional hand cuts (refined to the emptiest column nearby) or boxes
 - per sprite: tight crop, anchor = centre of the flat waist cut line (so poses of one character cross-fade aligned)
 usage: python3 tools/art_build.py [world ...]   (default: every folder in art/ that has sheets.json)"""
import json, os, sys, glob
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def key_sheet(path):
    im = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    # sample the screen colour from the border
    border = np.concatenate([im[:8].reshape(-1, 3), im[-8:].reshape(-1, 3), im[:, :8].reshape(-1, 3), im[:, -8:].reshape(-1, 3)])
    gs = border[(border[:, 1] - np.maximum(border[:, 0], border[:, 2])) > 60]
    scr = np.median(gs, axis=0) if len(gs) else np.array([20, 220, 20], np.float32)
    k = g - np.maximum(r, b)                      # greenness
    ks = scr[1] - max(scr[0], scr[2])
    lo, hi = 0.30 * ks, 0.72 * ks                 # < lo: solid subject, > hi: pure screen
    a = np.clip(1 - (k - lo) / (hi - lo), 0, 1)
    # gentle 3x3 alpha smoothing for soft edges (no scipy)
    p = np.pad(a, 1, mode='edge'); a2 = sum(p[1 + dy:p.shape[0] - 1 + dy, 1 + dx:p.shape[1] - 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1)) / 9
    a = np.where((a > 0.02) & (a < 0.98), a2, a)
    # un-mix the screen colour from semi transparent pixels: c = f*a + s*(1-a)
    am = np.maximum(a, 0.05)[..., None]
    f = (im - scr[None, None, :] * (1 - am)) / am
    f = np.where((a < 0.98)[..., None], f, im)
    # spill suppression: green may not exceed the mean of red & blue by more than a little (edges strongly, interior mildly)
    rb = (f[..., 0] + f[..., 2]) / 2
    lim = np.where(a < 0.98, np.maximum(f[..., 0], f[..., 2]), np.maximum(f[..., 0], f[..., 2]) + 18 + 0.35 * np.abs(f[..., 0] - f[..., 2]))
    f[..., 1] = np.minimum(f[..., 1], np.maximum(lim, rb))
    out = np.dstack([np.clip(f, 0, 255), a * 255]).astype(np.uint8)
    return out

def spans(occ, min_gap, thr=0):
    on = occ > thr; res = []; i = 0; n = len(on)
    while i < n:
        if on[i]:
            j = i
            while j < n and (on[j] or (not on[j] and j + min_gap < n and on[j:j + min_gap].any())): j += 1
            res.append((i, j)); i = j
        else: i += 1
    return res

def valleys(occ, n):
    """split [0,len) into n parts at the n-1 deepest valleys of the (smoothed) occupancy profile, inside the occupied extent"""
    L = len(occ); nz = np.where(occ > 0)[0]; lo, hi = (nz[0], nz[-1] + 1) if len(nz) else (0, L)
    if n <= 1: return [0, L]
    sm = np.convolve(occ.astype(np.float32), np.ones(9) / 9, 'same'); cuts = []; minsep = (hi - lo) / (n * 1.7)
    order = np.argsort(sm[lo:hi], kind='stable') + lo
    for c in order:
        if c - lo < minsep * 0.6 or hi - c < minsep * 0.6: continue
        if all(abs(c - d) >= minsep for d in cuts): cuts.append(int(c))
        if len(cuts) == n - 1: break
    return [0] + sorted(cuts) + [L]

def split(alpha, cfg):
    m = alpha > 128
    H, W = m.shape
    if 'boxes' in cfg: return [tuple(b) for b in cfg['boxes']]
    if 'cuts' in cfg:
        col = m.sum(0); xs = [0]
        for c in cfg['cuts']:
            lo, hi = max(1, c - 45), min(W - 1, c + 45); xs.append(lo + int(np.argmin(col[lo:hi])))
        xs.append(W); boxes = []
        for x0, x1 in zip(xs[:-1], xs[1:]):
            sub = m[:, x0:x1]; ys = np.where(sub.any(1))[0]; cx = np.where(sub.any(0))[0]
            boxes.append((x0 + cx[0], ys[0], x0 + cx[-1] + 1, ys[-1] + 1))
        return boxes
    if cfg.get('names'):                                      # known counts: cut at the deepest column valleys
        rows = cfg.get('rows', [len(cfg['names'])]); ys = valleys(m.sum(1), len(rows)); boxes = []
        for (y0, y1), n in zip(zip(ys[:-1], ys[1:]), rows):
            band = m[y0:y1]; xs = valleys(band.sum(0), n)
            for x0, x1 in zip(xs[:-1], xs[1:]):
                sub = band[:, x0:x1]; yy = np.where(sub.any(1))[0]; xx = np.where(sub.any(0))[0]
                boxes.append((x0 + xx[0], y0 + yy[0], x0 + xx[-1] + 1, y0 + yy[-1] + 1))
        return boxes
    boxes = []
    for y0, y1 in spans(m.sum(1), 12, 2):                      # rows of items
        band = m[y0:y1]
        for x0, x1 in spans(band.sum(0), 10, 1):              # items in the row
            sub = band[:, x0:x1]
            if sub.sum() < 1500: continue
            ys = np.where(sub.any(1))[0]
            boxes.append((x0, y0 + ys[0], x1, y0 + ys[-1] + 1))
    return boxes

def label(m):
    """4-connected component labels (pure numpy/python union-find on run-lengths)"""
    H, W = m.shape; lab = np.zeros((H, W), np.int32); parent = [0]
    def find(x):
        while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
        return x
    prev = []
    for y in range(H):
        row = m[y]; d = np.diff(np.concatenate([[0], row.astype(np.int8), [0]])); st = np.where(d == 1)[0]; en = np.where(d == -1)[0]; cur = []
        for a, b in zip(st, en):
            ids = [find(l) for (pa, pb, l) in prev if pa < b and pb > a]
            if ids: r = min(ids); [parent.__setitem__(i, r) for i in ids]
            else: r = len(parent); parent.append(r)
            cur.append((a, b, r)); lab[y, a:b] = r
        prev = cur
    roots = np.array([find(i) for i in range(len(parent))], np.int32)
    return roots[lab]

def clean(spr):
    """drop neighbour fragments: small components touching the left/right edge, and tiny specks anywhere"""
    a = spr[..., 3]; f = 2; m = a[::f, ::f] > 40; lab = label(m)
    ids, cnt = np.unique(lab[lab > 0], return_counts=True)
    if not len(ids): return spr
    main = cnt.max(); kill = np.zeros_like(m)
    for i, c in zip(ids, cnt):
        if c == main: continue
        comp = lab == i; xs = np.where(comp.any(0))[0]
        edge = xs[0] <= 2 or xs[-1] >= m.shape[1] - 3
        if c < main * 0.004 or (edge and c < main * 0.12): kill |= comp
    big = np.kron(kill, np.ones((f, f), bool))[:a.shape[0], :a.shape[1]]
    # grow the kill mask a little so soft fringes go too, but never into the kept subject
    keep = np.kron(m & ~kill, np.ones((f, f), bool))[:a.shape[0], :a.shape[1]]
    g = big.copy()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1), (2, 0), (-2, 0), (0, 2), (0, -2)): g |= np.roll(np.roll(big, dy, 0), dx, 1)
    spr = spr.copy(); spr[g & ~keep] = 0
    return spr

def anchor(alpha):
    """waist cut line: most common lowest-opaque-row among columns; anchor x = centre of those columns"""
    m = alpha > 128; H, W = m.shape
    has = m.any(0); low = np.where(has, H - 1 - np.argmax(m[::-1], 0), -1)
    vals = low[has]
    if not len(vals): return W / 2, H
    hist = np.bincount(vals, minlength=H); hist = np.convolve(hist, np.ones(5), 'same')
    mode = int(np.argmax(hist)); cols = np.where(has & (np.abs(low - mode) <= 4))[0]
    return float(cols.mean()), float(mode + 1)

def build(world):
    src = os.path.join(ROOT, 'art', world); cfgp = os.path.join(src, 'sheets.json')
    cfg = json.load(open(cfgp)); out = os.path.join(ROOT, 'assets', world); os.makedirs(out, exist_ok=True)
    man = {'bg': None, 'sprites': {}}
    bgp = os.path.join(src, cfg['bg']); bg = Image.open(bgp).convert('RGB')
    bg.save(os.path.join(out, 'bg.webp'), quality=90, method=6); man['bg'] = {'src': f'assets/{world}/bg.webp', 'w': bg.width, 'h': bg.height}
    known = set(cfg['sheets'])
    for f in sorted(glob.glob(os.path.join(src, '*-green.*'))):
        if os.path.basename(f) not in known: print('  ! unconfigured sheet (auto names):', os.path.basename(f))
    for f in sorted(glob.glob(os.path.join(src, '*-green.*'))):
        name = os.path.basename(f); sc = cfg['sheets'].get(name, {})
        rgba = key_sheet(f); boxes = split(rgba[..., 3], sc)
        names = sc.get('names') or [f'{name.split("-")[0]}.{i}' for i in range(len(boxes))]
        if len(names) != len(boxes): print(f'  ! {name}: found {len(boxes)} items, expected {len(names)}: {boxes}')
        for i, (bx) in enumerate(boxes[:len(names)]):
            x0, y0, x1, y1 = bx; pad = 3
            x0, y0, x1, y1 = max(0, x0 - pad), max(0, y0 - pad), min(rgba.shape[1], x1 + pad), min(rgba.shape[0], y1 + pad)
            spr = rgba[y0:y1, x0:x1].copy()
            # keep only the item: clear stray specks below 2% alpha
            spr[spr[..., 3] < 6] = 0
            spr = clean(spr)
            ys_, xs_ = np.where(spr[..., 3] > 6)
            spr = spr[max(0, ys_.min() - 2):ys_.max() + 3, max(0, xs_.min() - 2):xs_.max() + 3]
            if names[i] in sc.get('flip', []): spr = spr[:, ::-1].copy()
            ax, ay = anchor(spr[..., 3])
            if sc.get('food'): ax, ay = spr.shape[1] / 2, spr.shape[0] / 2
            fn = names[i].replace('.', '_') + '.webp'
            Image.fromarray(spr, 'RGBA').save(os.path.join(out, fn), quality=90, method=4)
            man['sprites'][names[i]] = {'src': f'assets/{world}/{fn}', 'w': spr.shape[1], 'h': spr.shape[0], 'ax': round(ax, 1), 'ay': round(ay, 1), 'sheet': name, 'box': [int(x0), int(y0), int(x1), int(y1)]}
        print(f'  {name}: {len(boxes)} sprites')
    scp = os.path.join(src, 'scene.json')
    if os.path.exists(scp): man['scene'] = json.load(open(scp))
    return man

def main():
    worlds = sys.argv[1:] or [os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(ROOT, 'art', '*', 'sheets.json'))]
    mp = os.path.join(ROOT, 'assets', 'manifest.json'); allm = json.load(open(mp)) if os.path.exists(mp) else {}
    for w in worlds: print('world', w); allm[w] = build(w)
    os.makedirs(os.path.join(ROOT, 'assets'), exist_ok=True)
    json.dump(allm, open(mp, 'w'), indent=1)
    open(os.path.join(ROOT, 'assets', 'manifest.js'), 'w').write('window.ART_MANIFEST = ' + json.dumps(allm) + ';\n')
    print('manifest:', {w: len(m['sprites']) for w, m in allm.items()})

if __name__ == '__main__': main()
