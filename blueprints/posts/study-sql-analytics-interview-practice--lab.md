# SQL and Analytics Interview Practice / Build and Validate

By Yasir Sharfi

## The Idea

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

## Visual Blueprint

1. **Set up the scenario**: A department has salaries 100, 100, 90, and 80.
2. **Experiment 1**: If the contract means two distinct salary levels, DENSE_RANK partitioned by department and ordered by salary descending assigns ranks 1,1,2,3.
3. **Experiment 2**: If the contract means exactly two employees, ROW_NUMBER with salary descending and a stable employee-ID tie-breaker returns two rows.
4. **Experiment 3**: Place the rank calculation in a CTE or subquery and filter in the outer query.
5. **Expected evidence**: Explain query performance using access patterns and observed plans.
6. **Check the result**: Does the test fixture include a tie at the selection boundary?

## Caption

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

1. Set up the scenario
A department has salaries 100, 100, 90, and 80.

2. Experiment 1
If the contract means two distinct salary levels, DENSE_RANK partitioned by department and ordered by salary descending assigns ranks 1,1,2,3.

3. Experiment 2
If the contract means exactly two employees, ROW_NUMBER with salary descending and a stable employee-ID tie-breaker returns two rows.

4. Experiment 3
Place the rank calculation in a CTE or subquery and filter in the outer query.

5. Expected evidence
Explain query performance using access patterns and observed plans.

6. Check the result
Does the test fixture include a tie at the selection boundary?

The takeaway: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #sql #analytics

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why can NOT IN behave unexpectedly with NULL?

- **0:04-0:08** / Reveal step 1: Set up the scenario
  Narration: A department has salaries 100, 100, 90, and 80.

- **0:08-0:16** / Reveal step 2: Experiment 1
  Narration: If the contract means two distinct salary levels, DENSE_RANK partitioned by department and ordered by salary descending assigns ranks 1,1,2,3.

- **0:16-0:24** / Reveal step 3: Experiment 2
  Narration: If the contract means exactly two employees, ROW_NUMBER with salary descending and a stable employee-ID tie-breaker returns two rows.

- **0:24-0:30** / Reveal step 4: Experiment 3
  Narration: Place the rank calculation in a CTE or subquery and filter in the outer query.

- **0:30-0:34** / Reveal step 5: Expected evidence
  Narration: Explain query performance using access patterns and observed plans.

- **0:34-0:39** / Reveal step 6: Check the result
  Narration: Does the test fixture include a tie at the selection boundary?

- **0:39-0:51** / Takeaway and discussion prompt
  Narration: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows. How would you reproduce this with synthetic data?

## References

- [SQL and Analytics Interview Practice / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sql-analytics-interview-practice)
- [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
