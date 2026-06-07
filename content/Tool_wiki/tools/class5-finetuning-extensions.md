# Class5 Fine-Tuning Extensions

## 中文

這些是 Class5 SFT 主題的延伸工具。它們不是全部都在課堂正式手把手教過，但都常出現在 LLM fine-tuning 工作流中。

| Item | Type | Why it matters |
| --- | --- | --- |
| Unsloth | Framework | 加速 LoRA/QLoRA，降低 local fine-tuning 顯存與環境摩擦 |
| Axolotl | Framework / workflow stack | 用 YAML 管理 dataset、template、LoRA/QLoRA、DeepSpeed/FSDP、eval 與輸出 |
| LLaMA-Factory | Framework / WebUI + CLI | 用 UI/CLI 降低 fine-tuning 入門門檻 |
| FSDP | Distributed training framework | PyTorch-native sharded training layer |
| Gradient checkpointing | Method | 用重算換顯存 |
| Gradient accumulation | Method | 用多步累積模擬較大 batch size |
| FlashAttention | Method / kernel optimization | 改善 attention 計算速度與顯存使用 |

### Practical rule

不要一開始就把所有延伸工具打開。先跑通最小 SFT/LoRA baseline，再逐一加入加速、量化或多卡方案，並記錄 peak VRAM、tokens/sec、eval loss 和實際回答。

## English

These are extensions around the Class5 SFT theme. They are not all fully taught step by step in class, but they are common in LLM fine-tuning workflows.

| Item | Type | Why it matters |
| --- | --- | --- |
| Unsloth | Framework | Speeds up LoRA/QLoRA and reduces local fine-tuning friction |
| Axolotl | Framework / workflow stack | Uses YAML to manage datasets, templates, LoRA/QLoRA, DeepSpeed/FSDP, eval, and outputs |
| LLaMA-Factory | Framework / WebUI + CLI | Lowers the entry barrier through UI/CLI fine-tuning workflows |
| FSDP | Distributed training framework | PyTorch-native sharded training layer |
| Gradient checkpointing | Method | Trades recomputation for lower memory use |
| Gradient accumulation | Method | Simulates a larger batch through multiple accumulation steps |
| FlashAttention | Method / kernel optimization | Improves attention speed and memory usage |

### Practical rule

Do not enable every extension at once. First get a minimal SFT/LoRA baseline running, then add acceleration, quantization, or distributed training one at a time. Record peak VRAM, tokens/sec, eval loss, and actual outputs.
