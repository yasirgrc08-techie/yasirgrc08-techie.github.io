# RAG Must Respect Current Access / Failure and Recovery

By Yasir Sharfi

## The Idea

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

## Visual Blueprint

1. **Find an access mismatch**: A controlled test returns evidence or citations outside the caller's permissions.
2. **Contain private retrieval**: Restrict the affected path and follow the security incident process.
3. **Inspect context assembly**: Determine where unauthorized content entered candidates, cache, or model context.
4. **Repair policy propagation**: Fix filters and authoritative checks across all derived paths.
5. **Invalidate affected caches**: Remove outputs whose access scope or source version is no longer valid.
6. **Retest revoked access**: Use synthetic tenants and changed permissions across new and continuing conversations.

## Caption

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

1. Find an access mismatch
A controlled test returns evidence or citations outside the caller's permissions.

2. Contain private retrieval
Restrict the affected path and follow the security incident process.

3. Inspect context assembly
Determine where unauthorized content entered candidates, cache, or model context.

4. Repair policy propagation
Fix filters and authoritative checks across all derived paths.

5. Invalidate affected caches
Remove outputs whose access scope or source version is no longer valid.

6. Retest revoked access
Use synthetic tenants and changed permissions across new and continuing conversations.

The takeaway: Authorization belongs before context exposure, not only after answer generation.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #authorization

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A model should never receive a document the user is not allowed to read.

- **0:06-0:11** / Reveal step 1: Find an access mismatch
  Narration: A controlled test returns evidence or citations outside the caller's permissions.

- **0:11-0:15** / Reveal step 2: Contain private retrieval
  Narration: Restrict the affected path and follow the security incident process.

- **0:15-0:19** / Reveal step 3: Inspect context assembly
  Narration: Determine where unauthorized content entered candidates, cache, or model context.

- **0:19-0:23** / Reveal step 4: Repair policy propagation
  Narration: Fix filters and authoritative checks across all derived paths.

- **0:23-0:28** / Reveal step 5: Invalidate affected caches
  Narration: Remove outputs whose access scope or source version is no longer valid.

- **0:28-0:33** / Reveal step 6: Retest revoked access
  Narration: Use synthetic tenants and changed permissions across new and continuing conversations.

- **0:33-0:40** / Takeaway and discussion prompt
  Narration: Authorization belongs before context exposure, not only after answer generation. What evidence would disprove your first diagnosis?

## References

- [OWASP LLM application security](https://genai.owasp.org/llm-top-10/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
