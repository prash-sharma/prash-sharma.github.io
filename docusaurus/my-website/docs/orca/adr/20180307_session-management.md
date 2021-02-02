---
id: "session-management"
hide_title: true
---

# Session Management

## Status

accepted

## Context

Our API requires a user session management system to enforce permissions based access to the Orca
API from web clients.

This system must provide a secure means of authenticating and authorizing the user, maintaining a
trusted session between their browser and Orca services.

Following a popular authorization specification is preferred so we can leverage existing tools and
be less likely to make security oversights.

Within the bounds of good security, we should try to minimize the need to read from a session
database per Orca request. This should help reduce latency.

## Decision

Behind the Orca service we'll stand up an Identity Service (IS). This will be responsible for
issuing JWT access tokens based on a user's credentials.

The `IS` will follow the [OAuth2 Resource Owner](https://tools.ietf.org/html/rfc6749#section-4.3)
flow when issuing these tokens.

Users of the website will POST their credentials to Orca. Orca will then forward them to the `IS`,
along with a `ClientId` and `ClientSecret` only it and the `IS` share.

Assuming valid credentials, the `IS` will then issue a [JWT](https://jwt.io) access token along with
an opaque refresh token to Orca.

Orca will store the refresh token in [Redis](https://redis.io). The key for the entry will be the
MD5 of the access token. The entry will have a time-to-live (TTL) set to the the maximum period a
user can be away from the site before being forced to sign-in again. IS should set the refresh token
to have a longer lifespan than this.

The access token will be issued to the client in a secure (HTTPS), HTTP only (not accessible to
JavaScript) HMAC signed cookie. This cookie will also be locked down to the `*.mtribes.com` domain.
The lifespan of this cookie will be set to a slightly shorter lifespan than the `redis` TTL.

Each subsequent call to Orca from the browser will include this cookie. Orca will inspect it to
determine if the access token has expired, or if it will expire soon. If not then it will be
forwarded as an `Authorization: Bearer <access_token>` header to all backend services.

If the access token has expired or is about to expire then Orca will check `Redis` for a refresh
token. If one is found then a call will be made to `IS` to obtain a new access token and refresh
token with this refresh token.

If successful the old `Redis` entry will be removed and the new one added with the updated refresh
token. The access token will be passed to the backend service(s) completing the original request,
and then sent back as an updated cookie in the response.

If unsuccessful or no refresh token is found then an error should be returned to the client stating
they are unauthorized to access the resource requested. The client can then prompt them to sign-in.
This error state should also expire any existing auth cookies.

When issuing a session cookie, a sister cookie will also be issued with the same lifespan. This
cookie will be unsigned and accessible to JavaScript so should contain no sensitive information.
It's main purpose is to provide an active session hint to the client. Note that this cookie is
purely for clients. Orca will only ever inspect the signed cookie containing the access token.

The use of cookies brings with it the risk of
[cross-site request forgery](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>)
(CSRF). We need to put the
[necessary steps](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet>)
in place in both Orca and the web app to ensure this is not exposed.

When a user signs out their session and its sister cookie are expired and any associated `Redis`
entry deleted.

There is a more secure option of storing both the access token and refresh token in `Redis` and then
issuing a signed opaque session token in a cookie. While this would mean that a session cannot live
beyond the point of sign out (an access token can given it has an internal lifespan), it would
require a `Redis` lookup on every request. Based on our choice of secure cookies to house the access
token we feel that the pros of storing the access token in the cookie outweigh the cons.

## Consequences

By storing the access token in a secure cookie we can prevent JavaScript from accessing it, which
removes an attack vector vs the web app holding it in local storage.

Cookies also allow us to manage token refresh from the server without exposing the refresh token to
the client. This is good for security as refresh tokens shouldn't be issued to clients such as
browsers that are unable to store secrets securely. It also removes the need for the web app to
handle the retry flows around token refresh.

JWT's can be large so we'll need to try and keep the JSON body of the access token small to limit
the overhead of passing it around.
