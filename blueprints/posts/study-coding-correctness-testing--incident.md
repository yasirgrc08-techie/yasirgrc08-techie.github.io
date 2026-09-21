# Explain Correctness, Complexity, and Tests / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Can tests replace a correctness proof?

A complete coding answer includes a contract, a reason the algorithm is correct, an implementation, tests, and a realistic cost analysis. These are not optional finishing touches. They expose assumptions early and help you recover from feedback without replacing the whole solution blindly.

## Visual Blueprint

1. **Trap 1**: Reporting complexity for an idea rather than the actual implementation.
2. **Counter-check 1**: Input and output assumptions are explicit.
3. **Trap 2**: Testing only the examples supplied in the prompt.
4. **Counter-check 2**: The correctness argument matches the implementation.
5. **Trap 3**: Using a baseline that shares the same optimization and bug.
6. **Counter-check 3**: Tests target meaningful failure modes and boundaries.

## Caption

Can tests replace a correctness proof?

A complete coding answer includes a contract, a reason the algorithm is correct, an implementation, tests, and a realistic cost analysis. These are not optional finishing touches. They expose assumptions early and help you recover from feedback without replacing the whole solution blindly.

1. Trap 1
Reporting complexity for an idea rather than the actual implementation.

2. Counter-check 1
Input and output assumptions are explicit.

3. Trap 2
Testing only the examples supplied in the prompt.

4. Counter-check 2
The correctness argument matches the implementation.

5. Trap 3
Using a baseline that shares the same optimization and bug.

6. Counter-check 3
Tests target meaningful failure modes and boundaries.

The takeaway: Reserve a fixed portion of each practice session for explanation and tests.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DSAandProblemSolving #learning #coding #correctness

## Reel Storyboard

Suggested duration: about 32 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Can tests replace a correctness proof?

- **0:03-0:07** / Reveal step 1: Trap 1
  Narration: Reporting complexity for an idea rather than the actual implementation.

- **0:07-0:10** / Reveal step 2: Counter-check 1
  Narration: Input and output assumptions are explicit.

- **0:10-0:14** / Reveal step 3: Trap 2
  Narration: Testing only the examples supplied in the prompt.

- **0:14-0:17** / Reveal step 4: Counter-check 2
  Narration: The correctness argument matches the implementation.

- **0:17-0:21** / Reveal step 5: Trap 3
  Narration: Using a baseline that shares the same optimization and bug.

- **0:21-0:24** / Reveal step 6: Counter-check 3
  Narration: Tests target meaningful failure modes and boundaries.

- **0:24-0:32** / Takeaway and discussion prompt
  Narration: Reserve a fixed portion of each practice session for explanation and tests. What evidence would disprove your first diagnosis?

## References

- [Explain Correctness, Complexity, and Tests / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=coding-correctness-testing)
- [MIT algorithms course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
- [Python unittest](https://docs.python.org/3/library/unittest.html)
- [Hypothesis property-based testing](https://hypothesis.readthedocs.io/en/latest/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
