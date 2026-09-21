# Pagination Without Surprises / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

## Visual Blueprint

1. **Specify the order**: Sort by a deterministic tuple such as creation time and immutable ID, not by a nonunique timestamp alone.
2. **Bound the page**: Enforce a server-side page-size limit and return only the fields required by the client.
3. **Choose the cursor**: Encode the last ordering tuple and relevant filters; validate it instead of trusting arbitrary client SQL.
4. **Match the index**: Use an index aligned with the filter and ordering tuple, then inspect the plan with realistic data.
5. **Define change semantics**: Document what concurrent inserts, edits, and deletions mean for records between successive pages.
6. **Test the boundary**: Exercise equal timestamps, deleted cursor rows, empty pages, and forward traversal through a large dataset.

## Caption

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

1. Specify the order
Sort by a deterministic tuple such as creation time and immutable ID, not by a nonunique timestamp alone.

2. Bound the page
Enforce a server-side page-size limit and return only the fields required by the client.

3. Choose the cursor
Encode the last ordering tuple and relevant filters; validate it instead of trusting arbitrary client SQL.

4. Match the index
Use an index aligned with the filter and ordering tuple, then inspect the plan with realistic data.

5. Define change semantics
Document what concurrent inserts, edits, and deletions mean for records between successive pages.

6. Test the boundary
Exercise equal timestamps, deleted cursor rows, empty pages, and forward traversal through a large dataset.

The takeaway: A cursor is an ordering contract, not just an encoded page number.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #pagination #postgresql

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Page two can repeat or skip records even when every query succeeds.

- **0:05-0:13** / Reveal step 1: Specify the order
  Narration: Sort by a deterministic tuple such as creation time and immutable ID, not by a nonunique timestamp alone.

- **0:13-0:19** / Reveal step 2: Bound the page
  Narration: Enforce a server-side page-size limit and return only the fields required by the client.

- **0:19-0:26** / Reveal step 3: Choose the cursor
  Narration: Encode the last ordering tuple and relevant filters; validate it instead of trusting arbitrary client SQL.

- **0:26-0:33** / Reveal step 4: Match the index
  Narration: Use an index aligned with the filter and ordering tuple, then inspect the plan with realistic data.

- **0:33-0:39** / Reveal step 5: Define change semantics
  Narration: Document what concurrent inserts, edits, and deletions mean for records between successive pages.

- **0:39-0:45** / Reveal step 6: Test the boundary
  Narration: Exercise equal timestamps, deleted cursor rows, empty pages, and forward traversal through a large dataset.

- **0:45-0:53** / Takeaway and discussion prompt
  Narration: A cursor is an ordering contract, not just an encoded page number. Which bottleneck would you measure first?

## References

- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
