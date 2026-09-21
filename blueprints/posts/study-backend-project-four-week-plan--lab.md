# Build an Interview-Ready Backend Project / Build and Validate

By Yasir Sharfi

## The Idea

How many technologies should the project use?

Build one small service deeply enough to explain its decisions and limitations. A booking, task, or inventory service can demonstrate the essentials without pretending to be a global platform. Keep the scope small, use maintained libraries, and make behavior reproducible with synthetic data.

## Visual Blueprint

1. **Set up the scenario**: The API accepts a task, a worker transforms a small synthetic input, and the client polls for status.
2. **Experiment 1**: Define stable task and request identities, accepted/queued/running/completed/failed states, and input size limits.
3. **Experiment 2**: Have the worker claim work with a defined lease or transaction boundary, persist completion, and acknowledge only afterward.
4. **Experiment 3**: Test a crash before processing, after output persistence, and before acknowledgement.
5. **Expected evidence**: The project demonstrates a meaningful lifecycle rather than only CRUD endpoints.
6. **Check the result**: Does a repeated creation request return the same task?

## Caption

How many technologies should the project use?

Build one small service deeply enough to explain its decisions and limitations. A booking, task, or inventory service can demonstrate the essentials without pretending to be a global platform. Keep the scope small, use maintained libraries, and make behavior reproducible with synthetic data.

1. Set up the scenario
The API accepts a task, a worker transforms a small synthetic input, and the client polls for status.

2. Experiment 1
Define stable task and request identities, accepted/queued/running/completed/failed states, and input size limits.

3. Experiment 2
Have the worker claim work with a defined lease or transaction boundary, persist completion, and acknowledge only afterward.

4. Experiment 3
Test a crash before processing, after output persistence, and before acknowledgement.

5. Expected evidence
The project demonstrates a meaningful lifecycle rather than only CRUD endpoints.

6. Check the result
Does a repeated creation request return the same task?

The takeaway: Work in weekly releases with a usable result at each boundary.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #PracticalEngineering #learning #backend #project

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: How many technologies should the project use?

- **0:03-0:11** / Reveal step 1: Set up the scenario
  Narration: The API accepts a task, a worker transforms a small synthetic input, and the client polls for status.

- **0:11-0:16** / Reveal step 2: Experiment 1
  Narration: Define stable task and request identities, accepted/queued/running/completed/failed states, and input size limits.

- **0:16-0:24** / Reveal step 3: Experiment 2
  Narration: Have the worker claim work with a defined lease or transaction boundary, persist completion, and acknowledge only afterward.

- **0:24-0:29** / Reveal step 4: Experiment 3
  Narration: Test a crash before processing, after output persistence, and before acknowledgement.

- **0:29-0:34** / Reveal step 5: Expected evidence
  Narration: The project demonstrates a meaningful lifecycle rather than only CRUD endpoints.

- **0:34-0:38** / Reveal step 6: Check the result
  Narration: Does a repeated creation request return the same task?

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: Work in weekly releases with a usable result at each boundary. How would you reproduce this with synthetic data?

## References

- [Build an Interview-Ready Backend Project / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=backend-project-four-week-plan)
- [The Twelve-Factor App](https://12factor.net/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [GitHub README guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
