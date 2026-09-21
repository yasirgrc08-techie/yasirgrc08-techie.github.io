# Linux CLI and Debugging for Engineers / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

## Visual Blueprint

1. **Trap 1**: Deleting caches or killing processes before preserving the failure evidence.
2. **Counter-check 1**: Shell quoting and exit codes are understood.
3. **Trap 2**: Using broad recursive permission changes as a default fix.
4. **Counter-check 2**: A service failure can be reduced to a reproducible command.
5. **Trap 3**: Leaking tokens through command history, screenshots, or debug logs.
6. **Counter-check 3**: Inspection precedes risky state changes.

## Caption

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

1. Trap 1
Deleting caches or killing processes before preserving the failure evidence.

2. Counter-check 1
Shell quoting and exit codes are understood.

3. Trap 2
Using broad recursive permission changes as a default fix.

4. Counter-check 2
A service failure can be reduced to a reproducible command.

5. Trap 3
Leaking tokens through command history, screenshots, or debug logs.

6. Counter-check 3
Inspection precedes risky state changes.

The takeaway: Practice in a dedicated directory or disposable environment.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #linux #cli

## Reel Storyboard

Suggested duration: about 32 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why did a command succeed but the script fail?

- **0:04-0:08** / Reveal step 1: Trap 1
  Narration: Deleting caches or killing processes before preserving the failure evidence.

- **0:08-0:11** / Reveal step 2: Counter-check 1
  Narration: Shell quoting and exit codes are understood.

- **0:11-0:15** / Reveal step 3: Trap 2
  Narration: Using broad recursive permission changes as a default fix.

- **0:15-0:19** / Reveal step 4: Counter-check 2
  Narration: A service failure can be reduced to a reproducible command.

- **0:19-0:23** / Reveal step 5: Trap 3
  Narration: Leaking tokens through command history, screenshots, or debug logs.

- **0:23-0:26** / Reveal step 6: Counter-check 3
  Narration: Inspection precedes risky state changes.

- **0:26-0:32** / Takeaway and discussion prompt
  Narration: Practice in a dedicated directory or disposable environment. What evidence would disprove your first diagnosis?

## References

- [Linux CLI and Debugging for Engineers / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=linux-cli-debugging)
- [MIT Missing Semester](https://missing.csail.mit.edu/)
- [Linux manual pages](https://man7.org/linux/man-pages/)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
