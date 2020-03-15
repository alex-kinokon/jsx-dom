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
  HTMLButtonElement: window.HTMLButtonElement,
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
