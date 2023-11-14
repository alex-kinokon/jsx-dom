import type { FunctionComponent, ReactElement, Ref } from "../types"
import { attachRef } from "./jsx-dom"
import { createRef } from "./ref"

export { createRef as useRef } from "./ref"
export { identity as useCallback, identity as memo } from "./util"
export { Fragment as StrictMode } from "./jsx-dom"

export function useMemo<T>(factory: () => T): T {
  return factory()
}

export function forwardRef<T extends Node, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactElement
): FunctionComponent<P & { ref?: Ref<T> }> {
  return ({ ref, ...props }) => render(props as P, ref ?? createRef<T>())
}

export function useImperativeHandle<T>(ref: Ref<T>, init: () => T, _deps: unknown) {
  attachRef(ref, init())
}
