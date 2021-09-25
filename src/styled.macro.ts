import type { Node, NodePath } from "@babel/core"
import type { Identifier, Program } from "@babel/types"
import type { MacroHandler } from "babel-plugin-macros"
import { MacroError, createMacro } from "babel-plugin-macros"
import CleanCSS from "clean-css"

const { name } = process.env.TEST ? require("../package.json") : require("./package.json")

const cleanCSS = new CleanCSS()

export interface Config {}

const handler: MacroHandler = ({ references, babel: { types: t } }) => {
  const { default: defaultImport = [] } = references
  if (!defaultImport.length) return

  function handleTemplate(path: NodePath<Node>) {
    if (!t.isTaggedTemplateExpression(path.node)) {
      throw new MacroError(`styled.macro must be called as a TaggedTemplateExpression`)
    }
    const { tag, quasi } = path.node

    if (!quasi.expressions.length && quasi.quasis.length === 1) {
      const raw = quasi.quasis[0].value.cooked
      const value = cleanCSS.minify(`a{${raw}}`).styles.slice(2, -1)
      path.replaceWith(t.callExpression(tag, [t.arrayExpression([t.stringLiteral(value)])]))
    }
  }

  defaultImport.forEach(refPath => {
    const { parentPath } = refPath
    if (t.isMemberExpression(parentPath.node)) {
      handleTemplate(parentPath.parentPath)
    } else if (t.isCallExpression(parentPath.node)) {
      handleTemplate(parentPath.parentPath)
    } else {
      throw new MacroError(
        "styled.macro must be called like `styled.tag` or `styled(Component)`" +
          parentPath.node.type
      )
    }
  })

  const [node] = defaultImport
  const program = node.findParent(t.isProgram) as NodePath<Program>
  program.node.body.unshift(
    t.importDeclaration(
      [t.importSpecifier(node.node as Identifier, t.identifier("styled"))],
      t.stringLiteral(name)
    )
  )
}

export default createMacro(handler, {
  configName: "jsx-dom",
})
