---
id: "focus-styling"
hide_title: true
---

# Focus Styling

## Status

accepted

## Context

Styling the [focused element](https://developers.google.com/web/fundamentals/accessibility/focus/)
is important for
[accessibility](https://developers.google.com/web/fundamentals/accessibility/accessible-styles),
allowing keyboard users to know which element is selected (if any), and thus, will be actioned when
the user hits an action key (e.g. ENTER or SPACE).

Browsers have built in logic to draw an outline on the focused element so that keyboard users can
see where they are on the page as they TAB traverse through it's contents.

Conveniently the browser is smart enough to not apply this focus outline when the user clicks an
interactive element, despite focus being given on click.

_Unfortunately, as soon as an element has a `:focus` selector applied this 'intelligent distinction'
is disabled and the styles contained are applied regardless of input mode._

## Decision

Since it's common practice to define bespoke visual styling for focused elements, this causes
problems because we typically don't want the focus styles shown when a user clicks or taps the
interactive element, only when a keyboard user TAB traverses to it.

This is a topic of contention and there have been various ways to solve this in the past.

The most common solution is to listen for input mode changes in JavaScript (e.g.
[what-input](https://github.com/ten1seven/what-input)) and then store the active input mode
somewhere in state (typically as a class assigned to the body element) so that nested CSS selectors
can adapt to it.

While this has worked well in the past, we can now leverage the upcoming
[`focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) API which is
designed to solve this very problem.

Support [isn't very good yet](https://caniuse.com/#search=%3Afocus-visible) so two options exist:

1.  Write your styles in
    [backwards compatible way](https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/)
    where you define the styles using the `:focus` selector, undo the styles for modern browsers via
    `:focus:not(:focus-visible)` and then reapply them via `:focus-visible`. You can see an example
    of this approach
    [here](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#Selectively_showing_the_focus_indicator).

2.  Alternatively, [polyfill](https://github.com/WICG/focus-visible) is available which would add
    3Kb our vendor libs and provide backwards compatibility for us.

The benefit to this `focus-visible` approach is that we can define our global focus styles in one
place and rely on them without having to opt in or out, as is the case currently (e.g. setting
outline to none all the time).

The polyfill is the most convenient solution and it future proofs us for the day that we have
ubiquitous browser support.

Note that neither the `outline` nor `box-shadow` CSS properties impact the measured dimensions of
the applied element which makes them ideal for focus styling.

```css
/* Hide focus ring for mouse/touch users (rule ignored for keyboard users) */
.js-focus-visible :focus:not(.focus-visible) {
	outline: none;
}

/* Show custom focus ring for keyboard users */
.js-focus-visible .focus-visible {
	outline: none;
	box-shadow: ...; /* or other custom styles */
}
```

You can compare a baseline of interactive elements using `:focus-visible` on this
[demo page](https://wicg.github.io/focus-visible/demo/).

## Consequences

Once implemented, Keyboard users will be able to tell which (if any) element is focused on the page
at a glance.

Designers can trust we have consistent UI treatment for focused interactive elements.

Developers shouldn't need to worry about the focus styling unless their component makes use of a
hidden interactive element which proxies the styles onto an alternate element, or if they've set an
explicit `tabIndex` value on an element which isn't usually interactive (e.g. a div).

An example of the former scenario might be when a custom input (e.g. Checkbox) is displayed in a
different form (e.g. as a Switch). The ability to access and global focus styles should be exposed
for components to reuse on their custom extensions.

The `:focus-visible` polyfill requires an additional polyfill for `Element.prototype.classList`,
however this is already available within this project via our usage of polyfill.io's
[`default-3.6`](https://cdn.polyfill.io/v2/polyfill.min.js?features=default-3.6) feature-set.

For reference the `classList` polyfill is 0.8Kb. Total size of both polyfills is 3.8Kb, however this
filesize is likely to be smaller than the CSS required to opt out of focus rings on a case by case
basis.
