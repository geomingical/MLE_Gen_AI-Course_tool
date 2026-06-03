# Embeddings: sentence-transformers and OpenAI Embeddings

## 中文

### What it is
Embedding model 把文字轉成向量。Class4 使用 `sentence-transformers` 與 OpenAI embeddings 的概念，讓 resume/document chunks 可以被 vector search 檢索。

### Problem it solves
它讓語意相近的文本在向量空間中接近，是 RAG、semantic search、clustering 和 similarity matching 的基礎。

### When to use it
當你需要根據語意搜尋文件、建立 RAG index、比較文本相似度、或做 corpus exploration 時使用。

### When not to use it
如果問題需要精確 keyword、日期、數字或 metadata filter，純 embedding search 不夠，應結合 BM25、metadata filters 或 hybrid search。

### Strengths
- sentence-transformers 可本地執行，成本低。
- OpenAI embeddings 方便、品質穩定，適合 API workflow。
- 可快速接 FAISS 或 vector DB。

### Weaknesses and failure modes
- embedding 不理解所有細節，尤其是數字、否定、罕見術語。
- chunk 品質比模型選擇同樣重要。
- 換 embedding model 通常要重建 index。

### Minimal Python example
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
vectors = model.encode(["RAG retrieves documents.", "OCR extracts text."])
print(vectors.shape)
```

### Course mapping
Class4 embedding generation and RAG pipeline.

### Related tools
FAISS, LangChain RetrievalQA, OpenAI SDK, vector databases.

### Practical notes
記錄 embedding model name、dimension、chunking rule，否則之後很難重現 retrieval 結果。

## English

### What it is
An embedding model converts text into vectors. Class4 uses the concepts of `sentence-transformers` and OpenAI embeddings so resume/document chunks can be retrieved through vector search.

### Problem it solves
It places semantically similar texts near each other in vector space, forming the basis for RAG, semantic search, clustering, and similarity matching.

### When to use it
Use it when you need semantic document search, a RAG index, text similarity comparison, or corpus exploration.

### When not to use it
If the question requires exact keywords, dates, numbers, or metadata filters, pure embedding search is insufficient. Combine it with BM25, metadata filters, or hybrid search.

### Strengths
- sentence-transformers can run locally at low cost.
- OpenAI embeddings are convenient and stable for API workflows.
- Easy to connect to FAISS or vector databases.

### Weaknesses and failure modes
- Embeddings do not capture every detail, especially numbers, negation, and rare terms.
- Chunk quality matters as much as model choice.
- Changing the embedding model usually requires rebuilding the index.

### Minimal Python example
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
vectors = model.encode(["RAG retrieves documents.", "OCR extracts text."])
print(vectors.shape)
```

### Course mapping
Class4 embedding generation and RAG pipeline.

### Related tools
FAISS, LangChain RetrievalQA, OpenAI SDK, vector databases.

### Practical notes
Record embedding model name, vector dimension, and chunking rule. Without them, retrieval results are hard to reproduce.

### References
- https://www.sbert.net/
- https://platform.openai.com/docs/guides/embeddings
