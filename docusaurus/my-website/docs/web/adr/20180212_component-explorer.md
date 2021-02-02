---
id: "component-explorer"
hide_title: true
---

# Component Explorer

## Status

accepted

## Context

To facilitate rapid development and ease in the discoverability of our components we need a place to
present & validate our component library.

Components should be displayed in isolation using mocked data to prove functionality and layout.
This would be useful for:

- Discoverability of available components & their configuration options for all team members.
- Aiding the QA testing process by allowing testing in isolation.
- Aiding in the approval process when signing off new designs or functionality.

Two popular libaries which suit our needs are [Storybook](https://storybook.js.org/) and
[UI Zoo](https://myheritage.github.io/UiZoo.js/).

## Decision

The advantage of picking an existing solution means we save time building our app instead of
building a component explorer. This may tie in with a style/branding guide in the future.

Storybook was chosen because it's highly extensible for both build configuration as well as its user
interface with its [_addons_](https://storybook.js.org/addons/addon-gallery/) architecture.

It supports hot module reloading allowing developers to build their components in a sandboxed
environment.

It allows us to build both at an individual module level (for faster build times) as well as
building an aggregated version housing the components from each module.

Storybook will allow us to publish and showcase our components with minimal effort.

## Consequences

If successful we will have somewhere to view our component library in isolation from the main
application. This could be published onto a sub domain for the whole team to see and experiment
with.

This will facilitate rapid development and prevent unnecessary duplication as different squads
produce their own components while also leveraging existing which they discover through this tool.
