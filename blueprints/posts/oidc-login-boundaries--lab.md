# Login Is More Than a Token / Build and Validate

By Yasir Sharfi

## The Idea

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

## Visual Blueprint

1. **Use a test identity tenant**: Configure a disposable application with synthetic users and a supported login flow.
2. **Validate callback state**: Test missing or mismatched protocol state using the provider's approved test setup.
3. **Create two resource owners**: Verify one user cannot read another user's synthetic object.
4. **Expire the session**: Confirm the application requests renewed authentication rather than trusting stale client state.
5. **Revoke a permission**: Verify current server authorization changes independently of successful login.
6. **Test provider failure**: Show a bounded, clear failure without bypassing identity checks.

## Caption

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

1. Use a test identity tenant
Configure a disposable application with synthetic users and a supported login flow.

2. Validate callback state
Test missing or mismatched protocol state using the provider's approved test setup.

3. Create two resource owners
Verify one user cannot read another user's synthetic object.

4. Expire the session
Confirm the application requests renewed authentication rather than trusting stale client state.

5. Revoke a permission
Verify current server authorization changes independently of successful login.

6. Test provider failure
Show a bounded, clear failure without bypassing identity checks.

The takeaway: Identity proves who authenticated; the application must still decide what that identity may do.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #authentication #oidc

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Authentication can succeed while the application grants the wrong access.

- **0:04-0:09** / Reveal step 1: Use a test identity tenant
  Narration: Configure a disposable application with synthetic users and a supported login flow.

- **0:09-0:14** / Reveal step 2: Validate callback state
  Narration: Test missing or mismatched protocol state using the provider's approved test setup.

- **0:14-0:18** / Reveal step 3: Create two resource owners
  Narration: Verify one user cannot read another user's synthetic object.

- **0:18-0:23** / Reveal step 4: Expire the session
  Narration: Confirm the application requests renewed authentication rather than trusting stale client state.

- **0:23-0:27** / Reveal step 5: Revoke a permission
  Narration: Verify current server authorization changes independently of successful login.

- **0:27-0:31** / Reveal step 6: Test provider failure
  Narration: Show a bounded, clear failure without bypassing identity checks.

- **0:31-0:40** / Takeaway and discussion prompt
  Narration: Identity proves who authenticated; the application must still decide what that identity may do. How would you reproduce this with synthetic data?

## References

- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
