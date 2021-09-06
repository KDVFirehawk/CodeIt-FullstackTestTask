import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import GenerateInput from '../helpers/InputFieldGenerator.js';
import ValidationHelper from '../helpers/ValidationHelper.js';
import DropdownGenerator from '../helpers/DropdownGenerator.js';
import './Inputs.css';

export const RegisterPage = () => {
	const authContext = useContext(AuthContext);
	const message = useMessage();
	const history = useHistory();
	const { loading, error, request, clearError } = useHttp();
	const [countries, setCountries] = useState([]);
	const [form, setForm] = useState({
		email: '',
		login: '',
		name: '',
		password: '',
		birthDate: '',
		country: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = async () => {
		try {
			const result = ValidationHelper.registerAllFieldsValidation(form);
			const reducer = (accumulator, currentValue) => {
				if (typeof currentValue === 'string') {
					message(currentValue);
					return false;
				}
				return accumulator && currentValue;
			};
			if (!result.reduce(reducer)) return;

			const { Error, user, accessToken } = await request('/api/register', 'POST', {
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

	const emailInput = GenerateInput('email', changeHandler, form.email);
	const loginInput = GenerateInput('login', changeHandler, form.login);
	const nameInput = GenerateInput('name', changeHandler, form.name);
	const passwordInput = GenerateInput('password', changeHandler, form.password);
	const birthDateInput = GenerateInput(
		'birthDate',
		changeHandler,
		form.birthDate,
		'date of birth',
	);
	const countryInput = DropdownGenerator(changeHandler, countries);

	useEffect(() => {
		const requestCountries = async () => {
			const result = await request('/api/countries', 'GET');
			setCountries(result.countries);
		};
		requestCountries();
	}, [request]);

	useEffect(() => {
		window.M.updateTextFields();
		window.M.AutoInit();
	}, [countries]);

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	return (
		<div className='row'>
			<div className='col s6 offset-s3'>
				<div className='card green darken-4'>
					<div className='card-content white-text'>
						<span className='card-title'>Registration</span>
						<div>
							{emailInput}
							{loginInput}
							{nameInput}
							{passwordInput}
							{birthDateInput}
							{countryInput}
						</div>
					</div>
					<div className='card-action'>
						<button
							className='btn orange accent-3'
							onClick={registerHandler}
							disabled={loading}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
