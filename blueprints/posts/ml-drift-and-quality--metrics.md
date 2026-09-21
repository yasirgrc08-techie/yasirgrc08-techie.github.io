# Data Drift Is Not Model Accuracy / Metrics That Matter

By Yasir Sharfi

## The Idea

A changed input distribution is a warning, not proof that the model became worse.

Monitor data quality, feature timing, prediction behavior, and delayed labeled outcomes separately. Each signal supports a different conclusion.

## Visual Blueprint

1. **Feature contract failures**: Measure missing, invalid, and unavailable-at-serving-time inputs.
2. **Interpret / Feature contract failures**: Training data may contain fields that are not actually known when a live prediction is made.
3. **Distribution shift**: Track documented drift statistics for meaningful input and output dimensions.
4. **Interpret / Distribution shift**: A drift threshold is a screening signal, not a direct estimate of accuracy.
5. **Labeled task quality**: Evaluate the chosen task metric with label delay and sampling limitations disclosed.
6. **Interpret / Labeled task quality**: An aggregate metric can hide important failure modes in rare or high-cost cases.

## Caption

A changed input distribution is a warning, not proof that the model became worse.

Monitor data quality, feature timing, prediction behavior, and delayed labeled outcomes separately. Each signal supports a different conclusion.

1. Feature contract failures
Measure missing, invalid, and unavailable-at-serving-time inputs.

2. Interpret / Feature contract failures
Training data may contain fields that are not actually known when a live prediction is made.

3. Distribution shift
Track documented drift statistics for meaningful input and output dimensions.

4. Interpret / Distribution shift
A drift threshold is a screening signal, not a direct estimate of accuracy.

5. Labeled task quality
Evaluate the chosen task metric with label delay and sampling limitations disclosed.

6. Interpret / Labeled task quality
An aggregate metric can hide important failure modes in rare or high-cost cases.

The takeaway: Monitor contracts, distributions, and labeled outcomes as distinct evidence, not interchangeable scores.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #ai #ml #drift

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A changed input distribution is a warning, not proof that the model became worse.

- **0:06-0:09** / Reveal step 1: Feature contract failures
  Narration: Measure missing, invalid, and unavailable-at-serving-time inputs.

- **0:09-0:16** / Reveal step 2: Interpret / Feature contract failures
  Narration: Training data may contain fields that are not actually known when a live prediction is made.

- **0:16-0:20** / Reveal step 3: Distribution shift
  Narration: Track documented drift statistics for meaningful input and output dimensions.

- **0:20-0:26** / Reveal step 4: Interpret / Distribution shift
  Narration: A drift threshold is a screening signal, not a direct estimate of accuracy.

- **0:26-0:31** / Reveal step 5: Labeled task quality
  Narration: Evaluate the chosen task metric with label delay and sampling limitations disclosed.

- **0:31-0:37** / Reveal step 6: Interpret / Labeled task quality
  Narration: An aggregate metric can hide important failure modes in rare or high-cost cases.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: Monitor contracts, distributions, and labeled outcomes as distinct evidence, not interchangeable scores. Which metric could look healthy while users suffer?

## References

- [Google ML monitoring guidance](https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
