# Extension: Tool Calling, Plugins, MCP, and Agent Toolsets

## 中文

### Status
`Extension`: 這個層橫跨 Class1-Class5。Class1 學 prompt/API，Class3/4 開始把 ASR、LLM、TTS、retriever 串成系統，Class5 則加入 fine-tuning 與 hybrid retrieval；tool/plugin/protocol layer 是讓模型可靠使用外部能力的下一步。

### Extension map

| 類型 | 工具/協定 | 何時查它 | 備註 |
| --- | --- | --- | --- |
| API pattern | OpenAI tool/function calling | 模型需要呼叫外部函式、查資料、執行 action | 需要 JSON schema 和 tool result handling |
| Protocol | MCP | 想用標準協定把 filesystem、DB、GitHub、browser、calendar 等能力提供給 AI app | server 權限與安全邊界很重要 |
| Framework tools | LangChain tools | 已經用 LangChain/LangGraph，需要工具註冊和調用 | tool description 品質會影響模型選工具 |
| Toolsets | Pydantic AI toolsets | 想把多個 function tools 組成 typed agent capability | 適合 Python typed workflow |
| Plugin/app layer | Browser, GitHub, Gmail, Data Analytics, Documents plugins | 想讓 agent 連接外部 app 或 Codex/ChatGPT workspace 能力 | plugin 是 host-level integration，不一定等於 Python package |
| Safety pattern | approval/sandbox/least privilege | 工具能寫檔、跑 shell、呼叫外部服務時 | 沒有權限設計的 tool calling 很危險 |

### When to use it
當模型不只是回答文字，而需要查檔案、跑檢索、呼叫 API、控制 browser、操作 GitHub、發信或讀資料庫時使用。

### When not to use it
如果任務只是簡單問答或單一 API call，不要引入 MCP/plugin layer。工具越多，錯誤工具選擇、prompt injection、資料外洩和權限問題越多。

### Course mapping
延伸 Class1 API/tool abstraction、Class3 voice agent pipeline、Class4 RAG retriever as tool。後續如果課程進到 agents/MCP，這頁可以接上 Class10。

### Practical notes
工具描述要短、精確、可驗證。每個 tool 都應有：input schema、side effects、permission boundary、failure behavior、logging/provenance。

## English

### Status
`Extension`: This layer spans Class1-Class5. Class1 teaches prompts/APIs, Class3/4 compose ASR, LLMs, TTS, and retrievers into systems, and Class5 adds fine-tuning plus hybrid retrieval. The tool/plugin/protocol layer is the next step for making models reliably use external capabilities.

### Extension map

| Type | Tool/protocol | When to look it up | Notes |
| --- | --- | --- | --- |
| API pattern | OpenAI tool/function calling | The model needs to call external functions, retrieve data, or perform actions | Requires JSON schema and tool-result handling |
| Protocol | MCP | You want a standard protocol exposing filesystem, DB, GitHub, browser, calendar, or other capabilities to AI apps | Server permissions and security boundaries matter |
| Framework tools | LangChain tools | You already use LangChain/LangGraph and need tool registration/invocation | Tool-description quality affects tool selection |
| Toolsets | Pydantic AI toolsets | You want multiple function tools bundled as a typed agent capability | Good fit for typed Python workflows |
| Plugin/app layer | Browser, GitHub, Gmail, Data Analytics, Documents plugins | You want the agent connected to external apps or Codex/ChatGPT workspace capabilities | Plugins are host-level integrations, not necessarily Python packages |
| Safety pattern | approval/sandbox/least privilege | Tools can write files, run shell commands, or call external services | Tool calling without permission design is dangerous |

### When to use it
Use it when the model does more than answer text: search files, run retrieval, call APIs, control browsers, operate GitHub, send email, or query databases.

### When not to use it
For simple Q&A or a single API call, do not introduce MCP/plugin layers. More tools increase wrong-tool selection, prompt injection, data leakage, and permission problems.

### Course mapping
Extends Class1 API/tool abstraction, Class3 voice-agent pipelines, and Class4 retriever-as-tool design. If later course content reaches agents/MCP, this page can connect to Class10.

### Practical notes
Tool descriptions should be short, precise, and testable. Every tool should define input schema, side effects, permission boundary, failure behavior, and logging/provenance.

### References
- https://platform.openai.com/docs/guides/function-calling
- https://modelcontextprotocol.io/docs/learn/server-concepts
- https://docs.langchain.com/oss/python/langchain-tools
- https://pydantic.dev/docs/ai/tools-toolsets/toolsets/
