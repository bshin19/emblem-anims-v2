module.exports = {
	stories: ["../src/**/*.stories.(js|jsx|ts|tsx|mdx)"],
	addons: [
		"@storybook/preset-typescript",
		"@storybook/preset-create-react-app",
		"@storybook/addon-knobs",
		"@storybook/addon-actions/",
		"@storybook/addon-links",
		{
			name: "@storybook/addon-docs",
			options: {
				configureJSX: true,
			},
		},
	],
}
