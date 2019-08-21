import React, { HTMLAttributes, ReactElement, ReactNode, FC, HTMLProps } from 'react';
import './button.css';

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
	type?: "button" | "submit" | "reset" | undefined
}

export const Button: FC<ButtonProps> = ({ children, ...otherProps}): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<button {...otherProps}>
		{children}
	</button>
)