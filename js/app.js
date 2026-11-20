/* v199zzzzzz109：覆蓋層堆疊（B2）。Esc 只關最上層覆蓋層，不穿透到底下的巡檢卡片／展示。cloud.js 於 Artifact 版會提早 return，故定義在此。 */
window.VIBE_MODAL={z:[],push(id,close){this.pop(id);this.z.push({id,close})},pop(id){this.z=this.z.filter(x=>x.id!==id)},top(){return this.z[this.z.length-1]||null}};
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const t=window.VIBE_MODAL.top();if(t){e.stopImmediatePropagation();e.preventDefault();t.close()}},true);
(function(){
'use strict';
/* 多檔版：大型網格／貼圖資料改由 data/*.js 寫入 window.VIBE_D（split.mjs 產生） */
window.__tA0=performance.now();try{window.__LT=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__LT.push([e.startTime,e.duration])}).observe({type:'longtask',buffered:true})}catch(_){}try{window.__LF=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__LF.push([e.startTime,e.duration,e.renderStart?e.startTime+e.duration-e.renderStart:0])}).observe({type:'long-animation-frame',buffered:true})}catch(_){}/* v199zzzzzz54：長任務紀錄（診斷列） */const VIBE_D=window.VIBE_D||{};{const miss=["FK","LOFT","LOFTEX","RD_HG","STEP3","CRK_NEW","CRK_F1","CRK_GRV","CRK_AUD","STEM_STD","RD_SRAM","DROP_UDH","DROP_EX","CAS","DISC_RG","CALD","AXLE_H","SHM_D","SADDLE_SD","CH_U","SPL_MASK","BOLT_P","BOLT_N","LOGO_SRC","LOGO_HD","LOGO_MODELS","DT_SVG","OPTG","FK_PAT_SVG","FORK_PAY","SEAT_PAY","SER_D","SER_DA_RD","HG_SH"].filter(k=>!(k in VIBE_D));if(miss.length)console.error('VIBE 資料檔缺漏',miss)}
/* v199：內嵌網格資料封裝。'~'+種類(0 原樣／1 uint16 差分／3 int16 xyz 差分)+Z85(raw deflate)。無此前綴者仍走 base64。 */
const bz=(()=>{const Z='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#',ZI=new Uint8Array(128);for(let i=0;i<85;i++)ZI[Z.charCodeAt(i)]=i;
const LB=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],LE=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],DB=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],DE=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],CO=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
function inf(S){let sp=0,bb=0,bc=0,O=new Uint8Array(S.length*4+1024),op=0;
 const bits=n=>{while(bc<n){bb|=S[sp++]<<bc;bc+=8}const v=bb&((1<<n)-1);bb>>>=n;bc-=n;return v};
 const mk=L=>{const c=new Uint16Array(16),s=new Uint16Array(L.length),o=new Uint16Array(16);for(const l of L)c[l]++;c[0]=0;for(let i=1;i<16;i++)o[i]=o[i-1]+c[i-1];for(let i=0;i<L.length;i++)if(L[i])s[o[L[i]]++]=i;return{c,s}};
 const ds=h=>{while(bc<16){bb|=S[sp++]<<bc;bc+=8}let code=0,first=0,idx=0,x=bb;for(let l=1;l<16;l++){code|=x&1;x>>>=1;const n=h.c[l];if(code-n<first){bb>>>=l;bc-=l;return h.s[idx+code-first]}idx+=n;first+=n;first<<=1;code<<=1}throw 0};
 let fl,fd;
 for(let last=0;!last;){last=bits(1);const t=bits(2);
  if(t==0){sp-=bc>>3;bb=0;bc=0;const n=S[sp]|S[sp+1]<<8;sp+=4;if(op+n>O.length){const q=new Uint8Array((op+n)*2);q.set(O);O=q}O.set(S.subarray(sp,sp+n),op);op+=n;sp+=n;continue}
  let lh,dh;
  if(t==1){if(!fl){const L=new Uint8Array(288).fill(8,0,144).fill(9,144,256).fill(7,256,280).fill(8,280);fl=mk(L);fd=mk(new Uint8Array(30).fill(5))}lh=fl;dh=fd}
  else{const nl=bits(5)+257,nd=bits(5)+1,nc=bits(4)+4,L=new Uint8Array(19);for(let i=0;i<nc;i++)L[CO[i]]=bits(3);const ch=mk(L),X=new Uint8Array(nl+nd);for(let i=0;i<nl+nd;){const s=ds(ch);if(s<16)X[i++]=s;else{let r,v=0;if(s==16){v=X[i-1];r=3+bits(2)}else if(s==17)r=3+bits(3);else r=11+bits(7);while(r--)X[i++]=v}}lh=mk(X.subarray(0,nl));dh=mk(X.subarray(nl))}
  for(;;){const s=ds(lh);if(s<256){if(op>=O.length){const q=new Uint8Array(O.length*2);q.set(O);O=q}O[op++]=s}else if(s==256)break;else{const n=LB[s-257]+bits(LE[s-257]),d2=ds(dh),d=DB[d2]+bits(DE[d2]);if(op+n>O.length){const q=new Uint8Array((op+n)*2);q.set(O);O=q}for(let i=0;i<n;i++,op++)O[op]=O[op-d]}}}
 return O.subarray(0,op)}
return s=>{if(s[0]!='~'){const q=atob(s),u=new Uint8Array(q.length);for(let i=0;i<q.length;i++)u[i]=q.charCodeAt(i);return u.buffer}
 const k=s[1],pad=+s[2],L=s.length-3,B=new Uint8Array(L/5*4);for(let i=0,j=0;i<L;i+=5,j+=4){let v=0;for(let m=0;m<5;m++)v=v*85+ZI[s.charCodeAt(3+i+m)];B[j]=v>>>24;B[j+1]=v>>>16&255;B[j+2]=v>>>8&255;B[j+3]=v&255}
 const u=inf(B.subarray(0,B.length-pad));
 if(k=='0')return u.slice().buffer;
 if(k=='1'){const n=u.length/2,o=new Uint16Array(n);let a=0;for(let i=0;i<n;i++){a=a+(u[i]|u[n+i]<<8)&65535;o[i]=a}return o.buffer}
 const n=u.length/6,o=new Int16Array(n*3);let a=0,b=0,c=0;for(let i=0;i<n;i++){a=a+(u[i]|u[n+i]<<8)&65535;b=b+(u[2*n+i]|u[3*n+i]<<8)&65535;c=c+(u[4*n+i]|u[5*n+i]<<8)&65535;o[3*i]=a;o[3*i+1]=b;o[3*i+2]=c}return o.buffer}})();
/* ===== 資料（快照自「扭力幾何手冊_資料表」） ===== */
const PARTS=[{"id": "stemFace", "name": "龍頭前蓋（把手夾）", "need": true, "lo": 4, "hi": 6, "tool": "4 mm 六角", "low": "把手在顛簸中可能轉動下壓。", "high": "把手可能被夾傷，碳纖維把手尤其會裂；螺絲也可能斷在龍頭裡。", "tip": "四顆螺絲以十字交錯分次鎖，讓前蓋上下縫隙一致。碳纖維把手上若印有較低上限，以把手為準。", "node": "bar", "off": [8, 0, 30]}, {"id": "stemSteer", "name": "龍頭立管夾", "need": true, "lo": 4, "hi": 6, "tool": "4 mm 六角", "low": "龍頭在轉向時偏轉，前輪與把手不再對正。", "high": "可能夾傷前叉立管，碳纖維立管最怕過緊。", "tip": "先調好頭碗預壓，再鎖這兩顆；兩顆輪流上，分兩三次到位。", "node": "stemC", "off": [-38, -24, 0]}, {"id": "topCap", "name": "頭碗上蓋", "need": false, "tool": "5 mm 六角，手感", "trap": "這顆不是用來固定的。它只負責消除頭碗間隙：輕輕旋到前後晃動消失、轉向仍然順暢就停，大約 1–2 Nm 以內。之後鎖緊龍頭立管夾，固定才算完成。", "ref": "預壓，手感約 1–2 Nm", "node": "steerTop", "off": [0, 52, 0]}, {"id": "lever", "name": "變把束環", "need": true, "lo": 6, "hi": 8, "tool": "5 mm 六角", "low": "摔車或用力壓變把時，變把會往下滑。", "high": "可能壓傷把手；碳纖維把手看把手上的上限標示。", "node": "bar", "off": [95, 15, 183]}, {"id": "seatClamp", "name": "座管束", "need": true, "lo": 4, "hi": 6, "tool": "4 mm 六角", "low": "騎行中座管慢慢下沉。", "high": "座管可能被壓變形，束環也可能變形。", "ti": "鈦車架與鈦螺絲的螺紋上抗咬劑（Ti-prep），不要乾鎖。碳纖維座管另外抹止滑膏。", "node": "STtop", "off": [-15, 0, 0]}, {"id": "saddle", "name": "座墊夾（雙螺絲）", "need": true, "lo": 8, "hi": 12, "tool": "5 mm 六角", "low": "座墊角度在騎乘中改變，座墊弓也可能前後滑動。", "high": "可能夾傷座墊弓，碳纖維座墊弓最怕過緊。", "tip": "單螺絲夾具的常見值不同；座管頭上有印數值時以印的為準。", "node": "saddle", "off": [0, -22, 30]}, {"id": "bottle", "name": "水壺架螺絲", "need": true, "lo": 2, "hi": 3, "tool": "4 mm 六角", "low": "水壺架在碎石路上鬆動、發出異音。", "high": "車架上的螺紋座可能滑牙，修理比換水壺架麻煩得多。", "ti": "鈦車架上的螺紋座同樣上抗咬劑；數值很小，最容易一順手就鎖過頭。", "node": "DTmid", "off": [0, 25, 30]}, {"id": "bb", "name": "中軸碗（BSA 螺紋）", "need": true, "lo": 35, "hi": 50, "tool": "中軸碗板手", "low": "中軸鬆動產生異音，踩踏時有間隙。", "high": "可能損傷車架中軸螺紋。", "ti": "鈦車架中軸螺紋一定上抗咬劑，下次拆裝才拆得下來。右側中軸碗為反牙。", "node": "BB", "off": [0, -34, -30]}, {"id": "crank", "name": "左曲柄夾緊螺絲", "need": true, "lo": 12, "hi": 14, "tool": "5 mm 六角", "low": "左曲柄會鬆脫，騎行中可能整支掉落。", "high": "可能滑牙，或讓曲柄夾持處變形。", "tip": "以 Shimano Hollowtech II 為例。先用預壓蓋以手感消除左右間隙（約 0.7–1.5 Nm），再把兩顆夾緊螺絲輪流鎖到位。SRAM DUB 是另一種結構，曲柄螺絲約 48–54 Nm。", "node": "BB", "off": [0, 9, -89]}, {"id": "pedal", "name": "踏板", "need": true, "lo": 35, "hi": 55, "tool": "8 mm 六角或 15 mm 踏板板手", "low": "踏板退牙鬆脫，會把曲柄螺紋一起磨壞。", "high": "下次很難拆，螺紋也可能受損。", "tip": "左踏板是反牙，往車頭方向轉是鎖緊。螺紋上油或抗咬劑。", "node": "BB", "off": [111, -132, 93]}, {"id": "rd", "name": "後變速器固定螺絲", "need": true, "lo": 8, "hi": 10, "tool": "5 mm 六角", "low": "變速器偏轉，換檔不準，嚴重時捲進輻條。", "high": "可能扭彎或拉斷變速器吊耳。", "node": "RA", "off": [-35, -86, 80]}, {"id": "cassette", "name": "飛輪鎖環", "need": true, "lo": 30, "hi": 50, "tool": "飛輪鎖環工具＋板手", "low": "飛輪片鬆動，踩踏時有喀喀聲。", "high": "可能損傷花鼓棘輪座的螺紋。", "tip": "SRAM 常見 40 Nm；以飛輪包裝或鎖環上的標示為準。", "node": "RA", "off": [0, 11, 56]}, {"id": "rotor", "name": "碟盤螺絲（六孔）", "need": true, "lo": 2, "hi": 4, "tool": "T25 星型", "low": "碟盤螺絲在長下坡時鬆脫。", "high": "小螺絲容易斷頭或滑牙。", "tip": "對角順序分次鎖；螺絲上已有防鬆膠，不另外上油。中心鎖（Centerlock）鎖環則約 40 Nm。", "node": "RA", "off": [0, 80, -47.5]}, {"id": "caliper", "name": "碟煞卡鉗固定螺絲", "need": true, "lo": 6, "hi": 8, "tool": "T25 或 5 mm 六角", "low": "卡鉗鬆動，煞車時抖動、對位跑掉。", "high": "可能損傷車架或前叉上的螺紋座。", "node": "FA", "off": [-50, 55, -57.5]}, {"id": "axle", "name": "花鼓軸（前後）", "need": true, "lo": 10, "hi": 15, "tool": "6 mm 六角或軸桿把手", "low": "輪組有間隙，煞車時碟盤磨擦。", "high": "可能損傷車架或前叉軸孔的螺紋。", "tip": "常見 12 Nm；前叉與車架上的標示優先。", "ti": "鈦車架勾爪上的軸桿螺紋上一點油脂或抗咬劑。", "node": "FA", "off": [0, 0, 80]}, {"id": "valve", "name": "氣嘴固定螺帽", "need": false, "tool": "手指", "trap": "用手指轉緊就好。用工具鎖死，反而容易傷到氣嘴的密封墊，路邊要拆時也拆不下來。", "ref": "手指轉緊", "node": "valve", "off": [0, 0, 15]}];
/* ===== 騎士尺寸（兩分頁共用；手臂長＝肩峰到手腕關節） ===== */
const RID={h:NaN,i:NaN,a:NaN},FRANGE={h:[100,250],i:[40,140],a:[40,90]};
const RKS=[['h','fh','身高',''],['i','fi','跨高','赤腳靠牆、書本夾緊，量到地面'],['a','fa','手臂長','肩峰到手腕關節，手臂自然下垂伸直']];
const riderOk=()=>['h','i','a'].every(k=>isFinite(RID[k])&&RID[k]>=FRANGE[k][0]&&RID[k]<=FRANGE[k][1]);
const okK=k=>isFinite(RID[k])&&RID[k]>=FRANGE[k][0]&&RID[k]<=FRANGE[k][1];
const riderTop=()=>{if(!(tab==='geo'||tab==='custom'))return 0;let t=0;if(okK('i'))t=Math.max(t,RID.i/100+.12);if(okK('a')&&N)t=Math.max(t,N.bar.y/1000+Math.sin(Math.PI/3)*RID.a/100+.12);return t};
const camY=()=>Math.max(.55,riderTop()/2);
const RIN=[];document.querySelectorAll('.rider').forEach(box=>{box.innerHTML=RKS.map(([k,dk,nm,note])=>`<label class="f" data-k="${dk}"><span>${nm}${note?`<small>${note}</small>`:''}</span><input class="num" type="number" inputmode="decimal" step="0.5" data-rk="${k}" aria-label="${nm} cm" placeholder="${FRANGE[k][0]}–${FRANGE[k][1]}"><span class="u">cm</span></label>`).join('');box.querySelectorAll('input').forEach(el=>RIN.push(el))});
function riderMirror(){RIN.forEach(el=>{if(el===document.activeElement)return;const v=RID[el.dataset.rk];el.value=isFinite(v)?String(v):''})}
function markRider(){RIN.forEach(el=>{const k=el.dataset.rk,raw=el.value,x=parseFloat(raw);el.closest('label.f').classList.toggle('bad',raw!==''&&!(x>=FRANGE[k][0]&&x<=FRANGE[k][1]));el.closest('label.f').classList.toggle('todo',raw==='')})}
const GEO64=[
 {size:'XS',reach:372,stack:503.1,ht:106,hta:71,sta:74.5,bbd:68,cs:410,rake:43,stl:450,so:733,fc:571,wb:971,ett:511},
 {size:'S',reach:381,stack:522.83,ht:125,hta:71.5,sta:74,bbd:68,cs:410,rake:43,stl:490,so:748,fc:582,wb:983,ett:531},
 {size:'M',reach:390,stack:537,ht:140,hta:71.5,sta:73.5,bbd:68,cs:410,rake:43,stl:520,so:782,fc:596,wb:997,ett:549},
 {size:'L',reach:399,stack:556.02,ht:160,hta:71.5,sta:73.5,bbd:68,cs:410,rake:43,stl:550,so:793,fc:611,wb:1012,ett:564},
 {size:'XL',reach:406,stack:572.09,ht:175,hta:72,sta:73,bbd:68,cs:410,rake:43,stl:580,so:815,fc:619,wb:1019,ett:581}];
const GEOS={'64':GEO64,'325':[{"size":"XS","reach":368,"stack":514,"ht":115,"hta":71,"sta":74.5,"bbd":68,"cs":415,"rake":43,"stl":450,"so":723,"fc":571,"wb":976,"ett":510},{"size":"S","reach":378,"stack":528,"ht":130,"hta":71,"sta":74.5,"bbd":68,"cs":415,"rake":43,"stl":490,"so":753,"fc":586,"wb":991,"ett":524},{"size":"M","reach":387,"stack":545,"ht":146,"hta":71.5,"sta":74,"bbd":68,"cs":415,"rake":43,"stl":520,"so":775,"fc":596,"wb":1001,"ett":546},{"size":"L","reach":396,"stack":566,"ht":168,"hta":71.5,"sta":74,"bbd":68,"cs":420,"rake":43,"stl":550,"so":801,"fc":612,"wb":1022,"ett":558},{"size":"XL","reach":405,"stack":586,"ht":188,"hta":72,"sta":73.5,"bbd":68,"cs":420,"rake":43,"stl":570,"so":820,"fc":622,"wb":1033,"ett":579}],'ss':[{"size":"XS","reach":358,"stack":528.7,"ht":90,"hta":70.5,"sta":74,"bbd":73,"cs":435,"rake":50,"stl":430,"so":726,"fc":577,"wb":1001,"ett":509},{"size":"S","reach":365,"stack":543,"ht":104,"hta":71,"sta":74,"bbd":73,"cs":435,"rake":50,"stl":470,"so":753,"fc":584,"wb":1008,"ett":521},{"size":"M","reach":375,"stack":556,"ht":118,"hta":71,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":500,"so":772,"fc":599,"wb":1023,"ett":540},{"size":"L","reach":388,"stack":572.1,"ht":133,"hta":71.5,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":530,"so":795,"fc":612,"wb":1036,"ett":557},{"size":"XL","reach":393,"stack":591,"ht":153,"hta":71.5,"sta":73,"bbd":73,"cs":435,"rake":50,"stl":560,"so":817,"fc":623,"wb":1048,"ett":574},{"size":"XXL","reach":400,"stack":610,"ht":173,"hta":71.5,"sta":73,"bbd":73,"cs":435,"rake":50,"stl":600,"so":846,"fc":637,"wb":1061,"ett":586}]};Object.assign(GEOS,{'audax':[{"size":"XXS","reach":349,"stack":523,"ht":115,"hta":70,"sta":73.5,"bbd":68,"cs":415,"rake":43,"stl":425,"so":719,"fc":564,"wb":969,"ett":503},{"size":"XS","reach":357,"stack":536,"ht":125,"hta":71,"sta":73.5,"bbd":68,"cs":415,"rake":43,"stl":450,"so":737,"fc":567,"wb":973,"ett":515},{"size":"S","reach":366,"stack":547,"ht":135,"hta":71.5,"sta":73.5,"bbd":68,"cs":415,"rake":43,"stl":490,"so":762,"fc":576,"wb":981,"ett":528},{"size":"M","reach":373.9,"stack":554.8,"ht":150,"hta":72,"sta":73,"bbd":68,"cs":415,"rake":43,"stl":520,"so":784,"fc":584,"wb":989,"ett":543.5},{"size":"L","reach":384,"stack":577,"ht":165,"hta":72,"sta":73,"bbd":68,"cs":415,"rake":43,"stl":550,"so":805,"fc":599,"wb":1004,"ett":561},{"size":"XL","reach":393.2,"stack":592,"ht":180,"hta":72,"sta":73,"bbd":68,"cs":415,"rake":43,"stl":570,"so":821,"fc":612,"wb":1018,"ett":574},{"size":"XXL","reach":402,"stack":611,"ht":200,"hta":72,"sta":73,"bbd":68,"cs":415,"rake":43,"stl":590,"so":840,"fc":627,"wb":1033,"ett":588}],'ili':[{"size":"XS","reach":355,"stack":542,"ht":120,"hta":70.5,"sta":74,"bbd":73,"cs":435,"rake":50,"stl":430,"so":733,"fc":579,"wb":1003,"ett":510},{"size":"S","reach":365,"stack":558,"ht":135,"hta":71,"sta":74,"bbd":73,"cs":435,"rake":50,"stl":470,"so":760,"fc":589,"wb":1014,"ett":525},{"size":"M","reach":376,"stack":577,"ht":155,"hta":71,"sta":74,"bbd":73,"cs":435,"rake":50,"stl":510,"so":789,"fc":607,"wb":1031,"ett":541},{"size":"L","reach":385,"stack":593,"ht":170,"hta":71.5,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":540,"so":811,"fc":616,"wb":1041,"ett":561},{"size":"XL","reach":394,"stack":612,"ht":190,"hta":71.5,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":570,"so":834,"fc":631,"wb":1056,"ett":575},{"size":"XXL","reach":402,"stack":631,"ht":210,"hta":71.5,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":610,"so":863,"fc":646,"wb":1070,"ett":589},{"size":"XXXL","reach":411,"stack":650,"ht":230,"hta":71.5,"sta":73.5,"bbd":73,"cs":435,"rake":50,"stl":640,"so":887,"fc":661,"wb":1086,"ett":603}],'ex':[{"size":"XS","reach":380,"stack":560,"ht":100,"hta":66.6,"sta":72.5,"bbd":80,"cs":430,"rake":50,"stl":430,"so":746,"fc":647,"wb":1065,"ett":557},{"size":"S","reach":400,"stack":579,"ht":120,"hta":66.6,"sta":73,"bbd":80,"cs":430,"rake":50,"stl":450,"so":762,"fc":675,"wb":1093,"ett":577},{"size":"M","reach":420,"stack":597,"ht":140,"hta":66.6,"sta":73.5,"bbd":80,"cs":430,"rake":50,"stl":470,"so":779,"fc":703,"wb":1121,"ett":597},{"size":"L","reach":440,"stack":615,"ht":160,"hta":66.6,"sta":74,"bbd":80,"cs":430,"rake":50,"stl":490,"so":796,"fc":731,"wb":1149,"ett":617},{"size":"XL","reach":460,"stack":634,"ht":180,"hta":66.6,"sta":74.5,"bbd":80,"cs":430,"rake":50,"stl":510,"so":812,"fc":758,"wb":1177,"ett":634}]});let GEO=GEOS['64'];
const OPT={model:['Master V9 Road'],ride:{Road:415,Gravel:435},brake:['FM disc','PM disc','Rim'],
 tire:['25-622','28-622','30-622','32-622','35-622','38-622','40-622','45-622','47-584','50-584'],yn:['NO','YES']};
const C={ttHt:50,dtHt:50,ttSt:40,ssSt:150,tireAdd:4,htlTol:1};/* v113：接頭管 offset 對齊後台 Sheet plot（上管接頭管 50／下管接頭管 50／上管接中管 40／上叉接中管 150；原 30／40／40／90） */
const SAMPLE={height:176,inseam:82,arm:60,model:'Master V9 Road',ride:'Road',brake:'FM disc',tire:'32-622',
 reach:395,stack:549,hta:72.5,htl:150,a2c:368,off:43,bbd:68,rc:415,sta:74.3,stl:515,fender:'NO',rack:'YES',ss:'NO',blktec:'NO',ora:'NO'};
const STOCK_TIRES={'64':'32-622','325':'28-622','ss':'38-622','audax':'28-622','ili':'38-622','ex':'38-622'};/* v198：3D 胎寬改由 TW_DEF／TW_SEL 決定（stockTire()）；STOCK_TIRES 為官網標準輪胎，不再驅動 3D */ const TW_OPT=[30,35,45,50],TW_DEF={'64':24,'325':29,'audax':29,'ili':45,'ss':45,'ex':50},TW_SEL={};function twOpts(m){const a=TW_OPT.slice();if(!a.includes(TW_DEF[m]))a.push(TW_DEF[m]);return a.sort((x,y)=>x-y)}function stockTire(m){return(TW_SEL[m]||TW_DEF[m]||38)+'-622'}
const PARTS_URL='https://rikulau.com/components/';/* RKL 官網零組件頁面網址；填入後「了解更多」膠囊才會連出 */
const ADDONS=[{id:'blktec',name:'Blktec 一體把',note:'碳纖維一體把'},{id:'ora',name:'ORA 鈦座管',note:'鈦合金座管'}];
const pill=()=>PARTS_URL?`<a class="pill" href="${PARTS_URL}" target="_blank" rel="noopener noreferrer">了解更多</a>`:`<span class="pill" aria-disabled="true" title="連結待補">了解更多</span>`;

/* ===== 幾何計算（mm，x 向車頭、y 向上，原點為後輪著地點；沿用客製表單 plot 分頁算法） ===== */
const rad=d=>d*Math.PI/180;
const P=(x,y)=>({x,y}), add=(a,b)=>P(a.x+b.x,a.y+b.y), mul=(a,k)=>P(a.x*k,a.y*k), dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function wheelR(t){const[w,b]=t.split('-').map(Number);return(b+(w+C.tireAdd)*2)/2}
/* 座墊與把手落差：以 MASTER 64Ti M 的（座墊高－把手高）為基準，其餘車型與尺寸維持相同落差，靠座管伸縮調整座墊高度 */
const REF={D:null,calc:false};
function finish(n,hta,sta,saddleH,brake){
  const h=rad(hta),s=rad(sta),up=P(-Math.cos(h),Math.sin(h)),st=P(-Math.cos(s),Math.sin(s));
  n.TTht=add(n.HTt,mul(up,-C.ttHt));n.DTht=add(n.HTb,mul(up,C.dtHt));
  n.steerTop=add(n.HTt,mul(up,62));n.stemC=add(n.HTt,mul(up,45));
  const a=Math.atan2(Math.cos(h),Math.sin(h))-rad(6);n.bar=add(n.stemC,P(100*Math.cos(a),100*Math.sin(a)));n.stemC0=n.stemC;n.steerTop0=n.steerTop;n.bar0=n.bar;/* v199e：分離把上移前的基準節點 */
  const minH=dist(n.BB,n.STtop)+70;n.saddle=add(n.BB,mul(st,Math.max(saddleH,minH)));
  if(!REF.calc){if(REF.D==null){REF.calc=true;const keep=model;try{model='64';const m0=stockNodes(GEO64.find(x=>x.size==='M'));REF.D=m0.saddle.y-m0.bar.y}finally{model=keep;REF.calc=false}}
    const tt=Math.max(minH,(n.bar.y+REF.D-n.BB.y)/st.y);n.saddle=add(n.BB,mul(st,tt))}
  n.DTmid=P((n.BB.x+n.DTht.x)/2,(n.BB.y+n.DTht.y)/2);
  n.valve=add(n.FA,P(0,(n.R-48)*.97));n.hta=hta;n.sta=sta;n.brake=brake||'FM disc';
  return n}
/* v199zzzi：後上叉接座管點。後三角（後軸、五通、後上叉長度）各尺寸相同，所以接點取「離後軸心固定距離 L」的座管上一點；L 由該車款 M 尺寸定出——M 尺寸接點低於上管接座管處 SS_GAP_M[車款] mm（沿座管；依使用者提供的各車款 M 尺寸照片，數值為照片量測估計，±10 mm）。其他尺寸因座管長（上管接點位置）不同，間距各自改變；接點不高於上管接座管處（間距下限 0）。EX 不走此法（沿用 C.ssSt）。 */
var SS_GAP_M={'64':85,'325':80,'audax':0,'ss':0,'ili':30},SS_L={};
function ssLen(){if(SS_L[model]==null){const g=GEO.find(x=>x.size==='M')||GEO[0],R=wheelR(stockTire(model)),s=rad(g.sta),st=P(-Math.cos(s),Math.sin(s)),RA=P(0,R),BB=P(Math.sqrt(g.cs*g.cs-g.bbd*g.bbd),R-g.bbd),S=add(BB,mul(st,g.stl-(SS_GAP_M[model]||0)));SS_L[model]=dist(S,RA)}return SS_L[model]}
function ssJoint(n,st,tMax){if(model==='ex'||SS_GAP_M[model]==null)return null;const L=ssLen(),dx=n.BB.x-n.RA.x,dy=n.BB.y-n.RA.y,b=dx*st.x+dy*st.y,disc=b*b-(dx*dx+dy*dy)+L*L;if(!(disc>=0))return null;return add(n.BB,mul(st,Math.min(-b+Math.sqrt(disc),tMax)))}
function stockNodes(g){
  const R=wheelR(stockTire(model)),h=rad(g.hta),s=rad(g.sta),st=P(-Math.cos(s),Math.sin(s)),up=P(-Math.cos(h),Math.sin(h));
  const n={R,TW:+String(stockTire(model)).split('-')[0]};n.RA=P(0,R);n.BB=P(Math.sqrt(g.cs*g.cs-g.bbd*g.bbd),R-g.bbd);
  n.HTt=add(n.BB,P(g.reach,g.stack));n.HTb=add(n.HTt,mul(up,-g.ht));
  const t=(n.HTt.y-R)/Math.sin(h);n.FA=P(n.HTt.x+t*Math.cos(h)+g.rake/Math.sin(h),R);
  n.TTst=add(n.BB,mul(st,g.stl));n.STtop=add(n.TTst,mul(st,C.ttSt));n.SSst=ssJoint(n,st,g.stl)||add(n.STtop,mul(st,-C.ssSt));
  return finish(n,g.hta,g.sta,g.stl+142)}
function customNodes(f){
  const R=wheelR(f.tire),h=rad(f.hta),s=rad(f.sta),st=P(-Math.cos(s),Math.sin(s));
  const n={R,TW:+String(f.tire).split('-')[0]};n.RA=P(0,R);n.BB=P(Math.sqrt(Math.max(1,f.rc*f.rc-f.bbd*f.bbd)),R-f.bbd);
  n.STtop=add(n.BB,mul(st,f.stl));n.HTt=add(n.BB,P(f.reach,f.stack));
  const th=Math.asin(Math.min(.99,f.off/f.a2c));
  const hby=R+f.a2c*Math.sin(h-th),htl=(n.HTt.y-hby)/Math.sin(h);
  n.HTb=P(n.HTt.x+htl*Math.cos(h),hby);n.FA=P(n.HTb.x+f.a2c*Math.cos(h-th),R);
  n.TTst=add(n.STtop,mul(st,-C.ttSt));n.SSst=ssJoint(n,st,f.stl-C.ttSt)||add(n.STtop,mul(st,-C.ssSt));
  const out=finish(n,f.hta,f.sta,f.stl+102,f.brake);
  out.htlShould=htl;out.wb=n.FA.x;out.fc=dist(n.BB,n.FA);out.trail=n.HTb.y/Math.tan(h)+n.HTb.x-n.FA.x;out.bbg=n.BB.y;
  const tm=P((n.TTst.x+n.TTht.x)/2,(n.TTst.y+n.TTht.y)/2);out.so=tm.y+16;out.soPt=tm;
  return out}

/* ===== 主題 ===== */
const root=document.documentElement,themeBtn=document.getElementById('themeBtn');
function isDark(){const t=root.getAttribute('data-theme');if(t)return t==='dark';return matchMedia('(prefers-color-scheme: dark)').matches}
function syncThemeBtn(){const l=!isDark();themeBtn.setAttribute('aria-checked',String(l));themeBtn.title=l?'切換為深色模式':'切換為淺色模式'}
function setTheme(t,keep){root.setAttribute('data-theme',t);if(!keep)try{localStorage.setItem('rkl-theme',t)}catch(e){}syncThemeBtn();paintHS();STU.theme()}/* v120f：抽出；keep＝色光背景自動切換，不寫入偏好 */
themeBtn.onclick=()=>{const t=isDark()?'light':'dark';if(t==='light'&&window.gelActive&&gelActive()){gelUser=false;gelAuto=false;const i=document.getElementById('gelOn');if(i)i.checked=false;try{gelSync()}catch(_){}}/* v120f：色光背景只在暗色；手動切回明亮＝關閉色光 */setTheme(t)/* v199zzzzzz112：攝影棚改讀另一組 token，補間 350 ms */};
/* v199zzzzzz35：明亮模式為預設；按過切換才記住 */
root.setAttribute('data-theme','light');try{if(localStorage.getItem('rkl-theme')==='dark')root.setAttribute('data-theme','dark')}catch(e){}
syncThemeBtn();

/* ===== 3D 場景 ===== */
const stage=document.getElementById('stage'),V3=THREE.Vector3;
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:(!(/iPhone|iPad/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))&&!/Android|Mobi/i.test(navigator.userAgent)&&matchMedia('(pointer:fine)').matches)?'high-performance':'low-power'});/* v199ze：桌機（判定式同 DESK，DESK 定義在後面故此處內嵌）要求高效能 GPU；行動裝置維持 low-power（使用者 2026-11-05） */
let lowRes=false;const QP={ss:1,auto:false,bm:true,lvl:0,ms:0,n:0,hold:0}/* v199zf：ss＝1、auto＝false、bm＝true、動畫（SPIN_ON）＝true 定案固定，已移出臨時畫質面板（使用者 2026-11-05）；欄位保留供 PR()、btSync 讀取，不再有 UI 與匯出 */,QV={cc:.8,ccr:.1,gr:1.15,mt:.2,br:.8,es:1.1,sat:.95,ex:.5,bc:3,bn:1.5,bs:.45,ta:.5,tr:.7,pr:.88,pcc:0,mgl:0,mmt:.2,pgr:1.15,mgr:1.15};/* v199zzzzzz26：預設改 br .8、bc 3、bn 1.5、bs .45、ta .5、tr .7（使用者 2026-11-13）；新增 mmt（Matcap 噴砂霧面）、pgr（陽極 PBR 噴砂顆粒）、mgr（Matcap 噴砂顆粒）把 PBR 與 Matcap 的噴砂參數分開；mt 只剩鈦原色、gr 只剩鈦原色 */ /* v199zzzzzz24：噴砂群組新增 tr＝鈦原色噴砂粗糙度下限（.85）、pr＝陽極 PBR 噴砂粗糙度（.88）、pcc＝陽極 PBR 噴砂清漆（0）、mgl＝Matcap 噴砂補高光（0）；pr／pcc 取代 v23 常數 MC_BLAST_R */ /* v168：bs＝拉絲紋路比例（紋路尺寸倍率，頻率＝1/bs；1＝v167，預設 .6） *//* v167：ex 預設 .5；bc＝拉絲對比、bn＝拉絲雜訊（倍率，1＝v166 外觀） *//* v166：預設 噴砂顆粒 1.15、噴砂霧面 .2、拉絲條紋 .85 *//* v163：QV＝臨時面板新增項（皆為倍率，ex＝曝光絕對值）；放這裡因 finSync 可能早於面板初始化 *//* v148：臨時畫質面板狀態；ss＝超取樣倍率，lvl＝自動降級等級 */
const PR=()=>{const d=window.devicePixelRatio||1,m=QP.lvl>=1?1:QP.ss;return m===1?Math.min(2,d):Math.min(3,d*m)},PRC=()=>lowRes?Math.min(1,window.devicePixelRatio||1):PR();renderer.setPixelRatio(PR());
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=0.5;/* v167：預設 .5（使用者 2026-11-03） */stage.prepend(renderer.domElement);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(30,1,0.05,50);
(function(){const env=new THREE.Scene(),g=new THREE.SphereGeometry(10,32,16),cols=[],pos=g.attributes.position;
  for(let i=0;i<pos.count;i++){const y=pos.getY(i)/10,c=new THREE.Color().lerpColors(new THREE.Color().setHex(0x1f1c14,THREE.LinearSRGBColorSpace),new THREE.Color().setHex(0xf6eedb,THREE.LinearSRGBColorSpace),(y+1)/2);cols.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));env.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  const SK=1.0;const panel=(x,y,z,w,h,k,t)=>{t=t||[1,.96,.9];const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k*t[0],k*t[1],k*t[2]),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m)};
  /* 攝影棚（v57 重作）：大柔光箱（主光，前左上）＋頂部長條燈（管件頂線高光）＋左右兩支直立條燈（管件側向銳利高光，右側偏冷）＋前方低位補光卡＋後方冷暖輪廓條燈＋暖色地面反彈；牆面維持暗調 */
  panel(-5,6.5,6.5,5.5,5.5,SK*5.0,[1,.97,.92]);panel(0,9.2,0,15,1.1,SK*6.6);panel(-8.6,2,2.5,1.1,9,SK*6.0,[1,.96,.9]);panel(8.6,2,2.5,1.1,9,SK*5.6,[.93,.99,1.1]);
  panel(0,1.2,9.2,7,2.6,SK*1.5);panel(6.5,3,-6.5,1.3,7,SK*5.0,[.78,.9,1.15]);panel(-6.5,3,-6.5,1.1,6,SK*3.8,[1,.85,.65]);panel(0,-7,1,14,10,SK*0.95,[1,.84,.64]);panel(-7.5,1,-3,2.5,4,SK*1.4);panel(7.5,1,-3,2.5,4,SK*1.4);
  const pmg=new THREE.PMREMGenerator(renderer),mkEnv=()=>pmg.fromScene(env,0.03,0.1,100,{size:512}).texture;scene.environment=mkEnv();window.__envRebuild=()=>{const o=scene.environment;scene.environment=mkEnv();if(o&&o.dispose)o.dispose()}/* v199ze：WebGL context 還原後 PMREM 渲染目標內容會遺失，需重畫 */})();
const hemi=new THREE.HemisphereLight(0xfff4e0,0x3a3426,0.45*Math.PI);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffffff,0.85*Math.PI);sun.position.set(3,1.2,4.5);scene.add(sun);const rim=new THREE.DirectionalLight(0xbfd8ff,1.0*Math.PI);rim.position.set(-1.2,4.5,-3);/* v121：以 MASTER 325Ti 異型管調整（鏡頭座標，車頭在 +x）——主燈由右前上 (2,4,3) 改為前方低位 (3,1.2,4.5)：管件側面成大面積漸層亮面；輪廓燈由左後 (−3,2.5,−4) 改為後上方偏車尾 (−1.2,4.5,−3)：上管頂緣、下管上緣（往車尾斜）出現連續邊緣高光，下緣留暗，異型斷面讀得出來。其他車款照抄（使用者 2026-11-20） */scene.add(rim);const RIM0=rim.color.clone();const SUN0=sun.position.clone(),SUNT=new THREE.Vector3(0,6,.4),RIMP=rim.position.clone(),TOPP=new THREE.Vector3(0,6,.4),LSun=new THREE.Vector3(),LY=new THREE.Vector3(0,1,0);let LTH=0;window.__LD={SUN0,SUNT,RIMP,TOPP};
/* v121：轉台打光——三盞方向光與環境反射貼圖跟著鏡頭偏航轉（同攝影棚背景 STU.mesh）。上面座標改為「鏡頭座標」：鏡頭在 +z、車頭朝 −x（畫面左）。原本燈光固定在世界座標，自旋到車背面時變成逆光、高光分布和正面不一致 */
function lyaw(th,f){if(!f&&th===LTH)return;LTH=th;sun.position.copy(LSun).applyAxisAngle(LY,th);rim.position.copy(RIMP).applyAxisAngle(LY,th);topL.position.copy(TOPP).applyAxisAngle(LY,th);scene.environmentRotation.y=th}/* environmentRotation.y＝th 與燈光同向（three r186 取樣時乘轉置矩陣） *//* v120i：主燈原位／頂光位；各燈強度與「主燈取代頂光」改為攝影棚逐主題參數（hemL／sunL／rimL／sunTop） */const topL=new THREE.DirectionalLight(0xffffff,0);topL.position.set(0,6,.4);scene.add(topL);/* v199zzzzzz120：暗色頂光（強度由攝影棚參數 topL 補間，明亮＝0） */
/* ===== 動態產品攝影棚（v199zzzzzz112）=====
   背景由 CSS 漸層改為 3D：一個環形無縫攝影棚（LatheGeometry＋一個 ShaderMaterial，一次 draw call）。
   · 轉台模型（D1）：攝影棚偏航每幀＝鏡頭偏航 cam.th（applyCam），亮區固定在物件 −z（車子正後方的牆），環繞時背景不動、車在轉。亮區不追蹤產品。
   · 顏色單一來源＝CSS token --studio-*（vibe.css 兩個主題區塊）；數值參數＝STU_P。明暗共用一套幾何與 Shader，只換參數，主題切換補間 350 ms。
   · 取景適應 STU.fit() 只在事件發生時跑（陰影重算完成、換分頁、resize 去抖、開場 4.2 s），拆解中不跑；補間 600 ms，不跳值。
   · 與 PMREM 環境反射、燈光、曝光、材質完全分離（ShaderMaterial 不受光、toneMapped:false，顏色與 CSS token 一致）。#stage 的 CSS 漸層保留當備援。
   · 每幀成本：rotation.y 一次賦值＋補間期間的 uniform 插值＋兩個比較（繪圖緩衝尺寸、ovPx）。 */
const SR_KEYS=['hotK','kw','kh','poolK','frontK','vigR','vigK','grain','barK','barH','topL','envK','hemL','sunL','rimL','sunTop'];/* v115：seam 移除（畫布鋪滿後接縫漸層停用） */const STU_P={dark:{hotK:.55,kw:1.1,kh:.9,poolK:.45,frontK:.8,vigR:.34,vigK:.95,grain:.014,barK:1.21,barH:.85,topL:1.95,envK:.52,hemL:.35,sunL:.7,rimL:1.4,sunTop:0}/* v120i：黑減——補光 .45→.35、主燈 .85→.70、環境反射 .60→.52（車身平均亮度約 −14%，swiftshader 量測）；頂光與輪廓燈維持試機值；主燈不取代頂光 *//* v120b：使用者試機值 */,light:{hotK:.55,kw:1.6,kh:1.3,poolK:.15,frontK:.30,vigR:.55,vigK:.45,grain:.010,barK:0,barH:1,topL:2.2,envK:1.4,hemL:.9,sunL:.85,rimL:1.6,sunTop:1}/* v120i：白加——主燈取代頂光（燈數 3），頂光 1.3→2.2、補光 .45→.90、輪廓燈 1→1.3、環境反射 1→1.4（車身平均亮度約 +17%，對 v120g 明亮） *//* v120g：明亮也開頂光（白加黑減：亮場補光），不顯示燈條 */};/* v199zzzzzz120：暗色加大暗部＋頂燈（燈條 barK、高度倍率 barH、頂光 topL、環境反射 envK）；明亮不開頂燈 */STU_P.dark.seam=STU_P.light.seam=.24;/* v199zzzzzz113：行動版接縫漸層長度（舞台繪圖高度的比例；原寫死 .06，交界色階明顯） *//* 估值，待使用者以 #qp「攝影棚（試機用）」調過再定案 */
const STU_P0={dark:Object.assign({},STU_P.dark),light:Object.assign({},STU_P.light)};const STU_VS=`varying vec3 vSP;varying vec3 vWP;
void main(){vSP=position;vec4 wp=modelMatrix*vec4(position,1.0);vWP=wp.xyz;gl_Position=projectionMatrix*viewMatrix*wp;}`;
const STU_FS=`uniform vec3 uTop,uMid,uHot,uFloor,uEdge,uSeam,uGelA,uGelB;
uniform float uHy,uHw,uHh,uHotK,uPoolR,uPoolK,uFrontK,uVigR,uVigK,uGrain,uSeamPx,uSeamW,uBarK,uBarY,uBarW,uBarT,uGelK;
uniform vec2 uRes,uVc,uBc;
varying vec3 vSP;varying vec3 vWP;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(h21(i),h21(i+vec2(1.0,0.0)),f.x),mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0)),f.x),f.y);}
void main(){
  float y=max(vWP.y,0.0),fr=length(vSP.xz);
  // 1. 垂直漸層（牆）：產品高度附近＝uMid，往上漸深到 uTop
  vec3 c=mix(uMid,uTop,smoothstep(0.5,7.0,y));
  // 地面：車下＝uFloor，往外接到牆的 uMid（cove 連續）；鏡頭前方（物件 +z）漸暗
  vec3 fc=mix(uFloor,uMid,smoothstep(1.5,11.0,fr));
  fc=mix(fc,uEdge,uFrontK*smoothstep(0.5,9.0,vSP.z));
  c=mix(fc,c,smoothstep(0.0,2.0,y));
  // 2. 柔性亮區：車後牆面（物件 −z）；沿牆弧長 s 與高度差 dy 的高斯
  float az=atan(vSP.x,-vSP.z),s=az*max(fr,1.0),dy=y-uHy;
  float hot=exp(-(s*s)/(uHw*uHw)-(dy*dy)/(uHh*uHh));
  c=mix(c,uHot,uHotK*hot);
  // 車下地面的淡亮區
  c=mix(c,uHot,uPoolK*exp(-fr*fr/(uPoolR*uPoolR))*(1.0-smoothstep(0.0,0.3,y)));
  // v199zzzzzz120：頂燈燈條（暗色）。以鏡頭切平面座標（棚內物件空間鏡頭固定在 +z，uBc＝鏡頭高度、距離）畫，畫面上是一條水平直線；下方牆面淡光幕；車下地面多一圈頂光
  if(uBarK>0.0){
    float dz=uBc.y-vSP.z;
    if(dz>1.0&&y>1.2){
      float bu=vSP.x/dz,bv=(y-uBc.x)/dz,ax=abs(bu)/uBarW,dv=bv-uBarY;
      // v120c：光幕改為平滑的雙側高斯（中心在燈條下方 0.08，上側 σ 0.07、下側 σ 0.2；水平四次方衰減），燈條位置不再有硬邊（使用者 2026-11-19）
      float wc=dv+0.08,wv=exp(-pow(max(wc,0.0)/0.07,2.0))*exp(-pow(min(wc,0.0)/0.2,2.0));
      float wash=exp(-pow(ax/0.85,4.0))*wv*smoothstep(1.3,2.8,y);
      c+=uBarK*0.3*wash*uHot;/* v120b：燈條本體與光暈隱藏（使用者 2026-11-19），只留打在牆面與地面的光 */
    }
    c+=uBarK*0.22*uHot*exp(-fr*fr/(uPoolR*uPoolR*1.8))*(1.0-smoothstep(0.0,0.3,y));
  }
  // v120f：色光背景（漸層陽極兩色；使用者 2026-11-19 參照圖）。色 1＝左上方牆面聚光＋左側淡光、色 2＝前景地面；基底壓成兩色平均的極暗色；車下地面一道霧灰亮帶
  if(uGelK>0.0){
    c=mix(c,c*0.35+mix(uGelA,uGelB,0.5)*0.06,uGelK);
    float dz2=uBc.y-vSP.z;
    if(dz2>0.5){
      float gu=vSP.x/dz2,gv=(y-uBc.x)/dz2,wy=smoothstep(0.2,1.2,y);
      float sA=exp(-(pow((gu+0.95)/0.38,2.0)+pow((gv-0.42)/0.38,2.0)));
      float wA=exp(-pow((gu+1.0)/0.6,2.0))*smoothstep(-0.2,0.4,gv);
      c+=uGelK*uGelA*(1.1*sA+0.18*wA)*wy;
      c=mix(c,vec3(1.0),uGelK*0.3*sA*sA*sA*sA*wy);
    }
    float fl=1.0-smoothstep(0.0,0.4,y);
    c+=uGelK*uGelB*0.9*exp(-pow(vSP.x/4.5,2.0))*smoothstep(-8.0,3.0,vSP.z)*(1.0-smoothstep(0.0,3.5,y))*mix(0.55,1.0,fl);/* v120g：色 2 往後、往上（cove／牆腳）延伸漸層，低角度時不再在地平線壓成硬邊 */
    c+=uGelK*vec3(0.10)*exp(-pow(vSP.z/1.6,2.0)-pow(vSP.x/3.5,2.0))*fl;
  }
  // 灰泥顆粒（D3）：地面取 xz、牆取（弧長, 高度）；遠處依 fwidth 淡出避免閃爍
  if(uGrain>0.0){
    float wl=smoothstep(0.0,0.6,y);
    vec2 gp=mix(vSP.xz,vec2(s,y),wl);
    float g=vn(gp*5.0)*0.65+vn(gp*17.0)*0.35;
    float fw=length(fwidth(gp))*17.0;
    c*=1.0+uGrain*(g-0.5)*2.0*(1.0-smoothstep(0.4,1.0,fw));
  }
  // 3. 周邊暗角（螢幕空間；只作用在攝影棚，不壓車身）
  vec2 q=(gl_FragCoord.xy-uVc)/uRes.y; // v115：uRes＝#stage 繪圖尺寸、uVc＝#stage 中心（畫布已大於 #stage）
  c=mix(c,uEdge,uVigK*smoothstep(uVigR,uVigR+0.65,length(q)));
  // 行動版接縫：畫面最下方 uSeamPx 以內＝uSeam（--stage-bot），往上 uSeamW 漸變（max：uSeamW＝0 時 smoothstep 兩端相等屬未定義行為）
  // v199zzzzzz113：改長距離、尾端零斜率的衰減（(1−t)^1.8），交界不再出現一條色帶
  float st=clamp((gl_FragCoord.y-uSeamPx)/max(uSeamW,0.001),0.0,1.0);
  c=mix(c,uSeam,pow(1.0-st,1.8)*step(0.5,uSeamPx+uSeamW));
  gl_FragColor=vec4(c,1.0);
  #include <colorspace_fragment>
  gl_FragColor.rgb+=(h21(gl_FragCoord.xy+fract(vWP.xz))-0.5)/255.0; // 防色帶抖動（D3），在 sRGB 編碼之後
}`;
const STU=(function(){
  const NK={hotK:'uHotK',hw:'uHw',hh:'uHh',hy:'uHy',poolK:'uPoolK',poolR:'uPoolR',frontK:'uFrontK',vigR:'uVigR',vigK:'uVigK',grain:'uGrain',barK:'uBarK',barY:'uBarY',barW:'uBarW',barT:'uBarT',topL:'uTopL',envK:'uEnvK',hemL:'uHemL',sunL:'uSunL',rimL:'uRimL',sunW:'uSunW',gelK:'uGelK'},CKY={top:'uTop',mid:'uMid',hot:'uHot',floor:'uFloor',edge:'uEdge',seam:'uSeam',gelA:'uGelA',gelB:'uGelB'};
  const u={uBc:{value:new THREE.Vector2(.55,3)},uRes:{value:new THREE.Vector2(1,1)},uVc:{value:new THREE.Vector2(.5,.5)},uSeamPx:{value:0},uSeamW:{value:0}},goal={};
  Object.keys(NK).forEach(k=>{u[NK[k]]={value:0};goal[k]=0});Object.keys(CKY).forEach(k=>{u[CKY[k]]={value:new THREE.Color()};goal[k]=new THREE.Color()});
  /* 剖面（單位 m，地面 y＝0）：地面 → cove（圓心 (11,3) 半徑 3）→ 牆 → 穹頂（圓心 (0,9) 半徑 14）。拆解時鏡頭最遠 9 m、牆半徑 14 m，鏡頭永遠在棚內；camera.far＝50 夠用 */
  const pts=[];[0,1,2.5,4.5,7,11].forEach(x=>pts.push(new THREE.Vector2(x,0)));
  for(let i=1;i<=8;i++){const a=i/8*Math.PI/2;pts.push(new THREE.Vector2(11+3*Math.sin(a),3-3*Math.cos(a)))}
  pts.push(new THREE.Vector2(14,9));
  for(let i=1;i<=8;i++){const a=i/8*Math.PI/2;pts.push(new THREE.Vector2(14*Math.cos(a),9+14*Math.sin(a)))}
  /* v199zzzzzz114：改用 ShaderMaterial 整段著色器（three 精簡版已補輸出 ShaderMaterial）。three 只補前綴（matrix uniform、GLSL3 轉換）並解析 #include <colorspace_fragment>；不受光、不吃色調映射 */
  const mat=new THREE.ShaderMaterial({uniforms:u,vertexShader:STU_VS,fragmentShader:STU_FS,side:THREE.BackSide,toneMapped:false,depthWrite:true});
  const mesh=new THREE.Mesh(new THREE.LatheGeometry(pts,64),mat);
  mesh.renderOrder=1;/* 其他不透明件為 0：車身先畫，被遮住的攝影棚像素由深度測試提早剔除 */mesh.frustumCulled=false;mesh.name='studio';scene.add(mesh);
  let box={bw:1.7,bh:1.0,cy:.5,rH:2.6},cur=STU_P.light,cOv={dark:{},light:{}},tw=null,from=null,live=false,ft=0,sw=0,sh=0,so=-1,sv=-1;
  const dv=new THREE.Vector2(),V=new THREE.Vector3(),gOK=()=>TIER==='hi'&&!SLOW,kick=n=>{if(live)wk(n)};/* wk 與 wake 在後面才宣告；開場前不呼叫 */
  setTimeout(()=>{live=true},0);
  function geom(){const D=14+box.rH;goal.hw=cur.kw*(box.bw/2)*D/box.rH;goal.hh=cur.kh*(box.bh/2)*D/box.rH;goal.hy=box.cy;goal.poolR=.6*box.bw;goal.barY=cur.barH*1.05*(box.bh/2)/box.rH;goal.barW=.36*box.bw/box.rH;goal.barT=.0032;u.uBc.value.set(box.cy,box.rH)}/* 燈條（切平面單位）：車頂上方約 0.05 倍車半高＋約 60 px、寬約 0.72 倍車長、厚約 6 px＠900 高 */
  function fill(){goal.hotK=cur.hotK;goal.poolK=cur.poolK;goal.frontK=cur.frontK;goal.vigR=cur.vigR;goal.vigK=cur.vigK;goal.grain=gOK()?cur.grain:0;goal.barK=cur.barK||0;goal.topL=cur.topL||0;goal.envK=cur.envK==null?1:cur.envK;goal.hemL=cur.hemL;goal.sunL=cur.sunL;goal.rimL=cur.rimL;goal.sunW=cur.sunTop?1:0}
  function lit(){rim.color.copy(RIM0).lerp(u.uGelA.value,u.uGelK.value*.75);/* v120f：色光背景時輪廓燈染色 1（PBR 件的邊緣光；matcap 車架不受燈光影響） */{const L=u.uTopL.value,W=u.uSunW.value,w=W*Math.min(1,L/.3);hemi.intensity=u.uHemL.value*Math.PI;rim.intensity=u.uRimL.value*Math.PI;LSun.lerpVectors(SUN0,SUNT,w);lyaw(LTH,1);sun.intensity=(u.uSunL.value+(L-u.uSunL.value)*w)*Math.PI;topL.intensity=L*(1-W)*Math.PI;topL.visible=topL.intensity>1e-3}/* v120i：sunW＝1 時主燈移到頂光位 (0,6,0.4)、強度＝頂光強度，第四盞關閉（燈數 3）；主題切換時 sunW 跟著補間，主燈位置與強度連續過渡；頂光強度 0～0.3 間主燈由原位過渡 *//* 0＝移出著色器燈光數（明亮主題不付頂光成本；切換時重編一次） */scene.environmentIntensity=u.uEnvK.value}/* 燈光跟著攝影棚補間（主題切換 350 ms） */
  function go(d){
    if(!(d>0)){Object.keys(NK).forEach(k=>{u[NK[k]].value=goal[k]});Object.keys(CKY).forEach(k=>u[CKY[k]].value.copy(goal[k]));tw=null;lit();kick(3);return}
    from={};Object.keys(NK).forEach(k=>{from[k]=u[NK[k]].value});Object.keys(CKY).forEach(k=>{from[k]=u[CKY[k]].value.clone()});tw={t0:performance.now(),d};kick(3)}
  function theme(first){
    cur=STU_P[isDark()?'dark':'light'];
    const cs=getComputedStyle(root),tk=n=>cs.getPropertyValue(n).trim()||cs.getPropertyValue('--stage-top').trim()||'#808080';
    const ov=cOv[isDark()?'dark':'light'];['top','mid','hot','floor','edge'].forEach(n=>goal[n].setStyle(ov[n]||tk('--studio-'+n)));goal.seam.setStyle(tk('--stage-bot'));
    fill();geom();go(first?0:350);if(!first)kick(30);if(api.ui)api.ui()}
  function fit(){
    if(G.exOn&&G.exOn())return;/* 拆解中維持現值 */
    try{api.nFit++;
      /* 包圍盒：可見網格的幾何包圍盒 8 角點轉世界座標（同 scCtr；只取 x、y） */
      const lo=[1e9,1e9],hi=[-1e9,-1e9];bike.updateWorldMatrix(true,true);
      bike.traverseVisible(o=>{if(!o.isMesh||!o.geometry)return;const g=o.geometry;if(!g.boundingBox)g.computeBoundingBox();const q=g.boundingBox;if(!q||!(q.max.x>=q.min.x))return;
        for(let k=0;k<8;k++){V.set(k&1?q.max.x:q.min.x,k&2?q.max.y:q.min.y,k&4?q.max.z:q.min.z).applyMatrix4(o.matrixWorld);lo[0]=Math.min(lo[0],V.x);lo[1]=Math.min(lo[1],V.y);hi[0]=Math.max(hi[0],V.x);hi[1]=Math.max(hi[1],V.y)}});
      if(hi[0]<lo[0])return;
      const rH=homeR();/* 首頁視角的鏡頭距離 */
      box={bw:hi[0]-lo[0],bh:hi[1]-lo[1],cy:(lo[1]+hi[1])/2,rH};api.box=box;geom();go(600)
    }catch(e){console.warn('studio fit',e)}}/* 攝影棚是裝飾，取景失敗不得拖垮主程式 */
  function tick(){
    if(tw){const k=Math.min(1,(performance.now()-tw.t0)/tw.d),e=1-Math.pow(1-k,3);
      for(const n in NK)u[NK[n]].value=from[n]+(goal[n]-from[n])*e;
      for(const n in CKY)u[CKY[n]].value.lerpColors(from[n],goal[n],e);
      lit();if(k>=1)tw=null;wk(3)}
    else{const g=gOK()?cur.grain:0;if(goal.grain!==g){goal.grain=g;u.uGrain.value=g;wk(2)}}/* 顆粒：mid／lo 層與慢機強制 0（探測結果晚於開場） */
    sync()}
  /* 螢幕空間項（暗角、接縫）的尺寸：繪圖緩衝與 ovPx 變了才寫。drawFrame 也呼叫一次——setRes（互動時降像素比）發生在 tick 之後、同一幀繪製之前，只靠 tick 會有一幀用舊尺寸（暗角閃一下） */
  function sync(){renderer.getDrawingBufferSize(dv);
    const pr=renderer.getPixelRatio(),vw=stage.clientWidth*pr,vh=stage.clientHeight*pr;
    if(dv.x!==sw||dv.y!==sh||vw!==so||vh!==sv){sw=dv.x;sh=dv.y;so=vw;sv=vh;u.uRes.value.set(Math.min(vw,sw)||sw,Math.min(vh,sh)||sh);u.uVc.value.set(u.uRes.value.x/2,sh-u.uRes.value.y/2);u.uSeamPx.value=0;u.uSeamW.value=0}}/* v115：畫布延伸到卡片底下，行動版接縫漸層不再需要（uSeam* 歸零＝關閉） */
  const api={mesh,u,P:STU_P,goal,nFit:0,box,theme,fit,tick,sync,lit,
    gel(on,a,b){const f=h=>{const c=new THREE.Color('#'+h),o={};c.getHSL(o);c.setHSL(o.h,Math.min(1,o.s*1.1+.1),.46);return c};/* 陽極色偏暗，提亮、提飽和成舞台色光 */
      if(on){goal.gelA.copy(f(a));goal.gelB.copy(f(b))}const k=on?1:0;if(goal.gelK===k&&(!on||(u.uGelA.value.equals(goal.gelA)&&u.uGelB.value.equals(goal.gelB))))return;/* v120j：兩色都比對（只換色 2 時原本會被略過） */goal.gelK=k;go(600)},
    fitSoon(){clearTimeout(ft);ft=setTimeout(fit,200)},
    busy:()=>!!tw,/* 測試用：補間是否進行中（swiftshader 約 0.5 fps，不能用固定秒數等補間） */
    setP(k,v){cur[k]=+v;if(k==='kw'||k==='kh'||k==='barH')geom();if(k==='seam')so=-1;fill();go(0)},
    /* v199zzzzzz113：試機用背景顏色（只改目前主題；覆蓋 CSS token，不寫回 CSS）。reset＝清掉覆蓋與數值回到 STU_P0 */
    setC(n,hex){cOv[isDark()?'dark':'light'][n]=hex;goal[n].setStyle(hex);u[CKY[n]].value.copy(goal[n]);tw=null;kick(3)},
    col(n){return '#'+goal[n].getHexString()},/* v116：讀目標色（goal）而非補間中的 uniform——切換明暗時 theme() 隨即呼叫 ui()，原本會讀到舊主題色，面板與 line() 輸出和實際對不起來（使用者 2026-11-19 回報） */
    reset(){const d=isDark()?'dark':'light';cOv[d]={};Object.assign(cur,STU_P0[d]);so=-1;theme(true)},/* 試機滑桿：只改目前主題那一組，即時套用 */
    line(){return (isDark()?'暗色':'明亮')+'：'+SR_KEYS.map(k=>k+' '+(+cur[k]).toFixed(k==='grain'?3:2)).join('｜')+'｜顏色 '+['top','mid','hot','floor','edge'].map(n=>n+' '+api.col(n)).join(' ')},
    read(x,y){drawFrame();const gl=renderer.getContext(),o=new Uint8Array(4);gl.readPixels(x,gl.drawingBufferHeight-1-y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,o);return[o[0],o[1],o[2],o[3]]},/* 測試用：同一個工作內 drawFrame＋readPixels（y 由上往下） */
    ui:null};
  theme(true);window.STU=api;return api})();
const mat=(c,m,r)=>{const x=new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r});x.color;return x};
/* 材質（PBR：非金屬 m≈0、金屬 m≈1；粗糙度依件別）。碳纖維用 MeshPhysicalMaterial＋清漆層（clearcoat）。 */
const matP=(c,m,r,o)=>new THREE.MeshPhysicalMaterial(Object.assign({color:c,metalness:m,roughness:r},o));
const AL_BK=[0x5e5d57,.62,.5];/* v199zzzzj：黑色鋁件單一來源（顏色、金屬度、粗糙度）；M.dark／M.alBk／分離把與龍頭／Shifter 撥片都用它。要整體調深淺只改這一行 */const M={ti:mat(0xC8C4B8,.92,.36),dark:mat(...AL_BK),carbon:matP(0x32312d,.15,.4,{clearcoat:.8,clearcoatRoughness:.1}),tire:mat(0x2d2c29,0,.92),wall:mat(0x8a6c47,0,.92),
  steel:mat(0xdedad0,1,.3),saddle:mat(0x3f3d39,.05,.6),tape:mat(0x514c42,0,.85),bottle:mat(0x3f6fa8,0,.38),bglt:mat(0xB85A28,.15,.55)};
const bike=new THREE.Group();scene.add(bike);M.ti.userData.frame=true;/* 車架材質旗標（clone 會繼承）；非車架的鈦件用 M.tiP */M.tiP=M.ti.clone();M.tiP.userData={};M.tiScr=M.tiP.clone();M.tiScr.userData={};M.tiFr=M.ti.clone();M.tiFr.side=THREE.DoubleSide;/* v199zzzzg：車架鈦（雙面、帶 frame 旗標）全車共用一個材質物件；頭管座管、上下管放樣、BB 殼、後叉勾爪（含 EX）、後下叉等原本各自 M.ti.clone()，建立後皆無個別修改 *//* v199zc：鈦螺絲（龍頭螺絲、水壺架螺絲）專用材質——客製分頁零透明度，不與 M.tiP（RD 鈦件等）共用，免得被共用材質的半透明旗標帶走 */
/* 材質校正（v54）：以球體試片在實際場景光照下量測渲染亮度（背景 74）——外胎 40＜黑色件 54＜碳纖 69＜座墊 75＜擋泥板 76＜把帶 95；金屬、鈦、胎壁、水壺、貨架不動 */
/* 外胎程序化貼圖（v49）：橡膠細顆粒 normal＋roughness；可平鋪、無檔案、約 1 MB GPU */
(()=>{const W=256,H=256,r=(()=>{let a=1234567;return()=>(a=(a*1664525+1013904223)>>>0)/4294967296})();
  const h=new Float32Array(W*H);for(let i=0;i<h.length;i++)h[i]=r();
  const blur=(src,k)=>{const o=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let t=0;for(let d=-k;d<=k;d++)t+=src[y*W+(x+d+W)%W];o[y*W+x]=t/(2*k+1)}const q=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let t=0;for(let d=-k;d<=k;d++)t+=o[((y+d+H)%H)*W+x];q[y*W+x]=t/(2*k+1)}return q};
  const f=blur(h,1),c=blur(h,4);const ht=new Float32Array(W*H);for(let i=0;i<ht.length;i++)ht[i]=f[i]*1.0+c[i]*2.2;
  const cn=document.createElement('canvas'),cr=document.createElement('canvas');cn.width=cr.width=W;cn.height=cr.height=H;
  const gn=cn.getContext('2d'),gr=cr.getContext('2d'),dn=gn.createImageData(W,H),dr=gr.createImageData(W,H),S=7;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const L=ht[y*W+(x+W-1)%W],R=ht[y*W+(x+1)%W],U=ht[((y+H-1)%H)*W+x],D=ht[((y+1)%H)*W+x];
    let nx=(L-R)*S,ny=(U-D)*S,nz=1;const l=Math.hypot(nx,ny,nz);nx/=l;ny/=l;nz/=l;const o=(y*W+x)*4;
    dn.data[o]=(nx*.5+.5)*255;dn.data[o+1]=(ny*.5+.5)*255;dn.data[o+2]=(nz*.5+.5)*255;dn.data[o+3]=255;
    const rv=Math.max(0,Math.min(1,.92+(ht[y*W+x]-1.6)*.35))*255;dr.data[o]=dr.data[o+1]=dr.data[o+2]=rv;dr.data[o+3]=255}
  gn.putImageData(dn,0,0);gr.putImageData(dr,0,0);
  [cn,cr].forEach((cv,i)=>{const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=1000;t.repeat.set(40,2);t.anisotropy=4;if(i===0)M.tire.normalMap=t,M.tire.normalScale=new THREE.Vector2(.4,.4);else M.tire.roughnessMap=t});
  M.tire.needsUpdate=true})();
const ST_IN=.88;/* 座管內孔比（佔外徑）。示意值，與實際壁厚無關。宣告須早於下方 T.ST 旋轉體建構 */
const UCYL=new THREE.CylinderGeometry(1,1,1,96,1);
function mkTube(m){const x=new THREE.Mesh(UCYL,m);bike.add(x);return x}
function setTube(m,a,b,r,r2){const len=a.distanceTo(b)||1e-4;m.position.copy(a).add(b).multiplyScalar(.5);m.scale.set(r,len,r);
  m.quaternion.setFromUnitVectors(new V3(0,1,0),b.clone().sub(a).normalize())}
const T={};['TT','DT','ST','HT','CSL','CSR','SSL','SSR','FKL','FKR','steer','stem','post','collar'].forEach(k=>{
  const m={FKL:M.carbon,FKR:M.carbon,steer:M.dark,stem:M.dark,post:M.carbon}[k]||M.ti;T[k]=mkTube(m)});
/* ===== v199zzzv：頭管依使用者 2026-11-11 剖面圖（FSA No.55R 1.5"/CR/STD，B01BT1070AG，所有車款 M 尺寸）重建。外形（mm）：兩端環外徑 Ø55.6，上端環長 8.7、下端環長 10；中段（腰）外徑 Ø50.8、壁厚 1.5（內徑 Ø47.8）；端環內孔 Ø52（碗座孔，深度＝端環長）；端環到腰之間為內凹圓弧過渡（圖面量測：上約 21.8、下約 20.9 mm，±1，圖面未標尺寸）。長度 L 依各車款／尺寸。幾何以實際長度（m）建，半徑除以 RADS.ht（＝腰半徑 25.4 mm）、y 除以長度，仍用 setTube 縮放。 */
var HT_END_R=.0278;
function htGeom(Lm){const L=Lm*1e3,Rm=25.4,Re=27.8,Ri=26,Rb=23.9,rt=8.7,rb=10;let tT=21.8,tB=20.9;const k=Math.min(1,Math.max(.2,(L-rt-rb-2)/(tT+tB)));tT*=k;tB*=k;
  const q=(r,z)=>new THREE.Vector2(r/Rm,z/L-.5),P=[q(Re,0),q(Re,rb)],N=14;
  for(let i=1;i<=N;i++){const t=i/N;P.push(q(Rm+(Re-Rm)*(1-t)*(1-t),rb+tB*t))}
  for(let i=N-1;i>=0;i--){const t=i/N;P.push(q(Rm+(Re-Rm)*(1-t)*(1-t),L-rt-tT*t))}
  P.push(q(Re,L-rt),q(Re,L),q(Ri,L),q(Ri,L-rt),q(Rb,L-rt),q(Rb,rb),q(Ri,rb),q(Ri,0),q(Re,0));
  return new THREE.LatheGeometry(P,144)}
function htSet(Lm){if(Math.abs((T.HT.userData.hl||0)-Lm)>2e-5){const o=T.HT.geometry;T.HT.geometry=htGeom(Lm);T.HT.userData.hl=Lm;o.dispose()}}
/* 頭管、座管：頭管見 htGeom（v199zzzv 起依剖面圖）；座管內孔半徑為外徑 88%；材質為雙面鈦色 */
(function(){const tm=M.tiFr;
  T.HT.geometry=htGeom(.15);T.HT.userData.hl=.15;T.HT.material=tm;
  T.ST.geometry=new THREE.LatheGeometry([[1,-.5],[1,.5],[ST_IN,.5],[ST_IN,-.5],[1,-.5]].map(p=>new THREE.Vector2(p[0],p[1])),144);T.ST.material=tm;T.ST.userData.g0=T.ST.geometry;T.ST.userData.gq=ST_IN;
  /* 座管束環：中空（內孔＝座管內孔） */
  T.collar.geometry=new THREE.LatheGeometry([[1,-.38],[1,.38],[.88,.5],[.78,.5],[.73,.45],[.73,-.45],[.78,-.5],[.88,-.5],[1,-.38]].map(p=>new THREE.Vector2(p[0],p[1])),144);T.collar.material=tm;
  /* 上管、下管、後上叉：自訂幾何，端面依相接管（頭管／座管）外壁裁切成魚口形，不穿入內孔 */
  ['TT','DT','SSL','SSR'].forEach(k=>{const g=new THREE.BufferGeometry(),N=48,idx=[];g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(2*N*3),3));
    for(let i=0;i<N;i++){const j=(i+1)%N;idx.push(i,j,N+i,j,N+j,N+i)}g.setIndex(idx);
    T[k].geometry=g;T[k].material=tm;T[k].frustumCulled=false;T[k].position.set(0,0,0);T[k].scale.set(1,1,1);T[k].quaternion.identity();})})();
/* 前叉：叉腿由 STEP（Fork.stp）實測截面放樣（沿轉向管軸每 6–12 mm 一站、每站 32 點，叉腿錐度與前傾取自實測）；叉冠＝以叉腿頂端截面外形掃過 180° 圓拱接成一體，頸部為短圓柱。
   局部座標 (a=沿轉向管軸向下、p=前後、l=左右，單位 mm，a 由叉冠頂面起算)。每次 applyNodes 只更新一個矩陣（叉冠頂面對 HTb、軸向縮放使軸心對 FA、剪切吸收偏移量差）。資料單位 0.1 mm。 */
/* v199zzzzzz31：叉腿中心線——前視（橫向 cl）改為連接兩端的直線（原資料 S 形起伏最大約 1.5 mm）；側視（cp）三次曲線平滑，末端中心線以線性分攤落在軸心（原 DY·smo 在末端 80 mm 內加 6.3 mm 位移造成末段內彎／前凸，現資料末列 cp＝軸心，DY＝0） */
/* v199zzzzzz32：叉腿側視中心線 cp 改為連接兩端的直線（v31 為三次曲線平滑，與直線最大差 3.75 mm；起點 cp 不動，叉肩定位不變，末端＝軸心） */
const FK=VIBE_D.FK;
(function(){const NR=32,pts=[],cap=[];const L=FK.legs,top=L[L.length-1===0?0:0];
  const st=r=>{const a=r[0],cl=r[1]/10,cp=r[2]/10,out=[];for(let k=0;k<NR;k++){out.push({a,cp,cl,r:r[3+k]/10,ph:k/NR*2*Math.PI})}return out};
  const ring=(f)=>{const q=[];for(let k=0;k<NR;k++)q.push(f(k,k/NR*2*Math.PI));pts.push(q)};
  const rev=L.slice().reverse();                    /* 由軸心端往叉冠端 */
  /* 叉腿下端（v52，仿曲柄臂端）：末端延伸到軸心外 EXT mm，於叉腿平面內收成圓弧（y 方向以 sqrt(1−t²) 縮向軸心線，側面維持平面）；貫通軸孔以兩面深色孔面＋亮環示意 */
  const EXT=12,TH=[0,10,20,30,40,50,60,70,80,90].map(d=>d*Math.PI/180),YH=FK.rk,LE=L[L.length-1],DY=YH-LE[2]/10,smo=a=>{const t=Math.max(0,Math.min(1,(a-312)/80));return t*t*(3-2*t)},legRing=(r,da,sc,sg)=>ring((k,ph)=>{const rr=r[3+k]/10,y=r[2]/10+rr*Math.sin(ph)+DY*smo(r[0]);return [r[0]+da,YH+(y-YH)*sc,sg*(r[1]/10+rr*Math.cos(ph))]});/* 末端 80 mm 內把叉腿中心線 y 平順移到軸心（舊資料末端偏離軸心約 6 mm）*/
  rev.forEach((r,i)=>{if(i===0)TH.slice().reverse().forEach(t=>legRing(r,EXT*Math.sin(t),Math.cos(t),1));else legRing(r,0,1,1)});
  const t0=L[0],R=-t0[1]/10,a0=t0[0],l0=t0[1]/10,cp0=t0[2]/10,NA=24,Hh=a0-2;/* 橢圓拱：頂點中心線在 la'=2；拱厚度在頂點收到 75%，叉冠下緣離外胎至少約 6 mm；叉腿上段依外胎寬度外張 8 mm（隨高度遞減）*/
  for(let j=1;j<NA;j++){const th=j/NA*Math.PI,ac=a0-Hh*Math.sin(th),lc=l0+R-R*Math.cos(th),nn=Math.hypot(Hh*Math.cos(th),R*Math.sin(th)),na=R*Math.sin(th)/nn,nl=Hh*Math.cos(th)/nn,fn=1-.25*Math.sin(th);
    ring((k,ph)=>{const r=t0[3+k]/10;return [ac+r*fn*Math.cos(ph)*na,cp0+r*Math.sin(ph),lc+r*fn*Math.cos(ph)*nl]})}
  L.forEach((r,i)=>{if(i===L.length-1)TH.forEach(t=>legRing(r,EXT*Math.sin(t),Math.cos(t),-1));else legRing(r,0,1,-1)});
  const P=[],I=[],N=pts.length;pts.forEach(q=>q.forEach(v=>P.push(v[0]*1e-3,v[1]*1e-3,v[2]*1e-3)));
  for(let i=0;i<N-1;i++)for(let k=0;k<NR;k++){const q=i*NR+k,w=i*NR+(k+1)%NR,x=(i+1)*NR+k,y=(i+1)*NR+(k+1)%NR;I.push(q,w,x,w,y,x)}
  [[0,0],[N-1,1]].forEach(([i,e])=>{const c=[0,0,0];pts[i].forEach(v=>{c[0]+=v[0]/NR;c[1]+=v[1]/NR;c[2]+=v[2]/NR});const ci=P.length/3;P.push(c[0]*1e-3,c[1]*1e-3,c[2]*1e-3);for(let k=0;k<NR;k++){const q=i*NR+k,w=i*NR+(k+1)%NR;e?I.push(ci,w,q):I.push(ci,q,w)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setIndex(I);g.computeVertexNormals();
  const m=T.FKL;m.geometry=g;
  {const mH=new THREE.MeshBasicMaterial({color:0x0c0b09,side:THREE.DoubleSide}),mRg=M.steel.clone();mRg.side=THREE.DoubleSide;mH.polygonOffset=true;mH.polygonOffsetFactor=-4;mH.polygonOffsetUnits=-4;mRg.polygonOffset=true;mRg.polygonOffsetFactor=-4;mRg.polygonOffsetUnits=-4;const last=L[L.length-1],HZ=[[81.6,1],[53.2,1],[-81.6,-1],[-53.2,-1]];
    HZ.forEach(([z,sg])=>{const d=new THREE.Mesh(new THREE.RingGeometry(0,.0062,32),mH);d.position.set(last[0]*1e-3,YH*1e-3,z*1e-3);d.matrixAutoUpdate=true;m.add(d);
      const rg=new THREE.Mesh(new THREE.TorusGeometry(.0072,.0008,8,40),mRg);rg.position.copy(d.position);m.add(rg)})}
m.material=M.carbon.clone();m.material.side=THREE.DoubleSide;m.frustumCulled=false;m.matrixAutoUpdate=false;T.FKR.visible=false;
  })();
/* 碗組：上碗在頭管上端、下碗在頭管下端；每次 applyNodes 依 HTt／HTb 與轉向管軸更新 */
const HSm=M.carbon.clone();HSm.side=THREE.DoubleSide;/* 與前叉同材質同色 */
const HSu=new THREE.Mesh(rgeo(.0232,.014,.003,40),HSm),HSl=new THREE.Mesh(rgeo(.0232,.016,.003,40),HSm);const HSn=new THREE.Mesh(new THREE.CylinderGeometry(.0158,.0158,.02,28),HSm);bike.add(HSu);bike.add(HSl);bike.add(HSn);const hsDM=()=>new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:THREE.DoubleSide,toneMapped:false}),HSuD=new THREE.Mesh(new THREE.BufferGeometry(),hsDM()),HSlD=new THREE.Mesh(new THREE.BufferGeometry(),hsDM());bike.add(HSuD);bike.add(HSlD);HSuD.visible=HSlD.visible=false;[HSu,HSl,HSn,HSuD,HSlD].forEach(m=>m.userData.keepOpaque=true);T.collar.userData.keepOpaque=true;/* v170：客製分頁零組件半透明（partAlpha）略過座管束與碗組，同車架本體 */
function hsDonut(R,h){const a=h/2,ri=.0155,e=.0012,P=[[ri+e,-a],[R-a,-a]];for(let i=1;i<=16;i++){const th=-Math.PI/2+Math.PI*i/16;P.push([R-a+a*Math.cos(th),a*Math.sin(th)])}P.push([ri+e,a],[ri,a-e],[ri,-a+e],[ri+e,-a]);return new THREE.LatheGeometry(P.map(p=>new THREE.Vector2(p[0],p[1])),72)}
function hsRing(R,h,ri){const a=h/2,P=[[ri,-a],[R-a,-a]];for(let i=1;i<=12;i++){const th=-Math.PI/2+Math.PI*i/12;P.push([R-a+a*Math.cos(th),a*Math.sin(th)])}P.push([ri,a],[ri,-a]);return new THREE.LatheGeometry(P.map(p=>new THREE.Vector2(p[0],p[1])),72)}/* v199k：全隱藏式下冠座（NECO H02 圖面：露出 1 mm） */
function hsCap(R,h,ri){const a=h/2,Rt=Math.max(R*.78,ri+.0035),y0=-a+.0015,y1=a-.001,P=[[ri,-a],[R,-a],[R,y0]];for(let i=1;i<=10;i++){const s=i/10,e=s*s*(3-2*s);P.push([R-(R-Rt)*e,y0+(y1-y0)*s])}P.push([Rt-.0006,a-.0003],[Rt-.0016,a],[ri+.0012,a],[ri,a-.0012],[ri,-a]);return new THREE.LatheGeometry(P.map(p=>new THREE.Vector2(p[0],p[1])),72)}/* v199k：全隱藏式上蓋（NECO H02：頭管上端外露 9.5 mm，底徑＝頭管端徑、頂徑約 .78 倍，S 形收口；高 10 mm 含 .5 mm 埋入頭管） */
function hsDecalGeo(R,h){const a=h/2,r=a+.00015,N=14,P=[];for(let j=0;j<=N;j++){const th=(-52+104*j/N)*Math.PI/180;P.push(new THREE.Vector2(R-a+r*Math.cos(th),r*Math.sin(th)))}return new THREE.LatheGeometry(P,96)}
function hsDecalTex(R,h,deg){const a=h/2,B=a*104*Math.PI/180*1000,Pm=2*Math.PI*R*1000/4,W=1024,Hh=256,cv=document.createElement('canvas');cv.width=W;cv.height=Hh;const g=cv.getContext('2d'),capMm=h*1000*.54,hp=Hh*capMm/B,fs=hp/.716;g.font='900 '+fs+'px "Arial Black","Helvetica Neue",Arial,sans-serif';g.textAlign='left';g.textBaseline='alphabetic';const ch=['K','I','N','G'],trk=-fs*.14,ws=ch.map(c=>g.measureText(c).width),w0=ws.reduce((s,x)=>s+x,0)+trk*3,kx=(capMm*3.48/(Pm/W))/w0;g.fillStyle='#c8c4b8';g.save();g.translate(W/2,Hh/2+hp/2);g.scale(kx,1);g.transform(1,0,-.36,1,0,0);let x=-w0/2;for(let i=0;i<4;i++){g.fillText(ch[i],x,0);x+=ws[i]+trk}g.restore();const t=new THREE.CanvasTexture(cv);t.wrapS=THREE.RepeatWrapping;t.repeat.set(4,1);t.offset.set(.5+(deg||0)/90,0);t.anisotropy=4;t.colorSpace=THREE.SRGBColorSpace;return t}/* v199l：KING 改逐字繪製、字距 −7.5% 字高（無字母間距）、斜體用 −.22 剪切（不依賴字型有無斜體）；貼圖以 deg 繞轉向管軸旋轉（4 份貼字週期 90°，故以 90° 為模，上碗與下碗各用不同角度） */
const HS_DEG_U=23,HS_DEG_L=61;/* v199l：上碗、下碗 KING 貼字繞軸心的旋轉角（度，模 90），兩者不同以模擬實物不對齊 */
function hsDecSet(m,R,h,deg){m.geometry.dispose();m.geometry=hsDecalGeo(R,h);if(m.material.map)m.material.map.dispose();m.material.map=hsDecalTex(R,h,deg);m.material.needsUpdate=true}
function setHeadset(t,b,u,rTop){const q=new THREE.Quaternion().setFromUnitVectors(new V3(0,1,0),u.clone().negate());[HSu,HSl,HSn,HSuD,HSlD].forEach(m=>m.quaternion.copy(q));const hid=hsT()==='hid';
  if(rTop){const key=(hid?'h':'e')+rTop;if(HSu.userData.rg!==key){HSu.geometry.dispose();HSl.geometry.dispose();if(hid){HSu.geometry=hsCap(rTop,.010,.0155);HSl.geometry=hsRing(rTop,.002,.0155)}else{HSu.geometry=hsDonut(rTop*1.05,.014);HSl.geometry=hsDonut(rTop*1.05,.016);hsDecSet(HSuD,rTop*1.05,.014,HS_DEG_U);hsDecSet(HSlD,rTop*1.05,.016,HS_DEG_L)}HSu.userData.rg=key;HSu.scale.set(1,1,1);HSl.scale.set(1,1,1)}}
  HSuD.visible=HSlD.visible=!hid;HSn.visible=!hid;
  if(hid){HSu.position.copy(t).addScaledVector(u,-.0045);HSl.position.copy(b).addScaledVector(u,-.0005)}else{HSu.position.copy(t).addScaledVector(u,-.0065);HSl.position.copy(b).addScaledVector(u,-.0075);HSn.position.copy(b).addScaledVector(u,-.008)}
  HSuD.position.copy(HSu.position);HSlD.position.copy(HSl.position);
  /* v199k：全隱藏式——上蓋頂面在頭管上端 +9.5 mm、頭管下端距叉冠頂面 1 mm（下冠座露出）、無壓環；外露式＝v170 起原配置（上碗 14、下碗 16、壓環）加 KING 貼字。上碗外徑：外露＝頭管端徑×1.05，隱藏＝頭管端徑 */}/* v170：下碗在頭管下端（已縮短 15 mm）與叉冠頂面（HTb）之間；壓環移入下碗內 */
function setFork(m,S,E,u,rht){const R=new V3(-u.y,u.x,0).normalize(),d=E.clone().sub(S),Lm=d.dot(u),rk=d.dot(R),k=Lm/(FK.Ls*1e-3),dl=rk-FK.rk*1e-3,c0x=u.x*k+R.x*dl/(FK.Ls*1e-3),c0y=u.y*k+R.y*dl/(FK.Ls*1e-3);
  /* 以前輪軸心 E 為圓心向後旋轉 δ，使叉肩前緣與頭管側面對齊：δ＝(叉肩前緣−頭管外半徑)／軸心到叉肩距離 */
  const t0=FK.legs[0],fr=(t0[2]+t0[3+8])/10*1e-3+dl*(t0[0]/FK.Ls),Dn=Lm*(1-t0[0]/FK.Ls),dd=.75*Math.max(0,Math.min(.06,(fr-rht)/Dn)),c=Math.cos(dd),sn=Math.sin(dd);
  const rx=(x,y)=>c*x-sn*y,ry=(x,y)=>sn*x+c*y,tx=S.x-E.x,ty=S.y-E.y;
  m.matrix.set(rx(c0x,c0y),rx(R.x,R.y),0,E.x+rx(tx,ty), ry(c0x,c0y),ry(R.x,R.y),0,E.y+ry(tx,ty), 0,0,1,0, 0,0,0,1);m.matrixWorldNeedsUpdate=true}
/* ===== 325Ti 異型管放樣（資料：STEP 實測，MASTER_325.stp M 尺寸；見資料表「異型管截面」） ===== */
let model='64',selM='64';
const LOFT=VIBE_D.LOFT;
/* ===== EX 車架實測資料（資料來源：EX_Frame.stp，M 尺寸；Rhino 7.38 匯出，原點＝中軸中心） =====
 * LOFTEX：上管 TT、下管 DT 異型斷面（同 LOFT 格式）；EXST：下叉 cs、後上叉 ss 中心線與斷面（ss 自 v48 起取自 EX_Upper_CS.stp：ø16 圓管，直管段用 STEP 圓柱軸線、兩處彎管用平面切片；斷面寬高＝16），列＝[Y(向前為正), X(橫向), Z(向上), 斷面寬, 斷面高] */
const LOFTEX=VIBE_D.LOFTEX;
const EXST={"cs":[[-5,16,0,15,28],[-30.0,21.9,2.4,15.3,28.4],[-40.0,27.2,4.9,14.7,28.4],[-50.0,31.9,7.5,14.0,28.4],[-60.0,35.8,9.4,13.3,28.4],[-70.0,39.0,11.3,12.8,28.4],[-80.0,41.5,13.7,12.3,28.4],[-90.0,42.7,16.2,11.9,28.4],[-100.0,42.8,19.5,12.0,28.4],[-110.0,42.3,22.7,12.6,28.4],[-120.0,42.5,25.2,14.4,28.3],[-130.0,43.5,27.7,16.4,28.1],[-139.3,44.0,30.2,17.0,27.0],[-151.0,44.0,33.1,17.0,27.0],[-162.6,44.0,36.1,17.0,27.0],[-174.2,44.0,39.0,17.0,27.0],[-185.9,44.1,42.0,17.0,27.0],[-197.5,45.4,44.9,17.0,27.0],[-208.9,47.6,47.8,17.0,26.9],[-220.3,49.9,50.7,17.0,26.8],[-231.7,52.2,53.6,17.0,26.5],[-243.1,54.5,56.5,16.9,26.2],[-254.5,56.8,59.4,16.9,25.7],[-265.9,59.2,62.3,16.8,25.2],[-277.4,61.5,65.2,16.8,24.6],[-288.8,63.9,68.0,16.7,24.3],[-300.9,66.3,69.5,16.6,19.8],[-311.9,68.6,74.0,16.6,22.3],[-323.3,70.9,76.9,16.5,21.4],[-334.7,73.3,79.8,16.4,20.5],[-346.1,75.7,82.7,16.3,19.6],[-357.5,78.0,85.6,16.2,18.6],[-361.3,78.8,86.5,16.2,18.4],[-365.2,79.6,87.4,16.2,18.3],[-369.0,80.4,88.3,16.2,19.9],[-373.2,81.3,88.9,16.1,17.2],[-377.1,82.1,88.8,16.1,13.7],[-386.0,83.9,86.8,14.5,4.0]],"ss":[[-95.57,11.0,314.72,16,16],[-103.12,18.82,309.69,16,16],[-110.66,26.64,304.66,16,16],[-111.95,27.87,303.76,16,16],[-114.57,30.35,302.01,16,16],[-117.27,32.68,300.21,16,16],[-120.05,34.89,298.36,16,16],[-122.9,36.97,296.46,16,16],[-125.81,38.9,294.52,16,16],[-128.78,40.7,292.53,16,16],[-131.82,42.35,290.51,16,16],[-134.9,43.85,288.45,16,16],[-138.03,45.21,286.36,16,16],[-141.21,46.41,284.25,16,16],[-144.42,47.46,282.1,16,16],[-147.66,48.42,279.95,16,16],[-164.16,52.45,268.93,16,16],[-180.67,56.48,257.92,16,16],[-197.17,60.51,246.9,16,16],[-213.68,64.54,235.88,16,16],[-230.18,68.57,224.86,16,16],[-246.69,72.6,213.85,16,16],[-263.2,76.63,202.83,16,16],[-279.7,80.66,191.81,16,16],[-281.37,81.0,190.76,16,16],[-284.66,81.61,188.57,16,16],[-287.97,82.06,186.36,16,16],[-291.29,82.35,184.14,16,16],[-292.94,82.5,183.01,16,16],[-308.98,82.5,172.31,16,16],[-325.03,82.5,161.61,16,16],[-341.07,82.5,150.9,16,16],[-357.12,82.5,140.2,16,16],[-373.16,82.5,129.5,16,16],[-386.0,82.5,120.96,16,16]]};
/* v199zzzzzz27：EX 後下叉中心線與斷面實測列（EXST.cs）平順化。原 38 列含離群值（如 y=-300.9：高 19.8、垂直偏移 69.5 與前後不連續）且列距約 11 mm，折線放樣在側視輪廓與陰影出現凹陷與折角。
   作法：(1) 以前後兩列線性預測剔除離群值；(2) 區間內（第 1 列到尾端收口前）以 y 向高斯核（σ 14 mm）平滑，頭尾與收口列不動；(3) 區間以自然三次樣條重取樣為 3 mm 一列；收口段原列接在後面。 */
function exCsSmooth(rows){
  const n=rows.length,R=rows.map(r=>r.slice()),tol=[0,0,1.2,1.2,1.2,1.5];
  let kEnd=0;for(let i=0;i<n;i++)if(R[i][0]>-358)kEnd=i;
  /* (1) 離群值：欄 1 側向位置、2 垂直偏移、3 寬、4 高 */
  for(let c=1;c<=4;c++){const t=c===1?1.2:c===2?1.2:c===3?1.2:1.5;
    for(let i=2;i<n-2;i++){const a=R[i-1],b=R[i+1],f=(R[i][0]-a[0])/(b[0]-a[0]),p=a[c]+(b[c]-a[c])*f;if(Math.abs(R[i][c]-p)>t)R[i][c]=p}}
  /* (2) 高斯平滑（不動第 0 列與第 kEnd 列） */
  const S=R.map(r=>r.slice()),sg=14;
  for(let c=1;c<=4;c++)for(let i=1;i<kEnd;i++){let w=0,v=0;for(let k=0;k<=kEnd;k++){const d=(R[k][0]-R[i][0])/sg;if(Math.abs(d)>3)continue;const g=Math.exp(-d*d/2);w+=g;v+=g*R[k][c]}S[i][c]=v/w}
  /* (3) 自然三次樣條重取樣（以 -y 為自變數） */
  const xs=[];for(let i=0;i<=kEnd;i++)xs.push(-S[i][0]);
  const spline=c=>{const m=xs.length,y=S.slice(0,m).map(r=>r[c]),h=[],al=[0],l=[1],mu=[0],z=[0],cc=new Array(m).fill(0),b=[],d=[];
    for(let i=0;i<m-1;i++)h[i]=xs[i+1]-xs[i];
    for(let i=1;i<m-1;i++){al[i]=3/h[i]*(y[i+1]-y[i])-3/h[i-1]*(y[i]-y[i-1]);l[i]=2*(xs[i+1]-xs[i-1])-h[i-1]*mu[i-1];mu[i]=h[i]/l[i];z[i]=(al[i]-h[i-1]*z[i-1])/l[i]}
    for(let j=m-2;j>=0;j--){cc[j]=z[j]-mu[j]*cc[j+1];b[j]=(y[j+1]-y[j])/h[j]-h[j]*(cc[j+1]+2*cc[j])/3;d[j]=(cc[j+1]-cc[j])/(3*h[j])}
    return x=>{let j=0;while(j<m-2&&x>xs[j+1])j++;const t=x-xs[j];return y[j]+b[j]*t+cc[j]*t*t+d[j]*t*t*t}};
  const f=[1,2,3,4].map(c=>spline(c)),out=[],step=3,x0=xs[0],x1=xs[xs.length-1];
  const cnt=Math.round((x1-x0)/step);
  for(let k=0;k<=cnt;k++){const x=x0+(x1-x0)*k/cnt;out.push([-x,f[0](x),f[1](x),f[2](x),f[3](x)])}
  for(let i=kEnd+1;i<n;i++)out.push(R[i].slice());
  out[0]=rows[0].slice();
  return out}
EXST.cs=exCsSmooth(EXST.cs);
/* v199zzzzzz31：站位新增 .875（EX 下管接頭段的彎曲需要更密的站）；EX 下管 DT 資料改取自使用者 2026-11-13 提供的 EX_DT.stp（本體 f≤.9 為實測斷面，f≥.925 以 STEP 末端斷面沿末端切線外推，交由頭管圓柱 trimAlong 修齊） */
const LF=[0,.1,.2,.3,.4,.5,.6,.7,.8,.85,.875,.9,.925,.95,.975,1],LN=32;
function loftRing(t,f){const s=t.st,n=s.length;let i=0;while(i<n-2&&f>s[i+1].f)i++;const a=s[i],b=s[i+1],k=(f-a.f)/(b.f-a.f);
  return{vc:a.vc+(b.vc-a.vc)*k,r:a.r.map((x,j)=>Math.max(1,x+(b.r[j]-x)*k))}}
function loftPositions(t,ax,ay,bx,by,out){const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy)||1e-4,ux=dx/L,uy=dy/L,px=-uy,py=ux;let q=0;
  LF.forEach(f=>{const g=loftRing(t,f),cx=ax+dx*f+px*g.vc/1000,cy=ay+dy*f+py*g.vc/1000;
    for(let j=0;j<LN;j++){const th=(-180+11.25*j)*Math.PI/180,r=g.r[j]/1000,u=r*Math.cos(th),w=r*Math.sin(th);
      out[q++]=cx+px*w;out[q++]=cy+py*w;out[q++]=u}})}
const loft={};(function(){const lm=M.tiFr;
  ['TT','DT'].forEach(k=>{const g=new THREE.BufferGeometry(),n=LF.length*LN,idx=[];
    for(let i=0;i<LF.length-1;i++)for(let j=0;j<LN;j++){const a=i*LN+j,b=i*LN+(j+1)%LN,c=(i+1)*LN+j,d=(i+1)*LN+(j+1)%LN;idx.push(a,b,c,b,d,c)}
    g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));g.setIndex(idx);
    const m=new THREE.Mesh(g,lm);m.frustumCulled=false;m.visible=false;bike.add(m);loft[k]=m})})();
function updateLoft(k,a,b,sC,eC){const g=loft[k].geometry,p=g.attributes.position;loftPositions((model==='ex'?LOFTEX:LOFT)[k],a.x,a.y,b.x,b.y,p.array);
  const arr=p.array,u=new V3(b.x-a.x,b.y-a.y,0).normalize(),ring=(ri,C,w)=>{if(!C)return;for(let j=0;j<LN;j++){const o=(ri*LN+j)*3,pt=new V3(arr[o],arr[o+1],arr[o+2]),sd=trimAlong(pt,w,C);arr[o]+=w.x*sd;arr[o+1]+=w.y*sd;arr[o+2]+=w.z*sd}};
  ring(0,sC,u);
  if(k==='DT'&&model==='ex'&&eC){/* v199zzzzzz31：EX 下管被頭管截斷——每條縱線（LN 條）自 f≥.8 起找第一次進入頭管圓柱的交點（相鄰兩站間二分），之後各站全部收斂到交點，交線環存 G.dtHtRing 供焊道；整條線都沒進入者（罕見）沿用末環 trimAlong */
    G.dtHtRing=G.dtHtRing||new Float32Array(LN*3);const A=eC.A,dd=eC.d,R=eC.R,NR=LF.length,i0=LF.findIndex(f=>f>=.8),
      dist=(x,y,z)=>{const qx=x-A.x,qy=y-A.y,qz=z-A.z,t=qx*dd.x+qy*dd.y+qz*dd.z;return Math.hypot(qx-t*dd.x,qy-t*dd.y,qz-t*dd.z)};
    for(let j=0;j<LN;j++){let hit=-1;for(let i=i0;i<NR;i++){const o=(i*LN+j)*3;if(dist(arr[o],arr[o+1],arr[o+2])<R){hit=i;break}}
      let X;if(hit>i0){const o0=((hit-1)*LN+j)*3,o1=(hit*LN+j)*3;let lo=0,hi=1;
        for(let it=0;it<24;it++){const m=(lo+hi)/2;if(dist(arr[o0]+(arr[o1]-arr[o0])*m,arr[o0+1]+(arr[o1+1]-arr[o0+1])*m,arr[o0+2]+(arr[o1+2]-arr[o0+2])*m)<R)hi=m;else lo=m}
        X=[arr[o0]+(arr[o1]-arr[o0])*hi,arr[o0+1]+(arr[o1+1]-arr[o0+1])*hi,arr[o0+2]+(arr[o1+2]-arr[o0+2])*hi];
        for(let i=hit;i<NR;i++){const o=(i*LN+j)*3;arr[o]=X[0];arr[o+1]=X[1];arr[o+2]=X[2]}}
      else{const o=((NR-1)*LN+j)*3,w=u.clone().negate(),pt=new V3(arr[o],arr[o+1],arr[o+2]),sd=trimAlong(pt,w,eC);arr[o]+=w.x*sd;arr[o+1]+=w.y*sd;arr[o+2]+=w.z*sd;X=[arr[o],arr[o+1],arr[o+2]]}
      G.dtHtRing[j*3]=X[0];G.dtHtRing[j*3+1]=X[1];G.dtHtRing[j*3+2]=X[2]}}
  else ring(LF.length-1,eC,u.clone().negate());p.needsUpdate=true;g.computeVertexNormals()}
let LOFTON=false;
function grp(){const g=new THREE.Group();bike.add(g);return g}
/* 圓柱體導角：rgeo＝兩端倒圓的旋轉體（軸向 y；f＝軸向圓角、fr＝徑向圓角，預設同 f）；zc 預設自動導角，傳 0 則不導角（用於與曲線管相接處） */
function rgeo(r,len,f,seg,fr){f=Math.max(0,Math.min(f,len*.45));fr=Math.max(0,Math.min(fr==null?f:fr,r*.9));seg=seg||64;if(f<1e-7||fr<1e-7)return new THREE.CylinderGeometry(r,r,len,seg);
  const h=len/2,p=[new THREE.Vector2(0,-h),new THREE.Vector2(r-fr,-h)];
  for(let k=1;k<=5;k++){const a=k/5*Math.PI/2;p.push(new THREE.Vector2(r-fr+fr*Math.sin(a),-h+f-f*Math.cos(a)))}
  for(let k=0;k<=5;k++){const a=k/5*Math.PI/2;p.push(new THREE.Vector2(r-fr+fr*Math.cos(a),h-f+f*Math.sin(a)))}
  p.push(new THREE.Vector2(0,h));return new THREE.LatheGeometry(p,seg)}
function zc(g,r,len,m,z,f){const sg=r<.012?32:r<.025?64:96,x=new THREE.Mesh(f===0?new THREE.CylinderGeometry(r,r,len,64):rgeo(r,len,f==null?Math.min(r*.28,len*.4,.0025):f,sg),m);x.rotation.x=Math.PI/2;if(z)x.position.z=z;g.add(x);return x}
function setTubeR(m,a,b,r,f){const len=a.distanceTo(b)||1e-4,k=r.toFixed(5)+'|'+len.toFixed(4);
  if(m.userData.gk!==k){if(m.userData.own)m.geometry.dispose();m.geometry=rgeo(r,len,f==null?Math.min(r*.3,.003):f,r<.006?10:r<.012?14:20);m.userData.gk=k;m.userData.own=true}
  m.position.copy(a).add(b).multiplyScalar(.5);m.scale.set(1,1,1);m.quaternion.setFromUnitVectors(new V3(0,1,0),b.clone().sub(a).normalize())}
function bx(g,s,m,p,rz){const x=new THREE.Mesh(new THREE.BoxGeometry(...s),m);if(p)x.position.set(...p);if(rz)x.rotation.z=rz;g.add(x);return x}
// 中軸／曲柄
const G={};G.bb=grp();(function(){const bm=M.tiFr;const h=.0365,pr=[[.0325,-h],[.0325,h],[.0235,h],[.0235,-h],[.0325,-h]]/* v182：殼內徑 ø47（BB 杯螺紋 T47）、壁厚 9 mm（BB 杯 ø47 與 ø29 孔之間）→ 外徑 ø65；原 ø67.6／ø46.4（壁 10.6） */;
  const sh=new THREE.Mesh(new THREE.LatheGeometry(pr.map(p=>new THREE.Vector2(p[0],p[1])),96),bm);sh.rotation.x=Math.PI/2;G.bb.add(sh);M.bbc=mat(0x7f7b73,1,.5);/* v199zzzzp：BB 杯＝鍊條色（M.casM 同值：#7f7b73、金屬度 1、粗糙度 .5） */M.bbc.side=THREE.DoubleSide})();/* v181：BB 杯改 STEP（兩杯，凸緣外緣 ±45 mm），殼長 89→73 mm */
/* v175：曲柄組分兩套。預設＝STEP 曲柄＋大盤（黑色鋁合金陽極）：Ring.stp（50T、OD 204.5、110 BCD 四臂）、Crank_01.stp（右臂＋四臂蜘蛛＋ø24 軸）、Crank_02.stp（左臂）；
   三檔同一組合座標系（mm，Rhino 7；x＝臂向、z＝橫向，右臂在＋z），減面後編碼：位置 int16×0.01 mm、法線 int8（35° 折角分組）、索引 uint16；減面偏差平均約 0.2、最大約 0.85 mm。
   組合置入：z 平移 +35.95 mm 使左右臂內側面在 ±49.4（＝BB 杯端 ±49），大盤齒面中段在 z=+43（標準公路鏈線）；繞 z 轉 −50° 對回原曲柄角。 */
var CRK_D=.019,CRK_DL=.003;/* v183：ili-ili 曲柄組外移（m）：大盤＋右臂 CRK_GD、左臂 CRK_GDL；CRK_GZ＝大盤齒層中面（STEP x=45.0）；CRKG＝目前顯示的是 ili-ili 曲柄組；CRK_GR＝其大盤節圓半徑（40T＝80.9 mm） */
/* v184：RD_ZP＝SRAM 導輪面（STL x=44.5＋12.5 mm）；SRAM 上／下導輪圓心（相對軸孔圓心，m）；SRAM_RD_ON＝非 EX 車款顯示 SRAM RD */
/* v190：RD_HG＝吊耳（For_RD_Hanger.stl：板＋兩顆螺栓；短螺栓軸心放在勾爪吊耳孔，板內側面貼勾爪外側面 80.5）；RD_HGS＝0：RD 掛在長螺栓端（往後 25.26、往上 5.43，照 STL 幾何）；＝1：RD 掛在短螺栓端（往前 25.26、往下 5.43）；RD_DZ＝RD 往外一個板厚 11 mm */
const RD_HG=VIBE_D.RD_HG;
/* v191：SH_IX／SH_IR＝一體把上變速煞車把手相對標準把的位置修正（往前平移 mm→m、繞把管軸向上轉 度） */var SH_IX=.03,SH_IR=9,RD_HGS=0,RD_DZ=.011,RD_ZP=.057,HG_ROT=80,HG_TH=HG_ROT*Math.PI/180,HG_V=RD_HGS?[.02526,-.00543]:[-.02526,.00543],RD_DX=HG_V[0]*Math.cos(HG_TH)-HG_V[1]*Math.sin(HG_TH)+.01171,RD_DY=HG_V[0]*Math.sin(HG_TH)+HG_V[1]*Math.cos(HG_TH)-.00427,/* v190：吊耳靠勾爪的那端軸心對齊後輪軸心，整件繞軸心逆時針 HG_ROT 度（驅動側觀看）；RD 孔跟著吊耳另一端（HG_V 旋轉後）；RD 網格原點在勾爪吊耳孔 (−11.71,+4.27)，故再加回 (.01171,−.00427) */RD_QS=[[.01678+RD_DX,-.06379+RD_DY],[-.00425+RD_DX,-.12742+RD_DY]];/* v190：RD 經吊耳（For_RD_Hanger.stl）往後 25.26、往下 5.43 mm：吊耳兩螺栓軸距（y,z）＝(25.26,5.43)，方向依使用者「往後下」 */function rdSr(){return true}/* v190：EX 也用同一顆 SRAM RD 與吊耳 */
var CRK_GD=0.014,CRK_GDL=0.005,CRK_GZ=.045,CRKG=false,CRK_GR=80.9,CRKA=false,CRK_AD=.014,CRK_ADL=.005,CRK_AZ=.047725+.014,CRK_AR=93.05,CRKF=false,CRK_FZ=.059,CRK_FR=93.05,CRK_FD=.03111,CRK_FDL=.0144;/* v199zzzl：CRKF＝目前顯示的是 SS-2205 的 SRAM Force 1 Gravel 曲柄組；CRK_FZ＝其大盤齒層中面 z（STEP z＝27.89 mm＋右組平移 CRK_FD＝31.11 mm＝59.0 mm，與舊 ili-ili 曲柄組鏈線相同，RD／鏈條位置不變）；CRK_FD／CRK_FDL＝右組（大盤、連接臂、右臂、螺栓）與左組（左臂）沿 z 的平移（m），使左臂外側面維持 −77.5 mm */ /* v197：AUDAX 大盤與右臂外移 CRK_AD、左臂外移 CRK_ADL（比照 ili-ili 14／5 mm；鏈線面 CRK_AZ 隨大盤外移） *//* v196：CRKA＝目前顯示的是 AUDAX 曲柄組；CRK_AZ＝其齒層中面 z（m）；CRK_AR＝46T 節圓半徑（mm） */
/* v179：整車旋轉（鏡頭移動：拖曳／縮放／轉場）時，曲柄組繞五通軸、飛輪片繞後軸示意旋轉；停手後延續 SPIN_HOLD＝500 ms 即停；鏈條維持靜止。
   不增加額外重繪：鏡頭移動時本來就連續重繪；停手後延續的半秒以 wake 補畫。輪廓線（第二遍反向外殼）以同一批網格繪製，自然跟著轉。
   角速度 SPIN_W＝5 rad/s（約 48 rpm，向前踩方向＝由驅動側看順時針＝z 軸負向）；飛輪 ×SPIN_CAS＝2.6（≈50T／19T）。
   扭力分頁的熱點（踏板、曲柄螺絲）固定在預設曲柄角，故扭力分頁不轉並把角度歸零。 */
var spinA=0,spinT=0,spinL=0,SPIN_W=.36,SPIN_WK=1,SPIN_ON=true,SPIN_HOLD=500,SPIN_CAS=2.6,SPIN_K=.2,SPIN_SC=false;/* v199zzzzzz93：SPIN_K＝角速度起伏幅度，ω(θ)＝SPIN_W×(1+SPIN_K·cos θ)，每圈頭尾（θ≈0、2π）快、中段（θ≈π）慢；角速度本身是 θ 的週期函數，故接圈處速度與加速度皆連續，不會有一次性 easing 的斷點。平均角速度仍為 SPIN_W（cos 的一圈平均為 0）。SPIN_SC＝展示（Live Showcase）執行中，由 scPlay0／scUI 維護；用 var 另設旗標而非直接讀 SC，是因為 SC 宣告在本行之後（const，TDZ）。 */
function spinW(a){return SPIN_W*(1+SPIN_K*Math.cos(a))}/* v180：角速度 5→2.5 rad/s（約 24 rpm），使用者要求放慢一半 */
function applySpin(){if(G.crkNewG)G.crkNewG.rotation.z=-.8727-spinA;if(G.crkGrvG)G.crkGrvG.rotation.z=-.8727-spinA;if(G.crkF1G)G.crkF1G.rotation.z=-.8727-spinA;if(G.crkAudG)G.crkAudG.rotation.z=-.8727-spinA;if(G.crkTiG)G.crkTiG.rotation.z=-.8727-spinA;if(G.crkSerG)G.crkSerG.rotation.z=-.8727-spinA;
  /* v191：鏈條帶動——鏈速＝大盤轉角×大盤節圓半徑 chR()；飛輪（最小片半徑 CH_RC）、前後碟盤（含鎖固螺絲，同軸同轉速）轉速比＝chR()/CH_RC；上導輪（物理上逆時針）、下導輪（順時針）轉速比＝chR()/CH_RP；齒的相位不處理（使用者指示） */
  const ok=typeof CH_RC==='number',kc=(ok?chR()/CH_RC:2.6)*SPIN_WK,kp=ok?chR()/rpR():4.1;const c=G.rear&&G.rear.children[4];if(c)c.rotation.z=-spinA*kc;
  if(G.rRotor)G.rRotor.rotation.z=-spinA*kc;if(G.fRotor)G.fRotor.rotation.z=-spinA*kc;
  if(G.rdPu){G.rdPu[0].rotation.z=0;G.rdPu[1].rotation.z=0}/* v191：導輪與導輪軸心不轉（使用者指示） */
  if(G.chPos)chainPlace(-spinA*chR());if(tab==='torque')try{placeHS()}catch(_){}/* v199zzzzzz94：placeHS 只在節點改變時呼叫，所以 v93 的「熱點跟著曲柄角轉」實際上沒生效（踏板橘點不動）。示意旋轉每幀都呼叫 applySpin，在這裡補一次重放；只有扭力分頁會顯示熱點，其他分頁不花這個成本。spinA 歸零時也會進來一次，把熱點放回預設曲柄角。 */}/* v178：CRK_D＝大盤與右臂外移、CRK_DL＝左臂外移（皆 mm→m）；依整圈旋轉掃描決定，見下 *//* v176：新曲柄組左右各向外 CRK_D＝18 mm（大盤與右臂＋蜘蛛 +z、左臂 −z）；v175 大盤與右後下叉最大干涉 10.3 mm，外移 18 mm 後大盤淨距約 4.9、右臂約 3.1 mm（四款車一致）；v177：左臂不外移（使用者指示；左側原本已通過，淨距 2 mm），只有大盤與右臂（含蜘蛛）外移。須在曲柄組建構之前宣告（曲柄組建構早於 paintSel 那行 var 的執行） */
/* v181（使用者 2026-11-03 上傳 BB_For_all.stp／integrated_handlebar.stp／Shifter.stp）：減面後編碼同 CRK_NEW（位置 int16×0.01 mm、法線 int8、索引 uint16）。
   座標：STEP（x 橫向、y 向前、z 向上）→ 頁面（x 向前、y 向上、z 橫向）＝(y,z,x) 循環排列，無鏡射。bar：一體把（含龍頭）原點＝STEP 原點（把手中心）；bbA／bbB：BB 左右杯（軸沿 z，原點＝五通中心）；
   sh*：右側變速煞車把手；hbTL／hbTR／hbC：標準把（HandleBar.stp，左右包把帶段＋中央管）。v182：Shifter 與 HandleBar 同一組裝座標，原點＝把手上把中心 (0,457.8,621) mm，標準把直接對位；一體把另加位移（見 applyNodes）。左側 Shifter 以 scale.z=−1 鏡射。 */
const STEP3=VIBE_D.STEP3;
function stepDec(o){const b=bz,p=new Int16Array(b(o.p)),ix=new Uint16Array(b(o.i)),P=new Float32Array(p.length);
  for(let i=0;i<p.length;i++)P[i]=p[i]*1e-5;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(ix,1));g.computeVertexNormals();return g}/* v198：不存法線，載入時重算 */
const CRK_NEW=VIBE_D.CRK_NEW;
/* v183：ili-ili 曲柄組（Gravel_Ring.stp 40T 窄寬齒、Gravel_Crank.stp 左右臂；主軸管由頁面以圓柱另建）。STEP（軸沿 x、右＝+x）→ 頁面 (X,Y,Z)=(y,z,x)（循環排列、無鏡射），再繞 Z 轉 +35.6° 使右臂（踏板孔距 172.5 mm）落在 +X；編碼同 CRK_NEW。建構腳本 build_tools/build_gravel_meshes.py */
/* v199zzzl：SRAM Force 1 Gravel 曲柄組（使用者 STEP SRAM_Force_1_Gravel_Crankset.stp，46T、172.5 mm）。Rhino 座標，z 為曲柄軸向（右＝+z）；x、y 已平移到曲柄軸心；單位 0.01 mm；ring＝大盤、spd＝大盤連接臂、armR／armL＝右／左曲柄臂與軸座、hwR／hwL＝螺栓與踏板孔襯套。主軸（STEP 的 solid 11）改以圓柱重建。 */const CRK_F1=VIBE_D.CRK_F1;
const CRK_GRV=VIBE_D.CRK_GRV;
/* v196：AUDAX 曲柄組（Crankset_for_AUDAX.stl：46T 大盤 ring、右臂 cr、左臂 cl、螺絲 sm；主軸 ø22 由頁面以圓柱重建）。STL（x＝曲軸方向、右＝+x、右臂指向 −z）→ 頁面 (X,Y,Z)＝(−(z−z0),(y−y0),x−c)，c＝−11.89 使左右臂外側面對稱於 ±72.5、齒層中面在 z＝+47.7；右臂落在 +X，預設角 −50°。建構腳本 build_tools/build_audax_crank.py */const CRK_AUD=VIBE_D.CRK_AUD;
/* v196：分離把龍頭（Stem.stl，HTA 71.01° 姿態：轉向管軸在 (y,z)＝(370.44,569.2)、方向 (−0.3254,0.9456)；夾口參考點＝軸上 +31.05 mm，局部座標 (X,Y,Z)＝(y−Rx,z−Rz,x)；把手夾孔圓心＝垂直 98.83、沿軸 −10.45，與頁面 n.bar（100 mm、−6°）差 0.6 mm）。body＝本體（臂、立管夾、前蓋、頂蓋板）、bolt＝螺絲；STM_UA＝轉向管軸方向角（rad）。建構腳本 build_tools/build_stem_std.py */const STEM_STD=VIBE_D.STEM_STD;const STM_UA=1.9023;const STM_LIFT=4.9,FK_DROP_MAX=15,FK_CROWN=13,FK_GAP=4;var HS_SEL={};function exFd(){return hsT()==='hid'?9:23}/* v199zzzm：EX 頭管下端與下碗、前叉隨之下移——下管與頭管交線最低點在下管接點下 ≈52 mm、焊道 3.3 mm，頭管下緣原僅 35 mm（外露，下碗占 15）或 49 mm（隱藏），焊道拖到下碗。下移 23／9 mm 使交線全落在頭管長度內；不能改提高下管接點（XS 上下管接點都在頭管下 50 mm，會交錯）。前叉有效長度縮短同值（使用者 2026-11-10 同意） */function hsT(){return HS_SEL[selM]||((selM==='64'||selM==='325')?'hid':'ex')}/* v199zc：預設——MASTER 系列（64Ti、325Ti）全隱藏式，AUDAX 與 ili-ili 系列外露式；使用者在幾何分頁切換後以 HS_SEL 為準 */function stmLift(){const top=hsT()==='hid'?9.5:13.5;return (extras.blktec?top-13.5:top+.1-8.7-1.34)+rsLift()*1e3}/* v199zzzv：龍頭疊在上碗上，隨頭管上移 *//* v199l：實測龍頭底環下緣在頂面上方 1.34 mm（頂面 13.5／隱藏 9.5 → 環底 14.84／10.84），分離把再下移 1.34 mm 使環底貼上碗頂面 *//* v199k：頭碗組型式（外露 ex／全隱藏 hid，依車款記憶）。龍頭下緣貼上碗頂面：頂面高 外露 13.5／隱藏 9.5 mm（HTt 上方）；分離把上移＝頂面＋0.1−8.7（外露 4.9、隱藏 0.9），一體把＝頂面−13.5（外露 0、隱藏 −4.0） *//* v199e：分離把（龍頭＋把手＋頂蓋）沿轉向管軸上移 4.9 mm——龍頭下緣原在頭管上端 +8.7 mm，上碗頂面在 +13.5 mm，干涉 4.8 mm；上移後下緣 +13.6 mm 貼上碗頂面。一體把不動 */
/* v184：SRAM 後變速器（SRAM_RD.stl，連桿式本體 rd＋導輪 pu 兩組）。STEP/STL（x 橫向、y 向前、z 向上）→ 頁面後端座標（原點＝軸孔圓心）(X,Y,Z)=(y+21.23,z−36.40,x+12.5) mm；吊耳孔軸 (y,z)=(−432.94,40.67) 落在勾爪吊耳孔 (−11.71,+4.27)；原 51 萬三角形 → 約 2.1 萬（分元件減面、捨棄小於 1.5 mm 的 509 個內部小件）；編碼同 CRK_NEW。建構腳本 build_tools/build_sram_rd.py */
const RD_SRAM=VIBE_D.RD_SRAM;
(function(){M.alBk=mat(...AL_BK);/* v177：顏色再調淺（v176 0x32312d＝輪框色，使用者嫌太深）；亮度略過 .1，不再被分材質 matcap 的『消光黑』類別接管 *//* v176：顏色改與輪框同色（輪框＝M.carbon 0x32312d）；金屬度／粗糙度維持 */M.alBk.side=THREE.DoubleSide;
  const b64=bz;
  const dec=o=>{const p=new Int16Array(b64(o.p)),ix=new Uint16Array(b64(o.i)),P=new Float32Array(p.length);
    for(let i=0;i<p.length;i++)P[i]=p[i]*1e-5;
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(ix,1));g.computeVertexNormals();return g};/* v198：不存法線，載入時重算 */
  G.bbCups=[];['bbA','bbB'].forEach(k=>{const m=new THREE.Mesh(stepDec(STEP3[k]),M.bbc);m.frustumCulled=false;m.userData.keepOpaque=true;G.bb.add(m);G.bbCups.push(m)});
  G.crkNewG=grp();G.crkNewG.position.z=.03595;G.crkNewG.rotation.z=-.8727;G.bb.add(G.crkNewG);
  ['ring','cr','cl'].forEach(k=>{const m=new THREE.Mesh(dec(CRK_NEW[k]),M.alBk);m.frustumCulled=false;m.position.z=k==='cl'?-CRK_DL:CRK_D;/* v178：左臂外移 3 mm（v177 為 0，整圈旋轉時左臂與左後下叉干涉 0.6 mm） */G.crkNewG.add(m);(G.crkNewP=G.crkNewP||[]).push(m)});
  /* v176：左臂外移後，軸（Crank_01 的 ø24 軸端原在 STEP z=−104.9）接不到左臂，補一段 ø24 軸：世界 z 由 −(68.95+D) 到 −68.95+D+4 mm（重疊 4 mm） */
  {const L=.004+CRK_D+CRK_DL,ex=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,L,48).rotateX(Math.PI/2),M.alBk);ex.position.z=-.06895-CRK_DL+L/2-.03595/* v177：軸端原在世界 z=−68.95 mm、右組外移後在 −50.95，補 −68.95～−46.95（含 4 mm 重疊）；減群組平移 35.95 */;G.crkNewG.add(ex);(G.crkNewP=G.crkNewP||[]).push(ex)}
  /* v183：ili-ili 曲柄組。大盤／右臂外移 CRK_GD、左臂外移 CRK_GDL；主軸 ø29（STEP 為貫穿左右的管，外移後以圓柱重建，兩端落在臂的軸座底：右 57.5、左 −57.5 mm 再加各自外移；半徑 14.4 避開 BB 杯孔 ø29 的共面） */
  G.crkGrvG=grp();G.crkGrvG.rotation.z=-.8727;G.crkGrvG.visible=false;G.bb.add(G.crkGrvG);
  [['ring',CRK_GD],['cr',CRK_GD],['cl',-CRK_GDL]].forEach(([k,dz])=>{const m=new THREE.Mesh(dec(CRK_GRV[k]),M.alBk);m.frustumCulled=false;m.position.z=dz;G.crkGrvG.add(m);(G.crkGrvP=G.crkGrvP||[]).push(m)});
  {const z0=-.0575-CRK_GDL,z1=.0575+CRK_GD,sp=new THREE.Mesh(new THREE.CylinderGeometry(.0144,.0144,z1-z0,48).rotateX(Math.PI/2),M.alBk);sp.position.z=(z0+z1)/2;G.crkGrvG.add(sp);G.crkGrvP.push(sp)}
  /* v199zzzl：SS-2205 曲柄組＝SRAM Force 1 Gravel（CRK_F1）。右組平移 CRK_FD、左組平移 CRK_FDL；主軸 ø26.5（STEP solid 11 貫穿左右，改圓柱：STEP z −77.0～＋50.7 mm，右端＋CRK_FD、左端＋CRK_FDL） */
  G.crkF1G=grp();G.crkF1G.rotation.z=-.8727;G.crkF1G.visible=false;G.bb.add(G.crkF1G);
  [['ring',CRK_FD,M.dark],['spd',CRK_FD,M.alBk],['armR',CRK_FD,M.alBk],['hwR',CRK_FD,M.casM],['armL',CRK_FDL,M.alBk]]/* v199zzzzx：刪除 hwL（左臂軸端圓蓋） */.forEach(([k,dz,mt])=>{const gm=dec(CRK_F1[k]),ad=(ge,ma,rz)=>{const m=new THREE.Mesh(ge,ma);m.frustumCulled=false;m.position.z=dz;if(rz)m.rotation.z=rz;G.crkF1G.add(m)};
    if(k==='hwR'){const r=compSplit(gm,5,[1,2,3,4]);if(r){/* v199zzzzq：連通件 1–4＝大盤螺帽→銀（同 FD 籠板 M.steel）；原只有 4 顆（0／±72／−144°），第 3 件（−144°）複製轉 +288° 補在 +144° */if(r.K)ad(r.K,M.casM);if(r.S)ad(r.S,M.steel);const r3=compSplit(gm,5,[3]);if(r3&&r3.S)ad(r3.S,M.steel,288*Math.PI/180);return}}
    ad(gm,mt)});
  {const z0=-.0770+CRK_FDL,z1=.0507+CRK_FD,sp=new THREE.Mesh(new THREE.CylinderGeometry(.01325,.01325,z1-z0,48).rotateX(Math.PI/2),M.alBk);sp.position.z=(z0+z1)/2;G.crkF1G.add(sp)}
  /* v199r：鈦合金曲柄組示意＝複製 ili-ili 曲柄＋大盤（共用幾何、各自網格），材質於 addonApply 設為 M.tiK；取代舊示意曲柄 */G.crkTiG=grp();G.crkTiG.rotation.z=-.8727;G.crkTiG.visible=false;G.bb.add(G.crkTiG);G.crkTiP=G.crkGrvP.map(o=>{const m=new THREE.Mesh(o.geometry,M.alBk);m.frustumCulled=false;m.position.copy(o.position);G.crkTiG.add(m);return m});
  /* v196：AUDAX 曲柄組。主軸 ø22（STL 貫穿左右，頁面以圓柱重建，兩端落在左右臂軸座內側 −47.0／+42.5 mm）；預設角 −50° */
  G.crkAudG=grp();G.crkAudG.rotation.z=-.8727;G.crkAudG.visible=false;G.bb.add(G.crkAudG);
  [['ring',CRK_AD],['cr',CRK_AD],['smr',CRK_AD],['cl',-CRK_ADL],['sml',-CRK_ADL]].forEach(([k,dz])=>{const gm=dec(CRK_AUD[k]),ad=(ge,ma)=>{const m=new THREE.Mesh(ge,ma);m.frustumCulled=false;m.position.z=dz;G.crkAudG.add(m)};
    if(k==='smr'){const r=compSplit(gm,11,[0,1,2,3,4,5]);if(r){if(r.K)ad(r.K,M.casM);if(r.S)ad(r.S,M.steel);return}}/* v199zzzzq：螺帽（外側 6 件）銀、其餘螺絲槍灰 */
    if(k==='sml')return;/* v199zzzzx：刪除左臂軸端圓蓋（使用者 2026-11-12） */ad(gm,M.alBk)});
  {const z0=-.0470-CRK_ADL,z1=.0425+CRK_AD,sp=new THREE.Mesh(new THREE.CylinderGeometry(.01096,.01096,z1-z0,48).rotateX(Math.PI/2),M.alBk);sp.position.z=(z0+z1)/2;G.crkAudG.add(sp)}
  /* v196：分離把龍頭（取代 T.stem 示意管；T.stem 恆隱藏）。位置＝stemC、繞 Z 轉 (π−HTA)−STM_UA 對齊轉向管軸；本體用 T.stem 的材質（M.dark、加購鈦合金龍頭時換 M.tiS），螺絲用 M.steel */
  G.stemStd=grp();G.stemStd.visible=false;
  {const b=new THREE.Mesh(stepDec(STEM_STD.body),T.stem.material);b.frustumCulled=false;G.stemStd.add(b);G.stemBody=b;const k=new THREE.Mesh(stepDec(STEM_STD.bolt),M.tiScr);/* v197：龍頭螺絲改鈦合金 */k.frustumCulled=false;k.userData.keepOpaque=true;k.userData.noOL=true;k.userData.noBT=true;/* v199zzzzu：龍頭螺絲不上輪廓線（noOL）；不進 BatchedMesh（免得併入同材質群組而被加輪廓） */G.stemStd.add(k);G.stemBolt=k}})();
// 後端：勾爪、飛輪、後變、碟盤、卡鉗
G.rear=grp();
/* 勾爪（UDH，Dropout.stp 左右各一片）：STEP 曲面三角化後減面（左 3645／右 3445 三角形，最大偏差約 0.23 mm），頂點相對軸孔圓心（STEP y=−420.6、z=68.0），單位 0.01 mm；35° 折角分組法線 */
(function(){const DR=VIBE_D.DROP_UDH,u64=bz;
  const sm=M.tiFr;
  ['L','R'].forEach(k=>{const q=new Int16Array(u64(DR[k].v)),F=new Uint16Array(u64(DR[k].f)),P=new Float32Array(q.length);
    for(let i=0;i<q.length;i+=3){P[i]=q[i+1]*1e-5;P[i+1]=q[i+2]*1e-5;P[i+2]=q[i]*1e-5}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(F,1));g.computeVertexNormals();
    const m=new THREE.Mesh(g,sm);m.frustumCulled=false;G.rear.add(m);if(k==='L')m.position.z=0;else m.position.z=0;/* UDH 勾爪向外 29 mm（v63：後端附件回到 8 mm，叉管改為繞前端樞轉）*/G['dropout'+k]=m})})();
/* EX 兩件式勾爪（Two_Part_Dropout.stp，左右各兩件合併；軸孔圓心 STEP y=−421.3、z=86.8；減面左 9377／右 5625 三角形）：僅 EX 顯示，UDH 勾爪於 EX 隱藏 */
(function(){const DR=VIBE_D.DROP_EX,u64=bz;
  const sm=M.tiFr;const sb=M.alBk;/* v74：EX 兩件式勾爪——貫通軸通過的那件為黑件，與後叉相連的那件維持鈦色；v199zb 黑件改用 ili-ili 曲柄材質 M.alBk（原 M.dark 複本 0x161616） */
  ['L','R'].forEach(k=>{const q=new Int16Array(u64(DR[k].v)),F=new Uint16Array(u64(DR[k].f)),P=new Float32Array(q.length);
    for(let i=0;i<q.length;i+=3){P[i]=q[i+1]*1e-5;P[i+1]=q[i+2]*1e-5;P[i+2]=q[i]*1e-5}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(F,1));g.computeVertexNormals();
    g.addGroup(DR[k].n1*3,(DR[k].nf-DR[k].n1)*3,1);/* v199zzzx：此網格只畫黑件（隨輪組後移）；鈦件另立 exTi 網格留在幾何表軸心 */const m=new THREE.Mesh(g,[sm,sb]);m.frustumCulled=false;m.visible=false;m.position.z=0;/* EX 勾爪向外 29 mm（v63）*/G.rear.add(m);m.userData.n1=DR[k].n1;m.userData.nf=DR[k].nf;G['exDrop'+k]=m;{const gt=new THREE.BufferGeometry();gt.setAttribute('position',g.attributes.position);gt.setAttribute('normal',g.attributes.normal);gt.setIndex(new THREE.BufferAttribute(F.slice(0,DR[k].n1*3),1));const mt=new THREE.Mesh(gt,sm);mt.frustumCulled=false;mt.visible=false;bike.add(mt);G['exTi'+k]=mt}})})();
var _casA=G.rear.children.length;(function(){/* 飛輪：由 STEP（Cassette.stp，SRAM 10-44T 12 速）每片實測截面簡化（容差 0.3 mm）後擠出；最大片分三層（孔環／輻條／輪轂）。資料為差分編碼、單位 0.1 mm、相對飛輪軸心 */
  const CAS=VIBE_D.CAS,Z0=.0105,cm=M.steel.clone();cm.side=THREE.DoubleSide;cm.roughness=.5;cm.color.set(0x7f7b73);M.casM=cm;/* v143：飛輪片材質，供示意齒片、RD 導輪共用（v199zzzzr 起鍊條不再共用） */M.chn=M.tiP.clone();M.chn.userData={};M.chn.side=THREE.DoubleSide;/* v199zzzzr：鍊條專用材質＝鈦原色（M.ti 同值 #C8C4B8、金屬度 .92、粗糙度 .36）；與 M.casM、M.tiP 皆為獨立物件，不連動 */
  const dec=a=>{const p=[];let x=a[0],y=a[1];p.push(new THREE.Vector2(x*1e-4,y*1e-4));for(let i=2;i<a.length;i+=2){x+=a[i];y+=a[i+1];p.push(new THREE.Vector2(x*1e-4,y*1e-4))}return p};
  const P=[],NR=[];
  let VS=0;/* v85：最大片（CAS 末項，44T，三層）改用 RD 材質（M.dark）：記下它的起始頂點，後面用同一網格的材質分組，不新增網格（後端外移用 G.rear.children 索引） */
  CAS.forEach((cog,ci)=>{if(ci===CAS.length-1)VS=P.length/3;cog.forEach(([xo,t,shs])=>{const arr=shs.map(([o,hs])=>{const sh=new THREE.Shape(dec(o));hs.forEach(h=>sh.holes.push(new THREE.Path(dec(h))));return sh});
    const g=new THREE.ExtrudeGeometry(arr,{depth:t*1e-3,bevelEnabled:false,curveSegments:1}),pa=g.attributes.position.array,na=g.attributes.normal.array,z=Z0+xo*1e-3;
    for(let i=0;i<pa.length;i+=3){P.push(pa[i],pa[i+1],pa[i+2]+z);NR.push(na[i],na[i+1],na[i+2])}g.dispose()})});
  const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(P,3));bg.setAttribute('normal',new THREE.Float32BufferAttribute(NR,3));
  if(!M.darkD){M.darkD=M.dark.clone();M.darkD.side=THREE.DoubleSide}const cd=M.darkD;/* 同 RD：M.dark（0x3d3c36、金屬度 .45、粗糙度 .5） */bg.addGroup(0,VS,0);bg.addGroup(VS,P.length/3-VS,1);
  G.rear.add(new THREE.Mesh(bg,[cm,cd]));
  zc(G.rear,.0155,.004,M.dark,.0536);zc(G.rear,.0172,.052,M.dark,.026)})();G.casC=G.rear.children.slice(_casA);/* v199zzzzzz87：飛輪片與墊片（爆炸圖隨後輪移動） */
var _rdA=G.rear.children.length;(function(){/* 後變速器：倒角擠出本體＋兩片膠囊形導輪架＋兩顆導輪 */
  const RD_DX=-.020,RD_DY=-.011/* v95：RD 總成整體移動（x＝−後方、y＝−下方；使用者：吊耳孔應在勾爪軸心孔的斜下方）。吊耳孔由 (−1,−17) 移到 (−21,−28) mm、與軸心連線偏離垂直約 37°；與勾爪凸座的間隙 UDH 約 4.5 mm／EX 約 2.5 mm（皆為我估的，可調）；導輪架、導輪、鏈條下段與扭力熱點同步移動 */,RD_BODY=.7/* v94：本體長度比例（使用者：縮短至 70%）；吊耳端（y −.004）固定，下緣上移，導輪架與鏈條下段隨之上移、長度不變 */,RDY0=-.004,RDDY=(RDY0+.108)*(1-RD_BODY);
  const sh=new THREE.Shape();/* RD 頂端仿曲柄臂端（v70）：圓弧收頭（半徑 13 mm，圓心 (−1,−17)），兩面以深色孔面＋亮環示意吊耳螺栓孔 */sh.moveTo(-.014,-.017);sh.absarc(-.001,-.017,.013,Math.PI,0,true);[[.015,-.05],[.005,-.1],[-.01,-.108],[-.016,-.05]].forEach(p=>sh.lineTo(p[0],RDY0+(p[1]-RDY0)*RD_BODY));
  const bg=new THREE.ExtrudeGeometry(sh,{depth:.022,bevelEnabled:true,bevelSize:.004,bevelThickness:.003,bevelSegments:3,curveSegments:8});bg.translate(0,0,.058);const rdb=new THREE.Mesh(bg,M.dark);rdb.position.set(RD_DX,RD_DY,0);G.rear.add(rdb);{const mH=new THREE.MeshBasicMaterial({color:0x0c0b09,side:THREE.DoubleSide}),mRg=M.steel.clone();mRg.side=THREE.DoubleSide;[mH,mRg].forEach(m=>{m.polygonOffset=true;m.polygonOffsetFactor=-4;m.polygonOffsetUnits=-4});[.0545,.0835].forEach(z=>{const d=new THREE.Mesh(new THREE.RingGeometry(0,.0042,32),mH);d.position.set(-.001,-.017,z);rdb.add(d);const rg=new THREE.Mesh(new THREE.TorusGeometry(.0052,.0007,8,40),mRg);rg.position.copy(d.position);rdb.add(rg)})}
  const q1=[-.012+RD_DX,-.106+RDDY+RD_DY],q2o=[-.020+RD_DX,-.172+RDDY+RD_DY],RD_RAISE=.2/* 下導輪沿導輪架方向上移的比例（使用者：連桿長度的 20%）；0＝原位 */,q2=[q1[0]+(q2o[0]-q1[0])*(1-RD_RAISE),q1[1]+(q2o[1]-q1[1])*(1-RD_RAISE)],ang=Math.atan2(q2[1]-q1[1],q2[0]-q1[0]),len=Math.hypot(q2[0]-q1[0],q2[1]-q1[1]),r=.011,cs=new THREE.Shape();
  cs.moveTo(0,-r);cs.lineTo(len,-r);cs.absarc(len,0,r,-Math.PI/2,Math.PI/2,false);cs.lineTo(0,r);cs.absarc(0,0,r,Math.PI/2,Math.PI*1.5,false);
  [.0234,.0394].forEach(z=>{const m=new THREE.Mesh(new THREE.ExtrudeGeometry(cs,{depth:.003,bevelEnabled:false}),M.dark);m.position.set(q1[0],q1[1],z);m.rotation.z=ang;G.rear.add(m)});
  {const cn=zc(G.rear,.0075,.04,M.dark,.049);cn.position.x=q1[0];cn.position.y=q1[1]}
  const pu=(x,y,rr)=>{const m=zc(G.rear,rr,.008,M.steel,.0329);m.position.x=x;m.position.y=y;(G.casLike=G.casLike||[]).push(m)};pu(q1[0],q1[1],.012);pu(q2[0],q2[1],.011);G.rdq=[q1,q2]})();G.rdOldC=G.rear.children.slice(_rdA);/* v184：舊示意 RD（本體、導輪架、導輪）；EX 仍用 */
const rotGeoF=(HS)=>{/* 碟盤：由 STEP（disc_02.stp）中平面截面實測，φ160 mm、厚 1.8 mm；輪廓＝外緣＋49 個孔（中心孔、6 螺栓孔、6 三角窗、36 散熱孔槽），以 0.08 mm 容差簡化。環座標 [u,v]＝（STEP y−圓心、z−圓心），單位 0.01 mm；第一環為外緣。局部 X＝STEP y、Y＝STEP z、Z＝STEP x（與座墊同一對應）。 */
  const RG=VIBE_D.DISC_RG,pa=r=>{const p=new THREE.Path();r.forEach((v,i)=>i?p.lineTo(v[0]*1e-5,v[1]*1e-5):p.moveTo(v[0]*1e-5,v[1]*1e-5));p.closePath();return p};
  const sh=new THREE.Shape();RG[0].forEach((v,i)=>i?sh.lineTo(v[0]*1e-5,v[1]*1e-5):sh.moveTo(v[0]*1e-5,v[1]*1e-5));sh.closePath();
  /* v75：HS＝散熱孔、三角窗的直徑比例（後輪碟盤 65%）；中心孔與 6 顆螺栓孔不縮 */const sc=r=>{if(HS===1)return r;let cx=0,cy=0;r.forEach(v=>{cx+=v[0];cy+=v[1]});cx/=r.length;cy/=r.length;const cd=Math.hypot(cx,cy);let rb=0;r.forEach(v=>{rb+=Math.hypot(v[0]-cx,v[1]-cy)});rb/=r.length;if(cd<300||(cd>1800&&cd<2800&&rb<500))return r;return r.map(v=>[cx+(v[0]-cx)*HS,cy+(v[1]-cy)*HS])};
  for(let i=1;i<RG.length;i++)sh.holes.push(pa(sc(RG[i])));
  const g=new THREE.ExtrudeGeometry(sh,{depth:.0018,bevelEnabled:false,steps:1});g.translate(0,0,-.0009);return g};const rotGeo=rotGeoF(1),rotGeoR=rotGeo;/* v199q：前後碟盤同形（HS 皆 1），共用一份幾何 *//* v76：後碟盤孔徑復原 100%（v75 曾試 65%）*/
M.rotor=M.steel.clone();M.rotor.side=THREE.DoubleSide;M.rotor.roughness=.38;
/* v199r：跨群組實例化。碟盤、碟盤螺栓頭、貫通軸手柄各為 1 個 InstancedMesh（掛在 bike 下）；原位置的 G.rRotor／G.fRotor／G.hdlR／G.hdlF 改為空的 Object3D（代理），維持原有的 position／rotation／visible 控制，每幀 G.instSync 依代理的世界矩陣寫入實例矩陣（代理或其祖先 visible=false 時實例縮為 0）。代理可帶 .material，實例材質隨代理（smApply 換色用）。 */
G.INST=[];G.I4=new THREE.Matrix4();
G.instAdd=(geo,mat,items,mf,ol)=>{const im=new THREE.InstancedMesh(geo,mat,items.length);im.frustumCulled=false;if(ol)im.userData.outline=true;bike.add(im);G.INST.push({im,items,mf});return im};
G.instSync=()=>{if(!G.INST.length)return;bike.updateMatrixWorld(true);const inv=new THREE.Matrix4().copy(bike.matrixWorld).invert(),m=new THREE.Matrix4(),z=new THREE.Matrix4().makeScale(0,0,0),vis=o=>{for(;o;o=o.parent)if(!o.visible)return false;return true};
  G.INST.forEach(e=>{if(e.mf&&e.mf.material&&e.im.material!==e.mf.material)e.im.material=e.mf.material;e.items.forEach((it,i)=>{if(vis(it.o))m.multiplyMatrices(inv,it.o.matrixWorld).multiply(it.l);else m.copy(z);e.im.setMatrixAt(i,m)});e.im.instanceMatrix.needsUpdate=true})};
G.rRotor=new THREE.Group();G.rRotor.position.z=-.0425;G.rear.add(G.rRotor);
G.front=grp();G.fRotor=new THREE.Group();G.fRotor.position.z=-.0425;G.front.add(G.fRotor);
G.rotI=G.instAdd(rotGeo,M.rotor,[{o:G.rRotor,l:G.I4},{o:G.fRotor,l:G.I4}],null,true);
{const bg=rgeo(.0027,.0035,.001,16).rotateX(Math.PI/2),it=[];[G.rRotor,G.fRotor].forEach(r=>{for(let i=0;i<6;i++){const a=(90.5+i*60)*Math.PI/180;[1,-1].forEach(sd=>{it.push({o:r,l:new THREE.Matrix4().makeTranslation(Math.cos(a)*.022,Math.sin(a)*.022,sd*.0014)})})}});G.rotBI=G.instAdd(bg,M.dark,it,null,true)}
zc(G.front,.008,.015,M.dark,.0675);
/* 卡鉗總成：由 STEP（Caliper_01.stp）分三類處理——卡鉗本體（兩半）、基座（轉接板）、螺絲（6 顆）；各自獨立網格與材質。網格＝OpenCascade 三角化（容差 0.2 mm 內）後依折角 35–40° 切開頂點（保留銳邊），位置以 0.01 mm 整數、索引 uint16 編碼為 base64。座標＝以轉子圓心（STEP y=-409、z=48）為原點、徑向（STEP 45°方向）轉為 +Y，Z＝STEP x+61（兩半分界面＝轉子中平面）。圓心與徑向為依螺栓／本體包覆關係推定，待確認。 */
const CALD=VIBE_D.CALD;
function calGeo(d){const u8=bz;
  const p=new Int16Array(u8(d.p)),ix=new Uint16Array(u8(d.i)),f=new Float32Array(p.length);for(let i=0;i<p.length;i++)f[i]=p[i]*1e-5;
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(f,3));g.setIndex(new THREE.BufferAttribute(ix,1));g.computeVertexNormals();return g}
const CALG={body:calGeo(CALD.body),base:calGeo(CALD.base),screw:calGeo(CALD.screw)};
/* 卡鉗總成與前叉同色（取 M.carbon 色）：本體＝同材質；基座＝同色半啞；螺絲＝同色偏金屬 */
M.calBody=M.carbon.clone();M.calBody.side=THREE.DoubleSide;M.calBase=M.carbon.clone();M.calBase.side=THREE.DoubleSide;M.calBase.metalness=.85;M.calBase.roughness=.42;M.calBase.color.set(0x4b4d50);/* v73：卡鉗基座＝金屬深灰 */M.calBase.clearcoat=0;M.calScrew=M.casM;/* v199zzzzp：卡鉗螺絲＝鍊條材質（同一物件；原為碳纖複本） */
function mkCaliper(g,ang,rad,z0){const c=grp();
  const mb=new THREE.Mesh(CALG.body,M.calBody),ms=new THREE.Mesh(CALG.base,M.calBase),mc=new THREE.Mesh(CALG.screw,M.calScrew);mb.name='calBody';ms.name='calBase';mc.name='calScrew';
  c.add(mb,ms,mc);c.position.set(0,0,z0);c.rotation.z=ang-Math.PI/2;g.add(c);return c}
/* 前卡鉗：以前輪軸心為基準自 132.4° 向後轉至 174°，使側面看基座不被前叉擋住（實測各車型尺寸於 170° 起完全不被擋） */G.fCal=mkCaliper(G.front,3.0369,.0743,-.0425);/* 前卡鉗總成上移 17.1 mm、前移 0.4 mm：基座底與前叉叉腿下端同高，且基座前緣貼齊叉腿後緣（側視不被擋） */G.fCal.position.x+=.0054;G.fCal.position.z-=.005;G.fRotor.position.z-=.005;/* v81：前卡鉗總成＋前碟盤沿前軸心向外（−z）5 mm *//* v79：前卡鉗總成前移 5 mm（v78 為 10 mm，再往後拉回 5 mm）*/G.fCal.position.y+=.0171;G.rCal=mkCaliper(G.rear,.26,.074,-.0425);
G.rimF=bx(grp(),[.03,.05,.05],M.dark);G.rimR=bx(grp(),[.03,.05,.05],M.dark);
// 輪組（基準半徑 347 mm，依輪胎縮放）
const SPK=[];
function wheel(){const g=grp(),base=.347;
  {const pr=[[.318,-.011],[.318,.011],[.305,.0135],[.285,.014],[.268,.0115],[.262,.006],[.262,-.006],[.268,-.0115],[.285,-.014],[.305,-.0135],[.318,-.011]];/* 高框：框高約 56 mm */
    const rim=new THREE.Mesh(new THREE.LatheGeometry(pr.map(p=>new THREE.Vector2(p[0],p[1])),96),(M.rim||(M.rim=M.carbon.clone())));rim.rotation.x=Math.PI/2;g.userData.rim=rim;g.add(rim)}
  {const tm=new THREE.Mesh(new THREE.TorusGeometry(base-.013,.02,12,72),M.tire);g.add(tm);g.userData.tireM=tm;g.userData.walls=[]}
  [1,-1].forEach(s=>{const w=new THREE.Mesh(new THREE.TorusGeometry(base-.023,.014,6,96),M.wall);w.scale.z=.5714;/* 胎壁側視寬度 175%（徑向 .008→.014，側向厚度不變）*/w.position.z=s*.013;w.userData.z0=s*.013;g.add(w);g.userData.walls.push(w)});
  g.userData.hub=zc(g,.018,.11,M.dark);
  return g}
G.wR=wheel();G.wF=wheel();/* v199q：前後輪各部件幾何共用（皆以 mesh 縮放，不改幾何；框形改變見 updateRim 同步重建） */{const a=G.wR.userData,b=G.wF.userData,sh=(x,y)=>{if(x&&y&&x.geometry!==y.geometry){y.geometry.dispose();y.geometry=x.geometry}};sh(a.rim,b.rim);sh(a.tireM,b.tireM);sh(a.walls[0],b.walls[0]);sh(a.walls[1],b.walls[1]);sh(a.hub,b.hub)}/* 後輪花鼓向碟煞側（−z）伸長到左勾爪最內側 −67.5 mm（v71）*/{const h=G.wR.userData.hub;h.scale.y=(.0675+.055)/.11;h.position.z=-(.0675-.055)/2}
/* 貫通軸（v71）：ø12 軸身穿過兩側勾爪／叉端，左側（碟煞側）外端為 ø18×6 的深色軸頭＋短扳桿；後軸 UDH 兩側外面 ±76、EX 左 −74／右 +82.5；前軸取叉腿外表面 ±79 */
var smCur=null,smCol='d';function smMat(){return smCur||M.steel}/* v199m：鈦螺絲與金屬小件顏色（smCol：d 維持現況、b 藍、o 橘、g 金）；貫通軸身每次重建都取 smMat() */ G.axR=grp();G.rear.add(G.axR);G.axF=grp();G.front.add(G.axF);
function buildAxle(a,Lo,Ro){while(a.children.length)a.remove(a.children[0]);zc(a,.006,(Lo+Ro)*.001,smMat(),(Ro-Lo)*.0005,0)}
buildAxle(G.axF,80,80);
/* 貫通軸手柄（Thru_axle_Handle.stp，EX 檔案座標，頂點相對軸孔圓心；左側外端；前後輪共用同一零件）：後軸 EX 內面貼左勾爪外面 −82、UDH −87；前軸內面貼叉腿外面 −80 */
(function(){const D=VIBE_D.AXLE_H,u64=bz;
  const q=new Int16Array(u64(D.v)),F=new Uint16Array(u64(D.f)),P=new Float32Array(q.length);for(let i=0;i<q.length;i+=3){P[i]=q[i+1]*1e-5;P[i+1]=q[i+2]*1e-5;P[i+2]=q[i]*1e-5}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(F,1));g.computeVertexNormals();
  if(!M.darkD){M.darkD=M.dark.clone();M.darkD.side=THREE.DoubleSide}const hm=M.darkD;
  /* v199r：手柄前後共 1 個 InstancedMesh；G.hdlR／G.hdlF 為代理（見碟盤處） */G.hdlR=new THREE.Group();G.hdlR.material=hm;G.rear.add(G.hdlR);G.hdlF=new THREE.Group();G.hdlF.material=hm;G.hdlF.position.z=.002;G.front.add(G.hdlF);G.hdlI=G.instAdd(g,hm,[{o:G.hdlR,l:G.I4},{o:G.hdlF,l:G.I4}],G.hdlR,true)})();
// 頭管附件、龍頭、把手、座墊、水壺
G.crown=grp();
G.cap=grp();zc(G.cap,.02,.006,M.dark).rotation.set(0,0,0);
/* 把手：上把橫管接 R30 圓弧轉入前伸、再接下彎（單一連續曲線，無折角） */
const BARZ=.18275,BARR=.03;
function barPts(s){const p=[];for(let k=0;k<=8;k++){const f=k/8*Math.PI/2;p.push(new V3(BARR*(1-Math.cos(f)),0,s*(BARZ-BARR+BARR*Math.sin(f))))}
  [[.08,-.001],[.125,-.02],[.145,-.062],[.135,-.102],[.1,-.125],[.055,-.13]].forEach(q=>p.push(new V3(q[0],q[1],s*BARZ)));return p}
const barGeo=s=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(barPts(s),false,'centripetal'),72,.0125,12,false);
G.bar=grp();(function(){const co=mat(...AL_BK);/* v199zzzze：分離把與龍頭（M.barCo）由 #2a2a2d 調淺為 #56565b */M.tapeBar=M.saddle;/* v199zzzzm：把帶、變把橡膠套（shHood、shCover）＝座墊材質（同一個材質物件 M.saddle：色、金屬度、粗糙度與卵石顆粒 shader 全同；shader 用物件座標，不需 UV）。v197–v199zzzzl 曾為外胎 clone */const tp=M.tapeBar;tp.side=co.side=THREE.DoubleSide;M.barCo=co;T.stem.material=co;if(G.stemBody)G.stemBody.material=co;/* v197：龍頭本體與把手同色（M.barCo） */
  /* v199q：把帶左右為 z 鏡射（STEP 邊界 z 互為正負、其餘軸差 <0.05 mm）；右側共用左側幾何並 scale.z=−1（雙面材質，mesh 層級鏡射 three 會修正繞向） */let hbL=null;[['hbTL',tp],['hbTR',tp],['hbC',co]].forEach(([k,m])=>{const x=new THREE.Mesh(k==='hbTR'?hbL:stepDec(STEP3[k]),m);if(k==='hbTL')hbL=x.geometry;if(k==='hbTR')x.scale.z=-1;x.frustumCulled=false;G.bar.add(x)})})();/* v182：標準把改 HandleBar.stp（寬約 518 mm、含包把帶），取代 v181 以前的放樣管；barPts／barGeo／barEnd 已無使用 */
const barEnd=()=>{};
M.cp=M.carbon.clone();M.postA=M.carbon.clone();M.postC=M.carbon.clone();M.tiPa=M.tiP.clone();M.tiPa.userData={};M.tiF=M.tiP.clone();M.tiF.userData={};M.tiF.side=THREE.DoubleSide;M.tiS=M.tiP.clone();M.tiS.userData={};/* v133 加購件專用材質（與其他零件分開，才能單獨不透明） */
G.cockpit=grp();{/* v199zzzzg：一體把改用分離把的彎把造型（使用者 2026-11-12：做法一、寬 498）。一體把網格只留 |z|≤110 mm（三頂點皆在內才保留）；|z|>50 mm 起管段依 smoothstep 抬高 5.9 mm、寬收 16%，對齊分離把中央管截面中心（y＋5.9、寬 32）與把帶外框（約 41×28）；|z|>110 mm 的一體把彎把整段刪除，改掛 HandleBar.stp 的把帶＋彎把（hbTL、鏡射為 hbTR，材質 M.tapeBar；分離把的中央管 hbC 被把帶包住，不重畫）。children[0]＝一體把網格、[1][2]＝把帶（barW 寬度變形用 [0][1]）；龍頭段（|z|≤50）不動 */const g0=stepDec(STEP3.bar),P0=g0.attributes.position,I0=g0.index.array,keep=[];for(let i=0;i<I0.length;i+=3){const a=I0[i],b=I0[i+1],c=I0[i+2];if(Math.abs(P0.getZ(a))<=.11&&Math.abs(P0.getZ(b))<=.11&&Math.abs(P0.getZ(c))<=.11)keep.push(a,b,c)}for(let i=0;i<P0.count;i++){const az=Math.abs(P0.getZ(i));if(az>.05){const t=Math.min(1,(az-.05)/.04),w=t*t*(3-2*t);P0.setX(i,P0.getX(i)*(1-.16*w));P0.setY(i,P0.getY(i)+.0059*w)}}g0.setIndex(new THREE.BufferAttribute(new Uint16Array(keep),1));g0.computeVertexNormals();const m=new THREE.Mesh(g0,M.cp);m.frustumCulled=false;G.cockpit.add(m);const tg=stepDec(STEP3.hbTL);[1,-1].forEach(sg=>{const x=new THREE.Mesh(tg,M.cp);if(sg<0)x.scale.z=-1;/* v199zzzzh：把帶＝M.cp（與中央管同材質；v199zzzzg 誤用 M.tapeBar） */x.frustumCulled=false;G.cockpit.add(x)})}/* v181：一體把改 STEP（integrated_handlebar.stp，含龍頭；寬 420、龍頭夾口孔中心 STEP y−105.4、z−19.5）；v163 放樣已移除 */
/* v181：變速煞車把手（Shifter.stp）左右各一，所有車款都配；G.shSide[0]＝右、[1]＝左（scale.z=−1）。位置見 applyNodes */
G.shift=grp();(function(){const rub=M.tapeBar,met=mat(...AL_BK);met.side=THREE.DoubleSide;/* v199zzzzh：固定深灰（較原 #2b2b2e 調淺） */G.shLev=[];/* v197：橡膠套（shHood、shCover）＝把帶材質；撥片（shLever、shPad）材質隨前叉（見 addonApply） */
  const SHG={};/* v199q：左右變把同一份幾何（左側為 group scale.z=−1 鏡射；鏡射件不能用 InstancedMesh——three 以物件整體行列式判斷繞向，實例鏡射會使雙面材質法線反向） */G.shSide=[1,-1].map(s=>{const g=new THREE.Group();/* v199zzzzzz19：SRAM 撥片（shPad，靠後較小片）改槍灰色，與 Shimano 撥片共用 M.gun；煞車桿（shLever）維持與曲柄同的深灰 */const gun=M.gun||(M.gun=(()=>{const q=mat(0x4a5058,.72,.4);q.side=THREE.DoubleSide;return q})());[['shHood',rub],['shCover',rub],['shLever',gun],['shPad',met]].forEach(/* v199zzzzzz21：煉車桿（shLever）槍灰、變速撥片（shPad）深灰，與 v199zzzzzz19 互換 */([k,m])=>{const x=new THREE.Mesh(SHG[k]||(SHG[k]=stepDec(STEP3[k])),m);x.frustumCulled=false;g.add(x);if(k==='shLever'||k==='shPad')G.shLev.push(x)});if(s<0)g.scale.z=-1;G.shift.add(g);return g})})();
/* v199zzzzx：Shimano 左側 Shifter（Shimano_Shifter_Left.stp，使用者 2026-11-12 上傳）＝105／Dura-Ace 預設搭配。STEP 為左側（x＋＝左、y－＝前、z＝上，6 個 solid）；轉成頁面右側座標（x＝−y、y＝z、z＝x，鏡像故反繞向）後以 group scale.z=−1 還原為左側，左右成對。
   solid 0（本體）、5（夾座蓋）＝橡膠（M.tapeBar）；1（變速撥片）、2、3（軸）、4（煞車桿）＝黑色鋁件（同現行 SRAM Shifter 撥片）。幾何已平移使 STEP 點（y −28、z 88、x 3 mm，夾座中心附近）落在局部原點；定位只改 SHM_P／SHM_R。 */
var SHM_P=[0,0,220],SHM_R=0;/* v199zzzzz：幾何已含對位（與 SRAM Shifter 同座標：鼻端 x＝169.4、罩面頂 y＝65.7、z 中心＝0）；上方 STEP 座標說明作廢，改用 GLB（見 patch_zz.py）。SHM_P 現為相對 SRAM 的微調量（mm）。 *//* v199zzzzy：繞零件包圍盒中心（局部 57.35、−27.9 mm）從右側看順時針轉 90°（右側視 x 前 y 上，順時針＝繞 z 負向），SHM_P 由 [62,−18,220] 補償為此值使中心不動；若要繞夾座原點轉，SHM_P 改回 [62,-18,220]。mm（把手座標：原點＝把手上把中心、x 前、y 上、z 右）、rad：Shimano Shifter 定位點位置與繞 z 旋轉（初值為估計，待目視微調） */
const SHM_D=VIBE_D.SHM_D;
/* v199zzzzzz18：Shimano 變速撥片（橡膠套網格內那片 x＜115 mm 的獨立小薄片，約 45×21 mm）拆成獨立網格，材質槍灰色 SHM_PAD；煞車桿維持與曲柄同的深灰（AL_BK） */
function shSplit(ge){const ix=ge.index;if(!ix)return[ge,null];const P=ge.attributes.position,A=ix.array,a=[],b=[];for(let i=0;i<A.length;i+=3){const cx=(P.getX(A[i])+P.getX(A[i+1])+P.getX(A[i+2]))/3;(cx<.115?b:a).push(A[i],A[i+1],A[i+2])}if(!b.length)return[ge,null];const mk=r=>{const g=new THREE.BufferGeometry();Object.keys(ge.attributes).forEach(k=>g.setAttribute(k,ge.attributes[k]));g.setIndex(new THREE.BufferAttribute(new Uint32Array(r),1));return g};return[mk(a),mk(b)]}
G.shSideM=[];(function(){const rub=M.tapeBar,met=mat(...AL_BK);met.side=THREE.DoubleSide;const padM=M.gun;const gs={};for(const k in SHM_D)gs[k]=SHM_D[k].map(stepDec);gs.pad=[];gs.met=gs.met.map(ge=>{const r=shSplit(ge);if(r[1])gs.pad.push(r[1]);return r[0]});
  G.shSideM=[1,-1].map(s=>{const g=new THREE.Group(),hh=new THREE.Group();hh.position.set(SHM_P[0]*1e-3,SHM_P[1]*1e-3,SHM_P[2]*1e-3);hh.rotation.z=SHM_R;hh.scale.z=-1;/* v199zzzzzz12：Shimano 左右件對調——每支件身沿自身 z 鏡射（位置不動），使原本在右的左手件移到左、原本在左的右手件移到右 */g.add(hh);
    [['rub',padM],['met',rub],['pad',met]].forEach(/* v199zzzzzz21：Shimano 煉車桿（rub）槍灰 M.gun、變速撥片（pad）深灰 AL_BK，與 v199zzzzzz19 互換 */([k,m])=>gs[k].forEach(ge=>{const x=new THREE.Mesh(ge,m);x.frustumCulled=false;if(k==='met')x.userData.rb=1;if(k==='rub')x.userData.lv=1;if(k==='pad')x.userData.pd=1;hh.add(x)}));/* v199zzzzzz17：SHM_D.rub 實為煞車桿、SHM_D.met 才是橡膠套本體（使用者圖示確認），材質對調；userData.rb＝橡膠套本體、userData.lv＝煞車桿 */
    if(s<0)g.scale.z=-1;g.visible=false;G.shift.add(g);return g})})();
function shmApply(on){G.shSide.forEach(g=>g.visible=!on);(G.shSideM||[]).forEach(g=>g.visible=on)}/* v199zzzzzz：整組 Shifter（SRAM＋Shimano）掉進 G.shRoll，繞「龍頭軸線」（stemC→bar，經 G.shift 原點）轉 180°；軸向由 applyNodes 每次重算 */var SHM_PITCH=Math.PI/2,SHM_DX=7,SHM_DY=-10,SHM_DH=32,SHM_DZ=-5,SHM_IN=17*Math.PI/180,SHM_RT=-7*Math.PI/180,SHM_BOT=0,SHM_BY=0,SHM_PLN=1,SHM_BT=0,SHM_BN=0,SHM_IW=11,SHM_TO=10;/* v199zzzzzz21：SHM_IW 14→11（往外 3 mm） *//* v199zzzzzz20：SHM_IW 7→14（再往內 7 mm） *//* v199zzzzzz19：SHM_IW＝Shimano 整支往車身中心平移（mm）；SHM_TO＝以橡膠套尾端平面法向量為軸（過平面中心），左右各自往外八（煞車桿底端往外擺）旋轉的角度（度） *//* v199zzzzzz16：SHM_PLN＝1 時改以「橡膠套尾端平面」錨定 Shimano：繞 Shimano 平面中心旋轉使其法向量與 SRAM 的同向，再平移使兩平面共面且平面中心（沿切線×橫向範圍之中點）重合；SHM_BT／SHM_BN＝沿平面切線（側視、向上為正）／沿法向的微調 mm。此模式不使用 SHM_PITCH、SHM_IN、SHM_RT、SHM_DX／DY／DH／DZ 與 180° 翻轉；SHM_PLN＝0 回舊流程。以下為舊說明：SHM_BOT＝1 時，Shimano 橡膠套（rub）最低點比照 SRAM 橡膠套（shHood＋shCover）在 G.shift 局部座標的最低點對齊（對齊後 SHM_DY／SHM_DH 的上下量被抵銷）；SHM_BY＝對齊後再加的上下微調（mm，上＝正） *//* v199zzzzzz14：SHM_RT＝兩支 Shimano 整體以上碗組中心為圓心、在側視平面內旋轉的角度（從右側看逆時針為正；−7°＝順時針 7°），施於 W1，位置與朝向一併繞圓心轉 *//* v199zzzzzz13：SHM_DZ 2→−5（再往外 7 mm）。 *//* v199zzzzzz11：SHM_IN 20°→17°；SHM_DZ 9→2（再往外 7 mm，相當於淨往內 2 mm）。 *//* v199zzzzzz10：SHM_IN＝左右兩支各自繞自身包圍盒中心、繞 Shifter 原始姿態的垂直軸（翻轉＋俯仰後朝前、與視線平行）往內轉的角度；從車後往前看，現況左側那支（原始右側件 g[0]）順時針、右側那支逆時針（上端朝車身中心面倘） *//* v199zzzzzz8：SHM_DZ＝Shimano 左右兩支各往內（朝車身中心面）平移 mm *//* v199zzzzzz4：SHM_DH＝沿頭管軸心向下平移（mm，方向＝n.HTt→n.HTb），積到 SHM_DX／SHM_DY 之上 *//* v199zzzzzz3：SHM_DX／SHM_DY＝整組 Shifter 在「世界側視」的平移（mm，右＝前，上＝正），由 shRollApply 依 G.shift 的 rotation.z 換算回局部座標 *//* v199zzzzzz2：在 180° 翻轉之後，各支 Shifter 繞自身包圍盒中心、繞側向（G.shift 的 z）再轉 SHM_PITCH：從右側看逆時針＝正。組成 W1（位置 c2、繞 z）→W2（位置 −c2、繞龍頭軸 180°）→g */
G.shWrap=[...G.shSideM].map(g=>{const W1=new THREE.Group(),W2=new THREE.Group(),W3=new THREE.Group();G.shift.add(W1);W1.add(W2);W2.add(W3);W3.add(g);return[W1,W2,g,W3]});
function shCtr(g){g.updateMatrix();const mn=new THREE.Vector3(1e9,1e9,1e9),mx=new THREE.Vector3(-1e9,-1e9,-1e9),p=new THREE.Vector3();g.traverse(o=>{if(!o.isMesh)return;o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;if(o.parent!==g)o.parent.updateMatrix();for(let i=0;i<8;i++){p.set(i&1?b.max.x:b.min.x,i&2?b.max.y:b.min.y,i&4?b.max.z:b.min.z);if(o.parent!==g)p.applyMatrix4(o.parent.matrix);mn.min(p);mx.max(p)}});return mn.add(mx).multiplyScalar(.5).applyMatrix4(g.matrix)}
/* v199zzzzzz17：橡膠套「尾端平面」＝橡膠套尾端被截斷的那一面（使用者 2026-11-12 圖示：SRAM 為貼彎把處的尾端面，Shimano 為橡膠套本體最底端面；法向量朝外、箭頭＝−法向量指向橡膠套本體）。作法：給定粗略外法向 n0（模型固定，見 SHM_N0），取沿 n0 最外 3 mm 內的頂點，迭代 3 次做最小平方平面擬合，得外法向與形心。 */
function shSlab(me,n0){const P=me.geometry.attributes.position,N=P.count;let n=n0.slice(),l=Math.hypot(n[0],n[1],n[2]);n=[n[0]/l,n[1]/l,n[2]/l];let cx=0,cy=0,cz=0;for(let it=0;it<4;it++){let mx=-1e9,i,d;for(i=0;i<N;i++){d=n[0]*P.getX(i)+n[1]*P.getY(i)+n[2]*P.getZ(i);if(d>mx)mx=d}const S=[];cx=cy=cz=0;for(i=0;i<N;i++){d=n[0]*P.getX(i)+n[1]*P.getY(i)+n[2]*P.getZ(i);if(d>=mx-.003){S.push(i);cx+=P.getX(i);cy+=P.getY(i);cz+=P.getZ(i)}}const k=S.length;if(k<6)return null;cx/=k;cy/=k;cz/=k;let ux=[-n[1],n[0],0],ul=Math.hypot(ux[0],ux[1]);if(ul<1e-6){ux=[0,-n[2],n[1]];ul=Math.hypot(ux[1],ux[2])}ux=[ux[0]/ul,ux[1]/ul,ux[2]/ul];const wx=[n[1]*ux[2]-n[2]*ux[1],n[2]*ux[0]-n[0]*ux[2],n[0]*ux[1]-n[1]*ux[0]];let suu=0,sww=0,suw=0,sud=0,swd=0;S.forEach(i=>{const x=P.getX(i)-cx,y=P.getY(i)-cy,z=P.getZ(i)-cz,u=ux[0]*x+ux[1]*y+ux[2]*z,w=wx[0]*x+wx[1]*y+wx[2]*z,dd=n[0]*x+n[1]*y+n[2]*z;suu+=u*u;sww+=w*w;suw+=u*w;sud+=u*dd;swd+=w*dd});const det=suu*sww-suw*suw;if(Math.abs(det)<1e-20)break;const A=(sud*sww-swd*suw)/det,B=(swd*suu-sud*suw)/det;let m=[n[0]-A*ux[0]-B*wx[0],n[1]-A*ux[1]-B*wx[1],n[2]-A*ux[2]-B*wx[2]];l=Math.hypot(m[0],m[1],m[2]);n=[m[0]/l,m[1]/l,m[2]/l]}return{n,c:[cx,cy,cz]}}
function shMean(me){if(me.userData.mn)return me.userData.mn;const P=me.geometry.attributes.position,N=P.count;let x=0,y=0,z=0;for(let i=0;i<N;i++){x+=P.getX(i);y+=P.getY(i);z+=P.getZ(i)}return me.userData.mn=[x/N,y/N,z/N]}
function shChain(me,root){const m=new THREE.Matrix4();for(let o=me;o&&o!==root;o=o.parent){o.updateMatrix();m.premultiply(o.matrix)}return m.elements}
function shPt(e,c){return[e[0]*c[0]+e[4]*c[1]+e[8]*c[2]+e[12],e[1]*c[0]+e[5]*c[1]+e[9]*c[2]+e[13],e[2]*c[0]+e[6]*c[1]+e[10]*c[2]+e[14]]}
function shPl(me,root,n0){if(me.userData.tp===undefined)me.userData.tp=shSlab(me,n0);const tp=me.userData.tp;if(!tp)return null;const e=shChain(me,root),n=tp.n,nx=e[0]*n[0]+e[4]*n[1]+e[8]*n[2],ny=e[1]*n[0]+e[5]*n[1]+e[9]*n[2],nz=e[2]*n[0]+e[6]*n[1]+e[10]*n[2],l=Math.hypot(nx,ny,nz);return{n:[nx/l,ny/l,nz/l],c:shPt(e,tp.c)}}
const SHM_N0S=[-.88,-.47,.07],SHM_N0M=[-.2,-.98,0];/* SRAM／Shimano 橡膠套尾端面的粗略外法向（各自網格原始座標） */
function shRollApply(ux,uy,hx,hy,px,py){const l=Math.hypot(ux,uy)||1,ax=new THREE.Vector3(ux/l,uy/l,0),r=-G.shift.rotation.z,cr=Math.cos(r),sr=Math.sin(r),ox=((SHM_DX+SHM_DH*hx)*cr-(SHM_DY+SHM_DH*hy)*sr)*1e-3,oy=((SHM_DX+SHM_DH*hx)*sr+(SHM_DY+SHM_DH*hy)*cr)*1e-3;G.shWrap.forEach(([W1,W2,g,W3],wi)=>{g.children[0].scale.z=SHM_PLN?1:-1;if(SHM_PLN){W2.position.set(0,0,0);W2.quaternion.set(0,0,0,1);W3.position.set(0,0,0);W3.quaternion.set(0,0,0,1);W1.position.set(0,0,0);W1.quaternion.set(0,0,0,1);let hm=null,lv=null;g.traverse(o=>{if(o.isMesh){if(o.userData.rb)hm=o;if(o.userData.lv)lv=o}});const sh=G.shSide[wi].children[0],sl=G.shSide[wi].children[2],ps=shPl(sh,G.shift,SHM_N0S),pm=hm&&shPl(hm,W1,SHM_N0M);if(ps&&pm&&lv){const nm=pm.n,ns=ps.n,ax=[nm[1]*ns[2]-nm[2]*ns[1],nm[2]*ns[0]-nm[0]*ns[2],nm[0]*ns[1]-nm[1]*ns[0]],sn=Math.hypot(ax[0],ax[1],ax[2]),cs=nm[0]*ns[0]+nm[1]*ns[1]+nm[2]*ns[2],q1=new THREE.Quaternion();if(sn>1e-9)q1.setFromAxisAngle(new THREE.Vector3(ax[0]/sn,ax[1]/sn,ax[2]/sn),Math.atan2(sn,cs));const q2=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(ns[0],ns[1],ns[2]),Math.PI).multiply(q1),ls=shPt(shChain(sl,G.shift),shMean(sl)),lm=shPt(shChain(lv,W1),shMean(lv)),ds=[ls[0]-ps.c[0],ls[1]-ps.c[1],ls[2]-ps.c[2]],dm=new THREE.Vector3(lm[0]-pm.c[0],lm[1]-pm.c[1],lm[2]-pm.c[2]),perp=(v,n)=>{const d=v[0]*n[0]+v[1]*n[1]+v[2]*n[2];return[v[0]-d*n[0],v[1]-d*n[1],v[2]-d*n[2]]},sc=q=>{const o=dm.clone().applyQuaternion(q),p=perp([o.x,o.y,o.z],ns),r=perp(ds,ns);return p[0]*r[0]+p[1]*r[1]+p[2]*r[2]},q=sc(q1)>=sc(q2)?q1:q2;W1.quaternion.copy(q);const rc=new THREE.Vector3(pm.c[0],pm.c[1],pm.c[2]).applyQuaternion(q),tl=Math.hypot(ns[0],ns[1])||1,tx=-ns[1]/tl,ty=ns[0]/tl;W1.position.set(ps.c[0]-rc.x+tx*SHM_BT*1e-3+ns[0]*SHM_BN*1e-3,ps.c[1]-rc.y+ty*SHM_BT*1e-3+ns[1]*SHM_BN*1e-3,ps.c[2]-rc.z+ns[2]*SHM_BN*1e-3);{const sd=ps.c[2]>=0?1:-1;W1.position.z-=sd*SHM_IW*1e-3;const cc=new THREE.Vector3(ps.c[0]+tx*SHM_BT*1e-3+ns[0]*SHM_BN*1e-3,ps.c[1]+ty*SHM_BT*1e-3+ns[1]*SHM_BN*1e-3,ps.c[2]+ns[2]*SHM_BN*1e-3-sd*SHM_IW*1e-3),lc=new THREE.Vector3(lm[0],lm[1],lm[2]).applyQuaternion(W1.quaternion).add(W1.position),r=lc.clone().sub(cc),cz=ns[0]*r.y-ns[1]*r.x,th=(cz*sd>=0?1:-1)*SHM_TO*Math.PI/180,qr=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(ns[0],ns[1],ns[2]),th);W1.position.sub(cc).applyQuaternion(qr).add(cc);W1.quaternion.premultiply(qr)}}return}const c2=shCtr(g).applyAxisAngle(ax,Math.PI);W1.position.set(c2.x+ox,c2.y+oy,c2.z-Math.sign(c2.z)*SHM_DZ*1e-3);W1.rotation.z=SHM_PITCH;{const rr=-G.shift.rotation.z,cr2=Math.cos(rr),sr2=Math.sin(rr),gx=px-G.shift.position.x,gy=py-G.shift.position.y,plx=gx*cr2-gy*sr2,ply=gx*sr2+gy*cr2,qx=W1.position.x-plx,qy=W1.position.y-ply,ca=Math.cos(SHM_RT),sa=Math.sin(SHM_RT);W1.position.x=plx+qx*ca-qy*sa;W1.position.y=ply+qx*sa+qy*ca;W1.rotation.z=SHM_PITCH+SHM_RT}W2.position.set(-c2.x,-c2.y,-c2.z);W2.quaternion.setFromAxisAngle(ax,Math.PI);{const p=shCtr(g);W3.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),(wi?-1:1)*SHM_IN);W3.position.copy(p).sub(p.clone().applyQuaternion(W3.quaternion))}})}/* v199zzzzx：105／Dura-Ace 顯示 Shimano Shifter，其餘為現行 Shifter */
G.cpStem=new THREE.Mesh(rgeo(1,1,.02,28,.12).rotateZ(Math.PI/2),M.cp);bike.add(G.cpStem);G.cpStem.visible=false;G.cockpit.visible=false;
G.oraHead=grp();(function(){const g=G.oraHead;const hd=zc(g,.011,.034,M.tiP);hd.scale.x=2.2;[-1,1].forEach(s=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.0065,.0065,.026,16),M.steel);b.position.set(s*.016,-.018,0);g.add(b)})})();G.oraHead.visible=false;
G.seat=grp();(function(){/* 座墊：由 STEP（Saddle_02.stp）實測；座墊外殼為薄殼拱形（約 4–5 mm），分內外兩面放樣，座弓為單一封閉鋼絲。
  外殼：沿長度 69 站（兩端加密），每站以截面下方 25 mm 處為中心、掃 65 條射線，取最近交點＝內面、最遠交點＝外面。站列 [y(mm), cx, cz, 起角, 止角, 外面半徑×97, 內面半徑×97]，cx、cz、半徑單位 0.02 mm、角度單位 1e-4 rad。
  座弓：兩側中心線（STEP 截面重心）接後弧與前端，掃 ø8 圓管。STEP (x,y,z) → 局部 (Z=x, X=y−Y0, Y=z−Z0−5.5 mm)；原點為座弓平直段中心（Y0=-199、Z0＝該處座弓高−4.6 mm，與前版相同關係）。 */
  const SD=VIBE_D.SADDLE_SD,X=y=>(y-SD.Y0)*1e-3,Yh=z=>(z-SD.Z0)*1e-3-.0055;
  /* 座弓：+Z 側由後弧到前端，再鏡射回 −Z 側，閉合成單一線圈 */
  const R=SD.rail,pp=R.map(r=>new V3(X(r[0]),Yh(r[2]),r[1]*1e-3));
  for(let i=R.length-2;i>=1;i--)pp.push(new V3(X(R[i][0]),Yh(R[i][2]),-R[i][1]*1e-3));
  G.seat.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pp,true,'centripetal'),190,.004,8,true),M.dark));
  /* 座墊外殼：外面＋內面＋兩側邊緣＋兩端封口（邊緣與封口用獨立頂點以保持銳邊） */
  const NA=SD.NA,U=SD.U,st=SD.sad,N=st.length,P=[],I=[];
  [0,NA].forEach(off=>st.forEach(r=>{const cx=r[1]/U,cz=r[2]/U,a0=r[3]/1e4,a1=r[4]/1e4;for(let k=0;k<NA;k++){const ph=a0+(a1-a0)*k/(NA-1),rr=r[5+off+k]/U;P.push(X(r[0]),Yh(cz+rr*Math.sin(ph)),(cx+rr*Math.cos(ph))*1e-3)}}));
  const O=(i,k)=>i*NA+k,In=(i,k)=>N*NA+i*NA+k;
  for(let i=0;i<N-1;i++)for(let k=0;k<NA-1;k++){
    I.push(O(i,k),O(i+1,k),O(i,k+1),O(i,k+1),O(i+1,k),O(i+1,k+1));
    I.push(In(i,k),In(i,k+1),In(i+1,k),In(i,k+1),In(i+1,k+1),In(i+1,k))}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setIndex(I);g.computeVertexNormals();
  M.saddle.side=THREE.DoubleSide;G.seat.add(new THREE.Mesh(g,M.saddle));
  const P2=[],I2=[],q=(i,k,inn)=>{const j=inn?In(i,k):O(i,k);return[P[j*3],P[j*3+1],P[j*3+2]]};
  const strip=(A,B,C,D)=>{const n=P2.length/3;[A,B,C,D].forEach(v=>P2.push(...v));I2.push(n,n+1,n+2,n+1,n+3,n+2)};
  for(let i=0;i<N-1;i++)[0,NA-1].forEach(k=>strip(q(i,k,0),q(i,k,1),q(i+1,k,0),q(i+1,k,1)));
  [0,N-1].forEach(i=>{for(let k=0;k<NA-1;k++)strip(q(i,k,0),q(i,k,1),q(i,k+1,0),q(i,k+1,1))});
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(P2,3));g2.setIndex(I2);g2.computeVertexNormals();
  G.seat.add(new THREE.Mesh(g2,M.saddle));
  zc(G.seat,.0105,.042,M.dark)})();
// 地面陰影（v199zzzzzz85）：由正上方離屏取車身剪影（全高＋兩層貼地薄片）→ 各層以不同半徑模糊、疊成接地陰影 → 貼在地面。換車款／尺寸／零件後停手 SH_WAIT ms 重算一次；算完前先用舊的橢圓。
(function(){
  const SW=2.6,SD=1,TW=512,TH=Math.round(TW*SD/SW),SH_WAIT=320;/* 取景範圍 2.6×1.0 m（車身 x 約 ±0.85、z ±0.26 m，置中；六款×XS／XL 實測羽化帶內不透明度 ≤0.012），每像素約 5 mm */
  const cv=document.createElement('canvas');cv.width=TW;cv.height=TH;const x=cv.getContext('2d');
  {const gr=x.createRadialGradient(0,0,4,0,0,64);gr.addColorStop(0,'rgba(0,0,0,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');x.save();x.translate(TW/2,TH/2);x.scale(TW*(2/SW)/128,TH*(.5/SD)/128);x.fillStyle=gr;x.fillRect(-64,-64,128,128);x.restore()}/* 舊橢圓：2×0.5 m，第一次重算完成前的暫用 */
  const tex=new THREE.CanvasTexture(cv);
  G.shadow=new THREE.Mesh(new THREE.PlaneGeometry(SW,SD),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
  G.shadow.rotation.x=-Math.PI/2;G.shadow.position.y=.002;scene.add(G.shadow);
  /* 離屏工具：借主畫布的左下角取景（viewport），畫完立刻 drawImage 到 2D 畫布；主畫面在同一個 drawFrame 內隨後整張重畫，所以不留殘影。 */
  const sc=new THREE.PerspectiveCamera(),shM=new THREE.MeshBasicMaterial({color:0,side:THREE.DoubleSide,toneMapped:false}),ZH=3;
  sc.position.set(0,ZH,0);sc.up.set(0,0,-1);sc.lookAt(0,0,0);sc.updateMatrixWorld(true);/* 相機在 y＝3 m 向下看；畫面右＝+x、上＝−z（與地面 plane 的貼圖方向一致） */
  const rd=document.createElement('canvas');rd.width=TW;rd.height=TH;const rx=rd.getContext('2d',{willReadFrequently:true});
  const N=TW*TH,acc=new Float32Array(N),A=new Float32Array(N),T=new Float32Array(N);
  function bblur(a,w,h,r){const n=2*r+1;for(let it=0;it<3;it++){
    for(let y=0;y<h;y++){let s=0;const o=y*w;for(let q=0;q<=r&&q<w;q++)s+=a[o+q];for(let q=0;q<w;q++){T[o+q]=s/n;const xa=q+r+1,xb=q-r;if(xa<w)s+=a[o+xa];if(xb>=0)s-=a[o+xb]}}
    for(let q=0;q<w;q++){let s=0;for(let y=0;y<=r&&y<h;y++)s+=T[y*w+q];for(let y=0;y<h;y++){a[y*w+q]=s/n;const ya=y+r+1,yb=y-r;if(ya<h)s+=T[ya*w+q];if(yb>=0)s-=T[yb*w+q]}}}}
  /* 三層：[薄片頂高 m（0＝不切，整台）, 模糊半徑 px, 強度]。整台＝大範圍柔影；<0.22 m＝輪組與曲柄的中等影；<0.05 m＝胎面與地面接觸處的深色接觸影 */
  const LAY=[[0,30,.66],[.22,16,.48],[.05,8,.66]];/* v199zzzzzz87：模糊半徑加大讓過渡柔和（30／16／8），強度調深三階（使用者 2026-11-17） */
  let dirty=true,at=performance.now()+1500,busy=false,li=0;
  const ss=new THREE.Vector2();
  /* 每次只畫一層（1 次離屏繪製＋1 次模糊），分攤到連續幾個畫面，避免換車款停手後出現一次性卡頓；中途又被標髒就從頭來。 */
  function step(){
    if(busy||window.__ctxLost)return false;
    const gl=renderer.domElement,pr=renderer.getPixelRatio(),bw=gl.width,bh=gl.height,vw=Math.min(TW,bw),vh=Math.min(Math.round(vw*SD/SW),bh);
    if(vw<64||vh<26)return false;
    busy=true;const[h,r,k]=LAY[li],vis=scene.children.map(c=>c.visible),oM=scene.overrideMaterial;renderer.getSize(ss);let ok=true;
    scene.children.forEach(c=>{c.visible=(c===bike)});scene.overrideMaterial=shM;
    try{renderer.setViewport(0,0,vw/pr,vh/pr);
      sc.projectionMatrix.makeOrthographic(-SW/2,SW/2,SD/2,-SD/2,h?ZH-h:.2,ZH+.05);sc.projectionMatrixInverse.copy(sc.projectionMatrix).invert();
      renderer.render(scene,sc);rx.clearRect(0,0,TW,TH);rx.drawImage(gl,0,bh-vh,vw,vh,0,0,TW,TH);
      const d=rx.getImageData(0,0,TW,TH).data;for(let i=0;i<N;i++)A[i]=d[i*4+3]/255;
      bblur(A,TW,TH,r);if(li===0)acc.fill(1);for(let i=0;i<N;i++)acc[i]*=1-Math.min(1,A[i]*k)
    }catch(e){ok=false;console.warn('shadow bake',e)}
    scene.children.forEach((c,i)=>{c.visible=vis[i]});scene.overrideMaterial=oM;renderer.setViewport(0,0,ss.x,ss.y);busy=false;return ok}
  function commit(){
    const im=x.createImageData(TW,TH),D=im.data,fx=Math.round(TW*.06),fy=Math.round(TH*.06);let eg=0;
    for(let yy=0;yy<TH;yy++){const ey=Math.min(1,Math.min(yy,TH-1-yy)/fy);for(let xx=0;xx<TW;xx++){const ex=Math.min(1,Math.min(xx,TW-1-xx)/fx),f=ex*ey,i=yy*TW+xx,a=1-acc[i];if(f<1&&a>eg)eg=a;D[i*4+3]=Math.round(255*a*f*f*(3-2*f))}}/* 邊緣羽化，避免取景框邊界露出直線；eg＝羽化帶內原本的最大不透明度；v199zzzzzz88 陰影加深後實測 0.017–0.022（模糊尾端所致，非車身出框），門檻改為 0.03 */
    x.putImageData(im,0,0);tex.needsUpdate=true;window.__SH.edge=eg;STU.fit()/* v199zzzzzz112：陰影重算完成＝車款／尺寸／零件停手後，攝影棚取景跟著同一個時機 */}
  function bake(){li=0;for(;li<LAY.length;li++)if(!step())return false;commit();li=0;dirty=false;return true}/* 一次做完（測試用） */
  G.shMark=(ms)=>{dirty=true;li=0;at=performance.now()+(ms||SH_WAIT)};
  G.shTick=()=>{if(G.exOn&&G.exOn())return;/* v199zzzzzz87：拆解中不重算陰影（零件散開的剪影無意義），復原後再補 */if(!dirty||performance.now()<at)return;if(!step()){at=performance.now()+2000;li=0;return}
    if(++li>=LAY.length){commit();li=0;dirty=false}else if(typeof wk==='function')wk(3)};
  window.__SH={bake,mark:G.shMark,cv,dirty:()=>dirty,edge:0};
  setTimeout(()=>G.shMark(100),4000);/* 開場補一次（延後載入的零件） */setTimeout(STU.fit,4200);/* v199zzzzzz112：開場第一次取景（在陰影開場補算之後） */
  ['click','change','input','keyup'].forEach(e=>window.addEventListener(e,()=>G.shMark(),{passive:true,capture:true}));
})();

/* v199zzzo：管徑依使用者 2026-11-11 規格（半徑 m）。頭管規格只給內徑，外徑＝內徑＋2×3 mm 壁厚（暫估）。325Ti／EX 上下管走 LOFT／LOFTEX（STEP 實測，使用者決定不動），tt／dt 只用於 AO、封口與下管 BB 端起點。SS-2205（'ss'）與 EX 原無鍵、退用 64Ti 半徑。 */
var ST_TAP={'325':.02};/* v199zzzr：錐形中管 BB 端半徑（m） */
const RADS={'64':{tt:.01745,dt:.021,st:.0175,ht:.0254},'325':{tt:.01745,dt:.021,st:.0159,ht:.0254},'audax':{tt:.0159,dt:.022,st:.0159,ht:.0254},'ili':{tt:.0159,dt:.0235,st:.0159,ht:.0254},'ss':{tt:.015,dt:.01905,st:.0159,ht:.0254},'ex':{tt:.01745,dt:.021,st:.0175,ht:.0254}};
const SPEC={'325':[["車架材質","3Al-2.5V 鈦合金異型管；焊後熱處理釋放殘餘應力"],["車種定位","All-road"],["前叉","BLK TEC F4 碳纖前叉"],["頭碗組","FSA No.55R 1.5\"/ACR"],["頭管規格","1 1/2\"，隱藏式（52 mm）"],["五通","T47 68 mm"],["後勾爪","UDH"],["煞車座","Flat Mount"],["走線","全內走線"],["後上叉貨架鎖孔","無"],["標準配胎","700×28C"],["最大胎幅","28C"],["輪組","Elitewheel Drive 40D"],["外胎","MAXXIS High Road 700×28C"],["貫通軸","前 12×100／後 12×142 mm"],["傳動（機械）","Shimano 105 R7120"],["傳動（電子）","Shimano 105 Di2 R7170"],["齒比","50-34T／11-34T"],["煞車卡鉗","Shimano BR-R7170"],["碟盤","中心鎖入式 160／160 mm"],["龍頭","Vision SMR"],["把手","FSA K-Force Compact"],["把帶","3 mm PU（黑）"],["座管","FSA K-Force SB25・27.2 mm"],["座管束","RIKULAU 鈦座管束"],["座墊","Selle Italia SLR Advan"],["踏板","不含"],["保固","車架終身；非消耗性零件一年"]],'ss':[["車架材質","M3 雙相不鏽鋼 S32205（無縫管）"],["表面處理","僅拉絲，加貼無膜標貼紙；不承接陽極與塗裝客製"],["車種定位","Gravel"],["前叉","BLK TEC GF4 碳纖前叉（可選帶貨架孔版）"],["頭碗組","FSA No.13 / 12B / 44 / ICR"],["頭管規格","1 1/2\"，外掛式（內徑 47.8 mm）"],["五通","T47 68 mm"],["後勾爪","UDH"],["煞車座","Flat Mount"],["走線","全內走線／外走線雙版本"],["後上叉貨架鎖孔","有"],["標準配胎","700×38C"],["最大胎幅","50C"],["輪組","DT Swiss GR 1600 Spline"],["外胎","MAXXIS Rambler 700×38C"],["貫通軸","前 12×100／後 12×142 mm"],["傳動（機械）","Shimano GRX RX820"],["傳動（電子）","Shimano GRX Di2 RX825"],["齒比","2×：48-31T／11-36T"],["煞車卡鉗","Shimano BR-RX820"],["碟盤","中心鎖入式 160／160 mm"],["龍頭","Vision SMR"],["把手","FSA A-Wing AGX"],["把帶","3 mm PU（黑）"],["座管","FSA Energy SB20・27.2 mm"],["座管束","鋁合金 CNC"],["座墊","Novus Boost Evo Superflow"],["踏板","不含"],["保固","車架五年（須出示發票）；非消耗性零件一年"]],'audax':[["定位","長距離公路／耐力騎乘"],["車架材質","3Al-2.5V 鈦合金雙抽管；成型、精密切割後熱處理釋放應力"],["塗裝","無塗裝選擇；表面處理僅拉絲，加貼無膜標貼紙"],["頭管","標準款 44 mm ID 直頭管；XXS 為 34–37 mm"],["前叉豎管","舊繁中頁 1-1/2\"；舊英文頁 1-1/4\"（文字不一致，訂購前須核對）"],["五通","BSA 標準鎖牙式"],["上管","31.8 mm"],["座管","31.8 mm，適用 27.2 mm 座桿"],["下管","44 mm"],["後上叉","16 mm"],["後下叉","25.4 mm"],["前叉長度","365 mm"],["前叉 Rake","43 mm"],["外胎","700×28C"],["貨架孔","後上叉／後部提供貨架安裝位置"],["幾何","官方舊頁為圖片，尚未逐值轉錄"]],'ili':[["定位","鈦合金碟煞礫石車"],["車架材質","3Al-2.5V 無縫鈦合金管；熱處理釋放應力"],["設計","44 mm 內徑頭管、全內走線、T47 五通；電子／機械變速相容"],["頭管","集成式，44 mm 內徑"],["上管","31.8 mm（舊頁未說明所有尺寸管形）"],["座管","31.8 mm；座桿 27.2 mm"],["下管","44 mm"],["後上叉","16 mm"],["後下叉","22.2 mm"],["煞車","碟煞；Flat Mount"],["五通","T47，68 mm"],["軸心","12 mm 直通軸"],["前叉","碳纖維；長度 397 mm；Rake 50 mm；Flat Mount"],["載物孔位","後上叉與前叉皆有貨架孔"],["外胎","舊英文頁 700×45C（最大胎幅須核對現行頁面）"],["幾何","官方舊頁為圖片，尚未逐值轉錄"]]},SPECSRC={'audax':'官方舊頁摘錄，須核對現行頁面','ili':'官方舊頁摘錄，須核對現行頁面'},NOSPEC={'64':'官網規格待擷取（幾何為使用者提供的官方表）','ex':'官網現行頁尚無可驗證規格，不套用其他 ili ili 車款資料'},ADDON_ALL=["鈦合金前叉：公路版 700×32C／礫石版 700×45C，全內走線","鈦合金龍頭：相容全內走線","鈦合金座管：27.2×350 mm，offset 25 mm","鈦合金曲柄組：Q-Factor 148 mm","鈦合金座管束：替換標準鋁合金 CNC 座管束","BLK TEC 碳纖座管：S6","BLK TEC 碳纖一體把：R8／G8／L8；R8 另有含碼表架版本","碳纖水壺架","車架表面處理客製：噴砂／拉絲／陽極／雷雕／簽名檔（可承接車型見 Customize 頁）"],MNAME={'64':'MASTER 64Ti','325':'MASTER 325Ti','audax':'AUDAX 325Ti','ili':'ili ili 325Ti','ss':'ili ili SS-2205','ex':'ili-ili EX 325Ti'};
let N=null,extras={blktec:false,ora:false};
const v=(p,z)=>new V3(p.x/1000,p.y/1000,z||0);
function trimAlong(p,w,C){/* 自 p 沿 w 前進，離開圓柱 C(A 軸上一點,d 軸向,R 半徑) 的距離；p 在圓柱外則不動 */
  const q=p.clone().sub(C.A),qd=q.dot(C.d),qp=q.clone().addScaledVector(C.d,-qd),wd=w.dot(C.d),wp=w.clone().addScaledVector(C.d,-wd),a=wp.dot(wp);
  if(a<1e-9)return 0;const c=qp.dot(qp)-C.R*C.R;if(c>0)return 0;const b=2*qp.dot(wp),D=b*b-4*a*c;if(D<0)return 0;return Math.max(0,(-b+Math.sqrt(D))/(2*a))}
function setTrimTube(m,a,b,r,sC,eC){const P=m.geometry.attributes.position.array,N=48,u=b.clone().sub(a),L=u.length();if(L<1e-5)return;u.divideScalar(L);
  const t=Math.abs(u.y)<.9?new V3(0,1,0):new V3(1,0,0),e1=new V3().crossVectors(u,t).normalize(),e2=new V3().crossVectors(u,e1),pt=new V3();
  [[a,sC,u],[b,eC,u.clone().negate()]].forEach(([c,C,w],ri)=>{for(let i=0;i<N;i++){const th=i/N*Math.PI*2;pt.copy(c).addScaledVector(e1,Math.cos(th)*r).addScaledVector(e2,Math.sin(th)*r);
    if(C)pt.addScaledVector(w,trimAlong(pt,w,C));const o=(ri*N+i)*3;P[o]=pt.x;P[o+1]=pt.y;P[o+2]=pt.z}});
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}
/* v186：兩端半徑不同的裁切管（同 setTrimTube，兩環半徑各自給定）；後上叉：座管端 r0＝9.5 mm、勾爪端 r1＝7 mm */
function setTrimTubeT(m,a,b,r0,r1,sC,eC){const P=m.geometry.attributes.position.array,N=48,u=b.clone().sub(a),L=u.length();if(L<1e-5)return;u.divideScalar(L);
  const t=Math.abs(u.y)<.9?new V3(0,1,0):new V3(1,0,0),e1=new V3().crossVectors(u,t).normalize(),e2=new V3().crossVectors(u,e1),pt=new V3();
  [[a,sC,u,r0],[b,eC,u.clone().negate(),r1]].forEach(([c,C,w,r],ri)=>{for(let i=0;i<N;i++){const th=i/N*Math.PI*2;pt.copy(c).addScaledVector(e1,Math.cos(th)*r).addScaledVector(e2,Math.sin(th)*r);
    if(C)pt.addScaledVector(w,trimAlong(pt,w,C));const o=(ri*N+i)*3;P[o]=pt.x;P[o+1]=pt.y;P[o+2]=pt.z}});
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}
/* v188：後上叉彎折管（EX 除外）。座管端→角點 d_b 為直線、角點後為主線（座管端虛擬起點外移 CS_B0＝24.7 mm → 勾爪端，取自 EX 實測主段）；角點在 ±CS_BW 內以平滑步階過渡。d_b＝叉管表面（r9.5）接觸外胎外圓處；64 環（角點附近 20 環加密）×48 點，座管端環以座管圓柱裁切 */
/* v189：CS_BW 圓角半長 18 mm（v188 為 7，角點太尖）；CS_ROT＝整枝後上叉以勾爪端為圓心、繞垂直軸向座管方向旋轉的角度（度）；CS_BRD＝架橋管位置（角點距離 d_b 的比例，自座管端起算）、CS_BRR＝架橋管半徑 6 mm（ø12） */
var CS_B0=.0247,CS_BW=0.085,CS_ROT=1.5,CS_BSH=.025,CS_BRD=0.55,CS_BRR=.006;
function setSeatStay(m,F,E,r0,r1,sC,side){const NR=64,NP=48;
  if(m.userData.bent!==2){const g=new THREE.BufferGeometry(),ix=[];g.setAttribute('position',new THREE.BufferAttribute(new Float32Array((NR*NP+1)*3),3));
    for(let i=0;i<NR-1;i++)for(let j=0;j<NP;j++){const a=i*NP+j,b=i*NP+(j+1)%NP,c=(i+1)*NP+j,d=(i+1)*NP+(j+1)%NP;ix.push(a,b,c,b,d,c)}
    for(let j=0;j<NP;j++)ix.push(NR*NP,(NR-1)*NP+j,(NR-1)*NP+(j+1)%NP);
    g.setIndex(ix);m.geometry=g;m.userData.bent=2;m.frustumCulled=false}
  m.position.set(0,0,0);m.scale.set(1,1,1);m.quaternion.identity();
  const L=F.distanceTo(E);if(L<1e-5)return;const zv=F.z+side*CS_B0,w=CS_BW,ra=N?N.RA:null,Rt=N?N.R/1000+.0095:0;
  let db=.085;if(ra){const rx=ra.x/1000,ry=ra.y/1000;for(let k=0;k<=400;k++){const d=L*k/400,t=d/L;if(Math.hypot(F.x+(E.x-F.x)*t-rx,F.y+(E.y-F.y)*t-ry)<Rt){db=d;break}}}
  db=Math.max(.03,Math.min(L-.08,db));const db0=db;db=Math.min(L-.08,db+CS_BSH);/* v190：角點往勾爪端移 CS_BSH＝25 mm（架橋管位置仍依原 db0） */
  const zB=d=>zv+(E.z-zv)*d/L,sl=(zB(db)-F.z)/db,zA=d=>F.z+sl*d,ss=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
  const ds=[];for(let i=0;i<44;i++)ds.push(L*i/43+1e-6*i);for(let i=0;i<20;i++)ds.push(db-w-.003+(2*w+.006)*i/19);ds.sort((p,q)=>p-q);
  const pts=[],ts=[];ds.forEach(d=>{d=Math.max(0,Math.min(L,d));const t=d/L,s=ss((d-(db-w))/(2*w));ts.push(t);pts.push(new V3(F.x+(E.x-F.x)*t,F.y+(E.y-F.y)*t,zA(d)*(1-s)+zB(d)*s))});
  {const th=CS_ROT*Math.PI/180,c=Math.cos(th),sn=Math.sin(th);pts.forEach(p=>{const vx=p.x-E.x,vz=p.z-E.z;p.x=E.x+vx*c+side*vz*sn;p.z=E.z+vz*c-side*vx*sn})}/* v189：繞 E 的垂直軸旋轉，使離勾爪端越遠越往中管偏（距離 s 處橫移 s·sinθ） */
  (G.ssP=G.ssP||{})[side]={pts:pts.map(p=>p.clone()),ds:ds.slice(),db:db0};
  const P=m.geometry.attributes.position.array,e1=new V3(),e2=new V3(),tg=new V3(),pt=new V3();
  for(let i=0;i<NR;i++){tg.copy(pts[Math.min(i+1,NR-1)]).sub(pts[Math.max(i-1,0)]).normalize();e1.crossVectors(tg,new V3(0,1,0)).normalize();e2.crossVectors(tg,e1);const r=r0+(r1-r0)*ts[i];
    for(let j=0;j<NP;j++){const th=j/NP*Math.PI*2;pt.copy(pts[i]).addScaledVector(e1,Math.cos(th)*r).addScaledVector(e2,Math.sin(th)*r);if(sC)pt.addScaledVector(tg,trimAlong(pt,tg,sC));/* v189：所有埋在座管內的環都收到座管表面（v187–188 只裁第一環，環距小於裁切量時會折返成凸緣） */const o=(i*NP+j)*3;P[o]=pt.x;P[o+1]=pt.y;P[o+2]=pt.z}}
  const o=NR*NP*3;P[o]=pts[NR-1].x;P[o+1]=pts[NR-1].y;P[o+2]=pts[NR-1].z;G.ssDb=db;
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals();
  if(side===1&&G.ssP[-1])seatBridge()}
/* v189：後上叉架橋管 ø12——水平橫跨左右後上叉中心線，位置在角點 d_b 的 CS_BRD 倍處（座管端與角點之間），兩端埋入叉管 */
function seatBridge(){if(!T.srBr){T.srBr=mkTube(M.ti)}
  const at=(s)=>{const o=G.ssP[s],db=o.db*CS_BRD+.022;/* v190：架橋管往勾爪端再移 22 mm（15+7） */for(let i=0;i<o.ds.length-1;i++){if(db<=o.ds[i+1]){const t=(db-o.ds[i])/(o.ds[i+1]-o.ds[i]);return o.pts[i].clone().lerp(o.pts[i+1],t)}}return o.pts[o.pts.length-1].clone()};
  const a=at(-1),b=at(1);a.y=b.y=(a.y+b.y)/2;a.x=b.x=(a.x+b.x)/2;setTube(T.srBr,a,b,CS_BRR);G.srBrPts=[a.clone(),b.clone()]}
function ensureStays(){if(T.csL)return;const sm=M.tiFr;
  const mk=(k,nS,N)=>{const g=new THREE.BufferGeometry(),idx=[];
    g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(nS*N*3),3));
    for(let i=0;i<nS-1;i++)for(let j=0;j<N;j++){const a=i*N+j,b=i*N+(j+1)%N,c=(i+1)*N+j,d=(i+1)*N+(j+1)%N;idx.push(a,b,c,b,d,c)}
    g.setIndex(idx);const m=new THREE.Mesh(g,sm);m.frustumCulled=false;bike.add(m);T[k]=m};
  [['csL',EXST.cs,32],['csR',EXST.cs,32],['ssL',EXST.ss,32],['ssR',EXST.ss,32]].forEach(([k,rows,N])=>mk(k,rows.length,N));
  mk('supL',2,32)}
/* 左側支撐管（EX_Upper_CS.stp：ø12.7 直管；僅左側，上端接後上叉中心線、下端接後下叉中心線） */
function setSup(m,p0,p1,r){const P=m.geometry.attributes.position.array,N=P.length/6,tg=p1.clone().sub(p0).normalize(),a=new V3(0,1,0);if(Math.abs(tg.y)>.9)a.set(1,0,0);
  const u=new V3().crossVectors(tg,a).normalize(),w=new V3().crossVectors(tg,u).normalize(),p=new V3();
  [p0,p1].forEach((c,i)=>{for(let j=0;j<N;j++){const th=j/N*Math.PI*2;p.copy(c).addScaledVector(u,r*Math.cos(th)).addScaledVector(w,r*Math.sin(th));const o=(i*N+j)*3;P[o]=p.x;P[o+1]=p.y;P[o+2]=p.z}});
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}
function stayPts(rows,A,B,Y0,Y1,Z0,Z1,side){return rows.map(r=>{const t=(r[0]-Y0)/(Y1-Y0);return new V3((A.x+(B.x-A.x)*t)/1000,(A.y+(B.y-A.y)*t+(r[2]-(Z0+(Z1-Z0)*t)))/1000,side*r[1]/1000)})}
function stayAtY(rows,pts,Yq){for(let i=0;i<rows.length-1;i++){const a=rows[i][0],b=rows[i+1][0];if((Yq-a)*(Yq-b)<=0){const t=(Yq-a)/(b-a);return pts[i].clone().lerp(pts[i+1],t)}}return pts[rows.length-1].clone()}
function setStay(m,rows,A,B,Y0,Y1,Z0,Z1,side,trimC){/* 依實測列，沿 A→B 弦線放樣，保留相對弦線的彎曲與橫向展開 */
  const P=m.geometry.attributes.position.array,nS=rows.length,N=P.length/3/nS,pts=rows.map(r=>{const t=(r[0]-Y0)/(Y1-Y0);
    return new V3((A.x+(B.x-A.x)*t)/1000,(A.y+(B.y-A.y)*t+(r[2]-(Z0+(Z1-Z0)*t)))/1000,side*r[1]/1000)});
  const tg=new V3(),nn=new V3(),bb=new V3(),p=new V3();
  for(let i=0;i<nS;i++){tg.copy(pts[Math.min(i+1,nS-1)]).sub(pts[Math.max(i-1,0)]).normalize();nn.set(0,1,0).addScaledVector(tg,-tg.y).normalize();bb.crossVectors(tg,nn).normalize();
    const hs=rows[i][4]/2000,ws=rows[i][3]/2000;
    for(let j=0;j<N;j++){const th=j/N*Math.PI*2;p.copy(pts[i]).addScaledVector(nn,hs*Math.sin(th)).addScaledVector(bb,ws*Math.cos(th));
      if(i===0&&trimC)p.addScaledVector(tg,trimAlong(p,tg,trimC));const o=(i*N+j)*3;P[o]=p.x;P[o+1]=p.y;P[o+2]=p.z}}
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}
const shf=(a,b,d)=>a.clone().add(b.clone().sub(a).normalize().multiplyScalar(d));
/* v185：後下叉放樣管（EX 除外）。截面 [半寬(水平), 半高(垂直), 超橢圓指數]：五通端 15.5×25 圓角矩形（n=3）、輪軸端 18×25.4 橢圓（n=2），沿叉管線性漸變；寬向＝垂直於叉管軸的水平方向，高向＝其正交（垂直為主）。兩端以扇形封蓋 */
/* v199zzzo：後下叉改依規格管徑——除 64Ti 外為 Ø22.2（64Ti 維持 v185 截面），等徑圓管（n＝2），取代 v185 照片截面（五通端 15.5×25、輪軸端 18×25.4）。 */var CS_BZ=.0263,CS_BS=.018,CS_RR={'64':.0127},CS_NR=48,CS_NP=64;function csAB(){return[[.00775,.0125,3],[.009,.0127,2]]}/* v199zzzzx：後下叉截面（五通端 15.5×25 圓角矩形→輪軸端 18×25.4 橢圓）全車款同 64Ti（使用者 2026-11-12；EX 不走放樣）。CS_RR 不再使用 */
function csLoft(m,F,E){
  if(!m.userData.loft){const g=new THREE.BufferGeometry(),NR=CS_NR,NP=CS_NP,V=(NR+2)*NP,ix=[];g.setAttribute('position',new THREE.BufferAttribute(new Float32Array((NR*NP+2)*3),3));
    for(let i=0;i<NR-1;i++)for(let j=0;j<NP;j++){const a=i*NP+j,b=i*NP+(j+1)%NP,c=(i+1)*NP+j,d=(i+1)*NP+(j+1)%NP;ix.push(a,b,c,b,d,c)}
    const c0=NR*NP,c1=NR*NP+1;for(let j=0;j<NP;j++){const k=(j+1)%NP;ix.push(c0,k,j);ix.push(c1,(NR-1)*NP+j,(NR-1)*NP+k)}
    g.setIndex(ix);m.geometry=g;m.userData.loft=1;m.frustumCulled=false}
  m.position.set(0,0,0);m.scale.set(1,1,1);m.quaternion.identity();
  const u=E.clone().sub(F),L=u.length()||1e-4;u.divideScalar(L);const w=new V3(0,1,0).cross(u).normalize(),h=u.clone().cross(w);if(h.y<0)h.negate();
  const [CS_A,CS_B]=csAB(),P=m.geometry.attributes.position.array,NR=CS_NR,NP=CS_NP,sp=(x,e)=>Math.sign(x)*Math.pow(Math.abs(x),e);
  for(let i=0;i<NR;i++){const t=i/(NR-1),a=CS_A[0]+(CS_B[0]-CS_A[0])*t,b=CS_A[1]+(CS_B[1]-CS_A[1])*t,n=CS_A[2]+(CS_B[2]-CS_A[2])*t,e=2/n,cx=F.x+u.x*L*t,cy=F.y+u.y*L*t,cz=F.z+u.z*L*t;
    for(let j=0;j<NP;j++){const th=j/NP*Math.PI*2,x=a*sp(Math.cos(th),e),y=b*sp(Math.sin(th),e),o=(i*NP+j)*3;P[o]=cx+w.x*x+h.x*y;P[o+1]=cy+w.y*x+h.y*y;P[o+2]=cz+w.z*x+h.z*y}}
  const o0=NR*NP*3;P[o0]=F.x;P[o0+1]=F.y;P[o0+2]=F.z;P[o0+3]=E.x;P[o0+4]=E.y;P[o0+5]=E.z;
  m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}
/* v183：鏈條大盤端 z／半徑——舊版 z=.07、R100；MASTER STEP 組 z=.043+CRK_D、R100；ili-ili 組 z=CRK_GZ+CRK_GD、R=CRK_GR */
function chZ(){return SERK?SERK.z:CRKF?CRK_FZ:CRKA?CRK_AZ:CRKG?CRK_GZ+CRK_GD:.043+CRK_D}function chR(){return SERK?SERK.r:CRKF?CRK_FR:CRKA?CRK_AR:CRKG?CRK_GR:100}
var RD_DZX=-.005;function rdDZ(){return chZ()-RD_ZP+RD_DZX}/* v190：吊耳固定不動（板內側面貼勾爪 80.5）；RD 導輪面對齊大盤鏈線面 chZ() 後再往磟煞側 RD_DZX＝5 mm */
/* v199m：導輪軸心——自兩顆導輪網格（原點已移到圓心）分出「半徑 ≤ RDAX_R 且位於兩端外側（z ≤ RDAX_Z0 或 ≥ RDAX_Z1）」的三角形成為獨立網格（軸頭、螺帽），其餘留在導輪；軸心子網格隨導輪旋轉 */
var RDAX_R=.009,RDAX_Z0=.0536,RDAX_Z1=.0622;
function rdAxSplit(){G.rdAx=[];G.rdPu.forEach(m=>{const g=m.geometry,P=g.attributes.position,N=g.attributes.normal,n=P.count/3,keep=[],ax=[];
  for(let i=0;i<n;i++){let isA=true;for(let j=0;j<3;j++){const q=i*3+j,r=Math.hypot(P.getX(q),P.getY(q)),z=P.getZ(q);if(!(r<=RDAX_R&&(z<=RDAX_Z0||z>=RDAX_Z1))){isA=false;break}}(isA?ax:keep).push(i)}
  const mk=L=>{const p=new Float32Array(L.length*9),nn=new Float32Array(L.length*9);L.forEach((i,k)=>{for(let j=0;j<3;j++){const q=i*3+j;p[k*9+j*3]=P.getX(q);p[k*9+j*3+1]=P.getY(q);p[k*9+j*3+2]=P.getZ(q);nn[k*9+j*3]=N.getX(q);nn[k*9+j*3+1]=N.getY(q);nn[k*9+j*3+2]=N.getZ(q)}});const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(p,3));gg.setAttribute('normal',new THREE.BufferAttribute(nn,3));return gg};
  m.geometry=mk(keep);g.dispose();const a=new THREE.Mesh(mk(ax),m.material);a.frustumCulled=false;m.add(a);G.rdAx.push(a)})}
function rdSramApply(){/* v184：延後建立，附加在 G.rear 子物件最後（既有索引 4、5、7–14 不動）；非 EX 顯示 SRAM RD、隱藏舊示意 RD */
  if(!G.rdSram){const g=new THREE.Group(),mk=(o,m)=>{const x=new THREE.Mesh(stepDec(o),m);x.frustumCulled=false;return x};g.add(mk(RD_SRAM.rd,M.dark));{/* v191：導輪拆成上下兩個網格（依三角形中心就近歸屬），原點移到各自圓心以便旋轉 */const gp=stepDec(RD_SRAM.pu),pa=gp.attributes.position,na=gp.attributes.normal,ix=gp.index.array,cn=[[.01678,-.06379],[-.00425,-.12742]],ls=[[],[]];
    for(let q=0;q<ix.length;q+=3){const a=ix[q],b=ix[q+1],c=ix[q+2],cx=(pa.getX(a)+pa.getX(b)+pa.getX(c))/3,cy=(pa.getY(a)+pa.getY(b)+pa.getY(c))/3;ls[Math.hypot(cx-cn[0][0],cy-cn[0][1])<=Math.hypot(cx-cn[1][0],cy-cn[1][1])?0:1].push(a,b,c)}
    G.rdPu=[0,1].map(k=>{const Lq=ls[k],P2=new Float32Array(Lq.length*3),N2=new Float32Array(Lq.length*3);for(let i=0;i<Lq.length;i++){const q=Lq[i];P2[i*3]=pa.getX(q)-cn[k][0];P2[i*3+1]=pa.getY(q)-cn[k][1];P2[i*3+2]=pa.getZ(q);N2[i*3]=na.getX(q);N2[i*3+1]=na.getY(q);N2[i*3+2]=na.getZ(q)}
      const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(P2,3));gg.setAttribute('normal',new THREE.BufferAttribute(N2,3));const x=new THREE.Mesh(gg,M.casM||M.steel);x.frustumCulled=false;x.position.set(cn[k][0],cn[k][1],0);g.add(x);return x})}rdAxSplit();/* v199z：RD 本體（SRAM RED AXS E1）依實物照分材質。原 18,574 面為單一網格、43 個互不相連的實體（以頂點數由大到小編號 k0–k42）；依連通件重切成 6 個子網格（共用同一份頂點緩衝、各自索引），原網格隱藏。
   v199zb 起只用三種材質：k0 吊耳臂、k8 上連桿、k12／k39／k40／k20／k42 吊耳螺栓與墊片、k10／k11／k13／k14 樞軸圓座＝鈦原色（M.tiP）；k7／k9 導板、k1／k2 導輪齒圈、k4 電池、k5／k6／k18／k21／k22／k24 機身殼＝ili-ili 曲柄材質（M.alBk）；其餘（螺絲、螺帽、橫桿含 k3 下連桿）＝飛輪片材質（M.casM）。編號與歸類以 2026-11-05 色塊圖＋三張實物照目視判定，非零件名稱。 */
(function(g0){const src=g0.children[0];if(!src||!src.isMesh||g0.userData.bodySplit)return;const geo=src.geometry,P=geo.attributes.position,n=P.count,ix=geo.index?geo.index.array:null,nt=ix?ix.length/3:n/3;
  const par=new Int32Array(n);for(let i=0;i<n;i++)par[i]=i;const f=a=>{while(par[a]!==a){par[a]=par[par[a]];a=par[a]}return a};
  const key=new Map();for(let i=0;i<n;i++){const k=P.getX(i).toFixed(5)+','+P.getY(i).toFixed(5)+','+P.getZ(i).toFixed(5);if(key.has(k))par[f(i)]=f(key.get(k));else key.set(k,i)}
  const T3=t=>ix?[ix[3*t],ix[3*t+1],ix[3*t+2]]:[3*t,3*t+1,3*t+2];for(let t=0;t<nt;t++){const [a,b,c]=T3(t);par[f(a)]=f(b);par[f(b)]=f(c)}
  const ids=new Map(),cid=new Int32Array(n);let nc=0;for(let i=0;i<n;i++){const r=f(i);if(!ids.has(r))ids.set(r,nc++);cid[i]=ids.get(r)}
  const cnt=new Array(nc).fill(0);for(let i=0;i<n;i++)cnt[cid[i]]++;const ord=[...cnt.keys()].sort((a,b)=>cnt[b]-cnt[a]),rk=new Int32Array(nc);ord.forEach((c,i)=>rk[c]=i);
  if(nc!==42)return;/* v199zzzzp：zzzzl 減面後為 42 件（原 43）；之前此檢查失敗、整支 RD 為單一 M.dark *//* 組成與判定時不同（換了 STEP）就不重切，維持單一網格 */
  const MAT={blk:M.alBk,cas:M.casM};/* v199zb：只留三種——鈦原色（M.tiP＝M.ti 的非車架複本）、ili-ili 曲柄材質（M.alBk）、飛輪片材質（M.casM） */
  const cls=new Array(42).fill('cas');[2,5,7,8].forEach(k=>cls[k]='blk')/* v199zzzzw：電池（10）改槍灰 */;/* v199zzzzp：黑＝B 節臂 2、上殼 8、電池 10、導板 5／7；其餘（導輪圈、中間區塊 3／6／26、連桿、螺絲）＝槍灰 *//* 其餘（螺絲、螺帽、橫桿含 k3 下連桿）＝飛輪片材質 */
  const lists={};for(let t=0;t<nt;t++){const [a]=T3(t),c=cls[rk[cid[a]]];(lists[c]=lists[c]||[]).push(...T3(t))}
  Object.keys(lists).forEach(c=>{const gg=new THREE.BufferGeometry();Object.keys(geo.attributes).forEach(k=>gg.setAttribute(k,geo.attributes[k]));gg.setIndex(new THREE.BufferAttribute(n>65535?new Uint32Array(lists[c]):new Uint16Array(lists[c]),1));
    const m=new THREE.Mesh(gg,MAT[c]);m.position.copy(src.position);m.rotation.copy(src.rotation);m.scale.copy(src.scale);m.frustumCulled=false;g0.add(m)});
  src.visible=false;g0.userData.bodySplit=true})(g);
G.rear.add(g);G.rdSram=g;const hg=new THREE.Mesh(stepDec(RD_HG),M.casM||M.steel);hg.frustumCulled=false;hg.geometry.translate(RD_HGS?.03696:.01171,RD_HGS?-.0097:-.00427,0);G.rear.add(hg);G.rdHg=hg}
  G.rdSram.position.set(RD_DX,RD_DY,rdDZ());G.rdHg.position.set(0,0,0);G.rdHg.rotation.z=HG_TH;G.rdHg.visible=rdSr()&&!(G.rdSerG&&G.rdSerG.visible);
  const s=rdSr();G.rdSram.visible=s&&!(G.rdSerG&&G.rdSerG.visible);/* v199zzza：Shimano 105 的 RD 顯示時，現行 SRAM RD 不得被改回可見（updateWelds 在 serFD 之後再叫本函式，原本把它設回 true） */(G.rdOldC||[]).forEach(o=>o.visible=!s);smApply()}
function chainRD(n){const sr=rdSr(),rq=sr?(SERRD?SERRD.qs:RD_QS):G.rdq,pl=G.rear.children;if(!rq)return;const zp=sr?RD_ZP:(pl[12]?pl[12].position.z:.0329),pp=q=>add(n.RA,P(q[0]*1e3,q[1]*1e3)),j1=pp(rq[0]),j2=pp(rq[1]);
  const zq=sr?RD_ZP+rdDZ():zp;if(sr&&G.rdSram){G.rdSram.position.z=rdDZ();G.rdHg.position.z=0}if(G.rdSerG&&G.rdSerG.visible)G.rdSerG.position.z=chZ()+RD_DZX;if(sr)chainLinks(n,sr,j1,j2,zq)}/* v184：SRAM 導輪面＝最小飛輪片所在面，鏈條上下段終點落在該面（小片半徑約 22–24 mm） */
/* v191：鏈條單元化——Chain_unit.stl（單節：外板＋兩滾子，約 700 三角形）沿「大盤→最小飛輪片→上導輪→下導輪→大盤」封閉皮帶排列（InstancedMesh）。
   皮帶：四個圓依序相接（大盤 CCW、飛輪 CCW、上導輪 CW、下導輪 CCW，取自 Chain.stl 的纏繞方向），相鄰兩圓以切線相連；節數取偶數（外節／內節交替，內節以寬度 ×0.7 縮放置於外板之間），節距 12.7 mm 微調成整數節。
   各圓所在面：大盤 chZ()、飛輪 RD_ZP、導輪 RD_ZP+rdDZ()；直線段 z 線性過渡。半徑：大盤 chR()、飛輪 CH_RC、導輪 CH_RP（12T 節圓半徑 24.3） */
const CH_U=VIBE_D.CH_U;
var CH_RC=24,CH_RP=24.3,CH_PT=12.7;
function chainLinks(n,sr,j1,j2,zq){
  if(!G.chainI){const m0=new THREE.InstancedMesh(stepDec(CH_U),M.chn,220);m0.frustumCulled=false;m0.userData.outline=true;/* v199zzzzs：實例網格要有此旗標 tagOne 才處理輪廓 */bike.add(m0);G.chainI=m0;try{tagOne(m0,G.olOn)}catch(e){}}
  const m=G.chainI;m.material=M.chn;
  const C=[n.BB,n.RA,j1,j2],R=[chR(),CH_RC,rpR(),rpR()],S=[1,1,-1,1],Zs=[chZ(),RD_ZP,zq,zq],K=4,TP=2*Math.PI,tg=[];
  for(let i=0;i<K;i++){const j=(i+1)%K,Dx=C[j].x-C[i].x,Dy=C[j].y-C[i].y,ds=Math.hypot(Dx,Dy),k=S[j]*R[j]-S[i]*R[i],phi=Math.atan2(Dy,Dx),al=Math.acos(Math.max(-1,Math.min(1,k/ds)));let best=null;
    for(const sg of[1,-1]){const th=phi+sg*al,nx=Math.cos(th),ny=Math.sin(th),dx=ny,dy=-nx,a={x:C[i].x-S[i]*R[i]*nx,y:C[i].y-S[i]*R[i]*ny},b={x:C[j].x-S[j]*R[j]*nx,y:C[j].y-S[j]*R[j]*ny};if((b.x-a.x)*dx+(b.y-a.y)*dy>0){best={a,b};break}}
    tg.push(best)}
  const segs=[];let L=0;
  for(let i=0;i<K;i++){const c=C[i],pb=tg[(i+K-1)%K].b,pa=tg[i].a,a0=Math.atan2(pb.y-c.y,pb.x-c.x),a1=Math.atan2(pa.y-c.y,pa.x-c.x);let d=(S[i]*(a1-a0))%TP;if(d<0)d+=TP;
    const la=R[i]*d;segs.push({t:0,c,r:R[i],a0,s:S[i],d,len:la,z0:Zs[i],z1:Zs[i],s0:L});L+=la;
    const j=(i+1)%K,ll=Math.hypot(tg[i].b.x-tg[i].a.x,tg[i].b.y-tg[i].a.y);segs.push({t:1,a:tg[i].a,b:tg[i].b,len:ll,z0:Zs[i],z1:Zs[j],s0:L});L+=ll}
  const pos=s=>{s=((s%L)+L)%L;let g=segs[segs.length-1];for(const q of segs){if(s<=q.s0+q.len){g=q;break}}const u=g.len>1e-9?(s-g.s0)/g.len:0;
    if(g.t===0){const an=g.a0+g.s*g.d*u;return v(P(g.c.x+g.r*Math.cos(an),g.c.y+g.r*Math.sin(an)),g.z0)}
    return v(P(g.a.x+(g.b.x-g.a.x)*u,g.a.y+(g.b.y-g.a.y)*u),g.z0+(g.z1-g.z0)*u)};
  const NL=Math.min(216,Math.max(40,Math.round(L/CH_PT/2)*2));G.chInfo={wr:segs.filter(q=>q.t===0).map(q=>+(q.d*180/Math.PI).toFixed(1)),tl:segs.filter(q=>q.t===1).map(q=>+q.len.toFixed(1)),L:+L.toFixed(1),NL:NL,pitch:+(L/NL).toFixed(3),R:R.map(x=>+x.toFixed(1))};/* v199zzzk：診斷用——各圓包角（°）、各切線長（mm）、皮帶長、節數、實際節距 */G.chPos=pos;G.chL=L;G.chNL=NL;G.chainN=NL;G.chainL=L;chainPlace(-spinA*chR())}
/* v191：依皮帶參數位移 off（mm，沿皮帶行進方向；實際鏈條行進方向與皮帶排列方向相反，故傳入 −spinA×R）重排每一節的矩陣；切線與弧長已在 chainLinks 快取（G.chPos／G.chL） */
function chainPlace(off){const m=G.chainI,pos=G.chPos;if(!m||!pos)return;const L=G.chL,NL=G.chNL,pt=L/NL,Zv=new V3(0,0,1),mt=new THREE.Matrix4(),X=new V3(),Y=new V3(),Zl=new V3(),c=new V3();
  let p0=pos(off);const first=p0;
  for(let i=0;i<NL;i++){const p1=i===NL-1?first:pos(off+(i+1)*pt);Y.copy(p1).sub(p0);const ch=Y.length();Y.normalize();X.copy(Zv).addScaledVector(Y,-Zv.dot(Y)).normalize();Zl.crossVectors(X,Y);
    X.multiplyScalar(i%2?.7:1);Y.multiplyScalar(ch/(CH_PT*.001));mt.makeBasis(X,Y,Zl);c.copy(p0).add(p1).multiplyScalar(.5);mt.setPosition(c);m.setMatrixAt(i,mt);p0=p1}
  m.count=NL;m.instanceMatrix.needsUpdate=true}
var NODE_MS=0,logoNow=false;/* v199c：最近一次 applyNodes 耗時（ms）。>30 視為慢機，尺寸切換不補間，直接套用 */
/* ===== v199zzzp：把手寬度參數化（2026-11-11）=====
   做法：不縮放整個 STEP 網格，只沿「截面不變的直管段」拉伸，直管段外側（變把、下把）整段剛性平移，管徑、彎曲半徑、夾持區不變；煞變把跟著平移。
   一體把（integrated_handlebar.stp）：|z| 96–128 mm 為固定 40×20 mm 橢圓直管（逐段量測）→ 拉伸區；|z|<96 龍頭／翼形段不動；>128 剛性外移。STEP 寬 420 mm 視為 R8 的 420 選項（假設）。
   標準把（HandleBar.stp）：包把帶 |z| 90–195 mm 截面固定、內管只有端環 → 拉伸區 100–190；>190 剛性外移。標準把沿用一體把的位移量（使用者 2026-11-11 決定）：寬 478／498／518，每側 −20／−10／0（沒有實際寬度資料，暫定）。
   寬度＝STEP 基準寬 ± 2×每側位移 d（變把中心距與下把中心距同量改變；Flare／Drop／Reach 不動）。預設寬度由車架 Reach 在該車款最小～最大之間正規化，取最近的合法寬度（視覺預設，不是 Bike Fit 結論）；BARW_USER 可覆蓋。 */
var BARW={integ:{base:518,opts:[498],z0:100,z1:190},/* v199zzzzg：一體把改用分離把彎把（原生寬 518），固定寬 498 */std:{base:518,opts:[478,498,518],z0:100,z1:190}},BARW_USER={},BARW_D={integ:0,std:0};
function barWidthFor(k,reach){const c=BARW[k];if(BARW_USER[k]>0)return BARW_USER[k];if(!c.opts)return c.base;let lo=1e9,hi=-1e9;(GEO||[]).forEach(g=>{if(g.reach<lo)lo=g.reach;if(g.reach>hi)hi=g.reach});const t=hi>lo?Math.max(0,Math.min(1,(reach-lo)/(hi-lo))):.5,w=c.opts[0]+t*(c.opts[c.opts.length-1]-c.opts[0]);return c.opts.reduce((a,b)=>Math.abs(b-w)<Math.abs(a-w)?b:a)}
function barWarp(g,z0,z1,d){const p=g.attributes.position,a=g.userData.p0||(g.userData.p0=p.array.slice()),o=p.array;for(let i=2;i<a.length;i+=3){const z=a[i],az=Math.abs(z)*1e3,w=az<=z0?0:az>=z1?1:(az-z0)/(z1-z0);o[i]=z+Math.sign(z)*d*w*1e-3}p.needsUpdate=true;g.computeBoundingSphere()}
function barW(n){if(!n||!n.HTt||!n.BB)return;const reach=n.HTt.x-n.BB.x,cp=!!extras.blktec,k=cp?'integ':'std',c=BARW[k],d=(barWidthFor(k,reach)-c.base)/2;
  [['integ',()=>[G.cockpit.children[0].geometry,G.cockpit.children[1].geometry]],['std',()=>[G.bar.children[0].geometry,G.bar.children[2].geometry]]].forEach(([q,gs])=>{const dd=q===k?d:0;if(BARW_D[q]!==dd){gs().forEach(g=>barWarp(g,BARW[q].z0,BARW[q].z1,dd));BARW_D[q]=dd}});
  G.shSide.forEach((s,i)=>{if(s.userData.out==null){const h=s.children[0].geometry;h.computeBoundingBox();s.userData.out=Math.sign((h.boundingBox.min.z+h.boundingBox.max.z)*s.scale.z)||1}s.position.z+=s.userData.out*d*1e-3});N&&(N.barW=barWidthFor(k,reach))}
/* ===== v199zzzs：頭管上下延伸量統一。上＝頭管上端到「上管上緣與頭管後緣的交點」、下＝頭管實際下端（含叉冠下移 fdH、碗位 1／15 mm）到「下管下緣與頭管後緣的交點」，所有車款與尺寸一律取 MASTER 64Ti M 現值（上 21.3、下 17.7 mm）。做法：沿頭管軸移動上管、下管的接點（TTht／DTht），其餘幾何表節點不動。上下管在頭管短的尺寸會更互相重疊。 */
var HT_EQ={top:21.3,bot:17.7},HT_RS={'325':[16.6,25.9],'ex':[2.9,36.9]};/* v199zzzt：HT_RS 改為放樣管「端環側視輪廓」的有效半高（含截面中心 vc 位移；端環實測 325 上16.56／下25.87、EX 上2.94／下36.93）。原名目半高忽略 vc——EX 在頭管端 vc≈−16 mm，上管頂緣僅在節點軸上 2.9 mm，視覺露出量因此上多約 15、下少約 13 mm（使用者 2026-11-11 指出 EX 未調整到） */
function htEq(n){if(!n||!n.HTt||!n.HTb||!n.TTst||!n.TTht||!n.DTht||!n.BB||!n.FA||!n.hta)return;
  const R=RADS[model]||RADS['64'],h=rad(n.hta),up={x:-Math.cos(h),y:Math.sin(h)},rr={x:-Math.sin(h),y:-Math.cos(h)},hr=HT_RS[model],rt=hr?hr[0]:R.tt*1e3,rd=hr?hr[1]:R.dt*1e3,Rh=R.ht*1e3,hid=hsT()==='hid',
  fd=model==='ex'?exFd():Math.max(0,Math.min(FK_DROP_MAX,dist(n.HTb,n.FA)-FK_CROWN-n.R-FK_GAP)),
  hb2={x:n.HTb.x+up.x*((hid?1:15)-fd),y:n.HTb.y+up.y*((hid?1:15)-fd)},rl={x:n.HTb.x+rr.x*Rh,y:n.HTb.y+rr.y*Rh};
  const ix=(P1,d1,P2,d2)=>{const det=-d1.x*d2.y+d1.y*d2.x,bx=P2.x-P1.x,by=P2.y-P1.y,l=(-bx*d2.y+by*d2.x)/det;return{x:P1.x+d1.x*l,y:P1.y+d1.y*l}};
  const ext=(J,Q,r,sg)=>{const dx=Q.x-J.x,dy=Q.y-J.y,L=Math.hypot(dx,dy)||1,d={x:dx/L,y:dy/L};let q={x:-d.y,y:d.x};if(q.y*sg<0)q={x:-q.x,y:-q.y};return ix({x:J.x+q.x*r,y:J.y+q.y*r},d,rl,up)};
  for(let i=0;i<3;i++){const p=ext(n.TTht,n.TTst,rt,1),e=(n.HTt.x-p.x)*up.x+(n.HTt.y-p.y)*up.y,s=(n.HTt.x-n.TTht.x)*up.x+(n.HTt.y-n.TTht.y)*up.y,s2=s+(HT_EQ.top-e);n.TTht={x:n.HTt.x-up.x*s2,y:n.HTt.y-up.y*s2}}
  for(let i=0;i<3;i++){const p=ext(n.DTht,n.BB,rd,-1),e=(p.x-hb2.x)*up.x+(p.y-hb2.y)*up.y,q=(n.DTht.x-hb2.x)*up.x+(n.DTht.y-hb2.y)*up.y,q2=q+(HT_EQ.bot-e);n.DTht={x:hb2.x+up.x*q2,y:hb2.y+up.y*q2}}
  n.DTmid=P((n.BB.x+n.DTht.x)/2,(n.BB.y+n.DTht.y)/2)}
function applyNodes(n){const t0=performance.now();if(G.shMark)G.shMark();applyNodes0(n);barW(n);serFD(n);NODE_MS=performance.now()-t0}
/* ===== v199zzzx：EX 後輪組沿下叉方向後移（兩件式勾爪黑件滑動）＋後上叉與中管交接處上移。
   後移：以「外胎外緣到座管表面的間隙」為準，EX 達到 EX_CLR（≈ili-ili 325Ti 同尺寸的 20.8 mm）；實測 EX M 原間隙 4.4 mm（ili-ili 20.8、MASTER 325Ti 13.4）。外胎實際外徑＝n.R−3.8（量測：EX 361.2／ili 356.2／325 346.3 vs n.R 365／360／350），餘 +0.7 為量測殘差。
   做法：n.RA 改為「後輪軸心」（滑移後），n.RA0 為幾何表節點（鈦件勾爪、後下叉、後上叉端點、尺寸線仍用它）。n._raS 標記「n.RA 是我設的」，同一組節點重複套用不會累加。滑移量上限 EX_SLIDE_MAX。
   後上叉：EX 交接點由座管頂下 190 改為 EX_ST_JUNC（依實車照片：交接處在上管交接處下約 70 mm、座管頂下約 110–130 mm）。 */
/* v199zzzy：後上叉交接點上移（v199zzzx）作廢，EX_ST_JUNC 回 190，並以 n.STtop0（幾何表原座管頂）為基準，後上叉位置與 v199zzzv 相同。真正原因在上管角度與中管長度：EX 上管以與頭管連接處（TTht）為圓心逆時針（右側視）旋轉 EX_TT_ROT 度，上管長度隨之調到與中管軸相交（M：577.6→576.3 mm），中管頂（STtop）沿座管軸下移同一量（TTst 下方 40 mm 的相對位置不變，M 座管頂下移約 68 mm、中管長 510→約 439）。依據實車照片（M）：上管角約 18°（模型 11.9°→18.9°）、座管束比後輪最高點低約 16 mm（模型原本高 44 mm→低 16 mm）、上管交接處在後上叉交接處上方約 70–80 mm（→79.5）。每次 htEq 迭代前重算，使頭管端露出量仍維持 HT_EQ。 */
var EX_CLR=20.5,EX_SLIDE_MAX=30,EX_ST_JUNC=190,EX_TT_ROT=7,EX_TT_UP=17,EX_POST_DN=5,EX_ST_EXT=5;/* v199zzzzb：EX 中管（座管）頂再沿座管軸向上延伸 EX_ST_EXT＝5 mm（使用者 2026-11-11）；只動 STtop，上管、頭管、座管組、座墊不動；座管夾（Clamp）隨 STtop 上移 *//* v199zzzza：上管再延伸 7 mm（10→17，使用者 2026-11-11「往上延伸 7mm」；若原意為總量 7，改此值）；EX 伸縮座管組（PostDropEX）沿座管軸下移 EX_POST_DN＝5 mm，座墊節點不動（座管組與座墊間可能出現 5 mm 縫，待目視） */
/* v199zzzz：上管再沿中管方向上移 EX_TT_UP＝10 mm（使用者 2026-11-11）。同時中管頂（STtop）沿座管軸、頭管上端（HTt）沿頭管軸各向上延伸 10 mm；龍頭、轉向管、把手節點（stemC／steerTop／bar 及其 *0 基準）隨頭管上端上移 10 mm；座墊節點與座管組不動（座管外露縮短 10 mm）。每次由「原始節點」重算，所以重複套用不累加；上管旋轉仍以原始 TTht 為圓心。 */
function exTT(n){if(!n||!n.TTht||!n.TTst||!n.STtop||!n.BB||!n.HTt||!n.HTb)return;
  const CK=['stemC','steerTop','bar','stemC0','steerTop0','bar0'];let o=n._ttA;
  if(o&&n.TTst===o.s&&n.STtop===o.t&&n.HTt===o.h){n.TTst=o.s0;n.STtop=o.t0;n.HTt=o.h0;n.TTht=o.ht0;CK.forEach(k=>{if(o.c[k])n[k]=o.c[k]})}
  n._ttA=null;n.TTst0=n.TTst;n.STtop0=n.STtop;if(model!=='ex')return;
  const ux=n.STtop.x-n.BB.x,uy=n.STtop.y-n.BB.y,L=Math.hypot(ux,uy)||1,u={x:ux/L,y:uy/L},hx=n.HTt.x-n.HTb.x,hy=n.HTt.y-n.HTb.y,hl=Math.hypot(hx,hy)||1,hu={x:hx/hl,y:hy/hl},vx=n.TTst.x-n.TTht.x,vy=n.TTst.y-n.TTht.y,a=Math.atan2(vy,vx)+EX_TT_ROT*Math.PI/180,dx=Math.cos(a),dy=Math.sin(a),det=-dx*u.y+u.x*dy;if(Math.abs(det)<1e-6)return;
  const bx=n.BB.x-n.TTht.x,by=n.BB.y-n.TTht.y,t=(-bx*u.y+by*u.x)/det,k=EX_TT_UP,sx=n.TTht.x+dx*t+u.x*k,sy=n.TTht.y+dy*t+u.y*k,s=P(sx,sy),tp=P(sx+n.STtop.x-n.TTst.x+u.x*EX_ST_EXT,sy+n.STtop.y-n.TTst.y+u.y*EX_ST_EXT),h=P(n.HTt.x+hu.x*k,n.HTt.y+hu.y*k),c={};
  CK.forEach(q=>{if(n[q]){c[q]=n[q];n[q]=P(n[q].x+hu.x*k,n[q].y+hu.y*k)}});
  n._ttA={s,t:tp,h,s0:n.TTst,t0:n.STtop,h0:n.HTt,ht0:n.TTht,c};n.TTst=s;n.STtop=tp;n.HTt=h}
function exRearSlide(n){if(!n||!n.RA||!n.BB||!n.STtop)return;const tb=(n._raS&&n.RA===n._raS)?n._ra0:n.RA;n._ra0=tb;n._raS=null;n.RA0=tb;n.RA=tb;if(model!=='ex')return;
  const ux=n.STtop.x-n.BB.x,uy=n.STtop.y-n.BB.y,L=Math.hypot(ux,uy)||1,nx=-uy/L,ny=ux/L,rx=tb.x-n.BB.x,ry=tb.y-n.BB.y,Lc=Math.hypot(rx,ry)||1,ex=rx/Lc,ey=ry/Lc,perp=rx*nx+ry*ny,k=ex*nx+ey*ny;if(!(k>.3))return;
  const clr0=perp-((n.R||365)-3.8)-RADS.ex.st*1e3+.7;let sl=(EX_CLR-clr0)/k;sl=Math.max(0,Math.min(EX_SLIDE_MAX,sl));
  if(sl>.05){n._raS=P(tb.x+ex*sl,tb.y+ey*sl);n.RA=n._raS}G._exSlide=sl}
function applyNodes0(n){N=n;exRearSlide(n);if(n&&n.RA)G.nLast=n;/* v199zzu：記住最後一組有效節點，供 serCalAdj 在 N 暫時為空時仍能套姿態 *//* v199e：分離把節點上移（stemC／steerTop／bar 沿轉向管軸 +STM_LIFT；一體把維持基準）；分離把不畫轉向管 T.steer */if(n.stemC0){const L=stmLift(),uh=rad(n.hta),uu=P(-Math.cos(uh),Math.sin(uh));n.stemC=add(n.stemC0,mul(uu,L));n.steerTop=add(n.steerTop0,mul(uu,L));n.bar=add(n.bar0,mul(uu,L))}T.steer.visible=!!extras.blktec;const o=-n.FA.x/2000;bike.position.x=o;bike.position.y=0;/* v199zzzzzz90：爆炸圖把 bike 整體上移；放樣與射線檢測（叉腿貼面、螺栓孔）期間先歸零，下一幀由 exTick 重新套用 */G.shadow.position.x=0;
  const h=rad(n.hta);
  LOFTON=(model==='325'||model==='ex');T.TT.visible=!LOFTON;T.DT.visible=!LOFTON;loft.TT.visible=LOFTON;loft.DT.visible=LOFTON;
  const RD=(RADS[model]||RADS['64']);const HTc={A:v(n.HTb),d:v(n.HTt).sub(v(n.HTb)).normalize(),R:RD.ht*.985},STc={A:v(n.BB),d:v(n.STtop).sub(v(n.BB)).normalize(),R:RD.st*.985};
  setTrimTube(T.TT,v(n.TTst),v(n.TTht),RD.tt,STc,HTc);const dtS=Math.max(.01,Math.sqrt(Math.max(0,.0325*.0325-(model==='ex'?.0312:RD.dt)*(model==='ex'?.0312:RD.dt)))-.002);/* v199w：下管 BB 端起點由固定 31 mm 改為「封蓋整圈落在五通殼（半徑 32.5 mm）內」：起點距 BB 中心 √(32.5²−管半徑²)−2 mm，最少 10 mm。原 31 mm 使封蓋周緣離殼面 5–11 mm，露出縫隙與封蓋環 */setTrimTube(T.DT,shf(v(n.BB),v(n.DTht),dtS),v(n.DTht),RD.dt,null,HTc);/* v199zzzr：MASTER 325Ti 中管（座管）改錐形管——BB 端 Ø40、頂端 Ø31.8（使用者 2026-11-11 指示，沿全長線性漸縮；原規格寫「靠近 BB 端 40 mm Tapper」，取使用者本次直徑解讀）。T.ST 為單位中空旋轉體（scale＝頂端半徑），錐形版 BB 端半徑比 k＝ST_TAP/RD.st。 */
{const k0=ST_TAP[model]?ST_TAP[model]/RD.st:1,tp=k0>1,q=ST_IN,sk=k0+'|'+q;
  if(T.ST.userData.sk!==sk){if(T.ST.userData.g0&&T.ST.userData.gq!==q){T.ST.userData.g0.dispose();T.ST.userData.g0=null}
    if(!T.ST.userData.g0){T.ST.userData.g0=new THREE.LatheGeometry([[1,-.5],[1,.5],[q,.5],[q,-.5],[1,-.5]].map(p=>new THREE.Vector2(p[0],p[1])),144);T.ST.userData.gq=q}
    if(tp){if(T.ST.userData.g1)T.ST.userData.g1.dispose();T.ST.userData.g1=new THREE.LatheGeometry([[k0,-.5],[1,.5],[q,.5],[q*k0,-.5],[k0,-.5]].map(p=>new THREE.Vector2(p[0],p[1])),144)}
    T.ST.geometry=tp?T.ST.userData.g1:T.ST.userData.g0;T.ST.userData.k=k0;T.ST.userData.tp=tp;T.ST.userData.sk=sk}}
const stR0=RD.st*(T.ST.userData.k||1),stS=Math.max(.01,Math.sqrt(Math.max(0,.0325*.0325-stR0*stR0))-.002);setTube(T.ST,shf(v(n.BB),v(n.STtop),stS),v(n.STtop),RD.st);/* v199zc：座管 BB 端起點同下管——封蓋整圈落在五通殼（半徑 32.5 mm）內，原固定 31 mm 使 θ=0 側離殼面 2.7 mm（Ø35 管）、露縫 */
  const fdH=(model==='ex')?exFd():Math.max(0,Math.min(FK_DROP_MAX,dist(n.HTb,n.FA)-FK_CROWN-n.R-FK_GAP));{const dH=v(n.HTb).sub(v(n.HTt)).normalize(),rl=rsLift();G._rsl=rl;const pa=v(n.HTb).addScaledVector(dH,-(hsT()==='hid'?.001:.015)+fdH*1e-3-rl),pb=v(n.HTt).addScaledVector(dH,-rl);htSet(pa.distanceTo(pb));setTube(T.HT,pa,pb,RD.ht)}/* v199zzzv：EX 掛 RS 前叉時頭管＋上下碗組整體沿頭管軸上移 rsLift（下碗厚度）；上下管接點不動 *//* v170：頭管下端上移 15 mm，騰出位置給下碗（下管等接頭仍依節點）；v199g：頭管下端與下碗隨叉冠一同下移 fdH mm（＝叉冠下移量），頭管向下延伸、下碗貼叉冠 */
  if(LOFTON){updateLoft('TT',v(n.TTst),v(n.TTht),STc,HTc);updateLoft('DT',shf(v(n.BB),v(n.DTht),dtS),v(n.DTht),null,HTc)}
  {/* v68：後上叉裁短 24 mm、後下叉以 BB 為樞軸末端再下轉 14 mm 並裁短 24 mm。v67：兩叉軸線仍對小孔圓心，末端各自裁短一個管半徑（後上叉 8.5、後下叉 10.5 mm）。v66：後上叉／後下叉管徑中心線對準勾爪前緣兩小孔圓心（孔位：後上叉 (Y−5.3,Z+26.6)、後下叉 (−9.7,+16.9) mm 相對軸孔，橫向 ±73.5＝板厚中心）；後下叉以 BB 為樞軸朝孔心下轉；EX 另走檔案原位 */
  const Ec=add(n.RA,P(-9.7,16.9-14)),Es=add(n.RA,P(-5.3,26.6)),RAm=v(n.RA);
  const hitDrop=(F,Tg,side)=>{const m=side<0?G.dropoutL:G.dropoutR,Pa=m.geometry.attributes.position.array,Ix=m.geometry.index.array,ox=RAm.x+m.position.x,oy=RAm.y+m.position.y,oz=RAm.z+m.position.z,dx=Tg.x-F.x,dy=Tg.y-F.y,dz=Tg.z-F.z,L=Math.hypot(dx,dy,dz),d=[dx/L,dy/L,dz/L];let best=1e9;
    for(let i=0;i<Ix.length;i+=3){const a=Ix[i]*3,b=Ix[i+1]*3,c=Ix[i+2]*3,
      ax=Pa[a]+ox,ay=Pa[a+1]+oy,az=Pa[a+2]+oz,e1x=Pa[b]+ox-ax,e1y=Pa[b+1]+oy-ay,e1z=Pa[b+2]+oz-az,e2x=Pa[c]+ox-ax,e2y=Pa[c+1]+oy-ay,e2z=Pa[c+2]+oz-az,
      px=d[1]*e2z-d[2]*e2y,py=d[2]*e2x-d[0]*e2z,pz=d[0]*e2y-d[1]*e2x,det=e1x*px+e1y*py+e1z*pz;if(Math.abs(det)<1e-12)continue;const iv=1/det,tx=F.x-ax,ty=F.y-ay,tz=F.z-az,u=(tx*px+ty*py+tz*pz)*iv;if(u<0||u>1)continue;
      const qx=ty*e1z-tz*e1y,qy=tz*e1x-tx*e1z,qz=tx*e1y-ty*e1x,w=(d[0]*qx+d[1]*qy+d[2]*qz)*iv;if(w<0||u+w>1)continue;const t=(e2x*qx+e2y*qy+e2z*qz)*iv;if(t>0&&t<best)best=t}
    if(best>=1e8||best>L*1.6)return Tg.clone();return new V3(F.x+d[0]*(best+.003),F.y+d[1]*(best+.003),F.z+d[2]*(best+.003))};
  [['CSL',-1],['CSR',1]].forEach(([k,s])=>{const Tg=v(Ec,s*.0735),F=shf(v(n.BB,s*CS_BZ),Tg,CS_BS),E=Tg.clone().addScaledVector(Tg.clone().sub(F).normalize(),-.024);csLoft(T[k],F,E);(G.csS=G.csS||{})[k]={F:F.clone(),E:E.clone()};if(s<0){G.csAx={F:F.clone(),E:E.clone()}}/* v185：五通端中心內移（舊 z=±35＋沿軸 31 mm → z≈±28，落在殼長 73 mm 內；起點沿軸只 18 mm，截面埋入殼內、不外露） */});
  [['SSL',-1],['SSR',1]].forEach(([k,s])=>{const F=v(n.SSst,s*.012),Tg=v(Es,s*.0735),E=Tg.clone().addScaledVector(Tg.clone().sub(F).normalize(),-.024);setSeatStay(T[k],F,E,.0095,.007,STc,s)})}

  {const u=v(n.HTb).sub(v(n.HTt)).normalize(),RD0=(RADS[model]||RADS['64']);const fd=(model==='ex')?exFd():Math.max(0,Math.min(FK_DROP_MAX,dist(n.HTb,n.FA)-FK_CROWN-n.R-FK_GAP));setFork(T.FKL,v(n.HTb).addScaledVector(u,fd*1e-3),v(n.FA),u,HT_END_R);{const rl=rsLift();setHeadset(v(n.HTt).addScaledVector(u,-rl),v(n.HTb).addScaledVector(u,fd*1e-3-rl),u,HT_END_R)}HSn.scale.set(1,1,1);boltsUpdate(n,v(n.HTb).addScaledVector(u,fd*1e-3));try{rsForkApply(n)}catch(e){}/* v199zzzu：EX 掛 RS 避震前叉（剛性叉隱藏；加購鈦前叉時換回） *//* v199f：叉冠下移 fd mm（叉冠內頂到外胎目標 4 mm，最多下移 15 mm；EX 為避震前叉示意，不動）；v199g：下碗與壓環同步下移 fd mm、頭管下端同步延伸（見上方 fdH），不再靠加長壓環補空隙 */}
  {const EXON=(model==='ex');ensureStays();['csL','csR','ssL','ssR','supL'].forEach(k=>T[k].visible=EXON);['CSL','CSR','SSL','SSR'].forEach(k=>T[k].visible=!EXON);if(T.srBr)T.srBr.visible=!EXON;
    if(EXON){const RA0=n.RA0||n.RA,sd=rad(n.sta),su=P(-Math.cos(sd),Math.sin(sd)),Ls=dist(n.BB,n.STtop0||n.STtop)-EX_ST_JUNC,A=add(n.BB,mul(su,Ls));
      [['csL',-1],['csR',1]].forEach(([k,s])=>setStay(T[k],EXST.cs,n.BB,add(RA0,P(35.3,0)),0,-386,0,86.8,s,null));
      [['ssL',-1],['ssR',1]].forEach(([k,s])=>setStay(T[k],EXST.ss,A,add(RA0,P(35.3,34.16)),-83,-386,307,120.96,s,STc));
      {const pc=stayPts(EXST.cs,n.BB,add(RA0,P(35.3,0)),0,-386,0,86.8,-1),ps=stayPts(EXST.ss,A,add(RA0,P(35.3,34.16)),-83,-386,307,120.96,-1);setSup(T.supL,stayAtY(EXST.cs,pc,-293.2),stayAtY(EXST.ss,ps,-326),.00635);
      /* v78：EX 後上叉末端——自與勾爪接觸面起截去：沿叉管末段直線射向勾爪網格，取第一交點，之後的環一律收到該截面 */
      [['ssL',-1,G.exDropL],['ssR',1,G.exDropR]].forEach(([k,sd,dm])=>{const m=T[k],PA=m.geometry.attributes.position.array,nS=EXST.ss.length,Nn=PA.length/3/nS,pt=stayPts(EXST.ss,A,add(RA0,P(35.3,34.16)),-83,-386,307,120.96,sd),RAv=v(RA0);
        const j=nS-4,tg=pt[nS-1].clone().sub(pt[nS-2]).normalize(),o=pt[j],D=dm.geometry.attributes.position.array,Ix=dm.geometry.index.array;let best=1e9;
        for(let i=0;i<Ix.length;i+=3){const a0=Ix[i]*3,b0=Ix[i+1]*3,c0=Ix[i+2]*3,ax=D[a0]+RAv.x,ay=D[a0+1]+RAv.y,az=D[a0+2]+RAv.z,e1x=D[b0]+RAv.x-ax,e1y=D[b0+1]+RAv.y-ay,e1z=D[b0+2]+RAv.z-az,e2x=D[c0]+RAv.x-ax,e2y=D[c0+1]+RAv.y-ay,e2z=D[c0+2]+RAv.z-az,
          px=tg.y*e2z-tg.z*e2y,py=tg.z*e2x-tg.x*e2z,pz=tg.x*e2y-tg.y*e2x,det=e1x*px+e1y*py+e1z*pz;if(Math.abs(det)<1e-12)continue;const iv=1/det,tx=o.x-ax,ty=o.y-ay,tz=o.z-az,u=(tx*px+ty*py+tz*pz)*iv;if(u<0||u>1)continue;
          const qx=ty*e1z-tz*e1y,qy=tz*e1x-tx*e1z,qz=tx*e1y-ty*e1x,w=(tg.x*qx+tg.y*qy+tg.z*qz)*iv;if(w<0||u+w>1)continue;const t=(e2x*qx+e2y*qy+e2z*qz)*iv;if(t>0&&t<best)best=t}
        if(best<1e8){for(let i=j+1;i<nS;i++){const si=pt[i].clone().sub(o).dot(tg);if(si>best){const d=best-si;for(let q=0;q<Nn;q++){const idx=(i*Nn+q)*3;PA[idx]+=tg.x*d;PA[idx+1]+=tg.y*d;PA[idx+2]+=tg.z*d}}}m.geometry.attributes.position.needsUpdate=true;m.geometry.computeVertexNormals()}});
      {const RAm=v(RA0);let ang=null;for(let i=ps.length-1;i>0;i--){const d0=Math.hypot(ps[i].x-RAm.x,ps[i].y-RAm.y),d1=Math.hypot(ps[i-1].x-RAm.x,ps[i-1].y-RAm.y);if(d0<=.074&&d1>=.074){const t=(.074-d0)/(d1-d0);ang=Math.atan2(ps[i].y+(ps[i-1].y-ps[i].y)*t-RAm.y,ps[i].x+(ps[i-1].x-ps[i].x)*t-RAm.x);break}}G.rCal.userData.exAng=ang}/* v71：EX 後卡鉗基座鎖在左後上叉——角度＝軸心到後上叉中心線上距軸心 74 mm 處 */}}}
  setTubeR(T.steer,v(n.HTt),v(n.steerTop),.02);setTubeR(T.stem,v(n.stemC),v(n.bar),.015,.005);T.stem.scale.z=1.4;setTubeR(T.post,v(n.STtop),v(n.saddle),.0135);
  {const sd=rad(n.sta),su=P(-Math.cos(sd),Math.sin(sd));setTube(T.collar,v(add(n.STtop,mul(su,-4.5))),v(add(n.STtop,mul(su,12.5))),RD.st+.0035)/* v170：高 20→17 mm（−15%），中心不變 */}
  const cp=!!extras.blktec;G.bar.visible=!cp;T.stem.visible=false;G.stemStd.visible=!cp;G.cockpit.visible=cp;G.cpStem.visible=false;G.cap.visible=cp;/* v199zzzzw：舵管頂蓋圓盤（Ø40）只在一體把顯示；分離把龍頭自帶頂板與螺絲，圓盤會從龍頭側面凸出 */
  {const sc=v(n.stemC),st=v(n.steerTop),bb=v(n.bar);if(!cp){G.stemStd.rotation.z=Math.atan2(st.y-sc.y,st.x-sc.x)-STM_UA;G.stemStd.position.set(sc.x,sc.y,0)}/* v196：Stem.stl 夾口參考點落在 stemC、轉向管軸對齊 *//* v181：STEP 一體把含龍頭——夾口孔中心 (−105.4,−19.5) mm 落在 stemC，孔軸（STEP 朝上後 107.0°）轉到轉向管軸；把手中心因而與 n.bar 差約 7 mm（STEP 龍頭 107 mm、頁面 100 mm） */
   if(cp){const th=Math.atan2(st.y-sc.y,st.x-sc.x)-1.8675,c=Math.cos(th),s=Math.sin(th),hx=-.1054,hy=-.0195;G.cockpit.rotation.z=th;G.cockpit.position.set(sc.x-(hx*c-hy*s),sc.y-(hx*s+hy*c),0);G.shift.rotation.z=th;G.shift.position.copy(G.cockpit.position);G.shSide[0].position.set(0,0,0);G.shSide[1].position.set(0,0,0);G.shSide[0].rotation.z=G.shSide[1].rotation.z=0/* v199zzzzg：一體把改用分離把彎把，Shifter 與分離把同座標（SH_IX／SH_IR 不再使用） *//* 一體把座標＝標準把座標 + (−12.2,−6,∓32) mm（v181 目視對位值換算），v191 再往前 SH_IX、向上轉 SH_IR */}
   else{G.cockpit.position.copy(bb);G.shift.rotation.z=0;G.shift.position.copy(bb);G.shSide[0].position.set(0,0,0);G.shSide[1].position.set(0,0,0);G.shSide[0].rotation.z=G.shSide[1].rotation.z=0}{const dx=bb.x-sc.x,dy=bb.y-sc.y,r=-G.shift.rotation.z,c=Math.cos(r),s=Math.sin(r);const hb=v(n.HTb),ht=v(n.HTt),hl=Math.hypot(hb.x-ht.x,hb.y-ht.y)||1;shRollApply(dx*c-dy*s,dx*s+dy*c,(hb.x-ht.x)/hl,(hb.y-ht.y)/hl,ht.x+.0065*(hb.x-ht.x)/hl,ht.y+.0065*(hb.y-ht.y)/hl)}}/* v182：標準把與 Shifter 同一座標，直接對位 */
  T.post.material=addonPostMat();G.oraHead.visible=!!extras.ora;G.oraHead.position.copy(v(n.saddle)).add(new V3(0,-.016,0));
  G.bb.position.copy(v(n.BB));G.rear.position.copy(v(n.RA));if(G.exTiL){const q0=v(n.RA0||n.RA);G.exTiL.position.copy(q0);G.exTiR.position.copy(q0)}G.front.position.copy(v(n.FA));
  G.crown.position.copy(v(n.HTb));G.crown.rotation.z=Math.PI/2-h;G.cap.position.copy(v(n.steerTop));G.cap.rotation.z=Math.PI/2-h;
  G.bar.position.copy(v(n.bar));G.seat.position.copy(v(n.saddle));try{seatPlace(n)}catch(e){}try{cagePlace(n)}catch(e){}
  const k=n.R/347;G.wR.position.copy(v(n.RA));G.wF.position.copy(v(n.FA));G.wR.scale.set(k*.97,k*.97,.97);G.wF.scale.set(k*.97,k*.97,.97);
  {const zt=(n.TW||38.8)/38.8;[G.wR,G.wF].forEach(g=>{const u=g.userData;if(!u.tireM)return;u.tireM.scale.z=zt;u.walls.forEach(w=>{w.scale.z=.5714*zt;w.position.z=w.userData.z0*zt});});try{const tw=n.TW||38.8;if(TRD.tw!==tw){TRD.tw=tw;trdBuild()}}catch(e){}}/* v195：外胎斷面寬＝標稱胎寬（mm）；原固定 38.8 mm。胎壁隨斷面內外移，擋泥板寬度不小於原值 */
  chainRD(n);
  const dd=new V3(n.DTht.x-n.BB.x,n.DTht.y-n.BB.y,0).normalize(),nn=new V3(-dd.y,dd.x,0);
    const disc=n.brake!=='Rim';G.rRotor.visible=G.fRotor.visible=G.rCal.visible=G.fCal.visible=disc;
  G.rimF.visible=G.rimR.visible=false;G.rimF.position.copy(v(n.HTb)).add(new V3(.03,-.03,0));
  const sb=n.SSst, rr=n.RA, tt=Math.min(.95,(n.R+25)/dist(sb,rr));G.rimR.position.copy(v(P(rr.x+(sb.x-rr.x)*tt,rr.y+(sb.y-rr.y)*tt)));
  placeHS();updateDim();updateGhost()}

/* ===== 補間 ===== */
let tween=null,vTween=null,liveV=Object.assign({},GEO[2]);
function lerpN(a,b,t){const o={};for(const k in b){const A=a[k],B=b[k];
  if(B&&typeof B==='object'&&'x' in B)o[k]=(A&&'x' in A)?P(A.x+(B.x-A.x)*t,A.y+(B.y-A.y)*t):B;else if(typeof B==='number'&&typeof A==='number')o[k]=A+(B-A)*t;else o[k]=B}return o}
/* v199zzzzd：EX 的 exTT（上管旋轉／延伸）與 exRearSlide（後輪後移）會就地改寫節點。補間起點若直接用已改寫的 N，每一幀 lerp 後 applyNodes 又會再套用一次，切分頁時 EX 車架先跳到錯位再回正（使用者 2026-11-11 回報）。起點改用 nodesRaw(N)＝還原成套用前的原始節點，補間全程在原始值域，改寫每幀只套一次。 */
function nodesRaw(n){if(!n)return n;const c=Object.assign({},n),o=n._ttA,CK=['stemC','steerTop','bar','stemC0','steerTop0','bar0'];
  if(o&&n.TTst===o.s&&n.STtop===o.t&&n.HTt===o.h){c.TTst=o.s0;c.STtop=o.t0;c.HTt=o.h0;c.TTht=o.ht0;CK.forEach(k=>{if(o.c[k])c[k]=o.c[k]})}
  c._ttA=null;if(n._raS&&n.RA===n._raS)c.RA=n._ra0;c._raS=null;return c}
function goNodes(n,instant){if(!N||instant||NODE_MS>30){tween=null;logoNow=true;applyNodes(n);return}tween={from:nodesRaw(N),to:n,t0:performance.now(),d:450}}

/* ===== 扭力熱點 ===== */
/* v199zzzzzz130（B2）：特色說明／扭力巡檢清單展開狀態（預設收折；展開才顯示 3D 藍點／橘點） */
var FOLD={feat:false,tq:false};
const HS=[],coreGeo=new THREE.SphereGeometry(.011,16,12),haloGeo=new THREE.RingGeometry(.016,.022,32),hitGeo=new THREE.SphereGeometry(.03,8,6);
PARTS.forEach((p,i)=>{const g=new THREE.Group();scene.add(g);
  const core=new THREE.Mesh(coreGeo,new THREE.MeshBasicMaterial({color:0xE2703A,depthTest:false,transparent:true,toneMapped:false}));
  const halo=new THREE.Mesh(haloGeo,new THREE.MeshBasicMaterial({color:0xE2703A,depthTest:false,transparent:true,side:THREE.DoubleSide,toneMapped:false}));
  const hit=new THREE.Mesh(hitGeo,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
  core.renderOrder=halo.renderOrder=10;hit.userData.part=p;g.add(core,halo,hit);HS.push({p,g,core,halo,hit,phase:i*.7})});
/* v196：龍頭前蓋螺絲（下排右）、立管夾螺絲（下方，頭在 −z 側）、頂蓋螺絲＝Stem.stl 的實際螺絲頭，局部座標（m）隨龍頭群組轉動；一體把（cockpit）仍用 PARTS 的節點偏移 */function stemHS(h){const id=h.p.id;if(!(id==='stemFace'||id==='stemSteer'||id==='topCap')||!G.stemStd||!G.stemStd.visible)return false;const L=id==='stemFace'?[.114,.0039,.0175]:id==='stemSteer'?[-.0147,-.0189,-.012]:[-.0083,.0241,0],th=G.stemStd.rotation.z,c=Math.cos(th),s=Math.sin(th);h.g.position.set(G.stemStd.position.x+L[0]*c-L[1]*s+bike.position.x,G.stemStd.position.y+L[0]*s+L[1]*c,L[2]);return true}
function placeHS(){if(!N)return;HS.forEach(h=>{if(stemHS(h))return;const b=N[h.p.node],o=h.p.off;let ox=o[0],oy=o[1],oz=o[2];/* v184：SRAM RD 的固定螺絲＝吊耳螺栓，位於勾爪吊耳孔 (−11.7,+4.3) mm、孔口外側 */if(h.p.id==='rd'&&rdSr()){ox=-11.7+RD_DX*1e3;oy=4.3+RD_DY*1e3;oz=110+rdDZ()*1e3}/* v183：ili-ili 曲柄組的臂外側面在 ±72.5 mm（MASTER 組為右 87.45、左 −79.45；熱點在外側面外 5.5／9.5 mm）→ 依 CRK_GD／CRK_GDL 重算 */if(CRKG){if(h.p.id==='crank')oz=-(72.5+CRK_GDL*1000+9.5);else if(h.p.id==='pedal')oz=72.5+CRK_GD*1000+5.5}if(CRKA){if(h.p.id==='crank')oz=-(72.5+CRK_ADL*1000+9.5);else if(h.p.id==='pedal')oz=72.5+CRK_AD*1000+5.5}if(CRKF){if(h.p.id==='crank')oz=-(77.5+9.5);else if(h.p.id==='pedal')oz=85.6+5.5}/* v199zzzl：Force 1 Gravel 曲柄組外側面：左 −77.5、右＋85.6 mm（STEP 右臂外側 54.5＋CRK_FD） *//* v199zzzzzz93：示意旋轉時曲柄螺絲、踏板、碟盤螺絲的熱點要跟著轉，否則扭力分頁展示中橘點會離開零件。曲柄群組的轉角＝−0.8727−spinA，基準偏移已含 −0.8727，故只需再繞 BB 的 z 軸轉 −spinA；碟盤同軸但轉速比 kc。 */if(spinA){const _rt=(a)=>{const c=Math.cos(a),si=Math.sin(a),x=ox*c-oy*si,y=ox*si+oy*c;ox=x;oy=y};if(h.p.id==='crank'||h.p.id==='pedal')_rt(-spinA);else if(h.p.id==='rotor'){const _ok=typeof CH_RC==='number';_rt(-spinA*(_ok?chR()/CH_RC:2.6)*SPIN_WK)}}
const rdS=G.rdSerG&&G.rdSerG.visible,crS=G.crkSerG&&G.crkSerG.visible,fcS=G.fCal&&G.fCal.userData.sa;
if(h.p.id==='rd'&&rdS){ox=G.rdSerG.position.x*1e3;oy=G.rdSerG.position.y*1e3;oz=110}/* v199zzzh：105／Dura-Ace RD 固定螺栓＝吊耳 RD 端孔，孔口外側 */
if(crS&&(h.p.id==='crank'||h.p.id==='pedal')){if(!G.crkSerG.userData.zr||G.crkSerG.userData.zk!==G.crkSerKey){bike.updateMatrixWorld(true);let zmn=1e9,zmx=-1e9;G.crkSerG.traverse(o=>{if(!o.isMesh)return;const g=o.geometry;if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox;o.updateMatrixWorld(true);[bb.min.z,bb.max.z].forEach(zz=>[[bb.min.x,bb.min.y],[bb.max.x,bb.max.y]].forEach(q=>{const z=bike.worldToLocal(new V3(q[0],q[1],zz).applyMatrix4(o.matrixWorld)).z;zmn=Math.min(zmn,z);zmx=Math.max(zmx,z)}))});G.crkSerG.userData.zr=[zmn,zmx];G.crkSerG.userData.zk=G.crkSerKey}const zr=G.crkSerG.userData.zr;if(h.p.id==='crank')oz=zr[0]*1e3-9.5;else oz=zr[1]*1e3+5.5}/* 系列曲柄：依實際臂外側面（同現行「外側面外 9.5／5.5 mm」） */
if(h.p.id==='caliper'&&fcS){bike.updateMatrixWorld(true);const hp=[SERCAL_A,SERCAL_B].map(q=>bike.worldToLocal(G.fCal.localToWorld(new V3(q[0],q[1],0)))),up=hp[0].y>hp[1].y?hp[0]:hp[1];h.g.position.set(up.x+bike.position.x,up.y,up.z-.010);return}/* 系列前卡鉗：上方鎖孔、卡鉗面外側 10 mm */
h.g.position.set((b.x+ox)/1000+bike.position.x,(b.y+oy)/1000,oz/1000)})}
const st={};PARTS.forEach(p=>st[p.id]={done:false,pts:0,val:null,decision:null});
let sel=null,hint=false,tab='torque';
const wrap=document.getElementById('cardWrap');
function paintHS(){HS.forEach(h=>{const s=st[h.p.id];let c=0xE2703A;if(s.done)c=s.pts===3?(isDark()?0x8DBF78:0x4A7A3A):0x8A7A5C;
  h.core.material.color.setHex(c);h.halo.material.color.setHex(c);
  h.g.visible=tab==='torque'&&FOLD.tq&&(!sel||sel===h.p);/* v199zzzzzz99：選取（亮起）某點時，其餘橘點先隱藏，只留被選的那一顆；取消選取（closeCard→sel=null→paintHS）即全部恢復 */h.halo.visible=sel===h.p})}

/* ===== 尺寸標註線 ===== */
const dimMat=new THREE.LineBasicMaterial({color:new THREE.Color(0xE2703A),depthTest:false,toneMapped:false});
const dimGeo=new THREE.BufferGeometry();dimGeo.setAttribute('position',new THREE.Float32BufferAttribute(new Array(30).fill(0),3));
dimMat.visible=false;/* 資料載體，不直接繪製；實際線條為 dimRow（與騎士標註同粗） */
const dimLine=new THREE.Line(dimGeo,dimMat);dimLine.renderOrder=20;dimLine.visible=false;scene.add(dimLine);
const dimLabel=document.getElementById('dimLabel');let dimKey=null,dimText='';
function dimPts(k,n){const h=rad(n.hta),s=rad(n.sta);switch(k){
  case'reach':return[P(n.BB.x,n.HTt.y),n.HTt];case'stack':return[n.BB,P(n.BB.x,n.HTt.y)];case'stl':return[n.BB,n.TTst];
  case'ett':return[P(n.BB.x-(n.HTt.y-n.BB.y)/Math.tan(s),n.HTt.y),n.HTt];case'ht':case'htl':return[n.HTb,n.HTt];
  case'hta':return[n.steerTop,P(n.HTt.x+n.HTt.y/Math.tan(h),0)];case'sta':return[n.BB,n.saddle];
  case'bbd':case'bbg':return k==='bbd'?[P(n.BB.x,n.RA.y),n.BB]:[P(n.BB.x,0),n.BB];case'cs':case'rc':return[n.RA0||n.RA,n.BB];
  case'wb':return[P((n.RA0||n.RA).x,8),P(n.FA.x,8)];case'fc':return[n.BB,n.FA];
  case'so':{const x=(n.TTst.x+n.TTht.x)/2;return[P(x,0),P(x,liveV.so)]}
  case'rake':{const d=P(-Math.cos(h),Math.sin(h)),w=P(n.FA.x-n.HTt.x,n.FA.y-n.HTt.y),t=w.x*d.x+w.y*d.y;return[n.FA,add(n.HTt,mul(d,t))]}
  case'trail':return[P(n.FA.x,0),P(n.HTt.x+n.HTt.y/Math.tan(h),0)];
  case'so_c':return[P(n.soPt.x,0),n.soPt]}return null}
/* 騎士尺度：標註尺寸樣式（箭頭＋截線）。跨高、手臂長皆為實線（無箭頭，色同圓形標籤；手臂長兩端、跨高頂端為小實心圓，跨高底端為短端線）。位置為示意：跨高貼上管中點、手臂從把手向後上方 60°。膠囊僅顯示數值，輸入在右側欄位。 */
const RLM=new THREE.MeshBasicMaterial({color:new THREE.Color(0xB85A28),depthTest:false,transparent:true,toneMapped:false}),RLMR=new THREE.MeshBasicMaterial({color:new THREE.Color(0xE2703A),depthTest:false,transparent:true,toneMapped:false}),RLG=new THREE.CylinderGeometry(1,1,1,10),RLC=new THREE.ConeGeometry(1,1,14),RLS=new THREE.SphereGeometry(1,16,12),RLR0=.0035,RAL0=.045,RAR0=.012,RTL0=.12;
/* 線寬以螢幕像素為準：世界尺寸線寬在手機（舞台矮、相機較遠）會縮到約 1 px，縮放時也會忽粗忽細。RS＝每像素世界長度相對桌機基準（.00185 m/px）的倍率，限制 0.6–2.2；標註線、箭頭、端線、疊圖虛線同倍率縮放。 */
let RLR=RLR0,RAL=RAL0,RAR=RAR0,RTL=RTL0,RS=1,RSdone=1;
function setRS(){const wpp=2*cam.r*Math.tan(Math.PI/12)/Math.max(1,stage.clientHeight);RS=Math.max(.6,Math.min(2.2,wpp/.00185));RLR=RLR0*RS;RAL=RAL0*RS;RAR=RAR0*RS;RTL=RTL0*RS}
function rlMesh(g,mt){const m=new THREE.Mesh(g,mt||RLM);m.renderOrder=22;m.visible=false;scene.add(m);return m}
function mkDim(mt){return{line:rlMesh(RLG,mt),c1:rlMesh(RLC,mt),c2:rlMesh(RLC,mt),t1:rlMesh(RLG,mt),t2:rlMesh(RLG,mt),p1:rlMesh(RLS,mt),p2:rlMesh(RLS,mt)}}
const dimRowD=mkDim(RLMR),dimIn=mkDim(),dimArm=mkDim(),dimAll=d=>[d.line,d.c1,d.c2,d.t1,d.t2,d.p1,d.p2];
const rlLab={i:document.getElementById('rl_i'),a:document.getElementById('rl_a')};
/* 圓形標籤大小隨舞台高度縮放（高 700 px 以上＝原大小，最小 62%，字級不低於 10 px），不隨捏合縮放變動，字才一直讀得到；並限制在舞台內。 */
function rlText(k,p,txt,off,cx){const q=p.clone().project(camera),el=rlLab[k],W=stage.clientWidth,H=stage.clientHeight,f=Math.max(.62,Math.min(1,H/700)),D=(k==='i'?71:64)*f,px=(q.x+1)/2*(CVW||W);
  el.style.width=el.style.height=D+'px';el.style.fontSize=Math.max(10,12*f)+'px';
  el.style.left=Math.max(D/2+4,Math.min(W-D/2-4,cx!=null?cx:px))+'px';el.style.top=Math.max(D/2+4,(1-q.y)/2*(CVH||H)-off*f)+'px';el.textContent=txt;el.style.display='flex';return px}
function rlSeg2(m,a,b,r){const d=b.clone().sub(a),L=d.length();if(L<1e-4){m.visible=false;return}m.position.copy(a).addScaledVector(d,.5);m.scale.set(r,L,r);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());m.visible=true}
function rlCone(m,tip,dir,k){k=k||1;m.position.copy(tip).addScaledVector(dir,-RAL*k/2);m.scale.set(RAR*k,RAL*k,RAR*k);m.quaternion.setFromUnitVectors(new V3(0,1,0),dir);m.visible=true}
/* 兩種標註樣式。arrow＝true：雙向箭頭＋長端線（尺寸對照，點列時出現）；false：實線＋短端線（騎士跨高、手臂長）。w＝線半徑。短量測自動縮小箭頭，避免箭頭互相重疊。 */
function placeDim(d,a,b,arrow,w,sz,sa,en){sz=sz||1;sa=sa||sz;en=en||'tt';const L=a.distanceTo(b);if(L<1e-4){dimAll(d).forEach(m=>m.visible=false);return}
  const dir=b.clone().sub(a).normalize(),perp=new V3(-dir.y,dir.x,0),tk=arrow?RTL/2*sz:RTL*.2;let a2=a,b2=b;
  if(arrow){const k=Math.min(1,L/(2.4*RAL*sa))*sa;rlCone(d.c1,a,dir.clone().negate(),k);rlCone(d.c2,b,dir,k);a2=a.clone().addScaledVector(dir,RAL*k*.85);b2=b.clone().addScaledVector(dir,-RAL*k*.85)}else{d.c1.visible=d.c2.visible=false}
  /* 端點：en 兩字元，t＝短截線、o＝小實心圓（a 端、b 端） */
  [[a,en[0],d.t1,d.p1],[b,en[1],d.t2,d.p2]].forEach(([q,e,t,p])=>{if(e==='o'){t.visible=false;p.position.copy(q);p.scale.setScalar(w*5.25);p.visible=true}else{p.visible=false;rlSeg2(t,q.clone().addScaledVector(perp,-tk),q.clone().addScaledVector(perp,tk),w*.8)}});
  rlSeg2(d.line,a2,b2,w)}
function placeRider(){dimAll(dimIn).concat(dimAll(dimArm)).forEach(m=>m.visible=false);Object.values(rlLab).forEach(e=>e.style.display='none');
  if(!((tab==='geo'||tab==='custom')&&N))return;
  const o=bike.position.x,z=.2,xm=(N.TTst.x+N.TTht.x)/2000+o+.04;
  let cxI=null;
  if(okK('i')){const Im=RID.i/100;placeDim(dimIn,new V3(xm,0,z),new V3(xm,Im,z),false,RLR*.8,1,1,'to');cxI=rlText('i',new V3(xm,Im,z),`跨高\n${RID.i} cm`,48)}
  if(okK('a')){const w=new V3(N.bar.x/1000+o,N.bar.y/1000,z),th=Math.PI/3,Am=RID.a/100,sh=new V3(w.x-Math.cos(th)*Am,w.y+Math.sin(th)*Am,z);placeDim(dimArm,w,sh,false,RLR*.8,1,1,'oo');rlText('a',sh,`手臂長\n${RID.a} cm`,44,cxI)}}
/* 量測標籤（點尺寸對照列時的橘色區塊）若被騎士圓擋住，兩顆圓一起沿水平方向平移避開（往前或往後取較近者），避開後保持兩圓水平對齊。 */
let rlShift=0;
function avoidRL(){const els=Object.values(rlLab).filter(e=>e.style.display==='flex');if(!els.length){rlShift=0;return}
  const W=stage.clientWidth,dl=(dimLabel.style.display==='block'&&dimLine.visible)?dimLabel:null,items=els.map(e=>({e,cx:parseFloat(e.style.left),cy:parseFloat(e.style.top),r:e.offsetWidth/2}));let target=0;
  /* 兩顆騎士圓互相重疊（舞台矮、被限制在舞台內時會發生）：手臂長圓沿水平往它原本偏的一側推開 */
  const ia=items.find(t=>t.e===rlLab.a),ii=items.find(t=>t.e===rlLab.i);
  if(ia&&ii){const need=ia.r+ii.r+4,dy=ia.cy-ii.cy;if(Math.abs(dy)<need){const dx=Math.sqrt(need*need-dy*dy),sg=ia.cx>=ii.cx?1:-1;let nx=ii.cx+sg*dx;if(nx>W-ia.r-4||nx<ia.r+4)nx=ii.cx-sg*dx;ia.cx=Math.max(ia.r+4,Math.min(W-ia.r-4,nx))}}
  if(dl){const rx=parseFloat(dl.style.left),ry=parseFloat(dl.style.top),hw=dl.offsetWidth/2+6,hh=dl.offsetHeight/2+6;
    const hit=sh=>items.some(it=>{const cx=it.cx+sh,px=Math.max(rx-hw,Math.min(rx+hw,cx)),py=Math.max(ry-hh,Math.min(ry+hh,it.cy));return Math.hypot(cx-px,it.cy-py)<it.r+4});
    const inside=sh=>items.every(it=>it.cx+sh>=it.r+4&&it.cx+sh<=W-it.r-4);
    if(hit(0))for(let d=6;d<=700;d+=6){let f=false;for(const sh of[d,-d])if(inside(sh)&&!hit(sh)){target=sh;f=true;break}if(f)break}}
  rlShift+=(target-rlShift)*.2;if(Math.abs(rlShift-target)<.5)rlShift=target;items.forEach(it=>it.e.style.left=(it.cx+rlShift)+'px')}
function dimRowOff(){dimAll(dimRowD).forEach(m=>m.visible=false)}
function scoreDimSync(){const g=document.getElementById('geoScore');if(!g)return;g.querySelectorAll('[data-dim]').forEach(x=>{const on=x.dataset.dim===dimKey;if(x.classList.contains('on')!==on){x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on))}})}
function updateDim(){scoreDimSync();if(!N||!dimKey){dimLine.visible=false;dimRowOff();dimLabel.style.display='none';return}
  const pts=dimPts(dimKey,N);if(!pts){dimLine.visible=false;dimRowOff();return}
  const arr=dimGeo.attributes.position.array;pts.forEach((p,i)=>{arr[i*3]=p.x/1000+bike.position.x;arr[i*3+1]=p.y/1000;arr[i*3+2]=.16});
  dimGeo.setDrawRange(0,pts.length);dimGeo.attributes.position.needsUpdate=true;dimLine.visible=true;
  placeDim(dimRowD,new V3(arr[0],arr[1],arr[2]),new V3(arr[3],arr[4],arr[5]),true,RLR,.4,.65)}/* 尺寸對照標註：端線為騎士標註的 40%、箭頭 65%，線寬不變 */
function placeTags(){ADDONS.forEach(a=>{const el=document.getElementById('tag_'+a.id),on=false;/* v199zzzzi：加購零件品名膠囊一律不顯示 */
  if(!on){el.style.display='none';return}const o=bike.position.x,w=stage.clientWidth,h=stage.clientHeight,
    p=(a.id==='blktec'?new V3(N.bar.x/1000+o+.02,N.bar.y/1000+.03,0):new V3(N.saddle.x/1000+o-.03,N.saddle.y/1000-.02,0)).project(camera);
  let x=(p.x+1)/2*(CVW||w)+(a.id==='blktec'?84:-112),y=(1-p.y)/2*(CVH||h)-(a.id==='blktec'?46:34);
  x=Math.max(100,Math.min(w-100,x));y=Math.max(26,Math.min(h-26,y));el.style.left=x+'px';el.style.top=y+'px';el.style.display='flex'})}
function projectLabel(){if(!dimLine.visible){dimLabel.style.display='none';return}
  /* 標籤不壓在線上：沿螢幕空間中垂直於尺寸線的方向（取朝上、近乎垂直線時取右側）移開，距離＝標籤半寬高在該方向的投影＋間隙 */
  const a=dimGeo.attributes.position.array,W=stage.clientWidth,H=stage.clientHeight,
    sp=(x,y,z)=>{const q=new V3(x,y,z).project(camera);return[(q.x+1)/2*(CVW||W),(1-q.y)/2*(CVH||H)]},
    p0=sp(a[0],a[1],.16),p1=sp(a[3],a[4],.16),mx=(p0[0]+p1[0])/2,my=(p0[1]+p1[1])/2;
  dimLabel.textContent=dimText;dimLabel.style.display='block';
  let dx=p1[0]-p0[0],dy=p1[1]-p0[1];const dl=Math.hypot(dx,dy)||1;dx/=dl;dy/=dl;
  let nx=-dy,ny=dx;if(ny>.001||(Math.abs(ny)<=.001&&nx<0)){nx=-nx;ny=-ny}
  if(dimKey==='reach'||dimKey==='ett'){/* 前伸量、有效上管長（水平線）：標籤放在線的左端外側，與線同高 */
    const L0=p0[0]<p1[0]?p0:p1;dimLabel.style.left=(L0[0]-dimLabel.offsetWidth/2-12)+'px';dimLabel.style.top=L0[1]+'px';return}
  const off=dimLabel.offsetWidth/2*Math.abs(nx)+dimLabel.offsetHeight/2*Math.abs(ny)+10;
  dimLabel.style.left=(mx+nx*off)+'px';dimLabel.style.top=(my+ny*off)+'px'}
// 疊圖比較：中心線
/* 疊圖樣式：長虛線（與實心車架、實線標註區隔）＋冷色（橘色專屬標註，綠色專屬狀態）＋略粗（1px 線在淺色舞台幾乎看不見）。虛線依各段長度均分，兩端落在節點上。 */
const GHR=.0024,GD=.03,GG=.022,GMAX=700,GCOL={light:0x2F6384,dark:0x8CBBD8};
const ghost=new THREE.InstancedMesh(RLG,new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false,transparent:true,opacity:.95,toneMapped:false}),GMAX);
ghost.renderOrder=19;ghost.visible=false;ghost.frustumCulled=false;ghost.count=0;scene.add(ghost);
function ghostCol(){ghost.material.color.setHex(isDark()?GCOL.dark:GCOL.light)}
ghostCol();
let cmp=null;
const gM=new THREE.Matrix4(),gQ=new THREE.Quaternion(),gS=new V3(),gP=new V3(),gY=new V3(0,1,0);
function updateGhost(){if(!N||!cmp||tab!=='geo'){ghost.visible=false;return}const n=stockNodes(GEO.find(g=>g.size===cmp)),ox=bike.position.x;
  const segs=[[n.BB,n.TTst],[n.TTst,n.STtop],[n.TTst,n.TTht],[n.HTb,n.HTt],[n.BB,n.DTht],[n.BB,n.RA0||n.RA],[n.SSst,n.RA0||n.RA],[n.HTb,n.FA]];
  const gr=GHR*RS,gd=GD*RS,gg=GG*RS;let k=0;segs.forEach(([a,b])=>{const A=new V3(a.x/1000+ox,a.y/1000,.15),d=new V3(b.x/1000+ox,b.y/1000,.15).sub(A),L=d.length();if(L<1e-4)return;d.normalize();gQ.setFromUnitVectors(gY,d);
    const c=Math.max(1,Math.round((L+gg)/(gd+gg))),dl=(L-(c-1)*gg)/c;
    for(let i=0;i<c&&k<GMAX;i++){gP.copy(A).addScaledVector(d,i*(dl+gg)+dl/2);gS.set(gr,dl,gr);gM.compose(gP,gQ,gS);ghost.setMatrixAt(k++,gM)}});
  ghost.count=k;ghost.instanceMatrix.needsUpdate=true;ghost.visible=true}

/* ===== 相機 ===== */
let offY=0,offX=0;const cam={tgt:new V3(0,.55,0),r:2.5,th:.38,ph:1.36},want={tgt:cam.tgt.clone(),r:2.5,th:.38,ph:1.36};
/* v88：全車視角兩側為「鏡像」而非單純 +180°（扭力分頁主視角偏航 −.38、旋轉點 z −.018，單純轉 180° 構圖不對稱）：翻轉側＝偏航取 π＋.38、旋轉點 z 取 +.018 */
const homeTh=(tq,f)=>tq?(f?Math.PI+.38:-.38):(f?Math.PI:0),homeTgt=(tq,f)=>tq?new V3(-.045,.55+(G.exY?G.exY():0),f?.018:-.018):new V3(AF.cx||0,AF.cy>0?AF.cy:camY(),AF.cz||0);/* v120b：首頁旋轉中心＝整車外形中心（與展示環繞相同），置中位移在任何方位都成立 */
let homeFlip=0;/* v87：全車視角目前在哪一側（0＝預設側、1＝翻轉 180°）；goHome 與切換分頁沿用，不轉回預設側 */
function nearest(cur,t){return t+Math.round((cur-t)/(2*Math.PI))*2*Math.PI}
const TK=()=>(G.exK?G.exK():1)*Math.max(window.innerWidth<=760?.72:.84,TQ_MINR/fitR());/* v107：扭力分頁取景距離不得小於 TQ_MINR（車高需完整入鏡：半高 .60 m 除以 .82·tan15°）。舊值在寬矮舞台（手機橫向、折疊機內螢幕）只依寬高比分段，車頂被切掉 */
const TQ_MINR=2.7;/* 扭力分頁放大倍率（取景距離乘數） */
function fitR(){const a=stage.clientWidth/Math.max(1,stage.clientHeight);return a<1?3.8:a<1.4?3.5:a<1.7?3.0:2.55}
function fitSide(){const fr=frameR();if(fr)return fr;/* v199zzzzzz120：實際外形取景；外形尚未建好時退回下列估算 */const cov=stage.clientWidth<=480?.74:.88,asp=Math.max(.3,stage.clientWidth/Math.max(1,stage.clientHeight-ovPx)),t=Math.tan(15*Math.PI/180),T=riderTop(),hv=T?Math.max(.5,T/2+.03):.5;return Math.max(2.1,Math.max(.86/(cov*t*asp),hv/(.82*t)))}
/* ===== v199zzzzzz120：整車置中（使用者 2026-11-19）=====
   除特寫外的任何動靜狀態（首頁視角、展示環繞、拖曳旋轉、卡片收折中、拆解），整車（不含陰影、疊圖、熱點）的螢幕包圍框中心＝可見 3D 區中心。
   · 可見 3D 區：桌機＝#stage；行動版＝#stage 上緣到卡片上緣（ovPx）。
   · 做法：每幀把整車外形點投影到螢幕，算包圍框中心與可見區中心的差，直接加進 setViewOffset 的 x／y（純平移，不動鏡頭與旋轉中心）。
   · 外形點：每個幾何只算一次（62 個方向各取最外側頂點，WeakMap 快取），每幀只做矩陣乘法。超過 6 ms 預算的新幾何本幀先用包圍盒 8 角點。
   · 權重 afW：鏡頭距離 ≥ 首頁距離 80% 全置中，≤ 50% 不置中（特寫、加購特寫、展示特寫、大幅拉近皆自動退出），中間線性過渡；選中零件卡片、使用者平移後為 0（回到全車才恢復）。
   · 首頁距離 frameR：由同一組外形點算「繞 y 軸任何方位都放得下」的水平半徑與高度（展示環繞不會忽大忽小）。 */
const AF={pan:0,hc:new WeakMap(),P:[],n:0,ox:0,oy:0,rH:0,R:0,H:0,k:'',M:new THREE.Matrix4()};
const AF_D=(()=>{const D=[];for(let i=0;i<3;i++)for(let s=-1;s<=1;s+=2){const d=[0,0,0];d[i]=s;D.push(d)}
  for(let pl=0;pl<3;pl++)for(let k=0;k<16;k++){const a=k/16*2*Math.PI,d=[0,0,0];d[pl]=Math.cos(a);d[(pl+1)%3]=Math.sin(a);D.push(d)}
  for(let k=0;k<8;k++)D.push([k&1?1:-1,k&2?1:-1,k&4?1:-1]);return D})();
function afHull(g,t0){let h=AF.hc.get(g);if(h)return h;const p=g.attributes&&g.attributes.position;if(!p){h=new Float32Array(0);AF.hc.set(g,h);return h}
  if(performance.now()-t0>6){if(!g.boundingBox)g.computeBoundingBox();const b=g.boundingBox,c=new Float32Array(24);for(let k=0;k<8;k++){c[k*3]=k&1?b.max.x:b.min.x;c[k*3+1]=k&2?b.max.y:b.min.y;c[k*3+2]=k&4?b.max.z:b.min.z}return c}
  const D=AF_D,n=p.count,st=Math.max(1,Math.ceil(n/40000)),best=new Float64Array(D.length).fill(-Infinity),ix=new Int32Array(D.length);
  for(let i=0;i<n;i+=st){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);for(let j=0;j<D.length;j++){const d=D[j],v=x*d[0]+y*d[1]+z*d[2];if(v>best[j]){best[j]=v;ix[j]=i}}}
  const u=[...new Set(ix)];h=new Float32Array(u.length*3);u.forEach((i,k)=>{h[k*3]=p.getX(i);h[k*3+1]=p.getY(i);h[k*3+2]=p.getZ(i)});AF.hc.set(g,h);return h}
function afPts(){const P=AF.P,t0=performance.now();P.length=0;bike.updateWorldMatrix(true,true);
  bike.traverseVisible(o=>{if(!o.isMesh||o.isInstancedMesh||o.isBatchedMesh||!o.geometry)return;const m=o.material;if(m&&!Array.isArray(m)&&(m.visible===false||(m.transparent&&m.opacity<.05)))return;
    const h=afHull(o.geometry,t0),e=o.matrixWorld.elements;for(let i=0;i<h.length;i+=3){const x=h[i],y=h[i+1],z=h[i+2];P.push(e[0]*x+e[4]*y+e[8]*z+e[12],e[1]*x+e[5]*y+e[9]*z+e[13],e[2]*x+e[6]*y+e[10]*z+e[14])}});
  const T=riderTop();if(T>0)P.push(bike.position.x,T,0);/* 騎士尺寸橘線的頂端也要入鏡 */return P}
function afVis(){ovCalc();return{w:stage.clientWidth,h:Math.max(80,stage.clientHeight-ovPx-(AF.top||0)-(AF.bot||0))}}/* v199zzzzzz130：桌機上方讓出頂部車款列（AF.top） */
/* v199zzzzzz130（使用者 2026-11-20）：桌機頂部車款標下方的車款彩蛋（MASTER＝爪痕、AUDAX＝高山、ili-ili 系列＝掌印），與底部車款簡介（中／英隨語言） */
const M_EGG_OF={'64':'claw','325':'claw','audax':'mtn','ili':'paw','ss':'paw','ex':'paw'};
function mPopFill(){const P=document.getElementById('mPop');if(!P)return;const T=VIBE_D.M_INTRO&&VIBE_D.M_INTRO[selM],en=!!(window.RKL_LANG&&window.RKL_LANG.get()==='en'),t=T?(en?T.en:T.tw):'';if(P.textContent!==t)P.textContent=t;P.lang=en?'en':'zh-Hant'}
function mInfo(){try{mPopFill();const eg=document.querySelector('#mStrip .ms-egg'),IN=document.getElementById('mIntro'),k=M_EGG_OF[selM],sv=k&&VIBE_D.M_EGG?VIBE_D.M_EGG[k]:null;
  if(eg){if(eg.dataset.k!==k){eg.dataset.k=k||'';const u=sv?'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent(sv)+'")':'none';eg.style.webkitMaskImage=eg.style.maskImage=u;eg.dataset.sh=k||''}eg.hidden=!sv}
  if(IN){const T=VIBE_D.M_INTRO&&VIBE_D.M_INTRO[selM],en=!!(window.RKL_LANG&&window.RKL_LANG.get()==='en'),t=T?(en?T.en:T.tw):'';if(IN.textContent!==t)IN.textContent=t;IN.lang=en?'en':'zh-Hant';IN.classList.toggle('en',en)}}catch(e){}}
/* v199zzzzzz131（A4）：簡介預留六款中最高者的高度（同寬、同語言），換款時 AF.bot 不變，不觸發 afTopChanged 重設鏡頭 */
var __imh={k:'',h:0};function introMinH(w){try{const en=!!(window.RKL_LANG&&window.RKL_LANG.get()==='en'),k=w+'|'+en;if(__imh.k===k)return __imh.h;const IN=document.getElementById('mIntro'),T=VIBE_D.M_INTRO||{};if(!IN)return 0;
  const t0=IN.textContent,l0=IN.lang,e0=IN.classList.contains('en'),m0=IN.style.minHeight;IN.style.minHeight='0px';IN.lang=en?'en':'zh-Hant';IN.classList.toggle('en',en);
  let h=0;for(const m in T){IN.textContent=en?T[m].en:T[m].tw;h=Math.max(h,IN.offsetHeight)}IN.textContent=t0;IN.lang=l0;IN.classList.toggle('en',e0);IN.style.minHeight=m0;if(h)__imh={k,h};return h}catch(e){return 0}}
function afTopChanged(){try{if(AF.pan||sel)return;const r=homeR();want.r=r;want.tgt.copy(homeTgt(tab==='torque',homeFlip))}catch(e){}}
const AF_ZH=.81;function frameR(){try{const P=afPts();if(P.length<24)return 0;let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9,y0=1e9,y1=-1e9;
  for(let i=0;i<P.length;i+=3){const x=P[i],y=P[i+1],z=P[i+2];if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;if(z<z0)z0=z;if(z>z1)z1=z}
  const cx=(x0+x1)/2,cz=(z0+z1)/2;AF.cx=cx;AF.cz=cz;AF.cy=(y0+y1)/2;/* 旋轉中心高度＝外形中心（含騎士橘線頂點），展示仰角改變時車身不會上下偏 */let R=0;for(let i=0;i<P.length;i+=3)R=Math.max(R,Math.hypot(P[i]-cx,P[i+2]-cz));
  AF.R=R;AF.H=(y1-y0)/2;const v=afVis(),tp=(AF.top||0)+(AF.bot||0),hb=v.h+tp,kv=v.h/hb,t=Math.tan(15*Math.PI/180),asp=Math.max(.3,v.w/hb),cw=v.w<=480?.86:.84,ch=.8;/* v199zzzzzz130：上方讓位 AF.top 只縮可用高度（kv），寬度比照原本；tp＝0（行動版）時與舊公式相同 */
  return Math.max(2.1,R/(cw*t*asp),AF_ZH*(AF.H+.12*R)/(ch*t*kv))}/* v199zzzzzz131b：高度項 ×AF_ZH（使用者 2026-11-20：首頁視角太遠，依截圖拉近約 1.23 倍；只縮高度項，寬度項不動，窄舞台不會裁切） *//* 高度加 0.12R：展示環繞仰角約 1.45 rad，正面視角時車長會往上下多投影一些 */catch(e){console.warn('frameR',e);return 0}}
function homeR(){const r=tab==='torque'?fitR()*TK():fitSide();AF.rH=r;try{afFix()}catch(e){console.warn('afFix',e)}return r}
const zMax=()=>Math.max(4.2,AF.rH*1.25);/* 縮放上限：行動版窄高舞台的首頁距離可能 >4.2，拉近時不得先跳回 4.2 */
function afW(){if((sel&&!wrap.hidden)||AF.pan||!(AF.rH>0))return 0;return Math.min(1,Math.max(0,(cam.r/AF.rH-.5)/.3))}
/* v120b：置中位移只在事件時算一次（卡片收折、舞台尺寸、換分頁、換車款／尺寸／零件後的陰影重算），之後固定不動（使用者 2026-11-19：每幀追中心看久了不穩）。
   以「首頁視角」的虛擬鏡頭（同 goHome 的目標、距離、方位、仰角）投影外形點；旋轉中心＝整車外形中心，所以展示環繞時同一組位移仍大致置中。 */
function afFix(){const P=afPts();if(P.length<24||!(AF.rH>0))return;const tq=tab==='torque',g=homeTgt(tq,homeFlip),th=homeTh(tq,homeFlip),ph=tq?1.36:Math.PI/2,r=AF.rH,v=afVis(),W=CVW||stage.clientWidth,H=CVH||stage.clientHeight;
  const c=AF.cam||(AF.cam=new THREE.PerspectiveCamera(30,1,.05,50));c.aspect=stage.clientWidth/Math.max(1,stage.clientHeight);const sp=Math.sin(ph);c.position.set(g.x+r*sp*Math.sin(th),g.y+r*Math.cos(ph),g.z+r*sp*Math.cos(th));c.lookAt(g);
  if(W!==stage.clientWidth||H!==stage.clientHeight)c.setViewOffset(stage.clientWidth,stage.clientHeight,0,0,W,H);else c.clearViewOffset();c.updateProjectionMatrix();c.updateMatrixWorld();
  const M=AF.M.multiplyMatrices(c.projectionMatrix,c.matrixWorldInverse).elements;let a=1e9,b=-1e9,e=1e9,d=-1e9;
  for(let i=0;i<P.length;i+=3){const x=P[i],y=P[i+1],z=P[i+2],w=M[3]*x+M[7]*y+M[11]*z+M[15];if(w<=1e-4)continue;const nx=(M[0]*x+M[4]*y+M[8]*z+M[12])/w,ny=(M[1]*x+M[5]*y+M[9]*z+M[13])/w;if(nx<a)a=nx;if(nx>b)b=nx;if(ny<e)e=ny;if(ny>d)d=ny}
  if(b<a)return;AF.ox=((a+b)/4+.5)*W-v.w/2;AF.oy=(.5-(e+d)/4)*H-(AF.top||0)-v.h/2;/* AF.bot 已含在 v.h */AF.nFix=(AF.nFix||0)+1}
function goHome(){AF.pan=0;AF.uv=0;AF.hold=0;want.r=homeR();want.tgt.copy(homeTgt(tab==='torque',homeFlip));if(tab==='torque'){want.ph=1.36;want.th=nearest(want.th,homeTh(true,homeFlip))}else{want.ph=Math.PI/2;want.th=nearest(want.th,homeTh(false,homeFlip))}}
/* v199zzzzzz112（D2）：鏡頭最低高度 STU_YMIN＝0.04 m（不得低於攝影棚地面）。目標點 y≥0；極角上限由 y＝tgt.y＋r·cosφ ≥ YMIN 反解。對 want 與 cam 各夾一次：想去的位置與補間途中的位置都不會穿地（只夾 want 時，r 與 φ 同時補間會在途中穿地）。拖曳、縮放、捏合、特寫補間、展示環繞都經過這裡，不需逐處修改。 */
const STU_YMIN=.04;function stuLimit(o){if(o.tgt.y<0)o.tgt.y=0;const k=(STU_YMIN-o.tgt.y)/Math.max(.05,o.r);if(k>-1){const m=Math.acos(Math.min(1,k));if(o.ph>m)o.ph=m}}
function applyCam(){stuLimit(want);cam.tgt.lerp(want.tgt,.12);cam.r+=(want.r-cam.r)*.12;cam.th+=(want.th-cam.th)*.12;cam.ph+=(want.ph-cam.ph)*.12;stuLimit(cam);
  const sp=Math.sin(cam.ph);camera.position.set(cam.tgt.x+cam.r*sp*Math.sin(cam.th),cam.tgt.y+cam.r*Math.cos(cam.ph),cam.tgt.z+cam.r*sp*Math.cos(cam.th));camera.lookAt(cam.tgt);
  STU.mesh.rotation.y=cam.th;lyaw(cam.th);/* v199zzzzzz112（D1）轉台：攝影棚偏航＝鏡頭偏航；鏡頭在棚內物件空間永遠位於 +z，亮區放 −z（車後牆）。俯仰與縮放照世界座標 */
  const w=stage.clientWidth,h=stage.clientHeight,leg=(sel&&!wrap.hidden)?h*.24:(ovPx>0?ovPx/2:(window.innerWidth<=760?h*.14:h*.07)),wA=afW();
  let gx=0,gy=leg;if(AF.hold){gx=0;gy=(ovPx+(AF.bot||0)-(AF.top||0))/2}/* v120e：自訂視角自旋中——鏡頭目標固定在可見區中心 */else if(wA>0){if((AF.n++)%6===0){const o=ovPx;ovCalc();if(Math.abs(o-ovPx)>1){const r=homeR();if(!sel&&Math.abs(want.r-AF.rH)<.02*AF.rH&&!(window.__scRz&&window.__scRz()))want.r=r}}/* 卡片上緣變了（拖曳卡片不一定觸發 #stage 尺寸變動）：重讀並在首頁距離時重算 */gx=wA*AF.ox;gy=wA*AF.oy+(1-wA)*leg}/* v199zzzzzz120：整車置中；特寫（wA＝0）沿用舊的固定位移 */
  offY+=(gy-offY)*.12;if(Math.abs(gy-offY)<.02)offY=gy;offX+=(gx-offX)*.12;if(Math.abs(gx-offX)<.02)offX=gx;
  if(cam.tgt.distanceToSquared(want.tgt)<1e-10&&Math.abs(want.r-cam.r)<1e-5&&Math.abs(want.th-cam.th)<1e-5&&Math.abs(want.ph-cam.ph)<1e-5){cam.tgt.copy(want.tgt);cam.r=want.r;cam.th=want.th;cam.ph=want.ph}/* 接近目標即吸附，鏡頭簽章不再變動 */
 
  if(Math.abs(offY)>.5||Math.abs(offX)>.5||(CVW&&(CVW!==w||CVH!==h)))camera.setViewOffset(w,h,offX,offY,CVW||w,CVH||h);else camera.clearViewOffset()}/* v115：畫布大於 #stage 時一律走 viewOffset */
function focus(pos){want.tgt.copy(pos);want.r=1.05;want.ph=1.3;if(pos.z<-.03)want.th=nearest(want.th,Math.PI-.55);else if(pos.z>.03)want.th=nearest(want.th,.55)}
const ptrs=new Map();let dragMoved=0,pinch0=null,multi=false,lastTap=null;
stage.addEventListener('pointerdown',e=>{if(e.target!==renderer.domElement)return;renderer.domElement.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,pan:e.button===1});if(e.button===1)e.preventDefault();dragMoved=0;
  if(ptrs.size===2){multi=true;const[a,b]=[...ptrs.values()];pinch0={d:Math.hypot(a.x-b.x,a.y-b.y),r:want.r,cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}});
stage.addEventListener('pointermove',e=>{if(ptrs.has(e.pointerId)){const p=ptrs.get(e.pointerId),dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;dragMoved+=Math.abs(dx)+Math.abs(dy);if(dragMoved>4)scUser('3D 移動')/* v199zzzzzz101：先停展示再套用本次位移 */;
    if(ptrs.size===1){if(p.pan){AF.pan=1;const k=2*cam.r*Math.tan(15*Math.PI/180)/Math.max(1,stage.clientHeight),rt=new V3().setFromMatrixColumn(camera.matrixWorld,0),up=new V3().setFromMatrixColumn(camera.matrixWorld,1);want.tgt.addScaledVector(rt,-dx*k).addScaledVector(up,dy*k)}
      else{want.th-=dx*.008;want.ph=Math.min(2.6,Math.max(.35,want.ph-dy*.006))}if(dragMoved>4)stage.classList.add('dragging')}
    else if(ptrs.size===2&&pinch0){const[a,b]=[...ptrs.values()];/* v199zzzzzz130（A1）：捏合朝雙指中心縮放（P 於捏合開始取一次） */if(!pinch0.P)pinch0.P=zoomPt(pinch0.cx,pinch0.cy);zoomAt(pinch0.cx,pinch0.cy,pinch0.r*pinch0.d/Math.hypot(a.x-b.x,a.y-b.y),pinch0.P);
      /* 雙指中心點移動＝平移（與中鍵拖曳同算法），與捏合縮放同時進行 */
      const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2,k=2*cam.r*Math.tan(15*Math.PI/180)/Math.max(1,stage.clientHeight),rt=new V3().setFromMatrixColumn(camera.matrixWorld,0),up=new V3().setFromMatrixColumn(camera.matrixWorld,1);
      pinch0.mv=(pinch0.mv||0)+Math.abs(cx-pinch0.cx)+Math.abs(cy-pinch0.cy);if(pinch0.mv>12)AF.pan=1;/* 捏合時中心點難免小抖動，累計超過 12 px 才算平移 */want.tgt.addScaledVector(rt,-(cx-pinch0.cx)*k).addScaledVector(up,(cy-pinch0.cy)*k);pinch0.cx=cx;pinch0.cy=cy;if(dragMoved>4)stage.classList.add('dragging')}}
  else if(e.pointerType==='mouse')hover(e)});
function endPtr(e){if(!ptrs.has(e.pointerId))return;const wasPan=ptrs.get(e.pointerId).pan;ptrs.delete(e.pointerId);if(ptrs.size<2)pinch0=null;stage.classList.remove('dragging');
  if(ptrs.size>0)return;const wasMulti=multi;multi=false;
  if(wasPan||wasMulti||dragMoved>=6||e.target!==renderer.domElement||e.type==='pointercancel'){lastTap=null;return}
  /* 點一下：扭力巡檢點到零件＝開卡片；其餘情況 350 ms 內再點一下（相距 30 px 內）＝回到全車（單指雙擊） */
  if(tab==='torque'&&window.__fdPick){const fi=window.__fdPick(e);if(fi>=0&&!(FOLD.tq&&pick(e))){window.__featSel(window.__featCur()===fi?-1:fi);lastTap=null;return}}/* v199zzzzzz130（B2）：點藍點＝同點清單列 */
  if(tab==='torque'){const h=pick(e);if(h){scUser('點巡檢點',true)/* v199zzzzzz101：點到橘點會移動鏡頭，展示補間會蓋掉，故此情況仍暫停；點空白處不算 */;if(sel===h&&!wrap.hidden){closeCard();scResume()/* v199zzzzzz105：關 popup＝復位並繼續自旋（若暫停前在自旋） */}else openPart(h);/* v106：關閉＝一律回整車（取代 v96 的視角保留）；暫停前在自旋才續播（使用者 2026-11-18） */lastTap=null;return}}
  const now=performance.now();
  if(lastTap&&now-lastTap.t<350&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<30){lastTap=null;scUser('雙擊回全車');closeCard();goHome()}else lastTap={t:now,x:e.clientX,y:e.clientY}}
stage.addEventListener('mousedown',e=>{if(e.button===1)e.preventDefault()});stage.addEventListener('auxclick',e=>{if(e.button===1)e.preventDefault()});stage.addEventListener('pointerup',endPtr);stage.addEventListener('pointercancel',endPtr);
/* v199zzzzzz130（A1）：朝游標縮放（使用者 2026-11-20 UX 評估）。原本只朝整車中心縮放、下限 0.6 m，細部（貼圖、碎花、漸層交界）看不清楚。
   拉近：以游標射線打到車上的點 P（打不到＝過目標點、垂直視線的平面）為不動點，tgt 與 r 同比例縮向 P（相機也以 P 為中心縮放，P 在畫面上不動），並關閉自動取景（AF.pan）。
   拉遠：tgt 依「r 走完到首頁距離的比例」漸回首頁目標，回到首頁距離即恢復自動取景。下限 Z_MIN＝0.25 m（可見高度約 13 cm）。P 在同一手勢（游標 30 px 內、0.3 s 內）重複使用，避免每格都做射線檢測。 */
const Z_MIN=.25,ZRC=new THREE.Raycaster();let zP=null;
function zoomPt(cx,cy){const n=performance.now();if(zP&&n-zP.t<300&&Math.hypot(cx-zP.x,cy-zP.y)<30){zP.t=n;return zP.p}
  const r=renderer.domElement.getBoundingClientRect(),nd=new THREE.Vector2((cx-r.left)/r.width*2-1,-(cy-r.top)/r.height*2+1);ZRC.setFromCamera(nd,camera);let P=null;
  try{const vis=o=>{for(let q=o;q;q=q.parent)if(!q.visible)return false;return true};const h=ZRC.intersectObject(bike,true).find(q=>q.object.isMesh&&q.object!==G.shadow&&!(q.object.material&&q.object.material.opacity===0)&&vis(q.object));if(h)P=h.point.clone()}catch(e){}
  if(!P){const dn=camera.getWorldDirection(new V3());P=ZRC.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(dn,want.tgt),new V3())}
  zP={x:cx,y:cy,t:n,p:P};return P}
function zoomAt(cx,cy,r1,P){const r0=want.r;r1=Math.min(zMax(),Math.max(Z_MIN,r1));if(Math.abs(r1-r0)<1e-6)return;
  if(r1<r0){P=P||zoomPt(cx,cy);if(P){want.tgt.sub(P).multiplyScalar(r1/r0).add(P);AF.pan=1}}
  else{const rH=AF.rH||homeR(),H=homeTgt(tab==='torque',homeFlip),t=rH>r0?Math.min(1,(r1-r0)/(rH-r0)):1;want.tgt.lerp(H,t);if(r1>=rH*.98)AF.pan=0}
  want.r=r1;wk()}
stage.addEventListener('wheel',e=>{e.preventDefault();scUser('3D 縮放');zoomAt(e.clientX,e.clientY,want.r*(1+Math.sign(e.deltaY)*.1))/* v199zzzzzz130：滾輪方向改為通例（往上滾＝拉近；原本相反） */},{passive:false});
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
function pick(e){const r=renderer.domElement.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  ray.setFromCamera(ndc,camera);const hits=ray.intersectObjects(HS.filter(h=>h.g.visible).map(h=>h.hit))/* v199zzzzzz99：隱藏的橘點不可被點到（Raycaster 不看 visible） */;return hits.length?hits[0].object.userData.part:null}
const tipEl=document.getElementById('tip');
function hover(e){let p=tab==='torque'?pick(e):null;if(!p&&tab==='torque'&&window.__fdPick){const fi=window.__fdPick(e);if(fi>=0)p={name:scName(SC_NODES[fi])}}if(p){const r=stage.getBoundingClientRect();tipEl.style.left=(e.clientX-r.left)+'px';tipEl.style.top=(e.clientY-r.top)+'px';tipEl.textContent=p.name;tipEl.style.display='block';renderer.domElement.style.cursor='pointer'}else{tipEl.style.display='none';renderer.domElement.style.cursor=''}}
/* v86：已在全車（鏡頭目標＝全車視角，左右任一側）時再按一次，轉 180° 看另一側；否則照舊回到全車 */
document.getElementById('reset').onclick=()=>{const tq=tab==='torque',hP=tq?1.36:Math.PI/2,hR=homeR(),hy=homeTgt(tq,homeFlip),ht=homeTh(tq,homeFlip),d=Math.abs(want.th-nearest(want.th,ht)),atHome=!sel&&Math.abs(want.ph-hP)<.03&&d<.03&&Math.abs(want.r-hR)<.03*hR&&want.tgt.distanceTo(hy)<.01;
  closeCard();if(atHome){homeFlip^=1;let t=homeTh(tq,homeFlip);while(t<want.th+1)t+=2*Math.PI;want.th=t;want.tgt.copy(homeTgt(tq,homeFlip));wk()}else{/* v199zzzzzz31：旋轉過時第一下回到離目前視角最近的正側面（左或右），第二下才切到另一側 */const dS=f=>Math.abs(want.th-nearest(want.th,homeTh(tq,f))),d0=dS(0),d1=dS(1);homeFlip=d1<d0-1e-6?1:(d0<d1-1e-6?0:homeFlip);goHome()}};
var ovPx=0;function ovCalc(){const a=document.querySelector('aside'),s=stage.getBoundingClientRect(),r=a.getBoundingClientRect();ovPx=(matchMedia('(max-width:760px)').matches&&r.top<s.bottom)?s.bottom-r.top:0}
/* v199zzzzzz115：3D 畫布鋪滿整頁（使用者 2026-11-19）。#stage 仍是「看得到的 3D 區」（取景、浮層座標、拖曳換算都以它為準）；
   畫布本身從 #stage 左上角延伸到 main 右下角，壓在右側欄（桌機）／底部卡片（行動版）底下，卡片改半透明浮在 3D 上。
   投影用 setViewOffset：虛擬畫面＝#stage（w×h），實際繪製＝整張畫布（CVW×CVH），所以 NDC 對應整張畫布，浮層換算像素時用 CVW／CVH。
   好處：拖曳側欄或底部卡片只改 #stage 大小（鏡頭長寬比），畫布繪圖緩衝不重配；只有視窗尺寸或像素比變了才 setSize。 */
var CVW=0,CVH=0,CVPR=0;function sizeCanvas(force){const m=stage.closest('main')||document.body,s=stage.getBoundingClientRect(),r=m.getBoundingClientRect(),
  w=Math.max(1,Math.round(Math.max(r.right,s.right)-s.left)),h=Math.max(1,Math.round(Math.max(r.bottom,s.bottom)-s.top)),pr=PRC();
  if(!force&&w===CVW&&h===CVH&&pr===CVPR)return;CVW=w;CVH=h;CVPR=pr;const el=renderer.domElement;el.style.width=w+'px';el.style.height=h+'px';renderer.setPixelRatio(pr);renderer.setSize(w,h,false);wk()}
new ResizeObserver(()=>{sizeCanvas();wk()}).observe(document.querySelector('main')||document.body);
function resize(){ovCalc();wk();const w=stage.clientWidth,h=stage.clientHeight;sizeCanvas();camera.aspect=w/h;camera.updateProjectionMatrix();{const r=homeR();/* 置中位移每次舞台變動都重算 */if(!sel&&!(window.__scRz&&window.__scRz())){want.r=r;want.tgt.copy(homeTgt(tab==='torque',homeFlip))}}STU.fitSoon()/* v199zzzzzz112：舞台長寬比改變 → 取景（去抖 200 ms） */}/* v87：全車距離與 goHome 一致（原為 fitR，造成載入後第一次按「回到全車」先拉近） */
new ResizeObserver(resize).observe(stage);
/* 有動作才重繪：使用者操作、視窗變動、主題切換後續畫約 2.5 秒；鏡頭、轉場還在動或有選取零件（光圈脈動）時持續畫，其餘靜止不重繪。 */
let wake=240,lastSig=0,lastPulse=0;function wk(n){wake=Math.max(wake,Math.min(n==null?40:n,40))}/* 喚醒 40 幀；滑鼠移動不喚醒（鏡頭移動由簽章偵測） */
['pointerdown','pointerup','wheel','keydown','input','change','click','touchstart'].forEach(e=>window.addEventListener(e,()=>wk(),{passive:true,capture:true}));
/* 操作中（按住拖曳或滾輪）且鏡頭在動時，暫時以像素比 1 繪製；停手後補一幀完整解析 */
let inter=0,wheelT=0,swT=0;window.addEventListener('pointerdown',()=>{inter=1},{capture:true,passive:true});['pointerup','pointercancel'].forEach(e=>window.addEventListener(e,()=>{inter=0},{capture:true,passive:true}));window.addEventListener('wheel',()=>{wheelT=performance.now()+250},{capture:true,passive:true});
function setRes(low){lowRes=low;sizeCanvas()}
window.addEventListener('resize',()=>wk());document.addEventListener('visibilitychange',()=>wk());
/* v199ze（審查 F-08）：WebGL context lost／restored。three 本身會 preventDefault 並在還原後重建 GL 狀態，幾何、貼圖、批次資料表會在下次繪製時重新上傳；但 PMREM 環境光是渲染目標、內容不會自動回來，需重畫。這裡補：中斷時暫停繪製並顯示提示；還原後重畫環境光、全部材質重編、重設像素比與尺寸；6 秒仍未還原則提供重新載入。 */
window.__ctxLost=false;
(function(){const cv=renderer.domElement;let box=null,tm=0;if(getComputedStyle(stage).position==='static')stage.style.position='relative';
  const show=(msg,btn)=>{if(!box){box=document.createElement('div');box.setAttribute('role','status');box.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:14px 18px;border-radius:12px;background:rgba(20,20,20,.78);color:#fff;font:500 14px/1.5 system-ui,sans-serif;text-align:center;z-index:20;max-width:80%';stage.appendChild(box)}
    box.textContent=msg;if(btn){const b=document.createElement('button');b.textContent='重新載入';b.style.cssText='display:block;margin:10px auto 0;padding:6px 14px;border-radius:8px;border:0;font:inherit;cursor:pointer';b.onclick=()=>location.reload();box.appendChild(b)}box.hidden=false};
  cv.addEventListener('webglcontextlost',e=>{e.preventDefault();window.__ctxLost=true;show('3D 暫時中斷，正在恢復…');clearTimeout(tm);tm=setTimeout(()=>{if(window.__ctxLost)show('3D 無法自動恢復，請重新載入頁面。',true)},6000)},false);
  cv.addEventListener('webglcontextrestored',()=>{clearTimeout(tm);try{if(window.__envRebuild)window.__envRebuild();scene.traverse(o=>{const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];ms.forEach(m=>{if(m)m.needsUpdate=true})});sizeCanvas(true)}catch(err){console.warn('WebGL context 還原時重建失敗',err)}window.__ctxLost=false;if(box)box.hidden=true;wk()},false)})();
(function(){const q=matchMedia('(prefers-color-scheme: dark)');if(q.addEventListener)q.addEventListener('change',()=>wk())})();
/* ===== 顯示風格（v89）：風格註冊表＋技術插畫 =====
   技術插畫＝第二遍繪製：只標記要加輪廓的網格（layer 1），用「反向外殼」著色器（背面、純色、裁切空間沿法線外推固定像素）再畫一遍；
   不替每個零件建外殼子物件（尺寸切換會換幾何，會失效）。完整卡通（Toon 材質＋色階）尚未實作，按鈕停用。
   OUT_PX、OUT_INK 為我估的，可調。預設「標準」，不記住選擇（35 §二 只存主題，待決）。 */
const OUT_MOB_W=760,OUT_MOB_MIN=.5,OUT_FLOOR=.595,OUT_PX=1.53,OUT_STK=.85,/* v133：全數 ×0.85（原 .7／1.8／1.0） */OUT_STK_W=700,OUT_R0=2.3,OUT_ZG=.6,OUT_MIN=.55,OUT_MAX=2.2,OUT_INK={dark:0x0a0907,light:0x15120d};
/* 線寬隨縮放：全車視角（鏡頭距離 OUT_R0）＝OUT_PX；拉近變粗、拉遠變細，指數 OUT_ZG，倍率夾在 OUT_MIN～OUT_MAX。以上皆為我估的，可調。 */
const outU={uPx:{value:OUT_PX},uRes:{value:new THREE.Vector2(1,1)}},outV=new THREE.Vector2();var RT0=1e12,RMS=0,SLOW=false,OLskip=false,mvT=0,IPH=/iPhone|iPad/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),DESK=!IPH&&!/Android|Mobi/i.test(navigator.userAgent)&&matchMedia('(pointer:fine)').matches,TIER=IPH?'hi':'mid',probeMs=0,wdN=0;QP.mc='pbrf';/* v199i：iPad 等同 iPhone（含 iPadOS 以 Macintosh 自稱者：MacIntel＋觸控點>1）＝一律 hi、略過探測與慢機判斷（使用者 2026-11-05） *//* v199h：層級 TIER＝lo（慢機）／mid／hi。探測：載入 4.5 秒後連畫 10 幀並以 readPixels 強制同步，取後 8 幀中位數＝真實單幀成本（不受垂直同步限制）：>30 ms→慢機、≤6 ms→hi、其餘 mid；iPhone 一律 hi 並略過探測與慢機判斷（使用者 2026-11-04）。hi 才在「PBR（依層級）」下用 PBR 陽極；執行中單幀 >20 ms 連續約 45 個取樣則 hi→mid（安全網） */
function probeTier(){if(IPH||DESK){TIER='hi';return}/* v199zzzzzz45：桌機強制快機 */if(document.hidden){setTimeout(probeTier,2000);return}if(performance.now()<RT0){setTimeout(probeTier,Math.min(3000,Math.max(200,RT0-performance.now()+200)));return}/* v199zzzzzz43：開場結束前不探測 */
 try{const gl=renderer.getContext(),buf=new Uint8Array(4),a=[];for(let i=0;i<10;i++){const t0=performance.now();OLskip=false;drawFrame();gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,buf);if(i>=2)a.push(performance.now()-t0)}
  a.sort((x,y)=>x-y);probeMs=(a[3]+a[4])/2;TIER=probeMs<=6?'hi':'mid';wk()}catch(e){TIER='mid'}}/* v199zzzzzz48：探測含 readPixels 同步等待（iplay40H 實測 121 ms，實際每張繪製約 6 ms），只用來分 hi／mid，不再判慢機 */
setTimeout(probeTier,4500);/* v199g：慢機層。取樣顯示為畫面張數 <33（單幀 >30 ms）持續約 60 幀後設為 SLOW（只升不降，載入 5 秒內不判）；SLOW 時鏡頭、補間、示意旋轉進行中不畫描邊兩遍，停動後的下一幀補回。實測 iplay40H：插畫 14 fps、標準 38 fps */
/* 兩種外殼：一般網格畫背面、法線朝外；「內外翻轉」的網格（放樣上下管、EX 後叉、曲柄片：頂點順序與法線都朝內）改畫正面、法線取反 */
/* v199zzzzzz114：描邊改用 ShaderMaterial 整段著色器（原為 MeshBasicMaterial＋onBeforeCompile 注入）。instancing／batching 由 three 前綴的 define 與 chunk 處理，與原本相同；顏色 uInk 經 colorspace_fragment 輸出（同 MeshBasicMaterial 的 color）。m.color 指向 uInk，外部 .color.setHex 用法不變 */
const OUT_VS=`uniform float uPx;uniform vec2 uRes;uniform float uSg;
#include <common>
#include <batching_pars_vertex>
void main(){
#include <batching_vertex>
#include <begin_vertex>
#include <project_vertex>
  vec3 nI=normal;
#ifdef USE_INSTANCING
  nI=mat3(instanceMatrix)*normal;
#endif
#ifdef USE_BATCHING
  nI=mat3(batchingMatrix)*nI;
#endif
  vec3 nv=normalize(normalMatrix*nI)*uSg;vec2 nc=(projectionMatrix*vec4(nv,0.0)).xy;float l=length(nc);if(l>1e-5)gl_Position.xy+=nc/l*(2.0*uPx/uRes)*gl_Position.w;
}`,OUT_FS=`uniform vec3 uInk;
void main(){gl_FragColor=vec4(uInk,1.0);
#include <colorspace_fragment>
}`;
const mkOut=(side,sgn)=>{const m=new THREE.ShaderMaterial({uniforms:{uPx:outU.uPx,uRes:outU.uRes,uSg:{value:+sgn},uInk:{value:new THREE.Color(0)}},vertexShader:OUT_VS,fragmentShader:OUT_FS,side,toneMapped:false});m.color=m.uniforms.uInk.value;return m};
const outMat=mkOut(THREE.BackSide,'1.0'),outMatInv=mkOut(THREE.FrontSide,'-1.0');
const invMemo=new WeakMap();/* 幾何 → 是否翻轉（有號體積，以頂點重心為原點，取樣至多約 4000 面；全零（放樣管剛建立）視為未定，下一幀再判） */
function isInverted(g){let v=invMemo.get(g);if(v!==undefined)return v;const p=g.attributes.position,ix=g.index;if(!p)return false;let cx=0,cy=0,cz=0;for(let i=0;i<p.count;i++){cx+=p.getX(i);cy+=p.getY(i);cz+=p.getZ(i)}cx/=p.count;cy/=p.count;cz/=p.count;
  const n=ix?ix.count/3:p.count/3,st=Math.max(1,Math.floor(n/4000));let V=0;for(let t=0;t<n;t+=st){const a=ix?ix.getX(t*3):t*3,b=ix?ix.getX(t*3+1):t*3+1,c=ix?ix.getX(t*3+2):t*3+2;
    const ax=p.getX(a)-cx,ay=p.getY(a)-cy,az=p.getZ(a)-cz,bx=p.getX(b)-cx,by=p.getY(b)-cy,bz=p.getZ(b)-cz,qx=p.getX(c)-cx,qy=p.getY(c)-cy,qz=p.getZ(c)-cz;V+=ax*(by*qz-bz*qy)-ay*(bx*qz-bz*qx)+az*(bx*qy-by*qx)}
  if(Math.abs(V)<1e-15)return false;v=V<0;invMemo.set(g,v);return v}
const outRoots=()=>[...Object.values(T),...Object.values(loft),G.wF,G.wR,G.bar,G.shift,G.stemStd,G.cockpit,G.chainI,...(()=>{try{return[HSu,HSl,HSn]}catch(e){return[]}})(),/* v199zzzzu：碗組（上碗、下碗、碗組蓋）；以 try 包住，避免 HSu 尚未宣告時 TDZ 例外 *//* v199zzzzr：補 Shifter、分離把龍頭（含加購鈦合金龍頭換材質）、一體把 */G.bb,G.cap,G.dropoutL,G.dropoutR,G.exDropL,G.exDropR,G.exTiL,G.exTiR,G.seat,...(G.seatGl?Object.values(G.seatGl):[]),G.cageG,G.cageS,G.rsFork,G.fCal,G.rCal,G.fRotor,G.rRotor,G.hdlF,G.hdlR,G.axF,G.axR,G.rear,G.front,G.rotI,G.rotBI,G.hdlI].filter(o=>o&&o.isObject3D);/* 車架（含 325／EX 的放樣上下管）、前叉、輪組、把手、曲柄；v91 加：座墊與座弓、卡鉗、碟盤、貫通軸與手柄、後端（飛輪片、RD）、前輪端 */
function tagOne(o,on){if(!o.isMesh||o.isBatchedMesh||(o.isInstancedMesh&&!o.userData.outline))return;if(o.userData.btUse){o.layers.set(31);return}const ma=Array.isArray(o.material)?o.material:[o.material],m=ma[0];
  o.layers.set(0);if(on&&!o.userData.noOL&&m&&!m.isMeshBasicMaterial&&!ma.some(x=>x&&x.transparent)&&m.opacity>=.99)o.layers.enable(isInverted(o.geometry)?2:1)}
function tagOutline(on){G.olOn=on;outRoots().forEach(r=>r.traverse(o=>tagOne(o,on)));if(G.btTag)G.btTag(on)}/* 半透明（客製分頁）與純色示意件不加輪廓；layer 1＝一般、layer 2＝翻轉 */

/* ===== v199y：BatchedMesh 批次繪製。把「同材質、同屬性組、靜態幾何、鏡射行列式>0、不透明」的零散網格併成每組 1 個 BatchedMesh（掛 bike 下，每幀依各原網格世界矩陣寫入實例矩陣）。
   原網格留在原位承接所有既有邏輯（visible／材質／位置），批次生效時其 layers 改為 31（相機不繪）；材質、幾何不再相符（換色、updateRim 換幾何、卡通）或 QP.bm 關閉時自動退回原網格。
   不納入：T／loft 變形管件、輪組（胎紋與輪框會就地改動）、半透明、renderOrder≠0、人字陣列材質、實例化網格。輪廓：僅當成員皆在 outRoots 內才加輪廓。 */
G.BT={groups:[],built:false,rb:0};
G.btBuild=()=>{const B=G.BT;B.groups.forEach(g=>{bike.remove(g.bm);g.bm.dispose();g.items.forEach(it=>{it.o.userData.bt=false;if(it.o.userData.btUse){it.o.userData.btUse=false;if(it.ol)tagOne(it.o,G.olOn);else it.o.layers.set(0)}})});B.groups=[];
  /* v199za：焊道網格（WELD.items）與任何就地改頂點的網格不得納入——批次複本只在建立時拷貝一次頂點，v199y 起焊道因此在換車型／尺寸後懸空。另以頂點屬性 version 動態偵測：偵測到就地更新者標 noBT、退回原網格 */const skip=new Set([...Object.values(T),...Object.values(loft),G.wR,G.wF,...(()=>{try{return Object.values(WELD.items).map(i=>i.m)}catch(e){return[]}})()].filter(Boolean)),skipTree=new Set();skip.forEach(r=>r.traverse(x=>skipTree.add(x)));
  const outSet=new Set();outRoots().forEach(r=>r.traverse(x=>outSet.add(x)));
  bike.updateMatrixWorld(true);const map=new Map();
  bike.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.isBatchedMesh||skipTree.has(o)||o.userData.noBT||o.userData.loft||o.renderOrder!==0)return;const m=o.material;if(!m||Array.isArray(m)||m.transparent||m.depthWrite===false)return;const g=o.geometry;if(!g||!g.attributes.position)return;
    if(o.matrixWorld.determinant()<=0)return;
    const sig=Object.keys(g.attributes).sort().map(k=>k+g.attributes[k].itemSize+(g.attributes[k].normalized?'n':'')+g.attributes[k].array.constructor.name).join(',')+(g.index?'|ix':'|nx'),ol=outSet.has(o),inv=ol?isInverted(g):false,ko=!!o.userData.keepOpaque,key=m.uuid+'|'+sig+'|'+ol+'|'+inv+'|'+(ko?'k':'-');/* v199zd：keepOpaque 成員另組批次——批次網格須繼承該旗標，否則 partAlpha 會把共用材質（頭碗 HSm 等）設成半透明 */
    (map.get(key)||map.set(key,{m,ol,inv,ko,ix:!!g.index,list:[]}).get(key)).list.push(o)});
  map.forEach(e=>{if(e.list.length<3)return;const geos=[...new Set(e.list.map(o=>o.geometry))];let V=0,I=0;geos.forEach(g=>{V+=g.attributes.position.count;I+=g.index?g.index.count:0});
    const bm=new THREE.BatchedMesh(e.list.length,V,e.ix?I:0,e.m);bm.frustumCulled=false;bm.perObjectFrustumCulled=false;bm.sortObjects=false;bm.userData.keepOpaque=e.ko;const gid=new Map();geos.forEach(g=>gid.set(g,bm.addGeometry(g)));
    const items=e.list.map(o=>{const id=bm.addInstance(gid.get(o.geometry));bm.setVisibleAt(id,false);o.userData.bt=true;return{o,id,geo:o.geometry,ver:o.geometry.attributes.position.version,ol:e.ol,use:false}});bike.add(bm);B.groups.push({bm,mat:e.m,ol:e.ol,inv:e.inv,items})});
  if(G.btTag)G.btTag(G.olOn)};
G.btTag=on=>{G.BT.groups.forEach(g=>{const m=g.mat;g.bm.layers.set(0);if(on&&g.ol&&m&&!m.isMeshBasicMaterial&&m.opacity>=.99)g.bm.layers.enable(g.inv?2:1)})};
G.btSync=()=>{const B=G.BT;if(!B.built){B.built=true;try{G.btBuild()}catch(e){console.warn('BatchedMesh 建立失敗，退回個別繪製',e);B.groups=[]}}if(!B.groups.length)return;bike.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(bike.matrixWorld).invert(),m=new THREE.Matrix4(),vis=o=>{let p=o;while(p&&p!==bike){if(!p.visible)return false;p=p.parent}return p===bike};let miss=0;
  B.groups.forEach(g=>{const tr=g.mat.transparent||g.mat.depthWrite===false;/* v199zd：材質被 partAlpha 改成半透明時整組退回原網格（批次 sortObjects=false，無法正確排序半透明）；回到不透明自動重新生效，不計入 miss、不重建 */g.items.forEach(it=>{const o=it.o;if(o.geometry===it.geo&&o.geometry.attributes.position.version!==it.ver)o.userData.noBT=true;const ok=QP.bm&&!tr&&!o.userData.noBT&&o.material===g.mat&&o.geometry===it.geo&&o.matrixWorld.determinant()>0;if(QP.bm&&!ok&&!tr)miss++;
    if(ok!==it.use){it.use=ok;o.userData.btUse=ok;if(ok)o.layers.set(31);else if(it.ol)tagOne(o,G.olOn);else o.layers.set(0)}
    if(ok&&vis(o)){m.multiplyMatrices(inv,o.matrixWorld);g.bm.setMatrixAt(it.id,m);g.bm.setVisibleAt(it.id,true)}else g.bm.setVisibleAt(it.id,false)})});
  if(miss>0&&B.rb<3){B.rb++;G.btBuild()}};
/* ===== 完整卡通（v92）：把標準／物理材質換成 MeshToonMaterial（三級色階），再加外輪廓 =====
   原材質存在 mesh.userData.origMat，卡通材質副本以 WeakMap 對應；顏色、貼圖、透明狀態每幀由原材質同步（partAlpha 以原材質為準）。
   做法依評估稿 §3.3；環境反射無（Toon 不吃環境圖）；半球光地面色改成與天空色相同，避免平滑漸層破壞色塊。
   TOON_BANDS（三級亮度）、TOON_TM（色調映射：0＝關、保留 ACES 則填 THREE.ACESFilmicToneMapping）為我估的，待你看畫面調。 */
var toonCache=new WeakMap(),toonPairs=[],gradTex=null,hemiL=null,tm0=null;
const TOON_BANDS=[.12,.45,.85],TOON_TM=THREE.ACESFilmicToneMapping,TOON_HEMI=.35;/* TOON_HEMI＝卡通時半球光強度倍率 */
function toonOf(m){let t=toonCache.get(m);if(!t){if(!gradTex){const c=document.createElement('canvas');c.width=3;c.height=1;const g=c.getContext('2d');TOON_BANDS.forEach((v,i)=>{const k=Math.round(v*255);g.fillStyle='rgb('+k+','+k+','+k+')';g.fillRect(i,0,1,1)});gradTex=new THREE.CanvasTexture(c);gradTex.magFilter=gradTex.minFilter=THREE.NearestFilter;gradTex.generateMipmaps=false}
  t=new THREE.MeshToonMaterial({color:m.color.clone(),map:m.map||null,gradientMap:gradTex,side:m.side,transparent:m.transparent,opacity:m.opacity,depthWrite:m.depthWrite});if(m.emissive)t.emissive.copy(m.emissive);t.userData=m.userData;toonCache.set(m,t)}return t}
function toonPass(on){toonPairs.length=0;scene.traverse(o=>{if(!o.isMesh)return;const u=o.userData;
  if(!on){if(u.origMat){o.material=u.origMat;delete u.origMat}return}
  const cur=o.material,arr=Array.isArray(cur),isT=x=>x&&x.isMeshToonMaterial;
  if(!(u.origMat&&(arr?cur.every(isT):isT(cur)))){if(!(arr?cur:[cur]).every(x=>x&&x.isMeshStandardMaterial))return;u.origMat=cur}/* 只換標準／物理材質；純色示意件（Basic）不動 */
  const orig=u.origMat,os=Array.isArray(orig)?orig:[orig],ts=os.map(m=>{const t=toonOf(m);toonPairs.push([m,t]);return t});o.material=Array.isArray(orig)?ts:ts[0]})}
function toonSync(){toonPairs.forEach(([m,t])=>{t.color.copy(m.color);if(m.emissive)t.emissive.copy(m.emissive);const mp=m.map||null;if(t.map!==mp){t.map=mp;t.needsUpdate=true}if(t.side!==m.side){t.side=m.side;t.needsUpdate=true}
  if(t.transparent!==m.transparent||t.opacity!==m.opacity||t.depthWrite!==m.depthWrite){t.transparent=m.transparent;t.opacity=m.opacity;t.depthWrite=m.depthWrite;t.needsUpdate=true}})}
function toonEnter(){hemiL=scene.children.find(o=>o.isHemisphereLight);if(hemiL){hemiL.userData.g0=hemiL.groundColor.clone();hemiL.userData.i0=hemiL.intensity;hemiL.groundColor.copy(hemiL.color);hemiL.intensity*=TOON_HEMI}tm0=renderer.toneMapping;renderer.toneMapping=TOON_TM}
function toonLeave(){toonPass(false);toonPairs.length=0;if(hemiL&&hemiL.userData.g0){hemiL.groundColor.copy(hemiL.userData.g0);hemiL.intensity=hemiL.userData.i0}if(tm0!==null)renderer.toneMapping=tm0}
/* ===== Matcap 陽極風格（v98）：車架管件（材質帶 userData.frame 者：上下管、頭管、座管、後叉、五通、勾爪、EX 各管、座管束環）改用 MeshMatcapMaterial；
   前叉（碳纖）、輪組、把手、曲柄等其餘件維持原材質。Matcap 以視空間法線取色、不吃燈光，故高光固定在螢幕座標（轉動時亮面不跟著環境走，matcap 本質）。
   貼圖：MC_SRC＝null 時用程序貼圖（噴砂霧面、中性灰）；之後要換，把圖檔轉成 data:image/…;base64,… 填入 MC_SRC（正方形，球形 matcap，建議 512×512）。
   MC_TINT 乘在貼圖上：中性灰貼圖可用它試色；換成已上色的貼圖時改回 0xffffff。材質雙面：中空管內壁與法線朝內的放樣管都以 gl_FrontFacing 校正法線。 */
const MC_SRC=null,MC_TINT=0xffffff;
/* v199zzzzzz122：車架 shader 的世界法線 vWN／vWNb 由 mat3(modelMatrix)*objectNormal 改為 normalMatrix 再乘回 viewMatrix（＝modelMatrix 的逆轉置）。縮放的單位旋轉體（中管、頭管）原本法線被長度縮放扭向管軸，325 錐形中管上碎花三向投影選錯平面、圖樣方向與頭管不一致（使用者 2026-11-20）。 */
/* v160：碎花陽極（使用者 2026-11-03 提供遮罩與底色票）。遮罩 _2_碎花.png（2048、紫色 #510b63＋alpha）縮為 768 灰階（白＝碎花色，黑＝底色）內嵌；底色票 #715211＝碎花 1+2 的底（棕）。
   其餘五組暫用單色色號（低電壓為底、高電壓為碎花），待各組底色票。遮罩以世界座標三向投影貼在車架，平鋪邊長 SPL_SZ mm（實際尺寸未提供，預設 160，可選 100／160／260）。 */
const SPL_MASK=VIBE_D.SPL_MASK;
const SPL=[['碎花 1+2（15 V 底＋20 V）','715211','510b63']].concat([1,2,3,4,5].map(i=>['碎花 '+(i+1)+'+'+(i+2)+'（'+[15,20,30,40,50,60,80][i]+' V 底＋'+[15,20,30,40,50,60,80][i+1]+' V）',['6a4122','510b63','113790','8dacba','d0a808','8c2690','25926f'][i],['6a4122','510b63','113790','8dacba','d0a808','8c2690','25926f'][i+1]]));
var splI=0,splSz=160;
/* v99：陽極漸層（依 2026-10-30 參考照）。顏色沿「頭管頂→五通」軸線分段變化（t=0 頭管、t=1 五通以後；後叉等超出者夾在 1）：藍→紫→暗梅→橄欖銅→卡其→古銅。
   MC_GRAD＝null 則退回單色（MC_TINT）。stops 為 [位置 0–1, 色]；gain 補償 matcap 平均亮度（約 .55）。以上色值為依照片目視估的，可調。 */
const MC_GRAD={gain:1.7,stops:[[0,0x3f64ae],[.18,0x54489e],[.38,0x574a68],[.58,0x6b6048],[.8,0x84765a],[1,0x86693c]]};
/* v109：陽極表面（噴砂消光）細節。全部在 matcap shader 內，零貼圖、無額外繪製。
   grain＝噴砂顆粒（世界座標雜訊擾動法線＋亮度，f＝顆粒頻率 /m，離遠自動淡出避免閃爍）；brush＝拉絲強度（0＝純噴砂；沿管軸方向的條紋，條紋雜訊取世界法線，故沿管軸不變、繞管變化；
   並把高光沿管周拉寬，這是拉絲金屬遠看的主要特徵）；fres＝掠射角強化量；hue＝掠射角色相偏移（rad，陽極薄膜干涉的簡化，隨視角變色）。
   陽極客製規格要求全車噴砂（客製服務表），預設 brush＝0；要示範「拉絲陽極」把 brush 調到 .5–.8。 */
const MC_FIN={grain:.10,gF:1000,brush:0,b1:700,b2:1700,fres:.55,fp:2.6,hue:.55};
/* ===== v147：matcap 進階畫質（使用者 2026-11-02 指示執行 1、2、4、5）=====
   film：角度相依薄膜干涉（陽極色隨視角移動；LUT＝tfLin(d·cosθt)，以法線入射色為基準做逐通道比值，故正視色與色票完全一致；漸層用 ANO_D 兩端膜厚，非 64 車款的漸層為照片取樣、無膜厚，退回舊的色相偏移）。
   an：拉絲各向異性高光（Kajiya–Kay，切線＝管軸），as＝條紋集中度。ao：管件交界的解析式環境遮蔽（四根管件膠囊體，隨尺寸即時更新；不烘焙，因幾何會變形）。
   parts：分材質 matcap——碳纖（前叉、座管）、消光黑陽極（龍頭、把手、曲柄等）、橡膠（外胎）各自一張程序 matcap，只在 matcap 啟用且非 toon 風格時替換，其餘件（鈦、鋼、碟盤、座墊）維持 PBR。 */
const MC_ADV={film:1,an:1,as:55,ao:.4,parts:true};/* v166：薄膜干涉預設 .6→1（使用者 2026-11-03） */
var mcMat=null,mcU=null,mcpActive=false;
var tiU={uTB:{value:0},uTG:{value:1},uTM:{value:0},uTR:{value:.85},uTA:{value:0},uTC:{value:1},uTN:{value:1},uTS:{value:1}};/* v110：鈦原色拉絲／噴砂的 shader 參數（uTB＝拉絲強度，uTG＝噴砂顆粒倍率） */
function mcProcedural(P){P=Object.assign({amb0:.26,ambS:.26,k:.50,f:.16,b:.06,s1a:.26,s1e:9,s2a:.14,s2e:34,rimA:.10,rimB:.12},P||{});const W=256,c=document.createElement('canvas');c.width=c.height=W;const g=c.getContext('2d'),im=g.createImageData(W,W),d=im.data;
  const nz3=(x,y,z)=>{const l=Math.hypot(x,y,z);return[x/l,y/l,z/l]},L1=nz3(-.5,.72,.62),L2=nz3(.75,-.25,.5),L3=nz3(.1,-.9,.4),Hh=nz3(L1[0],L1[1],L1[2]+1);
  const sm=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  const shade=(u,v)=>{const r2=Math.min(1,u*u+v*v),nz=Math.sqrt(1-r2),n=[u,v,nz];const dot=(a)=>n[0]*a[0]+n[1]*a[1]+n[2]*a[2];
    const amb=P.amb0+P.ambS*v;/* 半球環境：上亮下暗 */
    const k=Math.max(0,(dot(L1)+.35)/1.35),f=Math.max(0,(dot(L2)+.2)/1.2),b=Math.max(0,(dot(L3)+.2)/1.2);
    const sp=Math.pow(Math.max(0,dot(Hh)),P.s1e)*P.s1a+Math.pow(Math.max(0,dot(Hh)),P.s2e)*P.s2a;/* 噴砂：寬而柔的高光，無尖銳亮點 */
    const rim=Math.pow(1-nz,2.6)*(P.rimA+P.rimB*Math.max(0,v));/* 邊緣微亮（上緣較多）＝陽極膜的柔和反光 */
    let c=amb+P.k*k+P.f*f+P.b*b+sp+rim;c=c*(.92+.08*sm(0,1,nz));return Math.max(0,Math.min(1,c))};
  for(let y=0;y<W;y++)for(let x=0;x<W;x++){let u=(x+.5)/W*2-1,v=1-(y+.5)/W*2;const r=Math.hypot(u,v);if(r>1){u/=r;v/=r}/* 圓外以邊緣色延伸，避免 mipmap 時黑邊 */
    const k=Math.round(shade(u*.9995,v*.9995)*255),o=(y*W+x)*4;d[o]=k;d[o+1]=k;d[o+2]=k;d[o+3]=255}
  g.putImageData(im,0,0);return c}
function mcMake(){const tex=MC_SRC?new THREE.TextureLoader().load(MC_SRC,()=>wk()):new THREE.CanvasTexture(mcProcedural());
  tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;
  mcMat=new THREE.MeshMatcapMaterial({matcap:tex,color:MC_TINT,side:THREE.DoubleSide});mcMat.toneMapped=false;mcMat.userData.frame=true;
  if(MC_GRAD){const st=MC_GRAD.stops,n=st.length;mcU={uFilm:{value:filmTex()},uFd:{value:new THREE.Vector2(100,100)},uFlm:{value:0},uAn:{value:0},uAs:{value:MC_ADV.as},uAO:{value:MC_ADV.ao},uAOa:{value:[0,1,2,3].map(()=>new THREE.Vector3())},uAOr:{value:[0,0,0,0]},uAOb:{value:[0,1,2,3].map(()=>new THREE.Vector3())},uMt:{value:0},uSat:{value:1},uGl:{value:0},uGs:{value:30},uEs:{value:0},uEx:{value:1},uGr:{value:MC_FIN.grain},uGF:{value:MC_FIN.gF},uBr:{value:MC_FIN.brush},uBC:{value:1},uBN:{value:1},uBS:{value:1},uB1:{value:MC_FIN.b1},uB2:{value:MC_FIN.b2},uFr:{value:MC_FIN.fres},uFp:{value:MC_FIN.fp},uHu:{value:MC_FIN.hue},uP0:{value:new THREE.Vector3()},uAx:{value:new THREE.Vector3()},uG:{value:MC_GRAD.gain},uT:{value:st.map(q=>q[0])},uC:{value:st.map(q=>new THREE.Color(q[1]))},uSpl:{value:0},uSplS:{value:6.25},uSplA:{value:new THREE.Color(0x715211)},uSplB:{value:new THREE.Color(0x510b63)},uSplT:{value:(()=>{const x=new THREE.TextureLoader().load(SPL_MASK,()=>wk());x.wrapS=x.wrapT=1000;x.anisotropy=4;/* 1000＝RepeatWrapping（打包的 three 不一定匯出常數）；預設色彩空間即資料貼圖 */return x})()}};
    mcMat.customProgramCacheKey=()=>'mcg12'+n;
    mcMat.onBeforeCompile=sh=>{Object.assign(sh.uniforms,mcU);
      sh.vertexShader=sh.vertexShader.replace('void main() {','attribute vec3 aBrush;varying vec3 vWP;varying vec3 vWN;varying vec3 vBA;\nvoid main() {').replace('#include <project_vertex>','#include <project_vertex>\n\tvWP=(modelMatrix*vec4(transformed,1.0)).xyz;vWN=normalize((normalMatrix*objectNormal)*mat3(viewMatrix));{vec3 tb=mat3(modelMatrix)*aBrush;float tl=length(tb);vBA=tl>1e-6?tb/tl:vec3(0.0);}');
      sh.fragmentShader=sh.fragmentShader.replace('void main() {','varying vec3 vWP;varying vec3 vWN;varying vec3 vBA;uniform vec3 uP0;uniform vec3 uAx;uniform float uG,uGr,uGF,uBr,uB1,uB2,uFr,uFp,uHu,uMt,uSat,uGl,uGs,uEs,uEx,uBC,uBN,uBS;uniform float uT['+n+'];uniform vec3 uC['+n+'];uniform float uSpl,uSplS;uniform vec3 uSplA,uSplB;uniform sampler2D uSplT;uniform sampler2D uFilm;uniform vec2 uFd;uniform float uFlm,uAn,uAs,uAO;uniform vec3 uAOa[4];uniform float uAOr[4];uniform vec3 uAOb[4];\nfloat h31(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}\nfloat vn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h31(i),h31(i+vec3(1,0,0)),f.x),mix(h31(i+vec3(0,1,0)),h31(i+vec3(1,1,0)),f.x),f.y),mix(mix(h31(i+vec3(0,0,1)),h31(i+vec3(1,0,1)),f.x),mix(h31(i+vec3(0,1,1)),h31(i+vec3(1,1,1)),f.x),f.y),f.z);}\nvec3 hueRot(vec3 c,float a){vec3 k=vec3(.57735);float ca=cos(a),sa=sin(a);return c*ca+cross(k,c)*sa+k*dot(k,c)*(1.-ca);}\n\nvoid main() {')
        .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n\tvec3 wn=normalize(vWN)*(gl_FrontFacing?1.0:-1.0);\n\tfloat fG=1.0-smoothstep(.3,.8,length(fwidth(vWP))*uGF);\n\tvec3 pj=(vec3(vn(vWP*uGF),vn(vWP*uGF+17.3),vn(vWP*uGF+41.7))-.5)*2.0*uGr*fG;\n\tfloat al=length(vBA);vec3 Aw=al>.5?vBA/al:vec3(0.0);vec3 Pw=(vWP-Aw*dot(vWP,Aw))*uBS;\n\tvec3 Av=normalize((viewMatrix*vec4(Aw,0.0)).xyz+1e-6);vec3 cr=cross(normal,Av);float cl=length(cr);vec3 cdir=(al>.5&&uBr>0.0&&cl>.001)?cr/cl*smoothstep(.12,.4,cl):vec3(0.0);\n\tfloat fB=1.0-smoothstep(.3,.8,length(fwidth(Pw))*uB2);\n\tfloat bn=(vn(Pw*uB1+3.1)-.5)*2.0*.45+(vn(Pw*uB2)-.5)*2.0*fB;\n\tfloat axp=dot(vWP,Aw)*uBS;bn*=clamp(.35+1.3*vn(Pw*120.0+Aw*axp*6.0),.2,1.4)*uBC;float scr=smoothstep(.74,.9,vn(Pw*900.0+Aw*axp*9.0+9.0));bn+=uBN*(scr*(vn(Pw*900.0+5.0)>.5?1.0:-1.0)*.9*fB+((vn(Pw*70.0+Aw*axp*2.0+1.7)-.5)*2.0*.6+(vn(Pw*200.0+Aw*axp*4.0+5.3)-.5)*2.0*.45*(1.0-smoothstep(.3,.7,length(fwidth(Pw))*200.0)))*.5);\n\tnormal=normalize(normal+(viewMatrix*vec4(pj,0.0)).xyz+cdir*bn*uBr*.7);\n\tnormal=normalize(normal-cdir*dot(normal,cdir)*.5*uBr);')
        .replace('vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;','float gt=clamp(dot(vWP-uP0,uAx),0.0,1.0);vec3 gc=uC[0];for(int i=1;i<'+n+';i++){gc=mix(gc,uC[i],smoothstep(uT[i-1],uT[i],gt));}\n\tif(uSpl>.5){vec3 sw=pow(abs(wn),vec3(6.0));sw/=dot(sw,vec3(1.0));vec3 sq=vWP*uSplS;float mk=texture2D(uSplT,sq.yz).r*sw.x+texture2D(uSplT,sq.xz).r*sw.y+texture2D(uSplT,sq.xy).r*sw.z;gc=mix(uSplA,uSplB,smoothstep(.35,.65,mk));}\n\tfloat nv=clamp(dot(normal,normalize(vViewPosition)),0.0,1.0);float fr=pow(1.0-nv,uFp)*uFr;\n\tvec3 flr=vec3(1.0);if(uFlm>0.){float tg=clamp((gt-.002)/.996,0.,1.);float dd=mix(uFd.x,uFd.y,tg);float fu=(clamp((dd-60.)/185.,0.,1.)*95.+.5)/96.;float fv=(clamp(1.0-nv,0.,1.)*23.+.5)/24.;vec3 f0=texture2D(uFilm,vec2(fu,.5/24.)).rgb,f1=texture2D(uFilm,vec2(fu,fv)).rgb;flr=mix(vec3(1.0),clamp((f1+.02)/(f0+.02),.35,2.4),uFlm);}\n\tvec3 base=(uFlm>0.?gc*uG*flr:hueRot(gc*uG,fr*uHu))*(1.0+fr*.3);\n\tfloat fL=1.0-smoothstep(.3,.8,length(fwidth(vWP))*160.0);\n\tfloat gl=1.0+(vn(vWP*uGF*.6+7.0)-.5)*uGr*1.6*fG+(vn(vWP*160.0+3.7)-.5)*uGr*1.3*fL;\n\tvec3 mcc=mix(matcapColor.rgb,vec3(.6),uMt);vec3 colr=mix(vec3(dot(base,vec3(.333))),base,uSat);\n\tfloat sp=pow(max(dot(normal,normalize(vec3(-.35,.55,.75))),0.0),uGs)*uGl+pow(max(dot(normal,normalize(vec3(.6,-.15,.6))),0.0),uGs*.5)*uGl*.25;\n\tfloat aA=0.;if(al>.5&&uAn>0.){vec3 Vv=normalize(vViewPosition);vec3 L1=normalize(vec3(-.35,.55,.75)),L2=normalize(vec3(.6,-.15,.6));vec3 H1=normalize(L1+Vv),H2=normalize(L2+Vv);float t1=dot(Av,H1),t2=dot(Av,H2);aA=(pow(sqrt(max(1.-t1*t1,0.)),uAs)*pow(max(dot(normal,H1),0.),7.)+.25*pow(sqrt(max(1.-t2*t2,0.)),uAs*.6)*pow(max(dot(normal,H2),0.),7.))*uAn*.5;}\n\tfloat aoF=1.0;for(int i=0;i<4;i++){float rq=uAOr[i];if(rq>0.){vec3 A0=uAOa[i],B0=uAOb[i],ba=B0-A0,pa=vWP-A0;float hh=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);vec3 dv=A0+ba*hh-vWP;float dq=max(length(dv),1e-5);float xq=(dq-rq)/rq;float oc=smoothstep(.05,.2,xq)*(1.-smoothstep(.2,1.2,xq))*clamp(dot(wn,dv/dq)*.6+.4,0.,1.);aoF*=1.-uAO*oc;}}\n\tvec3 outgoingLight = (diffuseColor.rgb * colr * mcc * gl * (1.0+bn*.2*uBr) + sp*vec3(1.0,.97,.92) + aA*vec3(1.0,.97,.92)*mix(vec3(1.0),colr*1.6,.5))*aoF;\n\tvec3 Vw=normalize(cameraPosition-vWP);vec3 Rw=reflect(-Vw,wn);vec3 en=(pow(max(dot(Rw,normalize(vec3(-5.,6.5,6.5))),0.),18.*uEx)*vec3(1.,.97,.92)+pow(max(dot(Rw,vec3(0.,1.,0.)),0.),10.*uEx)*.7*vec3(1.)+pow(max(dot(Rw,normalize(vec3(-8.6,2.,2.5))),0.),36.*uEx)*.8*vec3(1.,.96,.9)+pow(max(dot(Rw,normalize(vec3(8.6,2.,2.5))),0.),36.*uEx)*.7*vec3(.93,.99,1.1)+pow(max(dot(Rw,normalize(vec3(0.,1.2,9.2))),0.),14.*uEx)*.35*vec3(1.))*uEs;\n\toutgoingLight += en*mix(vec3(1.0),colr*1.5,.6);')};mcMakeP()}/* 帶車架旗標：客製分頁的半透明處理（partAlpha）因此略過它 */}
/* v199h：陽極 PBR 變體。與 matcap 共用 mcU 與同一份色彩／拉絲／噴砂／AO／薄膜程式（呼叫 matcap 的 onBeforeCompile 取得法線擾動區塊與色彩行），只把「matcap 查表」換成 MeshPhysicalMaterial 的環境反射（scene.environment＝程序 PMREM）＋清漆層；金屬度 1，色彩寫入 diffuseColor 當 F0。經 ACES 色調映射（matcap 不經），亮度以 uPK 對齊。 */
var mcMatM=null,mcMatP=null,mcCur='M';const mcPK={value:.72};/* v199i：PBR 不經 ACES（toneMapped=false）後亮度比 matcap 高，以 .72 對齊 */
function mcMode(){return QP.mc==='mat'?'M':'P'}/* v199zzzzi：陽極一律 PBR（漸層、薄膜干涉皆在 PBR 版 shader 內）；只有面板手動選 Matcap 才用 matcap */
function mcModeSync(){if(!mcMatP)return;const w=mcMode();if(w===mcCur)return;mcPass(false);mcMat=w==='P'?mcMatP:mcMatM;mcCur=w;mcOnPrev=false;wk()}
function mcMakeP(){mcMatM=mcMat;const n=MC_GRAD.stops.length,P=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:.42,clearcoat:.3,clearcoatRoughness:.22,side:THREE.DoubleSide});P.userData.frame=true;P.toneMapped=false;P.customProgramCacheKey=()=>'mcp2'+n;let blk=null;
  P.onBeforeCompile=sh=>{sh.uniforms.uPK=mcPK;mcMatM.onBeforeCompile(sh);
    if(!blk){const st={uniforms:{},vertexShader:'',fragmentShader:'vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;'};mcMatM.onBeforeCompile(st);const L=st.fragmentShader.split('\n\t');
      blk=[L[0],L[1],L[2],L[3],L[4],L[5],L[6],'vec3 colr=mix(vec3(dot(base,vec3(.333))),base,uSat);',L[9],L[10],'diffuseColor.rgb=colr*gl*(1.0+bn*.2*uBr)*uPK;roughnessFactor=clamp(roughnessFactor*(1.0+bn*.15*uBr)-uGl*.1,.12,1.0);'].join('\n\t')}
    sh.fragmentShader=sh.fragmentShader.replace('void main() {','uniform float uPK;\nvoid main() {').replace('#include <clearcoat_normal_fragment_begin>',blk+'\n#include <clearcoat_normal_fragment_begin>').replace('vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;','vec3 outgoingLight = (totalDiffuse + totalSpecular + totalEmissiveRadiance + aA*vec3(1.0,.97,.92)*mix(vec3(1.0),colr*1.6,.5))*aoF;')};
  mcMatP=P;if(mcMode()==='P'){mcMat=P;mcCur='P'}}
function mcPass(on){if(!mcMat)mcMake();if(on&&mcU&&N){const ge=gradEnds(),a=ge[0],b=ge[1],ox=bike.position.x,px=a.x/1000+ox,py=a.y/1000,dx=b.x/1000+ox-px,dy=b.y/1000-py,l2=dx*dx+dy*dy;mcU.uP0.value.set(px,py,0);mcU.uAx.value.set(dx/l2,dy/l2,0)}
  bike.traverse(o=>{if(!o.isMesh)return;const u=o.userData,cur=o.material;if(!cur)return;const arr=Array.isArray(cur),swapped=arr?cur.includes(mcMat):cur===mcMat;
  if(u.origMatMC&&!swapped)delete u.origMatMC;/* 程式在換色期間重設了材質：記錄作廢 */
  if(!on){if(u.origMatMC&&swapped){o.material=u.origMatMC}delete u.origMatMC;return}
  if(swapped)return;const ms=arr?cur:[cur];if(!ms.some(m=>m&&m.userData&&m.userData.frame))return;
  u.origMatMC=cur;o.material=arr?ms.map(m=>m&&m.userData&&m.userData.frame?mcMat:m):mcMat})}
/* ===== 客製服務：幾何客製／塗裝客製（v100） =====
   客製服務分頁下方（3D 之下的面板）分兩個子分頁：幾何客製（原有全部內容）、塗裝客製（目前只有「鈦原色／漸層陽極」）。
   塗裝客製子分頁只在尺寸幾何所選車型為 MASTER 64Ti、MASTER 325Ti、ili ili 325Ti、ili-ili EX 325Ti 時出現（PAINT_OK）。
   漸層陽極＝車架套 matcap 漸層（上方 MC_GRAD）；僅客製服務分頁生效，與顯示風格無關（插畫輪廓可疊加）。 */
const PAINT_OK=['64','325','ili','ex'],PAINT_OPTS=[['ti','鈦原色'],['mono','單色陽極'],['grad','漸層陽極'],['spl','碎花陽極']];var paintSel='ti',cSub='geo',mcOnPrev=false,hsCol='k',fkPat='k';/* v170：座管束・頭碗組顏色：'k'＝黑色（碳纖黑，預設；座管束與上下碗同色，不再與車架同色）、'f'＝隨車架、'ti'＝鈦色、'm0'–'m6'＝單色陽極 */
function paintOk(){return PAINT_OK.indexOf(selM)>=0}
/* v199zzzzzz31：座管束・頭碗組・BB 杯與鈦螺絲小件顏色可套用的車款：四款可塗裝車款＋AUDAX 325Ti＋ili ili SS-2205（使用者 2026-11-13；兩款車架本身不承接塗裝，這些為加購零組件） */
function hsOk(){return paintOk()||selM==='audax'||selM==='ss'}
/* v199zzzzzz31：AUDAX／SS-2205 車架維持不可塗裝（AUDAX 不加工、SS-2205 拉絲），座管束・頭碗組・BB 杯、螺絲小件為加購零組件，可選色；『隨車架顏色』只對可塗裝車款有意義，其餘車款有效值退回黑色 */
function hsEff(){return hsOk()?((hsCol==='f'&&!paintOk())?'k':hsCol):'k'}
/* v114：只拉絲車款（2026-10-30 使用者決定）：ili ili SS-2205＝M3 不鏽鋼，AUDAX 325Ti＝鈦合金；兩款不承接陽極與塗裝客製，表面處理固定為拉絲，並加貼「無膜標」貼紙。
   brushOnly()＝這兩款；finOk()＝出現「塗裝客製」子分頁的條件（可塗裝或只拉絲）。貼紙圖樣與位置尚未提供，3D 不畫，只出現在說明與表單輸出（STICKER_TXT）。 */
const BRUSH_ONLY=['audax','ss'],STICKER_TXT='無膜標貼紙';
function brushOnly(){return BRUSH_ONLY.indexOf(selM)>=0}
function finOk(){return paintOk()||brushOnly()}
function mcActive(){return paintOk()&&paintSel!=='ti'}/* v108：三個主分頁同步（尺寸幾何、客製服務、扭力巡檢），只依所選車款與塗裝選項 */
/* v111：表面處理＝標準（不加工）／噴砂／拉絲，三個主分頁同步，僅在可塗裝車款（paintOk）可選；v114 起 AUDAX、SS-2205 固定拉絲（brushOnly），與車架顏色（鈦原色／漸層陽極）任意組合（先全數放開，限制由使用者負面表列再加）。
   拉絲方向＝管件長邊：每個車架網格以頂點 PCA 求主軸，存成頂點屬性 aBrush（物件空間，非主軸網格為 0＝不拉絲）；shader 用世界座標去掉主軸分量後取雜訊，條紋因此沿主軸不變、繞管變化。 */
const FIN_OPTS=[['std','標準（不加工）'],['brush','拉絲'],['blast','噴砂']],FIN_BRUSH=1,FIN_BRUSH_MC=1,BRUSH_RATIO=2.2;var finSel='std';
function finEff(){return paintOk()?finSel:brushOnly()?'brush':'std'}
function finLabel(){return FIN_OPTS.find(o=>o[0]===finEff())[1]}
function brushAxisAttr(g,fr){const P=g&&g.attributes&&g.attributes.position;if(!P||P.isInterleavedBufferAttribute)return;const key=P.version+':'+P.count+(fr?'f':'');if(g.userData.bk===key&&g.attributes.aBrush)return;g.userData.bk=key;
  const n=P.count;let mx=0,my=0,mz=0,i;for(i=0;i<n;i++){mx+=P.getX(i);my+=P.getY(i);mz+=P.getZ(i)}mx/=n;my/=n;mz/=n;
  let xx=0,xy=0,xz=0,yy=0,yz=0,zz=0;for(i=0;i<n;i++){const x=P.getX(i)-mx,y=P.getY(i)-my,z=P.getZ(i)-mz;xx+=x*x;xy+=x*y;xz+=x*z;yy+=y*y;yz+=y*z;zz+=z*z}
  let v=[1,.7,.4],l=1;for(let k=0;k<24;k++){const w=[xx*v[0]+xy*v[1]+xz*v[2],xy*v[0]+yy*v[1]+yz*v[2],xz*v[0]+yz*v[1]+zz*v[2]];l=Math.hypot(w[0],w[1],w[2])||1;v=[w[0]/l,w[1]/l,w[2]/l]}
  const lam=l/n,rest=Math.max(1e-12,((xx+yy+zz)/n-lam)/2);let ok=lam/rest>=BRUSH_RATIO;const arr=new Float32Array(n*3);/* v199zzzzzz25：車架件（帶 frame 旗標）一律拉絲：Lathe／Cylinder 幾何是單位尺寸、靠物件縮放拉長，頂點 PCA 看不出細長（頭管、座管、小圓柱因此從未拉絲），改取其旋轉軸 Y；其餘細長度不足的車架小件取 PCA 最長軸 */ if(fr){ok=true;if(g.type==='LatheGeometry'||g.type==='CylinderGeometry')v=[0,1,0]}
  if(ok)for(i=0;i<n;i++){arr[i*3]=v[0];arr[i*3+1]=v[1];arr[i*3+2]=v[2]}
  g.setAttribute('aBrush',new THREE.BufferAttribute(arr,3))}
function brushEnsure(){bike.traverse(o=>{if(!o.isMesh||!o.material)return;const ms=Array.isArray(o.material)?o.material:[o.material];const fr=ms.some(m=>m&&m.userData&&m.userData.frame);if(fr||ms.some(m=>m&&m.userData&&m.userData.tib))brushAxisAttr(o.geometry,fr)})}
/* v112：三種表面處理在陽極（matcap）上的外觀差異——標準＝光滑陽極：高光銳利、色深飽和；噴砂＝霧面：對比壓平、略去飽和、細顆粒＋中尺度霧狀斑駁，無高光；拉絲＝緞面：高光沿管周拉寬成條紋，色與霧面之間。
   gl＝補一層高光強度，gs＝高光指數，mt＝matcap 對比壓平量，sat＝飽和度倍率，gr＝顆粒量，br＝拉絲量。 */
/* v199zzzzzz23：噴砂時 PBR 陽極（mcMatP）不得有高光；v24 起粗糙度與清漆改由 QV.pr／QV.pcc 控制（預設 .88／0），常數 MC_BLAST_R 刪除 */const FIN_MC={std:{gl:.55,gs:64,mt:0,sat:1.18,gr:0,br:0,es:.5,ex:1.3,an:0},blast:{gl:0,gs:20,mt:.42,sat:.86,gr:.15,br:0,es:.08,ex:.35,an:0},brush:{gl:.32,gs:14,mt:.14,sat:1,gr:0,br:1,es:.3,ex:.6,an:1}};
/* v114：SS-2205＝M3 不鏽鋼，車架材質（userData.tib）底色改偏冷、略亮的銀灰 SS_COL；進出 ss 車款時切換，原色存於 userData.tibC0。 */
const SS_COL=0xC9CED4;var ssPrev=false;
function tibTint(on){const seen=new Set();bike.traverse(o=>{if(!o.isMesh||!o.material)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(!m||seen.has(m)||!(m.userData&&m.userData.tib))return;seen.add(m);if(m.userData.tibC0===undefined)m.userData.tibC0=m.color.getHex();m.color.setHex(on?SS_COL:m.userData.tibC0)})})}
/* v116：拉絲在遠距可辨——新增三層粗條紋 stkB（約 14／7.7／3.8／1.4 mm 週期，70／130／260／700 /m；細層遠處才淡出）直接調變亮度（±36%）、粗糙度（±.2）與法線；鈦原色拉絲粗糙度下限由 .6 降為 .46（原與噴砂 .68 幾乎同為霧面）；matcap 同法加兩層粗條紋、亮度係數 .16→.2。 */
/* v115：拉絲條紋沿管軸方向加入變化——每條紋的對比隨軸向座標低頻起伏（約 30 /m，格長約 33 mm），並疊一層稀疏較深的刮痕（約 45 /m 軸向），讓條紋有長短與斷續；matcap（bn）與鈦原色（bnn）兩處同法。 */
/* v160：鈦原色噴砂外觀。實物（2026-11-03 照片）為暖調深灰褐，原渲染偏亮偏冷（均值 143/139/128 對實物 103/92/83）；噴砂且未上陽極時，車架材質（userData.frame）色改為 TI_BLASTC，離開時還原。 */
const TI_BLASTC=0xC4C4DC;/* v161：改依新照片（鈦戒指噴砂，面均值 RGB 147/146/162、中性偏冷）；渲染均值 144/142/146。v160 的 0x8F7E73 依第一張暖調照片 */var tiBlastOn=false;
function tiBlastLook(on){bike.traverse(o=>{if(!o.isMesh||!o.material)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(!m||!m.userData||!m.userData.frame||!m.color||m===mcMat)return;if(on){if(!m.userData.bC0)m.userData.bC0=m.color.clone();m.color.setHex(TI_BLASTC)}else if(m.userData.bC0){m.color.copy(m.userData.bC0);m.userData.bC0=null}})});tiBlastOn=on}
function finSync(){if(selM!==lastSelM){lastSelM=selM;paintFix();renderPaint()}if((selM==='ss')!==ssPrev){if(tiBlastOn)tiBlastLook(false);ssPrev=selM==='ss';tibTint(ssPrev)}{const wb=false;if(wb!==tiBlastOn)tiBlastLook(wb)}/* v162：噴砂不再改色，色調同標準，只剩 shader 的粗糙度／顆粒差異 */const e=finEff();tiU.uTB.value=e==='brush'?FIN_BRUSH*QV.br:0;tiU.uTC.value=QV.bc;tiU.uTN.value=QV.bn;tiU.uTS.value=1/QV.bs;tiU.uTG.value=e==='blast'?QV.gr:0;tiU.uTM.value=e==='blast'?Math.min(1,QV.mt*5):0;tiU.uTR.value=QV.tr;tiU.uTA.value=e==='brush'?QV.ta:0;/* v199zzzzzz22：鈦原色噴砂不得有高光——霧面量改為 min(1,QV.mt×5)（預設 .2→滿量 1，原只拉 20% 粗糙度）、粗糙度下限 .68→.85；匹配陽極（matcap）噴砂路徑不受影響 */
  if(mcMatP){const bl=e==='blast',cc=bl?QV.pcc:QV.cc;if(mcMatP.clearcoat!==cc){const z=(cc>0)!==(mcMatP.clearcoat>0);mcMatP.clearcoat=cc;if(z)mcMatP.needsUpdate=true}mcMatP.roughness=bl?QV.pr:.42}
  if(mcU){const f=FIN_MC[e];mcU.uBr.value=f.br*FIN_BRUSH_MC*QV.br;mcU.uBC.value=QV.bc;mcU.uBN.value=QV.bn;mcU.uBS.value=1/QV.bs;mcU.uGr.value=f.gr*(mcCur==='P'?QV.pgr:QV.mgr);mcU.uMt.value=f.mt*QV.mmt;mcU.uSat.value=f.sat*QV.sat;mcU.uGl.value=e==='blast'?(mcCur==='P'?0:QV.mgl):f.gl;mcU.uGs.value=f.gs;mcU.uEs.value=f.es*QV.es;mcU.uEx.value=f.ex;mcU.uAn.value=f.an*MC_ADV.an;mcU.uAO.value=MC_ADV.ao;filmSync();aoSync();if(paintSel!=='ti'){const a=anoStops();for(let i=0;i<6;i++){mcU.uT.value[i]=a.t[i];mcU.uC.value[i].setHex(parseInt(a.c[i],16))}}mcU.uSpl.value=(paintSel==='spl')?1:0;if(paintSel==='spl'){const q=SPL[splI];mcU.uSplA.value.setHex(parseInt(q[1],16));mcU.uSplB.value.setHex(parseInt(q[2],16));mcU.uSplS.value=1000/splSz}}if(e==='brush')brushEnsure()}
/* ===== v132：材質粗糙度（使用者 2026-10-30 指示：照建議前兩項，小零件不加）=====
   (1) 分類固定值：dark 消光黑陽極 .5→.62、rotor .38→.44、steel .3→.36、bbc .4→.5、calBase .42→.5；碳纖（clearcoat .8、roughness .4）為亮面對照，不動。
   (2) 低頻粗糙度調變（髒污／磨損感）：只用於大面積零件——曲柄、龍頭、把手、碟盤、卡鉗座等（dark／rotor／calBase 與其 dark 色複製材質、金屬度 .4–.9 的非車架材質）；世界座標 3D 值噪聲兩層（約 30 mm、8 mm），振幅 ±.10。
   小零件因與大零件共用材質而一併套用，但面積小、成本可忽略，未另外分材質。cache key rgh1；未量 GPU。 */
M.rotor.roughness=.44;M.steel.roughness=.36;M.bbc.roughness=.5;M.calBase.roughness=.5;
/* v199zzzzi：全車金屬件粗糙度噪聲 shader（rghPatch）已刪除（使用者 2026-11-12）；rghSweep 只保留材質掃描 */
let rghN=0;function rghSweep(){if(++rghN%90!==1)return;if(typeof MT_OK!=='undefined'&&MT_OK)mtScan()}
/* v147：薄膜干涉 LUT（96 膜厚 × 24 入射角；膜厚 60–245 相對 nm；列 s＝1−cosθ，θt＝asin(sinθ/2.3)，有效膜厚＝d·cosθt；存 sRGB，取樣得線性） */
function filmTex(){const W=96,H=24,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),im=g.createImageData(W,H);
  for(let j=0;j<H;j++){const s=j/(H-1),ca=1-s,sn=Math.sqrt(Math.max(0,1-ca*ca)),ct=Math.sqrt(1-sn*sn/(2.3*2.3));
    for(let i=0;i<W;i++){const d=60+185*i/(W-1),h=lin2hex(tfLin(d*ct)),o=(j*W+i)*4;im.data[o]=parseInt(h.substr(0,2),16);im.data[o+1]=parseInt(h.substr(2,2),16);im.data[o+2]=parseInt(h.substr(4,2),16);im.data[o+3]=255}}
  g.putImageData(im,0,0);const t=new THREE.CanvasTexture(c);t.flipY=false;t.colorSpace=THREE.SRGBColorSpace;t.generateMipmaps=false;t.minFilter=t.magFilter=1006;t.wrapS=t.wrapT=1001;return t}
function filmSync(){let a=0,b=0,on=0;if(paintSel==='mono'){a=b=ANO_D[anoM];on=1}else if(paintSel==='grad'&&paintOk()){a=ANO_D[anoG];b=ANO_D[anoG+1];if(gRev){const t=a;a=b;b=t}on=1}mcU.uFd.value.set(a,b);mcU.uFlm.value=on*MC_ADV.film}
function aoSync(){if(!N)return;const RD=RADS[model]||RADS['64'],ox=bike.position.x,L=[[N.TTst,N.TTht,RD.tt],[N.BB,N.DTht,RD.dt],[N.BB,N.STtop,RD.st],[N.HTb,N.HTt,RD.ht]];
  L.forEach((q,i)=>{mcU.uAOa.value[i].set(q[0].x/1000+ox,q[0].y/1000,0);mcU.uAOr.value[i]=q[2];mcU.uAOb.value[i].set(q[1].x/1000+ox,q[1].y/1000,0)})}
/* v147：分材質 matcap。依原材質屬性分類；matcap 色＝原色×gain（gain 補償 matcap 平均亮度）；透明度、法線貼圖（外胎）逐幀鏡像原材質 */
const MCP={carbon:{p:{amb0:.16,ambS:.14,k:.30,f:.12,b:.05,s1a:.55,s1e:40,s2a:1.0,s2e:180,rimA:.06,rimB:.22},g:7.5},
  dark:{p:{amb0:.24,ambS:.22,k:.42,f:.12,b:.05,s1a:.12,s1e:10,s2a:.06,s2e:30,rimA:.08,rimB:.10},g:4.2},
  rubber:{p:{amb0:.20,ambS:.12,k:.18,f:.06,b:.03,s1a:.05,s1e:6,s2a:0,s2e:20,rimA:.04,rimB:.05},g:4.6}};
const mcpMat=new Map(),mcpTex={};
function mcpCat(m){if(!m||!m.isMeshStandardMaterial||(m.userData&&(m.userData.frame||m.userData.tib||m.userData.cham||m.userData.addonOn)))return null;
  const c=m.color,L=.2126*c.r+.7152*c.g+.0722*c.b;
  if(m.isMeshPhysicalMaterial&&m.clearcoat>.3)return'carbon';
  if(m.metalness<.1&&m.roughness>.8&&L<.06)return'rubber';
  if(m.metalness>=.2&&m.metalness<=.7&&L<.1)return'dark';return null}
function mcpGet(m,cat){let x=mcpMat.get(m);if(x)return x;
  if(!mcpTex[cat]){const t=new THREE.CanvasTexture(mcProcedural(MCP[cat].p));t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;mcpTex[cat]=t}
  x=new THREE.MeshMatcapMaterial({matcap:mcpTex[cat],side:m.side});if(m.normalMap){x.normalMap=m.normalMap;x.normalScale.copy(m.normalScale)}x.toneMapped=false;x.userData.mcp=1;mcpMat.set(m,x);return x}
function mcpSync(x,m,cat){x.color.copy(m.color).multiplyScalar(MCP[cat].g);if(x.transparent!==m.transparent||x.opacity!==m.opacity||x.depthWrite!==m.depthWrite){x.transparent=m.transparent;x.opacity=m.opacity;x.depthWrite=m.depthWrite;x.forceSinglePass=true;x.needsUpdate=true}}
function mcPartsPass(on){bike.traverse(o=>{if(!o.isMesh||!o.material)return;const u=o.userData,cur=o.material;if(Array.isArray(cur))return;
  if(u.origMatMP&&cur===u.mcpX){if(on){mcpSync(cur,u.origMatMP,u.mcpCat);return}o.material=u.origMatMP;delete u.origMatMP;delete u.mcpX;delete u.mcpCat;return}
  if(u.origMatMP){delete u.origMatMP;delete u.mcpX;delete u.mcpCat}
  if(!on)return;const cat=mcpCat(cur);if(!cat)return;const x=mcpGet(cur,cat);mcpSync(x,cur,cat);u.origMatMP=cur;u.mcpX=x;u.mcpCat=cat;o.material=x})}
/* v164：座管束環（T.collar）與頭碗組（上碗、下碗、碗組蓋 HSu／HSl／HSn）共用一個顏色設定 hsCol（塗裝客製選單「座管束・頭碗組顏色」）。
   'f'＝隨車架：座管束環本來就是車架材質（userData.frame）隨車架；頭碗組平常為碳纖黑，車架上陽極（mcActive）時改套車架 matcap（v163 行為）。
   'ti'＝兩者鈦色（不上陽極，PBR 鈦）；'m0'–'m6'＝兩者單色陽極（matcap，色＝ANO_MONO×logo 同款補亮增益）。僅四款可塗裝車款（paintOk）生效。 */
const COLm=T.collar.material,hsTiM=(()=>{const m=M.tiP.clone();m.side=THREE.DoubleSide;m.userData={};return m})(),hsMats=[];
function hsMatK(k){let m=hsMats[k];if(!m){m=new THREE.MeshMatcapMaterial({matcap:logoMc(),side:THREE.DoubleSide});m.toneMapped=false;hsMats[k]=m}
  m.color.setHex(parseInt(ANO_MONO[k][2],16)).multiplyScalar((MC_GRAD?MC_GRAD.gain:1)*logoBr);return m}
function hsApply(on){hsApply0(on);bbApply(on);smApply()}
function hsApply0(on){const c=hsEff(),H=[HSu,HSl,HSn],C=T.collar;
  if(c==='f'){H.forEach(m=>{const want=on?mcMat:hsTiM;if(m.material!==want){m.material=want;delete m.userData.origMatMC}});
    if(C.material!==COLm&&C.material!==mcMat)C.material=COLm;return}
  const mat=c==='k'?HSm:c==='ti'?hsTiM:hsMatK(+c.slice(1));
  H.concat([C]).forEach(m=>{if(m.material!==mat&&m.userData.origMatMP!==mat){m.material=mat;delete m.userData.origMatMC}})}
/* v199m：BB 杯（G.bbCups）併入「座管束・頭碗組顏色」：黑色維持原 BB 杯深色（M.bbc），隨車架／鈦色／單色陽極與座管束、碗組同材質 */
function bbApply(on){const c=hsEff(),mat=c==='k'?M.bbc:c==='f'?(on?mcMat:hsTiM):c==='ti'?hsTiM:hsMatK(+c.slice(1));(G.bbCups||[]).forEach(m=>{if(m.material!==mat&&m.userData.origMatMP!==mat){m.material=mat;delete m.userData.origMatMC}})}
/* v199n：水壺架螺絲（M5×20 鈦螺絲 ti-screw-m5_20.stp；只畫外露的頭 ø8.5×5，桿在管內不畫）。孔位取自使用者 2026-11-05 水壺鎖孔位置圖（M 尺寸，孔距 64 mm，沿管距離由圖量得）：下管、座管孔距 BB 固定；EX 上管孔距頭管端固定；前叉孔距前軸固定（ili 與 SS-2205 前叉兩側各 3，EX 避震前叉不做）。面向：下管上緣與座管前緣（朝三角內側）；EX 下管兩排為上側與下側、上管為頂面；前叉為叉腿前表面（v199o 起頭朝前，前視圖可見；v199n 為側面）。每次節點更新以射線對管面取點，螺絲軸沿管面法線，頭下緣貼管面（陷入 .3 mm）；InstancedMesh 一次繪製，顏色隨「鈦螺絲與金屬小件顏色」。 */
/* v199p：前叉螺絲改回叉腿外側面並依圖上綠點定位（v199o 的前表面作廢）；SS-2205 補車架孔：座管 130.7、194.7（朝三角內側）；下管上緣 249.9、313.9，下緣 60.8、124.7、191.5、361.5、531.2（自 BB 量起；依圖上綠點離管軸 k＝+13／−25 mm 判上下，下緣最後一孔近頭管，待目視）。 */
/* v199o：螺絲網格取自使用者 2026-11-05 附件 ti-screw-m5_20_rounded.stp（M5×20，圓角版）：只取頭（y 0–5 mm，軸線 +y 朝外，原點在頭下緣圓心）、STEP 三角化（偏差 .06 mm）後 1,548 三角形，位置 int16（1/2000 mm）、法線 int8、35° 內平滑 */
var BOLT_P=VIBE_D.BOLT_P,BOLT_N=VIBE_D.BOLT_N;
var NRM4=null;function nrmW(mesh,n){NRM4=NRM4||new THREE.Matrix4();NRM4.copy(mesh.matrixWorld).invert().transpose();return n.clone().transformDirection(NRM4)}/* v199zzzzzz122：物件空間法線→世界（bike 未旋轉、無縮放＝bike 局部），用 matrixWorld 的逆轉置，非均勻縮放下仍垂直表面 */
var BOLT_FK=[[163.5,-9.4],[227.1,-8.3],[290.4,-7.2]];
var BOLT_TB={'64':{dt:[223,287],st:[177.6,241.6]},'325':{dt:[224.1,288.1],st:[149.6,213.6]},'audax':{dt:[219,283],st:[179.6,243.6]},'ili':{dt:[229,293],st:[129.9,193.9],fk:BOLT_FK},'ss':{fk:BOLT_FK,st:[130.7,194.7],dtL:[60.8,124.7,191.5,361.5,531.2],dtU:[249.9,313.9]},'ex':{dtU:[150.1,214.1,278.1,342.1],dtL:[121.9,185.9,249.9,313.9],tt:[114.5,178.5],ttb:[409,473]}};
function boltsUpdate(n,crown){
 if(!G.bolts){const dc=s=>{const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer},pa=new Int16Array(dc(BOLT_P)),na=new Int8Array(dc(BOLT_N)),pf=new Float32Array(pa.length),nf=new Float32Array(na.length);for(let i=0;i<pa.length;i++)pf[i]=pa[i]*5e-7;for(let i=0;i<na.length;i++)nf[i]=na[i]/127;
  const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(pf,3));bg.setAttribute('normal',new THREE.BufferAttribute(nf,3));
  G.bolts=new THREE.InstancedMesh(bg,smCur?smScrMat(smCur):M.tiScr,16);G.bolts.userData.smO=M.tiScr;G.bolts.userData.keepOpaque=true;G.bolts.frustumCulled=false;G.bolts.count=0;bike.add(G.bolts);G.boltRC=new THREE.Raycaster()}
 const tb=BOLT_TB[model]||{},RC=G.boltRC,out=[],mt=new THREE.Matrix4(),q=new THREE.Quaternion(),Y=new V3(0,1,0);
 bike.updateMatrixWorld(true);
 const dtM=LOFTON?loft.DT:T.DT,ttM=LOFTON?loft.TT:T.TT;[dtM,ttM].forEach(m=>{if(m&&m.geometry){m.geometry.computeBoundingSphere();m.geometry.computeBoundingBox()}});
 const hit=(mesh,o,d)=>{RC.set(bike.localToWorld(o.clone()),d);RC.far=.5;const h=RC.intersectObject(mesh,false)[0];if(!h)return null;
  const nm=nrmW(mesh,h.face.normal);if(nm.dot(d)>0)nm.negate();/* v199zzzzzz122：法線改用逆轉置矩陣（nrmW）。T.ST 為縮放的單位旋轉體（scale＝半徑,長度,半徑），325 錐形中管側面法線帶軸向分量，直接乘 matrixWorld 會被長度縮放放大到幾乎沿管軸，中管螺絲因此側看轉了約 90°（使用者 2026-11-20） */return{p:bike.worldToLocal(h.point.clone()),n:nm}};
 const holes=(mesh,a,b,list,sgn)=>{if(!list)return;const u=b.clone().sub(a).normalize(),f=new V3(-u.y,u.x,0);
  if(sgn===0||sgn===9){if((f.y>=0)!==(sgn===0))f.negate()}else f.multiplyScalar(sgn);
  list.forEach(s=>{const c=a.clone().addScaledVector(u,s*.001),h=hit(mesh,c.clone().addScaledVector(f,.15),f.clone().negate());if(h)out.push(h)})};
 holes(dtM,v(n.BB),v(n.DTht),tb.dt,1);holes(dtM,v(n.BB),v(n.DTht),tb.dtU,1);holes(dtM,v(n.BB),v(n.DTht),tb.dtL,-1);
 holes(T.ST,v(n.BB),v(n.STtop),tb.st,-1);holes(ttM,v(n.TTht),v(n.TTst),tb.tt,0);holes(ttM,v(n.TTht),v(n.TTst),tb.ttb,9);
 if(tb.fk&&crown){const E=v(n.FA),dl=crown.clone().sub(E).normalize(),pp=new V3(-dl.y,dl.x,0);
  /* v199p：前叉孔改回叉腿外側面（圖上綠點在叉腿側視圖的中線）。[s,k]＝自前軸沿前軸→叉冠線 s mm、垂直線 k mm（k<0 朝前；叉腿弧形，圖上孔位比直線偏前約 7–9 mm），取自圖上綠點對前軸圓心的位置；射線沿 z 打外側面，軸沿該面法線 */
  /* v199q：孔位垂直方向（k）改取叉腿側視輪廓中線——v199p 直接套圖上量到的 k（−9～−7 mm），但模型叉腿與圖上叉腿外形不同，孔落在模型叉腿前緣（模型中線約 +5～+8 mm）。現於每顆孔的 s 位置沿 pp 方向、自左叉腿外側（z>0）以射線掃出叉腿輪廓兩緣（粗掃 5 mm 再二分 5 次），取中點；掃不到才退回 q[1] */
  const FM=T.FKL;FM.geometry.computeBoundingSphere();
  const inLeg=(c,k)=>{const o=c.clone().addScaledVector(pp,k*.001);o.z=.2;RC.set(bike.localToWorld(o),new V3(0,0,-1));return !!RC.intersectObject(FM,false)[0]};
  const edge=(c,a0,b0)=>{let ia=a0,ob=b0;for(let j=0;j<5;j++){const m=(ia+ob)/2;if(inLeg(c,m))ia=m;else ob=m}return(ia+ob)/2};
  const midK=(c,dflt)=>{let first=null,last=null;for(let k=-45;k<=60;k+=5)if(inLeg(c,k)){if(first===null)first=k;last=k}if(first===null)return dflt;return(edge(c,first,first-5)+edge(c,last,last+5))/2};
  tb.fk.forEach(q=>{const c0=E.clone().addScaledVector(dl,q[0]*.001),kc=midK(c0,q[1]),c=c0.clone().addScaledVector(pp,kc*.001);[1,-1].forEach(sz=>{let h=null;for(const k of [0,.003,-.003,.006,-.006]){const o=c.clone().addScaledVector(pp,k);o.z=sz*.2;h=hit(FM,o,new V3(0,0,-sz));if(h)break}if(h)out.push(h)})})}
 let i=0;out.forEach(h=>{if(i>=16)return;q.setFromUnitVectors(Y,h.n);mt.compose(h.p.clone().addScaledVector(h.n,-.0003),q,new V3(1,1,1));G.bolts.setMatrixAt(i++,mt)});
 G.bolts.count=i;G.bolts.instanceMatrix.needsUpdate=true;G.boltN=i;G.boltWant=((tb.dt||[]).length+(tb.dtU||[]).length+(tb.dtL||[]).length+(tb.st||[]).length+(tb.tt||[]).length+(tb.ttb||[]).length+(tb.fk?tb.fk.length*2:0))}
/* v199m：鈦螺絲與金屬小件顏色 */
const SM_OPTS=[['b','陽極藍','113790'],['o','陽極橘','6a4122'],['g','陽極金','d0a808']],SM_MATS={};
function smScrMat(x){G.smScr=G.smScr||new Map();let y=G.smScr.get(x);if(!y){y=x.clone();y.userData={};G.smScr.set(x,y)}return y}/* v199zc：螺絲專用的陽極色複本，與其他小件分開，才能單獨不透明 */
function smApply(){const c=hsOk()?smCol:'d';let m=null;if(c!=='d'){m=SM_MATS[c];if(!m){const q=SM_OPTS.find(o=>o[0]===c);m=SM_MATS[c]=mat(parseInt(q[2],16),.85,.34);m.side=THREE.DoubleSide;m.userData={}}}smCur=m;
  const set=(o,orig,mx)=>{if(!o)return;if(!o.userData.smO)o.userData.smO=orig||o.material;const mm=mx!==undefined?mx:m;o.material=mm||o.userData.smO};
  const ms=m?smScrMat(m):null;set(G.stemBolt,M.tiScr,ms);set(G.bolts,M.tiScr,ms);[G.hdlR,G.hdlF].forEach(o=>set(o));
  [G.axF,G.axR].forEach(a=>{if(a)a.children.forEach(o=>{o.material=smMat()})});
  if(G.rdHg)set(G.rdHg);(G.rdAx||[]).forEach(o=>set(o));try{dclMats()}catch(e){}wk()}
function smLabel(){const q=SM_OPTS.find(o=>o[0]===smCol);return q?q[1]+'（#'+q[2]+'）｜龍頭螺絲、貫通軸與手柄、RD 吊耳與導輪軸心':'維持現況（鈦、鋼、黑）'}
function smUI(){const el=document.getElementById('smColSw'),h=document.getElementById('smCH');if(!el||!h)return;const ok=hsOk();el.style.display=h.style.display=ok?'':'none';if(!ok)return;
  mkSel(el,'鈦螺絲與金屬小件顏色',[['預設',[['d','維持現況（鈦、鋼、黑）',[]]]],['陽極色',SM_OPTS.map(o=>[o[0],o[1]+'　#'+o[2],[o[2]]])]],smCol,v=>{smCol=v;smApply();renderPaint();wk()})}
function hsLabel(){const c=hsEff();if(c==='k')return'黑色（碳纖黑，座管束、上下碗與 BB 杯同色）';if(c==='f')return'隨車架顏色';if(c==='ti')return'鈦色（不上陽極）';const q=ANO_MONO[+c.slice(1)];return'單色陽極｜'+q[0]+'（'+q[1]+'，#'+q[2]+'）'}
function hsUI(){try{fkPUI()}catch(e){}const el=document.getElementById('hsColSw'),h=document.getElementById('hsCH');if(!el||!h)return;const ok=hsOk();el.style.display=h.style.display=ok?'':'none';if(!ok)return;
  mkSel(el,'座管束・頭碗組顏色',[['預設',[['k','黑色（碳纖黑，預設）',['2a2a2a']]]],...(paintOk()?[['跟隨',[['f','隨車架顏色',[]]]]]:[]),['不上陽極',[['ti','鈦色（不上陽極）',['c8c4b8']]]],['單色陽極',ANO_MONO.map((q,i)=>['m'+i,q[0]+'　'+q[1]+'　#'+q[2],[q[2]]])]],hsCol,v=>{hsCol=v;renderPaint();wk()})}
function mcSync(){mcModeSync();rghSweep();finSync();logoSync();gradOutlineSync();gradSync();const on=mcActive();if(on)mcPass(true);else if(mcOnPrev)mcPass(false);mcOnPrev=on;hsApply(on);
  const pOn=on&&MC_ADV.parts&&!STYLES[curStyle].toon;if(pOn){mcPartsPass(true);mcpActive=true}else if(mcpActive){mcPartsPass(false);mcpActive=false}}
/* ===== v119：陽極色三級（使用者 2026-10-30 提供 MASTER 64Ti 網頁客製塗裝素材）與 Logo 貼附 =====
   單色陽極（level 1）7 款＝ANO_MONO（名稱、色名、hex）；漸層陽極（level 2）6 款＝ANO_GRAD（相鄰兩色，stops 由色樣圖橫向取樣：色 A 保持→過渡→色 B 保持；位置 0–1 沿頭管頂→五通，同 mcPass）。
   碎花陽極（level 3）為貼圖，管件多無 UV，本版未做。色名（棕、深紫…）為我依色樣目視命名，編號沿用檔名。漸層方向（色 A 在頭管端）為暫定，待確認。
   shader 的 stops 陣列固定 6 格（MC_GRAD 長度），單色＝6 格同色；finSync 每幀依 paintSel 寫入 uT／uC。 */
const ANO_MONO=[["單色 1","棕・15 V","6a4122"],["單色 2","深紫・20 V","510b63"],["單色 3","藍・30 V","113790"],["單色 4","淺灰藍・40 V","8dacba"],["單色 5","金黃・50 V","d0a808"],["單色 6","紫紅・60 V","8c2690"],["單色 7","綠・80 V","25926f"]],ANO_GRAD=[["漸層 1-2（15→20 V）",[0,0.288,0.481,0.674,0.867,1],["6a4122","673b29","5e2840","551657","50105f","510b63"]],["漸層 2-3（20→30 V）",[0,0.302,0.446,0.591,0.735,1],["510b63","4a1068","3c1b73","2a2b81","19338c","113790"]],["漸層 3-4（30→40 V）",[0,0.118,0.356,0.593,0.831,1],["113790","194092","39679c","668fa9","86a7b7","8dacba"]],["漸層 4-5（40→50 V）",[0,0.187,0.437,0.687,0.936,1],["8dacba","95aeb2","aeb493","bfb46b","cba51f","d0a808"]],["漸層 5-6（50→60 V）",[0,0.134,0.356,0.579,0.802,1],["d0a808","ca9d15","ba7749","a9566c","983b80","8c2690"]],["漸層 6-7（60→80 V）",[0,0.153,0.373,0.592,0.811,1],["8c2690","832f95","505ca2","238a8d","229178","25926f"]]];var anoM=2,anoG=1;
/* ===== v134：漸層陽極改用薄膜干涉模型 =====
   機制（HonTitan 原文＋〈鈦金屬陽極氧化深度分析〉）：顏色來自 TiO2 透明膜的薄膜干涉，膜厚隨電壓近似線性增加；漸層陽極＝膜厚沿車架連續變化（浸入／升壓梯度），
   所以 A→B 之間經過的是「兩端膜厚之間依序出現的干涉色」，不是兩個 RGB 色的直接混合。
   模型：空氣／TiO2（n＝2.12＋3.6e4/λ²）／鈦（n≈2.5＋3.4i）的垂直入射反射率，D65、CIE 1931 → sRGB。
   七個單色的膜厚 ANO_D（相對值 nm，以色序與色相擬合；不是電壓換算，絕對 nm／V 需試片校準）；單色色樣仍是實色，漸層中間色＝模型曲線，並以兩端實色逐通道校正（端點與色樣完全一致）。
   以七張單色色樣擬合後，模型預測的六組漸層中間色與先前實拍取樣的色相／彩度差約 2–22（Lab a*b*）。 */
const ANO_D=[67,77,85,113,161,194,239];
const TF=(()=>{const L=[],S=[],cx=[],cy=[],cz=[],g=(x,m,a,b)=>Math.exp(-.5*Math.pow((x-m)/(x<m?a:b),2));let mx=0,wy=0;
  for(let l=380;l<=780;l+=5){const t=l*1e-9,s=1/(Math.pow(t,5)*(Math.exp(1.4388e-2/(t*6504))-1));L.push(l);S.push(s);mx=Math.max(mx,s);
    cx.push(1.056*g(l,599.8,37.9,31)+.362*g(l,442,16,26.7)-.065*g(l,501.1,20.4,26.2));cy.push(.821*g(l,568.8,46.9,40.5)+.286*g(l,530.9,16.3,31.1));cz.push(1.217*g(l,437,11.8,36)+.681*g(l,459,26,13.8))}
  S.forEach((s,i)=>{S[i]=s/mx;wy+=S[i]*cy[i]});return{L,S,cx,cy,cz,wy}})();
function tfLin(d){let X=0,Y=0,Z=0;for(let i=0;i<TF.L.length;i++){const l=TF.L[i],nf=2.12+3.6e4/(l*l),nr=2.2+(l-400)*.003,nk=2.9+(l-400)*.0045,
    ar=nf-nr,ai=-nk,br=nf+nr,bi=nk,den=br*br+bi*bi,r12r=(ar*br+ai*bi)/den,r12i=(ai*br-ar*bi)/den,r01=(1-nf)/(1+nf),dl=4*Math.PI*nf*d/l,er=Math.cos(dl),ei=-Math.sin(dl),
    pr=r12r*er-r12i*ei,pi=r12r*ei+r12i*er,nR=r01+pr,nI=pi,dR=1+r01*pr,dI=r01*pi,R=(nR*nR+nI*nI)/(dR*dR+dI*dI),w=R*TF.S[i];X+=w*TF.cx[i];Y+=w*TF.cy[i];Z+=w*TF.cz[i]}
  X/=TF.wy;Y/=TF.wy;Z/=TF.wy;return[3.2406*X-1.5372*Y-.4986*Z,-.9689*X+1.8758*Y+.0415*Z,.0557*X-.204*Y+1.057*Z].map(v=>Math.max(0,Math.min(1,v)))}
function lin2hex(l){return l.map(c=>{c=Math.max(0,Math.min(1,c));return Math.round(255*(c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055)).toString(16).padStart(2,'0')}).join('')}
function hex2lin(h){return[0,2,4].map(i=>{const c=parseInt(h.substr(i,2),16)/255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)})}
ANO_GRAD.forEach((g,k)=>{const sA=hex2lin(ANO_MONO[k][2]),sB=hex2lin(ANO_MONO[k+1][2]),dA=ANO_D[k],dB=ANO_D[k+1],mA=tfLin(dA),mB=tfLin(dB),e=.02;
  g[1]=[0,.2,.4,.6,.8,1];g[2]=[0,.2,.4,.6,.8,1].map(t=>{const m=tfLin(dA+(dB-dA)*t);return lin2hex(m.map((v,c)=>{const ca=(sA[c]+e)/(mA[c]+e),cb=(sB[c]+e)/(mB[c]+e);return(v+e)*(ca+(cb-ca)*t)-e}))})});
function anoStops(){if(paintSel==='mono'){const c=ANO_MONO[anoM][2];return{t:[0,.2,.4,.6,.8,1],c:[c,c,c,c,c,c]}}if(!paintOk()){const st=MC_GRAD.stops;return{t:st.map(q=>q[0]),c:st.map(q=>q[1].toString(16).padStart(6,'0'))}}const g=ANO_GRAD[anoG],c=g[2].slice();if(gRev)c.reverse();return{t:[0,.2,.4,.6,.8,1],c:c}}
function paintLabel(){if(paintSel==='spl'){const q=SPL[splI];return'碎花陽極｜'+q[0]+'（底 #'+q[1]+'＋碎花 #'+q[2]+'；遮罩平鋪 '+splSz+' mm'+(splI?'；底色暫用單色色號':'')+'）'}if(paintSel==='mono')return'單色陽極｜'+ANO_MONO[anoM][0]+'（#'+ANO_MONO[anoM][2]+'）';if(paintSel==='grad'&&!paintOk())return'漸層陽極（藍紫→古銅，示意）';if(paintSel==='grad'){const g=ANO_GRAD[anoG];return'漸層陽極｜'+g[0]+'（A 端 #'+anoStops().c[0]+' → B 端 #'+anoStops().c[5]+(gRev?'；反向':'')+(gCustom?'；軸線已自訂':'')+'）'}return PAINT_OPTS.find(o=>o[0]===paintSel)[1]}
/* v126：自訂下拉（取代原生 select，原生選項無法放色點）：選項前顯示圓點色票——單色 1 點，漸層頭尾 2 點。鍵盤：↑↓ 移動、Enter 選取、Esc 關閉。 */
function selCloseAll(except){document.querySelectorAll('.sellist').forEach(l=>{if(l!==except&&!l.hidden){l.hidden=true;const b=l.previousElementSibling;if(b)b.setAttribute('aria-expanded','false')}})}
document.addEventListener('pointerdown',e=>{if(!e.target.closest||!e.target.closest('.selwrap'))selCloseAll(null)},true);
function mkSel(el,label,groups,val,on){el.innerHTML='';el.style.flexWrap='nowrap';el.style.position='relative';el.classList.add('selwrap');
  const items=[];groups.forEach(g=>g[1].forEach(q=>items.push({g:g[0],v:q[0],t:q[1],d:q[2]||[]})));let cur=val;
  const dots=d=>{const w=document.createElement('span');w.className='dots';d.forEach(c=>{const i=document.createElement('i');i.style.background='#'+c;w.appendChild(i)});return w};
  const btn=document.createElement('button');btn.type='button';btn.className='sel selbtn';btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label',label);
  const list=document.createElement('div');list.className='sellist';list.setAttribute('role','listbox');list.setAttribute('aria-label',label);list.hidden=true;
  const paintBtn=()=>{const it=items.find(x=>x.v===cur)||items[0];btn.innerHTML='';btn.appendChild(dots(it.d));const t=document.createElement('span');t.className='t';t.textContent=it.t;btn.appendChild(t);const ar=document.createElement('span');ar.className='ar';ar.textContent='▾';btn.appendChild(ar)};
  const close=()=>{list.hidden=true;btn.setAttribute('aria-expanded','false')};
  const open=()=>{selCloseAll(list);list.hidden=false;btn.setAttribute('aria-expanded','true');const sel=list.querySelector('[aria-selected=true]')||list.querySelector('.so');if(sel){sel.focus();sel.scrollIntoView({block:'nearest'})}};
  const pick=v=>{cur=v;paintBtn();close();btn.focus();on(v)};
  let lastG=null;items.forEach(it=>{if(it.g!==lastG){lastG=it.g;const h=document.createElement('div');h.className='sg';h.setAttribute('role','presentation');h.textContent=it.g;list.appendChild(h)}
    const o=document.createElement('div');o.className='so';o.tabIndex=-1;o.setAttribute('role','option');o.setAttribute('aria-selected',it.v===cur);o.dataset.v=it.v;o.appendChild(dots(it.d));const t=document.createElement('span');t.textContent=it.t;o.appendChild(t);
    o.onclick=()=>pick(it.v);o.onkeydown=e=>{const all=[...list.querySelectorAll('.so')],k=all.indexOf(o);if(e.key==='ArrowDown'){e.preventDefault();(all[k+1]||all[k]).focus()}else if(e.key==='ArrowUp'){e.preventDefault();(all[k-1]||all[k]).focus()}else if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(it.v)}else if(e.key==='Escape'){e.preventDefault();close();btn.focus()}};list.appendChild(o)});
  btn.onclick=()=>{list.hidden?open():close()};btn.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open()}else if(e.key==='Escape')close()};
  paintBtn();el.appendChild(btn);el.appendChild(list)}
function colorSelect(el){const g=[['原色',[['ti','鈦原色',['c8c4b8']]]],['單色陽極（level 1）',ANO_MONO.map((q,i)=>['m'+i,q[0]+'　'+q[1]+'　#'+q[2],[q[2]]])],['漸層陽極（level 2）',ANO_GRAD.map((q,i)=>['g'+i,q[0]+'　#'+q[2][0]+' → #'+q[2][5],[q[2][0],q[2][5]]])],['碎花陽極（level 3）',SPL.map((q,i)=>['s'+i,q[0]+'　#'+q[1]+' ＋ #'+q[2],[q[1],q[2]]])]];
  mkSel(el,'車架顏色',g,paintSel==='ti'?'ti':paintSel==='mono'?'m'+anoM:paintSel==='spl'?'s'+splI:'g'+anoG,v=>{if(v==='ti')paintSel='ti';else if(v[0]==='m'){paintSel='mono';anoM=+v.slice(1)}else if(v[0]==='s'){paintSel='spl';splI=+v.slice(1)}else{paintSel='grad';anoG=+v.slice(1)}renderPaint();wk()})}
/* Logo 顏色（2026-10-30 使用者決定）：logo 白色只是 masking 示意；實際一定是陽極色其中之一，或反向＝鈦色（logo 處不上陽極，露出鈦原色）。logoCol＝'ti' 或單色索引 0–6。 */
var logoCol='ti',lastSelM=null;const LOGO_TI=0xC8C4B8;
function lcEff(){return logoLinked?(dtCol==='ti'?'ti':(dtCol[0]==='g'||dtCol[0]==='s')?dtCol:+dtCol.slice(1)):logoCol}function logoColHex(){const c=lcEff();return c==='ti'?LOGO_TI:typeof c==='string'?(c[0]==='s'?parseInt(SPL[+c.slice(1)][1],16):parseInt(ANO_GRAD[+c.slice(1)][2][0],16)):parseInt(ANO_MONO[c][2],16)}
function logoColLabel(){const logoCol=lcEff();if(logoCol==='ti')return'鈦色（反向，logo 處不上陽極）';if(typeof logoCol==='string'&&logoCol[0]==='s'){const q=SPL[+logoCol.slice(1)];return q[0]+'（底 #'+q[1]+'＋碎花 #'+q[2]+'；圖樣與車架碎花遮罩同源）'}if(typeof logoCol==='string'){const g=ANO_GRAD[+logoCol.slice(1)],rv=lcRv();return g[0]+'（漸層 #'+(rv?g[2][5]:g[2][0])+' → #'+(rv?g[2][0]:g[2][5])+(rv?'；反向':'')+'）'}return ANO_MONO[logoCol][0]+'（'+ANO_MONO[logoCol][1]+' #'+ANO_MONO[logoCol][2]+'）'}
function logoColSelect(el){mkSel(el,logoLinked?'Logo 顏色（目前連動下管標，調整後改為自選）':'Logo 顏色',[['反向',[['ti','鈦色（反向）',['c8c4b8']]]],['陽極色',ANO_MONO.map((q,i)=>['m'+i,q[0]+'　'+q[1]+'　#'+q[2],[q[2]]])],['漸層陽極（各 Logo 自己的長邊，起點→終點，可反向）',ANO_GRAD.map((q,i)=>['g'+i,q[0]+'　#'+q[2][0]+' → #'+q[2][5],[q[2][0],q[2][5]]])],['碎花陽極（與車架碎花遮罩同圖樣）',SPL.map((q,i)=>['s'+i,q[0],[q[1],q[2]]])]],logoLinked?dtCol:(logoCol==='ti'?'ti':typeof logoCol==='string'?logoCol:'m'+logoCol),v=>{logoCol=v==='ti'?'ti':(v[0]==='g'||v[0]==='s')?v:+v.slice(1);logoLinked=false;renderPaint();wk()})}
function paintFix(){/* v199zzzzzz30：不再於不承接塗裝的車款把單色改成漸層（切到 AUDAX／SS-2205 再切回，顏色被改掉）；車架顏色狀態只由使用者改動 */if(paintOk()){if(finSel==='brush'){if(paintSel!=='ti'){paintSaved=paintSel;paintSel='ti'}}else if(paintSaved){paintSel=paintSaved;paintSaved=null}}}var paintSaved=null;/* v152：陽極選擇在拉絲時強制鈦原色（切回標準或噴砂時還原先前的陽極選擇）；v199zzzzzz30：標準（不加工）也可做陽極（使用者 2026-11-13），僅拉絲不行 */
/* ===== v124：雙色漸層輔助截面（使用者 2026-10-30 要求）=====
   MASTER 64Ti 漸層陽極：3D 上顯示兩個可拖曳綠點 A、B（側視平面 z＝0 內），與垂直於 A→B 軸線的兩個半透明截面；顏色在 A 之前為色 1、B 之後為色 2，A→B 為漸變帶（由色樣圖取樣的 4 點過渡）。
   預設 A、B＝依該漸層色樣在「頭管頂→五通」軸線上的位置（與 v123 外觀相同）；拖曳後存成相對五通中心的座標 gCustom（車架幾何改變時跟著五通走）；「重設位置」回預設。「反向」＝兩端顏色對調（gRev）。
   量測：A、B 相對五通中心的水平／垂直距離、軸線長與角度，以及截面與下管、上管、座管、頭管中心線的交點（沿管軸距離，供製程定位）；同步寫入表單輸出。 */
var gCustom=null,gRev=false,gHelp=true,gradGrp=null;const gDrag={k:null};
function gradEnds(){const H=N.HTt,B=N.BB;if(!paintOk()||paintSel!=='grad')return[H,B];
  if(gCustom)return[{x:B.x+gCustom[0],y:B.y+gCustom[1]},{x:B.x+gCustom[2],y:B.y+gCustom[3]}];
  /* v128：預設頭＝頭管底部（HTb）、尾＝後勾爪軸心（RA），吸附輪廓（使用者 2026-10-30 指定） */const a0={x:N.HTb.x,y:N.HTb.y},b0={x:(N.RA0||N.RA).x,y:(N.RA0||N.RA).y};if(gOut){const sa=gSnap(a0),sb=gSnap(b0);if(Math.hypot(sa.x-sb.x,sa.y-sb.y)>=30)return[sa,sb]}/* v199j：吸附後兩端相距不足 30 mm（輪廓異常）則不吸附，避免漸變帶塌縮成硬邊 */return[a0,b0]}
function gradMeasure(P,n){const out=[];[['下管（距五通中心）',N.BB,N.DTht],['下叉（距五通中心）',N.BB,N.RA0||N.RA],['後上叉（距座管）',N.SSst,N.RA0||N.RA],['上管（距頭管）',N.TTht,N.TTst],['座管（距五通中心）',N.BB,N.STtop],['頭管（距下端）',N.HTb,N.HTt]].forEach(q=>{const dx=q[2].x-q[1].x,dy=q[2].y-q[1].y,den=n[0]*dx+n[1]*dy;if(Math.abs(den)<1e-6)return;const t=(n[0]*(P.x-q[1].x)+n[1]*(P.y-q[1].y))/den;if(t>=0&&t<=1)out.push(q[0]+' '+Math.round(t*Math.hypot(dx,dy))+' mm')});return out}
function gradLines(){if(!N||!paintOk()||paintSel!=='grad')return null;const ge=gradEnds(),B=N.BB,dx=ge[1].x-ge[0].x,dy=ge[1].y-ge[0].y,L=Math.hypot(dx,dy)||1,n=[dx/L,dy/L],st=anoStops(),r=v=>Math.round(v),
  pos=(P)=>'前 '+r(P.x-B.x)+'／上 '+r(P.y-B.y)+' mm（相對五通中心）';
  return[['漸層方向','','A 端色 #'+st.c[0]+' → B 端色 #'+st.c[5]+(gRev?'（已反向）':'')],['漸層起點 A（此處以前為純色）','',pos(ge[0])+'；截面通過 '+(gradMeasure(ge[0],n).join('、')||'車架外')],['漸層終點 B（此處以後為純色）','',pos(ge[1])+'；截面通過 '+(gradMeasure(ge[1],n).join('、')||'車架外')],['漸變帶','','軸線長 '+r(L)+' mm，角度 '+(Math.atan2(dy,dx)*180/Math.PI).toFixed(1)+'°（水平向前為 0°，向上為正）'+(gCustom?'；位置已自訂':'；預設位置')]]}
function gradRows(){const l=gradLines();return l||[]}
function gradInfoUpd(){const i=document.getElementById('gradInfo');if(!i)return;const l=gradLines();i.textContent=l?l.map(x=>x[0].replace(/（.*）/,'')+'：'+x[2]).join('\n'):'';i.style.whiteSpace='pre-line'}
function gradUI(){const c=document.getElementById('gradCtl'),i=document.getElementById('gradInfo');if(!c||!i)return;
  if(paintOk()&&paintSel==='spl'&&!brushOnly()){c.style.display='';i.style.display='none';c.innerHTML='';[['細',100],['中',160],['粗',260]].forEach(([tx,v])=>{const b=document.createElement('button');b.className='chip';b.textContent='碎花'+tx;b.setAttribute('aria-pressed',splSz===v);b.onclick=()=>{splSz=v;gradUI();renderPaint();wk()};c.appendChild(b)});return}
  const on=paintOk()&&paintSel==='grad'&&!brushOnly();c.style.display=on?'':'none';i.style.display='none';/* v125：量測文字前台不顯示（留作圖面標示依據，仍進表單輸出） */if(!on){c.innerHTML='';return}c.innerHTML='';
  const mk=(t,pr,fn)=>{const b=document.createElement('button');b.className='chip';b.textContent=t;if(pr!==null)b.setAttribute('aria-pressed',pr);b.onclick=fn;c.appendChild(b)};
  mk('反向',gRev,()=>{gRev=!gRev;gradUI();gelSync();wk()});/* v120j：反向即時同步色光背景（原本要等下一次 renderPaint 才換） */mk('輔助線',gHelp,()=>{gHelp=!gHelp;gradUI();wk()});mk('重設位置',null,()=>{gCustom=null;gradUI();wk()});gradInfoUpd()}
function gradHelpBuild(){gradGrp=new THREE.Group();scene.add(gradGrp);const u=gradGrp.userData,bg=new THREE.BoxGeometry(1,1,1),dm=new THREE.MeshBasicMaterial({color:0x66ff00,depthTest:false,transparent:true});u.dash=[];
  for(let i=0;i<160;i++){const d=new THREE.Mesh(bg,dm);d.renderOrder=20;d.frustumCulled=false;d.visible=false;gradGrp.add(d);u.dash.push(d)}/* v125：虛線軸線（粗線，由方塊段組成；WebGL 線寬固定 1px）；兩個截面已去除 */
  [0,1].forEach(k=>{const hl=new THREE.Mesh(new THREE.SphereGeometry(1.5,20,14),new THREE.MeshBasicMaterial({color:0x66ff00,depthTest:false,transparent:true,opacity:.9}));hl.renderOrder=21;hl.frustumCulled=false;gradGrp.add(hl);u['hl'+k]=hl;
    const h=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false,transparent:true}));h.renderOrder=22;h.frustumCulled=false;gradGrp.add(h);u['h'+k]=h})}
function gradSync(){const pn=document.querySelector('.panel[data-panel=custom]'),on=paintOk()&&paintSel==='grad'&&gHelp&&cSub==='paint'&&pn&&!pn.hidden&&!brushOnly();
  if(!on){if(gradGrp)gradGrp.visible=false;return}if(!gradGrp)gradHelpBuild();gradGrp.visible=true;gradGrp.position.copy(bike.position);
  const u=gradGrp.userData,ge=gradEnds(),sc=cam.r*.0065,st=anoStops(),dx=ge[1].x-ge[0].x,dy=ge[1].y-ge[0].y,L=Math.hypot(dx,dy)||1,ax=dx/L,ay=dy/L,Lm=L/1000,th=sc*.55,len=sc*2.4,gap=sc*1.5,per=len+gap,n=Math.min(160,Math.max(1,Math.floor((Lm+gap)/per))),off=(Lm-(n*per-gap))/2,ang=Math.atan2(ay,ax);
  [0,1].forEach(k=>{const x=ge[k].x/1000,y=ge[k].y/1000;u['h'+k].position.set(x,y,0);u['hl'+k].position.set(x,y,0);u['h'+k].scale.setScalar(sc);u['hl'+k].scale.setScalar(sc);u['h'+k].material.color.setHex(parseInt(st.c[k*5],16))});
  for(let i=0;i<160;i++){const d=u.dash[i];if(i<n){const c=off+i*per+len/2;d.position.set(ge[0].x/1000+ax*c,ge[0].y/1000+ay*c,0);d.scale.set(len,th,th);d.rotation.z=ang;d.visible=true}else d.visible=false}}
/* ===== v127：輔助線頭尾限制於車架外觀輪廓（使用者 2026-10-30 要求）=====
   輪廓＝車架網格（材質旗標 frame／tib，不含前叉、輪組）投影到側視平面（bike 區域座標 x、y，mm）的外輪廓：把所有三角形填入 1 px／mm 的離屏 canvas，取二值遮罩後做 Moore 邊界追蹤，再以 Douglas–Peucker（1.2 mm）簡化成閉合折線 gOut.pts；
   內三角（前三角、後三角的孔）不算。頭尾拖曳時取折線上最近點；預設位置與車架改變後的自訂位置也會吸附到輪廓。節點變動 120 ms 無變化才重算。 */
var gOut=null,gOutKey='',gOutBuilt='',gOutT=0;
function gSnap(p){const P=gOut.pts,n=P.length;let best=null,bd=1e18;for(let i=0;i<n;i++){const a=P[i],b=P[(i+1)%n],dx=b.x-a.x,dy=b.y-a.y,l2=dx*dx+dy*dy||1;let t=((p.x-a.x)*dx+(p.y-a.y)*dy)/l2;t=Math.max(0,Math.min(1,t));const x=a.x+dx*t,y=a.y+dy*t,d=(p.x-x)*(p.x-x)+(p.y-y)*(p.y-y);if(d<bd){bd=d;best={x:x,y:y}}}return best}
function gTrace(m,W,H){let sx=-1,sy=-1;for(let y=0;y<H&&sx<0;y++)for(let x=0;x<W;x++)if(m[y*W+x]){sx=x;sy=y;break}if(sx<0)return[];
  const D=[[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]],fg=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&m[y*W+x],pts=[[sx,sy]];let cx=sx,cy=sy,bx=sx-1,by=sy,guard=0;
  while(guard++<200000){let bi=0;for(let i=0;i<8;i++)if(cx+D[i][0]===bx&&cy+D[i][1]===by){bi=i;break}let found=-1;
    for(let k=1;k<=8;k++){const j=(bi+k)%8;if(fg(cx+D[j][0],cy+D[j][1])){found=j;break}}if(found<0)break;
    const pj=(found+7)%8;bx=cx+D[pj][0];by=cy+D[pj][1];cx+=D[found][0];cy+=D[found][1];if(cx===sx&&cy===sy)break;pts.push([cx,cy])}return pts}
function gDP(P,eps){const n=P.length;if(n<4)return P;const keep=new Uint8Array(n);keep[0]=keep[n-1]=1;const st=[[0,n-1]];
  while(st.length){const[a,b]=st.pop();let md=0,mi=-1;const ax=P[a][0],ay=P[a][1],dx=P[b][0]-ax,dy=P[b][1]-ay,l=Math.hypot(dx,dy)||1;for(let i=a+1;i<b;i++){const d=Math.abs((P[i][0]-ax)*dy-(P[i][1]-ay)*dx)/l;if(d>md){md=d;mi=i}}if(md>eps&&mi>0){keep[mi]=1;st.push([a,mi],[mi,b])}}
  return P.filter((_,i)=>keep[i])}
function gradOutlineBuild(){bike.updateMatrixWorld(true);const tri=[];let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;const v=new V3();
  bike.traverseVisible(o=>{if(!o.isMesh||!o.geometry)return;const ms=Array.isArray(o.material)?o.material:[o.material];if(!ms.some(q=>q&&q.userData&&(q.userData.frame||q.userData.tib)))return;
    const P=o.geometry.attributes.position;if(!P)return;const n=P.count,xy=new Float32Array(n*2);
    for(let i=0;i<n;i++){v.set(P.getX(i),P.getY(i),P.getZ(i)).applyMatrix4(o.matrixWorld);bike.worldToLocal(v);const x=v.x*1000,y=v.y*1000;xy[2*i]=x;xy[2*i+1]=y;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    tri.push([xy,o.geometry.index])});
  if(!tri.length)return;const pad=6,W=Math.ceil(x1-x0)+2*pad,H=Math.ceil(y1-y0)+2*pad,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d',{willReadFrequently:true});g.fillStyle='#000';g.strokeStyle='#000';g.lineWidth=1;
  const X=x=>x-x0+pad,Y=y=>y1-y+pad;
  tri.forEach(([xy,ix])=>{const cnt=ix?ix.count:xy.length/2;for(let t=0;t+2<cnt;t+=3){const a=ix?ix.getX(t):t,b=ix?ix.getX(t+1):t+1,c=ix?ix.getX(t+2):t+2;g.beginPath();g.moveTo(X(xy[2*a]),Y(xy[2*a+1]));g.lineTo(X(xy[2*b]),Y(xy[2*b+1]));g.lineTo(X(xy[2*c]),Y(xy[2*c+1]));g.closePath();g.fill();g.stroke()}});
  const im=g.getImageData(0,0,W,H).data,m=new Uint8Array(W*H);for(let i=0;i<W*H;i++)m[i]=im[4*i+3]>100?1:0;
  /* v199j：只留面積最大的連通塊（車架本體）。原本從最上列第一個前景像素開始描邊，若剪影最上方有與車架不相連的小塊（如頭碗上蓋），輪廓會變成那一小塊，頭尾都吸附到它身上，漸變帶縮成幾 mm＝硬邊 */
  {const lb=new Int32Array(W*H),stk=[];let bL=0,bN=0,L=0;for(let i=0;i<W*H;i++){if(!m[i]||lb[i])continue;L++;let c=0;stk.length=0;stk.push(i);lb[i]=L;while(stk.length){const q=stk.pop();c++;const x=q%W;if(x>0&&m[q-1]&&!lb[q-1]){lb[q-1]=L;stk.push(q-1)}if(x<W-1&&m[q+1]&&!lb[q+1]){lb[q+1]=L;stk.push(q+1)}if(q>=W&&m[q-W]&&!lb[q-W]){lb[q-W]=L;stk.push(q-W)}if(q+W<W*H&&m[q+W]&&!lb[q+W]){lb[q+W]=L;stk.push(q+W)}}if(c>bN){bN=c;bL=L}}for(let i=0;i<W*H;i++)if(lb[i]!==bL)m[i]=0}
  const tr=gDP(gTrace(m,W,H),1.2);if(tr.length<8)return;gOut={pts:tr.map(p=>({x:p[0]+x0-pad,y:y1+pad-p[1]}))}}
function gradOutlineSync(){if(!paintOk()||paintSel!=='grad'||!N)return;const k=logoKeyNow();if(k!==gOutKey){gOutKey=k;gOutT=performance.now()}
  if(gOutBuilt!==gOutKey){if(performance.now()-gOutT>=120){gradOutlineBuild();gOutBuilt=gOutKey;if(gOut&&gCustom){const B=N.BB,a=gSnap({x:B.x+gCustom[0],y:B.y+gCustom[1]}),b=gSnap({x:B.x+gCustom[2],y:B.y+gCustom[3]});gCustom=[a.x-B.x,a.y-B.y,b.x-B.x,b.y-B.y]}}else wk()}}
function gradPick(e){const r=renderer.domElement.getBoundingClientRect(),ge=gradEnds(),ox=bike.position.x;let best=null,bd=24;[0,1].forEach(k=>{const v=new V3(ge[k].x/1000+ox,ge[k].y/1000,0).project(camera),d=Math.hypot((v.x*.5+.5)*r.width-(e.clientX-r.left),(-v.y*.5+.5)*r.height-(e.clientY-r.top));if(d<bd){bd=d;best=k}});return best}
renderer.domElement.addEventListener('pointerdown',e=>{if(!gradGrp||!gradGrp.visible)return;const k=gradPick(e);if(k===null)return;gDrag.k=k;e.stopPropagation();e.preventDefault();renderer.domElement.setPointerCapture(e.pointerId);wk()});
renderer.domElement.addEventListener('pointermove',e=>{if(gDrag.k===null)return;e.stopPropagation();const r=renderer.domElement.getBoundingClientRect(),rc=new THREE.Raycaster();rc.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1),camera);const O=rc.ray.origin,D=rc.ray.direction;if(Math.abs(D.z)<1e-6)return;const t=-O.z/D.z;if(t<0)return;
  const B=N.BB,ge=gradEnds(),cur=[ge[0].x-B.x,ge[0].y-B.y,ge[1].x-B.x,ge[1].y-B.y],k=gDrag.k;let qx=(O.x+D.x*t-bike.position.x)*1000,qy=(O.y+D.y*t)*1000;if(gOut){const sn=gSnap({x:qx,y:qy});qx=sn.x;qy=sn.y}/* v127：頭尾只能沿車架外觀輪廓（側視剪影）移動 */cur[2*k]=qx-B.x;cur[2*k+1]=qy-B.y;
  if(Math.hypot(cur[2]-cur[0],cur[3]-cur[1])<30)return;gCustom=cur;gradInfoUpd();wk()});
['pointerup','pointercancel'].forEach(t=>renderer.domElement.addEventListener(t,e=>{if(gDrag.k!==null){gDrag.k=null;e.stopPropagation()}}));
/* Logo（MASTER 64Ti 位置圖 2026-10-30）：四個白色透明 PNG，以射線投影貼合實際管面（逐格對管件 raycast，沿視線方向貼上）。
   位置（mm）：下管 logo＝距五通中心 120、沿下管、驅動側；上管車種標＝上管頂面置中、右端距頭管外壁 50；座管爪痕＝座管後側、座管上端往下距上叉接點 20；頭管標＝頭管前側、上下左右置中。
   尺寸（L 沿讀字方向、H 垂直）為依位置圖與管徑比例的暫估，位置圖不是等比例，待使用者提供實際尺寸。僅 MASTER 64Ti，僅陽極（單色／漸層）時顯示，不入車架材質（獨立透明網格，不被 matcap 換材質）。
   節點變動後 120 ms 內無變化才重算（逐格 raycast），期間隱藏。 */
const LOGO_SRC=VIBE_D.LOGO_SRC,LOGO_DEF={dt:{L:360,H:67.8,off:140,R:21},tt:{L:42,H:16.3,gap:50,htR:26},cl:{L:12.4,H:28,gap:40},hd:{L:43.4,H:62}};
const LOGO_HD=VIBE_D.LOGO_HD;
const LOGO_MODELS=VIBE_D.LOGO_MODELS;/* v149：非 64Ti 車款的 logo 槽位。尺寸 mm 為暫估（位置圖推算／同 64Ti 比例）；上管標、頭管標、座管標中心位置同 MASTER 64Ti（LOGO_DEF）。dt：自五通沿下管；or：自五通沿座管。 */
Object.values(LOGO_MODELS).forEach(q=>{q.svg.hd=LOGO_HD});
/* v199zzzzzz113：SVG 點陣化前補上明確 width／height（＝畫布像素）。設計稿多數只有 viewBox、沒有 width／height：桌機 Chrome 依 viewBox 比例縮放，但行動版瀏覽器（Firefox、Safari／WebKit 等）以預設 300×150 繪製再拉伸到畫布，頭管標、前叉標、中管標因此變形。有寫死 width／height 的下管標、上管標不受影響 */
function svgWH(svg,W,H){if(!W||!H){const m=svg.match(/viewBox="([\d.\s-]+)"/);if(!m)return svg;const v=m[1].trim().split(/\s+/).map(Number);W=v[2];H=v[3]}return svg.replace(/<svg\b[^>]*>/,tag=>tag.replace(/\s(width|height)="[^"]*"/g,'').replace(/^<svg/,'<svg width="'+W+'" height="'+H+'" preserveAspectRatio="none"'))}
const SVGT=new Map();function svgTex(svg,PX){const ck=(PX||2048)+'|'+svg;let t=SVGT.get(ck);if(!t){t=svgTex0(svg,PX);SVGT.set(ck,t)}return t}/* v199：依內容去重（頭管標各車款共用同一 SVG），並可指定長邊像素 */
function svgTex0(svg,PX){const vb=svg.match(/viewBox="([\d.\s-]+)"/)[1].trim().split(/\s+/).map(Number),W=vb[2],H=vb[3],sc=Math.min(2048,PX||2048)/Math.max(W,H),c=document.createElement('canvas');c.width=Math.max(16,Math.round(W*sc));c.height=Math.max(16,Math.round(H*sc));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.userData.pend=1;/* v199zzzzzz64：SVG 尚未畫進畫布 */const im=new Image();im.onerror=()=>{delete t.userData.pend};im.onload=()=>{delete t.userData.pend;c.getContext('2d').drawImage(im,0,0,c.width,c.height);t.needsUpdate=true;try{if(renderer.initTexture)renderer.initTexture(t)}catch(e){}wk()};im.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svgWH(svg,c.width,c.height))));return t}

var logoOn=true,logoGrp=null,logoKey='',logoBuilt='',logoT=0;const logoTexC={};
function logoOk(){return(paintOk()||brushOnly())&&(selM==='64'||!!LOGO_MODELS[selM])}
function logoShown(){return logoOk()&&logoOn}
function logoKeyNow(){if(!N)return'';return selM+'|'+hsT()+'|'+rsLift()+'|'+bike.position.x.toFixed(1)+'|'+['BB','HTt','HTb','TTht','TTst','DTht','SSst','STtop'].map(k=>N[k]?N[k].x.toFixed(1)+','+N[k].y.toFixed(1):'-').join(';')}
function logoMc(){if(!mcMat)mcMake();return (mcMatM||mcMat).matcap}
const logoC=new THREE.Color();
const LOGO_PPM=20;/* v199：decal 貼圖密度（px／mm），上限 2048。原固定 2048 長邊：42×16 mm 的上管標也是 2048×790 */
function logoTexM(m,k){const ck=m+':'+k;if(!logoTexC[ck]){const D=LOGO_MODELS[m],d=(k==='dtL'?D.dt:D[k])||{},mm=Math.max(d.L||0,d.H||0,d.Hl||0);logoTexC[ck]=svgTex(D.svg[k],mm?Math.min(2048,Math.max(256,Math.ceil(mm*LOGO_PPM))):2048)}return logoTexC[ck]}
function logoPrewarm(){const q=[];Object.keys(LOGO_MODELS).forEach(m=>Object.keys(LOGO_MODELS[m].svg).forEach(k=>q.push([m,k])));q.sort((a,b)=>(b[0]===selM)-(a[0]===selM));const ric=window.requestIdleCallback||(f=>setTimeout(f,60)),st=()=>{const x=q.shift();if(!x)return;try{logoTexM(x[0],x[1])}catch(e){}ric(st)};ric(st)}
function logoTex(k){if(selM!=='64')return logoTexM(selM,k);if(k==='dt'&&!window.__dtSvg){window.__dtSvg=1;dtSvgInit()}if(!logoTexC[k]){const t=new THREE.TextureLoader().load(LOGO_SRC[k],()=>wk());t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;logoTexC[k]=t}return logoTexC[k]}
/* v199：射線都垂直於 u，故只需測「沿 u 的投影區間含該射線 u 座標」的三角形。三角形依 u 最小值排序，用二分找區間，以 drawRange 交給 three 原本的 raycast（結果與全測相同） */
var LOGO_FAST=true;
function logoAcc(mesh,u){const g=mesh.geometry;if(!g.index||Array.isArray(mesh.material)||(g.groups&&g.groups.length>1))return null;const pos=g.attributes.position,ix=g.index,T=ix.count/3;if(T<64)return null;
  mesh.updateMatrixWorld(true);const mw=mesh.matrixWorld,uw=u.clone().transformDirection(bike.matrixWorld),V=new THREE.Vector3(),sv=new Float32Array(pos.count);
  for(let i=0;i<pos.count;i++){V.fromBufferAttribute(pos,i).applyMatrix4(mw);sv[i]=V.dot(uw)}
  const mn=new Float32Array(T),ord=new Uint32Array(T);let M=0;
  for(let t=0;t<T;t++){const a=sv[ix.getX(3*t)],b=sv[ix.getX(3*t+1)],c=sv[ix.getX(3*t+2)],lo=Math.min(a,b,c),hi=Math.max(a,b,c);mn[t]=lo;ord[t]=t;if(hi-lo>M)M=hi-lo}
  ord.sort((x,y)=>mn[x]-mn[y]);const idx=new Uint32Array(T*3),smn=new Float32Array(T);
  for(let k=0;k<T;k++){const t=ord[k];idx[3*k]=ix.getX(3*t);idx[3*k+1]=ix.getX(3*t+1);idx[3*k+2]=ix.getX(3*t+2);smn[k]=mn[t]}
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',pos);g2.setIndex(new THREE.BufferAttribute(idx,1));g2.boundingSphere=g.boundingSphere;
  const m2=new THREE.Mesh(g2,mesh.material);m2.matrixWorld.copy(mw);return{m2,g2,smn,M:M+1e-5,uw}}
function logoWrap(key,mesh,C,u,up,o,Lm,Hm,R,X){const nx=Math.max(4,Math.ceil(Lm*1000/((X&&X.cx)||5))),ny=Math.max(4,Math.ceil(Hm*1000/((X&&X.cy)||4))),rc=new THREE.Raycaster(),pts=[],dr=o.clone().negate(),ms=Array.isArray(mesh.material)?mesh.material:[mesh.material],sd=ms.map(m=>m.side);rc.far=.5;mesh.geometry.computeBoundingSphere();mesh.geometry.computeBoundingBox();ms.forEach(m=>m.side=THREE.DoubleSide);/* 上管、下管幾何可能是翻轉面，單面材質會被 raycast 剔除 */const acc=LOGO_FAST?logoAcc(mesh,u):null;
  for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){let oo=o,og,dd=dr;const ax=C.clone().addScaledVector(u,(i/nx-.5)*Lm);if(R){const ph=((j/ny-.5)*Hm)/R;oo=o.clone().multiplyScalar(Math.cos(ph)).addScaledVector(up,Math.sin(ph));og=bike.localToWorld(ax.clone().addScaledVector(oo,.12));dd=oo.clone().negate()}else{const p=ax.addScaledVector(up,(j/ny-.5)*Hm);og=bike.localToWorld(p.clone().addScaledVector(o,.2))}/* R＞0：繞管軸弧長貼合（logo 高度＝沿管周弧長，不被管寬裁切） */
    rc.set(og,dd);let h;if(acc){const sc=og.dot(acc.uw),sm=acc.smn;let a=0,b=sm.length,t=sc+1e-5,lo=sc-1e-5-acc.M;while(a<b){const m=a+b>>1;if(sm[m]<=t)a=m+1;else b=m}const hi=a;a=0;b=hi;while(a<b){const m=a+b>>1;if(sm[m]<lo)a=m+1;else b=m}acc.g2.setDrawRange(a*3,(hi-a)*3);h=rc.intersectObject(acc.m2,false)[0]}else h=rc.intersectObject(mesh,false)[0];
    if(h){const n=nrmW(mesh,h.face.normal);if(n.dot(oo)<0)n.negate();/* v199zzzzzz122：同 boltsUpdate，逆轉置法線（325 錐形中管上的貼標原本沿管軸偏移、局部陷入管面） */pts.push(bike.worldToLocal(h.point.clone()).addScaledVector(n,(X&&X.off)||.00035))}else pts.push(null)}
  ms.forEach((m,i)=>m.side=sd[i]);
  const pos=[],uv=[],idx=[],map=new Array(pts.length).fill(-1);
  for(let q=0;q<pts.length;q++)if(pts[q]){map[q]=pos.length/3;pos.push(pts[q].x,pts[q].y,pts[q].z);uv.push((q%(nx+1))/nx,Math.floor(q/(nx+1))/ny)}
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;if(map[a]<0||map[b]<0||map[c]<0||map[d]<0)continue;idx.push(map[a],map[b],map[d],map[a],map[d],map[c])}
  if(!idx.length)return null;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();/* v199j：補平滑頂點法線。原本無 normal 屬性，three 自動改平面著色，反光處顯出每格（約 5×4 mm）的格樣 */
  g.setAttribute('color',new THREE.Float32BufferAttribute(new Float32Array(pos.length).fill(1),3));const m=new THREE.Mesh(g,new THREE.MeshMatcapMaterial({vertexColors:true,matcap:logoMc(),map:logoTex(key),transparent:true,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4,toneMapped:false}));m.renderOrder=5;m.frustumCulled=false;m.userData.cMat=m.material;logoSplPatch(m.material);m.userData.key=key;m.userData.model=selM;m.userData.gd=(Hm>Lm?up:u).clone();const tm=M.ti.clone();tm.map=logoTex(key);tm.transparent=true;tm.depthWrite=false;tm.side=THREE.DoubleSide;tm.polygonOffset=true;tm.polygonOffsetFactor=-4;tm.polygonOffsetUnits=-4;m.userData.tMat=tm;const pm=M.ti.clone();pm.map=logoTex(key);pm.transparent=true;pm.depthWrite=false;pm.side=THREE.DoubleSide;pm.polygonOffset=true;pm.polygonOffsetFactor=-4;pm.polygonOffsetUnits=-4;pm.vertexColors=true;pm.metalness=.5;pm.roughness=.38;m.userData.pMat=pm;/* 鈦架上的陽極色 logo 用鈦材質（PBR，與車架同光照）；陽極車架上用 matcap *//* 鈦色（反向）用車架鈦材質（PBR，與車架同光照）；陽極色用 matcap */return m}
/* v149：非 64Ti 車款的 logo 槽位 */
function logoBuildM(){const D=LOGO_MODELS[selM],D6=LOGO_DEF,P=k=>new V3(N[k].x/1000,N[k].y/1000,0),mm=v=>v/1000,jobs=[];
  /* 下管標：左右各一排，各自由距管頂 beta° 的斜上方平行投影到下管。單排 SVG（325）：左排以 u 反向轉 180°；兩排 SVG（其餘車款）：左排用上排貼圖 dtL。 */
  if(D.dt){const BB=P('BB'),Dn=P('DTht'),u0=Dn.clone().sub(BB).normalize(),n=new V3(-u0.y,u0.x,0),z=new V3(0,0,1),b=(D.dt.beta||38)*Math.PI/180,len=Dn.distanceTo(BB)*1000,at0=(D.dt.f?D.dt.f*len:D.dt.at)+(D.dt.shift||0),at=(D.dt.fit?Math.min(at0,len-35-(D.dt.fitL||D.dt.L)/2):at0)+(D.dt.after||0),C=BB.clone().addScaledVector(u0,mm(at)).addScaledVector(n,mm(D.dt.lat||0)),DM=(typeof LOFTON!=='undefined'&&LOFTON?loft.DT:T.DT);
   [[1,0],[-1,1]].forEach(([sg,li])=>{const o=n.clone().multiplyScalar(Math.cos(b)).addScaledVector(z,sg*Math.sin(b)),u=(D.dt.two||!li)?u0.clone():u0.clone().negate(),up=o.clone().cross(u);if(D.dt.rot){const th=D.dt.rot*Math.PI/180*(u0.x>=0?1:-1);o.applyAxisAngle(z,th);u.applyAxisAngle(z,th);up.applyAxisAngle(z,th)}/* v155：rot＝側視內繞 logo 中心旋轉，正＝上端（頭管端）往車尾轉 */jobs.push(['dt',DM,C.clone(),u,up,o,D.dt.L,(li&&D.dt.Hl)||D.dt.H,0,D.dt.X,(li&&D.dt.two)?'dtL':null,u0.clone()])})}
  /* 上管標、頭管標、座管標（cl）：位置、尺寸、方向全部同 MASTER 64Ti（使用者 2026-11-02 指示） */
  {const u=P('TTht').sub(P('TTst')).normalize(),o=new V3(-u.y,u.x,0),up=o.clone().cross(u);jobs.push(['tt',(typeof LOFTON!=='undefined'&&LOFTON?loft.TT:T.TT),P('TTht').addScaledVector(u,-mm((selM==='ex'&&BOLT_TB.ex.tt)?(BOLT_TB.ex.tt[0]+BOLT_TB.ex.tt[1])/2:(D6.tt.htR+D6.tt.gap+D6.tt.L/2))),u,up,o,D.tt.L,D.tt.H,0])}
  {const BB=P('BB'),a=P('STtop').sub(BB).normalize(),o=new V3(-a.y,a.x,0);if(o.x>0)o.negate();const u=a.clone().cross(o),Jp=BB.clone().addScaledVector(a,P('SSst').sub(BB).dot(a)),stb=(BOLT_TB[selM]||{}).st,Cc=Jp.addScaledVector(a,-mm(D6.cl.gap+D6.cl.H/2+(D.cl.drop||0)));const fr=false;/* v199zzzzzz122：M325 爪痕彩蛋標回到中管正後方、高度同其他車款（使用者 2026-11-20；取代 v113 的前緣水壺孔中點）；文字標（or）改到左側面兩水壺孔中點 *//* v199zzzzzz113：M325 中管標以水壺鎖孔中點定位，鎖孔在座管前緣，標也要貼前緣（原沿用 64Ti 爪痕的後緣投影，被後輪擋住，看起來像「跑掉」） */jobs.push(['cl',T.ST,Cc,fr?u.clone().negate():u,a,fr?o.clone().negate():o,D.cl.L,D.cl.H,0])}/* v199zzzzc：EX 上管標中心＝上管兩個水壺鎖孔（BOLT_TB.ex.tt）中點，自頭管端（TTht）沿上管 146.5 mm（原 htR+gap+L/2＝97 mm；使用者 2026-11-11），其餘車款不變 */
  /* v199zzzt：M325 中管貼圖中心＝中管水壺鎖孔中點（BB 起 181.6 mm；使用者 2026-11-11），其餘車款不變 */
  {const a=P('HTt').sub(P('HTb')).normalize(),o=new V3(a.y,-a.x,0);if(o.x<0)o.negate();const u=a.clone().cross(o);jobs.push(['hd',T.HT,P('HTt').add(P('HTb')).multiplyScalar(.5),u,a,o,D.hd.L,D.hd.H,0])}
  if(D.or){const S=D.side||1,o=new V3(0,0,S),BB=P('BB'),a=P('STtop').sub(BB).normalize(),u=a.clone(),up=o.clone().cross(u);if(up.dot(new V3(-a.y,a.x,0))<0){u.negate();up.negate()}const sb=(BOLT_TB[selM]||{}).st,oat=sb?(sb[0]+sb[1])/2:D.or.at;jobs.push(['or',T.ST,BB.clone().addScaledVector(a,mm(oat)),u,up,o,D.or.L,D.or.H,0,undefined,null,a.clone()])}
  jobs.forEach(j=>{const m=logoWrap(j[0],j[1],j[2],j[3],j[4],j[5],mm(j[6]),mm(j[7]),j[8]||0,j[9]);if(m){if(j[11])m.userData.gd=j[11].clone();if(j[10]){const tx=logoTex(j[10]);[m.userData.cMat,m.userData.tMat,m.userData.pMat].forEach(q=>{if(q){q.map=tx;q.needsUpdate=true}})}logoGrp.add(m)}})}
/* v133：logo 網格快取（鍵＝logoKey，最多 4 組）。切分頁時節點在「客製／尺寸幾何／扭力」間來回變動，原本每次都重做四個 logo 的 raycast（約 100 ms，手機更久）；現在回到已建過的節點組合時直接換回。 */
const logoCache=new Map();
function logoDisp(a){a.forEach(c=>{c.geometry.dispose();c.userData.cMat.dispose();c.userData.tMat.dispose();c.userData.pMat.dispose()})}
function logoAll(f){if(logoGrp)logoGrp.children.forEach(f);logoCache.forEach(a=>a.forEach(f))}
function logoStash(){if(!logoGrp.children.length)return;const a=[...logoGrp.children];a.forEach(c=>logoGrp.remove(c));if(!logoBuilt){logoDisp(a);return}if(logoCache.has(logoBuilt))logoDisp(logoCache.get(logoBuilt));logoCache.delete(logoBuilt);logoCache.set(logoBuilt,a);while(logoCache.size>12){const k=logoCache.keys().next().value;logoDisp(logoCache.get(k));logoCache.delete(k)}}
function logoBuild(){bike.updateMatrixWorld(true);logoStash();const hit=logoCache.get(logoKey);if(hit){logoCache.delete(logoKey);hit.forEach(c=>logoGrp.add(c));return}
  if(selM!=='64'){logoBuildM();return}
  const D=LOGO_DEF,P=k=>new V3(N[k].x/1000,N[k].y/1000,0),mm=v=>v/1000,jobs=[];
  {const BB=P('BB'),u=P('DTht').sub(BB).normalize(),o=new V3(-u.y,u.x,0),up=o.clone().cross(u);jobs.push(['dt',T.DT,BB.clone().addScaledVector(u,mm(D.dt.off+D.dt.L/2)),u,up,o,D.dt.L,D.dt.H,mm(D.dt.R)])}
  {const u=P('TTht').sub(P('TTst')).normalize(),o=new V3(-u.y,u.x,0),up=o.clone().cross(u);jobs.push(['tt',T.TT,P('TTht').addScaledVector(u,-mm(D.tt.htR+D.tt.gap+D.tt.L/2)),u,up,o,D.tt.L,D.tt.H])}
  {const BB=P('BB'),a=P('STtop').sub(BB).normalize(),o=new V3(-a.y,a.x,0);if(o.x>0)o.negate();const u=a.clone().cross(o),Jp=BB.clone().addScaledVector(a,P('SSst').sub(BB).dot(a));jobs.push(['cl',T.ST,Jp.addScaledVector(a,-mm(D.cl.gap+D.cl.H/2)),u,a,o,D.cl.L,D.cl.H])}
  {const a=P('HTt').sub(P('HTb')).normalize(),o=new V3(a.y,-a.x,0);if(o.x<0)o.negate();const u=a.clone().cross(o);jobs.push(['hd',T.HT,P('HTt').add(P('HTb')).multiplyScalar(.5),u,a,o,D.hd.L,D.hd.H])}
  jobs.forEach(j=>{const m=logoWrap(j[0],j[1],j[2],j[3],j[4],j[5],mm(j[6]),mm(j[7]),j[8]);if(m)logoGrp.add(m)})}
/* ===== v129：下管標改用 SVG（RKL_DT_logo.svg，Corel 輸出、單一複合路徑、4 KB；內嵌時填白、尺寸設 4096×772）並加漸層顏色 =====
   SVG 於首次需要時在瀏覽器以 4096×772 點陣化成 CanvasTexture（約為舊 PNG 900 px 的 4.5 倍線性解析度），完成後換掉各材質的 map；載入失敗則沿用 PNG。
   下管標顏色（dtCol）：同其他 Logo／鈦色（反向）／單色 1–7／漸層 1-2…6-7；漸層沿下管標長度（五通側→頭管側），用該漸層色樣的完整曲線（含兩端保持段），以頂點色（逐格）呈現，插值方式同車架 shader（線性色彩空間、逐段 smoothstep）；
   dtRev＝反向。不含動態輔助線。其他三個 logo 仍用 logoCol。 */
const DT_SVG=VIBE_D.DT_SVG;
var dtCol='ti',dtRev=false,lgRev=false,logoLinked=true,logoFinSel=null;/* v199zzzzzz29：標（下管標與其他 logo）的表面處理與車架表面處理連動——標面積小、不做拉絲，且須與車架拉開對比：車架噴砂→標不加工；車架拉絲或不加工→標預設噴砂、可改不加工（使用者 2026-11-13） */function logoFinEff(){if(finEff()==='blast')return'std';return(logoFinSel==='std'||logoFinSel==='blast')?logoFinSel:'blast'}function logoFinOpts(){return finEff()==='blast'?[['std','不加工']]:[['blast','噴砂'],['std','不加工']]}function logoFinLabel(){return logoFinEff()==='blast'?'噴砂':'不加工'}function lcRv(){return logoLinked?dtRev:lgRev}/* v199k：Logo 與下管標各自一顆反向鈕；Logo 連動下管標時跟 dtRev */const _lc=new THREE.Color();
function dtSvgInit(){const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=4096;c.height=772;c.getContext('2d').drawImage(im,0,0,4096,772);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const old=logoTexC.dt;logoTexC.dt=t;
    logoAll(m=>{if(m.userData.key==='dt'&&m.userData.model==='64'){m.userData.cMat.map=t;m.userData.tMat.map=t;m.userData.pMat.map=t;m.userData.cMat.needsUpdate=true;m.userData.tMat.needsUpdate=true;m.userData.pMat.needsUpdate=true}});if(old)old.dispose();wk()}catch(e){}};im.src='data:image/svg+xml;base64,'+btoa(DT_SVG)}
function logoSpec(k){return k==='dt'?dtCol:(logoLinked?dtCol:(logoCol==='ti'?'ti':typeof logoCol==='string'?logoCol:'m'+logoCol))}
function dtColLabel(){if(dtCol==='ti')return'鈦色（反向）';if(dtCol[0]==='s'){const q=SPL[+dtCol.slice(1)];return q[0]+'（底 #'+q[1]+'＋碎花 #'+q[2]+'）'}if(dtCol[0]==='m')return ANO_MONO[+dtCol.slice(1)][0]+'（#'+ANO_MONO[+dtCol.slice(1)][2]+'）';const g=ANO_GRAD[+dtCol.slice(1)];return g[0]+'（五通側 #'+(dtRev?g[2][5]:g[2][0])+' → 頭管側 #'+(dtRev?g[2][0]:g[2][5])+(dtRev?'；反向':'')+'）'}
function dtGradFill(m,gi,rev,gain){const g=ANO_GRAD[gi],pos=g[1],cols=g[2].map(h=>new THREE.Color().setHex(parseInt(h,16))),uv=m.geometry.attributes.uv,ca=m.geometry.attributes.color,c=new THREE.Color();
  const ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  for(let i=0;i<uv.count;i++){let t=uv.getX(i);if(rev)t=1-t;c.copy(cols[0]);for(let j=1;j<6;j++)c.lerp(cols[j],ss(pos[j-1],pos[j],t));ca.setXYZ(i,c.r*gain,c.g*gain,c.b*gain)}ca.needsUpdate=true}
function logoGradFill(m,gi,rev,gain){const u=m.userData,gd=u.gd;if(!gd){dtGradFill(m,gi,rev,gain);return}
  const g=ANO_GRAD[gi],pos=g[1],cols=g[2].map(h=>new THREE.Color().setHex(parseInt(h,16))),P=m.geometry.attributes.position,ca=m.geometry.attributes.color,c=new THREE.Color(),n=P.count;
  if(!u.gmm){let lo=1e9,hi=-1e9;for(let i=0;i<n;i++){const d=P.getX(i)*gd.x+P.getY(i)*gd.y+P.getZ(i)*gd.z;if(d<lo)lo=d;if(d>hi)hi=d}u.gmm=[lo,hi]}
  const lo=u.gmm[0],sp=(u.gmm[1]-lo)||1,ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  for(let i=0;i<n;i++){let t=(P.getX(i)*gd.x+P.getY(i)*gd.y+P.getZ(i)*gd.z-lo)/sp;if(rev)t=1-t;c.copy(cols[0]);for(let j=1;j<6;j++)c.lerp(cols[j],ss(pos[j-1],pos[j],t));ca.setXYZ(i,c.r*gain,c.g*gain,c.b*gain)}ca.needsUpdate=true}/* v152：logo 漸層以頂點在 gd 方向上的位置為參數（gd：下管標＝五通→頭管，上管標＝座管→頭管，頭管標／座管標／產地標＝由下往上）；無輔助線，只有反向 */
var logoBr=1.5;/* 並行對話的實測：decal 用單純 matcap，車架 shader 另有飽和度與高光加成，陽極車架上 logo 需補亮 1.5 倍才與同色車架相當 */
/* v166：logo 的碎花陽極。logo 是貼在車架上的 matcap 貼片（頂點色上色）；碎花改在片段 shader 內以世界座標三向投影取樣車架同一張遮罩（mcU.uSplT，同 uSplS 倍率），
   mix(底色, 碎花色, smoothstep(.35,.65,遮罩))，故圖樣與車架碎花連續一致；底／碎花色已乘 logo 補亮增益。三向權重用螢幕導數求面法線（logo 幾何無法線屬性）。 */
function logoSplPatch(mat){const U={uLSpl:{value:0},uLA:{value:new THREE.Color()},uLB:{value:new THREE.Color()},uLS:{value:6.25},uLT:{value:null}};mat.userData.lsp=U;
  mat.onBeforeCompile=sh=>{if(!U.uLT.value&&mcU)U.uLT.value=mcU.uSplT.value;Object.assign(sh.uniforms,U);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vLWP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vLWP;uniform float uLSpl,uLS;uniform vec3 uLA,uLB;uniform sampler2D uLT;').replace('#include <color_fragment>','#include <color_fragment>\nif(uLSpl>.5){vec3 dn=normalize(cross(dFdx(vLWP),dFdy(vLWP)));vec3 sw=pow(abs(dn),vec3(6.0));sw/=dot(sw,vec3(1.0));vec3 sq=vLWP*uLS;float mk=texture2D(uLT,sq.yz).r*sw.x+texture2D(uLT,sq.xz).r*sw.y+texture2D(uLT,sq.xy).r*sw.z;diffuseColor.rgb=mix(uLA,uLB,smoothstep(.35,.65,mk));}')};
  mat.customProgramCacheKey=()=>'lspl1'}
function logoApplyCols(){const pbr=paintSel==='ti',gain=pbr?1:MC_GRAD.gain*logoBr;logoGrp.children.forEach(m=>{const u=m.userData,sp=logoSpec(u.key),ca=m.geometry.attributes.color;if(brushOnly()){m.material=u.tMat;m.material.color.setHex(selM==='audax'?0xa1a389:0xa07248);return}
  if(sp==='ti'){m.material=u.tMat;m.material.color.setHex(pbr?0x8f8b80:LOGO_TI);return}
  const isS=sp[0]==='s';m.material=(pbr&&!isS)?u.pMat:u.cMat;const LS=u.cMat.userData.lsp;if(LS)LS.uLSpl.value=isS?1:0;
  if(isS){const q=SPL[+sp.slice(1)],g2=(MC_GRAD?MC_GRAD.gain:1)*logoBr;m.material.color.setRGB(1,1,1);LS.uLA.value.setHex(parseInt(q[1],16)).multiplyScalar(g2);LS.uLB.value.setHex(parseInt(q[2],16)).multiplyScalar(g2);LS.uLS.value=1000/splSz;if(u.vg!=='w'){ca.array.fill(1);ca.needsUpdate=true;u.vg='w'}}
  else if(sp[0]==='g'){m.material.color.setRGB(1,1,1);const rv=(u.key==='dt'||logoLinked)?dtRev:lgRev,sig=sp+(rv?'r':'')+(pbr?'p':'');if(u.vg!==sig){logoGradFill(m,+sp.slice(1),rv,gain);u.vg=sig}}
  else{_lc.setHex(parseInt(ANO_MONO[+sp.slice(1)][2],16)).multiplyScalar(gain);m.material.color.copy(_lc);if(u.vg!=='w'){ca.array.fill(1);ca.needsUpdate=true;u.vg='w'}}});{const LFR=logoFinEff()==='blast'?.85:.3;if(!brushOnly())logoGrp.children.forEach(m=>{const x=m.material;if(x&&x.roughness!==undefined)x.roughness=LFR})}}
function dtColSelect(el){const g=[['反向',[['ti','鈦色（反向）',['c8c4b8']]]],['單色陽極',ANO_MONO.map((q,i)=>['m'+i,q[0]+'　'+q[1]+'　#'+q[2],[q[2]]])],['漸層陽極（沿下管標，五通側→頭管側）',ANO_GRAD.map((q,i)=>['g'+i,q[0]+'　#'+q[2][0]+' → #'+q[2][5],[q[2][0],q[2][5]]])],['碎花陽極（與車架碎花遮罩同圖樣）',SPL.map((q,i)=>['s'+i,q[0],[q[1],q[2]]])]];
  mkSel(el,'下管標顏色',g,dtCol,v=>{dtCol=v;renderPaint();wk()})}
function logoSync(){if(!logoShown()){if(logoGrp)logoGrp.visible=false;return}
  if(!logoGrp){logoGrp=new THREE.Group();scene.add(logoGrp)}
  logoGrp.position.copy(bike.position);const k=logoKeyNow();if(!k)return;if(k!==logoKey){logoT=(logoNow||logoKey.split('|')[0]!==k.split('|')[0])?0:performance.now();logoNow=false;logoKey=k}/* v199：換車款時不防抖，同一幀建好 */
  if(logoBuilt!==logoKey){if(performance.now()-logoT>=32){logoBuild();logoBuilt=logoKey}else wk()}
  logoApplyCols();/* 鈦架＋鈦色 logo 實際無色差，3D 以略深的鈦灰示意位置 */
  logoGrp.visible=logoBuilt===logoKey}
/* v120f：色光背景——可塗裝車款選漸層陽極即自動套用（色 1、色 2＝該漸層兩端色，含「反向」），塗裝客製有開關可關；明亮主題時自動切暗色（不寫入偏好），關閉時切回 */
var gelUser=true,gelAuto=false;
const gelOk=()=>(paintSel==='grad'||paintSel==='spl')&&paintOk();/* v120j：碎花陽極比照漸層 */
function gelActive(){return gelOk()&&gelUser}
function gelSync(){const ok=gelOk(),on=ok&&gelUser,sw=document.getElementById('gelSw');if(sw)sw.hidden=!ok;
  if(on&&!isDark()){gelAuto=true;setTheme('dark',true)}else if(!on&&gelAuto){gelAuto=false;if(isDark())setTheme('light',true)}
  let a,b;if(paintSel==='spl'){const q=SPL[splI]||SPL[0];a=q[1];b=q[2]}else{const g=ANO_GRAD[anoG]||ANO_GRAD[0],s=g[2];a=s[0];b=s[s.length-1];if(gRev){const x=a;a=b;b=x}}STU.gel(on,a,b)}/* v120j：碎花＝色 1 底色（牆面聚光、輪廓燈）、色 2 碎花色（前景地面）；碎花無反向 */
document.addEventListener('change',e=>{if(e.target&&e.target.id==='gelOn'){gelUser=e.target.checked;gelSync()}});
function renderPaint(){try{setTimeout(gelSync,0)}catch(_){}paintFix();hsUI();smUI();const bo=brushOnly(),is64=paintOk(),cur=PAINT_OPTS.find(o=>o[0]===paintSel),pc=document.getElementById('paintChips'),ph=pc.previousElementSibling,as=document.getElementById('anoSw'),ah=document.getElementById('anoH'),lcc=document.getElementById('logoColSw'),lch=document.getElementById('logoCH'),dtc=document.getElementById('dtColSw'),dth=document.getElementById('dtCH'),dtr=document.getElementById('dtRevCtl'),lgr=document.getElementById('lgRevCtl');
  as.style.display=ah.style.display='none';/* v120：陽極色改為下拉選單，併入「車架顏色」（僅 MASTER 64Ti）；色票列保留於 DOM 不用 */
  pc.style.display=ph.style.display=(bo||(is64&&finEff()==='brush'))?'none':'';
  if(bo){gradUI();dtc.style.display=dth.style.display=dtr.style.display=lgr.style.display='none';lcc.style.display=lch.style.display='none';chips(document.getElementById('finChips'),['拉絲'],'拉絲',()=>{});
    document.getElementById('paintNote').textContent=MNAME[selM]+'｜'+(selM==='ss'?'M3 不鏽鋼車架，':'鈦合金車架，')+'不承接陽極與塗裝客製，表面處理固定為拉絲（方向沿各管長邊），並加貼「無膜標」貼紙。3D 以貼紙色示意位置（尺寸為暫估）。';return}
  chips(document.getElementById('finChips'),FIN_OPTS.map(o=>o[1]),finLabel(),x=>{finSel=FIN_OPTS.find(o=>o[1]===x)[0];renderPaint();wk()});
  if(is64)colorSelect(pc);else chips(pc,PAINT_OPTS.filter(o=>o[0]!=='mono').map(o=>o[1]),cur[1],x=>{paintSel=PAINT_OPTS.find(o=>o[1]===x)[0];renderPaint();wk()});
  const an=paintSel!=='ti',lg=logoOk(),dG=dtCol[0]==='g',lG=!logoLinked&&typeof logoCol==='string'&&logoCol[0]==='g';lcc.style.display=lch.style.display=dtc.style.display=dth.style.display=lg?'':'none';
  dtr.innerHTML='';lgr.innerHTML='';dtr.style.display=lg&&dG?'':'none';lgr.style.display=lg&&lG?'':'none';
  {let lfH=document.getElementById('logoFinH'),lfC=document.getElementById('logoFinChips');if(!lfC){lfH=document.createElement('h2');lfH.id='logoFinH';lfH.dataset.sub='paint';lfH.textContent='下管標表面處理';lfC=document.createElement('div');lfC.id='logoFinChips';lfC.className='chips';lfC.dataset.sub='paint';/* v199zzzzzz130（A3）：括號說明改 i 圖示 */const lfP=document.createElement('p');lfP.id='logoFinP';lfP.className='fine';lfP.dataset.sub='paint';lfP.textContent='預設與車架表面處理連動，讓標與車架的紋路拉開對比（例：車架噴砂、標不加工）。';dtr.after(lfH,lfC,lfP);[lfH,lfC,lfP].forEach(e=>e.classList.toggle('subhide',cSub!=='paint'))}{const lfP=document.getElementById('logoFinP');lfH.style.display=lfC.style.display=lg?'':'none';if(lfP)lfP.style.display=lg?'':'none'}if(lg)chips(lfC,logoFinOpts().map(o=>o[1]),logoFinLabel(),x=>{logoFinSel=logoFinOpts().find(o=>o[1]===x)[0];renderPaint();wk()})}
  if(lg){logoColSelect(lcc);dtColSelect(dtc);const rb=(box,get,set)=>{const b=document.createElement('button');b.className='chip';b.textContent='反向';b.setAttribute('aria-pressed',get());b.onclick=()=>{set(!get());renderPaint();wk()};box.appendChild(b)};if(dG)rb(dtr,()=>dtRev,v=>{dtRev=v});if(lG)rb(lgr,()=>lgRev,v=>{lgRev=v})}
  document.getElementById('paintNote').textContent=MNAME[selM]+'｜'+(paintSel==='grad'?(is64?'漸層陽極：'+ANO_GRAD[anoG][0]+'，漸變帶由 A 到 B（拖曳 3D 上的綠點調整位置，或按「反向」）。中間色依薄膜干涉的色序計算（膜厚由 A 端漸增到 B 端），不是 RGB 直接混色；兩端為色樣實色。':'顏色沿車架由頭管的藍紫，漸變到五通與後叉的古銅。'):paintSel==='spl'?'碎花陽極：'+SPL[splI][0]+'，遮罩依 2026-11-03 提供的碎花遮罩，三向投影貼在車架；平鋪尺寸為暫估（可選細／中／粗）。'+(splI?'此組底色暫用單色色號，待底色票。':''):paintSel==='mono'?'單色陽極：'+ANO_MONO[anoM][0]+'（'+ANO_MONO[anoM][1]+'），全車同色。':'維持鈦合金原色'+(is64&&finEff()==='brush'?'（拉絲表面不能做陽極，請改選「標準」或「噴砂」）':'')+'。')+(an?'為示意色，實際以陽極製程為準。前叉不在此範圍。':'')+'表面處理：'+finLabel()+'。'+(finEff()==='brush'?'拉絲方向沿各管長邊。':'')+(logoShown()?'下管標表面處理：'+logoFinLabel()+'（'+(finEff()==='blast'?'車架噴砂，標不加工以拉開對比':'與車架表面處理拉開對比')+'；標面積小，不做拉絲）。':'')/* v199zzzzzz125：其他 Logo 顏色的說明刪除（使用者 2026-11-20） */;gradUI()}
function syncSub(){const pn=document.querySelector('.panel[data-panel=custom]'),bar=document.getElementById('cSub');if(!pn||!bar)return;
  const ok=finOk(),sub=(cSub==='paint'&&ok)?'paint':(cSub==='addon'?'addon':'geo');bar.hidden=false;/* v131：子分頁列一律顯示（幾何客製／塗裝客製／加購套件）；不承接塗裝的車款隱藏「塗裝客製」鈕 */
  bar.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.sub===sub));if(b.dataset.sub==='paint')b.hidden=!ok});
  [...pn.children].forEach(el=>{if(el===bar)return;if(!el.dataset.sub)el.dataset.sub='geo';el.classList.toggle('subhide',el.dataset.sub!=='all'&&el.dataset.sub!==sub)});
  if(sub==='paint')renderPaint();if(sub==='addon'){hsUI();smUI()}}
document.querySelectorAll('#cSub button').forEach(b=>b.addEventListener('click',()=>{cSub=b.dataset.sub;syncSub();if(tab==='custom'&&CN)goNodes(custTarget());wk()}));
const STYLES={std:{outline:false},line:{outline:true},toon:{outline:true,toon:true}};let curStyle='line';/* v199s：顯示風格鈕已取消，輪廓線（line）固定 *//* v100：風格鈕只剩標準／插畫；toon 保留但無按鈕；matcap 改由「客製服務→塗裝客製」控制，與風格無關 *//* v97：預設為插畫 */
function setStyle(k){if(!STYLES[k])return;const was=!!STYLES[curStyle].toon,now=!!STYLES[k].toon;if(was&&!now)toonLeave();if(!was&&now)toonEnter();curStyle=k;if(!STYLES[k].outline)tagOutline(false);document.querySelectorAll('#styleSeg button').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.style===k)));wk()}
document.querySelectorAll('#styleSeg button').forEach(b=>b.addEventListener('click',()=>setStyle(b.dataset.style)));
function drawFrame(){if(window.__ctxLost)return;if(G.exTick)G.exTick();/* v199zzzzzz87：爆炸位移要在實例化／批次同步之前 */if(G.instSync)G.instSync();if(G.btSync)G.btSync();if(G.shTick)G.shTick();/* v199zzzzzz85：陰影重算要在主畫面繪製之前（借用主畫布左下角取景，隨後整張重畫） */if(STYLES[curStyle].toon){toonPass(true);toonSync()}mcSync();STU.sync();/* v199zzzzzz112 */renderer.render(scene,camera);if(!STYLES[curStyle].outline||OLskip)return;
  tagOutline(true);renderer.getDrawingBufferSize(outV);outU.uRes.value.copy(outV);const mobK=(()=>{const cw=stage.clientWidth;/* v115：畫布已鋪滿整頁，版面判斷改看 #stage */return cw>window.innerWidth*.85?OUT_STK*Math.max(.7,Math.min(1.1,Math.pow(cw/OUT_STK_W,.5)))/OUT_PX:Math.max(OUT_MOB_MIN,Math.min(1,Math.pow(cw/OUT_MOB_W,.8)))})();/* v106：上下堆疊版面（舞台寬≈視窗寬，手機與折疊機）改以 OUT_STK（CSS px，全車視角）為基準，並隨舞台寬度（基準 OUT_STK_W）微調；並排版面（桌面）維持原算法 *//* v92：行動版（舞台寬度小於 OUT_MOB_W）線寬依寬度縮小；下限 OUT_FLOOR CSS px */
  outU.uPx.value=Math.max(OUT_FLOOR,OUT_PX*Math.max(OUT_MIN,Math.min(OUT_MAX,Math.pow(OUT_R0/Math.max(.2,cam.r),OUT_ZG)))*mobK)*renderer.getPixelRatio();
  const ink=isDark()?OUT_INK.dark:OUT_INK.light;outMat.color.setHex(ink);outMatInv.color.setHex(ink);
  const ac=renderer.autoClear;renderer.autoClear=false;
  [[1,outMat],[2,outMatInv]].forEach(([ly,mt])=>{scene.overrideMaterial=mt;camera.layers.set(ly);renderer.render(scene,camera)});camera.layers.set(0);scene.overrideMaterial=null;renderer.autoClear=ac}
/* v96：STEP 件減面（座墊、前叉腿、曲柄臂×2、卡鉗本體）。原幾何仍在上方建好，這裡於首次繪製前以減面後的幾何取代：焊接後以 fast_simplification 減約六成（最大表面偏差 0.3–0.5 mm），法線依 40° 折角重算（int8，位置 float32，索引 uint16）。比對鍵＝群組名＋原三角形數；前後卡鉗共用同一幾何，取代後仍共用；卡鉗基座（calBase）供對位計算，不動。 */
(function(){const OPTG=VIBE_D.OPTG;
  const dec=bz;
  const grpOf=o=>{let q=o;while(q&&q!==scene&&q!==bike){for(const k in G)if(G[k]===q)return k;for(const k in T)if(T[k]===q)return k;q=q.parent}return '?'};
  const pool={};OPTG.forEach(e=>{const k=e.k+'|'+e.t;(pool[k]=pool[k]||[]).push(e)});
  const made=new Map(),occ={};
  scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const g=o.geometry;if(!g||g.type!=='BufferGeometry'||!g.index)return;
    let k=grpOf(o);if(k==='fCal')k='rCal';if(k==='rCal'&&o.name!=='calBody')return;const key=k+'|'+g.index.count/3,L=pool[key];if(!L)return;
    let ng=made.get(g.uuid);
    if(!ng){const i=occ[key]||0;if(i>=L.length)return;occ[key]=i+1;const e=L[i];ng=new THREE.BufferGeometry();
      ng.setAttribute('position',new THREE.BufferAttribute(new Float32Array(dec(e.p)),3));ng.setAttribute('normal',new THREE.BufferAttribute(new Int8Array(dec(e.n)),3,true));ng.setIndex(new THREE.BufferAttribute(new Uint16Array(dec(e.i)),1));made.set(g.uuid,ng)}
    o.geometry=ng});
})();
{let pw=0;window.__prew=()=>{if(pw)return;pw=1;window.__tPw=performance.now();try{trdPrewarm()}catch(e){}try{logoPrewarm()}catch(e){}};setTimeout(window.__prew,15000)}/* v199zzzzzz56：decal／胎紋預建改在開場旋轉結束後才開始（原為主程式後 2.5 s，正好落在 iplay40H 的就緒判定期間，15 張貼圖上傳造成卡頓）；15 s 保底 *//* v199：載入後閒置預建 decal 貼圖與 4 張胎紋法線 */
const clock=new THREE.Timer();
(function loop(){requestAnimationFrame(loop);const act=!!(tween||vTween);if(ghost.visible)ghostCol();clock.update();const t=clock.getElapsed();
  if(tween){const k=Math.min(1,(performance.now()-tween.t0)/tween.d),e=1-Math.pow(1-k,3);applyNodes(lerpN(tween.from,tween.to,e));if(k>=1){applyNodes(tween.to);tween=null}}
  if(vTween){const k=Math.min(1,(performance.now()-vTween.t0)/vTween.d),e=1-Math.pow(1-k,3);
    if(k>=1){liveV=Object.assign({},vTween.to);vTween=null}else VK.forEach(q=>{liveV[q]=vTween.from[q]+(vTween.to[q]-vTween.from[q])*e});updLive()}
  refreshDimText();applyCam();STU.tick();/* v199zzzzzz112 */setRS();if(Math.abs(RS-RSdone)>.04){RSdone=RS;updateGhost();updateDim()}try{window.__fdTick&&window.__fdTick(t)}catch(_){}HS.forEach(h=>{h.halo.lookAt(camera.position);const s=1+.35*Math.sin(t*3+h.phase);h.halo.scale.setScalar(st[h.p.id].done?1.3:s);h.g.scale.setScalar(Math.max(.55,Math.min(1.4,cam.r/2.5))*(window.innerWidth<=760?(sel===h.p?3:2):1))});
  if(G.exBusy&&G.exBusy())wk(5);/* v199zzzzzz87：拆解動畫進行中保持繪製 */
  const sg=cam.tgt.x+cam.tgt.y*3+cam.tgt.z*7+cam.r*11+cam.th*13+cam.ph*17+offY*19+offX*29+RS*23,mv=Math.abs(sg-lastSig)>1e-7;lastSig=sg;if(wake>0)wake--;
  {const _n=performance.now(),_dt=Math.min(.05,(_n-spinL)/1000);spinL=_n;if(tab==='torque'&&!SPIN_SC){if(spinA!==0){spinA=0;applySpin();wake=Math.max(wake,2)}}/* v199zzzzzz93：離開展示即歸零回預設曲柄角（同 v179）。曾試過補完整圈再停，但一圈在 60 fps 要 17 秒、停不下來反而像沒停；熱點在展示期間已改為跟著曲柄角走（placeHS），所以不需要靠歸零來對位 */else{if(mv)spinT=_n+SPIN_HOLD;if(_n<spinT&&SPIN_ON){spinA+=_dt*spinW(spinA);applySpin();wake=Math.max(wake,2)}}}/* v199zzzzzz93：扭力分頁在展示執行中（SPIN_SC）照常示意旋轉——曲柄與鏈條連動，自旋路徑與其他分頁相同；展示期間 scTick0 每幀續約 spinT。 *//* v179：示意旋轉 */
  const lo=((inter||wheelT>performance.now())&&mv)||swT>performance.now();if(lo||mv)mvT=performance.now();if(lo&&!lowRes&&!(DESK&&!SLOW))setRes(true);/* v199v：桌機且未被探測為慢機時，動作中不降像素比 */else if(lowRes&&!lo&&(wake<=0||(SLOW&&performance.now()-mvT>300))&&!inter){setRes(false);wake=Math.max(wake,2)}/* v199g：慢機停動 300 ms 就補回完整像素比（原要等 wake 耗盡，約 150 個畫面，慢機上達 10 秒）；描邊在停動後第一幀就補，且該幀仍為低像素比（較快） */
  const need=mv||wake>0||act||!!(G.exBusy&&G.exBusy()),now=performance.now();OLskip=SLOW&&!DESK&&(mv||act);/* v199zzzzzz18：桌機（DESK）輪廓線永遠開啟，慢機旗標只影響行動裝置（原 OLskip＝SLOW&&(mv||act) 使被判慢機的桌機動作中不畫輪廓，與 v199r 註解不符） *//* v199zg：「輪廓線強制開啟」選項移除，慢機動作中一律略過輪廓線 *//* v199r：桌機（非 iOS／Android、精準指標）輪廓線永不略過，慢機判斷只影響行動裝置 *//* v199g：示意旋轉的 0.5 秒尾巴不算動，描邊不等它 *//* 只有選取光圈在脈動時降為約 15 fps，且不更新標籤 */
  if(need||(sel&&now-lastPulse>66)){lastPulse=now;drawFrame();if(need){projectLabel();placeTags();placeRider();avoidRL()}}})();

/* ===== v193：示意零件材質表（使用者 2026-11-04 項目 26）=====
   範圍：非加購、非選色、非車架的示意零件，依材質分 12 群組；每組三個旋鈕：材質（金屬度／粗糙度預設）、顏色（替換色）、明度（顏色乘數）。
   不動：車架（userData.frame／tib）、加購與變色龍（cham／addonOn）、座管束與頭碗組（HSm，由塗裝客製選單管）、matcap 材質、有貼圖者。
   「原設」＝各材質初始金屬度與粗糙度；換車款或加購造成的新材質由 mtScan 補登錄並套用目前設定。臨時用，隨畫質面板一併定案或移除。 */
var MT_OK=0;
const MT_G=[['dk','深黑件（五通杯）'],['ck','黑鋁件（曲柄・大盤・龍頭・把手・RD・撥片）'],['dr','傳動金屬（RD・飛輪・螺絲）'],['ch','鍊條（鈦色）'],['st','鋼件（軸・螺絲）'],['ro','碟盤'],['bk','黑色塑料件（把帶・煞變把手）'],['cb','碳纖件（輪框・前叉・座管・卡鉗本體）'],['cl','卡鉗金屬件'],['sd','座墊・把帶・變把橡膠套'],['tr','輪胎面'],['wl','胎壁']];
const MT_P=[['原設'],['消光塑料',.05,.85],['陽極鋁',.6,.5],['緞面金屬',.85,.45],['拋光金屬',1,.22],['碳纖亮面',.15,.4]];
const MTS={};MT_G.forEach(g=>{MTS[g[0]]={p:0,c:null,b:1}});const MTM=new Map();
function mtGid(m){
  if(!m||!m.isMeshStandardMaterial||!m.color||m.map||m.matcap)return null;const u=m.userData||{};
  if(u.frame||u.tib||u.cham||u.addonOn||m===HSm||m===hsTiM||m===M.cp||m===M.fkC||m===M.postC||m===M.tiF||m===M.tiS||m===M.tiK||m===M.tiPa||m===M.ti||m===M.tiP||m===M.tiScr)return null;
  if(m===M.chn)return'ch';if(m===M.rotor)return'ro';if(m===M.alBk||m===M.dark||m===M.darkD)return'ck';if(m===M.casM)return'dr';if(m===M.saddle)return'sd';if(m===M.tire)return'tr';if(m===M.wall)return'wl';
  if(m===M.calBase||m===M.calScrew)return'cl';if(m===M.carbon||m===M.calBody||m===M.postA)return'cb';if(m===M.bbc)return'dk';if(m===M.steel)return'st';
  const h=m.color.getHexString();
  if(h==='5e5d57')return'ck';if(h==='24231f')return'dk';if(h==='dedad0')return'st';if(h==='161617'||h==='151516'||h==='2a2a2d'||h==='2b2b2e')return'bk';if(h==='32312d')return'cb';return null}
function mtApply(gid){const s=MTS[gid],p=MT_P[s.p];MTM.forEach((e,m)=>{if(!e||e.g!==gid)return;m.metalness=p[1]!=null?p[1]:e.m;m.roughness=p[2]!=null?p[2]:e.r;if(s.c)m.color.set(s.c);else m.color.copy(e.c);if(s.b!==1)m.color.multiplyScalar(s.b)})}
function mtScan(){let nw=0;scene.traverse(o=>{if(!o.isMesh)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(!m||MTM.has(m))return;const g=mtGid(m);MTM.set(m,g?{g,c:m.color.clone(),m:m.metalness,r:m.roughness}:null);if(g){nw++;const s=MTS[g];if(s.p||s.c||s.b!==1)mtApply(g)}})});if(nw)wk();return nw}
function mtBase(gid){let c=null;MTM.forEach(e=>{if(e&&e.g===gid&&!c)c=e.c});return c?'#'+c.getHexString():'#888888'}
var TRD0;function mtReset(){TRD.s=TRD0;trdBuild();MT_G.forEach(g=>{const s=MTS[g[0]];s.p=0;s.c=null;s.b=1;mtApply(g[0])});mtUI()}
function mtUI(){const q=document.getElementById('qpTrd');if(q){q.value=TRD.s;q.nextElementSibling.textContent=TRD.s.toFixed(2)}const b=document.getElementById('qpMat');if(!b)return;MT_G.forEach(g=>{const r=b.querySelector('[data-g="'+g[0]+'"]');if(!r)return;const s=MTS[g[0]];r.querySelector('select').value=s.p;r.querySelector('input[type=color]').value=s.c||mtBase(g[0]);const rg=r.querySelector('input[type=range]');rg.value=s.b;rg.nextElementSibling.textContent=s.b.toFixed(2)})}
function mtHTML(){return'<div class="qm"><h4>外胎・輪框</h4><div class="qr"><label for="qpTrd">胎面紋路</label><input id="qpTrd" type="range" min="0" max="6" step=".05"><output></output></div></div><div class="qm"><h4>示意零件材質</h4><div id="qpMat">'+MT_G.map(g=>'<div class="qg" data-g="'+g[0]+'"><div class="qn"><span>'+g[1]+'</span><button type="button" data-mr="1">還原</button></div><div class="qc"><select aria-label="材質">'+MT_P.map((p,i)=>'<option value="'+i+'">'+p[0]+'</option>').join('')+'</select><input type="color" aria-label="顏色"><input type="range" min=".4" max="1.8" step=".05" aria-label="明度"><output></output></div></div>').join('')+'</div></div>'}
function mtHTMLa(){return mtHTML().split('<div class="qm"><h4>示意零件材質')[0]}
function mtHTMLb(){return'<div class="qm"><h4>示意零件材質'+mtHTML().split('<div class="qm"><h4>示意零件材質')[1]}
function qpStamp(){const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())}
/* v199p：輸出設定。把面板所有項目（目前值、預設值、是否改過）輸出成 Markdown，附 JSON 區塊供貼回對話匯入；不含車型、尺寸與塗裝選擇 */
function qpMD(){
  const fx=x=>typeof x==='boolean'?(x?'開':'關'):typeof x==='number'?String(+x.toFixed(3)):String(x),d=new Date(),p=n=>String(n).padStart(2,'0'),ts=d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes());
  const row=(n,k,c,df)=>'| '+n+' | `'+k+'` | '+fx(c)+' | '+fx(df)+' | '+(fx(c)===fx(df)?'':'✱')+' |',head='| 項目 | 代號 | 目前值 | 預設值 | 改過 |\n|---|---|---|---|---|\n';
  const val=k=>k in QV?QV[k]:QB[k],def=k=>k in QV0?QV0[k]:QB0[k],sl=(L)=>L.map(r=>row(r[1],r[0],val(r[0]),def(r[0]))).join('\n');
  const L_ST=[['br','拉絲條紋'],['bs','拉絲比例'],['bc','拉絲對比'],['bn','拉絲雜訊'],['ta','拉絲高光']],L_BL=[['tr','噴砂粗糙度・鈦原色'],['gr','噴砂顆粒・鈦原色'],['mt','噴砂霧面・鈦原色'],['pr','噴砂粗糙度・陽極 PBR'],['pcc','噴砂清漆・陽極 PBR'],['pgr','噴砂顆粒・陽極 PBR'],['mmt','噴砂霧面・陽極 Matcap'],['mgl','噴砂補高光・陽極 Matcap'],['mgr','噴砂顆粒・陽極 Matcap']],L_CC=[['cc','清漆層強度'],['ccr','清漆層粗糙度']],L_TU=[['film','薄膜干涉'],['ao','管件 AO'],['ex','鈦件曝光'],['sat','陽極飽和'],['es','陽極反光']];
  const mcN={pbrf:'PBR（預設）',mat:'Matcap'},mc=QP.mc||'pbrf';
  const mats=MT_G.map(g=>{const s=MTS[g[0]];return{id:g[0],name:g[1],材質:MT_P[s.p][0],顏色:s.c||'原色',明度:s.b}});
  const J={版次:'v199zzzl',時間:ts,效能:{分材質matcap:QB.parts},清漆層:{cc:QV.cc,ccr:QV.ccr},風格:{an:QB.an,bc:QV.bc,bn:QV.bn},陽極材質:mc,外胎:{胎面紋路:TRD.s},已調整材質預設值:{film:QB.film,ao:QB.ao,br:QV.br,gr:QV.gr,mt:QV.mt,tr:QV.tr,pr:QV.pr,pcc:QV.pcc,mgl:QV.mgl,mmt:QV.mmt,pgr:QV.pgr,mgr:QV.mgr,ex:QV.ex,bs:QV.bs,sat:QV.sat,es:QV.es},示意零件材質:mats};
  const env='- 裝置像素比 '+(window.devicePixelRatio||1)+'｜視窗 '+innerWidth+'×'+innerHeight+'｜層級 '+(typeof TIER!=='undefined'?TIER:'—')+'｜慢機旗標 '+(typeof SLOW!=='undefined'?SLOW:'—')+'｜單幀約 '+(QP.ms?QP.ms.toFixed(1):'—')+' ms\n- '+navigator.userAgent;
  return '---\nname: VIBE Geometry 進階彩現設定匯出\nversion: v199zzzzzz125\nexported: '+ts+'\n---\n\n# 進階彩現設定匯出｜'+ts+'\n\n> 「改過」欄 ✱＝與預設值不同；JSON 區塊為機器可讀版。\n\n## 環境\n'+env
  +'\n\n## 1 效能\n'+head+row('分材質 matcap','parts',QB.parts,QB0.parts)
  +'\n\n## 1a 噴砂\n'+head+sl(L_BL)+'\n\n## 2 拉絲\n'+head+L_ST.map(r=>row(r[1],r[0],val(r[0]),def(r[0]))).join('\n')
  +'\n\n## 2a 清漆層\n'+head+sl(L_CC)
  +'\n\n## 3 陽極材質\n'+head+row('繪製方式','mc',mcN[mc]||mc,mcN.pbrf)
  +'\n\n## 4 外胎・輪框\n'+head+[row('胎面紋路','tread',TRD.s,TRD0)].join('\n')
  +'\n\n## 5 已調整材質預設值\n'+head+sl(L_TU)
  +'\n\n## 6 示意零件材質\n| 群組 | 代號 | 材質 | 顏色 | 明度 | 改過 |\n|---|---|---|---|---|---|\n'+mats.map(m=>'| '+m.name+' | `'+m.id+'` | '+m.材質+' | '+m.顏色+' | '+fx(m.明度)+' | '+((m.材質!=='原設'||m.顏色!=='原色'||m.明度!==1)?'✱':'')+' |').join('\n')
  +'\n\n## JSON\n```json\n'+JSON.stringify(J,null,1)+'\n```\n'}
function mtWire(b){b.addEventListener('input',e=>{const t=e.target;if(t.id==='qpTrd'){TRD.s=+t.value;trdBuild();t.nextElementSibling.textContent=TRD.s.toFixed(2);wk()}});const m=b.querySelector('#qpMat');if(!m)return;
  m.addEventListener('input',e=>{const r=e.target.closest('.qg');if(!r)return;const g=r.dataset.g,s=MTS[g];if(e.target.type==='color')s.c=e.target.value;else if(e.target.type==='range'){s.b=+e.target.value;e.target.nextElementSibling.textContent=s.b.toFixed(2)}else return;mtApply(g);wk()});
  m.addEventListener('change',e=>{const r=e.target.closest('.qg');if(!r||e.target.tagName!=='SELECT')return;const g=r.dataset.g;MTS[g].p=+e.target.value;mtApply(g);wk()});
  m.addEventListener('click',e=>{const bt=e.target.closest('button[data-mr]');if(!bt)return;const g=bt.closest('.qg').dataset.g,s=MTS[g];s.p=0;s.c=null;s.b=1;mtApply(g);mtUI();wk()})}
function mtDiff(){const o={};MT_G.forEach(g=>{const s=MTS[g[0]];if(s.p||s.c||s.b!==1)o[g[0]]={材質:MT_P[s.p][0],顏色:s.c,明度:s.b}});return o}
/* ===== v194：外胎胎面紋路與輪框粗糙度起伏（使用者 2026-11-04 項目 27；臨時，隨畫質面板定案）=====
   (1) 胎面：程式生成 256×256 胎面高度（約 64 KB 記憶體、不內嵌資料）烘進外胎 normalMap；V 形（人字）小塊紋＋中央縱肋，只作用在胎冠 ±約 50° 內，胎壁側平滑；與既有橡膠顆粒 normalMap 並存。
       外胎 TorusGeometry 的 u＝繞輪一圈（貼圖橫向重複 40 次，每格約 52 mm、4 塊紋）、v＝繞胎管一圈（重複 2 次，胎冠在格邊 y＝0）。強度＝TRD.s 乘高度（面板「胎面紋路」，0＝關）。紋型為我選的通用人字紋，非任何實際胎款。
   (2) 輪框：M.rim（clone 自 M.carbon，物件座標雜訊，隨輪轉動）粗糙度與清漆粗糙度各加 ±uRA 的兩層值噪聲（約 18 mm、5 mm）；碳纖輪框有清漆層，只動底層粗糙度看不出來，所以兩者一起動。強度＝面板「輪框粗糙變化」，0＝關。 */
const TRD={s:4.5,tw:38.8}/* v198：胎面紋路預設 4.5（v197 為 1.6、v194 為 .6）；tw＝目前標稱胎寬 mm */;
/* 烘進既有橡膠顆粒 normalMap（three.js 有 normalMap 時不採用 bumpMap）：以相同亂數種子重建顆粒高度，再加上胎面高度 × TRD.s，重算法線；滑桿變動時重算（256×256，約數 ms） */
const trdD=(()=>{const W=256,H=256,r=(()=>{let a=1234567;return()=>(a=(a*1664525+1013904223)>>>0)/4294967296})();
  const h=new Float32Array(W*H);for(let i=0;i<h.length;i++)h[i]=r();
  const blur=(src,k)=>{const o=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let t=0;for(let d=-k;d<=k;d++)t+=src[y*W+(x+d+W)%W];o[y*W+x]=t/(2*k+1)}const q=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let t=0;for(let d=-k;d<=k;d++)t+=o[((y+d+H)%H)*W+x];q[y*W+x]=t/(2*k+1)}return q};
  const f=blur(h,1),c=blur(h,4),ht=new Float32Array(W*H),kn=new Float32Array(W*H),yA=new Float32Array(W*H);for(let i=0;i<ht.length;i++)ht[i]=f[i]*1.0+c[i]*2.2;
  const ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const yy=Math.min(y,H-y),u=x/64+yy/46,fr=Math.abs((u%1+1)%1-.5)*2;kn[y*W+x]=ss(.22,.4,fr);yA[y*W+x]=yy}
  return{W,H,ht,kn,yA,ss}})();/* v198：kn＝人字塊高度、yA＝距胎冠的像素（256 px＝半圈 180°，81.5 px／rad）；t 窗在 trdBuild 依胎寬計算 */
const TRD_C=new Map();/* v199：胎紋法線貼圖快取（鍵＝胎寬｜強度），換車型時不重算 */
function trdBuild(){const ck=(TRD.tw||38.8)+'|'+TRD.s,cv=M.tire.normalMap&&M.tire.normalMap.image;if(!cv)return;let d=TRD_C.get(ck);if(d){cv.getContext('2d').putImageData(d,0,0);M.tire.normalMap.needsUpdate=true;return}trdBuild0();d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height);TRD_C.set(ck,d);if(TRD_C.size>12)TRD_C.delete(TRD_C.keys().next().value)}
function trdPrewarm(){const o=TRD.tw;[30,35,45,50].forEach(t=>{TRD.tw=t;trdBuild()});TRD.tw=o;trdBuild()}
function trdBuild0(){const{W,H,ht,kn,yA,ss}=trdD,cn=M.tire.normalMap&&M.tire.normalMap.image;if(!cn)return;const g=cn.getContext('2d'),d=g.createImageData(W,H),S=7,A=TRD.s*1.6,hh=new Float32Array(W*H);
  /* v198：胎面紋路只在肩部。中央光頭寬 20 mm（軸向 ±10 mm）：斷面軸向半寬 a＝標稱胎寬／2，光頭半角 θ0＝asin(10／a)；紋路帶由 θ0 到 75°（再外為胎壁），內外緣各柔化 */
  const a=(TRD.tw||38.8)/2,p0=Math.asin(Math.min(.97,10/a))*81.49,p1=Math.max(p0+8,75*Math.PI/180*81.49);
  for(let i=0;i<hh.length;i++){const y=yA[i],t=ss(p0-3,p0+3,y)*(1-ss(p1-9,p1,y));hh[i]=ht[i]+(t*kn[i]+(1-t)*.3)*A}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const L=hh[y*W+(x+W-1)%W],R=hh[y*W+(x+1)%W],U=hh[((y+H-1)%H)*W+x],D=hh[((y+1)%H)*W+x];let nx=(L-R)*S,ny=(U-D)*S,nz=1;const l=Math.hypot(nx,ny,nz);nx/=l;ny/=l;nz/=l;const o=(y*W+x)*4;d.data[o]=(nx*.5+.5)*255;d.data[o+1]=(ny*.5+.5)*255;d.data[o+2]=(nz*.5+.5)*255;d.data[o+3]=255}
  g.putImageData(d,0,0);M.tire.normalMap.needsUpdate=true}
trdBuild();

TRD0=TRD.s;mtScan();MT_OK=1;
/* ===== v148：臨時畫質面板（使用者 2026-11-02 指示）；v199zzzzzz125 起改名「進階彩現設定」，為正式介面（使用者 2026-11-20），規格見 35 =====
   QB＝使用者設的基準值；自動降級只覆寫 MC_ADV 的有效值與像素比，不改 QB。
   降級階梯：L1 超取樣關閉 → L2 再關分材質與薄膜 → L3 再關 AO 與拉絲。只降不升（垂直同步會把幀時間頂在 16.7 ms，量不出餘裕）；「恢復」按鈕回 L0。
   取樣只在持續重繪（wake>0）時計入；>120 ms 的幀視為編譯卡頓不計。 */
const QB={film:MC_ADV.film,an:MC_ADV.an,ao:MC_ADV.ao,parts:MC_ADV.parts},QB0=Object.assign({},QB),QV0=Object.assign({},QV);
function qpEff(){const L=QP.lvl;MC_ADV.film=L>=2?0:QB.film;MC_ADV.an=L>=3?0:QB.an;MC_ADV.ao=L>=3?0:QB.ao;MC_ADV.parts=L>=2?false:QB.parts}
const CC0=new WeakMap();/* v199x：清漆層。對所有 MeshPhysicalMaterial 且原清漆層>0 者（碳纖前叉／座管／把手／卡鉗本體等）一致設定強度與粗糙度；跨 0 時需重編譯 */
function ccApply(){const ms=new Set(Object.values(M));(typeof ADDX!=='undefined'&&ADDX?ADDX.mats:[]).forEach(m=>ms.add(m));bike.traverse(o=>{if(o.isMesh)[].concat(o.material).forEach(m=>m&&ms.add(m))});
  ms.forEach(m=>{if(!m||!m.isMeshPhysicalMaterial)return;if(m===mcMatP&&finEff()==='blast')return;if(!CC0.has(m))CC0.set(m,m.clearcoat);if(CC0.get(m)<=0)return;const was=m.clearcoat>0;m.clearcoat=QV.cc;m.clearcoatRoughness=QV.ccr;if((QV.cc>0)!==was)m.needsUpdate=true});wk()}
function qpApply(res){qpEff();if(res)setRes(lowRes);wk();qpUI()}
function qpUI(){const b=document.getElementById('qpBody');if(!b)return;
  b.querySelectorAll('input[data-k]').forEach(i=>{const k=i.dataset.k,x=k in QV?QV[k]:QB[k];i.value=x;i.nextElementSibling.textContent=(+x).toFixed(2)});
  const p=b.querySelector('#qpParts');if(p)p.checked=QB.parts}
(function(){const b=document.getElementById('qpBody');if(!b)return;
  /* v199p：面板依使用者 2026-11-05 指定順序重排：效能／風格／超取樣／陽極材質／自動降畫質／外胎輪框／已調整材質預設值／示意零件材質／輸出設定。
     「已調整材質預設值」＝v169 起已定案預設的九項（film、ao、br、gr、mt、ex、bs、sat、es）；「風格」＝拉絲高光、對比、雜訊三項（預設中性）。 */
  const SR_STU=[['hotK','亮區強度',0,1.2,.01],['kw','亮區寬（倍率）',.5,3,.05],['kh','亮區高（倍率）',.5,3,.05],['poolK','車下亮區',0,1,.01],['frontK','前景地面壓暗',0,1,.01],['vigR','暗角半徑',.1,1,.01],['vigK','暗角強度',0,1,.01],['grain','灰泥顆粒',0,.06,.002],['barK','頂燈燈條',0,1.5,.01],['barH','燈條高度（倍率）',.5,2,.05],['topL','頂光強度',0,2.5,.05],['envK','環境反射',0,1.5,.05],['hemL','補光（半球光）',0,1.5,.05],['sunL','主燈（原位）',0,2,.05],['rimL','輪廓燈',0,2,.05]],SR_COL=[['top','上方牆面'],['mid','產品高度牆面'],['hot','亮區'],['floor','車下地面'],['edge','暗角／前景']];/* v199zzzzzz113：補齊攝影棚全部參數＋五個顏色（使用者 2026-11-19） */
  const RS=r=>`<div class="qr"><label for="qp_${r[0]}">${r[1]}</label><input id="qp_${r[0]}" type="range" data-k="${r[0]}" min="${r[2]}" max="${r[3]}" step="${r[4]}"><output></output></div>`,qH=(t,x)=>`<details class="qm"><summary>${t}</summary><div class="qmb">${x}</div></details>`;
  const R_BL_TI=[['tr','噴砂粗糙度',.4,1,.01],['gr','噴砂顆粒',0,2,.05],['mt','噴砂霧面（混合量）',0,2,.05]],R_BL_PBR=[['pr','噴砂粗糙度',.2,1,.01],['pcc','噴砂清漆',0,1,.05],['pgr','噴砂顆粒',0,2,.05]],R_BL_MC=[['mmt','噴砂霧面',0,2,.05],['mgl','噴砂補高光',0,1,.05],['mgr','噴砂顆粒',0,2,.05]],R_STYLE=[['br','拉絲條紋',0,2,.05],['bs','拉絲比例（條紋粗細，小＝細）',.1,1.5,.05],['bc','拉絲對比',0,8,.1],['bn','拉絲雜訊',0,8,.1],['ta','拉絲高光',0,3,.05]],R_CC=[['cc','清漆層強度',0,1,.05],['ccr','清漆層粗糙度',0,.6,.02]],R_TUNED=[['film','薄膜干涉',0,1,.05],['ao','管件 AO',0,1.2,.05],['ex','鈦件曝光',.2,1.4,.02],['sat','陽極飽和',0,1.6,.05],['es','陽極反光',0,2,.05]];
  /* v199zzzzzz125：進階彩現設定重排為九組、各組預設收折（使用者 2026-11-20）：效能監控／攝影棚／曝光／噴砂／陽極／拉絲／清漆／示意零件／輸出設定 */
  const sub=(t,x)=>`<div class="qsub"><h5>${t}</h5>${x}</div>`,EXK=['ex','ao'],R_EXP=R_TUNED.filter(r=>EXK.includes(r[0])),R_ANO=R_TUNED.filter(r=>!EXK.includes(r[0])),mtx=mtHTML().replace(/<div class="qm"><h4>([^<]*)<\/h4>/g,'<div class="qsub"><h5>$1</h5>');
  b.innerHTML=qH('效能監控',`<p class="qo" id="qpOut"></p><div class="qk"><label><input type="checkbox" id="qpParts"> 分材質 matcap</label></div>`)
  +qH('攝影棚',SR_STU.map(r=>`<div class="qr"><label for="qs_${r[0]}">${r[1]}</label><input id="qs_${r[0]}" type="range" data-stu="${r[0]}" min="${r[2]}" max="${r[3]}" step="${r[4]}"><output></output></div>`).join('')+SR_COL.map(r=>`<div class="qr"><label for="qc_${r[0]}">${r[1]}</label><input id="qc_${r[0]}" type="color" data-stc="${r[0]}"><output></output></div>`).join('')+'<div class="qk"><label><input type="checkbox" id="qpSunTop"> 主燈取代頂光（燈數 −1）</label></div><div class="qk"><button type="button" id="qpStuDef">攝影棚預設</button></div><p class="qo" id="qpStu"></p>')
  +qH('曝光',R_EXP.map(RS).join(''))
  +qH('噴砂',sub('鈦原色',R_BL_TI.map(RS).join(''))+sub('陽極 PBR',R_BL_PBR.map(RS).join(''))+sub('陽極 Matcap',R_BL_MC.map(RS).join('')))
  +qH('陽極',`<div class="qk"><label><input type="checkbox" id="qpMC"> Matcap 繪製（關＝PBR）</label></div>`+R_ANO.map(RS).join(''))
  +qH('拉絲',R_STYLE.map(RS).join(''))
  +qH('清漆',R_CC.map(RS).join(''))
  +qH('示意零件',mtx)
  +qH('輸出設定',`<div class="qk"><button type="button" id="qpMdDl">下載 .md</button><button type="button" id="qpMdCp">複製 .md</button><button type="button" id="qpDef">全部預設</button></div><textarea id="qpMd" readonly rows="2" aria-label="設定匯出內容" placeholder="按「下載」或「複製」後內容會顯示在這裡；下載被擋時可全選複製。"></textarea>`);
  b.addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.k){const k=t.dataset.k;if(k in QV){QV[k]=+t.value;if(k==='ex')renderer.toneMappingExposure=QV.ex;if(k==='cc'||k==='ccr')ccApply()}else QB[k]=+t.value;t.nextElementSibling.textContent=(+t.value).toFixed(2);qpApply(false)}else if(t.id==='qpParts'){QB.parts=t.checked;qpApply(false)}});
  b.addEventListener('change',e=>{if(e.target.id==='qpMC'){QP.mc=e.target.checked?'mat':'pbrf';wk()}});
  b.querySelector('#qpDef').onclick=()=>{mtReset();Object.assign(QB,QB0);Object.assign(QV,QV0);ccApply();renderer.toneMappingExposure=QV.ex;qpApply(true)};
  const mdOut=()=>{const t=qpMD(),ta=b.querySelector('#qpMd');ta.value=t;return t};
  b.querySelector('#qpMdCp').onclick=()=>{const t=mdOut();try{navigator.clipboard.writeText(t).then(()=>{},()=>{ta2()})}catch(_){ta2()}function ta2(){const x=b.querySelector('#qpMd');x.focus();x.select()}};
  b.querySelector('#qpMdDl').onclick=async()=>{const t=mdOut(),fn='VIBE進階彩現設定_'+qpStamp()+'.md';let ok=false;
    try{const dl=window.claude&&claude.use?await claude.use('downloads'):null;if(dl){await dl.save({filename:fn,data:t});ok=true}}catch(e){if(e&&e.code==='declined')ok=true}
    if(!ok){try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/markdown;charset=utf-8'}));a.download=fn;document.body.appendChild(a);a.click();a.remove()}catch(_){}}};
  mtWire(b);mtUI();qpUI();
  STU.ui=()=>{const P=STU.P[isDark()?'dark':'light'];{const c=b.querySelector('#qpSunTop');if(c)c.checked=!!P.sunTop}SR_STU.forEach(r=>{const i=b.querySelector('[data-stu="'+r[0]+'"]');if(i){i.value=P[r[0]];i.nextElementSibling.textContent=(+P[r[0]]).toFixed(r[0]==='grain'?3:2)}});SR_COL.forEach(r=>{const i=b.querySelector('[data-stc="'+r[0]+'"]');if(i&&document.activeElement!==i){const h=STU.col(r[0]);i.value=h;i.nextElementSibling.textContent=h}});const o=b.querySelector('#qpStu');if(o)o.textContent=STU.line()};STU.ui();/* v199zzzzzz112 */
  b.addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.stu){STU.setP(t.dataset.stu,t.value);STU.ui()}else if(t.dataset&&t.dataset.stc){STU.setC(t.dataset.stc,t.value);t.nextElementSibling.textContent=t.value;STU.ui()}});b.querySelector('#qpStuDef').onclick=()=>{STU.reset();STU.ui()};b.querySelector('#qpSunTop').addEventListener('change',e=>{STU.setP('sunTop',e.target.checked?1:0);STU.ui()});/* v120i：寫入目前主題 */
  let last=performance.now();(function f(now){requestAnimationFrame(f);const dt=now-last;last=now;
    if(wake>0&&!document.hidden&&dt>4&&dt<120&&RMS>0){QP.ms=QP.n?QP.ms*.92+RMS*.08:RMS;QP.n++;if(!SLOW&&!IPH&&!DESK&&QP.n>=60&&QP.ms>30&&performance.now()>RT0){SLOW=true;TIER='lo';wk()}wdN=QP.ms>20?wdN+1:0;if(TIER==='hi'&&!DESK&&!IPH&&wdN>=45&&now>8000)TIER='mid';}})(last);
  setInterval(()=>{const d=document.getElementById('qp');if(!d||!d.open)return;const o=document.getElementById('qpOut');if(o&&!/^\{/.test(o.textContent)){const g=window.__gpuMs?window.__gpuMs():null;o.textContent='單幀 '+(QP.ms?QP.ms.toFixed(1):'—')+' ms｜GPU '+(g==null?'—（瀏覽器未提供）':g>0?g.toFixed(2)+' ms':'—')+'｜層級 '+TIER+(SLOW?'（慢機）':'')+'｜陽極 '+(mcCur==='P'?'PBR':'Matcap')+'｜預熱 '+(window.__WU?window.__WU():'—')}/* v199zzzzzz125：評估內容簡化；v126：加 GPU ms */},600)})();

/* ===== v199zf：3D 設定檔（客製服務主分頁下方；使用者 2026-11-05 指示，為「預設個人化」做準備）=====
   「下載」「複製」把目前 3D 的全部設定輸出成 .md：車款（車型、尺寸、各車型胎寬與頭碗型式）、塗裝與顏色（表面處理、車架顏色、漸層端點、下管標、Logo、座管束・頭碗組、鈦螺絲）、
   加購（鈦零件、BLKTEC）、幾何客製表單與騎士尺寸、零組件透明度、畫質與材質（臨時面板的現值）。上半是給人看的表格，下半「JSON」區塊是機器可讀版。
   「貼上並套用」只讀 JSON 區塊，逐欄驗證（無效欄位略過並回報），再依序還原：胎寬／頭碗 → 塗裝與加購變數 → 畫質 → 車型與尺寸 → 表單與騎士 → 重畫。
   不含：鏡頭視角、主分頁與子分頁位置、疊圖比較、扭力巡檢進度。 */
const CFG_SCHEMA='rkl-3d-config',CFG_VER='v199zzzzzz92';
function cfgTs(){const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())}
function cfgGather(){const nn=v=>(typeof v==='number'&&isFinite(v))?v:null,fo={};Object.keys(F).forEach(k=>{const v=F[k];fo[k]=typeof v==='number'?nn(v):v});
  const ma={};MT_G.forEach(g=>{const m=MTS[g[0]];if(m.p||m.c||m.b!==1)ma[g[0]]={p:m.p,c:m.c,b:m.b}});
  return{schema:CFG_SCHEMA,版次:CFG_VER,時間:cfgTs(),
    車款:{model:selM,size:size,hs:Object.assign({},HS_SEL),tw:Object.assign({},TW_SEL)},
    塗裝:{fin:finSel,paint:paintSel,paintSaved:paintSaved,anoM:anoM,anoG:anoG,splI:splI,splSz:splSz,gCustom:gCustom?gCustom.slice():null,gRev:!!gRev,dtCol:dtCol,dtRev:!!dtRev,logoFin:logoFinSel,logoLinked:!!logoLinked,logoCol:logoCol,lgRev:!!lgRev,hsCol:hsCol,smCol:smCol,fkPat:fkPat},
    加購:{ti:Object.assign({},ADD_S.ti),bk:Object.assign({},ADD_S.bk),ser:ADD_S.ser},
    客製表單:fo,騎士:{h:nn(RID.h),i:nn(RID.i),a:nn(RID.a)},透明度:Math.round(ALPHA*100),
    畫質:{film:QB.film,an:QB.an,ao:QB.ao,parts:!!QB.parts,qv:Object.assign({},QV),mc:QP.mc||'pbrf',tread:TRD.s,mats:ma}}}
function cfgMD(){const J=cfgGather(),sf=(fn,d)=>{try{return fn()}catch(e){return d===undefined?'—':d}},cell=v=>String(v==null?'—':v).replace(/\|/g,'／').replace(/\n/g,' '),
    tbl=(t,rows)=>'## '+t+'\n\n| 項目 | 值 |\n|---|---|\n'+rows.map(r=>'| '+cell(r[0])+' | '+cell(r[1])+' |').join('\n')+'\n',
    num=v=>(v==null||!isFinite(v))?'（未填）':v,tw=TW_SEL[selM]||TW_DEF[selM];
  const sec=[];
  sec.push(tbl('車款',[['車型',MNAME[selM]],['尺寸',GEOS[selM]?size:'（此車型無尺寸表）'],['胎寬',(tw||'—')+' mm'],['頭碗型式',hsT()==='hid'?'全隱藏式':'外露式']]));
  sec.push(tbl('塗裝與顏色',[['表面處理',sf(()=>finOk()?finLabel():'不適用')],['車架顏色',sf(()=>paintOk()?paintLabel():'不適用（此車款不承接塗裝客製）')],['座管束・頭碗組・BB 杯',sf(()=>hsOk()?hsLabel():'不適用')],['鈦螺絲與金屬小件',sf(()=>hsOk()?smLabel():'不適用')],['下管標',sf(()=>paintOk()?dtColLabel()+(dtRev?'｜反向':''):'不適用')],['下管標表面處理',sf(()=>paintOk()?logoFinLabel()+(finEff()==='blast'?'（車架噴砂，連動不加工）':'（與車架拉開對比）'):'不適用')],['其他 Logo',sf(()=>paintOk()?logoColLabel()+(logoLinked?'｜連動下管標':'｜自選'):'不適用')]].concat(sf(()=>paintOk()?gradRows().map(r=>[r[0],r[2]]):[],[]))));
  sec.push(tbl('加購',sf(()=>addonRows().map(r=>[r[0],r[2]]),[['加購','—']])));
  sec.push(tbl('騎士與幾何客製',[['身高 cm',num(RID.h)],['跨高 cm',num(RID.i)],['手臂長 cm',num(RID.a)],['前伸量 REACH mm',num(F.reach)],['堆疊高 STACK mm',num(F.stack)],['頭管角度 HTA °',num(F.hta)],['頭管長度 HTL mm',num(F.htl)],['前叉長度 A2C mm',num(F.a2c)],['前叉偏移量 mm',num(F.off)],['五通下沉量 BBD mm',num(F.bbd)],['下叉長度 RC mm',num(F.rc)],['中管角度 STA °',num(F.sta)],['中管長度 STL mm',num(F.stl)],['騎乘類型',F.ride],['煞車',F.brake],['輪胎',F.tire]]));
  const Q=J.畫質,nm=Object.keys(Q.mats).length;
  sec.push(tbl('3D 外觀',[['零組件透明度',J.透明度+'%'],['分材質 matcap',Q.parts?'開':'關'],['陽極材質繪製','auto|pbrf|mat'.split('|').includes(Q.mc)?({auto:'PBR',pbrf:'PBR',mat:'Matcap'})[Q.mc]:Q.mc],['薄膜干涉／拉絲高光／管件 AO',Q.film+'／'+Q.an+'／'+Q.ao],['曝光',Q.qv.ex],['清漆層強度／粗糙度',Q.qv.cc+'／'+Q.qv.ccr],['胎面紋路',Q.tread],['示意零件材質已改動',nm?nm+' 組（見 JSON）':'無']]));
  return ['---','name: VIBE Geometry 3D 設定檔','version: '+CFG_VER,'schema: '+CFG_SCHEMA,'exported: '+J.時間,'---','','# 3D 設定檔｜'+J.時間,'','> 貼回「客製服務」下方的「貼上並套用」即可還原；只讀最後的 JSON 區塊，上方表格僅供閱讀。不含鏡頭視角與分頁位置。','',sec.join('\n'),'## JSON','','```json',JSON.stringify(J,null,1),'```',''].join('\n')}
function cfgParse(t){let o=null;const m=/```json\s*([\s\S]*?)```/i.exec(t);const raw=m?m[1]:(/^\s*\{/.test(t)?t:null);if(!raw)return{err:'找不到設定內容（需含 JSON 區塊）'};try{o=JSON.parse(raw)}catch(e){return{err:'JSON 格式錯誤'}}
  if(!o||o.schema!==CFG_SCHEMA)return{err:'不是本系統的 3D 設定檔'};return{J:o}}
function cfgApply(J){const skip=[],isI=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b,isN=v=>typeof v==='number'&&isFinite(v),
    okC=c=>c==='ti'||(typeof c==='string'&&/^[msg]\d+$/.test(c)&&(c[0]==='m'?+c.slice(1)<ANO_MONO.length:c[0]==='g'?+c.slice(1)<ANO_GRAD.length:+c.slice(1)<SPL.length)),
    take=(name,ok,fn)=>{try{if(ok)fn();else skip.push(name)}catch(e){skip.push(name)}};
  const K=J.車款||{},P=J.塗裝||{},A=J.加購||{},Q=J.畫質,mdl=Object.keys(MNAME).includes(K.model)?K.model:null;
  if(!mdl)skip.push('車型');
  /* 1 胎寬、頭碗型式（以整張對照表取代；setModel 之前） */
  if(K.hs&&typeof K.hs==='object'){Object.keys(HS_SEL).forEach(k=>delete HS_SEL[k]);Object.keys(K.hs).forEach(k=>{if(k in MNAME&&(K.hs[k]==='hid'||K.hs[k]==='ex'))HS_SEL[k]=K.hs[k]})}
  if(K.tw&&typeof K.tw==='object'){Object.keys(TW_SEL).forEach(k=>delete TW_SEL[k]);Object.keys(K.tw).forEach(k=>{if(k in MNAME&&twOpts(k).includes(K.tw[k]))TW_SEL[k]=K.tw[k]})}
  /* 2 塗裝變數 */
  take('表面處理',FIN_OPTS.some(o=>o[0]===P.fin),()=>{finSel=P.fin});
  take('車架顏色',['ti','mono','grad','spl'].includes(P.paint),()=>{paintSel=P.paint});
  take('先前車架顏色',P.paintSaved===null||['mono','grad','spl'].includes(P.paintSaved),()=>{paintSaved=P.paintSaved});
  take('單色陽極',isI(P.anoM,0,ANO_MONO.length-1),()=>{anoM=P.anoM});
  take('漸層陽極',isI(P.anoG,0,ANO_GRAD.length-1),()=>{anoG=P.anoG});
  take('碎花陽極',isI(P.splI,0,SPL.length-1),()=>{splI=P.splI});
  take('碎花尺度',[100,160,260].includes(P.splSz),()=>{splSz=P.splSz});
  take('漸層端點',P.gCustom===null||(Array.isArray(P.gCustom)&&P.gCustom.length===4&&P.gCustom.every(isN)),()=>{gCustom=P.gCustom?P.gCustom.slice():null});
  take('漸層反向',typeof P.gRev==='boolean',()=>{gRev=P.gRev});
  take('下管標顏色',okC(P.dtCol),()=>{dtCol=P.dtCol});
  take('下管標反向',typeof P.dtRev==='boolean',()=>{dtRev=P.dtRev});take('下管標表面處理',P.logoFin===null||P.logoFin===undefined||P.logoFin==='blast'||P.logoFin==='std',()=>{logoFinSel=P.logoFin||null});
  take('Logo 連動',typeof P.logoLinked==='boolean',()=>{logoLinked=P.logoLinked});
  take('Logo 顏色',P.logoCol==='ti'||isI(P.logoCol,0,ANO_MONO.length-1)||okC(P.logoCol),()=>{logoCol=P.logoCol});
  take('Logo 反向',typeof P.lgRev==='boolean',()=>{lgRev=P.lgRev});
  take('座管束・頭碗組顏色',P.hsCol==='k'||P.hsCol==='f'||P.hsCol==='ti'||(typeof P.hsCol==='string'&&/^m\d+$/.test(P.hsCol)&&+P.hsCol.slice(1)<ANO_MONO.length),()=>{hsCol=P.hsCol});
  take('前叉內側圖樣顏色',typeof P.fkPat==='string'&&/^(k|[mgs]\d+)$/.test(P.fkPat),()=>{fkPat=P.fkPat});
  take('鈦螺絲顏色',P.smCol==='d'||SM_OPTS.some(o=>o[0]===P.smCol),()=>{smCol=P.smCol});
  /* 3 加購 */
  if(A.ti&&typeof A.ti==='object')TI_ITEMS.forEach(it=>{const v=A.ti[it.id];take('加購 '+it.name,isI(v,0,Math.max(1,it.opts.length)),()=>{ADD_S.ti[it.id]=v})});
  if(A.ti){take('曲柄介面',isI(A.ti.cInt,0,CR_INT.length-1),()=>{ADD_S.ti.cInt=A.ti.cInt});take('曲柄長度',isI(A.ti.cLen,0,CR_LEN.length-1),()=>{ADD_S.ti.cLen=A.ti.cLen})}
  if(A.bk&&typeof A.bk==='object')BK_POS.forEach(([k,l])=>{take('BLKTEC '+l,isI(A.bk[k],-1,BK_COL.length-1),()=>{ADD_S.bk[k]=A.bk[k]})});   if(A.ser!==undefined)take('傳動／煞車系列',isI(A.ser,0,3),()=>{ADD_S.ser=A.ser;ADD_S.serUser=true});
  /* 4 透明度 */
  take('透明度',isI(J.透明度,0,100),()=>{alR.value=J.透明度;alR.oninput()});
  /* 5 畫質與材質 */
  if(Q&&typeof Q==='object'){
    ['film','an','ao'].forEach(k=>take('畫質 '+k,isN(Q[k]),()=>{QB[k]=Q[k]}));take('分材質 matcap',typeof Q.parts==='boolean',()=>{QB.parts=Q.parts});
    if(Q.qv&&typeof Q.qv==='object')Object.keys(QV).forEach(k=>{if(k in Q.qv)take('畫質 '+k,isN(Q.qv[k]),()=>{QV[k]=Q.qv[k]})});
    take('陽極材質繪製',['auto','pbrf','mat'].includes(Q.mc),()=>{QP.mc=Q.mc==='mat'?'mat':'pbrf'});
    take('胎面紋路',isN(Q.tread),()=>{TRD.s=Q.tread;trdBuild()});
    const ma=Q.mats&&typeof Q.mats==='object'?Q.mats:{};MT_G.forEach(g=>{const m=MTS[g[0]],o=ma[g[0]]||{};m.p=isI(o.p,0,MT_P.length-1)?o.p:0;m.c=(typeof o.c==='string'&&/^#[0-9a-f]{6}$/i.test(o.c))?o.c:null;m.b=isN(o.b)?o.b:1;mtApply(g[0])});
    try{renderer.toneMappingExposure=QV.ex;ccApply();mtUI();qpApply(false);const b=document.getElementById('qpBody');if(b){const mm=b.querySelector('#qpMC');if(mm)mm.checked=QP.mc==='mat'}}catch(e){skip.push('畫質面板同步')}}
  /* 6 車型與尺寸：size 先設，setModel 內只在該車型沒有此尺寸時才改成 M */
  /* 6 幾何客製表單與騎士（先於車型：setModel 內的 fitPick 依騎士尺寸挑建議尺寸） */
  const FO=J.客製表單;if(FO&&typeof FO==='object'){Object.keys(F).forEach(k=>{if(!(k in FO))return;const v=FO[k];if(typeof F[k]==='number'||F[k]!==F[k]){if(v===null)F[k]=NaN;else if(isN(v))F[k]=v;else skip.push('表單 '+k)}else if(typeof v==='string')F[k]=v;else skip.push('表單 '+k)})}
  F.model=MNAME[selM];const R=J.騎士;if(R&&typeof R==='object'){[['h','height'],['i','inseam'],['a','arm']].forEach(([k,f])=>{const v=R[k];if(v===null)RID[k]=NaN;else if(isN(v))RID[k]=v;else{skip.push('騎士 '+k);return}F[f]=RID[k]})}
  /* 7 車型與尺寸：setModel 會依騎士尺寸重挑尺寸，所以換完車型後再把存檔的尺寸設回去 */
  const wantSz=(typeof K.size==='string'&&mdl&&GEOS[mdl]&&GEOS[mdl].some(g=>g.size===K.size))?K.size:null;
  if(mdl){if(!wantSz&&GEOS[mdl])skip.push('尺寸');setModel(mdl);if(wantSz&&size!==wantSz){size=wantSz;cmp=null;goGeo(size,true,true);updateGhost();renderGeo()}}
  F.model=MNAME[selM];
  riderMirror();markRider();renderForm();
  /* 8 重畫 */
  smApply();hsUI();smUI();renderPaint();addonChanged();extras=addonExtras();recalc();if(tab==='custom'&&CN)goNodes(custTarget());wk();
  return skip}
/* ===== v199zzzzzz86：參考碼（可解碼）與配置圖卡（使用者 2026-11-17 決定：參考碼要可解碼；圖卡走 A-1）=====
   參考碼＝把「配置」位元封裝後以 Crockford Base32 輸出（每 4 碼以 - 分組；讀入時不分大小寫，O→0、I／L→1，忽略 - 與空白）。零後端，貼回「用參考碼還原」即原樣還原。
   內容：車型・尺寸・胎寬・頭碗型式、表面處理、車架顏色與陽極色號、漸層端點與反向、下管標／Logo／座管束・頭碗組／螺絲／前叉圖樣顏色、鈦件與 BLKTEC 加購、曲柄、傳動系列、騎乘類型／煞車／輪胎、
   客製幾何十欄（與預設範例不同時才寫入，0.1 單位）、騎士身高／跨高／臂長（有填才寫入，0.5 cm）。（v199zzzzzz97 起為第 2 版編碼，見 rcEncode 上方說明）不含：客戶編號（只由 TRAILMARK 發）、透明度、畫質材質、鏡頭視角。
   版面：[版本 3 bit][結構簽章 6 bit][欄位…][CRC-8][補 0 至 5 的倍數]。結構簽章由各選項清單的長度算出，選項增減後舊碼會被明確拒絕（不會誤解碼）。與 VIBE Match 共用同一格式（Match 之後沿用）。 */
const RC_ABC='0123456789ABCDEFGHJKMNPQRSTVWXYZ',RC_CT=['ti','k','f','m','g','s'],RC_GK=['reach','stack','hta','htl','a2c','off','bbd','rc','sta','stl'],RC_PS=['ti','mono','grad','spl'],RC_SZ=[100,160,260];
const rcN=n=>{let b=0;while((1<<b)<n)b++;return b};
function rcDom(){const MK=Object.keys(MNAME),RK=Object.keys(OPT.ride),d={mk:MK.length,sz:8,fin:FIN_OPTS.length,pa:4,ps:4,am:ANO_MONO.length,ag:ANO_GRAD.length,sp:SPL.length,ss:3,ct:7,ci:16,lf:3,sm:SM_OPTS.length+1,ci2:CR_INT.length,cl:CR_LEN.length,bk:BK_COL.length+1,se:4,hs:3,tw:8,rd:RK.length,br:OPT.brake.length,ti:OPT.tire.length},T=TI_ITEMS.map(it=>Math.max(1,it.opts.length)+1);
  return{MK,RK,d,T,sig:Object.values(d).concat(T).reduce((a,x,i)=>(a*31+x*(i+3))%61,7)}}
function rcCrc(b){let c=0;for(let i=0;i<b.length;i++){const x=((c>>7)&1)^b[i];c=(c<<1)&255;if(x)c^=7}return c}
function rcCol(c){if(typeof c==='number')return[6,c];const m=/^([msg])(\d+)$/.exec(c||'');if(m)return[RC_CT.indexOf(m[1]),+m[2]];const t=RC_CT.indexOf(c);return[t<0?0:t,0]}
function rcColS(t,i){return t===6?i:t>=3?RC_CT[t]+i:RC_CT[t]}
/* v199zzzzzz97：參考碼第 2 版（使用者 2026-11-18：位數再精簡）。版本位元 1→2，第 1 版的碼一律回「參考碼版本不符」，不會誤解。
   與第 1 版的差別（只寫「看得到、會影響結果」的狀態；看不到的暫存值還原成預設）：
   1. 塗裝：單色／漸層／碎花的色號只在目前塗裝或記住的塗裝（paintSaved）是該模式時才寫；paintSaved 只在塗裝＝鈦原色時寫；漸層反向與自訂軸線只在漸層時寫；碎花尺寸只在碎花時寫。
   2. 四個顏色欄：類型 3 bit，只有陽極／漸層／碎花類才接色號（3 bit，依該色表長度）；下管標反向只在下管標是漸層時寫；Logo 連動下管標時不寫 Logo 色與 Logo 反向。
   3. 加購：先 1 bit「有無任何加購或傳動系列」，全預設時整段省略。
   4. 客製幾何：每欄 1 bit「有無改動」，有改才寫與預設範例（SAMPLE）的差值，指數哥倫布（Exp-Golomb）變長編碼；
      mm 欄全為整數時以 1 mm 為單位（多 1 bit 旗標），否則 0.1 mm；角度一律 0.1°。
   5. 騎士：與 170／80／60 cm 的差值，0.5 cm 為單位，指數哥倫布編碼（不設上下限，超出表單範圍也能原樣還原）。
   不動：版本 3 bit、結構簽章 6 bit、CRC-8、Crockford Base32 與容錯、每 4 碼一個 -。 */
const RC_V=2,RC_D0={am:2,ag:1,sp:0,ss:160,cLen:1,ser:3}/* 不寫入時還原成的預設值，須與 anoM／anoG／splI／splSz 與 ADD_S 的初值一致 */,RC_MM=['reach','stack','htl','a2c','off','bbd','rc','stl'],RC_RC={h:170,i:80,a:60};
const rcZ=x=>x>=0?2*x:-2*x-1,rcUZ=n=>n%2?-(n+1)/2:n/2;
function rcColDom(t){return t===3||t===6?ANO_MONO.length:t===4?ANO_GRAD.length:t===5?SPL.length:0}
function rcEncode(){
  const J=cfgGather(),K=J.車款,P=J.塗裝,A=J.加購,FO=J.客製表單,R=J.騎士,Z=rcDom(),d=Z.d,m=K.model,b=[];
  const wr=(v,n)=>{v=Math.max(0,Math.min((1<<n)-1,Math.round(v)||0));for(let i=n-1;i>=0;i--)b.push((v>>i)&1)},w=(v,dom)=>wr(v<0?0:v,rcN(dom));
  const eg=(n,k)=>{n=Math.max(0,Math.round(n));const v=n+Math.pow(2,k);let L=0;while(Math.pow(2,L)<=v)L++;for(let i=0;i<L-k-1;i++)b.push(0);for(let i=L-1;i>=0;i--)b.push(Math.floor(v/Math.pow(2,i))%2)};
  const col=c=>{const q=rcCol(c),n=rcColDom(q[0]);w(q[0],d.ct);if(n)w(q[1],n);return q[0]};
  const gi=GEOS[m]?GEOS[m].findIndex(g=>g.size===K.size):-1;
  w(Z.MK.indexOf(m),d.mk);w(gi<0?7:gi,d.sz);w(FIN_OPTS.findIndex(o=>o[0]===P.fin),d.fin);
  const pa=RC_PS.indexOf(P.paint),ps=pa===0&&P.paintSaved?RC_PS.indexOf(P.paintSaved):0,has=k=>pa===k||ps===k;w(pa,d.pa);if(pa===0)w(ps,d.ps);
  if(has(1))w(P.anoM,d.am);if(has(2)){w(P.anoG,d.ag);wr(P.gRev?1:0,1);wr(P.gCustom?1:0,1);if(P.gCustom)P.gCustom.forEach(v=>wr(v+2048,12))}if(has(3)){w(P.splI,d.sp);w(RC_SZ.indexOf(P.splSz),d.ss)}
  if(col(P.dtCol)===4)wr(P.dtRev?1:0,1);wr(P.logoLinked?1:0,1);if(!P.logoLinked&&col(P.logoCol)===4)wr(P.lgRev?1:0,1);col(P.hsCol);col(P.fkPat);
  w(P.logoFin==='blast'?1:P.logoFin==='std'?2:0,d.lf);w(P.smCol==='d'?0:1+SM_OPTS.findIndex(o=>o[0]===P.smCol),d.sm);
  const bkv=k=>A.bk[k]==null?-1:A.bk[k],add=TI_ITEMS.some(it=>A.ti[it.id])||A.ti.cInt||(A.ti.cLen==null?RC_D0.cLen:A.ti.cLen)!==RC_D0.cLen||BK_POS.some(([k])=>bkv(k)!==-1)||(A.ser==null?RC_D0.ser:A.ser)!==RC_D0.ser;wr(add?1:0,1);
  if(add){TI_ITEMS.forEach((it,i)=>w(A.ti[it.id]||0,Z.T[i]));w(A.ti.cInt||0,d.ci2);w(A.ti.cLen||0,d.cl);BK_POS.forEach(([k])=>w(bkv(k)+1,d.bk));w(A.ser||0,d.se)}
  w(K.hs&&K.hs[m]==='hid'?1:K.hs&&K.hs[m]==='ex'?2:0,d.hs);{const o=twOpts(m),t=K.tw&&K.tw[m];w(t?o.indexOf(t)+1:0,d.tw)}
  w(Z.RK.indexOf(FO.ride),d.rd);w(OPT.brake.indexOf(FO.brake),d.br);w(OPT.tire.indexOf(FO.tire),d.ti);
  const gv=k=>Number.isFinite(FO[k])?FO[k]:SAMPLE[k],geo=RC_GK.some(k=>Math.abs(gv(k)-SAMPLE[k])>.05);wr(geo?1:0,1);
  if(geo){const mi=RC_MM.every(k=>Math.abs(gv(k)-Math.round(gv(k)))<.005);wr(mi?1:0,1);
    RC_GK.forEach(k=>{const dl=gv(k)-SAMPLE[k],ch=Math.abs(dl)>.05;wr(ch?1:0,1);if(!ch)return;const ang=!RC_MM.includes(k);
      if(!ang&&mi)eg(rcZ(Math.round(dl)),2);else eg(rcZ(Math.round(dl*10)),ang?2:4)})}
  ['h','i','a'].forEach(k=>{const ok=Number.isFinite(R[k]);wr(ok?1:0,1);if(ok)eg(rcZ(Math.round(R[k]*2)-RC_RC[k]*2),3)});
  const all=[];const hv=(v,n)=>{for(let i=n-1;i>=0;i--)all.push((v>>i)&1)};hv(RC_V,3);hv(Z.sig,6);all.push(...b);hv(rcCrc(all),8);while(all.length%5)all.push(0);
  let s='';for(let i=0;i<all.length;i+=5)s+=RC_ABC[all[i]<<4|all[i+1]<<3|all[i+2]<<2|all[i+3]<<1|all[i+4]];
  return s.replace(/(.{4})(?=.)/g,'$1-')}
function rcDecode(txt){
  const s=String(txt||'').toUpperCase().replace(/O/g,'0').replace(/[IL]/g,'1').replace(/[^0-9A-Z]/g,'');if(s.length<8)return{err:'參考碼格式錯誤'};
  const a=[];for(const ch of s){const v=RC_ABC.indexOf(ch);if(v<0)return{err:'參考碼格式錯誤'};for(let i=4;i>=0;i--)a.push((v>>i)&1)}
  let p=0;const E={};const rb=n=>{if(p+n>a.length)throw E;let v=0;for(let i=0;i<n;i++)v=v*2+a[p++];return v},r=dom=>{const v=rb(rcN(dom));if(v>=dom)throw E;return v};
  const eg=k=>{let z=0;while(rb(1)===0){if(++z>24)throw E}const n=z+k;let v=1;for(let i=0;i<n;i++)v=v*2+rb(1);return v-Math.pow(2,k)};
  const col=()=>{const t=r(rcDom().d.ct),n=rcColDom(t);return[t,n?r(n):0]};
  try{
    if(rb(3)!==RC_V)return{err:'參考碼版本不符'};const Z=rcDom();if(rb(6)!==Z.sig)return{err:'參考碼版本不符（選項已更新）'};const d=Z.d;
    const o={am:RC_D0.am,ag:RC_D0.ag,sp:RC_D0.sp,ss:RC_D0.ss,gc:null,gRev:false};o.mk=Z.MK[r(d.mk)];const si=r(d.sz);o.fin=FIN_OPTS[r(d.fin)][0];
    const pa=r(d.pa),ps=pa===0?r(d.ps):0,has=k=>pa===k||ps===k;o.pa=RC_PS[pa];o.ps=ps?RC_PS[ps]:null;
    if(has(1))o.am=r(d.am);if(has(2)){o.ag=r(d.ag);o.gRev=!!rb(1);if(rb(1))o.gc=[0,1,2,3].map(()=>rb(12)-2048)}if(has(3)){o.sp=r(d.sp);const ss=r(d.ss);if(ss>2)throw E;o.ss=RC_SZ[ss]}
    const dc=col(),dtRev=dc[0]===4?!!rb(1):false,lk=!!rb(1);let lc=[0,0],lgRev=false;if(!lk){lc=col();if(lc[0]===4)lgRev=!!rb(1)}const hc=col(),fc=col();
    const lf=r(d.lf),sm=r(d.sm);
    const ti={};TI_ITEMS.forEach(it=>{ti[it.id]=0});ti.cInt=0;ti.cLen=RC_D0.cLen;const bk={};BK_POS.forEach(([k])=>{bk[k]=-1});let ser=RC_D0.ser;
    if(rb(1)){TI_ITEMS.forEach((it,i)=>{ti[it.id]=r(Z.T[i])});ti.cInt=r(d.ci2);ti.cLen=r(d.cl);BK_POS.forEach(([k])=>{bk[k]=r(d.bk)-1});ser=r(d.se)}
    const hs=r(d.hs),tw=r(d.tw),ride=Z.RK[r(d.rd)],brake=OPT.brake[r(d.br)],tire=OPT.tire[r(d.ti)];
    const FO={ride,brake,tire};RC_GK.forEach(k=>{FO[k]=SAMPLE[k]});
    if(rb(1)){const mi=!!rb(1);RC_GK.forEach(k=>{if(!rb(1))return;const ang=!RC_MM.includes(k),dl=(!ang&&mi)?rcUZ(eg(2)):rcUZ(eg(ang?2:4))/10;FO[k]=Math.round((SAMPLE[k]+dl)*10)/10})}
    const R={};['h','i','a'].forEach(k=>{R[k]=rb(1)?RC_RC[k]+rcUZ(eg(3))/2:null});
    const body=a.slice(0,p),crc=rb(8);if(crc!==rcCrc(body))return{err:'參考碼檢查碼不符，請確認是否抄錯'};if(a.length-p>=5||a.slice(p).some(x=>x))throw E;
    const J=cfgGather();delete J.畫質;const K={model:o.mk,size:null,hs:{},tw:{}};
    const szs=GEOS[o.mk];if(szs&&si<szs.length)K.size=szs[si].size;if(hs)K.hs[o.mk]=hs===1?'hid':'ex';if(tw){const op=twOpts(o.mk);if(tw>op.length)throw E;K.tw[o.mk]=op[tw-1]}
    const cs=q=>rcColS(q[0],q[1]);
    J.車款=K;J.塗裝={fin:o.fin,paint:o.pa,paintSaved:o.ps,anoM:o.am,anoG:o.ag,splI:o.sp,splSz:o.ss,gCustom:o.gc,gRev:o.gRev,dtCol:cs(dc),dtRev,logoFin:lf===1?'blast':lf===2?'std':null,logoLinked:lk,logoCol:lk?'ti':cs(lc),lgRev,hsCol:cs(hc),smCol:sm?SM_OPTS[sm-1][0]:'d',fkPat:cs(fc)};
    J.加購={ti,bk,ser};J.客製表單=FO;J.騎士=R;return{J}
  }catch(e){return{err:e===E?'參考碼無法解讀':'參考碼無法解讀（'+(e&&e.message||e)+'）'}}}
window.__RC={enc:rcEncode,dec:rcDecode,gather:cfgGather,apply:cfgApply};
/* 配置圖卡：直式 4:5（1080×1350）。3D 以全車側視離屏 2× 渲染後縮到 1080 寬；其餘用 2D 畫布排版；顏色與明暗跟隨目前主題。 */
function rcShot(CW,CH,S){
  const w0=stage.clientWidth,h0=stage.clientHeight,p0=camera.position.clone(),a0=camera.aspect,o0=OLskip;
  const t=Math.tan(15*Math.PI/180),asp=CW/CH,r=Math.max(2.1,.86/(.88*t*asp),.5/(.82*t)),th=homeTh(false,homeFlip),tg=new V3(0,.5,0);
  renderer.setPixelRatio(S);renderer.setSize(CW,CH,false);camera.aspect=asp;camera.clearViewOffset();camera.updateProjectionMatrix();
  camera.position.set(tg.x+r*Math.sin(th),tg.y,tg.z+r*Math.cos(th));camera.lookAt(tg);camera.updateMatrixWorld(true);
  const hid=[];scene.children.forEach(o=>{if(o.visible&&((o.renderOrder>=19&&o.renderOrder<=22)||(typeof HS!=='undefined'&&HS.some(h=>h.g===o))||(typeof gradGrp!=='undefined'&&o===gradGrp)||o===STU.mesh)){hid.push(o);o.visible=false}});/* 尺寸線、疊圖比較、扭力熱點、漸層軸線不進圖卡；v199zzzzzz112：攝影棚也不進（圖卡維持 CSS 漸層底） */
  OLskip=false;let c=null;try{drawFrame();c=document.createElement('canvas');c.width=CW;c.height=CH;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(renderer.domElement,0,0,CW*S,CH*S,0,0,CW,CH)}catch(e){console.warn('card shot',e)}
  hid.forEach(o=>{o.visible=true});OLskip=o0;sizeCanvas(true);camera.aspect=a0;camera.updateProjectionMatrix();camera.position.copy(p0);wk();return c}
async function rcCard(){
  const CW=1080,CH=1350,IH=600,IY=206,css=getComputedStyle(document.documentElement),cv=n=>css.getPropertyValue(n).trim(),sf=(f,d)=>{try{return f()}catch(e){return d}};
  const code=rcEncode(),J=cfgGather(),shot=rcShot(CW,IH,2);if(!shot)return null;
  const c=document.createElement('canvas');c.width=CW;c.height=CH;const x=c.getContext('2d'),ff=getComputedStyle(document.body).fontFamily||'sans-serif',mono='ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
    top=cv('--stage-top')||'#ede6d2',bot=cv('--stage-bot')||'#cfc4a8',ink=cv('--text-strong')||cv('--text-primary')||'#1c1a10',mut=cv('--text-muted')||'#6b6b64',acc=cv('--accent')||'#b85a28',dk=isDark();
  const g=x.createLinearGradient(0,0,0,CH);g.addColorStop(0,top);g.addColorStop(1,bot);x.fillStyle=g;x.fillRect(0,0,CW,CH);
  x.drawImage(shot,0,IY);
  /* 品牌標誌：與頁首相同的處理（淺色主題＝整體壓暗，保留左上橘色小標） */
  await new Promise(ok=>{const u=/url\((['"]?)(.*?)\1\)/.exec(cv('--logo'));if(!u){ok();return}const im=new Image();im.onload=()=>{try{const LH=54,LW=LH*im.naturalWidth/im.naturalHeight,t=document.createElement('canvas');t.width=Math.round(LW*2);t.height=Math.round(LH*2);const q=t.getContext('2d');q.drawImage(im,0,0,t.width,t.height);
      if(!dk){q.globalCompositeOperation='source-atop';q.fillStyle='rgba(0,0,0,.726)';q.fillRect(0,0,t.width,t.height);q.globalCompositeOperation='source-over';const sx=im.naturalWidth*.125,sw=im.naturalWidth*.1,sh=im.naturalHeight*.2;q.clearRect(sx/im.naturalWidth*t.width,0,sw/im.naturalWidth*t.width,sh/im.naturalHeight*t.height);q.drawImage(im,sx,0,sw,sh,sx/im.naturalWidth*t.width,0,sw/im.naturalWidth*t.width,sh/im.naturalHeight*t.height)}
      x.drawImage(t,Math.round((CW-LW)/2),64,LW,LH)}catch(e){}ok()};im.onerror=()=>ok();im.src=u[2]});
  x.textBaseline='alphabetic';x.textAlign='left';
  const K=J.車款,nm=(MNAME[K.model]||'')+(GEOS[K.model]?'・'+K.size:'');x.fillStyle=ink;x.letterSpacing='-1.5px';x.font='600 46px '+ff;let fs=46;while(x.measureText(nm).width>CW-128&&fs>30){fs-=2;x.font='600 '+fs+'px '+ff}x.textAlign='center';x.fillText(nm,CW/2,186);x.textAlign='left';x.letterSpacing='0px';
  const rows=[];if(sf(finOk,false))rows.push(['表面處理',sf(finLabel,'')]);if(sf(paintOk,false))rows.push(['車架顏色',sf(paintLabel,'').split('（')[0]]);if(sf(hsOk,false))rows.push(['座管束・頭碗組',sf(hsLabel,'').split('（')[0]]);
  const ad=sf(addonRows,[]).filter(q=>q[0]!=='加購');if(ad.length)rows.push(['加購',ad.map(q=>q[0]).join('、')]);
  const FO=J.客製表單;if(RC_GK.some(k=>Number.isFinite(FO[k])&&Math.abs(FO[k]-SAMPLE[k])>.05))rows.push(['幾何客製','REACH '+FO.reach+'｜STACK '+FO.stack+'｜HTA '+FO.hta+'°']);
  const wrap=(s,mw,n)=>{const o=[];while(s&&o.length<n){let k=s.length;while(k>1&&x.measureText(s.slice(0,k)).width>mw)k--;if(k<s.length&&o.length===n-1){let t=s.slice(0,k);while(t.length>1&&x.measureText(t+'…').width>mw)t=t.slice(0,-1);o.push(t+'…');s='';break}o.push(s.slice(0,k));s=s.slice(k)}return o};
  const LBW=236;x.font='30px '+ff;rows.forEach(q=>{q[2]=wrap(q[1],CW-128-LBW,2)});const vW=Math.max(0,...rows.flatMap(q=>q[2].map(t=>x.measureText(t).width))),bx=Math.round((CW-(LBW+vW))/2);/* 中間文本區塊（標籤＋內容）整塊置中 */
  const lines=[];{const gs=code.split('-'),per=8;for(let i=0;i<gs.length;i+=per)lines.push(gs.slice(i,i+per).join('-'))}
  const codeH=lines.length*46,footTop=CH-56-codeH-64,rowsTop=IY+IH+44,nL=rows.reduce((a,q)=>a+q[2].length,0),lh=Math.min(46,Math.floor((footTop-rowsTop-8*rows.length)/Math.max(1,nL)));let yy=rowsTop;
  rows.forEach(q=>{const y=yy+30;x.fillStyle=mut;x.font='26px '+ff;x.fillText(q[0],bx,y);x.fillStyle=ink;x.font='30px '+ff;q[2].forEach((t,j)=>x.fillText(t,bx+LBW,y+j*lh));yy+=q[2].length*lh+8});
  x.strokeStyle=mut;x.globalAlpha=.35;x.lineWidth=2;x.beginPath();x.moveTo(64,footTop);x.lineTo(CW-64,footTop);x.stroke();x.globalAlpha=1;
  x.textAlign='center';x.fillStyle=mut;x.font='24px '+ff;x.fillText('參考碼',CW/2,footTop+42);x.fillStyle=acc;x.font='600 34px '+mono;lines.forEach((l,i)=>x.fillText(l,CW/2,footTop+42+16+(i+1)*46-8));x.textAlign='left';
  return c}
(function(){
  const ov=document.createElement('div');ov.id='rcOv';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','配置圖卡');
  ov.style.cssText='display:none;position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;box-sizing:border-box';/* v199zzzzzz96：調暗之外再加毛玻璃（使用者 2026-11-18）；模糊 14px 與開場毛玻璃一致，底色由 .62 降到 .5，免得疊起來太暗 */
  ov.innerHTML='<img id="rcImg" alt="配置圖卡" style="max-width:min(100%,640px);max-height:74vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.4)"><div class="row" style="justify-content:center"><button class="btn" id="rcDl" type="button">下載圖卡</button><button class="btn" id="rcRcCp" type="button">複製參考碼</button><button class="btn" id="rcSh" type="button" hidden>分享</button><button class="btn" id="rcX" type="button">關閉</button></div>';/* v199zzzzzz96：膠囊列加「複製參考碼」；「長按或右鍵可另存圖片」整行移除；PNG 改 JPG、鈕名改「下載圖卡」（使用者 2026-11-18） */
  {const stl=document.createElement('style');stl.textContent='#rcOv .btn{color:#fff;border-color:rgba(255,255,255,.55);background:rgba(255,255,255,.08)}#rcOv .btn:hover{background:rgba(255,255,255,.18)}#rcOv .row{flex-wrap:wrap;gap:8px}#rcOv .fine{color:#fff;margin:0;min-height:1.2em}';document.head.appendChild(stl)}document.body.appendChild(ov);const img=ov.querySelector('#rcImg'),dl=ov.querySelector('#rcDl'),sh=ov.querySelector('#rcSh');let blob=null,url='';
  const close=()=>{ov.style.display='none';window.VIBE_MODAL.pop('rc');if(url){URL.revokeObjectURL(url);url=''}img.removeAttribute('src');blob=null};
  ov.querySelector('#rcX').onclick=close;ov.addEventListener('pointerdown',e=>{if(e.target===ov)close()});
  const fn=()=>'VIBE配置圖卡_'+qpStamp()+'.jpg';/* v199zzzzzz96：JPG（圖卡本身整張都畫了漸層底，沒有透明區，換 JPG 不掉資訊，檔案小很多） */
  dl.onclick=()=>{if(!blob)return;const a=document.createElement('a');a.href=url;a.download=fn();document.body.appendChild(a);a.click();a.remove()};
  sh.onclick=async()=>{if(!blob)return;try{await navigator.share({files:[new File([blob],fn(),{type:'image/jpeg'})],title:'VIBE 配置圖卡'})}catch(e){}};
  const ta=document.getElementById('cfgTa'),msg=document.getElementById('cfgMsg'),inp=document.getElementById('cfgRc'),inI=document.getElementById('cfgRcIn');if(!msg||!inp)return;
  const say=t=>{msg.textContent=t},refresh=()=>{try{inp.value=rcEncode()}catch(e){inp.value=''}};
  ['click','input','change'].forEach(e=>window.addEventListener(e,()=>setTimeout(refresh,60),{passive:true}));refresh();setInterval(()=>{if(document.getElementById('cfgBox').offsetParent)refresh()},1500);
  document.getElementById('cfgRcCp').onclick=async()=>{refresh();let ok=false;try{await navigator.clipboard.writeText(inp.value);ok=true}catch(e){}if(!ok){inp.focus();inp.select();try{ok=document.execCommand('copy')}catch(e){}}say(ok?'已複製參考碼':'此環境無法直接複製，請全選欄位內容複製')};
  document.getElementById('cfgRcAp').onclick=()=>{const t=inI.value;if(!t.trim()){say('請先貼上參考碼');return}const q=rcDecode(t);if(q.err){say(q.err);return}let sk;try{sk=cfgApply(q.J)}catch(e){say('還原失敗：'+(e&&e.message||e));return}say(sk.length?'已用參考碼還原，略過 '+sk.length+' 項：'+sk.slice(0,6).join('、'):'已用參考碼還原');setTimeout(refresh,200)};
  document.getElementById('cfgCard').onclick=async()=>{say('產生圖卡中…');try{const c=await rcCard();if(!c){say('此環境無法產生圖卡');return}
      await new Promise(ok=>c.toBlob(b=>{blob=b;ok()},'image/jpeg',.92));if(!blob){say('此環境無法產生圖卡');return}if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);img.src=url;
      sh.hidden=!(navigator.canShare&&sf0());{const q=document.getElementById('rcMsg');if(q)q.textContent=''}/* 每次開啟圖卡先清掉上次的複製訊息 */ov.style.display='flex';window.VIBE_MODAL.push('rc',close);say('')}catch(e){say('產生圖卡失敗：'+(e&&e.message||e))}};
  const sf0=()=>{try{return navigator.canShare({files:[new File([blob],'a.jpg',{type:'image/jpeg'})]})}catch(e){return false}};
  /* 圖卡視窗內的「複製參考碼」：與設定區那顆同一條路徑（refresh→clipboard→退回選取複製），訊息改顯示在圖卡視窗內，關閉時清掉 */
  {const m2=document.createElement('div');m2.id='rcMsg';m2.className='fine';m2.setAttribute('role','status');m2.setAttribute('aria-live','polite');ov.appendChild(m2);
   ov.querySelector('#rcRcCp').onclick=async()=>{const el=document.getElementById('cfgRc');let v='';try{v=rcEncode()}catch(e){v=el?el.value:''}if(el)el.value=v;
     let ok=false;try{await navigator.clipboard.writeText(v);ok=true}catch(e){}
     if(!ok&&el){el.focus();el.select();try{ok=document.execCommand('copy')}catch(e){}}
     m2.textContent=ok?'已複製參考碼':'此環境無法直接複製，請到「3D 設定檔」區全選參考碼複製'};
  }
})();
(function(){const ta=document.getElementById('cfgTa'),msg=document.getElementById('cfgMsg');if(!ta||!msg)return;
  const say=t=>{msg.textContent=t},mk=()=>{const t=cfgMD();ta.value=t;return t};
  const run=t=>{const r=cfgParse(t);if(r.err){say(r.err);return}let sk;try{sk=cfgApply(r.J)}catch(e){say('套用失敗：'+(e&&e.message||e));return}
    say(sk.length?'已套用 3D 設定，略過 '+sk.length+' 項無效設定：'+sk.slice(0,6).join('、')+(sk.length>6?'⋯':''):'已套用 3D 設定')};
  document.getElementById('cfgCp').onclick=async()=>{const t=mk();let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){}if(!ok){ta.focus();ta.select();try{ok=document.execCommand('copy')}catch(e){}}say(ok?'已複製':'此環境無法直接複製，請全選文字框內容複製')};
  document.getElementById('cfgDl').onclick=async()=>{const t=mk(),fn='VIBE3D設定檔_'+qpStamp()+'.md';let ok=false;
    try{const dl=window.claude&&claude.use?await claude.use('downloads'):null;if(dl){await dl.save({filename:fn,data:t});ok=true;say('已送出儲存：'+fn)}}catch(e){if(e&&e.code==='declined'){ok=true;say('已取消')}}
    if(!ok){try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/markdown;charset=utf-8'}));a.download=fn;document.body.appendChild(a);a.click();a.remove();ok=true;say('已下載：'+fn)}catch(e){}}
    if(!ok)say('此環境無法下載，請從文字框全選複製')};
  document.getElementById('cfgPs').onclick=async()=>{let t='';try{t=await navigator.clipboard.readText()}catch(e){}
    if(!t||!t.trim()){ta.focus();say('瀏覽器不允許直接讀取剪貼簿：請在文字框貼上內容，再按「套用文字框」');return}ta.value=t;run(t)};
  document.getElementById('cfgAp').onclick=()=>{const t=ta.value;if(!t.trim()){say('文字框是空的');return}run(t)};})();

/* ===== 扭力巡檢（遊戲） ===== */
const plist=document.getElementById('plist'),card=document.getElementById('card'),MAX=60;
function renderList(){plist.innerHTML='';PARTS.forEach(p=>{const s=st[p.id],li=document.createElement('li'),b=document.createElement('button');
  b.innerHTML=`<span class="dot ${s.done?(s.pts===3?'ok':'part'):''}"></span><span>${p.name}</span><span class="pts num">${s.done?s.pts+' / 3':''}</span>`;
  b.onclick=()=>{if(sel===p&&!wrap.hidden){closeCard();scResume()}else{scUser('巡檢清單',true);openPart(p)}};/* v199zzzzzz97：清單也改成再按一下收起（使用者 2026-11-18：右側清單點選後關不掉） */li.appendChild(b);plist.appendChild(li)})}
function updScore(){let sc=0,dn=0;PARTS.forEach(p=>{sc+=st[p.id].pts;if(st[p.id].done)dn++});document.getElementById('sc').textContent=sc;document.getElementById('dn').textContent=dn}
function closeCard(){wrap.hidden=true;sel=null;paintHS()}
const head=(p,x='')=>`<h3><span>${p.name}</span>${x}<button class="btn close x" data-act="close" aria-label="收起" title="收起"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg></button></h3><div class="meta">工具：${p.tool}</div>`;
function openPart(p){if(!FOLD.tq&&window.__fold)window.__fold('tq',true);/* v199zzzzzz130：從其他入口開巡檢點時自動展開清單（橘點才看得到） */sel=p;const h=HS.find(x=>x.p===p);focus(h.g.position.clone());paintHS();wrap.hidden=false;
  if(st[p.id].done){showResult(p);return}
  card.innerHTML=head(p)+`<p class="q">這個位置要用扭力板手鎖到指定值嗎？</p><div class="row"><button class="btn solid" data-act="yes">要，設定扭力值</button><button class="btn" data-act="no">不用，靠手感</button></div>`;bind()}
function bind(){card.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act))}
function act(a){const p=sel;if(!p)return;const s=st[p.id];
  if(a==='close'){closeCard();scResume();return}
  if(a==='hint'){hint=!hint;showWrench(p,s.decision==='no',true);return}
  if(a==='next'){const nx=PARTS.find(q=>!st[q.id].done);if(nx)openPart(nx);else{closeCard();goHome();showTable(true)}return}
  if(a==='yes'||a==='no'){s.decision=a;if(!p.need){s.done=true;s.pts=a==='no'?3:0;finish2(p);return}if(a==='yes')s.pts=1;showWrench(p,a==='no');return}
  if(a==='lock')lock(p)}
function gaugeSVG(p){const cx=110,cy=112,R=92,Pt=(val,r)=>{const d=Math.PI*(1-val/MAX);return[cx+r*Math.cos(d),cy-r*Math.sin(d)]};
  let s=`<svg viewBox="0 0 220 128" role="slider" tabindex="0" aria-label="扭力指針" aria-valuemin="0" aria-valuemax="${MAX}" aria-valuenow="0"><path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" fill="none" stroke="var(--track)" stroke-width="10" stroke-linecap="round"/>`;
  if(hint){const a=Pt(p.lo,R),b=Pt(p.hi,R);s+=`<path d="M${a[0]} ${a[1]} A${R} ${R} 0 0 1 ${b[0]} ${b[1]}" fill="none" stroke="var(--c-accent-500)" stroke-width="10" opacity=".55"/>`}
  for(let x=0;x<=MAX;x+=5){const a=Pt(x,R-10),b=Pt(x,R-(x%10?15:20));s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="var(--text-muted)" stroke-width="${x%10?1:1.6}"/>`;
    if(x%10===0){const t=Pt(x,R-31);s+=`<text x="${t[0]}" y="${t[1]+4}" text-anchor="middle" font-size="11" fill="var(--text-muted)" font-family="Barlow Condensed,sans-serif">${x}</text>`}}
  return s+`<g id="needle" style="transition:transform .25s ease-out;transform-origin:${cx}px ${cy}px;transform:rotate(-90deg)"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-R+16}" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy-R+16}" r="6.5" fill="var(--accent)" stroke="var(--surface-card)" stroke-width="2"/><circle cx="${cx}" cy="${cy-R+16}" r="16" fill="transparent"/></g><circle cx="${cx}" cy="${cy}" r="6" fill="var(--accent)"/></svg>`}
function showWrench(p,wrongNo,keep){card.innerHTML=head(p,`<button class="btn ht" data-act="hint" aria-pressed="${hint}">範圍提示</button>`)+(wrongNo?`<div class="verdict"><b>這個位置需要扭力板手。</b>憑手感很難穩定落在範圍內，繼續設定看看。</div>`:'')+
  `<p class="q c">把扭力板手設定到幾 Nm？</p><div class="gauge">${gaugeSVG(p)}<div class="gctl"><button class="btn" data-step="-0.5" aria-label="減 0.5">−</button><div class="readout"><b class="num" id="rv">—</b><span>Nm</span></div><button class="btn" data-step="0.5" aria-label="加 0.5">＋</button></div></div>
   <div class="row"><button class="btn solid" data-act="lock" id="lockBtn" disabled><span class="wrench" id="wr">🔧</span> 鎖上</button></div>`;
  bind();let touched=false,cur=0;
  const set=(x,u=1)=>{x=Math.max(0,Math.min(MAX,Math.round(x/u)*u));cur=x;touched=true;document.getElementById('rv').textContent=fmt(x);
    document.getElementById('needle').style.transform=`rotate(${-90+x/MAX*180}deg)`;svg.setAttribute('aria-valuenow',x);document.getElementById('lockBtn').disabled=false;st[p.id].val=x};
  const svg=card.querySelector('.gauge svg'),nd=document.getElementById('needle');
  const fromPt=e=>{const r=svg.getBoundingClientRect(),k=220/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;let a=Math.atan2(112-y,x-110);if(y>112)a=x<110?Math.PI:0;return(1-Math.max(0,Math.min(Math.PI,a))/Math.PI)*MAX};
  let drag=false;svg.addEventListener('pointerdown',e=>{e.stopPropagation();drag=true;nd.style.transition='none';svg.setPointerCapture(e.pointerId);set(fromPt(e))});
  svg.addEventListener('pointermove',e=>{if(drag)set(fromPt(e))});
  const end=()=>{drag=false;nd.style.transition=''};svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
  svg.addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1}[e.key];if(d){e.preventDefault();set(cur+d,.5)}});
  card.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>set(cur+(+b.dataset.step),.5));if(keep&&st[p.id].val!=null)set(st[p.id].val,.5)}
let actx=null;
function clickSound(){try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();const n=actx.createBuffer(1,actx.sampleRate*.04,actx.sampleRate),d=n.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,6);const s=actx.createBufferSource();s.buffer=n;const f=actx.createBiquadFilter();f.type='highpass';f.frequency.value=1800;s.connect(f);f.connect(actx.destination);s.start()}catch(e){}}
function lock(p){const s=st[p.id];if(s.val==null)return;document.getElementById('lockBtn').disabled=true;document.getElementById('wr').classList.add('go');clickSound();
  setTimeout(()=>{const x=s.val,tol=Math.max(1,p.hi*.15);if(x>=p.lo&&x<=p.hi)s.pts+=2;else if(x>=p.lo-tol&&x<=p.hi+tol)s.pts+=1;s.done=true;finish2(p)},340)}
function finish2(p){paintHS();renderList();updScore();showResult(p)}
function fmt(x){return(+x).toFixed(1).replace(/\.0$/,'')}
function showResult(p){const s=st[p.id];let h=head(p);
  if(!p.need){h+=s.decision==='no'?`<div class="verdict ok"><b>對，這裡靠手感。</b></div>`:`<div class="verdict"><b>這裡不用鎖到扭力值。</b></div>`;h+=`<p class="note">${p.trap}</p>`}
  else{const x=s.val,inR=x>=p.lo&&x<=p.hi;
    h+=inR?`<div class="verdict ok"><b>${fmt(x)} Nm，落在建議範圍 ${p.lo}–${p.hi} Nm。</b></div>`:`<div class="verdict"><b>${fmt(x)} Nm，建議範圍是 ${p.lo}–${p.hi} Nm。</b></div>`;
    if(!inR)h+=`<p class="note"><em>${x<p.lo?'偏鬆':'偏緊'}的話：</em>${x<p.lo?p.low:p.high}</p>`;else h+=`<p class="note"><em>偏鬆：</em>${p.low}</p><p class="note"><em>偏緊：</em>${p.high}</p>`;
    if(p.tip)h+=`<p class="note">${p.tip}</p>`}
  if(p.ti)h+=`<p class="note"><em>鈦車：</em>${p.ti}</p>`;
  const left=PARTS.filter(q=>!st[q.id].done).length;
  h+=`<p class="fine">本點得分 ${s.pts} / 3。零件或車架上有印數值時，以印的為準。</p><div class="row" style="margin-top:10px"><button class="btn solid" data-act="next">${left?'下一個點':'看總表'}</button></div>`;
  card.innerHTML=h;bind()}
const tm=document.getElementById('tableModal');
function showTable(end){const body=document.getElementById('tblBody');body.innerHTML='';let sc=0;
  PARTS.forEach(p=>{const s=st[p.id];sc+=s.pts;const tr=document.createElement('tr');const yours=!s.done?'—':(!p.need?(s.decision==='no'?'手感 ✓':'設定扭力'):fmt(s.val)+' Nm');
    tr.innerHTML=`<td>${p.name}</td><td style="text-align:left" class="num">${p.need?p.lo+'–'+p.hi+' Nm':p.ref}</td><td style="text-align:left">${p.tool}</td><td style="text-align:left">${yours}</td>`;body.appendChild(tr)});
  document.getElementById('tblTitle').textContent=end?'巡檢完成':'扭力參考表';
  document.getElementById('tblHead').innerHTML=end?`<p style="margin:6px 0 4px"><span class="big num">${sc}</span> <span class="num" style="color:var(--text-muted)">/ 48</span></p><p class="note">${sc>=42?'這台車可以放心出門了。':sc>=30?'大部分到位，回頭看看差一點的那幾顆。':'對照下表再巡一次，數字會越來越熟。'}${hint?'（本輪開著範圍提示）':''}</p>`:'';
  document.getElementById('againRow').hidden=!end;tm.hidden=false}
document.getElementById('tableBtn').onclick=()=>showTable(false);document.getElementById('tblClose').onclick=()=>tm.hidden=true;
document.getElementById('againBtn').onclick=()=>{PARTS.forEach(p=>st[p.id]={done:false,pts:0,val:null,decision:null});tm.hidden=true;paintHS();renderList();updScore();goHome()};
const hintBtn=null;

/* ===== 爆炸圖（拆解）v199zzzzzz92 =====
   扭力巡檢分頁的「拆解」鈕：依使用者 2026-11-17 第四輪指示，分五個階段演出（總長 EX_MS ms），扭力橘點跟著所屬群組走；再按一次復原。
   階段（主進度 t 線性 0→1，各群組在自己的時間窗內再 EZ 緩動；時間窗刻意大幅重疊，動作才連得上、不像機械節點逐段啟停；
   EZ 用 smootherstep，兩端的速度與加速度都為零，接起來沒有折點）：
     ① 抽貫通軸 ② 前後輪往前後平移 ③ 車架組往上並稍微往後（斜上角度），上移量＝1/6 輪直徑
     ④ 同時前叉帶著下碗組沿轉向軸往外滑出 HS_GAP（世界座標是稍微往前往上），其餘零件繼續分開 ⑤ 車架到位後曲柄往外、座管往上拔。
   復原時 t 反向跑，順序自動倒過來＝先裝座管曲柄、再降車架、再合輪、最後插軸。
   前叉與車架的相對位移恆為「HS_GAP×轉向軸方向」，所以轉向管全程都在頭管軸心的延長線上滑動，與兩者各自的時間窗無關。
   完成時下碗組與頭管的間距＝上碗組與頭管的間距＝HS_GAP。
   v92 對位（使用者 2026-11-18）：完成時車架頭管軸心的延長線要穿過前輪軸心、後上叉的延長線要穿過後輪軸心。
   做法：輪組只做水平移動，所以「輪相對車架的位移」必須平行於各自的安裝軸線——前輪沿頭管軸、後輪沿後上叉（SSst→RA，該線本來就通過後軸）。
   由此解出輪組行程（每幀依目前車款尺寸的節點重算，不是寫死的常數）：
     前輪前移 ＝ 上移量 × (頭管軸水平/垂直比) − 車架後移量
     後輪後移 ＝ 上移量 × (後上叉水平/垂直比) ＋ 車架後移量
   所以上移量是唯一的槓桿：拉高 → 輪組跟著拉開、縫同步變大。1/8 輪直徑時前輪只前移 18 mm、叉尖離輪軸只剩 35 mm，太擠，故改 1/6。
   車架上移的做法：bike 是所有零件的父節點，直接把 bike 往上移，再讓「不上移」的群組在自己的位移裡扣回 Lv——
   這樣不必列舉車架本體的每一根管件，新增零件也不會漏掉。熱點在場景層、不是 bike 的子物件，所以另算世界位移 wf（見 pass）。
   做法：不重新掛載父子（outRoots／批次／實例化白名單皆依物件本身，故不受影響），只在每幀主繪製前改 position。
   位置基準以 {base,last} 追蹤：外部（applyNodes、placeHS、seatFitPost…）改過位置就重設基準，避免位移被重複累加或被覆寫。
   必須在 drawFrame 的 instSync／btSync 之前執行，實例化與批次網格才會讀到移動後的世界矩陣。 */
(function(){
  const EX_MS=2100,EZ=k=>k*k*k*(k*(k*6-15)+10),V=(x,y,z)=>new THREE.Vector3(x,y,z);/* smootherstep：兩端一階、二階導數皆為 0 */
  const nz=(a,b,f)=>{const v=new THREE.Vector3().subVectors(a,b);return v.lengthSq()<1e-9?f:v.normalize()};
  const axSeat=()=>(T.post&&G.bb)?nz(T.post.position,G.bb.position,V(0,1,0)):V(0,1,0);/* 座管軸：五通→座管 */
  const axHead=()=>(G.stemStd&&G.crown)?nz(G.stemStd.position,G.crown.position,V(0,1,0)):V(0,1,0);/* 轉向軸：前叉肩→龍頭（向上） */
  const dn=()=>axHead().multiplyScalar(-1);
  const CRK=['crkNewG','crkGrvG','crkF1G','crkTiG','crkAudG','crkSerG'],CRK_MM=78,CRKL_MM=72,STEM_MM=80,CAP_MM=112,BAR_X=56,HS_GAP=55,BACK_MM=11,AX_GAP=26;
  /* HS_GAP：前叉（帶著下碗組）沿轉向軸滑出的距離，也是上碗組往上離開頭管的距離——兩者相等，完成時頭管上下兩端的縫一樣寬。
     BACK_MM：車架上移時同時往後的量，用來做出斜上角度；要小於 HS_GAP×轉向軸的水平分量（約 0.31×HS_GAP），否則前叉在世界座標會變成往後而不是往前。
     STEM_MM／CAP_MM 隨 HS_GAP 一起加大：上碗組往上走 HS_GAP 之後會頂到龍頭，龍頭與上蓋要讓開。
     AX_GAP：貫通軸完全抽出後，軸尖離最近孔洞外緣的間距。 */
  /* 各階段的時間窗（主進度 t 的區間）。重疊很大是刻意的：動作要互相接續，不是一段停了才換下一段 */
  const PH_AX=[0,.28],PH_WH=[.18,.74],PH_UP=[0,.80],PH_FK=[.12,.84],PH_MID=[.10,.85],PH_END=[.40,1];/* v199zzzzzz99a：後輪一步到位（使用者 2026-11-18：不是兩段式），沿用 PH_WH，終點即後上叉延長線；曾有的第二段 PH_WR 已刪。 *//* v199zzzzzz94：改為「提升與炸開同時進行」（使用者 2026-11-18）。車架上移 PH_UP 由 [.38,.86] 提前到 **[0,.80]**，與其餘零件一起起步。
     唯一保留的先後是**貫通軸必須先離開勾爪**，輪組才能平移，否則兩者會互穿：PH_AX [0,.28]、PH_WH 從 .18 才起步（此時軸已抽出約七成）。
     曲柄外移與座管上拔（PH_END）起點由 .74 提前到 .40——仍然最後收尾（符合實際組裝順序的反向），但不再等車架到頂才動。 */
  const LIFT_ADD=.075;/* v199zzzzzz95：使用者 2026-11-18——v94 的 150 mm 太高，減半為 75 mm。M 尺寸 325Ti 總上移量＝1/6 輪直徑 114.7＋75＝189.7 mm */
  const liftM=()=>((N&&N.R?N.R:350)/1000)/3+LIFT_ADD;/* 車架組上移量＝1/6 輪直徑（輪半徑的 1/3，n.R 為外胎半徑 mm）＋LIFT_ADD。M 尺寸 325Ti 實測 114.7＋150＝264.7 mm。v90＝1/4 輪直徑、v91＝1/8、v92＝1/6 */
  /* v199zzzzzz94：**後上叉對位鎖點已刪除**（使用者 2026-11-18）。原本後輪後移量由「後上叉延長線穿過後軸」解出，使得上移量一拉高、後輪就被迫同步拉開，上移量因此成了唯一槓桿、拉不動。
     現在只保留前輪的對位：頭管軸心的延長線沿著前叉仍指向前輪軸心（差的只有前叉偏移量 rake，與未拆解時相同），因為那條線就是前叉本身的方向，看起來才像裝得回去。
     後輪改為與前輪等量反向（再加上車架後移量 BACK_MM），兩輪對車身左右對稱地讓開，與上移量脫鉤。rR() 連同它的退回值 .812 一併刪除。
     對位比例：水平/垂直，前輪＝頭管軸（HTb→HTt）。量不到就退回 M 尺寸 325Ti 的實測值 .335 */
  const rF=()=>{try{const d=[N.HTt.x-N.HTb.x,N.HTt.y-N.HTb.y];const r=-d[0]/d[1];return(r>.1&&r<1)?r:.335}catch(e){return .335}};
  /* v199zzzzzz99（使用者 2026-11-18）：炸開後，後輪組再往後移，直到後軸心落在「後上叉延長線」上（該線＝SSst→RA0，隨車架上移／後移）。
     車架位移 (−BACK, L) 後，該線在軸心高度的水平位置＝RA.x − BACK − L×rS（rS＝後上叉水平/垂直比），故總後移＝L×rS＋BACK。
     v99a 改為一步到位：整段後移都在 PH_WH，終點＝L×rS＋BACK（前輪仍是 L×rF−BACK）。量不到 rS 時退回 .812（M 尺寸 325Ti 實測）。 */
  const rS=()=>{try{const a=N.SSst,b=N.RA0||N.RA,dy=a.y-b.y,r=(a.x-b.x)/dy;return(dy>1&&r>.3&&r<2)?r:.812}catch(e){return .812}};
  const whF=()=>liftM()*rF()-BACK_MM/1000;/* 前輪前移量 */
  const whR=()=>liftM()*rS()+BACK_MM/1000;/* v199zzzzzz99a：一步到位＝L×rS＋BACK（後軸心終點落在後上叉延長線上） *//* 後輪後移量＝前輪前移量＋2×BACK_MM（兩輪等量反向讓開；見上方說明） */
  const liftV=()=>V(-BACK_MM/1000,liftM(),0);/* 車架位移：往上並稍微往後 */
  /* 貫通軸手柄在哪一側：取手柄實例化網格頂點 z 的平均值；判不出來就當非驅動側（−z，手柄慣例位置） */
  let hdlS=0;
  const hdlSide=()=>{if(hdlS)return hdlS;try{const a=G.hdlI.geometry.attributes.position.array;let t=0,n=0;for(let i=2;i<a.length;i+=48){t+=a[i];n++}
    hdlS=(n&&Math.abs(t/n)>.005)?(t/n<0?-1:1):-1}catch(e){hdlS=-1}return hdlS};
  /* 左曲柄臂：先找曲柄群組內「整件都在非驅動側」的網格（bike 座標 z 上界 < −20 mm）。
     系列曲柄組把左右臂合併在同一網格，挑不出整件時改用索引切割：該網格的三角形若無一跨越中線（實測 crkSerG 為 0 件），
     就依三角形所在側切成左／右兩份索引（共用同一份頂點屬性），原網格改用右份、另立一個左份網格掛回同一群組。
     切完要重跑 tagOutline 與 btBuild，新網格才有輪廓線並重新納入批次。 */
  const splitOne=(c,dz)=>{const q=c.geometry;if(!q||!q.index||!q.attributes.position)return null;if(q.groups&&q.groups.length>1)return null;
    const pa=q.attributes.position.array,ix=q.index.array,L=[],R=[];
    for(let i=0;i<ix.length;i+=3){let zmn=1e9,zmx=-1e9;
      for(let v=0;v<3;v++){const z=pa[ix[i+v]*3+2]+dz;if(z<zmn)zmn=z;if(z>zmx)zmx=z}
      if(zmx<-.02){L.push(ix[i],ix[i+1],ix[i+2])}else if(zmn>.02){R.push(ix[i],ix[i+1],ix[i+2])}else return null/* 有三角形跨中線→整件不分 */}
    if(!L.length||!R.length)return null;
    const mk=arr=>{const g2=new THREE.BufferGeometry();Object.keys(q.attributes).forEach(k=>g2.setAttribute(k,q.attributes[k]));
      g2.setIndex(new THREE.BufferAttribute(ix.constructor===Uint16Array?new Uint16Array(arr):new Uint32Array(arr),1));return g2};
    const gl=mk(L);c.geometry=mk(R);
    const m=new THREE.Mesh(gl,c.material);m.frustumCulled=false;m.position.copy(c.position);m.rotation.copy(c.rotation);m.scale.copy(c.scale);
    m.userData=Object.assign({},c.userData);m.renderOrder=c.renderOrder;c.parent.add(m);return m};
  const crkLeft=()=>{const o=[];let made=false;CRK.forEach(k=>{const g=G[k];if(!g)return;
    const cache=g.userData.exL;
    if(cache===undefined||cache.some(c=>c.parent!==g)){const L=[];
      g.children.forEach(c=>{const q=c.geometry&&c.geometry.attributes&&c.geometry.attributes.position;if(!q)return;
        let mx=-1e9;const a=q.array;for(let i=2;i<a.length;i+=3)if(a[i]>mx)mx=a[i];
        if(mx+c.position.z+g.position.z<-.02)L.push(c)});
      if(!L.length)g.children.slice().forEach(c=>{const m=splitOne(c,c.position.z+g.position.z);if(m){L.push(m);made=true}});
      g.userData.exL=L}
    g.userData.exL.forEach(c=>o.push(c))});
    if(made){try{if(typeof tagOutline==='function'&&G.olOn!==undefined)tagOutline(G.olOn)}catch(e){}try{if(G.btBuild)G.btBuild()}catch(e){}}
    return o};
  /* 貫通軸抽出距離（v89）：軸尖要整根退出手柄側那一面孔洞的外緣，再留 AX_GAP。
     孔洞面＝前叉（前軸）或車架勾爪／後下叉／後上叉（後軸）在手柄側、距軸心 30 mm 內的最外頂點 z；軸尖＝貫通軸本體在另一側的最遠 z。
     每幀依「基準座標」量測（扣掉各物件目前的拆解位移），所以換車款、換尺寸、拆解中途都一致；量不到就退回保守常數。 */
  const vis=o=>{for(;o;o=o.parent)if(!o.visible)return false;return true};
  const off0=o=>{const q=stM.get(o);return q?q.last.clone().sub(q.base):new THREE.Vector3()};
  /* 掃一組根物件：回傳 [zmin,zmax]（world，已扣根物件位移）；cx,cy 給定時只取距 (cx,cy) 30 mm 內的頂點 */
  const zSpan=(roots,cx,cy,R)=>{let lo=1e9,hi=-1e9;
    roots.forEach(r=>{if(!r||!r.isObject3D||!vis(r))return;const of=off0(r);r.updateWorldMatrix(true,true);
      r.traverse(c=>{if(!c.isMesh||!c.geometry||!vis(c))return;const pa=c.geometry.attributes&&c.geometry.attributes.position;if(!pa)return;const e=c.matrixWorld.elements,a=pa.array;
        for(let i=0;i<a.length;i+=3){const x=a[i],y=a[i+1],z=a[i+2];
          if(cx!==undefined){const X=e[0]*x+e[4]*y+e[8]*z+e[12]-of.x,Y=e[1]*x+e[5]*y+e[9]*z+e[13]-of.y;if((X-cx)*(X-cx)+(Y-cy)*(Y-cy)>R*R)continue}
          const Z=e[2]*x+e[6]*y+e[10]*z+e[14]-of.z;if(Z<lo)lo=Z;if(Z>hi)hi=Z}})});
    return[lo,hi]};
  const axD={F:.16,R:.2};/* 退回值（m） */
  const axUpd=()=>{try{const s=hdlSide();
    [['F',G.axF,[T.FKL,G.rsFork],.15],['R',G.axR,[G.dropoutL,G.dropoutR,G.exDropL,G.exDropR,T.CSL,T.CSR,T.csL,T.csR,T.SSL,T.SSR,T.ssL,T.ssR,G.rdHg],.2]].forEach(([k,ax,hole,fb])=>{
      if(!ax||!vis(ax)){axD[k]=fb;return}
      const of=off0(ax);ax.updateWorldMatrix(true,false);const e=ax.matrixWorld.elements,cx=e[12]-of.x,cy=e[13]-of.y;
      const a=zSpan([ax]),h=zSpan(hole,cx,cy,.03);
      if(!(a[1]>a[0])||!(h[1]>h[0])){axD[k]=fb;return}
      const zf=s<0?a[1]:a[0],zn=s<0?h[0]:h[1];/* 軸尖（遠側）、手柄側孔洞外緣 */
      axD[k]=Math.max(.05,Math.min(.4,-s*(zf-zn)+AX_GAP/1000))})}catch(e){axD.F=.16;axD.R=.2}};
  /* 轉向管（steer rod）v91：原模型沒有這一段——平常它整根藏在頭管裡，看不見也就沒做。
     但拆解時前叉沿轉向軸滑出，叉冠上空無一物，少掉的正是使用者要看的那根；故補一根，只在拆解時顯示。
     做法：掛在 G.crown 底下當子物件（G.crown 的 rotation.z＝π/2−頭管角，區域 +y 就是轉向軸），所以前叉一動它就跟著動，不必另外列進群組。
     錐形：上 1-1/8"（Ø28.6）、下 1.5"（Ø38.1），對應頭管的 FSA No.55R 1.5"/CR/STD 碗組。長度＝頭管長＋上端外露 62＋埋入叉冠 20。
     不進批次（noBT）：它是拆解時才出現的單件，省得每次顯示切換都要重建批次。
     blktec（一體把）本來就會畫出頭管上方那段 T.steer，拆解時改由這根涵蓋，故暫時隱藏 T.steer，免得兩根重疊。 */
  const SR_RT=.0143,SR_RB=.019,SR_UP=.062,SR_IN=.02;let srM=null,srK='';
  const steerUpd=on=>{
    if(T.steer)T.steer.visible=on?false:!!extras.blktec;
    if(!on&&!srM)return;
    if(!N||!N.HTt||!N.HTb||!G.crown){if(srM)srM.visible=false;return}
    const L=(Math.hypot(N.HTt.x-N.HTb.x,N.HTt.y-N.HTb.y)+SR_UP*1000+SR_IN*1000)/1000,k=L.toFixed(4);
    if(!srM){srM=new THREE.Mesh(new THREE.CylinderGeometry(SR_RT,SR_RB,1,28),M.dark);srM.frustumCulled=false;
      srM.userData.keepOpaque=true;srM.userData.noBT=true;G.crown.add(srM);
      try{if(typeof tagOutline==='function'&&G.olOn!==undefined)tagOutline(G.olOn)}catch(e){}}
    if(srK!==k){srK=k;srM.geometry.dispose();srM.geometry=new THREE.CylinderGeometry(SR_RT,SR_RB,L,28);srM.position.set(0,L/2-SR_IN,0)}
    srM.visible=on};
  /* 位移量（mm）為我估的：抽出後仍看得出原位關係，且不與鄰件重疊。
     p＝該群組的時間窗；nl（no lift）＝不隨車架上移的群組，其位移要扣回 Lv 才能留在原高度。 */
  const GRP={
    wF  :{p:PH_WH,nl:1,v:()=>V(whF(),0,0) ,o:()=>[G.wF,G.fRotor]},/* 行程由對位解出，見檔頭 */
    wR  :{raw:1,nl:1,v:()=>V(-whR()*seg(PH_WH),0,0),o:()=>[G.wR,G.rRotor].concat(G.casC||[])},
    axF :{raw:1,nl:1,v:()=>V(0,0,hdlSide()*axD.F).multiplyScalar(seg(PH_AX)).add(V(whF(),0,0).multiplyScalar(seg(PH_WH))),o:()=>[G.axF,G.hdlF]},/* 前貫通軸沿軸心、朝手柄那一側整根抽出（距離見 axUpd），抽出後再跟著前輪組一起前移（v199zzzzzz96） */
    axR :{raw:1,nl:1,v:()=>V(0,0,hdlSide()*axD.R).multiplyScalar(seg(PH_AX)).add(V(-whR()*seg(PH_WH),0,0)),o:()=>[G.axR,G.hdlR]},/* 後貫通軸同上，跟著後輪組一起後移 */
    fork:{p:PH_FK,d:dn,mm:HS_GAP,o:()=>{return[T.FKL,T.FKR,G.crown,G.rsFork]}},
    /* v199zzzzzz99a：下碗組（HSl、壓環 HSn、KING 貼字）不再黏在前叉冠部，停在「頭管底端與前叉冠部的正中間」＝前叉滑出量的一半 */
    hsL :{p:PH_FK,d:dn,mm:HS_GAP/2,o:()=>{try{return[HSl,HSn,HSlD]}catch(e){return[]}}},
    /* 前叉不標 nl：它跟著車架一起被 bike 帶上去，再沿轉向軸往外滑 HS_GAP。相對車架的位移恆為 HS_GAP×轉向軸，轉向管因此全程在頭管軸心延長線上。
       下碗組（連壓環 HSn、KING 貼字）併進本群組＝「前叉帶著下碗組」；轉向管是 G.crown 的子物件，自動跟著。 */
    calF:{p:PH_FK,v:()=>dn().multiplyScalar(HS_GAP/1000).add(V(0,0,-.045)),o:()=>[G.fCal]},/* 前卡鉗鎖在前叉上，跟著前叉同步滑出，再朝非驅動側抽出 45 */
    cal :{d:()=>V(0,0,-1),mm:45,o:()=>[G.rCal]},
    sdl :{p:PH_END,d:axSeat,mm:120,o:()=>[G.seat]},
    post:{p:PH_END,d:axSeat,mm:80,o:()=>[T.post].concat(G.seatGl?[G.seatGl.PostStd,G.seatGl.PostDropEX]:[])},/* 車架到定位後才往上拔 */
    clp :{d:axSeat,mm:26,o:()=>[T.collar].concat(G.seatGl?[G.seatGl.Clamp]:[])},
    /* 把手：向前 BAR_X，並抬到與龍頭（移動後）等高 */
    bar :{v:()=>V(BAR_X/1000,axHead().y*STEM_MM/1000,0),o:()=>[G.bar,G.cockpit,G.shift,G.cpStem]},/* 原位時把手中間管穿在龍頭把手孔裡（同高），所以把手升高量＝龍頭升高量 */
    stem:{d:axHead,mm:STEM_MM,o:()=>[G.stemStd,T.stem]},
    cap :{d:axHead,mm:CAP_MM,o:()=>[G.cap]},
    hsU :{d:axHead,mm:STEM_MM/2,o:()=>{try{return[HSu,HSuD]}catch(e){return[]}}},/* 上碗（連 KING 貼字）往上離開頭管，距離與前叉滑出量相同 */
    crk :{p:PH_END,d:()=>V(0,0,1),mm:CRK_MM,o:()=>CRK.map(k=>G[k])},
    crkL:{p:PH_END,v:()=>V(0,0,-(CRK_MM+CRKL_MM)/1000),w:()=>V(0,0,-CRKL_MM/1000),o:crkLeft},/* 左臂為曲柄群組的子物件，故位移須抵銷群組的 +z；熱點在場景層，用 w（世界位移） */
    rd  :{d:()=>V(0,0,1),mm:48,o:()=>[G.rdSram,G.rdSerG].concat(G.rdSerGs?Object.keys(G.rdSerGs).map(k=>G.rdSerGs[k]):[]).concat(G.rdOldC||[])},
    cage:{d:()=>V(0,0,1),mm:55,o:()=>[G.cageG,G.cageS]}
  };
  const HM={stemFace:'stem',stemSteer:'stem',topCap:'cap',lever:'bar',seatClamp:'clp',saddle:'sdl',bottle:'cage',bb:'frame',crank:'crkL',pedal:'crk',rd:'rd',cassette:'wR',rotor:'wR',caliper:'calF',axle:'axF',valve:'wF'};
  let t=0,from=0,to=0,t0=0,anim=false,chain0=null,nT=0;
  const stM=new Map(),tmp=new THREE.Vector3(),tmpL=new THREE.Vector3();
  const seg=w=>EZ(Math.max(0,Math.min(1,(t-w[0])/(w[1]-w[0]))));/* 某時間窗在目前主進度下的緩動值 */
  function put(o,v){if(!o||!o.isObject3D)return;
    /* 前叉 T.FKL 是 matrixAutoUpdate=false（setFork 直接寫 matrix），改 position 無效，這類物件改平移項 matrix.elements[12..14] */
    const mx=o.matrixAutoUpdate===false,e=mx?o.matrix.elements:null,cur=mx?tmp.set(e[12],e[13],e[14]):o.position;let s=stM.get(o);
    if(!s){s={base:cur.clone(),last:cur.clone()};stM.set(o,s)}
    else if(!cur.equals(s.last))s.base.copy(cur);/* 外部改過→重設基準 */
    if(mx){e[12]=s.base.x+v.x;e[13]=s.base.y+v.y;e[14]=s.base.z+v.z;o.matrixWorldNeedsUpdate=true;s.last.set(e[12],e[13],e[14])}
    else{o.position.copy(s.base).add(v);s.last.copy(o.position)}}
  function pass(){
    axUpd();
    const Lv=tmpL.copy(liftV()).multiplyScalar(seg(PH_UP));put(bike,Lv);/* 車架組往上並稍微往後；bike 是所有零件的父節點 */
    steerUpd(t>0.001);
    const off={},wf={};
    Object.keys(GRP).forEach(k=>{const g=GRP[k],sg=g.raw?1:seg(g.p||PH_MID),
      o=g.raw?g.v():(g.v?g.v():g.d().multiplyScalar(g.mm/1000)).multiplyScalar(sg);/* v199zzzzzz96：raw＝v() 已自行套好各時間窗的緩動（貫通軸同時吃 PH_AX 與 PH_WH 兩個窗），外層不再乘 sg */
      wf[k]=g.w?g.w().multiplyScalar(sg):o.clone();if(!g.nl)wf[k].add(Lv);/* 熱點用世界位移（bike 的上移要自己加回來） */
      off[k]=g.nl?o.sub(Lv):o;
      const L=g.o();for(let i=0;i<L.length;i++)put(L[i],off[k])});
    wf.frame=Lv;/* 鎖在車架上、沒有自己位移的熱點（中軸碗） */
    HS.forEach(h=>{const k=HM[h.p.id];put(h.g,k&&wf[k]?wf[k]:tmp.set(0,0,0))});
    if(G.chainI){if(chain0===null)chain0=G.chainI.visible;G.chainI.visible=t<.02?chain0:false}}/* 鏈條橫跨大盤與飛輪，拆解時隱藏 */
  const EXZ=()=>innerWidth<=760?1.1:.2,/* v199zzzzzz113：拆解取景拉遠倍率 行動 2.5→2.1、桌機 1.55→1.2（使用者 2026-11-19：拉太遠）。桌機 1.2 倍時攤開件水平約佔 ±0.93（NDC）；行動版維持高度入鏡、左右輪略出框，同組裝狀態 */kOf=()=>1+EXZ()*EZ(t);/* 行動版原本就為了車高而犧牲寬度（TQ_MINR），拆解後攤得更開，故另給較大的拉遠倍率 */let lastK=1,lastY=0;/* 拆解時取景拉遠並隨車架上移抬高，依 t 連續變化，使用者自己的縮放與平移保留 */
  G.exK=kOf;G.exOn=()=>t>0.001;G.exBusy=()=>anim;/* 主迴圈據此保持繪製，不倚賴 wake 計數 */
  G.exY=()=>liftM()*seg(PH_UP)*.5;/* 鏡頭目標抬高量：輪組留在原地，整體重心只升一半（homeTgt 也用這個值，兩邊才一致） */
  const camAdj=()=>{const zk=kOf();if(Math.abs(zk-lastK)>1e-6){want.r=Math.min(9,Math.max(.6,want.r*zk/lastK))/* 上限 9（原 4.2）：行動版拆解的取景距離會到 6.7，被夾住的話復原時除不回原值 */;lastK=zk}
    const yk=G.exY();if(Math.abs(yk-lastY)>1e-9){want.tgt.y+=yk-lastY;lastY=yk}};
  G.exTick=()=>{nT++;/* 呼叫次數（除錯用） */
    if(anim){const k=Math.min(1,(performance.now()-t0)/EX_MS);t=from+(to-from)*k;/* 主進度線性，緩動在各群組的時間窗內做 */
      if(k>=1){t=to;anim=false;if(t<=0){pass();stM.clear();if(G.chainI&&chain0!==null){G.chainI.visible=chain0;chain0=null}
        camAdj();if(G.shMark)G.shMark(80);return}}
      camAdj();
      if(typeof wk==='function')wk(5)}
    if(t>0||stM.size)pass()};
  /* inst＝不走動畫直接到位（切離扭力分頁時用，免得帶著 1.9 秒的復原動畫跳到別的分頁） */
  G.exSet=(on,inst)=>{const v=on?1:0;if(v===to&&!anim&&(!inst||!stM.size))return;/* 沒拆過就不必為了 inst 白跑一次 pass */
    if(inst){from=t=to=v;anim=false;pass();camAdj();if(v<=0){stM.clear();if(G.chainI&&chain0!==null){G.chainI.visible=chain0;chain0=null}}}
    else{from=t;to=v;t0=performance.now();anim=true}
    if(typeof wk==='function')wk(40);
    const b=document.getElementById('exBtn');if(b){b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'復原':'拆解'}};
  const bt=document.getElementById('exBtn');if(bt)bt.onclick=()=>G.exSet(to===0);
  window.__EX={set:G.exSet,on:G.exOn,t:()=>t,grp:GRP,n:()=>nT};
})();

/* ===== 尺寸幾何 ===== */
const bottom=document.getElementById('bottom'),geoTable=document.getElementById('geoTable');let size='M';
const GROWS=[['前伸量','reach'],['堆疊高','stack'],['中管長','stl'],['有效上管長','ett'],['頭管長','ht'],['頭管角度','hta'],['中管角度','sta'],['五通下沉量','bbd'],['下叉長度','cs'],['軸距','wb'],['跨高','so'],['前中心','fc'],['前叉偏移量','rake']];
const VK=GROWS.map(r=>r[1]),isAng=k=>k==='hta'||k==='sta';
function fmtLive(k){return vTween?(isAng(k)?liveV[k].toFixed(1):liveV[k].toFixed(0)):String(liveV[k])}
function dlt(k){if(!cmp)return'';const c=GEO.find(g=>g.size===cmp),d=liveV[k]-c[k];return Math.abs(d)<.05?'–':(d>0?'+':'')+d.toFixed(1)}
function updLive(){geoTable.querySelectorAll('[data-live]').forEach(td=>td.textContent=fmtLive(td.dataset.live));geoTable.querySelectorAll('[data-d]').forEach(td=>td.textContent=dlt(td.dataset.d))}
function refreshDimText(){if(tab!=='geo'||!dimKey)return;const r=GROWS.find(x=>x[1]===dimKey);if(r)dimText=`${r[0].replace('（c-c）','')} ${fmtLive(dimKey)}${isAng(dimKey)?'°':' mm'}`}
/* ===== 尺寸建議（身高／跨高／手臂長 → 推薦尺寸） ===== */
/* 估算模型：以各車型 M 為基準點（176／82／82 騎士＝M，客製範例同此值）。係數為經驗估值，尚未經實騎或銷售資料校正。 */
const FITK={clr:{road:25,gravel:30},roadM:['64','325','audax'],refT:94,refA:60,refI:82,kT:3.0,kA:2.5,kS:4.7,beta:.5,tolR:10,tolS:15,STEM:{L0:100,a0:-6,Lmin:70,Lmax:130,amax:17,sp:30}};
const fitOut=document.getElementById('fitOut');
function fitIn(){return riderOk()?{h:RID.h,i:RID.i,a:RID.a}:null}
function fitCalc(){const v=fitIn();if(!v||!GEOS[selM])return null;
  const min=FITK.roadM.includes(selM)?FITK.clr.road:FITK.clr.gravel,ref=GEO.find(g=>g.size==='M')||GEO[Math.floor(GEO.length/2)];
  const rt=ref.reach+FITK.kT*((v.h-v.i)-FITK.refT)+FITK.kA*(v.a-FITK.refA),st=ref.stack+FITK.kS*(v.i-FITK.refI);
  const L=GEO.map(g=>{const clr=v.i*10-g.so,dr=g.reach-rt,ds=g.stack-st;return{size:g.size,clr,dr,ds,ok:clr>=min,d:Math.hypot(dr/FITK.tolR,ds/FITK.tolS)}});
  const okL=L.filter(x=>x.ok);let rec,none=false;
  if(okL.length){const sc=x=>x.d+FITK.beta*(x.clr-min)/10;rec=okL.reduce((a,b)=>sc(b)<sc(a)?b:a)}else{rec=L.reduce((a,b)=>b.clr>a.clr?b:a);none=true}
  const ri=L.indexOf(rec),cand=[L[ri-1],L[ri+1]].filter(Boolean),scr=x=>x.d+FITK.beta*(x.clr-min)/10;cand.sort((a,b)=>((b.ok?1:0)-(a.ok?1:0))||(scr(a)-scr(b)));const alts=cand.slice(0,1);
  return{v,min,rt,st,L,rec,alts,none}}
function stemFit(dr,ds){const S=FITK.STEM,k=Math.PI/180,Hx=S.L0*Math.cos(S.a0*k)-dr,Hy=S.L0*Math.sin(S.a0*k)-ds;
  if(Hx<=0)return{ok:false,L:NaN,a:NaN,s:0,why:['前伸量差過大，龍頭長度算不出']};
  let th=Math.atan2(Hy,Hx),s=0,cl=false;const am=S.amax*k;if(th>am){th=am;s=Hy-Hx*Math.tan(am);cl=true}
  const L=cl?Hx/Math.cos(am):Math.hypot(Hx,Hy),a=th/k,why=[];
  if(L<S.Lmin)why.push(`所需龍頭 ${L.toFixed(0)} mm，短於 ${S.Lmin} mm`);if(L>S.Lmax)why.push(`所需龍頭 ${L.toFixed(0)} mm，長於 ${S.Lmax} mm`);
  if(a<-S.amax)why.push(`所需角度 ${a.toFixed(0)}°，低於 −${S.amax}°（車架堆疊偏高，無法再降）`);if(s>S.sp)why.push(`需墊圈 ${s.toFixed(0)} mm，超過 ${S.sp} mm`);
  return{ok:!why.length,L,a,s,why}}
const stemTxt=f=>`${Math.round(f.L/5)*5} mm／${f.a>0.5?'+':f.a<-0.5?'−':''}${Math.abs(Math.round(f.a))}°${f.s>=1?`＋墊圈 ${Math.ceil(f.s/5)*5} mm`:''}`;
let stemSpanC=null;function stemSpan(){if(stemSpanC)return stemSpanC;const o={rl:1e9,rh:-1e9,sl:1e9,sh:-1e9};for(let d=-150;d<=150;d+=.5){if(stemFit(d,0).ok){o.rl=Math.min(o.rl,d);o.rh=Math.max(o.rh,d)}if(stemFit(0,d).ok){o.sl=Math.min(o.sl,d);o.sh=Math.max(o.sh,d)}}return stemSpanC=o}
function fitPick(){const r=fitCalc();if(r)size=r.rec.size}
function fitWarn(v){const w=[];if(v.i/v.h<.40||v.i/v.h>.52)w.push('跨高占身高比例不尋常');if(v.a/v.h<.29||v.a/v.h>.40)w.push('手臂長占身高比例不尋常（是否量到指尖？）');return w}
const sg=(x,d)=>(x>0?'+':x<0?'−':'')+Math.abs(x).toFixed(d||0);
function renderFit(){
  const th=document.querySelectorAll('#geoTable .gt th[data-s]');
  markRider();
  const r=fitCalc();geoTable.querySelectorAll('[data-s]').forEach(c=>c.classList.toggle('rec',!!r&&c.tagName==='TH'&&c.dataset.s===r.rec.size&&!r.none));
  if(!GEOS[selM]){fitOut.innerHTML='';return}
  const v=fitIn();
  if(!v){const any=['h','i','a'].some(k=>isFinite(RID[k]));fitOut.innerHTML=`<p class="fine">${any?'三項都填入範圍內的數字後才會給建議。':'輸入身高、跨高、手臂長，會依目前車型推薦尺寸。'}</p>`;return}
  const w=fitWarn(v),row=(x,t)=>`<tr data-fs="${x.size}"${t==='推薦'?' class="rec"':''}><td style="text-align:left"><span class="tag">${t}</span><span class="num">${x.size}</span></td><td class="num${x.ok?'':' no'}">${sg(x.clr)}${x.ok?'':'（不足）'}</td><td class="num">${sg(x.dr)}</td><td class="num">${sg(x.ds)}</td></tr>`;
  let verdict,cls='';const b=r.rec,S=FITK.STEM,sf=r.none?null:stemFit(b.dr,b.ds),micro=Math.abs(b.dr)<=FITK.tolR&&Math.abs(b.ds)<=FITK.tolS;
  if(r.none){verdict=`跨高不足：最小尺寸 ${b.size} 的跨高餘裕只有 ${sg(b.clr)} mm，需 ≥ ${r.min} mm。建議改走客製車架。`;cls=' warn'}
  else if(!sf.ok){verdict=`最接近的是 ${b.size}，但${sf.why.join('、')}，超出龍頭補償範圍。建議評估客製車架。`;cls=' warn'}
  else if(micro)verdict=`推薦 ${b.size}。落在微調範圍內，標準龍頭（${S.L0} mm／${String(S.a0).replace('-','−')}°）即可。`;
  else verdict=`推薦 ${b.size}。需換龍頭：約 ${stemTxt(sf)}。`;
  fitOut.innerHTML=`<p class="fit-v${cls}">${verdict}</p>${w.length?`<p class="fit-v warn">${w.join('；')}，請再量一次。</p>`:''}<div class="tscroll"><table class="gt fit-t"><thead><tr><th></th><th>跨高餘裕</th><th>前伸量差</th><th>堆疊差</th></tr></thead><tbody>${row(b,'推薦')}${r.alts.map(x=>row(x,'備選')).join('')}</tbody></table></div><p class="fine">估算需求：前伸量 <b class="num">${r.rt.toFixed(0)}</b> mm、堆疊高 <b class="num">${r.st.toFixed(0)}</b> mm${sf?`；所需龍頭約 <b class="num">${stemTxt(sf)}</b>${sf.ok?'':'（超出可行範圍）'}`:''}。龍頭以 ${S.L0} mm／${String(S.a0).replace('-','−')}° 為基準，角度正值＝上仰。差值＝車架減估算需求，正值表示車架較長或較高，單位 mm。點列可切換尺寸。</p><details class="spec"><summary>尺寸建議怎麼算</summary><p class="fine">① 跨高：人的跨高減車架跨高，至少留 ${r.min} mm（${FITK.roadM.includes(selM)?'公路車款':'礫石車款'}），不足的尺寸直接剔除。② 估算需求以本車型 M 為基準點（身高 176、跨高 82、手臂長 60 的騎士）：前伸量每多 1 cm 軀幹（身高減跨高）加 ${FITK.kT} mm、每多 1 cm 手臂加 ${FITK.kA} mm；堆疊高每多 1 cm 跨高加 ${FITK.kS} mm。③ 在通過①的尺寸中，取前伸量差（以 ${FITK.tolR} mm 計）與堆疊差（以 ${FITK.tolS} mm 計）合併後最小者；跨高餘裕每超過門檻 10 mm 加 ${FITK.beta} 分，略偏好剛好跨得過的較大尺寸。係數已依台灣雲豹租車站「彎把公路車身高對照表」校正（AUDAX 325Ti，身高 164 cm 以上與該表一致，校正時假設跨高約為身高 0.466 倍），其他車型沿用同一組係數，尚未經實騎與成交資料驗證；座艙與 fitting 不在本頁範圍。</p><p class="fine">④ 所需龍頭：以 ${S.L0} mm／${String(S.a0).replace('-','−')}° 為基準龍頭（本頁假設，出廠龍頭尚未確認）。水平分量＝${S.L0}×cos(${String(S.a0).replace('-','−')}°)−前伸量差，垂直分量＝${S.L0}×sin(${String(S.a0).replace('-','−')}°)−堆疊差；長度＝兩分量合成，角度＝其反正切。角度超過 +${S.amax}° 時固定在 +${S.amax}°，不足的高度用墊圈補。⑤ 三級判斷：<b>微調範圍</b>＝前伸量差在 ±${FITK.tolR} mm 且堆疊差在 ±${FITK.tolS} mm 內，標準龍頭即可；<b>龍頭補償範圍</b>＝所需龍頭 ${S.Lmin}–${S.Lmax} mm、角度不低於 −${S.amax}°、墊圈 ≤ ${S.sp} mm，約為前伸量差 ${sg(stemSpan().rl)}～${sg(stemSpan().rh)} mm（堆疊差為 0 時）、堆疊差 ${sg(stemSpan().sl)}～${sg(stemSpan().sh)} mm（前伸量差為 0 時），兩者互相牽動，頁面以實際算式判斷；<b>建議評估客製車架</b>＝超出龍頭補償範圍，或跨高餘裕不足。這些界線為本頁設定值，尚未經實騎驗證。</p></details>`;
  fitOut.querySelectorAll('tr[data-fs]').forEach(tr=>tr.onclick=()=>{size=tr.dataset.fs;if(cmp===size)cmp=null;goGeo(size);updateGhost();renderGeo()})}
let riderT=null;
function riderApply(){markRider();
  if(tab==='geo'){const r=fitCalc();if(r&&r.rec.size!==size){size=r.rec.size;if(cmp===size)cmp=null;goGeo(size);updateGhost()}renderGeo()}
  else if(tab==='custom')recalc();
  reframe()}
RIN.forEach(el=>el.addEventListener('input',()=>{RID[el.dataset.rk]=parseFloat(el.value);F.height=RID.h;F.inseam=RID.i;F.arm=RID.a;riderMirror();markRider();clearTimeout(riderT);riderT=setTimeout(riderApply,200)}));
function reframe(){if(tab!=='torque'){AF.pan=0;want.r=homeR();want.tgt.copy(homeTgt(false,homeFlip))}}
function goGeo(s,instant,ni){const g=GEO.find(x=>x.size===s);goNodes(stockNodes(g),ni);
  if(instant){liveV=Object.assign({},g);vTween=null}else vTween={from:Object.assign({},liveV),to:g,t0:performance.now(),d:450};updLive()}
function chips(el,list,cur,on,allowNone){el.innerHTML='';list.forEach(x=>{const b=document.createElement('button');b.className='chip';b.textContent=x;b.setAttribute('aria-pressed',x===cur);b.onclick=()=>on(x===cur&&allowNone?null:x);el.appendChild(b)})}
let tblKey='';
function specBox(){const el=document.getElementById('specBox');if(!el)return;const S=SPEC[selM];
  let h='';if(S){h+=`<details class="spec"><summary>${MNAME[selM]}｜規格與保固${SPECSRC[selM]?'（'+SPECSRC[selM]+'）':''}</summary><table class="gt">`+S.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')+'</table></details>'}
  else h+=`<p class="fine">${MNAME[selM]}：${NOSPEC[selM]||'規格待補'}。</p>`;
  h+=`<details class="spec"><summary>加購升級（全車系共通）</summary><ul class="addl">`+ADDON_ALL.map(x=>`<li>${x}</li>`).join('')+`</ul>${pill()}</details>`;el.innerHTML=h}
function GEOV(){return GEO}
var SER_DEF={'64':3,'325':1,'audax':0,'ili':2,'ss':0,'ex':0};/* v199zzzg：各車款預設傳動／煞車系列（0 現行、1 Shimano 105、2 SRAM Force、3 Dura-Ace）；SS-2205、EX 維持現行 */ /* v199zzzl：AUDAX 325 與 ili-ili 325 的傳動／煞車套件互換——AUDAX 改為現行（含 AUDAX 曲柄組）、ili-ili 325 改為 SRAM Force（曲柄組隨系列，不再是 M64 曲柄組）（使用者 2026-11-10） */
/* v199zzzzzz89：車款・尺寸膠囊內容。扭力巡檢分頁 3D 固定是 M 尺寸標準節點，故尺寸顯示 M 且不可點；其餘分頁顯示並可循環目前尺寸。 */
function stTagSet(){try{mInfo()}catch(_){}const el=document.getElementById('stTag');if(!el)return;const has=!!GEOS[selM],tq=tab==='torque';el.innerHTML='<span data-k="m" role="button" tabindex="0">'+MNAME[selM]+'</span>'+(has?(tq?'・<span>M</span>':'・<span data-k="s" role="button" tabindex="0">'+size+'</span>'):'')}
function setModel(m){selM=m;if(!window.__WARMING){try{window.__featRe&&window.__featRe()}catch(e){}try{window.__bgmModel&&window.__bgmModel(m)}catch(e){}}/* v199zzzzzz128：預熱中不換 BGM、不重設特色說明 *//* v199zzzzzz58：BGM 換主題 */if(typeof SER_DEF!=='undefined'&&m in SER_DEF&&!ADD_S.serUser){ADD_S.ser=SER_DEF[m];try{renderAddon()}catch(e){}}/* v199zzzzzz30：使用者自選過傳動系列就不再被車款預設蓋掉 */try{addonApply()}catch(e){}try{F.model=MNAME[m];const q=form.querySelector('[name=model]');if(q)q.value=F.model}catch(e){}syncSub();if(GEOS[m]){model=m;GEO=GEOS[m];if(!GEO.some(g=>g.size===size))size='M';fitPick();cmp=null;swT=performance.now()+700;goGeo(tab==='torque'?'M':size,true,true);updateGhost()}tblKey='';renderGeo();stTagSet()}/* v199：換車型立即套用（節點不再補間）並暫以像素比 1 繪製 700 ms */
function markSel(){const ss=GEO.map(g=>g.size),si=ss.indexOf(size);
  geoTable.querySelectorAll('[data-s]').forEach(c=>{const i=ss.indexOf(c.dataset.s);c.style.transitionDelay=(Math.abs(i-si)*45)+'ms';c.classList.toggle('sel',c.dataset.s===size)})}
geoTable.addEventListener('click',e=>{const c=e.target.closest('[data-s]');if(!c||c.dataset.s===size)return;size=c.dataset.s;if(cmp===size)cmp=null;goGeo(size);updateGhost();renderGeo()});
function renderGeo(){chips(document.getElementById('modelChips'),Object.values(MNAME),MNAME[selM],x=>setModel(Object.keys(MNAME).find(k=>MNAME[k]===x)));chips(document.getElementById('twChips'),twOpts(selM).map(String),String(TW_SEL[selM]||TW_DEF[selM]),x=>{TW_SEL[selM]=+x;if(GEOS[selM]){goGeo(size);updateGhost()}renderGeo()});/* v198：胎寬選項 */
  {const hc=document.getElementById('hsTypeChips');if(hc){chips(hc,['外露式','全隱藏式'],hsT()==='hid'?'全隱藏式':'外露式',x=>{HS_SEL[selM]=x==='全隱藏式'?'hid':'ex';try{if(N){tween=null;logoNow=true;applyNodes(N)}}catch(e){}wk();renderGeo()});}}
  document.getElementById('modelH').textContent=({'64':'全公路車','325':'全公路車','audax':'長途耐力車','ili':'礫石車','ss':'礫石車','ex':'探險礫石車'}[selM]||'車')+'型';
  const has=!!GEOS[selM];document.getElementById('sizeH').textContent=MNAME[selM]+(has?' 尺寸':'');stTagSet();
  const gg=has?(GEO.find(x=>x.size===size)||GEO[0]):null;heroSet(document.getElementById('geoScore'),gg?`<div class="hm">${MNAME[selM]}</div><span class="hk" data-next="1" role="button" tabindex="0"><i class="lb">尺寸</i><span class="v"><b class="num" data-v="size">${gg.size}</b></span></span><span data-dim="reach" role="button" tabindex="0" aria-pressed="${dimKey==='reach'}" class="hk ${dimKey==='reach'?'on':''}"><i class="lb">前伸量</i><span class="v"><b class="num" data-v="reach">${gg.reach}</b><i class="u">mm</i></span></span><span data-dim="stack" role="button" tabindex="0" aria-pressed="${dimKey==='stack'}" class="hk ${dimKey==='stack'?'on':''}"><i class="lb">堆疊高</i><span class="v"><b class="num" data-v="stack">${gg.stack}</b><i class="u">mm</i></span></span><button type="button" class="gcCta" title="已做過或計畫做 fitting？依數據客製車架幾何"><span class="l1">客製化</span><span class="l2">幾何<span class="ar"> →</span></span></button>`:'');/* v199zzzzzz139：幾何客製 CTA（使用者 2026-11-20，桌機與行動版同） *//* v119：卡片頂端主視覺（車型＋尺寸＋前伸量＋堆疊高），數字換值時滾動 */ /* v199zzzzzz100：前伸量／堆疊高可點，同下方尺寸對照表的列（點一次在 3D 標出尺寸線、再點一次關閉） */
  document.getElementById('m325note').textContent=({'64':'幾何與官網現行頁一致；管徑為 STEP 示意量測。','325':'幾何與規格依官網；上、下管異型截面取自 STEP（僅示意），其他尺寸兩端截面不變、沿程拉伸。','ss':'幾何與規格依官網；管件粗細尚無量測，為示意。','audax':'幾何依官網現行頁（M 尺寸官網數值自檢有 2–3 mm 差）；規格與管徑摘自官方舊頁，須核對現行頁面；管件形狀為示意。','ili':'幾何依官網現行頁；規格與管徑摘自官方舊頁，須核對現行頁面；管件形狀為示意。','ex':'幾何依官網現行頁；規格待擷取，管件粗細為示意。'}[selM]||'')+' 前叉為示意。';
  if(!has){chips(document.getElementById('sizeChips'),[],null,()=>{});chips(document.getElementById('cmpChips'),[],null,()=>{});geoTable.innerHTML='<p class="fine">尺寸對照待補。</p>';tblKey='';specBox();renderFit();return}
  chips(document.getElementById('sizeChips'),GEOV().map(g=>g.size),size,s=>{size=s;if(cmp===s)cmp=null;goGeo(s);updateGhost();renderGeo()});
  chips(document.getElementById('cmpChips'),GEOV().map(g=>g.size).filter(s=>s!==size),cmp,s=>{cmp=s;updateGhost();renderGeo()},true);
  const key=model+'|'+cmp;
  if(key!==tblKey){tblKey=key;
    let h='<table class="gt"><thead><tr><th></th>'+GEOV().map(g=>`<th class="num" data-s="${g.size}">${g.size}</th>`).join('')+(cmp?`<th class="num">差 vs ${cmp}</th>`:'')+'</tr></thead><tbody>';
    GROWS.forEach(([l,k])=>{const dp=isAng(k)||GEOV().some(g=>!Number.isInteger(+g[k]))?1:0;h+=`<tr data-k="${k}" class="${dimKey===k?'on':''}"><td>${l}</td>`+GEOV().map(g=>`<td class="num" data-s="${g.size}">${(+g[k]).toFixed(dp)}</td>`).join('')+(cmp?`<td class="num dlt" data-d="${k}"></td>`:'')+'</tr>'});
    geoTable.innerHTML=h+'</tbody></table>';
    geoTable.querySelectorAll('[data-s]').forEach(c=>c.classList.toggle('sel',c.dataset.s===size));
    geoTable.querySelectorAll('tbody tr').forEach(tr=>{const k=tr.dataset.k,show=()=>{dimKey=k;refreshDimText();updateDim();geoTable.querySelectorAll('tr.on').forEach(x=>x.classList.remove('on'));tr.classList.add('on')};tr.onclick=e=>{const lab=e.target.closest('td')===tr.firstElementChild;if(dimKey===k){if(lab){dimKey=null;updateDim();tr.classList.remove('on')}}else show()}})}
  else markSel();
  updLive();specBox();renderFit()}

/* ===== 客製車架 ===== */
const form=document.getElementById('cform');let F=Object.assign({},SAMPLE,{height:NaN,inseam:NaN,arm:NaN,cid:'',model:MNAME[selM]});
const RANGE={height:[100,250],inseam:[40,140],arm:[40,90],reach:[200,700],stack:[300,900],hta:[45,89],htl:[40,400],a2c:[200,600],off:[5,100],bbd:[20,150],rc:[300,600],sta:[50,89],stl:[250,900]};
const FIELDS=[
 ['h','基本資料'],['t','cid','客戶編號','TM 客戶編號・選填'],
 ['h','騎乘幾何'],['n','reach','前伸量','REACH mm',1],['n','stack','堆疊高','STACK mm',1],
 ['n','hta','頭管角度','HTA °',.1],['n','htl','頭管長度','HTL mm',1],
 ['n','a2c','前叉長度','FORK A2C mm',1],['n','off','前叉偏移量','FORK OFFSET mm',1],
 ['n','bbd','五通下沉量','BBD mm',1],['n','rc','下叉長度','RC mm',1],['n','sta','中管角度','STA °',.1],['n','stl','中管長度','STL mm・中心到頂端',1],
 ['h','基本設定'],['s','model','車型',Object.values(MNAME)],['s','ride','騎乘類型',Object.keys(OPT.ride)],['s','brake','煞車',OPT.brake],['s','tire','輪胎',OPT.tire],
];
function renderForm(){let h='';FIELDS.forEach(f=>{if(f[0]==='h'){h+=`<h2>${f[1]}</h2>`;return}
  if(f[0]==='n'){const um=f[3].match(/(cm|mm|°)/),unit=um?um[1]:'',note=f[3].replace(/(cm|mm|°)/,'').replace(/・/,' ').replace(/\s+/g,' ').trim(),r=RANGE[f[1]];
    h+=`<label class="f" data-k="${f[1]}"><span>${f[2]}</span><input class="num" type="number" inputmode="decimal" step="${f[4]}" name="${f[1]}" value="${F[f[1]]}" placeholder="${r[0]}–${r[1]}" title="${note?note+'・':''}${r[0]}–${r[1]}"><span class="u">${unit}</span></label>`}
  else if(f[0]==='t')h+=`<label class="f fs" data-k="${f[1]}"><span>${f[2]}<small>${f[3]}</small></span><input type="text" name="${f[1]}" value="${(F[f[1]]||'').replace(/"/g,'')}" maxlength="40" autocomplete="off" spellcheck="false" placeholder="例：TM-000123"></label>`;
  else h+=`<label class="f fs" data-k="${f[1]}"><span>${f[2]}</span><select name="${f[1]}">${f[3].map(o=>`<option${o===F[f[1]]?' selected':''}>${o}</option>`).join('')}</select></label>`});
  form.innerHTML=h;form.querySelectorAll('input,select').forEach(el=>{el.addEventListener('input',()=>{if(el.name==='cid'){const c=el.value.replace(/[^A-Za-z0-9_.\-]/g,'');if(c!==el.value)el.value=c}F[el.name]=el.type==='number'?parseFloat(el.value):el.value;clearTimeout(rt);rt=setTimeout(recalc,300)});el.addEventListener('change',()=>{clearTimeout(rt);if(el.name==='model'){const k=Object.keys(MNAME).find(x=>MNAME[x]===el.value);if(k&&k!==selM)setModel(k)}recalc()})})}
let rt=null;
let CN=null;
function recalc(){const nums=['reach','stack','hta','htl','a2c','off','bbd','rc','sta','stl'];
  const bad=nums.filter(k=>!(isFinite(F[k])&&F[k]>0)),out=nums.filter(k=>!bad.includes(k)&&(F[k]<RANGE[k][0]||F[k]>RANGE[k][1]));
  form.querySelectorAll('label.f').forEach(l=>l.classList.toggle('bad',bad.includes(l.dataset.k)||out.includes(l.dataset.k)));
  const riderBad=['height','inseam','arm'].filter(k=>!(isFinite(F[k])&&F[k]>=RANGE[k][0]&&F[k]<=RANGE[k][1]));
  const warns=[];if(bad.length){renderOut(null,['有欄位未填或不是正數，3D 維持上一個有效結果。']);setExport(false);return}
  if(out.length){const nm=k=>(FIELDS.find(f=>f[1]===k)||[])[2]||k;renderOut(null,out.map(k=>`${nm(k)} ${F[k]} 超出輸入範圍（${RANGE[k][0]}–${RANGE[k][1]}），可能少打或多打位數；3D 維持上一個有效結果。`));setExport(false);return}
  if(F.off>=F.a2c)warns.push('前叉偏移量必須小於前叉長度。');if(F.rc<=F.bbd)warns.push('下叉長度必須大於五通下沉量。');
  if(warns.length){renderOut(null,warns);setExport(false);return}
  CN=customNodes(F);extras=addonExtras();
  const min=OPT.ride[F.ride];if(F.rc<min)warns.push(`${F.ride} 的下叉長度下限為 ${min} mm，目前 ${F.rc} mm。`);
  if(Math.abs(CN.htlShould-F.htl)>C.htlTol)warns.push(`頭管長度應為 ${CN.htlShould.toFixed(1)} mm（依前叉長度、堆疊高、頭管角；隱藏式碗組，外露高度計 0），表單填 ${F.htl} mm，差 ${Math.abs(CN.htlShould-F.htl).toFixed(1)} mm。`);
  
  if(tab==='custom')goNodes(custTarget());if(riderBad.length)warns.push('騎士尺寸（身高、跨高、手臂長）未填完整或超出範圍，填完才能輸出。');renderOut(CN,warns);setExport(!riderBad.length,warns,CN)}
const OROWS=[['軸距','WB','wb'],['下叉長度','RC','rc'],['前中心','FC','fc'],['Trail','','trail'],['五通離地','','bbg'],['頭管長度應為','HTL','htl'],['跨高估算','','so_c']];
function renderOut(n,warns){if(tab!=='custom')return;let h='';
  if(n){h+='<div class="rgrid">';
    OROWS.forEach(([l,e,k])=>{const val=k==='rc'?F.rc:k==='htl'?n.htlShould:k==='so_c'?n.so:n[k];
      h+=`<div class="ri${dimKey===k?' on':''}" data-k="${k}" data-l="${l}"><span>${l}${e?`<small>${e}</small>`:''}</span><b class="num">${val.toFixed(1)}</b></div>`});h+='</div>'}
  h+=warns.length?`<div class="warn">${warns.map(w=>`<p>${w}</p>`).join('')}</div>`:`<div class="okline">幾何一致，沒有需要修正的欄位。</div>`;
  bottom.innerHTML=h;
  bottom.querySelectorAll('.ri').forEach(tr=>{const k=tr.dataset.k,lbl=tr.dataset.l,val=tr.lastChild.textContent;
    const show=()=>{dimKey=k;dimText=`${lbl} ${val} mm`;updateDim();bottom.querySelectorAll('.on').forEach(x=>x.classList.remove('on'));tr.classList.add('on')};tr.onclick=()=>{if(dimKey===k){dimKey=null;updateDim();tr.classList.remove('on')}else show()}})}
document.getElementById('sampleBtn').onclick=()=>{const cid0=F.cid||'';F=Object.assign({},SAMPLE,{cid:cid0,model:MNAME[selM]});RID.h=F.height;RID.i=F.inseam;RID.a=F.arm;riderMirror();markRider();renderForm();recalc();reframe()};
/* ===== 表單輸出 ===== */
let exportState={ok:false,warns:[],CN:null};
function setExport(ok,warns,n){exportState={ok,warns:warns||[],CN:n||null};document.getElementById('exportBtn').disabled=!ok;document.getElementById('cState').textContent=ok?'可輸出':'待補';
  document.getElementById('exportMsg').textContent=ok?'數值皆已完成，可輸出。':'尚有欄位未完成或不合理，補齊後可輸出。';
  if(!ok){document.getElementById('exportMenu').hidden=true;document.getElementById('exportCopy').hidden=true}}
function exportSections(){const f=F,n=exportState.CN,x=v=>(+v).toFixed(1);
  return[['基本資料',[['客戶編號 TM Customer ID','',(f.cid||'').trim()||'（未填）'],['身高','cm',f.height],['跨高','cm',f.inseam],['手臂長','cm',f.arm]]],
   ['基本設定',[['車型','',f.model],['騎乘類型','',f.ride],['煞車','',f.brake],['輪胎','',f.tire]]],
   ['騎乘幾何',[['前伸量 REACH','mm',f.reach],['堆疊高 STACK','mm',f.stack]]],
   ['車頭',[['頭管角度 HTA','°',f.hta],['頭管長度 HTL','mm',f.htl]]],
   ['前叉',[['前叉長度 FORK A2C','mm',f.a2c],['前叉偏移量 FORK OFFSET','mm',f.off]]],
   ['後三角',[['五通下沉量 BBD','mm',f.bbd],['下叉長度 RC','mm',f.rc],['中管角度 STA','°',f.sta],['中管長度 STL（中心到頂端）','mm',f.stl]]],
   ['塗裝',[['客製塗裝選擇','',paintOk()?paintLabel():'不適用（此車款不承接塗裝客製）'],['表面處理','',finOk()?finLabel()+(brushOnly()?'（此車款固定）':''):'不適用（此車款不承接）']].concat(paintOk()&&finEff()==='brush'?[['陽極規則','','拉絲表面無法上陽極；目前表面處理為「'+finLabel()+'」，車架為鈦原色。'+(logoShown()&&lcEff()!=='ti'?'Logo 處以遮罩局部噴砂後上陽極。':'')]]:[]).concat(hsOk()?[['座管束・頭碗組・BB 杯','',hsLabel()],['鈦螺絲與金屬小件','',smLabel()]]:[]).concat(brushOnly()?[['貼紙','',STICKER_TXT]]:[]).concat(gradRows()).concat(logoShown()?[['Logo','',brushOnly()?'頭管標、上管標、座管標、下管標以無膜標貼紙示意，不適用陽極顏色（位置依該車款位置圖；尺寸待確認）':'上管車種標、下管 logo、座管爪痕、頭管標｜其他 Logo 顏色：'+logoColLabel()+'；下管標顏色：'+dtColLabel()+'；標表面處理：'+logoFinLabel()+'（位置依該車款位置圖；尺寸待確認）']]:[])],
   ['加購套件',addonRows()],
   ['計算結果',[['軸距 WB','mm',x(n.wb)],['前中心 FC','mm',x(n.fc)],['Trail','mm',x(n.trail)],['五通離地 BB to ground','mm',x(n.bbg)],['頭管長度應為 HTL (should be)','mm',x(n.htlShould)],['跨高估算（上管中點）','mm',x(n.so)]]]]}
function buildExport(fmt){const d=new Date(),ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),S=exportSections(),W=exportState.warns,o=[];
  const note='座艙、落差與 fitting 不在本系統範圍；3D 外觀（含把手、座墊、輪組）為示意，以上數值以客製單確認為準。';
  if(fmt==='md'){o.push('# RIKULAU 客製單車表（幾何・塗裝・加購）','',`輸出日期：${ds}`,'');
    S.forEach(([t,r])=>{o.push(`## ${t}`,'','| 項目 | 單位 | 值 |','|---|---|---|');r.forEach(([a,u,v])=>o.push(`| ${a} | ${u} | ${v} |`));o.push('')});
    o.push('## 檢查提醒','');if(W.length)W.forEach(w=>o.push(`- ${w}`));else o.push('無');o.push('','---',note,'')}
  else{o.push('RIKULAU 客製單車表（幾何・塗裝・加購）',`輸出日期：${ds}`,'');
    S.forEach(([t,r])=>{o.push(`【${t}】`);r.forEach(([a,u,v])=>o.push(`  ${a}：${v}${u?' '+u:''}`));o.push('')});
    o.push('【檢查提醒】');if(W.length)W.forEach(w=>o.push(`  - ${w}`));else o.push('  無');o.push('',note)}
  return{text:o.join('\n'),name:`RIKULAU客製單車表_${ds.replace(/-/g,'')}.${fmt}`}}
function showCopy(text){const t=document.getElementById('exportCopy');t.value=text;t.hidden=false;document.getElementById('exportMsg').textContent='此環境無法直接下載，請全選複製下方文字。'}
async function doExport(fmt){if(!exportState.ok)return;const{text,name}=buildExport(fmt),msg=document.getElementById('exportMsg');
  let dl=null;try{dl=(typeof claude!=='undefined'&&claude.use)?await claude.use('downloads'):null}catch(e){}
  if(!dl){showCopy(text);return}
  try{await dl.save({filename:name,data:text});msg.textContent=`已送出儲存：${name}`}catch(e){if(e&&e.code==='declined')msg.textContent='已取消。';else showCopy(text)}}
document.getElementById('exportBtn').onclick=()=>{const m=document.getElementById('exportMenu');m.hidden=!m.hidden};
document.querySelectorAll('#exportMenu [data-fmt]').forEach(b=>b.onclick=()=>doExport(b.dataset.fmt));


/* ===== v133：加購套件（鈦零組件、BLKTEC 變色龍三套件）=====
   品項與規格依 RIKULAU 2026 年度車架組報價單（2026.07 版）頁 02–04；價格不顯示。
   BLKTEC 三套件＝一體把、前叉、座管（碳纖）。變色龍烤漆：藍紫、古銅、煙霧紫（色樣照片 2026-10-30）；三件可各自選色。
   成組規則（使用者 2026-10-30）：三件一般一同銷售；其中某一位置已選鈦合金件時，其餘碳纖件可單售。
   3D：變色龍以視角相依雙色（正對＝色 A、側掠＝色 B）示意，非真實光學變色；選到的加購件在客製分頁維持不透明，其餘零件仍依透明度滑桿。 */
var ADDX=null;
/* v199zzzzzz123：鈦零組件實景照（使用者 2026-11-20）。加購開啟時在該列下方顯示 1:1 照片；多張者點圖換下一張、循環。水壺架無照片。 */
const ADD_IMG={fork:['img/addon/fork.webp'],stem:['img/addon/stem_01.webp','img/addon/stem_02.webp'],post:['img/addon/post.webp'],collar:['img/addon/collar.webp'],crank:['img/addon/crank_01.webp','img/addon/crank_02.webp']};
const TI_ITEMS=[
 {id:'fork',name:'鈦合金前叉',note:'內走線；適用 Road／Gravel 車架',opts:[]},
 {id:'stem',name:'鈦合金龍頭',note:'內走線；含鈦上蓋（鈦螺絲）、鈦碗組上蓋、25 mm 鈦墊片',lbl:'長度',opts:['80 mm','90 mm','100 mm','110 mm']},
 {id:'post',name:'鈦合金座管',note:'27.2 mm；3D 為標準座管（Seatpost）；本體材質同車架、螺絲同鍊條',opts:[]},
 {id:'collar',name:'鈦合金座管束',note:'3D 為 ST Clamp；尺寸依車款座管外徑（64Ti／EX 34.9 mm、其餘 31.8 mm）；本體材質同車架、螺絲同鍊條',opts:[]},
 {id:'cage',name:'鈦合金水壺架（下管）',note:'對齊下管水壺架鎖孔',opts:[]},
 {id:'cageS',name:'鈦合金水壺架（中管）',note:'對齊中管水壺架鎖孔',opts:[]},
  {id:'crank',name:'鈦合金曲柄組',note:'含中軸、曲柄調整環、不鏽鋼螺絲、墊片、防咬合劑；齒盤介面 SRAM 8 孔（直鎖式）',opts:[],crank:true}];
const CR_INT=['Shimano（OD 24 mm）','SRAM（OD 28.99 mm）'],CR_LEN=['165 mm','170 mm','172.5 mm','175 mm'];
const BK_POS=[['bar','一體把','鈦合金龍頭'],['fork','前叉','鈦合金前叉'],['post','座管','鈦合金座管']];
const BK_COL=[['藍紫',0x3d7f91,0x54457b],['古銅',0x9d6c43,0x534032],['煙霧紫',0x6d4a5f,0x2f2230]];
const ADD_S={col:{fork:-1,stem:-1,post:-1,collar:-1,cage:-1,cageS:-1,crank:-1},ti:{fork:0,stem:0,post:0,collar:0,cage:0,cageS:0,crank:0,cInt:0,cLen:1},bk:{bar:-1,fork:-1,post:-1},ser:3,sd:0,ps:0};/* v199zzzg：預設 M64＝Dura-Ace（見 SER_DEF） */
function bkTi(k){const t=ADD_S.ti;return k==='bar'?t.stem>0:k==='fork'?t.fork>0:t.post>0}
function bkNorm(src){const b=ADD_S.bk,ks=['bar','fork','post'];ks.forEach(k=>{if(bkTi(k))b[k]=-1});
  if(ks.filter(k=>!bkTi(k)).length<3)return;/* 已有鈦件佔位：其餘可單售，不耦合 */
  if(src&&b[src]<0){ks.forEach(k=>b[k]=-1);return}
  const c=(src&&b[src]>=0)?b[src]:[b.bar,b.fork,b.post].find(x=>x>=0);if(c!==undefined)ks.forEach(k=>{if(b[k]<0)b[k]=c})}
function addonExtras(){if(!ADDX)return{blktec:false,ora:false};return{blktec:ADD_S.bk.bar>=0,ora:false}}/* v199zzzzd：加購鈦合金座管改用 3D 座管（PostStd，自帶座管頭），不再畫 ORA 座管頭 */
function addonPostMat(){if(!ADDX)return M.postA;/* v199zzzt：跨分頁同步 */return ADD_S.ti.post>0?M.tiPa:ADD_S.bk.post>=0?M.postC:M.postA}
function chamSet(m,i){const c=m.userData.cham,k=BK_COL[Math.max(0,i)];c.uA.value.setHex(k[1]);c.uB.value.setHex(k[2])}
function chamPatch(m){const uA={value:new THREE.Color()},uB={value:new THREE.Color()};m.userData.cham={uA,uB};m.metalness=.4;m.roughness=.3;m.clearcoat=.8;m.clearcoatRoughness=.08;
  m.onBeforeCompile=sh=>{sh.uniforms.uChA=uA;sh.uniforms.uChB=uB;sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform vec3 uChA;\nuniform vec3 uChB;').replace('#include <color_fragment>','#include <color_fragment>\n{float cf=1.-abs(dot(normalize(vNormal),normalize(vViewPosition)));cf=smoothstep(.08,.85,cf);diffuseColor.rgb=mix(uChA,uChB,cf);}')};
  m.customProgramCacheKey=()=>'cham1';chamSet(m,0)}
(function(){M.tiK=M.tiP.clone();M.tiK.userData={};M.tiK.side=THREE.DoubleSide;(G.casLike||[]).forEach(o=>{o.material=M.casM});
  const fk0=T.FKL.material;M.fkC=fk0.clone();M.fkC.side=THREE.DoubleSide;[M.fkC,M.postC,M.cp].forEach(chamPatch);
  G.oraHead.traverse(o=>{if(o.isMesh&&o.material===M.tiP)o.material=M.tiPa});
  ADDX={fk0,st0:T.stem.material,sr0:T.steer.material,mats:[fk0,M.fkC,M.tiF,M.postA,M.postC,M.tiPa,M.cp,M.tiS,M.tiK]}})();
function addonSyncAlpha(){if(!ADDX)return;const tr=tab==='custom'&&ALPHA<1;
  ADDX.mats.forEach(m=>{const o=!!(m.userData&&m.userData.addonOn),t=!o&&tr,op=t?ALPHA:1;if(m.transparent!==t||m.opacity!==op){m.transparent=t;m.opacity=op;m.depthWrite=!t;m.forceSinglePass=true;m.needsUpdate=true}})}
function addonApply(){try{seatApply()}catch(e){console.warn('seatApply',e)}try{fkDecApply()}catch(e){}if(!ADDX)return;const on=true,b=ADD_S.bk,t=ADD_S.ti,/* v199zzzt：加購顯示不再限客製分頁（使用者 2026-11-11：切回其他主分頁選擇不得消失） */fkC=on&&b.fork>=0&&t.fork<=0,fkT=on&&t.fork>0,poC=on&&b.post>=0&&t.post<=0,poT=on&&t.post>0,bar=on&&b.bar>=0,stT=on&&t.stem>0,crT=on&&t.crank>0;
  T.FKL.material=fkT?M.tiF:fkC?M.fkC:ADDX.fk0;/* v199zzzzh：Shifter 撥片不再隨前叉材質（變色龍），固定深灰 */T.stem.material=stT?M.tiS:ADDX.st0;if(G.stemBody)G.stemBody.material=T.stem.material;T.steer.material=bar?M.cp:stT?M.tiS:ADDX.sr0;G.cap.traverse(o=>{if(o.isMesh){if(!o.userData.m0)o.userData.m0=o.material;o.material=bar?M.cp:o.userData.m0}});/* v192：選一體把時頂蓋（轉向管上端）與轉向管同用變色龍材質 */{const pg=CRKG,pa=CRKA,pf=CRKF,f1=selM==='ss',mst=selM==='64'||selM==='325'||selM==='ili',grv=selM==='ex'||selM==='ss',/* v199zzzg：ili-ili 325 用 M64 的曲柄組 */aud=selM==='audax';CRKG=crT||(grv&&!f1);CRKA=!crT&&aud;CRKF=!crT&&f1;SPIN_CAS=CRKG?40/19:(CRKA||CRKF)?46/19:2.6;/* v199zzzl：SS-2205 改用 Force 1 Gravel 曲柄組（46T）；EX 與加購鈦合金曲柄組仍用 ili-ili 曲柄組（40T） *//* v199r：加購鈦合金曲柄組＝ili-ili 曲柄＋大盤複本（M.tiK）；舊示意曲柄已刪 */G.crkNewG.visible=!crT&&mst;if(G.crkGrvG)G.crkGrvG.visible=!crT&&grv&&!f1;if(G.crkF1G)G.crkF1G.visible=!crT&&f1;if(G.crkAudG)G.crkAudG.visible=!crT&&aud;if(G.crkTiG){G.crkTiG.visible=crT;G.crkTiP.forEach((o,i)=>{o.material=i?M.tiK:M.alBk})/* v199s：大盤（第 0 件）不在加購套件內，維持 ili-ili 大盤原材質 */}if((pg!==CRKG||pa!==CRKA||pf!==CRKF)&&N)applyNodes(N)}/* v196：AUDAX 用 Crankset_for_AUDAX（CRKA）；其餘車款不變 *//* v175；v180：STEP 曲柄組只給 MASTER（64Ti、325Ti），其餘車款用舊版曲柄組；換車款時由 setModel 重算；v183：ili／ili-ili EX／ili-ili SS-2205 用 ili-ili 曲柄組（CRK_GRV），只有 AUDAX 仍用舊版；飛輪示意轉速比＝40T／19T */
  if(fkC)chamSet(M.fkC,b.fork);if(poC)chamSet(M.postC,b.post);if(bar)chamSet(M.cp,b.bar);
  if(!M.tiC){M.tiC=M.tiP.clone();M.tiC.userData={};M.tiC.side=THREE.DoubleSide}if(!M.tiC2){M.tiC2=M.tiP.clone();M.tiC2.userData={};M.tiC2.side=THREE.DoubleSide}/* v199zzzt：中管水壺架獨立材質（陽極色可與下管不同） */
  [[M.fkC,fkC],[M.tiF,fkT],[M.postC,poC],[M.tiPa,poT],[M.cp,bar],[M.tiS,stT],[M.tiK,crT],[M.tiC,on&&t.cage>0],[M.tiC2,on&&t.cageS>0]].forEach(([m,f])=>{m.userData.addonOn=!!f});
  /* v199zzzs：鈦零組件各自陽極色（-1＝鈦原色）：以材質底色套 ANO_MONO 色票（提亮 12%），原色存 userData.c0 */
  {const cm={fork:M.tiF,stem:M.tiS,post:M.tiPa,crank:M.tiK,cage:M.tiC,cageS:M.tiC2};Object.keys(cm).forEach(k=>{const m=cm[k];if(!m||!m.color)return;if(!m.userData.c0)m.userData.c0=m.color.clone();const c=ADD_S.col[k];if(c<0)m.color.copy(m.userData.c0);else m.color.setHex(parseInt(ANO_MONO[c][2],16)).lerp(new THREE.Color(0xffffff),.12)})}
  try{cageApply(on&&t.cage>0,on&&t.cageS>0)}catch(e){console.warn('cage',e)}try{rsForkApply(N)}catch(e){}
  T.post.material=addonPostMat();addonSyncAlpha();serApply()}
function addonRows(){const t=ADD_S.ti,b=ADD_S.bk,r=[];
  TI_ITEMS.forEach(it=>{const v=t[it.id];if(!v)return;if(it.id==='cageS'&&!((BOLT_TB[selM]||{}).st))return;r.push([it.name,'',(it.crank?'加購｜'+CR_INT[t.cInt]+'｜'+CR_LEN[t.cLen]:it.opts.length?it.opts[v-1]:'加購')+(ADD_S.col[it.id]>=0?'｜陽極 '+ANO_MONO[ADD_S.col[it.id]][1]:'')])});
  if(BK_POS.some(([k])=>b[k]>=0)){const free=BK_POS.filter(([k])=>!bkTi(k)).length;
    r.push(['BLKTEC 變色龍碳纖三套件','',BK_POS.map(([k,l,tn])=>l+'：'+(bkTi(k)?'已選'+tn:b[k]>=0?BK_COL[b[k]][0]:'不加購')).join('｜')+(free<3?'（已有鈦合金件，其餘碳纖件單售）':'（成組）')])}
  if(ADD_S.ser>0)r.push(['傳動／煞車系列','',SER_NAME[ADD_S.ser]]);if(!r.length)r.push(['加購','','無']);return r}
function addonChanged(src){bkNorm(src);renderAddon();extras=addonExtras();addonApply();try{fkDecApply();fkPUI()}catch(e){}if(N)goNodes(N,true);wk()}
/* ===== v199zzzzzz31：前叉貼圖（使用者 2026-11-13 附件 RIKULAU_Fork_logo.svg、Fork_Inside_Pattern.svg 與示意圖）=====
   左叉腿外側＝RIKULAU 字樣、右叉腿內側＝圖樣，兩者貼面皆朝 −z（側視由外向內看，車頭在左）。示意圖標註自叉腿末端起算：圖樣下緣 70 mm、字樣下緣 40 mm；末端＝軸心端（a＝392）加圓弧延伸 12 mm。
   圖上其餘尺寸未標，依示意圖比例估算：字樣長 46×高 8.3 mm（SVG 長寬比 5.53）、圖樣長 215×寬 26.8 mm（SVG 長寬比 8.02）；目視後各放大 125%（字樣 57.5×10.4、圖樣 268.8×33.5，以中心放大）。兩者皆 SVG 的 x 軸沿叉腿由軸心往叉冠、y 軸由車頭往車尾。
   顏色：碳纖前叉＝KING 貼圖色（#c8c4b8）；鈦合金前叉（ADD_S.ti.fork>0）內側圖樣可選單色／漸層（沿長邊，下端＝色 A）／碎花（同車架碎花遮罩與平鋪尺度），外側字樣固定槍灰 #585c60。
   貼面做法：沿 a（叉腿軸向）取 NA 站，每站在叉腿截面多邊形上以平面 y＝cp＋v 求側面 z（外側取最小、內側取最大），再外移 0.12 mm；網格掛在 T.FKL 下，隨前叉矩陣移動。 */
var FKD=null,FKIMG={},FKM=null;
/* v199zzzzzz32：貼面頂點投影到叉腿實際網格。v31 以截面多邊形公式算貼面，實測在叉腿側面中線處比實際網格表面深約 0.5 mm（射線檢測：叉腿表面 675.10、貼面 675.59 mm），貼面大半埋在表面下，只剩前緣幾段露出，看起來偏向車頭且不完整。改為：貼面每個頂點保留 (a, y)，沿 z 軸對 T.FKL.geometry 的三角形求交，取外側（L：z<0 最小；R：z>0 最小，內側面朝 −z）表面，再外移 0.35 mm */
function fkProj(P,leg){const g=T.FKL.geometry;if(!g||!g.index||!g.attributes.position)return 0;const pa=g.attributes.position.array,ix=g.index.array,nt=ix.length/3,tr=[];
  for(let t=0;t<nt;t++){const a=ix[3*t]*3,b=ix[3*t+1]*3,c=ix[3*t+2]*3,x0=pa[a],y0=pa[a+1],z0=pa[a+2],x1=pa[b],y1=pa[b+1],z1=pa[b+2],x2=pa[c],y2=pa[c+1],z2=pa[c+2],den=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2);if(Math.abs(den)<1e-16)continue;
    tr.push([Math.min(x0,x1,x2),Math.max(x0,x1,x2),Math.min(y0,y1,y2),Math.max(y0,y1,y2),x0,y0,z0,x1,y1,z1,x2,y2,z2,den])}
  let n=0;for(let p=0;p<P.length;p+=3){const x=P[p],y=P[p+1];let best=null;
    for(let t=0;t<tr.length;t++){const q=tr[t];if(x<q[0]||x>q[1]||y<q[2]||y>q[3])continue;const den=q[13],l0=((q[8]-q[11])*(x-q[10])+(q[10]-q[7])*(y-q[11]))/den,l1=((q[11]-q[5])*(x-q[10])+(q[4]-q[10])*(y-q[11]))/den,l2=1-l0-l1;if(l0<-1e-6||l1<-1e-6||l2<-1e-6)continue;
      const z=l0*q[6]+l1*q[9]+l2*q[12];if(leg==='L'?z<0:z>0){if(best===null||(leg==='RO'?z>best:z<best))best=z}}
    if(best!==null){P[p+2]=best+(leg==='RO'?.35e-3:-.35e-3);n++}}
  return n}
/* v199zzzzzz130：前叉貼面依實際網格建構（使用者 2026-11-20：兩側貼圖不夠置中且傾斜）。
   原因：①畫面上的叉腿是 OPTG 減面幾何（取自 v96 舊叉腿，中心線與 v31／v32 改直後的 FK.legs 不同），以 FK.legs 公式置中偏約 2.5 mm；②舊做法每列取「固定 a（垂直轉向管軸）」的截面，叉腿相對轉向管軸斜約 7°，貼圖被剪切成斜體。
   做法：叉腿三角形依 x 分桶；每列沿「垂直叉腿軸線」的直線取樣，以 z 向投影求表面，取投影有效範圍中點為該列中心（側視輪廓置中）；中心點擬合直線定軸向（三輪），再以移動平均貼合叉腿彎度；寬度依表面弧長展開。單位 mm，回傳公尺座標。 */
function fkMeshDec(ac,len,w,leg,sc,NA,NV,cp0){const g=T.FKL.geometry;if(!g||!g.index||!g.attributes.position)return null;
  const pa=g.attributes.position.array,ix=g.index.array,sg=leg==='L'?-1:1,BW=2,bins=new Map(),tr=[];
  for(let t=0;t<ix.length;t+=3){const a=ix[t]*3,b=ix[t+1]*3,c=ix[t+2]*3,x0=pa[a]*1e3,y0=pa[a+1]*1e3,z0=pa[a+2]*1e3,x1=pa[b]*1e3,y1=pa[b+1]*1e3,z1=pa[b+2]*1e3,x2=pa[c]*1e3,y2=pa[c+1]*1e3,z2=pa[c+2]*1e3;
    if(z0*sg<=0||z1*sg<=0||z2*sg<=0)continue;const den=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2);if(Math.abs(den)<1e-9)continue;
    const q=[Math.min(x0,x1,x2),Math.max(x0,x1,x2),Math.min(y0,y1,y2),Math.max(y0,y1,y2),x0,y0,z0,x1,y1,z1,x2,y2,z2,den],k=tr.length;tr.push(q);
    for(let bb=Math.floor(q[0]/BW);bb<=Math.floor(q[1]/BW);bb++){let L=bins.get(bb);if(!L)bins.set(bb,L=[]);L.push(k)}}
  if(!tr.length)return null;
  const better=leg==='RO'?(z,b)=>z>b:(z,b)=>z<b;
  const hit=(x,y)=>{const L=bins.get(Math.floor(x/BW));if(!L)return null;let best=null;for(const k of L){const q=tr[k];if(x<q[0]||x>q[1]||y<q[2]||y>q[3])continue;const l0=((q[8]-q[11])*(x-q[10])+(q[10]-q[7])*(y-q[11]))/q[13],l1=((q[11]-q[5])*(x-q[10])+(q[4]-q[10])*(y-q[11]))/q[13],l2=1-l0-l1;if(l0<-1e-6||l1<-1e-6||l2<-1e-6)continue;const z=l0*q[6]+l1*q[9]+l2*q[12];if(best===null||better(z,best))best=z}return best};
  /* 一列：自 (cx,cy) 沿 n 取樣 d∈[−40,40]，回傳含最接近 d＝0 有效點的連續段 */
  const DS=.25,row=(cx,cy,nx,ny)=>{const D=[],Z=[];for(let i=0;i<=320;i++){const d=-40+i*DS;D.push(d);Z.push(hit(cx+nx*d,cy+ny*d))}let k0=-1,bd=1e9;D.forEach((d,i)=>{if(Z[i]!==null&&Math.abs(d)<bd){bd=Math.abs(d);k0=i}});if(k0<0)return null;let lo=k0,hi=k0;while(lo>0&&Z[lo-1]!==null)lo--;while(hi<D.length-1&&Z[hi+1]!==null)hi++;return{D:D.slice(lo,hi+1),Z:Z.slice(lo,hi+1)}};
  const L0=FK.legs,L1=L0[L0.length-1];let q=(L1[2]-L0[0][2])/10/(L1[0]-L0[0][0]),p=cp0-q*ac;
  let rows=null,E=null,nx=0,ny=1;
  for(let pass=0;pass<3;pass++){const nn=Math.hypot(1,q),tx=1/nn,ty=q/nn;nx=-q/nn;ny=1/nn;const ay=p+q*ac;rows=[];E=[];
    for(let i=0;i<=NA;i++){const u=len/2-len*i/NA,cx=ac+tx*u,cy=ay+ty*u,r=row(cx,cy,nx,ny);rows.push({cx,cy,r});E.push(r&&r.D.length>4?(r.D[0]+r.D[r.D.length-1])/2:null)}
    if(pass===2)break;
    let n=0,sx=0,sy=0,sxx=0,sxy=0;rows.forEach((o,i)=>{if(E[i]===null)return;const X=o.cx+nx*E[i],Y=o.cy+ny*E[i];n++;sx+=X;sy+=Y;sxx+=X*X;sxy+=X*Y});if(n<3)return null;
    q=(n*sxy-sx*sy)/(n*sxx-sx*sx);p=(sy-q*sx)/n}
  const W=3,Es=E.map((_,i)=>{let s=0,c=0;for(let k=i-W;k<=i+W;k++)if(k>=0&&k<E.length&&E[k]!==null){s+=E[k];c++}return c?s/c:0});
  const out=[],off=(leg==='RO'?.35:-.35);
  for(let i=0;i<=NA;i++){const o=rows[i],r=o.r,e=Es[i];let A=null;
    if(r&&r.D.length>1){const n=r.D.length,S=new Array(n).fill(0);let k0=0;r.D.forEach((d,k)=>{if(Math.abs(d-e)<Math.abs(r.D[k0]-e))k0=k});
      for(let k=k0+1;k<n;k++)S[k]=S[k-1]+Math.hypot(r.D[k]-r.D[k-1],r.Z[k]-r.Z[k-1]);for(let k=k0-1;k>=0;k--)S[k]=S[k+1]-Math.hypot(r.D[k+1]-r.D[k],r.Z[k+1]-r.Z[k]);
      const sh=e-r.D[k0];for(let k=0;k<n;k++)S[k]-=sh;A={S,D:r.D,Z:r.Z}}
    for(let j=0;j<=NV;j++){const s=sc+w/2-w*j/NV;let d=e+s,z=null;
      if(A){const S=A.S,n=S.length;if(s<=S[0]){d=A.D[0];z=A.Z[0]}else if(s>=S[n-1]){d=A.D[n-1];z=A.Z[n-1]}else{let k=0;while(k<n-2&&S[k+1]<s)k++;const t=(s-S[k])/((S[k+1]-S[k])||1);d=A.D[k]+(A.D[k+1]-A.D[k])*t;z=A.Z[k]+(A.Z[k+1]-A.Z[k])*t}}
      if(z===null){const zz=hit(o.cx+nx*d,o.cy+ny*d);z=zz===null?0:zz}
      out.push((o.cx+nx*d)*1e-3,(o.cy+ny*d)*1e-3,(z+off)*1e-3)}}
  return out}
const FK_KING='#c8c4b8',FK_GUN='#585c60',FK_PAT_SVG=VIBE_D.FK_PAT_SVG,FK_LOGO_SVG="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg id=\"_圖層_1\" data-name=\"圖層_1\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 196.87 35.59\">\n  <\!-- Generator: Adobe Illustrator 29.7.1, SVG Export Plug-In . SVG Version: 2.1.1 Build 8)  -->\n  <defs>\n    <style>\n      .st0 {\n        fill: #fff;\n        fill-rule: evenodd;\n      }\n\n      .st1 {\n        fill: none;\n        stroke: #231814;\n        stroke-miterlimit: 10;\n      }\n    </style>\n  </defs>\n  <g>\n    <path class=\"st0\" d=\"M0,8.85h5.04s7.77,0,7.77,0c5.99,0,10.87,4.84,10.87,10.87,0,3.47-1.6,6.52-4.16,8.51l3.93,7.36H0S0,11.99,0,11.99v-3.14h0Z\"/>\n    <polygon class=\"st0\" points=\"48.25 8.85 48.25 35.59 74.42 35.59 64.43 22.2 74.42 8.85 48.25 8.85 48.25 8.85\"/>\n    <path class=\"st0\" d=\"M79.11,22.52c0,7.21,5.86,13.07,13.07,13.07,7.21,0,13.07-5.86,13.07-13.07v-13.67s-26.14,0-26.14,0v13.67h0Z\"/>\n    <polygon class=\"st0\" points=\"124.36 22.22 124.36 8.85 110.99 8.85 110.99 35.59 131.77 35.59 131.77 22.22 124.36 22.22 124.36 22.22\"/>\n    <path class=\"st0\" d=\"M169.8,22.52c0,7.21,5.86,13.07,13.07,13.07,7.21,0,13.07-5.86,13.07-13.07v-13.67s-26.14,0-26.14,0v13.67h0Z\"/>\n    <path class=\"st0\" d=\"M151.88,8.85l-15.78,26.74h31.56s-15.78-26.74-15.78-26.74ZM151.89,19.93l6.17,10.45h-12.33s6.17-10.45,6.17-10.45Z\"/>\n    <g>\n      <path class=\"st0\" d=\"M28.86,11.76v23.82s13.79,0,13.79,0V9.07c-5.92,2.59-10.26,3.16-13.79,2.69h0Z\"/>\n      <path class=\"st0\" d=\"M42.65,4.63c-8.45,3.69-13.03,2.49-17.01.39,6.56.4,10.01-.39,15.18-3.44l1.83,3.06h0Z\"/>\n    </g>\n  </g>\n  <polygon class=\"st1\" points=\"-71.53 44.06 -78.39 50.92 -78.39 37.2 -71.53 44.06\"/>\n</svg>";
function fkDecInit(){if(FKD)return;
  const L=FK.legs,NR=32;
  const stAt=a=>{let i=0;while(i<L.length-2&&a>L[i+1][0])i++;const A=L[i],B=L[i+1],t=Math.max(0,Math.min(1,(a-A[0])/(B[0]-A[0]))),r=[];for(let k=0;k<NR;k++)r.push((A[3+k]+(B[3+k]-A[3+k])*t)/10);return{cl:(A[1]+(B[1]-A[1])*t)/10,cp:(A[2]+(B[2]-A[2])*t)/10,r}};
  /* v199zzzzzz31b：貼面改依截面「弧長」展開——側面半圈折線（外側＝dz<0 那半、內側＝dz>0 那半，自車頭極點經叉腿側面中心到車尾極點），s＝0 在側面中心（dy＝0），朝車頭為正；貼圖寬度是真實表面寬，不因截面圓弧而壓縮 */
  const IDX={L:[],R:[],RO:[]};for(let k=8;k<=24;k++){IDX.L.push(k);IDX.RO.push(k)}for(let k=8;k>=0;k--)IDX.R.push(k);for(let k=31;k>=24;k--)IDX.R.push(k);
  const surfAt=(S,leg,s)=>{const id=IDX[leg],n=id.length,mid=(n-1)/2,Y=[],Z=[],cum=new Array(n).fill(0);
    id.forEach(k=>{const ph=k/NR*2*Math.PI;Y.push(S.r[k]*Math.sin(ph));Z.push(S.r[k]*Math.cos(ph))});
    for(let i=mid-1;i>=0;i--)cum[i]=cum[i+1]+Math.hypot(Y[i]-Y[i+1],Z[i]-Z[i+1]);for(let i=mid+1;i<n;i++)cum[i]=cum[i-1]-Math.hypot(Y[i]-Y[i-1],Z[i]-Z[i-1]);
    s=Math.max(cum[n-1],Math.min(cum[0],s));let i=0;while(i<n-2&&s<cum[i+1])i++;const t=(cum[i]-s)/((cum[i]-cum[i+1])||1),y=Y[i]+(Y[i+1]-Y[i])*t,z=Z[i]+(Z[i+1]-Z[i])*t,pr=Math.hypot(y,z)||1,k=(pr+.12)/pr;return{y:y*k,z:z*k}};
  const mat=()=>new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3,side:THREE.DoubleSide,toneMapped:false});
  const mk=(ac,len,w,leg,kind,sc)=>{const NA=Math.max(24,Math.round(len/2.5)),NV=16,P=[],U=[],I=[];
    /* v199zzzzzz130：貼面改由實際叉腿網格（OPTG 減面版）逐列取輪廓置中，列方向垂直叉腿軸線（見 fkMeshDec）；失敗才退回舊公式 */
    let okM=false;try{const R=fkMeshDec(ac,len,w,leg,sc,NA,NV,stAt(ac).cp);if(R){R.forEach(v=>P.push(v));okM=true}}catch(e){console.warn('fkMeshDec',e)}
    for(let i=0;i<=NA;i++){const a=ac+len/2-len*i/NA,S=okM?null:stAt(a);for(let j=0;j<=NV;j++){if(!okM){const p=surfAt(S,leg,sc+w/2-w*j/NV);P.push(a*1e-3,(S.cp+p.y)*1e-3,(leg.charAt(0)==='L'?S.cl+p.z:-(S.cl+p.z))*1e-3)}
      /* v199zzzzzz130：右叉腿外側字樣旋轉 180°（使用者 2026-11-20：原本上下顛倒） */
      if(leg==='RO')U.push(1-i/NA,1-j/NV);else U.push(i/NA,1-j/NV)}}
    if(!okM)try{fkProj(P,leg)}catch(e){console.warn('fkProj',e)}
    for(let i=0;i<NA;i++)for(let j=0;j<NV;j++){const q=i*(NV+1)+j;I.push(q,q+1,q+NV+1,q+1,q+NV+2,q+NV+1)}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);
    const m=new THREE.Mesh(g,mat());m.userData.keepOpaque=true;m.userData.noBT=true;m.frustumCulled=false;m.renderOrder=2;T.FKL.add(m);
    const cv=document.createElement('canvas');cv.width=kind==='pat'?2048:1024;cv.height=Math.round(cv.width*w/len);
    return{mesh:m,mat:m.material,cv,kind,len,key:''}};
  const END=392+12;
  /* v199zzzzzz32：外側字樣再上移 15 mm；貼面頂點改投影到叉腿實際網格表面（見 fkProj）。2026-11-13 目視後調整：外側字樣上移 7 mm、放大 125%（以中心放大）；內側圖樣往車尾移 4 mm 弧長、放大 125% */
  /* v199zzzzzz34：右叉腿外側加上與左外側相同的 RIKULAU 字樣，UV 旋轉 180° */
  FKD={out:mk(END-40-23-7-15,57.5,10.375,'L','logo',0),out2:mk(END-40-23-7-15,57.5,10.375,'RO','logo',0),inn:mk(END-70-107.5,268.75,33.5,'R','pat',0)};/* v199zzzzzz130：網格置中後取消 v32 的往車尾 4 mm 補償 */logoSplPatch(FKD.inn.mat);
  const ld=(k,svg)=>{const im=new Image();im.onload=()=>{FKIMG[k]=im;fkDecApply(true)};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgWH(svg))};ld('pat',FK_PAT_SVG);ld('logo',FK_LOGO_SVG);
  FKM=new Image();FKM.onload=()=>{const c=document.createElement('canvas');c.width=c.height=768;const g=c.getContext('2d');g.drawImage(FKM,0,0,768,768);const d=g.getImageData(0,0,768,768).data,a=new Uint8Array(768*768);for(let i=0;i<a.length;i++)a[i]=d[i*4];FKM.lum=a;fkDecApply(true)};FKM.src=SPL_MASK}
function fkPatSpec(){if(!(ADD_S.ti.fork>0))return{c:FK_KING};const v=fkPat;if(v[0]==='m'&&ANO_MONO[+v.slice(1)])return{c:'#'+ANO_MONO[+v.slice(1)][2]};if(v[0]==='g'&&ANO_GRAD[+v.slice(1)]){const q=ANO_GRAD[+v.slice(1)];return{g:{t:q[1],c:q[2]}}}if(v[0]==='s'&&SPL[+v.slice(1)]){const q=SPL[+v.slice(1)];return{s:{a:q[1],b:q[2],sz:splSz}}}return{c:FK_KING}}
function fkPaint(slot,spec){const im=FKIMG[slot.kind];if(!im)return;const cv=slot.cv,W=cv.width,H=cv.height,g=cv.getContext('2d');g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);g.drawImage(im,0,0,W,H);g.globalCompositeOperation='source-in';
  if(spec.c){g.fillStyle=spec.c;g.fillRect(0,0,W,H)}
  else if(spec.g){const gr=g.createLinearGradient(0,0,W,0);spec.g.t.forEach((t,i)=>gr.addColorStop(t,'#'+spec.g.c[i]));g.fillStyle=gr;g.fillRect(0,0,W,H)}
  else if(spec.s){g.fillStyle='#fff';g.fillRect(0,0,W,H)}
  /* v199zzzzzz125：碎花不再於畫布上沿叉腿軸向平鋪（圖樣方向隨叉腿傾角轉了約 90°，與車架、頭管不一致；同 v122 中管碎花問題）。畫布只留圖樣形狀（白），碎花由 logoSplPatch 以世界座標三向投影取樣車架同一張遮罩與尺度 */
  {const U=slot.mat.userData.lsp;if(U){if(spec.s){U.uLSpl.value=1;U.uLA.value.setHex(parseInt(spec.s.a,16));U.uLB.value.setHex(parseInt(spec.s.b,16));U.uLS.value=1000/spec.s.sz;if(mcU&&mcU.uSplT)U.uLT.value=mcU.uSplT.value}else U.uLSpl.value=0}}
  g.globalCompositeOperation='source-over';
  if(!slot.mat.map){const tx=new THREE.CanvasTexture(cv);tx.anisotropy=4;tx.colorSpace=THREE.SRGBColorSpace;slot.mat.map=tx;slot.mat.needsUpdate=true}else slot.mat.map.needsUpdate=true}
function fkDecApply(force){try{fkDecInit();const ti=ADD_S.ti.fork>0,o=FKD.out,o2=FKD.out2,n=FKD.inn,so={c:ti?FK_GUN:FK_KING},sn=fkPatSpec(),ko=JSON.stringify(so),kn=JSON.stringify(sn);
    if(force||o.key!==ko||!o.mat.map){o.key=ko;fkPaint(o,so)}
    if(o2&&(force||o2.key!==ko||!o2.mat.map)){o2.key=ko;fkPaint(o2,so)}if(force||n.key!==kn||!n.mat.map){n.key=kn;fkPaint(n,sn)}wk()}catch(e){console.warn('fkDec',e)}}
function fkPatLabel(){if(!(ADD_S.ti.fork>0))return'KING 貼圖色（碳纖前叉）';const v=fkPat;if(v[0]==='m'&&ANO_MONO[+v.slice(1)])return'單色陽極｜'+ANO_MONO[+v.slice(1)][0];if(v[0]==='g'&&ANO_GRAD[+v.slice(1)])return'漸層陽極｜'+ANO_GRAD[+v.slice(1)][0];if(v[0]==='s'&&SPL[+v.slice(1)])return'碎花陽極｜'+SPL[+v.slice(1)][0];return'KING 貼圖色'}
function fkPUI(){const el=document.getElementById('fkPSw'),h=document.getElementById('fkPH'),nt=document.getElementById('fkPN');if(!el||!h)return;const ok=ADD_S.ti.fork>0;el.style.display=h.style.display=ok?'':'none';if(nt)nt.style.display=ok?'':'none';if(!ok)return;
  mkSel(el,'前叉內側圖樣顏色',[['預設',[['k','KING 貼圖色（預設）',['c8c4b8']]]],['單色陽極',ANO_MONO.map((q,i)=>['m'+i,q[0]+'　'+q[1]+'　#'+q[2],[q[2]]])],['漸層陽極（沿叉腿，下端→上端）',ANO_GRAD.map((q,i)=>['g'+i,q[0]+'　#'+q[2][0]+' → #'+q[2][5],[q[2][0],q[2][5]]])],['碎花陽極（同車架碎花遮罩）',SPL.map((q,i)=>['s'+i,q[0]+'　#'+q[1]+' ＋ #'+q[2],[q[1],q[2]]])]],fkPat,v=>{fkPat=v;fkDecApply();wk()})}

/* v142：加購頁的選項用「標準／插畫」同款膠囊（選中＝淡橘底）。v199zzzzn：有無加購改單鍵切換（橘底＝已加購）；有規格的項目加購後才出現規格分段。 */
const TI_DEF={stem:3,collar:1};/* 預設規格：龍頭 100 mm、座管束 31.8 mm */

/* ===== v199zzzu：EX 專用 RockShox 避震前叉（使用者 2026-11-11）。來源 glb_dec/RS_Suspension_EX_Sample_dec.glb（0.15 mm 減面版 85,372 面）→ 焊接 0.01 mm＋meshoptimizer 再減面＝35,234 面、9 材質群、payload 246 KB（build_fork.mjs）。
   座標已離線烘焙：glTF→頁面（x=−gz, y=gy, z=gx）→ 原點移到軸心（glTF y87.30/z−672.04，橫向中心 +0.2）→ 旋轉 +2.602° → 沿「軸心→冠頂」弦縮 0.98437。
   量測（fork_axis4/fork_crown）：轉向軸＝左右內管 PCA 中線，傾 23.56°（車架 23.4°）、離頭管軸 2.6 mm；冠頂取軸上 y=470（鑄件半徑 105→50 mm 轉折）；GLB offset≈30 mm vs 幾何表 50 mm、沿軸長 17 mm 差——烘焙把軸心釘在 FA、冠頂釘在頭管下端下移 23 mm 處（＝剛性叉冠錨點），轉向軸相對頭管軸殘留傾差 2.6°（冠頂樞紐，目視不可辨）。
   執行期：G.rsFork.position＝FA，無旋轉。EX 預設顯示；加購鈦前叉（ADD_S.ti.fork>0）時換回剛性叉。已知限制：EX 若切成隱藏式頭碗（fd 9），冠頂與下碗間會出現 14 mm 縫，暫不處理。 */
/* v199zzzzzz18：RS 前叉大瘦身——22,750→10500 三角形（焊接 0.003 mm→fast_simplification 二次誤差減面→35° 折角重拆頂點→同格式 Z85 編碼，與原面相比平均偏差 0.1–1.2 mm、最大 7 mm 在貼字），payload 170→105 KB */const FORK_PAY=VIBE_D.FORK_PAY;
function satHex(c,k){const l=.2126*c.r+.7152*c.g+.0722*c.b;c.r=l+(c.r-l)*k;c.g=l+(c.g-l)*k;c.b=l+(c.b-l)*k;return c}/* v199zzzze：彩度 ×k（線性色彩空間、保持亮度） */
function forkMat(gr){const n=gr.n;let m;
  if(n==='Silver')return goldMat();/* v199zzzzzz28：EX 前叉伸縮管（Silver 群組）改鈦合金陽極金黃 50 V（使用者 2026-11-13） */
  if(n==='Carbon')return serMat('seat_cf',M.carbon);
  if(n==='BLK_Glossy'){m=serMat('rs_bg',M.dark);m.roughness=.35;return m}
  if(n==='BLK_Matte')return serMat('seat_dk',M.dark);
  if(n==='Screw'||n==='Cable'){m=serMat('rs_'+n,M.steel);m.color.set(gr.c);m.metalness=.6;m.roughness=.35;return m}
  if(n==='Low_Leg'){m=serMat('rs_leg',M.saddle);m.color.set(gr.c);satHex(m.color,.6);/* v199zzzze：RS 下腿紅色彩度 −40% */m.metalness=.12;m.roughness=.42;return m}
  if(n==='WHT_Label'){m=serMat('rs_lbl',M.saddle);m.color.set(gr.c);m.roughness=.5;return m}
  m=serMat('rs_x'+gr.c,M.steel);m.color.set(gr.c);m.metalness=.5;m.roughness=.4;return m}
/* v199zzzw：EX 避震前叉分「冠總成」與「下腿」兩部分。冠總成＝冠鑄件、冠頂蓋、伸縮管（內管）與其上零件（連通元最低點在冠頂下 72.1 mm 以上者，加上全部伸縮管群組 8）；其餘（下腿、拱橋、軸、封油環）為下腿。RSF：A＝伸縮管軸單位向量（局部座標，x 向前、y 向上）、S＝冠頂面中心（轉向管軸上，公尺）、Tm＝分界（沿 A、相對冠頂，公尺）。數值取自 PCA（兩側伸縮管）與冠頂圓台擬合（中心距伸縮管中線 −19.8 mm，半徑約 20 mm）。 */
var RSF={A:[-.43769,.89913],S:[-.23703,.3716],Tm:-.0721};
function rsForkBuild(){const g=new THREE.Group(),cr=new THREE.Group();g.add(cr);g.userData.crown=cr;const A=RSF.A,S=RSF.S;
  FORK_PAY.g.forEach((gr,gi)=>{const geo=seatDec(gr),mat=forkMat(gr),pa=geo.attributes.position,nV=pa.count,ix=geo.index?geo.index.array:null;
    if(!ix){const m=new THREE.Mesh(geo,mat);m.frustumCulled=false;m.userData.noBT=true;g.add(m);return}
    const mp=new Map(),id=new Int32Array(nV);let nid=0;for(let i=0;i<nV;i++){const k=Math.round(pa.getX(i)*1e4)+','+Math.round(pa.getY(i)*1e4)+','+Math.round(pa.getZ(i)*1e4);let w=mp.get(k);if(w===undefined){w=nid++;mp.set(k,w)}id[i]=w}
    const par=new Int32Array(nid);for(let i=0;i<nid;i++)par[i]=i;const fnd=x=>{while(par[x]!==x){par[x]=par[par[x]];x=par[x]}return x};
    for(let i=0;i<ix.length;i+=3){const a=fnd(id[ix[i]]),b=fnd(id[ix[i+1]]);if(a!==b)par[b]=a;const a2=fnd(a),c=fnd(id[ix[i+2]]);if(c!==a2)par[c]=a2}
    const tmin=new Float64Array(nid).fill(1e9);for(let i=0;i<nV;i++){const r=fnd(id[i]),t=(pa.getX(i)-S[0])*A[0]+(pa.getY(i)-S[1])*A[1];if(t<tmin[r])tmin[r]=t}
    const lo=[],hi=[];for(let i=0;i<ix.length;i+=3){(gi===8||tmin[fnd(id[ix[i]])]>=RSF.Tm?hi:lo).push(ix[i],ix[i+1],ix[i+2])}
    [[lo,g],[hi,cr]].forEach(([arr,pr])=>{if(!arr.length)return;const gg=new THREE.BufferGeometry();Object.keys(geo.attributes).forEach(k=>gg.setAttribute(k,geo.attributes[k]));gg.setIndex(new THREE.BufferAttribute(new Uint32Array(arr),1));const m=new THREE.Mesh(gg,mat);m.frustumCulled=false;m.userData.noBT=true;if(gr.n==='WHT_Label'||gr.n==='Cable')m.userData.noOL=true;/* v199zzzzzz18：RS 前叉上輪廓線（已加入 outRoots）；貼字與電纜（細小）不加 */pr.add(m)})});
  bike.add(g);return g}
/* v199zzzw：叉姿態。三步合成一次解：(1) 冠總成沿伸縮管下移讓出空間；(2) 整支前叉繞前軸心順時針（右側視）旋轉，直到冠頂中心的轉向管軸通過頭管軸上「下碗底面」中心（轉向管軸＝伸縮管中線偏後 19.8 mm，距軸心 50.5 mm，與幾何表叉偏 50 mm 差 0.5 mm）；(3) 冠總成沿（已轉正的）伸縮管上移，冠頂面貼下碗底面（穿入 0.3 mm 避免髮絲縫）。解析解：轉向軸線與以前軸心為圓心、半徑 h 的圓相切並過目標點（取旋轉角較小的根），再沿軸線求滑移量。 */
function rsForkPose(n){const g=G.rsFork,cr=g&&g.userData.crown;if(!cr||!n||!n.FA||!n.HTb||!n.HTt)return;
  let ux=n.HTb.x-n.HTt.x,uy=n.HTb.y-n.HTt.y;const L=Math.hypot(ux,uy);ux/=L;uy/=L;
  const dd=(exFd()+.3)*1e-3,px=(n.HTb.x-n.FA.x)*1e-3+ux*dd,py=(n.HTb.y-n.FA.y)*1e-3+uy*dd;
  const A=RSF.A,S=RSF.S,Nx=A[1],Ny=-A[0],h=S[0]*Nx+S[1]*Ny,rho=Math.hypot(px,py),ac=Math.acos(Math.max(-1,Math.min(1,h/rho))),al=Math.atan2(Ny,Nx),be=Math.atan2(py,px);
  const w=x=>{x=(x+Math.PI)%(2*Math.PI);if(x<0)x+=2*Math.PI;return x-Math.PI};
  const p1=w(be+ac-al),p2=w(be-ac-al),phi=Math.abs(p1)<Math.abs(p2)?p1:p2,cs=Math.cos(phi),sn=Math.sin(phi);
  const tx=cs*S[0]-sn*S[1],ty=sn*S[0]+cs*S[1],ax=cs*A[0]-sn*A[1],ay=sn*A[0]+cs*A[1];
  const s=((px-tx)*ux+(py-ty)*uy)/(ax*ux+ay*uy);
  g.rotation.z=phi;cr.position.set(s*A[0],s*A[1],0);G._rsPose={rotDeg:phi*180/Math.PI,slideMm:s*1e3}}
function rsLift(){/* v199zzzv：EX 掛 RS 前叉時，頭管＋上下碗組上移「下碗組厚度」：外露式下碗高 16 mm、全隱藏式下冠環 2 mm（單位 m） */if(model!=='ex'||(typeof ADD_S!=='undefined'&&ADD_S.ti.fork>0))return 0;return 0}/* v199zzzw：不再上移頭管／碗組／龍頭（頭管上下露出量回到 HT_EQ 標準：上 21.3、下 17.7）；叉冠改由 rsForkPose 沿伸縮管滑到下碗底，轉向軸與頭管軸對齊 */
function rsForkApply(n){const on=(model==='ex')&&!(typeof ADD_S!=='undefined'&&ADD_S.ti.fork>0);
  if(n&&G._rsl!==undefined&&G._rsl!==rsLift()&&!G._rsBusy){G._rsBusy=1;try{applyNodes(n)}finally{G._rsBusy=0}}
  if(on&&!G.rsFork){if(typeof serMat==='undefined'||typeof seatDec==='undefined')return;G.rsFork=rsForkBuild()}
  if(G.rsFork)G.rsFork.visible=on;T.FKL.visible=!on;
  if(on&&n&&n.FA){G.rsFork.position.set(n.FA.x*1e-3,n.FA.y*1e-3,0);rsForkPose(n)}}
/* ===== v199zzzt：鈦合金水壺架（下管／中管加購）——「孔對孔」放置。資料＝SEAT_PAY.Cage（GLB 組裝座標：原點＝BB、x 向前、y 向上）。
   水壺架自身兩鎖孔中心（GLB 局部座標，以 64Ti M 下管軸向射線掃描實測，2026-11-11）：CAGE_Q1／Q2，孔距 64.0 mm；背板相對 64Ti M 下管軸傾約 4.7°，故不得再用「剛性隨下管角旋轉」。
   放置：孔線方向對齊管軸、背板朝外法線對齊管面外法向（中管在車架平面另一側，手性相反，先繞孔線翻 180°，網格 z 向對稱），孔對中點以射線（同 boltsUpdate）貼到車架鎖孔中點的管面上。
   下管孔＝BOLT_TB[model].dt（EX 取 dtU 前兩孔＝近 BB 的一組、SS 取 dtU）；中管孔＝BOLT_TB[model].st（EX 無，選項不顯示）。 */
var CAGE_Q1=[113.311,182.152],CAGE_Q2=[152.771,232.498],CAGE_RC=null;
function cageMk(mat){const g=new THREE.Group(),D=SEAT_PAY.Cage;D.g.forEach(gr=>{const m=new THREE.Mesh(seatDec(gr),mat);m.frustumCulled=false;m.userData.noBT=true;g.add(m)});bike.add(g);return g}
function cageApply(onD,onS){if(onD&&!G.cageG)G.cageG=cageMk(M.tiC);if(onS&&!G.cageS)G.cageS=cageMk(M.tiC2||M.tiC);
  if(G.cageG)G.cageG.visible=!!onD;if(G.cageS)G.cageS.visible=!!onS;if((onD||onS)&&N)cagePlace(N);/* v199zzzzf：水壺架補輪廓線（新建網格需重新分層；G.cageG／G.cageS 已加入 outRoots） */try{if(typeof tagOutline==='function'&&G.olOn!==undefined&&(onD||onS))tagOutline(G.olOn)}catch(e){}}
function cagePair(which){const tb=BOLT_TB[model]||{};if(which==='st')return tb.st?{p:tb.st,mesh:T.ST,a:'BB',b:'STtop',sg:-1}:null;
  const p=tb.dt||(tb.dtU?(model==='ex'?tb.dtU.slice(1,3):tb.dtU.slice(0,2)):null);/* v199zzzzd：EX 水壺架上移一個鎖孔（原 dtU 第 1、2 孔 → 第 2、3 孔，使用者 2026-11-11） */return p?{p,mesh:(LOFTON?loft.DT:T.DT),a:'BB',b:'DTht',sg:1}:null}
function cageSet(g,mt,n){if(!mt||!n[mt.a]||!n[mt.b]){g.visible=false;return}
  const a=n[mt.a],b=n[mt.b],dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,u={x:dx/L,y:dy/L};
  let f={x:-u.y*mt.sg,y:u.x*mt.sg};/* 同 boltsUpdate holes()：f=rot90ccw(u)×sgn（下管 sgn=1 上面、中管 sgn=-1 前面） */
  const sm=(mt.p[0]+mt.p[1])/2;
  mt.mesh.geometry.computeBoundingSphere();CAGE_RC=CAGE_RC||new THREE.Raycaster();const RC=CAGE_RC;bike.updateMatrixWorld(true);
  const fo=new V3(f.x,f.y,0),o=new V3((a.x+u.x*sm)/1000,(a.y+u.y*sm)/1000,0);
  RC.set(bike.localToWorld(o.clone().addScaledVector(fo,.15)),fo.clone().negate());RC.far=.5;
  const h=RC.intersectObject(mt.mesh,false)[0],P=h?bike.worldToLocal(h.point.clone()):o;
  const q1=CAGE_Q1,q2=CAGE_Q2,mL=Math.hypot(q2[0]-q1[0],q2[1]-q1[1]),mx=(q2[0]-q1[0])/mL,my=(q2[1]-q1[1])/mL;
  const flip=((u.x*f.y-u.y*f.x)<0);/* 下管（上面）手性＋1＝水壺架固有手性；中管（前面）−1 → 先繞孔線翻 180° */
  const myE=flip?-my:my,th=Math.atan2(u.y,u.x)-Math.atan2(myE,mx);
  g.quaternion.setFromAxisAngle(new V3(0,0,1),th);
  if(flip){const qx=new THREE.Quaternion().setFromAxisAngle(new V3(1,0,0),Math.PI);g.quaternion.multiply(qx)}
  const qmx=(q1[0]+q2[0])/2,qmy=(flip?-1:1)*(q1[1]+q2[1])/2,c=Math.cos(th),sn=Math.sin(th);
  g.position.set(P.x-(c*qmx-sn*qmy)/1000,P.y-(sn*qmx+c*qmy)/1000,0);g.visible=true}
function cagePlace(n){if(!n)return;if(G.cageG&&G.cageG.visible)cageSet(G.cageG,cagePair('dt'),n);if(G.cageS&&G.cageS.visible)cageSet(G.cageS,cagePair('st'),n)}
/* ===== v199zzzn：座墊／座管／座管束選項（GLB，不綁車款、不綁系列；預設 0＝現行程序化件）。資料：使用者 2026-11-10 上傳 Rhino GLB（Draco），離線減面（座墊 0.15 mm、座管與座管束 0.06 mm）、35° 折角拆頂點、Int16×s mm、Z85。
   座標：局部 x 向前（＝glTF −z）、y 向上、z 向右（＝glTF x）。座墊（SdRoad02／SdGravel／SdGravel02 共用 H＝(y635,z188.1) mm；SdGravelEX 用 H＝(y650,z197.4) mm）保持組裝姿態、掛在 G.seat（水平）。座管、座管束已在離線轉成「軸線＝局部 y」的座標：PostStd 以座管束軸向 16.5°、Dropper 以底端圓面法線 18.2°、座管束 16.6° 轉正，原點＝座管軸線上的 H（座管束為環心）；掛 bike 後只需繞原點轉到車款座管角（rotation.z＝後傾 90−STA）。標準座管筒身（#ffffff 群組）依車款座管外徑放大（Ø＝座管外徑 −0.6 mm）；軸線不再位移（原 +2 mm 前移為誤判，底端圓面 x' 範圍 ±13.6 對稱），座管頭（#cfcfcf）不動；座管束依座管外徑等比縮放（原內徑 34.9）。Dropper 刪除內建鈦環管束，改用現行 T.collar。首次選用才解碼。 */
var SEAT_PAY=VIBE_D.SEAT_PAY;
const SEAT_KEYS=['SdRoad02','SdGravel','SdGravel02','SdGravelEX'],SEAT_NAMES=['現行','Road 02','Gravel','Gravel 02','Gravel EX'],PST_NAMES=['現行','座管＋座管束','Dropper 座管（EX 專用）'],SEAT_LEAN0={};
function seatDec(o){const b=bz,p=new Int16Array(b(o.p)),ix=new Uint16Array(b(o.i)),P=new Float32Array(p.length),k=o.s*1e-3;for(let i=0;i<p.length;i++)P[i]=p[i]*k;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setIndex(new THREE.BufferAttribute(ix,1));g.computeVertexNormals();return g}
function seatMat(key,gr){const n=gr.n;let m;if(key==='SdRoad02')return M.saddle;/* v199zzzs：Road 02 材質＝現行座墊 */
  if(n==='Titanium'||key==='Clamp'||(key==='PostStd'&&gr.c==='#ffffff'))return serMat('seat_ti',M.tiP);
  if(key==='PostStd')return serMat('seat_st',M.steel);
  if(n==='Carbon')return serMat('seat_cf',M.carbon);
  if(n==='BLK_Glossy'||n==='BLK_Matte')return serMat('seat_dk',M.dark);
  if(n==='Cable')return serMat('seat_cab',M.dark);
  if(n==='Ano'||n==='Screw'){m=serMat('seat_'+n,M.steel);m.color.set(gr.c);if(key==='SdGravelEX'&&n==='Ano')satHex(m.color,.4);/* v199zzzze：EX 藍色坐墊彩度 −60%（×.4；線性空間下 ×.6 目視仍偏艷） */m.metalness=.6;m.roughness=.35;return m}
  m=serMat('seat_c'+gr.c,M.saddle);m.color.set(gr.c);return m}
function seatSplitClamp(g){const m=g.children[0];if(!m)return;const geo=m.geometry,P=geo.attributes.position,I=geo.index.array,n=P.count,par=new Int32Array(n);for(let i=0;i<n;i++)par[i]=i;const f=x=>{while(par[x]!==x){par[x]=par[par[x]];x=par[x]}return x};
  const mp=new Map();for(let i=0;i<n;i++){const k=Math.round(P.getX(i)*2e5)+','+Math.round(P.getY(i)*2e5)+','+Math.round(P.getZ(i)*2e5);if(mp.has(k))par[f(i)]=f(mp.get(k));else mp.set(k,i)}
  for(let t=0;t<I.length;t+=3){const a=f(I[t]),b=f(I[t+1]),c=f(I[t+2]);par[b]=a;par[f(c)]=a}
  const cnt=new Map();for(let t=0;t<I.length;t+=3){const r=f(I[t]);cnt.set(r,(cnt.get(r)||0)+1)}let big=-1,bn=0;cnt.forEach((v,k)=>{if(v>bn){bn=v;big=k}});
  const ring=[],scr=[];for(let t=0;t<I.length;t+=3)(f(I[t])===big?ring:scr).push(I[t],I[t+1],I[t+2]);if(!scr.length)return;
  /* v199zzzze：Clamp GLB 本體（最大連通元）與螺絲／螺帽（其餘連通元）共用頂點、分兩個索引，才能各用一種材質 */
  const mk=a=>{const q=new THREE.BufferGeometry();Object.keys(geo.attributes).forEach(k=>q.setAttribute(k,geo.attributes[k]));q.setIndex(new THREE.BufferAttribute(new Uint16Array(a),1));return q};
  m.geometry=mk(ring);const s2=new THREE.Mesh(mk(scr),m.material);s2.frustumCulled=false;s2.userData.noBT=true;s2.userData.scr=true;g.add(s2)}
function seatBuild(key){const D=SEAT_PAY[key],g=new THREE.Group();g.userData.gl=true;g.userData.lean0=(SEAT_LEAN0[key]||0)*Math.PI/180;
  D.g.forEach(gr=>{const m=new THREE.Mesh(seatDec(gr),seatMat(key,gr));m.frustumCulled=false;m.userData.noBT=true;if(key==='PostStd'&&gr.c==='#ffffff'){m.userData.body=true;m.userData.base=m.geometry.attributes.position.array.slice()}if(key==='PostStd'&&gr.c==='#cfcfcf')m.userData.scr=true;g.add(m)});if(key==='Clamp')seatSplitClamp(g);if(key==='PostDropEX')seatSplitDropTop(g);return g}
function seatFitPost(g,R){const s=(2*R*1000-.6)/27.3;/* v199zzzn-r2：座管筒身外徑＝座管外徑 −0.6 mm（使用者回報內徑版仍嫌細；若要回到內徑版改 2*.88*R*1000-.3） */if(g.userData.fitS===s)return;g.userData.fitS=s;g.children.forEach(m=>{if(!m.userData.body)return;const Pa=m.geometry.attributes.position,B=m.userData.base;for(let i=0;i<B.length;i+=3){const y=B[i+1]*1e3,f=y>-28?1:y<-32?s:1+(s-1)*(-28-y)/4;/* v199zzzze：筒身等徑（座管頭下 28–32 mm 過渡），不再是 13.6→17.2 mm 的長錐 */Pa.array[i]=B[i]*f;Pa.array[i+1]=B[i+1];Pa.array[i+2]=B[i+2]*f}Pa.needsUpdate=true;m.geometry.computeVertexNormals()})}
/* v199zzzs：座墊座管不再是加購選項，依車款固定——MASTER（64Ti、325Ti）＝現行座墊；AUDAX、ili-ili 325、SS-2205＝Road 02（材質同現行）；EX＝Gravel EX（藍）＋Dropper。座管：EX＝Dropper，其餘＝現行座管與座管束（使用者 2026-11-11） */
function seatUse(){const ti=(typeof ADD_S!=='undefined'&&ADD_S.ti)||{};/* v199zzzzd：加購鈦合金座管（ti.post）＝3D 標準座管 PostStd（EX 亦取代 Dropper）；加購鈦合金座管束（ti.collar）＝3D ST Clamp。預設（未加購）仍為 T.post／預設座管束（T.collar） */return{sd:selM==='ex'?4:(selM==='64'||selM==='325')?0:1,ps:ti.post>0?1:(selM==='ex'?2:0),cl:ti.collar>0?1:0}}/* 座管只有開／關，型式依車款：EX＝Dropper、其餘＝標準座管＋座管束（使用者 2026-11-10） */
function seatApply(){if(!G.seat)return;const u=seatUse();G.seatGl=G.seatGl||{};
  SEAT_KEYS.forEach((k,i)=>{const on=u.sd===i+1;if(on&&!G.seatGl[k]){G.seatGl[k]=seatBuild(k);G.seat.add(G.seatGl[k])}if(G.seatGl[k])G.seatGl[k].visible=on});
  G.seat.children.forEach(c=>{if(!c.userData.gl)c.visible=u.sd===0});
  const pk=u.ps===1?'PostStd':u.ps===2?'PostDropEX':null;
  ['PostStd','PostDropEX'].forEach(k=>{const on=k===pk;if(on&&!G.seatGl[k]){G.seatGl[k]=seatBuild(k);bike.add(G.seatGl[k])}if(G.seatGl[k])G.seatGl[k].visible=on});
  const cOn=u.cl===1;if(cOn&&!G.seatGl.Clamp){G.seatGl.Clamp=seatBuild('Clamp');bike.add(G.seatGl.Clamp)}if(G.seatGl.Clamp)G.seatGl.Clamp.visible=cOn;if(u.ps===1&&G.seatGl.PostStd)seatFitPost(G.seatGl.PostStd,(RADS[model]||RADS['64']).st);
  /* v199zzzze：加購座管／座管束兩種材質（使用者 2026-11-11）——主物件＝車架材質（與中管同一個材質物件，隨塗裝客製與表面處理）；螺絲＝鍊條材質（M.casM 複本，客製分頁維持不透明）。陽極色選項因此取消。 */
  {if(!M.tiSc&&M.casM){const c=M.casM.clone();c.userData={};c.side=THREE.DoubleSide;c.transparent=false;c.opacity=1;c.depthWrite=true;c.onBeforeCompile=M.casM.onBeforeCompile;c.customProgramCacheKey=M.casM.customProgramCacheKey;M.tiSc=c}
    const FM=T.ST.userData.origMatMC||T.ST.material;let nw=false;
    ['PostStd','Clamp'].forEach(k=>{const o=G.seatGl[k];if(!o)return;o.children.forEach(m=>{m.userData.keepOpaque=true;const w=m.userData.scr?M.tiSc:FM;if(w&&!m.userData.origMatMC&&m.material!==w){m.material=w;nw=true}})});
    if(nw){try{if(typeof mcOnPrev!=='undefined'&&mcOnPrev)mcPass(true)}catch(e){}try{if(typeof tagOutline==='function'&&G.olOn!==undefined)tagOutline(G.olOn)}catch(e){}}}}
/* ===== v199zzzzd：預設座管束（使用者 2026-11-11，附圖 King 式開口管束）。
   以 T.collar 本體換幾何，故材質仍走 hsApply0＝與頭碗組同一個顏色設定（座管束・頭碗組顏色）。
   幾何（公尺、真實尺寸，不再用 setTube 縮放）：軸＝局部 y、前＝+x、開口在後（−x）；高 18 mm（原 17）、外徑＝座管外徑＋2×5.5 mm；
   上段（座管頂以上）內徑＝座管內的座管外徑、下段（蓋住座管頂 4.5 mm）內徑＝座管外徑，故上段壁厚約 9 mm；外側上下緣倒圓 R4.5（同碗組圓環剖面），中段 9 mm 為垂直平面帶。
   開口：後方留 2×3.7°（約 3 mm）；鎖緊螺絲沿 z 軸穿過開口兩側的圓柱凸耳（併入本體網格），+z 側螺絲頭、−z 側圓筒螺帽（獨立小網格，材質＝鈦螺絲／小件顏色）。
   貼圖：頭碗組的 KING 字樣（hsDecalTex），只貼一份，置於正前方（φ=0）。位置：中心＝座管頂＋4.5 mm（原 +4 mm）。 */
var DCL={key:'',kids:null,tex:null};
function dclEar(P){const n=P.length;let a=0;for(let i=0;i<n;i++){const p=P[i],q=P[(i+1)%n];a+=p[0]*q[1]-q[0]*p[1]}const idx=[...Array(n).keys()],T=[];if(a<0)idx.reverse();
  const cr=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]),inT=(p,a,b,c)=>cr(a,b,p)>=-1e-12&&cr(b,c,p)>=-1e-12&&cr(c,a,p)>=-1e-12;
  let g=0;while(idx.length>3&&g++<600){let cut=false;for(let k=0;k<idx.length;k++){const i0=idx[(k+idx.length-1)%idx.length],i1=idx[k],i2=idx[(k+1)%idx.length],A=P[i0],B=P[i1],C=P[i2];if(cr(A,B,C)<=1e-12)continue;let ok=true;for(const j of idx){if(j===i0||j===i1||j===i2)continue;if(inT(P[j],A,B,C)){ok=false;break}}if(ok){T.push([i0,i1,i2]);idx.splice(k,1);cut=true;break}}if(!cut)break}
  if(idx.length===3)T.push([idx[0],idx[1],idx[2]]);return T}
function dclGeo(Rt,Rp){const hh=.009,Ro=Rt+.0055,rc=.0045,gp=.065,yS=-hh+.0045,st=Rp<Rt-1e-5,Ri2=st?Rp:Rt,NA=6,NF=72,p0=-(Math.PI-gp),p1=Math.PI-gp;
  const arc=(cx,cy,a0,a1)=>{const o=[];for(let i=0;i<=NA;i++){const a=(a0+(a1-a0)*i/NA)*Math.PI/180;o.push([cx+rc*Math.cos(a),cy+rc*Math.sin(a)])}return o};
  const runs=[];if(st)runs.push([[Rt,-hh],[Rt,yS]],[[Rt,yS],[Ri2,yS]],[[Ri2,yS],[Ri2,hh]]);else runs.push([[Rt,-hh],[Rt,hh]]);
  runs.push([[Ri2,hh],[Ro-rc,hh]],[].concat(arc(Ro-rc,hh-rc,90,0),arc(Ro-rc,-hh+rc,0,-90)),[[Ro-rc,-hh],[Rt,-hh]]);
  const pos=[],idx=[];
  runs.forEach(R=>{const b=pos.length/3,m=R.length;for(let j=0;j<=NF;j++){const ph=p0+(p1-p0)*j/NF,c=Math.cos(ph),s=Math.sin(ph);R.forEach(q=>pos.push(q[0]*c,q[1],q[0]*s))}
    for(let j=0;j<NF;j++)for(let i=0;i<m-1;i++){const a=b+j*m+i,bb=a+1,c2=a+m,d=c2+1;idx.push(a,c2,bb,bb,c2,d)}});
  const poly=[];runs.forEach(R=>R.forEach((q,i)=>{if(poly.length&&i===0)return;poly.push(q)}));if(poly.length>2&&poly[0][0]===poly[poly.length-1][0]&&poly[0][1]===poly[poly.length-1][1])poly.pop();
  const tri=dclEar(poly);[p0,p1].forEach(ph=>{const b=pos.length/3,c=Math.cos(ph),s=Math.sin(ph);poly.forEach(q=>pos.push(q[0]*c,q[1],q[0]*s));tri.forEach(t=>idx.push(b+t[0],b+t[1],b+t[2]))});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();
  /* 凸耳（圓柱，軸 z）併入本體：中心 x＝上段壁厚中央、y＝上段中央，外端 z＝±15 mm */
  const xb=-(Ri2+Ro)/2,yb=(yS+hh)/2,P=Array.from(g.attributes.position.array),Nn=Array.from(g.attributes.normal.array),I=Array.from(g.index.array);
  [1,-1].forEach(sg=>{const c=new THREE.CylinderGeometry(.0041,.0041,.0142,20).rotateX(Math.PI/2).translate(xb,yb,sg*.0079),b=P.length/3,cp=c.attributes.position.array,cn=c.attributes.normal.array;for(let i=0;i<cp.length;i++){P.push(cp[i]);Nn.push(cn[i])}c.index.array.forEach(i=>I.push(b+i))});
  const o=new THREE.BufferGeometry();o.setAttribute('position',new THREE.Float32BufferAttribute(P,3));o.setAttribute('normal',new THREE.Float32BufferAttribute(Nn,3));o.setIndex(I);o.userData.xb=xb;o.userData.yb=yb;o.userData.Ro=Ro;return o}
function dclDecalGeo(Ro,B){const NX=24,NY=2,r=Ro+.00015,pos=[],uv=[],idx=[];for(let j=0;j<=NY;j++){const y=B/2-B*j/NY;for(let i=0;i<=NX;i++){const ph=Math.PI*3/8-(Math.PI*3/4)*i/NX;pos.push(r*Math.cos(ph),y,r*Math.sin(ph));uv.push(i/NX,1-j/NY)}}
  for(let j=0;j<NY;j++)for(let i=0;i<NX;i++){const a=j*(NX+1)+i,b=a+1,c=a+NX+1,d=c+1;idx.push(a,c,b,b,c,d)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);return g}
function dclMats(){if(!DCL.kids)return;const ms=(typeof smCur!=='undefined'&&smCur)?smScrMat(smCur):M.tiScr;DCL.kids.screws.forEach(o=>{o.material=ms})}
function dclSync(su,R,pr){const C=T.collar;C.scale.set(1,1,1);C.position.add(new V3(su.x,su.y,0).multiplyScalar(.0005));
  const Rt=R+.00015,key=Rt.toFixed(5)+'|'+pr.toFixed(5);
  if(!DCL.kids){const k=DCL.kids={};const cyl=(r,h,n)=>new THREE.CylinderGeometry(r,r,h,n||24).rotateX(Math.PI/2);
    k.head=new THREE.Mesh(cyl(.0033,.003),M.tiScr);k.nut=new THREE.Mesh(cyl(.003,.003),M.tiScr);k.sock=new THREE.Mesh(cyl(.0017,.0004,6),M.dark);
    const tx=hsDecalTex(.0235,.0078,0);tx.repeat.set(1,1);tx.offset.set(0,0);DCL.tex=tx;const dm=hsDM();dm.map=tx;dm.needsUpdate=true;k.dec=new THREE.Mesh(new THREE.BufferGeometry(),dm);
    k.screws=[k.head,k.nut];[k.head,k.nut,k.sock,k.dec].forEach(m=>{m.userData.keepOpaque=true;m.userData.noBT=true;m.frustumCulled=false;C.add(m)})}
  if(DCL.key!==key){const og=C.geometry;C.geometry=dclGeo(Rt,pr);if(og&&og.dispose)og.dispose();DCL.key=key;const k=DCL.kids,u=C.geometry.userData;
    k.head.position.set(u.xb,u.yb,.0165);k.sock.position.set(u.xb,u.yb,.0181);k.nut.position.set(u.xb,u.yb,-.0165);
    const dg=k.dec.geometry;k.dec.geometry=dclDecalGeo(u.Ro,.01065)/* v199zzzze：KING 貼字 150% */;dg.dispose()}
  dclMats();DCL.kids.head.visible=DCL.kids.nut.visible=DCL.kids.sock.visible=DCL.kids.dec.visible=true}
function seatPlace(n){if(!G.seatGl)return;const u=seatUse(),lean=(90-n.sta)*Math.PI/180,sa=rad(n.sta),su=P(-Math.cos(sa),Math.sin(sa)),R=(RADS[model]||RADS['64']).st;
  ['PostStd','PostDropEX'].forEach(k=>{const o=G.seatGl[k];if(o&&o.visible){o.position.copy(v(k==='PostDropEX'?add(n.saddle,mul(su,-EX_POST_DN)):n.saddle));o.rotation.z=lean}});
  const c=G.seatGl.Clamp;if(c&&c.visible){const sc=2*R/.0349;c.scale.setScalar(sc);c.position.copy(v(add(n.STtop,mul(su,(10.05-4.5)*sc))));c.rotation.z=lean}
  T.post.visible=!(u.ps>0);T.collar.visible=u.cl!==1;try{dclSync(su,R,u.ps===1?R-.0003:.0137)}catch(e){console.warn('dcl',e)}}
/* v199zzzzzz102：鈦合金加購特寫（使用者 2026-11-18）。按下「加購」開關（僅鈦合金件的 7 個開關；長度、陽極色、BLKTEC、傳動系列都不算）→ 3D 跳到該件特寫；再按取消加購 → 回整車。
   取位：該件目前顯示中的網格世界包圍盒（8 角點，同 scCtr）；距離依包圍盒最大邊；方位維持目前 th，仰角 1.3。展示執行中會暫停（鏡頭會被補間蓋掉）。 */
function addonRoots(id){const q=[];const add=o=>{if(o&&o.visible!==false)q.push(o)};
  if(id==='fork')add(T.FKL.parent&&T.FKL.parent!==bike&&T.FKL.parent!==scene?T.FKL.parent:T.FKL);
  else if(id==='stem')add(G.stemStd&&G.stemStd.visible?G.stemStd:T.stem);
  else if(id==='post')add(G.seatGl&&G.seatGl.PostStd);
  else if(id==='collar')add(G.seatGl&&G.seatGl.Clamp);
  else if(id==='cage')add(G.cageG);else if(id==='cageS')add(G.cageS);
  else if(id==='crank')add(G.crkTiG);
  return q}
function addonBBox(roots){const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9],v=new V3();bike.updateWorldMatrix(true,true);
  roots.forEach(r=>{r.updateWorldMatrix(true,true);r.traverseVisible(o=>{if(!o.isMesh||!o.geometry)return;const g=o.geometry;if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox;if(!bb||!(bb.max.x>=bb.min.x))return;
    for(let k=0;k<8;k++){v.set(k&1?bb.max.x:bb.min.x,k&2?bb.max.y:bb.min.y,k&4?bb.max.z:bb.min.z).applyMatrix4(o.matrixWorld);for(let j=0;j<3;j++){const c=j?j===1?v.y:v.z:v.x;lo[j]=Math.min(lo[j],c);hi[j]=Math.max(hi[j],c)}}})});
  return hi[0]<lo[0]?null:{c:new V3((lo[0]+hi[0])/2,(lo[1]+hi[1])/2,(lo[2]+hi[2])/2),s:Math.max(hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2])}}
function addonFocus(id){try{const b=addonBBox(addonRoots(id));if(!b){console.warn('addonFocus: 取不到包圍盒',id);return}scUser('加購特寫');want.tgt.copy(b.c);want.r=Math.min(.9,Math.max(.3,b.s*2.4));want.ph=1.3;wk()}catch(e){console.warn('addonFocus',e)}}
function addonHome(){try{scUser('取消加購');goHome();wk()}catch(e){console.warn('addonHome',e)}}
function renderAddon(){const box=document.getElementById('addonBox');if(!box)return;const t=ADD_S.ti,b=ADD_S.bk;
  const info=PARTS_URL?`<a class="info" href="${PARTS_URL}" target="_blank" rel="noopener noreferrer" aria-label="了解更多" title="了解更多">i</a>`:'';
  const seg=(k,labels,cur,o={})=>`<div class="style-seg${o.sub?' sub':''}${o.dis?' dis':''}" role="radiogroup">${labels.map((l,i)=>`<button type="button" role="radio" aria-checked="${i===cur}" data-k="${k}" data-v="${i+(o.off||0)}"${o.tog?' data-tog="1"':''}>${l}</button>`).join('')}</div>`;
  let h='<h2>鈦零組件'+info+'</h2>';/* v199zzzzzz125：鈦零組件、傳動／煞車系列的說明段刪除，「了解更多」移到標題（使用者 2026-11-20） */
  TI_ITEMS.forEach(it=>{if(it.id==='cageS'&&!((BOLT_TB[selM]||{}).st))return;/* v199zzzt：EX 中管無水壺鎖孔，不顯示 */const on=t[it.id]>0;const fig=(on&&ADD_IMG[it.id])?`<figure class="ad-fig"><img data-ph="${it.id}" alt="${it.name}" width="600" height="600" loading="lazy"></figure>`:'';let sub='';/* v199zzzzzz126：照片另存 fig，最後放回最前面——原本有規格選項（龍頭）或曲柄規格（曲柄組）時 sub 被覆寫，照片不出現（使用者 2026-11-20） */
    if(on&&it.opts.length)sub=seg('ti.'+it.id,it.opts,t[it.id]-1,{sub:1,off:1});
    if(on&&it.crank)sub=seg('ti.cInt',CR_INT,t.cInt,{sub:1})+seg('ti.cLen',CR_LEN,t.cLen,{sub:1});
    if(on&&it.id!=='post'&&it.id!=='collar')sub+=`<div class="ad-h"><span><small>陽極色</small></span></div>`+seg('co.'+it.id,['鈦原色'].concat(ANO_MONO.map(a=>a[1].split('・')[0])),ADD_S.col[it.id]+1,{sub:1});
    h+=`<div class="arow ad"><div class="ad-h"><span>${it.name}${it.note?`<small>${it.note}</small>`:''}</span><div class="style-seg" role="group"><button type="button" role="switch" aria-checked="${on}" data-k="ti.${it.id}" data-v="${on?0:1}" data-tog="1">加購</button></div></div>${fig}${sub}</div>`});
  h+='<h2>BLKTEC 變色龍塗裝碳纖三套件</h2><p class="fine">三件：一體把、前叉、座管。烤漆色：藍紫、古銅、煙霧紫，三件可各自選色。'+info+'</p>';
  BK_POS.forEach(([k,l,tn])=>{const ti=bkTi(k);h+=`<div class="arow ad"><div class="ad-h"><span>${l}${ti?`<small>已選${tn}，不加購碳纖件</small>`:''}</span></div>${seg('bk.'+k,['不加購'].concat(BK_COL.map(c=>c[0])),b[k]+1,{sub:1,dis:ti})}</div>`});
  const tis=BK_POS.filter(([k])=>bkTi(k)).map(x=>x[2]);
  h+=`<p class="fine">${tis.length?'已選'+tis.join('、')+'：其餘碳纖件可單售。':'未選鈦合金件：三件須成組加購（選一件，另兩件同色帶入，可再各自改色）。'}</p>`;
  h+='<h2>傳動／煞車系列'+info+'</h2>';
  h+=`<div class="arow ad"><div class="ad-h"><span>系列<small>整組連動</small></span></div>${seg('sr.ser',SER_NAME,ADD_S.ser,{sub:1})}</div>`;
  box.innerHTML=h;
  setTimeout(()=>box.querySelectorAll('img[data-ph]').forEach(im=>{const L=ADD_IMG[im.dataset.ph]||[];if(!L.length)return;im.onerror=()=>{if(!im.dataset.r&&/\?h=/.test(im.src)){im.dataset.r='1';im.src=im.src.replace(/\?h=[^&#]*/,'')}};im.src=scImgUrl(L[0]);phCycle(im,L)}),0);/* v199zzzzzz123：延到本檔執行完再設 src（scImgUrl 用到的 SC_FH 宣告在檔尾） */
  box.querySelectorAll('button[data-k]').forEach(el=>el.onclick=()=>{const k=el.dataset.k.split('.');let v=+el.dataset.v;
    if(k[0]==='ti'){const was=t[k[1]]>0,isTi=!!el.dataset.tog&&TI_ITEMS.some(it=>it.id===k[1]);if(el.dataset.tog){v=v===0?0:(t[k[1]]>0?t[k[1]]:(TI_DEF[k[1]]||1))}t[k[1]]=v;addonChanged(null);if(isTi){const now=t[k[1]]>0;if(!was&&now)addonFocus(k[1]);else if(was&&!now)addonHome()}}else if(k[0]==='co'){ADD_S.col[k[1]]=v-1;addonChanged(null)}else if(k[0]==='sr'){ADD_S.ser=v;ADD_S.serUser=true;addonChanged(null)}else if(k[0]==='sd'){ADD_S.sd=v;addonChanged(null)}else if(k[0]==='ps'){ADD_S.ps=v;addonChanged(null)}else{b[k[1]]=v-1;addonChanged(k[1])}})}
/* v133：program 保活。切客製分頁時 partAlpha 切換 transparent，three 的 program 快取鍵含 opaque 旗標，舊旗標的 program 引用歸零即被銷毀，切回時重編（實測每次切換重連結 2 個 physical program、首次進客製 12 個）。這裡為每種材質各放一份「不透明」與「半透明」雙態備份（不入場景，只供 renderer.compile 佔住 program），並於載入後閒置時預編譯。 */
const kpGrp=new THREE.Group(),kpSig=new Set(),kpDef=new THREE.MeshBasicMaterial().onBeforeCompile;
function keepPrograms(){const L=[];bike.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||!o.geometry)return;const cur=o.userData.origMat||o.userData.origMatMP||o.material;(Array.isArray(cur)?cur:[cur]).forEach(m=>{if(!m||!m.isMaterial||(m.userData&&(m.userData.frame||m.userData.tib)))return;const sig=m.uuid+'|'+Object.keys(o.geometry.attributes).join();if(kpSig.has(sig))return;kpSig.add(sig);L.push([o.geometry,m])})});
  ADDX.mats.forEach(m=>{if(m!==ADDX.fk0&&m.userData&&m.userData.cham){const g=m===M.fkC?T.FKL.geometry:m===M.postC?T.post.geometry:G.cockpit.children.find(c=>c.isMesh).geometry;const sig=m.uuid+'|kp';if(!kpSig.has(sig)){kpSig.add(sig);L.push([g,m])}}});
  L.forEach(([g,m])=>[false,true].forEach(tr=>{const c=m.clone();c.transparent=tr;c.depthWrite=!tr;if(m.onBeforeCompile!==kpDef){c.onBeforeCompile=m.onBeforeCompile;c.customProgramCacheKey=m.customProgramCacheKey}const k=new THREE.Mesh(g,c);k.frustumCulled=false;kpGrp.add(k)}));
  warmTabs();renderer.compileAsync(kpGrp,camera,scene).catch(()=>{});if(!WU.on){WU.on=1;setTimeout(()=>wRIC(wuTick),1000)}/* v199zzzzzz128：接著跑全組合預熱 */}
/* v199zzzj：切主分頁首次延遲（客製分頁首次進入要現場連結 6 個 physical program）。原因：keepPrograms 的備份材質與實際切到客製／扭力分頁時的材質狀態不完全一致（series 材質、焊道／噴砂補丁後的 customProgramCacheKey 等），program 快取鍵對不上而重編。改為直接走真實路徑預熱：同一個同步區塊內把場景切到客製／扭力分頁的半透明狀態、renderer.compile，再切回——中間不會 render，畫面無閃爍。 */
var WARM_DONE=0;
/* v199zzzzzz126：預熱擴大為「兩種燈光狀態 × 不透明／半透明」，並暫時打開所有隱藏物件。
   原因（使用者 2026-11-20 回報切分頁會頓；5800U Chrome 實測）：頂光只在暗色出現，燈數 3↔4 是 program 快取鍵的一部分；原 warmTabs 只預熱當下主題、且 renderer.compile 只走可見物件——
   明亮載入後切暗色新編 25 個 program（卡 364 ms），再進客製服務新編 14 個（卡 182 ms）。
   做法：同一個同步區塊內切換頂光可見性與 partAlpha，各呼叫一次 compileAsync（KHR_parallel_shader_compile 下連結在背景完成），再全部還原；中間不 render，畫面無閃爍。
   three 的 program 依材質保存在各自的快取表，切回時直接取用不重編。 */
function warmTabs(){if(WARM_DONE>=4)return;WARM_DONE++;const t0=tab,tv=topL.visible,ti=topL.intensity,hid=[];
  try{scene.traverse(o=>{if(!o.visible&&!o.isLight){hid.push(o);o.visible=true}});try{HS.forEach(h=>{if(h.g)h.g.visible=true})}catch(e){}
    [tv,!tv].forEach(lt=>{topL.visible=lt;topL.intensity=lt?Math.max(ti,1):0;[t0==='custom',t0!=='custom'].forEach(a=>{partAlpha(a);renderer.compileAsync(scene,camera).catch(()=>{})})})}
  catch(e){console.warn('warmTabs',e)}
  finally{topL.visible=tv;topL.intensity=ti;hid.forEach(o=>o.visible=false);try{partAlpha(t0==='custom');paintHS()}catch(e){}}}
/* ===== v199zzzzzz128：全組合預熱（使用者 2026-11-20：「所有能預熱的都安排進去，偵測到資源有餘裕或閒置立即處理；lazy load 也是，必須假設使用者可能操作到每個排列組合」）=====
   做法：以 3D 設定檔的 cfgGather／cfgApply 為快照與還原。每個工作在同一個同步區塊內：快照 → 套用一組變體 → wuCompile（兩種燈光 × 不透明／半透明、暫開隱藏物件、上傳貼圖）→ 還原。中間不 render，畫面不閃。
   套用變體時也一併觸發延遲解碼的資產（EX 專用件、各系列件、加購件幾何與 decal 貼圖），所以 lazy 資產也在這裡預建。
   涵蓋：六車款；可塗裝車款 × 表面處理（標準／噴砂／拉絲）× 車架顏色（鈦原色／單色／漸層／碎花；拉絲只有鈦原色）× 陽極繪製（PBR／Matcap）；
   其餘選項在同一車款的工作間輪替，每個值至少出現一次：鈦加購全開／BLKTEC 三色、傳動系列 0–3、龍頭長度、曲柄介面與長度、頭碗組色、前叉內側圖樣、鈦螺絲色、下管標與 Logo 顏色、下管標表面處理；再加一個降級畫質變體（薄膜／拉絲／AO 關、分材質開）。
   three 的 program 依材質保存在各自快取，不同選項分屬不同材質，所以「每值至少一次」即涵蓋任意組合（燈光與透明度在每個工作內都另外補齊）。
   排程（v129 起取代 v128 的固定間隔）：見下方「輕／重工作分流」與「開場毛玻璃期間」。
   補熱：全組合跑完後，每當使用者改過配置且回到閒置，以目前配置（含其加購、系列等）為基準再掃表面處理 × 車架顏色 × 陽極繪製（約 19 組），補上跨選項的少數組合。
   實測（無頭、軟體繪圖）：全組合 89 組、主執行緒合計約 17.5 s；之後隨機 24 組使用者組合（跨分頁、明暗切換）23 組零現場編譯、1 組新編 1 個 → 加補熱。
   副作用處理：預熱期間 window.__WARMING＝1——setModel 不換 BGM、不重設特色說明；heroSet 不播數字滾動。另外自行保存並還原：鏡頭 cam／want、疊圖 cmp、傳動系列「使用者自選」旗標、swT。 */
const WU={q:null,i:0,last:0,lastIn:performance.now(),done:0,full:0,nb:0,nl:0,sig:'',ms:0,n:0,on:0};
['pointerdown','pointermove','wheel','keydown','touchstart','input','focusin'].forEach(e=>addEventListener(e,()=>{WU.lastIn=performance.now()},{capture:true,passive:true}));
function wuTex(){const S=new Set();scene.traverse(o=>{if(!o.material)return;[].concat(o.material).forEach(m=>{if(!m)return;for(const k in m){const v=m[k];if(v&&v.isTexture&&!S.has(v)){S.add(v);try{if(v.image&&!v.isRenderTargetTexture)renderer.initTexture(v)}catch(e){}}}})})}
function wuPre(){/* 與 drawFrame 繪製前相同的同步（材質切換、實例化與批次、toon、攝影棚）；陰影重算不做 */if(G.exTick)G.exTick();if(G.instSync)G.instSync();if(G.btSync)G.btSync();if(STYLES[curStyle].toon){toonPass(true);toonSync()}mcSync();STU.sync()}
function wuCompile(){wuPre();const t0=tab,tv=topL.visible,ti=topL.intensity,a0=ALPHA,hid=[];
  try{scene.traverse(o=>{if(!o.visible&&!o.isLight){hid.push(o);o.visible=true}});ALPHA=Math.min(a0,.5);
    [tv,!tv].forEach(lt=>{topL.visible=lt;topL.intensity=lt?Math.max(ti,1):0;[false,true].forEach(a=>{partAlpha(a);try{mcSync()}catch(e){}/* 分材質 matcap 複本跟著同步透明度 */renderer.compileAsync(scene,camera).catch(()=>{})})});wuTex()}
  finally{ALPHA=a0;topL.visible=tv;topL.intensity=ti;hid.forEach(o=>o.visible=false);try{partAlpha(t0==='custom');paintHS()}catch(e){}}}
function wuBuild(){const J0=cfgGather(),L=[],ms=Object.keys(MNAME).sort((a,b)=>(b===selM)-(a===selM)),pick=(a,k)=>a[k%a.length];
  const HSC=['k','f','ti','m0'],FKP=['k','m1','g1','s1'],SMC=['d'].concat(SM_OPTS.map(o=>o[0])),DTC=['ti','m2','g2','s2'],LGF=['blast','std'];
  ms.forEach(m=>{const C=[];if(PAINT_OK.includes(m)){['std','blast','brush'].forEach(f=>(f==='brush'?['ti']:['ti','mono','grad','spl']).forEach(pt=>['pbrf','mat'].forEach(mc=>C.push({f,pt,mc}))))}else for(let k=0;k<8;k++)C.push({f:'std',pt:'ti',mc:k%2?'mat':'pbrf'});
    C.forEach((c,k0)=>{const k=k0>>1;/* 輪替以「成對」序號 k＝k0/2：同一組塗裝的 PBR／Matcap 兩個工作帶相同選項，各選項因此與兩種陽極繪製都會配對（避免奇偶混疊） */const v=JSON.parse(JSON.stringify(J0));v.車款.model=m;const P=v.塗裝;P.fin=c.f;P.paint=c.pt;P.paintSaved=null;P.anoM=k%ANO_MONO.length;P.anoG=k%ANO_GRAD.length;P.splI=k%SPL.length;
      P.hsCol=pick(HSC,k);P.fkPat=pick(FKP,k);P.smCol=pick(SMC,k);P.dtCol=pick(DTC,k);P.logoCol=pick(DTC,k+1);P.logoLinked=k%3===0;P.logoFin=pick(LGF,k);P.gRev=k%2===1;P.dtRev=k%2===0;
      const A=v.加購,on=k%2===0;TI_ITEMS.forEach(it=>{A.ti[it.id]=(on||!['fork','stem','post'].includes(it.id))?(it.opts.length?1+k%it.opts.length:1):0});A.ti.cInt=k%CR_INT.length;A.ti.cLen=k%CR_LEN.length;
      BK_POS.forEach(([b])=>{A.bk[b]=on?-1:k%BK_COL.length});A.ser=k%4;v.畫質.mc=c.mc;L.push(v)})});
  {const v=JSON.parse(JSON.stringify(J0));Object.assign(v.畫質,{film:0,an:0,ao:0,parts:true});L.push(v)}
  return L}
function wuRun(v){const t0=performance.now(),w0=wake,tw0=tween,vt0=vTween,J=cfgGather(),su=ADD_S.serUser,cm=cmp,sw=swT,C={r:cam.r,th:cam.th,ph:cam.ph,t:cam.tgt.clone()},W={r:want.r,th:want.th,ph:want.ph,t:want.tgt.clone()};
  window.__WARMING=1;
  try{cfgApply(v);wuCompile()}catch(e){console.warn('warm',e)}
  finally{try{cfgApply(J);wuPre()}catch(e){console.warn('warm restore',e)}ADD_S.serUser=su;swT=sw;if(cmp!==cm){cmp=cm;try{updateGhost();renderGeo()}catch(e){}}
    cam.r=C.r;cam.th=C.th;cam.ph=C.ph;cam.tgt.copy(C.t);want.r=W.r;want.th=W.th;want.ph=W.ph;want.tgt.copy(W.t);
    /* v129：還原時 cfgApply 會在客製分頁重新起一段幾何補間（setModel 先套標準幾何、再補間回客製幾何），畫面會看到形變——工作前沒有的補間直接跳到終點；喚醒計數還原，不額外重繪（狀態與工作前相同，畫面不需更新） */
    try{if(tween&&tween!==tw0){applyNodes(tween.to);tween=tw0}if(vTween&&vTween!==vt0){liveV=Object.assign({},vTween.to);vTween=vt0;updLive()}}catch(e){}wake=w0;window.__WARMING=0}
  WU.ms+=performance.now()-t0;WU.n++}
function wuOk(){if(document.hidden||tween||vTween||window.__ctxLost)return false;const now=performance.now();if(now-WU.lastIn<1500)return false;
  const a=document.activeElement;if(a&&(a.tagName==='TEXTAREA'||a.tagName==='SELECT'||(a.tagName==='INPUT'&&!/^(range|checkbox|radio|button)$/.test(a.type))))return false;
  return true}/* v129：拿掉單幀 CPU 條件——輕工作改由 rIC 剩餘時間把關，重工作只在靜止時跑 */
function wuSig(){try{const J=cfgGather();delete J.時間;return JSON.stringify(J)}catch(e){return ''}}
/* ===== v199zzzzzz129：輕／重工作分流（使用者 2026-11-20：Fold5 自旋時每 1.5 s 頓一下看得出來，影響 UX）=====
   剖析（無頭）：v128 每個工作都走完整 cfgApply，連只換塗裝也重建整台車幾何（applyNodes、加購件射線定位、法線重算），80–550 ms。
   輕工作＝只換塗裝（表面處理、車架顏色、陽極色號、反向、陽極繪製、分材質）：直接改變數 → 材質同步（wuPre）→ 只編譯材質有變動的網格（兩種燈光 × 不透明／半透明）→ 還原。不碰幾何與 DOM。
     用 requestIdleCallback 的剩餘時間判斷：預估耗時（指數平均）放得進這一幀的空檔才跑，所以自旋中也不掉幀；放不進就等。
   重工作＝換車款、加購件、傳動系列、頭碗色、前叉圖樣等需要重建幾何者（cfgApply 全套）：只在畫面完全靜止（沒有自旋、補間、拆解、喚醒重繪）且使用者 3 s 無輸入時跑——
     畫面不動時主執行緒忙碌看不出來。
   順序：目前車款的輕工作 → 其他重工作。改過配置回到閒置後的補熱也只用輕工作。 */
const WL={q:[],ema:8,inited:new WeakSet()};
function wuSnapM(){const m=new Map();scene.traverse(o=>{if(o.material)m.set(o,[].concat(o.material).map(x=>x?x.uuid+':'+x.version:'').join('|'))});return m}
function wuDiff(m0){const S=[];scene.traverse(o=>{if(!o.material)return;const k=[].concat(o.material).map(x=>x?x.uuid+':'+x.version:'').join('|');if(m0.get(o)!==k)S.push(o)});return S}
function wuCompileS(S){if(!S.length)return;const t0=tab,tv=topL.visible,ti=topL.intensity,a0=ALPHA,hid=S.filter(o=>!o.visible);
  try{hid.forEach(o=>o.visible=true);ALPHA=Math.min(a0,.5);
    [tv,!tv].forEach(lt=>{topL.visible=lt;topL.intensity=lt?Math.max(ti,1):0;[false,true].forEach(a=>{partAlpha(a);try{mcSync()}catch(e){}S.forEach(o=>{try{renderer.compile(o,camera,scene)}catch(e){}})})});
    S.forEach(o=>[].concat(o.material).forEach(m=>{if(!m)return;for(const k in m){const v=m[k];if(v&&v.isTexture&&!WL.inited.has(v)&&v.image){WL.inited.add(v);try{renderer.initTexture(v)}catch(e){}}}}))}
  finally{ALPHA=a0;topL.visible=tv;topL.intensity=ti;hid.forEach(o=>o.visible=false);try{partAlpha(t0==='custom')}catch(e){}}}
function wuLiteList(){const L=[],po=paintOk();(po?['std','blast','brush']:[finSel]).forEach(f=>((!po||f==='brush')?['ti']:['ti','mono','grad','spl']).forEach(pt=>['pbrf','mat'].forEach(mc=>L.push({f,pt,mc,k:L.length}))));
  L.push({f:finSel,pt:paintSel,mc:QP.mc,parts:!MC_ADV.parts,k:L.length});return L}
function wuLite(o){const t0=performance.now(),S0={fin:finSel,pt:paintSel,ps:paintSaved,am:anoM,ag:anoG,si:splI,gr:gRev,mc:QP.mc,pa:MC_ADV.parts};
  window.__WARMING=1;try{const m0=wuSnapM();finSel=o.f;paintSel=o.pt;paintSaved=null;anoM=o.k%ANO_MONO.length;anoG=o.k%ANO_GRAD.length;splI=o.k%SPL.length;gRev=o.k%2===1;QP.mc=o.mc;if(o.parts!==undefined)MC_ADV.parts=o.parts;
    wuPre();wuCompileS(wuDiff(m0))}catch(e){console.warn('warm lite',e)}
  finally{finSel=S0.fin;paintSel=S0.pt;paintSaved=S0.ps;anoM=S0.am;anoG=S0.ag;splI=S0.si;gRev=S0.gr;QP.mc=S0.mc;MC_ADV.parts=S0.pa;try{wuPre()}catch(e){}window.__WARMING=0}
  const d=performance.now()-t0;WL.ema=WL.ema*.7+d*.3;WU.ms+=d;WU.n++;WU.nl++}
function wuStatic(){return!(typeof SC!=='undefined'&&SC.on)&&wake<=0&&!tween&&!vTween&&!(G.exBusy&&G.exBusy())&&performance.now()-WU.lastIn>=3000}
const wRIC=window.requestIdleCallback?(f=>requestIdleCallback(f,{timeout:1200})):(f=>setTimeout(()=>f(null),300));
function wuTick(dl){try{if(!WU.full){WU.q=wuBuild();WU.i=0;WU.full=1;if(!WU.vq)WL.q=wuLiteList();WU.sig=wuSig()}
  if(wuOk()){const st=wuStatic(),gap=window.__WU_GAP;
    if(!WL.q.length&&WU.done){const s=wuSig();if(s&&s!==WU.sig){WU.sig=s;WL.q=wuLiteList();WU.nb++}}
    if(WL.q.length&&(st||gap!=null||(dl&&!dl.didTimeout&&dl.timeRemaining()>=WL.ema+2)))wuLite(WL.q.shift());
    else if(!WL.q.length&&WU.q&&(st||gap!=null)){wuRun(WU.q[WU.i++]);if(WU.i>=WU.q.length){WU.q=null;WU.done=1;WU.sig=wuSig();console.info('VIBE 預熱完成',WU.n,'組',Math.round(WU.ms),'ms，program',renderer.info.programs.length)}}}}
  catch(e){console.warn('warm tick',e);WU.q=null;WU.done=1;WL.q=[]}
  wRIC(wuTick)}
/* 開場毛玻璃期間（畫面被蓋住）：距最短停留時間還有空檔就先跑——輕工作先（第一次建立 program 最貴、無法預估），還有餘裕再跑重工作；離淡出 0.7 s 內停手，不拖長開場。 */
window.__wuVeil=(vm)=>{if(!WU.vq){WU.vq=1;WL.q=wuLiteList()}const left=vm-performance.now();
  if(WL.q.length){if(left>WL.ema*2+250)wuLite(WL.q.shift());return}
  if(left>700){if(!WU.full){WU.q=wuBuild();WU.i=0;WU.full=1;WU.sig=wuSig()}if(WU.q&&WU.i<WU.q.length){wuRun(WU.q[WU.i++]);if(WU.i>=WU.q.length){WU.q=null;WU.done=1;WU.sig=wuSig()}}}};
window.__wuDbg=()=>({ok:wuOk(),st:wuStatic(),sc:typeof SC!=='undefined'&&SC.on,wake,tw:!!tween,vt:!!vTween,ex:!!(G.exBusy&&G.exBusy()),idle:Math.round(performance.now()-WU.lastIn),full:WU.full,vq:WU.vq,ae:document.activeElement&&document.activeElement.tagName,ctx:!!window.__ctxLost});window.__wuT={run:wuRun,build:wuBuild,lite:wuLite,liteList:wuLiteList};/* 測試用 */window.__WU=()=>(WL.q.length?'輕 剩 '+WL.q.length+'｜':'')+(WU.q?'重 '+WU.i+'/'+WU.q.length+'（待靜止）':WU.done?'完成'+(WU.nb?'＋補熱 '+WU.nb+' 輪':''):'未開始')+'（'+WU.n+' 組・'+Math.round(WU.ms)+' ms・輕約 '+WL.ema.toFixed(1)+' ms）';
/* ===== v199zh：傳動／煞車系列（現行配置／Shimano 105／SRAM Force），加購頁整組連動（使用者 2026-11-09）。
   資料：使用者上傳 Shimano_105_Crankset_FD_RD.zip、SRAM_FORCE_AXS_Crankset_FD_Brake.zip 共 8 個 GLB，離線以減面（容許 0.06–0.2 mm）、35° 折角拆頂點、Int16×0.01 mm、Z85 轉成與其他零件相同的內嵌格式；首次選用才解碼建網格（延後解碼）。
   座標：曲柄組＝軸沿 z、右臂向 +x、原點＝五通軸心；RD＝原點在吊掛螺栓軸、Z=0 為導輪面；卡鉗／碟盤＝原點在碟盤圓心、Z=0 為碟盤中面、徑向 +Y（同 CALD）；FD＝局部 (a 向前切線、b 沿座管朝五通、c 向右)、原點在夾環軸上（FD 為示意，GLB 為鏡像座標，以帶鏡像的基底放置）。
   範圍：105＝曲柄組＋RD＋FD 示意；Force＝曲柄組＋卡鉗＋碟盤＋FD 示意；未提供的零件沿用現行（105 無卡鉗／碟盤、Force 無 RD）。鏈條程式不動，只讓大盤節圓半徑／齒面（chR／chZ）與導輪位置／半徑（SERRD）跟著系列。
   已加購鈦合金曲柄組時，曲柄以加購為準（不畫系列曲柄、FD 一併隱藏）。系列零件材質為各自的複本且標 addonOn，客製分頁不隨「零組件透明度」半透明。 */
var SERK=null,SERRD=null;
const SER_NAME=['預設','105','AXS','Dura Ace'];/* v199zzzs：名稱改短，順序不變（使用者 2026-11-11） */
const SER_CRK=['','shCrk','foCrk','daCrk'],SER_FDK=['','shFD','foFD','daFD'],SER_CP=['','s1','f1','d1'];/* v199zzq：第四系列 Shimano Dura-Ace（曲柄組 50／34T＋FD 示意＋卡鉗；碟盤與 RD 沿用現行） */
const SER_D=VIBE_D.SER_D;
function rpR(){return SERRD?SERRD.rp:CH_RP}
const SER_M={};
function serMat(k,base){let m=SER_M[k];if(!m){/* v199zzzj：傳動／煞車系列件的深灰（M.dark 0x3d3c36 太深）一律改用較淺的 0x626159；現行配置件仍用 M.dark */m=base.clone();m.side=THREE.DoubleSide;m.userData=Object.assign({},m.userData,{addonOn:true});m.transparent=false;m.opacity=1;m.depthWrite=true;m.forceSinglePass=true;SER_M[k]=m}return m}/* 複製時基底材質可能已被客製分頁設成半透明，必須重設 */
/* v199zzzzzz28：鈦合金陽極金黃 50 V（#d0a808）小件材質——EX 前叉伸縮管、Dropper 上管共用 */
function goldMat(){const m=serMat('ano_gold50',M.steel);m.color.set('#d0a808');m.metalness=.92;m.roughness=.34;return m}
/* v199zzzzzz28：Dropper 主管（最大網格）依局部 y 切成上段（鞍座夾到防塵環，局部 y ≥ −165 mm）與下段；上段改金黃 50 V。兩段共用頂點、分開索引。 */
function seatSplitDropTop(g){const m=g.children[0];if(!m||!m.geometry.index)return;const geo=m.geometry,P=geo.attributes.position,I=geo.index.array,up=[],lo=[];
  for(let t=0;t<I.length;t+=3){const y=(P.getY(I[t])+P.getY(I[t+1])+P.getY(I[t+2]))/3;(y>=-.165?up:lo).push(I[t],I[t+1],I[t+2])}
  if(!up.length||!lo.length)return;const mk=a=>{const q=new THREE.BufferGeometry();Object.keys(geo.attributes).forEach(k=>q.setAttribute(k,geo.attributes[k]));q.setIndex(new THREE.BufferAttribute(new Uint16Array(a),1));return q};
  m.geometry=mk(lo);const u=new THREE.Mesh(mk(up),goldMat());u.frustumCulled=false;u.userData.noBT=true;g.add(u)}
/* v199zzzzp：FD／RD 依連通件分三類材質：K＝黑（M.alBk，同曲柄）、S＝銀（M.steel，FD 籠板）、G＝槍灰（M.casM，同鍊條；螺絲、螺帽、桿、導輪、中間區塊）。
   編號＝連通件依頂點數由大到小的排名（演算法同 RD 本體切件）；數量與預期不符時整群組退回 K。各類子網格各自有獨立頂點緩衝（serFDshear 逐頂點變形，不可共用）。 */
const SER_SPEC={shFD:{cage:{n:3,S:[0],G:[1]},band:'K',hw:{n:3,G:[1,2]}},
 foFD:{cage:{n:10,S:[0,3],G:[1,6,8]},band:'K',hw:{n:10,G:[2,3,4,5,6,7,8,9]}},
 daFD:{cage:{n:2,S:[0,1]},band:'K',hw:{n:18,G:[6,7,8,9,10,11,12,13,14,15,16,17]}},
 shRD:{a:{n:6,G:[2,3,5]},b:{n:12,G:[1,2,4,5,6,7,8,9,10,11]},c:'G'},
 daRD:{a:{n:4,G:[0,1]},b:{n:7,G:[0,1,2]},c:'G'},
 foCrk:{arm:'K',ring:{n:3,S:[0,1]},hw:'G'},shCrk:{arm:'K',ring:'K',hw:'G'},daCrk:{arm:'K',ring:'K',hw:'G'}};
function compSplit(geo,nExp,SL,GL){const P=geo.attributes.position,n=P.count,ix=geo.index.array,nt=ix.length/3,par=new Int32Array(n);for(let i=0;i<n;i++)par[i]=i;const f=a=>{while(par[a]!==a){par[a]=par[par[a]];a=par[a]}return a};
  const key=new Map();for(let i=0;i<n;i++){const k=P.getX(i).toFixed(5)+','+P.getY(i).toFixed(5)+','+P.getZ(i).toFixed(5);if(key.has(k))par[f(i)]=f(key.get(k));else key.set(k,i)}
  for(let t=0;t<nt;t++){const a=ix[3*t],b=ix[3*t+1],c=ix[3*t+2];par[f(a)]=f(b);par[f(b)]=f(c)}
  const ids=new Map(),cid=new Int32Array(n);let nc=0;for(let i=0;i<n;i++){const r=f(i);if(!ids.has(r))ids.set(r,nc++);cid[i]=ids.get(r)}
  if(nc!==nExp)return null;
  const cnt=new Array(nc).fill(0);for(let i=0;i<n;i++)cnt[cid[i]]++;const ord=[...cnt.keys()].sort((a,b)=>cnt[b]-cnt[a]),rk=new Int32Array(nc);ord.forEach((c,i)=>rk[c]=i);
  const cl=new Array(nc).fill('K');(SL||[]).forEach(k=>cl[k]='S');(GL||[]).forEach(k=>cl[k]='G');
  const L={};for(let t=0;t<nt;t++){const c=cl[rk[cid[ix[3*t]]]];(L[c]=L[c]||[]).push(ix[3*t],ix[3*t+1],ix[3*t+2])}
  const out={};Object.keys(L).forEach(c=>{const map=new Int32Array(n).fill(-1),pos=[];const idx=L[c].map(v=>{if(map[v]<0){map[v]=pos.length/3;pos.push(P.getX(v),P.getY(v),P.getZ(v))}return map[v]});
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(pos),3));g.setIndex(new THREE.BufferAttribute(pos.length/3>65535?new Uint32Array(idx):new Uint16Array(idx),1));g.computeVertexNormals();out[c]=g});return out}
function serAdd2(g,D,M3,spec){Object.keys(D.out).forEach(k=>D.out[k].forEach(c=>{const geo=stepDec(c),sp=spec[k],add=(ge,cl)=>{const m=new THREE.Mesh(ge,M3[cl]);m.frustumCulled=false;m.userData.noBT=true;m.userData.k=k;g.add(m)};
  if(typeof sp==='string'){add(geo,sp);return}const r=compSplit(geo,sp.n,sp.S,sp.G);if(!r){add(geo,'K');return}Object.keys(r).forEach(cl=>add(r[cl],cl))}))}
function serAdd(g,D,mats){Object.keys(D.out).forEach(k=>D.out[k].forEach(c=>{const m=new THREE.Mesh(stepDec(c),mats[k]);m.frustumCulled=false;m.userData.noBT=true;m.userData.k=k;g.add(m)}))}
function serCrank(w){const D=SER_D[SER_CRK[w]],p=SER_CP[w],mt={arm:serMat(p+'a',M.alBk),ring:serMat(p+'r',M.dark),hw:serMat(p+'h',M.casM)};
  if(G.crkSerG){G.bb.remove(G.crkSerG);G.crkSerG.traverse(o=>{if(o.isMesh&&o.geometry)o.geometry.dispose()})}
  const g=grp();g.rotation.z=-.8727-spinA;G.bb.add(g);serAdd2(g,D,{K:mt.arm,S:serMat(p+'s',M.steel),G:mt.hw},SER_SPEC[SER_CRK[w]]);
  const q=D.meta,sp=new THREE.Mesh(new THREE.CylinderGeometry(q.spindleR*1e-3,q.spindleR*1e-3,(q.innerR-q.innerL+6)*1e-3,48).rotateX(Math.PI/2),mt.hw);sp.position.z=(q.innerR+q.innerL)/2*1e-3;sp.frustumCulled=false;sp.userData.noBT=true;g.add(sp);
  G.crkSerG=g;G.crkSerKey=w}
/* v199zzzb：Shimano 105 吊耳（Shimano_RD_Hanger.stp）與 Dura-Ace RD（Dura_Ace_RD.stp，內含吊耳）。座標＝STEP 原座標（X 前、Y 上、Z 驅動側外；吊耳軸端在原點），吊耳內側面（STEP z=0）貼勾爪外側面 Z=80.5；RD 網格原點＝RD 吊掛螺栓軸（吊耳 RD 端孔 (−24.19,−9.06)），導輪面 Z=0 */
SER_D.daRD=VIBE_D.SER_DA_RD;
const HG_NUT={"p": "~33Md5J+o&h[C[Z0:+n%$B}b:iY=G<!ES:?&UNH>R8>dnr-IL9!]*3O-BtPr=&kK{br*H8Nw5k>nLsg.R+O^?E{jIOac^{UtV5Jeczp=I=O<}/?I[{DvWRYl4nULzMV]fo{:)BtBR&XNt<cdU(cV.*u.!8g4$8KH$bJCv[dcgHfvlERKBZ9=5bIZC&3o(L}mViY8AG+EbEDy+%3&(S!O!AZ^r]&ip[a(Qcjc.[3ohT<}MjfSq%ru!]+rB)S&%>.X?}*f?YxLydGet8?=g6nYmW5/24C9e)BW5n81UzYEi@*@7&Ush4KaKaQBXR&@J2qS?Z>Q[/blr/!-e3Od6OSibzrS{Wip:qTRx]G(.TWLYTv-UCvhd-G]u+^SXDciR)8ECh%7jk$}t[7c^e]mG?+Jx:P6@):+(UZb:3PakR+<DV&N>oMz?J-=Ew12JY0]ZX3FEOYROf>uqlgPSH]Mt%7rv)*<@ePPrbDJH46urwqFT<I2Z&5o4MT<jJqTuHGUhRB((I{wyShjU*RVoet9rbCt5e>KC5<=E}&Kvi9is]WHVnK)7aWn4YMrIZlvBx}dr2!hTX]nyM*B7DOC<#dJTm/O*nHyv%w.?@MfNh+a/h4fb3p6L0?eQA6rNB:Fl^nps6J^Nzx&VF2tZT/WpE[w9N<GbC/R=Prx>h}VZ{NReNT5tO!Lg)Iji}lAQ@Q>ZsKcGR!R[QgI0rr91", "i": "~11L#qx*6J2NoiD%R%TVXl!D?{<.us]GHI9onu-qgdGI?>{Pf]VC*lwQ6@5/0*0+4.Y3dPVNy)pxsg7/D=leWvJkoh&UJ]d+sH?0?ZkYfA2HHCJO*OB+O9E0kX{Ja$9$?yqthwUIZdqPsUHa$Cz{)sv(x=<en7V+cpM1A/{YuUeb^D15B$G*g1Zx9lo{1a%jsyFIUb2oX[.5ADlymgxJys[Lbh3(PWKm=WIJKRqZ=b8w=TcC!4y{!x$/BOFemFa#nJ+<p(du1uZZ0{xT04P}k{1rnY5vfeH[*E4Sps{BDCU?2VDHNMa2bxYcYurUaPu40tbvh>8c>ucfiNijDYA@+f2M7sxdq]1x6nb.qS12I}CW4-!2jvH!{XI/@UZ:5[H5ZZNX-Z8BDxw&o*Z(NXP8azJyi6[[fZt-ADgk2ck/s>B?Z]H0}2wI8gH7hw):^e6AV7#LE)vWQ[7Gk@#r/MTmAz/kgho6bL)GR3a=zz2Px?XituO^d>+<e<GV1K4L-E%/YznS7h2/kVcRH::4y+[oh@fS^RHv!bT<rtO*5Mo6BZypWo*-#1u{>rkv&P9lUb*%LUi8%uriH(vqxES/*R$nymzL=Dpnm$Xg:*PZi4M{kGz7voUR29pY=Y>L)vUU>@!KCIg<gzg6si/!C}re{Co{P?9cP/y}LuWK1lAdKbI$Vi7GifK$bg%ms-Mryczy%[^Jyu]7KEPV]nEvQTT%uusWg0.x-8nGJ9.E$WvxL]9PMkw*JFmWxPF0n3sE[bAwXKTm2t%jDo)8f@TLXX<(Te0@fx(8R9Q#Q5JXdqoYN)zh6$e?GRc[z^dV/fsk[J*&JFt?u{lXyXaH<PwY2s0^zaKfW9likCX/[Om@IJBlpLaQdOeTDLB6Un}L8F+?IUY6NwocEVR8MZ(MNXJq1PiGz+HQL&<Jg(VOh$ZORK<g=-u*t%BR7s84+T=/li0L.DtqkXLiSy&Y}RYaJq&[U", "nv": 224, "nt": 218},HG_DX={"p": "~32Md5Dvr96+s[zv=hm2D%&3O4%Vg$mbiapikwFcJRZKBNv0kx.GPV$-k.-1(Ai+%>=ifERLFV1>aU^uVy&hn)Eoo0P0nWYq3Zo[TotipCBx?*pL8twccy=B@$y}-/eEX=l-i(g1IJJN3/DRS]yc/zj65j>-[nevTk6YYsO:56XkpP409DfLlI7+s{@+!+&*<i<m*)+:!I3BJd)QWO2UYff0z]?so8tgXG<)?3epwVSna2?8xc4OdB%vwXhv>ynNLC*](-0<!i&oYkb=DBh4vte$qjp.D9-7ANofHiIB=Pm$KL!Qj#u]x00{o7l>LM+<e%Edxfd#l%gYZn1UPdQk3XEL6x%%OgO8KvUu36xlc(.W4%$l<OJbf8SHL3GQuD?i](N4QU/o[@Ri$>r{xg@?}<+Q>-jY6EPA>)LS%fq8E2]h?98k2?l*NQkHH*6)34j.pKD-KIuQ[vs!Td)fz<4+AJR1ODP0$75z$BA?SDWxNAUlSNFb5jLIQM7)lNvF[rW&lO{nG?xrj2JX@3$d*.L>mhr>}B8NRsQkKL:)4/s*]6ukbjA(U*R7YxIZumdRz/BP>H[JE:bu1ucKcZ}j#IrHyG=qC]obasQoKcg&wlEuA^9<-vlIaRr*92RJGSfc4p1fUd9P%nX7ue2bvw+A5)=3dZHQ0M*F-cCh/(9Z-9x*.>^Yo$JO/SRMjVeOM5-qbMjLmK1ki?JP]hQRk<fe$H7hk{/p%3@J54iutVhTd@T{@@9bfiE.cc83hs@@r30", "i": "~10Jz+f}q=alUO{f8FB6q@O5K@E6=AJ+yydWVU!e%}!GCw7(0tmf:bbdr#Am7yAb5h*/H-(yWHeXoVlaPlZct1-Zpa:Y@35MyCZ1}H*uA&X/hvUnQX-YNQjlJi)K1ghQ1pl+Nl}#Va5gISW6I6YwLw}SzKrt+Z333q#Fdq$QW6VQoMf8HVk6y5ZImBqz/LQ44e3N5B0Tbrba%P7S4e&+b^bsw1/#m1[bv3I<[+8l2?%^Uc:&H.#v*?hhNO8HLg2y-2xXJgPK5*BBfwLBOKNiuj[{J:=o!b:OBKuFY1BXD.-=GT9Nid:PkW{fyVE>Isk+YtedL?pA5hpa3OfL[Dc[hD<aov(:nC($vz?npzvSH::AxCfu7Y+[Pao./Ncbj1{s2dl2+4]dRvNL@[Aeq7Qaxl42LMF(QAfquQA/85H7VB-Ro5^v%e6d@+h9VIC9cLy2:(QAu@kqPO5i6xv1qt<3fWSV87=hvH3h)BejoZkh@nm%4y#D^DG5oEYsqDwhkWOW/+F*Tt{VKbYHw?53l9e%NS69yY-4[[15uhXd?WYxNzTSmQANs*sJ^MP!:WInF9V+aZ=KlBTp5AM44HW$byUOBvse3Cx/4ew=}m9/F*j<f-R$pF!zP2&M!@zz4n#omXaVdPrRjR#x>}JUrOw(qvleEP!J{DCJfp&}+xnvkEXTZQWt$#+!i(@ocA>n[88-gudE:dmk3=3lOUvvm*Ur?{M*%^GZ}zjC]n3^/+NlAs7.%dbeMFd$#q{q]Qw9hu^+<G%<]gT4R>5]+bRF1zs9^+kfv{UTWU0WadZaKTVtD#Dbn(vB#q*}Le5cKO3*o/EvUE143M.}:#[dv(P/bflgu]4)VO33Lihds6y>Y5ygJ13rBjSOp8bc1voJ=7W^m!.&$eIXJ#fQp3s8lX])cN0!](HOu#Tcxn&63AO0>O[{#b1ig+TdG%JjzaE!aP-r?D&]}-[SqAyvRLc}9GLZG.W$-V", "nv": 241, "nt": 228},HG_SH=VIBE_D.HG_SH;
var SER_HGROT=30*Math.PI/180;/* v199zzzc：105／Dura-Ace 吊耳繞後軸心逆時針（從右側看）30°；Dura-Ace 的 RD 掛點隨吊耳孔移動、RD 自身不轉 */
function serHg(on,key){G.rdHgs=G.rdHgs||{};const mk=(k,D)=>{if(!G.rdHgs[k]){const h=new THREE.Mesh(stepDec(D),serMat('hg'+k,M.casM||M.steel));h.frustumCulled=false;h.userData.noBT=true;G.rear.add(h);G.rdHgs[k]=h}return G.rdHgs[k]};/* v199zzzd：105 與 Dura-Ace 的吊耳為同一件，共用一個網格 sh；軸端螺帽 nut（取自 Dura-Ace STEP 的法蘭螺栓，105 也用）；RD 固定螺栓 dx 只有 Dura-Ace 用 */
  if(on){const h=mk('sh',HG_SH);h.visible=true;h.rotation.z=SER_HGROT;const n=mk('nut',HG_NUT);n.visible=true;n.rotation.z=SER_HGROT;const x=mk('dx',HG_DX);x.visible=key==='da';x.rotation.z=SER_HGROT}else Object.values(G.rdHgs).forEach(h=>h.visible=false);if(G.rdHg)G.rdHg.visible=rdSr()&&!on}
function serRD(k){k=k||'shRD';G.rdSerGs=G.rdSerGs||{};if(!G.rdSerGs[k]){const g=grp(),p=k==='shRD'?'rd':'dr';serAdd2(g,SER_D[k],{K:serMat(p+'K',M.alBk),S:serMat(p+'S',M.steel),G:serMat(p+'G',M.casM)},SER_SPEC[k]);G.rear.add(g);G.rdSerGs[k]=g}Object.keys(G.rdSerGs).forEach(x=>{if(x!==k)G.rdSerGs[x].visible=false});G.rdSerG=G.rdSerGs[k];return G.rdSerG}
function serBrake(on){
  if(on&&!G.serBr){const D=SER_D.foCal,E=SER_D.foDisc,
      geo={calBody:stepDec(D.out.body[0]),calBase:stepDec(D.out.base[0]),calScrew:stepDec(D.out.hw[0])},
      mat={calBody:serMat('fcb',M.calBody),calBase:serMat('fcs',M.calBase),calScrew:serMat('fch',M.calScrew)},
      dm={track:serMat('fdt',M.rotor),carrier:serMat('fdc',M.dark)},dg={track:stepDec(E.out.track[0]),carrier:stepDec(E.out.carrier[0])},ds=[];
    [G.fRotor,G.rRotor].forEach(R=>{['track','carrier'].forEach(k=>{const m=new THREE.Mesh(dg[k],dm[k]);m.frustumCulled=false;m.userData.noBT=true;R.add(m);ds.push(m)})});
    G.serBr={geo,mat,ds}}
  const B=G.serBr;if(!B)return;
  [G.fCal,G.rCal].forEach(c=>{if(!c)return;c.children.forEach(m=>{if(!m.isMesh||!B.geo[m.name])return;if(!m.userData.o0)m.userData.o0={g:m.geometry,m:m.material};m.geometry=on?B.geo[m.name]:m.userData.o0.g;m.material=on?B.mat[m.name]:m.userData.o0.m})});
  B.ds.forEach(m=>m.visible=on);if(G.rotI)G.rotI.visible=!on;if(G.rotBI)G.rotBI.visible=!on}
/* v199zzq：Dura-Ace 卡鉗只換卡鉗本體與螺絲（無轉接座、碟盤沿用現行）；座標系與 Force 卡鉗相同（以卡鉗銷對齊），姿態沿用 Force 的 serCalAdj 參數 */
/* v199zzs：繞卡鉗自身（側視包圍盒）中心旋轉 ang（弧度，繞 +z 為正＝從左側看順時針），中心位置不動 */
function serCalSpin(c,ang){const Cc=serCalCen(c),lc=new V3(Cc[0],Cc[1],0),q=c.quaternion,ctr=lc.clone().applyQuaternion(q).add(c.position);q.premultiply(new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),ang));const o=lc.clone().applyQuaternion(q);c.position.set(ctr.x-o.x,ctr.y-o.y,ctr.z-o.z)}
/* v199zzt：繞世界點 P 旋轉 ang（繞 +z 為正＝從左側看順時針） */
function serCalPiv(c,P,ang){const R=new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),ang);c.quaternion.premultiply(R);const d=c.position.clone().sub(P).applyQuaternion(R);c.position.copy(P).add(d)}
function serCal3(on){
  if(on&&!G.serBr3){const D=SER_D.daCal;G.serBr3={geo:{calBody:stepDec(D.out.body[0]),calScrew:stepDec(D.out.hw[0])},mat:{calBody:serMat('dcb',M.calBody),calScrew:serMat('dch',M.calScrew)}}}
  const B=G.serBr3;if(!B)return;
  [G.fCal,G.rCal].forEach(c=>{if(!c)return;c.children.forEach(m=>{if(!m.isMesh)return;
    if(on){if(!m.userData.o0)m.userData.o0={g:m.geometry,m:m.material};if(m.userData.v0===undefined)m.userData.v0=m.visible;
      if(m.name==='calBase'){m.visible=false;return}
      if(B.geo[m.name]){m.geometry=B.geo[m.name];m.material=B.mat[m.name]}}
    else{if(m.name==='calBase'&&m.userData.v0!==undefined)m.visible=m.userData.v0;
      if(B.geo[m.name]&&m.geometry===B.geo[m.name]&&m.userData.o0){m.geometry=m.userData.o0.g;m.material=m.userData.o0.m}}})})}
/* v199zk：FD 兩系列皆改用使用者提供之 STEP（105_FD.stp、SRAM_FORCE_AXS_FD_1.stp），座標已以夾環圓心為原點（a 朝後、b 朝下、c 朝外）。
   群組：band＝夾環與其螺絲（對準座管軸線，內徑依車款座管半徑 RADS.st 縮放）；cage＝籠板與籠側機構（剛性外移使鏈條中心＝大盤鏈線 SERK.z）；hw＝連桿，
   兩系列皆為「夾環」「籠側機構（籠＋連桿）」兩個互不連動的剛體：夾環對準座管、籠側對準鏈線（使用者已在 STEP 分離）。 */
const SER_BAND={shFD:{shift:[12,0],r:17.4,chain:44.4,mode:{band:'none',cage:'rig',hw:'rig'},ramp:[0,1]},foFD:{shift:[3,-4],r:16,chain:64.3,mode:{band:'fix',cage:'rig',hw:'rig'},ramp:[0,1]},daFD:{shift:[0,0],r:16,chain:49.2,mode:{band:'none',cage:'rig',hw:'rig'},ramp:[0,1]}};
function serFDshear(g,D,key){const B=SER_BAND[key],RDm=RADS[model]||RADS['64'],s=(RDm.st*1e3+.6)/B.r,dz=(SERK?SERK.z:.062)*1e3-B.chain,lo=B.ramp[0],hi=B.ramp[1];g.userData.dz=dz;g.userData.bs=s;
  g.children.forEach(o=>{const md=B.mode[o.userData.k],p=o.geometry.attributes.position;if(md==='none'){o.visible=false;return}for(let i=0;i<p.count;i++){const a=p.getX(i)*1e3,b=p.getY(i)*1e3,c=p.getZ(i)*1e3;let w;
    if(md==='fix')w=0;else if(md==='rig')w=1;else{const x=Math.min(1,Math.max(0,(b-lo)/(hi-lo)));w=x*x*(3-2*x)}
    const f=1+(s-1)*(1-w),sh=md==='fix'?B.shift:[0,0];p.setXYZ(i,(a*f+sh[0])*1e-3,b*1e-3,(c*f+sh[1]+dz*w)*1e-3)}p.needsUpdate=true})}
/* v199zl：Force 套件下，前卡鉗「自體旋轉 180°」（後卡鉗的 180° 放在 applyNodes 後卡鉗貼合邏輯內）（繞卡鉗側視包圍盒中心）：後卡鉗油管朝下、鎖孔對位後下叉；前卡鉗油管朝上、鎖孔連線與前叉平行。
   以 userData.sa／sb 記錄調整後／調整前狀態，重複呼叫不累加，切換系列時還原。 */
/* 卡鉗側視包圍盒中心（卡鉗局部座標，含子網格自身矩陣） */
function serCalCen(c){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;c.children.forEach(m=>{if(!m.isMesh)return;m.updateMatrix();const g=m.geometry;if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox;[[bb.min.x,bb.min.y],[bb.min.x,bb.max.y],[bb.max.x,bb.min.y],[bb.max.x,bb.max.y]].forEach(q=>{const v=new V3(q[0],q[1],0).applyMatrix4(m.matrix);x0=Math.min(x0,v.x);x1=Math.max(x1,v.x);y0=Math.min(y0,v.y);y1=Math.max(y1,v.y)})});return[(x0+x1)/2,(y0+y1)/2]}
const SERCAL_HOLE=30*Math.PI/180;/* Force 卡鉗兩鎖孔連線在卡鉗局部座標的方向（與油管軸線約垂直） */
const SERCAL_PORT=[-.0345,.113];/* 油管口（卡鉗局部座標，m） */
/* v199zm：繞卡鉗局部點 Pl 旋轉 d（弧度，逆時針為正，自車右側看），該點世界位置不動 */
function serCalRot(c,Pl,d){const r=c.rotation.z,r2=r+d,cs=Math.cos(r),sn=Math.sin(r),c2=Math.cos(r2),s2=Math.sin(r2);c.position.x+=(cs*Pl[0]-sn*Pl[1])-(c2*Pl[0]-s2*Pl[1]);c.position.y+=(sn*Pl[0]+cs*Pl[1])-(s2*Pl[0]+c2*Pl[1]);c.rotation.z=r2}
/* v199zo：繞卡鉗自身中心、沿世界軸旋轉 180°（ax 為單位軸；後卡鉗＝垂直軸 y 前後翻轉，前卡鉗＝車前後向軸 x 上下翻轉），中心位置不動 */
function serCalFlip(c,ax,ang){const Cc=serCalCen(c),lc=new V3(Cc[0],Cc[1],0),q=c.quaternion,ctr=lc.clone().applyQuaternion(q).add(c.position),h=(ang==null?Math.PI:ang)/2,sh=Math.sin(h),ch=Math.cos(h),vx=sh*ax[0],vy=sh*ax[1],vz=sh*ax[2];
  const x=ch*q.x+q.w*vx+(vy*q.z-vz*q.y),y=ch*q.y+q.w*vy+(vz*q.x-vx*q.z),z=ch*q.z+q.w*vz+(vx*q.y-vy*q.x),w=ch*q.w-(vx*q.x+vy*q.y+vz*q.z);q.set(x,y,z,w);
  const o=lc.clone().applyQuaternion(q);c.position.set(ctr.x-o.x,ctr.y-o.y,ctr.z-o.z)}
/* v199zp：後卡鉗沿垂直方向下移，使最低處坐在後下叉上緣（管半徑 10.5 mm，沿 G.csAx 中心線） */
function serCalSit(c){if(!G.csAx)return;const RAm=new V3(N.RA.x/1000,N.RA.y/1000,0),Fx=G.csAx.F.x-RAm.x,Fy=G.csAx.F.y-RAm.y,Ex=G.csAx.E.x-RAm.x,Ey=G.csAx.E.y-RAm.y,dx=Ex-Fx,dy=Ey-Fy,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;let nx=-uy,ny=ux;if(ny<0){nx=-nx;ny=-ny}c.updateMatrix();let hm=1e9;const v=new V3();
  c.children.forEach(m=>{if(!m.isMesh)return;m.updateMatrix();const p=m.geometry.attributes.position;for(let i=0;i<p.count;i+=2){v.fromBufferAttribute(p,i).applyMatrix4(m.matrix).applyMatrix4(c.matrix);const sx=(v.x-Fx)*ux+(v.y-Fy)*uy;if(sx<0||sx>L)continue;const h=(v.x-Fx)*nx+(v.y-Fy)*ny;if(h<hm)hm=h}});
  if(hm<1e8)c.position.y-=(hm-.0105)/ny}
/* v199zs：Force 卡鉗改以「兩個空鎖孔位」絕對定位（不再疊加任何舊步驟）。
   鎖孔 A、B＝calBase 的兩個孔（局部座標，m；孔軸沿 z，A、B 相距 37.6 mm）。
   前卡鉗：A→B 連線平行前叉（向下），油管朝上；兩孔中點置於叉腿軸線上距輪軸 L 處、再往後偏 d（鎖前叉）。
   後卡鉗：A→B 連線平行後下叉，油管近水平朝前；兩孔中點置於後下叉上緣（管半徑 h）、距後軸 s 處（鎖後下叉）。 */
const SERCAL_A=[-.0175,.0949],SERCAL_B=[.0132,.0744],SERCAL_FR={L:0.064527,d:0.060076,flip:Math.PI,rt:-.785398},SERCAL_RR={s:.069987,h:.041222,flip:Math.PI,rt:-.977385},SERCAL_HOSE=[-.1013,.9949];/* v199zt：flip＝先繞油管軸（局部 xy 平面內，方向 SERCAL_HOSE；量自卡鉗本體網格，與 +y 差約 6°）做 3D 轉動的角度（rad，0＝不轉），之後才做側視 2D 旋轉對位 */
function serCalAdj(){const se=serEff(),on=((se===2&&G.serBr)||((se===1||se===3)&&G.serBr3));/* v199zzw：兩系列一律限客製分頁才套姿態（原 Force 不看分頁，離開客製分頁後卡鉗仍留在 Force 姿態） */[[G.fCal,1],[G.rCal,0]].forEach(([c,fr])=>{if(!c)return;const u=c.userData,q=c.quaternion,cur=[c.position.x,c.position.y,c.position.z,q.x,q.y,q.z,q.w],eq=(a,b)=>a&&a.every((v,i)=>Math.abs(v-b[i])<1e-9);
  if(eq(u.sa,cur)){c.position.set(u.sb[0],u.sb[1],u.sb[2]);q.set(u.sb[3],u.sb[4],u.sb[5],u.sb[6]);u.sa=null}else u.sa=null;const NN=N&&N.RA?N:G.nLast;
  if(fr){const k0=NN?.007:0,fk0=NN?Math.atan2(NN.HTt.y-NN.HTb.y,NN.HTt.x-NN.HTb.x):0,sx=k0*Math.cos(fk0),sy=k0*Math.sin(fk0),o0=u.fs||[0,0];if(NN){c.position.x+=sx-o0[0];c.position.y+=sy-o0[1];u.fs=[sx,sy]}}/* v199zzzg：現行配置前卡鉗沿前叉（HTb→HTt）往上 7 mm；隨節點即時重算，各車款／尺寸都沿各自前叉方向 *//* v199zzw：卡鉗停在已調姿態時，先退回基底再依目前系列與節點重算（原本直接 return，Force↔Dura-Ace 直接切換時前卡鉗留在上一系列姿態；前卡鉗不隨節點重設，節點變動也不會更新） */
  if(!on){if(c.rotation.x||c.rotation.y){c.rotation.x=0;c.rotation.y=0}}/* v199zzda：切離 Force 後清掉 3D 轉動殘留的 x／y 歐拉角，避免現行配置後卡鉗留在翻轉姿態 */
  /* v199zzu：N 暫為空（切換選項期間）時改用最後有效節點，否則直接跳出、卡鉗停在現行位置 */
  if(!on||!NN)return;u.sb=[c.position.x,c.position.y,c.position.z,q.x,q.y,q.z,q.w];c.rotation.x=0;c.rotation.y=0;
  const P0=fr?SERCAL_FR:SERCAL_RR,fl=P0.flip||0,hd=SERCAL_HOSE,hl=Math.hypot(hd[0],hd[1]),hx=hd[0]/hl,hy=hd[1]/hl,cf=Math.cos(fl),sf=Math.sin(fl);
  /* 繞過原點、方向 (hx,hy,0) 的軸轉 fl（Rodrigues）；孔位 xy 因而改變 */
  const rt=p=>{/* 2D 孔位（z 視為 0）：x'=p cos+(1-cos)(d·p)d + sin (d×p)；d×p 僅有 z 分量，xy 不受影響 */const dp=hx*p[0]+hy*p[1];return[p[0]*cf+(1-cf)*dp*hx,p[1]*cf+(1-cf)*dp*hy]};
  const A=rt(SERCAL_A),B=rt(SERCAL_B),ab=Math.atan2(B[1]-A[1],B[0]-A[0]),mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;let rz,tx,ty;
  const daS=se===1||se===3;/* v199zzzg：105／Dura-Ace 卡鉗姿態在「參考尺寸（M64 M）的叉軸角／後下叉角」下計算（與使用者調整時相同），最後再繞叉軸／後軸整體轉過與參考的角度差——各車款、尺寸下卡鉗相對叉腿／後下叉的姿態固定（原本含世界座標平移與繞垂直軸翻轉，叉角每差 1° 卡鉗相對叉腿約差 2°） */
  if(fr){const fk=daS?SER_FKREF:Math.atan2(NN.HTt.y-NN.HTb.y,NN.HTt.x-NN.HTb.x),P=SERCAL_FR;rz=fk+Math.PI-ab+(P.rt||0);tx=P.L*Math.cos(fk)-P.d*Math.sin(fk);ty=P.L*Math.sin(fk)+P.d*Math.cos(fk)}
  else{const th=daS?SER_THREF:Math.atan2(NN.BB.y-NN.RA.y,NN.BB.x-NN.RA.x),P=SERCAL_RR;rz=th+Math.PI-ab+(P.rt||0);tx=P.s*Math.cos(th)-P.h*Math.sin(th);ty=P.s*Math.sin(th)+P.h*Math.cos(th)}
  {const qa=new THREE.Quaternion().setFromAxisAngle(new V3(hx,hy,0),fl),qb=new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),rz);c.quaternion.copy(qb.multiply(qa))}c.position.x=tx-(Math.cos(rz)*mx-Math.sin(rz)*my);c.position.y=ty-(Math.sin(rz)*mx+Math.cos(rz)*my);
  /* v199zzd：歷史歸零。FORCE 前後卡鉗姿態＝基底對位（flip＋孔位對準）＋單一絕對參數：中點在叉軸／後下叉座標系的 L、d（m）與相對基底的側視旋轉 rt（rad，繞 +z 為正，從左側看順時針＝正）。之後新動作請直接改此三值，勿再疊加歷史步驟 */
  if(se===1||se===3){serCalFlip(c,[0,1,0],Math.PI);serCalSpin(c,fr?160*Math.PI/180:-120*Math.PI/180);
    if(fr){c.position.x+=.02;c.position.y+=.02;{const hf=[SERCAL_A,SERCAL_B].map(h=>new V3(h[0],h[1],0).applyQuaternion(c.quaternion).add(c.position)),up=hf[0].y>hf[1].y?hf[0]:hf[1];serCalPiv(c,up,-8*Math.PI/180);const fk2=SER_FKREF;c.position.x+=.018*Math.cos(fk2);c.position.y+=.018*Math.sin(fk2)}}/* v199zzx：前卡鉗以上方鎖孔為圓心逆時針（左側看）2°，再沿前叉（HTb→HTt）往上 10 mm；v199zzz：前卡鉗再逆時針 3°（累計 8°）；v199zzy：再逆時針 3°、再沿前叉上 8（累計逆時針 5°、沿叉上 18；繞同一上孔的旋轉與平移可合併） */ /* v199zzt：前卡鉗往前 10、往上 10 mm（左側看）；v199zzv：再往前 10、往上 10（累計前 20、上 20） */
    else{c.position.y-=.040;const hs=[SERCAL_A,SERCAL_B].map(h=>new V3(h[0],h[1],0).applyQuaternion(c.quaternion).add(c.position));serCalPiv(c,hs[0].x>hs[1].x?hs[0]:hs[1],8*Math.PI/180);const thR=SER_THREF;c.position.x+=.030*Math.cos(thR);c.position.y+=.030*Math.sin(thR);c.position.y+=.01;{const hr=[SERCAL_A,SERCAL_B].map(h=>new V3(h[0],h[1],0).applyQuaternion(c.quaternion).add(c.position));serCalPiv(c,hr[0].x<hr[1].x?hr[0]:hr[1],3*Math.PI/180)}}/* 後卡鉗往下 10 mm，再以前鎖孔為圓心順時針 3°；v199zzv：再沿後下叉（後軸→BB 方向）往前 15 mm；v199zzx：再往下 15（累計下 25）、再沿後下叉往 BB 方向 10（累計 25）；v199zzz：後卡鉗再上 10，再以後鎖孔（x 較小者）為圓心順時針 3°（接在前孔 8° 與沿叉移動之後）；v199zzy：再下 15（累計 40）、沿後下叉往 BB 5（累計 30）、再以前鎖孔為圓心順時針 5°（累計 8°） */{const dA=fr?Math.atan2(NN.HTt.y-NN.HTb.y,NN.HTt.x-NN.HTb.x)-SER_FKREF:Math.atan2(NN.BB.y-NN.RA.y,NN.BB.x-NN.RA.x)-SER_THREF,cd=Math.cos(dA),sd=Math.sin(dA),x0=c.position.x,y0=c.position.y;c.position.x=x0*cd-y0*sd;c.position.y=x0*sd+y0*cd;c.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),dA))}}/* v199zzr：Dura-Ace 前後卡鉗繞自身中心、垂直軸前後旋轉 180° */
  u.sa=[c.position.x,c.position.y,c.position.z,q.x,q.y,q.z,q.w]})}
function serEff(){return ADD_S.ser}/* v199zzzt：系列跨分頁同步；換車款時 setModel 仍以 SER_DEF 重設預設 *//* v199zzzh：實際生效的系列——客製服務分頁用使用者選的 ADD_S.ser；尺寸幾何、扭力分頁用該車款預設 SER_DEF */
var SER_FKREF=1.8936822384138474,SER_THREF=-0.16662359584124625;/* 參考＝M64 尺寸 M 的叉軸角 108.5°／後下叉角 −9.55° */
var SER_FDSL=[0,5,7,12];/* v199zzzf：Dura-Ace 再往 BB 方向 5 mm（累計 12） *//* 索引＝系列（0 現行、1 Shimano 105、2 SRAM Force、3 Dura-Ace）；單位 mm，往 BB 方向 */
function serFD(n){
  const w=(G.crkSerG&&G.crkSerG.visible)?G.crkSerKey:0;serCalAdj();try{placeHS()}catch(e){}/* v199zzzh：卡鉗姿態更新後重放扭力熱點 */
  if(G.rdSerG&&G.rdSerG.visible&&G.rdSram)G.rdSram.visible=false;/* applyNodes0 會依 rdSr() 重設 RD 顯示，這裡再蓋回 */
  if(G.rdSerG&&G.rdSerG.visible)G.rdSerG.position.z=chZ()+RD_DZX;
  if(!w){if(G.serFDg)G.serFDg.visible=false;return}
  if(G.serFDg&&(G.serFDg.userData.w!==w||G.serFDg.userData.m!==model)){G.bb.remove(G.serFDg);G.serFDg.traverse(o=>{if(o.isMesh&&o.geometry)o.geometry.dispose()});G.serFDg=null}
  const D=SER_D[SER_FDK[w]];
  if(!G.serFDg){const g=grp();g.userData.w=w;g.userData.m=model;serAdd2(g,D,{K:serMat('fdK'+w,M.alBk),S:serMat('fdS'+w,M.steel),G:serMat('fdG'+w,M.casM)},SER_SPEC[SER_FDK[w]]);serFDshear(g,D,SER_FDK[w]);g.matrixAutoUpdate=false;G.bb.add(g);G.serFDg=g}
  const g=G.serFDg;if(!n||!n.STtop||!n.BB){g.visible=false;return}
  const ux=n.STtop.x-n.BB.x,uy=n.STtop.y-n.BB.y,L=Math.hypot(ux,uy)||1,u=new V3(ux/L,uy/L,0),d=u.clone().negate(),t=new V3(-d.y,d.x,0);if(t.x<0)t.negate();t.negate();/* v199zi：a 軸（籠板長向）朝後——真實 FD 籠板由夾環向後下方延伸包住大盤後上緣（v199zh 朝前＝鏡像錯誤） */
  const bC=(D.meta.cageB[0]+D.meta.cageB[1])/2,sB=(SERK?SERK.r:100)+4+2+bC;/* 籠中心落在大盤齒尖外 2 mm；夾環在座管上、側向 Z=0（夾在座管上）；籠與大盤側向差見交接檔 */
  g.matrix.makeBasis(t,d,new V3(0,0,1));g.matrix.setPosition(u.clone().multiplyScalar((sB-(SER_FDSL[w]||0))*1e-3));/* v199zzze：整個 FD 套件（含管束）沿座管軸往 BB 方向再移 SER_FDSL[系列] mm */
  if(w===3){/* v199zzr：Dura-Ace FD 以自身（側視包圍盒中心）逆時針（從左側看）轉 15°；管束已刪 */
    if(!g.userData.ctr){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;g.children.forEach(o=>{if(!o.visible)return;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++){x0=Math.min(x0,p.getX(i));x1=Math.max(x1,p.getX(i));y0=Math.min(y0,p.getY(i));y1=Math.max(y1,p.getY(i))}});g.userData.ctr=[(x0+x1)/2,(y0+y1)/2]}
    const c=g.userData.ctr,M4=THREE.Matrix4;g.matrix.multiply(new M4().makeTranslation(c[0],c[1],0)).multiply(new M4().makeRotationZ(-15*Math.PI/180)).multiply(new M4().makeTranslation(-c[0],-c[1],0))}
  g.matrixWorldNeedsUpdate=true;g.visible=true}
function serApply(){
  if(!ADDX)return;
  const on=true,s=serEff(),crT=on&&ADD_S.ti.crank>0,/* v199zzzt：跨分頁同步 */wc=(s>0&&!crT)?s:0,p0=SERK?SERK.r:0,r0=!!SERRD,sj0=JSON.stringify(SERRD);
  if(wc&&G.crkSerKey!==wc)serCrank(wc);
  if(G.crkSerG)G.crkSerG.visible=!!wc;
  if(wc){[G.crkNewG,G.crkGrvG,G.crkAudG,G.crkTiG,G.crkF1G].forEach(g=>{if(g)g.visible=false});const m=SER_D[SER_CRK[wc]].meta;SERK={z:m.ringZ*1e-3,r:m.ringPitchR}}else SERK=null;
  if(s===1||s===3){const k=s===1?'shRD':'daRD',g=serRD(k),q=SER_D[k].meta,hx=-.02419,hy=-.00906,cr=Math.cos(SER_HGROT),sr_=Math.sin(SER_HGROT),bx=hx*cr-hy*sr_,by=hx*sr_+hy*cr,/* v199zzzd：105 與 Dura-Ace 的 RD 軸心都對到吊耳 RD 端孔（原 105「再往後 15 mm」改為對孔） */rr=0,rq=u=>[bx+u[0]*1e-3,by+u[1]*1e-3];/* v199zzzc：Dura-Ace RD 只隨吊耳 RD 端孔平移，自身不轉（整組剛性轉 30° 實測反而更貼後下叉） *//* v199zzzb：105 RD 再往後 15 mm；Dura-Ace RD 掛在吊耳 RD 端孔（STEP 原座標） */g.visible=true;g.position.set(bx,by,chZ()+RD_DZX);g.rotation.z=rr;if(G.rdSram)G.rdSram.visible=false;
    SERRD={rp:s===1?19:21,qs:s===1?[[bx+q.qUp[0]*1e-3,by+q.qUp[1]*1e-3],[bx+q.qLo[0]*1e-3,by+q.qLo[1]*1e-3]]:[rq(q.qUp),rq(q.qLo)]}}
  else{SERRD=null;if(G.rdSerG)G.rdSerG.visible=false;if(G.rdSram)G.rdSram.visible=rdSr()}
  serHg(s===1||s===3,s===1?'sh':'da');shmApply(s===1||s===3);const had=!!G.serBr&&G.rotI&&!G.rotI.visible;serBrake(s===2);serCal3(s===1||s===3);
  serFD(N);
  if(((SERK?SERK.r:0)!==p0||!!SERRD!==r0||JSON.stringify(SERRD)!==sj0)&&N)applyNodes(N);
  if(had!==(s===2)||wc||p0)partAlpha(tab==='custom')}

renderAddon();

/* ===== 分頁切換 ===== */
/* 客製車架：車架（M.ti）以外的零組件半透明（預設 10%） */
let ALPHA=.10;
function partAlpha(on){const t=on&&ALPHA<1,seen=new Set();/* v90：材質可能是陣列（飛輪最大片、EX 兩件式勾爪）；原本把 transparent 設在陣列物件上沒作用，飛輪片因此不會半透明。陣列中只要有車架旗標材質，整個網格視為車架（EX 勾爪維持不透明）。 */
  bike.traverse(o=>{if(!o.isMesh||!o.material)return;const cur=o.userData.origMat||o.userData.origMatMP||o.material,ms=Array.isArray(cur)?cur:[cur];if(o.userData.keepOpaque||ms.some(m=>m&&m.userData&&m.userData.frame))return;ms.forEach(m=>{if(!m||seen.has(m))return;seen.add(m);if(m.userData&&m.userData.addonOn)return;m.transparent=t;m.opacity=t?ALPHA:1;m.depthWrite=!t;m.forceSinglePass=true;m.needsUpdate=true})});SPK.forEach(m=>{m.transparent=t;m.opacity=t?ALPHA:1;m.depthWrite=!t;m.needsUpdate=true});addonSyncAlpha();toonSync()}
const alR=document.getElementById('alphaR');alR.oninput=()=>{ALPHA=alR.value/100;document.getElementById('alphaV').textContent=alR.value+'%';partAlpha(tab==='custom')};

/* v199zzzzzz109：右側面板顯示狀態單一來源（B1）。scInfoNode＝目前特寫節點索引或 null；只有 asideSync 寫 #scInfo 與 .panel 的 hidden。 */
let scInfoNode=null;
function asideSync(){const bx=document.getElementById('scInfo'),show=scInfoNode!=null&&tab==='torque';if(bx)bx.hidden=!show;document.querySelectorAll('.panel').forEach(p=>{p.hidden=(p.dataset.panel!==tab)||(p.dataset.panel==='torque'&&show)})}
function setTab(t){tab=t;if(t!=='torque'&&scInfoNode!=null){scInfoNode=null;const tg=document.getElementById('scTag');if(tg)tg.dataset.on='0'}/* v109：離開扭力巡檢＝特寫卡與標籤一併關閉，展示不停（與 v102「特寫只在整車組裝」一致） */if(t!=='torque'&&G.exSet)G.exSet(false,true);if(t==='custom')cSub='paint';partAlpha(t==='custom');document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));
  asideSync();closeCard();dimKey=null;updateDim();stTagSet();document.getElementById('stTag').hidden=false;/* v199zzzzi：客製服務也顯示車款・尺寸膠囊；v199zzzzzz89：所有主分頁都顯示（扭力巡檢固定以 M 尺寸呈現，尺寸不可點） */
  bottom.hidden=t!=='custom';bottom.scrollTop=0;  if(t==='custom'){extras=addonExtras();recalc();if(CN)goNodes(custTarget())}
  else{extras=addonExtras();/* v199zzzt：加購跨分頁同步 */if(t==='geo'){fitPick();goGeo(size,true);renderGeo()}else goNodes(stockNodes(GEO.find(g=>g.size==='M')))}
  addonApply();syncSub();updateGhost();paintHS();resize();goHome();STU.fit();/* v199zzzzzz112：首頁取景距離隨分頁改變 */markRider()}
/* v134：客製服務的 3D 車架——「幾何客製」用客製節點 CN；「塗裝客製」「加購套件」沿用尺寸幾何分頁所選尺寸（size）的標準節點。 */
function effSub(){return(cSub==='paint'&&finOk())?'paint':(cSub==='addon'?'addon':'geo')}
function custTarget(){return(effSub()==='geo'||!CN)?CN:stockNodes(GEO.find(g=>g.size===size)||GEO.find(g=>g.size==='M'))}
/* v134：主分頁左右滑動（在分頁膠囊上滑動；3D 畫面上的左右拖曳仍是旋轉，不搶），與方向鍵 */
(function(){const bar=document.querySelector('#stBar .tabs'),TB=['geo','custom','torque'];let x0=null,sw=false;
  const go=d=>{const i=TB.indexOf(tab),j=Math.max(0,Math.min(2,i+d));if(j!==i)setTab(TB[j])};
  bar.addEventListener('pointerdown',e=>{x0=e.clientX;sw=false});
  bar.addEventListener('pointerup',e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>28){sw=true;go(dx<0?1:-1)}});
  bar.addEventListener('click',e=>{if(sw){e.stopPropagation();e.preventDefault();sw=false}},true);
  bar.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){go(e.key==='ArrowRight'?1:-1);const b=bar.querySelector('[aria-selected=true]');if(b)b.focus();e.preventDefault()}})})();
/* v135：行動直幅時把主分頁移進面板頂端（#sheetTabs），其餘情況放回 3D 底部（#stBar） */
(function(){const mq=matchMedia('(max-width:760px)'),bar=document.getElementById('stBar'),tabs=bar.querySelector('.tabs'),aside=document.querySelector('aside'),sh=document.createElement('div');sh.id='sheetTabs';aside.insertBefore(sh,aside.firstChild);
  const main=document.querySelector('main'),ST=['closed','mid','full'],gb=document.createElement('button');main.dataset.sheet='mid';
  gb.type='button';gb.className='gb';gb.setAttribute('aria-label','卡片高度：上下拖曳任意調整，點一下收起或展開');
  const cur=()=>ST.indexOf(main.dataset.sheet),set=s=>{main.dataset.sheet=ST[Math.max(0,Math.min(2,s))];wk()};let y0=null,hOpen=0;/* v199zzzzzz113：無段式——放開停在哪就是哪（hOpen＝最後的展開高度 px；0＝CSS 預設 48dvh＋頁首） */
  const hd=()=>{const h=document.querySelector('main>.left>header');return h?h.offsetHeight:0};
  /* v199zzzzzz73：拖曳時卡片即時跟手（改 3D 區高度 --stH），放開依位置＋速度吸附到最近的三段之一（使用者 2026-11-17 選定） */
  const lf=document.querySelector('main>.left')||document.querySelector('.left');let h0=0,mv=false,tr=[];
  const lim=()=>{const H=innerHeight,M=main.clientHeight,k=hd();return{full:.22*H+k,mid:.48*H+k,closed:Math.max(.48*H+k,M-((sh.offsetHeight||48)+8))}};
  const end=()=>{delete main.dataset.drag};
  const openAt=h=>{const L=lim();h=Math.max(L.full,Math.min(L.closed,h));if(h>=L.closed-28){main.style.setProperty('--stH',(hOpen||L.mid)+'px');set(0);return}hOpen=h;main.style.setProperty('--stH',h+'px');set(1)};
  addEventListener('resize',()=>{if(hOpen){const L=lim();hOpen=Math.max(L.full,Math.min(L.closed-30,hOpen));main.style.setProperty('--stH',hOpen+'px')}});
  gb.addEventListener('pointerdown',e=>{y0=e.clientY;mv=false;tr=[[e.clientY,performance.now()]];h0=lf?lf.getBoundingClientRect().height:0;try{gb.setPointerCapture(e.pointerId)}catch(_){}});
  gb.addEventListener('pointermove',e=>{if(y0===null||!lf)return;const dy=e.clientY-y0;if(!mv&&Math.abs(dy)<6)return;
    if(!mv){mv=true;main.dataset.drag='1';if(main.dataset.sheet==='closed')main.dataset.sheet='mid'}
    const L=lim(),h=Math.max(L.full,Math.min(L.closed,h0+dy));main.style.setProperty('--stH',h+'px');tr.push([e.clientY,performance.now()]);if(tr.length>6)tr.shift();wk()});
  gb.addEventListener('pointerup',e=>{if(y0===null)return;const dy=e.clientY-y0;y0=null;
    if(!mv){end();if(cur()===0)set(1);else set(0);return}/* 點一下：收起↔展開（回到上次高度） */
    end();openAt(h0+dy)});
  gb.addEventListener('pointercancel',()=>{y0=null;end()});
  gb.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){const L=lim(),h=cur()===0?L.closed:(lf?lf.getBoundingClientRect().height:L.mid);openAt(h+(e.key==='ArrowUp'?-1:1)*.06*innerHeight);e.preventDefault()}});
  sh.insertBefore(gb,sh.firstChild);tabs.addEventListener('click',()=>{if(main.dataset.sheet==='closed')set(1)},true);/* 收合時點分頁＝先展開 */
  const fit=()=>{(mq.matches?sh:bar).appendChild(tabs)};if(mq.addEventListener)mq.addEventListener('change',fit);else mq.addListener(fit);fit();
  /* v199zzzzzz113：頁首高度（--hdH）——頁首浮在 3D 區上方，車款膠囊與行動版卡片高度都以它避讓 */
  {const H=document.querySelector('main>.left>header');if(H){const up=()=>document.documentElement.style.setProperty('--hdH',H.offsetHeight+'px');new ResizeObserver(up).observe(H);up()}}
  /* v199zzzzzz113：桌機右側欄無段式收折（使用者 2026-11-19）：把手在 3D 欄右緣；左右拖曳即時改寬，放開停在哪就是哪；窄於 140 px 視為收起；點一下收起↔展開（回到上次寬度）；左右方向鍵每次 5% 視窗寬 */
  {const lf2=document.querySelector('main>.left'),ag=document.createElement('button');ag.id='asGb';ag.type='button';ag.setAttribute('aria-label','右側卡片：點一下或左右拖曳，全開／全收');lf2.appendChild(ag);
   let x0=null,w0=0,moved=false,wOpen=0;/* v116：卡片內容寬固定（--asCW），拖曳只改露出寬（--asW）＝行動版卡片轉 90 度；W＝露出寬、mx＝內容寬 */const W=()=>Math.max(0,main.getBoundingClientRect().right-aside.getBoundingClientRect().left),mx=()=>parseFloat(getComputedStyle(aside).width)||450;
   const apply=w=>{/* v117：兩段——全開／全收（使用者 2026-11-19）。拖曳時跟手，放開以內容寬一半為界吸附 */if(w<mx()/2){main.dataset.aside='closed'}else{delete main.dataset.aside}main.style.removeProperty('--asW');wk()};
   ag.addEventListener('pointerdown',e=>{x0=e.clientX;moved=false;w0=W();try{ag.setPointerCapture(e.pointerId)}catch(_){}});
   ag.addEventListener('pointermove',e=>{if(x0===null)return;const dx=x0-e.clientX;if(!moved&&Math.abs(dx)<5)return;if(!moved){moved=true;main.dataset.drag='1';if(main.dataset.aside==='closed'){delete main.dataset.aside;main.style.setProperty('--asW',w0+'px')}}main.style.setProperty('--asW',Math.max(0,Math.min(mx(),w0+dx))+'px');wk()});
   const tog=()=>{if(main.dataset.aside==='closed'){delete main.dataset.aside;if(wOpen)main.style.setProperty('--asW',wOpen+'px');else main.style.removeProperty('--asW')}else main.dataset.aside='closed';wk()};let skip=false;
   const up=e=>{if(x0===null)return;const dx=x0-e.clientX;x0=null;delete main.dataset.drag;if(!moved)return;skip=true;setTimeout(()=>{skip=false},0);apply(w0+dx)};
   ag.addEventListener('pointerup',up);addEventListener('pointerup',up);/* v118：指標滑出把手後放開也要吸附（原本只聽把手，慢幀時會停在半開）；skip 只擋緊接著的那次 click */ag.addEventListener('click',()=>{if(skip){skip=false;return}tog()});/* 點一下（含鍵盤 Enter／空白鍵）＝收起↔展開；拖曳後的 click 略過 */ag.addEventListener('pointercancel',()=>{x0=null;delete main.dataset.drag});
   ag.addEventListener('keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;apply(e.key==='ArrowLeft'?mx():0);e.preventDefault()});/* v117：← 全開、→ 全收 */
   addEventListener('resize',()=>{if(wOpen&&main.dataset.aside!=='closed'){const w=Math.min(mx(),wOpen);main.style.setProperty('--asW',w+'px')}})}})();
/* v139：3D 畫面上的「車款・尺寸」膠囊——點車款＝下一車款、點尺寸＝下一尺寸，皆循環。 */
(function(){const t=document.getElementById('stTag'),act=e=>{const s=e.target.closest&&e.target.closest('[data-k]');if(!s)return;const K=Object.keys(MNAME);
    if(s.dataset.k==='m'){setModel(K[(K.indexOf(selM)+1)%K.length])}
    else if(GEOS[selM]){const ss=GEO.map(g=>g.size),n=ss[(ss.indexOf(size)+1)%ss.length];size=n;if(cmp===size)cmp=null;goGeo(size);updateGhost();renderGeo()}};
  t.addEventListener('click',act);t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){act(e);e.preventDefault()}})})();
/* v199zzzzzz73：點卡片上方的尺寸大字＝換下一個尺寸（循環），同 3D 膠囊 */(function(){const g=document.getElementById('geoScore');if(!g)return;const go=e=>{if(!(e.target.closest&&e.target.closest('[data-next]'))||!GEOS[selM])return;const ss=GEO.map(x=>x.size),n=ss[(ss.indexOf(size)+1)%ss.length];size=n;if(cmp===size)cmp=null;goGeo(size);updateGhost();renderGeo()};const dm=e=>{const t=e.target.closest&&e.target.closest('[data-dim]');if(!t||!GEOS[selM])return false;const k=t.dataset.dim;
    if(dimKey===k){dimKey=null;updateDim();geoTable.querySelectorAll('tr.on').forEach(x=>x.classList.remove('on'))}
    else{dimKey=k;refreshDimText();updateDim();geoTable.querySelectorAll('tr.on').forEach(x=>x.classList.remove('on'));const tr=geoTable.querySelector('tr[data-k="'+k+'"]');if(tr)tr.classList.add('on')}
    return true};
  g.addEventListener('click',e=>{if(!dm(e))go(e)});g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){if(!dm(e))go(e);e.preventDefault()}})})();
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!tm.hidden)tm.hidden=true;else{const w=sel&&!wrap.hidden;closeCard();if(w)scResume()}}});
ADDONS.forEach(a=>{document.getElementById('tag_'+a.id).innerHTML=`<span>${a.name}</span>`});
/* ===== 管件接合處焊道（v53）：沿管端魚口環掃 r=1.8 mm 的圓管（半埋入），材質粗糙度 .52＋程序化「疊幣紋」normal；來源環＝上管／下管／後上叉（含 EX 與放樣）端環 ===== */
const WELD=(()=>{const wm=M.ti.clone();wm.roughness=.52;wm.side=THREE.DoubleSide;const W=256,H=16,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d'),d=g.createImageData(W,H),K=48;
  const hh=(x,y)=>{const e=1-Math.pow(Math.abs(y/(H-1)-.5)*2,2);return (.5+.5*Math.cos(2*Math.PI*x/W*K+ (y/(H-1)-.5)*3.2))*e};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=(hh(x-1,y)-hh(x+1,y))*1.6,dy=(hh(x,Math.max(0,y-1))-hh(x,Math.min(H-1,y+1)))*.8,l=Math.hypot(dx,dy,1),o=(y*W+x)*4;d.data[o]=(dx/l*.5+.5)*255;d.data[o+1]=(dy/l*.5+.5)*255;d.data[o+2]=(1/l*.5+.5)*255;d.data[o+3]=255}
  g.putImageData(d,0,0);const tx=new THREE.CanvasTexture(cv);tx.wrapS=tx.wrapT=1000;wm.normalMap=tx;wm.normalScale=new THREE.Vector2(.9,.9);
  const items={};const RW=.0033,SG=8;
  const make=(key,np)=>{const g=new THREE.BufferGeometry(),idx=[],uv=[];g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(np*SG*3),3));
    for(let i=0;i<np;i++)for(let j=0;j<=SG;j++){}
    for(let i=0;i<np;i++){const i2=(i+1)%np;for(let j=0;j<SG;j++){const j2=(j+1)%SG,a=i*SG+j,b=i2*SG+j,c=i*SG+j2,e=i2*SG+j2;idx.push(a,b,c,b,e,c)}}
    for(let i=0;i<np;i++)for(let j=0;j<SG;j++)uv.push(i/np,j/SG);
    g.setIndex(idx);g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));const m=new THREE.Mesh(g,wm);m.frustumCulled=false;bike.add(m);return items[key]={m,np}};
  const tmp=new V3(),ct=new V3(),no=new V3(),bn=new V3(),tg=new V3(),pa=new V3(),pb=new V3();
  const upd=(key0,src,np,off)=>{const key=key0+'_'+np;let it=items[key];if(!src||!src.visible)return;
    if(!it)it=make(key,np);const A=src.geometry.attributes.position.array,P=it.m.geometry.attributes.position.array;it.m.visible=true;
    ct.set(0,0,0);for(let i=0;i<np;i++){ct.x+=A[off+i*3]/np;ct.y+=A[off+i*3+1]/np;ct.z+=A[off+i*3+2]/np}
    for(let i=0;i<np;i++){const p=(k)=>{const q=off+((i+k+np)%np)*3;return tmp.set(A[q],A[q+1],A[q+2])};pa.copy(p(1));pb.copy(p(-1));tg.copy(pa).sub(pb).normalize();const c=p(0).clone();
      no.copy(c).sub(ct);no.addScaledVector(tg,-no.dot(tg)).normalize();bn.crossVectors(tg,no).normalize();
      for(let j=0;j<SG;j++){const th=j/SG*Math.PI*2,o=(i*SG+j)*3;P[o]=c.x+RW*(Math.cos(th)*no.x+Math.sin(th)*bn.x);P[o+1]=c.y+RW*(Math.cos(th)*no.y+Math.sin(th)*bn.y);P[o+2]=c.z+RW*(Math.cos(th)*no.z+Math.sin(th)*bn.z)}}
    it.m.geometry.attributes.position.needsUpdate=true;it.m.geometry.computeVertexNormals()};
  return {upd,items}})();
/* 框高隨車款（v55）：MASTER 56 mm＞AUDAX／ili ili 325Ti／SS-2205 45 mm＞EX 35 mm；僅重建框的旋轉斷面，輪胎與輪組其餘不動 */
const RIMD={'64':56,'325':56,audax:45,ili:45,ss:45,ex:35};let rimCur=-1;
function updateRim(){const d=RIMD[selM]||56;if(d===rimCur)return;rimCur=d;const f=[[0,-.011],[0,.011],[.013,.0135],[.033,.014],[.05,.0115],[.056,.006],[.056,-.006],[.05,-.0115],[.033,-.014],[.013,-.0135],[0,-.011]],pr=f.map(p=>new THREE.Vector2(.318-p[0]*d/56/1000*1000,p[1]));
  {const ng=new THREE.LatheGeometry(pr,96);[G.wR,G.wF].forEach(g=>{const r=g.userData.rim;if(r){if(r.geometry!==ng)r.geometry.dispose();r.geometry=ng}})}}
function updateWelds(){updateRim();{const ex=!!(T.csL&&T.csL.visible);
    /* v73：前輪手柄繞軸心轉到平行前叉（扳桿方向＝軸心朝叉冠的方向；手柄檔案扳桿原本指向 −19.7°） */
    if(N&&N.HTt&&N.HTb)G.hdlF.rotation.z=Math.atan2(N.HTt.y-N.HTb.y,N.HTt.x-N.HTb.x)+(19.7+30)*Math.PI/180;
    /* EX 以外：後卡鉗基座長軸平行後下叉（BB→後軸方向），取離原角度最近的解 */
    if(!ex&&N){const cb=G.rCal.children.find(c=>c.name==='calBase');if(cb){if(G.calLocAng==null){const P=cb.geometry.attributes.position.array;let mx=0,my=0,n=P.length/3;for(let i=0;i<P.length;i+=3){mx+=P[i];my+=P[i+1]}mx/=n;my/=n;let sxx=0,syy=0,sxy=0;for(let i=0;i<P.length;i+=3){const dx=P[i]-mx,dy=P[i+1]-my;sxx+=dx*dx;syy+=dy*dy;sxy+=dx*dy}G.calLocAng=.5*Math.atan2(2*sxy,sxx-syy)}
      const th=Math.atan2(N.BB.y-N.RA.y,N.BB.x-N.RA.x);let r=th-G.calLocAng;const cur=.26-Math.PI/2;while(r-cur>Math.PI/2)r-=Math.PI;while(r-cur<-Math.PI/2)r+=Math.PI;let fx=0,fy=0;if(serEff()===2){const Cc=serCalCen(G.rCal),c0=Math.cos(r),s0=Math.sin(r);fx=2*(c0*Cc[0]-s0*Cc[1]);fy=2*(s0*Cc[0]+c0*Cc[1]);r+=Math.PI}/* v199zl：Force 後卡鉗繞自身中心旋轉 180°（油管朝下；fx／fy＝繞自身中心旋轉的位移），底座再由下方 v74 貼合邏輯重新坐上後下叉 */G.rCal.rotation.z=r;
      /* v74：側視使基座碰到後下叉——把卡鉗總成沿基座到後下叉中心線的垂線方向平移，直到基座最近的頂點離管面 0 */
      G.rCal.position.x=fx;G.rCal.position.y=fy;if(G.csAx){const RAm=new V3(N.RA.x/1000,N.RA.y/1000,0),Fx=G.csAx.F.x-RAm.x,Fy=G.csAx.F.y-RAm.y,Ex=G.csAx.E.x-RAm.x,Ey=G.csAx.E.y-RAm.y,dx=Ex-Fx,dy=Ey-Fy,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,P=cb.geometry.attributes.position.array,c=Math.cos(r),sn=Math.sin(r);
        let mn=1e9,mx=-1e9;for(let i=0;i<P.length;i+=3){const wx=c*P[i]-sn*P[i+1]+fx,wy=sn*P[i]+c*P[i+1]+fy,d=(wx-Fx)*nx+(wy-Fy)*ny;if(d<mn)mn=d;if(d>mx)mx=d}
        const sideSign=(mn+mx)/2>=0?1:-1,near=sideSign>0?mn:-mx,gap=Math.abs(near)-.0105;G.rCal.position.x=fx-sideSign*nx*gap-(dx/L)*.029;G.rCal.position.y=fy-sideSign*ny*gap-(dy/L)*.029}}}
    if(ex){G.rCal.position.x=0;G.rCal.position.y=0}if(ex)G.rCal.rotation.z=((G.rCal.userData.exAng!=null)?G.rCal.userData.exAng+.8727:.26)-Math.PI/2;serCalAdj();/* v199zzd：後卡鉗位置算完後立即重套 Force 姿態（先前 applyNodes 在 serCalAdj 之後把後卡鉗改回舊姿態，使用者看到的不是 SERCAL_RR） *//* v72：EX 卡鉗再向後轉 50°（使用者：至少再 45°）*/{const key=ex?'ex':'udh';if(G.axKey!==key){G.axKey=key;buildAxle(G.axR,ex?82:87,ex?82.5:87);G.hdlR.position.z=ex?0:-.005}}if(G.exDropL){G.exDropL.visible=ex;G.exDropR.visible=ex;if(G.exTiL){G.exTiL.visible=ex;G.exTiR.visible=ex}G.dropoutL.visible=!ex;G.dropoutR.visible=!ex;
    /* 後端外移量 REARSH＝0（v64 回到初始 OLD；v59–v63 曾試 8～58 mm）。原說明：：RD／飛輪片／端蓋／墊圈向外（＋z）、後卡鉗總成與轉子向外（−z）各移 REARSH */
    rdSramApply();const C=G.rear.children,SH=ex?{cas:.0159,rd:.0275,cal:.01625}:{cas:.0119,rd:.021,cal:.0125};
    /* v69：飛輪片（含鎖環）外移到外緣碰勾爪最內側（UDH 67.5／EX 71.5 mm）；RD 總成外移到本體內側碰勾爪外側（UDH 76／EX 82.5 mm）；後卡鉗總成與轉子向外 2.5 個勾爪板厚（v71；UDH 12.5／EX 16.25 mm） */
    [[[4,5],SH.cas],[[7,8,9,10,11,12],SH.rd],[[13,14],-SH.cal]].forEach(([ids,d])=>ids.forEach(k=>{const c=C[k];if(!c)return;if(c.userData.bz==null)c.userData.bz=c.position.z;c.position.z=c.userData.bz+d}));if(N)chainRD(N);
    /* v80：EX 後卡鉗基座貼合左側黑色勾爪件（參考使用者截圖：基座沿黑件上緣輪廓靠上去）：在基座與黑件共有的側向厚度帶內（z −72～−58 mm），找基座頂點到黑件頂點的最近點對，把卡鉗總成在側視平面內平移該向量，使兩者側視輪廓相碰 */
    if(ex&&G.exDropL&&N){const cb=G.rCal.children.find(c=>c.name==='calBase'),dm=G.exDropL,D=dm.geometry.attributes.position.array,Ix=dm.geometry.index.array,i0=dm.userData.n1*3,i1=dm.userData.nf*3,r=G.rCal.rotation.z,c=Math.cos(r),sn=Math.sin(r),B=cb.geometry.attributes.position.array;
      G.rCal.position.x=0;G.rCal.position.y=0;const pz0=G.rCal.position.z;
      const pv=[];const seen=new Set();for(let i=i0;i<i1;i+=2){const a0=Ix[i]*3;if(seen.has(a0))continue;seen.add(a0);const z=D[a0+2];if(z<-.072||z>-.058)continue;pv.push(D[a0],D[a0+1])}
      let bd=1e9,bx=0,by=0;const st=Math.max(1,Math.floor(B.length/3/200));
      for(let q=0;q<B.length;q+=3*st){const wz=B[q+2]+pz0;if(wz<-.075||wz>-.055)continue;const wx=c*B[q]-sn*B[q+1],wy=sn*B[q]+c*B[q+1];
        for(let k=0;k<pv.length;k+=2){const dx=pv[k]-wx,dy=pv[k+1]-wy,d=dx*dx+dy*dy;if(d<bd){bd=d;bx=dx;by=dy}}}
      if(bd<1e8){G.rCal.position.x=bx;G.rCal.position.y=by}
      /* v81：以基座靠黑件的那顆螺絲（卡鉗局部座標 (33.4,68.2) mm＝截圖綠點）為圓心，整個後卡鉗總成順時針（側視）轉 DEL */
      {const DEL=13*Math.PI/180/* v84：再轉回 0.5°（13.5→13°）*//* v82：以基座與黑件側視輪廓重合的頂點數掃描 0–30°，12–16° 為高原，取 14°（v81 為 30°，轉太多）*/,pl=[.0334,.0682],px=c*pl[0]-sn*pl[1]+G.rCal.position.x,py=sn*pl[0]+c*pl[1]+G.rCal.position.y,dx=G.rCal.position.x-px,dy=G.rCal.position.y-py,cd=Math.cos(DEL),sd=Math.sin(DEL);
        G.rCal.position.x=px+cd*dx-sd*dy;G.rCal.position.y=py+sd*dx+cd*dy;G.rCal.rotation.z=r+DEL}}}}const LN2=LN,LA=LF.length-1;Object.values(WELD.items).forEach(i=>i.m.visible=false);
  ['TT','DT'].forEach(k=>{if(LOFTON){if(k==='TT')WELD.upd(k+'0',loft[k],LN2,0);if(k==='DT'&&model==='ex'){if(G.dtHtRing){G.dtHtSrc=G.dtHtSrc||{visible:true,geometry:{attributes:{position:{array:G.dtHtRing}}}};WELD.upd('DTh',G.dtHtSrc,LN2,0)}}else WELD.upd(k+'1',loft[k],LN2,LA*LN2*3)}else{if(k==='TT')WELD.upd(k+'0',T[k],48,0);WELD.upd(k+'1',T[k],48,48*3)}/* v199zc：下管 BB 端（環 0）封蓋在五通殼內、焊道被埋住，改由下方交線焊道取代 */});
  ['L','R'].forEach(sd=>{const ex=T['ss'+sd]&&T['ss'+sd].visible;if(ex)WELD.upd('SS'+sd,T['ss'+sd],32,0);else WELD.upd('SS'+sd,T['SS'+sd],48,0);if(ex&&WELD.items['SS'+sd]&&WELD.items['SS'+sd].np!==32){}});
  /* v199zc：BB 端交線焊道。下管、座管、左右鏈條叉在 BB 殼（軸向 z、外半徑 32.5 mm、中心＝N.BB）上的交線。各管表面沿管軸方向的每條縱線，找它離開殼面（xy 距 BB 中心＝32.5 mm）的點，連成封閉環餵給 WELD.upd（以偽來源物件）。
     下管：非放樣 2 環×48、放樣 LN 點×LA+1 環；後下叉：放樣 64 點×48 環、EX 32 點×N 站；座管為正圓管，解析式 t(θ)=√(R²−(r·cosθ)²)。縱線起點若已在殼外（沒有被殼包住）就取起點。 */
  if(N&&N.BB){const BBx=N.BB.x*1e-3,BBy=N.BB.y*1e-3,RS=.0325,xyd=(x,y)=>Math.hypot(x-BBx,y-BBy);G.bbWeldSrc=G.bbWeldSrc||{};
    const bbW=(key,np,pts)=>{let s=G.bbWeldSrc[key];if(!s){s=G.bbWeldSrc[key]={visible:true,geometry:{attributes:{position:{array:new Float32Array(np*3)}}}}}s.geometry.attributes.position.array.set(pts);WELD.upd(key,s,np,0)};
    const hit=(A,ix,nR)=>{let o=ix(0),x0=A[o],y0=A[o+1],z0=A[o+2];if(xyd(x0,y0)>=RS)return[x0,y0,z0];
      for(let i=0;i<nR-1;i++){o=ix(i+1);const x1=A[o],y1=A[o+1],z1=A[o+2];
        if(xyd(x1,y1)>=RS){const dx=x1-x0,dy=y1-y0,px=x0-BBx,py=y0-BBy,a=dx*dx+dy*dy,b=2*(px*dx+py*dy),c=px*px+py*py-RS*RS,s=a>1e-12?(-b+Math.sqrt(Math.max(0,b*b-4*a*c)))/(2*a):0;return[x0+dx*s,y0+dy*s,z0+(z1-z0)*s]}
        x0=x1;y0=y1;z0=z1}
      return[x0,y0,z0]};
    const put=(key,np,m,nR)=>{const A=m.geometry.attributes.position.array,pts=new Float32Array(np*3);for(let j=0;j<np;j++){const p=hit(A,i=>(i*np+j)*3,nR);pts[j*3]=p[0];pts[j*3+1]=p[1];pts[j*3+2]=p[2]}bbW(key,np,pts)};
    {const m=LOFTON?loft.DT:T.DT;if(m&&m.visible)put('DTb',LOFTON?LN2:48,m,LOFTON?LA+1:2)}
    ['CSL','CSR'].forEach(k=>{const m=T[k];if(m&&m.visible&&m.userData.loft)put('b'+k,CS_NP,m,CS_NR)});
    ['csL','csR'].forEach(k=>{const m=T[k];if(m&&m.visible&&!m.userData.loft)put('b'+k,32,m,m.geometry.attributes.position.count/32)});
    if(T.ST&&T.ST.visible){const r=T.ST.scale.x*(T.ST.userData.k||1),u=new V3(0,1,0).applyQuaternion(T.ST.quaternion),wl=Math.hypot(u.x,u.y)||1,wx=-u.y/wl,wy=u.x/wl,np=48,pts=new Float32Array(np*3);
      for(let j=0;j<np;j++){const th=j/np*Math.PI*2,c=Math.cos(th),tt=Math.sqrt(Math.max(0,RS*RS-r*r*c*c));pts[j*3]=BBx+u.x*tt+wx*r*c;pts[j*3+1]=BBy+u.y*tt+wy*r*c;pts[j*3+2]=r*Math.sin(th)}
      bbW('STb',np,pts)}}}
{const _an=applyNodes;applyNodes=function(n){const h64=()=>{if(selM==='64'&&n&&n.TTst&&n.TTht&&n.BB&&n.STtop){const dy=n.STtop.y-n.BB.y;if(Math.abs(dy)>1){const t=(n.TTht.y-n.BB.y)/dy;n.TTst={x:n.BB.x+(n.STtop.x-n.BB.x)*t,y:n.TTht.y}}}};try{for(let i=0;i<4;i++){exTT(n);htEq(n);h64()}}catch(e){console.warn('htEq',e)}/* v132：MASTER 64Ti 上管水平——上管在中管端的節點沿座管軸移到與頭管端同高（原 ttSt 40／ttHt 50 的差使上管後端高約 6–9 mm，側視看起來往後上翹） */const r=_an(n);updateWelds();return r}}
renderList();renderForm();applyNodes(stockNodes(GEO[2]));resize();setTab('geo');/* v146：開場旋轉改以「GPU 真正做完的幀」為準。v145 只看 rAF 間隔，中低階手機上 JS 很快、GPU 還在編譯與排隊，動畫在畫面出現前就走完（只看到最後約 10%）。
   做法：用 WebGL2 fenceSync 偵測 GPU 是否追上；連續 10 次 GPU 已閒置才開始（最久等 6 秒）；旋轉時每一步都等上一幀 GPU 完成（若超過 250 ms 未完成則照走），每步推進量上限 100 ms；直接設定相機角度。一碰畫面／按鍵／滾輪即中止；減少動態時不轉。 */
/* v199zzzzzz38：3D 就緒前的毛玻璃＋標誌（#s3dVeil），在開場旋轉開始時（GPU 已追上）淡出 */
(function(){const calm=false;/* v199zzzzzz47：忽略減少動態（使用者 2026-11-16） */let done=false,touched=false;
  const rt=()=>{if(RT0<1e12)return;RT0=performance.now()+2000;setTimeout(()=>{QP.ms=0;QP.n=0;wdN=0},2000)};if(document.readyState==='complete')setTimeout(rt,12000);else window.addEventListener('load',()=>setTimeout(rt,12000));
  const vl=document.getElementById('s3dVeil');let vOff=false,seen=false;const auto=()=>{if(!seen&&window.__scAuto)window.__scAuto();else if(seen&&window.__scWhy)window.__scWhy('開場中有操作，未自動')};const reveal=()=>{if(vOff||!vl)return;vOff=true;window.__tRv=performance.now();vl.classList.add('off');setTimeout(()=>{try{vl.remove()}catch(_){}},900)};setTimeout(reveal,8000);
  ['pointerdown','wheel','keydown'].forEach(e=>window.addEventListener(e,()=>{if(vOff)seen=true;touched=true;reveal()},{capture:true,passive:true}));
  const home=want.th;if(!calm){want.th=home+Math.PI;cam.th=want.th;wk()}
  const gl=renderer.getContext();let fence=null;
  const idle=()=>{if(!gl.fenceSync)return true;if(fence){const r=gl.clientWaitSync(fence,0,0);if(r===gl.TIMEOUT_EXPIRED)return false;gl.deleteSync(fence);fence=null}return true};
  const mark=()=>{if(gl.fenceSync&&!fence){fence=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);gl.flush()}};
  const spin=()=>{if(!done&&!touched&&!calm&&window.__scFold)window.__scFold();reveal();if(done||touched||calm){rt();setTimeout(()=>{if(window.__prew)window.__prew()},1500);if(calm&&!done)auto();return}done=true;const D=2400;let el=0,last=performance.now();
    (function step(now){if(touched){rt();auto();return}
      el+=Math.min(50,Math.max(0,now-last));last=now;const k=Math.min(1,el/D),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;cam.th=want.th=home+Math.PI*(1-e);wk(40);mark();
      if(k<1)requestAnimationFrame(step);else{cam.th=want.th=home;setTimeout(()=>{try{keepPrograms()}catch(_){}},600);setTimeout(()=>{if(window.__prew)window.__prew()},1500);rt();if(!touched)auto()}})(last)};
  const ready=()=>{const t0=performance.now();let n=0,ok=0;
    let lt=t0;const VEIL_MIN=1500,VEIL_AT=2500,fp=(()=>{try{const e=performance.getEntriesByType('paint');const x=e.find(q=>q.name==='first-paint')||e[0];return x?x.startTime:t0}catch(_){return t0}})(),vm=Math.max(fp+VEIL_MIN,VEIL_AT);/* v199zzzzzz51：毛玻璃＋標誌至少停留 1.5 s（另有 0.8 s 淡出） */
    const ri=renderer.info,pc=()=>(ri.programs||[]).length,tc=()=>ri.memory.textures;const R=window.__RDY={t0,n:0,hit:0,max:0,why:'',p0:pc(),t0x:tc(),hP:[0,0],hT:[0,0],hO:[0,0]};let lp=R.p0,lx=R.t0x;const GA=[];/* v199zzzzzz57：就緒＝最近 8 個畫面間隔都 <50 ms，或節奏穩定（最大 <150 ms 且 ≤ 最小 ×1.6）。iplay40H 開場每張約 68 ms、從未 <50 ms，舊條件必等滿 2.5 s 上限 */(function f(now){if(done)return;if(touched){R.why='觸碰';setTimeout(()=>{if(window.__prew)window.__prew()},1500);auto();return}n++;const g=now-lt,cp=pc(),cx=tc();if(n>1){if(g>=50){R.hit++;const b=cp>lp?R.hP:cx>lx?R.hT:R.hO;b[0]++;b[1]+=g}if(g>R.max)R.max=g}lp=cp;lx=cx;R.p1=cp;R.t1x=cx;R.n=n;if(n>1){GA.push(g);if(GA.length>8)GA.shift()}const gx=GA.length?Math.max(...GA):1e9,gn=GA.length?Math.min(...GA):0;ok=(GA.length>=8&&(gx<50||(gx<150&&gx<=1.6*gn)))?8:0;R.med=GA.length?GA.slice().sort((a,b)=>a-b)[GA.length>>1]:0;lt=now;wk(40);if(now<vm){try{window.__wuVeil&&window.__wuVeil(vm)}catch(_){}}/* v199zzzzzz129：毛玻璃期間先預熱 */if(now>=vm&&((ok>=8&&now-t0>300)||now-t0>2500)){R.why=(ok>=8&&now-t0>300)?(gx<50?'通過':'穩定'):'上限';R.t1=now;spin();return}requestAnimationFrame(f)})(t0)};/* v199zzzzzz50：改以畫面間隔判定就緒 */
  if(document.readyState==='complete')ready();else window.addEventListener('load',ready)})();

/* ===== v199zzzzzz40：Live Showcase 第一版（RKL_Live_Showcase_2026-11-14.md §3、§13；範圍＝自動環繞＋通用特寫＋操作即中止）=====
   Base Route：全車環繞 SC_ORBIT ms（每圈 SC_REV ms）→ 依序特寫 SC_NODES（沿用扭力巡檢 focus 的構圖：距離 1.05、仰角 1.3、依左右側取方位）→ 回全車、接回原環繞進度 → 循環。
   自動啟動：開場旋轉完成後，非 slow（TIER≠'lo' 且 !SLOW）、未開減少動態、開場時未被觸碰。執行中 hi↔mid 不中斷；一進 slow（既有執行期偵測）即停並隱藏按鈕。
   任何觸控／滑鼠／滾輪／按鍵（展示鈕本身除外）立即中止，保留當下視角；不因閒置自動恢復，只能按展示鈕恢復。 */
const SC_REV=39130,SC_ORBIT=30000,SC_HOLD=3500,SC_HREV=173913;/* v199zzzzzz102：自旋速度再快 15%（使用者 2026-11-18）：環繞每圈 45000→39130 ms、特寫期間低速續轉每圈 200000→173913 ms（皆 ÷1.15） *//* v199zzzzzz93：特寫節點由 3 個變 8 個，每處停留 5000→3500 ms，一輪由 90 秒收到約 78 秒（使用者 2026-11-18） */
/* v199zzzzzz96：環繞每圈 90→45 秒（使用者 2026-11-18：加快自旋，車架特寫開始才放慢）；特寫期間不再完全靜止，改以 SC_HREV（每圈 200 秒）低速續轉——3.5 秒停留約轉 6.3°，看得出still在動但不搶走特寫。
   接續不打結：scNext 進出特寫都用 nearest(want.th, …) 取最近的等效角，低速漂移量會被吸收；回全車時 to.th 同樣用 nearest 對到 SC.thBase。 */
/* v199zzzzzz93：特寫節點由立零件（stemFace／rd／caliper）改為車架本身（使用者 2026-11-18 第二輪指示第 4 項）。
   SC_NODES 每一項可為：① 字串＝扭力巡檢熱點 id（沿用舊行為）；② 物件 {n:註記, p:取位函式→世界座標 V3 或 null, r/ph/th:構圖覆寫}。
   取位優先用實際貼標網格（scLogo，位置與車款尺寸、放樣後的管面完全一致），貼標未建或未顯示（鈦原色不上標）時退回節點推算（scMix／scNp），特寫照樣成立。
   取不到位置的節點由 scNext 自動跳過。
   順序沿車身走一圈，前段走上緣、後段回下緣，方位與仰角的變化最小：頭管標→上碗組→上管標→中管標→座管束→下管標→BB→後勾爪。
   「中管背後菜單」尚未列入：模型裡沒有這張規格貼紙（貼標只有 dt／tt／cl／hd／or 五個槽位，資料檔 decals.js 只有 LOGO_SRC／LOGO_HD／LOGO_MODELS 三張圖），
   要列入須先建模與貼圖；位置應在 cl（中管標，已在中管後側）與座管束之間，屆時插在 SC_NODES 的第四、五項之間即可。
   方位 th 的慣例：0＝驅動側（+z）、π/2＝車頭正前（+x）、−π/2＝車尾；仰角 ph：π/2＝水平，小＝俯視。 */
function scNp(k){try{return(N&&N[k])?new V3(N[k].x/1000+bike.position.x,N[k].y/1000+bike.position.y,0):null}catch(e){return null}}
function scMix(a,b,t){const p=scNp(a),q=scNp(b);return(p&&q)?p.lerp(q,t==null?.5:t):null}
function scLogo(k){try{if(!logoGrp||!logoGrp.visible)return null;const m=logoGrp.children.find(c=>c.userData&&c.userData.key===k);if(!m||!m.geometry)return null;const g=m.geometry;if(!g.boundingBox)g.computeBoundingBox();const b=g.boundingBox;if(!b||!(b.max.x>=b.min.x))return null;return new V3((b.min.x+b.max.x)/2,(b.min.y+b.max.y)/2,(b.min.z+b.max.z)/2).add(m.position).add(logoGrp.position)}catch(e){return null}}
const SC_NODES=[
  {k:'hd',n:'頭管標',p:()=>scLogo('hd')||scMix('HTt','HTb',.5),r:.40,ph:1.40,th:1.45},
  {k:'bowl',n:'上碗組',p:()=>scNp('HTt'),r:.34,ph:1.62,th:.35},
  {k:'tt',n:'上管標',p:()=>scLogo('tt')||scMix('TTht','TTst',.2),r:.34,ph:.90, th:.40},
  {k:'st',n:'中管標',p:()=>scLogo('cl')||scMix('SSst','BB',.12),r:.24,ph:1.42,th:-.30},
  {k:'clamp',n:'座管束',p:()=>scPosHS('seatClamp')||scNp('STtop'),r:.26,ph:1.20,th:-.45},
  {k:'dt',n:'下管標',p:()=>scLogo('dt')||scMix('BB','DTht',.45),r:.72,ph:.95, th:-.40},
  {k:'bb',n:'BB',p:()=>scNp('BB'),r:.34,ph:1.80,th:1.45},
  {k:'dropout',n:'後勾爪',p:()=>scNp('RA'),r:.45,ph:1.35,th:.90}
];
/* v199zzzzzz41：特寫進出改為補間，時長以大盤示意轉速為節拍：大盤轉 1/8 圈的時間（π/4 ÷ SPIN_W 0.36 rad/s ≈ 2.2 s），緩入緩出；環繞起步 1.5 s 漸加速。
   行動版（≤760px）：展示執行時下方卡片收起；任何觸碰（拉桿本身除外，交給拉桿自己的邏輯）即卡片升到預設高度並暫停。桌機不變。 */
const SC_TR=Math.PI/4/SPIN_W*1000,SC_RAMP=1500,SC_MQ=matchMedia('(max-width:760px)'),SC_MAIN=document.querySelector('main');
const SC={on:false,ph:'orbit',t:0,i:0,thBase:0,last:0,tw:null,folded:false,reHome:0,pre:false,ov:null};
window.__scFold=()=>{if(!SC_MQ.matches||!SC_MAIN||!scOK())return;if(SC_MAIN.dataset.sheet!=='closed'){scSheet('closed');SC.pre=true}};/* v199zzzzzz43：開場旋轉前先收卡片 */
window.__scRz=()=>{if(!SC.on)return false;SC.reHome=performance.now();return true};/* 展示中舞台變動：交給展示重算全車（保留環繞中心） */
function scPosHS(id){const h=HS.find(x=>x.p.id===id);return h?h.g.position.clone():null}
function scPos(d){try{if(typeof d==='string')return scPosHS(d);if(d&&d.p){const v=d.p();return(v&&isFinite(v.x)&&isFinite(v.y)&&isFinite(v.z))?v:null}}catch(e){console.warn('scPos',d&&d.n,e)}return null}/* 字串＝熱點 id；物件＝自訂取位。取不到回 null，由 scNext 跳過 */
function scFocus(pos,o){o=o||{};focus(pos);if(o.r)want.r=o.r;if(o.ph)want.ph=o.ph;if(o.th!=null)want.th=nearest(want.th,o.th)}/* 通用特寫：預設＝扭力巡檢 focus，可逐節點覆寫距離／仰角／方位 */
function scCtr(){/* v199zzzzzz44：精簡版 three 沒有 Box3，改以 8 個角點自算 */try{const lo=[1e9,1e9,1e9],hi=[-1e9,-1e9,-1e9],v=new V3();bike.updateWorldMatrix(true,true);bike.traverseVisible(o=>{if(!o.isMesh||!o.geometry)return;const g=o.geometry;if(!g.boundingBox)g.computeBoundingBox();const bb=g.boundingBox;if(!bb||!(bb.max.x>=bb.min.x))return;for(let k=0;k<8;k++){v.set(k&1?bb.max.x:bb.min.x,k&2?bb.max.y:bb.min.y,k&4?bb.max.z:bb.min.z).applyMatrix4(o.matrixWorld);lo[0]=Math.min(lo[0],v.x);lo[1]=Math.min(lo[1],v.y);lo[2]=Math.min(lo[2],v.z);hi[0]=Math.max(hi[0],v.x);hi[1]=Math.max(hi[1],v.y);hi[2]=Math.max(hi[2],v.z)}});return hi[0]<lo[0]?null:new V3((lo[0]+hi[0])/2,(lo[1]+hi[1])/2,(lo[2]+hi[2])/2)}catch(e){console.warn('scCtr',e);return null}}
function scHome(){const th=want.th;goHome();want.th=th;if(!(AF.rH>0)){const c=scCtr();if(c){want.tgt.x=c.x;want.tgt.z=c.z}}}/* v120b：goHome 已以整車外形中心為旋轉中心 *//* v199zzzzzz42：以整車為中心環繞 */
function scOK(){return !SLOW&&TIER!=='lo'}
const scSnap=()=>({tgt:want.tgt.clone(),r:want.r,th:want.th,ph:want.ph}),scSet=o=>{want.tgt.copy(o.tgt);want.r=o.r;want.th=o.th;want.ph=o.ph};
function scTarget(fn){const a=scSnap();fn();const b=scSnap();scSet(a);return b}
function scGo(to,next){SC.ph='tr';SC.tw={from:scSnap(),to,t:0,next}}
function scToOrbit(){SC.ph='orbit';SC.t=0}
function scBase(){/* v199zzzzzz93：環繞的基準視角。扭力分頁用按下播放時的視角（使用者：自旋路徑與其他分頁相同，只有起始鏡頭角度不同），不走 scHome——該分頁的 home 是 fitR()*TK() 的近距特寫視角，補間過去會變成「先退後再開始轉」。其餘分頁照舊回全車。 */if(tab==='torque'&&SC.ov)return{tgt:SC.ov.tgt.clone(),r:SC.ov.r,th:want.th,ph:SC.ov.ph};return scTarget(scHome)}
function scNext(){let p=null;while(SC.i<SC_NODES.length&&!(p=scPos(SC_NODES[SC.i])))SC.i++;
  if(p){const d=SC_NODES[SC.i],ix=SC.i;SC.i++;scGo(scTarget(()=>scFocus(p,(d&&typeof d==='object')?d:null)),()=>{SC.ph='hold';SC.t=0;scTagSet(ix)})}
  else{scTagSet(null);const to=scBase();to.th=nearest(want.th,SC.thBase);scGo(to,scToOrbit)}}/* v199zzzzzz93：回全車改走 scBase（扭力分頁回按下播放時的視角，不回該分頁的近距 home） */
function scSheet(st){if(!SC_MQ.matches||!SC_MAIN)return;SC_MAIN.dataset.sheet=st;wk()}
function scStop(keep,raise){if(!SC.on)return;SC.on=false;SC.tw=null;scTagSet(null);if(keep){want.tgt.copy(cam.tgt);want.r=cam.r;want.th=cam.th;want.ph=cam.ph}
  if(raise&&SC.folded&&SC_MAIN&&SC_MAIN.dataset.sheet==='closed')scSheet('mid');SC.folded=false;scUI()}
/* v199zzzzzz101：展示的暫停機制——只有「在 3D 畫面內移動（拖曳／雙指平移）或縮放（滾輪／捏合）」才暫停；單點、右側區塊任何動作、鍵盤都不算。SC 為 const，事件早於宣告時會 TDZ，故包 try。 */
function scUser(w,auto){try{if(!auto)AF.uv=1;/* v120e：使用者在 3D 內移動／縮放過＝自訂視角，按播放時從當下視角轉 */if(SC.on){SC.why=w;scStop(true,true);SC.resume=!!auto}else if(!auto)SC.resume=false}catch(_){}}
/* v199zzzzzz105：auto＝true 表示「特色說明／扭力巡檢」這類功能性暫停——關閉該功能時要復位並繼續自旋（scResume）；手動拖曳／縮放（auto 省略）則清掉待續旗標，不自動恢復。 */
function scResume(){try{const r=SC.resume;SC.resume=false;if(SC.on)return;goHome();wk();if(r)scPlay()}catch(_){}}/* v199zzzzzz106：關閉特寫／popup 一律回整車（使用者 2026-11-18）；暫停前在自旋才續播 */
function scPlay(){try{scPlay0()}catch(e){console.warn('scPlay',e);SC.on=false;SC.tw=null;scUI()}}
/* v120e：自訂視角的自旋中心＝畫面（可見 3D 區）中心重新取樣（使用者 2026-11-19）。
   取可見區中心的視線，與「過目前鏡頭目標、垂直視線方向」的平面求交點當新旋轉中心；鏡頭位置不動，只換目標與 r／θ／φ，
   位移固定為 (0, ovPx/2)（AF.hold），新中心即落在可見區中心。回到全車（goHome）解除。 */
function scPivot(){camera.updateMatrixWorld();const v=afVis(),W=CVW||stage.clientWidth,H=CVH||stage.clientHeight,o=camera.position.clone(),
  dir=new V3(v.w/W*1-1,1-v.h/H,.5).unproject(camera).sub(o).normalize(),fw=new V3();camera.getWorldDirection(fw);
  const d=cam.tgt.clone().sub(o).dot(fw)/Math.max(.2,dir.dot(fw)),P=o.clone().addScaledVector(dir,d),rel=o.clone().sub(P),r=Math.max(.3,rel.length());
  cam.tgt.copy(P);cam.r=r;cam.ph=Math.acos(Math.max(-1,Math.min(1,rel.y/r)));cam.th=nearest(cam.th,Math.atan2(rel.x,rel.z));
  want.tgt.copy(P);want.r=r;want.ph=cam.ph;want.th=cam.th;AF.hold=1;offX=0;offY=ovPx/2;wk()}
function scPlay0(){try{window.__featPre&&window.__featPre()}catch(_){}if(!scOK()){SC.why='慢機，未啟動';if(SC.pre){SC.pre=false;scSheet('mid')}return}if(sel)try{closeCard()}catch(_){}
  /* v199zzzzzz96：解除「爆炸圖與展示互斥」（使用者 2026-11-18）。攤開狀態下按播放照樣環繞與特寫：
     環繞基準用按下播放時的視角（SC.ov，已含拆解的拉遠與抬高），特寫節點取位沿用車架節點（scNp 會加上 bike.position，故車架上移後仍對得上）。
     不呼叫 G.exSet(false)，所以攤開狀態在展示期間維持不變。 */SC.pre=false;SC.on=true;SC.i=0;SC.last=performance.now();SC.folded=false;SC.reHome=0;
  if(SC_MQ.matches&&SC_MAIN&&SC_MAIN.dataset.sheet!=='closed'){scSheet('closed');SC.folded=true;SC.reHome=SC.last+450}else if(SC_MQ.matches)SC.folded=true;
  SC.uv=!!AF.uv;if(SC.uv){try{scPivot()}catch(e){console.warn('scPivot',e);SC.uv=false}}
  SC.ov=scSnap();/* v199zzzzzz93：記住起始視角，供扭力分頁的環繞與回全車使用 */
  scTagSet(null);if(tab==='torque'||SC.uv)scToOrbit();else scGo(scTarget(scHome),scToOrbit);/* v120e：自訂視角不回全車，直接從當下視角轉 */
  scUI();wk(40);requestAnimationFrame(scTick)}
function scTick(now){try{scTick0(now)}catch(e){console.warn('scTick',e);SC.on=false;SC.tw=null;scUI()}}
function scTick0(now){if(!SC.on)return;if(!scOK()){SC.why='慢機';scStop(true,true);return}const dt=Math.min(100,Math.max(0,now-SC.last));SC.last=now;SC.t+=dt;spinT=performance.now()+SPIN_HOLD;/* v199zzzzzz42：展示期間示意旋轉持續 */
  if(SC.reHome&&now>=SC.reHome+150){if(tab==='torque'||SC.uv)SC.reHome=0;/* v199zzzzzz93：扭力分頁的環繞視角沿用起始視角，不隨卡片收起重算 */else if(SC.ph==='orbit'||SC.ph==='tr'&&SC.tw&&SC.tw.next===scToOrbit){SC.reHome=0;scGo(scTarget(scHome),scToOrbit)}}/* 卡片收起後舞台變高，重算全車距離 */
  if(SC.ph==='tr'&&SC.tw){const w=SC.tw;w.t+=dt;const k=Math.min(1,w.t/SC_TR),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
    want.tgt.lerpVectors(w.from.tgt,w.to.tgt,e);want.r=w.from.r+(w.to.r-w.from.r)*e;want.th=w.from.th+(w.to.th-w.from.th)*e;want.ph=w.from.ph+(w.to.ph-w.from.ph)*e;
    if(k>=1){SC.tw=null;w.next()}}
  else if(SC.ph==='orbit'){want.th+=2*Math.PI*dt/SC_REV*Math.min(1,SC.t/SC_RAMP);if(SC.t>=SC_ORBIT&&tab==='torque'){SC.thBase=want.th;SC.i=0;scNext()}/* v199zzzzzz102：尺寸幾何、客製服務兩分頁只單純自旋，不進車架特寫；特寫只在整車組裝分頁 */}
  else if(SC.ph==='hold'){want.th+=2*Math.PI*dt/SC_HREV;/* v199zzzzzz96：特寫期間低速續轉 */if(SC.t>=SC_HOLD)scNext()}
  wk(40);requestAnimationFrame(scTick)}
/* v199zzzzzz96：特寫節點名稱小卡（使用者 2026-11-18）。停留（hold）與進入該節點的補間（tr→hold）期間顯示，回全車或離開展示即隱藏。
   取名：物件節點用 n；字串節點（扭力熱點 id）用該零件名稱。樣式比照 #tip 的卡片底色，另加毛玻璃，置於舞台下緣中央、不吃點擊。 */
const scTag=document.createElement('div');scTag.id='scTag';scTag.setAttribute('aria-hidden','true');stage.appendChild(scTag);
{const stl=document.createElement('style');stl.textContent='#scTag{position:absolute;left:50%;top:56px;transform:translate(-50%,-6px);pointer-events:none;z-index:6;display:flex;align-items:center;gap:8px;background:color-mix(in srgb,var(--surface-card) 82%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:var(--text-strong);border:1px solid var(--border-soft);border-radius:999px;padding:8px 18px;font-size:var(--fs-md);font-weight:600;letter-spacing:.04em;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.12);opacity:0;transition:opacity .35s ease,transform .35s ease}#scTag::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}#scTag[data-on="1"]{opacity:1;transform:translate(-50%,0)}#scTag.rt{transform:translate(0,-6px)}#scTag.rt[data-on="1"]{transform:none}';document.head.appendChild(stl)}
function scName(d){if(typeof d==='string'){const h=HS.find(x=>x.p.id===d);return h?h.p.name:''}return(d&&d.n)||''}
/* v199zzzzzz100：特寫說明區（#scInfo）。圖與字全為佔位，之後以 SC_INFO[節點名] 換成實景照（img 網址）與正式文案。
   欄位：sub＝一行副標、img＝照片網址（空＝內建佔位圖）、body＝段落陣列。 */
/* v199zzzzzz110：鍵改為穩定代碼（與 SC_NODES.k、img/feat/<k>.webp 一致），改節點中文名不會孤立資料。 */
const SC_INFO={
  hd:{sub:'頭管・品牌標示',body:['（假文）頭管是前叉與車架的交會處，品牌標示置於此處。此段落為佔位文字，正式說明待補。','（假文）可放材質、焊接工法、標示製程等說明；每段約兩到三行。']},
  bowl:{sub:'頭碗組・上碗',body:['（假文）上碗組承接轉向軸並與頭管內壁配合。此段落為佔位文字。','（假文）可放軸承規格、預壓調整與維護週期。']},
  tt:{sub:'上管・標示',body:['（假文）上管標示位於上管側面。此段落為佔位文字。','（假文）可放管材斷面、壁厚與焊道處理說明。']},
  st:{sub:'中管・標示',body:['（假文）中管標示位於座管側面。此段落為佔位文字。','（假文）可放座管尺寸與車架編號說明。']},
  clamp:{sub:'座管束環',body:['（假文）座管束環固定座管高度。此段落為佔位文字。','（假文）可放鎖附扭力、材質與顏色選項。']},
  dt:{sub:'下管・標示',body:['（假文）下管標示位於下管側面。此段落為佔位文字。','（假文）可放水壺架孔位與管材說明。']},
  bb:{sub:'五通',body:['（假文）五通承接曲柄軸承並連接下管、中管與後下叉。此段落為佔位文字。','（假文）可放軸承規格、安裝扭力與防水處理。']},
  dropout:{sub:'後勾爪',body:['（假文）後勾爪固定後輪貫通軸與變速吊耳。此段落為佔位文字。','（假文）可放勾爪規格、軸距與鈦件加工說明。']}
};
const scI={box:document.getElementById('scInfo'),img:document.getElementById('scImg'),cap:document.getElementById('scCap'),h:document.getElementById('scTitle'),sub:document.getElementById('scSub'),body:document.getElementById('scBody')};
const scPh=n=>'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8d2c4"/><stop offset="1" stop-color="#a9a193"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><path d="M0 0L600 600M600 0L0 600" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><rect x="170" y="250" width="260" height="100" rx="14" fill="#000" fill-opacity=".35"/><text x="300" y="300" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#fff">實景照片 1:1（佔位）</text><text x="300" y="334" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#fff" fill-opacity=".85">'+String(n).replace(/[<&]/g,'')+'</text></svg>');
/* v199zzzzzz107：照片網址相對文件位址（Pages、Artifact 皆同）；載入失敗退回內建佔位圖。scPhoto 回傳圖說，並設 img.src／onerror。 */
const SC_FH=(document.querySelector('meta[name="vibe-feat"]')||{}).content||'';/* v110（C1）：feat.json＋img/feat/* 的內容雜湊，由 tools/stamp.mjs 寫入 index.html；換照片或改文案後重跑 stamp 即帶新網址 */
function scImgUrl(u){try{const h=new URL(u,document.baseURI).href;return SC_FH&&h.indexOf('?')<0?h+'?h='+SC_FH:h}catch(_){return u}}
const scKey=d=>(d&&typeof d==='object'&&d.k)||scName(d);
/* v110（C3）：feat.json 的 sub／body 可為字串／陣列（僅中文）或 {tw,en}（雙語）。EN 模式 en 缺值＝退回中文並標 data-noi18n，不讓詞庫對正式文案做子字串替換。 */
function scL(v){const en=!!(window.RKL_LANG&&RKL_LANG.get()==='en');if(v&&typeof v==='object'&&!Array.isArray(v)){const e=v.en;if(en&&e!=null&&e!==''&&!(Array.isArray(e)&&!e.length))return{t:e,fb:false};return{t:v.tw!=null?v.tw:(Array.isArray(e)?[]:''),fb:en}}return{t:v,fb:false}}
/* v199zzzzzz123：照片欄位 img 可為「網址」「網址陣列（多張，點圖換下一張、循環）」或「依車款的物件 {'64':…,'325':…,'*':預設}」（值同樣可為網址或陣列）。依車款取到＝實景照片；落到 '*'＝佔位。上管標、下管標照片依車款（使用者 2026-11-20）。 */
function phRes(f){const v=f&&f.img,arr=x=>typeof x==='string'?[x]:Array.isArray(x)?x.filter(s=>typeof s==='string'):[];if(v&&typeof v==='object'&&!Array.isArray(v)){if(v[selM])return{L:arr(v[selM]),ph:false};return{L:arr(v['*']),ph:true}}return{L:arr(v),ph:!!(f&&f.ph)}}
function phCycle(im,L){im.dataset.k='0';if(L&&L.length>1){im.style.cursor='pointer';im.onclick=e=>{e.stopPropagation();const k=((+im.dataset.k||0)+1)%L.length;im.dataset.k=String(k);delete im.dataset.r;im.src=scImgUrl(L[k])}}else{im.style.cursor='';im.onclick=null}}
function scPhoto(f,im,cap,n){const r=phRes(f),ok=r.L.length>0;delete im.dataset.r;im.onerror=()=>{if(!im.dataset.r&&/\?h=/.test(im.src)){im.dataset.r='1';im.src=im.src.replace(/\?h=[^&#]*/,'');return}im.onerror=null;im.src=scPh(n);if(cap)cap.textContent='實景參照（佔位）'};im.src=ok?scImgUrl(r.L[0]):scPh(n);phCycle(im,ok?r.L:null);return ok&&!r.ph?'實景照片':'實景參照（佔位）'}
function scInfoSet(i){if(!scI.box)return;const d=i==null?null:SC_NODES[i],n=d?scName(d):'',show=!!n&&tab==='torque';
  if(show){const f=SC_INFO[scKey(d)]||{sub:'',body:['（假文）此處放詳細說明。']},sb=scL(f.sub),bd=scL(f.body),ba=Array.isArray(bd.t)?bd.t:[];scI.cap.textContent=scPhoto(f,scI.img,scI.cap,n);scI.h.textContent=n;scI.sub.textContent=sb.t||'';if(sb.fb)scI.sub.setAttribute('data-noi18n','');else scI.sub.removeAttribute('data-noi18n');scI.body.innerHTML=ba.map(t=>'<p></p>').join('');scI.body.querySelectorAll('p').forEach((p,k)=>{p.textContent=ba[k];if(bd.fb)p.setAttribute('data-noi18n','')})}
  scInfoNode=show?i:null;asideSync()}
function scTagSet(i){const t=i==null?'':scName(SC_NODES[i]);if(t&&scTag.textContent!==t)scTag.textContent=t;scTag.dataset.on=t?'1':'0';scInfoSet(i)}
/* v199zzzzzz103：整車組裝右側「特色說明」區塊（使用者 2026-11-18）。位置在「整車拆解」之下、「扭力巡檢」之上。
   內容＝自旋時車架特寫的八個節點（SC_NODES），每項一張縮圖＋標題＋副標；點開展開 1:1 照片與簡介，同時 3D 跳到該特寫節點（同加購套件的做法）。
   再點同一項＝收起並回整車。照片與文案取自 SC_INFO[節點名]（img、sub、body）；img 空白時顯示佔位圖。
   跳轉不經展示補間：直接 scFocus（與展示特寫同構圖參數）；展示執行中會先暫停。 */
(function featInit(){const box=document.getElementById('featList');if(!box)return;let cur=-1;const R=[];
  /* v199zzzzzz104：版面與下方「扭力巡檢」清單一致（.plist），平時全部收折，點選才在該列下方展開 1:1 照片與簡介。
     v199zzzzzz107：文案與照片改由 data/feat.json＋img/feat/*.webp 供應（一組，八個節點共用，不分車款）；載入失敗或離線單檔時沿用程式內建 SC_INFO 假文。 */
  function applyRow(i){cur=i;R.forEach((r,k)=>{const on=k===i;r.b.setAttribute('aria-expanded',on?'true':'false');r.body.hidden=!on;r.w.classList.toggle('on',on);r.dot.classList.toggle('ok',on)})}/* v199zzzzzz109：只更新列的展開外觀，不動 3D（B3） */
  function build(keep){const was=keep===true?cur:-1;box.innerHTML='';R.length=0;cur=-1;
  SC_NODES.forEach((d,i)=>{const n=scName(d),f=SC_INFO[scKey(d)]||{sub:'',body:['（假文）此處放詳細說明。']},sb=scL(f.sub),bd=scL(f.body);
    const li=document.createElement('li');li.className='feat';
    const b=document.createElement('button');b.type='button';b.className='feat-h';b.setAttribute('aria-expanded','false');
    const dot=document.createElement('span');dot.className='dot';const nm=document.createElement('span');nm.textContent=n;/* v199zzzzzz130（A3）：右欄副標與名稱重複，刪除 */
    b.append(dot,nm);
    const body=document.createElement('div');body.className='feat-b';body.hidden=true;
    const fg=document.createElement('figure');const im=document.createElement('img');im.alt=n;im.width=600;im.height=600;im.loading='lazy';
    const fc=document.createElement('figcaption');fc.textContent=scPhoto(f,im,fc,n);fg.append(im,fc);
    const tx=document.createElement('div');tx.className='feat-x';(Array.isArray(bd.t)?bd.t:[]).forEach(x=>{const p=document.createElement('p');p.textContent=x;if(bd.fb)p.setAttribute('data-noi18n','');tx.appendChild(p)});
    body.append(fg,tx);li.append(b,body);box.appendChild(li);R.push({w:li,b,body,dot});
    b.onclick=()=>featSel(cur===i?-1:i)});if(was>=0&&was<R.length)applyRow(was)}
  build();
  function featSel(i){if(i>=0&&!FOLD.feat&&window.__fold)window.__fold('feat',true);if(i>=0){const d=SC_NODES[i],p=scPos(d);if(!p){console.warn('特色說明：取不到節點位置',scName(d));return}scUser('特色說明',true);scFocus(p,(d&&typeof d==='object')?d:null);wk()}
    else{scUser('特色說明',true);goHome();wk()}
    applyRow(i);
    if(i>=0)try{R[i].w.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(_){}else scResume()/* v199zzzzzz105：收起＝回整車並繼續自旋 */}
  window.__featSel=featSel;window.__featCur=()=>cur;
  /* v199zzzzzz130（B2）：特色節點在 3D 顯示藍點（形式同扭力橘點：核心＋脈動光環＋透明點擊球）。清單展開且在整車組裝分頁才顯示；選取某點時只留該點（同 v99 橘點規則）。位置每幀取 scPos（隨車款、尺寸、拆解移動）。 */
  const FD=[],FDC=0x3D8BFF,FDC_D=0x6FA8FF;SC_NODES.forEach((d,i)=>{const g=new THREE.Group();g.visible=false;scene.add(g);
    const core=new THREE.Mesh(coreGeo,new THREE.MeshBasicMaterial({color:FDC,depthTest:false,transparent:true,toneMapped:false})),halo=new THREE.Mesh(haloGeo,new THREE.MeshBasicMaterial({color:FDC,depthTest:false,transparent:true,side:THREE.DoubleSide,toneMapped:false})),hit=new THREE.Mesh(hitGeo,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
    core.renderOrder=halo.renderOrder=10;hit.userData.fi=i;g.add(core,halo,hit);FD.push({g,core,halo,hit,ph:i*.9})});
  window.__fdTick=t=>{const on=tab==='torque'&&FOLD.feat,c=isDark()?FDC_D:FDC;FD.forEach((f,i)=>{const v=on&&(cur<0||cur===i);let p=null;if(v){p=scPos(SC_NODES[i])}f.g.visible=!!(v&&p);if(!f.g.visible)return;f.g.position.copy(p);f.core.material.color.setHex(c);f.halo.material.color.setHex(c);f.halo.visible=cur===i;f.halo.lookAt(camera.position);f.halo.scale.setScalar(1+.35*Math.sin(t*3+f.ph));f.g.scale.setScalar(Math.max(.55,Math.min(1.4,cam.r/2.5))*(window.innerWidth<=760?(cur===i?3:2):1))})};
  window.__fdPick=e=>{const L=FD.filter(f=>f.g.visible).map(f=>f.hit);if(!L.length)return -1;const r=renderer.domElement.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,camera);const h=ray.intersectObjects(L);return h.length?h[0].object.userData.fi:-1};
  /* 兩大項收折鈕 */
  const fold=(k,on)=>{FOLD[k]=on;const b=document.getElementById(k==='feat'?'featFoldB':'tqFoldB'),bx=document.getElementById(k==='feat'?'featFold':'tqFold');if(b)b.setAttribute('aria-expanded',on?'true':'false');if(bx)bx.hidden=!on;
    if(!on){if(k==='feat'&&cur>=0)featSel(-1);if(k==='tq'&&sel){closeCard();try{scResume()}catch(_){}}}try{paintHS()}catch(_){}wk()};
  window.__fold=fold;
  [['feat','featFoldB'],['tq','tqFoldB']].forEach(([k,id])=>{const b=document.getElementById(id);if(b)b.onclick=()=>fold(k,!FOLD[k])});
  /* v199zzzzzz107：載入 data/feat.json（相對文件位址，同 bgm/）。欄位：sub、body[]、img（相對路徑）、ph（true＝佔位圖，換真照片時改 false 或刪掉）。 */
  try{const u0=new URL('data/feat.json',document.baseURI).href;/* v110（C1）帶內容雜湊避開快取；若主機不接受查詢字串則退回原網址 */fetch(SC_FH?u0+'?h='+SC_FH:u0).then(r=>r.ok?r:fetch(u0)).then(r=>r.ok?r.json():null).then(j=>{if(!j||typeof j!=='object')return;const ok=new Set(SC_NODES.map(scKey));Object.keys(j).forEach(k=>{if(!ok.has(k)){console.warn('feat.json：app 不認得的鍵「'+k+'」，已略過。有效鍵：'+[...ok].join('、'));return}if(j[k]&&typeof j[k]==='object')SC_INFO[k]=Object.assign({},SC_INFO[k],j[k])});build(true)}).catch(e=>console.warn('feat.json 未載入，沿用內建文案',e))}catch(_){}
  const lh=window.__langHook;window.__langHook=l=>{if(typeof lh==='function')lh(l);try{build(true);if(scInfoNode!=null)scInfoSet(scInfoNode)}catch(_){}}/* v110（C3）：切語言即重繪特色說明（雙語欄位依語言取值） */
  /* 展示開始時預載八張（只在播放展示時；平常照片只在展開時才載） */
  window.__featPre=()=>{SC_NODES.forEach(d=>{const f=SC_INFO[scKey(d)],L=f?phRes(f).L:[];if(L.length){const i=new Image();i.src=scImgUrl(L[0])}})};window.__featRe=()=>{build(true);if(scInfoNode!=null)scInfoSet(scInfoNode)}/* v199zzzzzz123：換車款重繪（照片依車款） */})();
const scBtn=document.createElement('button');scBtn.id='scBtn';scBtn.type='button';scBtn.className='btn';
scBtn.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path class="sc-pl" d="M8 5.5v13l10.5-6.5z" fill="currentColor"/><g class="sc-pa" fill="currentColor"><rect x="6.5" y="5.5" width="4" height="13" rx="1"/><rect x="13.5" y="5.5" width="4" height="13" rx="1"/></g></svg>';
stage.appendChild(scBtn);
function scUI(){SPIN_SC=SC.on;/* v199zzzzzz93：示意旋轉用的展示旗標；play／stop 兩條路徑末端都會到這裡 */scBtn.hidden=!scOK();scBtn.dataset.on=SC.on?'1':'0';scBtn.setAttribute('aria-label',SC.on?'暫停展示':'播放展示');scBtn.title=SC.on?'暫停展示':'播放展示'}
function scPlace(){const rb=document.getElementById('reset');if(!rb)return;let a=rb.getBoundingClientRect();const b=stage.getBoundingClientRect();if(!a.width){scBtn.style.visibility='hidden';return}
  /* v199zzzzzz134（使用者 2026-11-20，行動版）：圓鈕群組右緣對齊底部卡片右緣 */{const ar0=innerWidth<=760?document.querySelector('aside')?.getBoundingClientRect():null;if(ar0&&ar0.width){const dx=ar0.right-a.right;if(Math.abs(dx)>.5){const sb=getComputedStyle(rb).position==='static'?rb.parentElement:rb;sb.style.right=((parseFloat(getComputedStyle(sb).right)||0)-dx)+'px';a=rb.getBoundingClientRect()}}else{let ch=0;[rb,rb.parentElement].forEach(e=>{if(e&&e.style.right){e.style.right='';ch=1}});if(ch)a=rb.getBoundingClientRect()}}
  const cs=getComputedStyle(rb);scBtn.style.visibility='';const vt=innerWidth>760,st=a.height+8;/* v199zzzzzz71：桌機三顆圓鈕改垂直（回到全車在下、播放、音樂在最上），避免與主分頁膠囊干涉；行動版維持水平 */Object.assign(scBtn.style,{width:a.width+'px',height:a.height+'px',left:(a.left-b.left-(vt?0:st))+'px',top:(a.top-b.top-(vt?st:0))+'px',borderRadius:cs.borderRadius});/* v199zzzzzz130：底色改由 CSS（.vb 立體樣式）統一，不再複製回到全車鈕的底色 *//* 字色不跟回到全車鈕（它處理中會轉黃）；v199zzzzzz64：音樂鈕在播放鈕左側（播放鈕隱藏時貼回到全車鈕），樣式同兩顆圓鈕 */const mw=document.getElementById('bgmW');if(mw){const k=scBtn.hidden?1:2;Object.assign(mw.style,{width:a.width+'px',height:a.height+'px',left:(a.left-b.left-(vt?0:k*st))+'px',top:(a.top-b.top-(vt?k*st:0))+'px'});const mb=mw.querySelector('button');if(mb)Object.assign(mb.style,{background:'transparent',borderRadius:cs.borderRadius})}
  /* v199zzzzzz130（B3＋桌機右側直列，使用者 2026-11-20；僅桌機 >760px）：
     ①主分頁膠囊直排（中文字直立、英文轉 90° 並用短標籤），上緣與右側卡片上緣齊平，與圓鈕同一中線；
     ②明暗、語言鈕改直排，疊在音樂鈕上方（由下往上：音樂→語言→明暗；使用者 2026-11-20 兩者互換，間距同圓鈕 8 px）；
     ③FPS／ms 移到 3D 左下角。
     頁首元素改 position:fixed，座標由此處依 #reset 與舞台位置寫入；行動版清除行內樣式、回到原本頁首排版。分頁膠囊下緣若會碰到明暗／語言鈕（舞台太矮），退回原本底部中央橫排。 */
  {const dk=vt,R=document.documentElement,lg=document.getElementById('langSeg'),th=document.getElementById('themeBtn'),qs=document.getElementById('qpStat'),tb=stage.querySelector('#stBar .tabs'),clr=e=>{if(e){e.style.left=e.style.top=e.style.bottom=e.style.right=e.style.transform=''}};
    R.classList.toggle('dkv',dk);R.classList.toggle('mbv',!dk);if(dk){const P=document.getElementById('mPop');if(P)P.hidden=true}
    /* v199zzzzzz130（使用者 2026-11-20）：桌機把卡片頂端的車款選擇（車款標 SVG）與尺寸鈕移到 3D 頂部品牌標誌下方，取代車款・尺寸膠囊（#stTag）。
       直接搬移原節點（事件與 renderGeo 照舊），排成一列；舞台不夠寬時尺寸鈕自動換到車款列下方（flex-wrap）。行動版搬回卡片原位。 */
    {let S=document.getElementById('mStrip');const mc=document.getElementById('modelChips'),sz=document.getElementById('sizeChips');
      if(!S){S=document.createElement('div');S.id='mStrip';S.hidden=true;stage.appendChild(S);
        /* 只顯示選中車款；左右滑動／觸控板橫滑／←→／兩側箭頭切換（循環），方向寫入 data-dir 供滑入動畫 */
        const W=document.createElement('div');W.className='ms-m';W.setAttribute('role','group');W.setAttribute('aria-label','車款（左右滑動切換）');W.tabIndex=0;
        const EG=document.createElement('div');EG.className='ms-egg';EG.setAttribute('aria-hidden','true');S.append(W,EG);W.title='點選或左右滑動切換車款';{const P=document.createElement('div');P.id='mPop';P.hidden=true;P.setAttribute('data-noi18n','');P.setAttribute('role','dialog');stage.appendChild(P);EG.setAttribute('role','button');EG.tabIndex=0;EG.title='車款簡介';
          /* v199zzzzzz137（使用者 2026-11-20，行動版）：點彩蛋跳出車款簡介；點其他地方關閉 */
          const tog=e=>{if(innerWidth>760)return;e.stopPropagation();e.preventDefault();if(!P.hidden){P.hidden=true;return}mPopFill();const r=S.getBoundingClientRect(),q=stage.getBoundingClientRect();P.style.top=Math.round(r.bottom-q.top+6)+'px';P.hidden=false;P.style.left=Math.round(Math.max(8,(innerWidth-P.offsetWidth)/2-q.left))+'px'};/* v199zzzzzz138：卡片水平置中於頁面（使用者 2026-11-20） */
          EG.addEventListener('click',tog);EG.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')tog(e)});addEventListener('pointerdown',e=>{if(!P.hidden&&!P.contains(e.target)&&e.target!==EG)P.hidden=true},true)}/* v199zzzzzz133（B2）：換款提示 */
        {const IN=document.createElement('p');IN.id='mIntro';IN.hidden=true;IN.setAttribute('data-noi18n','');stage.appendChild(IN)}/* 車款簡介（底部置中，文字直接壓在 3D 上） */
        S.insertBefore(W,EG);/* 車款標在上、彩蛋在下 *//* v199zzzzzz130：取消左右箭頭（使用者 2026-11-20）；點車款標＝下一款 */
        const go=d=>{const m=document.getElementById('modelChips');if(!m)return;const L=[...m.querySelectorAll('.chip')],i=L.findIndex(c=>c.getAttribute('aria-pressed')==='true');if(L.length<2)return;S.dataset.dir=d>0?'l':'r';clearTimeout(S._dt);S._dt=setTimeout(()=>{delete S.dataset.dir},400);/* 只在切換當下播滑入，換尺寸等重繪不再播 */S._prog=1;try{L[((i<0?0:i)+d+L.length)%L.length].click()}finally{S._prog=0}};
        /* 點選中的車款標＝下一款；點選中的尺寸＝下一個尺寸（循環）。拖曳後的點擊不算 */
        const nextSize=()=>{const z=document.getElementById('sizeChips');if(!z)return;const L=[...z.querySelectorAll('.chip')],i=L.findIndex(c=>c.getAttribute('aria-pressed')==='true');if(L.length<2)return;S._prog=1;try{L[((i<0?0:i)+1)%L.length].click()}finally{S._prog=0}};
        S.addEventListener('click',e=>{if(S._prog)return;const c=e.target.closest&&e.target.closest('.chip');if(!c)return;e.stopPropagation();e.preventDefault();if(moved){moved=false;return}if(c.closest('#modelChips'))go(1);else if(c.closest('#sizeChips'))nextSize()},true);
        W.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){go(-1);e.preventDefault()}else if(e.key==='ArrowRight'){go(1);e.preventDefault()}});
        let x0=null,moved=false;W.addEventListener('pointerdown',e=>{x0=e.clientX;moved=false;W.classList.add('drag')});/* 不用 pointer capture（會把 click 目標改成容器，點車款標就換不了下一款）；移動與放開改在 window 上追 */
        addEventListener('pointermove',e=>{if(x0!==null&&Math.abs(e.clientX-x0)>6)moved=true});
        const up=e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;W.classList.remove('drag');if(Math.abs(dx)>30)go(dx<0?1:-1)};addEventListener('pointerup',up);addEventListener('pointercancel',()=>{x0=null;W.classList.remove('drag')});
        
        let acc=0,cool=0;S.addEventListener('wheel',e=>{e.stopPropagation();e.preventDefault();if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;const n=performance.now();if(n<cool)return;acc+=e.deltaX;if(Math.abs(acc)>50){go(acc>0?1:-1);acc=0;cool=n+450}},{passive:false})}
      if(mc&&sz){if(dk){if(mc.parentNode!==S.querySelector('.ms-m')){const W=S.querySelector('.ms-m');W.appendChild(mc)}if(S.contains(sz))document.getElementById('sizeH').after(sz);/* v199zzzzzz130：尺寸改回右側卡片（使用者 2026-11-20） */mInfo();S.hidden=false;const lo=document.querySelector('header .logo'),lr=lo?lo.getBoundingClientRect():null,lim=document.querySelector('aside'),ar=lim?lim.getBoundingClientRect():null,rgt=ar&&ar.width&&ar.left<b.right?ar.left:b.right;
          S.style.maxWidth=Math.max(240,Math.round((rgt-b.left)-2*64))+'px';S.style.left=Math.round((b.left+rgt)/2-b.left)+'px';S.style.top=Math.round((lr&&lr.height?lr.bottom-b.top:40)+18)+'px';/* 標誌與車款標間隙 6→18 px */
          /* 車子垂直置中於「頂部車款列（車款標＋彩蛋）下緣」到「底部簡介上緣」之間：AF.top／AF.bot（afVis／afFix／frameR 使用） */
          {const IN=document.getElementById('mIntro');if(IN){IN.hidden=false;const w=Math.min(560,Math.round((rgt-b.left)-2*72));IN.style.width=w+'px';IN.style.left=Math.round((b.left+rgt)/2-b.left-w/2)+'px';IN.style.bottom='16px';IN.style.minHeight=introMinH(w)+'px'}
           const zr=S.getBoundingClientRect(),tp=zr.height?Math.round(zr.bottom-b.top+10):0,ir=IN?IN.getBoundingClientRect():null,bt=ir&&ir.height&&b.height>=620?Math.round(b.bottom-ir.top+10):0;/* v199zzzzzz133（B3，使用者 2026-11-20）：舞台高 <620 px 時不讓位給簡介，文字可壓在車上 */
           if(Math.abs(tp-(AF.top||0))>1||Math.abs(bt-(AF.bot||0))>1){AF.top=tp;AF.bot=bt;afTopChanged()}}}
        else{if(AF.top||AF.bot){AF.top=0;AF.bot=0;afTopChanged()}/* v199zzzzzz134（使用者 2026-11-20）：行動版取消車款・尺寸膠囊，車款標＋彩蛋放品牌標誌下方（左緣對齊標誌）；尺寸留在底部卡片；不讓位（AF.top＝0） */
          if(mc.parentNode!==S.querySelector('.ms-m'))S.querySelector('.ms-m').appendChild(mc);if(S.contains(sz))document.getElementById('sizeH').after(sz);mInfo();S.hidden=false;const lo=document.querySelector('header .logo'),lr=lo?lo.getBoundingClientRect():null;S.style.maxWidth='';S.style.left=Math.round(lr&&lr.width?lr.left+lr.width/2-b.left-S.offsetWidth/2:6)+'px';/* v199zzzzzz149：車款標＋彩蛋水平置中於品牌標（原為左緣 −10 px，寬螢幕偏左可達 16 px） */S.style.top=Math.round(lr&&lr.height?Math.max(4,lr.bottom-b.top+16):8)+'px'}}}/* v199zzzzzz134b：標誌與車款標間距 6→16 px */
    if(!dk){if(tb){tb.classList.remove('vtabs');clr(tb)}
      /* v199zzzzzz134（使用者 2026-11-20，行動版）：明暗、語言移到音樂鈕左側，五顆一列（明暗→語言→音樂→播放→回到全車），右緣對齊卡片；FPS 移右上角；簡介只在寬 ≥600 px（平板、Fold5 內螢幕）顯示於左下角、靠左 */
      const k=scBtn.hidden?1:2,cy=a.top+a.height/2;let x=a.left-k*st;
      [lg,th].forEach(e=>{if(!e)return;const h=e.offsetHeight,w=e.offsetWidth;x-=8+w;Object.assign(e.style,{left:Math.round(x)+'px',top:Math.round(cy-h/2)+'px'})});
      if(qs){const lo=document.querySelector('header .logo'),lr=lo?lo.getBoundingClientRect():null,h=qs.offsetHeight,w=qs.offsetWidth;Object.assign(qs.style,{left:Math.round(innerWidth-12-w)+'px',top:Math.round(lr&&lr.height?lr.top+lr.height/2-h/2:8)+'px'})}
      {const IN=document.getElementById('mIntro');if(IN)IN.hidden=true}/* v199zzzzzz137（使用者 2026-11-20）：行動版取消簡介，改為點彩蛋跳出 #mPop */}
    else{const k=scBtn.hidden?1:2,cx=a.left+a.width/2;let y=a.top-k*st;/* 音樂鈕上緣（視窗座標） */
      [lg,th].forEach(e=>{if(!e)return;const h=e.offsetHeight,w=e.offsetWidth;y-=8+h;Object.assign(e.style,{left:Math.round(cx-w/2)+'px',top:Math.round(y)+'px'})});
      if(qs){const h=qs.offsetHeight;Object.assign(qs.style,{left:Math.round(b.left+14)+'px',top:Math.round(b.bottom-12-h)+'px'})}
      if(tb){tb.classList.add('vtabs');const as=document.querySelector('aside'),ar=as?as.getBoundingClientRect():null,ty=(ar&&ar.height?ar.top:b.top+12)-b.top,h=tb.offsetHeight,w=tb.offsetWidth;
        if(ty+h>y-b.top-16){tb.classList.remove('vtabs');clr(tb)}else Object.assign(tb.style,{left:Math.round(cx-b.left-w/2)+'px',top:Math.round(ty)+'px',bottom:'auto',transform:'none'})}}}
  /* v199zzzzzz97：特寫小卡改放在車款膠囊（#stTag）正下方（使用者 2026-11-18：v96 放舞台下緣，混在主分頁膠囊旁看不出來）。
     桌機與膠囊同一條中線；行動版與膠囊左緣對齊。 */
  {const ms=document.getElementById('mStrip'),t=(ms&&!ms.hidden)?ms:document.getElementById('stTag'),q=t&&!t.hidden?t.getBoundingClientRect():null,y=q&&q.height?q.bottom-b.top+8:56;/* v199zzzzzz130：桌機改接在頂部車款列下方 */scTag.style.top=Math.round(y)+'px';
   if(q&&q.width&&!vt){scTag.classList.add('rt');scTag.style.right='auto';scTag.style.left=Math.round(q.left-b.left)+'px'}
   else{scTag.classList.remove('rt');scTag.style.right='auto';scTag.style.left=Math.round(q&&q.width?(q.left+q.right)/2-b.left:b.width/2)+'px'}}}
new ResizeObserver(scPlace).observe(stage);window.addEventListener('resize',scPlace);{const lh=window.__langHook;window.__langHook=l=>{if(typeof lh==='function')lh(l);try{mInfo();scPlace()}catch(_){}}}/* v199zzzzzz130：切語言後膠囊長度改變，重新定位 */setTimeout(scPlace,0);setInterval(()=>{if(scBtn.hidden!==!scOK())scUI();scPlace()},1000);
scBtn.addEventListener('click',()=>{if(SC.on){SC.why='按鈕';scStop(true,true)}else{SC.why='按鈕';scPlay()}});
['pointerdown','wheel','keydown'].forEach(e=>window.addEventListener(e,ev=>{const t=ev.target&&ev.target.closest?ev.target:null;if(t&&t.closest('#scBtn,#bgmW'))return;const g=!!(t&&t.closest('.gb'));if(!SC.on&&SC.pre){SC.pre=false;if(!g)scSheet('mid')}/* v199zzzzzz101：這裡不再停展示（使用者 2026-11-18）；暫停改由 3D 內真的拖曳／縮放觸發（scUser），單點、右側區塊、鍵盤皆不算 */void g},{capture:true,passive:true}));
window.__scAuto=()=>{const calm=false;SC.why=calm?'減少動態，未自動':'自動';if(!calm)scPlay()};
window.__STUd={cam,want,camera,renderer,scene,drawFrame,rcShot,rcCard,AF,applyCam,goHome};/* v120：AF／applyCam／goHome 供置中測試穩態量測 *//* v199zzzzzz112：測試探針（app.js 為封閉範圍）。tools/tests_session/t_v112_studio.py 以 Object.assign(window,__STUd) 取用 */window.__SCd={info:scInfoSet,S:SC,stop:()=>scStop(true,false),play:scPlay,hs:id=>{const h=HS.find(x=>x.p.id===id);return h?[+(h.g.position.x*1000).toFixed(1),+(h.g.position.y*1000).toFixed(1),+(h.g.position.z*1000).toFixed(1)]:null},selId:()=>sel&&sel.id,pt:id=>{const h=HS.find(x=>x.p.id===id);if(!h)return null;const v=h.g.position.clone().project(camera),r=renderer.domElement.getBoundingClientRect();return[+(r.left+(v.x+1)/2*r.width).toFixed(1),+(r.top+(1-(v.y+1)/2)*r.height).toFixed(1)]},want:()=>[want.tgt.x,want.tgt.y,want.tgt.z,want.r,want.th,want.ph],spin:()=>spinA,sc:()=>SPIN_SC,nodes:SC_NODES,pos:scPos,focus:scFocus,next:scNext,cam:()=>[cam.tgt.x,cam.tgt.y,cam.tgt.z,cam.r,cam.th,cam.ph],want:()=>[want.tgt.x,want.tgt.y,want.tgt.z,want.r,want.th,want.ph],go:i=>{const d=SC_NODES[i],v=scPos(d);if(v)scFocus(v,typeof d==='object'?d:null);return v?[+v.x.toFixed(4),+v.y.toFixed(4),+v.z.toFixed(4)]:null},w:a=>spinW(a)};/* v199zzzzzz93：除錯掛鉤——特寫節點取位與構圖（go(i) 直接跳到第 i 個特寫，用於逐節點調構圖） */window.__scWhy=w=>{SC.why=w};window.__LDs=()=>{try{const n=performance.getEntriesByType('navigation')[0]||{},r=x=>x?(x/1000).toFixed(1):'—',rs=performance.getEntriesByType('resource').filter(e=>/\.(js|css)(\?|$)/.test(e.name)),dl=Math.max(n.responseEnd||0,...rs.map(e=>e.responseEnd)),kb=Math.round(rs.reduce((s,e)=>s+(e.transferSize||0),(n.transferSize||0))/1024);return '載入 下載'+r(dl)+'（'+kb+' KB）／解析'+r(n.domInteractive)+'（app'+r(window.__tA1-window.__tA0)+'）／DCL'+r(n.domContentLoadedEventEnd)+'／load'+r(n.loadEventEnd)+'／毛玻璃'+r(window.__tRv)+' s｜就緒'+(()=>{const R=window.__RDY;if(!R)return '—';const L=(window.__LT||[]).filter(x=>x[0]+x[1]>R.t0&&x[0]<(R.t1||R.t0+2600));const F=(window.__LF||[]).filter(x=>x[0]+x[1]>R.t0&&x[0]<(R.t1||R.t0+2600)),q=b=>b[0]+'次'+(b[1]/1000).toFixed(1)+'s';return R.why+' '+R.n+'幀 卡頓'+R.hit+'（新程式'+q(R.hP)+'／新貼圖'+q(R.hT)+'／其他'+q(R.hO)+'）最長'+Math.round(R.max)+'ms 中位'+Math.round(R.med||0)+'ms｜程式'+R.p0+'→'+R.p1+' 貼圖'+R.t0x+'→'+R.t1x+'｜長任務'+L.length+'個'+Math.round(L.reduce((a,x)=>a+x[1],0))+'ms 長幀'+F.length+'個'+Math.round(F.reduce((a,x)=>a+x[1],0))+'ms（繪製'+Math.round(F.reduce((a,x)=>a+x[2],0))+'）'+'｜預建'+(window.__tPw?(window.__tPw/1000).toFixed(1)+'s':'未開始')})()+'｜program '+((renderer.info.programs||[]).length)}catch(e){return ''}};window.__SCs=()=>(SC.on?'執行':'停止')+(SC.why?'（'+SC.why+'）':'');
scUI();
setTimeout(()=>{try{keepPrograms()}catch(e){}},9000);
/* ===== v109/v110：鈦原色表面（M.ti 及其 clone：車架、焊道、EX 勾爪）。噴砂＝世界座標 3D 雜訊微擾粗糙度與法線；拉絲＝沿管軸的條紋＋高光沿管周拉寬（管軸方向由法線的螢幕導數估出，條紋雜訊取世界法線）。
   皆離遠自動淡出。TI_BLAST＝噴砂顆粒強度（0 關閉）；tiU.uTB／uTG 由表面處理選項驅動（見 finSync）。 ===== */
const TI_BLAST=.5;
(function(){const DECL='varying vec3 vWPb;varying vec3 vWNb;varying vec3 vBAb;uniform float uTB,uTG,uTM,uTR,uTA,uTC,uTN,uTS;\nfloat h31b(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}\nfloat vnb(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h31b(i),h31b(i+vec3(1,0,0)),f.x),mix(h31b(i+vec3(0,1,0)),h31b(i+vec3(1,1,0)),f.x),f.y),mix(mix(h31b(i+vec3(0,0,1)),h31b(i+vec3(1,0,1)),f.x),mix(h31b(i+vec3(0,1,1)),h31b(i+vec3(1,1,1)),f.x),f.y),f.z);}\nfloat stkB(vec3 P,vec3 A,float ax){P*=uTS;ax*=uTS;float w=length(fwidth(P));float f2=1.0-smoothstep(.3,.75,w*130.0),f3=1.0-smoothstep(.3,.7,w*260.0),f4=1.0-smoothstep(.3,.7,w*700.0);float s=(vnb(P*70.0+A*ax*2.0+1.7)-.5)*2.0*.5;if(f2>0.0)s+=(vnb(P*130.0+A*ax*3.0+4.1)-.5)*2.0*.55*f2;if(f3>0.0)s+=(vnb(P*260.0+A*ax*5.0+5.3)-.5)*2.0*.5*f3;if(f4>0.0)s+=(vnb(P*700.0+A*ax*10.0+9.1)-.5)*2.0*.3*f4;float am=clamp(.75+.5*vnb(P*30.0+A*ax*4.0+3.3),.5,1.25);return clamp(s*am,-1.0,1.0);}\n';
  const seen=new Set();let cnt=0,A=TI_BLAST.toFixed(3),A2=(TI_BLAST*.12).toFixed(3);
  function blast(m){if(seen.has(m)||!m.isMeshStandardMaterial||m.isMeshPhysicalMaterial||m.metalness<.9||m.color.getHex()!==0xC8C4B8)return;seen.add(m);cnt++;
    m.customProgramCacheKey=()=>'tiblast11';m.userData.tib=true;
    m.onBeforeCompile=sh=>{Object.assign(sh.uniforms,tiU);
      sh.vertexShader=sh.vertexShader.replace('void main() {','attribute vec3 aBrush;varying vec3 vWPb;varying vec3 vWNb;varying vec3 vBAb;\nvoid main() {').replace('#include <project_vertex>','#include <project_vertex>\n\tvWPb=(modelMatrix*vec4(transformed,1.0)).xyz;vWNb=normalize((normalMatrix*objectNormal)*mat3(viewMatrix));{vec3 tb=mat3(modelMatrix)*aBrush;float tl=length(tb);vBAb=tl>1e-6?tb/tl:vec3(0.0);}');
      sh.fragmentShader=sh.fragmentShader.replace('void main() {',DECL+'void main() {')
       .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\n\tfloat alb0=length(vBAb);vec3 Aw0=alb0>.5?vBAb/alb0:vec3(0.0);float ax0=dot(vWPb,Aw0);float skb=(uTB>0.0&&alb0>.5)?stkB(vWPb-Aw0*ax0,Aw0,ax0):0.0;\n\tdiffuseColor.rgb*=1.0+skb*.16*uTB*uTC;\n\tfloat fbl=1.0-smoothstep(.3,.8,length(fwidth(vWPb))*1000.0);\n\tfloat rnb=0.0;if(uTG>0.0)rnb=(vnb(vWPb*700.0)-.5)*'+A+'*uTG*fbl;roughnessFactor=clamp(roughnessFactor*(1.0+rnb),0.04,1.0);\n\troughnessFactor=mix(roughnessFactor,max(roughnessFactor,.46),uTB);\n\troughnessFactor=mix(roughnessFactor,max(roughnessFactor,uTR),uTM);\n\troughnessFactor=clamp(roughnessFactor+skb*.1*uTB*uTN,.12,1.0);')
       .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n\tif(uTG>0.0)normal=normalize(normal+(viewMatrix*vec4((vec3(vnb(vWPb*1000.0),vnb(vWPb*1000.0+17.0),vnb(vWPb*1000.0+41.0))-.5)*'+A2+'*uTG*fbl,0.0)).xyz);\n\tfloat alb=length(vBAb);vec3 Awb=alb>.5?vBAb/alb:vec3(0.0);vec3 Pb=(vWPb-Awb*dot(vWPb,Awb))*uTS;\n\tfloat fbn=1.0-smoothstep(.3,.8,length(fwidth(Pb))*1700.0);float bnn=0.0;if(uTB>0.0){bnn=(vnb(Pb*700.0+3.1)-.5)*2.0*.45;if(fbn>0.0)bnn+=(vnb(Pb*1700.0)-.5)*2.0*fbn;}\n\tif(uTB>0.0){float axb=dot(vWPb,Awb)*uTS;bnn*=clamp(.35+1.3*vnb(Pb*120.0+Awb*axb*6.0),.2,1.4)*uTC;float scb=0.0,sgb=0.0;if(fbn>0.0){scb=smoothstep(.74,.9,vnb(Pb*900.0+Awb*axb*9.0+9.0));sgb=(vnb(Pb*900.0+5.0)>.5?1.0:-1.0);}bnn+=(scb*sgb*.9*fbn+skb*.2)*uTN;}\n\tvec3 Avb=normalize((viewMatrix*vec4(Awb,0.0)).xyz+1e-6);vec3 crb=cross(normal,Avb);float clb=length(crb);\n\tif(uTB>0.0&&alb>.5&&clb>.001){vec3 cdir=crb/clb*smoothstep(.12,.4,clb);normal=normalize(normal+cdir*bnn*uTB*.34);normal=normalize(normal-cdir*dot(normal,cdir)*.55*uTB);}\n\tfloat aAb=0.0;if(uTB>0.0&&uTA>0.0&&alb>.5){vec3 Vv=normalize(vViewPosition);vec3 L1=normalize(vec3(-.35,.55,.75)),L2=normalize(vec3(.6,-.15,.6));vec3 H1=normalize(L1+Vv),H2=normalize(L2+Vv);float t1=dot(Avb,H1),t2=dot(Avb,H2);aAb=(pow(sqrt(max(1.-t1*t1,0.)),55.)*pow(max(dot(normal,H1),0.),7.)+.25*pow(sqrt(max(1.-t2*t2,0.)),33.)*pow(max(dot(normal,H2),0.),7.))*uTA*.5;}')
       .replace('vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;','vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance + aAb*vec3(1.0,.97,.92);')};
    m.needsUpdate=true}
  if(TI_BLAST>0){bike.traverse(o=>{if(!o.isMesh||!o.material)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(blast)});window.__tiBlastN=cnt}
})();

/* ===== v117：胎壁與座墊的粗糙度紋理（程序式，物件空間座標，無 UV、無貼圖檔）=====
   胎壁（M.wall，橡膠）：細顆粒（約 0.4 mm；v118 加粗為約 0.9 mm）＋中尺度霧斑（約 8 mm）調變粗糙度，再以同一顆粒微擾法線；座墊（M.saddle，皮／合成皮）：卵石狀顆粒（ridge 雜訊，約 0.9 mm）調變粗糙度與法線，凹處較粗、凸處較亮。
   皆隨距離淡出（fwidth），避免遠處閃爍。 */
(function(){const DECL='varying vec3 vOp;\nfloat hS(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}\nfloat vS(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hS(i),hS(i+vec3(1,0,0)),f.x),mix(hS(i+vec3(0,1,0)),hS(i+vec3(1,1,0)),f.x),f.y),mix(mix(hS(i+vec3(0,0,1)),hS(i+vec3(1,0,1)),f.x),mix(hS(i+vec3(0,1,1)),hS(i+vec3(1,1,1)),f.x),f.y),f.z);}\n';
  function surf(m,key,rough,bump,frGrain,ridge,mot){const FG=frGrain.toFixed(1);m.customProgramCacheKey=()=>key+'2';
    m.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('void main() {','varying vec3 vOp;\nvoid main() {').replace('#include <project_vertex>','#include <project_vertex>\n\tvOp=transformed;');
      sh.fragmentShader=sh.fragmentShader.replace('void main() {',DECL+'void main() {')
       .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\n\tfloat fS=1.0-smoothstep(.3,.8,length(fwidth(vOp))*'+FG+');\n\tfloat g1=vS(vOp*'+FG+');'+(ridge?'g1=1.0-abs(g1*2.0-1.0);':'')+'\n\tfloat g2=vS(vOp*120.0+5.0);\n\troughnessFactor=clamp(roughnessFactor+((g1-.5)*'+rough+'*fS+(g2-.5)*'+mot+'),.05,1.0);')
       .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n\tnormal=normalize(normal+(viewMatrix*vec4((vec3(vS(vOp*'+FG+'+7.0),vS(vOp*'+FG+'+19.0),vS(vOp*'+FG+'+31.0))-.5)*'+bump+'*fS,0.0)).xyz);')};
    m.needsUpdate=true}
  surf(M.wall,'srf-wall',.46,.9,1100.0,false,.3);
  surf(M.saddle,'srf-saddle',.5,1.2,480.0,true,.18);
})();

/* v199zzzzzz64：行動版（≤760px）車款・尺寸膠囊移到 3D 左上，水平中心對齊頁首品牌標誌；膠囊比兩倍標誌中心距寬時貼齊左緣 4px */(function(){const tg=document.getElementById('stTag'),lg=document.querySelector('header .logo');if(!tg||!lg)return;const pl=()=>{if(innerWidth>760){tg.style.left=tg.style.right=tg.style.transform='';return}const a=lg.getBoundingClientRect(),b=stage.getBoundingClientRect();if(!a.width)return;const cx=a.left+a.width/2-b.left,hw=tg.offsetWidth/2;tg.style.right='auto';tg.style.transform='translateX(-50%)';tg.style.left=Math.max(cx,hw+4)+'px'};new MutationObserver(pl).observe(tg,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden']});new ResizeObserver(pl).observe(stage);addEventListener('resize',pl);setTimeout(pl,0)})();/* v199f：回復鈕狀態點（綠＝就緒；黃＝補間／換車型處理中；紅＝保留給錯誤）、顯示風格移到臨時畫質設定；v199zzzzzz35：FPS／ms 移到 header、刪記憶體 */
(function(){const rb=document.getElementById('reset');if(rb){let s0='';/* v199zzzzzz64：就緒＝鏡頭補間結束、換車型 700 ms 已過，且目前車款的 logo／下管標貼圖已建好並畫上（使用者 2026-11-16 選定）；只在處理中顯示（圖示轉黃），就緒不另標示 */const decBusy=()=>{try{if(!logoGrp||!logoShown())return false;if(logoBuilt!==logoKey)return true;let p=false;logoGrp.traverse(o=>{if(p||!o.material)return;[].concat(o.material).forEach(m=>{const t=m&&m.map;if(t&&(t.userData.pend||!t.image))p=true})});return p}catch(e){return false}};setInterval(()=>{const b=!!(tween||vTween)||performance.now()<swT||decBusy(),s=b?'busy':'ok';if(s!==s0){s0=s;rb.dataset.state=s;const tt=b?'處理中':'就緒';rb.title='回到全車（'+tt+'）';rb.setAttribute('aria-label','回到全車，'+tt)}},120)}
 const qb=document.getElementById('qpBody'),ss=document.getElementById('styleSeg');
 if(qb&&ss){const r=document.createElement('div');r.className='qk';const l=document.createElement('label');l.textContent='顯示風格';r.append(l,ss);qb.insertBefore(r,qb.firstChild)}
 {
  let n=0,ms=0,acc=0,tk=performance.now();const rr=renderer.render.bind(renderer);
  /* v199zzzzzz126：GPU 計時（EXT_disjoint_timer_query_webgl2）——只量主繪製（不含描邊覆蓋材質）；結果非同步回收，每 600 ms 由效能監控取平均。GPU 使用率％受驅動動態調頻影響（負載變輕時降頻，％不一定跟著降），比較效能改看 GPU ms（使用者 2026-11-20：明暗模式、色光背景開關 GPU％皆差不多） */
  const gl=renderer.getContext(),TQ=gl.getExtension('EXT_disjoint_timer_query_webgl2'),qPool=[],qPend=[];let gAcc=0,gN=0;
  const gPoll=()=>{while(qPend.length){const q=qPend[0];if(!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE))break;const dis=gl.getParameter(TQ.GPU_DISJOINT_EXT),v=gl.getQueryParameter(q,gl.QUERY_RESULT);qPend.shift();qPool.push(q);if(!dis){gAcc+=v/1e6;gN++}}};
  window.__gpuMs=()=>{if(!TQ)return null;const r=gN?gAcc/gN:0;gAcc=0;gN=0;return r};
  renderer.render=function(a,b){const ov=!!a.overrideMaterial,t0=performance.now();let q=null;if(TQ&&!ov&&qPend.length<8){try{gPoll();q=qPool.pop()||gl.createQuery();gl.beginQuery(TQ.TIME_ELAPSED_EXT,q)}catch(e){q=null}}rr(a,b);if(q){try{gl.endQuery(TQ.TIME_ELAPSED_EXT);qPend.push(q)}catch(e){}}else if(TQ&&qPend.length)try{gPoll()}catch(e){}const d=performance.now()-t0;if(!ov){ms=acc;RMS=acc;acc=d;n++}else acc+=d};/* v199g：FPS 數畫面張數（描邊的兩次覆蓋材質繪製不另計）、ms＝上一張畫面全部 render 呼叫的 CPU 時間總和；v199f 起為每次 render 呼叫計，插畫風格每張畫面 3 次，數字被放大 3 倍 */
  const F=document.getElementById('qsF'),M=document.getElementById('qsM');
  if(F&&M)setInterval(()=>{const now=performance.now(),dt=(now-tk)/1000;tk=now;const f=n/dt;n=0;F.textContent=f>0?f.toFixed(0):'0';M.textContent=f>0?ms.toFixed(1):'—'},500)}})();
/* v199zzzzzz58：給 cloud.js（雲端保存）與 bgm.js（背景音樂）的對外介面 */window.VIBE_API={gather:()=>cfgGather(),apply:J=>cfgApply(J),model:()=>selM,size:()=>size,ver:()=>CFG_VER};
try{setModel('325')}catch(e){console.warn('default model',e)}window.__tA1=performance.now();/* v199zzzzzz54：記錄 app.js 執行時間（診斷列 app） *//* v199zzzzzz51：預設車款 MASTER 325Ti（使用者 2026-11-16） */
})();

/* v199zzzzzz119：卡片設計精緻化（使用者 2026-11-19「一到五全做」）。
   1 主視覺：#geoScore 為黏頂主視覺，捲動後才出底色與細線（.stuck）。
   2 模組化：分段改用間距＋小標，不再每段一條線（CSS）。
   3 材質：卡片頂光、由上而下明暗、顆粒、投影（CSS）。
   4 控制：尺寸／疊圖改分段選擇器（滑動指示，--sx/--sw）；尺寸條上以藍色虛線標出疊圖對象；車型改小卡（佔位圖 .mc-img，日後換橫幅車款標誌：MC_IMG）。
   5 動態：數字滾動、面板內容依序淡入、指示滑動；prefers-reduced-motion 全部關閉。 */
var MC_IMG={'MASTER 64Ti':'img/badge/m64.svg?h=18cda6677b','MASTER 325Ti':'img/badge/m325.svg?h=cb6ebb293a','AUDAX 325Ti':'img/badge/audax.svg?h=8b27a0149e','ili ili 325Ti':'img/badge/ili.svg?h=d78fab2d39','ili ili SS-2205':'img/badge/ss.svg?h=32b0a1ab41','ili-ili EX 325Ti':'img/badge/ex.svg?h=8964fc8451'};/* 車型橫幅標誌（v199zzzzzz122：使用者 2026-11-20 提供六款 SVG）。以 CSS mask 上色＝文字色，明暗主題自動跟隨；未設＝佔位圖 */
function RMOm(){return matchMedia('(prefers-reduced-motion: reduce)').matches}/* 函式宣告會提升；renderGeo 在檔尾之前就會呼叫 heroSet */
function heroSet(el,html){if(!el)return;const old={};el.querySelectorAll('[data-v]').forEach(b=>old[b.dataset.v]=b.textContent);el.innerHTML=html;el.hidden=!html;
  if(RMOm()||window.__WARMING)return;/* v199zzzzzz128：預熱中切換又還原，不播數字滾動 */el.querySelectorAll('[data-v]').forEach(b=>{const k=b.dataset.v,o=old[k],n=b.textContent;if(o===undefined||o===n)return;
    const a=+o,z=+n;if(isFinite(a)&&isFinite(z)&&o!==''&&n!==''){const t0=performance.now(),D=340,st=t=>{const p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,3);b.textContent=String(Math.round(a+(z-a)*e));if(p<1)requestAnimationFrame(st);else b.textContent=n};b.textContent=o;requestAnimationFrame(st)}
    else{b.classList.remove('flip');void b.offsetWidth;b.classList.add('flip')}})}
(function(){const aside=document.querySelector('aside');if(!aside)return;
  const seg=el=>{if(!el)return;el.classList.add('seg');const place=()=>{const b=el.querySelector('.chip[aria-pressed="true"]');if(!b){el.style.setProperty('--sw','0px');return}el.style.setProperty('--sx',b.offsetLeft+'px');el.style.setProperty('--sw',b.offsetWidth+'px')};
    new MutationObserver(()=>{place();if(el.id==='sizeChips')mark()}).observe(el,{childList:true});new ResizeObserver(place).observe(el);place()};
  const mark=()=>{const sc=document.getElementById('sizeChips'),cc=document.querySelector('#cmpChips .chip[aria-pressed="true"]'),cv=cc?cc.textContent:'';if(!sc)return;sc.querySelectorAll('.chip').forEach(b=>{const on=!!cv&&b.textContent===cv;/* cmp 在別的區塊作用域內，改讀疊圖條的選中鈕 */b.classList.toggle('cmpd',on);if(on)b.setAttribute('aria-describedby','cmpH');else b.removeAttribute('aria-describedby')})};
  seg(document.getElementById('sizeChips'));seg(document.getElementById('cmpChips'));
  {const ch=document.getElementById('cmpChips');if(ch){new MutationObserver(mark).observe(ch,{childList:true});const h=ch.previousElementSibling;if(h&&h.tagName==='H2'&&!h.id)h.id='cmpH'}}
  const mc=document.getElementById('modelChips');if(mc){mc.classList.add('mcards');const deco=()=>{mc.querySelectorAll('.chip').forEach(b=>{if(b.querySelector('.mc-img'))return;const n=b.textContent;b.textContent='';const im=document.createElement('span');im.className='mc-img';im.setAttribute('aria-hidden','true');if(MC_IMG[n]){const u='url("'+MC_IMG[n]+'")';im.style.webkitMaskImage=u;im.style.maskImage=u;im.classList.add('has')}if(MC_IMG[n]){b.setAttribute('aria-label',n);b.title=n;b.append(im)}else{const t=document.createElement('span');t.className='mc-n';t.textContent=n;b.append(im,t)}/* v199zzzzzz124：有車款標時只顯示圖（使用者 2026-11-20），名稱改放 aria-label／title */});
      const sel=mc.querySelector('.chip[aria-pressed="true"]');if(sel&&mc.scrollWidth>mc.clientWidth+2){const L=sel.offsetLeft-mc.offsetLeft,R=L+sel.offsetWidth;if(L<mc.scrollLeft||R>mc.scrollLeft+mc.clientWidth)mc.scrollTo({left:Math.max(0,L-16),behavior:RMOm()?'auto':'smooth'})}};
    new MutationObserver(deco).observe(mc,{childList:true});deco()}
  /* 黏頂主視覺：行動版要讓出頂端分頁列；捲動後才出底色 */
  const tabs=document.getElementById('sheetTabs');const th=()=>aside.style.setProperty('--tabsH',(tabs&&tabs.offsetParent?tabs.offsetHeight:0)+'px');if(tabs)new ResizeObserver(th).observe(tabs);th();addEventListener('resize',th);
  const hero=document.getElementById('geoScore');const stuck=()=>{if(hero)hero.classList.toggle('stuck',aside.scrollTop>6)};aside.addEventListener('scroll',stuck,{passive:true});stuck();
  /* 面板內容依序淡入（切分頁時） */
  document.querySelectorAll('aside .panel').forEach(p=>new MutationObserver(()=>{if(p.hidden||RMOm())return;p.classList.remove('v-enter');void p.offsetWidth;p.classList.add('v-enter');clearTimeout(p._ve);p._ve=setTimeout(()=>p.classList.remove('v-enter'),900)}).observe(p,{attributes:true,attributeFilter:['hidden']}));
})();

/* ===== v199zzzzzz125：說明小字改 i 圖示＋彈出卡片（使用者 2026-11-20）=====
   p.fine 說明段保留在 DOM（隱藏，內容照常由各 render 更新、i18n 照常轉譯），在最近的前一個 h2 加 i 鈕；點開卡片顯示全部來源段落，最後放官網連結（段內 a.info 的網址優先；加購頁＝零組件頁；其餘＝官網首頁）。
   不轉：details 內、進階彩現、對話框、狀態訊息（role=status／aria-live／*Msg）、騎士尺寸推薦結果、尺寸表。內容清空時 i 鈕隱藏。 */
(function(){const SKIP='details,#qp,.modal,.scrim,#fitOut,#geoTable,[role=status],[aria-live]',FOR={paintNote:'paintChips',gradInfo:'paintChips'};
  let pop=null,cur=null;
  const close=()=>{if(pop){pop.hidden=true}if(cur){cur.setAttribute('aria-expanded','false');cur=null}};
  const url=b=>{for(const p of b._src){const a=p.querySelector('a.info[href]');if(a)return a.href}return b.closest('[data-sub="addon"],#addonBox')?PARTS_URL:'https://rikulau.com/'};
  const open=b=>{if(cur===b){close();return}close();if(!pop){pop=document.createElement('div');pop.id='fpop';pop.className='fpop';pop.setAttribute('role','dialog');document.body.appendChild(pop)}
    const L=b._src.filter(p=>p.isConnected&&p.style.display!=='none'&&p.textContent.trim());
    pop.innerHTML=L.map(p=>{const c=p.cloneNode(true);c.querySelectorAll('a.info').forEach(a=>a.remove());c.removeAttribute('id');c.className='fpop-p';return c.outerHTML}).join('')+`<a class="fpop-a" href="${url(b)}" target="_blank" rel="noopener noreferrer">官網了解更多 →</a>`;
    pop.hidden=false;const r=b.getBoundingClientRect(),W=Math.min(320,innerWidth-24);pop.style.width=W+'px';
    let x=Math.max(12,Math.min(r.left-W/2+r.width/2,innerWidth-W-12)),y=r.bottom+8;pop.style.left=x+'px';pop.style.top=y+'px';
    const h=pop.offsetHeight;if(y+h>innerHeight-12)pop.style.top=Math.max(12,r.top-8-h)+'px';cur=b;b.setAttribute('aria-expanded','true')};
  const host=p=>{if(FOR[p.id]){const k=document.getElementById(FOR[p.id]);let e=k&&k.previousElementSibling;while(e&&e.tagName!=='H2')e=e.previousElementSibling;if(e)return e}
    let e=p.previousElementSibling;while(e&&e.tagName!=='H2')e=e.previousElementSibling;return e};
  const run=()=>{document.querySelectorAll('main p.fine:not([data-fp])').forEach(p=>{if(p.closest(SKIP)||/Msg$/.test(p.id||''))return;p.dataset.fp='1';p.classList.add('fp-src');
      const h=host(p);let b=h&&h.querySelector(':scope>button.fpi');
      if(!b){b=document.createElement('button');b.type='button';b.className='info fpi';b.textContent='i';b.setAttribute('aria-label','說明');b.setAttribute('aria-expanded','false');b._src=[];b.onclick=e=>{e.stopPropagation();open(b)};
        if(h){h.querySelectorAll(':scope>a.info').forEach(a=>a.remove());h.appendChild(b)}else p.before(b)}
      b._src.push(p)});
    document.querySelectorAll('button.fpi').forEach(b=>{b._src=b._src.filter(p=>p.isConnected);b.hidden=!b._src.some(p=>p.style.display!=='none'&&p.textContent.trim())})};
  let q=0;const kick=()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;run()})};
  new MutationObserver(kick).observe(document.querySelector('main')||document.body,{childList:true,subtree:true,characterData:true});
  document.addEventListener('pointerdown',e=>{if(pop&&!pop.hidden&&!pop.contains(e.target)&&!(e.target.closest&&e.target.closest('button.fpi')))close()},true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});addEventListener('resize',close);
  document.addEventListener('scroll',e=>{if(pop&&!pop.hidden&&!pop.contains(e.target))close()},true);run()})();
/* v199zzzzzz139（B1，使用者 2026-11-20）：#geoScore 右側 CTA → 客製服務／幾何客製（騎士尺寸為全站共用 RID，免重填）；買鈦車者多已做過或計畫做 fitting */
(function(){const g=document.getElementById('geoScore');if(!g)return;g.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('.gcCta');if(!c)return;e.stopPropagation();e.preventDefault();const t=document.querySelector('#stBar .tab[data-tab="custom"]')||document.querySelector('.tab[data-tab="custom"]');if(t)t.click();setTimeout(()=>{const s=document.querySelector('#cSub [data-sub="geo"]');if(s&&s.getAttribute('aria-selected')!=='true')s.click();try{document.querySelector('aside').scrollTo({top:0,behavior:'smooth'})}catch(_){}},60)},true)})();
