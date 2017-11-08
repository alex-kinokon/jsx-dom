fs = require 'fs'
ts = require '@alexlur/rollup-plugin-typescript'
babel = require 'babel-core'
replace = require 'rollup-plugin-replace'
prettier = require 'rollup-plugin-prettier'
{ rollup } = require 'rollup'

transformBundle = (code) ->
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
				{ transformBundle },
				prettier(tabWidth: 2)
			]
		await bundle.write(format: 'cjs', file: "./#{name}.cjs.js")
		await bundle.write(format: 'es', file: "./#{name}.js")
	catch e
		console.trace()
		console.error e

task 'build-slim', 'Build jsx-dom without SVG', ->
	build('index', __SVG__: false)

task 'build-svg', 'Build jsx-dom with SVG', ->
	build('svg', __SVG__: true)

task 'build', 'Build everything', ->
	invoke 'build-slim'
	invoke 'build-svg'

task 'clean', 'Remove built files', ->
	fs.unlinkSync './index.cjs.js'
	fs.unlinkSync './index.js'
	fs.unlinkSync './svg.cjs.js'
	fs.unlinkSync './svg.js'