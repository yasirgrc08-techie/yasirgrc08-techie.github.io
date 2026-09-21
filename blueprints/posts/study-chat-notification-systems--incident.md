# Design Chat and Notification Delivery / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

## Visual Blueprint

1. **Trap 1**: Treating live connection state as durable message history.
2. **Counter-check 1**: Message identity and ordering scope are explicit.
3. **Trap 2**: Equating provider acceptance with user read acknowledgement.
4. **Counter-check 2**: Offline catch-up and retries preserve user-visible correctness.
5. **Trap 3**: Ignoring reconnect storms, duplicate events, and membership changes.
6. **Counter-check 3**: Authorization applies to history and attachments.

## Caption

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

1. Trap 1
Treating live connection state as durable message history.

2. Counter-check 1
Message identity and ordering scope are explicit.

3. Trap 2
Equating provider acceptance with user read acknowledgement.

4. Counter-check 2
Offline catch-up and retries preserve user-visible correctness.

5. Trap 3
Ignoring reconnect storms, duplicate events, and membership changes.

6. Counter-check 3
Authorization applies to history and attachments.

The takeaway: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #chat #notification

## Reel Storyboard

Suggested duration: about 34 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Why use WebSockets instead of polling?

- **0:03-0:07** / Reveal step 1: Trap 1
  Narration: Treating live connection state as durable message history.

- **0:07-0:10** / Reveal step 2: Counter-check 1
  Narration: Message identity and ordering scope are explicit.

- **0:10-0:13** / Reveal step 3: Trap 2
  Narration: Equating provider acceptance with user read acknowledgement.

- **0:13-0:16** / Reveal step 4: Counter-check 2
  Narration: Offline catch-up and retries preserve user-visible correctness.

- **0:16-0:20** / Reveal step 5: Trap 3
  Narration: Ignoring reconnect storms, duplicate events, and membership changes.

- **0:20-0:23** / Reveal step 6: Counter-check 3
  Narration: Authorization applies to history and attachments.

- **0:23-0:34** / Takeaway and discussion prompt
  Narration: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known. What evidence would disprove your first diagnosis?

## References

- [Design Chat and Notification Delivery / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=chat-notification-systems)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Azure event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Azure queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
