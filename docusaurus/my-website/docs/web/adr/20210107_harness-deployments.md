---
id: "harness-deployments"
hide_title: true
---

# Harness Deployments

## Status

accepted

## Context

The mtribes platform is made up of many components. All components are deployed via
[Harness](https://harness.io), except the webapp.

In order to bring deployments of the webapp in-line we'll move their management from Bitbucket to
Harness.

One aspect of the webapp deployment is uploading static resources to an AWS S3 bucket. From there
they can be served via CloudFront to the live site. This offers fast cheap asset delivery worldwide.

The process of static file upload requires a script to be run when deploying an environment.
Currently this is executed by Bitbucket Pipelines, inside a docker container.

## Decision

### Bitbucket

Define a new docker image which will be used for deployments. This image will contain the deployment
scripts needed to deploy the webapp along with the version to deploy.

Each time we release the webapp from Bitbucket we'll cut a new version of this image, tied to the
webapp version.

### Harness

Create a "service" in Harness (not really a service in our case but that's what they call them),
which defines a [Kubernets Job](https://kubernetes.io/docs/concepts/workloads/controllers/job)
template to run our deployment docker container.

Create a Harness Pipeline to publish and promote this job through our environments. When run in an
environment the job will spin up the deployment container to execute the deployment script,
targeting its baked-in webapp version. Once the job has run it will be cleaned up.

For each environment we'll define environment variables in Harness, these will be fed to the job
when run and consumed by the deployment script.

Create a Harness Trigger to start this pipeline when a new docker image is cut.

## Consequences

Moving to Harness will help unify how we manage deployments in mtribes, and open up features of a
more purpose built deployment tool.

The extra steps of publishing a docker image and waiting for Harness to deploy will add a little
extra time to initial deployments.
