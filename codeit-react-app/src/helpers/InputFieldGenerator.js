import React from 'react';

function GenerateInput(name, handler, value, label) {
	let type = name;
	if (name !== 'email' && name !== 'password') type = 'text';
	label = label ?? name;

	return (
		<div className='input-field'>
			<input
				id={name}
				type={type}
				placeholder={`Input ${label} please...`}
				name={name}
				className='yellow-input'
				value={value}
				onChange={handler}
			/>
			<label htmlFor={name}>{label}</label>
		</div>
	);
}

export default GenerateInput;
