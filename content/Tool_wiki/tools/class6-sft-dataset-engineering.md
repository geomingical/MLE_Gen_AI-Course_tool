# Class6 SFT Dataset Engineering / SFT 資料集工程

## 中文

Class6 的主線不是「再多一個 fine-tuning framework」，而是把 SFT 訓練前最關鍵的資料拼圖補完整：你要先決定資料要教模型哪些能力，再決定如何產生、抽樣、檢查、混合與切分資料。這一步會直接限制後面的 LoRA/QLoRA、SFTTrainer、Unsloth 或 Axolotl 能不能學到穩定行為。

### Course-covered data buckets

| Data bucket | Core code / lecture flow | Trained capability |
| --- | --- | --- |
| Domain-Specific | 技術背景擴寫；工具、版本、domain facts、專業術語 | 專業硬實力、特定工具與版本細節 |
| Behavioral | 隨機抽樣行為題；STAR/teamwork/communication examples | 情商、團隊協作、軟實力對話 |
| Scenario-based | 生產環境情境題；incident/debugging/systematic diagnosis | 系統化排查、step-by-step reasoning、operational judgment |
| Identity Reinforcement | 角色設定對答；persona and boundary reinforcement | 維持人設一致性、防止基底模型記憶復甦 |

### Learning order

1. 先定義目標 persona、任務邊界與 evaluation prompts。
2. 把資料分成能力桶，而不是只累積更多 Q&A。
3. 每個 bucket 都保留來源、生成方式、抽樣規則與人工檢查欄位。
4. 混合資料時記錄 bucket ratio，避免某一類資料壓過其他能力。
5. 切出 held-out eval set，確認 eval 裡每個 bucket 都有覆蓋。
6. 訓練後分 bucket 檢查：domain answer、behavioral answer、scenario diagnosis、identity consistency 是否各自改善。

### Common confusion

- 多資料不等於好資料；SFT 更怕格式錯、persona 衝突、重複題與 eval leakage。
- Domain-specific 資料教專業語言與工具細節，但不應被拿來取代會更新的外部知識庫。
- Scenario-based 題目可以訓練推理流程，但不要把未驗證的 chain-of-thought 當成真實標籤。
- Identity reinforcement 是行為約束資料，不是安全保證；仍要搭配 system prompt、eval 與拒答邊界。

## English

Class6 is not primarily about adding another fine-tuning framework. Its main thread is SFT dataset engineering: deciding what capabilities the data should teach, then generating, sampling, checking, mixing, and splitting records before training. This step determines whether later LoRA/QLoRA, SFTTrainer, Unsloth, or Axolotl runs can learn stable behavior.

### Course-covered data buckets

| Data bucket | Core code / lecture flow | Trained capability |
| --- | --- | --- |
| Domain-Specific | Technical background expansion; tools, versions, domain facts, terminology | Professional hard skills and tool/version-specific details |
| Behavioral | Randomly sampled behavioral questions; STAR/teamwork/communication examples | Soft-skill dialogue, collaboration, and communication behavior |
| Scenario-based | Production scenarios; incidents, debugging, and systematic diagnosis | Operational troubleshooting, step-by-step reasoning, and engineering judgment |
| Identity Reinforcement | Persona-setting QA pairs and boundary reinforcement | Persona consistency and resistance to base-model behavior drift |

### Learning order

1. Define the target persona, task boundary, and evaluation prompts first.
2. Organize data by capability buckets rather than simply collecting more Q&A.
3. Preserve source, generation method, sampling rule, and review fields for each bucket.
4. Record bucket ratios during mixing so one capability does not dominate the dataset.
5. Create a held-out eval set with coverage for every bucket.
6. After training, evaluate by bucket: domain answers, behavioral answers, scenario diagnosis, and identity consistency.

### Common confusion

- More data is not automatically better data; SFT is sensitive to bad format, persona conflicts, repeated prompts, and eval leakage.
- Domain-specific data teaches professional language and tool details, but should not replace an updatable external knowledge base.
- Scenario-based records can teach reasoning procedures, but unverified chain-of-thought should not be treated as ground-truth labels.
- Identity reinforcement is behavioral constraint data, not a safety guarantee; it still needs system prompts, evals, and refusal boundaries.
