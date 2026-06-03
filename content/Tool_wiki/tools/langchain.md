# LangChain Prompting and LCEL

## 中文

### What it is
LangChain 是 LLM application framework。Class1 HW 使用 PromptTemplate、output parser、RunnablePassthrough、ChatOllama 和 LCEL；Class4 使用 LangChain loaders、splitters、vectorstores 與 RetrievalQA。

### Problem it solves
它把 prompt、模型、retriever、parser 和 chain 用可組合的方式串起來，降低從 notebook demo 走向 pipeline 的摩擦。

### When to use it
當流程已經超過單一 API call，例如 prompt template + model + parser、或 RAG chain，需要可組合的抽象時使用。

### When not to use it
如果只是一次簡單 API call，LangChain 可能太重。若你不理解每個 component 的 input/output，chain 也會讓 debugging 更困難。

### Strengths
- 很多 integration。
- LCEL 讓 chain 組合清楚。
- 適合教學與 prototype。

### Weaknesses and failure modes
- 版本變動快，舊 import path 常失效。
- 抽象層多，錯誤訊息可能離真正問題很遠。
- 容易把 retrieval、prompt、generation 的問題混在一起。

### Minimal Python example
```python
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = PromptTemplate.from_template("Explain {topic} in two sentences.")
chain = prompt | llm | StrOutputParser()
answer = chain.invoke({"topic": "RAG"})
```

### Course mapping
Class1 HW introduces prompt templates and LCEL. Class4 uses LangChain for RAG components.

### Related tools
OpenAI SDK, Ollama, LlamaIndex, FAISS, sentence-transformers.

### Practical notes
Record package versions when running notebooks. Many LangChain examples from older tutorials use deprecated imports.

## English

### What it is
LangChain is an LLM application framework. Class1 HW uses PromptTemplate, output parsers, RunnablePassthrough, ChatOllama, and LCEL. Class4 uses LangChain loaders, splitters, vectorstores, and RetrievalQA.

### Problem it solves
It composes prompts, models, retrievers, parsers, and chains, reducing friction when moving from a single notebook call to a reusable pipeline.

### When to use it
Use it when your workflow is more than one API call, such as prompt template + model + parser, or a RAG chain that needs composable components.

### When not to use it
If you only need a simple API call, LangChain may be heavier than needed. If you do not understand each component's input/output, chains can make debugging harder.

### Strengths
- Large integration ecosystem.
- LCEL makes chain composition explicit.
- Useful for teaching and prototyping.

### Weaknesses and failure modes
- Fast version churn; old import paths often break.
- Multiple abstraction layers can hide the real error.
- It is easy to mix retrieval, prompt, and generation problems together.

### Minimal Python example
```python
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = PromptTemplate.from_template("Explain {topic} in two sentences.")
chain = prompt | llm | StrOutputParser()
answer = chain.invoke({"topic": "RAG"})
```

### Course mapping
Class1 HW introduces prompt templates and LCEL. Class4 uses LangChain for RAG components.

### Related tools
OpenAI SDK, Ollama, LlamaIndex, FAISS, sentence-transformers.

### Practical notes
Record package versions when running notebooks. Many LangChain examples from older tutorials use deprecated imports.

### References
- https://python.langchain.com/docs/
