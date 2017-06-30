# jsx-dom
[![dependency status](https://david-dm.org/alexlur/jsx-dom/status.svg)](https://david-dm.org/alexlur/jsx-dom#info=dependencies)  [![devDependency status](https://david-dm.org/alexlur/jsx-dom/dev-status.svg)](https://david-dm.org/alexlur/jsx-dom#info=devDependencies) [![build status](https://travis-ci.org/alexlur/jsx-dom.svg?branch=master)](https://travis-ci.org/alexlur/jsx-dom) [![npm version](https://badge.fury.io/js/jsx-dom.svg)](https://badge.fury.io/js/jsx-dom)

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
1. `class` is supported as an attribute as well as `className`.
2. `class` can take:

   * a string
   * an object with the format `{ [key: string]: boolean }`. Keys with a truthy value will be added to the classList
   * an array of values where falsy values (see below) are filtered out
   * an array of any combination of the above

Note that `false`, `true`, `null`, `undefined` will be ignored per [React documentations](https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored), and everything else will be used. For example,

```jsx
<div class="greeting" />
<div class={[ condition && "class" ]} />
<div class={{ hidden: isHidden, 'has-item': this.array.length > 0 }} />
<div class={[ classArray1, classArray2, ['nested'] ]} />
```

### Style
1. `style` accepts both strings and objects.

```jsx
<div style="background: transparent;" />
<div style={{ background: 'transparent', fontFamily: 'serif' }} />
```

### Other Attributes
1. `dataset` accepts an object.
2. Attributes starts with `on` and has a function value will be treated as an event listener and attached to the node with `addEventListener`.
3. `innerHTML`, `innerText` and `textContent` are accepted.
4. `ref` accepts a callback `(node: Element) => void` that allows access to the node after being created. This is useful when you have a nested node tree and need to access a node inside without creating an intermediary variable.

### SVG and Namespaces
A custom build with a list of commonly used SVG tags is included.

```jsx
// Use 'jsx-dom/svg';
import { createElement } from 'jsx-dom/svg';
// Or if you prefer Common JS
const { createElement } = require('jsx-dom/svg.cjs');

document.body.appendChild(
  <div class="flag" style={{ display: 'flex' }}>
    <h1>Flag of Italy</h1>
    <svg width="150" height="100" viewBox="0 0 3 2" class="flag italy">
      <rect width="1" height="2" x="0" fill="#008d46" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#d2232c" />
    </svg>
  </div>
);
```

Below is a list of SVG tags included.
> svg, animate, circle, clipPath, defs, desc, ellipse, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, filter, foreignObject, g, image, line, linearGradient, marker, mask, metadata, path, pattern, polygon, polyline, radialGradient, rect, stop, switch, symbol, text, textPath, tspan, use, view

If you need to create an SVG element that is not in the list, or you want to specify a custom namespace, use the attribute `namespaceURI`.

```jsx
import { createElement, SVGNamespace } from 'jsx-dom';

<a namespaceURI={SVGNamespace}>I am an SVG element!</a>
```

## Goodies
Two extra functions and one constant are provided by this package:

1. `preventDefault(event: Event): Event`
2. `stopPropagation(event: Event): Event`
3. `SVGNamespace` is the `namespaceURI` string for SVG Elements.

## Browser Support
`jsx-dom` requires `Object.keys` and `Object.create` support. This means IE9 or later.
