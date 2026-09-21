# LLM Calls Need a Budget / Failure and Recovery

By Yasir Sharfi

## The Idea

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

## Visual Blueprint

1. **Notice spend amplification**: Token use or model calls grow faster than useful completed user tasks.
2. **Inspect call multiplication**: Check retries, tool loops, repeated context, and background triggers.
3. **Apply server-side limits**: Stop excessive demand using authoritative controls rather than only disabled buttons.
4. **Use a safe fallback**: Return bounded static guidance or a clear temporary limitation.
5. **Repair the expensive path**: Reduce unnecessary context or iterations without hiding quality failures.
6. **Verify provider accounting**: Compare application counters with actual provider usage and billing semantics.

## Caption

An unlimited context window can turn a small feature into a large bill.

Define per-request and account-level budgets for model use. Token limits, retries, tool loops, caching, and provider latency all affect the cost of a useful answer.

1. Notice spend amplification
Token use or model calls grow faster than useful completed user tasks.

2. Inspect call multiplication
Check retries, tool loops, repeated context, and background triggers.

3. Apply server-side limits
Stop excessive demand using authoritative controls rather than only disabled buttons.

4. Use a safe fallback
Return bounded static guidance or a clear temporary limitation.

5. Repair the expensive path
Reduce unnecessary context or iterations without hiding quality failures.

6. Verify provider accounting
Compare application counters with actual provider usage and billing semantics.

The takeaway: Budget the complete model workflow, not just the length of the visible answer.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #llm #cost

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: An unlimited context window can turn a small feature into a large bill.

- **0:06-0:11** / Reveal step 1: Notice spend amplification
  Narration: Token use or model calls grow faster than useful completed user tasks.

- **0:11-0:15** / Reveal step 2: Inspect call multiplication
  Narration: Check retries, tool loops, repeated context, and background triggers.

- **0:15-0:20** / Reveal step 3: Apply server-side limits
  Narration: Stop excessive demand using authoritative controls rather than only disabled buttons.

- **0:20-0:24** / Reveal step 4: Use a safe fallback
  Narration: Return bounded static guidance or a clear temporary limitation.

- **0:24-0:28** / Reveal step 5: Repair the expensive path
  Narration: Reduce unnecessary context or iterations without hiding quality failures.

- **0:28-0:32** / Reveal step 6: Verify provider accounting
  Narration: Compare application counters with actual provider usage and billing semantics.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Budget the complete model workflow, not just the length of the visible answer. What evidence would disprove your first diagnosis?

## References

- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
