import { resolve } from "node:path"
import fs from "node:fs/promises"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { expect as chai } from "chai"
import { rollup } from "rollup"
import babel from "@rollup/plugin-babel"
import { formatSource as formatCode } from "../scripts/format-source"

const TEMP_FOLDER = "./temp"
describe("Automatic Runtime", () => {
  beforeAll(async () => {
    await fs.mkdir(TEMP_FOLDER, { recursive: true })
  })
  afterAll(async () => {
    await fs.rm(TEMP_FOLDER, { recursive: true })
  })

  async function generateBundle(code: string, babelOptions?: Record<string, any>) {
    const entryPath = resolve(TEMP_FOLDER, "index.js")
    await fs.writeFile(entryPath, await formatCode(code))
    const build = await rollup({
      input: entryPath,
      external: path => path.startsWith("jsx-dom"),
      context: "this",
      plugins: [
        babel({
          babelrc: false,
          babelHelpers: "inline",
          presets: [
            [
              "@babel/preset-react",
              { runtime: "automatic", importSource: "jsx-dom", ...babelOptions },
            ],
          ],
        }),
      ],
    })
    const { output } = await build.generate({})
    expect(output).toHaveLength(1)
    return await formatCode(output[0].code)
  }

  generateBundle.options = (options: Record<string, any>) => (code: string) =>
    generateBundle(code, options)

  it("should correctly import jsx functions", async () => {
    const bundle = await generateBundle(/* javascript */ `
      render(<div />)
    `)
    chai(bundle).to.equalIgnoreSpaces(/* javascript */ `
      import { jsx } from "jsx-dom/jsx-runtime"
      render(jsx("div", {}))
    `)
  })

  it("should correctly import jsx functions in development mode", async () => {
    const generate = generateBundle.options({ development: true })
    const bundle = await generate(/* javascript */ `
      render(<div />)
    `)

    chai(bundle).to.startWith('import { jsxDEV } from "jsx-dom/jsx-dev-runtime"')
    chai(bundle).to.containIgnoreSpaces(/* javascript */ `
      render(
        jsxDEV("div", {}, void 0, false, { 
          fileName: _jsxFileName,
          lineNumber: 1,
          columnNumber: 8,
        }, this)
      )
    `)
  })
})
