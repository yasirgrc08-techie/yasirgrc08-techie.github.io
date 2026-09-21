# A Queue Is Not Infinite Capacity / Decision Guide

By Yasir Sharfi

## The Idea

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

## Visual Blueprint

1. **Bounded queue**: Use a bounded queue when accepted work must have a predictable resource envelope.
2. **Trade-off / Bounded queue**: Producers need an explicit rejection or waiting contract when capacity is exhausted.
3. **Durable backlog**: Use durable storage when delayed work remains valuable and recovery time is acceptable.
4. **Trade-off / Durable backlog**: Durability does not make an unbounded delay useful to the customer.
5. **Load shedding**: Drop or reject nonessential work when preserving critical service matters more than accepting everything.
6. **Trade-off / Load shedding**: The product must define which work is safely discardable and how rejection is reported.

## Caption

A queue can hide overload until the delay becomes the outage.

Incoming work must eventually be completed, rejected, expired, or cancelled. Queue capacity and age are part of the user-visible contract.

1. Bounded queue
Use a bounded queue when accepted work must have a predictable resource envelope.

2. Trade-off / Bounded queue
Producers need an explicit rejection or waiting contract when capacity is exhausted.

3. Durable backlog
Use durable storage when delayed work remains valuable and recovery time is acceptable.

4. Trade-off / Durable backlog
Durability does not make an unbounded delay useful to the customer.

5. Load shedding
Drop or reject nonessential work when preserving critical service matters more than accepting everything.

6. Trade-off / Load shedding
The product must define which work is safely discardable and how rejection is reported.

The takeaway: A queue buys time only when admission, processing capacity, and expiry are controlled.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #backpressure #overload

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A queue can hide overload until the delay becomes the outage.

- **0:05-0:11** / Reveal step 1: Bounded queue
  Narration: Use a bounded queue when accepted work must have a predictable resource envelope.

- **0:11-0:16** / Reveal step 2: Trade-off / Bounded queue
  Narration: Producers need an explicit rejection or waiting contract when capacity is exhausted.

- **0:16-0:22** / Reveal step 3: Durable backlog
  Narration: Use durable storage when delayed work remains valuable and recovery time is acceptable.

- **0:22-0:27** / Reveal step 4: Trade-off / Durable backlog
  Narration: Durability does not make an unbounded delay useful to the customer.

- **0:27-0:33** / Reveal step 5: Load shedding
  Narration: Drop or reject nonessential work when preserving critical service matters more than accepting everything.

- **0:33-0:39** / Reveal step 6: Trade-off / Load shedding
  Narration: The product must define which work is safely discardable and how rejection is reported.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: A queue buys time only when admission, processing capacity, and expiry are controlled. Which constraint would change your choice?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
