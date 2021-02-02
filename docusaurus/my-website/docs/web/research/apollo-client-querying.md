# Apollo Client Querying

Below are some findings about how Apollo Client behaves in different scenarios. We should be aware
of these behaviors to better understand how we can optimise queries sent from the client.

#### Query Deduplication

If two components mount at the same time and each queries for the exact same properties on the same
type then only one query will be sent. This is enabled by default as described
[here](https://www.apollographql.com/docs/react/basics/network-layer.html#query-deduplication)

#### Query Batching

If two components mount at the same time querying for different things then those different queries
will be sent together in single HTTP request in a
[batch](https://www.apollographql.com/docs/react/basics/network-layer.html#query-batching). Enabled
by using [apollo-link-batch-http](https://www.npmjs.com/package/apollo-link-batch-http).

#### Query Merging

If two components mount at the same time and one queries for A { X } and the other queries for A {
X, Y }, two individual queries will be sent in a batch. Despite the fact that first query is a
subset of the second, Apollo client does not merge these queries into a single one for A { X, Y }.
The same applies for two concurrent queries for A { X } and A { Y }. On Orca side this results in
two identical requests to the same microservice.

#### Partial Cache Matches

Queries are executed against the cache first. If all properties being selected for can be resolved
from the cache then no request has to be sent to Orca (unless you specify a different
[fetch policy](https://www.apollographql.com/docs/react/basics/queries.html#graphql-config-options-fetchPolicy)
in the query options). However, if even 1 property in the query isn’t resolvable in the cache then
the entire query is sent off, instead of a query for only those properties which aren't cached. This
has been raised in [this issue](https://github.com/apollographql/apollo-client/issues/2977).

#### Rendering Partial Cache Results

A component will not render with partial results from cache before receiving complete results. E.g.
if a component mounts querying for A { X, Y, Z } and Z is not available in the cache, the query will
be sent off and no data will be fed into the component until the query is complete. It does not get
provided with partial data for X and Y from the cache. This is discussed
[here](https://github.com/apollographql/apollo-client/issues/2425)

### Final Thoughts

We may choose to write some of our commonly used queries in shared, and re-use them across
components, therefore ensuring they are identical and will be deduplicated. This however could mean
some components which re-use these queries will request data they don't need. This approach would
only be beneficial in scenarios where multiple different components are known to always mount at the
same time and query for different bits of information from the same entity. For example on an item
detail page designed with sub components which render different pieces of the information for the
same item.

In general, the cleanest implementation would be to tailor queries for each component, and to select
for only those properties necessary for that particular component. This keeps the concerns for that
particular component encapsulated, easy to understand and maintain.
