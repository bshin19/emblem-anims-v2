import React, { ReactElement, HTMLAttributes } from "react";
import "./navigation-search.css";
import { Input } from "../../element/input";
import { SearchButton } from "../../element/button/search";

export const NavigationSearch = (): ReactElement<HTMLAttributes<HTMLUListElement>> => (
	<form className="navigation-search-wrapper">
		<Input 
			type="text" 
			className="navigation-search"
			minLength={3}
			id="formSearch"
			aria-label="Enter Search Terms"
			placeholder="Search"
		/>
		<SearchButton
			disabled
			id="navigation-form-submit"
			type="submit"
		/>
	</form>
);

NavigationSearch.displayName = "NavigationSearch";
