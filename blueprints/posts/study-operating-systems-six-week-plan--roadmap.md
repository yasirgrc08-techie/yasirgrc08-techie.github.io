# Get Good at Operating Systems in Six Weeks / Learning Roadmap

By Yasir Sharfi

## The Idea

Is a thread always faster than a process?

Learn OS concepts through observations and small programs. Organize the subject around virtualization, concurrency, and persistence: how programs receive CPU and memory, how work overlaps safely, and how state survives failures. A Linux VM or WSL environment is enough for most introductory experiments.

## Visual Blueprint

1. **Build the mental model**: A context switch saves and restores execution state; a scheduler chooses which runnable work executes.
2. **Phase 1 / Week 1**: Study user/kernel mode, system calls, process creation, exit, and basic scheduling. Run a CPU-heavy loop and an I/O-waiting program, comparing elapsed and CPU time.
3. **Phase 2 / Week 2**: Study address spaces, paging, translation, page faults, locality, and the difference between virtual and resident memory.
4. **Phase 3 / Weeks 3-4**: Implement a shared counter and a bounded producer-consumer queue. Study mutexes, condition variables, deadlock, and safe shutdown.
5. **Phase 4 / Weeks 5-6**: Learn page cache, filesystems, journaling, write ordering, and explicit sync operations.
6. **Prove readiness**: A process and thread can be compared using resource ownership.

## Caption

Is a thread always faster than a process?

Learn OS concepts through observations and small programs. Organize the subject around virtualization, concurrency, and persistence: how programs receive CPU and memory, how work overlaps safely, and how state survives failures. A Linux VM or WSL environment is enough for most introductory experiments.

1. Build the mental model
A context switch saves and restores execution state; a scheduler chooses which runnable work executes.

2. Phase 1 / Week 1
Study user/kernel mode, system calls, process creation, exit, and basic scheduling. Run a CPU-heavy loop and an I/O-waiting program, comparing elapsed and CPU time.

3. Phase 2 / Week 2
Study address spaces, paging, translation, page faults, locality, and the difference between virtual and resident memory.

4. Phase 3 / Weeks 3-4
Implement a shared counter and a bounded producer-consumer queue. Study mutexes, condition variables, deadlock, and safe shutdown.

5. Phase 4 / Weeks 5-6
Learn page cache, filesystems, journaling, write ordering, and explicit sync operations.

6. Prove readiness
A process and thread can be compared using resource ownership.

The takeaway: Read one concept, implement a tiny experiment, predict the outcome, then explain any mismatch. Keep source code and observations together.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #operating #systems

## Reel Storyboard

Suggested duration: about 54 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a thread always faster than a process?

- **0:04-0:10** / Reveal step 1: Build the mental model
  Narration: A context switch saves and restores execution state; a scheduler chooses which runnable work executes.

- **0:10-0:20** / Reveal step 2: Phase 1 / Week 1
  Narration: Study user/kernel mode, system calls, process creation, exit, and basic scheduling. Run a CPU-heavy loop and an I/O-waiting program, comparing elapsed and CPU time.

- **0:20-0:27** / Reveal step 3: Phase 2 / Week 2
  Narration: Study address spaces, paging, translation, page faults, locality, and the difference between virtual and resident memory.

- **0:27-0:34** / Reveal step 4: Phase 3 / Weeks 3-4
  Narration: Implement a shared counter and a bounded producer-consumer queue. Study mutexes, condition variables, deadlock, and safe shutdown.

- **0:34-0:39** / Reveal step 5: Phase 4 / Weeks 5-6
  Narration: Learn page cache, filesystems, journaling, write ordering, and explicit sync operations.

- **0:39-0:43** / Reveal step 6: Prove readiness
  Narration: A process and thread can be compared using resource ownership.

- **0:43-0:54** / Takeaway and discussion prompt
  Narration: Read one concept, implement a tiny experiment, predict the outcome, then explain any mismatch. Keep source code and observations together. Which bottleneck would you measure first?

## References

- [Get Good at Operating Systems in Six Weeks / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=operating-systems-six-week-plan)
- [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- [Linux manual pages](https://man7.org/linux/man-pages/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
