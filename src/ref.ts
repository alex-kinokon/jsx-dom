import { isObject } from "./util"

interface Ref<T extends Element> {
  current: null | T
}
export { createRef as useRef }
export function createRef<T extends Element = Element>(): Ref<T> {
  return Object.seal({ current: null })
}
export function isRef<T extends Element>(maybeRef: any): maybeRef is Ref<T> {
  return isObject(maybeRef) && "current" in maybeRef
}

export function useMemo<T>(factory: () => T): T {
  return factory()
}
