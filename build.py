import glob, os
d = os.path.dirname(os.path.abspath(__file__))
src = sorted(glob.glob(os.path.join(d, 'src', '*.js')))
js = '\n'.join(open(f).read() for f in src)
assert '</script' not in js
html = open(os.path.join(d, 'src', 'template.html')).read().replace('/*__SCRIPT__*/', js)
open(os.path.join(d, 'index.html'), 'w').write(html)
open('/tmp/tw_bundle.js', 'w').write(js)
print('built', len(html), 'bytes from', [os.path.basename(f) for f in src])
