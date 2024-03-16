import { expect } from "chai"
import { forEach } from "lodash"
import { describe, it } from "vitest"
import * as React from "../src"
import { htmlElementTags } from "./assets.json"

describe("styled components", () => {
  const { styled } = React
  const str = JSON.stringify

  function assertStyle(node: any, style: Record<string, string>) {
    let length = 0
    forEach(style, (value, key) => {
      expect(node.style[key]).to.deep.equal(value, `Expecting ${str(key)} to be ${str(value)}`)
      length++
    })
    expect(node.style.length).to.deep.equal(length, `Expected style to have ${length} rule(s)`)
  }

  it("creates a styled <div> element", () => {
    const BigDiv = styled.div`
      font-family: Arial;
      font-size: 20px;
    `
    assertStyle(<BigDiv />, {
      fontFamily: "Arial",
      fontSize: "20px",
    })
  })

  it("supports all HTML tags in `keyof HTMLElementTagNameMap`", () => {
    for (const tag of htmlElementTags) {
      const Component = styled[tag]``
      expect((<Component />).tagName).to.deep.equal(tag.toUpperCase())
    }
  })

  it("supports functional components", () => {
    const Header = (props: { style; prefix: string; children; weight: number }) => (
      <span style={props.style} class="header">
        {props.prefix}
        {props.children}
      </span>
    )
    const StyledHeader = styled(Header)`
      font-size: 20px;
      font-weight: ${p => p.weight};
    `
    const node = (
      // @ts-expect-error @TODO: Fix error where `children` prop is required
      <StyledHeader prefix="Prefix: " weight={600}>
        Text
      </StyledHeader>
    )
    assertStyle(node, { fontSize: "20px", fontWeight: "600" })
    expect(node.tagName).to.deep.equal("SPAN")
    expect(node.innerText).to.deep.equal("Prefix: Text")
  })

  it("allows overriding styles", () => {
    const Div = styled.div`
      font-size: 20px;
    `
    assertStyle(<Div style={{ fontSize: 25 }} />, {
      fontSize: "25px",
    })
  })

  it("supports prop function interpolations", () => {
    const BigDiv = styled.div<{
      base: number
      centered?: boolean
    }>`
      font-family: Arial;
      font-size: ${props => props.base + 1}px;
      ${props => props.centered && "text-align: center;"}
    `
    assertStyle(<BigDiv base={10} />, {
      fontFamily: "Arial",
      fontSize: "11px",
    })
    assertStyle(<BigDiv base={100} centered />, {
      fontFamily: "Arial",
      fontSize: "101px",
      textAlign: "center",
    })
  })
})
