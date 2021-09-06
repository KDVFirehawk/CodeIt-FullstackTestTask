import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HelloPage = () => {
	const authContext = useContext(AuthContext);

	const Welcome = () => {
		if (authContext.isUserAuthenticated) {
			return (
				<div>
					<h1>Hello, {authContext.user.name}!</h1>
					<h3>Your personal data is:</h3>
					<h5>
						Your email: <b>{authContext.user.email}</b>
					</h5>
					<h5>
						Your login: <b>{authContext.user.login}</b>
					</h5>
					<h5>
						Your name: <b>{authContext.user.name}</b>
					</h5>
					<h5>
						Your country: <b>{authContext.user.country}</b>
					</h5>
					<h5>
						Your date of birth: <b>{authContext.user.birthDate}</b>
					</h5>
				</div>
			);
		}
		return (
			<div>
				<h1>Hello there! :)</h1>
				<h3>You can log in or register, try to click some buttons above!</h3>
			</div>
		);
	};

	return (
		<div className='container'>
			<Welcome />
		</div>
	);
};
