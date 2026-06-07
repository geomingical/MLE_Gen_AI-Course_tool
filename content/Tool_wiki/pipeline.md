# Pipeline Matrix / 技術流矩陣

## 中文

| 技術階段 | 你在做什麼 | 課程/HW 對應 | 主要工具 | 常見決策 |
| --- | --- | --- | --- | --- |
| Prompting and API | 跟 LLM 溝通、要求格式化輸出、呼叫模型 API | Class1 prompt engineering, structured JSON/XML output | OpenAI SDK, Ollama, LangChain prompt/LCEL | API 模型還是本地模型？手寫 prompt 還是用框架管理？ |
| Prompting/API extensions | typed output、prompt optimization、多 provider routing、agent framework | Extension of Class1 | Instructor, Pydantic AI, DSPy, LangGraph, LiteLLM | prompt-only 夠不夠？需要 schema validation 或 agent state 嗎？ |
| Local inference | 下載、載入、推論 open-source LLM | Class2 LLM inference and serving | Transformers, Hugging Face Hub, PyTorch, accelerate, vLLM | notebook demo、local server、還是 production serving？ |
| Local inference extensions | quantized local model、desktop local LLM、production serving | Extension of Class2 | llama.cpp/GGUF, LM Studio, SGLang, TGI, MLX | 本地 daily use、consumer hardware、還是高吞吐 serving？ |
| Data collection | 從網頁或論文頁面抓資料 | Class3 data collection, Class2 HW scraping output | requests, BeautifulSoup, Trafilatura | 原始 HTML 是否需要 main-text extraction？是否要保留 metadata？ |
| Document extraction | 從 PDF、圖片或掃描文件抽文字 | Class3 OCR, Class2 HW OCR | Tesseract, pytesseract, Surya | 簡單 OCR 足夠，還是需要 layout-aware extraction？ |
| Audio and voice | 音訊轉文字、語音 agent、語音輸出 | Class3 voice agent HW | Whisper, faster-whisper, FastAPI, TTS tools | 批次轉錄還是互動式 voice agent？速度、準確率、硬體如何取捨？ |
| Data/extraction extensions | dynamic crawling、LLM-ready web extraction、complex PDF parsing、speaker diarization | Extension of Class3 | Scrapy, Playwright, Crawl4AI, MinerU, Docling, WhisperX, pyannote | 是靜態網頁、動態網頁、PDF、音訊，還是多格式 corpus？ |
| Cleaning and dedup | 去除髒資料、重複內容、語言/PII 問題 | Class3 cleaning, Class2 HW cleaning | pandas, regex, langdetect, spaCy, datasketch | 要保留多少原始資料？去重 threshold 是否會誤刪？ |
| RAG | chunk、embedding、index、retrieval、generation | Class4 RAG resume AI | sentence-transformers, OpenAI embeddings, FAISS, LangChain RetrievalQA | chunk size、embedding model、vector DB、citation strategy 如何選？ |
| Hybrid retrieval | 結合 dense vector search 與 sparse keyword search | Class5 HW, extends Class4 RAG | FAISS, SQLite FTS5, BM25, RRF, Recall@k | semantic match 與 exact keyword match 如何合併？ |
| RAG/search extensions | CAG、GraphRAG、hybrid search、reranking、DCI、evaluation | Extension of Class4-Class5 retrieval | CAG, GraphRAG, BM25, rerankers, DCI-Agent-Lite, RAGAS, Phoenix | 失敗點是 retrieval、corpus structure、latency，還是 evaluation 不足？ |
| Fine-tuning/SFT | 用 labeled examples 調整模型行為、格式或語氣 | Class5 SFT lecture | ChatML, Hugging Face Datasets, PEFT, LoRA, QLoRA, TRL, DeepSpeed | 問題需要改模型權重，還是 prompt/RAG 已足夠？ |
| Fine-tuning extensions | 加速、封裝、多卡與顯存優化 | Extension of Class5 | Unsloth, Axolotl, LLaMA-Factory, FSDP, gradient checkpointing, FlashAttention | 要先學底層，還是用 framework 提高可重現性與效率？ |
| Tool/plugin/protocol layer | 讓模型穩定呼叫外部工具與 app | Extension across Class1-Class5 | OpenAI tool calling, MCP, LangChain tools, Pydantic AI toolsets, plugins | 工具權限、side effects、schema、provenance 是否清楚？ |
| Serving and integration | 將工具串成可呼叫的服務或 agent | Class3 voice agent, Class4 vLLM-compatible endpoint | FastAPI, vLLM, OpenAI-compatible APIs | 只是 demo server，還是要可部署和可觀測？ |
| Evaluation | 測試輸出品質、retrieval 命中、fine-tuning loss 與失敗案例 | Class1 defects, Class4 RAG evaluation, Class5 PPL/Recall@k | manual cases, PPL/eval loss, Recall@k, MMLU/GSM8K, RAGAS/Phoenix | 評估 hallucination、citation、latency、cost、PPL 還是 retrieval recall？ |

## English

| Stage | What you are doing | Course/HW mapping | Main tools | Typical decision |
| --- | --- | --- | --- | --- |
| Prompting and API | Communicate with LLMs, request structured output, call model APIs | Class1 prompt engineering, structured JSON/XML output | OpenAI SDK, Ollama, LangChain prompt/LCEL | API model or local model? Handwritten prompt or framework-managed prompt? |
| Prompting/API extensions | Typed output, prompt optimization, provider routing, agent frameworks | Extension of Class1 | Instructor, Pydantic AI, DSPy, LangGraph, LiteLLM | Is prompt-only enough? Do you need schema validation or agent state? |
| Local inference | Download, load, and run open-source LLMs | Class2 LLM inference and serving | Transformers, Hugging Face Hub, PyTorch, accelerate, vLLM | Notebook demo, local server, or production serving? |
| Local inference extensions | Quantized local models, desktop local LLMs, production serving | Extension of Class2 | llama.cpp/GGUF, LM Studio, SGLang, TGI, MLX | Daily local use, consumer hardware, or high-throughput serving? |
| Data collection | Collect text and metadata from web or paper pages | Class3 data collection, Class2 HW scraping output | requests, BeautifulSoup, Trafilatura | Is raw HTML enough, or do you need main-text extraction and metadata? |
| Document extraction | Extract text from PDFs, images, or scanned documents | Class3 OCR, Class2 HW OCR | Tesseract, pytesseract, Surya | Is simple OCR enough, or do you need layout-aware extraction? |
| Audio and voice | Transcribe audio, build voice agents, synthesize speech | Class3 voice agent HW | Whisper, faster-whisper, FastAPI, TTS tools | Batch transcription or interactive voice agent? How do speed, accuracy, and hardware trade off? |
| Data/extraction extensions | Dynamic crawling, LLM-ready web extraction, complex PDF parsing, speaker diarization | Extension of Class3 | Scrapy, Playwright, Crawl4AI, MinerU, Docling, WhisperX, pyannote | Static web, dynamic web, PDF, audio, or multi-format corpus? |
| Cleaning and dedup | Remove noisy data, duplicates, language issues, and PII | Class3 cleaning, Class2 HW cleaning | pandas, regex, langdetect, spaCy, datasketch | How much raw data should remain? Can the dedup threshold remove useful near-duplicates? |
| RAG | Chunk, embed, index, retrieve, and generate grounded answers | Class4 RAG resume AI | sentence-transformers, OpenAI embeddings, FAISS, LangChain RetrievalQA | How should chunk size, embedding model, vector DB, and citations be chosen? |
| Hybrid retrieval | Combine dense vector search with sparse keyword search | Class5 HW, extends Class4 RAG | FAISS, SQLite FTS5, BM25, RRF, Recall@k | How should semantic matches and exact keyword matches be fused? |
| RAG/search extensions | CAG, GraphRAG, hybrid search, reranking, DCI, evaluation | Extension of Class4-Class5 retrieval | CAG, GraphRAG, BM25, rerankers, DCI-Agent-Lite, RAGAS, Phoenix | Is the failure retrieval, corpus structure, latency, or missing evaluation? |
| Fine-tuning/SFT | Adapt model behavior, format, or style with labeled examples | Class5 SFT lecture | ChatML, Hugging Face Datasets, PEFT, LoRA, QLoRA, TRL, DeepSpeed | Does the problem need weight updates, or are prompt/RAG enough? |
| Fine-tuning extensions | Add acceleration, wrappers, distributed training, and memory optimization | Extension of Class5 | Unsloth, Axolotl, LLaMA-Factory, FSDP, gradient checkpointing, FlashAttention | Learn the internals first, or use frameworks for reproducibility and speed? |
| Tool/plugin/protocol layer | Let models call external tools and apps reliably | Extension across Class1-Class5 | OpenAI tool calling, MCP, LangChain tools, Pydantic AI toolsets, plugins | Are permissions, side effects, schema, and provenance clear? |
| Serving and integration | Turn tools into callable services or agent components | Class3 voice agent, Class4 vLLM-compatible endpoint | FastAPI, vLLM, OpenAI-compatible APIs | Demo server or deployable service with observability? |
| Evaluation | Test output quality, retrieval hits, fine-tuning loss, and failure cases | Class1 defects, Class4 RAG evaluation, Class5 PPL/Recall@k | manual cases, PPL/eval loss, Recall@k, MMLU/GSM8K, RAGAS/Phoenix | Which matters most: hallucination, citations, latency, cost, PPL, or retrieval recall? |
