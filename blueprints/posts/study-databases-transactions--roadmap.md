# Databases, SQL, Indexes, and Transactions / Learning Roadmap

By Yasir Sharfi

## The Idea

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

## Visual Blueprint

1. **Build the mental model**: Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.
2. **Phase 1 / Week 1**: Build customers, orders, and items with primary and foreign keys. Practice joins, grouping, NULL behavior, and window functions.
3. **Phase 2 / Week 2**: Create a larger synthetic dataset and inspect query plans. Compare selective lookups, ordered history, and broad scans.
4. **Phase 3 / Week 3**: Use two sessions to reproduce a lost update or last-item reservation race. Add the database-enforced invariant and choose an appropriate transaction strategy.
5. **Phase 4 / Week 4**: Practice a backward-compatible schema change, migration rollback or forward repair, backup, and restore in a disposable database.
6. **Prove readiness**: Schema keys and output grain are explicit.

## Caption

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

1. Build the mental model
Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.

2. Phase 1 / Week 1
Build customers, orders, and items with primary and foreign keys. Practice joins, grouping, NULL behavior, and window functions.

3. Phase 2 / Week 2
Create a larger synthetic dataset and inspect query plans. Compare selective lookups, ordered history, and broad scans.

4. Phase 3 / Week 3
Use two sessions to reproduce a lost update or last-item reservation race. Add the database-enforced invariant and choose an appropriate transaction strategy.

5. Phase 4 / Week 4
Practice a backward-compatible schema change, migration rollback or forward repair, backup, and restore in a disposable database.

6. Prove readiness
Schema keys and output grain are explicit.

The takeaway: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #databases #transactions

## Reel Storyboard

Suggested duration: about 56 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why not put an index on every column?

- **0:04-0:12** / Reveal step 1: Build the mental model
  Narration: Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.

- **0:12-0:20** / Reveal step 2: Phase 1 / Week 1
  Narration: Build customers, orders, and items with primary and foreign keys. Practice joins, grouping, NULL behavior, and window functions.

- **0:20-0:27** / Reveal step 3: Phase 2 / Week 2
  Narration: Create a larger synthetic dataset and inspect query plans. Compare selective lookups, ordered history, and broad scans.

- **0:27-0:36** / Reveal step 4: Phase 3 / Week 3
  Narration: Use two sessions to reproduce a lost update or last-item reservation race. Add the database-enforced invariant and choose an appropriate transaction strategy.

- **0:36-0:43** / Reveal step 5: Phase 4 / Week 4
  Narration: Practice a backward-compatible schema change, migration rollback or forward repair, backup, and restore in a disposable database.

- **0:43-0:46** / Reveal step 6: Prove readiness
  Narration: Schema keys and output grain are explicit.

- **0:46-0:56** / Takeaway and discussion prompt
  Narration: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query. Which bottleneck would you measure first?

## References

- [Databases, SQL, Indexes, and Transactions / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=databases-transactions)
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
