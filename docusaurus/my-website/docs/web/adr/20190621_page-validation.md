---
id: "page-validation"
hide_title: true
---

# Page Validation

## Status

accepted

## Context

Lots of pages in the mtribes app are essentially really big forms, due to the size and interactive
behaviour of each page, its not practical to use a standard form tag wrapping everything. We need a
way to manage one response from the server and have multiple components react to the server
response.

## Decision

We will build a re-usable higher order component which child components can subscribe to, when the a
form is submitted to the backend the highorder component will receive the response of the
submission. This will trigger a render and the HOC will notify its subscribers of the update and
each component can respond accordingly. It is effectively a pub sub using the react context api.

This is a a very similar pattern to [redux](https://github.com/reduxjs/redux), borrowing a lot of
concepts from that flow. This is slightly different in that there is no action dispatching, an
update is only rendered when the ContextProvider receives new context at the top level. What we want
can be achieved with the context api, so we don't really need to bring in a new library to support
state management.

The api will look something like this (using the fixed template page as an example)

```flow js
import ContextPublisher from 'ContextPublisher';

export default ({ serverResponse }) => (
	<GetTemplate>
		{template => (
			<ContextPublisher
				/* anytime this context changes it should cause an update */
				context={{ serverResponse, template }}
				// a mapping function which is passed the context so it can be formatted
				map={({ serverResponse, template }) => {
					const map = {};
					template.properties.forEach((property, i) => {
						map[property.id] = serverResponse[i].hasError;
					});
					return map;
				}}>
				...children
			</ContextPublisher>
		)}
	</GetTemplate>
);
```

and then further down the tree we can map any updates from the context like

```flow js
import { ContextSubscriber } from 'ContextPublisher';

const Property = ({ keyError }) => {
	return <div />;
};

// if this function is omitted the context will funnel straight in the props,
const mapContextToProps = (context, props) => {
	return {
		keyError: context.rules[0].key
	};
};

export default ContextSubscriber(Property)(mapContextToProps);
```

## Consequences

While this is being developed for handling form errors across multiple nested components, this can
be used in any circumstance where we have a context and want to subscribe to updates to that
context.
