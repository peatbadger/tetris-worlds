# quick static composite of the sushi scene layout (for tuning scene.json without a browser)
import json, sys
from PIL import Image, ImageDraw
sc = json.load(open('art/sushi/scene.json')); M = json.load(open('assets/manifest.json'))['sushi']['sprites']
bg = Image.open('art/sushi/bg-empty.jpg').convert('RGBA')
cast = dict(a.split('=') for a in sys.argv[2:]) if len(sys.argv) > 2 else {'board': 'chef.slice', 'case': 'appr.roll', 'pass': 'taisho.laugh', 'L1': 'sal.sip', 'L2': 'woman.photo', 'R1': 'gpa.chop', 'R2': 'kid.wave'}
def place(img, spot, name):
    s = M[name]; sp = sc['spots'][spot]; k = sp['s'] * sc['scaleFix'].get(name, 1)
    im = Image.open(s['src']).convert('RGBA'); im = im.resize((int(im.width * k), int(im.height * k)), Image.LANCZOS)
    # head anchor: top of sprite at sp.head; x anchor at sp.x
    x = int(sp['x'] - s['ax'] * k); y = int(sp['head'])
    img.alpha_composite(im, (max(0, x), y) if x >= 0 else (0, y)) if x >= 0 else img.alpha_composite(im.crop((-x, 0, im.width, im.height)), (0, y))
def poly_mask(pts):
    m = Image.new('L', bg.size, 0); ImageDraw.Draw(m).polygon(pts, fill=255); return m
out = bg.copy()
for spot in ('board', 'pass', 'door', 'case'):
    if spot in cast: place(out, spot, cast[spot])
bl = sc['backLine']; back = poly_mask([(bl[0][0], bl[0][1]), (bl[1][0], bl[1][1]), (1280, 720), (bl[0][0], 720)])
out.paste(bg, (0, 0), back)
c = sc['case']; cm = Image.new('L', bg.size, 0); d = ImageDraw.Draw(cm); d.rectangle([c['x0'], c['top'], c['x1'], c['glassTo']], fill=int(255 * c['glassAlpha'])); d.rectangle([c['x0'], c['glassTo'], c['x1'], 720], fill=255)
out.paste(bg, (0, 0), cm)
for spot in ('L1', 'L2', 'R1', 'R2'):
    if spot in cast: place(out, spot, cast[spot])
fl = sc['frontLine']; out.paste(bg, (0, 0), poly_mask([tuple(p) for p in fl] + [(1280, 720), (0, 720)]))
d = ImageDraw.Draw(out)
by = sc['beltY']
for x in range(140, 1280, 95):
    y = next(y0 + (y1 - y0) * (x - x0) / (x1 - x0) for (x0, y0), (x1, y1) in zip(by[:-1], by[1:]) if x0 <= x <= x1)
    d.ellipse([x - 38, y - 9, x + 38, y + 11], fill=(200, 60, 40, 255), outline=(250, 230, 200, 255))
# visible strips at 1440x900 cover-fit
d.line([(278, 0), (278, 720)], fill=(0, 255, 0, 255)); d.line([(1003, 0), (1003, 720)], fill=(0, 255, 0, 255)); d.line([(64, 0), (64, 720)], fill=(0, 255, 0, 255)); d.line([(1216, 0), (1216, 720)], fill=(0, 255, 0, 255))
out.convert('RGB').save(sys.argv[1] if len(sys.argv) > 1 else '/tmp/prev.png')
