#!/usr/bin/env node -r ts-node/register/transpile-only
import * as fs from "fs-extra"
import { resolve } from "path"
import babel from "@rollup/plugin-babel"
import replace, { RollupReplaceOptions } from "@rollup/plugin-replace"
import prettier from "rollup-plugin-prettier"
import node from "@rollup/plugin-node-resolve"
import { rollup } from "rollup"

const extensions = [".ts", ".js"]

const OUT_DIR = resolve(__dirname, "../build")

const $build = async function (name: string, inject: RollupReplaceOptions) {
  const bundle = await rollup({
    input: "./src/index.ts",
    plugins: [
      replace(inject),
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
    bundle.write({ format: "cjs", file: `${OUT_DIR}/${name}.cjs.js`, exports: "named" }),
    bundle.write({ format: "es", file: `${OUT_DIR}/${name}.js`, exports: "named" }),
  ])
}

async function copyPackage() {
  const source = await fs.readJSON(resolve(__dirname, "../package.json"))
  delete source.devDependencies
  delete source.scripts
  delete source.prettier
  await fs.writeJSON(resolve(OUT_DIR, "package.json"), source, { spaces: 2 })
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
    $build("min", { __FULL_BUILD__: "false" }),
    $build("index", { __FULL_BUILD__: "true" }),
  ])
}

const args = process.argv.slice(2)
exports[args[0]]()
