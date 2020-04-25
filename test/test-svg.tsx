import { as } from "./util"
import { React } from "./register"

import { expect } from "chai"
import "mocha"

describe("SVG", () => {
  // tslint:disable-next-line:no-shadowed-variable
  const namespace = React.SVGNamespace

  it("exports the correct SVG namespace URI", () => {
    expect(namespace).to.equal("http://www.w3.org/2000/svg")
  })

  it("supports SVG elements", () => {
    const supportedElements = [
      <svg />,
      <animate />,
      <circle />,
      <clipPath />,
      <defs />,
      <desc />,
      <ellipse />,
      <feBlend />,
      <feColorMatrix />,
      <feComponentTransfer />,
      <feComposite />,
      <feConvolveMatrix />,
      <feDiffuseLighting />,
      <feDisplacementMap />,
      <feDistantLight />,
      <feFlood />,
      <feFuncA />,
      <feFuncB />,
      <feFuncG />,
      <feFuncR />,
      <feGaussianBlur />,
      <feImage />,
      <feMerge />,
      <feMergeNode />,
      <feMorphology />,
      <feOffset />,
      <fePointLight />,
      <feSpecularLighting />,
      <feSpotLight />,
      <feTile />,
      <feTurbulence />,
      <filter />,
      <foreignObject />,
      <g />,
      <image />,
      <line />,
      <linearGradient />,
      <marker />,
      <mask />,
      <metadata />,
      <path />,
      <pattern />,
      <polygon />,
      <polyline />,
      <radialGradient />,
      <rect />,
      <stop />,
      <switch />,
      <symbol />,
      <text />,
      <textPath />,
      <tspan />,
      <use />,
      <view />,
    ]

    supportedElements.forEach((one) =>
      expect(one.namespaceURI, `Tag: ${one.tagName}`).to.equal(namespace)
    )
  })

  it("supports SVG namespace", () => {
    expect((<a namespaceURI={namespace} />).namespaceURI).to.equal(namespace)
  })

  it("supports xlink and XML attributes", () => {
    const checkXLink = (node: JSX.Element, attr: string) =>
      expect(node.getAttributeNS("http://www.w3.org/1999/xlink", attr) === "value")

    const checkXML = (node: JSX.Element, attr: string) =>
      expect(node.getAttributeNS("http://www.w3.org/XML/1998/namespace", attr) === "value")

    checkXLink(<use xlinkHref="value" />, "xlink:href")
    checkXLink(<use xlinkArcrole="value" />, "xlink:arcrole")
    checkXLink(<use xlinkHref="value" />, "xlink:href")
    checkXLink(<use xlinkRole="value" />, "xlink:role")
    checkXLink(<use xlinkShow="value" />, "xlink:show")
    checkXLink(<use xlinkTitle="value" />, "xlink:title")
    checkXLink(<use xlinkType="value" />, "xlink:type")
    checkXML(<use xmlBase="value" />, "xml:base")
    checkXML(<use xmlLang="value" />, "xml:lang")
    checkXML(<use xmlSpace="value" />, "xml:space")
  })

  it("supports unitless CSS properties", () => {
    const test = (key: string) =>
      expect((<div style={{ [key]: 5 }} />).style[key]).to.be.oneOf([5, "5"], key)
    ;[
      "fillOpacity",
      "floodOpacity",
      "stopOpacity",
      "strokeDasharray",
      "strokeDashoffset",
      "strokeMiterlimit",
      "strokeOpacity",
      "strokeWidth",
    ].forEach((key) => test(key))
  })
})
