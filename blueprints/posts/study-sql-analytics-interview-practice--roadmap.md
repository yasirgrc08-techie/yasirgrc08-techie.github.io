# SQL and Analytics Interview Practice / Learning Roadmap

By Yasir Sharfi

## The Idea

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

## Visual Blueprint

1. **Build the mental model**: State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.
2. **Phase 1 / Days 1-3**: Practice inner and left joins, aggregation, anti-joins, and NULL behavior. Build customers, orders, and payments with deliberate duplicate and missing relationships.
3. **Phase 2 / Days 4-6**: Practice top-N per group, latest-record deduplication, running totals, and gaps-and-islands. Define ties and stable secondary keys.
4. **Phase 3 / Days 7-10**: Define cohorts, day-based retention, ordered funnels, and rolling windows.
5. **Phase 4 / Days 11-14**: Inspect plans on a larger synthetic dataset, add justified indexes, and compare results before and after optimization.
6. **Prove readiness**: Input and output grain are explicit.

## Caption

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

1. Build the mental model
State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.

2. Phase 1 / Days 1-3
Practice inner and left joins, aggregation, anti-joins, and NULL behavior. Build customers, orders, and payments with deliberate duplicate and missing relationships.

3. Phase 2 / Days 4-6
Practice top-N per group, latest-record deduplication, running totals, and gaps-and-islands. Define ties and stable secondary keys.

4. Phase 3 / Days 7-10
Define cohorts, day-based retention, ordered funnels, and rolling windows.

5. Phase 4 / Days 11-14
Inspect plans on a larger synthetic dataset, add justified indexes, and compare results before and after optimization.

6. Prove readiness
Input and output grain are explicit.

The takeaway: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #sql #analytics

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why can NOT IN behave unexpectedly with NULL?

- **0:04-0:12** / Reveal step 1: Build the mental model
  Narration: State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.

- **0:12-0:21** / Reveal step 2: Phase 1 / Days 1-3
  Narration: Practice inner and left joins, aggregation, anti-joins, and NULL behavior. Build customers, orders, and payments with deliberate duplicate and missing relationships.

- **0:21-0:28** / Reveal step 3: Phase 2 / Days 4-6
  Narration: Practice top-N per group, latest-record deduplication, running totals, and gaps-and-islands. Define ties and stable secondary keys.

- **0:28-0:32** / Reveal step 4: Phase 3 / Days 7-10
  Narration: Define cohorts, day-based retention, ordered funnels, and rolling windows.

- **0:32-0:39** / Reveal step 5: Phase 4 / Days 11-14
  Narration: Inspect plans on a larger synthetic dataset, add justified indexes, and compare results before and after optimization.

- **0:39-0:42** / Reveal step 6: Prove readiness
  Narration: Input and output grain are explicit.

- **0:42-0:53** / Takeaway and discussion prompt
  Narration: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows. Which bottleneck would you measure first?

## References

- [SQL and Analytics Interview Practice / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sql-analytics-interview-practice)
- [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
