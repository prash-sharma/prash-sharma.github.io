---
id: "mutation-concurrency"
hide_title: true
---

# Mutation Concurrency

## Status

accepted

## Context

In most cases when we perform write actions on entities in our system, our services require that we
provide the latest row version of those entities. This is to prevent multiple different users from
unknowingly overwriting each others changes. Whenever an action completes successfully we will
typically be returned the new row version.

To ensure we are always sending the latest row version with every action, we need to wait for any
pending actions to complete first to obtain the new row version.

To make matters worse, we will typically be performing save actions on blur of input fields. This
means that users could potentially trigger multiple save actions in quick succession.

A basic approach we've previously used do deal with this problem is to prevent the user from making
any further changes while a save action is in progress. This isn't ideal and we should strive to
make our UI feel more responsive to deliver a better user experience.

## Decision

We will implement an action queuing system which will allow us to easily append mutation actions to
a queue. This will allow us to wait for the resulting row version to be returned so that it can be
fed into the next mutation.

Mutations on the same entity might be triggered from within different components spread throughout
the application in different locations on the rendered page. Because of this we'll implement the
queueing as a global singleton utility which can be accessible from anywhere.

Rather than executing a mutation immediately whenever a user action is performed, a callback
function should be provided to the queueing utility. Once that callback has reached the front of the
queue it will be executed, and in turn execute the mutation and return the promise from the
mutation. The queueing utility will wait until the promise completes before executing the next
callback on the queue.

We should store all user input changes in local state so that the result of user actions will be
reflected immediately in the UI. However in the event any actions fail we'll need to revert local
state changes to return to the true state in the database.

### Optimizations

- We should place actions into different queues depending on which entities they affect. Mutations
  which don't affect each other should be able to be executed concurrently.

- Actions on the same entity can be further categorized by type. Multiple actions of the same type
  on the same entity can be aggregated, or discarded depending on different conditions. For example
  if multiple actions to update the name of the same entity are triggered in quick succession, we
  only need to process the last action added to the queue.

- We may be able to integrate the queueing functionality within the Apollo link chain. This would
  allow us to apply optimistic cache updates before queueing occurs.

- We may be able to send all queued actions in the same batched network request to Orca. This will
  require adding support for propagating row versions to each subsequent mutation as they are
  processed within Orca.

## Consequences

Implementing a shared global utility for queueing should make it easier for developers to manage and
reason about concurrency issues when writing mutations. This should enable us to maintain a
responsive user experience while asynchronously saving all of the users changes in the background.
