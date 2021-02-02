---
id: "polyfills"
hide_title: true
---

# Polyfills

## Status

accepted

## Context

The browser landscape is moving quickly with new versions and JavaScript features being released
across vendors regularly.

With our desire to use modern JavaScript we need to ensure features run as expected across browsers
which don't yet support these. For this reason we need to introduce `polyfills` which emulate the
required features when they're not supported natively.

There's a couple of options when adding polyfills to a web app.

1.  Bundle the full set with the application at build time.
2.  Runtime detect the browser during startup and deliver any polyfills needed.

`Option 1` has the advantage of not requiring a critical render path network request, but at the
cost of extra weight of JavaScript that may often not be needed.

`Option 2` has the advantage of only delivering the polyfills needed but at the cost of a critical
render path network request. This generally only happens on first visit as the response is cached
for a long period.

If using a third party service like https://polyfill.io `option 2` also introduces a dependency on
an external party which is a risk.

## Decision

Many of the generic polyfill bundles to add to an application are large so can have a significant
impact on application weight if not pruned carefully.

Given this effort is not a high priority right now and that we'll be targeting mostly modern
browsers we've decided on `option 2`. Specifically we'll be using https://polyfill.io to inject the
necessary polyfills before our application starts up.

## Consequences

Greater compatibility of our web app across the browser landscape.
