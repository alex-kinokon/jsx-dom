# jsx-dom
Use JSX for creating DOM elements.

## Usage
```bash
npm install --save jsx-dom
```

```javascript
// Using React namespace, works with most transpilers directly
import * as React from 'jsx-dom';
// Or: Using a custom namespace, see the paragraph below.
import * as jsxDom from 'jsx-dom';

document.body.appendChild( <div id="hello" /> );
```

If you prefer `jsx-dom` not to occupy the React namespace,
you need to provide the module name as pragma with your Babel settings, specifically within your `.babelrc`:

```js
{
	"plugins": [
		[ "transform-react-jsx", "jsxDom" ]
	]
}
```

## Syntax
`jsx-dom` is based on the React JSX syntax with a few additions:

1. `class` is supported as an attribute as well as `className`
2. `class` can take an array of strings (and booleans, but they will be filtered out automatically) or an object with the format `{ [key: string]: boolean }`.
3. `style` accepts both strings and objects.
4. `dataset` accepts an object.
5. Attributes starts with `on` and has a function value will be treated as an event listener and thus attached to the node.
6. `innerHTML`, `innerText` and `textContent` are accepted.
7. Uppercase tag names are treated as a **Custom Element** and will be initialized with a `new` call.

## Browser Support
`jsx-dom` requires `Object.keys` and `Object.assign` (an ES6 feature). If you are using Babel, the [`transform-object-assign`](https://babeljs.io/docs/plugins/transform-object-assign/#usage) plugin should eliminate the need for a polyfill.