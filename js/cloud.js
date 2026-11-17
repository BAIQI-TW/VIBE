/* v199zzzzzz58：雲端保存（RKL_Live_Showcase_2026-11-14.md §14；使用者 2026-11-16「執行 Firebase 導入」）
   - GitHub Pages 靜態前端＋Firebase Authentication（Google、Email 登入連結）＋Cloud Firestore；不改 Hosting。
   - 非強制：不登入可完整使用。入口在「客製服務」下方 3D 設定檔區塊。先顯示個資告知，勾選同意才可選登入方式；行銷同意另勾、不預設勾選。
   - Firebase SDK（js/fb.js，13.3.0 子集）只在按「登入」或開啟 Email 登入連結時才載入。
   - 資料：users/{uid}（email、告知與行銷同意的版本與時間、最後登入）、users/{uid}/configs（3D 設定檔 JSON，沿用 cfgGather／cfgApply）、
     users/{uid}/events（重要選擇：車款、尺寸、表面處理、車架顏色、Logo、頭碗與小件顏色、傳動系列、加購；保存、載入、登入）。不記相機與拖曳中間值。
   - 權限見 firestore.rules：只能讀寫自己的 uid；事件只可新增。 */
(function(){
'use strict';
const C=window.VIBE_FB;
if(!C||!C.enabled||!C.config||!C.config.apiKey||(C.hosts||[]).indexOf(location.hostname)<0)return;
const box=document.getElementById('cfgBox');if(!box||!window.VIBE_API)return;
const API=window.VIBE_API,LS={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let F=null,app=null,auth=null,db=null,user=null,loading=null;
function sdk(){if(loading)return loading;loading=import(new URL('js/fb.js?v=13.3.0',document.baseURI).href).then(m=>{F=m;app=F.initializeApp(C.config);auth=F.getAuth(app);auth.languageCode='zh-TW';
  db=F.initializeFirestore(app,{ignoreUndefinedProperties:true});F.onAuthStateChanged(auth,onUser);return m});return loading}
/* ===== 介面 ===== */
const wrap=document.createElement('div');wrap.id='cloudBox';wrap.style.cssText='margin-top:16px;padding-top:12px;border-top:1px dashed var(--border-soft)';
wrap.innerHTML='<h2>雲端保存</h2><div id="clOut"><div class="row"><button class="btn" id="clIn" type="button">登入以保存配置</button></div></div>'
 +'<div id="clIn2" hidden><p class="fine" id="clWho"></p><div class="row"><input id="clName" maxlength="40" placeholder="配置名稱" aria-label="配置名稱" style="flex:1;min-width:0;font:inherit;font-size:var(--fs-sm);padding:6px 10px;border-radius:var(--r-pill);border:1px solid var(--border-soft);background:transparent;color:var(--text-primary)"><button class="btn" id="clSave" type="button">保存</button></div><ul id="clList" class="cl-list"></ul><div class="row"><button class="btn" id="clOutBtn" type="button">登出</button></div></div>'
 +'<p class="fine" id="clMsg" role="status" aria-live="polite"></p>';
box.appendChild(wrap);
const $=id=>document.getElementById(id),say=t=>{$('clMsg').textContent=t||''};
/* 告知與登入方式 */
const md=document.createElement('div');md.className='scrim';md.id='clModal';md.hidden=true;
md.innerHTML='<div class="card modal cl-modal" role="dialog" aria-modal="true" aria-labelledby="clT" style="overflow:auto"><h3 id="clT">'+esc(C.notice.title)+'</h3>'
 +'<div class="cl-row"><button class="btn" id="clG" type="button">以 Google 登入</button><button class="btn" id="clX" type="button">取消</button></div>'
 +'<div class="cl-row"><input id="clEm" type="email" autocomplete="email" placeholder="Email" aria-label="Email"><button class="btn" id="clE" type="button">寄送登入連結</button></div>'
 +'<p class="fine" id="clMm" role="status" aria-live="polite"></p>'
 +'<ul class="cl-notice">'+C.notice.body.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul>'
 +'<label class="cl-ck"><input type="checkbox" id="clAg"> '+esc(C.notice.agree)+'</label><label class="cl-ck"><input type="checkbox" id="clMk"> '+esc(C.marketing.label)+'</label></div>';
document.body.appendChild(md);
const sm=t=>{$('clMm').textContent=t||''};
const open=()=>{md.hidden=false;sm('');$('clAg').checked=!!C.notice.agreePreset;$('clMk').checked=!!C.marketing.preset;/* v199zzzzzz60：預設打勾（使用者 2026-11-16） */sync();sdk().catch(()=>sm('雲端服務暫時無法連線'))},close=()=>{md.hidden=true};
const sync=()=>{const ok=$('clAg').checked;['clG','clE','clEm'].forEach(i=>$(i).disabled=!ok)};
$('clAg').addEventListener('change',sync);$('clX').onclick=close;md.addEventListener('click',e=>{if(e.target===md)close()});
$('clIn').onclick=open;
const consent=()=>({ver:C.notice.ver,mk:$('clMk').checked,mver:C.marketing.ver,pre:!!C.marketing.preset,at:Date.now()});
$('clG').onclick=async()=>{if(!$('clAg').checked)return;sm('');try{await sdk();LS.set('vibe.fb.consent',JSON.stringify(consent()));await F.signInWithPopup(auth,new F.GoogleAuthProvider());close()}
  catch(e){const c=e&&e.code||'';LS.set('vibe.fb.consent',null);
    sm(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request'?'':c==='auth/popup-blocked'?'瀏覽器擋下了登入視窗，請允許彈出視窗或改用 Email 登入連結':c==='auth/account-exists-with-different-credential'?'這個 Email 已用登入連結註冊，請改用下方「寄送登入連結」':'登入失敗（'+c+'）')}};
$('clE').onclick=async()=>{const em=$('clEm').value.trim();if(!$('clAg').checked)return;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){sm('請輸入有效的 Email');return}
  try{await sdk();await F.sendSignInLinkToEmail(auth,em,{url:C.emailLinkUrl,handleCodeInApp:true});LS.set('vibe.fb.email',em);LS.set('vibe.fb.consent',JSON.stringify(consent()));sm('已寄出登入連結到 '+em+'，請在此裝置開啟信中的連結')}
  catch(e){sm('寄送失敗（'+(e&&e.code||e)+'）')}};
/* Email 登入連結回到頁面 */
if(/[?&]oobCode=/.test(location.search)&&/[?&]mode=signIn/.test(location.search)){sdk().then(async()=>{if(!F.isSignInWithEmailLink(auth,location.href))return;
  let em=LS.get('vibe.fb.email');if(!em)em=window.prompt('請輸入收到登入連結的 Email','')||'';if(!em)return;
  if(!LS.get('vibe.fb.consent')){say('在其他裝置開啟連結時，請先在本頁按「登入以保存配置」閱讀說明並同意');return}
  try{await F.signInWithEmailLink(auth,em,location.href);LS.set('vibe.fb.email',null);history.replaceState(null,'',location.pathname)}catch(e){say('登入連結無效或已過期（'+(e&&e.code||e)+'）')}}).catch(()=>{})}
/* 已登入過：背景載入 SDK 以恢復登入狀態 */
else if(LS.get('vibe.fb.seen')==='1'){const go=()=>sdk().catch(()=>{});('requestIdleCallback' in window)?requestIdleCallback(go,{timeout:8000}):setTimeout(go,4000)}
/* ===== 登入狀態 ===== */
async function onUser(u){user=u;$('clOut').hidden=!!u;$('clIn2').hidden=!u;if(!u){LS.set('vibe.fb.seen',null);return}
  LS.set('vibe.fb.seen','1');$('clWho').textContent=u.email||'';const ref=F.doc(db,'users',u.uid),pc=LS.get('vibe.fb.consent');
  try{const d={email:u.email||null,lastSeen:F.serverTimestamp()};
    if(pc){const c=JSON.parse(pc);d.consent={ver:c.ver,at:new Date(c.at)};d.marketing={opt:!!c.mk,ver:c.mver,preset:!!c.pre,at:new Date(c.at)};LS.set('vibe.fb.consent',null);evt('login',{m:u.providerData.map(p=>p.providerId).join(',')})}
    await F.setDoc(ref,d,{merge:true})}catch(e){console.warn('cloud profile',e)}
  list();last=summary()}
$('clOutBtn').onclick=async()=>{try{await F.signOut(auth);say('已登出')}catch(e){}};
/* ===== 配置 ===== */
async function list(){if(!user)return;const ul=$('clList');try{const q=F.query(F.collection(db,'users',user.uid,'configs'),F.orderBy('updatedAt','desc'),F.limit(20)),s=await F.getDocs(q);
  ul.innerHTML='';s.forEach(d=>{const v=d.data(),li=document.createElement('li'),t=v.updatedAt&&v.updatedAt.toDate?v.updatedAt.toDate():null;
    li.innerHTML='<span class="cl-n">'+esc(v.name||'未命名')+'</span><span class="cl-d">'+esc(v.model||'')+(t?'｜'+t.toLocaleDateString():'')+'</span><button class="btn" type="button" data-a="ld">載入</button><button class="btn" type="button" data-a="rm">刪除</button>';
    li.querySelector('[data-a=ld]').onclick=()=>load(v);li.querySelector('[data-a=rm]').onclick=()=>rm(d.id,v.name);ul.appendChild(li)});
  if(!s.size)ul.innerHTML='<li class="fine">尚無保存的配置</li>'}catch(e){say('讀取配置失敗（'+(e&&e.code||e)+'）')}}
$('clSave').onclick=async()=>{if(!user)return;const J=API.gather(),js=JSON.stringify(J),nm=($('clName').value.trim()||(J.車款.model+' '+J.車款.size)).slice(0,40);
  if(js.length>190000){say('配置過大，無法保存');return}
  try{await F.addDoc(F.collection(db,'users',user.uid,'configs'),{name:nm,schema:J.schema,ver:J.版次,model:String(J.車款.model),json:js,createdAt:F.serverTimestamp(),updatedAt:F.serverTimestamp()});
    $('clName').value='';say('已保存：'+nm);evt('cfg_save',{model:J.車款.model,size:J.車款.size});list()}catch(e){say('保存失敗（'+(e&&e.code||e)+'）')}};
function load(v){let J;try{J=JSON.parse(v.json)}catch(e){say('配置內容損壞');return}
  try{const sk=API.apply(J);say('已載入：'+(v.name||'')+(sk&&sk.length?'（略過 '+sk.length+' 項無效設定）':''));evt('cfg_load',{model:J.車款&&J.車款.model});last=summary()}catch(e){say('載入失敗：'+(e&&e.message||e))}}
async function rm(id,nm){if(!window.confirm('刪除「'+(nm||'未命名')+'」？'))return;try{await F.deleteDoc(F.doc(db,'users',user.uid,'configs',id));list()}catch(e){say('刪除失敗（'+(e&&e.code||e)+'）')}}
/* ===== 重要選擇事件：登入中每 4 秒比對摘要，有變才記；每次瀏覽最多 200 筆 ===== */
let last=null,sent=0;const Q=[];
function summary(){try{const J=API.gather(),c=J.車款,p=J.塗裝,a=J.加購;return{model:c.model,size:c.size,tw:c.tw&&c.tw[c.model],hs:c.hs&&c.hs[c.model],fin:p.fin,paint:p.paint,anoM:p.anoM,anoG:p.anoG,spl:p.splI,dt:p.dtCol,logo:p.logoCol,hsCol:p.hsCol,sm:p.smCol,ser:a.ser,ti:JSON.stringify(a.ti),bk:JSON.stringify(a.bk)}}catch(e){return null}}
function evt(type,data){if(!user||sent>=200)return;sent++;Q.push({t:F.serverTimestamp(),type,data:data||{},app:(API.ver&&API.ver())||''})}
setInterval(()=>{if(!user)return;const s=summary();if(!s)return;if(last){const ch={};let n=0;for(const k in s)if(s[k]!==last[k]){ch[k]=[last[k]===undefined?null:last[k],s[k]===undefined?null:s[k]];n++}if(n)evt('select',ch)}last=s},4000);
setInterval(()=>{if(!user||!Q.length)return;const col=F.collection(db,'users',user.uid,'events');Q.splice(0,10).forEach(e=>F.addDoc(col,e).catch(err=>console.warn('cloud evt',err&&err.code)))},10000);
window.addEventListener('pagehide',()=>{if(!user||!Q.length)return;const col=F.collection(db,'users',user.uid,'events');Q.splice(0).forEach(e=>F.addDoc(col,e).catch(()=>{}))});
/* v199zzzzzz73：進入客製服務就在背景載入 SDK；客人第一次在客製服務改動後約 0.8 秒跳出登入說明（未登入、未曾登入、此瀏覽器未問過才跳；使用者 2026-11-17 選定） */
(function(){const tb=document.querySelector('.tab[data-tab="custom"]'),pn=document.querySelector('.panel[data-panel="custom"]');if(!tb||!pn)return;
  tb.addEventListener('click',()=>{const go=()=>sdk().catch(()=>{});('requestIdleCallback' in window)?requestIdleCallback(go,{timeout:3000}):setTimeout(go,800)});
  let asked=LS.get('vibe.fb.ask')==='1'||LS.get('vibe.fb.seen')==='1';const hit=e=>{if(asked||user||!md.hidden)return;const t=e.target;if(!(t&&t.closest&&t.closest('select,input,button,[role="button"],.chip')))return;if(t.closest('#cloudBox,[role="tab"],[role="tablist"]'))return;/* 切子分頁不算改動 */
    asked=true;LS.set('vibe.fb.ask','1');setTimeout(()=>{if(!user&&md.hidden)open()},800)};pn.addEventListener('change',hit,true);pn.addEventListener('click',hit,true)})();
window.VIBE_CLOUD={get user(){return user&&{uid:user.uid,email:user.email}},sdk};
})();
