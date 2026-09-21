# Database Pools Need a Budget / Decision Guide

By Yasir Sharfi

## The Idea

Adding ten API replicas can accidentally multiply database connections by ten.

Treat the database connection limit as a shared budget across application replicas, workers, migrations, and administrative recovery paths.

## Visual Blueprint

1. **Application pool**: Use an application pool to reuse connections and cap each process's demand.
2. **Trade-off / Application pool**: Per-process limits do not create a global budget when the replica count changes.
3. **Transaction pooler**: Use a compatible pooler when many clients can share fewer backend sessions.
4. **Trade-off / Transaction pooler**: Session variables, prepared statements, and transaction behavior need compatibility review.
5. **Admission control**: Limit active database work before it enters a saturated pool.
6. **Trade-off / Admission control**: Rejecting or queueing work requires a clear deadline and client-visible overload behavior.

## Caption

Adding ten API replicas can accidentally multiply database connections by ten.

Treat the database connection limit as a shared budget across application replicas, workers, migrations, and administrative recovery paths.

1. Application pool
Use an application pool to reuse connections and cap each process's demand.

2. Trade-off / Application pool
Per-process limits do not create a global budget when the replica count changes.

3. Transaction pooler
Use a compatible pooler when many clients can share fewer backend sessions.

4. Trade-off / Transaction pooler
Session variables, prepared statements, and transaction behavior need compatibility review.

5. Admission control
Limit active database work before it enters a saturated pool.

6. Trade-off / Admission control
Rejecting or queueing work requires a clear deadline and client-visible overload behavior.

The takeaway: A pool is a concurrency control, not permission to consume every database connection.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #pooling #pgbouncer

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding ten API replicas can accidentally multiply database connections by ten.

- **0:05-0:10** / Reveal step 1: Application pool
  Narration: Use an application pool to reuse connections and cap each process's demand.

- **0:10-0:16** / Reveal step 2: Trade-off / Application pool
  Narration: Per-process limits do not create a global budget when the replica count changes.

- **0:16-0:21** / Reveal step 3: Transaction pooler
  Narration: Use a compatible pooler when many clients can share fewer backend sessions.

- **0:21-0:25** / Reveal step 4: Trade-off / Transaction pooler
  Narration: Session variables, prepared statements, and transaction behavior need compatibility review.

- **0:25-0:29** / Reveal step 5: Admission control
  Narration: Limit active database work before it enters a saturated pool.

- **0:29-0:34** / Reveal step 6: Trade-off / Admission control
  Narration: Rejecting or queueing work requires a clear deadline and client-visible overload behavior.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: A pool is a concurrency control, not permission to consume every database connection. Which constraint would change your choice?

## References

- [PgBouncer features](https://www.pgbouncer.org/features.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
