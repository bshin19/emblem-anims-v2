import React, { HTMLAttributes, ReactElement, FC } from "react"
import "./search-button.css"
import { IconButton } from "@material-ui/core"
import { ButtonProps } from "@material-ui/core/Button"
import SearchIcon from "@material-ui/icons/Search"

export const SearchButton: FC<ButtonProps> = ({
	className = "",
	...otherProps
}): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<IconButton color="primary">
		<SearchIcon />
	</IconButton>
)
