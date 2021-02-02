---
id: "navigation-menus"
hide_title: true
---

# Dynamic Navigation Menus

## Status

accepted

## Context

Our menu items are typically dynamic, based on the current browsing context (e.g. user,
organization, space, other). The link paths and often their labels, change based on which top level
information you're viewing.

Menu items may not change per page. They generally remain the same within a browsing context.

The navigation is fundamental to the user's ability to use the application. Based on the user's
current browsing context matching data is required to construct the menus.

## Decision

Unique menus will be needed for each browsing context (user, organization, space, other).

Required data to drive the menus needs to be loaded up front. This is contextual based on the
current browsing context.

To achieve dynamic menus, the menu items get constructed via a function which gets fed the required
data from the NavContext.

Our [modular architecture](./20170809_modular-js-architecture.md) means the menu data construct
methods will be stored in the module that first needs them.

Menu construct methods will be passed into each _route component_ via the existing `navConfig`
object. This pattern works for regular components, as well as `ModuleRoute` resolved components.

Modules that are nested within another module (which remain in the same browsing context) will
leverage the parent's menu via the prop. This avoids both duplication, and module peer dependency
binding.

A common data structure for menus will be needed that is suitable to be used for any UI menu
implementation (e.g. list, popout, accordion, etc).

## Consequences

This strategy should give us the flexibility to update the global navigation menus per module based
on the current browsing context.

The requirement for up front data in order to construct the menus will mean there will be a delay in
showing the initial menu items. These should be piece mealed and displayed as ready in order to give
optimal user feedback.

Because the navigation is the first module addded to the page it is a primary candidate for marking
contextual data queries as critical. E.g. if an organization fails to load then a large chunk of the
application is unusable.
