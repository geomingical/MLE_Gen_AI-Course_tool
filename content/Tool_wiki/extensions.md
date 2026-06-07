# Extension Map / 延伸內容地圖

## 中文

這頁整理上完 Class1-Class5 後值得繼續查的延伸技術。這些內容不是課程第一輪的核心實作，標記為 `Extension`，用途是把 `Tool_wiki` 從課堂筆記擴充成可長期查詢的工具書。延伸內容不限於 package，也包含 framework、plugin、protocol、server/runtime、training framework 和 workflow pattern。

| 延伸方向 | 什麼時候需要 | 對應頁面 |
| --- | --- | --- |
| Class1 prompting/API extensions | 需要更可靠 structured output、typed agents、prompt optimization 或多 provider routing | [class1-prompt-api-extensions](tools/class1-prompt-api-extensions.md) |
| Class2 local inference extensions | 需要從 notebook inference 走向 quantized local model、desktop local LLM 或 production serving | [class2-local-inference-extensions](tools/class2-local-inference-extensions.md) |
| Class3 data/extraction extensions | 需要處理 dynamic websites、大規模 crawling、PDF/Office parsing、speaker diarization 或更強文件抽取 | [class3-data-extraction-extensions](tools/class3-data-extraction-extensions.md) |
| Tool/plugin/protocol layer | 需要讓模型穩定呼叫外部工具、MCP servers、agent toolsets 或 plugin-like integrations | [tool-plugin-protocol-extensions](tools/tool-plugin-protocol-extensions.md) |
| Advanced RAG patterns | baseline vector RAG 不夠穩，需要比較 CAG、GraphRAG、agentic retrieval、query decomposition | [advanced-rag-patterns](tools/advanced-rag-patterns.md) |
| Hybrid search and reranking | dense embedding search 找不到 exact term、代碼、專有名詞、數字或表格內容 | [retrieval-enhancement](tools/retrieval-enhancement.md) |
| Knowledge graph / GraphRAG | 問題需要跨文件連結 entity、relationship、claim，或需要 corpus-level synthesis | [knowledge-graphs-graphrag](tools/knowledge-graphs-graphrag.md) |
| Direct Corpus Interaction | 想讓 agent 直接用 `rg/find/sed` 查 raw corpus，而不是只透過固定 retriever | [dci-agent-lite](tools/dci-agent-lite.md) |
| Evaluation and observability | 需要系統性知道 RAG 失敗在 retrieval、prompt、LLM 還是資料抽取 | [rag-evaluation-observability](tools/rag-evaluation-observability.md) |
| Class5 fine-tuning extensions | 需要加速 LoRA/QLoRA、用 YAML/WebUI 管理訓練、或處理多卡與顯存優化 | [class5-finetuning-extensions](tools/class5-finetuning-extensions.md) |
| Class5 evaluation extensions | 需要用 PPL、MMLU/GSM8K 或 catastrophic forgetting checks 評估微調結果 | [class5-evaluation](tools/class5-evaluation.md) |

### Recommended learning order

1. 先理解 Class4 baseline RAG：chunk、embedding、FAISS、retrieval、generation。
2. 回頭補 Class1-Class3 的延伸：structured output、local inference、document extraction、tool/plugin layer。
3. 加入 hybrid search 與 reranking，因為這是最常見、成本相對低的 RAG 改進。
4. 加入 evaluation/observability，否則無法判斷改動是否真的變好。
5. 對 complex corpus 再考慮 GraphRAG / knowledge graph。
6. 對 raw-file-heavy research corpus，再考慮 DCI-style agentic search。
7. 對小型固定知識庫，再評估 CAG 是否比 RAG 更簡單。
8. 進入 Class5 fine-tuning 前，先問：prompt/RAG 是否已足夠？若真的要改模型行為，再學 SFT、LoRA/QLoRA、PEFT/TRL。
9. 等 SFT baseline 跑通後，再加入 Unsloth、Axolotl、LLaMA-Factory、FSDP、FlashAttention 等延伸工具。

## English

This page organizes extension topics worth studying after Class1-Class5. They are not the core first-pass course implementation, so they are marked as `Extension`. The goal is to grow `Tool_wiki` from course notes into a long-term reference manual. Extensions include packages, frameworks, plugins, protocols, servers/runtimes, training frameworks, and workflow patterns.

| Extension direction | When you need it | Page |
| --- | --- | --- |
| Class1 prompting/API extensions | You need more reliable structured output, typed agents, prompt optimization, or multi-provider routing | [class1-prompt-api-extensions](tools/class1-prompt-api-extensions.md) |
| Class2 local inference extensions | You need to move from notebook inference to quantized local models, desktop local LLMs, or production serving | [class2-local-inference-extensions](tools/class2-local-inference-extensions.md) |
| Class3 data/extraction extensions | You need dynamic websites, larger-scale crawling, PDF/Office parsing, speaker diarization, or stronger document extraction | [class3-data-extraction-extensions](tools/class3-data-extraction-extensions.md) |
| Tool/plugin/protocol layer | You need reliable external tool calls, MCP servers, agent toolsets, or plugin-like integrations | [tool-plugin-protocol-extensions](tools/tool-plugin-protocol-extensions.md) |
| Advanced RAG patterns | Baseline vector RAG is not stable enough; you need to compare CAG, GraphRAG, agentic retrieval, or query decomposition | [advanced-rag-patterns](tools/advanced-rag-patterns.md) |
| Hybrid search and reranking | Dense embedding search misses exact terms, code, named entities, numbers, or table content | [retrieval-enhancement](tools/retrieval-enhancement.md) |
| Knowledge graph / GraphRAG | Questions require cross-document entity, relationship, or claim reasoning, or corpus-level synthesis | [knowledge-graphs-graphrag](tools/knowledge-graphs-graphrag.md) |
| Direct Corpus Interaction | You want an agent to inspect raw files with `rg/find/sed` instead of only querying a fixed retriever | [dci-agent-lite](tools/dci-agent-lite.md) |
| Evaluation and observability | You need to know whether a RAG failure came from retrieval, prompts, LLM behavior, or document extraction | [rag-evaluation-observability](tools/rag-evaluation-observability.md) |
| Class5 fine-tuning extensions | You need faster LoRA/QLoRA, YAML/WebUI-managed training, or multi-GPU and memory optimization | [class5-finetuning-extensions](tools/class5-finetuning-extensions.md) |
| Class5 evaluation extensions | You need PPL, MMLU/GSM8K, or catastrophic forgetting checks for fine-tuned models | [class5-evaluation](tools/class5-evaluation.md) |

### Recommended learning order

1. Understand Class4 baseline RAG first: chunking, embeddings, FAISS, retrieval, and generation.
2. Fill in Class1-Class3 extensions: structured output, local inference, document extraction, and the tool/plugin layer.
3. Add hybrid search and reranking, because this is the most common low-friction RAG improvement.
4. Add evaluation and observability, otherwise you cannot tell whether a change really helped.
5. For complex corpora, consider GraphRAG / knowledge graphs.
6. For raw-file-heavy research corpora, consider DCI-style agentic search.
7. For small fixed knowledge bases, evaluate whether CAG is simpler than RAG.
8. Before entering Class5 fine-tuning, ask whether prompting/RAG is already enough. If model behavior truly needs to change, learn SFT, LoRA/QLoRA, PEFT/TRL.
9. After an SFT baseline works, add extensions such as Unsloth, Axolotl, LLaMA-Factory, FSDP, and FlashAttention.
