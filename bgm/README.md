# VIBE BGM 取樣（v199zzzzzz63）

| 樂器 | 來源 | 授權 | 檔案 |
|---|---|---|---|
| Meta Piano | facebookincubator/Meta-open-sound（`meta-open-sound-meta-piano-ogg.zip`，SHA256SUMS 全數通過） | CC0 1.0（LICENSE-meta-piano.txt） | piano.webm |
| Meta Nylon Guitar | 同上（`meta-open-sound-meta-nylon-guitar-ogg.zip`，SHA256SUMS 全數通過） | CC0 1.0（LICENSE-meta-nylon-guitar.txt） | guitar.webm |
| Karoryfer Swagbass | `Karoryfer_Swagbass_v1_001.zip`（swagbass_clean.sfz 對照） | CC0 1.0（LICENSE-karoryfer-swagbass.txt） | bass.webm |

- 只收 `js/bgm-arr.js` 編曲用到的音高與力度層（tools/bgm_need.mjs 統計 → tools/bgm_build.py 轉檔）。
- 格式：每個取樣為 WebM Opus 單聲道 48 kHz、48 kbps，依需要長度裁切並淡出 0.25 s；同樂器串接為一個 .webm（多段 WebM 依偏移切開各自解碼），偏移與根音記在 index.json。
- 對照：鋼琴依官方 SFZ 力度分界（1–31／32–63／64–95／96–127）；吉他依官方 SFZ 第 1 聲道規則（四格內最低弦、E4 以上用高音 E 弦）；低音依 swagbass_clean.sfz 的 key range、keycenter、力度層與 round robin（取前 2 組）。

## v199zzzzzz97（2026-11-18）
- 編曲改為《行星組曲》六款，第一階段只用鋼琴（決策稿第四節）；`guitar.webm`、`bass.webm` 保留在包內但不再被載入（`needInst` 只載入編曲用到的樂器）。
- 取樣包**未重建**：新編曲刻意限在鋼琴 41–81（現有取樣 44–78 ＋ ±3 半音回退）。本輪環境無法下載官方音源（GitHub 存取未開放），日後要擴音域或加力度層再跑 `bgm_need.mjs` → `bgm_build.py`。
- 已知限制：現有鋼琴取樣依舊編曲裁長，最長約 3 秒；新編曲中 3–4 拍的長音（Jupiter、Saturn、Venus 的低音與和弦）會在約 3 秒處淡出。重建取樣包時一併延長。
