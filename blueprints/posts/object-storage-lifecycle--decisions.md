# Object Storage Has a Lifecycle / Decision Guide

By Yasir Sharfi

## The Idea

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

## Visual Blueprint

1. **Immediate deletion**: Use immediate deletion when policy permits it and the operation can be retried safely.
2. **Trade-off / Immediate deletion**: A lost cleanup request can leave orphaned bytes unless a durable reconciliation path exists.
3. **Soft deletion**: Use a recoverable state when accidental deletion and support recovery matter.
4. **Trade-off / Soft deletion**: Retention costs and authorization behavior must remain explicit while the data still exists.
5. **Lifecycle policy**: Use storage lifecycle rules for well-defined age or state transitions.
6. **Trade-off / Lifecycle policy**: Age-based rules do not understand every application reference or business exception.

## Caption

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

1. Immediate deletion
Use immediate deletion when policy permits it and the operation can be retried safely.

2. Trade-off / Immediate deletion
A lost cleanup request can leave orphaned bytes unless a durable reconciliation path exists.

3. Soft deletion
Use a recoverable state when accidental deletion and support recovery matter.

4. Trade-off / Soft deletion
Retention costs and authorization behavior must remain explicit while the data still exists.

5. Lifecycle policy
Use storage lifecycle rules for well-defined age or state transitions.

6. Trade-off / Lifecycle policy
Age-based rules do not understand every application reference or business exception.

The takeaway: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #storage #objectstorage #lifecycle

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The database row was deleted, but the expensive file was not.

- **0:05-0:11** / Reveal step 1: Immediate deletion
  Narration: Use immediate deletion when policy permits it and the operation can be retried safely.

- **0:11-0:17** / Reveal step 2: Trade-off / Immediate deletion
  Narration: A lost cleanup request can leave orphaned bytes unless a durable reconciliation path exists.

- **0:17-0:22** / Reveal step 3: Soft deletion
  Narration: Use a recoverable state when accidental deletion and support recovery matter.

- **0:22-0:28** / Reveal step 4: Trade-off / Soft deletion
  Narration: Retention costs and authorization behavior must remain explicit while the data still exists.

- **0:28-0:32** / Reveal step 5: Lifecycle policy
  Narration: Use storage lifecycle rules for well-defined age or state transitions.

- **0:32-0:37** / Reveal step 6: Trade-off / Lifecycle policy
  Narration: Age-based rules do not understand every application reference or business exception.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract. Which constraint would change your choice?

## References

- [Amazon S3 object lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
