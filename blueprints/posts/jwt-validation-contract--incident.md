# JWT Validation Is a Contract / Failure and Recovery

By Yasir Sharfi

## The Idea

Decoding a token is not the same as verifying that it should be trusted.

A signed token is an input to a validation policy. The expected issuer, audience, algorithm, time bounds, and permission semantics must come from trusted configuration.

## Visual Blueprint

1. **Notice unexpected acceptance**: A test token with the wrong audience or issuer is accepted by an endpoint.
2. **Inspect trusted configuration**: Check whether validation expectations are derived from the token itself.
3. **Restrict the affected endpoint**: Apply the correct policy without disabling signature validation.
4. **Review library options**: Confirm required claims and algorithm restrictions are actually enabled.
5. **Exercise key rotation**: Verify old and new key behavior during the intended overlap window.
6. **Add negative tests**: Cover invalid signatures, expiry, audience, issuer, and missing required claims.

## Caption

Decoding a token is not the same as verifying that it should be trusted.

A signed token is an input to a validation policy. The expected issuer, audience, algorithm, time bounds, and permission semantics must come from trusted configuration.

1. Notice unexpected acceptance
A test token with the wrong audience or issuer is accepted by an endpoint.

2. Inspect trusted configuration
Check whether validation expectations are derived from the token itself.

3. Restrict the affected endpoint
Apply the correct policy without disabling signature validation.

4. Review library options
Confirm required claims and algorithm restrictions are actually enabled.

5. Exercise key rotation
Verify old and new key behavior during the intended overlap window.

6. Add negative tests
Cover invalid signatures, expiry, audience, issuer, and missing required claims.

The takeaway: A valid signature is necessary for trust, but it is not the whole authorization decision.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #jwt #tokens

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Decoding a token is not the same as verifying that it should be trusted.

- **0:06-0:12** / Reveal step 1: Notice unexpected acceptance
  Narration: A test token with the wrong audience or issuer is accepted by an endpoint.

- **0:12-0:16** / Reveal step 2: Inspect trusted configuration
  Narration: Check whether validation expectations are derived from the token itself.

- **0:16-0:20** / Reveal step 3: Restrict the affected endpoint
  Narration: Apply the correct policy without disabling signature validation.

- **0:20-0:24** / Reveal step 4: Review library options
  Narration: Confirm required claims and algorithm restrictions are actually enabled.

- **0:24-0:29** / Reveal step 5: Exercise key rotation
  Narration: Verify old and new key behavior during the intended overlap window.

- **0:29-0:33** / Reveal step 6: Add negative tests
  Narration: Cover invalid signatures, expiry, audience, issuer, and missing required claims.

- **0:33-0:42** / Takeaway and discussion prompt
  Narration: A valid signature is necessary for trust, but it is not the whole authorization decision. What evidence would disprove your first diagnosis?

## References

- [JWT best current practices](https://www.rfc-editor.org/rfc/rfc8725)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
