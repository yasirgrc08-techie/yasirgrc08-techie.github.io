# Read Replicas and Stale Truth / Build and Validate

By Yasir Sharfi

## The Idea

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

## Visual Blueprint

1. **Define two read classes**: Create browsing and immediate-confirmation endpoints with different freshness needs.
2. **Introduce replica delay**: Use an authorized local replication test or a delayed read-model simulator.
3. **Run write-then-read**: Record routing and returned versions for the same logical object.
4. **Apply a freshness policy**: Route confirmation reads using a documented primary or token-based rule.
5. **Fail a replica**: Verify fallback remains bounded and does not expose stale authorization state.
6. **Document the guarantee**: State exactly which reads may lag and how the client observes that condition.

## Caption

A successful write followed by a missing read may be a routing decision, not lost data.

Assume asynchronous replication. Replicas can improve read capacity, but freshness and read-your-writes behavior require an explicit application contract.

1. Define two read classes
Create browsing and immediate-confirmation endpoints with different freshness needs.

2. Introduce replica delay
Use an authorized local replication test or a delayed read-model simulator.

3. Run write-then-read
Record routing and returned versions for the same logical object.

4. Apply a freshness policy
Route confirmation reads using a documented primary or token-based rule.

5. Fail a replica
Verify fallback remains bounded and does not expose stale authorization state.

6. Document the guarantee
State exactly which reads may lag and how the client observes that condition.

The takeaway: Read capacity and read consistency are separate design decisions.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #replication #consistency

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:07** / Title and opening question
  Narration: A successful write followed by a missing read may be a routing decision, not lost data.

- **0:07-0:11** / Reveal step 1: Define two read classes
  Narration: Create browsing and immediate-confirmation endpoints with different freshness needs.

- **0:11-0:16** / Reveal step 2: Introduce replica delay
  Narration: Use an authorized local replication test or a delayed read-model simulator.

- **0:16-0:20** / Reveal step 3: Run write-then-read
  Narration: Record routing and returned versions for the same logical object.

- **0:20-0:24** / Reveal step 4: Apply a freshness policy
  Narration: Route confirmation reads using a documented primary or token-based rule.

- **0:24-0:29** / Reveal step 5: Fail a replica
  Narration: Verify fallback remains bounded and does not expose stale authorization state.

- **0:29-0:35** / Reveal step 6: Document the guarantee
  Narration: State exactly which reads may lag and how the client observes that condition.

- **0:35-0:42** / Takeaway and discussion prompt
  Narration: Read capacity and read consistency are separate design decisions. How would you reproduce this with synthetic data?

## References

- [PostgreSQL hot standby](https://www.postgresql.org/docs/current/hot-standby.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
