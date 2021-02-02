---
id: "accessiblility-auditing"
hide_title: true
---

# Accessibility Auditing

## Status

accepted

## Context

This ADR serves to refresh and extend upon the previous a11y auditing ADR
[here](https://bitbucket.org/appcurator/web/src/master/doc/adr/20180216_accessibility-auditing.md).

The aim of this ADR is to identify mechanisms that will increase the visibility of a11y issues to
developers, reviewers and testers across the current web and visa apps.

The recommendations from the previous ADR were implemented, but over time some of them were removed
for various reasons as detailed below. As the auditing became less visible to the team, the number
of a11y issues in the project increased.

The existing ADR also covered only automated auditing approaches. Some aspects of a11y auditing
cannot be tested by automated means, so a combined approached of automated and manual auditing
provides better coverage.

### Research resources

- [This](https://wiki.massiveinteractive.com/display/MASV/Accessibility) is a useful wiki that
  contains a lot of background information about why we need to be accessible.
- [This](../research/a11y-auditing.md) research document provides a lot of background information
  about automated and manual a11y auditing specific to this project.

### Status of existing implementations

In the current web and visa apps, the [eslint-plugin-jsx-a11y] is still in use and presents
developers real-time a11y auditing feedback as they author JSX.

[react-axe] was initially implemented in the web app, but after a while the development team noticed
that the package had a significant performance impact. Whilst developing it became difficult to know
if the performance issues were caused by code in the app or caused by this package. As the developer
navigated through different routes, the performance issues got worse and compounded which suggests
that there was a memory leak. An environment variable was used to enable this package, and most of
the development team currently operate with it disabled.

[storybook-addon-a11y] was disabled in this
[pull request](https://bitbucket.org/appcurator/web/pull-requests/858/drag-and-drop-grid-dropdown-truncation/diff?w=1#comment-104859675)
when it was found to be throwing errors.

<!-- prettier-ignore -->
Some a11y auditing coverage is also provided by our component tests which utilise [React Testing Library]
where the desired pattern is to query elements by their role. Asserting each elements role
helps ensure correct HTML5 elements and ARIA roles are being utilised.

### The downshift problem

In doing some a11y audits on the current web app, a majority of the issues stem from the incorrect
usage of the downshift component and it missing the implementation of labels. Fixing this up would
be a quick win.

## Decision

We should consider enabling automated a11y testing where we can and document processes for manual
a11y testing when needed.

### Automated auditing

Since [react-axe] and [storybook-addon-a11y] were first implemented in our projects, there have been
many upgrades to these projects which should hopefully address the issues we were seeing. Both of
these should be assessed again and if stable, integrated back into our apps.

Automated auditing tools like [axe-core] and [Lighthouse] work best when testing against the full
rendered markup of a view's state. A significant hurdle in implementing an automated test suite
would also be in trying to authenticate as various users to access various states of views. I
initially considered integrating one into our functional tests. However, this would add too much
weight and muddy the results of our functional tests. Adding similar automated auditing into our
component tests would increase build times which would also not be ideal.

We can increase our a11y audit coverage by implementing [jest-axe] in our component tests too. So as
not to slow down our existing workflows, [jest-axe] should not be enabled on every run of the tests,
but instead enabled with a flag and run periodically, like our dev storybook builds. Results and
failures can be reported back similar to our Klaxon project.

### Manual auditing

I've outline below a few changes to our existing processes that would allow us to manually audit
a11y as part of our development, review and testing phases. To complement this we would need to
raise tech backlog tickets to address issues and prioritise them accordingly.

### Changes to existing processes

#### Development phase

- During local development it would be best to keep [react-axe] enabled so that a11y warnings are
  visible when authoring markup, and complemented by the existing [eslint-plugin-jsx-a11y] plugin.
- When authoring new components or working on existing ones, storybook stories should be created as
  well as component tests. Enabling the storybook user to display the various states of the
  component by using the [addon-knobs] functionality is also key so that the [storybook-addon-a11y]
  can highlight any a11y issues. When working on feature tickets, separate tasks for authoring
  components and implementation will assist developers and testers alike.
- Focus states should always be a consideration when working on interactive components. The
  developer should always query the UXD team for designs that include hover; focus; and hover and
  focus states for all interactive components. When implementing focus states, always ensure styling
  is utilising [focus-visible]. When authoring or editing existing markup that uses the hover reveal
  pattern, always use `.reveal-parent` and `.reveal-child` or utilise the `getRevealParentStyles()`
  style generation method in our theme base.

#### Code review phase

During code review, as well as ensuring that the above mentioned points have been adhered to during
development, we should also:

<!-- prettier-ignore -->
- Audit the rendered markup of each variation of a worked on view by using one of the [axe browser extensions]. 
  I've found that the auditing is faster in these than using [Lighthouse] and their
  information also more relevant and easier to drill down to affected markup. Also, [Lighthouse]
  only implements [some](https://github.com/GoogleChrome/lighthouse/issues/6169) of the checks that
  [axe-core] audits.
- Examine the markup generated and ensure that it is semantic; uses correct container sectioning
  elements; and doesn't rely on redundant elements in the DOM for styling where possible.
- Examine the heading structure of each worked on view utilising heading map auditing extensions
  such as
  [headingsMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi).
- Use a screen reader to mimic assistive technologies and ensure elements are labelled correctly,
  such as
  [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en).

As a part of this ADR, we should also consider implementing [pull request guidelines for bitbucket]
so that documentation on what should be checked during code review is accessible for new and veteran
reviewers.

#### QA phase

Testers can also choose to review the same points as mentioned in the code review phase, but key
actions should be:

- Testing components through storybook and viewing the accessibility information exposed by
  [storybook-addon-a11y].
- Running [axe browser extensions] over changed views to audit and identify any unraised a11y
  issues.

#### Raising tickets

- When using [axe browser extensions] the severity of each issue is clearly labeled which could
  easily dictate the priority of raised tickets.
- Using clickup's tag functionality (specifically the tag `a11y`) would allow tickets relating to
  a11y to be viewed and managed easily.
  <!-- prettier-ignore -->
- When colour contrast issues are reported, attach the generated report from the [axe browser
  extensions] and assign to UXD.

### Tasks to come out of this ADR

- Fix [react-axe] implementation
- Fix [storybook-addon-a11y] implementation
- Add [react-axe] to visa
- Fix downshift labeling and aria role issues
- Add [jest-axe] to our existing component tests which is only enabled by a flag
- Setup periodic running of our component tests with the a11y flag and reporting mechanism

## Consequences

These extra steps to our existing processed may add a small amount of time to tasks, but will
ultimately ensure we produce a more accessible product.

[addon-knobs]: https://www.npmjs.com/package/@storybook/addon-knobs
[axe browser extensions]: https://www.deque.com/axe/browser-extensions/
[axe-core]: https://github.com/dequelabs/axe-core
[eslint-plugin-jsx-a11y]: https://www.npmjs.com/package/eslint-plugin-jsx-a11y
[focus-visible]: https://github.com/WICG/focus-visible
[jest-axe]: https://www.npmjs.com/package/jest-axe
[lighthouse]: https://developers.google.com/web/tools/lighthouse
[pull request guidelines for bitbucket]: https://prguidelines.services.atlassian.com/
[react testing library]: https://testing-library.com/docs/react-testing-library/intro
[react-axe]: https://github.com/dequelabs/react-axe
[storybook-addon-a11y]: https://www.npmjs.com/package/@storybook/addon-a11y
