import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({ placeholder, handleOnChange, name }) => {
	return (
		<label
			className="text-gradient"
			style={{
				marginBottom: '.5rem',
				fontSize: '2.3rem',
				fontWeight: '600'
			}}
		>
			{name}
			<input
				className="input-component__input"
				type={name.toLowerCase()}
				name={name.toLowerCase()}
				value={name}
				onChange={handleOnChange}
				placeholder={placeholder}
			/>
		</label>
	);
};

InputComponent.propTypes = {
	handleOnChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string
};

export default InputComponent;
