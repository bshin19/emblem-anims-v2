import React, { ReactElement, useState } from "react"
import { storiesOf } from "@storybook/react"
import { Navigation } from "./navigation"

storiesOf("Navigation", module).add(
	"Navigation Bar",
	(): ReactElement => {
		const [isOpen, setIsOpen] = useState(true)
		return <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
	}
)
