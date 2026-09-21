# File Uploads Without API Overload / Decision Guide

By Yasir Sharfi

## The Idea

Large uploads can exhaust your API before ordinary requests become expensive.

Separate upload authorization, byte transfer, and file processing. A stored object is not automatically a trusted or published document.

## Visual Blueprint

1. **Proxy through the API**: Use a streamed API upload when the service must enforce content policy during transfer.
2. **Trade-off / Proxy through the API**: The API carries bandwidth and connection pressure; enforce streaming and strict size limits.
3. **Direct object upload**: Use a narrowly scoped storage upload URL when byte transfer can bypass API workers.
4. **Trade-off / Direct object upload**: The URL is a temporary capability; scope it carefully and never treat upload completion as publication.
5. **Multipart upload**: Use multipart transfer for large objects when resumability and bounded chunks are needed.
6. **Trade-off / Multipart upload**: Abandoned parts, completion integrity, and cleanup must be accounted for explicitly.

## Caption

Large uploads can exhaust your API before ordinary requests become expensive.

Separate upload authorization, byte transfer, and file processing. A stored object is not automatically a trusted or published document.

1. Proxy through the API
Use a streamed API upload when the service must enforce content policy during transfer.

2. Trade-off / Proxy through the API
The API carries bandwidth and connection pressure; enforce streaming and strict size limits.

3. Direct object upload
Use a narrowly scoped storage upload URL when byte transfer can bypass API workers.

4. Trade-off / Direct object upload
The URL is a temporary capability; scope it carefully and never treat upload completion as publication.

5. Multipart upload
Use multipart transfer for large objects when resumability and bounded chunks are needed.

6. Trade-off / Multipart upload
Abandoned parts, completion integrity, and cleanup must be accounted for explicitly.

The takeaway: Uploading bytes, validating content, and publishing a file are different trust boundaries.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #uploads #objectstorage

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Large uploads can exhaust your API before ordinary requests become expensive.

- **0:05-0:11** / Reveal step 1: Proxy through the API
  Narration: Use a streamed API upload when the service must enforce content policy during transfer.

- **0:11-0:17** / Reveal step 2: Trade-off / Proxy through the API
  Narration: The API carries bandwidth and connection pressure; enforce streaming and strict size limits.

- **0:17-0:23** / Reveal step 3: Direct object upload
  Narration: Use a narrowly scoped storage upload URL when byte transfer can bypass API workers.

- **0:23-0:30** / Reveal step 4: Trade-off / Direct object upload
  Narration: The URL is a temporary capability; scope it carefully and never treat upload completion as publication.

- **0:30-0:36** / Reveal step 5: Multipart upload
  Narration: Use multipart transfer for large objects when resumability and bounded chunks are needed.

- **0:36-0:41** / Reveal step 6: Trade-off / Multipart upload
  Narration: Abandoned parts, completion integrity, and cleanup must be accounted for explicitly.

- **0:41-0:49** / Takeaway and discussion prompt
  Narration: Uploading bytes, validating content, and publishing a file are different trust boundaries. Which constraint would change your choice?

## References

- [Amazon S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
