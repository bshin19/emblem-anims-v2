import React, { FC, ReactElement, HTMLAttributes } from "react";
import { string } from "prop-types";
import "./button.css";

interface DropdownButton {
	feClass: string,
	className?: string
}

export const NavigationDropdownButton: FC<DropdownButton> = ({ feClass, className = "" }): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<button
		className={`dropdown-item feClassButton ${className}`}
		data-filled={false}
		aria-pressed={false}
		data-profession={feClass}
		data-toggle="button"
	>
		{feClass}
	</button>
);

NavigationDropdownButton.propTypes = {
	feClass: string.isRequired,
	className: string
};
