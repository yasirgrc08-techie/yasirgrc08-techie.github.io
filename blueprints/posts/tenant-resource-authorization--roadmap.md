# Authorize the Object, Not the URL / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

## Visual Blueprint

1. **Verify tenant context**: Derive tenant membership from trusted identity and policy, not a client-supplied tenant field alone.
2. **Scope data access**: Constrain queries and resource lookups to the authorized tenant or ownership rule.
3. **Check each operation**: Evaluate read, write, delete, export, and administrative permissions separately.
4. **Protect derived paths**: Apply equivalent boundaries to caches, search results, files, and asynchronous jobs.
5. **Handle revocation**: Define how permission changes affect sessions, cached decisions, and queued work.
6. **Test denied access**: Use synthetic cross-tenant cases throughout the application surface.

## Caption

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

1. Verify tenant context
Derive tenant membership from trusted identity and policy, not a client-supplied tenant field alone.

2. Scope data access
Constrain queries and resource lookups to the authorized tenant or ownership rule.

3. Check each operation
Evaluate read, write, delete, export, and administrative permissions separately.

4. Protect derived paths
Apply equivalent boundaries to caches, search results, files, and asynchronous jobs.

5. Handle revocation
Define how permission changes affect sessions, cached decisions, and queued work.

6. Test denied access
Use synthetic cross-tenant cases throughout the application surface.

The takeaway: Authorization must follow the data through every direct and derived access path.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #multitenant #authorization

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A hard-to-guess identifier is not an authorization policy.

- **0:04-0:10** / Reveal step 1: Verify tenant context
  Narration: Derive tenant membership from trusted identity and policy, not a client-supplied tenant field alone.

- **0:10-0:15** / Reveal step 2: Scope data access
  Narration: Constrain queries and resource lookups to the authorized tenant or ownership rule.

- **0:15-0:19** / Reveal step 3: Check each operation
  Narration: Evaluate read, write, delete, export, and administrative permissions separately.

- **0:19-0:24** / Reveal step 4: Protect derived paths
  Narration: Apply equivalent boundaries to caches, search results, files, and asynchronous jobs.

- **0:24-0:29** / Reveal step 5: Handle revocation
  Narration: Define how permission changes affect sessions, cached decisions, and queued work.

- **0:29-0:33** / Reveal step 6: Test denied access
  Narration: Use synthetic cross-tenant cases throughout the application surface.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: Authorization must follow the data through every direct and derived access path. Which bottleneck would you measure first?

## References

- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
