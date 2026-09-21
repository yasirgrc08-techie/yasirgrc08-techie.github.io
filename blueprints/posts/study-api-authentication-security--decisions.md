# API Design, Authentication, and Authorization / Practice Decisions

By Yasir Sharfi

## The Idea

Is authentication enough to secure an API?

A good API defines behavior under valid requests, invalid input, retries, and unauthorized access. Authentication establishes identity; authorization decides permitted actions on a resource. Neither a signed token nor a hidden frontend control automatically enforces object-level access.

## Visual Blueprint

1. **The server owns the policy**: A client-supplied role, price, tenant ID, or paid flag is input to validate, not authority.
2. **Watch for**: Treating client-side flags or hidden controls as authorization.
3. **Tokens have a verification contract**: Validate the expected issuer, audience, signature, expiry, and relevant claims according to the chosen protocol and library.
4. **Watch for**: Accepting a decoded token without full validation.
5. **APIs evolve through compatibility**: Specify optional versus required fields, stable identifiers, error structure, and pagination order.
6. **Watch for**: Applying security checks only to interactive endpoints and forgetting jobs or downloads.

## Caption

Is authentication enough to secure an API?

A good API defines behavior under valid requests, invalid input, retries, and unauthorized access. Authentication establishes identity; authorization decides permitted actions on a resource. Neither a signed token nor a hidden frontend control automatically enforces object-level access.

1. The server owns the policy
A client-supplied role, price, tenant ID, or paid flag is input to validate, not authority.

2. Watch for
Treating client-side flags or hidden controls as authorization.

3. Tokens have a verification contract
Validate the expected issuer, audience, signature, expiry, and relevant claims according to the chosen protocol and library.

4. Watch for
Accepting a decoded token without full validation.

5. APIs evolve through compatibility
Specify optional versus required fields, stable identifiers, error structure, and pagination order.

6. Watch for
Applying security checks only to interactive endpoints and forgetting jobs or downloads.

The takeaway: Use a local service and synthetic users with different permissions. Write authorization tests before adding UI controls.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #api #authentication

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Is authentication enough to secure an API?

- **0:03-0:09** / Reveal step 1: The server owns the policy
  Narration: A client-supplied role, price, tenant ID, or paid flag is input to validate, not authority.

- **0:09-0:13** / Reveal step 2: Watch for
  Narration: Treating client-side flags or hidden controls as authorization.

- **0:13-0:20** / Reveal step 3: Tokens have a verification contract
  Narration: Validate the expected issuer, audience, signature, expiry, and relevant claims according to the chosen protocol and library.

- **0:20-0:23** / Reveal step 4: Watch for
  Narration: Accepting a decoded token without full validation.

- **0:23-0:28** / Reveal step 5: APIs evolve through compatibility
  Narration: Specify optional versus required fields, stable identifiers, error structure, and pagination order.

- **0:28-0:33** / Reveal step 6: Watch for
  Narration: Applying security checks only to interactive endpoints and forgetting jobs or downloads.

- **0:33-0:43** / Takeaway and discussion prompt
  Narration: Use a local service and synthetic users with different permissions. Write authorization tests before adding UI controls. Which constraint would change your choice?

## References

- [API Design, Authentication, and Authorization / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=api-authentication-security)
- [OWASP API Security Project](https://owasp.org/www-project-api-security/)
- [OWASP authentication guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [MDN HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
