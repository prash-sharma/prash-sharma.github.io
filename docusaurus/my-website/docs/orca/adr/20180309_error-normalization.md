---
id: "error-normalization"
hide_title: true
---

# Error Normalization

## Status

accepted

## Context

Front end clients communicating with the GraphQL layer will need consistently formatted, machine
readable errors, which can be easily parsed and the relevant information extracted and presented in
the UI.

By default Apollo reports errors with a single message, which can be descriptive however not
particularly machine readable, for example:

```javascript
{
	message: 'User with Id 0 not found',
	locations: [
		{
			line: 2,
			column: 3
		}
	],
	path: [
		'getAccount'
	]
}
```

Information from service errors is lost such as any validation errors, service error codes and http
status code such as 400, 404 etc.

## Decision

Using the
[formatErrors](https://www.apollographql.com/docs/apollo-server/setup.html#graphqlOptions.formatError)
hook from apollo-server, we'll extract information from all errors thrown and normalize them into
consistent and well formatted errors to be returned in the response.

Errors will be formatted like:

```javascript
{
  message: 'The request is invalid.',
  status: 400,
  type: 'ServiceError',
  data: {
    path: 'createFoo',
    code: 4002,
    validationErrors: {
      name: 'name is invalid.'
    }
  }
}
```

- message - A human readable description of the error.
- status - The HTTP error status code
- type - The type of error thrown. Can be one of:
  - "QueryError" - The query sent in the request is invalid or doesn't conform to the schema.
  - "ServiceError" - Error occurred in external services triggered by a HTTP request.
- data - Optional additional data describing the error. Can include the following properties:
  - path - The path of the query that was executed.
  - code - The system error code relating to the service error.
  - validationErrors - A dictionary of error information relating to specific fields.

## Consequences

Overriding the default error handling behaviour of apollo is necessary so that we can normalize
errors returned to the client.

By using the `formatErrors` hook we can apply error formatting in a single place without the need to
manage errors at every service call or within resolver logic.

Having consistent errors will make it easier to handle errors within the client, and also make it
easier to identify the exact cause of errors.

Identifying QueryErrors will make it easier for developers writing queries to know when there is an
issue with their queries rather than the server.
