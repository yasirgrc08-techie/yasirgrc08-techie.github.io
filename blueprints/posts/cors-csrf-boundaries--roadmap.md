# CORS Is Not Authorization / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A browser refusing to read a response does not prove the server rejected the action.

CORS, authentication, authorization, and CSRF protection address different boundaries. Test them separately with an application and origins you control.

## Visual Blueprint

1. **Identify credential behavior**: Determine whether cookies or other credentials are attached automatically by the browser.
2. **Authorize on the server**: Validate the user and resource permission regardless of the request's origin.
3. **Set a narrow CORS policy**: Allow only required origins, methods, and headers for legitimate browser clients.
4. **Protect state-changing requests**: Use appropriate anti-CSRF controls for the credential and application model.
5. **Configure cookies deliberately**: Review Secure, HttpOnly, SameSite, domain, and path settings for the actual workflow.
6. **Test cross-origin behavior**: Verify both server-side effects and browser response visibility.

## Caption

A browser refusing to read a response does not prove the server rejected the action.

CORS, authentication, authorization, and CSRF protection address different boundaries. Test them separately with an application and origins you control.

1. Identify credential behavior
Determine whether cookies or other credentials are attached automatically by the browser.

2. Authorize on the server
Validate the user and resource permission regardless of the request's origin.

3. Set a narrow CORS policy
Allow only required origins, methods, and headers for legitimate browser clients.

4. Protect state-changing requests
Use appropriate anti-CSRF controls for the credential and application model.

5. Configure cookies deliberately
Review Secure, HttpOnly, SameSite, domain, and path settings for the actual workflow.

6. Test cross-origin behavior
Verify both server-side effects and browser response visibility.

The takeaway: Browser response access, request authenticity, and resource permission are separate checks.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #cors #csrf

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A browser refusing to read a response does not prove the server rejected the action.

- **0:06-0:11** / Reveal step 1: Identify credential behavior
  Narration: Determine whether cookies or other credentials are attached automatically by the browser.

- **0:11-0:16** / Reveal step 2: Authorize on the server
  Narration: Validate the user and resource permission regardless of the request's origin.

- **0:16-0:21** / Reveal step 3: Set a narrow CORS policy
  Narration: Allow only required origins, methods, and headers for legitimate browser clients.

- **0:21-0:25** / Reveal step 4: Protect state-changing requests
  Narration: Use appropriate anti-CSRF controls for the credential and application model.

- **0:25-0:30** / Reveal step 5: Configure cookies deliberately
  Narration: Review Secure, HttpOnly, SameSite, domain, and path settings for the actual workflow.

- **0:30-0:34** / Reveal step 6: Test cross-origin behavior
  Narration: Verify both server-side effects and browser response visibility.

- **0:34-0:41** / Takeaway and discussion prompt
  Narration: Browser response access, request authenticity, and resource permission are separate checks. Which bottleneck would you measure first?

## References

- [MDN CORS guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
