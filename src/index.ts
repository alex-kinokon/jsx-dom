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
  forEach,
} from "./util"
import { isUnitlessNumber } from "./css-props"
import { HTML } from ".."

export const SVGNamespace = "http://www.w3.org/2000/svg"
const XLinkNamespace = "http://www.w3.org/1999/xlink"
const XMLNamespace = "http://www.w3.org/XML/1998/namespace"

// https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
// Emulate JSX Expression logic to ignore certain type of children or className.
function isVisibleChild(value: any): boolean {
  return !isBoolean(value) && value != null
}

/**
 * Convert a `value` to a className string.
 * `value` can be a string, an array or a `Dictionary<boolean>`.
 */
export function className(value: any): string {
  if (Array.isArray(value)) {
    return value.map(className).filter(Boolean).join(" ")
  } else if (isObject(value)) {
    return keys(value)
      .filter((k) => value[k])
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

export function Fragment(attr: { children: JSX.Element[] }) {
  const fragment = document.createDocumentFragment()
  appendChildren(attr.children, fragment)
  return fragment
}

export { createElement as h }
export function createElement(tag: any, attr: any, ...children: any[]) {
  attr = attr || {}
  if (!__MIN_BUILD__ && !attr.namespaceURI && svg[tag] === 0) {
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

function appendChild(child: any[] | string | number | null | Element, node: Node) {
  if (isArrayLike(child)) {
    appendChildren(child as any, node)
  } else if (isString(child) || isNumber(child)) {
    node.appendChild(document.createTextNode(child as any))
  } else if (child === null) {
    node.appendChild(document.createComment(""))
  } else if (isElement(child)) {
    node.appendChild(child)
  }
}

function appendChildren(children: any[], node: Node) {
  for (const child of children) {
    appendChild(child, node)
  }
  return node
}

function normalizeAttribute(s: string) {
  return s.replace(/[A-Z\d]/g, (match) => ":" + match.toLowerCase())
}

function attribute(key: string, value: any, node: Element & HTMLOrSVGElement) {
  if (!__MIN_BUILD__) {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        attrNS(node, XLinkNamespace, normalizeAttribute(key), value)
        return
      case "xmlnsXlink":
        attr(node, normalizeAttribute(key), value)
        return
      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        attrNS(node, XMLNamespace, normalizeAttribute(key), value)
        return
    }
  }

  switch (key) {
    case "htmlFor":
      attr(node, "for", value)
      return
    case "dataset":
      forEach(value, (dataValue, dataKey) => {
        if (dataValue != null) {
          node.dataset[dataKey] = dataValue
        }
      })
      return
    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value
      return
    case "spellCheck":
      cast<HTML.Input>(node).spellcheck = value
      return
    case "class":
    case "className":
      if (isFunction(value)) {
        value(node)
      } else {
        attr(node, "class", className(value))
      }
      return
    case "ref":
    case "namespaceURI":
      return
    case "style":
      if (isObject(value)) {
        forEach(value, (val, key) => {
          if (!__MIN_BUILD__ && isNumber(val) && isUnitlessNumber[key] !== 0) {
            cast<HTMLElement>(node).style[key] = val + "px"
          } else {
            cast<HTMLElement>(node).style[key] = val
          }
        })
        return
      }
    // fallthrough
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      node[key.toLowerCase()] = value
    }
  } else if (value === true) {
    attr(node, key, "")
  } else if (value !== false && value != null) {
    attr(node, key, value)
  }
}

function attr(node: Element, key: string, value: string | number) {
  node.setAttribute(key, value as any)
}

function attrNS(node: Element, namespace: string, key: string, value: string | number) {
  node.setAttributeNS(namespace, key, value as any)
}

function attributes(attr: object, node: HTMLElement | SVGElement) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node)
  }
  return node
}
