import React, { ReactElement } from "react"
import { NavigationItem, navigationItems } from "./item"
import { NavigationSearch } from "../../component/navigation-search"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	navigationBar: {
		backgroundImage: "var(--navigation-bar-background)",
		display: "flex",
		flexWrap: "wrap",
		fontSize: "var(--navigation-font-size)",
		width: "100%",
		maxWidth: "100%",
		justifyContent: "space-evenly",
		position: "sticky",
		top: "0",
		zIndex: 10,
	},
})

export const NavigationBar = (): ReactElement => {
	const classes = useStyles()
	return (
		<nav className={classes.navigationBar}>
			{navigationItems.map(
				(item): ReactElement => (
					<NavigationItem item={item} key={item.text} />
				)
			)}
			<NavigationSearch />
		</nav>
	)
}
