# FastAPI

## 中文

### What it is
FastAPI 是 Python web API framework。Class3 voice agent code 使用它接收 audio upload、呼叫 ASR/LLM/TTS，並回傳結果。

### Problem it solves
它把 notebook 或 script 中的 pipeline 包成 HTTP service，讓前端、測試 client 或其他 agent 可以呼叫。

### When to use it
當你的 ML/LLM pipeline 需要 upload endpoint、JSON API、demo server、或簡單 backend 時使用。

### When not to use it
如果只是一次性 notebook 實驗，不需要 API。若 production 需要 auth、logging、queue、scaling，需要額外架構，不是只有 FastAPI。

### Strengths
- Python-native，容易包 ML code。
- 型別提示與 automatic docs 友善。
- 適合 demo 和小型服務。

### Weaknesses and failure modes
- 長任務、GPU 任務、檔案處理需要小心 timeout 和 background task。
- API 正常不代表 pipeline 結果正確。
- production 需要部署、監控、安全設定。

### Minimal Python example
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
```

### Course mapping
Class3 voice agent implementation.

### Related tools
uvicorn, requests, Whisper, OpenAI SDK, TTS.

### Practical notes
把 ASR、LLM、TTS 拆成可測試函式，再由 FastAPI endpoint 串接，不要把所有邏輯都寫在 route 裡。

## English

### What it is
FastAPI is a Python web API framework. Class3 voice agent code uses it to receive audio uploads, call ASR/LLM/TTS, and return results.

### Problem it solves
It wraps a notebook or script pipeline into an HTTP service so frontends, test clients, or other agents can call it.

### When to use it
Use it when your ML/LLM pipeline needs upload endpoints, JSON APIs, demo servers, or a simple backend.

### When not to use it
For one-off notebook experiments, an API is unnecessary. For production with auth, logging, queues, and scaling, FastAPI alone is not enough.

### Strengths
- Python-native and easy to wrap ML code with.
- Friendly type hints and automatic docs.
- Good for demos and small services.

### Weaknesses and failure modes
- Long-running tasks, GPU work, and file handling require timeout/background-task care.
- A working API does not imply correct pipeline output.
- Production requires deployment, monitoring, and security configuration.

### Minimal Python example
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
```

### Course mapping
Class3 voice agent implementation.

### Related tools
uvicorn, requests, Whisper, OpenAI SDK, TTS.

### Practical notes
Keep ASR, LLM, and TTS as testable functions, then compose them in the FastAPI endpoint. Do not put all logic inside the route.

### References
- https://fastapi.tiangolo.com/
