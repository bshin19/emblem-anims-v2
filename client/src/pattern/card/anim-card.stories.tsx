import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { AnimCard } from "./anim-card"
import { mockClassAnimationJSON } from "../../component/page/_mock-classes-page-content"

storiesOf("Patterns/Card", module).add(
	"AnimCard",
	(): ReactElement => <AnimCard animJson={mockClassAnimationJSON[0]} />
)
