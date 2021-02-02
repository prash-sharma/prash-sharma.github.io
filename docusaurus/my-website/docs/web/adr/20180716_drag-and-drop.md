---
id: "drag-and-drop"
hide_title: true
---

# Drag and Drop

## Status

accepted

## Context

Drag and drop is a common featureset of many content management systems to allow operators to order
items in a specific way.

To achieve our various user interactions and user interface layouts, we wish to leverage Drag & Drop
to empower our users, as they manage their data within our application.

### Considerations

1.  Developer ease of use.
    - When implementing DnD for new layouts & components.
1.  The HTML5 drag and drop API has many browser inconsistencies & implementation quirks.
    - It doesn't natively support touch interfaces.
1.  Accessibility needs to be maintained.
    - Should support mouse, keyboard, and touch screen device input.
1.  Must be performant at runtime while dragging.
    - Regardless of the number of items, or the complex nested DOM fragment structures witin the
      draggable elements.
1.  Drag & Drop should feel intuitive for our users to use and discover.
1.  It should support both sorting within a horizontal, vertical, or wrapping grid based layout.
    - Ideally with CSS-Grid support.
1.  It should have fluid transitions and animations.
1.  It should gracefully handle dragging outside of the viewport's scroll position.
1.  It should support dropping inside the existing group/container or being moved into an alternate
    group.
1.  Does it support showing a ghost in the position/slot that a draggable item resides over?
1.  Does it have the ability to change the draggable item's appearance upon a drag operation?
    - It should maintain the height of the new item when filling the hole(s)

[Further Drag & Drop considerations from Atlassian](https://medium.com/@alexandereardon/rethinking-drag-and-drop-d9f5770b4e6b).

### Candidates

**React DnD:**

[react-dnd](https://github.com/react-dnd/react-dnd) is a powerful _low level_ implementation,
allowing us to write our own draggable & sortable components within _horizontal_ and _vertical_
lists.

- We'd need to write our own HoCs which leverage this framework to empower our components.
- Follows SemVer with several major versions have been released.
- Very healthy community.
- Some of our team members have existing experience with this framework from prior projects.
- Supports dropping into alternate lists.
- Supports displaying a ghost item within the proposed draggable item's slot.
- Supports changing the appearance of the draggable item upon a drag operation.
- _No examples of grid support._
- _Sadly, touch interface support is lacklustre._

[Examples](http://react-dnd.github.io/react-dnd/examples-chessboard-tutorial-app.html)

**React Beautiful DnD:**

[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) provides a _high level_
implementation, for dragging and sorting _horizontal_ and \_vertical+ lists.

- Provided HoCs to empower our components.
- Follows SemVer with several major versions have been released.
- Very healthy community.
- Great performance and UX.
- Supports touch interfaces.
- Supports dropping into alternate lists.
- _Sadly, it doesn't support grid based layouts, and they have no plans for it._

[Examples](https://react-beautiful-dnd.netlify.com)

**React Sortable:**

[react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) provides a _high level_
implementation, for dragging and sorting _horizontal_, _vertical_, and _grid_ lists.

- Provided HoCs to empower our components.
- Not following SemVer (yet?) as releases are still pre 1.0, despite existing for over 2 years.
- Healthy community.
- Supports grid based layouts.
- Smooth animations.
- Supports touch interfaces.
- Supports third party virtualisation frameworks.
- Within a grid layout it only supports same size items.
- _Sadly, it doesn't support drag and drop between different lists._

[Examples](http://clauderic.github.io/react-sortable-hoc/)

---

Below are the filesize impacts from the libraries when introduced into the **_lib_** module:

| Dependency          | Uncompressed | Gzipped | Impact                                                       |
| ------------------- | ------------ | ------- | ------------------------------------------------------------ |
| None (baseline)     | 659Kb        | 180Kb   | N/A                                                          |
| react-beautiful-dnd | 773Kb        | 209Kb   | **29Kb gz** ⭐                                               |
| react-dnd (HTML5)   | 760Kb        | 204Kb   | **24Kb gz** _(plus size of implementation components: ~5Kb)_ |
| react-dnd (Touch)   | ?            | ?       | _Not compatible with Webpack 4. Did not compile._            |
| react-sortable-hoc  | 688Kb        | 187Kb   | **7Kb gz** (without virtualization)                          |

## Decision

> **Sadly, no one framework supports all of the features our UX&D department want utilise.**

We don't want to leverage multiple libraries as that would add unnecessar bloat to the filesize of
the **lib module**.

Despite many of us having prior experience with react-dnd from past projects,
**[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) was chosen**.

> _Out of the three proposed options it supports the most features defined by our proposed UX and UI
> layouts._

`react-beautiful-dnd` is very popular within the dev community. It provides a solid foundation for
which to build upon. It has great runtime performance, supports both pointer and touch input modes,
and provides reasonable extensibility.

## Consequences

Users of our application will feel empowered to curate their data lists in any order they desire.

Due to the code complexity of dragging and dropping, the introduction of this featureset will
increase the size of the `lib` package by 29Kb gzipped.

react-beautiful-dnd is more opinionated than react-dnd and thus less flexible. This may impact our
UI/UX decisions.

We'll need to devise our own solution for grid based wrapping layouts.
