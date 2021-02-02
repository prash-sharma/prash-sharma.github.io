---
id: "session-management2"
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

Behind Orca we'll stand up an Identity Service (IS). This will be responsible for issuing JWT access
tokens based on a user's credentials.

The `IS` will follow the [OAuth2 Resource Owner](https://tools.ietf.org/html/rfc6749#section-4.3)
flow when issuing these tokens.

Orca will persist user session data in [Redis](https://redis.io).

### Terms

#### Client ID

A client id a unique identifier issued in a long lived cookie the first time a client makes a
service request. An example of a client would be a specific browser on a device.

If a user clears their cookies then any existing client id would be lost. The next service request
would issue a new one.

Multiple users may share the same client (e.g browser) and therefore share a client id.

#### Session ID

The session identifier is what's used to recognize an active authenticated user session. It's issued
by Orca when a user logs in and then rotated at regular intervals during an active session lifespan.
If a session expires due to inactivity, so does their current session identifier.

When a new session identifier is issued during a session id rotation, the old one will be set to
expire shortly after (e.g. 10 seconds). This short delay avoids problems with the odd chance of
concurrent requests and is simpler than introducing more complex alternatives.

An active session id can be used to look up the `user id`, `client id` and `refresh token` for that
session.

```yaml
<session-id>: # TTL from issue: <idle-session-lifespan>
  userId: <user-id>
  clientId: <client-id>
  refreshToken: <refresh-token>
```

#### Access Token

During login Orca forwards user credentials to the ID service to obtain an `access token`.

The access token is short(ish) lived and must be passed to backend services as an
`Authorization: Bearer <access_token>` header during authenticated requests to prove access rights.

Orca will return the access token to the client as a secure cookie with a short(ish) lifespan (e.g.
10 mins), no longer than the access token lifespan itself.

#### Refresh Token

Together with an `access token` Orca also receives a `refresh token` from the ID service during
login.

The refresh token is long lived and used to obtain a new access token when a previous one expires.

For security the refresh token is stored against the session identifier server side and never
exposed to clients.

### Flows

#### Sign In

1.  Users POSTs credentials to Orca.
1.  If no client id cookie found generate and set a new client id cookie. Lifespan should be long
    (multiple years).
1.  Forward credentials to `IS`, along with a `IS Client Id` and `IS Client Secret` only Orca and
    the `IS` share.
1.  Assuming valid credentials, `IS` will issue a [JWT](https://jwt.io) `access token` along with an
    opaque `refresh token` to Orca.
1.  Set `access token` in a HMAC signed, secure (https only and not accessible to JavaScript)
    cookie. Set lifespan of cookie to whichever is shortest, either lifespan of access token or
    `<session-rotation-ttl>` (e.g. 10 mins).
1.  This access token is never stored by Orca, only passed to backend services on each authenticated
    request.
1.  Generate a random
    [cryptographically strong session identifier](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Session_ID_Properties).
1.  Extract the `user id` from the (JWT) access token payload.
1.  Add hash entry to Redis with `session id` as key and value as `user id`, `client id` and
    `refresh token`. Set time-to-live (TTL) of entry to `<idle-session-lifespan>` (e.g. 5 days).
1.  Issue session id in secure (https only and not accessible to JavaScript) cookie. Set lifespan to
    idle session lifespan.
1.  Issue a session marker cookie which is https only but accessible to JavaScript. This can be used
    by the web app to check if a session is active. Set lifespan to idle session lifespan.

#### Authenticated Request

##### Session id cookie doesn't exist

If no session id cookie exists assume user is not signed in and don't permit any authenticated
actions (http 401 response).

##### Session id and access token cookie exist

Reset session id and session marker cookies with idle session lifespan and continue with
authenticated requests, providing access token to backend service calls.

The updating of session cookies TTL ensures the session idle timeout is fully respected when a user
leaves the site.

##### Session id cookie but no access token cookie

If a session id cookie exists but not an access token cookie (i.e. it expired) then try and get a
new access token with a refresh token. We'll also rotate the session identifier at this point for
added security.

1.  Given the session id get refresh token from redis
1.  Call the ID server with the refresh token to get a new access token
1.  Set `access token` in a HMAC signed, secure (https only and not accessible to JavaScript)
    cookie. Set lifespan of cookie to whichever is shortest, either lifespan of access token or
    `<session-rotation-ttl>` (e.g. 10 mins).
1.  This access token is never stored by Orca, only passed to backend services on each authenticated
    request.
1.  Generate a random
    [cryptographically strong session identifier](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Session_ID_Properties).
1.  Extract the `user id` from the (JWT) access token payload.
1.  Set lifespan of old session id redis entry to 10 seconds.
1.  Add hash entry to Redis with `session id` as key and value as `user id`, `client id` and
    `refresh token`. Set time-to-live (TTL) of entry to `<idle-session-lifespan>` (e.g. 5 days).
1.  Issue session id in secure (https only and not accessible to JavaScript) cookie. Set lifespan to
    idle session lifespan.
1.  Issue a session marker cookie which is https only but accessible to JavaScript. This can be used
    by the web app to check if a session is active. Set lifespan to idle session lifespan.

If anything fails then log server error, sign user out and clear their session.

#### Sign Out

1.  Set all session cookies to expire
1.  Given session id cookie remove session state from redis.

### Notes

The use of cookies brings with it the risk of
[cross-site request forgery](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>)
(CSRF). We need to put the
[necessary steps](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet>)
in place in both Orca and the web app to ensure this is not exposed.

There is a more secure option of storing both the access token and refresh token in `Redis` and then
issuing a signed opaque session token in a cookie. While this would mean that a session cannot live
beyond the point of sign out (an access token can given it has an internal lifespan), it would
require a `Redis` look up on every request. Based on our choice of secure cookies to house the
access token we feel that the pros of storing the access token in the cookie outweigh the cons.

## Consequences

By storing the access token in a secure cookie we can prevent JavaScript from accessing it, which
removes an attack vector vs the web app holding it in local storage.

Cookies also allow us to manage token refresh from the server without exposing the refresh token to
the client. This is good for security as refresh tokens shouldn't be issued to clients such as
browsers that are unable to store secrets securely. It also removes the need for the web app to
handle the retry flows around token refresh.

JWT's can be large so we'll need to try and keep the JSON body of the access token small to limit
the overhead of passing it around.
