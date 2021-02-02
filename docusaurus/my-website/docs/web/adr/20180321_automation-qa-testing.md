---
id: "automation-qa-testing"
hide_title: true
---

# Automation QA Testing

## Status

accepted

## Context

Our QA testing process requires **end to end integration tests** against the deployed web app.

Classically automation testing scripts use either **ID attributes** (`<div id="unique"`), or **Class
attributes** (`<div class="reusable"`) to target the elements on the page necessary for testing a
piece of functionality.

This project is configured to **obfuscate our CSS class names with a dynamic hash value**.

```html
<li class="css-6n00rw">
	<a class="css-1dljuzc" href="/profile">
		<div>My details</div>
	</a>
</li>
```

While this is advantageous to our build process (_preventing global naming conflicts and unexpected
style inheritance/overiding_), it means the testers have a hard time knowing which elements to
target during their tests.

> We can immediately disregard using ID attributes since they don't scale due to their unenforced
> requirement of needing to be unique.

**We need to expose a way for our test scripts to target elements in a consistent manner.**

## Decision

_Because our CSS obfuscation process includes a hash on the end of the class name our tests can't
rely on a particular class name for targetting since the hash value changes whenever the element's
styles change._

We could add additional human readable class names which don't get obfuscated, purely for the
purpose of targetting but that's too fragile:

```html
<button class="button css-q926n7">Click Me</button>
```

Alternatively, we could choose to include the original human readable class name as a suffix via
[Emotion's autoLabel](https://emotion.sh/docs/babel-plugin-emotion#autolabel) property.

That's primarily useful for visual hierarchy understanding (_when inspecting the DOM tree within dev
tools_) moreso than targetting.

```html
<button class="css-q926n7-button">Click Me</button>
```

> Targetting _could_ be achieved using the suffixes via
> [selector fuzzy matching](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
> but that's inefficient (_although perhaps we consider that reasonable for testing?_).

Instead a
[custom data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
can be used to provide a meaningful name which is agnostic of styling and doesn't have same the
uniqueness requirement that than ID attribute does.

This means we can target all elements of a particular type, the same way that testers classically
did via class name selectors.

```html
<div class="css-q926n7 css-q926n7-open" data-qa="nav-menu">
	<ul class="css-1bx711n" data-qa="menu-item">
		<li class="css-6n00rw">
			<a class="css-1dljuzc" href="/profile" data-qa="menu-item-link">
				<div>My details</div>
			</a>
		</li>
		<li class="css-6n00rw" data-qa="menu-item">
			<span class="css-1dljuzc">
				<div>Sign out</div>
			</span>
		</li>
	</ul>
</div>
```

These `data-qa` values would be **opt in** and would _only need to be provided on elements necessary
for targetting for the purposes of QA testing_.

This would rely on communication between squad developers and testers when building out features.
Since QA testing scripts are part of the sprint cycle prior to demonstation this seems suitable and
reasonable.

QA scripts and testers can then target elements using `document.querySelector` and
`document.querySelectorAll`.

```javascript
document.querySelectorAll('[data-qa="menu-item"]');
```

An advantage of data attributes instead of class name is that developers can rename class names
without consequence provided they don't change the `data-qa` names without discussing it with
testers.

## Consequences

With suitable identifiers available on the elements needed for functional testing our QA process can
build scripts which won't break whenever future stylistic changes occur.

QA testers can have the confidence that their scripts will pass the test of time, until significant
architectural changes occur, at which point they're adjusted to re-align.

It is up to individual squad developers and testers to communicate amongst themselves when building
features to ensure test scripts can target the elements necessary. They will also be responsible for
choosing appropriate element names for the `data-qa` values. Naming based on the component name may
be an ideal approach to avoid naming conflicts and bypass nested selectors where possible.

We won't want `data-qa` values included within production builds that aren't on our QA
environment(s) so these should be stripped during compilation. This can be achieved via
[`babel-plugin-remove-attribute`](https://www.npmjs.com/package/babel-plugin-remove-attribute)
