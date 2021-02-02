# Dev Guide

Orca uses the [Apollo Server](https://www.apollographql.com/docs/apollo-server/) library to manage
query processing and resolving.

## Schema

Queries that are sent to Orca can take any form which is valid according to the schema. The schema
is defined across multiple files with the `.gql` extension in the `src/types` directory.

Every type or entity such as `Account` or `Organization` is defined in a separate `.gql` file, along
with the queries and mutations which relate to that type such as `getAccount` or
`updateOrganization`.

We use [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas) to gather all of the
types defined across these files and output a single merged type definition for the entire schema to
`src/typesDefs.js`.

This is then provided to Apollo during initialization of the server along with our resolver
implementations.
