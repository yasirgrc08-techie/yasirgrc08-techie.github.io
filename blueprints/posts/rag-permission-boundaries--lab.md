# RAG Must Respect Current Access / Build and Validate

By Yasir Sharfi

## The Idea

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

## Visual Blueprint

1. **Create two synthetic tenants**: Give each tenant public and private documents with explicit access rules.
2. **Run identical queries**: Verify each user receives only eligible evidence.
3. **Revoke a document**: Change access and repeat the query in a continuing conversation.
4. **Test cached answers**: Confirm cache scope does not reuse another tenant's private response.
5. **Insert untrusted instructions**: Verify document text cannot alter retrieval permissions or tool authorization.
6. **Audit the full boundary**: Check candidates, model context, answer text, and citations separately.

## Caption

A model should never receive a document the user is not allowed to read.

Authorization must apply before private evidence enters the model context. Indexes, caches, citations, and follow-up requests share that responsibility.

1. Create two synthetic tenants
Give each tenant public and private documents with explicit access rules.

2. Run identical queries
Verify each user receives only eligible evidence.

3. Revoke a document
Change access and repeat the query in a continuing conversation.

4. Test cached answers
Confirm cache scope does not reuse another tenant's private response.

5. Insert untrusted instructions
Verify document text cannot alter retrieval permissions or tool authorization.

6. Audit the full boundary
Check candidates, model context, answer text, and citations separately.

The takeaway: Authorization belongs before context exposure, not only after answer generation.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #rag #authorization

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A model should never receive a document the user is not allowed to read.

- **0:06-0:11** / Reveal step 1: Create two synthetic tenants
  Narration: Give each tenant public and private documents with explicit access rules.

- **0:11-0:14** / Reveal step 2: Run identical queries
  Narration: Verify each user receives only eligible evidence.

- **0:14-0:18** / Reveal step 3: Revoke a document
  Narration: Change access and repeat the query in a continuing conversation.

- **0:18-0:22** / Reveal step 4: Test cached answers
  Narration: Confirm cache scope does not reuse another tenant's private response.

- **0:22-0:26** / Reveal step 5: Insert untrusted instructions
  Narration: Verify document text cannot alter retrieval permissions or tool authorization.

- **0:26-0:30** / Reveal step 6: Audit the full boundary
  Narration: Check candidates, model context, answer text, and citations separately.

- **0:30-0:38** / Takeaway and discussion prompt
  Narration: Authorization belongs before context exposure, not only after answer generation. How would you reproduce this with synthetic data?

## References

- [OWASP LLM application security](https://genai.owasp.org/llm-top-10/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
