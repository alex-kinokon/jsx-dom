export { identity as memo } from "./util"
export * from "./ref"
export * from "./hooks"

import { createElement } from "./index"

export {
  createFactory,
  Fragment,
  className,
  createElement,
  createElement as h,
  SVGNamespace,
} from "./index"

export default {
  createElement,
}

export function preventDefault(event: Event) {
  event.preventDefault()
  return event
}

export function stopPropagation(event: Event) {
  event.stopPropagation()
  return event
}
