# Designing Honest Job APIs / Metrics That Matter

By Yasir Sharfi

## The Idea

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

## Visual Blueprint

1. **Oldest pending job**: Measure age by state and work class, not just the total number of jobs.
2. **Interpret / Oldest pending job**: A low count can hide one job stuck beyond its promised completion window.
3. **Attempt amplification**: Track attempts per logical job and classify retriable versus permanent failures.
4. **Interpret / Attempt amplification**: Unlimited retries can keep a broken job alive forever while consuming useful capacity.
5. **Time to terminal state**: Measure acceptance-to-completion or failure latency for each job class.
6. **Interpret / Time to terminal state**: Queue time and processing time should be visible separately to explain delays.

## Caption

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

1. Oldest pending job
Measure age by state and work class, not just the total number of jobs.

2. Interpret / Oldest pending job
A low count can hide one job stuck beyond its promised completion window.

3. Attempt amplification
Track attempts per logical job and classify retriable versus permanent failures.

4. Interpret / Attempt amplification
Unlimited retries can keep a broken job alive forever while consuming useful capacity.

5. Time to terminal state
Measure acceptance-to-completion or failure latency for each job class.

6. Interpret / Time to terminal state
Queue time and processing time should be visible separately to explain delays.

The takeaway: An asynchronous API must make ownership, progress, retries, and final outcomes observable.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #jobs #queues

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Returning 202 is easy; explaining what happened to the job is the hard part.

- **0:06-0:12** / Reveal step 1: Oldest pending job
  Narration: Measure age by state and work class, not just the total number of jobs.

- **0:12-0:18** / Reveal step 2: Interpret / Oldest pending job
  Narration: A low count can hide one job stuck beyond its promised completion window.

- **0:18-0:23** / Reveal step 3: Attempt amplification
  Narration: Track attempts per logical job and classify retriable versus permanent failures.

- **0:23-0:29** / Reveal step 4: Interpret / Attempt amplification
  Narration: Unlimited retries can keep a broken job alive forever while consuming useful capacity.

- **0:29-0:33** / Reveal step 5: Time to terminal state
  Narration: Measure acceptance-to-completion or failure latency for each job class.

- **0:33-0:38** / Reveal step 6: Interpret / Time to terminal state
  Narration: Queue time and processing time should be visible separately to explain delays.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: An asynchronous API must make ownership, progress, retries, and final outcomes observable. Which metric could look healthy while users suffer?

## References

- [Azure asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
