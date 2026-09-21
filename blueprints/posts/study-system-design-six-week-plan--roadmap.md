# Plan Your System Design Preparation / Learning Roadmap

By Yasir Sharfi

## The Idea

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

## Visual Blueprint

1. **Build the mental model**: Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.
2. **Phase 1 / Weeks 1-2**: Review APIs, SQL/NoSQL access patterns, indexes, HTTP, caching, replication, and queues. Design a small link or task service with explicit data ownership and errors.
3. **Phase 2 / Week 3**: Practice idempotency, transactions, consistency, leases, and authorization. Trace timeouts and partial failures.
4. **Phase 3 / Weeks 4-5**: Study partitioning, hot keys, fan-out, backpressure, large objects, and regional failure. Add observability and capacity budgets.
5. **Phase 4 / Week 6**: Run timed design discussions with a peer who changes one constraint. Practice explaining rejected alternatives and uncertainty.
6. **Prove readiness**: Requirements and non-goals are prioritized.

## Caption

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

1. Build the mental model
Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.

2. Phase 1 / Weeks 1-2
Review APIs, SQL/NoSQL access patterns, indexes, HTTP, caching, replication, and queues. Design a small link or task service with explicit data ownership and errors.

3. Phase 2 / Week 3
Practice idempotency, transactions, consistency, leases, and authorization. Trace timeouts and partial failures.

4. Phase 3 / Weeks 4-5
Study partitioning, hot keys, fan-out, backpressure, large objects, and regional failure. Add observability and capacity budgets.

5. Phase 4 / Week 6
Run timed design discussions with a peer who changes one constraint. Practice explaining rejected alternatives and uncertainty.

6. Prove readiness
Requirements and non-goals are prioritized.

The takeaway: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #system #design

## Reel Storyboard

Suggested duration: about 55 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: How much capacity math should I do?

- **0:03-0:11** / Reveal step 1: Build the mental model
  Narration: Ask who uses the system, which operations matter, what scale is assumed, and what correctness or latency is required.

- **0:11-0:21** / Reveal step 2: Phase 1 / Weeks 1-2
  Narration: Review APIs, SQL/NoSQL access patterns, indexes, HTTP, caching, replication, and queues. Design a small link or task service with explicit data ownership and errors.

- **0:21-0:26** / Reveal step 3: Phase 2 / Week 3
  Narration: Practice idempotency, transactions, consistency, leases, and authorization. Trace timeouts and partial failures.

- **0:26-0:33** / Reveal step 4: Phase 3 / Weeks 4-5
  Narration: Study partitioning, hot keys, fan-out, backpressure, large objects, and regional failure. Add observability and capacity budgets.

- **0:33-0:40** / Reveal step 5: Phase 4 / Week 6
  Narration: Run timed design discussions with a peer who changes one constraint. Practice explaining rejected alternatives and uncertainty.

- **0:40-0:43** / Reveal step 6: Prove readiness
  Narration: Requirements and non-goals are prioritized.

- **0:43-0:55** / Takeaway and discussion prompt
  Narration: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem. Which bottleneck would you measure first?

## References

- [Plan Your System Design Preparation / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=system-design-six-week-plan)
- [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/)
- [Google SRE book](https://sre.google/sre-book/table-of-contents/)
- [Hello Interview: system design introduction](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
