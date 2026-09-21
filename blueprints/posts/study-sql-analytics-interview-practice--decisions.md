# SQL and Analytics Interview Practice / Practice Decisions

By Yasir Sharfi

## The Idea

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

## Visual Blueprint

1. **Grain comes before aggregation**: State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.
2. **Watch for**: Using DISTINCT to hide an incorrect join.
3. **Window functions preserve rows**: ROW_NUMBER selects rows under a deterministic order, RANK leaves gaps after ties, and DENSE_RANK groups distinct rank levels without gaps.
4. **Watch for**: Leaving tie and timezone rules unspecified.
5. **Time and missingness are business definitions**: A NULL may mean unknown rather than zero. A day depends on timezone, and a retention cohort must have a complete observation window.
6. **Watch for**: Counting immature cohorts as if their observation window were complete.

## Caption

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

1. Grain comes before aggregation
State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.

2. Watch for
Using DISTINCT to hide an incorrect join.

3. Window functions preserve rows
ROW_NUMBER selects rows under a deterministic order, RANK leaves gaps after ties, and DENSE_RANK groups distinct rank levels without gaps.

4. Watch for
Leaving tie and timezone rules unspecified.

5. Time and missingness are business definitions
A NULL may mean unknown rather than zero. A day depends on timezone, and a retention cohort must have a complete observation window.

6. Watch for
Counting immature cohorts as if their observation window were complete.

The takeaway: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #sql #analytics

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why can NOT IN behave unexpectedly with NULL?

- **0:04-0:12** / Reveal step 1: Grain comes before aggregation
  Narration: State what each input and output row represents. Joining two child tables can multiply records before SUM or COUNT executes.

- **0:12-0:15** / Reveal step 2: Watch for
  Narration: Using DISTINCT to hide an incorrect join.

- **0:15-0:23** / Reveal step 3: Window functions preserve rows
  Narration: ROW_NUMBER selects rows under a deterministic order, RANK leaves gaps after ties, and DENSE_RANK groups distinct rank levels without gaps.

- **0:23-0:26** / Reveal step 4: Watch for
  Narration: Leaving tie and timezone rules unspecified.

- **0:26-0:36** / Reveal step 5: Time and missingness are business definitions
  Narration: A NULL may mean unknown rather than zero. A day depends on timezone, and a retention cohort must have a complete observation window.

- **0:36-0:40** / Reveal step 6: Watch for
  Narration: Counting immature cohorts as if their observation window were complete.

- **0:40-0:51** / Takeaway and discussion prompt
  Narration: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows. Which constraint would change your choice?

## References

- [SQL and Analytics Interview Practice / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sql-analytics-interview-practice)
- [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
