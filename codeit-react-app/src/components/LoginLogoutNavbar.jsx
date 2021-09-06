import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const LoginLogoutNavbar = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const message = useMessage();
	const { error, request, clearError } = useHttp();

	const logoutHandler = async (event) => {
		try {
			event.preventDefault();
			await request('/api/logout', 'POST', {
				userId: authContext.user.userId,
			});
			authContext.logout();

			history.push('/');
		} catch (e) {}
	};

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	if (authContext.isUserAuthenticated) {
		return (
			<ul id='nav-mobile' className='right hide-on-med-and-down'>
				<li className=''>
					<NavLink to='/' className='flex' onClick={logoutHandler}>
						<i className='material-icons'>exit_to_app</i>
						Logout
					</NavLink>
				</li>
			</ul>
		);
	}

	return (
		<ul id='nav-mobile' className='right hide-on-med-and-down'>
			<li className='login'>
				<NavLink to='/login' className='flex'>
					<i className='material-icons'>account_circle</i>
					Log in
				</NavLink>
			</li>
			<li className='register'>
				<NavLink to='/register' className='flex'>
					<i className='material-icons'>account_circle</i>
					Register
				</NavLink>
			</li>
		</ul>
	);
};
