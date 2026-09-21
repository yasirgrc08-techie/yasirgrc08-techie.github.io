# Capacity Estimates and Data Models That Matter / Learning Roadmap

By Yasir Sharfi

## The Idea

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

## Visual Blueprint

1. **Build the mental model**: Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.
2. **Phase 1 / Days 1-3**: Estimate daily active users, actions per user, read/write ratio, and average payload. Convert to average rate and introduce a justified illustrative peak factor.
3. **Phase 2 / Days 4-6**: Estimate logical record size, daily growth, retention, replicas, indexes, and compression assumptions.
4. **Phase 3 / Days 7-10**: Write important queries before choosing partition keys or indexes.
5. **Phase 4 / Days 11-14**: Change peak traffic, payload size, and retention independently. Estimate concurrency using arrival rate and time in system under suitable steady-state assumptions.
6. **Prove readiness**: Each estimate names units and assumptions.

## Caption

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

1. Build the mental model
Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.

2. Phase 1 / Days 1-3
Estimate daily active users, actions per user, read/write ratio, and average payload. Convert to average rate and introduce a justified illustrative peak factor.

3. Phase 2 / Days 4-6
Estimate logical record size, daily growth, retention, replicas, indexes, and compression assumptions.

4. Phase 3 / Days 7-10
Write important queries before choosing partition keys or indexes.

5. Phase 4 / Days 11-14
Change peak traffic, payload size, and retention independently. Estimate concurrency using arrival rate and time in system under suitable steady-state assumptions.

6. Prove readiness
Each estimate names units and assumptions.

The takeaway: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #capacity #estimation

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Can I choose a database from data volume alone?

- **0:04-0:12** / Reveal step 1: Build the mental model
  Narration: Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.

- **0:12-0:22** / Reveal step 2: Phase 1 / Days 1-3
  Narration: Estimate daily active users, actions per user, read/write ratio, and average payload. Convert to average rate and introduce a justified illustrative peak factor.

- **0:22-0:27** / Reveal step 3: Phase 2 / Days 4-6
  Narration: Estimate logical record size, daily growth, retention, replicas, indexes, and compression assumptions.

- **0:27-0:31** / Reveal step 4: Phase 3 / Days 7-10
  Narration: Write important queries before choosing partition keys or indexes.

- **0:31-0:40** / Reveal step 5: Phase 4 / Days 11-14
  Narration: Change peak traffic, payload size, and retention independently. Estimate concurrency using arrival rate and time in system under suitable steady-state assumptions.

- **0:40-0:43** / Reveal step 6: Prove readiness
  Narration: Each estimate names units and assumptions.

- **0:43-0:51** / Takeaway and discussion prompt
  Narration: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate. Which bottleneck would you measure first?

## References

- [Capacity Estimates and Data Models That Matter / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=capacity-estimation-data-modeling)
- [Azure data partitioning guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Google SRE workbook](https://sre.google/workbook/table-of-contents/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
