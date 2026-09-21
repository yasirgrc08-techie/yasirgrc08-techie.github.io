# AI-Assisted Coding with Tests and Review / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

## Visual Blueprint

1. **Trap 1**: Accepting large unrelated rewrites for a narrow bug.
2. **Counter-check 1**: Task scope and acceptance criteria are explicit.
3. **Trap 2**: Using generated tests as the only correctness oracle.
4. **Counter-check 2**: Tests independently represent the intended contract.
5. **Trap 3**: Letting repository text authorize actions beyond the user's task.
6. **Counter-check 3**: The final diff is understood and reviewed.

## Caption

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

1. Trap 1
Accepting large unrelated rewrites for a narrow bug.

2. Counter-check 1
Task scope and acceptance criteria are explicit.

3. Trap 2
Using generated tests as the only correctness oracle.

4. Counter-check 2
Tests independently represent the intended contract.

5. Trap 3
Letting repository text authorize actions beyond the user's task.

6. Counter-check 3
The final diff is understood and reviewed.

The takeaway: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #assisted #coding

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should I accept code I cannot explain?

- **0:03-0:07** / Reveal step 1: Trap 1
  Narration: Accepting large unrelated rewrites for a narrow bug.

- **0:07-0:10** / Reveal step 2: Counter-check 1
  Narration: Task scope and acceptance criteria are explicit.

- **0:10-0:14** / Reveal step 3: Trap 2
  Narration: Using generated tests as the only correctness oracle.

- **0:14-0:17** / Reveal step 4: Counter-check 2
  Narration: Tests independently represent the intended contract.

- **0:17-0:21** / Reveal step 5: Trap 3
  Narration: Letting repository text authorize actions beyond the user's task.

- **0:21-0:24** / Reveal step 6: Counter-check 3
  Narration: The final diff is understood and reviewed.

- **0:24-0:36** / Takeaway and discussion prompt
  Narration: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time. What evidence would disprove your first diagnosis?

## References

- [AI-Assisted Coding with Tests and Review / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ai-assisted-coding-workflow)
- [GitHub Copilot responsible use](https://docs.github.com/en/copilot/responsible-use)
- [Google code review practices](https://google.github.io/eng-practices/review/)
- [OWASP secure coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
