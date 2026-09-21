# Retries Without a Retry Storm / Build and Validate

By Yasir Sharfi

## The Idea

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

## Visual Blueprint

1. **Build a call chain**: Create a local client, API, and dependency with observable attempt counters.
2. **Fail predictably**: Return a controlled transient error for a fixed interval using synthetic requests.
3. **Enable nested retries**: Measure the amplification when both client and API retry independently.
4. **Centralize ownership**: Apply one retry budget, bounded backoff, and jitter at the chosen boundary.
5. **Lose a write response**: Verify an idempotency key or reconciliation path prevents duplicate effects.
6. **Report all outcomes**: Compare attempts, completion time, errors, and useful work rather than only eventual success.

## Caption

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

1. Build a call chain
Create a local client, API, and dependency with observable attempt counters.

2. Fail predictably
Return a controlled transient error for a fixed interval using synthetic requests.

3. Enable nested retries
Measure the amplification when both client and API retry independently.

4. Centralize ownership
Apply one retry budget, bounded backoff, and jitter at the chosen boundary.

5. Lose a write response
Verify an idempotency key or reconciliation path prevents duplicate effects.

6. Report all outcomes
Compare attempts, completion time, errors, and useful work rather than only eventual success.

The takeaway: A retry is new load. Spend it only when safety, time, and capacity all permit it.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #retries #backoff

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Three retries at three layers can create far more than three extra requests.

- **0:06-0:11** / Reveal step 1: Build a call chain
  Narration: Create a local client, API, and dependency with observable attempt counters.

- **0:11-0:16** / Reveal step 2: Fail predictably
  Narration: Return a controlled transient error for a fixed interval using synthetic requests.

- **0:16-0:20** / Reveal step 3: Enable nested retries
  Narration: Measure the amplification when both client and API retry independently.

- **0:20-0:25** / Reveal step 4: Centralize ownership
  Narration: Apply one retry budget, bounded backoff, and jitter at the chosen boundary.

- **0:25-0:29** / Reveal step 5: Lose a write response
  Narration: Verify an idempotency key or reconciliation path prevents duplicate effects.

- **0:29-0:35** / Reveal step 6: Report all outcomes
  Narration: Compare attempts, completion time, errors, and useful work rather than only eventual success.

- **0:35-0:45** / Takeaway and discussion prompt
  Narration: A retry is new load. Spend it only when safety, time, and capacity all permit it. How would you reproduce this with synthetic data?

## References

- [AWS timeouts retries and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
