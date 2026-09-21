# Explain Correctness, Complexity, and Tests / Practice Decisions

By Yasir Sharfi

## The Idea

Can tests replace a correctness proof?

A complete coding answer includes a contract, a reason the algorithm is correct, an implementation, tests, and a realistic cost analysis. These are not optional finishing touches. They expose assumptions early and help you recover from feedback without replacing the whole solution blindly.

## Visual Blueprint

1. **Clarification is part of solving**: Ask about duplicates, sortedness, mutation, missing answers, size limits, and return format when relevant.
2. **Watch for**: Reporting complexity for an idea rather than the actual implementation.
3. **An invariant connects iterations**: State what is true before and after each step, why initialization establishes it, why the update preserves it, and why termination yields the answer.
4. **Watch for**: Testing only the examples supplied in the prompt.
5. **Tests discriminate hypotheses**: A useful test targets a boundary, duplicate, stale state, overflow, or invalid assumption. Tiny counterexamples are easier to trace.
6. **Watch for**: Using a baseline that shares the same optimization and bug.

## Caption

Can tests replace a correctness proof?

A complete coding answer includes a contract, a reason the algorithm is correct, an implementation, tests, and a realistic cost analysis. These are not optional finishing touches. They expose assumptions early and help you recover from feedback without replacing the whole solution blindly.

1. Clarification is part of solving
Ask about duplicates, sortedness, mutation, missing answers, size limits, and return format when relevant.

2. Watch for
Reporting complexity for an idea rather than the actual implementation.

3. An invariant connects iterations
State what is true before and after each step, why initialization establishes it, why the update preserves it, and why termination yields the answer.

4. Watch for
Testing only the examples supplied in the prompt.

5. Tests discriminate hypotheses
A useful test targets a boundary, duplicate, stale state, overflow, or invalid assumption. Tiny counterexamples are easier to trace.

6. Watch for
Using a baseline that shares the same optimization and bug.

The takeaway: Reserve a fixed portion of each practice session for explanation and tests.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DSAandProblemSolving #learning #coding #correctness

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Can tests replace a correctness proof?

- **0:03-0:09** / Reveal step 1: Clarification is part of solving
  Narration: Ask about duplicates, sortedness, mutation, missing answers, size limits, and return format when relevant.

- **0:09-0:13** / Reveal step 2: Watch for
  Narration: Reporting complexity for an idea rather than the actual implementation.

- **0:13-0:23** / Reveal step 3: An invariant connects iterations
  Narration: State what is true before and after each step, why initialization establishes it, why the update preserves it, and why termination yields the answer.

- **0:23-0:27** / Reveal step 4: Watch for
  Narration: Testing only the examples supplied in the prompt.

- **0:27-0:35** / Reveal step 5: Tests discriminate hypotheses
  Narration: A useful test targets a boundary, duplicate, stale state, overflow, or invalid assumption. Tiny counterexamples are easier to trace.

- **0:35-0:39** / Reveal step 6: Watch for
  Narration: Using a baseline that shares the same optimization and bug.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: Reserve a fixed portion of each practice session for explanation and tests. Which constraint would change your choice?

## References

- [Explain Correctness, Complexity, and Tests / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=coding-correctness-testing)
- [MIT algorithms course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
- [Python unittest](https://docs.python.org/3/library/unittest.html)
- [Hypothesis property-based testing](https://hypothesis.readthedocs.io/en/latest/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
