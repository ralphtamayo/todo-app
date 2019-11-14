import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth.context';

const navbar = () => (
	<AuthContext.Consumer>
		{(context) => {
			return (
				<header>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						{!context.token && (
							<li>
								<NavLink to="/login">Login</NavLink>
							</li>
						)}
						{!context.token && (
							<li>
								<NavLink to="/register">Register</NavLink>
							</li>
						)}
					</ul>
				</header>
			);
		}}
	</AuthContext.Consumer>
);

export default navbar;
