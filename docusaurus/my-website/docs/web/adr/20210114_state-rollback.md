---
id: "state-rollback"
hide_title: true
---

# State Rollback

## Status

accepted

## Context

In many pages of the app we have begun implementing solutions to deal with concurrency and conflicts
between multiple users making changes to the same page. As a part of this solution, we've added the
ability for users to opt-in to fetching the changes that have been made by other users. This leads
to a number of issues with the way in which we currently manage state within our components.

Typically, the current approach we've implemented throughout the app is similar to the following
basic example:

```javascript
function NameField({ name: nameProp }) {
	const [name, setName] = useState(nameProp);
	const updateName = useUpdateName();

	const onChange = e => {
		setName(e.target.value);
	};

	const onBlur = () => {
		updateName({ name });
	};

	return <input type="text" value={name} onChange={onChange} onBlur={onBlur} />;
}
```

As you can see in the example, we maintain state for any changes being made by the user, and then
when those changes have been confirmed (onBlur) we fire off a mutation to save those changes to the
backend.

The issue with this approach is that the state is initialised to the values from props only once, on
the initial render. If any new value is fed in for the `name` through props, that value will never
be used. This means that when the user opts in to getting changes from other users, in turn
triggering queries to fetch new data from the backend, this new data will never be fed into any
inputs since we're always locked to whatever value is currently in state. Also if a mutation fails
for any reason, modified fields will never rollback to their previous value, which is the desired
behaviour.

## Decision

While a user is actively making changes to a field, we will still need to maintain state so that
their changes are immediately reflected in the UI, and the value is stored until the final change
has been committed on blur. On blur we will then need to clear the state so any new values from
props will be used.

If we clear the state immedately on blur we run into a problem where the component briefly
re-renders with cleared state and with the previous value from props. The setState operation takes
effect before the new data is fed in from the mutation optimistic response, since there is a slight
delay in the time it takes for the mutation to fire, for optimistic responses to apply cache updates
and then for queries to be updated with any new data. As a result, we've seen issues with incorrect
validation errors displaying on blur, as fields would briefly revert to the previous empty or
invalid value.

To get around this, instead of clearing state immediately on blur, we can flag the state to be
cleared, and only clear the state on the next time new data comes through props. To make this easier
to implement, we have created a number of state wrapper utilities which have this functionality
built in `useFallbackState`, `useFallbackBatchState` and `useControlledEffect`. You can view those
implementations in the code base for further details.

```javascript
function NameField({ name: nameProp }) {
	// the `useFallbackState` is used instead of `useState`
	const [name, setName, clearName] = useFallbackState(nameProp);
	const updateName = useUpdateName();

	const onChange = e => {
		setName(e.target.value);
	};

	const onBlur = () => {
		// Marks the state to be cleared whenever a new fallback value is passed in on the next render
		clearName();
		updateName({ name });
	};

	return <input type="text" value={name} onChange={onChange} onBlur={onBlur} />;
}
```

The `useFallbackState` hook wraps the standard `useState` hook from React, but has slightly
different behaviour. Firstly, the parameter passed in is not only used as the initialValue of the
state, but is always used as the fallback value whenever the state has been cleared i.e. set to
undefined. Secondly, the hook returns a clearState function as the third element in the array, along
with the state value and setState function. This clearState function, when invoked, will not
immediately cause the component to update or re-render, but instead simply marks the state to be
cleared. On subsequent re-renders of the component, if the state has been marked for clearing, and
there is a new value passed in as the fallback value, then the state will be cleared, allowing the
component to revert to using the value from props.

## Consequences

We will maintain a good user experience by allowing the users changes to be reflected in the UI
immediately as they make changes. When changes are saved to the backend we will be able to clear all
state and revert to favouring values from props which will allow users to opt into getting the
latest changes from the network. Additionally, if mutations fail for any reason, Apollo should
automatically rollback optimistic responses and in turn all fields should rollback to displaying any
previous values fed through props as well.

We will need to sweep the app to make use of these new hooks for managing state, but given the
simlarity to the existing setState API this should be a relatively straight forward refactor.

Some notable downsides to this implementation are:

- We will trigger an additional re-render of components whenever state is cleared, as the state is
  cleared after a useEffect.
- There is a little more weight to using these state wrappers as they need to compute if there is
  any change to the fallback value.
- We add some complexity to our code base since we aren't using typical out of the box state
  management solutions.
