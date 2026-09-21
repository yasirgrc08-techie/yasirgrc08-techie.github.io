# Object Storage Has a Lifecycle / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

## Visual Blueprint

1. **Define object ownership**: Bind each object key to a verified tenant and business record.
2. **Separate upload from publication**: Keep incomplete or unvalidated uploads outside the public serving path.
3. **Record authoritative metadata**: Store version, size, and state needed to reconcile the object with the application.
4. **Make deletion recoverable**: Use a durable deletion request and replay-safe cleanup rather than a fragile dual write.
5. **Apply retention rules**: Distinguish business retention, legal requirements, versioning, and temporary upload cleanup.
6. **Audit the inventory**: Compare referenced and unreferenced objects without exposing private filenames or data.

## Caption

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

1. Define object ownership
Bind each object key to a verified tenant and business record.

2. Separate upload from publication
Keep incomplete or unvalidated uploads outside the public serving path.

3. Record authoritative metadata
Store version, size, and state needed to reconcile the object with the application.

4. Make deletion recoverable
Use a durable deletion request and replay-safe cleanup rather than a fragile dual write.

5. Apply retention rules
Distinguish business retention, legal requirements, versioning, and temporary upload cleanup.

6. Audit the inventory
Compare referenced and unreferenced objects without exposing private filenames or data.

The takeaway: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #storage #objectstorage #lifecycle

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The database row was deleted, but the expensive file was not.

- **0:05-0:10** / Reveal step 1: Define object ownership
  Narration: Bind each object key to a verified tenant and business record.

- **0:10-0:14** / Reveal step 2: Separate upload from publication
  Narration: Keep incomplete or unvalidated uploads outside the public serving path.

- **0:14-0:20** / Reveal step 3: Record authoritative metadata
  Narration: Store version, size, and state needed to reconcile the object with the application.

- **0:20-0:26** / Reveal step 4: Make deletion recoverable
  Narration: Use a durable deletion request and replay-safe cleanup rather than a fragile dual write.

- **0:26-0:30** / Reveal step 5: Apply retention rules
  Narration: Distinguish business retention, legal requirements, versioning, and temporary upload cleanup.

- **0:30-0:35** / Reveal step 6: Audit the inventory
  Narration: Compare referenced and unreferenced objects without exposing private filenames or data.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract. Which bottleneck would you measure first?

## References

- [Amazon S3 object lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
