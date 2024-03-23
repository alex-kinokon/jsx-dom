import { createElement } from "./index"
import type { StyledComponent } from "../types/styled"

const cache = /* @__PURE__ */ new Map<string, StyledComponent<any>>()

const createStyledComponent =
  (name: string | StyledComponent<any>): StyledComponent<any> =>
  (list, ...interpolations) =>
  ({ style, ...props }) => {
    const lastIndex = list.length - 1
    const css =
      list.slice(0, lastIndex).reduce((p, s, i) => {
        const interpolation = interpolations[i]
        const current = typeof interpolation === "function" ? interpolation(props) : interpolation
        return p + s + current
      }, "") + list[lastIndex]
    return createElement(name, { style: [css, style], ...props })
  }

const baseStyled: any = (customComponent: StyledComponent<any>) =>
  createStyledComponent(customComponent)

export const styled = /* @__PURE__ */ new Proxy(baseStyled, {
  get(_, name: string) {
    return setIfAbsent(cache, name, () => createStyledComponent(name))
  },
})

function setIfAbsent<K, V>(map: Map<K, V>, key: K, getValue: (key: K) => V): V {
  if (map.has(key)) {
    return map.get(key)!
  } else {
    const value = getValue(key)
    map.set(key, value)
    return value
  }
}
