# CORS Is Not Authorization / Build and Validate

By Yasir Sharfi

## The Idea

A browser refusing to read a response does not prove the server rejected the action.

CORS, authentication, authorization, and CSRF protection address different boundaries. Test them separately with an application and origins you control.

## Visual Blueprint

1. **Use two local origins**: Create an application and test client on separate controlled ports.
2. **Add a state-changing endpoint**: Require a synthetic authenticated session and explicit authorization.
3. **Test response visibility**: Change CORS policy and observe what the browser can read.
4. **Inspect actual state**: Verify whether the server accepted or rejected the mutation.
5. **Apply CSRF protection**: Use the application's chosen token or origin-check contract.
6. **Record the boundaries**: Explain what each control prevents and what it does not.

## Caption

A browser refusing to read a response does not prove the server rejected the action.

CORS, authentication, authorization, and CSRF protection address different boundaries. Test them separately with an application and origins you control.

1. Use two local origins
Create an application and test client on separate controlled ports.

2. Add a state-changing endpoint
Require a synthetic authenticated session and explicit authorization.

3. Test response visibility
Change CORS policy and observe what the browser can read.

4. Inspect actual state
Verify whether the server accepted or rejected the mutation.

5. Apply CSRF protection
Use the application's chosen token or origin-check contract.

6. Record the boundaries
Explain what each control prevents and what it does not.

The takeaway: Browser response access, request authenticity, and resource permission are separate checks.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #cors #csrf

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A browser refusing to read a response does not prove the server rejected the action.

- **0:06-0:10** / Reveal step 1: Use two local origins
  Narration: Create an application and test client on separate controlled ports.

- **0:10-0:14** / Reveal step 2: Add a state-changing endpoint
  Narration: Require a synthetic authenticated session and explicit authorization.

- **0:14-0:18** / Reveal step 3: Test response visibility
  Narration: Change CORS policy and observe what the browser can read.

- **0:18-0:22** / Reveal step 4: Inspect actual state
  Narration: Verify whether the server accepted or rejected the mutation.

- **0:22-0:26** / Reveal step 5: Apply CSRF protection
  Narration: Use the application's chosen token or origin-check contract.

- **0:26-0:30** / Reveal step 6: Record the boundaries
  Narration: Explain what each control prevents and what it does not.

- **0:30-0:38** / Takeaway and discussion prompt
  Narration: Browser response access, request authenticity, and resource permission are separate checks. How would you reproduce this with synthetic data?

## References

- [MDN CORS guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
