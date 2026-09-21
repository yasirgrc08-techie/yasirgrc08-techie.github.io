# Multi-Region Is a Data Decision / Decision Guide

By Yasir Sharfi

## The Idea

Routing traffic to another region is easy compared with knowing which writes survived.

Separate regional availability from data consistency. Recovery-point, recovery-time, write ownership, and split-brain behavior must be explicit.

## Visual Blueprint

1. **Active-passive**: Use a standby design when one write owner and recovery time fit the business requirement.
2. **Trade-off / Active-passive**: Standby capacity and data freshness still need regular verification.
3. **Active-active**: Use multiple active regions when conflict and consistency semantics are justified and understood.
4. **Trade-off / Active-active**: Global coordination or conflict resolution can add latency and substantial application complexity.
5. **Regional degradation**: Keep a reduced safe service when full failover would violate data guarantees.
6. **Trade-off / Regional degradation**: The product must define which operations are unavailable and how pending work is reconciled.

## Caption

Routing traffic to another region is easy compared with knowing which writes survived.

Separate regional availability from data consistency. Recovery-point, recovery-time, write ownership, and split-brain behavior must be explicit.

1. Active-passive
Use a standby design when one write owner and recovery time fit the business requirement.

2. Trade-off / Active-passive
Standby capacity and data freshness still need regular verification.

3. Active-active
Use multiple active regions when conflict and consistency semantics are justified and understood.

4. Trade-off / Active-active
Global coordination or conflict resolution can add latency and substantial application complexity.

5. Regional degradation
Keep a reduced safe service when full failover would violate data guarantees.

6. Trade-off / Regional degradation
The product must define which operations are unavailable and how pending work is reconciled.

The takeaway: Regional redundancy is incomplete without a tested write-ownership and recovery contract.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #cloud #disasterrecovery #multiregion

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Routing traffic to another region is easy compared with knowing which writes survived.

- **0:06-0:12** / Reveal step 1: Active-passive
  Narration: Use a standby design when one write owner and recovery time fit the business requirement.

- **0:12-0:16** / Reveal step 2: Trade-off / Active-passive
  Narration: Standby capacity and data freshness still need regular verification.

- **0:16-0:22** / Reveal step 3: Active-active
  Narration: Use multiple active regions when conflict and consistency semantics are justified and understood.

- **0:22-0:27** / Reveal step 4: Trade-off / Active-active
  Narration: Global coordination or conflict resolution can add latency and substantial application complexity.

- **0:27-0:32** / Reveal step 5: Regional degradation
  Narration: Keep a reduced safe service when full failover would violate data guarantees.

- **0:32-0:38** / Reveal step 6: Trade-off / Regional degradation
  Narration: The product must define which operations are unavailable and how pending work is reconciled.

- **0:38-0:45** / Takeaway and discussion prompt
  Narration: Regional redundancy is incomplete without a tested write-ownership and recovery contract. Which constraint would change your choice?

## References

- [Azure reliability documentation](https://learn.microsoft.com/en-us/azure/reliability/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
