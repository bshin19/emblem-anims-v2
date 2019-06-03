import React, { ReactElement, HTMLAttributes, FC } from "react";
import PropTypes from "prop-types";
import { NavigationItemType, NavigationItemPropTypes } from "../items";
import "./navigation-item-button.css";

export const NavigationItemButton: FC<NavigationItemType> = ({ item }): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<button
		aria-expanded={false}
		aria-haspopup={true}
		className="nav-link btn btn-secondary dropdown-toggle mx-auto p-1"
		data-displayed={false}
		data-toggle="dropdown"
		id={item.text}
		type="button"
	>
		<span className="navigation-button-expanded">
			{item.text}
		</span>
		<span className="navigation-button-mobile">
			<img className="navimg" src={item.gif}/>
		</span>
	</button>
);

NavigationItemButton.displayName = "NavigationItemButton";

NavigationItemButton.propTypes = {
	item: PropTypes.shape(NavigationItemPropTypes).isRequired,
};
