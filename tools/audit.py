# python3 tools/audit.py <world...> : per-piece median colour + luminance from audit/<w>.png/.json; writes audit/<w>-values.png and prints close pairs
import json, sys, colorsys
from PIL import Image, ImageDraw
D='/workspace/shots/audit/'
def lum(c): return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
out=[]
for w in sys.argv[1:]:
    im=Image.open(D+w+'.png').convert('RGB'); bd=json.load(open(D+w+'.json')); cw=im.width/10
    px={}
    for r,row in enumerate(bd):
        for c,v in enumerate(row):
            if not v: continue
            cell=im.crop((int(c*cw+cw*0.15),int(r*cw+cw*0.15),int((c+1)*cw-cw*0.15),int((r+1)*cw-cw*0.15))).resize((12,12))
            px.setdefault(v,[]).extend(cell.getdata())
    res={}
    for v,l in sorted(px.items()):
        ch=[sorted(p[i] for p in l)[len(l)//2] for i in range(3)]; L=sorted(lum(p) for p in l)[len(l)//2]
        res[v]=(tuple(ch),L)
    sw=Image.new('RGB',(7*90,200),(30,30,30)); d=ImageDraw.Draw(sw)
    for i,(v,(c,L)) in enumerate(res.items()):
        d.rectangle((i*90+5,5,i*90+85,85),fill=c); g=int(L); d.rectangle((i*90+5,95,i*90+85,175),fill=(g,g,g)); d.text((i*90+8,180),'%d L%d'%(v,L),fill=(255,255,255))
    sw.save(D+w+'-values.png')
    close=[]
    items=list(res.items())
    for i in range(len(items)):
        for j in range(i+1,len(items)):
            (a,(ca,La)),(b,(cb,Lb))=items[i],items[j]
            ha=colorsys.rgb_to_hsv(*[x/255 for x in ca]); hb=colorsys.rgb_to_hsv(*[x/255 for x in cb])
            dh=min(abs(ha[0]-hb[0]),1-abs(ha[0]-hb[0]))*360; dl=abs(La-Lb); dc=sum((x-y)**2 for x,y in zip(ca,cb))**0.5
            if dl<12 and (dh<25 or dc<60): close.append('%d~%d(dL%.0f dH%.0f dRGB%.0f)'%(a,b,dl,dh,dc))
    print(w, ' '.join('%d:L%.0f'%(v,L) for v,(c,L) in res.items()), '| CLOSE:', ' '.join(close) or '-')
