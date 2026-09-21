# SQL and Analytics Interview Practice / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

## Visual Blueprint

1. **Trap 1**: Using DISTINCT to hide an incorrect join.
2. **Counter-check 1**: Input and output grain are explicit.
3. **Trap 2**: Leaving tie and timezone rules unspecified.
4. **Counter-check 2**: Fixtures cover ties, duplicates, NULLs, and missing matches.
5. **Trap 3**: Counting immature cohorts as if their observation window were complete.
6. **Counter-check 3**: Temporal metrics define ordering and observation windows.

## Caption

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

1. Trap 1
Using DISTINCT to hide an incorrect join.

2. Counter-check 1
Input and output grain are explicit.

3. Trap 2
Leaving tie and timezone rules unspecified.

4. Counter-check 2
Fixtures cover ties, duplicates, NULLs, and missing matches.

5. Trap 3
Counting immature cohorts as if their observation window were complete.

6. Counter-check 3
Temporal metrics define ordering and observation windows.

The takeaway: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #sql #analytics

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why can NOT IN behave unexpectedly with NULL?

- **0:04-0:07** / Reveal step 1: Trap 1
  Narration: Using DISTINCT to hide an incorrect join.

- **0:07-0:10** / Reveal step 2: Counter-check 1
  Narration: Input and output grain are explicit.

- **0:10-0:13** / Reveal step 3: Trap 2
  Narration: Leaving tie and timezone rules unspecified.

- **0:13-0:17** / Reveal step 4: Counter-check 2
  Narration: Fixtures cover ties, duplicates, NULLs, and missing matches.

- **0:17-0:21** / Reveal step 5: Trap 3
  Narration: Counting immature cohorts as if their observation window were complete.

- **0:21-0:24** / Reveal step 6: Counter-check 3
  Narration: Temporal metrics define ordering and observation windows.

- **0:24-0:36** / Takeaway and discussion prompt
  Narration: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows. What evidence would disprove your first diagnosis?

## References

- [SQL and Analytics Interview Practice / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sql-analytics-interview-practice)
- [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
