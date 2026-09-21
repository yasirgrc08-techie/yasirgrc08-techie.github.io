# Multi-Tenant Fairness / Build and Validate

By Yasir Sharfi

## The Idea

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

## Visual Blueprint

1. **Create two workloads**: Run one steady interactive tenant and one bursty batch tenant with synthetic data.
2. **Record the shared baseline**: Measure both tenants before introducing overload or expensive queries.
3. **Overload one tenant**: Increase only the batch workload and identify the shared limiting resource.
4. **Add fair admission**: Introduce per-class permits or queue scheduling without changing authorization semantics.
5. **Check starvation**: Confirm small work completes while large jobs still make bounded progress.
6. **Document the boundary**: Record what isolation is guaranteed, approximated, and still dependent on shared storage.

## Caption

A single busy customer should not quietly become everyone else's latency problem.

Assume shared compute and storage across tenants. Authorization isolation, resource fairness, and billing attribution solve different problems.

1. Create two workloads
Run one steady interactive tenant and one bursty batch tenant with synthetic data.

2. Record the shared baseline
Measure both tenants before introducing overload or expensive queries.

3. Overload one tenant
Increase only the batch workload and identify the shared limiting resource.

4. Add fair admission
Introduce per-class permits or queue scheduling without changing authorization semantics.

5. Check starvation
Confirm small work completes while large jobs still make bounded progress.

6. Document the boundary
Record what isolation is guaranteed, approximated, and still dependent on shared storage.

The takeaway: Tenant isolation is not only about data access; it also needs a resource and scheduling contract.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #multitenant #fairness

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A single busy customer should not quietly become everyone else's latency problem.

- **0:05-0:11** / Reveal step 1: Create two workloads
  Narration: Run one steady interactive tenant and one bursty batch tenant with synthetic data.

- **0:11-0:15** / Reveal step 2: Record the shared baseline
  Narration: Measure both tenants before introducing overload or expensive queries.

- **0:15-0:20** / Reveal step 3: Overload one tenant
  Narration: Increase only the batch workload and identify the shared limiting resource.

- **0:20-0:24** / Reveal step 4: Add fair admission
  Narration: Introduce per-class permits or queue scheduling without changing authorization semantics.

- **0:24-0:29** / Reveal step 5: Check starvation
  Narration: Confirm small work completes while large jobs still make bounded progress.

- **0:29-0:34** / Reveal step 6: Document the boundary
  Narration: Record what isolation is guaranteed, approximated, and still dependent on shared storage.

- **0:34-0:44** / Takeaway and discussion prompt
  Narration: Tenant isolation is not only about data access; it also needs a resource and scheduling contract. How would you reproduce this with synthetic data?

## References

- [Azure multitenant architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
