# Indexes Follow Queries / Decision Guide

By Yasir Sharfi

## The Idea

The right index for one query can be wasted work for every write.

Use a relational workload with known filters, ordering, and row counts. Index selection is a measured read/write trade-off, not a checklist of popular columns.

## Visual Blueprint

1. **Composite index**: Choose a composite index for a demonstrated multi-column filter or ordering pattern.
2. **Trade-off / Composite index**: Column order and selectivity matter; one index is not automatically useful for every predicate combination.
3. **Covering access**: Include needed fields when index-only access can reduce costly table fetches.
4. **Trade-off / Covering access**: Larger indexes cost storage and writes, and visibility rules may still require table access.
5. **Sequential scan**: Accept a scan when the query reads much of a small or broad dataset.
6. **Trade-off / Sequential scan**: Forcing an index can make a broad query slower; compare actual work rather than visual plan labels.

## Caption

The right index for one query can be wasted work for every write.

Use a relational workload with known filters, ordering, and row counts. Index selection is a measured read/write trade-off, not a checklist of popular columns.

1. Composite index
Choose a composite index for a demonstrated multi-column filter or ordering pattern.

2. Trade-off / Composite index
Column order and selectivity matter; one index is not automatically useful for every predicate combination.

3. Covering access
Include needed fields when index-only access can reduce costly table fetches.

4. Trade-off / Covering access
Larger indexes cost storage and writes, and visibility rules may still require table access.

5. Sequential scan
Accept a scan when the query reads much of a small or broad dataset.

6. Trade-off / Sequential scan
Forcing an index can make a broad query slower; compare actual work rather than visual plan labels.

The takeaway: An index is a workload-specific data structure with a write bill attached.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #postgresql #indexes

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: The right index for one query can be wasted work for every write.

- **0:06-0:11** / Reveal step 1: Composite index
  Narration: Choose a composite index for a demonstrated multi-column filter or ordering pattern.

- **0:11-0:17** / Reveal step 2: Trade-off / Composite index
  Narration: Column order and selectivity matter; one index is not automatically useful for every predicate combination.

- **0:17-0:22** / Reveal step 3: Covering access
  Narration: Include needed fields when index-only access can reduce costly table fetches.

- **0:22-0:28** / Reveal step 4: Trade-off / Covering access
  Narration: Larger indexes cost storage and writes, and visibility rules may still require table access.

- **0:28-0:34** / Reveal step 5: Sequential scan
  Narration: Accept a scan when the query reads much of a small or broad dataset.

- **0:34-0:41** / Reveal step 6: Trade-off / Sequential scan
  Narration: Forcing an index can make a broad query slower; compare actual work rather than visual plan labels.

- **0:41-0:49** / Takeaway and discussion prompt
  Narration: An index is a workload-specific data structure with a write bill attached. Which constraint would change your choice?

## References

- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
