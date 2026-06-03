# Tool Catalog / 工具總表

## 中文

| 工具 | 分類 | 狀態 | 課程/HW 對應 | 頁面 |
| --- | --- | --- | --- | --- |
| OpenAI Python SDK | LLM API | Course-covered | Class1 lecture/HW, Class4 embeddings/LLM | [openai-sdk](tools/openai-sdk.md) |
| Ollama | Local model API | Course-covered | Class1 HW OpenAI-compatible local endpoint | [ollama](tools/ollama.md) |
| LangChain prompting/LCEL | Prompt orchestration | Course-covered | Class1 HW, Class4 RAG | [langchain](tools/langchain.md) |
| Structured output patterns | Output control | Course-covered | Class1 JSON/XML tasks | [structured-output](tools/structured-output.md) |
| Transformers | Local inference | Course-covered | Class2 lecture, Class3 summarization pipeline | [transformers](tools/transformers.md) |
| Hugging Face Hub | Model registry | Course-covered | Class2 model download/login | [huggingface-hub](tools/huggingface-hub.md) |
| PyTorch and accelerate | Runtime | Course-covered | Class2 inference environment | [pytorch-accelerate](tools/pytorch-accelerate.md) |
| vLLM | LLM serving | Course-covered | Class2 serving, Class4 compatible endpoint | [vllm](tools/vllm.md) |
| requests | HTTP client package | Course-covered | Class2/Class3 web extraction fetch layer | [web-scraping](tools/web-scraping.md) |
| BeautifulSoup | HTML parser library | Course-covered | Class2/Class3 web extraction parse layer | [web-scraping](tools/web-scraping.md) |
| Trafilatura | Content extraction library | Course-covered | Class2/Class3 web extraction main-text layer | [web-scraping](tools/web-scraping.md) |
| requests, BeautifulSoup, Trafilatura | Web extraction | Course-covered | Class3, Class2 HW output | [web-scraping](tools/web-scraping.md) |
| Tesseract OCR | OCR engine/runtime | Course-covered | Class2/Class3 OCR engine layer | [ocr-tools](tools/ocr-tools.md) |
| pytesseract | Python OCR wrapper package | Course-covered | Class2/Class3 Python wrapper around Tesseract | [ocr-tools](tools/ocr-tools.md) |
| Surya | Layout-aware OCR/document extraction library | Course-covered | Class2/Class3 layout-aware OCR extension | [ocr-tools](tools/ocr-tools.md) |
| Tesseract, pytesseract, Surya | OCR | Course-covered | Class3, Class2 HW OCR | [ocr-tools](tools/ocr-tools.md) |
| Whisper, faster-whisper | ASR | Course-covered | Class3 voice agent, Class2 HW ASR | [audio-asr](tools/audio-asr.md) |
| pandas | Dataframe library | Course-covered | Class2/Class3 cleaning inspection and reporting | [cleaning-dedup](tools/cleaning-dedup.md) |
| regex / regular expressions | Cleaning method | Course-covered | Class2/Class3 rule-based cleaning | [cleaning-dedup](tools/cleaning-dedup.md) |
| langdetect | Language detection package | Course-covered | Class2/Class3 language filtering | [cleaning-dedup](tools/cleaning-dedup.md) |
| spaCy | NLP preprocessing library | Course-covered | Class2/Class3 NLP preprocessing | [cleaning-dedup](tools/cleaning-dedup.md) |
| datasketch / MinHash | Deduplication package/method | Course-covered | Class2/Class3 near-duplicate detection | [cleaning-dedup](tools/cleaning-dedup.md) |
| pandas, regex, langdetect, spaCy, datasketch | Cleaning/dedup | Course-covered | Class3 cleaning, Class2 HW cleaning | [cleaning-dedup](tools/cleaning-dedup.md) |
| FastAPI | Serving | Course-covered | Class3 voice agent code | [fastapi](tools/fastapi.md) |
| sentence-transformers | Local embedding library | Course-covered | Class4 local embedding generation | [embeddings](tools/embeddings.md) |
| OpenAI embeddings | Hosted embedding API/service | Course-covered | Class4 OpenAI embedding generation | [embeddings](tools/embeddings.md) |
| sentence-transformers and OpenAI embeddings | Embeddings | Course-covered | Class4 RAG | [embeddings](tools/embeddings.md) |
| FAISS | Vector search | Course-covered | Class4 RAG/HW | [faiss-vector-search](tools/faiss-vector-search.md) |
| LangChain RetrievalQA | RAG chain | Course-covered | Class4 RAG | [langchain-rag](tools/langchain-rag.md) |
| LlamaIndex, LiteLLM | RAG/API framework | Supplemental | Useful next tools beyond Class1-Class4 | [supplemental-rag-frameworks](tools/supplemental-rag-frameworks.md) |
| Chroma, Qdrant, Weaviate, LanceDB, Milvus, Pinecone, pgvector | Vector DBs | Supplemental | Alternatives to local FAISS | [supplemental-vector-databases](tools/supplemental-vector-databases.md) |
| Docling, MarkItDown, Unstructured | Document extraction | Supplemental | Alternatives/complements to OCR pipeline | [supplemental-document-extraction](tools/supplemental-document-extraction.md) |
| Instructor, Pydantic AI, DSPy, LangGraph, LiteLLM | Prompt/API extensions | Extension | Extends Class1 structured output and API workflows | [class1-prompt-api-extensions](tools/class1-prompt-api-extensions.md) |
| llama.cpp/GGUF, LM Studio, SGLang, TGI, MLX | Local inference extensions | Extension | Extends Class2 local inference and serving | [class2-local-inference-extensions](tools/class2-local-inference-extensions.md) |
| Scrapy, Playwright, Crawl4AI, MinerU, Docling, WhisperX, pyannote | Data/extraction extensions | Extension | Extends Class3 data, OCR, ASR, and extraction workflows | [class3-data-extraction-extensions](tools/class3-data-extraction-extensions.md) |
| OpenAI tool calling, MCP, LangChain tools, Pydantic AI toolsets, plugins | Tool/plugin/protocol layer | Extension | Connects Class1 APIs with Class3/Class4 systems | [tool-plugin-protocol-extensions](tools/tool-plugin-protocol-extensions.md) |
| CAG, GraphRAG, agentic retrieval, query decomposition | Advanced RAG patterns | Extension | Extends Class4 baseline RAG | [advanced-rag-patterns](tools/advanced-rag-patterns.md) |
| BM25, hybrid search, RRF, rerankers, query rewriting | Retrieval enhancement | Extension | Extends Class4 vector search | [retrieval-enhancement](tools/retrieval-enhancement.md) |
| Knowledge graph, GraphRAG, graph traversal | Knowledge graph RAG | Extension | Extends Class4 for relationship-heavy corpora | [knowledge-graphs-graphrag](tools/knowledge-graphs-graphrag.md) |
| DCI-Agent-Lite | Direct Corpus Interaction | Extension | Extends Class3 corpus layout and Class4 retrieval | [dci-agent-lite](tools/dci-agent-lite.md) |
| RAGAS, DeepEval, Phoenix, LangSmith, Langfuse | Evaluation/observability | Extension | Extends Class1 failure notes and Class4 RAG evaluation | [rag-evaluation-observability](tools/rag-evaluation-observability.md) |

## English

| Tool | Category | Status | Course/HW mapping | Page |
| --- | --- | --- | --- | --- |
| OpenAI Python SDK | LLM API | Course-covered | Class1 lecture/HW, Class4 embeddings/LLM | [openai-sdk](tools/openai-sdk.md) |
| Ollama | Local model API | Course-covered | Class1 HW OpenAI-compatible local endpoint | [ollama](tools/ollama.md) |
| LangChain prompting/LCEL | Prompt orchestration | Course-covered | Class1 HW, Class4 RAG | [langchain](tools/langchain.md) |
| Structured output patterns | Output control | Course-covered | Class1 JSON/XML tasks | [structured-output](tools/structured-output.md) |
| Transformers | Local inference | Course-covered | Class2 lecture, Class3 summarization pipeline | [transformers](tools/transformers.md) |
| Hugging Face Hub | Model registry | Course-covered | Class2 model download/login | [huggingface-hub](tools/huggingface-hub.md) |
| PyTorch and accelerate | Runtime | Course-covered | Class2 inference environment | [pytorch-accelerate](tools/pytorch-accelerate.md) |
| vLLM | LLM serving | Course-covered | Class2 serving, Class4 compatible endpoint | [vllm](tools/vllm.md) |
| requests | HTTP client package | Course-covered | Class2/Class3 web extraction fetch layer | [web-scraping](tools/web-scraping.md) |
| BeautifulSoup | HTML parser library | Course-covered | Class2/Class3 web extraction parse layer | [web-scraping](tools/web-scraping.md) |
| Trafilatura | Content extraction library | Course-covered | Class2/Class3 web extraction main-text layer | [web-scraping](tools/web-scraping.md) |
| requests, BeautifulSoup, Trafilatura | Web extraction | Course-covered | Class3, Class2 HW output | [web-scraping](tools/web-scraping.md) |
| Tesseract OCR | OCR engine/runtime | Course-covered | Class2/Class3 OCR engine layer | [ocr-tools](tools/ocr-tools.md) |
| pytesseract | Python OCR wrapper package | Course-covered | Class2/Class3 Python wrapper around Tesseract | [ocr-tools](tools/ocr-tools.md) |
| Surya | Layout-aware OCR/document extraction library | Course-covered | Class2/Class3 layout-aware OCR extension | [ocr-tools](tools/ocr-tools.md) |
| Tesseract, pytesseract, Surya | OCR | Course-covered | Class3, Class2 HW OCR | [ocr-tools](tools/ocr-tools.md) |
| Whisper, faster-whisper | ASR | Course-covered | Class3 voice agent, Class2 HW ASR | [audio-asr](tools/audio-asr.md) |
| pandas | Dataframe library | Course-covered | Class2/Class3 cleaning inspection and reporting | [cleaning-dedup](tools/cleaning-dedup.md) |
| regex / regular expressions | Cleaning method | Course-covered | Class2/Class3 rule-based cleaning | [cleaning-dedup](tools/cleaning-dedup.md) |
| langdetect | Language detection package | Course-covered | Class2/Class3 language filtering | [cleaning-dedup](tools/cleaning-dedup.md) |
| spaCy | NLP preprocessing library | Course-covered | Class2/Class3 NLP preprocessing | [cleaning-dedup](tools/cleaning-dedup.md) |
| datasketch / MinHash | Deduplication package/method | Course-covered | Class2/Class3 near-duplicate detection | [cleaning-dedup](tools/cleaning-dedup.md) |
| pandas, regex, langdetect, spaCy, datasketch | Cleaning/dedup | Course-covered | Class3 cleaning, Class2 HW cleaning | [cleaning-dedup](tools/cleaning-dedup.md) |
| FastAPI | Serving | Course-covered | Class3 voice agent code | [fastapi](tools/fastapi.md) |
| sentence-transformers | Local embedding library | Course-covered | Class4 local embedding generation | [embeddings](tools/embeddings.md) |
| OpenAI embeddings | Hosted embedding API/service | Course-covered | Class4 OpenAI embedding generation | [embeddings](tools/embeddings.md) |
| sentence-transformers and OpenAI embeddings | Embeddings | Course-covered | Class4 RAG | [embeddings](tools/embeddings.md) |
| FAISS | Vector search | Course-covered | Class4 RAG/HW | [faiss-vector-search](tools/faiss-vector-search.md) |
| LangChain RetrievalQA | RAG chain | Course-covered | Class4 RAG | [langchain-rag](tools/langchain-rag.md) |
| LlamaIndex, LiteLLM | RAG/API framework | Supplemental | Useful next tools beyond Class1-Class4 | [supplemental-rag-frameworks](tools/supplemental-rag-frameworks.md) |
| Chroma, Qdrant, Weaviate, LanceDB, Milvus, Pinecone, pgvector | Vector DBs | Supplemental | Alternatives to local FAISS | [supplemental-vector-databases](tools/supplemental-vector-databases.md) |
| Docling, MarkItDown, Unstructured | Document extraction | Supplemental | Alternatives/complements to OCR pipeline | [supplemental-document-extraction](tools/supplemental-document-extraction.md) |
| Instructor, Pydantic AI, DSPy, LangGraph, LiteLLM | Prompt/API extensions | Extension | Extends Class1 structured output and API workflows | [class1-prompt-api-extensions](tools/class1-prompt-api-extensions.md) |
| llama.cpp/GGUF, LM Studio, SGLang, TGI, MLX | Local inference extensions | Extension | Extends Class2 local inference and serving | [class2-local-inference-extensions](tools/class2-local-inference-extensions.md) |
| Scrapy, Playwright, Crawl4AI, MinerU, Docling, WhisperX, pyannote | Data/extraction extensions | Extension | Extends Class3 data, OCR, ASR, and extraction workflows | [class3-data-extraction-extensions](tools/class3-data-extraction-extensions.md) |
| OpenAI tool calling, MCP, LangChain tools, Pydantic AI toolsets, plugins | Tool/plugin/protocol layer | Extension | Connects Class1 APIs with Class3/Class4 systems | [tool-plugin-protocol-extensions](tools/tool-plugin-protocol-extensions.md) |
| CAG, GraphRAG, agentic retrieval, query decomposition | Advanced RAG patterns | Extension | Extends Class4 baseline RAG | [advanced-rag-patterns](tools/advanced-rag-patterns.md) |
| BM25, hybrid search, RRF, rerankers, query rewriting | Retrieval enhancement | Extension | Extends Class4 vector search | [retrieval-enhancement](tools/retrieval-enhancement.md) |
| Knowledge graph, GraphRAG, graph traversal | Knowledge graph RAG | Extension | Extends Class4 for relationship-heavy corpora | [knowledge-graphs-graphrag](tools/knowledge-graphs-graphrag.md) |
| DCI-Agent-Lite | Direct Corpus Interaction | Extension | Extends Class3 corpus layout and Class4 retrieval | [dci-agent-lite](tools/dci-agent-lite.md) |
| RAGAS, DeepEval, Phoenix, LangSmith, Langfuse | Evaluation/observability | Extension | Extends Class1 failure notes and Class4 RAG evaluation | [rag-evaluation-observability](tools/rag-evaluation-observability.md) |
