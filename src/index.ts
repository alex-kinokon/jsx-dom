import { isRef } from "./ref"
import {
  isString,
  isArrayLike,
  isBoolean,
  isObject,
  isFunction,
  isElement,
  isNumber,
  keys,
} from "./util"

export { createRef } from "./ref"

declare const __SVG__: boolean

export const SVGNamespace = "http://www.w3.org/2000/svg"
const XLinkNamespace = "http://www.w3.org/1999/xlink"
const XMLNamespace = "http://www.w3.org/XML/1998/namespace"

export function preventDefault(event: Event) {
  event.preventDefault()
  return event
}
export function stopPropagation(event: Event) {
  event.stopPropagation()
  return event
}

// https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
// Emulate JSX Expression logic to ignore certain type of children or className.
function isVisibleChild(value: any): boolean {
  return !isBoolean(value) && value != null
}

/**
 * Convert a `value` to a className string.
 * `value` can be a string, an array or a `Dictionary<boolean>`.
 */
function className(value: any): string {
  if (Array.isArray(value)) {
    return value
      .map(className)
      .filter(Boolean)
      .join(" ")
  } else if (isObject(value)) {
    return keys(value)
      .filter(k => value[k])
      .join(" ")
  } else if (isVisibleChild(value)) {
    return "" + value
  } else {
    return ""
  }
}

const svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0,
}

export function createFactory(tag: string) {
  return createElement.bind(null, tag)
}

export function Fragment(attr: { children: JSX.Child[] }) {
  const fragment = document.createDocumentFragment()
  appendChildren(attr.children, fragment)
  return fragment
}

export { createElement as h }
export function createElement(tag, attr, ...children) {
  attr = attr || {}
  if (__SVG__ && !attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr, namespaceURI: SVGNamespace }
  }

  if (attr.children != null && !children.length) {
    ;({ children, ...attr } = attr)
  }

  let node: HTMLElement | SVGElement
  if (isString(tag)) {
    node = attr.namespaceURI
      ? document.createElementNS(attr.namespaceURI, tag)
      : document.createElement(tag)
    attributes(attr, node)
    appendChild(children, node)
  } else if (isFunction(tag)) {
    // Custom elements.
    if (isObject(tag.defaultProps)) {
      attr = { ...tag.defaultProps, ...attr }
    }

    node = tag({ ...attr, children })
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node
  } else if (isFunction(attr.ref)) {
    attr.ref(node)
  }
  return node
}

function appendChild(child, node: Node) {
  if (isArrayLike(child)) {
    appendChildren(child, node)
  } else if (isString(child) || isNumber(child)) {
    node.appendChild(document.createTextNode(child as any))
  } else if (child === null) {
    node.appendChild(document.createComment(""))
  } else if (isElement(child)) {
    node.appendChild(child)
  }
}

function appendChildren(children, node: Node) {
  for (const child of children) {
    appendChild(child, node)
  }
  return node
}

function normalizeAttribute(s: string) {
  return s.replace(/[A-Z\d]/g, match => ":" + match.toLowerCase())
}

function attribute(key: string, value: any, node: HTMLElement | SVGElement) {
  if (__SVG__) {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        node.setAttributeNS(XLinkNamespace, normalizeAttribute(key), value)
        return
      case "xmlnsXlink":
        node.setAttribute(normalizeAttribute(key), value)
        return
      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        node.setAttributeNS(XMLNamespace, normalizeAttribute(key), value)
        return
    }
  }

  switch (key) {
    case "htmlFor":
      node.setAttribute("for", value)
      return
    case "dataset":
      for (const dataKey of keys<object>(value || {})) {
        const dataValue = value[dataKey]
        if (dataValue != null) {
          ;(node as HTMLElement).dataset[dataKey] = dataValue
        }
      }
      return
    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value
      return
    case "spellCheck":
      ;(node as HTMLInputElement).spellcheck = value
      return
    case "class":
    case "className":
      node.setAttribute("class", className(value))
      return
    case "ref":
    case "namespaceURI":
      return
    case "style":
      if (isObject(value)) {
        Object.assign(node.style, value)
        return
      }
    // fallthrough
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      node[key.toLowerCase()] = value
    }
  } else if (value === true) {
    node.setAttribute(key, "")
  } else if (value !== false && value != null) {
    node.setAttribute(key, value)
  }
}

function attributes(attr: object, node: HTMLElement | SVGElement) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node)
  }
  return node
}
