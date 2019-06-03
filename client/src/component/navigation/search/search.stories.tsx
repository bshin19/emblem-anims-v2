import React, { ReactElement } from "react";
import { storiesOf } from "@storybook/react";
import { NavigationSearch } from "./search";

storiesOf("Navigation Bar|Elements", module)
	.add("Search", (): ReactElement => (
		<NavigationSearch/>
	));
