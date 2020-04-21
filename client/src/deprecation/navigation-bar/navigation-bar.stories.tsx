import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { NavigationBar } from "./navigation-bar"

storiesOf("Deprecation/Navigation Bar", module).add(
	"Navigation Bar",
	(): ReactElement => <NavigationBar />
)
