# Accessibility Auditing Research

## Automated auditing

Automated auditing mechanisms allow us to surface a11y issues easily during our development, review
and testing phases.

Many tools exist for auditing the rendered markup of components, routes and the various states of
views; however we need to find a happy medium of using these that don't slow down our other
automated auditing processes.

It is widely considered that the best automated a11y auditing approach is to run the final rendered
markup of various states of our views through a tool like [axe-core] or [Lighthouse] (which uses
[axe-core] under the hood) to identifiy and prioritise a11y issues.

## Manual auditing

Some aspects of a11y auditing can't be done through automated tools and require a manual approach.

### Focus states

Focus state management can only be effectively tested in a browser by hitting the tab key whilst
trying to interact with the UI.

Some considerations when testing focus states are:

- That modals trap the focus ability of the user to only the active modal.
- Interactive elements can receive focus and non-interactive element can not.
- Focus states are visible and easy to perceive.
- Focus states should not be visible unless the user is using a keyboard input.

A polyfill for the `:focus-visible`
[pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) has already been
implemented in our apps called [focus-visible].

### Hover reveal

A common UX pattern in our apps is to hide content until a user hovers over a parent element, like
overflow menus on cards. Hiding this content by default presents an issue for users on touch-based
devices and screen readers. CSS utility classes that address this issue have already been
implemented in our apps named `.reveal-parent` and `.reveal-child`.

### Semantic markup

Using correct HTML elements to describe content adds considerably to the a11y of the app. A common
mistake is using `div` and `span` elements to define content sectioning rather than `article`,
`aside` or `section`. Also using `div` elements as the root of a JSX portion to contain multiple
elements rather than React's `Fragment` (`<>`) component; or using DOM elements to create cosmetic
improvements instead of harnessing CSS pseudo-elements like `::before` and `::after`.

Heading structure also plays a large role in forming semantic markup. As a rule of thumb, an `h1`
element should exist on every page, and subsequent heading should be correctly nesting in descending
heading order (ie `h2`, `h3`, `h4`, etc). This helps to describe the content sectioning of the page
as well as creating a navigation structure for assistive technology like screen readers.

ARIA roles and attributes are also powerful tools for helping to describe the content, but should
only be used as a fallback when the correct semantic elements cannot be used. For example, instead
of `<div role="form">` we should be using `<form>`; or using the `aria-label` attribute when a
`label` element could be used instead.

## Resources

- [This](https://wiki.massiveinteractive.com/display/MASV/Accessibility) is a useful wiki that
  contains a lot of background information about why we need to be accessible, and how to achieve
  it.
- [axe-core] - an a11y auting library and CLI in JSX.
- [focus-visible] - a utility for only displaying focus states when a user is using their keyboard.
- [lighthouse] - a Chrome browser extension and CLI tool for auditing a11y, performance and more of
  the current route.

[axe-core]: https://github.com/dequelabs/axe-core
[focus-visible]: https://github.com/WICG/focus-visible
[lighthouse]: https://developers.google.com/web/tools/lighthouse
