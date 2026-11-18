/* v199zzzzzz62：有人工編曲（js/bgm-arr.js）的車款改用真實樂器取樣（Meta Piano、Meta Nylon Guitar、Karoryfer Swagbass，皆 CC0；VIBE_BGM_音源改善方案 §5–§8）。
   取樣為 WebM Opus（iOS Safari 的 decodeAudioData 不穩定支援 Ogg），每樂器一個 bgm/*.webm，只在開啟音樂且該車款需要時下載；載入失敗退回合成。
   殘響 IR 改固定種子（每次啟動音場一致）。其餘車款暫用下列參數式合成。 */
/* v199zzzzzz58：參數式背景音樂（RKL_Live_Showcase_2026-11-14.md §15；使用者 2026-11-16「參數式生成 BGM，對應各車款不同人設」）
   - 不載入音檔或音色庫：每款車一組人設參數（速度、調式、和弦進行、三種音色、節奏型態、密度、搖擺、殘響），
     以固定種子亂數生成 16 小節循環（低音、和聲、旋律三個合成音色＋輕打擊），Web Audio 合成。同一車款每次生成結果相同。
   - 預設關閉；使用者按頁首音符鈕才開。偏好存 vibe.bgm／vibe.bgmv；存過「開」時，下一次任何點擊或按鍵才起聲（瀏覽器自動播放限制）。
   - 換車款：舊主題淡出、新主題淡入（1.6 s）。頁面進背景暫停，回前景續播。與 Live Showcase、效能分級無關（慢機也能播）。
   - 排程用 AudioContext 時鐘（25 ms 檢查、預排 120 ms），不靠 requestAnimationFrame。 */
(function(){
'use strict';
const PERSONA={
 /* 人設名稱只在程式與文件，前台不顯示 */
/* v199zzzzzz74：64／325 人設對調回 v65 之前（M325＝從容、M64＝俐落推進；使用者 2026-11-17 古典主題決定）；以下合成參數只在取樣載入失敗時使用 */
 '64':   {name:'Mars｜競賽意志',bpm:124,root:50,mode:'dorian',    prog:[0,6,3,4],cb:1,swing:0,  seed:6401,
          bass:{pat:'pulse8',wave:'sawtooth',det:[-6,6],cut:520,fe:2.2,q:3,a:.004,d:.16,s:.35,r:.08,vol:.32},
          harm:{pat:'arp16',wave:'square',det:[0],cut:1700,fe:1.2,q:1,a:.003,d:.09,s:.2,r:.06,vol:.075,oct:2},
          lead:{wave:'triangle',det:[0,7],cut:3600,fe:.6,q:.7,a:.01,d:.25,s:.6,r:.18,vol:.16,oct:2,dens:.55,legato:.35,range:7,leap:.12},
          hat:{pat:16,vol:.045},kick:{pat:'four',vol:.5},rv:.16},
 '325':  {name:'Jupiter｜開闊從容',bpm:114,root:45,mode:'lydian',      prog:[0,4,5,3],cb:1,swing:0,  seed:3251,
          bass:{pat:'quarter',wave:'triangle',det:[0],cut:900,fe:.8,q:.8,a:.006,d:.3,s:.55,r:.12,vol:.42},
          harm:{pat:'pluck',wave:'sawtooth',det:[-5,5],cut:1500,fe:1.4,q:1.2,a:.004,d:.2,s:.15,r:.1,vol:.06,oct:1},
          lead:{wave:'sine',det:[0,4],cut:5000,fe:.3,q:.5,a:.02,d:.4,s:.7,r:.3,vol:.2,oct:2,dens:.42,legato:.6,range:6,leap:.15},
          hat:{pat:8,vol:.035},kick:{pat:'half',vol:.35},rv:.26},
 'audax':{name:'Saturn｜耐力與時間',bpm:92,root:41,mode:'ionian',   prog:[0,3,0,4],cb:2,swing:0,  seed:3252,
          bass:{pat:'quarter',wave:'sine',det:[0],cut:700,fe:.3,q:.5,a:.01,d:.4,s:.7,r:.15,vol:.5},
          harm:{pat:'pad',wave:'sawtooth',det:[-9,0,9],cut:950,fe:.4,q:.6,a:.9,d:1.2,s:.8,r:1.1,vol:.045,oct:1},
          lead:{wave:'triangle',det:[0],cut:3000,fe:.3,q:.5,a:.04,d:.6,s:.7,r:.4,vol:.19,oct:2,dens:.3,legato:.85,range:5,leap:.08},
          hat:null,kick:null,rv:.36},
 'ili':  {name:'Mercury｜輕快敏捷',bpm:104,root:40,mode:'mixolydian',  prog:[0,6,3,0],cb:1,swing:.12,seed:3253,
          bass:{pat:'synco',wave:'square',det:[0],cut:480,fe:1.5,q:2,a:.004,d:.18,s:.4,r:.08,vol:.28},
          harm:{pat:'arp8',wave:'triangle',det:[0],cut:2600,fe:.6,q:.7,a:.004,d:.18,s:.3,r:.12,vol:.12,oct:2},
          lead:{wave:'square',det:[0],cut:2400,fe:.9,q:1,a:.006,d:.2,s:.45,r:.12,vol:.07,oct:2,dens:.5,legato:.3,range:8,leap:.2},
          hat:{pat:8,vol:.04,ghost:.35},kick:{pat:'synco',vol:.42},rv:.22},
 'ss':   {name:'Venus｜冷靜精準',bpm:86,root:43,mode:'aeolian',    prog:[0,5,3,4],cb:1,swing:.3, seed:2205,
          bass:{pat:'walk',wave:'triangle',det:[0],cut:800,fe:.6,q:.8,a:.006,d:.25,s:.5,r:.1,vol:.45},
          harm:{pat:'pluck',wave:'square',det:[0],cut:1100,fe:1,q:.8,a:.004,d:.22,s:.12,r:.12,vol:.05,oct:1},
          lead:{wave:'triangle',det:[0,5],cut:2600,fe:.4,q:.6,a:.015,d:.35,s:.55,r:.25,vol:.2,oct:2,dens:.4,legato:.5,range:6,leap:.1},
          hat:{pat:8,vol:.04},kick:{pat:'half',vol:.38},rv:.2},
 'ex':   {name:'Uranus｜冒險與變化',bpm:78,root:38,mode:'aeolian',    prog:[0,0,5,6],cb:2,swing:0,  seed:3254,
          bass:{pat:'drone',wave:'sawtooth',det:[-7,7],cut:330,fe:.5,q:1.5,a:.5,d:1,s:.85,r:.8,vol:.26},
          harm:{pat:'pad5',wave:'sawtooth',det:[-8,8],cut:1200,fe:.3,q:.6,a:1.2,d:1.5,s:.8,r:1.4,vol:.045,oct:1},
          lead:{wave:'triangle',det:[0],cut:2800,fe:.4,q:.6,a:.03,d:.7,s:.65,r:.5,vol:.2,oct:2,dens:.28,legato:.8,range:10,leap:.3},
          hat:null,kick:{pat:'tom',vol:.55},rv:.42}
};
const MODES={ionian:[0,2,4,5,7,9,11],dorian:[0,2,3,5,7,9,10],mixolydian:[0,2,4,5,7,9,10],aeolian:[0,2,3,5,7,8,10],lydian:[0,2,4,6,7,9,11]};
const BARS=16,SPB=16,LOOP=BARS*SPB;
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function compose(p){
  const R=rng(p.seed),sc=MODES[p.mode],ev=[];for(let i=0;i<LOOP;i++)ev.push([]);
  const dm=(deg,base)=>{const o=Math.floor(deg/7),k=((deg%7)+7)%7;return base+12*o+sc[k]};
  const add=(st,v,m,len,vel)=>{if(st>=0&&st<LOOP)ev[st].push([v,m,len,vel])};
  const chordAt=bar=>p.prog[Math.floor(bar/p.cb)%p.prog.length];
  /* 低音 */
  for(let b=0;b<BARS;b++){const c=chordAt(b),r=dm(c,p.root),s0=b*SPB,P=p.bass.pat;
    if(P==='pulse8')for(let s=0;s<16;s+=2)add(s0+s,'bass',s===8&&R()<.3?r+12:r,2,s%4?.7:1);
    else if(P==='quarter')for(let s=0;s<16;s+=4)add(s0+s,'bass',s===12&&R()<.4?dm(c+4,p.root):r,3,s?.75:1);
    else if(P==='synco'){[0,3,6,10,12].forEach((s,i)=>add(s0+s,'bass',i===3?dm(c+4,p.root):r,i===4?3:2,i===0?1:.75))}
    else if(P==='walk'){[0,4,8,12].forEach((s,i)=>add(s0+s,'bass',dm(c+[0,2,4,5][i]-(i===3&&R()<.5?1:0),p.root),4,i?.75:1))}
    else if(P==='drone'){if(b%p.cb===0)add(s0,'bass',r,SPB*p.cb,1)}
  }
  /* 和聲 */
  for(let b=0;b<BARS;b++){const c=chordAt(b),base=p.root+12*p.harm.oct,s0=b*SPB,P=p.harm.pat,tri=[c,c+2,c+4].map(d=>dm(d,base));
    if(P==='arp16'){const seq=[0,1,2,1,0,1,2,3];for(let s=0;s<16;s++){const k=seq[s%8];add(s0+s,'harm',k===3?tri[0]+12:tri[k],1,s%4?.6:.9)}}
    else if(P==='arp8'){const seq=[0,2,1,2,0,2,1,3];for(let s=0;s<16;s+=2){const k=seq[(s/2)%8];add(s0+s,'harm',k===3?tri[1]+12:tri[k],2,s%4?.65:.9)}}
    else if(P==='pluck'){for(let s=2;s<16;s+=4)tri.forEach(m=>add(s0+s,'harm',m,1,s===10?.8:.65))}
    else if(P==='pad'){if(b%p.cb===0)tri.forEach(m=>add(s0,'harm',m,SPB*p.cb,.8))}
    else if(P==='pad5'){if(b%p.cb===0)[c,c+4,c+7].forEach(d=>add(s0,'harm',dm(d,base),SPB*p.cb,.8))}
  }
  /* 旋律：2 小節動機，句型 A A' B A''（每句 4 小節＝動機兩次），尾音回主音 */
  const L=p.lead,lb=p.root+12*L.oct;
  const motif=()=>{const out=[];let pos=0,deg=[0,2,4][Math.floor(R()*3)];
    while(pos<32){const strong=pos%4===0,pr=strong?L.dens+.25:L.dens*.7;
      if(R()<pr){const durs=L.legato>.6?[4,6,8,4]:L.legato>.4?[2,3,4,6]:[1,2,2,3,4];let d=durs[Math.floor(R()*durs.length)];d=Math.min(d,32-pos);
        if(R()<L.leap)deg+=(R()<.5?-1:1)*(3+Math.floor(R()*2));else deg+=[-2,-1,-1,1,1,2][Math.floor(R()*6)];
        deg=Math.max(-2,Math.min(L.range,deg));if(strong&&R()<.6)deg=Math.round(deg/2)*2;/* 強拍偏和弦音 */
        out.push([pos,deg,d,strong?1:.75]);pos+=d}else pos+=strong?2:1}
    if(!out.length)out.push([0,0,8,1]);return out};
  const vary=m=>m.map(n=>R()<.25?[n[0],n[1]+(R()<.5?-1:1),n[2],n[3]]:n.slice());
  const A=motif(),A2=vary(A),B=motif(),A3=vary(A);
  [[A,A],[A,A2],[B,B.map(n=>[n[0],n[1]+1,n[2],n[3]])],[A,A3]].forEach((ph,pi)=>ph.forEach((m,mi)=>{const bar=pi*4+mi*2,c=chordAt(bar);
    m.forEach((n,ni)=>{let deg=c+n[1],len=n[2];const last=pi===3&&mi===1&&ni===m.length-1;if(last){deg=7*Math.round(deg/7);len=Math.max(len,6)}add(bar*SPB+n[0],'lead',dm(deg,lb),len,n[3])})}));
  /* 打擊 */
  if(p.hat)for(let s=0;s<LOOP;s+=16/p.hat.pat){const g=p.hat.ghost&&R()<p.hat.ghost;add(s,'hat',0,1,(s%4===2?1:.55)*(g?.5:1));if(g)add(s+1,'hat',0,1,.35)}
  if(p.kick)for(let b=0;b<BARS;b++){const s0=b*SPB,K=p.kick.pat,st=K==='four'?[0,4,8,12]:K==='half'?[0,8]:K==='synco'?[0,6,10]:[0,10,12];st.forEach((s,i)=>add(s0+s,K==='tom'?'tom':'kick',0,1,i?.7:1))}
  return ev}
/* ===== 音訊 ===== */
let ctx=null,master=null,comp=null,verb=null,noise=null,players=[],cur=null,on=false,armed=false,timer=0,vol=.5,model='325';
try{vol=Math.max(0,Math.min(1,parseFloat(localStorage.getItem('vibe.bgmv'))))}catch(e){}if(!(vol>=0))vol=.5;
function chain(c){const ctx=c;comp=ctx.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.connect(ctx.destination);
  master=ctx.createGain();master.gain.value=vol*vol;master.connect(comp);
  const n=Math.floor(ctx.sampleRate*1.9),ir=ctx.createBuffer(2,n,ctx.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);const rr=rng(4242+ch);for(let i=0;i<n;i++)d[i]=(rr()*2-1)*Math.pow(1-i/n,2.6)}
  verb=ctx.createConvolver();verb.buffer=ir;verb.connect(master);
  const nb=ctx.createBuffer(1,ctx.sampleRate*.3,ctx.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;noise=noise||nb;
  }
function ensure(){if(ctx&&ctx.state==='closed')ctx=null;if(ctx)return ctx;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ctx=new AC();chain(ctx);return ctx}
const hz=m=>440*Math.pow(2,(m-69)/12);
function tone(bus,t,m,dur,vel,v){const pk=vel*v.vol,end=t+Math.max(dur,v.a+.02);
  const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(pk,t+v.a);g.gain.setTargetAtTime(pk*v.s,t+v.a,v.d/3);g.gain.setTargetAtTime(0,end,v.r/3);
  const f=ctx.createBiquadFilter();f.type='lowpass';f.Q.value=v.q;f.frequency.setValueAtTime(v.cut*(1+v.fe),t);f.frequency.setTargetAtTime(v.cut,t+v.a,Math.max(.02,v.d/2));
  f.connect(g);g.connect(bus);const stop=end+v.r*2.2,k=1/Math.sqrt(v.det.length);
  v.det.forEach(dt=>{const o=ctx.createOscillator();o.type=v.wave;o.frequency.value=hz(m);o.detune.value=dt;if(k<1){const gg=ctx.createGain();gg.gain.value=k;o.connect(gg);gg.connect(f)}else o.connect(f);o.start(t);o.stop(stop)})}
function hat(bus,t,vel,vv){const s=ctx.createBufferSource();s.buffer=noise;const f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=7200;const g=ctx.createGain();
  g.gain.setValueAtTime(vel*vv,t);g.gain.exponentialRampToValueAtTime(.0005,t+.06);s.connect(f);f.connect(g);g.connect(bus);s.start(t);s.stop(t+.08)}
function kick(bus,t,vel,vv,tom){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';const f0=tom?150:110,f1=tom?70:42;
  o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+(tom?.25:.12));g.gain.setValueAtTime(vel*vv,t);g.gain.exponentialRampToValueAtTime(.0005,t+(tom?.5:.28));
  o.connect(g);g.connect(bus);o.start(t);o.stop(t+.55)}
/* v199zzzzzz74：合成定音鼓（Strauss）與鐵砧（Verdi）；不需取樣 */
function timp(bus,t,m,dur,vel){const f0=hz(m);[[1,1,1.7],[1.5,.42,1],[1.98,.22,.6],[2.44,.1,.4]].forEach(([r,a,d])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(f0*r*1.03,t);o.frequency.exponentialRampToValueAtTime(f0*r,t+.09);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel*a*.5,t+.006);g.gain.setTargetAtTime(0,t+.012,Math.min(d,dur+.4)/4);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.1)});
  const s=ctx.createBufferSource();s.buffer=noise;const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=380;const g=ctx.createGain();g.gain.setValueAtTime(vel*.5,t);g.gain.exponentialRampToValueAtTime(.0005,t+.07);s.connect(f);f.connect(g);g.connect(bus);s.start(t);s.stop(t+.09)}
function anvil(bus,t,m,vel){const f0=hz(m);[[1,1,.9],[2.76,.55,.45],[5.4,.32,.22],[8.93,.18,.12],[13.3,.08,.07]].forEach(([r,a,d])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=f0*r;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel*a*.14,t+.0015);g.gain.setTargetAtTime(0,t+.003,d/4);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.5+.05)});
  const s=ctx.createBufferSource();s.buffer=noise;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=Math.min(9000,f0*3);f.Q.value=1.2;const g=ctx.createGain();g.gain.setValueAtTime(vel*.18,t);g.gain.exponentialRampToValueAtTime(.0005,t+.03);s.connect(f);f.connect(g);g.connect(bus);s.start(t);s.stop(t+.05)}
/* ===== 取樣播放器 ===== */
const ARR=window.VIBE_BGM_ARR||{},BUF=new Map(),LD={};let IDX=null;
const LAY={piano:v=>v<=31?1:v<=63?2:v<=95?3:4,guitar:v=>v<=42?1:v<=85?2:3,bass:v=>v<=50?'p':v<=110?'f':'fff'};
const REL={piano:.5,guitar:1.1,bass:.09};
function base(){return new URL('bgm/',document.baseURI).href}
function loadInst(inst){if(LD[inst])return LD[inst];
  LD[inst]=(IDX?Promise.resolve(IDX):fetch(base()+'index.json').then(r=>{if(!r.ok)throw new Error('index '+r.status);return r.json()}).then(j=>IDX=j))
   .then(I=>{const e=I[inst];if(!e)throw new Error('no '+inst);return fetch(base()+inst+'.webm?h='+e.h).then(r=>{if(!r.ok)throw new Error(inst+' '+r.status);return r.arrayBuffer()}).then(ab=>Promise.all(Object.entries(e.z).map(([k,z])=>ctx.decodeAudioData(ab.slice(z[0],z[0]+z[1])).then(b=>BUF.set(inst+':'+k,[b,z[2]])))))})
   .catch(err=>{LD[inst]=null;throw err});return LD[inst]}
function needInst(m){const a=ARR[m];return a?Object.keys(a.tracks).filter(i=>['piano','guitar','bass'].indexOf(i)>=0):[]}
const PADV={wave:'sawtooth',det:[-9,0,9],cut:950,fe:.4,q:.6,a:.9,d:1.2,s:.8,r:1.1,vol:.05};/* v199zzzzzz67：編曲用合成 Pad（AUDAX、EX 空間層） */
function ready(m){const a=ARR[m];if(!a)return Promise.resolve(false);return Promise.all(needInst(m).map(loadInst)).then(()=>true)}
let rrN=0;
const LAYS={piano:L=>[L,L-1,L+1,L-2,L+2,L-3,L+3],guitar:L=>[L,L-1,L+1,L-2,L+2],bass:L=>[L,'f','p','fff']};/* v199zzzzzz64：缺層回退順序 */
function sPlay(pl,inst,t,m,dur,vel){const L=LAY[inst](vel);let hit=null;if(inst==='bass')rrN++;
  find:for(const l of LAYS[inst](L))for(const d of [0,1,-1,2,-2,3,-3]){const k=inst+':'+l+'_'+(m+d);hit=inst==='bass'?(BUF.get(k+'#'+(1+rrN%2))||BUF.get(k+'#1')):BUF.get(k);if(hit)break find}
  if(!hit)return;pl.vE=pl.vE.filter(x=>x>t);if(pl.vE.length>56)return;const [b,root]=hit,rate=Math.pow(2,(m-root)/12);
  const db=inst==='piano'?((vel-(L*32-16))/32)*4:inst==='guitar'?-7*(1-vel/127):-5*(1-vel/127);
  const s=ctx.createBufferSource();s.buffer=b;s.playbackRate.value=rate;const g=ctx.createGain(),pk=Math.pow(10,db/20),off=t+dur,rel=REL[inst];
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(pk,t+.004);g.gain.setValueAtTime(pk,Math.max(t+.005,off));g.gain.setTargetAtTime(0,off,rel/3);
  s.connect(g);g.connect(pl.ib[inst]);const end=Math.min(t+b.duration/rate,off+rel*3);s.start(t);s.stop(end);pl.vE.push(end);s.onended=()=>{try{g.disconnect()}catch(e){}}}/* 發聲數以結束時間計，不依賴 onended */
function arrSong(m){const a=ARR[m],ev=[],n=(a.beats?Math.round(a.beats*4):a.bars*SPB),R=rng(9000+a.bpm);for(let i=0;i<n;i++)ev.push([]);
  const sd=60/a.bpm/4;/* v199zzzzzz74：不在 16 分格線上的拍位（三連音）以時間微移補足 */
  Object.entries(a.tracks).forEach(([inst,list])=>list.forEach(e=>{const ex=((e[0]-1)*4+e[1])*4,st=Math.round(ex),off=(ex-st)*sd;if(st<0||st>=n)return;
    ev[st].push(inst==='shk'?['shk',0,1,e[4]/127,off]:inst==='kick'?['smk',0,1,e[4]/127,off]:inst==='pad'?['pad',e[2],e[3],e[4]/127,off]:inst==='tim'?['tim',e[2],e[3],e[4]/127,off]:inst==='anv'?['anv',e[2],e[3],e[4]/127,off]:['s',inst,e[2],e[3],Math.max(1,Math.min(127,e[4]+Math.round((R()-.5)*6))),(R()-.5)*.01+off])}));return ev}
const SONGS={};function song(m){return SONGS[m]||(SONGS[m]=compose(PERSONA[m]||PERSONA['325']))}
/* ===== v199zzzzzz73：程序化流水聲（使用者 2026-11-17 選定先做；不需取樣、檔案零增加）=====
   兩層：①水流底噪＝兩路雜訊（左右各一、相位不同的慢速 LFO 推動帶通中心與音量）；②水泡＝短正弦、音高 40–90 ms 內上滑約 6 成、指數衰減、隨機左右，隨機間隔（偶爾成串）。
   跟著車款播放器一起淡入淡出；量依車款人設（WAT）。音量滑桿只控制整體，水聲比例固定。 */
const WAT={'325':.5,'64':.5,'audax':.5,'ili':.5,'ss':.5,'ex':.5}/* v199zzzzzz97：《行星組曲》第一階段六款同量（決策稿：統一音量與混音標準；流水聲為獨立 Ambient Layer） */;let wNoise=null;
function wBuf(){if(wNoise&&wNoise.sampleRate===ctx.sampleRate)return wNoise;const n=ctx.sampleRate*3,b=ctx.createBuffer(2,n,ctx.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c),r=rng(777+c);let lp=0;for(let i=0;i<n;i++){lp=lp*.6+(r()*2-1)*.4;d[i]=lp}
  const f=Math.floor(ctx.sampleRate*.05);for(let i=0;i<f;i++){const k=i/f;d[n-f+i]=d[n-f+i]*(1-k)+d[i]*k}}/* 頭尾交叉淡化，循環無接縫 */return wNoise=b}
function water(pl,amt,t0){if(!amt)return;const wg=ctx.createGain();wg.gain.value=amt;wg.connect(pl.bus);const ws=ctx.createGain();ws.gain.value=.12;wg.connect(ws);ws.connect(verb);pl.wat={g:wg,next:t0,nb:t0+.6+Math.random()*1.5,amt,src:[]};
  [[-.6,.11,1050,0],[.6,.17,1350,1.7]].forEach(([pan,lf,fc,ph])=>{const s=ctx.createBufferSource();s.buffer=wBuf();s.loop=true;
    const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fc;bp.Q.value=.7;const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3800;
    const a=ctx.createGain();a.gain.value=.068;/* v76 加強 */const o=ctx.createOscillator();o.frequency.value=lf;const od=ctx.createGain();od.gain.value=fc*.35;o.connect(od);od.connect(bp.frequency);
    const o2=ctx.createOscillator();o2.frequency.value=lf*1.73;const od2=ctx.createGain();od2.gain.value=.018;o2.connect(od2);od2.connect(a.gain);
    s.connect(bp);bp.connect(lp);lp.connect(a);let out=a;if(ctx.createStereoPanner){const pn=ctx.createStereoPanner();pn.pan.value=pan;a.connect(pn);out=pn}out.connect(wg);
    s.start(t0,ph);o.start(t0);o2.start(t0);pl.wat.src.push(s,o,o2)})}
function bubbles(pl,until){const w=pl.wat;if(!w)return;const R=Math.random;while(w.next<until){const t=w.next,n=R()<.18?2+Math.floor(R()*3):1;
    for(let k=0;k<n;k++){const tt=t+k*(.02+R()*.05),f0=900*Math.pow(3.2,R()),d=.04+R()*.05,o=ctx.createOscillator(),g=ctx.createGain(),pk=(.008+R()*.016);/* v76 加強 */
      o.frequency.setValueAtTime(f0,tt);o.frequency.linearRampToValueAtTime(f0*(1.45+R()*.3),tt+d);g.gain.setValueAtTime(0,tt);g.gain.linearRampToValueAtTime(pk,tt+.002);g.gain.setTargetAtTime(0,tt+.004,d/3);
      let out=g;if(ctx.createStereoPanner){const pn=ctx.createStereoPanner();pn.pan.value=R()*1.6-.8;g.connect(pn);out=pn}o.connect(g);out.connect(w.g);o.start(tt);o.stop(tt+d*2.5)}
    w.next=t-Math.log(1-R())/(6+12*w.amt)}
  /* v199zzzzzz76：程序化鳥鳴（使用者 2026-11-17 要求加強背景流水鳥鳴）——每 2.5–7 s 一句，2–6 個快速滑音，偶爾顫音；左右隨機、帶少量殘響 */
  while(w.nb<until){const t=w.nb,n=2+Math.floor(R()*5),base=2500+R()*2300,tr=R()<.3,pan=R()*1.6-.8;let tt=t;
    for(let k=0;k<n;k++){const d=tr?.035+R()*.02:.05+R()*.07,f0=base*(.85+R()*.35),f1=f0*(R()<.5?.62+R()*.2:1.15+R()*.3),o=ctx.createOscillator(),g=ctx.createGain(),pk=(.03+R()*.025)*(k===0?.7:1);
      o.frequency.setValueAtTime(f0,tt);o.frequency.exponentialRampToValueAtTime(f1,tt+d);g.gain.setValueAtTime(0,tt);g.gain.linearRampToValueAtTime(pk,tt+.008);g.gain.setTargetAtTime(0,tt+d*.6,d/4);
      let out=g;if(ctx.createStereoPanner){const pn=ctx.createStereoPanner();pn.pan.value=pan;g.connect(pn);out=pn}o.connect(g);out.connect(w.g);o.start(tt);o.stop(tt+d*1.8);tt+=d+(tr?.012:.03+R()*.08)}
    w.nb=t+2.5+R()*4.5}}
function wStop(pl,t){if(pl.wat)pl.wat.src.forEach(s=>{try{s.stop(t)}catch(e){}})}
function player(m,smp){const p=PERSONA[m]||PERSONA['325'],bus=ctx.createGain(),dry=ctx.createGain(),wet=ctx.createGain();bus.gain.value=0;dry.gain.value=1;
  if(smp){const a=ARR[m],ib={};wet.gain.value=0;bus.connect(master);Object.keys(a.tracks).forEach(i=>{const g=ctx.createGain(),sd=ctx.createGain();g.gain.value=a.gain[i]||1;sd.gain.value=a.send[i]||0;if(a.pan&&a.pan[i]&&ctx.createStereoPanner){const pn=ctx.createStereoPanner();pn.pan.value=a.pan[i];g.gain.value*=Math.SQRT2;/* 等功率聲像會讓單聲道取樣降 3 dB，補回 */g.connect(pn);pn.connect(bus)}else g.connect(bus);/* v199zzzzzz63：輕微左右分離 */g.connect(sd);sd.connect(verb);ib[i]=g});
    const P={m,p:{bpm:a.bpm,swing:a.swing||0,hat:{vol:.05}},ev:SONGS['a'+m]||(SONGS['a'+m]=arrSong(m)),bus,dry,wet,ib,vE:[],smp:1,len:(a.beats?Math.round(a.beats*4):a.bars*SPB),step:0,next:ctx.currentTime+.08,dead:0};water(P,WAT[m]||0,ctx.currentTime+.05);return P}
  wet.gain.value=p.rv;bus.connect(dry);bus.connect(wet);dry.connect(master);wet.connect(verb);return{m,p,ev:song(m),bus,dry,wet,len:LOOP,step:0,next:ctx.currentTime+.08,dead:0}}
function fade(pl,to,sec){const g=pl.bus.gain,t=ctx.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(to,t+sec)}
function tick(){if(!ctx)return;const now=ctx.currentTime;
  players=players.filter(pl=>{if(pl.dead&&now>pl.dead){wStop(pl,now);try{pl.bus.disconnect()}catch(e){}return false}return true});players.forEach(pl=>{if(!pl.dead)bubbles(pl,now+.3)});
  players.forEach(pl=>{const sd=60/pl.p.bpm/4;if(pl.dead)return;
    if(pl.next<now-.3){pl.next=now+.05}/* 背景回來不補播 */
    while(pl.next<now+1.2){/* v199zzzzzz62：預排 1.2 s，主執行緒卡頓（換車款、建貼圖）也不斷音 */const st=pl.step%pl.len,t=pl.next+((st%4===2)?pl.p.swing*sd:0);
      pl.ev[st].forEach(e=>{const v=e[0];if(v==='s')sPlay(pl,e[1],t+e[5],e[2],e[3]*sd*4,e[4]);else if(v==='shk')hat(pl.ib.shk,t+(e[4]||0),e[3],.06);else if(v==='smk')kick(pl.ib.kick,t+(e[4]||0),e[3],.5,false);else if(v==='pad')tone(pl.ib.pad,t+(e[4]||0),e[1],e[2]*sd*4,e[3],PADV);else if(v==='tim')timp(pl.ib.tim,t+e[4],e[1],e[2]*sd*4,e[3]);else if(v==='anv')anvil(pl.ib.anv,t+e[4],e[1],e[3]);else if(v==='hat')hat(pl.bus,t,e[3],pl.p.hat.vol);else if(v==='kick'||v==='tom')kick(pl.bus,t,e[3],pl.p.kick.vol,v==='tom');else tone(pl.bus,t,e[1],e[2]*sd*.98,e[3],pl.p[v])});
      pl.step++;pl.next+=sd}})}
let want=null;
function startModel(m){if(!ctx)return;if(cur&&cur.m===m&&!cur.dead)return;want=m;
  if(ARR[m]){ui('ld');ready(m).then(()=>{if(want===m&&on)swap(m,true);ui()},err=>{console.warn('bgm samples',err);lastErr='取樣 '+(err&&err.message||err);if(want===m&&on)swap(m,false);ui()});return}
  swap(m,false)}
/* v199zzzzzz99（使用者 2026-11-18）：高潮很快就到，開頭音量要節制再回歸正常；切車款改「先收後起」。
   開頭包絡只套在新 player 的 bus 上一次（只管起聲後的第一遍，循環回頭不再壓低）：0 → INTRO0（0.5 s）→ 1（再 INTRO_S 秒線性）。
   切車款：舊曲 0.6 s 收到 0（0.8 s 後回收），新曲晚 0.35 s 才起聲＋同一條開頭包絡。不再 1.6 s 重疊交叉淡化——各車款調性／速度不同，重疊時兩首會互相打架，Saturn 又是 fff 開場。 */
const INTRO0=.30,INTRO_S=6,OUT_S=.6,GAP_S=.35;
function intro(pl,t0){const g=pl.bus.gain;g.cancelScheduledValues(t0);g.setValueAtTime(0,t0);g.linearRampToValueAtTime(INTRO0,t0+.5);g.linearRampToValueAtTime(1,t0+.5+INTRO_S)}
function swap(m,smp){if(cur&&cur.m===m&&!cur.dead)return;const old=cur,t=ctx.currentTime,d=old?GAP_S:0;
  if(old){fade(old,0,OUT_S);old.dead=t+OUT_S+.2}
  cur=player(m,smp);players.push(cur);cur.next=t+.08+d;intro(cur,t+d)}
/* v199zzzzzz65：行動版解鎖——iOS 靜音鍵下 Web Audio 預設被靜音，改宣告為播放類；點擊當下同步送出一個空白取樣並 resume（部分 WebView 只認同步呼叫） */
let st='關',lastErr='';function unlock(){try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback'}catch(e){}try{const b=ctx.createBuffer(1,1,22050),s=ctx.createBufferSource();s.buffer=b;s.connect(ctx.destination);s.start(0)}catch(e){}try{if(ctx.state!=='running')ctx.resume().catch(e=>{lastErr='resume '+e.name})}catch(e){lastErr='resume '+e.name}}
/* v199zzzzzz68：Firefox Android 回報按鈕後仍 suspended——在非使用者啟動當下建立的 AudioContext 之後 resume 也不放行。開音樂時若現有 context 不在 running，關掉重建（取樣 AudioBuffer 可跨 context 沿用） */
function fresh(){if(ctx&&ctx.state!=='running'){try{ctx.close()}catch(e){}ctx=null;cur=null;players=[]}}
function begin(){if(!ensure())return false;unlock();const go=()=>{startModel(model);if(!timer)timer=setInterval(tick,100);tick()};
  if(ctx.state!=='running')ctx.resume().then(go,()=>{});else go();return true}
function halt(){if(!ctx)return;players.forEach(pl=>{fade(pl,0,.4);pl.dead=ctx.currentTime+.5});cur=null;setTimeout(()=>{if(!on&&ctx&&ctx.state==='running')ctx.suspend()},700)}
function setOn(v,user){on=!!v;try{localStorage.setItem('vibe.bgm',on?'1':'0')}catch(e){}armed=false;if(on){if(user)begin();else armed=true}else halt();ui()}
/* ===== 介面：頁首音符鈕（開時旁邊出現音量滑桿） ===== */
const hd=document.getElementById('stage');let btn=null,vr=null;/* v199zzzzzz64：移入 3D，播放鈕左側 */
if(hd){const w=document.createElement('div');w.className='bgm';w.id='bgmW';w.innerHTML='<button type="button" class="btn bgm-btn" id="bgmBtn" aria-pressed="false" aria-label="背景音樂" title="背景音樂"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor"/><circle cx="17.5" cy="16" r="2.5" fill="currentColor"/><path class="bgm-x" d="M3 3l18 18"/></svg></button><span class="bgm-v"><input type="range" id="bgmVol" min="0" max="100" step="5" aria-label="音量" title="音量"></span>';
  hd.appendChild(w);btn=w.querySelector('button');vr=w.querySelector('input');vr.value=Math.round(vol*100);
  btn.addEventListener('click',()=>{const stuck=on&&!armed&&(!ctx||ctx.state!=='running');if(armed||!on||stuck)fresh();if(armed||stuck){armed=false;begin();ui();return}setOn(!on,true)});/* v199zzzzzz67：記住「開」但尚未起聲時，點鈕＝起聲（原本會變成關） */
  ['pointerdown','touchstart','mousedown'].forEach(e=>w.addEventListener(e,ev=>ev.stopPropagation(),{passive:true}));/* 拖音量不轉 3D */vr.addEventListener('input',()=>{vol=vr.value/100;try{localStorage.setItem('vibe.bgmv',String(vol))}catch(e){}if(master)master.gain.setTargetAtTime(vol*vol,ctx.currentTime,.05)})}
function ui(st){if(!btn)return;const lit=on&&!armed;/* v199zzzzzz67：尚未真正起聲前顯示為關（不出音量滑桿） */btn.parentNode.dataset.ld=st==='ld'?'1':'0';btn.setAttribute('aria-pressed',String(lit));btn.parentNode.dataset.on=lit?'1':'0';btn.title=lit?'背景音樂：開':'背景音樂：關'}
/* 存過「開」：等使用者第一次互動才起聲 */
/* v199zzzzzz66：只用瀏覽器認定的「使用者啟動」事件起聲——Firefox 對觸控的 pointerdown 不給權限，在此建立的 AudioContext 會一直靜音 */['touchend','mouseup','keydown','click'].forEach(e=>window.addEventListener(e,()=>{if(on&&!armed&&ctx&&ctx.state==='suspended'&&!document.hidden)unlock()},{capture:true,passive:true}));/* 開著卻被擋住時，之後每次操作都再請求一次 */
['touchend','mouseup','keydown','click'].forEach(e=>window.addEventListener(e,ev=>{if(armed&&!(ev.target&&ev.target.closest&&ev.target.closest('#bgmBtn'))){armed=false;begin();ui()}},{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{if(!ctx||!on)return;if(document.hidden)ctx.suspend();else ctx.resume()});
let sv=null;try{sv=localStorage.getItem('vibe.bgm')}catch(e){}
try{if(window.VIBE_API)model=VIBE_API.model()||model}catch(e){}
if(sv==='1')setOn(true,false);else ui();
window.__bgmModel=m=>{model=m;if(on&&ctx)startModel(m)};
async function offline(m,loops){ensure();await ready(m);const sv=[ctx,master,comp,verb],a=ARR[m],sd=60/a.bpm/4,len=(a.beats?Math.round(a.beats*4):a.bars*SPB),T=len*sd*(loops||1)+3;
  const oc=new OfflineAudioContext(2,Math.ceil(T*48000),48000);ctx=oc;chain(oc);master.gain.value=vol*vol;
  try{const pl=player(m,true);pl.bus.gain.value=1;bubbles(pl,T-1);for(let s=0;s<len*(loops||1);s++){const st=s%len,t0=.05+s*sd+((st%4===2)?pl.p.swing*sd:0);
      pl.ev[st].forEach(e=>{if(e[0]==='s')sPlay(pl,e[1],Math.max(0,t0+e[5]),e[2],e[3]*sd*4,e[4]);else if(e[0]==='shk')hat(pl.ib.shk,t0+e[4],e[3],.06);else if(e[0]==='smk')kick(pl.ib.kick,t0+e[4],e[3],.5,false);else if(e[0]==='pad')tone(pl.ib.pad,t0+e[4],e[1],e[2]*sd*4,e[3],PADV);else if(e[0]==='tim')timp(pl.ib.tim,t0+e[4],e[1],e[2]*sd*4,e[3]);else if(e[0]==='anv')anvil(pl.ib.anv,t0+e[4],e[1],e[3])})}
    return await oc.startRendering()}finally{[ctx,master,comp,verb]=sv}}
window.__bgmS=()=>(on?'開':'關')+(ctx?'／'+ctx.state:'／未建')+(cur?(cur.smp?'／取樣':'／合成')+' '+cur.m:'')+(lastErr?'／'+lastErr:'');
window.VIBE_BGM={ARR,BUF,offline,get _n(){return{ctx,comp}},on:()=>setOn(true,true),off:()=>setOn(false),get state(){return{on,model,persona:(PERSONA[model]||{}).name,ctx:ctx&&ctx.state,players:players.length}},PERSONA,compose};
})();
