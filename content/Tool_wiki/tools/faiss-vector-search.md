# FAISS Vector Search

## 中文

### What it is
FAISS 是 Meta 開源的 vector similarity search library。Class4 RAG 使用 FAISS 建立本地 vector index。

### Problem it solves
它讓你在大量向量中快速找出最相近的 chunks，是本地 RAG prototype 的常見選擇。

### When to use it
適合本地 demo、notebook、單機 RAG、以及想理解 vector search 原理的場景。

### When not to use it
如果需要多租戶、metadata schema、cloud persistence、horizontal scaling、管理 UI，應考慮 vector database。

### Strengths
- 快速、成熟。
- 本地可用，不一定需要 cloud。
- 很適合教學與 prototype。

### Weaknesses and failure modes
- 不是完整 database。
- persistence、metadata、filtering 需要自己處理或靠 wrapper。
- index 與 embedding model 必須一致。

### Minimal Python example
```python
import faiss
import numpy as np

vectors = np.random.random((100, 384)).astype("float32")
index = faiss.IndexFlatL2(384)
index.add(vectors)
distances, ids = index.search(vectors[:1], k=5)
print(ids)
```

### Course mapping
Class4 RAG homework and examples.

### Related tools
sentence-transformers, LangChain vectorstores, Chroma, Qdrant, pgvector.

### Practical notes
FAISS index 是 derived artifact。保留原始 chunk 與 metadata，必要時重建 index。

## English

### What it is
FAISS is Meta's open-source vector similarity search library. Class4 RAG uses FAISS to build a local vector index.

### Problem it solves
It quickly finds the nearest chunks among many vectors, making it a common choice for local RAG prototypes.

### When to use it
Use it for local demos, notebooks, single-machine RAG, and learning vector search fundamentals.

### When not to use it
If you need multitenancy, metadata schemas, cloud persistence, horizontal scaling, or a management UI, consider a vector database.

### Strengths
- Fast and mature.
- Runs locally without cloud infrastructure.
- Good for teaching and prototyping.

### Weaknesses and failure modes
- It is not a full database.
- Persistence, metadata, and filtering must be handled manually or through wrappers.
- The index and embedding model must stay consistent.

### Minimal Python example
```python
import faiss
import numpy as np

vectors = np.random.random((100, 384)).astype("float32")
index = faiss.IndexFlatL2(384)
index.add(vectors)
distances, ids = index.search(vectors[:1], k=5)
print(ids)
```

### Course mapping
Class4 RAG homework and examples.

### Related tools
sentence-transformers, LangChain vectorstores, Chroma, Qdrant, pgvector.

### Practical notes
Treat a FAISS index as a derived artifact. Keep original chunks and metadata so the index can be rebuilt.

### References
- https://github.com/facebookresearch/faiss
