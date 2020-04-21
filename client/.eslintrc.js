module.exports = {
	extends: "react-app",
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		project: "./client/tsconfig.json",
		sourceType: "module",
	},
	root: true,
	rules: {
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "generic",
			},
		],
		"@typescript-eslint/camelcase": ["error", { properties: "always" }],
		"@typescript-eslint/class-name-casing": "error",
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{
				assertionStyle: "as",
				objectLiteralTypeAssertions: "allow-as-parameter",
			},
		],
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/member-delimiter-style": [
			"warn",
			{
				multiline: {
					delimiter: "none",
					requireLast: false,
				},
				singleline: {
					delimiter: "comma",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ args: "none", ignoreRestSiblings: false, vars: "all" },
		],
		"@typescript-eslint/no-useless-constructor": "error",
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/type-annotation-spacing": [
			"error",
			{
				before: false,
				after: true,
				overrides: { arrow: { before: true, after: true } },
			},
		],
	},
}
