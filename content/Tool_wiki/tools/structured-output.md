# Structured Output Patterns

## 中文

### What it is
Structured output 指要求 LLM 用 JSON、XML 或 schema-like 格式回覆。Class1 HW 練習 JSON/XML output 和 nesting。

### Problem it solves
它讓模型輸出更容易被程式解析，適合 agent、資料抽取、評估與後處理。

### When to use it
當下游程式需要固定欄位、list、分類結果、metadata 或 tool arguments 時使用。

### When not to use it
如果任務是開放式 brainstorming、creative writing 或不需要機器解析，太硬的格式可能降低回答品質。

### Strengths
- 讓輸出可驗證、可解析。
- 便於接入資料 pipeline。
- 可減少格式漂移。

### Weaknesses and failure modes
- LLM 可能產生 invalid JSON。
- schema 太複雜時，模型可能漏欄位或混淆型別。
- 格式正確不代表內容正確。

### Minimal Python example
```python
import json

prompt = """
Return valid JSON only:
{"summary": string, "risks": list[string]}
Topic: OCR errors in scientific PDFs
"""

raw = call_llm(prompt)
data = json.loads(raw)
```

### Course mapping
Class1 structured JSON/XML output tasks.

### Related tools
OpenAI SDK, LangChain output parsers, Instructor, Pydantic, LiteLLM.

### Practical notes
Always parse and validate. Do not trust a model simply because the prompt says "valid JSON only."

## English

### What it is
Structured output means asking an LLM to respond in JSON, XML, or a schema-like format. Class1 HW practices JSON/XML output and nesting.

### Problem it solves
It makes model output easier for programs to parse, which is useful for agents, extraction, evaluation, and post-processing.

### When to use it
Use it when downstream code needs fixed fields, lists, classifications, metadata, or tool arguments.

### When not to use it
If the task is open-ended brainstorming, creative writing, or does not need machine parsing, strict formatting may reduce answer quality.

### Strengths
- Makes output parseable and verifiable.
- Fits data pipelines.
- Reduces format drift.

### Weaknesses and failure modes
- LLMs may generate invalid JSON.
- Complex schemas can cause missing fields or type confusion.
- Valid format does not imply correct content.

### Minimal Python example
```python
import json

prompt = """
Return valid JSON only:
{"summary": string, "risks": list[string]}
Topic: OCR errors in scientific PDFs
"""

raw = call_llm(prompt)
data = json.loads(raw)
```

### Course mapping
Class1 structured JSON/XML output tasks.

### Related tools
OpenAI SDK, LangChain output parsers, Instructor, Pydantic, LiteLLM.

### Practical notes
Always parse and validate. Do not trust a model simply because the prompt says "valid JSON only."
