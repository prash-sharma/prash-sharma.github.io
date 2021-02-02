---
id: "apollo-cache-ttl"
hide_title: true
---

# Apollo Cache Time-To-Live (TTL)

## Status

accepted

## Context

Some queries are rather expensive calls to our back-end services. Some of these queries may not
require a network request each time a user may visit a page or perform some action that may trigger
a query for more data, such as opening a Scenario, or navigating to a page that requires some
configuration in order to load the page.

Performing multiple unnecessary network requests can cause a lot of strain on the services and may
slow the UI and affecting the users experience negatively

## Decision

As mentioned [here](https://github.com/apollographql/apollo-cache-persist/issues/53) 
cache invalidation isn't supported out of the box with the current version of Apollo (v2.4),
so we will roll our own approach by implementing a cache TTL strategy thats used to determine 
whether a query should be fulfilled by a network request or fetched from cache.

A cache TTL value will be specified in milliseconds provided within the `context` 
[prop](https://www.apollographql.com/docs/react/v2.4/essentials/queries/#props) 
available on the Query component, with the key `cacheTtlMsec`.

```javascript
<Query context={{ cacheTtlMsec: 86400000 }} fetchPolicy="cache-and-network" />
```

This `context` [object](https://www.apollographql.com/docs/link/overview/#context) 
is accessed from within a custom ApolloLink instance. ApolloLinks are designedso we can create 
complex control flows of data. 
More info about Apollo Links can be found [here](https://www.apollographql.com/docs/link/overview/)

The `ApolloCacheTtlLink` will store unique operation keys with timestamps of the last time a network
request has been made.

This allows us to check the `context` object of each query operation to see if the cache TTL has
expired, if it hasn't expired then we prefer the cached result, and skip the network request.

#### How long to set a Cache TTL

We don't always want to set a TTL for every query, we should prefer to set a TTL for data that will
change infrequently, or predictably. 
	
* Configuration data is often a good candidate for a cache TTL as the data is not expected to 
	change often. 
* Data aggregated periodically, or metrics relating to a specified span of time,
	may only need to be fetched when there may be new data available.
	

## Consequences

Required thought relating to the appropriate TTL values for a given query. Minimize backend service
workload by reducing the number of network requests. Improve perceived performance for the user by
reducing or eliminating load times.
