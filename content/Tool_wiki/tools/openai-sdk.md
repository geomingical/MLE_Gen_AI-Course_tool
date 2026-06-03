# OpenAI Python SDK

## 中文

### What it is
OpenAI Python SDK 是用 Python 呼叫 OpenAI 模型與 API 的官方 client。Class1 用它做基本 prompt/API 呼叫，Class4 也用到 OpenAI embeddings 與 LLM。

### Problem it solves
它把 HTTP API 包成 Python 物件，讓你可以用一致的方式送 prompt、拿回模型輸出、管理 API key，並在後續 RAG 或 agent pipeline 中重用。

### When to use it
當你需要穩定呼叫 OpenAI 模型、做 structured output、embedding、或把 OpenAI-compatible endpoint 接入 Python pipeline 時使用。

### When not to use it
如果任務只需要本地模型、不能使用外部 API、或成本/隱私限制很強，應優先考慮 Ollama、Transformers、vLLM 或其他 self-hosted backend。

### Strengths
- 官方維護，API 行為與文件同步。
- 適合快速 prototype。
- 可接 OpenAI-compatible local server。

### Weaknesses and failure modes
- 需要 API key 與網路。
- 成本與 rate limit 會影響實驗。
- 模型輸出仍需驗證，尤其是格式、citation、事實正確性。

### Minimal Python example
```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4.1-mini",
    messages=[{"role": "user", "content": "Summarize RAG in three bullets."}],
)
print(response.choices[0].message.content)
```

### Course mapping
Class1 lecture/HW introduces API calls and prompt experiments. Class4 uses OpenAI embeddings and LLM calls inside RAG examples.

### Related tools
Ollama, LiteLLM, LangChain, vLLM.

### Practical notes
Never hard-code real API keys in notebooks. Use environment variables or `.env`, and do not commit secrets.

## English

### What it is
The OpenAI Python SDK is the official Python client for calling OpenAI models and APIs. In this course, Class1 uses it for basic prompt/API calls, and Class4 uses OpenAI embeddings and LLM calls in RAG examples.

### Problem it solves
It wraps HTTP APIs in Python objects, making it easier to send prompts, receive model outputs, manage API keys, and reuse calls inside RAG or agent pipelines.

### When to use it
Use it when you need reliable access to OpenAI models, structured output, embeddings, or an OpenAI-compatible endpoint from Python.

### When not to use it
Avoid it when the task must run fully locally, cannot use external APIs, or has strict cost/privacy constraints. In those cases, consider Ollama, Transformers, vLLM, or another self-hosted backend.

### Strengths
- Officially maintained and aligned with API documentation.
- Good for fast prototyping.
- Can also target OpenAI-compatible local servers.

### Weaknesses and failure modes
- Requires API keys and network access.
- Cost and rate limits affect experiments.
- Model output still needs validation, especially for format, citations, and factual claims.

### Minimal Python example
```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4.1-mini",
    messages=[{"role": "user", "content": "Summarize RAG in three bullets."}],
)
print(response.choices[0].message.content)
```

### Course mapping
Class1 lecture/HW introduces API calls and prompt experiments. Class4 uses OpenAI embeddings and LLM calls inside RAG examples.

### Related tools
Ollama, LiteLLM, LangChain, vLLM.

### Practical notes
Never hard-code real API keys in notebooks. Use environment variables or `.env`, and do not commit secrets.

### References
- https://platform.openai.com/docs
