import { BookOpen, ExternalLink, Filter, Globe2, Search, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import { Language, Tool, ToolStatus, getToolMeta, pipelineHighlights, stages, statusOrder, tools } from "./data/tools";

const labels = {
  zh: {
    title: "MLE Gen AI 工具參考",
    subtitle: "Class1-Class4 課程工具、延伸 package、framework、plugin/protocol 的雙語工具書。",
    search: "搜尋工具、標籤或課程",
    status: "狀態",
    stage: "技術流",
    type: "類型",
    level: "程度",
    all: "全部",
    catalog: "工具目錄",
    pipeline: "技術流",
    details: "工具頁",
    useWhen: "何時使用",
    avoidWhen: "何時不要用",
    notes: "實務筆記",
    course: "課程對應",
    role: "Pipeline 角色",
    abstraction: "層級",
    stack: "所屬 stack",
    learnerNote: "學習者提示",
    tags: "標籤",
    markdown: "Markdown 原文",
    count: "個項目",
    source: "原始內容保留在 content/Tool_wiki；此頁提供查詢和決策入口。",
  },
  en: {
    title: "MLE Gen AI Tool Reference",
    subtitle: "Bilingual reference for Class1-Class4 tools, extensions, frameworks, plugins, and protocols.",
    search: "Search tools, tags, or course",
    status: "Status",
    stage: "Workflow",
    type: "Type",
    level: "Level",
    all: "All",
    catalog: "Catalog",
    pipeline: "Pipeline",
    details: "Tool page",
    useWhen: "When to use",
    avoidWhen: "When not to use",
    notes: "Practical notes",
    course: "Course mapping",
    role: "Pipeline role",
    abstraction: "Abstraction level",
    stack: "Stack",
    learnerNote: "Learner note",
    tags: "Tags",
    markdown: "Markdown source",
    count: "items",
    source: "Original content is preserved in content/Tool_wiki; this site is the lookup and decision layer.",
  },
} as const;

const statusClass: Record<ToolStatus, string> = {
  "Course-covered": "statusCourse",
  Supplemental: "statusSupplemental",
  Extension: "statusExtension",
};

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function matches(tool: Tool, query: string, status: string, stage: string, itemType: string, level: string): boolean {
  const meta = getToolMeta(tool);
  const q = query.trim().toLowerCase();
  const haystack = [
    tool.name,
    tool.category,
    tool.stage,
    tool.status,
    tool.course,
    meta.itemType,
    meta.role,
    meta.abstractionLevel,
    meta.learningLevel,
    meta.stack,
    meta.learnerNote.zh,
    meta.learnerNote.en,
    ...tool.tags,
    tool.zh.summary,
    tool.en.summary,
  ]
    .join(" ")
    .toLowerCase();

  return (
    (!q || haystack.includes(q)) &&
    (status === "all" || tool.status === status) &&
    (stage === "all" || tool.stage === stage) &&
    (itemType === "all" || meta.itemType === itemType) &&
    (level === "all" || meta.learningLevel === level)
  );
}

export function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [stage, setStage] = useState<string>("all");
  const [itemType, setItemType] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [selectedId, setSelectedId] = useState("openai-sdk");
  const t = labels[language];

  const categories = useMemo(() => unique(tools.map((tool) => tool.category)).sort(), []);
  const itemTypes = useMemo(() => unique(tools.map((tool) => getToolMeta(tool).itemType)).sort(), []);
  const levels = useMemo(() => unique(tools.map((tool) => getToolMeta(tool).learningLevel)).sort(), []);
  const filtered = useMemo(() => tools.filter((tool) => matches(tool, query, status, stage, itemType, level)), [query, status, stage, itemType, level]);
  const selected = tools.find((tool) => tool.id === selectedId) ?? filtered[0] ?? tools[0];
  const selectedMeta = getToolMeta(selected);

  return (
    <main className="appShell">
      <section className="topBar">
        <div>
          <div className="eyebrow">MLE in the Generative AI Era</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <button className="languageButton" onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>
          <Globe2 size={18} />
          {language === "zh" ? "English" : "中文"}
        </button>
      </section>

      <section className="controlBand" aria-label="Filters">
        <label className="searchBox">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
        </label>
        <label className="selectBox">
          <Filter size={18} />
          <span>{t.status}</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">{t.all}</option>
            {statusOrder.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="selectBox">
          <Workflow size={18} />
          <span>{t.stage}</span>
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            <option value="all">{t.all}</option>
            {stages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="selectBox">
          <Filter size={18} />
          <span>{t.type}</span>
          <select value={itemType} onChange={(event) => setItemType(event.target.value)}>
            <option value="all">{t.all}</option>
            {itemTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="selectBox">
          <Filter size={18} />
          <span>{t.level}</span>
          <select value={level} onChange={(event) => setLevel(event.target.value)}>
            <option value="all">{t.all}</option>
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="layoutGrid">
        <aside className="catalogPane">
          <div className="paneHeader">
            <h2>{t.catalog}</h2>
            <span>
              {filtered.length} {t.count}
            </span>
          </div>
          <div className="toolList">
            {filtered.map((tool) => (
              <button
                className={`toolRow ${tool.id === selected.id ? "active" : ""}`}
                key={tool.id}
                onClick={() => setSelectedId(tool.id)}
              >
                <span className="toolName">{tool.name}</span>
                <span className={`statusBadge ${statusClass[tool.status]}`}>{tool.status}</span>
                <span className="typeBadge">{getToolMeta(tool).itemType}</span>
                <span className="toolMeta">
                  {getToolMeta(tool).role} · {tool.course}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="detailPane">
          <div className="detailHeader">
            <div>
              <h2>{selected.name}</h2>
              <div className="detailMeta">
                <span className={`statusBadge ${statusClass[selected.status]}`}>{selected.status}</span>
                <span className="typeBadge">{selectedMeta.itemType}</span>
                <span className="typeBadge">{selectedMeta.learningLevel}</span>
                <span>{selected.category}</span>
                <span>{selected.stage}</span>
              </div>
            </div>
            <a className="sourceLink" href={selected.page}>
              <BookOpen size={17} />
              {t.markdown}
              <ExternalLink size={14} />
            </a>
          </div>

          <p className="summary">{selected[language].summary}</p>

          <div className="infoGrid">
            <article>
              <h3>{t.role}</h3>
              <p>{selectedMeta.role}</p>
            </article>
            <article>
              <h3>{t.abstraction}</h3>
              <p>{selectedMeta.abstractionLevel}</p>
            </article>
            <article>
              <h3>{t.stack}</h3>
              <p>{selectedMeta.stack}</p>
            </article>
            <article>
              <h3>{t.learnerNote}</h3>
              <p>{selectedMeta.learnerNote[language]}</p>
            </article>
            <article>
              <h3>{t.useWhen}</h3>
              <p>{selected[language].useWhen}</p>
            </article>
            <article>
              <h3>{t.avoidWhen}</h3>
              <p>{selected[language].avoidWhen}</p>
            </article>
            <article>
              <h3>{t.notes}</h3>
              <p>{selected[language].notes}</p>
            </article>
            <article>
              <h3>{t.course}</h3>
              <p>{selected.course}</p>
            </article>
          </div>

          <div className="tagsBlock">
            <h3>{t.tags}</h3>
            <div className="tags">
              {selected.tags.map((tag) => (
                <button key={tag} onClick={() => setQuery(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="overviewGrid">
        <article className="overviewPanel">
          <h2>{t.pipeline}</h2>
          <div className="pipelineList">
            {pipelineHighlights.map((item) => (
              <div key={item.stage} className="pipelineItem">
                <strong>{item.stage}</strong>
                <p>{item[language]}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="overviewPanel">
          <h2>{language === "zh" ? "類別索引" : "Category Index"}</h2>
          <div className="categoryGrid">
            {categories.map((category) => {
              const count = tools.filter((tool) => tool.category === category).length;
              return (
                <button key={category} onClick={() => setQuery(category)}>
                  <span>{category}</span>
                  <strong>{count}</strong>
                </button>
              );
            })}
          </div>
        </article>
      </section>

      <footer>
        <span>{t.source}</span>
      </footer>
    </main>
  );
}
