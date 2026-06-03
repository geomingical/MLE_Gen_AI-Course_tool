# Hugging Face Hub

## 中文

### What it is
Hugging Face Hub 是模型、tokenizer、dataset、space 的 registry。Class2 使用它下載 Llama/Mistral 等 open-source model。

### Problem it solves
它讓你用 model id 取得模型資源，而不是手動下載權重與設定檔。

### When to use it
當你需要搜尋模型、下載 tokenizer/model、管理 gated model access、或追蹤 model card 時使用。

### When not to use it
如果模型已經由 Ollama、vLLM server 或公司內部 registry 管理，你可能不需要直接操作 Hub。

### Strengths
- 模型與 dataset 生態龐大。
- model card 通常提供 license、usage、限制資訊。
- 與 Transformers、sentence-transformers、diffusers 等工具整合。

### Weaknesses and failure modes
- gated model 需要登入與授權。
- model card 品質不一。
- 模型 license 與硬體需求必須自己確認。

### Minimal Python example
```python
from huggingface_hub import snapshot_download

path = snapshot_download(repo_id="sentence-transformers/all-MiniLM-L6-v2")
print(path)
```

### Course mapping
Class2 local model inference setup.

### Related tools
Transformers, sentence-transformers, PyTorch, vLLM.

### Practical notes
下載大模型前先確認磁碟空間、license、是否需要 access token。

## English

### What it is
Hugging Face Hub is a registry for models, tokenizers, datasets, and spaces. Class2 uses it to download open-source models such as Llama or Mistral.

### Problem it solves
It lets you retrieve model resources by model id instead of manually downloading weights and config files.

### When to use it
Use it to search for models, download tokenizers/models, manage gated model access, or inspect model cards.

### When not to use it
If models are already managed by Ollama, a vLLM server, or an internal company registry, you may not need to interact with the Hub directly.

### Strengths
- Large model and dataset ecosystem.
- Model cards often provide license, usage, and limitation notes.
- Integrates with Transformers, sentence-transformers, diffusers, and related tools.

### Weaknesses and failure modes
- Gated models require login and approval.
- Model card quality varies.
- You must still check license and hardware requirements yourself.

### Minimal Python example
```python
from huggingface_hub import snapshot_download

path = snapshot_download(repo_id="sentence-transformers/all-MiniLM-L6-v2")
print(path)
```

### Course mapping
Class2 local model inference setup.

### Related tools
Transformers, sentence-transformers, PyTorch, vLLM.

### Practical notes
Before downloading large models, check disk space, license, and whether an access token is required.

### References
- https://huggingface.co/docs/huggingface_hub/
