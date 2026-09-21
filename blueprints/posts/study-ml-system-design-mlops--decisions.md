# ML System Design and MLOps Foundations / Practice Decisions

By Yasir Sharfi

## The Idea

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

## Visual Blueprint

1. **Time is part of a feature**: A feature needs an entity key, event time, availability time, version, and freshness policy.
2. **Watch for**: Joining historical examples to the latest feature snapshot.
3. **Version the whole decision path**: Model, preprocessing, feature definitions, label logic, and serving configuration can change independently. Record compatible versions and a rollback path.
4. **Watch for**: Versioning only model weights and ignoring transformations.
5. **Monitor more than output distribution**: Track data quality, missing features, freshness, latency, errors, prediction distribution, and mature outcome metrics.
6. **Watch for**: Equating offline metric improvement with safe online rollout.

## Caption

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

1. Time is part of a feature
A feature needs an entity key, event time, availability time, version, and freshness policy.

2. Watch for
Joining historical examples to the latest feature snapshot.

3. Version the whole decision path
Model, preprocessing, feature definitions, label logic, and serving configuration can change independently. Record compatible versions and a rollback path.

4. Watch for
Versioning only model weights and ignoring transformations.

5. Monitor more than output distribution
Track data quality, missing features, freshness, latency, errors, prediction distribution, and mature outcome metrics.

6. Watch for
Equating offline metric improvement with safe online rollout.

The takeaway: Use a small recommendation or risk-scoring case with synthetic data.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #system #design

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: What is training-serving skew?

- **0:03-0:09** / Reveal step 1: Time is part of a feature
  Narration: A feature needs an entity key, event time, availability time, version, and freshness policy.

- **0:09-0:13** / Reveal step 2: Watch for
  Narration: Joining historical examples to the latest feature snapshot.

- **0:13-0:21** / Reveal step 3: Version the whole decision path
  Narration: Model, preprocessing, feature definitions, label logic, and serving configuration can change independently. Record compatible versions and a rollback path.

- **0:21-0:24** / Reveal step 4: Watch for
  Narration: Versioning only model weights and ignoring transformations.

- **0:24-0:30** / Reveal step 5: Monitor more than output distribution
  Narration: Track data quality, missing features, freshness, latency, errors, prediction distribution, and mature outcome metrics.

- **0:30-0:34** / Reveal step 6: Watch for
  Narration: Equating offline metric improvement with safe online rollout.

- **0:34-0:41** / Takeaway and discussion prompt
  Narration: Use a small recommendation or risk-scoring case with synthetic data. Which constraint would change your choice?

## References

- [ML System Design and MLOps Foundations / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ml-system-design-mlops)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Google recommendation systems](https://developers.google.com/machine-learning/recommendation)
- [Azure AI/ML architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
