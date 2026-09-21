# Database Pools Need a Budget / Metrics That Matter

By Yasir Sharfi

## The Idea

Adding ten API replicas can accidentally multiply database connections by ten.

Treat the database connection limit as a shared budget across application replicas, workers, migrations, and administrative recovery paths.

## Visual Blueprint

1. **Pool wait time**: Measure time spent waiting for an available connection.
2. **Interpret / Pool wait time**: Increasing pool size can move the queue into the database instead of removing it.
3. **Transaction age**: Track long-lived and idle-in-transaction sessions separately.
4. **Interpret / Transaction age**: A quiet session can still retain locks or prevent cleanup progress.
5. **Aggregate connections**: Count all backend sessions against the reserved global budget.
6. **Interpret / Aggregate connections**: The limit must cover deployment overlap, not only steady-state replica counts.

## Caption

Adding ten API replicas can accidentally multiply database connections by ten.

Treat the database connection limit as a shared budget across application replicas, workers, migrations, and administrative recovery paths.

1. Pool wait time
Measure time spent waiting for an available connection.

2. Interpret / Pool wait time
Increasing pool size can move the queue into the database instead of removing it.

3. Transaction age
Track long-lived and idle-in-transaction sessions separately.

4. Interpret / Transaction age
A quiet session can still retain locks or prevent cleanup progress.

5. Aggregate connections
Count all backend sessions against the reserved global budget.

6. Interpret / Aggregate connections
The limit must cover deployment overlap, not only steady-state replica counts.

The takeaway: A pool is a concurrency control, not permission to consume every database connection.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #pooling #pgbouncer

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding ten API replicas can accidentally multiply database connections by ten.

- **0:05-0:09** / Reveal step 1: Pool wait time
  Narration: Measure time spent waiting for an available connection.

- **0:09-0:15** / Reveal step 2: Interpret / Pool wait time
  Narration: Increasing pool size can move the queue into the database instead of removing it.

- **0:15-0:18** / Reveal step 3: Transaction age
  Narration: Track long-lived and idle-in-transaction sessions separately.

- **0:18-0:23** / Reveal step 4: Interpret / Transaction age
  Narration: A quiet session can still retain locks or prevent cleanup progress.

- **0:23-0:27** / Reveal step 5: Aggregate connections
  Narration: Count all backend sessions against the reserved global budget.

- **0:27-0:32** / Reveal step 6: Interpret / Aggregate connections
  Narration: The limit must cover deployment overlap, not only steady-state replica counts.

- **0:32-0:41** / Takeaway and discussion prompt
  Narration: A pool is a concurrency control, not permission to consume every database connection. Which metric could look healthy while users suffer?

## References

- [PgBouncer features](https://www.pgbouncer.org/features.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
