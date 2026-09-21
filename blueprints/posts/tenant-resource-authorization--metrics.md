# Authorize the Object, Not the URL / Metrics That Matter

By Yasir Sharfi

## The Idea

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

## Visual Blueprint

1. **Denied-operation coverage**: Track which resource operations have automated negative authorization tests.
2. **Interpret / Denied-operation coverage**: A passing login test does not prove object-level access isolation.
3. **Policy decision errors**: Measure safe rejection and unexpected policy failures by bounded operation class.
4. **Interpret / Policy decision errors**: Avoid exposing tenant identities or resource contents through diagnostic labels.
5. **Revocation propagation**: Measure when policy changes reach caches, jobs, and derived stores.
6. **Interpret / Revocation propagation**: Immediate revocation claims require evidence across all access paths.

## Caption

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

1. Denied-operation coverage
Track which resource operations have automated negative authorization tests.

2. Interpret / Denied-operation coverage
A passing login test does not prove object-level access isolation.

3. Policy decision errors
Measure safe rejection and unexpected policy failures by bounded operation class.

4. Interpret / Policy decision errors
Avoid exposing tenant identities or resource contents through diagnostic labels.

5. Revocation propagation
Measure when policy changes reach caches, jobs, and derived stores.

6. Interpret / Revocation propagation
Immediate revocation claims require evidence across all access paths.

The takeaway: Authorization must follow the data through every direct and derived access path.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #multitenant #authorization

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A hard-to-guess identifier is not an authorization policy.

- **0:04-0:08** / Reveal step 1: Denied-operation coverage
  Narration: Track which resource operations have automated negative authorization tests.

- **0:08-0:12** / Reveal step 2: Interpret / Denied-operation coverage
  Narration: A passing login test does not prove object-level access isolation.

- **0:12-0:17** / Reveal step 3: Policy decision errors
  Narration: Measure safe rejection and unexpected policy failures by bounded operation class.

- **0:17-0:21** / Reveal step 4: Interpret / Policy decision errors
  Narration: Avoid exposing tenant identities or resource contents through diagnostic labels.

- **0:21-0:25** / Reveal step 5: Revocation propagation
  Narration: Measure when policy changes reach caches, jobs, and derived stores.

- **0:25-0:29** / Reveal step 6: Interpret / Revocation propagation
  Narration: Immediate revocation claims require evidence across all access paths.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: Authorization must follow the data through every direct and derived access path. Which metric could look healthy while users suffer?

## References

- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
