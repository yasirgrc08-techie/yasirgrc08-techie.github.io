# JWT Validation Is a Contract / Build and Validate

By Yasir Sharfi

## The Idea

Decoding a token is not the same as verifying that it should be trusted.

A signed token is an input to a validation policy. The expected issuer, audience, algorithm, time bounds, and permission semantics must come from trusted configuration.

## Visual Blueprint

1. **Use a test signing setup**: Generate synthetic tokens with a maintained library and no production credentials.
2. **Define expected claims**: Set trusted issuer, audience, algorithm, and lifetime requirements.
3. **Run negative cases**: Reject expired, wrongly targeted, and incorrectly signed fixtures.
4. **Rotate the test key**: Verify the documented overlap and retirement behavior.
5. **Remove key discovery**: Test bounded cached validation and secure failure for unknown keys.
6. **Check permission freshness**: Demonstrate the difference between a valid signature and current resource access.

## Caption

Decoding a token is not the same as verifying that it should be trusted.

A signed token is an input to a validation policy. The expected issuer, audience, algorithm, time bounds, and permission semantics must come from trusted configuration.

1. Use a test signing setup
Generate synthetic tokens with a maintained library and no production credentials.

2. Define expected claims
Set trusted issuer, audience, algorithm, and lifetime requirements.

3. Run negative cases
Reject expired, wrongly targeted, and incorrectly signed fixtures.

4. Rotate the test key
Verify the documented overlap and retirement behavior.

5. Remove key discovery
Test bounded cached validation and secure failure for unknown keys.

6. Check permission freshness
Demonstrate the difference between a valid signature and current resource access.

The takeaway: A valid signature is necessary for trust, but it is not the whole authorization decision.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SecurityAIandWeb #security #jwt #tokens

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Decoding a token is not the same as verifying that it should be trusted.

- **0:06-0:11** / Reveal step 1: Use a test signing setup
  Narration: Generate synthetic tokens with a maintained library and no production credentials.

- **0:11-0:15** / Reveal step 2: Define expected claims
  Narration: Set trusted issuer, audience, algorithm, and lifetime requirements.

- **0:15-0:19** / Reveal step 3: Run negative cases
  Narration: Reject expired, wrongly targeted, and incorrectly signed fixtures.

- **0:19-0:22** / Reveal step 4: Rotate the test key
  Narration: Verify the documented overlap and retirement behavior.

- **0:22-0:26** / Reveal step 5: Remove key discovery
  Narration: Test bounded cached validation and secure failure for unknown keys.

- **0:26-0:31** / Reveal step 6: Check permission freshness
  Narration: Demonstrate the difference between a valid signature and current resource access.

- **0:31-0:41** / Takeaway and discussion prompt
  Narration: A valid signature is necessary for trust, but it is not the whole authorization decision. How would you reproduce this with synthetic data?

## References

- [JWT best current practices](https://www.rfc-editor.org/rfc/rfc8725)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
