# LLM Calls Need a Budget / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

## Visual Blueprint

1. **Define the useful outcome**: State what a successful answer must accomplish and when the model should abstain.
2. **Bound input and output**: Limit user text, retrieved context, generated tokens, and attached data.
3. **Limit tool and retry loops**: Set explicit iteration and attempt budgets with safe stopping behavior.
4. **Choose the smallest adequate path**: Use deterministic logic or a smaller model when evaluation supports it.
5. **Cache only safely**: Scope reusable outputs by permissions, source version, and freshness requirements.
6. **Enforce account controls**: Use provider budgets, quotas, monitoring, and an outage fallback beyond frontend limits.

## Caption

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

1. Define the useful outcome
State what a successful answer must accomplish and when the model should abstain.

2. Bound input and output
Limit user text, retrieved context, generated tokens, and attached data.

3. Limit tool and retry loops
Set explicit iteration and attempt budgets with safe stopping behavior.

4. Choose the smallest adequate path
Use deterministic logic or a smaller model when evaluation supports it.

5. Cache only safely
Scope reusable outputs by permissions, source version, and freshness requirements.

6. Enforce account controls
Use provider budgets, quotas, monitoring, and an outage fallback beyond frontend limits.

The takeaway: Budget the complete model workflow, not just the length of the visible answer.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #llm #cost

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: An unlimited context window can turn a small feature into a large bill.

- **0:06-0:12** / Reveal step 1: Define the useful outcome
  Narration: State what a successful answer must accomplish and when the model should abstain.

- **0:12-0:16** / Reveal step 2: Bound input and output
  Narration: Limit user text, retrieved context, generated tokens, and attached data.

- **0:16-0:20** / Reveal step 3: Limit tool and retry loops
  Narration: Set explicit iteration and attempt budgets with safe stopping behavior.

- **0:20-0:25** / Reveal step 4: Choose the smallest adequate path
  Narration: Use deterministic logic or a smaller model when evaluation supports it.

- **0:25-0:29** / Reveal step 5: Cache only safely
  Narration: Scope reusable outputs by permissions, source version, and freshness requirements.

- **0:29-0:34** / Reveal step 6: Enforce account controls
  Narration: Use provider budgets, quotas, monitoring, and an outage fallback beyond frontend limits.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: Budget the complete model workflow, not just the length of the visible answer. Which bottleneck would you measure first?

## References

- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
