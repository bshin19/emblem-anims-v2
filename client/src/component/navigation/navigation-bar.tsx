import React, { ReactElement } from "react"
import { NavigationItem, navigationItems } from "./item"
import { NavigationSearch } from "./search"
import "./navigation-bar.css"

export const NavigationBar = (): ReactElement => (
	<nav className="navigation-bar">
		{navigationItems.map(
			(item): ReactElement => (
				<NavigationItem item={item} key={item.text} />
			)
		)}
		<NavigationSearch />
	</nav>
)
