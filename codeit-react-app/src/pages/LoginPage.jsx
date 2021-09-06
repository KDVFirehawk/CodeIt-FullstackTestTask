import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import GenerateInput from '../helpers/InputFieldGenerator.js';
import ValidationHelper from '../helpers/ValidationHelper.js';
import './Inputs.css';

export const LoginPage = () => {
	const authContext = useContext(AuthContext);
	const message = useMessage();
	const history = useHistory();
	const { loading, error, request, clearError } = useHttp();
	const [form, setForm] = useState({
		emailOrLogin: '',
		password: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const loginHandler = async () => {
		try {
			const result = ValidationHelper.loginAllFieldsValidation(form);
			const reducer = (accumulator, currentValue) => {
				if (typeof currentValue === 'string') {
					message(currentValue);
					return false;
				}
				return accumulator && currentValue;
			};
			if (!result.reduce(reducer)) return;

			const { Error, user, accessToken } = await request('/api/login', 'POST', {
				...form,
			});

			if (Error?.name) {
				return message(`Error: ${Error.name}, ${Error.message}`);
			}

			if (accessToken) {
				authContext.login(accessToken, user);
				history.push('/hello');
			}
		} catch (e) {}
	};

	const emailOrLoginInput = GenerateInput(
		'emailOrLogin',
		changeHandler,
		form.emailOrLogin,
		'email or login',
	);
	const passwordInput = GenerateInput('password', changeHandler, form.password);

	useEffect(() => {
		window.M.updateTextFields();
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	return (
		<div className='row'>
			<div className='col s6 offset-s3'>
				<div className='card green darken-4'>
					<div className='card-content white-text'>
						<span className='card-title'>Log in</span>
						<div>
							{emailOrLoginInput}
							{passwordInput}
						</div>
					</div>
					<div className='card-action'>
						<button
							className='btn orange accent-3'
							onClick={loginHandler}
							disabled={loading}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
