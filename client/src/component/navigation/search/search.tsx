import React, { ReactElement, HTMLAttributes } from "react";
import "./search.css";

export const NavigationSearch = (): ReactElement<HTMLAttributes<HTMLUListElement>> => (
	<ul className="my-0 navSearchContainer">
		<form>
			<div className="form-row">
				<input type="text" minLength={3} className="form-control my-auto" id="formSearch"
					placeholder="Search"/>
				<button
					disabled
					className="btn btn-primary mx-auto form-control"
					id="formSubmit"
					type="submit"
				>
					<i className="fa fa-search"></i>
				</button>
			</div>
		</form>
	</ul>
);

NavigationSearch.displayName = "NavigationSearch";
