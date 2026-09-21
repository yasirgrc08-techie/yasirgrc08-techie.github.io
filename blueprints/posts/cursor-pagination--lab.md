# Pagination Without Surprises / Build and Validate

By Yasir Sharfi

## The Idea

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

## Visual Blueprint

1. **Seed tied timestamps**: Create a local table with many records sharing a timestamp and a unique integer ID.
2. **Compare two queries**: Traverse with offset pagination and with a timestamp-plus-ID keyset cursor.
3. **Introduce writes**: Insert new records between page requests and document each method's behavior.
4. **Delete a boundary row**: Remove the last item from a page and verify that the next cursor still has defined semantics.
5. **Inspect the plan**: Measure scanned rows and latency with and without the supporting composite index.
6. **State the guarantee**: Publish whether your example offers live traversal or a stable snapshot and test that exact contract.

## Caption

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

1. Seed tied timestamps
Create a local table with many records sharing a timestamp and a unique integer ID.

2. Compare two queries
Traverse with offset pagination and with a timestamp-plus-ID keyset cursor.

3. Introduce writes
Insert new records between page requests and document each method's behavior.

4. Delete a boundary row
Remove the last item from a page and verify that the next cursor still has defined semantics.

5. Inspect the plan
Measure scanned rows and latency with and without the supporting composite index.

6. State the guarantee
Publish whether your example offers live traversal or a stable snapshot and test that exact contract.

The takeaway: A cursor is an ordering contract, not just an encoded page number.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #pagination #postgresql

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Page two can repeat or skip records even when every query succeeds.

- **0:05-0:11** / Reveal step 1: Seed tied timestamps
  Narration: Create a local table with many records sharing a timestamp and a unique integer ID.

- **0:11-0:15** / Reveal step 2: Compare two queries
  Narration: Traverse with offset pagination and with a timestamp-plus-ID keyset cursor.

- **0:15-0:20** / Reveal step 3: Introduce writes
  Narration: Insert new records between page requests and document each method's behavior.

- **0:20-0:27** / Reveal step 4: Delete a boundary row
  Narration: Remove the last item from a page and verify that the next cursor still has defined semantics.

- **0:27-0:32** / Reveal step 5: Inspect the plan
  Narration: Measure scanned rows and latency with and without the supporting composite index.

- **0:32-0:39** / Reveal step 6: State the guarantee
  Narration: Publish whether your example offers live traversal or a stable snapshot and test that exact contract.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: A cursor is an ordering contract, not just an encoded page number. How would you reproduce this with synthetic data?

## References

- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
