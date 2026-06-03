# OCR Tools: Tesseract, pytesseract, Surya

## 中文

### What it is
Tesseract 是傳統開源 OCR engine；pytesseract 是它的 Python wrapper；Surya 是較新的 layout-aware OCR/document parsing 工具。Class3 README 與 Class2 HW 都明確提到這些 OCR 任務。

### Problem it solves
它們把圖片、掃描 PDF 或頁面截圖轉成文字，讓文件能進入 cleaning、embedding、RAG 或 pretraining pipeline。

### When to use it
Tesseract/pytesseract 適合簡單圖片或掃描文字。Surya 更適合需要保留版面、段落、表格或多欄文件的情境。

### When not to use it
如果 PDF 本身已有可抽取文字，先用 PDF text extraction，不要直接 OCR。若文件包含複雜數學、表格和圖，OCR 結果仍需要人工或模型輔助檢查。

### Strengths
- Tesseract 成熟、輕量、可本地執行。
- pytesseract 容易接 Python pipeline。
- Surya 對 scientific/document layout 更有幫助。

### Weaknesses and failure modes
- OCR 會產生拼字、斷行、欄位順序錯誤。
- 圖表、公式、表格常被破壞。
- 影像品質與 preprocessing 對結果影響很大。

### Minimal Python example
```python
from PIL import Image
import pytesseract

img = Image.open("page.png")
text = pytesseract.image_to_string(img, config="--psm 6")
print(text)
```

### Course mapping
Class3 OCR section and Class2 HW OCR tasks.

### Related tools
pdf2image, OpenCV, Docling, Unstructured, MarkItDown.

### Practical notes
先抽樣檢查 OCR output，再決定是否大量處理。不要直接把未檢查的 OCR 文字拿去 fine-tuning。

## English

### What it is
Tesseract is a traditional open-source OCR engine. pytesseract is its Python wrapper. Surya is a newer layout-aware OCR/document parsing tool. Class3 README and Class2 HW explicitly mention OCR tasks using these tools.

### Problem it solves
They convert images, scanned PDFs, or page screenshots into text so documents can enter cleaning, embedding, RAG, or pretraining pipelines.

### When to use it
Use Tesseract/pytesseract for simple images or scanned text. Use Surya when layout, paragraphs, tables, or multi-column documents matter.

### When not to use it
If the PDF already contains extractable text, use PDF text extraction first instead of OCR. For complex math, tables, and figures, OCR output still needs human or model-assisted review.

### Strengths
- Tesseract is mature, lightweight, and local.
- pytesseract fits Python pipelines.
- Surya is more useful for scientific/document layout.

### Weaknesses and failure modes
- OCR creates spelling, line-break, and reading-order errors.
- Figures, formulas, and tables are often damaged.
- Image quality and preprocessing strongly affect results.

### Minimal Python example
```python
from PIL import Image
import pytesseract

img = Image.open("page.png")
text = pytesseract.image_to_string(img, config="--psm 6")
print(text)
```

### Course mapping
Class3 OCR section and Class2 HW OCR tasks.

### Related tools
pdf2image, OpenCV, Docling, Unstructured, MarkItDown.

### Practical notes
Sample-check OCR output before scaling. Do not feed unchecked OCR text directly into fine-tuning.

### References
- https://github.com/tesseract-ocr/tesseract
- https://github.com/madmaze/pytesseract
- https://github.com/VikParuchuri/surya
