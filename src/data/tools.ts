export type Language = "zh" | "en";
export type ToolStatus = "Course-covered" | "Supplemental" | "Extension";
export type ItemType = "Concept" | "Method" | "Pattern" | "Package" | "Library" | "Framework" | "Runtime" | "Service" | "Protocol" | "Plugin" | "Workflow stack";
export type LearningLevel = "Beginner" | "Intermediate" | "Advanced";

export type Tool = {
  id: string;
  name: string;
  category: string;
  stage: string;
  status: ToolStatus;
  course: string;
  page: string;
  tags: string[];
  itemType?: ItemType;
  role?: string;
  abstractionLevel?: string;
  learningLevel?: LearningLevel;
  stack?: string;
  learnerNote?: {
    zh: string;
    en: string;
  };
  zh: {
    summary: string;
    useWhen: string;
    avoidWhen: string;
    notes: string;
  };
  en: {
    summary: string;
    useWhen: string;
    avoidWhen: string;
    notes: string;
  };
};

export const stages = [
  "Prompting/API",
  "Local inference",
  "Data collection",
  "Document extraction",
  "Audio/voice",
  "Cleaning/dedup",
  "RAG/search",
  "Fine-tuning/SFT",
  "Tool/plugin layer",
  "Serving",
  "Evaluation",
] as const;

export type ToolMeta = {
  itemType: ItemType;
  role: string;
  abstractionLevel: string;
  learningLevel: LearningLevel;
  stack: string;
  learnerNote: {
    zh: string;
    en: string;
  };
};

export type BilingualText = {
  zh: string;
  en: string;
};

export type LearnerGuide = {
  before: BilingualText;
  after: BilingualText;
  commonConfusion: BilingualText;
  firstExercise: BilingualText;
  compareWith: string[];
  codeExample?: {
    language: string;
    title: BilingualText;
    code: string;
  };
};

export function getToolMeta(tool: Tool): ToolMeta {
  return {
    itemType: tool.itemType ?? inferItemType(tool),
    role: tool.role ?? inferRole(tool),
    abstractionLevel: tool.abstractionLevel ?? inferAbstractionLevel(tool),
    learningLevel: tool.learningLevel ?? inferLearningLevel(tool),
    stack: tool.stack ?? tool.stage,
    learnerNote: tool.learnerNote ?? {
      zh: "這個項目的層級由網站依分類推定；若你在學習時混淆，優先看 Type 與 Role。",
      en: "This item's level is inferred from its category; if it feels confusing, start with Type and Role.",
    },
  };
}

export function getLearnerGuide(tool: Tool): LearnerGuide | undefined {
  return learnerGuides[tool.id];
}

function inferItemType(tool: Tool): ItemType {
  if (tool.category.includes("extensions")) return "Workflow stack";
  if (tool.category.includes("framework") || tool.tags.includes("framework")) return "Framework";
  if (tool.category.includes("Runtime") || tool.tags.includes("runtime")) return "Runtime";
  if (tool.category.includes("Protocol") || tool.tags.includes("mcp")) return "Protocol";
  if (tool.category.includes("pattern") || tool.tags.includes("schema")) return "Pattern";
  if (tool.name.includes(",") || tool.name.includes(" and ")) return "Workflow stack";
  return "Package";
}

function inferRole(tool: Tool): string {
  if (tool.stage === "Prompting/API") return "Prompt, call, validate";
  if (tool.stage === "Local inference") return "Load, run, or serve models";
  if (tool.stage === "Data collection") return "Collect source data";
  if (tool.stage === "Document extraction") return "Extract document text";
  if (tool.stage === "Audio/voice") return "Transcribe or serve voice";
  if (tool.stage === "Cleaning/dedup") return "Clean and deduplicate data";
  if (tool.stage === "RAG/search") return "Retrieve, rank, or ground answers";
  if (tool.stage === "Fine-tuning/SFT") return "Adapt models with supervised training";
  if (tool.stage === "Tool/plugin layer") return "Connect models to external tools";
  if (tool.stage === "Serving") return "Expose a pipeline as an API";
  return "Evaluate system behavior";
}

function inferAbstractionLevel(tool: Tool): string {
  const type = inferItemType(tool);
  if (type === "Workflow stack") return "Workflow stack: multiple items used together";
  if (type === "Protocol" || type === "Plugin") return "Integration layer";
  if (type === "Framework") return "Application framework";
  if (type === "Runtime") return "Execution layer";
  if (type === "Method" || type === "Pattern" || type === "Concept") return "Conceptual method";
  return "Single package/library";
}

function inferLearningLevel(tool: Tool): LearningLevel {
  if (tool.status === "Extension") return "Advanced";
  if (tool.status === "Supplemental") return "Intermediate";
  return "Beginner";
}

const learnerGuides: Record<string, LearnerGuide> = {
  requests: {
    before: {
      zh: "先確認 URL 是否直接回傳 HTML/JSON/PDF。若瀏覽器看到內容，但 `requests` 抓不到，通常代表需要登入、header、cookie 或 JavaScript rendering。",
      en: "First check whether the URL directly returns HTML, JSON, or a PDF. If the browser shows content but `requests` does not, login, headers, cookies, or JavaScript rendering may be required.",
    },
    after: {
      zh: "把 response 交給 BeautifulSoup 解析 HTML，或交給 Trafilatura 抽正文；如果是 JSON，先用 `response.json()` 檢查欄位。",
      en: "Pass the response to BeautifulSoup for HTML parsing or Trafilatura for main-text extraction. For JSON, inspect fields with `response.json()`.",
    },
    commonConfusion: {
      zh: "`requests` 不是爬蟲框架，也不是 HTML parser。它只處理 HTTP request/response 這一層。",
      en: "`requests` is neither a crawler framework nor an HTML parser. It only handles the HTTP request/response layer.",
    },
    firstExercise: {
      zh: "抓一個靜態文章頁，印出 HTTP status、content-type、前 500 個字元，確認你拿到的是原始 HTML 而不是錯誤頁。",
      en: "Fetch a static article page, print status code, content type, and the first 500 characters to confirm you got raw HTML rather than an error page.",
    },
    compareWith: ["BeautifulSoup", "Trafilatura", "Playwright", "Scrapy"],
    codeExample: {
      language: "python",
      title: {
        zh: "最小下載檢查",
        en: "Minimal fetch check",
      },
      code: `import requests

url = "https://example.com"
response = requests.get(url, timeout=10)
response.raise_for_status()

print(response.status_code)
print(response.headers.get("content-type"))
print(response.text[:500])`,
    },
  },
  beautifulsoup: {
    before: {
      zh: "先用 `requests`、本地 HTML 檔或瀏覽器取得 HTML 字串。BeautifulSoup 的輸入通常是一段 HTML，不是 URL。",
      en: "First obtain an HTML string through `requests`, a local HTML file, or a browser. BeautifulSoup usually receives HTML, not a URL.",
    },
    after: {
      zh: "抽出 title、links、table 或特定 div/span 後，把結果整理成 dataframe 或 metadata-rich records，再進 cleaning。",
      en: "After extracting titles, links, tables, or specific div/span fields, organize results as dataframes or metadata-rich records before cleaning.",
    },
    commonConfusion: {
      zh: "BeautifulSoup 不會自動知道哪段是文章正文；它擅長結構解析，但主文抽取通常 Trafilatura 更省力。",
      en: "BeautifulSoup does not automatically know which part is the main article. It parses structure well, while Trafilatura is usually easier for main-text extraction.",
    },
    firstExercise: {
      zh: "從一頁 HTML 抽出所有 `<a>` 的文字與 href，觀察 selector 如何決定你取得哪些資料。",
      en: "Extract all `<a>` texts and hrefs from one HTML page and observe how selectors determine what data you get.",
    },
    compareWith: ["requests", "Trafilatura", "lxml", "Playwright"],
    codeExample: {
      language: "python",
      title: {
        zh: "抽取連結",
        en: "Extract links",
      },
      code: `from bs4 import BeautifulSoup
import requests

html = requests.get("https://example.com", timeout=10).text
soup = BeautifulSoup(html, "html.parser")

for link in soup.find_all("a"):
    print(link.get_text(strip=True), link.get("href"))`,
    },
  },
  trafilatura: {
    before: {
      zh: "先取得 HTML 或 URL，並確認頁面是文章、blog、docs 這類有主要正文的頁面。",
      en: "First obtain HTML or a URL, and confirm the page is article-like, such as a blog, documentation page, or news article.",
    },
    after: {
      zh: "把抽出的正文與 URL/title/date 一起保存，接著做語言偵測、去重、chunking，再進 embedding/RAG。",
      en: "Store extracted text with URL/title/date, then run language detection, deduplication, chunking, and embedding/RAG.",
    },
    commonConfusion: {
      zh: "Trafilatura 不是萬能 parser。它適合抽正文，不適合精準抓表格欄位、互動內容或站台導覽結構。",
      en: "Trafilatura is not a universal parser. It is good for main text, not precise table fields, interactive content, or site navigation structure.",
    },
    firstExercise: {
      zh: "同一頁文章分別用 BeautifulSoup 的 `soup.get_text()` 和 Trafilatura 抽文字，比較雜訊、導覽列和廣告文字差異。",
      en: "Run both BeautifulSoup `soup.get_text()` and Trafilatura on the same article, then compare noise, navigation text, and ad text.",
    },
    compareWith: ["BeautifulSoup", "Unstructured", "Docling", "Crawl4AI"],
    codeExample: {
      language: "python",
      title: {
        zh: "抽主要正文",
        en: "Extract main text",
      },
      code: `import trafilatura

url = "https://example.com"
downloaded = trafilatura.fetch_url(url)
text = trafilatura.extract(downloaded, include_comments=False)

print(text)`,
    },
  },
  "web-scraping": {
    before: {
      zh: "先判斷資料來源是靜態 HTML、API、動態網頁，還是需要登入的網站。不同來源決定 stack 起點。",
      en: "First classify the source as static HTML, API, dynamic page, or login-protected site. The source type determines the starting tool.",
    },
    after: {
      zh: "完成抽取後，要進 cleaning/dedup，並保留 URL、抓取時間、標題與抽取失敗案例。",
      en: "After extraction, move to cleaning/dedup and preserve URL, crawl time, title, and failed extraction samples.",
    },
    commonConfusion: {
      zh: "這三個不是同層替代：`requests` 下載，BeautifulSoup 解析 DOM，Trafilatura 抽正文。",
      en: "These three are not same-level alternatives: `requests` fetches, BeautifulSoup parses the DOM, and Trafilatura extracts main text.",
    },
    firstExercise: {
      zh: "對同一個 URL 建三欄結果：HTTP status、DOM title、Trafilatura main text 長度，理解每層輸出差異。",
      en: "For one URL, create three outputs: HTTP status, DOM title, and Trafilatura main-text length to understand each layer's output.",
    },
    compareWith: ["Playwright", "Scrapy", "Crawl4AI", "Unstructured"],
  },
  tesseract: {
    before: {
      zh: "先確認文件真的沒有文字層，且輸入圖片解析度、方向、對比足夠。OCR 前的影像品質常比模型選擇更重要。",
      en: "First confirm the document truly lacks a text layer and that image resolution, orientation, and contrast are sufficient. Image quality often matters more than model choice.",
    },
    after: {
      zh: "把 OCR 結果抽樣檢查，再做清理、段落合併、語言偵測與錯字/斷行修正。",
      en: "Sample-check OCR output, then clean it, merge paragraphs, detect language, and fix line-break or recognition artifacts.",
    },
    commonConfusion: {
      zh: "Tesseract 是 OCR engine，不是 Python package。Python 裡常透過 pytesseract 呼叫它。",
      en: "Tesseract is an OCR engine, not a Python package. Python pipelines often call it through pytesseract.",
    },
    firstExercise: {
      zh: "用一張清楚文字圖片跑 OCR，再故意旋轉或降低解析度，比較輸出錯誤如何增加。",
      en: "Run OCR on a clear text image, then rotate it or reduce resolution and compare how errors increase.",
    },
    compareWith: ["pytesseract", "Surya", "Docling", "MinerU"],
  },
  pytesseract: {
    before: {
      zh: "先安裝並測試 Tesseract binary；再安裝 pytesseract。只裝 Python package 通常不夠。",
      en: "Install and test the Tesseract binary first, then install pytesseract. Installing only the Python package is usually not enough.",
    },
    after: {
      zh: "把 OCR wrapper 放進批次 pipeline，例如逐頁讀圖片、辨識、保存頁碼與 confidence/錯誤樣本。",
      en: "Place the OCR wrapper in a batch pipeline, such as page-by-page image loading, recognition, and saving page numbers plus confidence/error samples.",
    },
    commonConfusion: {
      zh: "pytesseract 不是新的 OCR 模型；它只是把 Python 程式接到 Tesseract engine。",
      en: "pytesseract is not a new OCR model. It only connects Python code to the Tesseract engine.",
    },
    firstExercise: {
      zh: "在 notebook 中讀一張圖片並呼叫 `image_to_string`，確認錯誤發生在 Python wrapper 還是系統 OCR binary。",
      en: "Load one image in a notebook and call `image_to_string` to identify whether errors come from the Python wrapper or the system OCR binary.",
    },
    compareWith: ["Tesseract OCR", "Surya", "Pillow", "OpenCV"],
    codeExample: {
      language: "python",
      title: {
        zh: "Python 呼叫 OCR",
        en: "Call OCR from Python",
      },
      code: `from PIL import Image
import pytesseract

image = Image.open("page.png")
text = pytesseract.image_to_string(image, lang="eng")

print(text[:1000])`,
    },
  },
  surya: {
    before: {
      zh: "先確認問題是否是版面與閱讀順序，而不只是單張圖片文字辨識。Surya 的價值在 layout-aware extraction。",
      en: "First check whether the problem is layout and reading order, not just text recognition from one image. Surya's value is layout-aware extraction.",
    },
    after: {
      zh: "把抽出的 blocks/lines 依頁碼與區塊保存，對表格、圖說、公式另做錯誤標記。",
      en: "Store extracted blocks/lines by page and region, and separately mark errors around tables, captions, and formulas.",
    },
    commonConfusion: {
      zh: "Surya 不只是 Tesseract 的替代品；它更偏文件解析，適合多欄與複雜版面。",
      en: "Surya is not merely a Tesseract replacement. It is closer to document parsing and fits multi-column or complex layouts.",
    },
    firstExercise: {
      zh: "選一頁雙欄 PDF 截圖，對比 Tesseract 與 Surya 的閱讀順序是否合理。",
      en: "Use a two-column PDF page screenshot and compare whether Tesseract and Surya preserve reading order.",
    },
    compareWith: ["Tesseract OCR", "pytesseract", "MinerU", "Docling"],
  },
  regex: {
    before: {
      zh: "先抽樣看原始文字，列出明確、可測的 noise pattern。不要在沒看資料前寫大規模清理規則。",
      en: "Inspect raw text samples first and list explicit, testable noise patterns. Do not write large cleanup rules before looking at the data.",
    },
    after: {
      zh: "每條規則都要輸出命中數、刪除比例與範例，接著用人工抽樣確認沒有誤刪重要內容。",
      en: "For each rule, output hit count, removal rate, and examples, then manually sample-check that important content was not removed.",
    },
    commonConfusion: {
      zh: "regex 是規則方法，不是資料品質保證。它很適合清楚 pattern，但不適合模糊語意判斷。",
      en: "Regex is a rule method, not a data-quality guarantee. It works well for clear patterns, not fuzzy semantic decisions.",
    },
    firstExercise: {
      zh: "寫一條 email 移除規則，列出被移除的前 20 個 match，確認它沒有刪到正常句子。",
      en: "Write one email-removal rule, list the first 20 removed matches, and confirm it did not delete normal sentences.",
    },
    compareWith: ["pandas", "spaCy", "PII detectors", "LLM-based cleaning"],
    codeExample: {
      language: "python",
      title: {
        zh: "規則清理前先看命中",
        en: "Inspect matches before cleaning",
      },
      code: `import re

texts = ["Contact me at a@example.com", "No email here"]
pattern = re.compile(r"\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b")

for text in texts:
    print(pattern.findall(text))
    print(pattern.sub("[EMAIL]", text))`,
    },
  },
  datasketch: {
    before: {
      zh: "先定義「重複」對你的任務代表什麼：整篇相同、段落相似、模板頁相似，還是 OCR 重複。",
      en: "First define what duplicate means for your task: same document, similar paragraph, template-like page, or OCR repetition.",
    },
    after: {
      zh: "用樣本校準 threshold，保存被刪與保留的 pairs，避免把重要近似內容誤刪。",
      en: "Calibrate thresholds with samples and preserve removed/kept pairs to avoid deleting important near-similar content.",
    },
    commonConfusion: {
      zh: "datasketch 是 package；MinHash/Jaccard 是方法。它找近似重複，不會判斷內容是否正確。",
      en: "datasketch is the package; MinHash/Jaccard is the method. It finds near-duplicates, not factual correctness.",
    },
    firstExercise: {
      zh: "建立三段文字：完全相同、只改幾個字、完全不同，觀察 Jaccard/MinHash similarity 如何變化。",
      en: "Create three texts: identical, slightly changed, and totally different. Observe how Jaccard/MinHash similarity changes.",
    },
    compareWith: ["regex", "pandas duplicate checks", "SimHash", "embedding similarity"],
  },
  "sentence-transformers": {
    before: {
      zh: "先準備乾淨 chunks，並決定語言、模型、向量維度與硬體。embedding 不能修復爛 chunk。",
      en: "Prepare clean chunks first, then decide language, model, vector dimension, and hardware. Embeddings cannot fix bad chunks.",
    },
    after: {
      zh: "把 vectors 放進 FAISS/vector DB，保存 chunk text、metadata、model name、dimension，方便重建 index。",
      en: "Store vectors in FAISS/vector DB and preserve chunk text, metadata, model name, and dimension for index rebuilds.",
    },
    commonConfusion: {
      zh: "它是本地 embedding library，不是 vector database。它產生向量；FAISS/Qdrant 等負責搜尋向量。",
      en: "It is a local embedding library, not a vector database. It creates vectors; FAISS/Qdrant and similar tools search vectors.",
    },
    firstExercise: {
      zh: "對三句相似/不相似句子產生 embedding，計算 cosine similarity，理解向量相似度的直覺。",
      en: "Embed three similar/dissimilar sentences and compute cosine similarity to build intuition for vector similarity.",
    },
    compareWith: ["OpenAI embeddings", "FAISS", "Vector databases", "BM25"],
    codeExample: {
      language: "python",
      title: {
        zh: "本地句向量",
        en: "Local sentence embeddings",
      },
      code: `from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
texts = ["RAG retrieves context.", "Retrieval finds relevant text.", "I like coffee."]
vectors = model.encode(texts)

print(cosine_similarity([vectors[0]], vectors[1:]))`,
    },
  },
  "openai-embeddings": {
    before: {
      zh: "先確認資料可否外送、成本預算、rate limit，以及要用哪個 embedding model/dimension。",
      en: "First confirm whether data can be sent externally, budget, rate limits, and the embedding model/dimension to use.",
    },
    after: {
      zh: "把 API 回傳 vectors 寫入 vector index，並在 metadata 記錄 model name、產生時間與 chunking rule。",
      en: "Write returned vectors into a vector index and record model name, generation time, and chunking rule in metadata.",
    },
    commonConfusion: {
      zh: "它是 hosted service，不是本地 library。好處是穩定省環境，代價是成本、rate limit 與資料治理。",
      en: "It is a hosted service, not a local library. It reduces environment work but introduces cost, rate limits, and data-governance concerns.",
    },
    firstExercise: {
      zh: "對 5 個短 chunks 呼叫 embeddings API，印出向量維度與 token/cost 記錄，理解 API 工作流。",
      en: "Call the embeddings API on five short chunks, print vector dimension and token/cost notes, and understand the API workflow.",
    },
    compareWith: ["sentence-transformers", "FAISS", "LiteLLM", "Vector databases"],
  },
  "langchain-rag": {
    before: {
      zh: "先理解基本 RAG 四步：load documents、split chunks、embed/index、retrieve/generate。LangChain 只是把這些步驟串起來。",
      en: "First understand the four basic RAG steps: load documents, split chunks, embed/index, and retrieve/generate. LangChain only composes these steps.",
    },
    after: {
      zh: "加入 citation、retrieved chunk inspection、query set evaluation，再考慮 reranking、hybrid search 或 GraphRAG。",
      en: "Add citations, retrieved-chunk inspection, and query-set evaluation before moving to reranking, hybrid search, or GraphRAG.",
    },
    commonConfusion: {
      zh: "LangChain RetrievalQA 不是 RAG 品質保證；source text、chunking、embedding、retriever 任一層錯都會失敗。",
      en: "LangChain RetrievalQA does not guarantee RAG quality. Failures can come from source text, chunking, embeddings, or the retriever.",
    },
    firstExercise: {
      zh: "用 3 頁課程筆記做最小 RAG，對每個回答印出 retrieved chunks，而不是只看最終答案。",
      en: "Build a minimal RAG over three course-note pages and print retrieved chunks for every answer, not only the final answer.",
    },
    compareWith: ["FAISS", "LlamaIndex", "Hybrid search and reranking", "RAG evaluation and observability"],
  },
  "tool-plugin-protocol-extensions": {
    before: {
      zh: "先判斷你是在做 model tool calling、host plugin，還是 MCP protocol integration。三者都能接工具，但層級不同。",
      en: "First decide whether you are building model tool calling, a host plugin, or MCP protocol integration. All connect tools, but at different layers.",
    },
    after: {
      zh: "為每個 tool 定義 input schema、權限、side effect、錯誤處理與日誌，再做最小 smoke test。",
      en: "For each tool, define input schema, permissions, side effects, error handling, and logs, then run a minimal smoke test.",
    },
    commonConfusion: {
      zh: "plugin 是某個 host 的擴充；MCP 是 client/server protocol；tool calling 是模型輸出一個可由程式執行的 tool request。",
      en: "A plugin extends a host; MCP is a client/server protocol; tool calling is the model emitting a tool request that code can execute.",
    },
    firstExercise: {
      zh: "做一個只讀工具：輸入檔名，回傳檔案前 20 行。先不要做會刪檔、寫資料或呼叫外部 API 的工具。",
      en: "Build one read-only tool: input a filename and return the first 20 lines. Avoid delete/write/external-API tools at first.",
    },
    compareWith: ["LangChain tools", "MCP", "OpenAI tool calling", "Pydantic AI"],
  },
  "advanced-rag-patterns": {
    before: {
      zh: "先建立 baseline RAG，並知道失敗來自 chunking、retrieval、generation、citation 還是 latency。沒有 baseline 就很難判斷 advanced pattern 是否有效。",
      en: "First build baseline RAG and identify whether failures come from chunking, retrieval, generation, citations, or latency. Without a baseline, advanced patterns are hard to judge.",
    },
    after: {
      zh: "依失敗型態選 CAG、query decomposition、agentic retrieval 或 GraphRAG，並保持一次只改一個 component。",
      en: "Choose CAG, query decomposition, agentic retrieval, or GraphRAG based on failure type, and change one component at a time.",
    },
    commonConfusion: {
      zh: "Advanced RAG 不是越多越好。CAG、GraphRAG、agentic retrieval 解的是不同瓶頸。",
      en: "Advanced RAG is not about adding more techniques. CAG, GraphRAG, and agentic retrieval solve different bottlenecks.",
    },
    firstExercise: {
      zh: "拿同一組 10 個問題，記錄 baseline retrieved chunks，再只加入一個改動，例如 reranking，觀察錯誤是否真的下降。",
      en: "Use the same 10 questions, record baseline retrieved chunks, then add one change such as reranking and check whether errors actually decrease.",
    },
    compareWith: ["Hybrid search and reranking", "Knowledge graphs and GraphRAG", "DCI-Agent-Lite", "RAG evaluation and observability"],
  },
  "retrieval-enhancement": {
    before: {
      zh: "先看 baseline retrieval 錯在哪：漏 exact keyword、專有名詞、數字、短 query，還是 top-k 太雜。",
      en: "Inspect baseline retrieval failures first: missing exact keywords, entities, numbers, short queries, or noisy top-k.",
    },
    after: {
      zh: "比較 dense-only、BM25-only、hybrid、rerank 後結果，並同時看 recall、citation correctness 與 latency。",
      en: "Compare dense-only, BM25-only, hybrid, and reranked results by recall, citation correctness, and latency.",
    },
    commonConfusion: {
      zh: "Hybrid search 是 dense vector + sparse keyword 的組合；reranking 是對候選結果重新排序。兩者可一起用，但不是同一件事。",
      en: "Hybrid search combines dense vectors and sparse keyword search; reranking reorders candidates. They can be combined but are not the same thing.",
    },
    firstExercise: {
      zh: "找一個 embedding search 漏掉專有名詞的 query，加入 BM25 或 reranker，看正確 chunk 是否進入 top-k。",
      en: "Find one query where embedding search misses a proper noun, then add BM25 or a reranker and check whether the correct chunk enters top-k.",
    },
    compareWith: ["FAISS", "Vector databases", "Advanced RAG patterns", "RAG evaluation and observability"],
  },
  "knowledge-graphs-graphrag": {
    before: {
      zh: "先確認問題需要 entity/relationship 或跨文件 synthesis，而不是單純找最相關段落。",
      en: "First confirm the question needs entity/relationship reasoning or cross-document synthesis, not just the most relevant passage.",
    },
    after: {
      zh: "定義 schema、抽 entity/relationship、人工抽樣驗證，再把 graph retrieval 接回回答流程。",
      en: "Define a schema, extract entities/relationships, manually validate samples, then connect graph retrieval back to answer generation.",
    },
    commonConfusion: {
      zh: "Knowledge graph 不是 RAG 的自動升級。若 entity extraction 不可靠，GraphRAG 會把錯誤結構化並放大。",
      en: "A knowledge graph is not an automatic RAG upgrade. If entity extraction is unreliable, GraphRAG structures and amplifies errors.",
    },
    firstExercise: {
      zh: "從 5 篇短文手動列出 entities 和 relationships，再比較 LLM 抽取結果，確認 schema 是否可驗證。",
      en: "Manually list entities and relationships from five short documents, then compare LLM extraction to confirm whether the schema is verifiable.",
    },
    compareWith: ["Advanced RAG patterns", "Hybrid search and reranking", "Neo4j", "LlamaIndex"],
  },
  "dci-agent-lite": {
    before: {
      zh: "先把 corpus 保持成可搜尋的 raw files，並保留路徑、行號、page/figure/table metadata。",
      en: "First keep the corpus as searchable raw files and preserve paths, line numbers, page/figure/table metadata.",
    },
    after: {
      zh: "讓 agent 用 rg/find/sed 多步查證，再把 evidence log 轉成可引用答案或 evaluation trace。",
      en: "Let the agent use rg/find/sed for multi-step evidence checks, then turn evidence logs into citeable answers or evaluation traces.",
    },
    commonConfusion: {
      zh: "DCI 不是一般向量檢索；它偏 direct corpus interaction，適合需要精準 provenance 與多步查找的本地 corpus。",
      en: "DCI is not ordinary vector retrieval. It is direct corpus interaction, useful for local corpora requiring precise provenance and multi-step lookup.",
    },
    firstExercise: {
      zh: "對一個本地資料夾設計 3 個問題，要求回答必須附檔名與行號，觀察 agent 如何查證。",
      en: "Design three questions over a local folder and require answers with filenames and line numbers, then observe how the agent verifies evidence.",
    },
    compareWith: ["Hybrid search and reranking", "FAISS", "MCP", "RAG evaluation and observability"],
  },
  sft: {
    before: {
      zh: "先確認任務真的需要改模型權重，而不是用 prompt、RAG、tool calling 或資料清理就能解決。",
      en: "First confirm the task truly needs weight updates rather than prompting, RAG, tool calling, or better data cleaning.",
    },
    after: {
      zh: "準備 train/eval split、ChatML/chat template、baseline outputs、訓練 logs，接著再比較 LoRA、QLoRA 或 full fine-tuning。",
      en: "Prepare train/eval splits, ChatML/chat templates, baseline outputs, and logs, then compare LoRA, QLoRA, or full fine-tuning.",
    },
    commonConfusion: {
      zh: "SFT 不是把知識塞進模型的萬用方法；小資料微調更適合學格式、語氣、任務模式，知識查詢通常仍需要 RAG。",
      en: "SFT is not a universal way to store knowledge in a model. Small fine-tunes are better for format, style, and task behavior; factual lookup often still needs RAG.",
    },
    firstExercise: {
      zh: "用 50-100 筆高品質 Q&A 做一個 LoRA smoke test，保留 10 筆 eval 問題，先看模型是否學到回答格式而非背題。",
      en: "Run a LoRA smoke test with 50-100 high-quality Q&A pairs, hold out 10 eval questions, and check whether the model learned response format rather than memorizing.",
    },
    compareWith: ["Prompting", "RAG", "LoRA", "QLoRA", "Full fine-tuning"],
  },
  chatml: {
    before: {
      zh: "先知道目標 base model 需要哪種 chat template；不同模型的 system/user/assistant tokens 可能不同。",
      en: "First know which chat template the target base model expects; system/user/assistant tokens can differ across models.",
    },
    after: {
      zh: "把資料轉成 messages 或 template-rendered text，並檢查 loss 是否只算 assistant 回答，避免模型學到使用者 prompt。",
      en: "Convert data into messages or rendered template text, and check whether loss is applied only to assistant answers to avoid training on user prompts.",
    },
    commonConfusion: {
      zh: "ChatML 是資料/對話格式，不是訓練演算法，也不是 tokenizer 本身。",
      en: "ChatML is a data/conversation format, not a training algorithm and not the tokenizer itself.",
    },
    firstExercise: {
      zh: "拿一筆 system/user/assistant 對話，用 tokenizer 的 chat template render 出實際訓練文字，觀察特殊 token。",
      en: "Render one system/user/assistant conversation with the tokenizer chat template and inspect the actual training text and special tokens.",
    },
    compareWith: ["SFT", "TRL SFTTrainer", "Hugging Face Datasets", "Instruction tuning"],
  },
  peft: {
    before: {
      zh: "先理解 full fine-tuning 會更新所有權重；PEFT 的目標是只訓練少量額外參數。",
      en: "First understand that full fine-tuning updates all weights; PEFT aims to train only a small number of additional parameters.",
    },
    after: {
      zh: "選擇 LoRA/QLoRA、target modules、rank、alpha，再保存 adapter 與 base model 版本。",
      en: "Choose LoRA/QLoRA, target modules, rank, and alpha, then save the adapter and base-model version.",
    },
    commonConfusion: {
      zh: "`peft` 是 library；LoRA/QLoRA 是方法；adapter 是訓練後產生的權重。",
      en: "`peft` is the library; LoRA/QLoRA are methods; an adapter is the trained weight artifact.",
    },
    firstExercise: {
      zh: "載入一個小模型，加上 LoRA config，印出 trainable parameter ratio，確認不是整個模型都在訓練。",
      en: "Load a small model, attach a LoRA config, and print the trainable-parameter ratio to confirm the whole model is not being trained.",
    },
    compareWith: ["LoRA", "QLoRA", "Full fine-tuning", "bitsandbytes"],
    codeExample: {
      language: "python",
      title: {
        zh: "LoRA config 最小骨架",
        en: "Minimal LoRA config skeleton",
      },
      code: `from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()`,
    },
  },
  lora: {
    before: {
      zh: "先選定 base model、任務資料與 target modules。LoRA 不會自動修復資料格式或標籤品質。",
      en: "First choose the base model, task data, and target modules. LoRA will not automatically fix data format or label quality.",
    },
    after: {
      zh: "比較不同 rank、alpha、learning rate 的 eval loss 和實際回答，並保存最佳 adapter。",
      en: "Compare rank, alpha, and learning-rate settings by eval loss and actual outputs, then save the best adapter.",
    },
    commonConfusion: {
      zh: "rank 越大不一定越好；它增加可訓練容量，也增加顯存、過擬合與訓練不穩定風險。",
      en: "Higher rank is not always better; it increases trainable capacity but also memory use, overfitting risk, and instability.",
    },
    firstExercise: {
      zh: "固定資料和 learning rate，只比較 r=8/16 與 alpha=16/32，看 eval loss 與回答風格是否真的改善。",
      en: "Keep data and learning rate fixed, compare r=8/16 and alpha=16/32, and check whether eval loss and response style truly improve.",
    },
    compareWith: ["PEFT", "QLoRA", "Full fine-tuning", "LoRA rank/alpha"],
  },
  qlora: {
    before: {
      zh: "先理解 quantization 只影響 base model 載入方式；adapter 仍是 LoRA 類型的可訓練參數。",
      en: "First understand that quantization changes how the base model is loaded; the trainable adapter is still LoRA-style.",
    },
    after: {
      zh: "確認 4-bit/NF4、compute dtype、device map、gradient checkpointing 等設定，再用 eval set 檢查是否有品質退化。",
      en: "Check 4-bit/NF4, compute dtype, device map, and gradient checkpointing settings, then use an eval set to detect quality degradation.",
    },
    commonConfusion: {
      zh: "QLoRA 不是比較小的模型；它是用量化方式載入 frozen base model，再訓練 LoRA adapters。",
      en: "QLoRA is not a smaller model; it loads a frozen base model in quantized form and trains LoRA adapters.",
    },
    firstExercise: {
      zh: "同一份資料跑一次 LoRA、一次 QLoRA，記錄 peak VRAM、訓練時間、eval loss 和回答差異。",
      en: "Run LoRA and QLoRA on the same data and record peak VRAM, training time, eval loss, and output differences.",
    },
    compareWith: ["LoRA", "bitsandbytes / NF4", "Unsloth", "Gradient checkpointing"],
  },
  trl: {
    before: {
      zh: "先準備已格式化的 instruction/chat dataset，並確認 tokenizer/chat template 與模型一致。",
      en: "Prepare a formatted instruction/chat dataset first, and confirm the tokenizer/chat template matches the model.",
    },
    after: {
      zh: "用 SFTTrainer 連接 model、dataset、training args、PEFT config，並保存 trainer state、adapter 和 eval logs。",
      en: "Use SFTTrainer to connect model, dataset, training args, and PEFT config, then save trainer state, adapter, and eval logs.",
    },
    commonConfusion: {
      zh: "`trl` 不是只有 RLHF；它也提供 SFTTrainer、DPOTrainer 等 alignment training wrapper。",
      en: "`trl` is not only for RLHF; it also provides alignment-training wrappers such as SFTTrainer and DPOTrainer.",
    },
    firstExercise: {
      zh: "用 20 筆資料跑 SFTTrainer dry run，確認資料欄位、padding、loss mask 沒有錯，再放大訓練。",
      en: "Run an SFTTrainer dry run on 20 records to verify fields, padding, and loss masking before scaling training.",
    },
    compareWith: ["PEFT", "TrainingArguments / Trainer", "Axolotl", "LLaMA-Factory"],
  },
  deepspeed: {
    before: {
      zh: "先確認單卡 baseline 能跑，再處理多卡。不要一開始就把資料、模型、DeepSpeed 三個問題混在一起 debug。",
      en: "First get a single-GPU baseline running before multi-GPU. Do not debug data, model, and DeepSpeed issues all at once.",
    },
    after: {
      zh: "選擇 ZeRO stage、offload、gradient accumulation、batch size，並保存 deepspeed config 與硬體設定。",
      en: "Choose ZeRO stage, offload, gradient accumulation, and batch size, and preserve the DeepSpeed config plus hardware settings.",
    },
    commonConfusion: {
      zh: "DeepSpeed 不是微調方法；它是分散式訓練與記憶體優化框架，可搭配 full fine-tuning 或 LoRA。",
      en: "DeepSpeed is not a fine-tuning method; it is a distributed training and memory optimization framework that can support full fine-tuning or LoRA.",
    },
    firstExercise: {
      zh: "把已能單卡跑的小訓練改成 ZeRO-2，確認 loss 曲線一致，再嘗試 ZeRO-3 或更大模型。",
      en: "Move a working single-GPU small run to ZeRO-2, confirm the loss curve is consistent, then try ZeRO-3 or a larger model.",
    },
    compareWith: ["FSDP", "Axolotl", "Gradient accumulation", "Full fine-tuning"],
  },
  unsloth: {
    before: {
      zh: "先確認你的硬體與目標模型是否在 Unsloth 支援範圍內；它常用於加速 LoRA/QLoRA 工作流。",
      en: "First confirm your hardware and target model are supported by Unsloth; it is commonly used to speed up LoRA/QLoRA workflows.",
    },
    after: {
      zh: "跑一個小資料 smoke test，記錄 VRAM、速度、eval loss，再決定是否把它放進正式訓練流程。",
      en: "Run a small-data smoke test, record VRAM, speed, and eval loss, then decide whether to use it in the formal training workflow.",
    },
    commonConfusion: {
      zh: "Unsloth 是加速/封裝工具，不是 LoRA 或 QLoRA 方法本身；底層仍要理解資料、adapter 與 evaluation。",
      en: "Unsloth is an acceleration/wrapper tool, not the LoRA or QLoRA method itself; you still need to understand data, adapters, and evaluation.",
    },
    firstExercise: {
      zh: "用同一份 50 筆資料跑 TRL baseline 和 Unsloth 版本，對比速度、顯存和回答品質。",
      en: "Run the same 50-record dataset with a TRL baseline and an Unsloth version, then compare speed, memory, and output quality.",
    },
    compareWith: ["TRL SFTTrainer", "QLoRA", "Axolotl", "LLaMA-Factory"],
  },
  axolotl: {
    before: {
      zh: "先能手動跑通一個小型 SFT/LoRA，理解資料格式與 adapter，再把流程轉成 YAML。",
      en: "First run a small SFT/LoRA manually and understand data format plus adapters, then move the workflow into YAML.",
    },
    after: {
      zh: "把 dataset、chat template、LoRA、DeepSpeed/FSDP、eval、輸出路徑都寫進 config，讓訓練可重現。",
      en: "Put dataset, chat template, LoRA, DeepSpeed/FSDP, eval, and output paths into config so training is reproducible.",
    },
    commonConfusion: {
      zh: "Axolotl 是 config-driven training framework，不是某個單一演算法；它把許多 fine-tuning 元件接在一起。",
      en: "Axolotl is a config-driven training framework, not one algorithm; it connects many fine-tuning components.",
    },
    firstExercise: {
      zh: "找一個官方 LoRA YAML 範例，只改模型、資料路徑和輸出路徑，先跑最小訓練。",
      en: "Start from an official LoRA YAML example and change only model, data path, and output path for a minimal run.",
    },
    compareWith: ["TRL SFTTrainer", "LLaMA-Factory", "DeepSpeed", "FSDP"],
  },
  "llama-factory": {
    before: {
      zh: "先知道你要做 SFT、LoRA、QLoRA、DPO 還是推論部署；LLaMA-Factory 會把很多選項包成 UI/CLI。",
      en: "First know whether you want SFT, LoRA, QLoRA, DPO, or inference/deployment; LLaMA-Factory wraps many choices in UI/CLI workflows.",
    },
    after: {
      zh: "用 WebUI 或 CLI 記錄所有參數，匯出 config/logs，避免只留下不可重現的點擊操作。",
      en: "Record all parameters through WebUI or CLI and export configs/logs so the run is reproducible rather than only click-driven.",
    },
    commonConfusion: {
      zh: "WebUI 降低入門門檻，但不代表可以忽略資料品質、eval split、overfitting 與 adapter 管理。",
      en: "A WebUI lowers the entry barrier, but it does not remove the need for data quality, eval splits, overfitting checks, and adapter management.",
    },
    firstExercise: {
      zh: "用 WebUI 跑一個 LoRA SFT，再用 CLI 重現同一個 run，確認你真的知道每個參數在哪裡。",
      en: "Run one LoRA SFT in the WebUI, then reproduce the same run from CLI to confirm you know where each parameter lives.",
    },
    compareWith: ["Axolotl", "Unsloth", "TRL SFTTrainer", "PEFT"],
  },
  "vram-optimization": {
    before: {
      zh: "先知道瓶頸是顯存、速度還是模型品質。不同優化會改變不同成本。",
      en: "First identify whether the bottleneck is memory, speed, or model quality. Different optimizations change different costs.",
    },
    after: {
      zh: "逐一開啟 gradient checkpointing、gradient accumulation、4-bit quantization、FlashAttention，記錄 peak VRAM 和 tokens/sec。",
      en: "Turn on gradient checkpointing, gradient accumulation, 4-bit quantization, and FlashAttention one by one, recording peak VRAM and tokens/sec.",
    },
    commonConfusion: {
      zh: "省顯存通常有代價：checkpointing 省記憶體但增加重算時間；accumulation 模擬大 batch 但不加快單步速度。",
      en: "Saving memory has tradeoffs: checkpointing saves memory but recomputes activations; accumulation simulates larger batches but does not make each step faster.",
    },
    firstExercise: {
      zh: "固定模型和資料，逐項開關三個顯存優化，做一張 VRAM/速度/ loss 對照表。",
      en: "Keep model and data fixed, toggle three memory optimizations one by one, and make a VRAM/speed/loss comparison table.",
    },
    compareWith: ["QLoRA", "DeepSpeed", "FSDP", "FlashAttention"],
  },
  "perplexity-eval-loss": {
    before: {
      zh: "先保留 eval set，且不要讓 eval examples 混進 training data，否則 PPL 會被污染。",
      en: "Keep a held-out eval set first and prevent eval examples from leaking into training data, or PPL will be misleading.",
    },
    after: {
      zh: "把 eval loss / PPL 和人工 prompt 測試、任務指標、benchmark 一起看，不要只看一個數字。",
      en: "Read eval loss / PPL together with manual prompt tests, task metrics, and benchmarks, not as a single-number verdict.",
    },
    commonConfusion: {
      zh: "PPL 低代表模型更會預測 eval text，不一定代表回答更有幫助、更正確或更安全。",
      en: "Lower PPL means the model predicts eval text better; it does not automatically mean answers are more helpful, factual, or safe.",
    },
    firstExercise: {
      zh: "對 baseline、LoRA checkpoint、過訓練 checkpoint 各算一次 eval loss/PPL，並比較實際回答是否同步改善。",
      en: "Compute eval loss/PPL for baseline, a LoRA checkpoint, and an overtrained checkpoint, then compare whether actual answers improve too.",
    },
    compareWith: ["Recall@k / Hit Rate@k", "MMLU / GSM8K", "RAG evaluation", "Catastrophic forgetting"],
  },
  "hybrid-search-class5": {
    before: {
      zh: "先有乾淨 chunks、metadata、FAISS 向量索引，以及可查 keyword 的 SQLite FTS5/BM25 index。",
      en: "First prepare clean chunks, metadata, a FAISS vector index, and a keyword-searchable SQLite FTS5/BM25 index.",
    },
    after: {
      zh: "分別跑 vector-only、keyword-only、hybrid，使用 Recall@k 或 Hit Rate@k 比較，而不是只看一兩個例子。",
      en: "Run vector-only, keyword-only, and hybrid retrieval separately and compare with Recall@k or Hit Rate@k, not just one or two examples.",
    },
    commonConfusion: {
      zh: "Hybrid search 不是把兩個分數隨便相加；通常要 normalization、weighted fusion 或 RRF，並用 query set 校準。",
      en: "Hybrid search is not arbitrary score addition; it usually needs normalization, weighted fusion, or RRF calibrated on a query set.",
    },
    firstExercise: {
      zh: "準備 10 個已知答案位置的 queries，比較 FAISS、FTS5/BM25、RRF hybrid 的 Recall@3。",
      en: "Prepare 10 queries with known relevant documents and compare Recall@3 for FAISS, FTS5/BM25, and RRF hybrid retrieval.",
    },
    compareWith: ["FAISS", "SQLite FTS5 / BM25", "Reciprocal Rank Fusion", "RAG evaluation and observability"],
  },
};

export const tools: Tool[] = [
  {
    id: "openai-sdk",
    name: "OpenAI Python SDK",
    category: "LLM API",
    stage: "Prompting/API",
    status: "Course-covered",
    course: "Class1, Class4",
    page: "content/Tool_wiki/tools/openai-sdk.md",
    tags: ["api", "chat", "embeddings", "structured-output"],
    zh: {
      summary: "用 Python 呼叫 OpenAI 模型、embeddings 與 OpenAI-compatible endpoints 的官方 client。",
      useWhen: "需要穩定呼叫 hosted model、structured output、embedding 或接 local compatible server。",
      avoidWhen: "任務必須完全本地、成本敏感或不能使用外部 API。",
      notes: "不要 hard-code API key；用環境變數或 .env，並避免提交 secrets。",
    },
    en: {
      summary: "Official Python client for OpenAI models, embeddings, and OpenAI-compatible endpoints.",
      useWhen: "Use for hosted model calls, structured output, embeddings, or local compatible servers.",
      avoidWhen: "Avoid when the task must run fully locally or cannot use external APIs.",
      notes: "Do not hard-code API keys; use environment variables or .env files and never commit secrets.",
    },
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "Local model API",
    stage: "Prompting/API",
    status: "Course-covered",
    course: "Class1",
    page: "content/Tool_wiki/tools/ollama.md",
    tags: ["local-llm", "openai-compatible", "desktop"],
    zh: {
      summary: "本地執行 LLM 並提供 OpenAI-compatible API 的工具。",
      useWhen: "本地 prompt 測試、低成本模型比較、隱私敏感 demo。",
      avoidWhen: "高吞吐、多 GPU、嚴格 production latency 或完整 runtime control。",
      notes: "把它視為方便的 local backend，不是 production serving 萬用解。",
    },
    en: {
      summary: "Runs local LLMs and exposes an OpenAI-compatible API.",
      useWhen: "Use for local prompt tests, low-cost model comparison, and privacy-sensitive demos.",
      avoidWhen: "Avoid for high-throughput, multi-GPU, strict production-latency use cases.",
      notes: "Treat it as a convenient local backend, not a universal production serving solution.",
    },
  },
  {
    id: "langchain",
    name: "LangChain prompting / LCEL",
    category: "Prompt orchestration",
    stage: "Prompting/API",
    status: "Course-covered",
    course: "Class1, Class4",
    page: "content/Tool_wiki/tools/langchain.md",
    tags: ["prompt-template", "lcel", "chain", "framework"],
    zh: {
      summary: "把 prompt、model、parser、retriever 與 chain 組合成 LLM workflow 的框架。",
      useWhen: "流程超過單一 API call，需要 prompt template、parser 或 RAG chain。",
      avoidWhen: "只是簡單 API call，或還不清楚每個 component 的 input/output。",
      notes: "版本變動快；記錄套件版本並注意 import path。",
    },
    en: {
      summary: "Framework for composing prompts, models, parsers, retrievers, and chains.",
      useWhen: "Use when the workflow needs templates, parsers, or RAG chains beyond one API call.",
      avoidWhen: "Avoid for simple one-off calls or when component input/output is unclear.",
      notes: "Version churn is common; record package versions and import paths.",
    },
  },
  {
    id: "structured-output",
    name: "Structured output patterns",
    category: "Output control",
    stage: "Prompting/API",
    status: "Course-covered",
    course: "Class1",
    page: "content/Tool_wiki/tools/structured-output.md",
    tags: ["json", "xml", "schema", "validation"],
    zh: {
      summary: "要求 LLM 以 JSON、XML 或 schema-like 格式輸出，方便程式解析。",
      useWhen: "下游程式需要固定欄位、分類、metadata 或 tool arguments。",
      avoidWhen: "開放式創作或不需要機器解析的任務。",
      notes: "格式正確不代表內容正確；仍需 parse 和 validate。",
    },
    en: {
      summary: "Asks LLMs to output JSON, XML, or schema-like structures for parsing.",
      useWhen: "Use when downstream code needs fields, classifications, metadata, or tool arguments.",
      avoidWhen: "Avoid for open-ended creative tasks that do not need machine parsing.",
      notes: "Valid format does not imply correct content; parse and validate.",
    },
  },
  {
    id: "transformers",
    name: "Hugging Face Transformers",
    category: "Local inference",
    stage: "Local inference",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/transformers.md",
    tags: ["model-loading", "tokenizer", "generation", "pipeline"],
    zh: {
      summary: "Hugging Face 的模型載入、tokenizer、generation 與 pipeline library。",
      useWhen: "學 local inference、測 open-source model、理解 tokenizer/generation config。",
      avoidWhen: "需要高吞吐 serving；那通常應比較 vLLM 或 SGLang。",
      notes: "先用小模型驗證環境，再載大型 instruct model。",
    },
    en: {
      summary: "Hugging Face library for model loading, tokenizers, generation, and pipelines.",
      useWhen: "Use for local inference learning, model comparison, and tokenizer/generation details.",
      avoidWhen: "Avoid for high-throughput serving; compare vLLM or SGLang instead.",
      notes: "Validate the environment with a small model before loading large instruct models.",
    },
  },
  {
    id: "huggingface-hub",
    name: "Hugging Face Hub",
    category: "Model registry",
    stage: "Local inference",
    status: "Course-covered",
    course: "Class2",
    page: "content/Tool_wiki/tools/huggingface-hub.md",
    tags: ["models", "datasets", "model-card", "download"],
    zh: {
      summary: "模型、tokenizer、dataset 與 model card 的 registry。",
      useWhen: "搜尋模型、下載權重、管理 gated access 或查看 license。",
      avoidWhen: "模型已由 Ollama、vLLM server 或內部 registry 管理。",
      notes: "下載大模型前確認磁碟、license 與 access token。",
    },
    en: {
      summary: "Registry for models, tokenizers, datasets, and model cards.",
      useWhen: "Use to search models, download weights, manage gated access, and inspect licenses.",
      avoidWhen: "Avoid direct use when models are already managed by another runtime or registry.",
      notes: "Check disk space, license, and access token needs before downloading large models.",
    },
  },
  {
    id: "pytorch-accelerate",
    name: "PyTorch and accelerate",
    category: "Runtime",
    stage: "Local inference",
    status: "Course-covered",
    course: "Class2",
    page: "content/Tool_wiki/tools/pytorch-accelerate.md",
    tags: ["runtime", "gpu", "device-map", "mixed-precision"],
    zh: {
      summary: "PyTorch 是模型 runtime；accelerate 降低 device placement 和 mixed precision 摩擦。",
      useWhen: "使用 Transformers 載模型、跑 local inference 或未來 fine-tuning。",
      avoidWhen: "只呼叫 hosted API，不需要直接操作模型 runtime。",
      notes: "先確認 CUDA/MPS/CPU 狀態，不要把 runtime 問題誤判成模型問題。",
    },
    en: {
      summary: "PyTorch is the model runtime; accelerate reduces device and precision setup friction.",
      useWhen: "Use when loading models with Transformers or doing local inference/fine-tuning.",
      avoidWhen: "Avoid direct use when you only call hosted APIs.",
      notes: "Check CUDA/MPS/CPU status before blaming model code.",
    },
  },
  {
    id: "vllm",
    name: "vLLM",
    category: "LLM serving",
    stage: "Local inference",
    status: "Course-covered",
    course: "Class2, Class4",
    page: "content/Tool_wiki/tools/vllm.md",
    tags: ["serving", "openai-compatible", "throughput"],
    zh: {
      summary: "高效 LLM inference/serving engine，可提供 OpenAI-compatible server。",
      useWhen: "需要把 open-source LLM 以 API server 形式接 RAG 或 agent backend。",
      avoidWhen: "只是 notebook demo 或沒有足夠 GPU/模型支援。",
      notes: "先用已知支援模型驗證 server，再接 pipeline。",
    },
    en: {
      summary: "Efficient LLM serving engine with OpenAI-compatible API support.",
      useWhen: "Use to expose open-source LLMs as API backends for RAG or agents.",
      avoidWhen: "Avoid for simple notebook demos or unsupported models/hardware.",
      notes: "Validate the server with a known-supported model before connecting pipelines.",
    },
  },
  {
    id: "requests",
    name: "requests",
    category: "HTTP client",
    stage: "Data collection",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/web-scraping.md",
    tags: ["http", "fetch", "web", "html", "python-package"],
    itemType: "Package",
    role: "Fetch raw HTML or API responses",
    abstractionLevel: "Single package: fetch layer",
    learningLevel: "Beginner",
    stack: "Web extraction stack",
    learnerNote: {
      zh: "`requests` 只負責把資料下載回來；它不理解 HTML 結構，也不會自動抽正文。",
      en: "`requests` only fetches data; it does not understand HTML structure or extract main content.",
    },
    zh: {
      summary: "Python HTTP client package，用來下載網頁 HTML、API JSON 或檔案。",
      useWhen: "需要從靜態 URL 抓 HTML、JSON、PDF 或其他原始資料。",
      avoidWhen: "網站需要 JavaScript rendering、登入流程或複雜互動。",
      notes: "通常接在 pipeline 第一層，後面才交給 BeautifulSoup 或 Trafilatura 解析。",
    },
    en: {
      summary: "Python HTTP client package for downloading HTML, JSON APIs, PDFs, or raw files.",
      useWhen: "Use when a static URL can return the data you need.",
      avoidWhen: "Avoid when the site requires JavaScript rendering, login flow, or complex interaction.",
      notes: "Usually the first layer; pass the result to BeautifulSoup or Trafilatura afterward.",
    },
  },
  {
    id: "beautifulsoup",
    name: "BeautifulSoup",
    category: "HTML parser",
    stage: "Data collection",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/web-scraping.md",
    tags: ["html", "parse", "bs4", "dom", "python-library"],
    itemType: "Library",
    role: "Parse HTML structure",
    abstractionLevel: "Single library: parsing layer",
    learningLevel: "Beginner",
    stack: "Web extraction stack",
    learnerNote: {
      zh: "`BeautifulSoup` 負責看懂 HTML 標籤和結構；它不是下載器，也不是主文抽取器。",
      en: "`BeautifulSoup` understands HTML tags and structure; it is neither a downloader nor a main-text extractor.",
    },
    zh: {
      summary: "HTML parser library，用來從 HTML 找 title、links、div、table、metadata。",
      useWhen: "你知道要抓哪個 HTML element，或需要 DOM-level extraction。",
      avoidWhen: "只想抽主要正文且不想手寫 selector；此時 Trafilatura 可能更直接。",
      notes: "常見流程是 `requests -> BeautifulSoup -> 自訂欄位抽取`。",
    },
    en: {
      summary: "HTML parser library for extracting titles, links, divs, tables, and metadata.",
      useWhen: "Use when you know which HTML elements or selectors matter.",
      avoidWhen: "Avoid when you only need main article text without writing selectors.",
      notes: "Common flow: `requests -> BeautifulSoup -> custom field extraction`.",
    },
  },
  {
    id: "trafilatura",
    name: "Trafilatura",
    category: "Content extraction",
    stage: "Data collection",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/web-scraping.md",
    tags: ["main-text", "html-cleaning", "article-extraction", "python-library"],
    itemType: "Library",
    role: "Extract main article text",
    abstractionLevel: "Single library: content extraction layer",
    learningLevel: "Beginner",
    stack: "Web extraction stack",
    learnerNote: {
      zh: "`Trafilatura` 是正文抽取工具：它嘗試移除 nav/sidebar/ads/noise，留下可進 RAG 的文字。",
      en: "`Trafilatura` is a main-text extractor: it removes nav/sidebar/ads/noise and keeps text useful for RAG.",
    },
    zh: {
      summary: "從 HTML 抽取主要正文與 metadata 的 content extraction library。",
      useWhen: "想快速把 article/blog/documentation page 轉成較乾淨文字。",
      avoidWhen: "需要精準抽特定欄位、表格或互動式網頁內容。",
      notes: "它和 BeautifulSoup 不是替代關係；BeautifulSoup 偏結構解析，Trafilatura 偏正文抽取。",
    },
    en: {
      summary: "Content extraction library for main text and metadata from HTML.",
      useWhen: "Use to convert articles, blogs, or docs pages into cleaner text quickly.",
      avoidWhen: "Avoid when precise field/table extraction or dynamic web interaction is required.",
      notes: "It is not a direct replacement for BeautifulSoup; BeautifulSoup parses structure, Trafilatura extracts main text.",
    },
  },
  {
    id: "web-scraping",
    name: "requests, BeautifulSoup, Trafilatura",
    category: "Web extraction",
    stage: "Data collection",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/web-scraping.md",
    tags: ["scraping", "html", "main-text", "metadata"],
    itemType: "Workflow stack",
    role: "Fetch -> parse -> extract web text",
    abstractionLevel: "Workflow stack: requests fetches, BeautifulSoup parses, Trafilatura extracts",
    learningLevel: "Beginner",
    stack: "Web extraction stack",
    learnerNote: {
      zh: "這是一個 stack，不是三個同層級替代品：`requests` 下載，`BeautifulSoup` 解析 HTML，`Trafilatura` 抽正文。",
      en: "This is a stack, not three equivalent alternatives: `requests` fetches, `BeautifulSoup` parses HTML, and `Trafilatura` extracts main text.",
    },
    zh: {
      summary: "下載網頁、解析 HTML、抽取 main text 的 web extraction stack。",
      useWhen: "資料來源是網頁、論文摘要頁、blog 或 documentation。",
      avoidWhen: "網站需要 JavaScript rendering；此時考慮 Playwright。",
      notes: "保留 URL、時間、title、authors/date，後續 citation 才可靠。",
    },
    en: {
      summary: "Stack for downloading pages, parsing HTML, and extracting main text.",
      useWhen: "Use for web pages, paper abstract pages, blogs, or documentation.",
      avoidWhen: "Avoid for JavaScript-rendered sites; consider Playwright.",
      notes: "Keep URL, crawl time, title, authors/date for later citations.",
    },
  },
  {
    id: "ocr-tools",
    name: "Tesseract, pytesseract, Surya",
    category: "OCR",
    stage: "Document extraction",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/ocr-tools.md",
    tags: ["ocr", "pdf", "layout", "image"],
    itemType: "Workflow stack",
    role: "OCR engine/wrapper/layout-aware extraction",
    abstractionLevel: "Workflow stack: engine, Python wrapper, and layout-aware parser",
    learningLevel: "Beginner",
    stack: "Document OCR stack",
    learnerNote: {
      zh: "這是 OCR stack：Tesseract 是 OCR engine，pytesseract 是 Python wrapper，Surya 是較高階的 layout-aware extraction 工具。",
      en: "This is an OCR stack: Tesseract is the OCR engine, pytesseract is a Python wrapper, and Surya is a higher-level layout-aware extraction tool.",
    },
    zh: {
      summary: "從圖片、掃描 PDF 或頁面截圖抽文字的 OCR 工具。",
      useWhen: "圖片/掃描文字需要進入 cleaning、embedding 或 RAG pipeline。",
      avoidWhen: "PDF 已有可抽取文字；先用 text extraction。",
      notes: "抽樣檢查 OCR output，不要直接用未檢查文字 fine-tune。",
    },
    en: {
      summary: "OCR tools for extracting text from images, scans, and page screenshots.",
      useWhen: "Use when image/scanned text must enter cleaning, embedding, or RAG pipelines.",
      avoidWhen: "Avoid OCR when the PDF already has extractable text.",
      notes: "Sample-check OCR output before using it for fine-tuning.",
    },
  },
  {
    id: "tesseract",
    name: "Tesseract OCR",
    category: "OCR engine",
    stage: "Document extraction",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/ocr-tools.md",
    tags: ["ocr", "engine", "cli", "image-to-text"],
    itemType: "Runtime",
    role: "Convert image pixels into text",
    abstractionLevel: "System tool / OCR engine",
    learningLevel: "Beginner",
    stack: "Document OCR stack",
    learnerNote: {
      zh: "Tesseract 是底層 OCR engine；你可以從 command line 用它，也可以透過 pytesseract 在 Python 內呼叫。",
      en: "Tesseract is the underlying OCR engine; use it from the command line or call it from Python through pytesseract.",
    },
    zh: {
      summary: "傳統開源 OCR engine，將圖片或掃描頁面的文字辨識出來。",
      useWhen: "圖片文字清楚、版面簡單、需要本地 OCR。",
      avoidWhen: "PDF 已有文字層、文件有複雜表格/公式/多欄順序。",
      notes: "影像 preprocessing 和 page segmentation mode 對結果影響很大。",
    },
    en: {
      summary: "Traditional open-source OCR engine for recognizing text in images or scanned pages.",
      useWhen: "Use for clear image text, simple layout, and local OCR.",
      avoidWhen: "Avoid when the PDF already has text or when layout/math/tables are complex.",
      notes: "Image preprocessing and page segmentation mode strongly affect results.",
    },
  },
  {
    id: "pytesseract",
    name: "pytesseract",
    category: "OCR wrapper",
    stage: "Document extraction",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/ocr-tools.md",
    tags: ["ocr", "python-wrapper", "tesseract", "image-to-text"],
    itemType: "Package",
    role: "Call Tesseract from Python",
    abstractionLevel: "Python wrapper around a system OCR engine",
    learningLevel: "Beginner",
    stack: "Document OCR stack",
    learnerNote: {
      zh: "pytesseract 不是另一個 OCR 模型；它是 Python 呼叫 Tesseract 的 wrapper。",
      en: "pytesseract is not a separate OCR model; it is a Python wrapper that calls Tesseract.",
    },
    zh: {
      summary: "讓 Python pipeline 可以呼叫 Tesseract OCR 的 wrapper package。",
      useWhen: "你已安裝 Tesseract，並想在 notebook/script 裡自動化 OCR。",
      avoidWhen: "系統沒有安裝 Tesseract binary，或你需要 layout-aware document parsing。",
      notes: "安裝 pytesseract 不等於安裝 Tesseract 本體。",
    },
    en: {
      summary: "Python wrapper package for calling Tesseract OCR inside pipelines.",
      useWhen: "Use when Tesseract is installed and OCR needs to run inside notebooks/scripts.",
      avoidWhen: "Avoid when the Tesseract binary is missing or layout-aware parsing is required.",
      notes: "Installing pytesseract is not the same as installing Tesseract itself.",
    },
  },
  {
    id: "surya",
    name: "Surya",
    category: "Layout-aware OCR",
    stage: "Document extraction",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/ocr-tools.md",
    tags: ["ocr", "layout", "scientific-documents", "pdf"],
    itemType: "Library",
    role: "Extract text with document layout awareness",
    abstractionLevel: "Higher-level document extraction library",
    learningLevel: "Intermediate",
    stack: "Document OCR stack",
    learnerNote: {
      zh: "Surya 比 Tesseract 更偏文件理解；適合多欄、段落、版面順序比單純文字辨識重要的情境。",
      en: "Surya is closer to document understanding than plain OCR; use it when columns, paragraphs, and reading order matter.",
    },
    zh: {
      summary: "layout-aware OCR/document parsing 工具，適合較複雜的科學或多欄文件。",
      useWhen: "需要保留段落、區塊或閱讀順序，而不只是辨識字元。",
      avoidWhen: "只是簡單圖片文字，Tesseract 已足夠。",
      notes: "仍需抽樣檢查 output，尤其是表格、公式和圖說。",
    },
    en: {
      summary: "Layout-aware OCR/document parsing tool for complex scientific or multi-column documents.",
      useWhen: "Use when paragraphs, blocks, and reading order matter beyond character recognition.",
      avoidWhen: "Avoid when simple image text can be handled by Tesseract.",
      notes: "Still sample-check output, especially tables, formulas, and captions.",
    },
  },
  {
    id: "audio-asr",
    name: "Whisper and faster-whisper",
    category: "ASR",
    stage: "Audio/voice",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/audio-asr.md",
    tags: ["asr", "audio", "voice-agent", "transcription"],
    zh: {
      summary: "語音轉文字工具，用於 voice agent、YouTube talk 或 multimodal pipeline。",
      useWhen: "需要本地或批次轉錄音訊。",
      avoidWhen: "需要 diarization、極低延遲或企業級語音服務功能。",
      notes: "保存 segments/timestamps 比只保存純文字更有用。",
    },
    en: {
      summary: "Speech-to-text tools for voice agents, talks, and multimodal pipelines.",
      useWhen: "Use for local or batch audio transcription.",
      avoidWhen: "Avoid when diarization, ultra-low latency, or enterprise ASR features are required.",
      notes: "Save segments/timestamps, not only plain text.",
    },
  },
  {
    id: "cleaning-dedup",
    name: "pandas, regex, langdetect, spaCy, datasketch",
    category: "Cleaning/dedup",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["cleaning", "dedup", "minhash", "pii", "language"],
    itemType: "Workflow stack",
    role: "Inspect -> clean -> detect language -> preprocess -> deduplicate",
    abstractionLevel: "Workflow stack: multiple packages and methods used together",
    learningLevel: "Beginner",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "這是資料清理 stack，不是同類工具清單：pandas 管資料表，regex 做規則，langdetect 判語言，spaCy 做 NLP preprocessing，datasketch 做 MinHash 去重。",
      en: "This is a cleaning stack, not equivalent tools: pandas manages tables, regex applies rules, langdetect detects language, spaCy preprocesses NLP, and datasketch performs MinHash dedup.",
    },
    zh: {
      summary: "處理 HTML noise、重複、語言、PII、OCR artifacts 的資料品質工具。",
      useWhen: "scraping/OCR/ASR 後，embedding/fine-tuning 前。",
      avoidWhen: "沒有抽樣檢查前套 aggressive 規則。",
      notes: "每次 cleaning 都要輸出 stats 與錯誤樣本。",
    },
    en: {
      summary: "Data quality tools for HTML noise, duplicates, language, PII, and OCR artifacts.",
      useWhen: "Use after scraping/OCR/ASR and before embedding/fine-tuning.",
      avoidWhen: "Avoid aggressive rules without sample inspection.",
      notes: "Every cleaning run should output stats and sampled errors.",
    },
  },
  {
    id: "pandas",
    name: "pandas",
    category: "Dataframe library",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["dataframe", "csv", "inspection", "statistics"],
    itemType: "Library",
    role: "Inspect and transform tabular data",
    abstractionLevel: "Single library: data inspection and transformation",
    learningLevel: "Beginner",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "pandas 是資料表工具；它幫你看資料、算統計、存 CSV/JSON，但不會自動判斷資料品質。",
      en: "pandas is a tabular data tool; it helps inspect, summarize, and save data, but it does not automatically decide data quality.",
    },
    zh: {
      summary: "Python dataframe library，用來檢查、整理、統計與輸出資料。",
      useWhen: "需要查看 corpus rows、欄位、缺失值、長度分布或清理統計。",
      avoidWhen: "資料大到單機記憶體不夠；此時考慮 Dask/Ray 或資料庫。",
      notes: "適合產生 cleaning report：刪除比例、語言分布、token/字元長度分布。",
    },
    en: {
      summary: "Python dataframe library for inspecting, transforming, summarizing, and exporting data.",
      useWhen: "Use to inspect corpus rows, fields, missing values, length distributions, and cleaning stats.",
      avoidWhen: "Avoid when data exceeds single-machine memory; consider Dask/Ray or databases.",
      notes: "Good for cleaning reports: removal rates, language distribution, and token/character lengths.",
    },
  },
  {
    id: "regex",
    name: "regex / regular expressions",
    category: "Cleaning method",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["regex", "method", "pii", "rules", "noise-removal"],
    itemType: "Method",
    role: "Rule-based text cleaning",
    abstractionLevel: "Method: pattern matching",
    learningLevel: "Beginner",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "regex 是方法，不是 package 名稱本身；它用 pattern 找 email、電話、重複符號或 HTML noise。",
      en: "Regex is a method, not just a package name; it uses patterns to find emails, phone numbers, repeated symbols, or HTML noise.",
    },
    zh: {
      summary: "用 pattern matching 做規則式文字清理的方法。",
      useWhen: "要移除 email、電話、重複空白、HTML residue 或明確 noise pattern。",
      avoidWhen: "規則會誤刪重要內容，或文本型態差異太大。",
      notes: "每條 regex 都應該有抽樣檢查，避免 silent over-cleaning。",
    },
    en: {
      summary: "Rule-based text cleaning method using pattern matching.",
      useWhen: "Use to remove emails, phone numbers, repeated spaces, HTML residues, or clear noise patterns.",
      avoidWhen: "Avoid when rules may delete important content or text formats vary widely.",
      notes: "Every regex rule needs sample checks to avoid silent over-cleaning.",
    },
  },
  {
    id: "langdetect",
    name: "langdetect",
    category: "Language detection",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["language", "filtering", "python-package"],
    itemType: "Package",
    role: "Detect document language",
    abstractionLevel: "Single package: language filter",
    learningLevel: "Beginner",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "langdetect 只做語言判斷；短文本或混合語言會不穩，不能當完美標籤。",
      en: "langdetect only predicts language; short or mixed-language text can be unstable, so do not treat it as perfect truth.",
    },
    zh: {
      summary: "判斷文字語言的 Python package，可用於 corpus filtering。",
      useWhen: "需要移除非目標語言或統計語言分布。",
      avoidWhen: "文本很短、含大量專有名詞或混合語言。",
      notes: "語言判斷結果應用於 filtering 前，先抽樣看 false positives/negatives。",
    },
    en: {
      summary: "Python package for detecting text language, useful for corpus filtering.",
      useWhen: "Use to remove non-target languages or summarize language distribution.",
      avoidWhen: "Avoid trusting it on short, jargon-heavy, or mixed-language text.",
      notes: "Sample false positives/negatives before using language labels for filtering.",
    },
  },
  {
    id: "spacy",
    name: "spaCy",
    category: "NLP preprocessing",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["nlp", "tokenization", "ner", "preprocessing"],
    itemType: "Library",
    role: "NLP preprocessing and linguistic annotations",
    abstractionLevel: "Single library: NLP pipeline",
    learningLevel: "Intermediate",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "spaCy 是 NLP pipeline library，可做 tokenization/NER 等；它不是一般 dataframe 清理工具。",
      en: "spaCy is an NLP pipeline library for tokenization/NER and related annotations; it is not a general dataframe cleaning tool.",
    },
    zh: {
      summary: "NLP preprocessing library，支援 tokenization、NER、句子切分等。",
      useWhen: "清理需要 linguistic features，例如 entity、sentence、token-level processing。",
      avoidWhen: "只需要簡單欄位整理或 regex 清理。",
      notes: "不同語言需要不同 model，模型選錯會影響結果。",
    },
    en: {
      summary: "NLP preprocessing library supporting tokenization, NER, sentence splitting, and more.",
      useWhen: "Use when cleaning requires linguistic features such as entities, sentences, or token-level processing.",
      avoidWhen: "Avoid when simple dataframe operations or regex rules are enough.",
      notes: "Different languages need different models; wrong model choice affects output.",
    },
  },
  {
    id: "datasketch",
    name: "datasketch / MinHash",
    category: "Deduplication",
    stage: "Cleaning/dedup",
    status: "Course-covered",
    course: "Class2, Class3",
    page: "content/Tool_wiki/tools/cleaning-dedup.md",
    tags: ["minhash", "dedup", "similarity", "near-duplicate"],
    itemType: "Package",
    role: "Find near-duplicate text",
    abstractionLevel: "Package implementing a deduplication method",
    learningLevel: "Intermediate",
    stack: "Cleaning and dedup stack",
    learnerNote: {
      zh: "datasketch 是 package，MinHash 是方法；用來找相似/近重複文本，不是一般文字清理器。",
      en: "datasketch is the package and MinHash is the method; it finds similar/near-duplicate text, not general text cleanup.",
    },
    zh: {
      summary: "用 MinHash/Jaccard similarity 找近似重複文本的 package。",
      useWhen: "corpus 有重複段落、鏡像頁、OCR 重複或 boilerplate。",
      avoidWhen: "資料量小到人工檢查即可，或 threshold 尚未用樣本校準。",
      notes: "threshold 太低會誤刪，太高會漏掉 near duplicates。",
    },
    en: {
      summary: "Package for finding near-duplicate text with MinHash/Jaccard similarity.",
      useWhen: "Use when corpora contain repeated passages, mirrored pages, OCR duplicates, or boilerplate.",
      avoidWhen: "Avoid when data is small enough for manual review or thresholds are uncalibrated.",
      notes: "Too-low thresholds over-delete; too-high thresholds miss near duplicates.",
    },
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Serving",
    stage: "Serving",
    status: "Course-covered",
    course: "Class3",
    page: "content/Tool_wiki/tools/fastapi.md",
    tags: ["api", "backend", "voice-agent", "upload"],
    zh: {
      summary: "Python web API framework，用於把 ASR/LLM/TTS pipeline 包成服務。",
      useWhen: "需要 upload endpoint、JSON API、demo backend 或小型服務。",
      avoidWhen: "只是一次性 notebook 實驗。",
      notes: "把 ASR/LLM/TTS 拆成可測函式，再由 endpoint 串接。",
    },
    en: {
      summary: "Python web API framework for wrapping ASR/LLM/TTS pipelines as services.",
      useWhen: "Use for upload endpoints, JSON APIs, demo backends, or small services.",
      avoidWhen: "Avoid for one-off notebook experiments.",
      notes: "Keep ASR/LLM/TTS as testable functions, then compose them in endpoints.",
    },
  },
  {
    id: "embeddings",
    name: "sentence-transformers and OpenAI embeddings",
    category: "Embeddings",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class4",
    page: "content/Tool_wiki/tools/embeddings.md",
    tags: ["embedding", "semantic-search", "vectors"],
    itemType: "Workflow stack",
    role: "Convert text chunks into vectors",
    abstractionLevel: "Workflow stack: choose local embedding library or hosted embedding API",
    learningLevel: "Beginner",
    stack: "Embedding stack",
    learnerNote: {
      zh: "這是 embedding 選型 stack：sentence-transformers 是本地 library，OpenAI embeddings 是 hosted API/service。",
      en: "This is an embedding choice stack: sentence-transformers is a local library, while OpenAI embeddings are a hosted API/service.",
    },
    zh: {
      summary: "把文字轉成向量，是 semantic search、RAG、clustering 的基礎。",
      useWhen: "需要語意搜尋、RAG index 或文本相似度比較。",
      avoidWhen: "問題需要 exact keyword、日期、數字或 metadata filter。",
      notes: "記錄 model name、dimension、chunking rule，方便重建 index。",
    },
    en: {
      summary: "Converts text into vectors for semantic search, RAG, and clustering.",
      useWhen: "Use for semantic search, RAG indexes, and text similarity.",
      avoidWhen: "Avoid pure embeddings when exact keywords, dates, numbers, or metadata filters matter.",
      notes: "Record model name, dimension, and chunking rules so indexes can be rebuilt.",
    },
  },
  {
    id: "sentence-transformers",
    name: "sentence-transformers",
    category: "Embedding library",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class4",
    page: "content/Tool_wiki/tools/embeddings.md",
    tags: ["embedding", "local", "semantic-search", "sbert"],
    itemType: "Library",
    role: "Create local text embeddings",
    abstractionLevel: "Single library: local embedding model runner",
    learningLevel: "Beginner",
    stack: "Embedding stack",
    learnerNote: {
      zh: "sentence-transformers 是本地 embedding library；你要自己選模型、下載模型、管理向量維度。",
      en: "sentence-transformers is a local embedding library; you choose/download models and manage vector dimensions yourself.",
    },
    zh: {
      summary: "本地執行 embedding models 的 Python library，常用於 semantic search 和 RAG。",
      useWhen: "需要低成本、本地、可重現的 embedding 實驗。",
      avoidWhen: "不想管理模型下載、硬體和向量維度，或需要 hosted API SLA。",
      notes: "換模型通常要重建 FAISS/vector DB index。",
    },
    en: {
      summary: "Python library for running local embedding models for semantic search and RAG.",
      useWhen: "Use for low-cost, local, reproducible embedding experiments.",
      avoidWhen: "Avoid when you do not want to manage models, hardware, or vector dimensions.",
      notes: "Changing the model usually requires rebuilding FAISS/vector DB indexes.",
    },
  },
  {
    id: "openai-embeddings",
    name: "OpenAI embeddings",
    category: "Embedding API",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class4",
    page: "content/Tool_wiki/tools/embeddings.md",
    tags: ["embedding", "api", "hosted-service", "semantic-search"],
    itemType: "Service",
    role: "Create hosted API text embeddings",
    abstractionLevel: "Hosted API/service",
    learningLevel: "Beginner",
    stack: "Embedding stack",
    learnerNote: {
      zh: "OpenAI embeddings 是 API/service；你不用管本地模型，但要管理 API key、成本、rate limit 和資料外送。",
      en: "OpenAI embeddings are an API/service; you avoid local model management but must handle API keys, cost, rate limits, and data transfer.",
    },
    zh: {
      summary: "透過 OpenAI API 產生 text embeddings 的 hosted service。",
      useWhen: "需要快速、穩定、少環境問題的 embedding workflow。",
      avoidWhen: "資料不能外送、成本敏感或需要完全本地可控。",
      notes: "記錄 model name 和 vector dimension，並注意 API 成本與 rate limit。",
    },
    en: {
      summary: "Hosted service for generating text embeddings through the OpenAI API.",
      useWhen: "Use for fast, stable embedding workflows with fewer local environment issues.",
      avoidWhen: "Avoid when data cannot leave the machine, cost is sensitive, or full local control is required.",
      notes: "Record model name and vector dimension; monitor cost and rate limits.",
    },
  },
  {
    id: "sft",
    name: "Supervised fine-tuning (SFT)",
    category: "Fine-tuning method",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["sft", "fine-tuning", "alignment", "instruction-tuning"],
    itemType: "Method",
    role: "Adapt a pretrained model with labeled examples",
    abstractionLevel: "Training method",
    learningLevel: "Beginner",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "SFT 會更新模型行為；如果只是查外部知識，通常先考慮 RAG。",
      en: "SFT changes model behavior; if the problem is factual lookup, consider RAG first.",
    },
    zh: {
      summary: "用標註好的 input-output 或 chat examples 讓 pretrained LLM 學特定任務、格式或語氣。",
      useWhen: "需要模型穩定遵守格式、語氣、任務流程，且有高品質訓練資料。",
      avoidWhen: "只是要加入大量可更新知識、資料品質低、沒有 eval set 或無法承擔訓練成本。",
      notes: "先建立 baseline output 與 held-out eval set，再比較 SFT 前後是否真的改善。",
    },
    en: {
      summary: "Uses labeled input-output or chat examples to teach a pretrained LLM a task, format, or style.",
      useWhen: "Use when the model must reliably follow a format, style, or task procedure and you have high-quality data.",
      avoidWhen: "Avoid when the goal is mostly updatable knowledge, data quality is poor, no eval set exists, or training cost is unjustified.",
      notes: "Create baseline outputs and a held-out eval set before comparing fine-tuned behavior.",
    },
  },
  {
    id: "chatml",
    name: "ChatML / chat templates",
    category: "Training data format",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["chatml", "chat-template", "messages", "dataset-format"],
    itemType: "Pattern",
    role: "Represent system/user/assistant conversations for training",
    abstractionLevel: "Data format / prompt serialization pattern",
    learningLevel: "Beginner",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "ChatML 是訓練資料格式；真正餵給模型的是 tokenizer chat template render 後的 token sequence。",
      en: "ChatML is a training data format; the model actually receives the token sequence rendered by the tokenizer chat template.",
    },
    zh: {
      summary: "把 system、user、assistant 多輪對話結構化，供 SFT 或 instruction tuning 使用。",
      useWhen: "訓練 chat/instruct model、需要多輪對話、system prompt 或 assistant-only loss。",
      avoidWhen: "模型不是 chat model，或 tokenizer/template 與 base model 不匹配。",
      notes: "不同模型的 chat template 不同；不要把 Llama、Qwen、Gemma 的特殊 token 混用。",
    },
    en: {
      summary: "Structures system, user, and assistant messages for SFT or instruction tuning.",
      useWhen: "Use for chat/instruct model training, multi-turn dialogue, system prompts, or assistant-only loss.",
      avoidWhen: "Avoid when the model is not chat-tuned or the tokenizer/template does not match the base model.",
      notes: "Chat templates differ by model; do not mix Llama, Qwen, and Gemma special tokens casually.",
    },
  },
  {
    id: "hf-datasets",
    name: "Hugging Face Datasets",
    category: "Dataset library",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["datasets", "huggingface", "train-eval-split", "jsonl"],
    itemType: "Library",
    role: "Load, transform, split, and stream training datasets",
    abstractionLevel: "Single library: dataset management",
    learningLevel: "Beginner",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "`datasets` 管資料，不負責模型訓練；它通常在 tokenizer、Trainer 或 SFTTrainer 前面。",
      en: "`datasets` manages data, not model training; it usually sits before tokenizers, Trainer, or SFTTrainer.",
    },
    zh: {
      summary: "Hugging Face 的資料集載入與處理 library，常用於 SFT train/eval split 與 JSONL/Hub 資料。",
      useWhen: "需要載入 Hub dataset、本地 JSONL、map/filter、train/test split 或 streaming。",
      avoidWhen: "資料很小且 pandas 已足夠，或資料需要複雜資料庫查詢。",
      notes: "訓練前確認 eval records 沒有混入 train，避免 loss leakage。",
    },
    en: {
      summary: "Hugging Face library for loading and processing datasets, commonly used for SFT splits and JSONL/Hub data.",
      useWhen: "Use for Hub datasets, local JSONL, map/filter, train/test splits, or streaming.",
      avoidWhen: "Avoid when data is tiny and pandas is enough, or when complex database queries are required.",
      notes: "Check that eval records do not leak into train before training.",
    },
  },
  {
    id: "peft",
    name: "PEFT",
    category: "Fine-tuning library",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["peft", "lora", "qlora", "adapter", "huggingface"],
    itemType: "Library",
    role: "Attach and train parameter-efficient adapters",
    abstractionLevel: "Single library: adapter training layer",
    learningLevel: "Beginner",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "PEFT 是 library；LoRA/QLoRA 是方法；adapter 是訓練輸出 artifact。",
      en: "PEFT is the library; LoRA/QLoRA are methods; adapters are trained artifacts.",
    },
    zh: {
      summary: "Hugging Face 的 parameter-efficient fine-tuning library，用於 LoRA、QLoRA、prompt tuning 等 adapter 方法。",
      useWhen: "想在有限 GPU 下微調大型模型，或只保存/分享小型 adapter。",
      avoidWhen: "任務需要完整更新所有權重，且你有足夠資料、算力與風險控制。",
      notes: "保存 adapter 時也要記錄 base model、tokenizer、target modules、rank、alpha。",
    },
    en: {
      summary: "Hugging Face library for parameter-efficient fine-tuning methods such as LoRA, QLoRA, and prompt tuning.",
      useWhen: "Use to fine-tune large models on limited GPUs or save/share small adapters.",
      avoidWhen: "Avoid when full weight updates are required and you have enough data, compute, and risk controls.",
      notes: "When saving adapters, record base model, tokenizer, target modules, rank, and alpha.",
    },
  },
  {
    id: "lora",
    name: "LoRA",
    category: "Fine-tuning method",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["lora", "adapter", "rank", "alpha", "peft"],
    itemType: "Method",
    role: "Train low-rank adapters instead of all model weights",
    abstractionLevel: "Parameter-efficient fine-tuning method",
    learningLevel: "Beginner",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "LoRA 只訓練低秩 adapter；rank/alpha 是容量與縮放，不是越大越好。",
      en: "LoRA trains low-rank adapters; rank/alpha control capacity and scaling, and bigger is not always better.",
    },
    zh: {
      summary: "Low-Rank Adaptation，用少量可訓練矩陣調整模型行為，降低微調顯存與儲存成本。",
      useWhen: "要快速客製任務、格式、語氣，且資料量與算力有限。",
      avoidWhen: "需要完整 domain adaptation、模型容量不足，或資料太少導致只會背答案。",
      notes: "常見起點是 rank 8/16、alpha 約為 rank 的 2 倍，但仍要用 eval set 校準。",
    },
    en: {
      summary: "Low-Rank Adaptation trains small matrices to adjust model behavior with lower memory and storage cost.",
      useWhen: "Use for quick task, format, or style customization with limited data and compute.",
      avoidWhen: "Avoid when full domain adaptation is needed, model capacity is insufficient, or data is too small and encourages memorization.",
      notes: "Common starting points are rank 8/16 and alpha around 2x rank, but always calibrate with an eval set.",
    },
  },
  {
    id: "qlora",
    name: "QLoRA",
    category: "Fine-tuning method",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["qlora", "4-bit", "nf4", "quantization", "peft"],
    itemType: "Method",
    role: "Fine-tune adapters while loading the base model in quantized form",
    abstractionLevel: "Quantized parameter-efficient fine-tuning method",
    learningLevel: "Intermediate",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "QLoRA 的重點是 4-bit quantized frozen base model + LoRA adapter，不是換成一個小模型。",
      en: "QLoRA means a 4-bit quantized frozen base model plus LoRA adapters, not replacing the model with a smaller one.",
    },
    zh: {
      summary: "把 base model 以 4-bit 量化載入，再訓練 LoRA adapters，以降低大型模型微調顯存需求。",
      useWhen: "GPU 顯存有限，但仍想微調 7B/13B 等較大模型。",
      avoidWhen: "你需要 full fine-tuning、極高數值穩定性，或硬體/套件不支援 4-bit 路徑。",
      notes: "記錄 quantization config、compute dtype、peak VRAM、eval loss，並比較是否有品質退化。",
    },
    en: {
      summary: "Loads the base model in 4-bit quantized form and trains LoRA adapters to reduce fine-tuning memory needs.",
      useWhen: "Use when GPU memory is limited but you still want to fine-tune larger models such as 7B/13B.",
      avoidWhen: "Avoid when full fine-tuning, high numerical stability, or unsupported hardware/package paths are concerns.",
      notes: "Record quantization config, compute dtype, peak VRAM, eval loss, and any quality degradation.",
    },
  },
  {
    id: "trl",
    name: "TRL / SFTTrainer",
    category: "Training library",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["trl", "sfttrainer", "trainer", "alignment", "huggingface"],
    itemType: "Library",
    role: "Run SFT and alignment-style training loops",
    abstractionLevel: "Training wrapper library",
    learningLevel: "Intermediate",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "TRL 的 SFTTrainer 負責把 model、dataset、tokenizer/template、training args 串成訓練流程。",
      en: "TRL's SFTTrainer connects model, dataset, tokenizer/template, and training args into a training workflow.",
    },
    zh: {
      summary: "Hugging Face 的 alignment training library，Class5 使用脈絡是 SFTTrainer 做 supervised fine-tuning。",
      useWhen: "需要比手寫 Trainer 更貼近 chat/instruction SFT 的訓練包裝。",
      avoidWhen: "資料格式還沒確認，或你需要完全自訂 loss/training loop。",
      notes: "先用小資料 dry run 檢查 padding、max length、loss mask，再正式訓練。",
    },
    en: {
      summary: "Hugging Face alignment-training library; in Class5 the relevant piece is SFTTrainer for supervised fine-tuning.",
      useWhen: "Use when you want a training wrapper closer to chat/instruction SFT than a hand-written Trainer loop.",
      avoidWhen: "Avoid before data format is verified or when you need a fully custom loss/training loop.",
      notes: "Run a small-data dry run to check padding, max length, and loss masks before full training.",
    },
  },
  {
    id: "trainer-trainingarguments",
    name: "TrainingArguments / Trainer",
    category: "Training API",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["trainer", "trainingarguments", "transformers", "training-loop"],
    itemType: "Framework",
    role: "Configure and run Hugging Face training loops",
    abstractionLevel: "Training loop API",
    learningLevel: "Intermediate",
    stack: "Class5 fine-tuning stack",
    learnerNote: {
      zh: "Trainer 是較通用的訓練 API；SFTTrainer 是更貼近 instruction/chat SFT 的包裝。",
      en: "Trainer is a general training API; SFTTrainer is a wrapper closer to instruction/chat SFT.",
    },
    zh: {
      summary: "Transformers 的通用訓練 API，用 TrainingArguments 控制 batch size、lr、eval、checkpoint 等設定。",
      useWhen: "要用標準 Hugging Face workflow 微調或做 baseline 訓練。",
      avoidWhen: "你需要高度客製 distributed training 或複雜 chat loss masking。",
      notes: "batch size、gradient accumulation、eval/save strategy 會直接影響顯存與可重現性。",
    },
    en: {
      summary: "General Transformers training API using TrainingArguments for batch size, learning rate, eval, checkpointing, and more.",
      useWhen: "Use for standard Hugging Face fine-tuning or baseline training workflows.",
      avoidWhen: "Avoid when highly custom distributed training or complex chat loss masking is required.",
      notes: "Batch size, gradient accumulation, eval/save strategy directly affect memory and reproducibility.",
    },
  },
  {
    id: "deepspeed",
    name: "DeepSpeed",
    category: "Distributed training",
    stage: "Fine-tuning/SFT",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-sft.md",
    tags: ["deepspeed", "zero", "distributed-training", "multi-gpu"],
    itemType: "Framework",
    role: "Shard optimizer/model states for large-scale training",
    abstractionLevel: "Distributed training framework",
    learningLevel: "Advanced",
    stack: "Class5 scaling stack",
    learnerNote: {
      zh: "DeepSpeed 是多卡與記憶體優化框架，不是 SFT 或 LoRA 方法本身。",
      en: "DeepSpeed is a multi-GPU and memory optimization framework, not the SFT or LoRA method itself.",
    },
    zh: {
      summary: "Microsoft 的大模型訓練優化框架，常用 ZeRO stage 1/2/3 分散 optimizer、gradient、parameter states。",
      useWhen: "模型或 batch 太大，單卡無法負荷，需要多 GPU 或 ZeRO/offload。",
      avoidWhen: "單卡 baseline 還沒跑通，或問題主要是資料/格式錯誤而不是顯存。",
      notes: "先跑通小模型單卡，再加入 DeepSpeed；保留 deepspeed config 與硬體資訊。",
    },
    en: {
      summary: "Microsoft large-model training optimization framework; ZeRO stages shard optimizer, gradient, and parameter states.",
      useWhen: "Use when model or batch size does not fit one GPU and multi-GPU or ZeRO/offload is needed.",
      avoidWhen: "Avoid before a single-GPU baseline works or when the issue is data/format rather than memory.",
      notes: "Get a small single-GPU run working before adding DeepSpeed; preserve config and hardware notes.",
    },
  },
  {
    id: "unsloth",
    name: "Unsloth",
    category: "Fine-tuning acceleration",
    stage: "Fine-tuning/SFT",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-finetuning-extensions.md",
    tags: ["unsloth", "lora", "qlora", "speed", "vram"],
    itemType: "Framework",
    role: "Accelerate LoRA/QLoRA fine-tuning workflows",
    abstractionLevel: "Optimized training framework",
    learningLevel: "Intermediate",
    stack: "Class5 fine-tuning extension stack",
    learnerNote: {
      zh: "Unsloth 可降低很多環境與顯存摩擦，但不能取代資料品質與 evaluation。",
      en: "Unsloth can reduce environment and memory friction, but it does not replace data quality and evaluation.",
    },
    zh: {
      summary: "針對 LLM fine-tuning 的加速/封裝工具，常見於 LoRA、QLoRA、local GPU 微調流程。",
      useWhen: "想用較少顯存或較快速度跑 LoRA/QLoRA，且模型/硬體在支援範圍內。",
      avoidWhen: "需要完全自訂訓練 loop、多卡策略尚未確認，或想先學底層概念。",
      notes: "把它標成延伸工具；先理解 PEFT/TRL/LoRA 後再用會比較穩。",
    },
    en: {
      summary: "Acceleration/wrapper tool for LLM fine-tuning, commonly used in LoRA, QLoRA, and local-GPU workflows.",
      useWhen: "Use when you want lower memory or faster LoRA/QLoRA and your model/hardware are supported.",
      avoidWhen: "Avoid when a fully custom training loop or unverified multi-GPU strategy is required, or when learning fundamentals first.",
      notes: "Marked as extension; it is easier to use well after understanding PEFT/TRL/LoRA.",
    },
  },
  {
    id: "axolotl",
    name: "Axolotl",
    category: "Fine-tuning framework",
    stage: "Fine-tuning/SFT",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-finetuning-extensions.md",
    tags: ["axolotl", "yaml", "lora", "qlora", "deepspeed", "fsdp"],
    itemType: "Framework",
    role: "Run reproducible config-driven fine-tuning",
    abstractionLevel: "Workflow framework / config-driven training stack",
    learningLevel: "Advanced",
    stack: "Class5 fine-tuning extension stack",
    learnerNote: {
      zh: "Axolotl 把資料、template、LoRA、DeepSpeed/FSDP、eval 等放進 YAML，適合可重現訓練流程。",
      en: "Axolotl puts data, templates, LoRA, DeepSpeed/FSDP, eval, and outputs into YAML for reproducible training workflows.",
    },
    zh: {
      summary: "config-driven LLM fine-tuning framework，可用 YAML 管理 dataset、LoRA/QLoRA、distributed training、eval 與輸出。",
      useWhen: "需要可重現、可分享、可擴展的 fine-tuning pipeline，而不是 notebook 手動流程。",
      avoidWhen: "你還沒理解基本 SFT/LoRA，或只是一次性小實驗。",
      notes: "不要把 YAML 當黑盒；每個設定都應能對應到資料、模型、訓練或評估決策。",
    },
    en: {
      summary: "Config-driven LLM fine-tuning framework for managing datasets, LoRA/QLoRA, distributed training, eval, and outputs.",
      useWhen: "Use when you need reproducible, shareable, scalable fine-tuning pipelines instead of manual notebook runs.",
      avoidWhen: "Avoid before understanding basic SFT/LoRA or for one-off tiny experiments.",
      notes: "Do not treat YAML as a black box; each setting should map to a data, model, training, or evaluation decision.",
    },
  },
  {
    id: "llama-factory",
    name: "LLaMA-Factory",
    category: "Fine-tuning framework",
    stage: "Fine-tuning/SFT",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-finetuning-extensions.md",
    tags: ["llama-factory", "webui", "cli", "lora", "sft"],
    itemType: "Framework",
    role: "Expose LLM fine-tuning through WebUI and CLI workflows",
    abstractionLevel: "Workflow framework / UI and CLI training stack",
    learningLevel: "Intermediate",
    stack: "Class5 fine-tuning extension stack",
    learnerNote: {
      zh: "LLaMA-Factory 的 WebUI 很適合入門，但仍要保存 config/logs，否則很難重現。",
      en: "LLaMA-Factory's WebUI is beginner-friendly, but configs/logs still need to be saved for reproducibility.",
    },
    zh: {
      summary: "提供 WebUI 與 CLI 的 LLM fine-tuning framework，支援 SFT、LoRA 等多種調校流程。",
      useWhen: "想快速用 UI/CLI 跑 fine-tuning，或教學中需要降低程式碼門檻。",
      avoidWhen: "需要極細緻自訂訓練 loop，或不願意追蹤 UI 背後的實際參數。",
      notes: "適合延伸學習；正式報告仍要記錄模型、資料、參數、eval 與輸出 artifact。",
    },
    en: {
      summary: "LLM fine-tuning framework with WebUI and CLI workflows, supporting SFT, LoRA, and related tuning modes.",
      useWhen: "Use when you want to run fine-tuning quickly through UI/CLI or lower the code barrier in learning settings.",
      avoidWhen: "Avoid when a highly custom training loop is required or when UI parameters are not tracked.",
      notes: "Good as an extension; formal reports still need model, data, parameters, eval, and output artifacts.",
    },
  },
  {
    id: "fsdp",
    name: "FSDP",
    category: "Distributed training",
    stage: "Fine-tuning/SFT",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-finetuning-extensions.md",
    tags: ["fsdp", "pytorch", "distributed-training", "multi-gpu"],
    itemType: "Framework",
    role: "Shard model parameters, gradients, and optimizer states across GPUs",
    abstractionLevel: "Distributed training framework",
    learningLevel: "Advanced",
    stack: "Class5 scaling stack",
    learnerNote: {
      zh: "FSDP 是 PyTorch 原生分散式訓練方案；和 DeepSpeed 一樣是 scaling layer，不是微調方法。",
      en: "FSDP is PyTorch-native distributed training; like DeepSpeed, it is a scaling layer, not a fine-tuning method.",
    },
    zh: {
      summary: "PyTorch Fully Sharded Data Parallel，將 parameters、gradients、optimizer states 在多個 workers 間 shard。",
      useWhen: "需要 PyTorch-native 多卡/大模型訓練，且團隊能處理分散式訓練設定。",
      avoidWhen: "單卡或 PEFT 已足夠，或你還沒有可重現的單卡 baseline。",
      notes: "先理解 batch、checkpointing、mixed precision、保存策略，再導入 FSDP。",
    },
    en: {
      summary: "PyTorch Fully Sharded Data Parallel shards parameters, gradients, and optimizer states across workers.",
      useWhen: "Use for PyTorch-native multi-GPU/large-model training when the team can manage distributed setup.",
      avoidWhen: "Avoid when single-GPU PEFT is enough or there is no reproducible single-GPU baseline.",
      notes: "Understand batch size, checkpointing, mixed precision, and saving strategy before adding FSDP.",
    },
  },
  {
    id: "vram-optimization",
    name: "Gradient checkpointing, accumulation, FlashAttention",
    category: "VRAM optimization",
    stage: "Fine-tuning/SFT",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-finetuning-extensions.md",
    tags: ["gradient-checkpointing", "gradient-accumulation", "flashattention", "vram"],
    itemType: "Workflow stack",
    role: "Reduce training memory pressure and improve throughput",
    abstractionLevel: "Optimization stack: memory/speed techniques",
    learningLevel: "Intermediate",
    stack: "Class5 optimization stack",
    learnerNote: {
      zh: "這是一組優化技巧，不是同類 package：checkpointing 省顯存，accumulation 模擬大 batch，FlashAttention 改善 attention 計算。",
      en: "This is an optimization stack, not equivalent packages: checkpointing saves memory, accumulation simulates larger batches, and FlashAttention improves attention computation.",
    },
    zh: {
      summary: "Class5 微調常見的顯存/速度優化：gradient checkpointing、gradient accumulation、FlashAttention。",
      useWhen: "顯存不足、batch 太小、attention 成本高，或需要在有限 GPU 上跑 SFT/QLoRA。",
      avoidWhen: "還沒建立 baseline，或沒有記錄 VRAM/速度就一次開太多優化。",
      notes: "每次只改一個優化項，記錄 peak VRAM、tokens/sec、eval loss。",
    },
    en: {
      summary: "Common Class5 fine-tuning memory/speed optimizations: gradient checkpointing, gradient accumulation, and FlashAttention.",
      useWhen: "Use when memory is tight, batch size is too small, attention is expensive, or SFT/QLoRA must run on limited GPUs.",
      avoidWhen: "Avoid enabling many optimizations at once before a baseline and without VRAM/speed measurements.",
      notes: "Change one optimization at a time and record peak VRAM, tokens/sec, and eval loss.",
    },
  },
  {
    id: "perplexity-eval-loss",
    name: "Perplexity / eval loss",
    category: "Evaluation metric",
    stage: "Evaluation",
    status: "Course-covered",
    course: "Class5",
    page: "content/Tool_wiki/tools/class5-evaluation.md",
    tags: ["perplexity", "eval-loss", "ppl", "fine-tuning-eval"],
    itemType: "Method",
    role: "Measure language-model prediction fit on held-out text",
    abstractionLevel: "Evaluation metric",
    learningLevel: "Beginner",
    stack: "Class5 evaluation stack",
    learnerNote: {
      zh: "PPL = exp(eval loss)。它能看語言預測能力，但不能單獨代表任務品質。",
      en: "PPL = exp(eval loss). It measures prediction fit, but not task quality by itself.",
    },
    zh: {
      summary: "用 eval loss 的指數轉換衡量模型對 held-out text 的困惑程度；越低通常代表越會預測該資料。",
      useWhen: "比較 fine-tuning checkpoints、檢查 overfitting 或追蹤訓練是否收斂。",
      avoidWhen: "把 PPL 當成 helpfulness、factuality、reasoning 或安全性的唯一指標。",
      notes: "務必防止 train/eval leakage；PPL 應搭配人工測試與任務指標。",
    },
    en: {
      summary: "Exponentiates eval loss to measure how well a model predicts held-out text; lower is usually better on that data.",
      useWhen: "Use to compare checkpoints, inspect overfitting, or track training convergence.",
      avoidWhen: "Avoid treating PPL as the only signal for helpfulness, factuality, reasoning, or safety.",
      notes: "Prevent train/eval leakage; pair PPL with manual tests and task metrics.",
    },
  },
  {
    id: "benchmarks-mmlu-gsm8k",
    name: "MMLU / GSM8K benchmarks",
    category: "Benchmark",
    stage: "Evaluation",
    status: "Extension",
    course: "Extends Class5",
    page: "content/Tool_wiki/tools/class5-evaluation.md",
    tags: ["mmlu", "gsm8k", "benchmark", "catastrophic-forgetting"],
    itemType: "Method",
    role: "Check broad capability retention after fine-tuning",
    abstractionLevel: "Evaluation benchmark suite",
    learningLevel: "Advanced",
    stack: "Class5 evaluation stack",
    learnerNote: {
      zh: "標準 benchmark 用來檢查模型是否因微調變笨；它們不是你任務專屬 eval set 的替代品。",
      en: "Standard benchmarks help check whether fine-tuning degraded general ability; they do not replace your task-specific eval set.",
    },
    zh: {
      summary: "MMLU、GSM8K 等標準測驗可用於觀察微調後的一般知識與推理能力是否退化。",
      useWhen: "微調後要檢查 catastrophic forgetting 或 general capability regression。",
      avoidWhen: "資料/任務很小且只需快速教學 demo，或 benchmark 與任務完全不相關。",
      notes: "同時保留 domain eval；benchmark 分數下降不一定代表任務失敗，但需要解釋。",
    },
    en: {
      summary: "Benchmarks such as MMLU and GSM8K help inspect whether general knowledge or reasoning regressed after fine-tuning.",
      useWhen: "Use when checking catastrophic forgetting or general capability regression after fine-tuning.",
      avoidWhen: "Avoid for tiny teaching demos or when benchmarks are unrelated to the task.",
      notes: "Keep domain evals too; benchmark drops may not mean task failure, but they need explanation.",
    },
  },
  {
    id: "hybrid-search-class5",
    name: "Hybrid retrieval with FAISS + SQLite FTS5/BM25",
    category: "Hybrid retrieval",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class5 HW, extends Class4",
    page: "content/Tool_wiki/tools/class5-hybrid-retrieval.md",
    tags: ["hybrid-search", "faiss", "sqlite", "fts5", "bm25", "rrf", "recall-at-k"],
    itemType: "Workflow stack",
    role: "Combine dense vector search with sparse keyword search",
    abstractionLevel: "Retrieval workflow stack",
    learningLevel: "Intermediate",
    stack: "Class5 hybrid retrieval stack",
    learnerNote: {
      zh: "這是 Class5 HW 的主線：FAISS 找語意相似，SQLite FTS5/BM25 找 exact terms，再用 fusion 合併排名。",
      en: "This is the Class5 HW path: FAISS finds semantic similarity, SQLite FTS5/BM25 finds exact terms, then fusion merges rankings.",
    },
    zh: {
      summary: "把 dense vector search 和 sparse keyword search 合併，改善 RAG retrieval 對語意與精確詞的覆蓋。",
      useWhen: "純 embedding search 漏掉專有名詞、數字、code、縮寫，或純 keyword search 抓不到語意相近內容。",
      avoidWhen: "沒有 query set/evaluation，或資料太小而 simple search 已足夠。",
      notes: "至少比較 vector-only、keyword-only、hybrid，並報告 Recall@k 或 Hit Rate@k。",
    },
    en: {
      summary: "Combines dense vector search and sparse keyword search to improve RAG retrieval coverage for semantics and exact terms.",
      useWhen: "Use when embedding search misses entities, numbers, code, abbreviations, or keyword search misses semantic matches.",
      avoidWhen: "Avoid when there is no query set/evaluation or when simple search is enough for a tiny corpus.",
      notes: "Compare vector-only, keyword-only, and hybrid retrieval with Recall@k or Hit Rate@k.",
    },
  },
  {
    id: "sqlite-fts5-bm25",
    name: "SQLite FTS5 / BM25",
    category: "Keyword search",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class5 HW",
    page: "content/Tool_wiki/tools/class5-hybrid-retrieval.md",
    tags: ["sqlite", "fts5", "bm25", "sparse-search", "keyword"],
    itemType: "Method",
    role: "Retrieve exact-term matches for hybrid search",
    abstractionLevel: "Sparse retrieval method / local database feature",
    learningLevel: "Intermediate",
    stack: "Class5 hybrid retrieval stack",
    learnerNote: {
      zh: "FTS5/BM25 是 sparse keyword retrieval；它和 FAISS 的向量相似度分數不是同一尺度。",
      en: "FTS5/BM25 is sparse keyword retrieval; its scores are not on the same scale as FAISS vector similarity.",
    },
    zh: {
      summary: "SQLite 的 full-text search 可建立本地 keyword index；BM25 是常見的關鍵字相關性排序方法。",
      useWhen: "需要 exact term、專有名詞、數字、縮寫、metadata 附近文字搜尋。",
      avoidWhen: "問題高度語意化且沒有明確詞彙線索，或中文斷詞/tokenization 尚未處理。",
      notes: "和 FAISS 合併時要做 normalization 或 rank fusion，不要直接混用原始分數。",
    },
    en: {
      summary: "SQLite full-text search can build a local keyword index; BM25 is a common keyword relevance ranking method.",
      useWhen: "Use for exact terms, entities, numbers, abbreviations, and metadata-nearby text search.",
      avoidWhen: "Avoid when questions are highly semantic with no lexical cues, or tokenization is not handled.",
      notes: "Use normalization or rank fusion when combining with FAISS; do not mix raw scores blindly.",
    },
  },
  {
    id: "rrf",
    name: "Reciprocal Rank Fusion (RRF)",
    category: "Retrieval fusion",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class5 HW",
    page: "content/Tool_wiki/tools/class5-hybrid-retrieval.md",
    tags: ["rrf", "rank-fusion", "hybrid-search", "retrieval"],
    itemType: "Method",
    role: "Merge ranked lists from dense and sparse retrievers",
    abstractionLevel: "Retrieval ranking method",
    learningLevel: "Intermediate",
    stack: "Class5 hybrid retrieval stack",
    learnerNote: {
      zh: "RRF 用排名合併結果，通常比直接混合不同尺度的 raw scores 更穩。",
      en: "RRF merges by rank, often more robust than mixing raw scores from different scales.",
    },
    zh: {
      summary: "一種把多個 retriever 的排名清單合併成單一排名的 rank fusion 方法。",
      useWhen: "FAISS 和 BM25 分數尺度不同，但你想保留兩邊 top results。",
      avoidWhen: "你已經有校準過的分數模型，或需要可學習的 reranker。",
      notes: "RRF 仍需用 query set 比較；不要假設 hybrid 一定比 baseline 好。",
    },
    en: {
      summary: "Rank fusion method that merges multiple retriever result lists into one ranking.",
      useWhen: "Use when FAISS and BM25 scores are on different scales but both top result sets are useful.",
      avoidWhen: "Avoid when calibrated score models or learned rerankers are available and validated.",
      notes: "Evaluate RRF with a query set; do not assume hybrid always beats baselines.",
    },
  },
  {
    id: "faiss-vector-search",
    name: "FAISS",
    category: "Vector search",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class4",
    page: "content/Tool_wiki/tools/faiss-vector-search.md",
    tags: ["vector-search", "local-index", "nearest-neighbor"],
    zh: {
      summary: "Meta 開源的 vector similarity search library，適合本地 RAG prototype。",
      useWhen: "本地 demo、notebook、單機 RAG 或理解 vector search。",
      avoidWhen: "需要多租戶、metadata schema、cloud persistence 或水平擴展。",
      notes: "FAISS index 是 derived artifact；保留原始 chunks 與 metadata。",
    },
    en: {
      summary: "Meta's vector similarity search library, useful for local RAG prototypes.",
      useWhen: "Use for local demos, notebooks, single-machine RAG, and vector-search learning.",
      avoidWhen: "Avoid when multitenancy, metadata schemas, cloud persistence, or scaling are required.",
      notes: "Treat FAISS indexes as derived artifacts; keep original chunks and metadata.",
    },
  },
  {
    id: "langchain-rag",
    name: "LangChain RetrievalQA",
    category: "RAG chain",
    stage: "RAG/search",
    status: "Course-covered",
    course: "Class4",
    page: "content/Tool_wiki/tools/langchain-rag.md",
    tags: ["rag", "retrievalqa", "chunking", "vectorstore"],
    zh: {
      summary: "用 LangChain loaders、splitters、embedding、FAISS、RetrievalQA 建 RAG pipeline。",
      useWhen: "快速建立 RAG prototype、測 chunk size、比較 embedding model。",
      avoidWhen: "需要嚴格 production RAG，還沒補 evaluation/tracing/citation。",
      notes: "先檢查 chunks 是否合理；很多 RAG 失敗是 chunking 失敗。",
    },
    en: {
      summary: "Builds RAG with LangChain loaders, splitters, embeddings, FAISS, and RetrievalQA.",
      useWhen: "Use for quick RAG prototypes, chunk-size tests, and embedding comparisons.",
      avoidWhen: "Avoid for strict production RAG without evaluation, tracing, and citation design.",
      notes: "Inspect chunks first; many RAG failures are chunking failures.",
    },
  },
  {
    id: "supplemental-rag-frameworks",
    name: "LlamaIndex and LiteLLM",
    category: "Framework/gateway",
    stage: "RAG/search",
    status: "Supplemental",
    course: "Beyond Class1-Class5",
    page: "content/Tool_wiki/tools/supplemental-rag-frameworks.md",
    tags: ["llamaindex", "litellm", "rag-framework", "gateway"],
    zh: {
      summary: "LlamaIndex 偏 data/RAG-first；LiteLLM 是多 provider gateway。",
      useWhen: "需要多資料來源 RAG 或多 LLM provider routing。",
      avoidWhen: "只需要單一 API call 或尚未理解 basic RAG failure modes。",
      notes: "框架不能修復 source text、chunk、retrieval 的基本品質問題。",
    },
    en: {
      summary: "LlamaIndex is data/RAG-first; LiteLLM is a multi-provider gateway.",
      useWhen: "Use for multi-source RAG or multi-provider LLM routing.",
      avoidWhen: "Avoid for single API calls or before understanding basic RAG failures.",
      notes: "Frameworks do not fix source text, chunking, or retrieval quality.",
    },
  },
  {
    id: "supplemental-vector-databases",
    name: "Vector databases",
    category: "Vector DBs",
    stage: "RAG/search",
    status: "Supplemental",
    course: "Beyond Class4",
    page: "content/Tool_wiki/tools/supplemental-vector-databases.md",
    tags: ["chroma", "qdrant", "weaviate", "lancedb", "milvus", "pinecone", "pgvector"],
    zh: {
      summary: "Chroma、Qdrant、Weaviate、LanceDB、Milvus、Pinecone、pgvector 等 FAISS 替代/升級選項。",
      useWhen: "需要 metadata filtering、persistence、cloud deployment 或 production integration。",
      avoidWhen: "只是小型 notebook prototype，FAISS 已足夠。",
      notes: "vector DB 不是 RAG 品質保證；bad chunks 仍會失敗。",
    },
    en: {
      summary: "Chroma, Qdrant, Weaviate, LanceDB, Milvus, Pinecone, and pgvector as FAISS alternatives.",
      useWhen: "Use for metadata filtering, persistence, cloud deployment, or production integration.",
      avoidWhen: "Avoid when a small notebook prototype works with FAISS.",
      notes: "A vector DB does not guarantee RAG quality; bad chunks still fail.",
    },
  },
  {
    id: "supplemental-document-extraction",
    name: "Docling, MarkItDown, Unstructured",
    category: "Document extraction",
    stage: "Document extraction",
    status: "Supplemental",
    course: "Beyond Class3",
    page: "content/Tool_wiki/tools/supplemental-document-extraction.md",
    tags: ["docling", "markitdown", "unstructured", "documents"],
    zh: {
      summary: "文件轉換與 partition 工具，補足 OCR 之外的 PDF/Office/HTML ingestion。",
      useWhen: "需要把多格式文件統一成 markdown、JSON 或 typed elements。",
      avoidWhen: "文件很簡單，PyPDF/text extraction 已足夠。",
      notes: "保存原始檔、extracted text、metadata 和錯誤樣本。",
    },
    en: {
      summary: "Document conversion and partitioning tools beyond OCR for PDF/Office/HTML ingestion.",
      useWhen: "Use to normalize many file formats into markdown, JSON, or typed elements.",
      avoidWhen: "Avoid when simple PyPDF/text extraction is enough.",
      notes: "Keep original files, extracted text, metadata, and error samples.",
    },
  },
  {
    id: "class1-prompt-api-extensions",
    name: "Class1 prompt/API extensions",
    category: "Prompt/API extensions",
    stage: "Prompting/API",
    status: "Extension",
    course: "Extends Class1",
    page: "content/Tool_wiki/tools/class1-prompt-api-extensions.md",
    tags: ["instructor", "pydantic-ai", "dspy", "langgraph", "litellm"],
    zh: {
      summary: "Instructor、Pydantic AI、DSPy、LangGraph、LiteLLM 等 prompt/API 進階工具。",
      useWhen: "需要 reliable structured output、typed agents、prompt optimization 或 provider routing。",
      avoidWhen: "只是學基本 prompt 或一次性 demo。",
      notes: "最小路徑是 prompt -> JSON parse -> Pydantic validation -> retry/fallback -> eval set。",
    },
    en: {
      summary: "Instructor, Pydantic AI, DSPy, LangGraph, LiteLLM, and related prompt/API extensions.",
      useWhen: "Use for reliable structured output, typed agents, prompt optimization, or provider routing.",
      avoidWhen: "Avoid for basic prompt learning or one-off demos.",
      notes: "Minimal path: prompt -> JSON parse -> Pydantic validation -> retry/fallback -> eval set.",
    },
  },
  {
    id: "class2-local-inference-extensions",
    name: "Class2 local inference extensions",
    category: "Local inference extensions",
    stage: "Local inference",
    status: "Extension",
    course: "Extends Class2",
    page: "content/Tool_wiki/tools/class2-local-inference-extensions.md",
    tags: ["llama.cpp", "gguf", "lm-studio", "sglang", "tgi", "mlx"],
    zh: {
      summary: "llama.cpp/GGUF、LM Studio、SGLang、TGI、MLX、quantization 等本地推論延伸。",
      useWhen: "需要 quantized local model、desktop local LLM 或 production serving。",
      avoidWhen: "只是比較 prompt output，Ollama 或 Transformers 已足夠。",
      notes: "分清 model weights、runtime/engine、API wrapper 三層。",
    },
    en: {
      summary: "llama.cpp/GGUF, LM Studio, SGLang, TGI, MLX, and quantization extensions.",
      useWhen: "Use for quantized local models, desktop local LLMs, or production serving.",
      avoidWhen: "Avoid when Ollama or Transformers is enough for prompt-output comparison.",
      notes: "Separate model weights, runtime/engine, and API wrapper layers.",
    },
  },
  {
    id: "class3-data-extraction-extensions",
    name: "Class3 data/extraction extensions",
    category: "Data/extraction extensions",
    stage: "Data collection",
    status: "Extension",
    course: "Extends Class3",
    page: "content/Tool_wiki/tools/class3-data-extraction-extensions.md",
    tags: ["scrapy", "playwright", "crawl4ai", "mineru", "docling", "whisperx", "pyannote"],
    zh: {
      summary: "Scrapy、Playwright、Crawl4AI、MinerU、Docling、WhisperX、pyannote 等資料抽取延伸。",
      useWhen: "遇到 dynamic websites、複雜 PDF、多 speaker audio 或 corpus scale 問題。",
      avoidWhen: "source 很少或 extraction baseline 尚未清楚。",
      notes: "保存原始檔、raw extracted output、cleaned text、quality notes 四層。",
    },
    en: {
      summary: "Scrapy, Playwright, Crawl4AI, MinerU, Docling, WhisperX, pyannote, and related extensions.",
      useWhen: "Use for dynamic sites, complex PDFs, multi-speaker audio, or corpus-scale issues.",
      avoidWhen: "Avoid when sources are small or extraction baselines are unclear.",
      notes: "Preserve original files, raw extracted output, cleaned text, and quality notes.",
    },
  },
  {
    id: "tool-plugin-protocol-extensions",
    name: "Tool calling, plugins, MCP",
    category: "Tool/plugin/protocol",
    stage: "Tool/plugin layer",
    status: "Extension",
    course: "Extends Class1-Class5",
    page: "content/Tool_wiki/tools/tool-plugin-protocol-extensions.md",
    tags: ["tool-calling", "mcp", "plugins", "agents", "schema"],
    zh: {
      summary: "OpenAI tool calling、MCP、LangChain tools、Pydantic AI toolsets、host-level plugins。",
      useWhen: "模型需要查檔案、呼叫 API、控制 browser、操作 GitHub 或讀資料庫。",
      avoidWhen: "只是簡單問答或單一 API call。",
      notes: "每個 tool 都要定義 input schema、side effects、permission boundary、failure behavior。",
    },
    en: {
      summary: "OpenAI tool calling, MCP, LangChain tools, Pydantic AI toolsets, and host-level plugins.",
      useWhen: "Use when models need to search files, call APIs, control browsers, operate GitHub, or query DBs.",
      avoidWhen: "Avoid for simple Q&A or single API calls.",
      notes: "Every tool needs input schema, side effects, permission boundaries, and failure behavior.",
    },
  },
  {
    id: "advanced-rag-patterns",
    name: "Advanced RAG patterns",
    category: "Advanced RAG",
    stage: "RAG/search",
    status: "Extension",
    course: "Extends Class4",
    page: "content/Tool_wiki/tools/advanced-rag-patterns.md",
    tags: ["cag", "graphrag", "agentic-retrieval", "query-decomposition"],
    zh: {
      summary: "CAG、GraphRAG、agentic retrieval、query decomposition 等 baseline RAG 之後的設計選項。",
      useWhen: "baseline RAG 找錯 chunk、citation 弱、跨文件推理差或 latency 太高。",
      avoidWhen: "source extraction、chunking、metadata、evaluation 還沒做好。",
      notes: "每次只改一個 retrieval component，保存 query set 與 retrieved chunks。",
    },
    en: {
      summary: "CAG, GraphRAG, agentic retrieval, query decomposition, and other post-baseline RAG patterns.",
      useWhen: "Use when baseline RAG has wrong chunks, weak citations, poor cross-document reasoning, or high latency.",
      avoidWhen: "Avoid before source extraction, chunking, metadata, and evaluation are ready.",
      notes: "Change one retrieval component at a time and store query sets plus retrieved chunks.",
    },
  },
  {
    id: "retrieval-enhancement",
    name: "Hybrid search and reranking",
    category: "Retrieval enhancement",
    stage: "RAG/search",
    status: "Extension",
    course: "Extends Class4",
    page: "content/Tool_wiki/tools/retrieval-enhancement.md",
    tags: ["bm25", "hybrid-search", "rrf", "reranking", "cohere", "bge"],
    zh: {
      summary: "BM25、hybrid search、RRF、reranking、query rewriting、MMR 等 retrieval 改善方法。",
      useWhen: "embedding search 漏掉 exact term、code、專有名詞、數字或 top-k 太雜。",
      avoidWhen: "corpus 很小，long-context/CAG 更簡單，或 extraction text 本身錯。",
      notes: "比較 dense-only、sparse-only、hybrid，並看 recall/citation/latency。",
    },
    en: {
      summary: "BM25, hybrid search, RRF, reranking, query rewriting, MMR, and related retrieval improvements.",
      useWhen: "Use when embedding search misses exact terms, code, entities, numbers, or has noisy top-k.",
      avoidWhen: "Avoid when the corpus is small enough for CAG or extracted text itself is wrong.",
      notes: "Compare dense-only, sparse-only, and hybrid by recall, citation correctness, and latency.",
    },
  },
  {
    id: "knowledge-graphs-graphrag",
    name: "Knowledge graphs and GraphRAG",
    category: "Graph retrieval",
    stage: "RAG/search",
    status: "Extension",
    course: "Extends Class4",
    page: "content/Tool_wiki/tools/knowledge-graphs-graphrag.md",
    tags: ["knowledge-graph", "graphrag", "neo4j", "entity", "relationship"],
    zh: {
      summary: "把 entity、relationship、claim/event 轉成 graph，支援跨文件與全局 synthesis。",
      useWhen: "問題需要跨文件 entity/relationship reasoning 或 corpus-level summaries。",
      avoidWhen: "corpus 小、schema 不清、entity extraction 無法驗證。",
      notes: "先確認問題真的需要 graph，不只是找最相關段落。",
    },
    en: {
      summary: "Represents entities, relationships, claims/events as graphs for cross-document synthesis.",
      useWhen: "Use for cross-document entity/relationship reasoning or corpus-level summaries.",
      avoidWhen: "Avoid when the corpus is small, schema is unclear, or extraction cannot be validated.",
      notes: "First confirm the question truly needs a graph, not just relevant passages.",
    },
  },
  {
    id: "dci-agent-lite",
    name: "DCI-Agent-Lite",
    category: "Direct corpus interaction",
    stage: "RAG/search",
    status: "Extension",
    course: "Extends Class3-Class4",
    page: "content/Tool_wiki/tools/dci-agent-lite.md",
    tags: ["dci", "agentic-search", "raw-corpus", "rg", "provenance"],
    zh: {
      summary: "讓 agent 直接用 rg/find/sed 查 raw corpus，而不是只透過固定 retriever。",
      useWhen: "local files 可搜尋，且問題需要多步查證、行號、figure/table sidecar。",
      avoidWhen: "corpus 沒整理成可搜尋檔案，或缺少 provenance。",
      notes: "保持 raw-file searchable，不要太早把所有內容藏進 database。",
    },
    en: {
      summary: "Lets agents inspect raw corpora with rg/find/sed instead of only using fixed retrievers.",
      useWhen: "Use when local files are searchable and questions need multi-step evidence lookup.",
      avoidWhen: "Avoid when the corpus is not searchable or provenance is missing.",
      notes: "Keep raw files searchable; do not hide everything in a database too early.",
    },
  },
  {
    id: "rag-evaluation-observability",
    name: "RAG evaluation and observability",
    category: "Evaluation",
    stage: "Evaluation",
    status: "Extension",
    course: "Extends Class1, Class4",
    page: "content/Tool_wiki/tools/rag-evaluation-observability.md",
    tags: ["ragas", "deepeval", "phoenix", "langsmith", "langfuse", "tracing"],
    zh: {
      summary: "用 eval set、metrics、traces 判斷錯誤來自 extraction、retrieval、prompt 還是 generation。",
      useWhen: "RAG 從 demo 走向可重複使用，需要判斷改動是否真的變好。",
      avoidWhen: "一開始就追求大型自動 metric，卻沒有小而高品質的 query set。",
      notes: "保存 expected evidence，不只保存 expected answer。",
    },
    en: {
      summary: "Uses eval sets, metrics, and traces to locate failures in extraction, retrieval, prompting, or generation.",
      useWhen: "Use when RAG moves beyond demos and changes need measurable validation.",
      avoidWhen: "Avoid chasing large metric suites before building a small high-quality query set.",
      notes: "Store expected evidence, not only expected answers.",
    },
  },
];

export const statusOrder: ToolStatus[] = ["Course-covered", "Supplemental", "Extension"];

export const pipelineHighlights = [
  {
    stage: "Prompting/API",
    zh: "從 prompt engineering 走到 structured output、tool calling、多 provider routing。",
    en: "From prompt engineering to structured output, tool calling, and provider routing.",
  },
  {
    stage: "Local inference",
    zh: "從 notebook model loading 走到 quantization、local server、production serving。",
    en: "From notebook model loading to quantization, local servers, and production serving.",
  },
  {
    stage: "Data collection",
    zh: "從 static scraping 走到 dynamic crawling、LLM-ready extraction、多格式 corpus。",
    en: "From static scraping to dynamic crawling, LLM-ready extraction, and multi-format corpora.",
  },
  {
    stage: "RAG/search",
    zh: "從 FAISS baseline 走到 Class5 hybrid retrieval、BM25/FTS5、RRF、reranking、GraphRAG、DCI、evaluation。",
    en: "From FAISS baseline to Class5 hybrid retrieval, BM25/FTS5, RRF, reranking, GraphRAG, DCI, and evaluation.",
  },
  {
    stage: "Fine-tuning/SFT",
    zh: "從 ChatML 與資料切分走到 SFT、LoRA/QLoRA、PEFT/TRL、顯存優化、多卡訓練與 PPL/benchmark evaluation。",
    en: "From ChatML and data splits to SFT, LoRA/QLoRA, PEFT/TRL, VRAM optimization, distributed training, and PPL/benchmark evaluation.",
  },
];
