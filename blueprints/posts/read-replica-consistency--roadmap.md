# Read Replicas and Stale Truth / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

## Visual Blueprint

1. **Classify read freshness**: Separate stale-tolerant browsing from security, billing, and immediate post-write confirmation.
2. **Measure replay delay**: Track replication progress and lag using the database's documented signals.
3. **Route sensitive reads**: Use an authoritative path when stale data could violate a correctness or authorization requirement.
4. **Define session consistency**: Choose primary reads, a consistency token, or another tested policy for read-your-writes flows.
5. **Handle lagged replicas**: Remove or limit replicas that exceed the accepted freshness budget.
6. **Test promotion carefully**: Verify failover, routing, and data-loss assumptions rather than treating a replica as a backup.

## Caption

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

1. Classify read freshness
Separate stale-tolerant browsing from security, billing, and immediate post-write confirmation.

2. Measure replay delay
Track replication progress and lag using the database's documented signals.

3. Route sensitive reads
Use an authoritative path when stale data could violate a correctness or authorization requirement.

4. Define session consistency
Choose primary reads, a consistency token, or another tested policy for read-your-writes flows.

5. Handle lagged replicas
Remove or limit replicas that exceed the accepted freshness budget.

6. Test promotion carefully
Verify failover, routing, and data-loss assumptions rather than treating a replica as a backup.

The takeaway: Read capacity and read consistency are separate design decisions.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #replication #consistency

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:07** / Title and opening question
  Narration: A successful write followed by a missing read may be a routing decision, not lost data.

- **0:07-0:11** / Reveal step 1: Classify read freshness
  Narration: Separate stale-tolerant browsing from security, billing, and immediate post-write confirmation.

- **0:11-0:15** / Reveal step 2: Measure replay delay
  Narration: Track replication progress and lag using the database's documented signals.

- **0:15-0:21** / Reveal step 3: Route sensitive reads
  Narration: Use an authoritative path when stale data could violate a correctness or authorization requirement.

- **0:21-0:27** / Reveal step 4: Define session consistency
  Narration: Choose primary reads, a consistency token, or another tested policy for read-your-writes flows.

- **0:27-0:31** / Reveal step 5: Handle lagged replicas
  Narration: Remove or limit replicas that exceed the accepted freshness budget.

- **0:31-0:37** / Reveal step 6: Test promotion carefully
  Narration: Verify failover, routing, and data-loss assumptions rather than treating a replica as a backup.

- **0:37-0:43** / Takeaway and discussion prompt
  Narration: Read capacity and read consistency are separate design decisions. Which bottleneck would you measure first?

## References

- [PostgreSQL hot standby](https://www.postgresql.org/docs/current/hot-standby.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
