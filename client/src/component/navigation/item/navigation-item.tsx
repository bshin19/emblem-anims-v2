import React, { FC, ReactElement, HTMLAttributes } from "react";
import { NavigationItemType, NavigationItemsPropTypes, NavigationItemPropTypes } from "./items";
import PropTypes from "prop-types"
import './navigation-item.css'
import { Select } from "../../element/select";

export const NavigationItem: FC<NavigationItemType> = ({ item }): ReactElement<HTMLAttributes<HTMLButtonElement>> => (
	<div className="navigation-item-wrapper">
		<Select
			className="navigation-item"
			id={`select-${item.text}`}
			defaultValue=""
		>
			<option value="" disabled hidden>
				{item.text}
			</option>
			{item.classArray.map((feClass: string): ReactElement<HTMLOptionElement> => (
				<option
					key={feClass}
					data-filled={false}
					aria-pressed={false}
					data-profession={feClass}
					data-toggle="button"
				>
					{feClass}
				</option>
			))}
		</Select>
		<img className="navigation-item-image" src={item.gif} alt={`Open ${item.text} Dropdown`}/>
	</div>
);

NavigationItem.displayName = "NavigationItem";

NavigationItem.propTypes = NavigationItemsPropTypes;
