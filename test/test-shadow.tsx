import { expect } from "chai"
import { describe, it } from "mocha"
import sinon from "sinon"
import { React } from "./register"

describe("shadow", () => {
  const { ShadowRoot: Shadow } = React

  it("ShadowRoot should not expose HTML", () => {
    expect(
      (
        <div>
          <Shadow mode="open">world</Shadow>
        </div>
      ).outerHTML
    ).to.equal("<div></div>")
  })

  it("supports mode `open`", () => {
    const div = (
      <div>
        <Shadow mode="open">
          <i>world</i>
        </Shadow>
      </div>
    ) as HTMLDivElement

    expect(div.shadowRoot).to.exist
    expect(div.shadowRoot.mode).to.equal("open")
    expect(div.shadowRoot.innerHTML).to.equal("<i>world</i>")
  })

  it("supports mode `closed`", () => {
    const ref = React.createRef<ShadowRoot>()

    const div = (
      <div>
        <Shadow mode="closed" ref={ref}>
          <b>world</b>
        </Shadow>
      </div>
    ) as HTMLDivElement

    expect(div.shadowRoot).to.be.null
    expect(ref.current!.innerHTML).to.equal("<b>world</b>")
  })

  it("supports ref on ShadowRoot", () => {
    const ref1 = React.createRef<ShadowRoot>()
    Object(
      <div>
        <Shadow ref={ref1} mode="open">
          world
        </Shadow>
      </div>
    )

    expect(ref1.current).to.be.instanceOf(ShadowRoot)

    const ref2 = sinon.fake<[ShadowRoot], void>()
    Object(
      <div>
        <Shadow ref={ref2} mode="open">
          world
        </Shadow>
      </div>
    )

    expect(ref2.calledOnce)
    expect(ref2.args[0]).to.have.lengthOf(1)
    expect(ref2.args[0][0]).to.be.instanceOf(ShadowRoot)
  })
})
