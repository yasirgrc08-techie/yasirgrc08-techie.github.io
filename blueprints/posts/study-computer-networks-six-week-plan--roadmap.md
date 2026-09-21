# Plan Your Computer Networks Preparation / Learning Roadmap

By Yasir Sharfi

## The Idea

Does UDP mean packets always arrive faster?

Follow data from an application message to a remote service and back. Learn addresses, ports, routing, DNS, TCP/UDP, TLS, and HTTP through local experiments. Keep transport guarantees distinct from application guarantees: successful delivery of bytes does not prove a business operation completed once.

## Visual Blueprint

1. **Build the mental model**: IP routes packets; transport protocols connect endpoints or deliver datagrams; TLS protects a channel; HTTP defines request semantics.
2. **Phase 1 / Week 1**: Study IP addresses, subnets, routes, ports, sockets, and local versus remote destinations. Inspect your own machine's interfaces and routes.
3. **Phase 2 / Week 2**: Implement a framed TCP exchange and compare it with a UDP datagram example. Test partial reads, disconnects, and timeouts.
4. **Phase 3 / Weeks 3-4**: Study DNS resolution, TLS identity checks, HTTP methods, status codes, caching, and connection reuse. Compare browser timing with a command-line HTTP client.
5. **Phase 4 / Weeks 5-6**: Practice slow dependencies, retry storms, proxy timeouts, resets, and DNS changes.
6. **Prove readiness**: A browser request can be explained across protocol boundaries.

## Caption

Does UDP mean packets always arrive faster?

Follow data from an application message to a remote service and back. Learn addresses, ports, routing, DNS, TCP/UDP, TLS, and HTTP through local experiments. Keep transport guarantees distinct from application guarantees: successful delivery of bytes does not prove a business operation completed once.

1. Build the mental model
IP routes packets; transport protocols connect endpoints or deliver datagrams; TLS protects a channel; HTTP defines request semantics.

2. Phase 1 / Week 1
Study IP addresses, subnets, routes, ports, sockets, and local versus remote destinations. Inspect your own machine's interfaces and routes.

3. Phase 2 / Week 2
Implement a framed TCP exchange and compare it with a UDP datagram example. Test partial reads, disconnects, and timeouts.

4. Phase 3 / Weeks 3-4
Study DNS resolution, TLS identity checks, HTTP methods, status codes, caching, and connection reuse. Compare browser timing with a command-line HTTP client.

5. Phase 4 / Weeks 5-6
Practice slow dependencies, retry storms, proxy timeouts, resets, and DNS changes.

6. Prove readiness
A browser request can be explained across protocol boundaries.

The takeaway: Use a local client and server you control. Predict a request trace, introduce one safe delay or disconnect, and compare the result.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CoreComputerScience #learning #computer #networks

## Reel Storyboard

Suggested duration: about 57 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Does UDP mean packets always arrive faster?

- **0:03-0:11** / Reveal step 1: Build the mental model
  Narration: IP routes packets; transport protocols connect endpoints or deliver datagrams; TLS protects a channel; HTTP defines request semantics.

- **0:11-0:19** / Reveal step 2: Phase 1 / Week 1
  Narration: Study IP addresses, subnets, routes, ports, sockets, and local versus remote destinations. Inspect your own machine's interfaces and routes.

- **0:19-0:27** / Reveal step 3: Phase 2 / Week 2
  Narration: Implement a framed TCP exchange and compare it with a UDP datagram example. Test partial reads, disconnects, and timeouts.

- **0:27-0:36** / Reveal step 4: Phase 3 / Weeks 3-4
  Narration: Study DNS resolution, TLS identity checks, HTTP methods, status codes, caching, and connection reuse. Compare browser timing with a command-line HTTP client.

- **0:36-0:41** / Reveal step 5: Phase 4 / Weeks 5-6
  Narration: Practice slow dependencies, retry storms, proxy timeouts, resets, and DNS changes.

- **0:41-0:45** / Reveal step 6: Prove readiness
  Narration: A browser request can be explained across protocol boundaries.

- **0:45-0:57** / Takeaway and discussion prompt
  Narration: Use a local client and server you control. Predict a request trace, introduce one safe delay or disconnect, and compare the result. Which bottleneck would you measure first?

## References

- [Plan Your Computer Networks Preparation / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=computer-networks-six-week-plan)
- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/)
- [RFC 9000: QUIC](https://www.rfc-editor.org/rfc/rfc9000)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
