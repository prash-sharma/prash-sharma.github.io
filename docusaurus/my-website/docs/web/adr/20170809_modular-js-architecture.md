---
id: "modular-js-architecture"
hide_title: true
---

# Modular JS Architecture

## Status

accepted

## Context

Traditionally web app development has required front-end developers to work across a wide range of
feature sets under a single monolithic code base.

With our move to teams working autonomously on vertical feature sets we find the monolith approach
at odds with this methodology and prevents teams working independently.

## Decision

In order to facilitate greater team autonomy we'll break the monolithic architecture into a
decoupled one comprising isolated component trees, each of which can be built and deployed
independently into a unified web app.

These components will each be their own npm modules with a `package.json` defining build and
production dependencies.

We'll develop an app shell module which provides the runtime for loading and rendering these
component modules.

Each component module must conform to a predefined contract so the app shell can manage it, passing
required hooks and data when activated as well as cleanup when deactivated.

Modules must remain unaware of one another so communication outside the bounds of a module must be
done via an event system (to be defined at a later date).

While full decoupling would be the ideal, in reality a web app must minimize byte transfer for
performance reasons. This means there's a need for shared libraries and components. These shared
modules should also be built and released separately but maintained across teams. Any breaking code
which goes into these should be agreed upon by the teams involved.

When developers are working on a module we must facilitate the development of this within the wider
app shell, much like when it's deployed. The implementation details of this are yet to be
determined.

## Consequences

If successful then we should open up decoupled delivery streams under a single web app.

Each team will have some degree of choice over how they build their modules, for example any
language which compiles to JavaScript could be chosen. That said because of the high importance on
small bundle sizes common patterns and frameworks will need to be adhered to.

Because we're splitting into modules there will be a degree of abstraction that may make development
a little more cumbersome than developers are used to under a monolith.

Also because this style of module separation is not a well trodden path we'll need to invest some
effort to get things wired up correctly.

Finally because some modules are shared there will inevitably be a degree of overlap with work
between squads. This is unavoidable. The aim is to minimize it where we can.
