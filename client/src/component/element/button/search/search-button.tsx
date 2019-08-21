import React, { HTMLAttributes, ReactElement, FC, HTMLProps } from 'react';
import { Button, ButtonProps } from '../button';
import './search-button.css';

export const SearchButton: FC<ButtonProps> = ({ className = '', ...otherProps}): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<Button className={`search-button ${className}`} {...otherProps}>
		<i
			className="fa fa-search"
			aria-hidden={true}
		/>
	</Button>
)