# Linux CLI and Debugging for Engineers / Practice Decisions

By Yasir Sharfi

## The Idea

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

## Visual Blueprint

1. **Commands have contracts**: Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.
2. **Watch for**: Deleting caches or killing processes before preserving the failure evidence.
3. **Core consideration 2**: Inspect ownership, mode, path traversal permissions, and the actual user running a process.
4. **Watch for**: Using broad recursive permission changes as a default fix.
5. **Debug by discrimination**: State what you expect, what happened, and one observation that distinguishes competing causes. A minimal reproducer reduces irrelevant state.
6. **Watch for**: Leaking tokens through command history, screenshots, or debug logs.

## Caption

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

1. Commands have contracts
Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.

2. Watch for
Deleting caches or killing processes before preserving the failure evidence.

3. Core consideration 2
Inspect ownership, mode, path traversal permissions, and the actual user running a process.

4. Watch for
Using broad recursive permission changes as a default fix.

5. Debug by discrimination
State what you expect, what happened, and one observation that distinguishes competing causes. A minimal reproducer reduces irrelevant state.

6. Watch for
Leaking tokens through command history, screenshots, or debug logs.

The takeaway: Practice in a dedicated directory or disposable environment.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #linux #cli

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why did a command succeed but the script fail?

- **0:04-0:10** / Reveal step 1: Commands have contracts
  Narration: Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.

- **0:10-0:14** / Reveal step 2: Watch for
  Narration: Deleting caches or killing processes before preserving the failure evidence.

- **0:14-0:20** / Reveal step 3: Core consideration 2
  Narration: Inspect ownership, mode, path traversal permissions, and the actual user running a process.

- **0:20-0:24** / Reveal step 4: Watch for
  Narration: Using broad recursive permission changes as a default fix.

- **0:24-0:32** / Reveal step 5: Debug by discrimination
  Narration: State what you expect, what happened, and one observation that distinguishes competing causes. A minimal reproducer reduces irrelevant state.

- **0:32-0:36** / Reveal step 6: Watch for
  Narration: Leaking tokens through command history, screenshots, or debug logs.

- **0:36-0:42** / Takeaway and discussion prompt
  Narration: Practice in a dedicated directory or disposable environment. Which constraint would change your choice?

## References

- [Linux CLI and Debugging for Engineers / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=linux-cli-debugging)
- [MIT Missing Semester](https://missing.csail.mit.edu/)
- [Linux manual pages](https://man7.org/linux/man-pages/)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
