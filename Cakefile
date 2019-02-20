fs = require('fs-extra')
ts = require('rollup-typescript')
babel = require('@babel/core')
replace = require('rollup-plugin-replace')
prettier = require('rollup-plugin-prettier')
{ rollup } = require('rollup')

renderChunk = (code) ->
  transformed = babel.transform code,
    babelrc: false
    comments: true
    minified: false
    plugins: [
      'minify-constant-folding'
      'minify-guarded-expressions'
      'minify-dead-code-elimination'
    ]
  code: transformed.code
  map: transformed.map

rollupPluginExternal = ['tslib']

build = (name, inject) ->
  try
    bundle = await rollup
      input: './src/index.ts'
      external: rollupPluginExternal
      plugins: [
        ts(),
        replace(inject),
        { renderChunk },
        prettier(tabWidth: 2)
      ]
    await bundle.write(format: 'cjs', file: "lib/#{name}.cjs.js")
    await bundle.write(format: 'es', file: "lib/#{name}.js")
  catch e
    console.trace()
    console.error(e)

task 'build-slim', 'Build jsx-dom without SVG', ->
  await build('index', __SVG__: false)

task 'build-svg', 'Build jsx-dom with SVG', ->
  await build('svg', __SVG__: true)

task 'build', 'Build everything', ->
  invoke('build-slim')
  invoke('build-svg')

task 'clean', 'Remove built files', ->
  await fs.unlink('lib/index.cjs.js')
  await fs.unlink('lib/index.js')
  await fs.unlink('lib/svg.cjs.js')
  await fs.unlink('lib/svg.js')