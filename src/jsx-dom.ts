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
  isComponentClass,
} from "./util"
import { isUnitlessNumber } from "./css-props"
import type { HTML } from "../index"

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

const nonPresentationSVGAttributes = /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/

export function createFactory(tag: string) {
  return createElement.bind(null, tag)
}

export function Fragment(attr: { children: any }) {
  const fragment = document.createDocumentFragment()
  appendChild(attr.children, fragment)
  return fragment
}

export function Component(props: any) {
  this.props = props
}
Object.defineProperties(Component.prototype, {
  isReactComponent: {
    value: true,
  },
  render: {
    value() {
      return null
    },
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function jsx(tag: any, { children, ...attr }, key?: string) {
  if (__FULL_BUILD__ && !attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr, namespaceURI: SVGNamespace }
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

    node = isComponentClass(tag)
      ? new tag({ ...tag.defaultProps, ...attr, children }).render()
      : tag({ ...attr, children })
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node
  } else if (isFunction(attr.ref)) {
    attr.ref(node)
  }
  return node
}

export function createElement(tag: any, attr: any, ...children: any[]) {
  if (isString(attr) || Array.isArray(attr)) {
    children.unshift(attr)
    attr = {}
  }

  attr = attr || {}

  if (attr.children != null && !children.length) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;({ children, ...attr } = attr)
  }

  return jsx(tag, { ...attr, children }, attr.key)
}

function appendChild(child: any[] | string | number | null | Element, node: Node) {
  if (isArrayLike(child)) {
    appendChildren(child as any, node)
  } else if (isString(child) || isNumber(child)) {
    appendChildToNode(document.createTextNode(child as any), node)
  } else if (child === null) {
    appendChildToNode(document.createComment(""), node)
  } else if (isElement(child)) {
    appendChildToNode(child, node)
  }
}

function appendChildren(children: any[], node: Node) {
  for (const child of [...children]) {
    appendChild(child, node)
  }
  return node
}

function appendChildToNode(child: Node, node: Node) {
  if (node instanceof window.HTMLTemplateElement) {
    node.content.appendChild(child)
  } else {
    node.appendChild(child)
  }
}

function normalizeAttribute(s: string, separator: string) {
  return s.replace(/[A-Z\d]/g, match => separator + match.toLowerCase())
}

function attribute(key: string, value: any, node: Element & HTMLOrSVGElement) {
  if (__FULL_BUILD__) {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value)
        return
      case "xmlnsXlink":
        attr(node, normalizeAttribute(key, ":"), value)
        return
      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value)
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
    case "dangerouslySetInnerHTML":
      if (isObject(value)) {
        node.innerHTML = value["__html"]
      }
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
          if (__FULL_BUILD__ && isNumber(val) && isUnitlessNumber[key] !== 0) {
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
      const attribute = key.toLowerCase()
      // Issue #33
      if (node[attribute] == null) {
        node[attribute] = value
      } else {
        node.addEventListener(key, value)
      }
    }
  } else if (value === true) {
    attr(node, key, "")
  } else if (value !== false && value != null) {
    if (
      __FULL_BUILD__ &&
      node instanceof SVGElement &&
      !nonPresentationSVGAttributes.test(key)
    ) {
      attr(node, normalizeAttribute(key, "-"), value)
    } else {
      attr(node, key, value)
    }
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
