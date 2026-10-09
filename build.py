"""Build the single-file game: inlines src/*.js into src/template.html and embeds a
subset of the OFL brush font (Yuji Syuku) containing only the Japanese glyphs used."""
import glob, os, re, base64
d = os.path.dirname(os.path.abspath(__file__))
src = sorted(glob.glob(os.path.join(d, 'src', '*.js')))
js = '\n'.join(open(f, encoding='utf-8').read() for f in src)
assert '</script' not in js
ttf = os.path.join(d, 'fonts', 'YujiSyuku-Regular.ttf')
sub = os.path.join(d, 'fonts', 'YujiSyuku-subset.woff2')
chars = sorted(set(re.findall(r'[\u3000-\u30ff\u4e00-\u9fff\uff00-\uffef\uac00-\ud7af]', js)) | set('0123456789円'))
if os.path.exists(ttf):  # regenerate the subset (needs fonttools + brotli)
    from fontTools import subset
    opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['*']; opts.hinting = False; opts.desubroutinize = True
    f = subset.load_font(ttf, opts); s = subset.Subsetter(opts); s.populate(text=''.join(chars)); s.subset(f)
    subset.save_font(f, sub, opts)
font_js = 'const JP_FONT_B64 = "%s";\n' % base64.b64encode(open(sub, 'rb').read()).decode() if os.path.exists(sub) else ''
# glyphs the brush font lacks (Cantonese/Traditional-only characters such as 嘢 洱 糕 雞) come from a tiny
# subset of Noto Serif CJK HK Bold (SIL OFL 1.1), so the game never shows tofu boxes, even fully offline
noto = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc'
sub2 = os.path.join(d, 'fonts', 'NotoSerifHK-subset.woff2')
if os.path.exists(ttf) and os.path.exists(noto):
    from fontTools import subset
    from fontTools.ttLib import TTFont
    cm = TTFont(ttf).getBestCmap(); miss = [c for c in chars if ord(c) not in cm]
    o2 = subset.Options(); o2.flavor = 'woff2'; o2.hinting = False; o2.desubroutinize = True; o2.font_number = 4
    f2 = subset.load_font(noto, o2); s2 = subset.Subsetter(o2); s2.populate(text=''.join(miss) or '0'); s2.subset(f2); subset.save_font(f2, sub2, o2)
    print('fallback glyphs:', ''.join(miss))
if os.path.exists(sub2): font_js += 'const CJK_FALLBACK_B64 = "%s";\n' % base64.b64encode(open(sub2, 'rb').read()).decode()
html = open(os.path.join(d, 'src', 'template.html'), encoding='utf-8').read().replace('/*__SCRIPT__*/', font_js + js)
open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
open('/tmp/tw_bundle.js', 'w', encoding='utf-8').write(font_js + js)
print('built %d bytes, %d JP glyphs, font subset %d bytes' % (len(html.encode()), len(chars), os.path.getsize(sub) if os.path.exists(sub) else 0))
