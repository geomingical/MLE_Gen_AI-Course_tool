# Extension: Class2 Local Inference and Serving Extensions

## 中文

### Status
`Extension`: 延伸 Class2 的 Transformers、Hugging Face Hub、PyTorch/accelerate、vLLM。

### Extension map

| 類型 | 工具/概念 | 何時查它 | 備註 |
| --- | --- | --- | --- |
| Runtime | llama.cpp / GGUF | 想在 CPU、Apple Silicon、consumer GPU 上跑 quantized local model | Ollama 和 LM Studio 也常依賴類似 local runtime 心智 |
| Desktop app/server | LM Studio | 想用 GUI 管理 local models，並開 OpenAI-compatible local server | 適合學習和快速 demo |
| Serving engine | SGLang | 需要 production-level high-throughput serving 或多模型/多硬體支援 | 與 vLLM 類似，但設計重點不同 |
| Serving engine | Hugging Face TGI | 了解 Hugging Face serving 歷史與企業部署；目前官方 docs 表示進入 maintenance mode | 新專案通常優先比較 vLLM/SGLang/llama.cpp |
| Quantization | GGUF, GPTQ, AWQ, bitsandbytes | 模型太大，需要降低 VRAM/RAM | 量化會影響速度、品質、相容性 |
| Platform | MLX | Apple Silicon local inference/fine-tuning | macOS/M-series user 常見 |
| API pattern | OpenAI-compatible local server | 讓 local model 能接 OpenAI SDK、LangChain、LiteLLM | Ollama、vLLM、llama.cpp server、LM Studio 都可能提供 |

### When to use these
當 Class2 的 notebook inference 不再只是實驗，而需要本地長時間使用、OpenAI-compatible API、量化模型、或高吞吐 serving，就查這些工具。

### When not to use these
如果只是比較 prompt 輸出，Ollama 或 Transformers 已足夠。不要為了「看起來 production」就上 SGLang/vLLM，除非真的有 throughput、latency 或 concurrency 需求。

### Course mapping
對應 Class2 local LLM inference/serving，也會影響 Class4 RAG 的 local LLM backend。

### Practical notes
先分清楚三件事：model weights、runtime/engine、API wrapper。很多環境問題其實是這三層混在一起。

## English

### Status
`Extension`: Extends Class2 Transformers, Hugging Face Hub, PyTorch/accelerate, and vLLM.

### Extension map

| Type | Tool/concept | When to look it up | Notes |
| --- | --- | --- | --- |
| Runtime | llama.cpp / GGUF | You want quantized local models on CPU, Apple Silicon, or consumer GPUs | Ollama and LM Studio often rely on a similar local-runtime mindset |
| Desktop app/server | LM Studio | You want a GUI for local model management and an OpenAI-compatible local server | Good for learning and demos |
| Serving engine | SGLang | You need production-level high-throughput serving or broad model/hardware support | Similar category to vLLM, with different design tradeoffs |
| Serving engine | Hugging Face TGI | You want historical Hugging Face serving context or enterprise deployment knowledge; official docs now mark it maintenance mode | New projects should usually compare vLLM/SGLang/llama.cpp first |
| Quantization | GGUF, GPTQ, AWQ, bitsandbytes | The model is too large for available RAM/VRAM | Quantization affects speed, quality, and compatibility |
| Platform | MLX | Apple Silicon local inference/fine-tuning | Common for macOS/M-series users |
| API pattern | OpenAI-compatible local server | You want local models to work with OpenAI SDK, LangChain, or LiteLLM | Ollama, vLLM, llama.cpp server, and LM Studio may provide this |

### When to use these
Look these up when Class2 notebook inference becomes local daily use, OpenAI-compatible API serving, quantized deployment, or high-throughput serving.

### When not to use these
If you only compare prompt outputs, Ollama or Transformers is enough. Do not use SGLang/vLLM just to look production-grade unless you have real throughput, latency, or concurrency needs.

### Course mapping
Maps to Class2 local LLM inference/serving and affects the local LLM backend for Class4 RAG.

### Practical notes
Separate three layers: model weights, runtime/engine, and API wrapper. Many environment problems come from mixing these layers.

### References
- https://huggingface.co/docs/hub/en/gguf-llamacpp
- https://www.lmstudio.ai/docs
- https://docs.sglang.io/
- https://huggingface.co/docs/text-generation-inference/index
