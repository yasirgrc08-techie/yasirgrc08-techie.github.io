# Pagination Without Surprises / Decision Guide

By Yasir Sharfi

## The Idea

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

## Visual Blueprint

1. **Offset pagination**: Use offsets for small or mostly static lists where jumping to a page number is a genuine requirement.
2. **Trade-off / Offset pagination**: Large offsets can scan discarded rows, and concurrent inserts can shift page boundaries.
3. **Keyset pagination**: Use keyset traversal for large ordered feeds with a stable cursor and no requirement for arbitrary page jumps.
4. **Trade-off / Keyset pagination**: Changing sort keys and reverse traversal require deliberate semantics rather than a token-shaped workaround.
5. **Snapshot results**: Use a snapshot when exports or audits require a consistent view across all pages.
6. **Trade-off / Snapshot results**: Snapshot lifetime, storage, and expiry become operational costs that need limits.

## Caption

Page two can repeat or skip records even when every query succeeds.

Consider a changing feed ordered by creation time. Define a stable tie-breaker and whether the client needs a snapshot or a best-effort live view.

1. Offset pagination
Use offsets for small or mostly static lists where jumping to a page number is a genuine requirement.

2. Trade-off / Offset pagination
Large offsets can scan discarded rows, and concurrent inserts can shift page boundaries.

3. Keyset pagination
Use keyset traversal for large ordered feeds with a stable cursor and no requirement for arbitrary page jumps.

4. Trade-off / Keyset pagination
Changing sort keys and reverse traversal require deliberate semantics rather than a token-shaped workaround.

5. Snapshot results
Use a snapshot when exports or audits require a consistent view across all pages.

6. Trade-off / Snapshot results
Snapshot lifetime, storage, and expiry become operational costs that need limits.

The takeaway: A cursor is an ordering contract, not just an encoded page number.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #pagination #postgresql

## Reel Storyboard

Suggested duration: about 52 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Page two can repeat or skip records even when every query succeeds.

- **0:05-0:13** / Reveal step 1: Offset pagination
  Narration: Use offsets for small or mostly static lists where jumping to a page number is a genuine requirement.

- **0:13-0:19** / Reveal step 2: Trade-off / Offset pagination
  Narration: Large offsets can scan discarded rows, and concurrent inserts can shift page boundaries.

- **0:19-0:27** / Reveal step 3: Keyset pagination
  Narration: Use keyset traversal for large ordered feeds with a stable cursor and no requirement for arbitrary page jumps.

- **0:27-0:33** / Reveal step 4: Trade-off / Keyset pagination
  Narration: Changing sort keys and reverse traversal require deliberate semantics rather than a token-shaped workaround.

- **0:33-0:39** / Reveal step 5: Snapshot results
  Narration: Use a snapshot when exports or audits require a consistent view across all pages.

- **0:39-0:44** / Reveal step 6: Trade-off / Snapshot results
  Narration: Snapshot lifetime, storage, and expiry become operational costs that need limits.

- **0:44-0:52** / Takeaway and discussion prompt
  Narration: A cursor is an ordering contract, not just an encoded page number. Which constraint would change your choice?

## References

- [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
