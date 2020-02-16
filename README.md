# jsx-dom
<!-- prettier-ignore -->
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![build status](https://travis-ci.org/proteriax/jsx-dom.svg?branch=master)](https://travis-ci.org/proteriax/jsx-dom)
[![dependency status](https://david-dm.org/proteriax/jsx-dom/status.svg)](https://david-dm.org/proteriax/jsx-dom#info=dependencies)
[![devDependency status](https://david-dm.org/proteriax/jsx-dom/dev-status.svg)](https://david-dm.org/proteriax/jsx-dom#info=devDependencies)
[![npm version](https://badge.fury.io/js/jsx-dom.svg)](https://badge.fury.io/js/jsx-dom)

Use JSX for creating DOM elements.

## Installation

```bash
npm install --save jsx-dom
yarn install jsx-dom
```

## Usage

**Note:** If you previously use `h` as pragma, there is nothing you need to change.

```jsx
import * as React from "jsx-dom"

// DOM Elements.
document.body.appendChild(
  <div id="greeting" class="alert">
    Hello World
  </div>
)

// Functional components
// `defaultProps` and `props.children` are supported natively and work as you expected.
function Hello(props) {
  return (
    <div>
      Hello {props.firstName}, {props.lastName}!
    </div>
  )
}

document.body.appendChild(<Hello firstName="Johnny" lastName="Appleseed" />)
```

## Syntax

`jsx-dom` is based on the React JSX syntax with a few additions:

### Class

1. `class` is supported as an attribute as well as `className`.
2. `class` can take:

   - a string
   - an object with the format `{ [key: string]: boolean }`. Keys with a truthy value will be added to the classList
   - an array of values where falsy values (see below) are filtered out
   - an array of any combination of the above

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

### Children

Passing `children` as an explicit attribute, when there is no other JSX child nodes, is also supported.

```jsx
<div children={["Total: ", 20]} />
```

### Other Attributes

1. `dataset` accepts an object, where keys with a `null` or `undefined` value will be ignored.

```jsx
<div dataset={{ user: "guest", isLoggedIn: false }} />
```

2. Attributes starts with `on` and has a function value will be treated as an event listener and attached to the node by setting the property directly (e.g. `node.onclick = ...`).

```jsx
<div onClick={e => e.preventDefault()} />
```

3. `innerHTML`, `innerText` and `textContent` are accepted.

4. `ref` accepts either 1) a callback `(node: Element) => void` that allows access to the node after being created, or 2) a [React style `ref` object](https://reactjs.org/docs/react-api.html#reactcreateref). This is useful when you have a nested node tree and need to access a node inside without creating an intermediary variable.

```jsx
// Callback
<input ref={node => $(node).typehead({ hint: true })} />

// React.createRef
import * as React from "jsx-dom"

const textbox = React.createRef()
render(
  <div>
    <label>Username:</label>
    <input ref={textbox} />
  </div>
)

window.onerror = () => {
  textbox.current.focus()
}
```

### Functional components

You can write functional components and receive passed `props` in the same way in React. Unlike
React, `props.children` is guaranteed to be an array.

### SVG and Namespaces

A custom build with a list of commonly used SVG tags is included.

```jsx
// Use 'jsx-dom/svg';
import * as React from "jsx-dom/svg"

document.body.appendChild(
  <div class="flag" style={{ display: "flex" }}>
    <h1>Flag of Italy</h1>
    <svg width="150" height="100" viewBox="0 0 3 2" class="flag italy">
      <rect width="1" height="2" x="0" fill="#008d46" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#d2232c" />
    </svg>
  </div>
)
```

Below is a list of SVG tags included.

> svg, animate, circle, clipPath, defs, desc, ellipse, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, filter, foreignObject, g, image, line, linearGradient, marker, mask, metadata, path, pattern, polygon, polyline, radialGradient, rect, stop, switch, symbol, text, textPath, tspan, use, view

If you need to create an SVG element that is not in the list, or you want to specify a custom namespace, use the attribute `namespaceURI`.

```jsx
import * as React from "jsx-dom"
<a namespaceURI={React.SVGNamespace}>I am an SVG element!</a>
```

## Goodies

Two extra functions and one constant are provided by this package:

1. `preventDefault(event: Event): Event`
2. `stopPropagation(event: Event): Event`
3. `SVGNamespace` is the `namespaceURI` string for SVG Elements.

## Browser Support

There is no support for Internet Explorer.

## Known Issues

`<div />`, and other tags, are inferred as a general `JSX.Element` in TypeScript instead of
`HTMLDivElement` (or the equivalents). This is a known bug and its fix depends on [TypeScript#21699](https://github.com/Microsoft/TypeScript/issues/21699).
