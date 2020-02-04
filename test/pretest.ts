import { JSDOM } from "jsdom"

// Set up jsdom
const dom = new JSDOM("")
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  Node: (dom.window as any).Node,
})

// Monkey patch jsdom to support dataset.
function toPropKey(prop: PropertyKey) {
  return "data-" + `${prop as string}`.toLowerCase()
}

Object.defineProperties((window as any).Element.prototype, {
  innerText: {
    get() {
      return this.textContent
    },
    set(value: string) {
      this.textContent = value
    },
  },
  // tslint:disable-next-line:object-literal-sort-keys
  dataset: {
    get() {
      return new Proxy(this, {
        get(target, prop) {
          return target.getAttribute(toPropKey(prop))
        },
        set(target, prop, value) {
          target.setAttribute(toPropKey(prop), value)
          return true
        },
      })
    },
  },
})
