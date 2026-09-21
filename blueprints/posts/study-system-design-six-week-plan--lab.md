# Plan Your System Design Preparation / Build and Validate

By Yasir Sharfi

## The Idea

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

## Visual Blueprint

1. **Set up the scenario**: A product needs email and push notifications with user preferences, retries, and delivery status.
2. **Experiment 1**: Define notification ID, recipient, channel, template version, and preference snapshot or recheck policy.
3. **Experiment 2**: Persist the request and an outbox event atomically, then have workers consume it from a durable queue.
4. **Experiment 3**: Walk an ambiguous provider timeout, duplicate queue delivery, opt-out change, and provider outage.
5. **Expected evidence**: The architecture follows a specific requirement: asynchronous delivery with durable status and controlled retries.
6. **Check the result**: Is the request durable before the API acknowledges acceptance?

## Caption

How much capacity math should I do?

System design is a structured discussion of requirements, data, interfaces, capacity, and failure. Start with a small correct design, identify the important bottlenecks, and deepen only the parts that matter. A defensible trade-off is more valuable than a diagram containing every fashionable component.

1. Set up the scenario
A product needs email and push notifications with user preferences, retries, and delivery status.

2. Experiment 1
Define notification ID, recipient, channel, template version, and preference snapshot or recheck policy.

3. Experiment 2
Persist the request and an outbox event atomically, then have workers consume it from a durable queue.

4. Experiment 3
Walk an ambiguous provider timeout, duplicate queue delivery, opt-out change, and provider outage.

5. Expected evidence
The architecture follows a specific requirement: asynchronous delivery with durable status and controlled retries.

6. Check the result
Is the request durable before the API acknowledges acceptance?

The takeaway: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #system #design

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: How much capacity math should I do?

- **0:03-0:09** / Reveal step 1: Set up the scenario
  Narration: A product needs email and push notifications with user preferences, retries, and delivery status.

- **0:09-0:15** / Reveal step 2: Experiment 1
  Narration: Define notification ID, recipient, channel, template version, and preference snapshot or recheck policy.

- **0:15-0:22** / Reveal step 3: Experiment 2
  Narration: Persist the request and an outbox event atomically, then have workers consume it from a durable queue.

- **0:22-0:28** / Reveal step 4: Experiment 3
  Narration: Walk an ambiguous provider timeout, duplicate queue delivery, opt-out change, and provider outage.

- **0:28-0:34** / Reveal step 5: Expected evidence
  Narration: The architecture follows a specific requirement: asynchronous delivery with durable status and controlled retries.

- **0:34-0:38** / Reveal step 6: Check the result
  Narration: Is the request durable before the API acknowledges acceptance?

- **0:38-0:50** / Takeaway and discussion prompt
  Narration: For every practice design, write a one-page contract before drawing. Use the same delivery structure, but choose deep dives from the problem. How would you reproduce this with synthetic data?

## References

- [Plan Your System Design Preparation / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=system-design-six-week-plan)
- [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/)
- [Google SRE book](https://sre.google/sre-book/table-of-contents/)
- [Hello Interview: system design introduction](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
