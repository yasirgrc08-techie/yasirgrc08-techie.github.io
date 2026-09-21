# File Storage, Sync, and Snapshot Design / Practice Decisions

By Yasir Sharfi

## The Idea

Is a snapshot always application-consistent?

Separate durable data bytes from metadata that names and authorizes them. Large-file systems need partial-upload handling, immutable versions, conflict rules, and garbage collection that never removes live data. A fast happy-path upload is not enough to establish durability or safe multi-device behavior.

## Visual Blueprint

1. **Metadata commits make data visible**: Upload chunks or parts first, validate them, and publish a complete manifest through an authoritative metadata operation.
2. **Watch for**: Publishing metadata before required data is durable and verified.
3. **Identity is not a path**: A stable file ID survives rename and move operations, while a path is mutable metadata. Version numbers or conditional writes can detect concurrent edits.
4. **Watch for**: Using file paths as the only stable identity.
5. **Reclamation needs all references**: A chunk can be referenced by the current file, history, snapshots, or restored copies. Deletion is safe only when no supported live reference remains.
6. **Watch for**: Collecting data still referenced by history, snapshots, or restores.

## Caption

Is a snapshot always application-consistent?

Separate durable data bytes from metadata that names and authorizes them. Large-file systems need partial-upload handling, immutable versions, conflict rules, and garbage collection that never removes live data. A fast happy-path upload is not enough to establish durability or safe multi-device behavior.

1. Metadata commits make data visible
Upload chunks or parts first, validate them, and publish a complete manifest through an authoritative metadata operation.

2. Watch for
Publishing metadata before required data is durable and verified.

3. Identity is not a path
A stable file ID survives rename and move operations, while a path is mutable metadata. Version numbers or conditional writes can detect concurrent edits.

4. Watch for
Using file paths as the only stable identity.

5. Reclamation needs all references
A chunk can be referenced by the current file, history, snapshots, or restored copies. Deletion is safe only when no supported live reference remains.

6. Watch for
Collecting data still referenced by history, snapshots, or restores.

The takeaway: Use small synthetic files and a local object directory plus a metadata database. Simulate interrupted uploads and conflicting versions.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #storage #file

## Reel Storyboard

Suggested duration: about 52 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Is a snapshot always application-consistent?

- **0:03-0:10** / Reveal step 1: Metadata commits make data visible
  Narration: Upload chunks or parts first, validate them, and publish a complete manifest through an authoritative metadata operation.

- **0:10-0:14** / Reveal step 2: Watch for
  Narration: Publishing metadata before required data is durable and verified.

- **0:14-0:24** / Reveal step 3: Identity is not a path
  Narration: A stable file ID survives rename and move operations, while a path is mutable metadata. Version numbers or conditional writes can detect concurrent edits.

- **0:24-0:28** / Reveal step 4: Watch for
  Narration: Using file paths as the only stable identity.

- **0:28-0:38** / Reveal step 5: Reclamation needs all references
  Narration: A chunk can be referenced by the current file, history, snapshots, or restored copies. Deletion is safe only when no supported live reference remains.

- **0:38-0:42** / Reveal step 6: Watch for
  Narration: Collecting data still referenced by history, snapshots, or restores.

- **0:42-0:52** / Takeaway and discussion prompt
  Narration: Use small synthetic files and a local object directory plus a metadata database. Simulate interrupted uploads and conflicting versions. Which constraint would change your choice?

## References

- [File Storage, Sync, and Snapshot Design / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=storage-file-sync-design)
- [Azure Blob Storage introduction](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [Azure event sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [OSTEP persistence chapters](https://pages.cs.wisc.edu/~remzi/OSTEP/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
