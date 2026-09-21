# RAG Must Respect Current Access / Decision Guide

By Yasir Sharfi

## The Idea

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

## Visual Blueprint

1. **Permission-filtered index**: Use supported access filters when the index can accurately represent the policy.
2. **Trade-off / Permission-filtered index**: Policy synchronization and revocation delay remain part of the security contract.
3. **Authoritative access check**: Recheck candidate documents when current permissions cannot be trusted solely from index metadata.
4. **Trade-off / Authoritative access check**: Extra lookups add latency, but skipping them can expose private evidence.
5. **Public-only corpus**: Use public content when the product does not need private retrieval.
6. **Trade-off / Public-only corpus**: Public documents can still contain misleading instructions; they are not trusted control messages.

## Caption

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

1. Permission-filtered index
Use supported access filters when the index can accurately represent the policy.

2. Trade-off / Permission-filtered index
Policy synchronization and revocation delay remain part of the security contract.

3. Authoritative access check
Recheck candidate documents when current permissions cannot be trusted solely from index metadata.

4. Trade-off / Authoritative access check
Extra lookups add latency, but skipping them can expose private evidence.

5. Public-only corpus
Use public content when the product does not need private retrieval.

6. Trade-off / Public-only corpus
Public documents can still contain misleading instructions; they are not trusted control messages.

The takeaway: Authorization belongs before context exposure, not only after answer generation.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #authorization

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A model should never receive a document the user is not allowed to read.

- **0:06-0:11** / Reveal step 1: Permission-filtered index
  Narration: Use supported access filters when the index can accurately represent the policy.

- **0:11-0:16** / Reveal step 2: Trade-off / Permission-filtered index
  Narration: Policy synchronization and revocation delay remain part of the security contract.

- **0:16-0:22** / Reveal step 3: Authoritative access check
  Narration: Recheck candidate documents when current permissions cannot be trusted solely from index metadata.

- **0:22-0:27** / Reveal step 4: Trade-off / Authoritative access check
  Narration: Extra lookups add latency, but skipping them can expose private evidence.

- **0:27-0:32** / Reveal step 5: Public-only corpus
  Narration: Use public content when the product does not need private retrieval.

- **0:32-0:38** / Reveal step 6: Trade-off / Public-only corpus
  Narration: Public documents can still contain misleading instructions; they are not trusted control messages.

- **0:38-0:45** / Takeaway and discussion prompt
  Narration: Authorization belongs before context exposure, not only after answer generation. Which constraint would change your choice?

## References

- [OWASP LLM application security](https://genai.owasp.org/llm-top-10/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
