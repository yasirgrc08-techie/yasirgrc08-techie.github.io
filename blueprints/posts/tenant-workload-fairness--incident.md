# Multi-Tenant Fairness / Failure and Recovery

By Yasir Sharfi

## The Idea

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

## Visual Blueprint

1. **Identify the affected cohort**: Compare latency and errors by safe tenant class and operation type.
2. **Find the shared constraint**: Inspect queue occupancy, connection use, storage contention, and expensive query patterns.
3. **Throttle the offender fairly**: Bound heavy work without revoking unrelated authorization or blocking all customers.
4. **Restore useful service**: Reserve capacity for essential interactive operations and recovery tasks.
5. **Fix scheduling rules**: Add explicit admission and starvation protection based on the demonstrated workload.
6. **Re-run the neighbor test**: Confirm the unaffected tenant's service objective holds during another controlled overload.

## Caption

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

1. Identify the affected cohort
Compare latency and errors by safe tenant class and operation type.

2. Find the shared constraint
Inspect queue occupancy, connection use, storage contention, and expensive query patterns.

3. Throttle the offender fairly
Bound heavy work without revoking unrelated authorization or blocking all customers.

4. Restore useful service
Reserve capacity for essential interactive operations and recovery tasks.

5. Fix scheduling rules
Add explicit admission and starvation protection based on the demonstrated workload.

6. Re-run the neighbor test
Confirm the unaffected tenant's service objective holds during another controlled overload.

The takeaway: Tenant isolation is not only about data access; it also needs a resource and scheduling contract.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #multitenant #fairness

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A single busy customer should not quietly become everyone else's latency problem.

- **0:05-0:10** / Reveal step 1: Identify the affected cohort
  Narration: Compare latency and errors by safe tenant class and operation type.

- **0:10-0:15** / Reveal step 2: Find the shared constraint
  Narration: Inspect queue occupancy, connection use, storage contention, and expensive query patterns.

- **0:15-0:20** / Reveal step 3: Throttle the offender fairly
  Narration: Bound heavy work without revoking unrelated authorization or blocking all customers.

- **0:20-0:24** / Reveal step 4: Restore useful service
  Narration: Reserve capacity for essential interactive operations and recovery tasks.

- **0:24-0:29** / Reveal step 5: Fix scheduling rules
  Narration: Add explicit admission and starvation protection based on the demonstrated workload.

- **0:29-0:34** / Reveal step 6: Re-run the neighbor test
  Narration: Confirm the unaffected tenant's service objective holds during another controlled overload.

- **0:34-0:44** / Takeaway and discussion prompt
  Narration: Tenant isolation is not only about data access; it also needs a resource and scheduling contract. What evidence would disprove your first diagnosis?

## References

- [Azure multitenant architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
