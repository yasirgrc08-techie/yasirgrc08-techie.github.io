# Pagination Without Surprises / Failure and Recovery

By Yasir Sharfi

## The Idea

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

## Visual Blueprint

1. **Spot duplicates**: A client sees the same record on adjacent pages during concurrent writes.
2. **Inspect ordering**: Check whether the query uses a unique tie-breaker and whether the cursor includes it.
3. **Check the contract**: Distinguish a live feed from a snapshot before declaring every shift a database bug.
4. **Fix the predicate**: Align the next-page comparison with the exact sort tuple and direction.
5. **Replay a fixed fixture**: Insert tied timestamps and concurrent updates while traversing every page.
6. **Verify coverage**: Compare visited IDs with the expected contract, including intentional exclusions and deleted rows.

## Caption

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

1. Spot duplicates
A client sees the same record on adjacent pages during concurrent writes.

2. Inspect ordering
Check whether the query uses a unique tie-breaker and whether the cursor includes it.

3. Check the contract
Distinguish a live feed from a snapshot before declaring every shift a database bug.

4. Fix the predicate
Align the next-page comparison with the exact sort tuple and direction.

5. Replay a fixed fixture
Insert tied timestamps and concurrent updates while traversing every page.

6. Verify coverage
Compare visited IDs with the expected contract, including intentional exclusions and deleted rows.

The takeaway: A cursor is an ordering contract, not just an encoded page number.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #pagination #postgresql

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Page two can repeat or skip records even when every query succeeds.

- **0:05-0:10** / Reveal step 1: Spot duplicates
  Narration: A client sees the same record on adjacent pages during concurrent writes.

- **0:10-0:16** / Reveal step 2: Inspect ordering
  Narration: Check whether the query uses a unique tie-breaker and whether the cursor includes it.

- **0:16-0:22** / Reveal step 3: Check the contract
  Narration: Distinguish a live feed from a snapshot before declaring every shift a database bug.

- **0:22-0:27** / Reveal step 4: Fix the predicate
  Narration: Align the next-page comparison with the exact sort tuple and direction.

- **0:27-0:31** / Reveal step 5: Replay a fixed fixture
  Narration: Insert tied timestamps and concurrent updates while traversing every page.

- **0:31-0:37** / Reveal step 6: Verify coverage
  Narration: Compare visited IDs with the expected contract, including intentional exclusions and deleted rows.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: A cursor is an ordering contract, not just an encoded page number. What evidence would disprove your first diagnosis?

## References

- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
