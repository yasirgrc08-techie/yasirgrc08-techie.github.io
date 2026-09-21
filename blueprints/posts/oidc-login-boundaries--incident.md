# Login Is More Than a Token / Failure and Recovery

By Yasir Sharfi

## The Idea

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

## Visual Blueprint

1. **Find incorrect access**: A logged-in user sees an object they are not authorized to use.
2. **Separate identity from permission**: Confirm whether login worked while resource authorization was missing or stale.
3. **Contain the affected route**: Restrict the faulty access path without weakening token validation.
4. **Verify protocol configuration**: Check issuer, client identity, redirect configuration, and callback validation.
5. **Repair server authorization**: Enforce current permissions at the actual resource boundary.
6. **Test identity transitions**: Repeat the flow across tenants, expired sessions, logout, and account switches.

## Caption

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

1. Find incorrect access
A logged-in user sees an object they are not authorized to use.

2. Separate identity from permission
Confirm whether login worked while resource authorization was missing or stale.

3. Contain the affected route
Restrict the faulty access path without weakening token validation.

4. Verify protocol configuration
Check issuer, client identity, redirect configuration, and callback validation.

5. Repair server authorization
Enforce current permissions at the actual resource boundary.

6. Test identity transitions
Repeat the flow across tenants, expired sessions, logout, and account switches.

The takeaway: Identity proves who authenticated; the application must still decide what that identity may do.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #authentication #oidc

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Authentication can succeed while the application grants the wrong access.

- **0:04-0:09** / Reveal step 1: Find incorrect access
  Narration: A logged-in user sees an object they are not authorized to use.

- **0:09-0:14** / Reveal step 2: Separate identity from permission
  Narration: Confirm whether login worked while resource authorization was missing or stale.

- **0:14-0:18** / Reveal step 3: Contain the affected route
  Narration: Restrict the faulty access path without weakening token validation.

- **0:18-0:22** / Reveal step 4: Verify protocol configuration
  Narration: Check issuer, client identity, redirect configuration, and callback validation.

- **0:22-0:26** / Reveal step 5: Repair server authorization
  Narration: Enforce current permissions at the actual resource boundary.

- **0:26-0:31** / Reveal step 6: Test identity transitions
  Narration: Repeat the flow across tenants, expired sessions, logout, and account switches.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Identity proves who authenticated; the application must still decide what that identity may do. What evidence would disprove your first diagnosis?

## References

- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
