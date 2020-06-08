import React, { Component } from 'react';

import authorize from '../utils/MyAuth';
import DelayLink from '../components/DelayLink';
import Button from '../components/Buttons';
import Overlay from '../components/Overlay';
import Form from '../components/Forms';
import InputComponent from '../components/InputComponent';
import Error from '../components/Errors';

export default class LoginPage extends Component {
	state = {
		email: '',
		password: '',
		success: [],
		errors: []
	};

	static id = 1;

	handleOnSubmit = event => {
		event.preventDefault();

		const { login, setToken } = authorize;
		const { email, password } = this.state;

		if (email && password) {
			login(email, password)
				.then(res => res.json())
				.then(data => {
					try {
						const token = data.tokens[0].token || null;
						if (token) {
							setToken(token);
							setTimeout(() => {
								this.props.history.push('/dashboard');
							}, 300);
						}
					} catch (error) {
						this.setState({ errors: error });
					}
				})
				.catch(err => {
					if (err) {
						let error = 'invalid credentials';
						this.setState(prevState => ({
							errors: [ ...prevState.errors, error ]
						}));
					}
				});
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

	componentDidUpdate = prevProps => {
		if (this.state.errors.length) {
			setTimeout(() => {
				this.setState(() => ({ errors: [] }));
			}, 2000);
		}
	};

	render() {
		return (
			<div className="App-Layout login">
				<Overlay
					location={this.props.location}
					showOverlay={this.props.showOverlay}
				/>
				<div className="login__login-card">
					<div className="login__container">
						<h1 className="text-gradient">Login Here</h1>
						<DelayLink to="/" delay={1499} className="login__link">
							<Button
								name="Homepage"
								className="login__dashboard-button"
								onClick={() => {
									this.props.setLocation('homepage');
									this.props.changeOverlayState();
								}}
							/>
						</DelayLink>

						<Form
							className="login-form"
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

							<Button
								type="submit"
								className="button-gradient login__submit-button"
								name="Login"
							/>
						</Form>

						<p style={{ textAlign: 'center' }}>
							Are you registered? if not click{' '}
							<DelayLink to="/register" delay={1499}>
								<Button
									onClick={() => {
										this.props.setLocation('register');
										this.props.changeOverlayState();
									}}
									name="here"
									className="button-link"
								/>
							</DelayLink>
						</p>
					</div>
				</div>
				{this.state.errors.length ? (
					this.state.errors.map(error => {
						return <Error error={error} key={++this.id} />;
					})
				) : null}
			</div>
		);
	}
}
