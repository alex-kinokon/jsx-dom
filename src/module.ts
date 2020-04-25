export { identity as memo } from "./util"
export * from "./ref"
export * from "./hooks"

import { createElement, Fragment } from "./index"

export {
  createFactory,
  Fragment,
  className,
  createElement,
  createElement as h,
  createElement as jsx,
  createElement as jsxs,
  SVGNamespace,
} from "./index"

export default {
  createElement,
  Fragment,
}

export function preventDefault(event: Event) {
  event.preventDefault()
  return event
}

export function stopPropagation(event: Event) {
  event.stopPropagation()
  return event
}
