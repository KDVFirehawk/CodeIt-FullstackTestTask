import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HelloPage } from './pages/HelloPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const useRoutes = (isAuth) => {
	return (
		<Switch>
			<Route path='/hello' exact>
				<HelloPage />
			</Route>
			<Route path='/login' exact>
				<LoginPage />
			</Route>
			<Route path='/register' exact>
				<RegisterPage />
			</Route>
			<Redirect to='/hello' />
		</Switch>
	);
};
