import { isObject } from "./util"

interface Ref<T> {
  current: null | T
}

export function createRef<T>(): Ref<T> {
  return Object.seal({ current: null })
}

export function isRef<T = Node>(maybeRef: any): maybeRef is Ref<T> {
  return isObject(maybeRef) && "current" in maybeRef
}
