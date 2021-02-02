---
id: "styling-approach-re-evaluation"
hide_title: true
---

# Styling Approach Re-evaluation

## Status

accepted

## Context

Now that we have updated Emotion to v10, and also are using React Hooks, there is an opportunity to
adopt a new styling approach to simplify it (eg. css prop, Emotion's built in cache), open up our
styling to being prop driven when necessary, and also adhere to the usage of Emotion advocated by
Emotion.

### Problems

#### Theming Hook Support

Using theme with hooks does not come out of the box with `emotion-theming`. You cannot simply do
`import {ThemeContext} from '@emotion/core'` then do `useContext(ThemeContext)`. Why?

We use `ThemeProvider` from `emotion-theming`. Inside `emotion-theming`, although it does
`import {ThemeContext} from '@emotion/core`, that `ThemeContext` is not exported, and it is that
_instance_ of `ThemeContext` we need to pass into `useContext` in order to get the theme via the
hook approach.

It also is not apparent when or if `useContext` will be baked into `emotion-theming` in the future.

#### Nested Interpolation of Classes

This type of nesting of styles / interpolated class names will soon be not allowed:

```
const childCss = css`
	...
`

const parentCss = css`
	&:hover > .${childCss} {
		...
	}
`
```

#### Do we use the new CSS prop that Emotion provides?

Emotion provides the `css` prop which helps simplify things a bit - it means we don't have to use
`cx` to combine classes. But when do we use it vs `className` ?

#### What about the existing stuff?

One of the great things with the current approach is ability to concatenate classes which works
quite simply. Also the styling function we have to keep styling inside JSX to a minimum also works
well for us.

Also, we have a lot of existing styling code that works well still, and we have to migrate what we
need to in order for the styling logic of our code base to remain supported by Emotion. However, at
the same time we want to minimise upfront time to migrate because the priority is still building the
product.

## Decision

We will create a new hook `useStyles` which will behave similar to our existing `styled` HOC.

```
export function useStyles(styleFunc, data = {}) {
	const theme = useContext(themeContext);
	return useMemo(() => styleFunc({ css, theme, data }), [styleFunc, theme, ...Object.values(data)]);
}
```

NOTE: In order to access the theme we will need to introduce a new context to provide the theme to
our hook, as the ThemeContext is not accessible from emotion.

### Example Usage

Here is a complete example of how we’ll apply styling covering all of the edge cases we might need
to address in a functional component.

```javascript
// MyParentComponent.js
...
import { useStyles } from '@appcurator/shared/context/HookThemeContext';

MyParentComponent.propTypes = {
	showAlternateText: bool,
	unavailable: bool,
};

export default function MyParentComponent(props) {
	const {showAlternateText, unavailable} = props;
	const classes = useStyles(styles, { unavailable });

	return (
		<>
			<SomeChildComponent
				innerCss={{ root: classes.childRoot, text: classes.childText }}
			/>
			<h2 css={classes.heading} className="h1">
				<span css={classes.textLine}>Text line</span>
				<span css={[classes.otherTextLine, showAlternateText && classes.otherTextLineAlternate]} className="myParentComponent-otherTextLine">Some Other Text Line</span>
			</h2>
		</>
	);
}

function styles({ css, theme: { color, font }, data: { unavailable } }) {
	return {
		heading: css`
			margin-top: 16px;

			&:hover {
				& > .myParentComponent-otherTextLine {
						font-weight: bold;
				}
			}
		`,
		textLine: css`
			font-size: 18px;
			color: ${color.primary};
		`,
		otherTextLine: css`
			font-size: 20px;
			font-weight: normal;

			${unavailable ? 'opacity: 0.5;' : ''}
		`,
		otherTextLineAlternate: css`
			font-weight: ${font.weight.light};
		`,
		childRoot: css`
			height: 50px;
		`,
		childText: css`
			color: ${color.primary};
		`
	};
}

// SomeChildComponent.js (consumed by MyParentComponent)
SomeChildComponent.propTypes = {
	classes: shape({
		root: string,
		text: string,
	}),
	innerCss: shape({
		root: any,
		text: any,
	}),
};

SomeChildComponent.defaultProps = {
	innerCss: {}
}

function SomeChildComponent(props) {
	const {classes, innerCss} = props;

	return (
		<div className={classes.root} css={innerCss.root}>
			<p css={innerCss.text}>Some text here</p>
		</div>
	);
}

// note: styles function signature for the styled HOC is slightly different to the one for the useStyles hook
function childStyles(css, theme) {
	return {
		root: css`
			height: 24px;
		`
	};
}

// This component is using the `styled` HOC
export default styled(childStyles)(SomeChildComponent)
```

#### New Hook Theme API

###### The Hook

The `useStyles` hook is used like any other hook.

If you need to pass in prop/state data to drive styles, then have those defined before executing the
hook.

In the example, we calculated the `unavailable` value to pass into the hook. Only if `unavailable`
changes its value will the hook re-execute the style function passed in.

That is why it is CRITICAL that we pass in only what we need and do NOT pass the WHOLE PROPS/STATE
object into `data` argument of the hook as this will lead to unnecessary re-execution of the style
func leading to a performance hit.

Note that the `useStyles` hook does memoizes based on the values of `data`, rather than the `data`
object itself (as this object would be a new object each time).

###### The Style Function

The signature of the styling function has been modified. The theme/data values are optional and so
don't have to be destructured.

#### Prop driven styling

An example of dynamically affecting styles with `data` values is the `otherTextLine` class in the
example (`${unavailable ? 'opacity: 0.5;' : ''}`).

#### Nested Selectors

To achieve nested selector targeting, we need to use plain string class names. This is shown in the
above example where we added the className `myParentComponent-otherTextLine` in a span. Then in the
style function where we have the `hover` styling, we did
`& > .myParentComponent-otherTextLine {...}` to target it.

#### The _classes_ prop and the new _innerCss_ prop for parent class overrides

Since the `css` from `@emotion/core` generates an object output as opposed to a string class name
(which was the case when using `css` from `emotion`), we need to approach parent class overrides
differently.

For the existing `classes` prop, that will remain the same. However, if a component that uses the
new `useStyles` hook wants to override classes of a child component which supports the `classes`
prop only, then we need to modify the child component to support an `innerCss` prop. The shape of
`innerCss` is the same as `classes` except the value type of each value is an `object` instead of
`string` (refer to `SomeChildComponent` prop types in the example).

Then anywhere there is a `className={classes.someClass}`, we also add `css={innerCss.someClass}`.
That way, this existing component can now work with both the classes values from the `styled` HOC
and the `useStyles` hook.

Refer to the `MyParentComponent` (parent providing class overrides) and `SomeChildComponent` (child
component) usage above for a clearer view of how this works.

#### We use the CSS prop that Emotion provides

Use the `css` prop as encouraged by [Emotion](https://emotion.sh/docs/migrating-to-emotion-10), but
also use `className` when needed.

More information on the `css` prop can be found [here](https://emotion.sh/docs/css-prop).

`className` should only be used for providing a way to facilitate nested selector targeting, and
also for passing in global classes.

When using the `css` prop, we don't have to use `cx` anymore! Classes can also be conditionally
applied. Eg:
`<span css={[classes.otherTextLine, showAlternateText && classes.otherTextLineAlternate]} ...>`

`cx` could still be used if we are combining classes into the `className` prop.

#### Existing stuff

Existing code won't change - the styled HOC and associated utils will remain. For new components,
instead of using the styled HOC, or any components that we decide to modify substantially, we use
the new `useStyles` hook and the css prop.

Class concatenation will not be carried over to the `useStyles` hook to reduce complexity.

We should avoid interpolating a className to achieve nested selector targeting going forward for new
components or any components that get refactored.

When the time comes to jump to an Emotion version that no longer supports our code, we will do the
migration of the parts of the code that still use interpolated classes in nested selector logic.

###### The _mod_ utility for new `css` prop approach?

It may still have a place, although the same outcome may be achievable via a more prop driven means.
It may be useful to have this utility adapted somehow to the `css` prop approach to facilitate a
transition. Open to suggestions/feedback?

#### Alternate approach considered for prop driven styling

We could have gone with the class generator function approach but that would mean that generator
function runs on every re-render, and also adds an alternate approach to generating classes which
may make it less simple. Example of what I mean:

```
function styles({css}) {
	return {
		indicator: props => css`
			display: inline-block;
			background: ${muted};

			${props.checked ? `background: ${success};` : ''}
		`,
	};
}
```

with the JSX:

```
<span css={classes.indicator(props)} />
```

## Consequences

We have an opportunity to further simplify our CSS all the while adhering to the approach encouraged
by Emotion. And by taking this newer approach, we can keep our application well supported going
forward.
