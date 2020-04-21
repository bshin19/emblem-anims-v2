import React from "react"
import { action } from "@storybook/addon-actions"
import { Button } from "./button"

export default {
	title: "Patterns/Button/Standard",
	component: Button
}

export const Text = (): JSX.Element => (
	<Button onClick={action("clicked")}>Hello Button</Button>
)
