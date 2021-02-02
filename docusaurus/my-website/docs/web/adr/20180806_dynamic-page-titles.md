---
id: "dynamic-page-titles"
hide_title: true
---

# Dynamic Page Titles

## Status

accepted

## Context

In a traditional website each page is requested from the server and the returned html contains a
unique meta title. We're using a single-page application (SPA) so we need to devise a way of
updating the meta title value at runtime.

[Structure of the titles](./20180806_page-title-structure.md) is outside the scope of this document.
Here we're focsing on the implementation.

_Page titles impact SEO_. Because our application is primarily a walled garden (requiring
authentication), SEO is only application to our public facing pages (e.g. authentication and
registration flows).

The majority of our page titles will need access to browsing context data to contruct their final
values.

## Decision

While there are existing solutions in place within the React eco-system, they often offer additional
functionality when working within the `HEAD` element.

[react-helmet](https://github.com/nfl/react-helmet) is a popular option, and we have experience
using it in other projects, but at this point it's not worth introducing its filesize impact since
we don't require anything other than updating the page title at this time. We'll instead update the
page title using our own light-weight solution.

The interface for setting a title should be kept simple. Each page component shouldn't need to know
or care about its ancestor data relationships, despite the fact that we want to include that context
within our titles.

The `NavContext` already has knowledge of the current User, Organization and Space. It's currently
in control of setting a theme on each page, so a natural progression can be to also set the title of
each page. Think of it as the **Navigating** Context rather than _Navigation_ Context.

The page title can be marked as a required prop on the `Page` component which leverages the
`NavContext`. Each Page element can specify an appropriate title value. The NavContext can receive
the proposed title and construct a consistent page title using its knowledge of the browsing
context.

#### Augmenting Page Titles with User Labels

Page titles which need need external data to augment the page title may need to manually update the
NavContext after the initial mount. e.g. "Audience Reach ‘Boys 0–2’" where 'Audience Reach' is set
as the page title, but once a Segment is received from the backend we append the segment's user
specified title "Boys 0-2" to the end.

#### Renaming Context Data

When a page allows renaming part of the browsing context data (e.g. an org or space) then we need to
force a re-render after the query has been performed. This is simple to achieve by setting a `key`
with the value of the object's name on the `Page` component which houses the rename ability. That
way it will remount the component when renaming occurs which ensures the correct title is displayed.

Queries which allow renaming will need to be formulated in a way that ensures their cached data is
updated globally, and not just within the copy used by the page. Failure to do this would mean the
titles would be innaccurate. Further information on that topic is outside the scope of this ADR.

## Consequences

The application will display the page title based on the page's content.

For now our choice has minimal impact on filesize. In the future if we require additional
manipulation of the contents of the `HEAD` element, then we can revise our choice, and investigate
integrating a third party library to achieve our goal(s).

We're at the mercy of developers setting appropriate page titles as they develop new pages.
