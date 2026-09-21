# Capacity Estimates and Data Models That Matter / Practice Decisions

By Yasir Sharfi

## The Idea

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

## Visual Blueprint

1. **Name every unit**: Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.
2. **Watch for**: Using average traffic as if bursts and hotspots do not exist.
3. **Peak and fan-out change the load**: A user request can trigger multiple database reads or messages. A global average hides regional peaks and hot entities.
4. **Watch for**: Ignoring index, replication, and retention overhead.
5. **Access patterns shape data**: Identify the entity key, query predicates, ordering, and transaction boundary. A storage choice should support those operations and retention needs.
6. **Watch for**: Choosing partition keys before listing important queries.

## Caption

Can I choose a database from data volume alone?

Back-of-the-envelope estimates are decision tools, not predictions of exact production behavior. Translate user activity into requests, bytes, concurrency, and storage, then connect the dominant costs to data modeling. Keep average, peak, logical data, replicas, and overhead separate.

1. Name every unit
Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.

2. Watch for
Using average traffic as if bursts and hotspots do not exist.

3. Peak and fan-out change the load
A user request can trigger multiple database reads or messages. A global average hides regional peaks and hot entities.

4. Watch for
Ignoring index, replication, and retention overhead.

5. Access patterns shape data
Identify the entity key, query predicates, ordering, and transaction boundary. A storage choice should support those operations and retention needs.

6. Watch for
Choosing partition keys before listing important queries.

The takeaway: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #capacity #estimation

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Can I choose a database from data volume alone?

- **0:04-0:12** / Reveal step 1: Name every unit
  Narration: Requests/day divided by 86,400 gives average requests/second. Bits and bytes differ by eight; GB and GiB use different bases.

- **0:12-0:17** / Reveal step 2: Watch for
  Narration: Using average traffic as if bursts and hotspots do not exist.

- **0:17-0:25** / Reveal step 3: Peak and fan-out change the load
  Narration: A user request can trigger multiple database reads or messages. A global average hides regional peaks and hot entities.

- **0:25-0:28** / Reveal step 4: Watch for
  Narration: Ignoring index, replication, and retention overhead.

- **0:28-0:36** / Reveal step 5: Access patterns shape data
  Narration: Identify the entity key, query predicates, ordering, and transaction boundary. A storage choice should support those operations and retention needs.

- **0:36-0:39** / Reveal step 6: Watch for
  Narration: Choosing partition keys before listing important queries.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: Use a small worksheet with assumptions, formula, units, and design consequence for each estimate. Which constraint would change your choice?

## References

- [Capacity Estimates and Data Models That Matter / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=capacity-estimation-data-modeling)
- [Azure data partitioning guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/data-partitioning)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Google SRE workbook](https://sre.google/workbook/table-of-contents/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
