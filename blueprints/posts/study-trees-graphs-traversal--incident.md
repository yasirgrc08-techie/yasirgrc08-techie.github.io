# Trees and Graphs: Traverse with a Purpose / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Why is BFS not always the right shortest-path algorithm?

A traversal is a framework for exploring a state space while preserving the information needed by the problem. Decide what a node and edge represent, whether the graph is directed or weighted, and whether you need reachability, shortest distance, ordering, or an aggregate over subtrees.

## Visual Blueprint

1. **Trap 1**: Using an incomplete node identity for a constrained path problem.
2. **Counter-check 1**: Node, edge, and visited-state meanings are explicit.
3. **Trap 2**: Assuming a visited node always implies a directed cycle.
4. **Counter-check 2**: Traversal order is justified by the objective.
5. **Trap 3**: Ignoring disconnected components or recursion-depth limits.
6. **Counter-check 3**: Cycles and unreachable states are handled correctly.

## Caption

Why is BFS not always the right shortest-path algorithm?

A traversal is a framework for exploring a state space while preserving the information needed by the problem. Decide what a node and edge represent, whether the graph is directed or weighted, and whether you need reachability, shortest distance, ordering, or an aggregate over subtrees.

1. Trap 1
Using an incomplete node identity for a constrained path problem.

2. Counter-check 1
Node, edge, and visited-state meanings are explicit.

3. Trap 2
Assuming a visited node always implies a directed cycle.

4. Counter-check 2
Traversal order is justified by the objective.

5. Trap 3
Ignoring disconnected components or recursion-depth limits.

6. Counter-check 3
Cycles and unreachable states are handled correctly.

The takeaway: Draw a small graph and annotate the queue or stack at each step. Include a cycle and a disconnected component.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DSAandProblemSolving #learning #trees #graphs

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why is BFS not always the right shortest-path algorithm?

- **0:04-0:08** / Reveal step 1: Trap 1
  Narration: Using an incomplete node identity for a constrained path problem.

- **0:08-0:11** / Reveal step 2: Counter-check 1
  Narration: Node, edge, and visited-state meanings are explicit.

- **0:11-0:15** / Reveal step 3: Trap 2
  Narration: Assuming a visited node always implies a directed cycle.

- **0:15-0:18** / Reveal step 4: Counter-check 2
  Narration: Traversal order is justified by the objective.

- **0:18-0:21** / Reveal step 5: Trap 3
  Narration: Ignoring disconnected components or recursion-depth limits.

- **0:21-0:24** / Reveal step 6: Counter-check 3
  Narration: Cycles and unreachable states are handled correctly.

- **0:24-0:35** / Takeaway and discussion prompt
  Narration: Draw a small graph and annotate the queue or stack at each step. Include a cycle and a disconnected component. What evidence would disprove your first diagnosis?

## References

- [Trees and Graphs: Traverse with a Purpose / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=trees-graphs-traversal)
- [MIT algorithms course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
- [CP-Algorithms: graph algorithms](https://cp-algorithms.com/graph/breadth-first-search.html)
- [Python deque](https://docs.python.org/3/library/collections.html#collections.deque)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
