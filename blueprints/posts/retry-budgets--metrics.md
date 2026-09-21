# Retries Without a Retry Storm / Metrics That Matter

By Yasir Sharfi

## The Idea

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

## Visual Blueprint

1. **Retry ratio**: Measure retry attempts divided by original logical requests for each dependency.
2. **Interpret / Retry ratio**: A healthy success rate can hide expensive retry amplification if you count only final outcomes.
3. **Budget exhaustion**: Count operations that stop because attempts or deadlines are exhausted.
4. **Interpret / Budget exhaustion**: Increasing every budget may increase user latency without improving successful completion.
5. **Recovery throughput**: Track completed useful work as the dependency recovers.
6. **Interpret / Recovery throughput**: Retry traffic can consume the capacity needed for new requests and recovery tasks.

## Caption

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

1. Retry ratio
Measure retry attempts divided by original logical requests for each dependency.

2. Interpret / Retry ratio
A healthy success rate can hide expensive retry amplification if you count only final outcomes.

3. Budget exhaustion
Count operations that stop because attempts or deadlines are exhausted.

4. Interpret / Budget exhaustion
Increasing every budget may increase user latency without improving successful completion.

5. Recovery throughput
Track completed useful work as the dependency recovers.

6. Interpret / Recovery throughput
Retry traffic can consume the capacity needed for new requests and recovery tasks.

The takeaway: A retry is new load. Spend it only when safety, time, and capacity all permit it.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #retries #backoff

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Three retries at three layers can create far more than three extra requests.

- **0:06-0:11** / Reveal step 1: Retry ratio
  Narration: Measure retry attempts divided by original logical requests for each dependency.

- **0:11-0:17** / Reveal step 2: Interpret / Retry ratio
  Narration: A healthy success rate can hide expensive retry amplification if you count only final outcomes.

- **0:17-0:21** / Reveal step 3: Budget exhaustion
  Narration: Count operations that stop because attempts or deadlines are exhausted.

- **0:21-0:26** / Reveal step 4: Interpret / Budget exhaustion
  Narration: Increasing every budget may increase user latency without improving successful completion.

- **0:26-0:30** / Reveal step 5: Recovery throughput
  Narration: Track completed useful work as the dependency recovers.

- **0:30-0:36** / Reveal step 6: Interpret / Recovery throughput
  Narration: Retry traffic can consume the capacity needed for new requests and recovery tasks.

- **0:36-0:46** / Takeaway and discussion prompt
  Narration: A retry is new load. Spend it only when safety, time, and capacity all permit it. Which metric could look healthy while users suffer?

## References

- [AWS timeouts retries and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
