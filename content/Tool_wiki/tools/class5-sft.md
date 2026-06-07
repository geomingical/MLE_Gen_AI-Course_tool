# Class5 SFT / Fine-Tuning

## 中文

Class5 的 lecture 主線是 supervised fine-tuning (SFT)：用高品質的標註資料讓 pretrained LLM 學特定任務、格式、語氣或回答模式。這和 RAG 不同。RAG 主要是在回答時查外部資料；SFT 則會改變模型權重或 adapter 權重。

### Course-covered items

| Item | Type | Role |
| --- | --- | --- |
| Supervised fine-tuning (SFT) | Method | 用 labeled examples 調整模型行為 |
| ChatML / chat templates | Pattern | 把 system/user/assistant 對話轉成訓練格式 |
| Hugging Face Datasets | Library | 載入、切分、轉換 train/eval data |
| PEFT | Library | 管理 LoRA/QLoRA 等 parameter-efficient adapters |
| LoRA | Method | 訓練低秩 adapter，而不是更新所有權重 |
| QLoRA | Method | 4-bit quantized base model + LoRA adapters |
| TRL / SFTTrainer | Library | 專門處理 SFT/alignment training 的 Hugging Face wrapper |
| TrainingArguments / Trainer | Framework API | 通用 Hugging Face training loop |
| DeepSpeed | Framework | 多卡與 ZeRO 記憶體優化 |

### Learning order

1. 先建立 baseline prompt/RAG output。
2. 準備 train/eval split，避免 eval leakage。
3. 把資料轉成 ChatML 或模型需要的 chat template。
4. 用 PEFT + LoRA 跑小型 smoke test。
5. 再比較 QLoRA、DeepSpeed、Unsloth、Axolotl 或 LLaMA-Factory。
6. 用 eval loss/PPL、人工測試與任務指標一起判斷結果。

### Common confusion

- `PEFT` 是 library；`LoRA` / `QLoRA` 是方法；adapter 是訓練輸出。
- `TRL` 不是只有 RLHF；Class5 主要用它的 `SFTTrainer`。
- `ChatML` 是資料格式，不是訓練演算法。
- SFT 不適合取代所有 RAG。若知識會更新，通常仍需要 retrieval。

## English

The Class5 lecture focuses on supervised fine-tuning (SFT): using high-quality labeled examples to teach a pretrained LLM a task, format, style, or response behavior. This differs from RAG. RAG retrieves external context at answer time; SFT changes model or adapter weights.

### Course-covered items

| Item | Type | Role |
| --- | --- | --- |
| Supervised fine-tuning (SFT) | Method | Adapt model behavior with labeled examples |
| ChatML / chat templates | Pattern | Serialize system/user/assistant conversations for training |
| Hugging Face Datasets | Library | Load, split, and transform train/eval data |
| PEFT | Library | Manage LoRA/QLoRA parameter-efficient adapters |
| LoRA | Method | Train low-rank adapters instead of all weights |
| QLoRA | Method | 4-bit quantized base model + LoRA adapters |
| TRL / SFTTrainer | Library | Hugging Face wrapper for SFT/alignment training |
| TrainingArguments / Trainer | Framework API | General Hugging Face training loop |
| DeepSpeed | Framework | Multi-GPU and ZeRO memory optimization |

### Learning order

1. Build baseline prompt/RAG outputs first.
2. Prepare train/eval splits and avoid eval leakage.
3. Convert data into ChatML or the model-specific chat template.
4. Run a small PEFT + LoRA smoke test.
5. Then compare QLoRA, DeepSpeed, Unsloth, Axolotl, or LLaMA-Factory.
6. Judge results with eval loss/PPL, manual tests, and task-specific metrics.

### Common confusion

- `PEFT` is a library; `LoRA` / `QLoRA` are methods; adapters are trained artifacts.
- `TRL` is not only for RLHF; in Class5 the relevant component is `SFTTrainer`.
- `ChatML` is a data format, not a training algorithm.
- SFT should not replace all RAG. If knowledge changes over time, retrieval is usually still needed.
