import { isObject } from "./util"

interface Ref<T extends Node> {
  current: null | T
}

export function createRef<T extends Node = Node>(): Ref<T> {
  return Object.seal({ current: null })
}

export function isRef<T extends Node>(maybeRef: any): maybeRef is Ref<T> {
  return isObject(maybeRef) && "current" in maybeRef
}
