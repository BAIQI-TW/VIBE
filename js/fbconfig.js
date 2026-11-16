/* v199zzzzzz58：VIBE 雲端保存設定（由 RKL 填寫；程式不需改）
   enabled 為 false、config.apiKey 空白、或網址主機不在 hosts 內時，前台完全不出現登入入口（Artifact 單檔版因此不顯示）。
   config 為 Firebase 主控台「專案設定 → 你的應用程式 → Web」的設定物件；Web API Key 不是私鑰，可公開，存取由 firestore.rules 控制。
   notice 與 marketing 為個資告知草稿，正式上線前須由 RKL 依實際營運流程確認文字；改文字時一併改 ver（同意紀錄會存版本）。 */
window.VIBE_FB={
  enabled:true,/* v199zzzzzz59：使用者 2026-11-16 提供 Firebase 專案 vibe-7eace 設定並開啟 */
  hosts:['baiqi-tw.github.io'],
  config:{apiKey:'AIzaSyB6CQg1D0MitVZInaauQK_bDiM2MgaaAtk',authDomain:'vibe-7eace.firebaseapp.com',projectId:'vibe-7eace',storageBucket:'vibe-7eace.firebasestorage.app',messagingSenderId:'1064028927340',appId:'1:1064028927340:web:9168079cba5ab4c756af49'},/* measurementId 未用：不載入 Analytics */
  emailLinkUrl:'https://baiqi-tw.github.io/VIBE/',
  notice:{
    ver:'2026-11-16-v2',
    title:'登入以保存配置',
    body:[
      '佰奇創意機械股份有限公司（RIKULAU）會蒐集您的 Email、帳號識別碼，以及保存的配置與選擇紀錄（車款、尺寸、塗裝、加購）。',
      '用途：保存與跨裝置載入配置，並分析選擇以改進產品與服務。',
      '資料存放於 Google Firebase（可能位於台灣境外），保存至您要求刪除為止。',
      '查詢、更正、停止使用或刪除，請透過官網 rikulau.com 與我們聯繫。',
      '不登入不影響 3D 幾何手冊的其他功能。'
    ],
    agree:'我同意上述說明'
  },
  marketing:{ver:'2026-11-16-v2',label:'接收 RIKULAU 新品與活動資訊（可隨時取消）',preset:true}/* v199zzzzzz60：使用者 2026-11-16 指示兩個選項預設打勾；同意紀錄會記 preset */
};
