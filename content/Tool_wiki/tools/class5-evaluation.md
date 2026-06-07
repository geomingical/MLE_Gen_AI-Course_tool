# Class5 Evaluation

## 中文

Class5 的 evaluation 有兩條線：fine-tuning evaluation 和 retrieval evaluation。

### Fine-tuning evaluation

| Metric / benchmark | Type | Use |
| --- | --- | --- |
| eval loss | Metric | held-out text 的預測 loss |
| Perplexity (PPL) | Metric | `PPL = exp(eval_loss)`，越低通常代表越會預測 eval text |
| MMLU / GSM8K | Benchmark | 檢查微調後是否造成一般能力退化 |
| manual prompt set | Task eval | 直接比較 baseline、checkpoint、final adapter 的回答 |

PPL 低不等於回答一定比較有幫助或比較正確。它應該搭配任務測試、人工檢查與 benchmark。

### Retrieval evaluation

| Metric | Use |
| --- | --- |
| Recall@k | relevant document 是否出現在 top-k |
| Hit Rate@k | query 是否至少命中一個 relevant result |

Hybrid retrieval 要至少比較 vector-only、keyword-only、hybrid 三種方法。

## English

Class5 evaluation has two tracks: fine-tuning evaluation and retrieval evaluation.

### Fine-tuning evaluation

| Metric / benchmark | Type | Use |
| --- | --- | --- |
| eval loss | Metric | Prediction loss on held-out text |
| Perplexity (PPL) | Metric | `PPL = exp(eval_loss)`; lower usually means better prediction on eval text |
| MMLU / GSM8K | Benchmark | Check whether fine-tuning degraded general ability |
| manual prompt set | Task eval | Compare baseline, checkpoint, and final adapter outputs directly |

Lower PPL does not automatically mean answers are more helpful or more factual. Pair it with task tests, manual review, and benchmarks.

### Retrieval evaluation

| Metric | Use |
| --- | --- |
| Recall@k | Whether relevant documents appear in top-k |
| Hit Rate@k | Whether a query hits at least one relevant result |

Hybrid retrieval should compare vector-only, keyword-only, and hybrid methods.
