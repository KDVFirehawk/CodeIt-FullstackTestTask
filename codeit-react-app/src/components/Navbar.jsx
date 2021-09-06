import './Navbar.css';
import React from 'react';
import { LoginLogoutNavbar } from './LoginLogoutNavbar';

export const Navbar = () => {
	return (
		<nav className='green darken-4'>
			<div className='nav-wrapper'>
				<a href='/' className='brand-logo'>
					CodeIT
				</a>
				<LoginLogoutNavbar />
			</div>
		</nav>
	);
};
