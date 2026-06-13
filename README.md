# MLE Gen AI Course Tool Reference

Bilingual static reference site for tools used in `Machine Learning Engineer in the Generative AI Era`, focused on Class1-Class6 and curated extensions.

## Static Site

Live site: https://geomingical.github.io/MLE_Gen_AI-Course_tool/

Repository: https://github.com/geomingical/MLE_Gen_AI-Course_tool

## What This Covers

This site is designed as a learner-facing tool reference, not a generic package list. It organizes course tools and extensions by workflow:

- Prompting/API
- Local inference
- Data collection
- Document extraction
- Audio/voice
- Cleaning/deduplication
- RAG/search
- SFT dataset engineering
- Fine-tuning/SFT
- Tool/plugin/protocol layer
- Serving
- Evaluation

Each item is labeled by:

- `Status`: Course-covered, Supplemental, or Extension
- `Type`: package, library, framework, runtime, service, protocol, plugin, method, pattern, or workflow stack
- `Role`: what the item does in the pipeline
- `Learning level`: beginner, intermediate, or advanced
- `Stack`: the workflow it belongs to

## Content

The original markdown reference lives under `content/Tool_wiki/`. The interactive site uses structured data in `src/data/tools.ts` for search, filters, and detail panels.
