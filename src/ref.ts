import { isObject } from "./util"

interface Ref<T = Node> {
  current: null | T
}

export function createRef<T = Node>(): Ref<T> {
  return Object.seal({ current: null })
}

export function isRef<T = Node>(maybeRef: any): maybeRef is Ref<T> {
  return isObject(maybeRef) && "current" in maybeRef
}
