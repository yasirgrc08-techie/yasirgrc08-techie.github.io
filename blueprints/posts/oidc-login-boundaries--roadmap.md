# Login Is More Than a Token / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

## Visual Blueprint

1. **Choose the client type**: Distinguish a confidential server client from a public browser or mobile client.
2. **Use the supported flow**: Follow the provider's authorization-code and PKCE guidance for the selected client.
3. **Validate the response**: Check issuer, audience, state, nonce where applicable, and the provider's documented validation rules.
4. **Establish a safe session**: Use appropriate secure cookie and session settings instead of exposing unnecessary credentials to page scripts.
5. **Authorize every resource**: Evaluate access to the requested object on the server after identity is established.
6. **Test lifecycle changes**: Exercise expiry, logout, revoked access, account switching, and provider outages.

## Caption

Authentication can succeed while the application grants the wrong access.

Use a standards-based identity provider for a synthetic web application. Authentication, session handling, and resource authorization remain separate responsibilities.

1. Choose the client type
Distinguish a confidential server client from a public browser or mobile client.

2. Use the supported flow
Follow the provider's authorization-code and PKCE guidance for the selected client.

3. Validate the response
Check issuer, audience, state, nonce where applicable, and the provider's documented validation rules.

4. Establish a safe session
Use appropriate secure cookie and session settings instead of exposing unnecessary credentials to page scripts.

5. Authorize every resource
Evaluate access to the requested object on the server after identity is established.

6. Test lifecycle changes
Exercise expiry, logout, revoked access, account switching, and provider outages.

The takeaway: Identity proves who authenticated; the application must still decide what that identity may do.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #authentication #oidc

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Authentication can succeed while the application grants the wrong access.

- **0:04-0:09** / Reveal step 1: Choose the client type
  Narration: Distinguish a confidential server client from a public browser or mobile client.

- **0:09-0:14** / Reveal step 2: Use the supported flow
  Narration: Follow the provider's authorization-code and PKCE guidance for the selected client.

- **0:14-0:20** / Reveal step 3: Validate the response
  Narration: Check issuer, audience, state, nonce where applicable, and the provider's documented validation rules.

- **0:20-0:26** / Reveal step 4: Establish a safe session
  Narration: Use appropriate secure cookie and session settings instead of exposing unnecessary credentials to page scripts.

- **0:26-0:32** / Reveal step 5: Authorize every resource
  Narration: Evaluate access to the requested object on the server after identity is established.

- **0:32-0:36** / Reveal step 6: Test lifecycle changes
  Narration: Exercise expiry, logout, revoked access, account switching, and provider outages.

- **0:36-0:44** / Takeaway and discussion prompt
  Narration: Identity proves who authenticated; the application must still decide what that identity may do. Which bottleneck would you measure first?

## References

- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
