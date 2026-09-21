# Transactions Protect Invariants / Decision Guide

By Yasir Sharfi

## The Idea

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

## Visual Blueprint

1. **Unique constraint**: Use a constraint when the invariant can be expressed as uniqueness or a relational check.
2. **Trade-off / Unique constraint**: Application code still needs to interpret violations as expected conflicts rather than generic failures.
3. **Conditional update**: Use a state transition that succeeds only when the current value matches the expected condition.
4. **Trade-off / Conditional update**: Check the affected-row result and define behavior when another writer wins.
5. **Serializable transaction**: Use stronger isolation when the invariant spans reads and writes that need serializable reasoning.
6. **Trade-off / Serializable transaction**: Serialization failures are expected control flow and require safe bounded retry handling.

## Caption

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

1. Unique constraint
Use a constraint when the invariant can be expressed as uniqueness or a relational check.

2. Trade-off / Unique constraint
Application code still needs to interpret violations as expected conflicts rather than generic failures.

3. Conditional update
Use a state transition that succeeds only when the current value matches the expected condition.

4. Trade-off / Conditional update
Check the affected-row result and define behavior when another writer wins.

5. Serializable transaction
Use stronger isolation when the invariant spans reads and writes that need serializable reasoning.

6. Trade-off / Serializable transaction
Serialization failures are expected control flow and require safe bounded retry handling.

The takeaway: The transaction is useful only when its boundary matches the business invariant.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #transactions #isolation

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Two individually valid requests can still create one invalid shared state.

- **0:05-0:11** / Reveal step 1: Unique constraint
  Narration: Use a constraint when the invariant can be expressed as uniqueness or a relational check.

- **0:11-0:17** / Reveal step 2: Trade-off / Unique constraint
  Narration: Application code still needs to interpret violations as expected conflicts rather than generic failures.

- **0:17-0:23** / Reveal step 3: Conditional update
  Narration: Use a state transition that succeeds only when the current value matches the expected condition.

- **0:23-0:28** / Reveal step 4: Trade-off / Conditional update
  Narration: Check the affected-row result and define behavior when another writer wins.

- **0:28-0:34** / Reveal step 5: Serializable transaction
  Narration: Use stronger isolation when the invariant spans reads and writes that need serializable reasoning.

- **0:34-0:39** / Reveal step 6: Trade-off / Serializable transaction
  Narration: Serialization failures are expected control flow and require safe bounded retry handling.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: The transaction is useful only when its boundary matches the business invariant. Which constraint would change your choice?

## References

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
