import { resolve } from "path"
import { transformSync } from "@babel/core"
import { expect } from "chai"
import { describe, it } from "mocha"
import dedent from "dedent"

import "../src/styled.macro"

function javascript(list: TemplateStringsArray, ...interpols: any[]) {
  const lastIndex = list.length - 1
  const code =
    list.slice(0, lastIndex).reduce((p, s, i) => p + s + interpols[i], "") + list[lastIndex]
  const result = transformSync(code.trim(), {
    plugins: [
      [
        "babel-plugin-macros",
        {
          isMacrosName: v => /[./]macro(\.ts)?$/.test(v),
          resolvePath: () => resolve(__dirname, "../src/styled.macro.ts"),
        },
      ],
    ],
  })
  return result.code
}

describe("styled.macro", () => {
  it("should minify styled tags", () => {
    expect(javascript`
      import styled from "jsx-dom/styled.macro";

      export const Component = styled.div\`
        font-family: "Helvetica Neue";
        font-size: 16px;
      \`
    `).to.equal(dedent/* javascript */ `
      import { styled } from "jsx-dom";
      export const Component = styled.div(["font-family:\"Helvetica Neue\";font-size:16px"]);
    `)
  })

  it("should minify styled components", () => {
    expect(javascript`
      import styled from "jsx-dom/styled.macro";

      export const Component = styled(Header)\`
        font-family: "Helvetica Neue";
        font-size: 16px;
      \`
    `).to.equal(dedent/* javascript */ `
      import { styled } from "jsx-dom";
      export const Component = styled(Header)(["font-family:\"Helvetica Neue\";font-size:16px"]);
    `)
  })

  it("should throw on invalid macro calls", () => {
    const js = (code: string) => () =>
      javascript`
      import styled from "jsx-dom/styled.macro";
      ${code}
    `

    expect(js("styled.abc.div`font-family: too-long;")).to.throw()
    expect(js("styled`font-family: too-long;")).to.throw()
    expect(js("styled(ABC)(DEF)/* a */``")).to.throw()
  })
})
