# Transactions Protect Invariants / Build and Validate

By Yasir Sharfi

## The Idea

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

## Visual Blueprint

1. **Model the final item**: Create one reservable resource and two synthetic clients.
2. **Force the naive race**: Make both clients read availability before either writes.
3. **Enforce ownership**: Add a unique constraint or conditional update that can have only one winner.
4. **Retry the winner**: Reuse the operation identity and verify the original result is returned.
5. **Inject a conflict**: Test the client's response to a serialization or uniqueness conflict.
6. **Audit final state**: Assert the invariant after every tested interleaving and error path.

## Caption

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

1. Model the final item
Create one reservable resource and two synthetic clients.

2. Force the naive race
Make both clients read availability before either writes.

3. Enforce ownership
Add a unique constraint or conditional update that can have only one winner.

4. Retry the winner
Reuse the operation identity and verify the original result is returned.

5. Inject a conflict
Test the client's response to a serialization or uniqueness conflict.

6. Audit final state
Assert the invariant after every tested interleaving and error path.

The takeaway: The transaction is useful only when its boundary matches the business invariant.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #transactions #isolation

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Two individually valid requests can still create one invalid shared state.

- **0:05-0:09** / Reveal step 1: Model the final item
  Narration: Create one reservable resource and two synthetic clients.

- **0:09-0:13** / Reveal step 2: Force the naive race
  Narration: Make both clients read availability before either writes.

- **0:13-0:19** / Reveal step 3: Enforce ownership
  Narration: Add a unique constraint or conditional update that can have only one winner.

- **0:19-0:24** / Reveal step 4: Retry the winner
  Narration: Reuse the operation identity and verify the original result is returned.

- **0:24-0:28** / Reveal step 5: Inject a conflict
  Narration: Test the client's response to a serialization or uniqueness conflict.

- **0:28-0:32** / Reveal step 6: Audit final state
  Narration: Assert the invariant after every tested interleaving and error path.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: The transaction is useful only when its boundary matches the business invariant. How would you reproduce this with synthetic data?

## References

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
