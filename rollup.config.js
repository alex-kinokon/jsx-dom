import buble from 'rollup-plugin-buble';

export default {
	entry: './src/index',
	plugins: [
		buble({
			transforms: {
				dangerousForOf: true
			}
		})
	],
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' }
	]
}