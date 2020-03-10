import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { Header } from "./header"

storiesOf("Header|Composed", module).add(
	"Header",
	(): ReactElement => <Header />
)
