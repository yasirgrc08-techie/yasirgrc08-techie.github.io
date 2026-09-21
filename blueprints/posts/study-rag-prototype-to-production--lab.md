# RAG: From Prototype to a Defensible System / Build and Validate

By Yasir Sharfi

## The Idea

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

## Visual Blueprint

1. **Set up the scenario**: A policy document changes from version 1 to version 2. The assistant still answers using an old chunk and a cached response.
2. **Experiment 1**: Give source documents and chunks explicit versions, and record which versions support each answer.
3. **Experiment 2**: Filter or recheck retrieved chunks against current source eligibility before prompt construction.
4. **Experiment 3**: Re-index version 2, remove stale vectors and text according to retention policy, and rerun queries that distinguish the changed policy.
5. **Expected evidence**: New answers use eligible source versions even while background index cleanup is still converging.
6. **Check the result**: Can a stale replica still send a superseded private passage to the model?

## Caption

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

1. Set up the scenario
A policy document changes from version 1 to version 2. The assistant still answers using an old chunk and a cached response.

2. Experiment 1
Give source documents and chunks explicit versions, and record which versions support each answer.

3. Experiment 2
Filter or recheck retrieved chunks against current source eligibility before prompt construction.

4. Experiment 3
Re-index version 2, remove stale vectors and text according to retention policy, and rerun queries that distinguish the changed policy.

5. Expected evidence
New answers use eligible source versions even while background index cleanup is still converging.

6. Check the result
Can a stale replica still send a superseded private passage to the model?

The takeaway: Start with a small corpus you are allowed to publish or process.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #rag #prototype

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Does RAG eliminate hallucinations?

- **0:03-0:12** / Reveal step 1: Set up the scenario
  Narration: A policy document changes from version 1 to version 2. The assistant still answers using an old chunk and a cached response.

- **0:12-0:18** / Reveal step 2: Experiment 1
  Narration: Give source documents and chunks explicit versions, and record which versions support each answer.

- **0:18-0:23** / Reveal step 3: Experiment 2
  Narration: Filter or recheck retrieved chunks against current source eligibility before prompt construction.

- **0:23-0:31** / Reveal step 4: Experiment 3
  Narration: Re-index version 2, remove stale vectors and text according to retention policy, and rerun queries that distinguish the changed policy.

- **0:31-0:37** / Reveal step 5: Expected evidence
  Narration: New answers use eligible source versions even while background index cleanup is still converging.

- **0:37-0:43** / Reveal step 6: Check the result
  Narration: Can a stale replica still send a superseded private passage to the model?

- **0:43-0:51** / Takeaway and discussion prompt
  Narration: Start with a small corpus you are allowed to publish or process. How would you reproduce this with synthetic data?

## References

- [RAG: From Prototype to a Defensible System / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rag-prototype-to-production)
- [Azure RAG design and evaluation](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide)
- [Google embeddings introduction](https://developers.google.com/machine-learning/crash-course/embeddings)
- [OWASP GenAI Security Project](https://genai.owasp.org/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
