# Cleaning and Dedup: pandas, regex, langdetect, spaCy, datasketch

## 中文

### What it is
這組工具處理資料品質：pandas 管表格與資料框，regex 做規則清理，langdetect 做語言判斷，spaCy 可做 NLP preprocessing，datasketch 用 MinHash 做近似去重。Class3 README 與 Class2 HW cleaning 任務都出現這些概念。

### Problem it solves
原始資料常有 HTML noise、重複段落、錯誤語言、PII、OCR artifacts。清理與去重決定後續模型/RAG 的品質。

### When to use it
在 scraping/OCR/ASR 後、embedding/fine-tuning 前使用。任何 corpus pipeline 都應該有 basic cleaning report。

### When not to use it
不要在沒有抽樣檢查前套過度 aggressive 的規則。清理不是越多越好，錯誤規則會刪掉重要內容。

### Strengths
- pandas 適合快速統計與檢查。
- regex 對 email/phone/noise pattern 有效。
- datasketch/MinHash 可在大 corpus 找近似重複。

### Weaknesses and failure modes
- regex 容易誤刪。
- langdetect 對短文本不穩。
- MinHash threshold 選錯會漏刪或誤刪。

### Minimal Python example
```python
from datasketch import MinHash

def minhash(text: str) -> MinHash:
    m = MinHash(num_perm=64)
    for token in text.lower().split():
        m.update(token.encode("utf-8"))
    return m

a = minhash("this is a document about rag")
b = minhash("this document is about rag")
print(a.jaccard(b))
```

### Course mapping
Class3 cleaning/filtering and Class2 HW end-to-end cleaner.

### Related tools
Trafilatura, OCR tools, pandas, Great Expectations as supplemental.

### Practical notes
每次 cleaning 應輸出 stats：原始筆數、刪除筆數、去重比例、語言分布、抽樣錯誤。

## English

### What it is
This tool group handles data quality: pandas manages tables/dataframes, regex handles rule-based cleanup, langdetect checks language, spaCy supports NLP preprocessing, and datasketch uses MinHash for approximate deduplication. Class3 README and Class2 HW cleaning tasks include these concepts.

### Problem it solves
Raw data often contains HTML noise, duplicate passages, wrong languages, PII, and OCR artifacts. Cleaning and deduplication determine the quality of later model or RAG workflows.

### When to use it
Use it after scraping/OCR/ASR and before embedding or fine-tuning. Any corpus pipeline should produce a basic cleaning report.

### When not to use it
Do not apply aggressive rules without sample inspection. More cleaning is not always better; bad rules can delete important content.

### Strengths
- pandas is good for quick statistics and inspection.
- regex is effective for email/phone/noise patterns.
- datasketch/MinHash finds near-duplicates in large corpora.

### Weaknesses and failure modes
- regex can over-delete.
- langdetect is unstable on short texts.
- Incorrect MinHash thresholds cause missed duplicates or false removals.

### Minimal Python example
```python
from datasketch import MinHash

def minhash(text: str) -> MinHash:
    m = MinHash(num_perm=64)
    for token in text.lower().split():
        m.update(token.encode("utf-8"))
    return m

a = minhash("this is a document about rag")
b = minhash("this document is about rag")
print(a.jaccard(b))
```

### Course mapping
Class3 cleaning/filtering and Class2 HW end-to-end cleaner.

### Related tools
Trafilatura, OCR tools, pandas, Great Expectations as supplemental.

### Practical notes
Every cleaning run should output stats: raw count, removed count, dedup ratio, language distribution, and sampled errors.

### References
- https://pandas.pydata.org/docs/
- https://spacy.io/usage
- https://datasketch.readthedocs.io/
