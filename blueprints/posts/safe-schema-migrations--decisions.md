# Schema Changes Without Surprises / Decision Guide

By Yasir Sharfi

## The Idea

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

## Visual Blueprint

1. **Additive change**: Prefer an additive change when old and new versions must coexist.
2. **Trade-off / Additive change**: Temporary duplicate fields or paths need reconciliation and a clear retirement owner.
3. **Blocking migration**: Use a blocking change only when the maintenance window and lock impact are acceptable.
4. **Trade-off / Blocking migration**: A small development table does not predict lock duration on production-sized data.
5. **Online backfill**: Use incremental backfill for large datasets with active writes.
6. **Trade-off / Online backfill**: Checkpointing and update races must be tested so a completed counter does not hide stale values.

## Caption

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

1. Additive change
Prefer an additive change when old and new versions must coexist.

2. Trade-off / Additive change
Temporary duplicate fields or paths need reconciliation and a clear retirement owner.

3. Blocking migration
Use a blocking change only when the maintenance window and lock impact are acceptable.

4. Trade-off / Blocking migration
A small development table does not predict lock duration on production-sized data.

5. Online backfill
Use incremental backfill for large datasets with active writes.

6. Trade-off / Online backfill
Checkpointing and update races must be tested so a completed counter does not hide stale values.

The takeaway: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #migrations #deployment

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A migration can succeed while the old application version is still serving traffic.

- **0:06-0:11** / Reveal step 1: Additive change
  Narration: Prefer an additive change when old and new versions must coexist.

- **0:11-0:16** / Reveal step 2: Trade-off / Additive change
  Narration: Temporary duplicate fields or paths need reconciliation and a clear retirement owner.

- **0:16-0:22** / Reveal step 3: Blocking migration
  Narration: Use a blocking change only when the maintenance window and lock impact are acceptable.

- **0:22-0:27** / Reveal step 4: Trade-off / Blocking migration
  Narration: A small development table does not predict lock duration on production-sized data.

- **0:27-0:31** / Reveal step 5: Online backfill
  Narration: Use incremental backfill for large datasets with active writes.

- **0:31-0:38** / Reveal step 6: Trade-off / Online backfill
  Narration: Checkpointing and update races must be tested so a completed counter does not hide stale values.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract. Which constraint would change your choice?

## References

- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
