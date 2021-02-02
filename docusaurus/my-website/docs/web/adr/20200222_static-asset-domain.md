---
id: "static-asset-domain"
hide_title: true
---

# Static Asset Domain

## Status

accepted

## Context

When loading static assets like bundled javascript files we have no need to send cookies in each of
those requests. These add baggage as they're not compressed, even in most current http 2.0
implementations.

More significantly, CloudFront our CDN provider requires cookies to be whitelisted to allow them
through to an origin server. By whitelisting, the key and value of each cookie becomes part of a CDN
cache key for any request containing them. This includes static assets which are not meant to be
user specific. This can reduce CDN cache hits significantly and make them tied to individual users.

[Best practice](https://developer.yahoo.com/performance/rules.html#cookie_free) mandates to offload
static assets to a separate domain so cookies issued from the primary domain are never transmitted
when loading these assets.

Static assets usually have a long cache control lifespan vs our html pages which have no-cache
policy to ensure the latest version is always returned.

## Decision

We'll follow the pattern we have in place for loading static images from our Hubble service and
target the loading of generated website assets through the following domain.

```
https://<subdomain>.astcdn.com/<asset-path>
```

We'll use CloudFront to direct requests to either Hubble or fallback to load website assets from an
S3 bucket given the following path behaviors.

- `/img/*` - any asset path beginning with `/img/` will be routed to Hubble
- `/*` - all other assets requests will route to the root of our webapp S3 bucket

During deployment of our web app we'll bake the asset base URL for the target environment into our
html page. The webapp will then prefix asset paths with this URL when loading assets.

## Consequences

Reduce unnecessary transmission of uncompressed cookies with every static asset request.

As we don't need to whitelist cookies for the asset domain the CDN cache hits should increase
significantly.

Remove the need to proxy all static assets through our servers and instead serve them direct from S3
via CloudFront.

`Webslinger` will just be responsible for serving an html page and root level assets such as
`robots.txt`, `favicon` and `manifest` file. This should simplify its responsibilities and hopefully
its logic.

Using a static asset domain, which requires no real security, allows us to customize our primary
domain's security policies (WAF etc) without having to consider the impact to static assets.
