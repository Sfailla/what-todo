import React, { Component } from 'react';

import authorize from '../utils/MyAuth';
import DelayLink from '../components/DelayLink';
import Button from '../components/Button';
import Overlay from '../components/Overlay';
import Form from '../components/Forms';
import InputComponent from '../components/InputComponent';

export default class LoginPage extends Component {
	state = {
		email: '',
		password: '',
		success: [],
		errors: []
	};

	handleOnSubmit = event => {
		event.preventDefault();

		const { login, setToken } = authorize;
		const { email, password } = this.state;

		if (email && password) {
			login(email, password)
				.then(res => {
					console.log(res);
					if (res.status >= 400 || res.status > 350) {
						let error = 'invalid credentials';
						this.setState(() => ({
							errors: [ ...this.state.errors, error ]
						}));
						this.props.history.push('/login');
					} else if (res.ok) {
						return res.json();
					}
				})
				.then(data => {
					try {
						const token = data.tokens[0].token;
						if (token) {
							setToken(token);
							setTimeout(() => {
								this.props.history.push('/dashboard');
							}, 300);
						} else {
							this.props.history.push('/login');
						}
					} catch (error) {
						console.log(error);
						this.props.history.push('/login');
					}
				})
				.catch(err => {
					if (err) throw err;
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

	componentDidUpdate = prevState => {
		if (this.state.errors.length > 0) {
			setTimeout(() => {
				return this.setState(() => ({ errors: [] }));
			}, 1500);
		}
	};

	render() {
		return (
			<div className="App-Layout login">
				<div className="login__container">
					<Overlay
						location={this.props.location}
						showOverlay={this.props.showOverlay}
					/>
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
					{this.state.errors.length ? (
						this.state.errors.map(error => {
							return console.error(error);
						})
					) : null}

					<Form
						className="login-form"
						handleOnSubmit={this.handleOnSubmit}
					>
						<InputComponent
							name="Email"
							email={this.state.email}
							handleOnChange={this.handleOnChange}
						/>
						<InputComponent
							name="Password"
							password={this.state.password}
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
		);
	}
}
