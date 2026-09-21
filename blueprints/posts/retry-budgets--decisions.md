# Retries Without a Retry Storm / Decision Guide

By Yasir Sharfi

## The Idea

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

## Visual Blueprint

1. **Immediate retry**: Use only for a narrowly understood transient failure where another healthy target is likely to help.
2. **Trade-off / Immediate retry**: Immediate retries during broad overload amplify demand and can prevent recovery.
3. **Backoff with jitter**: Use bounded randomized delays when a dependency needs time to recover.
4. **Trade-off / Backoff with jitter**: Backoff does not make unsafe writes replayable or compensate for an unlimited attempt budget.
5. **Status reconciliation**: Use status lookup when an external side effect may have completed despite a timeout.
6. **Trade-off / Status reconciliation**: The user may see a pending outcome until the authoritative state is known.

## Caption

Three retries at three layers can create far more than three extra requests.

Assume a request crosses several services. Retry decisions must respect operation safety, the end-to-end deadline, and the system's remaining capacity.

1. Immediate retry
Use only for a narrowly understood transient failure where another healthy target is likely to help.

2. Trade-off / Immediate retry
Immediate retries during broad overload amplify demand and can prevent recovery.

3. Backoff with jitter
Use bounded randomized delays when a dependency needs time to recover.

4. Trade-off / Backoff with jitter
Backoff does not make unsafe writes replayable or compensate for an unlimited attempt budget.

5. Status reconciliation
Use status lookup when an external side effect may have completed despite a timeout.

6. Trade-off / Status reconciliation
The user may see a pending outcome until the authoritative state is known.

The takeaway: A retry is new load. Spend it only when safety, time, and capacity all permit it.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #retries #backoff

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Three retries at three layers can create far more than three extra requests.

- **0:06-0:13** / Reveal step 1: Immediate retry
  Narration: Use only for a narrowly understood transient failure where another healthy target is likely to help.

- **0:13-0:18** / Reveal step 2: Trade-off / Immediate retry
  Narration: Immediate retries during broad overload amplify demand and can prevent recovery.

- **0:18-0:23** / Reveal step 3: Backoff with jitter
  Narration: Use bounded randomized delays when a dependency needs time to recover.

- **0:23-0:29** / Reveal step 4: Trade-off / Backoff with jitter
  Narration: Backoff does not make unsafe writes replayable or compensate for an unlimited attempt budget.

- **0:29-0:35** / Reveal step 5: Status reconciliation
  Narration: Use status lookup when an external side effect may have completed despite a timeout.

- **0:35-0:41** / Reveal step 6: Trade-off / Status reconciliation
  Narration: The user may see a pending outcome until the authoritative state is known.

- **0:41-0:50** / Takeaway and discussion prompt
  Narration: A retry is new load. Spend it only when safety, time, and capacity all permit it. Which constraint would change your choice?

## References

- [AWS timeouts retries and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
