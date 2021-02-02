---
id: "serverless-vs-standalone-server"
hide_title: true
---

# Serverless vs Standalone Server

## Status

accepted

## Context

Deploying Orca using a serverless approach like AWS Lambda seems like a good fit for many reasons:

* All incoming queries can be handled by a single endpoint which makes it ideal to be handled as a
  Lambda function.
* Quick and easy to set up, deploy, and maintain.
* Potentially lower costs as we're only charged for actual CPU time during execution and no idle
  running costs while not in use.

However, given our choice of technologies (Apollo + Node.js) a serverless approach may not scale
well in production under real world conditions. Node.js is
[not as performant](https://hackernoon.com/aws-lambda-go-vs-node-js-performance-benchmark-1c8898341982)
as other technologies like GO, and unfortunately GO language support for GraphQL server frameworks
is currently lacking, though it's worth keeping an eye on developments.

This reduced performance results in longer
[cold start times](https://medium.com/@lakshmanLD/resolving-cold-start%EF%B8%8F-in-aws-lambda-804512ca9b61),
where an inactive Lambda takes some time to spin up and initialize the GraphQL server before being
able to handle the incoming request. The general consensus for dealing with cold start times seems
to be keeping the Lamda warm by pinging it periodically, though this would defeat the purpose and
cost benefit of using a Lambda function.

Making matters worse Apollo server is optimised to be run as a standalone server, as there is a fair
amount of initial processing at startup to instantiate the schema by parsing the type definitions
and mapping to resolvers.

## Decision

As we need to focus on rapidly delivering new features, Apollo + Node.js are still the best choice
for our team. Apollo is one of the most actively developed and preferred frameworks for GraphQL, and
Node.js is a closer fit to the knowledge and skills of the team.

While Orca is under development Lambda is still a good fit due to the ease of use and low cost as we
won't be dealing with many requests until we move to production. However we will need to keep track
of reduction in performance as we grow our schema.

We'll leverage [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) which
will enable us to write Orca as a standard express server while also being able to deploy as a
Lambda. This should make it easier for us to switch to using a standalone server in the future
when/if it makes sense to do so.

## Consequences

Using Apollo + Node.js + Lambda allows us to develop Orca more rapidly, and focus on implementation
without as much concern for infrastructure and low level details.

Being flexible in our approach by using `aws-serverless-express` will mean that we can adapt quickly
if we need to deploy Orca as a standalone server in the future.
