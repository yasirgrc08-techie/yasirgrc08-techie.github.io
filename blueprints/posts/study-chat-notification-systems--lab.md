# Design Chat and Notification Delivery / Build and Validate

By Yasir Sharfi

## The Idea

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

## Visual Blueprint

1. **Set up the scenario**: A sender submits a message, the server stores it, and the connection breaks before the acknowledgement arrives.
2. **Experiment 1**: Give the send a stable client operation ID scoped to sender and conversation.
3. **Experiment 2**: Route the durable message to the recipient using the same server message ID.
4. **Experiment 3**: On reconnect, fetch messages after the last acknowledged cursor and reconcile local pending sends with server results.
5. **Expected evidence**: The logical message remains one message across retries and duplicate transport events.
6. **Check the result**: Can a retry with the same ID create a second message?

## Caption

Why use WebSockets instead of polling?

Real-time transport is only one part of messaging. A reliable design also needs durable identities, ordering scope, authorization, device synchronization, and explicit receipt semantics. Notifications add preferences, provider limits, retries, and ambiguous delivery outcomes that cannot be solved by a WebSocket alone.

1. Set up the scenario
A sender submits a message, the server stores it, and the connection breaks before the acknowledgement arrives.

2. Experiment 1
Give the send a stable client operation ID scoped to sender and conversation.

3. Experiment 2
Route the durable message to the recipient using the same server message ID.

4. Experiment 3
On reconnect, fetch messages after the last acknowledged cursor and reconcile local pending sends with server results.

5. Expected evidence
The logical message remains one message across retries and duplicate transport events.

6. Check the result
Can a retry with the same ID create a second message?

The takeaway: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #chat #notification

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Why use WebSockets instead of polling?

- **0:03-0:10** / Reveal step 1: Set up the scenario
  Narration: A sender submits a message, the server stores it, and the connection breaks before the acknowledgement arrives.

- **0:10-0:16** / Reveal step 2: Experiment 1
  Narration: Give the send a stable client operation ID scoped to sender and conversation.

- **0:16-0:22** / Reveal step 3: Experiment 2
  Narration: Route the durable message to the recipient using the same server message ID.

- **0:22-0:29** / Reveal step 4: Experiment 3
  Narration: On reconnect, fetch messages after the last acknowledged cursor and reconcile local pending sends with server results.

- **0:29-0:34** / Reveal step 5: Expected evidence
  Narration: The logical message remains one message across retries and duplicate transport events.

- **0:34-0:39** / Reveal step 6: Check the result
  Narration: Can a retry with the same ID create a second message?

- **0:39-0:50** / Takeaway and discussion prompt
  Narration: Draw both the durable message path and the online delivery path. For each acknowledgement, write exactly what is known. How would you reproduce this with synthetic data?

## References

- [Design Chat and Notification Delivery / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=chat-notification-systems)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Azure event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Azure queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
