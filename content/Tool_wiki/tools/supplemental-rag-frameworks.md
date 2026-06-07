# Supplemental: LlamaIndex and LiteLLM

## 中文

### Status
`Supplemental`: 這些工具是現代 GenAI workflow 常見工具，但不是 Class1-Class5 的主要實作核心。

### LlamaIndex
LlamaIndex 是偏 data/RAG-first 的框架。它把 documents、nodes、index、query engine、chat engine 等概念包成面向資料接入與 retrieval 的工作流。

Use it when:
- 你的核心問題是把多種資料來源接進 RAG。
- 你需要 query engine、retriever、agent 與 document abstraction。
- 你想比 LangChain 更集中在資料與 retrieval。

Avoid it when:
- 你只需要單一 API call。
- 你還沒理解 chunking、embedding、retrieval 的基本失敗模式。

### LiteLLM
LiteLLM 是多模型 provider 的統一呼叫層，讓 OpenAI、Anthropic、Azure、Vertex、local OpenAI-compatible endpoint 等可以用接近一致的介面管理。

Use it when:
- 你需要切換多個 LLM provider。
- 你想做 routing、fallback、cost tracking 或 gateway。
- 你希望 application code 不綁死單一 provider。

Avoid it when:
- 你只使用一個 provider，且還在學基本 API。
- 你不需要 routing/gateway 抽象。

### Course mapping
這些不是 Class1-Class5 的主要工具，但可延伸 Class1 API abstraction 與 Class4/Class5 retrieval 的設計。

### Practical notes
補充工具不能解決基本資料品質問題。RAG 失敗時，先檢查 source text、chunk、embedding、retrieval，再考慮換框架。

## English

### Status
`Supplemental`: These tools are common in current GenAI workflows, but they are not the main implementation tools in Class1-Class5.

### LlamaIndex
LlamaIndex is a data/RAG-first framework. It organizes documents, nodes, indexes, query engines, chat engines, and related abstractions around data ingestion and retrieval.

Use it when:
- Your core problem is connecting many data sources to RAG.
- You need query engines, retrievers, agents, and document abstractions.
- You want a framework more focused on data and retrieval than general LLM chaining.

Avoid it when:
- You only need a single API call.
- You do not yet understand basic chunking, embedding, and retrieval failure modes.

### LiteLLM
LiteLLM is a unified calling layer for multiple model providers, including OpenAI, Anthropic, Azure, Vertex, and local OpenAI-compatible endpoints.

Use it when:
- You need to switch across multiple LLM providers.
- You want routing, fallback, cost tracking, or gateway behavior.
- You do not want application code locked to one provider.

Avoid it when:
- You only use one provider and are still learning basic APIs.
- You do not need routing or gateway abstractions.

### Course mapping
These are not the main Class1-Class5 tools, but they extend Class1 API abstraction and Class4/Class5 retrieval design.

### Practical notes
Supplemental frameworks do not fix basic data quality problems. When RAG fails, inspect source text, chunks, embeddings, and retrieval before changing frameworks.

### References
- https://docs.llamaindex.ai/
- https://docs.litellm.ai/
