module.exports = {
	extends: "react-app",
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		project: "./tsconfig.json",
		sourceType: "module"
	},
	rules: {
		"@typescript-eslint/camelcase": ["error", { properties: "always" }],
		"@typescript-eslint/class-name-casing": "error",
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/no-angle-bracket-type-assertion": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ args: "none", ignoreRestSiblings: false, vars: "all" }
		],
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/type-annotation-spacing": [
			"error",
			{
				before: false,
				after: true,
				overrides: { arrow: { before: true, after: true } }
			}
		]
	}
}
