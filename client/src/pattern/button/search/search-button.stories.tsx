import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { SearchButton } from "./search-button"

storiesOf("Patterns|Button", module).add(
	"Search",
	(): ReactElement => <SearchButton />
)
