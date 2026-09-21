# AI-Assisted Coding with Tests and Review / Readiness Signals

By Yasir Sharfi

## The Idea

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

## Visual Blueprint

1. **Explain**: Task scope and acceptance criteria are explicit.
2. **Interpret / Explain**: Was the interval convention established from the real API?
3. **Implement**: Tests independently represent the intended contract.
4. **Interpret / Implement**: Does a test fail before the fix and pass afterward?
5. **Verify**: The final diff is understood and reviewed.
6. **Interpret / Verify**: Are unrelated user changes and public behavior preserved?

## Caption

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

1. Explain
Task scope and acceptance criteria are explicit.

2. Interpret / Explain
Was the interval convention established from the real API?

3. Implement
Tests independently represent the intended contract.

4. Interpret / Implement
Does a test fail before the fix and pass afterward?

5. Verify
The final diff is understood and reviewed.

6. Interpret / Verify
Are unrelated user changes and public behavior preserved?

The takeaway: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #assisted #coding

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should I accept code I cannot explain?

- **0:03-0:06** / Reveal step 1: Explain
  Narration: Task scope and acceptance criteria are explicit.

- **0:06-0:10** / Reveal step 2: Interpret / Explain
  Narration: Was the interval convention established from the real API?

- **0:10-0:13** / Reveal step 3: Implement
  Narration: Tests independently represent the intended contract.

- **0:13-0:17** / Reveal step 4: Interpret / Implement
  Narration: Does a test fail before the fix and pass afterward?

- **0:17-0:20** / Reveal step 5: Verify
  Narration: The final diff is understood and reviewed.

- **0:20-0:24** / Reveal step 6: Interpret / Verify
  Narration: Are unrelated user changes and public behavior preserved?

- **0:24-0:36** / Takeaway and discussion prompt
  Narration: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time. Which metric could look healthy while users suffer?

## References

- [AI-Assisted Coding with Tests and Review / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ai-assisted-coding-workflow)
- [GitHub Copilot responsible use](https://docs.github.com/en/copilot/responsible-use)
- [Google code review practices](https://google.github.io/eng-practices/review/)
- [OWASP secure coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
