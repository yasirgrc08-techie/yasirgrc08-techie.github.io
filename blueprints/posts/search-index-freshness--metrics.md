# Search Is a Read Model / Metrics That Matter

By Yasir Sharfi

## The Idea

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

## Visual Blueprint

1. **Indexing delay**: Measure source-change-to-searchable latency by update and deletion type.
2. **Interpret / Indexing delay**: A healthy query latency says nothing about how current the returned data is.
3. **Retrieval quality**: Evaluate relevance using a versioned set of queries and labels.
4. **Interpret / Retrieval quality**: One aggregate score can hide failures for rare but important query classes.
5. **Permission mismatches**: Test whether denied documents, snippets, or counts appear in controlled authorization cases.
6. **Interpret / Permission mismatches**: Security checks cannot be replaced by an assumption that the index is already filtered correctly.

## Caption

A search result can be fast, relevant, and still wrong for the current user.

Treat a search index as a derived view with explicit freshness and authorization requirements. The source of truth remains independently recoverable.

1. Indexing delay
Measure source-change-to-searchable latency by update and deletion type.

2. Interpret / Indexing delay
A healthy query latency says nothing about how current the returned data is.

3. Retrieval quality
Evaluate relevance using a versioned set of queries and labels.

4. Interpret / Retrieval quality
One aggregate score can hide failures for rare but important query classes.

5. Permission mismatches
Test whether denied documents, snippets, or counts appear in controlled authorization cases.

6. Interpret / Permission mismatches
Security checks cannot be replaced by an assumption that the index is already filtered correctly.

The takeaway: Search quality includes relevance, freshness, and permission correctness, not just response time.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #search #indexing #consistency

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A search result can be fast, relevant, and still wrong for the current user.

- **0:06-0:10** / Reveal step 1: Indexing delay
  Narration: Measure source-change-to-searchable latency by update and deletion type.

- **0:10-0:16** / Reveal step 2: Interpret / Indexing delay
  Narration: A healthy query latency says nothing about how current the returned data is.

- **0:16-0:20** / Reveal step 3: Retrieval quality
  Narration: Evaluate relevance using a versioned set of queries and labels.

- **0:20-0:25** / Reveal step 4: Interpret / Retrieval quality
  Narration: One aggregate score can hide failures for rare but important query classes.

- **0:25-0:30** / Reveal step 5: Permission mismatches
  Narration: Test whether denied documents, snippets, or counts appear in controlled authorization cases.

- **0:30-0:36** / Reveal step 6: Interpret / Permission mismatches
  Narration: Security checks cannot be replaced by an assumption that the index is already filtered correctly.

- **0:36-0:44** / Takeaway and discussion prompt
  Narration: Search quality includes relevance, freshness, and permission correctness, not just response time. Which metric could look healthy while users suffer?

## References

- [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
