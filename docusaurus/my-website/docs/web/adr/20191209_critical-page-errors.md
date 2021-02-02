---
id: "critical-page-errors"
hide_title: true
---

# Critical page errors

## Status

accepted

## Context

Critical page errors are any errors where the entire page cannot be displayed due to one of the
following reasons:

- An unknown service error when loading the primary content of the page i.e. Orca response status
  5xx.
- There is no route to handle the current path i.e. 404 page.
- Orca responds with error of status 404.
- When the query fails to load due to slow network timeout or gone offline
- A runtime error has occurred in the web app.

In the UI we've had inconsistent and varied treatment of these different types of errors, and on
many pages we lazily render an unstyled string message to the screen when there is an unknown
service error or network error, instead of a more useful and pretty error message.

## Decision

In the event of a critical page error we should display a message across the whole page and
optionally offer links to return to the previous page or to refresh to try again.

Example designs:

- https://app.zeplin.io/project/5a8ce5ee8343db938ad58f83/screen/5b4564838ffa43ab267d9b83
- https://app.zeplin.io/project/5a8ce5ee8343db938ad58f83/screen/5b9088047fc0fc66c2c6a798
- https://app.zeplin.io/project/5a8ce5ee8343db938ad58f83/screen/5b456482d997ad990e41be14

### Query error view

The proposed solution to ease development is to create a global shared component `QueryErrorView`.
Given a query error response from Orca this component will render the appropriate page wide error
message. The error response from Orca contains all the information necessary to determine if the
error was due to network, missing content or unknown.

The QueryErrorView should only be rendered when critical data required for displaying the page has
failed to load from Orca. Importantly we should NOT render the QueryErrorView if we still have some
cached data to display, and if having the latest copy of the data is not deemed critical.

Some examples where we should render the query error view:

- When the segment has failed to load on the segment details page (and no cached copy available)
- When the segment categories have failed to load.

Some examples where we should NOT render the query error view:

- When evaluations fail to load for segments (should show inline data missing errors instead).
- When stats and metrics fail to load in the scenario activity tab.

### Runtime errors

Whenever a runtime error occurs it should be captured by our ErrorBoundary component, covered in
detail in the [ADR](./20180208_error-boundaries). We'll make use of the same underlying `ErrorView`
to render these errors so that the UI remains consistent.

### Critical service downtime

Whenever a critical query fails to load we redirect the user to the service down page (the
`/back-soon` path at the time of writing). If we recieve a 5xx response for queries that are
considered critical i.e. org and space queries, then it's highly likely we're experiencing a service
wide outage and so we redirect the user and display a specific message for this scenario. Again
using the same underlying component to render these types of errors for consistency.

## Consequences

By having a single `QueryErrorView` component it should be easier for developers to implement
consistent error handling for pages.
