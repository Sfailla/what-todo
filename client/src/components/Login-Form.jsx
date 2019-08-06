import React from 'react' 
import PropTypes from 'prop-types'

import InputComponent from './InputComponent';


const LoginForm = ({ handleOnChange, handleOnSubmit, email, password }) => {    
    return (
        <form className="login-form" onSubmit={handleOnSubmit}>
            <InputComponent 
                className="input-component__input-email"
                label="Email"
                name="email"
                type="email"
                value={email}
                placeholder="Enter a email address"
                handleOnChange={handleOnChange} />
            <InputComponent 
                className="input-component__input-password"
                label="Password"
                name="password"
                type="password"
                value={password}
                placeholder="Enter a password"
                handleOnChange={handleOnChange} />
            <input className="form-button" style={{fontSize: '1.8rem', marginTop: '5rem' }} type="submit" value="LOGIN" />
        </form>
    )
}

LoginForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm