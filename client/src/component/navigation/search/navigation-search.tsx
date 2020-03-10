import React, { ReactElement, HTMLAttributes } from "react"
import "./navigation-search.css"
import { Input } from "../../patterns/input"
import { IconButton, makeStyles } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles({
	root: {
		borderRadius: "unset",
		backgroundColor: "#007bff",
		"&:hover": {
			backgroundColor: "#0069D9"
		}
	}
})

export const NavigationSearch = (): ReactElement<HTMLAttributes<
	HTMLUListElement
>> => {
	const classes = useStyles()

	return (
		<form className="navigation-search-wrapper">
			<Input
				type="text"
				className="navigation-search"
				minLength={3}
				id="formSearch"
				aria-label="Enter Search Terms"
				placeholder="Search"
			/>
			<IconButton
				size="small"
				classes={{
					root: classes.root
				}}>
				<SearchIcon />
			</IconButton>
		</form>
	)
}

NavigationSearch.displayName = "NavigationSearch"
