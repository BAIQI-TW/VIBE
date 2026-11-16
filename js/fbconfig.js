/* v199zzzzzz58：VIBE 雲端保存設定（由 RKL 填寫；程式不需改）
   enabled 為 false、config.apiKey 空白、或網址主機不在 hosts 內時，前台完全不出現登入入口（Artifact 單檔版因此不顯示）。
   config 為 Firebase 主控台「專案設定 → 你的應用程式 → Web」的設定物件；Web API Key 不是私鑰，可公開，存取由 firestore.rules 控制。
   notice 與 marketing 為個資告知草稿，正式上線前須由 RKL 依實際營運流程確認文字；改文字時一併改 ver（同意紀錄會存版本）。 */
window.VIBE_FB={
  enabled:false,
  hosts:['baiqi-tw.github.io'],
  config:{apiKey:'',authDomain:'',projectId:'',appId:''},
  emailLinkUrl:'https://baiqi-tw.github.io/VIBE/',
  notice:{
    ver:'draft-2026-11-16',
    title:'登入前說明',
    body:[
      '蒐集者：佰奇創意機械股份有限公司（RIKULAU）。',
      '目的：識別您的帳號、保存與跨裝置載入您的 3D 配置，並分析配置選擇以改進產品與服務。',
      '資料類別：Email、帳號識別碼、您保存的配置與重要選擇紀錄（車款、尺寸、塗裝、加購）。',
      '期間：至您要求刪除帳號資料為止。',
      '地區與對象：本公司及受託提供雲端服務的 Google（Firebase），資料可能存放於台灣境外。',
      '權利：您可要求查詢、閱覽、複製、補充更正、停止蒐集處理利用或刪除，請聯絡〔聯絡信箱待填〕。',
      '不提供的影響：無法使用雲端保存；3D 幾何手冊的其他功能不受影響。'
    ],
    agree:'我已閱讀並同意上述說明'
  },
  marketing:{ver:'draft-2026-11-16',label:'我願意收到 RIKULAU 新品與活動資訊（可隨時取消）'}
};
