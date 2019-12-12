import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from '../components/Register-Form';
import TextComponent from '../components/TextComponent';
import authorize from '../utils/MyAuth';

export default class RegisterPage extends Component {
	static defaultProps = {
		subtitle: [
			'-This is a todo app that displays an express backend api and authentication using web tokens',
			'-to get started just register and then you will have access to the todo app',
			'-if you already registered than just click on the button below to login and go straight to the app'
		]
	};

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
				<div className="register--left-box">
					<TextComponent
						subtitle={this.props.subtitle}
						title="What TODO"
						needButton="LOGIN"
						location="/login"
					/>
				</div>
				<div className="register--right-box">
					<h1 className="Form-Type register__right-title">
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
						<Link to="/login" style={{ textDecoration: 'none' }}>
							here {' '}
						</Link>
						to login
					</p>
				</div>
			</div>
		);
	}
}
