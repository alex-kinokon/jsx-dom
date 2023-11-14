# jsx-dom

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![build status](https://travis-ci.org/proteriax/jsx-dom.svg?branch=master)](https://travis-ci.org/proteriax/jsx-dom)
[![npm version](https://badge.fury.io/js/jsx-dom.svg)](https://badge.fury.io/js/jsx-dom)

Use JSX for creating DOM elements. Supports ES Module and TypeScript.

**NEW!** [Styled components are now supported.](#styled-components)

## Installation

```bash
npm install --save jsx-dom
yarn install jsx-dom
pnpm add jsx-dom
```

## Usage

`jsx-dom` is ESM only. If you need CommonJS support, install `jsx-dom-cjs` instead. These two packages only differ in module format.

**Note:** If you are using [React Automatic Runtime](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx), simply set `jsxImportSource` to `jsx-dom` or `jsx-dom/min` and you can omit the import.

```jsx
import React from "jsx-dom"

// DOM Elements.
document.body.appendChild(
  <div id="greeting" class="alert">
    Hello World
  </div>
)

// Functional components
// `defaultProps` and `props.children` are supported natively and work as you expect.
function Hello(props) {
  return (
    <div>
      Hello, {props.firstName} {props.lastName}!
    </div>
  )
}
Hello.defaultProps = {
  firstName: "John",
}

document.body.appendChild(<Hello firstName="Johnny" lastName="Appleseed" />)

// Class components
// `defaultProps` and `props.children` are supported natively and work as you expect.
// In terms of React jsx-dom class components have no state,
// so `render` function will be called only once.
//
// Component lifecycle functions are currently not supported. This may change in
// the future.
class Welcome extends React.Component {
  static defaultProps = {
    firstName: "John",
  }

  render() {
    return (
      <div>
        Welcome, {this.props.firstName} {this.props.lastName}!
      </div>
    )
  }
}

document.body.appendChild(<Welcome firstName="Johnny" lastName="Appleseed" />)
```

### Styled Components
```tsx
import { styled } from "jsx-dom"

const HeaderText = styled.h2`
  font-size: 20px;
  font-weight: 500;
`

document.body.appendChild(
  <HeaderText style={{ /* you can override here */ }}>
    Welcome!
  </HeaderText>
)

const Name = styled.div<{ large?: boolean }>`
  font-size: ${props => props.large ? 40 : 20}px;
  ${props => props.large ? "font-weight: 600;" : ""}
`

document.body.appendChild(
  <Name large>
    Welcome!
  </Name>
)

```

### Shadow DOM
```tsx
import { ShadowRoot } from "jsx-dom"

document.body.appendChild(
  <dialog>
    <ShadowRoot mode="closed">
      <style>:root { font-family: Helvetica Neue; }</style>
      <button>Hello</button>
    </ShadowRoot>
  </dialog>
)
```


## Syntax

`jsx-dom` is based on the React JSX syntax with a few additions:

### Class

1. `class` is supported as an attribute as well as `className`.
2. `class` can take:

   - a string
   - an object with the format `{ [key: string]: boolean }`. Keys with a truthy value will be added to the classList
   - an array of values where falsy values (see below) are filtered out
   - an array of any combination of the above, including deeply nested arrays

Note that `false`, `true`, `null`, `undefined` will be ignored per [React documentations](https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored), and everything else will be used. For example,

```jsx
<div class="greeting" />
<div class={[ condition && "class" ]} />
<div class={{ hidden: isHidden, "has-item": !!array.length }} />
<div class={[ classArray1, classArray2, ["nested", ["further"]] ]} />
```

### Style

1. `style` accepts a string, an object and an array of any combination of the above, including deeply nested arrays. Unitless properties supported by React are also supported.

```jsx
<div style="background: transparent;" />
<div style={{ background: "transparent", fontFamily: "serif", fontSize: 16 }} />
```

### Children

Passing `children` as an explicit attribute, when there is no other JSX child node, is also supported. Any object that matches the TypeScript `ArrayLike` interface can be used as `children`, including jQuery objects.

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
import React, { createRef } from "jsx-dom"

const textbox = createRef()
render(
  <div>
    <label>Username:</label>
    <input ref={textbox} />
  </div>
)

window.onerror = () => {
  textbox.current.focus()
}

// React.useRef
import React, { useRef } from "jsx-dom"

function Component() {
  const textbox = useRef()
  const onClick = () => textbox.current.focus()

  return (
    <div onClick={onClick}>
      <label>Username:</label>
      <input ref={textbox} />
    </div>
  )
}
```

5. Rich data jsx properties are accepted, but populated as properties rather than DOM attributes. 

```jsx
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
  }
}
customElements.define('my-custom-element', MyCustomElement);
const richData = { foo: 'bar' }
return <my-custom-element richData={richData} />
```

### Functional and class components

You can write functional and class components and receive passed `props` in the same way in React. Unlike
React, `props.children` is guaranteed to be an array.

### SVG and Namespaces

```jsx
import React from "jsx-dom"

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

If you do not need SVG and CSS property automatic type conversion support, you can import from `jsx-dom/min` for a smaller build.

```jsx
import React, { SVGNamespace } from "jsx-dom"

function Anchor() {
  return <a namespaceURI={SVGNamespace}>I am an SVG element!</a>
}
```

If you need to create an SVG element that is not in the list, or you want to specify a custom namespace, use the attribute `namespaceURI`.

jsx-dom also includes a few utility functions to facilitate the process of refactoring from or to React.

## `useText`

While this is technically not a hook in the React sense, it functions like one and
facilitates simple DOM text changes.

```jsx
import React, { useText } from "jsx-dom"

function Component() {
  const [text, setText] = useText("Downloading")

  fetch("./api").then(() => {
    setText("Done!")
  })

  return (
    <div>Status: {text}</div>
  )
}
```

## `useClassList`

```jsx
import React, { useClassList } from "jsx-dom"

function Component() {
  const cls = useClassList(["main", { ready: false }])
  setTimeout(() => {
    cls.add("long-wait")
    cls.toggle("ready")
  }, 2000)

  return (
    <div class={cls}>Status</div>
  )
}
```

## Goodies

Some extra features are provided by this package:

```ts
// Returns the event object
export function preventDefault(event: Event): Event;

// Returns the event object
export function stopPropagation(event: Event): Event;

// `namespaceURI` string for SVG Elements.
export const SVGNamespace: string;

// Convert a value into a className string. See docs above.
export function className(value: any): string;
```

### Type aliases for convenience
```ts
/** Short type aliases for HTML elements */
export namespace HTML {
    type Anchor = HTMLAnchorElement
    type Button = HTMLButtonElement
    type Div = HTMLDivElement
    ...
}

/** Short type aliases for SVG elements */
export namespace SVG {
    type Anchor = SVGAElement
    type Animate = SVGAnimateElement
    ...
}
```

## API Compatibility with React
The following functions are included for compatibility with React API:

```ts
function createFactory(component: string): (props: object) => JSX.Element
function useImperativeHandle<T>(ref: Ref<T>, init: () => T, deps?: DependencyList): void
function useRef<T>(initialValue?: T): RefObject<T>
function forwardRef<T = Node, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactNode
): FunctionComponent<P & { ref?: Ref<T> }>
```

The following functions do **not** have memoization or optimization, and are only useful if you are
migrating from/to React.

```ts
// Returns `render` function
export function memo<P, T extends (props: P) => JSX.Element>(render: T): T;
// Returns `fn` function
export function useMemo<T>(fn: () => T, deps: any[]): T;
// Returns `fn` function
export function useCallback<T extends Function>(fn: T, deps: any[]): T;

export const StrictMode: React.FC;

export class PureComponent {}
```

## Browser Support

There is no support for Internet Explorer.

## Known Issues

* `<div />`, and other tags, are inferred as a general `JSX.Element` in TypeScript instead of
`HTMLDivElement` (or the equivalent types). This is a known bug and its fix depends on [TypeScript#21699](https://github.com/Microsoft/TypeScript/issues/21699).

* [htm](https://github.com/developit/htm) library is [not currently compatible](https://github.com/proteriax/jsx-dom/issues/32) with jsx-dom.
