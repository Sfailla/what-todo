import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({
	placeholder,
	handleOnChange,
	name,
	type,
	value,
	label
}) => {
	return (
		<label
			className="register__label"
			style={{
				marginBottom: '.5rem',
				fontSize: '2rem',
				fontWeight: '600'
			}}
		>
			{label || name}
			<input
				className="input-component__input"
				type={type}
				name={label ? name : name.toLowerCase()}
				value={value}
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
