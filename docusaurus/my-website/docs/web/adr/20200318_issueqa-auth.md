---
id: "issueqa-auth"
hide_title: true
---

# issueqa auth

## Status

proposed

## Context

To make testing and code review easier, we build and deploy our branches so we don't have to check
out the branch code and then test locally.

Every branch has a custom domain e.g `https://squad-insquadnito.web.mtribes.dev` and our current
auth implementation requires domains to be whitelisted before they can be authenticated. To get
around this limitation, in development we will use a different auth flow which allows for domains to
be authorised.

## Decision

For branch builds we will use the `password` grant type (Resource owner flow), which will let us get
an `access_token` from the identity server without having to whitelist domains. This flow is a
little less secure, but being this is only for a dev environment none of the content is sensitive.

To make this work, in issue-qa we serve a basic sign in page which lets you sign in to our identity
server and get and `access_token`. Once we have the `access_token` we then mimic what our standard
auth flow does by setting 2 cookies in the browser (`mt_mk`, `mt_sid`). The `mt_sid` cookie will
contain the access token. Each request to our api is funnled through a proxy which will read the
`mt_sid` cookie and update the headers to send the `access_token` via the
`Authorization: bearer xyz` header.

## Consequences

We will be able to login and have an authorisation token on our branch builds, we won't be able to
test proper auth flow on the branches but everything else will be as is in other environments.
