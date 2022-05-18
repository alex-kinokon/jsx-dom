import type { JSX, RefObject } from "../types/index"

const jsxDomType = Symbol.for("jsx-dom:type")

const enum JsxDomType {
  ShadowRoot = "ShadowRoot",
}

export type ShadowRootContainer = ReturnType<typeof ShadowRoot>

export function ShadowRoot({
  children,
  ref,
  ...attr
}: ShadowRootInit & {
  ref?: RefObject<ShadowRoot> | ((value: ShadowRoot) => void)
  children: JSX.Element | JSX.Element[]
}) {
  return {
    [jsxDomType]: JsxDomType.ShadowRoot,
    ref,
    attr,
    children,
  }
}

export function isShadowRoot(el: any): el is ShadowRootContainer {
  return el != null && el[jsxDomType] === JsxDomType.ShadowRoot
}
