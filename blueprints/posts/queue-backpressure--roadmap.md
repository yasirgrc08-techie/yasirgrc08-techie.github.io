# A Queue Is Not Infinite Capacity / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

## Visual Blueprint

1. **Measure arrival and service**: Compare admitted work with sustainable completion rate for each job class.
2. **Bound the backlog**: Set capacity or age limits that protect storage and useful completion time.
3. **Apply admission control**: Reject, defer, or shed work before accepting obligations the system cannot meet.
4. **Scale the right consumer**: Add workers only when the limiting dependency has spare capacity.
5. **Define expiry semantics**: Explain what happens to work that is no longer useful after waiting.
6. **Recover without flooding**: Drain backlog at a rate that preserves current traffic and downstream health.

## Caption

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

1. Measure arrival and service
Compare admitted work with sustainable completion rate for each job class.

2. Bound the backlog
Set capacity or age limits that protect storage and useful completion time.

3. Apply admission control
Reject, defer, or shed work before accepting obligations the system cannot meet.

4. Scale the right consumer
Add workers only when the limiting dependency has spare capacity.

5. Define expiry semantics
Explain what happens to work that is no longer useful after waiting.

6. Recover without flooding
Drain backlog at a rate that preserves current traffic and downstream health.

The takeaway: A queue buys time only when admission, processing capacity, and expiry are controlled.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #backpressure #overload

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A queue can hide overload until the delay becomes the outage.

- **0:05-0:10** / Reveal step 1: Measure arrival and service
  Narration: Compare admitted work with sustainable completion rate for each job class.

- **0:10-0:15** / Reveal step 2: Bound the backlog
  Narration: Set capacity or age limits that protect storage and useful completion time.

- **0:15-0:20** / Reveal step 3: Apply admission control
  Narration: Reject, defer, or shed work before accepting obligations the system cannot meet.

- **0:20-0:24** / Reveal step 4: Scale the right consumer
  Narration: Add workers only when the limiting dependency has spare capacity.

- **0:24-0:29** / Reveal step 5: Define expiry semantics
  Narration: Explain what happens to work that is no longer useful after waiting.

- **0:29-0:34** / Reveal step 6: Recover without flooding
  Narration: Drain backlog at a rate that preserves current traffic and downstream health.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: A queue buys time only when admission, processing capacity, and expiry are controlled. Which bottleneck would you measure first?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
