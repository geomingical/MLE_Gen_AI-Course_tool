# Tool Wiki / 工具百科

## 中文

這個 wiki 整理 `Class1-Class4` 課程與 homework 真的出現過的工具，並補充現階段常見但課程未必完整介紹的主流工具。分類方式不是按照章節，而是按照技術流：提示與 API、local inference、資料蒐集、OCR/ASR、清理去重、RAG、serving 與評估。

每個工具頁都會回答三個問題：

- 它解決什麼問題？
- 什麼時候該用，什麼時候不該用？
- 它對應到哪個課程或 HW 任務？

標籤說明：

- `Course-covered`: 課程 README、lecture、homework 或程式碼中明確出現。
- `Supplemental`: 課程外或只輕微提到，但在現代 GenAI/MLE 工作流中常見。

## English

This wiki documents tools that actually appear in `Class1-Class4` course materials and homework, plus a small set of mainstream tools that are useful context but not necessarily taught in depth. The structure follows the technical workflow instead of class numbers: prompting and APIs, local inference, data collection, OCR/ASR, cleaning and deduplication, RAG, serving, and evaluation.

Each tool page answers three practical questions:

- What problem does it solve?
- When should you use it, and when should you avoid it?
- Which course or homework task does it map to?

Label policy:

- `Course-covered`: explicitly appears in course READMEs, lectures, homework, or code.
- `Supplemental`: not covered or only lightly mentioned, but common in current GenAI/MLE workflows.

## Navigation / 導覽

- [Pipeline matrix / 技術流矩陣](pipeline.md)
- [Tool catalog / 工具總表](catalog.md)
- [Extension map / 延伸內容地圖](extensions.md)

## Static Site Notes / 靜態網站準備

中文與英文目前放在同一份 markdown，方便先校準內容。後續若建立 GitHub Pages，可以拆成 `zh/` 與 `en/` 兩套路徑，或保留同頁語言切換。網站設計應優先支援搜尋、filter、工具比較與課程對照，不做空泛的 landing page。
