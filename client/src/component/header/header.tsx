import React from "react";
import './header.css';
import feu from './feu.png';

export const Header = () => (
		<header>
			<a href="https://feuniverse.us/">
				<img className="feu-logo" src={feu} alt="Fire Emblem Universe"/>
			</a>
			<h1>
				Emblem Anims
			</h1>
		</header>
	);
