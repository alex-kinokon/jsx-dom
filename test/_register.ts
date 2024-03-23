export {}

process.env.TEST = "true"

// Set up jsdom
Object.assign(global, {
  __FULL_BUILD__: true,
  cast: value => value,
})

Object.defineProperties(Element.prototype, {
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
