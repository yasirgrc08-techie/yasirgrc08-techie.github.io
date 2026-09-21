# Databases, SQL, Indexes, and Transactions / Build and Validate

By Yasir Sharfi

## The Idea

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

## Visual Blueprint

1. **Set up the scenario**: Two clients try to reserve the last seat for an event. Both first read that the seat is available.
2. **Experiment 1**: Model a stable seat/event identity and enforce a unique active ownership rule in the database.
3. **Experiment 2**: Perform the claim using an appropriate transaction or conditional update that succeeds only for the expected available state.
4. **Experiment 3**: Run two sessions through the same interleaving, then retry the winning request with its original request ID.
5. **Expected evidence**: Correctness comes from the database boundary and request identity, not from the timing of the availability check.
6. **Check the result**: Can two concurrent claims violate the unique ownership rule?

## Caption

Why not put an index on every column?

A database is not just a place to store JSON. Its schema and transaction boundaries encode invariants, while indexes trade read efficiency for write and storage cost. Learn these decisions using a small order or reservation model and inspect actual query behavior.

1. Set up the scenario
Two clients try to reserve the last seat for an event. Both first read that the seat is available.

2. Experiment 1
Model a stable seat/event identity and enforce a unique active ownership rule in the database.

3. Experiment 2
Perform the claim using an appropriate transaction or conditional update that succeeds only for the expected available state.

4. Experiment 3
Run two sessions through the same interleaving, then retry the winning request with its original request ID.

5. Expected evidence
Correctness comes from the database boundary and request identity, not from the timing of the availability check.

6. Check the result
Can two concurrent claims violate the unique ownership rule?

The takeaway: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #databases #transactions

## Reel Storyboard

Suggested duration: about 55 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why not put an index on every column?

- **0:04-0:12** / Reveal step 1: Set up the scenario
  Narration: Two clients try to reserve the last seat for an event. Both first read that the seat is available.

- **0:12-0:18** / Reveal step 2: Experiment 1
  Narration: Model a stable seat/event identity and enforce a unique active ownership rule in the database.

- **0:18-0:26** / Reveal step 3: Experiment 2
  Narration: Perform the claim using an appropriate transaction or conditional update that succeeds only for the expected available state.

- **0:26-0:33** / Reveal step 4: Experiment 3
  Narration: Run two sessions through the same interleaving, then retry the winning request with its original request ID.

- **0:33-0:40** / Reveal step 5: Expected evidence
  Narration: Correctness comes from the database boundary and request identity, not from the timing of the availability check.

- **0:40-0:44** / Reveal step 6: Check the result
  Narration: Can two concurrent claims violate the unique ownership rule?

- **0:44-0:55** / Takeaway and discussion prompt
  Narration: Use PostgreSQL or another well-documented local database and synthetic data. Write the expected rows before running a query. How would you reproduce this with synthetic data?

## References

- [Databases, SQL, Indexes, and Transactions / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=databases-transactions)
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
