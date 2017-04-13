# jsx-dom
Use JSX for creating DOM elements.

## Installation
```bash
npm install --save jsx-dom
```

## Usage
```jsx
import { createElement } from 'jsx-dom';
document.body.appendChild( <div id="greeting" class="alert">Hello World</div> );
```

You need to tell your transpiler to use the name `createElement`. If you prefer not to, skip to the next section for instrutions. For Babel users, specify within your `.babelrc`:

```js
{
  "plugins": [
    [ "transform-react-jsx", { "pragma": "createElement" } ]
  ]
}
```

Or if you prefer to work with TypeScript:

```json
// In tsconfig.json:
{
  "jsx": "react",
  "jsxFactory": "createElement",
}
```

### Usage without `.babelrc` or `tsconfig` options

If you don’t want to configure your transpiler to use `jsx-dom`, simply import it using 
the React namespace:

```js
import * as React from 'jsx-dom';
```

## Syntax
`jsx-dom` is based on the React JSX syntax with a few additions:

1. `class` is supported as an attribute as well as `className`
2. `class` can take an object with the format `{ [key: string]: boolean }`. Keys with a truthy value will be added to the classList.
2. `class` can also take an array of values: 
Note that `false`, `true`, `null`, `undefined` will be ignored per [React documentations](https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored), and everything else will be used. As an example: `<div class={[ condition && "class" ]} />`;
3. `style` accepts both strings and objects.
4. `dataset` accepts an object.
5. Attributes starts with `on` and has a function value will be treated as an event listener and thus attached to the node.
6. `innerHTML`, `innerText` and `textContent` are accepted.

## Goodies
Two extra functions are provided by this package:

1. `preventDefault(event: Event): Event`
2. `stopPropagation(event: Event): Event`

## Browser Support
`jsx-dom` requires `Object.keys` support. This means IE9 or later.