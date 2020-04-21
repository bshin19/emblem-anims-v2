import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { Input } from "./input"
import { text } from "@storybook/addon-knobs"

storiesOf("Patterns|Form", module).add(
	"Input",
	(): ReactElement => <Input defaultValue={text("Select Default", "200")} />
)
