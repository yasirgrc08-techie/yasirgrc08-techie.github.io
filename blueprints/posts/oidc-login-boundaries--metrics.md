# Login Is More Than a Token / Metrics That Matter

By Yasir Sharfi

## The Idea

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

## Visual Blueprint

1. **Login outcome categories**: Track successful, rejected, expired, and provider-failed authentication attempts safely.
2. **Interpret / Login outcome categories**: Do not record raw credentials, tokens, or private identity payloads in logs.
3. **Authorization denials**: Measure denied resource access by bounded route and reason categories.
4. **Interpret / Authorization denials**: A successful login does not imply that a later authorization denial is an error.
5. **Session lifecycle failures**: Track renewal, expiry, and logout-related failures.
6. **Interpret / Session lifecycle failures**: Availability improvements must not silently extend access beyond the intended security policy.

## Caption

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

1. Login outcome categories
Track successful, rejected, expired, and provider-failed authentication attempts safely.

2. Interpret / Login outcome categories
Do not record raw credentials, tokens, or private identity payloads in logs.

3. Authorization denials
Measure denied resource access by bounded route and reason categories.

4. Interpret / Authorization denials
A successful login does not imply that a later authorization denial is an error.

5. Session lifecycle failures
Track renewal, expiry, and logout-related failures.

6. Interpret / Session lifecycle failures
Availability improvements must not silently extend access beyond the intended security policy.

The takeaway: Identity proves who authenticated; the application must still decide what that identity may do.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #authentication #oidc

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Authentication can succeed while the application grants the wrong access.

- **0:04-0:08** / Reveal step 1: Login outcome categories
  Narration: Track successful, rejected, expired, and provider-failed authentication attempts safely.

- **0:08-0:13** / Reveal step 2: Interpret / Login outcome categories
  Narration: Do not record raw credentials, tokens, or private identity payloads in logs.

- **0:13-0:17** / Reveal step 3: Authorization denials
  Narration: Measure denied resource access by bounded route and reason categories.

- **0:17-0:23** / Reveal step 4: Interpret / Authorization denials
  Narration: A successful login does not imply that a later authorization denial is an error.

- **0:23-0:26** / Reveal step 5: Session lifecycle failures
  Narration: Track renewal, expiry, and logout-related failures.

- **0:26-0:31** / Reveal step 6: Interpret / Session lifecycle failures
  Narration: Availability improvements must not silently extend access beyond the intended security policy.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Identity proves who authenticated; the application must still decide what that identity may do. Which metric could look healthy while users suffer?

## References

- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
