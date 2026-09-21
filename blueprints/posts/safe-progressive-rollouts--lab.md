# Rollouts Need Stop Conditions / Build and Validate

By Yasir Sharfi

## The Idea

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

## Visual Blueprint

1. **Create two versions**: Make one local version contain a controlled slow or incorrect path.
2. **Split synthetic traffic**: Use the same request mix for baseline and candidate.
3. **Define promotion gates**: Write explicit pass and stop conditions before collecting results.
4. **Inject delayed failure**: Include a defect visible only in a background task.
5. **Practice recovery**: Roll back traffic while checking compatibility with candidate-written data.
6. **Record the decision**: Explain why the measured evidence supports promotion or rejection.

## Caption

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

1. Create two versions
Make one local version contain a controlled slow or incorrect path.

2. Split synthetic traffic
Use the same request mix for baseline and candidate.

3. Define promotion gates
Write explicit pass and stop conditions before collecting results.

4. Inject delayed failure
Include a defect visible only in a background task.

5. Practice recovery
Roll back traffic while checking compatibility with candidate-written data.

6. Record the decision
Explain why the measured evidence supports promotion or rejection.

The takeaway: Progressive delivery works only when the cohort, signals, and recovery path are meaningful.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #canary #rollout

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A deployment is not safe merely because only a small percentage sees it first.

- **0:06-0:11** / Reveal step 1: Create two versions
  Narration: Make one local version contain a controlled slow or incorrect path.

- **0:11-0:15** / Reveal step 2: Split synthetic traffic
  Narration: Use the same request mix for baseline and candidate.

- **0:15-0:19** / Reveal step 3: Define promotion gates
  Narration: Write explicit pass and stop conditions before collecting results.

- **0:19-0:23** / Reveal step 4: Inject delayed failure
  Narration: Include a defect visible only in a background task.

- **0:23-0:27** / Reveal step 5: Practice recovery
  Narration: Roll back traffic while checking compatibility with candidate-written data.

- **0:27-0:31** / Reveal step 6: Record the decision
  Narration: Explain why the measured evidence supports promotion or rejection.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Progressive delivery works only when the cohort, signals, and recovery path are meaningful. How would you reproduce this with synthetic data?

## References

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
