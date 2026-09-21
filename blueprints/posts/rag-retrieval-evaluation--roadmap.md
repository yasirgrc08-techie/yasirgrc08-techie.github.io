# RAG Starts With Retrieval Evidence / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

## Visual Blueprint

1. **Define useful questions**: Build representative query classes and label which evidence supports each answer.
2. **Establish a lexical baseline**: Measure a simple retrieval approach before adding embeddings or reranking.
3. **Choose chunk boundaries**: Preserve meaning and metadata while respecting retrieval and context limits.
4. **Evaluate candidate retrieval**: Compare relevance, missing evidence, latency, and cost on held-out queries.
5. **Add generation carefully**: Require grounded answers and explicit handling when evidence is insufficient.
6. **Version the experiment**: Record corpus, chunking, model, prompts, and evaluation labels for reproducibility.

## Caption

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

1. Define useful questions
Build representative query classes and label which evidence supports each answer.

2. Establish a lexical baseline
Measure a simple retrieval approach before adding embeddings or reranking.

3. Choose chunk boundaries
Preserve meaning and metadata while respecting retrieval and context limits.

4. Evaluate candidate retrieval
Compare relevance, missing evidence, latency, and cost on held-out queries.

5. Add generation carefully
Require grounded answers and explicit handling when evidence is insufficient.

6. Version the experiment
Record corpus, chunking, model, prompts, and evaluation labels for reproducibility.

The takeaway: Evaluate evidence retrieval before treating a bigger model as the default fix.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #retrieval

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A fluent answer cannot repair evidence that retrieval never found.

- **0:04-0:09** / Reveal step 1: Define useful questions
  Narration: Build representative query classes and label which evidence supports each answer.

- **0:09-0:13** / Reveal step 2: Establish a lexical baseline
  Narration: Measure a simple retrieval approach before adding embeddings or reranking.

- **0:13-0:17** / Reveal step 3: Choose chunk boundaries
  Narration: Preserve meaning and metadata while respecting retrieval and context limits.

- **0:17-0:21** / Reveal step 4: Evaluate candidate retrieval
  Narration: Compare relevance, missing evidence, latency, and cost on held-out queries.

- **0:21-0:25** / Reveal step 5: Add generation carefully
  Narration: Require grounded answers and explicit handling when evidence is insufficient.

- **0:25-0:29** / Reveal step 6: Version the experiment
  Narration: Record corpus, chunking, model, prompts, and evaluation labels for reproducibility.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: Evaluate evidence retrieval before treating a bigger model as the default fix. Which bottleneck would you measure first?

## References

- [Azure AI Search RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
