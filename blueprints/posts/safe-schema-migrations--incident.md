# Schema Changes Without Surprises / Failure and Recovery

By Yasir Sharfi

## The Idea

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

## Visual Blueprint

1. **Identify incompatible traffic**: Errors appear only on old application instances after the migration.
2. **Check the compatibility matrix**: Find which query or write contract no longer matches the database.
3. **Stop further contraction**: Pause destructive cleanup and preserve the old representation where possible.
4. **Choose rollback or repair**: Use the preplanned data-compatible recovery path instead of blindly reverting application code.
5. **Validate backfilled rows**: Compare sampled and invariant-based checks across the full dataset.
6. **Add mixed-version tests**: Run old and new clients against each transitional schema state.

## Caption

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

1. Identify incompatible traffic
Errors appear only on old application instances after the migration.

2. Check the compatibility matrix
Find which query or write contract no longer matches the database.

3. Stop further contraction
Pause destructive cleanup and preserve the old representation where possible.

4. Choose rollback or repair
Use the preplanned data-compatible recovery path instead of blindly reverting application code.

5. Validate backfilled rows
Compare sampled and invariant-based checks across the full dataset.

6. Add mixed-version tests
Run old and new clients against each transitional schema state.

The takeaway: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #migrations #deployment

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A migration can succeed while the old application version is still serving traffic.

- **0:06-0:10** / Reveal step 1: Identify incompatible traffic
  Narration: Errors appear only on old application instances after the migration.

- **0:10-0:15** / Reveal step 2: Check the compatibility matrix
  Narration: Find which query or write contract no longer matches the database.

- **0:15-0:19** / Reveal step 3: Stop further contraction
  Narration: Pause destructive cleanup and preserve the old representation where possible.

- **0:19-0:24** / Reveal step 4: Choose rollback or repair
  Narration: Use the preplanned data-compatible recovery path instead of blindly reverting application code.

- **0:24-0:28** / Reveal step 5: Validate backfilled rows
  Narration: Compare sampled and invariant-based checks across the full dataset.

- **0:28-0:32** / Reveal step 6: Add mixed-version tests
  Narration: Run old and new clients against each transitional schema state.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract. What evidence would disprove your first diagnosis?

## References

- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
