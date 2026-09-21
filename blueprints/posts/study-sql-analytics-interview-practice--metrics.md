# SQL and Analytics Interview Practice / Readiness Signals

By Yasir Sharfi

## The Idea

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

## Visual Blueprint

1. **Explain**: Input and output grain are explicit.
2. **Interpret / Explain**: Does the test fixture include a tie at the selection boundary?
3. **Implement**: Fixtures cover ties, duplicates, NULLs, and missing matches.
4. **Interpret / Implement**: Is the final output order specified separately from the window order?
5. **Verify**: Temporal metrics define ordering and observation windows.
6. **Interpret / Verify**: Are NULL salaries allowed, and if so, is their treatment explicit?

## Caption

Why can NOT IN behave unexpectedly with NULL?

SQL interview quality depends on the data contract as much as syntax. Define row grain, keys, timezone, ties, and missing-value meaning before choosing joins or windows. Use small hand-checkable datasets and adversarial fixtures to verify results rather than trusting a query because it executes.

1. Explain
Input and output grain are explicit.

2. Interpret / Explain
Does the test fixture include a tie at the selection boundary?

3. Implement
Fixtures cover ties, duplicates, NULLs, and missing matches.

4. Interpret / Implement
Is the final output order specified separately from the window order?

5. Verify
Temporal metrics define ordering and observation windows.

6. Interpret / Verify
Are NULL salaries allowed, and if so, is their treatment explicit?

The takeaway: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #sql #analytics

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why can NOT IN behave unexpectedly with NULL?

- **0:04-0:07** / Reveal step 1: Explain
  Narration: Input and output grain are explicit.

- **0:07-0:12** / Reveal step 2: Interpret / Explain
  Narration: Does the test fixture include a tie at the selection boundary?

- **0:12-0:16** / Reveal step 3: Implement
  Narration: Fixtures cover ties, duplicates, NULLs, and missing matches.

- **0:16-0:21** / Reveal step 4: Interpret / Implement
  Narration: Is the final output order specified separately from the window order?

- **0:21-0:24** / Reveal step 5: Verify
  Narration: Temporal metrics define ordering and observation windows.

- **0:24-0:29** / Reveal step 6: Interpret / Verify
  Narration: Are NULL salaries allowed, and if so, is their treatment explicit?

- **0:29-0:41** / Takeaway and discussion prompt
  Narration: Write the expected result for a tiny dataset before writing SQL. Include duplicates, ties, unmatched rows, NULLs, and immature time windows. Which metric could look healthy while users suffer?

## References

- [SQL and Analytics Interview Practice / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sql-analytics-interview-practice)
- [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
