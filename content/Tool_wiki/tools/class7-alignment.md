# Class7 Preference Alignment / 偏好對齊（PPO vs DPO vs GRPO）

## 中文

Class7 的主線是 SFT 之後的「偏好對齊」（preference alignment）：SFT 教模型把任務「做出來」，alignment 則用人類或 AI 的偏好（chosen vs rejected）把模型行為調整到更符合期望。課程用同一份 preference data 並排比較三種主流方法——PPO、DPO、GRPO，重點不是再多一個 trainer，而是理解它們在資料需求、穩定性、記憶體成本與彈性上的取捨。

### Course-covered alignment methods

| Method | Core pipeline | Trained behavior | Best use case |
| --- | --- | --- | --- |
| PPO | preference → reward model → RL（on-policy）| 用 reward signal 細控行為 | 安全關鍵、需要精細控制的應用 |
| DPO | 直接用 chosen/rejected pairs 做 classification-style loss | 簡單、穩定的偏好對齊 | 一般對齊任務、資源有限時的首選 |
| GRPO | 對一組 sample 計算 relative advantage，不需獨立 reward model | 取樣效率高、彈性大 | 推理任務、研究與多回饋來源 |

### Supporting pieces

| Piece | Role |
| --- | --- |
| Preference dataset（chosen/rejected）| 對齊的訓練訊號來源；可用 Gradio 介面人工標註 |
| Reward model | PPO 路線把偏好轉成可微分 reward 的中介模型 |
| TRL alignment trainers | `DPOTrainer` / `PPOTrainer` / `GRPOTrainer` 把三種方法包成可重現的訓練流程 |

### Learning order

1. 先理解 alignment 是接在 SFT 後面的階段，不是取代 SFT。
2. 從 preference data 開始：每筆資料是 prompt + chosen + rejected，標註要一致。
3. 先學 DPO（最直觀、最穩定），建立 baseline 對齊行為。
4. 再看 PPO：preference → reward model → RL 的完整三段式，理解 reward hacking 與不穩定性。
5. 最後看 GRPO：去掉獨立 reward model，用 group relative advantage，理解它為何在推理任務有優勢。
6. 用同一份 eval prompts 比較三種方法的輸出，記錄品質、穩定性與成本。

### Common confusion

- Alignment 不是 SFT 的替代品；先 SFT 把任務學起來，再用偏好資料微調行為。
- DPO 雖然簡單，但它仍然依賴高品質、無雜訊的 chosen/rejected pairs；偏好標註不一致會直接劣化結果。
- PPO 的 reward model 容易被 reward hacking；reward 高不等於行為真的變好，要用 held-out eval 驗證。
- GRPO 不需要獨立 reward model，但需要對每個 prompt 取多個 sample，計算成本不一定比較低。
- 教學實作為了能在小硬體跑，通常用小模型與少量 epoch；數字是示意，不能直接當成生產基準。

## English

Class7 focuses on preference alignment, the stage that comes after SFT. SFT teaches a model to *do* the task; alignment uses human or AI preferences (chosen vs rejected) to shape the model's behavior toward what people actually want. The class compares three mainstream methods side by side on the same preference data—PPO, DPO, and GRPO. The point is not adding another trainer but understanding their trade-offs in data needs, stability, memory cost, and flexibility.

### Course-covered alignment methods

| Method | Core pipeline | Trained behavior | Best use case |
| --- | --- | --- | --- |
| PPO | preference → reward model → RL (on-policy) | Fine control via a reward signal | Safety-critical apps needing tight control |
| DPO | Direct classification-style loss on chosen/rejected pairs | Simple, stable preference alignment | General alignment; default when resources are limited |
| GRPO | Group-relative advantage over a set of samples, no separate reward model | Sample-efficient, flexible | Reasoning tasks, research, multi-feedback settings |

### Supporting pieces

| Piece | Role |
| --- | --- |
| Preference dataset (chosen/rejected) | The training signal for alignment; can be annotated with a Gradio interface |
| Reward model | Intermediate model that turns preferences into a differentiable reward for the PPO route |
| TRL alignment trainers | `DPOTrainer` / `PPOTrainer` / `GRPOTrainer` wrap the three methods into reproducible training flows |

### Learning order

1. Understand that alignment is a stage after SFT, not a replacement for it.
2. Start from preference data: each record is prompt + chosen + rejected, and annotation must be consistent.
3. Learn DPO first (most direct and stable) to establish a baseline aligned behavior.
4. Then study PPO: the full preference → reward model → RL pipeline, including reward hacking and instability.
5. Finally study GRPO: dropping the separate reward model for group-relative advantage, and why it helps on reasoning tasks.
6. Compare all three methods on the same eval prompts, recording quality, stability, and cost.

### Common confusion

- Alignment does not replace SFT; SFT learns the task first, then preference data tunes behavior.
- DPO is simple but still depends on high-quality, low-noise chosen/rejected pairs; inconsistent labels directly degrade results.
- PPO's reward model is prone to reward hacking; a high reward is not proof of better behavior—validate with a held-out eval.
- GRPO needs no separate reward model, but it samples multiple generations per prompt, so it is not always cheaper.
- Teaching implementations use small models and few epochs to run on modest hardware; the numbers are illustrative, not production baselines.
