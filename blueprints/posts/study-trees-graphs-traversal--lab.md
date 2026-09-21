# Trees and Graphs: Traverse with a Purpose / Build and Validate

By Yasir Sharfi

## The Idea

Why is BFS not always the right shortest-path algorithm?

A traversal is a framework for exploring a state space while preserving the information needed by the problem. Decide what a node and edge represent, whether the graph is directed or weighted, and whether you need reachability, shortest distance, ordering, or an aggregate over subtrees.

## Visual Blueprint

1. **Set up the scenario**: Tasks A and B must finish before C; C must finish before D. You need a valid execution order or a clear report that the dependency graph contains a cycle.
2. **Experiment 1**: Create edges A->C, B->C, and C->D, with indegrees zero, zero, two, and one.
3. **Experiment 2**: Remove A and B in either order, decrementing C's indegree for each completed dependency. C becomes ready only after both decrements. Removing C then makes D ready.
4. **Experiment 3**: Add edge D->B. After processing A, the remaining B-C-D cycle never reaches zero indegree.
5. **Expected evidence**: The indegree invariant counts unresolved prerequisites.
6. **Check the result**: Are all initial zero-indegree nodes included?

## Caption

Why is BFS not always the right shortest-path algorithm?

A traversal is a framework for exploring a state space while preserving the information needed by the problem. Decide what a node and edge represent, whether the graph is directed or weighted, and whether you need reachability, shortest distance, ordering, or an aggregate over subtrees.

1. Set up the scenario
Tasks A and B must finish before C; C must finish before D. You need a valid execution order or a clear report that the dependency graph contains a cycle.

2. Experiment 1
Create edges A->C, B->C, and C->D, with indegrees zero, zero, two, and one.

3. Experiment 2
Remove A and B in either order, decrementing C's indegree for each completed dependency. C becomes ready only after both decrements. Removing C then makes D ready.

4. Experiment 3
Add edge D->B. After processing A, the remaining B-C-D cycle never reaches zero indegree.

5. Expected evidence
The indegree invariant counts unresolved prerequisites.

6. Check the result
Are all initial zero-indegree nodes included?

The takeaway: Draw a small graph and annotate the queue or stack at each step. Include a cycle and a disconnected component.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DSAandProblemSolving #learning #trees #graphs

## Reel Storyboard

Suggested duration: about 57 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why is BFS not always the right shortest-path algorithm?

- **0:04-0:16** / Reveal step 1: Set up the scenario
  Narration: Tasks A and B must finish before C; C must finish before D. You need a valid execution order or a clear report that the dependency graph contains a cycle.

- **0:16-0:22** / Reveal step 2: Experiment 1
  Narration: Create edges A->C, B->C, and C->D, with indegrees zero, zero, two, and one.

- **0:22-0:33** / Reveal step 3: Experiment 2
  Narration: Remove A and B in either order, decrementing C's indegree for each completed dependency. C becomes ready only after both decrements. Removing C then makes D ready.

- **0:33-0:39** / Reveal step 4: Experiment 3
  Narration: Add edge D->B. After processing A, the remaining B-C-D cycle never reaches zero indegree.

- **0:39-0:42** / Reveal step 5: Expected evidence
  Narration: The indegree invariant counts unresolved prerequisites.

- **0:42-0:45** / Reveal step 6: Check the result
  Narration: Are all initial zero-indegree nodes included?

- **0:45-0:57** / Takeaway and discussion prompt
  Narration: Draw a small graph and annotate the queue or stack at each step. Include a cycle and a disconnected component. How would you reproduce this with synthetic data?

## References

- [Trees and Graphs: Traverse with a Purpose / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=trees-graphs-traversal)
- [MIT algorithms course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
- [CP-Algorithms: graph algorithms](https://cp-algorithms.com/graph/breadth-first-search.html)
- [Python deque](https://docs.python.org/3/library/collections.html#collections.deque)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
