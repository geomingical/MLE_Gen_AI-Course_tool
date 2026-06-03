# Supplemental: Docling, MarkItDown, Unstructured

## 中文

### Status
`Supplemental`: Class3 主要討論 OCR、Tesseract、Surya 與資料清理。這些工具是文件轉換與 extraction pipeline 的補充選項。

### Docling
Docling 是文件轉換工具，目標是把 PDF/Office 等文件轉成適合 AI pipeline 的結構化格式。適合需要版面、表格、文件結構的場景。

### MarkItDown
MarkItDown 是 Microsoft 開源的文件轉 markdown 工具，目標是把多種文件格式轉成 LLM 友善文字。適合快速把 files 變成 markdown corpus。

### Unstructured
Unstructured 是文件 partition/extraction 工具，支援多種文件格式與元素類型。適合需要把文件拆成 typed elements 的 ingestion pipeline。

### When to use them
- OCR 不是唯一問題，還需要文件結構。
- 你想把 PDF、DOCX、PPTX、HTML 等統一成 markdown 或 elements。
- 你在做 RAG ingestion，而不是單純 OCR demo。

### When not to use them
- 文件很簡單，PyPDF/text extraction 已足夠。
- 你還沒抽樣檢查 extraction quality。
- 你需要完全保留數學公式、表格語意或圖像內容，但工具輸出無法可靠表示。

### Course mapping
延伸 Class3 document/OCR pipeline 與 Class4 RAG ingestion。

### Practical notes
文件 extraction 要保存原始檔、抽取文字、頁碼/區塊 metadata 和錯誤樣本。不要只保存最後的 cleaned text。

## English

### Status
`Supplemental`: Class3 mainly discusses OCR, Tesseract, Surya, and data cleaning. These tools are additional options for document conversion and extraction pipelines.

### Docling
Docling is a document conversion tool that aims to convert PDFs/Office documents into structured formats suitable for AI pipelines. It is useful when layout, tables, and document structure matter.

### MarkItDown
MarkItDown is Microsoft's open-source tool for converting documents to markdown. Its goal is to turn multiple file formats into LLM-friendly text quickly.

### Unstructured
Unstructured is a document partition/extraction toolkit that supports many file formats and element types. It fits ingestion pipelines that need typed document elements.

### When to use them
- OCR is not the only issue; document structure also matters.
- You want to normalize PDF, DOCX, PPTX, HTML, and other formats into markdown or elements.
- You are building RAG ingestion rather than a simple OCR demo.

### When not to use them
- The document is simple and PyPDF/text extraction is enough.
- You have not sample-checked extraction quality.
- You need fully reliable preservation of math, table semantics, or image content, but the tool output cannot represent it.

### Course mapping
Extends Class3 document/OCR pipelines and Class4 RAG ingestion.

### Practical notes
Document extraction should preserve original files, extracted text, page/block metadata, and error samples. Do not keep only the final cleaned text.

### References
- https://github.com/docling-project/docling
- https://github.com/microsoft/markitdown
- https://docs.unstructured.io/
