# Rate Limits That Protect Work / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

## Visual Blueprint

1. **Choose the identity**: Limit by authenticated tenant or principal where possible; shared IPs can represent many unrelated users.
2. **Price expensive work**: Separate high-cost endpoints or assign weights based on measured resource demand.
3. **Allow bounded bursts**: Choose bucket capacity and refill behavior that match the documented client contract.
4. **Protect concurrency**: Add an in-flight limit when long-running requests can exhaust workers despite a modest request rate.
5. **Define failure mode**: Decide which operations fail closed, degrade, or use conservative local limits if the limiter is unavailable.
6. **Explain rejection**: Return a useful retry signal without exposing other tenants' usage or internal capacity details.

## Caption

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

1. Choose the identity
Limit by authenticated tenant or principal where possible; shared IPs can represent many unrelated users.

2. Price expensive work
Separate high-cost endpoints or assign weights based on measured resource demand.

3. Allow bounded bursts
Choose bucket capacity and refill behavior that match the documented client contract.

4. Protect concurrency
Add an in-flight limit when long-running requests can exhaust workers despite a modest request rate.

5. Define failure mode
Decide which operations fail closed, degrade, or use conservative local limits if the limiter is unavailable.

6. Explain rejection
Return a useful retry signal without exposing other tenants' usage or internal capacity details.

The takeaway: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #ratelimiting #fairness

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One cheap request and one expensive request should not always cost the same quota.

- **0:06-0:12** / Reveal step 1: Choose the identity
  Narration: Limit by authenticated tenant or principal where possible; shared IPs can represent many unrelated users.

- **0:12-0:17** / Reveal step 2: Price expensive work
  Narration: Separate high-cost endpoints or assign weights based on measured resource demand.

- **0:17-0:22** / Reveal step 3: Allow bounded bursts
  Narration: Choose bucket capacity and refill behavior that match the documented client contract.

- **0:22-0:28** / Reveal step 4: Protect concurrency
  Narration: Add an in-flight limit when long-running requests can exhaust workers despite a modest request rate.

- **0:28-0:35** / Reveal step 5: Define failure mode
  Narration: Decide which operations fail closed, degrade, or use conservative local limits if the limiter is unavailable.

- **0:35-0:41** / Reveal step 6: Explain rejection
  Narration: Return a useful retry signal without exposing other tenants' usage or internal capacity details.

- **0:41-0:49** / Takeaway and discussion prompt
  Narration: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation. Which bottleneck would you measure first?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
