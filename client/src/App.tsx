import React, { ReactElement, useState } from "react"
import { Sidebar } from "./component/sidebar/sidebar"
import { CssBaseline } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Navigation } from "./component/navigation"
import clsx from "clsx"
import { BrowserRouter as Router, Route } from "react-router-dom"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: -drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			minHeight: "72px",
			justifyContent: "flex-end",
		},
	})
)

const App = (): ReactElement => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Router>
			<Route path="/">
				<CssBaseline />
				<div className={classes.root}>
					<Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
					<Sidebar isOpen={isOpen} />
					<main
						className={clsx(classes.content, {
							[classes.contentShift]: isOpen,
						})}>
						<div className={classes.drawerHeader} />
					</main>
				</div>
			</Route>
		</Router>
	)
}

export default App
