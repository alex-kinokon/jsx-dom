import { resolve } from "path"
import { ensureDir, remove, writeFile } from "fs-extra"
import { after, before, describe, it } from "mocha"
import { expect } from "chai"
import { rollup } from "rollup"
import babel from "@rollup/plugin-babel"
import { formatSource as formatCode } from "../scripts/format-source"

const TEMP_FOLDER = "./temp"
describe("Automatic Runtime", () => {
  before(async () => {
    await ensureDir(TEMP_FOLDER)
  })
  after(async () => {
    await remove(TEMP_FOLDER)
  })

  async function generateBundle(code: string, babelOptions?: Record<string, any>) {
    const entryPath = resolve(TEMP_FOLDER, "index.js")
    await writeFile(entryPath, formatCode(code))
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
    expect(output).to.have.lengthOf(1)
    return formatCode(output[0].code)
  }

  generateBundle.options = (options: Record<string, any>) => (code: string) =>
    generateBundle(code, options)

  it("should correctly import jsx functions", async () => {
    const bundle = await generateBundle(/* javascript */ `
      render(<div />)
    `)
    expect(bundle).to.equalIgnoreSpaces(/* javascript */ `
      import { jsx } from "jsx-dom/jsx-runtime"
      render(jsx("div", {}))
    `)
  })

  it("should correctly import jsx functions in development mode", async () => {
    const generate = generateBundle.options({ development: true })
    const bundle = await generate(/* javascript */ `
      render(<div />)
    `)

    expect(bundle).to.startWith('import { jsxDEV } from "jsx-dom/jsx-dev-runtime"')
    expect(bundle).to.containIgnoreSpaces(/* javascript */ `
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
