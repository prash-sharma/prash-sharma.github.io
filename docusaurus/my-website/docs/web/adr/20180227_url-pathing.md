---
id: "url-pathing"
hide_title: true
---

# App URL Pathing

## Status

accepted

## Context

To improve the customer and user experience as they traverse through the layers & sections of our
application and platform we should consider **shorter, user friendly (readable) URLs**.

These URLs will need to support **deep linking** so that members of an organization can share urls
between themselves.

> URLs should follow our Branding Guidelines and Voice & Tone Guidelines for terminology within the
> paths.

Please read the [URL Pathing research](../research/url-pathing.md) to learn about the various
options available.

## Decision

We have decided to use organization & space names instead of IDs when representing orgs/spaces
within our URLs.

Additionally, we have decided to use short ids for organizations. When creating an account and
initial organization simultaneously during registration we will use as a temporary
[slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) (the org id) prior to onboarding, where a user
will choose/set their desired slug.

We have decided not to include an `/org/` prefix before the org slug. It is considered redundant.
However, maintaining the `/space/` prefix before the space slug was decided to future proof us, for
if we introduce additional contexts within the organization level in the future.

Where it makes sense abbreviations can be used in our paths (e.g `/org/` instead of
`organization/`).

Although Organization sub domains are aesthetically pleasing the overhead needed to manage them
outweighs their usefulness at this stage. Because a user may be a member of multiple organizations,
the necessity of changing sub domains when switching between organizations, or to access your
personal account details would be considered jarring.

**We will instead stick to organization folder paths at the root level.**

Here are some example URLs using this proposal:

| Context        | URL                           | Description                          | Notes                                                                                                  |
| -------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Registration   | `/join`                       | Agnostic of organizations and users. | Anonymous users.                                                                                       |
| Authentication | `/sign-in`                    | Agnostic of organizations and users. | `""`                                                                                                   |
| Help           | `/help`                       | Agnostic of organizations and users. | Anonymous or Authenticated users.                                                                      |
| User           | `/account`                    | Account dashboard                    | No need to see your own profile id in the path. Inferred through authentication.                       |
| User           | `/account/settings`           | Account settings                     | Nested pathing works fine.                                                                             |
| Organization   | `/org/create`                 | Org creation                         | Create a new organization (when a user already exists). _org path reserved_. Needed to give context.   |
| Organization   | `/bbc`                        | Org dashboard                        | Organization IDs are hidden in favour of unique names across the platform.                             |
| Organization   | `/bbc/settings`               | Org settings                         | Space agnostic pathing works fine.                                                                     |
| Organization   | `/bbc/billing`                | Org billing                          | `""`                                                                                                   |
| Organization   | `/bbc/members`                | Org member management                | `""`                                                                                                   |
| Organization   | `/bbc/invite?token=abc123`    | Org member management                | `""`. Potential for opaque invite token where org id is referenced via url association instead of JWT. |
| Organization   | `/bbc/member/{memberId}`      | Org member management                | Managing pending/accepted state. Email, name, etc.                                                     |
| Space          | `/bbc/space/create`           | Space creation                       | `""`. The space path is reserved. Needed to give context.                                              |
| Space          | `/bbc/space/britbox`          | Space dashboard                      | Like with orgs, the space name is used instead of the id. Additional overhead of name => id lookup.    |
| Space          | `/bbc/space/britbox/settings` | Space settings                       | Nested pathing works fine.                                                                             |

## Consequences

This will allow our users to share their urls with other team members to aid in collaborative
authoring and maintaince of their content.

This proposed structure ensures the urls remain human friendly. The key hierarchy information
remains succint and is less likely to be truncated by short browser address bars.

By choosing to include the organization & space name within our pathing we have added a level of
complexity by requiring our platform to maintain and reserve unique names for each customer
(_"first-in-first-served"_) to allow differentiation when we have two customers with the same name
(e.g. different counties/regions), or if they try to create two spaces with the same name.

- Reservation of slugs for organizations will be enforced as unique across the platform.
- Reservation of slugs for spaces will be enforced as unique across their parent organization.
- Different organizations can use the same space slugs due to sandboxing.

By choosing not to include an `/org/` prefix we'll need to reserve our own preferred names for any
platform services to avoid naming clashes with the organization name wildcard at the top level path.
This will apply at any depth that chooses to use a wildcard path (e.g. spaces).
