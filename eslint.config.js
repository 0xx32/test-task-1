import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
	{
		vue: true,
		typescript: true,
		formatters: false,
		stylistic: false,
	},
	{
		rules: {
			'vue/html-indent': 'off',
		},
	},
	{
		name: '0x32/sort',
		plugins: {
			perfectionist,
		},
		rules: {
			'perfectionist/sort-array-includes': [
				'error',
				{
					order: 'asc',
					type: 'alphabetical',
				},
			],

			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'type',
						['value-builtin', 'value-external'],
						'type-internal',
						'value-internal',
						['type-parent', 'type-sibling', 'type-index'],
						['value-parent', 'value-sibling', 'value-index'],
						'side-effect-style',
						'unknown',
					],
					internalPattern: ['^~/.*', '^@/.*'],
					newlinesBetween: 1,
					order: 'asc',
					type: 'natural',
				},
			],

			'perfectionist/sort-interfaces': [
				'error',
				{
					groups: ['unknown', 'method'],
					order: 'asc',
					type: 'alphabetical',
				},
			],

			'perfectionist/sort-union-types': [
				'error',
				{
					groups: [
						'conditional',
						'function',
						'import',
						'intersection',
						'keyword',
						'literal',
						'named',
						'object',
						'operator',
						'tuple',
						'union',
						'nullish',
					],
					order: 'asc',
					specialCharacters: 'keep',
					type: 'alphabetical',
				},
			],
		},
	}
)
