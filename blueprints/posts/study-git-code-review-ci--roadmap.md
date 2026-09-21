# Git, Code Review, and CI That Protect Changes / Learning Roadmap

By Yasir Sharfi

## The Idea

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

## Visual Blueprint

1. **Build the mental model**: Working files, the staging area, and committed history are different. Inspect status and diffs before committing.
2. **Phase 1 / Week 1**: Practice status, diff, staging, commit, log, branches, fetch, and merge using disposable examples.
3. **Phase 2 / Week 2**: Make a narrow bug fix with a test that fails before the fix and passes afterward. Write a review description covering cause, behavior, validation, and residual risk.
4. **Phase 3 / Week 3**: Add CI for the agreed checks and test it on a deliberately failing branch. Practice reverting a published change with a new commit.
5. **Phase 4 / Ongoing**: Remove flaky assumptions, keep test fixtures deterministic, and record why a check exists. Review dependency updates and permissions.
6. **Prove readiness**: Working, staged, committed, and remote states are understood.

## Caption

Is a green CI run enough to approve a change?

Version control records decisions; code review checks risk and clarity; CI verifies repeatable contracts. Use all three together. A green pipeline is not proof of correctness, and a large commit message cannot compensate for an unreviewable change that mixes unrelated behavior.

1. Build the mental model
Working files, the staging area, and committed history are different. Inspect status and diffs before committing.

2. Phase 1 / Week 1
Practice status, diff, staging, commit, log, branches, fetch, and merge using disposable examples.

3. Phase 2 / Week 2
Make a narrow bug fix with a test that fails before the fix and passes afterward. Write a review description covering cause, behavior, validation, and residual risk.

4. Phase 3 / Week 3
Add CI for the agreed checks and test it on a deliberately failing branch. Practice reverting a published change with a new commit.

5. Phase 4 / Ongoing
Remove flaky assumptions, keep test fixtures deterministic, and record why a check exists. Review dependency updates and permissions.

6. Prove readiness
Working, staged, committed, and remote states are understood.

The takeaway: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #git #code

## Reel Storyboard

Suggested duration: about 61 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a green CI run enough to approve a change?

- **0:04-0:11** / Reveal step 1: Build the mental model
  Narration: Working files, the staging area, and committed history are different. Inspect status and diffs before committing.

- **0:11-0:17** / Reveal step 2: Phase 1 / Week 1
  Narration: Practice status, diff, staging, commit, log, branches, fetch, and merge using disposable examples.

- **0:17-0:28** / Reveal step 3: Phase 2 / Week 2
  Narration: Make a narrow bug fix with a test that fails before the fix and passes afterward. Write a review description covering cause, behavior, validation, and residual risk.

- **0:28-0:38** / Reveal step 4: Phase 3 / Week 3
  Narration: Add CI for the agreed checks and test it on a deliberately failing branch. Practice reverting a published change with a new commit.

- **0:38-0:46** / Reveal step 5: Phase 4 / Ongoing
  Narration: Remove flaky assumptions, keep test fixtures deterministic, and record why a check exists. Review dependency updates and permissions.

- **0:46-0:50** / Reveal step 6: Prove readiness
  Narration: Working, staged, committed, and remote states are understood.

- **0:50-1:01** / Takeaway and discussion prompt
  Narration: Practice on a repository you own with a small feature and regression test. Do not rewrite shared history without agreement. Which bottleneck would you measure first?

## References

- [Git, Code Review, and CI That Protect Changes / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=git-code-review-ci)
- [Pro Git book](https://git-scm.com/book/en/v2)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Google engineering practices](https://google.github.io/eng-practices/review/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
