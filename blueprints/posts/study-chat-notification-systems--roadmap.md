# Design Chat and Notification Delivery / Learning Roadmap

By Yasir Sharfi

## The Idea

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

## Visual Blueprint

1. **Build the mental model**: A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.
2. **Phase 1 / Days 1-3**: Define conversations, members, message IDs, attachment references, and pagination. Choose per-conversation order and a stable retry identity.
3. **Phase 2 / Days 4-6**: Add connection routing and durable catch-up using a cursor. Test reconnect, duplicate send, and a device receiving the same event twice.
4. **Phase 3 / Days 7-10**: Add preferences, quiet hours, group fan-out, provider adapters, and bounded retries.
5. **Phase 4 / Days 11-14**: Estimate concurrent connections, message rate, fan-out, storage retention, and reconnect bursts. Add backpressure, rate limits, and delivery-lag metrics.
6. **Prove readiness**: Message identity and ordering scope are explicit.

## Caption

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

1. Build the mental model
A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.

2. Phase 1 / Days 1-3
Define conversations, members, message IDs, attachment references, and pagination. Choose per-conversation order and a stable retry identity.

3. Phase 2 / Days 4-6
Add connection routing and durable catch-up using a cursor. Test reconnect, duplicate send, and a device receiving the same event twice.

4. Phase 3 / Days 7-10
Add preferences, quiet hours, group fan-out, provider adapters, and bounded retries.

5. Phase 4 / Days 11-14
Estimate concurrent connections, message rate, fan-out, storage retention, and reconnect bursts. Add backpressure, rate limits, and delivery-lag metrics.

6. Prove readiness
Message identity and ordering scope are explicit.

The takeaway: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #chat #notification

## Reel Storyboard

Suggested duration: about 55 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Why use WebSockets instead of polling?

- **0:03-0:13** / Reveal step 1: Build the mental model
  Narration: A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.

- **0:13-0:20** / Reveal step 2: Phase 1 / Days 1-3
  Narration: Define conversations, members, message IDs, attachment references, and pagination. Choose per-conversation order and a stable retry identity.

- **0:20-0:29** / Reveal step 3: Phase 2 / Days 4-6
  Narration: Add connection routing and durable catch-up using a cursor. Test reconnect, duplicate send, and a device receiving the same event twice.

- **0:29-0:34** / Reveal step 4: Phase 3 / Days 7-10
  Narration: Add preferences, quiet hours, group fan-out, provider adapters, and bounded retries.

- **0:34-0:42** / Reveal step 5: Phase 4 / Days 11-14
  Narration: Estimate concurrent connections, message rate, fan-out, storage retention, and reconnect bursts. Add backpressure, rate limits, and delivery-lag metrics.

- **0:42-0:45** / Reveal step 6: Prove readiness
  Narration: Message identity and ordering scope are explicit.

- **0:45-0:55** / Takeaway and discussion prompt
  Narration: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known. Which bottleneck would you measure first?

## References

- [Design Chat and Notification Delivery / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=chat-notification-systems)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Azure event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Azure queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
