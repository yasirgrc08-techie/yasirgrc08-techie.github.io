# Design Chat and Notification Delivery / Readiness Signals

By Yasir Sharfi

## The Idea

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

## Visual Blueprint

1. **Explain**: Message identity and ordering scope are explicit.
2. **Interpret / Explain**: Can a retry with the same ID create a second message?
3. **Implement**: Offline catch-up and retries preserve user-visible correctness.
4. **Interpret / Implement**: Does the recipient deduplicate replayed events?
5. **Verify**: Authorization applies to history and attachments.
6. **Interpret / Verify**: Can a removed member fetch history they are no longer authorized to see?

## Caption

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

1. Explain
Message identity and ordering scope are explicit.

2. Interpret / Explain
Can a retry with the same ID create a second message?

3. Implement
Offline catch-up and retries preserve user-visible correctness.

4. Interpret / Implement
Does the recipient deduplicate replayed events?

5. Verify
Authorization applies to history and attachments.

6. Interpret / Verify
Can a removed member fetch history they are no longer authorized to see?

The takeaway: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #chat #notification

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Why use WebSockets instead of polling?

- **0:03-0:06** / Reveal step 1: Explain
  Narration: Message identity and ordering scope are explicit.

- **0:06-0:11** / Reveal step 2: Interpret / Explain
  Narration: Can a retry with the same ID create a second message?

- **0:11-0:14** / Reveal step 3: Implement
  Narration: Offline catch-up and retries preserve user-visible correctness.

- **0:14-0:17** / Reveal step 4: Interpret / Implement
  Narration: Does the recipient deduplicate replayed events?

- **0:17-0:20** / Reveal step 5: Verify
  Narration: Authorization applies to history and attachments.

- **0:20-0:26** / Reveal step 6: Interpret / Verify
  Narration: Can a removed member fetch history they are no longer authorized to see?

- **0:26-0:37** / Takeaway and discussion prompt
  Narration: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known. Which metric could look healthy while users suffer?

## References

- [Design Chat and Notification Delivery / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=chat-notification-systems)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Azure event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Azure queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
