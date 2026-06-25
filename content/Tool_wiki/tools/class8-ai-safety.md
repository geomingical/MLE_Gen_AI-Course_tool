# Class8 AI Safety / AI 安全（幻覺、Jailbreak、偏見與防護）

## 中文

Class8 的主線是用真實 API 呼叫，動手觀察 LLM 的四類安全問題，再把對應的偵測與防護做成可重用的 pipeline：幻覺（hallucination）、越獄（jailbreak）、偏見/倫理（bias），以及把這些檢查串起來的 safety filter。重點不是某個套件，而是「如何在 request 前後加上防護層」與「如何用測試集量化失敗率」。

### Course-covered safety areas

| Area | What you test | Detection / defense |
| --- | --- | --- |
| Hallucination | 模型是否自信地產生假資訊（假歷史、假論文、假統計）| factual verification、citation 驗證、confidence scoring |
| Jailbreak | 是否能繞過安全限制（DAN、roleplay、翻譯繞道、情緒操弄）| jailbreak pattern 偵測、分層 safety filter |
| Bias / Ethics | 性別、文化、族群刻板印象 | bias scoring、fairness 分析（fairlearn / AIF360）|
| Safety pipeline | 把上述檢查串成 request 前後的防護 | pre/post filtering、moderation、logging 與風險評分 |

### Supporting pieces

| Piece | Role |
| --- | --- |
| Safety wrapper（pre/post filter）| 在呼叫模型前後攔截 prompt 與 response，做封鎖、改寫或標記 |
| Detector classes | FactualVerifier、JailbreakDetector、BiasDetector 等以 pattern/規則為主的偵測器 |
| Moderation / sanitization | OpenAI moderation、輸入淨化（如 bleach）作為第一道過濾 |
| Test suites | 設計好的 hallucination/jailbreak prompt 集，用來量化 block rate 與 detection rate |

### Learning order

1. 先用真實 prompt 觀察模型「會錯成什麼樣子」，建立對失敗模式的直覺。
2. 把每一類問題對應到一個可量化的測試集（成功觸發率、封鎖率、偵測率）。
3. 學會在 request 前做輸入過濾、在 response 後做輸出檢查的分層防護。
4. 把偵測器組成 safety wrapper，回傳結構化的安全 metadata（風險分數、違規類別）。
5. 加上 logging 與統計，定期回看 block rate / detection rate 是否退步。
6. 理解防護是持續演進的：新 jailbreak 會出現，規則型偵測需要不斷更新。

### Common confusion

- 規則型偵測（regex/keyword）會有 false positive 與 false negative；它是一層防護，不是保證。
- Jailbreak 測試是為了「防禦理解」，不是攻擊工具；用途與授權範圍要清楚。
- 模型自己的 moderation 不等於完整 safety；仍需 application 層的 pre/post 檢查與人工審核。
- 「沒有觸發偵測」不代表安全，可能只是測試集沒覆蓋到該攻擊模式。
- Bias 偵測會輸出分數，但分數本身有偏差與侷限；要搭配人工判讀與情境理解。

## English

Class8 uses real API calls to observe four classes of LLM safety problems hands-on, then turns the matching detection and defense into a reusable pipeline: hallucinations, jailbreaks, bias/ethics, and the safety filter that stitches those checks together. The point is not a specific package but how to add a protection layer before and after a request, and how to quantify failure rates with test sets.

### Course-covered safety areas

| Area | What you test | Detection / defense |
| --- | --- | --- |
| Hallucination | Whether the model confidently produces false info (fake history, papers, statistics) | Factual verification, citation validation, confidence scoring |
| Jailbreak | Whether safety limits can be bypassed (DAN, roleplay, translation bypass, emotional manipulation) | Jailbreak pattern detection, layered safety filter |
| Bias / Ethics | Gender, cultural, and demographic stereotyping | Bias scoring, fairness analysis (fairlearn / AIF360) |
| Safety pipeline | Wiring the checks into pre/post request protection | Pre/post filtering, moderation, logging, and risk scoring |

### Supporting pieces

| Piece | Role |
| --- | --- |
| Safety wrapper (pre/post filter) | Intercepts prompts and responses around the model call to block, rewrite, or flag |
| Detector classes | FactualVerifier, JailbreakDetector, BiasDetector—mostly pattern/rule-based detectors |
| Moderation / sanitization | OpenAI moderation and input sanitization (e.g. bleach) as a first filter |
| Test suites | Curated hallucination/jailbreak prompt sets used to quantify block and detection rates |

### Learning order

1. Use real prompts first to see *how* the model fails and build intuition for failure modes.
2. Map each problem class to a quantifiable test set (trigger rate, block rate, detection rate).
3. Learn layered defense: input filtering before the request, output checks after the response.
4. Compose detectors into a safety wrapper that returns structured safety metadata (risk score, violation type).
5. Add logging and statistics, and review whether block/detection rates regress over time.
6. Understand that protection is continuously evolving: new jailbreaks appear, and rule-based detectors need constant updates.

### Common confusion

- Rule-based detection (regex/keyword) has false positives and false negatives; it is one layer, not a guarantee.
- Jailbreak testing is for defensive understanding, not an attack tool; purpose and authorization must be clear.
- The model's own moderation is not full safety; you still need application-layer pre/post checks and human review.
- "No detection triggered" does not mean safe—the test set may simply not cover that attack pattern.
- Bias detectors output scores, but those scores have their own biases and limits; pair them with human judgment and context.
