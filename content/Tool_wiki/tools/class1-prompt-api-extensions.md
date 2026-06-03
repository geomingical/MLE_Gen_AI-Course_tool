# Extension: Class1 Prompting, API, and Structured Output Extensions

## 中文

### Status
`Extension`: 延伸 Class1 prompt engineering、OpenAI SDK、Ollama OpenAI-compatible API、JSON/XML structured output。

### Extension map

| 類型 | 工具/框架 | 何時查它 | 備註 |
| --- | --- | --- | --- |
| Package | Instructor | 需要用 Pydantic schema 驗證 LLM structured output，並在失敗時 retry | 適合 extraction、classification、typed JSON |
| Package/framework | Pydantic AI | 想把 prompt、tool、structured output、dependency 都放進 typed Python agent | 比單純 prompt template 更偏 application framework |
| Framework | DSPy | 想把 prompt 寫成可最佳化的 program，而不是手調 prompt | 適合有 eval set 後再用 |
| Framework | LangGraph | 需要 stateful、multi-step、long-running agent workflow | 比 LangChain chain 更低階、更可控 |
| Gateway | LiteLLM | 需要 OpenAI/Anthropic/Azure/Vertex/local endpoint provider routing | 已在 supplemental RAG frameworks 提到，可同時歸入 API extension |
| Pattern | JSON schema / tool calling structured output | 需要模型輸出可被程式穩定解析 | 格式正確不代表內容正確 |

### When to use these
當 Class1 的「請輸出 JSON/XML」開始不夠可靠，或下游程式真的依賴固定欄位、型別、tool arguments 時，就該從 prompt-only 轉向 schema validation、typed output 或 tool calling。

### When not to use these
如果只是學 prompt 或做一次性 demo，不要太早引入 agent framework。先用 OpenAI SDK 或 Ollama 跑通，再加入 typed validation。

### Course mapping
對應 Class1 的 prompt engineering、structured output、Ollama/OpenAI-compatible API。也會影響 Class4 RAG answer schema 和 citation schema。

### Practical notes
最小進階路徑：`prompt -> JSON parse -> Pydantic validation -> retry/fallback -> eval set`。不要一開始就把 framework 疊滿。

## English

### Status
`Extension`: Extends Class1 prompt engineering, OpenAI SDK, Ollama OpenAI-compatible APIs, and JSON/XML structured output.

### Extension map

| Type | Tool/framework | When to look it up | Notes |
| --- | --- | --- | --- |
| Package | Instructor | You need Pydantic schema validation for LLM structured output, with retries on failure | Good for extraction, classification, and typed JSON |
| Package/framework | Pydantic AI | You want prompts, tools, structured output, and dependencies inside a typed Python agent | More application-framework oriented than a prompt template |
| Framework | DSPy | You want prompts as optimizable programs instead of hand-tuned strings | Most useful after you have an eval set |
| Framework | LangGraph | You need stateful, multi-step, long-running agent workflows | Lower-level and more controllable than a simple LangChain chain |
| Gateway | LiteLLM | You need provider routing across OpenAI, Anthropic, Azure, Vertex, or local endpoints | Also listed under supplemental RAG frameworks |
| Pattern | JSON schema / tool calling structured output | You need model output that can be parsed reliably by code | Correct format does not imply correct content |

### When to use these
Use these when Class1-style "please output JSON/XML" is not reliable enough, or when downstream code depends on fixed fields, types, or tool arguments.

### When not to use these
For basic prompt learning or one-off demos, do not introduce an agent framework too early. First make OpenAI SDK or Ollama work, then add typed validation.

### Course mapping
Maps to Class1 prompt engineering, structured output, and Ollama/OpenAI-compatible APIs. It also affects Class4 RAG answer schemas and citation schemas.

### Practical notes
Minimal advanced path: `prompt -> JSON parse -> Pydantic validation -> retry/fallback -> eval set`. Do not stack frameworks before the basic failure modes are clear.

### References
- https://python.useinstructor.com/
- https://pydantic.dev/docs/ai/
- https://dspy.ai/
- https://docs.langchain.com/oss/python/langgraph
- https://docs.litellm.ai/
