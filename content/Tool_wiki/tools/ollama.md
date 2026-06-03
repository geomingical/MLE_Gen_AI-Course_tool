# Ollama

## 中文

### What it is
Ollama 是本地執行 LLM 的工具，並可提供 OpenAI-compatible API endpoint。Class1 HW 使用它說明本地 server 如何用類似 OpenAI SDK 的方式呼叫。

### Problem it solves
它讓你不用自己手動處理模型權重、runtime 與 server 包裝，就能在本機測試 local LLM。

### When to use it
適合本機 prompt 測試、隱私敏感 demo、低成本模型比較，以及學習 OpenAI-compatible API 的抽象。

### When not to use it
不適合需要高吞吐、多 GPU serving、嚴格 production latency、或需要完整自訂 inference engine 的場景。

### Strengths
- 安裝和啟動簡單。
- 對初學者友善。
- 可與 OpenAI-compatible client 或 LangChain 整合。

### Weaknesses and failure modes
- 模型品質依模型而定，不能因為本地就假設可靠。
- 大模型仍受 RAM/VRAM 限制。
- production observability 和 scaling 能力有限。

### Minimal Python example
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)
response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Explain JSON output constraints."}],
)
print(response.choices[0].message.content)
```

### Course mapping
Class1 HW discusses Ollama as a local OpenAI-compatible server.

### Related tools
OpenAI SDK, vLLM, Transformers, LangChain.

### Practical notes
Treat Ollama as a convenient local backend, not as a replacement for understanding model size, quantization, context length, and hardware limits.

## English

### What it is
Ollama is a tool for running LLMs locally and exposing them through an OpenAI-compatible API endpoint. Class1 HW uses it to show how a local server can be called with OpenAI-style clients.

### Problem it solves
It lets you test local LLMs without manually managing model weights, runtime setup, and server wrapping.

### When to use it
Use it for local prompt testing, privacy-sensitive demos, low-cost model comparison, and learning the OpenAI-compatible API abstraction.

### When not to use it
Avoid it for high-throughput multi-GPU serving, strict production latency, or cases where you need full control over the inference engine.

### Strengths
- Simple installation and startup.
- Friendly for beginners.
- Integrates with OpenAI-compatible clients and LangChain.

### Weaknesses and failure modes
- Output quality depends on the chosen model.
- Large models are still constrained by RAM/VRAM.
- Production observability and scaling are limited.

### Minimal Python example
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)
response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Explain JSON output constraints."}],
)
print(response.choices[0].message.content)
```

### Course mapping
Class1 HW discusses Ollama as a local OpenAI-compatible server.

### Related tools
OpenAI SDK, vLLM, Transformers, LangChain.

### Practical notes
Treat Ollama as a convenient local backend, not as a replacement for understanding model size, quantization, context length, and hardware limits.

### References
- https://ollama.com/
- https://github.com/ollama/ollama/blob/main/docs/openai.md
