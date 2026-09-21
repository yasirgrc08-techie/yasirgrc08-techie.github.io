# Search Is a Read Model / Decision Guide

By Yasir Sharfi

## The Idea

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

## Visual Blueprint

1. **Database search**: Use database-native search when workload and relevance needs fit its operational envelope.
2. **Trade-off / Database search**: Complex ranking and high search volume may compete with transactional workloads.
3. **Dedicated search index**: Use a search engine when indexing and relevance requirements justify a separate read model.
4. **Trade-off / Dedicated search index**: You now own ingestion lag, reindexing, deletion propagation, and source/index reconciliation.
5. **Hybrid retrieval**: Combine lexical and semantic signals when evaluation demonstrates a useful improvement.
6. **Trade-off / Hybrid retrieval**: Additional ranking and embedding dependencies increase latency, cost, and debugging complexity.

## Caption

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

1. Database search
Use database-native search when workload and relevance needs fit its operational envelope.

2. Trade-off / Database search
Complex ranking and high search volume may compete with transactional workloads.

3. Dedicated search index
Use a search engine when indexing and relevance requirements justify a separate read model.

4. Trade-off / Dedicated search index
You now own ingestion lag, reindexing, deletion propagation, and source/index reconciliation.

5. Hybrid retrieval
Combine lexical and semantic signals when evaluation demonstrates a useful improvement.

6. Trade-off / Hybrid retrieval
Additional ranking and embedding dependencies increase latency, cost, and debugging complexity.

The takeaway: Search quality includes relevance, freshness, and permission correctness, not just response time.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #search #indexing #consistency

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A search result can be fast, relevant, and still wrong for the current user.

- **0:06-0:11** / Reveal step 1: Database search
  Narration: Use database-native search when workload and relevance needs fit its operational envelope.

- **0:11-0:16** / Reveal step 2: Trade-off / Database search
  Narration: Complex ranking and high search volume may compete with transactional workloads.

- **0:16-0:22** / Reveal step 3: Dedicated search index
  Narration: Use a search engine when indexing and relevance requirements justify a separate read model.

- **0:22-0:27** / Reveal step 4: Trade-off / Dedicated search index
  Narration: You now own ingestion lag, reindexing, deletion propagation, and source/index reconciliation.

- **0:27-0:32** / Reveal step 5: Hybrid retrieval
  Narration: Combine lexical and semantic signals when evaluation demonstrates a useful improvement.

- **0:32-0:37** / Reveal step 6: Trade-off / Hybrid retrieval
  Narration: Additional ranking and embedding dependencies increase latency, cost, and debugging complexity.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: Search quality includes relevance, freshness, and permission correctness, not just response time. Which constraint would change your choice?

## References

- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
