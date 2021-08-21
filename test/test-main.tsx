/* eslint-disable react/no-unknown-property */
import { expect } from "chai"
import type { HTML } from "../index"
import { React, React as lib } from "./register"

describe("jsx-dom", () => {
  it("creates a <div> element", () => {
    expect((<div id="hello">world</div>).outerHTML).to.equal('<div id="hello">world</div>')
  })

  describe("supports publicly declared APIs", () => {
    it("supports createFactory", () => {
      expect(lib.createElement).to.be.a("function")
      expect(lib.createFactory).to.be.a("function")
      expect(lib.createRef).to.be.a("function")
      expect(lib.jsx).to.be.a("function")
      expect(lib.useCallback).to.be.a("function")
      expect(lib.useMemo).to.be.a("function")
      expect(lib.useRef).to.be.a("function")
      expect(lib.useText).to.be.a("function")

      const Div = lib.createFactory("div")
      expect((<Div>div tag</Div>).tagName).to.equal("DIV")

      function CustomComponent(props: any): any {
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
      expect(cast(props).children).to.be.empty
      return <div>{props.a + props.b + props.c}</div>
    }

    expect((<Component a={1} b={2} c={3} />).innerHTML).to.equal("6")
  })

  it("supports class components", () => {
    class Component extends React.Component<{ a: number; b: number; c: number }> {
      constructor(props: { a: 1; b: 2; c: 3 }) {
        super(props)
      }

      render() {
        expect(this.props.a).to.equal(1)
        expect(this.props.b).to.equal(2)
        expect(this.props.c).to.equal(3)
        expect(this.props.children).to.be.empty
        return <div>{this.props.a + this.props.b + this.props.c}</div>
      }
    }

    expect((<Component a={1} b={2} c={3} />).innerHTML).to.equal("6")
  })

  it("supports dynamic tagname", () => {
    const TagName = "div"
    expect((<TagName />).tagName).to.equal(TagName.toUpperCase())
  })

  it("supports React automatic runtime", () => {
    expect(
      lib.jsx("div", {
        className: "className",
      }).outerHTML
    ).to.equal('<div class="className"></div>')

    expect(
      lib.jsx("div", {
        className: "className",
        children: "One child",
      }).outerHTML
    ).to.equal('<div class="className">One child</div>')

    expect(
      lib.jsx("div", {
        className: "className",
        children: [
          "One child",
          lib.jsx("div", { className: "child", children: "Two children" }),
        ],
      }).outerHTML
    ).to.equal('<div class="className">One child<div class="child">Two children</div></div>')
  })

  describe("childNodes", () => {
    it("ignores `null`", () => {
      expect((<div>{null}</div>).children).to.be.empty
    })

    it("supports deep nested childNodes", () => {
      expect((<div>{[2, 3]}</div>).textContent).to.equal("23")
      expect((<div>{[2, [2, "3", null, false, [4]]]}</div>).textContent).to.equal("2234")
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

    it("supports Node as childNode", () => {
      const span = document.createElement("span")
      const img = document.createElement("img")
      span.append(img)

      const node = <div>{span.firstChild}</div>
      expect(node.children).to.have.lengthOf(1)
      expect(node.firstElementChild).to.equal(img)
    })

    it("supports NodeList as childNode", () => {
      const span = document.createElement("span")
      const img = document.createElement("img")
      span.append(img)

      const node = <div>{span.childNodes}</div>
      expect(node.children).to.have.lengthOf(1)
      expect(node.firstElementChild).to.equal(img)
    })

    it("supports HTMLCollection as childNode", () => {
      const span = document.createElement("span")
      const img = document.createElement("img")
      span.append(img)

      const node = <div>{span.children}</div>
      expect(node.children).to.have.lengthOf(1)
      expect(node.firstElementChild).to.equal(img)
    })

    it("children must be copied before iteration", () => {
      const span = document.createElement("span")
      const img = document.createElement("img")
      const code = document.createElement("code")
      span.append(img, code)

      const node = <div>{span.children}</div>
      expect(node.children).to.have.lengthOf(2)
      expect(node.firstElementChild).to.equal(img)
      expect(node.lastElementChild).to.equal(code)
    })

    it("supports passing `children` explicitly", () => {
      expect((<div children="internal" />).textContent).to.equal("internal")
      expect((<div children={["internal", 20]} />).textContent).to.equal("internal20")
    })

    it("will not override JSX childNodes with `children` attribute", () => {
      expect((<div children="i">override</div>).textContent).to.equal("override")
    })
  })

  describe("className", () => {
    it("accepts both `class`, `className` as valid input for classes.", () => {
      expect((<div className="me irl" />).className).to.equal("me irl")
      expect((<div class="me too thanks" />).className).to.equal("me too thanks")
    })

    it("accepts an array as valid input for class", () => {
      expect((<div class={["first", "second"]} />).className).to.equal("first second")
    })

    it("expects a recursive array as valid input for classes", () => {
      expect((<div class={["first", ["second", false, "third"]]} />).className).to.equal(
        "first second third"
      )
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
      const node = <div class={[Math.PI < 3 && "PI < 3?", [].length && "should be 0", "rest"]} />

      expect(node.className).to.equal("0 rest")
    })
  })

  describe("attributes", () => {
    describe.skip("supports boolean properties", () => {
      class MyCustomElement extends HTMLElement {
        isBoolean: boolean
        constructor() {
          super()
        }
      }

      customElements.define("boolean-test", MyCustomElement)
      it("shoud attach truly attribute as property", () => {
        expect((<boolean-test isBoolean={true} />).isBoolean).to.equal(true)
      })

      it("shoud attach falsy attribute as property", () => {
        expect((<boolean-test isBoolean={false} />).isBoolean).to.equal(false)
      })
    })

    it("supports complex objects attributes as properties", () => {
      class MyCustomElement extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define("rich-data-test", MyCustomElement)
      const richData = { foo: "bar" }
      expect((<rich-data-test richData={richData} />).richData).to.equal(richData)
    })

    it("supports boolean attributes", () => {
      expect((<input disabled={true} />).getAttribute("disabled")).to.equal("")
      expect((<input disabled={false} />).getAttribute("disabled")).to.equal(null)
    })

    it("supports dataset", () => {
      expect((<div data-key="value" />).dataset.key).to.equal("value")
      expect((<div dataset={{ key: "0" }} />).getAttribute("data-key")).to.equal("0")
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

    it("supports dangerouslySetInnerHTML", () => {
      expect(
        (
          <div dangerouslySetInnerHTML={{ __html: "<div></div><div></div>" }} />
        ).querySelectorAll("div").length
      ).to.equal(2)

      expect(
        (
          <svg dangerouslySetInnerHTML={{ __html: "<path></path><path></path>" }} />
        ).querySelectorAll("path").length
      ).to.equal(2)
    })

    it("supports ref store function", () => {
      let button = null
      const div = (
        <div>
          <button ref={e => (button = e)} />
        </div>
      )
      expect(button).not.to.be.null
      expect(div.children[0]).to.equal(button)
    })

    it("supports React style createRef.", () => {
      const ref = lib.createRef()
      expect(ref).to.have.property("current", null)

      const div = (
        <div>
          <button ref={ref} />
        </div>
      )
      expect(ref).not.to.be.null
      expect(div.children[0]).to.equal(ref.current)
      cast(<input ref={ref} />)
      expect(ref).not.to.be.null
      expect(ref.current).to.have.property("tagName", "INPUT")
    })

    it("supports ref in functional components", () => {
      let button = null
      const Button = ({ ref }) => <button ref={ref} />
      const div = (
        <div>
          <Button ref={e => (button = e)} />
        </div>
      )
      expect(button).not.to.be.null
      expect(div.children[0]).to.equal(button)
    })

    it("supports defaultProps in functional components", () => {
      const Button = (props: any) => <div className={props.className} />
      Button.defaultProps = { className: "defaultClass" }
      const button = <Button />
      expect(button.className).to.equal("defaultClass")
    })

    it("supports defaultProps in class components", () => {
      class Button extends lib.Component<{ className: string }> {
        static defaultProps = { className: "defaultClass" }
        render() {
          return <div className={this.props.className} />
        }
      }
      // @ts-ignore
      const button = <Button />
      expect(button.className).to.equal("defaultClass")
    })

    it("supports spellCheck attribute", () => {
      expect(cast<HTML.Input>(<input spellCheck={true} />).spellcheck).to.equal(true)
      expect(cast<HTML.Input>(<input spellCheck={false} />).spellcheck).to.equal(false)
      expect(cast<HTML.TextArea>(<textarea spellCheck={true} />).spellcheck).to.equal(true)
      expect(cast<HTML.TextArea>(<textarea spellCheck={false} />).spellcheck).to.equal(false)
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

  describe("forwardRef", () => {
    // const FancyButton = React.forwardRef((props, ref) => (
    const FancyButton = props => (
      <button ref={props.ref} className="FancyButton">
        {props.children}
      </button>
    )

    // You can now get a ref directly to the DOM button:
    const ref = lib.createRef()
    cast(<FancyButton ref={ref}>Click me!</FancyButton>)
    expect(ref.current).to.be.instanceOf(HTMLButtonElement)
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
      expect(nodes[0].nodeType).to.equal(Node.TEXT_NODE)
      expect(nodes[0].textContent).to.equal("2")
      expect(nodes[1].nodeName).to.equal("SPAN")
      expect(nodes[1].textContent).to.equal("Bonjour")
    })

    it("supports fragments with explicit tag", () => {
      const frag = (
        <lib.Fragment>
          {[2]}
          <span>Bonjour</span>
        </lib.Fragment>
      )
      const nodes = frag.childNodes
      expect(nodes[0].nodeType).to.equal(Node.TEXT_NODE)
      expect(nodes[0].textContent).to.equal("2")
      expect(nodes[1].nodeName).to.equal("SPAN")
      expect(nodes[1].textContent).to.equal("Bonjour")
    })

    it("supports fragments with one child", () => {
      const frag = (
        <>
          <span>Text</span>
        </>
      )
      const nodes = frag.childNodes
      expect(nodes).to.have.lengthOf(1)
      expect(nodes[0].nodeName).to.equal("SPAN")
      expect(nodes[0].textContent).to.equal("Text")
    })
  })

  describe("web component events", () => {
    customElements.define("web-component", class WebComponent extends HTMLElement {})
  })

  describe("templates", () => {
    it("supports templates", () => {
      const template = (
        <template>
          {[2]}
          <span>Bonjour</span>
        </template>
      ) as HTMLTemplateElement

      const nodes = template.content.childNodes
      expect(nodes[0].nodeType).to.equal(Node.TEXT_NODE)
      expect(nodes[0].textContent).to.equal("2")
      expect(nodes[1].nodeName).to.equal("SPAN")
      expect(nodes[1].textContent).to.equal("Bonjour")
    })
  })
})
