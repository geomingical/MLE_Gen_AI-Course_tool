# Extension: RAG Evaluation and Observability

## 中文

### Status
`Extension`: Class4 提到 RAG evaluation 概念；這頁把它擴成可長期查詢的工具書入口。

### What it is
RAG evaluation and observability 是用測試集、metrics、traces、span、人工標註與 LLM-as-judge 來回答：「這次錯是資料抽取、chunking、retrieval、reranking、prompt 還是 LLM 生成出錯？」

### What to measure

| 層級 | 要看什麼 | 常見工具 |
| --- | --- | --- |
| Source quality | OCR/extraction 是否正確、metadata 是否完整 | manual sample review, extraction reports |
| Retrieval | gold chunk 是否被找回、top-k 是否有噪音 | RAGAS, custom recall tests, Phoenix traces |
| Generation | answer 是否 grounded、是否引用錯來源 | RAGAS, DeepEval, manual rubric |
| System | latency、token cost、failure rate | LangSmith, Phoenix, Langfuse |
| Regression | 改 chunk size/model/prompt 後是否變好 | pytest-style evals, datasets, experiments |

### When to use it
只要 RAG 從 demo 走向可重複使用，就應加入 evaluation。沒有 evaluation，就無法知道換 embedding、加 reranker、改 prompt 是否真的改善。

### When not to use it
不要一開始就追求大量自動 metric。先建立小而高品質的 query set，加上人工判斷與失敗分類，再逐步自動化。

### Common tools
- RAGAS: RAG-specific evaluation metrics.
- DeepEval: pytest-like LLM evaluation workflow.
- Arize Phoenix: open-source tracing, evaluation, prompt experiments, RAG analysis.
- LangSmith: LangChain ecosystem tracing/evaluation.
- Langfuse: LLM observability and tracing.

### Course mapping
延伸 Class1 defects/observations 與 Class4 RAG evaluation。Class1 的「觀察失敗案例」可以升級成 formal eval set。

### Practical notes
最小可行 eval set 應包含：正常問題、找不到答案的問題、exact term 問題、跨文件問題、adversarial/ambiguous 問題。每題保存 expected evidence，不只保存 expected answer。

## English

### Status
`Extension`: Class4 mentions RAG evaluation concepts; this page expands them into a long-term reference entry.

### What it is
RAG evaluation and observability use test sets, metrics, traces, spans, human labels, and LLM-as-judge methods to answer: did this failure come from extraction, chunking, retrieval, reranking, prompting, or final LLM generation?

### What to measure

| Layer | What to inspect | Common tools |
| --- | --- | --- |
| Source quality | OCR/extraction correctness and metadata completeness | manual sample review, extraction reports |
| Retrieval | Whether gold chunks are retrieved and whether top-k is noisy | RAGAS, custom recall tests, Phoenix traces |
| Generation | Whether answers are grounded and cite the right sources | RAGAS, DeepEval, manual rubric |
| System | Latency, token cost, and failure rate | LangSmith, Phoenix, Langfuse |
| Regression | Whether chunk/model/prompt changes improve results | pytest-style evals, datasets, experiments |

### When to use it
As soon as RAG moves beyond a demo into reusable work, add evaluation. Without evaluation, you cannot know whether changing embeddings, adding rerankers, or modifying prompts improved the system.

### When not to use it
Do not start by chasing large automatic metric suites. First build a small high-quality query set with human judgment and failure taxonomy, then automate gradually.

### Common tools
- RAGAS: RAG-specific evaluation metrics.
- DeepEval: pytest-like LLM evaluation workflow.
- Arize Phoenix: open-source tracing, evaluation, prompt experiments, and RAG analysis.
- LangSmith: LangChain ecosystem tracing/evaluation.
- Langfuse: LLM observability and tracing.

### Course mapping
Extends Class1 defects/observations and Class4 RAG evaluation. The Class1 habit of observing failure cases can become a formal eval set.

### Practical notes
A minimal useful eval set should include normal questions, unanswerable questions, exact-term questions, cross-document questions, and adversarial/ambiguous questions. Store expected evidence, not only expected answers.

### References
- https://docs.ragas.io/
- https://docs.confident-ai.com/
- https://arize.com/docs/phoenix/
- https://docs.smith.langchain.com/
