# Capacity Estimates and Data Models That Matter / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

## Visual Blueprint

1. **Trap 1**: Using average traffic as if bursts and hotspots do not exist.
2. **Counter-check 1**: Each estimate names units and assumptions.
3. **Trap 2**: Ignoring index, replication, and retention overhead.
4. **Counter-check 2**: Read/write amplification and skew are considered.
5. **Trap 3**: Choosing partition keys before listing important queries.
6. **Counter-check 3**: Data keys support actual query and ownership needs.

## Caption

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

1. Trap 1
Using average traffic as if bursts and hotspots do not exist.

2. Counter-check 1
Each estimate names units and assumptions.

3. Trap 2
Ignoring index, replication, and retention overhead.

4. Counter-check 2
Read/write amplification and skew are considered.

5. Trap 3
Choosing partition keys before listing important queries.

6. Counter-check 3
Data keys support actual query and ownership needs.

The takeaway: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #capacity #estimation

## Reel Storyboard

Suggested duration: about 34 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Can I choose a database from data volume alone?

- **0:04-0:09** / Reveal step 1: Trap 1
  Narration: Using average traffic as if bursts and hotspots do not exist.

- **0:09-0:12** / Reveal step 2: Counter-check 1
  Narration: Each estimate names units and assumptions.

- **0:12-0:15** / Reveal step 3: Trap 2
  Narration: Ignoring index, replication, and retention overhead.

- **0:15-0:18** / Reveal step 4: Counter-check 2
  Narration: Read/write amplification and skew are considered.

- **0:18-0:21** / Reveal step 5: Trap 3
  Narration: Choosing partition keys before listing important queries.

- **0:21-0:25** / Reveal step 6: Counter-check 3
  Narration: Data keys support actual query and ownership needs.

- **0:25-0:34** / Takeaway and discussion prompt
  Narration: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate. What evidence would disprove your first diagnosis?

## References

- [Capacity Estimates and Data Models That Matter / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=capacity-estimation-data-modeling)
- [Azure data partitioning guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Google SRE workbook](https://sre.google/workbook/table-of-contents/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
