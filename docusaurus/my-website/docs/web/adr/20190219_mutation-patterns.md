---
id: "mutation-patterns"
hide_title: true
---

# Mutation Patterns

## Status

accepted

## Context

There are a few common problems we encounter whenever writing mutations:

1. We add a lot of baggage to our components by introducing handlers for errors / completion, logic
   for optimistic cache updates, and cluttering JSX with `<Mutation>` components.
1. Every time we wire up a new mutation we have to write a lot of boilerplate code to perform common
   behaviours like:
   - Displaying a confirmation modal before proceeding
   - Executing the mutation
   - Controlling mutation execution order/queing
   - Optimistic cache updates
   - Raising success or error notifications
   - Redirecting to a new page on completion

## Decision

We'll create a re-usable utility (`withMutation`) which effectively extends the `graphql` HOC from
Apollo with some additional configuration options. These configuration options will allow us to
easily and concisely apply behaviours specific to our application like confirmations, cache updates,
raising notifications and redirects.

When given a set of configuration options, the `withMutation` function returns a HOC function which
can then be composed onto any component. A component which has the HOC applied will have a function
passed through props which can be invoked to trigger the mutation.

Example usage:

```javascript
export default withMutation({
  // name of the function that will be provided via props to the wrapped component
  name: 'updateEntity',

  // gql schema definition of the mutation
  mutation: gql`
    mutation updateEntity($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
          entity {
            id
            name
          }
        }
    }
  `,

  // configuration for the modal to display prior to executing the mutation
  modal: ({ entityName }) => {
    type: MODAL_TYPE.confirm,
    title: 'Are you sure?',
    confirm: `I'm sure`,
    children: <p>Do you want to update {entityName}?</p>
  },

  // configuration for the queuing behaviour of the mutation
  // mutations can be added to a particular queue given by the id
  // All mutations on the same queue are executed one at a time
  queue: ({ entityId }) => ({
		id: `Entity:${entityId}`
	}),

  // configuration options to be passed into the `mutate` function, supporting all the same
  // configuration options as Apollo `mutate`
  options: ({ organizationId, spaceId, entityId, fields }) => ({
    variables: {
        input: {
            organizationId,
            spaceId,
            entityId,
            fields
        }
    },
    refetchQueries: [refetchSomething],
    update: (client, { data: { updateEntity } }) => {
        // Apply manual cache updates here if needed
    }
  }),

  // message to display in a passive notification on successful completion of the mutation
  successMessage: (response, { entityName ) => `Successfully mutated ${entityName}!`,

  // error message to display in a passive notification on failure of the mutation
  errorMessage: (error, { entityName} ) => `Something went wrong when updating ${entityName}!`,

  // path to redirect to on successful completion of the mutation
  redirect: (response, data) => {
    const entityId = response.data.updateEntity.entity.id;
    return interpolatePath(PATH.entityPath, { ...getSlugs(), entityId });
  }
});
```

### Hooks?

Potentially hooks could provide a cleaner way to achieve the same goal rather than by using HOCs. We
should investigate this once we've upgraded to react 16.8+

## Consequences

1. Less responsibility for our components by externalizing the code for controlling the mutation
   flow. More of an MVC style approach.
1. Reduce boilerplate code.
1. Enforce common mutation flows.
1. Makes each mutation and related wiring re-usable.
1. Less likelihood of developer error.
