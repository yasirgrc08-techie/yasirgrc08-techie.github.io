# Git, Code Review, and CI That Protect Changes / Practice Decisions

By Yasir Sharfi

## The Idea

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

## Visual Blueprint

1. **Understand the three states**: Working files, the staging area, and committed history are different. Inspect status and diffs before committing.
2. **Watch for**: Publishing against stale remote-tracking information.
3. **Review the behavioral contract**: Explain what changed, why, and how it was checked. A reviewer needs the relevant assumptions, failure cases, and compatibility risks.
4. **Watch for**: Resolving conflicts by discarding unfamiliar changes.
5. **CI is executable agreement**: Run formatting or linting, focused tests, and build checks appropriate to the project. Use reproducible dependency versions and avoid secrets in logs.
6. **Watch for**: Treating lint or coverage percentage as proof of behavioral correctness.

## Caption

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

1. Understand the three states
Working files, the staging area, and committed history are different. Inspect status and diffs before committing.

2. Watch for
Publishing against stale remote-tracking information.

3. Review the behavioral contract
Explain what changed, why, and how it was checked. A reviewer needs the relevant assumptions, failure cases, and compatibility risks.

4. Watch for
Resolving conflicts by discarding unfamiliar changes.

5. CI is executable agreement
Run formatting or linting, focused tests, and build checks appropriate to the project. Use reproducible dependency versions and avoid secrets in logs.

6. Watch for
Treating lint or coverage percentage as proof of behavioral correctness.

The takeaway: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #git #code

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a green CI run enough to approve a change?

- **0:04-0:11** / Reveal step 1: Understand the three states
  Narration: Working files, the staging area, and committed history are different. Inspect status and diffs before committing.

- **0:11-0:14** / Reveal step 2: Watch for
  Narration: Publishing against stale remote-tracking information.

- **0:14-0:22** / Reveal step 3: Review the behavioral contract
  Narration: Explain what changed, why, and how it was checked. A reviewer needs the relevant assumptions, failure cases, and compatibility risks.

- **0:22-0:25** / Reveal step 4: Watch for
  Narration: Resolving conflicts by discarding unfamiliar changes.

- **0:25-0:34** / Reveal step 5: CI is executable agreement
  Narration: Run formatting or linting, focused tests, and build checks appropriate to the project. Use reproducible dependency versions and avoid secrets in logs.

- **0:34-0:38** / Reveal step 6: Watch for
  Narration: Treating lint or coverage percentage as proof of behavioral correctness.

- **0:38-0:49** / Takeaway and discussion prompt
  Narration: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement. Which constraint would change your choice?

## References

- [Git, Code Review, and CI That Protect Changes / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=git-code-review-ci)
- [Pro Git book](https://git-scm.com/book/en/v2)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Google engineering practices](https://google.github.io/eng-practices/review/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
