# Transactions Protect Invariants / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

## Visual Blueprint

1. **Write the invariant**: State the condition that must never be violated, such as one active owner per resource.
2. **Place the boundary**: Enforce uniqueness or conditional state changes at the database, not only in application prechecks.
3. **Choose isolation deliberately**: Understand which anomalies the chosen isolation level permits for this access pattern.
4. **Keep transactions short**: Avoid external calls and unnecessary scans while locks or snapshots are retained.
5. **Handle conflicts explicitly**: Retry only safe transactions with bounded attempts and a stable operation identity.
6. **Test interleavings**: Use two controlled sessions to reproduce the race and prove the intended outcome.

## Caption

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

1. Write the invariant
State the condition that must never be violated, such as one active owner per resource.

2. Place the boundary
Enforce uniqueness or conditional state changes at the database, not only in application prechecks.

3. Choose isolation deliberately
Understand which anomalies the chosen isolation level permits for this access pattern.

4. Keep transactions short
Avoid external calls and unnecessary scans while locks or snapshots are retained.

5. Handle conflicts explicitly
Retry only safe transactions with bounded attempts and a stable operation identity.

6. Test interleavings
Use two controlled sessions to reproduce the race and prove the intended outcome.

The takeaway: The transaction is useful only when its boundary matches the business invariant.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #transactions #isolation

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Two individually valid requests can still create one invalid shared state.

- **0:05-0:11** / Reveal step 1: Write the invariant
  Narration: State the condition that must never be violated, such as one active owner per resource.

- **0:11-0:17** / Reveal step 2: Place the boundary
  Narration: Enforce uniqueness or conditional state changes at the database, not only in application prechecks.

- **0:17-0:22** / Reveal step 3: Choose isolation deliberately
  Narration: Understand which anomalies the chosen isolation level permits for this access pattern.

- **0:22-0:27** / Reveal step 4: Keep transactions short
  Narration: Avoid external calls and unnecessary scans while locks or snapshots are retained.

- **0:27-0:32** / Reveal step 5: Handle conflicts explicitly
  Narration: Retry only safe transactions with bounded attempts and a stable operation identity.

- **0:32-0:38** / Reveal step 6: Test interleavings
  Narration: Use two controlled sessions to reproduce the race and prove the intended outcome.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: The transaction is useful only when its boundary matches the business invariant. Which bottleneck would you measure first?

## References

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
