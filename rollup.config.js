import ts from '@alexlur/rollup-plugin-typescript';
import * as babel from 'babel-core';

function transformBundle(code) {
	const transformed = babel.transform(code, {
		babelrc: false,
		comments: false,
		minified: false,
	});
	return {
		code: transformed.code,
		map: transformed.map,
	};
}

export default {
	entry: './src/index.ts',
	plugins: [
		ts(),
		{ transformBundle },
	],
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	]
}