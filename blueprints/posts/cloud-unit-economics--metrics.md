# Cloud Cost per Useful Outcome / Metrics That Matter

By Yasir Sharfi

## The Idea

A cheaper instance can produce a more expensive completed request.

Compare cost with useful outcomes while preserving service objectives. Include retries, idle headroom, data transfer, storage, and operational effort.

## Visual Blueprint

1. **Cost per completed unit**: Divide attributed spend by useful successful outcomes in the same interval.
2. **Interpret / Cost per completed unit**: More failed attempts should not make the denominator look like successful growth.
3. **Retry cost share**: Estimate resources spent repeating work rather than serving new useful demand.
4. **Interpret / Retry cost share**: Some retries are necessary; distinguish recovery value from avoidable amplification.
5. **Idle capacity cost**: Measure unused capacity while retaining the headroom required by the recovery plan.
6. **Interpret / Idle capacity cost**: Zero idle capacity is not always the cheapest reliable design.

## Caption

A cheaper instance can produce a more expensive completed request.

Compare cost with useful outcomes while preserving service objectives. Include retries, idle headroom, data transfer, storage, and operational effort.

1. Cost per completed unit
Divide attributed spend by useful successful outcomes in the same interval.

2. Interpret / Cost per completed unit
More failed attempts should not make the denominator look like successful growth.

3. Retry cost share
Estimate resources spent repeating work rather than serving new useful demand.

4. Interpret / Retry cost share
Some retries are necessary; distinguish recovery value from avoidable amplification.

5. Idle capacity cost
Measure unused capacity while retaining the headroom required by the recovery plan.

6. Interpret / Idle capacity cost
Zero idle capacity is not always the cheapest reliable design.

The takeaway: Optimize cost per correct, timely outcome rather than the smallest invoice line.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #cloud #cost #capacity

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A cheaper instance can produce a more expensive completed request.

- **0:04-0:09** / Reveal step 1: Cost per completed unit
  Narration: Divide attributed spend by useful successful outcomes in the same interval.

- **0:09-0:14** / Reveal step 2: Interpret / Cost per completed unit
  Narration: More failed attempts should not make the denominator look like successful growth.

- **0:14-0:19** / Reveal step 3: Retry cost share
  Narration: Estimate resources spent repeating work rather than serving new useful demand.

- **0:19-0:23** / Reveal step 4: Interpret / Retry cost share
  Narration: Some retries are necessary; distinguish recovery value from avoidable amplification.

- **0:23-0:28** / Reveal step 5: Idle capacity cost
  Narration: Measure unused capacity while retaining the headroom required by the recovery plan.

- **0:28-0:32** / Reveal step 6: Interpret / Idle capacity cost
  Narration: Zero idle capacity is not always the cheapest reliable design.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Optimize cost per correct, timely outcome rather than the smallest invoice line. Which metric could look healthy while users suffer?

## References

- [AWS cost optimization framework](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
