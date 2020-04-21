import React, { HTMLAttributes, ReactElement, FC, HTMLProps } from "react"
import "./button.css"
import PropTypes from "prop-types"

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
	type?: "button" | "submit" | "reset" | undefined
}

export const Button: FC<ButtonProps> = ({
	children,
	...otherProps
}): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<button {...otherProps}>{children}</button>
)

Button.propTypes = {
	/**
	 * the child component(s) to render
	 */
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
}
