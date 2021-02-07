export { identity as memo } from "./util"
export * from "./ref"
export * from "./hooks"

import { createElement, Fragment, Component } from "./jsx-dom"

export {
  createFactory,
  Fragment,
  Component,
  className,
  createElement,
  createElement as h,
  jsx,
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
