---
id: "sub-resource-integrity-checks"
hide_title: true
---

# Sub Resources Integrity Checking (SRI)

TLDR: We serve most of our content internally - if we need to check those resources, we've already
been owned. Still; there are a few fixed version scripts that we ought to check for validity.

## Status

accepted

## Context

As described in the [W3C Subresource Integrity Specification](https://www.w3.org/TR/SRI/),
sub-resource integrity checks ('SRI') are carried out within the browser, comparing the contents of
external resources (css, javascript) against a pre-defined hash of their contents, to validate that
this has not been altered in transit or at the source, acting to mitigate
[Cross Site Scripting attacks](https://www.hacksplaining.com/exercises/xss-stored/).

SRI has so far been implimented across all modern web browsers, bar Safari for IOS where it is still
an experemental feature (as at 10/10/2018).
[CANIUSE report on Subresource Integrity](https://caniuse.com/#feat=subresource-integrity).

For browsers that don't (& probably never will) support SRI (IE, Opera; both out of scope), a simple
polyfill such as that implimented by
[sub-resource-integrity-4-all(https://github.com/melletron/sub-resource-integrity-4-all) can be
used.

#### How to do

SRI is implimented using an additional fields in the HTML <link .../> and <script .../> tags, which
include the hash of the original file.

```
<script src="//some-external-source.ru/script.js"
    integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb"
    crossorigin="anonymous"
></script>

<link rel="stylesheet"
    integrity="sha256-DroBL/a1rdlbFF1lBG9alTNaqVY98/eiuesdqBBVDyo="
    data-sri-href="//some-external-source.ru/stylish.css"
/>
```

These hashes can be generated like so (on unix based machines):

```
curl https://third-party-cdn.com/resource.js -s | openssl dgst -sha384 -binary | openssl enc -base64 -A
```

We would likely automate this process using a webpack plugin, such as Note that the hashes of
minified files vary from their pretty white-space inclusive counterparts.

## Decisions

The purpose of SRI is to mitigate the effect of man-in-the-middle alterations & sourcing of
scripts/styles from compromised third parties. Seeing as our content is served via HTTPS from our
own servers, there is no immediate need for us to impliment SRI within our application. If we need
to validate the scripts we're serving from port 443, we've been fully owned & have bigger problems
than checking our resources. Besides, checking our own resources defeats the purpose of SRI as an
adversary could simply update their integrity hash in the markup to match their scripts. While we
need incident response plans in place & must preempt these kinds of events, there is no reason we
should neglect the use of SRI checks when importing third party scripts to our applications at
runtime.

The primary issue with implimenting SRI with third party scripts is that they are often 'rolling
release' rather than fixed versions, so there is no guarantee that we will be validating the same
script. Thankfully our use of third party CDNs is pretty minimal, & we're currently using fixed
versions for stability reasons.

#### Current third party scripts, as at 10/10/18

Can use SRI:

- Google Tag Manager
- Intercom widget

Can't use SRI:

- Polyfill.i0 (dynamic script based on user agent)
- FullStory (rolling release)

As we have fixed versions of both the Intercom widget & Google Tag Manager, a simple solution is to
manually add this to the markup of our application & update these as is necessary. This won't work
for automated builds.

The more comprehensive solution is adding a task to our production Webpack build process, where we
retrieve all fixed-version third party scripts, calculate their hash values & inject them into the
base markup. There's already a plugin for this:
[webpack-subresource-integrity](https://github.com/waysact/webpack-subresource-integrity) which adds
a whopping 37.1 kB to our dev dependencies (if minified), though this will take some work to
configure.
[Metrics on BundlePhobia](https://bundlephobia.com/result?p=webpack-subresource-integrity@1.1.0-rc.7)

The computations involved for checking validation hashes at runtime should be relatively cheap,
though this remains a factor.

## Action

On principle, SRI is something we should impliment where we can. While there aren't too many
examples in the wild of supply-chain attacks involving cdn's, the risk is very real & it is
irresponsible to rely on the security of third party services when we have the potential to validate
the content before it effects our users.

For now, we will defer this task until we've developed a CSP & are closer to going live.

## Consequences

1.  Our Webpack configuration will grow
1.  Users will be more secure
1.  Worst case scenario: We have blind spots in our analytics//feedback loops
