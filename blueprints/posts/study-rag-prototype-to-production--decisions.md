# RAG: From Prototype to a Defensible System / Practice Decisions

By Yasir Sharfi

## The Idea

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

## Visual Blueprint

1. **Chunking is a document decision**: Preserve headings, table context, source IDs, versions, and permissions.
2. **Watch for**: Tuning on a few favorite demo questions.
3. **Retrieval and generation fail differently**: A wrong answer may result from missing evidence, poor ranking, incorrect filtering, truncated context, or unsupported generation. Inspect each stage.
4. **Watch for**: Sending unauthorized passages to a model and filtering only afterward.
5. **Authorization precedes generation**: Apply tenant and permission constraints during retrieval where possible and recheck current authorization before building context.
6. **Watch for**: Treating source updates and deletions as optional index maintenance.

## Caption

Does RAG eliminate hallucinations?

Retrieval-augmented generation selects external evidence and provides it to a model. It can improve freshness and grounding, but does not automatically prevent hallucinations or enforce authorization. A credible system has versioned sources, measured retrieval, supported citations, and explicit abstention and failure behavior.

1. Chunking is a document decision
Preserve headings, table context, source IDs, versions, and permissions.

2. Watch for
Tuning on a few favorite demo questions.

3. Retrieval and generation fail differently
A wrong answer may result from missing evidence, poor ranking, incorrect filtering, truncated context, or unsupported generation. Inspect each stage.

4. Watch for
Sending unauthorized passages to a model and filtering only afterward.

5. Authorization precedes generation
Apply tenant and permission constraints during retrieval where possible and recheck current authorization before building context.

6. Watch for
Treating source updates and deletions as optional index maintenance.

The takeaway: Start with a small corpus you are allowed to publish or process.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #rag #prototype

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Does RAG eliminate hallucinations?

- **0:03-0:07** / Reveal step 1: Chunking is a document decision
  Narration: Preserve headings, table context, source IDs, versions, and permissions.

- **0:07-0:10** / Reveal step 2: Watch for
  Narration: Tuning on a few favorite demo questions.

- **0:10-0:18** / Reveal step 3: Retrieval and generation fail differently
  Narration: A wrong answer may result from missing evidence, poor ranking, incorrect filtering, truncated context, or unsupported generation. Inspect each stage.

- **0:18-0:22** / Reveal step 4: Watch for
  Narration: Sending unauthorized passages to a model and filtering only afterward.

- **0:22-0:29** / Reveal step 5: Authorization precedes generation
  Narration: Apply tenant and permission constraints during retrieval where possible and recheck current authorization before building context.

- **0:29-0:33** / Reveal step 6: Watch for
  Narration: Treating source updates and deletions as optional index maintenance.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: Start with a small corpus you are allowed to publish or process. Which constraint would change your choice?

## References

- [RAG: From Prototype to a Defensible System / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rag-prototype-to-production)
- [Azure RAG design and evaluation](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide)
- [Google embeddings introduction](https://developers.google.com/machine-learning/crash-course/embeddings)
- [OWASP GenAI Security Project](https://genai.owasp.org/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
