# Authorize the Object, Not the URL / Build and Validate

By Yasir Sharfi

## The Idea

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

## Visual Blueprint

1. **Create two fake tenants**: Seed separate synthetic resources and user memberships.
2. **Test direct operations**: Attempt authorized and denied reads, writes, and deletes.
3. **Exercise indirect access**: Test search, download, cache, and export behavior.
4. **Queue work then revoke**: Define and verify the policy for delayed jobs after a permission change.
5. **Inspect pooled connections**: Confirm one request's tenant context cannot leak into another.
6. **Record coverage gaps**: List every resource surface and its explicit authorization regression test.

## Caption

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

1. Create two fake tenants
Seed separate synthetic resources and user memberships.

2. Test direct operations
Attempt authorized and denied reads, writes, and deletes.

3. Exercise indirect access
Test search, download, cache, and export behavior.

4. Queue work then revoke
Define and verify the policy for delayed jobs after a permission change.

5. Inspect pooled connections
Confirm one request's tenant context cannot leak into another.

6. Record coverage gaps
List every resource surface and its explicit authorization regression test.

The takeaway: Authorization must follow the data through every direct and derived access path.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #multitenant #authorization

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A hard-to-guess identifier is not an authorization policy.

- **0:04-0:07** / Reveal step 1: Create two fake tenants
  Narration: Seed separate synthetic resources and user memberships.

- **0:07-0:11** / Reveal step 2: Test direct operations
  Narration: Attempt authorized and denied reads, writes, and deletes.

- **0:11-0:14** / Reveal step 3: Exercise indirect access
  Narration: Test search, download, cache, and export behavior.

- **0:14-0:19** / Reveal step 4: Queue work then revoke
  Narration: Define and verify the policy for delayed jobs after a permission change.

- **0:19-0:23** / Reveal step 5: Inspect pooled connections
  Narration: Confirm one request's tenant context cannot leak into another.

- **0:23-0:27** / Reveal step 6: Record coverage gaps
  Narration: List every resource surface and its explicit authorization regression test.

- **0:27-0:35** / Takeaway and discussion prompt
  Narration: Authorization must follow the data through every direct and derived access path. How would you reproduce this with synthetic data?

## References

- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
