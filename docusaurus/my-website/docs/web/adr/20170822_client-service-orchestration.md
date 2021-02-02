---
id: "client-service-orchestration"
hide_title: true
---

# Client Service Orchestration

## Status

accepted

## Context

The decision to move towards a distributed microservice architecture results in increased complexity
for front end applications, as they must now communicate with a scattered set of services.

Ideally client applications would be served by a single API, however, under a microservice
architecture client applications may need to orchestrate many requests to various services to fetch
their necessary data. This will come at a cost to performance, where multiple round trips can lead
to increased load times along with increased likelihood of fetching unnecessary data.

Another important consideration is enabling concurrent streams of work between different autonomous
teams. To achieve this we should strive to mimimise complexity in communicating with our backend
systems, and lower the barrier to entry in understanding how to integrate with the system.

## Decision

To tackle these issues we will create an API gateway layer, which will leverage
[GraphQL](http://graphql.org/) to facilitate communication between the client and various
microservices.

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing
> data. GraphQL provides a complete and understandable description of the data in your API, gives
> clients the power to ask for exactly what they need and nothing more, makes it easier to evolve
> APIs over time, and enables powerful developer tools. http://graphql.org/

The GraphQL layer will be kept as thin as possible, containing minimal business logic. It simply
exposes a schema which defines the different queries and mutations that can be performed on data
within the system.

The entire system will be described in terms of objects, their fields and the relationships between
them. Or in other words, modelled as a graph using GraphQLs typing system. This graph can be
explored via a visual interface such as [GraphiQL](https://github.com/graphql/graphiql).

Any queries or mutations can be made by clients via a single endpoint exposed by the GraphQL layer.
Under the hood queries will be routed through resolvers defined in the schema. Resolvers will
determine which calls will need to be made to the microservices to fetch or mutate the data.

Any changes to the microservice backend will need to be reflected in our GraphQL layer.

GraphQL has a growing community and great support, with an increasing number of excellent developer
tools to simplify development. Specifically we may choose to use client libraries like
[Relay](https://facebook.github.io/relay/) or [Apollo](http://dev.apollodata.com/) which make it
easy to build UI components that fetch data via GraphQL.

## Consequences

Having a single GraphQL API gateway will serve to conceal the backend complexities from the client,
and decouple the client from the backend.

GraphQL and Relay/Apollo will enable components to fetch only the data they require, and for
multiple requests to be aggregated into a single query. This should reduce both the amount of data
being transmitted and number of round trips to the backend.

Tools like GraphiQL will enable us to provide developers with a single place to browse our API, and
to discover all of the objects, fields and their relationships within our system. It will also give
developers a sandbox to test all of the various queries and mutations that are possible. Ultimately
this should aid in achieving greater autonomy and reduced barrier to entry for newcomers.
