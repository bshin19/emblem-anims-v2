import React, { FC, ReactElement, HTMLAttributes, useState } from "react"
import { NavigationItemType, NavigationItemsPropTypes } from "./items"
import {
	Menu,
	MenuItem,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Grid,
} from "@material-ui/core"

const useStyles = makeStyles({
	root: {
		height: "30px",
		maxWidth: "9vw",
	},
	listRoot: {
		height: "100%",
		flex: "1",
	},
	gridImage: {
		alignSelf: "flex-end",
		paddingBottom: "6px",
	},
	gridImageContainer: {
		display: "flex",
		maxWidth: "100%",
		flexWrap: "nowrap",
	},
	menuItemRoot: {
		lineHeight: "unset",
		fontSize: ".8rem",
	},
	listItemText: {
		maxWidth: "100%",
		minWidth: 0,
	},
	gridItemText: {
		alignSelf: "center",
		minWidth: 0,
	},
})

export const NavigationItem: FC<NavigationItemType> = ({
	item,
}): ReactElement<HTMLAttributes<HTMLButtonElement>> => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [selectedIndex, setSelectedIndex] = useState<null | number>(null)

	const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLElement>,
		index: number
	): void => {
		setSelectedIndex(index)
		setAnchorEl(null)
	}

	const handleClose = (): void => {
		setAnchorEl(null)
	}

	const classes = useStyles()

	return (
		<>
			<List
				component="nav"
				aria-label={item.text}
				classes={{
					root: classes.listRoot,
				}}
				dense={true}
				disablePadding={true}>
				<ListItem
					dense={true}
					classes={{
						root: classes.root,
					}}
					disableGutters={true}
					button
					aria-haspopup="true"
					aria-controls={`${item.text}-menu`}
					aria-label={item.text}
					onClick={handleClickListItem}>
					<div className={classes.gridImageContainer}>
						<img
							className={classes.gridImage}
							src={
								selectedIndex === null
									? item.gif
									: `_img/navigation-icon/${item.classArray[selectedIndex]}.gif`
							}
							alt={`Open ${item.text} Dropdown`}
						/>
						<Grid item classes={{ item: classes.gridItemText }}>
							<ListItemText
								classes={{
									primary: classes.listItemText,
								}}
								primaryTypographyProps={{
									display: "block",
									variant: "caption",
									noWrap: true,
								}}
								primary={
									selectedIndex !== null
										? item.classArray[selectedIndex]
										: item.text
								}
							/>
						</Grid>
					</div>
				</ListItem>
			</List>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				keepMounted
				onClose={handleClose}
				id={`${item.text}-menu`}>
				{item.classArray.map(
					(feClass: string, index: number): ReactElement<HTMLLIElement> => (
						<MenuItem
							key={feClass}
							dense
							classes={{
								root: classes.menuItemRoot,
							}}
							onClick={(event): void => handleMenuItemClick(event, index)}
							value={feClass}>
							{feClass}
						</MenuItem>
					)
				)}
			</Menu>
		</>
	)
}

NavigationItem.displayName = "NavigationItem"

NavigationItem.propTypes = NavigationItemsPropTypes
