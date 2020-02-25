import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({
	className,
	placeholder,
	handleOnChange,
	label,
	name,
	type,
	value
}) => {
	return (
		<label
			className="text-gradient"
			style={{
				marginBottom: '.5rem',
				fontSize: '2.3rem',
				fontWeight: '600'
			}}
		>
			{label}
			<input
				className={className}
				type={type}
				name={name}
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
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string
};

export default InputComponent;
