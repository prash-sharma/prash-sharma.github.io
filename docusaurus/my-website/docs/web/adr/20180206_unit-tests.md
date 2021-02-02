---
id: "unit-tests"
hide_title: true
---

# Unit Tests

## Status

accepted

## Context

When building any app it is good practice to write unit tests in order to minimise the risk of
introducing errors. When choosing a testing framework the choice should be based around the stack
and architecture of the app as well as familiarity and community support. Points of consideration
for this app are,

- Workspaces/Modules
- Webpack
- React
- Redux
- Lerna
- Serverlesss

The decision will ideally be based around which testing framework is best suited to work with the
above technologies.

We should also consider whether to have a testing framework sit globally across all modules or
indivudally for each module.

## Decision

Considering all available testing frameworks, the framework best suited to our particular stack is
Jest. Jest is

- largely used with react/redux apps,
- has a large community,
- contains most features out of the box such as code coverage, mocks and stub etc...
- has minimal configuration,
- works with webpack,
- leverages parallelisation to execute multiple tests simultaneously, greatly increasing
  performance,
- and used on previous project so devs already familiar.

Given we have multiple modules which would need to run their own tests jest will be added to each
module individually to maintain decoupling of modules.

We will be adding a baseline check of 70% test coverage for shared modules as part of the build
process. Modules which are not shared but belong to a specific squad can have lower coverage
requirements.

## Consequences

While writing tests and setting a fixed percentage on test coverage may add additional time to
development, in the long run we save far more time in smoke testing and feature development.

By Implementing tests we hope to achieve:

- Reduced regressions.
- Overall increase in feature velocity as it's clearer that code is functioning correctly.
- If tests are written well, refactoring should become easier as we can spot breakages.
- Reduced time spent code reviewing/testing.
- Greater confidence in releasing code in small increments.

Overall we should produce a higher quality app with unit tests than without.
