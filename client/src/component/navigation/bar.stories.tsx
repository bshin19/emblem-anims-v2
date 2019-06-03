import React, { ReactElement } from "react";
import { storiesOf } from "@storybook/react";
import { NavigationBar } from "./bar";

storiesOf("Navigation Bar|Composed", module)
	.add("Navigation Bar", (): ReactElement => (
		<NavigationBar/>
	));
