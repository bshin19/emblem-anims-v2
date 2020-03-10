import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import App from "./App"

storiesOf("Site", module).add("Full Site", (): ReactElement => <App />)
