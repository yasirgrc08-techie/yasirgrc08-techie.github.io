# Sliding Windows and Prefix Sums / Practice Decisions

By Yasir Sharfi

## The Idea

Why not use sliding windows for every sum problem?

Contiguous-range problems often become efficient when you maintain only the state that changes at the boundaries. Sliding windows use a safe expand/shrink rule; prefix sums turn a range relationship into a relationship between earlier states. The input constraints determine which reasoning applies.

## Visual Blueprint

1. **Fixed windows update two boundaries**: For a window of length k, add the incoming value and remove the outgoing one. Carefully define when the first full window exists.
2. **Watch for**: Applying a positive-sum window to arbitrary signed values.
3. **Variable windows need monotonicity**: A window can shrink greedily only when the validity rule supports it.
4. **Watch for**: Moving the left boundary backward after a repeated character.
5. **Prefixes encode history**: If current prefix sum is S, a subarray of target sum T ends here for every earlier prefix equal to S-T. Initialize the empty prefix once.
6. **Watch for**: Replacing frequency counts with a set and losing valid ranges.

## Caption

Why not use sliding windows for every sum problem?

Contiguous-range problems often become efficient when you maintain only the state that changes at the boundaries. Sliding windows use a safe expand/shrink rule; prefix sums turn a range relationship into a relationship between earlier states. The input constraints determine which reasoning applies.

1. Fixed windows update two boundaries
For a window of length k, add the incoming value and remove the outgoing one. Carefully define when the first full window exists.

2. Watch for
Applying a positive-sum window to arbitrary signed values.

3. Variable windows need monotonicity
A window can shrink greedily only when the validity rule supports it.

4. Watch for
Moving the left boundary backward after a repeated character.

5. Prefixes encode history
If current prefix sum is S, a subarray of target sum T ends here for every earlier prefix equal to S-T. Initialize the empty prefix once.

6. Watch for
Replacing frequency counts with a set and losing valid ranges.

The takeaway: Draw indexes and window state for a short example before coding.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DSAandProblemSolving #learning #sliding #windows

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Why not use sliding windows for every sum problem?

- **0:04-0:14** / Reveal step 1: Fixed windows update two boundaries
  Narration: For a window of length k, add the incoming value and remove the outgoing one. Carefully define when the first full window exists.

- **0:14-0:18** / Reveal step 2: Watch for
  Narration: Applying a positive-sum window to arbitrary signed values.

- **0:18-0:23** / Reveal step 3: Variable windows need monotonicity
  Narration: A window can shrink greedily only when the validity rule supports it.

- **0:23-0:27** / Reveal step 4: Watch for
  Narration: Moving the left boundary backward after a repeated character.

- **0:27-0:38** / Reveal step 5: Prefixes encode history
  Narration: If current prefix sum is S, a subarray of target sum T ends here for every earlier prefix equal to S-T. Initialize the empty prefix once.

- **0:38-0:42** / Reveal step 6: Watch for
  Narration: Replacing frequency counts with a set and losing valid ranges.

- **0:42-0:49** / Takeaway and discussion prompt
  Narration: Draw indexes and window state for a short example before coding. Which constraint would change your choice?

## References

- [Sliding Windows and Prefix Sums / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=sliding-windows-prefix-sums)
- [MIT algorithms course](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
- [Python collections](https://docs.python.org/3/library/collections.html)
- [NeetCode roadmap](https://neetcode.io/roadmap)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
