# ML System Design and MLOps Foundations / Build and Validate

By Yasir Sharfi

## The Idea

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

## Visual Blueprint

1. **Set up the scenario**: A fraud model uses a customer's rolling transaction total.
2. **Experiment 1**: Define each prediction timestamp and the feature's event and availability times.
3. **Experiment 2**: Use an as-of or point-in-time join with versioned feature logic and a temporal evaluation split.
4. **Experiment 3**: Align online serving with the same transformation semantics and monitor freshness.
5. **Expected evidence**: The corrected evaluation represents a feasible deployment decision.
6. **Check the result**: Does adding a future event leave past features unchanged?

## Caption

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

1. Set up the scenario
A fraud model uses a customer's rolling transaction total.

2. Experiment 1
Define each prediction timestamp and the feature's event and availability times.

3. Experiment 2
Use an as-of or point-in-time join with versioned feature logic and a temporal evaluation split.

4. Experiment 3
Align online serving with the same transformation semantics and monitor freshness.

5. Expected evidence
The corrected evaluation represents a feasible deployment decision.

6. Check the result
Does adding a future event leave past features unchanged?

The takeaway: Use a small recommendation or risk-scoring case with synthetic data.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #system #design

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: What is training-serving skew?

- **0:03-0:07** / Reveal step 1: Set up the scenario
  Narration: A fraud model uses a customer's rolling transaction total.

- **0:07-0:12** / Reveal step 2: Experiment 1
  Narration: Define each prediction timestamp and the feature's event and availability times.

- **0:12-0:18** / Reveal step 3: Experiment 2
  Narration: Use an as-of or point-in-time join with versioned feature logic and a temporal evaluation split.

- **0:18-0:23** / Reveal step 4: Experiment 3
  Narration: Align online serving with the same transformation semantics and monitor freshness.

- **0:23-0:27** / Reveal step 5: Expected evidence
  Narration: The corrected evaluation represents a feasible deployment decision.

- **0:27-0:31** / Reveal step 6: Check the result
  Narration: Does adding a future event leave past features unchanged?

- **0:31-0:39** / Takeaway and discussion prompt
  Narration: Use a small recommendation or risk-scoring case with synthetic data. How would you reproduce this with synthetic data?

## References

- [ML System Design and MLOps Foundations / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ml-system-design-mlops)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Google recommendation systems](https://developers.google.com/machine-learning/recommendation)
- [Azure AI/ML architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
