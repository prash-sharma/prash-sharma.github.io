---
id: "custom-drag-and-drop"
hide_title: true
---

# Custom Drag and Drop

## Status

accepted

## Context

This is following on from the previous Drag and Drop ADR. Currently due to time constraints we are
using an out of the box solution for Drag and Drop, The issue is this solution doesn't visually
behave the way UX&D would like. Drag and drop is also being used more and more across the site and
we need a consolidated approach to the implementation.

## Decision

Following on from the previous research performed I looked at how 2 of the libraries mentioned
(React-Beautiful-DND (RBD) & React-DND) could be used to meet the requirements of UX&D but also be
able to leverage as much as we can out of the box. I assessed the 2 on 4 criteria,

- ease of use
- time to implement
- out of the box behaviour
- meet visual requirement

Looking at React-DND, while it is an extremely powerful set of Tools, it is extremely low level and
a lot of the implementation needs to be handled by a Dev, to meet the requirements it would have
meant a lot of heavy lifting on our side, which takes longer and also opens us up to the potential
of more bugs.

Looking at RBD is more high level and is able to meet most of the requirements from UX&D but we get
far more functionality out of the box.

The decision was the continue to leverage our existing Library RBD. It gave us the most out of box
behaviour, which meant reduced work, which meant time to implement was faster and the api is
simpler, which means its faster to get up and running.

The main issue from UX&D was the visually representation of where you dragged from and where you
where going to drop. RBD provides a way for us to intercept the styles it passes down on to the
elements which will be dragged and dropped. By leveraging this 'hook', we can modify the styles as
they are applied to an element and achieve all the desired behaviour from UX&D.

## Consequences

We have a library that is easy to use, that doesn't change our current project file size and is able
to meet all current requirements from UX&D
