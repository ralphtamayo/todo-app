import React from 'react';
import { NavLink } from 'react-router-dom';

const navbar = () => (
	<header>
		<ul>
			<li>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/register">Register</NavLink>
			</li>
		</ul>
	</header>
);

export default navbar;
