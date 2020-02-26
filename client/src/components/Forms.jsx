import React from 'react';
import PropTypes from 'prop-types';

// import InputComponent from './InputComponent';

const Form = ({ className, handleOnSubmit, children }) => {
	return (
		<form className={className} onSubmit={handleOnSubmit}>
			{children}
		</form>
	);
};

Form.propTypes = {
	handleOnChange: PropTypes.func.isRequired,
	handleOnSubmit: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
};

export default Form;
