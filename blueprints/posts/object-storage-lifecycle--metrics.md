# Object Storage Has a Lifecycle / Metrics That Matter

By Yasir Sharfi

## The Idea

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

## Visual Blueprint

1. **Unreferenced bytes**: Estimate storage not associated with a valid current or retained business record.
2. **Interpret / Unreferenced bytes**: Unreferenced does not automatically mean deletable; retention and recovery policies still apply.
3. **Cleanup age**: Track the oldest pending deletion or abandoned-upload task.
4. **Interpret / Cleanup age**: A functioning lifecycle policy can still miss objects with unexpected prefixes or tags.
5. **Serving errors**: Track missing-object failures for records the application considers published.
6. **Interpret / Serving errors**: Aggressive cleanup can lower cost while silently breaking valid customer content.

## Caption

The database row was deleted, but the expensive file was not.

Use an application that stores file metadata in a database and bytes in object storage. Define ownership, publication, deletion, and retention across both systems.

1. Unreferenced bytes
Estimate storage not associated with a valid current or retained business record.

2. Interpret / Unreferenced bytes
Unreferenced does not automatically mean deletable; retention and recovery policies still apply.

3. Cleanup age
Track the oldest pending deletion or abandoned-upload task.

4. Interpret / Cleanup age
A functioning lifecycle policy can still miss objects with unexpected prefixes or tags.

5. Serving errors
Track missing-object failures for records the application considers published.

6. Interpret / Serving errors
Aggressive cleanup can lower cost while silently breaking valid customer content.

The takeaway: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #storage #objectstorage #lifecycle

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The database row was deleted, but the expensive file was not.

- **0:05-0:10** / Reveal step 1: Unreferenced bytes
  Narration: Estimate storage not associated with a valid current or retained business record.

- **0:10-0:15** / Reveal step 2: Interpret / Unreferenced bytes
  Narration: Unreferenced does not automatically mean deletable; retention and recovery policies still apply.

- **0:15-0:19** / Reveal step 3: Cleanup age
  Narration: Track the oldest pending deletion or abandoned-upload task.

- **0:19-0:25** / Reveal step 4: Interpret / Cleanup age
  Narration: A functioning lifecycle policy can still miss objects with unexpected prefixes or tags.

- **0:25-0:29** / Reveal step 5: Serving errors
  Narration: Track missing-object failures for records the application considers published.

- **0:29-0:34** / Reveal step 6: Interpret / Serving errors
  Narration: Aggressive cleanup can lower cost while silently breaking valid customer content.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: Cheap object storage still needs ownership, reconciliation, and a tested deletion contract. Which metric could look healthy while users suffer?

## References

- [Amazon S3 object lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
