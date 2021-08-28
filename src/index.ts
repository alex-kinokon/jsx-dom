export { identity as memo } from "./util"
export * from "./ref"
export * from "./hooks"

import { Component, Fragment, createElement } from "./jsx-dom"

export { styled } from "./styled"

export {
  createFactory,
  Fragment,
  Component,
  className,
  createElement,
  createElement as h,
  jsx,
  jsx as jsxs,
  SVGNamespace,
} from "./jsx-dom"

export default {
  createElement,
  Fragment,
  Component,
}

export function preventDefault(event: Event) {
  event.preventDefault()
  return event
}

export function stopPropagation(event: Event) {
  event.stopPropagation()
  return event
}
