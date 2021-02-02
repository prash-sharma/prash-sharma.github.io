---
id: "service-error-tracking"
hide_title: true
---

# Service error tracking

## Status

accepted

## Context

We've found that it has been difficult to identify the exact source of errors in our system.

Whenever Orca returns an error response there isn't any information returned in the response about
the exact service calls which have failed, either HTTP or gRPC. This was intentional for security
reasons, as it's generally a bad idea to expose the internals of a system.

Also when browsing the logs not much information is given about exactly which services or endpoints
are failing.

## Decision

We'll modify where and what we log, and what we return in error responses to make it easier to
identify the source of errors.

Using a new env variable `SERVICE_ERROR_DETAILS` we can optionally include additional information in
responses in development environments only.

In production this should always be false so that we don't expose internal information about our
services.

Additionally we'll reduce noise and duplication of information that we currently have in our logs,
and include more contextual information to help describe the source of errors.

Errors may either be triggered by failed service calls, or runtime errors within Orca itself.
Depending on the source of the error we'll include different additional information in responses and
error logs.

### Internal runtime errors in Orca logic

These are caused by any code executing inside resolvers, service handlers or response
formatters/utilities. We log out stack traces and return stack traces in the graphql response for
any errors triggered by internal errors in Orca. To reduce noise we only include the first 5 entries
of the stack.

For example an error response might look like:

```json
{
	"errors": [
		{
			"message": "Cannot set property 'name' of undefined",
			"status": 500,
			"type": "ServiceError",
			"data": {
				"path": "login",
				"stack": "TypeError: Cannot set property 'name' of undefined\n    at .../src/resolver/authResolver.js:8:4\n ..."
			}
		}
	],
	"data": {
		"login": null
	}
}
```

And logged to console like:

```
[67120636809] ERROR:
msg: "Cannot set property 'name' of undefined"
x-correlation-id: "8560b3e6-209a-41c6-9d4f-9dcd716ed196"
@x: "TypeError: Cannot set property 'name' of undefined\n    at .../orca/src/resolver/authResolver.js:8:4\n ..."
```

### Errors from failed HTTP/gRPC service calls

In error responses resulting from failed service calls we'll include additional information beneath
the `data` to describe the exact service and endpoint that was called and failed.

For example:

```json
{
	"errors": [
		{
			"message": "Request failed with status code 400",
			"status": 400,
			"type": "ServiceError",
			"data": {
				"path": "login",
				"service": {
					"name": "identityService",
					"protocol": "http",
					"url": "https://hub.mtribes.io",
					"endpoint": "POST /connect/token",
					"correlationId": "d1b38190-19e3-4b87-8c09-600350af22bc"
				}
			}
		}
	],
	"data": {
		"login": null
	}
}
```

The `service` details include:

- **name** - The name of the service which is defined during initialization of the HTTP or gRPC
  client.
- **protocol** - Either "http" or "grpc".
- **url** - The base url of the service.
- **endpoint** - The specific endpoint called. For HTTP will be a path prefixed with request method
  e.g. `POST /connect/token` and method name for gRPC e.g. `GetCategories`.
- **correlationId** - The correlation id of the request is included so we can track the full life
  cycle of the request.

Errors from failed service calls are logged without a stack trace. Previously stack traces would be
logged regardless of the source of the error which led to a lot of noise.

Example HTTP error log:

```
[67129991365] ERROR:
msg: "http request error"
req_id: "a0953860-2204-44d4-8eb4-cb86c8a3db83"
req_headers: {
	"Accept": "application/json, text/plain, */*",
	"Content-Type": "application/x-www-form-urlencoded",
	"x-correlation-id": "a0953860-2204-44d4-8eb4-cb86c8a3db83",
	"accept-encoding": "gzip",
	"connection": "keep-alive",
	"User-Agent": "axios/0.18.0",
	"Content-Length": 104
}
method: "post"
status: 400
duration: 174
url: "https://hub.mtribes.io/connect/token"
service_name: "identityService"
service_url: "https://hub.mtribes.io"
status_text: "Bad Request"
error: true
```

Example gRPC error log:

```
[67130194665] ERROR:
msg: "grpc request error"
req_id: "af85ec22-1036-422d-bb9a-73d18154533b"
service_name: "segmentRulesService"
service_url: "hub.mtribes.io:7766"
method: "GetContextualProperties"
code: 13
status: 500
duration: 267
status_text: "cannot get contextual properties"
error: true
```

## Consequences

It should be much easier to debug and identify the source of issues. Graphql responses returned in
development environments will be more descriptive, but will be unchanged in production environments.
We will have improved logging in all environments to make it easier to process logs and extract
information about which services are failing.
