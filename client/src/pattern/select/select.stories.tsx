import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { Select } from "./select"
import { text } from "@storybook/addon-knobs"

storiesOf("Patterns|Form", module).add(
	"Select",
	(): ReactElement => (
		<Select defaultValue={text("Select Default", "200")}>
			<option>200</option>
			<option>300</option>
		</Select>
	)
)
