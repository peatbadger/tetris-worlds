# python3 tools/cg.py <cmp.png> <out.png> : left half (world stack) in colour beside its greyscale
import sys
from PIL import Image
im=Image.open(sys.argv[1]); w=im.width
l=im.crop((0,60,w//2,im.height)).resize((w//4,(im.height-60)//2)); g=l.convert('L').convert('RGB')
o=Image.new('RGB',(l.width*2+10,l.height),(20,20,24)); o.paste(l,(0,0)); o.paste(g,(l.width+10,0)); o.save(sys.argv[2])
