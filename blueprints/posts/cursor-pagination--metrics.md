# Pagination Without Surprises / Metrics That Matter

By Yasir Sharfi

## The Idea

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

## Visual Blueprint

1. **Rows examined**: Compare rows scanned with rows returned for deep pages under representative filters.
2. **Interpret / Rows examined**: A fast first page does not establish that page ten thousand has acceptable cost.
3. **Duplicate IDs**: Track repeated identifiers in a controlled traversal where the contract forbids repeats.
4. **Interpret / Duplicate IDs**: Changing filters midway invalidates the comparison; record cursor and query context.
5. **Cursor failures**: Count rejected, expired, and malformed cursors separately from internal errors.
6. **Interpret / Cursor failures**: An expired snapshot is a client-visible state, not a reason to silently restart at page one.

## Caption

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

1. Rows examined
Compare rows scanned with rows returned for deep pages under representative filters.

2. Interpret / Rows examined
A fast first page does not establish that page ten thousand has acceptable cost.

3. Duplicate IDs
Track repeated identifiers in a controlled traversal where the contract forbids repeats.

4. Interpret / Duplicate IDs
Changing filters midway invalidates the comparison; record cursor and query context.

5. Cursor failures
Count rejected, expired, and malformed cursors separately from internal errors.

6. Interpret / Cursor failures
An expired snapshot is a client-visible state, not a reason to silently restart at page one.

The takeaway: A cursor is an ordering contract, not just an encoded page number.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #pagination #postgresql

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Page two can repeat or skip records even when every query succeeds.

- **0:05-0:10** / Reveal step 1: Rows examined
  Narration: Compare rows scanned with rows returned for deep pages under representative filters.

- **0:10-0:16** / Reveal step 2: Interpret / Rows examined
  Narration: A fast first page does not establish that page ten thousand has acceptable cost.

- **0:16-0:21** / Reveal step 3: Duplicate IDs
  Narration: Track repeated identifiers in a controlled traversal where the contract forbids repeats.

- **0:21-0:26** / Reveal step 4: Interpret / Duplicate IDs
  Narration: Changing filters midway invalidates the comparison; record cursor and query context.

- **0:26-0:30** / Reveal step 5: Cursor failures
  Narration: Count rejected, expired, and malformed cursors separately from internal errors.

- **0:30-0:37** / Reveal step 6: Interpret / Cursor failures
  Narration: An expired snapshot is a client-visible state, not a reason to silently restart at page one.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: A cursor is an ordering contract, not just an encoded page number. Which metric could look healthy while users suffer?

## References

- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
