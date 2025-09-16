# SQL Console

SQL Console 是一個以 Vue 3 + Vite 打造的本地 SQL 控制台工具，支援 SQLite 資料庫設計與查詢，適合資料庫學習、測試與原型開發。

## 主要功能

- **資料表設計**：可視化建立、編輯 SQLite 資料表結構，支援欄位型態、主鍵、NOT NULL、AUTOINCREMENT 等設定。
- **SQL 控制台**：即時執行 SQL 指令，查詢結果以表格顯示，並記錄執行歷程。
- **本地運作**：所有資料皆儲存於瀏覽器記憶體，無需連線外部資料庫。

## 技術架構

- 前端框架：Vue 3
- 開發工具：Vite
- UI 元件：PrimeVue
- 狀態管理：Pinia
- 資料庫引擎：SQLite (WebAssembly)
