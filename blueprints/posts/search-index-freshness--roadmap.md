# Search Is a Read Model / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

## Visual Blueprint

1. **Define searchable meaning**: Specify tokenization, fields, filters, ranking goals, and access boundaries.
2. **Build from authoritative data**: Use stable document identities and versioned transforms for indexing.
3. **Track freshness**: Measure delay from source changes to searchable updates and deletions.
4. **Enforce permissions**: Apply authorization before returning results, including snippets and counts where required.
5. **Rebuild safely**: Create a new index version and validate it before switching traffic.
6. **Test relevance and failure**: Use labeled queries, stale documents, deleted records, and permission changes in evaluation.

## Caption

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

1. Define searchable meaning
Specify tokenization, fields, filters, ranking goals, and access boundaries.

2. Build from authoritative data
Use stable document identities and versioned transforms for indexing.

3. Track freshness
Measure delay from source changes to searchable updates and deletions.

4. Enforce permissions
Apply authorization before returning results, including snippets and counts where required.

5. Rebuild safely
Create a new index version and validate it before switching traffic.

6. Test relevance and failure
Use labeled queries, stale documents, deleted records, and permission changes in evaluation.

The takeaway: Search quality includes relevance, freshness, and permission correctness, not just response time.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #search #indexing #consistency

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A search result can be fast, relevant, and still wrong for the current user.

- **0:06-0:10** / Reveal step 1: Define searchable meaning
  Narration: Specify tokenization, fields, filters, ranking goals, and access boundaries.

- **0:10-0:14** / Reveal step 2: Build from authoritative data
  Narration: Use stable document identities and versioned transforms for indexing.

- **0:14-0:18** / Reveal step 3: Track freshness
  Narration: Measure delay from source changes to searchable updates and deletions.

- **0:18-0:23** / Reveal step 4: Enforce permissions
  Narration: Apply authorization before returning results, including snippets and counts where required.

- **0:23-0:28** / Reveal step 5: Rebuild safely
  Narration: Create a new index version and validate it before switching traffic.

- **0:28-0:33** / Reveal step 6: Test relevance and failure
  Narration: Use labeled queries, stale documents, deleted records, and permission changes in evaluation.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: Search quality includes relevance, freshness, and permission correctness, not just response time. Which bottleneck would you measure first?

## References

- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
