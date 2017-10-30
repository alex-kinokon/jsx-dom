fs = require 'fs'
ts = require '@alexlur/rollup-plugin-typescript'
babel = require 'babel-core'
{ rollup } = require 'rollup'

transformBundle = (code) ->
	transformed = babel.transform code,
		babelrc: false
		comments: true
		minified: false
	code: transformed.code
	map: transformed.map

rollupPluginExternal = ['tslib']
rollupPlugins = -> [
  ts(),
  { transformBundle }
]

task 'build-slim', 'Build jsx-dom without SVG', ->
	try
		bundle = await rollup
			input: './src/index.ts'
			external: rollupPluginExternal
			plugins: rollupPlugins()
		cjs = await bundle.generate format: 'cjs'
		es = await bundle.generate format: 'es'
		fs.writeFileSync './index.cjs.js', cjs.code
		fs.writeFileSync './index.js', es.code
	catch e
		console.error e

task 'build-svg', 'Build jsx-dom with SVG', ->
	try
		bundle = await rollup
			input: './src/svg.ts'
			external: rollupPluginExternal
			plugins: rollupPlugins()
		cjs = await bundle.generate format: 'cjs'
		es = await bundle.generate format: 'es'
		fs.writeFileSync './svg.cjs.js', cjs.code
		fs.writeFileSync './svg.js', es.code
	catch e
		console.error e

task 'build', 'Build everything', ->
	invoke 'build-slim'
	invoke 'build-svg'

task 'clean', 'Remove built files', ->
	fs.unlinkSync './index.cjs.js'
	fs.unlinkSync './index.js'
	fs.unlinkSync './svg.cjs.js'
	fs.unlinkSync './svg.js'