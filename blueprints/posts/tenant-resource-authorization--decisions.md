# Authorize the Object, Not the URL / Decision Guide

By Yasir Sharfi

## The Idea

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

## Visual Blueprint

1. **Application policy layer**: Use a central policy layer when it can consistently cover every resource operation.
2. **Trade-off / Application policy layer**: A helper that one endpoint forgets to call does not establish complete isolation.
3. **Database row policy**: Use supported row-level controls as part of a reviewed defense-in-depth design.
4. **Trade-off / Database row policy**: Connection roles, bypass privileges, and pooled session state must be configured carefully.
5. **Separate tenant storage**: Use physical separation when isolation requirements justify the operational cost.
6. **Trade-off / Separate tenant storage**: Provisioning, migrations, backups, and cross-tenant administration become more complex.

## Caption

A hard-to-guess identifier is not an authorization policy.

Use two synthetic tenants and resources with clear ownership. Every read, update, export, and background operation must enforce the same boundary.

1. Application policy layer
Use a central policy layer when it can consistently cover every resource operation.

2. Trade-off / Application policy layer
A helper that one endpoint forgets to call does not establish complete isolation.

3. Database row policy
Use supported row-level controls as part of a reviewed defense-in-depth design.

4. Trade-off / Database row policy
Connection roles, bypass privileges, and pooled session state must be configured carefully.

5. Separate tenant storage
Use physical separation when isolation requirements justify the operational cost.

6. Trade-off / Separate tenant storage
Provisioning, migrations, backups, and cross-tenant administration become more complex.

The takeaway: Authorization must follow the data through every direct and derived access path.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #multitenant #authorization

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A hard-to-guess identifier is not an authorization policy.

- **0:04-0:10** / Reveal step 1: Application policy layer
  Narration: Use a central policy layer when it can consistently cover every resource operation.

- **0:10-0:16** / Reveal step 2: Trade-off / Application policy layer
  Narration: A helper that one endpoint forgets to call does not establish complete isolation.

- **0:16-0:21** / Reveal step 3: Database row policy
  Narration: Use supported row-level controls as part of a reviewed defense-in-depth design.

- **0:21-0:26** / Reveal step 4: Trade-off / Database row policy
  Narration: Connection roles, bypass privileges, and pooled session state must be configured carefully.

- **0:26-0:30** / Reveal step 5: Separate tenant storage
  Narration: Use physical separation when isolation requirements justify the operational cost.

- **0:30-0:34** / Reveal step 6: Trade-off / Separate tenant storage
  Narration: Provisioning, migrations, backups, and cross-tenant administration become more complex.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: Authorization must follow the data through every direct and derived access path. Which constraint would change your choice?

## References

- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
