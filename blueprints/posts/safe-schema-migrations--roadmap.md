# Schema Changes Without Surprises / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

## Visual Blueprint

1. **Map version compatibility**: List which application versions can read and write each schema state.
2. **Expand first**: Add compatible structures before requiring new readers or writers to use them.
3. **Backfill incrementally**: Use bounded batches with progress markers and a plan for concurrent updates.
4. **Validate both paths**: Compare old and new representations before switching authoritative reads.
5. **Switch deliberately**: Move traffic with observability and a clear rollback or forward-fix decision.
6. **Contract later**: Remove old fields only after old clients and the rollback window are retired.

## Caption

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

1. Map version compatibility
List which application versions can read and write each schema state.

2. Expand first
Add compatible structures before requiring new readers or writers to use them.

3. Backfill incrementally
Use bounded batches with progress markers and a plan for concurrent updates.

4. Validate both paths
Compare old and new representations before switching authoritative reads.

5. Switch deliberately
Move traffic with observability and a clear rollback or forward-fix decision.

6. Contract later
Remove old fields only after old clients and the rollback window are retired.

The takeaway: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #migrations #deployment

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A migration can succeed while the old application version is still serving traffic.

- **0:06-0:11** / Reveal step 1: Map version compatibility
  Narration: List which application versions can read and write each schema state.

- **0:11-0:16** / Reveal step 2: Expand first
  Narration: Add compatible structures before requiring new readers or writers to use them.

- **0:16-0:21** / Reveal step 3: Backfill incrementally
  Narration: Use bounded batches with progress markers and a plan for concurrent updates.

- **0:21-0:25** / Reveal step 4: Validate both paths
  Narration: Compare old and new representations before switching authoritative reads.

- **0:25-0:30** / Reveal step 5: Switch deliberately
  Narration: Move traffic with observability and a clear rollback or forward-fix decision.

- **0:30-0:36** / Reveal step 6: Contract later
  Narration: Remove old fields only after old clients and the rollback window are retired.

- **0:36-0:44** / Takeaway and discussion prompt
  Narration: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract. Which bottleneck would you measure first?

## References

- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
