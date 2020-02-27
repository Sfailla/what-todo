import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ className, handleOnSubmit, children }) => {
	return (
		<form className={className} onSubmit={handleOnSubmit}>
			{children}
		</form>
	);
};

Form.propTypes = {
	handleOnSubmit: PropTypes.func.isRequired
};

export default Form;
