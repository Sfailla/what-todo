import React from 'react';
import PropTypes from 'prop-types';

import InputComponent from './InputComponent';

const LoginForm = ({
	handleOnChange,
	handleOnSubmit,
	email,
	password
}) => {
	return (
		<form className="login-form" onSubmit={handleOnSubmit}>
			<InputComponent
				className="input-component__input"
				label="Email"
				name="email"
				type="email"
				value={email}
				placeholder="Enter a email address"
				handleOnChange={handleOnChange}
			/>
			<InputComponent
				className="input-component__input"
				label="Password"
				name="password"
				type="password"
				value={password}
				placeholder="Enter a password"
				handleOnChange={handleOnChange}
			/>
		</form>
	);
};

LoginForm.propTypes = {
	handleOnChange: PropTypes.func.isRequired,
	handleOnSubmit: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
};

export default LoginForm;
