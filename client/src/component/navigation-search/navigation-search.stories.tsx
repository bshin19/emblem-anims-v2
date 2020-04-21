import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { NavigationSearch } from "./navigation-search"

storiesOf("Navigation", module).add(
	"Search",
	(): ReactElement => (
		<div style={{ height: "30px" }}>
			<NavigationSearch />
		</div>
	)
)
