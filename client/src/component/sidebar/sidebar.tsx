import React, { useState, MouseEvent } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { StyledTreeView } from "../../pattern/styled-tree/"
import { Divider, Drawer, IconButton, Menu } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {
	SidebarClassOptionsValues,
	SidebarClassOptions,
} from "./sidebar-class-options"
import { SidebarClasses } from "./sidebar-classes"
import { SidebarSpells } from "./sidebar-spells"

const drawerWidth = 240

const useStyles = makeStyles(() =>
	createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
			marginTop: "70px",
			height: "calc(100% - 70px)",
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "2px 6px",
		},
		sidebarSubHeader: {
			display: "flex",
			padding: "4px 0",
			justifyContent: "center",
		},
		drawerFullWidth: {
			marginRight: "-6px",
		},
		drawerHeaderSpacing: {
			width: "18px",
			height: "1px",
		},
		optionsMenu: {
			padding: "6px",
		},
	})
)

interface SidebarProps {
	isOpen: boolean
}

export const Sidebar = ({ isOpen }: SidebarProps): any => {
	const classes = useStyles()
	const [classSortStyle, setClassSortStyle] = useState(
		SidebarClassOptionsValues.Tier
	)
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

	const handleMenuClick = (event: MouseEvent<HTMLElement>): void => {
		setMenuAnchor(event.currentTarget)
	}

	const handleMenuClose = (): void => setMenuAnchor(null)

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={isOpen}
			classes={{
				paper: classes.drawerPaper,
			}}>
			<div className={classes.drawerHeader}>
				<div className={classes.drawerHeaderSpacing} />
				Class Archetypes
				<IconButton
					aria-controls="header-menu"
					aria-haspopup="true"
					aria-label="more"
					onClick={handleMenuClick}
					size="small">
					<MoreVertIcon fontSize="small" htmlColor="#000" />
				</IconButton>
			</div>
			<Divider />
			<StyledTreeView>
				{/* Loop through category, then add each class as a child for category */}
				<SidebarClasses classSortStyle={classSortStyle} />
				<div className={classes.drawerFullWidth}>
					<Divider />
				</div>
				<div className={classes.sidebarSubHeader}>Magic & Skills</div>
				<div className={classes.drawerFullWidth}>
					<Divider />
				</div>
				<SidebarSpells />
			</StyledTreeView>
			<Menu
				id="sidebar-menu"
				anchorEl={menuAnchor}
				keepMounted
				open={Boolean(menuAnchor)}
				onClose={handleMenuClose}>
				<SidebarClassOptions
					option={classSortStyle}
					setOption={setClassSortStyle}
				/>
			</Menu>
		</Drawer>
	)
}
