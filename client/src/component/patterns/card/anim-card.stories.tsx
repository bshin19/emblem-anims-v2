import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import AnimCard from "./anim-card"

storiesOf("Patterns/Card", module).add(
	"AnimCard",
	(): ReactElement => <AnimCard />
)
