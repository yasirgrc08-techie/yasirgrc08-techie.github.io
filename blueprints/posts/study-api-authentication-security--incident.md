# API Design, Authentication, and Authorization / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Is authentication enough to secure an API?

A good API defines behavior under valid requests, invalid input, retries, and unauthorized access. Authentication establishes identity; authorization decides permitted actions on a resource. Neither a signed token nor a hidden frontend control automatically enforces object-level access.

## Visual Blueprint

1. **Trap 1**: Treating client-side flags or hidden controls as authorization.
2. **Counter-check 1**: Identity and resource permissions are separate and tested.
3. **Trap 2**: Accepting a decoded token without full validation.
4. **Counter-check 2**: Sensitive operations enforce policy server-side.
5. **Trap 3**: Applying security checks only to interactive endpoints and forgetting jobs or downloads.
6. **Counter-check 3**: Retries have scoped identities and defined conflicts.

## Caption

Is authentication enough to secure an API?

A good API defines behavior under valid requests, invalid input, retries, and unauthorized access. Authentication establishes identity; authorization decides permitted actions on a resource. Neither a signed token nor a hidden frontend control automatically enforces object-level access.

1. Trap 1
Treating client-side flags or hidden controls as authorization.

2. Counter-check 1
Identity and resource permissions are separate and tested.

3. Trap 2
Accepting a decoded token without full validation.

4. Counter-check 2
Sensitive operations enforce policy server-side.

5. Trap 3
Applying security checks only to interactive endpoints and forgetting jobs or downloads.

6. Counter-check 3
Retries have scoped identities and defined conflicts.

The takeaway: Use a local service and synthetic users with different permissions. Write authorization tests before adding UI controls.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #api #authentication

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Is authentication enough to secure an API?

- **0:03-0:07** / Reveal step 1: Trap 1
  Narration: Treating client-side flags or hidden controls as authorization.

- **0:07-0:11** / Reveal step 2: Counter-check 1
  Narration: Identity and resource permissions are separate and tested.

- **0:11-0:14** / Reveal step 3: Trap 2
  Narration: Accepting a decoded token without full validation.

- **0:14-0:17** / Reveal step 4: Counter-check 2
  Narration: Sensitive operations enforce policy server-side.

- **0:17-0:22** / Reveal step 5: Trap 3
  Narration: Applying security checks only to interactive endpoints and forgetting jobs or downloads.

- **0:22-0:25** / Reveal step 6: Counter-check 3
  Narration: Retries have scoped identities and defined conflicts.

- **0:25-0:35** / Takeaway and discussion prompt
  Narration: Use a local service and synthetic users with different permissions. Write authorization tests before adding UI controls. What evidence would disprove your first diagnosis?

## References

- [API Design, Authentication, and Authorization / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=api-authentication-security)
- [OWASP API Security Project](https://owasp.org/www-project-api-security/)
- [OWASP authentication guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [MDN HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
