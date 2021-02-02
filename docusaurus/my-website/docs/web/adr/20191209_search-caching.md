---
id: "search-caching"
hide_title: true
---

# search-caching

## Status

Accepted

## Context

When users are searching through potentially large datasets for specific information, they need to
query backend services. This costs time & results in extra load, increasing operational costs &
dwindling customer patience with our otherwise delightful product.

This proposal is a simple caching utility to supersede `SimpleCache` & standardize the fashion with
which we perform search caching from the webapp.

### Requirements:

- Cache must be universally accessible (ie. Apollo-Cache or a global object)
- Allow multiple instances of a search on one page, accessing same cache
- Cleanup of cache must be easily triggered, if not automatically when no search instances rendered
  on page.
- Limit number of searches cached
- Prevent premature queries for user when they're typing (ie. debounce pattern)
- Avoid refetch of data if current data exists in cache
- If search results empty but increase in specificity, assume no results

## Decision

```
const rootCacheObject = {
	[searchName]: {
		instances: 1,
		queries: [
			{
				variables: {
					keyword: "a search query"
				},
				data: {...},
				...
			},
			{
				variables: {
					keyword: "another search query"
				},
				data: {...},
				...
			}
			...
		]
	},
	[searchName2]: {
		instances: 3,
		queries: [
			{
				variables: {
					search: "query1"
				},
				data: {...}
			},
			{
				variables: {
					search: "query2"
				},
				data: {...}
			}
			...
		]
	}
}
```

useSearch hook utilizes a global object, where multiple instances of a search type can point to the
same part fields in the object. When a new instance of a search is added to the page, the instance
count increases by one. When the last instance of a search is removed from the page, that specific
search type is purged. This prevents the cache falling out of sync with more current data as we only
cache what's being used within an individual view. We can specify a limit as to how many searches we
want to cache per search type, defaulting to 10 if unspecified.

## Consequences

Our current usage `SimpleCache` needs to be marked as deprecated as we impliment the `useSearch`
hook for our searches.
