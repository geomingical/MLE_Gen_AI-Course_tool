# Extension: Knowledge Graphs and GraphRAG

## 中文

### Status
`Extension`: 這是 Class4 RAG 的進階方向，適合 baseline RAG 無法處理跨文件關係與全局理解時使用。

### What it is
Knowledge graph 把 entity、relationship、claim 或 event 變成圖結構。GraphRAG 則把 RAG 和 knowledge graph 結合：先從 corpus 建圖，再在 query time 使用 graph traversal、community summaries、local/global search 等方式提供 context。

### Problem it solves
Baseline RAG 通常拿 top-k chunks。若問題需要「連接不同文件中的人物/地點/事件/概念」、「找出社群結構」、「回答整個 corpus 的全局問題」，單純 vector top-k 可能不夠。

### When to use it
- corpus 中 entity 和 relationship 很重要。
- 問題常需要跨文件 synthesis。
- 需要 global summary，不只是找一段相似文字。
- 需要可追蹤的 entity/claim network。

### When not to use it
- corpus 小，直接 RAG 或 CAG 已足夠。
- 抽取 entity/relationship 品質無法驗證。
- 沒有 schema 或 evaluation，建圖只是增加複雜度。

### Common tools
- Microsoft GraphRAG: graph-based RAG pipeline and query modes.
- Neo4j GraphRAG: graph database + Cypher traversal style.
- LlamaIndex knowledge graph / property graph tools.
- LangChain graph/vector integrations.

### Course mapping
延伸 Class4 RAG。Class4 教的是 vector RAG；GraphRAG 是當 retrieval 需要 relationship reasoning 時的下一步。

### Practical notes
先問：我的問題真的需要 graph 嗎？如果只是「找最相關段落」，GraphRAG 可能太重。如果需要「誰和誰有什麼關係、跨文件如何形成結論」，graph 才有價值。

## English

### Status
`Extension`: This is an advanced direction beyond Class4 RAG, useful when baseline RAG cannot handle cross-document relationships or global understanding.

### What it is
A knowledge graph represents entities, relationships, claims, or events as a graph. GraphRAG combines RAG with a knowledge graph: build a graph from the corpus, then use graph traversal, community summaries, local/global search, and related query modes at query time.

### Problem it solves
Baseline RAG usually retrieves top-k chunks. If a question requires connecting people, places, events, or concepts across documents, identifying communities, or answering corpus-level questions, plain vector top-k may not be enough.

### When to use it
- Entities and relationships are central to the corpus.
- Questions often require cross-document synthesis.
- You need global summaries, not just similar passages.
- You need a traceable entity/claim network.

### When not to use it
- The corpus is small and direct RAG or CAG is enough.
- Entity/relationship extraction quality cannot be validated.
- There is no schema or evaluation; graph construction would only add complexity.

### Common tools
- Microsoft GraphRAG: graph-based RAG pipeline and query modes.
- Neo4j GraphRAG: graph database plus Cypher traversal style.
- LlamaIndex knowledge graph / property graph tools.
- LangChain graph/vector integrations.

### Course mapping
Extends Class4 RAG. Class4 teaches vector RAG; GraphRAG is a next step when retrieval needs relationship reasoning.

### Practical notes
Ask first: does my question really need a graph? If you only need the most relevant passage, GraphRAG may be too heavy. If you need to reason about who/what relates to whom/what across documents, graph structure can be valuable.

### References
- https://microsoft.github.io/graphrag/
- https://graphrag.com/
- https://learn.microsoft.com/en-us/agent-framework/agents/rag
