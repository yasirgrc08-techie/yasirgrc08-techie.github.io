# Read Replicas and Stale Truth / Failure and Recovery

By Yasir Sharfi

## The Idea

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

## Visual Blueprint

1. **Observe missing recent writes**: A client writes successfully but immediately reads old state.
2. **Check the destination**: Identify whether the read reached the primary or a lagging replica.
3. **Inspect replication progress**: Compare replay state with the write's committed position where supported.
4. **Route conservatively**: Send correctness-sensitive reads to an authoritative healthy path.
5. **Recover replication**: Fix the underlying replay, network, or capacity problem without hiding stale data.
6. **Test the user journey**: Repeat write-then-read behavior during normal operation, lag, and failover.

## Caption

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

1. Observe missing recent writes
A client writes successfully but immediately reads old state.

2. Check the destination
Identify whether the read reached the primary or a lagging replica.

3. Inspect replication progress
Compare replay state with the write's committed position where supported.

4. Route conservatively
Send correctness-sensitive reads to an authoritative healthy path.

5. Recover replication
Fix the underlying replay, network, or capacity problem without hiding stale data.

6. Test the user journey
Repeat write-then-read behavior during normal operation, lag, and failover.

The takeaway: Read capacity and read consistency are separate design decisions.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #replication #consistency

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:07** / Title and opening question
  Narration: A successful write followed by a missing read may be a routing decision, not lost data.

- **0:07-0:11** / Reveal step 1: Observe missing recent writes
  Narration: A client writes successfully but immediately reads old state.

- **0:11-0:16** / Reveal step 2: Check the destination
  Narration: Identify whether the read reached the primary or a lagging replica.

- **0:16-0:20** / Reveal step 3: Inspect replication progress
  Narration: Compare replay state with the write's committed position where supported.

- **0:20-0:24** / Reveal step 4: Route conservatively
  Narration: Send correctness-sensitive reads to an authoritative healthy path.

- **0:24-0:29** / Reveal step 5: Recover replication
  Narration: Fix the underlying replay, network, or capacity problem without hiding stale data.

- **0:29-0:33** / Reveal step 6: Test the user journey
  Narration: Repeat write-then-read behavior during normal operation, lag, and failover.

- **0:33-0:40** / Takeaway and discussion prompt
  Narration: Read capacity and read consistency are separate design decisions. What evidence would disprove your first diagnosis?

## References

- [PostgreSQL hot standby](https://www.postgresql.org/docs/current/hot-standby.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
