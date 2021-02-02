---
id: "local-server-http2-https"
hide_title: true
---

# Local Server HTTP2 + HTTPS 🔑

## Status

accepted

## Context

We want to replicate our production setup as closely as possible when developing locally to minimize
variation between what we build and what we deploy. This reduces the chance of bugs being missed.

For our deployment environments the plan is to have a different top level domain for different
stages of environments.

Here's an examples of how this _may_ look when hitting the web interface across these environments.

```text
https://my.1.appcurator.io	// dev 1
https://my.2.appcurator.io	// dev 2
https://my.appcurator.qa	// qa
https://my.appcurator.com	// prod
```

## Decision

For local development we're currently running on localhost over http.

```
http://localhost:3000
```

To map more closely to our environment setup we'll change local development to run on the following.

```
https://appcurator.dev:3000
```

This involves generating and installing a local trusted certificate and also adding `appcurator.dev`
to the `hosts` file so it will target localhost.

The library [devcert](https://github.com/davewasmer/devcert) may be a useful tool to help with this.

We'll also want to switch to use a `http2` server. Node 9x does support http2 but that's not yet
stable so not what we'd be deploying with. Running the Node version locally that we run in
environments is important so we'll likely use [spdy](https://github.com/spdy-http2/node-spdy) in the
meantime for http2.

## Consequences

These changes should help when targeting Progressive Web App related features in the future,
including service workers, offline mode, http2 push and others. It may also help when testing
security features like Content Security Policies and secure cookies.

Orca will need an update to allow traffic from `appcurator.dev:3000` or the locally run website
won't be able to access it.
