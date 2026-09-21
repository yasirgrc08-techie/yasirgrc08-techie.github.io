# Linux CLI and Debugging for Engineers / Learning Roadmap

By Yasir Sharfi

## The Idea

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

## Visual Blueprint

1. **Build the mental model**: Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.
2. **Phase 1 / Week 1**: Learn navigation, quoting, redirection, pipes, environment scope, and exit codes. Create a small script that accepts a path, validates it, and reports useful errors.
3. **Phase 2 / Week 2**: Inspect file metadata, permissions, disk usage, process trees, CPU, memory, and local listening ports.
4. **Phase 3 / Week 3**: Add structured timestamps and request IDs to a local service. Use its logs, a debugger, and authorized system-call tracing to inspect a failed request.
5. **Phase 4 / Week 4**: Automate the reproducer and a regression test. Handle command failures explicitly and clean only resources created by the test.
6. **Prove readiness**: Shell quoting and exit codes are understood.

## Caption

Why did a command succeed but the script fail?

Treat the shell as a way to ask precise questions about a system. Learn navigation, quoting, streams, processes, logs, and debugging through a disposable local project. Prefer narrow read-only inspection before changing state, and preserve the evidence that supports each diagnosis.

1. Build the mental model
Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.

2. Phase 1 / Week 1
Learn navigation, quoting, redirection, pipes, environment scope, and exit codes. Create a small script that accepts a path, validates it, and reports useful errors.

3. Phase 2 / Week 2
Inspect file metadata, permissions, disk usage, process trees, CPU, memory, and local listening ports.

4. Phase 3 / Week 3
Add structured timestamps and request IDs to a local service. Use its logs, a debugger, and authorized system-call tracing to inspect a failed request.

5. Phase 4 / Week 4
Automate the reproducer and a regression test. Handle command failures explicitly and clean only resources created by the test.

6. Prove readiness
Shell quoting and exit codes are understood.

The takeaway: Practice in a dedicated directory or disposable environment.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #linux #cli

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why did a command succeed but the script fail?

- **0:04-0:10** / Reveal step 1: Build the mental model
  Narration: Understand arguments, standard input/output/error, exit status, and working directory. Quote paths containing spaces.

- **0:10-0:20** / Reveal step 2: Phase 1 / Week 1
  Narration: Learn navigation, quoting, redirection, pipes, environment scope, and exit codes. Create a small script that accepts a path, validates it, and reports useful errors.

- **0:20-0:26** / Reveal step 3: Phase 2 / Week 2
  Narration: Inspect file metadata, permissions, disk usage, process trees, CPU, memory, and local listening ports.

- **0:26-0:36** / Reveal step 4: Phase 3 / Week 3
  Narration: Add structured timestamps and request IDs to a local service. Use its logs, a debugger, and authorized system-call tracing to inspect a failed request.

- **0:36-0:44** / Reveal step 5: Phase 4 / Week 4
  Narration: Automate the reproducer and a regression test. Handle command failures explicitly and clean only resources created by the test.

- **0:44-0:47** / Reveal step 6: Prove readiness
  Narration: Shell quoting and exit codes are understood.

- **0:47-0:53** / Takeaway and discussion prompt
  Narration: Practice in a dedicated directory or disposable environment. Which bottleneck would you measure first?

## References

- [Linux CLI and Debugging for Engineers / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=linux-cli-debugging)
- [MIT Missing Semester](https://missing.csail.mit.edu/)
- [Linux manual pages](https://man7.org/linux/man-pages/)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
