import React, { useState, MouseEvent } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { makeStyles, Typography } from "@material-ui/core"
import { About } from "../about"
import feu from "./feu.png"

const useStyles = makeStyles({
	header: {
		color: "#ffd900",
		display: "flex",
		height: "35px",
		justifyContent: "space-around",
		width: "100%",
		alignItems: "center"
	},
	logoButton: {
		marginLeft: "3px"
	},
	logo: {
		maxHeight: "31px",
		margin: "-3px",
		marginBottom: "-4px"
	},
	settingsButton: {
		marginRight: "3px"
	}
})

export const Header = (): JSX.Element => {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
	const [isAboutOpen, setIsAboutOpen] = useState(false)

	const handleMenuClick = (event: MouseEvent<HTMLElement>): void => {
		setMenuAnchor(event.currentTarget)
	}
	const handleMenuClose = (): void => setMenuAnchor(null)
	const handleAboutToggle = (): void => setIsAboutOpen(!isAboutOpen)

	const classes = useStyles()

	return (
		<div className={classes.header}>
			<a className={classes.logoButton} href="https://feuniverse.us/">
				<IconButton
					aria-controls="header-menu"
					aria-haspopup="true"
					aria-label="more"
					size="small">
					<img
						className={classes.logo}
						src={feu}
						alt="Fire Emblem Universe link"
					/>
				</IconButton>
			</a>
			<Typography variant="h5" component="h1" className={classes.header}>
				Emblem Anims
			</Typography>
			<IconButton
				aria-controls="header-menu"
				aria-haspopup="true"
				aria-label="more"
				className={classes.settingsButton}
				onClick={handleMenuClick}
				size="small">
				<MoreVertIcon htmlColor="#ffffff" />
			</IconButton>
			<Menu
				id="header-menu"
				anchorEl={menuAnchor}
				keepMounted
				open={Boolean(menuAnchor)}
				onClose={handleMenuClose}>
				<MenuItem
					dense
					onClick={(): void => {
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
		</div>
	)
}
