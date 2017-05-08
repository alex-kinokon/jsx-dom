# jsx-dom
Use JSX for creating DOM elements.

## Installation
```bash
npm install --save jsx-dom
```

## Usage
```jsx
import { createElement } from 'jsx-dom';

document.body.appendChild(
  <div id="greeting" class="alert">Hello World</div>
);
```

You need to tell your transpiler to use the name `createElement`. If you prefer not to, skip to the next section for instructions. For Babel users, specify within your `.babelrc`:

```js
"plugins": [
  [ "transform-react-jsx", { "pragma": "createElement" } ]
]
```

Or if you prefer to work with TypeScript:

```js
// In tsconfig.json:
"jsx": "react",
"jsxFactory": "createElement",
```

### Usage without `.babelrc` or `tsconfig` options

If you don’t want to configure your transpiler to use `jsx-dom`, simply import it using 
the React namespace:

```js
import * as React from 'jsx-dom';
```

## Syntax
`jsx-dom` is based on the React JSX syntax with a few additions:

### Class
1. `class` is supported as an attribute as well as `className`
2. `class` can take an object with the format `{ [key: string]: boolean }`. Keys with a truthy value will be added to the classList.
2. `class` can also take an array of values: 
Note that `false`, `true`, `null`, `undefined` will be ignored per [React documentations](https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored), and everything else will be used. As an example: `<div class={[ condition && "class" ]} />`;

### Style
1. `style` accepts both strings and objects.

### Other Attributes
1. `dataset` accepts an object.
2. Attributes starts with `on` and has a function value will be treated as an event listener and thus attached to the node.
3. `innerHTML`, `innerText` and `textContent` are accepted.

### SVG and Namespacing
If you need to specify a namespace for your DOM element, pass a string attribute `namespaceURI`, except
the following SVG elements which are supported out of the box:

> svg, animate, circle, clipPath, defs, desc, ellipse, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, filter, foreignObject, g, image, line, linearGradient, marker, mask, metadata, path, pattern, polygon, polyline, radialGradient, rect, stop, switch, symbol, text, textPath, tspan, use, view

## Goodies
Two extra functions and one constant are provided by this package:

1. `preventDefault(event: Event): Event`
2. `stopPropagation(event: Event): Event`
3. `SVGNamespace` is the `namespaceURI` for SVG Elements.

## Browser Support
`jsx-dom` requires `Object.keys` and `Object.create` support. This means IE9 or later.