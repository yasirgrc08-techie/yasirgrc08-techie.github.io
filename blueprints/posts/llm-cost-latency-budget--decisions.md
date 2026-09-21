# LLM Calls Need a Budget / Decision Guide

By Yasir Sharfi

## The Idea

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

## Visual Blueprint

1. **Deterministic response**: Use ordinary code for fixed facts, prices, and allowlisted navigation.
2. **Trade-off / Deterministic response**: A deterministic path has limited language flexibility but can preserve exact safety boundaries.
3. **Small model router**: Use a constrained model to select among known topics or actions.
4. **Trade-off / Small model router**: Validate its output against an allowlist; do not execute arbitrary returned instructions.
5. **Generative answer**: Use generation when open-ended synthesis is justified and grounded evaluation is available.
6. **Trade-off / Generative answer**: Provider cost, unsupported claims, privacy, and latency require explicit safeguards.

## Caption

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

1. Deterministic response
Use ordinary code for fixed facts, prices, and allowlisted navigation.

2. Trade-off / Deterministic response
A deterministic path has limited language flexibility but can preserve exact safety boundaries.

3. Small model router
Use a constrained model to select among known topics or actions.

4. Trade-off / Small model router
Validate its output against an allowlist; do not execute arbitrary returned instructions.

5. Generative answer
Use generation when open-ended synthesis is justified and grounded evaluation is available.

6. Trade-off / Generative answer
Provider cost, unsupported claims, privacy, and latency require explicit safeguards.

The takeaway: Budget the complete model workflow, not just the length of the visible answer.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #llm #cost

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: An unlimited context window can turn a small feature into a large bill.

- **0:06-0:10** / Reveal step 1: Deterministic response
  Narration: Use ordinary code for fixed facts, prices, and allowlisted navigation.

- **0:10-0:16** / Reveal step 2: Trade-off / Deterministic response
  Narration: A deterministic path has limited language flexibility but can preserve exact safety boundaries.

- **0:16-0:21** / Reveal step 3: Small model router
  Narration: Use a constrained model to select among known topics or actions.

- **0:21-0:26** / Reveal step 4: Trade-off / Small model router
  Narration: Validate its output against an allowlist; do not execute arbitrary returned instructions.

- **0:26-0:31** / Reveal step 5: Generative answer
  Narration: Use generation when open-ended synthesis is justified and grounded evaluation is available.

- **0:31-0:35** / Reveal step 6: Trade-off / Generative answer
  Narration: Provider cost, unsupported claims, privacy, and latency require explicit safeguards.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Budget the complete model workflow, not just the length of the visible answer. Which constraint would change your choice?

## References

- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
