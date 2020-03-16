const React: typeof import("..") = require("../lib/index.cjs")

import { expect } from "chai"
import "mocha"
import { StandardLonghandProperties } from "csstype"

describe("CSS", () => {
  it("supports numeric CSS properties", () => {
    const test = (key: keyof StandardLonghandProperties) =>
      expect((<div style={{ [key]: 2 }} />).style[key]).to.equal("2px", key)

    test("paddingTop")
    test("fontSize")
    test("marginBottom")
  })

  const testUnitless = (key: string) =>
    expect((<div style={{ [key]: 5 }} />).style[key]).to.be.oneOf([5, "5"], key)

  it("supports unitless CSS properties", () => {
    ;[
      "animationIterationCount",
      "borderImageOutset",
      "borderImageSlice",
      "borderImageWidth",
      "boxFlex",
      "boxFlexGroup",
      "boxOrdinalGroup",
      "columnCount",
      "columns",
      "flex",
      "flexGrow",
      "flexPositive",
      "flexShrink",
      "flexNegative",
      "flexOrder",
      "gridArea",
      "gridRow",
      "gridRowEnd",
      "gridRowSpan",
      "gridRowStart",
      "gridColumn",
      "gridColumnEnd",
      "gridColumnSpan",
      "gridColumnStart",
      "fontWeight",
      "lineClamp",
      "lineHeight",
      "opacity",
      "order",
      "orphans",
      "tabSize",
      "widows",
      "zIndex",
      "zoom",
    ].forEach(key => testUnitless(key))
  })

  it("supports unitless CSS properties with vendor prefixes", () => {
    // Vendor prefix
    testUnitless("WebkitFlex")
    testUnitless("MozFlex")
  })
})
