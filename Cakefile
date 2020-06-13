babel = require('rollup-plugin-babel')
replace = require('@rollup/plugin-replace')
prettier = require('rollup-plugin-prettier')
node = require('@rollup/plugin-node-resolve').default
{ rollup } = require('rollup')

extensions = ['.ts', '.js']

build = (name, inject) ->
  try
    bundle = await rollup
      input: './src/module.ts'
      plugins: [
        replace(inject),
        babel(
          extensions: extensions
          comments: false
          minified: false
          plugins: [
            '@babel/plugin-transform-typescript'
            ['@babel/plugin-proposal-object-rest-spread', loose: true, useBuiltIns: true]
            'minify-constant-folding'
            'minify-guarded-expressions'
            'minify-dead-code-elimination'
            ({ types: t }) ->
              visitor:
                CallExpression: (path) ->
                  if t.isIdentifier(path.node.callee, name: 'cast')
                    path.replaceWith(path.node.arguments[0])
                  return
          ]
        )
        prettier(tabWidth: 2, parser: 'babel'),
        node({extensions})
      ]
    await bundle.write(format: 'cjs', file: "lib/#{name}.cjs.js", exports: "named")
    await bundle.write(format: 'es', file: "lib/#{name}.js", exports: "named")
  catch e
    console.trace()
    console.error(e)

task 'build-min', 'Build min jsx-dom', ->
  await build('min', __FULL_BUILD__: false)

task 'build-main', 'Build jsx-dom', ->
  await build('index', __FULL_BUILD__: true)

task 'build', 'Build everything', ->
  invoke('build-min')
  invoke('build-main')
