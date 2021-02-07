const { JSDOM } = require("jsdom")
require("ts-node").register({
  transpileOnly: true,
})

// Set up jsdom
const dom = new JSDOM("")
const window = dom.window
Object.assign(global, {
  window,
  document: window.document,
  Node: window.Node,
  Text: window.Text,
  HTMLElement: window.HTMLElement,
  HTMLButtonElement: window.HTMLButtonElement,
  DOMTokenList: window.DOMTokenList,
  customElements: window.customElements,

  __FULL_BUILD__: true,
  cast: (value) => value,
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

/** @type {typeof import("..")} */
const React = require("../src/index.ts")
exports.React = React
