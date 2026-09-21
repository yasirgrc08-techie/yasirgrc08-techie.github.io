# Read Replicas and Stale Truth / Decision Guide

By Yasir Sharfi

## The Idea

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

## Visual Blueprint

1. **Primary reads**: Use the primary for operations that require the latest committed state under the chosen database contract.
2. **Trade-off / Primary reads**: The primary remains a capacity dependency; optimize access rather than routing blindly.
3. **Stale-tolerant replica**: Use a replica for reads whose product contract permits delayed updates.
4. **Trade-off / Stale-tolerant replica**: Users need defined behavior during lag and after recent writes.
5. **Consistency-aware routing**: Use a token or session policy when only selected reads require a freshness boundary.
6. **Trade-off / Consistency-aware routing**: Token propagation and replica eligibility add complexity that must survive failures.

## Caption

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

1. Primary reads
Use the primary for operations that require the latest committed state under the chosen database contract.

2. Trade-off / Primary reads
The primary remains a capacity dependency; optimize access rather than routing blindly.

3. Stale-tolerant replica
Use a replica for reads whose product contract permits delayed updates.

4. Trade-off / Stale-tolerant replica
Users need defined behavior during lag and after recent writes.

5. Consistency-aware routing
Use a token or session policy when only selected reads require a freshness boundary.

6. Trade-off / Consistency-aware routing
Token propagation and replica eligibility add complexity that must survive failures.

The takeaway: Read capacity and read consistency are separate design decisions.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #replication #consistency

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:07** / Title and opening question
  Narration: A successful write followed by a missing read may be a routing decision, not lost data.

- **0:07-0:14** / Reveal step 1: Primary reads
  Narration: Use the primary for operations that require the latest committed state under the chosen database contract.

- **0:14-0:19** / Reveal step 2: Trade-off / Primary reads
  Narration: The primary remains a capacity dependency; optimize access rather than routing blindly.

- **0:19-0:24** / Reveal step 3: Stale-tolerant replica
  Narration: Use a replica for reads whose product contract permits delayed updates.

- **0:24-0:28** / Reveal step 4: Trade-off / Stale-tolerant replica
  Narration: Users need defined behavior during lag and after recent writes.

- **0:28-0:34** / Reveal step 5: Consistency-aware routing
  Narration: Use a token or session policy when only selected reads require a freshness boundary.

- **0:34-0:39** / Reveal step 6: Trade-off / Consistency-aware routing
  Narration: Token propagation and replica eligibility add complexity that must survive failures.

- **0:39-0:45** / Takeaway and discussion prompt
  Narration: Read capacity and read consistency are separate design decisions. Which constraint would change your choice?

## References

- [PostgreSQL hot standby](https://www.postgresql.org/docs/current/hot-standby.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
