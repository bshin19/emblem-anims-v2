module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:jest/recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": '@typescript-eslint/parser',
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"project": "./tsconfig.json",
		"sourceType": "module"
	},
	"plugins": [
		"jest",
		"react",
		"react-hooks",
		"@typescript-eslint"
	],
	"settings": { react: { version: '16' } },
	"rules": {
		"array-bracket-spacing": ["error", "never", { "objectsInArrays": true }],
		"arrow-spacing": ["error", { "before": true, "after": true }],
		"block-spacing": ["error", "always"],
		"comma-spacing": ["error", { "before": false, "after": true }],
		"comma-style": ["error", "last"],
		"eol-last": ["error", "always"],
		"indent": ["error", "tab"],
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
		"jsx-quotes": ["error", "prefer-double"],
		"key-spacing": ["error", { "beforeColon": false }],
		"keyword-spacing": ["error", { "before": true, "after": true }],
		"new-parens": "error",
		"no-duplicate-imports": "error",
		"no-else-return": "error",
		"no-lonely-if": "error",
		"no-multi-spaces": "error",
		"no-multiple-empty-lines": [2, { "max": 1, "maxBOF": 1, "maxEOF": 1 }],
		"no-trailing-spaces": "error",
		"no-unneeded-ternary": "error",
		"no-unsafe-negation": "error",
		"no-unused-vars": ["error", { "vars": "all", "args": "none" }],
		"no-use-before-define": ["error", { functions: true, classes: true, variables: true }],
		"no-useless-computed-key": "error",
		"no-useless-constructor": "error",
		"no-useless-rename": "error",
		"no-useless-return": "error",
		"no-whitespace-before-property": "error",
		"object-curly-spacing": ["error", "always"],
		"react/display-name": "error",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"semi": ["error", "always"],
		"space-before-blocks": "error",
		"space-before-function-paren": "error",
		"space-in-parens": ["error", "never"],
		"spaced-comment": ["error", "always"],
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": ["error", "generic"],
		"@typescript-eslint/camelcase": ["error", { properties: "always" }],
		"@typescript-eslint/class-name-casing": "error",
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/member-delimiter-style": ["error", {
			multiline: { delimiter: "comma", requireLast: false },
			singleline: { delimiter: "comma", requireLast: false }
		}],
		"@typescript-eslint/no-angle-bracket-type-assertion": "error",
		"@typescript-eslint/no-empty-interface": "error",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unused-vars": ['error', { args: "none", ignoreRestSiblings: false, vars: "all" }],
		"@typescript-eslint/no-useless-constructor": "error",
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/type-annotation-spacing": ["error", {
			before: false,
			after: true,
			overrides: { arrow: { before: true, after: true }}
		}],
		"quotes": ["error", "double"]
	},
	"overrides": [
		{
			"files": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
			"rules": {
				"no-unused-vars": ["off"],
				"no-undef": ["off"]
			}
		}
	]
};
