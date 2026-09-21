# Multi-Tenant Fairness / Metrics That Matter

By Yasir Sharfi

## The Idea

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

## Visual Blueprint

1. **Per-tenant completion**: Measure useful work completed within each service class's objective.
2. **Interpret / Per-tenant completion**: Aggregate success can look healthy while a small tenant cohort is repeatedly starved.
3. **Queue occupancy**: Track queue age and admitted concurrency by bounded tenant or workload categories.
4. **Interpret / Queue occupancy**: Avoid exposing sensitive tenant identifiers or exploding monitoring label cardinality.
5. **Resource attribution**: Estimate CPU, database, and storage demand per operation class.
6. **Interpret / Resource attribution**: Request count is a weak fairness proxy when request costs differ dramatically.

## Caption

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

1. Per-tenant completion
Measure useful work completed within each service class's objective.

2. Interpret / Per-tenant completion
Aggregate success can look healthy while a small tenant cohort is repeatedly starved.

3. Queue occupancy
Track queue age and admitted concurrency by bounded tenant or workload categories.

4. Interpret / Queue occupancy
Avoid exposing sensitive tenant identifiers or exploding monitoring label cardinality.

5. Resource attribution
Estimate CPU, database, and storage demand per operation class.

6. Interpret / Resource attribution
Request count is a weak fairness proxy when request costs differ dramatically.

The takeaway: Tenant isolation is not only about data access; it also needs a resource and scheduling contract.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #multitenant #fairness

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A single busy customer should not quietly become everyone else's latency problem.

- **0:05-0:09** / Reveal step 1: Per-tenant completion
  Narration: Measure useful work completed within each service class's objective.

- **0:09-0:15** / Reveal step 2: Interpret / Per-tenant completion
  Narration: Aggregate success can look healthy while a small tenant cohort is repeatedly starved.

- **0:15-0:20** / Reveal step 3: Queue occupancy
  Narration: Track queue age and admitted concurrency by bounded tenant or workload categories.

- **0:20-0:24** / Reveal step 4: Interpret / Queue occupancy
  Narration: Avoid exposing sensitive tenant identifiers or exploding monitoring label cardinality.

- **0:24-0:28** / Reveal step 5: Resource attribution
  Narration: Estimate CPU, database, and storage demand per operation class.

- **0:28-0:33** / Reveal step 6: Interpret / Resource attribution
  Narration: Request count is a weak fairness proxy when request costs differ dramatically.

- **0:33-0:43** / Takeaway and discussion prompt
  Narration: Tenant isolation is not only about data access; it also needs a resource and scheduling contract. Which metric could look healthy while users suffer?

## References

- [Azure multitenant architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
