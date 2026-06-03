# LangChain RAG: Loaders, Splitters, Vectorstores, RetrievalQA

## 中文

### What it is
Class4 使用 LangChain 的 document loaders、RecursiveCharacterTextSplitter、embedding wrapper、FAISS vectorstore 與 RetrievalQA chain 建立 resume RAG。

### Problem it solves
它把 RAG 的幾個步驟包成可組合流程：載入文件、切 chunk、embedding、建立 index、retrieval、把 retrieved context 交給 LLM 生成回答。

### When to use it
適合快速建立 RAG prototype、測試 chunk size、比較 embedding model、或示範 retrieval-augmented QA。

### When not to use it
如果要做嚴格 production RAG，仍需補上 retrieval evaluation、citation tracing、prompt tests、logging、fallback 和 data refresh。

### Strengths
- 組件完整。
- 可以快速從文件到 QA。
- 與 OpenAI、Hugging Face、FAISS 等整合方便。

### Weaknesses and failure modes
- `RetrievalQA` 可以讓流程看起來太簡單，掩蓋 chunking 和 retrieval 品質問題。
- citation 不一定可靠，需要自己設計 source attribution。
- 老版 import path 常變動。

### Minimal Python example
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_text(long_document)
print(len(chunks))
```

### Course mapping
Class4 resume RAG project and homework.

### Related tools
FAISS, sentence-transformers, OpenAI embeddings, LlamaIndex.

### Practical notes
先檢查 chunks 是否合理，再建立 embedding。很多 RAG 失敗其實是 chunking 失敗。

## English

### What it is
Class4 uses LangChain document loaders, RecursiveCharacterTextSplitter, embedding wrappers, FAISS vectorstore, and RetrievalQA chain to build a resume RAG system.

### Problem it solves
It packages RAG steps into a composable flow: load documents, split chunks, embed, build an index, retrieve, and pass retrieved context to an LLM for answer generation.

### When to use it
Use it to quickly build a RAG prototype, test chunk size, compare embedding models, or demonstrate retrieval-augmented QA.

### When not to use it
For strict production RAG, you still need retrieval evaluation, citation tracing, prompt tests, logging, fallback behavior, and data refresh.

### Strengths
- Complete component set.
- Fast path from documents to QA.
- Integrates easily with OpenAI, Hugging Face, FAISS, and related tools.

### Weaknesses and failure modes
- `RetrievalQA` can make the workflow look too simple and hide chunking/retrieval quality problems.
- Citations are not automatically reliable; source attribution needs design.
- Older import paths change frequently.

### Minimal Python example
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_text(long_document)
print(len(chunks))
```

### Course mapping
Class4 resume RAG project and homework.

### Related tools
FAISS, sentence-transformers, OpenAI embeddings, LlamaIndex.

### Practical notes
Inspect chunks before embedding. Many RAG failures are actually chunking failures.

### References
- https://python.langchain.com/docs/
