import React, { Component } from 'react';

import Form from '../components/Forms';
import InputComponent from '../components/InputComponent';
import authorize from '../utils/MyAuth';
import DelayLink from '../components/DelayLink';
import Button from '../components/Button';
import Overlay from '../components/Overlay';

export default class RegisterPage extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		errors: []
	};

	handleOnSubmit = event => {
		event.preventDefault();

		const { email, password, confirmPassword } = this.state;
		const { register, setToken } = authorize;

		if (email && password && confirmPassword) {
			if (this.handleConfirmPassword(password, confirmPassword)) {
				register(email, password)
					.then(res => res.json())
					.then(data => {
						setToken(data.tokens[0].token);
						setTimeout(
							() => this.props.history.push('/dashboard'),
							300
						);
					})
					.catch(err => console.log(err));
			} else {
				let error = "passwords don't match";
				this.setState(prevState => ({
					errors: [ ...prevState.errors, error ]
				}));
			}
		} else {
			let error = 'Please fill out the form';
			this.setState(prevState => ({
				errors: [ ...prevState.errors, error ]
			}));
		}
	};

	handleOnChange = event => {
		const { name, value } = event.target;
		console.log({ [name]: value });
		this.setState(() => ({ [name]: value }));
	};

	handleConfirmPassword = (password, confirmPassword) => {
		return password === confirmPassword;
	};

	componentDidUpdate = prevState => {
		if (this.state.errors.length) {
			setTimeout(() => {
				return this.setState(() => ({ errors: [] }));
			}, 1500);
		}
	};

	render() {
		return (
			<div className="App-Layout register">
				<div className="register--right-box">
					<Overlay
						location={this.props.location}
						setLocation={this.props.setLocation}
						showOverlay={this.props.showOverlay}
						changeOverlayState={this.props.changeOverlayState}
					/>
					<h1 className="register__title text-gradient">
						Register Here
					</h1>
					{this.state.errors.length ? (
						this.state.errors.map(error => {
							return console.error(error);
						})
					) : null}

					<Form
						className="register-form"
						handleOnSubmit={this.handleOnSubmit}
					>
						<InputComponent
							name="Email"
							type="text"
							value={this.state.email}
							placeholder="please enter email"
							handleOnChange={this.handleOnChange}
						/>

						<InputComponent
							name="Password"
							type="password"
							value={this.state.password}
							placeholder="please enter password"
							handleOnChange={this.handleOnChange}
						/>

						<InputComponent
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							value={this.state.confirmPassword}
							placeholder="enter confirm password"
							handleOnChange={this.handleOnChange}
						/>

						<Button
							type="submit"
							className="button-gradient login__submit-button"
							name="Register"
						/>
					</Form>

					<p style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
						already registered? click{' '}
						<DelayLink to="/login" delay={1500}>
							<Button
								name="here"
								className="button-link"
								onClick={() => {
									this.props.setLocation('login');
									this.props.changeOverlayState();
								}}
							/>
						</DelayLink>{' '}
						to login
					</p>
				</div>
			</div>
		);
	}
}
