# Git, Code Review, and CI That Protect Changes / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

## Visual Blueprint

1. **Trap 1**: Publishing against stale remote-tracking information.
2. **Counter-check 1**: Working, staged, committed, and remote states are understood.
3. **Trap 2**: Resolving conflicts by discarding unfamiliar changes.
4. **Counter-check 2**: A regression test demonstrates the bug being fixed.
5. **Trap 3**: Treating lint or coverage percentage as proof of behavioral correctness.
6. **Counter-check 3**: Review descriptions identify risks and verification.

## Caption

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

1. Trap 1
Publishing against stale remote-tracking information.

2. Counter-check 1
Working, staged, committed, and remote states are understood.

3. Trap 2
Resolving conflicts by discarding unfamiliar changes.

4. Counter-check 2
A regression test demonstrates the bug being fixed.

5. Trap 3
Treating lint or coverage percentage as proof of behavioral correctness.

6. Counter-check 3
Review descriptions identify risks and verification.

The takeaway: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #git #code

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a green CI run enough to approve a change?

- **0:04-0:07** / Reveal step 1: Trap 1
  Narration: Publishing against stale remote-tracking information.

- **0:07-0:11** / Reveal step 2: Counter-check 1
  Narration: Working, staged, committed, and remote states are understood.

- **0:11-0:14** / Reveal step 3: Trap 2
  Narration: Resolving conflicts by discarding unfamiliar changes.

- **0:14-0:18** / Reveal step 4: Counter-check 2
  Narration: A regression test demonstrates the bug being fixed.

- **0:18-0:22** / Reveal step 5: Trap 3
  Narration: Treating lint or coverage percentage as proof of behavioral correctness.

- **0:22-0:25** / Reveal step 6: Counter-check 3
  Narration: Review descriptions identify risks and verification.

- **0:25-0:36** / Takeaway and discussion prompt
  Narration: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement. What evidence would disprove your first diagnosis?

## References

- [Git, Code Review, and CI That Protect Changes / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=git-code-review-ci)
- [Pro Git book](https://git-scm.com/book/en/v2)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Google engineering practices](https://google.github.io/eng-practices/review/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
