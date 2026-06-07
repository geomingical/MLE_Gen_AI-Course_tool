# Class5 Hybrid Retrieval

## 中文

Class5 Homework 其實延伸 Class4 RAG，而不是 fine-tuning。主線是把 FAISS dense vector search 和 SQLite FTS5/BM25 sparse keyword search 合併，建立 hybrid retrieval。

### Course-covered items

| Item | Type | Role |
| --- | --- | --- |
| FAISS | Library | 語意向量搜尋 |
| SQLite FTS5 / BM25 | Method / database feature | exact keyword / sparse retrieval |
| Hybrid retrieval | Workflow stack | 同時使用 dense + sparse retrieval |
| Reciprocal Rank Fusion (RRF) | Method | 用排名合併多個 retriever 的結果 |
| Recall@k / Hit Rate@k | Evaluation metric | 評估 relevant document 是否出現在 top-k |

### Why hybrid search

Embedding search 擅長語意相似，但可能漏掉專有名詞、數字、縮寫、code 或 exact phrase。BM25/FTS5 擅長 exact term，但可能抓不到語意相近的內容。Hybrid retrieval 的目標是讓兩者互補。

### First exercise

準備至少 10 個有已知相關文件的 query，分別跑：

1. vector-only FAISS
2. keyword-only FTS5/BM25
3. hybrid retrieval with RRF or weighted fusion

然後比較 Recall@3 或 Hit Rate@3。

## English

Class5 Homework extends Class4 RAG rather than fine-tuning. The main path is to combine FAISS dense vector search with SQLite FTS5/BM25 sparse keyword search into hybrid retrieval.

### Course-covered items

| Item | Type | Role |
| --- | --- | --- |
| FAISS | Library | Semantic vector search |
| SQLite FTS5 / BM25 | Method / database feature | Exact keyword / sparse retrieval |
| Hybrid retrieval | Workflow stack | Use dense + sparse retrieval together |
| Reciprocal Rank Fusion (RRF) | Method | Merge results from multiple retrievers by rank |
| Recall@k / Hit Rate@k | Evaluation metric | Check whether relevant documents appear in top-k |

### Why hybrid search

Embedding search is good at semantic similarity, but it may miss entities, numbers, abbreviations, code, or exact phrases. BM25/FTS5 is good at exact terms, but may miss semantic matches. Hybrid retrieval aims to make the two retrieval modes complement each other.

### First exercise

Prepare at least 10 queries with known relevant documents, then run:

1. vector-only FAISS
2. keyword-only FTS5/BM25
3. hybrid retrieval with RRF or weighted fusion

Compare Recall@3 or Hit Rate@3.
