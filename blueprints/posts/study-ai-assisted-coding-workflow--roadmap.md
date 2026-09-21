# AI-Assisted Coding with Tests and Review / Learning Roadmap

By Yasir Sharfi

## The Idea

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

## Visual Blueprint

1. **Build the mental model**: Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.
2. **Phase 1 / Days 1-3**: Choose a small bug or feature. Write the current behavior, intended contract, non-goals, and a focused check.
3. **Phase 2 / Days 4-6**: Ask the assistant to identify the controlling code and propose a minimal patch. Run a behavior-scoped test immediately after the change.
4. **Phase 3 / Days 7-10**: Inspect edge cases, error paths, dependencies, public APIs, and security boundaries. Verify unfamiliar API claims against documentation.
5. **Phase 4 / Days 11-14**: Record elapsed time including review, defects found, and rework. Keep the helpful task patterns and remove unreliable shortcuts.
6. **Prove readiness**: Task scope and acceptance criteria are explicit.

## Caption

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

1. Build the mental model
Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.

2. Phase 1 / Days 1-3
Choose a small bug or feature. Write the current behavior, intended contract, non-goals, and a focused check.

3. Phase 2 / Days 4-6
Ask the assistant to identify the controlling code and propose a minimal patch. Run a behavior-scoped test immediately after the change.

4. Phase 3 / Days 7-10
Inspect edge cases, error paths, dependencies, public APIs, and security boundaries. Verify unfamiliar API claims against documentation.

5. Phase 4 / Days 11-14
Record elapsed time including review, defects found, and rework. Keep the helpful task patterns and remove unreliable shortcuts.

6. Prove readiness
Task scope and acceptance criteria are explicit.

The takeaway: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #assisted #coding

## Reel Storyboard

Suggested duration: about 57 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should I accept code I cannot explain?

- **0:03-0:12** / Reveal step 1: Build the mental model
  Narration: Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.

- **0:12-0:19** / Reveal step 2: Phase 1 / Days 1-3
  Narration: Choose a small bug or feature. Write the current behavior, intended contract, non-goals, and a focused check.

- **0:19-0:28** / Reveal step 3: Phase 2 / Days 4-6
  Narration: Ask the assistant to identify the controlling code and propose a minimal patch. Run a behavior-scoped test immediately after the change.

- **0:28-0:35** / Reveal step 4: Phase 3 / Days 7-10
  Narration: Inspect edge cases, error paths, dependencies, public APIs, and security boundaries. Verify unfamiliar API claims against documentation.

- **0:35-0:43** / Reveal step 5: Phase 4 / Days 11-14
  Narration: Record elapsed time including review, defects found, and rework. Keep the helpful task patterns and remove unreliable shortcuts.

- **0:43-0:46** / Reveal step 6: Prove readiness
  Narration: Task scope and acceptance criteria are explicit.

- **0:46-0:57** / Takeaway and discussion prompt
  Narration: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time. Which bottleneck would you measure first?

## References

- [AI-Assisted Coding with Tests and Review / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ai-assisted-coding-workflow)
- [GitHub Copilot responsible use](https://docs.github.com/en/copilot/responsible-use)
- [Google code review practices](https://google.github.io/eng-practices/review/)
- [OWASP secure coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
