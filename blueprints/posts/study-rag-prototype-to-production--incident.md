# RAG: From Prototype to a Defensible System / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

## Visual Blueprint

1. **Trap 1**: Tuning on a few favorite demo questions.
2. **Counter-check 1**: Sources, chunks, prompts, and models are versioned.
3. **Trap 2**: Sending unauthorized passages to a model and filtering only afterward.
4. **Counter-check 2**: Retrieval and answer quality are evaluated separately.
5. **Trap 3**: Treating source updates and deletions as optional index maintenance.
6. **Counter-check 3**: Permissions are enforced before context construction.

## Caption

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

1. Trap 1
Tuning on a few favorite demo questions.

2. Counter-check 1
Sources, chunks, prompts, and models are versioned.

3. Trap 2
Sending unauthorized passages to a model and filtering only afterward.

4. Counter-check 2
Retrieval and answer quality are evaluated separately.

5. Trap 3
Treating source updates and deletions as optional index maintenance.

6. Counter-check 3
Permissions are enforced before context construction.

The takeaway: Start with a small corpus you are allowed to publish or process.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #rag #prototype

## Reel Storyboard

Suggested duration: about 31 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Does RAG eliminate hallucinations?

- **0:03-0:06** / Reveal step 1: Trap 1
  Narration: Tuning on a few favorite demo questions.

- **0:06-0:09** / Reveal step 2: Counter-check 1
  Narration: Sources, chunks, prompts, and models are versioned.

- **0:09-0:13** / Reveal step 3: Trap 2
  Narration: Sending unauthorized passages to a model and filtering only afterward.

- **0:13-0:16** / Reveal step 4: Counter-check 2
  Narration: Retrieval and answer quality are evaluated separately.

- **0:16-0:20** / Reveal step 5: Trap 3
  Narration: Treating source updates and deletions as optional index maintenance.

- **0:20-0:23** / Reveal step 6: Counter-check 3
  Narration: Permissions are enforced before context construction.

- **0:23-0:31** / Takeaway and discussion prompt
  Narration: Start with a small corpus you are allowed to publish or process. What evidence would disprove your first diagnosis?

## References

- [RAG: From Prototype to a Defensible System / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rag-prototype-to-production)
- [Azure RAG design and evaluation](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide)
- [Google embeddings introduction](https://developers.google.com/machine-learning/crash-course/embeddings)
- [OWASP GenAI Security Project](https://genai.owasp.org/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
