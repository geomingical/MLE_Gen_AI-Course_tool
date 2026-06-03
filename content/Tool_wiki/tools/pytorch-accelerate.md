# PyTorch and accelerate

## 中文

### What it is
PyTorch 是深度學習 runtime；accelerate 是 Hugging Face 提供的工具，協助模型在 CPU/GPU、多裝置與 mixed precision 下運行。Class2 安裝 `torch`、`accelerate` 來支援 Transformers inference。

### Problem it solves
PyTorch 提供 tensor computation 和模型執行基礎；accelerate 降低 device placement 和 distributed/mixed precision 設定的摩擦。

### When to use it
使用 Transformers 載模型、跑 local inference、或未來 fine-tuning 時幾乎一定會碰到。

### When not to use it
如果你只呼叫 hosted API，不需要直接操作 PyTorch。若 serving 需求高，vLLM 會隱藏部分 runtime 細節。

### Strengths
- PyTorch 是主流 ML runtime。
- accelerate 對 Hugging Face workflows 很實用。
- 適合理解模型硬體限制。

### Weaknesses and failure modes
- CUDA/MPS/CPU 差異會造成環境問題。
- dtype、memory、device_map 設定錯誤會導致 OOM 或很慢。
- 初學者容易把 runtime 問題誤認為模型問題。

### Minimal Python example
```python
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
x = torch.tensor([1.0, 2.0], device=device)
print(x * 2)
```

### Course mapping
Class2 inference environment and package installation.

### Related tools
Transformers, Hugging Face Hub, vLLM.

### Practical notes
先確認 `torch.cuda.is_available()` 或 macOS MPS 狀態，再判斷是不是模型程式本身出錯。

## English

### What it is
PyTorch is a deep learning runtime. accelerate is a Hugging Face tool that helps run models across CPU/GPU, multiple devices, and mixed precision. Class2 installs `torch` and `accelerate` to support Transformers inference.

### Problem it solves
PyTorch provides tensor computation and model execution. accelerate reduces friction around device placement and distributed/mixed-precision setup.

### When to use it
You will encounter it when loading models with Transformers, running local inference, or doing future fine-tuning.

### When not to use it
If you only call hosted APIs, you do not need to interact with PyTorch directly. For high-throughput serving, vLLM hides many runtime details.

### Strengths
- PyTorch is a mainstream ML runtime.
- accelerate is useful for Hugging Face workflows.
- Helps you understand model hardware constraints.

### Weaknesses and failure modes
- CUDA/MPS/CPU differences often cause environment problems.
- Incorrect dtype, memory, or device_map settings can cause OOM or slow runs.
- Beginners often misdiagnose runtime problems as model problems.

### Minimal Python example
```python
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
x = torch.tensor([1.0, 2.0], device=device)
print(x * 2)
```

### Course mapping
Class2 inference environment and package installation.

### Related tools
Transformers, Hugging Face Hub, vLLM.

### Practical notes
Check `torch.cuda.is_available()` or macOS MPS status before assuming the model code is broken.

### References
- https://pytorch.org/docs/
- https://huggingface.co/docs/accelerate/
