---
id: "content-security-policy"
hide_title: true
---

# Implementing a Content Security Policy on mtribes

## Status

accepted

## Context

Content Security Policy (CSP) is a computer security standard introduced to prevent cross-site
scripting (XSS), clickjacking and other code injection attacks resulting from execution of malicious
content in the trusted web page context. It is a Candidate Recommendation of the W3C working group
on Web Application Security, widely supported by modern web browsers. CSP provides a standard method
for website owners to declare approved origins of content that browsers should be allowed to load on
that website. Covered types are JavaScript, CSS, HTML frames, web workers, fonts, images, embeddable
objects such as Java applets, ActiveX, audio and video files, and other HTML5 features.

We currently use webslinger, a proxy to serve the content of the webapp contained within the
[~/server/](https://bitbucket.org/appcurator/web/src/master/server/) directory of this project. This
allows us to inject provisional HTTP headers when we serve the webapp.

We currently have an open `/csp-report` endpoint in orca which we have constructed to log all CSP
reports, towards which all CSP reports will be sent from the app.

## Resources

- [https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [https://developers.google.com/web/fundamentals/security/csp](https://developers.google.com/web/fundamentals/security/csp)
- [https://www.w3.org/TR/CSP3/](https://www.w3.org/TR/CSP3/)
- [https://websec.be/blog/cspstepbystep/](https://websec.be/blog/cspstepbystep/)
- [https://report-uri.com/home/generate](https://report-uri.com/home/generate)

## Decision

We will use the [helmet-csp](https://github.com/helmetjs/csp) library to structure our CSP headers,
as this is more maintainable than constructing raw strings ourselves.

We will initially implement `Content-Security-Policy-Report-Only` and `Report-To` HTTP headers in
mtribes to target the directives mentioned below. Rolling out in a "report only" phase initially
will allow us to gauge if our directives are too restrictive and identify any cases we've missed.
This "report only" phase will not block any content, but instead send reports to our reporting
endpoint and output warnings in the browser console.

Once we're happy that our directives don't hinder the user, we will change the
`Content-Security-Policy-Report-Only` to `Content-Security-Policy` effectively enforcing our
directives.

### Report-To HTTP header

This is a relatively new change to CSP. As the major browsers are beginning to roll out this new
mechanism of CSP reporting, it is recommended we utilise both the `report-uri` (the old reporting
mechanism) and `report-to` (the new reporting mechanism) directives.

This header's body should contain a JSON object detailing our reporting endpoint. For example:

```
{
	"group": "mtribes-csp",
	"max_age": 10886400,
	"endpoints": [
		{ "url": "https://example.com/reports" }
	]
}
```

### Directives

This section provides a proposal of which directives we intend to implement.

#### block-all-mixed-content

Prevents loading any assets using HTTP when the page is loaded using HTTPS. All mixed content
resource requests are blocked, including both active and passive mixed content. This also applies to
`<iframe>` documents, ensuring the entire page is mixed content free.

#### default-src

`'self'`

The default policy for loading content such as JavaScript, Images, CSS, Fonts, AJAX requests,
Frames, HTML5 Media. For each of the src directive types that are absent, the user agent will look
for the default-src directive and will use this value for it

#### script-src

`'self' third-party-vendor.io`

Defines valid sources of JavaScript. Here we will need to include our third-party scripts that we
use for analytics & feature flag management.

#### img-src

`*.astcdn.com images.unsplash.com`

Defines valid sources of images.

#### style-src

`'self', fonts.googleapis.com`

Defines valid sources of styles.

#### connect-src

`'self' client.mtribes.com *.launchdarkly.com *.fullstory.com`

Applies to XMLHttpRequest (AJAX), WebSocket or EventSource. If not allowed the browser emulates a
400 HTTP status code.

#### report-uri

Value to be determined upon the deployment location. See Reporting section above.

Instructs the browser to POST reports of policy failures to this URI.

The `report-uri` directive is being deprecated in favour of the `report-to` directive detailed
below. As `report-to` isn't fully supported in all browsers yet, we will include both directives for
now.

#### report-to

Value should reference the group name detailed in the `Report-To` HTTP header mentioned above.

Instructs the browser to POST reports of policy failures to this URI.

### Inline Scripts

We will need to run inline scripts used by vendors like Heap & Fullstory. To do this without
enabling `script-src 'unsafe-inline'` (& thus making our CSP redundant), we can validated the
scripts being run by either providing hash signatures of individual permitted script blocks. We can
also generate & inject a nonce for each script which will permit each inline script with a valid
nonce to be run only once per page load. We can generate both of these instruments (hashes & nonces)
using node's inbuild [crypto](https://nodejs.org/api/crypto.html) module.

We will need to add these values to the `script-src` directive, ie.

```
script-src 'sha256-blLDIhKaPEZDhc4WD45BC7pZxW4WBRp7E5Ne1wC/vdw=' 'nonce-123412341234'

```

Nonces, if used, will need to be injected into script tags so they're read by the browser. ie.

```
<script nonce="123412341234" />
```

Note that neither the CSP headers or nonces will be readable during js code execution on the client
side.

**Static generation vs. Per-request generation: **

To ensure these scripts can be altered as necessary in the web project & not be relying on static
hashes, we could integrate this into Webslinger's initialization sequence. However, as we cannot
rely on Webslinger being restarted every time we update the web project, this creates room for error
& unnecessarily couples the deployment of web with the operation of webslinger. **For Webslinger to
be serving unknown html content & still be injecting an effective CSP, it then becomes necessary for
us to inject script validation on a per-request basis**.

**Performance concerns:** Calculating sha256 hash signatures for scripts is a significantly heavier
operation than generating a nonce (say, a random 16 bit integer), so nonces are preferred if this
operation is taking place on a per-request basis.

## Consequences

Content Security Policy will be implemented for mtribes, making the application significantly more
resistant to XSS attacks thus improving security for our users.

This will occur in two phases, the first being a `report-only` mode. Once we are confident that the
CSP rules will not impair usage of mtribes, we will enforce our CSP & block the loading of unknown
resources within the application.

To monitor ongoing CSP violations, we will set up an alerting system (with Microsoft Teams or Slack
integration) in order to monitor violations which occur frequently so as to potentially whitelist
certain common third party extensions (such as password managers) & allow these to run within
mtribes.

**Potential Disruption:**

Once the `Content-Security-Policy` HTTP header is implemented, this could have a negative impact on
user experience blocking any content that was meant to be allowed but not allowed through the
directives. Ideally these will be caught in the initial phase and fixed in the directive before this
HTTP header is implemented, but there is the possibility for significant disruption to our users if
rollout is not handled carefully.
