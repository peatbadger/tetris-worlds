import json, sys
from PIL import Image, ImageDraw
w = sys.argv[1] if len(sys.argv) > 1 else 'sushi'; out = sys.argv[2] if len(sys.argv) > 2 else '/tmp/contact.png'
m = json.load(open('assets/manifest.json'))[w]['sprites']
cell = 200; cols = 8; rows = (len(m) + cols - 1) // cols
C = Image.new('RGB', (cols * cell, rows * (cell + 16)), (60, 40, 30)); d = ImageDraw.Draw(C)
for i, (k, s) in enumerate(m.items()):
    im = Image.open(s['src']).convert('RGBA'); sc = min((cell - 10) / im.width, (cell - 10) / im.height); im2 = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))))
    x, y = (i % cols) * cell, (i // cols) * (cell + 16)
    bgc = (40, 90, 160) if (i // cols + i) % 2 else (150, 60, 50)
    d.rectangle([x, y, x + cell - 1, y + cell - 1], fill=bgc)
    C.paste(im2, (x + 5, y + 5), im2); ax, ay = 5 + s['ax'] * sc, 5 + s['ay'] * sc
    d.ellipse([x + ax - 3, y + ay - 3, x + ax + 3, y + ay + 3], fill=(255, 255, 0)); d.text((x + 3, y + cell + 2), k, fill=(255, 255, 255))
C.save(out); print(out)
