# Search Is a Read Model / Build and Validate

By Yasir Sharfi

## The Idea

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

## Visual Blueprint

1. **Create a tiny corpus**: Use synthetic documents with versions, tenants, and explicit permissions.
2. **Index deterministic fields**: Record the transform and tokenization settings used by the index.
3. **Change and delete records**: Measure how updates propagate into results and snippets.
4. **Revoke access**: Verify that a previously visible document stops appearing for the affected user.
5. **Build a second index**: Reindex from source and compare correctness and relevance before switching.
6. **Evaluate failures**: Include missing updates, delayed ingestion, and malformed documents in the test report.

## Caption

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

1. Create a tiny corpus
Use synthetic documents with versions, tenants, and explicit permissions.

2. Index deterministic fields
Record the transform and tokenization settings used by the index.

3. Change and delete records
Measure how updates propagate into results and snippets.

4. Revoke access
Verify that a previously visible document stops appearing for the affected user.

5. Build a second index
Reindex from source and compare correctness and relevance before switching.

6. Evaluate failures
Include missing updates, delayed ingestion, and malformed documents in the test report.

The takeaway: Search quality includes relevance, freshness, and permission correctness, not just response time.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #search #indexing #consistency

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A search result can be fast, relevant, and still wrong for the current user.

- **0:06-0:10** / Reveal step 1: Create a tiny corpus
  Narration: Use synthetic documents with versions, tenants, and explicit permissions.

- **0:10-0:14** / Reveal step 2: Index deterministic fields
  Narration: Record the transform and tokenization settings used by the index.

- **0:14-0:18** / Reveal step 3: Change and delete records
  Narration: Measure how updates propagate into results and snippets.

- **0:18-0:23** / Reveal step 4: Revoke access
  Narration: Verify that a previously visible document stops appearing for the affected user.

- **0:23-0:27** / Reveal step 5: Build a second index
  Narration: Reindex from source and compare correctness and relevance before switching.

- **0:27-0:32** / Reveal step 6: Evaluate failures
  Narration: Include missing updates, delayed ingestion, and malformed documents in the test report.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Search quality includes relevance, freshness, and permission correctness, not just response time. How would you reproduce this with synthetic data?

## References

- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
