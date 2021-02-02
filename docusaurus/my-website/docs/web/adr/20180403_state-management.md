---
id: "state-management"
hide_title: true
---

# State Management

## Status

accepted

## Context

Modules primarily have their own isolated concerns, separate from the wider application. There are
however a few cases where modules will need to share some global application state, or maintain some
persisted state when the module is unmounted. An individual module may also have its own state which
is shared across its sub components. This state can be kept within the root component of the module
and passed down into the sub components, however this approach can lead to excessive prop drilling
in heavily nested component trees.

For the most part, application data and state can be managed by
[Apollo Client](https://www.apollographql.com/client/). Components anywhere in the render tree can
fetch the remote data they need and the data will be automatically cached in the client. This
enables components at any depth within modules to query for their required data without fear of
unnecessary round trips over the wire.

While cached remote data will account for the majority of application state, there is still a need
to manage purely local state such as persisting user input when traversing across a series of forms.
The additional state requirements outside of what Apollo provides will be minimal, therefore the
approach for managing local state can be light weight and tailored for our specific needs.

Redux offers a possible solution, though it is a bit
[excessive for our needs](https://redux.js.org/faq/general#when-should-i-use-redux). Another option
is to use [apollo-link-state](https://github.com/apollographql/apollo-link-state) as described
[here](https://dev-blog.apollodata.com/the-future-of-state-management-dd410864cae2). Using this
approach local state can be managed in the same store as the remote data in Apollo Client. While
keeping all state in the same place might be useful, the API for accessing the state is quite
cumbersome and unnatural to use.

## Decision

We will make use of React's new official [Context API](https://reactjs.org/docs/context.html).

> Context is designed to share data that can be considered "global" for a tree of React components,
> such as the current authenticated user, theme, or preferred language.

Some benefits of using the Context API include:

- **Light weight** - No additional dependencies, as the context API is included as a part of the
  React library.
- **Flexible API** - We're not locked into a particular design pattern or convention and can
  implement a custom solution tailored to our needs.
- **Simple implementation** - The Context API is easy to use and allows us to read from and write to
  the state with minimal boilerplate.
- **Great Support** - This is now the official API supported by React, and the recommended approach
  to provide shared state to deeply nested components across an application.

Out of the box the Context API simply provides a means of more easily passing data down a component
tree, it makes no specific assumptions about patterns or use cases. There are also some
[caveats](https://reactjs.org/docs/context.html#caveats) to be mindful of, e.g. by default, all
components which consume the state will update whenever the state changes. This is problematic and
less performant as most components will only need to respond to changes to a few of the properties
in state which they are concerned about.

We can enforce particular design patterns to suit our needs via creation of HOC wrappers, or other
component utilities. These utilities should allow components anywhere within the render tree to
easily access, update and reactively respond to changes to specific properties in the state. The
utilities should also make state access more simple, logical and convenient with minimal
boilerplate.

Using the Context API we can create multiple stores and providers at different levels of the
application. We will have a global store for data which is shared across multiple modules. Also we
can define a separate store within each module where it makes sense. Stores at the module level will
only contain data which is relevant to that particular module, but is accessed across multiple pages
or deeply nested components with that module, for example remembering some user input across
multiple forms. Having stores at the module level should help to keep modules more decoupled from
the wider application. We should only look to use the global store when data needs to be accessed
across multiple modules, or if a module has some data which needs to be persisted when the module is
unmounted.

## Consequences

Using React's Context API should allow us to manage shared state across our application. We can
choose a particular approach or design pattern to suit our needs. The chosen approach should make it
easy to access and update the state from anywhere in the component hierarchy.

There are also already some libraries which provide convenient patterns for state management via the
Context API such as [react-waterfall](https://github.com/didierfranc/react-waterfall). We may either
choose to adopt some of the ideas from these libraries into our own custom implementation, or simply
go with one of these if they are light weight, suit our needs and are being actively developed.

By having a single store for global state we can share and persist data across modules. Also by
creating additional stores at the module level we can keep modules isolated while still being able
to manage module wide state or avoid excessive prop drilling.
