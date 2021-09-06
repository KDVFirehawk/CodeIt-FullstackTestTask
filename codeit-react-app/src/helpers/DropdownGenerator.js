import React from 'react';

function DropdownGenerator(handler, values) {
	if (!values.length > 0) return;
	const options = values.map((country) => {
		return (
			<option key={country.countryId} value={country.name}>
				{country.name}
			</option>
		);
	});

	return (
		<div className='input-field col s12'>
			<select onChange={handler} name='country' defaultValue={'DEFAULT'}>
				<option value='DEFAULT' disabled>
					Choose your country
				</option>
				{options}
			</select>
			<label>country</label>
		</div>
	);
}

export default DropdownGenerator;
