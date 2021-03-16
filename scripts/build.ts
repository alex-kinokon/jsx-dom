#!/usr/bin/env ts-node-transpile-only
import * as fs from "fs-extra"
import { resolve } from "path"
import babel from "@rollup/plugin-babel"
import replace, { RollupReplaceOptions } from "@rollup/plugin-replace"
import prettier from "rollup-plugin-prettier"
import node from "@rollup/plugin-node-resolve"
import { rollup } from "rollup"

const extensions = [".ts", ".js"]
const jsxRuntimeExports = ["jsx", "jsxs", "Fragment"]

const OUT_DIR = resolve(__dirname, "../build")
const OUT_DIR_MIN = resolve(OUT_DIR, "./min")

type NamedExport = string | [string, string]

interface BuildOptions {
  input: string
  outputDir: string
  inject: RollupReplaceOptions
}

const prepareOptions = function (name: string, options?: Partial<BuildOptions>) {
  return {
    input: `./src/${name}.ts`,
    outputDir: OUT_DIR,
    inject: {},
    ...options,
  } as BuildOptions
}

const $build = async function (name: string, options?: Partial<BuildOptions>) {
  options = prepareOptions(name, options)

  const bundle = await rollup({
    input: options.input,
    plugins: [
      replace(options.inject),
      babel({
        extensions,
        comments: false,
        minified: false,
        babelHelpers: "bundled",
        plugins: [
          "@babel/plugin-transform-typescript",
          "minify-constant-folding",
          "minify-guarded-expressions",
          "minify-dead-code-elimination",
          ({ types: t }) => ({
            visitor: {
              CallExpression(path) {
                if (t.isIdentifier(path.node.callee, { name: "cast" })) {
                  path.replaceWith(path.node.arguments[0])
                }
              },
            },
          }),
        ],
      }),
      prettier({ tabWidth: 2, parser: "babel" }),
      node({ extensions }),
    ],
  })

  await Promise.all([
    bundle.write({
      format: "cjs",
      file: `${options.outputDir}/${name}.cjs.js`,
      exports: "named",
    }),
    bundle.write({ format: "es", file: `${options.outputDir}/${name}.js`, exports: "named" }),
  ])
}

async function copyPackage() {
  const source = await fs.readJSON(resolve(__dirname, "../package.json"))
  delete source.devDependencies
  delete source.scripts
  delete source.prettier
  await fs.writeJSON(resolve(OUT_DIR, "package.json"), source, { spaces: 2 })
}

async function provideReexport(
  name: string,
  dest: string,
  src: string,
  namedExports?: NamedExport[]
) {
  const imports = namedExports
    ? `{\n${namedExports
        .map((x) => `  ${Array.isArray(x) ? `${x[0]} as ${x[1]}` : x},\n`)
        .join("")}}`
    : "*"
  const content = `export ${imports} from "${src}"`

  await fs.mkdirp(dest)
  await fs.writeFile(resolve(dest, name), content)
}

// https://github.com/jprichardson/node-fs-extra/issues/323
const copy = (src: string, dest: string) => fs.copy(src, resolve(dest, src))

export async function build() {
  await fs.ensureDir(OUT_DIR)
  await Promise.all([
    copyPackage(),
    copy("index.d.ts", OUT_DIR),
    copy("README.md", OUT_DIR),
    copy("CHANGELOG.md", OUT_DIR),
    copy("LICENSE", OUT_DIR),

    $build("index", { inject: { __FULL_BUILD__: "true" } }),
    $build("index", { outputDir: OUT_DIR_MIN, inject: { __FULL_BUILD__: "false" } }),
    $build("jsx-runtime", { inject: { "./jsx-dom": "jsx-dom", delimiters: ["", ""] } }),
    $build("jsx-runtime", {
      outputDir: OUT_DIR_MIN,
      inject: { "./jsx-dom": "jsx-dom/min", delimiters: ["", ""] },
    }),

    provideReexport("index.d.ts", OUT_DIR_MIN, "../index"),
    provideReexport("jsx-runtime.d.ts", OUT_DIR_MIN, "./index", jsxRuntimeExports),
    provideReexport("jsx-runtime.d.ts", OUT_DIR, "./index", jsxRuntimeExports),
  ])
}

const args = process.argv.slice(2)
exports[args[0]]()
