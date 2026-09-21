# Databases, SQL, Indexes, and Transactions / Practice Decisions

By Yasir Sharfi

## The Idea

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

## Visual Blueprint

1. **Grain prevents double counting**: Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.
2. **Watch for**: Joining child tables without checking row multiplication.
3. **Indexes support workloads**: An index can reduce lookup and ordering work when it matches the query, but it consumes space and must be maintained on writes.
4. **Watch for**: Using application checks instead of database-enforced invariants.
5. **Transactions protect boundaries**: Atomicity groups changes, while isolation defines what concurrent operations can observe.
6. **Watch for**: Claiming a backup strategy without a tested recovery path.

## Caption

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

1. Grain prevents double counting
Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.

2. Watch for
Joining child tables without checking row multiplication.

3. Indexes support workloads
An index can reduce lookup and ordering work when it matches the query, but it consumes space and must be maintained on writes.

4. Watch for
Using application checks instead of database-enforced invariants.

5. Transactions protect boundaries
Atomicity groups changes, while isolation defines what concurrent operations can observe.

6. Watch for
Claiming a backup strategy without a tested recovery path.

The takeaway: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #databases #transactions

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why not put an index on every column?

- **0:04-0:12** / Reveal step 1: Grain prevents double counting
  Narration: Know what one row represents in every table and intermediate result. Joining multiple one-to-many relationships can multiply rows.

- **0:12-0:15** / Reveal step 2: Watch for
  Narration: Joining child tables without checking row multiplication.

- **0:15-0:25** / Reveal step 3: Indexes support workloads
  Narration: An index can reduce lookup and ordering work when it matches the query, but it consumes space and must be maintained on writes.

- **0:25-0:28** / Reveal step 4: Watch for
  Narration: Using application checks instead of database-enforced invariants.

- **0:28-0:33** / Reveal step 5: Transactions protect boundaries
  Narration: Atomicity groups changes, while isolation defines what concurrent operations can observe.

- **0:33-0:37** / Reveal step 6: Watch for
  Narration: Claiming a backup strategy without a tested recovery path.

- **0:37-0:47** / Takeaway and discussion prompt
  Narration: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query. Which constraint would change your choice?

## References

- [Databases, SQL, Indexes, and Transactions / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=databases-transactions)
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
