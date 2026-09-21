# LLM Agents, Tools, and Controlled Execution / Pitfalls and Checks

By Yasir Sharfi

## The Idea

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

## Visual Blueprint

1. **Trap 1**: Treating retrieved text as permission to act.
2. **Counter-check 1**: Tool permissions and user authorization are explicit.
3. **Trap 2**: Using an unbounded reasoning/tool loop as a recovery strategy.
4. **Counter-check 2**: Budgets and terminal outcomes are enforced.
5. **Trap 3**: Repeating external effects after a crash without reconciliation.
6. **Counter-check 3**: Side effects have durable identities and recovery states.

## Caption

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

1. Trap 1
Treating retrieved text as permission to act.

2. Counter-check 1
Tool permissions and user authorization are explicit.

3. Trap 2
Using an unbounded reasoning/tool loop as a recovery strategy.

4. Counter-check 2
Budgets and terminal outcomes are enforced.

5. Trap 3
Repeating external effects after a crash without reconciliation.

6. Counter-check 3
Side effects have durable identities and recovery states.

The takeaway: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #llm #agents

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: When should I avoid an agent?

- **0:03-0:06** / Reveal step 1: Trap 1
  Narration: Treating retrieved text as permission to act.

- **0:06-0:09** / Reveal step 2: Counter-check 1
  Narration: Tool permissions and user authorization are explicit.

- **0:09-0:13** / Reveal step 3: Trap 2
  Narration: Using an unbounded reasoning/tool loop as a recovery strategy.

- **0:13-0:16** / Reveal step 4: Counter-check 2
  Narration: Budgets and terminal outcomes are enforced.

- **0:16-0:20** / Reveal step 5: Trap 3
  Narration: Repeating external effects after a crash without reconciliation.

- **0:20-0:24** / Reveal step 6: Counter-check 3
  Narration: Side effects have durable identities and recovery states.

- **0:24-0:35** / Takeaway and discussion prompt
  Narration: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions. What evidence would disprove your first diagnosis?

## References

- [LLM Agents, Tools, and Controlled Execution / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=llm-agents-tools-safety)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [GitHub Copilot agent responsible use](https://docs.github.com/en/copilot/responsible-use/agents)
- [Azure AI architecture guidance](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
