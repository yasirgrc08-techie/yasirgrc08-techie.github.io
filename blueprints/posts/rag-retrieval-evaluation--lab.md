# RAG Starts With Retrieval Evidence / Build and Validate

By Yasir Sharfi

## The Idea

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

## Visual Blueprint

1. **Create a small corpus**: Use public or synthetic documents and a versioned question set.
2. **Label supporting evidence**: Record the passages needed for each answer before tuning retrieval.
3. **Run a simple baseline**: Measure lexical retrieval with fixed parameters.
4. **Compare one alternative**: Test vector or hybrid retrieval under the same evaluation conditions.
5. **Test missing evidence**: Include questions the corpus cannot answer and check abstention behavior.
6. **Publish the evaluation**: Report per-query failures, quality, latency, cost, and dataset limitations.

## Caption

A fluent answer cannot repair evidence that retrieval never found.

Use an authorized document corpus and held-out questions. Evaluate retrieval and answer generation separately before tuning a whole pipeline blindly.

1. Create a small corpus
Use public or synthetic documents and a versioned question set.

2. Label supporting evidence
Record the passages needed for each answer before tuning retrieval.

3. Run a simple baseline
Measure lexical retrieval with fixed parameters.

4. Compare one alternative
Test vector or hybrid retrieval under the same evaluation conditions.

5. Test missing evidence
Include questions the corpus cannot answer and check abstention behavior.

6. Publish the evaluation
Report per-query failures, quality, latency, cost, and dataset limitations.

The takeaway: Evaluate evidence retrieval before treating a bigger model as the default fix.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #retrieval

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A fluent answer cannot repair evidence that retrieval never found.

- **0:04-0:08** / Reveal step 1: Create a small corpus
  Narration: Use public or synthetic documents and a versioned question set.

- **0:08-0:12** / Reveal step 2: Label supporting evidence
  Narration: Record the passages needed for each answer before tuning retrieval.

- **0:12-0:15** / Reveal step 3: Run a simple baseline
  Narration: Measure lexical retrieval with fixed parameters.

- **0:15-0:19** / Reveal step 4: Compare one alternative
  Narration: Test vector or hybrid retrieval under the same evaluation conditions.

- **0:19-0:23** / Reveal step 5: Test missing evidence
  Narration: Include questions the corpus cannot answer and check abstention behavior.

- **0:23-0:27** / Reveal step 6: Publish the evaluation
  Narration: Report per-query failures, quality, latency, cost, and dataset limitations.

- **0:27-0:35** / Takeaway and discussion prompt
  Narration: Evaluate evidence retrieval before treating a bigger model as the default fix. How would you reproduce this with synthetic data?

## References

- [Azure AI Search RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
