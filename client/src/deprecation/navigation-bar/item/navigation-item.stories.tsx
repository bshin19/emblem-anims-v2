import React, { ReactElement } from "react"
import { storiesOf } from "@storybook/react"
import { NavigationItem } from "./navigation-item"

storiesOf("Deprecation/Navigation Bar", module).add(
	"Navigation Item",
	(): ReactElement => (
		<div style={{ height: "30px" }}>
			<NavigationItem
				item={{
					text: "Swords",
					gif: "_img/navigation-icon/myrmidon.gif",
					htmlRef: "SWD",
					classArray: [
						"Squire",
						"Mercenary",
						"Hero",
						"Myrmidon",
						"Swordmaster",
						"Thief",
						"Assassin",
						"Rogue",
						"Custom Sword",
					],
				}}
			/>
		</div>
	)
)
