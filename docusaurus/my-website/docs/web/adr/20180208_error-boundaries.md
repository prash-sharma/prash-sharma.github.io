---
id: "error-boundaries"
hide_title: true
---

# Error Boundaries

## Status

accepted

## Context

When an uncaught exception is thrown in the browser it can cause a web app to enter an unknown
state. This can range from unseen, to a broken component to the worst case where the entire app is
unusable and requires a refresh.

It's important that unexpected exceptions are logged so developer are aware and can fix them. It's
also ideal that these exceptions have a reduced blast radius to minimize end user impact.

## Decision

With the modular approach we're taking to build our web app we have the opportunity to place error
boundaries around each module. This will prevent other modules being impacted by an unhandled
exception in a neighbour. This can be seen as a sandbox per module.

React 16 introduces
[Error Boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries),
which should help us implement these sandboxes.

The boundaries will be applied by the shell so no module needs to be aware of these, simplifying
their development.

When a module encounters an unhandled exception the shell should report this error back to the
server including the name and version of the module along with the stacktrace. It should also
include a session identifier where available.

Reported errors should be stored server-side in a queryable location and alarms set up to notify the
appropriate people (e.g. members of squad responsible for the module) if error rates go above a
threshold.

Here's an example of this flow.

    Client > Lambda > CloudWatch > Alarm (at threshold) > Lambda > Slack (via Webhook)

One option this opens up is the automatic rollback of a release tied to a CloudWatch alarm.

Given we'll be moving through a number of stages before entering production (e.g. dev, qa), we could
also automate the prevention of stage progression if errors are detected.

For completeness we looked into some popular third party error logging services, including:

- https://sentry.io
- https://airbrake.io
- http://muscula.com

Given there's a cost to each of these and given we're looking at a relatively low user volume, we're
going to roll this our self. Rolling our own should be low effort and low cost.

When a module throws an uncaught exception the client shell should decide what to do with this
module.

Ideally we'd like to retry loading a module if it throws and then if it throws again show an error
state. This error state could have a button to attempt a module reload.

Unfortunately we're restricted with what we can do here as React error boundaries only allow for a
single error to be caught and then an alternate UI to be displayed. If this alternate UI also throws
then the entire sub-tree is unmounted.

Building our own implementation of UI error boundaries would be time consuming so we'll go with
React's version for now. _This means an unrecoverable error state for each module_.

## Consequences

This strategy should reduce app wide interface-breaking errors, and have a more graceful impact on
affected modules.

This safety blanket protects the end user from disruptive mistakes but also gives development teams
tuned to a continuous delivery schedule some degree of protection.

By closing the loop on error monitoring we can be much more aware of the impact of bad code pushed.
With monitoring setup in our QA environment we should be able to capture many of these before they
reach production too.

There will need to be some consideration from UX/Design around how these generic error states should
appear.

We can use this same error reporting service for other captured client errors and trigger CloudWatch
alarms around those as well. That's beyond the scope of this ADR however.
