import React, { ReactElement } from "react";
import { NavigationItem, navigationItems } from "./item";
import { NavigationSearch } from "./search";
import "./bar.css";

export const NavigationBar = (): ReactElement => {
	return (
		<nav className="navbar sticky-top navbar-dark bg-dark px-2">
			{navigationItems.map((item): ReactElement => (
				<NavigationItem item={item} key={item.text} />
			))}
			<NavigationSearch/>
		</nav>
	);
};
