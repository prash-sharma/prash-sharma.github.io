---
id: "modular-cli"
hide_title: true
---

# Modular CLI

## Status

accepted

## Context

The modular architecture of our web app brings many benefits, however it adds a lot of boilerplate
and repetition when creating a new module. While this can be handled manually, repetitive work
presents an opportunity for error and also becomes tedious.

## Decision

In order to alleviate repetition in creation of new modules we will build a cli which will follow
the [`create-react-app` philosophy](https://github.com/facebook/create-react-app#philosophy)

One Dependency: There is just one build dependency. It uses Webpack, Babel, ESLint, and other
amazing projects, but provides a cohesive curated experience on top of them.

No Configuration Required: You don't need to configure anything. Reasonably good configuration of
both development and production builds is handled for you so you can focus on writing code.

No Lock-In: You can �eject� to a custom setup at any time. Run a single command, and all the
configuration and build dependencies will be moved directly into your project, so you can pick up
right where you left off.

Commands to be implemented in the cli are

```
help, -h - Displays this message
adr, -a <adr name> - Creates a template adr file
build, -b - Build current module (must be in a module dir)
test, -t - Run jest on current module (must be in a module dir)
dev, -d - Dev build and serve site.
eject, -e - Create config files in the base dir current module (must be in a module dir)
create, -c <module name> - Creates a new module
```

## Consequences

Benefits of automated initial module creation are,

- it's easy to get started on a new module
- quicker to get up and running
- single location for updating base configurations
- can update multiple modules configurations in one place
