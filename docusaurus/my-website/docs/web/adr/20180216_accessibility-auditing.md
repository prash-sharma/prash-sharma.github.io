---
id: "accessibility-auditing"
hide_title: true
---

# Accessibility Auditing

## Status

accepted

## Context

Accessibility is hard for many reasons. While current tooling provides mechanisms for detecting most
accessibility violations, there remains a certain amount of disconnect between the developer and the
problems they are causing. Most of these errors are things we can't see, things that won't affect
us, and things without a perfect, exact fix.

## Decision

### eslint-plugin-jsx-a11y

Deep within Facebook's create-react-app repo lies a package for ESLint that only enforces code
quality called
[eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app)
it includes [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) which is a
static AST checker for accessibility rules on jsx elements.

Pairing this plugin with an [editor lint plugin](https://eslint.org/docs/user-guide/integrations) we
can bake accessibility standards into our application in real-time and enforce best practices.

### react-axe

It is recommended that users can and should use [react-axe](https://github.com/dequelabs/react-axe)
in conjunction with the jsx-a11y plugin. Static analysis tools cannot determine values of variables
that are being placed in props before runtime, so linting will not fail if that value is undefined
and/or does not pass the lint rule.

react-axe tests the accessibility of the rendered DOM. This is important because many accessibility
issues exist at the intersection of the DOM and the CSS and unless you have a fully rendered DOM,
you will get two sorts of inaccuracies:

1.  False negatives because of lacking information. Example is in order to test color contrast you
    must know the foreground and the backgound colors, and

2.  False positives because the element being evaluated is not in its final state and the
    information to communicate this to the testing algorithm is not available. Example is an inert
    piece of code that will be augmented once it becomes active.

If we have nice clean code, number 2 will be negligent but number 1 will always be a concern.

At a later date when performance testing is implemented, usage of react-axe could perhaps be
replaced by [Lighthouse](https://developers.google.com/web/tools/lighthouse/) which includes axe
internally.

### storybook-addon-a11y

As react-axe can only validate a given URL, markup rendered by user action or data variation will
not be validated.
[storybook-addon-a11y](https://github.com/storybooks/storybook/tree/master/addons/a11y) can allow
validation of a component's accessibility as it is rendered in storybook.

## Consequences

To produce a better product that is accessible to all and speed up the development process by
automating accessibility errors and reporting, in the browser and editor.
