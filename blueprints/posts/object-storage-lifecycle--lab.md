# Object Storage Has a Lifecycle / Build and Validate

By Yasir Sharfi

## The Idea

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

## Visual Blueprint

1. **Create file states**: Model pending, validated, published, and deleted metadata states.
2. **Interrupt publication**: Store bytes but fail before updating metadata, then reconcile the orphan.
3. **Interrupt deletion**: Delete metadata or enqueue cleanup in a controlled failure scenario.
4. **Replay cleanup**: Confirm repeated cleanup cannot remove a different version or tenant's object.
5. **Exercise retention**: Keep a retained version while removing an expired temporary upload.
6. **Audit both systems**: Compare expected references, object existence, and lifecycle evidence.

## Caption

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

1. Create file states
Model pending, validated, published, and deleted metadata states.

2. Interrupt publication
Store bytes but fail before updating metadata, then reconcile the orphan.

3. Interrupt deletion
Delete metadata or enqueue cleanup in a controlled failure scenario.

4. Replay cleanup
Confirm repeated cleanup cannot remove a different version or tenant's object.

5. Exercise retention
Keep a retained version while removing an expired temporary upload.

6. Audit both systems
Compare expected references, object existence, and lifecycle evidence.

The takeaway: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #storage #objectstorage #lifecycle

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The database row was deleted, but the expensive file was not.

- **0:05-0:09** / Reveal step 1: Create file states
  Narration: Model pending, validated, published, and deleted metadata states.

- **0:09-0:14** / Reveal step 2: Interrupt publication
  Narration: Store bytes but fail before updating metadata, then reconcile the orphan.

- **0:14-0:18** / Reveal step 3: Interrupt deletion
  Narration: Delete metadata or enqueue cleanup in a controlled failure scenario.

- **0:18-0:23** / Reveal step 4: Replay cleanup
  Narration: Confirm repeated cleanup cannot remove a different version or tenant's object.

- **0:23-0:27** / Reveal step 5: Exercise retention
  Narration: Keep a retained version while removing an expired temporary upload.

- **0:27-0:31** / Reveal step 6: Audit both systems
  Narration: Compare expected references, object existence, and lifecycle evidence.

- **0:31-0:39** / Takeaway and discussion prompt
  Narration: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract. How would you reproduce this with synthetic data?

## References

- [Amazon S3 object lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
