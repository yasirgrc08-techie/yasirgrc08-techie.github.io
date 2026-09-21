# LLM Agents, Tools, and Controlled Execution / Practice Decisions

By Yasir Sharfi

## The Idea

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

## Visual Blueprint

1. **Planning is not authorization**: A model proposing an action does not grant permission to perform it. The application must check user intent, tool scope, resource access, and any required approval.
2. **Watch for**: Treating retrieved text as permission to act.
3. **State must be durable where effects matter**: A conversation transcript alone may not be a reliable operation log. Persist stable operation IDs, status, and checkpoints around side effects.
4. **Watch for**: Using an unbounded reasoning/tool loop as a recovery strategy.
5. **Bound the search and execution**: Set limits on steps, tokens, wall time, retries, and resource use. Validate tool arguments and outputs.
6. **Watch for**: Repeating external effects after a crash without reconciliation.

## Caption

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

1. Planning is not authorization
A model proposing an action does not grant permission to perform it. The application must check user intent, tool scope, resource access, and any required approval.

2. Watch for
Treating retrieved text as permission to act.

3. State must be durable where effects matter
A conversation transcript alone may not be a reliable operation log. Persist stable operation IDs, status, and checkpoints around side effects.

4. Watch for
Using an unbounded reasoning/tool loop as a recovery strategy.

5. Bound the search and execution
Set limits on steps, tokens, wall time, retries, and resource use. Validate tool arguments and outputs.

6. Watch for
Repeating external effects after a crash without reconciliation.

The takeaway: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #llm #agents

## Reel Storyboard

Suggested duration: about 52 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: When should I avoid an agent?

- **0:03-0:14** / Reveal step 1: Planning is not authorization
  Narration: A model proposing an action does not grant permission to perform it. The application must check user intent, tool scope, resource access, and any required approval.

- **0:14-0:17** / Reveal step 2: Watch for
  Narration: Treating retrieved text as permission to act.

- **0:17-0:26** / Reveal step 3: State must be durable where effects matter
  Narration: A conversation transcript alone may not be a reliable operation log. Persist stable operation IDs, status, and checkpoints around side effects.

- **0:26-0:30** / Reveal step 4: Watch for
  Narration: Using an unbounded reasoning/tool loop as a recovery strategy.

- **0:30-0:37** / Reveal step 5: Bound the search and execution
  Narration: Set limits on steps, tokens, wall time, retries, and resource use. Validate tool arguments and outputs.

- **0:37-0:41** / Reveal step 6: Watch for
  Narration: Repeating external effects after a crash without reconciliation.

- **0:41-0:52** / Takeaway and discussion prompt
  Narration: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions. Which constraint would change your choice?

## References

- [LLM Agents, Tools, and Controlled Execution / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=llm-agents-tools-safety)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [GitHub Copilot agent responsible use](https://docs.github.com/en/copilot/responsible-use/agents)
- [Azure AI architecture guidance](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
