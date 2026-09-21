# A Backup Is Not a Restore / Decision Guide

By Yasir Sharfi

## The Idea

The first time you restore a backup should not be during the incident.

Define recovery-point and recovery-time objectives for a disposable database example. Include logs, encryption keys, versions, and dependent configuration.

## Visual Blueprint

1. **Logical backup**: Use a logical export when portability and selective restoration fit the dataset and engine.
2. **Trade-off / Logical backup**: Large restores may be slow, and engine-specific objects or permissions need separate treatment.
3. **Physical backup plus logs**: Use physical recovery when engine-supported point-in-time restoration fits the recovery objective.
4. **Trade-off / Physical backup plus logs**: Version compatibility, log continuity, and configuration become part of the recovery contract.
5. **Replica for availability**: Use replication to reduce failover time for some infrastructure failures.
6. **Trade-off / Replica for availability**: Replication can copy accidental deletion or corruption; it is not a substitute for isolated recovery copies.

## Caption

The first time you restore a backup should not be during the incident.

Define recovery-point and recovery-time objectives for a disposable database example. Include logs, encryption keys, versions, and dependent configuration.

1. Logical backup
Use a logical export when portability and selective restoration fit the dataset and engine.

2. Trade-off / Logical backup
Large restores may be slow, and engine-specific objects or permissions need separate treatment.

3. Physical backup plus logs
Use physical recovery when engine-supported point-in-time restoration fits the recovery objective.

4. Trade-off / Physical backup plus logs
Version compatibility, log continuity, and configuration become part of the recovery contract.

5. Replica for availability
Use replication to reduce failover time for some infrastructure failures.

6. Trade-off / Replica for availability
Replication can copy accidental deletion or corruption; it is not a substitute for isolated recovery copies.

The takeaway: Recovery is a tested workflow with measured loss and time, not a file that exists somewhere.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #backup #recovery

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: The first time you restore a backup should not be during the incident.

- **0:06-0:12** / Reveal step 1: Logical backup
  Narration: Use a logical export when portability and selective restoration fit the dataset and engine.

- **0:12-0:18** / Reveal step 2: Trade-off / Logical backup
  Narration: Large restores may be slow, and engine-specific objects or permissions need separate treatment.

- **0:18-0:23** / Reveal step 3: Physical backup plus logs
  Narration: Use physical recovery when engine-supported point-in-time restoration fits the recovery objective.

- **0:23-0:28** / Reveal step 4: Trade-off / Physical backup plus logs
  Narration: Version compatibility, log continuity, and configuration become part of the recovery contract.

- **0:28-0:32** / Reveal step 5: Replica for availability
  Narration: Use replication to reduce failover time for some infrastructure failures.

- **0:32-0:39** / Reveal step 6: Trade-off / Replica for availability
  Narration: Replication can copy accidental deletion or corruption; it is not a substitute for isolated recovery copies.

- **0:39-0:48** / Takeaway and discussion prompt
  Narration: Recovery is a tested workflow with measured loss and time, not a file that exists somewhere. Which constraint would change your choice?

## References

- [PostgreSQL backup and restore](https://www.postgresql.org/docs/current/backup.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
