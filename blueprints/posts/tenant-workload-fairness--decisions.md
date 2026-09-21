# Multi-Tenant Fairness / Decision Guide

By Yasir Sharfi

## The Idea

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

## Visual Blueprint

1. **Shared worker pool**: Use a shared pool when tenants have similar work and fair admission keeps contention bounded.
2. **Trade-off / Shared worker pool**: Without tenant-aware queueing, one large batch can occupy the pool before other work arrives.
3. **Per-class queues**: Separate interactive and batch queues when their latency and retry policies differ.
4. **Trade-off / Per-class queues**: Capacity allocation and starvation prevention still need explicit rules.
5. **Dedicated capacity**: Isolate sustained heavy tenants or strict contractual workloads when the economics justify it.
6. **Trade-off / Dedicated capacity**: Dedicated pools add utilization, provisioning, migration, and operational overhead.

## Caption

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

1. Shared worker pool
Use a shared pool when tenants have similar work and fair admission keeps contention bounded.

2. Trade-off / Shared worker pool
Without tenant-aware queueing, one large batch can occupy the pool before other work arrives.

3. Per-class queues
Separate interactive and batch queues when their latency and retry policies differ.

4. Trade-off / Per-class queues
Capacity allocation and starvation prevention still need explicit rules.

5. Dedicated capacity
Isolate sustained heavy tenants or strict contractual workloads when the economics justify it.

6. Trade-off / Dedicated capacity
Dedicated pools add utilization, provisioning, migration, and operational overhead.

The takeaway: Tenant isolation is not only about data access; it also needs a resource and scheduling contract.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #multitenant #fairness

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A single busy customer should not quietly become everyone else's latency problem.

- **0:05-0:11** / Reveal step 1: Shared worker pool
  Narration: Use a shared pool when tenants have similar work and fair admission keeps contention bounded.

- **0:11-0:17** / Reveal step 2: Trade-off / Shared worker pool
  Narration: Without tenant-aware queueing, one large batch can occupy the pool before other work arrives.

- **0:17-0:22** / Reveal step 3: Per-class queues
  Narration: Separate interactive and batch queues when their latency and retry policies differ.

- **0:22-0:26** / Reveal step 4: Trade-off / Per-class queues
  Narration: Capacity allocation and starvation prevention still need explicit rules.

- **0:26-0:32** / Reveal step 5: Dedicated capacity
  Narration: Isolate sustained heavy tenants or strict contractual workloads when the economics justify it.

- **0:32-0:36** / Reveal step 6: Trade-off / Dedicated capacity
  Narration: Dedicated pools add utilization, provisioning, migration, and operational overhead.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: Tenant isolation is not only about data access; it also needs a resource and scheduling contract. Which constraint would change your choice?

## References

- [Azure multitenant architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
