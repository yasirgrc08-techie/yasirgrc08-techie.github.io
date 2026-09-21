# AI and ML Foundations in Six Weeks / Build and Validate

By Yasir Sharfi

## The Idea

When should I avoid ML?

Learn ML as a decision-making pipeline rather than a catalogue of model names. Define the prediction time, label, objective, data split, baseline, and error costs before optimizing a model. Reliable evaluation and data quality usually matter more than an impressive architecture diagram.

## Visual Blueprint

1. **Set up the scenario**: A subscription product wants to identify customers likely to leave in the next thirty days.
2. **Experiment 1**: Choose a prediction date and a future thirty-day label window. Define churn precisely and include only features available by the prediction date.
3. **Experiment 2**: Use a chronological evaluation split and compare with a simple recency or activity baseline.
4. **Experiment 3**: Evaluate ranking and a capacity-limited intervention threshold, considering false alarms and intervention cost.
5. **Expected evidence**: The project has a defensible prediction boundary and baseline.
6. **Check the result**: Could every feature exist at the real prediction moment?

## Caption

When should I avoid ML?

Learn ML as a decision-making pipeline rather than a catalogue of model names. Define the prediction time, label, objective, data split, baseline, and error costs before optimizing a model. Reliable evaluation and data quality usually matter more than an impressive architecture diagram.

1. Set up the scenario
A subscription product wants to identify customers likely to leave in the next thirty days.

2. Experiment 1
Choose a prediction date and a future thirty-day label window. Define churn precisely and include only features available by the prediction date.

3. Experiment 2
Use a chronological evaluation split and compare with a simple recency or activity baseline.

4. Experiment 3
Evaluate ranking and a capacity-limited intervention threshold, considering false alarms and intervention cost.

5. Expected evidence
The project has a defensible prediction boundary and baseline.

6. Check the result
Could every feature exist at the real prediction moment?

The takeaway: Use one modest public or synthetic dataset and maintain a reproducible experiment log.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #machine #six

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: When should I avoid ML?

- **0:03-0:09** / Reveal step 1: Set up the scenario
  Narration: A subscription product wants to identify customers likely to leave in the next thirty days.

- **0:09-0:18** / Reveal step 2: Experiment 1
  Narration: Choose a prediction date and a future thirty-day label window. Define churn precisely and include only features available by the prediction date.

- **0:18-0:24** / Reveal step 3: Experiment 2
  Narration: Use a chronological evaluation split and compare with a simple recency or activity baseline.

- **0:24-0:30** / Reveal step 4: Experiment 3
  Narration: Evaluate ranking and a capacity-limited intervention threshold, considering false alarms and intervention cost.

- **0:30-0:34** / Reveal step 5: Expected evidence
  Narration: The project has a defensible prediction boundary and baseline.

- **0:34-0:38** / Reveal step 6: Check the result
  Narration: Could every feature exist at the real prediction moment?

- **0:38-0:47** / Takeaway and discussion prompt
  Narration: Use one modest public or synthetic dataset and maintain a reproducible experiment log. How would you reproduce this with synthetic data?

## References

- [AI and ML Foundations in Six Weeks / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=machine-learning-six-week-plan)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
