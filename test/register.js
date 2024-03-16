import { JSDOM } from "jsdom"
process.env.TEST = true

// Set up jsdom
const dom = new JSDOM("")
const { window } = dom
Object.assign(global, {
  window,
  document: window.document,
  Node: window.Node,
  Text: window.Text,
  HTMLElement: window.HTMLElement,
  SVGElement: window.SVGElement,
  HTMLButtonElement: window.HTMLButtonElement,
  DOMTokenList: window.DOMTokenList,
  DocumentFragment: window.DocumentFragment,
  ShadowRoot: window.ShadowRoot,
  customElements: window.customElements,

  __FULL_BUILD__: true,
  cast: value => value,
})

Object.defineProperties(window.Element.prototype, {
  innerText: {
    get() {
      return this.textContent
    },
    set(value) {
      this.textContent = value
    },
  },
})

// eslint-disable-next-line import/order
import { use } from "chai"
use(require("chai-string"))
