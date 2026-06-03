# Web Scraping: requests, BeautifulSoup, Trafilatura

## 中文

### What it is
`requests` 負責下載網頁，BeautifulSoup 負責解析 HTML，Trafilatura 負責從 HTML 中抽取主要正文。Class3 README 與 Class2 HW output 都包含 scraping 與清理任務。

### Problem it solves
它們把網頁從 raw HTML 轉成可用的文字與 metadata，是建立 pretraining/RAG corpus 的前段。

### When to use it
當資料來源是一般網頁、論文摘要頁、blog、documentation 或 HTML article 時使用。

### When not to use it
如果網站需要 JavaScript rendering，可能需要 Playwright/Selenium。若資料有官方 API，優先用 API。

### Strengths
- requests 簡單穩定。
- BeautifulSoup 適合 DOM-level extraction。
- Trafilatura 對 main-text extraction 很實用。

### Weaknesses and failure modes
- HTML 結構改變會壞。
- 抽出的正文可能漏掉表格、caption、公式。
- scraping 要注意 robots.txt、rate limit、版權與授權。

### Minimal Python example
```python
import requests
from bs4 import BeautifulSoup
import trafilatura

url = "https://example.com"
html = requests.get(url, timeout=20).text
title = BeautifulSoup(html, "html.parser").find("title").get_text(strip=True)
main_text = trafilatura.extract(html)
print(title, main_text[:200])
```

### Course mapping
Class3 data collection and Class2 HW scraping outputs.

### Related tools
arxiv.py, Scrapy, Playwright, pandas.

### Practical notes
保留 `url`、抓取時間、title、authors/date 等 metadata，後續 RAG citation 才有來源。

## English

### What it is
`requests` downloads web pages, BeautifulSoup parses HTML, and Trafilatura extracts main text from HTML. Class3 README and Class2 HW output include scraping and cleaning tasks.

### Problem it solves
They convert web pages from raw HTML into usable text and metadata, forming the front end of pretraining or RAG corpus construction.

### When to use it
Use them for regular web pages, paper abstract pages, blogs, documentation, or HTML articles.

### When not to use it
If the site requires JavaScript rendering, use Playwright or Selenium. If an official API exists, prefer the API.

### Strengths
- requests is simple and stable.
- BeautifulSoup is useful for DOM-level extraction.
- Trafilatura is practical for main-text extraction.

### Weaknesses and failure modes
- HTML structure changes can break extraction.
- Extracted main text may omit tables, captions, and formulas.
- Scraping must respect robots.txt, rate limits, copyright, and licensing.

### Minimal Python example
```python
import requests
from bs4 import BeautifulSoup
import trafilatura

url = "https://example.com"
html = requests.get(url, timeout=20).text
title = BeautifulSoup(html, "html.parser").find("title").get_text(strip=True)
main_text = trafilatura.extract(html)
print(title, main_text[:200])
```

### Course mapping
Class3 data collection and Class2 HW scraping outputs.

### Related tools
arxiv.py, Scrapy, Playwright, pandas.

### Practical notes
Keep `url`, crawl time, title, authors/date, and related metadata so later RAG citations have sources.

### References
- https://requests.readthedocs.io/
- https://www.crummy.com/software/BeautifulSoup/bs4/doc/
- https://trafilatura.readthedocs.io/
