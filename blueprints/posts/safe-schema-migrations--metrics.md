# Schema Changes Without Surprises / Metrics That Matter

By Yasir Sharfi

## The Idea

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

## Visual Blueprint

1. **Backfill progress**: Track processed ranges, retries, and remaining rows with durable checkpoints.
2. **Interpret / Backfill progress**: A percentage alone does not show whether concurrent writes were incorporated correctly.
3. **Lock duration**: Measure blocking and transaction impact during each schema operation.
4. **Interpret / Lock duration**: An operation called online may still take locks at important phases.
5. **Representation drift**: Compare old and new values while both paths exist.
6. **Interpret / Representation drift**: Matching row counts do not prove equivalent business meaning or complete transformation.

## Caption

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

1. Backfill progress
Track processed ranges, retries, and remaining rows with durable checkpoints.

2. Interpret / Backfill progress
A percentage alone does not show whether concurrent writes were incorporated correctly.

3. Lock duration
Measure blocking and transaction impact during each schema operation.

4. Interpret / Lock duration
An operation called online may still take locks at important phases.

5. Representation drift
Compare old and new values while both paths exist.

6. Interpret / Representation drift
Matching row counts do not prove equivalent business meaning or complete transformation.

The takeaway: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #migrations #deployment

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A migration can succeed while the old application version is still serving traffic.

- **0:06-0:10** / Reveal step 1: Backfill progress
  Narration: Track processed ranges, retries, and remaining rows with durable checkpoints.

- **0:10-0:15** / Reveal step 2: Interpret / Backfill progress
  Narration: A percentage alone does not show whether concurrent writes were incorporated correctly.

- **0:15-0:19** / Reveal step 3: Lock duration
  Narration: Measure blocking and transaction impact during each schema operation.

- **0:19-0:24** / Reveal step 4: Interpret / Lock duration
  Narration: An operation called online may still take locks at important phases.

- **0:24-0:28** / Reveal step 5: Representation drift
  Narration: Compare old and new values while both paths exist.

- **0:28-0:33** / Reveal step 6: Interpret / Representation drift
  Narration: Matching row counts do not prove equivalent business meaning or complete transformation.

- **0:33-0:42** / Takeaway and discussion prompt
  Narration: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract. Which metric could look healthy while users suffer?

## References

- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
