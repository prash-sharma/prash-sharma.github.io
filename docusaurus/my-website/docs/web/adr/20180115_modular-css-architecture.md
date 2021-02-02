---
id: "modular-css-architecture"
hide_title: true
---

# Modular CSS Architecture

## Status

accepted

## Context

Moving to modular architecture introduces challenges when it comes to achieving unified theming
(e.g. colour palette, typography) across the application. Each module must be decoupled from the
wider application while still adhering to the common global styling rules.

## Decision

The global theme configuration will be defined in the app shell and passed to each module. In order
to pass the theme down the render tree we can use the
[provider pattern](https://medium.com/@bloodyowl/the-provider-and-higher-order-component-patterns-with-react-d16ab2d1636).
A provider component at the root of the render tree appends the global theme to the context. The
theme can then be accessed by any component down the render tree via a HOC which extracts the theme
from the context and passes it via props to the wrapped component.

Because the theme is only made available to each module at runtime, any module that requires the
global theme for its styling will also need to have the styling applied at runtime.
[CSS in JS frameworks](https://github.com/MicheleBertoli/css-in-js/blob/master/README.md) provide a
solution to this problem by enabling CSS styling rules to be written in JS. Styles can be written
alongside components, formatted as either JS object abstractions or as template strings. At runtime
styles are generated based on the theming configuration and then added to the head of the document.

Each CSS in JS framework we've considered offers a slightly different approach and each has it's own
[pros and cons](https://alligator.io/react/css-in-js-roundup-styling-react-components/). Ideally we
want to be able to write CSS in JS with minimal boilerplate code, small overhead (file size &
performance), using natural syntax that's quick to learn and be able to leverage good tooling
(highlighting/completion/linting).

Of the frameworks we've considered, [Emotion](https://emotion.sh/docs/introduction) has the greatest
flexibility while maintaining
[high performance](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) and
[small footprint](https://medium.com/@tkh44/emotion-ad1c45c6d28b). Emotion supports styling via
template strings or by defining a JS object abstraction. Editor plugins can provide
[syntax highlighting](https://github.com/styled-components/vscode-styled-components) and
[intellisense](https://github.com/Microsoft/typescript-styled-plugin) for styles written as template
strings.

## Consequences

Using the provider pattern should make it possible for modules to remain decoupled from the wider
application, except that they must be aware of and maintain the common contract for the theme
configuration.

Using a CSS in JS framework such as Emotion should also make it possible for modules to generate
their styles based on the theme provided at runtime. Emotion in particular offers greater
flexibility, allowing squads to choose their own preferred approach to styling (string or object
based). Developers should be able to quickly get up to speed with our approach to styling, while
hopefully also not being bogged down with too much overhead/boilerplate.

Ultimately this decoupling should result in squads being able to develop their modules in isolation
and reducing the likelihood of different streams of work affecting or depending on each other.

Writing styles in JS also enables those styles to be compiled together with code into a single
minified bundle. This is beneficial for performance as we only require a single request to fetch
each module.
