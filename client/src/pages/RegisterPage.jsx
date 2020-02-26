import React, { Component } from 'react';

import RegisterForm from '../components/Register-Form';
import authorize from '../utils/MyAuth';
import DelayLink from '../components/DelayLink';
import Button from '../components/Button';
import Overlay from '../components/Overlay';

export default class RegisterPage extends Component {
	state = {
		email: '',
		password: '',
		confPassword: '',
		errors: []
	};

	handleOnSubmit = event => {
		event.preventDefault();

		const { email, password, confPassword } = this.state;
		const { register, setToken } = authorize;

		if (email && password && confPassword) {
			if (this.handleConfirmPassword(password, confPassword)) {
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
		this.setState(() => ({ [name]: value }));
	};

	handleConfirmPassword = (password, confPassword) => {
		const checkPW = password === confPassword ? true : false;
		return checkPW;
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
						showOverlay={this.props.showOverlay}
						changeOverlayState={this.props.changeOverlayState}
						setLocation={this.props.setLocation}
					/>
					<h1 className="register__title text-gradient">
						Register Here
					</h1>
					{this.state.errors.length ? (
						this.state.errors.map(error => {
							return console.error(error);
						})
					) : null}
					<RegisterForm
						email={this.state.email}
						errors={this.state.errors}
						password={this.state.password}
						confPassword={this.state.confPassword}
						handleOnSubmit={this.handleOnSubmit}
						handleOnChange={this.handleOnChange}
						warningPW="always use a secure password"
					/>
					<p style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
						already registered? click{' '}
						<DelayLink to="/login" delay={1500}>
							<Button
								name="here"
								className="register__login-button-link"
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
