export { createRef as useRef } from "./ref"
export { identity as useCallback, identity as memo } from "./util"
export { Fragment as StrictMode } from "./jsx-dom"

export function useMemo<T>(factory: () => T): T {
  return factory()
}
