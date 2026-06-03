# Hugging Face Transformers

## 中文

### What it is
Transformers 是 Hugging Face 的模型載入與推論 library。Class2 lecture 使用 `AutoTokenizer` 和 `AutoModelForCausalLM` 載入開源 LLM，Class3 也出現 summarization pipeline。

### Problem it solves
它提供統一 API 下載 tokenizer/model、執行 generate、pipeline、以及多種 NLP/model 任務。

### When to use it
適合學習模型推論、測試不同 open-source model、理解 tokenizer/generation config、以及 notebook demo。

### When not to use it
如果目標是高吞吐 serving，vLLM 通常更合適。若只要呼叫 hosted API，也不需要自己載模型。

### Strengths
- 模型生態最大之一。
- 與 Hugging Face Hub 深度整合。
- 適合探索模型細節。

### Weaknesses and failure modes
- 大模型很吃 RAM/VRAM。
- dtype、device_map、quantization 設定容易出錯。
- notebook 能跑不代表 serving 能承受併發。

### Minimal Python example
```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "gpt2"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

inputs = tok("RAG means", return_tensors="pt")
out = model.generate(**inputs, max_new_tokens=20)
print(tok.decode(out[0], skip_special_tokens=True))
```

### Course mapping
Class2 lecture and homework local LLM inference tasks. Class3 summarization example uses Transformers pipeline.

### Related tools
Hugging Face Hub, PyTorch, accelerate, vLLM, Ollama.

### Practical notes
Start with a small model for environment validation before loading large instruct models.

## English

### What it is
Transformers is Hugging Face's model loading and inference library. Class2 lecture uses `AutoTokenizer` and `AutoModelForCausalLM` to load open-source LLMs, and Class3 includes a summarization pipeline.

### Problem it solves
It provides a unified API for downloading tokenizers/models, running generation, using pipelines, and working across many NLP/model tasks.

### When to use it
Use it to learn model inference, compare open-source models, understand tokenizer/generation configuration, and build notebook demos.

### When not to use it
For high-throughput serving, vLLM is usually a better fit. If you only need a hosted API, you do not need to load models yourself.

### Strengths
- One of the largest model ecosystems.
- Deep integration with Hugging Face Hub.
- Good for exploring model details.

### Weaknesses and failure modes
- Large models require substantial RAM/VRAM.
- dtype, device_map, and quantization settings are common failure points.
- A notebook demo does not imply the setup can handle concurrent serving.

### Minimal Python example
```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "gpt2"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

inputs = tok("RAG means", return_tensors="pt")
out = model.generate(**inputs, max_new_tokens=20)
print(tok.decode(out[0], skip_special_tokens=True))
```

### Course mapping
Class2 lecture and homework local LLM inference tasks. Class3 summarization example uses Transformers pipeline.

### Related tools
Hugging Face Hub, PyTorch, accelerate, vLLM, Ollama.

### Practical notes
Start with a small model for environment validation before loading large instruct models.

### References
- https://huggingface.co/docs/transformers/
