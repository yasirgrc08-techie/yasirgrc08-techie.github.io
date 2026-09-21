# A Queue Is Not Infinite Capacity / Metrics That Matter

By Yasir Sharfi

## The Idea

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

## Visual Blueprint

1. **Oldest job age**: Track the age of the oldest useful pending job by work class.
2. **Interpret / Oldest job age**: Queue length cannot be interpreted without job duration and arrival distribution.
3. **Net backlog growth**: Compare admitted jobs with terminal outcomes over the same interval.
4. **Interpret / Net backlog growth**: Retries inflate attempts but do not necessarily create useful progress.
5. **Completion within objective**: Measure the share of accepted jobs finished before they lose value.
6. **Interpret / Completion within objective**: Eventually completing every job can still violate the promised user experience.

## Caption

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

1. Oldest job age
Track the age of the oldest useful pending job by work class.

2. Interpret / Oldest job age
Queue length cannot be interpreted without job duration and arrival distribution.

3. Net backlog growth
Compare admitted jobs with terminal outcomes over the same interval.

4. Interpret / Net backlog growth
Retries inflate attempts but do not necessarily create useful progress.

5. Completion within objective
Measure the share of accepted jobs finished before they lose value.

6. Interpret / Completion within objective
Eventually completing every job can still violate the promised user experience.

The takeaway: A queue buys time only when admission, processing capacity, and expiry are controlled.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #backpressure #overload

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A queue can hide overload until the delay becomes the outage.

- **0:05-0:10** / Reveal step 1: Oldest job age
  Narration: Track the age of the oldest useful pending job by work class.

- **0:10-0:15** / Reveal step 2: Interpret / Oldest job age
  Narration: Queue length cannot be interpreted without job duration and arrival distribution.

- **0:15-0:19** / Reveal step 3: Net backlog growth
  Narration: Compare admitted jobs with terminal outcomes over the same interval.

- **0:19-0:23** / Reveal step 4: Interpret / Net backlog growth
  Narration: Retries inflate attempts but do not necessarily create useful progress.

- **0:23-0:28** / Reveal step 5: Completion within objective
  Narration: Measure the share of accepted jobs finished before they lose value.

- **0:28-0:33** / Reveal step 6: Interpret / Completion within objective
  Narration: Eventually completing every job can still violate the promised user experience.

- **0:33-0:42** / Takeaway and discussion prompt
  Narration: A queue buys time only when admission, processing capacity, and expiry are controlled. Which metric could look healthy while users suffer?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
