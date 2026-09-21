# AI-Assisted Coding with Tests and Review / Build and Validate

By Yasir Sharfi

## The Idea

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

## Visual Blueprint

1. **Set up the scenario**: A search function skips the last element in a range. The assistant proposes a boundary change and a test that mirrors its interpretation.
2. **Experiment 1**: Read the function's caller and specification to determine whether the range is closed or half-open.
3. **Experiment 2**: Apply the smallest boundary correction consistent with that contract.
4. **Experiment 3**: Review the diff for unrelated formatting, dependency, or API changes.
5. **Expected evidence**: The assistant helps implement the correction, but independent contract evidence determines correctness.
6. **Check the result**: Was the interval convention established from the real API?

## Caption

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

1. Set up the scenario
A search function skips the last element in a range. The assistant proposes a boundary change and a test that mirrors its interpretation.

2. Experiment 1
Read the function's caller and specification to determine whether the range is closed or half-open.

3. Experiment 2
Apply the smallest boundary correction consistent with that contract.

4. Experiment 3
Review the diff for unrelated formatting, dependency, or API changes.

5. Expected evidence
The assistant helps implement the correction, but independent contract evidence determines correctness.

6. Check the result
Was the interval convention established from the real API?

The takeaway: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #assisted #coding

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should I accept code I cannot explain?

- **0:03-0:13** / Reveal step 1: Set up the scenario
  Narration: A search function skips the last element in a range. The assistant proposes a boundary change and a test that mirrors its interpretation.

- **0:13-0:19** / Reveal step 2: Experiment 1
  Narration: Read the function's caller and specification to determine whether the range is closed or half-open.

- **0:19-0:23** / Reveal step 3: Experiment 2
  Narration: Apply the smallest boundary correction consistent with that contract.

- **0:23-0:27** / Reveal step 4: Experiment 3
  Narration: Review the diff for unrelated formatting, dependency, or API changes.

- **0:27-0:32** / Reveal step 5: Expected evidence
  Narration: The assistant helps implement the correction, but independent contract evidence determines correctness.

- **0:32-0:36** / Reveal step 6: Check the result
  Narration: Was the interval convention established from the real API?

- **0:36-0:48** / Takeaway and discussion prompt
  Narration: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time. How would you reproduce this with synthetic data?

## References

- [AI-Assisted Coding with Tests and Review / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ai-assisted-coding-workflow)
- [GitHub Copilot responsible use](https://docs.github.com/en/copilot/responsible-use)
- [Google code review practices](https://google.github.io/eng-practices/review/)
- [OWASP secure coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
