# Authorize the Object, Not the URL / Failure and Recovery

By Yasir Sharfi

## The Idea

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

## Visual Blueprint

1. **Identify the exposed path**: Find whether the issue affects direct reads, exports, search, cache, or jobs.
2. **Contain access immediately**: Restrict the affected operation and follow the incident-handling process.
3. **Inspect trusted context**: Verify the server's tenant and permission derivation.
4. **Repair every equivalent path**: Do not fix only the endpoint where the first mismatch was observed.
5. **Invalidate stale decisions**: Review cached authorization and queued work under the updated policy.
6. **Verify with synthetic tenants**: Run denied-access tests without using another customer's private data.

## Caption

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

1. Identify the exposed path
Find whether the issue affects direct reads, exports, search, cache, or jobs.

2. Contain access immediately
Restrict the affected operation and follow the incident-handling process.

3. Inspect trusted context
Verify the server's tenant and permission derivation.

4. Repair every equivalent path
Do not fix only the endpoint where the first mismatch was observed.

5. Invalidate stale decisions
Review cached authorization and queued work under the updated policy.

6. Verify with synthetic tenants
Run denied-access tests without using another customer's private data.

The takeaway: Authorization must follow the data through every direct and derived access path.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #multitenant #authorization

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A hard-to-guess identifier is not an authorization policy.

- **0:04-0:09** / Reveal step 1: Identify the exposed path
  Narration: Find whether the issue affects direct reads, exports, search, cache, or jobs.

- **0:09-0:13** / Reveal step 2: Contain access immediately
  Narration: Restrict the affected operation and follow the incident-handling process.

- **0:13-0:16** / Reveal step 3: Inspect trusted context
  Narration: Verify the server's tenant and permission derivation.

- **0:16-0:21** / Reveal step 4: Repair every equivalent path
  Narration: Do not fix only the endpoint where the first mismatch was observed.

- **0:21-0:25** / Reveal step 5: Invalidate stale decisions
  Narration: Review cached authorization and queued work under the updated policy.

- **0:25-0:29** / Reveal step 6: Verify with synthetic tenants
  Narration: Run denied-access tests without using another customer's private data.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: Authorization must follow the data through every direct and derived access path. What evidence would disprove your first diagnosis?

## References

- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
