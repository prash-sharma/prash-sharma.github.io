---
id: "page-title-structure"
hide_title: true
---

# Page Title Structure

## Status

accepted

## Context

As a user browses our application there is an expectation for the page title to change to match the
content they're viewing.

In a traditional website each page is requested from the server and the returned html contains a
unique meta title. We're using a single-page application (SPA) so we need to devise a way of
updating the meta title value at runtime.

[Implementation](./20180806_dynamic-page-titles.md) is outside the scope of this document. Here
we're focusing on the **structure** of the titles.

_Page titles impact SEO_. Because our application is primarily a walled garden (requiring
authentication), SEO is only application to our public facing pages (e.g. authentication and
registration flows). _The marketing and documentation sub-sites are outside the scope of this
document._

When deciding on a title structure we may wish to maintain our product name, the data's context
(e.g. the organization and/or space), and the title of the page.

> Information Hierarchy is important for page titles, particularly because browser tabs truncate the
> titles as the user opens multiple tabs within the same window.

### Branding

When choosing the structure of a page title value there is a balancing act between displaying the
page information while maintaining our app's branding/identity.

### Page Title

The title of the page is the primary (most important) information describing the page's content. At
face value this should be the least likely thing to be truncated, however we need to consider the
potential for long page titles, and how they'll impact adjacent information to the right in terms of
truncation.

### Browsing Context

We need to maintain the context of page. Currently this means retaining the current Organization and
Space information (when applicable). This is particularly important as customers may have the same
space name within multiple organizations they have access to, so we need a point of differentiation.

For the purpose of context titling, we should be mindful of organization or space names being long.
Consideration into using the URL slug or an alternate abbreviation should be considered. e.g. If the
organization is 'British Broadcasting Corporation' we'd expect 'BBC' to be displayed. Casing of the
context information should also be considered if we choose to use the URL slug.

### Separators

To split up the different pieces of information within the title we can use a hyphen `-`, bullet
`·`, semicol `:`, slash `/`, pipe `|`, or a combination of multiple.

### Industry Examples

We can compare the market to give us insight into how we should structure our titles.

| Product              | Pattern                                                | Example                                                                        | Notes                                                                        |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Presentation Manager | Product Name                                           | Massive AXIS                                                                   | No dynamic page title. _Whoops!!_                                            |
| Jira                 | [ProjectKey-ID] Page Title - Product Name              | [ABC-123] As a User I can do a thing - Jira                                    | Context is retained succinctly through their project key prefix              |
| Confluence           | Page Title - Space Name - Product Name                 | Data Formatting Rules - App Curator - Confluence                               | Brand last. Hyphens used for all separators                                  |
| Bitbucket            | Org / Space / Page Title: Content Title - Product Name | appcurator / web / Pull request #123: PR Description — Bitbucket               | Very verbose. Content title at risk of being lost through truncation         |
| Github               | Content Title - Page Title - Org/Space slug            | As a User I can do a thing · Pull Request #123 · massiveinteractive/appcurator | Github don't include their brand within the title. Context info is last      |
| Github               | Page Title at Parent · Org/Space slug                  | path/to/File at master · massiveinteractive/appcurarator                       | Sub-context is afforded via "at master". Bullets and 'at' used as separators |
| Trello               | Content Title \| Product Name                          | Reference Apps High Level Stats \| Trello                                      | No Parent Context provided. Branding last. Pipe separator                    |
| Gmail                | Page Title - Context Info - Product Name               | Order #123 is Confirmed! - person@gmail.com - Gmail                            | Brand last. Hyphens used for all separators                                  |
| Axure Share          | Page Title                                             | Teammates                                                                      | Minimalist. No context nor branding                                          |

## Decision

Constructing our page title is dependant on the parent context hierarchy. Certain pages are agnostic
of an organization or space, so won't display that information.

**We have favoured displaying the space context as the first piece of information, followed by the
page title, then the organization parent context, and finally our branding.**

We have chosen to move our product name to the very end of the page title. This means it is the most
likely part to be truncated, however that's acceptable because we retain our branding via the app's
favicon. This is a comment trend in the industry.

We consider the page title to be the most important information, thus it is towards the front,
however we're weary of long titles pushing important context information past the truncation point.
That's why we've chosen to keep the parent context as the first item.

Our use of separators should be consistent regardless of how much context information is available
within the page title.

- We have chosen to separate the product name from the adjacent content using a hyphen `-`.
- The parent of the page will be separated using a semi-colon `:`. This is conditional based on
  browsing context.
- The grandparent of the page (when applicable) will be separated using a pipe `|`.
- User provided labelling should be quoted when complimenting page tiles `''`.

### Examples

| Path                                              | Title                                                    |
| ------------------------------------------------- | -------------------------------------------------------- |
| /account                                          | Account Details - App Curator                            |
| /organizations                                    | Organizations - App Curator                              |
| /bbc                                              | BBC: Dashboard - App Curator                             |
| /bbc/space/create                                 | BBC: Create Space - App Curator                          |
| /bbc/space/cbeebies                               | CBeebies: Dashboard \| BBC - App Curator                 |
| /bbc/space/cbeebies/developer                     | CBeebies: Dev Portal \| BBC - App Curator                |
| /bbc/space/cbeebies/audience/segment/abc123/reach | CBeebies: Audience Reach 'Boys 0-2' \| BBC - App Curator |

## Consequences

Dynamic page titles will empower our users with the knowledge of which page they're viewing for
users who have multiple tabs or windows open. _Our users expect this as they traverse our
application._

We'll need to pay close attention to the length of our Organization and Space context values as to
wether they remain appropriate in their current positions over time.

We can evolve this over time. It's trivial to change page titles and it has no impact over pathing.
