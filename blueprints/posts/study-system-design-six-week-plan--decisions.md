# Plan Your System Design Preparation / Practice Decisions

By Yasir Sharfi

## The Idea

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

## Visual Blueprint

1. **Requirements control the answer**: Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.
2. **Watch for**: Choosing a stack before clarifying the problem.
3. **Start with a coherent baseline**: One API layer and one durable database may be enough to explain the contract. Add caches, queues, partitions, and replicas when a stated requirement justifies them.
4. **Watch for**: Drawing components without read, write, and failure paths.
5. **Follow data through failures**: Walk a successful write, a read, a duplicate request, and a dependency failure. State the durable acknowledgement boundary and what is recoverable.
6. **Watch for**: Claiming scale or guarantees without explicit assumptions.

## Caption

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

1. Requirements control the answer
Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.

2. Watch for
Choosing a stack before clarifying the problem.

3. Start with a coherent baseline
One API layer and one durable database may be enough to explain the contract. Add caches, queues, partitions, and replicas when a stated requirement justifies them.

4. Watch for
Drawing components without read, write, and failure paths.

5. Follow data through failures
Walk a successful write, a read, a duplicate request, and a dependency failure. State the durable acknowledgement boundary and what is recoverable.

6. Watch for
Claiming scale or guarantees without explicit assumptions.

The takeaway: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #system #design

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: How much capacity math should I do?

- **0:03-0:11** / Reveal step 1: Requirements control the answer
  Narration: Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.

- **0:11-0:14** / Reveal step 2: Watch for
  Narration: Choosing a stack before clarifying the problem.

- **0:14-0:25** / Reveal step 3: Start with a coherent baseline
  Narration: One API layer and one durable database may be enough to explain the contract. Add caches, queues, partitions, and replicas when a stated requirement justifies them.

- **0:25-0:29** / Reveal step 4: Watch for
  Narration: Drawing components without read, write, and failure paths.

- **0:29-0:38** / Reveal step 5: Follow data through failures
  Narration: Walk a successful write, a read, a duplicate request, and a dependency failure. State the durable acknowledgement boundary and what is recoverable.

- **0:38-0:41** / Reveal step 6: Watch for
  Narration: Claiming scale or guarantees without explicit assumptions.

- **0:41-0:53** / Takeaway and discussion prompt
  Narration: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem. Which constraint would change your choice?

## References

- [Plan Your System Design Preparation / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=system-design-six-week-plan)
- [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/)
- [Google SRE book](https://sre.google/sre-book/table-of-contents/)
- [Hello Interview: system design introduction](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
