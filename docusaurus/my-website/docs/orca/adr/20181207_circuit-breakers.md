---
id: "circuit-breakers"
hide_title: true
---

# Circuit Breakers

## Status

accepted

## Context

At any time a service in our system may fail or become unresponsive with increased latency. When
this happens it can put strain on Orca by consuming extra resources waiting for a response, and can
also bog down the network within the cluster. This can potentially lead to cascading failures in the
system.

Orca is one of the most critical services in our system, as it's the primary point of entry for the
web front end, and communicates directly with many different services. For this reason it's
important for measures to be put in place in Orca to alleviate stresses when any services are in
poor health.

## Decision

The [circuit breaker pattern](https://martinfowler.com/bliki/CircuitBreaker.html) is a common
approach to manage failures within microservices. In Orca we'll proxy all calls to a particular
service through a circuit breaker wrapper/utility.

### States

The circuit breaker can be in one of three states.

#### Closed

When closed, requests are allowed to flow through uninterrupted. The circuit breaker passively
mediates all requests and keeps track of failures. Once the service consecutively errors up to a set
threshold the circuit breaker will enter the open state.

#### Open

When the circuit breaker is in the open state all requests are blocked and will immediately return a
failed response. The circuit breaker remains in the open state for a specified cool down period,
after which it will be in the half open state.

#### Half open

In the half open state a single request will be allowed to proceed to verify the availability of the
service. While waiting for a response to this request any other concurrent requests will still be
blocked. If the request fails then we return to the open state, or if it succeeds then we return to
the closed state.

### Endpoint vs service vs resolver

As a first pass we're only implementing circuit breakers across all endpoints for a particular
service. However there are some other options to consider.

We could implement circuit breakers at the individual endpoint level. There is the possibility that
a particular endpoint in a service is consistently failing despite the rest of the service
functioning normally.

Another consideration would be to implement circuit breakers at the resolver level. In some cases
this might be a good approach. For example a mutation which calls three different services, where
only the third service that gets called is down. This would avoid the first two services being
called unnecessarily, and prevent partial completion of critical operations which require multiple
service calls such as creating an account.

Circuit breakers around resolvers should only be implemented on a case by case basis, as this
wouldn't be desirable in all scenarios. For example queries which make multiple service calls which
would still be able to function and return partial data if one of the services is down. This would
be preferable to getting no response at all.

### When to flip the switch?

We've decided on a strategy which is simple to implement, i.e. counting consecutive failures until
the count reaches a threshold. However we may choose to explore some alternative strategies if this
is too sensitive and triggers the circuit to open too easily, or if it's not sensitive enough and
doesn't help to prevent system wide failures. There are a number of alternative approaches we could
explore, for example tracking the percentage of failures in the last N requests or over a fixed time
period.

### Logging and alerts

We should log and potentially raise alerts whenever a circuit breaker switches between open/closed
for a particular service. This will let us quickly discover when services go down and also enable us
to determine whether our chosen strategy has tolerances too low or high for tripping the circuit.

## Consequences

Implementing circuit breakers in Orca should help to keep our system more stable and provide a
better overall experience for our end users.

Logging and alerting when circuit breakers trip will help us catch system failures early.

We will need to monitor the effectiveness of our circuit breaker implementation, and if required we
should tweak the tolerances or adjust the strategy.
