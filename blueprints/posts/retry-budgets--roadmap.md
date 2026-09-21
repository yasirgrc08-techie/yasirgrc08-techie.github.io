# Retries Without a Retry Storm / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

## Visual Blueprint

1. **Classify the failure**: Separate permanent validation errors from transient failures and ambiguous side-effect outcomes.
2. **Check replay safety**: Retry reads or explicitly idempotent writes; reconcile writes whose result is unknown.
3. **Assign one retry owner**: Choose the layer with useful failure context instead of allowing every layer to retry independently.
4. **Use a retry budget**: Bound attempts and aggregate retry traffic, not only the delay between attempts.
5. **Add backoff and jitter**: Spread retries over time while respecting provider retry guidance and the remaining deadline.
6. **Stop when it cannot help**: Return a clear failure when the deadline or capacity budget is exhausted rather than queueing more work.

## Caption

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

1. Classify the failure
Separate permanent validation errors from transient failures and ambiguous side-effect outcomes.

2. Check replay safety
Retry reads or explicitly idempotent writes; reconcile writes whose result is unknown.

3. Assign one retry owner
Choose the layer with useful failure context instead of allowing every layer to retry independently.

4. Use a retry budget
Bound attempts and aggregate retry traffic, not only the delay between attempts.

5. Add backoff and jitter
Spread retries over time while respecting provider retry guidance and the remaining deadline.

6. Stop when it cannot help
Return a clear failure when the deadline or capacity budget is exhausted rather than queueing more work.

The takeaway: A retry is new load. Spend it only when safety, time, and capacity all permit it.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #retries #backoff

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Three retries at three layers can create far more than three extra requests.

- **0:06-0:11** / Reveal step 1: Classify the failure
  Narration: Separate permanent validation errors from transient failures and ambiguous side-effect outcomes.

- **0:11-0:16** / Reveal step 2: Check replay safety
  Narration: Retry reads or explicitly idempotent writes; reconcile writes whose result is unknown.

- **0:16-0:22** / Reveal step 3: Assign one retry owner
  Narration: Choose the layer with useful failure context instead of allowing every layer to retry independently.

- **0:22-0:27** / Reveal step 4: Use a retry budget
  Narration: Bound attempts and aggregate retry traffic, not only the delay between attempts.

- **0:27-0:33** / Reveal step 5: Add backoff and jitter
  Narration: Spread retries over time while respecting provider retry guidance and the remaining deadline.

- **0:33-0:40** / Reveal step 6: Stop when it cannot help
  Narration: Return a clear failure when the deadline or capacity budget is exhausted rather than queueing more work.

- **0:40-0:49** / Takeaway and discussion prompt
  Narration: A retry is new load. Spend it only when safety, time, and capacity all permit it. Which bottleneck would you measure first?

## References

- [AWS timeouts retries and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
