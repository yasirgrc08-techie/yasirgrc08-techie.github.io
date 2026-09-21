# Search Is a Read Model / Failure and Recovery

By Yasir Sharfi

## The Idea

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

## Visual Blueprint

1. **Find stale or unauthorized hits**: Search returns removed content or data outside the user's current permissions.
2. **Check source versions**: Compare document identity, version, and deletion state with the authoritative store.
3. **Contain exposure**: Disable affected results or enforce authoritative permission checks before returning content.
4. **Inspect ingestion lag**: Find dropped updates, failed transforms, or consumers behind their source stream.
5. **Repair the index**: Reprocess affected identities or rebuild a validated index version.
6. **Test permission changes**: Verify revocation and deletion behavior, not only the happy-path relevance score.

## Caption

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

1. Find stale or unauthorized hits
Search returns removed content or data outside the user's current permissions.

2. Check source versions
Compare document identity, version, and deletion state with the authoritative store.

3. Contain exposure
Disable affected results or enforce authoritative permission checks before returning content.

4. Inspect ingestion lag
Find dropped updates, failed transforms, or consumers behind their source stream.

5. Repair the index
Reprocess affected identities or rebuild a validated index version.

6. Test permission changes
Verify revocation and deletion behavior, not only the happy-path relevance score.

The takeaway: Search quality includes relevance, freshness, and permission correctness, not just response time.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #search #indexing #consistency

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A search result can be fast, relevant, and still wrong for the current user.

- **0:06-0:11** / Reveal step 1: Find stale or unauthorized hits
  Narration: Search returns removed content or data outside the user's current permissions.

- **0:11-0:16** / Reveal step 2: Check source versions
  Narration: Compare document identity, version, and deletion state with the authoritative store.

- **0:16-0:21** / Reveal step 3: Contain exposure
  Narration: Disable affected results or enforce authoritative permission checks before returning content.

- **0:21-0:26** / Reveal step 4: Inspect ingestion lag
  Narration: Find dropped updates, failed transforms, or consumers behind their source stream.

- **0:26-0:30** / Reveal step 5: Repair the index
  Narration: Reprocess affected identities or rebuild a validated index version.

- **0:30-0:35** / Reveal step 6: Test permission changes
  Narration: Verify revocation and deletion behavior, not only the happy-path relevance score.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Search quality includes relevance, freshness, and permission correctness, not just response time. What evidence would disprove your first diagnosis?

## References

- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
