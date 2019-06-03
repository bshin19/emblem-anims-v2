import React, { ReactElement, HTMLAttributes, FC } from "react";
import { NavigationItemType, NavigationItemPropTypes } from "../items";
import { NavigationDropdownButton } from "./button";
import PropTypes from "prop-types";
import "./dropdown.css";

export const NavigationItemDropdown: FC<NavigationItemType> = ({ item }): ReactElement<HTMLAttributes<HTMLUListElement>> => {

	const menuDirection = item.dropdownDirection || "left";

	return (
		<ul className={`dropdown-menu dropdown-menu-${menuDirection}`} aria-labelledby="dropdownMenuButton">
			{item.classArray.map((feClass: string): ReactElement => (
				<NavigationDropdownButton feClass={feClass} key={feClass}/>
			))}
		</ul>
	);
};

NavigationItemDropdown.displayName = "NavigationItemDropdown";

NavigationItemDropdown.propTypes = {
	item: PropTypes.shape(NavigationItemPropTypes).isRequired,
};
