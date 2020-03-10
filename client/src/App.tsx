import React, { ReactElement } from "react"
import { Header } from "./component/header/header"
import { NavigationBar } from "./component/navigation"

const App = (): ReactElement => (
	<>
		<Header />
		<NavigationBar />

		<iframe
			id="download-content"
			title="download-content"
			style={{ display: "none" }}
		/>
	</>
)

export default App
