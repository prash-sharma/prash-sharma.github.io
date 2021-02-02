---
id: "development-auth"
hide_title: true
---

# Development Auth

## Status

proposed

## Context

To develop locally we need to be able to authenticate with the identity service locally. Mtribes
uses the [Authenticator Code Flow](https://oauth.net/2/grant-types/authorization-code).

There are 3 scenarios where we want to develop.

1. We run web locally and connect to orca in the cluster.
2. We run web and orca locally and connect to the services in the cluster.

## Decision

The problem with local development between both and web and orca is we don't have an Istio adapter
in place to act as client when performing the auth check. To fix this we can write a small openid
client as part of the dev server in the web app which plays the part of the client in the auth flow.

We'll be adding 2 new endpoints in the web app development server.

1. `/login`
2. `/cb`

So in theory when we want to login to local environment, we go to `https://mtribes.local:3000/login`
this will essentially return a redirect to `https://id.mtribes.dev/sign-in` we sign in here as
normal and then get redirected back to `https://mtribes.local:3000/`. As part of the last redirect
we set the `mt_mk` cookie and another session cookie `mt_sid` which the local client can use to
identify the logged in user for requests to Orca.

When the above is all completed we will have the the users tokens and we will store them in a JSON
on the fill system (`.config/mtribes/mtribes.dev.json`). Then on each request to Orca we fetch the
access token using the session cookie and attach the `Authorization` header on each request.

On initial login we will include the offline claim and get back a refresh token. We then persist the
refresh token in the config directory (`.config/mtribes/mtribes.dev.json`) and then on startup we
use the refresh token to get a new access token in the background.

Additionally when developing against orca in dev, orca will be left unsecured so that all requests
can pass through the adapter to orca, we will still need to log in to get an access token to pass
along on all requests, istio just won't try and verify requests going into orca.

## Consequences

We will be able to develop running both orca and web locally.
