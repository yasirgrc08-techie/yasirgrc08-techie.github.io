# Capacity Estimates and Data Models That Matter / Build and Validate

By Yasir Sharfi

## The Idea

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

## Visual Blueprint

1. **Set up the scenario**: Assume 20 million requests/day, a 10x peak factor, 200 ms mean time in system at peak, and 1 KB of durable event data per request.
2. **Experiment 1**: Compute average load: 20,000,000 / 86,400 is about 231 requests/second. A 10x illustrative peak is about 2,315 requests/second.
3. **Experiment 2**: Using L = lambda times W under the relevant steady-state assumptions, about 2,315 * 0.2 gives 463 requests in the system on average at that load.
4. **Experiment 3**: At decimal 1 KB per event, raw growth is about 20 GB/day. Thirty days is about 600 GB before replication, indexes, metadata, and compression.
5. **Expected evidence**: The calculation supplies approximate rate, concurrency, and storage dimensions with clear assumptions.
6. **Check the result**: Are decimal and binary storage units labeled consistently?

## Caption

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

1. Set up the scenario
Assume 20 million requests/day, a 10x peak factor, 200 ms mean time in system at peak, and 1 KB of durable event data per request.

2. Experiment 1
Compute average load: 20,000,000 / 86,400 is about 231 requests/second. A 10x illustrative peak is about 2,315 requests/second.

3. Experiment 2
Using L = lambda times W under the relevant steady-state assumptions, about 2,315 * 0.2 gives 463 requests in the system on average at that load.

4. Experiment 3
At decimal 1 KB per event, raw growth is about 20 GB/day. Thirty days is about 600 GB before replication, indexes, metadata, and compression.

5. Expected evidence
The calculation supplies approximate rate, concurrency, and storage dimensions with clear assumptions.

6. Check the result
Are decimal and binary storage units labeled consistently?

The takeaway: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #capacity #estimation

## Reel Storyboard

Suggested duration: about 61 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Can I choose a database from data volume alone?

- **0:04-0:14** / Reveal step 1: Set up the scenario
  Narration: Assume 20 million requests/day, a 10x peak factor, 200 ms mean time in system at peak, and 1 KB of durable event data per request.

- **0:14-0:22** / Reveal step 2: Experiment 1
  Narration: Compute average load: 20,000,000 / 86,400 is about 231 requests/second. A 10x illustrative peak is about 2,315 requests/second.

- **0:22-0:33** / Reveal step 3: Experiment 2
  Narration: Using L = lambda times W under the relevant steady-state assumptions, about 2,315 * 0.2 gives 463 requests in the system on average at that load.

- **0:33-0:43** / Reveal step 4: Experiment 3
  Narration: At decimal 1 KB per event, raw growth is about 20 GB/day. Thirty days is about 600 GB before replication, indexes, metadata, and compression.

- **0:43-0:48** / Reveal step 5: Expected evidence
  Narration: The calculation supplies approximate rate, concurrency, and storage dimensions with clear assumptions.

- **0:48-0:52** / Reveal step 6: Check the result
  Narration: Are decimal and binary storage units labeled consistently?

- **0:52-1:01** / Takeaway and discussion prompt
  Narration: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate. How would you reproduce this with synthetic data?

## References

- [Capacity Estimates and Data Models That Matter / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=capacity-estimation-data-modeling)
- [Azure data partitioning guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Google SRE workbook](https://sre.google/workbook/table-of-contents/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
