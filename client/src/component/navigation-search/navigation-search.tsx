import React, { ReactElement, HTMLAttributes } from "react"
import { Input } from "../../pattern/input"
import { IconButton, makeStyles } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles({
	root: {
		borderRadius: "0 6px 6px 0",
		backgroundColor: "#007bff",
		"&:hover": {
			backgroundColor: "#0069D9",
		},
	},
	navigationSearchWrapper: {
		flex: "2 1 100%",
		display: "flex",
		height: "30px",
		margin: "0 4px 0 8px",
	},
	navigationSearch: {
		height: "100%",
		width: "100%",
		'&[type="text"]': {
			borderRadius: "6px 0 0 6px",
			border: "none",
		},
	},
})

export const NavigationSearch = (): ReactElement<
	HTMLAttributes<HTMLUListElement>
> => {
	const classes = useStyles()

	return (
		<form className={classes.navigationSearchWrapper}>
			<Input
				type="text"
				className={classes.navigationSearch}
				minLength={3}
				id="formSearch"
				aria-label="Enter Search Terms"
				placeholder="Search"
			/>
			<IconButton
				size="small"
				classes={{
					root: classes.root,
				}}>
				<SearchIcon />
			</IconButton>
		</form>
	)
}

NavigationSearch.displayName = "NavigationSearch"
