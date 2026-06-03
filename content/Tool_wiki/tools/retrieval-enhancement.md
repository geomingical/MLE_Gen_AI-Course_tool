# Extension: Hybrid Search, Reranking, and Retrieval Enhancement

## 中文

### Status
`Extension`: 這是 Class4 baseline vector search 的延伸。它解決「embedding search 找得到語意相近，但找不到精確證據」的問題。

### What it is
Retrieval enhancement 指在 baseline dense vector retrieval 外，加入 sparse keyword search、BM25、hybrid fusion、reranker、query rewriting、query decomposition、contextual compression 或 MMR。目標是讓送進 LLM 的 context 更相關、更少噪音。

### Core techniques

| 技術 | 解決什麼 | 常見工具 |
| --- | --- | --- |
| BM25 / keyword search | exact term、專有名詞、程式碼、數字、錯字附近查找 | Elasticsearch/OpenSearch, Azure AI Search, pg_search, rank_bm25 |
| Hybrid search | 同時用 dense semantic search 和 sparse keyword search | Weaviate, Qdrant, Pinecone, Chroma, Milvus, Elasticsearch |
| RRF fusion | 用 rank position 合併不同 retriever 結果 | custom code, many RAG frameworks |
| Weighted fusion | 手動設定 dense/sparse 權重 | NVIDIA RAG Blueprint, vector DB configs |
| Reranking | 召回 top-50，再重排成 top-5 | Cohere Rerank, sentence-transformers CrossEncoder, BGE reranker |
| Query rewriting | 把使用者問題改寫成更容易檢索的查詢 | LLM, LangChain, LlamaIndex |
| Query decomposition | 把複雜問題拆成多個 retrieval subqueries | LLM agents, LlamaIndex, LangGraph |
| Contextual compression | 對 retrieved chunks 做壓縮或抽取 | LangChain compressors, rerankers, LLM extractors |
| MMR | 在相關性與多樣性間取平衡 | LangChain retrievers, vector DB clients |

### When to use it
當 retrieval failure 來自 exact term mismatch、top-k 太雜、同一文件重複 chunks 太多、technical jargon 或跨語言查詢時使用。

### When not to use it
如果 corpus 很小，直接 long-context/CAG 可能更簡單。如果 extraction text 本身錯了，retrieval enhancement 只會更有效率地找錯資料。

### Minimal Python sketch
```python
# Conceptual RRF fusion sketch
def rrf(rank_lists, k=60):
    scores = {}
    for results in rank_lists:
        for rank, doc_id in enumerate(results, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)
```

### Course mapping
延伸 Class4 FAISS/vector retrieval。Class4 先建立 baseline，這頁說明後續如何改善 retrieval。

### Practical notes
Hybrid search 不一定自動變好。至少保存三組比較：dense-only、sparse-only、hybrid，並用相同 query set 看 recall、citation correctness、latency。

## English

### Status
`Extension`: This extends Class4 baseline vector search. It addresses the common problem where embedding search finds semantically similar text but misses precise evidence.

### What it is
Retrieval enhancement adds sparse keyword search, BM25, hybrid fusion, reranking, query rewriting, query decomposition, contextual compression, or MMR on top of baseline dense vector retrieval. The goal is to pass more relevant and less noisy context to the LLM.

### Core techniques

| Technique | Problem solved | Common tools |
| --- | --- | --- |
| BM25 / keyword search | Exact terms, named entities, code, numbers, near-typo lookup | Elasticsearch/OpenSearch, Azure AI Search, pg_search, rank_bm25 |
| Hybrid search | Combine dense semantic search with sparse keyword search | Weaviate, Qdrant, Pinecone, Chroma, Milvus, Elasticsearch |
| RRF fusion | Merge retriever results by rank position | custom code, many RAG frameworks |
| Weighted fusion | Manually control dense/sparse weights | NVIDIA RAG Blueprint, vector DB configs |
| Reranking | Retrieve top-50, reorder into top-5 | Cohere Rerank, sentence-transformers CrossEncoder, BGE reranker |
| Query rewriting | Rewrite user questions into better retrieval queries | LLMs, LangChain, LlamaIndex |
| Query decomposition | Split complex questions into retrieval subqueries | LLM agents, LlamaIndex, LangGraph |
| Contextual compression | Compress or extract useful parts of retrieved chunks | LangChain compressors, rerankers, LLM extractors |
| MMR | Balance relevance and diversity | LangChain retrievers, vector DB clients |

### When to use it
Use it when retrieval fails because of exact-term mismatch, noisy top-k, repeated chunks from one document, technical jargon, or multilingual queries.

### When not to use it
If the corpus is small, long-context/CAG may be simpler. If extracted text is wrong, retrieval enhancement only finds bad data more efficiently.

### Minimal Python sketch
```python
# Conceptual RRF fusion sketch
def rrf(rank_lists, k=60):
    scores = {}
    for results in rank_lists:
        for rank, doc_id in enumerate(results, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)
```

### Course mapping
Extends Class4 FAISS/vector retrieval. Class4 builds the baseline; this page explains how retrieval can be improved afterward.

### Practical notes
Hybrid search is not automatically better. Keep at least three comparisons: dense-only, sparse-only, and hybrid, using the same query set to measure recall, citation correctness, and latency.

### References
- https://docs.nvidia.com/rag/2.5.0/hybrid_search.html
- https://docs.cohere.com/v2/docs/rerank
- https://sbert.net/docs/package_reference/cross_encoder/cross_encoder.html
