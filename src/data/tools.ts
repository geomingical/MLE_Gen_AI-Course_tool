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
    course: "Beyond Class1-Class4",
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
    course: "Extends Class1-Class4",
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
    zh: "從 FAISS baseline 走到 hybrid search、reranking、GraphRAG、DCI、evaluation。",
    en: "From FAISS baseline to hybrid search, reranking, GraphRAG, DCI, and evaluation.",
  },
];
