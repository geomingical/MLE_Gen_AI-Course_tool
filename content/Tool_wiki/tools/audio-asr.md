# Audio and ASR: Whisper and faster-whisper

## 中文

### What it is
Whisper 是 OpenAI 的 speech-to-text model；faster-whisper 是使用 CTranslate2 的高效實作。Class3 voice agent HW 使用 Whisper，Class2 HW 也有 ASR 任務。

### Problem it solves
它們把語音轉成文字，讓 voice agent、會議紀錄、YouTube talk transcription 或 multimodal data pipeline 可以接到 LLM。

### When to use it
需要本地或批次轉錄音訊時使用。Whisper 適合快速上手；faster-whisper 適合速度與資源效率更重要的情境。

### When not to use it
如果需要 speaker diarization、即時低延遲、多語言高精度或企業級語音服務，可能需要額外工具或商用 ASR。

### Strengths
- Whisper 品質穩定，社群資源多。
- faster-whisper 推論效率較好。
- 能直接接入 LLM/agent pipeline。

### Weaknesses and failure modes
- 口音、背景噪音、音樂、重疊講話會降低品質。
- 大模型慢且吃資源。
- 轉錄文字可能需要 punctuation、timestamp、speaker 標註後處理。

### Minimal Python example
```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("audio.mp3")
print(result["text"])
```

### Course mapping
Class3 voice agent HW and Class2 HW ASR/transcription task.

### Related tools
yt-dlp, FastAPI, TTS tools, OpenAI audio APIs.

### Practical notes
保存 segments/timestamps 比只保存純文字更有用，後續可做 citation、剪輯或錯誤定位。

## English

### What it is
Whisper is OpenAI's speech-to-text model. faster-whisper is an efficient implementation using CTranslate2. Class3 voice agent HW uses Whisper, and Class2 HW includes ASR tasks.

### Problem it solves
They convert speech into text so voice agents, meeting notes, YouTube talk transcription, or multimodal data pipelines can connect to LLMs.

### When to use it
Use it for local or batch audio transcription. Whisper is good for quick adoption; faster-whisper is better when speed and resource efficiency matter.

### When not to use it
If you need speaker diarization, real-time low latency, very high multilingual accuracy, or enterprise speech service features, you may need additional tools or commercial ASR.

### Strengths
- Whisper quality is stable and widely supported.
- faster-whisper improves inference efficiency.
- Fits LLM/agent pipelines directly.

### Weaknesses and failure modes
- Accents, noise, music, and overlapping speech reduce quality.
- Large models are slow and resource-heavy.
- Transcripts may need punctuation, timestamps, and speaker-label post-processing.

### Minimal Python example
```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("audio.mp3")
print(result["text"])
```

### Course mapping
Class3 voice agent HW and Class2 HW ASR/transcription task.

### Related tools
yt-dlp, FastAPI, TTS tools, OpenAI audio APIs.

### Practical notes
Saving segments and timestamps is more useful than saving only plain text because later workflows can cite, edit, and debug specific audio spans.

### References
- https://github.com/openai/whisper
- https://github.com/SYSTRAN/faster-whisper
