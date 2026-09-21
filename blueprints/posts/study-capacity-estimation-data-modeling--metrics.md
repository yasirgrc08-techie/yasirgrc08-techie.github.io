# Capacity Estimates and Data Models That Matter / Readiness Signals

By Yasir Sharfi

## The Idea

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

## Visual Blueprint

1. **Explain**: Each estimate names units and assumptions.
2. **Interpret / Explain**: Are decimal and binary storage units labeled consistently?
3. **Implement**: Read/write amplification and skew are considered.
4. **Interpret / Implement**: Are replicas and indexes added rather than silently assumed free?
5. **Verify**: Data keys support actual query and ownership needs.
6. **Interpret / Verify**: Does the peak factor represent a plausible workload shape rather than certainty?

## Caption

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

1. Explain
Each estimate names units and assumptions.

2. Interpret / Explain
Are decimal and binary storage units labeled consistently?

3. Implement
Read/write amplification and skew are considered.

4. Interpret / Implement
Are replicas and indexes added rather than silently assumed free?

5. Verify
Data keys support actual query and ownership needs.

6. Interpret / Verify
Does the peak factor represent a plausible workload shape rather than certainty?

The takeaway: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #capacity #estimation

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Can I choose a database from data volume alone?

- **0:04-0:07** / Reveal step 1: Explain
  Narration: Each estimate names units and assumptions.

- **0:07-0:11** / Reveal step 2: Interpret / Explain
  Narration: Are decimal and binary storage units labeled consistently?

- **0:11-0:14** / Reveal step 3: Implement
  Narration: Read/write amplification and skew are considered.

- **0:14-0:18** / Reveal step 4: Interpret / Implement
  Narration: Are replicas and indexes added rather than silently assumed free?

- **0:18-0:22** / Reveal step 5: Verify
  Narration: Data keys support actual query and ownership needs.

- **0:22-0:27** / Reveal step 6: Interpret / Verify
  Narration: Does the peak factor represent a plausible workload shape rather than certainty?

- **0:27-0:36** / Takeaway and discussion prompt
  Narration: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate. Which metric could look healthy while users suffer?

## References

- [Capacity Estimates and Data Models That Matter / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=capacity-estimation-data-modeling)
- [Azure data partitioning guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Google SRE workbook](https://sre.google/workbook/table-of-contents/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
