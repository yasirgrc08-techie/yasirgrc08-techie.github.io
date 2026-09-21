# Design Chat and Notification Delivery / Practice Decisions

By Yasir Sharfi

## The Idea

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

## Visual Blueprint

1. **Connections are not the source of truth**: A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.
2. **Watch for**: Treating live connection state as durable message history.
3. **Order and identity need a scope**: A client-generated request ID can deduplicate a retried send, while a server-assigned conversation sequence can establish a display order.
4. **Watch for**: Equating provider acceptance with user read acknowledgement.
5. **Receipts describe different events**: Provider acceptance, device delivery, and user read acknowledgement are not equivalent. Push notifications are often hints to fetch authoritative state.
6. **Watch for**: Ignoring reconnect storms, duplicate events, and membership changes.

## Caption

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

1. Connections are not the source of truth
A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.

2. Watch for
Treating live connection state as durable message history.

3. Order and identity need a scope
A client-generated request ID can deduplicate a retried send, while a server-assigned conversation sequence can establish a display order.

4. Watch for
Equating provider acceptance with user read acknowledgement.

5. Receipts describe different events
Provider acceptance, device delivery, and user read acknowledgement are not equivalent. Push notifications are often hints to fetch authoritative state.

6. Watch for
Ignoring reconnect storms, duplicate events, and membership changes.

The takeaway: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #chat #notification

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Why use WebSockets instead of polling?

- **0:03-0:13** / Reveal step 1: Connections are not the source of truth
  Narration: A live connection can disappear at any point. Persist a message before acknowledging the promised acceptance boundary, then route it to online devices.

- **0:13-0:17** / Reveal step 2: Watch for
  Narration: Treating live connection state as durable message history.

- **0:17-0:25** / Reveal step 3: Order and identity need a scope
  Narration: A client-generated request ID can deduplicate a retried send, while a server-assigned conversation sequence can establish a display order.

- **0:25-0:28** / Reveal step 4: Watch for
  Narration: Equating provider acceptance with user read acknowledgement.

- **0:28-0:36** / Reveal step 5: Receipts describe different events
  Narration: Provider acceptance, device delivery, and user read acknowledgement are not equivalent. Push notifications are often hints to fetch authoritative state.

- **0:36-0:40** / Reveal step 6: Watch for
  Narration: Ignoring reconnect storms, duplicate events, and membership changes.

- **0:40-0:50** / Takeaway and discussion prompt
  Narration: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known. Which constraint would change your choice?

## References

- [Design Chat and Notification Delivery / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=chat-notification-systems)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Azure event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Azure queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
