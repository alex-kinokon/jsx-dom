import React = require("../lib/index.cjs")
import svg = require("../lib/svg.cjs")

import { expect } from "chai"
import "mocha"
import "./pretest"

describe("jsx-dom", () => {
  it("creates a <div> element", () => {
    expect((<div id="hello">world</div>).outerHTML).to.equal(
      '<div id="hello">world</div>'
    )
  })

  describe("supports publicly declared APIs", () => {
    it("supports createFactory", () => {
      expect(React.createFactory).to.be.a("function")
      const Div = React.createFactory("div")
      expect((<Div>div tag</Div>).tagName).to.equal("DIV")

      function CustomComponent(props): any {
        if (!new.target) return new (CustomComponent as any)(props)
      }
      expect(<CustomComponent />).to.be.instanceOf(CustomComponent)
    })
  })

  it("supports functional components", () => {
    function Component(props: { a: 1; b: 2; c: 3 }) {
      expect(props.a).to.equal(1)
      expect(props.b).to.equal(2)
      expect(props.c).to.equal(3)
      expect((props as any).children).to.be.empty
      return <div>{props.a + props.b + props.c}</div>
    }

    expect((<Component a={1} b={2} c={3} />).innerHTML).to.equal("6")
  })

  describe("childNodes", () => {
    it("ignores `null`", () => {
      expect((<div>{null}</div>).children).to.be.empty
    })

    it("supports deep nested childNodes", () => {
      expect((<div>{[2, 3]}</div>).textContent).to.equal("23")
      expect((<div>{[2, [2, "3", null, false, [4]]]}</div>).textContent).to.equal(
        "2234"
      )
    })

    it("supports DOM elements as childNode", () => {
      const img = document.createElement("img")
      const node = <div>{img}</div>
      expect(node.children).to.have.lengthOf(1)
      expect(node.firstElementChild).to.equal(img)
    })

    it("supports string as childNode", () => {
      expect((<div>{"text"}</div>).textContent).to.equal("text")
    })
  })

  describe("className", () => {
    it("accepts both `class`, `className` as valid input for classes.", () => {
      expect((<div className="me irl" />).className).to.equal("me irl")
      expect((<div class="me too thanks" />).className).to.equal("me too thanks")
    })

    it("accepts an array as valid input for class", () => {
      expect((<div class={["first", "second"]} />).className).to.equal(
        "first second"
      )
    })

    it("expects a recursive array as valid input for classes", () => {
      expect(
        (<div class={["first", ["second", false, "third"]]} />).className
      ).to.equal("first second third")
    })

    it("accepts an object literal as a valid input", () => {
      const node = (
        <div
          class={{
            excluded: false,
            included: true,
          }}
        />
      )

      expect(node.className).to.equal("included")
    })

    it("filters out falsy values, but not 0, from the class array", () => {
      const node = (
        <div
          class={[
            Math.PI < 3 && "Hell is freezing over",
            [].length && "should be 0",
            "rest",
          ]}
        />
      )

      expect(node.className).to.equal("0 rest")
    })
  })

  describe("attributes", () => {
    it("supports boolean attributes", () => {
      expect((<input disabled={true} />).getAttribute("disabled")).to.equal("")
      expect((<input disabled={false} />).getAttribute("disabled")).to.equal(null)
    })

    it("supports dataset", () => {
      expect((<div data-key="value" />).dataset.key).to.equal("value")
      expect((<div dataset={{ key: 0 }} />).getAttribute("data-key")).to.equal("0")
    })

    it("suppresses null / undefined dataset", () => {
      expect({
        ...(<div dataset={{ key: "", value: null, data: undefined }} />).dataset,
      }).to.deep.equal({
        key: "",
      })
    })

    it("supports innerHTML, innerText and textContent", () => {
      expect(
        (<div innerHTML="<div></div><div></div>" />).querySelectorAll("div").length
      ).to.equal(2)
      expect((<div innerText="<img>" />).querySelectorAll("img")).to.be.empty
      expect((<div innerText="<img>" />).textContent).to.equal("<img>")
      expect((<div textContent="<img>" />).querySelectorAll("img")).to.be.empty
    })

    it("supports ref store function", () => {
      let button = null
      const div = (
        <div>
          <button ref={e => (button = e)} />
        </div>
      )
      expect(button).not.to.equal(null)
      expect(div.children[0]).to.equal(button)
    })

    it("supports React style createRef.", () => {
      const ref = React.createRef()
      expect(ref).to.have.property("current", null)

      const div = (
        <div>
          <button ref={ref} />
        </div>
      )
      expect(ref).not.to.equal(null)
      expect(div.children[0]).to.equal(ref.current)
      ;<input ref={ref} />
      expect(ref).not.to.equal(null)
      expect(ref.current).to.have.property("tagName", "INPUT")
    })

    it("supports ref in functional components", () => {
      let button = null
      const Button = () => <button />
      const div = (
        <div>
          <Button ref={e => (button = e)} />
        </div>
      )
      expect(button).not.to.equal(null)
      expect(div.children[0]).to.equal(button)
    })

    it("supports defaultProps in functional components", () => {
      const Button = props => <div className={props.className} />
      Button.defaultProps = { className: "defaultClass" }
      const button = <Button />
      expect(button.className).to.equal("defaultClass")
    })

    it("supports spellCheck attribute", () => {
      expect((<input spellCheck={true} />).spellcheck).to.equal(true)
      expect((<input spellCheck={false} />).spellcheck).to.equal(false)
      expect((<textarea spellCheck={true} />).spellcheck).to.equal(true)
      expect((<textarea spellCheck={false} />).spellcheck).to.equal(false)
    })
  })

  describe("styles", () => {
    it("supports style object", () => {
      expect((<div style={{ display: "none" }} />).style.display).to.equal("none")
    })

    it("supports style string", () => {
      const el = <div style="display: none; margin: 1px;" />
      expect(el.style.display).to.equal("none")
      expect(el.style.margin).to.equal("1px")
    })
  })

  describe("events", () => {
    it("supports event listeners", done => {
      const button = (<button onClick={() => done()} />) as HTMLButtonElement
      button.click()
    })
  })

  describe("fragment", () => {
    it("supports fragments", () => {
      const frag = (
        <>
          {[2]}
          <span>Bonjour</span>
        </>
      )
      const nodes = frag.childNodes
      expect(nodes[0].nodeType === Node.TEXT_NODE && nodes[0].textContent === "2")
      expect(nodes[1].nodeName === "SPAN" && nodes[1].textContent === "Bonjour")
    })
  })

  describe("SVG", () => {
    // tslint:disable-next-line:no-shadowed-variable
    const React = svg
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

      supportedElements.forEach(one =>
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
        expect(
          node.getAttributeNS("http://www.w3.org/XML/1998/namespace", attr) ===
            "value"
        )

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
  })
})
