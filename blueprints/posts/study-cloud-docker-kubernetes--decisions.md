# Cloud, Docker, and Kubernetes Fundamentals / Practice Decisions

By Yasir Sharfi

## The Idea

Should every project use Kubernetes?

Deployment should make an application reproducible, observable, and recoverable. Containers package execution dependencies; orchestration coordinates instances and desired state. Neither automatically fixes an unsafe application, missing backups, incorrect secrets, or a database schema change incompatible with older versions.

## Visual Blueprint

1. **A container is not a complete virtual machine**: Containers share a host kernel under isolation and resource controls.
2. **Watch for**: Storing important data only in an ephemeral container filesystem.
3. **Desired state is not application correctness**: An orchestrator can restart a failed process, but a repeatedly failing application remains broken.
4. **Watch for**: Using liveness probes that restart every instance during a dependency outage.
5. **Deployment includes data and compatibility**: Rolling versions may run simultaneously. APIs, schema changes, and jobs must tolerate that overlap.
6. **Watch for**: Rolling back code after an incompatible destructive schema migration.

## Caption

Should every project use Kubernetes?

Deployment should make an application reproducible, observable, and recoverable. Containers package execution dependencies; orchestration coordinates instances and desired state. Neither automatically fixes an unsafe application, missing backups, incorrect secrets, or a database schema change incompatible with older versions.

1. A container is not a complete virtual machine
Containers share a host kernel under isolation and resource controls.

2. Watch for
Storing important data only in an ephemeral container filesystem.

3. Desired state is not application correctness
An orchestrator can restart a failed process, but a repeatedly failing application remains broken.

4. Watch for
Using liveness probes that restart every instance during a dependency outage.

5. Deployment includes data and compatibility
Rolling versions may run simultaneously. APIs, schema changes, and jobs must tolerate that overlap.

6. Watch for
Rolling back code after an incompatible destructive schema migration.

The takeaway: Start locally with a small service and container runtime. Introduce a cluster only after the deployment problem justifies it.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #cloud #docker

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:03** / Title and opening question
  Narration: Should every project use Kubernetes?

- **0:03-0:07** / Reveal step 1: A container is not a complete virtual machine
  Narration: Containers share a host kernel under isolation and resource controls.

- **0:07-0:11** / Reveal step 2: Watch for
  Narration: Storing important data only in an ephemeral container filesystem.

- **0:11-0:17** / Reveal step 3: Desired state is not application correctness
  Narration: An orchestrator can restart a failed process, but a repeatedly failing application remains broken.

- **0:17-0:22** / Reveal step 4: Watch for
  Narration: Using liveness probes that restart every instance during a dependency outage.

- **0:22-0:28** / Reveal step 5: Deployment includes data and compatibility
  Narration: Rolling versions may run simultaneously. APIs, schema changes, and jobs must tolerate that overlap.

- **0:28-0:32** / Reveal step 6: Watch for
  Narration: Rolling back code after an incompatible destructive schema migration.

- **0:32-0:42** / Takeaway and discussion prompt
  Narration: Start locally with a small service and container runtime. Introduce a cluster only after the deployment problem justifies it. Which constraint would change your choice?

## References

- [Cloud, Docker, and Kubernetes Fundamentals / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=cloud-docker-kubernetes)
- [Docker getting started](https://docs.docker.com/get-started/)
- [Kubernetes concepts](https://kubernetes.io/docs/concepts/)
- [Kubernetes probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
