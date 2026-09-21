# Object Storage Has a Lifecycle / Failure and Recovery

By Yasir Sharfi

## The Idea

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

## Visual Blueprint

1. **Notice storage drift**: Object-storage cost grows faster than the application's active data footprint.
2. **Compare authoritative inventories**: Identify unreferenced objects and incomplete multipart uploads.
3. **Protect valid content**: Exclude live and retained business records before any cleanup.
4. **Repair the deletion workflow**: Persist cleanup requests and make repeated deletion safe.
5. **Recover interrupted jobs**: Replay outstanding cleanup with bounded rate and audit records.
6. **Verify the new lifecycle**: Test upload failure, publication failure, deletion retries, and retention exceptions.

## Caption

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

1. Notice storage drift
Object-storage cost grows faster than the application's active data footprint.

2. Compare authoritative inventories
Identify unreferenced objects and incomplete multipart uploads.

3. Protect valid content
Exclude live and retained business records before any cleanup.

4. Repair the deletion workflow
Persist cleanup requests and make repeated deletion safe.

5. Recover interrupted jobs
Replay outstanding cleanup with bounded rate and audit records.

6. Verify the new lifecycle
Test upload failure, publication failure, deletion retries, and retention exceptions.

The takeaway: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #storage #objectstorage #lifecycle

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The database row was deleted, but the expensive file was not.

- **0:05-0:09** / Reveal step 1: Notice storage drift
  Narration: Object-storage cost grows faster than the application's active data footprint.

- **0:09-0:12** / Reveal step 2: Compare authoritative inventories
  Narration: Identify unreferenced objects and incomplete multipart uploads.

- **0:12-0:16** / Reveal step 3: Protect valid content
  Narration: Exclude live and retained business records before any cleanup.

- **0:16-0:20** / Reveal step 4: Repair the deletion workflow
  Narration: Persist cleanup requests and make repeated deletion safe.

- **0:20-0:24** / Reveal step 5: Recover interrupted jobs
  Narration: Replay outstanding cleanup with bounded rate and audit records.

- **0:24-0:28** / Reveal step 6: Verify the new lifecycle
  Narration: Test upload failure, publication failure, deletion retries, and retention exceptions.

- **0:28-0:36** / Takeaway and discussion prompt
  Narration: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract. What evidence would disprove your first diagnosis?

## References

- [Amazon S3 object lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
