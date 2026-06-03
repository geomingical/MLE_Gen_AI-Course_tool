# Extension: Class3 Data, Web, Document, OCR, and Audio Extraction Extensions

## 中文

### Status
`Extension`: 延伸 Class3 的 scraping、OCR、ASR、cleaning pipeline，也補強 Class2 HW 中的資料蒐集任務。

### Extension map

| 類型 | 工具/框架 | 何時查它 | 備註 |
| --- | --- | --- | --- |
| Web crawling | Scrapy | 要大規模、多頁、可配置 spider 的 crawling | 比 requests/BeautifulSoup 更工程化 |
| Browser automation | Playwright | 網站需要 JavaScript rendering、登入、互動 | 成本比靜態 scraping 高 |
| LLM-friendly crawler | Crawl4AI | 想把網頁抽成 markdown/structured text 給 RAG/LLM | 適合 AI-ready web extraction |
| Document parsing | Docling | PDF/Office/HTML/image/audio 多格式轉 markdown/JSON | 已在 supplemental document extraction 提到 |
| Document parsing | MinerU | 複雜 PDF/Office/image 轉 LLM-ready markdown/JSON | 適合科學 PDF extraction 方向 |
| Document parsing | Marker / MarkItDown / Unstructured | 依需求在 markdown conversion、typed elements、快速 ingestion 間取捨 | 需抽樣檢查品質 |
| OCR/VLM | GPT-4o/vision models, Gemini vision, local VLMs | 表格、圖、掃描頁面需要視覺理解 | 成本、隱私、可重現性要評估 |
| ASR post-processing | WhisperX, pyannote.audio | 需要 word timestamps、alignment、speaker diarization | 比單純 Whisper 更複雜 |
| Data scale | Dask, Ray | cleaning/crawling 從 notebook 走向批次或分散式 | 先確認單機 pipeline 正確 |

### When to use these
當 Class3 的 requests/BS4/Tesseract/Whisper pipeline 遇到 dynamic pages、複雜 PDF、表格/圖片、多 speaker audio 或 corpus scale 問題時使用。

### When not to use these
如果 source 很少，手動檢查比自動化更重要。不要在 extraction baseline 還沒清楚前就堆分散式或 agentic extraction。

### Course mapping
對應 Class3 data collection、OCR、ASR、cleaning，也回補 Class2 HW 的 scraping/OCR/ASR 任務。

### Practical notes
對文件抽取，保存四層資料：原始檔、raw extracted output、cleaned text、quality notes。只保存 cleaned text 會讓你之後無法回查 extraction failure。

## English

### Status
`Extension`: Extends Class3 scraping, OCR, ASR, and cleaning pipelines, and also strengthens the data collection tasks in Class2 HW.

### Extension map

| Type | Tool/framework | When to look it up | Notes |
| --- | --- | --- | --- |
| Web crawling | Scrapy | You need large-scale, multi-page, configurable spider-based crawling | More engineered than requests/BeautifulSoup |
| Browser automation | Playwright | The website requires JavaScript rendering, login, or interaction | More expensive than static scraping |
| LLM-friendly crawler | Crawl4AI | You want web pages converted into markdown/structured text for RAG/LLM ingestion | Good for AI-ready web extraction |
| Document parsing | Docling | PDF/Office/HTML/image/audio to markdown/JSON across formats | Already listed in supplemental document extraction |
| Document parsing | MinerU | Complex PDF/Office/image to LLM-ready markdown/JSON | Relevant for scientific PDF extraction |
| Document parsing | Marker / MarkItDown / Unstructured | Choose among markdown conversion, typed elements, and fast ingestion | Requires sample-level quality review |
| OCR/VLM | GPT-4o/vision models, Gemini vision, local VLMs | Tables, figures, scans, or page images need visual understanding | Evaluate cost, privacy, and reproducibility |
| ASR post-processing | WhisperX, pyannote.audio | You need word timestamps, alignment, or speaker diarization | More complex than plain Whisper |
| Data scale | Dask, Ray | Cleaning/crawling moves from notebook to batch or distributed runs | First confirm the single-machine pipeline is correct |

### When to use these
Use these when Class3 requests/BS4/Tesseract/Whisper pipelines hit dynamic websites, complex PDFs, tables/figures, multi-speaker audio, or corpus-scale problems.

### When not to use these
If the source set is small, manual inspection may matter more than automation. Do not stack distributed or agentic extraction before the extraction baseline is understood.

### Course mapping
Maps to Class3 data collection, OCR, ASR, and cleaning, and also supports Class2 HW scraping/OCR/ASR tasks.

### Practical notes
For document extraction, preserve four layers: original file, raw extracted output, cleaned text, and quality notes. Keeping only cleaned text makes later failure analysis difficult.

### References
- https://docs.scrapy.org/
- https://playwright.dev/python/
- https://docs.crawl4ai.com/
- https://github.com/opendatalab/MinerU
- https://github.com/docling-project/docling
