# RAG Starts With Retrieval Evidence / Decision Guide

By Yasir Sharfi

## The Idea

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

## Visual Blueprint

1. **Lexical retrieval**: Use lexical search when exact terms, identifiers, and predictable matching are important.
2. **Trade-off / Lexical retrieval**: Vocabulary mismatch can miss relevant evidence even when the concept is related.
3. **Vector retrieval**: Use embeddings when semantic similarity helps on the actual query set.
4. **Trade-off / Vector retrieval**: Similarity is not truth, permission, or proof that a document answers the question.
5. **Hybrid plus reranking**: Combine approaches when measured quality gains justify extra latency and cost.
6. **Trade-off / Hybrid plus reranking**: More stages create more failure and tuning surfaces; compare against the simpler baseline.

## Caption

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

1. Lexical retrieval
Use lexical search when exact terms, identifiers, and predictable matching are important.

2. Trade-off / Lexical retrieval
Vocabulary mismatch can miss relevant evidence even when the concept is related.

3. Vector retrieval
Use embeddings when semantic similarity helps on the actual query set.

4. Trade-off / Vector retrieval
Similarity is not truth, permission, or proof that a document answers the question.

5. Hybrid plus reranking
Combine approaches when measured quality gains justify extra latency and cost.

6. Trade-off / Hybrid plus reranking
More stages create more failure and tuning surfaces; compare against the simpler baseline.

The takeaway: Evaluate evidence retrieval before treating a bigger model as the default fix.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #retrieval

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A fluent answer cannot repair evidence that retrieval never found.

- **0:04-0:09** / Reveal step 1: Lexical retrieval
  Narration: Use lexical search when exact terms, identifiers, and predictable matching are important.

- **0:09-0:14** / Reveal step 2: Trade-off / Lexical retrieval
  Narration: Vocabulary mismatch can miss relevant evidence even when the concept is related.

- **0:14-0:19** / Reveal step 3: Vector retrieval
  Narration: Use embeddings when semantic similarity helps on the actual query set.

- **0:19-0:25** / Reveal step 4: Trade-off / Vector retrieval
  Narration: Similarity is not truth, permission, or proof that a document answers the question.

- **0:25-0:30** / Reveal step 5: Hybrid plus reranking
  Narration: Combine approaches when measured quality gains justify extra latency and cost.

- **0:30-0:36** / Reveal step 6: Trade-off / Hybrid plus reranking
  Narration: More stages create more failure and tuning surfaces; compare against the simpler baseline.

- **0:36-0:44** / Takeaway and discussion prompt
  Narration: Evaluate evidence retrieval before treating a bigger model as the default fix. Which constraint would change your choice?

## References

- [Azure AI Search RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
