# vLLM

## 中文

### What it is
vLLM 是高效 LLM inference/serving engine。Class2 README 與 Class4 程式都提到用 vLLM 啟動 OpenAI-compatible API server。

### Problem it solves
它解決大型 LLM serving 的 throughput、memory management 和 API serving 問題，比單純用 Transformers generate 更適合服務化。

### When to use it
當你要把 open-source LLM 以 API server 形式提供，或要和 OpenAI-compatible client/LangChain 整合時使用。

### When not to use it
如果只是小模型 notebook demo，Transformers 更直接。如果沒有足夠 GPU 或模型不受支援，vLLM 可能不適合。

### Strengths
- 高吞吐 serving。
- OpenAI-compatible API 方便整合。
- 適合 RAG/agent backend。

### Weaknesses and failure modes
- 安裝和 GPU 相依性比 Ollama 複雜。
- 模型支援與量化格式要確認。
- serving 成功不代表模型回答品質可靠。

### Minimal command
```bash
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3-8B-Instruct
```

### Course mapping
Class2 serving task and Class4 RAG code using an OpenAI-compatible local endpoint.

### Related tools
Transformers, Hugging Face Hub, OpenAI SDK, LangChain.

### Practical notes
先用小模型或已確認可用的模型驗證 server，再接 RAG pipeline。

## English

### What it is
vLLM is an efficient LLM inference and serving engine. Class2 README and Class4 code mention starting a vLLM OpenAI-compatible API server.

### Problem it solves
It addresses throughput, memory management, and API serving for large LLMs, making it more suitable for service deployment than plain Transformers generation.

### When to use it
Use it when you want to expose an open-source LLM as an API server or integrate a local model with OpenAI-compatible clients and LangChain.

### When not to use it
For small notebook demos, Transformers is more direct. If you lack sufficient GPU resources or the model is unsupported, vLLM may not fit.

### Strengths
- High-throughput serving.
- OpenAI-compatible API integration.
- Good backend for RAG and agent systems.

### Weaknesses and failure modes
- Installation and GPU dependencies are more complex than Ollama.
- Model support and quantization formats must be checked.
- Successful serving does not guarantee answer quality.

### Minimal command
```bash
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Meta-Llama-3-8B-Instruct
```

### Course mapping
Class2 serving task and Class4 RAG code using an OpenAI-compatible local endpoint.

### Related tools
Transformers, Hugging Face Hub, OpenAI SDK, LangChain.

### Practical notes
Validate the server with a small or known-supported model before connecting it to a RAG pipeline.

### References
- https://docs.vllm.ai/
