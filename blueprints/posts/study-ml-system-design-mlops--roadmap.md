# ML System Design and MLOps Foundations / Learning Roadmap

By Yasir Sharfi

## The Idea

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

## Visual Blueprint

1. **Build the mental model**: A feature needs an entity key, event time, availability time, version, and freshness policy.
2. **Phase 1 / Week 1**: Define prediction unit, label window, exposure data, and a baseline. Establish temporal or grouped evaluation and record data provenance.
3. **Phase 2 / Week 2**: Create point-in-time features, version transformations, and validate missing or delayed inputs. Train a simple model and compare it fairly with the baseline.
4. **Phase 3 / Week 3**: Define API latency, model/feature compatibility, fallbacks, shadow or canary evaluation, and rollback. Estimate online retrieval and ranking work separately.
5. **Phase 4 / Week 4**: Design delayed-label evaluation, drift investigation, and experiment guardrails. Review cold-start cohorts and feedback loops.
6. **Prove readiness**: Feature and label timing are explicit.

## Caption

What is training-serving skew?

A production ML system includes the processes that create, validate, serve, and monitor predictions. The weights are one component. Define feature availability, label delay, version compatibility, latency, and recovery so a statistically promising model can make dependable decisions in the real application.

1. Build the mental model
A feature needs an entity key, event time, availability time, version, and freshness policy.

2. Phase 1 / Week 1
Define prediction unit, label window, exposure data, and a baseline. Establish temporal or grouped evaluation and record data provenance.

3. Phase 2 / Week 2
Create point-in-time features, version transformations, and validate missing or delayed inputs. Train a simple model and compare it fairly with the baseline.

4. Phase 3 / Week 3
Define API latency, model/feature compatibility, fallbacks, shadow or canary evaluation, and rollback. Estimate online retrieval and ranking work separately.

5. Phase 4 / Week 4
Design delayed-label evaluation, drift investigation, and experiment guardrails. Review cold-start cohorts and feedback loops.

6. Prove readiness
Feature and label timing are explicit.

The takeaway: Use a small recommendation or risk-scoring case with synthetic data.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #system #design

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: What is training-serving skew?

- **0:03-0:09** / Reveal step 1: Build the mental model
  Narration: A feature needs an entity key, event time, availability time, version, and freshness policy.

- **0:09-0:17** / Reveal step 2: Phase 1 / Week 1
  Narration: Define prediction unit, label window, exposure data, and a baseline. Establish temporal or grouped evaluation and record data provenance.

- **0:17-0:26** / Reveal step 3: Phase 2 / Week 2
  Narration: Create point-in-time features, version transformations, and validate missing or delayed inputs. Train a simple model and compare it fairly with the baseline.

- **0:26-0:34** / Reveal step 4: Phase 3 / Week 3
  Narration: Define API latency, model/feature compatibility, fallbacks, shadow or canary evaluation, and rollback. Estimate online retrieval and ranking work separately.

- **0:34-0:40** / Reveal step 5: Phase 4 / Week 4
  Narration: Design delayed-label evaluation, drift investigation, and experiment guardrails. Review cold-start cohorts and feedback loops.

- **0:40-0:43** / Reveal step 6: Prove readiness
  Narration: Feature and label timing are explicit.

- **0:43-0:50** / Takeaway and discussion prompt
  Narration: Use a small recommendation or risk-scoring case with synthetic data. Which bottleneck would you measure first?

## References

- [ML System Design and MLOps Foundations / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ml-system-design-mlops)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Google recommendation systems](https://developers.google.com/machine-learning/recommendation)
- [Azure AI/ML architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
