# AI and ML Foundations in Six Weeks / Practice Decisions

By Yasir Sharfi

## The Idea

When should I avoid ML?

Learn ML as a decision-making pipeline rather than a catalogue of model names. Define the prediction time, label, objective, data split, baseline, and error costs before optimizing a model. Reliable evaluation and data quality usually matter more than an impressive architecture diagram.

## Visual Blueprint

1. **The target is a contract**: Specify one prediction unit, the moment it is made, the future outcome used as a label, and what action follows. Features must be available at prediction time.
2. **Watch for**: Choosing a model before defining the prediction and action.
3. **Start simple and compare**: A heuristic or simple linear/tree model gives a baseline for value and complexity. Better training fit alone is not progress.
4. **Watch for**: Including future information in features or preprocessing.
5. **Evaluation is part of the model**: Random, grouped, and temporal splits test different generalization claims. Fit preprocessing inside the training boundary.
6. **Watch for**: Reporting one aggregate metric without a baseline or error analysis.

## Caption

When should I avoid ML?

Learn ML as a decision-making pipeline rather than a catalogue of model names. Define the prediction time, label, objective, data split, baseline, and error costs before optimizing a model. Reliable evaluation and data quality usually matter more than an impressive architecture diagram.

1. The target is a contract
Specify one prediction unit, the moment it is made, the future outcome used as a label, and what action follows. Features must be available at prediction time.

2. Watch for
Choosing a model before defining the prediction and action.

3. Start simple and compare
A heuristic or simple linear/tree model gives a baseline for value and complexity. Better training fit alone is not progress.

4. Watch for
Including future information in features or preprocessing.

5. Evaluation is part of the model
Random, grouped, and temporal splits test different generalization claims. Fit preprocessing inside the training boundary.

6. Watch for
Reporting one aggregate metric without a baseline or error analysis.

The takeaway: Use one modest public or synthetic dataset and maintain a reproducible experiment log.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #machine #six

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: When should I avoid ML?

- **0:03-0:14** / Reveal step 1: The target is a contract
  Narration: Specify one prediction unit, the moment it is made, the future outcome used as a label, and what action follows. Features must be available at prediction time.

- **0:14-0:18** / Reveal step 2: Watch for
  Narration: Choosing a model before defining the prediction and action.

- **0:18-0:26** / Reveal step 3: Start simple and compare
  Narration: A heuristic or simple linear/tree model gives a baseline for value and complexity. Better training fit alone is not progress.

- **0:26-0:29** / Reveal step 4: Watch for
  Narration: Including future information in features or preprocessing.

- **0:29-0:35** / Reveal step 5: Evaluation is part of the model
  Narration: Random, grouped, and temporal splits test different generalization claims. Fit preprocessing inside the training boundary.

- **0:35-0:39** / Reveal step 6: Watch for
  Narration: Reporting one aggregate metric without a baseline or error analysis.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: Use one modest public or synthetic dataset and maintain a reproducible experiment log. Which constraint would change your choice?

## References

- [AI and ML Foundations in Six Weeks / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=machine-learning-six-week-plan)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
