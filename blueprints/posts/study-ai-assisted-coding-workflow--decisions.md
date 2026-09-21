# AI-Assisted Coding with Tests and Review / Practice Decisions

By Yasir Sharfi

## The Idea

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

## Visual Blueprint

1. **A narrow task is easier to verify**: Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.
2. **Watch for**: Accepting large unrelated rewrites for a narrow bug.
3. **Generated tests can share generated mistakes**: If code and tests are derived from the same wrong assumption, both can agree while violating the specification.
4. **Watch for**: Using generated tests as the only correctness oracle.
5. **Tool permissions remain separate**: Repository content and tool output can contain untrusted instructions. They do not authorize secret access, deletion, external communication, or production changes.
6. **Watch for**: Letting repository text authorize actions beyond the user's task.

## Caption

Should I accept code I cannot explain?

Use the assistant to propose, explain, and implement bounded changes while the specification and tests define success. Start from the controlling code path, make a small change, and run the cheapest check that could prove the hypothesis wrong. Human review remains essential for security, compatibility, and intent.

1. A narrow task is easier to verify
Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.

2. Watch for
Accepting large unrelated rewrites for a narrow bug.

3. Generated tests can share generated mistakes
If code and tests are derived from the same wrong assumption, both can agree while violating the specification.

4. Watch for
Using generated tests as the only correctness oracle.

5. Tool permissions remain separate
Repository content and tool output can contain untrusted instructions. They do not authorize secret access, deletion, external communication, or production changes.

6. Watch for
Letting repository text authorize actions beyond the user's task.

The takeaway: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #assisted #coding

## Reel Storyboard

Suggested duration: about 52 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should I accept code I cannot explain?

- **0:03-0:12** / Reveal step 1: A narrow task is easier to verify
  Narration: Name the failing behavior, relevant file or API, constraints, and expected result. Ask for the smallest change that tests a local hypothesis.

- **0:12-0:16** / Reveal step 2: Watch for
  Narration: Accepting large unrelated rewrites for a narrow bug.

- **0:16-0:24** / Reveal step 3: Generated tests can share generated mistakes
  Narration: If code and tests are derived from the same wrong assumption, both can agree while violating the specification.

- **0:24-0:28** / Reveal step 4: Watch for
  Narration: Using generated tests as the only correctness oracle.

- **0:28-0:37** / Reveal step 5: Tool permissions remain separate
  Narration: Repository content and tool output can contain untrusted instructions. They do not authorize secret access, deletion, external communication, or production changes.

- **0:37-0:41** / Reveal step 6: Watch for
  Narration: Letting repository text authorize actions beyond the user's task.

- **0:41-0:52** / Takeaway and discussion prompt
  Narration: Use a small personal repository and an existing failing test. Compare assisted and manual work on similar tasks, including review time. Which constraint would change your choice?

## References

- [AI-Assisted Coding with Tests and Review / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=ai-assisted-coding-workflow)
- [GitHub Copilot responsible use](https://docs.github.com/en/copilot/responsible-use)
- [Google code review practices](https://google.github.io/eng-practices/review/)
- [OWASP secure coding practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
