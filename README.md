# jsx-dom
Use JSX for creating DOM elements.

## Usage
```bash
npm install --save jsx-dom
```

```javascript
// Using React namespace, works with most transpilers directly
import * as React from 'jsx-dom';
// Or: specify the JSX pragma directly. See below for instructions.
import { createElement } from 'jsx-dom';

document.body.appendChild( <div id="hello" /> );
```

If you prefer `jsx-dom` not to occupy the React namespace,
you need to provide the module name as pragma with your Babel settings, specifically within your `.babelrc`:

```js
{
	"plugins": [
		[ "transform-react-jsx", { "pragma": "createElement" } ]
	]
}
```

Or if you prefer to work with TypeScript:

```js
import { createElement } from 'jsx-dom';

// In tsconfig.json:
{
	"jsx": "react",
	"jsxFactory": "createElement",
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

## Goodies
Two extra functions are provided by this package:

1. `preventDefault(event: Event): Event`
2. `stopPropagation(event: Event): Event`

## Browser Support
`jsx-dom` requires `Object.keys`.