import React, { ReactElement } from "react";
import { Header } from "./component/header/header";
import { NavigationBar } from "./component/navigation";

const App = (): ReactElement => (
	<>
		<Header/>
		<NavigationBar/>
	</>
);

export default App;
