# Retries Without a Retry Storm / Failure and Recovery

By Yasir Sharfi

## The Idea

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

## Visual Blueprint

1. **Notice amplification**: Dependency traffic increases while successful user work falls during an outage.
2. **Count logical attempts**: Compare original requests with retries at every layer of the call chain.
3. **Disable redundant retry layers**: Temporarily reduce retry ownership to a single informed boundary.
4. **Protect the deadline**: Stop issuing attempts that cannot complete within the caller's remaining budget.
5. **Recover gradually**: Restore limited retry traffic while monitoring useful throughput and dependency saturation.
6. **Test correlated failure**: Simulate a broad dependency outage, not only one isolated connection error.

## Caption

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

1. Notice amplification
Dependency traffic increases while successful user work falls during an outage.

2. Count logical attempts
Compare original requests with retries at every layer of the call chain.

3. Disable redundant retry layers
Temporarily reduce retry ownership to a single informed boundary.

4. Protect the deadline
Stop issuing attempts that cannot complete within the caller's remaining budget.

5. Recover gradually
Restore limited retry traffic while monitoring useful throughput and dependency saturation.

6. Test correlated failure
Simulate a broad dependency outage, not only one isolated connection error.

The takeaway: A retry is new load. Spend it only when safety, time, and capacity all permit it.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #retries #backoff

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Three retries at three layers can create far more than three extra requests.

- **0:06-0:11** / Reveal step 1: Notice amplification
  Narration: Dependency traffic increases while successful user work falls during an outage.

- **0:11-0:16** / Reveal step 2: Count logical attempts
  Narration: Compare original requests with retries at every layer of the call chain.

- **0:16-0:20** / Reveal step 3: Disable redundant retry layers
  Narration: Temporarily reduce retry ownership to a single informed boundary.

- **0:20-0:25** / Reveal step 4: Protect the deadline
  Narration: Stop issuing attempts that cannot complete within the caller's remaining budget.

- **0:25-0:30** / Reveal step 5: Recover gradually
  Narration: Restore limited retry traffic while monitoring useful throughput and dependency saturation.

- **0:30-0:35** / Reveal step 6: Test correlated failure
  Narration: Simulate a broad dependency outage, not only one isolated connection error.

- **0:35-0:45** / Takeaway and discussion prompt
  Narration: A retry is new load. Spend it only when safety, time, and capacity all permit it. What evidence would disprove your first diagnosis?

## References

- [AWS timeouts retries and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
