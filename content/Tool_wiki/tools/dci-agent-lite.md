# Extension: DCI-Agent-Lite and Direct Corpus Interaction

## 中文

### Status
`Extension`: DCI-Agent-Lite 不是 Class1-Class5 的課程工具。它是 RAG 之外的 agentic search 延伸，適合 raw corpus 可直接被 terminal 搜尋的研究資料。

### What it is
DCI 指 Direct Corpus Interaction。它不是先建立固定 retriever 或 vector index，而是讓 agent 直接用 terminal tools 查 raw corpus，例如 `rg`、`find`、`sed`。DCI-Agent-Lite 是這個 paradigm 的輕量 open implementation。

### Problem it solves
傳統 RAG 把 retrieval 固定成 embedding/vector search 或 retrieval API。DCI 讓 agent 可以像研究者一樣反覆搜尋、打開檔案、比對上下文、追蹤證據。對 PDF extraction、sidecar、figure/table surrogate、raw markdown corpus 這類資料特別有吸引力。

### When to use it
- corpus 是 local files，且 raw text 可用 `rg` 搜尋。
- 問題需要多步查證，而不只是 top-k semantic search。
- 你需要高解析度 evidence lookup，例如檔案、行號、figure/table sidecar。
- 你想避免先建複雜 vector DB 或 retrieval schema。

### When not to use it
- corpus 沒有整理成可搜尋檔案。
- 問題主要是語意相似查詢，baseline RAG 已足夠。
- 需要嚴格限制 agent tool access，但尚未設計 sandbox。
- 沒有保存 provenance，agent 會查到內容但難以引用。

### Course mapping
延伸 Class3 document/data pipeline 與 Class4 RAG。它把「資料要能被查」的要求拉回 raw corpus layout，而不是只依賴 vector index。

### Practical notes
如果未來你的 PDF extraction corpus 要接 DCI，markdown/source text 應該保持 raw-file searchable，並為 figures/tables 建 sidecar。不要太早把所有東西藏進 database，否則 DCI-style search 會失去可操作性。

## English

### Status
`Extension`: DCI-Agent-Lite is not a Class1-Class5 course tool. It is an agentic-search extension beyond RAG, suitable for research corpora that can be searched directly through terminal tools.

### What it is
DCI means Direct Corpus Interaction. Instead of building a fixed retriever or vector index first, it lets an agent inspect the raw corpus directly with terminal tools such as `rg`, `find`, and `sed`. DCI-Agent-Lite is a minimal open implementation of this paradigm.

### Problem it solves
Traditional RAG often fixes retrieval as embedding/vector search or a retrieval API. DCI lets an agent behave more like a researcher: search repeatedly, open files, compare context, and trace evidence. This is especially attractive for PDF extraction outputs, sidecars, figure/table surrogates, and raw markdown corpora.

### When to use it
- The corpus is local files and raw text can be searched with `rg`.
- Questions require multi-step verification, not only top-k semantic search.
- You need high-resolution evidence lookup such as file paths, line numbers, and figure/table sidecars.
- You want to avoid building a complex vector DB or retrieval schema too early.

### When not to use it
- The corpus is not organized into searchable files.
- The question is mostly semantic similarity and baseline RAG is enough.
- You need strict tool-access control but have not designed the sandbox.
- Provenance is not preserved, so the agent can find content but cannot cite it reliably.

### Course mapping
Extends Class3 document/data pipelines and Class4 RAG. It shifts attention back to raw corpus layout and searchability instead of relying only on vector indexes.

### Practical notes
If a future PDF extraction corpus should connect to DCI, keep markdown/source text raw-file searchable and create sidecars for figures/tables. Do not hide everything inside a database too early, or DCI-style search loses its practical advantage.

### References
- https://github.com/DCI-Agent/DCI-Agent-Lite
