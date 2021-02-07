import { React } from "./register"
import { expect } from "chai"

describe("hooks", () => {
  it("supports useText", () => {
    const [text, setText] = React.useText("Initial value")
    const div = <div>{text}</div>
    expect(div.children).to.include(text)
    expect(div.textContent).to.equal("Initial value")
    setText("Second iteration")
    expect(text.textContent).to.equal("Second iteration")
    expect(div.textContent).to.equal("Second iteration")
  })

  it("supports useRef", () => {
    const ref = React.useRef<HTMLButtonElement>()
    expect(ref).to.have.property("current", null)

    const div = (
      <div>
        <button ref={ref} />
      </div>
    )
    expect(ref).not.to.equal(null)
    expect(div.children[0]).to.equal(ref.current)

    const ref2 = React.useRef<HTMLInputElement>()
    cast(<input ref={ref2} />)
    expect(ref2).not.to.equal(null)
    expect(ref2.current).to.have.property("tagName", "INPUT")
  })

  it("supports useClassList", () => {
    const cls = React.useClassList()
    cls.add("me")
    const div = <div class={cls} />
    expect(div.className).to.equal("me")
    expect(cls.size).to.equal(1)

    cls.add("second")
    expect(div.className).to.equal("me second")
    expect(div.className).to.equal(cls.value)
    expect(cls.size).to.equal(2)

    cls.remove("me")
    expect(div.className).to.equal("second")

    cls.add("container")
    expect(cls.contains("container")).to.be.true

    cls.toggle("never")
    expect(cls.contains("never")).to.be.true

    cls.toggle("never")
    expect(cls.contains("never")).to.be.false

    cls.toggle("container", false)
    expect(cls.contains("container")).to.be.false
  })
})
