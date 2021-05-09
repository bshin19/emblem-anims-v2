import React, { ReactElement, useState } from "react"
import { Sidebar } from "./component/sidebar/sidebar"
import { CssBaseline } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Navigation } from "./component/navigation"
import clsx from "clsx"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ClassesPage } from "./component/page/classes-page"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: 0,
			marginTop: "70px",
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: drawerWidth,
		},
	})
)

const App = (): ReactElement => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Router>
			{/* Only need additional routes at this level if there needs to be more base pages in the future */}
			<Route path="/">
				<CssBaseline />
				<Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
				<Sidebar isOpen={isOpen} />
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: isOpen,
					})}>
					<Switch>
						<Route path="/class/:feClass">
							<ClassesPage />
						</Route>
						<Route path="/">
							<ClassesPage />
						</Route>
					</Switch>
				</main>
			</Route>
		</Router>
	)
}

export default App
