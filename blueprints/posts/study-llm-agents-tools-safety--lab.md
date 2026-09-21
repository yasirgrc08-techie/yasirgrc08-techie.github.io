# LLM Agents, Tools, and Controlled Execution / Build and Validate

By Yasir Sharfi

## The Idea

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

## Visual Blueprint

1. **Set up the scenario**: An assistant is authorized to create one support ticket through a provider.
2. **Experiment 1**: Before the call, persist a stable operation ID, validated payload, authorization context, and submitted state.
3. **Experiment 2**: On recovery, inspect the durable operation. Query provider status or retry under the same supported idempotency contract.
4. **Experiment 3**: After confirmation, store the provider result and checkpoint completion.
5. **Expected evidence**: The workflow can explain what was requested, authorized, attempted, and confirmed.
6. **Check the result**: Is operation identity durable before the side effect?

## Caption

When should I avoid an agent?

An agent chooses actions within an application-defined environment. Reliable operation requires more than a model loop: tools need schemas, authorization, bounded execution, durable state, and safe handling of ambiguous outcomes. External content is data, not authority to expand the user's request.

1. Set up the scenario
An assistant is authorized to create one support ticket through a provider.

2. Experiment 1
Before the call, persist a stable operation ID, validated payload, authorization context, and submitted state.

3. Experiment 2
On recovery, inspect the durable operation. Query provider status or retry under the same supported idempotency contract.

4. Experiment 3
After confirmation, store the provider result and checkpoint completion.

5. Expected evidence
The workflow can explain what was requested, authorized, attempted, and confirmed.

6. Check the result
Is operation identity durable before the side effect?

The takeaway: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #AIandMachineLearning #learning #llm #agents

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: When should I avoid an agent?

- **0:03-0:08** / Reveal step 1: Set up the scenario
  Narration: An assistant is authorized to create one support ticket through a provider.

- **0:08-0:14** / Reveal step 2: Experiment 1
  Narration: Before the call, persist a stable operation ID, validated payload, authorization context, and submitted state.

- **0:14-0:21** / Reveal step 3: Experiment 2
  Narration: On recovery, inspect the durable operation. Query provider status or retry under the same supported idempotency contract.

- **0:21-0:25** / Reveal step 4: Experiment 3
  Narration: After confirmation, store the provider result and checkpoint completion.

- **0:25-0:30** / Reveal step 5: Expected evidence
  Narration: The workflow can explain what was requested, authorized, attempted, and confirmed.

- **0:30-0:34** / Reveal step 6: Check the result
  Narration: Is operation identity durable before the side effect?

- **0:34-0:46** / Takeaway and discussion prompt
  Narration: Use mocked tools and synthetic data first. Separate read-only tools from state-changing tools and require explicit approval for consequential actions. How would you reproduce this with synthetic data?

## References

- [LLM Agents, Tools, and Controlled Execution / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=llm-agents-tools-safety)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [GitHub Copilot agent responsible use](https://docs.github.com/en/copilot/responsible-use/agents)
- [Azure AI architecture guidance](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
