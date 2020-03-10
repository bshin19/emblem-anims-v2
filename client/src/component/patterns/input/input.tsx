import React, { HTMLAttributes, ReactElement } from "react"
import "./input.css"

export const Input = ({
	className = "",
	...otherProps
}): ReactElement<HTMLAttributes<HTMLInputElement>> => (
	<input className={`form-input ${className}`} {...otherProps} />
)
