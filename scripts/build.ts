#!/usr/bin/env ts-node-transpile-only
import * as fs from "fs-extra"
import { resolve } from "path"
import babel from "@rollup/plugin-babel"
import replace, { RollupReplaceOptions } from "@rollup/plugin-replace"
import prettier from "rollup-plugin-prettier"
import node from "@rollup/plugin-node-resolve"
import { rollup } from "rollup"
import { formatSource } from "./format-source"

const extensions = [".ts", ".js"]
const jsxRuntimeExports = ["jsx", "jsxs", "Fragment", "JSX"]

const OUT_DIR = resolve(__dirname, "../build")
const OUT_DIRS = {
  commonjs: {
    FULL: resolve(OUT_DIR, "./cjs"),
    MIN: resolve(OUT_DIR, "./cjs/min"),
  },
  es: {
    FULL: resolve(OUT_DIR, "./esm"),
    MIN: resolve(OUT_DIR, "./esm/min"),
  },
  types: {
    FULL: resolve(OUT_DIR, "./types"),
    MIN: resolve(OUT_DIR, "./types/min"),
  },
}

interface BuildOptions {
  format: "commonjs" | "es"
  outputDir: string
  inject?: RollupReplaceOptions
}

const buildRollup = async function (name: string, { outputDir, format, inject }: BuildOptions) {
  const bundle = await rollup({
    input: `./src/${name}.ts`,
    external: ["jsx-dom", "jsx-dom/min"],
    plugins: [
      replace({ ...inject, preventAssignment: true }),
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

  await bundle.write({
    format,
    file: `${outputDir}/${name}.js`,
    exports: "named",
  })
}

async function copyPackageJson() {
  const source = await fs.readJSON(resolve(__dirname, "../package.json"))
  delete source.devDependencies
  delete source.private
  delete source.scripts
  delete source.prettier
  source.type = "module"
  await fs.writeJSON(resolve(OUT_DIR, "package.json"), source, { spaces: 2 })
}

async function reexport(name: string, dest: string, src: string, namedExports?: string[]) {
  const imports = namedExports ? `{${namedExports.join(",")}}` : "*"
  const content = `export ${imports} from "${src}"`

  await fs.mkdirp(dest)
  await fs.writeFile(resolve(dest, name), formatSource(content))
}

// https://github.com/jprichardson/node-fs-extra/issues/323
const copy = (src: string, dest: string) => fs.copy(src, resolve(dest, src))

export async function build() {
  await fs.remove(OUT_DIR)
  await fs.ensureDir(OUT_DIR)
  await Promise.all([
    copyPackageJson(),
    copy("README.md", OUT_DIR),
    copy("CHANGELOG.md", OUT_DIR),
    copy("LICENSE", OUT_DIR),
    fs.writeFile(resolve(OUT_DIR, "jsx-dev-runtime.js"), 'export * from "./esm/jsx-runtime"'),

    // build commonjs
    buildRollup("index", {
      format: "commonjs",
      outputDir: OUT_DIRS.commonjs.FULL,
      inject: { __FULL_BUILD__: "true" },
    }),
    buildRollup("index", {
      format: "commonjs",
      outputDir: OUT_DIRS.commonjs.MIN,
      inject: { __FULL_BUILD__: "false" },
    }),
    buildRollup("jsx-runtime", {
      format: "commonjs",
      outputDir: OUT_DIRS.commonjs.FULL,
      inject: { "./jsx-dom": "jsx-dom", delimiters: ["", ""] },
    }),
    buildRollup("jsx-runtime", {
      format: "commonjs",
      outputDir: OUT_DIRS.commonjs.MIN,
      inject: { "./jsx-dom": "jsx-dom/min", delimiters: ["", ""] },
    }),

    // build es
    buildRollup("index", {
      format: "es",
      outputDir: OUT_DIRS.es.FULL,
      inject: { __FULL_BUILD__: "true" },
    }),
    buildRollup("index", {
      format: "es",
      outputDir: OUT_DIRS.es.MIN,
      inject: { __FULL_BUILD__: "false" },
    }),
    buildRollup("jsx-runtime", {
      format: "es",
      outputDir: OUT_DIRS.es.FULL,
      inject: { "./jsx-dom": "jsx-dom", delimiters: ["", ""] },
    }),
    buildRollup("jsx-runtime", {
      format: "es",
      outputDir: OUT_DIRS.es.MIN,
      inject: { "./jsx-dom": "jsx-dom/min", delimiters: ["", ""] },
    }),

    // build typescript types
    copy("index.d.ts", OUT_DIRS.types.FULL),
    reexport("index.d.ts", OUT_DIRS.types.MIN, "../index"),
    reexport("jsx-runtime.d.ts", OUT_DIRS.types.MIN, "./index", jsxRuntimeExports),
    reexport("jsx-runtime.d.ts", OUT_DIRS.types.FULL, "./index", jsxRuntimeExports),
  ])
}

const args = process.argv.slice(2)
exports[args[0]]()
