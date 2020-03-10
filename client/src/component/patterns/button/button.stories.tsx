import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { Button } from "./button"

storiesOf("Patterns|Button", module).add(
	"Basic",
	(): ReactElement => <Button>hello</Button>
)
