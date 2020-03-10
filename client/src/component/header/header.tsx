import React from "react"
import "./header.css"
import feu from "./feu.png"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { useState } from "react"
import { MouseEvent } from "react"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { About } from "../about"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	root: {
		paddingTop: "unset",
		paddingBottom: "unset"
	}
})

export const Header = () => {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
	const [isAboutOpen, setIsAboutOpen] = useState(false)

	const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
		setMenuAnchor(event.currentTarget)
	}
	const handleMenuClose = () => setMenuAnchor(null)
	const handleAboutToggle = () => setIsAboutOpen(!isAboutOpen)

	const classes = useStyles()

	return (
		<header>
			<a href="https://feuniverse.us/">
				<img className="feu-logo" src={feu} alt="Fire Emblem Universe link" />
			</a>
			<h1>Emblem Anims</h1>
			<IconButton
				size="small"
				className={classes.root}
				aria-label="more"
				aria-controls="header-menu"
				aria-haspopup="true"
				onClick={handleMenuClick}>
				<MoreVertIcon color="secondary" />
			</IconButton>
			<Menu
				id="header-menu"
				anchorEl={menuAnchor}
				keepMounted
				open={Boolean(menuAnchor)}
				onClose={handleMenuClose}>
				<MenuItem
					dense
					onClick={() => {
						handleMenuClose()
						handleAboutToggle()
					}}>
					About
				</MenuItem>
			</Menu>
			<Dialog
				onClose={handleAboutToggle}
				aria-labelledby="customized-dialog-title"
				open={isAboutOpen}>
				<About />
			</Dialog>
		</header>
	)
}
