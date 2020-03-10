import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { About } from "./about"

storiesOf("About", module).add("About", (): ReactElement => <About />)
