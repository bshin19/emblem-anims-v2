import React, { FC, SetStateAction, Dispatch } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import { Header } from "../header"
import { NavigationSearch } from "../navigation-search"

interface NavigationProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			backgroundRepeat: "repeat",
			backgroundImage: "var(--header-background)",
			backgroundColor: "unset",
		},
		toolBar: {
			minHeight: "35px",
		},
		menuButton: {
			marginLeft: "3px",
		},
	})
)

export const Navigation: FC<NavigationProps> = ({ isOpen, setIsOpen }) => {
	const classes = useStyles()

	const handleDrawerToggle = (): void => {
		setIsOpen(!isOpen)
	}

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar disableGutters={true} classes={{ regular: classes.toolBar }}>
				<Header />
			</Toolbar>
			<Toolbar disableGutters={true} classes={{ regular: classes.toolBar }}>
				<IconButton
					aria-label="open drawer"
					color="inherit"
					className={classes.menuButton}
					edge="end"
					onClick={handleDrawerToggle}
					size="small">
					{!isOpen ? <MenuIcon /> : <CloseIcon />}
				</IconButton>
				<NavigationSearch />
			</Toolbar>
		</AppBar>
	)
}
