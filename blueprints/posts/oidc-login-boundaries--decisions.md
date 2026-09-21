# Login Is More Than a Token / Decision Guide

By Yasir Sharfi

## The Idea

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

## Visual Blueprint

1. **Server-managed session**: Use a server session when the application can keep sensitive provider credentials off the browser.
2. **Trade-off / Server-managed session**: Session storage, expiry, CSRF protection, and revocation still require explicit design.
3. **Public client with PKCE**: Use a provider-supported public-client flow when a browser or mobile app cannot keep a client secret.
4. **Trade-off / Public client with PKCE**: Token storage and renewal must follow the platform threat model; a public client cannot hide a secret.
5. **Managed identity provider**: Use a maintained provider when identity lifecycle and protocol correctness exceed the application's scope.
6. **Trade-off / Managed identity provider**: You still own application authorization, configuration, integration, and outage behavior.

## Caption

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

1. Server-managed session
Use a server session when the application can keep sensitive provider credentials off the browser.

2. Trade-off / Server-managed session
Session storage, expiry, CSRF protection, and revocation still require explicit design.

3. Public client with PKCE
Use a provider-supported public-client flow when a browser or mobile app cannot keep a client secret.

4. Trade-off / Public client with PKCE
Token storage and renewal must follow the platform threat model; a public client cannot hide a secret.

5. Managed identity provider
Use a maintained provider when identity lifecycle and protocol correctness exceed the application's scope.

6. Trade-off / Managed identity provider
You still own application authorization, configuration, integration, and outage behavior.

The takeaway: Identity proves who authenticated; the application must still decide what that identity may do.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #authentication #oidc

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Authentication can succeed while the application grants the wrong access.

- **0:04-0:10** / Reveal step 1: Server-managed session
  Narration: Use a server session when the application can keep sensitive provider credentials off the browser.

- **0:10-0:15** / Reveal step 2: Trade-off / Server-managed session
  Narration: Session storage, expiry, CSRF protection, and revocation still require explicit design.

- **0:15-0:22** / Reveal step 3: Public client with PKCE
  Narration: Use a provider-supported public-client flow when a browser or mobile app cannot keep a client secret.

- **0:22-0:29** / Reveal step 4: Trade-off / Public client with PKCE
  Narration: Token storage and renewal must follow the platform threat model; a public client cannot hide a secret.

- **0:29-0:35** / Reveal step 5: Managed identity provider
  Narration: Use a maintained provider when identity lifecycle and protocol correctness exceed the application's scope.

- **0:35-0:39** / Reveal step 6: Trade-off / Managed identity provider
  Narration: You still own application authorization, configuration, integration, and outage behavior.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: Identity proves who authenticated; the application must still decide what that identity may do. Which constraint would change your choice?

## References

- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
