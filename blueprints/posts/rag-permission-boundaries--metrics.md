# RAG Must Respect Current Access / Metrics That Matter

By Yasir Sharfi

## The Idea

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

## Visual Blueprint

1. **Unauthorized-context tests**: Measure coverage of negative authorization fixtures in retrieval and prompt assembly.
2. **Interpret / Unauthorized-context tests**: A safe final answer does not excuse sending unauthorized documents to the model.
3. **Revocation delay**: Measure time until permission changes affect retrieval, caches, and citations.
4. **Interpret / Revocation delay**: Conversation history can retain earlier private context unless lifecycle rules handle it.
5. **Context provenance**: Record safe document identities and versions used for a response.
6. **Interpret / Context provenance**: Avoid logging private text merely to establish which sources were used.

## Caption

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

1. Unauthorized-context tests
Measure coverage of negative authorization fixtures in retrieval and prompt assembly.

2. Interpret / Unauthorized-context tests
A safe final answer does not excuse sending unauthorized documents to the model.

3. Revocation delay
Measure time until permission changes affect retrieval, caches, and citations.

4. Interpret / Revocation delay
Conversation history can retain earlier private context unless lifecycle rules handle it.

5. Context provenance
Record safe document identities and versions used for a response.

6. Interpret / Context provenance
Avoid logging private text merely to establish which sources were used.

The takeaway: Authorization belongs before context exposure, not only after answer generation.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #authorization

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A model should never receive a document the user is not allowed to read.

- **0:06-0:11** / Reveal step 1: Unauthorized-context tests
  Narration: Measure coverage of negative authorization fixtures in retrieval and prompt assembly.

- **0:11-0:17** / Reveal step 2: Interpret / Unauthorized-context tests
  Narration: A safe final answer does not excuse sending unauthorized documents to the model.

- **0:17-0:21** / Reveal step 3: Revocation delay
  Narration: Measure time until permission changes affect retrieval, caches, and citations.

- **0:21-0:26** / Reveal step 4: Interpret / Revocation delay
  Narration: Conversation history can retain earlier private context unless lifecycle rules handle it.

- **0:26-0:30** / Reveal step 5: Context provenance
  Narration: Record safe document identities and versions used for a response.

- **0:30-0:35** / Reveal step 6: Interpret / Context provenance
  Narration: Avoid logging private text merely to establish which sources were used.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Authorization belongs before context exposure, not only after answer generation. Which metric could look healthy while users suffer?

## References

- [OWASP LLM application security](https://genai.owasp.org/llm-top-10/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
