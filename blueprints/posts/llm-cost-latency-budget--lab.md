# LLM Calls Need a Budget / Build and Validate

By Yasir Sharfi

## The Idea

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

## Visual Blueprint

1. **Create a fixed question set**: Use public or synthetic prompts with explicit expected task outcomes.
2. **Measure a baseline path**: Record quality, latency, call count, and token usage.
3. **Add an iteration limit**: Test a tool or retry loop that would otherwise continue indefinitely.
4. **Compare simpler routing**: Replace fixed-answer tasks with an allowlisted deterministic path.
5. **Simulate provider failure**: Verify a clear fallback and no automatic retry storm.
6. **Report cost honestly**: Include failed and timed-out attempts in the unit-cost calculation.

## Caption

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

1. Create a fixed question set
Use public or synthetic prompts with explicit expected task outcomes.

2. Measure a baseline path
Record quality, latency, call count, and token usage.

3. Add an iteration limit
Test a tool or retry loop that would otherwise continue indefinitely.

4. Compare simpler routing
Replace fixed-answer tasks with an allowlisted deterministic path.

5. Simulate provider failure
Verify a clear fallback and no automatic retry storm.

6. Report cost honestly
Include failed and timed-out attempts in the unit-cost calculation.

The takeaway: Budget the complete model workflow, not just the length of the visible answer.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #llm #cost

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: An unlimited context window can turn a small feature into a large bill.

- **0:06-0:10** / Reveal step 1: Create a fixed question set
  Narration: Use public or synthetic prompts with explicit expected task outcomes.

- **0:10-0:14** / Reveal step 2: Measure a baseline path
  Narration: Record quality, latency, call count, and token usage.

- **0:14-0:19** / Reveal step 3: Add an iteration limit
  Narration: Test a tool or retry loop that would otherwise continue indefinitely.

- **0:19-0:23** / Reveal step 4: Compare simpler routing
  Narration: Replace fixed-answer tasks with an allowlisted deterministic path.

- **0:23-0:27** / Reveal step 5: Simulate provider failure
  Narration: Verify a clear fallback and no automatic retry storm.

- **0:27-0:31** / Reveal step 6: Report cost honestly
  Narration: Include failed and timed-out attempts in the unit-cost calculation.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Budget the complete model workflow, not just the length of the visible answer. How would you reproduce this with synthetic data?

## References

- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
