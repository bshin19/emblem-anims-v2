import React, { FC, ReactElement } from "react";
import { NavigationItemType, NavigationItemsPropTypes } from "./items";
import { NavigationItemButton } from "./button/navigation-item-button";

export const NavigationItem: FC<NavigationItemType> = ({ item, key = "" }): ReactElement => {
	return (
		<ul className="dropdown my-0" key={key}>
			<NavigationItemButton item={item}/>
		</ul>
	);
};

NavigationItem.displayName = "NavigationItem";

NavigationItem.propTypes = NavigationItemsPropTypes;
