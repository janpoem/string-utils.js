import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
	{
		input:   'index.es.js',
		output:  [
			{file: 'index.js', format: 'cjs', sourcemap: true},
		],
		plugins: [
			resolve({}),
			commonjs(),
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: false
						}
					]
				],
				exclude: 'node_modules/**'
			})
		]
	}
];