# File Storage, Sync, and Snapshot Design / Build and Validate

By Yasir Sharfi

## The Idea

Is a snapshot always application-consistent?

Separate durable data bytes from metadata that names and authorizes them. Large-file systems need partial-upload handling, immutable versions, conflict rules, and garbage collection that never removes live data. A fast happy-path upload is not enough to establish durability or safe multi-device behavior.

## Visual Blueprint

1. **Set up the scenario**: A client uploads a file as three chunks and then sends a completion request. The last chunk upload succeeds, but the completion response is lost.
2. **Experiment 1**: Assign an upload ID and expected file base version. Store verified chunk identities and checksums without marking the file version current.
3. **Experiment 2**: Atomically commit a manifest referencing all three chunks and record the completion operation result.
4. **Experiment 3**: Publish the change-log entry with the metadata transaction or through a reliable outbox. The second device reads a complete manifest and can fetch chunks.
5. **Expected evidence**: The new version is either absent or fully committed from a reader's perspective.
6. **Check the result**: Can a manifest reference a missing or unverified chunk?

## Caption

Is a snapshot always application-consistent?

Separate durable data bytes from metadata that names and authorizes them. Large-file systems need partial-upload handling, immutable versions, conflict rules, and garbage collection that never removes live data. A fast happy-path upload is not enough to establish durability or safe multi-device behavior.

1. Set up the scenario
A client uploads a file as three chunks and then sends a completion request. The last chunk upload succeeds, but the completion response is lost.

2. Experiment 1
Assign an upload ID and expected file base version. Store verified chunk identities and checksums without marking the file version current.

3. Experiment 2
Atomically commit a manifest referencing all three chunks and record the completion operation result.

4. Experiment 3
Publish the change-log entry with the metadata transaction or through a reliable outbox. The second device reads a complete manifest and can fetch chunks.

5. Expected evidence
The new version is either absent or fully committed from a reader's perspective.

6. Check the result
Can a manifest reference a missing or unverified chunk?

The takeaway: Use small synthetic files and a local object directory plus a metadata database. Simulate interrupted uploads and conflicting versions.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #storage #file

## Reel Storyboard

Suggested duration: about 59 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Is a snapshot always application-consistent?

- **0:03-0:13** / Reveal step 1: Set up the scenario
  Narration: A client uploads a file as three chunks and then sends a completion request. The last chunk upload succeeds, but the completion response is lost.

- **0:13-0:22** / Reveal step 2: Experiment 1
  Narration: Assign an upload ID and expected file base version. Store verified chunk identities and checksums without marking the file version current.

- **0:22-0:28** / Reveal step 3: Experiment 2
  Narration: Atomically commit a manifest referencing all three chunks and record the completion operation result.

- **0:28-0:38** / Reveal step 4: Experiment 3
  Narration: Publish the change-log entry with the metadata transaction or through a reliable outbox. The second device reads a complete manifest and can fetch chunks.

- **0:38-0:44** / Reveal step 5: Expected evidence
  Narration: The new version is either absent or fully committed from a reader's perspective.

- **0:44-0:48** / Reveal step 6: Check the result
  Narration: Can a manifest reference a missing or unverified chunk?

- **0:48-0:59** / Takeaway and discussion prompt
  Narration: Use small synthetic files and a local object directory plus a metadata database. Simulate interrupted uploads and conflicting versions. How would you reproduce this with synthetic data?

## References

- [File Storage, Sync, and Snapshot Design / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=storage-file-sync-design)
- [Azure Blob Storage introduction](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [Azure event sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [OSTEP persistence chapters](https://pages.cs.wisc.edu/~remzi/OSTEP/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
