# Supplemental: Vector Databases

## 中文

### Status
`Supplemental`: Class4 使用 FAISS 作為本地 vector search。下列工具是當 RAG 從 notebook 走向可管理系統時常見的候選。

### Quick comparison

| 工具 | 適合情境 | 注意事項 |
| --- | --- | --- |
| Chroma | local/dev RAG、簡單 collection 管理 | production scale 與功能邊界需確認 |
| Qdrant | open-source vector DB、metadata filtering、service deployment | 需要理解 collection、payload、index config |
| Weaviate | AI-native vector DB、hybrid search、managed/cloud options | schema 與 module/provider 設定較多 |
| LanceDB | local/embedded multimodal data + vector search | 適合資料湖式 workflow，和傳統 DB 心智不同 |
| Milvus | 大規模 open-source vector DB | 架構較重，適合 scale 需求明確時 |
| Pinecone | fully managed vector database | 成本、vendor lock-in、資料治理需評估 |
| pgvector | Postgres extension，向量與關聯資料放一起 | 適合已有 Postgres 的系統，但不是所有向量規模都合適 |

### When to use vector databases instead of FAISS
- 需要 metadata filtering。
- 需要 persistence、multi-user、cloud deployment。
- 需要定期更新資料與 index。
- 需要和 production app/database 整合。

### When not to use them
- 只是 Class4 notebook 或小型 local prototype。
- 資料量小，FAISS 已經足夠。
- 還沒定義 chunk schema、metadata 與 evaluation。

### Course mapping
Class4 使用 FAISS。這頁提供 FAISS 之外的下一步工具視野。

### Practical notes
vector DB 不是 RAG 品質保證。錯誤的 chunking、embedding 或 query design 會讓任何 vector DB 都表現不好。

## English

### Status
`Supplemental`: Class4 uses FAISS for local vector search. The following tools become relevant when RAG moves from notebooks toward managed systems.

### Quick comparison

| Tool | Best fit | Notes |
| --- | --- | --- |
| Chroma | local/dev RAG and simple collection management | Confirm production scale and feature boundaries |
| Qdrant | open-source vector DB, metadata filtering, service deployment | Understand collections, payloads, and index config |
| Weaviate | AI-native vector DB, hybrid search, managed/cloud options | Schema and module/provider setup can be involved |
| LanceDB | local/embedded multimodal data plus vector search | Fits lakehouse-like workflows, not a classic DB mindset |
| Milvus | large-scale open-source vector DB | Heavier architecture; best when scale requirements are clear |
| Pinecone | fully managed vector database | Evaluate cost, vendor lock-in, and data governance |
| pgvector | Postgres extension for vectors plus relational data | Good when Postgres already exists, but not every vector scale fits |

### When to use vector databases instead of FAISS
- You need metadata filtering.
- You need persistence, multi-user access, or cloud deployment.
- You need regular data and index updates.
- You need integration with a production app/database.

### When not to use them
- You are only doing a Class4 notebook or small local prototype.
- Your data is small and FAISS is enough.
- You have not defined chunk schema, metadata, or evaluation.

### Course mapping
Class4 uses FAISS. This page gives next-step context beyond FAISS.

### Practical notes
A vector database is not a RAG quality guarantee. Bad chunking, embeddings, or query design will hurt any vector database.

### References
- https://docs.trychroma.com/
- https://qdrant.tech/documentation/
- https://weaviate.io/developers/weaviate
- https://docs.lancedb.com/
- https://milvus.io/docs/
- https://docs.pinecone.io/
- https://github.com/pgvector/pgvector
