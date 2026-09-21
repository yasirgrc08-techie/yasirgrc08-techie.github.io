# Transactions Protect Invariants / Failure and Recovery

By Yasir Sharfi

## The Idea

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

## Visual Blueprint

1. **Find the broken invariant**: Two clients appear to own the same exclusive resource.
2. **Reconstruct the race**: Record the read and write sequence from each transaction.
3. **Stop unsafe new claims**: Protect the invariant while preserving evidence and existing valid ownership.
4. **Move enforcement inward**: Add the appropriate database constraint or atomic transition.
5. **Reconcile existing state**: Repair invalid records with a reviewed business rule, not an arbitrary winner.
6. **Make the race deterministic**: Add a two-session regression test that forces the original interleaving.

## Caption

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

1. Find the broken invariant
Two clients appear to own the same exclusive resource.

2. Reconstruct the race
Record the read and write sequence from each transaction.

3. Stop unsafe new claims
Protect the invariant while preserving evidence and existing valid ownership.

4. Move enforcement inward
Add the appropriate database constraint or atomic transition.

5. Reconcile existing state
Repair invalid records with a reviewed business rule, not an arbitrary winner.

6. Make the race deterministic
Add a two-session regression test that forces the original interleaving.

The takeaway: The transaction is useful only when its boundary matches the business invariant.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #transactions #isolation

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Two individually valid requests can still create one invalid shared state.

- **0:05-0:09** / Reveal step 1: Find the broken invariant
  Narration: Two clients appear to own the same exclusive resource.

- **0:09-0:13** / Reveal step 2: Reconstruct the race
  Narration: Record the read and write sequence from each transaction.

- **0:13-0:17** / Reveal step 3: Stop unsafe new claims
  Narration: Protect the invariant while preserving evidence and existing valid ownership.

- **0:17-0:21** / Reveal step 4: Move enforcement inward
  Narration: Add the appropriate database constraint or atomic transition.

- **0:21-0:26** / Reveal step 5: Reconcile existing state
  Narration: Repair invalid records with a reviewed business rule, not an arbitrary winner.

- **0:26-0:30** / Reveal step 6: Make the race deterministic
  Narration: Add a two-session regression test that forces the original interleaving.

- **0:30-0:38** / Takeaway and discussion prompt
  Narration: The transaction is useful only when its boundary matches the business invariant. What evidence would disprove your first diagnosis?

## References

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
