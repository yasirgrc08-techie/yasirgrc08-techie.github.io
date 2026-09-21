# Schema Changes Without Surprises / Build and Validate

By Yasir Sharfi

## The Idea

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

## Visual Blueprint

1. **Create two clients**: Run old and new application versions against a disposable database.
2. **Add the new field**: Introduce a nullable or otherwise compatible representation.
3. **Backfill under writes**: Update existing rows while synthetic clients continue changing data.
4. **Compare semantics**: Check that both representations describe the same business state.
5. **Test rollback timing**: Revert application traffic before and after the switch point.
6. **Retire the old path**: Remove it only after demonstrating that no supported client still depends on it.

## Caption

A migration can succeed while the old application version is still serving traffic.

Assume rolling deployments where old and new application versions overlap. Schema compatibility must cover that overlap and the rollback window.

1. Create two clients
Run old and new application versions against a disposable database.

2. Add the new field
Introduce a nullable or otherwise compatible representation.

3. Backfill under writes
Update existing rows while synthetic clients continue changing data.

4. Compare semantics
Check that both representations describe the same business state.

5. Test rollback timing
Revert application traffic before and after the switch point.

6. Retire the old path
Remove it only after demonstrating that no supported client still depends on it.

The takeaway: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #migrations #deployment

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A migration can succeed while the old application version is still serving traffic.

- **0:06-0:10** / Reveal step 1: Create two clients
  Narration: Run old and new application versions against a disposable database.

- **0:10-0:13** / Reveal step 2: Add the new field
  Narration: Introduce a nullable or otherwise compatible representation.

- **0:13-0:17** / Reveal step 3: Backfill under writes
  Narration: Update existing rows while synthetic clients continue changing data.

- **0:17-0:21** / Reveal step 4: Compare semantics
  Narration: Check that both representations describe the same business state.

- **0:21-0:25** / Reveal step 5: Test rollback timing
  Narration: Revert application traffic before and after the switch point.

- **0:25-0:31** / Reveal step 6: Retire the old path
  Narration: Remove it only after demonstrating that no supported client still depends on it.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Expand, migrate, verify, then contract; deployment overlap is part of the schema contract. How would you reproduce this with synthetic data?

## References

- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
