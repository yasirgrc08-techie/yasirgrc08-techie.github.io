# LLM Calls Need a Budget / Metrics That Matter

By Yasir Sharfi

## The Idea

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

## Visual Blueprint

1. **Cost per useful answer**: Measure model spend against successful evaluated outcomes.
2. **Interpret / Cost per useful answer**: Counting every generated response as success can hide low-quality or repeated work.
3. **Tokens by stage**: Track prompt, retrieved context, output, and repeated tool-call tokens separately.
4. **Interpret / Tokens by stage**: A short visible answer can still require a large expensive input context.
5. **End-to-end latency**: Measure retrieval, model processing, tools, retries, and final response time.
6. **Interpret / End-to-end latency**: A client timeout may not cancel provider work or prevent the associated charge.

## Caption

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

1. Cost per useful answer
Measure model spend against successful evaluated outcomes.

2. Interpret / Cost per useful answer
Counting every generated response as success can hide low-quality or repeated work.

3. Tokens by stage
Track prompt, retrieved context, output, and repeated tool-call tokens separately.

4. Interpret / Tokens by stage
A short visible answer can still require a large expensive input context.

5. End-to-end latency
Measure retrieval, model processing, tools, retries, and final response time.

6. Interpret / End-to-end latency
A client timeout may not cancel provider work or prevent the associated charge.

The takeaway: Budget the complete model workflow, not just the length of the visible answer.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #llm #cost

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: An unlimited context window can turn a small feature into a large bill.

- **0:06-0:09** / Reveal step 1: Cost per useful answer
  Narration: Measure model spend against successful evaluated outcomes.

- **0:09-0:14** / Reveal step 2: Interpret / Cost per useful answer
  Narration: Counting every generated response as success can hide low-quality or repeated work.

- **0:14-0:18** / Reveal step 3: Tokens by stage
  Narration: Track prompt, retrieved context, output, and repeated tool-call tokens separately.

- **0:18-0:23** / Reveal step 4: Interpret / Tokens by stage
  Narration: A short visible answer can still require a large expensive input context.

- **0:23-0:27** / Reveal step 5: End-to-end latency
  Narration: Measure retrieval, model processing, tools, retries, and final response time.

- **0:27-0:33** / Reveal step 6: Interpret / End-to-end latency
  Narration: A client timeout may not cancel provider work or prevent the associated charge.

- **0:33-0:42** / Takeaway and discussion prompt
  Narration: Budget the complete model workflow, not just the length of the visible answer. Which metric could look healthy while users suffer?

## References

- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
