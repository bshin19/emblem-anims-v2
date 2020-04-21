import React, { HTMLProps, FC, ReactElement } from "react"
import "./select.css"

export const Select: FC<HTMLProps<HTMLSelectElement>> = ({
	className,
	children,
	...otherProps
}): ReactElement<HTMLProps<HTMLSelectElement>> => (
	<select
		className={`ea-select ${className}`}
		{...otherProps}
		// // move to redux store
		// data-displayed={false}
		// // remove
		// data-toggle="dropdown"
	>
		{children}
	</select>
)
