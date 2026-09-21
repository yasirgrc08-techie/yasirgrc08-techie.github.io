# RAG Must Respect Current Access / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

## Visual Blueprint

1. **Bind the caller identity**: Use trusted server-side identity and current resource permissions.
2. **Scope candidate retrieval**: Filter retrieval by the authorization model before selecting private context.
3. **Verify context eligibility**: Check document versions and access before passing evidence to the model.
4. **Treat documents as data**: Do not let retrieved text override system rules or grant tool permissions.
5. **Protect caches and citations**: Scope answer caches and source links to the same user or tenant boundaries.
6. **Test revocation and follow-ups**: Verify that access changes take effect across conversation turns and derived outputs.

## Caption

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

1. Bind the caller identity
Use trusted server-side identity and current resource permissions.

2. Scope candidate retrieval
Filter retrieval by the authorization model before selecting private context.

3. Verify context eligibility
Check document versions and access before passing evidence to the model.

4. Treat documents as data
Do not let retrieved text override system rules or grant tool permissions.

5. Protect caches and citations
Scope answer caches and source links to the same user or tenant boundaries.

6. Test revocation and follow-ups
Verify that access changes take effect across conversation turns and derived outputs.

The takeaway: Authorization belongs before context exposure, not only after answer generation.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #authorization

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A model should never receive a document the user is not allowed to read.

- **0:06-0:10** / Reveal step 1: Bind the caller identity
  Narration: Use trusted server-side identity and current resource permissions.

- **0:10-0:14** / Reveal step 2: Scope candidate retrieval
  Narration: Filter retrieval by the authorization model before selecting private context.

- **0:14-0:19** / Reveal step 3: Verify context eligibility
  Narration: Check document versions and access before passing evidence to the model.

- **0:19-0:24** / Reveal step 4: Treat documents as data
  Narration: Do not let retrieved text override system rules or grant tool permissions.

- **0:24-0:30** / Reveal step 5: Protect caches and citations
  Narration: Scope answer caches and source links to the same user or tenant boundaries.

- **0:30-0:35** / Reveal step 6: Test revocation and follow-ups
  Narration: Verify that access changes take effect across conversation turns and derived outputs.

- **0:35-0:42** / Takeaway and discussion prompt
  Narration: Authorization belongs before context exposure, not only after answer generation. Which bottleneck would you measure first?

## References

- [OWASP LLM application security](https://genai.owasp.org/llm-top-10/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
