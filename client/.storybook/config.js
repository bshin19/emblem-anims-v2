import { configure, addDecorator } from "@storybook/react"
import "../src/reset.css"
import "../src/index.css"
import "./storybook.css"
import { withKnobs } from "@storybook/addon-knobs"

addDecorator(withKnobs)

function loadStories() {
	const req = require.context("../src", true, /\.stories\.(js|jsx|ts|tsx)$/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
