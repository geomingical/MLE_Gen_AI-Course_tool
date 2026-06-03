# Extension: Advanced RAG Patterns

## 中文

### Status
`Extension`: 這頁是 Class4 baseline RAG 之後的延伸地圖，不是 Class4 作業的必要內容。

### What it is
Advanced RAG patterns 是一組 retrieval/generation 設計選項，用來處理 baseline vector RAG 的不足。Class4 的 baseline 是「chunk -> embedding -> FAISS/vector search -> LLM」。延伸後會出現 hybrid search、reranking、CAG、GraphRAG、query decomposition、agentic retrieval、contextual compression、semantic cache 等。

### Key patterns

| Pattern | 核心想法 | 適合情境 | 風險 |
| --- | --- | --- | --- |
| Baseline vector RAG | 用 dense embedding 找相似 chunks | 快速 prototype、語意查詢 | exact term、數字、表格、專有名詞容易漏 |
| Hybrid search | dense vector + sparse/keyword search，例如 BM25，再 fusion | 技術文件、code、法規、專有名詞 | 權重和 fusion 需要 evaluation |
| Reranking | 先召回較多 candidates，再用 cross-encoder/reranker 重排 | top-k 有雜訊，需要更準 context | 增加 latency 和成本 |
| CAG | 把有限知識庫預載到長 context/cache，減少即時 retrieval | 小型固定 corpus、低 retrieval latency 需求 | corpus 大或常更新時不適合 |
| GraphRAG | 從 corpus 建 entity/relationship graph，支援跨文件推理 | 關係密集、需要全局摘要或 entity reasoning | 建圖成本高，品質依 extraction/schema |
| Agentic retrieval | agent 反覆搜尋、讀取、交叉驗證 | deep research、多步查詢 | 成本、latency、可控性較難 |
| Direct Corpus Interaction | agent 直接用 terminal/file tools 查 raw corpus | raw files 可搜尋、需要高解析度證據定位 | 需要良好 corpus layout 與工具限制 |

### When to use it
當 baseline RAG 已經能跑，但回答常有找錯 chunk、citation 弱、exact term 找不到、跨文件關係推理差、或 retrieval latency 太高時，再逐步加入這些 pattern。

### When not to use it
如果 source extraction、chunking、metadata、evaluation 還沒做好，不應先堆 advanced RAG。很多問題不是架構不夠高級，而是資料與測試不足。

### Course mapping
延伸 Class4 RAG。它不是替代 Class4 baseline，而是 baseline 建好後的下一層工具書入口。

### Related tools
FAISS, vector databases, rerankers, GraphRAG, LlamaIndex, LangChain, DCI-Agent-Lite, RAGAS, Phoenix.

### Practical notes
每次只改一個 retrieval component，並保存 query set、retrieved chunks、final answer、latency 和 token cost。否則無法判斷是 hybrid search、reranker 還是 prompt 改善了結果。

## English

### Status
`Extension`: This page is a post-Class4 map of advanced RAG design options. It is not required for the Class4 homework baseline.

### What it is
Advanced RAG patterns are retrieval/generation design options for addressing weaknesses in baseline vector RAG. The Class4 baseline is "chunk -> embed -> FAISS/vector search -> LLM." Extensions include hybrid search, reranking, CAG, GraphRAG, query decomposition, agentic retrieval, contextual compression, and semantic cache.

### Key patterns

| Pattern | Core idea | Best fit | Risk |
| --- | --- | --- | --- |
| Baseline vector RAG | Use dense embeddings to retrieve similar chunks | Fast prototypes and semantic queries | Can miss exact terms, numbers, tables, and named entities |
| Hybrid search | Combine dense vector search with sparse/keyword search such as BM25, then fuse results | Technical docs, code, law, named entities | Weights and fusion require evaluation |
| Reranking | Retrieve more candidates, then reorder them with a cross-encoder/reranker | Noisy top-k results needing better context | Adds latency and cost |
| CAG | Preload a limited knowledge base into long context/cache to reduce real-time retrieval | Small fixed corpora and low retrieval-latency needs | Poor fit for large or frequently updated corpora |
| GraphRAG | Build entity/relationship graphs from a corpus for cross-document reasoning | Relationship-heavy corpora, global summaries, entity reasoning | Graph construction is costly and depends on extraction/schema quality |
| Agentic retrieval | Let an agent search, read, and cross-check iteratively | Deep research and multi-step questions | Higher cost, latency, and control complexity |
| Direct Corpus Interaction | Let an agent use terminal/file tools to inspect the raw corpus | Searchable raw files and high-resolution evidence lookup | Requires good corpus layout and constrained tool access |

### When to use it
Use these patterns after baseline RAG runs but still fails through wrong chunks, weak citations, missing exact terms, poor cross-document reasoning, or excessive retrieval latency.

### When not to use it
If source extraction, chunking, metadata, and evaluation are not ready, do not stack advanced RAG first. Many failures come from data and testing, not from a lack of advanced architecture.

### Course mapping
Extends Class4 RAG. It does not replace the Class4 baseline; it is the next reference layer after the baseline works.

### Related tools
FAISS, vector databases, rerankers, GraphRAG, LlamaIndex, LangChain, DCI-Agent-Lite, RAGAS, Phoenix.

### Practical notes
Change one retrieval component at a time and store the query set, retrieved chunks, final answer, latency, and token cost. Otherwise you cannot tell whether hybrid search, reranking, or prompt changes improved the result.

### References
- https://arxiv.org/abs/2412.15605
- https://microsoft.github.io/graphrag/
- https://docs.nvidia.com/rag/2.5.0/hybrid_search.html
